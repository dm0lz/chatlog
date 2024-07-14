/* esm.sh - esbuild bundle(@octokit/auth-oauth-device@7.1.1) es2022 production */
import { getUserAgent as h } from "./universal-user-agent.mjs";
import { request as p } from "./request.mjs";
import {
  createDeviceCode as d,
  exchangeDeviceCode as r,
} from "./oauth-methods.mjs";
async function s(t, e) {
  let i = f(t, e.auth);
  if (i) return i;
  let { data: o } = await d({
    clientType: t.clientType,
    clientId: t.clientId,
    request: e.request || t.request,
    scopes: e.auth.scopes || t.scopes,
  });
  await t.onVerification(o);
  let n = await a(e.request || t.request, t.clientId, t.clientType, o);
  return (t.authentication = n), n;
}
function f(t, e) {
  if (e.refresh === !0 || !t.authentication) return !1;
  if (t.clientType === "github-app") return t.authentication;
  let i = t.authentication,
    o = (("scopes" in e && e.scopes) || t.scopes).join(" "),
    n = i.scopes.join(" ");
  return o === n ? i : !1;
}
async function u(t) {
  await new Promise((e) => setTimeout(e, t * 1e3));
}
async function a(t, e, i, o) {
  try {
    let n = { clientId: e, request: t, code: o.device_code },
      { authentication: c } =
        i === "oauth-app"
          ? await r({ ...n, clientType: "oauth-app" })
          : await r({ ...n, clientType: "github-app" });
    return { type: "token", tokenType: "oauth", ...c };
  } catch (n) {
    if (!n.response) throw n;
    let c = n.response.data.error;
    if (c === "authorization_pending")
      return await u(o.interval), a(t, e, i, o);
    if (c === "slow_down") return await u(o.interval + 5), a(t, e, i, o);
    throw n;
  }
}
async function l(t, e) {
  return s(t, { auth: e });
}
async function w(t, e, i, o) {
  let n = e.endpoint.merge(i, o);
  if (/\/login\/(oauth\/access_token|device\/code)$/.test(n.url)) return e(n);
  let { token: c } = await s(t, { request: e, auth: { type: "oauth" } });
  return (n.headers.authorization = `token ${c}`), e(n);
}
var g = "0.0.0-development";
function T(t) {
  let e =
      t.request ||
      p.defaults({
        headers: { "user-agent": `octokit-auth-oauth-device.js/${g} ${h()}` },
      }),
    { request: i = e, ...o } = t,
    n =
      t.clientType === "github-app"
        ? { ...o, clientType: "github-app", request: i }
        : { ...o, clientType: "oauth-app", request: i, scopes: t.scopes || [] };
  if (!t.clientId)
    throw new Error(
      '[@octokit/auth-oauth-device] "clientId" option must be set (https://github.com/octokit/auth-oauth-device.js#usage)'
    );
  if (!t.onVerification)
    throw new Error(
      '[@octokit/auth-oauth-device] "onVerification" option must be a function (https://github.com/octokit/auth-oauth-device.js#usage)'
    );
  return Object.assign(l.bind(null, n), { hook: w.bind(null, n) });
}
export { T as createOAuthDeviceAuth };
//# sourceMappingURL=auth-oauth-device.mjs.map
