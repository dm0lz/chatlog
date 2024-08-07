/* esm.sh - esbuild bundle(lru-cache@10.2.2) es2022 production */
import __Process$ from "./node_process.js";
var O =
    typeof performance == "object" &&
    performance &&
    typeof performance.now == "function"
      ? performance
      : Date,
  x = new Set(),
  v = typeof __Process$ == "object" && __Process$ ? __Process$ : {},
  U = (a, t, e, i) => {
    typeof v.emitWarning == "function"
      ? v.emitWarning(a, t, e, i)
      : console.error(`[${e}] ${t}: ${a}`);
  },
  E = globalThis.AbortController,
  D = globalThis.AbortSignal;
if (typeof E > "u") {
  (D = class {
    onabort;
    _onabort = [];
    reason;
    aborted = !1;
    addEventListener(i, s) {
      this._onabort.push(s);
    }
  }),
    (E = class {
      constructor() {
        t();
      }
      signal = new D();
      abort(i) {
        if (!this.signal.aborted) {
          (this.signal.reason = i), (this.signal.aborted = !0);
          for (let s of this.signal._onabort) s(i);
          this.signal.onabort?.(i);
        }
      }
    });
  let a = v.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1",
    t = () => {
      a &&
        ((a = !1),
        U(
          "AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.",
          "NO_ABORT_CONTROLLER",
          "ENOTSUP",
          t
        ));
    };
}
var j = (a) => !x.has(a),
  P = Symbol("type"),
  A = (a) => a && a === Math.floor(a) && a > 0 && isFinite(a),
  G = (a) =>
    A(a)
      ? a <= Math.pow(2, 8)
        ? Uint8Array
        : a <= Math.pow(2, 16)
        ? Uint16Array
        : a <= Math.pow(2, 32)
        ? Uint32Array
        : a <= Number.MAX_SAFE_INTEGER
        ? z
        : null
      : null,
  z = class extends Array {
    constructor(t) {
      super(t), this.fill(0);
    }
  },
  C = class a {
    heap;
    length;
    static #l = !1;
    static create(t) {
      let e = G(t);
      if (!e) return [];
      a.#l = !0;
      let i = new a(t, e);
      return (a.#l = !1), i;
    }
    constructor(t, e) {
      if (!a.#l) throw new TypeError("instantiate Stack using Stack.create(n)");
      (this.heap = new e(t)), (this.length = 0);
    }
    push(t) {
      this.heap[this.length++] = t;
    }
    pop() {
      return this.heap[--this.length];
    }
  },
  L = class a {
    #l;
    #c;
    #p;
    #w;
    #C;
    ttl;
    ttlResolution;
    ttlAutopurge;
    updateAgeOnGet;
    updateAgeOnHas;
    allowStale;
    noDisposeOnSet;
    noUpdateTTL;
    maxEntrySize;
    sizeCalculation;
    noDeleteOnFetchRejection;
    noDeleteOnStaleGet;
    allowStaleOnFetchAbort;
    allowStaleOnFetchRejection;
    ignoreFetchAbort;
    #n;
    #S;
    #s;
    #i;
    #t;
    #a;
    #u;
    #o;
    #h;
    #_;
    #r;
    #b;
    #y;
    #d;
    #m;
    #O;
    #f;
    static unsafeExposeInternals(t) {
      return {
        starts: t.#y,
        ttls: t.#d,
        sizes: t.#b,
        keyMap: t.#s,
        keyList: t.#i,
        valList: t.#t,
        next: t.#a,
        prev: t.#u,
        get head() {
          return t.#o;
        },
        get tail() {
          return t.#h;
        },
        free: t.#_,
        isBackgroundFetch: (e) => t.#e(e),
        backgroundFetch: (e, i, s, n) => t.#D(e, i, s, n),
        moveToTail: (e) => t.#v(e),
        indexes: (e) => t.#A(e),
        rindexes: (e) => t.#F(e),
        isStale: (e) => t.#g(e),
      };
    }
    get max() {
      return this.#l;
    }
    get maxSize() {
      return this.#c;
    }
    get calculatedSize() {
      return this.#S;
    }
    get size() {
      return this.#n;
    }
    get fetchMethod() {
      return this.#C;
    }
    get dispose() {
      return this.#p;
    }
    get disposeAfter() {
      return this.#w;
    }
    constructor(t) {
      let {
        max: e = 0,
        ttl: i,
        ttlResolution: s = 1,
        ttlAutopurge: n,
        updateAgeOnGet: h,
        updateAgeOnHas: o,
        allowStale: r,
        dispose: g,
        disposeAfter: b,
        noDisposeOnSet: f,
        noUpdateTTL: u,
        maxSize: c = 0,
        maxEntrySize: F = 0,
        sizeCalculation: d,
        fetchMethod: S,
        noDeleteOnFetchRejection: l,
        noDeleteOnStaleGet: w,
        allowStaleOnFetchRejection: y,
        allowStaleOnFetchAbort: p,
        ignoreFetchAbort: _,
      } = t;
      if (e !== 0 && !A(e))
        throw new TypeError("max option must be a nonnegative integer");
      let T = e ? G(e) : Array;
      if (!T) throw new Error("invalid max value: " + e);
      if (
        ((this.#l = e),
        (this.#c = c),
        (this.maxEntrySize = F || this.#c),
        (this.sizeCalculation = d),
        this.sizeCalculation)
      ) {
        if (!this.#c && !this.maxEntrySize)
          throw new TypeError(
            "cannot set sizeCalculation without setting maxSize or maxEntrySize"
          );
        if (typeof this.sizeCalculation != "function")
          throw new TypeError("sizeCalculation set to non-function");
      }
      if (S !== void 0 && typeof S != "function")
        throw new TypeError("fetchMethod must be a function if specified");
      if (
        ((this.#C = S),
        (this.#O = !!S),
        (this.#s = new Map()),
        (this.#i = new Array(e).fill(void 0)),
        (this.#t = new Array(e).fill(void 0)),
        (this.#a = new T(e)),
        (this.#u = new T(e)),
        (this.#o = 0),
        (this.#h = 0),
        (this.#_ = C.create(e)),
        (this.#n = 0),
        (this.#S = 0),
        typeof g == "function" && (this.#p = g),
        typeof b == "function"
          ? ((this.#w = b), (this.#r = []))
          : ((this.#w = void 0), (this.#r = void 0)),
        (this.#m = !!this.#p),
        (this.#f = !!this.#w),
        (this.noDisposeOnSet = !!f),
        (this.noUpdateTTL = !!u),
        (this.noDeleteOnFetchRejection = !!l),
        (this.allowStaleOnFetchRejection = !!y),
        (this.allowStaleOnFetchAbort = !!p),
        (this.ignoreFetchAbort = !!_),
        this.maxEntrySize !== 0)
      ) {
        if (this.#c !== 0 && !A(this.#c))
          throw new TypeError(
            "maxSize must be a positive integer if specified"
          );
        if (!A(this.maxEntrySize))
          throw new TypeError(
            "maxEntrySize must be a positive integer if specified"
          );
        this.#j();
      }
      if (
        ((this.allowStale = !!r),
        (this.noDeleteOnStaleGet = !!w),
        (this.updateAgeOnGet = !!h),
        (this.updateAgeOnHas = !!o),
        (this.ttlResolution = A(s) || s === 0 ? s : 1),
        (this.ttlAutopurge = !!n),
        (this.ttl = i || 0),
        this.ttl)
      ) {
        if (!A(this.ttl))
          throw new TypeError("ttl must be a positive integer if specified");
        this.#L();
      }
      if (this.#l === 0 && this.ttl === 0 && this.#c === 0)
        throw new TypeError("At least one of max, maxSize, or ttl is required");
      if (!this.ttlAutopurge && !this.#l && !this.#c) {
        let m = "LRU_CACHE_UNBOUNDED";
        j(m) &&
          (x.add(m),
          U(
            "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
            "UnboundedCacheWarning",
            m,
            a
          ));
      }
    }
    getRemainingTTL(t) {
      return this.#s.has(t) ? 1 / 0 : 0;
    }
    #L() {
      let t = new z(this.#l),
        e = new z(this.#l);
      (this.#d = t),
        (this.#y = e),
        (this.#x = (n, h, o = O.now()) => {
          if (
            ((e[n] = h !== 0 ? o : 0), (t[n] = h), h !== 0 && this.ttlAutopurge)
          ) {
            let r = setTimeout(() => {
              this.#g(n) && this.delete(this.#i[n]);
            }, h + 1);
            r.unref && r.unref();
          }
        }),
        (this.#z = (n) => {
          e[n] = t[n] !== 0 ? O.now() : 0;
        }),
        (this.#T = (n, h) => {
          if (t[h]) {
            let o = t[h],
              r = e[h];
            if (!o || !r) return;
            (n.ttl = o), (n.start = r), (n.now = i || s());
            let g = n.now - r;
            n.remainingTTL = o - g;
          }
        });
      let i = 0,
        s = () => {
          let n = O.now();
          if (this.ttlResolution > 0) {
            i = n;
            let h = setTimeout(() => (i = 0), this.ttlResolution);
            h.unref && h.unref();
          }
          return n;
        };
      (this.getRemainingTTL = (n) => {
        let h = this.#s.get(n);
        if (h === void 0) return 0;
        let o = t[h],
          r = e[h];
        if (!o || !r) return 1 / 0;
        let g = (i || s()) - r;
        return o - g;
      }),
        (this.#g = (n) => {
          let h = e[n],
            o = t[n];
          return !!o && !!h && (i || s()) - h > o;
        });
    }
    #z = () => {};
    #T = () => {};
    #x = () => {};
    #g = () => !1;
    #j() {
      let t = new z(this.#l);
      (this.#S = 0),
        (this.#b = t),
        (this.#E = (e) => {
          (this.#S -= t[e]), (t[e] = 0);
        }),
        (this.#U = (e, i, s, n) => {
          if (this.#e(i)) return 0;
          if (!A(s))
            if (n) {
              if (typeof n != "function")
                throw new TypeError("sizeCalculation must be a function");
              if (((s = n(i, e)), !A(s)))
                throw new TypeError(
                  "sizeCalculation return invalid (expect positive integer)"
                );
            } else
              throw new TypeError(
                "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set."
              );
          return s;
        }),
        (this.#R = (e, i, s) => {
          if (((t[e] = i), this.#c)) {
            let n = this.#c - t[e];
            for (; this.#S > n; ) this.#W(!0);
          }
          (this.#S += t[e]),
            s && ((s.entrySize = i), (s.totalCalculatedSize = this.#S));
        });
    }
    #E = (t) => {};
    #R = (t, e, i) => {};
    #U = (t, e, i, s) => {
      if (i || s)
        throw new TypeError(
          "cannot set size without setting maxSize or maxEntrySize on cache"
        );
      return 0;
    };
    *#A({ allowStale: t = this.allowStale } = {}) {
      if (this.#n)
        for (
          let e = this.#h;
          !(!this.#G(e) || ((t || !this.#g(e)) && (yield e), e === this.#o));

        )
          e = this.#u[e];
    }
    *#F({ allowStale: t = this.allowStale } = {}) {
      if (this.#n)
        for (
          let e = this.#o;
          !(!this.#G(e) || ((t || !this.#g(e)) && (yield e), e === this.#h));

        )
          e = this.#a[e];
    }
    #G(t) {
      return t !== void 0 && this.#s.get(this.#i[t]) === t;
    }
    *entries() {
      for (let t of this.#A())
        this.#t[t] !== void 0 &&
          this.#i[t] !== void 0 &&
          !this.#e(this.#t[t]) &&
          (yield [this.#i[t], this.#t[t]]);
    }
    *rentries() {
      for (let t of this.#F())
        this.#t[t] !== void 0 &&
          this.#i[t] !== void 0 &&
          !this.#e(this.#t[t]) &&
          (yield [this.#i[t], this.#t[t]]);
    }
    *keys() {
      for (let t of this.#A()) {
        let e = this.#i[t];
        e !== void 0 && !this.#e(this.#t[t]) && (yield e);
      }
    }
    *rkeys() {
      for (let t of this.#F()) {
        let e = this.#i[t];
        e !== void 0 && !this.#e(this.#t[t]) && (yield e);
      }
    }
    *values() {
      for (let t of this.#A())
        this.#t[t] !== void 0 && !this.#e(this.#t[t]) && (yield this.#t[t]);
    }
    *rvalues() {
      for (let t of this.#F())
        this.#t[t] !== void 0 && !this.#e(this.#t[t]) && (yield this.#t[t]);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
    [Symbol.toStringTag] = "LRUCache";
    find(t, e = {}) {
      for (let i of this.#A()) {
        let s = this.#t[i],
          n = this.#e(s) ? s.__staleWhileFetching : s;
        if (n !== void 0 && t(n, this.#i[i], this))
          return this.get(this.#i[i], e);
      }
    }
    forEach(t, e = this) {
      for (let i of this.#A()) {
        let s = this.#t[i],
          n = this.#e(s) ? s.__staleWhileFetching : s;
        n !== void 0 && t.call(e, n, this.#i[i], this);
      }
    }
    rforEach(t, e = this) {
      for (let i of this.#F()) {
        let s = this.#t[i],
          n = this.#e(s) ? s.__staleWhileFetching : s;
        n !== void 0 && t.call(e, n, this.#i[i], this);
      }
    }
    purgeStale() {
      let t = !1;
      for (let e of this.#F({ allowStale: !0 }))
        this.#g(e) && (this.delete(this.#i[e]), (t = !0));
      return t;
    }
    info(t) {
      let e = this.#s.get(t);
      if (e === void 0) return;
      let i = this.#t[e],
        s = this.#e(i) ? i.__staleWhileFetching : i;
      if (s === void 0) return;
      let n = { value: s };
      if (this.#d && this.#y) {
        let h = this.#d[e],
          o = this.#y[e];
        if (h && o) {
          let r = h - (O.now() - o);
          (n.ttl = r), (n.start = Date.now());
        }
      }
      return this.#b && (n.size = this.#b[e]), n;
    }
    dump() {
      let t = [];
      for (let e of this.#A({ allowStale: !0 })) {
        let i = this.#i[e],
          s = this.#t[e],
          n = this.#e(s) ? s.__staleWhileFetching : s;
        if (n === void 0 || i === void 0) continue;
        let h = { value: n };
        if (this.#d && this.#y) {
          h.ttl = this.#d[e];
          let o = O.now() - this.#y[e];
          h.start = Math.floor(Date.now() - o);
        }
        this.#b && (h.size = this.#b[e]), t.unshift([i, h]);
      }
      return t;
    }
    load(t) {
      this.clear();
      for (let [e, i] of t) {
        if (i.start) {
          let s = Date.now() - i.start;
          i.start = O.now() - s;
        }
        this.set(e, i.value, i);
      }
    }
    set(t, e, i = {}) {
      if (e === void 0) return this.delete(t), this;
      let {
          ttl: s = this.ttl,
          start: n,
          noDisposeOnSet: h = this.noDisposeOnSet,
          sizeCalculation: o = this.sizeCalculation,
          status: r,
        } = i,
        { noUpdateTTL: g = this.noUpdateTTL } = i,
        b = this.#U(t, e, i.size || 0, o);
      if (this.maxEntrySize && b > this.maxEntrySize)
        return (
          r && ((r.set = "miss"), (r.maxEntrySizeExceeded = !0)),
          this.delete(t),
          this
        );
      let f = this.#n === 0 ? void 0 : this.#s.get(t);
      if (f === void 0)
        (f =
          this.#n === 0
            ? this.#h
            : this.#_.length !== 0
            ? this.#_.pop()
            : this.#n === this.#l
            ? this.#W(!1)
            : this.#n),
          (this.#i[f] = t),
          (this.#t[f] = e),
          this.#s.set(t, f),
          (this.#a[this.#h] = f),
          (this.#u[f] = this.#h),
          (this.#h = f),
          this.#n++,
          this.#R(f, b, r),
          r && (r.set = "add"),
          (g = !1);
      else {
        this.#v(f);
        let u = this.#t[f];
        if (e !== u) {
          if (this.#O && this.#e(u)) {
            u.__abortController.abort(new Error("replaced"));
            let { __staleWhileFetching: c } = u;
            c !== void 0 &&
              !h &&
              (this.#m && this.#p?.(c, t, "set"),
              this.#f && this.#r?.push([c, t, "set"]));
          } else
            h ||
              (this.#m && this.#p?.(u, t, "set"),
              this.#f && this.#r?.push([u, t, "set"]));
          if ((this.#E(f), this.#R(f, b, r), (this.#t[f] = e), r)) {
            r.set = "replace";
            let c = u && this.#e(u) ? u.__staleWhileFetching : u;
            c !== void 0 && (r.oldValue = c);
          }
        } else r && (r.set = "update");
      }
      if (
        (s !== 0 && !this.#d && this.#L(),
        this.#d && (g || this.#x(f, s, n), r && this.#T(r, f)),
        !h && this.#f && this.#r)
      ) {
        let u = this.#r,
          c;
        for (; (c = u?.shift()); ) this.#w?.(...c);
      }
      return this;
    }
    pop() {
      try {
        for (; this.#n; ) {
          let t = this.#t[this.#o];
          if ((this.#W(!0), this.#e(t))) {
            if (t.__staleWhileFetching) return t.__staleWhileFetching;
          } else if (t !== void 0) return t;
        }
      } finally {
        if (this.#f && this.#r) {
          let t = this.#r,
            e;
          for (; (e = t?.shift()); ) this.#w?.(...e);
        }
      }
    }
    #W(t) {
      let e = this.#o,
        i = this.#i[e],
        s = this.#t[e];
      return (
        this.#O && this.#e(s)
          ? s.__abortController.abort(new Error("evicted"))
          : (this.#m || this.#f) &&
            (this.#m && this.#p?.(s, i, "evict"),
            this.#f && this.#r?.push([s, i, "evict"])),
        this.#E(e),
        t && ((this.#i[e] = void 0), (this.#t[e] = void 0), this.#_.push(e)),
        this.#n === 1
          ? ((this.#o = this.#h = 0), (this.#_.length = 0))
          : (this.#o = this.#a[e]),
        this.#s.delete(i),
        this.#n--,
        e
      );
    }
    has(t, e = {}) {
      let { updateAgeOnHas: i = this.updateAgeOnHas, status: s } = e,
        n = this.#s.get(t);
      if (n !== void 0) {
        let h = this.#t[n];
        if (this.#e(h) && h.__staleWhileFetching === void 0) return !1;
        if (this.#g(n)) s && ((s.has = "stale"), this.#T(s, n));
        else return i && this.#z(n), s && ((s.has = "hit"), this.#T(s, n)), !0;
      } else s && (s.has = "miss");
      return !1;
    }
    peek(t, e = {}) {
      let { allowStale: i = this.allowStale } = e,
        s = this.#s.get(t);
      if (s === void 0 || (!i && this.#g(s))) return;
      let n = this.#t[s];
      return this.#e(n) ? n.__staleWhileFetching : n;
    }
    #D(t, e, i, s) {
      let n = e === void 0 ? void 0 : this.#t[e];
      if (this.#e(n)) return n;
      let h = new E(),
        { signal: o } = i;
      o?.addEventListener("abort", () => h.abort(o.reason), {
        signal: h.signal,
      });
      let r = { signal: h.signal, options: i, context: s },
        g = (d, S = !1) => {
          let { aborted: l } = h.signal,
            w = i.ignoreFetchAbort && d !== void 0;
          if (
            (i.status &&
              (l && !S
                ? ((i.status.fetchAborted = !0),
                  (i.status.fetchError = h.signal.reason),
                  w && (i.status.fetchAbortIgnored = !0))
                : (i.status.fetchResolved = !0)),
            l && !w && !S)
          )
            return f(h.signal.reason);
          let y = c;
          return (
            this.#t[e] === c &&
              (d === void 0
                ? y.__staleWhileFetching
                  ? (this.#t[e] = y.__staleWhileFetching)
                  : this.delete(t)
                : (i.status && (i.status.fetchUpdated = !0),
                  this.set(t, d, r.options))),
            d
          );
        },
        b = (d) => (
          i.status &&
            ((i.status.fetchRejected = !0), (i.status.fetchError = d)),
          f(d)
        ),
        f = (d) => {
          let { aborted: S } = h.signal,
            l = S && i.allowStaleOnFetchAbort,
            w = l || i.allowStaleOnFetchRejection,
            y = w || i.noDeleteOnFetchRejection,
            p = c;
          if (
            (this.#t[e] === c &&
              (!y || p.__staleWhileFetching === void 0
                ? this.delete(t)
                : l || (this.#t[e] = p.__staleWhileFetching)),
            w)
          )
            return (
              i.status &&
                p.__staleWhileFetching !== void 0 &&
                (i.status.returnedStale = !0),
              p.__staleWhileFetching
            );
          if (p.__returned === p) throw d;
        },
        u = (d, S) => {
          let l = this.#C?.(t, n, r);
          l &&
            l instanceof Promise &&
            l.then((w) => d(w === void 0 ? void 0 : w), S),
            h.signal.addEventListener("abort", () => {
              (!i.ignoreFetchAbort || i.allowStaleOnFetchAbort) &&
                (d(void 0), i.allowStaleOnFetchAbort && (d = (w) => g(w, !0)));
            });
        };
      i.status && (i.status.fetchDispatched = !0);
      let c = new Promise(u).then(g, b),
        F = Object.assign(c, {
          __abortController: h,
          __staleWhileFetching: n,
          __returned: void 0,
        });
      return (
        e === void 0
          ? (this.set(t, F, { ...r.options, status: void 0 }),
            (e = this.#s.get(t)))
          : (this.#t[e] = F),
        F
      );
    }
    #e(t) {
      if (!this.#O) return !1;
      let e = t;
      return (
        !!e &&
        e instanceof Promise &&
        e.hasOwnProperty("__staleWhileFetching") &&
        e.__abortController instanceof E
      );
    }
    async fetch(t, e = {}) {
      let {
        allowStale: i = this.allowStale,
        updateAgeOnGet: s = this.updateAgeOnGet,
        noDeleteOnStaleGet: n = this.noDeleteOnStaleGet,
        ttl: h = this.ttl,
        noDisposeOnSet: o = this.noDisposeOnSet,
        size: r = 0,
        sizeCalculation: g = this.sizeCalculation,
        noUpdateTTL: b = this.noUpdateTTL,
        noDeleteOnFetchRejection: f = this.noDeleteOnFetchRejection,
        allowStaleOnFetchRejection: u = this.allowStaleOnFetchRejection,
        ignoreFetchAbort: c = this.ignoreFetchAbort,
        allowStaleOnFetchAbort: F = this.allowStaleOnFetchAbort,
        context: d,
        forceRefresh: S = !1,
        status: l,
        signal: w,
      } = e;
      if (!this.#O)
        return (
          l && (l.fetch = "get"),
          this.get(t, {
            allowStale: i,
            updateAgeOnGet: s,
            noDeleteOnStaleGet: n,
            status: l,
          })
        );
      let y = {
          allowStale: i,
          updateAgeOnGet: s,
          noDeleteOnStaleGet: n,
          ttl: h,
          noDisposeOnSet: o,
          size: r,
          sizeCalculation: g,
          noUpdateTTL: b,
          noDeleteOnFetchRejection: f,
          allowStaleOnFetchRejection: u,
          allowStaleOnFetchAbort: F,
          ignoreFetchAbort: c,
          status: l,
          signal: w,
        },
        p = this.#s.get(t);
      if (p === void 0) {
        l && (l.fetch = "miss");
        let _ = this.#D(t, p, y, d);
        return (_.__returned = _);
      } else {
        let _ = this.#t[p];
        if (this.#e(_)) {
          let W = i && _.__staleWhileFetching !== void 0;
          return (
            l && ((l.fetch = "inflight"), W && (l.returnedStale = !0)),
            W ? _.__staleWhileFetching : (_.__returned = _)
          );
        }
        let T = this.#g(p);
        if (!S && !T)
          return (
            l && (l.fetch = "hit"),
            this.#v(p),
            s && this.#z(p),
            l && this.#T(l, p),
            _
          );
        let m = this.#D(t, p, y, d),
          R = m.__staleWhileFetching !== void 0 && i;
        return (
          l &&
            ((l.fetch = T ? "stale" : "refresh"),
            R && T && (l.returnedStale = !0)),
          R ? m.__staleWhileFetching : (m.__returned = m)
        );
      }
    }
    get(t, e = {}) {
      let {
          allowStale: i = this.allowStale,
          updateAgeOnGet: s = this.updateAgeOnGet,
          noDeleteOnStaleGet: n = this.noDeleteOnStaleGet,
          status: h,
        } = e,
        o = this.#s.get(t);
      if (o !== void 0) {
        let r = this.#t[o],
          g = this.#e(r);
        return (
          h && this.#T(h, o),
          this.#g(o)
            ? (h && (h.get = "stale"),
              g
                ? (h &&
                    i &&
                    r.__staleWhileFetching !== void 0 &&
                    (h.returnedStale = !0),
                  i ? r.__staleWhileFetching : void 0)
                : (n || this.delete(t),
                  h && i && (h.returnedStale = !0),
                  i ? r : void 0))
            : (h && (h.get = "hit"),
              g ? r.__staleWhileFetching : (this.#v(o), s && this.#z(o), r))
        );
      } else h && (h.get = "miss");
    }
    #I(t, e) {
      (this.#u[e] = t), (this.#a[t] = e);
    }
    #v(t) {
      t !== this.#h &&
        (t === this.#o
          ? (this.#o = this.#a[t])
          : this.#I(this.#u[t], this.#a[t]),
        this.#I(this.#h, t),
        (this.#h = t));
    }
    delete(t) {
      let e = !1;
      if (this.#n !== 0) {
        let i = this.#s.get(t);
        if (i !== void 0)
          if (((e = !0), this.#n === 1)) this.clear();
          else {
            this.#E(i);
            let s = this.#t[i];
            if (
              (this.#e(s)
                ? s.__abortController.abort(new Error("deleted"))
                : (this.#m || this.#f) &&
                  (this.#m && this.#p?.(s, t, "delete"),
                  this.#f && this.#r?.push([s, t, "delete"])),
              this.#s.delete(t),
              (this.#i[i] = void 0),
              (this.#t[i] = void 0),
              i === this.#h)
            )
              this.#h = this.#u[i];
            else if (i === this.#o) this.#o = this.#a[i];
            else {
              let n = this.#u[i];
              this.#a[n] = this.#a[i];
              let h = this.#a[i];
              this.#u[h] = this.#u[i];
            }
            this.#n--, this.#_.push(i);
          }
      }
      if (this.#f && this.#r?.length) {
        let i = this.#r,
          s;
        for (; (s = i?.shift()); ) this.#w?.(...s);
      }
      return e;
    }
    clear() {
      for (let t of this.#F({ allowStale: !0 })) {
        let e = this.#t[t];
        if (this.#e(e)) e.__abortController.abort(new Error("deleted"));
        else {
          let i = this.#i[t];
          this.#m && this.#p?.(e, i, "delete"),
            this.#f && this.#r?.push([e, i, "delete"]);
        }
      }
      if (
        (this.#s.clear(),
        this.#t.fill(void 0),
        this.#i.fill(void 0),
        this.#d && this.#y && (this.#d.fill(0), this.#y.fill(0)),
        this.#b && this.#b.fill(0),
        (this.#o = 0),
        (this.#h = 0),
        (this.#_.length = 0),
        (this.#S = 0),
        (this.#n = 0),
        this.#f && this.#r)
      ) {
        let t = this.#r,
          e;
        for (; (e = t?.shift()); ) this.#w?.(...e);
      }
    }
  };
export { L as LRUCache };
//# sourceMappingURL=lru-cache.mjs.map
