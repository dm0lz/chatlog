/* esm.sh - esbuild bundle(@octokit/request@9.1.1) es2022 production */
import { endpoint as m } from "./endpoint.mjs";
import { getUserAgent as y } from "./universal-user-agent.mjs";
import { RequestError as u } from "./request-error.mjs";
var g = "0.0.0-development";
function b(e) {
  if (
    typeof e != "object" ||
    e === null ||
    Object.prototype.toString.call(e) !== "[object Object]"
  )
    return !1;
  let r = Object.getPrototypeOf(e);
  if (r === null) return !0;
  let o =
    Object.prototype.hasOwnProperty.call(r, "constructor") && r.constructor;
  return (
    typeof o == "function" &&
    o instanceof o &&
    Function.prototype.call(o) === Function.prototype.call(e)
  );
}
function p(e) {
  return e.arrayBuffer();
}
function h(e) {
  let r = e.request && e.request.log ? e.request.log : console,
    o = e.request?.parseSuccessResponseBody !== !1;
  (b(e.body) || Array.isArray(e.body)) && (e.body = JSON.stringify(e.body));
  let i = {},
    c,
    a,
    { fetch: s } = globalThis;
  if ((e.request?.fetch && (s = e.request.fetch), !s))
    throw new Error(
      "fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing"
    );
  return s(e.url, {
    method: e.method,
    body: e.body,
    redirect: e.request?.redirect,
    headers: Object.fromEntries(
      Object.entries(e.headers).map(([t, n]) => [t, String(n)])
    ),
    signal: e.request?.signal,
    ...(e.body && { duplex: "half" }),
  })
    .then(async (t) => {
      (a = t.url), (c = t.status);
      for (let n of t.headers) i[n[0]] = n[1];
      if ("deprecation" in i) {
        let n = i.link && i.link.match(/<([^>]+)>; rel="deprecation"/),
          f = n && n.pop();
        r.warn(
          `[@octokit/request] "${e.method} ${
            e.url
          }" is deprecated. It is scheduled to be removed on ${i.sunset}${
            f ? `. See ${f}` : ""
          }`
        );
      }
      if (!(c === 204 || c === 205)) {
        if (e.method === "HEAD") {
          if (c < 400) return;
          throw new u(t.statusText, c, {
            response: { url: a, status: c, headers: i, data: void 0 },
            request: e,
          });
        }
        if (c === 304)
          throw new u("Not modified", c, {
            response: { url: a, status: c, headers: i, data: await l(t) },
            request: e,
          });
        if (c >= 400) {
          let n = await l(t);
          throw new u(w(n), c, {
            response: { url: a, status: c, headers: i, data: n },
            request: e,
          });
        }
        return o ? await l(t) : t.body;
      }
    })
    .then((t) => ({ status: c, url: a, headers: i, data: t }))
    .catch((t) => {
      if (t instanceof u) throw t;
      if (t.name === "AbortError") throw t;
      let n = t.message;
      throw (
        (t.name === "TypeError" &&
          "cause" in t &&
          (t.cause instanceof Error
            ? (n = t.cause.message)
            : typeof t.cause == "string" && (n = t.cause)),
        new u(n, 500, { request: e }))
      );
    });
}
async function l(e) {
  let r = e.headers.get("content-type");
  return /application\/json/.test(r)
    ? e
        .json()
        .catch(() => e.text())
        .catch(() => "")
    : !r || /^text\/|charset=utf-8$/.test(r)
    ? e.text()
    : p(e);
}
function w(e) {
  if (typeof e == "string") return e;
  let r;
  return (
    "documentation_url" in e ? (r = ` - ${e.documentation_url}`) : (r = ""),
    "message" in e
      ? Array.isArray(e.errors)
        ? `${e.message}: ${e.errors.map(JSON.stringify).join(", ")}${r}`
        : `${e.message}${r}`
      : `Unknown error: ${JSON.stringify(e)}`
  );
}
function d(e, r) {
  let o = e.defaults(r);
  return Object.assign(
    function (c, a) {
      let s = o.merge(c, a);
      if (!s.request || !s.request.hook) return h(o.parse(s));
      let t = (n, f) => h(o.parse(o.merge(n, f)));
      return (
        Object.assign(t, { endpoint: o, defaults: d.bind(null, o) }),
        s.request.hook(t, s)
      );
    },
    { endpoint: o, defaults: d.bind(null, o) }
  );
}
var A = d(m, { headers: { "user-agent": `octokit-request.js/${g} ${y()}` } });
export { A as request };
//# sourceMappingURL=request.mjs.map
