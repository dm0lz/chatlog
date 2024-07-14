/* esm.sh - esbuild bundle(bottleneck@2.19.5/light) es2022 production */
var __global$ = globalThis || (typeof window !== "undefined" ? window : self);
var Pt = Object.create;
var C = Object.defineProperty;
var jt = Object.getOwnPropertyDescriptor;
var Tt = Object.getOwnPropertyNames;
var qt = Object.getPrototypeOf,
  At = Object.prototype.hasOwnProperty;
var Bt = (l, a) => () => (a || l((a = { exports: {} }).exports, a), a.exports),
  Nt = (l, a) => {
    for (var d in a) C(l, d, { get: a[d], enumerable: !0 });
  },
  L = (l, a, d, y) => {
    if ((a && typeof a == "object") || typeof a == "function")
      for (let p of Tt(a))
        !At.call(l, p) &&
          p !== d &&
          C(l, p, {
            get: () => a[p],
            enumerable: !(y = jt(a, p)) || y.enumerable,
          });
    return l;
  },
  m = (l, a, d) => (L(l, a, "default"), d && L(d, a, "default")),
  mt = (l, a, d) => (
    (d = l != null ? Pt(qt(l)) : {}),
    L(
      a || !l || !l.__esModule
        ? C(d, "default", { value: l, enumerable: !0 })
        : d,
      l
    )
  );
