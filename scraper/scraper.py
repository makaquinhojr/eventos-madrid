#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
EventosMadrid - Web Scraper
Extrae eventos de múltiples fuentes y actualiza eventos.json
"""

import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
from pathlib import Path
import sys
import os

# Añadir carpeta padre al path para imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from scraper.config import *
except ImportError:
    from config import *

# Para geocodificación
try:
    from geopy.geocoders import Nominatim
    from geopy.exc import GeocoderTimedOut, GeocoderServiceError
    GEOPY_AVAILABLE = True
except ImportError:
    print("⚠️ geopy no disponible, geocodificación desactivada")
    GEOPY_AVAILABLE = False


class EventosScraper:
    """Scraper principal de eventos"""
    
    def __init__(self):
        self.eventos = []
        self.eventos_existentes = []
        self.stats = {
            'nuevos': 0,
            'actualizados': 0,
            'duplicados': 0,
            'errores': 0
        }
        
        # Inicializar geocodificador
        if GEOPY_AVAILABLE and GEOCODING_ENABLED:
            self.geolocator = Nominatim(user_agent="eventos-madrid-scraper")
        else:
            self.geolocator = None
        
        # Cargar eventos existentes
        self.cargar_eventos_existentes()
    
    def cargar_eventos_existentes(self):
        """Carga eventos.json existente"""
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
    
    def hacer_request(self, url):
        """Hace request HTTP con retry y delays"""
        for intento in range(MAX_RETRIES):
            try:
                print(f"   🌐 Request a {url[:50]}...")
                response = requests.get(url, headers=HEADERS, timeout=10)
                response.raise_for_status()
                time.sleep(DELAY_BETWEEN_REQUESTS)
                return response
            except Exception as e:
                print(f"   ⚠️ Intento {intento + 1}/{MAX_RETRIES} falló: {e}")
                if intento < MAX_RETRIES - 1:
                    time.sleep(5)
        
        return None
    
    def categorizar_evento(self, nombre, descripcion=''):
        """Categoriza evento basándose en palabras clave"""
        texto = f"{nombre} {descripcion}".lower()
        
        for categoria, keywords in KEYWORDS.items():
            if any(keyword in texto for keyword in keywords):
                return categoria
        
        return 'cultural'  # Por defecto
    
    def geocodificar(self, lugar):
        """Obtiene coordenadas de un lugar"""
        
        # Verificar lugares conocidos primero (más rápido)
        lugar_lower = lugar.lower()
        for venue, coords in KNOWN_VENUES.items():
            if venue in lugar_lower:
                print(f"      📍 Lugar conocido: {lugar} → {coords['lat']}, {coords['lng']}")
                return coords['lat'], coords['lng']
        
        # Si no está en lugares conocidos, geocodificar
        if not self.geolocator:
            # Coordenadas por defecto (centro de Madrid)
            return 40.4168, -3.7038
        
        try:
            query = f"{lugar}, Madrid, España"
            location = self.geolocator.geocode(query)
            
            if location:
                print(f"      🗺️ Geocodificado: {lugar} → {location.latitude}, {location.longitude}")
                time.sleep(GEOCODING_DELAY)
                return round(location.latitude, 4), round(location.longitude, 4)
            else:
                print(f"      ⚠️ No se pudo geocodificar: {lugar}, usando centro Madrid")
                return 40.4168, -3.7038
                
        except (GeocoderTimedOut, GeocoderServiceError) as e:
            print(f"      ⚠️ Error geocodificación: {e}")
            return 40.4168, -3.7038
    
    def scrape_timeout(self):
        """Scrapea Timeout Madrid"""
        print("\n🔍 Scrapeando Timeout Madrid...")
        
        response = self.hacer_request(URLS['timeout'])
        if not response:
            print("   ❌ No se pudo acceder a Timeout")
            return
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # NOTA: Estos selectores son EJEMPLOS
        # Hay que inspeccionar la web real para obtener los correctos
        eventos_html = soup.find_all('div', class_='event-card')
        
        if not eventos_html:
            # Intentar selector alternativo
            eventos_html = soup.find_all('article')
        
        print(f"   📄 Encontrados {len(eventos_html)} posibles eventos")
        
        for evento_html in eventos_html[:20]:  # Limitar a 20 primeros
            try:
                # Intentar extraer información
                # ADAPTAR según estructura real de la web
                
                titulo_elem = evento_html.find(['h2', 'h3', 'a'])
                if not titulo_elem:
                    continue
                
                nombre = titulo_elem.get_text(strip=True)
                
                # Buscar fecha
                fecha_elem = evento_html.find(['time', 'span'], class_=['date', 'event-date'])
                fecha = "2026-06-01"  # Fecha por defecto
                
                # Buscar lugar
                lugar_elem = evento_html.find(['span', 'div'], class_=['venue', 'location'])
                lugar = lugar_elem.get_text(strip=True) if lugar_elem else "Madrid"
                
                # Buscar descripción
                desc_elem = evento_html.find('p')
                descripcion = desc_elem.get_text(strip=True)[:200] if desc_elem else nombre
                
                # URL
                link_elem = evento_html.find('a', href=True)
                url = link_elem['href'] if link_elem else "https://www.timeout.es/madrid"
                if not url.startswith('http'):
                    url = f"https://www.timeout.es{url}"
                
                # Categorizar
                tipo = self.categorizar_evento(nombre, descripcion)
                
                # Geocodificar
                lat, lng = self.geocodificar(lugar)
                
                # Crear evento
                evento = {
                    'nombre': nombre,
                    'fecha': fecha,
                    'tipo': tipo,
                    'lat': lat,
                    'lng': lng,
                    'lugar': lugar,
                    'precio': 'pago',  # Determinar mejor después
                    'descripcion': descripcion,
                    'url': url,
                    'fuente': 'timeout'
                }
                
                self.eventos.append(evento)
                print(f"   ✅ {nombre[:50]}")
                
            except Exception as e:
                self.stats['errores'] += 1
                print(f"   ⚠️ Error procesando evento: {e}")
                continue
        
        print(f"   📊 Total extraídos de Timeout: {len([e for e in self.eventos if e.get('fuente') == 'timeout'])}")
    
    def scrape_esmadrid(self):
        """Scrapea ES Madrid (Ayuntamiento)"""
        print("\n🔍 Scrapeando ES Madrid...")
        
        # ES Madrid tiene API JSON (más fácil)
        api_url = "https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json"
        
        response = self.hacer_request(api_url)
        if not response:
            print("   ❌ No se pudo acceder a ES Madrid API")
            return
        
        try:
            data = response.json()
            eventos_json = data.get('@graph', [])
            
            print(f"   📄 Encontrados {len(eventos_json)} eventos")
            
            for evento_data in eventos_json[:30]:  # Limitar a 30
                try:
                    nombre = evento_data.get('title', 'Sin título')
                    
                    # Fecha
                    fecha_inicio = evento_data.get('dtstart', '')
                    if fecha_inicio:
                        fecha = fecha_inicio.split('T')[0]
                    else:
                        fecha = "2026-06-01"
                    
                    # Ubicación
                    location = evento_data.get('location', {})
                    if isinstance(location, dict):
                        lat = location.get('latitude', 40.4168)
                        lng = location.get('longitude', -3.7038)
                        direccion = location.get('address', {})
                        if isinstance(direccion, dict):
                            lugar = direccion.get('street-address', 'Madrid')
                        else:
                            lugar = 'Madrid'
                    else:
                        lat, lng = 40.4168, -3.7038
                        lugar = 'Madrid'
                    
                    # Descripción
                    descripcion = evento_data.get('description', nombre)[:200]
                    
                    # URL
                    url = evento_data.get('link', 'https://www.esmadrid.com')
                    
                    # Tipo
                    tipo = self.categorizar_evento(nombre, descripcion)
                    
                    evento = {
                        'nombre': nombre,
                        'fecha': fecha,
                        'tipo': tipo,
                        'lat': float(lat),
                        'lng': float(lng),
                        'lugar': lugar,
                        'precio': 'gratis',
                        'descripcion': descripcion,
                        'url': url,
                        'fuente': 'esmadrid'
                    }
                    
                    self.eventos.append(evento)
                    print(f"   ✅ {nombre[:50]}")
                    
                except Exception as e:
                    self.stats['errores'] += 1
                    print(f"   ⚠️ Error: {e}")
                    continue
            
            print(f"   📊 Total extraídos de ES Madrid: {len([e for e in self.eventos if e.get('fuente') == 'esmadrid'])}")
            
        except Exception as e:
            print(f"   ❌ Error parseando JSON: {e}")
    
    def eliminar_duplicados(self):
        """Elimina eventos duplicados"""
        print("\n🧹 Eliminando duplicados...")
        
        eventos_unicos = []
        nombres_vistos = set()
        
        for evento in self.eventos:
            # Usar nombre + fecha como clave única
            clave = f"{evento['nombre'].lower()}_{evento['fecha']}"
            
            if clave not in nombres_vistos:
                nombres_vistos.add(clave)
                eventos_unicos.append(evento)
            else:
                self.stats['duplicados'] += 1
        
        print(f"   ⚠️ Eliminados {len(self.eventos) - len(eventos_unicos)} duplicados")
        self.eventos = eventos_unicos
    
    def asignar_ids(self):
        """Asigna IDs únicos a eventos nuevos"""
        max_id = 0
        if self.eventos_existentes:
            max_id = max([e.get('id', 0) for e in self.eventos_existentes])
        
        for i, evento in enumerate(self.eventos):
            if 'id' not in evento:
                evento['id'] = max_id + i + 1
    
    def guardar_eventos(self):
        """Guarda eventos en JSON"""
        print("\n💾 Guardando eventos...")
        
        # Combinar con existentes (mantener los que ya teníamos)
        eventos_finales = self.eventos_existentes.copy()
        
        # Añadir solo los nuevos
        nombres_existentes = {e['nombre'].lower() for e in eventos_finales}
        
        for evento in self.eventos:
            if evento['nombre'].lower() not in nombres_existentes:
                eventos_finales.append(evento)
                self.stats['nuevos'] += 1
                nombres_existentes.add(evento['nombre'].lower())
        
        # Ordenar por fecha
        eventos_finales.sort(key=lambda x: x.get('fecha', '9999-12-31'))
        
        # Guardar
        json_path = Path(__file__).parent / EVENTOS_JSON_PATH
        json_path.parent.mkdir(exist_ok=True)
        
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(eventos_finales, f, ensure_ascii=False, indent=2)
        
        print(f"   ✅ Guardados {len(eventos_finales)} eventos en {json_path}")
        
        return len(eventos_finales)
    
    def ejecutar(self):
        """Ejecuta el scraper completo"""
        print("=" * 60)
        print("🤖 SCRAPER DE EVENTOS MADRID")
        print("=" * 60)
        print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print()
        
        # Scrapear fuentes
        self.scrape_timeout()
        self.scrape_esmadrid()
        
        # Procesar
        self.eliminar_duplicados()
        self.asignar_ids()
        
        # Guardar
        total = self.guardar_eventos()
        
        # Resumen
        print()
        print("=" * 60)
        print("📈 RESUMEN")
        print("=" * 60)
        print(f"✨ Eventos nuevos encontrados: {self.stats['nuevos']}")
        print(f"🔄 Eventos duplicados eliminados: {self.stats['duplicados']}")
        print(f"⚠️  Errores durante scraping: {self.stats['errores']}")
        print(f"📊 Total eventos en base de datos: {total}")
        print()
        print("✅ PROCESO COMPLETADO")
        print("=" * 60)


if __name__ == "__main__":
    scraper = EventosScraper()
    scraper.ejecutar()