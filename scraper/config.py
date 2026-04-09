"""
Configuración del scraper
"""
import os

# URLs de las webs a scrapear
URLS = {
    'esmadrid_api': 'https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json',
    'comunidad_madrid': 'https://www.comunidad.madrid/agenda',
    'mostoles': 'https://www.mostoles.es/es/agenda',
    'alcorcon': 'https://www.alcorcon.es/agenda',
    'leganes': 'https://www.leganes.org/agenda',
    'getafe': 'https://www.getafe.es/agenda',
}

# Headers para identificarnos
HEADERS = {
    'User-Agent': 'EventosMadrid Educational Project - github.com/makaquinhojr/eventos-madrid',
    'Accept': 'application/json, text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
}

# Rate limiting
DELAY_BETWEEN_REQUESTS = 2
MAX_RETRIES = 3

# Geocodificación
GEOCODING_ENABLED = True
GEOCODING_DELAY = 1

# Path
EVENTOS_JSON_PATH = '../data/eventos.json'

# Categorización — ORDEN IMPORTANTE: se aplica la primera que coincida
KEYWORDS = {
    'deporte': [
        'fútbol', 'futbol', 'partido', 'liga', 'champions', 'uefa',
        'laliga', 'copa del rey', 'rayo vallecano', 'atlético de madrid',
        'atletico de madrid', 'real madrid', 'getafe cf', 'leganés cf',
        'estadio', 'wanda metropolitano', 'bernabéu', 'vallecas',
        'baloncesto', 'basket', 'nba', 'acb', 'euroliga',
        'real madrid basket', 'estudiantes',
        'tenis', 'pádel', 'padel', 'atletismo', 'natación', 'natacion',
        'ciclismo', 'maratón', 'maraton', 'carrera popular',
        'triatlón', 'triatlon', 'rugby', 'balonmano', 'voleibol',
        'boxeo', 'artes marciales', 'judo', 'karate',
        'escalada', 'senderismo', 'running', 'deporte', 'deportivo',
        'campeonato', 'torneo', 'competición', 'competicion',
        'semifinal', 'final copa', 'supercopa',
        'palacio de los deportes', 'polideportivo', 'piscina municipal',
        'pista de atletismo', 'campo de fútbol', 'pabellón'
    ],
    'infantil': [
        'infantil', 'niños', 'ninos', 'familia', 'familiar',
        'bebés', 'bebes', 'títeres', 'titeres', 'cuentacuentos',
        'cuento', 'teatro infantil', 'show infantil',
        'taller infantil', 'taller para niños', 'actividad infantil',
        'animación infantil', 'payaso', 'magia infantil',
        'circo infantil', 'marionetas', 'juegos infantiles',
        'ludoteca', 'parque infantil', '0-3 años', '3-6 años',
        '6-12 años', 'todas las edades', 'apto para niños'
    ],
    'concierto': [
        'concierto', 'festival', 'música', 'musica', 'show', 'actuación',
        'actuacion', 'directo', 'live', 'banda', 'orquesta', 'recital',
        'dj set', 'dj', 'jazz', 'rock', 'pop', 'flamenco', 'clásica',
        'clasica', 'sinfonía', 'sinfonia', 'electrónica', 'electronica',
        'reggaeton', 'hip hop', 'rap', 'indie', 'metal', 'punk',
        'blues', 'soul', 'r&b', 'folk', 'country', 'gospel',
        'ópera', 'opera', 'zarzuela', 'coral', 'coro',
        'música en vivo', 'musica en vivo', 'open air', 'al aire libre'
    ],
    'fiesta': [
        'fiesta', 'verbena', 'celebración', 'celebracion', 'romería',
        'romeria', 'carnaval', 'feria', 'san isidro', 'orgullo',
        'nochevieja', 'festividad', 'patron', 'patrona',
        'fiestas populares', 'fiestas de', 'fiestas del',
        'procesión', 'procesion', 'cabalgata', 'desfile',
        'halloween', 'navidad', 'reyes', 'nochebuena',
        'año nuevo', 'semana santa', 'corpus', 'verbenas'
    ],
    'mercado': [
        'mercado', 'mercadillo', 'rastro', 'artesanía', 'artesania',
        'flea market', 'vintage', 'segunda mano', 'coleccionismo',
        'feria artesanal', 'feria de', 'feria del libro',
        'mercado navideño', 'mercado medieval', 'bazar',
        'feria de muestras', 'exposición comercial', 'feria gastronómica'
    ],
    'gastronomia': [
        'gastro', 'comida', 'tapas', 'restaurante', 'cocina',
        'gastronóm', 'gastronomia', 'gastronomía', 'maridaje',
        'cata', 'vino', 'cerveza', 'food', 'degustación', 'degustacion',
        'enología', 'enologia', 'vermut', 'vermú', 'brunch',
        'street food', 'food truck', 'ruta gastronómica',
        'ruta de la tapa', 'concurso de cocina', 'showcooking',
        'chef', 'michelin', 'bar de tapas', 'taberna'
    ],
    'cultural': [
        'museo', 'exposición', 'exposicion', 'teatro', 'obra', 'arte',
        'cultura', 'danza', 'ballet', 'cine', 'literatura',
        'conferencia', 'taller', 'visita', 'tour', 'magia',
        'circo', 'monólogo', 'monologo', 'humor', 'comedia',
        'fotografía', 'fotografia', 'escultura', 'pintura',
        'lectura', 'poesía', 'poesia', 'performance', 'instalación',
        'instalacion', 'videoarte', 'arquitectura', 'diseño',
        'moda', 'cómic', 'comic', 'manga', 'animación', 'animacion',
        'documental', 'cortometraje', 'largometraje', 'estreno',
        'presentación', 'presentacion', 'charla', 'debate',
        'mesa redonda', 'coloquio', 'seminario', 'congreso',
        'workshop', 'masterclass', 'visita guiada', 'ruta cultural',
        'patrimonio', 'historia', 'arqueología', 'arqueologia'
    ],
}

