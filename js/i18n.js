// ===== SISTEMA DE TRADUCCIONES I18N =====

const translations = {
    es: {
        // ===== HEADER =====
        'logo.text': 'EventosMadrid',
        'btn.map': 'Mapa',
        'btn.list': 'Lista',
        'btn.places': 'Lugares',
        'btn.stats': 'Stats',
        
        // ===== FILTROS =====
        'filters.title': '🔍 Filtros',
        'filters.search.placeholder': '🔍 Buscar eventos, lugares...',
        'filters.search.aria': 'Buscar eventos',
        
        // Grupo Eventos
        'filters.events': '🎭 Filtros de Eventos',
        'filters.when': 'Cuándo',
        'filters.when.all': 'Todos',
        'filters.when.today': 'Hoy',
        'filters.when.weekend': 'Este fin de semana',
        'filters.when.week': 'Próximos 7 días',
        'filters.when.month': 'Este mes',
        
        'filters.type': 'Tipo de Evento',
        'filters.type.concerts': '🎵 Conciertos',
        'filters.type.parties': '🎪 Fiestas',
        'filters.type.markets': '🛍️ Mercados',
        'filters.type.cultural': '🎭 Cultural',
        'filters.type.gastro': '🍽️ Gastro',
        'filters.type.sports': '⚽ Deportes',
        'filters.type.kids': '👶 Infantil',
        
        'filters.price': 'Precio',
        'filters.price.free': '💚 Gratis',
        'filters.price.paid': '💰 De pago',
        'filters.price.max': 'Precio máximo',
        'filters.price.any': 'Cualquiera',
        'filters.price.only_free': 'Solo gratis',
        'filters.price.until': 'hasta',
        
        // Grupo Lugares
        'filters.places': '🏛️ Filtros de Lugares',
        'filters.places.all': '✓ Todos',
        'filters.places.categories': 'Categorías',
        'filters.places.museums': '🏛️ Museos',
        'filters.places.monuments': '🗿 Monumentos',
        'filters.places.theaters': '🎭 Teatros',
        'filters.places.halls': '🎵 Salas',
        'filters.places.parks': '🌳 Parques',
        'filters.places.galleries': '🖼️ Galerías',
        'filters.places.markets': '🛍️ Mercados',
        
        // Zona
        'filters.zone': '📍 Zona',
        'filters.zone.all': '📍 Toda la Comunidad',
        'filters.zone.madrid': '🏙️ Madrid Capital',
        'filters.zone.municipalities': '🌆 Municipios',
        
        'filters.clear': 'Limpiar filtros',
        
        // ===== LISTA =====
        'list.title': '📅 Eventos en Madrid',
        'list.subtitle': 'Mostrando todos los eventos',
        'list.sort': 'Ordenar:',
        'list.sort.date': '📅 Fecha',
        'list.sort.name': '🔤 Nombre',
        'list.sort.type': '🎭 Tipo',
        'list.sort.distance': '📍 Distancia',
        
        'list.places': '🏛️ Lugares de Interés',
        'list.empty': 'No se encontraron eventos',
        'list.empty.subtitle': 'Prueba a cambiar los filtros',
        
        // ===== BADGES =====
        'badge.today': '🔥 HOY',
        'badge.tomorrow': '⚡ MAÑANA',
        'badge.free': '💚 GRATIS',
        'badge.paid': '💰',
        'badge.zone': '📍',
        
        // ===== BOTONES =====
        'btn.view_map': 'Ver en mapa',
        'btn.more_info': 'Más info',
        'btn.search': 'Buscar',
        'btn.add_calendar': '📅 Añadir al calendario',
        'btn.directions': 'Cómo llegar',
        'btn.share': 'Compartir',
        'btn.confirm': 'Confirmar',
        'btn.close': 'Cerrar',
        
        // ===== STATS =====
        'stats.title': '📊 Estadísticas',
        'stats.concerts': 'Conciertos',
        'stats.parties': 'Fiestas',
        'stats.markets': 'Mercados',
        'stats.cultural': 'Cultural',
        'stats.gastro': 'Gastro',
        'stats.sports': 'Deportes',
        'stats.kids': 'Infantil',
        'stats.free': 'Gratis',
        
        // ===== POPUP =====
        'popup.share_event': 'Compartir evento',
        'popup.share_place': 'Compartir lugar',
        'popup.copy_link': 'Copiar link',
        'popup.copied': '¡Copiado!',
        'popup.location': 'Tu ubicación',
        'popup.here': 'Estás aquí',
        
        // ===== TOAST =====
        'toast.loading_location': '📍 Buscando tu ubicación...',
        'toast.location_found': '✅ Ubicación encontrada',
        'toast.location_denied': '❌ Permiso denegado',
        'toast.location_unavailable': '❌ Posición no disponible',
        'toast.location_timeout': '❌ Tiempo de espera agotado',
        'toast.location_disabled': '📍 Geolocalización desactivada',
        'toast.places_visible': '🏛️ Lugares visibles',
        'toast.places_hidden': '🏛️ Lugares ocultos',
        'toast.activate_location': '📍 Activa tu ubicación primero',
        'toast.events_today': 'eventos hoy en Madrid',
        'toast.copy_error': '❌ No se pudo copiar',
        'toast.loading': 'Cargando eventos...',
        'toast.loaded': 'eventos cargados',
        
        // ===== LOADER =====
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'Cargando eventos...',
        
        // ===== DISTANCE =====
        'distance.meters': 'm',
        'distance.km': 'km',
        
        // ===== PLACES =====
        'place.museum': 'Museo',
        'place.monument': 'Monumento',
        'place.theater': 'Teatro',
        'place.hall': 'Sala',
        'place.park': 'Parque',
        'place.gallery': 'Galería',
        'place.market': 'Mercado',
        'place.schedule': 'Consultar horario',
        'place.free': 'Gratis',
        'place.paid': 'De pago',
        
        // ===== LANGUAGE =====
        'lang.select': '🌐 Idioma',
        'lang.spanish': 'Español',
        'lang.english': 'English',
        'lang.french': 'Français',
    },
    
    en: {
        // ===== HEADER =====
        'logo.text': 'EventosMadrid',
        'btn.map': 'Map',
        'btn.list': 'List',
        'btn.places': 'Places',
        'btn.stats': 'Stats',
        
        // ===== FILTERS =====
        'filters.title': '🔍 Filters',
        'filters.search.placeholder': '🔍 Search events, places...',
        'filters.search.aria': 'Search events',
        
        'filters.events': '🎭 Event Filters',
        'filters.when': 'When',
        'filters.when.all': 'All',
        'filters.when.today': 'Today',
        'filters.when.weekend': 'This weekend',
        'filters.when.week': 'Next 7 days',
        'filters.when.month': 'This month',
        
        'filters.type': 'Event Type',
        'filters.type.concerts': '🎵 Concerts',
        'filters.type.parties': '🎪 Parties',
        'filters.type.markets': '🛍️ Markets',
        'filters.type.cultural': '🎭 Cultural',
        'filters.type.gastro': '🍽️ Gastro',
        'filters.type.sports': '⚽ Sports',
        'filters.type.kids': '👶 Kids',
        
        'filters.price': 'Price',
        'filters.price.free': '💚 Free',
        'filters.price.paid': '💰 Paid',
        'filters.price.max': 'Maximum price',
        'filters.price.any': 'Any',
        'filters.price.only_free': 'Free only',
        'filters.price.until': 'up to',
        
        'filters.places': '🏛️ Place Filters',
        'filters.places.all': '✓ All',
        'filters.places.categories': 'Categories',
        'filters.places.museums': '🏛️ Museums',
        'filters.places.monuments': '🗿 Monuments',
        'filters.places.theaters': '🎭 Theaters',
        'filters.places.halls': '🎵 Concert Halls',
        'filters.places.parks': '🌳 Parks',
        'filters.places.galleries': '🖼️ Galleries',
        'filters.places.markets': '🛍️ Markets',
        
        'filters.zone': '📍 Zone',
        'filters.zone.all': '📍 All Community',
        'filters.zone.madrid': '🏙️ Madrid City',
        'filters.zone.municipalities': '🌆 Municipalities',
        
        'filters.clear': 'Clear filters',
        
        'list.title': '📅 Events in Madrid',
        'list.subtitle': 'Showing all events',
        'list.sort': 'Sort by:',
        'list.sort.date': '📅 Date',
        'list.sort.name': '🔤 Name',
        'list.sort.type': '🎭 Type',
        'list.sort.distance': '📍 Distance',
        
        'list.places': '🏛️ Points of Interest',
        'list.empty': 'No events found',
        'list.empty.subtitle': 'Try changing the filters',
        
        'badge.today': '🔥 TODAY',
        'badge.tomorrow': '⚡ TOMORROW',
        'badge.free': '💚 FREE',
        'badge.paid': '💰',
        'badge.zone': '📍',
        
        'btn.view_map': 'View on map',
        'btn.more_info': 'More info',
        'btn.search': 'Search',
        'btn.add_calendar': '📅 Add to calendar',
        'btn.directions': 'Directions',
        'btn.share': 'Share',
        'btn.confirm': 'Confirm',
        'btn.close': 'Close',
        
        'stats.title': '📊 Statistics',
        'stats.concerts': 'Concerts',
        'stats.parties': 'Parties',
        'stats.markets': 'Markets',
        'stats.cultural': 'Cultural',
        'stats.gastro': 'Gastro',
        'stats.sports': 'Sports',
        'stats.kids': 'Kids',
        'stats.free': 'Free',
        
        'popup.share_event': 'Share event',
        'popup.share_place': 'Share place',
        'popup.copy_link': 'Copy link',
        'popup.copied': 'Copied!',
        'popup.location': 'Your location',
        'popup.here': 'You are here',
        
        'toast.loading_location': '📍 Finding your location...',
        'toast.location_found': '✅ Location found',
        'toast.location_denied': '❌ Permission denied',
        'toast.location_unavailable': '❌ Position unavailable',
        'toast.location_timeout': '❌ Request timeout',
        'toast.location_disabled': '📍 Geolocation disabled',
        'toast.places_visible': '🏛️ Places visible',
        'toast.places_hidden': '🏛️ Places hidden',
        'toast.activate_location': '📍 Activate location first',
        'toast.events_today': 'events today in Madrid',
        'toast.copy_error': '❌ Could not copy',
        'toast.loading': 'Loading events...',
        'toast.loaded': 'events loaded',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'Loading events...',
        
        'distance.meters': 'm',
        'distance.km': 'km',
        
        'place.museum': 'Museum',
        'place.monument': 'Monument',
        'place.theater': 'Theater',
        'place.hall': 'Concert Hall',
        'place.park': 'Park',
        'place.gallery': 'Gallery',
        'place.market': 'Market',
        'place.schedule': 'Check schedule',
        'place.free': 'Free',
        'place.paid': 'Paid',
        
        'lang.select': '🌐 Language',
        'lang.spanish': 'Español',
        'lang.english': 'English',
        'lang.french': 'Français',
    },
    
    fr: {
        // ===== HEADER =====
        'logo.text': 'EventosMadrid',
        'btn.map': 'Carte',
        'btn.list': 'Liste',
        'btn.places': 'Lieux',
        'btn.stats': 'Stats',
        
        // ===== FILTERS =====
        'filters.title': '🔍 Filtres',
        'filters.search.placeholder': '🔍 Chercher événements, lieux...',
        'filters.search.aria': 'Chercher événements',
        
        'filters.events': '🎭 Filtres d\'événements',
        'filters.when': 'Quand',
        'filters.when.all': 'Tous',
        'filters.when.today': 'Aujourd\'hui',
        'filters.when.weekend': 'Ce weekend',
        'filters.when.week': '7 prochains jours',
        'filters.when.month': 'Ce mois',
        
        'filters.type': 'Type d\'événement',
        'filters.type.concerts': '🎵 Concerts',
        'filters.type.parties': '🎪 Fêtes',
        'filters.type.markets': '🛍️ Marchés',
        'filters.type.cultural': '🎭 Culturel',
        'filters.type.gastro': '🍽️ Gastronomie',
        'filters.type.sports': '⚽ Sports',
        'filters.type.kids': '👶 Enfants',
        
        'filters.price': 'Prix',
        'filters.price.free': '💚 Gratuit',
        'filters.price.paid': '💰 Payant',
        'filters.price.max': 'Prix maximum',
        'filters.price.any': 'N\'importe',
        'filters.price.only_free': 'Gratuit seulement',
        'filters.price.until': 'jusqu\'à',
        
        'filters.places': '🏛️ Filtres de lieux',
        'filters.places.all': '✓ Tous',
        'filters.places.categories': 'Catégories',
        'filters.places.museums': '🏛️ Musées',
        'filters.places.monuments': '🗿 Monuments',
        'filters.places.theaters': '🎭 Théâtres',
        'filters.places.halls': '🎵 Salles',
        'filters.places.parks': '🌳 Parcs',
        'filters.places.galleries': '🖼️ Galeries',
        'filters.places.markets': '🛍️ Marchés',
        
        'filters.zone': '📍 Zone',
        'filters.zone.all': '📍 Toute la Communauté',
        'filters.zone.madrid': '🏙️ Madrid Ville',
        'filters.zone.municipalities': '🌆 Municipalités',
        
        'filters.clear': 'Effacer les filtres',
        
        'list.title': '📅 Événements à Madrid',
        'list.subtitle': 'Affichage de tous les événements',
        'list.sort': 'Trier par:',
        'list.sort.date': '📅 Date',
        'list.sort.name': '🔤 Nom',
        'list.sort.type': '🎭 Type',
        'list.sort.distance': '📍 Distance',
        
        'list.places': '🏛️ Points d\'intérêt',
        'list.empty': 'Aucun événement trouvé',
        'list.empty.subtitle': 'Essayez de modifier les filtres',
        
        'badge.today': '🔥 AUJOURD\'HUI',
        'badge.tomorrow': '⚡ DEMAIN',
        'badge.free': '💚 GRATUIT',
        'badge.paid': '💰',
        'badge.zone': '📍',
        
        'btn.view_map': 'Voir sur la carte',
        'btn.more_info': 'Plus d\'info',
        'btn.search': 'Rechercher',
        'btn.add_calendar': '📅 Ajouter au calendrier',
        'btn.directions': 'Itinéraires',
        'btn.share': 'Partager',
        'btn.confirm': 'Confirmer',
        'btn.close': 'Fermer',
        
        'stats.title': '📊 Statistiques',
        'stats.concerts': 'Concerts',
        'stats.parties': 'Fêtes',
        'stats.markets': 'Marchés',
        'stats.cultural': 'Culturel',
        'stats.gastro': 'Gastronomie',
        'stats.sports': 'Sports',
        'stats.kids': 'Enfants',
        'stats.free': 'Gratuit',
        
        'popup.share_event': 'Partager l\'événement',
        'popup.share_place': 'Partager le lieu',
        'popup.copy_link': 'Copier le lien',
        'popup.copied': 'Copié!',
        'popup.location': 'Votre localisation',
        'popup.here': 'Vous êtes ici',
        
        'toast.loading_location': '📍 Recherche de votre localisation...',
        'toast.location_found': '✅ Localisation trouvée',
        'toast.location_denied': '❌ Permission refusée',
        'toast.location_unavailable': '❌ Position non disponible',
        'toast.location_timeout': '❌ Délai d\'attente dépassé',
        'toast.location_disabled': '📍 Géolocalisation désactivée',
        'toast.places_visible': '🏛️ Lieux visibles',
        'toast.places_hidden': '🏛️ Lieux masqués',
        'toast.activate_location': '📍 Activez d\'abord votre localisation',
        'toast.events_today': 'événements aujourd\'hui à Madrid',
        'toast.copy_error': '❌ Impossible de copier',
        'toast.loading': 'Chargement des événements...',
        'toast.loaded': 'événements chargés',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'Chargement des événements...',
        
        'distance.meters': 'm',
        'distance.km': 'km',
        
        'place.museum': 'Musée',
        'place.monument': 'Monument',
        'place.theater': 'Théâtre',
        'place.hall': 'Salle',
        'place.park': 'Parc',
        'place.gallery': 'Galerie',
        'place.market': 'Marché',
        'place.schedule': 'Vérifier les horaires',
        'place.free': 'Gratuit',
        'place.paid': 'Payant',
        
        'lang.select': '🌐 Langue',
        'lang.spanish': 'Español',
        'lang.english': 'English',
        'lang.french': 'Français',
    }
};

// ===== GESTOR DE IDIOMAS =====
class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        const saved = localStorage.getItem('language');
        if (saved && ['es', 'en', 'fr'].includes(saved)) {
            return saved;
        }

        const browserLang = navigator.language.split('-')[0];
        if (['es', 'en', 'fr'].includes(browserLang)) {
            return browserLang;
        }

        return 'es';
    }

    init() {
        document.documentElement.lang = this.currentLang;
        localStorage.setItem('language', this.currentLang);
    }

    t(key, defaultValue = key) {
        return translations[this.currentLang]?.[key] || translations['es'][key] || defaultValue;
    }

    setLanguage(lang) {
        if (['es', 'en', 'fr'].includes(lang)) {
            this.currentLang = lang;
            this.init();
            window.location.reload();
        }
    }

    getLanguage() {
        return this.currentLang;
    }
}

// Crear instancia global
const i18n = new I18n();