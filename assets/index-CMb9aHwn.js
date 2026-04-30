import { n as __toESM } from "./rolldown-runtime-DHFQXTcm.js";
import { i as require_leaflet_src, n as purify, r as require_leaflet_markercluster_src, t as auto_default } from "./vendor-CoTyeJNM.js";
import { t as i18n } from "./i18n-C_kteIG7.js";
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region js/modules/store.js
var import_leaflet_src = /* @__PURE__ */ __toESM(require_leaflet_src());
var AppState = {
	map: null,
	allEvents: [],
	allLugares: [],
	currentFilteredEvents: [],
	currentFilteredLugares: [],
	markersLayer: null,
	lugaresLayer: null,
	currentView: "map",
	currentSort: "date",
	currentDensity: "comfortable",
	userMarker: null,
	userLocation: null,
	distanceCircle: null,
	maxDistance: 20,
	mostrarLugares: true,
	mostrarLugaresEnLista: true,
	favorites: [],
	currentCalendarDate: /* @__PURE__ */ new Date(),
	charts: {},
	currentPage: 0,
	eventsPerPage: 50,
	isLoadingMore: false,
	scrollObserver: null,
	performanceMetrics: {
		loadStart: performance.now(),
		eventsLoaded: 0,
		renderTime: 0
	},
	currentThemePreset: "default",
	customAccentColor: null,
	heatmapLayer: null,
	heatmapData: [],
	heatmapRadius: 25,
	routePlannerMode: false,
	selectedRouteEvents: [],
	routePolyline: null,
	routeMarkers: [],
	getEventById(id) {
		return this.allEvents.find((e) => e.id === parseInt(id));
	},
	getLugarById(id) {
		return this.allLugares.find((l) => l.id === id);
	},
	isFavorite(id) {
		return this.favorites.includes(parseInt(id));
	}
};
//#endregion
//#region js/modules/theme.js
function initThemeSystem(mostrarToast, initCharts) {
	const themeCards = document.querySelectorAll(".theme-card");
	const customColorToggle = document.getElementById("custom-color-toggle");
	const customColorSection = document.getElementById("custom-color-picker-section");
	const accentColorPicker = document.getElementById("accent-color-picker");
	if (!themeCards.length) return;
	const savedTheme = localStorage.getItem("themePreset") || "default";
	const savedCustomColor = localStorage.getItem("customAccentColor");
	if (savedCustomColor) {
		if (customColorToggle) customColorToggle.checked = true;
		if (customColorSection) customColorSection.style.display = "block";
		if (accentColorPicker) accentColorPicker.value = savedCustomColor;
		applyCustomColor(savedCustomColor);
	} else applyThemePreset(savedTheme);
	themeCards.forEach((card) => {
		card.addEventListener("click", () => {
			const preset = card.dataset.themePreset;
			if (customColorToggle && customColorToggle.checked) {
				customColorToggle.checked = false;
				if (customColorSection) customColorSection.style.display = "none";
				localStorage.removeItem("customAccentColor");
			}
			themeCards.forEach((c) => c.classList.remove("active"));
			card.classList.add("active");
			applyThemePreset(preset);
			localStorage.setItem("themePreset", preset);
			mostrarToast(`✨ Tema "${card.querySelector(".theme-name").textContent}" activado`);
			const statsPanel = document.getElementById("stats-panel");
			if (statsPanel && statsPanel.classList.contains("active")) setTimeout(() => initCharts(), 100);
		});
	});
	if (customColorToggle) customColorToggle.addEventListener("change", (e) => {
		if (e.target.checked) {
			if (customColorSection) customColorSection.style.display = "block";
			themeCards.forEach((c) => c.classList.remove("active"));
			if (accentColorPicker) applyCustomColor(accentColorPicker.value);
			mostrarToast("🎨 Color personalizado activado");
		} else {
			if (customColorSection) customColorSection.style.display = "none";
			localStorage.removeItem("customAccentColor");
			applyThemePreset("default");
			const defaultCard = document.querySelector("[data-theme-preset=\"default\"]");
			if (defaultCard) defaultCard.classList.add("active");
			mostrarToast("🎨 Tema por defecto restaurado");
		}
	});
	if (accentColorPicker) {
		accentColorPicker.addEventListener("input", (e) => {
			applyCustomColor(e.target.value);
		});
		accentColorPicker.addEventListener("change", (e) => {
			localStorage.setItem("customAccentColor", e.target.value);
			mostrarToast("🎨 Color guardado");
		});
	}
}
function applyThemePreset(preset) {
	AppState.currentThemePreset = preset;
	document.documentElement.setAttribute("data-theme-preset", preset);
	AppState.customAccentColor = null;
}
function applyCustomColor(color) {
	AppState.customAccentColor = color;
	const root = document.documentElement;
	root.removeAttribute("data-theme-preset");
	const rgb = hexToRgb(color);
	const hoverColor = lightenColor(color, 20);
	root.style.setProperty("--accent", color);
	root.style.setProperty("--accent-hover", hoverColor);
	root.style.setProperty("--accent-subtle", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
}
function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : {
		r: 10,
		g: 132,
		b: 255
	};
}
function lightenColor(hex, percent) {
	const num = parseInt(hex.replace("#", ""), 16);
	const amt = Math.round(2.55 * percent);
	const R = (num >> 16) + amt;
	const G = (num >> 8 & 255) + amt;
	const B = (num & 255) + amt;
	return "#" + (16777216 + (R < 255 ? R < 1 ? 0 : R : 255) * 65536 + (G < 255 ? G < 1 ? 0 : G : 255) * 256 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}
//#endregion
//#region js/modules/heatmap.js
function initHeatmapMode(mostrarToast) {
	const heatmapToggle = document.getElementById("heatmap-toggle");
	const heatmapControls = document.getElementById("heatmap-controls");
	const heatmapRadiusSlider = document.getElementById("heatmap-radius");
	if (!heatmapToggle) return;
	heatmapToggle.addEventListener("change", (e) => {
		if (e.target.checked) {
			if (heatmapControls) heatmapControls.style.display = "block";
			activateHeatmap(mostrarToast);
			mostrarToast("🌈 Mapa de calor activado");
		} else {
			if (heatmapControls) heatmapControls.style.display = "none";
			deactivateHeatmap();
			mostrarToast("🌈 Mapa de calor desactivado");
		}
	});
	if (heatmapRadiusSlider) heatmapRadiusSlider.addEventListener("input", (e) => {
		AppState.heatmapRadius = parseInt(e.target.value);
		if (AppState.heatmapLayer) updateHeatmap(mostrarToast);
	});
}
function activateHeatmap(mostrarToast) {
	if (!AppState.map) return;
	const eventos = AppState.currentFilteredEvents.length > 0 ? AppState.currentFilteredEvents : AppState.allEvents;
	if (eventos.length === 0) {
		mostrarToast("⚠️ No hay eventos para mostrar", "error");
		const toggle = document.getElementById("heatmap-toggle");
		if (toggle) toggle.checked = false;
		return;
	}
	if (!AppState.heatmapLayer) AppState.heatmapLayer = import_leaflet_src.default.layerGroup().addTo(AppState.map);
	const coordMap = {};
	eventos.forEach((evento) => {
		const key = `${evento.lat.toFixed(3)},${evento.lng.toFixed(3)}`;
		coordMap[key] = coordMap[key] || {
			lat: evento.lat,
			lng: evento.lng,
			count: 0
		};
		coordMap[key].count++;
	});
	const maxCount = Math.max(...Object.values(coordMap).map((p) => p.count));
	Object.values(coordMap).forEach((point) => {
		const intensity = point.count / maxCount;
		const radius = AppState.heatmapRadius * 30 * (.5 + intensity);
		import_leaflet_src.default.circle([point.lat, point.lng], {
			radius,
			fillColor: getHeatColor(intensity),
			fillOpacity: .3 + intensity * .3,
			stroke: false,
			interactive: false,
			className: "heatmap-circle"
		}).addTo(AppState.heatmapLayer);
	});
	showHeatmapLegend();
}
function updateHeatmap(mostrarToast) {
	deactivateHeatmap();
	activateHeatmap(mostrarToast);
}
function getHeatColor(intensity) {
	if (intensity < .25) return "#3498DB";
	if (intensity < .5) return "#2ECC71";
	if (intensity < .75) return "#F39C12";
	return "#E74C3C";
}
function deactivateHeatmap() {
	if (AppState.heatmapLayer) {
		AppState.map.removeLayer(AppState.heatmapLayer);
		AppState.heatmapLayer = null;
	}
	hideHeatmapLegend();
}
function showHeatmapLegend() {
	let legend = document.querySelector(".heatmap-legend");
	if (!legend) {
		legend = document.createElement("div");
		legend.className = "heatmap-legend";
		legend.innerHTML = `
            <div class="heatmap-legend-title">Densidad de eventos</div>
            <div class="heatmap-gradient"></div>
            <div class="heatmap-labels">
                <span>Baja</span>
                <span>Alta</span>
            </div>
        `;
		document.body.appendChild(legend);
	}
	legend.classList.add("active");
}
function hideHeatmapLegend() {
	const legend = document.querySelector(".heatmap-legend");
	if (legend) legend.classList.remove("active");
}
//#endregion
//#region js/modules/routes.js
function initRoutePlanner(mostrarToast, i18n, trapFocus, displayEvents, formatDate, calcularDistancia, formatearDistancia) {
	const routePlannerBtn = document.getElementById("route-planner-btn");
	const routePanel = document.getElementById("route-panel");
	const closeRoute = document.getElementById("close-route");
	const optimizeRouteBtn = document.getElementById("optimize-route");
	const exportRouteBtn = document.getElementById("export-route");
	const clearRouteBtn = document.getElementById("clear-route");
	if (!routePlannerBtn) return;
	routePlannerBtn.addEventListener("click", () => {
		AppState.routePlannerMode = !AppState.routePlannerMode;
		if (AppState.routePlannerMode) {
			routePlannerBtn.classList.add("active");
			document.body.classList.add("route-mode");
			if (routePanel) {
				routePanel.classList.add("active");
				routePanel.setAttribute("aria-modal", "true");
				trapFocus(routePanel);
			}
			enableRouteSelection();
			mostrarToast(i18n.t("route.mode.enabled"), "success");
		} else {
			routePlannerBtn.classList.remove("active");
			document.body.classList.remove("route-mode");
			disableRouteSelection(displayEvents);
			mostrarToast(i18n.t("route.mode.disabled"));
		}
	});
	if (closeRoute) closeRoute.addEventListener("click", () => {
		AppState.routePlannerMode = false;
		routePlannerBtn.classList.remove("active");
		document.body.classList.remove("route-mode");
		disableRouteSelection(displayEvents);
		if (routePanel) {
			routePanel.classList.remove("active");
			routePanel.setAttribute("aria-modal", "false");
		}
	});
	if (optimizeRouteBtn) optimizeRouteBtn.addEventListener("click", () => optimizeRoute(mostrarToast, i18n, calcularDistancia, formatearDistancia, formatDate));
	if (exportRouteBtn) exportRouteBtn.addEventListener("click", () => exportRoute(i18n, formatDate));
	if (clearRouteBtn) clearRouteBtn.addEventListener("click", () => clearRoute(mostrarToast, i18n));
	window.removeEventFromRoute = (id) => removeEventFromRoute(id, mostrarToast, i18n, formatDate, calcularDistancia, formatearDistancia);
	window.compartirEventoNativo = window.compartirEventoNativo;
}
function enableRouteSelection() {
	AppState.markersLayer.eachLayer((marker) => {
		marker.off("click");
		marker.on("click", (e) => {
			import_leaflet_src.default.DomEvent.stopPropagation(e);
			addEventToRoute(marker.eventoId);
		});
	});
}
function disableRouteSelection(displayEvents) {
	displayEvents(AppState.currentFilteredEvents.length ? AppState.currentFilteredEvents : AppState.allEvents);
}
function addEventToRoute(eventoId, mostrarToast, i18n, formatDate, calcularDistancia, formatearDistancia) {
	const evento = AppState.allEvents.find((e) => e.id === eventoId);
	if (!evento) return;
	if (AppState.selectedRouteEvents.find((e) => e.id === eventoId)) {
		mostrarToast(i18n.t("route.already_added"), "error");
		return;
	}
	AppState.selectedRouteEvents.push(evento);
	updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia);
	updateRouteOnMap(i18n, formatDate);
	mostrarToast(`✅ "${evento.nombre.substring(0, 30)}..." ${i18n.t("route.added").replace("✅ ", "")}`);
	if ("vibrate" in navigator) navigator.vibrate(50);
}
function removeEventFromRoute(eventoId, mostrarToast, i18n, formatDate, calcularDistancia, formatearDistancia) {
	AppState.selectedRouteEvents = AppState.selectedRouteEvents.filter((e) => e.id !== eventoId);
	updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia);
	updateRouteOnMap(i18n, formatDate);
	mostrarToast(i18n.t("route.removed"));
}
function updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia) {
	const routeEventsList = document.getElementById("route-events-list");
	const routeEmpty = document.getElementById("route-empty");
	const routeEventsCount = document.getElementById("route-events-count");
	const routeCount = document.getElementById("route-count");
	const optimizeBtn = document.getElementById("optimize-route");
	const exportBtn = document.getElementById("export-route");
	if (!routeEventsList) return;
	const count = AppState.selectedRouteEvents.length;
	if (routeEventsCount) routeEventsCount.textContent = count;
	if (routeCount) if (count > 0) {
		routeCount.textContent = count;
		routeCount.style.display = "flex";
	} else routeCount.style.display = "none";
	if (count === 0) {
		routeEventsList.innerHTML = "";
		if (routeEmpty) routeEmpty.style.display = "block";
		if (optimizeBtn) optimizeBtn.disabled = true;
		if (exportBtn) exportBtn.disabled = true;
		return;
	}
	if (routeEmpty) routeEmpty.style.display = "none";
	if (optimizeBtn) optimizeBtn.disabled = count < 2;
	if (exportBtn) exportBtn.disabled = false;
	let totalDistance = 0;
	let totalTime = 0;
	routeEventsList.innerHTML = AppState.selectedRouteEvents.map((evento, index) => {
		let distanceText = "-";
		if (index > 0) {
			const prevEvento = AppState.selectedRouteEvents[index - 1];
			const distance = calcularDistancia(prevEvento.lat, prevEvento.lng, evento.lat, evento.lng);
			totalDistance += distance;
			const timeMinutes = Math.round(distance * 30 + 15);
			totalTime += timeMinutes;
			distanceText = formatearDistancia(distance);
		}
		return `
            <div class="route-event-item" style="animation-delay: ${index * .05}s;">
                <div class="route-event-number">${index + 1}</div>
                <div class="route-event-info">
                    <div class="route-event-name">${evento.nombre}</div>
                    <div class="route-event-time">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(evento.fecha)}
                    </div>
                </div>
                <div class="route-event-distance">${distanceText}</div>
                <button class="route-event-remove" 
                        onclick="removeEventFromRoute(${evento.id})"
                        aria-label="${i18n.t("route.removed")}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
	}).join("");
	const totalDistanceEl = document.getElementById("route-total-distance");
	const totalTimeEl = document.getElementById("route-total-time");
	if (totalDistanceEl) totalDistanceEl.textContent = totalDistance > 0 ? formatearDistancia(totalDistance) : "0 km";
	if (totalTimeEl) totalTimeEl.textContent = totalTime > 0 ? `${totalTime} min` : "0 min";
}
function updateRouteOnMap(i18n, formatDate) {
	AppState.routeMarkers.forEach((marker) => AppState.map.removeLayer(marker));
	AppState.routeMarkers = [];
	if (AppState.routePolyline) {
		AppState.map.removeLayer(AppState.routePolyline);
		AppState.routePolyline = null;
	}
	if (AppState.selectedRouteEvents.length === 0) return;
	AppState.selectedRouteEvents.forEach((evento, index) => {
		const icon = import_leaflet_src.default.divIcon({
			html: `<div class="route-marker">${index + 1}</div>`,
			className: "",
			iconSize: [36, 36],
			iconAnchor: [18, 18]
		});
		const marker = import_leaflet_src.default.marker([evento.lat, evento.lng], { icon }).addTo(AppState.map).bindPopup(`
                <div class="popup-evento">
                    <h3>🗺️ ${i18n.t("route.stop")} ${index + 1}</h3>
                    <p><strong>📍</strong> ${evento.nombre}</p>
                    <p><strong>📅</strong> ${formatDate(evento.fecha)}</p>
                    <div class="popup-actions" style="margin-top: 12px; border-top: 0.5px solid var(--separator); padding-top: 8px;">
                        <button class="popup-btn-extra compartir" onclick="compartirEventoNativo(${evento.id})" style="width: 100%; justify-content: center;">
                            <i class="fas fa-share-alt"></i> ${i18n.t("event.share")}
                        </button>
                    </div>
                </div>
            `);
		AppState.routeMarkers.push(marker);
	});
	if (AppState.selectedRouteEvents.length >= 2) {
		const latlngs = AppState.selectedRouteEvents.map((e) => [e.lat, e.lng]);
		AppState.routePolyline = import_leaflet_src.default.polyline(latlngs, {
			color: getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(),
			weight: 4,
			opacity: .8,
			dashArray: "10, 5",
			className: "route-line"
		}).addTo(AppState.map);
		AppState.map.fitBounds(AppState.routePolyline.getBounds(), { padding: [50, 50] });
	}
}
function optimizeRoute(mostrarToast, i18n, calcularDistancia, formatearDistancia, formatDate) {
	if (AppState.selectedRouteEvents.length < 2) return;
	const optimized = [AppState.selectedRouteEvents[0]];
	const remaining = AppState.selectedRouteEvents.slice(1);
	while (remaining.length > 0) {
		const current = optimized[optimized.length - 1];
		let nearestIndex = 0;
		let minDistance = Infinity;
		remaining.forEach((evento, index) => {
			const distance = calcularDistancia(current.lat, current.lng, evento.lat, evento.lng);
			if (distance < minDistance) {
				minDistance = distance;
				nearestIndex = index;
			}
		});
		optimized.push(remaining[nearestIndex]);
		remaining.splice(nearestIndex, 1);
	}
	AppState.selectedRouteEvents = optimized;
	updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia);
	updateRouteOnMap(i18n, formatDate);
	mostrarToast(i18n.t("route.optimized"), "success");
}
function exportRoute(i18n, formatDate) {
	if (AppState.selectedRouteEvents.length === 0) return;
	const routeText = AppState.selectedRouteEvents.map((evento, index) => `${index + 1}. ${evento.nombre}\n   📅 ${formatDate(evento.fecha)}\n   📍 ${evento.lugar}\n`).join("\n");
	showExportModal(`🗺️ ${i18n.t("route.title").replace("🗺️ ", "").toUpperCase()} - EVENTOSMADRID\n\n${routeText}\n🌐 ${window.location.href}`, i18n);
}
function showExportModal(text, i18n) {
	const modal = document.createElement("div");
	modal.className = "route-export-modal";
	modal.innerHTML = `
        <div class="route-export-content">
            <div class="route-export-header">
                <h3>${i18n.t("route.export_title")}</h3>
                <button class="close-panel" onclick="this.closest('.route-export-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="route-export-options">
                <button class="route-export-btn" onclick="shareViaWhatsApp('${encodeURIComponent(text)}')">
                    <i class="fab fa-whatsapp"></i>
                    <span>${i18n.t("route.export.whatsapp")}</span>
                </button>
                <button class="route-export-btn" onclick="copyRouteText(\`${text.replace(/`/g, "\\`")}\`)">
                    <i class="fas fa-copy"></i>
                    <span>${i18n.t("route.export.copy")}</span>
                </button>
                <button class="route-export-btn" onclick="downloadRouteJSON()">
                    <i class="fas fa-download"></i>
                    <span>${i18n.t("route.export.download")}</span>
                </button>
            </div>
        </div>
    `;
	modal.addEventListener("click", (e) => {
		if (e.target === modal) modal.remove();
	});
	document.body.appendChild(modal);
	requestAnimationFrame(() => modal.classList.add("visible"));
	window.shareViaWhatsApp = shareViaWhatsApp;
	window.copyRouteText = (t) => copyRouteText(t, i18n);
	window.downloadRouteJSON = () => downloadRouteJSON(i18n);
}
function shareViaWhatsApp(text) {
	window.open(`https://wa.me/?text=${text}`, "_blank");
	document.querySelector(".route-export-modal")?.remove();
}
async function copyRouteText(text, i18n) {
	try {
		await navigator.clipboard.writeText(text);
		mostrarToast(i18n.t("route.export.copied"), "success");
		document.querySelector(".route-export-modal")?.remove();
	} catch {
		mostrarToast(i18n.t("route.copy_error"), "error");
	}
}
function downloadRouteJSON(i18n) {
	const routeData = {
		eventos: AppState.selectedRouteEvents,
		fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
		total_eventos: AppState.selectedRouteEvents.length
	};
	const blob = new Blob([JSON.stringify(routeData, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `ruta-eventos-${Date.now()}.json`;
	a.click();
	URL.revokeObjectURL(url);
	mostrarToast(i18n.t("route.export.downloaded"), "success");
	document.querySelector(".route-export-modal")?.remove();
}
function clearRoute(mostrarToast, i18n) {
	if (confirm(i18n.t("route.clear.confirm"))) {
		AppState.selectedRouteEvents = [];
		updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia);
		updateRouteOnMap(i18n, formatDate);
		mostrarToast(i18n.t("route.cleared"));
	}
}
//#endregion
//#region js/modules/constants.js
var icons = {
	concierto: "🎵",
	fiesta: "🎪",
	mercado: "🛍️",
	cultural: "🎭",
	gastronomia: "🍽️",
	deporte: "⚽",
	infantil: "👶"
};
var colors = {
	concierto: "#7C3AED",
	fiesta: "#DC2626",
	mercado: "#059669",
	cultural: "#2563EB",
	gastronomia: "#D97706",
	deporte: "#16A34A",
	infantil: "#F59E0B"
};
var lugaresIcons = {
	museo: "🏛️",
	monumento: "🗿",
	teatro: "🎭",
	sala: "🎵",
	parque: "🌳",
	galeria: "🖼️",
	mercado: "🛍️"
};
var lugaresColors = {
	museo: "#0891B2",
	monumento: "#7C3AED",
	teatro: "#BE185D",
	sala: "#9333EA",
	parque: "#16A34A",
	galeria: "#EA580C",
	mercado: "#CA8A04"
};
//#endregion
//#region js/modules/ui-helpers.js
function formatDate$1(fechaStr) {
	if (!fechaStr) return "";
	try {
		const fecha = /* @__PURE__ */ new Date(fechaStr + "T00:00:00");
		if (isNaN(fecha.getTime())) return fechaStr;
		return new Intl.DateTimeFormat(document.documentElement.lang || "es", {
			day: "numeric",
			month: "long",
			year: "numeric"
		}).format(fecha);
	} catch (e) {
		return fechaStr;
	}
}
function formatearFechaSafe(inicio, fin) {
	const fInicio = formatDate$1(inicio);
	const fFin = fin && fin !== inicio ? formatDate$1(fin) : null;
	return fFin ? `${fInicio} - ${fFin}` : fInicio;
}
function limpiarDescripcion(texto, maxLen = 150) {
	if (!texto) return "";
	const limpio = texto.replace(/<[^>]*>?/gm, "").trim();
	if (limpio.length <= maxLen) return limpio;
	return limpio.substring(0, maxLen) + "...";
}
function calcularDistancia$1(lat1, lon1, lat2, lon2) {
	const R = 6371;
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLon = (lon2 - lon1) * Math.PI / 180;
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
function trapFocus(element) {
	if (!element) return;
	const focusableElements = element.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
	if (!focusableElements.length) return;
	const first = focusableElements[0];
	const last = focusableElements[focusableElements.length - 1];
	const handler = function(e) {
		if (e.key !== "Tab") return;
		if (e.shiftKey) {
			if (document.activeElement === first) {
				last.focus();
				e.preventDefault();
			}
		} else if (document.activeElement === last) {
			first.focus();
			e.preventDefault();
		}
	};
	element.removeEventListener("keydown", element._focusHandler);
	element._focusHandler = handler;
	element.addEventListener("keydown", handler);
	first.focus();
}
function getLinkHTML(evento, t) {
	const esLinkUtil = (url) => {
		if (!url || typeof url !== "string" || url.trim() === "") return false;
		if (!url.startsWith("http")) return false;
		return url.length > 50 || url.includes("evento") || url.includes("agenda");
	};
	if (esLinkUtil(evento.url)) return `<a href="${evento.url}" target="_blank" class="popup-link">${t("event.more_info")} →</a>`;
	return `<a href="https://www.google.com/search?q=${encodeURIComponent(`${evento.nombre} Madrid`)}" target="_blank" class="popup-link popup-link-google">🔍 ${t("event.search_google")}</a>`;
}
function formatearDistancia$1(km) {
	return km < 1 ? `${Math.round(km * 1e3)} m` : `${km.toFixed(1)} km`;
}
function getDistanciaHTMLCoords(lat, lng, userLocation) {
	if (!userLocation) return "";
	const distancia = calcularDistancia$1(userLocation.lat, userLocation.lng, lat, lng);
	const texto = formatearDistancia$1(distancia);
	return `<span class="distancia-badge" style="color:${distancia < 1 ? "#30D158" : distancia < 5 ? "#FF9F0A" : "#FF453A"}">
        <i class="fas fa-walking"></i> ${texto}
    </span>`;
}
var currentUndoCallback = null;
function mostrarToastConUndo(mensaje, undoCallback, tipo = "normal") {
	document.querySelector(".geo-toast")?.remove();
	const toast = document.createElement("div");
	toast.className = `geo-toast ${tipo === "error" ? "error" : tipo === "success" ? "success" : ""}`;
	if (undoCallback) {
		toast.innerHTML = `
            <span>${mensaje}</span>
            <button id="toast-undo-btn" style="background:none;border:none;color:inherit;font-weight:700;margin-left:12px;cursor:pointer;text-decoration:underline;">
                DESHACER
            </button>
        `;
		currentUndoCallback = undoCallback;
	} else toast.textContent = mensaje;
	document.body.appendChild(toast);
	if (undoCallback) {
		const undoBtn = document.getElementById("toast-undo-btn");
		if (undoBtn) undoBtn.onclick = () => {
			currentUndoCallback();
			toast.remove();
			currentUndoCallback = null;
		};
	}
	setTimeout(() => toast.classList.add("visible"), 10);
	setTimeout(() => {
		toast.classList.remove("visible");
		setTimeout(() => {
			toast.remove();
			if (currentUndoCallback === undoCallback) currentUndoCallback = null;
		}, 300);
	}, 5e3);
}
function mostrarToast$1(mensaje, tipo = "normal") {
	mostrarToastConUndo(mensaje, null, tipo);
}
require_leaflet_markercluster_src();
function initMap() {
	const map = import_leaflet_src.default.map("map", { zoomControl: false }).setView([40.4168, -3.7038], 12);
	import_leaflet_src.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors" }).addTo(map);
	import_leaflet_src.default.control.zoom({ position: "bottomright" }).addTo(map);
	AppState.map = map;
	AppState.markersLayer = import_leaflet_src.default.markerClusterGroup({
		chunkedLoading: true,
		maxClusterRadius: 60,
		spiderfyOnMaxZoom: true,
		showCoverageOnHover: false,
		animate: true
	}).addTo(map);
	AppState.lugaresLayer = import_leaflet_src.default.layerGroup().addTo(map);
	return map;
}
function createEventMarker(event, t, callbacks) {
	const color = colors[event.tipo] || "#6B7280";
	const emoji = icons[event.tipo] || "📍";
	const icon = import_leaflet_src.default.divIcon({
		html: `
            <div class="custom-marker" style="background: ${color};">
                ${emoji}
            </div>
        `,
		className: "",
		iconSize: [40, 40],
		iconAnchor: [20, 20],
		popupAnchor: [0, -20]
	});
	const marker = import_leaflet_src.default.marker([event.lat, event.lng], { icon });
	marker.eventoId = event.id;
	const popupContent = createPopupContent(event, t);
	marker.bindPopup(popupContent, { maxWidth: 280 });
	return marker;
}
function createPopupContent(event, t) {
	const dateText = formatearFechaSafe(event.fecha, event.fecha_fin);
	limpiarDescripcion(event.descripcion, 120);
	const linkHTML = getLinkHTML(event, t);
	return `
        <div class="popup-evento">
            <h3>${event.nombre}</h3>
            <p><strong>📅</strong> ${dateText}</p>
            <p><strong>📍</strong> ${event.lugar}</p>
            <div class="popup-actions">
                ${linkHTML}
            </div>
            <div class="popup-acciones-extra">
                <button class="popup-btn-extra" onclick="window.comoLlegar(${event.id})">
                    <i class="fas fa-route"></i> ${t("event.how_to_get")}
                </button>
                <button class="popup-btn-extra compartir" onclick="window.compartirEvento(${event.id})">
                    <i class="fas fa-share-alt"></i> ${t("event.share")}
                </button>
            </div>
        </div>
    `;
}
function createLugarMarker(lugar) {
	const color = lugaresColors[lugar.categoria] || "#6B7280";
	const emoji = lugaresIcons[lugar.categoria] || "📍";
	const icon = import_leaflet_src.default.divIcon({
		html: `<div class="lugar-marker" style="background:${color};">${emoji}</div>`,
		className: "",
		iconSize: [36, 36],
		iconAnchor: [18, 18]
	});
	const marker = import_leaflet_src.default.marker([lugar.lat, lugar.lng], { icon });
	marker.lugarId = lugar.id;
	marker.bindPopup(`
        <div class="popup-lugar">
            <h3>${lugar.nombre}</h3>
            <p>📍 ${lugar.lugar}</p>
            <button class="popup-btn-extra" onclick="window.compartirLugar('${lugar.id}')">
                <i class="fas fa-share-alt"></i> Compartir
            </button>
        </div>
    `);
	return marker;
}
//#endregion
//#region js/modules/favorites.js
function loadFavorites() {
	const saved = localStorage.getItem("favorites");
	AppState.favorites = saved ? JSON.parse(saved) : [];
	updateFavoritesCount();
}
function saveFavorites() {
	localStorage.setItem("favorites", JSON.stringify(AppState.favorites));
	updateFavoritesCount();
}
function toggleFavorite(eventoId, t, mostrarToast, renderFavoritesList) {
	const index = AppState.favorites.indexOf(eventoId);
	const wasAdded = index === -1;
	if (index > -1) AppState.favorites.splice(index, 1);
	else {
		AppState.favorites.push(eventoId);
		if ("vibrate" in navigator) navigator.vibrate(50);
	}
	saveFavorites();
	if (renderFavoritesList) renderFavoritesList();
	document.querySelectorAll(`[data-event-id="${eventoId}"]`).forEach((btn) => {
		btn.classList.toggle("active", AppState.favorites.includes(eventoId));
	});
	if (mostrarToast) mostrarToast(wasAdded ? t("favorites.added") : t("favorites.removed"), "success");
}
function updateFavoritesCount() {
	const count = AppState.favorites.length;
	const badge = document.getElementById("favorites-count");
	const bottomBadge = document.getElementById("bottom-favorites-badge");
	const favActions = document.getElementById("favorites-actions");
	if (count > 0) {
		if (badge) {
			badge.textContent = count;
			badge.style.display = "flex";
		}
		if (bottomBadge) {
			bottomBadge.textContent = count;
			bottomBadge.style.display = "flex";
		}
		if (favActions) favActions.style.display = "block";
	} else {
		if (badge) badge.style.display = "none";
		if (bottomBadge) bottomBadge.style.display = "none";
		if (favActions) favActions.style.display = "none";
	}
}
function renderFavoritesList(allEvents, t, verEnMapaCallback, comoLlegarCallback, compartirCallback) {
	const container = document.getElementById("favorites-list");
	const emptyState = document.getElementById("favorites-empty");
	if (!container || !emptyState) return;
	if (AppState.favorites.length === 0) {
		container.innerHTML = "";
		emptyState.style.display = "block";
		return;
	}
	emptyState.style.display = "none";
	container.innerHTML = allEvents.filter((e) => AppState.favorites.includes(e.id)).map((evento) => {
		const emoji = icons[evento.tipo] || "📍";
		const color = colors[evento.tipo] || "#6B7280";
		const fecha = formatDate$1(evento.fecha);
		const safeNombre = purify.sanitize(evento.nombre);
		const safeLugar = purify.sanitize(evento.lugar);
		return `
            <div class="favorite-item" style="animation: fadeUp 0.3s ease-out;">
                <div class="favorite-item-main" data-id="${evento.id}" role="button" tabindex="0" aria-label="${safeNombre}">
                    <div class="favorite-item-icon ${evento.tipo}" style="background:linear-gradient(135deg, ${color}dd 0%, ${color} 100%);">
                        ${emoji}
                    </div>
                    <div class="favorite-item-info">
                        <div class="favorite-item-title">${safeNombre}</div>
                        <div class="favorite-item-meta">
                            <span>📅 ${fecha}</span>
                            <span>📍 ${safeLugar}</span>
                        </div>
                    </div>
                </div>
                <div class="favorite-item-actions">
                    <button class="fav-action-btn fav-action-map" data-action="map" data-id="${evento.id}" title="${t("event.view_map")}">
                        <i class="fas fa-map-marked-alt"></i>
                    </button>
                    <button class="fav-action-btn fav-action-route" data-action="route" data-id="${evento.id}" title="${t("event.how_to_get")}">
                        <i class="fas fa-route"></i>
                    </button>
                    <button class="fav-action-btn fav-action-share" data-action="share" data-id="${evento.id}" title="${t("event.share")}">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <button class="fav-action-btn fav-action-remove" data-action="remove" data-id="${evento.id}" aria-label="${t("favorites.removed")}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
	}).join("");
	container.querySelectorAll(".favorite-item-main, .fav-action-btn").forEach((btn) => {
		btn.onclick = (e) => {
			const id = parseInt(btn.dataset.id);
			const action = btn.dataset.action || "view";
			if (action === "view" || action === "map") verEnMapaCallback(id);
			if (action === "route") comoLlegarCallback(id);
			if (action === "share") compartirCallback(id);
			if (action === "remove") toggleFavorite(id, t, null, () => renderFavoritesList(allEvents, t, verEnMapaCallback, comoLlegarCallback, compartirCallback));
		};
	});
}
//#endregion
//#region js/modules/sharing.js
async function compartirEventoNativo(evento, t, mostrarToast) {
	if (!evento) return;
	const url = generarUrlCompartir(evento);
	const texto = generarTextoCompartir(evento, t);
	if (navigator.share) try {
		await navigator.share({
			title: evento.nombre,
			text: texto,
			url
		});
		mostrarToast("✅ " + t("event.link_copied"));
	} catch (err) {
		if (err.name !== "AbortError") mostrarModalCompartir(evento, t, "event");
	}
	else mostrarModalCompartir(evento, t, "event");
}
function generarUrlCompartir(item, type = "evento") {
	return `${window.location.origin + window.location.pathname}?${type}=${item.id}`;
}
function generarTextoCompartir(evento, t) {
	const fecha = formatDate$1(evento.fecha);
	const precio = evento.precio === "gratis" ? t("badge.free") : evento.precio_desde || t("badge.paid");
	return `${icons[evento.tipo] || "📍"} *${evento.nombre}*\n📅 ${fecha}\n📍 ${evento.lugar}\n💰 ${precio}`;
}
function mostrarModalCompartir(item, t, type = "event") {
	const isEvent = type === "event";
	const emoji = isEvent ? icons[item.tipo] || "📍" : lugaresIcons[item.categoria] || "📍";
	const titleKey = isEvent ? "share.title_event" : "share.title_place";
	const url = generarUrlCompartir(item, isEvent ? "evento" : "lugar");
	const texto = isEvent ? generarTextoCompartir(item, t) : `${emoji} *${item.nombre}*\n📍 ${item.lugar}`;
	document.getElementById("modal-compartir")?.remove();
	const modal = document.createElement("div");
	modal.id = "modal-compartir";
	modal.className = "modal-compartir-overlay";
	const safeNombre = purify.sanitize(item.nombre);
	url.replace(/"/g, "&quot;");
	modal.innerHTML = `
        <div class="modal-compartir">
            <div class="modal-compartir-header">
                <span>${emoji} ${t(titleKey)}</span>
                <button class="modal-compartir-close" id="close-share-modal" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-compartir-nombre">${safeNombre}</div>
            <div class="modal-compartir-acciones">
                <a class="modal-compartir-btn whatsapp"
                   href="https://wa.me/?text=${encodeURIComponent(texto + "\n\n🗺️ Ver en EventosMadrid: " + url)}"
                   target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    <span>${t("event.share_whatsapp")}</span>
                </a>
                <a class="modal-compartir-btn twitter"
                   href="https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}"
                   target="_blank">
                    <i class="fab fa-x-twitter"></i>
                    <span>${t("event.share_twitter")}</span>
                </a>
                <button class="modal-compartir-btn copiar" id="copy-link-btn">
                    <i class="fas fa-link"></i>
                    <span>${t("event.copy_link")}</span>
                </button>
            </div>
        </div>
    `;
	modal.addEventListener("click", (e) => {
		if (e.target === modal) cerrarModalCompartir();
	});
	document.body.appendChild(modal);
	document.getElementById("close-share-modal").onclick = cerrarModalCompartir;
	document.getElementById("copy-link-btn").onclick = (e) => copiarLink(url, e.currentTarget, t);
	trapFocus(modal);
	requestAnimationFrame(() => modal.classList.add("visible"));
}
function cerrarModalCompartir() {
	const modal = document.getElementById("modal-compartir");
	if (!modal) return;
	modal.classList.remove("visible");
	setTimeout(() => modal.remove(), 200);
}
async function copiarLink(url, btn, t) {
	try {
		await navigator.clipboard.writeText(url);
		const original = btn.innerHTML;
		btn.innerHTML = `<i class="fas fa-check"></i><span>${t("event.link_copied")}</span>`;
		btn.classList.add("copiado");
		setTimeout(() => {
			btn.innerHTML = original;
			btn.classList.remove("copiado");
		}, 2e3);
	} catch {}
}
//#endregion
//#region js/modules/filters.js
var filterDebounceTimer = null;
function applyFilters(callbacks) {
	clearTimeout(filterDebounceTimer);
	filterDebounceTimer = setTimeout(() => {
		applyFiltersImmediate(callbacks);
	}, 150);
}
function applyFiltersImmediate(callbacks) {
	const searchEl = document.getElementById("search");
	const search = searchEl ? searchEl.value.toLowerCase().trim() : "";
	const dateFilter = document.getElementById("filtro-fecha")?.value || "todos";
	const zonaFilter = document.getElementById("filtro-zona")?.value || "todas";
	const precioMax = parseInt(document.getElementById("filtro-precio-max")?.value || 100);
	const types = Array.from(document.querySelectorAll(".chip input[value=\"concierto\"], .chip input[value=\"fiesta\"], .chip input[value=\"mercado\"], .chip input[value=\"cultural\"], .chip input[value=\"gastronomia\"], .chip input[value=\"deporte\"], .chip input[value=\"infantil\"]")).filter((cb) => cb.checked).map((cb) => cb.value);
	const prices = Array.from(document.querySelectorAll(".chip input[value=\"gratis\"], .chip input[value=\"pago\"]")).filter((cb) => cb.checked).map((cb) => cb.value);
	const lugarCategorias = Array.from(document.querySelectorAll(".lugar-categoria-cb")).filter((cb) => cb.checked).map((cb) => cb.value);
	let filtered = AppState.allEvents.filter((e) => {
		if (types.length && !types.includes(e.tipo)) return false;
		if (prices.length && !prices.includes(e.precio)) return false;
		if (AppState.userLocation) {
			if (calcularDistancia$1(AppState.userLocation.lat, AppState.userLocation.lng, e.lat, e.lng) > AppState.maxDistance) return false;
		}
		if (search) {
			const zona = e.zona || "Madrid";
			if (![
				e.nombre,
				e.descripcion || "",
				e.lugar,
				zona
			].join(" ").toLowerCase().includes(search)) return false;
		}
		if (zonaFilter !== "todas" && (e.zona || "centro") !== zonaFilter) return false;
		if (precioMax < 100) {
			if (e.precio === "gratis") return true;
			if (precioMax === 0) return false;
			if (e.precio_desde) {
				const num = parseFloat(e.precio_desde.replace("€", ""));
				if (!isNaN(num) && num > precioMax) return false;
			}
		}
		return true;
	});
	if (dateFilter !== "todos") {
		const hoy = /* @__PURE__ */ new Date();
		hoy.setHours(0, 0, 0, 0);
		filtered = filtered.filter((e) => {
			const fechaInicio = /* @__PURE__ */ new Date(e.fecha + "T00:00:00");
			const fechaFin = e.fecha_fin ? /* @__PURE__ */ new Date(e.fecha_fin + "T00:00:00") : fechaInicio;
			switch (dateFilter) {
				case "hoy": return fechaInicio <= hoy && fechaFin >= hoy;
				case "finde": {
					const dia = hoy.getDay();
					let ini, fin;
					if (dia === 6) {
						ini = new Date(hoy);
						fin = new Date(hoy);
						fin.setDate(hoy.getDate() + 1);
					} else if (dia === 0) ini = fin = new Date(hoy);
					else {
						const diasHastaSabado = 6 - dia;
						ini = new Date(hoy);
						ini.setDate(hoy.getDate() + diasHastaSabado);
						fin = new Date(ini);
						fin.setDate(ini.getDate() + 1);
					}
					return fechaInicio <= fin && fechaFin >= ini;
				}
				case "semana": {
					const semanaFin = new Date(hoy);
					semanaFin.setDate(hoy.getDate() + 7);
					return fechaInicio <= semanaFin && fechaFin >= hoy;
				}
				case "mes": {
					const mesFin = new Date(hoy);
					mesFin.setDate(hoy.getDate() + 30);
					return fechaInicio <= mesFin && fechaFin >= hoy;
				}
				default: return true;
			}
		});
	}
	AppState.currentFilteredEvents = filtered;
	let filteredLugares = AppState.allLugares.filter((l) => {
		if (lugarCategorias.length === 0) return false;
		if (!lugarCategorias.includes(l.categoria)) return false;
		if (search) {
			const zona = l.zona || "Madrid";
			if (![
				l.nombre,
				l.descripcion || "",
				l.lugar,
				zona,
				l.categoria
			].join(" ").toLowerCase().includes(search)) return false;
		}
		return true;
	});
	AppState.currentFilteredLugares = filteredLugares;
	if (callbacks) {
		if (callbacks.onEventsFiltered) callbacks.onEventsFiltered(filtered);
		if (callbacks.onLugaresFiltered) callbacks.onLugaresFiltered(filteredLugares);
	}
}
function clearFilters(callbacks) {
	const searchEl = document.getElementById("search");
	if (searchEl) searchEl.value = "";
	const dateF = document.getElementById("filtro-fecha");
	if (dateF) dateF.value = "todos";
	const zonaF = document.getElementById("filtro-zona");
	if (zonaF) zonaF.value = "todas";
	const precioF = document.getElementById("filtro-precio-max");
	if (precioF) {
		precioF.value = 100;
		const val = document.getElementById("precio-valor-label");
		if (val) val.textContent = "Cualquiera";
	}
	document.querySelectorAll(".chip input").forEach((cb) => cb.checked = false);
	document.querySelectorAll(".lugar-categoria-cb").forEach((cb) => cb.checked = true);
	applyFiltersImmediate(callbacks);
}
//#endregion
//#region js/modules/renderers.js
function renderListView(events, t, callbacks) {
	const listContainer = document.getElementById("events-list");
	const skeletonList = document.getElementById("skeleton-list");
	if (!listContainer) return;
	if (events.length === 0) {
		if (skeletonList) skeletonList.style.display = "none";
		listContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>${t("list.no_results")}</h3>
                <p>${t("list.try_filters")}</p>
            </div>
        `;
		return;
	}
	const sortedEvents = sortEvents(events);
	const groups = groupEvents(sortedEvents, t);
	const eventsToShow = sortedEvents.slice(0, (AppState.currentPage + 1) * AppState.eventsPerPage);
	listContainer.innerHTML = Object.entries(groups).filter(([_, eventos]) => eventos.length > 0).map(([grupo, eventos]) => {
		const eventosGrupo = eventos.filter((e) => eventsToShow.includes(e));
		if (eventosGrupo.length === 0) return "";
		return `
                <div class="event-group">
                    <div class="event-group-header">
                        <h3>${grupo}</h3>
                        <span class="event-group-count">${eventosGrupo.length}</span>
                    </div>
                    <div class="events-list">
                        ${eventosGrupo.map((evento) => renderEventCard(evento, t, callbacks)).join("")}
                    </div>
                </div>
            `;
	}).join("");
	if (skeletonList) skeletonList.style.display = "none";
	updateListSubtitle(eventsToShow.length, sortedEvents.length, t);
}
function sortEvents(events) {
	return [...events].sort((a, b) => {
		switch (AppState.currentSort) {
			case "date": return new Date(a.fecha) - new Date(b.fecha);
			case "name": return a.nombre.localeCompare(b.nombre);
			case "type": return a.tipo.localeCompare(b.tipo);
			case "distance":
				if (!AppState.userLocation) return 0;
				return calcularDistancia$1(AppState.userLocation.lat, AppState.userLocation.lng, a.lat, a.lng) - calcularDistancia$1(AppState.userLocation.lat, AppState.userLocation.lng, b.lat, b.lng);
			default: return 0;
		}
	});
}
function groupEvents(events, t) {
	const hoy = /* @__PURE__ */ new Date();
	hoy.setHours(0, 0, 0, 0);
	const manana = new Date(hoy);
	manana.setDate(hoy.getDate() + 1);
	const finSemana = new Date(hoy);
	finSemana.setDate(hoy.getDate() + 7);
	const grupos = {};
	grupos[t("list.group.today")] = [];
	grupos[t("list.group.tomorrow")] = [];
	grupos[t("list.group.this_week")] = [];
	grupos[t("list.group.later")] = [];
	events.forEach((evento) => {
		const fechaEvento = new Date(evento.fecha);
		fechaEvento.setHours(0, 0, 0, 0);
		if (fechaEvento.getTime() === hoy.getTime()) grupos[t("list.group.today")].push(evento);
		else if (fechaEvento.getTime() === manana.getTime()) grupos[t("list.group.tomorrow")].push(evento);
		else if (fechaEvento <= finSemana) grupos[t("list.group.this_week")].push(evento);
		else grupos[t("list.group.later")].push(evento);
	});
	return grupos;
}
function renderEventCard(evento, t, callbacks) {
	const emoji = icons[evento.tipo] || "📍";
	const color = colors[evento.tipo] || "#6B7280";
	const safeNombre = purify.sanitize(evento.nombre);
	const safeLugar = purify.sanitize(evento.lugar);
	const dateText = formatearFechaSafe(evento.fecha, evento.fecha_fin);
	const desc = limpiarDescripcion(evento.descripcion, 180);
	const distHTML = AppState.userLocation ? getDistanciaHTMLCoords(evento.lat, evento.lng, AppState.userLocation) : "";
	return `
        <div class="event-card ${AppState.currentDensity}">
            <div class="event-icon" style="background:${color}">${emoji}</div>
            <div class="event-info">
                <div class="event-title">${safeNombre}</div>
                <div class="event-meta">
                    <span>📅 ${dateText}</span>
                    <span>📍 ${safeLugar}</span>
                    ${distHTML}
                </div>
                <div class="event-description">${desc}</div>
            </div>
            <div class="event-actions">
                <button class="event-btn event-btn-primary" onclick="window.verEnMapa(${evento.id})">
                    <i class="fas fa-map-marked-alt"></i> ${t("event.view_map")}
                </button>
                <div class="event-actions-row">
                    <button class="event-btn" onclick="window.comoLlegar(${evento.id})"><i class="fas fa-route"></i></button>
                    <button class="event-btn" onclick="window.compartirEvento(${evento.id})"><i class="fas fa-share-alt"></i></button>
                    <button class="btn-favorite ${AppState.isFavorite(evento.id) ? "active" : ""}" onclick="window.toggleFavorite(${evento.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}
function renderLugaresList(lugares, t) {
	const container = document.getElementById("lugares-list");
	if (!container) return;
	if (!AppState.mostrarLugaresEnLista || lugares.length === 0) {
		document.getElementById("lugares-section").style.display = "none";
		return;
	}
	document.getElementById("lugares-section").style.display = "block";
	container.innerHTML = lugares.map((lugar) => {
		return `
            <div class="lugar-card">
                <div class="lugar-icon" style="background:${lugaresColors[lugar.categoria] || "#6B7280"}">${lugaresIcons[lugar.categoria] || "📍"}</div>
                <div class="event-info">
                    <div class="event-title">${lugar.nombre}</div>
                    <div class="event-meta">
                        <span>📍 ${lugar.lugar}</span>
                    </div>
                </div>
                <div class="event-actions">
                    <button class="event-btn" onclick="window.verLugarEnMapa('${lugar.id}')">${t("event.view_map")}</button>
                </div>
            </div>
        `;
	}).join("");
}
function updateListSubtitle(shown, total, t) {
	const subtitle = document.getElementById("list-subtitle");
	if (subtitle) subtitle.textContent = t("common.showing").replace("{shown}", shown).replace("{total}", total);
}
//#endregion
//#region js/modules/stats.js
var charts = {};
function initCharts(events, t) {
	if (!events || events.length === 0) return;
	Object.values(charts).forEach((chart) => chart.destroy());
	charts = {};
	renderTiposChart(events, t);
	renderZonasChart(events, t);
	renderTimelineChart(events, t);
}
function renderTiposChart(events, t) {
	const ctx = document.getElementById("chart-tipos");
	if (!ctx) return;
	const stats = {};
	events.forEach((e) => {
		stats[e.tipo] = (stats[e.tipo] || 0) + 1;
	});
	const labels = Object.keys(stats).map((tipo) => t(`event.type.${tipo}`));
	const data = Object.values(stats);
	const backgroundColors = Object.keys(stats).map((tipo) => colors[tipo] || "#6B7280");
	charts.tipos = new auto_default(ctx, {
		type: "doughnut",
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
			plugins: { legend: {
				position: "bottom",
				labels: { color: getTextColor() }
			} }
		}
	});
}
function renderZonasChart(events, t) {
	const ctx = document.getElementById("chart-zonas");
	if (!ctx) return;
	const stats = {};
	events.forEach((e) => {
		const zona = e.zona || "Madrid";
		stats[zona] = (stats[zona] || 0) + 1;
	});
	const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 10);
	charts.zonas = new auto_default(ctx, {
		type: "bar",
		data: {
			labels: sorted.map((s) => s[0]),
			datasets: [{
				label: t("stats.charts.events_by_zone"),
				data: sorted.map((s) => s[1]),
				backgroundColor: getAccentColor(),
				borderRadius: 4
			}]
		},
		options: {
			indexAxis: "y",
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
	const ctx = document.getElementById("chart-timeline");
	if (!ctx) return;
	const stats = {};
	events.forEach((e) => {
		const date = e.fecha;
		stats[date] = (stats[date] || 0) + 1;
	});
	const sortedDates = Object.keys(stats).sort().slice(0, 15);
	charts.timeline = new auto_default(ctx, {
		type: "line",
		data: {
			labels: sortedDates.map((d) => formatDateShort(d)),
			datasets: [{
				label: t("stats.charts.events_timeline"),
				data: sortedDates.map((d) => stats[d]),
				borderColor: getAccentColor(),
				backgroundColor: getAccentColor() + "22",
				fill: true,
				tension: .4
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
	return getComputedStyle(document.documentElement).getPropertyValue("--text-main").trim();
}
function getAccentColor() {
	return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
}
function formatDateShort(dateStr) {
	const d = new Date(dateStr);
	return `${d.getDate()}/${d.getMonth() + 1}`;
}
//#endregion
//#region js/main.js
var t = (key, vars) => i18n ? i18n.t(key, vars) : key;
window.comoLlegar = (id) => {
	const ev = AppState.getEventById(id);
	if (ev) window.open(`https://www.google.com/maps/dir/?api=1&destination=${ev.lat},${ev.lng}`, "_blank");
};
window.verEnMapa = (id) => {
	switchView("map");
	const ev = AppState.getEventById(id);
	if (ev && AppState.map) {
		AppState.map.setView([ev.lat, ev.lng], 15);
		AppState.markersLayer.eachLayer((m) => {
			if (m.eventoId === id) AppState.markersLayer.zoomToShowLayer(m, () => m.openPopup());
		});
	}
};
window.verLugarEnMapa = (id) => {
	switchView("map");
	const l = AppState.getLugarById(id);
	if (l && AppState.map) {
		AppState.map.setView([l.lat, l.lng], 16);
		AppState.lugaresLayer.eachLayer((m) => {
			if (m.lugarId === id) m.openPopup();
		});
	}
};
window.compartirEvento = (id) => compartirEventoNativo(AppState.getEventById(id), t, mostrarToast$1);
window.compartirLugar = (id) => mostrarModalCompartir(AppState.getLugarById(id), t, "place");
window.toggleFavorite = (id) => {
	toggleFavorite(id, t, mostrarToast$1, () => {
		renderFavoritesList(AppState.allEvents, t, window.verEnMapa, window.comoLlegar, window.compartirEvento);
		refreshViews();
	});
};
window.clearFilters = () => clearFilters({
	onEventsFiltered: refreshViews,
	onLugaresFiltered: refreshViews
});
async function initApp() {
	initMap();
	initThemeSystem();
	initHeatmapMode(mostrarToast$1);
	initRoutePlanner(mostrarToast$1, i18n, trapFocus, refreshViews, formatDate$1, calcularDistancia$1, formatearDistancia$1);
	setupEventListeners();
	try {
		await loadData();
	} catch (err) {
		console.error("Failed to load data:", err);
	} finally {
		const loader = document.getElementById("loader");
		if (loader) {
			loader.classList.add("oculto");
			setTimeout(() => loader.style.display = "none", 500);
		}
	}
	mostrarToast$1("🚀 " + t("common.ready"), "success");
}
async function loadData() {
	try {
		const [evRes, lugRes] = await Promise.all([fetch("data/eventos.json"), fetch("data/lugares.json")]);
		const events = await evRes.json();
		const lugares = await lugRes.json();
		const today = (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
		AppState.allEvents = events.filter((e) => e.nombre && new Date(e.fecha_fin || e.fecha) >= today).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
		AppState.allLugares = lugares;
		refreshViews();
		loadFavorites();
		updateFavoritesCount();
	} catch (e) {
		console.error("Data load error:", e);
		mostrarToast$1(t("common.error_loading"), "error");
	}
}
function refreshViews() {
	const evs = AppState.currentFilteredEvents.length ? AppState.currentFilteredEvents : AppState.allEvents;
	const lugs = AppState.currentFilteredLugares.length ? AppState.currentFilteredLugares : AppState.allLugares;
	if (AppState.markersLayer) {
		AppState.markersLayer.clearLayers();
		evs.forEach((e) => AppState.markersLayer.addLayer(createEventMarker(e, t)));
	}
	if (AppState.lugaresLayer) {
		AppState.lugaresLayer.clearLayers();
		if (AppState.mostrarLugares) lugs.forEach((l) => AppState.lugaresLayer.addLayer(createLugarMarker(l)));
	}
	if (AppState.currentView === "list") renderListView(evs, t);
	renderLugaresList(lugs, t);
	const counter = document.getElementById("event-count");
	if (counter) counter.textContent = evs.length;
	if (document.getElementById("stats-panel").classList.contains("active")) initCharts(evs, t);
	updateQuickFilterButtons();
}
function updateQuickFilterButtons() {
	const dateFilter = document.getElementById("filtro-fecha")?.value;
	const qHoy = document.getElementById("quick-filter-hoy");
	if (qHoy) qHoy.classList.toggle("active", dateFilter === "hoy");
	const cbGratis = document.querySelector(".chip input[value=\"gratis\"]");
	const qGratis = document.getElementById("quick-filter-gratis");
	if (qGratis) qGratis.classList.toggle("active", cbGratis?.checked);
	const cbInfantil = document.querySelector(".chip input[value=\"infantil\"]");
	const qInfantil = document.getElementById("quick-filter-infantil");
	if (qInfantil) qInfantil.classList.toggle("active", cbInfantil?.checked);
}
function switchView(view) {
	AppState.currentView = view;
	document.body.className = `view-${view}`;
	document.querySelectorAll(".view-container").forEach((c) => c.classList.toggle("active", c.id.startsWith(view)));
	if (view === "map" && AppState.map) setTimeout(() => AppState.map.invalidateSize(), 100);
	refreshViews();
}
function setupEventListeners() {
	document.querySelectorAll("[data-view]").forEach((btn) => {
		btn.addEventListener("click", () => switchView(btn.dataset.view));
	});
	const searchInput = document.getElementById("search");
	if (searchInput) searchInput.addEventListener("input", () => applyFilters({
		onEventsFiltered: refreshViews,
		onLugaresFiltered: refreshViews
	}));
	const btnToggleLugares = document.getElementById("btn-toggle-lugares");
	if (btnToggleLugares) btnToggleLugares.addEventListener("click", () => {
		AppState.mostrarLugares = !AppState.mostrarLugares;
		btnToggleLugares.classList.toggle("active", AppState.mostrarLugares);
		refreshViews();
	});
	const filterCallbacks = {
		onEventsFiltered: refreshViews,
		onLugaresFiltered: refreshViews
	};
	document.querySelectorAll(".chip input, .lugar-categoria-cb, #filtro-fecha, #filtro-zona, #filtro-precio-max, #filtro-distancia").forEach((el) => {
		const eventType = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input";
		el.addEventListener(eventType, () => applyFilters(filterCallbacks));
	});
	const precioMax = document.getElementById("filtro-precio-max");
	if (precioMax) precioMax.addEventListener("input", (e) => {
		const label = document.getElementById("precio-valor-label");
		if (label) label.textContent = e.target.value >= 100 ? t("filters.price.any") : e.target.value + "€";
	});
	const sortSelect = document.getElementById("sort-by");
	if (sortSelect) sortSelect.addEventListener("change", (e) => {
		AppState.currentSort = e.target.value;
		refreshViews();
	});
	document.querySelectorAll(".density-btn").forEach((btn) => {
		btn.addEventListener("click", () => {
			AppState.currentDensity = btn.dataset.density;
			document.querySelectorAll(".density-btn").forEach((b) => b.classList.toggle("active", b === btn));
			refreshViews();
		});
	});
	document.querySelectorAll(".quick-filter").forEach((btn) => {
		btn.addEventListener("click", () => {
			const filter = btn.dataset.filter;
			if (filter === "hoy") {
				const f = document.getElementById("filtro-fecha");
				if (f) f.value = f.value === "hoy" ? "todos" : "hoy";
			} else if (filter === "gratis") {
				const cb = document.querySelector(".chip input[value=\"gratis\"]");
				if (cb) cb.checked = !cb.checked;
			} else if (filter === "infantil") {
				const cb = document.querySelector(".chip input[value=\"infantil\"]");
				if (cb) cb.checked = !cb.checked;
			}
			applyFilters(filterCallbacks);
		});
	});
	const setupPanel = (toggleId, panelId, closeId, onOpen) => {
		const toggle = document.getElementById(toggleId);
		const panel = document.getElementById(panelId);
		const close = document.getElementById(closeId);
		if (toggle && panel) toggle.addEventListener("click", () => {
			panel.classList.add("active");
			if (onOpen) onOpen();
		});
		if (close && panel) close.addEventListener("click", () => panel.classList.remove("active"));
	};
	setupPanel("fab-filters", "filters-panel", "close-panel");
	setupPanel("favorites-toggle", "favorites-panel", "close-favorites");
	setupPanel("stats-toggle", "stats-panel", "close-stats", () => {
		const evs = AppState.currentFilteredEvents.length ? AppState.currentFilteredEvents : AppState.allEvents;
		setTimeout(() => initCharts(evs, t), 300);
	});
	setupPanel("settings-toggle", "settings-panel", "close-settings");
	setupPanel("bottom-nav-favorites", "favorites-panel", "close-favorites");
	setupPanel("bottom-nav-settings", "settings-panel", "close-settings");
	const langSelect = document.getElementById("lang-select");
	if (langSelect) {
		langSelect.value = i18n.currentLang;
		langSelect.addEventListener("change", (e) => {
			i18n.setLanguage(e.target.value);
		});
	}
	const btnPlanRoute = document.getElementById("plan-favorite-route");
	if (btnPlanRoute) btnPlanRoute.addEventListener("click", () => {
		const favEvents = AppState.favorites.map((id) => AppState.getEventById(id)).filter(Boolean);
		if (favEvents.length === 0) return mostrarToast$1(t("favorites.empty_route"), "warning");
		document.getElementById("route-panel").classList.add("active");
		AppState.selectedRouteEvents = [...favEvents];
		window.dispatchEvent(new CustomEvent("updateRoute"));
	});
	const btnClear = document.getElementById("btn-clear");
	if (btnClear) btnClear.addEventListener("click", window.clearFilters);
	const btnGeolocate = document.getElementById("btn-geolocate");
	if (btnGeolocate) btnGeolocate.addEventListener("click", () => {
		if (!navigator.geolocation) return mostrarToast$1("Geolocation not supported", "error");
		btnGeolocate.classList.add("loading");
		navigator.geolocation.getCurrentPosition((pos) => {
			btnGeolocate.classList.remove("loading");
			const { latitude, longitude } = pos.coords;
			AppState.userLocation = {
				lat: latitude,
				lng: longitude
			};
			if (AppState.map) {
				AppState.map.setView([latitude, longitude], 15);
				if (AppState.userMarker) AppState.map.removeLayer(AppState.userMarker);
				AppState.userMarker = import_leaflet_src.default.circleMarker([latitude, longitude], {
					color: "#0A84FF",
					fillOpacity: 1,
					radius: 8,
					weight: 3
				}).addTo(AppState.map);
			}
			applyFilters(filterCallbacks);
			mostrarToast$1("📍 " + t("common.location_ready"), "success");
		}, () => {
			btnGeolocate.classList.remove("loading");
			mostrarToast$1("❌ " + t("common.location_error"), "error");
		});
	});
	window.addEventListener("languageChanged", refreshViews);
}
document.addEventListener("DOMContentLoaded", initApp);
if ("serviceWorker" in navigator && true) window.addEventListener("load", () => {
	navigator.serviceWorker.register("./sw.js").catch((err) => console.log("SW error:", err));
});
//#endregion
