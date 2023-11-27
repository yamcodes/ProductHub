var c = Object.defineProperty, l = Object.defineProperties;
var f = Object.getOwnPropertyDescriptors;
var t = Object.getOwnPropertySymbols;
var i = Object.prototype.hasOwnProperty, p = Object.prototype.propertyIsEnumerable;
var m = (e, o, r) => o in e ? c(e, o, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[o] = r, a = (e, o) => {
  for (var r in o || (o = {}))
    i.call(o, r) && m(e, r, o[r]);
  if (t)
    for (var r of t(o))
      p.call(o, r) && m(e, r, o[r]);
  return e;
}, s = (e, o) => l(e, f(o));
import d, { forwardRef as h } from "react";
import n from "../lib/IconBase.mjs";
import N from "../defs/FolderNotchPlus.mjs";
const u = h((e, o) => /* @__PURE__ */ d.createElement(n, s(a({ ref: o }, e), { weights: N })));
u.displayName = "FolderNotchPlus";
export {
  u as FolderNotchPlus
};
