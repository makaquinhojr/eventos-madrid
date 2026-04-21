#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json
import time
import re
import math
from datetime import datetime, date, timedelta
from pathlib import Path
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from scraper.config import *
except ImportError:
    from config import *

try:
    from geopy.geocoders import Nominatim
    from geopy.exc import GeocoderTimedOut, GeocoderServiceError
    GEOPY_AVAILABLE = True
except ImportError:
    print("⚠️ geopy no disponible")
    GEOPY_AVAILABLE = False


class EventosScraper:

    def __init__(self):
        self.eventos = []
        self.eventos_existentes = []
        self.stats = {
            'esmadrid': 0,
            'ticketmaster': 0,
            'duplicados': 0,
            'errores': 0,
            'nuevos': 0,
            # ✅ NUEVO: contador para saber cuántos se geocodificaron
            'geocodificados': 0,
            # ✅ NUEVO: contador de eventos descartados por coords imposibles
            'descartados_coords': 0,
        }

        if GEOPY_AVAILABLE and GEOCODING_ENABLED:
            self.geolocator = Nominatim(
                user_agent="eventos-madrid-scraper-v2"
            )
        else:
            self.geolocator = None

        self.cargar_eventos_existentes()

    # ===== CARGA Y GUARDADO =====

    def cargar_eventos_existentes(self):
        posibles_paths = [
            Path(__file__).parent / EVENTOS_JSON_PATH,
            Path(__file__).parent.parent / 'data' / 'eventos.json',
        ]

        for json_path in posibles_paths:
            if json_path.exists():
                try:
                    with open(json_path, 'r', encoding='utf-8') as f:
                        self.eventos_existentes = json.load(f)
                    print(f"📂 Cargados {len(self.eventos_existentes)} "
                          f"eventos existentes desde {json_path}")
                    self._json_path = json_path
                    return
                except Exception as e:
                    print(f"⚠️ Error leyendo {json_path}: {e}")

        print("📂 No hay eventos previos, se creará nuevo archivo")
        self.eventos_existentes = []
        self._json_path = Path(__file__).parent / EVENTOS_JSON_PATH

    def guardar_eventos(self):
        print("\n💾 Guardando eventos...")

        hoy = date.today().isoformat()

        existentes_vigentes = [
            e for e in self.eventos_existentes
            if (e.get('fecha_fin') or e.get('fecha', ''))[:10] >= hoy
        ]
        eliminados = len(self.eventos_existentes) - len(existentes_vigentes)
        print(f"   🗑️  Eliminados {eliminados} eventos pasados")

        # ✅ NUEVO — CAPA 3: Sanidad final antes de guardar
        # ─────────────────────────────────────────────────
        # Revisamos TODOS los eventos (existentes + nuevos) antes de guardar.
        # Cualquier evento con coordenadas imposibles recibe un último intento
        # de geocodificación por su campo 'lugar'. Si sigue sin poder
        # geocodificarse correctamente, se descarta para no contaminar el mapa.
        print("   🔍 Validando coordenadas de todos los eventos...")
        eventos_saneados = []
        for evento in existentes_vigentes:
            lat = evento.get('lat', 0)
            lng = evento.get('lng', 0)

            if not self.validar_coordenadas(lat, lng):
                # Las coords son malas → intentamos rescatar el evento
                lugar = evento.get('lugar', '')
                nueva_lat, nueva_lng = self.geocodificar(lugar)

                if self.validar_coordenadas(nueva_lat, nueva_lng):
                    # Geocodificación exitosa → corregimos y guardamos
                    evento['lat'] = nueva_lat
                    evento['lng'] = nueva_lng
                    evento['zona'] = self.asignar_zona(nueva_lat, nueva_lng)
                    self.stats['geocodificados'] += 1
                    print(f"      ✅ Rescatado: {evento['nombre'][:50]}")
                else:
                    # No se pudo geocodificar → descartamos el evento
                    self.stats['descartados_coords'] += 1
                    print(f"      ❌ Descartado (coords imposibles): "
                          f"{evento['nombre'][:50]}")
                    continue

            eventos_saneados.append(evento)

        existentes_vigentes = eventos_saneados
        # ─────────────────────────────────────────────────

        nombres_existentes = {
            e['nombre'].lower().strip() for e in existentes_vigentes
        }
        nuevos = 0

        for evento in self.eventos:
            nombre_lower = evento['nombre'].lower().strip()
            if nombre_lower not in nombres_existentes:
                existentes_vigentes.append(evento)
                nombres_existentes.add(nombre_lower)
                nuevos += 1

        self.stats['nuevos'] = nuevos
        print(f"   ➕ {nuevos} eventos nuevos añadidos")

        existentes_vigentes.sort(
            key=lambda x: x.get('fecha', '9999-12-31')[:10]
        )

        max_id = max(
            (e.get('id', 0) for e in existentes_vigentes),
            default=0
        )
        for i, evento in enumerate(existentes_vigentes):
            if 'id' not in evento or evento['id'] == 0:
                max_id += 1
                evento['id'] = max_id

        json_path = self._json_path
        json_path.parent.mkdir(parents=True, exist_ok=True)

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(existentes_vigentes, f, ensure_ascii=False, indent=2)

        print(f"   ✅ Guardados {len(existentes_vigentes)} eventos → {json_path}")
        return len(existentes_vigentes)

    # ===== HELPERS =====

    def hacer_request(self, url, headers=None, params=None):
        _headers = headers or HEADERS
        for intento in range(MAX_RETRIES):
            try:
                print(f"   🌐 Request a {url[:70]}...")
                response = requests.get(
                    url,
                    headers=_headers,
                    params=params,
                    timeout=15,
                    verify=True
                )
                response.raise_for_status()
                time.sleep(DELAY_BETWEEN_REQUESTS)
                return response
            except requests.exceptions.HTTPError as e:
                print(f"   ⚠️ HTTP {e.response.status_code} en intento "
                      f"{intento + 1}/{MAX_RETRIES}")
                if e.response.status_code in [401, 403, 404]:
                    break
                if intento < MAX_RETRIES - 1:
                    time.sleep(5 * (intento + 1))
            except Exception as e:
                print(f"   ⚠️ Intento {intento + 1}/{MAX_RETRIES} falló: {e}")
                if intento < MAX_RETRIES - 1:
                    time.sleep(5 * (intento + 1))
        return None

    def categorizar_evento(self, nombre, descripcion=''):
        texto = f"{nombre} {descripcion}".lower()
        for categoria, keywords in KEYWORDS.items():
            if any(kw in texto for kw in keywords):
                return categoria
        return 'cultural'

    def _distancia_km(self, lat1, lng1, lat2, lng2):
        """Fórmula Haversine"""
        R = 6371
        dlat = math.radians(lat2 - lat1)
        dlng = math.radians(lng2 - lng1)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(lat1)) *
             math.cos(math.radians(lat2)) *
             math.sin(dlng / 2) ** 2)
        return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    def asignar_zona(self, lat, lng):
        """
        Asigna zona al evento según coordenadas.
        Devuelve la zona más cercana dentro de su radio.
        """
        try:
            lat, lng = float(lat), float(lng)
        except (TypeError, ValueError):
            return 'Madrid'

        mejor_zona = None
        mejor_distancia = float('inf')

        for zona, datos in ZONAS.items():
            distancia = self._distancia_km(
                lat, lng,
                datos['lat'], datos['lng']
            )
            if distancia <= datos['radio'] and distancia < mejor_distancia:
                mejor_distancia = distancia
                mejor_zona = zona

        return mejor_zona if mejor_zona else 'Madrid'

    def geocodificar(self, lugar, municipio=None):
        if not lugar or lugar.strip() == '':
            if municipio and municipio.lower() in MUNICIPIOS:
                coords = MUNICIPIOS[municipio.lower()]
                return coords['lat'], coords['lng']
            return 40.4168, -3.7038

        lugar_lower = lugar.lower().strip()

        for venue, coords in KNOWN_VENUES.items():
            if venue in lugar_lower:
                return coords['lat'], coords['lng']

        for muni, coords in MUNICIPIOS.items():
            if muni in lugar_lower:
                return coords['lat'], coords['lng']

        lugares_genericos = [
            'madrid', 'españa', 'spain',
            'comunidad de madrid', 'online'
        ]
        if lugar_lower in lugares_genericos:
            if municipio and municipio.lower() in MUNICIPIOS:
                coords = MUNICIPIOS[municipio.lower()]
                return coords['lat'], coords['lng']
            return 40.4168, -3.7038

        if self.geolocator:
            try:
                query = f"{lugar}, Madrid, España"
                location = self.geolocator.geocode(query, timeout=10)
                if location:
                    if (40.0 <= location.latitude <= 41.2 and
                            -4.5 <= location.longitude <= -3.0):
                        print(f"      🗺️ Geocodificado: {lugar[:40]}")
                        time.sleep(GEOCODING_DELAY)
                        return (
                            round(location.latitude, 6),
                            round(location.longitude, 6)
                        )
            except (GeocoderTimedOut, GeocoderServiceError) as e:
                print(f"      ⚠️ Error geocodificación: {e}")

        return 40.4168, -3.7038

    def limpiar_texto(self, texto, max_length=300):
        if not texto:
            return ''
        texto = re.sub(r'<[^>]+>', '', str(texto))
        texto = (texto
                 .replace('&nbsp;', ' ')
                 .replace('&amp;', '&')
                 .replace('&lt;', '<')
                 .replace('&gt;', '>')
                 .replace('&#34;', '"')
                 .replace('&#39;', "'")
                 .replace('\r\n', ' ')
                 .replace('\n', ' ')
                 .replace('\t', ' '))
        texto = ' '.join(texto.split()).strip()
        return texto[:max_length] if len(texto) > max_length else texto

    def parsear_fecha(self, fecha_str):
        if not fecha_str:
            return None
        try:
            s = str(fecha_str).strip()
            if 'T' in s:
                return s.split('T')[0]
            if ' ' in s and s[0].isdigit():
                return s.split(' ')[0]
            if '/' in s:
                partes = s.split('/')
                if len(partes) == 3:
                    d, m, y = partes
                    return f"{y.zfill(4)}-{m.zfill(2)}-{d.zfill(2)}"
            if re.match(r'^\d{4}-\d{2}-\d{2}', s):
                return s[:10]
            return None
        except Exception:
            return None

    def es_fecha_futura(self, fecha_str):
        fecha = self.parsear_fecha(fecha_str)
        if not fecha:
            return False
        try:
            return fecha >= date.today().isoformat()
        except Exception:
            return False

    def validar_coordenadas(self, lat, lng):
        try:
            lat, lng = float(lat), float(lng)
            return (40.0 <= lat <= 41.2 and -4.5 <= lng <= -3.0)
        except (TypeError, ValueError):
            return False

    # ===== FUENTE 1: ES MADRID =====

    def scrape_esmadrid(self):
        print("\n🔍 Scrapeando ES Madrid API...")

        url = ('https://datos.madrid.es/egob/catalogo/'
               '206974-0-agenda-eventos-culturales-100.json')
        response = self.hacer_request(url)
        if not response:
            print("   ❌ No se pudo acceder a ES Madrid")
            return

        try:
            data = response.json()
            eventos_json = data.get('@graph', [])
            print(f"   📄 Total eventos en API: {len(eventos_json)}")

            total = 0
            saltados = 0

            for evento_data in eventos_json:
                try:
                    nombre = self.limpiar_texto(
                        evento_data.get('title', '')
                    )
                    if not nombre or len(nombre) < 3:
                        saltados += 1
                        continue

                    fecha_inicio = self.parsear_fecha(
                        evento_data.get('dtstart', '')
                    )
                    fecha_fin = self.parsear_fecha(
                        evento_data.get('dtend', '')
                    )

                    if not self.es_fecha_futura(fecha_fin or fecha_inicio):
                        saltados += 1
                        continue

                    location = evento_data.get('location', {})
                    lat, lng = 40.4168, -3.7038
                    lugar = 'Madrid'

                    if isinstance(location, dict):
                        lat_raw = location.get('latitude')
                        lng_raw = location.get('longitude')

                        if lat_raw and lng_raw:
                            try:
                                lat_f = float(lat_raw)
                                lng_f = float(lng_raw)
                                if self.validar_coordenadas(lat_f, lng_f):
                                    lat, lng = lat_f, lng_f
                            except (ValueError, TypeError):
                                pass

                        org = location.get('organization', {})
                        if isinstance(org, dict) and org.get('organization-name'):
                            lugar = org['organization-name']
                            direccion = location.get('address', {})
                            if isinstance(direccion, dict):
                                calle = direccion.get('street-address', '')
                                if calle and calle.lower() not in lugar.lower():
                                    lugar = f"{lugar} - {calle}"
                        else:
                            direccion = location.get('address', {})
                            if isinstance(direccion, dict):
                                lugar = (
                                    direccion.get('street-address') or
                                    direccion.get('locality') or
                                    'Madrid'
                                )

                    if lat == 40.4168 and lng == -3.7038 and lugar != 'Madrid':
                        lat, lng = self.geocodificar(lugar)

                    descripcion = self.limpiar_texto(
                        evento_data.get('description', ''), 300
                    )

                    url_evento = (
                        evento_data.get('link', '') or
                        evento_data.get('@id', '') or
                        ''
                    )

                    precio_raw = self.limpiar_texto(
                        str(evento_data.get('price', ''))
                    ).lower()

                    if any(p in precio_raw for p in [
                        'gratis', 'gratuito', 'free',
                        '0 €', '0€', 'entrada libre'
                    ]):
                        precio = 'gratis'
                    elif precio_raw and precio_raw not in ['', 'none', 'null']:
                        precio = 'pago'
                    else:
                        precio = 'gratis'

                    tipo = self.categorizar_evento(nombre, descripcion)
                    zona = self.asignar_zona(lat, lng)

                    evento = {
                        'nombre': nombre,
                        'fecha': fecha_inicio,
                        'tipo': tipo,
                        'lat': lat,
                        'lng': lng,
                        'lugar': lugar,
                        'zona': zona,
                        'precio': precio,
                        'descripcion': descripcion,
                        'url': url_evento,
                        'fuente': 'esmadrid'
                    }

                    if fecha_fin and fecha_fin != fecha_inicio:
                        evento['fecha_fin'] = fecha_fin

                    self.eventos.append(evento)
                    total += 1

                    if total % 100 == 0:
                        print(f"   ✅ {total} eventos procesados...")

                except Exception as e:
                    self.stats['errores'] += 1
                    continue

            self.stats['esmadrid'] = total
            print(f"   📊 Extraídos: {total} | Saltados: {saltados}")

        except Exception as e:
            print(f"   ❌ Error procesando ES Madrid: {e}")
            self.stats['errores'] += 1

    # ===== FUENTE 2: TICKETMASTER =====

    def scrape_ticketmaster(self):
        print("\n🔍 Scrapeando Ticketmaster...")

        api_key = os.environ.get('TICKETMASTER_KEY', '')
        if not api_key:
            print("   ⚠️ TICKETMASTER_KEY no configurada — saltando")
            return

        total = 0
        page = 0

        while page < 5:
            params = {
                'apikey': api_key,
                'city': 'Madrid',
                'countryCode': 'ES',
                'radius': '50',
                'unit': 'km',
                'size': 100,
                'page': page,
                'sort': 'date,asc',
                'startDateTime': datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')
            }

            try:
                print(f"   🌐 Página {page + 1}...")
                response = requests.get(
                    'https://app.ticketmaster.com/discovery/v2/events.json',
                    params=params,
                    timeout=15
                )

                if response.status_code == 401:
                    print("   ❌ API key inválida")
                    break
                if response.status_code == 429:
                    print("   ⚠️ Rate limit — esperando 30s...")
                    time.sleep(30)
                    continue
                if response.status_code != 200:
                    print(f"   ❌ Error {response.status_code}")
                    break

                data = response.json()
                embedded = data.get('_embedded', {})
                eventos_raw = embedded.get('events', [])
                page_info = data.get('page', {})
                total_pages = page_info.get('totalPages', 1)

                print(f"   📄 {len(eventos_raw)} eventos "
                      f"(página {page + 1}/{min(total_pages, 5)})")

                if not eventos_raw:
                    break

                for evento_data in eventos_raw:
                    try:
                        nombre = self.limpiar_texto(
                            evento_data.get('name', '')
                        )
                        if not nombre:
                            continue

                        dates = evento_data.get('dates', {})
                        start = dates.get('start', {})
                        fecha_inicio = self.parsear_fecha(
                            start.get('localDate', '')
                        )

                        if not fecha_inicio or not self.es_fecha_futura(fecha_inicio):
                            continue

                        venues = evento_data.get(
                            '_embedded', {}
                        ).get('venues', [])
                        lat, lng = 40.4168, -3.7038
                        lugar = 'Madrid'

                        if venues:
                            venue = venues[0]
                            nombre_venue = self.limpiar_texto(
                                venue.get('name', '')
                            )
                            ciudad = venue.get(
                                'city', {}
                            ).get('name', 'Madrid')

                            lugar = nombre_venue if nombre_venue else ciudad
                            if (ciudad and
                                    ciudad.lower() not in lugar.lower() and
                                    ciudad != 'Madrid'):
                                lugar = f"{lugar} ({ciudad})"

                            location = venue.get('location', {})
                            lat_raw = location.get('latitude')
                            lng_raw = location.get('longitude')

                            if lat_raw and lng_raw:
                                try:
                                    lat_f = float(lat_raw)
                                    lng_f = float(lng_raw)
                                    if self.validar_coordenadas(lat_f, lng_f):
                                        lat, lng = lat_f, lng_f
                                except (ValueError, TypeError):
                                    pass

                        # ✅ FIX — CAPA 2: Geocodificación como plan B
                        # ────────────────────────────────────────────
                        # Si después de procesar el venue las coords siguen
                        # siendo las genéricas (40.4168, -3.7038), significa
                        # que la API no nos dio coords válidas.
                        # Intentamos geocodificar por el nombre del venue,
                        # que primero buscará en KNOWN_VENUES (instantáneo)
                        # y si no, usará Nominatim (llamada externa).
                        coords_son_genericas = (
                            lat == 40.4168 and lng == -3.7038
                        )
                        if coords_son_genericas and lugar != 'Madrid':
                            lat_geo, lng_geo = self.geocodificar(lugar)
                            if self.validar_coordenadas(lat_geo, lng_geo):
                                lat, lng = lat_geo, lng_geo
                                self.stats['geocodificados'] += 1
                                print(f"      🗺️ Geocodificado venue TM: "
                                      f"{lugar[:40]}")
                        # ────────────────────────────────────────────

                        descripcion = self.limpiar_texto(
                            evento_data.get('info', '') or
                            evento_data.get('pleaseNote', ''),
                            300
                        )

                        url = evento_data.get('url', '')

                        precio_desde = None
                        price_ranges = evento_data.get('priceRanges', [])
                        if price_ranges:
                            precio_min = price_ranges[0].get('min', 0)
                            if precio_min == 0:
                                precio = 'gratis'
                            else:
                                precio = 'pago'
                                precio_desde = f"{precio_min:.0f}€"
                        else:
                            precio = 'pago'

                        classifications = evento_data.get(
                            'classifications', []
                        )
                        segment = ''
                        genre = ''
                        if classifications:
                            segment = classifications[0].get(
                                'segment', {}
                            ).get('name', '')
                            genre = classifications[0].get(
                                'genre', {}
                            ).get('name', '')

                        tipo = self.categorizar_evento(
                            nombre,
                            f"{descripcion} {segment} {genre}"
                        )
                        zona = self.asignar_zona(lat, lng)

                        evento = {
                            'nombre': nombre,
                            'fecha': fecha_inicio,
                            'tipo': tipo,
                            'lat': lat,
                            'lng': lng,
                            'lugar': lugar,
                            'zona': zona,
                            'precio': precio,
                            'descripcion': descripcion,
                            'url': url,
                            'fuente': 'ticketmaster'
                        }

                        if precio_desde:
                            evento['precio_desde'] = precio_desde

                        self.eventos.append(evento)
                        total += 1

                    except Exception as e:
                        self.stats['errores'] += 1
                        continue

                page += 1
                if page >= total_pages:
                    break

                time.sleep(DELAY_BETWEEN_REQUESTS)

            except Exception as e:
                print(f"   ❌ Error en página {page}: {e}")
                break

        self.stats['ticketmaster'] = total
        print(f"   📊 Total extraídos de Ticketmaster: {total}")

    # ===== FUENTE 3: API-FOOTBALL =====


    # ===== ELIMINAR DUPLICADOS =====

    def eliminar_duplicados(self):
        print("\n🧹 Eliminando duplicados...")
        antes = len(self.eventos)

        eventos_unicos = []
        vistos = set()

        for evento in self.eventos:
            nombre_norm = re.sub(
                r'\s+', ' ',
                evento['nombre'].lower().strip()
            )
            clave = f"{nombre_norm[:60]}_{evento.get('fecha', '')[:10]}"

            if clave not in vistos:
                vistos.add(clave)
                eventos_unicos.append(evento)
            else:
                self.stats['duplicados'] += 1

        self.eventos = eventos_unicos
        eliminados = antes - len(self.eventos)
        print(f"   ⚠️ Eliminados {eliminados} duplicados")
        print(f"   ✅ {len(self.eventos)} eventos únicos")

    # ===== EJECUTAR =====

    def ejecutar(self):
        print("=" * 60)
        print("🤖 SCRAPER DE EVENTOS MADRID")
        print("=" * 60)
        print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print()

        # Wrap each source in try-except for resilience
        sources = [
            ("ES Madrid", self.scrape_esmadrid),
            ("Ticketmaster", self.scrape_ticketmaster)
        ]

        for name, func in sources:
            try:
                func()
            except Exception as e:
                print(f"\n❌ ERROR CRÍTICO en {name}: {e}")
                self.stats['errores'] += 1

        self.eliminar_duplicados()

        total = self.guardar_eventos()

        print()
        print("=" * 60)
        print("📈 RESUMEN FINAL")
        print("=" * 60)
        print(f"🏛️  ES Madrid:      {self.stats['esmadrid']:>5} eventos")
        print(f"🎟️  Ticketmaster:   {self.stats['ticketmaster']:>5} eventos")
        print(f"➕  Nuevos:         {self.stats['nuevos']:>5}")
        print(f"🔄  Duplicados:     {self.stats['duplicados']:>5}")
        print(f"⚠️   Errores:        {self.stats['errores']:>5}")
        # ✅ NUEVO: mostramos las nuevas stats en el resumen
        print(f"🗺️  Geocodificados: {self.stats['geocodificados']:>5}")
        print(f"🚫  Descartados:    {self.stats['descartados_coords']:>5}")
        print(f"📊  Total final:    {total:>5}")
        print()
        print("✅ PROCESO COMPLETADO")
        print("=" * 60)


if __name__ == "__main__":
    scraper = EventosScraper()
    scraper.ejecutar()