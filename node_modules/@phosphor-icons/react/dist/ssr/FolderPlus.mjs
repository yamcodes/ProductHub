var l = Object.defineProperty, f = Object.defineProperties;
var i = Object.getOwnPropertyDescriptors;
var t = Object.getOwnPropertySymbols;
var p = Object.prototype.hasOwnProperty, d = Object.prototype.propertyIsEnumerable;
var m = (r, e, o) => e in r ? l(r, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[e] = o, a = (r, e) => {
  for (var o in e || (e = {}))
    p.call(e, o) && m(r, o, e[o]);
  if (t)
    for (var o of t(e))
      d.call(e, o) && m(r, o, e[o]);
  return r;
}, s = (r, e) => f(r, i(e));
import c, { forwardRef as R } from "react";
import n from "../lib/SSRBase.mjs";
import u from "../defs/FolderPlus.mjs";
const w = R((r, e) => /* @__PURE__ */ c.createElement(n, s(a({ ref: e }, r), { weights: u })));
w.displayName = "FolderPlus";
export {
  w as FolderPlus
};
