// ===== SISTEMA DE TRADUCCIONES I18N MEJORADO =====

const translations = {
    es: {
        // ===== HEADER =====
        'logo.text': 'EventosMadrid',
        'btn.map': 'Mapa',
        'btn.list': 'Lista',
        'btn.calendar': 'Calendario',
        'btn.places': 'Lugares',
        'btn.stats': 'Stats',
        
        // ===== FILTROS =====
        'filters.title': '🔍 Filtros',
        'filters.search.placeholder': '🔍 Buscar eventos, lugares...',
        'filters.search.aria': 'Buscar eventos',
        
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
        
        // ===== FAVORITOS =====
        'favorites.title': '❤️ Mis Favoritos',
        'favorites.empty': 'No tienes favoritos',
        'favorites.empty.desc': 'Añade eventos tocando el ❤️',
        'favorites.added': '❤️ Añadido a favoritos',
        'favorites.removed': '💔 Eliminado de favoritos',
        
        // ===== ESTADÍSTICAS =====
        'stats.title': '📊 Estadísticas',
        'stats.concerts': 'Conciertos',
        'stats.parties': 'Fiestas',
        'stats.markets': 'Mercados',
        'stats.cultural': 'Cultural',
        'stats.gastro': 'Gastro',
        'stats.sports': 'Deportes',
        'stats.kids': 'Infantil',
        'stats.free': 'Gratis',
        'stats.charts.events_by_type': '📊 Eventos por Tipo',
        'stats.charts.events_by_zone': '🗺️ Eventos por Zona',
        'stats.charts.events_timeline': '📅 Eventos en el Tiempo',
        
        // ===== AJUSTES =====
        'settings.title': '⚙️ Ajustes',
        'settings.appearance': '🎨 Apariencia',
        'settings.theme': 'Modo oscuro',
        'settings.theme.desc': 'Cambiar entre tema claro y oscuro',
        'settings.contrast': 'Alto contraste',
        'settings.contrast.desc': 'Mejora la legibilidad para baja visión',
        'settings.large_text': 'Textos grandes',
        'settings.large_text.desc': 'Aumenta el tamaño de la fuente',
        'settings.reduce_motion': 'Reducir animaciones',
        'settings.reduce_motion.desc': 'Para sensibilidad al movimiento',
        
        'settings.language': '🌐 Idioma',
        'settings.language.select': 'Seleccionar idioma',
        'settings.language.desc': 'Elige tu idioma preferido',
        'settings.translate_events': 'Traducir eventos',
        'settings.translate_events.desc': 'Traducir nombres automáticamente',
        
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
        'toast.translate_on': '🌍 Traducción activada',
        'toast.translate_off': '🌍 Traducción desactivada',
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
        'lang.pt': '🇵🇹 Português',
        'lang.de': '🇩🇪 Deutsch',
        'lang.it': '🇮🇹 Italiano',
        'lang.zh': '🇨🇳 中文',
        'lang.ja': '🇯🇵 日本語',
        'lang.ko': '🇰🇷 한국어',
    },
    
    en: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Map',
        'btn.list': 'List',
        'btn.calendar': 'Calendar',
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
        
        'favorites.title': '❤️ My Favorites',
        'favorites.empty': 'No favorites yet',
        'favorites.empty.desc': 'Add events by tapping the ❤️',
        'favorites.added': '❤️ Added to favorites',
        'favorites.removed': '💔 Removed from favorites',
        
        'stats.title': '📊 Statistics',
        'stats.concerts': 'Concerts',
        'stats.parties': 'Parties',
        'stats.markets': 'Markets',
        'stats.cultural': 'Cultural',
        'stats.gastro': 'Gastro',
        'stats.sports': 'Sports',
        'stats.kids': 'Kids',
        'stats.free': 'Free',
        'stats.charts.events_by_type': '📊 Events by Type',
        'stats.charts.events_by_zone': '🗺️ Events by Zone',
        'stats.charts.events_timeline': '📅 Events Timeline',
        
        'settings.title': '⚙️ Settings',
        'settings.appearance': '🎨 Appearance',
        'settings.theme': 'Dark mode',
        'settings.theme.desc': 'Switch between light and dark theme',
        'settings.contrast': 'High contrast',
        'settings.contrast.desc': 'Improves readability for low vision',
        'settings.large_text': 'Large text',
        'settings.large_text.desc': 'Increase font size',
        'settings.reduce_motion': 'Reduce animations',
        'settings.reduce_motion.desc': 'For motion sensitivity',
        
        'settings.language': '🌐 Language',
        'settings.language.select': 'Select language',
        'settings.language.desc': 'Choose your preferred language',
        'settings.translate_events': 'Translate events',
        'settings.translate_events.desc': 'Translate names automatically',
        
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
        'toast.translate_on': '🌍 Translation enabled',
        'toast.translate_off': '🌍 Translation disabled',
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
        'lang.pt': '🇵🇹 Português',
        'lang.de': '🇩🇪 Deutsch',
        'lang.it': '🇮🇹 Italiano',
        'lang.zh': '🇨🇳 中文',
        'lang.ja': '🇯🇵 日本語',
        'lang.ko': '🇰🇷 한국어',
    },
    
    fr: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Carte',
        'btn.list': 'Liste',
        'btn.calendar': 'Calendrier',
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
        
        'favorites.title': '❤️ Mes Favoris',
        'favorites.empty': 'Aucun favori',
        'favorites.empty.desc': 'Ajoutez des événements en appuyant sur ❤️',
        'favorites.added': '❤️ Ajouté aux favoris',
        'favorites.removed': '💔 Retiré des favoris',
        
        'stats.title': '📊 Statistiques',
        'stats.concerts': 'Concerts',
        'stats.parties': 'Fêtes',
        'stats.markets': 'Marchés',
        'stats.cultural': 'Culturel',
        'stats.gastro': 'Gastronomie',
        'stats.sports': 'Sports',
        'stats.kids': 'Enfants',
        'stats.free': 'Gratuit',
        'stats.charts.events_by_type': '📊 Événements par Type',
        'stats.charts.events_by_zone': '🗺️ Événements par Zone',
        'stats.charts.events_timeline': '📅 Événements dans le Temps',
        
        'settings.title': '⚙️ Paramètres',
        'settings.appearance': '🎨 Apparence',
        'settings.theme': 'Mode sombre',
        'settings.theme.desc': 'Basculer entre thème clair et sombre',
        'settings.contrast': 'Contraste élevé',
        'settings.contrast.desc': 'Améliore la lisibilité pour malvoyants',
        'settings.large_text': 'Grands textes',
        'settings.large_text.desc': 'Augmenter la taille de police',
        'settings.reduce_motion': 'Réduire les animations',
        'settings.reduce_motion.desc': 'Pour sensibilité au mouvement',
        
        'settings.language': '🌐 Langue',
        'settings.language.select': 'Sélectionner la langue',
        'settings.language.desc': 'Choisissez votre langue préférée',
        'settings.translate_events': 'Traduire événements',
        'settings.translate_events.desc': 'Traduire les noms automatiquement',
        
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
        'toast.translate_on': '🌍 Traduction activée',
        'toast.translate_off': '🌍 Traduction désactivée',
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
        'lang.pt': '🇵🇹 Português',
        'lang.de': '🇩🇪 Deutsch',
        'lang.it': '🇮🇹 Italiano',
        'lang.zh': '🇨🇳 中文',
        'lang.ja': '🇯🇵 日本語',
        'lang.ko': '🇰🇷 한국어',
    },

    // ===== PORTUGUÉS (pt) =====
    pt: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Mapa',
        'btn.list': 'Lista',
        'btn.calendar': 'Calendário',
        'btn.places': 'Locais',
        'btn.stats': 'Estat.',
        
        'filters.title': '🔍 Filtros',
        'filters.search.placeholder': '🔍 Procurar eventos, locais...',
        
        'filters.events': '🎭 Filtros de Eventos',
        'filters.when': 'Quando',
        'filters.when.all': 'Todos',
        'filters.when.today': 'Hoje',
        'filters.when.weekend': 'Este fim de semana',
        'filters.when.week': 'Próximos 7 dias',
        'filters.when.month': 'Este mês',
        
        'filters.type': 'Tipo de Evento',
        'filters.type.concerts': '🎵 Concertos',
        'filters.type.parties': '🎪 Festas',
        'filters.type.markets': '🛍️ Mercados',
        'filters.type.cultural': '🎭 Cultural',
        'filters.type.gastro': '🍽️ Gastronomia',
        'filters.type.sports': '⚽ Esportes',
        'filters.type.kids': '👶 Infantil',
        
        'filters.price': 'Preço',
        'filters.price.free': '💚 Grátis',
        'filters.price.paid': '💰 Pago',
        'filters.price.max': 'Preço máximo',
        'filters.price.any': 'Qualquer',
        
        'filters.places': '🏛️ Filtros de Locais',
        'filters.places.all': '✓ Todos',
        'filters.places.categories': 'Categorias',
        'filters.places.museums': '🏛️ Museus',
        'filters.places.monuments': '🗿 Monumentos',
        'filters.places.theaters': '🎭 Teatros',
        'filters.places.halls': '🎵 Salas',
        'filters.places.parks': '🌳 Parques',
        'filters.places.galleries': '🖼️ Galerias',
        'filters.places.markets': '🛍️ Mercados',
        
        'filters.zone': '📍 Zona',
        'filters.zone.all': '📍 Toda a Comunidade',
        'filters.clear': 'Limpar filtros',
        
        'list.title': '📅 Eventos em Madrid',
        'list.subtitle': 'Mostrando todos os eventos',
        'list.sort': 'Ordenar por:',
        'list.sort.date': '📅 Data',
        'list.sort.name': '🔤 Nome',
        'list.sort.type': '🎭 Tipo',
        'list.sort.distance': '📍 Distância',
        'list.places': '🏛️ Pontos de Interesse',
        
        'favorites.title': '❤️ Meus Favoritos',
        'favorites.empty': 'Sem favoritos',
        'favorites.empty.desc': 'Adicione eventos tocando no ❤️',
        'favorites.added': '❤️ Adicionado aos favoritos',
        'favorites.removed': '💔 Removido dos favoritos',
        
        'stats.title': '📊 Estatísticas',
        'stats.concerts': 'Concertos',
        'stats.parties': 'Festas',
        'stats.markets': 'Mercados',
        'stats.cultural': 'Cultural',
        'stats.gastro': 'Gastronomia',
        'stats.sports': 'Esportes',
        'stats.kids': 'Infantil',
        'stats.free': 'Grátis',
        'stats.charts.events_by_type': '📊 Eventos por Tipo',
        'stats.charts.events_by_zone': '🗺️ Eventos por Zona',
        'stats.charts.events_timeline': '📅 Eventos no Tempo',
        
        'settings.title': '⚙️ Configurações',
        'settings.appearance': '🎨 Aparência',
        'settings.theme': 'Modo escuro',
        'settings.theme.desc': 'Alternar entre tema claro e escuro',
        'settings.contrast': 'Alto contraste',
        'settings.contrast.desc': 'Melhora a legibilidade para baixa visão',
        'settings.large_text': 'Textos grandes',
        'settings.large_text.desc': 'Aumentar tamanho da fonte',
        'settings.reduce_motion': 'Reduzir animações',
        'settings.reduce_motion.desc': 'Para sensibilidade ao movimento',
        
        'settings.language': '🌐 Idioma',
        'settings.language.select': 'Selecionar idioma',
        'settings.language.desc': 'Escolha seu idioma preferido',
        'settings.translate_events': 'Traduzir eventos',
        'settings.translate_events.desc': 'Traduzir nomes automaticamente',
        
        'settings.notifications': '🔔 Notificações',
        'settings.notifications.push': 'Notificações push',
        'settings.notifications.desc': 'Receber alertas de novos eventos',
        
        'settings.privacy': '🔒 Privacidade',
        'settings.privacy.save': 'Salvar pesquisas',
        'settings.privacy.save.desc': 'Lembrar suas últimas pesquisas',
        'settings.privacy.clear': 'Limpar dados',
        
        'settings.about': 'ℹ️ Sobre',
        'settings.about.app': 'EventosMadrid',
        'settings.about.version': 'v1.0.0',
        'settings.about.desc': 'Mapa de eventos culturais e de lazer em Madrid',
        
        'toast.theme_dark': '🌙 Modo escuro ativado',
        'toast.theme_light': '☀️ Modo claro ativado',
        'toast.lang_changed': '🌐 Idioma alterado',
        'toast.translate_on': '🌍 Tradução ativada',
        'toast.translate_off': '🌍 Tradução desativada',
        'toast.notifications_on': '🔔 Notificações ativadas',
        'toast.notifications_off': '🔕 Notificações desativadas',
        'toast.searches_on': '💾 Pesquisas serão salvas',
        'toast.searches_off': '🗑️ Pesquisas não serão salvas',
        'toast.data_cleared': '🗑️ Dados limpos',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'Carregando eventos...',
        
        'lang.es': '🇪🇸 Español',
        'lang.en': '🇬🇧 English',
        'lang.fr': '🇫🇷 Français',
        'lang.pt': '🇵🇹 Português',
        'lang.de': '🇩🇪 Deutsch',
        'lang.it': '🇮🇹 Italiano',
        'lang.zh': '🇨🇳 中文',
        'lang.ja': '🇯🇵 日本語',
        'lang.ko': '🇰🇷 한국어',
    },

    // ===== ALEMÁN (de) =====
    de: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Karte',
        'btn.list': 'Liste',
        'btn.calendar': 'Kalender',
        'btn.places': 'Orte',
        'btn.stats': 'Stats',
        
        'filters.title': '🔍 Filter',
        'filters.search.placeholder': '🔍 Veranstaltungen, Orte suchen...',
        
        'filters.events': '🎭 Veranstaltungsfilter',
        'filters.when': 'Wann',
        'filters.when.all': 'Alle',
        'filters.when.today': 'Heute',
        'filters.when.weekend': 'Dieses Wochenende',
        'filters.when.week': 'Nächste 7 Tage',
        'filters.when.month': 'Dieser Monat',
        
        'filters.type': 'Veranstaltungstyp',
        'filters.type.concerts': '🎵 Konzerte',
        'filters.type.parties': '🎪 Partys',
        'filters.type.markets': '🛍️ Märkte',
        'filters.type.cultural': '🎭 Kultur',
        'filters.type.gastro': '🍽️ Gastronomie',
        'filters.type.sports': '⚽ Sport',
        'filters.type.kids': '👶 Kinder',
        
        'filters.price': 'Preis',
        'filters.price.free': '💚 Kostenlos',
        'filters.price.paid': '💰 Bezahlt',
        'filters.price.max': 'Höchstpreis',
        'filters.price.any': 'Beliebig',
        
        'filters.places': '🏛️ Ortsfilter',
        'filters.places.all': '✓ Alle',
        'filters.places.categories': 'Kategorien',
        'filters.places.museums': '🏛️ Museen',
        'filters.places.monuments': '🗿 Denkmäler',
        'filters.places.theaters': '🎭 Theater',
        'filters.places.halls': '🎵 Säle',
        'filters.places.parks': '🌳 Parks',
        'filters.places.galleries': '🖼️ Galerien',
        'filters.places.markets': '🛍️ Märkte',
        
        'filters.zone': '📍 Zone',
        'filters.zone.all': '📍 Gesamte Gemeinde',
        'filters.clear': 'Filter löschen',
        
        'list.title': '📅 Veranstaltungen in Madrid',
        'list.subtitle': 'Alle Veranstaltungen anzeigen',
        'list.sort': 'Sortieren nach:',
        'list.sort.date': '📅 Datum',
        'list.sort.name': '🔤 Name',
        'list.sort.type': '🎭 Typ',
        'list.sort.distance': '📍 Entfernung',
        'list.places': '🏛️ Sehenswürdigkeiten',
        
        'favorites.title': '❤️ Meine Favoriten',
        'favorites.empty': 'Keine Favoriten',
        'favorites.empty.desc': 'Fügen Sie Veranstaltungen hinzu, indem Sie auf ❤️ tippen',
        'favorites.added': '❤️ Zu Favoriten hinzugefügt',
        'favorites.removed': '💔 Aus Favoriten entfernt',
        
        'stats.title': '📊 Statistiken',
        'stats.concerts': 'Konzerte',
        'stats.parties': 'Partys',
        'stats.markets': 'Märkte',
        'stats.cultural': 'Kultur',
        'stats.gastro': 'Gastronomie',
        'stats.sports': 'Sport',
        'stats.kids': 'Kinder',
        'stats.free': 'Kostenlos',
        'stats.charts.events_by_type': '📊 Veranstaltungen nach Typ',
        'stats.charts.events_by_zone': '🗺️ Veranstaltungen nach Zone',
        'stats.charts.events_timeline': '📅 Veranstaltungszeitplan',
        
        'settings.title': '⚙️ Einstellungen',
        'settings.appearance': '🎨 Aussehen',
        'settings.theme': 'Dunkler Modus',
        'settings.theme.desc': 'Zwischen hellem und dunklem Design wechseln',
        'settings.contrast': 'Hoher Kontrast',
        'settings.contrast.desc': 'Verbessert die Lesbarkeit bei Sehschwäche',
        'settings.large_text': 'Großer Text',
        'settings.large_text.desc': 'Schriftgröße erhöhen',
        'settings.reduce_motion': 'Animationen reduzieren',
        'settings.reduce_motion.desc': 'Für Bewegungsempfindlichkeit',
        
        'settings.language': '🌐 Sprache',
        'settings.language.select': 'Sprache auswählen',
        'settings.language.desc': 'Wählen Sie Ihre bevorzugte Sprache',
        'settings.translate_events': 'Veranstaltungen übersetzen',
        'settings.translate_events.desc': 'Namen automatisch übersetzen',
        
        'settings.notifications': '🔔 Benachrichtigungen',
        'settings.notifications.push': 'Push-Benachrichtigungen',
        'settings.notifications.desc': 'Benachrichtigungen für neue Veranstaltungen erhalten',
        
        'settings.privacy': '🔒 Datenschutz',
        'settings.privacy.save': 'Suchen speichern',
        'settings.privacy.save.desc': 'Letzte Suchen merken',
        'settings.privacy.clear': 'Daten löschen',
        
        'settings.about': 'ℹ️ Über',
        'settings.about.app': 'EventosMadrid',
        'settings.about.version': 'v1.0.0',
        'settings.about.desc': 'Karte für Kultur- und Freizeitveranstaltungen in Madrid',
        
        'toast.theme_dark': '🌙 Dunkler Modus aktiviert',
        'toast.theme_light': '☀️ Heller Modus aktiviert',
        'toast.lang_changed': '🌐 Sprache geändert',
        'toast.translate_on': '🌍 Übersetzung aktiviert',
        'toast.translate_off': '🌍 Übersetzung deaktiviert',
        'toast.notifications_on': '🔔 Benachrichtigungen aktiviert',
        'toast.notifications_off': '🔕 Benachrichtigungen deaktiviert',
        'toast.searches_on': '💾 Suchen werden gespeichert',
        'toast.searches_off': '🗑️ Suchen werden nicht gespeichert',
        'toast.data_cleared': '🗑️ Daten gelöscht',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'Veranstaltungen werden geladen...',
        
        'lang.es': '🇪🇸 Español',
        'lang.en': '🇬🇧 English',
        'lang.fr': '🇫🇷 Français',
        'lang.pt': '🇵🇹 Português',
        'lang.de': '🇩🇪 Deutsch',
        'lang.it': '🇮🇹 Italiano',
        'lang.zh': '🇨🇳 中文',
        'lang.ja': '🇯🇵 日本語',
        'lang.ko': '🇰🇷 한국어',
    },

    // ===== ITALIANO (it) =====
    it: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Mappa',
        'btn.list': 'Lista',
        'btn.calendar': 'Calendario',
        'btn.places': 'Luoghi',
        'btn.stats': 'Stat.',
        
        'filters.title': '🔍 Filtri',
        'filters.search.placeholder': '🔍 Cerca eventi, luoghi...',
        
        'filters.events': '🎭 Filtri Eventi',
        'filters.when': 'Quando',
        'filters.when.all': 'Tutti',
        'filters.when.today': 'Oggi',
        'filters.when.weekend': 'Questo weekend',
        'filters.when.week': 'Prossimi 7 giorni',
        'filters.when.month': 'Questo mese',
        
        'filters.type': 'Tipo di Evento',
        'filters.type.concerts': '🎵 Concerti',
        'filters.type.parties': '🎪 Feste',
        'filters.type.markets': '🛍️ Mercati',
        'filters.type.cultural': '🎭 Culturale',
        'filters.type.gastro': '🍽️ Gastronomia',
        'filters.type.sports': '⚽ Sport',
        'filters.type.kids': '👶 Bambini',
        
        'filters.price': 'Prezzo',
        'filters.price.free': '💚 Gratis',
        'filters.price.paid': '💰 A pagamento',
        'filters.price.max': 'Prezzo massimo',
        'filters.price.any': 'Qualsiasi',
        
        'filters.places': '🏛️ Filtri Luoghi',
        'filters.places.all': '✓ Tutti',
        'filters.places.categories': 'Categorie',
        'filters.places.museums': '🏛️ Musei',
        'filters.places.monuments': '🗿 Monumenti',
        'filters.places.theaters': '🎭 Teatri',
        'filters.places.halls': '🎵 Sale',
        'filters.places.parks': '🌳 Parchi',
        'filters.places.galleries': '🖼️ Gallerie',
        'filters.places.markets': '🛍️ Mercati',
        
        'filters.zone': '📍 Zona',
        'filters.zone.all': '📍 Tutta la Comunità',
        'filters.clear': 'Cancella filtri',
        
        'list.title': '📅 Eventi a Madrid',
        'list.subtitle': 'Mostrando tutti gli eventi',
        'list.sort': 'Ordina per:',
        'list.sort.date': '📅 Data',
        'list.sort.name': '🔤 Nome',
        'list.sort.type': '🎭 Tipo',
        'list.sort.distance': '📍 Distanza',
        'list.places': '🏛️ Punti di Interesse',
        
        'favorites.title': '❤️ I Miei Preferiti',
        'favorites.empty': 'Nessun preferito',
        'favorites.empty.desc': 'Aggiungi eventi toccando il ❤️',
        'favorites.added': '❤️ Aggiunto ai preferiti',
        'favorites.removed': '💔 Rimosso dai preferiti',
        
        'stats.title': '📊 Statistiche',
        'stats.concerts': 'Concerti',
        'stats.parties': 'Feste',
        'stats.markets': 'Mercati',
        'stats.cultural': 'Culturale',
        'stats.gastro': 'Gastronomia',
        'stats.sports': 'Sport',
        'stats.kids': 'Bambini',
        'stats.free': 'Gratis',
        'stats.charts.events_by_type': '📊 Eventi per Tipo',
        'stats.charts.events_by_zone': '🗺️ Eventi per Zona',
        'stats.charts.events_timeline': '📅 Cronologia Eventi',
        
        'settings.title': '⚙️ Impostazioni',
        'settings.appearance': '🎨 Aspetto',
        'settings.theme': 'Modalità scura',
        'settings.theme.desc': 'Cambia tra tema chiaro e scuro',
        'settings.contrast': 'Alto contrasto',
        'settings.contrast.desc': 'Migliora la leggibilità per ipovedenti',
        'settings.large_text': 'Testo grande',
        'settings.large_text.desc': 'Aumenta dimensione carattere',
        'settings.reduce_motion': 'Riduci animazioni',
        'settings.reduce_motion.desc': 'Per sensibilità al movimento',
        
        'settings.language': '🌐 Lingua',
        'settings.language.select': 'Seleziona lingua',
        'settings.language.desc': 'Scegli la tua lingua preferita',
        'settings.translate_events': 'Traduci eventi',
        'settings.translate_events.desc': 'Tradurre nomi automaticamente',
        
        'settings.notifications': '🔔 Notifiche',
        'settings.notifications.push': 'Notifiche push',
        'settings.notifications.desc': 'Ricevi avvisi per nuovi eventi',
        
        'settings.privacy': '🔒 Privacy',
        'settings.privacy.save': 'Salva ricerche',
        'settings.privacy.save.desc': 'Ricorda le tue ultime ricerche',
        'settings.privacy.clear': 'Cancella dati',
        
        'settings.about': 'ℹ️ Informazioni',
        'settings.about.app': 'EventosMadrid',
        'settings.about.version': 'v1.0.0',
        'settings.about.desc': 'Mappa di eventi culturali e di svago a Madrid',
        
        'toast.theme_dark': '🌙 Modalità scura attivata',
        'toast.theme_light': '☀️ Modalità chiara attivata',
        'toast.lang_changed': '🌐 Lingua cambiata',
        'toast.translate_on': '🌍 Traduzione attivata',
        'toast.translate_off': '🌍 Traduzione disattivata',
        'toast.notifications_on': '🔔 Notifiche attivate',
        'toast.notifications_off': '🔕 Notifiche disattivate',
        'toast.searches_on': '💾 Le ricerche saranno salvate',
        'toast.searches_off': '🗑️ Le ricerche non saranno salvate',
        'toast.data_cleared': '🗑️ Dati cancellati',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'Caricamento eventi...',
        
        'lang.es': '🇪🇸 Español',
        'lang.en': '🇬🇧 English',
        'lang.fr': '🇫🇷 Français',
        'lang.pt': '🇵🇹 Português',
        'lang.de': '🇩🇪 Deutsch',
        'lang.it': '🇮🇹 Italiano',
        'lang.zh': '🇨🇳 中文',
        'lang.ja': '🇯🇵 日本語',
        'lang.ko': '🇰🇷 한국어',
    },

    // ===== CHINO (zh) =====
    zh: {
        'logo.text': 'EventosMadrid',
        'btn.map': '地图',
        'btn.list': '列表',
        'btn.calendar': '日历',
        'btn.places': '地点',
        'btn.stats': '统计',
        
        'filters.title': '🔍 筛选',
        'filters.search.placeholder': '🔍 搜索活动、地点...',
        
        'filters.events': '🎭 活动筛选',
        'filters.when': '时间',
        'filters.when.all': '全部',
        'filters.when.today': '今天',
        'filters.when.weekend': '本周末',
        'filters.when.week': '未来7天',
        'filters.when.month': '本月',
        
        'filters.type': '活动类型',
        'filters.type.concerts': '🎵 音乐会',
        'filters.type.parties': '🎪 派对',
        'filters.type.markets': '🛍️ 市场',
        'filters.type.cultural': '🎭 文化',
        'filters.type.gastro': '🍽️ 美食',
        'filters.type.sports': '⚽ 体育',
        'filters.type.kids': '👶 儿童',
        
        'filters.price': '价格',
        'filters.price.free': '💚 免费',
        'filters.price.paid': '💰 付费',
        'filters.price.max': '最高价格',
        'filters.price.any': '任意',
        
        'filters.places': '🏛️ 地点筛选',
        'filters.places.all': '✓ 全部',
        'filters.places.categories': '类别',
        'filters.places.museums': '🏛️ 博物馆',
        'filters.places.monuments': '🗿 纪念碑',
        'filters.places.theaters': '🎭 剧院',
        'filters.places.halls': '🎵 音乐厅',
        'filters.places.parks': '🌳 公园',
        'filters.places.galleries': '🖼️ 画廊',
        'filters.places.markets': '🛍️ 市场',
        
        'filters.zone': '📍 区域',
        'filters.zone.all': '📍 整个社区',
        'filters.clear': '清除筛选',
        
        'list.title': '📅 马德里活动',
        'list.subtitle': '显示所有活动',
        'list.sort': '排序:',
        'list.sort.date': '📅 日期',
        'list.sort.name': '🔤 名称',
        'list.sort.type': '🎭 类型',
        'list.sort.distance': '📍 距离',
        'list.places': '🏛️ 景点',
        
        'favorites.title': '❤️ 我的收藏',
        'favorites.empty': '暂无收藏',
        'favorites.empty.desc': '点击 ❤️ 添加活动',
        'favorites.added': '❤️ 已添加到收藏',
        'favorites.removed': '💔 已从收藏移除',
        
        'stats.title': '📊 统计',
        'stats.concerts': '音乐会',
        'stats.parties': '派对',
        'stats.markets': '市场',
        'stats.cultural': '文化',
        'stats.gastro': '美食',
        'stats.sports': '体育',
        'stats.kids': '儿童',
        'stats.free': '免费',
        'stats.charts.events_by_type': '📊 按类型统计活动',
        'stats.charts.events_by_zone': '🗺️ 按区域统计活动',
        'stats.charts.events_timeline': '📅 活动时间线',
        
        'settings.title': '⚙️ 设置',
        'settings.appearance': '🎨 外观',
        'settings.theme': '深色模式',
        'settings.theme.desc': '在浅色和深色主题之间切换',
        'settings.contrast': '高对比度',
        'settings.contrast.desc': '改善低视力者的可读性',
        'settings.large_text': '大文字',
        'settings.large_text.desc': '增加字体大小',
        'settings.reduce_motion': '减少动画',
        'settings.reduce_motion.desc': '适合运动敏感者',
        
        'settings.language': '🌐 语言',
        'settings.language.select': '选择语言',
        'settings.language.desc': '选择您喜欢的语言',
        'settings.translate_events': '翻译活动',
        'settings.translate_events.desc': '自动翻译名称',
        
        'settings.notifications': '🔔 通知',
        'settings.notifications.push': '推送通知',
        'settings.notifications.desc': '接收新活动提醒',
        
        'settings.privacy': '🔒 隐私',
        'settings.privacy.save': '保存搜索',
        'settings.privacy.save.desc': '记住您最近的搜索',
        'settings.privacy.clear': '清除数据',
        
        'settings.about': 'ℹ️ 关于',
        'settings.about.app': 'EventosMadrid',
        'settings.about.version': 'v1.0.0',
        'settings.about.desc': '马德里文化和休闲活动地图',
        
        'toast.theme_dark': '🌙 已启用深色模式',
        'toast.theme_light': '☀️ 已启用浅色模式',
        'toast.lang_changed': '🌐 语言已更改',
        'toast.translate_on': '🌍 翻译已启用',
        'toast.translate_off': '🌍 翻译已禁用',
        'toast.notifications_on': '🔔 通知已启用',
        'toast.notifications_off': '🔕 通知已禁用',
        'toast.searches_on': '💾 搜索将被保存',
        'toast.searches_off': '🗑️ 搜索不会被保存',
        'toast.data_cleared': '🗑️ 数据已清除',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': '加载活动中...',
        
        'lang.es': '🇪🇸 Español',
        'lang.en': '🇬🇧 English',
        'lang.fr': '🇫🇷 Français',
        'lang.pt': '🇵🇹 Português',
        'lang.de': '🇩🇪 Deutsch',
        'lang.it': '🇮🇹 Italiano',
        'lang.zh': '🇨🇳 中文',
        'lang.ja': '🇯🇵 日本語',
        'lang.ko': '🇰🇷 한국어',
    },

    // ===== JAPONÉS (ja) =====
    ja: {
        'logo.text': 'EventosMadrid',
        'btn.map': '地図',
        'btn.list': 'リスト',
        'btn.calendar': 'カレンダー',
        'btn.places': '場所',
        'btn.stats': '統計',
        
        'filters.title': '🔍 フィルター',
        'filters.search.placeholder': '🔍 イベント、場所を検索...',
        
        'filters.events': '🎭 イベントフィルター',
        'filters.when': '日時',
        'filters.when.all': 'すべて',
        'filters.when.today': '今日',
        'filters.when.weekend': '今週末',
        'filters.when.week': '今後7日間',
        'filters.when.month': '今月',
        
        'filters.type': 'イベントタイプ',
        'filters.type.concerts': '🎵 コンサート',
        'filters.type.parties': '🎪 パーティー',
        'filters.type.markets': '🛍️ マーケット',
        'filters.type.cultural': '🎭 文化',
        'filters.type.gastro': '🍽️ グルメ',
        'filters.type.sports': '⚽ スポーツ',
        'filters.type.kids': '👶 子供向け',
        
        'filters.price': '料金',
        'filters.price.free': '💚 無料',
        'filters.price.paid': '💰 有料',
        'filters.price.max': '最高料金',
        'filters.price.any': '任意',
        
        'filters.places': '🏛️ 場所フィルター',
        'filters.places.all': '✓ すべて',
        'filters.places.categories': 'カテゴリー',
        'filters.places.museums': '🏛️ 博物館',
        'filters.places.monuments': '🗿 モニュメント',
        'filters.places.theaters': '🎭  劇場',
        'filters.places.halls': '🎵 ホール',
        'filters.places.parks': '🌳  公園',
        'filters.places.galleries': '🖼️ ギャラリー',
        'filters.places.markets': '🛍️ マーケット',
        
        'filters.zone': '📍 エリア',
        'filters.zone.all': '📍 コミュニティ全体',
        'filters.clear': 'フィルターをクリア',
        
        'list.title': '📅 マドリードのイベント',
        'list.subtitle': 'すべてのイベントを表示',
        'list.sort': '並び替え:',
        'list.sort.date': '📅 日付',
        'list.sort.name': '🔤 名前',
        'list.sort.type': '🎭 タイプ',
        'list.sort.distance': '📍 距離',
        'list.places': '🏛️ 観光スポット',
        
        'favorites.title': '❤️ お気に入り',
        'favorites.empty': 'お気に入りなし',
        'favorites.empty.desc': '❤️ をタップしてイベントを追加',
        'favorites.added': '❤️ お気に入りに追加しました',
        'favorites.removed': '💔 お気に入りから削除しました',
        
        'stats.title': '📊 統計',
        'stats.concerts': 'コンサート',
        'stats.parties': 'パーティー',
        'stats.markets': 'マーケット',
        'stats.cultural': '文化',
        'stats.gastro': 'グルメ',
        'stats.sports': 'スポーツ',
        'stats.kids': '子供向け',
        'stats.free': '無料',
        'stats.charts.events_by_type': '📊 タイプ別イベント',
        'stats.charts.events_by_zone': '🗺️ エリア別イベント',
        'stats.charts.events_timeline': '📅 イベントタイムライン',
        
        'settings.title': '⚙️ 設定',
        'settings.appearance': '🎨 外観',
        'settings.theme': 'ダークモード',
        'settings.theme.desc': 'ライトテーマとダークテーマを切り替え',
        'settings.contrast': 'ハイコントラスト',
        'settings.contrast.desc': '低視力者の読みやすさを改善',
        'settings.large_text': '大きいテキスト',
        'settings.large_text.desc': 'フォントサイズを大きくする',
        'settings.reduce_motion': 'アニメーションを減らす',
        'settings.reduce_motion.desc': 'モーション感度用',
        
        'settings.language': '🌐 言語',
        'settings.language.select': '言語を選択',
        'settings.language.desc': '好みの言語を選択してください',
        'settings.translate_events': 'イベントを翻訳',
        'settings.translate_events.desc': '名前を自動翻訳',
        
        'settings.notifications': '🔔 通知',
        'settings.notifications.push': 'プッシュ通知',
        'settings.notifications.desc': '新しいイベントのアラートを受け取る',
        
        'settings.privacy': '🔒 プライバシー',
        'settings.privacy.save': '検索を保存',
        'settings.privacy.save.desc': '最近の検索を記憶',
        'settings.privacy.clear': 'データを消去',
        
        'settings.about': 'ℹ️ について',
        'settings.about.app': 'EventosMadrid',
        'settings.about.version': 'v1.0.0',
        'settings.about.desc': 'マドリードの文化・レジャーイベント地図',
        
        'toast.theme_dark': '🌙 ダークモードが有効になりました',
        'toast.theme_light': '☀️ ライトモードが有効になりました',
        'toast.lang_changed': '🌐 言語が変更されました',
        'toast.translate_on': '🌍 翻訳が有効になりました',
        'toast.translate_off': '🌍 翻訳が無効になりました',
        'toast.notifications_on': '🔔 通知が有効になりました',
        'toast.notifications_off': '🔕 通知が無効になりました',
        'toast.searches_on': '💾 検索が保存されます',
        'toast.searches_off': '🗑️ 検索は保存されません',
        'toast.data_cleared': '🗑️ データを消去しました',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': 'イベントを読み込み中...',
        
        'lang.es': '🇪🇸 Español',
        'lang.en': '🇬🇧 English',
        'lang.fr': '🇫🇷 Français',
        'lang.pt': '🇵🇹 Português',
        'lang.de': '🇩🇪 Deutsch',
        'lang.it': '🇮🇹 Italiano',
        'lang.zh': '🇨🇳 中文',
        'lang.ja': '🇯🇵 日本語',
        'lang.ko': '🇰🇷 한국어',
    },

    // ===== COREANO (ko) =====
    ko: {
        'logo.text': 'EventosMadrid',
        'btn.map': '지도',
        'btn.list': '목록',
        'btn.calendar': '달력',
        'btn.places': '장소',
        'btn.stats': '통계',
        
        'filters.title': '🔍 필터',
        'filters.search.placeholder': '🔍 이벤트, 장소 검색...',
        
        'filters.events': '🎭 이벤트 필터',
        'filters.when': '시간',
        'filters.when.all': '전체',
        'filters.when.today': '오늘',
        'filters.when.weekend': '이번 주말',
        'filters.when.week': '다음 7일',
        'filters.when.month': '이번 달',
        
        'filters.type': '이벤트 유형',
        'filters.type.concerts': '🎵 콘서트',
        'filters.type.parties': '🎪 파티',
        'filters.type.markets': '🛍️ 마켓',
        'filters.type.cultural': '🎭 문화',
        'filters.type.gastro': '🍽️ 미식',
        'filters.type.sports': '⚽ 스포츠',
        'filters.type.kids': '👶 어린이',
        
        'filters.price': '가격',
        'filters.price.free': '💚 무료',
        'filters.price.paid': '💰 유료',
        'filters.price.max': '최대 가격',
        'filters.price.any': '모두',
        
        'filters.places': '🏛️ 장소 필터',
        'filters.places.all': '✓ 전체',
        'filters.places.categories': '카테고리',
        'filters.places.museums': '🏛️ 박물관',
        'filters.places.monuments': '🗿 기념물',
        'filters.places.theaters': '🎭 극장',
        'filters.places.halls': '🎵 공연장',
        'filters.places.parks': '🌳 공원',
        'filters.places.galleries': '🖼️ 갤러리',
        'filters.places.markets': '🛍️ 시장',
        
        'filters.zone': '📍 지역',
        'filters.zone.all': '📍 전체 지역',
        'filters.clear': '필터 지우기',
        
        'list.title': '📅 마드리드 이벤트',
        'list.subtitle': '모든 이벤트 표시',
        'list.sort': '정렬:',
        'list.sort.date': '📅 날짜',
        'list.sort.name': '🔤 이름',
        'list.sort.type': '🎭 유형',
        'list.sort.distance': '📍 거리',
        'list.places': '🏛️ 명소',
        
        'favorites.title': '❤️ 즐겨찾기',
        'favorites.empty': '즐겨찾기 없음',
        'favorites.empty.desc': '❤️ 를 눌러 이벤트 추가',
        'favorites.added': '❤️ 즐겨찾기에 추가됨',
        'favorites.removed': '💔 즐겨찾기에서 제거됨',
        
        'stats.title': '📊 통계',
        'stats.concerts': '콘서트',
        'stats.parties': '파티',
        'stats.markets': '마켓',
        'stats.cultural': '문화',
        'stats.gastro': '미식',
        'stats.sports': '스포츠',
        'stats.kids': '어린이',
        'stats.free': '무료',
        'stats.charts.events_by_type': '📊 유형별 이벤트',
        'stats.charts.events_by_zone': '🗺️ 지역별 이벤트',
        'stats.charts.events_timeline': '📅 이벤트 타임라인',
        
        'settings.title': '⚙️ 설정',
        'settings.appearance': '🎨 외관',
        'settings.theme': '다크 모드',
        'settings.theme.desc': '라이트 테마와 다크 테마 전환',
        'settings.contrast': '고대비',
        'settings.contrast.desc': '저시력자를 위한 가독성 개선',
        'settings.large_text': '큰 글씨',
        'settings.large_text.desc': '글꼴 크기 증가',
        'settings.reduce_motion': '애니메이션 감소',
        'settings.reduce_motion.desc': '움직임에 민감한 사용자용',
        
        'settings.language': '🌐 언어',
        'settings.language.select': '언어 선택',
        'settings.language.desc': '선호하는 언어를 선택하세요',
        'settings.translate_events': '이벤트 번역',
        'settings.translate_events.desc': '이름 자동 번역',
        
        'settings.notifications': '🔔 알림',
        'settings.notifications.push': '푸시 알림',
        'settings.notifications.desc': '새 이벤트 알림 받기',
        
        'settings.privacy': '🔒 개인정보',
        'settings.privacy.save': '검색 저장',
        'settings.privacy.save.desc': '최근 검색 기억',
        'settings.privacy.clear': '데이터 지우기',
        
        'settings.about': 'ℹ️ 정보',
        'settings.about.app': 'EventosMadrid',
        'settings.about.version': 'v1.0.0',
        'settings.about.desc': '마드리드 문화 및 레저 이벤트 지도',
        
        'toast.theme_dark': '🌙 다크 모드 활성화',
        'toast.theme_light': '☀️ 라이트 모드 활성화',
        'toast.lang_changed': '🌐 언어 변경됨',
        'toast.translate_on': '🌍 번역 활성화',
        'toast.translate_off': '🌍 번역 비활성화',
        'toast.notifications_on': '🔔 알림 활성화',
        'toast.notifications_off': '🔕 알림 비활성화',
        'toast.searches_on': '💾 검색이 저장됩니다',
        'toast.searches_off': '🗑️ 검색이 저장되지 않습니다',
        'toast.data_cleared': '🗑️ 데이터 삭제됨',
        
        'loader.title': 'EventosMadrid',
        'loader.subtitle': '이벤트 로딩 중...',
        
        'lang.es': '🇪🇸 Español',
        'lang.en': '🇬🇧 English',
        'lang.fr': '🇫🇷 Français',
        'lang.pt': '🇵🇹 Português',
        'lang.de': '🇩🇪 Deutsch',
        'lang.it': '🇮🇹 Italiano',
        'lang.zh': '🇨🇳 中文',
        'lang.ja': '🇯🇵 日本語',
        'lang.ko': '🇰🇷 한국어',
    },
};

