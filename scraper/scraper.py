#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json
import time
import re
from datetime import datetime, date
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
            'errores': 0
        }

        if GEOPY_AVAILABLE and GEOCODING_ENABLED:
            self.geolocator = Nominatim(user_agent="eventos-madrid-scraper")
        else:
            self.geolocator = None

        self.cargar_eventos_existentes()

    # ===== CARGA Y GUARDADO =====

    def cargar_eventos_existentes(self):
        json_path = Path(__file__).parent / EVENTOS_JSON_PATH
        if json_path.exists():
            try:
                with open(json_path, 'r', encoding='utf-8') as f:
                    self.eventos_existentes = json.load(f)
                print(f"📂 Cargados {len(self.eventos_existentes)} eventos existentes")
            except Exception as e:
                print(f"⚠️ Error: {e}")
                self.eventos_existentes = []
        else:
            print("📂 No hay eventos previos")
            self.eventos_existentes = []

    def guardar_eventos(self):
        print("\n💾 Guardando eventos...")

        hoy = date.today().isoformat()

        existentes_vigentes = [
            e for e in self.eventos_existentes
            if (e.get('fecha_fin') or e.get('fecha', ''))[:10] >= hoy
        ]
        eliminados = len(self.eventos_existentes) - len(existentes_vigentes)
        print(f"   🗑️ Eliminados {eliminados} eventos pasados")

        nombres_existentes = {e['nombre'].lower().strip() for e in existentes_vigentes}
        nuevos = 0

        for evento in self.eventos:
            nombre_lower = evento['nombre'].lower().strip()
            if nombre_lower not in nombres_existentes:
                existentes_vigentes.append(evento)
                nombres_existentes.add(nombre_lower)
                nuevos += 1

        self.stats['nuevos'] = nuevos

        existentes_vigentes.sort(key=lambda x: x.get('fecha', '9999-12-31')[:10])

        max_id = max([e.get('id', 0) for e in existentes_vigentes], default=0)
        for i, evento in enumerate(existentes_vigentes):
            if 'id' not in evento:
                evento['id'] = max_id + i + 1

        json_path = Path(__file__).parent / EVENTOS_JSON_PATH
        json_path.parent.mkdir(exist_ok=True)

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(existentes_vigentes, f, ensure_ascii=False, indent=2)

        print(f"   ✅ Guardados {len(existentes_vigentes)} eventos en total")
        return len(existentes_vigentes)

    # ===== HELPERS =====

    def hacer_request(self, url, headers=None):
        _headers = headers or HEADERS
        for intento in range(MAX_RETRIES):
            try:
                print(f"   🌐 Request a {url[:70]}...")
                response = requests.get(
                    url,
                    headers=_headers,
                    timeout=15,
                    verify=True
                )
                response.raise_for_status()
                time.sleep(DELAY_BETWEEN_REQUESTS)
                return response
            except Exception as e:
                print(f"   ⚠️ Intento {intento + 1}/{MAX_RETRIES} falló: {e}")
                if intento < MAX_RETRIES - 1:
                    time.sleep(5)
        return None

    def categorizar_evento(self, nombre, descripcion=''):
        texto = f"{nombre} {descripcion}".lower()
        for categoria, keywords in KEYWORDS.items():
            if any(kw in texto for kw in keywords):
                return categoria
        return 'cultural'

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

        lugares_genericos = ['madrid', 'españa', 'spain', 'comunidad de madrid']
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
                    print(f"      🗺️ Geocodificado: {lugar[:40]}")
                    time.sleep(GEOCODING_DELAY)
                    return round(location.latitude, 6), round(location.longitude, 6)
            except (GeocoderTimedOut, GeocoderServiceError) as e:
                print(f"      ⚠️ Error geocodificación: {e}")

        return 40.4168, -3.7038

    def limpiar_texto(self, texto, max_length=300):
        if not texto:
            return ''
        texto = re.sub(r'<[^>]+>', '', str(texto))
        texto = texto.replace('&nbsp;', ' ').replace('&amp;', '&')
        texto = texto.replace('&lt;', '<').replace('&gt;', '>')
        texto = texto.replace('&#34;', '"').replace('&#39;', "'")
        texto = ' '.join(texto.split())
        return texto[:max_length] if len(texto) > max_length else texto

    def parsear_fecha(self, fecha_str):
        if not fecha_str:
            return None
        try:
            s = str(fecha_str).strip()
            if 'T' in s:
                return s.split('T')[0]
            if ' ' in s:
                return s.split(' ')[0]
            if '/' in s:
                partes = s.split('/')
                if len(partes) == 3:
                    return f"{partes[2]}-{partes[1].zfill(2)}-{partes[0].zfill(2)}"
            return s[:10]
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

    # ===== FUENTE 1: ES MADRID =====

    def scrape_esmadrid(self):
        print("\n🔍 Scrapeando ES Madrid API...")

        url = 'https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json'
        response = self.hacer_request(url)
        if not response:
            print("   ❌ No se pudo acceder")
            return

        try:
            data = response.json()
            eventos_json = data.get('@graph', [])
            print(f"   📄 Total eventos en API: {len(eventos_json)}")

            total = 0
            for evento_data in eventos_json:
                try:
                    nombre = self.limpiar_texto(evento_data.get('title', ''))
                    if not nombre:
                        continue

                    fecha_inicio = self.parsear_fecha(evento_data.get('dtstart', ''))
                    fecha_fin = self.parsear_fecha(evento_data.get('dtend', ''))

                    if not self.es_fecha_futura(fecha_fin or fecha_inicio):
                        continue

                    location = evento_data.get('location', {})
                    lat, lng = 40.4168, -3.7038
                    lugar = 'Madrid'

                    if isinstance(location, dict):
                        lat_raw = location.get('latitude')
                        lng_raw = location.get('longitude')
                        if lat_raw and lng_raw:
                            try:
                                lat = float(lat_raw)
                                lng = float(lng_raw)
                            except (ValueError, TypeError):
                                pass

                        org = location.get('organization', {})

                        # ===== CAMBIO 1: Extraer lugar real =====
                        if isinstance(org, dict) and org.get('organization-name'):
                            lugar = org['organization-name']
                            # Añadir calle si existe y aporta info extra
                            direccion = location.get('address', {})
                            if isinstance(direccion, dict):
                                calle = direccion.get('street-address', '')
                                if calle and calle.lower() not in lugar.lower():
                                    lugar = f"{lugar} - {calle}"
                        else:
                            direccion = location.get('address', {})
                            if isinstance(direccion, dict):
                                lugar = (direccion.get('street-address') or
                                        direccion.get('locality') or 'Madrid')

                    if lat == 40.4168 and lng == -3.7038 and lugar != 'Madrid':
                        lat, lng = self.geocodificar(lugar)

                    descripcion = self.limpiar_texto(
                        evento_data.get('description', ''), 300
                    )

                    # ===== CAMBIO 2: Vaciar URLs inútiles de madrid.es =====
                    url_raw = evento_data.get('link', '') or evento_data.get('@id', '')
                    if url_raw and 'index.jsp' in url_raw.lower():
                        url_evento = ''
                    else:
                        url_evento = url_raw

                    precio_raw = self.limpiar_texto(
                        str(evento_data.get('price', ''))
                    ).lower()
                    if any(p in precio_raw for p in ['gratis', 'gratuito', 'free', '0 €', '0€']):
                        precio = 'gratis'
                    elif precio_raw:
                        precio = 'pago'
                    else:
                        precio = 'gratis'

                    tipo = self.categorizar_evento(nombre, descripcion)

                    evento = {
                        'nombre': nombre,
                        'fecha': fecha_inicio,
                        'tipo': tipo,
                        'lat': lat,
                        'lng': lng,
                        'lugar': lugar,
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
            print(f"   📊 Total extraídos de ES Madrid: {total}")

        except Exception as e:
            print(f"   ❌ Error: {e}")

    # ===== FUENTE 2: TICKETMASTER =====

    def scrape_ticketmaster(self):
        """
        API oficial de Ticketmaster
        Gratuita, cubre Madrid y toda la Comunidad
        """
        print("\n🔍 Scrapeando Ticketmaster...")

        api_key = os.environ.get('TICKETMASTER_KEY', '')
        if not api_key:
            print("   ⚠️ No hay API key configurada")
            return

        total = 0
        page = 0
        has_more = True

        while has_more and page < 10:
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

                if response.status_code != 200:
                    print(f"   ❌ Error {response.status_code}: {response.text[:200]}")
                    break

                data = response.json()

                embedded = data.get('_embedded', {})
                eventos_raw = embedded.get('events', [])
                page_info = data.get('page', {})

                total_pages = page_info.get('totalPages', 1)
                print(f"   📄 {len(eventos_raw)} eventos en página {page + 1} de {total_pages}")

                for evento_data in eventos_raw:
                    try:
                        nombre = self.limpiar_texto(evento_data.get('name', ''))
                        if not nombre:
                            continue

                        dates = evento_data.get('dates', {})
                        start = dates.get('start', {})
                        fecha_inicio = self.parsear_fecha(
                            start.get('localDate', '')
                        )

                        if not fecha_inicio or not self.es_fecha_futura(fecha_inicio):
                            continue

                        venues = evento_data.get('_embedded', {}).get('venues', [])
                        lat, lng = 40.4168, -3.7038
                        lugar = 'Madrid'

                        if venues:
                            venue = venues[0]
                            nombre_venue = self.limpiar_texto(venue.get('name', ''))
                            ciudad = venue.get('city', {}).get('name', 'Madrid')

                            lugar = nombre_venue if nombre_venue else ciudad

                            if ciudad and ciudad.lower() not in lugar.lower():
                                lugar = f"{lugar} ({ciudad})"

                            location = venue.get('location', {})
                            lat_raw = location.get('latitude')
                            lng_raw = location.get('longitude')

                            if lat_raw and lng_raw:
                                try:
                                    lat = float(lat_raw)
                                    lng = float(lng_raw)
                                except (ValueError, TypeError):
                                    pass

                        descripcion = self.limpiar_texto(
                            evento_data.get('info', '') or
                            evento_data.get('pleaseNote', ''),
                            300
                        )

                        url = evento_data.get('url', '')

                        price_ranges = evento_data.get('priceRanges', [])
                        if price_ranges:
                            precio_min = price_ranges[0].get('min', 0)
                            precio = 'gratis' if precio_min == 0 else 'pago'
                            if precio == 'pago':
                                precio_desde = f"{precio_min:.0f}€"
                        else:
                            precio = 'pago'
                            precio_desde = None

                        classifications = evento_data.get('classifications', [])
                        segment = ''
                        genre = ''
                        if classifications:
                            segment = classifications[0].get('segment', {}).get('name', '')
                            genre = classifications[0].get('genre', {}).get('name', '')

                        tipo = self.categorizar_evento(
                            nombre, f"{descripcion} {segment} {genre}"
                        )

                        evento = {
                            'nombre': nombre,
                            'fecha': fecha_inicio,
                            'tipo': tipo,
                            'lat': lat,
                            'lng': lng,
                            'lugar': lugar,
                            'precio': precio,
                            'descripcion': descripcion,
                            'url': url,
                            'fuente': 'ticketmaster'
                        }

                        if precio == 'pago' and precio_desde:
                            evento['precio_desde'] = precio_desde

                        self.eventos.append(evento)
                        total += 1

                    except Exception as e:
                        self.stats['errores'] += 1
                        continue

                page += 1
                has_more = page < total_pages and page < 10
                time.sleep(DELAY_BETWEEN_REQUESTS)

            except Exception as e:
                print(f"   ❌ Error en página {page}: {e}")
                break

        self.stats['ticketmaster'] = total
        print(f"   📊 Total extraídos de Ticketmaster: {total}")

    # ===== ELIMINAR DUPLICADOS =====

    def eliminar_duplicados(self):
        print("\n🧹 Eliminando duplicados...")
        antes = len(self.eventos)

        eventos_unicos = []
        vistos = set()

        for evento in self.eventos:
            nombre_norm = evento['nombre'].lower().strip()
            nombre_norm = re.sub(r'\s+', ' ', nombre_norm)
            clave = f"{nombre_norm[:60]}_{evento.get('fecha', '')[:10]}"

            if clave not in vistos:
                vistos.add(clave)
                eventos_unicos.append(evento)
            else:
                self.stats['duplicados'] += 1

        self.eventos = eventos_unicos
        print(f"   ⚠️ Eliminados {antes - len(self.eventos)} duplicados")
        print(f"   ✅ {len(self.eventos)} eventos únicos")

    # ===== EJECUTAR =====

    def ejecutar(self):
        print("=" * 60)
        print("🤖 SCRAPER DE EVENTOS MADRID")
        print("=" * 60)
        print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

        self.scrape_esmadrid()
        self.scrape_ticketmaster()
        self.eliminar_duplicados()

        total = self.guardar_eventos()

        print()
        print("=" * 60)
        print("📈 RESUMEN")
        print("=" * 60)
        print(f"🏛️  ES Madrid:      {self.stats['esmadrid']} eventos")
        print(f"🎟️  Ticketmaster:   {self.stats.get('ticketmaster', 0)} eventos")
        print(f"🔄  Duplicados:     {self.stats['duplicados']}")
        print(f"⚠️   Errores:        {self.stats['errores']}")
        print(f"📊  Total:          {total}")
        print()
        print("✅ PROCESO COMPLETADO")
        print("=" * 60)


if __name__ == "__main__":
    scraper = EventosScraper()
    scraper.ejecutar()