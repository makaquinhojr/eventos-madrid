//#region \0rolldown_dynamic_import_helper.js
var _rolldown_dynamic_import_helper_default = (glob, path, segments) => {
	const query = path.lastIndexOf("?");
	const v = glob[query === -1 || query < path.lastIndexOf("/") ? path : path.slice(0, query)];
	if (v) return typeof v === "function" ? v() : Promise.resolve(v);
	return new Promise((_, reject) => {
		(typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path + (path.split("/").length !== segments ? ". Note that variables only represent file names one level deep." : ""))));
	});
};
//#endregion
//#region \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep) {
	return "/eventos-madrid/" + dep;
};
var seen = {};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		const links = document.getElementsByTagName("link");
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		promise = allSettled(deps.map((dep) => {
			dep = assetsURL(dep, importerUrl);
			if (dep in seen) return;
			seen[dep] = true;
			const isCss = dep.endsWith(".css");
			const cssSelector = isCss ? "[rel=\"stylesheet\"]" : "";
			if (!!importerUrl) for (let i = links.length - 1; i >= 0; i--) {
				const link = links[i];
				if (link.href === dep && (!isCss || link.rel === "stylesheet")) return;
			}
			else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region js/i18n.js
var I18n = class {
	constructor() {
		this.currentLang = this.detectLanguage();
		this.translateEvents = localStorage.getItem("translateEvents") === "true";
		this.translations = {};
	}
	detectLanguage() {
		const saved = localStorage.getItem("language");
		const availableLanguages = [
			"es",
			"en",
			"fr",
			"pt",
			"de",
			"it",
			"zh",
			"ja",
			"ko",
			"ar"
		];
		if (saved && availableLanguages.includes(saved)) return saved;
		const browserLang = navigator.language.split("-")[0];
		if (availableLanguages.includes(browserLang)) return browserLang;
		return "es";
	}
	init() {
		document.documentElement.lang = this.currentLang;
		localStorage.setItem("language", this.currentLang);
	}
	t(key, vars = {}) {
		let text = this.translations[this.currentLang]?.[key] || (this.translations["es"] || {})[key] || key;
		Object.keys(vars).forEach((varKey) => {
			text = text.replace(`{${varKey}}`, vars[varKey]);
		});
		return text;
	}
	async setLanguage(lang) {
		if ([
			"es",
			"en",
			"fr",
			"pt",
			"de",
			"it",
			"zh",
			"ja",
			"ko",
			"ar"
		].includes(lang)) await this.loadLanguage(lang);
	}
	async loadLanguage(lang) {
		try {
			if (!this.translations[lang]) {
				const module = await _rolldown_dynamic_import_helper_default(/* @__PURE__ */ Object.assign({
					"./locales/ar.js": () => __vitePreload(() => import("./ar-BKSpQhKW.js"), []),
					"./locales/de.js": () => __vitePreload(() => import("./de-BXxOXY99.js"), []),
					"./locales/en.js": () => __vitePreload(() => import("./en-o4rzbiBR.js"), []),
					"./locales/es.js": () => __vitePreload(() => import("./es-B2eRnli7.js"), []),
					"./locales/fr.js": () => __vitePreload(() => import("./fr-Cu9pABxU.js"), []),
					"./locales/it.js": () => __vitePreload(() => import("./it-7ttTmTaD.js"), []),
					"./locales/ja.js": () => __vitePreload(() => import("./ja-vPgkYGOT.js"), []),
					"./locales/ko.js": () => __vitePreload(() => import("./ko-BDMpA2WE.js"), []),
					"./locales/pt.js": () => __vitePreload(() => import("./pt-BInmCIpN.js"), []),
					"./locales/zh.js": () => __vitePreload(() => import("./zh-BkFYhqsg.js"), [])
				}), `./locales/${lang}.js`, 3);
				this.translations[lang] = module.default;
			}
			if (lang !== "es" && !this.translations["es"]) {
				const esModule = await __vitePreload(() => import("./es-B2eRnli7.js"), []);
				this.translations["es"] = esModule.default;
			}
			this.currentLang = lang;
			localStorage.setItem("language", lang);
			document.documentElement.lang = lang;
			this.updateUI();
			window.dispatchEvent(new Event("languageChanged"));
		} catch (e) {
			console.error("Error loading lang", e);
		}
	}
	getLanguage() {
		return this.currentLang;
	}
	updateUI() {
		document.querySelectorAll("[data-i18n]").forEach((el) => {
			const key = el.getAttribute("data-i18n");
			if (el.children.length > 0) return;
			if ([
				"OPTION",
				"INPUT",
				"BUTTON"
			].includes(el.tagName)) return;
			el.textContent = this.t(key);
		});
		document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
			const key = el.getAttribute("data-i18n-placeholder");
			el.placeholder = this.t(key);
		});
		this.updateSelectOptions();
		this.updateDynamicContent();
	}
	updateSelectOptions() {
		[{
			id: "filtro-fecha",
			options: [
				"filters.when.all",
				"filters.when.today",
				"filters.when.weekend",
				"filters.when.week",
				"filters.when.month"
			]
		}, {
			id: "sort-by",
			options: [
				"list.sort.date",
				"list.sort.name",
				"list.sort.type",
				"list.sort.distance"
			]
		}].forEach(({ id, options }) => {
			const select = document.getElementById(id);
			if (!select) return;
			const currentValue = select.value;
			Array.from(select.options).forEach((option, index) => {
				if (options[index]) option.textContent = this.t(options[index]);
			});
			select.value = currentValue;
		});
		const langSelect = document.getElementById("lang-select");
		if (langSelect) {
			const currentValue = langSelect.value;
			const langs = [
				"es",
				"en",
				"fr",
				"pt",
				"de",
				"it",
				"zh",
				"ja",
				"ko",
				"ar"
			];
			Array.from(langSelect.options).forEach((option, index) => {
				if (langs[index]) option.textContent = this.t(`lang.${langs[index]}`);
			});
			langSelect.value = currentValue;
		}
		const filtroZona = document.getElementById("filtro-zona");
		if (filtroZona?.options[0]) {
			const currentValue = filtroZona.value;
			filtroZona.options[0].textContent = this.t("filters.zone.all");
			filtroZona.value = currentValue;
		}
	}
	updateDynamicContent() {
		const routeTitle = document.getElementById("route-title");
		if (routeTitle) routeTitle.textContent = this.t("route.title");
		const routeLabels = document.querySelectorAll(".route-stat-label");
		if (routeLabels.length >= 3) {
			routeLabels[0].textContent = this.t("route.events_selected");
			routeLabels[1].textContent = this.t("route.total_distance");
			routeLabels[2].textContent = this.t("route.estimated_time");
		}
		const optimizeBtn = document.getElementById("optimize-route");
		if (optimizeBtn) {
			const icon = optimizeBtn.querySelector("i");
			optimizeBtn.innerHTML = icon ? icon.outerHTML + " " + this.t("route.optimize") : this.t("route.optimize");
		}
		const exportBtn = document.getElementById("export-route");
		if (exportBtn) {
			const icon = exportBtn.querySelector("i");
			exportBtn.innerHTML = icon ? icon.outerHTML + " " + this.t("route.export") : this.t("route.export");
		}
		const clearRouteBtn = document.getElementById("clear-route");
		if (clearRouteBtn) {
			const icon = clearRouteBtn.querySelector("i");
			clearRouteBtn.innerHTML = icon ? icon.outerHTML + " " + this.t("route.clear") : this.t("route.clear");
		}
		const routeEmpty = document.getElementById("route-empty");
		if (routeEmpty) routeEmpty.innerHTML = `
                <i class="fas fa-route"></i>
                <h3>${this.t("route.empty.title")}</h3>
                <p>${this.t("route.empty.desc")}</p>
            `;
		const themeNames = document.querySelectorAll(".theme-name");
		const themeKeys = [
			"default",
			"sunset",
			"forest",
			"ocean",
			"berry"
		];
		themeNames.forEach((name, index) => {
			if (themeKeys[index]) name.textContent = this.t(`themes.${themeKeys[index]}`);
		});
	}
	async translateEventName(nombre) {
		if (!this.translateEvents || this.currentLang === "es") return nombre;
		const cacheKey = `tr_${this.currentLang}_${nombre}`;
		const cached = localStorage.getItem(cacheKey);
		if (cached) return cached;
		try {
			const response = await fetch("https://libretranslate.de/translate", {
				method: "POST",
				body: JSON.stringify({
					q: nombre,
					source: "es",
					target: this.currentLang,
					format: "text"
				}),
				headers: { "Content-Type": "application/json" }
			});
			if (response.ok) {
				const translated = (await response.json()).translatedText;
				localStorage.setItem(cacheKey, translated);
				return translated;
			}
		} catch (error) {
			console.warn("Error traduciendo:", error);
		}
		return nombre;
	}
};
var i18n = new I18n();
window.i18n = i18n;
var initI18n = async () => {
	await i18n.loadLanguage(i18n.currentLang);
	if (document.readyState === "complete") i18n.updateUI();
	else window.addEventListener("load", () => {
		setTimeout(() => i18n.updateUI(), 100);
	});
};
initI18n();
//#endregion
export { i18n as t };