// ===== GESTOR DE IDIOMAS MEJORADO =====
class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translateEvents = localStorage.getItem('translateEvents') === 'true';
        this.init();
    }

    detectLanguage() {
        const saved = localStorage.getItem('language');
        const availableLanguages = ['es', 'en', 'fr', 'pt', 'de', 'it', 'zh', 'ja', 'ko'];
        
        if (saved && availableLanguages.includes(saved)) {
            return saved;
        }

        const browserLang = navigator.language.split('-')[0];
        if (availableLanguages.includes(browserLang)) {
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
        const availableLanguages = ['es', 'en', 'fr', 'pt', 'de', 'it', 'zh', 'ja', 'ko'];
        if (availableLanguages.includes(lang)) {
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            this.updateUI();
        }
    }

    getLanguage() {
        return this.currentLang;
    }

    // ✅ Actualizar solo textos estáticos
    updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (el.children.length > 0) return;
            if (['OPTION', 'INPUT', 'BUTTON'].includes(el.tagName)) return;
            el.textContent = this.t(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        this.updateSelectOptions();
    }

    updateSelectOptions() {
        const selects = [
            { id: 'filtro-fecha', options: ['filters.when.all', 'filters.when.today', 'filters.when.weekend', 'filters.when.week', 'filters.when.month'] },
            { id: 'sort-by', options: ['list.sort.date', 'list.sort.name', 'list.sort.type', 'list.sort.distance'] },
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

        // Actualizar lang-select con banderas
        const langSelect = document.getElementById('lang-select');
        if (langSelect) {
            const currentValue = langSelect.value;
            const langs = ['es', 'en', 'fr', 'pt', 'de', 'it', 'zh', 'ja', 'ko'];
            Array.from(langSelect.options).forEach((option, index) => {
                if (langs[index]) {
                    option.textContent = this.t(`lang.${langs[index]}`);
                }
            });
            langSelect.value = currentValue;
        }

        const filtroZona = document.getElementById('filtro-zona');
        if (filtroZona?.options[0]) {
            const currentValue = filtroZona.value;
            filtroZona.options[0].textContent = this.t('filters.zone.all');
            filtroZona.value = currentValue;
        }
    }

    // ===== ✅ NUEVA FUNCIÓN: Traducir nombre de evento =====
    async translateEventName(nombre) {
        if (!this.translateEvents || this.currentLang === 'es') {
            return nombre;
        }

        // Cachear traducciones en localStorage
        const cacheKey = `tr_${this.currentLang}_${nombre}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) return cached;

        try {
            // ✅ Usar API de traducción gratuita (LibreTranslate público)
            const response = await fetch('https://libretranslate.de/translate', {
                method: 'POST',
                body: JSON.stringify({
                    q: nombre,
                    source: 'es',
                    target: this.currentLang,
                    format: 'text'
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                const translated = data.translatedText;
                localStorage.setItem(cacheKey, translated);
                return translated;
            }
        } catch (error) {
            console.warn('Error traduciendo:', error);
        }

        return nombre; // Fallback al original
    }
}

// Crear instancia global
const i18n = new I18n();

// Actualizar UI al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => i18n.updateUI(), 100);
    });
} else {
    setTimeout(() => i18n.updateUI(), 100);
}