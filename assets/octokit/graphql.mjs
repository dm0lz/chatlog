/* esm.sh - esbuild bundle(@octokit/graphql@8.1.0) es2022 production */
import { request as l } from "./request.mjs";
import { getUserAgent as h } from "./universal-user-agent.mjs";
import "./request.mjs";
import "./request.mjs";
var p = "0.0.0-development";
function f(t) {
  return (
    `Request failed due to following response errors:
    ` +
    t.errors.map((a) => ` - ${a.message}`).join(`
    `)
  );
}
var m = class extends Error {
    constructor(t, a, e) {
      super(f(e)),
        (this.request = t),
        (this.headers = a),
        (this.response = e),
        (this.errors = e.errors),
        (this.data = e.data),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, this.constructor);
    }
    name = "GraphqlResponseError";
    errors;
    data;
  },
  q = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"],
  g = ["query", "method", "url"],
  d = /\/api\/v3\/?$/;
function b(t, a, e) {
  if (e) {
    if (typeof a == "string" && "query" in e)
      return Promise.reject(
        new Error('[@octokit/graphql] "query" cannot be used as variable name')
      );
    for (let r in e)
      if (g.includes(r))
        return Promise.reject(
          new Error(`[@octokit/graphql] "${r}" cannot be used as variable name`)
        );
  }
  let n = typeof a == "string" ? Object.assign({ query: a }, e) : a,
    o = Object.keys(n).reduce(
      (r, s) =>
        q.includes(s)
          ? ((r[s] = n[s]), r)
          : (r.variables || (r.variables = {}), (r.variables[s] = n[s]), r),
      {}
    ),
    i = n.baseUrl || t.endpoint.DEFAULTS.baseUrl;
  return (
    d.test(i) && (o.url = i.replace(d, "/api/graphql")),
    t(o).then((r) => {
      if (r.data.errors) {
        let s = {};
        for (let c of Object.keys(r.headers)) s[c] = r.headers[c];
        throw new m(o, s, r.data);
      }
      return r.data.data;
    })
  );
}
function u(t, a) {
  let e = t.defaults(a);
  return Object.assign((o, i) => b(e, o, i), {
    defaults: u.bind(null, e),
    endpoint: e.endpoint,
  });
}
var j = u(l, {
  headers: { "user-agent": `octokit-graphql.js/${p} ${h()}` },
  method: "POST",
  url: "/graphql",
});
function A(t) {
  return u(t, { method: "POST", url: "/graphql" });
}
export { m as GraphqlResponseError, j as graphql, A as withCustomRequest };
//# sourceMappingURL=graphql.mjs.map
