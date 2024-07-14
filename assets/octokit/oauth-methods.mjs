/* esm.sh - esbuild bundle(@octokit/oauth-methods@5.1.0) es2022 production */
import { oauthAuthorizationUrl as h } from "./oauth-authorization-url.mjs";
import { request as _ } from "./request.mjs";
import { RequestError as k } from "./request-error.mjs";
import { request as T } from "./request.mjs";
import { request as q } from "./request.mjs";
import { request as m } from "./request.mjs";
import { request as S } from "./request.mjs";
import { request as I } from "./request.mjs";
import { request as y } from "./request.mjs";
import { request as g } from "./request.mjs";
import { request as b } from "./request.mjs";
import { request as x } from "./request.mjs";
var w = "0.0.0-development";
function d(e) {
  let r = e.endpoint.DEFAULTS;
  return /^https:\/\/(api\.)?github\.com$/.test(r.baseUrl)
    ? "https://github.com"
    : r.baseUrl.replace("/api/v3", "");
}
async function s(e, r, t) {
  let n = { baseUrl: d(e), headers: { accept: "application/json" }, ...t },
    a = await e(r, n);
  if ("error" in a.data) {
    let c = new k(
      `${a.data.error_description} (${a.data.error}, ${a.data.error_uri})`,
      400,
      { request: e.endpoint.merge(r, n) }
    );
    throw ((c.response = a), c);
  }
  return a;
}
function D({ request: e = _, ...r }) {
  let t = d(e);
  return h({ ...r, baseUrl: t });
}
async function U(e) {
  let r = e.request || T,
    t = await s(r, "POST /login/oauth/access_token", {
      client_id: e.clientId,
      client_secret: e.clientSecret,
      code: e.code,
      redirect_uri: e.redirectUrl,
    }),
    n = {
      clientType: e.clientType,
      clientId: e.clientId,
      clientSecret: e.clientSecret,
      token: t.data.access_token,
      scopes: t.data.scope.split(/\s+/).filter(Boolean),
    };
  if (e.clientType === "github-app") {
    if ("refresh_token" in t.data) {
      let a = new Date(t.headers.date).getTime();
      (n.refreshToken = t.data.refresh_token),
        (n.expiresAt = o(a, t.data.expires_in)),
        (n.refreshTokenExpiresAt = o(a, t.data.refresh_token_expires_in));
    }
    delete n.scopes;
  }
  return { ...t, authentication: n };
}
function o(e, r) {
  return new Date(e + r * 1e3).toISOString();
}
async function z(e) {
  let r = e.request || q,
    t = { client_id: e.clientId };
  return (
    "scopes" in e && Array.isArray(e.scopes) && (t.scope = e.scopes.join(" ")),
    s(r, "POST /login/device/code", t)
  );
}
async function C(e) {
  let r = e.request || m,
    t = await s(r, "POST /login/oauth/access_token", {
      client_id: e.clientId,
      device_code: e.code,
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    }),
    n = {
      clientType: e.clientType,
      clientId: e.clientId,
      token: t.data.access_token,
      scopes: t.data.scope.split(/\s+/).filter(Boolean),
    };
  if (
    ("clientSecret" in e && (n.clientSecret = e.clientSecret),
    e.clientType === "github-app")
  ) {
    if ("refresh_token" in t.data) {
      let a = new Date(t.headers.date).getTime();
      (n.refreshToken = t.data.refresh_token),
        (n.expiresAt = u(a, t.data.expires_in)),
        (n.refreshTokenExpiresAt = u(a, t.data.refresh_token_expires_in));
    }
    delete n.scopes;
  }
  return { ...t, authentication: n };
}
function u(e, r) {
  return new Date(e + r * 1e3).toISOString();
}
async function B(e) {
  let t = await (e.request || S)("POST /applications/{client_id}/token", {
      headers: {
        authorization: `basic ${btoa(`${e.clientId}:${e.clientSecret}`)}`,
      },
      client_id: e.clientId,
      access_token: e.token,
    }),
    n = {
      clientType: e.clientType,
      clientId: e.clientId,
      clientSecret: e.clientSecret,
      token: e.token,
      scopes: t.data.scopes,
    };
  return (
    t.data.expires_at && (n.expiresAt = t.data.expires_at),
    e.clientType === "github-app" && delete n.scopes,
    { ...t, authentication: n }
  );
}
async function L(e) {
  let r = e.request || I,
    t = await s(r, "POST /login/oauth/access_token", {
      client_id: e.clientId,
      client_secret: e.clientSecret,
      grant_type: "refresh_token",
      refresh_token: e.refreshToken,
    }),
    n = new Date(t.headers.date).getTime(),
    a = {
      clientType: "github-app",
      clientId: e.clientId,
      clientSecret: e.clientSecret,
      token: t.data.access_token,
      refreshToken: t.data.refresh_token,
      expiresAt: l(n, t.data.expires_in),
      refreshTokenExpiresAt: l(n, t.data.refresh_token_expires_in),
    };
  return { ...t, authentication: a };
}
function l(e, r) {
  return new Date(e + r * 1e3).toISOString();
}
async function W(e) {
  let {
      request: r,
      clientType: t,
      clientId: n,
      clientSecret: a,
      token: c,
      ...p
    } = e,
    i = await (r || y)("POST /applications/{client_id}/token/scoped", {
      headers: { authorization: `basic ${btoa(`${n}:${a}`)}` },
      client_id: n,
      access_token: c,
      ...p,
    }),
    f = Object.assign(
      { clientType: t, clientId: n, clientSecret: a, token: i.data.token },
      i.data.expires_at ? { expiresAt: i.data.expires_at } : {}
    );
  return { ...i, authentication: f };
}
async function N(e) {
  let r = e.request || g,
    t = btoa(`${e.clientId}:${e.clientSecret}`),
    n = await r("PATCH /applications/{client_id}/token", {
      headers: { authorization: `basic ${t}` },
      client_id: e.clientId,
      access_token: e.token,
    }),
    a = {
      clientType: e.clientType,
      clientId: e.clientId,
      clientSecret: e.clientSecret,
      token: n.data.token,
      scopes: n.data.scopes,
    };
  return (
    n.data.expires_at && (a.expiresAt = n.data.expires_at),
    e.clientType === "github-app" && delete a.scopes,
    { ...n, authentication: a }
  );
}
async function G(e) {
  let r = e.request || b,
    t = btoa(`${e.clientId}:${e.clientSecret}`);
  return r("DELETE /applications/{client_id}/token", {
    headers: { authorization: `basic ${t}` },
    client_id: e.clientId,
    access_token: e.token,
  });
}
async function K(e) {
  let r = e.request || x,
    t = btoa(`${e.clientId}:${e.clientSecret}`);
  return r("DELETE /applications/{client_id}/grant", {
    headers: { authorization: `basic ${t}` },
    client_id: e.clientId,
    access_token: e.token,
  });
}
export {
  w as VERSION,
  B as checkToken,
  z as createDeviceCode,
  K as deleteAuthorization,
  G as deleteToken,
  C as exchangeDeviceCode,
  U as exchangeWebFlowCode,
  D as getWebFlowAuthorizationUrl,
  L as refreshToken,
  N as resetToken,
  W as scopeToken,
};
//# sourceMappingURL=oauth-methods.mjs.map
