/* esm.sh - esbuild bundle(@octokit/oauth-authorization-url@7.1.0) es2022 production */
function c(r) {
  let t = r.clientType || "oauth-app",
    u = r.baseUrl || "https://github.com",
    l = {
      clientType: t,
      allowSignup: r.allowSignup !== !1,
      clientId: r.clientId,
      login: r.login || null,
      redirectUrl: r.redirectUrl || null,
      state: r.state || Math.random().toString(36).substr(2),
      url: "",
    };
  if (t === "oauth-app") {
    let e = "scopes" in r ? r.scopes : [];
    l.scopes = typeof e == "string" ? e.split(/[,\s]+/).filter(Boolean) : e;
  }
  return (l.url = i(`${u}/login/oauth/authorize`, l)), l;
}
function i(r, t) {
  let u = {
      allowSignup: "allow_signup",
      clientId: "client_id",
      login: "login",
      redirectUrl: "redirect_uri",
      scopes: "scope",
      state: "state",
    },
    l = r;
  return (
    Object.keys(u)
      .filter((e) => t[e] !== null)
      .filter((e) =>
        e !== "scopes"
          ? !0
          : t.clientType === "github-app"
          ? !1
          : !Array.isArray(t[e]) || t[e].length > 0
      )
      .map((e) => [u[e], `${t[e]}`])
      .forEach(([e, n], a) => {
        (l += a === 0 ? "?" : "&"), (l += `${e}=${encodeURIComponent(n)}`);
      }),
    l
  );
}
export { c as oauthAuthorizationUrl };
//# sourceMappingURL=oauth-authorization-url.mjs.map
