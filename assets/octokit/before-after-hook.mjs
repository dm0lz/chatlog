/* esm.sh - esbuild bundle(before-after-hook@3.0.2) es2022 production */
function f(e, r, n, i) {
  if (typeof n != "function")
    throw new Error("method for before hook must be a function");
  return (
    i || (i = {}),
    Array.isArray(r)
      ? r.reverse().reduce((o, t) => f.bind(null, e, t, o, i), n)()
      : Promise.resolve().then(() =>
          e.registry[r]
            ? e.registry[r].reduce((o, t) => t.hook.bind(null, o, i), n)()
            : n(i)
        )
  );
}
function c(e, r, n, i) {
  let o = i;
  e.registry[n] || (e.registry[n] = []),
    r === "before" &&
      (i = (t, u) =>
        Promise.resolve().then(o.bind(null, u)).then(t.bind(null, u))),
    r === "after" &&
      (i = (t, u) => {
        let l;
        return Promise.resolve()
          .then(t.bind(null, u))
          .then((d) => ((l = d), o(l, u)))
          .then(() => l);
      }),
    r === "error" &&
      (i = (t, u) =>
        Promise.resolve()
          .then(t.bind(null, u))
          .catch((l) => o(l, u))),
    e.registry[n].push({ hook: i, orig: o });
}
function s(e, r, n) {
  if (!e.registry[r]) return;
  let i = e.registry[r].map((o) => o.orig).indexOf(n);
  i !== -1 && e.registry[r].splice(i, 1);
}
var g = Function.bind,
  b = g.bind(g);
function y(e, r, n) {
  let i = b(s, null).apply(null, n ? [r, n] : [r]);
  (e.api = { remove: i }),
    (e.remove = i),
    ["before", "error", "after", "wrap"].forEach((o) => {
      let t = n ? [r, o, n] : [r, o];
      e[o] = e.api[o] = b(c, null).apply(null, t);
    });
}
function p() {
  let e = Symbol("Singular"),
    r = { registry: {} },
    n = f.bind(null, r, e);
  return y(n, r, e), n;
}
function v() {
  let e = { registry: {} },
    r = f.bind(null, e);
  return y(r, e), r;
}
var S = { Singular: p, Collection: v };
export { S as default };
//# sourceMappingURL=before-after-hook.mjs.map
