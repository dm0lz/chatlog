/* esm.sh - esbuild bundle(@octokit/auth-token@5.1.0) es2022 production */
var i = /^v1\./,
  a = /^ghs_/,
  s = /^ghu_/;
async function u(t) {
  let e = t.split(/\./).length === 3,
    n = i.test(t) || a.test(t),
    r = s.test(t);
  return {
    type: "token",
    token: t,
    tokenType: e ? "app" : n ? "installation" : r ? "user-to-server" : "oauth",
  };
}
function h(t) {
  return t.split(/\./).length === 3 ? `bearer ${t}` : `token ${t}`;
}
async function c(t, e, n, r) {
  let o = e.endpoint.merge(n, r);
  return (o.headers.authorization = h(t)), e(o);
}
var p = function (e) {
  if (!e)
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  if (typeof e != "string")
    throw new Error(
      "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
    );
  return (
    (e = e.replace(/^(token|bearer) +/i, "")),
    Object.assign(u.bind(null, e), { hook: c.bind(null, e) })
  );
};
export { p as createTokenAuth };
//# sourceMappingURL=auth-token.mjs.map
