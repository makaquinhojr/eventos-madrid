#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
EventosMadrid - Web Scraper
Fuentes: ES Madrid API + Municipios Comunidad de Madrid
"""

import requests
from bs4 import BeautifulSoup
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
            'municipios': 0,
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

        # Eliminar eventos pasados de los existentes
        existentes_vigentes = [
            e for e in self.eventos_existentes
            if (e.get('fecha_fin') or e.get('fecha', ''))[:10] >= hoy
        ]
        eliminados = len(self.eventos_existentes) - len(existentes_vigentes)
        print(f"   🗑️ Eliminados {eliminados} eventos pasados")

        # Añadir nuevos sin duplicar
        nombres_existentes = {e['nombre'].lower().strip() for e in existentes_vigentes}
        nuevos = 0

        for evento in self.eventos:
            nombre_lower = evento['nombre'].lower().strip()
            if nombre_lower not in nombres_existentes:
                existentes_vigentes.append(evento)
                nombres_existentes.add(nombre_lower)
                nuevos += 1

        self.stats['nuevos'] = nuevos

        # Ordenar por fecha
        existentes_vigentes.sort(key=lambda x: x.get('fecha', '9999-12-31')[:10])

        # Asignar IDs
        max_id = max([e.get('id', 0) for e in existentes_vigentes], default=0)
        for i, evento in enumerate(existentes_vigentes):
            if 'id' not in evento:
                evento['id'] = max_id + i + 1

        # Guardar
        json_path = Path(__file__).parent / EVENTOS_JSON_PATH
        json_path.parent.mkdir(exist_ok=True)

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(existentes_vigentes, f, ensure_ascii=False, indent=2)

        print(f"   ✅ Guardados {len(existentes_vigentes)} eventos en total")
        return len(existentes_vigentes)

    # ===== HELPERS =====

    def hacer_request(self, url, as_json=False):
        for intento in range(MAX_RETRIES):
            try:
                print(f"   🌐 Request a {url[:70]}...")
                response = requests.get(url, headers=HEADERS, timeout=15)
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
        """
        Geocodifica un lugar con múltiples estrategias:
        1. Venues conocidos exactos
        2. Municipios conocidos
        3. Nominatim como último recurso
        """
        if not lugar or lugar.strip() == '':
            if municipio:
                return self.geocodificar(municipio)
            return 40.4168, -3.7038

        lugar_lower = lugar.lower().strip()

        # 1. Buscar en venues conocidos
        for venue, coords in KNOWN_VENUES.items():
            if venue in lugar_lower:
                return coords['lat'], coords['lng']

        # 2. Buscar en municipios conocidos
        for muni, coords in MUNICIPIOS.items():
            if muni in lugar_lower:
                return coords['lat'], coords['lng']

        # 3. Si el lugar es solo "Madrid" o muy genérico, no geocodificar
        lugares_genericos = ['madrid', 'españa', 'spain', 'comunidad de madrid']
        if lugar_lower in lugares_genericos:
            if municipio and municipio.lower() in MUNICIPIOS:
                coords = MUNICIPIOS[municipio.lower()]
                return coords['lat'], coords['lng']
            return 40.4168, -3.7038

        # 4. Nominatim para lugares específicos
        if self.geolocator:
            try:
                query = f"{lugar}, Madrid, España"
                location = self.geolocator.geocode(query, timeout=10)
                if location:
                    print(f"      🗺️ Geocodificado: {lugar[:40]} → {location.latitude:.4f}, {location.longitude:.4f}")
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
            # ISO con T
            if 'T' in s:
                return s.split('T')[0]
            # Con espacio
            if ' ' in s:
                return s.split(' ')[0]
            # DD/MM/YYYY
            if '/' in s:
                partes = s.split('/')
                if len(partes) == 3:
                    return f"{partes[2]}-{partes[1].zfill(2)}-{partes[0].zfill(2)}"
            # Ya en formato correcto
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

    # ===== FUENTE 1: ES MADRID API =====

    def scrape_esmadrid(self):
        print("\n🔍 Scrapeando ES Madrid API...")

        url = URLS['esmadrid_api']
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

                    # Ubicación
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

                        # Nombre del lugar
                        org = location.get('organization', {})
                        if isinstance(org, dict) and org.get('organization-name'):
                            lugar = org['organization-name']
                        else:
                            direccion = location.get('address', {})
                            if isinstance(direccion, dict):
                                lugar = (direccion.get('street-address') or
                                        direccion.get('locality') or 'Madrid')

                    # Si coordenadas son genéricas, intentar geocodificar por lugar
                    if lat == 40.4168 and lng == -3.7038 and lugar != 'Madrid':
                        lat, lng = self.geocodificar(lugar)

                    descripcion = self.limpiar_texto(evento_data.get('description', ''), 300)
                    url_evento = evento_data.get('link', '') or evento_data.get('@id', '')

                    precio_raw = self.limpiar_texto(str(evento_data.get('price', ''))).lower()
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

    # ===== FUENTE 2: MUNICIPIOS DE LA COMUNIDAD =====

    def scrape_municipios(self):
        """
        Scrapea agendas de municipios del sur/este de Madrid
        usando la API de datos abiertos de cada ayuntamiento
        """
        print("\n🔍 Scrapeando municipios de la Comunidad de Madrid...")

        # APIs de datos abiertos municipales que SÍ funcionan
        fuentes_municipios = [
            {
                'nombre': 'Alcalá de Henares',
                'url': 'https://www.turismoalcala.es/agenda/?format=json',
                'municipio': 'Alcalá de Henares',
                'tipo': 'opendatasoft'
            },
            {
                'nombre': 'Getafe',
                'url': 'https://www.getafe.es/agenda/?format=json',
                'municipio': 'Getafe',
                'tipo': 'opendatasoft'
            },
            {
                'nombre': 'Leganés',
                'url': 'https://www.leganes.org/agenda/?format=json',
                'municipio': 'Leganés',
                'tipo': 'opendatasoft'
            },
        ]

        total = 0

        for fuente in fuentes_municipios:
            print(f"\n   📍 {fuente['nombre']}...")
            response = self.hacer_request(fuente['url'])

            if not response:
                print(f"   ⚠️ No se pudo acceder a {fuente['nombre']}")
                continue

            try:
                data = response.json()

                # Formato OpenDataSoft
                if fuente['tipo'] == 'opendatasoft':
                    registros = data.get('results', [])
                    print(f"   📄 {len(registros)} eventos encontrados")

                    for registro in registros:
                        try:
                            # Los campos varían por municipio, intentamos varios nombres
                            nombre = self.limpiar_texto(
                                registro.get('titulo') or
                                registro.get('title') or
                                registro.get('nombre') or
                                registro.get('denominacion') or ''
                            )
                            if not nombre:
                                continue

                            fecha_inicio = self.parsear_fecha(
                                registro.get('fecha_inicio') or
                                registro.get('date_debut') or
                                registro.get('fecha') or
                                registro.get('dtstart') or ''
                            )
                            fecha_fin = self.parsear_fecha(
                                registro.get('fecha_fin') or
                                registro.get('date_fin') or
                                registro.get('dtend') or ''
                            )

                            if not fecha_inicio:
                                continue
                            if not self.es_fecha_futura(fecha_fin or fecha_inicio):
                                continue

                            # Coordenadas
                            lat, lng = 0, 0
                            geo = registro.get('geo_point_2d') or registro.get('coordenadas') or {}
                            if isinstance(geo, dict):
                                lat = float(geo.get('lat', 0) or 0)
                                lng = float(geo.get('lon', 0) or 0)

                            lugar = self.limpiar_texto(
                                registro.get('lugar') or
                                registro.get('location') or
                                registro.get('espacio') or
                                fuente['municipio']
                            )

                            if lat == 0 or lng == 0:
                                lat, lng = self.geocodificar(lugar, fuente['municipio'])

                            descripcion = self.limpiar_texto(
                                registro.get('descripcion') or
                                registro.get('description') or
                                registro.get('resumen') or '', 300
                            )

                            url = (
                                registro.get('url') or
                                registro.get('link') or
                                registro.get('enlace') or ''
                            )

                            precio_raw = str(registro.get('precio', '') or
                                           registro.get('price', '') or '').lower()
                            if any(p in precio_raw for p in ['gratis', 'gratuito', 'free', '0']):
                                precio = 'gratis'
                            elif precio_raw and precio_raw.strip():
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
                                'lugar': f"{lugar} ({fuente['municipio']})" if fuente['municipio'].lower() not in lugar.lower() else lugar,
                                'precio': precio,
                                'descripcion': descripcion,
                                'url': url,
                                'fuente': fuente['municipio'].lower().replace(' ', '_')
                            }

                            if fecha_fin and fecha_fin != fecha_inicio:
                                evento['fecha_fin'] = fecha_fin

                            self.eventos.append(evento)
                            total += 1

                        except Exception as e:
                            self.stats['errores'] += 1
                            continue

            except Exception as e:
                print(f"   ⚠️ Error procesando {fuente['nombre']}: {e}")
                continue

        self.stats['municipios'] = total
        print(f"\n   📊 Total extraídos de municipios: {total}")

    def scrape_eventbrite(self):
        """
        API oficial de Eventbrite
        Cubre Madrid capital y municipios de la Comunidad
        """
        print("\n🔍 Scrapeando Eventbrite...")

        if not EVENTBRITE_TOKEN:
            print("   ⚠️ No hay token de Eventbrite configurado")
            return

        headers = {
            'Authorization': f'Bearer {EVENTBRITE_TOKEN}',
            'Content-Type': 'application/json'
        }

        total = 0
        page = 1
        has_more = True

        while has_more:
            params = {
                'q': 'Madrid',
                'location.address': 'Madrid, Spain',
                'location.within': '50km',
                'start_date.range_start': datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
                'expand': 'venue,category',
                'page_size': 50,
                'page': page,
            }

            try:
                print(f"   🌐 Página {page}...")
                response = requests.get(
                    'https://www.eventbriteapi.com/v3/events/search/',
                    headers=headers,
                    params=params,
                    timeout=15
                )
                response.raise_for_status()
                time.sleep(DELAY_BETWEEN_REQUESTS)

                data = response.json()
                eventos_raw = data.get('events', [])
                pagination = data.get('pagination', {})

                print(f"   📄 {len(eventos_raw)} eventos en página {page}")

                for evento_data in eventos_raw:
                    try:
                        # Nombre
                        nombre = self.limpiar_texto(
                            evento_data.get('name', {}).get('text', '')
                        )
                        if not nombre:
                            continue

                        # Fechas
                        fecha_inicio = self.parsear_fecha(
                            evento_data.get('start', {}).get('local', '')
                        )
                        fecha_fin = self.parsear_fecha(
                            evento_data.get('end', {}).get('local', '')
                        )

                        if not fecha_inicio:
                            continue
                        if not self.es_fecha_futura(fecha_inicio):
                            continue

                        # Venue (lugar)
                        venue = evento_data.get('venue', {})
                        lat, lng = 40.4168, -3.7038
                        lugar = 'Madrid'

                        if venue:
                            lugar = self.limpiar_texto(
                                venue.get('name', '') or
                                venue.get('address', {}).get('localized_address_display', '') or
                                'Madrid'
                            )

                            # Coordenadas del venue
                            address = venue.get('address', {})
                            lat_raw = address.get('latitude')
                            lng_raw = address.get('longitude')

                            if lat_raw and lng_raw:
                                try:
                                    lat = float(lat_raw)
                                    lng = float(lng_raw)
                                except (ValueError, TypeError):
                                    pass

                            # Ciudad para contexto
                            ciudad = address.get('city', '')
                            if ciudad and ciudad.lower() not in lugar.lower():
                                lugar = f"{lugar} ({ciudad})"

                        # Si coordenadas son 0, geocodificar
                        if lat == 0 or lng == 0:
                            lat, lng = self.geocodificar(lugar)

                        # Descripción
                        descripcion = self.limpiar_texto(
                            evento_data.get('description', {}).get('text', '') or
                            evento_data.get('summary', ''),
                            300
                        )

                        # URL
                        url = evento_data.get('url', '')

                        # Precio
                        is_free = evento_data.get('is_free', False)
                        precio = 'gratis' if is_free else 'pago'

                        # Categoría de Eventbrite → nuestro tipo
                        category = evento_data.get('category', {})
                        category_name = category.get('name', '') if category else ''
                        tipo = self.categorizar_evento(nombre, f"{descripcion} {category_name}")

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
                            'fuente': 'eventbrite'
                        }

                        if fecha_fin and fecha_fin != fecha_inicio:
                            evento['fecha_fin'] = fecha_fin

                        self.eventos.append(evento)
                        total += 1

                    except Exception as e:
                        self.stats['errores'] += 1
                        continue

                # Paginación
                has_more = pagination.get('has_more_items', False)
                page += 1

                # Límite de seguridad: máximo 10 páginas (500 eventos)
                if page > 10:
                    print("   ℹ️ Límite de páginas alcanzado")
                    has_more = False

            except Exception as e:
                print(f"   ❌ Error en página {page}: {e}")
                has_more = False

        self.stats['eventbrite'] = total
        print(f"   📊 Total extraídos de Eventbrite: {total}")

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
        self.scrape_municipios()
        self.scrape_eventbrite()

        self.eliminar_duplicados()

        total = self.guardar_eventos()

        print()
        print("=" * 60)
        print("📈 RESUMEN")
        print("=" * 60)
        print(f"🏛️  ES Madrid:          {self.stats['esmadrid']} eventos")
        print(f"🌍  Municipios CM:      {self.stats['municipios']} eventos")
        print(f"🔄  Duplicados:         {self.stats['duplicados']}")
        print(f"⚠️   Errores:            {self.stats['errores']}")
        print(f"📊  Total base datos:   {total}")
        print()
        print("✅ PROCESO COMPLETADO")
        print("=" * 60)


if __name__ == "__main__":
    scraper = EventosScraper()
    scraper.ejecutar()