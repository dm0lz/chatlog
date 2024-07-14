/* esm.sh - esbuild bundle(@octokit/app@15.0.1) es2022 production */
import { Octokit as u } from "./core.mjs";
import { createAppAuth as d } from "./auth-app.mjs";
import { OAuthApp as p } from "./oauth-app.mjs";
import { createAppAuth as w } from "./auth-app.mjs";
import { createUnauthenticatedAuth as y } from "./auth-unauthenticated.mjs";
import { Webhooks as b } from "./webhooks.mjs";
import { composePaginateRest as m } from "./plugin-paginate-rest.mjs";
import { createAppAuth as g } from "./auth-app.mjs";
import { composePaginateRest as A } from "./plugin-paginate-rest.mjs";
import {
  createNodeMiddleware as j,
  sendNodeResponse as N,
  unknownRouteResponse as P,
} from "./oauth-app.mjs";
import { createNodeMiddleware as M } from "./webhooks.mjs";
var f = "15.0.1";
function k(t, a) {
  return new b({
    secret: a.secret,
    transform: async (o) => {
      if (
        !("installation" in o.payload) ||
        typeof o.payload.installation != "object"
      ) {
        let n = new t.constructor({
          authStrategy: y,
          auth: {
            reason: '"installation" key missing in webhook event payload',
          },
        });
        return { ...o, octokit: n };
      }
      let e = o.payload.installation.id,
        i = await t.auth({
          type: "installation",
          installationId: e,
          factory(n) {
            return new n.octokit.constructor({
              ...n.octokitOptions,
              authStrategy: w,
              auth: { ...n, installationId: e },
            });
          },
        });
      return (
        i.hook.before("request", (n) => {
          n.headers["x-github-delivery"] = o.id;
        }),
        { ...o, octokit: i }
      );
    },
  });
}
async function c(t, a) {
  return t.octokit.auth({
    type: "installation",
    installationId: a,
    factory(o) {
      let e = {
        ...o.octokitOptions,
        authStrategy: g,
        auth: { ...o, installationId: a },
      };
      return new o.octokit.constructor(e);
    },
  });
}
function I(t) {
  return Object.assign(O.bind(null, t), { iterator: l.bind(null, t) });
}
async function O(t, a) {
  let o = l(t)[Symbol.asyncIterator](),
    e = await o.next();
  for (; !e.done; ) await a(e.value), (e = await o.next());
}
function l(t) {
  return {
    async *[Symbol.asyncIterator]() {
      let a = m.iterator(t.octokit, "GET /app/installations");
      for await (let { data: o } of a)
        for (let e of o) yield { octokit: await c(t, e.id), installation: e };
    },
  };
}
function R(t) {
  return Object.assign(S.bind(null, t), { iterator: h.bind(null, t) });
}
async function S(t, a, o) {
  let e = h(t, o ? a : void 0)[Symbol.asyncIterator](),
    i = await e.next();
  for (; !i.done; )
    o ? await o(i.value) : await a(i.value), (i = await e.next());
}
function x(t, a) {
  return {
    async *[Symbol.asyncIterator]() {
      yield { octokit: await t.getInstallationOctokit(a) };
    },
  };
}
function h(t, a) {
  return {
    async *[Symbol.asyncIterator]() {
      let o = a ? x(t, a.installationId) : t.eachInstallation.iterator();
      for await (let { octokit: e } of o) {
        let i = A.iterator(e, "GET /installation/repositories");
        for await (let { data: n } of i)
          for (let r of n) yield { octokit: e, repository: r };
      }
    },
  };
}
function s() {}
function z(t, a = {}) {
  let o = Object.assign(
      {
        debug: s,
        info: s,
        warn: console.warn.bind(console),
        error: console.error.bind(console),
      },
      a.log
    ),
    e = { pathPrefix: "/api/github", ...a, log: o },
    i = M(t.webhooks, { path: e.pathPrefix + "/webhooks", log: o }),
    n = j(t.oauth, { pathPrefix: e.pathPrefix + "/oauth" });
  return E.bind(null, e.pathPrefix, i, n);
}
async function E(t, a, o, e, i, n) {
  let { pathname: r } = new URL(e.url, "http://localhost");
  return r.startsWith(`${t}/`)
    ? (r === `${t}/webhooks`
        ? a(e, i)
        : r.startsWith(`${t}/oauth/`)
        ? o(e, i)
        : N(P(e), i),
      !0)
    : (n?.(), !1);
}
var B = class {
  static VERSION = f;
  static defaults(t) {
    return class extends this {
      constructor(...o) {
        super({ ...t, ...o[0] });
      }
    };
  }
  octokit;
  webhooks;
  oauth;
  getInstallationOctokit;
  eachInstallation;
  eachRepository;
  log;
  constructor(t) {
    let a = t.Octokit || u,
      o = Object.assign(
        { appId: t.appId, privateKey: t.privateKey },
        t.oauth
          ? { clientId: t.oauth.clientId, clientSecret: t.oauth.clientSecret }
          : {}
      );
    (this.octokit = new a({ authStrategy: d, auth: o, log: t.log })),
      (this.log = Object.assign(
        {
          debug: () => {},
          info: () => {},
          warn: console.warn.bind(console),
          error: console.error.bind(console),
        },
        t.log
      )),
      t.webhooks
        ? (this.webhooks = k(this.octokit, t.webhooks))
        : Object.defineProperty(this, "webhooks", {
            get() {
              throw new Error("[@octokit/app] webhooks option not set");
            },
          }),
      t.oauth
        ? (this.oauth = new p({
            ...t.oauth,
            clientType: "github-app",
            Octokit: a,
          }))
        : Object.defineProperty(this, "oauth", {
            get() {
              throw new Error(
                "[@octokit/app] oauth.clientId / oauth.clientSecret options are not set"
              );
            },
          }),
      (this.getInstallationOctokit = c.bind(null, this)),
      (this.eachInstallation = I(this)),
      (this.eachRepository = R(this));
  }
};
export { B as App, z as createNodeMiddleware };
//# sourceMappingURL=app.mjs.map
