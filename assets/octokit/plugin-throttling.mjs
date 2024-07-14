/* esm.sh - esbuild bundle(@octokit/plugin-throttling@9.3.0) es2022 production */
import C from "./light.js";
import "./core.mjs";
var k = "0.0.0-development",
  w = () => Promise.resolve();
function G(e, t, n) {
  return e.retryLimiter.schedule(S, e, t, n);
}
async function S(e, t, n) {
  let i = n.method !== "GET" && n.method !== "HEAD",
    { pathname: s } = new URL(n.url, "http://github.test"),
    h = n.method === "GET" && s.startsWith("/search/"),
    m = s.startsWith("/graphql"),
    o = ~~t.retryCount > 0 ? { priority: 0, weight: 0 } : {};
  e.clustering && (o.expiration = 1e3 * 60),
    (i || m) && (await e.write.key(e.id).schedule(o, w)),
    i &&
      e.triggersNotification(s) &&
      (await e.notifications.key(e.id).schedule(o, w)),
    h && (await e.search.key(e.id).schedule(o, w));
  let a = e.global.key(e.id).schedule(o, t, n);
  if (m) {
    let u = await a;
    if (
      u.data.errors != null &&
      u.data.errors.some((r) => r.type === "RATE_LIMITED")
    )
      throw Object.assign(new Error("GraphQL Rate Limit Exceeded"), {
        response: u,
        data: u.data,
      });
  }
  return a;
}
var T = [
  "/orgs/{org}/invitations",
  "/orgs/{org}/invitations/{invitation_id}",
  "/orgs/{org}/teams/{team_slug}/discussions",
  "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
  "/repos/{owner}/{repo}/collaborators/{username}",
  "/repos/{owner}/{repo}/commits/{commit_sha}/comments",
  "/repos/{owner}/{repo}/issues",
  "/repos/{owner}/{repo}/issues/{issue_number}/comments",
  "/repos/{owner}/{repo}/pulls",
  "/repos/{owner}/{repo}/pulls/{pull_number}/comments",
  "/repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies",
  "/repos/{owner}/{repo}/pulls/{pull_number}/merge",
  "/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
  "/repos/{owner}/{repo}/pulls/{pull_number}/reviews",
  "/repos/{owner}/{repo}/releases",
  "/teams/{team_id}/discussions",
  "/teams/{team_id}/discussions/{discussion_number}/comments",
];
function q(e) {
  let n = `^(?:${e
    .map((i) =>
      i
        .split("/")
        .map((s) => (s.startsWith("{") ? "(?:.+?)" : s))
        .join("/")
    )
    .map((i) => `(?:${i})`)
    .join("|")})[^/]*$`;
  return new RegExp(n, "i");
}
var b = q(T),
  L = b.test.bind(b),
  l = {},
  j = function (e, t) {
    (l.global = new e.Group({ id: "octokit-global", maxConcurrent: 10, ...t })),
      (l.search = new e.Group({
        id: "octokit-search",
        maxConcurrent: 1,
        minTime: 2e3,
        ...t,
      })),
      (l.write = new e.Group({
        id: "octokit-write",
        maxConcurrent: 1,
        minTime: 1e3,
        ...t,
      })),
      (l.notifications = new e.Group({
        id: "octokit-notifications",
        maxConcurrent: 1,
        minTime: 3e3,
        ...t,
      }));
  };
function _(e, t) {
  let {
    enabled: n = !0,
    Bottleneck: i = C,
    id: s = "no-id",
    timeout: h = 1e3 * 60 * 2,
    connection: m,
  } = t.throttle || {};
  if (!n) return {};
  let f = { connection: m, timeout: h };
  l.global == null && j(i, f);
  let o = Object.assign(
    {
      clustering: m != null,
      triggersNotification: L,
      fallbackSecondaryRateRetryAfter: 60,
      retryAfterBaseValue: 1e3,
      retryLimiter: new i(),
      id: s,
      ...l,
    },
    t.throttle
  );
  if (
    typeof o.onSecondaryRateLimit != "function" ||
    typeof o.onRateLimit != "function"
  )
    throw new Error(`octokit/plugin-throttling error:
    You must pass the onSecondaryRateLimit and onRateLimit error handlers.
    See https://octokit.github.io/rest.js/#throttling

    const octokit = new Octokit({
      throttle: {
        onSecondaryRateLimit: (retryAfter, options) => {/* ... */},
        onRateLimit: (retryAfter, options) => {/* ... */}
      }
    })
`);
  let a = {},
    u = new i.Events(a);
  return (
    a.on("secondary-limit", o.onSecondaryRateLimit),
    a.on("rate-limit", o.onRateLimit),
    a.on("error", (r) =>
      e.log.warn("Error in throttling-plugin limit handler", r)
    ),
    o.retryLimiter.on("failed", async function (r, v) {
      let [R, g, p] = v.args,
        { pathname: x } = new URL(p.url, "http://github.test");
      if (!((x.startsWith("/graphql") && r.status !== 401) || r.status === 403))
        return;
      let d = ~~g.retryCount;
      (g.retryCount = d), (p.request.retryCount = d);
      let { wantRetry: E, retryAfter: A = 0 } = await (async function () {
        if (/\bsecondary rate\b/i.test(r.message)) {
          let c =
            Number(r.response.headers["retry-after"]) ||
            R.fallbackSecondaryRateRetryAfter;
          return {
            wantRetry: await u.trigger("secondary-limit", c, p, e, d),
            retryAfter: c,
          };
        }
        if (
          (r.response.headers != null &&
            r.response.headers["x-ratelimit-remaining"] === "0") ||
          (r.response.data?.errors ?? []).some((c) => c.type === "RATE_LIMITED")
        ) {
          let c = new Date(
              ~~r.response.headers["x-ratelimit-reset"] * 1e3
            ).getTime(),
            y = Math.max(Math.ceil((c - Date.now()) / 1e3) + 1, 0);
          return {
            wantRetry: await u.trigger("rate-limit", y, p, e, d),
            retryAfter: y,
          };
        }
        return {};
      })();
      if (E) return g.retryCount++, A * R.retryAfterBaseValue;
    }),
    e.hook.wrap("request", G.bind(null, o)),
    {}
  );
}
_.VERSION = k;
_.triggersNotification = L;
export { _ as throttling };
//# sourceMappingURL=plugin-throttling.mjs.map
