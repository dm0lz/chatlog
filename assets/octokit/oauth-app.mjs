/* esm.sh - esbuild bundle(@octokit/oauth-app@7.1.2) es2022 production */
import { Buffer as __Buffer$ } from "./buffer.bundle.mjs";
import { createOAuthAppAuth as x } from "./auth-oauth-app.mjs";
import { Octokit as z } from "./core.mjs";
import { getUserAgent as W } from "./universal-user-agent.mjs";
import { createOAuthUserAuth as j } from "./auth-oauth-user.mjs";
import * as m from "./oauth-methods.mjs";
import * as b from "./auth-oauth-app.mjs";
import * as U from "./oauth-methods.mjs";
import * as f from "./oauth-methods.mjs";
import { createOAuthUserAuth as g } from "./auth-oauth-user.mjs";
import * as I from "./oauth-methods.mjs";
import { createOAuthUserAuth as N } from "./auth-oauth-user.mjs";
import * as E from "./oauth-methods.mjs";
import { createOAuthUserAuth as J } from "./auth-oauth-user.mjs";
import * as w from "./oauth-methods.mjs";
import { createUnauthenticatedAuth as P } from "./auth-unauthenticated.mjs";
import * as y from "./oauth-methods.mjs";
import { createUnauthenticatedAuth as A } from "./auth-unauthenticated.mjs";
var S = "7.1.2";
function O(t, n, e) {
  if (Array.isArray(n)) {
    for (let o of n) O(t, o, e);
    return;
  }
  t.eventHandlers[n] || (t.eventHandlers[n] = []), t.eventHandlers[n].push(e);
}
var v = z.defaults({ userAgent: `octokit-oauth-app.js/${S} ${W()}` });
async function h(t, n) {
  let { name: e, action: o } = n;
  if (t.eventHandlers[`${e}.${o}`])
    for (let r of t.eventHandlers[`${e}.${o}`]) await r(n);
  if (t.eventHandlers[e]) for (let r of t.eventHandlers[e]) await r(n);
}
async function H(t, n) {
  return t.octokit.auth({
    type: "oauth-user",
    ...n,
    async factory(e) {
      let o = new t.Octokit({ authStrategy: j, auth: e }),
        r = await o.auth({ type: "get" });
      return (
        await h(t, {
          name: "token",
          action: "created",
          token: r.token,
          scopes: r.scopes,
          authentication: r,
          octokit: o,
        }),
        o
      );
    },
  });
}
function M(t, n) {
  let e = {
    clientId: t.clientId,
    request: t.octokit.request,
    ...n,
    allowSignup: t.allowSignup ?? n.allowSignup,
    redirectUrl: n.redirectUrl ?? t.redirectUrl,
    scopes: n.scopes ?? t.defaultScopes,
  };
  return m.getWebFlowAuthorizationUrl({ clientType: t.clientType, ...e });
}
async function q(t, n) {
  let e = await t.octokit.auth({ type: "oauth-user", ...n });
  return (
    await h(t, {
      name: "token",
      action: "created",
      token: e.token,
      scopes: e.scopes,
      authentication: e,
      octokit: new t.Octokit({
        authStrategy: b.createOAuthUserAuth,
        auth: {
          clientType: t.clientType,
          clientId: t.clientId,
          clientSecret: t.clientSecret,
          token: e.token,
          scopes: e.scopes,
          refreshToken: e.refreshToken,
          expiresAt: e.expiresAt,
          refreshTokenExpiresAt: e.refreshTokenExpiresAt,
        },
      }),
    }),
    { authentication: e }
  );
}
async function R(t, n) {
  let e = await U.checkToken({
    clientType: t.clientType,
    clientId: t.clientId,
    clientSecret: t.clientSecret,
    request: t.octokit.request,
    ...n,
  });
  return (
    Object.assign(e.authentication, { type: "token", tokenType: "oauth" }), e
  );
}
async function $(t, n) {
  let e = {
    clientId: t.clientId,
    clientSecret: t.clientSecret,
    request: t.octokit.request,
    ...n,
  };
  if (t.clientType === "oauth-app") {
    let i = await f.resetToken({ clientType: "oauth-app", ...e }),
      u = Object.assign(i.authentication, {
        type: "token",
        tokenType: "oauth",
      });
    return (
      await h(t, {
        name: "token",
        action: "reset",
        token: i.authentication.token,
        scopes: i.authentication.scopes || void 0,
        authentication: u,
        octokit: new t.Octokit({
          authStrategy: g,
          auth: {
            clientType: t.clientType,
            clientId: t.clientId,
            clientSecret: t.clientSecret,
            token: i.authentication.token,
            scopes: i.authentication.scopes,
          },
        }),
      }),
      { ...i, authentication: u }
    );
  }
  let o = await f.resetToken({ clientType: "github-app", ...e }),
    r = Object.assign(o.authentication, { type: "token", tokenType: "oauth" });
  return (
    await h(t, {
      name: "token",
      action: "reset",
      token: o.authentication.token,
      authentication: r,
      octokit: new t.Octokit({
        authStrategy: g,
        auth: {
          clientType: t.clientType,
          clientId: t.clientId,
          clientSecret: t.clientSecret,
          token: o.authentication.token,
        },
      }),
    }),
    { ...o, authentication: r }
  );
}
async function C(t, n) {
  if (t.clientType === "oauth-app")
    throw new Error(
      "[@octokit/oauth-app] app.refreshToken() is not supported for OAuth Apps"
    );
  let e = await I.refreshToken({
      clientType: "github-app",
      clientId: t.clientId,
      clientSecret: t.clientSecret,
      request: t.octokit.request,
      refreshToken: n.refreshToken,
    }),
    o = Object.assign(e.authentication, { type: "token", tokenType: "oauth" });
  return (
    await h(t, {
      name: "token",
      action: "refreshed",
      token: e.authentication.token,
      authentication: o,
      octokit: new t.Octokit({
        authStrategy: N,
        auth: {
          clientType: t.clientType,
          clientId: t.clientId,
          clientSecret: t.clientSecret,
          token: e.authentication.token,
        },
      }),
    }),
    { ...e, authentication: o }
  );
}
async function D(t, n) {
  if (t.clientType === "oauth-app")
    throw new Error(
      "[@octokit/oauth-app] app.scopeToken() is not supported for OAuth Apps"
    );
  let e = await E.scopeToken({
      clientType: "github-app",
      clientId: t.clientId,
      clientSecret: t.clientSecret,
      request: t.octokit.request,
      ...n,
    }),
    o = Object.assign(e.authentication, { type: "token", tokenType: "oauth" });
  return (
    await h(t, {
      name: "token",
      action: "scoped",
      token: e.authentication.token,
      authentication: o,
      octokit: new t.Octokit({
        authStrategy: J,
        auth: {
          clientType: t.clientType,
          clientId: t.clientId,
          clientSecret: t.clientSecret,
          token: e.authentication.token,
        },
      }),
    }),
    { ...e, authentication: o }
  );
}
async function L(t, n) {
  let e = {
      clientId: t.clientId,
      clientSecret: t.clientSecret,
      request: t.octokit.request,
      ...n,
    },
    o =
      t.clientType === "oauth-app"
        ? await w.deleteToken({ clientType: "oauth-app", ...e })
        : await w.deleteToken({ clientType: "github-app", ...e });
  return (
    await h(t, {
      name: "token",
      action: "deleted",
      token: n.token,
      octokit: new t.Octokit({
        authStrategy: P,
        auth: {
          reason:
            'Handling "token.deleted" event. The access for the token has been revoked.',
        },
      }),
    }),
    o
  );
}
async function F(t, n) {
  let e = {
      clientId: t.clientId,
      clientSecret: t.clientSecret,
      request: t.octokit.request,
      ...n,
    },
    o =
      t.clientType === "oauth-app"
        ? await y.deleteAuthorization({ clientType: "oauth-app", ...e })
        : await y.deleteAuthorization({ clientType: "github-app", ...e });
  return (
    await h(t, {
      name: "token",
      action: "deleted",
      token: n.token,
      octokit: new t.Octokit({
        authStrategy: A,
        auth: {
          reason:
            'Handling "token.deleted" event. The access for the token has been revoked.',
        },
      }),
    }),
    await h(t, {
      name: "authorization",
      action: "deleted",
      token: n.token,
      octokit: new t.Octokit({
        authStrategy: A,
        auth: {
          reason:
            'Handling "authorization.deleted" event. The access for the app has been revoked.',
        },
      }),
    }),
    o
  );
}
function G(t) {
  return {
    status: 404,
    headers: { "content-type": "application/json" },
    text: JSON.stringify({ error: `Unknown route: ${t.method} ${t.url}` }),
  };
}
async function T(t, { pathPrefix: n = "/api/github/oauth" }, e) {
  if (e.method === "OPTIONS")
    return {
      status: 200,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "*",
        "access-control-allow-headers":
          "Content-Type, User-Agent, Authorization",
      },
    };
  let { pathname: o } = new URL(e.url, "http://localhost");
  if (!o.startsWith(`${n}/`)) return;
  o = o.slice(n.length + 1);
  let r = [e.method, o].join(" "),
    i = {
      getLogin: "GET login",
      getCallback: "GET callback",
      createToken: "POST token",
      getToken: "GET token",
      patchToken: "PATCH token",
      patchRefreshToken: "PATCH refresh-token",
      scopeToken: "POST token/scoped",
      deleteToken: "DELETE token",
      deleteGrant: "DELETE grant",
    };
  if (!Object.values(i).includes(r)) return G(e);
  let u;
  try {
    let p = await e.text();
    u = p ? JSON.parse(p) : {};
  } catch {
    return {
      status: 400,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
      text: JSON.stringify({ error: "[@octokit/oauth-app] request error" }),
    };
  }
  let { searchParams: k } = new URL(e.url, "http://localhost"),
    a = Object.fromEntries(k),
    l = e.headers;
  try {
    if (r === i.getLogin) {
      let { url: c } = t.getWebFlowAuthorizationUrl({
        state: a.state,
        scopes: a.scopes ? a.scopes.split(",") : void 0,
        allowSignup: a.allowSignup ? a.allowSignup === "true" : void 0,
        redirectUrl: a.redirectUrl,
      });
      return { status: 302, headers: { location: c } };
    }
    if (r === i.getCallback) {
      if (a.error)
        throw new Error(
          `[@octokit/oauth-app] ${a.error} ${a.error_description}`
        );
      if (!a.code)
        throw new Error('[@octokit/oauth-app] "code" parameter is required');
      let {
        authentication: { token: c },
      } = await t.createToken({ code: a.code });
      return {
        status: 200,
        headers: { "content-type": "text/html" },
        text: `<h1>Token created successfully</h1>

<p>Your token is: <strong>${c}</strong>. Copy it now as it cannot be shown again.</p>`,
      };
    }
    if (r === i.createToken) {
      let { code: c, redirectUrl: s } = u;
      if (!c)
        throw new Error('[@octokit/oauth-app] "code" parameter is required');
      let d = await t.createToken({ code: c, redirectUrl: s });
      return (
        delete d.authentication.clientSecret,
        {
          status: 201,
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
          },
          text: JSON.stringify(d),
        }
      );
    }
    if (r === i.getToken) {
      let c = l.authorization?.substr(6);
      if (!c)
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      let s = await t.checkToken({ token: c });
      return (
        delete s.authentication.clientSecret,
        {
          status: 200,
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
          },
          text: JSON.stringify(s),
        }
      );
    }
    if (r === i.patchToken) {
      let c = l.authorization?.substr(6);
      if (!c)
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      let s = await t.resetToken({ token: c });
      return (
        delete s.authentication.clientSecret,
        {
          status: 200,
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
          },
          text: JSON.stringify(s),
        }
      );
    }
    if (r === i.patchRefreshToken) {
      if (!l.authorization?.substr(6))
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      let { refreshToken: s } = u;
      if (!s)
        throw new Error(
          "[@octokit/oauth-app] refreshToken must be sent in request body"
        );
      let d = await t.refreshToken({ refreshToken: s });
      return (
        delete d.authentication.clientSecret,
        {
          status: 200,
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
          },
          text: JSON.stringify(d),
        }
      );
    }
    if (r === i.scopeToken) {
      let c = l.authorization?.substr(6);
      if (!c)
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      let s = await t.scopeToken({ token: c, ...u });
      return (
        delete s.authentication.clientSecret,
        {
          status: 200,
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
          },
          text: JSON.stringify(s),
        }
      );
    }
    if (r === i.deleteToken) {
      let c = l.authorization?.substr(6);
      if (!c)
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      return (
        await t.deleteToken({ token: c }),
        { status: 204, headers: { "access-control-allow-origin": "*" } }
      );
    }
    let p = l.authorization?.substr(6);
    if (!p)
      throw new Error(
        '[@octokit/oauth-app] "Authorization" header is required'
      );
    return (
      await t.deleteAuthorization({ token: p }),
      { status: 204, headers: { "access-control-allow-origin": "*" } }
    );
  } catch (p) {
    return {
      status: 400,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
      text: JSON.stringify({ error: p.message }),
    };
  }
}
function V(t) {
  let { method: n, url: e, headers: o } = t;
  async function r() {
    return await new Promise((u, k) => {
      let a = [];
      t.on("error", k)
        .on("data", (l) => a.push(l))
        .on("end", () => u(__Buffer$.concat(a).toString()));
    });
  }
  return { method: n, url: e, headers: o, text: r };
}
function Q(t, n) {
  n.writeHead(t.status, t.headers), n.end(t.text);
}
function at(t, n = {}) {
  return async function (e, o, r) {
    let i = await V(e),
      u = await T(t, n, i);
    return u ? (Q(u, o), !0) : (r?.(), !1);
  };
}
function B(t) {
  let n = Object.fromEntries(t.headers.entries());
  return { method: t.method, url: t.url, headers: n, text: () => t.text() };
}
function Y(t) {
  return new Response(t.text, { status: t.status, headers: t.headers });
}
function st(t, n = {}) {
  return async function (e) {
    let o = await B(e),
      r = await T(t, n, o);
    return r ? Y(r) : void 0;
  };
}
function _(t) {
  let { method: n } = t.requestContext.http,
    e = t.rawPath,
    { stage: o } = t.requestContext;
  e.startsWith("/" + o) && (e = e.substring(o.length + 1)),
    t.rawQueryString && (e += "?" + t.rawQueryString);
  let r = t.headers;
  return { method: n, url: e, headers: r, text: async () => t.body || "" };
}
function K(t) {
  return { statusCode: t.status, headers: t.headers, body: t.text };
}
function ut(t, n = {}) {
  return async function (e) {
    let o = _(e),
      r = await T(t, n, o);
    return r ? K(r) : void 0;
  };
}
var ht = class {
  static VERSION = S;
  static defaults(t) {
    return class extends this {
      constructor(...e) {
        super({ ...t, ...e[0] });
      }
    };
  }
  constructor(t) {
    let n = t.Octokit || v;
    this.type = t.clientType || "oauth-app";
    let e = new n({
        authStrategy: x,
        auth: {
          clientType: this.type,
          clientId: t.clientId,
          clientSecret: t.clientSecret,
        },
      }),
      o = {
        clientType: this.type,
        clientId: t.clientId,
        clientSecret: t.clientSecret,
        defaultScopes: t.defaultScopes || [],
        allowSignup: t.allowSignup,
        baseUrl: t.baseUrl,
        redirectUrl: t.redirectUrl,
        log: t.log,
        Octokit: n,
        octokit: e,
        eventHandlers: {},
      };
    (this.on = O.bind(null, o)),
      (this.octokit = e),
      (this.getUserOctokit = H.bind(null, o)),
      (this.getWebFlowAuthorizationUrl = M.bind(null, o)),
      (this.createToken = q.bind(null, o)),
      (this.checkToken = R.bind(null, o)),
      (this.resetToken = $.bind(null, o)),
      (this.refreshToken = C.bind(null, o)),
      (this.scopeToken = D.bind(null, o)),
      (this.deleteToken = L.bind(null, o)),
      (this.deleteAuthorization = F.bind(null, o));
  }
  type;
  on;
  octokit;
  getUserOctokit;
  getWebFlowAuthorizationUrl;
  createToken;
  checkToken;
  resetToken;
  refreshToken;
  scopeToken;
  deleteToken;
  deleteAuthorization;
};
export {
  ht as OAuthApp,
  ut as createAWSLambdaAPIGatewayV2Handler,
  at as createNodeMiddleware,
  st as createWebWorkerHandler,
  T as handleRequest,
  Q as sendNodeResponse,
  G as unknownRouteResponse,
};
//# sourceMappingURL=oauth-app.mjs.map
