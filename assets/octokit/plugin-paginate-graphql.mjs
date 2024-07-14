/* esm.sh - esbuild bundle(@octokit/plugin-paginate-graphql@5.2.2) es2022 production */
var P = (r, e) =>
    `The cursor at "${r.join(
      ","
    )}" did not change its value "${e}" after a page transition. Please make sure your that your query is set up correctly.`,
  y = class extends Error {
    constructor(r, e) {
      super(P(r.pathInQuery, e)),
        (this.pageInfo = r),
        (this.cursorValue = e),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, this.constructor);
    }
    name = "MissingCursorChangeError";
  },
  d = class extends Error {
    constructor(r) {
      super(
        `No pageInfo property found in response. Please make sure to specify the pageInfo in your query. Response-Data: ${JSON.stringify(
          r,
          null,
          2
        )}`
      ),
        (this.response = r),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, this.constructor);
    }
    name = "MissingPageInfo";
  },
  v = (r) => Object.prototype.toString.call(r) === "[object Object]";
function h(r) {
  let e = f(r, "pageInfo");
  if (e.length === 0) throw new d(r);
  return e;
}
var f = (r, e, n = []) => {
    for (let t of Object.keys(r)) {
      let a = [...n, t],
        s = r[t];
      if (s.hasOwnProperty(e)) return a;
      if (v(s)) {
        let o = f(s, e, a);
        if (o.length > 0) return o;
      }
    }
    return [];
  },
  u = (r, e) => e.reduce((n, t) => n[t], r),
  g = (r, e, n) => {
    let t = e[e.length - 1],
      a = [...e].slice(0, -1),
      s = u(r, a);
    typeof n == "function" ? (s[t] = n(s[t])) : (s[t] = n);
  },
  I = (r) => {
    let e = h(r);
    return { pathInQuery: e, pageInfo: u(r, [...e, "pageInfo"]) };
  },
  p = (r) => r.hasOwnProperty("hasNextPage"),
  O = (r) => (p(r) ? r.endCursor : r.startCursor),
  w = (r) => (p(r) ? r.hasNextPage : r.hasPreviousPage),
  l =
    (r) =>
    (e, n = {}) => {
      let t = !0,
        a = { ...n };
      return {
        [Symbol.asyncIterator]: () => ({
          async next() {
            if (!t) return { done: !0, value: {} };
            let s = await r.graphql(e, a),
              o = I(s),
              c = O(o.pageInfo);
            if (((t = w(o.pageInfo)), t && c === a.cursor)) throw new y(o, c);
            return (a = { ...a, cursor: c }), { done: !1, value: s };
          },
        }),
      };
    },
  x = (r, e) => {
    if (Object.keys(r).length === 0) return Object.assign(r, e);
    let n = h(r),
      t = [...n, "nodes"],
      a = u(e, t);
    a && g(r, t, (i) => [...i, ...a]);
    let s = [...n, "edges"],
      o = u(e, s);
    o && g(r, s, (i) => [...i, ...o]);
    let c = [...n, "pageInfo"];
    return g(r, c, u(e, c)), r;
  },
  E = (r) => {
    let e = l(r);
    return async (n, t = {}) => {
      let a = {};
      for await (let s of e(n, t)) a = x(a, s);
      return a;
    };
  },
  b = "0.0.0-development";
function j(r) {
  return {
    graphql: Object.assign(r.graphql, {
      paginate: Object.assign(E(r), { iterator: l(r) }),
    }),
  };
}
export { b as VERSION, j as paginateGraphQL };
//# sourceMappingURL=plugin-paginate-graphql.mjs.map
