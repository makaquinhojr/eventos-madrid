// ===== SISTEMA DE TRADUCCIONES I18N =====

const translations = {
    es: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Mapa',
        'btn.list': 'Lista',
        'btn.places': 'Lugares',
        'btn.stats': 'Stats',
    },
    
    en: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Map',
        'btn.list': 'List',
        'btn.places': 'Places',
        'btn.stats': 'Stats',
    },
    
    fr: {
        'logo.text': 'EventosMadrid',
        'btn.map': 'Carte',
        'btn.list': 'Liste',
        'btn.places': 'Lieux',
        'btn.stats': 'Stats',
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