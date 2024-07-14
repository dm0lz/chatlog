/* esm.sh - esbuild bundle(@octokit/core@6.1.2) es2022 production */
import { getUserAgent as g } from "./universal-user-agent.mjs";
import f from "./before-after-hook.mjs";
import { request as u } from "./request.mjs";
import { withCustomRequest as m } from "./graphql.mjs";
import { createTokenAuth as p } from "./auth-token.mjs";
var n = "6.1.2";
var c = () => {},
  q = console.warn.bind(console),
  b = console.error.bind(console),
  a = `octokit-core.js/${n} ${g()}`,
  h = class {
    static VERSION = n;
    static defaults(t) {
      return class extends this {
        constructor(...e) {
          let s = e[0] || {};
          if (typeof t == "function") {
            super(t(s));
            return;
          }
          super(
            Object.assign(
              {},
              t,
              s,
              s.userAgent && t.userAgent
                ? { userAgent: `${s.userAgent} ${t.userAgent}` }
                : null
            )
          );
        }
      };
    }
    static plugins = [];
    static plugin(...t) {
      let r = this.plugins;
      return class extends this {
        static plugins = r.concat(t.filter((s) => !r.includes(s)));
      };
    }
    constructor(t = {}) {
      let r = new f.Collection(),
        e = {
          baseUrl: u.endpoint.DEFAULTS.baseUrl,
          headers: {},
          request: Object.assign({}, t.request, {
            hook: r.bind(null, "request"),
          }),
          mediaType: { previews: [], format: "" },
        };
      if (
        ((e.headers["user-agent"] = t.userAgent ? `${t.userAgent} ${a}` : a),
        t.baseUrl && (e.baseUrl = t.baseUrl),
        t.previews && (e.mediaType.previews = t.previews),
        t.timeZone && (e.headers["time-zone"] = t.timeZone),
        (this.request = u.defaults(e)),
        (this.graphql = m(this.request).defaults(e)),
        (this.log = Object.assign(
          { debug: c, info: c, warn: q, error: b },
          t.log
        )),
        (this.hook = r),
        t.authStrategy)
      ) {
        let { authStrategy: o, ...l } = t,
          i = o(
            Object.assign(
              {
                request: this.request,
                log: this.log,
                octokit: this,
                octokitOptions: l,
              },
              t.auth
            )
          );
        r.wrap("request", i.hook), (this.auth = i);
      } else if (!t.auth) this.auth = async () => ({ type: "unauthenticated" });
      else {
        let o = p(t.auth);
        r.wrap("request", o.hook), (this.auth = o);
      }
      let s = this.constructor;
      for (let o = 0; o < s.plugins.length; ++o)
        Object.assign(this, s.plugins[o](this, t));
    }
    request;
    graphql;
    log;
    hook;
    auth;
  };
export { h as Octokit };
//# sourceMappingURL=core.mjs.map
