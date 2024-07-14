/* esm.sh - esbuild bundle(clean-stack@5.2.0) es2022 production */
import f from "./escape-string-regexp.mjs";
var d = () => "",
  l = d;
var i = /\s+at.*[(\s](.*)\)?/,
  p =
    /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
function m(n, { pretty: o = !1, basePath: s, pathFilter: a } = {}) {
  let c = s && new RegExp(`(file://)?${f(s.replace(/\\/g, "/"))}/?`, "g"),
    u = o ? l() : "";
  if (typeof n == "string")
    return n
      .replace(/\\/g, "/")
      .split(
        `
    `
      )
      .filter((t) => {
        let r = t.match(i);
        if (r === null || !r[1]) return !0;
        let e = r[1];
        return e.includes(".app/Contents/Resources/electron.asar") ||
          e.includes(".app/Contents/Resources/default_app.asar") ||
          e.includes("node_modules/electron/dist/resources/electron.asar") ||
          e.includes("node_modules/electron/dist/resources/default_app.asar")
          ? !1
          : a
          ? !p.test(e) && a(e)
          : !p.test(e);
      })
      .filter((t) => t.trim() !== "")
      .map(
        (t) => (
          c && (t = t.replace(c, "")),
          o && (t = t.replace(i, (r, e) => r.replace(e, e.replace(u, "~")))),
          t
        )
      ).join(`
    `);
}
export { m as default };
//# sourceMappingURL=clean-stack.mjs.map
