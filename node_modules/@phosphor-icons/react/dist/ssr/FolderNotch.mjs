var f = Object.defineProperty, i = Object.defineProperties;
var p = Object.getOwnPropertyDescriptors;
var t = Object.getOwnPropertySymbols;
var s = Object.prototype.hasOwnProperty, d = Object.prototype.propertyIsEnumerable;
var m = (e, o, r) => o in e ? f(e, o, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[o] = r, a = (e, o) => {
  for (var r in o || (o = {}))
    s.call(o, r) && m(e, r, o[r]);
  if (t)
    for (var r of t(o))
      d.call(o, r) && m(e, r, o[r]);
  return e;
}, c = (e, o) => i(e, p(o));
import l, { forwardRef as h } from "react";
import N from "../lib/SSRBase.mjs";
import R from "../defs/FolderNotch.mjs";
const n = h((e, o) => /* @__PURE__ */ l.createElement(N, c(a({ ref: o }, e), { weights: R })));
n.displayName = "FolderNotch";
export {
  n as FolderNotch
};
