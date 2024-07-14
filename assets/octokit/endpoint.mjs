/* esm.sh - esbuild bundle(@octokit/endpoint@10.1.0) es2022 production */
import { getUserAgent as U } from "./universal-user-agent.mjs";
var A = "0.0.0-development",
  $ = `octokit-endpoint.js/${A} ${U()}`,
  E = {
    method: "GET",
    baseUrl: "https://api.github.com",
    headers: { accept: "application/vnd.github.v3+json", "user-agent": $ },
    mediaType: { format: "" },
  };
function q(e) {
  return e
    ? Object.keys(e).reduce((t, n) => ((t[n.toLowerCase()] = e[n]), t), {})
    : {};
}
function C(e) {
  if (
    typeof e != "object" ||
    e === null ||
    Object.prototype.toString.call(e) !== "[object Object]"
  )
    return !1;
  let t = Object.getPrototypeOf(e);
  if (t === null) return !0;
  let n =
    Object.prototype.hasOwnProperty.call(t, "constructor") && t.constructor;
  return (
    typeof n == "function" &&
    n instanceof n &&
    Function.prototype.call(n) === Function.prototype.call(e)
  );
}
function b(e, t) {
  let n = Object.assign({}, e);
  return (
    Object.keys(t).forEach((i) => {
      C(t[i])
        ? i in e
          ? (n[i] = b(e[i], t[i]))
          : Object.assign(n, { [i]: t[i] })
        : Object.assign(n, { [i]: t[i] });
    }),
    n
  );
}
function g(e) {
  for (let t in e) e[t] === void 0 && delete e[t];
  return e;
}
function h(e, t, n) {
  if (typeof t == "string") {
    let [r, s] = t.split(" ");
    n = Object.assign(s ? { method: r, url: s } : { url: r }, n);
  } else n = Object.assign({}, t);
  (n.headers = q(n.headers)), g(n), g(n.headers);
  let i = b(e || {}, n);
  return (
    n.url === "/graphql" &&
      (e &&
        e.mediaType.previews?.length &&
        (i.mediaType.previews = e.mediaType.previews
          .filter((r) => !i.mediaType.previews.includes(r))
          .concat(i.mediaType.previews)),
      (i.mediaType.previews = (i.mediaType.previews || []).map((r) =>
        r.replace(/-preview/, "")
      ))),
    i
  );
}
function D(e, t) {
  let n = /\?/.test(e) ? "&" : "?",
    i = Object.keys(t);
  return i.length === 0
    ? e
    : e +
        n +
        i
          .map((r) =>
            r === "q"
              ? "q=" + t.q.split("+").map(encodeURIComponent).join("+")
              : `${r}=${encodeURIComponent(t[r])}`
          )
          .join("&");
}
var P = /\{[^}]+\}/g;
function R(e) {
  return e.replace(/^\W+|\W+$/g, "").split(/,/);
}
function F(e) {
  let t = e.match(P);
  return t ? t.map(R).reduce((n, i) => n.concat(i), []) : [];
}
function y(e, t) {
  let n = { __proto__: null };
  for (let i of Object.keys(e)) t.indexOf(i) === -1 && (n[i] = e[i]);
  return n;
}
function j(e) {
  return e
    .split(/(%[0-9A-Fa-f]{2})/g)
    .map(function (t) {
      return (
        /%[0-9A-Fa-f]/.test(t) ||
          (t = encodeURI(t).replace(/%5B/g, "[").replace(/%5D/g, "]")),
        t
      );
    })
    .join("");
}
function o(e) {
  return encodeURIComponent(e).replace(/[!'()*]/g, function (t) {
    return "%" + t.charCodeAt(0).toString(16).toUpperCase();
  });
}
function p(e, t, n) {
  return (t = e === "+" || e === "#" ? j(t) : o(t)), n ? o(n) + "=" + t : t;
}
function l(e) {
  return e != null;
}
function d(e) {
  return e === ";" || e === "&" || e === "?";
}
function S(e, t, n, i) {
  var r = e[n],
    s = [];
  if (l(r) && r !== "")
    if (typeof r == "string" || typeof r == "number" || typeof r == "boolean")
      (r = r.toString()),
        i && i !== "*" && (r = r.substring(0, parseInt(i, 10))),
        s.push(p(t, r, d(t) ? n : ""));
    else if (i === "*")
      Array.isArray(r)
        ? r.filter(l).forEach(function (c) {
            s.push(p(t, c, d(t) ? n : ""));
          })
        : Object.keys(r).forEach(function (c) {
            l(r[c]) && s.push(p(t, r[c], c));
          });
    else {
      let c = [];
      Array.isArray(r)
        ? r.filter(l).forEach(function (a) {
            c.push(p(t, a));
          })
        : Object.keys(r).forEach(function (a) {
            l(r[a]) && (c.push(o(a)), c.push(p(t, r[a].toString())));
          }),
        d(t)
          ? s.push(o(n) + "=" + c.join(","))
          : c.length !== 0 && s.push(c.join(","));
    }
  else
    t === ";"
      ? l(r) && s.push(o(n))
      : r === "" && (t === "&" || t === "?")
      ? s.push(o(n) + "=")
      : r === "" && s.push("");
  return s;
}
function I(e) {
  return { expand: V.bind(null, e) };
}
function V(e, t) {
  var n = ["+", "#", ".", "/", ";", "?", "&"];
  return (
    (e = e.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (i, r, s) {
      if (r) {
        let a = "",
          u = [];
        if (
          (n.indexOf(r.charAt(0)) !== -1 &&
            ((a = r.charAt(0)), (r = r.substr(1))),
          r.split(/,/g).forEach(function (m) {
            var f = /([^:\*]*)(?::(\d+)|(\*))?/.exec(m);
            u.push(S(t, a, f[1], f[2] || f[3]));
          }),
          a && a !== "+")
        ) {
          var c = ",";
          return (
            a === "?" ? (c = "&") : a !== "#" && (c = a),
            (u.length !== 0 ? a : "") + u.join(c)
          );
        } else return u.join(",");
      } else return j(s);
    })),
    e === "/" ? e : e.replace(/\/$/, "")
  );
}
function v(e) {
  let t = e.method.toUpperCase(),
    n = (e.url || "/").replace(/:([a-z]\w+)/g, "{$1}"),
    i = Object.assign({}, e.headers),
    r,
    s = y(e, ["method", "baseUrl", "url", "headers", "request", "mediaType"]),
    c = F(n);
  (n = I(n).expand(s)), /^http/.test(n) || (n = e.baseUrl + n);
  let a = Object.keys(e)
      .filter((f) => c.includes(f))
      .concat("baseUrl"),
    u = y(s, a);
  if (
    !/application\/octet-stream/i.test(i.accept) &&
    (e.mediaType.format &&
      (i.accept = i.accept
        .split(/,/)
        .map((f) =>
          f.replace(
            /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
            `application/vnd$1$2.${e.mediaType.format}`
          )
        )
        .join(",")),
    n.endsWith("/graphql") && e.mediaType.previews?.length)
  ) {
    let f = i.accept.match(/[\w-]+(?=-preview)/g) || [];
    i.accept = f
      .concat(e.mediaType.previews)
      .map((T) => {
        let w = e.mediaType.format ? `.${e.mediaType.format}` : "+json";
        return `application/vnd.github.${T}-preview${w}`;
      })
      .join(",");
  }
  return (
    ["GET", "HEAD"].includes(t)
      ? (n = D(n, u))
      : "data" in u
      ? (r = u.data)
      : Object.keys(u).length && (r = u),
    !i["content-type"] &&
      typeof r < "u" &&
      (i["content-type"] = "application/json; charset=utf-8"),
    ["PATCH", "PUT"].includes(t) && typeof r > "u" && (r = ""),
    Object.assign(
      { method: t, url: n, headers: i },
      typeof r < "u" ? { body: r } : null,
      e.request ? { request: e.request } : null
    )
  );
}
function _(e, t, n) {
  return v(h(e, t, n));
}
function O(e, t) {
  let n = h(e, t),
    i = _.bind(null, n);
  return Object.assign(i, {
    DEFAULTS: n,
    defaults: O.bind(null, n),
    merge: h.bind(null, n),
    parse: v,
  });
}
var L = O(null, E);
export { L as endpoint };
//# sourceMappingURL=endpoint.mjs.map