var j = Bt((S, P) => {
  (function (l, a) {
    typeof S == "object" && typeof P < "u"
      ? (P.exports = a())
      : typeof define == "function" && define.amd
      ? define(a)
      : (l.Bottleneck = a());
  })(S, function () {
    "use strict";
    var l =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : typeof __global$ < "u"
        ? __global$
        : typeof self < "u"
        ? self
        : {};
    function a(u) {
      return (u && u.default) || u;
    }
    var d = function (u, e, t = {}) {
        var s, r, i;
        for (s in e) (i = e[s]), (t[s] = (r = u[s]) != null ? r : i);
        return t;
      },
      y = function (u, e, t = {}) {
        var s, r;
        for (s in u) (r = u[s]), e[s] !== void 0 && (t[s] = r);
        return t;
      },
      p = { load: d, overwrite: y },
      T;
    T = class {
      constructor(e, t) {
        (this.incr = e),
          (this.decr = t),
          (this._first = null),
          (this._last = null),
          (this.length = 0);
      }
      push(e) {
        var t;
        this.length++,
          typeof this.incr == "function" && this.incr(),
          (t = { value: e, prev: this._last, next: null }),
          this._last != null
            ? ((this._last.next = t), (this._last = t))
            : (this._first = this._last = t);
      }
      shift() {
        var e;
        if (this._first != null)
          return (
            this.length--,
            typeof this.decr == "function" && this.decr(),
            (e = this._first.value),
            (this._first = this._first.next) != null
              ? (this._first.prev = null)
              : (this._last = null),
            e
          );
      }
      first() {
        if (this._first != null) return this._first.value;
      }
      getArray() {
        var e, t, s;
        for (e = this._first, s = []; e != null; )
          s.push(((t = e), (e = e.next), t.value));
        return s;
      }
      forEachShift(e) {
        var t;
        for (t = this.shift(); t != null; ) e(t), (t = this.shift());
      }
      debug() {
        var e, t, s, r, i;
        for (e = this._first, i = []; e != null; )
          i.push(
            ((t = e),
            (e = e.next),
            {
              value: t.value,
              prev: (s = t.prev) != null ? s.value : void 0,
              next: (r = t.next) != null ? r.value : void 0,
            })
          );
        return i;
      }
    };
    var q = T,
      A;
    A = class {
      constructor(e) {
        if (
          ((this.instance = e),
          (this._events = {}),
          this.instance.on != null ||
            this.instance.once != null ||
            this.instance.removeAllListeners != null)
        )
          throw new Error("An Emitter already exists for this object");
        (this.instance.on = (t, s) => this._addListener(t, "many", s)),
          (this.instance.once = (t, s) => this._addListener(t, "once", s)),
          (this.instance.removeAllListeners = (t = null) =>
            t != null ? delete this._events[t] : (this._events = {}));
      }
      _addListener(e, t, s) {
        var r;
        return (
          (r = this._events)[e] == null && (r[e] = []),
          this._events[e].push({ cb: s, status: t }),
          this.instance
        );
      }
      listenerCount(e) {
        return this._events[e] != null ? this._events[e].length : 0;
      }
      async trigger(e, ...t) {
        var s, r;
        try {
          return (
            e !== "debug" && this.trigger("debug", `Event triggered: ${e}`, t),
            this._events[e] == null
              ? void 0
              : ((this._events[e] = this._events[e].filter(function (i) {
                  return i.status !== "none";
                })),
                (r = this._events[e].map(async (i) => {
                  var n, o;
                  if (i.status !== "none") {
                    i.status === "once" && (i.status = "none");
                    try {
                      return (
                        (o = typeof i.cb == "function" ? i.cb(...t) : void 0),
                        typeof o?.then == "function" ? await o : o
                      );
                    } catch (h) {
                      return (n = h), this.trigger("error", n), null;
                    }
                  }
                })),
                (await Promise.all(r)).find(function (i) {
                  return i != null;
                }))
          );
        } catch (i) {
          return (s = i), this.trigger("error", s), null;
        }
      }
    };
    var E = A,
      B,
      N,
      F;
    (B = q),
      (N = E),
      (F = class {
        constructor(e) {
          var t;
          (this.Events = new N(this)),
            (this._length = 0),
            (this._lists = function () {
              var s, r, i;
              for (
                i = [], t = s = 1, r = e;
                1 <= r ? s <= r : s >= r;
                t = 1 <= r ? ++s : --s
              )
                i.push(
                  new B(
                    () => this.incr(),
                    () => this.decr()
                  )
                );
              return i;
            }.call(this));
        }
        incr() {
          if (this._length++ === 0) return this.Events.trigger("leftzero");
        }
        decr() {
          if (--this._length === 0) return this.Events.trigger("zero");
        }
        push(e) {
          return this._lists[e.options.priority].push(e);
        }
        queued(e) {
          return e != null ? this._lists[e].length : this._length;
        }
        shiftAll(e) {
          return this._lists.forEach(function (t) {
            return t.forEachShift(e);
          });
        }
        getFirst(e = this._lists) {
          var t, s, r;
          for (t = 0, s = e.length; t < s; t++)
            if (((r = e[t]), r.length > 0)) return r;
          return [];
        }
        shiftLastFrom(e) {
          return this.getFirst(this._lists.slice(e).reverse()).shift();
        }
      });
    var yt = F,
      G;
    G = class extends Error {};
    var b = G,
      w,
      M,
      U,
      k,
      Q;
    (k = 10),
      (M = 5),
      (Q = p),
      (w = b),
      (U = class {
        constructor(e, t, s, r, i, n, o, h) {
          (this.task = e),
            (this.args = t),
            (this.rejectOnDrop = i),
            (this.Events = n),
            (this._states = o),
            (this.Promise = h),
            (this.options = Q.load(s, r)),
            (this.options.priority = this._sanitizePriority(
              this.options.priority
            )),
            this.options.id === r.id &&
              (this.options.id = `${this.options.id}-${this._randomIndex()}`),
            (this.promise = new this.Promise((c, _) => {
              (this._resolve = c), (this._reject = _);
            })),
            (this.retryCount = 0);
        }
        _sanitizePriority(e) {
          var t;
          return (t = ~~e !== e ? M : e), t < 0 ? 0 : t > k - 1 ? k - 1 : t;
        }
        _randomIndex() {
          return Math.random().toString(36).slice(2);
        }
        doDrop({
          error: e,
          message: t = "This job has been dropped by Bottleneck",
        } = {}) {
          return this._states.remove(this.options.id)
            ? (this.rejectOnDrop && this._reject(e ?? new w(t)),
              this.Events.trigger("dropped", {
                args: this.args,
                options: this.options,
                task: this.task,
                promise: this.promise,
              }),
              !0)
            : !1;
        }
        _assertStatus(e) {
          var t;
          if (
            ((t = this._states.jobStatus(this.options.id)),
            !(t === e || (e === "DONE" && t === null)))
          )
            throw new w(
              `Invalid job status ${t}, expected ${e}. Please open an issue at https://github.com/SGrondin/bottleneck/issues`
            );
        }
        doReceive() {
          return (
            this._states.start(this.options.id),
            this.Events.trigger("received", {
              args: this.args,
              options: this.options,
            })
          );
        }
        doQueue(e, t) {
          return (
            this._assertStatus("RECEIVED"),
            this._states.next(this.options.id),
            this.Events.trigger("queued", {
              args: this.args,
              options: this.options,
              reachedHWM: e,
              blocked: t,
            })
          );
        }
        doRun() {
          return (
            this.retryCount === 0
              ? (this._assertStatus("QUEUED"),
                this._states.next(this.options.id))
              : this._assertStatus("EXECUTING"),
            this.Events.trigger("scheduled", {
              args: this.args,
              options: this.options,
            })
          );
        }
        async doExecute(e, t, s, r) {
          var i, n, o;
          this.retryCount === 0
            ? (this._assertStatus("RUNNING"),
              this._states.next(this.options.id))
            : this._assertStatus("EXECUTING"),
            (n = {
              args: this.args,
              options: this.options,
              retryCount: this.retryCount,
            }),
            this.Events.trigger("executing", n);
          try {
            if (
              ((o = await (e != null
                ? e.schedule(this.options, this.task, ...this.args)
                : this.task(...this.args))),
              t())
            )
              return (
                this.doDone(n),
                await r(this.options, n),
                this._assertStatus("DONE"),
                this._resolve(o)
              );
          } catch (h) {
            return (i = h), this._onFailure(i, n, t, s, r);
          }
        }
        doExpire(e, t, s) {
          var r, i;
          return (
            this._states.jobStatus(this.options.id === "RUNNING") &&
              this._states.next(this.options.id),
            this._assertStatus("EXECUTING"),
            (i = {
              args: this.args,
              options: this.options,
              retryCount: this.retryCount,
            }),
            (r = new w(
              `This job timed out after ${this.options.expiration} ms.`
            )),
            this._onFailure(r, i, e, t, s)
          );
        }
        async _onFailure(e, t, s, r, i) {
          var n, o;
          if (s())
            return (
              (n = await this.Events.trigger("failed", e, t)),
              n != null
                ? ((o = ~~n),
                  this.Events.trigger(
                    "retry",
                    `Retrying ${this.options.id} after ${o} ms`,
                    t
                  ),
                  this.retryCount++,
                  r(o))
                : (this.doDone(t),
                  await i(this.options, t),
                  this._assertStatus("DONE"),
                  this._reject(e))
            );
        }
        doDone(e) {
          return (
            this._assertStatus("EXECUTING"),
            this._states.next(this.options.id),
            this.Events.trigger("done", e)
          );
        }
      });
    var Et = U,
      W,
      K,
      R;
    (R = p),
      (W = b),
      (K = class {
        constructor(e, t, s) {
          (this.instance = e),
            (this.storeOptions = t),
            (this.clientId = this.instance._randomIndex()),
            R.load(s, s, this),
            (this._nextRequest =
              this._lastReservoirRefresh =
              this._lastReservoirIncrease =
                Date.now()),
            (this._running = 0),
            (this._done = 0),
            (this._unblockTime = 0),
            (this.ready = this.Promise.resolve()),
            (this.clients = {}),
            this._startHeartbeat();
        }
        _startHeartbeat() {
          var e;
          return this.heartbeat == null &&
            ((this.storeOptions.reservoirRefreshInterval != null &&
              this.storeOptions.reservoirRefreshAmount != null) ||
              (this.storeOptions.reservoirIncreaseInterval != null &&
                this.storeOptions.reservoirIncreaseAmount != null))
            ? typeof (e = this.heartbeat =
                setInterval(() => {
                  var t, s, r, i, n;
                  if (
                    ((i = Date.now()),
                    this.storeOptions.reservoirRefreshInterval != null &&
                      i >=
                        this._lastReservoirRefresh +
                          this.storeOptions.reservoirRefreshInterval &&
                      ((this._lastReservoirRefresh = i),
                      (this.storeOptions.reservoir =
                        this.storeOptions.reservoirRefreshAmount),
                      this.instance._drainAll(this.computeCapacity())),
                    this.storeOptions.reservoirIncreaseInterval != null &&
                      i >=
                        this._lastReservoirIncrease +
                          this.storeOptions.reservoirIncreaseInterval &&
                      (({
                        reservoirIncreaseAmount: t,
                        reservoirIncreaseMaximum: r,
                        reservoir: n,
                      } = this.storeOptions),
                      (this._lastReservoirIncrease = i),
                      (s = r != null ? Math.min(t, r - n) : t),
                      s > 0))
                  )
                    return (
                      (this.storeOptions.reservoir += s),
                      this.instance._drainAll(this.computeCapacity())
                    );
                }, this.heartbeatInterval)).unref == "function"
              ? e.unref()
              : void 0
            : clearInterval(this.heartbeat);
        }
        async __publish__(e) {
          return (
            await this.yieldLoop(),
            this.instance.Events.trigger("message", e.toString())
          );
        }
        async __disconnect__(e) {
          return (
            await this.yieldLoop(),
            clearInterval(this.heartbeat),
            this.Promise.resolve()
          );
        }
        yieldLoop(e = 0) {
          return new this.Promise(function (t, s) {
            return setTimeout(t, e);
          });
        }
        computePenalty() {
          var e;
          return (e = this.storeOptions.penalty) != null
            ? e
            : 15 * this.storeOptions.minTime || 5e3;
        }
        async __updateSettings__(e) {
          return (
            await this.yieldLoop(),
            R.overwrite(e, e, this.storeOptions),
            this._startHeartbeat(),
            this.instance._drainAll(this.computeCapacity()),
            !0
          );
        }
        async __running__() {
          return await this.yieldLoop(), this._running;
        }
        async __queued__() {
          return await this.yieldLoop(), this.instance.queued();
        }
        async __done__() {
          return await this.yieldLoop(), this._done;
        }
        async __groupCheck__(e) {
          return await this.yieldLoop(), this._nextRequest + this.timeout < e;
        }
        computeCapacity() {
          var e, t;
          return (
            ({ maxConcurrent: e, reservoir: t } = this.storeOptions),
            e != null && t != null
              ? Math.min(e - this._running, t)
              : e != null
              ? e - this._running
              : t ?? null
          );
        }
        conditionsCheck(e) {
          var t;
          return (t = this.computeCapacity()), t == null || e <= t;
        }
        async __incrementReservoir__(e) {
          var t;
          return (
            await this.yieldLoop(),
            (t = this.storeOptions.reservoir += e),
            this.instance._drainAll(this.computeCapacity()),
            t
          );
        }
        async __currentReservoir__() {
          return await this.yieldLoop(), this.storeOptions.reservoir;
        }
        isBlocked(e) {
          return this._unblockTime >= e;
        }
        check(e, t) {
          return this.conditionsCheck(e) && this._nextRequest - t <= 0;
        }
        async __check__(e) {
          var t;
          return await this.yieldLoop(), (t = Date.now()), this.check(e, t);
        }
        async __register__(e, t, s) {
          var r, i;
          return (
            await this.yieldLoop(),
            (r = Date.now()),
            this.conditionsCheck(t)
              ? ((this._running += t),
                this.storeOptions.reservoir != null &&
                  (this.storeOptions.reservoir -= t),
                (i = Math.max(this._nextRequest - r, 0)),
                (this._nextRequest = r + i + this.storeOptions.minTime),
                {
                  success: !0,
                  wait: i,
                  reservoir: this.storeOptions.reservoir,
                })
              : { success: !1 }
          );
        }
        strategyIsBlock() {
          return this.storeOptions.strategy === 3;
        }
        async __submit__(e, t) {
          var s, r, i;
          if (
            (await this.yieldLoop(),
            this.storeOptions.maxConcurrent != null &&
              t > this.storeOptions.maxConcurrent)
          )
            throw new W(
              `Impossible to add a job having a weight of ${t} to a limiter having a maxConcurrent setting of ${this.storeOptions.maxConcurrent}`
            );
          return (
            (r = Date.now()),
            (i =
              this.storeOptions.highWater != null &&
              e === this.storeOptions.highWater &&
              !this.check(t, r)),
            (s = this.strategyIsBlock() && (i || this.isBlocked(r))),
            s &&
              ((this._unblockTime = r + this.computePenalty()),
              (this._nextRequest =
                this._unblockTime + this.storeOptions.minTime),
              this.instance._dropAllQueued()),
            { reachedHWM: i, blocked: s, strategy: this.storeOptions.strategy }
          );
        }
        async __free__(e, t) {
          return (
            await this.yieldLoop(),
            (this._running -= t),
            (this._done += t),
            this.instance._drainAll(this.computeCapacity()),
            { running: this._running }
          );
        }
      });
    var bt = K,
      z,
      J;
    (z = b),
      (J = class {
        constructor(e) {
          (this.status = e),
            (this._jobs = {}),
            (this.counts = this.status.map(function () {
              return 0;
            }));
        }
        next(e) {
          var t, s;
          if (
            ((t = this._jobs[e]),
            (s = t + 1),
            t != null && s < this.status.length)
          )
            return this.counts[t]--, this.counts[s]++, this._jobs[e]++;
          if (t != null) return this.counts[t]--, delete this._jobs[e];
        }
        start(e) {
          var t;
          return (t = 0), (this._jobs[e] = t), this.counts[t]++;
        }
        remove(e) {
          var t;
          return (
            (t = this._jobs[e]),
            t != null && (this.counts[t]--, delete this._jobs[e]),
            t != null
          );
        }
        jobStatus(e) {
          var t;
          return (t = this.status[this._jobs[e]]) != null ? t : null;
        }
        statusJobs(e) {
          var t, s, r, i, n;
          if (e != null) {
            if (((s = this.status.indexOf(e)), s < 0))
              throw new z(`status must be one of ${this.status.join(", ")}`);
            (r = this._jobs), (i = []);
            for (t in r) (n = r[t]), n === s && i.push(t);
            return i;
          } else return Object.keys(this._jobs);
        }
        statusCounts() {
          return this.counts.reduce(
            (e, t, s) => ((e[this.status[s]] = t), e),
            {}
          );
        }
      });
    var wt = J,
      Y,
      V;
    (Y = q),
      (V = class {
        constructor(e, t) {
          (this.schedule = this.schedule.bind(this)),
            (this.name = e),
            (this.Promise = t),
            (this._running = 0),
            (this._queue = new Y());
        }
        isEmpty() {
          return this._queue.length === 0;
        }
        async _tryToRun() {
          var e, t, s, r, i, n, o;
          if (this._running < 1 && this._queue.length > 0)
            return (
              this._running++,
              ({
                task: o,
                args: e,
                resolve: i,
                reject: r,
              } = this._queue.shift()),
              (t = await (async function () {
                try {
                  return (
                    (n = await o(...e)),
                    function () {
                      return i(n);
                    }
                  );
                } catch (h) {
                  return (
                    (s = h),
                    function () {
                      return r(s);
                    }
                  );
                }
              })()),
              this._running--,
              this._tryToRun(),
              t()
            );
        }
        schedule(e, ...t) {
          var s, r, i;
          return (
            (i = r = null),
            (s = new this.Promise(function (n, o) {
              return (i = n), (r = o);
            })),
            this._queue.push({ task: e, args: t, resolve: i, reject: r }),
            this._tryToRun(),
            s
          );
        }
      });
    var Ot = V,
      H = "2.19.5",
      kt = { version: H },
      Rt = Object.freeze({ version: H, default: kt }),
      X = () =>
        console.log(
          "You must import the full version of Bottleneck in order to use this feature."
        ),
      Z = () =>
        console.log(
          "You must import the full version of Bottleneck in order to use this feature."
        ),
      It = () =>
        console.log(
          "You must import the full version of Bottleneck in order to use this feature."
        ),
      tt,
      et,
      st,
      rt,
      it,
      O;
    (O = p),
      (tt = E),
      (rt = X),
      (st = Z),
      (it = It),
      (et = function () {
        class u {
          constructor(t = {}) {
            (this.deleteKey = this.deleteKey.bind(this)),
              (this.limiterOptions = t),
              O.load(this.limiterOptions, this.defaults, this),
              (this.Events = new tt(this)),
              (this.instances = {}),
              (this.Bottleneck = ft),
              this._startAutoCleanup(),
              (this.sharedConnection = this.connection != null),
              this.connection == null &&
                (this.limiterOptions.datastore === "redis"
                  ? (this.connection = new rt(
                      Object.assign({}, this.limiterOptions, {
                        Events: this.Events,
                      })
                    ))
                  : this.limiterOptions.datastore === "ioredis" &&
                    (this.connection = new st(
                      Object.assign({}, this.limiterOptions, {
                        Events: this.Events,
                      })
                    )));
          }
          key(t = "") {
            var s;
            return (s = this.instances[t]) != null
              ? s
              : (() => {
                  var r;
                  return (
                    (r = this.instances[t] =
                      new this.Bottleneck(
                        Object.assign(this.limiterOptions, {
                          id: `${this.id}-${t}`,
                          timeout: this.timeout,
                          connection: this.connection,
                        })
                      )),
                    this.Events.trigger("created", r, t),
                    r
                  );
                })();
          }
          async deleteKey(t = "") {
            var s, r;
            return (
              (r = this.instances[t]),
              this.connection &&
                (s = await this.connection.__runCommand__([
                  "del",
                  ...it.allKeys(`${this.id}-${t}`),
                ])),
              r != null && (delete this.instances[t], await r.disconnect()),
              r != null || s > 0
            );
          }
          limiters() {
            var t, s, r, i;
            (s = this.instances), (r = []);
            for (t in s) (i = s[t]), r.push({ key: t, limiter: i });
            return r;
          }
          keys() {
            return Object.keys(this.instances);
          }
          async clusterKeys() {
            var t, s, r, i, n, o, h, c, _;
            if (this.connection == null)
              return this.Promise.resolve(this.keys());
            for (o = [], t = null, _ = `b_${this.id}-`.length, s = 9; t !== 0; )
              for (
                [c, r] = await this.connection.__runCommand__([
                  "scan",
                  t ?? 0,
                  "match",
                  `b_${this.id}-*_settings`,
                  "count",
                  1e4,
                ]),
                  t = ~~c,
                  i = 0,
                  h = r.length;
                i < h;
                i++
              )
                (n = r[i]), o.push(n.slice(_, -s));
            return o;
          }
          _startAutoCleanup() {
            var t;
            return (
              clearInterval(this.interval),
              typeof (t = this.interval =
                setInterval(async () => {
                  var s, r, i, n, o, h;
                  (o = Date.now()), (i = this.instances), (n = []);
                  for (r in i) {
                    h = i[r];
                    try {
                      (await h._store.__groupCheck__(o))
                        ? n.push(this.deleteKey(r))
                        : n.push(void 0);
                    } catch (c) {
                      (s = c), n.push(h.Events.trigger("error", s));
                    }
                  }
                  return n;
                }, this.timeout / 2)).unref == "function"
                ? t.unref()
                : void 0
            );
          }
          updateSettings(t = {}) {
            if (
              (O.overwrite(t, this.defaults, this),
              O.overwrite(t, t, this.limiterOptions),
              t.timeout != null)
            )
              return this._startAutoCleanup();
          }
          disconnect(t = !0) {
            var s;
            if (!this.sharedConnection)
              return (s = this.connection) != null ? s.disconnect(t) : void 0;
          }
        }
        return (
          (u.prototype.defaults = {
            timeout: 1e3 * 60 * 5,
            connection: null,
            Promise,
            id: "group-key",
          }),
          u
        );
      }.call(l));
    var Dt = et,
      nt,
      ot,
      ut;
    (ut = p),
      (ot = E),
      (nt = function () {
        class u {
          constructor(t = {}) {
            (this.options = t),
              ut.load(this.options, this.defaults, this),
              (this.Events = new ot(this)),
              (this._arr = []),
              this._resetPromise(),
              (this._lastFlush = Date.now());
          }
          _resetPromise() {
            return (this._promise = new this.Promise(
              (t, s) => (this._resolve = t)
            ));
          }
          _flush() {
            return (
              clearTimeout(this._timeout),
              (this._lastFlush = Date.now()),
              this._resolve(),
              this.Events.trigger("batch", this._arr),
              (this._arr = []),
              this._resetPromise()
            );
          }
          add(t) {
            var s;
            return (
              this._arr.push(t),
              (s = this._promise),
              this._arr.length === this.maxSize
                ? this._flush()
                : this.maxTime != null &&
                  this._arr.length === 1 &&
                  (this._timeout = setTimeout(
                    () => this._flush(),
                    this.maxTime
                  )),
              s
            );
          }
        }
        return (
          (u.prototype.defaults = { maxTime: null, maxSize: null, Promise }), u
        );
      }.call(l));
    var $t = nt,
      xt = () =>
        console.log(
          "You must import the full version of Bottleneck in order to use this feature."
        ),
      Lt = a(Rt),
      ht,
      at,
      I,
      D,
      lt,
      $,
      ct,
      _t,
      dt,
      x,
      f,
      pt = [].splice;
    ($ = 10),
      (at = 5),
      (f = p),
      (ct = yt),
      (D = Et),
      (lt = bt),
      (_t = xt),
      (I = E),
      (dt = wt),
      (x = Ot),
      (ht = function () {
        class u {
          constructor(t = {}, ...s) {
            var r, i;
            (this._addToQueue = this._addToQueue.bind(this)),
              this._validateOptions(t, s),
              f.load(t, this.instanceDefaults, this),
              (this._queues = new ct($)),
              (this._scheduled = {}),
              (this._states = new dt(
                ["RECEIVED", "QUEUED", "RUNNING", "EXECUTING"].concat(
                  this.trackDoneStatus ? ["DONE"] : []
                )
              )),
              (this._limiter = null),
              (this.Events = new I(this)),
              (this._submitLock = new x("submit", this.Promise)),
              (this._registerLock = new x("register", this.Promise)),
              (i = f.load(t, this.storeDefaults, {})),
              (this._store = function () {
                if (
                  this.datastore === "redis" ||
                  this.datastore === "ioredis" ||
                  this.connection != null
                )
                  return (
                    (r = f.load(t, this.redisStoreDefaults, {})),
                    new _t(this, i, r)
                  );
                if (this.datastore === "local")
                  return (
                    (r = f.load(t, this.localStoreDefaults, {})),
                    new lt(this, i, r)
                  );
                throw new u.prototype.BottleneckError(
                  `Invalid datastore type: ${this.datastore}`
                );
              }.call(this)),
              this._queues.on("leftzero", () => {
                var n;
                return (n = this._store.heartbeat) != null &&
                  typeof n.ref == "function"
                  ? n.ref()
                  : void 0;
              }),
              this._queues.on("zero", () => {
                var n;
                return (n = this._store.heartbeat) != null &&
                  typeof n.unref == "function"
                  ? n.unref()
                  : void 0;
              });
          }
          _validateOptions(t, s) {
            if (!(t != null && typeof t == "object" && s.length === 0))
              throw new u.prototype.BottleneckError(
                "Bottleneck v2 takes a single object argument. Refer to https://github.com/SGrondin/bottleneck#upgrading-to-v2 if you're upgrading from Bottleneck v1."
              );
          }
          ready() {
            return this._store.ready;
          }
          clients() {
            return this._store.clients;
          }
          channel() {
            return `b_${this.id}`;
          }
          channel_client() {
            return `b_${this.id}_${this._store.clientId}`;
          }
          publish(t) {
            return this._store.__publish__(t);
          }
          disconnect(t = !0) {
            return this._store.__disconnect__(t);
          }
          chain(t) {
            return (this._limiter = t), this;
          }
          queued(t) {
            return this._queues.queued(t);
          }
          clusterQueued() {
            return this._store.__queued__();
          }
          empty() {
            return this.queued() === 0 && this._submitLock.isEmpty();
          }
          running() {
            return this._store.__running__();
          }
          done() {
            return this._store.__done__();
          }
          jobStatus(t) {
            return this._states.jobStatus(t);
          }
          jobs(t) {
            return this._states.statusJobs(t);
          }
          counts() {
            return this._states.statusCounts();
          }
          _randomIndex() {
            return Math.random().toString(36).slice(2);
          }
          check(t = 1) {
            return this._store.__check__(t);
          }
          _clearGlobalState(t) {
            return this._scheduled[t] != null
              ? (clearTimeout(this._scheduled[t].expiration),
                delete this._scheduled[t],
                !0)
              : !1;
          }
          async _free(t, s, r, i) {
            var n, o;
            try {
              if (
                (({ running: o } = await this._store.__free__(t, r.weight)),
                this.Events.trigger("debug", `Freed ${r.id}`, i),
                o === 0 && this.empty())
              )
                return this.Events.trigger("idle");
            } catch (h) {
              return (n = h), this.Events.trigger("error", n);
            }
          }
          _run(t, s, r) {
            var i, n, o;
            return (
              s.doRun(),
              (i = this._clearGlobalState.bind(this, t)),
              (o = this._run.bind(this, t, s)),
              (n = this._free.bind(this, t, s)),
              (this._scheduled[t] = {
                timeout: setTimeout(
                  () => s.doExecute(this._limiter, i, o, n),
                  r
                ),
                expiration:
                  s.options.expiration != null
                    ? setTimeout(function () {
                        return s.doExpire(i, o, n);
                      }, r + s.options.expiration)
                    : void 0,
                job: s,
              })
            );
          }
          _drainOne(t) {
            return this._registerLock.schedule(() => {
              var s, r, i, n, o;
              return this.queued() === 0
                ? this.Promise.resolve(null)
                : ((o = this._queues.getFirst()),
                  ({ options: n, args: s } = i = o.first()),
                  t != null && n.weight > t
                    ? this.Promise.resolve(null)
                    : (this.Events.trigger("debug", `Draining ${n.id}`, {
                        args: s,
                        options: n,
                      }),
                      (r = this._randomIndex()),
                      this._store
                        .__register__(r, n.weight, n.expiration)
                        .then(({ success: h, wait: c, reservoir: _ }) => {
                          var g;
                          return (
                            this.Events.trigger("debug", `Drained ${n.id}`, {
                              success: h,
                              args: s,
                              options: n,
                            }),
                            h
                              ? (o.shift(),
                                (g = this.empty()),
                                g && this.Events.trigger("empty"),
                                _ === 0 && this.Events.trigger("depleted", g),
                                this._run(r, i, c),
                                this.Promise.resolve(n.weight))
                              : this.Promise.resolve(null)
                          );
                        })));
            });
          }
          _drainAll(t, s = 0) {
            return this._drainOne(t)
              .then((r) => {
                var i;
                return r != null
                  ? ((i = t != null ? t - r : t), this._drainAll(i, s + r))
                  : this.Promise.resolve(s);
              })
              .catch((r) => this.Events.trigger("error", r));
          }
          _dropAllQueued(t) {
            return this._queues.shiftAll(function (s) {
              return s.doDrop({ message: t });
            });
          }
          stop(t = {}) {
            var s, r;
            return (
              (t = f.load(t, this.stopDefaults)),
              (r = (i) => {
                var n;
                return (
                  (n = () => {
                    var o;
                    return (
                      (o = this._states.counts), o[0] + o[1] + o[2] + o[3] === i
                    );
                  }),
                  new this.Promise((o, h) =>
                    n()
                      ? o()
                      : this.on("done", () => {
                          if (n()) return this.removeAllListeners("done"), o();
                        })
                  )
                );
              }),
              (s = t.dropWaitingJobs
                ? ((this._run = function (i, n) {
                    return n.doDrop({ message: t.dropErrorMessage });
                  }),
                  (this._drainOne = () => this.Promise.resolve(null)),
                  this._registerLock.schedule(() =>
                    this._submitLock.schedule(() => {
                      var i, n, o;
                      n = this._scheduled;
                      for (i in n)
                        (o = n[i]),
                          this.jobStatus(o.job.options.id) === "RUNNING" &&
                            (clearTimeout(o.timeout),
                            clearTimeout(o.expiration),
                            o.job.doDrop({ message: t.dropErrorMessage }));
                      return this._dropAllQueued(t.dropErrorMessage), r(0);
                    })
                  ))
                : this.schedule({ priority: $ - 1, weight: 0 }, () => r(1))),
              (this._receive = function (i) {
                return i._reject(
                  new u.prototype.BottleneckError(t.enqueueErrorMessage)
                );
              }),
              (this.stop = () =>
                this.Promise.reject(
                  new u.prototype.BottleneckError(
                    "stop() has already been called"
                  )
                )),
              s
            );
          }
          async _addToQueue(t) {
            var s, r, i, n, o, h, c;
            ({ args: s, options: n } = t);
            try {
              ({
                reachedHWM: o,
                blocked: r,
                strategy: c,
              } = await this._store.__submit__(this.queued(), n.weight));
            } catch (_) {
              return (
                (i = _),
                this.Events.trigger("debug", `Could not queue ${n.id}`, {
                  args: s,
                  options: n,
                  error: i,
                }),
                t.doDrop({ error: i }),
                !1
              );
            }
            return r
              ? (t.doDrop(), !0)
              : o &&
                ((h =
                  c === u.prototype.strategy.LEAK
                    ? this._queues.shiftLastFrom(n.priority)
                    : c === u.prototype.strategy.OVERFLOW_PRIORITY
                    ? this._queues.shiftLastFrom(n.priority + 1)
                    : c === u.prototype.strategy.OVERFLOW
                    ? t
                    : void 0),
                h?.doDrop(),
                h == null || c === u.prototype.strategy.OVERFLOW)
              ? (h == null && t.doDrop(), o)
              : (t.doQueue(o, r),
                this._queues.push(t),
                await this._drainAll(),
                o);
          }
          _receive(t) {
            return this._states.jobStatus(t.options.id) != null
              ? (t._reject(
                  new u.prototype.BottleneckError(
                    `A job with the same id already exists (id=${t.options.id})`
                  )
                ),
                !1)
              : (t.doReceive(), this._submitLock.schedule(this._addToQueue, t));
          }
          submit(...t) {
            var s, r, i, n, o, h, c;
            return (
              typeof t[0] == "function"
                ? ((o = t),
                  ([r, ...t] = o),
                  ([s] = pt.call(t, -1)),
                  (n = f.load({}, this.jobDefaults)))
                : ((h = t),
                  ([n, r, ...t] = h),
                  ([s] = pt.call(t, -1)),
                  (n = f.load(n, this.jobDefaults))),
              (c = (..._) =>
                new this.Promise(function (g, St) {
                  return r(..._, function (...vt) {
                    return (vt[0] != null ? St : g)(vt);
                  });
                })),
              (i = new D(
                c,
                t,
                n,
                this.jobDefaults,
                this.rejectOnDrop,
                this.Events,
                this._states,
                this.Promise
              )),
              i.promise
                .then(function (_) {
                  return typeof s == "function" ? s(..._) : void 0;
                })
                .catch(function (_) {
                  return Array.isArray(_)
                    ? typeof s == "function"
                      ? s(..._)
                      : void 0
                    : typeof s == "function"
                    ? s(_)
                    : void 0;
                }),
              this._receive(i)
            );
          }
          schedule(...t) {
            var s, r, i;
            return (
              typeof t[0] == "function"
                ? (([i, ...t] = t), (r = {}))
                : ([r, i, ...t] = t),
              (s = new D(
                i,
                t,
                r,
                this.jobDefaults,
                this.rejectOnDrop,
                this.Events,
                this._states,
                this.Promise
              )),
              this._receive(s),
              s.promise
            );
          }
          wrap(t) {
            var s, r;
            return (
              (s = this.schedule.bind(this)),
              (r = function (...i) {
                return s(t.bind(this), ...i);
              }),
              (r.withOptions = function (i, ...n) {
                return s(i, t, ...n);
              }),
              r
            );
          }
          async updateSettings(t = {}) {
            return (
              await this._store.__updateSettings__(
                f.overwrite(t, this.storeDefaults)
              ),
              f.overwrite(t, this.instanceDefaults, this),
              this
            );
          }
          currentReservoir() {
            return this._store.__currentReservoir__();
          }
          incrementReservoir(t = 0) {
            return this._store.__incrementReservoir__(t);
          }
        }
        return (
          (u.default = u),
          (u.Events = I),
          (u.version = u.prototype.version = Lt.version),
          (u.strategy = u.prototype.strategy =
            { LEAK: 1, OVERFLOW: 2, OVERFLOW_PRIORITY: 4, BLOCK: 3 }),
          (u.BottleneckError = u.prototype.BottleneckError = b),
          (u.Group = u.prototype.Group = Dt),
          (u.RedisConnection = u.prototype.RedisConnection = X),
          (u.IORedisConnection = u.prototype.IORedisConnection = Z),
          (u.Batcher = u.prototype.Batcher = $t),
          (u.prototype.jobDefaults = {
            priority: at,
            weight: 1,
            expiration: null,
            id: "<no-id>",
          }),
          (u.prototype.storeDefaults = {
            maxConcurrent: null,
            minTime: 0,
            highWater: null,
            strategy: u.prototype.strategy.LEAK,
            penalty: null,
            reservoir: null,
            reservoirRefreshInterval: null,
            reservoirRefreshAmount: null,
            reservoirIncreaseInterval: null,
            reservoirIncreaseAmount: null,
            reservoirIncreaseMaximum: null,
          }),
          (u.prototype.localStoreDefaults = {
            Promise,
            timeout: null,
            heartbeatInterval: 250,
          }),
          (u.prototype.redisStoreDefaults = {
            Promise,
            timeout: null,
            heartbeatInterval: 5e3,
            clientTimeout: 1e4,
            Redis: null,
            clientOptions: {},
            clusterNodes: null,
            clearDatastore: !1,
            connection: null,
          }),
          (u.prototype.instanceDefaults = {
            datastore: "local",
            connection: null,
            id: "<no-id>",
            rejectOnDrop: !0,
            trackDoneStatus: !1,
            Promise,
          }),
          (u.prototype.stopDefaults = {
            enqueueErrorMessage:
              "This limiter has been stopped and cannot accept new jobs.",
            dropWaitingJobs: !0,
            dropErrorMessage: "This limiter has been stopped.",
          }),
          u
        );
      }.call(l));
    var ft = ht,
      Ct = ft;
    return Ct;
  });
});
var v = {};
Nt(v, { default: () => Mt });
var Ft = mt(j());
m(v, mt(j()));
var { default: gt, ...Gt } = Ft,
  Mt = gt !== void 0 ? gt : Gt;
export { Mt as default };
//# sourceMappingURL=light.js.map
