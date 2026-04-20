

// ===== GESTOR DE IDIOMAS MEJORADO =====
class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translateEvents = localStorage.getItem('translateEvents') === 'true';
        this.translations = {};
        // initialization happens via loadLanguage
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

    t(key, vars = {}) {
        const translation = this.translations[this.currentLang]?.[key];
        if (key === 'months.april' || key === 'months.may') {
            console.log(`i18n.t DEBUG: key=${key}, currentLang=${this.currentLang}, translation=${translation}, fallback=${(this.translations['es'] || {})[key]}`);
        }
        let text = translation || 
                   (this.translations['es'] || {})[key] || 
                   key;

        // Reemplazar {variable} con valores
        Object.keys(vars).forEach(varKey => {
            text = text.replace(`{${varKey}}`, vars[varKey]);
        });

        return text;
    }


    async setLanguage(lang) {
        const availableLanguages = ['es', 'en', 'fr', 'pt', 'de', 'it', 'zh', 'ja', 'ko'];
        if (availableLanguages.includes(lang)) {
            await this.loadLanguage(lang);
        }
    }

    async loadLanguage(lang) {
        try {
            if (!this.translations[lang]) {
                const module = await import(`./locales/${lang}.js`);
                this.translations[lang] = module.default;
            }
            // Also ensure we have spanish as fallback
            if (lang !== 'es' && !this.translations['es']) {
                const esModule = await import(`./locales/es.js`);
                this.translations['es'] = esModule.default;
            }
            
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            this.updateUI();
            
            window.dispatchEvent(new Event('languageChanged'));
            
            if (typeof renderCalendar === 'function') {
                renderCalendar();
            }
        } catch(e) {
            console.error('Error loading lang', e);
        }
    }

    getLanguage() {
        return this.currentLang;
    }

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
        this.updateDynamicContent();
    }

    updateSelectOptions() {
        const selects = [
            { 
                id: 'filtro-fecha', 
                options: [
                    'filters.when.all', 
                    'filters.when.today', 
                    'filters.when.weekend', 
                    'filters.when.week', 
                    'filters.when.month'
                ] 
            },
            { 
                id: 'sort-by', 
                options: [
                    'list.sort.date', 
                    'list.sort.name', 
                    'list.sort.type', 
                    'list.sort.distance'
                ] 
            },
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

    updateDynamicContent() {
        const routeTitle = document.getElementById('route-title');
        if (routeTitle) {
            routeTitle.textContent = this.t('route.title');
        }

        const routeLabels = document.querySelectorAll('.route-stat-label');
        if (routeLabels.length >= 3) {
            routeLabels[0].textContent = this.t('route.events_selected');
            routeLabels[1].textContent = this.t('route.total_distance');
            routeLabels[2].textContent = this.t('route.estimated_time');
        }

        const optimizeBtn = document.getElementById('optimize-route');
        if (optimizeBtn) {
            const icon = optimizeBtn.querySelector('i');
            optimizeBtn.innerHTML = icon ? icon.outerHTML + ' ' + this.t('route.optimize') : this.t('route.optimize');
        }

        const exportBtn = document.getElementById('export-route');
        if (exportBtn) {
            const icon = exportBtn.querySelector('i');
            exportBtn.innerHTML = icon ? icon.outerHTML + ' ' + this.t('route.export') : this.t('route.export');
        }

        const clearRouteBtn = document.getElementById('clear-route');
        if (clearRouteBtn) {
            const icon = clearRouteBtn.querySelector('i');
            clearRouteBtn.innerHTML = icon ? icon.outerHTML + ' ' + this.t('route.clear') : this.t('route.clear');
        }

        const routeEmpty = document.getElementById('route-empty');
        if (routeEmpty) {
            routeEmpty.innerHTML = `
                <i class="fas fa-route"></i>
                <h3>${this.t('route.empty.title')}</h3>
                <p>${this.t('route.empty.desc')}</p>
            `;
        }

        const themeNames = document.querySelectorAll('.theme-name');
        const themeKeys = ['default', 'sunset', 'forest', 'ocean', 'berry'];
        themeNames.forEach((name, index) => {
            if (themeKeys[index]) {
                name.textContent = this.t(`themes.${themeKeys[index]}`);
            }
        });
    }

    async translateEventName(nombre) {
        if (!this.translateEvents || this.currentLang === 'es') {
            return nombre;
        }

        const cacheKey = `tr_${this.currentLang}_${nombre}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) return cached;

        try {
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

        return nombre;
    }
}

const i18n = new I18n();

const initI18n = async () => {
    await i18n.loadLanguage(i18n.currentLang);
    if (document.readyState === 'complete') {
        i18n.updateUI();
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => i18n.updateUI(), 100);
        });
    }
};

initI18n();
window.i18n = i18n;