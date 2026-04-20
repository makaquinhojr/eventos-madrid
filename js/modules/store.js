export const AppState = {
    map: null,
    allEvents: [],
    allLugares: [],
    currentFilteredEvents: [],
    currentFilteredLugares: [],
    markersLayer: null,
    lugaresLayer: null,
    currentView: 'map',
    currentSort: 'date',
    currentDensity: 'comfortable',
    userMarker: null,
    userLocation: null,
    distanceCircle: null,
    maxDistance: 20,
    mostrarLugares: true,
    mostrarLugaresEnLista: true,
    favorites: [],
    currentCalendarDate: new Date(),
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

    currentThemePreset: 'default',
    customAccentColor: null,
    heatmapLayer: null,
    heatmapData: [],
    heatmapRadius: 25,
    routePlannerMode: false,
    selectedRouteEvents: [],
    routePolyline: null,
    routeMarkers: []
};
