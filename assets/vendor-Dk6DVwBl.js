import { t as __commonJSMin } from "./rolldown-runtime-DHFQXTcm.js";
//#region node_modules/leaflet/dist/leaflet-src.js
var require_leaflet_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/* @preserve
	* Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
	* (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
	*/
	(function(global, factory) {
		typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.leaflet = {}));
	})(exports, (function(exports$2) {
		"use strict";
		var version = "1.9.4";
		function extend(dest) {
			var i, j, len, src;
			for (j = 1, len = arguments.length; j < len; j++) {
				src = arguments[j];
				for (i in src) dest[i] = src[i];
			}
			return dest;
		}
		var create$2 = Object.create || (function() {
			function F() {}
			return function(proto) {
				F.prototype = proto;
				return new F();
			};
		})();
		function bind(fn, obj) {
			var slice = Array.prototype.slice;
			if (fn.bind) return fn.bind.apply(fn, slice.call(arguments, 1));
			var args = slice.call(arguments, 2);
			return function() {
				return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
			};
		}
		var lastId = 0;
		function stamp(obj) {
			if (!("_leaflet_id" in obj)) obj["_leaflet_id"] = ++lastId;
			return obj._leaflet_id;
		}
		function throttle(fn, time, context) {
			var lock, args, wrapperFn, later = function() {
				lock = false;
				if (args) {
					wrapperFn.apply(context, args);
					args = false;
				}
			};
			wrapperFn = function() {
				if (lock) args = arguments;
				else {
					fn.apply(context, arguments);
					setTimeout(later, time);
					lock = true;
				}
			};
			return wrapperFn;
		}
		function wrapNum(x, range, includeMax) {
			var max = range[1], min = range[0], d = max - min;
			return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
		}
		function falseFn() {
			return false;
		}
		function formatNum(num, precision) {
			if (precision === false) return num;
			var pow = Math.pow(10, precision === void 0 ? 6 : precision);
			return Math.round(num * pow) / pow;
		}
		function trim(str) {
			return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
		}
		function splitWords(str) {
			return trim(str).split(/\s+/);
		}
		function setOptions(obj, options) {
			if (!Object.prototype.hasOwnProperty.call(obj, "options")) obj.options = obj.options ? create$2(obj.options) : {};
			for (var i in options) obj.options[i] = options[i];
			return obj.options;
		}
		function getParamString(obj, existingUrl, uppercase) {
			var params = [];
			for (var i in obj) params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + "=" + encodeURIComponent(obj[i]));
			return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
		}
		var templateRe = /\{ *([\w_ -]+) *\}/g;
		function template(str, data) {
			return str.replace(templateRe, function(str, key) {
				var value = data[key];
				if (value === void 0) throw new Error("No value provided for variable " + str);
				else if (typeof value === "function") value = value(data);
				return value;
			});
		}
		var isArray = Array.isArray || function(obj) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		};
		function indexOf(array, el) {
			for (var i = 0; i < array.length; i++) if (array[i] === el) return i;
			return -1;
		}
		var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		function getPrefixed(name) {
			return window["webkit" + name] || window["moz" + name] || window["ms" + name];
		}
		var lastTime = 0;
		function timeoutDefer(fn) {
			var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
			lastTime = time + timeToCall;
			return window.setTimeout(fn, timeToCall);
		}
		var requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
		var cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id) {
			window.clearTimeout(id);
		};
		function requestAnimFrame(fn, context, immediate) {
			if (immediate && requestFn === timeoutDefer) fn.call(context);
			else return requestFn.call(window, bind(fn, context));
		}
		function cancelAnimFrame(id) {
			if (id) cancelFn.call(window, id);
		}
		var Util = {
			__proto__: null,
			extend,
			create: create$2,
			bind,
			get lastId() {
				return lastId;
			},
			stamp,
			throttle,
			wrapNum,
			falseFn,
			formatNum,
			trim,
			splitWords,
			setOptions,
			getParamString,
			template,
			isArray,
			indexOf,
			emptyImageUrl,
			requestFn,
			cancelFn,
			requestAnimFrame,
			cancelAnimFrame
		};
		function Class() {}
		Class.extend = function(props) {
			var NewClass = function() {
				setOptions(this);
				if (this.initialize) this.initialize.apply(this, arguments);
				this.callInitHooks();
			};
			var parentProto = NewClass.__super__ = this.prototype;
			var proto = create$2(parentProto);
			proto.constructor = NewClass;
			NewClass.prototype = proto;
			for (var i in this) if (Object.prototype.hasOwnProperty.call(this, i) && i !== "prototype" && i !== "__super__") NewClass[i] = this[i];
			if (props.statics) extend(NewClass, props.statics);
			if (props.includes) {
				checkDeprecatedMixinEvents(props.includes);
				extend.apply(null, [proto].concat(props.includes));
			}
			extend(proto, props);
			delete proto.statics;
			delete proto.includes;
			if (proto.options) {
				proto.options = parentProto.options ? create$2(parentProto.options) : {};
				extend(proto.options, props.options);
			}
			proto._initHooks = [];
			proto.callInitHooks = function() {
				if (this._initHooksCalled) return;
				if (parentProto.callInitHooks) parentProto.callInitHooks.call(this);
				this._initHooksCalled = true;
				for (var i = 0, len = proto._initHooks.length; i < len; i++) proto._initHooks[i].call(this);
			};
			return NewClass;
		};
		Class.include = function(props) {
			var parentOptions = this.prototype.options;
			extend(this.prototype, props);
			if (props.options) {
				this.prototype.options = parentOptions;
				this.mergeOptions(props.options);
			}
			return this;
		};
		Class.mergeOptions = function(options) {
			extend(this.prototype.options, options);
			return this;
		};
		Class.addInitHook = function(fn) {
			var args = Array.prototype.slice.call(arguments, 1);
			var init = typeof fn === "function" ? fn : function() {
				this[fn].apply(this, args);
			};
			this.prototype._initHooks = this.prototype._initHooks || [];
			this.prototype._initHooks.push(init);
			return this;
		};
		function checkDeprecatedMixinEvents(includes) {
			if (typeof L === "undefined" || !L || !L.Mixin) return;
			includes = isArray(includes) ? includes : [includes];
			for (var i = 0; i < includes.length; i++) if (includes[i] === L.Mixin.Events) console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (/* @__PURE__ */ new Error()).stack);
		}
		var Events = {
			on: function(types, fn, context) {
				if (typeof types === "object") for (var type in types) this._on(type, types[type], fn);
				else {
					types = splitWords(types);
					for (var i = 0, len = types.length; i < len; i++) this._on(types[i], fn, context);
				}
				return this;
			},
			off: function(types, fn, context) {
				if (!arguments.length) delete this._events;
				else if (typeof types === "object") for (var type in types) this._off(type, types[type], fn);
				else {
					types = splitWords(types);
					var removeAll = arguments.length === 1;
					for (var i = 0, len = types.length; i < len; i++) if (removeAll) this._off(types[i]);
					else this._off(types[i], fn, context);
				}
				return this;
			},
			_on: function(type, fn, context, _once) {
				if (typeof fn !== "function") {
					console.warn("wrong listener type: " + typeof fn);
					return;
				}
				if (this._listens(type, fn, context) !== false) return;
				if (context === this) context = void 0;
				var newListener = {
					fn,
					ctx: context
				};
				if (_once) newListener.once = true;
				this._events = this._events || {};
				this._events[type] = this._events[type] || [];
				this._events[type].push(newListener);
			},
			_off: function(type, fn, context) {
				var listeners, i, len;
				if (!this._events) return;
				listeners = this._events[type];
				if (!listeners) return;
				if (arguments.length === 1) {
					if (this._firingCount) for (i = 0, len = listeners.length; i < len; i++) listeners[i].fn = falseFn;
					delete this._events[type];
					return;
				}
				if (typeof fn !== "function") {
					console.warn("wrong listener type: " + typeof fn);
					return;
				}
				var index = this._listens(type, fn, context);
				if (index !== false) {
					var listener = listeners[index];
					if (this._firingCount) {
						listener.fn = falseFn;
						this._events[type] = listeners = listeners.slice();
					}
					listeners.splice(index, 1);
				}
			},
			fire: function(type, data, propagate) {
				if (!this.listens(type, propagate)) return this;
				var event = extend({}, data, {
					type,
					target: this,
					sourceTarget: data && data.sourceTarget || this
				});
				if (this._events) {
					var listeners = this._events[type];
					if (listeners) {
						this._firingCount = this._firingCount + 1 || 1;
						for (var i = 0, len = listeners.length; i < len; i++) {
							var l = listeners[i];
							var fn = l.fn;
							if (l.once) this.off(type, fn, l.ctx);
							fn.call(l.ctx || this, event);
						}
						this._firingCount--;
					}
				}
				if (propagate) this._propagateEvent(event);
				return this;
			},
			listens: function(type, fn, context, propagate) {
				if (typeof type !== "string") console.warn("\"string\" type argument expected");
				var _fn = fn;
				if (typeof fn !== "function") {
					propagate = !!fn;
					_fn = void 0;
					context = void 0;
				}
				var listeners = this._events && this._events[type];
				if (listeners && listeners.length) {
					if (this._listens(type, _fn, context) !== false) return true;
				}
				if (propagate) {
					for (var id in this._eventParents) if (this._eventParents[id].listens(type, fn, context, propagate)) return true;
				}
				return false;
			},
			_listens: function(type, fn, context) {
				if (!this._events) return false;
				var listeners = this._events[type] || [];
				if (!fn) return !!listeners.length;
				if (context === this) context = void 0;
				for (var i = 0, len = listeners.length; i < len; i++) if (listeners[i].fn === fn && listeners[i].ctx === context) return i;
				return false;
			},
			once: function(types, fn, context) {
				if (typeof types === "object") for (var type in types) this._on(type, types[type], fn, true);
				else {
					types = splitWords(types);
					for (var i = 0, len = types.length; i < len; i++) this._on(types[i], fn, context, true);
				}
				return this;
			},
			addEventParent: function(obj) {
				this._eventParents = this._eventParents || {};
				this._eventParents[stamp(obj)] = obj;
				return this;
			},
			removeEventParent: function(obj) {
				if (this._eventParents) delete this._eventParents[stamp(obj)];
				return this;
			},
			_propagateEvent: function(e) {
				for (var id in this._eventParents) this._eventParents[id].fire(e.type, extend({
					layer: e.target,
					propagatedFrom: e.target
				}, e), true);
			}
		};
		Events.addEventListener = Events.on;
		Events.removeEventListener = Events.clearAllEventListeners = Events.off;
		Events.addOneTimeEventListener = Events.once;
		Events.fireEvent = Events.fire;
		Events.hasEventListeners = Events.listens;
		var Evented = Class.extend(Events);
		function Point(x, y, round) {
			this.x = round ? Math.round(x) : x;
			this.y = round ? Math.round(y) : y;
		}
		var trunc = Math.trunc || function(v) {
			return v > 0 ? Math.floor(v) : Math.ceil(v);
		};
		Point.prototype = {
			clone: function() {
				return new Point(this.x, this.y);
			},
			add: function(point) {
				return this.clone()._add(toPoint(point));
			},
			_add: function(point) {
				this.x += point.x;
				this.y += point.y;
				return this;
			},
			subtract: function(point) {
				return this.clone()._subtract(toPoint(point));
			},
			_subtract: function(point) {
				this.x -= point.x;
				this.y -= point.y;
				return this;
			},
			divideBy: function(num) {
				return this.clone()._divideBy(num);
			},
			_divideBy: function(num) {
				this.x /= num;
				this.y /= num;
				return this;
			},
			multiplyBy: function(num) {
				return this.clone()._multiplyBy(num);
			},
			_multiplyBy: function(num) {
				this.x *= num;
				this.y *= num;
				return this;
			},
			scaleBy: function(point) {
				return new Point(this.x * point.x, this.y * point.y);
			},
			unscaleBy: function(point) {
				return new Point(this.x / point.x, this.y / point.y);
			},
			round: function() {
				return this.clone()._round();
			},
			_round: function() {
				this.x = Math.round(this.x);
				this.y = Math.round(this.y);
				return this;
			},
			floor: function() {
				return this.clone()._floor();
			},
			_floor: function() {
				this.x = Math.floor(this.x);
				this.y = Math.floor(this.y);
				return this;
			},
			ceil: function() {
				return this.clone()._ceil();
			},
			_ceil: function() {
				this.x = Math.ceil(this.x);
				this.y = Math.ceil(this.y);
				return this;
			},
			trunc: function() {
				return this.clone()._trunc();
			},
			_trunc: function() {
				this.x = trunc(this.x);
				this.y = trunc(this.y);
				return this;
			},
			distanceTo: function(point) {
				point = toPoint(point);
				var x = point.x - this.x, y = point.y - this.y;
				return Math.sqrt(x * x + y * y);
			},
			equals: function(point) {
				point = toPoint(point);
				return point.x === this.x && point.y === this.y;
			},
			contains: function(point) {
				point = toPoint(point);
				return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
			},
			toString: function() {
				return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
			}
		};
		function toPoint(x, y, round) {
			if (x instanceof Point) return x;
			if (isArray(x)) return new Point(x[0], x[1]);
			if (x === void 0 || x === null) return x;
			if (typeof x === "object" && "x" in x && "y" in x) return new Point(x.x, x.y);
			return new Point(x, y, round);
		}
		function Bounds(a, b) {
			if (!a) return;
			var points = b ? [a, b] : a;
			for (var i = 0, len = points.length; i < len; i++) this.extend(points[i]);
		}
		Bounds.prototype = {
			extend: function(obj) {
				var min2, max2;
				if (!obj) return this;
				if (obj instanceof Point || typeof obj[0] === "number" || "x" in obj) min2 = max2 = toPoint(obj);
				else {
					obj = toBounds(obj);
					min2 = obj.min;
					max2 = obj.max;
					if (!min2 || !max2) return this;
				}
				if (!this.min && !this.max) {
					this.min = min2.clone();
					this.max = max2.clone();
				} else {
					this.min.x = Math.min(min2.x, this.min.x);
					this.max.x = Math.max(max2.x, this.max.x);
					this.min.y = Math.min(min2.y, this.min.y);
					this.max.y = Math.max(max2.y, this.max.y);
				}
				return this;
			},
			getCenter: function(round) {
				return toPoint((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, round);
			},
			getBottomLeft: function() {
				return toPoint(this.min.x, this.max.y);
			},
			getTopRight: function() {
				return toPoint(this.max.x, this.min.y);
			},
			getTopLeft: function() {
				return this.min;
			},
			getBottomRight: function() {
				return this.max;
			},
			getSize: function() {
				return this.max.subtract(this.min);
			},
			contains: function(obj) {
				var min, max;
				if (typeof obj[0] === "number" || obj instanceof Point) obj = toPoint(obj);
				else obj = toBounds(obj);
				if (obj instanceof Bounds) {
					min = obj.min;
					max = obj.max;
				} else min = max = obj;
				return min.x >= this.min.x && max.x <= this.max.x && min.y >= this.min.y && max.y <= this.max.y;
			},
			intersects: function(bounds) {
				bounds = toBounds(bounds);
				var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = max2.x >= min.x && min2.x <= max.x, yIntersects = max2.y >= min.y && min2.y <= max.y;
				return xIntersects && yIntersects;
			},
			overlaps: function(bounds) {
				bounds = toBounds(bounds);
				var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = max2.x > min.x && min2.x < max.x, yOverlaps = max2.y > min.y && min2.y < max.y;
				return xOverlaps && yOverlaps;
			},
			isValid: function() {
				return !!(this.min && this.max);
			},
			pad: function(bufferRatio) {
				var min = this.min, max = this.max, heightBuffer = Math.abs(min.x - max.x) * bufferRatio, widthBuffer = Math.abs(min.y - max.y) * bufferRatio;
				return toBounds(toPoint(min.x - heightBuffer, min.y - widthBuffer), toPoint(max.x + heightBuffer, max.y + widthBuffer));
			},
			equals: function(bounds) {
				if (!bounds) return false;
				bounds = toBounds(bounds);
				return this.min.equals(bounds.getTopLeft()) && this.max.equals(bounds.getBottomRight());
			}
		};
		function toBounds(a, b) {
			if (!a || a instanceof Bounds) return a;
			return new Bounds(a, b);
		}
		function LatLngBounds(corner1, corner2) {
			if (!corner1) return;
			var latlngs = corner2 ? [corner1, corner2] : corner1;
			for (var i = 0, len = latlngs.length; i < len; i++) this.extend(latlngs[i]);
		}
		LatLngBounds.prototype = {
			extend: function(obj) {
				var sw = this._southWest, ne = this._northEast, sw2, ne2;
				if (obj instanceof LatLng) {
					sw2 = obj;
					ne2 = obj;
				} else if (obj instanceof LatLngBounds) {
					sw2 = obj._southWest;
					ne2 = obj._northEast;
					if (!sw2 || !ne2) return this;
				} else return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
				if (!sw && !ne) {
					this._southWest = new LatLng(sw2.lat, sw2.lng);
					this._northEast = new LatLng(ne2.lat, ne2.lng);
				} else {
					sw.lat = Math.min(sw2.lat, sw.lat);
					sw.lng = Math.min(sw2.lng, sw.lng);
					ne.lat = Math.max(ne2.lat, ne.lat);
					ne.lng = Math.max(ne2.lng, ne.lng);
				}
				return this;
			},
			pad: function(bufferRatio) {
				var sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
				return new LatLngBounds(new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer), new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
			},
			getCenter: function() {
				return new LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
			},
			getSouthWest: function() {
				return this._southWest;
			},
			getNorthEast: function() {
				return this._northEast;
			},
			getNorthWest: function() {
				return new LatLng(this.getNorth(), this.getWest());
			},
			getSouthEast: function() {
				return new LatLng(this.getSouth(), this.getEast());
			},
			getWest: function() {
				return this._southWest.lng;
			},
			getSouth: function() {
				return this._southWest.lat;
			},
			getEast: function() {
				return this._northEast.lng;
			},
			getNorth: function() {
				return this._northEast.lat;
			},
			contains: function(obj) {
				if (typeof obj[0] === "number" || obj instanceof LatLng || "lat" in obj) obj = toLatLng(obj);
				else obj = toLatLngBounds(obj);
				var sw = this._southWest, ne = this._northEast, sw2, ne2;
				if (obj instanceof LatLngBounds) {
					sw2 = obj.getSouthWest();
					ne2 = obj.getNorthEast();
				} else sw2 = ne2 = obj;
				return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
			},
			intersects: function(bounds) {
				bounds = toLatLngBounds(bounds);
				var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat, lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
				return latIntersects && lngIntersects;
			},
			overlaps: function(bounds) {
				bounds = toLatLngBounds(bounds);
				var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat, lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
				return latOverlaps && lngOverlaps;
			},
			toBBoxString: function() {
				return [
					this.getWest(),
					this.getSouth(),
					this.getEast(),
					this.getNorth()
				].join(",");
			},
			equals: function(bounds, maxMargin) {
				if (!bounds) return false;
				bounds = toLatLngBounds(bounds);
				return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
			},
			isValid: function() {
				return !!(this._southWest && this._northEast);
			}
		};
		function toLatLngBounds(a, b) {
			if (a instanceof LatLngBounds) return a;
			return new LatLngBounds(a, b);
		}
		function LatLng(lat, lng, alt) {
			if (isNaN(lat) || isNaN(lng)) throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
			this.lat = +lat;
			this.lng = +lng;
			if (alt !== void 0) this.alt = +alt;
		}
		LatLng.prototype = {
			equals: function(obj, maxMargin) {
				if (!obj) return false;
				obj = toLatLng(obj);
				return Math.max(Math.abs(this.lat - obj.lat), Math.abs(this.lng - obj.lng)) <= (maxMargin === void 0 ? 1e-9 : maxMargin);
			},
			toString: function(precision) {
				return "LatLng(" + formatNum(this.lat, precision) + ", " + formatNum(this.lng, precision) + ")";
			},
			distanceTo: function(other) {
				return Earth.distance(this, toLatLng(other));
			},
			wrap: function() {
				return Earth.wrapLatLng(this);
			},
			toBounds: function(sizeInMeters) {
				var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
				return toLatLngBounds([this.lat - latAccuracy, this.lng - lngAccuracy], [this.lat + latAccuracy, this.lng + lngAccuracy]);
			},
			clone: function() {
				return new LatLng(this.lat, this.lng, this.alt);
			}
		};
		function toLatLng(a, b, c) {
			if (a instanceof LatLng) return a;
			if (isArray(a) && typeof a[0] !== "object") {
				if (a.length === 3) return new LatLng(a[0], a[1], a[2]);
				if (a.length === 2) return new LatLng(a[0], a[1]);
				return null;
			}
			if (a === void 0 || a === null) return a;
			if (typeof a === "object" && "lat" in a) return new LatLng(a.lat, "lng" in a ? a.lng : a.lon, a.alt);
			if (b === void 0) return null;
			return new LatLng(a, b, c);
		}
		var CRS = {
			latLngToPoint: function(latlng, zoom) {
				var projectedPoint = this.projection.project(latlng), scale = this.scale(zoom);
				return this.transformation._transform(projectedPoint, scale);
			},
			pointToLatLng: function(point, zoom) {
				var scale = this.scale(zoom), untransformedPoint = this.transformation.untransform(point, scale);
				return this.projection.unproject(untransformedPoint);
			},
			project: function(latlng) {
				return this.projection.project(latlng);
			},
			unproject: function(point) {
				return this.projection.unproject(point);
			},
			scale: function(zoom) {
				return 256 * Math.pow(2, zoom);
			},
			zoom: function(scale) {
				return Math.log(scale / 256) / Math.LN2;
			},
			getProjectedBounds: function(zoom) {
				if (this.infinite) return null;
				var b = this.projection.bounds, s = this.scale(zoom);
				return new Bounds(this.transformation.transform(b.min, s), this.transformation.transform(b.max, s));
			},
			infinite: false,
			wrapLatLng: function(latlng) {
				var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
				return new LatLng(lat, lng, alt);
			},
			wrapLatLngBounds: function(bounds) {
				var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
				if (latShift === 0 && lngShift === 0) return bounds;
				var sw = bounds.getSouthWest(), ne = bounds.getNorthEast();
				return new LatLngBounds(new LatLng(sw.lat - latShift, sw.lng - lngShift), new LatLng(ne.lat - latShift, ne.lng - lngShift));
			}
		};
		var Earth = extend({}, CRS, {
			wrapLng: [-180, 180],
			R: 6371e3,
			distance: function(latlng1, latlng2) {
				var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				return this.R * c;
			}
		});
		var earthRadius = 6378137;
		var SphericalMercator = {
			R: earthRadius,
			MAX_LATITUDE: 85.0511287798,
			project: function(latlng) {
				var d = Math.PI / 180, max = this.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d);
				return new Point(this.R * latlng.lng * d, this.R * Math.log((1 + sin) / (1 - sin)) / 2);
			},
			unproject: function(point) {
				var d = 180 / Math.PI;
				return new LatLng((2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d, point.x * d / this.R);
			},
			bounds: (function() {
				var d = earthRadius * Math.PI;
				return new Bounds([-d, -d], [d, d]);
			})()
		};
		function Transformation(a, b, c, d) {
			if (isArray(a)) {
				this._a = a[0];
				this._b = a[1];
				this._c = a[2];
				this._d = a[3];
				return;
			}
			this._a = a;
			this._b = b;
			this._c = c;
			this._d = d;
		}
		Transformation.prototype = {
			transform: function(point, scale) {
				return this._transform(point.clone(), scale);
			},
			_transform: function(point, scale) {
				scale = scale || 1;
				point.x = scale * (this._a * point.x + this._b);
				point.y = scale * (this._c * point.y + this._d);
				return point;
			},
			untransform: function(point, scale) {
				scale = scale || 1;
				return new Point((point.x / scale - this._b) / this._a, (point.y / scale - this._d) / this._c);
			}
		};
		function toTransformation(a, b, c, d) {
			return new Transformation(a, b, c, d);
		}
		var EPSG3857 = extend({}, Earth, {
			code: "EPSG:3857",
			projection: SphericalMercator,
			transformation: function() {
				var scale = .5 / (Math.PI * SphericalMercator.R);
				return toTransformation(scale, .5, -scale, .5);
			}()
		});
		var EPSG900913 = extend({}, EPSG3857, { code: "EPSG:900913" });
		function svgCreate(name) {
			return document.createElementNS("http://www.w3.org/2000/svg", name);
		}
		function pointsToPath(rings, closed) {
			var str = "", i, j, len, len2, points, p;
			for (i = 0, len = rings.length; i < len; i++) {
				points = rings[i];
				for (j = 0, len2 = points.length; j < len2; j++) {
					p = points[j];
					str += (j ? "L" : "M") + p.x + " " + p.y;
				}
				str += closed ? Browser.svg ? "z" : "x" : "";
			}
			return str || "M0 0";
		}
		var style = document.documentElement.style;
		var ie = "ActiveXObject" in window;
		var ielt9 = ie && !document.addEventListener;
		var edge = "msLaunchUri" in navigator && !("documentMode" in document);
		var webkit = userAgentContains("webkit");
		var android = userAgentContains("android");
		var android23 = userAgentContains("android 2") || userAgentContains("android 3");
		var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
		var androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
		var opera = !!window.opera;
		var chrome = !edge && userAgentContains("chrome");
		var gecko = userAgentContains("gecko") && !webkit && !opera && !ie;
		var safari = !chrome && userAgentContains("safari");
		var phantom = userAgentContains("phantom");
		var opera12 = "OTransition" in style;
		var win = navigator.platform.indexOf("Win") === 0;
		var ie3d = ie && "transition" in style;
		var webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
		var gecko3d = "MozPerspective" in style;
		var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
		var mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
		var mobileWebkit = mobile && webkit;
		var mobileWebkit3d = mobile && webkit3d;
		var msPointer = !window.PointerEvent && window.MSPointerEvent;
		var pointer = !!(window.PointerEvent || msPointer);
		var touchNative = "ontouchstart" in window || !!window.TouchEvent;
		var touch = !window.L_NO_TOUCH && (touchNative || pointer);
		var mobileOpera = mobile && opera;
		var mobileGecko = mobile && gecko;
		var retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
		var passiveEvents = function() {
			var supportsPassiveOption = false;
			try {
				var opts = Object.defineProperty({}, "passive", { get: function() {
					supportsPassiveOption = true;
				} });
				window.addEventListener("testPassiveEventSupport", falseFn, opts);
				window.removeEventListener("testPassiveEventSupport", falseFn, opts);
			} catch (e) {}
			return supportsPassiveOption;
		}();
		var canvas$1 = function() {
			return !!document.createElement("canvas").getContext;
		}();
		var svg$1 = !!(document.createElementNS && svgCreate("svg").createSVGRect);
		var inlineSvg = !!svg$1 && (function() {
			var div = document.createElement("div");
			div.innerHTML = "<svg/>";
			return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
		})();
		var vml = !svg$1 && function() {
			try {
				var div = document.createElement("div");
				div.innerHTML = "<v:shape adj=\"1\"/>";
				var shape = div.firstChild;
				shape.style.behavior = "url(#default#VML)";
				return shape && typeof shape.adj === "object";
			} catch (e) {
				return false;
			}
		}();
		var mac = navigator.platform.indexOf("Mac") === 0;
		var linux = navigator.platform.indexOf("Linux") === 0;
		function userAgentContains(str) {
			return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
		}
		var Browser = {
			ie,
			ielt9,
			edge,
			webkit,
			android,
			android23,
			androidStock,
			opera,
			chrome,
			gecko,
			safari,
			phantom,
			opera12,
			win,
			ie3d,
			webkit3d,
			gecko3d,
			any3d,
			mobile,
			mobileWebkit,
			mobileWebkit3d,
			msPointer,
			pointer,
			touch,
			touchNative,
			mobileOpera,
			mobileGecko,
			retina,
			passiveEvents,
			canvas: canvas$1,
			svg: svg$1,
			vml,
			inlineSvg,
			mac,
			linux
		};
		var POINTER_DOWN = Browser.msPointer ? "MSPointerDown" : "pointerdown";
		var POINTER_MOVE = Browser.msPointer ? "MSPointerMove" : "pointermove";
		var POINTER_UP = Browser.msPointer ? "MSPointerUp" : "pointerup";
		var POINTER_CANCEL = Browser.msPointer ? "MSPointerCancel" : "pointercancel";
		var pEvent = {
			touchstart: POINTER_DOWN,
			touchmove: POINTER_MOVE,
			touchend: POINTER_UP,
			touchcancel: POINTER_CANCEL
		};
		var handle = {
			touchstart: _onPointerStart,
			touchmove: _handlePointer,
			touchend: _handlePointer,
			touchcancel: _handlePointer
		};
		var _pointers = {};
		var _pointerDocListener = false;
		function addPointerListener(obj, type, handler) {
			if (type === "touchstart") _addPointerDocListener();
			if (!handle[type]) {
				console.warn("wrong event specified:", type);
				return falseFn;
			}
			handler = handle[type].bind(this, handler);
			obj.addEventListener(pEvent[type], handler, false);
			return handler;
		}
		function removePointerListener(obj, type, handler) {
			if (!pEvent[type]) {
				console.warn("wrong event specified:", type);
				return;
			}
			obj.removeEventListener(pEvent[type], handler, false);
		}
		function _globalPointerDown(e) {
			_pointers[e.pointerId] = e;
		}
		function _globalPointerMove(e) {
			if (_pointers[e.pointerId]) _pointers[e.pointerId] = e;
		}
		function _globalPointerUp(e) {
			delete _pointers[e.pointerId];
		}
		function _addPointerDocListener() {
			if (!_pointerDocListener) {
				document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
				document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
				document.addEventListener(POINTER_UP, _globalPointerUp, true);
				document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
				_pointerDocListener = true;
			}
		}
		function _handlePointer(handler, e) {
			if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || "mouse")) return;
			e.touches = [];
			for (var i in _pointers) e.touches.push(_pointers[i]);
			e.changedTouches = [e];
			handler(e);
		}
		function _onPointerStart(handler, e) {
			if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) preventDefault(e);
			_handlePointer(handler, e);
		}
		function makeDblclick(event) {
			var newEvent = {}, prop, i;
			for (i in event) {
				prop = event[i];
				newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
			}
			event = newEvent;
			newEvent.type = "dblclick";
			newEvent.detail = 2;
			newEvent.isTrusted = false;
			newEvent._simulated = true;
			return newEvent;
		}
		var delay = 200;
		function addDoubleTapListener(obj, handler) {
			obj.addEventListener("dblclick", handler);
			var last = 0, detail;
			function simDblclick(e) {
				if (e.detail !== 1) {
					detail = e.detail;
					return;
				}
				if (e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) return;
				var path = getPropagationPath(e);
				if (path.some(function(el) {
					return el instanceof HTMLLabelElement && el.attributes.for;
				}) && !path.some(function(el) {
					return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
				})) return;
				var now = Date.now();
				if (now - last <= delay) {
					detail++;
					if (detail === 2) handler(makeDblclick(e));
				} else detail = 1;
				last = now;
			}
			obj.addEventListener("click", simDblclick);
			return {
				dblclick: handler,
				simDblclick
			};
		}
		function removeDoubleTapListener(obj, handlers) {
			obj.removeEventListener("dblclick", handlers.dblclick);
			obj.removeEventListener("click", handlers.simDblclick);
		}
		var TRANSFORM = testProp([
			"transform",
			"webkitTransform",
			"OTransform",
			"MozTransform",
			"msTransform"
		]);
		var TRANSITION = testProp([
			"webkitTransition",
			"transition",
			"OTransition",
			"MozTransition",
			"msTransition"
		]);
		var TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
		function get(id) {
			return typeof id === "string" ? document.getElementById(id) : id;
		}
		function getStyle(el, style) {
			var value = el.style[style] || el.currentStyle && el.currentStyle[style];
			if ((!value || value === "auto") && document.defaultView) {
				var css = document.defaultView.getComputedStyle(el, null);
				value = css ? css[style] : null;
			}
			return value === "auto" ? null : value;
		}
		function create$1(tagName, className, container) {
			var el = document.createElement(tagName);
			el.className = className || "";
			if (container) container.appendChild(el);
			return el;
		}
		function remove(el) {
			var parent = el.parentNode;
			if (parent) parent.removeChild(el);
		}
		function empty(el) {
			while (el.firstChild) el.removeChild(el.firstChild);
		}
		function toFront(el) {
			var parent = el.parentNode;
			if (parent && parent.lastChild !== el) parent.appendChild(el);
		}
		function toBack(el) {
			var parent = el.parentNode;
			if (parent && parent.firstChild !== el) parent.insertBefore(el, parent.firstChild);
		}
		function hasClass(el, name) {
			if (el.classList !== void 0) return el.classList.contains(name);
			var className = getClass(el);
			return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
		}
		function addClass(el, name) {
			if (el.classList !== void 0) {
				var classes = splitWords(name);
				for (var i = 0, len = classes.length; i < len; i++) el.classList.add(classes[i]);
			} else if (!hasClass(el, name)) {
				var className = getClass(el);
				setClass(el, (className ? className + " " : "") + name);
			}
		}
		function removeClass(el, name) {
			if (el.classList !== void 0) el.classList.remove(name);
			else setClass(el, trim((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
		}
		function setClass(el, name) {
			if (el.className.baseVal === void 0) el.className = name;
			else el.className.baseVal = name;
		}
		function getClass(el) {
			if (el.correspondingElement) el = el.correspondingElement;
			return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
		}
		function setOpacity(el, value) {
			if ("opacity" in el.style) el.style.opacity = value;
			else if ("filter" in el.style) _setOpacityIE(el, value);
		}
		function _setOpacityIE(el, value) {
			var filter = false, filterName = "DXImageTransform.Microsoft.Alpha";
			try {
				filter = el.filters.item(filterName);
			} catch (e) {
				if (value === 1) return;
			}
			value = Math.round(value * 100);
			if (filter) {
				filter.Enabled = value !== 100;
				filter.Opacity = value;
			} else el.style.filter += " progid:" + filterName + "(opacity=" + value + ")";
		}
		function testProp(props) {
			var style = document.documentElement.style;
			for (var i = 0; i < props.length; i++) if (props[i] in style) return props[i];
			return false;
		}
		function setTransform(el, offset, scale) {
			var pos = offset || new Point(0, 0);
			el.style[TRANSFORM] = (Browser.ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale ? " scale(" + scale + ")" : "");
		}
		function setPosition(el, point) {
			el._leaflet_pos = point;
			if (Browser.any3d) setTransform(el, point);
			else {
				el.style.left = point.x + "px";
				el.style.top = point.y + "px";
			}
		}
		function getPosition(el) {
			return el._leaflet_pos || new Point(0, 0);
		}
		var disableTextSelection;
		var enableTextSelection;
		var _userSelect;
		if ("onselectstart" in document) {
			disableTextSelection = function() {
				on(window, "selectstart", preventDefault);
			};
			enableTextSelection = function() {
				off(window, "selectstart", preventDefault);
			};
		} else {
			var userSelectProperty = testProp([
				"userSelect",
				"WebkitUserSelect",
				"OUserSelect",
				"MozUserSelect",
				"msUserSelect"
			]);
			disableTextSelection = function() {
				if (userSelectProperty) {
					var style = document.documentElement.style;
					_userSelect = style[userSelectProperty];
					style[userSelectProperty] = "none";
				}
			};
			enableTextSelection = function() {
				if (userSelectProperty) {
					document.documentElement.style[userSelectProperty] = _userSelect;
					_userSelect = void 0;
				}
			};
		}
		function disableImageDrag() {
			on(window, "dragstart", preventDefault);
		}
		function enableImageDrag() {
			off(window, "dragstart", preventDefault);
		}
		var _outlineElement, _outlineStyle;
		function preventOutline(element) {
			while (element.tabIndex === -1) element = element.parentNode;
			if (!element.style) return;
			restoreOutline();
			_outlineElement = element;
			_outlineStyle = element.style.outlineStyle;
			element.style.outlineStyle = "none";
			on(window, "keydown", restoreOutline);
		}
		function restoreOutline() {
			if (!_outlineElement) return;
			_outlineElement.style.outlineStyle = _outlineStyle;
			_outlineElement = void 0;
			_outlineStyle = void 0;
			off(window, "keydown", restoreOutline);
		}
		function getSizedParentNode(element) {
			do
				element = element.parentNode;
			while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
			return element;
		}
		function getScale(element) {
			var rect = element.getBoundingClientRect();
			return {
				x: rect.width / element.offsetWidth || 1,
				y: rect.height / element.offsetHeight || 1,
				boundingClientRect: rect
			};
		}
		var DomUtil = {
			__proto__: null,
			TRANSFORM,
			TRANSITION,
			TRANSITION_END,
			get,
			getStyle,
			create: create$1,
			remove,
			empty,
			toFront,
			toBack,
			hasClass,
			addClass,
			removeClass,
			setClass,
			getClass,
			setOpacity,
			testProp,
			setTransform,
			setPosition,
			getPosition,
			get disableTextSelection() {
				return disableTextSelection;
			},
			get enableTextSelection() {
				return enableTextSelection;
			},
			disableImageDrag,
			enableImageDrag,
			preventOutline,
			restoreOutline,
			getSizedParentNode,
			getScale
		};
		function on(obj, types, fn, context) {
			if (types && typeof types === "object") for (var type in types) addOne(obj, type, types[type], fn);
			else {
				types = splitWords(types);
				for (var i = 0, len = types.length; i < len; i++) addOne(obj, types[i], fn, context);
			}
			return this;
		}
		var eventsKey = "_leaflet_events";
		function off(obj, types, fn, context) {
			if (arguments.length === 1) {
				batchRemove(obj);
				delete obj[eventsKey];
			} else if (types && typeof types === "object") for (var type in types) removeOne(obj, type, types[type], fn);
			else {
				types = splitWords(types);
				if (arguments.length === 2) batchRemove(obj, function(type) {
					return indexOf(types, type) !== -1;
				});
				else for (var i = 0, len = types.length; i < len; i++) removeOne(obj, types[i], fn, context);
			}
			return this;
		}
		function batchRemove(obj, filterFn) {
			for (var id in obj[eventsKey]) {
				var type = id.split(/\d/)[0];
				if (!filterFn || filterFn(type)) removeOne(obj, type, null, null, id);
			}
		}
		var mouseSubst = {
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			wheel: !("onwheel" in window) && "mousewheel"
		};
		function addOne(obj, type, fn, context) {
			var id = type + stamp(fn) + (context ? "_" + stamp(context) : "");
			if (obj[eventsKey] && obj[eventsKey][id]) return this;
			var handler = function(e) {
				return fn.call(context || obj, e || window.event);
			};
			var originalHandler = handler;
			if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) handler = addPointerListener(obj, type, handler);
			else if (Browser.touch && type === "dblclick") handler = addDoubleTapListener(obj, handler);
			else if ("addEventListener" in obj) if (type === "touchstart" || type === "touchmove" || type === "wheel" || type === "mousewheel") obj.addEventListener(mouseSubst[type] || type, handler, Browser.passiveEvents ? { passive: false } : false);
			else if (type === "mouseenter" || type === "mouseleave") {
				handler = function(e) {
					e = e || window.event;
					if (isExternalTarget(obj, e)) originalHandler(e);
				};
				obj.addEventListener(mouseSubst[type], handler, false);
			} else obj.addEventListener(type, originalHandler, false);
			else obj.attachEvent("on" + type, handler);
			obj[eventsKey] = obj[eventsKey] || {};
			obj[eventsKey][id] = handler;
		}
		function removeOne(obj, type, fn, context, id) {
			id = id || type + stamp(fn) + (context ? "_" + stamp(context) : "");
			var handler = obj[eventsKey] && obj[eventsKey][id];
			if (!handler) return this;
			if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) removePointerListener(obj, type, handler);
			else if (Browser.touch && type === "dblclick") removeDoubleTapListener(obj, handler);
			else if ("removeEventListener" in obj) obj.removeEventListener(mouseSubst[type] || type, handler, false);
			else obj.detachEvent("on" + type, handler);
			obj[eventsKey][id] = null;
		}
		function stopPropagation(e) {
			if (e.stopPropagation) e.stopPropagation();
			else if (e.originalEvent) e.originalEvent._stopped = true;
			else e.cancelBubble = true;
			return this;
		}
		function disableScrollPropagation(el) {
			addOne(el, "wheel", stopPropagation);
			return this;
		}
		function disableClickPropagation(el) {
			on(el, "mousedown touchstart dblclick contextmenu", stopPropagation);
			el["_leaflet_disable_click"] = true;
			return this;
		}
		function preventDefault(e) {
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			return this;
		}
		function stop(e) {
			preventDefault(e);
			stopPropagation(e);
			return this;
		}
		function getPropagationPath(ev) {
			if (ev.composedPath) return ev.composedPath();
			var path = [];
			var el = ev.target;
			while (el) {
				path.push(el);
				el = el.parentNode;
			}
			return path;
		}
		function getMousePosition(e, container) {
			if (!container) return new Point(e.clientX, e.clientY);
			var scale = getScale(container), offset = scale.boundingClientRect;
			return new Point((e.clientX - offset.left) / scale.x - container.clientLeft, (e.clientY - offset.top) / scale.y - container.clientTop);
		}
		var wheelPxFactor = Browser.linux && Browser.chrome ? window.devicePixelRatio : Browser.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
		function getWheelDelta(e) {
			return Browser.edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / wheelPxFactor : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0;
		}
		function isExternalTarget(el, e) {
			var related = e.relatedTarget;
			if (!related) return true;
			try {
				while (related && related !== el) related = related.parentNode;
			} catch (err) {
				return false;
			}
			return related !== el;
		}
		var DomEvent = {
			__proto__: null,
			on,
			off,
			stopPropagation,
			disableScrollPropagation,
			disableClickPropagation,
			preventDefault,
			stop,
			getPropagationPath,
			getMousePosition,
			getWheelDelta,
			isExternalTarget,
			addListener: on,
			removeListener: off
		};
		var PosAnimation = Evented.extend({
			run: function(el, newPos, duration, easeLinearity) {
				this.stop();
				this._el = el;
				this._inProgress = true;
				this._duration = duration || .25;
				this._easeOutPower = 1 / Math.max(easeLinearity || .5, .2);
				this._startPos = getPosition(el);
				this._offset = newPos.subtract(this._startPos);
				this._startTime = +/* @__PURE__ */ new Date();
				this.fire("start");
				this._animate();
			},
			stop: function() {
				if (!this._inProgress) return;
				this._step(true);
				this._complete();
			},
			_animate: function() {
				this._animId = requestAnimFrame(this._animate, this);
				this._step();
			},
			_step: function(round) {
				var elapsed = +/* @__PURE__ */ new Date() - this._startTime, duration = this._duration * 1e3;
				if (elapsed < duration) this._runFrame(this._easeOut(elapsed / duration), round);
				else {
					this._runFrame(1);
					this._complete();
				}
			},
			_runFrame: function(progress, round) {
				var pos = this._startPos.add(this._offset.multiplyBy(progress));
				if (round) pos._round();
				setPosition(this._el, pos);
				this.fire("step");
			},
			_complete: function() {
				cancelAnimFrame(this._animId);
				this._inProgress = false;
				this.fire("end");
			},
			_easeOut: function(t) {
				return 1 - Math.pow(1 - t, this._easeOutPower);
			}
		});
		var Map = Evented.extend({
			options: {
				crs: EPSG3857,
				center: void 0,
				zoom: void 0,
				minZoom: void 0,
				maxZoom: void 0,
				layers: [],
				maxBounds: void 0,
				renderer: void 0,
				zoomAnimation: true,
				zoomAnimationThreshold: 4,
				fadeAnimation: true,
				markerZoomAnimation: true,
				transform3DLimit: 8388608,
				zoomSnap: 1,
				zoomDelta: 1,
				trackResize: true
			},
			initialize: function(id, options) {
				options = setOptions(this, options);
				this._handlers = [];
				this._layers = {};
				this._zoomBoundLayers = {};
				this._sizeChanged = true;
				this._initContainer(id);
				this._initLayout();
				this._onResize = bind(this._onResize, this);
				this._initEvents();
				if (options.maxBounds) this.setMaxBounds(options.maxBounds);
				if (options.zoom !== void 0) this._zoom = this._limitZoom(options.zoom);
				if (options.center && options.zoom !== void 0) this.setView(toLatLng(options.center), options.zoom, { reset: true });
				this.callInitHooks();
				this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera && this.options.zoomAnimation;
				if (this._zoomAnimated) {
					this._createAnimProxy();
					on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
				}
				this._addLayers(this.options.layers);
			},
			setView: function(center, zoom, options) {
				zoom = zoom === void 0 ? this._zoom : this._limitZoom(zoom);
				center = this._limitCenter(toLatLng(center), zoom, this.options.maxBounds);
				options = options || {};
				this._stop();
				if (this._loaded && !options.reset && options !== true) {
					if (options.animate !== void 0) {
						options.zoom = extend({ animate: options.animate }, options.zoom);
						options.pan = extend({
							animate: options.animate,
							duration: options.duration
						}, options.pan);
					}
					if (this._zoom !== zoom ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) : this._tryAnimatedPan(center, options.pan)) {
						clearTimeout(this._sizeTimer);
						return this;
					}
				}
				this._resetView(center, zoom, options.pan && options.pan.noMoveStart);
				return this;
			},
			setZoom: function(zoom, options) {
				if (!this._loaded) {
					this._zoom = zoom;
					return this;
				}
				return this.setView(this.getCenter(), zoom, { zoom: options });
			},
			zoomIn: function(delta, options) {
				delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
				return this.setZoom(this._zoom + delta, options);
			},
			zoomOut: function(delta, options) {
				delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
				return this.setZoom(this._zoom - delta, options);
			},
			setZoomAround: function(latlng, zoom, options) {
				var scale = this.getZoomScale(zoom), viewHalf = this.getSize().divideBy(2), centerOffset = (latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng)).subtract(viewHalf).multiplyBy(1 - 1 / scale), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
				return this.setView(newCenter, zoom, { zoom: options });
			},
			_getBoundsCenterZoom: function(bounds, options) {
				options = options || {};
				bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
				var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
				zoom = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom) : zoom;
				if (zoom === Infinity) return {
					center: bounds.getCenter(),
					zoom
				};
				var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom), nePoint = this.project(bounds.getNorthEast(), zoom);
				return {
					center: this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom),
					zoom
				};
			},
			fitBounds: function(bounds, options) {
				bounds = toLatLngBounds(bounds);
				if (!bounds.isValid()) throw new Error("Bounds are not valid.");
				var target = this._getBoundsCenterZoom(bounds, options);
				return this.setView(target.center, target.zoom, options);
			},
			fitWorld: function(options) {
				return this.fitBounds([[-90, -180], [90, 180]], options);
			},
			panTo: function(center, options) {
				return this.setView(center, this._zoom, { pan: options });
			},
			panBy: function(offset, options) {
				offset = toPoint(offset).round();
				options = options || {};
				if (!offset.x && !offset.y) return this.fire("moveend");
				if (options.animate !== true && !this.getSize().contains(offset)) {
					this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
					return this;
				}
				if (!this._panAnim) {
					this._panAnim = new PosAnimation();
					this._panAnim.on({
						"step": this._onPanTransitionStep,
						"end": this._onPanTransitionEnd
					}, this);
				}
				if (!options.noMoveStart) this.fire("movestart");
				if (options.animate !== false) {
					addClass(this._mapPane, "leaflet-pan-anim");
					var newPos = this._getMapPanePos().subtract(offset).round();
					this._panAnim.run(this._mapPane, newPos, options.duration || .25, options.easeLinearity);
				} else {
					this._rawPanBy(offset);
					this.fire("move").fire("moveend");
				}
				return this;
			},
			flyTo: function(targetCenter, targetZoom, options) {
				options = options || {};
				if (options.animate === false || !Browser.any3d) return this.setView(targetCenter, targetZoom, options);
				this._stop();
				var from = this.project(this.getCenter()), to = this.project(targetCenter), size = this.getSize(), startZoom = this._zoom;
				targetCenter = toLatLng(targetCenter);
				targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
				var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from) || 1, rho = 1.42, rho2 = rho * rho;
				function r(i) {
					var s1 = i ? -1 : 1, s2 = i ? w1 : w0, b = (w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1) / (2 * s2 * rho2 * u1), sq = Math.sqrt(b * b + 1) - b;
					return sq < 1e-9 ? -18 : Math.log(sq);
				}
				function sinh(n) {
					return (Math.exp(n) - Math.exp(-n)) / 2;
				}
				function cosh(n) {
					return (Math.exp(n) + Math.exp(-n)) / 2;
				}
				function tanh(n) {
					return sinh(n) / cosh(n);
				}
				var r0 = r(0);
				function w(s) {
					return w0 * (cosh(r0) / cosh(r0 + rho * s));
				}
				function u(s) {
					return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2;
				}
				function easeOut(t) {
					return 1 - Math.pow(1 - t, 1.5);
				}
				var start = Date.now(), S = (r(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S * .8;
				function frame() {
					var t = (Date.now() - start) / duration, s = easeOut(t) * S;
					if (t <= 1) {
						this._flyToFrame = requestAnimFrame(frame, this);
						this._move(this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom), this.getScaleZoom(w0 / w(s), startZoom), { flyTo: true });
					} else this._move(targetCenter, targetZoom)._moveEnd(true);
				}
				this._moveStart(true, options.noMoveStart);
				frame.call(this);
				return this;
			},
			flyToBounds: function(bounds, options) {
				var target = this._getBoundsCenterZoom(bounds, options);
				return this.flyTo(target.center, target.zoom, options);
			},
			setMaxBounds: function(bounds) {
				bounds = toLatLngBounds(bounds);
				if (this.listens("moveend", this._panInsideMaxBounds)) this.off("moveend", this._panInsideMaxBounds);
				if (!bounds.isValid()) {
					this.options.maxBounds = null;
					return this;
				}
				this.options.maxBounds = bounds;
				if (this._loaded) this._panInsideMaxBounds();
				return this.on("moveend", this._panInsideMaxBounds);
			},
			setMinZoom: function(zoom) {
				var oldZoom = this.options.minZoom;
				this.options.minZoom = zoom;
				if (this._loaded && oldZoom !== zoom) {
					this.fire("zoomlevelschange");
					if (this.getZoom() < this.options.minZoom) return this.setZoom(zoom);
				}
				return this;
			},
			setMaxZoom: function(zoom) {
				var oldZoom = this.options.maxZoom;
				this.options.maxZoom = zoom;
				if (this._loaded && oldZoom !== zoom) {
					this.fire("zoomlevelschange");
					if (this.getZoom() > this.options.maxZoom) return this.setZoom(zoom);
				}
				return this;
			},
			panInsideBounds: function(bounds, options) {
				this._enforcingBounds = true;
				var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
				if (!center.equals(newCenter)) this.panTo(newCenter, options);
				this._enforcingBounds = false;
				return this;
			},
			panInside: function(latlng, options) {
				options = options || {};
				var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), pixelCenter = this.project(this.getCenter()), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]), paddedSize = paddedBounds.getSize();
				if (!paddedBounds.contains(pixelPoint)) {
					this._enforcingBounds = true;
					var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
					var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
					pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
					pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
					this.panTo(this.unproject(pixelCenter), options);
					this._enforcingBounds = false;
				}
				return this;
			},
			invalidateSize: function(options) {
				if (!this._loaded) return this;
				options = extend({
					animate: false,
					pan: true
				}, options === true ? { animate: true } : options);
				var oldSize = this.getSize();
				this._sizeChanged = true;
				this._lastCenter = null;
				var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
				if (!offset.x && !offset.y) return this;
				if (options.animate && options.pan) this.panBy(offset);
				else {
					if (options.pan) this._rawPanBy(offset);
					this.fire("move");
					if (options.debounceMoveend) {
						clearTimeout(this._sizeTimer);
						this._sizeTimer = setTimeout(bind(this.fire, this, "moveend"), 200);
					} else this.fire("moveend");
				}
				return this.fire("resize", {
					oldSize,
					newSize
				});
			},
			stop: function() {
				this.setZoom(this._limitZoom(this._zoom));
				if (!this.options.zoomSnap) this.fire("viewreset");
				return this._stop();
			},
			locate: function(options) {
				options = this._locateOptions = extend({
					timeout: 1e4,
					watch: false
				}, options);
				if (!("geolocation" in navigator)) {
					this._handleGeolocationError({
						code: 0,
						message: "Geolocation not supported."
					});
					return this;
				}
				var onResponse = bind(this._handleGeolocationResponse, this), onError = bind(this._handleGeolocationError, this);
				if (options.watch) this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
				else navigator.geolocation.getCurrentPosition(onResponse, onError, options);
				return this;
			},
			stopLocate: function() {
				if (navigator.geolocation && navigator.geolocation.clearWatch) navigator.geolocation.clearWatch(this._locationWatchId);
				if (this._locateOptions) this._locateOptions.setView = false;
				return this;
			},
			_handleGeolocationError: function(error) {
				if (!this._container._leaflet_id) return;
				var c = error.code, message = error.message || (c === 1 ? "permission denied" : c === 2 ? "position unavailable" : "timeout");
				if (this._locateOptions.setView && !this._loaded) this.fitWorld();
				this.fire("locationerror", {
					code: c,
					message: "Geolocation error: " + message + "."
				});
			},
			_handleGeolocationResponse: function(pos) {
				if (!this._container._leaflet_id) return;
				var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
				if (options.setView) {
					var zoom = this.getBoundsZoom(bounds);
					this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
				}
				var data = {
					latlng,
					bounds,
					timestamp: pos.timestamp
				};
				for (var i in pos.coords) if (typeof pos.coords[i] === "number") data[i] = pos.coords[i];
				this.fire("locationfound", data);
			},
			addHandler: function(name, HandlerClass) {
				if (!HandlerClass) return this;
				var handler = this[name] = new HandlerClass(this);
				this._handlers.push(handler);
				if (this.options[name]) handler.enable();
				return this;
			},
			remove: function() {
				this._initEvents(true);
				if (this.options.maxBounds) this.off("moveend", this._panInsideMaxBounds);
				if (this._containerId !== this._container._leaflet_id) throw new Error("Map container is being reused by another instance");
				try {
					delete this._container._leaflet_id;
					delete this._containerId;
				} catch (e) {
					this._container._leaflet_id = void 0;
					this._containerId = void 0;
				}
				if (this._locationWatchId !== void 0) this.stopLocate();
				this._stop();
				remove(this._mapPane);
				if (this._clearControlPos) this._clearControlPos();
				if (this._resizeRequest) {
					cancelAnimFrame(this._resizeRequest);
					this._resizeRequest = null;
				}
				this._clearHandlers();
				if (this._loaded) this.fire("unload");
				var i;
				for (i in this._layers) this._layers[i].remove();
				for (i in this._panes) remove(this._panes[i]);
				this._layers = [];
				this._panes = [];
				delete this._mapPane;
				delete this._renderer;
				return this;
			},
			createPane: function(name, container) {
				var pane = create$1("div", "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), container || this._mapPane);
				if (name) this._panes[name] = pane;
				return pane;
			},
			getCenter: function() {
				this._checkIfLoaded();
				if (this._lastCenter && !this._moved()) return this._lastCenter.clone();
				return this.layerPointToLatLng(this._getCenterLayerPoint());
			},
			getZoom: function() {
				return this._zoom;
			},
			getBounds: function() {
				var bounds = this.getPixelBounds();
				return new LatLngBounds(this.unproject(bounds.getBottomLeft()), this.unproject(bounds.getTopRight()));
			},
			getMinZoom: function() {
				return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
			},
			getMaxZoom: function() {
				return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
			},
			getBoundsZoom: function(bounds, inside, padding) {
				bounds = toLatLngBounds(bounds);
				padding = toPoint(padding || [0, 0]);
				var zoom = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se, zoom), this.project(nw, zoom)).getSize(), snap = Browser.any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
				zoom = this.getScaleZoom(scale, zoom);
				if (snap) {
					zoom = Math.round(zoom / (snap / 100)) * (snap / 100);
					zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
				}
				return Math.max(min, Math.min(max, zoom));
			},
			getSize: function() {
				if (!this._size || this._sizeChanged) {
					this._size = new Point(this._container.clientWidth || 0, this._container.clientHeight || 0);
					this._sizeChanged = false;
				}
				return this._size.clone();
			},
			getPixelBounds: function(center, zoom) {
				var topLeftPoint = this._getTopLeftPoint(center, zoom);
				return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
			},
			getPixelOrigin: function() {
				this._checkIfLoaded();
				return this._pixelOrigin;
			},
			getPixelWorldBounds: function(zoom) {
				return this.options.crs.getProjectedBounds(zoom === void 0 ? this.getZoom() : zoom);
			},
			getPane: function(pane) {
				return typeof pane === "string" ? this._panes[pane] : pane;
			},
			getPanes: function() {
				return this._panes;
			},
			getContainer: function() {
				return this._container;
			},
			getZoomScale: function(toZoom, fromZoom) {
				var crs = this.options.crs;
				fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
				return crs.scale(toZoom) / crs.scale(fromZoom);
			},
			getScaleZoom: function(scale, fromZoom) {
				var crs = this.options.crs;
				fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
				var zoom = crs.zoom(scale * crs.scale(fromZoom));
				return isNaN(zoom) ? Infinity : zoom;
			},
			project: function(latlng, zoom) {
				zoom = zoom === void 0 ? this._zoom : zoom;
				return this.options.crs.latLngToPoint(toLatLng(latlng), zoom);
			},
			unproject: function(point, zoom) {
				zoom = zoom === void 0 ? this._zoom : zoom;
				return this.options.crs.pointToLatLng(toPoint(point), zoom);
			},
			layerPointToLatLng: function(point) {
				var projectedPoint = toPoint(point).add(this.getPixelOrigin());
				return this.unproject(projectedPoint);
			},
			latLngToLayerPoint: function(latlng) {
				return this.project(toLatLng(latlng))._round()._subtract(this.getPixelOrigin());
			},
			wrapLatLng: function(latlng) {
				return this.options.crs.wrapLatLng(toLatLng(latlng));
			},
			wrapLatLngBounds: function(latlng) {
				return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
			},
			distance: function(latlng1, latlng2) {
				return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
			},
			containerPointToLayerPoint: function(point) {
				return toPoint(point).subtract(this._getMapPanePos());
			},
			layerPointToContainerPoint: function(point) {
				return toPoint(point).add(this._getMapPanePos());
			},
			containerPointToLatLng: function(point) {
				var layerPoint = this.containerPointToLayerPoint(toPoint(point));
				return this.layerPointToLatLng(layerPoint);
			},
			latLngToContainerPoint: function(latlng) {
				return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
			},
			mouseEventToContainerPoint: function(e) {
				return getMousePosition(e, this._container);
			},
			mouseEventToLayerPoint: function(e) {
				return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
			},
			mouseEventToLatLng: function(e) {
				return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
			},
			_initContainer: function(id) {
				var container = this._container = get(id);
				if (!container) throw new Error("Map container not found.");
				else if (container._leaflet_id) throw new Error("Map container is already initialized.");
				on(container, "scroll", this._onScroll, this);
				this._containerId = stamp(container);
			},
			_initLayout: function() {
				var container = this._container;
				this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;
				addClass(container, "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") + (Browser.retina ? " leaflet-retina" : "") + (Browser.ielt9 ? " leaflet-oldie" : "") + (Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
				var position = getStyle(container, "position");
				if (position !== "absolute" && position !== "relative" && position !== "fixed" && position !== "sticky") container.style.position = "relative";
				this._initPanes();
				if (this._initControlPos) this._initControlPos();
			},
			_initPanes: function() {
				var panes = this._panes = {};
				this._paneRenderers = {};
				this._mapPane = this.createPane("mapPane", this._container);
				setPosition(this._mapPane, new Point(0, 0));
				this.createPane("tilePane");
				this.createPane("overlayPane");
				this.createPane("shadowPane");
				this.createPane("markerPane");
				this.createPane("tooltipPane");
				this.createPane("popupPane");
				if (!this.options.markerZoomAnimation) {
					addClass(panes.markerPane, "leaflet-zoom-hide");
					addClass(panes.shadowPane, "leaflet-zoom-hide");
				}
			},
			_resetView: function(center, zoom, noMoveStart) {
				setPosition(this._mapPane, new Point(0, 0));
				var loading = !this._loaded;
				this._loaded = true;
				zoom = this._limitZoom(zoom);
				this.fire("viewprereset");
				var zoomChanged = this._zoom !== zoom;
				this._moveStart(zoomChanged, noMoveStart)._move(center, zoom)._moveEnd(zoomChanged);
				this.fire("viewreset");
				if (loading) this.fire("load");
			},
			_moveStart: function(zoomChanged, noMoveStart) {
				if (zoomChanged) this.fire("zoomstart");
				if (!noMoveStart) this.fire("movestart");
				return this;
			},
			_move: function(center, zoom, data, supressEvent) {
				if (zoom === void 0) zoom = this._zoom;
				var zoomChanged = this._zoom !== zoom;
				this._zoom = zoom;
				this._lastCenter = center;
				this._pixelOrigin = this._getNewPixelOrigin(center);
				if (!supressEvent) {
					if (zoomChanged || data && data.pinch) this.fire("zoom", data);
					this.fire("move", data);
				} else if (data && data.pinch) this.fire("zoom", data);
				return this;
			},
			_moveEnd: function(zoomChanged) {
				if (zoomChanged) this.fire("zoomend");
				return this.fire("moveend");
			},
			_stop: function() {
				cancelAnimFrame(this._flyToFrame);
				if (this._panAnim) this._panAnim.stop();
				return this;
			},
			_rawPanBy: function(offset) {
				setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
			},
			_getZoomSpan: function() {
				return this.getMaxZoom() - this.getMinZoom();
			},
			_panInsideMaxBounds: function() {
				if (!this._enforcingBounds) this.panInsideBounds(this.options.maxBounds);
			},
			_checkIfLoaded: function() {
				if (!this._loaded) throw new Error("Set map center and zoom first.");
			},
			_initEvents: function(remove) {
				this._targets = {};
				this._targets[stamp(this._container)] = this;
				var onOff = remove ? off : on;
				onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
				if (this.options.trackResize) onOff(window, "resize", this._onResize, this);
				if (Browser.any3d && this.options.transform3DLimit) (remove ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
			},
			_onResize: function() {
				cancelAnimFrame(this._resizeRequest);
				this._resizeRequest = requestAnimFrame(function() {
					this.invalidateSize({ debounceMoveend: true });
				}, this);
			},
			_onScroll: function() {
				this._container.scrollTop = 0;
				this._container.scrollLeft = 0;
			},
			_onMoveEnd: function() {
				var pos = this._getMapPanePos();
				if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) this._resetView(this.getCenter(), this.getZoom());
			},
			_findEventTargets: function(e, type) {
				var targets = [], target, isHover = type === "mouseout" || type === "mouseover", src = e.target || e.srcElement, dragging = false;
				while (src) {
					target = this._targets[stamp(src)];
					if (target && (type === "click" || type === "preclick") && this._draggableMoved(target)) {
						dragging = true;
						break;
					}
					if (target && target.listens(type, true)) {
						if (isHover && !isExternalTarget(src, e)) break;
						targets.push(target);
						if (isHover) break;
					}
					if (src === this._container) break;
					src = src.parentNode;
				}
				if (!targets.length && !dragging && !isHover && this.listens(type, true)) targets = [this];
				return targets;
			},
			_isClickDisabled: function(el) {
				while (el && el !== this._container) {
					if (el["_leaflet_disable_click"]) return true;
					el = el.parentNode;
				}
			},
			_handleDOMEvent: function(e) {
				var el = e.target || e.srcElement;
				if (!this._loaded || el["_leaflet_disable_events"] || e.type === "click" && this._isClickDisabled(el)) return;
				var type = e.type;
				if (type === "mousedown") preventOutline(el);
				this._fireDOMEvent(e, type);
			},
			_mouseEvents: [
				"click",
				"dblclick",
				"mouseover",
				"mouseout",
				"contextmenu"
			],
			_fireDOMEvent: function(e, type, canvasTargets) {
				if (e.type === "click") {
					var synth = extend({}, e);
					synth.type = "preclick";
					this._fireDOMEvent(synth, synth.type, canvasTargets);
				}
				var targets = this._findEventTargets(e, type);
				if (canvasTargets) {
					var filtered = [];
					for (var i = 0; i < canvasTargets.length; i++) if (canvasTargets[i].listens(type, true)) filtered.push(canvasTargets[i]);
					targets = filtered.concat(targets);
				}
				if (!targets.length) return;
				if (type === "contextmenu") preventDefault(e);
				var target = targets[0];
				var data = { originalEvent: e };
				if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
					var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
					data.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
					data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
					data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
				}
				for (i = 0; i < targets.length; i++) {
					targets[i].fire(type, data, true);
					if (data.originalEvent._stopped || targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1) return;
				}
			},
			_draggableMoved: function(obj) {
				obj = obj.dragging && obj.dragging.enabled() ? obj : this;
				return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
			},
			_clearHandlers: function() {
				for (var i = 0, len = this._handlers.length; i < len; i++) this._handlers[i].disable();
			},
			whenReady: function(callback, context) {
				if (this._loaded) callback.call(context || this, { target: this });
				else this.on("load", callback, context);
				return this;
			},
			_getMapPanePos: function() {
				return getPosition(this._mapPane) || new Point(0, 0);
			},
			_moved: function() {
				var pos = this._getMapPanePos();
				return pos && !pos.equals([0, 0]);
			},
			_getTopLeftPoint: function(center, zoom) {
				return (center && zoom !== void 0 ? this._getNewPixelOrigin(center, zoom) : this.getPixelOrigin()).subtract(this._getMapPanePos());
			},
			_getNewPixelOrigin: function(center, zoom) {
				var viewHalf = this.getSize()._divideBy(2);
				return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
			},
			_latLngToNewLayerPoint: function(latlng, zoom, center) {
				var topLeft = this._getNewPixelOrigin(center, zoom);
				return this.project(latlng, zoom)._subtract(topLeft);
			},
			_latLngBoundsToNewLayerBounds: function(latLngBounds, zoom, center) {
				var topLeft = this._getNewPixelOrigin(center, zoom);
				return toBounds([
					this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
					this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
					this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
					this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
				]);
			},
			_getCenterLayerPoint: function() {
				return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
			},
			_getCenterOffset: function(latlng) {
				return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
			},
			_limitCenter: function(center, zoom, bounds) {
				if (!bounds) return center;
				var centerPoint = this.project(center, zoom), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom);
				if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) return center;
				return this.unproject(centerPoint.add(offset), zoom);
			},
			_limitOffset: function(offset, bounds) {
				if (!bounds) return offset;
				var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
				return offset.add(this._getBoundsOffset(newBounds, bounds));
			},
			_getBoundsOffset: function(pxBounds, maxBounds, zoom) {
				var projectedMaxBounds = toBounds(this.project(maxBounds.getNorthEast(), zoom), this.project(maxBounds.getSouthWest(), zoom)), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max);
				return new Point(this._rebound(minOffset.x, -maxOffset.x), this._rebound(minOffset.y, -maxOffset.y));
			},
			_rebound: function(left, right) {
				return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
			},
			_limitZoom: function(zoom) {
				var min = this.getMinZoom(), max = this.getMaxZoom(), snap = Browser.any3d ? this.options.zoomSnap : 1;
				if (snap) zoom = Math.round(zoom / snap) * snap;
				return Math.max(min, Math.min(max, zoom));
			},
			_onPanTransitionStep: function() {
				this.fire("move");
			},
			_onPanTransitionEnd: function() {
				removeClass(this._mapPane, "leaflet-pan-anim");
				this.fire("moveend");
			},
			_tryAnimatedPan: function(center, options) {
				var offset = this._getCenterOffset(center)._trunc();
				if ((options && options.animate) !== true && !this.getSize().contains(offset)) return false;
				this.panBy(offset, options);
				return true;
			},
			_createAnimProxy: function() {
				var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
				this._panes.mapPane.appendChild(proxy);
				this.on("zoomanim", function(e) {
					var prop = TRANSFORM, transform = this._proxy.style[prop];
					setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
					if (transform === this._proxy.style[prop] && this._animatingZoom) this._onZoomTransitionEnd();
				}, this);
				this.on("load moveend", this._animMoveEnd, this);
				this._on("unload", this._destroyAnimProxy, this);
			},
			_destroyAnimProxy: function() {
				remove(this._proxy);
				this.off("load moveend", this._animMoveEnd, this);
				delete this._proxy;
			},
			_animMoveEnd: function() {
				var c = this.getCenter(), z = this.getZoom();
				setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
			},
			_catchTransitionEnd: function(e) {
				if (this._animatingZoom && e.propertyName.indexOf("transform") >= 0) this._onZoomTransitionEnd();
			},
			_nothingToAnimate: function() {
				return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
			},
			_tryAnimatedZoom: function(center, zoom, options) {
				if (this._animatingZoom) return true;
				options = options || {};
				if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) return false;
				var scale = this.getZoomScale(zoom), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);
				if (options.animate !== true && !this.getSize().contains(offset)) return false;
				requestAnimFrame(function() {
					this._moveStart(true, options.noMoveStart || false)._animateZoom(center, zoom, true);
				}, this);
				return true;
			},
			_animateZoom: function(center, zoom, startAnim, noUpdate) {
				if (!this._mapPane) return;
				if (startAnim) {
					this._animatingZoom = true;
					this._animateToCenter = center;
					this._animateToZoom = zoom;
					addClass(this._mapPane, "leaflet-zoom-anim");
				}
				this.fire("zoomanim", {
					center,
					zoom,
					noUpdate
				});
				if (!this._tempFireZoomEvent) this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
				this._move(this._animateToCenter, this._animateToZoom, void 0, true);
				setTimeout(bind(this._onZoomTransitionEnd, this), 250);
			},
			_onZoomTransitionEnd: function() {
				if (!this._animatingZoom) return;
				if (this._mapPane) removeClass(this._mapPane, "leaflet-zoom-anim");
				this._animatingZoom = false;
				this._move(this._animateToCenter, this._animateToZoom, void 0, true);
				if (this._tempFireZoomEvent) this.fire("zoom");
				delete this._tempFireZoomEvent;
				this.fire("move");
				this._moveEnd(true);
			}
		});
		function createMap(id, options) {
			return new Map(id, options);
		}
		var Control = Class.extend({
			options: { position: "topright" },
			initialize: function(options) {
				setOptions(this, options);
			},
			getPosition: function() {
				return this.options.position;
			},
			setPosition: function(position) {
				var map = this._map;
				if (map) map.removeControl(this);
				this.options.position = position;
				if (map) map.addControl(this);
				return this;
			},
			getContainer: function() {
				return this._container;
			},
			addTo: function(map) {
				this.remove();
				this._map = map;
				var container = this._container = this.onAdd(map), pos = this.getPosition(), corner = map._controlCorners[pos];
				addClass(container, "leaflet-control");
				if (pos.indexOf("bottom") !== -1) corner.insertBefore(container, corner.firstChild);
				else corner.appendChild(container);
				this._map.on("unload", this.remove, this);
				return this;
			},
			remove: function() {
				if (!this._map) return this;
				remove(this._container);
				if (this.onRemove) this.onRemove(this._map);
				this._map.off("unload", this.remove, this);
				this._map = null;
				return this;
			},
			_refocusOnMap: function(e) {
				if (this._map && e && e.screenX > 0 && e.screenY > 0) this._map.getContainer().focus();
			}
		});
		var control = function(options) {
			return new Control(options);
		};
		Map.include({
			addControl: function(control) {
				control.addTo(this);
				return this;
			},
			removeControl: function(control) {
				control.remove();
				return this;
			},
			_initControlPos: function() {
				var corners = this._controlCorners = {}, l = "leaflet-", container = this._controlContainer = create$1("div", l + "control-container", this._container);
				function createCorner(vSide, hSide) {
					var className = l + vSide + " " + l + hSide;
					corners[vSide + hSide] = create$1("div", className, container);
				}
				createCorner("top", "left");
				createCorner("top", "right");
				createCorner("bottom", "left");
				createCorner("bottom", "right");
			},
			_clearControlPos: function() {
				for (var i in this._controlCorners) remove(this._controlCorners[i]);
				remove(this._controlContainer);
				delete this._controlCorners;
				delete this._controlContainer;
			}
		});
		var Layers = Control.extend({
			options: {
				collapsed: true,
				position: "topright",
				autoZIndex: true,
				hideSingleBase: false,
				sortLayers: false,
				sortFunction: function(layerA, layerB, nameA, nameB) {
					return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
				}
			},
			initialize: function(baseLayers, overlays, options) {
				setOptions(this, options);
				this._layerControlInputs = [];
				this._layers = [];
				this._lastZIndex = 0;
				this._handlingClick = false;
				this._preventClick = false;
				for (var i in baseLayers) this._addLayer(baseLayers[i], i);
				for (i in overlays) this._addLayer(overlays[i], i, true);
			},
			onAdd: function(map) {
				this._initLayout();
				this._update();
				this._map = map;
				map.on("zoomend", this._checkDisabledLayers, this);
				for (var i = 0; i < this._layers.length; i++) this._layers[i].layer.on("add remove", this._onLayerChange, this);
				return this._container;
			},
			addTo: function(map) {
				Control.prototype.addTo.call(this, map);
				return this._expandIfNotCollapsed();
			},
			onRemove: function() {
				this._map.off("zoomend", this._checkDisabledLayers, this);
				for (var i = 0; i < this._layers.length; i++) this._layers[i].layer.off("add remove", this._onLayerChange, this);
			},
			addBaseLayer: function(layer, name) {
				this._addLayer(layer, name);
				return this._map ? this._update() : this;
			},
			addOverlay: function(layer, name) {
				this._addLayer(layer, name, true);
				return this._map ? this._update() : this;
			},
			removeLayer: function(layer) {
				layer.off("add remove", this._onLayerChange, this);
				var obj = this._getLayer(stamp(layer));
				if (obj) this._layers.splice(this._layers.indexOf(obj), 1);
				return this._map ? this._update() : this;
			},
			expand: function() {
				addClass(this._container, "leaflet-control-layers-expanded");
				this._section.style.height = null;
				var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
				if (acceptableHeight < this._section.clientHeight) {
					addClass(this._section, "leaflet-control-layers-scrollbar");
					this._section.style.height = acceptableHeight + "px";
				} else removeClass(this._section, "leaflet-control-layers-scrollbar");
				this._checkDisabledLayers();
				return this;
			},
			collapse: function() {
				removeClass(this._container, "leaflet-control-layers-expanded");
				return this;
			},
			_initLayout: function() {
				var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
				container.setAttribute("aria-haspopup", true);
				disableClickPropagation(container);
				disableScrollPropagation(container);
				var section = this._section = create$1("section", className + "-list");
				if (collapsed) {
					this._map.on("click", this.collapse, this);
					on(container, {
						mouseenter: this._expandSafely,
						mouseleave: this.collapse
					}, this);
				}
				var link = this._layersLink = create$1("a", className + "-toggle", container);
				link.href = "#";
				link.title = "Layers";
				link.setAttribute("role", "button");
				on(link, {
					keydown: function(e) {
						if (e.keyCode === 13) this._expandSafely();
					},
					click: function(e) {
						preventDefault(e);
						this._expandSafely();
					}
				}, this);
				if (!collapsed) this.expand();
				this._baseLayersList = create$1("div", className + "-base", section);
				this._separator = create$1("div", className + "-separator", section);
				this._overlaysList = create$1("div", className + "-overlays", section);
				container.appendChild(section);
			},
			_getLayer: function(id) {
				for (var i = 0; i < this._layers.length; i++) if (this._layers[i] && stamp(this._layers[i].layer) === id) return this._layers[i];
			},
			_addLayer: function(layer, name, overlay) {
				if (this._map) layer.on("add remove", this._onLayerChange, this);
				this._layers.push({
					layer,
					name,
					overlay
				});
				if (this.options.sortLayers) this._layers.sort(bind(function(a, b) {
					return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
				}, this));
				if (this.options.autoZIndex && layer.setZIndex) {
					this._lastZIndex++;
					layer.setZIndex(this._lastZIndex);
				}
				this._expandIfNotCollapsed();
			},
			_update: function() {
				if (!this._container) return this;
				empty(this._baseLayersList);
				empty(this._overlaysList);
				this._layerControlInputs = [];
				var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
				for (i = 0; i < this._layers.length; i++) {
					obj = this._layers[i];
					this._addItem(obj);
					overlaysPresent = overlaysPresent || obj.overlay;
					baseLayersPresent = baseLayersPresent || !obj.overlay;
					baseLayersCount += !obj.overlay ? 1 : 0;
				}
				if (this.options.hideSingleBase) {
					baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
					this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
				}
				this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
				return this;
			},
			_onLayerChange: function(e) {
				if (!this._handlingClick) this._update();
				var obj = this._getLayer(stamp(e.target));
				var type = obj.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
				if (type) this._map.fire(type, obj);
			},
			_createRadioElement: function(name, checked) {
				var radioHtml = "<input type=\"radio\" class=\"leaflet-control-layers-selector\" name=\"" + name + "\"" + (checked ? " checked=\"checked\"" : "") + "/>";
				var radioFragment = document.createElement("div");
				radioFragment.innerHTML = radioHtml;
				return radioFragment.firstChild;
			},
			_addItem: function(obj) {
				var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input;
				if (obj.overlay) {
					input = document.createElement("input");
					input.type = "checkbox";
					input.className = "leaflet-control-layers-selector";
					input.defaultChecked = checked;
				} else input = this._createRadioElement("leaflet-base-layers_" + stamp(this), checked);
				this._layerControlInputs.push(input);
				input.layerId = stamp(obj.layer);
				on(input, "click", this._onInputClick, this);
				var name = document.createElement("span");
				name.innerHTML = " " + obj.name;
				var holder = document.createElement("span");
				label.appendChild(holder);
				holder.appendChild(input);
				holder.appendChild(name);
				(obj.overlay ? this._overlaysList : this._baseLayersList).appendChild(label);
				this._checkDisabledLayers();
				return label;
			},
			_onInputClick: function() {
				if (this._preventClick) return;
				var inputs = this._layerControlInputs, input, layer;
				var addedLayers = [], removedLayers = [];
				this._handlingClick = true;
				for (var i = inputs.length - 1; i >= 0; i--) {
					input = inputs[i];
					layer = this._getLayer(input.layerId).layer;
					if (input.checked) addedLayers.push(layer);
					else if (!input.checked) removedLayers.push(layer);
				}
				for (i = 0; i < removedLayers.length; i++) if (this._map.hasLayer(removedLayers[i])) this._map.removeLayer(removedLayers[i]);
				for (i = 0; i < addedLayers.length; i++) if (!this._map.hasLayer(addedLayers[i])) this._map.addLayer(addedLayers[i]);
				this._handlingClick = false;
				this._refocusOnMap();
			},
			_checkDisabledLayers: function() {
				var inputs = this._layerControlInputs, input, layer, zoom = this._map.getZoom();
				for (var i = inputs.length - 1; i >= 0; i--) {
					input = inputs[i];
					layer = this._getLayer(input.layerId).layer;
					input.disabled = layer.options.minZoom !== void 0 && zoom < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom > layer.options.maxZoom;
				}
			},
			_expandIfNotCollapsed: function() {
				if (this._map && !this.options.collapsed) this.expand();
				return this;
			},
			_expandSafely: function() {
				var section = this._section;
				this._preventClick = true;
				on(section, "click", preventDefault);
				this.expand();
				var that = this;
				setTimeout(function() {
					off(section, "click", preventDefault);
					that._preventClick = false;
				});
			}
		});
		var layers = function(baseLayers, overlays, options) {
			return new Layers(baseLayers, overlays, options);
		};
		var Zoom = Control.extend({
			options: {
				position: "topleft",
				zoomInText: "<span aria-hidden=\"true\">+</span>",
				zoomInTitle: "Zoom in",
				zoomOutText: "<span aria-hidden=\"true\">&#x2212;</span>",
				zoomOutTitle: "Zoom out"
			},
			onAdd: function(map) {
				var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
				this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle, zoomName + "-in", container, this._zoomIn);
				this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle, zoomName + "-out", container, this._zoomOut);
				this._updateDisabled();
				map.on("zoomend zoomlevelschange", this._updateDisabled, this);
				return container;
			},
			onRemove: function(map) {
				map.off("zoomend zoomlevelschange", this._updateDisabled, this);
			},
			disable: function() {
				this._disabled = true;
				this._updateDisabled();
				return this;
			},
			enable: function() {
				this._disabled = false;
				this._updateDisabled();
				return this;
			},
			_zoomIn: function(e) {
				if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_zoomOut: function(e) {
				if (!this._disabled && this._map._zoom > this._map.getMinZoom()) this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_createButton: function(html, title, className, container, fn) {
				var link = create$1("a", className, container);
				link.innerHTML = html;
				link.href = "#";
				link.title = title;
				link.setAttribute("role", "button");
				link.setAttribute("aria-label", title);
				disableClickPropagation(link);
				on(link, "click", stop);
				on(link, "click", fn, this);
				on(link, "click", this._refocusOnMap, this);
				return link;
			},
			_updateDisabled: function() {
				var map = this._map, className = "leaflet-disabled";
				removeClass(this._zoomInButton, className);
				removeClass(this._zoomOutButton, className);
				this._zoomInButton.setAttribute("aria-disabled", "false");
				this._zoomOutButton.setAttribute("aria-disabled", "false");
				if (this._disabled || map._zoom === map.getMinZoom()) {
					addClass(this._zoomOutButton, className);
					this._zoomOutButton.setAttribute("aria-disabled", "true");
				}
				if (this._disabled || map._zoom === map.getMaxZoom()) {
					addClass(this._zoomInButton, className);
					this._zoomInButton.setAttribute("aria-disabled", "true");
				}
			}
		});
		Map.mergeOptions({ zoomControl: true });
		Map.addInitHook(function() {
			if (this.options.zoomControl) {
				this.zoomControl = new Zoom();
				this.addControl(this.zoomControl);
			}
		});
		var zoom = function(options) {
			return new Zoom(options);
		};
		var Scale = Control.extend({
			options: {
				position: "bottomleft",
				maxWidth: 100,
				metric: true,
				imperial: true
			},
			onAdd: function(map) {
				var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
				this._addScales(options, className + "-line", container);
				map.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
				map.whenReady(this._update, this);
				return container;
			},
			onRemove: function(map) {
				map.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
			},
			_addScales: function(options, className, container) {
				if (options.metric) this._mScale = create$1("div", className, container);
				if (options.imperial) this._iScale = create$1("div", className, container);
			},
			_update: function() {
				var map = this._map, y = map.getSize().y / 2;
				var maxMeters = map.distance(map.containerPointToLatLng([0, y]), map.containerPointToLatLng([this.options.maxWidth, y]));
				this._updateScales(maxMeters);
			},
			_updateScales: function(maxMeters) {
				if (this.options.metric && maxMeters) this._updateMetric(maxMeters);
				if (this.options.imperial && maxMeters) this._updateImperial(maxMeters);
			},
			_updateMetric: function(maxMeters) {
				var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
				this._updateScale(this._mScale, label, meters / maxMeters);
			},
			_updateImperial: function(maxMeters) {
				var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
				if (maxFeet > 5280) {
					maxMiles = maxFeet / 5280;
					miles = this._getRoundNum(maxMiles);
					this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
				} else {
					feet = this._getRoundNum(maxFeet);
					this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
				}
			},
			_updateScale: function(scale, text, ratio) {
				scale.style.width = Math.round(this.options.maxWidth * ratio) + "px";
				scale.innerHTML = text;
			},
			_getRoundNum: function(num) {
				var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d = num / pow10;
				d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
				return pow10 * d;
			}
		});
		var scale = function(options) {
			return new Scale(options);
		};
		var Attribution = Control.extend({
			options: {
				position: "bottomright",
				prefix: "<a href=\"https://leafletjs.com\" title=\"A JavaScript library for interactive maps\">" + (Browser.inlineSvg ? "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\" class=\"leaflet-attribution-flag\"><path fill=\"#4C7BE1\" d=\"M0 0h12v4H0z\"/><path fill=\"#FFD500\" d=\"M0 4h12v3H0z\"/><path fill=\"#E0BC00\" d=\"M0 7h12v1H0z\"/></svg> " : "") + "Leaflet</a>"
			},
			initialize: function(options) {
				setOptions(this, options);
				this._attributions = {};
			},
			onAdd: function(map) {
				map.attributionControl = this;
				this._container = create$1("div", "leaflet-control-attribution");
				disableClickPropagation(this._container);
				for (var i in map._layers) if (map._layers[i].getAttribution) this.addAttribution(map._layers[i].getAttribution());
				this._update();
				map.on("layeradd", this._addAttribution, this);
				return this._container;
			},
			onRemove: function(map) {
				map.off("layeradd", this._addAttribution, this);
			},
			_addAttribution: function(ev) {
				if (ev.layer.getAttribution) {
					this.addAttribution(ev.layer.getAttribution());
					ev.layer.once("remove", function() {
						this.removeAttribution(ev.layer.getAttribution());
					}, this);
				}
			},
			setPrefix: function(prefix) {
				this.options.prefix = prefix;
				this._update();
				return this;
			},
			addAttribution: function(text) {
				if (!text) return this;
				if (!this._attributions[text]) this._attributions[text] = 0;
				this._attributions[text]++;
				this._update();
				return this;
			},
			removeAttribution: function(text) {
				if (!text) return this;
				if (this._attributions[text]) {
					this._attributions[text]--;
					this._update();
				}
				return this;
			},
			_update: function() {
				if (!this._map) return;
				var attribs = [];
				for (var i in this._attributions) if (this._attributions[i]) attribs.push(i);
				var prefixAndAttribs = [];
				if (this.options.prefix) prefixAndAttribs.push(this.options.prefix);
				if (attribs.length) prefixAndAttribs.push(attribs.join(", "));
				this._container.innerHTML = prefixAndAttribs.join(" <span aria-hidden=\"true\">|</span> ");
			}
		});
		Map.mergeOptions({ attributionControl: true });
		Map.addInitHook(function() {
			if (this.options.attributionControl) new Attribution().addTo(this);
		});
		var attribution = function(options) {
			return new Attribution(options);
		};
		Control.Layers = Layers;
		Control.Zoom = Zoom;
		Control.Scale = Scale;
		Control.Attribution = Attribution;
		control.layers = layers;
		control.zoom = zoom;
		control.scale = scale;
		control.attribution = attribution;
		var Handler = Class.extend({
			initialize: function(map) {
				this._map = map;
			},
			enable: function() {
				if (this._enabled) return this;
				this._enabled = true;
				this.addHooks();
				return this;
			},
			disable: function() {
				if (!this._enabled) return this;
				this._enabled = false;
				this.removeHooks();
				return this;
			},
			enabled: function() {
				return !!this._enabled;
			}
		});
		Handler.addTo = function(map, name) {
			map.addHandler(name, this);
			return this;
		};
		var Mixin = { Events };
		var START = Browser.touch ? "touchstart mousedown" : "mousedown";
		var Draggable = Evented.extend({
			options: { clickTolerance: 3 },
			initialize: function(element, dragStartTarget, preventOutline, options) {
				setOptions(this, options);
				this._element = element;
				this._dragStartTarget = dragStartTarget || element;
				this._preventOutline = preventOutline;
			},
			enable: function() {
				if (this._enabled) return;
				on(this._dragStartTarget, START, this._onDown, this);
				this._enabled = true;
			},
			disable: function() {
				if (!this._enabled) return;
				if (Draggable._dragging === this) this.finishDrag(true);
				off(this._dragStartTarget, START, this._onDown, this);
				this._enabled = false;
				this._moved = false;
			},
			_onDown: function(e) {
				if (!this._enabled) return;
				this._moved = false;
				if (hasClass(this._element, "leaflet-zoom-anim")) return;
				if (e.touches && e.touches.length !== 1) {
					if (Draggable._dragging === this) this.finishDrag();
					return;
				}
				if (Draggable._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) return;
				Draggable._dragging = this;
				if (this._preventOutline) preventOutline(this._element);
				disableImageDrag();
				disableTextSelection();
				if (this._moving) return;
				this.fire("down");
				var first = e.touches ? e.touches[0] : e, sizedParent = getSizedParentNode(this._element);
				this._startPoint = new Point(first.clientX, first.clientY);
				this._startPos = getPosition(this._element);
				this._parentScale = getScale(sizedParent);
				var mouseevent = e.type === "mousedown";
				on(document, mouseevent ? "mousemove" : "touchmove", this._onMove, this);
				on(document, mouseevent ? "mouseup" : "touchend touchcancel", this._onUp, this);
			},
			_onMove: function(e) {
				if (!this._enabled) return;
				if (e.touches && e.touches.length > 1) {
					this._moved = true;
					return;
				}
				var first = e.touches && e.touches.length === 1 ? e.touches[0] : e, offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);
				if (!offset.x && !offset.y) return;
				if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) return;
				offset.x /= this._parentScale.x;
				offset.y /= this._parentScale.y;
				preventDefault(e);
				if (!this._moved) {
					this.fire("dragstart");
					this._moved = true;
					addClass(document.body, "leaflet-dragging");
					this._lastTarget = e.target || e.srcElement;
					if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) this._lastTarget = this._lastTarget.correspondingUseElement;
					addClass(this._lastTarget, "leaflet-drag-target");
				}
				this._newPos = this._startPos.add(offset);
				this._moving = true;
				this._lastEvent = e;
				this._updatePosition();
			},
			_updatePosition: function() {
				var e = { originalEvent: this._lastEvent };
				this.fire("predrag", e);
				setPosition(this._element, this._newPos);
				this.fire("drag", e);
			},
			_onUp: function() {
				if (!this._enabled) return;
				this.finishDrag();
			},
			finishDrag: function(noInertia) {
				removeClass(document.body, "leaflet-dragging");
				if (this._lastTarget) {
					removeClass(this._lastTarget, "leaflet-drag-target");
					this._lastTarget = null;
				}
				off(document, "mousemove touchmove", this._onMove, this);
				off(document, "mouseup touchend touchcancel", this._onUp, this);
				enableImageDrag();
				enableTextSelection();
				var fireDragend = this._moved && this._moving;
				this._moving = false;
				Draggable._dragging = false;
				if (fireDragend) this.fire("dragend", {
					noInertia,
					distance: this._newPos.distanceTo(this._startPos)
				});
			}
		});
		function clipPolygon(points, bounds, round) {
			var clippedPoints, edges = [
				1,
				4,
				2,
				8
			], i, j, k, a, b, len, edge, p;
			for (i = 0, len = points.length; i < len; i++) points[i]._code = _getBitCode(points[i], bounds);
			for (k = 0; k < 4; k++) {
				edge = edges[k];
				clippedPoints = [];
				for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
					a = points[i];
					b = points[j];
					if (!(a._code & edge)) {
						if (b._code & edge) {
							p = _getEdgeIntersection(b, a, edge, bounds, round);
							p._code = _getBitCode(p, bounds);
							clippedPoints.push(p);
						}
						clippedPoints.push(a);
					} else if (!(b._code & edge)) {
						p = _getEdgeIntersection(b, a, edge, bounds, round);
						p._code = _getBitCode(p, bounds);
						clippedPoints.push(p);
					}
				}
				points = clippedPoints;
			}
			return points;
		}
		function polygonCenter(latlngs, crs) {
			var i, j, p1, p2, f, area, x, y, center;
			if (!latlngs || latlngs.length === 0) throw new Error("latlngs not passed");
			if (!isFlat(latlngs)) {
				console.warn("latlngs are not flat! Only the first ring will be used");
				latlngs = latlngs[0];
			}
			var centroidLatLng = toLatLng([0, 0]);
			var bounds = toLatLngBounds(latlngs);
			if (bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest()) < 1700) centroidLatLng = centroid(latlngs);
			var len = latlngs.length;
			var points = [];
			for (i = 0; i < len; i++) {
				var latlng = toLatLng(latlngs[i]);
				points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
			}
			area = x = y = 0;
			for (i = 0, j = len - 1; i < len; j = i++) {
				p1 = points[i];
				p2 = points[j];
				f = p1.y * p2.x - p2.y * p1.x;
				x += (p1.x + p2.x) * f;
				y += (p1.y + p2.y) * f;
				area += f * 3;
			}
			if (area === 0) center = points[0];
			else center = [x / area, y / area];
			var latlngCenter = crs.unproject(toPoint(center));
			return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
		}
		function centroid(coords) {
			var latSum = 0;
			var lngSum = 0;
			var len = 0;
			for (var i = 0; i < coords.length; i++) {
				var latlng = toLatLng(coords[i]);
				latSum += latlng.lat;
				lngSum += latlng.lng;
				len++;
			}
			return toLatLng([latSum / len, lngSum / len]);
		}
		var PolyUtil = {
			__proto__: null,
			clipPolygon,
			polygonCenter,
			centroid
		};
		function simplify(points, tolerance) {
			if (!tolerance || !points.length) return points.slice();
			var sqTolerance = tolerance * tolerance;
			points = _reducePoints(points, sqTolerance);
			points = _simplifyDP(points, sqTolerance);
			return points;
		}
		function pointToSegmentDistance(p, p1, p2) {
			return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
		}
		function closestPointOnSegment(p, p1, p2) {
			return _sqClosestPointOnSegment(p, p1, p2);
		}
		function _simplifyDP(points, sqTolerance) {
			var len = points.length, markers = new (typeof Uint8Array !== "undefined" ? Uint8Array : Array)(len);
			markers[0] = markers[len - 1] = 1;
			_simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
			var i, newPoints = [];
			for (i = 0; i < len; i++) if (markers[i]) newPoints.push(points[i]);
			return newPoints;
		}
		function _simplifyDPStep(points, markers, sqTolerance, first, last) {
			var maxSqDist = 0, index, i, sqDist;
			for (i = first + 1; i <= last - 1; i++) {
				sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
				if (sqDist > maxSqDist) {
					index = i;
					maxSqDist = sqDist;
				}
			}
			if (maxSqDist > sqTolerance) {
				markers[index] = 1;
				_simplifyDPStep(points, markers, sqTolerance, first, index);
				_simplifyDPStep(points, markers, sqTolerance, index, last);
			}
		}
		function _reducePoints(points, sqTolerance) {
			var reducedPoints = [points[0]];
			for (var i = 1, prev = 0, len = points.length; i < len; i++) if (_sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
			if (prev < len - 1) reducedPoints.push(points[len - 1]);
			return reducedPoints;
		}
		var _lastCode;
		function clipSegment(a, b, bounds, useLastCode, round) {
			var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
			_lastCode = codeB;
			while (true) {
				if (!(codeA | codeB)) return [a, b];
				if (codeA & codeB) return false;
				codeOut = codeA || codeB;
				p = _getEdgeIntersection(a, b, codeOut, bounds, round);
				newCode = _getBitCode(p, bounds);
				if (codeOut === codeA) {
					a = p;
					codeA = newCode;
				} else {
					b = p;
					codeB = newCode;
				}
			}
		}
		function _getEdgeIntersection(a, b, code, bounds, round) {
			var dx = b.x - a.x, dy = b.y - a.y, min = bounds.min, max = bounds.max, x, y;
			if (code & 8) {
				x = a.x + dx * (max.y - a.y) / dy;
				y = max.y;
			} else if (code & 4) {
				x = a.x + dx * (min.y - a.y) / dy;
				y = min.y;
			} else if (code & 2) {
				x = max.x;
				y = a.y + dy * (max.x - a.x) / dx;
			} else if (code & 1) {
				x = min.x;
				y = a.y + dy * (min.x - a.x) / dx;
			}
			return new Point(x, y, round);
		}
		function _getBitCode(p, bounds) {
			var code = 0;
			if (p.x < bounds.min.x) code |= 1;
			else if (p.x > bounds.max.x) code |= 2;
			if (p.y < bounds.min.y) code |= 4;
			else if (p.y > bounds.max.y) code |= 8;
			return code;
		}
		function _sqDist(p1, p2) {
			var dx = p2.x - p1.x, dy = p2.y - p1.y;
			return dx * dx + dy * dy;
		}
		function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
			var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y, dot = dx * dx + dy * dy, t;
			if (dot > 0) {
				t = ((p.x - x) * dx + (p.y - y) * dy) / dot;
				if (t > 1) {
					x = p2.x;
					y = p2.y;
				} else if (t > 0) {
					x += dx * t;
					y += dy * t;
				}
			}
			dx = p.x - x;
			dy = p.y - y;
			return sqDist ? dx * dx + dy * dy : new Point(x, y);
		}
		function isFlat(latlngs) {
			return !isArray(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
		}
		function _flat(latlngs) {
			console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
			return isFlat(latlngs);
		}
		function polylineCenter(latlngs, crs) {
			var i, halfDist, segDist, dist, p1, p2, ratio, center;
			if (!latlngs || latlngs.length === 0) throw new Error("latlngs not passed");
			if (!isFlat(latlngs)) {
				console.warn("latlngs are not flat! Only the first ring will be used");
				latlngs = latlngs[0];
			}
			var centroidLatLng = toLatLng([0, 0]);
			var bounds = toLatLngBounds(latlngs);
			if (bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest()) < 1700) centroidLatLng = centroid(latlngs);
			var len = latlngs.length;
			var points = [];
			for (i = 0; i < len; i++) {
				var latlng = toLatLng(latlngs[i]);
				points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
			}
			for (i = 0, halfDist = 0; i < len - 1; i++) halfDist += points[i].distanceTo(points[i + 1]) / 2;
			if (halfDist === 0) center = points[0];
			else for (i = 0, dist = 0; i < len - 1; i++) {
				p1 = points[i];
				p2 = points[i + 1];
				segDist = p1.distanceTo(p2);
				dist += segDist;
				if (dist > halfDist) {
					ratio = (dist - halfDist) / segDist;
					center = [p2.x - ratio * (p2.x - p1.x), p2.y - ratio * (p2.y - p1.y)];
					break;
				}
			}
			var latlngCenter = crs.unproject(toPoint(center));
			return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
		}
		var LineUtil = {
			__proto__: null,
			simplify,
			pointToSegmentDistance,
			closestPointOnSegment,
			clipSegment,
			_getEdgeIntersection,
			_getBitCode,
			_sqClosestPointOnSegment,
			isFlat,
			_flat,
			polylineCenter
		};
		var LonLat = {
			project: function(latlng) {
				return new Point(latlng.lng, latlng.lat);
			},
			unproject: function(point) {
				return new LatLng(point.y, point.x);
			},
			bounds: new Bounds([-180, -90], [180, 90])
		};
		var Mercator = {
			R: 6378137,
			R_MINOR: 6356752.314245179,
			bounds: new Bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
			project: function(latlng) {
				var d = Math.PI / 180, r = this.R, y = latlng.lat * d, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), con = e * Math.sin(y);
				var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
				y = -r * Math.log(Math.max(ts, 1e-10));
				return new Point(latlng.lng * d * r, y);
			},
			unproject: function(point) {
				var d = 180 / Math.PI, r = this.R, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
				for (var i = 0, dphi = .1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
					con = e * Math.sin(phi);
					con = Math.pow((1 - con) / (1 + con), e / 2);
					dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
					phi += dphi;
				}
				return new LatLng(phi * d, point.x * d / r);
			}
		};
		var index = {
			__proto__: null,
			LonLat,
			Mercator,
			SphericalMercator
		};
		var EPSG3395 = extend({}, Earth, {
			code: "EPSG:3395",
			projection: Mercator,
			transformation: function() {
				var scale = .5 / (Math.PI * Mercator.R);
				return toTransformation(scale, .5, -scale, .5);
			}()
		});
		var EPSG4326 = extend({}, Earth, {
			code: "EPSG:4326",
			projection: LonLat,
			transformation: toTransformation(1 / 180, 1, -1 / 180, .5)
		});
		var Simple = extend({}, CRS, {
			projection: LonLat,
			transformation: toTransformation(1, 0, -1, 0),
			scale: function(zoom) {
				return Math.pow(2, zoom);
			},
			zoom: function(scale) {
				return Math.log(scale) / Math.LN2;
			},
			distance: function(latlng1, latlng2) {
				var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
				return Math.sqrt(dx * dx + dy * dy);
			},
			infinite: true
		});
		CRS.Earth = Earth;
		CRS.EPSG3395 = EPSG3395;
		CRS.EPSG3857 = EPSG3857;
		CRS.EPSG900913 = EPSG900913;
		CRS.EPSG4326 = EPSG4326;
		CRS.Simple = Simple;
		var Layer = Evented.extend({
			options: {
				pane: "overlayPane",
				attribution: null,
				bubblingMouseEvents: true
			},
			addTo: function(map) {
				map.addLayer(this);
				return this;
			},
			remove: function() {
				return this.removeFrom(this._map || this._mapToAdd);
			},
			removeFrom: function(obj) {
				if (obj) obj.removeLayer(this);
				return this;
			},
			getPane: function(name) {
				return this._map.getPane(name ? this.options[name] || name : this.options.pane);
			},
			addInteractiveTarget: function(targetEl) {
				this._map._targets[stamp(targetEl)] = this;
				return this;
			},
			removeInteractiveTarget: function(targetEl) {
				delete this._map._targets[stamp(targetEl)];
				return this;
			},
			getAttribution: function() {
				return this.options.attribution;
			},
			_layerAdd: function(e) {
				var map = e.target;
				if (!map.hasLayer(this)) return;
				this._map = map;
				this._zoomAnimated = map._zoomAnimated;
				if (this.getEvents) {
					var events = this.getEvents();
					map.on(events, this);
					this.once("remove", function() {
						map.off(events, this);
					}, this);
				}
				this.onAdd(map);
				this.fire("add");
				map.fire("layeradd", { layer: this });
			}
		});
		Map.include({
			addLayer: function(layer) {
				if (!layer._layerAdd) throw new Error("The provided object is not a Layer.");
				var id = stamp(layer);
				if (this._layers[id]) return this;
				this._layers[id] = layer;
				layer._mapToAdd = this;
				if (layer.beforeAdd) layer.beforeAdd(this);
				this.whenReady(layer._layerAdd, layer);
				return this;
			},
			removeLayer: function(layer) {
				var id = stamp(layer);
				if (!this._layers[id]) return this;
				if (this._loaded) layer.onRemove(this);
				delete this._layers[id];
				if (this._loaded) {
					this.fire("layerremove", { layer });
					layer.fire("remove");
				}
				layer._map = layer._mapToAdd = null;
				return this;
			},
			hasLayer: function(layer) {
				return stamp(layer) in this._layers;
			},
			eachLayer: function(method, context) {
				for (var i in this._layers) method.call(context, this._layers[i]);
				return this;
			},
			_addLayers: function(layers) {
				layers = layers ? isArray(layers) ? layers : [layers] : [];
				for (var i = 0, len = layers.length; i < len; i++) this.addLayer(layers[i]);
			},
			_addZoomLimit: function(layer) {
				if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
					this._zoomBoundLayers[stamp(layer)] = layer;
					this._updateZoomLevels();
				}
			},
			_removeZoomLimit: function(layer) {
				var id = stamp(layer);
				if (this._zoomBoundLayers[id]) {
					delete this._zoomBoundLayers[id];
					this._updateZoomLevels();
				}
			},
			_updateZoomLevels: function() {
				var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
				for (var i in this._zoomBoundLayers) {
					var options = this._zoomBoundLayers[i].options;
					minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
					maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
				}
				this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
				this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
				if (oldZoomSpan !== this._getZoomSpan()) this.fire("zoomlevelschange");
				if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) this.setZoom(this._layersMaxZoom);
				if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) this.setZoom(this._layersMinZoom);
			}
		});
		var LayerGroup = Layer.extend({
			initialize: function(layers, options) {
				setOptions(this, options);
				this._layers = {};
				var i, len;
				if (layers) for (i = 0, len = layers.length; i < len; i++) this.addLayer(layers[i]);
			},
			addLayer: function(layer) {
				var id = this.getLayerId(layer);
				this._layers[id] = layer;
				if (this._map) this._map.addLayer(layer);
				return this;
			},
			removeLayer: function(layer) {
				var id = layer in this._layers ? layer : this.getLayerId(layer);
				if (this._map && this._layers[id]) this._map.removeLayer(this._layers[id]);
				delete this._layers[id];
				return this;
			},
			hasLayer: function(layer) {
				return (typeof layer === "number" ? layer : this.getLayerId(layer)) in this._layers;
			},
			clearLayers: function() {
				return this.eachLayer(this.removeLayer, this);
			},
			invoke: function(methodName) {
				var args = Array.prototype.slice.call(arguments, 1), i, layer;
				for (i in this._layers) {
					layer = this._layers[i];
					if (layer[methodName]) layer[methodName].apply(layer, args);
				}
				return this;
			},
			onAdd: function(map) {
				this.eachLayer(map.addLayer, map);
			},
			onRemove: function(map) {
				this.eachLayer(map.removeLayer, map);
			},
			eachLayer: function(method, context) {
				for (var i in this._layers) method.call(context, this._layers[i]);
				return this;
			},
			getLayer: function(id) {
				return this._layers[id];
			},
			getLayers: function() {
				var layers = [];
				this.eachLayer(layers.push, layers);
				return layers;
			},
			setZIndex: function(zIndex) {
				return this.invoke("setZIndex", zIndex);
			},
			getLayerId: function(layer) {
				return stamp(layer);
			}
		});
		var layerGroup = function(layers, options) {
			return new LayerGroup(layers, options);
		};
		var FeatureGroup = LayerGroup.extend({
			addLayer: function(layer) {
				if (this.hasLayer(layer)) return this;
				layer.addEventParent(this);
				LayerGroup.prototype.addLayer.call(this, layer);
				return this.fire("layeradd", { layer });
			},
			removeLayer: function(layer) {
				if (!this.hasLayer(layer)) return this;
				if (layer in this._layers) layer = this._layers[layer];
				layer.removeEventParent(this);
				LayerGroup.prototype.removeLayer.call(this, layer);
				return this.fire("layerremove", { layer });
			},
			setStyle: function(style) {
				return this.invoke("setStyle", style);
			},
			bringToFront: function() {
				return this.invoke("bringToFront");
			},
			bringToBack: function() {
				return this.invoke("bringToBack");
			},
			getBounds: function() {
				var bounds = new LatLngBounds();
				for (var id in this._layers) {
					var layer = this._layers[id];
					bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
				}
				return bounds;
			}
		});
		var featureGroup = function(layers, options) {
			return new FeatureGroup(layers, options);
		};
		var Icon = Class.extend({
			options: {
				popupAnchor: [0, 0],
				tooltipAnchor: [0, 0],
				crossOrigin: false
			},
			initialize: function(options) {
				setOptions(this, options);
			},
			createIcon: function(oldIcon) {
				return this._createIcon("icon", oldIcon);
			},
			createShadow: function(oldIcon) {
				return this._createIcon("shadow", oldIcon);
			},
			_createIcon: function(name, oldIcon) {
				var src = this._getIconUrl(name);
				if (!src) {
					if (name === "icon") throw new Error("iconUrl not set in Icon options (see the docs).");
					return null;
				}
				var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
				this._setIconStyles(img, name);
				if (this.options.crossOrigin || this.options.crossOrigin === "") img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
				return img;
			},
			_setIconStyles: function(img, name) {
				var options = this.options;
				var sizeOption = options[name + "Size"];
				if (typeof sizeOption === "number") sizeOption = [sizeOption, sizeOption];
				var size = toPoint(sizeOption), anchor = toPoint(name === "shadow" && options.shadowAnchor || options.iconAnchor || size && size.divideBy(2, true));
				img.className = "leaflet-marker-" + name + " " + (options.className || "");
				if (anchor) {
					img.style.marginLeft = -anchor.x + "px";
					img.style.marginTop = -anchor.y + "px";
				}
				if (size) {
					img.style.width = size.x + "px";
					img.style.height = size.y + "px";
				}
			},
			_createImg: function(src, el) {
				el = el || document.createElement("img");
				el.src = src;
				return el;
			},
			_getIconUrl: function(name) {
				return Browser.retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
			}
		});
		function icon(options) {
			return new Icon(options);
		}
		var IconDefault = Icon.extend({
			options: {
				iconUrl: "marker-icon.png",
				iconRetinaUrl: "marker-icon-2x.png",
				shadowUrl: "marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				tooltipAnchor: [16, -28],
				shadowSize: [41, 41]
			},
			_getIconUrl: function(name) {
				if (typeof IconDefault.imagePath !== "string") IconDefault.imagePath = this._detectIconPath();
				return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
			},
			_stripUrl: function(path) {
				var strip = function(str, re, idx) {
					var match = re.exec(str);
					return match && match[idx];
				};
				path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
				return path && strip(path, /^(.*)marker-icon\.png$/, 1);
			},
			_detectIconPath: function() {
				var el = create$1("div", "leaflet-default-icon-path", document.body);
				var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
				document.body.removeChild(el);
				path = this._stripUrl(path);
				if (path) return path;
				var link = document.querySelector("link[href$=\"leaflet.css\"]");
				if (!link) return "";
				return link.href.substring(0, link.href.length - 11 - 1);
			}
		});
		var MarkerDrag = Handler.extend({
			initialize: function(marker) {
				this._marker = marker;
			},
			addHooks: function() {
				var icon = this._marker._icon;
				if (!this._draggable) this._draggable = new Draggable(icon, icon, true);
				this._draggable.on({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).enable();
				addClass(icon, "leaflet-marker-draggable");
			},
			removeHooks: function() {
				this._draggable.off({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).disable();
				if (this._marker._icon) removeClass(this._marker._icon, "leaflet-marker-draggable");
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			_adjustPan: function(e) {
				var marker = this._marker, map = marker._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker._icon), bounds = map.getPixelBounds(), origin = map.getPixelOrigin();
				var panBounds = toBounds(bounds.min._subtract(origin).add(padding), bounds.max._subtract(origin).subtract(padding));
				if (!panBounds.contains(iconPos)) {
					var movement = toPoint((Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x), (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)).multiplyBy(speed);
					map.panBy(movement, { animate: false });
					this._draggable._newPos._add(movement);
					this._draggable._startPos._add(movement);
					setPosition(marker._icon, this._draggable._newPos);
					this._onDrag(e);
					this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
				}
			},
			_onDragStart: function() {
				this._oldLatLng = this._marker.getLatLng();
				this._marker.closePopup && this._marker.closePopup();
				this._marker.fire("movestart").fire("dragstart");
			},
			_onPreDrag: function(e) {
				if (this._marker.options.autoPan) {
					cancelAnimFrame(this._panRequest);
					this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
				}
			},
			_onDrag: function(e) {
				var marker = this._marker, shadow = marker._shadow, iconPos = getPosition(marker._icon), latlng = marker._map.layerPointToLatLng(iconPos);
				if (shadow) setPosition(shadow, iconPos);
				marker._latlng = latlng;
				e.latlng = latlng;
				e.oldLatLng = this._oldLatLng;
				marker.fire("move", e).fire("drag", e);
			},
			_onDragEnd: function(e) {
				cancelAnimFrame(this._panRequest);
				delete this._oldLatLng;
				this._marker.fire("moveend").fire("dragend", e);
			}
		});
		var Marker = Layer.extend({
			options: {
				icon: new IconDefault(),
				interactive: true,
				keyboard: true,
				title: "",
				alt: "Marker",
				zIndexOffset: 0,
				opacity: 1,
				riseOnHover: false,
				riseOffset: 250,
				pane: "markerPane",
				shadowPane: "shadowPane",
				bubblingMouseEvents: false,
				autoPanOnFocus: true,
				draggable: false,
				autoPan: false,
				autoPanPadding: [50, 50],
				autoPanSpeed: 10
			},
			initialize: function(latlng, options) {
				setOptions(this, options);
				this._latlng = toLatLng(latlng);
			},
			onAdd: function(map) {
				this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;
				if (this._zoomAnimated) map.on("zoomanim", this._animateZoom, this);
				this._initIcon();
				this.update();
			},
			onRemove: function(map) {
				if (this.dragging && this.dragging.enabled()) {
					this.options.draggable = true;
					this.dragging.removeHooks();
				}
				delete this.dragging;
				if (this._zoomAnimated) map.off("zoomanim", this._animateZoom, this);
				this._removeIcon();
				this._removeShadow();
			},
			getEvents: function() {
				return {
					zoom: this.update,
					viewreset: this.update
				};
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(latlng) {
				var oldLatLng = this._latlng;
				this._latlng = toLatLng(latlng);
				this.update();
				return this.fire("move", {
					oldLatLng,
					latlng: this._latlng
				});
			},
			setZIndexOffset: function(offset) {
				this.options.zIndexOffset = offset;
				return this.update();
			},
			getIcon: function() {
				return this.options.icon;
			},
			setIcon: function(icon) {
				this.options.icon = icon;
				if (this._map) {
					this._initIcon();
					this.update();
				}
				if (this._popup) this.bindPopup(this._popup, this._popup.options);
				return this;
			},
			getElement: function() {
				return this._icon;
			},
			update: function() {
				if (this._icon && this._map) {
					var pos = this._map.latLngToLayerPoint(this._latlng).round();
					this._setPos(pos);
				}
				return this;
			},
			_initIcon: function() {
				var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
				var icon = options.icon.createIcon(this._icon), addIcon = false;
				if (icon !== this._icon) {
					if (this._icon) this._removeIcon();
					addIcon = true;
					if (options.title) icon.title = options.title;
					if (icon.tagName === "IMG") icon.alt = options.alt || "";
				}
				addClass(icon, classToAdd);
				if (options.keyboard) {
					icon.tabIndex = "0";
					icon.setAttribute("role", "button");
				}
				this._icon = icon;
				if (options.riseOnHover) this.on({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				});
				if (this.options.autoPanOnFocus) on(icon, "focus", this._panOnFocus, this);
				var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
				if (newShadow !== this._shadow) {
					this._removeShadow();
					addShadow = true;
				}
				if (newShadow) {
					addClass(newShadow, classToAdd);
					newShadow.alt = "";
				}
				this._shadow = newShadow;
				if (options.opacity < 1) this._updateOpacity();
				if (addIcon) this.getPane().appendChild(this._icon);
				this._initInteraction();
				if (newShadow && addShadow) this.getPane(options.shadowPane).appendChild(this._shadow);
			},
			_removeIcon: function() {
				if (this.options.riseOnHover) this.off({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				});
				if (this.options.autoPanOnFocus) off(this._icon, "focus", this._panOnFocus, this);
				remove(this._icon);
				this.removeInteractiveTarget(this._icon);
				this._icon = null;
			},
			_removeShadow: function() {
				if (this._shadow) remove(this._shadow);
				this._shadow = null;
			},
			_setPos: function(pos) {
				if (this._icon) setPosition(this._icon, pos);
				if (this._shadow) setPosition(this._shadow, pos);
				this._zIndex = pos.y + this.options.zIndexOffset;
				this._resetZIndex();
			},
			_updateZIndex: function(offset) {
				if (this._icon) this._icon.style.zIndex = this._zIndex + offset;
			},
			_animateZoom: function(opt) {
				var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
				this._setPos(pos);
			},
			_initInteraction: function() {
				if (!this.options.interactive) return;
				addClass(this._icon, "leaflet-interactive");
				this.addInteractiveTarget(this._icon);
				if (MarkerDrag) {
					var draggable = this.options.draggable;
					if (this.dragging) {
						draggable = this.dragging.enabled();
						this.dragging.disable();
					}
					this.dragging = new MarkerDrag(this);
					if (draggable) this.dragging.enable();
				}
			},
			setOpacity: function(opacity) {
				this.options.opacity = opacity;
				if (this._map) this._updateOpacity();
				return this;
			},
			_updateOpacity: function() {
				var opacity = this.options.opacity;
				if (this._icon) setOpacity(this._icon, opacity);
				if (this._shadow) setOpacity(this._shadow, opacity);
			},
			_bringToFront: function() {
				this._updateZIndex(this.options.riseOffset);
			},
			_resetZIndex: function() {
				this._updateZIndex(0);
			},
			_panOnFocus: function() {
				var map = this._map;
				if (!map) return;
				var iconOpts = this.options.icon.options;
				var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
				var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);
				map.panInside(this._latlng, {
					paddingTopLeft: anchor,
					paddingBottomRight: size.subtract(anchor)
				});
			},
			_getPopupAnchor: function() {
				return this.options.icon.options.popupAnchor;
			},
			_getTooltipAnchor: function() {
				return this.options.icon.options.tooltipAnchor;
			}
		});
		function marker(latlng, options) {
			return new Marker(latlng, options);
		}
		var Path = Layer.extend({
			options: {
				stroke: true,
				color: "#3388ff",
				weight: 3,
				opacity: 1,
				lineCap: "round",
				lineJoin: "round",
				dashArray: null,
				dashOffset: null,
				fill: false,
				fillColor: null,
				fillOpacity: .2,
				fillRule: "evenodd",
				interactive: true,
				bubblingMouseEvents: true
			},
			beforeAdd: function(map) {
				this._renderer = map.getRenderer(this);
			},
			onAdd: function() {
				this._renderer._initPath(this);
				this._reset();
				this._renderer._addPath(this);
			},
			onRemove: function() {
				this._renderer._removePath(this);
			},
			redraw: function() {
				if (this._map) this._renderer._updatePath(this);
				return this;
			},
			setStyle: function(style) {
				setOptions(this, style);
				if (this._renderer) {
					this._renderer._updateStyle(this);
					if (this.options.stroke && style && Object.prototype.hasOwnProperty.call(style, "weight")) this._updateBounds();
				}
				return this;
			},
			bringToFront: function() {
				if (this._renderer) this._renderer._bringToFront(this);
				return this;
			},
			bringToBack: function() {
				if (this._renderer) this._renderer._bringToBack(this);
				return this;
			},
			getElement: function() {
				return this._path;
			},
			_reset: function() {
				this._project();
				this._update();
			},
			_clickTolerance: function() {
				return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
			}
		});
		var CircleMarker = Path.extend({
			options: {
				fill: true,
				radius: 10
			},
			initialize: function(latlng, options) {
				setOptions(this, options);
				this._latlng = toLatLng(latlng);
				this._radius = this.options.radius;
			},
			setLatLng: function(latlng) {
				var oldLatLng = this._latlng;
				this._latlng = toLatLng(latlng);
				this.redraw();
				return this.fire("move", {
					oldLatLng,
					latlng: this._latlng
				});
			},
			getLatLng: function() {
				return this._latlng;
			},
			setRadius: function(radius) {
				this.options.radius = this._radius = radius;
				return this.redraw();
			},
			getRadius: function() {
				return this._radius;
			},
			setStyle: function(options) {
				var radius = options && options.radius || this._radius;
				Path.prototype.setStyle.call(this, options);
				this.setRadius(radius);
				return this;
			},
			_project: function() {
				this._point = this._map.latLngToLayerPoint(this._latlng);
				this._updateBounds();
			},
			_updateBounds: function() {
				var r = this._radius, r2 = this._radiusY || r, w = this._clickTolerance(), p = [r + w, r2 + w];
				this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
			},
			_update: function() {
				if (this._map) this._updatePath();
			},
			_updatePath: function() {
				this._renderer._updateCircle(this);
			},
			_empty: function() {
				return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
			},
			_containsPoint: function(p) {
				return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
			}
		});
		function circleMarker(latlng, options) {
			return new CircleMarker(latlng, options);
		}
		var Circle = CircleMarker.extend({
			initialize: function(latlng, options, legacyOptions) {
				if (typeof options === "number") options = extend({}, legacyOptions, { radius: options });
				setOptions(this, options);
				this._latlng = toLatLng(latlng);
				if (isNaN(this.options.radius)) throw new Error("Circle radius cannot be NaN");
				this._mRadius = this.options.radius;
			},
			setRadius: function(radius) {
				this._mRadius = radius;
				return this.redraw();
			},
			getRadius: function() {
				return this._mRadius;
			},
			getBounds: function() {
				var half = [this._radius, this._radiusY || this._radius];
				return new LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(half)), this._map.layerPointToLatLng(this._point.add(half)));
			},
			setStyle: Path.prototype.setStyle,
			_project: function() {
				var lng = this._latlng.lng, lat = this._latlng.lat, map = this._map, crs = map.options.crs;
				if (crs.distance === Earth.distance) {
					var d = Math.PI / 180, latR = this._mRadius / Earth.R / d, top = map.project([lat + latR, lng]), bottom = map.project([lat - latR, lng]), p = top.add(bottom).divideBy(2), lat2 = map.unproject(p).lat, lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) / (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
					if (isNaN(lngR) || lngR === 0) lngR = latR / Math.cos(Math.PI / 180 * lat);
					this._point = p.subtract(map.getPixelOrigin());
					this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
					this._radiusY = p.y - top.y;
				} else {
					var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
					this._point = map.latLngToLayerPoint(this._latlng);
					this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
				}
				this._updateBounds();
			}
		});
		function circle(latlng, options, legacyOptions) {
			return new Circle(latlng, options, legacyOptions);
		}
		var Polyline = Path.extend({
			options: {
				smoothFactor: 1,
				noClip: false
			},
			initialize: function(latlngs, options) {
				setOptions(this, options);
				this._setLatLngs(latlngs);
			},
			getLatLngs: function() {
				return this._latlngs;
			},
			setLatLngs: function(latlngs) {
				this._setLatLngs(latlngs);
				return this.redraw();
			},
			isEmpty: function() {
				return !this._latlngs.length;
			},
			closestLayerPoint: function(p) {
				var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p2;
				for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
					var points = this._parts[j];
					for (var i = 1, len = points.length; i < len; i++) {
						p1 = points[i - 1];
						p2 = points[i];
						var sqDist = closest(p, p1, p2, true);
						if (sqDist < minDistance) {
							minDistance = sqDist;
							minPoint = closest(p, p1, p2);
						}
					}
				}
				if (minPoint) minPoint.distance = Math.sqrt(minDistance);
				return minPoint;
			},
			getCenter: function() {
				if (!this._map) throw new Error("Must add layer to map before using getCenter()");
				return polylineCenter(this._defaultShape(), this._map.options.crs);
			},
			getBounds: function() {
				return this._bounds;
			},
			addLatLng: function(latlng, latlngs) {
				latlngs = latlngs || this._defaultShape();
				latlng = toLatLng(latlng);
				latlngs.push(latlng);
				this._bounds.extend(latlng);
				return this.redraw();
			},
			_setLatLngs: function(latlngs) {
				this._bounds = new LatLngBounds();
				this._latlngs = this._convertLatLngs(latlngs);
			},
			_defaultShape: function() {
				return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
			},
			_convertLatLngs: function(latlngs) {
				var result = [], flat = isFlat(latlngs);
				for (var i = 0, len = latlngs.length; i < len; i++) if (flat) {
					result[i] = toLatLng(latlngs[i]);
					this._bounds.extend(result[i]);
				} else result[i] = this._convertLatLngs(latlngs[i]);
				return result;
			},
			_project: function() {
				var pxBounds = new Bounds();
				this._rings = [];
				this._projectLatlngs(this._latlngs, this._rings, pxBounds);
				if (this._bounds.isValid() && pxBounds.isValid()) {
					this._rawPxBounds = pxBounds;
					this._updateBounds();
				}
			},
			_updateBounds: function() {
				var w = this._clickTolerance(), p = new Point(w, w);
				if (!this._rawPxBounds) return;
				this._pxBounds = new Bounds([this._rawPxBounds.min.subtract(p), this._rawPxBounds.max.add(p)]);
			},
			_projectLatlngs: function(latlngs, result, projectedBounds) {
				var flat = latlngs[0] instanceof LatLng, len = latlngs.length, i, ring;
				if (flat) {
					ring = [];
					for (i = 0; i < len; i++) {
						ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
						projectedBounds.extend(ring[i]);
					}
					result.push(ring);
				} else for (i = 0; i < len; i++) this._projectLatlngs(latlngs[i], result, projectedBounds);
			},
			_clipPoints: function() {
				var bounds = this._renderer._bounds;
				this._parts = [];
				if (!this._pxBounds || !this._pxBounds.intersects(bounds)) return;
				if (this.options.noClip) {
					this._parts = this._rings;
					return;
				}
				var parts = this._parts, i, j, k, len, len2, segment, points;
				for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
					points = this._rings[i];
					for (j = 0, len2 = points.length; j < len2 - 1; j++) {
						segment = clipSegment(points[j], points[j + 1], bounds, j, true);
						if (!segment) continue;
						parts[k] = parts[k] || [];
						parts[k].push(segment[0]);
						if (segment[1] !== points[j + 1] || j === len2 - 2) {
							parts[k].push(segment[1]);
							k++;
						}
					}
				}
			},
			_simplifyPoints: function() {
				var parts = this._parts, tolerance = this.options.smoothFactor;
				for (var i = 0, len = parts.length; i < len; i++) parts[i] = simplify(parts[i], tolerance);
			},
			_update: function() {
				if (!this._map) return;
				this._clipPoints();
				this._simplifyPoints();
				this._updatePath();
			},
			_updatePath: function() {
				this._renderer._updatePoly(this);
			},
			_containsPoint: function(p, closed) {
				var i, j, k, len, len2, part, w = this._clickTolerance();
				if (!this._pxBounds || !this._pxBounds.contains(p)) return false;
				for (i = 0, len = this._parts.length; i < len; i++) {
					part = this._parts[i];
					for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
						if (!closed && j === 0) continue;
						if (pointToSegmentDistance(p, part[k], part[j]) <= w) return true;
					}
				}
				return false;
			}
		});
		function polyline(latlngs, options) {
			return new Polyline(latlngs, options);
		}
		Polyline._flat = _flat;
		var Polygon = Polyline.extend({
			options: { fill: true },
			isEmpty: function() {
				return !this._latlngs.length || !this._latlngs[0].length;
			},
			getCenter: function() {
				if (!this._map) throw new Error("Must add layer to map before using getCenter()");
				return polygonCenter(this._defaultShape(), this._map.options.crs);
			},
			_convertLatLngs: function(latlngs) {
				var result = Polyline.prototype._convertLatLngs.call(this, latlngs), len = result.length;
				if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) result.pop();
				return result;
			},
			_setLatLngs: function(latlngs) {
				Polyline.prototype._setLatLngs.call(this, latlngs);
				if (isFlat(this._latlngs)) this._latlngs = [this._latlngs];
			},
			_defaultShape: function() {
				return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
			},
			_clipPoints: function() {
				var bounds = this._renderer._bounds, w = this.options.weight, p = new Point(w, w);
				bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
				this._parts = [];
				if (!this._pxBounds || !this._pxBounds.intersects(bounds)) return;
				if (this.options.noClip) {
					this._parts = this._rings;
					return;
				}
				for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
					clipped = clipPolygon(this._rings[i], bounds, true);
					if (clipped.length) this._parts.push(clipped);
				}
			},
			_updatePath: function() {
				this._renderer._updatePoly(this, true);
			},
			_containsPoint: function(p) {
				var inside = false, part, p1, p2, i, j, k, len, len2;
				if (!this._pxBounds || !this._pxBounds.contains(p)) return false;
				for (i = 0, len = this._parts.length; i < len; i++) {
					part = this._parts[i];
					for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
						p1 = part[j];
						p2 = part[k];
						if (p1.y > p.y !== p2.y > p.y && p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x) inside = !inside;
					}
				}
				return inside || Polyline.prototype._containsPoint.call(this, p, true);
			}
		});
		function polygon(latlngs, options) {
			return new Polygon(latlngs, options);
		}
		var GeoJSON = FeatureGroup.extend({
			initialize: function(geojson, options) {
				setOptions(this, options);
				this._layers = {};
				if (geojson) this.addData(geojson);
			},
			addData: function(geojson) {
				var features = isArray(geojson) ? geojson : geojson.features, i, len, feature;
				if (features) {
					for (i = 0, len = features.length; i < len; i++) {
						feature = features[i];
						if (feature.geometries || feature.geometry || feature.features || feature.coordinates) this.addData(feature);
					}
					return this;
				}
				var options = this.options;
				if (options.filter && !options.filter(geojson)) return this;
				var layer = geometryToLayer(geojson, options);
				if (!layer) return this;
				layer.feature = asFeature(geojson);
				layer.defaultOptions = layer.options;
				this.resetStyle(layer);
				if (options.onEachFeature) options.onEachFeature(geojson, layer);
				return this.addLayer(layer);
			},
			resetStyle: function(layer) {
				if (layer === void 0) return this.eachLayer(this.resetStyle, this);
				layer.options = extend({}, layer.defaultOptions);
				this._setLayerStyle(layer, this.options.style);
				return this;
			},
			setStyle: function(style) {
				return this.eachLayer(function(layer) {
					this._setLayerStyle(layer, style);
				}, this);
			},
			_setLayerStyle: function(layer, style) {
				if (layer.setStyle) {
					if (typeof style === "function") style = style(layer.feature);
					layer.setStyle(style);
				}
			}
		});
		function geometryToLayer(geojson, options) {
			var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i, len;
			if (!coords && !geometry) return null;
			switch (geometry.type) {
				case "Point":
					latlng = _coordsToLatLng(coords);
					return _pointToLayer(pointToLayer, geojson, latlng, options);
				case "MultiPoint":
					for (i = 0, len = coords.length; i < len; i++) {
						latlng = _coordsToLatLng(coords[i]);
						layers.push(_pointToLayer(pointToLayer, geojson, latlng, options));
					}
					return new FeatureGroup(layers);
				case "LineString":
				case "MultiLineString":
					latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
					return new Polyline(latlngs, options);
				case "Polygon":
				case "MultiPolygon":
					latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
					return new Polygon(latlngs, options);
				case "GeometryCollection":
					for (i = 0, len = geometry.geometries.length; i < len; i++) {
						var geoLayer = geometryToLayer({
							geometry: geometry.geometries[i],
							type: "Feature",
							properties: geojson.properties
						}, options);
						if (geoLayer) layers.push(geoLayer);
					}
					return new FeatureGroup(layers);
				case "FeatureCollection":
					for (i = 0, len = geometry.features.length; i < len; i++) {
						var featureLayer = geometryToLayer(geometry.features[i], options);
						if (featureLayer) layers.push(featureLayer);
					}
					return new FeatureGroup(layers);
				default: throw new Error("Invalid GeoJSON object.");
			}
		}
		function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
			return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker(latlng, options && options.markersInheritOptions && options);
		}
		function coordsToLatLng(coords) {
			return new LatLng(coords[1], coords[0], coords[2]);
		}
		function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
			var latlngs = [];
			for (var i = 0, len = coords.length, latlng; i < len; i++) {
				latlng = levelsDeep ? coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i]);
				latlngs.push(latlng);
			}
			return latlngs;
		}
		function latLngToCoords(latlng, precision) {
			latlng = toLatLng(latlng);
			return latlng.alt !== void 0 ? [
				formatNum(latlng.lng, precision),
				formatNum(latlng.lat, precision),
				formatNum(latlng.alt, precision)
			] : [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
		}
		function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
			var coords = [];
			for (var i = 0, len = latlngs.length; i < len; i++) coords.push(levelsDeep ? latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i], precision));
			if (!levelsDeep && closed && coords.length > 0) coords.push(coords[0].slice());
			return coords;
		}
		function getFeature(layer, newGeometry) {
			return layer.feature ? extend({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
		}
		function asFeature(geojson) {
			if (geojson.type === "Feature" || geojson.type === "FeatureCollection") return geojson;
			return {
				type: "Feature",
				properties: {},
				geometry: geojson
			};
		}
		var PointToGeoJSON = { toGeoJSON: function(precision) {
			return getFeature(this, {
				type: "Point",
				coordinates: latLngToCoords(this.getLatLng(), precision)
			});
		} };
		Marker.include(PointToGeoJSON);
		Circle.include(PointToGeoJSON);
		CircleMarker.include(PointToGeoJSON);
		Polyline.include({ toGeoJSON: function(precision) {
			var multi = !isFlat(this._latlngs);
			var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
			return getFeature(this, {
				type: (multi ? "Multi" : "") + "LineString",
				coordinates: coords
			});
		} });
		Polygon.include({ toGeoJSON: function(precision) {
			var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
			var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
			if (!holes) coords = [coords];
			return getFeature(this, {
				type: (multi ? "Multi" : "") + "Polygon",
				coordinates: coords
			});
		} });
		LayerGroup.include({
			toMultiPoint: function(precision) {
				var coords = [];
				this.eachLayer(function(layer) {
					coords.push(layer.toGeoJSON(precision).geometry.coordinates);
				});
				return getFeature(this, {
					type: "MultiPoint",
					coordinates: coords
				});
			},
			toGeoJSON: function(precision) {
				var type = this.feature && this.feature.geometry && this.feature.geometry.type;
				if (type === "MultiPoint") return this.toMultiPoint(precision);
				var isGeometryCollection = type === "GeometryCollection", jsons = [];
				this.eachLayer(function(layer) {
					if (layer.toGeoJSON) {
						var json = layer.toGeoJSON(precision);
						if (isGeometryCollection) jsons.push(json.geometry);
						else {
							var feature = asFeature(json);
							if (feature.type === "FeatureCollection") jsons.push.apply(jsons, feature.features);
							else jsons.push(feature);
						}
					}
				});
				if (isGeometryCollection) return getFeature(this, {
					geometries: jsons,
					type: "GeometryCollection"
				});
				return {
					type: "FeatureCollection",
					features: jsons
				};
			}
		});
		function geoJSON(geojson, options) {
			return new GeoJSON(geojson, options);
		}
		var geoJson = geoJSON;
		var ImageOverlay = Layer.extend({
			options: {
				opacity: 1,
				alt: "",
				interactive: false,
				crossOrigin: false,
				errorOverlayUrl: "",
				zIndex: 1,
				className: ""
			},
			initialize: function(url, bounds, options) {
				this._url = url;
				this._bounds = toLatLngBounds(bounds);
				setOptions(this, options);
			},
			onAdd: function() {
				if (!this._image) {
					this._initImage();
					if (this.options.opacity < 1) this._updateOpacity();
				}
				if (this.options.interactive) {
					addClass(this._image, "leaflet-interactive");
					this.addInteractiveTarget(this._image);
				}
				this.getPane().appendChild(this._image);
				this._reset();
			},
			onRemove: function() {
				remove(this._image);
				if (this.options.interactive) this.removeInteractiveTarget(this._image);
			},
			setOpacity: function(opacity) {
				this.options.opacity = opacity;
				if (this._image) this._updateOpacity();
				return this;
			},
			setStyle: function(styleOpts) {
				if (styleOpts.opacity) this.setOpacity(styleOpts.opacity);
				return this;
			},
			bringToFront: function() {
				if (this._map) toFront(this._image);
				return this;
			},
			bringToBack: function() {
				if (this._map) toBack(this._image);
				return this;
			},
			setUrl: function(url) {
				this._url = url;
				if (this._image) this._image.src = url;
				return this;
			},
			setBounds: function(bounds) {
				this._bounds = toLatLngBounds(bounds);
				if (this._map) this._reset();
				return this;
			},
			getEvents: function() {
				var events = {
					zoom: this._reset,
					viewreset: this._reset
				};
				if (this._zoomAnimated) events.zoomanim = this._animateZoom;
				return events;
			},
			setZIndex: function(value) {
				this.options.zIndex = value;
				this._updateZIndex();
				return this;
			},
			getBounds: function() {
				return this._bounds;
			},
			getElement: function() {
				return this._image;
			},
			_initImage: function() {
				var wasElementSupplied = this._url.tagName === "IMG";
				var img = this._image = wasElementSupplied ? this._url : create$1("img");
				addClass(img, "leaflet-image-layer");
				if (this._zoomAnimated) addClass(img, "leaflet-zoom-animated");
				if (this.options.className) addClass(img, this.options.className);
				img.onselectstart = falseFn;
				img.onmousemove = falseFn;
				img.onload = bind(this.fire, this, "load");
				img.onerror = bind(this._overlayOnError, this, "error");
				if (this.options.crossOrigin || this.options.crossOrigin === "") img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
				if (this.options.zIndex) this._updateZIndex();
				if (wasElementSupplied) {
					this._url = img.src;
					return;
				}
				img.src = this._url;
				img.alt = this.options.alt;
			},
			_animateZoom: function(e) {
				var scale = this._map.getZoomScale(e.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
				setTransform(this._image, offset, scale);
			},
			_reset: function() {
				var image = this._image, bounds = new Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), size = bounds.getSize();
				setPosition(image, bounds.min);
				image.style.width = size.x + "px";
				image.style.height = size.y + "px";
			},
			_updateOpacity: function() {
				setOpacity(this._image, this.options.opacity);
			},
			_updateZIndex: function() {
				if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) this._image.style.zIndex = this.options.zIndex;
			},
			_overlayOnError: function() {
				this.fire("error");
				var errorUrl = this.options.errorOverlayUrl;
				if (errorUrl && this._url !== errorUrl) {
					this._url = errorUrl;
					this._image.src = errorUrl;
				}
			},
			getCenter: function() {
				return this._bounds.getCenter();
			}
		});
		var imageOverlay = function(url, bounds, options) {
			return new ImageOverlay(url, bounds, options);
		};
		var VideoOverlay = ImageOverlay.extend({
			options: {
				autoplay: true,
				loop: true,
				keepAspectRatio: true,
				muted: false,
				playsInline: true
			},
			_initImage: function() {
				var wasElementSupplied = this._url.tagName === "VIDEO";
				var vid = this._image = wasElementSupplied ? this._url : create$1("video");
				addClass(vid, "leaflet-image-layer");
				if (this._zoomAnimated) addClass(vid, "leaflet-zoom-animated");
				if (this.options.className) addClass(vid, this.options.className);
				vid.onselectstart = falseFn;
				vid.onmousemove = falseFn;
				vid.onloadeddata = bind(this.fire, this, "load");
				if (wasElementSupplied) {
					var sourceElements = vid.getElementsByTagName("source");
					var sources = [];
					for (var j = 0; j < sourceElements.length; j++) sources.push(sourceElements[j].src);
					this._url = sourceElements.length > 0 ? sources : [vid.src];
					return;
				}
				if (!isArray(this._url)) this._url = [this._url];
				if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) vid.style["objectFit"] = "fill";
				vid.autoplay = !!this.options.autoplay;
				vid.loop = !!this.options.loop;
				vid.muted = !!this.options.muted;
				vid.playsInline = !!this.options.playsInline;
				for (var i = 0; i < this._url.length; i++) {
					var source = create$1("source");
					source.src = this._url[i];
					vid.appendChild(source);
				}
			}
		});
		function videoOverlay(video, bounds, options) {
			return new VideoOverlay(video, bounds, options);
		}
		var SVGOverlay = ImageOverlay.extend({ _initImage: function() {
			var el = this._image = this._url;
			addClass(el, "leaflet-image-layer");
			if (this._zoomAnimated) addClass(el, "leaflet-zoom-animated");
			if (this.options.className) addClass(el, this.options.className);
			el.onselectstart = falseFn;
			el.onmousemove = falseFn;
		} });
		function svgOverlay(el, bounds, options) {
			return new SVGOverlay(el, bounds, options);
		}
		var DivOverlay = Layer.extend({
			options: {
				interactive: false,
				offset: [0, 0],
				className: "",
				pane: void 0,
				content: ""
			},
			initialize: function(options, source) {
				if (options && (options instanceof LatLng || isArray(options))) {
					this._latlng = toLatLng(options);
					setOptions(this, source);
				} else {
					setOptions(this, options);
					this._source = source;
				}
				if (this.options.content) this._content = this.options.content;
			},
			openOn: function(map) {
				map = arguments.length ? map : this._source._map;
				if (!map.hasLayer(this)) map.addLayer(this);
				return this;
			},
			close: function() {
				if (this._map) this._map.removeLayer(this);
				return this;
			},
			toggle: function(layer) {
				if (this._map) this.close();
				else {
					if (arguments.length) this._source = layer;
					else layer = this._source;
					this._prepareOpen();
					this.openOn(layer._map);
				}
				return this;
			},
			onAdd: function(map) {
				this._zoomAnimated = map._zoomAnimated;
				if (!this._container) this._initLayout();
				if (map._fadeAnimated) setOpacity(this._container, 0);
				clearTimeout(this._removeTimeout);
				this.getPane().appendChild(this._container);
				this.update();
				if (map._fadeAnimated) setOpacity(this._container, 1);
				this.bringToFront();
				if (this.options.interactive) {
					addClass(this._container, "leaflet-interactive");
					this.addInteractiveTarget(this._container);
				}
			},
			onRemove: function(map) {
				if (map._fadeAnimated) {
					setOpacity(this._container, 0);
					this._removeTimeout = setTimeout(bind(remove, void 0, this._container), 200);
				} else remove(this._container);
				if (this.options.interactive) {
					removeClass(this._container, "leaflet-interactive");
					this.removeInteractiveTarget(this._container);
				}
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(latlng) {
				this._latlng = toLatLng(latlng);
				if (this._map) {
					this._updatePosition();
					this._adjustPan();
				}
				return this;
			},
			getContent: function() {
				return this._content;
			},
			setContent: function(content) {
				this._content = content;
				this.update();
				return this;
			},
			getElement: function() {
				return this._container;
			},
			update: function() {
				if (!this._map) return;
				this._container.style.visibility = "hidden";
				this._updateContent();
				this._updateLayout();
				this._updatePosition();
				this._container.style.visibility = "";
				this._adjustPan();
			},
			getEvents: function() {
				var events = {
					zoom: this._updatePosition,
					viewreset: this._updatePosition
				};
				if (this._zoomAnimated) events.zoomanim = this._animateZoom;
				return events;
			},
			isOpen: function() {
				return !!this._map && this._map.hasLayer(this);
			},
			bringToFront: function() {
				if (this._map) toFront(this._container);
				return this;
			},
			bringToBack: function() {
				if (this._map) toBack(this._container);
				return this;
			},
			_prepareOpen: function(latlng) {
				var source = this._source;
				if (!source._map) return false;
				if (source instanceof FeatureGroup) {
					source = null;
					var layers = this._source._layers;
					for (var id in layers) if (layers[id]._map) {
						source = layers[id];
						break;
					}
					if (!source) return false;
					this._source = source;
				}
				if (!latlng) if (source.getCenter) latlng = source.getCenter();
				else if (source.getLatLng) latlng = source.getLatLng();
				else if (source.getBounds) latlng = source.getBounds().getCenter();
				else throw new Error("Unable to get source layer LatLng.");
				this.setLatLng(latlng);
				if (this._map) this.update();
				return true;
			},
			_updateContent: function() {
				if (!this._content) return;
				var node = this._contentNode;
				var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
				if (typeof content === "string") node.innerHTML = content;
				else {
					while (node.hasChildNodes()) node.removeChild(node.firstChild);
					node.appendChild(content);
				}
				this.fire("contentupdate");
			},
			_updatePosition: function() {
				if (!this._map) return;
				var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint(this.options.offset), anchor = this._getAnchor();
				if (this._zoomAnimated) setPosition(this._container, pos.add(anchor));
				else offset = offset.add(pos).add(anchor);
				var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
				this._container.style.bottom = bottom + "px";
				this._container.style.left = left + "px";
			},
			_getAnchor: function() {
				return [0, 0];
			}
		});
		Map.include({ _initOverlay: function(OverlayClass, content, latlng, options) {
			var overlay = content;
			if (!(overlay instanceof OverlayClass)) overlay = new OverlayClass(options).setContent(content);
			if (latlng) overlay.setLatLng(latlng);
			return overlay;
		} });
		Layer.include({ _initOverlay: function(OverlayClass, old, content, options) {
			var overlay = content;
			if (overlay instanceof OverlayClass) {
				setOptions(overlay, options);
				overlay._source = this;
			} else {
				overlay = old && !options ? old : new OverlayClass(options, this);
				overlay.setContent(content);
			}
			return overlay;
		} });
		var Popup = DivOverlay.extend({
			options: {
				pane: "popupPane",
				offset: [0, 7],
				maxWidth: 300,
				minWidth: 50,
				maxHeight: null,
				autoPan: true,
				autoPanPaddingTopLeft: null,
				autoPanPaddingBottomRight: null,
				autoPanPadding: [5, 5],
				keepInView: false,
				closeButton: true,
				autoClose: true,
				closeOnEscapeKey: true,
				className: ""
			},
			openOn: function(map) {
				map = arguments.length ? map : this._source._map;
				if (!map.hasLayer(this) && map._popup && map._popup.options.autoClose) map.removeLayer(map._popup);
				map._popup = this;
				return DivOverlay.prototype.openOn.call(this, map);
			},
			onAdd: function(map) {
				DivOverlay.prototype.onAdd.call(this, map);
				map.fire("popupopen", { popup: this });
				if (this._source) {
					this._source.fire("popupopen", { popup: this }, true);
					if (!(this._source instanceof Path)) this._source.on("preclick", stopPropagation);
				}
			},
			onRemove: function(map) {
				DivOverlay.prototype.onRemove.call(this, map);
				map.fire("popupclose", { popup: this });
				if (this._source) {
					this._source.fire("popupclose", { popup: this }, true);
					if (!(this._source instanceof Path)) this._source.off("preclick", stopPropagation);
				}
			},
			getEvents: function() {
				var events = DivOverlay.prototype.getEvents.call(this);
				if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) events.preclick = this.close;
				if (this.options.keepInView) events.moveend = this._adjustPan;
				return events;
			},
			_initLayout: function() {
				var prefix = "leaflet-popup", container = this._container = create$1("div", prefix + " " + (this.options.className || "") + " leaflet-zoom-animated");
				var wrapper = this._wrapper = create$1("div", prefix + "-content-wrapper", container);
				this._contentNode = create$1("div", prefix + "-content", wrapper);
				disableClickPropagation(container);
				disableScrollPropagation(this._contentNode);
				on(container, "contextmenu", stopPropagation);
				this._tipContainer = create$1("div", prefix + "-tip-container", container);
				this._tip = create$1("div", prefix + "-tip", this._tipContainer);
				if (this.options.closeButton) {
					var closeButton = this._closeButton = create$1("a", prefix + "-close-button", container);
					closeButton.setAttribute("role", "button");
					closeButton.setAttribute("aria-label", "Close popup");
					closeButton.href = "#close";
					closeButton.innerHTML = "<span aria-hidden=\"true\">&#215;</span>";
					on(closeButton, "click", function(ev) {
						preventDefault(ev);
						this.close();
					}, this);
				}
			},
			_updateLayout: function() {
				var container = this._contentNode, style = container.style;
				style.width = "";
				style.whiteSpace = "nowrap";
				var width = container.offsetWidth;
				width = Math.min(width, this.options.maxWidth);
				width = Math.max(width, this.options.minWidth);
				style.width = width + 1 + "px";
				style.whiteSpace = "";
				style.height = "";
				var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
				if (maxHeight && height > maxHeight) {
					style.height = maxHeight + "px";
					addClass(container, scrolledClass);
				} else removeClass(container, scrolledClass);
				this._containerWidth = this._container.offsetWidth;
			},
			_animateZoom: function(e) {
				var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), anchor = this._getAnchor();
				setPosition(this._container, pos.add(anchor));
			},
			_adjustPan: function() {
				if (!this.options.autoPan) return;
				if (this._map._panAnim) this._map._panAnim.stop();
				if (this._autopanning) {
					this._autopanning = false;
					return;
				}
				var map = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
				layerPos._add(getPosition(this._container));
				var containerPos = map.layerPointToContainerPoint(layerPos), padding = toPoint(this.options.autoPanPadding), paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding), size = map.getSize(), dx = 0, dy = 0;
				if (containerPos.x + containerWidth + paddingBR.x > size.x) dx = containerPos.x + containerWidth - size.x + paddingBR.x;
				if (containerPos.x - dx - paddingTL.x < 0) dx = containerPos.x - paddingTL.x;
				if (containerPos.y + containerHeight + paddingBR.y > size.y) dy = containerPos.y + containerHeight - size.y + paddingBR.y;
				if (containerPos.y - dy - paddingTL.y < 0) dy = containerPos.y - paddingTL.y;
				if (dx || dy) {
					if (this.options.keepInView) this._autopanning = true;
					map.fire("autopanstart").panBy([dx, dy]);
				}
			},
			_getAnchor: function() {
				return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
			}
		});
		var popup = function(options, source) {
			return new Popup(options, source);
		};
		Map.mergeOptions({ closePopupOnClick: true });
		Map.include({
			openPopup: function(popup, latlng, options) {
				this._initOverlay(Popup, popup, latlng, options).openOn(this);
				return this;
			},
			closePopup: function(popup) {
				popup = arguments.length ? popup : this._popup;
				if (popup) popup.close();
				return this;
			}
		});
		Layer.include({
			bindPopup: function(content, options) {
				this._popup = this._initOverlay(Popup, this._popup, content, options);
				if (!this._popupHandlersAdded) {
					this.on({
						click: this._openPopup,
						keypress: this._onKeyPress,
						remove: this.closePopup,
						move: this._movePopup
					});
					this._popupHandlersAdded = true;
				}
				return this;
			},
			unbindPopup: function() {
				if (this._popup) {
					this.off({
						click: this._openPopup,
						keypress: this._onKeyPress,
						remove: this.closePopup,
						move: this._movePopup
					});
					this._popupHandlersAdded = false;
					this._popup = null;
				}
				return this;
			},
			openPopup: function(latlng) {
				if (this._popup) {
					if (!(this instanceof FeatureGroup)) this._popup._source = this;
					if (this._popup._prepareOpen(latlng || this._latlng)) this._popup.openOn(this._map);
				}
				return this;
			},
			closePopup: function() {
				if (this._popup) this._popup.close();
				return this;
			},
			togglePopup: function() {
				if (this._popup) this._popup.toggle(this);
				return this;
			},
			isPopupOpen: function() {
				return this._popup ? this._popup.isOpen() : false;
			},
			setPopupContent: function(content) {
				if (this._popup) this._popup.setContent(content);
				return this;
			},
			getPopup: function() {
				return this._popup;
			},
			_openPopup: function(e) {
				if (!this._popup || !this._map) return;
				stop(e);
				var target = e.layer || e.target;
				if (this._popup._source === target && !(target instanceof Path)) {
					if (this._map.hasLayer(this._popup)) this.closePopup();
					else this.openPopup(e.latlng);
					return;
				}
				this._popup._source = target;
				this.openPopup(e.latlng);
			},
			_movePopup: function(e) {
				this._popup.setLatLng(e.latlng);
			},
			_onKeyPress: function(e) {
				if (e.originalEvent.keyCode === 13) this._openPopup(e);
			}
		});
		var Tooltip = DivOverlay.extend({
			options: {
				pane: "tooltipPane",
				offset: [0, 0],
				direction: "auto",
				permanent: false,
				sticky: false,
				opacity: .9
			},
			onAdd: function(map) {
				DivOverlay.prototype.onAdd.call(this, map);
				this.setOpacity(this.options.opacity);
				map.fire("tooltipopen", { tooltip: this });
				if (this._source) {
					this.addEventParent(this._source);
					this._source.fire("tooltipopen", { tooltip: this }, true);
				}
			},
			onRemove: function(map) {
				DivOverlay.prototype.onRemove.call(this, map);
				map.fire("tooltipclose", { tooltip: this });
				if (this._source) {
					this.removeEventParent(this._source);
					this._source.fire("tooltipclose", { tooltip: this }, true);
				}
			},
			getEvents: function() {
				var events = DivOverlay.prototype.getEvents.call(this);
				if (!this.options.permanent) events.preclick = this.close;
				return events;
			},
			_initLayout: function() {
				var className = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
				this._contentNode = this._container = create$1("div", className);
				this._container.setAttribute("role", "tooltip");
				this._container.setAttribute("id", "leaflet-tooltip-" + stamp(this));
			},
			_updateLayout: function() {},
			_adjustPan: function() {},
			_setPosition: function(pos) {
				var subX, subY, map = this._map, container = this._container, centerPoint = map.latLngToContainerPoint(map.getCenter()), tooltipPoint = map.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint(this.options.offset), anchor = this._getAnchor();
				if (direction === "top") {
					subX = tooltipWidth / 2;
					subY = tooltipHeight;
				} else if (direction === "bottom") {
					subX = tooltipWidth / 2;
					subY = 0;
				} else if (direction === "center") {
					subX = tooltipWidth / 2;
					subY = tooltipHeight / 2;
				} else if (direction === "right") {
					subX = 0;
					subY = tooltipHeight / 2;
				} else if (direction === "left") {
					subX = tooltipWidth;
					subY = tooltipHeight / 2;
				} else if (tooltipPoint.x < centerPoint.x) {
					direction = "right";
					subX = 0;
					subY = tooltipHeight / 2;
				} else {
					direction = "left";
					subX = tooltipWidth + (offset.x + anchor.x) * 2;
					subY = tooltipHeight / 2;
				}
				pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);
				removeClass(container, "leaflet-tooltip-right");
				removeClass(container, "leaflet-tooltip-left");
				removeClass(container, "leaflet-tooltip-top");
				removeClass(container, "leaflet-tooltip-bottom");
				addClass(container, "leaflet-tooltip-" + direction);
				setPosition(container, pos);
			},
			_updatePosition: function() {
				var pos = this._map.latLngToLayerPoint(this._latlng);
				this._setPosition(pos);
			},
			setOpacity: function(opacity) {
				this.options.opacity = opacity;
				if (this._container) setOpacity(this._container, opacity);
			},
			_animateZoom: function(e) {
				var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
				this._setPosition(pos);
			},
			_getAnchor: function() {
				return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
			}
		});
		var tooltip = function(options, source) {
			return new Tooltip(options, source);
		};
		Map.include({
			openTooltip: function(tooltip, latlng, options) {
				this._initOverlay(Tooltip, tooltip, latlng, options).openOn(this);
				return this;
			},
			closeTooltip: function(tooltip) {
				tooltip.close();
				return this;
			}
		});
		Layer.include({
			bindTooltip: function(content, options) {
				if (this._tooltip && this.isTooltipOpen()) this.unbindTooltip();
				this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
				this._initTooltipInteractions();
				if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) this.openTooltip();
				return this;
			},
			unbindTooltip: function() {
				if (this._tooltip) {
					this._initTooltipInteractions(true);
					this.closeTooltip();
					this._tooltip = null;
				}
				return this;
			},
			_initTooltipInteractions: function(remove) {
				if (!remove && this._tooltipHandlersAdded) return;
				var onOff = remove ? "off" : "on", events = {
					remove: this.closeTooltip,
					move: this._moveTooltip
				};
				if (!this._tooltip.options.permanent) {
					events.mouseover = this._openTooltip;
					events.mouseout = this.closeTooltip;
					events.click = this._openTooltip;
					if (this._map) this._addFocusListeners();
					else events.add = this._addFocusListeners;
				} else events.add = this._openTooltip;
				if (this._tooltip.options.sticky) events.mousemove = this._moveTooltip;
				this[onOff](events);
				this._tooltipHandlersAdded = !remove;
			},
			openTooltip: function(latlng) {
				if (this._tooltip) {
					if (!(this instanceof FeatureGroup)) this._tooltip._source = this;
					if (this._tooltip._prepareOpen(latlng)) {
						this._tooltip.openOn(this._map);
						if (this.getElement) this._setAriaDescribedByOnLayer(this);
						else if (this.eachLayer) this.eachLayer(this._setAriaDescribedByOnLayer, this);
					}
				}
				return this;
			},
			closeTooltip: function() {
				if (this._tooltip) return this._tooltip.close();
			},
			toggleTooltip: function() {
				if (this._tooltip) this._tooltip.toggle(this);
				return this;
			},
			isTooltipOpen: function() {
				return this._tooltip.isOpen();
			},
			setTooltipContent: function(content) {
				if (this._tooltip) this._tooltip.setContent(content);
				return this;
			},
			getTooltip: function() {
				return this._tooltip;
			},
			_addFocusListeners: function() {
				if (this.getElement) this._addFocusListenersOnLayer(this);
				else if (this.eachLayer) this.eachLayer(this._addFocusListenersOnLayer, this);
			},
			_addFocusListenersOnLayer: function(layer) {
				var el = typeof layer.getElement === "function" && layer.getElement();
				if (el) {
					on(el, "focus", function() {
						this._tooltip._source = layer;
						this.openTooltip();
					}, this);
					on(el, "blur", this.closeTooltip, this);
				}
			},
			_setAriaDescribedByOnLayer: function(layer) {
				var el = typeof layer.getElement === "function" && layer.getElement();
				if (el) el.setAttribute("aria-describedby", this._tooltip._container.id);
			},
			_openTooltip: function(e) {
				if (!this._tooltip || !this._map) return;
				if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
					this._openOnceFlag = true;
					var that = this;
					this._map.once("moveend", function() {
						that._openOnceFlag = false;
						that._openTooltip(e);
					});
					return;
				}
				this._tooltip._source = e.layer || e.target;
				this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
			},
			_moveTooltip: function(e) {
				var latlng = e.latlng, containerPoint, layerPoint;
				if (this._tooltip.options.sticky && e.originalEvent) {
					containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
					layerPoint = this._map.containerPointToLayerPoint(containerPoint);
					latlng = this._map.layerPointToLatLng(layerPoint);
				}
				this._tooltip.setLatLng(latlng);
			}
		});
		var DivIcon = Icon.extend({
			options: {
				iconSize: [12, 12],
				html: false,
				bgPos: null,
				className: "leaflet-div-icon"
			},
			createIcon: function(oldIcon) {
				var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
				if (options.html instanceof Element) {
					empty(div);
					div.appendChild(options.html);
				} else div.innerHTML = options.html !== false ? options.html : "";
				if (options.bgPos) {
					var bgPos = toPoint(options.bgPos);
					div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
				}
				this._setIconStyles(div, "icon");
				return div;
			},
			createShadow: function() {
				return null;
			}
		});
		function divIcon(options) {
			return new DivIcon(options);
		}
		Icon.Default = IconDefault;
		var GridLayer = Layer.extend({
			options: {
				tileSize: 256,
				opacity: 1,
				updateWhenIdle: Browser.mobile,
				updateWhenZooming: true,
				updateInterval: 200,
				zIndex: 1,
				bounds: null,
				minZoom: 0,
				maxZoom: void 0,
				maxNativeZoom: void 0,
				minNativeZoom: void 0,
				noWrap: false,
				pane: "tilePane",
				className: "",
				keepBuffer: 2
			},
			initialize: function(options) {
				setOptions(this, options);
			},
			onAdd: function() {
				this._initContainer();
				this._levels = {};
				this._tiles = {};
				this._resetView();
			},
			beforeAdd: function(map) {
				map._addZoomLimit(this);
			},
			onRemove: function(map) {
				this._removeAllTiles();
				remove(this._container);
				map._removeZoomLimit(this);
				this._container = null;
				this._tileZoom = void 0;
			},
			bringToFront: function() {
				if (this._map) {
					toFront(this._container);
					this._setAutoZIndex(Math.max);
				}
				return this;
			},
			bringToBack: function() {
				if (this._map) {
					toBack(this._container);
					this._setAutoZIndex(Math.min);
				}
				return this;
			},
			getContainer: function() {
				return this._container;
			},
			setOpacity: function(opacity) {
				this.options.opacity = opacity;
				this._updateOpacity();
				return this;
			},
			setZIndex: function(zIndex) {
				this.options.zIndex = zIndex;
				this._updateZIndex();
				return this;
			},
			isLoading: function() {
				return this._loading;
			},
			redraw: function() {
				if (this._map) {
					this._removeAllTiles();
					var tileZoom = this._clampZoom(this._map.getZoom());
					if (tileZoom !== this._tileZoom) {
						this._tileZoom = tileZoom;
						this._updateLevels();
					}
					this._update();
				}
				return this;
			},
			getEvents: function() {
				var events = {
					viewprereset: this._invalidateAll,
					viewreset: this._resetView,
					zoom: this._resetView,
					moveend: this._onMoveEnd
				};
				if (!this.options.updateWhenIdle) {
					if (!this._onMove) this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
					events.move = this._onMove;
				}
				if (this._zoomAnimated) events.zoomanim = this._animateZoom;
				return events;
			},
			createTile: function() {
				return document.createElement("div");
			},
			getTileSize: function() {
				var s = this.options.tileSize;
				return s instanceof Point ? s : new Point(s, s);
			},
			_updateZIndex: function() {
				if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) this._container.style.zIndex = this.options.zIndex;
			},
			_setAutoZIndex: function(compare) {
				var layers = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
				for (var i = 0, len = layers.length, zIndex; i < len; i++) {
					zIndex = layers[i].style.zIndex;
					if (layers[i] !== this._container && zIndex) edgeZIndex = compare(edgeZIndex, +zIndex);
				}
				if (isFinite(edgeZIndex)) {
					this.options.zIndex = edgeZIndex + compare(-1, 1);
					this._updateZIndex();
				}
			},
			_updateOpacity: function() {
				if (!this._map) return;
				if (Browser.ielt9) return;
				setOpacity(this._container, this.options.opacity);
				var now = +/* @__PURE__ */ new Date(), nextFrame = false, willPrune = false;
				for (var key in this._tiles) {
					var tile = this._tiles[key];
					if (!tile.current || !tile.loaded) continue;
					var fade = Math.min(1, (now - tile.loaded) / 200);
					setOpacity(tile.el, fade);
					if (fade < 1) nextFrame = true;
					else {
						if (tile.active) willPrune = true;
						else this._onOpaqueTile(tile);
						tile.active = true;
					}
				}
				if (willPrune && !this._noPrune) this._pruneTiles();
				if (nextFrame) {
					cancelAnimFrame(this._fadeFrame);
					this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
				}
			},
			_onOpaqueTile: falseFn,
			_initContainer: function() {
				if (this._container) return;
				this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
				this._updateZIndex();
				if (this.options.opacity < 1) this._updateOpacity();
				this.getPane().appendChild(this._container);
			},
			_updateLevels: function() {
				var zoom = this._tileZoom, maxZoom = this.options.maxZoom;
				if (zoom === void 0) return;
				for (var z in this._levels) {
					z = Number(z);
					if (this._levels[z].el.children.length || z === zoom) {
						this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
						this._onUpdateLevel(z);
					} else {
						remove(this._levels[z].el);
						this._removeTilesAtZoom(z);
						this._onRemoveLevel(z);
						delete this._levels[z];
					}
				}
				var level = this._levels[zoom], map = this._map;
				if (!level) {
					level = this._levels[zoom] = {};
					level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
					level.el.style.zIndex = maxZoom;
					level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
					level.zoom = zoom;
					this._setZoomTransform(level, map.getCenter(), map.getZoom());
					falseFn(level.el.offsetWidth);
					this._onCreateLevel(level);
				}
				this._level = level;
				return level;
			},
			_onUpdateLevel: falseFn,
			_onRemoveLevel: falseFn,
			_onCreateLevel: falseFn,
			_pruneTiles: function() {
				if (!this._map) return;
				var key, tile;
				var zoom = this._map.getZoom();
				if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
					this._removeAllTiles();
					return;
				}
				for (key in this._tiles) {
					tile = this._tiles[key];
					tile.retain = tile.current;
				}
				for (key in this._tiles) {
					tile = this._tiles[key];
					if (tile.current && !tile.active) {
						var coords = tile.coords;
						if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
					}
				}
				for (key in this._tiles) if (!this._tiles[key].retain) this._removeTile(key);
			},
			_removeTilesAtZoom: function(zoom) {
				for (var key in this._tiles) {
					if (this._tiles[key].coords.z !== zoom) continue;
					this._removeTile(key);
				}
			},
			_removeAllTiles: function() {
				for (var key in this._tiles) this._removeTile(key);
			},
			_invalidateAll: function() {
				for (var z in this._levels) {
					remove(this._levels[z].el);
					this._onRemoveLevel(Number(z));
					delete this._levels[z];
				}
				this._removeAllTiles();
				this._tileZoom = void 0;
			},
			_retainParent: function(x, y, z, minZoom) {
				var x2 = Math.floor(x / 2), y2 = Math.floor(y / 2), z2 = z - 1, coords2 = new Point(+x2, +y2);
				coords2.z = +z2;
				var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
				if (tile && tile.active) {
					tile.retain = true;
					return true;
				} else if (tile && tile.loaded) tile.retain = true;
				if (z2 > minZoom) return this._retainParent(x2, y2, z2, minZoom);
				return false;
			},
			_retainChildren: function(x, y, z, maxZoom) {
				for (var i = 2 * x; i < 2 * x + 2; i++) for (var j = 2 * y; j < 2 * y + 2; j++) {
					var coords = new Point(i, j);
					coords.z = z + 1;
					var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
					if (tile && tile.active) {
						tile.retain = true;
						continue;
					} else if (tile && tile.loaded) tile.retain = true;
					if (z + 1 < maxZoom) this._retainChildren(i, j, z + 1, maxZoom);
				}
			},
			_resetView: function(e) {
				var animating = e && (e.pinch || e.flyTo);
				this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
			},
			_animateZoom: function(e) {
				this._setView(e.center, e.zoom, true, e.noUpdate);
			},
			_clampZoom: function(zoom) {
				var options = this.options;
				if (void 0 !== options.minNativeZoom && zoom < options.minNativeZoom) return options.minNativeZoom;
				if (void 0 !== options.maxNativeZoom && options.maxNativeZoom < zoom) return options.maxNativeZoom;
				return zoom;
			},
			_setView: function(center, zoom, noPrune, noUpdate) {
				var tileZoom = Math.round(zoom);
				if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) tileZoom = void 0;
				else tileZoom = this._clampZoom(tileZoom);
				var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
				if (!noUpdate || tileZoomChanged) {
					this._tileZoom = tileZoom;
					if (this._abortLoading) this._abortLoading();
					this._updateLevels();
					this._resetGrid();
					if (tileZoom !== void 0) this._update(center);
					if (!noPrune) this._pruneTiles();
					this._noPrune = !!noPrune;
				}
				this._setZoomTransforms(center, zoom);
			},
			_setZoomTransforms: function(center, zoom) {
				for (var i in this._levels) this._setZoomTransform(this._levels[i], center, zoom);
			},
			_setZoomTransform: function(level, center, zoom) {
				var scale = this._map.getZoomScale(zoom, level.zoom), translate = level.origin.multiplyBy(scale).subtract(this._map._getNewPixelOrigin(center, zoom)).round();
				if (Browser.any3d) setTransform(level.el, translate, scale);
				else setPosition(level.el, translate);
			},
			_resetGrid: function() {
				var map = this._map, crs = map.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
				var bounds = this._map.getPixelWorldBounds(this._tileZoom);
				if (bounds) this._globalTileRange = this._pxBoundsToTileRange(bounds);
				this._wrapX = crs.wrapLng && !this.options.noWrap && [Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x), Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)];
				this._wrapY = crs.wrapLat && !this.options.noWrap && [Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x), Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)];
			},
			_onMoveEnd: function() {
				if (!this._map || this._map._animatingZoom) return;
				this._update();
			},
			_getTiledPixelBounds: function(center) {
				var map = this._map, mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(), scale = map.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map.project(center, this._tileZoom).floor(), halfSize = map.getSize().divideBy(scale * 2);
				return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
			},
			_update: function(center) {
				var map = this._map;
				if (!map) return;
				var zoom = this._clampZoom(map.getZoom());
				if (center === void 0) center = map.getCenter();
				if (this._tileZoom === void 0) return;
				var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(tileRange.getBottomLeft().subtract([margin, -margin]), tileRange.getTopRight().add([margin, -margin]));
				if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) throw new Error("Attempted to load an infinite number of tiles");
				for (var key in this._tiles) {
					var c = this._tiles[key].coords;
					if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) this._tiles[key].current = false;
				}
				if (Math.abs(zoom - this._tileZoom) > 1) {
					this._setView(center, zoom);
					return;
				}
				for (var j = tileRange.min.y; j <= tileRange.max.y; j++) for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
					var coords = new Point(i, j);
					coords.z = this._tileZoom;
					if (!this._isValidTile(coords)) continue;
					var tile = this._tiles[this._tileCoordsToKey(coords)];
					if (tile) tile.current = true;
					else queue.push(coords);
				}
				queue.sort(function(a, b) {
					return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
				});
				if (queue.length !== 0) {
					if (!this._loading) {
						this._loading = true;
						this.fire("loading");
					}
					var fragment = document.createDocumentFragment();
					for (i = 0; i < queue.length; i++) this._addTile(queue[i], fragment);
					this._level.el.appendChild(fragment);
				}
			},
			_isValidTile: function(coords) {
				var crs = this._map.options.crs;
				if (!crs.infinite) {
					var bounds = this._globalTileRange;
					if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) return false;
				}
				if (!this.options.bounds) return true;
				var tileBounds = this._tileCoordsToBounds(coords);
				return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
			},
			_keyToBounds: function(key) {
				return this._tileCoordsToBounds(this._keyToTileCoords(key));
			},
			_tileCoordsToNwSe: function(coords) {
				var map = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize);
				return [map.unproject(nwPoint, coords.z), map.unproject(sePoint, coords.z)];
			},
			_tileCoordsToBounds: function(coords) {
				var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
				if (!this.options.noWrap) bounds = this._map.wrapLatLngBounds(bounds);
				return bounds;
			},
			_tileCoordsToKey: function(coords) {
				return coords.x + ":" + coords.y + ":" + coords.z;
			},
			_keyToTileCoords: function(key) {
				var k = key.split(":"), coords = new Point(+k[0], +k[1]);
				coords.z = +k[2];
				return coords;
			},
			_removeTile: function(key) {
				var tile = this._tiles[key];
				if (!tile) return;
				remove(tile.el);
				delete this._tiles[key];
				this.fire("tileunload", {
					tile: tile.el,
					coords: this._keyToTileCoords(key)
				});
			},
			_initTile: function(tile) {
				addClass(tile, "leaflet-tile");
				var tileSize = this.getTileSize();
				tile.style.width = tileSize.x + "px";
				tile.style.height = tileSize.y + "px";
				tile.onselectstart = falseFn;
				tile.onmousemove = falseFn;
				if (Browser.ielt9 && this.options.opacity < 1) setOpacity(tile, this.options.opacity);
			},
			_addTile: function(coords, container) {
				var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
				var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));
				this._initTile(tile);
				if (this.createTile.length < 2) requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
				setPosition(tile, tilePos);
				this._tiles[key] = {
					el: tile,
					coords,
					current: true
				};
				container.appendChild(tile);
				this.fire("tileloadstart", {
					tile,
					coords
				});
			},
			_tileReady: function(coords, err, tile) {
				if (err) this.fire("tileerror", {
					error: err,
					tile,
					coords
				});
				var key = this._tileCoordsToKey(coords);
				tile = this._tiles[key];
				if (!tile) return;
				tile.loaded = +/* @__PURE__ */ new Date();
				if (this._map._fadeAnimated) {
					setOpacity(tile.el, 0);
					cancelAnimFrame(this._fadeFrame);
					this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
				} else {
					tile.active = true;
					this._pruneTiles();
				}
				if (!err) {
					addClass(tile.el, "leaflet-tile-loaded");
					this.fire("tileload", {
						tile: tile.el,
						coords
					});
				}
				if (this._noTilesToLoad()) {
					this._loading = false;
					this.fire("load");
					if (Browser.ielt9 || !this._map._fadeAnimated) requestAnimFrame(this._pruneTiles, this);
					else setTimeout(bind(this._pruneTiles, this), 250);
				}
			},
			_getTilePos: function(coords) {
				return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
			},
			_wrapCoords: function(coords) {
				var newCoords = new Point(this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x, this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y);
				newCoords.z = coords.z;
				return newCoords;
			},
			_pxBoundsToTileRange: function(bounds) {
				var tileSize = this.getTileSize();
				return new Bounds(bounds.min.unscaleBy(tileSize).floor(), bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
			},
			_noTilesToLoad: function() {
				for (var key in this._tiles) if (!this._tiles[key].loaded) return false;
				return true;
			}
		});
		function gridLayer(options) {
			return new GridLayer(options);
		}
		var TileLayer = GridLayer.extend({
			options: {
				minZoom: 0,
				maxZoom: 18,
				subdomains: "abc",
				errorTileUrl: "",
				zoomOffset: 0,
				tms: false,
				zoomReverse: false,
				detectRetina: false,
				crossOrigin: false,
				referrerPolicy: false
			},
			initialize: function(url, options) {
				this._url = url;
				options = setOptions(this, options);
				if (options.detectRetina && Browser.retina && options.maxZoom > 0) {
					options.tileSize = Math.floor(options.tileSize / 2);
					if (!options.zoomReverse) {
						options.zoomOffset++;
						options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
					} else {
						options.zoomOffset--;
						options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
					}
					options.minZoom = Math.max(0, options.minZoom);
				} else if (!options.zoomReverse) options.maxZoom = Math.max(options.minZoom, options.maxZoom);
				else options.minZoom = Math.min(options.maxZoom, options.minZoom);
				if (typeof options.subdomains === "string") options.subdomains = options.subdomains.split("");
				this.on("tileunload", this._onTileRemove);
			},
			setUrl: function(url, noRedraw) {
				if (this._url === url && noRedraw === void 0) noRedraw = true;
				this._url = url;
				if (!noRedraw) this.redraw();
				return this;
			},
			createTile: function(coords, done) {
				var tile = document.createElement("img");
				on(tile, "load", bind(this._tileOnLoad, this, done, tile));
				on(tile, "error", bind(this._tileOnError, this, done, tile));
				if (this.options.crossOrigin || this.options.crossOrigin === "") tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
				if (typeof this.options.referrerPolicy === "string") tile.referrerPolicy = this.options.referrerPolicy;
				tile.alt = "";
				tile.src = this.getTileUrl(coords);
				return tile;
			},
			getTileUrl: function(coords) {
				var data = {
					r: Browser.retina ? "@2x" : "",
					s: this._getSubdomain(coords),
					x: coords.x,
					y: coords.y,
					z: this._getZoomForUrl()
				};
				if (this._map && !this._map.options.crs.infinite) {
					var invertedY = this._globalTileRange.max.y - coords.y;
					if (this.options.tms) data["y"] = invertedY;
					data["-y"] = invertedY;
				}
				return template(this._url, extend(data, this.options));
			},
			_tileOnLoad: function(done, tile) {
				if (Browser.ielt9) setTimeout(bind(done, this, null, tile), 0);
				else done(null, tile);
			},
			_tileOnError: function(done, tile, e) {
				var errorUrl = this.options.errorTileUrl;
				if (errorUrl && tile.getAttribute("src") !== errorUrl) tile.src = errorUrl;
				done(e, tile);
			},
			_onTileRemove: function(e) {
				e.tile.onload = null;
			},
			_getZoomForUrl: function() {
				var zoom = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
				if (zoomReverse) zoom = maxZoom - zoom;
				return zoom + zoomOffset;
			},
			_getSubdomain: function(tilePoint) {
				var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
				return this.options.subdomains[index];
			},
			_abortLoading: function() {
				var i, tile;
				for (i in this._tiles) if (this._tiles[i].coords.z !== this._tileZoom) {
					tile = this._tiles[i].el;
					tile.onload = falseFn;
					tile.onerror = falseFn;
					if (!tile.complete) {
						tile.src = emptyImageUrl;
						var coords = this._tiles[i].coords;
						remove(tile);
						delete this._tiles[i];
						this.fire("tileabort", {
							tile,
							coords
						});
					}
				}
			},
			_removeTile: function(key) {
				var tile = this._tiles[key];
				if (!tile) return;
				tile.el.setAttribute("src", emptyImageUrl);
				return GridLayer.prototype._removeTile.call(this, key);
			},
			_tileReady: function(coords, err, tile) {
				if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) return;
				return GridLayer.prototype._tileReady.call(this, coords, err, tile);
			}
		});
		function tileLayer(url, options) {
			return new TileLayer(url, options);
		}
		var TileLayerWMS = TileLayer.extend({
			defaultWmsParams: {
				service: "WMS",
				request: "GetMap",
				layers: "",
				styles: "",
				format: "image/jpeg",
				transparent: false,
				version: "1.1.1"
			},
			options: {
				crs: null,
				uppercase: false
			},
			initialize: function(url, options) {
				this._url = url;
				var wmsParams = extend({}, this.defaultWmsParams);
				for (var i in options) if (!(i in this.options)) wmsParams[i] = options[i];
				options = setOptions(this, options);
				var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
				var tileSize = this.getTileSize();
				wmsParams.width = tileSize.x * realRetina;
				wmsParams.height = tileSize.y * realRetina;
				this.wmsParams = wmsParams;
			},
			onAdd: function(map) {
				this._crs = this.options.crs || map.options.crs;
				this._wmsVersion = parseFloat(this.wmsParams.version);
				var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
				this.wmsParams[projectionKey] = this._crs.code;
				TileLayer.prototype.onAdd.call(this, map);
			},
			getTileUrl: function(coords) {
				var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min = bounds.min, max = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [
					min.y,
					min.x,
					max.y,
					max.x
				] : [
					min.x,
					min.y,
					max.x,
					max.y
				]).join(","), url = TileLayer.prototype.getTileUrl.call(this, coords);
				return url + getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
			},
			setParams: function(params, noRedraw) {
				extend(this.wmsParams, params);
				if (!noRedraw) this.redraw();
				return this;
			}
		});
		function tileLayerWMS(url, options) {
			return new TileLayerWMS(url, options);
		}
		TileLayer.WMS = TileLayerWMS;
		tileLayer.wms = tileLayerWMS;
		var Renderer = Layer.extend({
			options: { padding: .1 },
			initialize: function(options) {
				setOptions(this, options);
				stamp(this);
				this._layers = this._layers || {};
			},
			onAdd: function() {
				if (!this._container) {
					this._initContainer();
					addClass(this._container, "leaflet-zoom-animated");
				}
				this.getPane().appendChild(this._container);
				this._update();
				this.on("update", this._updatePaths, this);
			},
			onRemove: function() {
				this.off("update", this._updatePaths, this);
				this._destroyContainer();
			},
			getEvents: function() {
				var events = {
					viewreset: this._reset,
					zoom: this._onZoom,
					moveend: this._update,
					zoomend: this._onZoomEnd
				};
				if (this._zoomAnimated) events.zoomanim = this._onAnimZoom;
				return events;
			},
			_onAnimZoom: function(ev) {
				this._updateTransform(ev.center, ev.zoom);
			},
			_onZoom: function() {
				this._updateTransform(this._map.getCenter(), this._map.getZoom());
			},
			_updateTransform: function(center, zoom) {
				var scale = this._map.getZoomScale(zoom, this._zoom), viewHalf = this._map.getSize().multiplyBy(.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom), topLeftOffset = viewHalf.multiplyBy(-scale).add(currentCenterPoint).subtract(this._map._getNewPixelOrigin(center, zoom));
				if (Browser.any3d) setTransform(this._container, topLeftOffset, scale);
				else setPosition(this._container, topLeftOffset);
			},
			_reset: function() {
				this._update();
				this._updateTransform(this._center, this._zoom);
				for (var id in this._layers) this._layers[id]._reset();
			},
			_onZoomEnd: function() {
				for (var id in this._layers) this._layers[id]._project();
			},
			_updatePaths: function() {
				for (var id in this._layers) this._layers[id]._update();
			},
			_update: function() {
				var p = this.options.padding, size = this._map.getSize(), min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
				this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
				this._center = this._map.getCenter();
				this._zoom = this._map.getZoom();
			}
		});
		var Canvas = Renderer.extend({
			options: { tolerance: 0 },
			getEvents: function() {
				var events = Renderer.prototype.getEvents.call(this);
				events.viewprereset = this._onViewPreReset;
				return events;
			},
			_onViewPreReset: function() {
				this._postponeUpdatePaths = true;
			},
			onAdd: function() {
				Renderer.prototype.onAdd.call(this);
				this._draw();
			},
			_initContainer: function() {
				var container = this._container = document.createElement("canvas");
				on(container, "mousemove", this._onMouseMove, this);
				on(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
				on(container, "mouseout", this._handleMouseOut, this);
				container["_leaflet_disable_events"] = true;
				this._ctx = container.getContext("2d");
			},
			_destroyContainer: function() {
				cancelAnimFrame(this._redrawRequest);
				delete this._ctx;
				remove(this._container);
				off(this._container);
				delete this._container;
			},
			_updatePaths: function() {
				if (this._postponeUpdatePaths) return;
				var layer;
				this._redrawBounds = null;
				for (var id in this._layers) {
					layer = this._layers[id];
					layer._update();
				}
				this._redraw();
			},
			_update: function() {
				if (this._map._animatingZoom && this._bounds) return;
				Renderer.prototype._update.call(this);
				var b = this._bounds, container = this._container, size = b.getSize(), m = Browser.retina ? 2 : 1;
				setPosition(container, b.min);
				container.width = m * size.x;
				container.height = m * size.y;
				container.style.width = size.x + "px";
				container.style.height = size.y + "px";
				if (Browser.retina) this._ctx.scale(2, 2);
				this._ctx.translate(-b.min.x, -b.min.y);
				this.fire("update");
			},
			_reset: function() {
				Renderer.prototype._reset.call(this);
				if (this._postponeUpdatePaths) {
					this._postponeUpdatePaths = false;
					this._updatePaths();
				}
			},
			_initPath: function(layer) {
				this._updateDashArray(layer);
				this._layers[stamp(layer)] = layer;
				var order = layer._order = {
					layer,
					prev: this._drawLast,
					next: null
				};
				if (this._drawLast) this._drawLast.next = order;
				this._drawLast = order;
				this._drawFirst = this._drawFirst || this._drawLast;
			},
			_addPath: function(layer) {
				this._requestRedraw(layer);
			},
			_removePath: function(layer) {
				var order = layer._order;
				var next = order.next;
				var prev = order.prev;
				if (next) next.prev = prev;
				else this._drawLast = prev;
				if (prev) prev.next = next;
				else this._drawFirst = next;
				delete layer._order;
				delete this._layers[stamp(layer)];
				this._requestRedraw(layer);
			},
			_updatePath: function(layer) {
				this._extendRedrawBounds(layer);
				layer._project();
				layer._update();
				this._requestRedraw(layer);
			},
			_updateStyle: function(layer) {
				this._updateDashArray(layer);
				this._requestRedraw(layer);
			},
			_updateDashArray: function(layer) {
				if (typeof layer.options.dashArray === "string") {
					var parts = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i;
					for (i = 0; i < parts.length; i++) {
						dashValue = Number(parts[i]);
						if (isNaN(dashValue)) return;
						dashArray.push(dashValue);
					}
					layer.options._dashArray = dashArray;
				} else layer.options._dashArray = layer.options.dashArray;
			},
			_requestRedraw: function(layer) {
				if (!this._map) return;
				this._extendRedrawBounds(layer);
				this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
			},
			_extendRedrawBounds: function(layer) {
				if (layer._pxBounds) {
					var padding = (layer.options.weight || 0) + 1;
					this._redrawBounds = this._redrawBounds || new Bounds();
					this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
					this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
				}
			},
			_redraw: function() {
				this._redrawRequest = null;
				if (this._redrawBounds) {
					this._redrawBounds.min._floor();
					this._redrawBounds.max._ceil();
				}
				this._clear();
				this._draw();
				this._redrawBounds = null;
			},
			_clear: function() {
				var bounds = this._redrawBounds;
				if (bounds) {
					var size = bounds.getSize();
					this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
				} else {
					this._ctx.save();
					this._ctx.setTransform(1, 0, 0, 1, 0, 0);
					this._ctx.clearRect(0, 0, this._container.width, this._container.height);
					this._ctx.restore();
				}
			},
			_draw: function() {
				var layer, bounds = this._redrawBounds;
				this._ctx.save();
				if (bounds) {
					var size = bounds.getSize();
					this._ctx.beginPath();
					this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
					this._ctx.clip();
				}
				this._drawing = true;
				for (var order = this._drawFirst; order; order = order.next) {
					layer = order.layer;
					if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) layer._updatePath();
				}
				this._drawing = false;
				this._ctx.restore();
			},
			_updatePoly: function(layer, closed) {
				if (!this._drawing) return;
				var i, j, len2, p, parts = layer._parts, len = parts.length, ctx = this._ctx;
				if (!len) return;
				ctx.beginPath();
				for (i = 0; i < len; i++) {
					for (j = 0, len2 = parts[i].length; j < len2; j++) {
						p = parts[i][j];
						ctx[j ? "lineTo" : "moveTo"](p.x, p.y);
					}
					if (closed) ctx.closePath();
				}
				this._fillStroke(ctx, layer);
			},
			_updateCircle: function(layer) {
				if (!this._drawing || layer._empty()) return;
				var p = layer._point, ctx = this._ctx, r = Math.max(Math.round(layer._radius), 1), s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
				if (s !== 1) {
					ctx.save();
					ctx.scale(1, s);
				}
				ctx.beginPath();
				ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
				if (s !== 1) ctx.restore();
				this._fillStroke(ctx, layer);
			},
			_fillStroke: function(ctx, layer) {
				var options = layer.options;
				if (options.fill) {
					ctx.globalAlpha = options.fillOpacity;
					ctx.fillStyle = options.fillColor || options.color;
					ctx.fill(options.fillRule || "evenodd");
				}
				if (options.stroke && options.weight !== 0) {
					if (ctx.setLineDash) ctx.setLineDash(layer.options && layer.options._dashArray || []);
					ctx.globalAlpha = options.opacity;
					ctx.lineWidth = options.weight;
					ctx.strokeStyle = options.color;
					ctx.lineCap = options.lineCap;
					ctx.lineJoin = options.lineJoin;
					ctx.stroke();
				}
			},
			_onClick: function(e) {
				var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
				for (var order = this._drawFirst; order; order = order.next) {
					layer = order.layer;
					if (layer.options.interactive && layer._containsPoint(point)) {
						if (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(layer)) clickedLayer = layer;
					}
				}
				this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
			},
			_onMouseMove: function(e) {
				if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) return;
				var point = this._map.mouseEventToLayerPoint(e);
				this._handleMouseHover(e, point);
			},
			_handleMouseOut: function(e) {
				var layer = this._hoveredLayer;
				if (layer) {
					removeClass(this._container, "leaflet-interactive");
					this._fireEvent([layer], e, "mouseout");
					this._hoveredLayer = null;
					this._mouseHoverThrottled = false;
				}
			},
			_handleMouseHover: function(e, point) {
				if (this._mouseHoverThrottled) return;
				var layer, candidateHoveredLayer;
				for (var order = this._drawFirst; order; order = order.next) {
					layer = order.layer;
					if (layer.options.interactive && layer._containsPoint(point)) candidateHoveredLayer = layer;
				}
				if (candidateHoveredLayer !== this._hoveredLayer) {
					this._handleMouseOut(e);
					if (candidateHoveredLayer) {
						addClass(this._container, "leaflet-interactive");
						this._fireEvent([candidateHoveredLayer], e, "mouseover");
						this._hoveredLayer = candidateHoveredLayer;
					}
				}
				this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);
				this._mouseHoverThrottled = true;
				setTimeout(bind(function() {
					this._mouseHoverThrottled = false;
				}, this), 32);
			},
			_fireEvent: function(layers, e, type) {
				this._map._fireDOMEvent(e, type || e.type, layers);
			},
			_bringToFront: function(layer) {
				var order = layer._order;
				if (!order) return;
				var next = order.next;
				var prev = order.prev;
				if (next) next.prev = prev;
				else return;
				if (prev) prev.next = next;
				else if (next) this._drawFirst = next;
				order.prev = this._drawLast;
				this._drawLast.next = order;
				order.next = null;
				this._drawLast = order;
				this._requestRedraw(layer);
			},
			_bringToBack: function(layer) {
				var order = layer._order;
				if (!order) return;
				var next = order.next;
				var prev = order.prev;
				if (prev) prev.next = next;
				else return;
				if (next) next.prev = prev;
				else if (prev) this._drawLast = prev;
				order.prev = null;
				order.next = this._drawFirst;
				this._drawFirst.prev = order;
				this._drawFirst = order;
				this._requestRedraw(layer);
			}
		});
		function canvas(options) {
			return Browser.canvas ? new Canvas(options) : null;
		}
		var vmlCreate = (function() {
			try {
				document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
				return function(name) {
					return document.createElement("<lvml:" + name + " class=\"lvml\">");
				};
			} catch (e) {}
			return function(name) {
				return document.createElement("<" + name + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"lvml\">");
			};
		})();
		var vmlMixin = {
			_initContainer: function() {
				this._container = create$1("div", "leaflet-vml-container");
			},
			_update: function() {
				if (this._map._animatingZoom) return;
				Renderer.prototype._update.call(this);
				this.fire("update");
			},
			_initPath: function(layer) {
				var container = layer._container = vmlCreate("shape");
				addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
				container.coordsize = "1 1";
				layer._path = vmlCreate("path");
				container.appendChild(layer._path);
				this._updateStyle(layer);
				this._layers[stamp(layer)] = layer;
			},
			_addPath: function(layer) {
				var container = layer._container;
				this._container.appendChild(container);
				if (layer.options.interactive) layer.addInteractiveTarget(container);
			},
			_removePath: function(layer) {
				var container = layer._container;
				remove(container);
				layer.removeInteractiveTarget(container);
				delete this._layers[stamp(layer)];
			},
			_updateStyle: function(layer) {
				var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
				container.stroked = !!options.stroke;
				container.filled = !!options.fill;
				if (options.stroke) {
					if (!stroke) stroke = layer._stroke = vmlCreate("stroke");
					container.appendChild(stroke);
					stroke.weight = options.weight + "px";
					stroke.color = options.color;
					stroke.opacity = options.opacity;
					if (options.dashArray) stroke.dashStyle = isArray(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
					else stroke.dashStyle = "";
					stroke.endcap = options.lineCap.replace("butt", "flat");
					stroke.joinstyle = options.lineJoin;
				} else if (stroke) {
					container.removeChild(stroke);
					layer._stroke = null;
				}
				if (options.fill) {
					if (!fill) fill = layer._fill = vmlCreate("fill");
					container.appendChild(fill);
					fill.color = options.fillColor || options.color;
					fill.opacity = options.fillOpacity;
				} else if (fill) {
					container.removeChild(fill);
					layer._fill = null;
				}
			},
			_updateCircle: function(layer) {
				var p = layer._point.round(), r = Math.round(layer._radius), r2 = Math.round(layer._radiusY || r);
				this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p.x + "," + p.y + " " + r + "," + r2 + " 0,23592600");
			},
			_setPath: function(layer, path) {
				layer._path.v = path;
			},
			_bringToFront: function(layer) {
				toFront(layer._container);
			},
			_bringToBack: function(layer) {
				toBack(layer._container);
			}
		};
		var create = Browser.vml ? vmlCreate : svgCreate;
		var SVG = Renderer.extend({
			_initContainer: function() {
				this._container = create("svg");
				this._container.setAttribute("pointer-events", "none");
				this._rootGroup = create("g");
				this._container.appendChild(this._rootGroup);
			},
			_destroyContainer: function() {
				remove(this._container);
				off(this._container);
				delete this._container;
				delete this._rootGroup;
				delete this._svgSize;
			},
			_update: function() {
				if (this._map._animatingZoom && this._bounds) return;
				Renderer.prototype._update.call(this);
				var b = this._bounds, size = b.getSize(), container = this._container;
				if (!this._svgSize || !this._svgSize.equals(size)) {
					this._svgSize = size;
					container.setAttribute("width", size.x);
					container.setAttribute("height", size.y);
				}
				setPosition(container, b.min);
				container.setAttribute("viewBox", [
					b.min.x,
					b.min.y,
					size.x,
					size.y
				].join(" "));
				this.fire("update");
			},
			_initPath: function(layer) {
				var path = layer._path = create("path");
				if (layer.options.className) addClass(path, layer.options.className);
				if (layer.options.interactive) addClass(path, "leaflet-interactive");
				this._updateStyle(layer);
				this._layers[stamp(layer)] = layer;
			},
			_addPath: function(layer) {
				if (!this._rootGroup) this._initContainer();
				this._rootGroup.appendChild(layer._path);
				layer.addInteractiveTarget(layer._path);
			},
			_removePath: function(layer) {
				remove(layer._path);
				layer.removeInteractiveTarget(layer._path);
				delete this._layers[stamp(layer)];
			},
			_updatePath: function(layer) {
				layer._project();
				layer._update();
			},
			_updateStyle: function(layer) {
				var path = layer._path, options = layer.options;
				if (!path) return;
				if (options.stroke) {
					path.setAttribute("stroke", options.color);
					path.setAttribute("stroke-opacity", options.opacity);
					path.setAttribute("stroke-width", options.weight);
					path.setAttribute("stroke-linecap", options.lineCap);
					path.setAttribute("stroke-linejoin", options.lineJoin);
					if (options.dashArray) path.setAttribute("stroke-dasharray", options.dashArray);
					else path.removeAttribute("stroke-dasharray");
					if (options.dashOffset) path.setAttribute("stroke-dashoffset", options.dashOffset);
					else path.removeAttribute("stroke-dashoffset");
				} else path.setAttribute("stroke", "none");
				if (options.fill) {
					path.setAttribute("fill", options.fillColor || options.color);
					path.setAttribute("fill-opacity", options.fillOpacity);
					path.setAttribute("fill-rule", options.fillRule || "evenodd");
				} else path.setAttribute("fill", "none");
			},
			_updatePoly: function(layer, closed) {
				this._setPath(layer, pointsToPath(layer._parts, closed));
			},
			_updateCircle: function(layer) {
				var p = layer._point, r = Math.max(Math.round(layer._radius), 1), r2 = Math.max(Math.round(layer._radiusY), 1) || r, arc = "a" + r + "," + r2 + " 0 1,0 ";
				var d = layer._empty() ? "M0 0" : "M" + (p.x - r) + "," + p.y + arc + r * 2 + ",0 " + arc + -r * 2 + ",0 ";
				this._setPath(layer, d);
			},
			_setPath: function(layer, path) {
				layer._path.setAttribute("d", path);
			},
			_bringToFront: function(layer) {
				toFront(layer._path);
			},
			_bringToBack: function(layer) {
				toBack(layer._path);
			}
		});
		if (Browser.vml) SVG.include(vmlMixin);
		function svg(options) {
			return Browser.svg || Browser.vml ? new SVG(options) : null;
		}
		Map.include({
			getRenderer: function(layer) {
				var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
				if (!renderer) renderer = this._renderer = this._createRenderer();
				if (!this.hasLayer(renderer)) this.addLayer(renderer);
				return renderer;
			},
			_getPaneRenderer: function(name) {
				if (name === "overlayPane" || name === void 0) return false;
				var renderer = this._paneRenderers[name];
				if (renderer === void 0) {
					renderer = this._createRenderer({ pane: name });
					this._paneRenderers[name] = renderer;
				}
				return renderer;
			},
			_createRenderer: function(options) {
				return this.options.preferCanvas && canvas(options) || svg(options);
			}
		});
		var Rectangle = Polygon.extend({
			initialize: function(latLngBounds, options) {
				Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
			},
			setBounds: function(latLngBounds) {
				return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
			},
			_boundsToLatLngs: function(latLngBounds) {
				latLngBounds = toLatLngBounds(latLngBounds);
				return [
					latLngBounds.getSouthWest(),
					latLngBounds.getNorthWest(),
					latLngBounds.getNorthEast(),
					latLngBounds.getSouthEast()
				];
			}
		});
		function rectangle(latLngBounds, options) {
			return new Rectangle(latLngBounds, options);
		}
		SVG.create = create;
		SVG.pointsToPath = pointsToPath;
		GeoJSON.geometryToLayer = geometryToLayer;
		GeoJSON.coordsToLatLng = coordsToLatLng;
		GeoJSON.coordsToLatLngs = coordsToLatLngs;
		GeoJSON.latLngToCoords = latLngToCoords;
		GeoJSON.latLngsToCoords = latLngsToCoords;
		GeoJSON.getFeature = getFeature;
		GeoJSON.asFeature = asFeature;
		Map.mergeOptions({ boxZoom: true });
		var BoxZoom = Handler.extend({
			initialize: function(map) {
				this._map = map;
				this._container = map._container;
				this._pane = map._panes.overlayPane;
				this._resetStateTimeout = 0;
				map.on("unload", this._destroy, this);
			},
			addHooks: function() {
				on(this._container, "mousedown", this._onMouseDown, this);
			},
			removeHooks: function() {
				off(this._container, "mousedown", this._onMouseDown, this);
			},
			moved: function() {
				return this._moved;
			},
			_destroy: function() {
				remove(this._pane);
				delete this._pane;
			},
			_resetState: function() {
				this._resetStateTimeout = 0;
				this._moved = false;
			},
			_clearDeferredResetState: function() {
				if (this._resetStateTimeout !== 0) {
					clearTimeout(this._resetStateTimeout);
					this._resetStateTimeout = 0;
				}
			},
			_onMouseDown: function(e) {
				if (!e.shiftKey || e.which !== 1 && e.button !== 1) return false;
				this._clearDeferredResetState();
				this._resetState();
				disableTextSelection();
				disableImageDrag();
				this._startPoint = this._map.mouseEventToContainerPoint(e);
				on(document, {
					contextmenu: stop,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseMove: function(e) {
				if (!this._moved) {
					this._moved = true;
					this._box = create$1("div", "leaflet-zoom-box", this._container);
					addClass(this._container, "leaflet-crosshair");
					this._map.fire("boxzoomstart");
				}
				this._point = this._map.mouseEventToContainerPoint(e);
				var bounds = new Bounds(this._point, this._startPoint), size = bounds.getSize();
				setPosition(this._box, bounds.min);
				this._box.style.width = size.x + "px";
				this._box.style.height = size.y + "px";
			},
			_finish: function() {
				if (this._moved) {
					remove(this._box);
					removeClass(this._container, "leaflet-crosshair");
				}
				enableTextSelection();
				enableImageDrag();
				off(document, {
					contextmenu: stop,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseUp: function(e) {
				if (e.which !== 1 && e.button !== 1) return;
				this._finish();
				if (!this._moved) return;
				this._clearDeferredResetState();
				this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
				var bounds = new LatLngBounds(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
				this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
			},
			_onKeyDown: function(e) {
				if (e.keyCode === 27) {
					this._finish();
					this._clearDeferredResetState();
					this._resetState();
				}
			}
		});
		Map.addInitHook("addHandler", "boxZoom", BoxZoom);
		Map.mergeOptions({ doubleClickZoom: true });
		var DoubleClickZoom = Handler.extend({
			addHooks: function() {
				this._map.on("dblclick", this._onDoubleClick, this);
			},
			removeHooks: function() {
				this._map.off("dblclick", this._onDoubleClick, this);
			},
			_onDoubleClick: function(e) {
				var map = this._map, oldZoom = map.getZoom(), delta = map.options.zoomDelta, zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
				if (map.options.doubleClickZoom === "center") map.setZoom(zoom);
				else map.setZoomAround(e.containerPoint, zoom);
			}
		});
		Map.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
		Map.mergeOptions({
			dragging: true,
			inertia: true,
			inertiaDeceleration: 3400,
			inertiaMaxSpeed: Infinity,
			easeLinearity: .2,
			worldCopyJump: false,
			maxBoundsViscosity: 0
		});
		var Drag = Handler.extend({
			addHooks: function() {
				if (!this._draggable) {
					var map = this._map;
					this._draggable = new Draggable(map._mapPane, map._container);
					this._draggable.on({
						dragstart: this._onDragStart,
						drag: this._onDrag,
						dragend: this._onDragEnd
					}, this);
					this._draggable.on("predrag", this._onPreDragLimit, this);
					if (map.options.worldCopyJump) {
						this._draggable.on("predrag", this._onPreDragWrap, this);
						map.on("zoomend", this._onZoomEnd, this);
						map.whenReady(this._onZoomEnd, this);
					}
				}
				addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
				this._draggable.enable();
				this._positions = [];
				this._times = [];
			},
			removeHooks: function() {
				removeClass(this._map._container, "leaflet-grab");
				removeClass(this._map._container, "leaflet-touch-drag");
				this._draggable.disable();
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			moving: function() {
				return this._draggable && this._draggable._moving;
			},
			_onDragStart: function() {
				var map = this._map;
				map._stop();
				if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
					var bounds = toLatLngBounds(this._map.options.maxBounds);
					this._offsetLimit = toBounds(this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize()));
					this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
				} else this._offsetLimit = null;
				map.fire("movestart").fire("dragstart");
				if (map.options.inertia) {
					this._positions = [];
					this._times = [];
				}
			},
			_onDrag: function(e) {
				if (this._map.options.inertia) {
					var time = this._lastTime = +/* @__PURE__ */ new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
					this._positions.push(pos);
					this._times.push(time);
					this._prunePositions(time);
				}
				this._map.fire("move", e).fire("drag", e);
			},
			_prunePositions: function(time) {
				while (this._positions.length > 1 && time - this._times[0] > 50) {
					this._positions.shift();
					this._times.shift();
				}
			},
			_onZoomEnd: function() {
				var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
				this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
				this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
			},
			_viscousLimit: function(value, threshold) {
				return value - (value - threshold) * this._viscosity;
			},
			_onPreDragLimit: function() {
				if (!this._viscosity || !this._offsetLimit) return;
				var offset = this._draggable._newPos.subtract(this._draggable._startPos);
				var limit = this._offsetLimit;
				if (offset.x < limit.min.x) offset.x = this._viscousLimit(offset.x, limit.min.x);
				if (offset.y < limit.min.y) offset.y = this._viscousLimit(offset.y, limit.min.y);
				if (offset.x > limit.max.x) offset.x = this._viscousLimit(offset.x, limit.max.x);
				if (offset.y > limit.max.y) offset.y = this._viscousLimit(offset.y, limit.max.y);
				this._draggable._newPos = this._draggable._startPos.add(offset);
			},
			_onPreDragWrap: function() {
				var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x = this._draggable._newPos.x, newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
				this._draggable._absPos = this._draggable._newPos.clone();
				this._draggable._newPos.x = newX;
			},
			_onDragEnd: function(e) {
				var map = this._map, options = map.options, noInertia = !options.inertia || e.noInertia || this._times.length < 2;
				map.fire("dragend", e);
				if (noInertia) map.fire("moveend");
				else {
					this._prunePositions(+/* @__PURE__ */ new Date());
					var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
					if (!offset.x && !offset.y) map.fire("moveend");
					else {
						offset = map._limitOffset(offset, map.options.maxBounds);
						requestAnimFrame(function() {
							map.panBy(offset, {
								duration: decelerationDuration,
								easeLinearity: ease,
								noMoveStart: true,
								animate: true
							});
						});
					}
				}
			}
		});
		Map.addInitHook("addHandler", "dragging", Drag);
		Map.mergeOptions({
			keyboard: true,
			keyboardPanDelta: 80
		});
		var Keyboard = Handler.extend({
			keyCodes: {
				left: [37],
				right: [39],
				down: [40],
				up: [38],
				zoomIn: [
					187,
					107,
					61,
					171
				],
				zoomOut: [
					189,
					109,
					54,
					173
				]
			},
			initialize: function(map) {
				this._map = map;
				this._setPanDelta(map.options.keyboardPanDelta);
				this._setZoomDelta(map.options.zoomDelta);
			},
			addHooks: function() {
				var container = this._map._container;
				if (container.tabIndex <= 0) container.tabIndex = "0";
				on(container, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this);
				this._map.on({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			removeHooks: function() {
				this._removeHooks();
				off(this._map._container, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this);
				this._map.off({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			_onMouseDown: function() {
				if (this._focused) return;
				var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
				this._map._container.focus();
				window.scrollTo(left, top);
			},
			_onFocus: function() {
				this._focused = true;
				this._map.fire("focus");
			},
			_onBlur: function() {
				this._focused = false;
				this._map.fire("blur");
			},
			_setPanDelta: function(panDelta) {
				var keys = this._panKeys = {}, codes = this.keyCodes, i, len;
				for (i = 0, len = codes.left.length; i < len; i++) keys[codes.left[i]] = [-1 * panDelta, 0];
				for (i = 0, len = codes.right.length; i < len; i++) keys[codes.right[i]] = [panDelta, 0];
				for (i = 0, len = codes.down.length; i < len; i++) keys[codes.down[i]] = [0, panDelta];
				for (i = 0, len = codes.up.length; i < len; i++) keys[codes.up[i]] = [0, -1 * panDelta];
			},
			_setZoomDelta: function(zoomDelta) {
				var keys = this._zoomKeys = {}, codes = this.keyCodes, i, len;
				for (i = 0, len = codes.zoomIn.length; i < len; i++) keys[codes.zoomIn[i]] = zoomDelta;
				for (i = 0, len = codes.zoomOut.length; i < len; i++) keys[codes.zoomOut[i]] = -zoomDelta;
			},
			_addHooks: function() {
				on(document, "keydown", this._onKeyDown, this);
			},
			_removeHooks: function() {
				off(document, "keydown", this._onKeyDown, this);
			},
			_onKeyDown: function(e) {
				if (e.altKey || e.ctrlKey || e.metaKey) return;
				var key = e.keyCode, map = this._map, offset;
				if (key in this._panKeys) {
					if (!map._panAnim || !map._panAnim._inProgress) {
						offset = this._panKeys[key];
						if (e.shiftKey) offset = toPoint(offset).multiplyBy(3);
						if (map.options.maxBounds) offset = map._limitOffset(toPoint(offset), map.options.maxBounds);
						if (map.options.worldCopyJump) {
							var newLatLng = map.wrapLatLng(map.unproject(map.project(map.getCenter()).add(offset)));
							map.panTo(newLatLng);
						} else map.panBy(offset);
					}
				} else if (key in this._zoomKeys) map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);
				else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) map.closePopup();
				else return;
				stop(e);
			}
		});
		Map.addInitHook("addHandler", "keyboard", Keyboard);
		Map.mergeOptions({
			scrollWheelZoom: true,
			wheelDebounceTime: 40,
			wheelPxPerZoomLevel: 60
		});
		var ScrollWheelZoom = Handler.extend({
			addHooks: function() {
				on(this._map._container, "wheel", this._onWheelScroll, this);
				this._delta = 0;
			},
			removeHooks: function() {
				off(this._map._container, "wheel", this._onWheelScroll, this);
			},
			_onWheelScroll: function(e) {
				var delta = getWheelDelta(e);
				var debounce = this._map.options.wheelDebounceTime;
				this._delta += delta;
				this._lastMousePos = this._map.mouseEventToContainerPoint(e);
				if (!this._startTime) this._startTime = +/* @__PURE__ */ new Date();
				var left = Math.max(debounce - (+/* @__PURE__ */ new Date() - this._startTime), 0);
				clearTimeout(this._timer);
				this._timer = setTimeout(bind(this._performZoom, this), left);
				stop(e);
			},
			_performZoom: function() {
				var map = this._map, zoom = map.getZoom(), snap = this._map.options.zoomSnap || 0;
				map._stop();
				var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map._limitZoom(zoom + (this._delta > 0 ? d4 : -d4)) - zoom;
				this._delta = 0;
				this._startTime = null;
				if (!delta) return;
				if (map.options.scrollWheelZoom === "center") map.setZoom(zoom + delta);
				else map.setZoomAround(this._lastMousePos, zoom + delta);
			}
		});
		Map.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
		var tapHoldDelay = 600;
		Map.mergeOptions({
			tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
			tapTolerance: 15
		});
		var TapHold = Handler.extend({
			addHooks: function() {
				on(this._map._container, "touchstart", this._onDown, this);
			},
			removeHooks: function() {
				off(this._map._container, "touchstart", this._onDown, this);
			},
			_onDown: function(e) {
				clearTimeout(this._holdTimeout);
				if (e.touches.length !== 1) return;
				var first = e.touches[0];
				this._startPos = this._newPos = new Point(first.clientX, first.clientY);
				this._holdTimeout = setTimeout(bind(function() {
					this._cancel();
					if (!this._isTapValid()) return;
					on(document, "touchend", preventDefault);
					on(document, "touchend touchcancel", this._cancelClickPrevent);
					this._simulateEvent("contextmenu", first);
				}, this), tapHoldDelay);
				on(document, "touchend touchcancel contextmenu", this._cancel, this);
				on(document, "touchmove", this._onMove, this);
			},
			_cancelClickPrevent: function cancelClickPrevent() {
				off(document, "touchend", preventDefault);
				off(document, "touchend touchcancel", cancelClickPrevent);
			},
			_cancel: function() {
				clearTimeout(this._holdTimeout);
				off(document, "touchend touchcancel contextmenu", this._cancel, this);
				off(document, "touchmove", this._onMove, this);
			},
			_onMove: function(e) {
				var first = e.touches[0];
				this._newPos = new Point(first.clientX, first.clientY);
			},
			_isTapValid: function() {
				return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
			},
			_simulateEvent: function(type, e) {
				var simulatedEvent = new MouseEvent(type, {
					bubbles: true,
					cancelable: true,
					view: window,
					screenX: e.screenX,
					screenY: e.screenY,
					clientX: e.clientX,
					clientY: e.clientY
				});
				simulatedEvent._simulated = true;
				e.target.dispatchEvent(simulatedEvent);
			}
		});
		Map.addInitHook("addHandler", "tapHold", TapHold);
		Map.mergeOptions({
			touchZoom: Browser.touch,
			bounceAtZoomLimits: true
		});
		var TouchZoom = Handler.extend({
			addHooks: function() {
				addClass(this._map._container, "leaflet-touch-zoom");
				on(this._map._container, "touchstart", this._onTouchStart, this);
			},
			removeHooks: function() {
				removeClass(this._map._container, "leaflet-touch-zoom");
				off(this._map._container, "touchstart", this._onTouchStart, this);
			},
			_onTouchStart: function(e) {
				var map = this._map;
				if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) return;
				var p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]);
				this._centerPoint = map.getSize()._divideBy(2);
				this._startLatLng = map.containerPointToLatLng(this._centerPoint);
				if (map.options.touchZoom !== "center") this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
				this._startDist = p1.distanceTo(p2);
				this._startZoom = map.getZoom();
				this._moved = false;
				this._zooming = true;
				map._stop();
				on(document, "touchmove", this._onTouchMove, this);
				on(document, "touchend touchcancel", this._onTouchEnd, this);
				preventDefault(e);
			},
			_onTouchMove: function(e) {
				if (!e.touches || e.touches.length !== 2 || !this._zooming) return;
				var map = this._map, p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]), scale = p1.distanceTo(p2) / this._startDist;
				this._zoom = map.getScaleZoom(scale, this._startZoom);
				if (!map.options.bounceAtZoomLimits && (this._zoom < map.getMinZoom() && scale < 1 || this._zoom > map.getMaxZoom() && scale > 1)) this._zoom = map._limitZoom(this._zoom);
				if (map.options.touchZoom === "center") {
					this._center = this._startLatLng;
					if (scale === 1) return;
				} else {
					var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
					if (scale === 1 && delta.x === 0 && delta.y === 0) return;
					this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
				}
				if (!this._moved) {
					map._moveStart(true, false);
					this._moved = true;
				}
				cancelAnimFrame(this._animRequest);
				var moveFn = bind(map._move, map, this._center, this._zoom, {
					pinch: true,
					round: false
				}, void 0);
				this._animRequest = requestAnimFrame(moveFn, this, true);
				preventDefault(e);
			},
			_onTouchEnd: function() {
				if (!this._moved || !this._zooming) {
					this._zooming = false;
					return;
				}
				this._zooming = false;
				cancelAnimFrame(this._animRequest);
				off(document, "touchmove", this._onTouchMove, this);
				off(document, "touchend touchcancel", this._onTouchEnd, this);
				if (this._map.options.zoomAnimation) this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
				else this._map._resetView(this._center, this._map._limitZoom(this._zoom));
			}
		});
		Map.addInitHook("addHandler", "touchZoom", TouchZoom);
		Map.BoxZoom = BoxZoom;
		Map.DoubleClickZoom = DoubleClickZoom;
		Map.Drag = Drag;
		Map.Keyboard = Keyboard;
		Map.ScrollWheelZoom = ScrollWheelZoom;
		Map.TapHold = TapHold;
		Map.TouchZoom = TouchZoom;
		exports$2.Bounds = Bounds;
		exports$2.Browser = Browser;
		exports$2.CRS = CRS;
		exports$2.Canvas = Canvas;
		exports$2.Circle = Circle;
		exports$2.CircleMarker = CircleMarker;
		exports$2.Class = Class;
		exports$2.Control = Control;
		exports$2.DivIcon = DivIcon;
		exports$2.DivOverlay = DivOverlay;
		exports$2.DomEvent = DomEvent;
		exports$2.DomUtil = DomUtil;
		exports$2.Draggable = Draggable;
		exports$2.Evented = Evented;
		exports$2.FeatureGroup = FeatureGroup;
		exports$2.GeoJSON = GeoJSON;
		exports$2.GridLayer = GridLayer;
		exports$2.Handler = Handler;
		exports$2.Icon = Icon;
		exports$2.ImageOverlay = ImageOverlay;
		exports$2.LatLng = LatLng;
		exports$2.LatLngBounds = LatLngBounds;
		exports$2.Layer = Layer;
		exports$2.LayerGroup = LayerGroup;
		exports$2.LineUtil = LineUtil;
		exports$2.Map = Map;
		exports$2.Marker = Marker;
		exports$2.Mixin = Mixin;
		exports$2.Path = Path;
		exports$2.Point = Point;
		exports$2.PolyUtil = PolyUtil;
		exports$2.Polygon = Polygon;
		exports$2.Polyline = Polyline;
		exports$2.Popup = Popup;
		exports$2.PosAnimation = PosAnimation;
		exports$2.Projection = index;
		exports$2.Rectangle = Rectangle;
		exports$2.Renderer = Renderer;
		exports$2.SVG = SVG;
		exports$2.SVGOverlay = SVGOverlay;
		exports$2.TileLayer = TileLayer;
		exports$2.Tooltip = Tooltip;
		exports$2.Transformation = Transformation;
		exports$2.Util = Util;
		exports$2.VideoOverlay = VideoOverlay;
		exports$2.bind = bind;
		exports$2.bounds = toBounds;
		exports$2.canvas = canvas;
		exports$2.circle = circle;
		exports$2.circleMarker = circleMarker;
		exports$2.control = control;
		exports$2.divIcon = divIcon;
		exports$2.extend = extend;
		exports$2.featureGroup = featureGroup;
		exports$2.geoJSON = geoJSON;
		exports$2.geoJson = geoJson;
		exports$2.gridLayer = gridLayer;
		exports$2.icon = icon;
		exports$2.imageOverlay = imageOverlay;
		exports$2.latLng = toLatLng;
		exports$2.latLngBounds = toLatLngBounds;
		exports$2.layerGroup = layerGroup;
		exports$2.map = createMap;
		exports$2.marker = marker;
		exports$2.point = toPoint;
		exports$2.polygon = polygon;
		exports$2.polyline = polyline;
		exports$2.popup = popup;
		exports$2.rectangle = rectangle;
		exports$2.setOptions = setOptions;
		exports$2.stamp = stamp;
		exports$2.svg = svg;
		exports$2.svgOverlay = svgOverlay;
		exports$2.tileLayer = tileLayer;
		exports$2.tooltip = tooltip;
		exports$2.transformation = toTransformation;
		exports$2.version = version;
		exports$2.videoOverlay = videoOverlay;
		var oldL = window.L;
		exports$2.noConflict = function() {
			window.L = oldL;
			return this;
		};
		window.L = exports$2;
	}));
}));
//#endregion
//#region node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js
var require_leaflet_markercluster_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(global, factory) {
		typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory((global.Leaflet = global.Leaflet || {}, global.Leaflet.markercluster = {})));
	})(exports, function(exports$1) {
		"use strict";
		var MarkerClusterGroup = L.MarkerClusterGroup = L.FeatureGroup.extend({
			options: {
				maxClusterRadius: 80,
				iconCreateFunction: null,
				clusterPane: L.Marker.prototype.options.pane,
				spiderfyOnEveryZoom: false,
				spiderfyOnMaxZoom: true,
				showCoverageOnHover: true,
				zoomToBoundsOnClick: true,
				singleMarkerMode: false,
				disableClusteringAtZoom: null,
				removeOutsideVisibleBounds: true,
				animate: true,
				animateAddingMarkers: false,
				spiderfyShapePositions: null,
				spiderfyDistanceMultiplier: 1,
				spiderLegPolylineOptions: {
					weight: 1.5,
					color: "#222",
					opacity: .5
				},
				chunkedLoading: false,
				chunkInterval: 200,
				chunkDelay: 50,
				chunkProgress: null,
				polygonOptions: {}
			},
			initialize: function(options) {
				L.Util.setOptions(this, options);
				if (!this.options.iconCreateFunction) this.options.iconCreateFunction = this._defaultIconCreateFunction;
				this._featureGroup = L.featureGroup();
				this._featureGroup.addEventParent(this);
				this._nonPointGroup = L.featureGroup();
				this._nonPointGroup.addEventParent(this);
				this._inZoomAnimation = 0;
				this._needsClustering = [];
				this._needsRemoving = [];
				this._currentShownBounds = null;
				this._queue = [];
				this._childMarkerEventHandlers = {
					"dragstart": this._childMarkerDragStart,
					"move": this._childMarkerMoved,
					"dragend": this._childMarkerDragEnd
				};
				var animate = L.DomUtil.TRANSITION && this.options.animate;
				L.extend(this, animate ? this._withAnimation : this._noAnimation);
				this._markerCluster = animate ? L.MarkerCluster : L.MarkerClusterNonAnimated;
			},
			addLayer: function(layer) {
				if (layer instanceof L.LayerGroup) return this.addLayers([layer]);
				if (!layer.getLatLng) {
					this._nonPointGroup.addLayer(layer);
					this.fire("layeradd", { layer });
					return this;
				}
				if (!this._map) {
					this._needsClustering.push(layer);
					this.fire("layeradd", { layer });
					return this;
				}
				if (this.hasLayer(layer)) return this;
				if (this._unspiderfy) this._unspiderfy();
				this._addLayer(layer, this._maxZoom);
				this.fire("layeradd", { layer });
				this._topClusterLevel._recalculateBounds();
				this._refreshClustersIcons();
				var visibleLayer = layer, currentZoom = this._zoom;
				if (layer.__parent) while (visibleLayer.__parent._zoom >= currentZoom) visibleLayer = visibleLayer.__parent;
				if (this._currentShownBounds.contains(visibleLayer.getLatLng())) if (this.options.animateAddingMarkers) this._animationAddLayer(layer, visibleLayer);
				else this._animationAddLayerNonAnimated(layer, visibleLayer);
				return this;
			},
			removeLayer: function(layer) {
				if (layer instanceof L.LayerGroup) return this.removeLayers([layer]);
				if (!layer.getLatLng) {
					this._nonPointGroup.removeLayer(layer);
					this.fire("layerremove", { layer });
					return this;
				}
				if (!this._map) {
					if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) this._needsRemoving.push({
						layer,
						latlng: layer._latlng
					});
					this.fire("layerremove", { layer });
					return this;
				}
				if (!layer.__parent) return this;
				if (this._unspiderfy) {
					this._unspiderfy();
					this._unspiderfyLayer(layer);
				}
				this._removeLayer(layer, true);
				this.fire("layerremove", { layer });
				this._topClusterLevel._recalculateBounds();
				this._refreshClustersIcons();
				layer.off(this._childMarkerEventHandlers, this);
				if (this._featureGroup.hasLayer(layer)) {
					this._featureGroup.removeLayer(layer);
					if (layer.clusterShow) layer.clusterShow();
				}
				return this;
			},
			addLayers: function(layersArray, skipLayerAddEvent) {
				if (!L.Util.isArray(layersArray)) return this.addLayer(layersArray);
				var fg = this._featureGroup, npg = this._nonPointGroup, chunked = this.options.chunkedLoading, chunkInterval = this.options.chunkInterval, chunkProgress = this.options.chunkProgress, l = layersArray.length, offset = 0, originalArray = true, m;
				if (this._map) {
					var started = (/* @__PURE__ */ new Date()).getTime();
					var process = L.bind(function() {
						var start = (/* @__PURE__ */ new Date()).getTime();
						if (this._map && this._unspiderfy) this._unspiderfy();
						for (; offset < l; offset++) {
							if (chunked && offset % 200 === 0) {
								if ((/* @__PURE__ */ new Date()).getTime() - start > chunkInterval) break;
							}
							m = layersArray[offset];
							if (m instanceof L.LayerGroup) {
								if (originalArray) {
									layersArray = layersArray.slice();
									originalArray = false;
								}
								this._extractNonGroupLayers(m, layersArray);
								l = layersArray.length;
								continue;
							}
							if (!m.getLatLng) {
								npg.addLayer(m);
								if (!skipLayerAddEvent) this.fire("layeradd", { layer: m });
								continue;
							}
							if (this.hasLayer(m)) continue;
							this._addLayer(m, this._maxZoom);
							if (!skipLayerAddEvent) this.fire("layeradd", { layer: m });
							if (m.__parent) {
								if (m.__parent.getChildCount() === 2) {
									var markers = m.__parent.getAllChildMarkers(), otherMarker = markers[0] === m ? markers[1] : markers[0];
									fg.removeLayer(otherMarker);
								}
							}
						}
						if (chunkProgress) chunkProgress(offset, l, (/* @__PURE__ */ new Date()).getTime() - started);
						if (offset === l) {
							this._topClusterLevel._recalculateBounds();
							this._refreshClustersIcons();
							this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
						} else setTimeout(process, this.options.chunkDelay);
					}, this);
					process();
				} else {
					var needsClustering = this._needsClustering;
					for (; offset < l; offset++) {
						m = layersArray[offset];
						if (m instanceof L.LayerGroup) {
							if (originalArray) {
								layersArray = layersArray.slice();
								originalArray = false;
							}
							this._extractNonGroupLayers(m, layersArray);
							l = layersArray.length;
							continue;
						}
						if (!m.getLatLng) {
							npg.addLayer(m);
							continue;
						}
						if (this.hasLayer(m)) continue;
						needsClustering.push(m);
					}
				}
				return this;
			},
			removeLayers: function(layersArray) {
				var i, m, l = layersArray.length, fg = this._featureGroup, npg = this._nonPointGroup, originalArray = true;
				if (!this._map) {
					for (i = 0; i < l; i++) {
						m = layersArray[i];
						if (m instanceof L.LayerGroup) {
							if (originalArray) {
								layersArray = layersArray.slice();
								originalArray = false;
							}
							this._extractNonGroupLayers(m, layersArray);
							l = layersArray.length;
							continue;
						}
						this._arraySplice(this._needsClustering, m);
						npg.removeLayer(m);
						if (this.hasLayer(m)) this._needsRemoving.push({
							layer: m,
							latlng: m._latlng
						});
						this.fire("layerremove", { layer: m });
					}
					return this;
				}
				if (this._unspiderfy) {
					this._unspiderfy();
					var layersArray2 = layersArray.slice(), l2 = l;
					for (i = 0; i < l2; i++) {
						m = layersArray2[i];
						if (m instanceof L.LayerGroup) {
							this._extractNonGroupLayers(m, layersArray2);
							l2 = layersArray2.length;
							continue;
						}
						this._unspiderfyLayer(m);
					}
				}
				for (i = 0; i < l; i++) {
					m = layersArray[i];
					if (m instanceof L.LayerGroup) {
						if (originalArray) {
							layersArray = layersArray.slice();
							originalArray = false;
						}
						this._extractNonGroupLayers(m, layersArray);
						l = layersArray.length;
						continue;
					}
					if (!m.__parent) {
						npg.removeLayer(m);
						this.fire("layerremove", { layer: m });
						continue;
					}
					this._removeLayer(m, true, true);
					this.fire("layerremove", { layer: m });
					if (fg.hasLayer(m)) {
						fg.removeLayer(m);
						if (m.clusterShow) m.clusterShow();
					}
				}
				this._topClusterLevel._recalculateBounds();
				this._refreshClustersIcons();
				this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
				return this;
			},
			clearLayers: function() {
				if (!this._map) {
					this._needsClustering = [];
					this._needsRemoving = [];
					delete this._gridClusters;
					delete this._gridUnclustered;
				}
				if (this._noanimationUnspiderfy) this._noanimationUnspiderfy();
				this._featureGroup.clearLayers();
				this._nonPointGroup.clearLayers();
				this.eachLayer(function(marker) {
					marker.off(this._childMarkerEventHandlers, this);
					delete marker.__parent;
				}, this);
				if (this._map) this._generateInitialClusters();
				return this;
			},
			getBounds: function() {
				var bounds = new L.LatLngBounds();
				if (this._topClusterLevel) bounds.extend(this._topClusterLevel._bounds);
				for (var i = this._needsClustering.length - 1; i >= 0; i--) bounds.extend(this._needsClustering[i].getLatLng());
				bounds.extend(this._nonPointGroup.getBounds());
				return bounds;
			},
			eachLayer: function(method, context) {
				var markers = this._needsClustering.slice(), needsRemoving = this._needsRemoving, thisNeedsRemoving, i, j;
				if (this._topClusterLevel) this._topClusterLevel.getAllChildMarkers(markers);
				for (i = markers.length - 1; i >= 0; i--) {
					thisNeedsRemoving = true;
					for (j = needsRemoving.length - 1; j >= 0; j--) if (needsRemoving[j].layer === markers[i]) {
						thisNeedsRemoving = false;
						break;
					}
					if (thisNeedsRemoving) method.call(context, markers[i]);
				}
				this._nonPointGroup.eachLayer(method, context);
			},
			getLayers: function() {
				var layers = [];
				this.eachLayer(function(l) {
					layers.push(l);
				});
				return layers;
			},
			getLayer: function(id) {
				var result = null;
				id = parseInt(id, 10);
				this.eachLayer(function(l) {
					if (L.stamp(l) === id) result = l;
				});
				return result;
			},
			hasLayer: function(layer) {
				if (!layer) return false;
				var i, anArray = this._needsClustering;
				for (i = anArray.length - 1; i >= 0; i--) if (anArray[i] === layer) return true;
				anArray = this._needsRemoving;
				for (i = anArray.length - 1; i >= 0; i--) if (anArray[i].layer === layer) return false;
				return !!(layer.__parent && layer.__parent._group === this) || this._nonPointGroup.hasLayer(layer);
			},
			zoomToShowLayer: function(layer, callback) {
				var map = this._map;
				if (typeof callback !== "function") callback = function() {};
				var showMarker = function() {
					if ((map.hasLayer(layer) || map.hasLayer(layer.__parent)) && !this._inZoomAnimation) {
						this._map.off("moveend", showMarker, this);
						this.off("animationend", showMarker, this);
						if (map.hasLayer(layer)) callback();
						else if (layer.__parent._icon) {
							this.once("spiderfied", callback, this);
							layer.__parent.spiderfy();
						}
					}
				};
				if (layer._icon && this._map.getBounds().contains(layer.getLatLng())) callback();
				else if (layer.__parent._zoom < Math.round(this._map._zoom)) {
					this._map.on("moveend", showMarker, this);
					this._map.panTo(layer.getLatLng());
				} else {
					this._map.on("moveend", showMarker, this);
					this.on("animationend", showMarker, this);
					layer.__parent.zoomToBounds();
				}
			},
			onAdd: function(map) {
				this._map = map;
				var i, l, layer;
				if (!isFinite(this._map.getMaxZoom())) throw "Map has no maxZoom specified";
				this._featureGroup.addTo(map);
				this._nonPointGroup.addTo(map);
				if (!this._gridClusters) this._generateInitialClusters();
				this._maxLat = map.options.crs.projection.MAX_LATITUDE;
				for (i = 0, l = this._needsRemoving.length; i < l; i++) {
					layer = this._needsRemoving[i];
					layer.newlatlng = layer.layer._latlng;
					layer.layer._latlng = layer.latlng;
				}
				for (i = 0, l = this._needsRemoving.length; i < l; i++) {
					layer = this._needsRemoving[i];
					this._removeLayer(layer.layer, true);
					layer.layer._latlng = layer.newlatlng;
				}
				this._needsRemoving = [];
				this._zoom = Math.round(this._map._zoom);
				this._currentShownBounds = this._getExpandedVisibleBounds();
				this._map.on("zoomend", this._zoomEnd, this);
				this._map.on("moveend", this._moveEnd, this);
				if (this._spiderfierOnAdd) this._spiderfierOnAdd();
				this._bindEvents();
				l = this._needsClustering;
				this._needsClustering = [];
				this.addLayers(l, true);
			},
			onRemove: function(map) {
				map.off("zoomend", this._zoomEnd, this);
				map.off("moveend", this._moveEnd, this);
				this._unbindEvents();
				this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "");
				if (this._spiderfierOnRemove) this._spiderfierOnRemove();
				delete this._maxLat;
				this._hideCoverage();
				this._featureGroup.remove();
				this._nonPointGroup.remove();
				this._featureGroup.clearLayers();
				this._map = null;
			},
			getVisibleParent: function(marker) {
				var vMarker = marker;
				while (vMarker && !vMarker._icon) vMarker = vMarker.__parent;
				return vMarker || null;
			},
			_arraySplice: function(anArray, obj) {
				for (var i = anArray.length - 1; i >= 0; i--) if (anArray[i] === obj) {
					anArray.splice(i, 1);
					return true;
				}
			},
			_removeFromGridUnclustered: function(marker, z) {
				var map = this._map, gridUnclustered = this._gridUnclustered, minZoom = Math.floor(this._map.getMinZoom());
				for (; z >= minZoom; z--) if (!gridUnclustered[z].removeObject(marker, map.project(marker.getLatLng(), z))) break;
			},
			_childMarkerDragStart: function(e) {
				e.target.__dragStart = e.target._latlng;
			},
			_childMarkerMoved: function(e) {
				if (!this._ignoreMove && !e.target.__dragStart) {
					var isPopupOpen = e.target._popup && e.target._popup.isOpen();
					this._moveChild(e.target, e.oldLatLng, e.latlng);
					if (isPopupOpen) e.target.openPopup();
				}
			},
			_moveChild: function(layer, from, to) {
				layer._latlng = from;
				this.removeLayer(layer);
				layer._latlng = to;
				this.addLayer(layer);
			},
			_childMarkerDragEnd: function(e) {
				var dragStart = e.target.__dragStart;
				delete e.target.__dragStart;
				if (dragStart) this._moveChild(e.target, dragStart, e.target._latlng);
			},
			_removeLayer: function(marker, removeFromDistanceGrid, dontUpdateMap) {
				var gridClusters = this._gridClusters, gridUnclustered = this._gridUnclustered, fg = this._featureGroup, map = this._map, minZoom = Math.floor(this._map.getMinZoom());
				if (removeFromDistanceGrid) this._removeFromGridUnclustered(marker, this._maxZoom);
				var cluster = marker.__parent, markers = cluster._markers, otherMarker;
				this._arraySplice(markers, marker);
				while (cluster) {
					cluster._childCount--;
					cluster._boundsNeedUpdate = true;
					if (cluster._zoom < minZoom) break;
					else if (removeFromDistanceGrid && cluster._childCount <= 1) {
						otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0];
						gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cLatLng, cluster._zoom));
						gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getLatLng(), cluster._zoom));
						this._arraySplice(cluster.__parent._childClusters, cluster);
						cluster.__parent._markers.push(otherMarker);
						otherMarker.__parent = cluster.__parent;
						if (cluster._icon) {
							fg.removeLayer(cluster);
							if (!dontUpdateMap) fg.addLayer(otherMarker);
						}
					} else cluster._iconNeedsUpdate = true;
					cluster = cluster.__parent;
				}
				delete marker.__parent;
			},
			_isOrIsParent: function(el, oel) {
				while (oel) {
					if (el === oel) return true;
					oel = oel.parentNode;
				}
				return false;
			},
			fire: function(type, data, propagate) {
				if (data && data.layer instanceof L.MarkerCluster) {
					if (data.originalEvent && this._isOrIsParent(data.layer._icon, data.originalEvent.relatedTarget)) return;
					type = "cluster" + type;
				}
				L.FeatureGroup.prototype.fire.call(this, type, data, propagate);
			},
			listens: function(type, propagate) {
				return L.FeatureGroup.prototype.listens.call(this, type, propagate) || L.FeatureGroup.prototype.listens.call(this, "cluster" + type, propagate);
			},
			_defaultIconCreateFunction: function(cluster) {
				var childCount = cluster.getChildCount();
				var c = " marker-cluster-";
				if (childCount < 10) c += "small";
				else if (childCount < 100) c += "medium";
				else c += "large";
				return new L.DivIcon({
					html: "<div><span>" + childCount + "</span></div>",
					className: "marker-cluster" + c,
					iconSize: new L.Point(40, 40)
				});
			},
			_bindEvents: function() {
				var map = this._map, spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom, showCoverageOnHover = this.options.showCoverageOnHover, zoomToBoundsOnClick = this.options.zoomToBoundsOnClick, spiderfyOnEveryZoom = this.options.spiderfyOnEveryZoom;
				if (spiderfyOnMaxZoom || zoomToBoundsOnClick || spiderfyOnEveryZoom) this.on("clusterclick clusterkeypress", this._zoomOrSpiderfy, this);
				if (showCoverageOnHover) {
					this.on("clustermouseover", this._showCoverage, this);
					this.on("clustermouseout", this._hideCoverage, this);
					map.on("zoomend", this._hideCoverage, this);
				}
			},
			_zoomOrSpiderfy: function(e) {
				var cluster = e.layer, bottomCluster = cluster;
				if (e.type === "clusterkeypress" && e.originalEvent && e.originalEvent.keyCode !== 13) return;
				while (bottomCluster._childClusters.length === 1) bottomCluster = bottomCluster._childClusters[0];
				if (bottomCluster._zoom === this._maxZoom && bottomCluster._childCount === cluster._childCount && this.options.spiderfyOnMaxZoom) cluster.spiderfy();
				else if (this.options.zoomToBoundsOnClick) cluster.zoomToBounds();
				if (this.options.spiderfyOnEveryZoom) cluster.spiderfy();
				if (e.originalEvent && e.originalEvent.keyCode === 13) this._map._container.focus();
			},
			_showCoverage: function(e) {
				var map = this._map;
				if (this._inZoomAnimation) return;
				if (this._shownPolygon) map.removeLayer(this._shownPolygon);
				if (e.layer.getChildCount() > 2 && e.layer !== this._spiderfied) {
					this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions);
					map.addLayer(this._shownPolygon);
				}
			},
			_hideCoverage: function() {
				if (this._shownPolygon) {
					this._map.removeLayer(this._shownPolygon);
					this._shownPolygon = null;
				}
			},
			_unbindEvents: function() {
				var spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom, showCoverageOnHover = this.options.showCoverageOnHover, zoomToBoundsOnClick = this.options.zoomToBoundsOnClick, spiderfyOnEveryZoom = this.options.spiderfyOnEveryZoom, map = this._map;
				if (spiderfyOnMaxZoom || zoomToBoundsOnClick || spiderfyOnEveryZoom) this.off("clusterclick clusterkeypress", this._zoomOrSpiderfy, this);
				if (showCoverageOnHover) {
					this.off("clustermouseover", this._showCoverage, this);
					this.off("clustermouseout", this._hideCoverage, this);
					map.off("zoomend", this._hideCoverage, this);
				}
			},
			_zoomEnd: function() {
				if (!this._map) return;
				this._mergeSplitClusters();
				this._zoom = Math.round(this._map._zoom);
				this._currentShownBounds = this._getExpandedVisibleBounds();
			},
			_moveEnd: function() {
				if (this._inZoomAnimation) return;
				var newBounds = this._getExpandedVisibleBounds();
				this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, newBounds);
				this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), newBounds);
				this._currentShownBounds = newBounds;
			},
			_generateInitialClusters: function() {
				var maxZoom = Math.ceil(this._map.getMaxZoom()), minZoom = Math.floor(this._map.getMinZoom()), radius = this.options.maxClusterRadius, radiusFn = radius;
				if (typeof radius !== "function") radiusFn = function() {
					return radius;
				};
				if (this.options.disableClusteringAtZoom !== null) maxZoom = this.options.disableClusteringAtZoom - 1;
				this._maxZoom = maxZoom;
				this._gridClusters = {};
				this._gridUnclustered = {};
				for (var zoom = maxZoom; zoom >= minZoom; zoom--) {
					this._gridClusters[zoom] = new L.DistanceGrid(radiusFn(zoom));
					this._gridUnclustered[zoom] = new L.DistanceGrid(radiusFn(zoom));
				}
				this._topClusterLevel = new this._markerCluster(this, minZoom - 1);
			},
			_addLayer: function(layer, zoom) {
				var gridClusters = this._gridClusters, gridUnclustered = this._gridUnclustered, minZoom = Math.floor(this._map.getMinZoom()), markerPoint, z;
				if (this.options.singleMarkerMode) this._overrideMarkerIcon(layer);
				layer.on(this._childMarkerEventHandlers, this);
				for (; zoom >= minZoom; zoom--) {
					markerPoint = this._map.project(layer.getLatLng(), zoom);
					var closest = gridClusters[zoom].getNearObject(markerPoint);
					if (closest) {
						closest._addChild(layer);
						layer.__parent = closest;
						return;
					}
					closest = gridUnclustered[zoom].getNearObject(markerPoint);
					if (closest) {
						var parent = closest.__parent;
						if (parent) this._removeLayer(closest, false);
						var newCluster = new this._markerCluster(this, zoom, closest, layer);
						gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cLatLng, zoom));
						closest.__parent = newCluster;
						layer.__parent = newCluster;
						var lastParent = newCluster;
						for (z = zoom - 1; z > parent._zoom; z--) {
							lastParent = new this._markerCluster(this, z, lastParent);
							gridClusters[z].addObject(lastParent, this._map.project(closest.getLatLng(), z));
						}
						parent._addChild(lastParent);
						this._removeFromGridUnclustered(closest, zoom);
						return;
					}
					gridUnclustered[zoom].addObject(layer, markerPoint);
				}
				this._topClusterLevel._addChild(layer);
				layer.__parent = this._topClusterLevel;
			},
			_refreshClustersIcons: function() {
				this._featureGroup.eachLayer(function(c) {
					if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) c._updateIcon();
				});
			},
			_enqueue: function(fn) {
				this._queue.push(fn);
				if (!this._queueTimeout) this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300);
			},
			_processQueue: function() {
				for (var i = 0; i < this._queue.length; i++) this._queue[i].call(this);
				this._queue.length = 0;
				clearTimeout(this._queueTimeout);
				this._queueTimeout = null;
			},
			_mergeSplitClusters: function() {
				var mapZoom = Math.round(this._map._zoom);
				this._processQueue();
				if (this._zoom < mapZoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) {
					this._animationStart();
					this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds());
					this._animationZoomIn(this._zoom, mapZoom);
				} else if (this._zoom > mapZoom) {
					this._animationStart();
					this._animationZoomOut(this._zoom, mapZoom);
				} else this._moveEnd();
			},
			_getExpandedVisibleBounds: function() {
				if (!this.options.removeOutsideVisibleBounds) return this._mapBoundsInfinite;
				else if (L.Browser.mobile) return this._checkBoundsMaxLat(this._map.getBounds());
				return this._checkBoundsMaxLat(this._map.getBounds().pad(1));
			},
			_checkBoundsMaxLat: function(bounds) {
				var maxLat = this._maxLat;
				if (maxLat !== void 0) {
					if (bounds.getNorth() >= maxLat) bounds._northEast.lat = Infinity;
					if (bounds.getSouth() <= -maxLat) bounds._southWest.lat = -Infinity;
				}
				return bounds;
			},
			_animationAddLayerNonAnimated: function(layer, newCluster) {
				if (newCluster === layer) this._featureGroup.addLayer(layer);
				else if (newCluster._childCount === 2) {
					newCluster._addToMap();
					var markers = newCluster.getAllChildMarkers();
					this._featureGroup.removeLayer(markers[0]);
					this._featureGroup.removeLayer(markers[1]);
				} else newCluster._updateIcon();
			},
			_extractNonGroupLayers: function(group, output) {
				var layers = group.getLayers(), i = 0, layer;
				output = output || [];
				for (; i < layers.length; i++) {
					layer = layers[i];
					if (layer instanceof L.LayerGroup) {
						this._extractNonGroupLayers(layer, output);
						continue;
					}
					output.push(layer);
				}
				return output;
			},
			_overrideMarkerIcon: function(layer) {
				return layer.options.icon = this.options.iconCreateFunction({
					getChildCount: function() {
						return 1;
					},
					getAllChildMarkers: function() {
						return [layer];
					}
				});
			}
		});
		L.MarkerClusterGroup.include({ _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity)) });
		L.MarkerClusterGroup.include({
			_noAnimation: {
				_animationStart: function() {},
				_animationZoomIn: function(previousZoomLevel, newZoomLevel) {
					this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);
					this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
					this.fire("animationend");
				},
				_animationZoomOut: function(previousZoomLevel, newZoomLevel) {
					this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);
					this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
					this.fire("animationend");
				},
				_animationAddLayer: function(layer, newCluster) {
					this._animationAddLayerNonAnimated(layer, newCluster);
				}
			},
			_withAnimation: {
				_animationStart: function() {
					this._map._mapPane.className += " leaflet-cluster-anim";
					this._inZoomAnimation++;
				},
				_animationZoomIn: function(previousZoomLevel, newZoomLevel) {
					var bounds = this._getExpandedVisibleBounds(), fg = this._featureGroup, minZoom = Math.floor(this._map.getMinZoom()), i;
					this._ignoreMove = true;
					this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function(c) {
						var startPos = c._latlng, markers = c._markers, m;
						if (!bounds.contains(startPos)) startPos = null;
						if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) {
							fg.removeLayer(c);
							c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds);
						} else {
							c.clusterHide();
							c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds);
						}
						for (i = markers.length - 1; i >= 0; i--) {
							m = markers[i];
							if (!bounds.contains(m._latlng)) fg.removeLayer(m);
						}
					});
					this._forceLayout();
					this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel);
					fg.eachLayer(function(n) {
						if (!(n instanceof L.MarkerCluster) && n._icon) n.clusterShow();
					});
					this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function(c) {
						c._recursivelyRestoreChildPositions(newZoomLevel);
					});
					this._ignoreMove = false;
					this._enqueue(function() {
						this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function(c) {
							fg.removeLayer(c);
							c.clusterShow();
						});
						this._animationEnd();
					});
				},
				_animationZoomOut: function(previousZoomLevel, newZoomLevel) {
					this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel);
					this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
					this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel, this._getExpandedVisibleBounds());
				},
				_animationAddLayer: function(layer, newCluster) {
					var me = this, fg = this._featureGroup;
					fg.addLayer(layer);
					if (newCluster !== layer) if (newCluster._childCount > 2) {
						newCluster._updateIcon();
						this._forceLayout();
						this._animationStart();
						layer._setPos(this._map.latLngToLayerPoint(newCluster.getLatLng()));
						layer.clusterHide();
						this._enqueue(function() {
							fg.removeLayer(layer);
							layer.clusterShow();
							me._animationEnd();
						});
					} else {
						this._forceLayout();
						me._animationStart();
						me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._zoom);
					}
				}
			},
			_animationZoomOutSingle: function(cluster, previousZoomLevel, newZoomLevel) {
				var bounds = this._getExpandedVisibleBounds(), minZoom = Math.floor(this._map.getMinZoom());
				cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, minZoom, previousZoomLevel + 1, newZoomLevel);
				var me = this;
				this._forceLayout();
				cluster._recursivelyBecomeVisible(bounds, newZoomLevel);
				this._enqueue(function() {
					if (cluster._childCount === 1) {
						var m = cluster._markers[0];
						this._ignoreMove = true;
						m.setLatLng(m.getLatLng());
						this._ignoreMove = false;
						if (m.clusterShow) m.clusterShow();
					} else cluster._recursively(bounds, newZoomLevel, minZoom, function(c) {
						c._recursivelyRemoveChildrenFromMap(bounds, minZoom, previousZoomLevel + 1);
					});
					me._animationEnd();
				});
			},
			_animationEnd: function() {
				if (this._map) this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "");
				this._inZoomAnimation--;
				this.fire("animationend");
			},
			_forceLayout: function() {
				L.Util.falseFn(document.body.offsetWidth);
			}
		});
		L.markerClusterGroup = function(options) {
			return new L.MarkerClusterGroup(options);
		};
		var MarkerCluster = L.MarkerCluster = L.Marker.extend({
			options: L.Icon.prototype.options,
			initialize: function(group, zoom, a, b) {
				L.Marker.prototype.initialize.call(this, a ? a._cLatLng || a.getLatLng() : new L.LatLng(0, 0), {
					icon: this,
					pane: group.options.clusterPane
				});
				this._group = group;
				this._zoom = zoom;
				this._markers = [];
				this._childClusters = [];
				this._childCount = 0;
				this._iconNeedsUpdate = true;
				this._boundsNeedUpdate = true;
				this._bounds = new L.LatLngBounds();
				if (a) this._addChild(a);
				if (b) this._addChild(b);
			},
			getAllChildMarkers: function(storageArray, ignoreDraggedMarker) {
				storageArray = storageArray || [];
				for (var i = this._childClusters.length - 1; i >= 0; i--) this._childClusters[i].getAllChildMarkers(storageArray, ignoreDraggedMarker);
				for (var j = this._markers.length - 1; j >= 0; j--) {
					if (ignoreDraggedMarker && this._markers[j].__dragStart) continue;
					storageArray.push(this._markers[j]);
				}
				return storageArray;
			},
			getChildCount: function() {
				return this._childCount;
			},
			zoomToBounds: function(fitBoundsOptions) {
				var childClusters = this._childClusters.slice(), map = this._group._map, boundsZoom = map.getBoundsZoom(this._bounds), zoom = this._zoom + 1, mapZoom = map.getZoom(), i;
				while (childClusters.length > 0 && boundsZoom > zoom) {
					zoom++;
					var newClusters = [];
					for (i = 0; i < childClusters.length; i++) newClusters = newClusters.concat(childClusters[i]._childClusters);
					childClusters = newClusters;
				}
				if (boundsZoom > zoom) this._group._map.setView(this._latlng, zoom);
				else if (boundsZoom <= mapZoom) this._group._map.setView(this._latlng, mapZoom + 1);
				else this._group._map.fitBounds(this._bounds, fitBoundsOptions);
			},
			getBounds: function() {
				var bounds = new L.LatLngBounds();
				bounds.extend(this._bounds);
				return bounds;
			},
			_updateIcon: function() {
				this._iconNeedsUpdate = true;
				if (this._icon) this.setIcon(this);
			},
			createIcon: function() {
				if (this._iconNeedsUpdate) {
					this._iconObj = this._group.options.iconCreateFunction(this);
					this._iconNeedsUpdate = false;
				}
				return this._iconObj.createIcon();
			},
			createShadow: function() {
				return this._iconObj.createShadow();
			},
			_addChild: function(new1, isNotificationFromChild) {
				this._iconNeedsUpdate = true;
				this._boundsNeedUpdate = true;
				this._setClusterCenter(new1);
				if (new1 instanceof L.MarkerCluster) {
					if (!isNotificationFromChild) {
						this._childClusters.push(new1);
						new1.__parent = this;
					}
					this._childCount += new1._childCount;
				} else {
					if (!isNotificationFromChild) this._markers.push(new1);
					this._childCount++;
				}
				if (this.__parent) this.__parent._addChild(new1, true);
			},
			_setClusterCenter: function(child) {
				if (!this._cLatLng) this._cLatLng = child._cLatLng || child._latlng;
			},
			_resetBounds: function() {
				var bounds = this._bounds;
				if (bounds._southWest) {
					bounds._southWest.lat = Infinity;
					bounds._southWest.lng = Infinity;
				}
				if (bounds._northEast) {
					bounds._northEast.lat = -Infinity;
					bounds._northEast.lng = -Infinity;
				}
			},
			_recalculateBounds: function() {
				var markers = this._markers, childClusters = this._childClusters, latSum = 0, lngSum = 0, totalCount = this._childCount, i, child, childLatLng, childCount;
				if (totalCount === 0) return;
				this._resetBounds();
				for (i = 0; i < markers.length; i++) {
					childLatLng = markers[i]._latlng;
					this._bounds.extend(childLatLng);
					latSum += childLatLng.lat;
					lngSum += childLatLng.lng;
				}
				for (i = 0; i < childClusters.length; i++) {
					child = childClusters[i];
					if (child._boundsNeedUpdate) child._recalculateBounds();
					this._bounds.extend(child._bounds);
					childLatLng = child._wLatLng;
					childCount = child._childCount;
					latSum += childLatLng.lat * childCount;
					lngSum += childLatLng.lng * childCount;
				}
				this._latlng = this._wLatLng = new L.LatLng(latSum / totalCount, lngSum / totalCount);
				this._boundsNeedUpdate = false;
			},
			_addToMap: function(startPos) {
				if (startPos) {
					this._backupLatlng = this._latlng;
					this.setLatLng(startPos);
				}
				this._group._featureGroup.addLayer(this);
			},
			_recursivelyAnimateChildrenIn: function(bounds, center, maxZoom) {
				this._recursively(bounds, this._group._map.getMinZoom(), maxZoom - 1, function(c) {
					var markers = c._markers, i, m;
					for (i = markers.length - 1; i >= 0; i--) {
						m = markers[i];
						if (m._icon) {
							m._setPos(center);
							m.clusterHide();
						}
					}
				}, function(c) {
					var childClusters = c._childClusters, j, cm;
					for (j = childClusters.length - 1; j >= 0; j--) {
						cm = childClusters[j];
						if (cm._icon) {
							cm._setPos(center);
							cm.clusterHide();
						}
					}
				});
			},
			_recursivelyAnimateChildrenInAndAddSelfToMap: function(bounds, mapMinZoom, previousZoomLevel, newZoomLevel) {
				this._recursively(bounds, newZoomLevel, mapMinZoom, function(c) {
					c._recursivelyAnimateChildrenIn(bounds, c._group._map.latLngToLayerPoint(c.getLatLng()).round(), previousZoomLevel);
					if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
						c.clusterShow();
						c._recursivelyRemoveChildrenFromMap(bounds, mapMinZoom, previousZoomLevel);
					} else c.clusterHide();
					c._addToMap();
				});
			},
			_recursivelyBecomeVisible: function(bounds, zoomLevel) {
				this._recursively(bounds, this._group._map.getMinZoom(), zoomLevel, null, function(c) {
					c.clusterShow();
				});
			},
			_recursivelyAddChildrenToMap: function(startPos, zoomLevel, bounds) {
				this._recursively(bounds, this._group._map.getMinZoom() - 1, zoomLevel, function(c) {
					if (zoomLevel === c._zoom) return;
					for (var i = c._markers.length - 1; i >= 0; i--) {
						var nm = c._markers[i];
						if (!bounds.contains(nm._latlng)) continue;
						if (startPos) {
							nm._backupLatlng = nm.getLatLng();
							nm.setLatLng(startPos);
							if (nm.clusterHide) nm.clusterHide();
						}
						c._group._featureGroup.addLayer(nm);
					}
				}, function(c) {
					c._addToMap(startPos);
				});
			},
			_recursivelyRestoreChildPositions: function(zoomLevel) {
				for (var i = this._markers.length - 1; i >= 0; i--) {
					var nm = this._markers[i];
					if (nm._backupLatlng) {
						nm.setLatLng(nm._backupLatlng);
						delete nm._backupLatlng;
					}
				}
				if (zoomLevel - 1 === this._zoom) for (var j = this._childClusters.length - 1; j >= 0; j--) this._childClusters[j]._restorePosition();
				else for (var k = this._childClusters.length - 1; k >= 0; k--) this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel);
			},
			_restorePosition: function() {
				if (this._backupLatlng) {
					this.setLatLng(this._backupLatlng);
					delete this._backupLatlng;
				}
			},
			_recursivelyRemoveChildrenFromMap: function(previousBounds, mapMinZoom, zoomLevel, exceptBounds) {
				var m, i;
				this._recursively(previousBounds, mapMinZoom - 1, zoomLevel - 1, function(c) {
					for (i = c._markers.length - 1; i >= 0; i--) {
						m = c._markers[i];
						if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
							c._group._featureGroup.removeLayer(m);
							if (m.clusterShow) m.clusterShow();
						}
					}
				}, function(c) {
					for (i = c._childClusters.length - 1; i >= 0; i--) {
						m = c._childClusters[i];
						if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
							c._group._featureGroup.removeLayer(m);
							if (m.clusterShow) m.clusterShow();
						}
					}
				});
			},
			_recursively: function(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
				var childClusters = this._childClusters, zoom = this._zoom, i, c;
				if (zoomLevelToStart <= zoom) {
					if (runAtEveryLevel) runAtEveryLevel(this);
					if (runAtBottomLevel && zoom === zoomLevelToStop) runAtBottomLevel(this);
				}
				if (zoom < zoomLevelToStart || zoom < zoomLevelToStop) for (i = childClusters.length - 1; i >= 0; i--) {
					c = childClusters[i];
					if (c._boundsNeedUpdate) c._recalculateBounds();
					if (boundsToApplyTo.intersects(c._bounds)) c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
				}
			},
			_isSingleParent: function() {
				return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
			}
		});
		L.Marker.include({
			clusterHide: function() {
				var backup = this.options.opacity;
				this.setOpacity(0);
				this.options.opacity = backup;
				return this;
			},
			clusterShow: function() {
				return this.setOpacity(this.options.opacity);
			}
		});
		L.DistanceGrid = function(cellSize) {
			this._cellSize = cellSize;
			this._sqCellSize = cellSize * cellSize;
			this._grid = {};
			this._objectPoint = {};
		};
		L.DistanceGrid.prototype = {
			addObject: function(obj, point) {
				var x = this._getCoord(point.x), y = this._getCoord(point.y), grid = this._grid, row = grid[y] = grid[y] || {}, cell = row[x] = row[x] || [], stamp = L.Util.stamp(obj);
				this._objectPoint[stamp] = point;
				cell.push(obj);
			},
			updateObject: function(obj, point) {
				this.removeObject(obj);
				this.addObject(obj, point);
			},
			removeObject: function(obj, point) {
				var x = this._getCoord(point.x), y = this._getCoord(point.y), grid = this._grid, row = grid[y] = grid[y] || {}, cell = row[x] = row[x] || [], i, len;
				delete this._objectPoint[L.Util.stamp(obj)];
				for (i = 0, len = cell.length; i < len; i++) if (cell[i] === obj) {
					cell.splice(i, 1);
					if (len === 1) delete row[x];
					return true;
				}
			},
			eachObject: function(fn, context) {
				var i, j, k, len, row, cell, removed, grid = this._grid;
				for (i in grid) {
					row = grid[i];
					for (j in row) {
						cell = row[j];
						for (k = 0, len = cell.length; k < len; k++) {
							removed = fn.call(context, cell[k]);
							if (removed) {
								k--;
								len--;
							}
						}
					}
				}
			},
			getNearObject: function(point) {
				var x = this._getCoord(point.x), y = this._getCoord(point.y), i, j, k, row, cell, len, obj, dist, objectPoint = this._objectPoint, closestDistSq = this._sqCellSize, closest = null;
				for (i = y - 1; i <= y + 1; i++) {
					row = this._grid[i];
					if (row) for (j = x - 1; j <= x + 1; j++) {
						cell = row[j];
						if (cell) for (k = 0, len = cell.length; k < len; k++) {
							obj = cell[k];
							dist = this._sqDist(objectPoint[L.Util.stamp(obj)], point);
							if (dist < closestDistSq || dist <= closestDistSq && closest === null) {
								closestDistSq = dist;
								closest = obj;
							}
						}
					}
				}
				return closest;
			},
			_getCoord: function(x) {
				var coord = Math.floor(x / this._cellSize);
				return isFinite(coord) ? coord : x;
			},
			_sqDist: function(p, p2) {
				var dx = p2.x - p.x, dy = p2.y - p.y;
				return dx * dx + dy * dy;
			}
		};
		(function() {
			L.QuickHull = {
				getDistant: function(cpt, bl) {
					var vY = bl[1].lat - bl[0].lat;
					return (bl[0].lng - bl[1].lng) * (cpt.lat - bl[0].lat) + vY * (cpt.lng - bl[0].lng);
				},
				findMostDistantPointFromBaseLine: function(baseLine, latLngs) {
					var maxD = 0, maxPt = null, newPoints = [], i, pt, d;
					for (i = latLngs.length - 1; i >= 0; i--) {
						pt = latLngs[i];
						d = this.getDistant(pt, baseLine);
						if (d > 0) newPoints.push(pt);
						else continue;
						if (d > maxD) {
							maxD = d;
							maxPt = pt;
						}
					}
					return {
						maxPoint: maxPt,
						newPoints
					};
				},
				buildConvexHull: function(baseLine, latLngs) {
					var convexHullBaseLines = [], t = this.findMostDistantPointFromBaseLine(baseLine, latLngs);
					if (t.maxPoint) {
						convexHullBaseLines = convexHullBaseLines.concat(this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints));
						convexHullBaseLines = convexHullBaseLines.concat(this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints));
						return convexHullBaseLines;
					} else return [baseLine[0]];
				},
				getConvexHull: function(latLngs) {
					var maxLat = false, minLat = false, maxLng = false, minLng = false, maxLatPt = null, minLatPt = null, maxLngPt = null, minLngPt = null, maxPt = null, minPt = null, i;
					for (i = latLngs.length - 1; i >= 0; i--) {
						var pt = latLngs[i];
						if (maxLat === false || pt.lat > maxLat) {
							maxLatPt = pt;
							maxLat = pt.lat;
						}
						if (minLat === false || pt.lat < minLat) {
							minLatPt = pt;
							minLat = pt.lat;
						}
						if (maxLng === false || pt.lng > maxLng) {
							maxLngPt = pt;
							maxLng = pt.lng;
						}
						if (minLng === false || pt.lng < minLng) {
							minLngPt = pt;
							minLng = pt.lng;
						}
					}
					if (minLat !== maxLat) {
						minPt = minLatPt;
						maxPt = maxLatPt;
					} else {
						minPt = minLngPt;
						maxPt = maxLngPt;
					}
					return [].concat(this.buildConvexHull([minPt, maxPt], latLngs), this.buildConvexHull([maxPt, minPt], latLngs));
				}
			};
		})();
		L.MarkerCluster.include({ getConvexHull: function() {
			var childMarkers = this.getAllChildMarkers(), points = [], p, i;
			for (i = childMarkers.length - 1; i >= 0; i--) {
				p = childMarkers[i].getLatLng();
				points.push(p);
			}
			return L.QuickHull.getConvexHull(points);
		} });
		L.MarkerCluster.include({
			_2PI: Math.PI * 2,
			_circleFootSeparation: 25,
			_circleStartAngle: 0,
			_spiralFootSeparation: 28,
			_spiralLengthStart: 11,
			_spiralLengthFactor: 5,
			_circleSpiralSwitchover: 9,
			spiderfy: function() {
				if (this._group._spiderfied === this || this._group._inZoomAnimation) return;
				var childMarkers = this.getAllChildMarkers(null, true), center = this._group._map.latLngToLayerPoint(this._latlng), positions;
				this._group._unspiderfy();
				this._group._spiderfied = this;
				if (this._group.options.spiderfyShapePositions) positions = this._group.options.spiderfyShapePositions(childMarkers.length, center);
				else if (childMarkers.length >= this._circleSpiralSwitchover) positions = this._generatePointsSpiral(childMarkers.length, center);
				else {
					center.y += 10;
					positions = this._generatePointsCircle(childMarkers.length, center);
				}
				this._animationSpiderfy(childMarkers, positions);
			},
			unspiderfy: function(zoomDetails) {
				if (this._group._inZoomAnimation) return;
				this._animationUnspiderfy(zoomDetails);
				this._group._spiderfied = null;
			},
			_generatePointsCircle: function(count, centerPt) {
				var legLength = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count) / this._2PI, angleStep = this._2PI / count, res = [], i, angle;
				legLength = Math.max(legLength, 35);
				res.length = count;
				for (i = 0; i < count; i++) {
					angle = this._circleStartAngle + i * angleStep;
					res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
				}
				return res;
			},
			_generatePointsSpiral: function(count, centerPt) {
				var spiderfyDistanceMultiplier = this._group.options.spiderfyDistanceMultiplier, legLength = spiderfyDistanceMultiplier * this._spiralLengthStart, separation = spiderfyDistanceMultiplier * this._spiralFootSeparation, lengthFactor = spiderfyDistanceMultiplier * this._spiralLengthFactor * this._2PI, angle = 0, res = [], i;
				res.length = count;
				for (i = count; i >= 0; i--) {
					if (i < count) res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
					angle += separation / legLength + i * 5e-4;
					legLength += lengthFactor / angle;
				}
				return res;
			},
			_noanimationUnspiderfy: function() {
				var group = this._group, map = group._map, fg = group._featureGroup, childMarkers = this.getAllChildMarkers(null, true), m, i;
				group._ignoreMove = true;
				this.setOpacity(1);
				for (i = childMarkers.length - 1; i >= 0; i--) {
					m = childMarkers[i];
					fg.removeLayer(m);
					if (m._preSpiderfyLatlng) {
						m.setLatLng(m._preSpiderfyLatlng);
						delete m._preSpiderfyLatlng;
					}
					if (m.setZIndexOffset) m.setZIndexOffset(0);
					if (m._spiderLeg) {
						map.removeLayer(m._spiderLeg);
						delete m._spiderLeg;
					}
				}
				group.fire("unspiderfied", {
					cluster: this,
					markers: childMarkers
				});
				group._ignoreMove = false;
				group._spiderfied = null;
			}
		});
		L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
			_animationSpiderfy: function(childMarkers, positions) {
				var group = this._group, map = group._map, fg = group._featureGroup, legOptions = this._group.options.spiderLegPolylineOptions, i, m, leg, newPos;
				group._ignoreMove = true;
				for (i = 0; i < childMarkers.length; i++) {
					newPos = map.layerPointToLatLng(positions[i]);
					m = childMarkers[i];
					leg = new L.Polyline([this._latlng, newPos], legOptions);
					map.addLayer(leg);
					m._spiderLeg = leg;
					m._preSpiderfyLatlng = m._latlng;
					m.setLatLng(newPos);
					if (m.setZIndexOffset) m.setZIndexOffset(1e6);
					fg.addLayer(m);
				}
				this.setOpacity(.3);
				group._ignoreMove = false;
				group.fire("spiderfied", {
					cluster: this,
					markers: childMarkers
				});
			},
			_animationUnspiderfy: function() {
				this._noanimationUnspiderfy();
			}
		});
		L.MarkerCluster.include({
			_animationSpiderfy: function(childMarkers, positions) {
				var me = this, group = this._group, map = group._map, fg = group._featureGroup, thisLayerLatLng = this._latlng, thisLayerPos = map.latLngToLayerPoint(thisLayerLatLng), svg = L.Path.SVG, legOptions = L.extend({}, this._group.options.spiderLegPolylineOptions), finalLegOpacity = legOptions.opacity, i, m, leg, legPath, legLength, newPos;
				if (finalLegOpacity === void 0) finalLegOpacity = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity;
				if (svg) {
					legOptions.opacity = 0;
					legOptions.className = (legOptions.className || "") + " leaflet-cluster-spider-leg";
				} else legOptions.opacity = finalLegOpacity;
				group._ignoreMove = true;
				for (i = 0; i < childMarkers.length; i++) {
					m = childMarkers[i];
					newPos = map.layerPointToLatLng(positions[i]);
					leg = new L.Polyline([thisLayerLatLng, newPos], legOptions);
					map.addLayer(leg);
					m._spiderLeg = leg;
					if (svg) {
						legPath = leg._path;
						legLength = legPath.getTotalLength() + .1;
						legPath.style.strokeDasharray = legLength;
						legPath.style.strokeDashoffset = legLength;
					}
					if (m.setZIndexOffset) m.setZIndexOffset(1e6);
					if (m.clusterHide) m.clusterHide();
					fg.addLayer(m);
					if (m._setPos) m._setPos(thisLayerPos);
				}
				group._forceLayout();
				group._animationStart();
				for (i = childMarkers.length - 1; i >= 0; i--) {
					newPos = map.layerPointToLatLng(positions[i]);
					m = childMarkers[i];
					m._preSpiderfyLatlng = m._latlng;
					m.setLatLng(newPos);
					if (m.clusterShow) m.clusterShow();
					if (svg) {
						leg = m._spiderLeg;
						legPath = leg._path;
						legPath.style.strokeDashoffset = 0;
						leg.setStyle({ opacity: finalLegOpacity });
					}
				}
				this.setOpacity(.3);
				group._ignoreMove = false;
				setTimeout(function() {
					group._animationEnd();
					group.fire("spiderfied", {
						cluster: me,
						markers: childMarkers
					});
				}, 200);
			},
			_animationUnspiderfy: function(zoomDetails) {
				var me = this, group = this._group, map = group._map, fg = group._featureGroup, thisLayerPos = zoomDetails ? map._latLngToNewLayerPoint(this._latlng, zoomDetails.zoom, zoomDetails.center) : map.latLngToLayerPoint(this._latlng), childMarkers = this.getAllChildMarkers(null, true), svg = L.Path.SVG, m, i, leg, legPath, legLength, nonAnimatable;
				group._ignoreMove = true;
				group._animationStart();
				this.setOpacity(1);
				for (i = childMarkers.length - 1; i >= 0; i--) {
					m = childMarkers[i];
					if (!m._preSpiderfyLatlng) continue;
					m.closePopup();
					m.setLatLng(m._preSpiderfyLatlng);
					delete m._preSpiderfyLatlng;
					nonAnimatable = true;
					if (m._setPos) {
						m._setPos(thisLayerPos);
						nonAnimatable = false;
					}
					if (m.clusterHide) {
						m.clusterHide();
						nonAnimatable = false;
					}
					if (nonAnimatable) fg.removeLayer(m);
					if (svg) {
						leg = m._spiderLeg;
						legPath = leg._path;
						legLength = legPath.getTotalLength() + .1;
						legPath.style.strokeDashoffset = legLength;
						leg.setStyle({ opacity: 0 });
					}
				}
				group._ignoreMove = false;
				setTimeout(function() {
					var stillThereChildCount = 0;
					for (i = childMarkers.length - 1; i >= 0; i--) {
						m = childMarkers[i];
						if (m._spiderLeg) stillThereChildCount++;
					}
					for (i = childMarkers.length - 1; i >= 0; i--) {
						m = childMarkers[i];
						if (!m._spiderLeg) continue;
						if (m.clusterShow) m.clusterShow();
						if (m.setZIndexOffset) m.setZIndexOffset(0);
						if (stillThereChildCount > 1) fg.removeLayer(m);
						map.removeLayer(m._spiderLeg);
						delete m._spiderLeg;
					}
					group._animationEnd();
					group.fire("unspiderfied", {
						cluster: me,
						markers: childMarkers
					});
				}, 200);
			}
		});
		L.MarkerClusterGroup.include({
			_spiderfied: null,
			unspiderfy: function() {
				this._unspiderfy.apply(this, arguments);
			},
			_spiderfierOnAdd: function() {
				this._map.on("click", this._unspiderfyWrapper, this);
				if (this._map.options.zoomAnimation) this._map.on("zoomstart", this._unspiderfyZoomStart, this);
				this._map.on("zoomend", this._noanimationUnspiderfy, this);
				if (!L.Browser.touch) this._map.getRenderer(this);
			},
			_spiderfierOnRemove: function() {
				this._map.off("click", this._unspiderfyWrapper, this);
				this._map.off("zoomstart", this._unspiderfyZoomStart, this);
				this._map.off("zoomanim", this._unspiderfyZoomAnim, this);
				this._map.off("zoomend", this._noanimationUnspiderfy, this);
				this._noanimationUnspiderfy();
			},
			_unspiderfyZoomStart: function() {
				if (!this._map) return;
				this._map.on("zoomanim", this._unspiderfyZoomAnim, this);
			},
			_unspiderfyZoomAnim: function(zoomDetails) {
				if (L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching")) return;
				this._map.off("zoomanim", this._unspiderfyZoomAnim, this);
				this._unspiderfy(zoomDetails);
			},
			_unspiderfyWrapper: function() {
				this._unspiderfy();
			},
			_unspiderfy: function(zoomDetails) {
				if (this._spiderfied) this._spiderfied.unspiderfy(zoomDetails);
			},
			_noanimationUnspiderfy: function() {
				if (this._spiderfied) this._spiderfied._noanimationUnspiderfy();
			},
			_unspiderfyLayer: function(layer) {
				if (layer._spiderLeg) {
					this._featureGroup.removeLayer(layer);
					if (layer.clusterShow) layer.clusterShow();
					if (layer.setZIndexOffset) layer.setZIndexOffset(0);
					this._map.removeLayer(layer._spiderLeg);
					delete layer._spiderLeg;
				}
			}
		});
		/**
		* Adds 1 public method to MCG and 1 to L.Marker to facilitate changing
		* markers' icon options and refreshing their icon and their parent clusters
		* accordingly (case where their iconCreateFunction uses data of childMarkers
		* to make up the cluster icon).
		*/
		L.MarkerClusterGroup.include({
			refreshClusters: function(layers) {
				if (!layers) layers = this._topClusterLevel.getAllChildMarkers();
				else if (layers instanceof L.MarkerClusterGroup) layers = layers._topClusterLevel.getAllChildMarkers();
				else if (layers instanceof L.LayerGroup) layers = layers._layers;
				else if (layers instanceof L.MarkerCluster) layers = layers.getAllChildMarkers();
				else if (layers instanceof L.Marker) layers = [layers];
				this._flagParentsIconsNeedUpdate(layers);
				this._refreshClustersIcons();
				if (this.options.singleMarkerMode) this._refreshSingleMarkerModeMarkers(layers);
				return this;
			},
			_flagParentsIconsNeedUpdate: function(layers) {
				var id, parent;
				for (id in layers) {
					parent = layers[id].__parent;
					while (parent) {
						parent._iconNeedsUpdate = true;
						parent = parent.__parent;
					}
				}
			},
			_refreshSingleMarkerModeMarkers: function(layers) {
				var id, layer;
				for (id in layers) {
					layer = layers[id];
					if (this.hasLayer(layer)) layer.setIcon(this._overrideMarkerIcon(layer));
				}
			}
		});
		L.Marker.include({ refreshIconOptions: function(options, directlyRefreshClusters) {
			var icon = this.options.icon;
			L.setOptions(icon, options);
			this.setIcon(icon);
			if (directlyRefreshClusters && this.__parent) this.__parent._group.refreshClusters(this);
			return this;
		} });
		exports$1.MarkerClusterGroup = MarkerClusterGroup;
		exports$1.MarkerCluster = MarkerCluster;
		Object.defineProperty(exports$1, "__esModule", { value: true });
	});
}));
//#endregion
//#region node_modules/dompurify/dist/purify.es.mjs
/*! @license DOMPurify 3.4.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.0/LICENSE */
var { entries, setPrototypeOf, isFrozen, getPrototypeOf, getOwnPropertyDescriptor } = Object;
var { freeze, seal, create } = Object;
var { apply, construct } = typeof Reflect !== "undefined" && Reflect;
if (!freeze) freeze = function freeze(x) {
	return x;
};
if (!seal) seal = function seal(x) {
	return x;
};
if (!apply) apply = function apply(func, thisArg) {
	for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
	return func.apply(thisArg, args);
};
if (!construct) construct = function construct(Func) {
	for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
	return new Func(...args);
};
var arrayForEach = unapply(Array.prototype.forEach);
var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
var arrayPop = unapply(Array.prototype.pop);
var arrayPush = unapply(Array.prototype.push);
var arraySplice = unapply(Array.prototype.splice);
var stringToLowerCase = unapply(String.prototype.toLowerCase);
var stringToString = unapply(String.prototype.toString);
var stringMatch = unapply(String.prototype.match);
var stringReplace = unapply(String.prototype.replace);
var stringIndexOf = unapply(String.prototype.indexOf);
var stringTrim = unapply(String.prototype.trim);
var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
var regExpTest = unapply(RegExp.prototype.test);
var typeErrorCreate = unconstruct(TypeError);
/**
* Creates a new function that calls the given function with a specified thisArg and arguments.
*
* @param func - The function to be wrapped and called.
* @returns A new function that calls the given function with a specified thisArg and arguments.
*/
function unapply(func) {
	return function(thisArg) {
		if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
		for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
		return apply(func, thisArg, args);
	};
}
/**
* Creates a new function that constructs an instance of the given constructor function with the provided arguments.
*
* @param func - The constructor function to be wrapped and called.
* @returns A new function that constructs an instance of the given constructor function with the provided arguments.
*/
function unconstruct(Func) {
	return function() {
		for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
		return construct(Func, args);
	};
}
/**
* Add properties to a lookup table
*
* @param set - The set to which elements will be added.
* @param array - The array containing elements to be added to the set.
* @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
* @returns The modified set with added elements.
*/
function addToSet(set, array) {
	let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
	if (setPrototypeOf) setPrototypeOf(set, null);
	let l = array.length;
	while (l--) {
		let element = array[l];
		if (typeof element === "string") {
			const lcElement = transformCaseFunc(element);
			if (lcElement !== element) {
				if (!isFrozen(array)) array[l] = lcElement;
				element = lcElement;
			}
		}
		set[element] = true;
	}
	return set;
}
/**
* Clean up an array to harden against CSPP
*
* @param array - The array to be cleaned.
* @returns The cleaned version of the array
*/
function cleanArray(array) {
	for (let index = 0; index < array.length; index++) if (!objectHasOwnProperty(array, index)) array[index] = null;
	return array;
}
/**
* Shallow clone an object
*
* @param object - The object to be cloned.
* @returns A new object that copies the original.
*/
function clone$2(object) {
	const newObject = create(null);
	for (const [property, value] of entries(object)) if (objectHasOwnProperty(object, property)) if (Array.isArray(value)) newObject[property] = cleanArray(value);
	else if (value && typeof value === "object" && value.constructor === Object) newObject[property] = clone$2(value);
	else newObject[property] = value;
	return newObject;
}
/**
* This method automatically checks if the prop is function or getter and behaves accordingly.
*
* @param object - The object to look up the getter function in its prototype chain.
* @param prop - The property name for which to find the getter function.
* @returns The getter function found in the prototype chain or a fallback function.
*/
function lookupGetter(object, prop) {
	while (object !== null) {
		const desc = getOwnPropertyDescriptor(object, prop);
		if (desc) {
			if (desc.get) return unapply(desc.get);
			if (typeof desc.value === "function") return unapply(desc.value);
		}
		object = getPrototypeOf(object);
	}
	function fallbackValue() {
		return null;
	}
	return fallbackValue;
}
var html$1 = freeze([
	"a",
	"abbr",
	"acronym",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"bdi",
	"bdo",
	"big",
	"blink",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"center",
	"cite",
	"code",
	"col",
	"colgroup",
	"content",
	"data",
	"datalist",
	"dd",
	"decorator",
	"del",
	"details",
	"dfn",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"element",
	"em",
	"fieldset",
	"figcaption",
	"figure",
	"font",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"map",
	"mark",
	"marquee",
	"menu",
	"menuitem",
	"meter",
	"nav",
	"nobr",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"search",
	"section",
	"select",
	"shadow",
	"slot",
	"small",
	"source",
	"spacer",
	"span",
	"strike",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"track",
	"tt",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
]);
var svg$1 = freeze([
	"svg",
	"a",
	"altglyph",
	"altglyphdef",
	"altglyphitem",
	"animatecolor",
	"animatemotion",
	"animatetransform",
	"circle",
	"clippath",
	"defs",
	"desc",
	"ellipse",
	"enterkeyhint",
	"exportparts",
	"filter",
	"font",
	"g",
	"glyph",
	"glyphref",
	"hkern",
	"image",
	"inputmode",
	"line",
	"lineargradient",
	"marker",
	"mask",
	"metadata",
	"mpath",
	"part",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialgradient",
	"rect",
	"stop",
	"style",
	"switch",
	"symbol",
	"text",
	"textpath",
	"title",
	"tref",
	"tspan",
	"view",
	"vkern"
]);
var svgFilters = freeze([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]);
var svgDisallowed = freeze([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]);
var mathMl$1 = freeze([
	"math",
	"menclose",
	"merror",
	"mfenced",
	"mfrac",
	"mglyph",
	"mi",
	"mlabeledtr",
	"mmultiscripts",
	"mn",
	"mo",
	"mover",
	"mpadded",
	"mphantom",
	"mroot",
	"mrow",
	"ms",
	"mspace",
	"msqrt",
	"mstyle",
	"msub",
	"msup",
	"msubsup",
	"mtable",
	"mtd",
	"mtext",
	"mtr",
	"munder",
	"munderover",
	"mprescripts"
]);
var mathMlDisallowed = freeze([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]);
var text = freeze(["#text"]);
var html = freeze([
	"accept",
	"action",
	"align",
	"alt",
	"autocapitalize",
	"autocomplete",
	"autopictureinpicture",
	"autoplay",
	"background",
	"bgcolor",
	"border",
	"capture",
	"cellpadding",
	"cellspacing",
	"checked",
	"cite",
	"class",
	"clear",
	"color",
	"cols",
	"colspan",
	"controls",
	"controlslist",
	"coords",
	"crossorigin",
	"datetime",
	"decoding",
	"default",
	"dir",
	"disabled",
	"disablepictureinpicture",
	"disableremoteplayback",
	"download",
	"draggable",
	"enctype",
	"enterkeyhint",
	"exportparts",
	"face",
	"for",
	"headers",
	"height",
	"hidden",
	"high",
	"href",
	"hreflang",
	"id",
	"inert",
	"inputmode",
	"integrity",
	"ismap",
	"kind",
	"label",
	"lang",
	"list",
	"loading",
	"loop",
	"low",
	"max",
	"maxlength",
	"media",
	"method",
	"min",
	"minlength",
	"multiple",
	"muted",
	"name",
	"nonce",
	"noshade",
	"novalidate",
	"nowrap",
	"open",
	"optimum",
	"part",
	"pattern",
	"placeholder",
	"playsinline",
	"popover",
	"popovertarget",
	"popovertargetaction",
	"poster",
	"preload",
	"pubdate",
	"radiogroup",
	"readonly",
	"rel",
	"required",
	"rev",
	"reversed",
	"role",
	"rows",
	"rowspan",
	"spellcheck",
	"scope",
	"selected",
	"shape",
	"size",
	"sizes",
	"slot",
	"span",
	"srclang",
	"start",
	"src",
	"srcset",
	"step",
	"style",
	"summary",
	"tabindex",
	"title",
	"translate",
	"type",
	"usemap",
	"valign",
	"value",
	"width",
	"wrap",
	"xmlns",
	"slot"
]);
var svg = freeze([
	"accent-height",
	"accumulate",
	"additive",
	"alignment-baseline",
	"amplitude",
	"ascent",
	"attributename",
	"attributetype",
	"azimuth",
	"basefrequency",
	"baseline-shift",
	"begin",
	"bias",
	"by",
	"class",
	"clip",
	"clippathunits",
	"clip-path",
	"clip-rule",
	"color",
	"color-interpolation",
	"color-interpolation-filters",
	"color-profile",
	"color-rendering",
	"cx",
	"cy",
	"d",
	"dx",
	"dy",
	"diffuseconstant",
	"direction",
	"display",
	"divisor",
	"dur",
	"edgemode",
	"elevation",
	"end",
	"exponent",
	"fill",
	"fill-opacity",
	"fill-rule",
	"filter",
	"filterunits",
	"flood-color",
	"flood-opacity",
	"font-family",
	"font-size",
	"font-size-adjust",
	"font-stretch",
	"font-style",
	"font-variant",
	"font-weight",
	"fx",
	"fy",
	"g1",
	"g2",
	"glyph-name",
	"glyphref",
	"gradientunits",
	"gradienttransform",
	"height",
	"href",
	"id",
	"image-rendering",
	"in",
	"in2",
	"intercept",
	"k",
	"k1",
	"k2",
	"k3",
	"k4",
	"kerning",
	"keypoints",
	"keysplines",
	"keytimes",
	"lang",
	"lengthadjust",
	"letter-spacing",
	"kernelmatrix",
	"kernelunitlength",
	"lighting-color",
	"local",
	"marker-end",
	"marker-mid",
	"marker-start",
	"markerheight",
	"markerunits",
	"markerwidth",
	"maskcontentunits",
	"maskunits",
	"max",
	"mask",
	"mask-type",
	"media",
	"method",
	"mode",
	"min",
	"name",
	"numoctaves",
	"offset",
	"operator",
	"opacity",
	"order",
	"orient",
	"orientation",
	"origin",
	"overflow",
	"paint-order",
	"path",
	"pathlength",
	"patterncontentunits",
	"patterntransform",
	"patternunits",
	"points",
	"preservealpha",
	"preserveaspectratio",
	"primitiveunits",
	"r",
	"rx",
	"ry",
	"radius",
	"refx",
	"refy",
	"repeatcount",
	"repeatdur",
	"restart",
	"result",
	"rotate",
	"scale",
	"seed",
	"shape-rendering",
	"slope",
	"specularconstant",
	"specularexponent",
	"spreadmethod",
	"startoffset",
	"stddeviation",
	"stitchtiles",
	"stop-color",
	"stop-opacity",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke",
	"stroke-width",
	"style",
	"surfacescale",
	"systemlanguage",
	"tabindex",
	"tablevalues",
	"targetx",
	"targety",
	"transform",
	"transform-origin",
	"text-anchor",
	"text-decoration",
	"text-rendering",
	"textlength",
	"type",
	"u1",
	"u2",
	"unicode",
	"values",
	"viewbox",
	"visibility",
	"version",
	"vert-adv-y",
	"vert-origin-x",
	"vert-origin-y",
	"width",
	"word-spacing",
	"wrap",
	"writing-mode",
	"xchannelselector",
	"ychannelselector",
	"x",
	"x1",
	"x2",
	"xmlns",
	"y",
	"y1",
	"y2",
	"z",
	"zoomandpan"
]);
var mathMl = freeze([
	"accent",
	"accentunder",
	"align",
	"bevelled",
	"close",
	"columnalign",
	"columnlines",
	"columnspacing",
	"columnspan",
	"denomalign",
	"depth",
	"dir",
	"display",
	"displaystyle",
	"encoding",
	"fence",
	"frame",
	"height",
	"href",
	"id",
	"largeop",
	"length",
	"linethickness",
	"lquote",
	"lspace",
	"mathbackground",
	"mathcolor",
	"mathsize",
	"mathvariant",
	"maxsize",
	"minsize",
	"movablelimits",
	"notation",
	"numalign",
	"open",
	"rowalign",
	"rowlines",
	"rowspacing",
	"rowspan",
	"rspace",
	"rquote",
	"scriptlevel",
	"scriptminsize",
	"scriptsizemultiplier",
	"selection",
	"separator",
	"separators",
	"stretchy",
	"subscriptshift",
	"supscriptshift",
	"symmetric",
	"voffset",
	"width",
	"xmlns"
]);
var xml = freeze([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]);
var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
var TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
var DOCTYPE_NAME = seal(/^html$/i);
var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	ARIA_ATTR,
	ATTR_WHITESPACE,
	CUSTOM_ELEMENT,
	DATA_ATTR,
	DOCTYPE_NAME,
	ERB_EXPR,
	IS_ALLOWED_URI,
	IS_SCRIPT_OR_DATA,
	MUSTACHE_EXPR,
	TMPLIT_EXPR
});
var NODE_TYPE = {
	element: 1,
	text: 3,
	progressingInstruction: 7,
	comment: 8,
	document: 9
};
var getGlobal = function getGlobal() {
	return typeof window === "undefined" ? null : window;
};
/**
* Creates a no-op policy for internal use only.
* Don't export this function outside this module!
* @param trustedTypes The policy factory.
* @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
* @return The policy created (or null, if Trusted Types
* are not supported or creating the policy failed).
*/
var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
	if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") return null;
	let suffix = null;
	const ATTR_NAME = "data-tt-policy-suffix";
	if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
	const policyName = "dompurify" + (suffix ? "#" + suffix : "");
	try {
		return trustedTypes.createPolicy(policyName, {
			createHTML(html) {
				return html;
			},
			createScriptURL(scriptUrl) {
				return scriptUrl;
			}
		});
	} catch (_) {
		console.warn("TrustedTypes policy " + policyName + " could not be created.");
		return null;
	}
};
var _createHooksMap = function _createHooksMap() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
};
function createDOMPurify() {
	let window = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
	const DOMPurify = (root) => createDOMPurify(root);
	DOMPurify.version = "3.4.0";
	DOMPurify.removed = [];
	if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
		DOMPurify.isSupported = false;
		return DOMPurify;
	}
	let { document } = window;
	const originalDocument = document;
	const currentScript = originalDocument.currentScript;
	const { DocumentFragment, HTMLTemplateElement, Node, Element, NodeFilter, NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap, HTMLFormElement, DOMParser, trustedTypes } = window;
	const ElementPrototype = Element.prototype;
	const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
	const remove = lookupGetter(ElementPrototype, "remove");
	const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
	const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
	const getParentNode = lookupGetter(ElementPrototype, "parentNode");
	if (typeof HTMLTemplateElement === "function") {
		const template = document.createElement("template");
		if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
	}
	let trustedTypesPolicy;
	let emptyHTML = "";
	const { implementation, createNodeIterator, createDocumentFragment, getElementsByTagName } = document;
	const { importNode } = originalDocument;
	let hooks = _createHooksMap();
	/**
	* Expose whether this browser supports running the full DOMPurify.
	*/
	DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
	const { MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR, DATA_ATTR, ARIA_ATTR, IS_SCRIPT_OR_DATA, ATTR_WHITESPACE, CUSTOM_ELEMENT } = EXPRESSIONS;
	let { IS_ALLOWED_URI: IS_ALLOWED_URI$1 } = EXPRESSIONS;
	/**
	* We consider the elements and attributes below to be safe. Ideally
	* don't add any new ones but feel free to remove unwanted ones.
	*/
	let ALLOWED_TAGS = null;
	const DEFAULT_ALLOWED_TAGS = addToSet({}, [
		...html$1,
		...svg$1,
		...svgFilters,
		...mathMl$1,
		...text
	]);
	let ALLOWED_ATTR = null;
	const DEFAULT_ALLOWED_ATTR = addToSet({}, [
		...html,
		...svg,
		...mathMl,
		...xml
	]);
	let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
		tagNameCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		attributeNameCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: false
		}
	}));
	let FORBID_TAGS = null;
	let FORBID_ATTR = null;
	const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
		tagCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		attributeCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		}
	}));
	let ALLOW_ARIA_ATTR = true;
	let ALLOW_DATA_ATTR = true;
	let ALLOW_UNKNOWN_PROTOCOLS = false;
	let ALLOW_SELF_CLOSE_IN_ATTR = true;
	let SAFE_FOR_TEMPLATES = false;
	let SAFE_FOR_XML = true;
	let WHOLE_DOCUMENT = false;
	let SET_CONFIG = false;
	let FORCE_BODY = false;
	let RETURN_DOM = false;
	let RETURN_DOM_FRAGMENT = false;
	let RETURN_TRUSTED_TYPE = false;
	let SANITIZE_DOM = true;
	let SANITIZE_NAMED_PROPS = false;
	const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
	let KEEP_CONTENT = true;
	let IN_PLACE = false;
	let USE_PROFILES = {};
	let FORBID_CONTENTS = null;
	const DEFAULT_FORBID_CONTENTS = addToSet({}, [
		"annotation-xml",
		"audio",
		"colgroup",
		"desc",
		"foreignobject",
		"head",
		"iframe",
		"math",
		"mi",
		"mn",
		"mo",
		"ms",
		"mtext",
		"noembed",
		"noframes",
		"noscript",
		"plaintext",
		"script",
		"style",
		"svg",
		"template",
		"thead",
		"title",
		"video",
		"xmp"
	]);
	let DATA_URI_TAGS = null;
	const DEFAULT_DATA_URI_TAGS = addToSet({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]);
	let URI_SAFE_ATTRIBUTES = null;
	const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]);
	const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
	const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
	const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
	let NAMESPACE = HTML_NAMESPACE;
	let IS_EMPTY_INPUT = false;
	let ALLOWED_NAMESPACES = null;
	const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
		MATHML_NAMESPACE,
		SVG_NAMESPACE,
		HTML_NAMESPACE
	], stringToString);
	let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, [
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]);
	let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
	const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]);
	let PARSER_MEDIA_TYPE = null;
	const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
	const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
	let transformCaseFunc = null;
	let CONFIG = null;
	const formElement = document.createElement("form");
	const isRegexOrFunction = function isRegexOrFunction(testValue) {
		return testValue instanceof RegExp || testValue instanceof Function;
	};
	/**
	* _parseConfig
	*
	* @param cfg optional config literal
	*/
	const _parseConfig = function _parseConfig() {
		let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (CONFIG && CONFIG === cfg) return;
		if (!cfg || typeof cfg !== "object") cfg = {};
		cfg = clone$2(cfg);
		PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
		transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
		ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
		ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
		ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
		URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone$2(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
		DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone$2(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
		FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
		FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone$2({});
		FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone$2({});
		USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
		ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
		ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
		ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
		ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
		SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
		SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
		WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
		RETURN_DOM = cfg.RETURN_DOM || false;
		RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
		RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
		FORCE_BODY = cfg.FORCE_BODY || false;
		SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
		SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
		KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
		IN_PLACE = cfg.IN_PLACE || false;
		IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
		NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
		MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
		HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
		CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || create(null);
		if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
		if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
		if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
		if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
		if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
		if (USE_PROFILES) {
			ALLOWED_TAGS = addToSet({}, text);
			ALLOWED_ATTR = create(null);
			if (USE_PROFILES.html === true) {
				addToSet(ALLOWED_TAGS, html$1);
				addToSet(ALLOWED_ATTR, html);
			}
			if (USE_PROFILES.svg === true) {
				addToSet(ALLOWED_TAGS, svg$1);
				addToSet(ALLOWED_ATTR, svg);
				addToSet(ALLOWED_ATTR, xml);
			}
			if (USE_PROFILES.svgFilters === true) {
				addToSet(ALLOWED_TAGS, svgFilters);
				addToSet(ALLOWED_ATTR, svg);
				addToSet(ALLOWED_ATTR, xml);
			}
			if (USE_PROFILES.mathMl === true) {
				addToSet(ALLOWED_TAGS, mathMl$1);
				addToSet(ALLOWED_ATTR, mathMl);
				addToSet(ALLOWED_ATTR, xml);
			}
		}
		EXTRA_ELEMENT_HANDLING.tagCheck = null;
		EXTRA_ELEMENT_HANDLING.attributeCheck = null;
		if (cfg.ADD_TAGS) if (typeof cfg.ADD_TAGS === "function") EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
		else {
			if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone$2(ALLOWED_TAGS);
			addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
		}
		if (cfg.ADD_ATTR) if (typeof cfg.ADD_ATTR === "function") EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
		else {
			if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone$2(ALLOWED_ATTR);
			addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
		}
		if (cfg.ADD_URI_SAFE_ATTR) addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
		if (cfg.FORBID_CONTENTS) {
			if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone$2(FORBID_CONTENTS);
			addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
		}
		if (cfg.ADD_FORBID_CONTENTS) {
			if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone$2(FORBID_CONTENTS);
			addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
		}
		if (KEEP_CONTENT) ALLOWED_TAGS["#text"] = true;
		if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
			"html",
			"head",
			"body"
		]);
		if (ALLOWED_TAGS.table) {
			addToSet(ALLOWED_TAGS, ["tbody"]);
			delete FORBID_TAGS.tbody;
		}
		if (cfg.TRUSTED_TYPES_POLICY) {
			if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
			emptyHTML = trustedTypesPolicy.createHTML("");
		} else {
			if (trustedTypesPolicy === void 0) trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
			if (trustedTypesPolicy !== null && typeof emptyHTML === "string") emptyHTML = trustedTypesPolicy.createHTML("");
		}
		if (freeze) freeze(cfg);
		CONFIG = cfg;
	};
	const ALL_SVG_TAGS = addToSet({}, [
		...svg$1,
		...svgFilters,
		...svgDisallowed
	]);
	const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
	/**
	* @param element a DOM element whose namespace is being checked
	* @returns Return false if the element has a
	*  namespace that a spec-compliant parser would never
	*  return. Return true otherwise.
	*/
	const _checkValidNamespace = function _checkValidNamespace(element) {
		let parent = getParentNode(element);
		if (!parent || !parent.tagName) parent = {
			namespaceURI: NAMESPACE,
			tagName: "template"
		};
		const tagName = stringToLowerCase(element.tagName);
		const parentTagName = stringToLowerCase(parent.tagName);
		if (!ALLOWED_NAMESPACES[element.namespaceURI]) return false;
		if (element.namespaceURI === SVG_NAMESPACE) {
			if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "svg";
			if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
			return Boolean(ALL_SVG_TAGS[tagName]);
		}
		if (element.namespaceURI === MATHML_NAMESPACE) {
			if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "math";
			if (parent.namespaceURI === SVG_NAMESPACE) return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
			return Boolean(ALL_MATHML_TAGS[tagName]);
		}
		if (element.namespaceURI === HTML_NAMESPACE) {
			if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
			if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
			return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
		}
		if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) return true;
		return false;
	};
	/**
	* _forceRemove
	*
	* @param node a DOM node
	*/
	const _forceRemove = function _forceRemove(node) {
		arrayPush(DOMPurify.removed, { element: node });
		try {
			getParentNode(node).removeChild(node);
		} catch (_) {
			remove(node);
		}
	};
	/**
	* _removeAttribute
	*
	* @param name an Attribute name
	* @param element a DOM node
	*/
	const _removeAttribute = function _removeAttribute(name, element) {
		try {
			arrayPush(DOMPurify.removed, {
				attribute: element.getAttributeNode(name),
				from: element
			});
		} catch (_) {
			arrayPush(DOMPurify.removed, {
				attribute: null,
				from: element
			});
		}
		element.removeAttribute(name);
		if (name === "is") if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
			_forceRemove(element);
		} catch (_) {}
		else try {
			element.setAttribute(name, "");
		} catch (_) {}
	};
	/**
	* _initDocument
	*
	* @param dirty - a string of dirty markup
	* @return a DOM, filled with the dirty markup
	*/
	const _initDocument = function _initDocument(dirty) {
		let doc = null;
		let leadingWhitespace = null;
		if (FORCE_BODY) dirty = "<remove></remove>" + dirty;
		else {
			const matches = stringMatch(dirty, /^[\r\n\t ]+/);
			leadingWhitespace = matches && matches[0];
		}
		if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) dirty = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + dirty + "</body></html>";
		const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
		if (NAMESPACE === HTML_NAMESPACE) try {
			doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
		} catch (_) {}
		if (!doc || !doc.documentElement) {
			doc = implementation.createDocument(NAMESPACE, "template", null);
			try {
				doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
			} catch (_) {}
		}
		const body = doc.body || doc.documentElement;
		if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
		if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
		return WHOLE_DOCUMENT ? doc.documentElement : body;
	};
	/**
	* Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
	*
	* @param root The root element or node to start traversing on.
	* @return The created NodeIterator
	*/
	const _createNodeIterator = function _createNodeIterator(root) {
		return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
	};
	/**
	* _isClobbered
	*
	* @param element element to check for clobbering attacks
	* @return true if clobbered, false if safe
	*/
	const _isClobbered = function _isClobbered(element) {
		return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
	};
	/**
	* Checks whether the given object is a DOM node.
	*
	* @param value object to check whether it's a DOM node
	* @return true is object is a DOM node
	*/
	const _isNode = function _isNode(value) {
		return typeof Node === "function" && value instanceof Node;
	};
	function _executeHooks(hooks, currentNode, data) {
		arrayForEach(hooks, (hook) => {
			hook.call(DOMPurify, currentNode, data, CONFIG);
		});
	}
	/**
	* _sanitizeElements
	*
	* @protect nodeName
	* @protect textContent
	* @protect removeChild
	* @param currentNode to check for permission to exist
	* @return true if node was killed, false if left alive
	*/
	const _sanitizeElements = function _sanitizeElements(currentNode) {
		let content = null;
		_executeHooks(hooks.beforeSanitizeElements, currentNode, null);
		if (_isClobbered(currentNode)) {
			_forceRemove(currentNode);
			return true;
		}
		const tagName = transformCaseFunc(currentNode.nodeName);
		_executeHooks(hooks.uponSanitizeElement, currentNode, {
			tagName,
			allowedTags: ALLOWED_TAGS
		});
		if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
			_forceRemove(currentNode);
			return true;
		}
		if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && tagName === "style" && _isNode(currentNode.firstElementChild)) {
			_forceRemove(currentNode);
			return true;
		}
		if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
			_forceRemove(currentNode);
			return true;
		}
		if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
			_forceRemove(currentNode);
			return true;
		}
		if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
			if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
				if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
				if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
			}
			if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
				const parentNode = getParentNode(currentNode) || currentNode.parentNode;
				const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
				if (childNodes && parentNode) {
					const childCount = childNodes.length;
					for (let i = childCount - 1; i >= 0; --i) {
						const childClone = cloneNode(childNodes[i], true);
						childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
						parentNode.insertBefore(childClone, getNextSibling(currentNode));
					}
				}
			}
			_forceRemove(currentNode);
			return true;
		}
		if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
			_forceRemove(currentNode);
			return true;
		}
		if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
			_forceRemove(currentNode);
			return true;
		}
		if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
			content = currentNode.textContent;
			arrayForEach([
				MUSTACHE_EXPR,
				ERB_EXPR,
				TMPLIT_EXPR
			], (expr) => {
				content = stringReplace(content, expr, " ");
			});
			if (currentNode.textContent !== content) {
				arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
				currentNode.textContent = content;
			}
		}
		_executeHooks(hooks.afterSanitizeElements, currentNode, null);
		return false;
	};
	/**
	* _isValidAttribute
	*
	* @param lcTag Lowercase tag name of containing element.
	* @param lcName Lowercase attribute name.
	* @param value Attribute value.
	* @return Returns true if `value` is valid, otherwise false.
	*/
	const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
		if (FORBID_ATTR[lcName]) return false;
		if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document || value in formElement)) return false;
		if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName));
		else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName));
		else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag));
		else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) if (_isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value)));
		else return false;
		else if (URI_SAFE_ATTRIBUTES[lcName]);
		else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, "")));
		else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]);
		else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, "")));
		else if (value) return false;
		return true;
	};
	/**
	* _isBasicCustomElement
	* checks if at least one dash is included in tagName, and it's not the first char
	* for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
	*
	* @param tagName name of the tag of the node to sanitize
	* @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
	*/
	const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
		return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT);
	};
	/**
	* _sanitizeAttributes
	*
	* @protect attributes
	* @protect nodeName
	* @protect removeAttribute
	* @protect setAttribute
	*
	* @param currentNode to sanitize
	*/
	const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
		_executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
		const { attributes } = currentNode;
		if (!attributes || _isClobbered(currentNode)) return;
		const hookEvent = {
			attrName: "",
			attrValue: "",
			keepAttr: true,
			allowedAttributes: ALLOWED_ATTR,
			forceKeepAttr: void 0
		};
		let l = attributes.length;
		while (l--) {
			const { name, namespaceURI, value: attrValue } = attributes[l];
			const lcName = transformCaseFunc(name);
			const initValue = attrValue;
			let value = name === "value" ? initValue : stringTrim(initValue);
			hookEvent.attrName = lcName;
			hookEvent.attrValue = value;
			hookEvent.keepAttr = true;
			hookEvent.forceKeepAttr = void 0;
			_executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
			value = hookEvent.attrValue;
			if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
				_removeAttribute(name, currentNode);
				value = SANITIZE_NAMED_PROPS_PREFIX + value;
			}
			if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (lcName === "attributename" && stringMatch(value, "href")) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (hookEvent.forceKeepAttr) continue;
			if (!hookEvent.keepAttr) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (SAFE_FOR_TEMPLATES) arrayForEach([
				MUSTACHE_EXPR,
				ERB_EXPR,
				TMPLIT_EXPR
			], (expr) => {
				value = stringReplace(value, expr, " ");
			});
			const lcTag = transformCaseFunc(currentNode.nodeName);
			if (!_isValidAttribute(lcTag, lcName, value)) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") if (namespaceURI);
			else switch (trustedTypes.getAttributeType(lcTag, lcName)) {
				case "TrustedHTML":
					value = trustedTypesPolicy.createHTML(value);
					break;
				case "TrustedScriptURL":
					value = trustedTypesPolicy.createScriptURL(value);
					break;
			}
			if (value !== initValue) try {
				if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
				else currentNode.setAttribute(name, value);
				if (_isClobbered(currentNode)) _forceRemove(currentNode);
				else arrayPop(DOMPurify.removed);
			} catch (_) {
				_removeAttribute(name, currentNode);
			}
		}
		_executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
	};
	/**
	* _sanitizeShadowDOM
	*
	* @param fragment to iterate over recursively
	*/
	const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
		let shadowNode = null;
		const shadowIterator = _createNodeIterator(fragment);
		_executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
		while (shadowNode = shadowIterator.nextNode()) {
			_executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
			_sanitizeElements(shadowNode);
			_sanitizeAttributes(shadowNode);
			if (shadowNode.content instanceof DocumentFragment) _sanitizeShadowDOM2(shadowNode.content);
		}
		_executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
	};
	DOMPurify.sanitize = function(dirty) {
		let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		let body = null;
		let importedNode = null;
		let currentNode = null;
		let returnNode = null;
		IS_EMPTY_INPUT = !dirty;
		if (IS_EMPTY_INPUT) dirty = "<!-->";
		if (typeof dirty !== "string" && !_isNode(dirty)) if (typeof dirty.toString === "function") {
			dirty = dirty.toString();
			if (typeof dirty !== "string") throw typeErrorCreate("dirty is not a string, aborting");
		} else throw typeErrorCreate("toString is not a function");
		if (!DOMPurify.isSupported) return dirty;
		if (!SET_CONFIG) _parseConfig(cfg);
		DOMPurify.removed = [];
		if (typeof dirty === "string") IN_PLACE = false;
		if (IN_PLACE) {
			if (dirty.nodeName) {
				const tagName = transformCaseFunc(dirty.nodeName);
				if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
			}
		} else if (dirty instanceof Node) {
			body = _initDocument("<!---->");
			importedNode = body.ownerDocument.importNode(dirty, true);
			if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") body = importedNode;
			else if (importedNode.nodeName === "HTML") body = importedNode;
			else body.appendChild(importedNode);
		} else {
			if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
			body = _initDocument(dirty);
			if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
		}
		if (body && FORCE_BODY) _forceRemove(body.firstChild);
		const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
		while (currentNode = nodeIterator.nextNode()) {
			_sanitizeElements(currentNode);
			_sanitizeAttributes(currentNode);
			if (currentNode.content instanceof DocumentFragment) _sanitizeShadowDOM2(currentNode.content);
		}
		if (IN_PLACE) return dirty;
		if (RETURN_DOM) {
			if (SAFE_FOR_TEMPLATES) {
				body.normalize();
				let html = body.innerHTML;
				arrayForEach([
					MUSTACHE_EXPR,
					ERB_EXPR,
					TMPLIT_EXPR
				], (expr) => {
					html = stringReplace(html, expr, " ");
				});
				body.innerHTML = html;
			}
			if (RETURN_DOM_FRAGMENT) {
				returnNode = createDocumentFragment.call(body.ownerDocument);
				while (body.firstChild) returnNode.appendChild(body.firstChild);
			} else returnNode = body;
			if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) returnNode = importNode.call(originalDocument, returnNode, true);
			return returnNode;
		}
		let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
		if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
		if (SAFE_FOR_TEMPLATES) arrayForEach([
			MUSTACHE_EXPR,
			ERB_EXPR,
			TMPLIT_EXPR
		], (expr) => {
			serializedHTML = stringReplace(serializedHTML, expr, " ");
		});
		return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
	};
	DOMPurify.setConfig = function() {
		_parseConfig(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {});
		SET_CONFIG = true;
	};
	DOMPurify.clearConfig = function() {
		CONFIG = null;
		SET_CONFIG = false;
	};
	DOMPurify.isValidAttribute = function(tag, attr, value) {
		if (!CONFIG) _parseConfig({});
		return _isValidAttribute(transformCaseFunc(tag), transformCaseFunc(attr), value);
	};
	DOMPurify.addHook = function(entryPoint, hookFunction) {
		if (typeof hookFunction !== "function") return;
		arrayPush(hooks[entryPoint], hookFunction);
	};
	DOMPurify.removeHook = function(entryPoint, hookFunction) {
		if (hookFunction !== void 0) {
			const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
			return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
		}
		return arrayPop(hooks[entryPoint]);
	};
	DOMPurify.removeHooks = function(entryPoint) {
		hooks[entryPoint] = [];
	};
	DOMPurify.removeAllHooks = function() {
		hooks = _createHooksMap();
	};
	return DOMPurify;
}
var purify = createDOMPurify();
//#endregion
//#region node_modules/@kurkle/color/dist/color.esm.js
/*!
* @kurkle/color v0.3.4
* https://github.com/kurkle/color#readme
* (c) 2024 Jukka Kurkela
* Released under the MIT License
*/
function round(v) {
	return v + .5 | 0;
}
var lim = (v, l, h) => Math.max(Math.min(v, h), l);
function p2b(v) {
	return lim(round(v * 2.55), 0, 255);
}
function n2b(v) {
	return lim(round(v * 255), 0, 255);
}
function b2n(v) {
	return lim(round(v / 2.55) / 100, 0, 1);
}
function n2p(v) {
	return lim(round(v * 100), 0, 100);
}
var map$1 = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	A: 10,
	B: 11,
	C: 12,
	D: 13,
	E: 14,
	F: 15,
	a: 10,
	b: 11,
	c: 12,
	d: 13,
	e: 14,
	f: 15
};
var hex = [..."0123456789ABCDEF"];
var h1 = (b) => hex[b & 15];
var h2 = (b) => hex[(b & 240) >> 4] + hex[b & 15];
var eq = (b) => (b & 240) >> 4 === (b & 15);
var isShort = (v) => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
function hexParse(str) {
	var len = str.length;
	var ret;
	if (str[0] === "#") {
		if (len === 4 || len === 5) ret = {
			r: 255 & map$1[str[1]] * 17,
			g: 255 & map$1[str[2]] * 17,
			b: 255 & map$1[str[3]] * 17,
			a: len === 5 ? map$1[str[4]] * 17 : 255
		};
		else if (len === 7 || len === 9) ret = {
			r: map$1[str[1]] << 4 | map$1[str[2]],
			g: map$1[str[3]] << 4 | map$1[str[4]],
			b: map$1[str[5]] << 4 | map$1[str[6]],
			a: len === 9 ? map$1[str[7]] << 4 | map$1[str[8]] : 255
		};
	}
	return ret;
}
var alpha = (a, f) => a < 255 ? f(a) : "";
function hexString(v) {
	var f = isShort(v) ? h1 : h2;
	return v ? "#" + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f) : void 0;
}
var HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hsl2rgbn(h, s, l) {
	const a = s * Math.min(l, 1 - l);
	const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
	return [
		f(0),
		f(8),
		f(4)
	];
}
function hsv2rgbn(h, s, v) {
	const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
	return [
		f(5),
		f(3),
		f(1)
	];
}
function hwb2rgbn(h, w, b) {
	const rgb = hsl2rgbn(h, 1, .5);
	let i;
	if (w + b > 1) {
		i = 1 / (w + b);
		w *= i;
		b *= i;
	}
	for (i = 0; i < 3; i++) {
		rgb[i] *= 1 - w - b;
		rgb[i] += w;
	}
	return rgb;
}
function hueValue(r, g, b, d, max) {
	if (r === max) return (g - b) / d + (g < b ? 6 : 0);
	if (g === max) return (b - r) / d + 2;
	return (r - g) / d + 4;
}
function rgb2hsl(v) {
	const range = 255;
	const r = v.r / range;
	const g = v.g / range;
	const b = v.b / range;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	let h, s, d;
	if (max !== min) {
		d = max - min;
		s = l > .5 ? d / (2 - max - min) : d / (max + min);
		h = hueValue(r, g, b, d, max);
		h = h * 60 + .5;
	}
	return [
		h | 0,
		s || 0,
		l
	];
}
function calln(f, a, b, c) {
	return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
}
function hsl2rgb(h, s, l) {
	return calln(hsl2rgbn, h, s, l);
}
function hwb2rgb(h, w, b) {
	return calln(hwb2rgbn, h, w, b);
}
function hsv2rgb(h, s, v) {
	return calln(hsv2rgbn, h, s, v);
}
function hue(h) {
	return (h % 360 + 360) % 360;
}
function hueParse(str) {
	const m = HUE_RE.exec(str);
	let a = 255;
	let v;
	if (!m) return;
	if (m[5] !== v) a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
	const h = hue(+m[2]);
	const p1 = +m[3] / 100;
	const p2 = +m[4] / 100;
	if (m[1] === "hwb") v = hwb2rgb(h, p1, p2);
	else if (m[1] === "hsv") v = hsv2rgb(h, p1, p2);
	else v = hsl2rgb(h, p1, p2);
	return {
		r: v[0],
		g: v[1],
		b: v[2],
		a
	};
}
function rotate(v, deg) {
	var h = rgb2hsl(v);
	h[0] = hue(h[0] + deg);
	h = hsl2rgb(h);
	v.r = h[0];
	v.g = h[1];
	v.b = h[2];
}
function hslString(v) {
	if (!v) return;
	const a = rgb2hsl(v);
	const h = a[0];
	const s = n2p(a[1]);
	const l = n2p(a[2]);
	return v.a < 255 ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})` : `hsl(${h}, ${s}%, ${l}%)`;
}
var map$2 = {
	x: "dark",
	Z: "light",
	Y: "re",
	X: "blu",
	W: "gr",
	V: "medium",
	U: "slate",
	A: "ee",
	T: "ol",
	S: "or",
	B: "ra",
	C: "lateg",
	D: "ights",
	R: "in",
	Q: "turquois",
	E: "hi",
	P: "ro",
	O: "al",
	N: "le",
	M: "de",
	L: "yello",
	F: "en",
	K: "ch",
	G: "arks",
	H: "ea",
	I: "ightg",
	J: "wh"
};
var names$1 = {
	OiceXe: "f0f8ff",
	antiquewEte: "faebd7",
	aqua: "ffff",
	aquamarRe: "7fffd4",
	azuY: "f0ffff",
	beige: "f5f5dc",
	bisque: "ffe4c4",
	black: "0",
	blanKedOmond: "ffebcd",
	Xe: "ff",
	XeviTet: "8a2be2",
	bPwn: "a52a2a",
	burlywood: "deb887",
	caMtXe: "5f9ea0",
	KartYuse: "7fff00",
	KocTate: "d2691e",
	cSO: "ff7f50",
	cSnflowerXe: "6495ed",
	cSnsilk: "fff8dc",
	crimson: "dc143c",
	cyan: "ffff",
	xXe: "8b",
	xcyan: "8b8b",
	xgTMnPd: "b8860b",
	xWay: "a9a9a9",
	xgYF: "6400",
	xgYy: "a9a9a9",
	xkhaki: "bdb76b",
	xmagFta: "8b008b",
	xTivegYF: "556b2f",
	xSange: "ff8c00",
	xScEd: "9932cc",
	xYd: "8b0000",
	xsOmon: "e9967a",
	xsHgYF: "8fbc8f",
	xUXe: "483d8b",
	xUWay: "2f4f4f",
	xUgYy: "2f4f4f",
	xQe: "ced1",
	xviTet: "9400d3",
	dAppRk: "ff1493",
	dApskyXe: "bfff",
	dimWay: "696969",
	dimgYy: "696969",
	dodgerXe: "1e90ff",
	fiYbrick: "b22222",
	flSOwEte: "fffaf0",
	foYstWAn: "228b22",
	fuKsia: "ff00ff",
	gaRsbSo: "dcdcdc",
	ghostwEte: "f8f8ff",
	gTd: "ffd700",
	gTMnPd: "daa520",
	Way: "808080",
	gYF: "8000",
	gYFLw: "adff2f",
	gYy: "808080",
	honeyMw: "f0fff0",
	hotpRk: "ff69b4",
	RdianYd: "cd5c5c",
	Rdigo: "4b0082",
	ivSy: "fffff0",
	khaki: "f0e68c",
	lavFMr: "e6e6fa",
	lavFMrXsh: "fff0f5",
	lawngYF: "7cfc00",
	NmoncEffon: "fffacd",
	ZXe: "add8e6",
	ZcSO: "f08080",
	Zcyan: "e0ffff",
	ZgTMnPdLw: "fafad2",
	ZWay: "d3d3d3",
	ZgYF: "90ee90",
	ZgYy: "d3d3d3",
	ZpRk: "ffb6c1",
	ZsOmon: "ffa07a",
	ZsHgYF: "20b2aa",
	ZskyXe: "87cefa",
	ZUWay: "778899",
	ZUgYy: "778899",
	ZstAlXe: "b0c4de",
	ZLw: "ffffe0",
	lime: "ff00",
	limegYF: "32cd32",
	lRF: "faf0e6",
	magFta: "ff00ff",
	maPon: "800000",
	VaquamarRe: "66cdaa",
	VXe: "cd",
	VScEd: "ba55d3",
	VpurpN: "9370db",
	VsHgYF: "3cb371",
	VUXe: "7b68ee",
	VsprRggYF: "fa9a",
	VQe: "48d1cc",
	VviTetYd: "c71585",
	midnightXe: "191970",
	mRtcYam: "f5fffa",
	mistyPse: "ffe4e1",
	moccasR: "ffe4b5",
	navajowEte: "ffdead",
	navy: "80",
	Tdlace: "fdf5e6",
	Tive: "808000",
	TivedBb: "6b8e23",
	Sange: "ffa500",
	SangeYd: "ff4500",
	ScEd: "da70d6",
	pOegTMnPd: "eee8aa",
	pOegYF: "98fb98",
	pOeQe: "afeeee",
	pOeviTetYd: "db7093",
	papayawEp: "ffefd5",
	pHKpuff: "ffdab9",
	peru: "cd853f",
	pRk: "ffc0cb",
	plum: "dda0dd",
	powMrXe: "b0e0e6",
	purpN: "800080",
	YbeccapurpN: "663399",
	Yd: "ff0000",
	Psybrown: "bc8f8f",
	PyOXe: "4169e1",
	saddNbPwn: "8b4513",
	sOmon: "fa8072",
	sandybPwn: "f4a460",
	sHgYF: "2e8b57",
	sHshell: "fff5ee",
	siFna: "a0522d",
	silver: "c0c0c0",
	skyXe: "87ceeb",
	UXe: "6a5acd",
	UWay: "708090",
	UgYy: "708090",
	snow: "fffafa",
	sprRggYF: "ff7f",
	stAlXe: "4682b4",
	tan: "d2b48c",
	teO: "8080",
	tEstN: "d8bfd8",
	tomato: "ff6347",
	Qe: "40e0d0",
	viTet: "ee82ee",
	JHt: "f5deb3",
	wEte: "ffffff",
	wEtesmoke: "f5f5f5",
	Lw: "ffff00",
	LwgYF: "9acd32"
};
function unpack() {
	const unpacked = {};
	const keys = Object.keys(names$1);
	const tkeys = Object.keys(map$2);
	let i, j, k, ok, nk;
	for (i = 0; i < keys.length; i++) {
		ok = nk = keys[i];
		for (j = 0; j < tkeys.length; j++) {
			k = tkeys[j];
			nk = nk.replace(k, map$2[k]);
		}
		k = parseInt(names$1[ok], 16);
		unpacked[nk] = [
			k >> 16 & 255,
			k >> 8 & 255,
			k & 255
		];
	}
	return unpacked;
}
var names;
function nameParse(str) {
	if (!names) {
		names = unpack();
		names.transparent = [
			0,
			0,
			0,
			0
		];
	}
	const a = names[str.toLowerCase()];
	return a && {
		r: a[0],
		g: a[1],
		b: a[2],
		a: a.length === 4 ? a[3] : 255
	};
}
var RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function rgbParse(str) {
	const m = RGB_RE.exec(str);
	let a = 255;
	let r, g, b;
	if (!m) return;
	if (m[7] !== r) {
		const v = +m[7];
		a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
	}
	r = +m[1];
	g = +m[3];
	b = +m[5];
	r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
	g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
	b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
	return {
		r,
		g,
		b,
		a
	};
}
function rgbString(v) {
	return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
}
var to = (v) => v <= .0031308 ? v * 12.92 : Math.pow(v, 1 / 2.4) * 1.055 - .055;
var from = (v) => v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4);
function interpolate$1(rgb1, rgb2, t) {
	const r = from(b2n(rgb1.r));
	const g = from(b2n(rgb1.g));
	const b = from(b2n(rgb1.b));
	return {
		r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
		g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
		b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
		a: rgb1.a + t * (rgb2.a - rgb1.a)
	};
}
function modHSL(v, i, ratio) {
	if (v) {
		let tmp = rgb2hsl(v);
		tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
		tmp = hsl2rgb(tmp);
		v.r = tmp[0];
		v.g = tmp[1];
		v.b = tmp[2];
	}
}
function clone$1(v, proto) {
	return v ? Object.assign(proto || {}, v) : v;
}
function fromObject(input) {
	var v = {
		r: 0,
		g: 0,
		b: 0,
		a: 255
	};
	if (Array.isArray(input)) {
		if (input.length >= 3) {
			v = {
				r: input[0],
				g: input[1],
				b: input[2],
				a: 255
			};
			if (input.length > 3) v.a = n2b(input[3]);
		}
	} else {
		v = clone$1(input, {
			r: 0,
			g: 0,
			b: 0,
			a: 1
		});
		v.a = n2b(v.a);
	}
	return v;
}
function functionParse(str) {
	if (str.charAt(0) === "r") return rgbParse(str);
	return hueParse(str);
}
var Color = class Color {
	constructor(input) {
		if (input instanceof Color) return input;
		const type = typeof input;
		let v;
		if (type === "object") v = fromObject(input);
		else if (type === "string") v = hexParse(input) || nameParse(input) || functionParse(input);
		this._rgb = v;
		this._valid = !!v;
	}
	get valid() {
		return this._valid;
	}
	get rgb() {
		var v = clone$1(this._rgb);
		if (v) v.a = b2n(v.a);
		return v;
	}
	set rgb(obj) {
		this._rgb = fromObject(obj);
	}
	rgbString() {
		return this._valid ? rgbString(this._rgb) : void 0;
	}
	hexString() {
		return this._valid ? hexString(this._rgb) : void 0;
	}
	hslString() {
		return this._valid ? hslString(this._rgb) : void 0;
	}
	mix(color, weight) {
		if (color) {
			const c1 = this.rgb;
			const c2 = color.rgb;
			let w2;
			const p = weight === w2 ? .5 : weight;
			const w = 2 * p - 1;
			const a = c1.a - c2.a;
			const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
			w2 = 1 - w1;
			c1.r = 255 & w1 * c1.r + w2 * c2.r + .5;
			c1.g = 255 & w1 * c1.g + w2 * c2.g + .5;
			c1.b = 255 & w1 * c1.b + w2 * c2.b + .5;
			c1.a = p * c1.a + (1 - p) * c2.a;
			this.rgb = c1;
		}
		return this;
	}
	interpolate(color, t) {
		if (color) this._rgb = interpolate$1(this._rgb, color._rgb, t);
		return this;
	}
	clone() {
		return new Color(this.rgb);
	}
	alpha(a) {
		this._rgb.a = n2b(a);
		return this;
	}
	clearer(ratio) {
		const rgb = this._rgb;
		rgb.a *= 1 - ratio;
		return this;
	}
	greyscale() {
		const rgb = this._rgb;
		rgb.r = rgb.g = rgb.b = round(rgb.r * .3 + rgb.g * .59 + rgb.b * .11);
		return this;
	}
	opaquer(ratio) {
		const rgb = this._rgb;
		rgb.a *= 1 + ratio;
		return this;
	}
	negate() {
		const v = this._rgb;
		v.r = 255 - v.r;
		v.g = 255 - v.g;
		v.b = 255 - v.b;
		return this;
	}
	lighten(ratio) {
		modHSL(this._rgb, 2, ratio);
		return this;
	}
	darken(ratio) {
		modHSL(this._rgb, 2, -ratio);
		return this;
	}
	saturate(ratio) {
		modHSL(this._rgb, 1, ratio);
		return this;
	}
	desaturate(ratio) {
		modHSL(this._rgb, 1, -ratio);
		return this;
	}
	rotate(deg) {
		rotate(this._rgb, deg);
		return this;
	}
};
//#endregion
//#region node_modules/chart.js/dist/chunks/helpers.dataset.js
/*!
* Chart.js v4.5.1
* https://www.chartjs.org
* (c) 2025 Chart.js Contributors
* Released under the MIT License
*/
/**
* @namespace Chart.helpers
*/ /**
* An empty function that can be used, for example, for optional callback.
*/ function noop() {}
/**
* Returns a unique id, sequentially generated from a global variable.
*/ var uid = (() => {
	let id = 0;
	return () => id++;
})();
/**
* Returns true if `value` is neither null nor undefined, else returns false.
* @param value - The value to test.
* @since 2.7.0
*/ function isNullOrUndef(value) {
	return value === null || value === void 0;
}
/**
* Returns true if `value` is an array (including typed arrays), else returns false.
* @param value - The value to test.
* @function
*/ function isArray(value) {
	if (Array.isArray && Array.isArray(value)) return true;
	const type = Object.prototype.toString.call(value);
	if (type.slice(0, 7) === "[object" && type.slice(-6) === "Array]") return true;
	return false;
}
/**
* Returns true if `value` is an object (excluding null), else returns false.
* @param value - The value to test.
* @since 2.7.0
*/ function isObject(value) {
	return value !== null && Object.prototype.toString.call(value) === "[object Object]";
}
/**
* Returns true if `value` is a finite number, else returns false
* @param value  - The value to test.
*/ function isNumberFinite(value) {
	return (typeof value === "number" || value instanceof Number) && isFinite(+value);
}
/**
* Returns `value` if finite, else returns `defaultValue`.
* @param value - The value to return if defined.
* @param defaultValue - The value to return if `value` is not finite.
*/ function finiteOrDefault(value, defaultValue) {
	return isNumberFinite(value) ? value : defaultValue;
}
/**
* Returns `value` if defined, else returns `defaultValue`.
* @param value - The value to return if defined.
* @param defaultValue - The value to return if `value` is undefined.
*/ function valueOrDefault(value, defaultValue) {
	return typeof value === "undefined" ? defaultValue : value;
}
var toPercentage = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 : +value / dimension;
var toDimension = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
/**
* Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
* value returned by `fn`. If `fn` is not a function, this method returns undefined.
* @param fn - The function to call.
* @param args - The arguments with which `fn` should be called.
* @param [thisArg] - The value of `this` provided for the call to `fn`.
*/ function callback(fn, args, thisArg) {
	if (fn && typeof fn.call === "function") return fn.apply(thisArg, args);
}
function each(loopable, fn, thisArg, reverse) {
	let i, len, keys;
	if (isArray(loopable)) {
		len = loopable.length;
		if (reverse) for (i = len - 1; i >= 0; i--) fn.call(thisArg, loopable[i], i);
		else for (i = 0; i < len; i++) fn.call(thisArg, loopable[i], i);
	} else if (isObject(loopable)) {
		keys = Object.keys(loopable);
		len = keys.length;
		for (i = 0; i < len; i++) fn.call(thisArg, loopable[keys[i]], keys[i]);
	}
}
/**
* Returns true if the `a0` and `a1` arrays have the same content, else returns false.
* @param a0 - The array to compare
* @param a1 - The array to compare
* @private
*/ function _elementsEqual(a0, a1) {
	let i, ilen, v0, v1;
	if (!a0 || !a1 || a0.length !== a1.length) return false;
	for (i = 0, ilen = a0.length; i < ilen; ++i) {
		v0 = a0[i];
		v1 = a1[i];
		if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) return false;
	}
	return true;
}
/**
* Returns a deep copy of `source` without keeping references on objects and arrays.
* @param source - The value to clone.
*/ function clone(source) {
	if (isArray(source)) return source.map(clone);
	if (isObject(source)) {
		const target = Object.create(null);
		const keys = Object.keys(source);
		const klen = keys.length;
		let k = 0;
		for (; k < klen; ++k) target[keys[k]] = clone(source[keys[k]]);
		return target;
	}
	return source;
}
function isValidKey(key) {
	return [
		"__proto__",
		"prototype",
		"constructor"
	].indexOf(key) === -1;
}
/**
* The default merger when Chart.helpers.merge is called without merger option.
* Note(SB): also used by mergeConfig and mergeScaleConfig as fallback.
* @private
*/ function _merger(key, target, source, options) {
	if (!isValidKey(key)) return;
	const tval = target[key];
	const sval = source[key];
	if (isObject(tval) && isObject(sval)) merge(tval, sval, options);
	else target[key] = clone(sval);
}
function merge(target, source, options) {
	const sources = isArray(source) ? source : [source];
	const ilen = sources.length;
	if (!isObject(target)) return target;
	options = options || {};
	const merger = options.merger || _merger;
	let current;
	for (let i = 0; i < ilen; ++i) {
		current = sources[i];
		if (!isObject(current)) continue;
		const keys = Object.keys(current);
		for (let k = 0, klen = keys.length; k < klen; ++k) merger(keys[k], target, current, options);
	}
	return target;
}
function mergeIf(target, source) {
	return merge(target, source, { merger: _mergerIf });
}
/**
* Merges source[key] in target[key] only if target[key] is undefined.
* @private
*/ function _mergerIf(key, target, source) {
	if (!isValidKey(key)) return;
	const tval = target[key];
	const sval = source[key];
	if (isObject(tval) && isObject(sval)) mergeIf(tval, sval);
	else if (!Object.prototype.hasOwnProperty.call(target, key)) target[key] = clone(sval);
}
var keyResolvers = {
	"": (v) => v,
	x: (o) => o.x,
	y: (o) => o.y
};
/**
* @private
*/ function _splitKey(key) {
	const parts = key.split(".");
	const keys = [];
	let tmp = "";
	for (const part of parts) {
		tmp += part;
		if (tmp.endsWith("\\")) tmp = tmp.slice(0, -1) + ".";
		else {
			keys.push(tmp);
			tmp = "";
		}
	}
	return keys;
}
function _getKeyResolver(key) {
	const keys = _splitKey(key);
	return (obj) => {
		for (const k of keys) {
			if (k === "") break;
			obj = obj && obj[k];
		}
		return obj;
	};
}
function resolveObjectKey(obj, key) {
	return (keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key)))(obj);
}
/**
* @private
*/ function _capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
var defined = (value) => typeof value !== "undefined";
var isFunction = (value) => typeof value === "function";
var setsEqual = (a, b) => {
	if (a.size !== b.size) return false;
	for (const item of a) if (!b.has(item)) return false;
	return true;
};
/**
* @param e - The event
* @private
*/ function _isClickEvent(e) {
	return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
/**
* @alias Chart.helpers.math
* @namespace
*/ var PI = Math.PI;
var TAU = 2 * PI;
var PITAU = TAU + PI;
var INFINITY = Number.POSITIVE_INFINITY;
var RAD_PER_DEG = PI / 180;
var HALF_PI = PI / 2;
var QUARTER_PI = PI / 4;
var TWO_THIRDS_PI = PI * 2 / 3;
var log10 = Math.log10;
var sign = Math.sign;
function almostEquals(x, y, epsilon) {
	return Math.abs(x - y) < epsilon;
}
/**
* Implementation of the nice number algorithm used in determining where axis labels will go
*/ function niceNum(range) {
	const roundedRange = Math.round(range);
	range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
	const niceRange = Math.pow(10, Math.floor(log10(range)));
	const fraction = range / niceRange;
	return (fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10) * niceRange;
}
/**
* Returns an array of factors sorted from 1 to sqrt(value)
* @private
*/ function _factorize(value) {
	const result = [];
	const sqrt = Math.sqrt(value);
	let i;
	for (i = 1; i < sqrt; i++) if (value % i === 0) {
		result.push(i);
		result.push(value / i);
	}
	if (sqrt === (sqrt | 0)) result.push(sqrt);
	result.sort((a, b) => a - b).pop();
	return result;
}
/**
* Verifies that attempting to coerce n to string or number won't throw a TypeError.
*/ function isNonPrimitive(n) {
	return typeof n === "symbol" || typeof n === "object" && n !== null && !(Symbol.toPrimitive in n || "toString" in n || "valueOf" in n);
}
function isNumber(n) {
	return !isNonPrimitive(n) && !isNaN(parseFloat(n)) && isFinite(n);
}
function almostWhole(x, epsilon) {
	const rounded = Math.round(x);
	return rounded - epsilon <= x && rounded + epsilon >= x;
}
/**
* @private
*/ function _setMinAndMaxByKey(array, target, property) {
	let i, ilen, value;
	for (i = 0, ilen = array.length; i < ilen; i++) {
		value = array[i][property];
		if (!isNaN(value)) {
			target.min = Math.min(target.min, value);
			target.max = Math.max(target.max, value);
		}
	}
}
function toRadians(degrees) {
	return degrees * (PI / 180);
}
function toDegrees(radians) {
	return radians * (180 / PI);
}
/**
* Returns the number of decimal places
* i.e. the number of digits after the decimal point, of the value of this Number.
* @param x - A number.
* @returns The number of decimal places.
* @private
*/ function _decimalPlaces(x) {
	if (!isNumberFinite(x)) return;
	let e = 1;
	let p = 0;
	while (Math.round(x * e) / e !== x) {
		e *= 10;
		p++;
	}
	return p;
}
function getAngleFromPoint(centrePoint, anglePoint) {
	const distanceFromXCenter = anglePoint.x - centrePoint.x;
	const distanceFromYCenter = anglePoint.y - centrePoint.y;
	const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
	let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
	if (angle < -.5 * PI) angle += TAU;
	return {
		angle,
		distance: radialDistanceFromCenter
	};
}
function distanceBetweenPoints(pt1, pt2) {
	return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
/**
* Shortest distance between angles, in either direction.
* @private
*/ function _angleDiff(a, b) {
	return (a - b + PITAU) % TAU - PI;
}
/**
* Normalize angle to be between 0 and 2*PI
* @private
*/ function _normalizeAngle(a) {
	return (a % TAU + TAU) % TAU;
}
/**
* @private
*/ function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
	const a = _normalizeAngle(angle);
	const s = _normalizeAngle(start);
	const e = _normalizeAngle(end);
	const angleToStart = _normalizeAngle(s - a);
	const angleToEnd = _normalizeAngle(e - a);
	const startToAngle = _normalizeAngle(a - s);
	const endToAngle = _normalizeAngle(a - e);
	return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
}
/**
* Limit `value` between `min` and `max`
* @param value
* @param min
* @param max
* @private
*/ function _limitValue(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
/**
* @param {number} value
* @private
*/ function _int16Range(value) {
	return _limitValue(value, -32768, 32767);
}
/**
* @param value
* @param start
* @param end
* @param [epsilon]
* @private
*/ function _isBetween(value, start, end, epsilon = 1e-6) {
	return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
}
function _lookup(table, value, cmp) {
	cmp = cmp || ((index) => table[index] < value);
	let hi = table.length - 1;
	let lo = 0;
	let mid;
	while (hi - lo > 1) {
		mid = lo + hi >> 1;
		if (cmp(mid)) lo = mid;
		else hi = mid;
	}
	return {
		lo,
		hi
	};
}
/**
* Binary search
* @param table - the table search. must be sorted!
* @param key - property name for the value in each entry
* @param value - value to find
* @param last - lookup last index
* @private
*/ var _lookupByKey = (table, key, value, last) => _lookup(table, value, last ? (index) => {
	const ti = table[index][key];
	return ti < value || ti === value && table[index + 1][key] === value;
} : (index) => table[index][key] < value);
/**
* Reverse binary search
* @param table - the table search. must be sorted!
* @param key - property name for the value in each entry
* @param value - value to find
* @private
*/ var _rlookupByKey = (table, key, value) => _lookup(table, value, (index) => table[index][key] >= value);
/**
* Return subset of `values` between `min` and `max` inclusive.
* Values are assumed to be in sorted order.
* @param values - sorted array of values
* @param min - min value
* @param max - max value
*/ function _filterBetween(values, min, max) {
	let start = 0;
	let end = values.length;
	while (start < end && values[start] < min) start++;
	while (end > start && values[end - 1] > max) end--;
	return start > 0 || end < values.length ? values.slice(start, end) : values;
}
var arrayEvents = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift"
];
function listenArrayEvents(array, listener) {
	if (array._chartjs) {
		array._chartjs.listeners.push(listener);
		return;
	}
	Object.defineProperty(array, "_chartjs", {
		configurable: true,
		enumerable: false,
		value: { listeners: [listener] }
	});
	arrayEvents.forEach((key) => {
		const method = "_onData" + _capitalize(key);
		const base = array[key];
		Object.defineProperty(array, key, {
			configurable: true,
			enumerable: false,
			value(...args) {
				const res = base.apply(this, args);
				array._chartjs.listeners.forEach((object) => {
					if (typeof object[method] === "function") object[method](...args);
				});
				return res;
			}
		});
	});
}
function unlistenArrayEvents(array, listener) {
	const stub = array._chartjs;
	if (!stub) return;
	const listeners = stub.listeners;
	const index = listeners.indexOf(listener);
	if (index !== -1) listeners.splice(index, 1);
	if (listeners.length > 0) return;
	arrayEvents.forEach((key) => {
		delete array[key];
	});
	delete array._chartjs;
}
/**
* @param items
*/ function _arrayUnique(items) {
	const set = new Set(items);
	if (set.size === items.length) return items;
	return Array.from(set);
}
/**
* Request animation polyfill
*/ var requestAnimFrame = function() {
	if (typeof window === "undefined") return function(callback) {
		return callback();
	};
	return window.requestAnimationFrame;
}();
/**
* Throttles calling `fn` once per animation frame
* Latest arguments are used on the actual call
*/ function throttled(fn, thisArg) {
	let argsToUse = [];
	let ticking = false;
	return function(...args) {
		argsToUse = args;
		if (!ticking) {
			ticking = true;
			requestAnimFrame.call(window, () => {
				ticking = false;
				fn.apply(thisArg, argsToUse);
			});
		}
	};
}
/**
* Debounces calling `fn` for `delay` ms
*/ function debounce(fn, delay) {
	let timeout;
	return function(...args) {
		if (delay) {
			clearTimeout(timeout);
			timeout = setTimeout(fn, delay, args);
		} else fn.apply(this, args);
		return delay;
	};
}
/**
* Converts 'start' to 'left', 'end' to 'right' and others to 'center'
* @private
*/ var _toLeftRightCenter = (align) => align === "start" ? "left" : align === "end" ? "right" : "center";
/**
* Returns `start`, `end` or `(start + end) / 2` depending on `align`. Defaults to `center`
* @private
*/ var _alignStartEnd = (align, start, end) => align === "start" ? start : align === "end" ? end : (start + end) / 2;
/**
* Returns `left`, `right` or `(left + right) / 2` depending on `align`. Defaults to `left`
* @private
*/ var _textX = (align, left, right, rtl) => {
	return align === (rtl ? "left" : "right") ? right : align === "center" ? (left + right) / 2 : left;
};
/**
* Return start and count of visible points.
* @private
*/ function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
	const pointCount = points.length;
	let start = 0;
	let count = pointCount;
	if (meta._sorted) {
		const { iScale, vScale, _parsed } = meta;
		const spanGaps = meta.dataset ? meta.dataset.options ? meta.dataset.options.spanGaps : null : null;
		const axis = iScale.axis;
		const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
		if (minDefined) {
			start = Math.min(_lookupByKey(_parsed, axis, min).lo, animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo);
			if (spanGaps) {
				const distanceToDefinedLo = _parsed.slice(0, start + 1).reverse().findIndex((point) => !isNullOrUndef(point[vScale.axis]));
				start -= Math.max(0, distanceToDefinedLo);
			}
			start = _limitValue(start, 0, pointCount - 1);
		}
		if (maxDefined) {
			let end = Math.max(_lookupByKey(_parsed, iScale.axis, max, true).hi + 1, animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1);
			if (spanGaps) {
				const distanceToDefinedHi = _parsed.slice(end - 1).findIndex((point) => !isNullOrUndef(point[vScale.axis]));
				end += Math.max(0, distanceToDefinedHi);
			}
			count = _limitValue(end, start, pointCount) - start;
		} else count = pointCount - start;
	}
	return {
		start,
		count
	};
}
/**
* Checks if the scale ranges have changed.
* @param {object} meta - dataset meta.
* @returns {boolean}
* @private
*/ function _scaleRangesChanged(meta) {
	const { xScale, yScale, _scaleRanges } = meta;
	const newRanges = {
		xmin: xScale.min,
		xmax: xScale.max,
		ymin: yScale.min,
		ymax: yScale.max
	};
	if (!_scaleRanges) {
		meta._scaleRanges = newRanges;
		return true;
	}
	const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
	Object.assign(_scaleRanges, newRanges);
	return changed;
}
var atEdge = (t) => t === 0 || t === 1;
var elasticIn = (t, s, p) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p));
var elasticOut = (t, s, p) => Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
/**
* Easing functions adapted from Robert Penner's easing equations.
* @namespace Chart.helpers.easing.effects
* @see http://www.robertpenner.com/easing/
*/ var effects = {
	linear: (t) => t,
	easeInQuad: (t) => t * t,
	easeOutQuad: (t) => -t * (t - 2),
	easeInOutQuad: (t) => (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1),
	easeInCubic: (t) => t * t * t,
	easeOutCubic: (t) => (t -= 1) * t * t + 1,
	easeInOutCubic: (t) => (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2),
	easeInQuart: (t) => t * t * t * t,
	easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
	easeInOutQuart: (t) => (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2),
	easeInQuint: (t) => t * t * t * t * t,
	easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
	easeInOutQuint: (t) => (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2),
	easeInSine: (t) => -Math.cos(t * HALF_PI) + 1,
	easeOutSine: (t) => Math.sin(t * HALF_PI),
	easeInOutSine: (t) => -.5 * (Math.cos(PI * t) - 1),
	easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
	easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
	easeInOutExpo: (t) => atEdge(t) ? t : t < .5 ? .5 * Math.pow(2, 10 * (t * 2 - 1)) : .5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
	easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
	easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
	easeInOutCirc: (t) => (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
	easeInElastic: (t) => atEdge(t) ? t : elasticIn(t, .075, .3),
	easeOutElastic: (t) => atEdge(t) ? t : elasticOut(t, .075, .3),
	easeInOutElastic(t) {
		const s = .1125;
		const p = .45;
		return atEdge(t) ? t : t < .5 ? .5 * elasticIn(t * 2, s, p) : .5 + .5 * elasticOut(t * 2 - 1, s, p);
	},
	easeInBack(t) {
		const s = 1.70158;
		return t * t * ((s + 1) * t - s);
	},
	easeOutBack(t) {
		const s = 1.70158;
		return (t -= 1) * t * ((s + 1) * t + s) + 1;
	},
	easeInOutBack(t) {
		let s = 1.70158;
		if ((t /= .5) < 1) return .5 * (t * t * (((s *= 1.525) + 1) * t - s));
		return .5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
	},
	easeInBounce: (t) => 1 - effects.easeOutBounce(1 - t),
	easeOutBounce(t) {
		const m = 7.5625;
		const d = 2.75;
		if (t < 1 / d) return m * t * t;
		if (t < 2 / d) return m * (t -= 1.5 / d) * t + .75;
		if (t < 2.5 / d) return m * (t -= 2.25 / d) * t + .9375;
		return m * (t -= 2.625 / d) * t + .984375;
	},
	easeInOutBounce: (t) => t < .5 ? effects.easeInBounce(t * 2) * .5 : effects.easeOutBounce(t * 2 - 1) * .5 + .5
};
function isPatternOrGradient(value) {
	if (value && typeof value === "object") {
		const type = value.toString();
		return type === "[object CanvasPattern]" || type === "[object CanvasGradient]";
	}
	return false;
}
function color(value) {
	return isPatternOrGradient(value) ? value : new Color(value);
}
function getHoverColor(value) {
	return isPatternOrGradient(value) ? value : new Color(value).saturate(.5).darken(.1).hexString();
}
var numbers = [
	"x",
	"y",
	"borderWidth",
	"radius",
	"tension"
];
var colors = [
	"color",
	"borderColor",
	"backgroundColor"
];
function applyAnimationsDefaults(defaults) {
	defaults.set("animation", {
		delay: void 0,
		duration: 1e3,
		easing: "easeOutQuart",
		fn: void 0,
		from: void 0,
		loop: void 0,
		to: void 0,
		type: void 0
	});
	defaults.describe("animation", {
		_fallback: false,
		_indexable: false,
		_scriptable: (name) => name !== "onProgress" && name !== "onComplete" && name !== "fn"
	});
	defaults.set("animations", {
		colors: {
			type: "color",
			properties: colors
		},
		numbers: {
			type: "number",
			properties: numbers
		}
	});
	defaults.describe("animations", { _fallback: "animation" });
	defaults.set("transitions", {
		active: { animation: { duration: 400 } },
		resize: { animation: { duration: 0 } },
		show: { animations: {
			colors: { from: "transparent" },
			visible: {
				type: "boolean",
				duration: 0
			}
		} },
		hide: { animations: {
			colors: { to: "transparent" },
			visible: {
				type: "boolean",
				easing: "linear",
				fn: (v) => v | 0
			}
		} }
	});
}
function applyLayoutsDefaults(defaults) {
	defaults.set("layout", {
		autoPadding: true,
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}
	});
}
var intlCache = /* @__PURE__ */ new Map();
function getNumberFormat(locale, options) {
	options = options || {};
	const cacheKey = locale + JSON.stringify(options);
	let formatter = intlCache.get(cacheKey);
	if (!formatter) {
		formatter = new Intl.NumberFormat(locale, options);
		intlCache.set(cacheKey, formatter);
	}
	return formatter;
}
function formatNumber(num, locale, options) {
	return getNumberFormat(locale, options).format(num);
}
var formatters = {
	values(value) {
		return isArray(value) ? value : "" + value;
	},
	numeric(tickValue, index, ticks) {
		if (tickValue === 0) return "0";
		const locale = this.chart.options.locale;
		let notation;
		let delta = tickValue;
		if (ticks.length > 1) {
			const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
			if (maxTick < 1e-4 || maxTick > 0x38d7ea4c68000) notation = "scientific";
			delta = calculateDelta(tickValue, ticks);
		}
		const logDelta = log10(Math.abs(delta));
		const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
		const options = {
			notation,
			minimumFractionDigits: numDecimal,
			maximumFractionDigits: numDecimal
		};
		Object.assign(options, this.options.ticks.format);
		return formatNumber(tickValue, locale, options);
	},
	logarithmic(tickValue, index, ticks) {
		if (tickValue === 0) return "0";
		const remain = ticks[index].significand || tickValue / Math.pow(10, Math.floor(log10(tickValue)));
		if ([
			1,
			2,
			3,
			5,
			10,
			15
		].includes(remain) || index > .8 * ticks.length) return formatters.numeric.call(this, tickValue, index, ticks);
		return "";
	}
};
function calculateDelta(tickValue, ticks) {
	let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
	if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) delta = tickValue - Math.floor(tickValue);
	return delta;
}
var Ticks = { formatters };
function applyScaleDefaults(defaults) {
	defaults.set("scale", {
		display: true,
		offset: false,
		reverse: false,
		beginAtZero: false,
		bounds: "ticks",
		clip: true,
		grace: 0,
		grid: {
			display: true,
			lineWidth: 1,
			drawOnChartArea: true,
			drawTicks: true,
			tickLength: 8,
			tickWidth: (_ctx, options) => options.lineWidth,
			tickColor: (_ctx, options) => options.color,
			offset: false
		},
		border: {
			display: true,
			dash: [],
			dashOffset: 0,
			width: 1
		},
		title: {
			display: false,
			text: "",
			padding: {
				top: 4,
				bottom: 4
			}
		},
		ticks: {
			minRotation: 0,
			maxRotation: 50,
			mirror: false,
			textStrokeWidth: 0,
			textStrokeColor: "",
			padding: 3,
			display: true,
			autoSkip: true,
			autoSkipPadding: 3,
			labelOffset: 0,
			callback: Ticks.formatters.values,
			minor: {},
			major: {},
			align: "center",
			crossAlign: "near",
			showLabelBackdrop: false,
			backdropColor: "rgba(255, 255, 255, 0.75)",
			backdropPadding: 2
		}
	});
	defaults.route("scale.ticks", "color", "", "color");
	defaults.route("scale.grid", "color", "", "borderColor");
	defaults.route("scale.border", "color", "", "borderColor");
	defaults.route("scale.title", "color", "", "color");
	defaults.describe("scale", {
		_fallback: false,
		_scriptable: (name) => !name.startsWith("before") && !name.startsWith("after") && name !== "callback" && name !== "parser",
		_indexable: (name) => name !== "borderDash" && name !== "tickBorderDash" && name !== "dash"
	});
	defaults.describe("scales", { _fallback: "scale" });
	defaults.describe("scale.ticks", {
		_scriptable: (name) => name !== "backdropPadding" && name !== "callback",
		_indexable: (name) => name !== "backdropPadding"
	});
}
var overrides = Object.create(null);
var descriptors = Object.create(null);
function getScope$1(node, key) {
	if (!key) return node;
	const keys = key.split(".");
	for (let i = 0, n = keys.length; i < n; ++i) {
		const k = keys[i];
		node = node[k] || (node[k] = Object.create(null));
	}
	return node;
}
function set(root, scope, values) {
	if (typeof scope === "string") return merge(getScope$1(root, scope), values);
	return merge(getScope$1(root, ""), scope);
}
var Defaults = class {
	constructor(_descriptors, _appliers) {
		this.animation = void 0;
		this.backgroundColor = "rgba(0,0,0,0.1)";
		this.borderColor = "rgba(0,0,0,0.1)";
		this.color = "#666";
		this.datasets = {};
		this.devicePixelRatio = (context) => context.chart.platform.getDevicePixelRatio();
		this.elements = {};
		this.events = [
			"mousemove",
			"mouseout",
			"click",
			"touchstart",
			"touchmove"
		];
		this.font = {
			family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
			size: 12,
			style: "normal",
			lineHeight: 1.2,
			weight: null
		};
		this.hover = {};
		this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
		this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
		this.hoverColor = (ctx, options) => getHoverColor(options.color);
		this.indexAxis = "x";
		this.interaction = {
			mode: "nearest",
			intersect: true,
			includeInvisible: false
		};
		this.maintainAspectRatio = true;
		this.onHover = null;
		this.onClick = null;
		this.parsing = true;
		this.plugins = {};
		this.responsive = true;
		this.scale = void 0;
		this.scales = {};
		this.showLine = true;
		this.drawActiveElementsOnTop = true;
		this.describe(_descriptors);
		this.apply(_appliers);
	}
	set(scope, values) {
		return set(this, scope, values);
	}
	get(scope) {
		return getScope$1(this, scope);
	}
	describe(scope, values) {
		return set(descriptors, scope, values);
	}
	override(scope, values) {
		return set(overrides, scope, values);
	}
	route(scope, name, targetScope, targetName) {
		const scopeObject = getScope$1(this, scope);
		const targetScopeObject = getScope$1(this, targetScope);
		const privateName = "_" + name;
		Object.defineProperties(scopeObject, {
			[privateName]: {
				value: scopeObject[name],
				writable: true
			},
			[name]: {
				enumerable: true,
				get() {
					const local = this[privateName];
					const target = targetScopeObject[targetName];
					if (isObject(local)) return Object.assign({}, target, local);
					return valueOrDefault(local, target);
				},
				set(value) {
					this[privateName] = value;
				}
			}
		});
	}
	apply(appliers) {
		appliers.forEach((apply) => apply(this));
	}
};
var defaults = /* @__PURE__ */ new Defaults({
	_scriptable: (name) => !name.startsWith("on"),
	_indexable: (name) => name !== "events",
	hover: { _fallback: "interaction" },
	interaction: {
		_scriptable: false,
		_indexable: false
	}
}, [
	applyAnimationsDefaults,
	applyLayoutsDefaults,
	applyScaleDefaults
]);
/**
* Converts the given font object into a CSS font string.
* @param font - A font object.
* @return The CSS font string. See https://developer.mozilla.org/en-US/docs/Web/CSS/font
* @private
*/ function toFontString(font) {
	if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) return null;
	return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
}
/**
* @private
*/ function _measureText(ctx, data, gc, longest, string) {
	let textWidth = data[string];
	if (!textWidth) {
		textWidth = data[string] = ctx.measureText(string).width;
		gc.push(string);
	}
	if (textWidth > longest) longest = textWidth;
	return longest;
}
/**
* @private
*/ function _longestText(ctx, font, arrayOfThings, cache) {
	cache = cache || {};
	let data = cache.data = cache.data || {};
	let gc = cache.garbageCollect = cache.garbageCollect || [];
	if (cache.font !== font) {
		data = cache.data = {};
		gc = cache.garbageCollect = [];
		cache.font = font;
	}
	ctx.save();
	ctx.font = font;
	let longest = 0;
	const ilen = arrayOfThings.length;
	let i, j, jlen, thing, nestedThing;
	for (i = 0; i < ilen; i++) {
		thing = arrayOfThings[i];
		if (thing !== void 0 && thing !== null && !isArray(thing)) longest = _measureText(ctx, data, gc, longest, thing);
		else if (isArray(thing)) for (j = 0, jlen = thing.length; j < jlen; j++) {
			nestedThing = thing[j];
			if (nestedThing !== void 0 && nestedThing !== null && !isArray(nestedThing)) longest = _measureText(ctx, data, gc, longest, nestedThing);
		}
	}
	ctx.restore();
	const gcLen = gc.length / 2;
	if (gcLen > arrayOfThings.length) {
		for (i = 0; i < gcLen; i++) delete data[gc[i]];
		gc.splice(0, gcLen);
	}
	return longest;
}
/**
* Returns the aligned pixel value to avoid anti-aliasing blur
* @param chart - The chart instance.
* @param pixel - A pixel value.
* @param width - The width of the element.
* @returns The aligned pixel value.
* @private
*/ function _alignPixel(chart, pixel, width) {
	const devicePixelRatio = chart.currentDevicePixelRatio;
	const halfWidth = width !== 0 ? Math.max(width / 2, .5) : 0;
	return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
/**
* Clears the entire canvas.
*/ function clearCanvas(canvas, ctx) {
	if (!ctx && !canvas) return;
	ctx = ctx || canvas.getContext("2d");
	ctx.save();
	ctx.resetTransform();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}
function drawPoint(ctx, options, x, y) {
	drawPointLegend(ctx, options, x, y, null);
}
function drawPointLegend(ctx, options, x, y, w) {
	let type, xOffset, yOffset, size, cornerRadius, width, xOffsetW, yOffsetW;
	const style = options.pointStyle;
	const rotation = options.rotation;
	const radius = options.radius;
	let rad = (rotation || 0) * RAD_PER_DEG;
	if (style && typeof style === "object") {
		type = style.toString();
		if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
			ctx.save();
			ctx.translate(x, y);
			ctx.rotate(rad);
			ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
			ctx.restore();
			return;
		}
	}
	if (isNaN(radius) || radius <= 0) return;
	ctx.beginPath();
	switch (style) {
		default:
			if (w) ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU);
			else ctx.arc(x, y, radius, 0, TAU);
			ctx.closePath();
			break;
		case "triangle":
			width = w ? w / 2 : radius;
			ctx.moveTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
			rad += TWO_THIRDS_PI;
			ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
			rad += TWO_THIRDS_PI;
			ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
			ctx.closePath();
			break;
		case "rectRounded":
			cornerRadius = radius * .516;
			size = radius - cornerRadius;
			xOffset = Math.cos(rad + QUARTER_PI) * size;
			xOffsetW = Math.cos(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
			yOffset = Math.sin(rad + QUARTER_PI) * size;
			yOffsetW = Math.sin(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
			ctx.arc(x - xOffsetW, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
			ctx.arc(x + yOffsetW, y - xOffset, cornerRadius, rad - HALF_PI, rad);
			ctx.arc(x + xOffsetW, y + yOffset, cornerRadius, rad, rad + HALF_PI);
			ctx.arc(x - yOffsetW, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
			ctx.closePath();
			break;
		case "rect":
			if (!rotation) {
				size = Math.SQRT1_2 * radius;
				width = w ? w / 2 : size;
				ctx.rect(x - width, y - size, 2 * width, 2 * size);
				break;
			}
			rad += QUARTER_PI;
		case "rectRot":
			xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
			xOffset = Math.cos(rad) * radius;
			yOffset = Math.sin(rad) * radius;
			yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
			ctx.moveTo(x - xOffsetW, y - yOffset);
			ctx.lineTo(x + yOffsetW, y - xOffset);
			ctx.lineTo(x + xOffsetW, y + yOffset);
			ctx.lineTo(x - yOffsetW, y + xOffset);
			ctx.closePath();
			break;
		case "crossRot": rad += QUARTER_PI;
		case "cross":
			xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
			xOffset = Math.cos(rad) * radius;
			yOffset = Math.sin(rad) * radius;
			yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
			ctx.moveTo(x - xOffsetW, y - yOffset);
			ctx.lineTo(x + xOffsetW, y + yOffset);
			ctx.moveTo(x + yOffsetW, y - xOffset);
			ctx.lineTo(x - yOffsetW, y + xOffset);
			break;
		case "star":
			xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
			xOffset = Math.cos(rad) * radius;
			yOffset = Math.sin(rad) * radius;
			yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
			ctx.moveTo(x - xOffsetW, y - yOffset);
			ctx.lineTo(x + xOffsetW, y + yOffset);
			ctx.moveTo(x + yOffsetW, y - xOffset);
			ctx.lineTo(x - yOffsetW, y + xOffset);
			rad += QUARTER_PI;
			xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
			xOffset = Math.cos(rad) * radius;
			yOffset = Math.sin(rad) * radius;
			yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
			ctx.moveTo(x - xOffsetW, y - yOffset);
			ctx.lineTo(x + xOffsetW, y + yOffset);
			ctx.moveTo(x + yOffsetW, y - xOffset);
			ctx.lineTo(x - yOffsetW, y + xOffset);
			break;
		case "line":
			xOffset = w ? w / 2 : Math.cos(rad) * radius;
			yOffset = Math.sin(rad) * radius;
			ctx.moveTo(x - xOffset, y - yOffset);
			ctx.lineTo(x + xOffset, y + yOffset);
			break;
		case "dash":
			ctx.moveTo(x, y);
			ctx.lineTo(x + Math.cos(rad) * (w ? w / 2 : radius), y + Math.sin(rad) * radius);
			break;
		case false:
			ctx.closePath();
			break;
	}
	ctx.fill();
	if (options.borderWidth > 0) ctx.stroke();
}
/**
* Returns true if the point is inside the rectangle
* @param point - The point to test
* @param area - The rectangle
* @param margin - allowed margin
* @private
*/ function _isPointInArea(point, area, margin) {
	margin = margin || .5;
	return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
}
function clipArea(ctx, area) {
	ctx.save();
	ctx.beginPath();
	ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
	ctx.clip();
}
function unclipArea(ctx) {
	ctx.restore();
}
/**
* @private
*/ function _steppedLineTo(ctx, previous, target, flip, mode) {
	if (!previous) return ctx.lineTo(target.x, target.y);
	if (mode === "middle") {
		const midpoint = (previous.x + target.x) / 2;
		ctx.lineTo(midpoint, previous.y);
		ctx.lineTo(midpoint, target.y);
	} else if (mode === "after" !== !!flip) ctx.lineTo(previous.x, target.y);
	else ctx.lineTo(target.x, previous.y);
	ctx.lineTo(target.x, target.y);
}
/**
* @private
*/ function _bezierCurveTo(ctx, previous, target, flip) {
	if (!previous) return ctx.lineTo(target.x, target.y);
	ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
}
function setRenderOpts(ctx, opts) {
	if (opts.translation) ctx.translate(opts.translation[0], opts.translation[1]);
	if (!isNullOrUndef(opts.rotation)) ctx.rotate(opts.rotation);
	if (opts.color) ctx.fillStyle = opts.color;
	if (opts.textAlign) ctx.textAlign = opts.textAlign;
	if (opts.textBaseline) ctx.textBaseline = opts.textBaseline;
}
function decorateText(ctx, x, y, line, opts) {
	if (opts.strikethrough || opts.underline) {
		/**
		* Now that IE11 support has been dropped, we can use more
		* of the TextMetrics object. The actual bounding boxes
		* are unflagged in Chrome, Firefox, Edge, and Safari so they
		* can be safely used.
		* See https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics#Browser_compatibility
		*/ const metrics = ctx.measureText(line);
		const left = x - metrics.actualBoundingBoxLeft;
		const right = x + metrics.actualBoundingBoxRight;
		const top = y - metrics.actualBoundingBoxAscent;
		const bottom = y + metrics.actualBoundingBoxDescent;
		const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
		ctx.strokeStyle = ctx.fillStyle;
		ctx.beginPath();
		ctx.lineWidth = opts.decorationWidth || 2;
		ctx.moveTo(left, yDecoration);
		ctx.lineTo(right, yDecoration);
		ctx.stroke();
	}
}
function drawBackdrop(ctx, opts) {
	const oldColor = ctx.fillStyle;
	ctx.fillStyle = opts.color;
	ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
	ctx.fillStyle = oldColor;
}
/**
* Render text onto the canvas
*/ function renderText(ctx, text, x, y, font, opts = {}) {
	const lines = isArray(text) ? text : [text];
	const stroke = opts.strokeWidth > 0 && opts.strokeColor !== "";
	let i, line;
	ctx.save();
	ctx.font = font.string;
	setRenderOpts(ctx, opts);
	for (i = 0; i < lines.length; ++i) {
		line = lines[i];
		if (opts.backdrop) drawBackdrop(ctx, opts.backdrop);
		if (stroke) {
			if (opts.strokeColor) ctx.strokeStyle = opts.strokeColor;
			if (!isNullOrUndef(opts.strokeWidth)) ctx.lineWidth = opts.strokeWidth;
			ctx.strokeText(line, x, y, opts.maxWidth);
		}
		ctx.fillText(line, x, y, opts.maxWidth);
		decorateText(ctx, x, y, line, opts);
		y += Number(font.lineHeight);
	}
	ctx.restore();
}
/**
* Add a path of a rectangle with rounded corners to the current sub-path
* @param ctx - Context
* @param rect - Bounding rect
*/ function addRoundedRectPath(ctx, rect) {
	const { x, y, w, h, radius } = rect;
	ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, 1.5 * PI, PI, true);
	ctx.lineTo(x, y + h - radius.bottomLeft);
	ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
	ctx.lineTo(x + w - radius.bottomRight, y + h);
	ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
	ctx.lineTo(x + w, y + radius.topRight);
	ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
	ctx.lineTo(x + radius.topLeft, y);
}
var LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
var FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
/**
* @alias Chart.helpers.options
* @namespace
*/ /**
* Converts the given line height `value` in pixels for a specific font `size`.
* @param value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
* @param size - The font size (in pixels) used to resolve relative `value`.
* @returns The effective line height in pixels (size * 1.2 if value is invalid).
* @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
* @since 2.7.0
*/ function toLineHeight(value, size) {
	const matches = ("" + value).match(LINE_HEIGHT);
	if (!matches || matches[1] === "normal") return size * 1.2;
	value = +matches[2];
	switch (matches[3]) {
		case "px": return value;
		case "%":
			value /= 100;
			break;
	}
	return size * value;
}
var numberOrZero = (v) => +v || 0;
function _readValueToProps(value, props) {
	const ret = {};
	const objProps = isObject(props);
	const keys = objProps ? Object.keys(props) : props;
	const read = isObject(value) ? objProps ? (prop) => valueOrDefault(value[prop], value[props[prop]]) : (prop) => value[prop] : () => value;
	for (const prop of keys) ret[prop] = numberOrZero(read(prop));
	return ret;
}
/**
* Converts the given value into a TRBL object.
* @param value - If a number, set the value to all TRBL component,
*  else, if an object, use defined properties and sets undefined ones to 0.
*  x / y are shorthands for same value for left/right and top/bottom.
* @returns The padding values (top, right, bottom, left)
* @since 3.0.0
*/ function toTRBL(value) {
	return _readValueToProps(value, {
		top: "y",
		right: "x",
		bottom: "y",
		left: "x"
	});
}
/**
* Converts the given value into a TRBL corners object (similar with css border-radius).
* @param value - If a number, set the value to all TRBL corner components,
*  else, if an object, use defined properties and sets undefined ones to 0.
* @returns The TRBL corner values (topLeft, topRight, bottomLeft, bottomRight)
* @since 3.0.0
*/ function toTRBLCorners(value) {
	return _readValueToProps(value, [
		"topLeft",
		"topRight",
		"bottomLeft",
		"bottomRight"
	]);
}
/**
* Converts the given value into a padding object with pre-computed width/height.
* @param value - If a number, set the value to all TRBL component,
*  else, if an object, use defined properties and sets undefined ones to 0.
*  x / y are shorthands for same value for left/right and top/bottom.
* @returns The padding values (top, right, bottom, left, width, height)
* @since 2.7.0
*/ function toPadding(value) {
	const obj = toTRBL(value);
	obj.width = obj.left + obj.right;
	obj.height = obj.top + obj.bottom;
	return obj;
}
/**
* Parses font options and returns the font object.
* @param options - A object that contains font options to be parsed.
* @param fallback - A object that contains fallback font options.
* @return The font object.
* @private
*/ function toFont(options, fallback) {
	options = options || {};
	fallback = fallback || defaults.font;
	let size = valueOrDefault(options.size, fallback.size);
	if (typeof size === "string") size = parseInt(size, 10);
	let style = valueOrDefault(options.style, fallback.style);
	if (style && !("" + style).match(FONT_STYLE)) {
		console.warn("Invalid font style specified: \"" + style + "\"");
		style = void 0;
	}
	const font = {
		family: valueOrDefault(options.family, fallback.family),
		lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
		size,
		style,
		weight: valueOrDefault(options.weight, fallback.weight),
		string: ""
	};
	font.string = toFontString(font);
	return font;
}
/**
* Evaluates the given `inputs` sequentially and returns the first defined value.
* @param inputs - An array of values, falling back to the last value.
* @param context - If defined and the current value is a function, the value
* is called with `context` as first argument and the result becomes the new input.
* @param index - If defined and the current value is an array, the value
* at `index` become the new input.
* @param info - object to return information about resolution in
* @param info.cacheable - Will be set to `false` if option is not cacheable.
* @since 2.7.0
*/ function resolve(inputs, context, index, info) {
	let cacheable = true;
	let i, ilen, value;
	for (i = 0, ilen = inputs.length; i < ilen; ++i) {
		value = inputs[i];
		if (value === void 0) continue;
		if (context !== void 0 && typeof value === "function") {
			value = value(context);
			cacheable = false;
		}
		if (index !== void 0 && isArray(value)) {
			value = value[index % value.length];
			cacheable = false;
		}
		if (value !== void 0) {
			if (info && !cacheable) info.cacheable = false;
			return value;
		}
	}
}
/**
* @param minmax
* @param grace
* @param beginAtZero
* @private
*/ function _addGrace(minmax, grace, beginAtZero) {
	const { min, max } = minmax;
	const change = toDimension(grace, (max - min) / 2);
	const keepZero = (value, add) => beginAtZero && value === 0 ? 0 : value + add;
	return {
		min: keepZero(min, -Math.abs(change)),
		max: keepZero(max, change)
	};
}
function createContext(parentContext, context) {
	return Object.assign(Object.create(parentContext), context);
}
/**
* Creates a Proxy for resolving raw values for options.
* @param scopes - The option scopes to look for values, in resolution order
* @param prefixes - The prefixes for values, in resolution order.
* @param rootScopes - The root option scopes
* @param fallback - Parent scopes fallback
* @param getTarget - callback for getting the target for changed values
* @returns Proxy
* @private
*/ function _createResolver(scopes, prefixes = [""], rootScopes, fallback, getTarget = () => scopes[0]) {
	const finalRootScopes = rootScopes || scopes;
	if (typeof fallback === "undefined") fallback = _resolve("_fallback", scopes);
	return new Proxy({
		[Symbol.toStringTag]: "Object",
		_cacheable: true,
		_scopes: scopes,
		_rootScopes: finalRootScopes,
		_fallback: fallback,
		_getTarget: getTarget,
		override: (scope) => _createResolver([scope, ...scopes], prefixes, finalRootScopes, fallback)
	}, {
		deleteProperty(target, prop) {
			delete target[prop];
			delete target._keys;
			delete scopes[0][prop];
			return true;
		},
		get(target, prop) {
			return _cached(target, prop, () => _resolveWithPrefixes(prop, prefixes, scopes, target));
		},
		getOwnPropertyDescriptor(target, prop) {
			return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
		},
		getPrototypeOf() {
			return Reflect.getPrototypeOf(scopes[0]);
		},
		has(target, prop) {
			return getKeysFromAllScopes(target).includes(prop);
		},
		ownKeys(target) {
			return getKeysFromAllScopes(target);
		},
		set(target, prop, value) {
			const storage = target._storage || (target._storage = getTarget());
			target[prop] = storage[prop] = value;
			delete target._keys;
			return true;
		}
	});
}
/**
* Returns an Proxy for resolving option values with context.
* @param proxy - The Proxy returned by `_createResolver`
* @param context - Context object for scriptable/indexable options
* @param subProxy - The proxy provided for scriptable options
* @param descriptorDefaults - Defaults for descriptors
* @private
*/ function _attachContext(proxy, context, subProxy, descriptorDefaults) {
	const cache = {
		_cacheable: false,
		_proxy: proxy,
		_context: context,
		_subProxy: subProxy,
		_stack: /* @__PURE__ */ new Set(),
		_descriptors: _descriptors(proxy, descriptorDefaults),
		setContext: (ctx) => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
		override: (scope) => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
	};
	return new Proxy(cache, {
		deleteProperty(target, prop) {
			delete target[prop];
			delete proxy[prop];
			return true;
		},
		get(target, prop, receiver) {
			return _cached(target, prop, () => _resolveWithContext(target, prop, receiver));
		},
		getOwnPropertyDescriptor(target, prop) {
			return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
				enumerable: true,
				configurable: true
			} : void 0 : Reflect.getOwnPropertyDescriptor(proxy, prop);
		},
		getPrototypeOf() {
			return Reflect.getPrototypeOf(proxy);
		},
		has(target, prop) {
			return Reflect.has(proxy, prop);
		},
		ownKeys() {
			return Reflect.ownKeys(proxy);
		},
		set(target, prop, value) {
			proxy[prop] = value;
			delete target[prop];
			return true;
		}
	});
}
/**
* @private
*/ function _descriptors(proxy, defaults = {
	scriptable: true,
	indexable: true
}) {
	const { _scriptable = defaults.scriptable, _indexable = defaults.indexable, _allKeys = defaults.allKeys } = proxy;
	return {
		allKeys: _allKeys,
		scriptable: _scriptable,
		indexable: _indexable,
		isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
		isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
	};
}
var readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
var needsSubResolver = (prop, value) => isObject(value) && prop !== "adapters" && (Object.getPrototypeOf(value) === null || value.constructor === Object);
function _cached(target, prop, resolve) {
	if (Object.prototype.hasOwnProperty.call(target, prop) || prop === "constructor") return target[prop];
	const value = resolve();
	target[prop] = value;
	return value;
}
function _resolveWithContext(target, prop, receiver) {
	const { _proxy, _context, _subProxy, _descriptors: descriptors } = target;
	let value = _proxy[prop];
	if (isFunction(value) && descriptors.isScriptable(prop)) value = _resolveScriptable(prop, value, target, receiver);
	if (isArray(value) && value.length) value = _resolveArray(prop, value, target, descriptors.isIndexable);
	if (needsSubResolver(prop, value)) value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors);
	return value;
}
function _resolveScriptable(prop, getValue, target, receiver) {
	const { _proxy, _context, _subProxy, _stack } = target;
	if (_stack.has(prop)) throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
	_stack.add(prop);
	let value = getValue(_context, _subProxy || receiver);
	_stack.delete(prop);
	if (needsSubResolver(prop, value)) value = createSubResolver(_proxy._scopes, _proxy, prop, value);
	return value;
}
function _resolveArray(prop, value, target, isIndexable) {
	const { _proxy, _context, _subProxy, _descriptors: descriptors } = target;
	if (typeof _context.index !== "undefined" && isIndexable(prop)) return value[_context.index % value.length];
	else if (isObject(value[0])) {
		const arr = value;
		const scopes = _proxy._scopes.filter((s) => s !== arr);
		value = [];
		for (const item of arr) {
			const resolver = createSubResolver(scopes, _proxy, prop, item);
			value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors));
		}
	}
	return value;
}
function resolveFallback(fallback, prop, value) {
	return isFunction(fallback) ? fallback(prop, value) : fallback;
}
var getScope = (key, parent) => key === true ? parent : typeof key === "string" ? resolveObjectKey(parent, key) : void 0;
function addScopes(set, parentScopes, key, parentFallback, value) {
	for (const parent of parentScopes) {
		const scope = getScope(key, parent);
		if (scope) {
			set.add(scope);
			const fallback = resolveFallback(scope._fallback, key, value);
			if (typeof fallback !== "undefined" && fallback !== key && fallback !== parentFallback) return fallback;
		} else if (scope === false && typeof parentFallback !== "undefined" && key !== parentFallback) return null;
	}
	return false;
}
function createSubResolver(parentScopes, resolver, prop, value) {
	const rootScopes = resolver._rootScopes;
	const fallback = resolveFallback(resolver._fallback, prop, value);
	const allScopes = [...parentScopes, ...rootScopes];
	const set = /* @__PURE__ */ new Set();
	set.add(value);
	let key = addScopesFromKey(set, allScopes, prop, fallback || prop, value);
	if (key === null) return false;
	if (typeof fallback !== "undefined" && fallback !== prop) {
		key = addScopesFromKey(set, allScopes, fallback, key, value);
		if (key === null) return false;
	}
	return _createResolver(Array.from(set), [""], rootScopes, fallback, () => subGetTarget(resolver, prop, value));
}
function addScopesFromKey(set, allScopes, key, fallback, item) {
	while (key) key = addScopes(set, allScopes, key, fallback, item);
	return key;
}
function subGetTarget(resolver, prop, value) {
	const parent = resolver._getTarget();
	if (!(prop in parent)) parent[prop] = {};
	const target = parent[prop];
	if (isArray(target) && isObject(value)) return value;
	return target || {};
}
function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
	let value;
	for (const prefix of prefixes) {
		value = _resolve(readKey(prefix, prop), scopes);
		if (typeof value !== "undefined") return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
	}
}
function _resolve(key, scopes) {
	for (const scope of scopes) {
		if (!scope) continue;
		const value = scope[key];
		if (typeof value !== "undefined") return value;
	}
}
function getKeysFromAllScopes(target) {
	let keys = target._keys;
	if (!keys) keys = target._keys = resolveKeysFromAllScopes(target._scopes);
	return keys;
}
function resolveKeysFromAllScopes(scopes) {
	const set = /* @__PURE__ */ new Set();
	for (const scope of scopes) for (const key of Object.keys(scope).filter((k) => !k.startsWith("_"))) set.add(key);
	return Array.from(set);
}
function _parseObjectDataRadialScale(meta, data, start, count) {
	const { iScale } = meta;
	const { key = "r" } = this._parsing;
	const parsed = new Array(count);
	let i, ilen, index, item;
	for (i = 0, ilen = count; i < ilen; ++i) {
		index = i + start;
		item = data[index];
		parsed[i] = { r: iScale.parse(resolveObjectKey(item, key), index) };
	}
	return parsed;
}
var EPSILON = Number.EPSILON || 1e-14;
var getPoint = (points, i) => i < points.length && !points[i].skip && points[i];
var getValueAxis = (indexAxis) => indexAxis === "x" ? "y" : "x";
function splineCurve(firstPoint, middlePoint, afterPoint, t) {
	const previous = firstPoint.skip ? middlePoint : firstPoint;
	const current = middlePoint;
	const next = afterPoint.skip ? middlePoint : afterPoint;
	const d01 = distanceBetweenPoints(current, previous);
	const d12 = distanceBetweenPoints(next, current);
	let s01 = d01 / (d01 + d12);
	let s12 = d12 / (d01 + d12);
	s01 = isNaN(s01) ? 0 : s01;
	s12 = isNaN(s12) ? 0 : s12;
	const fa = t * s01;
	const fb = t * s12;
	return {
		previous: {
			x: current.x - fa * (next.x - previous.x),
			y: current.y - fa * (next.y - previous.y)
		},
		next: {
			x: current.x + fb * (next.x - previous.x),
			y: current.y + fb * (next.y - previous.y)
		}
	};
}
/**
* Adjust tangents to ensure monotonic properties
*/ function monotoneAdjust(points, deltaK, mK) {
	const pointsLen = points.length;
	let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
	let pointAfter = getPoint(points, 0);
	for (let i = 0; i < pointsLen - 1; ++i) {
		pointCurrent = pointAfter;
		pointAfter = getPoint(points, i + 1);
		if (!pointCurrent || !pointAfter) continue;
		if (almostEquals(deltaK[i], 0, EPSILON)) {
			mK[i] = mK[i + 1] = 0;
			continue;
		}
		alphaK = mK[i] / deltaK[i];
		betaK = mK[i + 1] / deltaK[i];
		squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
		if (squaredMagnitude <= 9) continue;
		tauK = 3 / Math.sqrt(squaredMagnitude);
		mK[i] = alphaK * tauK * deltaK[i];
		mK[i + 1] = betaK * tauK * deltaK[i];
	}
}
function monotoneCompute(points, mK, indexAxis = "x") {
	const valueAxis = getValueAxis(indexAxis);
	const pointsLen = points.length;
	let delta, pointBefore, pointCurrent;
	let pointAfter = getPoint(points, 0);
	for (let i = 0; i < pointsLen; ++i) {
		pointBefore = pointCurrent;
		pointCurrent = pointAfter;
		pointAfter = getPoint(points, i + 1);
		if (!pointCurrent) continue;
		const iPixel = pointCurrent[indexAxis];
		const vPixel = pointCurrent[valueAxis];
		if (pointBefore) {
			delta = (iPixel - pointBefore[indexAxis]) / 3;
			pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
			pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
		}
		if (pointAfter) {
			delta = (pointAfter[indexAxis] - iPixel) / 3;
			pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
			pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
		}
	}
}
/**
* This function calculates Bézier control points in a similar way than |splineCurve|,
* but preserves monotonicity of the provided data and ensures no local extremums are added
* between the dataset discrete points due to the interpolation.
* See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation
*/ function splineCurveMonotone(points, indexAxis = "x") {
	const valueAxis = getValueAxis(indexAxis);
	const pointsLen = points.length;
	const deltaK = Array(pointsLen).fill(0);
	const mK = Array(pointsLen);
	let i, pointBefore, pointCurrent;
	let pointAfter = getPoint(points, 0);
	for (i = 0; i < pointsLen; ++i) {
		pointBefore = pointCurrent;
		pointCurrent = pointAfter;
		pointAfter = getPoint(points, i + 1);
		if (!pointCurrent) continue;
		if (pointAfter) {
			const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
			deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
		}
		mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
	}
	monotoneAdjust(points, deltaK, mK);
	monotoneCompute(points, mK, indexAxis);
}
function capControlPoint(pt, min, max) {
	return Math.max(Math.min(pt, max), min);
}
function capBezierPoints(points, area) {
	let i, ilen, point, inArea, inAreaPrev;
	let inAreaNext = _isPointInArea(points[0], area);
	for (i = 0, ilen = points.length; i < ilen; ++i) {
		inAreaPrev = inArea;
		inArea = inAreaNext;
		inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
		if (!inArea) continue;
		point = points[i];
		if (inAreaPrev) {
			point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
			point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
		}
		if (inAreaNext) {
			point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
			point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
		}
	}
}
/**
* @private
*/ function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
	let i, ilen, point, controlPoints;
	if (options.spanGaps) points = points.filter((pt) => !pt.skip);
	if (options.cubicInterpolationMode === "monotone") splineCurveMonotone(points, indexAxis);
	else {
		let prev = loop ? points[points.length - 1] : points[0];
		for (i = 0, ilen = points.length; i < ilen; ++i) {
			point = points[i];
			controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
			point.cp1x = controlPoints.previous.x;
			point.cp1y = controlPoints.previous.y;
			point.cp2x = controlPoints.next.x;
			point.cp2y = controlPoints.next.y;
			prev = point;
		}
	}
	if (options.capBezierPoints) capBezierPoints(points, area);
}
/**
* @private
*/ function _isDomSupported() {
	return typeof window !== "undefined" && typeof document !== "undefined";
}
/**
* @private
*/ function _getParentNode(domNode) {
	let parent = domNode.parentNode;
	if (parent && parent.toString() === "[object ShadowRoot]") parent = parent.host;
	return parent;
}
/**
* convert max-width/max-height values that may be percentages into a number
* @private
*/ function parseMaxStyle(styleValue, node, parentProperty) {
	let valueInPixels;
	if (typeof styleValue === "string") {
		valueInPixels = parseInt(styleValue, 10);
		if (styleValue.indexOf("%") !== -1) valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
	} else valueInPixels = styleValue;
	return valueInPixels;
}
var getComputedStyle = (element) => element.ownerDocument.defaultView.getComputedStyle(element, null);
function getStyle(el, property) {
	return getComputedStyle(el).getPropertyValue(property);
}
var positions = [
	"top",
	"right",
	"bottom",
	"left"
];
function getPositionedStyle(styles, style, suffix) {
	const result = {};
	suffix = suffix ? "-" + suffix : "";
	for (let i = 0; i < 4; i++) {
		const pos = positions[i];
		result[pos] = parseFloat(styles[style + "-" + pos + suffix]) || 0;
	}
	result.width = result.left + result.right;
	result.height = result.top + result.bottom;
	return result;
}
var useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);
/**
* @param e
* @param canvas
* @returns Canvas position
*/ function getCanvasPosition(e, canvas) {
	const touches = e.touches;
	const source = touches && touches.length ? touches[0] : e;
	const { offsetX, offsetY } = source;
	let box = false;
	let x, y;
	if (useOffsetPos(offsetX, offsetY, e.target)) {
		x = offsetX;
		y = offsetY;
	} else {
		const rect = canvas.getBoundingClientRect();
		x = source.clientX - rect.left;
		y = source.clientY - rect.top;
		box = true;
	}
	return {
		x,
		y,
		box
	};
}
/**
* Gets an event's x, y coordinates, relative to the chart area
* @param event
* @param chart
* @returns x and y coordinates of the event
*/ function getRelativePosition(event, chart) {
	if ("native" in event) return event;
	const { canvas, currentDevicePixelRatio } = chart;
	const style = getComputedStyle(canvas);
	const borderBox = style.boxSizing === "border-box";
	const paddings = getPositionedStyle(style, "padding");
	const borders = getPositionedStyle(style, "border", "width");
	const { x, y, box } = getCanvasPosition(event, canvas);
	const xOffset = paddings.left + (box && borders.left);
	const yOffset = paddings.top + (box && borders.top);
	let { width, height } = chart;
	if (borderBox) {
		width -= paddings.width + borders.width;
		height -= paddings.height + borders.height;
	}
	return {
		x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
		y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
	};
}
function getContainerSize(canvas, width, height) {
	let maxWidth, maxHeight;
	if (width === void 0 || height === void 0) {
		const container = canvas && _getParentNode(canvas);
		if (!container) {
			width = canvas.clientWidth;
			height = canvas.clientHeight;
		} else {
			const rect = container.getBoundingClientRect();
			const containerStyle = getComputedStyle(container);
			const containerBorder = getPositionedStyle(containerStyle, "border", "width");
			const containerPadding = getPositionedStyle(containerStyle, "padding");
			width = rect.width - containerPadding.width - containerBorder.width;
			height = rect.height - containerPadding.height - containerBorder.height;
			maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
			maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
		}
	}
	return {
		width,
		height,
		maxWidth: maxWidth || INFINITY,
		maxHeight: maxHeight || INFINITY
	};
}
var round1 = (v) => Math.round(v * 10) / 10;
function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
	const style = getComputedStyle(canvas);
	const margins = getPositionedStyle(style, "margin");
	const maxWidth = parseMaxStyle(style.maxWidth, canvas, "clientWidth") || INFINITY;
	const maxHeight = parseMaxStyle(style.maxHeight, canvas, "clientHeight") || INFINITY;
	const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
	let { width, height } = containerSize;
	if (style.boxSizing === "content-box") {
		const borders = getPositionedStyle(style, "border", "width");
		const paddings = getPositionedStyle(style, "padding");
		width -= paddings.width + borders.width;
		height -= paddings.height + borders.height;
	}
	width = Math.max(0, width - margins.width);
	height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
	width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
	height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
	if (width && !height) height = round1(width / 2);
	if ((bbWidth !== void 0 || bbHeight !== void 0) && aspectRatio && containerSize.height && height > containerSize.height) {
		height = containerSize.height;
		width = round1(Math.floor(height * aspectRatio));
	}
	return {
		width,
		height
	};
}
/**
* @param chart
* @param forceRatio
* @param forceStyle
* @returns True if the canvas context size or transformation has changed.
*/ function retinaScale(chart, forceRatio, forceStyle) {
	const pixelRatio = forceRatio || 1;
	const deviceHeight = round1(chart.height * pixelRatio);
	const deviceWidth = round1(chart.width * pixelRatio);
	chart.height = round1(chart.height);
	chart.width = round1(chart.width);
	const canvas = chart.canvas;
	if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
		canvas.style.height = `${chart.height}px`;
		canvas.style.width = `${chart.width}px`;
	}
	if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
		chart.currentDevicePixelRatio = pixelRatio;
		canvas.height = deviceHeight;
		canvas.width = deviceWidth;
		chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		return true;
	}
	return false;
}
/**
* Detects support for options object argument in addEventListener.
* https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
* @private
*/ var supportsEventListenerOptions = function() {
	let passiveSupported = false;
	try {
		const options = { get passive() {
			passiveSupported = true;
			return false;
		} };
		if (_isDomSupported()) {
			window.addEventListener("test", null, options);
			window.removeEventListener("test", null, options);
		}
	} catch (e) {}
	return passiveSupported;
}();
/**
* The "used" size is the final value of a dimension property after all calculations have
* been performed. This method uses the computed style of `element` but returns undefined
* if the computed style is not expressed in pixels. That can happen in some cases where
* `element` has a size relative to its parent and this last one is not yet displayed,
* for example because of `display: none` on a parent node.
* @see https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
* @returns Size in pixels or undefined if unknown.
*/ function readUsedSize(element, property) {
	const value = getStyle(element, property);
	const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
	return matches ? +matches[1] : void 0;
}
/**
* @private
*/ function _pointInLine(p1, p2, t, mode) {
	return {
		x: p1.x + t * (p2.x - p1.x),
		y: p1.y + t * (p2.y - p1.y)
	};
}
/**
* @private
*/ function _steppedInterpolation(p1, p2, t, mode) {
	return {
		x: p1.x + t * (p2.x - p1.x),
		y: mode === "middle" ? t < .5 ? p1.y : p2.y : mode === "after" ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
	};
}
/**
* @private
*/ function _bezierInterpolation(p1, p2, t, mode) {
	const cp1 = {
		x: p1.cp2x,
		y: p1.cp2y
	};
	const cp2 = {
		x: p2.cp1x,
		y: p2.cp1y
	};
	const a = _pointInLine(p1, cp1, t);
	const b = _pointInLine(cp1, cp2, t);
	const c = _pointInLine(cp2, p2, t);
	return _pointInLine(_pointInLine(a, b, t), _pointInLine(b, c, t), t);
}
var getRightToLeftAdapter = function(rectX, width) {
	return {
		x(x) {
			return rectX + rectX + width - x;
		},
		setWidth(w) {
			width = w;
		},
		textAlign(align) {
			if (align === "center") return align;
			return align === "right" ? "left" : "right";
		},
		xPlus(x, value) {
			return x - value;
		},
		leftForLtr(x, itemWidth) {
			return x - itemWidth;
		}
	};
};
var getLeftToRightAdapter = function() {
	return {
		x(x) {
			return x;
		},
		setWidth(w) {},
		textAlign(align) {
			return align;
		},
		xPlus(x, value) {
			return x + value;
		},
		leftForLtr(x, _itemWidth) {
			return x;
		}
	};
};
function getRtlAdapter(rtl, rectX, width) {
	return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
}
function overrideTextDirection(ctx, direction) {
	let style, original;
	if (direction === "ltr" || direction === "rtl") {
		style = ctx.canvas.style;
		original = [style.getPropertyValue("direction"), style.getPropertyPriority("direction")];
		style.setProperty("direction", direction, "important");
		ctx.prevTextDirection = original;
	}
}
function restoreTextDirection(ctx, original) {
	if (original !== void 0) {
		delete ctx.prevTextDirection;
		ctx.canvas.style.setProperty("direction", original[0], original[1]);
	}
}
function propertyFn(property) {
	if (property === "angle") return {
		between: _angleBetween,
		compare: _angleDiff,
		normalize: _normalizeAngle
	};
	return {
		between: _isBetween,
		compare: (a, b) => a - b,
		normalize: (x) => x
	};
}
function normalizeSegment({ start, end, count, loop, style }) {
	return {
		start: start % count,
		end: end % count,
		loop: loop && (end - start + 1) % count === 0,
		style
	};
}
function getSegment(segment, points, bounds) {
	const { property, start: startBound, end: endBound } = bounds;
	const { between, normalize } = propertyFn(property);
	const count = points.length;
	let { start, end, loop } = segment;
	let i, ilen;
	if (loop) {
		start += count;
		end += count;
		for (i = 0, ilen = count; i < ilen; ++i) {
			if (!between(normalize(points[start % count][property]), startBound, endBound)) break;
			start--;
			end--;
		}
		start %= count;
		end %= count;
	}
	if (end < start) end += count;
	return {
		start,
		end,
		loop,
		style: segment.style
	};
}
function _boundSegment(segment, points, bounds) {
	if (!bounds) return [segment];
	const { property, start: startBound, end: endBound } = bounds;
	const count = points.length;
	const { compare, between, normalize } = propertyFn(property);
	const { start, end, loop, style } = getSegment(segment, points, bounds);
	const result = [];
	let inside = false;
	let subStart = null;
	let value, point, prevValue;
	const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
	const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
	const shouldStart = () => inside || startIsBefore();
	const shouldStop = () => !inside || endIsBefore();
	for (let i = start, prev = start; i <= end; ++i) {
		point = points[i % count];
		if (point.skip) continue;
		value = normalize(point[property]);
		if (value === prevValue) continue;
		inside = between(value, startBound, endBound);
		if (subStart === null && shouldStart()) subStart = compare(value, startBound) === 0 ? i : prev;
		if (subStart !== null && shouldStop()) {
			result.push(normalizeSegment({
				start: subStart,
				end: i,
				loop,
				count,
				style
			}));
			subStart = null;
		}
		prev = i;
		prevValue = value;
	}
	if (subStart !== null) result.push(normalizeSegment({
		start: subStart,
		end,
		loop,
		count,
		style
	}));
	return result;
}
function _boundSegments(line, bounds) {
	const result = [];
	const segments = line.segments;
	for (let i = 0; i < segments.length; i++) {
		const sub = _boundSegment(segments[i], line.points, bounds);
		if (sub.length) result.push(...sub);
	}
	return result;
}
function findStartAndEnd(points, count, loop, spanGaps) {
	let start = 0;
	let end = count - 1;
	if (loop && !spanGaps) while (start < count && !points[start].skip) start++;
	while (start < count && points[start].skip) start++;
	start %= count;
	if (loop) end += start;
	while (end > start && points[end % count].skip) end--;
	end %= count;
	return {
		start,
		end
	};
}
function solidSegments(points, start, max, loop) {
	const count = points.length;
	const result = [];
	let last = start;
	let prev = points[start];
	let end;
	for (end = start + 1; end <= max; ++end) {
		const cur = points[end % count];
		if (cur.skip || cur.stop) {
			if (!prev.skip) {
				loop = false;
				result.push({
					start: start % count,
					end: (end - 1) % count,
					loop
				});
				start = last = cur.stop ? end : null;
			}
		} else {
			last = end;
			if (prev.skip) start = end;
		}
		prev = cur;
	}
	if (last !== null) result.push({
		start: start % count,
		end: last % count,
		loop
	});
	return result;
}
function _computeSegments(line, segmentOptions) {
	const points = line.points;
	const spanGaps = line.options.spanGaps;
	const count = points.length;
	if (!count) return [];
	const loop = !!line._loop;
	const { start, end } = findStartAndEnd(points, count, loop, spanGaps);
	if (spanGaps === true) return splitByStyles(line, [{
		start,
		end,
		loop
	}], points, segmentOptions);
	return splitByStyles(line, solidSegments(points, start, end < start ? end + count : end, !!line._fullLoop && start === 0 && end === count - 1), points, segmentOptions);
}
function splitByStyles(line, segments, points, segmentOptions) {
	if (!segmentOptions || !segmentOptions.setContext || !points) return segments;
	return doSplitByStyles(line, segments, points, segmentOptions);
}
function doSplitByStyles(line, segments, points, segmentOptions) {
	const chartContext = line._chart.getContext();
	const baseStyle = readStyle(line.options);
	const { _datasetIndex: datasetIndex, options: { spanGaps } } = line;
	const count = points.length;
	const result = [];
	let prevStyle = baseStyle;
	let start = segments[0].start;
	let i = start;
	function addStyle(s, e, l, st) {
		const dir = spanGaps ? -1 : 1;
		if (s === e) return;
		s += count;
		while (points[s % count].skip) s -= dir;
		while (points[e % count].skip) e += dir;
		if (s % count !== e % count) {
			result.push({
				start: s % count,
				end: e % count,
				loop: l,
				style: st
			});
			prevStyle = st;
			start = e % count;
		}
	}
	for (const segment of segments) {
		start = spanGaps ? start : segment.start;
		let prev = points[start % count];
		let style;
		for (i = start + 1; i <= segment.end; i++) {
			const pt = points[i % count];
			style = readStyle(segmentOptions.setContext(createContext(chartContext, {
				type: "segment",
				p0: prev,
				p1: pt,
				p0DataIndex: (i - 1) % count,
				p1DataIndex: i % count,
				datasetIndex
			})));
			if (styleChanged(style, prevStyle)) addStyle(start, i - 1, segment.loop, prevStyle);
			prev = pt;
			prevStyle = style;
		}
		if (start < i - 1) addStyle(start, i - 1, segment.loop, prevStyle);
	}
	return result;
}
function readStyle(options) {
	return {
		backgroundColor: options.backgroundColor,
		borderCapStyle: options.borderCapStyle,
		borderDash: options.borderDash,
		borderDashOffset: options.borderDashOffset,
		borderJoinStyle: options.borderJoinStyle,
		borderWidth: options.borderWidth,
		borderColor: options.borderColor
	};
}
function styleChanged(style, prevStyle) {
	if (!prevStyle) return false;
	const cache = [];
	const replacer = function(key, value) {
		if (!isPatternOrGradient(value)) return value;
		if (!cache.includes(value)) cache.push(value);
		return cache.indexOf(value);
	};
	return JSON.stringify(style, replacer) !== JSON.stringify(prevStyle, replacer);
}
function getSizeForArea(scale, chartArea, field) {
	return scale.options.clip ? scale[field] : chartArea[field];
}
function getDatasetArea(meta, chartArea) {
	const { xScale, yScale } = meta;
	if (xScale && yScale) return {
		left: getSizeForArea(xScale, chartArea, "left"),
		right: getSizeForArea(xScale, chartArea, "right"),
		top: getSizeForArea(yScale, chartArea, "top"),
		bottom: getSizeForArea(yScale, chartArea, "bottom")
	};
	return chartArea;
}
function getDatasetClipArea(chart, meta) {
	const clip = meta._clip;
	if (clip.disabled) return false;
	const area = getDatasetArea(meta, chart.chartArea);
	return {
		left: clip.left === false ? 0 : area.left - (clip.left === true ? 0 : clip.left),
		right: clip.right === false ? chart.width : area.right + (clip.right === true ? 0 : clip.right),
		top: clip.top === false ? 0 : area.top - (clip.top === true ? 0 : clip.top),
		bottom: clip.bottom === false ? chart.height : area.bottom + (clip.bottom === true ? 0 : clip.bottom)
	};
}
//#endregion
//#region node_modules/chart.js/dist/chart.js
/*!
* Chart.js v4.5.1
* https://www.chartjs.org
* (c) 2025 Chart.js Contributors
* Released under the MIT License
*/
var Animator = class {
	constructor() {
		this._request = null;
		this._charts = /* @__PURE__ */ new Map();
		this._running = false;
		this._lastDate = void 0;
	}
	_notify(chart, anims, date, type) {
		const callbacks = anims.listeners[type];
		const numSteps = anims.duration;
		callbacks.forEach((fn) => fn({
			chart,
			initial: anims.initial,
			numSteps,
			currentStep: Math.min(date - anims.start, numSteps)
		}));
	}
	_refresh() {
		if (this._request) return;
		this._running = true;
		this._request = requestAnimFrame.call(window, () => {
			this._update();
			this._request = null;
			if (this._running) this._refresh();
		});
	}
	_update(date = Date.now()) {
		let remaining = 0;
		this._charts.forEach((anims, chart) => {
			if (!anims.running || !anims.items.length) return;
			const items = anims.items;
			let i = items.length - 1;
			let draw = false;
			let item;
			for (; i >= 0; --i) {
				item = items[i];
				if (item._active) {
					if (item._total > anims.duration) anims.duration = item._total;
					item.tick(date);
					draw = true;
				} else {
					items[i] = items[items.length - 1];
					items.pop();
				}
			}
			if (draw) {
				chart.draw();
				this._notify(chart, anims, date, "progress");
			}
			if (!items.length) {
				anims.running = false;
				this._notify(chart, anims, date, "complete");
				anims.initial = false;
			}
			remaining += items.length;
		});
		this._lastDate = date;
		if (remaining === 0) this._running = false;
	}
	_getAnims(chart) {
		const charts = this._charts;
		let anims = charts.get(chart);
		if (!anims) {
			anims = {
				running: false,
				initial: true,
				items: [],
				listeners: {
					complete: [],
					progress: []
				}
			};
			charts.set(chart, anims);
		}
		return anims;
	}
	listen(chart, event, cb) {
		this._getAnims(chart).listeners[event].push(cb);
	}
	add(chart, items) {
		if (!items || !items.length) return;
		this._getAnims(chart).items.push(...items);
	}
	has(chart) {
		return this._getAnims(chart).items.length > 0;
	}
	start(chart) {
		const anims = this._charts.get(chart);
		if (!anims) return;
		anims.running = true;
		anims.start = Date.now();
		anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);
		this._refresh();
	}
	running(chart) {
		if (!this._running) return false;
		const anims = this._charts.get(chart);
		if (!anims || !anims.running || !anims.items.length) return false;
		return true;
	}
	stop(chart) {
		const anims = this._charts.get(chart);
		if (!anims || !anims.items.length) return;
		const items = anims.items;
		let i = items.length - 1;
		for (; i >= 0; --i) items[i].cancel();
		anims.items = [];
		this._notify(chart, anims, Date.now(), "complete");
	}
	remove(chart) {
		return this._charts.delete(chart);
	}
};
var animator = /* @__PURE__ */ new Animator();
var transparent = "transparent";
var interpolators = {
	boolean(from, to, factor) {
		return factor > .5 ? to : from;
	},
	color(from, to, factor) {
		const c0 = color(from || transparent);
		const c1 = c0.valid && color(to || transparent);
		return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
	},
	number(from, to, factor) {
		return from + (to - from) * factor;
	}
};
var Animation = class {
	constructor(cfg, target, prop, to) {
		const currentValue = target[prop];
		to = resolve([
			cfg.to,
			to,
			currentValue,
			cfg.from
		]);
		const from = resolve([
			cfg.from,
			currentValue,
			to
		]);
		this._active = true;
		this._fn = cfg.fn || interpolators[cfg.type || typeof from];
		this._easing = effects[cfg.easing] || effects.linear;
		this._start = Math.floor(Date.now() + (cfg.delay || 0));
		this._duration = this._total = Math.floor(cfg.duration);
		this._loop = !!cfg.loop;
		this._target = target;
		this._prop = prop;
		this._from = from;
		this._to = to;
		this._promises = void 0;
	}
	active() {
		return this._active;
	}
	update(cfg, to, date) {
		if (this._active) {
			this._notify(false);
			const currentValue = this._target[this._prop];
			const elapsed = date - this._start;
			const remain = this._duration - elapsed;
			this._start = date;
			this._duration = Math.floor(Math.max(remain, cfg.duration));
			this._total += elapsed;
			this._loop = !!cfg.loop;
			this._to = resolve([
				cfg.to,
				to,
				currentValue,
				cfg.from
			]);
			this._from = resolve([
				cfg.from,
				currentValue,
				to
			]);
		}
	}
	cancel() {
		if (this._active) {
			this.tick(Date.now());
			this._active = false;
			this._notify(false);
		}
	}
	tick(date) {
		const elapsed = date - this._start;
		const duration = this._duration;
		const prop = this._prop;
		const from = this._from;
		const loop = this._loop;
		const to = this._to;
		let factor;
		this._active = from !== to && (loop || elapsed < duration);
		if (!this._active) {
			this._target[prop] = to;
			this._notify(true);
			return;
		}
		if (elapsed < 0) {
			this._target[prop] = from;
			return;
		}
		factor = elapsed / duration % 2;
		factor = loop && factor > 1 ? 2 - factor : factor;
		factor = this._easing(Math.min(1, Math.max(0, factor)));
		this._target[prop] = this._fn(from, to, factor);
	}
	wait() {
		const promises = this._promises || (this._promises = []);
		return new Promise((res, rej) => {
			promises.push({
				res,
				rej
			});
		});
	}
	_notify(resolved) {
		const method = resolved ? "res" : "rej";
		const promises = this._promises || [];
		for (let i = 0; i < promises.length; i++) promises[i][method]();
	}
};
var Animations = class {
	constructor(chart, config) {
		this._chart = chart;
		this._properties = /* @__PURE__ */ new Map();
		this.configure(config);
	}
	configure(config) {
		if (!isObject(config)) return;
		const animationOptions = Object.keys(defaults.animation);
		const animatedProps = this._properties;
		Object.getOwnPropertyNames(config).forEach((key) => {
			const cfg = config[key];
			if (!isObject(cfg)) return;
			const resolved = {};
			for (const option of animationOptions) resolved[option] = cfg[option];
			(isArray(cfg.properties) && cfg.properties || [key]).forEach((prop) => {
				if (prop === key || !animatedProps.has(prop)) animatedProps.set(prop, resolved);
			});
		});
	}
	_animateOptions(target, values) {
		const newOptions = values.options;
		const options = resolveTargetOptions(target, newOptions);
		if (!options) return [];
		const animations = this._createAnimations(options, newOptions);
		if (newOptions.$shared) awaitAll(target.options.$animations, newOptions).then(() => {
			target.options = newOptions;
		}, () => {});
		return animations;
	}
	_createAnimations(target, values) {
		const animatedProps = this._properties;
		const animations = [];
		const running = target.$animations || (target.$animations = {});
		const props = Object.keys(values);
		const date = Date.now();
		let i;
		for (i = props.length - 1; i >= 0; --i) {
			const prop = props[i];
			if (prop.charAt(0) === "$") continue;
			if (prop === "options") {
				animations.push(...this._animateOptions(target, values));
				continue;
			}
			const value = values[prop];
			let animation = running[prop];
			const cfg = animatedProps.get(prop);
			if (animation) if (cfg && animation.active()) {
				animation.update(cfg, value, date);
				continue;
			} else animation.cancel();
			if (!cfg || !cfg.duration) {
				target[prop] = value;
				continue;
			}
			running[prop] = animation = new Animation(cfg, target, prop, value);
			animations.push(animation);
		}
		return animations;
	}
	update(target, values) {
		if (this._properties.size === 0) {
			Object.assign(target, values);
			return;
		}
		const animations = this._createAnimations(target, values);
		if (animations.length) {
			animator.add(this._chart, animations);
			return true;
		}
	}
};
function awaitAll(animations, properties) {
	const running = [];
	const keys = Object.keys(properties);
	for (let i = 0; i < keys.length; i++) {
		const anim = animations[keys[i]];
		if (anim && anim.active()) running.push(anim.wait());
	}
	return Promise.all(running);
}
function resolveTargetOptions(target, newOptions) {
	if (!newOptions) return;
	let options = target.options;
	if (!options) {
		target.options = newOptions;
		return;
	}
	if (options.$shared) target.options = options = Object.assign({}, options, {
		$shared: false,
		$animations: {}
	});
	return options;
}
function scaleClip(scale, allowedOverflow) {
	const opts = scale && scale.options || {};
	const reverse = opts.reverse;
	const min = opts.min === void 0 ? allowedOverflow : 0;
	const max = opts.max === void 0 ? allowedOverflow : 0;
	return {
		start: reverse ? max : min,
		end: reverse ? min : max
	};
}
function defaultClip(xScale, yScale, allowedOverflow) {
	if (allowedOverflow === false) return false;
	const x = scaleClip(xScale, allowedOverflow);
	const y = scaleClip(yScale, allowedOverflow);
	return {
		top: y.end,
		right: x.end,
		bottom: y.start,
		left: x.start
	};
}
function toClip(value) {
	let t, r, b, l;
	if (isObject(value)) {
		t = value.top;
		r = value.right;
		b = value.bottom;
		l = value.left;
	} else t = r = b = l = value;
	return {
		top: t,
		right: r,
		bottom: b,
		left: l,
		disabled: value === false
	};
}
function getSortedDatasetIndices(chart, filterVisible) {
	const keys = [];
	const metasets = chart._getSortedDatasetMetas(filterVisible);
	let i, ilen;
	for (i = 0, ilen = metasets.length; i < ilen; ++i) keys.push(metasets[i].index);
	return keys;
}
function applyStack(stack, value, dsIndex, options = {}) {
	const keys = stack.keys;
	const singleMode = options.mode === "single";
	let i, ilen, datasetIndex, otherValue;
	if (value === null) return;
	let found = false;
	for (i = 0, ilen = keys.length; i < ilen; ++i) {
		datasetIndex = +keys[i];
		if (datasetIndex === dsIndex) {
			found = true;
			if (options.all) continue;
			break;
		}
		otherValue = stack.values[datasetIndex];
		if (isNumberFinite(otherValue) && (singleMode || value === 0 || sign(value) === sign(otherValue))) value += otherValue;
	}
	if (!found && !options.all) return 0;
	return value;
}
function convertObjectDataToArray(data, meta) {
	const { iScale, vScale } = meta;
	const iAxisKey = iScale.axis === "x" ? "x" : "y";
	const vAxisKey = vScale.axis === "x" ? "x" : "y";
	const keys = Object.keys(data);
	const adata = new Array(keys.length);
	let i, ilen, key;
	for (i = 0, ilen = keys.length; i < ilen; ++i) {
		key = keys[i];
		adata[i] = {
			[iAxisKey]: key,
			[vAxisKey]: data[key]
		};
	}
	return adata;
}
function isStacked(scale, meta) {
	const stacked = scale && scale.options.stacked;
	return stacked || stacked === void 0 && meta.stack !== void 0;
}
function getStackKey(indexScale, valueScale, meta) {
	return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
}
function getUserBounds(scale) {
	const { min, max, minDefined, maxDefined } = scale.getUserBounds();
	return {
		min: minDefined ? min : Number.NEGATIVE_INFINITY,
		max: maxDefined ? max : Number.POSITIVE_INFINITY
	};
}
function getOrCreateStack(stacks, stackKey, indexValue) {
	const subStack = stacks[stackKey] || (stacks[stackKey] = {});
	return subStack[indexValue] || (subStack[indexValue] = {});
}
function getLastIndexInStack(stack, vScale, positive, type) {
	for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
		const value = stack[meta.index];
		if (positive && value > 0 || !positive && value < 0) return meta.index;
	}
	return null;
}
function updateStacks(controller, parsed) {
	const { chart, _cachedMeta: meta } = controller;
	const stacks = chart._stacks || (chart._stacks = {});
	const { iScale, vScale, index: datasetIndex } = meta;
	const iAxis = iScale.axis;
	const vAxis = vScale.axis;
	const key = getStackKey(iScale, vScale, meta);
	const ilen = parsed.length;
	let stack;
	for (let i = 0; i < ilen; ++i) {
		const item = parsed[i];
		const { [iAxis]: index, [vAxis]: value } = item;
		const itemStacks = item._stacks || (item._stacks = {});
		stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
		stack[datasetIndex] = value;
		stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
		stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
		const visualValues = stack._visualValues || (stack._visualValues = {});
		visualValues[datasetIndex] = value;
	}
}
function getFirstScaleId(chart, axis) {
	const scales = chart.scales;
	return Object.keys(scales).filter((key) => scales[key].axis === axis).shift();
}
function createDatasetContext(parent, index) {
	return createContext(parent, {
		active: false,
		dataset: void 0,
		datasetIndex: index,
		index,
		mode: "default",
		type: "dataset"
	});
}
function createDataContext(parent, index, element) {
	return createContext(parent, {
		active: false,
		dataIndex: index,
		parsed: void 0,
		raw: void 0,
		element,
		index,
		mode: "default",
		type: "data"
	});
}
function clearStacks(meta, items) {
	const datasetIndex = meta.controller.index;
	const axis = meta.vScale && meta.vScale.axis;
	if (!axis) return;
	items = items || meta._parsed;
	for (const parsed of items) {
		const stacks = parsed._stacks;
		if (!stacks || stacks[axis] === void 0 || stacks[axis][datasetIndex] === void 0) return;
		delete stacks[axis][datasetIndex];
		if (stacks[axis]._visualValues !== void 0 && stacks[axis]._visualValues[datasetIndex] !== void 0) delete stacks[axis]._visualValues[datasetIndex];
	}
}
var isDirectUpdateMode = (mode) => mode === "reset" || mode === "none";
var cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
var createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked && {
	keys: getSortedDatasetIndices(chart, true),
	values: null
};
var DatasetController = class {
	static defaults = {};
	static datasetElementType = null;
	static dataElementType = null;
	constructor(chart, datasetIndex) {
		this.chart = chart;
		this._ctx = chart.ctx;
		this.index = datasetIndex;
		this._cachedDataOpts = {};
		this._cachedMeta = this.getMeta();
		this._type = this._cachedMeta.type;
		this.options = void 0;
		this._parsing = false;
		this._data = void 0;
		this._objectData = void 0;
		this._sharedOptions = void 0;
		this._drawStart = void 0;
		this._drawCount = void 0;
		this.enableOptionSharing = false;
		this.supportsDecimation = false;
		this.$context = void 0;
		this._syncList = [];
		this.datasetElementType = new.target.datasetElementType;
		this.dataElementType = new.target.dataElementType;
		this.initialize();
	}
	initialize() {
		const meta = this._cachedMeta;
		this.configure();
		this.linkScales();
		meta._stacked = isStacked(meta.vScale, meta);
		this.addElements();
		if (this.options.fill && !this.chart.isPluginEnabled("filler")) console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
	}
	updateIndex(datasetIndex) {
		if (this.index !== datasetIndex) clearStacks(this._cachedMeta);
		this.index = datasetIndex;
	}
	linkScales() {
		const chart = this.chart;
		const meta = this._cachedMeta;
		const dataset = this.getDataset();
		const chooseId = (axis, x, y, r) => axis === "x" ? x : axis === "r" ? r : y;
		const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, "x"));
		const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, "y"));
		const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, "r"));
		const indexAxis = meta.indexAxis;
		const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
		const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
		meta.xScale = this.getScaleForId(xid);
		meta.yScale = this.getScaleForId(yid);
		meta.rScale = this.getScaleForId(rid);
		meta.iScale = this.getScaleForId(iid);
		meta.vScale = this.getScaleForId(vid);
	}
	getDataset() {
		return this.chart.data.datasets[this.index];
	}
	getMeta() {
		return this.chart.getDatasetMeta(this.index);
	}
	getScaleForId(scaleID) {
		return this.chart.scales[scaleID];
	}
	_getOtherScale(scale) {
		const meta = this._cachedMeta;
		return scale === meta.iScale ? meta.vScale : meta.iScale;
	}
	reset() {
		this._update("reset");
	}
	_destroy() {
		const meta = this._cachedMeta;
		if (this._data) unlistenArrayEvents(this._data, this);
		if (meta._stacked) clearStacks(meta);
	}
	_dataCheck() {
		const dataset = this.getDataset();
		const data = dataset.data || (dataset.data = []);
		const _data = this._data;
		if (isObject(data)) {
			const meta = this._cachedMeta;
			this._data = convertObjectDataToArray(data, meta);
		} else if (_data !== data) {
			if (_data) {
				unlistenArrayEvents(_data, this);
				const meta = this._cachedMeta;
				clearStacks(meta);
				meta._parsed = [];
			}
			if (data && Object.isExtensible(data)) listenArrayEvents(data, this);
			this._syncList = [];
			this._data = data;
		}
	}
	addElements() {
		const meta = this._cachedMeta;
		this._dataCheck();
		if (this.datasetElementType) meta.dataset = new this.datasetElementType();
	}
	buildOrUpdateElements(resetNewElements) {
		const meta = this._cachedMeta;
		const dataset = this.getDataset();
		let stackChanged = false;
		this._dataCheck();
		const oldStacked = meta._stacked;
		meta._stacked = isStacked(meta.vScale, meta);
		if (meta.stack !== dataset.stack) {
			stackChanged = true;
			clearStacks(meta);
			meta.stack = dataset.stack;
		}
		this._resyncElements(resetNewElements);
		if (stackChanged || oldStacked !== meta._stacked) {
			updateStacks(this, meta._parsed);
			meta._stacked = isStacked(meta.vScale, meta);
		}
	}
	configure() {
		const config = this.chart.config;
		const scopeKeys = config.datasetScopeKeys(this._type);
		const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
		this.options = config.createResolver(scopes, this.getContext());
		this._parsing = this.options.parsing;
		this._cachedDataOpts = {};
	}
	parse(start, count) {
		const { _cachedMeta: meta, _data: data } = this;
		const { iScale, _stacked } = meta;
		const iAxis = iScale.axis;
		let sorted = start === 0 && count === data.length ? true : meta._sorted;
		let prev = start > 0 && meta._parsed[start - 1];
		let i, cur, parsed;
		if (this._parsing === false) {
			meta._parsed = data;
			meta._sorted = true;
			parsed = data;
		} else {
			if (isArray(data[start])) parsed = this.parseArrayData(meta, data, start, count);
			else if (isObject(data[start])) parsed = this.parseObjectData(meta, data, start, count);
			else parsed = this.parsePrimitiveData(meta, data, start, count);
			const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
			for (i = 0; i < count; ++i) {
				meta._parsed[i + start] = cur = parsed[i];
				if (sorted) {
					if (isNotInOrderComparedToPrev()) sorted = false;
					prev = cur;
				}
			}
			meta._sorted = sorted;
		}
		if (_stacked) updateStacks(this, parsed);
	}
	parsePrimitiveData(meta, data, start, count) {
		const { iScale, vScale } = meta;
		const iAxis = iScale.axis;
		const vAxis = vScale.axis;
		const labels = iScale.getLabels();
		const singleScale = iScale === vScale;
		const parsed = new Array(count);
		let i, ilen, index;
		for (i = 0, ilen = count; i < ilen; ++i) {
			index = i + start;
			parsed[i] = {
				[iAxis]: singleScale || iScale.parse(labels[index], index),
				[vAxis]: vScale.parse(data[index], index)
			};
		}
		return parsed;
	}
	parseArrayData(meta, data, start, count) {
		const { xScale, yScale } = meta;
		const parsed = new Array(count);
		let i, ilen, index, item;
		for (i = 0, ilen = count; i < ilen; ++i) {
			index = i + start;
			item = data[index];
			parsed[i] = {
				x: xScale.parse(item[0], index),
				y: yScale.parse(item[1], index)
			};
		}
		return parsed;
	}
	parseObjectData(meta, data, start, count) {
		const { xScale, yScale } = meta;
		const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
		const parsed = new Array(count);
		let i, ilen, index, item;
		for (i = 0, ilen = count; i < ilen; ++i) {
			index = i + start;
			item = data[index];
			parsed[i] = {
				x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
				y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
			};
		}
		return parsed;
	}
	getParsed(index) {
		return this._cachedMeta._parsed[index];
	}
	getDataElement(index) {
		return this._cachedMeta.data[index];
	}
	applyStack(scale, parsed, mode) {
		const chart = this.chart;
		const meta = this._cachedMeta;
		const value = parsed[scale.axis];
		return applyStack({
			keys: getSortedDatasetIndices(chart, true),
			values: parsed._stacks[scale.axis]._visualValues
		}, value, meta.index, { mode });
	}
	updateRangeFromParsed(range, scale, parsed, stack) {
		const parsedValue = parsed[scale.axis];
		let value = parsedValue === null ? NaN : parsedValue;
		const values = stack && parsed._stacks[scale.axis];
		if (stack && values) {
			stack.values = values;
			value = applyStack(stack, parsedValue, this._cachedMeta.index);
		}
		range.min = Math.min(range.min, value);
		range.max = Math.max(range.max, value);
	}
	getMinMax(scale, canStack) {
		const meta = this._cachedMeta;
		const _parsed = meta._parsed;
		const sorted = meta._sorted && scale === meta.iScale;
		const ilen = _parsed.length;
		const otherScale = this._getOtherScale(scale);
		const stack = createStack(canStack, meta, this.chart);
		const range = {
			min: Number.POSITIVE_INFINITY,
			max: Number.NEGATIVE_INFINITY
		};
		const { min: otherMin, max: otherMax } = getUserBounds(otherScale);
		let i, parsed;
		function _skip() {
			parsed = _parsed[i];
			const otherValue = parsed[otherScale.axis];
			return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
		}
		for (i = 0; i < ilen; ++i) {
			if (_skip()) continue;
			this.updateRangeFromParsed(range, scale, parsed, stack);
			if (sorted) break;
		}
		if (sorted) for (i = ilen - 1; i >= 0; --i) {
			if (_skip()) continue;
			this.updateRangeFromParsed(range, scale, parsed, stack);
			break;
		}
		return range;
	}
	getAllParsedValues(scale) {
		const parsed = this._cachedMeta._parsed;
		const values = [];
		let i, ilen, value;
		for (i = 0, ilen = parsed.length; i < ilen; ++i) {
			value = parsed[i][scale.axis];
			if (isNumberFinite(value)) values.push(value);
		}
		return values;
	}
	getMaxOverflow() {
		return false;
	}
	getLabelAndValue(index) {
		const meta = this._cachedMeta;
		const iScale = meta.iScale;
		const vScale = meta.vScale;
		const parsed = this.getParsed(index);
		return {
			label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
			value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
		};
	}
	_update(mode) {
		const meta = this._cachedMeta;
		this.update(mode || "default");
		meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
	}
	update(mode) {}
	draw() {
		const ctx = this._ctx;
		const chart = this.chart;
		const meta = this._cachedMeta;
		const elements = meta.data || [];
		const area = chart.chartArea;
		const active = [];
		const start = this._drawStart || 0;
		const count = this._drawCount || elements.length - start;
		const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
		let i;
		if (meta.dataset) meta.dataset.draw(ctx, area, start, count);
		for (i = start; i < start + count; ++i) {
			const element = elements[i];
			if (element.hidden) continue;
			if (element.active && drawActiveElementsOnTop) active.push(element);
			else element.draw(ctx, area);
		}
		for (i = 0; i < active.length; ++i) active[i].draw(ctx, area);
	}
	getStyle(index, active) {
		const mode = active ? "active" : "default";
		return index === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
	}
	getContext(index, active, mode) {
		const dataset = this.getDataset();
		let context;
		if (index >= 0 && index < this._cachedMeta.data.length) {
			const element = this._cachedMeta.data[index];
			context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
			context.parsed = this.getParsed(index);
			context.raw = dataset.data[index];
			context.index = context.dataIndex = index;
		} else {
			context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
			context.dataset = dataset;
			context.index = context.datasetIndex = this.index;
		}
		context.active = !!active;
		context.mode = mode;
		return context;
	}
	resolveDatasetElementOptions(mode) {
		return this._resolveElementOptions(this.datasetElementType.id, mode);
	}
	resolveDataElementOptions(index, mode) {
		return this._resolveElementOptions(this.dataElementType.id, mode, index);
	}
	_resolveElementOptions(elementType, mode = "default", index) {
		const active = mode === "active";
		const cache = this._cachedDataOpts;
		const cacheKey = elementType + "-" + mode;
		const cached = cache[cacheKey];
		const sharing = this.enableOptionSharing && defined(index);
		if (cached) return cloneIfNotShared(cached, sharing);
		const config = this.chart.config;
		const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
		const prefixes = active ? [
			`${elementType}Hover`,
			"hover",
			elementType,
			""
		] : [elementType, ""];
		const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
		const names = Object.keys(defaults.elements[elementType]);
		const context = () => this.getContext(index, active, mode);
		const values = config.resolveNamedOptions(scopes, names, context, prefixes);
		if (values.$shared) {
			values.$shared = sharing;
			cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
		}
		return values;
	}
	_resolveAnimations(index, transition, active) {
		const chart = this.chart;
		const cache = this._cachedDataOpts;
		const cacheKey = `animation-${transition}`;
		const cached = cache[cacheKey];
		if (cached) return cached;
		let options;
		if (chart.options.animation !== false) {
			const config = this.chart.config;
			const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
			const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
			options = config.createResolver(scopes, this.getContext(index, active, transition));
		}
		const animations = new Animations(chart, options && options.animations);
		if (options && options._cacheable) cache[cacheKey] = Object.freeze(animations);
		return animations;
	}
	getSharedOptions(options) {
		if (!options.$shared) return;
		return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
	}
	includeOptions(mode, sharedOptions) {
		return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
	}
	_getSharedOptions(start, mode) {
		const firstOpts = this.resolveDataElementOptions(start, mode);
		const previouslySharedOptions = this._sharedOptions;
		const sharedOptions = this.getSharedOptions(firstOpts);
		const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
		this.updateSharedOptions(sharedOptions, mode, firstOpts);
		return {
			sharedOptions,
			includeOptions
		};
	}
	updateElement(element, index, properties, mode) {
		if (isDirectUpdateMode(mode)) Object.assign(element, properties);
		else this._resolveAnimations(index, mode).update(element, properties);
	}
	updateSharedOptions(sharedOptions, mode, newOptions) {
		if (sharedOptions && !isDirectUpdateMode(mode)) this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
	}
	_setStyle(element, index, mode, active) {
		element.active = active;
		const options = this.getStyle(index, active);
		this._resolveAnimations(index, mode, active).update(element, { options: !active && this.getSharedOptions(options) || options });
	}
	removeHoverStyle(element, datasetIndex, index) {
		this._setStyle(element, index, "active", false);
	}
	setHoverStyle(element, datasetIndex, index) {
		this._setStyle(element, index, "active", true);
	}
	_removeDatasetHoverStyle() {
		const element = this._cachedMeta.dataset;
		if (element) this._setStyle(element, void 0, "active", false);
	}
	_setDatasetHoverStyle() {
		const element = this._cachedMeta.dataset;
		if (element) this._setStyle(element, void 0, "active", true);
	}
	_resyncElements(resetNewElements) {
		const data = this._data;
		const elements = this._cachedMeta.data;
		for (const [method, arg1, arg2] of this._syncList) this[method](arg1, arg2);
		this._syncList = [];
		const numMeta = elements.length;
		const numData = data.length;
		const count = Math.min(numData, numMeta);
		if (count) this.parse(0, count);
		if (numData > numMeta) this._insertElements(numMeta, numData - numMeta, resetNewElements);
		else if (numData < numMeta) this._removeElements(numData, numMeta - numData);
	}
	_insertElements(start, count, resetNewElements = true) {
		const meta = this._cachedMeta;
		const data = meta.data;
		const end = start + count;
		let i;
		const move = (arr) => {
			arr.length += count;
			for (i = arr.length - 1; i >= end; i--) arr[i] = arr[i - count];
		};
		move(data);
		for (i = start; i < end; ++i) data[i] = new this.dataElementType();
		if (this._parsing) move(meta._parsed);
		this.parse(start, count);
		if (resetNewElements) this.updateElements(data, start, count, "reset");
	}
	updateElements(element, start, count, mode) {}
	_removeElements(start, count) {
		const meta = this._cachedMeta;
		if (this._parsing) {
			const removed = meta._parsed.splice(start, count);
			if (meta._stacked) clearStacks(meta, removed);
		}
		meta.data.splice(start, count);
	}
	_sync(args) {
		if (this._parsing) this._syncList.push(args);
		else {
			const [method, arg1, arg2] = args;
			this[method](arg1, arg2);
		}
		this.chart._dataChanges.push([this.index, ...args]);
	}
	_onDataPush() {
		const count = arguments.length;
		this._sync([
			"_insertElements",
			this.getDataset().data.length - count,
			count
		]);
	}
	_onDataPop() {
		this._sync([
			"_removeElements",
			this._cachedMeta.data.length - 1,
			1
		]);
	}
	_onDataShift() {
		this._sync([
			"_removeElements",
			0,
			1
		]);
	}
	_onDataSplice(start, count) {
		if (count) this._sync([
			"_removeElements",
			start,
			count
		]);
		const newCount = arguments.length - 2;
		if (newCount) this._sync([
			"_insertElements",
			start,
			newCount
		]);
	}
	_onDataUnshift() {
		this._sync([
			"_insertElements",
			0,
			arguments.length
		]);
	}
};
function getAllScaleValues(scale, type) {
	if (!scale._cache.$bar) {
		const visibleMetas = scale.getMatchingVisibleMetas(type);
		let values = [];
		for (let i = 0, ilen = visibleMetas.length; i < ilen; i++) values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
		scale._cache.$bar = _arrayUnique(values.sort((a, b) => a - b));
	}
	return scale._cache.$bar;
}
function computeMinSampleSize(meta) {
	const scale = meta.iScale;
	const values = getAllScaleValues(scale, meta.type);
	let min = scale._length;
	let i, ilen, curr, prev;
	const updateMinAndPrev = () => {
		if (curr === 32767 || curr === -32768) return;
		if (defined(prev)) min = Math.min(min, Math.abs(curr - prev) || min);
		prev = curr;
	};
	for (i = 0, ilen = values.length; i < ilen; ++i) {
		curr = scale.getPixelForValue(values[i]);
		updateMinAndPrev();
	}
	prev = void 0;
	for (i = 0, ilen = scale.ticks.length; i < ilen; ++i) {
		curr = scale.getPixelForTick(i);
		updateMinAndPrev();
	}
	return min;
}
function computeFitCategoryTraits(index, ruler, options, stackCount) {
	const thickness = options.barThickness;
	let size, ratio;
	if (isNullOrUndef(thickness)) {
		size = ruler.min * options.categoryPercentage;
		ratio = options.barPercentage;
	} else {
		size = thickness * stackCount;
		ratio = 1;
	}
	return {
		chunk: size / stackCount,
		ratio,
		start: ruler.pixels[index] - size / 2
	};
}
function computeFlexCategoryTraits(index, ruler, options, stackCount) {
	const pixels = ruler.pixels;
	const curr = pixels[index];
	let prev = index > 0 ? pixels[index - 1] : null;
	let next = index < pixels.length - 1 ? pixels[index + 1] : null;
	const percent = options.categoryPercentage;
	if (prev === null) prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
	if (next === null) next = curr + curr - prev;
	const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
	return {
		chunk: Math.abs(next - prev) / 2 * percent / stackCount,
		ratio: options.barPercentage,
		start
	};
}
function parseFloatBar(entry, item, vScale, i) {
	const startValue = vScale.parse(entry[0], i);
	const endValue = vScale.parse(entry[1], i);
	const min = Math.min(startValue, endValue);
	const max = Math.max(startValue, endValue);
	let barStart = min;
	let barEnd = max;
	if (Math.abs(min) > Math.abs(max)) {
		barStart = max;
		barEnd = min;
	}
	item[vScale.axis] = barEnd;
	item._custom = {
		barStart,
		barEnd,
		start: startValue,
		end: endValue,
		min,
		max
	};
}
function parseValue(entry, item, vScale, i) {
	if (isArray(entry)) parseFloatBar(entry, item, vScale, i);
	else item[vScale.axis] = vScale.parse(entry, i);
	return item;
}
function parseArrayOrPrimitive(meta, data, start, count) {
	const iScale = meta.iScale;
	const vScale = meta.vScale;
	const labels = iScale.getLabels();
	const singleScale = iScale === vScale;
	const parsed = [];
	let i, ilen, item, entry;
	for (i = start, ilen = start + count; i < ilen; ++i) {
		entry = data[i];
		item = {};
		item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
		parsed.push(parseValue(entry, item, vScale, i));
	}
	return parsed;
}
function isFloatBar(custom) {
	return custom && custom.barStart !== void 0 && custom.barEnd !== void 0;
}
function barSign(size, vScale, actualBase) {
	if (size !== 0) return sign(size);
	return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
}
function borderProps(properties) {
	let reverse, start, end, top, bottom;
	if (properties.horizontal) {
		reverse = properties.base > properties.x;
		start = "left";
		end = "right";
	} else {
		reverse = properties.base < properties.y;
		start = "bottom";
		end = "top";
	}
	if (reverse) {
		top = "end";
		bottom = "start";
	} else {
		top = "start";
		bottom = "end";
	}
	return {
		start,
		end,
		reverse,
		top,
		bottom
	};
}
function setBorderSkipped(properties, options, stack, index) {
	let edge = options.borderSkipped;
	const res = {};
	if (!edge) {
		properties.borderSkipped = res;
		return;
	}
	if (edge === true) {
		properties.borderSkipped = {
			top: true,
			right: true,
			bottom: true,
			left: true
		};
		return;
	}
	const { start, end, reverse, top, bottom } = borderProps(properties);
	if (edge === "middle" && stack) {
		properties.enableBorderRadius = true;
		if ((stack._top || 0) === index) edge = top;
		else if ((stack._bottom || 0) === index) edge = bottom;
		else {
			res[parseEdge(bottom, start, end, reverse)] = true;
			edge = top;
		}
	}
	res[parseEdge(edge, start, end, reverse)] = true;
	properties.borderSkipped = res;
}
function parseEdge(edge, a, b, reverse) {
	if (reverse) {
		edge = swap(edge, a, b);
		edge = startEnd(edge, b, a);
	} else edge = startEnd(edge, a, b);
	return edge;
}
function swap(orig, v1, v2) {
	return orig === v1 ? v2 : orig === v2 ? v1 : orig;
}
function startEnd(v, start, end) {
	return v === "start" ? start : v === "end" ? end : v;
}
function setInflateAmount(properties, { inflateAmount }, ratio) {
	properties.inflateAmount = inflateAmount === "auto" ? ratio === 1 ? .33 : 0 : inflateAmount;
}
var BarController = class extends DatasetController {
	static id = "bar";
	static defaults = {
		datasetElementType: false,
		dataElementType: "bar",
		categoryPercentage: .8,
		barPercentage: .9,
		grouped: true,
		animations: { numbers: {
			type: "number",
			properties: [
				"x",
				"y",
				"base",
				"width",
				"height"
			]
		} }
	};
	static overrides = { scales: {
		_index_: {
			type: "category",
			offset: true,
			grid: { offset: true }
		},
		_value_: {
			type: "linear",
			beginAtZero: true
		}
	} };
	parsePrimitiveData(meta, data, start, count) {
		return parseArrayOrPrimitive(meta, data, start, count);
	}
	parseArrayData(meta, data, start, count) {
		return parseArrayOrPrimitive(meta, data, start, count);
	}
	parseObjectData(meta, data, start, count) {
		const { iScale, vScale } = meta;
		const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
		const iAxisKey = iScale.axis === "x" ? xAxisKey : yAxisKey;
		const vAxisKey = vScale.axis === "x" ? xAxisKey : yAxisKey;
		const parsed = [];
		let i, ilen, item, obj;
		for (i = start, ilen = start + count; i < ilen; ++i) {
			obj = data[i];
			item = {};
			item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i);
			parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i));
		}
		return parsed;
	}
	updateRangeFromParsed(range, scale, parsed, stack) {
		super.updateRangeFromParsed(range, scale, parsed, stack);
		const custom = parsed._custom;
		if (custom && scale === this._cachedMeta.vScale) {
			range.min = Math.min(range.min, custom.min);
			range.max = Math.max(range.max, custom.max);
		}
	}
	getMaxOverflow() {
		return 0;
	}
	getLabelAndValue(index) {
		const { iScale, vScale } = this._cachedMeta;
		const parsed = this.getParsed(index);
		const custom = parsed._custom;
		const value = isFloatBar(custom) ? "[" + custom.start + ", " + custom.end + "]" : "" + vScale.getLabelForValue(parsed[vScale.axis]);
		return {
			label: "" + iScale.getLabelForValue(parsed[iScale.axis]),
			value
		};
	}
	initialize() {
		this.enableOptionSharing = true;
		super.initialize();
		const meta = this._cachedMeta;
		meta.stack = this.getDataset().stack;
	}
	update(mode) {
		const meta = this._cachedMeta;
		this.updateElements(meta.data, 0, meta.data.length, mode);
	}
	updateElements(bars, start, count, mode) {
		const reset = mode === "reset";
		const { index, _cachedMeta: { vScale } } = this;
		const base = vScale.getBasePixel();
		const horizontal = vScale.isHorizontal();
		const ruler = this._getRuler();
		const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
		for (let i = start; i < start + count; i++) {
			const parsed = this.getParsed(i);
			const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? {
				base,
				head: base
			} : this._calculateBarValuePixels(i);
			const ipixels = this._calculateBarIndexPixels(i, ruler);
			const stack = (parsed._stacks || {})[vScale.axis];
			const properties = {
				horizontal,
				base: vpixels.base,
				enableBorderRadius: !stack || isFloatBar(parsed._custom) || index === stack._top || index === stack._bottom,
				x: horizontal ? vpixels.head : ipixels.center,
				y: horizontal ? ipixels.center : vpixels.head,
				height: horizontal ? ipixels.size : Math.abs(vpixels.size),
				width: horizontal ? Math.abs(vpixels.size) : ipixels.size
			};
			if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? "active" : mode);
			const options = properties.options || bars[i].options;
			setBorderSkipped(properties, options, stack, index);
			setInflateAmount(properties, options, ruler.ratio);
			this.updateElement(bars[i], i, properties, mode);
		}
	}
	_getStacks(last, dataIndex) {
		const { iScale } = this._cachedMeta;
		const metasets = iScale.getMatchingVisibleMetas(this._type).filter((meta) => meta.controller.options.grouped);
		const stacked = iScale.options.stacked;
		const stacks = [];
		const currentParsed = this._cachedMeta.controller.getParsed(dataIndex);
		const iScaleValue = currentParsed && currentParsed[iScale.axis];
		const skipNull = (meta) => {
			const parsed = meta._parsed.find((item) => item[iScale.axis] === iScaleValue);
			const val = parsed && parsed[meta.vScale.axis];
			if (isNullOrUndef(val) || isNaN(val)) return true;
		};
		for (const meta of metasets) {
			if (dataIndex !== void 0 && skipNull(meta)) continue;
			if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === void 0 && meta.stack === void 0) stacks.push(meta.stack);
			if (meta.index === last) break;
		}
		if (!stacks.length) stacks.push(void 0);
		return stacks;
	}
	_getStackCount(index) {
		return this._getStacks(void 0, index).length;
	}
	_getAxisCount() {
		return this._getAxis().length;
	}
	getFirstScaleIdForIndexAxis() {
		const scales = this.chart.scales;
		const indexScaleId = this.chart.options.indexAxis;
		return Object.keys(scales).filter((key) => scales[key].axis === indexScaleId).shift();
	}
	_getAxis() {
		const axis = {};
		const firstScaleAxisId = this.getFirstScaleIdForIndexAxis();
		for (const dataset of this.chart.data.datasets) axis[valueOrDefault(this.chart.options.indexAxis === "x" ? dataset.xAxisID : dataset.yAxisID, firstScaleAxisId)] = true;
		return Object.keys(axis);
	}
	_getStackIndex(datasetIndex, name, dataIndex) {
		const stacks = this._getStacks(datasetIndex, dataIndex);
		const index = name !== void 0 ? stacks.indexOf(name) : -1;
		return index === -1 ? stacks.length - 1 : index;
	}
	_getRuler() {
		const opts = this.options;
		const meta = this._cachedMeta;
		const iScale = meta.iScale;
		const pixels = [];
		let i, ilen;
		for (i = 0, ilen = meta.data.length; i < ilen; ++i) pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
		const barThickness = opts.barThickness;
		return {
			min: barThickness || computeMinSampleSize(meta),
			pixels,
			start: iScale._startPixel,
			end: iScale._endPixel,
			stackCount: this._getStackCount(),
			scale: iScale,
			grouped: opts.grouped,
			ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
		};
	}
	_calculateBarValuePixels(index) {
		const { _cachedMeta: { vScale, _stacked, index: datasetIndex }, options: { base: baseValue, minBarLength } } = this;
		const actualBase = baseValue || 0;
		const parsed = this.getParsed(index);
		const custom = parsed._custom;
		const floating = isFloatBar(custom);
		let value = parsed[vScale.axis];
		let start = 0;
		let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
		let head, size;
		if (length !== value) {
			start = length - value;
			length = value;
		}
		if (floating) {
			value = custom.barStart;
			length = custom.barEnd - custom.barStart;
			if (value !== 0 && sign(value) !== sign(custom.barEnd)) start = 0;
			start += value;
		}
		const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
		let base = vScale.getPixelForValue(startValue);
		if (this.chart.getDataVisibility(index)) head = vScale.getPixelForValue(start + length);
		else head = base;
		size = head - base;
		if (Math.abs(size) < minBarLength) {
			size = barSign(size, vScale, actualBase) * minBarLength;
			if (value === actualBase) base -= size / 2;
			const startPixel = vScale.getPixelForDecimal(0);
			const endPixel = vScale.getPixelForDecimal(1);
			base = Math.max(Math.min(base, Math.max(startPixel, endPixel)), Math.min(startPixel, endPixel));
			head = base + size;
			if (_stacked && !floating) parsed._stacks[vScale.axis]._visualValues[datasetIndex] = vScale.getValueForPixel(head) - vScale.getValueForPixel(base);
		}
		if (base === vScale.getPixelForValue(actualBase)) {
			const halfGrid = sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
			base += halfGrid;
			size -= halfGrid;
		}
		return {
			size,
			base,
			head,
			center: head + size / 2
		};
	}
	_calculateBarIndexPixels(index, ruler) {
		const scale = ruler.scale;
		const options = this.options;
		const skipNull = options.skipNull;
		const maxBarThickness = valueOrDefault(options.maxBarThickness, Infinity);
		let center, size;
		const axisCount = this._getAxisCount();
		if (ruler.grouped) {
			const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
			const range = options.barThickness === "flex" ? computeFlexCategoryTraits(index, ruler, options, stackCount * axisCount) : computeFitCategoryTraits(index, ruler, options, stackCount * axisCount);
			const axisID = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID;
			const axisNumber = this._getAxis().indexOf(valueOrDefault(axisID, this.getFirstScaleIdForIndexAxis()));
			const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : void 0) + axisNumber;
			center = range.start + range.chunk * stackIndex + range.chunk / 2;
			size = Math.min(maxBarThickness, range.chunk * range.ratio);
		} else {
			center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
			size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
		}
		return {
			base: center - size / 2,
			head: center + size / 2,
			center,
			size
		};
	}
	draw() {
		const meta = this._cachedMeta;
		const vScale = meta.vScale;
		const rects = meta.data;
		const ilen = rects.length;
		let i = 0;
		for (; i < ilen; ++i) if (this.getParsed(i)[vScale.axis] !== null && !rects[i].hidden) rects[i].draw(this._ctx);
	}
};
var BubbleController = class extends DatasetController {
	static id = "bubble";
	static defaults = {
		datasetElementType: false,
		dataElementType: "point",
		animations: { numbers: {
			type: "number",
			properties: [
				"x",
				"y",
				"borderWidth",
				"radius"
			]
		} }
	};
	static overrides = { scales: {
		x: { type: "linear" },
		y: { type: "linear" }
	} };
	initialize() {
		this.enableOptionSharing = true;
		super.initialize();
	}
	parsePrimitiveData(meta, data, start, count) {
		const parsed = super.parsePrimitiveData(meta, data, start, count);
		for (let i = 0; i < parsed.length; i++) parsed[i]._custom = this.resolveDataElementOptions(i + start).radius;
		return parsed;
	}
	parseArrayData(meta, data, start, count) {
		const parsed = super.parseArrayData(meta, data, start, count);
		for (let i = 0; i < parsed.length; i++) {
			const item = data[start + i];
			parsed[i]._custom = valueOrDefault(item[2], this.resolveDataElementOptions(i + start).radius);
		}
		return parsed;
	}
	parseObjectData(meta, data, start, count) {
		const parsed = super.parseObjectData(meta, data, start, count);
		for (let i = 0; i < parsed.length; i++) {
			const item = data[start + i];
			parsed[i]._custom = valueOrDefault(item && item.r && +item.r, this.resolveDataElementOptions(i + start).radius);
		}
		return parsed;
	}
	getMaxOverflow() {
		const data = this._cachedMeta.data;
		let max = 0;
		for (let i = data.length - 1; i >= 0; --i) max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
		return max > 0 && max;
	}
	getLabelAndValue(index) {
		const meta = this._cachedMeta;
		const labels = this.chart.data.labels || [];
		const { xScale, yScale } = meta;
		const parsed = this.getParsed(index);
		const x = xScale.getLabelForValue(parsed.x);
		const y = yScale.getLabelForValue(parsed.y);
		const r = parsed._custom;
		return {
			label: labels[index] || "",
			value: "(" + x + ", " + y + (r ? ", " + r : "") + ")"
		};
	}
	update(mode) {
		const points = this._cachedMeta.data;
		this.updateElements(points, 0, points.length, mode);
	}
	updateElements(points, start, count, mode) {
		const reset = mode === "reset";
		const { iScale, vScale } = this._cachedMeta;
		const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
		const iAxis = iScale.axis;
		const vAxis = vScale.axis;
		for (let i = start; i < start + count; i++) {
			const point = points[i];
			const parsed = !reset && this.getParsed(i);
			const properties = {};
			const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(.5) : iScale.getPixelForValue(parsed[iAxis]);
			const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
			properties.skip = isNaN(iPixel) || isNaN(vPixel);
			if (includeOptions) {
				properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
				if (reset) properties.options.radius = 0;
			}
			this.updateElement(point, i, properties, mode);
		}
	}
	resolveDataElementOptions(index, mode) {
		const parsed = this.getParsed(index);
		let values = super.resolveDataElementOptions(index, mode);
		if (values.$shared) values = Object.assign({}, values, { $shared: false });
		const radius = values.radius;
		if (mode !== "active") values.radius = 0;
		values.radius += valueOrDefault(parsed && parsed._custom, radius);
		return values;
	}
};
function getRatioAndOffset(rotation, circumference, cutout) {
	let ratioX = 1;
	let ratioY = 1;
	let offsetX = 0;
	let offsetY = 0;
	if (circumference < TAU) {
		const startAngle = rotation;
		const endAngle = startAngle + circumference;
		const startX = Math.cos(startAngle);
		const startY = Math.sin(startAngle);
		const endX = Math.cos(endAngle);
		const endY = Math.sin(endAngle);
		const calcMax = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
		const calcMin = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
		const maxX = calcMax(0, startX, endX);
		const maxY = calcMax(HALF_PI, startY, endY);
		const minX = calcMin(PI, startX, endX);
		const minY = calcMin(PI + HALF_PI, startY, endY);
		ratioX = (maxX - minX) / 2;
		ratioY = (maxY - minY) / 2;
		offsetX = -(maxX + minX) / 2;
		offsetY = -(maxY + minY) / 2;
	}
	return {
		ratioX,
		ratioY,
		offsetX,
		offsetY
	};
}
var DoughnutController = class extends DatasetController {
	static id = "doughnut";
	static defaults = {
		datasetElementType: false,
		dataElementType: "arc",
		animation: {
			animateRotate: true,
			animateScale: false
		},
		animations: { numbers: {
			type: "number",
			properties: [
				"circumference",
				"endAngle",
				"innerRadius",
				"outerRadius",
				"startAngle",
				"x",
				"y",
				"offset",
				"borderWidth",
				"spacing"
			]
		} },
		cutout: "50%",
		rotation: 0,
		circumference: 360,
		radius: "100%",
		spacing: 0,
		indexAxis: "r"
	};
	static descriptors = {
		_scriptable: (name) => name !== "spacing",
		_indexable: (name) => name !== "spacing" && !name.startsWith("borderDash") && !name.startsWith("hoverBorderDash")
	};
	static overrides = {
		aspectRatio: 1,
		plugins: { legend: {
			labels: { generateLabels(chart) {
				const data = chart.data;
				const { labels: { pointStyle, textAlign, color, useBorderRadius, borderRadius } } = chart.legend.options;
				if (data.labels.length && data.datasets.length) return data.labels.map((label, i) => {
					const style = chart.getDatasetMeta(0).controller.getStyle(i);
					return {
						text: label,
						fillStyle: style.backgroundColor,
						fontColor: color,
						hidden: !chart.getDataVisibility(i),
						lineDash: style.borderDash,
						lineDashOffset: style.borderDashOffset,
						lineJoin: style.borderJoinStyle,
						lineWidth: style.borderWidth,
						strokeStyle: style.borderColor,
						textAlign,
						pointStyle,
						borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
						index: i
					};
				});
				return [];
			} },
			onClick(e, legendItem, legend) {
				legend.chart.toggleDataVisibility(legendItem.index);
				legend.chart.update();
			}
		} }
	};
	constructor(chart, datasetIndex) {
		super(chart, datasetIndex);
		this.enableOptionSharing = true;
		this.innerRadius = void 0;
		this.outerRadius = void 0;
		this.offsetX = void 0;
		this.offsetY = void 0;
	}
	linkScales() {}
	parse(start, count) {
		const data = this.getDataset().data;
		const meta = this._cachedMeta;
		if (this._parsing === false) meta._parsed = data;
		else {
			let getter = (i) => +data[i];
			if (isObject(data[start])) {
				const { key = "value" } = this._parsing;
				getter = (i) => +resolveObjectKey(data[i], key);
			}
			let i, ilen;
			for (i = start, ilen = start + count; i < ilen; ++i) meta._parsed[i] = getter(i);
		}
	}
	_getRotation() {
		return toRadians(this.options.rotation - 90);
	}
	_getCircumference() {
		return toRadians(this.options.circumference);
	}
	_getRotationExtents() {
		let min = TAU;
		let max = -TAU;
		for (let i = 0; i < this.chart.data.datasets.length; ++i) if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
			const controller = this.chart.getDatasetMeta(i).controller;
			const rotation = controller._getRotation();
			const circumference = controller._getCircumference();
			min = Math.min(min, rotation);
			max = Math.max(max, rotation + circumference);
		}
		return {
			rotation: min,
			circumference: max - min
		};
	}
	update(mode) {
		const { chartArea } = this.chart;
		const meta = this._cachedMeta;
		const arcs = meta.data;
		const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
		const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
		const cutout = Math.min(toPercentage(this.options.cutout, maxSize), 1);
		const chartWeight = this._getRingWeight(this.index);
		const { circumference, rotation } = this._getRotationExtents();
		const { ratioX, ratioY, offsetX, offsetY } = getRatioAndOffset(rotation, circumference, cutout);
		const maxWidth = (chartArea.width - spacing) / ratioX;
		const maxHeight = (chartArea.height - spacing) / ratioY;
		const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
		const outerRadius = toDimension(this.options.radius, maxRadius);
		const radiusLength = (outerRadius - Math.max(outerRadius * cutout, 0)) / this._getVisibleDatasetWeightTotal();
		this.offsetX = offsetX * outerRadius;
		this.offsetY = offsetY * outerRadius;
		meta.total = this.calculateTotal();
		this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
		this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
		this.updateElements(arcs, 0, arcs.length, mode);
	}
	_circumference(i, reset) {
		const opts = this.options;
		const meta = this._cachedMeta;
		const circumference = this._getCircumference();
		if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || meta._parsed[i] === null || meta.data[i].hidden) return 0;
		return this.calculateCircumference(meta._parsed[i] * circumference / TAU);
	}
	updateElements(arcs, start, count, mode) {
		const reset = mode === "reset";
		const chart = this.chart;
		const chartArea = chart.chartArea;
		const animationOpts = chart.options.animation;
		const centerX = (chartArea.left + chartArea.right) / 2;
		const centerY = (chartArea.top + chartArea.bottom) / 2;
		const animateScale = reset && animationOpts.animateScale;
		const innerRadius = animateScale ? 0 : this.innerRadius;
		const outerRadius = animateScale ? 0 : this.outerRadius;
		const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
		let startAngle = this._getRotation();
		let i;
		for (i = 0; i < start; ++i) startAngle += this._circumference(i, reset);
		for (i = start; i < start + count; ++i) {
			const circumference = this._circumference(i, reset);
			const arc = arcs[i];
			const properties = {
				x: centerX + this.offsetX,
				y: centerY + this.offsetY,
				startAngle,
				endAngle: startAngle + circumference,
				circumference,
				outerRadius,
				innerRadius
			};
			if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? "active" : mode);
			startAngle += circumference;
			this.updateElement(arc, i, properties, mode);
		}
	}
	calculateTotal() {
		const meta = this._cachedMeta;
		const metaData = meta.data;
		let total = 0;
		let i;
		for (i = 0; i < metaData.length; i++) {
			const value = meta._parsed[i];
			if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) total += Math.abs(value);
		}
		return total;
	}
	calculateCircumference(value) {
		const total = this._cachedMeta.total;
		if (total > 0 && !isNaN(value)) return TAU * (Math.abs(value) / total);
		return 0;
	}
	getLabelAndValue(index) {
		const meta = this._cachedMeta;
		const chart = this.chart;
		const labels = chart.data.labels || [];
		const value = formatNumber(meta._parsed[index], chart.options.locale);
		return {
			label: labels[index] || "",
			value
		};
	}
	getMaxBorderWidth(arcs) {
		let max = 0;
		const chart = this.chart;
		let i, ilen, meta, controller, options;
		if (!arcs) {
			for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) if (chart.isDatasetVisible(i)) {
				meta = chart.getDatasetMeta(i);
				arcs = meta.data;
				controller = meta.controller;
				break;
			}
		}
		if (!arcs) return 0;
		for (i = 0, ilen = arcs.length; i < ilen; ++i) {
			options = controller.resolveDataElementOptions(i);
			if (options.borderAlign !== "inner") max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
		}
		return max;
	}
	getMaxOffset(arcs) {
		let max = 0;
		for (let i = 0, ilen = arcs.length; i < ilen; ++i) {
			const options = this.resolveDataElementOptions(i);
			max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
		}
		return max;
	}
	_getRingWeightOffset(datasetIndex) {
		let ringWeightOffset = 0;
		for (let i = 0; i < datasetIndex; ++i) if (this.chart.isDatasetVisible(i)) ringWeightOffset += this._getRingWeight(i);
		return ringWeightOffset;
	}
	_getRingWeight(datasetIndex) {
		return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
	}
	_getVisibleDatasetWeightTotal() {
		return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
	}
};
var LineController = class extends DatasetController {
	static id = "line";
	static defaults = {
		datasetElementType: "line",
		dataElementType: "point",
		showLine: true,
		spanGaps: false
	};
	static overrides = { scales: {
		_index_: { type: "category" },
		_value_: { type: "linear" }
	} };
	initialize() {
		this.enableOptionSharing = true;
		this.supportsDecimation = true;
		super.initialize();
	}
	update(mode) {
		const meta = this._cachedMeta;
		const { dataset: line, data: points = [], _dataset } = meta;
		const animationsDisabled = this.chart._animationsDisabled;
		let { start, count } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
		this._drawStart = start;
		this._drawCount = count;
		if (_scaleRangesChanged(meta)) {
			start = 0;
			count = points.length;
		}
		line._chart = this.chart;
		line._datasetIndex = this.index;
		line._decimated = !!_dataset._decimated;
		line.points = points;
		const options = this.resolveDatasetElementOptions(mode);
		if (!this.options.showLine) options.borderWidth = 0;
		options.segment = this.options.segment;
		this.updateElement(line, void 0, {
			animated: !animationsDisabled,
			options
		}, mode);
		this.updateElements(points, start, count, mode);
	}
	updateElements(points, start, count, mode) {
		const reset = mode === "reset";
		const { iScale, vScale, _stacked, _dataset } = this._cachedMeta;
		const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
		const iAxis = iScale.axis;
		const vAxis = vScale.axis;
		const { spanGaps, segment } = this.options;
		const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
		const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
		const end = start + count;
		const pointsCount = points.length;
		let prevParsed = start > 0 && this.getParsed(start - 1);
		for (let i = 0; i < pointsCount; ++i) {
			const point = points[i];
			const properties = directUpdate ? point : {};
			if (i < start || i >= end) {
				properties.skip = true;
				continue;
			}
			const parsed = this.getParsed(i);
			const nullData = isNullOrUndef(parsed[vAxis]);
			const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
			const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
			properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
			properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
			if (segment) {
				properties.parsed = parsed;
				properties.raw = _dataset.data[i];
			}
			if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
			if (!directUpdate) this.updateElement(point, i, properties, mode);
			prevParsed = parsed;
		}
	}
	getMaxOverflow() {
		const meta = this._cachedMeta;
		const dataset = meta.dataset;
		const border = dataset.options && dataset.options.borderWidth || 0;
		const data = meta.data || [];
		if (!data.length) return border;
		const firstPoint = data[0].size(this.resolveDataElementOptions(0));
		const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
		return Math.max(border, firstPoint, lastPoint) / 2;
	}
	draw() {
		const meta = this._cachedMeta;
		meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
		super.draw();
	}
};
var PolarAreaController = class extends DatasetController {
	static id = "polarArea";
	static defaults = {
		dataElementType: "arc",
		animation: {
			animateRotate: true,
			animateScale: true
		},
		animations: { numbers: {
			type: "number",
			properties: [
				"x",
				"y",
				"startAngle",
				"endAngle",
				"innerRadius",
				"outerRadius"
			]
		} },
		indexAxis: "r",
		startAngle: 0
	};
	static overrides = {
		aspectRatio: 1,
		plugins: { legend: {
			labels: { generateLabels(chart) {
				const data = chart.data;
				if (data.labels.length && data.datasets.length) {
					const { labels: { pointStyle, color } } = chart.legend.options;
					return data.labels.map((label, i) => {
						const style = chart.getDatasetMeta(0).controller.getStyle(i);
						return {
							text: label,
							fillStyle: style.backgroundColor,
							strokeStyle: style.borderColor,
							fontColor: color,
							lineWidth: style.borderWidth,
							pointStyle,
							hidden: !chart.getDataVisibility(i),
							index: i
						};
					});
				}
				return [];
			} },
			onClick(e, legendItem, legend) {
				legend.chart.toggleDataVisibility(legendItem.index);
				legend.chart.update();
			}
		} },
		scales: { r: {
			type: "radialLinear",
			angleLines: { display: false },
			beginAtZero: true,
			grid: { circular: true },
			pointLabels: { display: false },
			startAngle: 0
		} }
	};
	constructor(chart, datasetIndex) {
		super(chart, datasetIndex);
		this.innerRadius = void 0;
		this.outerRadius = void 0;
	}
	getLabelAndValue(index) {
		const meta = this._cachedMeta;
		const chart = this.chart;
		const labels = chart.data.labels || [];
		const value = formatNumber(meta._parsed[index].r, chart.options.locale);
		return {
			label: labels[index] || "",
			value
		};
	}
	parseObjectData(meta, data, start, count) {
		return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
	}
	update(mode) {
		const arcs = this._cachedMeta.data;
		this._updateRadius();
		this.updateElements(arcs, 0, arcs.length, mode);
	}
	getMinMax() {
		const meta = this._cachedMeta;
		const range = {
			min: Number.POSITIVE_INFINITY,
			max: Number.NEGATIVE_INFINITY
		};
		meta.data.forEach((element, index) => {
			const parsed = this.getParsed(index).r;
			if (!isNaN(parsed) && this.chart.getDataVisibility(index)) {
				if (parsed < range.min) range.min = parsed;
				if (parsed > range.max) range.max = parsed;
			}
		});
		return range;
	}
	_updateRadius() {
		const chart = this.chart;
		const chartArea = chart.chartArea;
		const opts = chart.options;
		const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
		const outerRadius = Math.max(minSize / 2, 0);
		const radiusLength = (outerRadius - Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0)) / chart.getVisibleDatasetCount();
		this.outerRadius = outerRadius - radiusLength * this.index;
		this.innerRadius = this.outerRadius - radiusLength;
	}
	updateElements(arcs, start, count, mode) {
		const reset = mode === "reset";
		const chart = this.chart;
		const animationOpts = chart.options.animation;
		const scale = this._cachedMeta.rScale;
		const centerX = scale.xCenter;
		const centerY = scale.yCenter;
		const datasetStartAngle = scale.getIndexAngle(0) - .5 * PI;
		let angle = datasetStartAngle;
		let i;
		const defaultAngle = 360 / this.countVisibleElements();
		for (i = 0; i < start; ++i) angle += this._computeAngle(i, mode, defaultAngle);
		for (i = start; i < start + count; i++) {
			const arc = arcs[i];
			let startAngle = angle;
			let endAngle = angle + this._computeAngle(i, mode, defaultAngle);
			let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(this.getParsed(i).r) : 0;
			angle = endAngle;
			if (reset) {
				if (animationOpts.animateScale) outerRadius = 0;
				if (animationOpts.animateRotate) startAngle = endAngle = datasetStartAngle;
			}
			const properties = {
				x: centerX,
				y: centerY,
				innerRadius: 0,
				outerRadius,
				startAngle,
				endAngle,
				options: this.resolveDataElementOptions(i, arc.active ? "active" : mode)
			};
			this.updateElement(arc, i, properties, mode);
		}
	}
	countVisibleElements() {
		const meta = this._cachedMeta;
		let count = 0;
		meta.data.forEach((element, index) => {
			if (!isNaN(this.getParsed(index).r) && this.chart.getDataVisibility(index)) count++;
		});
		return count;
	}
	_computeAngle(index, mode, defaultAngle) {
		return this.chart.getDataVisibility(index) ? toRadians(this.resolveDataElementOptions(index, mode).angle || defaultAngle) : 0;
	}
};
var PieController = class extends DoughnutController {
	static id = "pie";
	static defaults = {
		cutout: 0,
		rotation: 0,
		circumference: 360,
		radius: "100%"
	};
};
var RadarController = class extends DatasetController {
	static id = "radar";
	static defaults = {
		datasetElementType: "line",
		dataElementType: "point",
		indexAxis: "r",
		showLine: true,
		elements: { line: { fill: "start" } }
	};
	static overrides = {
		aspectRatio: 1,
		scales: { r: { type: "radialLinear" } }
	};
	getLabelAndValue(index) {
		const vScale = this._cachedMeta.vScale;
		const parsed = this.getParsed(index);
		return {
			label: vScale.getLabels()[index],
			value: "" + vScale.getLabelForValue(parsed[vScale.axis])
		};
	}
	parseObjectData(meta, data, start, count) {
		return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
	}
	update(mode) {
		const meta = this._cachedMeta;
		const line = meta.dataset;
		const points = meta.data || [];
		const labels = meta.iScale.getLabels();
		line.points = points;
		if (mode !== "resize") {
			const options = this.resolveDatasetElementOptions(mode);
			if (!this.options.showLine) options.borderWidth = 0;
			const properties = {
				_loop: true,
				_fullLoop: labels.length === points.length,
				options
			};
			this.updateElement(line, void 0, properties, mode);
		}
		this.updateElements(points, 0, points.length, mode);
	}
	updateElements(points, start, count, mode) {
		const scale = this._cachedMeta.rScale;
		const reset = mode === "reset";
		for (let i = start; i < start + count; i++) {
			const point = points[i];
			const options = this.resolveDataElementOptions(i, point.active ? "active" : mode);
			const pointPosition = scale.getPointPositionForValue(i, this.getParsed(i).r);
			const x = reset ? scale.xCenter : pointPosition.x;
			const y = reset ? scale.yCenter : pointPosition.y;
			const properties = {
				x,
				y,
				angle: pointPosition.angle,
				skip: isNaN(x) || isNaN(y),
				options
			};
			this.updateElement(point, i, properties, mode);
		}
	}
};
var ScatterController = class extends DatasetController {
	static id = "scatter";
	static defaults = {
		datasetElementType: false,
		dataElementType: "point",
		showLine: false,
		fill: false
	};
	static overrides = {
		interaction: { mode: "point" },
		scales: {
			x: { type: "linear" },
			y: { type: "linear" }
		}
	};
	getLabelAndValue(index) {
		const meta = this._cachedMeta;
		const labels = this.chart.data.labels || [];
		const { xScale, yScale } = meta;
		const parsed = this.getParsed(index);
		const x = xScale.getLabelForValue(parsed.x);
		const y = yScale.getLabelForValue(parsed.y);
		return {
			label: labels[index] || "",
			value: "(" + x + ", " + y + ")"
		};
	}
	update(mode) {
		const meta = this._cachedMeta;
		const { data: points = [] } = meta;
		const animationsDisabled = this.chart._animationsDisabled;
		let { start, count } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
		this._drawStart = start;
		this._drawCount = count;
		if (_scaleRangesChanged(meta)) {
			start = 0;
			count = points.length;
		}
		if (this.options.showLine) {
			if (!this.datasetElementType) this.addElements();
			const { dataset: line, _dataset } = meta;
			line._chart = this.chart;
			line._datasetIndex = this.index;
			line._decimated = !!_dataset._decimated;
			line.points = points;
			const options = this.resolveDatasetElementOptions(mode);
			options.segment = this.options.segment;
			this.updateElement(line, void 0, {
				animated: !animationsDisabled,
				options
			}, mode);
		} else if (this.datasetElementType) {
			delete meta.dataset;
			this.datasetElementType = false;
		}
		this.updateElements(points, start, count, mode);
	}
	addElements() {
		const { showLine } = this.options;
		if (!this.datasetElementType && showLine) this.datasetElementType = this.chart.registry.getElement("line");
		super.addElements();
	}
	updateElements(points, start, count, mode) {
		const reset = mode === "reset";
		const { iScale, vScale, _stacked, _dataset } = this._cachedMeta;
		const firstOpts = this.resolveDataElementOptions(start, mode);
		const sharedOptions = this.getSharedOptions(firstOpts);
		const includeOptions = this.includeOptions(mode, sharedOptions);
		const iAxis = iScale.axis;
		const vAxis = vScale.axis;
		const { spanGaps, segment } = this.options;
		const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
		const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
		let prevParsed = start > 0 && this.getParsed(start - 1);
		for (let i = start; i < start + count; ++i) {
			const point = points[i];
			const parsed = this.getParsed(i);
			const properties = directUpdate ? point : {};
			const nullData = isNullOrUndef(parsed[vAxis]);
			const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
			const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
			properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
			properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
			if (segment) {
				properties.parsed = parsed;
				properties.raw = _dataset.data[i];
			}
			if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
			if (!directUpdate) this.updateElement(point, i, properties, mode);
			prevParsed = parsed;
		}
		this.updateSharedOptions(sharedOptions, mode, firstOpts);
	}
	getMaxOverflow() {
		const meta = this._cachedMeta;
		const data = meta.data || [];
		if (!this.options.showLine) {
			let max = 0;
			for (let i = data.length - 1; i >= 0; --i) max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
			return max > 0 && max;
		}
		const dataset = meta.dataset;
		const border = dataset.options && dataset.options.borderWidth || 0;
		if (!data.length) return border;
		const firstPoint = data[0].size(this.resolveDataElementOptions(0));
		const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
		return Math.max(border, firstPoint, lastPoint) / 2;
	}
};
var controllers = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController
});
/**
* @namespace Chart._adapters
* @since 2.8.0
* @private
*/ function abstract() {
	throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
var adapters = { _date: class DateAdapterBase {
	/**
	* Override default date adapter methods.
	* Accepts type parameter to define options type.
	* @example
	* Chart._adapters._date.override<{myAdapterOption: string}>({
	*   init() {
	*     console.log(this.options.myAdapterOption);
	*   }
	* })
	*/ static override(members) {
		Object.assign(DateAdapterBase.prototype, members);
	}
	options;
	constructor(options) {
		this.options = options || {};
	}
	init() {}
	formats() {
		return abstract();
	}
	parse() {
		return abstract();
	}
	format() {
		return abstract();
	}
	add() {
		return abstract();
	}
	diff() {
		return abstract();
	}
	startOf() {
		return abstract();
	}
	endOf() {
		return abstract();
	}
} };
function binarySearch(metaset, axis, value, intersect) {
	const { controller, data, _sorted } = metaset;
	const iScale = controller._cachedMeta.iScale;
	const spanGaps = metaset.dataset ? metaset.dataset.options ? metaset.dataset.options.spanGaps : null : null;
	if (iScale && axis === iScale.axis && axis !== "r" && _sorted && data.length) {
		const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
		if (!intersect) {
			const result = lookupMethod(data, axis, value);
			if (spanGaps) {
				const { vScale } = controller._cachedMeta;
				const { _parsed } = metaset;
				const distanceToDefinedLo = _parsed.slice(0, result.lo + 1).reverse().findIndex((point) => !isNullOrUndef(point[vScale.axis]));
				result.lo -= Math.max(0, distanceToDefinedLo);
				const distanceToDefinedHi = _parsed.slice(result.hi).findIndex((point) => !isNullOrUndef(point[vScale.axis]));
				result.hi += Math.max(0, distanceToDefinedHi);
			}
			return result;
		} else if (controller._sharedOptions) {
			const el = data[0];
			const range = typeof el.getRange === "function" && el.getRange(axis);
			if (range) {
				const start = lookupMethod(data, axis, value - range);
				const end = lookupMethod(data, axis, value + range);
				return {
					lo: start.lo,
					hi: end.hi
				};
			}
		}
	}
	return {
		lo: 0,
		hi: data.length - 1
	};
}
function evaluateInteractionItems(chart, axis, position, handler, intersect) {
	const metasets = chart.getSortedVisibleDatasetMetas();
	const value = position[axis];
	for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
		const { index, data } = metasets[i];
		const { lo, hi } = binarySearch(metasets[i], axis, value, intersect);
		for (let j = lo; j <= hi; ++j) {
			const element = data[j];
			if (!element.skip) handler(element, index, j);
		}
	}
}
function getDistanceMetricForAxis(axis) {
	const useX = axis.indexOf("x") !== -1;
	const useY = axis.indexOf("y") !== -1;
	return function(pt1, pt2) {
		const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
		const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
		return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
	};
}
function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
	const items = [];
	if (!includeInvisible && !chart.isPointInArea(position)) return items;
	const evaluationFunc = function(element, datasetIndex, index) {
		if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) return;
		if (element.inRange(position.x, position.y, useFinalPosition)) items.push({
			element,
			datasetIndex,
			index
		});
	};
	evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
	return items;
}
function getNearestRadialItems(chart, position, axis, useFinalPosition) {
	let items = [];
	function evaluationFunc(element, datasetIndex, index) {
		const { startAngle, endAngle } = element.getProps(["startAngle", "endAngle"], useFinalPosition);
		const { angle } = getAngleFromPoint(element, {
			x: position.x,
			y: position.y
		});
		if (_angleBetween(angle, startAngle, endAngle)) items.push({
			element,
			datasetIndex,
			index
		});
	}
	evaluateInteractionItems(chart, axis, position, evaluationFunc);
	return items;
}
function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
	let items = [];
	const distanceMetric = getDistanceMetricForAxis(axis);
	let minDistance = Number.POSITIVE_INFINITY;
	function evaluationFunc(element, datasetIndex, index) {
		const inRange = element.inRange(position.x, position.y, useFinalPosition);
		if (intersect && !inRange) return;
		const center = element.getCenterPoint(useFinalPosition);
		if (!(!!includeInvisible || chart.isPointInArea(center)) && !inRange) return;
		const distance = distanceMetric(position, center);
		if (distance < minDistance) {
			items = [{
				element,
				datasetIndex,
				index
			}];
			minDistance = distance;
		} else if (distance === minDistance) items.push({
			element,
			datasetIndex,
			index
		});
	}
	evaluateInteractionItems(chart, axis, position, evaluationFunc);
	return items;
}
function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
	if (!includeInvisible && !chart.isPointInArea(position)) return [];
	return axis === "r" && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
}
function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
	const items = [];
	const rangeMethod = axis === "x" ? "inXRange" : "inYRange";
	let intersectsItem = false;
	evaluateInteractionItems(chart, axis, position, (element, datasetIndex, index) => {
		if (element[rangeMethod] && element[rangeMethod](position[axis], useFinalPosition)) {
			items.push({
				element,
				datasetIndex,
				index
			});
			intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
		}
	});
	if (intersect && !intersectsItem) return [];
	return items;
}
var Interaction = {
	evaluateInteractionItems,
	modes: {
		index(chart, e, options, useFinalPosition) {
			const position = getRelativePosition(e, chart);
			const axis = options.axis || "x";
			const includeInvisible = options.includeInvisible || false;
			const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
			const elements = [];
			if (!items.length) return [];
			chart.getSortedVisibleDatasetMetas().forEach((meta) => {
				const index = items[0].index;
				const element = meta.data[index];
				if (element && !element.skip) elements.push({
					element,
					datasetIndex: meta.index,
					index
				});
			});
			return elements;
		},
		dataset(chart, e, options, useFinalPosition) {
			const position = getRelativePosition(e, chart);
			const axis = options.axis || "xy";
			const includeInvisible = options.includeInvisible || false;
			let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
			if (items.length > 0) {
				const datasetIndex = items[0].datasetIndex;
				const data = chart.getDatasetMeta(datasetIndex).data;
				items = [];
				for (let i = 0; i < data.length; ++i) items.push({
					element: data[i],
					datasetIndex,
					index: i
				});
			}
			return items;
		},
		point(chart, e, options, useFinalPosition) {
			return getIntersectItems(chart, getRelativePosition(e, chart), options.axis || "xy", useFinalPosition, options.includeInvisible || false);
		},
		nearest(chart, e, options, useFinalPosition) {
			const position = getRelativePosition(e, chart);
			const axis = options.axis || "xy";
			const includeInvisible = options.includeInvisible || false;
			return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
		},
		x(chart, e, options, useFinalPosition) {
			return getAxisItems(chart, getRelativePosition(e, chart), "x", options.intersect, useFinalPosition);
		},
		y(chart, e, options, useFinalPosition) {
			return getAxisItems(chart, getRelativePosition(e, chart), "y", options.intersect, useFinalPosition);
		}
	}
};
var STATIC_POSITIONS = [
	"left",
	"top",
	"right",
	"bottom"
];
function filterByPosition(array, position) {
	return array.filter((v) => v.pos === position);
}
function filterDynamicPositionByAxis(array, axis) {
	return array.filter((v) => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
}
function sortByWeight(array, reverse) {
	return array.sort((a, b) => {
		const v0 = reverse ? b : a;
		const v1 = reverse ? a : b;
		return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
	});
}
function wrapBoxes(boxes) {
	const layoutBoxes = [];
	let i, ilen, box, pos, stack, stackWeight;
	for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
		box = boxes[i];
		({position: pos, options: {stack, stackWeight = 1}} = box);
		layoutBoxes.push({
			index: i,
			box,
			pos,
			horizontal: box.isHorizontal(),
			weight: box.weight,
			stack: stack && pos + stack,
			stackWeight
		});
	}
	return layoutBoxes;
}
function buildStacks(layouts) {
	const stacks = {};
	for (const wrap of layouts) {
		const { stack, pos, stackWeight } = wrap;
		if (!stack || !STATIC_POSITIONS.includes(pos)) continue;
		const _stack = stacks[stack] || (stacks[stack] = {
			count: 0,
			placed: 0,
			weight: 0,
			size: 0
		});
		_stack.count++;
		_stack.weight += stackWeight;
	}
	return stacks;
}
function setLayoutDims(layouts, params) {
	const stacks = buildStacks(layouts);
	const { vBoxMaxWidth, hBoxMaxHeight } = params;
	let i, ilen, layout;
	for (i = 0, ilen = layouts.length; i < ilen; ++i) {
		layout = layouts[i];
		const { fullSize } = layout.box;
		const stack = stacks[layout.stack];
		const factor = stack && layout.stackWeight / stack.weight;
		if (layout.horizontal) {
			layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
			layout.height = hBoxMaxHeight;
		} else {
			layout.width = vBoxMaxWidth;
			layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
		}
	}
	return stacks;
}
function buildLayoutBoxes(boxes) {
	const layoutBoxes = wrapBoxes(boxes);
	const fullSize = sortByWeight(layoutBoxes.filter((wrap) => wrap.box.fullSize), true);
	const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
	const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
	const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
	const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
	const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
	const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
	return {
		fullSize,
		leftAndTop: left.concat(top),
		rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
		chartArea: filterByPosition(layoutBoxes, "chartArea"),
		vertical: left.concat(right).concat(centerVertical),
		horizontal: top.concat(bottom).concat(centerHorizontal)
	};
}
function getCombinedMax(maxPadding, chartArea, a, b) {
	return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
}
function updateMaxPadding(maxPadding, boxPadding) {
	maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
	maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
	maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
	maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
}
function updateDims(chartArea, params, layout, stacks) {
	const { pos, box } = layout;
	const maxPadding = chartArea.maxPadding;
	if (!isObject(pos)) {
		if (layout.size) chartArea[pos] -= layout.size;
		const stack = stacks[layout.stack] || {
			size: 0,
			count: 1
		};
		stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
		layout.size = stack.size / stack.count;
		chartArea[pos] += layout.size;
	}
	if (box.getPadding) updateMaxPadding(maxPadding, box.getPadding());
	const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
	const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
	const widthChanged = newWidth !== chartArea.w;
	const heightChanged = newHeight !== chartArea.h;
	chartArea.w = newWidth;
	chartArea.h = newHeight;
	return layout.horizontal ? {
		same: widthChanged,
		other: heightChanged
	} : {
		same: heightChanged,
		other: widthChanged
	};
}
function handleMaxPadding(chartArea) {
	const maxPadding = chartArea.maxPadding;
	function updatePos(pos) {
		const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
		chartArea[pos] += change;
		return change;
	}
	chartArea.y += updatePos("top");
	chartArea.x += updatePos("left");
	updatePos("right");
	updatePos("bottom");
}
function getMargins(horizontal, chartArea) {
	const maxPadding = chartArea.maxPadding;
	function marginForPositions(positions) {
		const margin = {
			left: 0,
			top: 0,
			right: 0,
			bottom: 0
		};
		positions.forEach((pos) => {
			margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
		});
		return margin;
	}
	return horizontal ? marginForPositions(["left", "right"]) : marginForPositions(["top", "bottom"]);
}
function fitBoxes(boxes, chartArea, params, stacks) {
	const refitBoxes = [];
	let i, ilen, layout, box, refit, changed;
	for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
		layout = boxes[i];
		box = layout.box;
		box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
		const { same, other } = updateDims(chartArea, params, layout, stacks);
		refit |= same && refitBoxes.length;
		changed = changed || other;
		if (!box.fullSize) refitBoxes.push(layout);
	}
	return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
}
function setBoxDims(box, left, top, width, height) {
	box.top = top;
	box.left = left;
	box.right = left + width;
	box.bottom = top + height;
	box.width = width;
	box.height = height;
}
function placeBoxes(boxes, chartArea, params, stacks) {
	const userPadding = params.padding;
	let { x, y } = chartArea;
	for (const layout of boxes) {
		const box = layout.box;
		const stack = stacks[layout.stack] || {
			count: 1,
			placed: 0,
			weight: 1
		};
		const weight = layout.stackWeight / stack.weight || 1;
		if (layout.horizontal) {
			const width = chartArea.w * weight;
			const height = stack.size || box.height;
			if (defined(stack.start)) y = stack.start;
			if (box.fullSize) setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
			else setBoxDims(box, chartArea.left + stack.placed, y, width, height);
			stack.start = y;
			stack.placed += width;
			y = box.bottom;
		} else {
			const height = chartArea.h * weight;
			const width = stack.size || box.width;
			if (defined(stack.start)) x = stack.start;
			if (box.fullSize) setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
			else setBoxDims(box, x, chartArea.top + stack.placed, width, height);
			stack.start = x;
			stack.placed += height;
			x = box.right;
		}
	}
	chartArea.x = x;
	chartArea.y = y;
}
var layouts = {
	addBox(chart, item) {
		if (!chart.boxes) chart.boxes = [];
		item.fullSize = item.fullSize || false;
		item.position = item.position || "top";
		item.weight = item.weight || 0;
		item._layers = item._layers || function() {
			return [{
				z: 0,
				draw(chartArea) {
					item.draw(chartArea);
				}
			}];
		};
		chart.boxes.push(item);
	},
	removeBox(chart, layoutItem) {
		const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
		if (index !== -1) chart.boxes.splice(index, 1);
	},
	configure(chart, item, options) {
		item.fullSize = options.fullSize;
		item.position = options.position;
		item.weight = options.weight;
	},
	update(chart, width, height, minPadding) {
		if (!chart) return;
		const padding = toPadding(chart.options.layout.padding);
		const availableWidth = Math.max(width - padding.width, 0);
		const availableHeight = Math.max(height - padding.height, 0);
		const boxes = buildLayoutBoxes(chart.boxes);
		const verticalBoxes = boxes.vertical;
		const horizontalBoxes = boxes.horizontal;
		each(chart.boxes, (box) => {
			if (typeof box.beforeLayout === "function") box.beforeLayout();
		});
		const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
		const params = Object.freeze({
			outerWidth: width,
			outerHeight: height,
			padding,
			availableWidth,
			availableHeight,
			vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
			hBoxMaxHeight: availableHeight / 2
		});
		const maxPadding = Object.assign({}, padding);
		updateMaxPadding(maxPadding, toPadding(minPadding));
		const chartArea = Object.assign({
			maxPadding,
			w: availableWidth,
			h: availableHeight,
			x: padding.left,
			y: padding.top
		}, padding);
		const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
		fitBoxes(boxes.fullSize, chartArea, params, stacks);
		fitBoxes(verticalBoxes, chartArea, params, stacks);
		if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) fitBoxes(verticalBoxes, chartArea, params, stacks);
		handleMaxPadding(chartArea);
		placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
		chartArea.x += chartArea.w;
		chartArea.y += chartArea.h;
		placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
		chart.chartArea = {
			left: chartArea.left,
			top: chartArea.top,
			right: chartArea.left + chartArea.w,
			bottom: chartArea.top + chartArea.h,
			height: chartArea.h,
			width: chartArea.w
		};
		each(boxes.chartArea, (layout) => {
			const box = layout.box;
			Object.assign(box, chart.chartArea);
			box.update(chartArea.w, chartArea.h, {
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			});
		});
	}
};
var BasePlatform = class {
	acquireContext(canvas, aspectRatio) {}
	releaseContext(context) {
		return false;
	}
	addEventListener(chart, type, listener) {}
	removeEventListener(chart, type, listener) {}
	getDevicePixelRatio() {
		return 1;
	}
	getMaximumSize(element, width, height, aspectRatio) {
		width = Math.max(0, width || element.width);
		height = height || element.height;
		return {
			width,
			height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
		};
	}
	isAttached(canvas) {
		return true;
	}
	updateConfig(config) {}
};
var BasicPlatform = class extends BasePlatform {
	acquireContext(item) {
		return item && item.getContext && item.getContext("2d") || null;
	}
	updateConfig(config) {
		config.options.animation = false;
	}
};
var EXPANDO_KEY = "$chartjs";
var EVENT_TYPES = {
	touchstart: "mousedown",
	touchmove: "mousemove",
	touchend: "mouseup",
	pointerenter: "mouseenter",
	pointerdown: "mousedown",
	pointermove: "mousemove",
	pointerup: "mouseup",
	pointerleave: "mouseout",
	pointerout: "mouseout"
};
var isNullOrEmpty = (value) => value === null || value === "";
function initCanvas(canvas, aspectRatio) {
	const style = canvas.style;
	const renderHeight = canvas.getAttribute("height");
	const renderWidth = canvas.getAttribute("width");
	canvas[EXPANDO_KEY] = { initial: {
		height: renderHeight,
		width: renderWidth,
		style: {
			display: style.display,
			height: style.height,
			width: style.width
		}
	} };
	style.display = style.display || "block";
	style.boxSizing = style.boxSizing || "border-box";
	if (isNullOrEmpty(renderWidth)) {
		const displayWidth = readUsedSize(canvas, "width");
		if (displayWidth !== void 0) canvas.width = displayWidth;
	}
	if (isNullOrEmpty(renderHeight)) if (canvas.style.height === "") canvas.height = canvas.width / (aspectRatio || 2);
	else {
		const displayHeight = readUsedSize(canvas, "height");
		if (displayHeight !== void 0) canvas.height = displayHeight;
	}
	return canvas;
}
var eventListenerOptions = supportsEventListenerOptions ? { passive: true } : false;
function addListener(node, type, listener) {
	if (node) node.addEventListener(type, listener, eventListenerOptions);
}
function removeListener(chart, type, listener) {
	if (chart && chart.canvas) chart.canvas.removeEventListener(type, listener, eventListenerOptions);
}
function fromNativeEvent(event, chart) {
	const type = EVENT_TYPES[event.type] || event.type;
	const { x, y } = getRelativePosition(event, chart);
	return {
		type,
		chart,
		native: event,
		x: x !== void 0 ? x : null,
		y: y !== void 0 ? y : null
	};
}
function nodeListContains(nodeList, canvas) {
	for (const node of nodeList) if (node === canvas || node.contains(canvas)) return true;
}
function createAttachObserver(chart, type, listener) {
	const canvas = chart.canvas;
	const observer = new MutationObserver((entries) => {
		let trigger = false;
		for (const entry of entries) {
			trigger = trigger || nodeListContains(entry.addedNodes, canvas);
			trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
		}
		if (trigger) listener();
	});
	observer.observe(document, {
		childList: true,
		subtree: true
	});
	return observer;
}
function createDetachObserver(chart, type, listener) {
	const canvas = chart.canvas;
	const observer = new MutationObserver((entries) => {
		let trigger = false;
		for (const entry of entries) {
			trigger = trigger || nodeListContains(entry.removedNodes, canvas);
			trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
		}
		if (trigger) listener();
	});
	observer.observe(document, {
		childList: true,
		subtree: true
	});
	return observer;
}
var drpListeningCharts = /* @__PURE__ */ new Map();
var oldDevicePixelRatio = 0;
function onWindowResize() {
	const dpr = window.devicePixelRatio;
	if (dpr === oldDevicePixelRatio) return;
	oldDevicePixelRatio = dpr;
	drpListeningCharts.forEach((resize, chart) => {
		if (chart.currentDevicePixelRatio !== dpr) resize();
	});
}
function listenDevicePixelRatioChanges(chart, resize) {
	if (!drpListeningCharts.size) window.addEventListener("resize", onWindowResize);
	drpListeningCharts.set(chart, resize);
}
function unlistenDevicePixelRatioChanges(chart) {
	drpListeningCharts.delete(chart);
	if (!drpListeningCharts.size) window.removeEventListener("resize", onWindowResize);
}
function createResizeObserver(chart, type, listener) {
	const canvas = chart.canvas;
	const container = canvas && _getParentNode(canvas);
	if (!container) return;
	const resize = throttled((width, height) => {
		const w = container.clientWidth;
		listener(width, height);
		if (w < container.clientWidth) listener();
	}, window);
	const observer = new ResizeObserver((entries) => {
		const entry = entries[0];
		const width = entry.contentRect.width;
		const height = entry.contentRect.height;
		if (width === 0 && height === 0) return;
		resize(width, height);
	});
	observer.observe(container);
	listenDevicePixelRatioChanges(chart, resize);
	return observer;
}
function releaseObserver(chart, type, observer) {
	if (observer) observer.disconnect();
	if (type === "resize") unlistenDevicePixelRatioChanges(chart);
}
function createProxyAndListen(chart, type, listener) {
	const canvas = chart.canvas;
	const proxy = throttled((event) => {
		if (chart.ctx !== null) listener(fromNativeEvent(event, chart));
	}, chart);
	addListener(canvas, type, proxy);
	return proxy;
}
var DomPlatform = class extends BasePlatform {
	acquireContext(canvas, aspectRatio) {
		const context = canvas && canvas.getContext && canvas.getContext("2d");
		if (context && context.canvas === canvas) {
			initCanvas(canvas, aspectRatio);
			return context;
		}
		return null;
	}
	releaseContext(context) {
		const canvas = context.canvas;
		if (!canvas[EXPANDO_KEY]) return false;
		const initial = canvas[EXPANDO_KEY].initial;
		["height", "width"].forEach((prop) => {
			const value = initial[prop];
			if (isNullOrUndef(value)) canvas.removeAttribute(prop);
			else canvas.setAttribute(prop, value);
		});
		const style = initial.style || {};
		Object.keys(style).forEach((key) => {
			canvas.style[key] = style[key];
		});
		canvas.width = canvas.width;
		delete canvas[EXPANDO_KEY];
		return true;
	}
	addEventListener(chart, type, listener) {
		this.removeEventListener(chart, type);
		const proxies = chart.$proxies || (chart.$proxies = {});
		proxies[type] = ({
			attach: createAttachObserver,
			detach: createDetachObserver,
			resize: createResizeObserver
		}[type] || createProxyAndListen)(chart, type, listener);
	}
	removeEventListener(chart, type) {
		const proxies = chart.$proxies || (chart.$proxies = {});
		const proxy = proxies[type];
		if (!proxy) return;
		({
			attach: releaseObserver,
			detach: releaseObserver,
			resize: releaseObserver
		}[type] || removeListener)(chart, type, proxy);
		proxies[type] = void 0;
	}
	getDevicePixelRatio() {
		return window.devicePixelRatio;
	}
	getMaximumSize(canvas, width, height, aspectRatio) {
		return getMaximumSize(canvas, width, height, aspectRatio);
	}
	isAttached(canvas) {
		const container = canvas && _getParentNode(canvas);
		return !!(container && container.isConnected);
	}
};
function _detectPlatform(canvas) {
	if (!_isDomSupported() || typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) return BasicPlatform;
	return DomPlatform;
}
var Element$1 = class {
	static defaults = {};
	static defaultRoutes = void 0;
	x;
	y;
	active = false;
	options;
	$animations;
	tooltipPosition(useFinalPosition) {
		const { x, y } = this.getProps(["x", "y"], useFinalPosition);
		return {
			x,
			y
		};
	}
	hasValue() {
		return isNumber(this.x) && isNumber(this.y);
	}
	getProps(props, final) {
		const anims = this.$animations;
		if (!final || !anims) return this;
		const ret = {};
		props.forEach((prop) => {
			ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
		});
		return ret;
	}
};
function autoSkip(scale, ticks) {
	const tickOpts = scale.options.ticks;
	const determinedMaxTicks = determineMaxTicks(scale);
	const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
	const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
	const numMajorIndices = majorIndices.length;
	const first = majorIndices[0];
	const last = majorIndices[numMajorIndices - 1];
	const newTicks = [];
	if (numMajorIndices > ticksLimit) {
		skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
		return newTicks;
	}
	const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
	if (numMajorIndices > 0) {
		let i, ilen;
		const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
		skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
		for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
		skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
		return newTicks;
	}
	skip(ticks, newTicks, spacing);
	return newTicks;
}
function determineMaxTicks(scale) {
	const offset = scale.options.offset;
	const tickLength = scale._tickSize();
	const maxScale = scale._length / tickLength + (offset ? 0 : 1);
	const maxChart = scale._maxLength / tickLength;
	return Math.floor(Math.min(maxScale, maxChart));
}
function calculateSpacing(majorIndices, ticks, ticksLimit) {
	const evenMajorSpacing = getEvenSpacing(majorIndices);
	const spacing = ticks.length / ticksLimit;
	if (!evenMajorSpacing) return Math.max(spacing, 1);
	const factors = _factorize(evenMajorSpacing);
	for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
		const factor = factors[i];
		if (factor > spacing) return factor;
	}
	return Math.max(spacing, 1);
}
function getMajorIndices(ticks) {
	const result = [];
	let i, ilen;
	for (i = 0, ilen = ticks.length; i < ilen; i++) if (ticks[i].major) result.push(i);
	return result;
}
function skipMajors(ticks, newTicks, majorIndices, spacing) {
	let count = 0;
	let next = majorIndices[0];
	let i;
	spacing = Math.ceil(spacing);
	for (i = 0; i < ticks.length; i++) if (i === next) {
		newTicks.push(ticks[i]);
		count++;
		next = majorIndices[count * spacing];
	}
}
function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
	const start = valueOrDefault(majorStart, 0);
	const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
	let count = 0;
	let length, i, next;
	spacing = Math.ceil(spacing);
	if (majorEnd) {
		length = majorEnd - majorStart;
		spacing = length / Math.floor(length / spacing);
	}
	next = start;
	while (next < 0) {
		count++;
		next = Math.round(start + count * spacing);
	}
	for (i = Math.max(start, 0); i < end; i++) if (i === next) {
		newTicks.push(ticks[i]);
		count++;
		next = Math.round(start + count * spacing);
	}
}
function getEvenSpacing(arr) {
	const len = arr.length;
	let i, diff;
	if (len < 2) return false;
	for (diff = arr[0], i = 1; i < len; ++i) if (arr[i] - arr[i - 1] !== diff) return false;
	return diff;
}
var reverseAlign = (align) => align === "left" ? "right" : align === "right" ? "left" : align;
var offsetFromEdge = (scale, edge, offset) => edge === "top" || edge === "left" ? scale[edge] + offset : scale[edge] - offset;
var getTicksLimit = (ticksLength, maxTicksLimit) => Math.min(maxTicksLimit || ticksLength, ticksLength);
function sample(arr, numItems) {
	const result = [];
	const increment = arr.length / numItems;
	const len = arr.length;
	let i = 0;
	for (; i < len; i += increment) result.push(arr[Math.floor(i)]);
	return result;
}
function getPixelForGridLine(scale, index, offsetGridLines) {
	const length = scale.ticks.length;
	const validIndex = Math.min(index, length - 1);
	const start = scale._startPixel;
	const end = scale._endPixel;
	const epsilon = 1e-6;
	let lineValue = scale.getPixelForTick(validIndex);
	let offset;
	if (offsetGridLines) {
		if (length === 1) offset = Math.max(lineValue - start, end - lineValue);
		else if (index === 0) offset = (scale.getPixelForTick(1) - lineValue) / 2;
		else offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
		lineValue += validIndex < index ? offset : -offset;
		if (lineValue < start - epsilon || lineValue > end + epsilon) return;
	}
	return lineValue;
}
function garbageCollect(caches, length) {
	each(caches, (cache) => {
		const gc = cache.gc;
		const gcLen = gc.length / 2;
		let i;
		if (gcLen > length) {
			for (i = 0; i < gcLen; ++i) delete cache.data[gc[i]];
			gc.splice(0, gcLen);
		}
	});
}
function getTickMarkLength(options) {
	return options.drawTicks ? options.tickLength : 0;
}
function getTitleHeight(options, fallback) {
	if (!options.display) return 0;
	const font = toFont(options.font, fallback);
	const padding = toPadding(options.padding);
	return (isArray(options.text) ? options.text.length : 1) * font.lineHeight + padding.height;
}
function createScaleContext(parent, scale) {
	return createContext(parent, {
		scale,
		type: "scale"
	});
}
function createTickContext(parent, index, tick) {
	return createContext(parent, {
		tick,
		index,
		type: "tick"
	});
}
function titleAlign(align, position, reverse) {
	let ret = _toLeftRightCenter(align);
	if (reverse && position !== "right" || !reverse && position === "right") ret = reverseAlign(ret);
	return ret;
}
function titleArgs(scale, offset, position, align) {
	const { top, left, bottom, right, chart } = scale;
	const { chartArea, scales } = chart;
	let rotation = 0;
	let maxWidth, titleX, titleY;
	const height = bottom - top;
	const width = right - left;
	if (scale.isHorizontal()) {
		titleX = _alignStartEnd(align, left, right);
		if (isObject(position)) {
			const positionAxisID = Object.keys(position)[0];
			const value = position[positionAxisID];
			titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
		} else if (position === "center") titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
		else titleY = offsetFromEdge(scale, position, offset);
		maxWidth = right - left;
	} else {
		if (isObject(position)) {
			const positionAxisID = Object.keys(position)[0];
			const value = position[positionAxisID];
			titleX = scales[positionAxisID].getPixelForValue(value) - width + offset;
		} else if (position === "center") titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
		else titleX = offsetFromEdge(scale, position, offset);
		titleY = _alignStartEnd(align, bottom, top);
		rotation = position === "left" ? -HALF_PI : HALF_PI;
	}
	return {
		titleX,
		titleY,
		maxWidth,
		rotation
	};
}
var Scale = class Scale extends Element$1 {
	constructor(cfg) {
		super();
		this.id = cfg.id;
		this.type = cfg.type;
		this.options = void 0;
		this.ctx = cfg.ctx;
		this.chart = cfg.chart;
		this.top = void 0;
		this.bottom = void 0;
		this.left = void 0;
		this.right = void 0;
		this.width = void 0;
		this.height = void 0;
		this._margins = {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		};
		this.maxWidth = void 0;
		this.maxHeight = void 0;
		this.paddingTop = void 0;
		this.paddingBottom = void 0;
		this.paddingLeft = void 0;
		this.paddingRight = void 0;
		this.axis = void 0;
		this.labelRotation = void 0;
		this.min = void 0;
		this.max = void 0;
		this._range = void 0;
		this.ticks = [];
		this._gridLineItems = null;
		this._labelItems = null;
		this._labelSizes = null;
		this._length = 0;
		this._maxLength = 0;
		this._longestTextCache = {};
		this._startPixel = void 0;
		this._endPixel = void 0;
		this._reversePixels = false;
		this._userMax = void 0;
		this._userMin = void 0;
		this._suggestedMax = void 0;
		this._suggestedMin = void 0;
		this._ticksLength = 0;
		this._borderValue = 0;
		this._cache = {};
		this._dataLimitsCached = false;
		this.$context = void 0;
	}
	init(options) {
		this.options = options.setContext(this.getContext());
		this.axis = options.axis;
		this._userMin = this.parse(options.min);
		this._userMax = this.parse(options.max);
		this._suggestedMin = this.parse(options.suggestedMin);
		this._suggestedMax = this.parse(options.suggestedMax);
	}
	parse(raw, index) {
		return raw;
	}
	getUserBounds() {
		let { _userMin, _userMax, _suggestedMin, _suggestedMax } = this;
		_userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
		_userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
		_suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
		_suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
		return {
			min: finiteOrDefault(_userMin, _suggestedMin),
			max: finiteOrDefault(_userMax, _suggestedMax),
			minDefined: isNumberFinite(_userMin),
			maxDefined: isNumberFinite(_userMax)
		};
	}
	getMinMax(canStack) {
		let { min, max, minDefined, maxDefined } = this.getUserBounds();
		let range;
		if (minDefined && maxDefined) return {
			min,
			max
		};
		const metas = this.getMatchingVisibleMetas();
		for (let i = 0, ilen = metas.length; i < ilen; ++i) {
			range = metas[i].controller.getMinMax(this, canStack);
			if (!minDefined) min = Math.min(min, range.min);
			if (!maxDefined) max = Math.max(max, range.max);
		}
		min = maxDefined && min > max ? max : min;
		max = minDefined && min > max ? min : max;
		return {
			min: finiteOrDefault(min, finiteOrDefault(max, min)),
			max: finiteOrDefault(max, finiteOrDefault(min, max))
		};
	}
	getPadding() {
		return {
			left: this.paddingLeft || 0,
			top: this.paddingTop || 0,
			right: this.paddingRight || 0,
			bottom: this.paddingBottom || 0
		};
	}
	getTicks() {
		return this.ticks;
	}
	getLabels() {
		const data = this.chart.data;
		return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
	}
	getLabelItems(chartArea = this.chart.chartArea) {
		return this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
	}
	beforeLayout() {
		this._cache = {};
		this._dataLimitsCached = false;
	}
	beforeUpdate() {
		callback(this.options.beforeUpdate, [this]);
	}
	update(maxWidth, maxHeight, margins) {
		const { beginAtZero, grace, ticks: tickOpts } = this.options;
		const sampleSize = tickOpts.sampleSize;
		this.beforeUpdate();
		this.maxWidth = maxWidth;
		this.maxHeight = maxHeight;
		this._margins = margins = Object.assign({
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}, margins);
		this.ticks = null;
		this._labelSizes = null;
		this._gridLineItems = null;
		this._labelItems = null;
		this.beforeSetDimensions();
		this.setDimensions();
		this.afterSetDimensions();
		this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
		if (!this._dataLimitsCached) {
			this.beforeDataLimits();
			this.determineDataLimits();
			this.afterDataLimits();
			this._range = _addGrace(this, grace, beginAtZero);
			this._dataLimitsCached = true;
		}
		this.beforeBuildTicks();
		this.ticks = this.buildTicks() || [];
		this.afterBuildTicks();
		const samplingEnabled = sampleSize < this.ticks.length;
		this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
		this.configure();
		this.beforeCalculateLabelRotation();
		this.calculateLabelRotation();
		this.afterCalculateLabelRotation();
		if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto")) {
			this.ticks = autoSkip(this, this.ticks);
			this._labelSizes = null;
			this.afterAutoSkip();
		}
		if (samplingEnabled) this._convertTicksToLabels(this.ticks);
		this.beforeFit();
		this.fit();
		this.afterFit();
		this.afterUpdate();
	}
	configure() {
		let reversePixels = this.options.reverse;
		let startPixel, endPixel;
		if (this.isHorizontal()) {
			startPixel = this.left;
			endPixel = this.right;
		} else {
			startPixel = this.top;
			endPixel = this.bottom;
			reversePixels = !reversePixels;
		}
		this._startPixel = startPixel;
		this._endPixel = endPixel;
		this._reversePixels = reversePixels;
		this._length = endPixel - startPixel;
		this._alignToPixels = this.options.alignToPixels;
	}
	afterUpdate() {
		callback(this.options.afterUpdate, [this]);
	}
	beforeSetDimensions() {
		callback(this.options.beforeSetDimensions, [this]);
	}
	setDimensions() {
		if (this.isHorizontal()) {
			this.width = this.maxWidth;
			this.left = 0;
			this.right = this.width;
		} else {
			this.height = this.maxHeight;
			this.top = 0;
			this.bottom = this.height;
		}
		this.paddingLeft = 0;
		this.paddingTop = 0;
		this.paddingRight = 0;
		this.paddingBottom = 0;
	}
	afterSetDimensions() {
		callback(this.options.afterSetDimensions, [this]);
	}
	_callHooks(name) {
		this.chart.notifyPlugins(name, this.getContext());
		callback(this.options[name], [this]);
	}
	beforeDataLimits() {
		this._callHooks("beforeDataLimits");
	}
	determineDataLimits() {}
	afterDataLimits() {
		this._callHooks("afterDataLimits");
	}
	beforeBuildTicks() {
		this._callHooks("beforeBuildTicks");
	}
	buildTicks() {
		return [];
	}
	afterBuildTicks() {
		this._callHooks("afterBuildTicks");
	}
	beforeTickToLabelConversion() {
		callback(this.options.beforeTickToLabelConversion, [this]);
	}
	generateTickLabels(ticks) {
		const tickOpts = this.options.ticks;
		let i, ilen, tick;
		for (i = 0, ilen = ticks.length; i < ilen; i++) {
			tick = ticks[i];
			tick.label = callback(tickOpts.callback, [
				tick.value,
				i,
				ticks
			], this);
		}
	}
	afterTickToLabelConversion() {
		callback(this.options.afterTickToLabelConversion, [this]);
	}
	beforeCalculateLabelRotation() {
		callback(this.options.beforeCalculateLabelRotation, [this]);
	}
	calculateLabelRotation() {
		const options = this.options;
		const tickOpts = options.ticks;
		const numTicks = getTicksLimit(this.ticks.length, options.ticks.maxTicksLimit);
		const minRotation = tickOpts.minRotation || 0;
		const maxRotation = tickOpts.maxRotation;
		let labelRotation = minRotation;
		let tickWidth, maxHeight, maxLabelDiagonal;
		if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
			this.labelRotation = minRotation;
			return;
		}
		const labelSizes = this._getLabelSizes();
		const maxLabelWidth = labelSizes.widest.width;
		const maxLabelHeight = labelSizes.highest.height;
		const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
		tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
		if (maxLabelWidth + 6 > tickWidth) {
			tickWidth = maxWidth / (numTicks - (options.offset ? .5 : 1));
			maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
			maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
			labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
			labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
		}
		this.labelRotation = labelRotation;
	}
	afterCalculateLabelRotation() {
		callback(this.options.afterCalculateLabelRotation, [this]);
	}
	afterAutoSkip() {}
	beforeFit() {
		callback(this.options.beforeFit, [this]);
	}
	fit() {
		const minSize = {
			width: 0,
			height: 0
		};
		const { chart, options: { ticks: tickOpts, title: titleOpts, grid: gridOpts } } = this;
		const display = this._isVisible();
		const isHorizontal = this.isHorizontal();
		if (display) {
			const titleHeight = getTitleHeight(titleOpts, chart.options.font);
			if (isHorizontal) {
				minSize.width = this.maxWidth;
				minSize.height = getTickMarkLength(gridOpts) + titleHeight;
			} else {
				minSize.height = this.maxHeight;
				minSize.width = getTickMarkLength(gridOpts) + titleHeight;
			}
			if (tickOpts.display && this.ticks.length) {
				const { first, last, widest, highest } = this._getLabelSizes();
				const tickPadding = tickOpts.padding * 2;
				const angleRadians = toRadians(this.labelRotation);
				const cos = Math.cos(angleRadians);
				const sin = Math.sin(angleRadians);
				if (isHorizontal) {
					const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
					minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
				} else {
					const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
					minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
				}
				this._calculatePadding(first, last, sin, cos);
			}
		}
		this._handleMargins();
		if (isHorizontal) {
			this.width = this._length = chart.width - this._margins.left - this._margins.right;
			this.height = minSize.height;
		} else {
			this.width = minSize.width;
			this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
		}
	}
	_calculatePadding(first, last, sin, cos) {
		const { ticks: { align, padding }, position } = this.options;
		const isRotated = this.labelRotation !== 0;
		const labelsBelowTicks = position !== "top" && this.axis === "x";
		if (this.isHorizontal()) {
			const offsetLeft = this.getPixelForTick(0) - this.left;
			const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
			let paddingLeft = 0;
			let paddingRight = 0;
			if (isRotated) if (labelsBelowTicks) {
				paddingLeft = cos * first.width;
				paddingRight = sin * last.height;
			} else {
				paddingLeft = sin * first.height;
				paddingRight = cos * last.width;
			}
			else if (align === "start") paddingRight = last.width;
			else if (align === "end") paddingLeft = first.width;
			else if (align !== "inner") {
				paddingLeft = first.width / 2;
				paddingRight = last.width / 2;
			}
			this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
			this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
		} else {
			let paddingTop = last.height / 2;
			let paddingBottom = first.height / 2;
			if (align === "start") {
				paddingTop = 0;
				paddingBottom = first.height;
			} else if (align === "end") {
				paddingTop = last.height;
				paddingBottom = 0;
			}
			this.paddingTop = paddingTop + padding;
			this.paddingBottom = paddingBottom + padding;
		}
	}
	_handleMargins() {
		if (this._margins) {
			this._margins.left = Math.max(this.paddingLeft, this._margins.left);
			this._margins.top = Math.max(this.paddingTop, this._margins.top);
			this._margins.right = Math.max(this.paddingRight, this._margins.right);
			this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
		}
	}
	afterFit() {
		callback(this.options.afterFit, [this]);
	}
	isHorizontal() {
		const { axis, position } = this.options;
		return position === "top" || position === "bottom" || axis === "x";
	}
	isFullSize() {
		return this.options.fullSize;
	}
	_convertTicksToLabels(ticks) {
		this.beforeTickToLabelConversion();
		this.generateTickLabels(ticks);
		let i, ilen;
		for (i = 0, ilen = ticks.length; i < ilen; i++) if (isNullOrUndef(ticks[i].label)) {
			ticks.splice(i, 1);
			ilen--;
			i--;
		}
		this.afterTickToLabelConversion();
	}
	_getLabelSizes() {
		let labelSizes = this._labelSizes;
		if (!labelSizes) {
			const sampleSize = this.options.ticks.sampleSize;
			let ticks = this.ticks;
			if (sampleSize < ticks.length) ticks = sample(ticks, sampleSize);
			this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length, this.options.ticks.maxTicksLimit);
		}
		return labelSizes;
	}
	_computeLabelSizes(ticks, length, maxTicksLimit) {
		const { ctx, _longestTextCache: caches } = this;
		const widths = [];
		const heights = [];
		const increment = Math.floor(length / getTicksLimit(length, maxTicksLimit));
		let widestLabelSize = 0;
		let highestLabelSize = 0;
		let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
		for (i = 0; i < length; i += increment) {
			label = ticks[i].label;
			tickFont = this._resolveTickFontOptions(i);
			ctx.font = fontString = tickFont.string;
			cache = caches[fontString] = caches[fontString] || {
				data: {},
				gc: []
			};
			lineHeight = tickFont.lineHeight;
			width = height = 0;
			if (!isNullOrUndef(label) && !isArray(label)) {
				width = _measureText(ctx, cache.data, cache.gc, width, label);
				height = lineHeight;
			} else if (isArray(label)) for (j = 0, jlen = label.length; j < jlen; ++j) {
				nestedLabel = label[j];
				if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
					width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
					height += lineHeight;
				}
			}
			widths.push(width);
			heights.push(height);
			widestLabelSize = Math.max(width, widestLabelSize);
			highestLabelSize = Math.max(height, highestLabelSize);
		}
		garbageCollect(caches, length);
		const widest = widths.indexOf(widestLabelSize);
		const highest = heights.indexOf(highestLabelSize);
		const valueAt = (idx) => ({
			width: widths[idx] || 0,
			height: heights[idx] || 0
		});
		return {
			first: valueAt(0),
			last: valueAt(length - 1),
			widest: valueAt(widest),
			highest: valueAt(highest),
			widths,
			heights
		};
	}
	getLabelForValue(value) {
		return value;
	}
	getPixelForValue(value, index) {
		return NaN;
	}
	getValueForPixel(pixel) {}
	getPixelForTick(index) {
		const ticks = this.ticks;
		if (index < 0 || index > ticks.length - 1) return null;
		return this.getPixelForValue(ticks[index].value);
	}
	getPixelForDecimal(decimal) {
		if (this._reversePixels) decimal = 1 - decimal;
		const pixel = this._startPixel + decimal * this._length;
		return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
	}
	getDecimalForPixel(pixel) {
		const decimal = (pixel - this._startPixel) / this._length;
		return this._reversePixels ? 1 - decimal : decimal;
	}
	getBasePixel() {
		return this.getPixelForValue(this.getBaseValue());
	}
	getBaseValue() {
		const { min, max } = this;
		return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
	}
	getContext(index) {
		const ticks = this.ticks || [];
		if (index >= 0 && index < ticks.length) {
			const tick = ticks[index];
			return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
		}
		return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
	}
	_tickSize() {
		const optionTicks = this.options.ticks;
		const rot = toRadians(this.labelRotation);
		const cos = Math.abs(Math.cos(rot));
		const sin = Math.abs(Math.sin(rot));
		const labelSizes = this._getLabelSizes();
		const padding = optionTicks.autoSkipPadding || 0;
		const w = labelSizes ? labelSizes.widest.width + padding : 0;
		const h = labelSizes ? labelSizes.highest.height + padding : 0;
		return this.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
	}
	_isVisible() {
		const display = this.options.display;
		if (display !== "auto") return !!display;
		return this.getMatchingVisibleMetas().length > 0;
	}
	_computeGridLineItems(chartArea) {
		const axis = this.axis;
		const chart = this.chart;
		const options = this.options;
		const { grid, position, border } = options;
		const offset = grid.offset;
		const isHorizontal = this.isHorizontal();
		const ticksLength = this.ticks.length + (offset ? 1 : 0);
		const tl = getTickMarkLength(grid);
		const items = [];
		const borderOpts = border.setContext(this.getContext());
		const axisWidth = borderOpts.display ? borderOpts.width : 0;
		const axisHalfWidth = axisWidth / 2;
		const alignBorderValue = function(pixel) {
			return _alignPixel(chart, pixel, axisWidth);
		};
		let borderValue, i, lineValue, alignedLineValue;
		let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
		if (position === "top") {
			borderValue = alignBorderValue(this.bottom);
			ty1 = this.bottom - tl;
			ty2 = borderValue - axisHalfWidth;
			y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
			y2 = chartArea.bottom;
		} else if (position === "bottom") {
			borderValue = alignBorderValue(this.top);
			y1 = chartArea.top;
			y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
			ty1 = borderValue + axisHalfWidth;
			ty2 = this.top + tl;
		} else if (position === "left") {
			borderValue = alignBorderValue(this.right);
			tx1 = this.right - tl;
			tx2 = borderValue - axisHalfWidth;
			x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
			x2 = chartArea.right;
		} else if (position === "right") {
			borderValue = alignBorderValue(this.left);
			x1 = chartArea.left;
			x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
			tx1 = borderValue + axisHalfWidth;
			tx2 = this.left + tl;
		} else if (axis === "x") {
			if (position === "center") borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + .5);
			else if (isObject(position)) {
				const positionAxisID = Object.keys(position)[0];
				const value = position[positionAxisID];
				borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
			}
			y1 = chartArea.top;
			y2 = chartArea.bottom;
			ty1 = borderValue + axisHalfWidth;
			ty2 = ty1 + tl;
		} else if (axis === "y") {
			if (position === "center") borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
			else if (isObject(position)) {
				const positionAxisID = Object.keys(position)[0];
				const value = position[positionAxisID];
				borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
			}
			tx1 = borderValue - axisHalfWidth;
			tx2 = tx1 - tl;
			x1 = chartArea.left;
			x2 = chartArea.right;
		}
		const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
		const step = Math.max(1, Math.ceil(ticksLength / limit));
		for (i = 0; i < ticksLength; i += step) {
			const context = this.getContext(i);
			const optsAtIndex = grid.setContext(context);
			const optsAtIndexBorder = border.setContext(context);
			const lineWidth = optsAtIndex.lineWidth;
			const lineColor = optsAtIndex.color;
			const borderDash = optsAtIndexBorder.dash || [];
			const borderDashOffset = optsAtIndexBorder.dashOffset;
			const tickWidth = optsAtIndex.tickWidth;
			const tickColor = optsAtIndex.tickColor;
			const tickBorderDash = optsAtIndex.tickBorderDash || [];
			const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
			lineValue = getPixelForGridLine(this, i, offset);
			if (lineValue === void 0) continue;
			alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
			if (isHorizontal) tx1 = tx2 = x1 = x2 = alignedLineValue;
			else ty1 = ty2 = y1 = y2 = alignedLineValue;
			items.push({
				tx1,
				ty1,
				tx2,
				ty2,
				x1,
				y1,
				x2,
				y2,
				width: lineWidth,
				color: lineColor,
				borderDash,
				borderDashOffset,
				tickWidth,
				tickColor,
				tickBorderDash,
				tickBorderDashOffset
			});
		}
		this._ticksLength = ticksLength;
		this._borderValue = borderValue;
		return items;
	}
	_computeLabelItems(chartArea) {
		const axis = this.axis;
		const options = this.options;
		const { position, ticks: optionTicks } = options;
		const isHorizontal = this.isHorizontal();
		const ticks = this.ticks;
		const { align, crossAlign, padding, mirror } = optionTicks;
		const tl = getTickMarkLength(options.grid);
		const tickAndPadding = tl + padding;
		const hTickAndPadding = mirror ? -padding : tickAndPadding;
		const rotation = -toRadians(this.labelRotation);
		const items = [];
		let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
		let textBaseline = "middle";
		if (position === "top") {
			y = this.bottom - hTickAndPadding;
			textAlign = this._getXAxisLabelAlignment();
		} else if (position === "bottom") {
			y = this.top + hTickAndPadding;
			textAlign = this._getXAxisLabelAlignment();
		} else if (position === "left") {
			const ret = this._getYAxisLabelAlignment(tl);
			textAlign = ret.textAlign;
			x = ret.x;
		} else if (position === "right") {
			const ret = this._getYAxisLabelAlignment(tl);
			textAlign = ret.textAlign;
			x = ret.x;
		} else if (axis === "x") {
			if (position === "center") y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
			else if (isObject(position)) {
				const positionAxisID = Object.keys(position)[0];
				const value = position[positionAxisID];
				y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
			}
			textAlign = this._getXAxisLabelAlignment();
		} else if (axis === "y") {
			if (position === "center") x = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
			else if (isObject(position)) {
				const positionAxisID = Object.keys(position)[0];
				const value = position[positionAxisID];
				x = this.chart.scales[positionAxisID].getPixelForValue(value);
			}
			textAlign = this._getYAxisLabelAlignment(tl).textAlign;
		}
		if (axis === "y") {
			if (align === "start") textBaseline = "top";
			else if (align === "end") textBaseline = "bottom";
		}
		const labelSizes = this._getLabelSizes();
		for (i = 0, ilen = ticks.length; i < ilen; ++i) {
			tick = ticks[i];
			label = tick.label;
			const optsAtIndex = optionTicks.setContext(this.getContext(i));
			pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
			font = this._resolveTickFontOptions(i);
			lineHeight = font.lineHeight;
			lineCount = isArray(label) ? label.length : 1;
			const halfCount = lineCount / 2;
			const color = optsAtIndex.color;
			const strokeColor = optsAtIndex.textStrokeColor;
			const strokeWidth = optsAtIndex.textStrokeWidth;
			let tickTextAlign = textAlign;
			if (isHorizontal) {
				x = pixel;
				if (textAlign === "inner") if (i === ilen - 1) tickTextAlign = !this.options.reverse ? "right" : "left";
				else if (i === 0) tickTextAlign = !this.options.reverse ? "left" : "right";
				else tickTextAlign = "center";
				if (position === "top") if (crossAlign === "near" || rotation !== 0) textOffset = -lineCount * lineHeight + lineHeight / 2;
				else if (crossAlign === "center") textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
				else textOffset = -labelSizes.highest.height + lineHeight / 2;
				else if (crossAlign === "near" || rotation !== 0) textOffset = lineHeight / 2;
				else if (crossAlign === "center") textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
				else textOffset = labelSizes.highest.height - lineCount * lineHeight;
				if (mirror) textOffset *= -1;
				if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) x += lineHeight / 2 * Math.sin(rotation);
			} else {
				y = pixel;
				textOffset = (1 - lineCount) * lineHeight / 2;
			}
			let backdrop;
			if (optsAtIndex.showLabelBackdrop) {
				const labelPadding = toPadding(optsAtIndex.backdropPadding);
				const height = labelSizes.heights[i];
				const width = labelSizes.widths[i];
				let top = textOffset - labelPadding.top;
				let left = 0 - labelPadding.left;
				switch (textBaseline) {
					case "middle":
						top -= height / 2;
						break;
					case "bottom":
						top -= height;
						break;
				}
				switch (textAlign) {
					case "center":
						left -= width / 2;
						break;
					case "right":
						left -= width;
						break;
					case "inner":
						if (i === ilen - 1) left -= width;
						else if (i > 0) left -= width / 2;
						break;
				}
				backdrop = {
					left,
					top,
					width: width + labelPadding.width,
					height: height + labelPadding.height,
					color: optsAtIndex.backdropColor
				};
			}
			items.push({
				label,
				font,
				textOffset,
				options: {
					rotation,
					color,
					strokeColor,
					strokeWidth,
					textAlign: tickTextAlign,
					textBaseline,
					translation: [x, y],
					backdrop
				}
			});
		}
		return items;
	}
	_getXAxisLabelAlignment() {
		const { position, ticks } = this.options;
		if (-toRadians(this.labelRotation)) return position === "top" ? "left" : "right";
		let align = "center";
		if (ticks.align === "start") align = "left";
		else if (ticks.align === "end") align = "right";
		else if (ticks.align === "inner") align = "inner";
		return align;
	}
	_getYAxisLabelAlignment(tl) {
		const { position, ticks: { crossAlign, mirror, padding } } = this.options;
		const labelSizes = this._getLabelSizes();
		const tickAndPadding = tl + padding;
		const widest = labelSizes.widest.width;
		let textAlign;
		let x;
		if (position === "left") if (mirror) {
			x = this.right + padding;
			if (crossAlign === "near") textAlign = "left";
			else if (crossAlign === "center") {
				textAlign = "center";
				x += widest / 2;
			} else {
				textAlign = "right";
				x += widest;
			}
		} else {
			x = this.right - tickAndPadding;
			if (crossAlign === "near") textAlign = "right";
			else if (crossAlign === "center") {
				textAlign = "center";
				x -= widest / 2;
			} else {
				textAlign = "left";
				x = this.left;
			}
		}
		else if (position === "right") if (mirror) {
			x = this.left + padding;
			if (crossAlign === "near") textAlign = "right";
			else if (crossAlign === "center") {
				textAlign = "center";
				x -= widest / 2;
			} else {
				textAlign = "left";
				x -= widest;
			}
		} else {
			x = this.left + tickAndPadding;
			if (crossAlign === "near") textAlign = "left";
			else if (crossAlign === "center") {
				textAlign = "center";
				x += widest / 2;
			} else {
				textAlign = "right";
				x = this.right;
			}
		}
		else textAlign = "right";
		return {
			textAlign,
			x
		};
	}
	_computeLabelArea() {
		if (this.options.ticks.mirror) return;
		const chart = this.chart;
		const position = this.options.position;
		if (position === "left" || position === "right") return {
			top: 0,
			left: this.left,
			bottom: chart.height,
			right: this.right
		};
		if (position === "top" || position === "bottom") return {
			top: this.top,
			left: 0,
			bottom: this.bottom,
			right: chart.width
		};
	}
	drawBackground() {
		const { ctx, options: { backgroundColor }, left, top, width, height } = this;
		if (backgroundColor) {
			ctx.save();
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(left, top, width, height);
			ctx.restore();
		}
	}
	getLineWidthForValue(value) {
		const grid = this.options.grid;
		if (!this._isVisible() || !grid.display) return 0;
		const index = this.ticks.findIndex((t) => t.value === value);
		if (index >= 0) return grid.setContext(this.getContext(index)).lineWidth;
		return 0;
	}
	drawGrid(chartArea) {
		const grid = this.options.grid;
		const ctx = this.ctx;
		const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
		let i, ilen;
		const drawLine = (p1, p2, style) => {
			if (!style.width || !style.color) return;
			ctx.save();
			ctx.lineWidth = style.width;
			ctx.strokeStyle = style.color;
			ctx.setLineDash(style.borderDash || []);
			ctx.lineDashOffset = style.borderDashOffset;
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
			ctx.restore();
		};
		if (grid.display) for (i = 0, ilen = items.length; i < ilen; ++i) {
			const item = items[i];
			if (grid.drawOnChartArea) drawLine({
				x: item.x1,
				y: item.y1
			}, {
				x: item.x2,
				y: item.y2
			}, item);
			if (grid.drawTicks) drawLine({
				x: item.tx1,
				y: item.ty1
			}, {
				x: item.tx2,
				y: item.ty2
			}, {
				color: item.tickColor,
				width: item.tickWidth,
				borderDash: item.tickBorderDash,
				borderDashOffset: item.tickBorderDashOffset
			});
		}
	}
	drawBorder() {
		const { chart, ctx, options: { border, grid } } = this;
		const borderOpts = border.setContext(this.getContext());
		const axisWidth = border.display ? borderOpts.width : 0;
		if (!axisWidth) return;
		const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
		const borderValue = this._borderValue;
		let x1, x2, y1, y2;
		if (this.isHorizontal()) {
			x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
			x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
			y1 = y2 = borderValue;
		} else {
			y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
			y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
			x1 = x2 = borderValue;
		}
		ctx.save();
		ctx.lineWidth = borderOpts.width;
		ctx.strokeStyle = borderOpts.color;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		ctx.restore();
	}
	drawLabels(chartArea) {
		if (!this.options.ticks.display) return;
		const ctx = this.ctx;
		const area = this._computeLabelArea();
		if (area) clipArea(ctx, area);
		const items = this.getLabelItems(chartArea);
		for (const item of items) {
			const renderTextOptions = item.options;
			const tickFont = item.font;
			const label = item.label;
			const y = item.textOffset;
			renderText(ctx, label, 0, y, tickFont, renderTextOptions);
		}
		if (area) unclipArea(ctx);
	}
	drawTitle() {
		const { ctx, options: { position, title, reverse } } = this;
		if (!title.display) return;
		const font = toFont(title.font);
		const padding = toPadding(title.padding);
		const align = title.align;
		let offset = font.lineHeight / 2;
		if (position === "bottom" || position === "center" || isObject(position)) {
			offset += padding.bottom;
			if (isArray(title.text)) offset += font.lineHeight * (title.text.length - 1);
		} else offset += padding.top;
		const { titleX, titleY, maxWidth, rotation } = titleArgs(this, offset, position, align);
		renderText(ctx, title.text, 0, 0, font, {
			color: title.color,
			maxWidth,
			rotation,
			textAlign: titleAlign(align, position, reverse),
			textBaseline: "middle",
			translation: [titleX, titleY]
		});
	}
	draw(chartArea) {
		if (!this._isVisible()) return;
		this.drawBackground();
		this.drawGrid(chartArea);
		this.drawBorder();
		this.drawTitle();
		this.drawLabels(chartArea);
	}
	_layers() {
		const opts = this.options;
		const tz = opts.ticks && opts.ticks.z || 0;
		const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
		const bz = valueOrDefault(opts.border && opts.border.z, 0);
		if (!this._isVisible() || this.draw !== Scale.prototype.draw) return [{
			z: tz,
			draw: (chartArea) => {
				this.draw(chartArea);
			}
		}];
		return [
			{
				z: gz,
				draw: (chartArea) => {
					this.drawBackground();
					this.drawGrid(chartArea);
					this.drawTitle();
				}
			},
			{
				z: bz,
				draw: () => {
					this.drawBorder();
				}
			},
			{
				z: tz,
				draw: (chartArea) => {
					this.drawLabels(chartArea);
				}
			}
		];
	}
	getMatchingVisibleMetas(type) {
		const metas = this.chart.getSortedVisibleDatasetMetas();
		const axisID = this.axis + "AxisID";
		const result = [];
		let i, ilen;
		for (i = 0, ilen = metas.length; i < ilen; ++i) {
			const meta = metas[i];
			if (meta[axisID] === this.id && (!type || meta.type === type)) result.push(meta);
		}
		return result;
	}
	_resolveTickFontOptions(index) {
		return toFont(this.options.ticks.setContext(this.getContext(index)).font);
	}
	_maxDigits() {
		const fontSize = this._resolveTickFontOptions(0).lineHeight;
		return (this.isHorizontal() ? this.width : this.height) / fontSize;
	}
};
var TypedRegistry = class {
	constructor(type, scope, override) {
		this.type = type;
		this.scope = scope;
		this.override = override;
		this.items = Object.create(null);
	}
	isForType(type) {
		return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
	}
	register(item) {
		const proto = Object.getPrototypeOf(item);
		let parentScope;
		if (isIChartComponent(proto)) parentScope = this.register(proto);
		const items = this.items;
		const id = item.id;
		const scope = this.scope + "." + id;
		if (!id) throw new Error("class does not have id: " + item);
		if (id in items) return scope;
		items[id] = item;
		registerDefaults(item, scope, parentScope);
		if (this.override) defaults.override(item.id, item.overrides);
		return scope;
	}
	get(id) {
		return this.items[id];
	}
	unregister(item) {
		const items = this.items;
		const id = item.id;
		const scope = this.scope;
		if (id in items) delete items[id];
		if (scope && id in defaults[scope]) {
			delete defaults[scope][id];
			if (this.override) delete overrides[id];
		}
	}
};
function registerDefaults(item, scope, parentScope) {
	const itemDefaults = merge(Object.create(null), [
		parentScope ? defaults.get(parentScope) : {},
		defaults.get(scope),
		item.defaults
	]);
	defaults.set(scope, itemDefaults);
	if (item.defaultRoutes) routeDefaults(scope, item.defaultRoutes);
	if (item.descriptors) defaults.describe(scope, item.descriptors);
}
function routeDefaults(scope, routes) {
	Object.keys(routes).forEach((property) => {
		const propertyParts = property.split(".");
		const sourceName = propertyParts.pop();
		const sourceScope = [scope].concat(propertyParts).join(".");
		const parts = routes[property].split(".");
		const targetName = parts.pop();
		const targetScope = parts.join(".");
		defaults.route(sourceScope, sourceName, targetScope, targetName);
	});
}
function isIChartComponent(proto) {
	return "id" in proto && "defaults" in proto;
}
var Registry = class {
	constructor() {
		this.controllers = new TypedRegistry(DatasetController, "datasets", true);
		this.elements = new TypedRegistry(Element$1, "elements");
		this.plugins = new TypedRegistry(Object, "plugins");
		this.scales = new TypedRegistry(Scale, "scales");
		this._typedRegistries = [
			this.controllers,
			this.scales,
			this.elements
		];
	}
	add(...args) {
		this._each("register", args);
	}
	remove(...args) {
		this._each("unregister", args);
	}
	addControllers(...args) {
		this._each("register", args, this.controllers);
	}
	addElements(...args) {
		this._each("register", args, this.elements);
	}
	addPlugins(...args) {
		this._each("register", args, this.plugins);
	}
	addScales(...args) {
		this._each("register", args, this.scales);
	}
	getController(id) {
		return this._get(id, this.controllers, "controller");
	}
	getElement(id) {
		return this._get(id, this.elements, "element");
	}
	getPlugin(id) {
		return this._get(id, this.plugins, "plugin");
	}
	getScale(id) {
		return this._get(id, this.scales, "scale");
	}
	removeControllers(...args) {
		this._each("unregister", args, this.controllers);
	}
	removeElements(...args) {
		this._each("unregister", args, this.elements);
	}
	removePlugins(...args) {
		this._each("unregister", args, this.plugins);
	}
	removeScales(...args) {
		this._each("unregister", args, this.scales);
	}
	_each(method, args, typedRegistry) {
		[...args].forEach((arg) => {
			const reg = typedRegistry || this._getRegistryForType(arg);
			if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) this._exec(method, reg, arg);
			else each(arg, (item) => {
				const itemReg = typedRegistry || this._getRegistryForType(item);
				this._exec(method, itemReg, item);
			});
		});
	}
	_exec(method, registry, component) {
		const camelMethod = _capitalize(method);
		callback(component["before" + camelMethod], [], component);
		registry[method](component);
		callback(component["after" + camelMethod], [], component);
	}
	_getRegistryForType(type) {
		for (let i = 0; i < this._typedRegistries.length; i++) {
			const reg = this._typedRegistries[i];
			if (reg.isForType(type)) return reg;
		}
		return this.plugins;
	}
	_get(id, typedRegistry, type) {
		const item = typedRegistry.get(id);
		if (item === void 0) throw new Error("\"" + id + "\" is not a registered " + type + ".");
		return item;
	}
};
var registry = /* @__PURE__ */ new Registry();
var PluginService = class {
	constructor() {
		this._init = void 0;
	}
	notify(chart, hook, args, filter) {
		if (hook === "beforeInit") {
			this._init = this._createDescriptors(chart, true);
			this._notify(this._init, chart, "install");
		}
		if (this._init === void 0) return;
		const descriptors = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
		const result = this._notify(descriptors, chart, hook, args);
		if (hook === "afterDestroy") {
			this._notify(descriptors, chart, "stop");
			this._notify(this._init, chart, "uninstall");
			this._init = void 0;
		}
		return result;
	}
	_notify(descriptors, chart, hook, args) {
		args = args || {};
		for (const descriptor of descriptors) {
			const plugin = descriptor.plugin;
			const method = plugin[hook];
			if (callback(method, [
				chart,
				args,
				descriptor.options
			], plugin) === false && args.cancelable) return false;
		}
		return true;
	}
	invalidate() {
		if (!isNullOrUndef(this._cache)) {
			this._oldCache = this._cache;
			this._cache = void 0;
		}
	}
	_descriptors(chart) {
		if (this._cache) return this._cache;
		const descriptors = this._cache = this._createDescriptors(chart);
		this._notifyStateChanges(chart);
		return descriptors;
	}
	_createDescriptors(chart, all) {
		const config = chart && chart.config;
		const options = valueOrDefault(config.options && config.options.plugins, {});
		const plugins = allPlugins(config);
		return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
	}
	_notifyStateChanges(chart) {
		const previousDescriptors = this._oldCache || [];
		const descriptors = this._cache;
		const diff = (a, b) => a.filter((x) => !b.some((y) => x.plugin.id === y.plugin.id));
		this._notify(diff(previousDescriptors, descriptors), chart, "stop");
		this._notify(diff(descriptors, previousDescriptors), chart, "start");
	}
};
function allPlugins(config) {
	const localIds = {};
	const plugins = [];
	const keys = Object.keys(registry.plugins.items);
	for (let i = 0; i < keys.length; i++) plugins.push(registry.getPlugin(keys[i]));
	const local = config.plugins || [];
	for (let i = 0; i < local.length; i++) {
		const plugin = local[i];
		if (plugins.indexOf(plugin) === -1) {
			plugins.push(plugin);
			localIds[plugin.id] = true;
		}
	}
	return {
		plugins,
		localIds
	};
}
function getOpts(options, all) {
	if (!all && options === false) return null;
	if (options === true) return {};
	return options;
}
function createDescriptors(chart, { plugins, localIds }, options, all) {
	const result = [];
	const context = chart.getContext();
	for (const plugin of plugins) {
		const id = plugin.id;
		const opts = getOpts(options[id], all);
		if (opts === null) continue;
		result.push({
			plugin,
			options: pluginOpts(chart.config, {
				plugin,
				local: localIds[id]
			}, opts, context)
		});
	}
	return result;
}
function pluginOpts(config, { plugin, local }, opts, context) {
	const keys = config.pluginScopeKeys(plugin);
	const scopes = config.getOptionScopes(opts, keys);
	if (local && plugin.defaults) scopes.push(plugin.defaults);
	return config.createResolver(scopes, context, [""], {
		scriptable: false,
		indexable: false,
		allKeys: true
	});
}
function getIndexAxis(type, options) {
	const datasetDefaults = defaults.datasets[type] || {};
	return ((options.datasets || {})[type] || {}).indexAxis || options.indexAxis || datasetDefaults.indexAxis || "x";
}
function getAxisFromDefaultScaleID(id, indexAxis) {
	let axis = id;
	if (id === "_index_") axis = indexAxis;
	else if (id === "_value_") axis = indexAxis === "x" ? "y" : "x";
	return axis;
}
function getDefaultScaleIDFromAxis(axis, indexAxis) {
	return axis === indexAxis ? "_index_" : "_value_";
}
function idMatchesAxis(id) {
	if (id === "x" || id === "y" || id === "r") return id;
}
function axisFromPosition(position) {
	if (position === "top" || position === "bottom") return "x";
	if (position === "left" || position === "right") return "y";
}
function determineAxis(id, ...scaleOptions) {
	if (idMatchesAxis(id)) return id;
	for (const opts of scaleOptions) {
		const axis = opts.axis || axisFromPosition(opts.position) || id.length > 1 && idMatchesAxis(id[0].toLowerCase());
		if (axis) return axis;
	}
	throw new Error(`Cannot determine type of '${id}' axis. Please provide 'axis' or 'position' option.`);
}
function getAxisFromDataset(id, axis, dataset) {
	if (dataset[axis + "AxisID"] === id) return { axis };
}
function retrieveAxisFromDatasets(id, config) {
	if (config.data && config.data.datasets) {
		const boundDs = config.data.datasets.filter((d) => d.xAxisID === id || d.yAxisID === id);
		if (boundDs.length) return getAxisFromDataset(id, "x", boundDs[0]) || getAxisFromDataset(id, "y", boundDs[0]);
	}
	return {};
}
function mergeScaleConfig(config, options) {
	const chartDefaults = overrides[config.type] || { scales: {} };
	const configScales = options.scales || {};
	const chartIndexAxis = getIndexAxis(config.type, options);
	const scales = Object.create(null);
	Object.keys(configScales).forEach((id) => {
		const scaleConf = configScales[id];
		if (!isObject(scaleConf)) return console.error(`Invalid scale configuration for scale: ${id}`);
		if (scaleConf._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
		const axis = determineAxis(id, scaleConf, retrieveAxisFromDatasets(id, config), defaults.scales[scaleConf.type]);
		const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
		const defaultScaleOptions = chartDefaults.scales || {};
		scales[id] = mergeIf(Object.create(null), [
			{ axis },
			scaleConf,
			defaultScaleOptions[axis],
			defaultScaleOptions[defaultId]
		]);
	});
	config.data.datasets.forEach((dataset) => {
		const type = dataset.type || config.type;
		const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
		const defaultScaleOptions = (overrides[type] || {}).scales || {};
		Object.keys(defaultScaleOptions).forEach((defaultID) => {
			const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
			const id = dataset[axis + "AxisID"] || axis;
			scales[id] = scales[id] || Object.create(null);
			mergeIf(scales[id], [
				{ axis },
				configScales[id],
				defaultScaleOptions[defaultID]
			]);
		});
	});
	Object.keys(scales).forEach((key) => {
		const scale = scales[key];
		mergeIf(scale, [defaults.scales[scale.type], defaults.scale]);
	});
	return scales;
}
function initOptions(config) {
	const options = config.options || (config.options = {});
	options.plugins = valueOrDefault(options.plugins, {});
	options.scales = mergeScaleConfig(config, options);
}
function initData(data) {
	data = data || {};
	data.datasets = data.datasets || [];
	data.labels = data.labels || [];
	return data;
}
function initConfig(config) {
	config = config || {};
	config.data = initData(config.data);
	initOptions(config);
	return config;
}
var keyCache = /* @__PURE__ */ new Map();
var keysCached = /* @__PURE__ */ new Set();
function cachedKeys(cacheKey, generate) {
	let keys = keyCache.get(cacheKey);
	if (!keys) {
		keys = generate();
		keyCache.set(cacheKey, keys);
		keysCached.add(keys);
	}
	return keys;
}
var addIfFound = (set, obj, key) => {
	const opts = resolveObjectKey(obj, key);
	if (opts !== void 0) set.add(opts);
};
var Config = class {
	constructor(config) {
		this._config = initConfig(config);
		this._scopeCache = /* @__PURE__ */ new Map();
		this._resolverCache = /* @__PURE__ */ new Map();
	}
	get platform() {
		return this._config.platform;
	}
	get type() {
		return this._config.type;
	}
	set type(type) {
		this._config.type = type;
	}
	get data() {
		return this._config.data;
	}
	set data(data) {
		this._config.data = initData(data);
	}
	get options() {
		return this._config.options;
	}
	set options(options) {
		this._config.options = options;
	}
	get plugins() {
		return this._config.plugins;
	}
	update() {
		const config = this._config;
		this.clearCache();
		initOptions(config);
	}
	clearCache() {
		this._scopeCache.clear();
		this._resolverCache.clear();
	}
	datasetScopeKeys(datasetType) {
		return cachedKeys(datasetType, () => [[`datasets.${datasetType}`, ""]]);
	}
	datasetAnimationScopeKeys(datasetType, transition) {
		return cachedKeys(`${datasetType}.transition.${transition}`, () => [[`datasets.${datasetType}.transitions.${transition}`, `transitions.${transition}`], [`datasets.${datasetType}`, ""]]);
	}
	datasetElementScopeKeys(datasetType, elementType) {
		return cachedKeys(`${datasetType}-${elementType}`, () => [[
			`datasets.${datasetType}.elements.${elementType}`,
			`datasets.${datasetType}`,
			`elements.${elementType}`,
			""
		]]);
	}
	pluginScopeKeys(plugin) {
		const id = plugin.id;
		const type = this.type;
		return cachedKeys(`${type}-plugin-${id}`, () => [[`plugins.${id}`, ...plugin.additionalOptionScopes || []]]);
	}
	_cachedScopes(mainScope, resetCache) {
		const _scopeCache = this._scopeCache;
		let cache = _scopeCache.get(mainScope);
		if (!cache || resetCache) {
			cache = /* @__PURE__ */ new Map();
			_scopeCache.set(mainScope, cache);
		}
		return cache;
	}
	getOptionScopes(mainScope, keyLists, resetCache) {
		const { options, type } = this;
		const cache = this._cachedScopes(mainScope, resetCache);
		const cached = cache.get(keyLists);
		if (cached) return cached;
		const scopes = /* @__PURE__ */ new Set();
		keyLists.forEach((keys) => {
			if (mainScope) {
				scopes.add(mainScope);
				keys.forEach((key) => addIfFound(scopes, mainScope, key));
			}
			keys.forEach((key) => addIfFound(scopes, options, key));
			keys.forEach((key) => addIfFound(scopes, overrides[type] || {}, key));
			keys.forEach((key) => addIfFound(scopes, defaults, key));
			keys.forEach((key) => addIfFound(scopes, descriptors, key));
		});
		const array = Array.from(scopes);
		if (array.length === 0) array.push(Object.create(null));
		if (keysCached.has(keyLists)) cache.set(keyLists, array);
		return array;
	}
	chartOptionScopes() {
		const { options, type } = this;
		return [
			options,
			overrides[type] || {},
			defaults.datasets[type] || {},
			{ type },
			defaults,
			descriptors
		];
	}
	resolveNamedOptions(scopes, names, context, prefixes = [""]) {
		const result = { $shared: true };
		const { resolver, subPrefixes } = getResolver(this._resolverCache, scopes, prefixes);
		let options = resolver;
		if (needContext(resolver, names)) {
			result.$shared = false;
			context = isFunction(context) ? context() : context;
			const subResolver = this.createResolver(scopes, context, subPrefixes);
			options = _attachContext(resolver, context, subResolver);
		}
		for (const prop of names) result[prop] = options[prop];
		return result;
	}
	createResolver(scopes, context, prefixes = [""], descriptorDefaults) {
		const { resolver } = getResolver(this._resolverCache, scopes, prefixes);
		return isObject(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
	}
};
function getResolver(resolverCache, scopes, prefixes) {
	let cache = resolverCache.get(scopes);
	if (!cache) {
		cache = /* @__PURE__ */ new Map();
		resolverCache.set(scopes, cache);
	}
	const cacheKey = prefixes.join();
	let cached = cache.get(cacheKey);
	if (!cached) {
		cached = {
			resolver: _createResolver(scopes, prefixes),
			subPrefixes: prefixes.filter((p) => !p.toLowerCase().includes("hover"))
		};
		cache.set(cacheKey, cached);
	}
	return cached;
}
var hasFunction = (value) => isObject(value) && Object.getOwnPropertyNames(value).some((key) => isFunction(value[key]));
function needContext(proxy, names) {
	const { isScriptable, isIndexable } = _descriptors(proxy);
	for (const prop of names) {
		const scriptable = isScriptable(prop);
		const indexable = isIndexable(prop);
		const value = (indexable || scriptable) && proxy[prop];
		if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) return true;
	}
	return false;
}
var version = "4.5.1";
var KNOWN_POSITIONS = [
	"top",
	"bottom",
	"left",
	"right",
	"chartArea"
];
function positionIsHorizontal(position, axis) {
	return position === "top" || position === "bottom" || KNOWN_POSITIONS.indexOf(position) === -1 && axis === "x";
}
function compare2Level(l1, l2) {
	return function(a, b) {
		return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
	};
}
function onAnimationsComplete(context) {
	const chart = context.chart;
	const animationOptions = chart.options.animation;
	chart.notifyPlugins("afterRender");
	callback(animationOptions && animationOptions.onComplete, [context], chart);
}
function onAnimationProgress(context) {
	const chart = context.chart;
	const animationOptions = chart.options.animation;
	callback(animationOptions && animationOptions.onProgress, [context], chart);
}
function getCanvas(item) {
	if (_isDomSupported() && typeof item === "string") item = document.getElementById(item);
	else if (item && item.length) item = item[0];
	if (item && item.canvas) item = item.canvas;
	return item;
}
var instances = {};
var getChart = (key) => {
	const canvas = getCanvas(key);
	return Object.values(instances).filter((c) => c.canvas === canvas).pop();
};
function moveNumericKeys(obj, start, move) {
	const keys = Object.keys(obj);
	for (const key of keys) {
		const intKey = +key;
		if (intKey >= start) {
			const value = obj[key];
			delete obj[key];
			if (move > 0 || intKey > start) obj[intKey + move] = value;
		}
	}
}
function determineLastEvent(e, lastEvent, inChartArea, isClick) {
	if (!inChartArea || e.type === "mouseout") return null;
	if (isClick) return lastEvent;
	return e;
}
var Chart = class {
	static defaults = defaults;
	static instances = instances;
	static overrides = overrides;
	static registry = registry;
	static version = version;
	static getChart = getChart;
	static register(...items) {
		registry.add(...items);
		invalidatePlugins();
	}
	static unregister(...items) {
		registry.remove(...items);
		invalidatePlugins();
	}
	constructor(item, userConfig) {
		const config = this.config = new Config(userConfig);
		const initialCanvas = getCanvas(item);
		const existingChart = getChart(initialCanvas);
		if (existingChart) throw new Error("Canvas is already in use. Chart with ID '" + existingChart.id + "' must be destroyed before the canvas with ID '" + existingChart.canvas.id + "' can be reused.");
		const options = config.createResolver(config.chartOptionScopes(), this.getContext());
		this.platform = new (config.platform || (_detectPlatform(initialCanvas)))();
		this.platform.updateConfig(config);
		const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
		const canvas = context && context.canvas;
		const height = canvas && canvas.height;
		const width = canvas && canvas.width;
		this.id = uid();
		this.ctx = context;
		this.canvas = canvas;
		this.width = width;
		this.height = height;
		this._options = options;
		this._aspectRatio = this.aspectRatio;
		this._layers = [];
		this._metasets = [];
		this._stacks = void 0;
		this.boxes = [];
		this.currentDevicePixelRatio = void 0;
		this.chartArea = void 0;
		this._active = [];
		this._lastEvent = void 0;
		this._listeners = {};
		this._responsiveListeners = void 0;
		this._sortedMetasets = [];
		this.scales = {};
		this._plugins = new PluginService();
		this.$proxies = {};
		this._hiddenIndices = {};
		this.attached = false;
		this._animationsDisabled = void 0;
		this.$context = void 0;
		this._doResize = debounce((mode) => this.update(mode), options.resizeDelay || 0);
		this._dataChanges = [];
		instances[this.id] = this;
		if (!context || !canvas) {
			console.error("Failed to create chart: can't acquire context from the given item");
			return;
		}
		animator.listen(this, "complete", onAnimationsComplete);
		animator.listen(this, "progress", onAnimationProgress);
		this._initialize();
		if (this.attached) this.update();
	}
	get aspectRatio() {
		const { options: { aspectRatio, maintainAspectRatio }, width, height, _aspectRatio } = this;
		if (!isNullOrUndef(aspectRatio)) return aspectRatio;
		if (maintainAspectRatio && _aspectRatio) return _aspectRatio;
		return height ? width / height : null;
	}
	get data() {
		return this.config.data;
	}
	set data(data) {
		this.config.data = data;
	}
	get options() {
		return this._options;
	}
	set options(options) {
		this.config.options = options;
	}
	get registry() {
		return registry;
	}
	_initialize() {
		this.notifyPlugins("beforeInit");
		if (this.options.responsive) this.resize();
		else retinaScale(this, this.options.devicePixelRatio);
		this.bindEvents();
		this.notifyPlugins("afterInit");
		return this;
	}
	clear() {
		clearCanvas(this.canvas, this.ctx);
		return this;
	}
	stop() {
		animator.stop(this);
		return this;
	}
	resize(width, height) {
		if (!animator.running(this)) this._resize(width, height);
		else this._resizeBeforeDraw = {
			width,
			height
		};
	}
	_resize(width, height) {
		const options = this.options;
		const canvas = this.canvas;
		const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
		const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
		const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
		const mode = this.width ? "resize" : "attach";
		this.width = newSize.width;
		this.height = newSize.height;
		this._aspectRatio = this.aspectRatio;
		if (!retinaScale(this, newRatio, true)) return;
		this.notifyPlugins("resize", { size: newSize });
		callback(options.onResize, [this, newSize], this);
		if (this.attached) {
			if (this._doResize(mode)) this.render();
		}
	}
	ensureScalesHaveIDs() {
		each(this.options.scales || {}, (axisOptions, axisID) => {
			axisOptions.id = axisID;
		});
	}
	buildOrUpdateScales() {
		const options = this.options;
		const scaleOpts = options.scales;
		const scales = this.scales;
		const updated = Object.keys(scales).reduce((obj, id) => {
			obj[id] = false;
			return obj;
		}, {});
		let items = [];
		if (scaleOpts) items = items.concat(Object.keys(scaleOpts).map((id) => {
			const scaleOptions = scaleOpts[id];
			const axis = determineAxis(id, scaleOptions);
			const isRadial = axis === "r";
			const isHorizontal = axis === "x";
			return {
				options: scaleOptions,
				dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
				dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
			};
		}));
		each(items, (item) => {
			const scaleOptions = item.options;
			const id = scaleOptions.id;
			const axis = determineAxis(id, scaleOptions);
			const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
			if (scaleOptions.position === void 0 || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) scaleOptions.position = item.dposition;
			updated[id] = true;
			let scale = null;
			if (id in scales && scales[id].type === scaleType) scale = scales[id];
			else {
				scale = new (registry.getScale(scaleType))({
					id,
					type: scaleType,
					ctx: this.ctx,
					chart: this
				});
				scales[scale.id] = scale;
			}
			scale.init(scaleOptions, options);
		});
		each(updated, (hasUpdated, id) => {
			if (!hasUpdated) delete scales[id];
		});
		each(scales, (scale) => {
			layouts.configure(this, scale, scale.options);
			layouts.addBox(this, scale);
		});
	}
	_updateMetasets() {
		const metasets = this._metasets;
		const numData = this.data.datasets.length;
		const numMeta = metasets.length;
		metasets.sort((a, b) => a.index - b.index);
		if (numMeta > numData) {
			for (let i = numData; i < numMeta; ++i) this._destroyDatasetMeta(i);
			metasets.splice(numData, numMeta - numData);
		}
		this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
	}
	_removeUnreferencedMetasets() {
		const { _metasets: metasets, data: { datasets } } = this;
		if (metasets.length > datasets.length) delete this._stacks;
		metasets.forEach((meta, index) => {
			if (datasets.filter((x) => x === meta._dataset).length === 0) this._destroyDatasetMeta(index);
		});
	}
	buildOrUpdateControllers() {
		const newControllers = [];
		const datasets = this.data.datasets;
		let i, ilen;
		this._removeUnreferencedMetasets();
		for (i = 0, ilen = datasets.length; i < ilen; i++) {
			const dataset = datasets[i];
			let meta = this.getDatasetMeta(i);
			const type = dataset.type || this.config.type;
			if (meta.type && meta.type !== type) {
				this._destroyDatasetMeta(i);
				meta = this.getDatasetMeta(i);
			}
			meta.type = type;
			meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
			meta.order = dataset.order || 0;
			meta.index = i;
			meta.label = "" + dataset.label;
			meta.visible = this.isDatasetVisible(i);
			if (meta.controller) {
				meta.controller.updateIndex(i);
				meta.controller.linkScales();
			} else {
				const ControllerClass = registry.getController(type);
				const { datasetElementType, dataElementType } = defaults.datasets[type];
				Object.assign(ControllerClass, {
					dataElementType: registry.getElement(dataElementType),
					datasetElementType: datasetElementType && registry.getElement(datasetElementType)
				});
				meta.controller = new ControllerClass(this, i);
				newControllers.push(meta.controller);
			}
		}
		this._updateMetasets();
		return newControllers;
	}
	_resetElements() {
		each(this.data.datasets, (dataset, datasetIndex) => {
			this.getDatasetMeta(datasetIndex).controller.reset();
		}, this);
	}
	reset() {
		this._resetElements();
		this.notifyPlugins("reset");
	}
	update(mode) {
		const config = this.config;
		config.update();
		const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
		const animsDisabled = this._animationsDisabled = !options.animation;
		this._updateScales();
		this._checkEventBindings();
		this._updateHiddenIndices();
		this._plugins.invalidate();
		if (this.notifyPlugins("beforeUpdate", {
			mode,
			cancelable: true
		}) === false) return;
		const newControllers = this.buildOrUpdateControllers();
		this.notifyPlugins("beforeElementsUpdate");
		let minPadding = 0;
		for (let i = 0, ilen = this.data.datasets.length; i < ilen; i++) {
			const { controller } = this.getDatasetMeta(i);
			const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
			controller.buildOrUpdateElements(reset);
			minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
		}
		minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
		this._updateLayout(minPadding);
		if (!animsDisabled) each(newControllers, (controller) => {
			controller.reset();
		});
		this._updateDatasets(mode);
		this.notifyPlugins("afterUpdate", { mode });
		this._layers.sort(compare2Level("z", "_idx"));
		const { _active, _lastEvent } = this;
		if (_lastEvent) this._eventHandler(_lastEvent, true);
		else if (_active.length) this._updateHoverStyles(_active, _active, true);
		this.render();
	}
	_updateScales() {
		each(this.scales, (scale) => {
			layouts.removeBox(this, scale);
		});
		this.ensureScalesHaveIDs();
		this.buildOrUpdateScales();
	}
	_checkEventBindings() {
		const options = this.options;
		if (!setsEqual(new Set(Object.keys(this._listeners)), new Set(options.events)) || !!this._responsiveListeners !== options.responsive) {
			this.unbindEvents();
			this.bindEvents();
		}
	}
	_updateHiddenIndices() {
		const { _hiddenIndices } = this;
		const changes = this._getUniformDataChanges() || [];
		for (const { method, start, count } of changes) moveNumericKeys(_hiddenIndices, start, method === "_removeElements" ? -count : count);
	}
	_getUniformDataChanges() {
		const _dataChanges = this._dataChanges;
		if (!_dataChanges || !_dataChanges.length) return;
		this._dataChanges = [];
		const datasetCount = this.data.datasets.length;
		const makeSet = (idx) => new Set(_dataChanges.filter((c) => c[0] === idx).map((c, i) => i + "," + c.splice(1).join(",")));
		const changeSet = makeSet(0);
		for (let i = 1; i < datasetCount; i++) if (!setsEqual(changeSet, makeSet(i))) return;
		return Array.from(changeSet).map((c) => c.split(",")).map((a) => ({
			method: a[1],
			start: +a[2],
			count: +a[3]
		}));
	}
	_updateLayout(minPadding) {
		if (this.notifyPlugins("beforeLayout", { cancelable: true }) === false) return;
		layouts.update(this, this.width, this.height, minPadding);
		const area = this.chartArea;
		const noArea = area.width <= 0 || area.height <= 0;
		this._layers = [];
		each(this.boxes, (box) => {
			if (noArea && box.position === "chartArea") return;
			if (box.configure) box.configure();
			this._layers.push(...box._layers());
		}, this);
		this._layers.forEach((item, index) => {
			item._idx = index;
		});
		this.notifyPlugins("afterLayout");
	}
	_updateDatasets(mode) {
		if (this.notifyPlugins("beforeDatasetsUpdate", {
			mode,
			cancelable: true
		}) === false) return;
		for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this.getDatasetMeta(i).controller.configure();
		for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this._updateDataset(i, isFunction(mode) ? mode({ datasetIndex: i }) : mode);
		this.notifyPlugins("afterDatasetsUpdate", { mode });
	}
	_updateDataset(index, mode) {
		const meta = this.getDatasetMeta(index);
		const args = {
			meta,
			index,
			mode,
			cancelable: true
		};
		if (this.notifyPlugins("beforeDatasetUpdate", args) === false) return;
		meta.controller._update(mode);
		args.cancelable = false;
		this.notifyPlugins("afterDatasetUpdate", args);
	}
	render() {
		if (this.notifyPlugins("beforeRender", { cancelable: true }) === false) return;
		if (animator.has(this)) {
			if (this.attached && !animator.running(this)) animator.start(this);
		} else {
			this.draw();
			onAnimationsComplete({ chart: this });
		}
	}
	draw() {
		let i;
		if (this._resizeBeforeDraw) {
			const { width, height } = this._resizeBeforeDraw;
			this._resizeBeforeDraw = null;
			this._resize(width, height);
		}
		this.clear();
		if (this.width <= 0 || this.height <= 0) return;
		if (this.notifyPlugins("beforeDraw", { cancelable: true }) === false) return;
		const layers = this._layers;
		for (i = 0; i < layers.length && layers[i].z <= 0; ++i) layers[i].draw(this.chartArea);
		this._drawDatasets();
		for (; i < layers.length; ++i) layers[i].draw(this.chartArea);
		this.notifyPlugins("afterDraw");
	}
	_getSortedDatasetMetas(filterVisible) {
		const metasets = this._sortedMetasets;
		const result = [];
		let i, ilen;
		for (i = 0, ilen = metasets.length; i < ilen; ++i) {
			const meta = metasets[i];
			if (!filterVisible || meta.visible) result.push(meta);
		}
		return result;
	}
	getSortedVisibleDatasetMetas() {
		return this._getSortedDatasetMetas(true);
	}
	_drawDatasets() {
		if (this.notifyPlugins("beforeDatasetsDraw", { cancelable: true }) === false) return;
		const metasets = this.getSortedVisibleDatasetMetas();
		for (let i = metasets.length - 1; i >= 0; --i) this._drawDataset(metasets[i]);
		this.notifyPlugins("afterDatasetsDraw");
	}
	_drawDataset(meta) {
		const ctx = this.ctx;
		const args = {
			meta,
			index: meta.index,
			cancelable: true
		};
		const clip = getDatasetClipArea(this, meta);
		if (this.notifyPlugins("beforeDatasetDraw", args) === false) return;
		if (clip) clipArea(ctx, clip);
		meta.controller.draw();
		if (clip) unclipArea(ctx);
		args.cancelable = false;
		this.notifyPlugins("afterDatasetDraw", args);
	}
	isPointInArea(point) {
		return _isPointInArea(point, this.chartArea, this._minPadding);
	}
	getElementsAtEventForMode(e, mode, options, useFinalPosition) {
		const method = Interaction.modes[mode];
		if (typeof method === "function") return method(this, e, options, useFinalPosition);
		return [];
	}
	getDatasetMeta(datasetIndex) {
		const dataset = this.data.datasets[datasetIndex];
		const metasets = this._metasets;
		let meta = metasets.filter((x) => x && x._dataset === dataset).pop();
		if (!meta) {
			meta = {
				type: null,
				data: [],
				dataset: null,
				controller: null,
				hidden: null,
				xAxisID: null,
				yAxisID: null,
				order: dataset && dataset.order || 0,
				index: datasetIndex,
				_dataset: dataset,
				_parsed: [],
				_sorted: false
			};
			metasets.push(meta);
		}
		return meta;
	}
	getContext() {
		return this.$context || (this.$context = createContext(null, {
			chart: this,
			type: "chart"
		}));
	}
	getVisibleDatasetCount() {
		return this.getSortedVisibleDatasetMetas().length;
	}
	isDatasetVisible(datasetIndex) {
		const dataset = this.data.datasets[datasetIndex];
		if (!dataset) return false;
		const meta = this.getDatasetMeta(datasetIndex);
		return typeof meta.hidden === "boolean" ? !meta.hidden : !dataset.hidden;
	}
	setDatasetVisibility(datasetIndex, visible) {
		const meta = this.getDatasetMeta(datasetIndex);
		meta.hidden = !visible;
	}
	toggleDataVisibility(index) {
		this._hiddenIndices[index] = !this._hiddenIndices[index];
	}
	getDataVisibility(index) {
		return !this._hiddenIndices[index];
	}
	_updateVisibility(datasetIndex, dataIndex, visible) {
		const mode = visible ? "show" : "hide";
		const meta = this.getDatasetMeta(datasetIndex);
		const anims = meta.controller._resolveAnimations(void 0, mode);
		if (defined(dataIndex)) {
			meta.data[dataIndex].hidden = !visible;
			this.update();
		} else {
			this.setDatasetVisibility(datasetIndex, visible);
			anims.update(meta, { visible });
			this.update((ctx) => ctx.datasetIndex === datasetIndex ? mode : void 0);
		}
	}
	hide(datasetIndex, dataIndex) {
		this._updateVisibility(datasetIndex, dataIndex, false);
	}
	show(datasetIndex, dataIndex) {
		this._updateVisibility(datasetIndex, dataIndex, true);
	}
	_destroyDatasetMeta(datasetIndex) {
		const meta = this._metasets[datasetIndex];
		if (meta && meta.controller) meta.controller._destroy();
		delete this._metasets[datasetIndex];
	}
	_stop() {
		let i, ilen;
		this.stop();
		animator.remove(this);
		for (i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this._destroyDatasetMeta(i);
	}
	destroy() {
		this.notifyPlugins("beforeDestroy");
		const { canvas, ctx } = this;
		this._stop();
		this.config.clearCache();
		if (canvas) {
			this.unbindEvents();
			clearCanvas(canvas, ctx);
			this.platform.releaseContext(ctx);
			this.canvas = null;
			this.ctx = null;
		}
		delete instances[this.id];
		this.notifyPlugins("afterDestroy");
	}
	toBase64Image(...args) {
		return this.canvas.toDataURL(...args);
	}
	bindEvents() {
		this.bindUserEvents();
		if (this.options.responsive) this.bindResponsiveEvents();
		else this.attached = true;
	}
	bindUserEvents() {
		const listeners = this._listeners;
		const platform = this.platform;
		const _add = (type, listener) => {
			platform.addEventListener(this, type, listener);
			listeners[type] = listener;
		};
		const listener = (e, x, y) => {
			e.offsetX = x;
			e.offsetY = y;
			this._eventHandler(e);
		};
		each(this.options.events, (type) => _add(type, listener));
	}
	bindResponsiveEvents() {
		if (!this._responsiveListeners) this._responsiveListeners = {};
		const listeners = this._responsiveListeners;
		const platform = this.platform;
		const _add = (type, listener) => {
			platform.addEventListener(this, type, listener);
			listeners[type] = listener;
		};
		const _remove = (type, listener) => {
			if (listeners[type]) {
				platform.removeEventListener(this, type, listener);
				delete listeners[type];
			}
		};
		const listener = (width, height) => {
			if (this.canvas) this.resize(width, height);
		};
		let detached;
		const attached = () => {
			_remove("attach", attached);
			this.attached = true;
			this.resize();
			_add("resize", listener);
			_add("detach", detached);
		};
		detached = () => {
			this.attached = false;
			_remove("resize", listener);
			this._stop();
			this._resize(0, 0);
			_add("attach", attached);
		};
		if (platform.isAttached(this.canvas)) attached();
		else detached();
	}
	unbindEvents() {
		each(this._listeners, (listener, type) => {
			this.platform.removeEventListener(this, type, listener);
		});
		this._listeners = {};
		each(this._responsiveListeners, (listener, type) => {
			this.platform.removeEventListener(this, type, listener);
		});
		this._responsiveListeners = void 0;
	}
	updateHoverStyle(items, mode, enabled) {
		const prefix = enabled ? "set" : "remove";
		let meta, item, i, ilen;
		if (mode === "dataset") {
			meta = this.getDatasetMeta(items[0].datasetIndex);
			meta.controller["_" + prefix + "DatasetHoverStyle"]();
		}
		for (i = 0, ilen = items.length; i < ilen; ++i) {
			item = items[i];
			const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
			if (controller) controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
		}
	}
	getActiveElements() {
		return this._active || [];
	}
	setActiveElements(activeElements) {
		const lastActive = this._active || [];
		const active = activeElements.map(({ datasetIndex, index }) => {
			const meta = this.getDatasetMeta(datasetIndex);
			if (!meta) throw new Error("No dataset found at index " + datasetIndex);
			return {
				datasetIndex,
				element: meta.data[index],
				index
			};
		});
		if (!_elementsEqual(active, lastActive)) {
			this._active = active;
			this._lastEvent = null;
			this._updateHoverStyles(active, lastActive);
		}
	}
	notifyPlugins(hook, args, filter) {
		return this._plugins.notify(this, hook, args, filter);
	}
	isPluginEnabled(pluginId) {
		return this._plugins._cache.filter((p) => p.plugin.id === pluginId).length === 1;
	}
	_updateHoverStyles(active, lastActive, replay) {
		const hoverOptions = this.options.hover;
		const diff = (a, b) => a.filter((x) => !b.some((y) => x.datasetIndex === y.datasetIndex && x.index === y.index));
		const deactivated = diff(lastActive, active);
		const activated = replay ? active : diff(active, lastActive);
		if (deactivated.length) this.updateHoverStyle(deactivated, hoverOptions.mode, false);
		if (activated.length && hoverOptions.mode) this.updateHoverStyle(activated, hoverOptions.mode, true);
	}
	_eventHandler(e, replay) {
		const args = {
			event: e,
			replay,
			cancelable: true,
			inChartArea: this.isPointInArea(e)
		};
		const eventFilter = (plugin) => (plugin.options.events || this.options.events).includes(e.native.type);
		if (this.notifyPlugins("beforeEvent", args, eventFilter) === false) return;
		const changed = this._handleEvent(e, replay, args.inChartArea);
		args.cancelable = false;
		this.notifyPlugins("afterEvent", args, eventFilter);
		if (changed || args.changed) this.render();
		return this;
	}
	_handleEvent(e, replay, inChartArea) {
		const { _active: lastActive = [], options } = this;
		const useFinalPosition = replay;
		const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
		const isClick = _isClickEvent(e);
		const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
		if (inChartArea) {
			this._lastEvent = null;
			callback(options.onHover, [
				e,
				active,
				this
			], this);
			if (isClick) callback(options.onClick, [
				e,
				active,
				this
			], this);
		}
		const changed = !_elementsEqual(active, lastActive);
		if (changed || replay) {
			this._active = active;
			this._updateHoverStyles(active, lastActive, replay);
		}
		this._lastEvent = lastEvent;
		return changed;
	}
	_getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
		if (e.type === "mouseout") return [];
		if (!inChartArea) return lastActive;
		const hoverOptions = this.options.hover;
		return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
	}
};
function invalidatePlugins() {
	return each(Chart.instances, (chart) => chart._plugins.invalidate());
}
function clipSelf(ctx, element, endAngle) {
	const { startAngle, x, y, outerRadius, innerRadius, options } = element;
	const { borderWidth, borderJoinStyle } = options;
	const outerAngleClip = Math.min(borderWidth / outerRadius, _normalizeAngle(startAngle - endAngle));
	ctx.beginPath();
	ctx.arc(x, y, outerRadius - borderWidth / 2, startAngle + outerAngleClip / 2, endAngle - outerAngleClip / 2);
	if (innerRadius > 0) {
		const innerAngleClip = Math.min(borderWidth / innerRadius, _normalizeAngle(startAngle - endAngle));
		ctx.arc(x, y, innerRadius + borderWidth / 2, endAngle - innerAngleClip / 2, startAngle + innerAngleClip / 2, true);
	} else {
		const clipWidth = Math.min(borderWidth / 2, outerRadius * _normalizeAngle(startAngle - endAngle));
		if (borderJoinStyle === "round") ctx.arc(x, y, clipWidth, endAngle - PI / 2, startAngle + PI / 2, true);
		else if (borderJoinStyle === "bevel") {
			const r = 2 * clipWidth * clipWidth;
			const endX = -r * Math.cos(endAngle + PI / 2) + x;
			const endY = -r * Math.sin(endAngle + PI / 2) + y;
			const startX = r * Math.cos(startAngle + PI / 2) + x;
			const startY = r * Math.sin(startAngle + PI / 2) + y;
			ctx.lineTo(endX, endY);
			ctx.lineTo(startX, startY);
		}
	}
	ctx.closePath();
	ctx.moveTo(0, 0);
	ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.clip("evenodd");
}
function clipArc(ctx, element, endAngle) {
	const { startAngle, pixelMargin, x, y, outerRadius, innerRadius } = element;
	let angleMargin = pixelMargin / outerRadius;
	ctx.beginPath();
	ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
	if (innerRadius > pixelMargin) {
		angleMargin = pixelMargin / innerRadius;
		ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
	} else ctx.arc(x, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
	ctx.closePath();
	ctx.clip();
}
function toRadiusCorners(value) {
	return _readValueToProps(value, [
		"outerStart",
		"outerEnd",
		"innerStart",
		"innerEnd"
	]);
}
/**
* Parse border radius from the provided options
*/ function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
	const o = toRadiusCorners(arc.options.borderRadius);
	const halfThickness = (outerRadius - innerRadius) / 2;
	const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
	const computeOuterLimit = (val) => {
		const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
		return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
	};
	return {
		outerStart: computeOuterLimit(o.outerStart),
		outerEnd: computeOuterLimit(o.outerEnd),
		innerStart: _limitValue(o.innerStart, 0, innerLimit),
		innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
	};
}
/**
* Convert (r, 𝜃) to (x, y)
*/ function rThetaToXY(r, theta, x, y) {
	return {
		x: x + r * Math.cos(theta),
		y: y + r * Math.sin(theta)
	};
}
/**
* Path the arc, respecting border radius by separating into left and right halves.
*
*   Start      End
*
*    1--->a--->2    Outer
*   /           \
*   8           3
*   |           |
*   |           |
*   7           4
*   \           /
*    6<---b<---5    Inner
*/ function pathArc(ctx, element, offset, spacing, end, circular) {
	const { x, y, startAngle: start, pixelMargin, innerRadius: innerR } = element;
	const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
	const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
	let spacingOffset = 0;
	const alpha = end - start;
	if (spacing) {
		const avNogSpacingRadius = ((innerR > 0 ? innerR - spacing : 0) + (outerRadius > 0 ? outerRadius - spacing : 0)) / 2;
		spacingOffset = (alpha - (avNogSpacingRadius !== 0 ? alpha * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha)) / 2;
	}
	const angleOffset = (alpha - Math.max(.001, alpha * outerRadius - offset / PI) / outerRadius) / 2;
	const startAngle = start + angleOffset + spacingOffset;
	const endAngle = end - angleOffset - spacingOffset;
	const { outerStart, outerEnd, innerStart, innerEnd } = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
	const outerStartAdjustedRadius = outerRadius - outerStart;
	const outerEndAdjustedRadius = outerRadius - outerEnd;
	const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
	const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
	const innerStartAdjustedRadius = innerRadius + innerStart;
	const innerEndAdjustedRadius = innerRadius + innerEnd;
	const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
	const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
	ctx.beginPath();
	if (circular) {
		const outerMidAdjustedAngle = (outerStartAdjustedAngle + outerEndAdjustedAngle) / 2;
		ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerMidAdjustedAngle);
		ctx.arc(x, y, outerRadius, outerMidAdjustedAngle, outerEndAdjustedAngle);
		if (outerEnd > 0) {
			const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
			ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
		}
		const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
		ctx.lineTo(p4.x, p4.y);
		if (innerEnd > 0) {
			const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
			ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
		}
		const innerMidAdjustedAngle = (endAngle - innerEnd / innerRadius + (startAngle + innerStart / innerRadius)) / 2;
		ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, innerMidAdjustedAngle, true);
		ctx.arc(x, y, innerRadius, innerMidAdjustedAngle, startAngle + innerStart / innerRadius, true);
		if (innerStart > 0) {
			const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
			ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
		}
		const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
		ctx.lineTo(p8.x, p8.y);
		if (outerStart > 0) {
			const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
			ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
		}
	} else {
		ctx.moveTo(x, y);
		const outerStartX = Math.cos(outerStartAdjustedAngle) * outerRadius + x;
		const outerStartY = Math.sin(outerStartAdjustedAngle) * outerRadius + y;
		ctx.lineTo(outerStartX, outerStartY);
		const outerEndX = Math.cos(outerEndAdjustedAngle) * outerRadius + x;
		const outerEndY = Math.sin(outerEndAdjustedAngle) * outerRadius + y;
		ctx.lineTo(outerEndX, outerEndY);
	}
	ctx.closePath();
}
function drawArc(ctx, element, offset, spacing, circular) {
	const { fullCircles, startAngle, circumference } = element;
	let endAngle = element.endAngle;
	if (fullCircles) {
		pathArc(ctx, element, offset, spacing, endAngle, circular);
		for (let i = 0; i < fullCircles; ++i) ctx.fill();
		if (!isNaN(circumference)) endAngle = startAngle + (circumference % TAU || TAU);
	}
	pathArc(ctx, element, offset, spacing, endAngle, circular);
	ctx.fill();
	return endAngle;
}
function drawBorder(ctx, element, offset, spacing, circular) {
	const { fullCircles, startAngle, circumference, options } = element;
	const { borderWidth, borderJoinStyle, borderDash, borderDashOffset, borderRadius } = options;
	const inner = options.borderAlign === "inner";
	if (!borderWidth) return;
	ctx.setLineDash(borderDash || []);
	ctx.lineDashOffset = borderDashOffset;
	if (inner) {
		ctx.lineWidth = borderWidth * 2;
		ctx.lineJoin = borderJoinStyle || "round";
	} else {
		ctx.lineWidth = borderWidth;
		ctx.lineJoin = borderJoinStyle || "bevel";
	}
	let endAngle = element.endAngle;
	if (fullCircles) {
		pathArc(ctx, element, offset, spacing, endAngle, circular);
		for (let i = 0; i < fullCircles; ++i) ctx.stroke();
		if (!isNaN(circumference)) endAngle = startAngle + (circumference % TAU || TAU);
	}
	if (inner) clipArc(ctx, element, endAngle);
	if (options.selfJoin && endAngle - startAngle >= PI && borderRadius === 0 && borderJoinStyle !== "miter") clipSelf(ctx, element, endAngle);
	if (!fullCircles) {
		pathArc(ctx, element, offset, spacing, endAngle, circular);
		ctx.stroke();
	}
}
var ArcElement = class extends Element$1 {
	static id = "arc";
	static defaults = {
		borderAlign: "center",
		borderColor: "#fff",
		borderDash: [],
		borderDashOffset: 0,
		borderJoinStyle: void 0,
		borderRadius: 0,
		borderWidth: 2,
		offset: 0,
		spacing: 0,
		angle: void 0,
		circular: true,
		selfJoin: false
	};
	static defaultRoutes = { backgroundColor: "backgroundColor" };
	static descriptors = {
		_scriptable: true,
		_indexable: (name) => name !== "borderDash"
	};
	circumference;
	endAngle;
	fullCircles;
	innerRadius;
	outerRadius;
	pixelMargin;
	startAngle;
	constructor(cfg) {
		super();
		this.options = void 0;
		this.circumference = void 0;
		this.startAngle = void 0;
		this.endAngle = void 0;
		this.innerRadius = void 0;
		this.outerRadius = void 0;
		this.pixelMargin = 0;
		this.fullCircles = 0;
		if (cfg) Object.assign(this, cfg);
	}
	inRange(chartX, chartY, useFinalPosition) {
		const { angle, distance } = getAngleFromPoint(this.getProps(["x", "y"], useFinalPosition), {
			x: chartX,
			y: chartY
		});
		const { startAngle, endAngle, innerRadius, outerRadius, circumference } = this.getProps([
			"startAngle",
			"endAngle",
			"innerRadius",
			"outerRadius",
			"circumference"
		], useFinalPosition);
		const rAdjust = (this.options.spacing + this.options.borderWidth) / 2;
		const _circumference = valueOrDefault(circumference, endAngle - startAngle);
		const nonZeroBetween = _angleBetween(angle, startAngle, endAngle) && startAngle !== endAngle;
		const betweenAngles = _circumference >= TAU || nonZeroBetween;
		const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
		return betweenAngles && withinRadius;
	}
	getCenterPoint(useFinalPosition) {
		const { x, y, startAngle, endAngle, innerRadius, outerRadius } = this.getProps([
			"x",
			"y",
			"startAngle",
			"endAngle",
			"innerRadius",
			"outerRadius"
		], useFinalPosition);
		const { offset, spacing } = this.options;
		const halfAngle = (startAngle + endAngle) / 2;
		const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
		return {
			x: x + Math.cos(halfAngle) * halfRadius,
			y: y + Math.sin(halfAngle) * halfRadius
		};
	}
	tooltipPosition(useFinalPosition) {
		return this.getCenterPoint(useFinalPosition);
	}
	draw(ctx) {
		const { options, circumference } = this;
		const offset = (options.offset || 0) / 4;
		const spacing = (options.spacing || 0) / 2;
		const circular = options.circular;
		this.pixelMargin = options.borderAlign === "inner" ? .33 : 0;
		this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
		if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) return;
		ctx.save();
		const halfAngle = (this.startAngle + this.endAngle) / 2;
		ctx.translate(Math.cos(halfAngle) * offset, Math.sin(halfAngle) * offset);
		const radiusOffset = offset * (1 - Math.sin(Math.min(PI, circumference || 0)));
		ctx.fillStyle = options.backgroundColor;
		ctx.strokeStyle = options.borderColor;
		drawArc(ctx, this, radiusOffset, spacing, circular);
		drawBorder(ctx, this, radiusOffset, spacing, circular);
		ctx.restore();
	}
};
function setStyle(ctx, options, style = options) {
	ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
	ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
	ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
	ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
	ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
	ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
}
function lineTo(ctx, previous, target) {
	ctx.lineTo(target.x, target.y);
}
function getLineMethod(options) {
	if (options.stepped) return _steppedLineTo;
	if (options.tension || options.cubicInterpolationMode === "monotone") return _bezierCurveTo;
	return lineTo;
}
function pathVars(points, segment, params = {}) {
	const count = points.length;
	const { start: paramsStart = 0, end: paramsEnd = count - 1 } = params;
	const { start: segmentStart, end: segmentEnd } = segment;
	const start = Math.max(paramsStart, segmentStart);
	const end = Math.min(paramsEnd, segmentEnd);
	const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
	return {
		count,
		start,
		loop: segment.loop,
		ilen: end < start && !outside ? count + end - start : end - start
	};
}
function pathSegment(ctx, line, segment, params) {
	const { points, options } = line;
	const { count, start, loop, ilen } = pathVars(points, segment, params);
	const lineMethod = getLineMethod(options);
	let { move = true, reverse } = params || {};
	let i, point, prev;
	for (i = 0; i <= ilen; ++i) {
		point = points[(start + (reverse ? ilen - i : i)) % count];
		if (point.skip) continue;
		else if (move) {
			ctx.moveTo(point.x, point.y);
			move = false;
		} else lineMethod(ctx, prev, point, reverse, options.stepped);
		prev = point;
	}
	if (loop) {
		point = points[(start + (reverse ? ilen : 0)) % count];
		lineMethod(ctx, prev, point, reverse, options.stepped);
	}
	return !!loop;
}
function fastPathSegment(ctx, line, segment, params) {
	const points = line.points;
	const { count, start, ilen } = pathVars(points, segment, params);
	const { move = true, reverse } = params || {};
	let avgX = 0;
	let countX = 0;
	let i, point, prevX, minY, maxY, lastY;
	const pointIndex = (index) => (start + (reverse ? ilen - index : index)) % count;
	const drawX = () => {
		if (minY !== maxY) {
			ctx.lineTo(avgX, maxY);
			ctx.lineTo(avgX, minY);
			ctx.lineTo(avgX, lastY);
		}
	};
	if (move) {
		point = points[pointIndex(0)];
		ctx.moveTo(point.x, point.y);
	}
	for (i = 0; i <= ilen; ++i) {
		point = points[pointIndex(i)];
		if (point.skip) continue;
		const x = point.x;
		const y = point.y;
		const truncX = x | 0;
		if (truncX === prevX) {
			if (y < minY) minY = y;
			else if (y > maxY) maxY = y;
			avgX = (countX * avgX + x) / ++countX;
		} else {
			drawX();
			ctx.lineTo(x, y);
			prevX = truncX;
			countX = 0;
			minY = maxY = y;
		}
		lastY = y;
	}
	drawX();
}
function _getSegmentMethod(line) {
	const opts = line.options;
	const borderDash = opts.borderDash && opts.borderDash.length;
	return !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== "monotone" && !opts.stepped && !borderDash ? fastPathSegment : pathSegment;
}
function _getInterpolationMethod(options) {
	if (options.stepped) return _steppedInterpolation;
	if (options.tension || options.cubicInterpolationMode === "monotone") return _bezierInterpolation;
	return _pointInLine;
}
function strokePathWithCache(ctx, line, start, count) {
	let path = line._path;
	if (!path) {
		path = line._path = new Path2D();
		if (line.path(path, start, count)) path.closePath();
	}
	setStyle(ctx, line.options);
	ctx.stroke(path);
}
function strokePathDirect(ctx, line, start, count) {
	const { segments, options } = line;
	const segmentMethod = _getSegmentMethod(line);
	for (const segment of segments) {
		setStyle(ctx, options, segment.style);
		ctx.beginPath();
		if (segmentMethod(ctx, line, segment, {
			start,
			end: start + count - 1
		})) ctx.closePath();
		ctx.stroke();
	}
}
var usePath2D = typeof Path2D === "function";
function draw(ctx, line, start, count) {
	if (usePath2D && !line.options.segment) strokePathWithCache(ctx, line, start, count);
	else strokePathDirect(ctx, line, start, count);
}
var LineElement = class extends Element$1 {
	static id = "line";
	static defaults = {
		borderCapStyle: "butt",
		borderDash: [],
		borderDashOffset: 0,
		borderJoinStyle: "miter",
		borderWidth: 3,
		capBezierPoints: true,
		cubicInterpolationMode: "default",
		fill: false,
		spanGaps: false,
		stepped: false,
		tension: 0
	};
	static defaultRoutes = {
		backgroundColor: "backgroundColor",
		borderColor: "borderColor"
	};
	static descriptors = {
		_scriptable: true,
		_indexable: (name) => name !== "borderDash" && name !== "fill"
	};
	constructor(cfg) {
		super();
		this.animated = true;
		this.options = void 0;
		this._chart = void 0;
		this._loop = void 0;
		this._fullLoop = void 0;
		this._path = void 0;
		this._points = void 0;
		this._segments = void 0;
		this._decimated = false;
		this._pointsUpdated = false;
		this._datasetIndex = void 0;
		if (cfg) Object.assign(this, cfg);
	}
	updateControlPoints(chartArea, indexAxis) {
		const options = this.options;
		if ((options.tension || options.cubicInterpolationMode === "monotone") && !options.stepped && !this._pointsUpdated) {
			const loop = options.spanGaps ? this._loop : this._fullLoop;
			_updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
			this._pointsUpdated = true;
		}
	}
	set points(points) {
		this._points = points;
		delete this._segments;
		delete this._path;
		this._pointsUpdated = false;
	}
	get points() {
		return this._points;
	}
	get segments() {
		return this._segments || (this._segments = _computeSegments(this, this.options.segment));
	}
	first() {
		const segments = this.segments;
		const points = this.points;
		return segments.length && points[segments[0].start];
	}
	last() {
		const segments = this.segments;
		const points = this.points;
		const count = segments.length;
		return count && points[segments[count - 1].end];
	}
	interpolate(point, property) {
		const options = this.options;
		const value = point[property];
		const points = this.points;
		const segments = _boundSegments(this, {
			property,
			start: value,
			end: value
		});
		if (!segments.length) return;
		const result = [];
		const _interpolate = _getInterpolationMethod(options);
		let i, ilen;
		for (i = 0, ilen = segments.length; i < ilen; ++i) {
			const { start, end } = segments[i];
			const p1 = points[start];
			const p2 = points[end];
			if (p1 === p2) {
				result.push(p1);
				continue;
			}
			const interpolated = _interpolate(p1, p2, Math.abs((value - p1[property]) / (p2[property] - p1[property])), options.stepped);
			interpolated[property] = point[property];
			result.push(interpolated);
		}
		return result.length === 1 ? result[0] : result;
	}
	pathSegment(ctx, segment, params) {
		return _getSegmentMethod(this)(ctx, this, segment, params);
	}
	path(ctx, start, count) {
		const segments = this.segments;
		const segmentMethod = _getSegmentMethod(this);
		let loop = this._loop;
		start = start || 0;
		count = count || this.points.length - start;
		for (const segment of segments) loop &= segmentMethod(ctx, this, segment, {
			start,
			end: start + count - 1
		});
		return !!loop;
	}
	draw(ctx, chartArea, start, count) {
		const options = this.options || {};
		if ((this.points || []).length && options.borderWidth) {
			ctx.save();
			draw(ctx, this, start, count);
			ctx.restore();
		}
		if (this.animated) {
			this._pointsUpdated = false;
			this._path = void 0;
		}
	}
};
function inRange$1(el, pos, axis, useFinalPosition) {
	const options = el.options;
	const { [axis]: value } = el.getProps([axis], useFinalPosition);
	return Math.abs(pos - value) < options.radius + options.hitRadius;
}
var PointElement = class extends Element$1 {
	static id = "point";
	parsed;
	skip;
	stop;
	/**
	* @type {any}
	*/ static defaults = {
		borderWidth: 1,
		hitRadius: 1,
		hoverBorderWidth: 1,
		hoverRadius: 4,
		pointStyle: "circle",
		radius: 3,
		rotation: 0
	};
	/**
	* @type {any}
	*/ static defaultRoutes = {
		backgroundColor: "backgroundColor",
		borderColor: "borderColor"
	};
	constructor(cfg) {
		super();
		this.options = void 0;
		this.parsed = void 0;
		this.skip = void 0;
		this.stop = void 0;
		if (cfg) Object.assign(this, cfg);
	}
	inRange(mouseX, mouseY, useFinalPosition) {
		const options = this.options;
		const { x, y } = this.getProps(["x", "y"], useFinalPosition);
		return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
	}
	inXRange(mouseX, useFinalPosition) {
		return inRange$1(this, mouseX, "x", useFinalPosition);
	}
	inYRange(mouseY, useFinalPosition) {
		return inRange$1(this, mouseY, "y", useFinalPosition);
	}
	getCenterPoint(useFinalPosition) {
		const { x, y } = this.getProps(["x", "y"], useFinalPosition);
		return {
			x,
			y
		};
	}
	size(options) {
		options = options || this.options || {};
		let radius = options.radius || 0;
		radius = Math.max(radius, radius && options.hoverRadius || 0);
		const borderWidth = radius && options.borderWidth || 0;
		return (radius + borderWidth) * 2;
	}
	draw(ctx, area) {
		const options = this.options;
		if (this.skip || options.radius < .1 || !_isPointInArea(this, area, this.size(options) / 2)) return;
		ctx.strokeStyle = options.borderColor;
		ctx.lineWidth = options.borderWidth;
		ctx.fillStyle = options.backgroundColor;
		drawPoint(ctx, options, this.x, this.y);
	}
	getRange() {
		const options = this.options || {};
		return options.radius + options.hitRadius;
	}
};
function getBarBounds(bar, useFinalPosition) {
	const { x, y, base, width, height } = bar.getProps([
		"x",
		"y",
		"base",
		"width",
		"height"
	], useFinalPosition);
	let left, right, top, bottom, half;
	if (bar.horizontal) {
		half = height / 2;
		left = Math.min(x, base);
		right = Math.max(x, base);
		top = y - half;
		bottom = y + half;
	} else {
		half = width / 2;
		left = x - half;
		right = x + half;
		top = Math.min(y, base);
		bottom = Math.max(y, base);
	}
	return {
		left,
		top,
		right,
		bottom
	};
}
function skipOrLimit(skip, value, min, max) {
	return skip ? 0 : _limitValue(value, min, max);
}
function parseBorderWidth(bar, maxW, maxH) {
	const value = bar.options.borderWidth;
	const skip = bar.borderSkipped;
	const o = toTRBL(value);
	return {
		t: skipOrLimit(skip.top, o.top, 0, maxH),
		r: skipOrLimit(skip.right, o.right, 0, maxW),
		b: skipOrLimit(skip.bottom, o.bottom, 0, maxH),
		l: skipOrLimit(skip.left, o.left, 0, maxW)
	};
}
function parseBorderRadius(bar, maxW, maxH) {
	const { enableBorderRadius } = bar.getProps(["enableBorderRadius"]);
	const value = bar.options.borderRadius;
	const o = toTRBLCorners(value);
	const maxR = Math.min(maxW, maxH);
	const skip = bar.borderSkipped;
	const enableBorder = enableBorderRadius || isObject(value);
	return {
		topLeft: skipOrLimit(!enableBorder || skip.top || skip.left, o.topLeft, 0, maxR),
		topRight: skipOrLimit(!enableBorder || skip.top || skip.right, o.topRight, 0, maxR),
		bottomLeft: skipOrLimit(!enableBorder || skip.bottom || skip.left, o.bottomLeft, 0, maxR),
		bottomRight: skipOrLimit(!enableBorder || skip.bottom || skip.right, o.bottomRight, 0, maxR)
	};
}
function boundingRects(bar) {
	const bounds = getBarBounds(bar);
	const width = bounds.right - bounds.left;
	const height = bounds.bottom - bounds.top;
	const border = parseBorderWidth(bar, width / 2, height / 2);
	const radius = parseBorderRadius(bar, width / 2, height / 2);
	return {
		outer: {
			x: bounds.left,
			y: bounds.top,
			w: width,
			h: height,
			radius
		},
		inner: {
			x: bounds.left + border.l,
			y: bounds.top + border.t,
			w: width - border.l - border.r,
			h: height - border.t - border.b,
			radius: {
				topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
				topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
				bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
				bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
			}
		}
	};
}
function inRange(bar, x, y, useFinalPosition) {
	const skipX = x === null;
	const skipY = y === null;
	const bounds = bar && !(skipX && skipY) && getBarBounds(bar, useFinalPosition);
	return bounds && (skipX || _isBetween(x, bounds.left, bounds.right)) && (skipY || _isBetween(y, bounds.top, bounds.bottom));
}
function hasRadius(radius) {
	return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
}
function addNormalRectPath(ctx, rect) {
	ctx.rect(rect.x, rect.y, rect.w, rect.h);
}
function inflateRect(rect, amount, refRect = {}) {
	const x = rect.x !== refRect.x ? -amount : 0;
	const y = rect.y !== refRect.y ? -amount : 0;
	const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
	const h = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
	return {
		x: rect.x + x,
		y: rect.y + y,
		w: rect.w + w,
		h: rect.h + h,
		radius: rect.radius
	};
}
var BarElement = class extends Element$1 {
	static id = "bar";
	static defaults = {
		borderSkipped: "start",
		borderWidth: 0,
		borderRadius: 0,
		inflateAmount: "auto",
		pointStyle: void 0
	};
	static defaultRoutes = {
		backgroundColor: "backgroundColor",
		borderColor: "borderColor"
	};
	constructor(cfg) {
		super();
		this.options = void 0;
		this.horizontal = void 0;
		this.base = void 0;
		this.width = void 0;
		this.height = void 0;
		this.inflateAmount = void 0;
		if (cfg) Object.assign(this, cfg);
	}
	draw(ctx) {
		const { inflateAmount, options: { borderColor, backgroundColor } } = this;
		const { inner, outer } = boundingRects(this);
		const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
		ctx.save();
		if (outer.w !== inner.w || outer.h !== inner.h) {
			ctx.beginPath();
			addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
			ctx.clip();
			addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
			ctx.fillStyle = borderColor;
			ctx.fill("evenodd");
		}
		ctx.beginPath();
		addRectPath(ctx, inflateRect(inner, inflateAmount));
		ctx.fillStyle = backgroundColor;
		ctx.fill();
		ctx.restore();
	}
	inRange(mouseX, mouseY, useFinalPosition) {
		return inRange(this, mouseX, mouseY, useFinalPosition);
	}
	inXRange(mouseX, useFinalPosition) {
		return inRange(this, mouseX, null, useFinalPosition);
	}
	inYRange(mouseY, useFinalPosition) {
		return inRange(this, null, mouseY, useFinalPosition);
	}
	getCenterPoint(useFinalPosition) {
		const { x, y, base, horizontal } = this.getProps([
			"x",
			"y",
			"base",
			"horizontal"
		], useFinalPosition);
		return {
			x: horizontal ? (x + base) / 2 : x,
			y: horizontal ? y : (y + base) / 2
		};
	}
	getRange(axis) {
		return axis === "x" ? this.width / 2 : this.height / 2;
	}
};
var elements = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	ArcElement,
	BarElement,
	LineElement,
	PointElement
});
var BORDER_COLORS = [
	"rgb(54, 162, 235)",
	"rgb(255, 99, 132)",
	"rgb(255, 159, 64)",
	"rgb(255, 205, 86)",
	"rgb(75, 192, 192)",
	"rgb(153, 102, 255)",
	"rgb(201, 203, 207)"
];
var BACKGROUND_COLORS = /* @__PURE__ */ BORDER_COLORS.map((color) => color.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function getBorderColor(i) {
	return BORDER_COLORS[i % BORDER_COLORS.length];
}
function getBackgroundColor(i) {
	return BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
}
function colorizeDefaultDataset(dataset, i) {
	dataset.borderColor = getBorderColor(i);
	dataset.backgroundColor = getBackgroundColor(i);
	return ++i;
}
function colorizeDoughnutDataset(dataset, i) {
	dataset.backgroundColor = dataset.data.map(() => getBorderColor(i++));
	return i;
}
function colorizePolarAreaDataset(dataset, i) {
	dataset.backgroundColor = dataset.data.map(() => getBackgroundColor(i++));
	return i;
}
function getColorizer(chart) {
	let i = 0;
	return (dataset, datasetIndex) => {
		const controller = chart.getDatasetMeta(datasetIndex).controller;
		if (controller instanceof DoughnutController) i = colorizeDoughnutDataset(dataset, i);
		else if (controller instanceof PolarAreaController) i = colorizePolarAreaDataset(dataset, i);
		else if (controller) i = colorizeDefaultDataset(dataset, i);
	};
}
function containsColorsDefinitions(descriptors) {
	let k;
	for (k in descriptors) if (descriptors[k].borderColor || descriptors[k].backgroundColor) return true;
	return false;
}
function containsColorsDefinition(descriptor) {
	return descriptor && (descriptor.borderColor || descriptor.backgroundColor);
}
function containsDefaultColorsDefenitions() {
	return defaults.borderColor !== "rgba(0,0,0,0.1)" || defaults.backgroundColor !== "rgba(0,0,0,0.1)";
}
var plugin_colors = {
	id: "colors",
	defaults: {
		enabled: true,
		forceOverride: false
	},
	beforeLayout(chart, _args, options) {
		if (!options.enabled) return;
		const { data: { datasets }, options: chartOptions } = chart.config;
		const { elements } = chartOptions;
		const containsColorDefenition = containsColorsDefinitions(datasets) || containsColorsDefinition(chartOptions) || elements && containsColorsDefinitions(elements) || containsDefaultColorsDefenitions();
		if (!options.forceOverride && containsColorDefenition) return;
		const colorizer = getColorizer(chart);
		datasets.forEach(colorizer);
	}
};
function lttbDecimation(data, start, count, availableWidth, options) {
	const samples = options.samples || availableWidth;
	if (samples >= count) return data.slice(start, start + count);
	const decimated = [];
	const bucketWidth = (count - 2) / (samples - 2);
	let sampledIndex = 0;
	const endIndex = start + count - 1;
	let a = start;
	let i, maxAreaPoint, maxArea, area, nextA;
	decimated[sampledIndex++] = data[a];
	for (i = 0; i < samples - 2; i++) {
		let avgX = 0;
		let avgY = 0;
		let j;
		const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
		const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
		const avgRangeLength = avgRangeEnd - avgRangeStart;
		for (j = avgRangeStart; j < avgRangeEnd; j++) {
			avgX += data[j].x;
			avgY += data[j].y;
		}
		avgX /= avgRangeLength;
		avgY /= avgRangeLength;
		const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
		const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
		const { x: pointAx, y: pointAy } = data[a];
		maxArea = area = -1;
		for (j = rangeOffs; j < rangeTo; j++) {
			area = .5 * Math.abs((pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy));
			if (area > maxArea) {
				maxArea = area;
				maxAreaPoint = data[j];
				nextA = j;
			}
		}
		decimated[sampledIndex++] = maxAreaPoint;
		a = nextA;
	}
	decimated[sampledIndex++] = data[endIndex];
	return decimated;
}
function minMaxDecimation(data, start, count, availableWidth) {
	let avgX = 0;
	let countX = 0;
	let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
	const decimated = [];
	const endIndex = start + count - 1;
	const xMin = data[start].x;
	const dx = data[endIndex].x - xMin;
	for (i = start; i < start + count; ++i) {
		point = data[i];
		x = (point.x - xMin) / dx * availableWidth;
		y = point.y;
		const truncX = x | 0;
		if (truncX === prevX) {
			if (y < minY) {
				minY = y;
				minIndex = i;
			} else if (y > maxY) {
				maxY = y;
				maxIndex = i;
			}
			avgX = (countX * avgX + point.x) / ++countX;
		} else {
			const lastIndex = i - 1;
			if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
				const intermediateIndex1 = Math.min(minIndex, maxIndex);
				const intermediateIndex2 = Math.max(minIndex, maxIndex);
				if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) decimated.push({
					...data[intermediateIndex1],
					x: avgX
				});
				if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) decimated.push({
					...data[intermediateIndex2],
					x: avgX
				});
			}
			if (i > 0 && lastIndex !== startIndex) decimated.push(data[lastIndex]);
			decimated.push(point);
			prevX = truncX;
			countX = 0;
			minY = maxY = y;
			minIndex = maxIndex = startIndex = i;
		}
	}
	return decimated;
}
function cleanDecimatedDataset(dataset) {
	if (dataset._decimated) {
		const data = dataset._data;
		delete dataset._decimated;
		delete dataset._data;
		Object.defineProperty(dataset, "data", {
			configurable: true,
			enumerable: true,
			writable: true,
			value: data
		});
	}
}
function cleanDecimatedData(chart) {
	chart.data.datasets.forEach((dataset) => {
		cleanDecimatedDataset(dataset);
	});
}
function getStartAndCountOfVisiblePointsSimplified(meta, points) {
	const pointCount = points.length;
	let start = 0;
	let count;
	const { iScale } = meta;
	const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
	if (minDefined) start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
	if (maxDefined) count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start;
	else count = pointCount - start;
	return {
		start,
		count
	};
}
var plugin_decimation = {
	id: "decimation",
	defaults: {
		algorithm: "min-max",
		enabled: false
	},
	beforeElementsUpdate: (chart, args, options) => {
		if (!options.enabled) {
			cleanDecimatedData(chart);
			return;
		}
		const availableWidth = chart.width;
		chart.data.datasets.forEach((dataset, datasetIndex) => {
			const { _data, indexAxis } = dataset;
			const meta = chart.getDatasetMeta(datasetIndex);
			const data = _data || dataset.data;
			if (resolve([indexAxis, chart.options.indexAxis]) === "y") return;
			if (!meta.controller.supportsDecimation) return;
			const xAxis = chart.scales[meta.xAxisID];
			if (xAxis.type !== "linear" && xAxis.type !== "time") return;
			if (chart.options.parsing) return;
			let { start, count } = getStartAndCountOfVisiblePointsSimplified(meta, data);
			if (count <= (options.threshold || 4 * availableWidth)) {
				cleanDecimatedDataset(dataset);
				return;
			}
			if (isNullOrUndef(_data)) {
				dataset._data = data;
				delete dataset.data;
				Object.defineProperty(dataset, "data", {
					configurable: true,
					enumerable: true,
					get: function() {
						return this._decimated;
					},
					set: function(d) {
						this._data = d;
					}
				});
			}
			let decimated;
			switch (options.algorithm) {
				case "lttb":
					decimated = lttbDecimation(data, start, count, availableWidth, options);
					break;
				case "min-max":
					decimated = minMaxDecimation(data, start, count, availableWidth);
					break;
				default: throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
			}
			dataset._decimated = decimated;
		});
	},
	destroy(chart) {
		cleanDecimatedData(chart);
	}
};
function _segments(line, target, property) {
	const segments = line.segments;
	const points = line.points;
	const tpoints = target.points;
	const parts = [];
	for (const segment of segments) {
		let { start, end } = segment;
		end = _findSegmentEnd(start, end, points);
		const bounds = _getBounds(property, points[start], points[end], segment.loop);
		if (!target.segments) {
			parts.push({
				source: segment,
				target: bounds,
				start: points[start],
				end: points[end]
			});
			continue;
		}
		const targetSegments = _boundSegments(target, bounds);
		for (const tgt of targetSegments) {
			const subBounds = _getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
			const fillSources = _boundSegment(segment, points, subBounds);
			for (const fillSource of fillSources) parts.push({
				source: fillSource,
				target: tgt,
				start: { [property]: _getEdge(bounds, subBounds, "start", Math.max) },
				end: { [property]: _getEdge(bounds, subBounds, "end", Math.min) }
			});
		}
	}
	return parts;
}
function _getBounds(property, first, last, loop) {
	if (loop) return;
	let start = first[property];
	let end = last[property];
	if (property === "angle") {
		start = _normalizeAngle(start);
		end = _normalizeAngle(end);
	}
	return {
		property,
		start,
		end
	};
}
function _pointsFromSegments(boundary, line) {
	const { x = null, y = null } = boundary || {};
	const linePoints = line.points;
	const points = [];
	line.segments.forEach(({ start, end }) => {
		end = _findSegmentEnd(start, end, linePoints);
		const first = linePoints[start];
		const last = linePoints[end];
		if (y !== null) {
			points.push({
				x: first.x,
				y
			});
			points.push({
				x: last.x,
				y
			});
		} else if (x !== null) {
			points.push({
				x,
				y: first.y
			});
			points.push({
				x,
				y: last.y
			});
		}
	});
	return points;
}
function _findSegmentEnd(start, end, points) {
	for (; end > start; end--) {
		const point = points[end];
		if (!isNaN(point.x) && !isNaN(point.y)) break;
	}
	return end;
}
function _getEdge(a, b, prop, fn) {
	if (a && b) return fn(a[prop], b[prop]);
	return a ? a[prop] : b ? b[prop] : 0;
}
function _createBoundaryLine(boundary, line) {
	let points = [];
	let _loop = false;
	if (isArray(boundary)) {
		_loop = true;
		points = boundary;
	} else points = _pointsFromSegments(boundary, line);
	return points.length ? new LineElement({
		points,
		options: { tension: 0 },
		_loop,
		_fullLoop: _loop
	}) : null;
}
function _shouldApplyFill(source) {
	return source && source.fill !== false;
}
function _resolveTarget(sources, index, propagate) {
	let fill = sources[index].fill;
	const visited = [index];
	let target;
	if (!propagate) return fill;
	while (fill !== false && visited.indexOf(fill) === -1) {
		if (!isNumberFinite(fill)) return fill;
		target = sources[fill];
		if (!target) return false;
		if (target.visible) return fill;
		visited.push(fill);
		fill = target.fill;
	}
	return false;
}
function _decodeFill(line, index, count) {
	const fill = parseFillOption(line);
	if (isObject(fill)) return isNaN(fill.value) ? false : fill;
	let target = parseFloat(fill);
	if (isNumberFinite(target) && Math.floor(target) === target) return decodeTargetIndex(fill[0], index, target, count);
	return [
		"origin",
		"start",
		"end",
		"stack",
		"shape"
	].indexOf(fill) >= 0 && fill;
}
function decodeTargetIndex(firstCh, index, target, count) {
	if (firstCh === "-" || firstCh === "+") target = index + target;
	if (target === index || target < 0 || target >= count) return false;
	return target;
}
function _getTargetPixel(fill, scale) {
	let pixel = null;
	if (fill === "start") pixel = scale.bottom;
	else if (fill === "end") pixel = scale.top;
	else if (isObject(fill)) pixel = scale.getPixelForValue(fill.value);
	else if (scale.getBasePixel) pixel = scale.getBasePixel();
	return pixel;
}
function _getTargetValue(fill, scale, startValue) {
	let value;
	if (fill === "start") value = startValue;
	else if (fill === "end") value = scale.options.reverse ? scale.min : scale.max;
	else if (isObject(fill)) value = fill.value;
	else value = scale.getBaseValue();
	return value;
}
function parseFillOption(line) {
	const options = line.options;
	const fillOption = options.fill;
	let fill = valueOrDefault(fillOption && fillOption.target, fillOption);
	if (fill === void 0) fill = !!options.backgroundColor;
	if (fill === false || fill === null) return false;
	if (fill === true) return "origin";
	return fill;
}
function _buildStackLine(source) {
	const { scale, index, line } = source;
	const points = [];
	const segments = line.segments;
	const sourcePoints = line.points;
	const linesBelow = getLinesBelow(scale, index);
	linesBelow.push(_createBoundaryLine({
		x: null,
		y: scale.bottom
	}, line));
	for (let i = 0; i < segments.length; i++) {
		const segment = segments[i];
		for (let j = segment.start; j <= segment.end; j++) addPointsBelow(points, sourcePoints[j], linesBelow);
	}
	return new LineElement({
		points,
		options: {}
	});
}
function getLinesBelow(scale, index) {
	const below = [];
	const metas = scale.getMatchingVisibleMetas("line");
	for (let i = 0; i < metas.length; i++) {
		const meta = metas[i];
		if (meta.index === index) break;
		if (!meta.hidden) below.unshift(meta.dataset);
	}
	return below;
}
function addPointsBelow(points, sourcePoint, linesBelow) {
	const postponed = [];
	for (let j = 0; j < linesBelow.length; j++) {
		const line = linesBelow[j];
		const { first, last, point } = findPoint(line, sourcePoint, "x");
		if (!point || first && last) continue;
		if (first) postponed.unshift(point);
		else {
			points.push(point);
			if (!last) break;
		}
	}
	points.push(...postponed);
}
function findPoint(line, sourcePoint, property) {
	const point = line.interpolate(sourcePoint, property);
	if (!point) return {};
	const pointValue = point[property];
	const segments = line.segments;
	const linePoints = line.points;
	let first = false;
	let last = false;
	for (let i = 0; i < segments.length; i++) {
		const segment = segments[i];
		const firstValue = linePoints[segment.start][property];
		const lastValue = linePoints[segment.end][property];
		if (_isBetween(pointValue, firstValue, lastValue)) {
			first = pointValue === firstValue;
			last = pointValue === lastValue;
			break;
		}
	}
	return {
		first,
		last,
		point
	};
}
var simpleArc = class {
	constructor(opts) {
		this.x = opts.x;
		this.y = opts.y;
		this.radius = opts.radius;
	}
	pathSegment(ctx, bounds, opts) {
		const { x, y, radius } = this;
		bounds = bounds || {
			start: 0,
			end: TAU
		};
		ctx.arc(x, y, radius, bounds.end, bounds.start, true);
		return !opts.bounds;
	}
	interpolate(point) {
		const { x, y, radius } = this;
		const angle = point.angle;
		return {
			x: x + Math.cos(angle) * radius,
			y: y + Math.sin(angle) * radius,
			angle
		};
	}
};
function _getTarget(source) {
	const { chart, fill, line } = source;
	if (isNumberFinite(fill)) return getLineByIndex(chart, fill);
	if (fill === "stack") return _buildStackLine(source);
	if (fill === "shape") return true;
	const boundary = computeBoundary(source);
	if (boundary instanceof simpleArc) return boundary;
	return _createBoundaryLine(boundary, line);
}
function getLineByIndex(chart, index) {
	const meta = chart.getDatasetMeta(index);
	return meta && chart.isDatasetVisible(index) ? meta.dataset : null;
}
function computeBoundary(source) {
	if ((source.scale || {}).getPointPositionForValue) return computeCircularBoundary(source);
	return computeLinearBoundary(source);
}
function computeLinearBoundary(source) {
	const { scale = {}, fill } = source;
	const pixel = _getTargetPixel(fill, scale);
	if (isNumberFinite(pixel)) {
		const horizontal = scale.isHorizontal();
		return {
			x: horizontal ? pixel : null,
			y: horizontal ? null : pixel
		};
	}
	return null;
}
function computeCircularBoundary(source) {
	const { scale, fill } = source;
	const options = scale.options;
	const length = scale.getLabels().length;
	const start = options.reverse ? scale.max : scale.min;
	const value = _getTargetValue(fill, scale, start);
	const target = [];
	if (options.grid.circular) {
		const center = scale.getPointPositionForValue(0, start);
		return new simpleArc({
			x: center.x,
			y: center.y,
			radius: scale.getDistanceFromCenterForValue(value)
		});
	}
	for (let i = 0; i < length; ++i) target.push(scale.getPointPositionForValue(i, value));
	return target;
}
function _drawfill(ctx, source, area) {
	const target = _getTarget(source);
	const { chart, index, line, scale, axis } = source;
	const lineOpts = line.options;
	const fillOption = lineOpts.fill;
	const color = lineOpts.backgroundColor;
	const { above = color, below = color } = fillOption || {};
	const clip = getDatasetClipArea(chart, chart.getDatasetMeta(index));
	if (target && line.points.length) {
		clipArea(ctx, area);
		doFill(ctx, {
			line,
			target,
			above,
			below,
			area,
			scale,
			axis,
			clip
		});
		unclipArea(ctx);
	}
}
function doFill(ctx, cfg) {
	const { line, target, above, below, area, scale, clip } = cfg;
	const property = line._loop ? "angle" : cfg.axis;
	ctx.save();
	let fillColor = below;
	if (below !== above) {
		if (property === "x") {
			clipVertical(ctx, target, area.top);
			fill(ctx, {
				line,
				target,
				color: above,
				scale,
				property,
				clip
			});
			ctx.restore();
			ctx.save();
			clipVertical(ctx, target, area.bottom);
		} else if (property === "y") {
			clipHorizontal(ctx, target, area.left);
			fill(ctx, {
				line,
				target,
				color: below,
				scale,
				property,
				clip
			});
			ctx.restore();
			ctx.save();
			clipHorizontal(ctx, target, area.right);
			fillColor = above;
		}
	}
	fill(ctx, {
		line,
		target,
		color: fillColor,
		scale,
		property,
		clip
	});
	ctx.restore();
}
function clipVertical(ctx, target, clipY) {
	const { segments, points } = target;
	let first = true;
	let lineLoop = false;
	ctx.beginPath();
	for (const segment of segments) {
		const { start, end } = segment;
		const firstPoint = points[start];
		const lastPoint = points[_findSegmentEnd(start, end, points)];
		if (first) {
			ctx.moveTo(firstPoint.x, firstPoint.y);
			first = false;
		} else {
			ctx.lineTo(firstPoint.x, clipY);
			ctx.lineTo(firstPoint.x, firstPoint.y);
		}
		lineLoop = !!target.pathSegment(ctx, segment, { move: lineLoop });
		if (lineLoop) ctx.closePath();
		else ctx.lineTo(lastPoint.x, clipY);
	}
	ctx.lineTo(target.first().x, clipY);
	ctx.closePath();
	ctx.clip();
}
function clipHorizontal(ctx, target, clipX) {
	const { segments, points } = target;
	let first = true;
	let lineLoop = false;
	ctx.beginPath();
	for (const segment of segments) {
		const { start, end } = segment;
		const firstPoint = points[start];
		const lastPoint = points[_findSegmentEnd(start, end, points)];
		if (first) {
			ctx.moveTo(firstPoint.x, firstPoint.y);
			first = false;
		} else {
			ctx.lineTo(clipX, firstPoint.y);
			ctx.lineTo(firstPoint.x, firstPoint.y);
		}
		lineLoop = !!target.pathSegment(ctx, segment, { move: lineLoop });
		if (lineLoop) ctx.closePath();
		else ctx.lineTo(clipX, lastPoint.y);
	}
	ctx.lineTo(clipX, target.first().y);
	ctx.closePath();
	ctx.clip();
}
function fill(ctx, cfg) {
	const { line, target, property, color, scale, clip } = cfg;
	const segments = _segments(line, target, property);
	for (const { source: src, target: tgt, start, end } of segments) {
		const { style: { backgroundColor = color } = {} } = src;
		const notShape = target !== true;
		ctx.save();
		ctx.fillStyle = backgroundColor;
		clipBounds(ctx, scale, clip, notShape && _getBounds(property, start, end));
		ctx.beginPath();
		const lineLoop = !!line.pathSegment(ctx, src);
		let loop;
		if (notShape) {
			if (lineLoop) ctx.closePath();
			else interpolatedLineTo(ctx, target, end, property);
			const targetLoop = !!target.pathSegment(ctx, tgt, {
				move: lineLoop,
				reverse: true
			});
			loop = lineLoop && targetLoop;
			if (!loop) interpolatedLineTo(ctx, target, start, property);
		}
		ctx.closePath();
		ctx.fill(loop ? "evenodd" : "nonzero");
		ctx.restore();
	}
}
function clipBounds(ctx, scale, clip, bounds) {
	const chartArea = scale.chart.chartArea;
	const { property, start, end } = bounds || {};
	if (property === "x" || property === "y") {
		let left, top, right, bottom;
		if (property === "x") {
			left = start;
			top = chartArea.top;
			right = end;
			bottom = chartArea.bottom;
		} else {
			left = chartArea.left;
			top = start;
			right = chartArea.right;
			bottom = end;
		}
		ctx.beginPath();
		if (clip) {
			left = Math.max(left, clip.left);
			right = Math.min(right, clip.right);
			top = Math.max(top, clip.top);
			bottom = Math.min(bottom, clip.bottom);
		}
		ctx.rect(left, top, right - left, bottom - top);
		ctx.clip();
	}
}
function interpolatedLineTo(ctx, target, point, property) {
	const interpolatedPoint = target.interpolate(point, property);
	if (interpolatedPoint) ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
}
var index = {
	id: "filler",
	afterDatasetsUpdate(chart, _args, options) {
		const count = (chart.data.datasets || []).length;
		const sources = [];
		let meta, i, line, source;
		for (i = 0; i < count; ++i) {
			meta = chart.getDatasetMeta(i);
			line = meta.dataset;
			source = null;
			if (line && line.options && line instanceof LineElement) source = {
				visible: chart.isDatasetVisible(i),
				index: i,
				fill: _decodeFill(line, i, count),
				chart,
				axis: meta.controller.options.indexAxis,
				scale: meta.vScale,
				line
			};
			meta.$filler = source;
			sources.push(source);
		}
		for (i = 0; i < count; ++i) {
			source = sources[i];
			if (!source || source.fill === false) continue;
			source.fill = _resolveTarget(sources, i, options.propagate);
		}
	},
	beforeDraw(chart, _args, options) {
		const draw = options.drawTime === "beforeDraw";
		const metasets = chart.getSortedVisibleDatasetMetas();
		const area = chart.chartArea;
		for (let i = metasets.length - 1; i >= 0; --i) {
			const source = metasets[i].$filler;
			if (!source) continue;
			source.line.updateControlPoints(area, source.axis);
			if (draw && source.fill) _drawfill(chart.ctx, source, area);
		}
	},
	beforeDatasetsDraw(chart, _args, options) {
		if (options.drawTime !== "beforeDatasetsDraw") return;
		const metasets = chart.getSortedVisibleDatasetMetas();
		for (let i = metasets.length - 1; i >= 0; --i) {
			const source = metasets[i].$filler;
			if (_shouldApplyFill(source)) _drawfill(chart.ctx, source, chart.chartArea);
		}
	},
	beforeDatasetDraw(chart, args, options) {
		const source = args.meta.$filler;
		if (!_shouldApplyFill(source) || options.drawTime !== "beforeDatasetDraw") return;
		_drawfill(chart.ctx, source, chart.chartArea);
	},
	defaults: {
		propagate: true,
		drawTime: "beforeDatasetDraw"
	}
};
var getBoxSize = (labelOpts, fontSize) => {
	let { boxHeight = fontSize, boxWidth = fontSize } = labelOpts;
	if (labelOpts.usePointStyle) {
		boxHeight = Math.min(boxHeight, fontSize);
		boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
	}
	return {
		boxWidth,
		boxHeight,
		itemHeight: Math.max(fontSize, boxHeight)
	};
};
var itemsEqual = (a, b) => a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
var Legend = class extends Element$1 {
	constructor(config) {
		super();
		this._added = false;
		this.legendHitBoxes = [];
		this._hoveredItem = null;
		this.doughnutMode = false;
		this.chart = config.chart;
		this.options = config.options;
		this.ctx = config.ctx;
		this.legendItems = void 0;
		this.columnSizes = void 0;
		this.lineWidths = void 0;
		this.maxHeight = void 0;
		this.maxWidth = void 0;
		this.top = void 0;
		this.bottom = void 0;
		this.left = void 0;
		this.right = void 0;
		this.height = void 0;
		this.width = void 0;
		this._margins = void 0;
		this.position = void 0;
		this.weight = void 0;
		this.fullSize = void 0;
	}
	update(maxWidth, maxHeight, margins) {
		this.maxWidth = maxWidth;
		this.maxHeight = maxHeight;
		this._margins = margins;
		this.setDimensions();
		this.buildLabels();
		this.fit();
	}
	setDimensions() {
		if (this.isHorizontal()) {
			this.width = this.maxWidth;
			this.left = this._margins.left;
			this.right = this.width;
		} else {
			this.height = this.maxHeight;
			this.top = this._margins.top;
			this.bottom = this.height;
		}
	}
	buildLabels() {
		const labelOpts = this.options.labels || {};
		let legendItems = callback(labelOpts.generateLabels, [this.chart], this) || [];
		if (labelOpts.filter) legendItems = legendItems.filter((item) => labelOpts.filter(item, this.chart.data));
		if (labelOpts.sort) legendItems = legendItems.sort((a, b) => labelOpts.sort(a, b, this.chart.data));
		if (this.options.reverse) legendItems.reverse();
		this.legendItems = legendItems;
	}
	fit() {
		const { options, ctx } = this;
		if (!options.display) {
			this.width = this.height = 0;
			return;
		}
		const labelOpts = options.labels;
		const labelFont = toFont(labelOpts.font);
		const fontSize = labelFont.size;
		const titleHeight = this._computeTitleHeight();
		const { boxWidth, itemHeight } = getBoxSize(labelOpts, fontSize);
		let width, height;
		ctx.font = labelFont.string;
		if (this.isHorizontal()) {
			width = this.maxWidth;
			height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
		} else {
			height = this.maxHeight;
			width = this._fitCols(titleHeight, labelFont, boxWidth, itemHeight) + 10;
		}
		this.width = Math.min(width, options.maxWidth || this.maxWidth);
		this.height = Math.min(height, options.maxHeight || this.maxHeight);
	}
	_fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
		const { ctx, maxWidth, options: { labels: { padding } } } = this;
		const hitboxes = this.legendHitBoxes = [];
		const lineWidths = this.lineWidths = [0];
		const lineHeight = itemHeight + padding;
		let totalHeight = titleHeight;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";
		let row = -1;
		let top = -lineHeight;
		this.legendItems.forEach((legendItem, i) => {
			const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
			if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
				totalHeight += lineHeight;
				lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
				top += lineHeight;
				row++;
			}
			hitboxes[i] = {
				left: 0,
				top,
				row,
				width: itemWidth,
				height: itemHeight
			};
			lineWidths[lineWidths.length - 1] += itemWidth + padding;
		});
		return totalHeight;
	}
	_fitCols(titleHeight, labelFont, boxWidth, _itemHeight) {
		const { ctx, maxHeight, options: { labels: { padding } } } = this;
		const hitboxes = this.legendHitBoxes = [];
		const columnSizes = this.columnSizes = [];
		const heightLimit = maxHeight - titleHeight;
		let totalWidth = padding;
		let currentColWidth = 0;
		let currentColHeight = 0;
		let left = 0;
		let col = 0;
		this.legendItems.forEach((legendItem, i) => {
			const { itemWidth, itemHeight } = calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight);
			if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
				totalWidth += currentColWidth + padding;
				columnSizes.push({
					width: currentColWidth,
					height: currentColHeight
				});
				left += currentColWidth + padding;
				col++;
				currentColWidth = currentColHeight = 0;
			}
			hitboxes[i] = {
				left,
				top: currentColHeight,
				col,
				width: itemWidth,
				height: itemHeight
			};
			currentColWidth = Math.max(currentColWidth, itemWidth);
			currentColHeight += itemHeight + padding;
		});
		totalWidth += currentColWidth;
		columnSizes.push({
			width: currentColWidth,
			height: currentColHeight
		});
		return totalWidth;
	}
	adjustHitBoxes() {
		if (!this.options.display) return;
		const titleHeight = this._computeTitleHeight();
		const { legendHitBoxes: hitboxes, options: { align, labels: { padding }, rtl } } = this;
		const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
		if (this.isHorizontal()) {
			let row = 0;
			let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
			for (const hitbox of hitboxes) {
				if (row !== hitbox.row) {
					row = hitbox.row;
					left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
				}
				hitbox.top += this.top + titleHeight + padding;
				hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
				left += hitbox.width + padding;
			}
		} else {
			let col = 0;
			let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
			for (const hitbox of hitboxes) {
				if (hitbox.col !== col) {
					col = hitbox.col;
					top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
				}
				hitbox.top = top;
				hitbox.left += this.left + padding;
				hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
				top += hitbox.height + padding;
			}
		}
	}
	isHorizontal() {
		return this.options.position === "top" || this.options.position === "bottom";
	}
	draw() {
		if (this.options.display) {
			const ctx = this.ctx;
			clipArea(ctx, this);
			this._draw();
			unclipArea(ctx);
		}
	}
	_draw() {
		const { options: opts, columnSizes, lineWidths, ctx } = this;
		const { align, labels: labelOpts } = opts;
		const defaultColor = defaults.color;
		const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
		const labelFont = toFont(labelOpts.font);
		const { padding } = labelOpts;
		const fontSize = labelFont.size;
		const halfFontSize = fontSize / 2;
		let cursor;
		this.drawTitle();
		ctx.textAlign = rtlHelper.textAlign("left");
		ctx.textBaseline = "middle";
		ctx.lineWidth = .5;
		ctx.font = labelFont.string;
		const { boxWidth, boxHeight, itemHeight } = getBoxSize(labelOpts, fontSize);
		const drawLegendBox = function(x, y, legendItem) {
			if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) return;
			ctx.save();
			const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
			ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
			ctx.lineCap = valueOrDefault(legendItem.lineCap, "butt");
			ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
			ctx.lineJoin = valueOrDefault(legendItem.lineJoin, "miter");
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
			ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
			if (labelOpts.usePointStyle) drawPointLegend(ctx, {
				radius: boxHeight * Math.SQRT2 / 2,
				pointStyle: legendItem.pointStyle,
				rotation: legendItem.rotation,
				borderWidth: lineWidth
			}, rtlHelper.xPlus(x, boxWidth / 2), y + halfFontSize, labelOpts.pointStyleWidth && boxWidth);
			else {
				const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
				const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
				const borderRadius = toTRBLCorners(legendItem.borderRadius);
				ctx.beginPath();
				if (Object.values(borderRadius).some((v) => v !== 0)) addRoundedRectPath(ctx, {
					x: xBoxLeft,
					y: yBoxTop,
					w: boxWidth,
					h: boxHeight,
					radius: borderRadius
				});
				else ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
				ctx.fill();
				if (lineWidth !== 0) ctx.stroke();
			}
			ctx.restore();
		};
		const fillText = function(x, y, legendItem) {
			renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
				strikethrough: legendItem.hidden,
				textAlign: rtlHelper.textAlign(legendItem.textAlign)
			});
		};
		const isHorizontal = this.isHorizontal();
		const titleHeight = this._computeTitleHeight();
		if (isHorizontal) cursor = {
			x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
			y: this.top + padding + titleHeight,
			line: 0
		};
		else cursor = {
			x: this.left + padding,
			y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
			line: 0
		};
		overrideTextDirection(this.ctx, opts.textDirection);
		const lineHeight = itemHeight + padding;
		this.legendItems.forEach((legendItem, i) => {
			ctx.strokeStyle = legendItem.fontColor;
			ctx.fillStyle = legendItem.fontColor;
			const textWidth = ctx.measureText(legendItem.text).width;
			const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
			const width = boxWidth + halfFontSize + textWidth;
			let x = cursor.x;
			let y = cursor.y;
			rtlHelper.setWidth(this.width);
			if (isHorizontal) {
				if (i > 0 && x + width + padding > this.right) {
					y = cursor.y += lineHeight;
					cursor.line++;
					x = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
				}
			} else if (i > 0 && y + lineHeight > this.bottom) {
				x = cursor.x = x + columnSizes[cursor.line].width + padding;
				cursor.line++;
				y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
			}
			drawLegendBox(rtlHelper.x(x), y, legendItem);
			x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
			fillText(rtlHelper.x(x), y, legendItem);
			if (isHorizontal) cursor.x += width + padding;
			else if (typeof legendItem.text !== "string") {
				const fontLineHeight = labelFont.lineHeight;
				cursor.y += calculateLegendItemHeight(legendItem, fontLineHeight) + padding;
			} else cursor.y += lineHeight;
		});
		restoreTextDirection(this.ctx, opts.textDirection);
	}
	drawTitle() {
		const opts = this.options;
		const titleOpts = opts.title;
		const titleFont = toFont(titleOpts.font);
		const titlePadding = toPadding(titleOpts.padding);
		if (!titleOpts.display) return;
		const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
		const ctx = this.ctx;
		const position = titleOpts.position;
		const halfFontSize = titleFont.size / 2;
		const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
		let y;
		let left = this.left;
		let maxWidth = this.width;
		if (this.isHorizontal()) {
			maxWidth = Math.max(...this.lineWidths);
			y = this.top + topPaddingPlusHalfFontSize;
			left = _alignStartEnd(opts.align, left, this.right - maxWidth);
		} else {
			const maxHeight = this.columnSizes.reduce((acc, size) => Math.max(acc, size.height), 0);
			y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
		}
		const x = _alignStartEnd(position, left, left + maxWidth);
		ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
		ctx.textBaseline = "middle";
		ctx.strokeStyle = titleOpts.color;
		ctx.fillStyle = titleOpts.color;
		ctx.font = titleFont.string;
		renderText(ctx, titleOpts.text, x, y, titleFont);
	}
	_computeTitleHeight() {
		const titleOpts = this.options.title;
		const titleFont = toFont(titleOpts.font);
		const titlePadding = toPadding(titleOpts.padding);
		return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
	}
	_getLegendItemAt(x, y) {
		let i, hitBox, lh;
		if (_isBetween(x, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
			lh = this.legendHitBoxes;
			for (i = 0; i < lh.length; ++i) {
				hitBox = lh[i];
				if (_isBetween(x, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) return this.legendItems[i];
			}
		}
		return null;
	}
	handleEvent(e) {
		const opts = this.options;
		if (!isListened(e.type, opts)) return;
		const hoveredItem = this._getLegendItemAt(e.x, e.y);
		if (e.type === "mousemove" || e.type === "mouseout") {
			const previous = this._hoveredItem;
			const sameItem = itemsEqual(previous, hoveredItem);
			if (previous && !sameItem) callback(opts.onLeave, [
				e,
				previous,
				this
			], this);
			this._hoveredItem = hoveredItem;
			if (hoveredItem && !sameItem) callback(opts.onHover, [
				e,
				hoveredItem,
				this
			], this);
		} else if (hoveredItem) callback(opts.onClick, [
			e,
			hoveredItem,
			this
		], this);
	}
};
function calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight) {
	return {
		itemWidth: calculateItemWidth(legendItem, boxWidth, labelFont, ctx),
		itemHeight: calculateItemHeight(_itemHeight, legendItem, labelFont.lineHeight)
	};
}
function calculateItemWidth(legendItem, boxWidth, labelFont, ctx) {
	let legendItemText = legendItem.text;
	if (legendItemText && typeof legendItemText !== "string") legendItemText = legendItemText.reduce((a, b) => a.length > b.length ? a : b);
	return boxWidth + labelFont.size / 2 + ctx.measureText(legendItemText).width;
}
function calculateItemHeight(_itemHeight, legendItem, fontLineHeight) {
	let itemHeight = _itemHeight;
	if (typeof legendItem.text !== "string") itemHeight = calculateLegendItemHeight(legendItem, fontLineHeight);
	return itemHeight;
}
function calculateLegendItemHeight(legendItem, fontLineHeight) {
	return fontLineHeight * (legendItem.text ? legendItem.text.length : 0);
}
function isListened(type, opts) {
	if ((type === "mousemove" || type === "mouseout") && (opts.onHover || opts.onLeave)) return true;
	if (opts.onClick && (type === "click" || type === "mouseup")) return true;
	return false;
}
var plugin_legend = {
	id: "legend",
	_element: Legend,
	start(chart, _args, options) {
		const legend = chart.legend = new Legend({
			ctx: chart.ctx,
			options,
			chart
		});
		layouts.configure(chart, legend, options);
		layouts.addBox(chart, legend);
	},
	stop(chart) {
		layouts.removeBox(chart, chart.legend);
		delete chart.legend;
	},
	beforeUpdate(chart, _args, options) {
		const legend = chart.legend;
		layouts.configure(chart, legend, options);
		legend.options = options;
	},
	afterUpdate(chart) {
		const legend = chart.legend;
		legend.buildLabels();
		legend.adjustHitBoxes();
	},
	afterEvent(chart, args) {
		if (!args.replay) chart.legend.handleEvent(args.event);
	},
	defaults: {
		display: true,
		position: "top",
		align: "center",
		fullSize: true,
		reverse: false,
		weight: 1e3,
		onClick(e, legendItem, legend) {
			const index = legendItem.datasetIndex;
			const ci = legend.chart;
			if (ci.isDatasetVisible(index)) {
				ci.hide(index);
				legendItem.hidden = true;
			} else {
				ci.show(index);
				legendItem.hidden = false;
			}
		},
		onHover: null,
		onLeave: null,
		labels: {
			color: (ctx) => ctx.chart.options.color,
			boxWidth: 40,
			padding: 10,
			generateLabels(chart) {
				const datasets = chart.data.datasets;
				const { labels: { usePointStyle, pointStyle, textAlign, color, useBorderRadius, borderRadius } } = chart.legend.options;
				return chart._getSortedDatasetMetas().map((meta) => {
					const style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
					const borderWidth = toPadding(style.borderWidth);
					return {
						text: datasets[meta.index].label,
						fillStyle: style.backgroundColor,
						fontColor: color,
						hidden: !meta.visible,
						lineCap: style.borderCapStyle,
						lineDash: style.borderDash,
						lineDashOffset: style.borderDashOffset,
						lineJoin: style.borderJoinStyle,
						lineWidth: (borderWidth.width + borderWidth.height) / 4,
						strokeStyle: style.borderColor,
						pointStyle: pointStyle || style.pointStyle,
						rotation: style.rotation,
						textAlign: textAlign || style.textAlign,
						borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
						datasetIndex: meta.index
					};
				}, this);
			}
		},
		title: {
			color: (ctx) => ctx.chart.options.color,
			display: false,
			position: "center",
			text: ""
		}
	},
	descriptors: {
		_scriptable: (name) => !name.startsWith("on"),
		labels: { _scriptable: (name) => ![
			"generateLabels",
			"filter",
			"sort"
		].includes(name) }
	}
};
var Title = class extends Element$1 {
	constructor(config) {
		super();
		this.chart = config.chart;
		this.options = config.options;
		this.ctx = config.ctx;
		this._padding = void 0;
		this.top = void 0;
		this.bottom = void 0;
		this.left = void 0;
		this.right = void 0;
		this.width = void 0;
		this.height = void 0;
		this.position = void 0;
		this.weight = void 0;
		this.fullSize = void 0;
	}
	update(maxWidth, maxHeight) {
		const opts = this.options;
		this.left = 0;
		this.top = 0;
		if (!opts.display) {
			this.width = this.height = this.right = this.bottom = 0;
			return;
		}
		this.width = this.right = maxWidth;
		this.height = this.bottom = maxHeight;
		const lineCount = isArray(opts.text) ? opts.text.length : 1;
		this._padding = toPadding(opts.padding);
		const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
		if (this.isHorizontal()) this.height = textSize;
		else this.width = textSize;
	}
	isHorizontal() {
		const pos = this.options.position;
		return pos === "top" || pos === "bottom";
	}
	_drawArgs(offset) {
		const { top, left, bottom, right, options } = this;
		const align = options.align;
		let rotation = 0;
		let maxWidth, titleX, titleY;
		if (this.isHorizontal()) {
			titleX = _alignStartEnd(align, left, right);
			titleY = top + offset;
			maxWidth = right - left;
		} else {
			if (options.position === "left") {
				titleX = left + offset;
				titleY = _alignStartEnd(align, bottom, top);
				rotation = PI * -.5;
			} else {
				titleX = right - offset;
				titleY = _alignStartEnd(align, top, bottom);
				rotation = PI * .5;
			}
			maxWidth = bottom - top;
		}
		return {
			titleX,
			titleY,
			maxWidth,
			rotation
		};
	}
	draw() {
		const ctx = this.ctx;
		const opts = this.options;
		if (!opts.display) return;
		const fontOpts = toFont(opts.font);
		const offset = fontOpts.lineHeight / 2 + this._padding.top;
		const { titleX, titleY, maxWidth, rotation } = this._drawArgs(offset);
		renderText(ctx, opts.text, 0, 0, fontOpts, {
			color: opts.color,
			maxWidth,
			rotation,
			textAlign: _toLeftRightCenter(opts.align),
			textBaseline: "middle",
			translation: [titleX, titleY]
		});
	}
};
function createTitle(chart, titleOpts) {
	const title = new Title({
		ctx: chart.ctx,
		options: titleOpts,
		chart
	});
	layouts.configure(chart, title, titleOpts);
	layouts.addBox(chart, title);
	chart.titleBlock = title;
}
var plugin_title = {
	id: "title",
	_element: Title,
	start(chart, _args, options) {
		createTitle(chart, options);
	},
	stop(chart) {
		const titleBlock = chart.titleBlock;
		layouts.removeBox(chart, titleBlock);
		delete chart.titleBlock;
	},
	beforeUpdate(chart, _args, options) {
		const title = chart.titleBlock;
		layouts.configure(chart, title, options);
		title.options = options;
	},
	defaults: {
		align: "center",
		display: false,
		font: { weight: "bold" },
		fullSize: true,
		padding: 10,
		position: "top",
		text: "",
		weight: 2e3
	},
	defaultRoutes: { color: "color" },
	descriptors: {
		_scriptable: true,
		_indexable: false
	}
};
var map = /* @__PURE__ */ new WeakMap();
var plugin_subtitle = {
	id: "subtitle",
	start(chart, _args, options) {
		const title = new Title({
			ctx: chart.ctx,
			options,
			chart
		});
		layouts.configure(chart, title, options);
		layouts.addBox(chart, title);
		map.set(chart, title);
	},
	stop(chart) {
		layouts.removeBox(chart, map.get(chart));
		map.delete(chart);
	},
	beforeUpdate(chart, _args, options) {
		const title = map.get(chart);
		layouts.configure(chart, title, options);
		title.options = options;
	},
	defaults: {
		align: "center",
		display: false,
		font: { weight: "normal" },
		fullSize: true,
		padding: 0,
		position: "top",
		text: "",
		weight: 1500
	},
	defaultRoutes: { color: "color" },
	descriptors: {
		_scriptable: true,
		_indexable: false
	}
};
var positioners = {
	average(items) {
		if (!items.length) return false;
		let i, len;
		let xSet = /* @__PURE__ */ new Set();
		let y = 0;
		let count = 0;
		for (i = 0, len = items.length; i < len; ++i) {
			const el = items[i].element;
			if (el && el.hasValue()) {
				const pos = el.tooltipPosition();
				xSet.add(pos.x);
				y += pos.y;
				++count;
			}
		}
		if (count === 0 || xSet.size === 0) return false;
		return {
			x: [...xSet].reduce((a, b) => a + b) / xSet.size,
			y: y / count
		};
	},
	nearest(items, eventPosition) {
		if (!items.length) return false;
		let x = eventPosition.x;
		let y = eventPosition.y;
		let minDistance = Number.POSITIVE_INFINITY;
		let i, len, nearestElement;
		for (i = 0, len = items.length; i < len; ++i) {
			const el = items[i].element;
			if (el && el.hasValue()) {
				const d = distanceBetweenPoints(eventPosition, el.getCenterPoint());
				if (d < minDistance) {
					minDistance = d;
					nearestElement = el;
				}
			}
		}
		if (nearestElement) {
			const tp = nearestElement.tooltipPosition();
			x = tp.x;
			y = tp.y;
		}
		return {
			x,
			y
		};
	}
};
function pushOrConcat(base, toPush) {
	if (toPush) if (isArray(toPush)) Array.prototype.push.apply(base, toPush);
	else base.push(toPush);
	return base;
}
function splitNewlines(str) {
	if ((typeof str === "string" || str instanceof String) && str.indexOf("\n") > -1) return str.split("\n");
	return str;
}
function createTooltipItem(chart, item) {
	const { element, datasetIndex, index } = item;
	const controller = chart.getDatasetMeta(datasetIndex).controller;
	const { label, value } = controller.getLabelAndValue(index);
	return {
		chart,
		label,
		parsed: controller.getParsed(index),
		raw: chart.data.datasets[datasetIndex].data[index],
		formattedValue: value,
		dataset: controller.getDataset(),
		dataIndex: index,
		datasetIndex,
		element
	};
}
function getTooltipSize(tooltip, options) {
	const ctx = tooltip.chart.ctx;
	const { body, footer, title } = tooltip;
	const { boxWidth, boxHeight } = options;
	const bodyFont = toFont(options.bodyFont);
	const titleFont = toFont(options.titleFont);
	const footerFont = toFont(options.footerFont);
	const titleLineCount = title.length;
	const footerLineCount = footer.length;
	const bodyLineItemCount = body.length;
	const padding = toPadding(options.padding);
	let height = padding.height;
	let width = 0;
	let combinedBodyLength = body.reduce((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
	combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
	if (titleLineCount) height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
	if (combinedBodyLength) {
		const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
		height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
	}
	if (footerLineCount) height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
	let widthPadding = 0;
	const maxLineWidth = function(line) {
		width = Math.max(width, ctx.measureText(line).width + widthPadding);
	};
	ctx.save();
	ctx.font = titleFont.string;
	each(tooltip.title, maxLineWidth);
	ctx.font = bodyFont.string;
	each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
	widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
	each(body, (bodyItem) => {
		each(bodyItem.before, maxLineWidth);
		each(bodyItem.lines, maxLineWidth);
		each(bodyItem.after, maxLineWidth);
	});
	widthPadding = 0;
	ctx.font = footerFont.string;
	each(tooltip.footer, maxLineWidth);
	ctx.restore();
	width += padding.width;
	return {
		width,
		height
	};
}
function determineYAlign(chart, size) {
	const { y, height } = size;
	if (y < height / 2) return "top";
	else if (y > chart.height - height / 2) return "bottom";
	return "center";
}
function doesNotFitWithAlign(xAlign, chart, options, size) {
	const { x, width } = size;
	const caret = options.caretSize + options.caretPadding;
	if (xAlign === "left" && x + width + caret > chart.width) return true;
	if (xAlign === "right" && x - width - caret < 0) return true;
}
function determineXAlign(chart, options, size, yAlign) {
	const { x, width } = size;
	const { width: chartWidth, chartArea: { left, right } } = chart;
	let xAlign = "center";
	if (yAlign === "center") xAlign = x <= (left + right) / 2 ? "left" : "right";
	else if (x <= width / 2) xAlign = "left";
	else if (x >= chartWidth - width / 2) xAlign = "right";
	if (doesNotFitWithAlign(xAlign, chart, options, size)) xAlign = "center";
	return xAlign;
}
function determineAlignment(chart, options, size) {
	const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
	return {
		xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
		yAlign
	};
}
function alignX(size, xAlign) {
	let { x, width } = size;
	if (xAlign === "right") x -= width;
	else if (xAlign === "center") x -= width / 2;
	return x;
}
function alignY(size, yAlign, paddingAndSize) {
	let { y, height } = size;
	if (yAlign === "top") y += paddingAndSize;
	else if (yAlign === "bottom") y -= height + paddingAndSize;
	else y -= height / 2;
	return y;
}
function getBackgroundPoint(options, size, alignment, chart) {
	const { caretSize, caretPadding, cornerRadius } = options;
	const { xAlign, yAlign } = alignment;
	const paddingAndSize = caretSize + caretPadding;
	const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
	let x = alignX(size, xAlign);
	const y = alignY(size, yAlign, paddingAndSize);
	if (yAlign === "center") {
		if (xAlign === "left") x += paddingAndSize;
		else if (xAlign === "right") x -= paddingAndSize;
	} else if (xAlign === "left") x -= Math.max(topLeft, bottomLeft) + caretSize;
	else if (xAlign === "right") x += Math.max(topRight, bottomRight) + caretSize;
	return {
		x: _limitValue(x, 0, chart.width - size.width),
		y: _limitValue(y, 0, chart.height - size.height)
	};
}
function getAlignedX(tooltip, align, options) {
	const padding = toPadding(options.padding);
	return align === "center" ? tooltip.x + tooltip.width / 2 : align === "right" ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
}
function getBeforeAfterBodyLines(callback) {
	return pushOrConcat([], splitNewlines(callback));
}
function createTooltipContext(parent, tooltip, tooltipItems) {
	return createContext(parent, {
		tooltip,
		tooltipItems,
		type: "tooltip"
	});
}
function overrideCallbacks(callbacks, context) {
	const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
	return override ? callbacks.override(override) : callbacks;
}
var defaultCallbacks = {
	beforeTitle: noop,
	title(tooltipItems) {
		if (tooltipItems.length > 0) {
			const item = tooltipItems[0];
			const labels = item.chart.data.labels;
			const labelCount = labels ? labels.length : 0;
			if (this && this.options && this.options.mode === "dataset") return item.dataset.label || "";
			else if (item.label) return item.label;
			else if (labelCount > 0 && item.dataIndex < labelCount) return labels[item.dataIndex];
		}
		return "";
	},
	afterTitle: noop,
	beforeBody: noop,
	beforeLabel: noop,
	label(tooltipItem) {
		if (this && this.options && this.options.mode === "dataset") return tooltipItem.label + ": " + tooltipItem.formattedValue || tooltipItem.formattedValue;
		let label = tooltipItem.dataset.label || "";
		if (label) label += ": ";
		const value = tooltipItem.formattedValue;
		if (!isNullOrUndef(value)) label += value;
		return label;
	},
	labelColor(tooltipItem) {
		const options = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex).controller.getStyle(tooltipItem.dataIndex);
		return {
			borderColor: options.borderColor,
			backgroundColor: options.backgroundColor,
			borderWidth: options.borderWidth,
			borderDash: options.borderDash,
			borderDashOffset: options.borderDashOffset,
			borderRadius: 0
		};
	},
	labelTextColor() {
		return this.options.bodyColor;
	},
	labelPointStyle(tooltipItem) {
		const options = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex).controller.getStyle(tooltipItem.dataIndex);
		return {
			pointStyle: options.pointStyle,
			rotation: options.rotation
		};
	},
	afterLabel: noop,
	afterBody: noop,
	beforeFooter: noop,
	footer: noop,
	afterFooter: noop
};
function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
	const result = callbacks[name].call(ctx, arg);
	if (typeof result === "undefined") return defaultCallbacks[name].call(ctx, arg);
	return result;
}
var Tooltip = class extends Element$1 {
	static positioners = positioners;
	constructor(config) {
		super();
		this.opacity = 0;
		this._active = [];
		this._eventPosition = void 0;
		this._size = void 0;
		this._cachedAnimations = void 0;
		this._tooltipItems = [];
		this.$animations = void 0;
		this.$context = void 0;
		this.chart = config.chart;
		this.options = config.options;
		this.dataPoints = void 0;
		this.title = void 0;
		this.beforeBody = void 0;
		this.body = void 0;
		this.afterBody = void 0;
		this.footer = void 0;
		this.xAlign = void 0;
		this.yAlign = void 0;
		this.x = void 0;
		this.y = void 0;
		this.height = void 0;
		this.width = void 0;
		this.caretX = void 0;
		this.caretY = void 0;
		this.labelColors = void 0;
		this.labelPointStyles = void 0;
		this.labelTextColors = void 0;
	}
	initialize(options) {
		this.options = options;
		this._cachedAnimations = void 0;
		this.$context = void 0;
	}
	_resolveAnimations() {
		const cached = this._cachedAnimations;
		if (cached) return cached;
		const chart = this.chart;
		const options = this.options.setContext(this.getContext());
		const opts = options.enabled && chart.options.animation && options.animations;
		const animations = new Animations(this.chart, opts);
		if (opts._cacheable) this._cachedAnimations = Object.freeze(animations);
		return animations;
	}
	getContext() {
		return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
	}
	getTitle(context, options) {
		const { callbacks } = options;
		const beforeTitle = invokeCallbackWithFallback(callbacks, "beforeTitle", this, context);
		const title = invokeCallbackWithFallback(callbacks, "title", this, context);
		const afterTitle = invokeCallbackWithFallback(callbacks, "afterTitle", this, context);
		let lines = [];
		lines = pushOrConcat(lines, splitNewlines(beforeTitle));
		lines = pushOrConcat(lines, splitNewlines(title));
		lines = pushOrConcat(lines, splitNewlines(afterTitle));
		return lines;
	}
	getBeforeBody(tooltipItems, options) {
		return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "beforeBody", this, tooltipItems));
	}
	getBody(tooltipItems, options) {
		const { callbacks } = options;
		const bodyItems = [];
		each(tooltipItems, (context) => {
			const bodyItem = {
				before: [],
				lines: [],
				after: []
			};
			const scoped = overrideCallbacks(callbacks, context);
			pushOrConcat(bodyItem.before, splitNewlines(invokeCallbackWithFallback(scoped, "beforeLabel", this, context)));
			pushOrConcat(bodyItem.lines, invokeCallbackWithFallback(scoped, "label", this, context));
			pushOrConcat(bodyItem.after, splitNewlines(invokeCallbackWithFallback(scoped, "afterLabel", this, context)));
			bodyItems.push(bodyItem);
		});
		return bodyItems;
	}
	getAfterBody(tooltipItems, options) {
		return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "afterBody", this, tooltipItems));
	}
	getFooter(tooltipItems, options) {
		const { callbacks } = options;
		const beforeFooter = invokeCallbackWithFallback(callbacks, "beforeFooter", this, tooltipItems);
		const footer = invokeCallbackWithFallback(callbacks, "footer", this, tooltipItems);
		const afterFooter = invokeCallbackWithFallback(callbacks, "afterFooter", this, tooltipItems);
		let lines = [];
		lines = pushOrConcat(lines, splitNewlines(beforeFooter));
		lines = pushOrConcat(lines, splitNewlines(footer));
		lines = pushOrConcat(lines, splitNewlines(afterFooter));
		return lines;
	}
	_createItems(options) {
		const active = this._active;
		const data = this.chart.data;
		const labelColors = [];
		const labelPointStyles = [];
		const labelTextColors = [];
		let tooltipItems = [];
		let i, len;
		for (i = 0, len = active.length; i < len; ++i) tooltipItems.push(createTooltipItem(this.chart, active[i]));
		if (options.filter) tooltipItems = tooltipItems.filter((element, index, array) => options.filter(element, index, array, data));
		if (options.itemSort) tooltipItems = tooltipItems.sort((a, b) => options.itemSort(a, b, data));
		each(tooltipItems, (context) => {
			const scoped = overrideCallbacks(options.callbacks, context);
			labelColors.push(invokeCallbackWithFallback(scoped, "labelColor", this, context));
			labelPointStyles.push(invokeCallbackWithFallback(scoped, "labelPointStyle", this, context));
			labelTextColors.push(invokeCallbackWithFallback(scoped, "labelTextColor", this, context));
		});
		this.labelColors = labelColors;
		this.labelPointStyles = labelPointStyles;
		this.labelTextColors = labelTextColors;
		this.dataPoints = tooltipItems;
		return tooltipItems;
	}
	update(changed, replay) {
		const options = this.options.setContext(this.getContext());
		const active = this._active;
		let properties;
		let tooltipItems = [];
		if (!active.length) {
			if (this.opacity !== 0) properties = { opacity: 0 };
		} else {
			const position = positioners[options.position].call(this, active, this._eventPosition);
			tooltipItems = this._createItems(options);
			this.title = this.getTitle(tooltipItems, options);
			this.beforeBody = this.getBeforeBody(tooltipItems, options);
			this.body = this.getBody(tooltipItems, options);
			this.afterBody = this.getAfterBody(tooltipItems, options);
			this.footer = this.getFooter(tooltipItems, options);
			const size = this._size = getTooltipSize(this, options);
			const positionAndSize = Object.assign({}, position, size);
			const alignment = determineAlignment(this.chart, options, positionAndSize);
			const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
			this.xAlign = alignment.xAlign;
			this.yAlign = alignment.yAlign;
			properties = {
				opacity: 1,
				x: backgroundPoint.x,
				y: backgroundPoint.y,
				width: size.width,
				height: size.height,
				caretX: position.x,
				caretY: position.y
			};
		}
		this._tooltipItems = tooltipItems;
		this.$context = void 0;
		if (properties) this._resolveAnimations().update(this, properties);
		if (changed && options.external) options.external.call(this, {
			chart: this.chart,
			tooltip: this,
			replay
		});
	}
	drawCaret(tooltipPoint, ctx, size, options) {
		const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
		ctx.lineTo(caretPosition.x1, caretPosition.y1);
		ctx.lineTo(caretPosition.x2, caretPosition.y2);
		ctx.lineTo(caretPosition.x3, caretPosition.y3);
	}
	getCaretPosition(tooltipPoint, size, options) {
		const { xAlign, yAlign } = this;
		const { caretSize, cornerRadius } = options;
		const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
		const { x: ptX, y: ptY } = tooltipPoint;
		const { width, height } = size;
		let x1, x2, x3, y1, y2, y3;
		if (yAlign === "center") {
			y2 = ptY + height / 2;
			if (xAlign === "left") {
				x1 = ptX;
				x2 = x1 - caretSize;
				y1 = y2 + caretSize;
				y3 = y2 - caretSize;
			} else {
				x1 = ptX + width;
				x2 = x1 + caretSize;
				y1 = y2 - caretSize;
				y3 = y2 + caretSize;
			}
			x3 = x1;
		} else {
			if (xAlign === "left") x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize;
			else if (xAlign === "right") x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
			else x2 = this.caretX;
			if (yAlign === "top") {
				y1 = ptY;
				y2 = y1 - caretSize;
				x1 = x2 - caretSize;
				x3 = x2 + caretSize;
			} else {
				y1 = ptY + height;
				y2 = y1 + caretSize;
				x1 = x2 + caretSize;
				x3 = x2 - caretSize;
			}
			y3 = y1;
		}
		return {
			x1,
			x2,
			x3,
			y1,
			y2,
			y3
		};
	}
	drawTitle(pt, ctx, options) {
		const title = this.title;
		const length = title.length;
		let titleFont, titleSpacing, i;
		if (length) {
			const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
			pt.x = getAlignedX(this, options.titleAlign, options);
			ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
			ctx.textBaseline = "middle";
			titleFont = toFont(options.titleFont);
			titleSpacing = options.titleSpacing;
			ctx.fillStyle = options.titleColor;
			ctx.font = titleFont.string;
			for (i = 0; i < length; ++i) {
				ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
				pt.y += titleFont.lineHeight + titleSpacing;
				if (i + 1 === length) pt.y += options.titleMarginBottom - titleSpacing;
			}
		}
	}
	_drawColorBox(ctx, pt, i, rtlHelper, options) {
		const labelColor = this.labelColors[i];
		const labelPointStyle = this.labelPointStyles[i];
		const { boxHeight, boxWidth } = options;
		const bodyFont = toFont(options.bodyFont);
		const colorX = getAlignedX(this, "left", options);
		const rtlColorX = rtlHelper.x(colorX);
		const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
		const colorY = pt.y + yOffSet;
		if (options.usePointStyle) {
			const drawOptions = {
				radius: Math.min(boxWidth, boxHeight) / 2,
				pointStyle: labelPointStyle.pointStyle,
				rotation: labelPointStyle.rotation,
				borderWidth: 1
			};
			const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
			const centerY = colorY + boxHeight / 2;
			ctx.strokeStyle = options.multiKeyBackground;
			ctx.fillStyle = options.multiKeyBackground;
			drawPoint(ctx, drawOptions, centerX, centerY);
			ctx.strokeStyle = labelColor.borderColor;
			ctx.fillStyle = labelColor.backgroundColor;
			drawPoint(ctx, drawOptions, centerX, centerY);
		} else {
			ctx.lineWidth = isObject(labelColor.borderWidth) ? Math.max(...Object.values(labelColor.borderWidth)) : labelColor.borderWidth || 1;
			ctx.strokeStyle = labelColor.borderColor;
			ctx.setLineDash(labelColor.borderDash || []);
			ctx.lineDashOffset = labelColor.borderDashOffset || 0;
			const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth);
			const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2);
			const borderRadius = toTRBLCorners(labelColor.borderRadius);
			if (Object.values(borderRadius).some((v) => v !== 0)) {
				ctx.beginPath();
				ctx.fillStyle = options.multiKeyBackground;
				addRoundedRectPath(ctx, {
					x: outerX,
					y: colorY,
					w: boxWidth,
					h: boxHeight,
					radius: borderRadius
				});
				ctx.fill();
				ctx.stroke();
				ctx.fillStyle = labelColor.backgroundColor;
				ctx.beginPath();
				addRoundedRectPath(ctx, {
					x: innerX,
					y: colorY + 1,
					w: boxWidth - 2,
					h: boxHeight - 2,
					radius: borderRadius
				});
				ctx.fill();
			} else {
				ctx.fillStyle = options.multiKeyBackground;
				ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
				ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
				ctx.fillStyle = labelColor.backgroundColor;
				ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
			}
		}
		ctx.fillStyle = this.labelTextColors[i];
	}
	drawBody(pt, ctx, options) {
		const { body } = this;
		const { bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding } = options;
		const bodyFont = toFont(options.bodyFont);
		let bodyLineHeight = bodyFont.lineHeight;
		let xLinePadding = 0;
		const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
		const fillLineOfText = function(line) {
			ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
			pt.y += bodyLineHeight + bodySpacing;
		};
		const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
		let bodyItem, textColor, lines, i, j, ilen, jlen;
		ctx.textAlign = bodyAlign;
		ctx.textBaseline = "middle";
		ctx.font = bodyFont.string;
		pt.x = getAlignedX(this, bodyAlignForCalculation, options);
		ctx.fillStyle = options.bodyColor;
		each(this.beforeBody, fillLineOfText);
		xLinePadding = displayColors && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
		for (i = 0, ilen = body.length; i < ilen; ++i) {
			bodyItem = body[i];
			textColor = this.labelTextColors[i];
			ctx.fillStyle = textColor;
			each(bodyItem.before, fillLineOfText);
			lines = bodyItem.lines;
			if (displayColors && lines.length) {
				this._drawColorBox(ctx, pt, i, rtlHelper, options);
				bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
			}
			for (j = 0, jlen = lines.length; j < jlen; ++j) {
				fillLineOfText(lines[j]);
				bodyLineHeight = bodyFont.lineHeight;
			}
			each(bodyItem.after, fillLineOfText);
		}
		xLinePadding = 0;
		bodyLineHeight = bodyFont.lineHeight;
		each(this.afterBody, fillLineOfText);
		pt.y -= bodySpacing;
	}
	drawFooter(pt, ctx, options) {
		const footer = this.footer;
		const length = footer.length;
		let footerFont, i;
		if (length) {
			const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
			pt.x = getAlignedX(this, options.footerAlign, options);
			pt.y += options.footerMarginTop;
			ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
			ctx.textBaseline = "middle";
			footerFont = toFont(options.footerFont);
			ctx.fillStyle = options.footerColor;
			ctx.font = footerFont.string;
			for (i = 0; i < length; ++i) {
				ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
				pt.y += footerFont.lineHeight + options.footerSpacing;
			}
		}
	}
	drawBackground(pt, ctx, tooltipSize, options) {
		const { xAlign, yAlign } = this;
		const { x, y } = pt;
		const { width, height } = tooltipSize;
		const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(options.cornerRadius);
		ctx.fillStyle = options.backgroundColor;
		ctx.strokeStyle = options.borderColor;
		ctx.lineWidth = options.borderWidth;
		ctx.beginPath();
		ctx.moveTo(x + topLeft, y);
		if (yAlign === "top") this.drawCaret(pt, ctx, tooltipSize, options);
		ctx.lineTo(x + width - topRight, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
		if (yAlign === "center" && xAlign === "right") this.drawCaret(pt, ctx, tooltipSize, options);
		ctx.lineTo(x + width, y + height - bottomRight);
		ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
		if (yAlign === "bottom") this.drawCaret(pt, ctx, tooltipSize, options);
		ctx.lineTo(x + bottomLeft, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
		if (yAlign === "center" && xAlign === "left") this.drawCaret(pt, ctx, tooltipSize, options);
		ctx.lineTo(x, y + topLeft);
		ctx.quadraticCurveTo(x, y, x + topLeft, y);
		ctx.closePath();
		ctx.fill();
		if (options.borderWidth > 0) ctx.stroke();
	}
	_updateAnimationTarget(options) {
		const chart = this.chart;
		const anims = this.$animations;
		const animX = anims && anims.x;
		const animY = anims && anims.y;
		if (animX || animY) {
			const position = positioners[options.position].call(this, this._active, this._eventPosition);
			if (!position) return;
			const size = this._size = getTooltipSize(this, options);
			const positionAndSize = Object.assign({}, position, this._size);
			const alignment = determineAlignment(chart, options, positionAndSize);
			const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
			if (animX._to !== point.x || animY._to !== point.y) {
				this.xAlign = alignment.xAlign;
				this.yAlign = alignment.yAlign;
				this.width = size.width;
				this.height = size.height;
				this.caretX = position.x;
				this.caretY = position.y;
				this._resolveAnimations().update(this, point);
			}
		}
	}
	_willRender() {
		return !!this.opacity;
	}
	draw(ctx) {
		const options = this.options.setContext(this.getContext());
		let opacity = this.opacity;
		if (!opacity) return;
		this._updateAnimationTarget(options);
		const tooltipSize = {
			width: this.width,
			height: this.height
		};
		const pt = {
			x: this.x,
			y: this.y
		};
		opacity = Math.abs(opacity) < .001 ? 0 : opacity;
		const padding = toPadding(options.padding);
		const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
		if (options.enabled && hasTooltipContent) {
			ctx.save();
			ctx.globalAlpha = opacity;
			this.drawBackground(pt, ctx, tooltipSize, options);
			overrideTextDirection(ctx, options.textDirection);
			pt.y += padding.top;
			this.drawTitle(pt, ctx, options);
			this.drawBody(pt, ctx, options);
			this.drawFooter(pt, ctx, options);
			restoreTextDirection(ctx, options.textDirection);
			ctx.restore();
		}
	}
	getActiveElements() {
		return this._active || [];
	}
	setActiveElements(activeElements, eventPosition) {
		const lastActive = this._active;
		const active = activeElements.map(({ datasetIndex, index }) => {
			const meta = this.chart.getDatasetMeta(datasetIndex);
			if (!meta) throw new Error("Cannot find a dataset at index " + datasetIndex);
			return {
				datasetIndex,
				element: meta.data[index],
				index
			};
		});
		const changed = !_elementsEqual(lastActive, active);
		const positionChanged = this._positionChanged(active, eventPosition);
		if (changed || positionChanged) {
			this._active = active;
			this._eventPosition = eventPosition;
			this._ignoreReplayEvents = true;
			this.update(true);
		}
	}
	handleEvent(e, replay, inChartArea = true) {
		if (replay && this._ignoreReplayEvents) return false;
		this._ignoreReplayEvents = false;
		const options = this.options;
		const lastActive = this._active || [];
		const active = this._getActiveElements(e, lastActive, replay, inChartArea);
		const positionChanged = this._positionChanged(active, e);
		const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
		if (changed) {
			this._active = active;
			if (options.enabled || options.external) {
				this._eventPosition = {
					x: e.x,
					y: e.y
				};
				this.update(true, replay);
			}
		}
		return changed;
	}
	_getActiveElements(e, lastActive, replay, inChartArea) {
		const options = this.options;
		if (e.type === "mouseout") return [];
		if (!inChartArea) return lastActive.filter((i) => this.chart.data.datasets[i.datasetIndex] && this.chart.getDatasetMeta(i.datasetIndex).controller.getParsed(i.index) !== void 0);
		const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
		if (options.reverse) active.reverse();
		return active;
	}
	_positionChanged(active, e) {
		const { caretX, caretY, options } = this;
		const position = positioners[options.position].call(this, active, e);
		return position !== false && (caretX !== position.x || caretY !== position.y);
	}
};
var plugins = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	Colors: plugin_colors,
	Decimation: plugin_decimation,
	Filler: index,
	Legend: plugin_legend,
	SubTitle: plugin_subtitle,
	Title: plugin_title,
	Tooltip: {
		id: "tooltip",
		_element: Tooltip,
		positioners,
		afterInit(chart, _args, options) {
			if (options) chart.tooltip = new Tooltip({
				chart,
				options
			});
		},
		beforeUpdate(chart, _args, options) {
			if (chart.tooltip) chart.tooltip.initialize(options);
		},
		reset(chart, _args, options) {
			if (chart.tooltip) chart.tooltip.initialize(options);
		},
		afterDraw(chart) {
			const tooltip = chart.tooltip;
			if (tooltip && tooltip._willRender()) {
				const args = { tooltip };
				if (chart.notifyPlugins("beforeTooltipDraw", {
					...args,
					cancelable: true
				}) === false) return;
				tooltip.draw(chart.ctx);
				chart.notifyPlugins("afterTooltipDraw", args);
			}
		},
		afterEvent(chart, args) {
			if (chart.tooltip) {
				const useFinalPosition = args.replay;
				if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) args.changed = true;
			}
		},
		defaults: {
			enabled: true,
			external: null,
			position: "average",
			backgroundColor: "rgba(0,0,0,0.8)",
			titleColor: "#fff",
			titleFont: { weight: "bold" },
			titleSpacing: 2,
			titleMarginBottom: 6,
			titleAlign: "left",
			bodyColor: "#fff",
			bodySpacing: 2,
			bodyFont: {},
			bodyAlign: "left",
			footerColor: "#fff",
			footerSpacing: 2,
			footerMarginTop: 6,
			footerFont: { weight: "bold" },
			footerAlign: "left",
			padding: 6,
			caretPadding: 2,
			caretSize: 5,
			cornerRadius: 6,
			boxHeight: (ctx, opts) => opts.bodyFont.size,
			boxWidth: (ctx, opts) => opts.bodyFont.size,
			multiKeyBackground: "#fff",
			displayColors: true,
			boxPadding: 0,
			borderColor: "rgba(0,0,0,0)",
			borderWidth: 0,
			animation: {
				duration: 400,
				easing: "easeOutQuart"
			},
			animations: {
				numbers: {
					type: "number",
					properties: [
						"x",
						"y",
						"width",
						"height",
						"caretX",
						"caretY"
					]
				},
				opacity: {
					easing: "linear",
					duration: 200
				}
			},
			callbacks: defaultCallbacks
		},
		defaultRoutes: {
			bodyFont: "font",
			footerFont: "font",
			titleFont: "font"
		},
		descriptors: {
			_scriptable: (name) => name !== "filter" && name !== "itemSort" && name !== "external",
			_indexable: false,
			callbacks: {
				_scriptable: false,
				_indexable: false
			},
			animation: { _fallback: false },
			animations: { _fallback: "animation" }
		},
		additionalOptionScopes: ["interaction"]
	}
});
var addIfString = (labels, raw, index, addedLabels) => {
	if (typeof raw === "string") {
		index = labels.push(raw) - 1;
		addedLabels.unshift({
			index,
			label: raw
		});
	} else if (isNaN(raw)) index = null;
	return index;
};
function findOrAddLabel(labels, raw, index, addedLabels) {
	const first = labels.indexOf(raw);
	if (first === -1) return addIfString(labels, raw, index, addedLabels);
	return first !== labels.lastIndexOf(raw) ? index : first;
}
var validIndex = (index, max) => index === null ? null : _limitValue(Math.round(index), 0, max);
function _getLabelForValue(value) {
	const labels = this.getLabels();
	if (value >= 0 && value < labels.length) return labels[value];
	return value;
}
var CategoryScale = class extends Scale {
	static id = "category";
	static defaults = { ticks: { callback: _getLabelForValue } };
	constructor(cfg) {
		super(cfg);
		this._startValue = void 0;
		this._valueRange = 0;
		this._addedLabels = [];
	}
	init(scaleOptions) {
		const added = this._addedLabels;
		if (added.length) {
			const labels = this.getLabels();
			for (const { index, label } of added) if (labels[index] === label) labels.splice(index, 1);
			this._addedLabels = [];
		}
		super.init(scaleOptions);
	}
	parse(raw, index) {
		if (isNullOrUndef(raw)) return null;
		const labels = this.getLabels();
		index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, valueOrDefault(index, raw), this._addedLabels);
		return validIndex(index, labels.length - 1);
	}
	determineDataLimits() {
		const { minDefined, maxDefined } = this.getUserBounds();
		let { min, max } = this.getMinMax(true);
		if (this.options.bounds === "ticks") {
			if (!minDefined) min = 0;
			if (!maxDefined) max = this.getLabels().length - 1;
		}
		this.min = min;
		this.max = max;
	}
	buildTicks() {
		const min = this.min;
		const max = this.max;
		const offset = this.options.offset;
		const ticks = [];
		let labels = this.getLabels();
		labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
		this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
		this._startValue = this.min - (offset ? .5 : 0);
		for (let value = min; value <= max; value++) ticks.push({ value });
		return ticks;
	}
	getLabelForValue(value) {
		return _getLabelForValue.call(this, value);
	}
	configure() {
		super.configure();
		if (!this.isHorizontal()) this._reversePixels = !this._reversePixels;
	}
	getPixelForValue(value) {
		if (typeof value !== "number") value = this.parse(value);
		return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
	}
	getPixelForTick(index) {
		const ticks = this.ticks;
		if (index < 0 || index > ticks.length - 1) return null;
		return this.getPixelForValue(ticks[index].value);
	}
	getValueForPixel(pixel) {
		return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
	}
	getBasePixel() {
		return this.bottom;
	}
};
function generateTicks$1(generationOptions, dataRange) {
	const ticks = [];
	const MIN_SPACING = 1e-14;
	const { bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds } = generationOptions;
	const unit = step || 1;
	const maxSpaces = maxTicks - 1;
	const { min: rmin, max: rmax } = dataRange;
	const minDefined = !isNullOrUndef(min);
	const maxDefined = !isNullOrUndef(max);
	const countDefined = !isNullOrUndef(count);
	const minSpacing = (rmax - rmin) / (maxDigits + 1);
	let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
	let factor, niceMin, niceMax, numSpaces;
	if (spacing < MIN_SPACING && !minDefined && !maxDefined) return [{ value: rmin }, { value: rmax }];
	numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
	if (numSpaces > maxSpaces) spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
	if (!isNullOrUndef(precision)) {
		factor = Math.pow(10, precision);
		spacing = Math.ceil(spacing * factor) / factor;
	}
	if (bounds === "ticks") {
		niceMin = Math.floor(rmin / spacing) * spacing;
		niceMax = Math.ceil(rmax / spacing) * spacing;
	} else {
		niceMin = rmin;
		niceMax = rmax;
	}
	if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1e3)) {
		numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
		spacing = (max - min) / numSpaces;
		niceMin = min;
		niceMax = max;
	} else if (countDefined) {
		niceMin = minDefined ? min : niceMin;
		niceMax = maxDefined ? max : niceMax;
		numSpaces = count - 1;
		spacing = (niceMax - niceMin) / numSpaces;
	} else {
		numSpaces = (niceMax - niceMin) / spacing;
		if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) numSpaces = Math.round(numSpaces);
		else numSpaces = Math.ceil(numSpaces);
	}
	const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
	factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
	niceMin = Math.round(niceMin * factor) / factor;
	niceMax = Math.round(niceMax * factor) / factor;
	let j = 0;
	if (minDefined) {
		if (includeBounds && niceMin !== min) {
			ticks.push({ value: min });
			if (niceMin < min) j++;
			if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) j++;
		} else if (niceMin < min) j++;
	}
	for (; j < numSpaces; ++j) {
		const tickValue = Math.round((niceMin + j * spacing) * factor) / factor;
		if (maxDefined && tickValue > max) break;
		ticks.push({ value: tickValue });
	}
	if (maxDefined && includeBounds && niceMax !== max) if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) ticks[ticks.length - 1].value = max;
	else ticks.push({ value: max });
	else if (!maxDefined || niceMax === max) ticks.push({ value: niceMax });
	return ticks;
}
function relativeLabelSize(value, minSpacing, { horizontal, minRotation }) {
	const rad = toRadians(minRotation);
	const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || .001;
	const length = .75 * minSpacing * ("" + value).length;
	return Math.min(minSpacing / ratio, length);
}
var LinearScaleBase = class extends Scale {
	constructor(cfg) {
		super(cfg);
		this.start = void 0;
		this.end = void 0;
		this._startValue = void 0;
		this._endValue = void 0;
		this._valueRange = 0;
	}
	parse(raw, index) {
		if (isNullOrUndef(raw)) return null;
		if ((typeof raw === "number" || raw instanceof Number) && !isFinite(+raw)) return null;
		return +raw;
	}
	handleTickRangeOptions() {
		const { beginAtZero } = this.options;
		const { minDefined, maxDefined } = this.getUserBounds();
		let { min, max } = this;
		const setMin = (v) => min = minDefined ? min : v;
		const setMax = (v) => max = maxDefined ? max : v;
		if (beginAtZero) {
			const minSign = sign(min);
			const maxSign = sign(max);
			if (minSign < 0 && maxSign < 0) setMax(0);
			else if (minSign > 0 && maxSign > 0) setMin(0);
		}
		if (min === max) {
			let offset = max === 0 ? 1 : Math.abs(max * .05);
			setMax(max + offset);
			if (!beginAtZero) setMin(min - offset);
		}
		this.min = min;
		this.max = max;
	}
	getTickLimit() {
		let { maxTicksLimit, stepSize } = this.options.ticks;
		let maxTicks;
		if (stepSize) {
			maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
			if (maxTicks > 1e3) {
				console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
				maxTicks = 1e3;
			}
		} else {
			maxTicks = this.computeTickLimit();
			maxTicksLimit = maxTicksLimit || 11;
		}
		if (maxTicksLimit) maxTicks = Math.min(maxTicksLimit, maxTicks);
		return maxTicks;
	}
	computeTickLimit() {
		return Number.POSITIVE_INFINITY;
	}
	buildTicks() {
		const opts = this.options;
		const tickOpts = opts.ticks;
		let maxTicks = this.getTickLimit();
		maxTicks = Math.max(2, maxTicks);
		const ticks = generateTicks$1({
			maxTicks,
			bounds: opts.bounds,
			min: opts.min,
			max: opts.max,
			precision: tickOpts.precision,
			step: tickOpts.stepSize,
			count: tickOpts.count,
			maxDigits: this._maxDigits(),
			horizontal: this.isHorizontal(),
			minRotation: tickOpts.minRotation || 0,
			includeBounds: tickOpts.includeBounds !== false
		}, this._range || this);
		if (opts.bounds === "ticks") _setMinAndMaxByKey(ticks, this, "value");
		if (opts.reverse) {
			ticks.reverse();
			this.start = this.max;
			this.end = this.min;
		} else {
			this.start = this.min;
			this.end = this.max;
		}
		return ticks;
	}
	configure() {
		const ticks = this.ticks;
		let start = this.min;
		let end = this.max;
		super.configure();
		if (this.options.offset && ticks.length) {
			const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
			start -= offset;
			end += offset;
		}
		this._startValue = start;
		this._endValue = end;
		this._valueRange = end - start;
	}
	getLabelForValue(value) {
		return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
	}
};
var LinearScale = class extends LinearScaleBase {
	static id = "linear";
	static defaults = { ticks: { callback: Ticks.formatters.numeric } };
	determineDataLimits() {
		const { min, max } = this.getMinMax(true);
		this.min = isNumberFinite(min) ? min : 0;
		this.max = isNumberFinite(max) ? max : 1;
		this.handleTickRangeOptions();
	}
	computeTickLimit() {
		const horizontal = this.isHorizontal();
		const length = horizontal ? this.width : this.height;
		const minRotation = toRadians(this.options.ticks.minRotation);
		const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || .001;
		const tickFont = this._resolveTickFontOptions(0);
		return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
	}
	getPixelForValue(value) {
		return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
	}
	getValueForPixel(pixel) {
		return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
	}
};
var log10Floor = (v) => Math.floor(log10(v));
var changeExponent = (v, m) => Math.pow(10, log10Floor(v) + m);
function isMajor(tickVal) {
	return tickVal / Math.pow(10, log10Floor(tickVal)) === 1;
}
function steps(min, max, rangeExp) {
	const rangeStep = Math.pow(10, rangeExp);
	const start = Math.floor(min / rangeStep);
	return Math.ceil(max / rangeStep) - start;
}
function startExp(min, max) {
	let rangeExp = log10Floor(max - min);
	while (steps(min, max, rangeExp) > 10) rangeExp++;
	while (steps(min, max, rangeExp) < 10) rangeExp--;
	return Math.min(rangeExp, log10Floor(min));
}
function generateTicks(generationOptions, { min, max }) {
	min = finiteOrDefault(generationOptions.min, min);
	const ticks = [];
	const minExp = log10Floor(min);
	let exp = startExp(min, max);
	let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
	const stepSize = Math.pow(10, exp);
	const base = minExp > exp ? Math.pow(10, minExp) : 0;
	const start = Math.round((min - base) * precision) / precision;
	const offset = Math.floor((min - base) / stepSize / 10) * stepSize * 10;
	let significand = Math.floor((start - offset) / Math.pow(10, exp));
	let value = finiteOrDefault(generationOptions.min, Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision);
	while (value < max) {
		ticks.push({
			value,
			major: isMajor(value),
			significand
		});
		if (significand >= 10) significand = significand < 15 ? 15 : 20;
		else significand++;
		if (significand >= 20) {
			exp++;
			significand = 2;
			precision = exp >= 0 ? 1 : precision;
		}
		value = Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision;
	}
	const lastTick = finiteOrDefault(generationOptions.max, value);
	ticks.push({
		value: lastTick,
		major: isMajor(lastTick),
		significand
	});
	return ticks;
}
var LogarithmicScale = class extends Scale {
	static id = "logarithmic";
	static defaults = { ticks: {
		callback: Ticks.formatters.logarithmic,
		major: { enabled: true }
	} };
	constructor(cfg) {
		super(cfg);
		this.start = void 0;
		this.end = void 0;
		this._startValue = void 0;
		this._valueRange = 0;
	}
	parse(raw, index) {
		const value = LinearScaleBase.prototype.parse.apply(this, [raw, index]);
		if (value === 0) {
			this._zero = true;
			return;
		}
		return isNumberFinite(value) && value > 0 ? value : null;
	}
	determineDataLimits() {
		const { min, max } = this.getMinMax(true);
		this.min = isNumberFinite(min) ? Math.max(0, min) : null;
		this.max = isNumberFinite(max) ? Math.max(0, max) : null;
		if (this.options.beginAtZero) this._zero = true;
		if (this._zero && this.min !== this._suggestedMin && !isNumberFinite(this._userMin)) this.min = min === changeExponent(this.min, 0) ? changeExponent(this.min, -1) : changeExponent(this.min, 0);
		this.handleTickRangeOptions();
	}
	handleTickRangeOptions() {
		const { minDefined, maxDefined } = this.getUserBounds();
		let min = this.min;
		let max = this.max;
		const setMin = (v) => min = minDefined ? min : v;
		const setMax = (v) => max = maxDefined ? max : v;
		if (min === max) if (min <= 0) {
			setMin(1);
			setMax(10);
		} else {
			setMin(changeExponent(min, -1));
			setMax(changeExponent(max, 1));
		}
		if (min <= 0) setMin(changeExponent(max, -1));
		if (max <= 0) setMax(changeExponent(min, 1));
		this.min = min;
		this.max = max;
	}
	buildTicks() {
		const opts = this.options;
		const ticks = generateTicks({
			min: this._userMin,
			max: this._userMax
		}, this);
		if (opts.bounds === "ticks") _setMinAndMaxByKey(ticks, this, "value");
		if (opts.reverse) {
			ticks.reverse();
			this.start = this.max;
			this.end = this.min;
		} else {
			this.start = this.min;
			this.end = this.max;
		}
		return ticks;
	}
	getLabelForValue(value) {
		return value === void 0 ? "0" : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
	}
	configure() {
		const start = this.min;
		super.configure();
		this._startValue = log10(start);
		this._valueRange = log10(this.max) - log10(start);
	}
	getPixelForValue(value) {
		if (value === void 0 || value === 0) value = this.min;
		if (value === null || isNaN(value)) return NaN;
		return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
	}
	getValueForPixel(pixel) {
		const decimal = this.getDecimalForPixel(pixel);
		return Math.pow(10, this._startValue + decimal * this._valueRange);
	}
};
function getTickBackdropHeight(opts) {
	const tickOpts = opts.ticks;
	if (tickOpts.display && opts.display) {
		const padding = toPadding(tickOpts.backdropPadding);
		return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
	}
	return 0;
}
function measureLabelSize(ctx, font, label) {
	label = isArray(label) ? label : [label];
	return {
		w: _longestText(ctx, font.string, label),
		h: label.length * font.lineHeight
	};
}
function determineLimits(angle, pos, size, min, max) {
	if (angle === min || angle === max) return {
		start: pos - size / 2,
		end: pos + size / 2
	};
	else if (angle < min || angle > max) return {
		start: pos - size,
		end: pos
	};
	return {
		start: pos,
		end: pos + size
	};
}
function fitWithPointLabels(scale) {
	const orig = {
		l: scale.left + scale._padding.left,
		r: scale.right - scale._padding.right,
		t: scale.top + scale._padding.top,
		b: scale.bottom - scale._padding.bottom
	};
	const limits = Object.assign({}, orig);
	const labelSizes = [];
	const padding = [];
	const valueCount = scale._pointLabels.length;
	const pointLabelOpts = scale.options.pointLabels;
	const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
	for (let i = 0; i < valueCount; i++) {
		const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
		padding[i] = opts.padding;
		const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
		const plFont = toFont(opts.font);
		const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
		labelSizes[i] = textSize;
		const angleRadians = _normalizeAngle(scale.getIndexAngle(i) + additionalAngle);
		const angle = Math.round(toDegrees(angleRadians));
		updateLimits(limits, orig, angleRadians, determineLimits(angle, pointPosition.x, textSize.w, 0, 180), determineLimits(angle, pointPosition.y, textSize.h, 90, 270));
	}
	scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
	scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
}
function updateLimits(limits, orig, angle, hLimits, vLimits) {
	const sin = Math.abs(Math.sin(angle));
	const cos = Math.abs(Math.cos(angle));
	let x = 0;
	let y = 0;
	if (hLimits.start < orig.l) {
		x = (orig.l - hLimits.start) / sin;
		limits.l = Math.min(limits.l, orig.l - x);
	} else if (hLimits.end > orig.r) {
		x = (hLimits.end - orig.r) / sin;
		limits.r = Math.max(limits.r, orig.r + x);
	}
	if (vLimits.start < orig.t) {
		y = (orig.t - vLimits.start) / cos;
		limits.t = Math.min(limits.t, orig.t - y);
	} else if (vLimits.end > orig.b) {
		y = (vLimits.end - orig.b) / cos;
		limits.b = Math.max(limits.b, orig.b + y);
	}
}
function createPointLabelItem(scale, index, itemOpts) {
	const outerDistance = scale.drawingArea;
	const { extra, additionalAngle, padding, size } = itemOpts;
	const pointLabelPosition = scale.getPointPosition(index, outerDistance + extra + padding, additionalAngle);
	const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
	const y = yForAngle(pointLabelPosition.y, size.h, angle);
	const textAlign = getTextAlignForAngle(angle);
	const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
	return {
		visible: true,
		x: pointLabelPosition.x,
		y,
		textAlign,
		left,
		top: y,
		right: left + size.w,
		bottom: y + size.h
	};
}
function isNotOverlapped(item, area) {
	if (!area) return true;
	const { left, top, right, bottom } = item;
	return !(_isPointInArea({
		x: left,
		y: top
	}, area) || _isPointInArea({
		x: left,
		y: bottom
	}, area) || _isPointInArea({
		x: right,
		y: top
	}, area) || _isPointInArea({
		x: right,
		y: bottom
	}, area));
}
function buildPointLabelItems(scale, labelSizes, padding) {
	const items = [];
	const valueCount = scale._pointLabels.length;
	const opts = scale.options;
	const { centerPointLabels, display } = opts.pointLabels;
	const itemOpts = {
		extra: getTickBackdropHeight(opts) / 2,
		additionalAngle: centerPointLabels ? PI / valueCount : 0
	};
	let area;
	for (let i = 0; i < valueCount; i++) {
		itemOpts.padding = padding[i];
		itemOpts.size = labelSizes[i];
		const item = createPointLabelItem(scale, i, itemOpts);
		items.push(item);
		if (display === "auto") {
			item.visible = isNotOverlapped(item, area);
			if (item.visible) area = item;
		}
	}
	return items;
}
function getTextAlignForAngle(angle) {
	if (angle === 0 || angle === 180) return "center";
	else if (angle < 180) return "left";
	return "right";
}
function leftForTextAlign(x, w, align) {
	if (align === "right") x -= w;
	else if (align === "center") x -= w / 2;
	return x;
}
function yForAngle(y, h, angle) {
	if (angle === 90 || angle === 270) y -= h / 2;
	else if (angle > 270 || angle < 90) y -= h;
	return y;
}
function drawPointLabelBox(ctx, opts, item) {
	const { left, top, right, bottom } = item;
	const { backdropColor } = opts;
	if (!isNullOrUndef(backdropColor)) {
		const borderRadius = toTRBLCorners(opts.borderRadius);
		const padding = toPadding(opts.backdropPadding);
		ctx.fillStyle = backdropColor;
		const backdropLeft = left - padding.left;
		const backdropTop = top - padding.top;
		const backdropWidth = right - left + padding.width;
		const backdropHeight = bottom - top + padding.height;
		if (Object.values(borderRadius).some((v) => v !== 0)) {
			ctx.beginPath();
			addRoundedRectPath(ctx, {
				x: backdropLeft,
				y: backdropTop,
				w: backdropWidth,
				h: backdropHeight,
				radius: borderRadius
			});
			ctx.fill();
		} else ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
	}
}
function drawPointLabels(scale, labelCount) {
	const { ctx, options: { pointLabels } } = scale;
	for (let i = labelCount - 1; i >= 0; i--) {
		const item = scale._pointLabelItems[i];
		if (!item.visible) continue;
		const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
		drawPointLabelBox(ctx, optsAtIndex, item);
		const plFont = toFont(optsAtIndex.font);
		const { x, y, textAlign } = item;
		renderText(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
			color: optsAtIndex.color,
			textAlign,
			textBaseline: "middle"
		});
	}
}
function pathRadiusLine(scale, radius, circular, labelCount) {
	const { ctx } = scale;
	if (circular) ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
	else {
		let pointPosition = scale.getPointPosition(0, radius);
		ctx.moveTo(pointPosition.x, pointPosition.y);
		for (let i = 1; i < labelCount; i++) {
			pointPosition = scale.getPointPosition(i, radius);
			ctx.lineTo(pointPosition.x, pointPosition.y);
		}
	}
}
function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
	const ctx = scale.ctx;
	const circular = gridLineOpts.circular;
	const { color, lineWidth } = gridLineOpts;
	if (!circular && !labelCount || !color || !lineWidth || radius < 0) return;
	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.setLineDash(borderOpts.dash || []);
	ctx.lineDashOffset = borderOpts.dashOffset;
	ctx.beginPath();
	pathRadiusLine(scale, radius, circular, labelCount);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}
function createPointLabelContext(parent, index, label) {
	return createContext(parent, {
		label,
		index,
		type: "pointLabel"
	});
}
var RadialLinearScale = class extends LinearScaleBase {
	static id = "radialLinear";
	static defaults = {
		display: true,
		animate: true,
		position: "chartArea",
		angleLines: {
			display: true,
			lineWidth: 1,
			borderDash: [],
			borderDashOffset: 0
		},
		grid: { circular: false },
		startAngle: 0,
		ticks: {
			showLabelBackdrop: true,
			callback: Ticks.formatters.numeric
		},
		pointLabels: {
			backdropColor: void 0,
			backdropPadding: 2,
			display: true,
			font: { size: 10 },
			callback(label) {
				return label;
			},
			padding: 5,
			centerPointLabels: false
		}
	};
	static defaultRoutes = {
		"angleLines.color": "borderColor",
		"pointLabels.color": "color",
		"ticks.color": "color"
	};
	static descriptors = { angleLines: { _fallback: "grid" } };
	constructor(cfg) {
		super(cfg);
		this.xCenter = void 0;
		this.yCenter = void 0;
		this.drawingArea = void 0;
		this._pointLabels = [];
		this._pointLabelItems = [];
	}
	setDimensions() {
		const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
		const w = this.width = this.maxWidth - padding.width;
		const h = this.height = this.maxHeight - padding.height;
		this.xCenter = Math.floor(this.left + w / 2 + padding.left);
		this.yCenter = Math.floor(this.top + h / 2 + padding.top);
		this.drawingArea = Math.floor(Math.min(w, h) / 2);
	}
	determineDataLimits() {
		const { min, max } = this.getMinMax(false);
		this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
		this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
		this.handleTickRangeOptions();
	}
	computeTickLimit() {
		return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
	}
	generateTickLabels(ticks) {
		LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
		this._pointLabels = this.getLabels().map((value, index) => {
			const label = callback(this.options.pointLabels.callback, [value, index], this);
			return label || label === 0 ? label : "";
		}).filter((v, i) => this.chart.getDataVisibility(i));
	}
	fit() {
		const opts = this.options;
		if (opts.display && opts.pointLabels.display) fitWithPointLabels(this);
		else this.setCenterPoint(0, 0, 0, 0);
	}
	setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
		this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
		this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
		this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
	}
	getIndexAngle(index) {
		const angleMultiplier = TAU / (this._pointLabels.length || 1);
		const startAngle = this.options.startAngle || 0;
		return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
	}
	getDistanceFromCenterForValue(value) {
		if (isNullOrUndef(value)) return NaN;
		const scalingFactor = this.drawingArea / (this.max - this.min);
		if (this.options.reverse) return (this.max - value) * scalingFactor;
		return (value - this.min) * scalingFactor;
	}
	getValueForDistanceFromCenter(distance) {
		if (isNullOrUndef(distance)) return NaN;
		const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
		return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
	}
	getPointLabelContext(index) {
		const pointLabels = this._pointLabels || [];
		if (index >= 0 && index < pointLabels.length) {
			const pointLabel = pointLabels[index];
			return createPointLabelContext(this.getContext(), index, pointLabel);
		}
	}
	getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
		const angle = this.getIndexAngle(index) - HALF_PI + additionalAngle;
		return {
			x: Math.cos(angle) * distanceFromCenter + this.xCenter,
			y: Math.sin(angle) * distanceFromCenter + this.yCenter,
			angle
		};
	}
	getPointPositionForValue(index, value) {
		return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
	}
	getBasePosition(index) {
		return this.getPointPositionForValue(index || 0, this.getBaseValue());
	}
	getPointLabelPosition(index) {
		const { left, top, right, bottom } = this._pointLabelItems[index];
		return {
			left,
			top,
			right,
			bottom
		};
	}
	drawBackground() {
		const { backgroundColor, grid: { circular } } = this.options;
		if (backgroundColor) {
			const ctx = this.ctx;
			ctx.save();
			ctx.beginPath();
			pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
			ctx.closePath();
			ctx.fillStyle = backgroundColor;
			ctx.fill();
			ctx.restore();
		}
	}
	drawGrid() {
		const ctx = this.ctx;
		const opts = this.options;
		const { angleLines, grid, border } = opts;
		const labelCount = this._pointLabels.length;
		let i, offset, position;
		if (opts.pointLabels.display) drawPointLabels(this, labelCount);
		if (grid.display) this.ticks.forEach((tick, index) => {
			if (index !== 0 || index === 0 && this.min < 0) {
				offset = this.getDistanceFromCenterForValue(tick.value);
				const context = this.getContext(index);
				const optsAtIndex = grid.setContext(context);
				const optsAtIndexBorder = border.setContext(context);
				drawRadiusLine(this, optsAtIndex, offset, labelCount, optsAtIndexBorder);
			}
		});
		if (angleLines.display) {
			ctx.save();
			for (i = labelCount - 1; i >= 0; i--) {
				const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
				const { color, lineWidth } = optsAtIndex;
				if (!lineWidth || !color) continue;
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = color;
				ctx.setLineDash(optsAtIndex.borderDash);
				ctx.lineDashOffset = optsAtIndex.borderDashOffset;
				offset = this.getDistanceFromCenterForValue(opts.reverse ? this.min : this.max);
				position = this.getPointPosition(i, offset);
				ctx.beginPath();
				ctx.moveTo(this.xCenter, this.yCenter);
				ctx.lineTo(position.x, position.y);
				ctx.stroke();
			}
			ctx.restore();
		}
	}
	drawBorder() {}
	drawLabels() {
		const ctx = this.ctx;
		const opts = this.options;
		const tickOpts = opts.ticks;
		if (!tickOpts.display) return;
		const startAngle = this.getIndexAngle(0);
		let offset, width;
		ctx.save();
		ctx.translate(this.xCenter, this.yCenter);
		ctx.rotate(startAngle);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.ticks.forEach((tick, index) => {
			if (index === 0 && this.min >= 0 && !opts.reverse) return;
			const optsAtIndex = tickOpts.setContext(this.getContext(index));
			const tickFont = toFont(optsAtIndex.font);
			offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
			if (optsAtIndex.showLabelBackdrop) {
				ctx.font = tickFont.string;
				width = ctx.measureText(tick.label).width;
				ctx.fillStyle = optsAtIndex.backdropColor;
				const padding = toPadding(optsAtIndex.backdropPadding);
				ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
			}
			renderText(ctx, tick.label, 0, -offset, tickFont, {
				color: optsAtIndex.color,
				strokeColor: optsAtIndex.textStrokeColor,
				strokeWidth: optsAtIndex.textStrokeWidth
			});
		});
		ctx.restore();
	}
	drawTitle() {}
};
var INTERVALS = {
	millisecond: {
		common: true,
		size: 1,
		steps: 1e3
	},
	second: {
		common: true,
		size: 1e3,
		steps: 60
	},
	minute: {
		common: true,
		size: 6e4,
		steps: 60
	},
	hour: {
		common: true,
		size: 36e5,
		steps: 24
	},
	day: {
		common: true,
		size: 864e5,
		steps: 30
	},
	week: {
		common: false,
		size: 6048e5,
		steps: 4
	},
	month: {
		common: true,
		size: 2628e6,
		steps: 12
	},
	quarter: {
		common: false,
		size: 7884e6,
		steps: 4
	},
	year: {
		common: true,
		size: 3154e7
	}
};
var UNITS = /* @__PURE__ */ Object.keys(INTERVALS);
function sorter(a, b) {
	return a - b;
}
function parse(scale, input) {
	if (isNullOrUndef(input)) return null;
	const adapter = scale._adapter;
	const { parser, round, isoWeekday } = scale._parseOpts;
	let value = input;
	if (typeof parser === "function") value = parser(value);
	if (!isNumberFinite(value)) value = typeof parser === "string" ? adapter.parse(value, parser) : adapter.parse(value);
	if (value === null) return null;
	if (round) value = round === "week" && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round);
	return +value;
}
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
	const ilen = UNITS.length;
	for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
		const interval = INTERVALS[UNITS[i]];
		const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
		if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) return UNITS[i];
	}
	return UNITS[ilen - 1];
}
function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
	for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
		const unit = UNITS[i];
		if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) return unit;
	}
	return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}
function determineMajorUnit(unit) {
	for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) if (INTERVALS[UNITS[i]].common) return UNITS[i];
}
function addTick(ticks, time, timestamps) {
	if (!timestamps) ticks[time] = true;
	else if (timestamps.length) {
		const { lo, hi } = _lookup(timestamps, time);
		const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
		ticks[timestamp] = true;
	}
}
function setMajorTicks(scale, ticks, map, majorUnit) {
	const adapter = scale._adapter;
	const first = +adapter.startOf(ticks[0].value, majorUnit);
	const last = ticks[ticks.length - 1].value;
	let major, index;
	for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
		index = map[major];
		if (index >= 0) ticks[index].major = true;
	}
	return ticks;
}
function ticksFromTimestamps(scale, values, majorUnit) {
	const ticks = [];
	const map = {};
	const ilen = values.length;
	let i, value;
	for (i = 0; i < ilen; ++i) {
		value = values[i];
		map[value] = i;
		ticks.push({
			value,
			major: false
		});
	}
	return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
}
var TimeScale = class extends Scale {
	static id = "time";
	static defaults = {
		bounds: "data",
		adapters: {},
		time: {
			parser: false,
			unit: false,
			round: false,
			isoWeekday: false,
			minUnit: "millisecond",
			displayFormats: {}
		},
		ticks: {
			source: "auto",
			callback: false,
			major: { enabled: false }
		}
	};
	constructor(props) {
		super(props);
		this._cache = {
			data: [],
			labels: [],
			all: []
		};
		this._unit = "day";
		this._majorUnit = void 0;
		this._offsets = {};
		this._normalized = false;
		this._parseOpts = void 0;
	}
	init(scaleOpts, opts = {}) {
		const time = scaleOpts.time || (scaleOpts.time = {});
		const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
		adapter.init(opts);
		mergeIf(time.displayFormats, adapter.formats());
		this._parseOpts = {
			parser: time.parser,
			round: time.round,
			isoWeekday: time.isoWeekday
		};
		super.init(scaleOpts);
		this._normalized = opts.normalized;
	}
	parse(raw, index) {
		if (raw === void 0) return null;
		return parse(this, raw);
	}
	beforeLayout() {
		super.beforeLayout();
		this._cache = {
			data: [],
			labels: [],
			all: []
		};
	}
	determineDataLimits() {
		const options = this.options;
		const adapter = this._adapter;
		const unit = options.time.unit || "day";
		let { min, max, minDefined, maxDefined } = this.getUserBounds();
		function _applyBounds(bounds) {
			if (!minDefined && !isNaN(bounds.min)) min = Math.min(min, bounds.min);
			if (!maxDefined && !isNaN(bounds.max)) max = Math.max(max, bounds.max);
		}
		if (!minDefined || !maxDefined) {
			_applyBounds(this._getLabelBounds());
			if (options.bounds !== "ticks" || options.ticks.source !== "labels") _applyBounds(this.getMinMax(false));
		}
		min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
		max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
		this.min = Math.min(min, max - 1);
		this.max = Math.max(min + 1, max);
	}
	_getLabelBounds() {
		const arr = this.getLabelTimestamps();
		let min = Number.POSITIVE_INFINITY;
		let max = Number.NEGATIVE_INFINITY;
		if (arr.length) {
			min = arr[0];
			max = arr[arr.length - 1];
		}
		return {
			min,
			max
		};
	}
	buildTicks() {
		const options = this.options;
		const timeOpts = options.time;
		const tickOpts = options.ticks;
		const timestamps = tickOpts.source === "labels" ? this.getLabelTimestamps() : this._generate();
		if (options.bounds === "ticks" && timestamps.length) {
			this.min = this._userMin || timestamps[0];
			this.max = this._userMax || timestamps[timestamps.length - 1];
		}
		const min = this.min;
		const max = this.max;
		const ticks = _filterBetween(timestamps, min, max);
		this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
		this._majorUnit = !tickOpts.major.enabled || this._unit === "year" ? void 0 : determineMajorUnit(this._unit);
		this.initOffsets(timestamps);
		if (options.reverse) ticks.reverse();
		return ticksFromTimestamps(this, ticks, this._majorUnit);
	}
	afterAutoSkip() {
		if (this.options.offsetAfterAutoskip) this.initOffsets(this.ticks.map((tick) => +tick.value));
	}
	initOffsets(timestamps = []) {
		let start = 0;
		let end = 0;
		let first, last;
		if (this.options.offset && timestamps.length) {
			first = this.getDecimalForValue(timestamps[0]);
			if (timestamps.length === 1) start = 1 - first;
			else start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
			last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
			if (timestamps.length === 1) end = last;
			else end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
		}
		const limit = timestamps.length < 3 ? .5 : .25;
		start = _limitValue(start, 0, limit);
		end = _limitValue(end, 0, limit);
		this._offsets = {
			start,
			end,
			factor: 1 / (start + 1 + end)
		};
	}
	_generate() {
		const adapter = this._adapter;
		const min = this.min;
		const max = this.max;
		const options = this.options;
		const timeOpts = options.time;
		const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
		const stepSize = valueOrDefault(options.ticks.stepSize, 1);
		const weekday = minor === "week" ? timeOpts.isoWeekday : false;
		const hasWeekday = isNumber(weekday) || weekday === true;
		const ticks = {};
		let first = min;
		let time, count;
		if (hasWeekday) first = +adapter.startOf(first, "isoWeek", weekday);
		first = +adapter.startOf(first, hasWeekday ? "day" : minor);
		if (adapter.diff(max, min, minor) > 1e5 * stepSize) throw new Error(min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor);
		const timestamps = options.ticks.source === "data" && this.getDataTimestamps();
		for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++) addTick(ticks, time, timestamps);
		if (time === max || options.bounds === "ticks" || count === 1) addTick(ticks, time, timestamps);
		return Object.keys(ticks).sort(sorter).map((x) => +x);
	}
	getLabelForValue(value) {
		const adapter = this._adapter;
		const timeOpts = this.options.time;
		if (timeOpts.tooltipFormat) return adapter.format(value, timeOpts.tooltipFormat);
		return adapter.format(value, timeOpts.displayFormats.datetime);
	}
	format(value, format) {
		const formats = this.options.time.displayFormats;
		const unit = this._unit;
		const fmt = format || formats[unit];
		return this._adapter.format(value, fmt);
	}
	_tickFormatFunction(time, index, ticks, format) {
		const options = this.options;
		const formatter = options.ticks.callback;
		if (formatter) return callback(formatter, [
			time,
			index,
			ticks
		], this);
		const formats = options.time.displayFormats;
		const unit = this._unit;
		const majorUnit = this._majorUnit;
		const minorFormat = unit && formats[unit];
		const majorFormat = majorUnit && formats[majorUnit];
		const tick = ticks[index];
		const major = majorUnit && majorFormat && tick && tick.major;
		return this._adapter.format(time, format || (major ? majorFormat : minorFormat));
	}
	generateTickLabels(ticks) {
		let i, ilen, tick;
		for (i = 0, ilen = ticks.length; i < ilen; ++i) {
			tick = ticks[i];
			tick.label = this._tickFormatFunction(tick.value, i, ticks);
		}
	}
	getDecimalForValue(value) {
		return value === null ? NaN : (value - this.min) / (this.max - this.min);
	}
	getPixelForValue(value) {
		const offsets = this._offsets;
		const pos = this.getDecimalForValue(value);
		return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
	}
	getValueForPixel(pixel) {
		const offsets = this._offsets;
		const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
		return this.min + pos * (this.max - this.min);
	}
	_getLabelSize(label) {
		const ticksOpts = this.options.ticks;
		const tickLabelWidth = this.ctx.measureText(label).width;
		const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
		const cosRotation = Math.cos(angle);
		const sinRotation = Math.sin(angle);
		const tickFontSize = this._resolveTickFontOptions(0).size;
		return {
			w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
			h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
		};
	}
	_getLabelCapacity(exampleTime) {
		const timeOpts = this.options.time;
		const displayFormats = timeOpts.displayFormats;
		const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
		const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [exampleTime], this._majorUnit), format);
		const size = this._getLabelSize(exampleLabel);
		const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
		return capacity > 0 ? capacity : 1;
	}
	getDataTimestamps() {
		let timestamps = this._cache.data || [];
		let i, ilen;
		if (timestamps.length) return timestamps;
		const metas = this.getMatchingVisibleMetas();
		if (this._normalized && metas.length) return this._cache.data = metas[0].controller.getAllParsedValues(this);
		for (i = 0, ilen = metas.length; i < ilen; ++i) timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
		return this._cache.data = this.normalize(timestamps);
	}
	getLabelTimestamps() {
		const timestamps = this._cache.labels || [];
		let i, ilen;
		if (timestamps.length) return timestamps;
		const labels = this.getLabels();
		for (i = 0, ilen = labels.length; i < ilen; ++i) timestamps.push(parse(this, labels[i]));
		return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
	}
	normalize(values) {
		return _arrayUnique(values.sort(sorter));
	}
};
function interpolate(table, val, reverse) {
	let lo = 0;
	let hi = table.length - 1;
	let prevSource, nextSource, prevTarget, nextTarget;
	if (reverse) {
		if (val >= table[lo].pos && val <= table[hi].pos) ({lo, hi} = _lookupByKey(table, "pos", val));
		({pos: prevSource, time: prevTarget} = table[lo]);
		({pos: nextSource, time: nextTarget} = table[hi]);
	} else {
		if (val >= table[lo].time && val <= table[hi].time) ({lo, hi} = _lookupByKey(table, "time", val));
		({time: prevSource, pos: prevTarget} = table[lo]);
		({time: nextSource, pos: nextTarget} = table[hi]);
	}
	const span = nextSource - prevSource;
	return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
}
var TimeSeriesScale = class extends TimeScale {
	static id = "timeseries";
	static defaults = TimeScale.defaults;
	constructor(props) {
		super(props);
		this._table = [];
		this._minPos = void 0;
		this._tableRange = void 0;
	}
	initOffsets() {
		const timestamps = this._getTimestampsForTable();
		const table = this._table = this.buildLookupTable(timestamps);
		this._minPos = interpolate(table, this.min);
		this._tableRange = interpolate(table, this.max) - this._minPos;
		super.initOffsets(timestamps);
	}
	buildLookupTable(timestamps) {
		const { min, max } = this;
		const items = [];
		const table = [];
		let i, ilen, prev, curr, next;
		for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
			curr = timestamps[i];
			if (curr >= min && curr <= max) items.push(curr);
		}
		if (items.length < 2) return [{
			time: min,
			pos: 0
		}, {
			time: max,
			pos: 1
		}];
		for (i = 0, ilen = items.length; i < ilen; ++i) {
			next = items[i + 1];
			prev = items[i - 1];
			curr = items[i];
			if (Math.round((next + prev) / 2) !== curr) table.push({
				time: curr,
				pos: i / (ilen - 1)
			});
		}
		return table;
	}
	_generate() {
		const min = this.min;
		const max = this.max;
		let timestamps = super.getDataTimestamps();
		if (!timestamps.includes(min) || !timestamps.length) timestamps.splice(0, 0, min);
		if (!timestamps.includes(max) || timestamps.length === 1) timestamps.push(max);
		return timestamps.sort((a, b) => a - b);
	}
	_getTimestampsForTable() {
		let timestamps = this._cache.all || [];
		if (timestamps.length) return timestamps;
		const data = this.getDataTimestamps();
		const label = this.getLabelTimestamps();
		if (data.length && label.length) timestamps = this.normalize(data.concat(label));
		else timestamps = data.length ? data : label;
		timestamps = this._cache.all = timestamps;
		return timestamps;
	}
	getDecimalForValue(value) {
		return (interpolate(this._table, value) - this._minPos) / this._tableRange;
	}
	getValueForPixel(pixel) {
		const offsets = this._offsets;
		const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
		return interpolate(this._table, decimal * this._tableRange + this._minPos, true);
	}
};
var registerables = [
	controllers,
	elements,
	plugins,
	/* @__PURE__ */ Object.freeze({
		__proto__: null,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale
	})
];
//#endregion
//#region node_modules/chart.js/auto/auto.js
Chart.register(...registerables);
var auto_default = Chart;
//#endregion
export { require_leaflet_src as i, purify as n, require_leaflet_markercluster_src as r, auto_default as t };
