var n = function (t2, s, r, e) {
    var u;
    s[0] = 0;
    for (var h = 1; h < s.length; h++) {
      var p = s[h++],
        a = s[h] ? ((s[0] |= p ? 1 : 2), r[s[h++]]) : s[++h];
      p === 3
        ? (e[0] = a)
        : p === 4
        ? (e[1] = Object.assign(e[1] || {}, a))
        : p === 5
        ? ((e[1] = e[1] || {})[s[++h]] = a)
        : p === 6
        ? (e[1][s[++h]] += a + "")
        : p
        ? ((u = t2.apply(a, n(t2, a, r, ["", null]))),
          e.push(u),
          a[0] ? (s[0] |= 2) : ((s[h - 2] = 0), (s[h] = u)))
        : e.push(a);
    }
    return e;
  },
  t = new Map();
function m(s) {
  var r = t.get(this);
  return (
    r || ((r = new Map()), t.set(this, r)),
    (r = n(
      this,
      r.get(s) ||
        (r.set(
          s,
          (r = (function (n2) {
            for (
              var t2,
                s2,
                r2 = 1,
                e = "",
                u = "",
                h = [0],
                p = function (n3) {
                  r2 === 1 &&
                  (n3 || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, "")))
                    ? h.push(0, n3, e)
                    : r2 === 3 && (n3 || e)
                    ? (h.push(3, n3, e), (r2 = 2))
                    : r2 === 2 && e === "..." && n3
                    ? h.push(4, n3, 0)
                    : r2 === 2 && e && !n3
                    ? h.push(5, 0, true, e)
                    : r2 >= 5 &&
                      ((e || (!n3 && r2 === 5)) &&
                        (h.push(r2, 0, e, s2), (r2 = 6)),
                      n3 && (h.push(r2, n3, 0, s2), (r2 = 6))),
                    (e = "");
                },
                a = 0;
              a < n2.length;
              a++
            ) {
              a && (r2 === 1 && p(), p(a));
              for (var l = 0; l < n2[a].length; l++)
                (t2 = n2[a][l]),
                  r2 === 1
                    ? t2 === "<"
                      ? (p(), (h = [h]), (r2 = 3))
                      : (e += t2)
                    : r2 === 4
                    ? e === "--" && t2 === ">"
                      ? ((r2 = 1), (e = ""))
                      : (e = t2 + e[0])
                    : u
                    ? t2 === u
                      ? (u = "")
                      : (e += t2)
                    : t2 === '"' || t2 === "'"
                    ? (u = t2)
                    : t2 === ">"
                    ? (p(), (r2 = 1))
                    : r2 &&
                      (t2 === "="
                        ? ((r2 = 5), (s2 = e), (e = ""))
                        : t2 === "/" && (r2 < 5 || n2[a][l + 1] === ">")
                        ? (p(),
                          r2 === 3 && (h = h[0]),
                          (r2 = h),
                          (h = h[0]).push(2, 0, r2),
                          (r2 = 0))
                        : t2 === " " || t2 === "	" || t2 === "\n" || t2 === "\r"
                        ? (p(), (r2 = 2))
                        : (e += t2)),
                  r2 === 3 && e === "!--" && ((r2 = 4), (h = h[0]));
            }
            return p(), h;
          })(s))
        ),
        r),
      arguments,
      []
    )).length > 1
      ? r
      : r[0]
  );
}
export default m;