# ✅ ZONAS — Distritos y municipios con su punto central y radio en km
# Sin esto, asignar_zona() falla en cada evento → 0 eventos guardados
ZONAS = {
    # ── Madrid capital ──────────────────────────────────────
    'Centro':              {'lat': 40.4168, 'lng': -3.7038, 'radio': 2.5},
    'Arganzuela':          {'lat': 40.3964, 'lng': -3.7006, 'radio': 2.5},
    'Retiro':              {'lat': 40.4083, 'lng': -3.6822, 'radio': 2.5},
    'Salamanca':           {'lat': 40.4286, 'lng': -3.6824, 'radio': 2.5},
    'Chamartín':           {'lat': 40.4594, 'lng': -3.6775, 'radio': 2.5},
    'Tetuán':              {'lat': 40.4594, 'lng': -3.7031, 'radio': 2.5},
    'Chamberí':            {'lat': 40.4394, 'lng': -3.7023, 'radio': 2.5},
    'Fuencarral':          {'lat': 40.4939, 'lng': -3.7031, 'radio': 4.0},
    'Moncloa':             {'lat': 40.4350, 'lng': -3.7196, 'radio': 3.0},
    'Latina':              {'lat': 40.4061, 'lng': -3.7364, 'radio': 3.0},
    'Carabanchel':         {'lat': 40.3828, 'lng': -3.7364, 'radio': 3.5},
    'Usera':               {'lat': 40.3897, 'lng': -3.7108, 'radio': 2.5},
    'Puente de Vallecas':  {'lat': 40.3894, 'lng': -3.6614, 'radio': 3.0},
    'Moratalaz':           {'lat': 40.4061, 'lng': -3.6461, 'radio': 2.5},
    'Ciudad Lineal':       {'lat': 40.4394, 'lng': -3.6461, 'radio': 3.0},
    'Hortaleza':           {'lat': 40.4775, 'lng': -3.6281, 'radio': 3.5},
    'Villaverde':          {'lat': 40.3469, 'lng': -3.7108, 'radio': 3.0},
    'Villa de Vallecas':   {'lat': 40.3664, 'lng': -3.6281, 'radio': 3.0},
    'Vicálvaro':           {'lat': 40.4061, 'lng': -3.6061, 'radio': 3.0},
    'San Blas - Canillejas':{'lat': 40.4264, 'lng': -3.6061, 'radio': 3.0},
    'Barajas':             {'lat': 40.4775, 'lng': -3.5811, 'radio': 3.5},
    # ── Municipios ──────────────────────────────────────────
    'Móstoles':            {'lat': 40.3224, 'lng': -3.8652, 'radio': 5.0},
    'Alcorcón':            {'lat': 40.3494, 'lng': -3.8244, 'radio': 5.0},
    'Leganés':             {'lat': 40.3281, 'lng': -3.7638, 'radio': 5.0},
    'Getafe':              {'lat': 40.3058, 'lng': -3.7326, 'radio': 5.0},
    'Fuenlabrada':         {'lat': 40.2842, 'lng': -3.7946, 'radio': 5.0},
    'Alcalá de Henares':   {'lat': 40.4818, 'lng': -3.3641, 'radio': 6.0},
    'Torrejón de Ardoz':   {'lat': 40.4599, 'lng': -3.4794, 'radio': 5.0},
    'Parla':               {'lat': 40.2390, 'lng': -3.7754, 'radio': 5.0},
    'Pozuelo de Alarcón':  {'lat': 40.4350, 'lng': -3.8138, 'radio': 5.0},
    'Las Rozas':           {'lat': 40.4930, 'lng': -3.8740, 'radio': 5.0},
    'Majadahonda':         {'lat': 40.4728, 'lng': -3.8726, 'radio': 4.0},
    'Collado Villalba':    {'lat': 40.6346, 'lng': -4.0076, 'radio': 5.0},
    'Coslada':             {'lat': 40.4233, 'lng': -3.5645, 'radio': 4.0},
    'San Sebastián de los Reyes': {'lat': 40.5487, 'lng': -3.6271, 'radio': 5.0},
    'Arganda del Rey':     {'lat': 40.3008, 'lng': -3.4394, 'radio': 5.0},
    'Rivas-Vaciamadrid':   {'lat': 40.3561, 'lng': -3.5234, 'radio': 5.0},
    'Valdemoro':           {'lat': 40.1908, 'lng': -3.6742, 'radio': 5.0},
    'Aranjuez':            {'lat': 40.0319, 'lng': -3.6010, 'radio': 5.0},
    'Torrelodones':        {'lat': 40.5756, 'lng': -3.9287, 'radio': 4.0},
    'Boadilla del Monte':  {'lat': 40.4067, 'lng': -3.8760, 'radio': 4.0},
    'Tres Cantos':         {'lat': 40.5927, 'lng': -3.7090, 'radio': 4.0},
    'Alcobendas':          {'lat': 40.5469, 'lng': -3.6398, 'radio': 4.0},
}

