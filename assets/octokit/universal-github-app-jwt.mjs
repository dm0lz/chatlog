/* esm.sh - esbuild bundle(universal-github-app-jwt@2.1.0) es2022 production */
function f(e) {
  return e.includes("-----BEGIN RSA PRIVATE KEY-----");
}
function g(e) {
  return e.includes("-----BEGIN OPENSSH PRIVATE KEY-----");
}
function i(e) {
  let t = new ArrayBuffer(e.length),
    r = new Uint8Array(t);
  for (let n = 0, o = e.length; n < o; n++) r[n] = e.charCodeAt(n);
  return t;
}
function d(e) {
  let t = e
      .trim()
      .split(
        `
    `
      )
      .slice(1, -1)
      .join(""),
    r = atob(t);
  return i(r);
}
function l(e, t) {
  return `${p(e)}.${p(t)}`;
}
function y(e) {
  for (var t = "", r = new Uint8Array(e), n = r.byteLength, o = 0; o < n; o++)
    t += String.fromCharCode(r[o]);
  return m(btoa(t));
}
function m(e) {
  return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function p(e) {
  return m(btoa(JSON.stringify(e)));
}
var { subtle: s } = globalThis.crypto;
async function h({ privateKey: e, payload: t }) {
  let r = e;
  if (f(r))
    throw new Error(
      "[universal-github-app-jwt] Private Key is in PKCS#1 format, but only PKCS#8 is supported. See https://github.com/gr2m/universal-github-app-jwt#private-key-formats"
    );
  if (g(r))
    throw new Error(
      "[universal-github-app-jwt] Private Key is in OpenSSH format, but only PKCS#8 is supported. See https://github.com/gr2m/universal-github-app-jwt#private-key-formats"
    );
  let n = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } },
    o = { alg: "RS256", typ: "JWT" },
    c = d(r),
    a = await s.importKey("pkcs8", c, n, !1, ["sign"]),
    u = l(o, t),
    b = i(u),
    S = await s.sign(n.name, a, b),
    v = y(S);
  return `${u}.${v}`;
}
async function w({
  id: e,
  privateKey: t,
  now: r = Math.floor(Date.now() / 1e3),
}) {
  let n = r - 30,
    o = n + 60 * 10,
    a = await h({ privateKey: t, payload: { iat: n, exp: o, iss: e } });
  return { appId: e, expiration: o, token: a };
}
export { w as default };
//# sourceMappingURL=universal-github-app-jwt.mjs.map
