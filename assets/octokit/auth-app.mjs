/* esm.sh - esbuild bundle(@octokit/auth-app@7.0.0) es2022 production */
import { getUserAgent as R } from "./universal-user-agent.mjs";
import { request as O } from "./request.mjs";
import { createOAuthAppAuth as D } from "./auth-oauth-app.mjs";
import F from "./universal-github-app-jwt.mjs";
import { LRUCache as q } from "./lru-cache.mjs";
import { requiresBasicAuth as M } from "./auth-oauth-user.mjs";
import "./request-error.mjs";
import { createOAuthUserAuth as re } from "./auth-oauth-user.mjs";
async function d({ appId: e, privateKey: t, timeDifference: a }) {
  try {
    let i = await F({
      id: +e,
      privateKey: t,
      now: a && Math.floor(Date.now() / 1e3) + a,
    });
    return {
      type: "app",
      token: i.token,
      appId: i.appId,
      expiresAt: new Date(i.expiration * 1e3).toISOString(),
    };
  } catch (i) {
    throw t === "-----BEGIN RSA PRIVATE KEY-----"
      ? new Error(
          "The 'privateKey` option contains only the first line '-----BEGIN RSA PRIVATE KEY-----'. If you are setting it using a `.env` file, make sure it is set on a single line with newlines replaced by '\n'"
        )
      : i;
  }
}
function P() {
  return new q({ max: 15e3, ttl: 1e3 * 60 * 59 });
}
async function z(e, t) {
  let a = _(t),
    i = await e.get(a);
  if (!i) return;
  let [n, o, r, s, p, l] = i.split("|"),
    c =
      t.permissions ||
      p
        .split(/,/)
        .reduce(
          (u, h) => (
            /!$/.test(h) ? (u[h.slice(0, -1)] = "write") : (u[h] = "read"), u
          ),
          {}
        );
  return {
    token: n,
    createdAt: o,
    expiresAt: r,
    permissions: c,
    repositoryIds: t.repositoryIds,
    repositoryNames: t.repositoryNames,
    singleFileName: l,
    repositorySelection: s,
  };
}
async function K(e, t, a) {
  let i = _(t),
    n = t.permissions
      ? ""
      : Object.keys(a.permissions)
          .map((r) => `${r}${a.permissions[r] === "write" ? "!" : ""}`)
          .join(","),
    o = [
      a.token,
      a.createdAt,
      a.expiresAt,
      a.repositorySelection,
      n,
      a.singleFileName,
    ].join("|");
  await e.set(i, o);
}
function _({
  installationId: e,
  permissions: t = {},
  repositoryIds: a = [],
  repositoryNames: i = [],
}) {
  let n = Object.keys(t)
      .sort()
      .map((s) => (t[s] === "read" ? s : `${s}!`))
      .join(","),
    o = a.sort().join(","),
    r = i.join(",");
  return [e, o, r, n].filter(Boolean).join("|");
}
function S({
  installationId: e,
  token: t,
  createdAt: a,
  expiresAt: i,
  repositorySelection: n,
  permissions: o,
  repositoryIds: r,
  repositoryNames: s,
  singleFileName: p,
}) {
  return Object.assign(
    {
      type: "token",
      tokenType: "installation",
      token: t,
      installationId: e,
      permissions: o,
      createdAt: a,
      expiresAt: i,
      repositorySelection: n,
    },
    r ? { repositoryIds: r } : null,
    s ? { repositoryNames: s } : null,
    p ? { singleFileName: p } : null
  );
}
async function E(e, t, a) {
  let i = Number(t.installationId || e.installationId);
  if (!i)
    throw new Error(
      "[@octokit/auth-app] installationId option is required for installation authentication."
    );
  if (t.factory) {
    let { type: m, factory: f, oauthApp: b, ...y } = { ...e, ...t };
    return f(y);
  }
  let n = Object.assign({ installationId: i }, t);
  if (!t.refresh) {
    let m = await z(e.cache, n);
    if (m) {
      let {
        token: f,
        createdAt: b,
        expiresAt: y,
        permissions: $,
        repositoryIds: v,
        repositoryNames: x,
        singleFileName: j,
        repositorySelection: T,
      } = m;
      return S({
        installationId: i,
        token: f,
        createdAt: b,
        expiresAt: y,
        permissions: $,
        repositorySelection: T,
        repositoryIds: v,
        repositoryNames: x,
        singleFileName: j,
      });
    }
  }
  let o = await d(e),
    r = a || e.request,
    {
      data: {
        token: s,
        expires_at: p,
        repositories: l,
        permissions: c,
        repository_selection: u,
        single_file: h,
      },
    } = await r("POST /app/installations/{installation_id}/access_tokens", {
      installation_id: i,
      repository_ids: t.repositoryIds,
      repositories: t.repositoryNames,
      permissions: t.permissions,
      mediaType: { previews: ["machine-man"] },
      headers: { authorization: `bearer ${o.token}` },
    }),
    w = c || {},
    g = u || "all",
    k = l ? l.map((m) => m.id) : void 0,
    A = l ? l.map((m) => m.name) : void 0,
    I = new Date().toISOString();
  return (
    await K(e.cache, n, {
      token: s,
      createdAt: I,
      expiresAt: p,
      repositorySelection: g,
      permissions: w,
      repositoryIds: k,
      repositoryNames: A,
      singleFileName: h,
    }),
    S({
      installationId: i,
      token: s,
      createdAt: I,
      expiresAt: p,
      repositorySelection: g,
      permissions: w,
      repositoryIds: k,
      repositoryNames: A,
      singleFileName: h,
    })
  );
}
async function C(e, t) {
  switch (t.type) {
    case "app":
      return d(e);
    case "oauth-app":
      return e.oauthApp({ type: "oauth-app" });
    case "installation":
      return E(e, { ...t, type: "installation" });
    case "oauth-user":
      return e.oauthApp(t);
    default:
      throw new Error(`Invalid auth type: ${t.type}`);
  }
}
var U = [
  "/app",
  "/app/hook/config",
  "/app/hook/deliveries",
  "/app/hook/deliveries/{delivery_id}",
  "/app/hook/deliveries/{delivery_id}/attempts",
  "/app/installations",
  "/app/installations/{installation_id}",
  "/app/installations/{installation_id}/access_tokens",
  "/app/installations/{installation_id}/suspended",
  "/app/installation-requests",
  "/marketplace_listing/accounts/{account_id}",
  "/marketplace_listing/plan",
  "/marketplace_listing/plans",
  "/marketplace_listing/plans/{plan_id}/accounts",
  "/marketplace_listing/stubbed/accounts/{account_id}",
  "/marketplace_listing/stubbed/plan",
  "/marketplace_listing/stubbed/plans",
  "/marketplace_listing/stubbed/plans/{plan_id}/accounts",
  "/orgs/{org}/installation",
  "/repos/{owner}/{repo}/installation",
  "/users/{username}/installation",
];
function B(e) {
  let a = `^(?:${e
    .map((i) =>
      i
        .split("/")
        .map((n) => (n.startsWith("{") ? "(?:.+?)" : n))
        .join("/")
    )
    .map((i) => `(?:${i})`)
    .join("|")})$`;
  return new RegExp(a, "i");
}
var G = B(U);
function V(e) {
  return !!e && G.test(e.split("?")[0]);
}
var W = 5 * 1e3;
function H(e) {
  return !(
    e.message.match(
      /'Expiration time' claim \('exp'\) must be a numeric value representing the future time at which the assertion expires/
    ) ||
    e.message.match(
      /'Issued at' claim \('iat'\) must be an Integer representing the time that the assertion was issued/
    )
  );
}
async function L(e, t, a, i) {
  let n = t.endpoint.merge(a, i),
    o = n.url;
  if (/\/login\/oauth\/access_token$/.test(o)) return t(n);
  if (V(o.replace(t.endpoint.DEFAULTS.baseUrl, ""))) {
    let { token: p } = await d(e);
    n.headers.authorization = `bearer ${p}`;
    let l;
    try {
      l = await t(n);
    } catch (c) {
      if (H(c) || typeof c.response.headers.date > "u") throw c;
      let u = Math.floor(
        (Date.parse(c.response.headers.date) -
          Date.parse(new Date().toString())) /
          1e3
      );
      e.log.warn(c.message),
        e.log.warn(
          `[@octokit/auth-app] GitHub API time and system time are different by ${u} seconds. Retrying request with the difference accounted for.`
        );
      let { token: h } = await d({ ...e, timeDifference: u });
      return (n.headers.authorization = `bearer ${h}`), t(n);
    }
    return l;
  }
  if (M(o)) {
    let p = await e.oauthApp({ type: "oauth-app" });
    return (n.headers.authorization = p.headers.authorization), t(n);
  }
  let { token: r, createdAt: s } = await E(e, {}, t);
  return (n.headers.authorization = `token ${r}`), N(e, t, n, s);
}
async function N(e, t, a, i, n = 0) {
  let o = +new Date() - +new Date(i);
  try {
    return await t(a);
  } catch (r) {
    if (r.status !== 401) throw r;
    if (o >= W)
      throw (
        (n > 0 &&
          (r.message = `After ${n} retries within ${
            o / 1e3
          }s of creating the installation access token, the response remains 401. At this point, the cause may be an authentication problem or a system outage. Please check https://www.githubstatus.com for status information`),
        r)
      );
    ++n;
    let s = n * 1e3;
    return (
      e.log.warn(
        `[@octokit/auth-app] Retrying after 401 response to account for token replication delay (retry: ${n}, wait: ${
          s / 1e3
        }s)`
      ),
      await new Promise((p) => setTimeout(p, s)),
      N(e, t, a, i, n)
    );
  }
}
var Y = "7.0.0";
function oe(e) {
  if (!e.appId) throw new Error("[@octokit/auth-app] appId option is required");
  if (!Number.isFinite(+e.appId))
    throw new Error(
      "[@octokit/auth-app] appId option must be a number or numeric string"
    );
  if (!e.privateKey)
    throw new Error("[@octokit/auth-app] privateKey option is required");
  if ("installationId" in e && !e.installationId)
    throw new Error(
      "[@octokit/auth-app] installationId is set to a falsy value"
    );
  let t = Object.assign({ warn: console.warn.bind(console) }, e.log),
    a =
      e.request ||
      O.defaults({
        headers: { "user-agent": `octokit-auth-app.js/${Y} ${R()}` },
      }),
    i = Object.assign(
      { request: a, cache: P() },
      e,
      e.installationId ? { installationId: Number(e.installationId) } : {},
      {
        log: t,
        oauthApp: D({
          clientType: "github-app",
          clientId: e.clientId || "",
          clientSecret: e.clientSecret || "",
          request: a,
        }),
      }
    );
  return Object.assign(C.bind(null, i), { hook: L.bind(null, i) });
}
export { oe as createAppAuth, re as createOAuthUserAuth };
//# sourceMappingURL=auth-app.mjs.map
