#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
EventosMadrid - Web Scraper
Fuentes: ES Madrid API + Comunidad de Madrid
"""

import requests
import json
import time
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
    print("⚠️ geopy no disponible, geocodificación desactivada")
    GEOPY_AVAILABLE = False


class EventosScraper:

    def __init__(self):
        self.eventos = []
        self.eventos_existentes = []
        self.stats = {
            'esmadrid': 0,
            'comunidad': 0,
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
                print(f"⚠️ Error cargando eventos existentes: {e}")
                self.eventos_existentes = []
        else:
            print("📂 No hay eventos previos, creando desde cero")
            self.eventos_existentes = []

    def guardar_eventos(self):
        print("\n💾 Guardando eventos...")

        # Filtrar eventos pasados de los existentes
        hoy = date.today().isoformat()
        existentes_vigentes = [
            e for e in self.eventos_existentes
            if (e.get('fecha_fin') or e.get('fecha', ''))[:10] >= hoy
        ]
        print(f"   🗑️ Eliminados {len(self.eventos_existentes) - len(existentes_vigentes)} eventos pasados")

        # Combinar: existentes vigentes + nuevos sin duplicar
        nombres_existentes = {e['nombre'].lower().strip() for e in existentes_vigentes}
        nuevos_añadidos = 0

        for evento in self.eventos:
            nombre_lower = evento['nombre'].lower().strip()
            if nombre_lower not in nombres_existentes:
                existentes_vigentes.append(evento)
                nombres_existentes.add(nombre_lower)
                nuevos_añadidos += 1

        self.stats['nuevos'] = nuevos_añadidos

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

    def hacer_request(self, url):
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

    def geocodificar(self, lugar):
        if not lugar or lugar.strip() == '':
            return 40.4168, -3.7038

        lugar_lower = lugar.lower().strip()

        # Buscar en venues conocidos
        for venue, coords in KNOWN_VENUES.items():
            if venue in lugar_lower:
                return coords['lat'], coords['lng']

        # Geocodificar con Nominatim
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
        import re
        texto = re.sub(r'<[^>]+>', '', str(texto))
        texto = texto.replace('&nbsp;', ' ').replace('&amp;', '&')
        texto = texto.replace('&lt;', '<').replace('&gt;', '>')
        texto = ' '.join(texto.split())
        return texto[:max_length] if len(texto) > max_length else texto

    def parsear_fecha(self, fecha_str):
        """Convierte cualquier formato de fecha a YYYY-MM-DD"""
        if not fecha_str:
            return None
        try:
            # Formato ISO con T
            if 'T' in str(fecha_str):
                return str(fecha_str).split('T')[0]
            # Formato con espacio
            if ' ' in str(fecha_str):
                return str(fecha_str).split(' ')[0]
            # Ya está en formato correcto
            return str(fecha_str)[:10]
        except Exception:
            return None

    def es_fecha_futura(self, fecha_str):
        """Comprueba si una fecha es hoy o futura"""
        fecha = self.parsear_fecha(fecha_str)
        if not fecha:
            return False
        try:
            return fecha >= date.today().isoformat()
        except Exception:
            return False

    # ===== FUENTE 1: ES MADRID API =====

    def scrape_esmadrid(self):
        """
        API oficial del Ayuntamiento de Madrid
        Sin límite de eventos, con paginación
        """
        print("\n🔍 Scrapeando ES Madrid API...")

        # La API tiene paginación, iterar hasta conseguir todos
        base_url = "https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json"
        total_extraidos = 0

        response = self.hacer_request(base_url)
        if not response:
            print("   ❌ No se pudo acceder a ES Madrid API")
            return

        try:
            data = response.json()
            eventos_json = data.get('@graph', [])
            print(f"   📄 Total eventos en API: {len(eventos_json)}")

            for evento_data in eventos_json:
                try:
                    # Nombre
                    nombre = self.limpiar_texto(evento_data.get('title', ''))
                    if not nombre or nombre == 'Sin título':
                        continue

                    # Fechas
                    fecha_inicio = self.parsear_fecha(evento_data.get('dtstart', ''))
                    fecha_fin = self.parsear_fecha(evento_data.get('dtend', ''))

                    # Saltar eventos pasados
                    fecha_check = fecha_fin or fecha_inicio
                    if not self.es_fecha_futura(fecha_check):
                        continue

                    # Ubicación
                    location = evento_data.get('location', {})
                    lat, lng = 40.4168, -3.7038
                    lugar = 'Madrid'

                    if isinstance(location, dict):
                        lat = float(location.get('latitude', 40.4168) or 40.4168)
                        lng = float(location.get('longitude', -3.7038) or -3.7038)

                        direccion = location.get('address', {})
                        if isinstance(direccion, dict):
                            calle = direccion.get('street-address', '')
                            localidad = direccion.get('locality', 'Madrid')
                            lugar = calle if calle else localidad
                        
                        org = location.get('organization', {})
                        if isinstance(org, dict):
                            nombre_lugar = org.get('organization-name', '')
                            if nombre_lugar:
                                lugar = nombre_lugar

                    # Si las coordenadas son 0 o inválidas, geocodificar
                    if lat == 0 or lng == 0 or (lat == 40.4168 and lng == -3.7038):
                        lat, lng = self.geocodificar(lugar)

                    # Descripción
                    descripcion = self.limpiar_texto(
                        evento_data.get('description', ''), 300
                    )

                    # URL
                    url = evento_data.get('link', '')
                    if not url:
                        url = evento_data.get('@id', '')

                    # Precio
                    precio_raw = self.limpiar_texto(
                        evento_data.get('price', '')
                    ).lower()
                    if any(p in precio_raw for p in ['gratis', 'free', 'gratuito', '0 €', '0€']):
                        precio = 'gratis'
                    elif precio_raw:
                        precio = 'pago'
                    else:
                        precio = 'gratis'  # Por defecto en eventos municipales

                    # Tipo
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
                        'url': url,
                        'fuente': 'esmadrid'
                    }

                    if fecha_fin and fecha_fin != fecha_inicio:
                        evento['fecha_fin'] = fecha_fin

                    self.eventos.append(evento)
                    total_extraidos += 1

                    if total_extraidos % 50 == 0:
                        print(f"   ✅ {total_extraidos} eventos procesados...")

                except Exception as e:
                    self.stats['errores'] += 1
                    continue

        except Exception as e:
            print(f"   ❌ Error parseando respuesta: {e}")
            return

        self.stats['esmadrid'] = total_extraidos
        print(f"   📊 Total extraídos de ES Madrid: {total_extraidos}")

    # ===== FUENTE 2: COMUNIDAD DE MADRID =====

    def scrape_comunidad_madrid(self):
        """
        API de la Comunidad de Madrid
        Eventos de toda la comunidad, no solo el municipio
        """
        print("\n🔍 Scrapeando Comunidad de Madrid...")

        # La Comunidad tiene varios endpoints, probamos los principales
        endpoints = [
            "https://www.comunidad.madrid/sites/default/files/doc/agenda/agenda.json",
            "https://gestiona3.madrid.org/wpad_pub/run/j/MostrarAnuncioDetalle.icm?dato=79205",
        ]

        total_extraidos = 0

        for endpoint in endpoints:
            response = self.hacer_request(endpoint)
            if not response:
                continue

            try:
                data = response.json()

                # La estructura puede variar según el endpoint
                eventos_raw = []
                if isinstance(data, list):
                    eventos_raw = data
                elif isinstance(data, dict):
                    # Buscar la lista de eventos en distintas claves posibles
                    for key in ['eventos', 'items', 'data', 'results', '@graph']:
                        if key in data:
                            eventos_raw = data[key]
                            break

                print(f"   📄 Encontrados {len(eventos_raw)} eventos en {endpoint[:50]}")

                for evento_data in eventos_raw:
                    try:
                        if not isinstance(evento_data, dict):
                            continue

                        # Nombre — distintas claves posibles
                        nombre = self.limpiar_texto(
                            evento_data.get('titulo') or
                            evento_data.get('title') or
                            evento_data.get('nombre') or
                            ''
                        )
                        if not nombre:
                            continue

                        # Fechas
                        fecha_inicio = self.parsear_fecha(
                            evento_data.get('fecha_inicio') or
                            evento_data.get('fechaInicio') or
                            evento_data.get('dtstart') or
                            evento_data.get('fecha') or
                            ''
                        )
                        fecha_fin = self.parsear_fecha(
                            evento_data.get('fecha_fin') or
                            evento_data.get('fechaFin') or
                            evento_data.get('dtend') or
                            ''
                        )

                        if not fecha_inicio:
                            continue

                        fecha_check = fecha_fin or fecha_inicio
                        if not self.es_fecha_futura(fecha_check):
                            continue

                        # Lugar
                        lugar = self.limpiar_texto(
                            evento_data.get('lugar') or
                            evento_data.get('location') or
                            evento_data.get('municipio') or
                            'Madrid'
                        )

                        # Coordenadas
                        lat = float(evento_data.get('latitud') or
                                    evento_data.get('lat') or
                                    evento_data.get('latitude') or 0)
                        lng = float(evento_data.get('longitud') or
                                    evento_data.get('lng') or
                                    evento_data.get('longitude') or 0)

                        if lat == 0 or lng == 0:
                            lat, lng = self.geocodificar(lugar)

                        # Descripción
                        descripcion = self.limpiar_texto(
                            evento_data.get('descripcion') or
                            evento_data.get('description') or
                            evento_data.get('resumen') or
                            '', 300
                        )

                        # URL
                        url = (
                            evento_data.get('url') or
                            evento_data.get('link') or
                            evento_data.get('enlace') or
                            'https://www.comunidad.madrid/agenda'
                        )

                        # Precio
                        precio_raw = self.limpiar_texto(
                            str(evento_data.get('precio', '') or
                                evento_data.get('price', '') or '')
                        ).lower()

                        if any(p in precio_raw for p in ['gratis', 'gratuito', 'free', '0']):
                            precio = 'gratis'
                        elif precio_raw and precio_raw != '':
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
                            'url': url,
                            'fuente': 'comunidad_madrid'
                        }

                        if fecha_fin and fecha_fin != fecha_inicio:
                            evento['fecha_fin'] = fecha_fin

                        self.eventos.append(evento)
                        total_extraidos += 1

                    except Exception as e:
                        self.stats['errores'] += 1
                        continue

            except Exception as e:
                print(f"   ⚠️ Error con endpoint {endpoint[:50]}: {e}")
                continue

        self.stats['comunidad'] = total_extraidos
        print(f"   📊 Total extraídos de Comunidad de Madrid: {total_extraidos}")

    # ===== ELIMINAR DUPLICADOS =====

    def eliminar_duplicados(self):
        print("\n🧹 Eliminando duplicados...")
        antes = len(self.eventos)

        eventos_unicos = []
        vistos = set()

        for evento in self.eventos:
            # Clave: nombre normalizado + fecha inicio
            nombre_norm = evento['nombre'].lower().strip()
            # Quitar artículos y palabras comunes para mejor deduplicación
            nombre_norm = nombre_norm.replace('el ', '').replace('la ', '').replace('los ', '')
            clave = f"{nombre_norm[:50]}_{evento.get('fecha', '')[:10]}"

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

        # Scrapear fuentes
        self.scrape_esmadrid()
        self.scrape_comunidad_madrid()

        # Procesar
        self.eliminar_duplicados()

        # Guardar
        total = self.guardar_eventos()

        # Resumen
        print()
        print("=" * 60)
        print("📈 RESUMEN")
        print("=" * 60)
        print(f"🏛️  ES Madrid:           {self.stats['esmadrid']} eventos")
        print(f"🌍  Comunidad Madrid:    {self.stats['comunidad']} eventos")
        print(f"🔄  Duplicados eliminados: {self.stats['duplicados']}")
        print(f"⚠️   Errores:             {self.stats['errores']}")
        print(f"📊  Total en base datos: {total}")
        print()
        print("✅ PROCESO COMPLETADO")
        print("=" * 60)


if __name__ == "__main__":
    scraper = EventosScraper()
    scraper.ejecutar()