/* ========================================
   STATS MODULE - EventosMadrid
   ======================================== */

import Chart from 'chart.js/auto';
import { AppState } from './store.js';
import { colors } from './constants.js';

let charts = {};

export function initCharts(events, t) {
    if (!events || events.length === 0) return;

    // Destruir charts previos
    Object.values(charts).forEach(chart => chart.destroy());
    charts = {};

    renderTiposChart(events, t);
    renderZonasChart(events, t);
    renderTimelineChart(events, t);
}

function renderTiposChart(events, t) {
    const ctx = document.getElementById('chart-tipos');
    if (!ctx) return;

    const stats = {};
    events.forEach(e => {
        stats[e.tipo] = (stats[e.tipo] || 0) + 1;
    });

    const labels = Object.keys(stats).map(tipo => t(`event.type.${tipo}`));
    const data = Object.values(stats);
    const backgroundColors = Object.keys(stats).map(tipo => colors[tipo] || '#6B7280');

    charts.tipos = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: backgroundColors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: getTextColor() } }
            }
        }
    });
}

function renderZonasChart(events, t) {
    const ctx = document.getElementById('chart-zonas');
    if (!ctx) return;

    const stats = {};
    events.forEach(e => {
        const zona = e.zona || 'Madrid';
        stats[zona] = (stats[zona] || 0) + 1;
    });

    const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 10);

    charts.zonas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(s => s[0]),
            datasets: [{
                label: t('stats.charts.events_by_zone'),
                data: sorted.map(s => s[1]),
                backgroundColor: getAccentColor(),
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: getTextColor() } },
                y: { ticks: { color: getTextColor() } }
            }
        }
    });
}

function renderTimelineChart(events, t) {
    const ctx = document.getElementById('chart-timeline');
    if (!ctx) return;

    const stats = {};
    events.forEach(e => {
        const date = e.fecha;
        stats[date] = (stats[date] || 0) + 1;
    });

    const sortedDates = Object.keys(stats).sort().slice(0, 15);

    charts.timeline = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedDates.map(d => formatDateShort(d)),
            datasets: [{
                label: t('stats.charts.events_timeline'),
                data: sortedDates.map(d => stats[d]),
                borderColor: getAccentColor(),
                backgroundColor: getAccentColor() + '22',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: getTextColor() } },
                y: { ticks: { color: getTextColor() } }
            }
        }
    });
}

function getTextColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--text-main').trim();
}

function getAccentColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
}

function formatDateShort(dateStr) {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
}
