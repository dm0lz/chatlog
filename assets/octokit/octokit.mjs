/* esm.sh - esbuild bundle(octokit@4.0.2) es2022 production */
import { Octokit as a } from "./core.mjs";
import { paginateRest as i } from "./plugin-paginate-rest.mjs";
import { paginateGraphQL as u } from "./plugin-paginate-graphql.mjs";
import { restEndpointMethods as m } from "./plugin-rest-endpoint-methods.mjs";
import { retry as f } from "./plugin-retry.mjs";
import { throttling as p } from "./plugin-throttling.mjs";
import { RequestError as $ } from "./request-error.mjs";
import { App as l } from "./app.mjs";
import { OAuthApp as g } from "./oauth-app.mjs";
import { createNodeMiddleware as C } from "./app.mjs";
var n = "0.0.0-development",
  o = a.plugin(m, i, u, f, p).defaults({
    userAgent: `octokit.js/${n}`,
    throttle: { onRateLimit: d, onSecondaryRateLimit: s },
  });
function d(e, t, r) {
  if (
    (r.log.warn(`Request quota exhausted for request ${t.method} ${t.url}`),
    t.request.retryCount === 0)
  )
    return r.log.info(`Retrying after ${e} seconds!`), !0;
}
function s(e, t, r) {
  if (
    (r.log.warn(`SecondaryRateLimit detected for request ${t.method} ${t.url}`),
    t.request.retryCount === 0)
  )
    return r.log.info(`Retrying after ${e} seconds!`), !0;
}
var E = l.defaults({ Octokit: o }),
  S = g.defaults({ Octokit: o });
export {
  E as App,
  S as OAuthApp,
  o as Octokit,
  $ as RequestError,
  C as createNodeMiddleware,
};
//# sourceMappingURL=octokit.mjs.map
