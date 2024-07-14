/* esm.sh - esbuild bundle(@octokit/request-error@6.1.1) es2022 production */
var s = class extends Error {
  name;
  status;
  request;
  response;
  constructor(t, a, e) {
    super(t),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, this.constructor),
      (this.name = "HttpError"),
      (this.status = a),
      "response" in e && (this.response = e.response);
    let r = Object.assign({}, e.request);
    e.request.headers.authorization &&
      (r.headers = Object.assign({}, e.request.headers, {
        authorization: e.request.headers.authorization.replace(
          / .*$/,
          " [REDACTED]"
        ),
      })),
      (r.url = r.url
        .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]")
        .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]")),
      (this.request = r);
  }
};
export { s as RequestError };
//# sourceMappingURL=request-error.mjs.map
