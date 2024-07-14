/* esm.sh - esbuild bundle(@octokit/auth-oauth-app@8.1.1) es2022 production */
import { getUserAgent as u } from "./universal-user-agent.mjs";
import { request as p } from "./request.mjs";
import { createOAuthUserAuth as a } from "./auth-oauth-user.mjs";
import { requiresBasicAuth as l } from "./auth-oauth-user.mjs";
import { createOAuthUserAuth as b } from "./auth-oauth-user.mjs";
async function h(t, e) {
  if (e.type === "oauth-app")
    return {
      type: "oauth-app",
      clientId: t.clientId,
      clientSecret: t.clientSecret,
      clientType: t.clientType,
      headers: {
        authorization: `basic ${btoa(`${t.clientId}:${t.clientSecret}`)}`,
      },
    };
  if ("factory" in e) {
    let { type: r, ...c } = { ...e, ...t };
    return e.factory(c);
  }
  let n = {
    clientId: t.clientId,
    clientSecret: t.clientSecret,
    request: t.request,
    ...e,
  };
  return (
    t.clientType === "oauth-app"
      ? await a({ ...n, clientType: t.clientType })
      : await a({ ...n, clientType: t.clientType })
  )();
}
async function s(t, e, n, o) {
  let r = e.endpoint.merge(n, o);
  if (/\/login\/(oauth\/access_token|device\/code)$/.test(r.url)) return e(r);
  if (t.clientType === "github-app" && !l(r.url))
    throw new Error(
      `[@octokit/auth-oauth-app] GitHub Apps cannot use their client ID/secret for basic authentication for endpoints other than "/applications/{client_id}/**". "${r.method} ${r.url}" is not supported.`
    );
  let c = btoa(`${t.clientId}:${t.clientSecret}`);
  r.headers.authorization = `basic ${c}`;
  try {
    return await e(r);
  } catch (i) {
    throw (
      (i.status !== 401 ||
        (i.message = `[@octokit/auth-oauth-app] "${r.method} ${r.url}" does not support clientId/clientSecret basic authentication.`),
      i)
    );
  }
}
var d = "0.0.0-development";
function g(t) {
  let e = Object.assign(
    {
      request: p.defaults({
        headers: { "user-agent": `octokit-auth-oauth-app.js/${d} ${u()}` },
      }),
      clientType: "oauth-app",
    },
    t
  );
  return Object.assign(h.bind(null, e), { hook: s.bind(null, e) });
}
export { g as createOAuthAppAuth, b as createOAuthUserAuth };
//# sourceMappingURL=auth-oauth-app.mjs.map
