import { AppState } from './store.js';

export function initThemeSystem(mostrarToast, initCharts) {
    const themeCards = document.querySelectorAll('.theme-card');
    const customColorToggle = document.getElementById('custom-color-toggle');
    const customColorSection = document.getElementById('custom-color-picker-section');
    const accentColorPicker = document.getElementById('accent-color-picker');

    if (!themeCards.length) return;

    const savedTheme = localStorage.getItem('themePreset') || 'default';
    const savedCustomColor = localStorage.getItem('customAccentColor');

    if (savedCustomColor) {
        if (customColorToggle) customColorToggle.checked = true;
        if (customColorSection) customColorSection.style.display = 'block';
        if (accentColorPicker) accentColorPicker.value = savedCustomColor;
        applyCustomColor(savedCustomColor);
    } else {
        applyThemePreset(savedTheme);
    }

    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            const preset = card.dataset.themePreset;
            
            if (customColorToggle && customColorToggle.checked) {
                customColorToggle.checked = false;
                if (customColorSection) customColorSection.style.display = 'none';
                localStorage.removeItem('customAccentColor');
            }

            themeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            applyThemePreset(preset);
            
            localStorage.setItem('themePreset', preset);
            mostrarToast(`✨ Tema "${card.querySelector('.theme-name').textContent}" activado`);
            
            const statsPanel = document.getElementById('stats-panel');
            if (statsPanel && statsPanel.classList.contains('active')) {
                setTimeout(() => initCharts(), 100);
            }
        });
    });

    if (customColorToggle) {
        customColorToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                if (customColorSection) customColorSection.style.display = 'block';
                themeCards.forEach(c => c.classList.remove('active'));
                if (accentColorPicker) applyCustomColor(accentColorPicker.value);
                mostrarToast('🎨 Color personalizado activado');
            } else {
                if (customColorSection) customColorSection.style.display = 'none';
                localStorage.removeItem('customAccentColor');
                applyThemePreset('default');
                const defaultCard = document.querySelector('[data-theme-preset="default"]');
                if (defaultCard) defaultCard.classList.add('active');
                mostrarToast('🎨 Tema por defecto restaurado');
            }
        });
    }

    if (accentColorPicker) {
        accentColorPicker.addEventListener('input', (e) => {
            applyCustomColor(e.target.value);
        });

        accentColorPicker.addEventListener('change', (e) => {
            localStorage.setItem('customAccentColor', e.target.value);
            mostrarToast('🎨 Color guardado');
        });
    }
}

export function applyThemePreset(preset) {
    AppState.currentThemePreset = preset;
    document.documentElement.setAttribute('data-theme-preset', preset);
    AppState.customAccentColor = null;
}

export function applyCustomColor(color) {
    AppState.customAccentColor = color;
    const root = document.documentElement;
    root.removeAttribute('data-theme-preset');
    
    const rgb = hexToRgb(color);
    const hoverColor = lightenColor(color, 20);
    
    root.style.setProperty('--accent', color);
    root.style.setProperty('--accent-hover', hoverColor);
    root.style.setProperty('--accent-subtle', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 10, g: 132, b: 255 };
}

function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
}
