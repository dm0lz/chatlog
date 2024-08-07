/* esm.sh - esbuild bundle(indent-string@5.0.0) es2022 production */
function i(t, e = 1, o = {}) {
  let { indent: r = " ", includeEmptyLines: n = !1 } = o;
  if (typeof t != "string")
    throw new TypeError(
      `Expected \`input\` to be a \`string\`, got \`${typeof t}\``
    );
  if (typeof e != "number")
    throw new TypeError(
      `Expected \`count\` to be a \`number\`, got \`${typeof e}\``
    );
  if (e < 0)
    throw new RangeError(`Expected \`count\` to be at least 0, got \`${e}\``);
  if (typeof r != "string")
    throw new TypeError(
      `Expected \`options.indent\` to be a \`string\`, got \`${typeof r}\``
    );
  if (e === 0) return t;
  let p = n ? /^/gm : /^(?!\s*$)/gm;
  return t.replace(p, r.repeat(e));
}
export { i as default };
//# sourceMappingURL=indent-string.mjs.map
