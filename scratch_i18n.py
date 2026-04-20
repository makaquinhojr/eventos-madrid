with open('d:/aaauuraaa/eventos-madrid/js/i18n.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove the static import
text = text.replace("import { translations } from './locales/translations.js';", '')

# Add this.translations = {} to constructor and remove this.init() from it
text = text.replace('this.init();', 'this.translations = {};\n        // initialization happens via loadLanguage')

# Rewrite init method - we can just let it be, but t() needs this.translations
text = text.replace('translations[this.currentLang]', 'this.translations[this.currentLang]')
text = text.replace("translations['es']", "(this.translations['es'] || {})")

# Rewrite setLanguage to use loadLanguage
new_set_lang = '''
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
            
            if (typeof renderCalendar === 'function') {
                renderCalendar();
            }
        } catch(e) {
            console.error('Error loading lang', e);
        }
    }
'''

# Find setLanguage block
start_set = text.find('    setLanguage(lang)')
end_set = text.find('    getLanguage()')
text = text[:start_set] + new_set_lang + '\n' + text[end_set:]

# Fix initI18n at the bottom
init_block = '''const initI18n = async () => {
    await i18n.loadLanguage(i18n.currentLang);
    if (document.readyState === 'complete') {
        i18n.updateUI();
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => i18n.updateUI(), 100);
        });
    }
};'''
start_init = text.find('const initI18n = () => {')
end_init = text.find('initI18n();')
text = text[:start_init] + init_block + '\n\n' + text[end_init:]

with open('d:/aaauuraaa/eventos-madrid/js/i18n.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated i18n.js for dynamic imports')
