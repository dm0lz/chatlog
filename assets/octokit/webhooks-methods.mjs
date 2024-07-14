/* esm.sh - esbuild bundle(@octokit/webhooks-methods@5.1.0) es2022 production */
var n = new TextEncoder();
function a(t) {
  let e = t.match(/[\dA-F]{2}/gi).map(function (o) {
    return parseInt(o, 16);
  });
  return new Uint8Array(e);
}
function s(t) {
  return Array.prototype.map
    .call(new Uint8Array(t), (r) => r.toString(16).padStart(2, "0"))
    .join("");
}
async function i(t) {
  return crypto.subtle.importKey(
    "raw",
    n.encode(t),
    { name: "HMAC", hash: { name: "SHA-256" } },
    !1,
    ["sign", "verify"]
  );
}
async function c(t, r) {
  if (!t || !r)
    throw new TypeError(
      "[@octokit/webhooks-methods] secret & payload required for sign()"
    );
  if (typeof r != "string")
    throw new TypeError("[@octokit/webhooks-methods] payload must be a string");
  let e = "sha256",
    o = await crypto.subtle.sign("HMAC", await i(t), n.encode(r));
  return `${e}=${s(o)}`;
}
async function y(t, r, e) {
  if (!t || !r || !e)
    throw new TypeError(
      "[@octokit/webhooks-methods] secret, eventPayload & signature required"
    );
  if (typeof r != "string")
    throw new TypeError(
      "[@octokit/webhooks-methods] eventPayload must be a string"
    );
  return await crypto.subtle.verify(
    "HMAC",
    await i(t),
    a(e.replace("sha256=", "")),
    n.encode(r)
  );
}
export { c as sign, y as verify };
//# sourceMappingURL=webhooks-methods.mjs.map