# Municipios de la Comunidad de Madrid con coordenadas
MUNICIPIOS = {
    'madrid': {'lat': 40.4168, 'lng': -3.7038},
    'móstoles': {'lat': 40.3224, 'lng': -3.8652},
    'mostoles': {'lat': 40.3224, 'lng': -3.8652},
    'alcorcón': {'lat': 40.3494, 'lng': -3.8244},
    'alcorcon': {'lat': 40.3494, 'lng': -3.8244},
    'leganés': {'lat': 40.3281, 'lng': -3.7638},
    'leganes': {'lat': 40.3281, 'lng': -3.7638},
    'getafe': {'lat': 40.3058, 'lng': -3.7326},
    'fuenlabrada': {'lat': 40.2842, 'lng': -3.7946},
    'alcalá de henares': {'lat': 40.4818, 'lng': -3.3641},
    'alcala de henares': {'lat': 40.4818, 'lng': -3.3641},
    'torrejón de ardoz': {'lat': 40.4599, 'lng': -3.4794},
    'torrejon de ardoz': {'lat': 40.4599, 'lng': -3.4794},
    'parla': {'lat': 40.2390, 'lng': -3.7754},
    'pozuelo de alarcón': {'lat': 40.4350, 'lng': -3.8138},
    'pozuelo de alarcon': {'lat': 40.4350, 'lng': -3.8138},
    'las rozas': {'lat': 40.4930, 'lng': -3.8740},
    'majadahonda': {'lat': 40.4728, 'lng': -3.8726},
    'collado villalba': {'lat': 40.6346, 'lng': -4.0076},
    'coslada': {'lat': 40.4233, 'lng': -3.5645},
    'san sebastián de los reyes': {'lat': 40.5487, 'lng': -3.6271},
    'san sebastian de los reyes': {'lat': 40.5487, 'lng': -3.6271},
    'arganda del rey': {'lat': 40.3008, 'lng': -3.4394},
    'rivas vaciamadrid': {'lat': 40.3561, 'lng': -3.5234},
    'valdemoro': {'lat': 40.1908, 'lng': -3.6742},
    'aranjuez': {'lat': 40.0319, 'lng': -3.6010},
    'torrelodones': {'lat': 40.5756, 'lng': -3.9287},
    'boadilla del monte': {'lat': 40.4067, 'lng': -3.8760},
    'villalba': {'lat': 40.6346, 'lng': -4.0076},
    'tres cantos': {'lat': 40.5927, 'lng': -3.7090},
    'alcobendas': {'lat': 40.5469, 'lng': -3.6398},
    'san fernando de henares': {'lat': 40.4264, 'lng': -3.5311},
}

