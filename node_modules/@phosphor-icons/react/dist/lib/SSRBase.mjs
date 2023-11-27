var v = Object.defineProperty;
var o = Object.getOwnPropertySymbols;
var n = Object.prototype.hasOwnProperty, c = Object.prototype.propertyIsEnumerable;
var i = (e, t, r) => t in e ? v(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, m = (e, t) => {
  for (var r in t || (t = {}))
    n.call(t, r) && i(e, r, t[r]);
  if (o)
    for (var r of o(t))
      c.call(t, r) && i(e, r, t[r]);
  return e;
};
var w = (e, t) => {
  var r = {};
  for (var l in e)
    n.call(e, l) && t.indexOf(l) < 0 && (r[l] = e[l]);
  if (e != null && o)
    for (var l of o(e))
      t.indexOf(l) < 0 && c.call(e, l) && (r[l] = e[l]);
  return r;
};
import g, { forwardRef as R } from "react";
const S = R((e, t) => {
  const a = e, {
    alt: r,
    color: l = "currentColor",
    size: s = "1em",
    weight: d = "regular",
    mirrored: f = !1,
    children: h,
    weights: p
  } = a, u = w(a, [
    "alt",
    "color",
    "size",
    "weight",
    "mirrored",
    "children",
    "weights"
  ]);
  return /* @__PURE__ */ g.createElement(
    "svg",
    m({
      ref: t,
      xmlns: "http://www.w3.org/2000/svg",
      width: s,
      height: s,
      fill: l,
      viewBox: "0 0 256 256",
      transform: f ? "scale(-1, 1)" : void 0
    }, u),
    !!r && /* @__PURE__ */ g.createElement("title", null, r),
    h,
    p.get(d)
  );
});
S.displayName = "SSRBase";
export {
  S as default
};
