"""
Configuración del scraper
"""

# URLs de las webs a scrapear
URLS = {
    'timeout': 'https://www.timeout.es/madrid/es/que-hacer',
    'esmadrid': 'https://www.esmadrid.com/agenda-eventos-madrid'
}

# Headers para identificarnos
HEADERS = {
    'User-Agent': 'EventosMadrid Educational Project - github.com/makaquinhojr/eventos-madrid',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
}

# Configuración de rate limiting (no sobrecargar servidores)
DELAY_BETWEEN_REQUESTS = 2  # Segundos entre cada request
MAX_RETRIES = 3              # Intentos si falla una request

# Configuración de geocodificación
GEOCODING_ENABLED = True
GEOCODING_DELAY = 1          # Segundos entre geocodificaciones

# Paths de archivos
EVENTOS_JSON_PATH = '../data/eventos.json'

# Categorización automática por palabras clave
KEYWORDS = {
    'concierto': ['concierto', 'festival', 'música', 'show', 'actuación', 'directo', 'live'],
    'fiesta': ['fiesta', 'verbena', 'celebración', 'romería', 'feria'],
    'mercado': ['mercado', 'mercadillo', 'feria', 'rastro', 'artesanía'],
    'cultural': ['museo', 'exposición', 'teatro', 'obra', 'arte', 'cultura'],
    'gastronomia': ['gastro', 'comida', 'tapas', 'restaurante', 'cocina', 'gastronóm']
}

# Lugares conocidos en Madrid (para geocodificación rápida)
KNOWN_VENUES = {
    'wizink center': {'lat': 40.4225, 'lng': -3.6703},
    'wizink': {'lat': 40.4225, 'lng': -3.6703},
    'teatro real': {'lat': 40.4179, 'lng': -3.7106},
    'parque del retiro': {'lat': 40.4153, 'lng': -3.6844},
    'retiro': {'lat': 40.4153, 'lng': -3.6844},
    'matadero': {'lat': 40.3936, 'lng': -3.7006},
    'matadero madrid': {'lat': 40.3936, 'lng': -3.7006},
    'plaza mayor': {'lat': 40.4192, 'lng': -3.7025},
    'puerta del sol': {'lat': 40.4169, 'lng': -3.7033},
    'chueca': {'lat': 40.4197, 'lng': -3.6925},
    'malasaña': {'lat': 40.4263, 'lng': -3.7051},
    'la latina': {'lat': 40.4106, 'lng': -3.7088},
    'lavapiés': {'lat': 40.4098, 'lng': -3.7082},
}