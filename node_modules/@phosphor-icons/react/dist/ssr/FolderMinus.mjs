var s = Object.defineProperty, f = Object.defineProperties;
var p = Object.getOwnPropertyDescriptors;
var t = Object.getOwnPropertySymbols;
var d = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable;
var m = (r, e, o) => e in r ? s(r, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[e] = o, a = (r, e) => {
  for (var o in e || (e = {}))
    d.call(e, o) && m(r, o, e[o]);
  if (t)
    for (var o of t(e))
      l.call(e, o) && m(r, o, e[o]);
  return r;
}, i = (r, e) => f(r, p(e));
import n, { forwardRef as c } from "react";
import R from "../lib/SSRBase.mjs";
import u from "../defs/FolderMinus.mjs";
const w = c((r, e) => /* @__PURE__ */ n.createElement(R, i(a({ ref: e }, r), { weights: u })));
w.displayName = "FolderMinus";
export {
  w as FolderMinus
};
