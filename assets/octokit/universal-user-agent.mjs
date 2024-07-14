/* esm.sh - esbuild bundle(universal-user-agent@7.0.2) es2022 production */
import __Process$ from "./node_process.js";
function e() {
  return typeof navigator == "object" && "userAgent" in navigator
    ? navigator.userAgent
    : typeof __Process$ == "object" && __Process$.version !== void 0
    ? `Node.js/${__Process$.version.substr(1)} (${__Process$.platform}; ${
        __Process$.arch
      })`
    : "<environment undetectable>";
}
export { e as getUserAgent };
//# sourceMappingURL=universal-user-agent.mjs.map
