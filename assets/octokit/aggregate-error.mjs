/* esm.sh - esbuild bundle(aggregate-error@5.0.0) es2022 production */
import i from "./indent-string.mjs";
import c from "./clean-stack.mjs";
var g = (s) =>
    s.replaceAll(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, ""),
  a = class extends Error {
    #t;
    name = "AggregateError";
    constructor(n) {
      if (!Array.isArray(n))
        throw new TypeError(`Expected input to be an Array, got ${typeof n}`);
      n = n.map((t) =>
        t instanceof Error
          ? t
          : t !== null && typeof t == "object"
          ? Object.assign(new Error(t.message), t)
          : new Error(t)
      );
      let e = n.map((t) =>
        typeof t.stack == "string" && t.stack.length > 0
          ? g(c(t.stack))
          : String(t)
      ).join(`
    `);
      (e =
        `
    ` + i(e, 4)),
        super(e),
        (this.#t = n);
    }
    get errors() {
      return [...this.#t];
    }
  };
export { a as default };
//# sourceMappingURL=aggregate-error.mjs.map
