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
        
        // ===== AJUSTES =====
        'settings.title': '⚙️ Ajustes',
        'settings.appearance': '🎨 Apariencia',
        'settings.theme': 'Modo oscuro',
        'settings.theme.desc': 'Cambiar entre tema claro y oscuro',
        'settings.language': '🌐 Idioma',
        'settings.language.select': 'Seleccionar idioma',
        'settings.language.desc': 'Elige tu idioma preferido',
        'settings.notifications': '🔔 Notificaciones',
        'settings.notifications.push': 'Notificaciones push',
        'settings.notifications.desc': 'Recibir alertas de nuevos eventos',
        'settings.privacy': '🔒 Privacidad',
        'settings.privacy.save': 'Guardar búsquedas',
        'settings.privacy.save.desc': 'Recordar tus últimas búsquedas',
        'settings.privacy.clear': 'Limpiar datos',
        'settings.about': 'ℹ️ Sobre',
        'settings.about.app': 'EventosMadrid',
        'settings.about.version': 'v1.0.0',
        'settings.about.desc': 'Mapa de eventos culturales y de ocio en Madrid',
        
        // ===== TOAST =====
        'toast.theme_dark': '🌙 Modo oscuro activado',
        'toast.theme_light': '☀️ Modo claro activado',
        'toast.lang_changed': '🌐 Idioma cambiado',
        'toast.notifications_on': '🔔 Notificaciones activadas',
        'toast.notifications_off': '🔕 Notificaciones desactivadas',
        'toast.searches_on': '💾 Se guardarán tus búsquedas',
        'toast.searches_off': '🗑️ Las búsquedas no se guardarán',
        'toast.data_cleared': '🗑️ Datos limpiados',
        
        // ===== LOADER =====
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'Cargando eventos...',
        
        // ===== IDIOMAS =====
        'lang.es': '🇪🇸 Español',
        'lang.en': '🇬🇧 English',
        'lang.fr': '🇫🇷 Français',
    },
    
    en: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Map',
        'btn.list': 'List',
        'btn.places': 'Places',
        'btn.stats': 'Stats',
        
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
        
        'filters.clear': 'Clear filters',
        
        'list.title': '📅 Events in Madrid',
        'list.subtitle': 'Showing all events',
        'list.sort': 'Sort by:',
        'list.sort.date': '📅 Date',
        'list.sort.name': '🔤 Name',
        'list.sort.type': '🎭 Type',
        'list.sort.distance': '📍 Distance',
        
        'list.places': '🏛️ Points of Interest',
        
        'stats.title': '📊 Statistics',
        'stats.concerts': 'Concerts',
        'stats.parties': 'Parties',
        'stats.markets': 'Markets',
        'stats.cultural': 'Cultural',
        'stats.gastro': 'Gastro',
        'stats.sports': 'Sports',
        'stats.kids': 'Kids',
        'stats.free': 'Free',
        
        'settings.title': '⚙️ Settings',
        'settings.appearance': '🎨 Appearance',
        'settings.theme': 'Dark mode',
        'settings.theme.desc': 'Switch between light and dark theme',
        'settings.language': '🌐 Language',
        'settings.language.select': 'Select language',
        'settings.language.desc': 'Choose your preferred language',
        'settings.notifications': '🔔 Notifications',
        'settings.notifications.push': 'Push notifications',
        'settings.notifications.desc': 'Receive alerts for new events',
        'settings.privacy': '🔒 Privacy',
        'settings.privacy.save': 'Save searches',
        'settings.privacy.save.desc': 'Remember your recent searches',
        'settings.privacy.clear': 'Clear data',
        'settings.about': 'ℹ️ About',
        'settings.about.app': 'EventosMadrid',
        'settings.about.version': 'v1.0.0',
        'settings.about.desc': 'Cultural and leisure events map in Madrid',
        
        'toast.theme_dark': '🌙 Dark mode enabled',
        'toast.theme_light': '☀️ Light mode enabled',
        'toast.lang_changed': '🌐 Language changed',
        'toast.notifications_on': '🔔 Notifications enabled',
        'toast.notifications_off': '🔕 Notifications disabled',
        'toast.searches_on': '💾 Searches will be saved',
        'toast.searches_off': '🗑️ Searches won\'t be saved',
        'toast.data_cleared': '🗑️ Data cleared',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'Loading events...',
        
        'lang.es': '🇪🇸 Español',
        'lang.en': '🇬🇧 English',
        'lang.fr': '🇫🇷 Français',
    },
    
    fr: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Carte',
        'btn.list': 'Liste',
        'btn.places': 'Lieux',
        'btn.stats': 'Stats',
        
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
        
        'filters.clear': 'Effacer les filtres',
        
        'list.title': '📅 Événements à Madrid',
        'list.subtitle': 'Affichage de tous les événements',
        'list.sort': 'Trier par:',
        'list.sort.date': '📅 Date',
        'list.sort.name': '🔤 Nom',
        'list.sort.type': '🎭 Type',
        'list.sort.distance': '📍 Distance',
        
        'list.places': '🏛️ Points d\'intérêt',
        
        'stats.title': '📊 Statistiques',
        'stats.concerts': 'Concerts',
        'stats.parties': 'Fêtes',
        'stats.markets': 'Marchés',
        'stats.cultural': 'Culturel',
        'stats.gastro': 'Gastronomie',
        'stats.sports': 'Sports',
        'stats.kids': 'Enfants',
        'stats.free': 'Gratuit',
        
        'settings.title': '⚙️ Paramètres',
        'settings.appearance': '🎨 Apparence',
        'settings.theme': 'Mode sombre',
        'settings.theme.desc': 'Basculer entre thème clair et sombre',
        'settings.language': '🌐 Langue',
        'settings.language.select': 'Sélectionner la langue',
        'settings.language.desc': 'Choisissez votre langue préférée',
        'settings.notifications': '🔔 Notifications',
        'settings.notifications.push': 'Notifications push',
        'settings.notifications.desc': 'Recevoir des alertes pour les nouveaux événements',
        'settings.privacy': '🔒 Confidentialité',
        'settings.privacy.save': 'Enregistrer les recherches',
        'settings.privacy.save.desc': 'Se souvenir de vos dernières recherches',
        'settings.privacy.clear': 'Effacer les données',
        'settings.about': 'ℹ️ À propos',
        'settings.about.app': 'EventosMadrid',
        'settings.about.version': 'v1.0.0',
        'settings.about.desc': 'Carte des événements culturels et de loisirs à Madrid',
        
        'toast.theme_dark': '🌙 Mode sombre activé',
        'toast.theme_light': '☀️ Mode clair activé',
        'toast.lang_changed': '🌐 Langue modifiée',
        'toast.notifications_on': '🔔 Notifications activées',
        'toast.notifications_off': '🔕 Notifications désactivées',
        'toast.searches_on': '💾 Les recherches seront enregistrées',
        'toast.searches_off': '🗑️ Les recherches ne seront pas enregistrées',
        'toast.data_cleared': '🗑️ Données effacées',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'Chargement des événements...',
        
        'lang.es': '🇪🇸 Español',
        'lang.en': '🇬🇧 English',
        'lang.fr': '🇫🇷 Français',
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
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            this.updateUI();
        }
    }

    getLanguage() {
        return this.currentLang;
    }

    // ✅ FUNCIÓN SIMPLIFICADA: Solo actualiza textos estáticos
    updateUI() {
        // Solo actualizar elementos que NO son interactivos
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            
            // Excluir elementos que tienen hijos (como botones con iconos)
            if (el.children.length > 0) return;
            
            // Excluir inputs, options, buttons
            if (['OPTION', 'INPUT', 'BUTTON'].includes(el.tagName)) return;
            
            el.textContent = this.t(key);
        });

        // Actualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        // Actualizar select options manualmente
        this.updateSelectOptions();
    }

    updateSelectOptions() {
        const selects = [
            { id: 'filtro-fecha', options: ['filters.when.all', 'filters.when.today', 'filters.when.weekend', 'filters.when.week', 'filters.when.month'] },
            { id: 'sort-by', options: ['list.sort.date', 'list.sort.name', 'list.sort.type', 'list.sort.distance'] },
            { id: 'lang-select', options: ['lang.es', 'lang.en', 'lang.fr'] }
        ];

        selects.forEach(({ id, options }) => {
            const select = document.getElementById(id);
            if (!select) return;
            
            const currentValue = select.value;
            
            Array.from(select.options).forEach((option, index) => {
                if (options[index]) {
                    option.textContent = this.t(options[index]);
                }
            });
            
            select.value = currentValue;
        });

        // Actualizar primera opción de zona
        const filtroZona = document.getElementById('filtro-zona');
        if (filtroZona?.options[0]) {
            const currentValue = filtroZona.value;
            filtroZona.options[0].textContent = this.t('filters.zone.all');
            filtroZona.value = currentValue;
        }
    }
}

// Crear instancia global
const i18n = new I18n();

// ✅ Actualizar UI al cargar (sin romper eventos)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => i18n.updateUI(), 100);
    });
} else {
    setTimeout(() => i18n.updateUI(), 100);
}