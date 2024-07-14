/* esm.sh - esbuild bundle(@octokit/auth-unauthenticated@6.1.0) es2022 production */
import "./request-error.mjs";
import "./request-error.mjs";
async function u(e) {
  return { type: "unauthenticated", reason: e };
}
function c(e) {
  return e.status !== 403 || !e.response
    ? !1
    : e.response.headers["x-ratelimit-remaining"] === "0";
}
var h = /\babuse\b/i;
function o(e) {
  return e.status !== 403 ? !1 : h.test(e.message);
}
async function f(e, a, s, i) {
  let n = a.endpoint.merge(s, i);
  return a(n).catch((t) => {
    throw t.status === 404
      ? ((t.message = `Not found. May be due to lack of authentication. Reason: ${e}`),
        t)
      : c(t)
      ? ((t.message = `API rate limit exceeded. This maybe caused by the lack of authentication. Reason: ${e}`),
        t)
      : o(t)
      ? ((t.message = `You have triggered an abuse detection mechanism. This maybe caused by the lack of authentication. Reason: ${e}`),
        t)
      : t.status === 401
      ? ((t.message = `Unauthorized. "${n.method} ${n.url}" failed most likely due to lack of authentication. Reason: ${e}`),
        t)
      : (t.status >= 400 &&
          t.status < 500 &&
          (t.message = t.message.replace(
            /\.?$/,
            `. May be caused by lack of authentication (${e}).`
          )),
        t);
  });
}
var g = function (a) {
  if (!a || !a.reason)
    throw new Error(
      "[@octokit/auth-unauthenticated] No reason passed to createUnauthenticatedAuth"
    );
  return Object.assign(u.bind(null, a.reason), {
    hook: f.bind(null, a.reason),
  });
};
export { g as createUnauthenticatedAuth };
//# sourceMappingURL=auth-unauthenticated.mjs.map