# Lugares conocidos en Madrid capital
KNOWN_VENUES = {
    # ── Música ──────────────────────────────────────────────
    'wizink center': {'lat': 40.4225, 'lng': -3.6703},
    'wizink': {'lat': 40.4225, 'lng': -3.6703},
    'mad cool': {'lat': 40.4637, 'lng': -3.6748},
    'palacio vistalegre': {'lat': 40.3864, 'lng': -3.7196},
    'la riviera': {'lat': 40.4077, 'lng': -3.7218},
    'movistar arena': {'lat': 40.4225, 'lng': -3.6703},
    'sala sol': {'lat': 40.4193, 'lng': -3.7019},
    'sala caracol': {'lat': 40.3994, 'lng': -3.7064},
    'joy eslava': {'lat': 40.4168, 'lng': -3.7043},
    'teatro joy eslava': {'lat': 40.4168, 'lng': -3.7043},
    # ── Deportes ─────────────────────────────────────────────
    'wanda metropolitano': {'lat': 40.4361, 'lng': -3.5995},
    'estadio wanda metropolitano': {'lat': 40.4361, 'lng': -3.5995},
    'riyadh air metropolitano': {'lat': 40.4361, 'lng': -3.5995},
    'estadio riyadh air metropolitano': {'lat': 40.4361, 'lng': -3.5995},
    'santiago bernabéu': {'lat': 40.4531, 'lng': -3.6883},
    'bernabéu': {'lat': 40.4531, 'lng': -3.6883},
    'estadio de vallecas': {'lat': 40.3919, 'lng': -3.6546},
    'campo de fútbol de vallecas': {'lat': 40.3919, 'lng': -3.6546},
    'coliseum alfonso pérez': {'lat': 40.3058, 'lng': -3.7326},
    'estadio municipal de butarque': {'lat': 40.3281, 'lng': -3.7638},
    'palacio de los deportes': {'lat': 40.4225, 'lng': -3.6703},
    'pabellón magariños': {'lat': 40.4394, 'lng': -3.6808},
    'caja mágica': {'lat': 40.3747, 'lng': -3.6897},
    # ── Cultura ──────────────────────────────────────────────
    'teatro real': {'lat': 40.4179, 'lng': -3.7106},
    'teatro español': {'lat': 40.4147, 'lng': -3.6991},
    'teatro fernán gómez': {'lat': 40.4192, 'lng': -3.6933},
    'teatro la abadía': {'lat': 40.4289, 'lng': -3.7108},
    'teatro lara': {'lat': 40.4228, 'lng': -3.7022},
    'teatro calderón': {'lat': 40.4136, 'lng': -3.7024},
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
    'museo arqueológico': {'lat': 40.4233, 'lng': -3.6886},
    'museo nacional de antropología': {'lat': 40.4072, 'lng': -3.6933},
    'casa encendida': {'lat': 40.4061, 'lng': -3.7005},
    'fundación mapfre': {'lat': 40.4192, 'lng': -3.6933},
    'tablao flamenco 1911': {'lat': 40.4168, 'lng': -3.7043},
    'espacio madriz': {'lat': 40.4098, 'lng': -3.7039},
    # ── Parques ──────────────────────────────────────────────
    'parque del retiro': {'lat': 40.4153, 'lng': -3.6844},
    'retiro': {'lat': 40.4153, 'lng': -3.6844},
    'casa de campo': {'lat': 40.4233, 'lng': -3.7598},
    'madrid río': {'lat': 40.4018, 'lng': -3.7245},
    'matadero': {'lat': 40.3936, 'lng': -3.7006},
    'matadero madrid': {'lat': 40.3936, 'lng': -3.7006},
    'jardín botánico': {'lat': 40.4112, 'lng': -3.6899},
    'templo de debod': {'lat': 40.4241, 'lng': -3.7178},
    'parque el capricho': {'lat': 40.4647, 'lng': -3.6281},
    'parque de berlín': {'lat': 40.4558, 'lng': -3.6789},
    # ── Plazas ───────────────────────────────────────────────
    'plaza mayor': {'lat': 40.4192, 'lng': -3.7025},
    'puerta del sol': {'lat': 40.4169, 'lng': -3.7033},
    'gran vía': {'lat': 40.4200, 'lng': -3.7025},
    'palacio de cibeles': {'lat': 40.4192, 'lng': -3.6933},
    'chueca': {'lat': 40.4197, 'lng': -3.6925},
    'malasaña': {'lat': 40.4263, 'lng': -3.7051},
    'la latina': {'lat': 40.4106, 'lng': -3.7088},
    'lavapiés': {'lat': 40.4098, 'lng': -3.7082},
    'chamberí': {'lat': 40.4294, 'lng': -3.7023},
    'salamanca': {'lat': 40.4286, 'lng': -3.6824},
    'arganzuela': {'lat': 40.3964, 'lng': -3.7006},
    'usera': {'lat': 40.3897, 'lng': -3.7108},
    'carabanchel': {'lat': 40.3828, 'lng': -3.7364},
    # ── Mercados ─────────────────────────────────────────────
    'mercado de san miguel': {'lat': 40.4155, 'lng': -3.7092},
    'mercado de motores': {'lat': 40.3985, 'lng': -3.6904},
    'el rastro': {'lat': 40.4089, 'lng': -3.7077},
    'mercado de maravillas': {'lat': 40.4394, 'lng': -3.7031},
    'mercado de antón martín': {'lat': 40.4128, 'lng': -3.6994},
}

# Ticketmaster
TICKETMASTER_KEY = os.environ.get('TICKETMASTER_KEY', '')