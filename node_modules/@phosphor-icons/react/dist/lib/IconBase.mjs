var R = Object.defineProperty;
var l = Object.getOwnPropertySymbols;
var f = Object.prototype.hasOwnProperty, g = Object.prototype.propertyIsEnumerable;
var d = (t, r, e) => r in t ? R(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e, s = (t, r) => {
  for (var e in r || (r = {}))
    f.call(r, e) && d(t, e, r[e]);
  if (l)
    for (var e of l(r))
      g.call(r, e) && d(t, e, r[e]);
  return t;
};
var a = (t, r) => {
  var e = {};
  for (var o in t)
    f.call(t, o) && r.indexOf(o) < 0 && (e[o] = t[o]);
  if (t != null && l)
    for (var o of l(t))
      r.indexOf(o) < 0 && g.call(t, o) && (e[o] = t[o]);
  return e;
};
import w, { forwardRef as y, useContext as M } from "react";
import { IconContext as N } from "./context.mjs";
const P = y((t, r) => {
  const m = t, {
    alt: e,
    color: o,
    size: n,
    weight: c,
    mirrored: h,
    children: p,
    weights: u
  } = m, C = a(m, [
    "alt",
    "color",
    "size",
    "weight",
    "mirrored",
    "children",
    "weights"
  ]), x = M(N), {
    color: v = "currentColor",
    size: i,
    weight: B = "regular",
    mirrored: I = !1
  } = x, E = a(x, [
    "color",
    "size",
    "weight",
    "mirrored"
  ]);
  return /* @__PURE__ */ w.createElement(
    "svg",
    s(s({
      ref: r,
      xmlns: "http://www.w3.org/2000/svg",
      width: n != null ? n : i,
      height: n != null ? n : i,
      fill: o != null ? o : v,
      viewBox: "0 0 256 256",
      transform: h || I ? "scale(-1, 1)" : void 0
    }, E), C),
    !!e && /* @__PURE__ */ w.createElement("title", null, e),
    p,
    u.get(c != null ? c : B)
  );
});
P.displayName = "IconBase";
export {
  P as default
};
