/* esm.sh - esbuild bundle(@octokit/auth-oauth-user@5.1.1) es2022 production */
import { getUserAgent as p } from "./universal-user-agent.mjs";
import { request as l } from "./request.mjs";
import { createOAuthDeviceAuth as d } from "./auth-oauth-device.mjs";
import { exchangeWebFlowCode as y } from "./oauth-methods.mjs";
import {
  checkToken as k,
  deleteAuthorization as T,
  deleteToken as f,
  refreshToken as s,
  resetToken as w,
} from "./oauth-methods.mjs";
var h = "0.0.0-development";
async function u(e) {
  if ("code" in e.strategyOptions) {
    let { authentication: t } = await y({
      clientId: e.clientId,
      clientSecret: e.clientSecret,
      clientType: e.clientType,
      onTokenCreated: e.onTokenCreated,
      ...e.strategyOptions,
      request: e.request,
    });
    return { type: "token", tokenType: "oauth", ...t };
  }
  if ("onVerification" in e.strategyOptions) {
    let i = await d({
      clientType: e.clientType,
      clientId: e.clientId,
      onTokenCreated: e.onTokenCreated,
      ...e.strategyOptions,
      request: e.request,
    })({ type: "oauth" });
    return { clientSecret: e.clientSecret, ...i };
  }
  if ("token" in e.strategyOptions)
    return {
      type: "token",
      tokenType: "oauth",
      clientId: e.clientId,
      clientSecret: e.clientSecret,
      clientType: e.clientType,
      onTokenCreated: e.onTokenCreated,
      ...e.strategyOptions,
    };
  throw new Error("[@octokit/auth-oauth-user] Invalid strategy options");
}
async function a(e, t = {}) {
  if (
    (e.authentication ||
      (e.authentication =
        e.clientType === "oauth-app" ? await u(e) : await u(e)),
    e.authentication.invalid)
  )
    throw new Error("[@octokit/auth-oauth-user] Token is invalid");
  let i = e.authentication;
  if (
    "expiresAt" in i &&
    (t.type === "refresh" || new Date(i.expiresAt) < new Date())
  ) {
    let { authentication: o } = await s({
      clientType: "github-app",
      clientId: e.clientId,
      clientSecret: e.clientSecret,
      refreshToken: i.refreshToken,
      request: e.request,
    });
    e.authentication = { tokenType: "oauth", type: "token", ...o };
  }
  if (t.type === "refresh") {
    if (e.clientType === "oauth-app")
      throw new Error(
        "[@octokit/auth-oauth-user] OAuth Apps do not support expiring tokens"
      );
    if (!i.hasOwnProperty("expiresAt"))
      throw new Error("[@octokit/auth-oauth-user] Refresh token missing");
    await e.onTokenCreated?.(e.authentication, { type: t.type });
  }
  if (t.type === "check" || t.type === "reset") {
    let o = t.type === "check" ? k : w;
    try {
      let { authentication: n } = await o({
        clientType: e.clientType,
        clientId: e.clientId,
        clientSecret: e.clientSecret,
        token: e.authentication.token,
        request: e.request,
      });
      return (
        (e.authentication = { tokenType: "oauth", type: "token", ...n }),
        t.type === "reset" &&
          (await e.onTokenCreated?.(e.authentication, { type: t.type })),
        e.authentication
      );
    } catch (n) {
      throw (
        (n.status === 404 &&
          ((n.message = "[@octokit/auth-oauth-user] Token is invalid"),
          (e.authentication.invalid = !0)),
        n)
      );
    }
  }
  if (t.type === "delete" || t.type === "deleteAuthorization") {
    let o = t.type === "delete" ? f : T;
    try {
      await o({
        clientType: e.clientType,
        clientId: e.clientId,
        clientSecret: e.clientSecret,
        token: e.authentication.token,
        request: e.request,
      });
    } catch (n) {
      if (n.status !== 404) throw n;
    }
    return (e.authentication.invalid = !0), e.authentication;
  }
  return e.authentication;
}
var g = /\/applications\/[^/]+\/(token|grant)s?/;
function A(e) {
  return e && g.test(e);
}
async function I(e, t, i, o = {}) {
  let n = t.endpoint.merge(i, o);
  if (/\/login\/(oauth\/access_token|device\/code)$/.test(n.url)) return t(n);
  if (A(n.url)) {
    let r = btoa(`${e.clientId}:${e.clientSecret}`);
    return (n.headers.authorization = `basic ${r}`), t(n);
  }
  let { token: c } =
    e.clientType === "oauth-app"
      ? await a({ ...e, request: t })
      : await a({ ...e, request: t });
  return (n.headers.authorization = "token " + c), t(n);
}
function S({
  clientId: e,
  clientSecret: t,
  clientType: i = "oauth-app",
  request: o = l.defaults({
    headers: { "user-agent": `octokit-auth-oauth-app.js/${h} ${p()}` },
  }),
  onTokenCreated: n,
  ...c
}) {
  let r = Object.assign({
    clientType: i,
    clientId: e,
    clientSecret: t,
    onTokenCreated: n,
    strategyOptions: c,
    request: o,
  });
  return Object.assign(a.bind(null, r), { hook: I.bind(null, r) });
}
S.VERSION = h;
export { S as createOAuthUserAuth, A as requiresBasicAuth };
//# sourceMappingURL=auth-oauth-user.mjs.map
