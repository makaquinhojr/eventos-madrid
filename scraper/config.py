"""
Configuración del scraper
"""

# URLs de las webs a scrapear
URLS = {
    'esmadrid_api': 'https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json',
    'comunidad_madrid': 'https://www.comunidad.madrid/sites/default/files/doc/agenda/agenda.json',
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
    'concierto': [
        'concierto', 'festival', 'música', 'show', 'actuación',
        'directo', 'live', 'banda', 'orquesta', 'recital', 'dj set'
    ],
    'fiesta': [
        'fiesta', 'verbena', 'celebración', 'romería', 'carnaval',
        'feria', 'san isidro', 'orgullo', 'nochevieja'
    ],
    'mercado': [
        'mercado', 'mercadillo', 'rastro', 'artesanía', 'flea market',
        'vintage', 'segunda mano', 'coleccionismo'
    ],
    'gastronomia': [
        'gastro', 'comida', 'tapas', 'restaurante', 'cocina',
        'gastronóm', 'maridaje', 'cata', 'vino', 'cerveza', 'food'
    ],
    'cultural': [
        'museo', 'exposición', 'teatro', 'obra', 'arte', 'cultura',
        'danza', 'ballet', 'cine', 'literatura', 'conferencia',
        'taller', 'visita', 'tour', 'flamenco', 'ópera'
    ],
}

# Lugares conocidos en Madrid (para geocodificación rápida)
KNOWN_VENUES = {
    # Música
    'wizink center': {'lat': 40.4225, 'lng': -3.6703},
    'wizink': {'lat': 40.4225, 'lng': -3.6703},
    'mad cool': {'lat': 40.4637, 'lng': -3.6748},
    'palacio vistalegre': {'lat': 40.3864, 'lng': -3.7196},
    'la riviera': {'lat': 40.4077, 'lng': -3.7218},
    'sala caracol': {'lat': 40.4021, 'lng': -3.7078},
    'movistar arena': {'lat': 40.4225, 'lng': -3.6703},

    # Cultura
    'teatro real': {'lat': 40.4179, 'lng': -3.7106},
    'teatro español': {'lat': 40.4147, 'lng': -3.6991},
    'teatro fernán gómez': {'lat': 40.4192, 'lng': -3.6933},
    'círculo de bellas artes': {'lat': 40.4189, 'lng': -3.6973},
    'conde duque': {'lat': 40.4275, 'lng': -3.7134},
    'centro conde duque': {'lat': 40.4275, 'lng': -3.7134},
    'cineteca': {'lat': 40.3936, 'lng': -3.7006},
    'museo reina sofía': {'lat': 40.4083, 'lng': -3.6944},
    'reina sofía': {'lat': 40.4083, 'lng': -3.6944},
    'museo del prado': {'lat': 40.4138, 'lng': -3.6922},
    'prado': {'lat': 40.4138, 'lng': -3.6922},
    'museo thyssen': {'lat': 40.4159, 'lng': -3.6941},
    'thyssen': {'lat': 40.4159, 'lng': -3.6941},
    'caixaforum': {'lat': 40.4083, 'lng': -3.6939},

    # Parques y espacios
    'parque del retiro': {'lat': 40.4153, 'lng': -3.6844},
    'retiro': {'lat': 40.4153, 'lng': -3.6844},
    'casa de campo': {'lat': 40.4233, 'lng': -3.7598},
    'madrid río': {'lat': 40.4018, 'lng': -3.7245},
    'matadero': {'lat': 40.3936, 'lng': -3.7006},
    'matadero madrid': {'lat': 40.3936, 'lng': -3.7006},
    'parque tierno galván': {'lat': 40.3936, 'lng': -3.7006},
    'jardín botánico': {'lat': 40.4112, 'lng': -3.6899},
    'templo de debod': {'lat': 40.4241, 'lng': -3.7178},

    # Plazas y barrios
    'plaza mayor': {'lat': 40.4192, 'lng': -3.7025},
    'puerta del sol': {'lat': 40.4169, 'lng': -3.7033},
    'gran vía': {'lat': 40.4200, 'lng': -3.7025},
    'palacio de cibeles': {'lat': 40.4192, 'lng': -3.6933},
    'chueca': {'lat': 40.4197, 'lng': -3.6925},
    'malasaña': {'lat': 40.4263, 'lng': -3.7051},
    'la latina': {'lat': 40.4106, 'lng': -3.7088},
    'lavapiés': {'lat': 40.4098, 'lng': -3.7082},
    'chamberí': {'lat': 40.4294, 'lng': -3.7023},
    'salamanca': {'lat': 40.4294, 'lng': -3.6803},
    'arganzuela': {'lat': 40.3986, 'lng': -3.7068},

    # Mercados
    'mercado de san miguel': {'lat': 40.4155, 'lng': -3.7092},
    'mercado de motores': {'lat': 40.3985, 'lng': -3.6904},
    'el rastro': {'lat': 40.4089, 'lng': -3.7077},
}