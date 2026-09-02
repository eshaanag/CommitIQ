import { l as e, o as n, s as r, t as i } from './index-4N9WolXG.js';
import { h as a } from './api-O1fETKMF.js';
import { n as o, t as s } from './sparkles-B1Azk1yP.js';
import { t as c } from './circle-help-B93POH5e.js';
var l = e(n(), 1);
function u(e, n) {
  var r = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (r != null) {
    var i,
      a,
      o,
      s,
      c = [],
      l = !0,
      u = !1;
    try {
      if (((o = (r = r.call(e)).next), n === 0)) {
        if (Object(r) !== r) return;
        l = !1;
      } else for (; !(l = (i = o.call(r)).done) && (c.push(i.value), c.length !== n); l = !0);
    } catch (e) {
      ((u = !0), (a = e));
    } finally {
      try {
        if (!l && r.return != null && ((s = r.return()), Object(s) !== s)) return;
      } finally {
        if (u) throw a;
      }
    }
    return c;
  }
}
function d(e, n, r) {
  return (
    (n = S(n)),
    n in e
      ? Object.defineProperty(e, n, { value: r, enumerable: !0, configurable: !0, writable: !0 })
      : (e[n] = r),
    e
  );
}
function f(e, n) {
  return h(e) || u(e, n) || _(e, n) || b();
}
function p(e) {
  return m(e) || g(e) || _(e) || y();
}
function m(e) {
  if (Array.isArray(e)) return v(e);
}
function h(e) {
  if (Array.isArray(e)) return e;
}
function g(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function _(e, n) {
  if (e) {
    if (typeof e == `string`) return v(e, n);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if ((r === `Object` && e.constructor && (r = e.constructor.name), r === `Map` || r === `Set`))
      return Array.from(e);
    if (r === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return v(e, n);
  }
}
function v(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var r = 0, i = Array(n); r < n; r++) i[r] = e[r];
  return i;
}
function y() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function b() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function x(e, n) {
  if (typeof e != `object` || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var i = r.call(e, n || `default`);
    if (typeof i != `object`) return i;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (n === `string` ? String : Number)(e);
}
function S(e) {
  var n = x(e, `string`);
  return typeof n == `symbol` ? n : String(n);
}
var C = function (e, n) {
  var r = new Set(n);
  return Object.assign.apply(
    Object,
    [{}].concat(
      p(
        Object.entries(e)
          .filter(function (e) {
            var n = f(e, 1)[0];
            return !r.has(n);
          })
          .map(function (e) {
            var n = f(e, 2),
              r = n[0],
              i = n[1];
            return d({}, r, i);
          })
      )
    )
  );
};
function w(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var r = 0, i = Array(n); r < n; r++) i[r] = e[r];
  return i;
}
function T(e) {
  if (Array.isArray(e)) return e;
}
function E(e) {
  if (Array.isArray(e)) return w(e);
}
function ee(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function te(e, n) {
  var r = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (r != null) {
    var i,
      a,
      o,
      s,
      c = [],
      l = !0,
      u = !1;
    try {
      if (((o = (r = r.call(e)).next), n !== 0))
        for (; !(l = (i = o.call(r)).done) && (c.push(i.value), c.length !== n); l = !0);
    } catch (e) {
      ((u = !0), (a = e));
    } finally {
      try {
        if (!l && r.return != null && ((s = r.return()), Object(s) !== s)) return;
      } finally {
        if (u) throw a;
      }
    }
    return c;
  }
}
function ne() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function re() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ie(e, n) {
  return T(e) || te(e, n) || oe(e, n) || ne();
}
function ae(e) {
  return E(e) || ee(e) || oe(e) || re();
}
function oe(e, n) {
  if (e) {
    if (typeof e == `string`) return w(e, n);
    var r = {}.toString.call(e).slice(8, -1);
    return (
      r === `Object` && e.constructor && (r = e.constructor.name),
      r === `Map` || r === `Set`
        ? Array.from(e)
        : r === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? w(e, n)
          : void 0
    );
  }
}
function se(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = n.wrapperElementType,
    i = r === void 0 ? `div` : r,
    a = n.nodeMapper,
    o =
      a === void 0
        ? function (e) {
            return e;
          }
        : a,
    s = n.methodNames,
    c = s === void 0 ? [] : s,
    u = n.initPropNames,
    d = u === void 0 ? [] : u;
  return (0, l.forwardRef)(function (n, r) {
    var a = (0, l.useRef)(),
      s = (0, l.useMemo)(function () {
        return e(
          Object.fromEntries(
            d
              .filter(function (e) {
                return n.hasOwnProperty(e);
              })
              .map(function (e) {
                return [e, n[e]];
              })
          )
        );
      }, []);
    (ce(function () {
      s(o(a.current));
    }, l.useLayoutEffect),
      ce(function () {
        return s._destructor instanceof Function ? s._destructor : void 0;
      }));
    var u = (0, l.useCallback)(
        function (e) {
          var n = [...arguments].slice(1);
          return s[e] instanceof Function ? s[e].apply(s, n) : void 0;
        },
        [s]
      ),
      f = (0, l.useRef)({});
    return (
      Object.keys(C(n, [].concat(ae(c), ae(d))))
        .filter(function (e) {
          return f.current[e] !== n[e];
        })
        .forEach(function (e) {
          return u(e, n[e]);
        }),
      (f.current = n),
      (0, l.useImperativeHandle)(
        r,
        function () {
          return Object.fromEntries(
            c.map(function (e) {
              return [
                e,
                function () {
                  var n = [...arguments];
                  return u.apply(void 0, [e].concat(n));
                },
              ];
            })
          );
        },
        [u]
      ),
      l.createElement(i, { ref: a })
    );
  });
}
function ce(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : l.useEffect,
    r = (0, l.useRef)(),
    i = (0, l.useRef)(!1),
    a = (0, l.useRef)(!1),
    o = ie((0, l.useState)(0), 2);
  o[0];
  var s = o[1];
  (i.current && (a.current = !0),
    n(function () {
      return (
        (i.current ||= ((r.current = e()), !0)),
        s(function (e) {
          return e + 1;
        }),
        function () {
          a.current && r.current && r.current();
        }
      );
    }, []));
}
var le = {
  svg: `http://www.w3.org/2000/svg`,
  xhtml: `http://www.w3.org/1999/xhtml`,
  xlink: `http://www.w3.org/1999/xlink`,
  xml: `http://www.w3.org/XML/1998/namespace`,
  xmlns: `http://www.w3.org/2000/xmlns/`,
};
function ue(e) {
  var n = (e += ``),
    r = n.indexOf(`:`);
  return (
    r >= 0 && (n = e.slice(0, r)) !== `xmlns` && (e = e.slice(r + 1)),
    le.hasOwnProperty(n) ? { space: le[n], local: e } : e
  );
}
function de(e) {
  return function () {
    var n = this.ownerDocument,
      r = this.namespaceURI;
    return r === `http://www.w3.org/1999/xhtml` &&
      n.documentElement.namespaceURI === `http://www.w3.org/1999/xhtml`
      ? n.createElement(e)
      : n.createElementNS(r, e);
  };
}
function fe(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function pe(e) {
  var n = ue(e);
  return (n.local ? fe : de)(n);
}
function me() {}
function he(e) {
  return e == null
    ? me
    : function () {
        return this.querySelector(e);
      };
}
function ge(e) {
  typeof e != `function` && (e = he(e));
  for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a)
    for (var o = n[a], s = o.length, c = (i[a] = Array(s)), l, u, d = 0; d < s; ++d)
      (l = o[d]) &&
        (u = e.call(l, l.__data__, d, o)) &&
        (`__data__` in l && (u.__data__ = l.__data__), (c[d] = u));
  return new P(i, this._parents);
}
function _e(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ve() {
  return [];
}
function ye(e) {
  return e == null
    ? ve
    : function () {
        return this.querySelectorAll(e);
      };
}
function be(e) {
  return function () {
    return _e(e.apply(this, arguments));
  };
}
function D(e) {
  e = typeof e == `function` ? be(e) : ye(e);
  for (var n = this._groups, r = n.length, i = [], a = [], o = 0; o < r; ++o)
    for (var s = n[o], c = s.length, l, u = 0; u < c; ++u)
      (l = s[u]) && (i.push(e.call(l, l.__data__, u, s)), a.push(l));
  return new P(i, a);
}
function xe(e) {
  return function () {
    return this.matches(e);
  };
}
function Se(e) {
  return function (n) {
    return n.matches(e);
  };
}
var Ce = Array.prototype.find;
function we(e) {
  return function () {
    return Ce.call(this.children, e);
  };
}
function Te() {
  return this.firstElementChild;
}
function Ee(e) {
  return this.select(e == null ? Te : we(typeof e == `function` ? e : Se(e)));
}
var O = Array.prototype.filter;
function k() {
  return Array.from(this.children);
}
function De(e) {
  return function () {
    return O.call(this.children, e);
  };
}
function A(e) {
  return this.selectAll(e == null ? k : De(typeof e == `function` ? e : Se(e)));
}
function Oe(e) {
  typeof e != `function` && (e = xe(e));
  for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a)
    for (var o = n[a], s = o.length, c = (i[a] = []), l, u = 0; u < s; ++u)
      (l = o[u]) && e.call(l, l.__data__, u, o) && c.push(l);
  return new P(i, this._parents);
}
function ke(e) {
  return Array(e.length);
}
function Ae() {
  return new P(this._enter || this._groups.map(ke), this._parents);
}
function je(e, n) {
  ((this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = n));
}
je.prototype = {
  constructor: je,
  appendChild: function (e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function (e, n) {
    return this._parent.insertBefore(e, n);
  },
  querySelector: function (e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function (e) {
    return this._parent.querySelectorAll(e);
  },
};
function Me(e) {
  return function () {
    return e;
  };
}
function Ne(e, n, r, i, a, o) {
  for (var s = 0, c, l = n.length, u = o.length; s < u; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (i[s] = c)) : (r[s] = new je(e, o[s]));
  for (; s < l; ++s) (c = n[s]) && (a[s] = c);
}
function j(e, n, r, i, a, o, s) {
  var c,
    l,
    u = new Map(),
    d = n.length,
    f = o.length,
    p = Array(d),
    m;
  for (c = 0; c < d; ++c)
    (l = n[c]) &&
      ((p[c] = m = s.call(l, l.__data__, c, n) + ``), u.has(m) ? (a[c] = l) : u.set(m, l));
  for (c = 0; c < f; ++c)
    ((m = s.call(e, o[c], c, o) + ``),
      (l = u.get(m)) ? ((i[c] = l), (l.__data__ = o[c]), u.delete(m)) : (r[c] = new je(e, o[c])));
  for (c = 0; c < d; ++c) (l = n[c]) && u.get(p[c]) === l && (a[c] = l);
}
function M(e) {
  return e.__data__;
}
function Pe(e, n) {
  if (!arguments.length) return Array.from(this, M);
  var r = n ? j : Ne,
    i = this._parents,
    a = this._groups;
  typeof e != `function` && (e = Me(e));
  for (var o = a.length, s = Array(o), c = Array(o), l = Array(o), u = 0; u < o; ++u) {
    var d = i[u],
      f = a[u],
      p = f.length,
      m = Fe(e.call(d, d && d.__data__, u, i)),
      h = m.length,
      g = (c[u] = Array(h)),
      _ = (s[u] = Array(h));
    r(d, f, g, _, (l[u] = Array(p)), m, n);
    for (var v = 0, y = 0, b, x; v < h; ++v)
      if ((b = g[v])) {
        for (v >= y && (y = v + 1); !(x = _[y]) && ++y < h;);
        b._next = x || null;
      }
  }
  return ((s = new P(s, i)), (s._enter = c), (s._exit = l), s);
}
function Fe(e) {
  return typeof e == `object` && `length` in e ? e : Array.from(e);
}
function Ie() {
  return new P(this._exit || this._groups.map(ke), this._parents);
}
function Le(e, n, r) {
  var i = this.enter(),
    a = this,
    o = this.exit();
  return (
    typeof e == `function` ? ((i = e(i)), (i &&= i.selection())) : (i = i.append(e + ``)),
    n != null && ((a = n(a)), (a &&= a.selection())),
    r == null ? o.remove() : r(o),
    i && a ? i.merge(a).order() : a
  );
}
function Re(e) {
  for (
    var n = e.selection ? e.selection() : e,
      r = this._groups,
      i = n._groups,
      a = r.length,
      o = i.length,
      s = Math.min(a, o),
      c = Array(a),
      l = 0;
    l < s;
    ++l
  )
    for (var u = r[l], d = i[l], f = u.length, p = (c[l] = Array(f)), m, h = 0; h < f; ++h)
      (m = u[h] || d[h]) && (p[h] = m);
  for (; l < a; ++l) c[l] = r[l];
  return new P(c, this._parents);
}
function ze() {
  for (var e = this._groups, n = -1, r = e.length; ++n < r;)
    for (var i = e[n], a = i.length - 1, o = i[a], s; --a >= 0;)
      (s = i[a]) &&
        (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), (o = s));
  return this;
}
function Be(e) {
  e ||= Ve;
  function n(n, r) {
    return n && r ? e(n.__data__, r.__data__) : !n - !r;
  }
  for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) {
    for (var s = r[o], c = s.length, l = (a[o] = Array(c)), u, d = 0; d < c; ++d)
      (u = s[d]) && (l[d] = u);
    l.sort(n);
  }
  return new P(a, this._parents).order();
}
function Ve(e, n) {
  return e < n ? -1 : e > n ? 1 : e >= n ? 0 : NaN;
}
function He() {
  var e = arguments[0];
  return ((arguments[0] = this), e.apply(null, arguments), this);
}
function Ue() {
  return Array.from(this);
}
function We() {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, o = i.length; a < o; ++a) {
      var s = i[a];
      if (s) return s;
    }
  return null;
}
function Ge() {
  let e = 0;
  for (let n of this) ++e;
  return e;
}
function N() {
  return !this.node();
}
function Ke(e) {
  for (var n = this._groups, r = 0, i = n.length; r < i; ++r)
    for (var a = n[r], o = 0, s = a.length, c; o < s; ++o)
      (c = a[o]) && e.call(c, c.__data__, o, a);
  return this;
}
function qe(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function Je(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ye(e, n) {
  return function () {
    this.setAttribute(e, n);
  };
}
function Xe(e, n) {
  return function () {
    this.setAttributeNS(e.space, e.local, n);
  };
}
function Ze(e, n) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function Qe(e, n) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function $e(e, n) {
  var r = ue(e);
  if (arguments.length < 2) {
    var i = this.node();
    return r.local ? i.getAttributeNS(r.space, r.local) : i.getAttribute(r);
  }
  return this.each(
    (n == null
      ? r.local
        ? Je
        : qe
      : typeof n == `function`
        ? r.local
          ? Qe
          : Ze
        : r.local
          ? Xe
          : Ye)(r, n)
  );
}
function et(e) {
  return (e.ownerDocument && e.ownerDocument.defaultView) || (e.document && e) || e.defaultView;
}
function tt(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function nt(e, n, r) {
  return function () {
    this.style.setProperty(e, n, r);
  };
}
function rt(e, n, r) {
  return function () {
    var i = n.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, r);
  };
}
function it(e, n, r) {
  return arguments.length > 1
    ? this.each((n == null ? tt : typeof n == `function` ? rt : nt)(e, n, r ?? ``))
    : at(this.node(), e);
}
function at(e, n) {
  return e.style.getPropertyValue(n) || et(e).getComputedStyle(e, null).getPropertyValue(n);
}
function ot(e) {
  return function () {
    delete this[e];
  };
}
function st(e, n) {
  return function () {
    this[e] = n;
  };
}
function ct(e, n) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? delete this[e] : (this[e] = r);
  };
}
function lt(e, n) {
  return arguments.length > 1
    ? this.each((n == null ? ot : typeof n == `function` ? ct : st)(e, n))
    : this.node()[e];
}
function ut(e) {
  return e.trim().split(/^|\s+/);
}
function dt(e) {
  return e.classList || new ft(e);
}
function ft(e) {
  ((this._node = e), (this._names = ut(e.getAttribute(`class`) || ``)));
}
ft.prototype = {
  add: function (e) {
    this._names.indexOf(e) < 0 &&
      (this._names.push(e), this._node.setAttribute(`class`, this._names.join(` `)));
  },
  remove: function (e) {
    var n = this._names.indexOf(e);
    n >= 0 && (this._names.splice(n, 1), this._node.setAttribute(`class`, this._names.join(` `)));
  },
  contains: function (e) {
    return this._names.indexOf(e) >= 0;
  },
};
function pt(e, n) {
  for (var r = dt(e), i = -1, a = n.length; ++i < a;) r.add(n[i]);
}
function mt(e, n) {
  for (var r = dt(e), i = -1, a = n.length; ++i < a;) r.remove(n[i]);
}
function ht(e) {
  return function () {
    pt(this, e);
  };
}
function gt(e) {
  return function () {
    mt(this, e);
  };
}
function _t(e, n) {
  return function () {
    (n.apply(this, arguments) ? pt : mt)(this, e);
  };
}
function vt(e, n) {
  var r = ut(e + ``);
  if (arguments.length < 2) {
    for (var i = dt(this.node()), a = -1, o = r.length; ++a < o;) if (!i.contains(r[a])) return !1;
    return !0;
  }
  return this.each((typeof n == `function` ? _t : n ? ht : gt)(r, n));
}
function yt() {
  this.textContent = ``;
}
function bt(e) {
  return function () {
    this.textContent = e;
  };
}
function xt(e) {
  return function () {
    var n = e.apply(this, arguments);
    this.textContent = n ?? ``;
  };
}
function St(e) {
  return arguments.length
    ? this.each(e == null ? yt : (typeof e == `function` ? xt : bt)(e))
    : this.node().textContent;
}
function Ct() {
  this.innerHTML = ``;
}
function wt(e) {
  return function () {
    this.innerHTML = e;
  };
}
function Tt(e) {
  return function () {
    var n = e.apply(this, arguments);
    this.innerHTML = n ?? ``;
  };
}
function Et(e) {
  return arguments.length
    ? this.each(e == null ? Ct : (typeof e == `function` ? Tt : wt)(e))
    : this.node().innerHTML;
}
function Dt() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ot() {
  return this.each(Dt);
}
function kt() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function At() {
  return this.each(kt);
}
function jt(e) {
  var n = typeof e == `function` ? e : pe(e);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Mt() {
  return null;
}
function Nt(e, n) {
  var r = typeof e == `function` ? e : pe(e),
    i = n == null ? Mt : typeof n == `function` ? n : he(n);
  return this.select(function () {
    return this.insertBefore(r.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Pt() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Ft() {
  return this.each(Pt);
}
function It() {
  var e = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(e, this.nextSibling) : e;
}
function Lt() {
  var e = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(e, this.nextSibling) : e;
}
function Rt(e) {
  return this.select(e ? Lt : It);
}
function zt(e) {
  return arguments.length ? this.property(`__data__`, e) : this.node().__data__;
}
function Bt(e) {
  return function (n) {
    e.call(this, n, this.__data__);
  };
}
function Vt(e) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var n = ``,
        r = e.indexOf(`.`);
      return (r >= 0 && ((n = e.slice(r + 1)), (e = e.slice(0, r))), { type: e, name: n });
    });
}
function Ht(e) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var r = 0, i = -1, a = n.length, o; r < a; ++r)
        ((o = n[r]),
          (!e.type || o.type === e.type) && o.name === e.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++i] = o));
      ++i ? (n.length = i) : delete this.__on;
    }
  };
}
function Ut(e, n, r) {
  return function () {
    var i = this.__on,
      a,
      o = Bt(n);
    if (i) {
      for (var s = 0, c = i.length; s < c; ++s)
        if ((a = i[s]).type === e.type && a.name === e.name) {
          (this.removeEventListener(a.type, a.listener, a.options),
            this.addEventListener(a.type, (a.listener = o), (a.options = r)),
            (a.value = n));
          return;
        }
    }
    (this.addEventListener(e.type, o, r),
      (a = { type: e.type, name: e.name, value: n, listener: o, options: r }),
      i ? i.push(a) : (this.__on = [a]));
  };
}
function Wt(e, n, r) {
  var i = Vt(e + ``),
    a,
    o = i.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var l = 0, u = c.length, d; l < u; ++l)
        for (a = 0, d = c[l]; a < o; ++a)
          if ((s = i[a]).type === d.type && s.name === d.name) return d.value;
    }
    return;
  }
  for (c = n ? Ut : Ht, a = 0; a < o; ++a) this.each(c(i[a], n, r));
  return this;
}
function Gt(e, n, r) {
  var i = et(e),
    a = i.CustomEvent;
  (typeof a == `function`
    ? (a = new a(n, r))
    : ((a = i.document.createEvent(`Event`)),
      r
        ? (a.initEvent(n, r.bubbles, r.cancelable), (a.detail = r.detail))
        : a.initEvent(n, !1, !1)),
    e.dispatchEvent(a));
}
function Kt(e, n) {
  return function () {
    return Gt(this, e, n);
  };
}
function qt(e, n) {
  return function () {
    return Gt(this, e, n.apply(this, arguments));
  };
}
function Jt(e, n) {
  return this.each((typeof n == `function` ? qt : Kt)(e, n));
}
function* Yt() {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && (yield s);
}
var Xt = [null];
function P(e, n) {
  ((this._groups = e), (this._parents = n));
}
function Zt() {
  return new P([[document.documentElement]], Xt);
}
function Qt() {
  return this;
}
P.prototype = Zt.prototype = {
  constructor: P,
  select: ge,
  selectAll: D,
  selectChild: Ee,
  selectChildren: A,
  filter: Oe,
  data: Pe,
  enter: Ae,
  exit: Ie,
  join: Le,
  merge: Re,
  selection: Qt,
  order: ze,
  sort: Be,
  call: He,
  nodes: Ue,
  node: We,
  size: Ge,
  empty: N,
  each: Ke,
  attr: $e,
  style: it,
  property: lt,
  classed: vt,
  text: St,
  html: Et,
  raise: Ot,
  lower: At,
  append: jt,
  insert: Nt,
  remove: Ft,
  clone: Rt,
  datum: zt,
  on: Wt,
  dispatch: Jt,
  [Symbol.iterator]: Yt,
};
function F(e) {
  return typeof e == `string`
    ? new P([[document.querySelector(e)]], [document.documentElement])
    : new P([[e]], Xt);
}
function $t(e) {
  let n;
  for (; (n = e.sourceEvent);) e = n;
  return e;
}
function en(e, n) {
  if (((e = $t(e)), n === void 0 && (n = e.currentTarget), n)) {
    var r = n.ownerSVGElement || n;
    if (r.createSVGPoint) {
      var i = r.createSVGPoint();
      return (
        (i.x = e.clientX),
        (i.y = e.clientY),
        (i = i.matrixTransform(n.getScreenCTM().inverse())),
        [i.x, i.y]
      );
    }
    if (n.getBoundingClientRect) {
      var a = n.getBoundingClientRect();
      return [e.clientX - a.left - n.clientLeft, e.clientY - a.top - n.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
var tn = { value: () => {} };
function nn() {
  for (var e = 0, n = arguments.length, r = {}, i; e < n; ++e) {
    if (!(i = arguments[e] + ``) || i in r || /[\s.]/.test(i)) throw Error(`illegal type: ` + i);
    r[i] = [];
  }
  return new rn(r);
}
function rn(e) {
  this._ = e;
}
function an(e, n) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = ``,
        i = e.indexOf(`.`);
      if ((i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))), e && !n.hasOwnProperty(e)))
        throw Error(`unknown type: ` + e);
      return { type: e, name: r };
    });
}
rn.prototype = nn.prototype = {
  constructor: rn,
  on: function (e, n) {
    var r = this._,
      i = an(e + ``, r),
      a,
      o = -1,
      s = i.length;
    if (arguments.length < 2) {
      for (; ++o < s;) if ((a = (e = i[o]).type) && (a = on(r[a], e.name))) return a;
      return;
    }
    if (n != null && typeof n != `function`) throw Error(`invalid callback: ` + n);
    for (; ++o < s;)
      if ((a = (e = i[o]).type)) r[a] = sn(r[a], e.name, n);
      else if (n == null) for (a in r) r[a] = sn(r[a], e.name, null);
    return this;
  },
  copy: function () {
    var e = {},
      n = this._;
    for (var r in n) e[r] = n[r].slice();
    return new rn(e);
  },
  call: function (e, n) {
    if ((a = arguments.length - 2) > 0)
      for (var r = Array(a), i = 0, a, o; i < a; ++i) r[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e)) throw Error(`unknown type: ` + e);
    for (o = this._[e], i = 0, a = o.length; i < a; ++i) o[i].value.apply(n, r);
  },
  apply: function (e, n, r) {
    if (!this._.hasOwnProperty(e)) throw Error(`unknown type: ` + e);
    for (var i = this._[e], a = 0, o = i.length; a < o; ++a) i[a].value.apply(n, r);
  },
};
function on(e, n) {
  for (var r = 0, i = e.length, a; r < i; ++r) if ((a = e[r]).name === n) return a.value;
}
function sn(e, n, r) {
  for (var i = 0, a = e.length; i < a; ++i)
    if (e[i].name === n) {
      ((e[i] = tn), (e = e.slice(0, i).concat(e.slice(i + 1))));
      break;
    }
  return (r != null && e.push({ name: n, value: r }), e);
}
var cn = { passive: !1 },
  ln = { capture: !0, passive: !1 };
function un(e) {
  e.stopImmediatePropagation();
}
function dn(e) {
  (e.preventDefault(), e.stopImmediatePropagation());
}
function fn(e) {
  var n = e.document.documentElement,
    r = F(e).on(`dragstart.drag`, dn, ln);
  `onselectstart` in n
    ? r.on(`selectstart.drag`, dn, ln)
    : ((n.__noselect = n.style.MozUserSelect), (n.style.MozUserSelect = `none`));
}
function pn(e, n) {
  var r = e.document.documentElement,
    i = F(e).on(`dragstart.drag`, null);
  (n &&
    (i.on(`click.drag`, dn, ln),
    setTimeout(function () {
      i.on(`click.drag`, null);
    }, 0)),
    `onselectstart` in r
      ? i.on(`selectstart.drag`, null)
      : ((r.style.MozUserSelect = r.__noselect), delete r.__noselect));
}
var mn = (e) => () => e;
function hn(
  e,
  {
    sourceEvent: n,
    subject: r,
    target: i,
    identifier: a,
    active: o,
    x: s,
    y: c,
    dx: l,
    dy: u,
    dispatch: d,
  }
) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    subject: { value: r, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    identifier: { value: a, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: c, enumerable: !0, configurable: !0 },
    dx: { value: l, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: d },
  });
}
hn.prototype.on = function () {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function gn(e) {
  return !e.ctrlKey && !e.button;
}
function _n() {
  return this.parentNode;
}
function vn(e, n) {
  return n ?? { x: e.x, y: e.y };
}
function yn() {
  return navigator.maxTouchPoints || `ontouchstart` in this;
}
function bn() {
  var e = gn,
    n = _n,
    r = vn,
    i = yn,
    a = {},
    o = nn(`start`, `drag`, `end`),
    s = 0,
    c,
    l,
    u,
    d,
    f = 0;
  function p(e) {
    e.on(`mousedown.drag`, m)
      .filter(i)
      .on(`touchstart.drag`, _)
      .on(`touchmove.drag`, v, cn)
      .on(`touchend.drag touchcancel.drag`, y)
      .style(`touch-action`, `none`)
      .style(`-webkit-tap-highlight-color`, `rgba(0,0,0,0)`);
  }
  function m(r, i) {
    if (!(d || !e.call(this, r, i))) {
      var a = b(this, n.call(this, r, i), r, i, `mouse`);
      a &&
        (F(r.view).on(`mousemove.drag`, h, ln).on(`mouseup.drag`, g, ln),
        fn(r.view),
        un(r),
        (u = !1),
        (c = r.clientX),
        (l = r.clientY),
        a(`start`, r));
    }
  }
  function h(e) {
    if ((dn(e), !u)) {
      var n = e.clientX - c,
        r = e.clientY - l;
      u = n * n + r * r > f;
    }
    a.mouse(`drag`, e);
  }
  function g(e) {
    (F(e.view).on(`mousemove.drag mouseup.drag`, null), pn(e.view, u), dn(e), a.mouse(`end`, e));
  }
  function _(r, i) {
    if (e.call(this, r, i)) {
      var a = r.changedTouches,
        o = n.call(this, r, i),
        s = a.length,
        c,
        l;
      for (c = 0; c < s; ++c)
        (l = b(this, o, r, i, a[c].identifier, a[c])) && (un(r), l(`start`, r, a[c]));
    }
  }
  function v(e) {
    var n = e.changedTouches,
      r = n.length,
      i,
      o;
    for (i = 0; i < r; ++i) (o = a[n[i].identifier]) && (dn(e), o(`drag`, e, n[i]));
  }
  function y(e) {
    var n = e.changedTouches,
      r = n.length,
      i,
      o;
    for (
      d && clearTimeout(d),
        d = setTimeout(function () {
          d = null;
        }, 500),
        i = 0;
      i < r;
      ++i
    )
      (o = a[n[i].identifier]) && (un(e), o(`end`, e, n[i]));
  }
  function b(e, n, i, c, l, u) {
    var d = o.copy(),
      f = en(u || i, n),
      m,
      h,
      g;
    if (
      (g = r.call(
        e,
        new hn(`beforestart`, {
          sourceEvent: i,
          target: p,
          identifier: l,
          active: s,
          x: f[0],
          y: f[1],
          dx: 0,
          dy: 0,
          dispatch: d,
        }),
        c
      )) != null
    )
      return (
        (m = g.x - f[0] || 0),
        (h = g.y - f[1] || 0),
        function r(i, o, u) {
          var _ = f,
            v;
          switch (i) {
            case `start`:
              ((a[l] = r), (v = s++));
              break;
            case `end`:
              (delete a[l], --s);
            case `drag`:
              ((f = en(u || o, n)), (v = s));
              break;
          }
          d.call(
            i,
            e,
            new hn(i, {
              sourceEvent: o,
              subject: g,
              target: p,
              identifier: l,
              active: v,
              x: f[0] + m,
              y: f[1] + h,
              dx: f[0] - _[0],
              dy: f[1] - _[1],
              dispatch: d,
            }),
            c
          );
        }
      );
  }
  return (
    (p.filter = function (n) {
      return arguments.length ? ((e = typeof n == `function` ? n : mn(!!n)), p) : e;
    }),
    (p.container = function (e) {
      return arguments.length ? ((n = typeof e == `function` ? e : mn(e)), p) : n;
    }),
    (p.subject = function (e) {
      return arguments.length ? ((r = typeof e == `function` ? e : mn(e)), p) : r;
    }),
    (p.touchable = function (e) {
      return arguments.length ? ((i = typeof e == `function` ? e : mn(!!e)), p) : i;
    }),
    (p.on = function () {
      var e = o.on.apply(o, arguments);
      return e === o ? p : e;
    }),
    (p.clickDistance = function (e) {
      return arguments.length ? ((f = (e = +e) * e), p) : Math.sqrt(f);
    }),
    p
  );
}
function xn(e, n, r) {
  ((e.prototype = n.prototype = r), (r.constructor = e));
}
function Sn(e, n) {
  var r = Object.create(e.prototype);
  for (var i in n) r[i] = n[i];
  return r;
}
function Cn() {}
var wn = 0.7,
  Tn = 1 / wn,
  En = `\\s*([+-]?\\d+)\\s*`,
  Dn = `\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*`,
  On = `\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*`,
  kn = /^#([0-9a-f]{3,8})$/,
  An = RegExp(`^rgb\\(${En},${En},${En}\\)$`),
  jn = RegExp(`^rgb\\(${On},${On},${On}\\)$`),
  Mn = RegExp(`^rgba\\(${En},${En},${En},${Dn}\\)$`),
  Nn = RegExp(`^rgba\\(${On},${On},${On},${Dn}\\)$`),
  Pn = RegExp(`^hsl\\(${Dn},${On},${On}\\)$`),
  Fn = RegExp(`^hsla\\(${Dn},${On},${On},${Dn}\\)$`),
  In = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
xn(Cn, Vn, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ln,
  formatHex: Ln,
  formatHex8: Rn,
  formatHsl: zn,
  formatRgb: Bn,
  toString: Bn,
});
function Ln() {
  return this.rgb().formatHex();
}
function Rn() {
  return this.rgb().formatHex8();
}
function zn() {
  return $n(this).formatHsl();
}
function Bn() {
  return this.rgb().formatRgb();
}
function Vn(e) {
  var n, r;
  return (
    (e = (e + ``).trim().toLowerCase()),
    (n = kn.exec(e))
      ? ((r = n[1].length),
        (n = parseInt(n[1], 16)),
        r === 6
          ? Hn(n)
          : r === 3
            ? new I(
                ((n >> 8) & 15) | ((n >> 4) & 240),
                ((n >> 4) & 15) | (n & 240),
                ((n & 15) << 4) | (n & 15),
                1
              )
            : r === 8
              ? Un((n >> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, (n & 255) / 255)
              : r === 4
                ? Un(
                    ((n >> 12) & 15) | ((n >> 8) & 240),
                    ((n >> 8) & 15) | ((n >> 4) & 240),
                    ((n >> 4) & 15) | (n & 240),
                    (((n & 15) << 4) | (n & 15)) / 255
                  )
                : null)
      : (n = An.exec(e))
        ? new I(n[1], n[2], n[3], 1)
        : (n = jn.exec(e))
          ? new I((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
          : (n = Mn.exec(e))
            ? Un(n[1], n[2], n[3], n[4])
            : (n = Nn.exec(e))
              ? Un((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
              : (n = Pn.exec(e))
                ? Qn(n[1], n[2] / 100, n[3] / 100, 1)
                : (n = Fn.exec(e))
                  ? Qn(n[1], n[2] / 100, n[3] / 100, n[4])
                  : In.hasOwnProperty(e)
                    ? Hn(In[e])
                    : e === `transparent`
                      ? new I(NaN, NaN, NaN, 0)
                      : null
  );
}
function Hn(e) {
  return new I((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function Un(e, n, r, i) {
  return (i <= 0 && (e = n = r = NaN), new I(e, n, r, i));
}
function Wn(e) {
  return (
    e instanceof Cn || (e = Vn(e)),
    e ? ((e = e.rgb()), new I(e.r, e.g, e.b, e.opacity)) : new I()
  );
}
function Gn(e, n, r, i) {
  return arguments.length === 1 ? Wn(e) : new I(e, n, r, i ?? 1);
}
function I(e, n, r, i) {
  ((this.r = +e), (this.g = +n), (this.b = +r), (this.opacity = +i));
}
xn(
  I,
  Gn,
  Sn(Cn, {
    brighter(e) {
      return (
        (e = e == null ? Tn : Tn ** +e),
        new I(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? wn : wn ** +e),
        new I(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new I(Xn(this.r), Xn(this.g), Xn(this.b), Yn(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: Kn,
    formatHex: Kn,
    formatHex8: qn,
    formatRgb: Jn,
    toString: Jn,
  })
);
function Kn() {
  return `#${Zn(this.r)}${Zn(this.g)}${Zn(this.b)}`;
}
function qn() {
  return `#${Zn(this.r)}${Zn(this.g)}${Zn(this.b)}${Zn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Jn() {
  let e = Yn(this.opacity);
  return `${e === 1 ? `rgb(` : `rgba(`}${Xn(this.r)}, ${Xn(this.g)}, ${Xn(this.b)}${e === 1 ? `)` : `, ${e})`}`;
}
function Yn(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Xn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Zn(e) {
  return ((e = Xn(e)), (e < 16 ? `0` : ``) + e.toString(16));
}
function Qn(e, n, r, i) {
  return (
    i <= 0 ? (e = n = r = NaN) : r <= 0 || r >= 1 ? (e = n = NaN) : n <= 0 && (e = NaN),
    new tr(e, n, r, i)
  );
}
function $n(e) {
  if (e instanceof tr) return new tr(e.h, e.s, e.l, e.opacity);
  if ((e instanceof Cn || (e = Vn(e)), !e)) return new tr();
  if (e instanceof tr) return e;
  e = e.rgb();
  var n = e.r / 255,
    r = e.g / 255,
    i = e.b / 255,
    a = Math.min(n, r, i),
    o = Math.max(n, r, i),
    s = NaN,
    c = o - a,
    l = (o + a) / 2;
  return (
    c
      ? ((s = n === o ? (r - i) / c + (r < i) * 6 : r === o ? (i - n) / c + 2 : (n - r) / c + 4),
        (c /= l < 0.5 ? o + a : 2 - o - a),
        (s *= 60))
      : (c = l > 0 && l < 1 ? 0 : s),
    new tr(s, c, l, e.opacity)
  );
}
function er(e, n, r, i) {
  return arguments.length === 1 ? $n(e) : new tr(e, n, r, i ?? 1);
}
function tr(e, n, r, i) {
  ((this.h = +e), (this.s = +n), (this.l = +r), (this.opacity = +i));
}
xn(
  tr,
  er,
  Sn(Cn, {
    brighter(e) {
      return ((e = e == null ? Tn : Tn ** +e), new tr(this.h, this.s, this.l * e, this.opacity));
    },
    darker(e) {
      return ((e = e == null ? wn : wn ** +e), new tr(this.h, this.s, this.l * e, this.opacity));
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        r = this.l,
        i = r + (r < 0.5 ? r : 1 - r) * n,
        a = 2 * r - i;
      return new I(
        ir(e >= 240 ? e - 240 : e + 120, a, i),
        ir(e, a, i),
        ir(e < 120 ? e + 240 : e - 120, a, i),
        this.opacity
      );
    },
    clamp() {
      return new tr(nr(this.h), rr(this.s), rr(this.l), Yn(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      let e = Yn(this.opacity);
      return `${e === 1 ? `hsl(` : `hsla(`}${nr(this.h)}, ${rr(this.s) * 100}%, ${rr(this.l) * 100}%${e === 1 ? `)` : `, ${e})`}`;
    },
  })
);
function nr(e) {
  return ((e = (e || 0) % 360), e < 0 ? e + 360 : e);
}
function rr(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ir(e, n, r) {
  return (
    (e < 60 ? n + ((r - n) * e) / 60 : e < 180 ? r : e < 240 ? n + ((r - n) * (240 - e)) / 60 : n) *
    255
  );
}
var ar = (e) => () => e;
function or(e, n) {
  return function (r) {
    return e + r * n;
  };
}
function sr(e, n, r) {
  return (
    (e **= +r),
    (n = n ** +r - e),
    (r = 1 / r),
    function (i) {
      return (e + i * n) ** +r;
    }
  );
}
function cr(e) {
  return (e = +e) == 1
    ? lr
    : function (n, r) {
        return r - n ? sr(n, r, e) : ar(isNaN(n) ? r : n);
      };
}
function lr(e, n) {
  var r = n - e;
  return r ? or(e, r) : ar(isNaN(e) ? n : e);
}
var ur = (function e(n) {
  var r = cr(n);
  function i(e, n) {
    var i = r((e = Gn(e)).r, (n = Gn(n)).r),
      a = r(e.g, n.g),
      o = r(e.b, n.b),
      s = lr(e.opacity, n.opacity);
    return function (n) {
      return ((e.r = i(n)), (e.g = a(n)), (e.b = o(n)), (e.opacity = s(n)), e + ``);
    };
  }
  return ((i.gamma = e), i);
})(1);
function dr(e, n) {
  return (
    (e = +e),
    (n = +n),
    function (r) {
      return e * (1 - r) + n * r;
    }
  );
}
var fr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  pr = new RegExp(fr.source, `g`);
function mr(e) {
  return function () {
    return e;
  };
}
function hr(e) {
  return function (n) {
    return e(n) + ``;
  };
}
function gr(e, n) {
  var r = (fr.lastIndex = pr.lastIndex = 0),
    i,
    a,
    o,
    s = -1,
    c = [],
    l = [];
  for (e += ``, n += ``; (i = fr.exec(e)) && (a = pr.exec(n));)
    ((o = a.index) > r && ((o = n.slice(r, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (i = i[0]) === (a = a[0])
        ? c[s]
          ? (c[s] += a)
          : (c[++s] = a)
        : ((c[++s] = null), l.push({ i: s, x: dr(i, a) })),
      (r = pr.lastIndex));
  return (
    r < n.length && ((o = n.slice(r)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? l[0]
        ? hr(l[0].x)
        : mr(n)
      : ((n = l.length),
        function (e) {
          for (var r = 0, i; r < n; ++r) c[(i = l[r]).i] = i.x(e);
          return c.join(``);
        })
  );
}
var _r = 180 / Math.PI,
  vr = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
function yr(e, n, r, i, a, o) {
  var s, c, l;
  return (
    (s = Math.sqrt(e * e + n * n)) && ((e /= s), (n /= s)),
    (l = e * r + n * i) && ((r -= e * l), (i -= n * l)),
    (c = Math.sqrt(r * r + i * i)) && ((r /= c), (i /= c), (l /= c)),
    e * i < n * r && ((e = -e), (n = -n), (l = -l), (s = -s)),
    {
      translateX: a,
      translateY: o,
      rotate: Math.atan2(n, e) * _r,
      skewX: Math.atan(l) * _r,
      scaleX: s,
      scaleY: c,
    }
  );
}
var br;
function xr(e) {
  let n = new (typeof DOMMatrix == `function` ? DOMMatrix : WebKitCSSMatrix)(e + ``);
  return n.isIdentity ? vr : yr(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Sr(e) {
  return e == null ||
    ((br ||= document.createElementNS(`http://www.w3.org/2000/svg`, `g`)),
    br.setAttribute(`transform`, e),
    !(e = br.transform.baseVal.consolidate()))
    ? vr
    : ((e = e.matrix), yr(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Cr(e, n, r, i) {
  function a(e) {
    return e.length ? e.pop() + ` ` : ``;
  }
  function o(e, i, a, o, s, c) {
    if (e !== a || i !== o) {
      var l = s.push(`translate(`, null, n, null, r);
      c.push({ i: l - 4, x: dr(e, a) }, { i: l - 2, x: dr(i, o) });
    } else (a || o) && s.push(`translate(` + a + n + o + r);
  }
  function s(e, n, r, o) {
    e === n
      ? n && r.push(a(r) + `rotate(` + n + i)
      : (e - n > 180 ? (n += 360) : n - e > 180 && (e += 360),
        o.push({ i: r.push(a(r) + `rotate(`, null, i) - 2, x: dr(e, n) }));
  }
  function c(e, n, r, o) {
    e === n
      ? n && r.push(a(r) + `skewX(` + n + i)
      : o.push({ i: r.push(a(r) + `skewX(`, null, i) - 2, x: dr(e, n) });
  }
  function l(e, n, r, i, o, s) {
    if (e !== r || n !== i) {
      var c = o.push(a(o) + `scale(`, null, `,`, null, `)`);
      s.push({ i: c - 4, x: dr(e, r) }, { i: c - 2, x: dr(n, i) });
    } else (r !== 1 || i !== 1) && o.push(a(o) + `scale(` + r + `,` + i + `)`);
  }
  return function (n, r) {
    var i = [],
      a = [];
    return (
      (n = e(n)),
      (r = e(r)),
      o(n.translateX, n.translateY, r.translateX, r.translateY, i, a),
      s(n.rotate, r.rotate, i, a),
      c(n.skewX, r.skewX, i, a),
      l(n.scaleX, n.scaleY, r.scaleX, r.scaleY, i, a),
      (n = r = null),
      function (e) {
        for (var n = -1, r = a.length, o; ++n < r;) i[(o = a[n]).i] = o.x(e);
        return i.join(``);
      }
    );
  };
}
var wr = Cr(xr, `px, `, `px)`, `deg)`),
  Tr = Cr(Sr, `, `, `)`, `)`),
  Er = 1e-12;
function Dr(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Or(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function kr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
var Ar = (function e(n, r, i) {
    function a(e, a) {
      var o = e[0],
        s = e[1],
        c = e[2],
        l = a[0],
        u = a[1],
        d = a[2],
        f = l - o,
        p = u - s,
        m = f * f + p * p,
        h,
        g;
      if (m < Er)
        ((g = Math.log(d / c) / n),
          (h = function (e) {
            return [o + e * f, s + e * p, c * Math.exp(n * e * g)];
          }));
      else {
        var _ = Math.sqrt(m),
          v = (d * d - c * c + i * m) / (2 * c * r * _),
          y = (d * d - c * c - i * m) / (2 * d * r * _),
          b = Math.log(Math.sqrt(v * v + 1) - v);
        ((g = (Math.log(Math.sqrt(y * y + 1) - y) - b) / n),
          (h = function (e) {
            var i = e * g,
              a = Dr(b),
              l = (c / (r * _)) * (a * kr(n * i + b) - Or(b));
            return [o + l * f, s + l * p, (c * a) / Dr(n * i + b)];
          }));
      }
      return ((h.duration = (g * 1e3 * n) / Math.SQRT2), h);
    }
    return (
      (a.rho = function (n) {
        var r = Math.max(0.001, +n),
          i = r * r;
        return e(r, i, i * i);
      }),
      a
    );
  })(Math.SQRT2, 2, 4),
  jr = 0,
  Mr = 0,
  Nr = 0,
  Pr = 1e3,
  Fr,
  Ir,
  Lr = 0,
  Rr = 0,
  zr = 0,
  Br = typeof performance == `object` && performance.now ? performance : Date,
  Vr =
    typeof window == `object` && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (e) {
          setTimeout(e, 17);
        };
function Hr() {
  return (Rr ||= (Vr(Ur), Br.now() + zr));
}
function Ur() {
  Rr = 0;
}
function Wr() {
  this._call = this._time = this._next = null;
}
Wr.prototype = Gr.prototype = {
  constructor: Wr,
  restart: function (e, n, r) {
    if (typeof e != `function`) throw TypeError(`callback is not a function`);
    ((r = (r == null ? Hr() : +r) + (n == null ? 0 : +n)),
      !this._next && Ir !== this && (Ir ? (Ir._next = this) : (Fr = this), (Ir = this)),
      (this._call = e),
      (this._time = r),
      Xr());
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Xr());
  },
};
function Gr(e, n, r) {
  var i = new Wr();
  return (i.restart(e, n, r), i);
}
function Kr() {
  (Hr(), ++jr);
  for (var e = Fr, n; e;) ((n = Rr - e._time) >= 0 && e._call.call(void 0, n), (e = e._next));
  --jr;
}
function qr() {
  ((Rr = (Lr = Br.now()) + zr), (jr = Mr = 0));
  try {
    Kr();
  } finally {
    ((jr = 0), Yr(), (Rr = 0));
  }
}
function Jr() {
  var e = Br.now(),
    n = e - Lr;
  n > Pr && ((zr -= n), (Lr = e));
}
function Yr() {
  for (var e, n = Fr, r, i = 1 / 0; n;)
    n._call
      ? (i > n._time && (i = n._time), (e = n), (n = n._next))
      : ((r = n._next), (n._next = null), (n = e ? (e._next = r) : (Fr = r)));
  ((Ir = e), Xr(i));
}
function Xr(e) {
  jr ||
    ((Mr &&= clearTimeout(Mr)),
    e - Rr > 24
      ? (e < 1 / 0 && (Mr = setTimeout(qr, e - Br.now() - zr)), (Nr &&= clearInterval(Nr)))
      : ((Nr ||= ((Lr = Br.now()), setInterval(Jr, Pr))), (jr = 1), Vr(qr)));
}
function Zr(e, n, r) {
  var i = new Wr();
  return (
    (n = n == null ? 0 : +n),
    i.restart(
      (r) => {
        (i.stop(), e(r + n));
      },
      n,
      r
    ),
    i
  );
}
var Qr = nn(`start`, `end`, `cancel`, `interrupt`),
  $r = [];
function ei(e, n, r, i, a, o) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (r in s) return;
  ii(e, r, {
    name: n,
    index: i,
    group: a,
    on: Qr,
    tween: $r,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: 0,
  });
}
function ti(e, n) {
  var r = ri(e, n);
  if (r.state > 0) throw Error(`too late; already scheduled`);
  return r;
}
function ni(e, n) {
  var r = ri(e, n);
  if (r.state > 3) throw Error(`too late; already running`);
  return r;
}
function ri(e, n) {
  var r = e.__transition;
  if (!r || !(r = r[n])) throw Error(`transition not found`);
  return r;
}
function ii(e, n, r) {
  var i = e.__transition,
    a;
  ((i[n] = r), (r.timer = Gr(o, 0, r.time)));
  function o(e) {
    ((r.state = 1), r.timer.restart(s, r.delay, r.time), r.delay <= e && s(e - r.delay));
  }
  function s(o) {
    var u, d, f, p;
    if (r.state !== 1) return l();
    for (u in i)
      if (((p = i[u]), p.name === r.name)) {
        if (p.state === 3) return Zr(s);
        p.state === 4
          ? ((p.state = 6),
            p.timer.stop(),
            p.on.call(`interrupt`, e, e.__data__, p.index, p.group),
            delete i[u])
          : +u < n &&
            ((p.state = 6),
            p.timer.stop(),
            p.on.call(`cancel`, e, e.__data__, p.index, p.group),
            delete i[u]);
      }
    if (
      (Zr(function () {
        r.state === 3 && ((r.state = 4), r.timer.restart(c, r.delay, r.time), c(o));
      }),
      (r.state = 2),
      r.on.call(`start`, e, e.__data__, r.index, r.group),
      r.state === 2)
    ) {
      for (r.state = 3, a = Array((f = r.tween.length)), u = 0, d = -1; u < f; ++u)
        (p = r.tween[u].value.call(e, e.__data__, r.index, r.group)) && (a[++d] = p);
      a.length = d + 1;
    }
  }
  function c(n) {
    for (
      var i =
          n < r.duration
            ? r.ease.call(null, n / r.duration)
            : (r.timer.restart(l), (r.state = 5), 1),
        o = -1,
        s = a.length;
      ++o < s;
    )
      a[o].call(e, i);
    r.state === 5 && (r.on.call(`end`, e, e.__data__, r.index, r.group), l());
  }
  function l() {
    for (var a in ((r.state = 6), r.timer.stop(), delete i[n], i)) return;
    delete e.__transition;
  }
}
function ai(e, n) {
  var r = e.__transition,
    i,
    a,
    o = !0,
    s;
  if (r) {
    for (s in ((n = n == null ? null : n + ``), r)) {
      if ((i = r[s]).name !== n) {
        o = !1;
        continue;
      }
      ((a = i.state > 2 && i.state < 5),
        (i.state = 6),
        i.timer.stop(),
        i.on.call(a ? `interrupt` : `cancel`, e, e.__data__, i.index, i.group),
        delete r[s]);
    }
    o && delete e.__transition;
  }
}
function oi(e) {
  return this.each(function () {
    ai(this, e);
  });
}
function si(e, n) {
  var r, i;
  return function () {
    var a = ni(this, e),
      o = a.tween;
    if (o !== r) {
      i = r = o;
      for (var s = 0, c = i.length; s < c; ++s)
        if (i[s].name === n) {
          ((i = i.slice()), i.splice(s, 1));
          break;
        }
    }
    a.tween = i;
  };
}
function ci(e, n, r) {
  var i, a;
  if (typeof r != `function`) throw Error();
  return function () {
    var o = ni(this, e),
      s = o.tween;
    if (s !== i) {
      a = (i = s).slice();
      for (var c = { name: n, value: r }, l = 0, u = a.length; l < u; ++l)
        if (a[l].name === n) {
          a[l] = c;
          break;
        }
      l === u && a.push(c);
    }
    o.tween = a;
  };
}
function li(e, n) {
  var r = this._id;
  if (((e += ``), arguments.length < 2)) {
    for (var i = ri(this.node(), r).tween, a = 0, o = i.length, s; a < o; ++a)
      if ((s = i[a]).name === e) return s.value;
    return null;
  }
  return this.each((n == null ? si : ci)(r, e, n));
}
function ui(e, n, r) {
  var i = e._id;
  return (
    e.each(function () {
      var e = ni(this, i);
      (e.value ||= {})[n] = r.apply(this, arguments);
    }),
    function (e) {
      return ri(e, i).value[n];
    }
  );
}
function di(e, n) {
  var r;
  return (typeof n == `number` ? dr : n instanceof Vn ? ur : (r = Vn(n)) ? ((n = r), ur) : gr)(
    e,
    n
  );
}
function fi(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function pi(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function mi(e, n, r) {
  var i,
    a = r + ``,
    o;
  return function () {
    var s = this.getAttribute(e);
    return s === a ? null : s === i ? o : (o = n((i = s), r));
  };
}
function hi(e, n, r) {
  var i,
    a = r + ``,
    o;
  return function () {
    var s = this.getAttributeNS(e.space, e.local);
    return s === a ? null : s === i ? o : (o = n((i = s), r));
  };
}
function gi(e, n, r) {
  var i, a, o;
  return function () {
    var s,
      c = r(this),
      l;
    return c == null
      ? void this.removeAttribute(e)
      : ((s = this.getAttribute(e)),
        (l = c + ``),
        s === l ? null : s === i && l === a ? o : ((a = l), (o = n((i = s), c))));
  };
}
function _i(e, n, r) {
  var i, a, o;
  return function () {
    var s,
      c = r(this),
      l;
    return c == null
      ? void this.removeAttributeNS(e.space, e.local)
      : ((s = this.getAttributeNS(e.space, e.local)),
        (l = c + ``),
        s === l ? null : s === i && l === a ? o : ((a = l), (o = n((i = s), c))));
  };
}
function vi(e, n) {
  var r = ue(e),
    i = r === `transform` ? Tr : di;
  return this.attrTween(
    e,
    typeof n == `function`
      ? (r.local ? _i : gi)(r, i, ui(this, `attr.` + e, n))
      : n == null
        ? (r.local ? pi : fi)(r)
        : (r.local ? hi : mi)(r, i, n)
  );
}
function yi(e, n) {
  return function (r) {
    this.setAttribute(e, n.call(this, r));
  };
}
function bi(e, n) {
  return function (r) {
    this.setAttributeNS(e.space, e.local, n.call(this, r));
  };
}
function xi(e, n) {
  var r, i;
  function a() {
    var a = n.apply(this, arguments);
    return (a !== i && (r = (i = a) && bi(e, a)), r);
  }
  return ((a._value = n), a);
}
function Si(e, n) {
  var r, i;
  function a() {
    var a = n.apply(this, arguments);
    return (a !== i && (r = (i = a) && yi(e, a)), r);
  }
  return ((a._value = n), a);
}
function Ci(e, n) {
  var r = `attr.` + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != `function`) throw Error();
  var i = ue(e);
  return this.tween(r, (i.local ? xi : Si)(i, n));
}
function wi(e, n) {
  return function () {
    ti(this, e).delay = +n.apply(this, arguments);
  };
}
function Ti(e, n) {
  return (
    (n = +n),
    function () {
      ti(this, e).delay = n;
    }
  );
}
function Ei(e) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof e == `function` ? wi : Ti)(n, e))
    : ri(this.node(), n).delay;
}
function Di(e, n) {
  return function () {
    ni(this, e).duration = +n.apply(this, arguments);
  };
}
function Oi(e, n) {
  return (
    (n = +n),
    function () {
      ni(this, e).duration = n;
    }
  );
}
function ki(e) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof e == `function` ? Di : Oi)(n, e))
    : ri(this.node(), n).duration;
}
function Ai(e, n) {
  if (typeof n != `function`) throw Error();
  return function () {
    ni(this, e).ease = n;
  };
}
function ji(e) {
  var n = this._id;
  return arguments.length ? this.each(Ai(n, e)) : ri(this.node(), n).ease;
}
function Mi(e, n) {
  return function () {
    var r = n.apply(this, arguments);
    if (typeof r != `function`) throw Error();
    ni(this, e).ease = r;
  };
}
function Ni(e) {
  if (typeof e != `function`) throw Error();
  return this.each(Mi(this._id, e));
}
function Pi(e) {
  typeof e != `function` && (e = xe(e));
  for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a)
    for (var o = n[a], s = o.length, c = (i[a] = []), l, u = 0; u < s; ++u)
      (l = o[u]) && e.call(l, l.__data__, u, o) && c.push(l);
  return new la(i, this._parents, this._name, this._id);
}
function Fi(e) {
  if (e._id !== this._id) throw Error();
  for (
    var n = this._groups,
      r = e._groups,
      i = n.length,
      a = r.length,
      o = Math.min(i, a),
      s = Array(i),
      c = 0;
    c < o;
    ++c
  )
    for (var l = n[c], u = r[c], d = l.length, f = (s[c] = Array(d)), p, m = 0; m < d; ++m)
      (p = l[m] || u[m]) && (f[m] = p);
  for (; c < i; ++c) s[c] = n[c];
  return new la(s, this._parents, this._name, this._id);
}
function Ii(e) {
  return (e + ``)
    .trim()
    .split(/^|\s+/)
    .every(function (e) {
      var n = e.indexOf(`.`);
      return (n >= 0 && (e = e.slice(0, n)), !e || e === `start`);
    });
}
function Li(e, n, r) {
  var i,
    a,
    o = Ii(n) ? ti : ni;
  return function () {
    var s = o(this, e),
      c = s.on;
    (c !== i && (a = (i = c).copy()).on(n, r), (s.on = a));
  };
}
function Ri(e, n) {
  var r = this._id;
  return arguments.length < 2 ? ri(this.node(), r).on.on(e) : this.each(Li(r, e, n));
}
function zi(e) {
  return function () {
    var n = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    n && n.removeChild(this);
  };
}
function Bi() {
  return this.on(`end.remove`, zi(this._id));
}
function Vi(e) {
  var n = this._name,
    r = this._id;
  typeof e != `function` && (e = he(e));
  for (var i = this._groups, a = i.length, o = Array(a), s = 0; s < a; ++s)
    for (var c = i[s], l = c.length, u = (o[s] = Array(l)), d, f, p = 0; p < l; ++p)
      (d = c[p]) &&
        (f = e.call(d, d.__data__, p, c)) &&
        (`__data__` in d && (f.__data__ = d.__data__), (u[p] = f), ei(u[p], n, r, p, u, ri(d, r)));
  return new la(o, this._parents, n, r);
}
function Hi(e) {
  var n = this._name,
    r = this._id;
  typeof e != `function` && (e = ye(e));
  for (var i = this._groups, a = i.length, o = [], s = [], c = 0; c < a; ++c)
    for (var l = i[c], u = l.length, d, f = 0; f < u; ++f)
      if ((d = l[f])) {
        for (var p = e.call(d, d.__data__, f, l), m, h = ri(d, r), g = 0, _ = p.length; g < _; ++g)
          (m = p[g]) && ei(m, n, r, g, p, h);
        (o.push(p), s.push(d));
      }
  return new la(o, s, n, r);
}
var Ui = Zt.prototype.constructor;
function Wi() {
  return new Ui(this._groups, this._parents);
}
function Gi(e, n) {
  var r, i, a;
  return function () {
    var o = at(this, e),
      s = (this.style.removeProperty(e), at(this, e));
    return o === s ? null : o === r && s === i ? a : (a = n((r = o), (i = s)));
  };
}
function Ki(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function qi(e, n, r) {
  var i,
    a = r + ``,
    o;
  return function () {
    var s = at(this, e);
    return s === a ? null : s === i ? o : (o = n((i = s), r));
  };
}
function Ji(e, n, r) {
  var i, a, o;
  return function () {
    var s = at(this, e),
      c = r(this),
      l = c + ``;
    return (
      c ?? (l = c = (this.style.removeProperty(e), at(this, e))),
      s === l ? null : s === i && l === a ? o : ((a = l), (o = n((i = s), c)))
    );
  };
}
function Yi(e, n) {
  var r,
    i,
    a,
    o = `style.` + n,
    s = `end.` + o,
    c;
  return function () {
    var l = ni(this, e),
      u = l.on,
      d = l.value[o] == null ? (c ||= Ki(n)) : void 0;
    ((u !== r || a !== d) && (i = (r = u).copy()).on(s, (a = d)), (l.on = i));
  };
}
function Xi(e, n, r) {
  var i = (e += ``) == `transform` ? wr : di;
  return n == null
    ? this.styleTween(e, Gi(e, i)).on(`end.style.` + e, Ki(e))
    : typeof n == `function`
      ? this.styleTween(e, Ji(e, i, ui(this, `style.` + e, n))).each(Yi(this._id, e))
      : this.styleTween(e, qi(e, i, n), r).on(`end.style.` + e, null);
}
function Zi(e, n, r) {
  return function (i) {
    this.style.setProperty(e, n.call(this, i), r);
  };
}
function Qi(e, n, r) {
  var i, a;
  function o() {
    var o = n.apply(this, arguments);
    return (o !== a && (i = (a = o) && Zi(e, o, r)), i);
  }
  return ((o._value = n), o);
}
function $i(e, n, r) {
  var i = `style.` + (e += ``);
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (n == null) return this.tween(i, null);
  if (typeof n != `function`) throw Error();
  return this.tween(i, Qi(e, n, r ?? ``));
}
function ea(e) {
  return function () {
    this.textContent = e;
  };
}
function ta(e) {
  return function () {
    var n = e(this);
    this.textContent = n ?? ``;
  };
}
function na(e) {
  return this.tween(
    `text`,
    typeof e == `function` ? ta(ui(this, `text`, e)) : ea(e == null ? `` : e + ``)
  );
}
function ra(e) {
  return function (n) {
    this.textContent = e.call(this, n);
  };
}
function ia(e) {
  var n, r;
  function i() {
    var i = e.apply(this, arguments);
    return (i !== r && (n = (r = i) && ra(i)), n);
  }
  return ((i._value = e), i);
}
function aa(e) {
  var n = `text`;
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != `function`) throw Error();
  return this.tween(n, ia(e));
}
function oa() {
  for (
    var e = this._name, n = this._id, r = da(), i = this._groups, a = i.length, o = 0;
    o < a;
    ++o
  )
    for (var s = i[o], c = s.length, l, u = 0; u < c; ++u)
      if ((l = s[u])) {
        var d = ri(l, n);
        ei(l, e, r, u, s, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease,
        });
      }
  return new la(i, this._parents, e, r);
}
function sa() {
  var e,
    n,
    r = this,
    i = r._id,
    a = r.size();
  return new Promise(function (o, s) {
    var c = { value: s },
      l = {
        value: function () {
          --a === 0 && o();
        },
      };
    (r.each(function () {
      var r = ni(this, i),
        a = r.on;
      (a !== e &&
        ((n = (e = a).copy()), n._.cancel.push(c), n._.interrupt.push(c), n._.end.push(l)),
        (r.on = n));
    }),
      a === 0 && o());
  });
}
var ca = 0;
function la(e, n, r, i) {
  ((this._groups = e), (this._parents = n), (this._name = r), (this._id = i));
}
function ua(e) {
  return Zt().transition(e);
}
function da() {
  return ++ca;
}
var fa = Zt.prototype;
la.prototype = ua.prototype = {
  constructor: la,
  select: Vi,
  selectAll: Hi,
  selectChild: fa.selectChild,
  selectChildren: fa.selectChildren,
  filter: Pi,
  merge: Fi,
  selection: Wi,
  transition: oa,
  call: fa.call,
  nodes: fa.nodes,
  node: fa.node,
  size: fa.size,
  empty: fa.empty,
  each: fa.each,
  on: Ri,
  attr: vi,
  attrTween: Ci,
  style: Xi,
  styleTween: $i,
  text: na,
  textTween: aa,
  remove: Bi,
  tween: li,
  delay: Ei,
  duration: ki,
  ease: ji,
  easeVarying: Ni,
  end: sa,
  [Symbol.iterator]: fa[Symbol.iterator],
};
function pa(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var ma = { time: null, delay: 0, duration: 250, ease: pa };
function ha(e, n) {
  for (var r; !(r = e.__transition) || !(r = r[n]);)
    if (!(e = e.parentNode)) throw Error(`transition ${n} not found`);
  return r;
}
function ga(e) {
  var n, r;
  e instanceof la
    ? ((n = e._id), (e = e._name))
    : ((n = da()), ((r = ma).time = Hr()), (e = e == null ? null : e + ``));
  for (var i = this._groups, a = i.length, o = 0; o < a; ++o)
    for (var s = i[o], c = s.length, l, u = 0; u < c; ++u)
      (l = s[u]) && ei(l, e, n, u, s, r || ha(l, n));
  return new la(i, this._parents, e, n);
}
((Zt.prototype.interrupt = oi), (Zt.prototype.transition = ga));
var _a = (e) => () => e;
function va(e, { sourceEvent: n, target: r, transform: i, dispatch: a }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: a },
  });
}
function ya(e, n, r) {
  ((this.k = e), (this.x = n), (this.y = r));
}
ya.prototype = {
  constructor: ya,
  scale: function (e) {
    return e === 1 ? this : new ya(this.k * e, this.x, this.y);
  },
  translate: function (e, n) {
    return (e === 0) & (n === 0) ? this : new ya(this.k, this.x + this.k * e, this.y + this.k * n);
  },
  apply: function (e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function (e) {
    return e * this.k + this.x;
  },
  applyY: function (e) {
    return e * this.k + this.y;
  },
  invert: function (e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function (e) {
    return (e - this.x) / this.k;
  },
  invertY: function (e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function (e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function (e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function () {
    return `translate(` + this.x + `,` + this.y + `) scale(` + this.k + `)`;
  },
};
var ba = new ya(1, 0, 0);
xa.prototype = ya.prototype;
function xa(e) {
  for (; !e.__zoom;) if (!(e = e.parentNode)) return ba;
  return e.__zoom;
}
function Sa(e) {
  e.stopImmediatePropagation();
}
function Ca(e) {
  (e.preventDefault(), e.stopImmediatePropagation());
}
function wa(e) {
  return (!e.ctrlKey || e.type === `wheel`) && !e.button;
}
function Ta() {
  var e = this;
  return e instanceof SVGElement
    ? ((e = e.ownerSVGElement || e),
      e.hasAttribute(`viewBox`)
        ? ((e = e.viewBox.baseVal),
          [
            [e.x, e.y],
            [e.x + e.width, e.y + e.height],
          ])
        : [
            [0, 0],
            [e.width.baseVal.value, e.height.baseVal.value],
          ])
    : [
        [0, 0],
        [e.clientWidth, e.clientHeight],
      ];
}
function Ea() {
  return this.__zoom || ba;
}
function Da(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) * (e.ctrlKey ? 10 : 1);
}
function Oa() {
  return navigator.maxTouchPoints || `ontouchstart` in this;
}
function ka(e, n, r) {
  var i = e.invertX(n[0][0]) - r[0][0],
    a = e.invertX(n[1][0]) - r[1][0],
    o = e.invertY(n[0][1]) - r[0][1],
    s = e.invertY(n[1][1]) - r[1][1];
  return e.translate(
    a > i ? (i + a) / 2 : Math.min(0, i) || Math.max(0, a),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Aa() {
  var e = wa,
    n = Ta,
    r = ka,
    i = Da,
    a = Oa,
    o = [0, 1 / 0],
    s = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    c = 250,
    l = Ar,
    u = nn(`start`, `zoom`, `end`),
    d,
    f,
    p,
    m = 500,
    h = 150,
    g = 0,
    _ = 10;
  function v(e) {
    e.property(`__zoom`, Ea)
      .on(`wheel.zoom`, T, { passive: !1 })
      .on(`mousedown.zoom`, E)
      .on(`dblclick.zoom`, ee)
      .filter(a)
      .on(`touchstart.zoom`, te)
      .on(`touchmove.zoom`, ne)
      .on(`touchend.zoom touchcancel.zoom`, re)
      .style(`-webkit-tap-highlight-color`, `rgba(0,0,0,0)`);
  }
  ((v.transform = function (e, n, r, i) {
    var a = e.selection ? e.selection() : e;
    (a.property(`__zoom`, Ea),
      e === a
        ? a.interrupt().each(function () {
            C(this, arguments)
              .event(i)
              .start()
              .zoom(null, typeof n == `function` ? n.apply(this, arguments) : n)
              .end();
          })
        : S(e, n, r, i));
  }),
    (v.scaleBy = function (e, n, r, i) {
      v.scaleTo(
        e,
        function () {
          return this.__zoom.k * (typeof n == `function` ? n.apply(this, arguments) : n);
        },
        r,
        i
      );
    }),
    (v.scaleTo = function (e, i, a, o) {
      v.transform(
        e,
        function () {
          var e = n.apply(this, arguments),
            o = this.__zoom,
            c = a == null ? x(e) : typeof a == `function` ? a.apply(this, arguments) : a,
            l = o.invert(c),
            u = typeof i == `function` ? i.apply(this, arguments) : i;
          return r(b(y(o, u), c, l), e, s);
        },
        a,
        o
      );
    }),
    (v.translateBy = function (e, i, a, o) {
      v.transform(
        e,
        function () {
          return r(
            this.__zoom.translate(
              typeof i == `function` ? i.apply(this, arguments) : i,
              typeof a == `function` ? a.apply(this, arguments) : a
            ),
            n.apply(this, arguments),
            s
          );
        },
        null,
        o
      );
    }),
    (v.translateTo = function (e, i, a, o, c) {
      v.transform(
        e,
        function () {
          var e = n.apply(this, arguments),
            c = this.__zoom,
            l = o == null ? x(e) : typeof o == `function` ? o.apply(this, arguments) : o;
          return r(
            ba
              .translate(l[0], l[1])
              .scale(c.k)
              .translate(
                typeof i == `function` ? -i.apply(this, arguments) : -i,
                typeof a == `function` ? -a.apply(this, arguments) : -a
              ),
            e,
            s
          );
        },
        o,
        c
      );
    }));
  function y(e, n) {
    return ((n = Math.max(o[0], Math.min(o[1], n))), n === e.k ? e : new ya(n, e.x, e.y));
  }
  function b(e, n, r) {
    var i = n[0] - r[0] * e.k,
      a = n[1] - r[1] * e.k;
    return i === e.x && a === e.y ? e : new ya(e.k, i, a);
  }
  function x(e) {
    return [(+e[0][0] + +e[1][0]) / 2, (+e[0][1] + +e[1][1]) / 2];
  }
  function S(e, r, i, a) {
    e.on(`start.zoom`, function () {
      C(this, arguments).event(a).start();
    })
      .on(`interrupt.zoom end.zoom`, function () {
        C(this, arguments).event(a).end();
      })
      .tween(`zoom`, function () {
        var e = this,
          o = arguments,
          s = C(e, o).event(a),
          c = n.apply(e, o),
          u = i == null ? x(c) : typeof i == `function` ? i.apply(e, o) : i,
          d = Math.max(c[1][0] - c[0][0], c[1][1] - c[0][1]),
          f = e.__zoom,
          p = typeof r == `function` ? r.apply(e, o) : r,
          m = l(f.invert(u).concat(d / f.k), p.invert(u).concat(d / p.k));
        return function (e) {
          if (e === 1) e = p;
          else {
            var n = m(e),
              r = d / n[2];
            e = new ya(r, u[0] - n[0] * r, u[1] - n[1] * r);
          }
          s.zoom(null, e);
        };
      });
  }
  function C(e, n, r) {
    return (!r && e.__zooming) || new w(e, n);
  }
  function w(e, r) {
    ((this.that = e),
      (this.args = r),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = n.apply(e, r)),
      (this.taps = 0));
  }
  w.prototype = {
    event: function (e) {
      return (e && (this.sourceEvent = e), this);
    },
    start: function () {
      return (++this.active === 1 && ((this.that.__zooming = this), this.emit(`start`)), this);
    },
    zoom: function (e, n) {
      return (
        this.mouse && e !== `mouse` && (this.mouse[1] = n.invert(this.mouse[0])),
        this.touch0 && e !== `touch` && (this.touch0[1] = n.invert(this.touch0[0])),
        this.touch1 && e !== `touch` && (this.touch1[1] = n.invert(this.touch1[0])),
        (this.that.__zoom = n),
        this.emit(`zoom`),
        this
      );
    },
    end: function () {
      return (--this.active === 0 && (delete this.that.__zooming, this.emit(`end`)), this);
    },
    emit: function (e) {
      var n = F(this.that).datum();
      u.call(
        e,
        this.that,
        new va(e, {
          sourceEvent: this.sourceEvent,
          target: v,
          type: e,
          transform: this.that.__zoom,
          dispatch: u,
        }),
        n
      );
    },
  };
  function T(n, ...a) {
    if (!e.apply(this, arguments)) return;
    var c = C(this, a).event(n),
      l = this.__zoom,
      u = Math.max(o[0], Math.min(o[1], l.k * 2 ** i.apply(this, arguments))),
      d = en(n);
    if (c.wheel)
      ((c.mouse[0][0] !== d[0] || c.mouse[0][1] !== d[1]) &&
        (c.mouse[1] = l.invert((c.mouse[0] = d))),
        clearTimeout(c.wheel));
    else if (l.k === u) return;
    else ((c.mouse = [d, l.invert(d)]), ai(this), c.start());
    (Ca(n),
      (c.wheel = setTimeout(f, h)),
      c.zoom(`mouse`, r(b(y(l, u), c.mouse[0], c.mouse[1]), c.extent, s)));
    function f() {
      ((c.wheel = null), c.end());
    }
  }
  function E(n, ...i) {
    if (p || !e.apply(this, arguments)) return;
    var a = n.currentTarget,
      o = C(this, i, !0).event(n),
      c = F(n.view).on(`mousemove.zoom`, f, !0).on(`mouseup.zoom`, m, !0),
      l = en(n, a),
      u = n.clientX,
      d = n.clientY;
    (fn(n.view), Sa(n), (o.mouse = [l, this.__zoom.invert(l)]), ai(this), o.start());
    function f(e) {
      if ((Ca(e), !o.moved)) {
        var n = e.clientX - u,
          i = e.clientY - d;
        o.moved = n * n + i * i > g;
      }
      o.event(e).zoom(
        `mouse`,
        r(b(o.that.__zoom, (o.mouse[0] = en(e, a)), o.mouse[1]), o.extent, s)
      );
    }
    function m(e) {
      (c.on(`mousemove.zoom mouseup.zoom`, null), pn(e.view, o.moved), Ca(e), o.event(e).end());
    }
  }
  function ee(i, ...a) {
    if (e.apply(this, arguments)) {
      var o = this.__zoom,
        l = en(i.changedTouches ? i.changedTouches[0] : i, this),
        u = o.invert(l),
        d = o.k * (i.shiftKey ? 0.5 : 2),
        f = r(b(y(o, d), l, u), n.apply(this, a), s);
      (Ca(i),
        c > 0
          ? F(this).transition().duration(c).call(S, f, l, i)
          : F(this).call(v.transform, f, l, i));
    }
  }
  function te(n, ...r) {
    if (e.apply(this, arguments)) {
      var i = n.touches,
        a = i.length,
        o = C(this, r, n.changedTouches.length === a).event(n),
        s,
        c,
        l,
        u;
      for (Sa(n), c = 0; c < a; ++c)
        ((l = i[c]),
          (u = en(l, this)),
          (u = [u, this.__zoom.invert(u), l.identifier]),
          o.touch0
            ? !o.touch1 && o.touch0[2] !== u[2] && ((o.touch1 = u), (o.taps = 0))
            : ((o.touch0 = u), (s = !0), (o.taps = 1 + !!d)));
      ((d &&= clearTimeout(d)),
        s &&
          (o.taps < 2 &&
            ((f = u[0]),
            (d = setTimeout(function () {
              d = null;
            }, m))),
          ai(this),
          o.start()));
    }
  }
  function ne(e, ...n) {
    if (this.__zooming) {
      var i = C(this, n).event(e),
        a = e.changedTouches,
        o = a.length,
        c,
        l,
        u,
        d;
      for (Ca(e), c = 0; c < o; ++c)
        ((l = a[c]),
          (u = en(l, this)),
          i.touch0 && i.touch0[2] === l.identifier
            ? (i.touch0[0] = u)
            : i.touch1 && i.touch1[2] === l.identifier && (i.touch1[0] = u));
      if (((l = i.that.__zoom), i.touch1)) {
        var f = i.touch0[0],
          p = i.touch0[1],
          m = i.touch1[0],
          h = i.touch1[1],
          g = (g = m[0] - f[0]) * g + (g = m[1] - f[1]) * g,
          _ = (_ = h[0] - p[0]) * _ + (_ = h[1] - p[1]) * _;
        ((l = y(l, Math.sqrt(g / _))),
          (u = [(f[0] + m[0]) / 2, (f[1] + m[1]) / 2]),
          (d = [(p[0] + h[0]) / 2, (p[1] + h[1]) / 2]));
      } else if (i.touch0) ((u = i.touch0[0]), (d = i.touch0[1]));
      else return;
      i.zoom(`touch`, r(b(l, u, d), i.extent, s));
    }
  }
  function re(e, ...n) {
    if (this.__zooming) {
      var r = C(this, n).event(e),
        i = e.changedTouches,
        a = i.length,
        o,
        s;
      for (
        Sa(e),
          p && clearTimeout(p),
          p = setTimeout(function () {
            p = null;
          }, m),
          o = 0;
        o < a;
        ++o
      )
        ((s = i[o]),
          r.touch0 && r.touch0[2] === s.identifier
            ? delete r.touch0
            : r.touch1 && r.touch1[2] === s.identifier && delete r.touch1);
      if ((r.touch1 && !r.touch0 && ((r.touch0 = r.touch1), delete r.touch1), r.touch0))
        r.touch0[1] = this.__zoom.invert(r.touch0[0]);
      else if (
        (r.end(), r.taps === 2 && ((s = en(s, this)), Math.hypot(f[0] - s[0], f[1] - s[1]) < _))
      ) {
        var c = F(this).on(`dblclick.zoom`);
        c && c.apply(this, arguments);
      }
    }
  }
  return (
    (v.wheelDelta = function (e) {
      return arguments.length ? ((i = typeof e == `function` ? e : _a(+e)), v) : i;
    }),
    (v.filter = function (n) {
      return arguments.length ? ((e = typeof n == `function` ? n : _a(!!n)), v) : e;
    }),
    (v.touchable = function (e) {
      return arguments.length ? ((a = typeof e == `function` ? e : _a(!!e)), v) : a;
    }),
    (v.extent = function (e) {
      return arguments.length
        ? ((n =
            typeof e == `function`
              ? e
              : _a([
                  [+e[0][0], +e[0][1]],
                  [+e[1][0], +e[1][1]],
                ])),
          v)
        : n;
    }),
    (v.scaleExtent = function (e) {
      return arguments.length ? ((o[0] = +e[0]), (o[1] = +e[1]), v) : [o[0], o[1]];
    }),
    (v.translateExtent = function (e) {
      return arguments.length
        ? ((s[0][0] = +e[0][0]),
          (s[1][0] = +e[1][0]),
          (s[0][1] = +e[0][1]),
          (s[1][1] = +e[1][1]),
          v)
        : [
            [s[0][0], s[0][1]],
            [s[1][0], s[1][1]],
          ];
    }),
    (v.constrain = function (e) {
      return arguments.length ? ((r = e), v) : r;
    }),
    (v.duration = function (e) {
      return arguments.length ? ((c = +e), v) : c;
    }),
    (v.interpolate = function (e) {
      return arguments.length ? ((l = e), v) : l;
    }),
    (v.on = function () {
      var e = u.on.apply(u, arguments);
      return e === u ? v : e;
    }),
    (v.clickDistance = function (e) {
      return arguments.length ? ((g = (e = +e) * e), v) : Math.sqrt(g);
    }),
    (v.tapDistance = function (e) {
      return arguments.length ? ((_ = +e), v) : _;
    }),
    v
  );
}
var ja = class extends Map {
  constructor(e, n = Fa) {
    if (
      (super(),
      Object.defineProperties(this, { _intern: { value: new Map() }, _key: { value: n } }),
      e != null)
    )
      for (let [n, r] of e) this.set(n, r);
  }
  get(e) {
    return super.get(Ma(this, e));
  }
  has(e) {
    return super.has(Ma(this, e));
  }
  set(e, n) {
    return super.set(Na(this, e), n);
  }
  delete(e) {
    return super.delete(Pa(this, e));
  }
};
function Ma({ _intern: e, _key: n }, r) {
  let i = n(r);
  return e.has(i) ? e.get(i) : r;
}
function Na({ _intern: e, _key: n }, r) {
  let i = n(r);
  return e.has(i) ? e.get(i) : (e.set(i, r), r);
}
function Pa({ _intern: e, _key: n }, r) {
  let i = n(r);
  return (e.has(i) && ((r = e.get(i)), e.delete(i)), r);
}
function Fa(e) {
  return typeof e == `object` && e ? e.valueOf() : e;
}
function Ia(e, n) {
  let r;
  if (n === void 0) for (let n of e) n != null && (r < n || (r === void 0 && n >= n)) && (r = n);
  else {
    let i = -1;
    for (let a of e) (a = n(a, ++i, e)) != null && (r < a || (r === void 0 && a >= a)) && (r = a);
  }
  return r;
}
function La(e, n) {
  let r;
  if (n === void 0) for (let n of e) n != null && (r > n || (r === void 0 && n >= n)) && (r = n);
  else {
    let i = -1;
    for (let a of e) (a = n(a, ++i, e)) != null && (r > a || (r === void 0 && a >= a)) && (r = a);
  }
  return r;
}
function Ra(e, n) {
  let r = 0;
  if (n === void 0) for (let n of e) (n = +n) && (r += n);
  else {
    let i = -1;
    for (let a of e) (a = +n(a, ++i, e)) && (r += a);
  }
  return r;
}
var za = typeof global == `object` && global && global.Object === Object && global,
  Ba = typeof self == `object` && self && self.Object === Object && self,
  Va = za || Ba || Function(`return this`)(),
  Ha = Va.Symbol,
  Ua = Object.prototype,
  Wa = Ua.hasOwnProperty,
  Ga = Ua.toString,
  Ka = Ha ? Ha.toStringTag : void 0;
function qa(e) {
  var n = Wa.call(e, Ka),
    r = e[Ka];
  try {
    e[Ka] = void 0;
    var i = !0;
  } catch {}
  var a = Ga.call(e);
  return (i && (n ? (e[Ka] = r) : delete e[Ka]), a);
}
var Ja = Object.prototype.toString;
function Ya(e) {
  return Ja.call(e);
}
var Xa = `[object Null]`,
  Za = `[object Undefined]`,
  Qa = Ha ? Ha.toStringTag : void 0;
function $a(e) {
  return e == null ? (e === void 0 ? Za : Xa) : Qa && Qa in Object(e) ? qa(e) : Ya(e);
}
function eo(e) {
  return typeof e == `object` && !!e;
}
var to = `[object Symbol]`;
function no(e) {
  return typeof e == `symbol` || (eo(e) && $a(e) == to);
}
var ro = /\s/;
function io(e) {
  for (var n = e.length; n-- && ro.test(e.charAt(n)););
  return n;
}
var ao = /^\s+/;
function oo(e) {
  return e && e.slice(0, io(e) + 1).replace(ao, ``);
}
function so(e) {
  var n = typeof e;
  return e != null && (n == `object` || n == `function`);
}
var co = NaN,
  lo = /^[-+]0x[0-9a-f]+$/i,
  uo = /^0b[01]+$/i,
  fo = /^0o[0-7]+$/i,
  po = parseInt;
function mo(e) {
  if (typeof e == `number`) return e;
  if (no(e)) return co;
  if (so(e)) {
    var n = typeof e.valueOf == `function` ? e.valueOf() : e;
    e = so(n) ? n + `` : n;
  }
  if (typeof e != `string`) return e === 0 ? e : +e;
  e = oo(e);
  var r = uo.test(e);
  return r || fo.test(e) ? po(e.slice(2), r ? 2 : 8) : lo.test(e) ? co : +e;
}
var ho = function () {
    return Va.Date.now();
  },
  go = `Expected a function`,
  _o = Math.max,
  vo = Math.min;
function yo(e, n, r) {
  var i,
    a,
    o,
    s,
    c,
    l,
    u = 0,
    d = !1,
    f = !1,
    p = !0;
  if (typeof e != `function`) throw TypeError(go);
  ((n = mo(n) || 0),
    so(r) &&
      ((d = !!r.leading),
      (f = `maxWait` in r),
      (o = f ? _o(mo(r.maxWait) || 0, n) : o),
      (p = `trailing` in r ? !!r.trailing : p)));
  function m(n) {
    var r = i,
      o = a;
    return ((i = a = void 0), (u = n), (s = e.apply(o, r)), s);
  }
  function h(e) {
    return ((u = e), (c = setTimeout(v, n)), d ? m(e) : s);
  }
  function g(e) {
    var r = e - l,
      i = e - u,
      a = n - r;
    return f ? vo(a, o - i) : a;
  }
  function _(e) {
    var r = e - l,
      i = e - u;
    return l === void 0 || r >= n || r < 0 || (f && i >= o);
  }
  function v() {
    var e = ho();
    if (_(e)) return y(e);
    c = setTimeout(v, g(e));
  }
  function y(e) {
    return ((c = void 0), p && i ? m(e) : ((i = a = void 0), s));
  }
  function b() {
    (c !== void 0 && clearTimeout(c), (u = 0), (i = l = a = c = void 0));
  }
  function x() {
    return c === void 0 ? s : y(ho());
  }
  function S() {
    var e = ho(),
      r = _(e);
    if (((i = arguments), (a = this), (l = e), r)) {
      if (c === void 0) return h(l);
      if (f) return (clearTimeout(c), (c = setTimeout(v, n)), m(l));
    }
    return (c === void 0 && (c = setTimeout(v, n)), s);
  }
  return ((S.cancel = b), (S.flush = x), S);
}
var bo = `Expected a function`;
function xo(e, n, r) {
  var i = !0,
    a = !0;
  if (typeof e != `function`) throw TypeError(bo);
  return (
    so(r) && ((i = `leading` in r ? !!r.leading : i), (a = `trailing` in r ? !!r.trailing : a)),
    yo(e, n, { leading: i, maxWait: n, trailing: a })
  );
}
var So = Object.freeze({
    Linear: Object.freeze({
      None: function (e) {
        return e;
      },
      In: function (e) {
        return e;
      },
      Out: function (e) {
        return e;
      },
      InOut: function (e) {
        return e;
      },
    }),
    Quadratic: Object.freeze({
      In: function (e) {
        return e * e;
      },
      Out: function (e) {
        return e * (2 - e);
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
      },
    }),
    Cubic: Object.freeze({
      In: function (e) {
        return e * e * e;
      },
      Out: function (e) {
        return --e * e * e + 1;
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2);
      },
    }),
    Quartic: Object.freeze({
      In: function (e) {
        return e * e * e * e;
      },
      Out: function (e) {
        return 1 - --e * e * e * e;
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2);
      },
    }),
    Quintic: Object.freeze({
      In: function (e) {
        return e * e * e * e * e;
      },
      Out: function (e) {
        return --e * e * e * e * e + 1;
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2);
      },
    }),
    Sinusoidal: Object.freeze({
      In: function (e) {
        return 1 - Math.sin(((1 - e) * Math.PI) / 2);
      },
      Out: function (e) {
        return Math.sin((e * Math.PI) / 2);
      },
      InOut: function (e) {
        return 0.5 * (1 - Math.sin(Math.PI * (0.5 - e)));
      },
    }),
    Exponential: Object.freeze({
      In: function (e) {
        return e === 0 ? 0 : 1024 ** (e - 1);
      },
      Out: function (e) {
        return e === 1 ? 1 : 1 - 2 ** (-10 * e);
      },
      InOut: function (e) {
        return e === 0
          ? 0
          : e === 1
            ? 1
            : (e *= 2) < 1
              ? 0.5 * 1024 ** (e - 1)
              : 0.5 * (-(2 ** (-10 * (e - 1))) + 2);
      },
    }),
    Circular: Object.freeze({
      In: function (e) {
        return 1 - Math.sqrt(1 - e * e);
      },
      Out: function (e) {
        return Math.sqrt(1 - --e * e);
      },
      InOut: function (e) {
        return (e *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - e * e) - 1)
          : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
      },
    }),
    Elastic: Object.freeze({
      In: function (e) {
        return e === 0
          ? 0
          : e === 1
            ? 1
            : -(2 ** (10 * (e - 1))) * Math.sin((e - 1.1) * 5 * Math.PI);
      },
      Out: function (e) {
        return e === 0 ? 0 : e === 1 ? 1 : 2 ** (-10 * e) * Math.sin((e - 0.1) * 5 * Math.PI) + 1;
      },
      InOut: function (e) {
        return e === 0
          ? 0
          : e === 1
            ? 1
            : ((e *= 2),
              e < 1
                ? -0.5 * 2 ** (10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI)
                : 0.5 * 2 ** (-10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) + 1);
      },
    }),
    Back: Object.freeze({
      In: function (e) {
        var n = 1.70158;
        return e === 1 ? 1 : e * e * ((n + 1) * e - n);
      },
      Out: function (e) {
        var n = 1.70158;
        return e === 0 ? 0 : --e * e * ((n + 1) * e + n) + 1;
      },
      InOut: function (e) {
        var n = 1.70158 * 1.525;
        return (e *= 2) < 1
          ? 0.5 * (e * e * ((n + 1) * e - n))
          : 0.5 * ((e -= 2) * e * ((n + 1) * e + n) + 2);
      },
    }),
    Bounce: Object.freeze({
      In: function (e) {
        return 1 - So.Bounce.Out(1 - e);
      },
      Out: function (e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
              ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
              : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      },
      InOut: function (e) {
        return e < 0.5 ? So.Bounce.In(e * 2) * 0.5 : So.Bounce.Out(e * 2 - 1) * 0.5 + 0.5;
      },
    }),
    generatePow: function (e) {
      return (
        e === void 0 && (e = 4),
        (e = e < 2 ** -52 ? 2 ** -52 : e),
        (e = e > 1e4 ? 1e4 : e),
        {
          In: function (n) {
            return n ** +e;
          },
          Out: function (n) {
            return 1 - (1 - n) ** e;
          },
          InOut: function (n) {
            return n < 0.5 ? (n * 2) ** e / 2 : (1 - (2 - n * 2) ** e) / 2 + 0.5;
          },
        }
      );
    },
  }),
  Co = function () {
    return performance.now();
  },
  wo = (function () {
    function e() {
      var e = [...arguments];
      ((this._tweens = {}), (this._tweensAddedDuringUpdate = {}), this.add.apply(this, e));
    }
    return (
      (e.prototype.getAll = function () {
        var e = this;
        return Object.keys(this._tweens).map(function (n) {
          return e._tweens[n];
        });
      }),
      (e.prototype.removeAll = function () {
        this._tweens = {};
      }),
      (e.prototype.add = function () {
        for (var e, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        for (var i = 0, a = n; i < a.length; i++) {
          var o = a[i];
          ((e = o._group) == null || e.remove(o),
            (o._group = this),
            (this._tweens[o.getId()] = o),
            (this._tweensAddedDuringUpdate[o.getId()] = o));
        }
      }),
      (e.prototype.remove = function () {
        for (var e = [...arguments], n = 0, r = e; n < r.length; n++) {
          var i = r[n];
          ((i._group = void 0),
            delete this._tweens[i.getId()],
            delete this._tweensAddedDuringUpdate[i.getId()]);
        }
      }),
      (e.prototype.allStopped = function () {
        return this.getAll().every(function (e) {
          return !e.isPlaying();
        });
      }),
      (e.prototype.update = function (e, n) {
        (e === void 0 && (e = Co()), n === void 0 && (n = !0));
        var r = Object.keys(this._tweens);
        if (r.length !== 0)
          for (; r.length > 0;) {
            this._tweensAddedDuringUpdate = {};
            for (var i = 0; i < r.length; i++) {
              var a = this._tweens[r[i]],
                o = !n;
              a && a.update(e, o) === !1 && !n && this.remove(a);
            }
            r = Object.keys(this._tweensAddedDuringUpdate);
          }
      }),
      e
    );
  })(),
  To = {
    Linear: function (e, n) {
      var r = e.length - 1,
        i = r * n,
        a = Math.floor(i),
        o = To.Utils.Linear;
      return n < 0
        ? o(e[0], e[1], i)
        : n > 1
          ? o(e[r], e[r - 1], r - i)
          : o(e[a], e[a + 1 > r ? r : a + 1], i - a);
    },
    Bezier: function (e, n) {
      for (var r = 0, i = e.length - 1, a = Math.pow, o = To.Utils.Bernstein, s = 0; s <= i; s++)
        r += a(1 - n, i - s) * a(n, s) * e[s] * o(i, s);
      return r;
    },
    CatmullRom: function (e, n) {
      var r = e.length - 1,
        i = r * n,
        a = Math.floor(i),
        o = To.Utils.CatmullRom;
      return e[0] === e[r]
        ? (n < 0 && (a = Math.floor((i = r * (1 + n)))),
          o(e[(a - 1 + r) % r], e[a], e[(a + 1) % r], e[(a + 2) % r], i - a))
        : n < 0
          ? e[0] - (o(e[0], e[0], e[1], e[1], -i) - e[0])
          : n > 1
            ? e[r] - (o(e[r], e[r], e[r - 1], e[r - 1], i - r) - e[r])
            : o(e[a ? a - 1 : 0], e[a], e[r < a + 1 ? r : a + 1], e[r < a + 2 ? r : a + 2], i - a);
    },
    Utils: {
      Linear: function (e, n, r) {
        return (n - e) * r + e;
      },
      Bernstein: function (e, n) {
        var r = To.Utils.Factorial;
        return r(e) / r(n) / r(e - n);
      },
      Factorial: (function () {
        var e = [1];
        return function (n) {
          var r = 1;
          if (e[n]) return e[n];
          for (var i = n; i > 1; i--) r *= i;
          return ((e[n] = r), r);
        };
      })(),
      CatmullRom: function (e, n, r, i, a) {
        var o = (r - e) * 0.5,
          s = (i - n) * 0.5,
          c = a * a,
          l = a * c;
        return (2 * n - 2 * r + o + s) * l + (-3 * n + 3 * r - 2 * o - s) * c + o * a + n;
      },
    },
  },
  Eo = (function () {
    function e() {}
    return (
      (e.nextId = function () {
        return e._nextId++;
      }),
      (e._nextId = 0),
      e
    );
  })(),
  Do = new wo(),
  Oo = (function () {
    function e(e, n) {
      ((this._isPaused = !1),
        (this._pauseStart = 0),
        (this._valuesStart = {}),
        (this._valuesEnd = {}),
        (this._valuesStartRepeat = {}),
        (this._duration = 1e3),
        (this._isDynamic = !1),
        (this._initialRepeat = 0),
        (this._repeat = 0),
        (this._yoyo = !1),
        (this._isPlaying = !1),
        (this._reversed = !1),
        (this._delayTime = 0),
        (this._startTime = 0),
        (this._easingFunction = So.Linear.None),
        (this._interpolationFunction = To.Linear),
        (this._chainedTweens = []),
        (this._onStartCallbackFired = !1),
        (this._onEveryStartCallbackFired = !1),
        (this._id = Eo.nextId()),
        (this._isChainStopped = !1),
        (this._propertiesAreSetUp = !1),
        (this._goToEnd = !1),
        (this._object = e),
        typeof n == `object`
          ? ((this._group = n), n.add(this))
          : n === !0 && ((this._group = Do), Do.add(this)));
    }
    return (
      (e.prototype.getId = function () {
        return this._id;
      }),
      (e.prototype.isPlaying = function () {
        return this._isPlaying;
      }),
      (e.prototype.isPaused = function () {
        return this._isPaused;
      }),
      (e.prototype.getDuration = function () {
        return this._duration;
      }),
      (e.prototype.to = function (e, n) {
        if ((n === void 0 && (n = 1e3), this._isPlaying))
          throw Error(
            `Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.`
          );
        return (
          (this._valuesEnd = e),
          (this._propertiesAreSetUp = !1),
          (this._duration = n < 0 ? 0 : n),
          this
        );
      }),
      (e.prototype.duration = function (e) {
        return (e === void 0 && (e = 1e3), (this._duration = e < 0 ? 0 : e), this);
      }),
      (e.prototype.dynamic = function (e) {
        return (e === void 0 && (e = !1), (this._isDynamic = e), this);
      }),
      (e.prototype.start = function (e, n) {
        if ((e === void 0 && (e = Co()), n === void 0 && (n = !1), this._isPlaying)) return this;
        if (((this._repeat = this._initialRepeat), this._reversed))
          for (var r in ((this._reversed = !1), this._valuesStartRepeat))
            (this._swapEndStartRepeatValues(r),
              (this._valuesStart[r] = this._valuesStartRepeat[r]));
        if (
          ((this._isPlaying = !0),
          (this._isPaused = !1),
          (this._onStartCallbackFired = !1),
          (this._onEveryStartCallbackFired = !1),
          (this._isChainStopped = !1),
          (this._startTime = e),
          (this._startTime += this._delayTime),
          !this._propertiesAreSetUp || n)
        ) {
          if (((this._propertiesAreSetUp = !0), !this._isDynamic)) {
            var i = {};
            for (var a in this._valuesEnd) i[a] = this._valuesEnd[a];
            this._valuesEnd = i;
          }
          this._setupProperties(
            this._object,
            this._valuesStart,
            this._valuesEnd,
            this._valuesStartRepeat,
            n
          );
        }
        return this;
      }),
      (e.prototype.startFromCurrentValues = function (e) {
        return this.start(e, !0);
      }),
      (e.prototype._setupProperties = function (e, n, r, i, a) {
        for (var o in r) {
          var s = e[o],
            c = Array.isArray(s),
            l = c ? `array` : typeof s,
            u = !c && Array.isArray(r[o]);
          if (!(l === `undefined` || l === `function`)) {
            if (u) {
              var d = r[o];
              if (d.length === 0) continue;
              for (var f = [s], p = 0, m = d.length; p < m; p += 1) {
                var h = this._handleRelativeValue(s, d[p]);
                if (isNaN(h)) {
                  ((u = !1), console.warn(`Found invalid interpolation list. Skipping.`));
                  break;
                }
                f.push(h);
              }
              u && (r[o] = f);
            }
            if ((l === `object` || c) && s && !u) {
              n[o] = c ? [] : {};
              var g = s;
              for (var _ in g) n[o][_] = g[_];
              i[o] = c ? [] : {};
              var d = r[o];
              if (!this._isDynamic) {
                var v = {};
                for (var _ in d) v[_] = d[_];
                r[o] = d = v;
              }
              this._setupProperties(g, n[o], d, i[o], a);
            } else
              ((n[o] === void 0 || a) && (n[o] = s),
                c || (n[o] *= 1),
                u ? (i[o] = r[o].slice().reverse()) : (i[o] = n[o] || 0));
          }
        }
      }),
      (e.prototype.stop = function () {
        return (
          this._isChainStopped || ((this._isChainStopped = !0), this.stopChainedTweens()),
          this._isPlaying
            ? ((this._isPlaying = !1),
              (this._isPaused = !1),
              this._onStopCallback && this._onStopCallback(this._object),
              this)
            : this
        );
      }),
      (e.prototype.end = function () {
        return ((this._goToEnd = !0), this.update(this._startTime + this._duration), this);
      }),
      (e.prototype.pause = function (e) {
        return (
          e === void 0 && (e = Co()),
          this._isPaused || !this._isPlaying
            ? this
            : ((this._isPaused = !0), (this._pauseStart = e), this)
        );
      }),
      (e.prototype.resume = function (e) {
        return (
          e === void 0 && (e = Co()),
          !this._isPaused || !this._isPlaying
            ? this
            : ((this._isPaused = !1),
              (this._startTime += e - this._pauseStart),
              (this._pauseStart = 0),
              this)
        );
      }),
      (e.prototype.stopChainedTweens = function () {
        for (var e = 0, n = this._chainedTweens.length; e < n; e++) this._chainedTweens[e].stop();
        return this;
      }),
      (e.prototype.group = function (e) {
        return e
          ? (e.add(this), this)
          : (console.warn(
              `tween.group() without args has been removed, use group.add(tween) instead.`
            ),
            this);
      }),
      (e.prototype.remove = function () {
        var e;
        return ((e = this._group) == null || e.remove(this), this);
      }),
      (e.prototype.delay = function (e) {
        return (e === void 0 && (e = 0), (this._delayTime = e), this);
      }),
      (e.prototype.repeat = function (e) {
        return (e === void 0 && (e = 0), (this._initialRepeat = e), (this._repeat = e), this);
      }),
      (e.prototype.repeatDelay = function (e) {
        return ((this._repeatDelayTime = e), this);
      }),
      (e.prototype.yoyo = function (e) {
        return (e === void 0 && (e = !1), (this._yoyo = e), this);
      }),
      (e.prototype.easing = function (e) {
        return (e === void 0 && (e = So.Linear.None), (this._easingFunction = e), this);
      }),
      (e.prototype.interpolation = function (e) {
        return (e === void 0 && (e = To.Linear), (this._interpolationFunction = e), this);
      }),
      (e.prototype.chain = function () {
        var e = [...arguments];
        return ((this._chainedTweens = e), this);
      }),
      (e.prototype.onStart = function (e) {
        return ((this._onStartCallback = e), this);
      }),
      (e.prototype.onEveryStart = function (e) {
        return ((this._onEveryStartCallback = e), this);
      }),
      (e.prototype.onUpdate = function (e) {
        return ((this._onUpdateCallback = e), this);
      }),
      (e.prototype.onRepeat = function (e) {
        return ((this._onRepeatCallback = e), this);
      }),
      (e.prototype.onComplete = function (e) {
        return ((this._onCompleteCallback = e), this);
      }),
      (e.prototype.onStop = function (e) {
        return ((this._onStopCallback = e), this);
      }),
      (e.prototype.update = function (n, r) {
        var i = this;
        if ((n === void 0 && (n = Co()), r === void 0 && (r = e.autoStartOnUpdate), this._isPaused))
          return !0;
        var a;
        if (!this._goToEnd && !this._isPlaying)
          if (r) this.start(n, !0);
          else return !1;
        if (((this._goToEnd = !1), n < this._startTime)) return !0;
        (this._onStartCallbackFired === !1 &&
          (this._onStartCallback && this._onStartCallback(this._object),
          (this._onStartCallbackFired = !0)),
          this._onEveryStartCallbackFired === !1 &&
            (this._onEveryStartCallback && this._onEveryStartCallback(this._object),
            (this._onEveryStartCallbackFired = !0)));
        var o = n - this._startTime,
          s = this._duration + (this._repeatDelayTime ?? this._delayTime),
          c = this._duration + this._repeat * s,
          l = (function () {
            if (i._duration === 0 || o > c) return 1;
            var e = o - Math.trunc(o / s) * s,
              n = Math.min(e / i._duration, 1);
            return n === 0 && o === i._duration ? 1 : n;
          })(),
          u = this._easingFunction(l);
        if (
          (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, u),
          this._onUpdateCallback && this._onUpdateCallback(this._object, l),
          this._duration === 0 || o >= this._duration)
        )
          if (this._repeat > 0) {
            var d = Math.min(Math.trunc((o - this._duration) / s) + 1, this._repeat);
            for (a in (isFinite(this._repeat) && (this._repeat -= d), this._valuesStartRepeat))
              (!this._yoyo &&
                typeof this._valuesEnd[a] == `string` &&
                (this._valuesStartRepeat[a] =
                  this._valuesStartRepeat[a] + parseFloat(this._valuesEnd[a])),
                this._yoyo && this._swapEndStartRepeatValues(a),
                (this._valuesStart[a] = this._valuesStartRepeat[a]));
            return (
              this._yoyo && (this._reversed = !this._reversed),
              (this._startTime += s * d),
              this._onRepeatCallback && this._onRepeatCallback(this._object),
              (this._onEveryStartCallbackFired = !1),
              !0
            );
          } else {
            this._onCompleteCallback && this._onCompleteCallback(this._object);
            for (var f = 0, p = this._chainedTweens.length; f < p; f++)
              this._chainedTweens[f].start(this._startTime + this._duration, !1);
            return ((this._isPlaying = !1), !1);
          }
        return !0;
      }),
      (e.prototype._updateProperties = function (e, n, r, i) {
        for (var a in r)
          if (n[a] !== void 0) {
            var o = n[a] || 0,
              s = r[a];
            !Array.isArray(e[a]) && Array.isArray(s)
              ? (e[a] = this._interpolationFunction(s, i))
              : typeof s == `object` && s
                ? this._updateProperties(e[a], o, s, i)
                : ((s = this._handleRelativeValue(o, s)),
                  typeof s == `number` && (e[a] = o + (s - o) * i));
          }
      }),
      (e.prototype._handleRelativeValue = function (e, n) {
        return typeof n == `string`
          ? n.charAt(0) === `+` || n.charAt(0) === `-`
            ? e + parseFloat(n)
            : parseFloat(n)
          : n;
      }),
      (e.prototype._swapEndStartRepeatValues = function (e) {
        var n = this._valuesStartRepeat[e],
          r = this._valuesEnd[e];
        (typeof r == `string`
          ? (this._valuesStartRepeat[e] = this._valuesStartRepeat[e] + parseFloat(r))
          : (this._valuesStartRepeat[e] = this._valuesEnd[e]),
          (this._valuesEnd[e] = n));
      }),
      (e.autoStartOnUpdate = !1),
      e
    );
  })();
Eo.nextId;
var ko = Do;
(ko.getAll.bind(ko),
  ko.removeAll.bind(ko),
  ko.add.bind(ko),
  ko.remove.bind(ko),
  ko.update.bind(ko));
function Ao(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var r = 0, i = Array(n); r < n; r++) i[r] = e[r];
  return i;
}
function jo(e) {
  if (Array.isArray(e)) return e;
}
function Mo(e, n) {
  if (!(e instanceof n)) throw TypeError(`Cannot call a class as a function`);
}
function No(e, n, r) {
  return (Object.defineProperty(e, 'prototype', { writable: !1 }), e);
}
function Po(e, n) {
  var r = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (r != null) {
    var i,
      a,
      o,
      s,
      c = [],
      l = !0,
      u = !1;
    try {
      if (((o = (r = r.call(e)).next), n !== 0))
        for (; !(l = (i = o.call(r)).done) && (c.push(i.value), c.length !== n); l = !0);
    } catch (e) {
      ((u = !0), (a = e));
    } finally {
      try {
        if (!l && r.return != null && ((s = r.return()), Object(s) !== s)) return;
      } finally {
        if (u) throw a;
      }
    }
    return c;
  }
}
function Fo() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Io(e, n) {
  return jo(e) || Po(e, n) || Lo(e, n) || Fo();
}
function Lo(e, n) {
  if (e) {
    if (typeof e == `string`) return Ao(e, n);
    var r = {}.toString.call(e).slice(8, -1);
    return (
      r === `Object` && e.constructor && (r = e.constructor.name),
      r === `Map` || r === `Set`
        ? Array.from(e)
        : r === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? Ao(e, n)
          : void 0
    );
  }
}
var Ro = No(function e(n, r) {
  var i = r.default,
    a = i === void 0 ? null : i,
    o = r.triggerUpdate,
    s = o === void 0 ? !0 : o,
    c = r.onChange,
    l = c === void 0 ? function (e, n) {} : c;
  (Mo(this, e),
    (this.name = n),
    (this.defaultVal = a),
    (this.triggerUpdate = s),
    (this.onChange = l));
});
function zo(e) {
  var n = e.stateInit,
    r =
      n === void 0
        ? function () {
            return {};
          }
        : n,
    i = e.props,
    a = i === void 0 ? {} : i,
    o = e.methods,
    s = o === void 0 ? {} : o,
    c = e.aliases,
    l = c === void 0 ? {} : c,
    u = e.init,
    d = u === void 0 ? function () {} : u,
    f = e.update,
    p = f === void 0 ? function () {} : f,
    m = Object.keys(a).map(function (e) {
      return new Ro(e, a[e]);
    });
  return function e() {
    var n = [...arguments],
      i = !!(this instanceof e && this.constructor),
      a = i ? n.shift() : void 0,
      o = n[0],
      c = o === void 0 ? {} : o,
      u = Object.assign({}, r instanceof Function ? r(c) : r, { initialised: !1 }),
      f = {};
    function h(e) {
      return (g(e, c), _(), h);
    }
    var g = function (e, n) {
        (d.call(h, e, u, n), (u.initialised = !0));
      },
      _ = yo(function () {
        u.initialised && (p.call(h, u, f), (f = {}));
      }, 1);
    return (
      m.forEach(function (e) {
        h[e.name] = n(e);
        function n(e) {
          var n = e.name,
            r = e.triggerUpdate,
            i = r === void 0 ? !1 : r,
            a = e.onChange,
            o = a === void 0 ? function (e, n) {} : a,
            s = e.defaultVal,
            c = s === void 0 ? null : s;
          return function (e) {
            var r = u[n];
            if (!arguments.length) return r;
            var a = e === void 0 ? c : e;
            return (
              (u[n] = a),
              o.call(h, a, u, r),
              !f.hasOwnProperty(n) && (f[n] = r),
              i && _(),
              h
            );
          };
        }
      }),
      Object.keys(s).forEach(function (e) {
        h[e] = function () {
          var n,
            r = [...arguments];
          return (n = s[e]).call.apply(n, [h, u].concat(r));
        };
      }),
      Object.entries(l).forEach(function (e) {
        var n = Io(e, 2),
          r = n[0];
        return (h[r] = h[n[1]]);
      }),
      (h.resetProps = function () {
        return (
          m.forEach(function (e) {
            h[e.name](e.defaultVal);
          }),
          h
        );
      }),
      h.resetProps(),
      (u._rerender = _),
      i && a && h(a),
      h
    );
  };
}
var L = function (e) {
  return typeof e == `function`
    ? e
    : typeof e == `string`
      ? function (n) {
          return n[e];
        }
      : function (n) {
          return e;
        };
};
function Bo(e) {
  '@babel/helpers - typeof';
  return (
    (Bo =
      typeof Symbol == `function` && typeof Symbol.iterator == `symbol`
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == `function` &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? `symbol`
              : typeof e;
          }),
    Bo(e)
  );
}
var Vo = /^\s+/,
  Ho = /\s+$/;
function R(e, n) {
  if (((e ||= ``), (n ||= {}), e instanceof R)) return e;
  if (!(this instanceof R)) return new R(e, n);
  var r = Uo(e);
  ((this._originalInput = e),
    (this._r = r.r),
    (this._g = r.g),
    (this._b = r.b),
    (this._a = r.a),
    (this._roundA = Math.round(100 * this._a) / 100),
    (this._format = n.format || r.format),
    (this._gradientType = n.gradientType),
    this._r < 1 && (this._r = Math.round(this._r)),
    this._g < 1 && (this._g = Math.round(this._g)),
    this._b < 1 && (this._b = Math.round(this._b)),
    (this._ok = r.ok));
}
((R.prototype = {
  isDark: function () {
    return this.getBrightness() < 128;
  },
  isLight: function () {
    return !this.isDark();
  },
  isValid: function () {
    return this._ok;
  },
  getOriginalInput: function () {
    return this._originalInput;
  },
  getFormat: function () {
    return this._format;
  },
  getAlpha: function () {
    return this._a;
  },
  getBrightness: function () {
    var e = this.toRgb();
    return (e.r * 299 + e.g * 587 + e.b * 114) / 1e3;
  },
  getLuminance: function () {
    var e = this.toRgb(),
      n = e.r / 255,
      r = e.g / 255,
      i = e.b / 255,
      a = n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4,
      o = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4,
      s = i <= 0.03928 ? i / 12.92 : ((i + 0.055) / 1.055) ** 2.4;
    return 0.2126 * a + 0.7152 * o + 0.0722 * s;
  },
  setAlpha: function (e) {
    return ((this._a = ps(e)), (this._roundA = Math.round(100 * this._a) / 100), this);
  },
  toHsv: function () {
    var e = qo(this._r, this._g, this._b);
    return { h: e.h * 360, s: e.s, v: e.v, a: this._a };
  },
  toHsvString: function () {
    var e = qo(this._r, this._g, this._b),
      n = Math.round(e.h * 360),
      r = Math.round(e.s * 100),
      i = Math.round(e.v * 100);
    return this._a == 1
      ? `hsv(` + n + `, ` + r + `%, ` + i + `%)`
      : `hsva(` + n + `, ` + r + `%, ` + i + `%, ` + this._roundA + `)`;
  },
  toHsl: function () {
    var e = Go(this._r, this._g, this._b);
    return { h: e.h * 360, s: e.s, l: e.l, a: this._a };
  },
  toHslString: function () {
    var e = Go(this._r, this._g, this._b),
      n = Math.round(e.h * 360),
      r = Math.round(e.s * 100),
      i = Math.round(e.l * 100);
    return this._a == 1
      ? `hsl(` + n + `, ` + r + `%, ` + i + `%)`
      : `hsla(` + n + `, ` + r + `%, ` + i + `%, ` + this._roundA + `)`;
  },
  toHex: function (e) {
    return Yo(this._r, this._g, this._b, e);
  },
  toHexString: function (e) {
    return `#` + this.toHex(e);
  },
  toHex8: function (e) {
    return Xo(this._r, this._g, this._b, this._a, e);
  },
  toHex8String: function (e) {
    return `#` + this.toHex8(e);
  },
  toRgb: function () {
    return { r: Math.round(this._r), g: Math.round(this._g), b: Math.round(this._b), a: this._a };
  },
  toRgbString: function () {
    return this._a == 1
      ? `rgb(` + Math.round(this._r) + `, ` + Math.round(this._g) + `, ` + Math.round(this._b) + `)`
      : `rgba(` +
          Math.round(this._r) +
          `, ` +
          Math.round(this._g) +
          `, ` +
          Math.round(this._b) +
          `, ` +
          this._roundA +
          `)`;
  },
  toPercentageRgb: function () {
    return {
      r: Math.round(z(this._r, 255) * 100) + `%`,
      g: Math.round(z(this._g, 255) * 100) + `%`,
      b: Math.round(z(this._b, 255) * 100) + `%`,
      a: this._a,
    };
  },
  toPercentageRgbString: function () {
    return this._a == 1
      ? `rgb(` +
          Math.round(z(this._r, 255) * 100) +
          `%, ` +
          Math.round(z(this._g, 255) * 100) +
          `%, ` +
          Math.round(z(this._b, 255) * 100) +
          `%)`
      : `rgba(` +
          Math.round(z(this._r, 255) * 100) +
          `%, ` +
          Math.round(z(this._g, 255) * 100) +
          `%, ` +
          Math.round(z(this._b, 255) * 100) +
          `%, ` +
          this._roundA +
          `)`;
  },
  toName: function () {
    return this._a === 0
      ? `transparent`
      : this._a < 1
        ? !1
        : ds[Yo(this._r, this._g, this._b, !0)] || !1;
  },
  toFilter: function (e) {
    var n = `#` + Zo(this._r, this._g, this._b, this._a),
      r = n,
      i = this._gradientType ? `GradientType = 1, ` : ``;
    if (e) {
      var a = R(e);
      r = `#` + Zo(a._r, a._g, a._b, a._a);
    }
    return (
      `progid:DXImageTransform.Microsoft.gradient(` +
      i +
      `startColorstr=` +
      n +
      `,endColorstr=` +
      r +
      `)`
    );
  },
  toString: function (e) {
    var n = !!e;
    e ||= this._format;
    var r = !1,
      i = this._a < 1 && this._a >= 0;
    return !n &&
      i &&
      (e === `hex` || e === `hex6` || e === `hex3` || e === `hex4` || e === `hex8` || e === `name`)
      ? e === `name` && this._a === 0
        ? this.toName()
        : this.toRgbString()
      : (e === `rgb` && (r = this.toRgbString()),
        e === `prgb` && (r = this.toPercentageRgbString()),
        (e === `hex` || e === `hex6`) && (r = this.toHexString()),
        e === `hex3` && (r = this.toHexString(!0)),
        e === `hex4` && (r = this.toHex8String(!0)),
        e === `hex8` && (r = this.toHex8String()),
        e === `name` && (r = this.toName()),
        e === `hsl` && (r = this.toHslString()),
        e === `hsv` && (r = this.toHsvString()),
        r || this.toHexString());
  },
  clone: function () {
    return R(this.toString());
  },
  _applyModification: function (e, n) {
    var r = e.apply(null, [this].concat([].slice.call(n)));
    return ((this._r = r._r), (this._g = r._g), (this._b = r._b), this.setAlpha(r._a), this);
  },
  lighten: function () {
    return this._applyModification(ts, arguments);
  },
  brighten: function () {
    return this._applyModification(ns, arguments);
  },
  darken: function () {
    return this._applyModification(rs, arguments);
  },
  desaturate: function () {
    return this._applyModification(Qo, arguments);
  },
  saturate: function () {
    return this._applyModification($o, arguments);
  },
  greyscale: function () {
    return this._applyModification(es, arguments);
  },
  spin: function () {
    return this._applyModification(is, arguments);
  },
  _applyCombination: function (e, n) {
    return e.apply(null, [this].concat([].slice.call(n)));
  },
  analogous: function () {
    return this._applyCombination(cs, arguments);
  },
  complement: function () {
    return this._applyCombination(as, arguments);
  },
  monochromatic: function () {
    return this._applyCombination(ls, arguments);
  },
  splitcomplement: function () {
    return this._applyCombination(ss, arguments);
  },
  triad: function () {
    return this._applyCombination(os, [3]);
  },
  tetrad: function () {
    return this._applyCombination(os, [4]);
  },
}),
  (R.fromRatio = function (e, n) {
    if (Bo(e) == `object`) {
      var r = {};
      for (var i in e) e.hasOwnProperty(i) && (i === `a` ? (r[i] = e[i]) : (r[i] = vs(e[i])));
      e = r;
    }
    return R(e, n);
  }));
function Uo(e) {
  var n = { r: 0, g: 0, b: 0 },
    r = 1,
    i = null,
    a = null,
    o = null,
    s = !1,
    c = !1;
  return (
    typeof e == `string` && (e = Cs(e)),
    Bo(e) == `object` &&
      (Ss(e.r) && Ss(e.g) && Ss(e.b)
        ? ((n = Wo(e.r, e.g, e.b)), (s = !0), (c = String(e.r).substr(-1) === `%` ? `prgb` : `rgb`))
        : Ss(e.h) && Ss(e.s) && Ss(e.v)
          ? ((i = vs(e.s)), (a = vs(e.v)), (n = Jo(e.h, i, a)), (s = !0), (c = `hsv`))
          : Ss(e.h) &&
            Ss(e.s) &&
            Ss(e.l) &&
            ((i = vs(e.s)), (o = vs(e.l)), (n = Ko(e.h, i, o)), (s = !0), (c = `hsl`)),
      e.hasOwnProperty(`a`) && (r = e.a)),
    (r = ps(r)),
    {
      ok: s,
      format: e.format || c,
      r: Math.min(255, Math.max(n.r, 0)),
      g: Math.min(255, Math.max(n.g, 0)),
      b: Math.min(255, Math.max(n.b, 0)),
      a: r,
    }
  );
}
function Wo(e, n, r) {
  return { r: z(e, 255) * 255, g: z(n, 255) * 255, b: z(r, 255) * 255 };
}
function Go(e, n, r) {
  ((e = z(e, 255)), (n = z(n, 255)), (r = z(r, 255)));
  var i = Math.max(e, n, r),
    a = Math.min(e, n, r),
    o,
    s,
    c = (i + a) / 2;
  if (i == a) o = s = 0;
  else {
    var l = i - a;
    switch (((s = c > 0.5 ? l / (2 - i - a) : l / (i + a)), i)) {
      case e:
        o = (n - r) / l + (n < r ? 6 : 0);
        break;
      case n:
        o = (r - e) / l + 2;
        break;
      case r:
        o = (e - n) / l + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s, l: c };
}
function Ko(e, n, r) {
  var i, a, o;
  ((e = z(e, 360)), (n = z(n, 100)), (r = z(r, 100)));
  function s(e, n, r) {
    return (
      r < 0 && (r += 1),
      r > 1 && --r,
      r < 1 / 6
        ? e + (n - e) * 6 * r
        : r < 1 / 2
          ? n
          : r < 2 / 3
            ? e + (n - e) * (2 / 3 - r) * 6
            : e
    );
  }
  if (n === 0) i = a = o = r;
  else {
    var c = r < 0.5 ? r * (1 + n) : r + n - r * n,
      l = 2 * r - c;
    ((i = s(l, c, e + 1 / 3)), (a = s(l, c, e)), (o = s(l, c, e - 1 / 3)));
  }
  return { r: i * 255, g: a * 255, b: o * 255 };
}
function qo(e, n, r) {
  ((e = z(e, 255)), (n = z(n, 255)), (r = z(r, 255)));
  var i = Math.max(e, n, r),
    a = Math.min(e, n, r),
    o,
    s,
    c = i,
    l = i - a;
  if (((s = i === 0 ? 0 : l / i), i == a)) o = 0;
  else {
    switch (i) {
      case e:
        o = (n - r) / l + (n < r ? 6 : 0);
        break;
      case n:
        o = (r - e) / l + 2;
        break;
      case r:
        o = (e - n) / l + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s, v: c };
}
function Jo(e, n, r) {
  ((e = z(e, 360) * 6), (n = z(n, 100)), (r = z(r, 100)));
  var i = Math.floor(e),
    a = e - i,
    o = r * (1 - n),
    s = r * (1 - a * n),
    c = r * (1 - (1 - a) * n),
    l = i % 6,
    u = [r, s, o, o, c, r][l],
    d = [c, r, r, s, o, o][l],
    f = [o, o, c, r, r, s][l];
  return { r: u * 255, g: d * 255, b: f * 255 };
}
function Yo(e, n, r, i) {
  var a = [
    _s(Math.round(e).toString(16)),
    _s(Math.round(n).toString(16)),
    _s(Math.round(r).toString(16)),
  ];
  return i &&
    a[0].charAt(0) == a[0].charAt(1) &&
    a[1].charAt(0) == a[1].charAt(1) &&
    a[2].charAt(0) == a[2].charAt(1)
    ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0)
    : a.join(``);
}
function Xo(e, n, r, i, a) {
  var o = [
    _s(Math.round(e).toString(16)),
    _s(Math.round(n).toString(16)),
    _s(Math.round(r).toString(16)),
    _s(ys(i)),
  ];
  return a &&
    o[0].charAt(0) == o[0].charAt(1) &&
    o[1].charAt(0) == o[1].charAt(1) &&
    o[2].charAt(0) == o[2].charAt(1) &&
    o[3].charAt(0) == o[3].charAt(1)
    ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) + o[3].charAt(0)
    : o.join(``);
}
function Zo(e, n, r, i) {
  return [
    _s(ys(i)),
    _s(Math.round(e).toString(16)),
    _s(Math.round(n).toString(16)),
    _s(Math.round(r).toString(16)),
  ].join(``);
}
((R.equals = function (e, n) {
  return !e || !n ? !1 : R(e).toRgbString() == R(n).toRgbString();
}),
  (R.random = function () {
    return R.fromRatio({ r: Math.random(), g: Math.random(), b: Math.random() });
  }));
function Qo(e, n) {
  n = n === 0 ? 0 : n || 10;
  var r = R(e).toHsl();
  return ((r.s -= n / 100), (r.s = ms(r.s)), R(r));
}
function $o(e, n) {
  n = n === 0 ? 0 : n || 10;
  var r = R(e).toHsl();
  return ((r.s += n / 100), (r.s = ms(r.s)), R(r));
}
function es(e) {
  return R(e).desaturate(100);
}
function ts(e, n) {
  n = n === 0 ? 0 : n || 10;
  var r = R(e).toHsl();
  return ((r.l += n / 100), (r.l = ms(r.l)), R(r));
}
function ns(e, n) {
  n = n === 0 ? 0 : n || 10;
  var r = R(e).toRgb();
  return (
    (r.r = Math.max(0, Math.min(255, r.r - Math.round(255 * -(n / 100))))),
    (r.g = Math.max(0, Math.min(255, r.g - Math.round(255 * -(n / 100))))),
    (r.b = Math.max(0, Math.min(255, r.b - Math.round(255 * -(n / 100))))),
    R(r)
  );
}
function rs(e, n) {
  n = n === 0 ? 0 : n || 10;
  var r = R(e).toHsl();
  return ((r.l -= n / 100), (r.l = ms(r.l)), R(r));
}
function is(e, n) {
  var r = R(e).toHsl(),
    i = (r.h + n) % 360;
  return ((r.h = i < 0 ? 360 + i : i), R(r));
}
function as(e) {
  var n = R(e).toHsl();
  return ((n.h = (n.h + 180) % 360), R(n));
}
function os(e, n) {
  if (isNaN(n) || n <= 0) throw Error(`Argument to polyad must be a positive number`);
  for (var r = R(e).toHsl(), i = [R(e)], a = 360 / n, o = 1; o < n; o++)
    i.push(R({ h: (r.h + o * a) % 360, s: r.s, l: r.l }));
  return i;
}
function ss(e) {
  var n = R(e).toHsl(),
    r = n.h;
  return [
    R(e),
    R({ h: (r + 72) % 360, s: n.s, l: n.l }),
    R({ h: (r + 216) % 360, s: n.s, l: n.l }),
  ];
}
function cs(e, n, r) {
  ((n ||= 6), (r ||= 30));
  var i = R(e).toHsl(),
    a = 360 / r,
    o = [R(e)];
  for (i.h = (i.h - ((a * n) >> 1) + 720) % 360; --n;) ((i.h = (i.h + a) % 360), o.push(R(i)));
  return o;
}
function ls(e, n) {
  n ||= 6;
  for (var r = R(e).toHsv(), i = r.h, a = r.s, o = r.v, s = [], c = 1 / n; n--;)
    (s.push(R({ h: i, s: a, v: o })), (o = (o + c) % 1));
  return s;
}
((R.mix = function (e, n, r) {
  r = r === 0 ? 0 : r || 50;
  var i = R(e).toRgb(),
    a = R(n).toRgb(),
    o = r / 100;
  return R({
    r: (a.r - i.r) * o + i.r,
    g: (a.g - i.g) * o + i.g,
    b: (a.b - i.b) * o + i.b,
    a: (a.a - i.a) * o + i.a,
  });
}),
  (R.readability = function (e, n) {
    var r = R(e),
      i = R(n);
    return (
      (Math.max(r.getLuminance(), i.getLuminance()) + 0.05) /
      (Math.min(r.getLuminance(), i.getLuminance()) + 0.05)
    );
  }),
  (R.isReadable = function (e, n, r) {
    var i = R.readability(e, n),
      a,
      o = !1;
    switch (((a = ws(r)), a.level + a.size)) {
      case `AAsmall`:
      case `AAAlarge`:
        o = i >= 4.5;
        break;
      case `AAlarge`:
        o = i >= 3;
        break;
      case `AAAsmall`:
        o = i >= 7;
        break;
    }
    return o;
  }),
  (R.mostReadable = function (e, n, r) {
    var i = null,
      a = 0,
      o,
      s,
      c,
      l;
    ((r ||= {}), (s = r.includeFallbackColors), (c = r.level), (l = r.size));
    for (var u = 0; u < n.length; u++)
      ((o = R.readability(e, n[u])), o > a && ((a = o), (i = R(n[u]))));
    return R.isReadable(e, i, { level: c, size: l }) || !s
      ? i
      : ((r.includeFallbackColors = !1), R.mostReadable(e, [`#fff`, `#000`], r));
  }));
var us = (R.names = {
    aliceblue: `f0f8ff`,
    antiquewhite: `faebd7`,
    aqua: `0ff`,
    aquamarine: `7fffd4`,
    azure: `f0ffff`,
    beige: `f5f5dc`,
    bisque: `ffe4c4`,
    black: `000`,
    blanchedalmond: `ffebcd`,
    blue: `00f`,
    blueviolet: `8a2be2`,
    brown: `a52a2a`,
    burlywood: `deb887`,
    burntsienna: `ea7e5d`,
    cadetblue: `5f9ea0`,
    chartreuse: `7fff00`,
    chocolate: `d2691e`,
    coral: `ff7f50`,
    cornflowerblue: `6495ed`,
    cornsilk: `fff8dc`,
    crimson: `dc143c`,
    cyan: `0ff`,
    darkblue: `00008b`,
    darkcyan: `008b8b`,
    darkgoldenrod: `b8860b`,
    darkgray: `a9a9a9`,
    darkgreen: `006400`,
    darkgrey: `a9a9a9`,
    darkkhaki: `bdb76b`,
    darkmagenta: `8b008b`,
    darkolivegreen: `556b2f`,
    darkorange: `ff8c00`,
    darkorchid: `9932cc`,
    darkred: `8b0000`,
    darksalmon: `e9967a`,
    darkseagreen: `8fbc8f`,
    darkslateblue: `483d8b`,
    darkslategray: `2f4f4f`,
    darkslategrey: `2f4f4f`,
    darkturquoise: `00ced1`,
    darkviolet: `9400d3`,
    deeppink: `ff1493`,
    deepskyblue: `00bfff`,
    dimgray: `696969`,
    dimgrey: `696969`,
    dodgerblue: `1e90ff`,
    firebrick: `b22222`,
    floralwhite: `fffaf0`,
    forestgreen: `228b22`,
    fuchsia: `f0f`,
    gainsboro: `dcdcdc`,
    ghostwhite: `f8f8ff`,
    gold: `ffd700`,
    goldenrod: `daa520`,
    gray: `808080`,
    green: `008000`,
    greenyellow: `adff2f`,
    grey: `808080`,
    honeydew: `f0fff0`,
    hotpink: `ff69b4`,
    indianred: `cd5c5c`,
    indigo: `4b0082`,
    ivory: `fffff0`,
    khaki: `f0e68c`,
    lavender: `e6e6fa`,
    lavenderblush: `fff0f5`,
    lawngreen: `7cfc00`,
    lemonchiffon: `fffacd`,
    lightblue: `add8e6`,
    lightcoral: `f08080`,
    lightcyan: `e0ffff`,
    lightgoldenrodyellow: `fafad2`,
    lightgray: `d3d3d3`,
    lightgreen: `90ee90`,
    lightgrey: `d3d3d3`,
    lightpink: `ffb6c1`,
    lightsalmon: `ffa07a`,
    lightseagreen: `20b2aa`,
    lightskyblue: `87cefa`,
    lightslategray: `789`,
    lightslategrey: `789`,
    lightsteelblue: `b0c4de`,
    lightyellow: `ffffe0`,
    lime: `0f0`,
    limegreen: `32cd32`,
    linen: `faf0e6`,
    magenta: `f0f`,
    maroon: `800000`,
    mediumaquamarine: `66cdaa`,
    mediumblue: `0000cd`,
    mediumorchid: `ba55d3`,
    mediumpurple: `9370db`,
    mediumseagreen: `3cb371`,
    mediumslateblue: `7b68ee`,
    mediumspringgreen: `00fa9a`,
    mediumturquoise: `48d1cc`,
    mediumvioletred: `c71585`,
    midnightblue: `191970`,
    mintcream: `f5fffa`,
    mistyrose: `ffe4e1`,
    moccasin: `ffe4b5`,
    navajowhite: `ffdead`,
    navy: `000080`,
    oldlace: `fdf5e6`,
    olive: `808000`,
    olivedrab: `6b8e23`,
    orange: `ffa500`,
    orangered: `ff4500`,
    orchid: `da70d6`,
    palegoldenrod: `eee8aa`,
    palegreen: `98fb98`,
    paleturquoise: `afeeee`,
    palevioletred: `db7093`,
    papayawhip: `ffefd5`,
    peachpuff: `ffdab9`,
    peru: `cd853f`,
    pink: `ffc0cb`,
    plum: `dda0dd`,
    powderblue: `b0e0e6`,
    purple: `800080`,
    rebeccapurple: `663399`,
    red: `f00`,
    rosybrown: `bc8f8f`,
    royalblue: `4169e1`,
    saddlebrown: `8b4513`,
    salmon: `fa8072`,
    sandybrown: `f4a460`,
    seagreen: `2e8b57`,
    seashell: `fff5ee`,
    sienna: `a0522d`,
    silver: `c0c0c0`,
    skyblue: `87ceeb`,
    slateblue: `6a5acd`,
    slategray: `708090`,
    slategrey: `708090`,
    snow: `fffafa`,
    springgreen: `00ff7f`,
    steelblue: `4682b4`,
    tan: `d2b48c`,
    teal: `008080`,
    thistle: `d8bfd8`,
    tomato: `ff6347`,
    turquoise: `40e0d0`,
    violet: `ee82ee`,
    wheat: `f5deb3`,
    white: `fff`,
    whitesmoke: `f5f5f5`,
    yellow: `ff0`,
    yellowgreen: `9acd32`,
  }),
  ds = (R.hexNames = fs(us));
function fs(e) {
  var n = {};
  for (var r in e) e.hasOwnProperty(r) && (n[e[r]] = r);
  return n;
}
function ps(e) {
  return ((e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e);
}
function z(e, n) {
  hs(e) && (e = `100%`);
  var r = gs(e);
  return (
    (e = Math.min(n, Math.max(0, parseFloat(e)))),
    r && (e = parseInt(e * n, 10) / 100),
    Math.abs(e - n) < 1e-6 ? 1 : (e % n) / parseFloat(n)
  );
}
function ms(e) {
  return Math.min(1, Math.max(0, e));
}
function B(e) {
  return parseInt(e, 16);
}
function hs(e) {
  return typeof e == `string` && e.indexOf(`.`) != -1 && parseFloat(e) === 1;
}
function gs(e) {
  return typeof e == `string` && e.indexOf(`%`) != -1;
}
function _s(e) {
  return e.length == 1 ? `0` + e : `` + e;
}
function vs(e) {
  return (e <= 1 && (e = e * 100 + `%`), e);
}
function ys(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function bs(e) {
  return B(e) / 255;
}
var xs = (function () {
  var e = `(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)`,
    n = `[\\s|\\(]+(` + e + `)[,|\\s]+(` + e + `)[,|\\s]+(` + e + `)\\s*\\)?`,
    r = `[\\s|\\(]+(` + e + `)[,|\\s]+(` + e + `)[,|\\s]+(` + e + `)[,|\\s]+(` + e + `)\\s*\\)?`;
  return {
    CSS_UNIT: new RegExp(e),
    rgb: RegExp(`rgb` + n),
    rgba: RegExp(`rgba` + r),
    hsl: RegExp(`hsl` + n),
    hsla: RegExp(`hsla` + r),
    hsv: RegExp(`hsv` + n),
    hsva: RegExp(`hsva` + r),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
})();
function Ss(e) {
  return !!xs.CSS_UNIT.exec(e);
}
function Cs(e) {
  e = e.replace(Vo, ``).replace(Ho, ``).toLowerCase();
  var n = !1;
  if (us[e]) ((e = us[e]), (n = !0));
  else if (e == `transparent`) return { r: 0, g: 0, b: 0, a: 0, format: `name` };
  var r;
  return (r = xs.rgb.exec(e))
    ? { r: r[1], g: r[2], b: r[3] }
    : (r = xs.rgba.exec(e))
      ? { r: r[1], g: r[2], b: r[3], a: r[4] }
      : (r = xs.hsl.exec(e))
        ? { h: r[1], s: r[2], l: r[3] }
        : (r = xs.hsla.exec(e))
          ? { h: r[1], s: r[2], l: r[3], a: r[4] }
          : (r = xs.hsv.exec(e))
            ? { h: r[1], s: r[2], v: r[3] }
            : (r = xs.hsva.exec(e))
              ? { h: r[1], s: r[2], v: r[3], a: r[4] }
              : (r = xs.hex8.exec(e))
                ? { r: B(r[1]), g: B(r[2]), b: B(r[3]), a: bs(r[4]), format: n ? `name` : `hex8` }
                : (r = xs.hex6.exec(e))
                  ? { r: B(r[1]), g: B(r[2]), b: B(r[3]), format: n ? `name` : `hex` }
                  : (r = xs.hex4.exec(e))
                    ? {
                        r: B(r[1] + `` + r[1]),
                        g: B(r[2] + `` + r[2]),
                        b: B(r[3] + `` + r[3]),
                        a: bs(r[4] + `` + r[4]),
                        format: n ? `name` : `hex8`,
                      }
                    : (r = xs.hex3.exec(e))
                      ? {
                          r: B(r[1] + `` + r[1]),
                          g: B(r[2] + `` + r[2]),
                          b: B(r[3] + `` + r[3]),
                          format: n ? `name` : `hex`,
                        }
                      : !1;
}
function ws(e) {
  var n, r;
  return (
    (e ||= { level: `AA`, size: `small` }),
    (n = (e.level || `AA`).toUpperCase()),
    (r = (e.size || `small`).toLowerCase()),
    n !== `AA` && n !== `AAA` && (n = `AA`),
    r !== `small` && r !== `large` && (r = `small`),
    { level: n, size: r }
  );
}
function Ts(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var r = 0, i = Array(n); r < n; r++) i[r] = e[r];
  return i;
}
function Es(e) {
  if (Array.isArray(e)) return Ts(e);
}
function Ds(e, n, r) {
  if (typeof e == `function` ? e === n : e.has(n)) return arguments.length < 3 ? n : r;
  throw TypeError(`Private element is not present on this object`);
}
function Os(e, n) {
  if (n.has(e)) throw TypeError(`Cannot initialize the same private elements twice on an object`);
}
function ks(e, n) {
  if (!(e instanceof n)) throw TypeError(`Cannot call a class as a function`);
}
function V(e, n) {
  return e.get(Ds(e, n));
}
function As(e, n, r) {
  (Os(e, n), n.set(e, r));
}
function js(e, n, r) {
  return (e.set(Ds(e, n), r), r);
}
function Ms(e, n) {
  for (var r = 0; r < n.length; r++) {
    var i = n[r];
    ((i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      `value` in i && (i.writable = !0),
      Object.defineProperty(e, Rs(i.key), i));
  }
}
function Ns(e, n, r) {
  return (n && Ms(e.prototype, n), Object.defineProperty(e, 'prototype', { writable: !1 }), e);
}
function Ps(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function Fs() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Is(e) {
  return Es(e) || Ps(e) || zs(e) || Fs();
}
function Ls(e, n) {
  if (typeof e != `object` || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var i = r.call(e, n);
    if (typeof i != `object`) return i;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return String(e);
}
function Rs(e) {
  var n = Ls(e, `string`);
  return typeof n == `symbol` ? n : n + ``;
}
function zs(e, n) {
  if (e) {
    if (typeof e == `string`) return Ts(e, n);
    var r = {}.toString.call(e).slice(8, -1);
    return (
      r === `Object` && e.constructor && (r = e.constructor.name),
      r === `Map` || r === `Set`
        ? Array.from(e)
        : r === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? Ts(e, n)
          : void 0
    );
  }
}
var Bs = 123,
  Vs = function (e) {
    return `#${Math.min(e, 2 ** 24)
      .toString(16)
      .padStart(6, `0`)}`;
  },
  Hs = function (e, n, r) {
    return (e << 16) + (n << 8) + r;
  },
  Us = function (e) {
    var n = R(e).toRgb(),
      r = n.r,
      i = n.g,
      a = n.b;
    return Hs(r, i, a);
  },
  Ws = function (e, n) {
    return (e * Bs) % 2 ** n;
  },
  Gs = new WeakMap(),
  Ks = new WeakMap(),
  qs = (function () {
    function e() {
      var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 6;
      (ks(this, e), As(this, Gs, void 0), As(this, Ks, void 0), js(Ks, this, n), this.reset());
    }
    return Ns(e, [
      {
        key: `reset`,
        value: function () {
          js(Gs, this, [`__reserved for background__`]);
        },
      },
      {
        key: `register`,
        value: function (e) {
          if (V(Gs, this).length >= 2 ** (24 - V(Ks, this))) return null;
          var n = V(Gs, this).length,
            r = Vs(n + (Ws(n, V(Ks, this)) << (24 - V(Ks, this))));
          return (V(Gs, this).push(e), r);
        },
      },
      {
        key: `lookup`,
        value: function (e) {
          if (!e) return null;
          var n = typeof e == `string` ? Us(e) : Hs.apply(void 0, Is(e));
          if (!n) return null;
          var r = n & (2 ** (24 - V(Ks, this)) - 1),
            i = (n >> (24 - V(Ks, this))) & (2 ** V(Ks, this) - 1);
          return Ws(r, V(Ks, this)) !== i || r >= V(Gs, this).length ? null : V(Gs, this)[r];
        },
      },
    ]);
  })(),
  Js,
  H,
  Ys,
  Xs,
  Zs,
  Qs,
  $s,
  ec,
  tc,
  nc,
  rc,
  ic,
  ac,
  oc,
  sc,
  cc = {},
  lc = [],
  uc = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
  dc = Array.isArray;
function fc(e, n) {
  for (var r in n) e[r] = n[r];
  return e;
}
function pc(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function mc(e, n, r) {
  var i,
    a,
    o,
    s = {};
  for (o in n) o == `key` ? (i = n[o]) : o == `ref` ? (a = n[o]) : (s[o] = n[o]);
  if (
    (arguments.length > 2 && (s.children = arguments.length > 3 ? Js.call(arguments, 2) : r),
    typeof e == `function` && e.defaultProps != null)
  )
    for (o in e.defaultProps) s[o] === void 0 && (s[o] = e.defaultProps[o]);
  return hc(e, s, i, a, null);
}
function hc(e, n, r, i, a) {
  var o = {
    type: e,
    props: n,
    key: r,
    ref: i,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __c: null,
    constructor: void 0,
    __v: a ?? ++Ys,
    __i: -1,
    __u: 0,
  };
  return (a == null && H.vnode != null && H.vnode(o), o);
}
function gc(e) {
  return e.children;
}
function _c(e, n) {
  ((this.props = e), (this.context = n));
}
function vc(e, n) {
  if (n == null) return e.__ ? vc(e.__, e.__i + 1) : null;
  for (var r; n < e.__k.length; n++) if ((r = e.__k[n]) != null && r.__e != null) return r.__e;
  return typeof e.type == `function` ? vc(e) : null;
}
function yc(e) {
  if (e.__P && e.__d) {
    var n = e.__v,
      r = n.__e,
      i = [],
      a = [],
      o = fc({}, n);
    ((o.__v = n.__v + 1),
      H.vnode && H.vnode(o),
      Ac(
        e.__P,
        o,
        n,
        e.__n,
        e.__P.namespaceURI,
        32 & n.__u ? [r] : null,
        i,
        r ?? vc(n),
        !!(32 & n.__u),
        a
      ),
      (o.__v = n.__v),
      (o.__.__k[o.__i] = o),
      Mc(i, o, a),
      (n.__e = n.__ = null),
      o.__e != r && bc(o));
  }
}
function bc(e) {
  if ((e = e.__) != null && e.__c != null)
    return (
      (e.__e = e.__c.base = null),
      e.__k.some(function (n) {
        if (n != null && n.__e != null) return (e.__e = e.__c.base = n.__e);
      }),
      bc(e)
    );
}
function xc(e) {
  ((!e.__d && (e.__d = !0) && Zs.push(e) && !Sc.__r++) || Qs != H.debounceRendering) &&
    ((Qs = H.debounceRendering) || $s)(Sc);
}
function Sc() {
  try {
    for (var e, n = 1; Zs.length;)
      (Zs.length > n && Zs.sort(ec), (e = Zs.shift()), (n = Zs.length), yc(e));
  } finally {
    Zs.length = Sc.__r = 0;
  }
}
function Cc(e, n, r, i, a, o, s, c, l, u, d) {
  var f,
    p,
    m,
    h,
    g,
    _,
    v,
    y = (i && i.__k) || lc,
    b = n.length;
  for (l = wc(r, n, y, l, b), f = 0; f < b; f++)
    (m = r.__k[f]) != null &&
      ((p = (m.__i != -1 && y[m.__i]) || cc),
      (m.__i = f),
      (_ = Ac(e, m, p, a, o, s, c, l, u, d)),
      (h = m.__e),
      m.ref && p.ref != m.ref && (p.ref && Fc(p.ref, null, m), d.push(m.ref, m.__c || h, m)),
      g == null && h != null && (g = h),
      (v = !!(4 & m.__u)) || p.__k === m.__k
        ? ((l = Tc(m, l, e, v)), v && p.__e && (p.__e = null))
        : typeof m.type == `function` && _ !== void 0
          ? (l = _)
          : h && (l = h.nextSibling),
      (m.__u &= -7));
  return ((r.__e = g), l);
}
function wc(e, n, r, i, a) {
  var o,
    s,
    c,
    l,
    u,
    d = r.length,
    f = d,
    p = 0;
  for (e.__k = Array(a), o = 0; o < a; o++)
    (s = n[o]) != null && typeof s != `boolean` && typeof s != `function`
      ? (typeof s == `string` ||
        typeof s == `number` ||
        typeof s == `bigint` ||
        s.constructor == String
          ? (s = e.__k[o] = hc(null, s, null, null, null))
          : dc(s)
            ? (s = e.__k[o] = hc(gc, { children: s }, null, null, null))
            : s.constructor === void 0 && s.__b > 0
              ? (s = e.__k[o] = hc(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v))
              : (e.__k[o] = s),
        (l = o + p),
        (s.__ = e),
        (s.__b = e.__b + 1),
        (c = null),
        (u = s.__i = Ec(s, r, l, f)) != -1 && (f--, (c = r[u]) && (c.__u |= 2)),
        c == null || c.__v == null
          ? (u == -1 && (a > d ? p-- : a < d && p++), typeof s.type != `function` && (s.__u |= 4))
          : u != l && (u == l - 1 ? p-- : u == l + 1 ? p++ : (u > l ? p-- : p++, (s.__u |= 4))))
      : (e.__k[o] = null);
  if (f)
    for (o = 0; o < d; o++)
      (c = r[o]) != null && !(2 & c.__u) && (c.__e == i && (i = vc(c)), Ic(c, c));
  return i;
}
function Tc(e, n, r, i) {
  var a, o;
  if (typeof e.type == `function`) {
    for (a = e.__k, o = 0; a && o < a.length; o++) a[o] && ((a[o].__ = e), (n = Tc(a[o], n, r, i)));
    return n;
  }
  e.__e != n &&
    (i && (n && e.type && !n.parentNode && (n = vc(e)), r.insertBefore(e.__e, n || null)),
    (n = e.__e));
  do n &&= n.nextSibling;
  while (n != null && n.nodeType == 8);
  return n;
}
function Ec(e, n, r, i) {
  var a,
    o,
    s,
    c = e.key,
    l = e.type,
    u = n[r],
    d = u != null && (2 & u.__u) == 0;
  if ((u === null && c == null) || (d && c == u.key && l == u.type)) return r;
  if (i > +!!d) {
    for (a = r - 1, o = r + 1; a >= 0 || o < n.length;)
      if ((u = n[(s = a >= 0 ? a-- : o++)]) != null && !(2 & u.__u) && c == u.key && l == u.type)
        return s;
  }
  return -1;
}
function Dc(e, n, r) {
  n[0] == `-`
    ? e.setProperty(n, r ?? ``)
    : (e[n] = r == null ? `` : typeof r != `number` || uc.test(n) ? r : r + `px`);
}
function Oc(e, n, r, i, a) {
  var o, s;
  n: if (n == `style`)
    if (typeof r == `string`) e.style.cssText = r;
    else {
      if ((typeof i == `string` && (e.style.cssText = i = ``), i))
        for (n in i) (r && n in r) || Dc(e.style, n, ``);
      if (r) for (n in r) (i && r[n] == i[n]) || Dc(e.style, n, r[n]);
    }
  else if (n[0] == `o` && n[1] == `n`)
    ((o = n != (n = n.replace(ic, `$1`))),
      (s = n.toLowerCase()),
      (n = s in e || n == `onFocusOut` || n == `onFocusIn` ? s.slice(2) : n.slice(2)),
      (e.l ||= {}),
      (e.l[n + o] = r),
      r
        ? i
          ? (r[rc] = i[rc])
          : ((r[rc] = ac), e.addEventListener(n, o ? sc : oc, o))
        : e.removeEventListener(n, o ? sc : oc, o));
  else {
    if (a == `http://www.w3.org/2000/svg`) n = n.replace(/xlink(H|:h)/, `h`).replace(/sName$/, `s`);
    else if (
      n != `width` &&
      n != `height` &&
      n != `href` &&
      n != `list` &&
      n != `form` &&
      n != `tabIndex` &&
      n != `download` &&
      n != `rowSpan` &&
      n != `colSpan` &&
      n != `role` &&
      n != `popover` &&
      n in e
    )
      try {
        e[n] = r ?? ``;
        break n;
      } catch {}
    typeof r == `function` ||
      (r == null || (!1 === r && n[4] != `-`)
        ? e.removeAttribute(n)
        : e.setAttribute(n, n == `popover` && r == 1 ? `` : r));
  }
}
function kc(e) {
  return function (n) {
    if (this.l) {
      var r = this.l[n.type + e];
      if (n[nc] == null) n[nc] = ac++;
      else if (n[nc] < r[rc]) return;
      return r(H.event ? H.event(n) : n);
    }
  };
}
function Ac(e, n, r, i, a, o, s, c, l, u) {
  var d,
    f,
    p,
    m,
    h,
    g,
    _,
    v,
    y,
    b,
    x,
    S,
    C,
    w,
    T,
    E = n.type;
  if (n.constructor !== void 0) return null;
  (128 & r.__u && ((l = !!(32 & r.__u)), (o = [(c = n.__e = r.__e)])), (d = H.__b) && d(n));
  n: if (typeof E == `function`)
    try {
      if (
        ((v = n.props),
        (y = E.prototype && E.prototype.render),
        (b = (d = E.contextType) && i[d.__c]),
        (x = d ? (b ? b.props.value : d.__) : i),
        r.__c
          ? (_ = (f = n.__c = r.__c).__ = f.__E)
          : (y
              ? (n.__c = f = new E(v, x))
              : ((n.__c = f = new _c(v, x)), (f.constructor = E), (f.render = Lc)),
            b && b.sub(f),
            (f.state ||= {}),
            (f.__n = i),
            (p = f.__d = !0),
            (f.__h = []),
            (f._sb = [])),
        y && f.__s == null && (f.__s = f.state),
        y &&
          E.getDerivedStateFromProps != null &&
          (f.__s == f.state && (f.__s = fc({}, f.__s)),
          fc(f.__s, E.getDerivedStateFromProps(v, f.__s))),
        (m = f.props),
        (h = f.state),
        (f.__v = n),
        p)
      )
        (y &&
          E.getDerivedStateFromProps == null &&
          f.componentWillMount != null &&
          f.componentWillMount(),
          y && f.componentDidMount != null && f.__h.push(f.componentDidMount));
      else {
        if (
          (y &&
            E.getDerivedStateFromProps == null &&
            v !== m &&
            f.componentWillReceiveProps != null &&
            f.componentWillReceiveProps(v, x),
          n.__v == r.__v ||
            (!f.__e &&
              f.shouldComponentUpdate != null &&
              !1 === f.shouldComponentUpdate(v, f.__s, x)))
        ) {
          (n.__v != r.__v && ((f.props = v), (f.state = f.__s), (f.__d = !1)),
            (n.__e = r.__e),
            (n.__k = r.__k),
            n.__k.some(function (e) {
              e && (e.__ = n);
            }),
            lc.push.apply(f.__h, f._sb),
            (f._sb = []),
            f.__h.length && s.push(f));
          break n;
        }
        (f.componentWillUpdate != null && f.componentWillUpdate(v, f.__s, x),
          y &&
            f.componentDidUpdate != null &&
            f.__h.push(function () {
              f.componentDidUpdate(m, h, g);
            }));
      }
      if (((f.context = x), (f.props = v), (f.__P = e), (f.__e = !1), (S = H.__r), (C = 0), y))
        ((f.state = f.__s),
          (f.__d = !1),
          S && S(n),
          (d = f.render(f.props, f.state, f.context)),
          lc.push.apply(f.__h, f._sb),
          (f._sb = []));
      else
        do
          ((f.__d = !1), S && S(n), (d = f.render(f.props, f.state, f.context)), (f.state = f.__s));
        while (f.__d && ++C < 25);
      ((f.state = f.__s),
        f.getChildContext != null && (i = fc(fc({}, i), f.getChildContext())),
        y && !p && f.getSnapshotBeforeUpdate != null && (g = f.getSnapshotBeforeUpdate(m, h)),
        (w = d != null && d.type === gc && d.key == null ? Nc(d.props.children) : d),
        (c = Cc(e, dc(w) ? w : [w], n, r, i, a, o, s, c, l, u)),
        (f.base = n.__e),
        (n.__u &= -161),
        f.__h.length && s.push(f),
        _ && (f.__E = f.__ = null));
    } catch (e) {
      if (((n.__v = null), l || o != null))
        if (e.then) {
          for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
          ((o[o.indexOf(c)] = null), (n.__e = c));
        } else {
          for (T = o.length; T--;) pc(o[T]);
          jc(n);
        }
      else ((n.__e = r.__e), (n.__k = r.__k), e.then || jc(n));
      H.__e(e, n, r);
    }
  else
    o == null && n.__v == r.__v
      ? ((n.__k = r.__k), (n.__e = r.__e))
      : (c = n.__e = Pc(r.__e, n, r, i, a, o, s, l, u));
  return ((d = H.diffed) && d(n), 128 & n.__u ? void 0 : c);
}
function jc(e) {
  e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(jc));
}
function Mc(e, n, r) {
  for (var i = 0; i < r.length; i++) Fc(r[i], r[++i], r[++i]);
  (H.__c && H.__c(n, e),
    e.some(function (n) {
      try {
        ((e = n.__h),
          (n.__h = []),
          e.some(function (e) {
            e.call(n);
          }));
      } catch (e) {
        H.__e(e, n.__v);
      }
    }));
}
function Nc(e) {
  return typeof e != `object` || !e || e.__b > 0
    ? e
    : dc(e)
      ? e.map(Nc)
      : e.constructor === void 0
        ? fc({}, e)
        : null;
}
function Pc(e, n, r, i, a, o, s, c, l) {
  var u,
    d,
    f,
    p,
    m,
    h,
    g,
    _ = r.props || cc,
    v = n.props,
    y = n.type;
  if (
    (y == `svg`
      ? (a = `http://www.w3.org/2000/svg`)
      : y == `math`
        ? (a = `http://www.w3.org/1998/Math/MathML`)
        : (a ||= `http://www.w3.org/1999/xhtml`),
    o != null)
  ) {
    for (u = 0; u < o.length; u++)
      if ((m = o[u]) && `setAttribute` in m == !!y && (y ? m.localName == y : m.nodeType == 3)) {
        ((e = m), (o[u] = null));
        break;
      }
  }
  if (e == null) {
    if (y == null) return document.createTextNode(v);
    ((e = document.createElementNS(a, y, v.is && v)),
      (c &&= (H.__m && H.__m(n, o), !1)),
      (o = null));
  }
  if (y == null) _ === v || (c && e.data == v) || (e.data = v);
  else {
    if (
      ((o = y == `textarea` && v.defaultValue != null ? null : o && Js.call(e.childNodes)),
      !c && o != null)
    )
      for (_ = {}, u = 0; u < e.attributes.length; u++) _[(m = e.attributes[u]).name] = m.value;
    for (u in _)
      ((m = _[u]),
        u == `dangerouslySetInnerHTML`
          ? (f = m)
          : u == `children` ||
            u in v ||
            (u == `value` && `defaultValue` in v) ||
            (u == `checked` && `defaultChecked` in v) ||
            Oc(e, u, null, m, a));
    for (u in v)
      ((m = v[u]),
        u == `children`
          ? (p = m)
          : u == `dangerouslySetInnerHTML`
            ? (d = m)
            : u == `value`
              ? (h = m)
              : u == `checked`
                ? (g = m)
                : (c && typeof m != `function`) || _[u] === m || Oc(e, u, m, _[u], a));
    if (d)
      (c || (f && (d.__html == f.__html || d.__html == e.innerHTML)) || (e.innerHTML = d.__html),
        (n.__k = []));
    else if (
      (f && (e.innerHTML = ``),
      Cc(
        n.type == `template` ? e.content : e,
        dc(p) ? p : [p],
        n,
        r,
        i,
        y == `foreignObject` ? `http://www.w3.org/1999/xhtml` : a,
        o,
        s,
        o ? o[0] : r.__k && vc(r, 0),
        c,
        l
      ),
      o != null)
    )
      for (u = o.length; u--;) pc(o[u]);
    (c && y != `textarea`) ||
      ((u = `value`),
      y == `progress` && h == null
        ? e.removeAttribute(`value`)
        : h != null &&
          (h !== e[u] || (y == `progress` && !h) || (y == `option` && h != _[u])) &&
          Oc(e, u, h, _[u], a),
      (u = `checked`),
      g != null && g != e[u] && Oc(e, u, g, _[u], a));
  }
  return e;
}
function Fc(e, n, r) {
  try {
    if (typeof e == `function`) {
      var i = typeof e.__u == `function`;
      (i && e.__u(), (i && n == null) || (e.__u = e(n)));
    } else e.current = n;
  } catch (e) {
    H.__e(e, r);
  }
}
function Ic(e, n, r) {
  var i, a;
  if (
    (H.unmount && H.unmount(e),
    (i = e.ref) && ((i.current && i.current != e.__e) || Fc(i, null, n)),
    (i = e.__c) != null)
  ) {
    if (i.componentWillUnmount)
      try {
        i.componentWillUnmount();
      } catch (e) {
        H.__e(e, n);
      }
    i.base = i.__P = null;
  }
  if ((i = e.__k))
    for (a = 0; a < i.length; a++) i[a] && Ic(i[a], n, r || typeof e.type != `function`);
  (r || pc(e.__e), (e.__c = e.__ = e.__e = void 0));
}
function Lc(e, n, r) {
  return this.constructor(e, r);
}
function Rc(e, n, r) {
  var i, a, o, s;
  (n == document && (n = document.documentElement),
    H.__ && H.__(e, n),
    (a = (i = typeof r == `function`) ? null : (r && r.__k) || n.__k),
    (o = []),
    (s = []),
    Ac(
      n,
      (e = ((!i && r) || n).__k = mc(gc, null, [e])),
      a || cc,
      cc,
      n.namespaceURI,
      !i && r ? [r] : a ? null : n.firstChild ? Js.call(n.childNodes) : null,
      o,
      !i && r ? r : a ? a.__e : n.firstChild,
      i,
      s
    ),
    Mc(o, e, s));
}
function zc(e, n, r) {
  var i,
    a,
    o,
    s,
    c = fc({}, e.props);
  for (o in (e.type && e.type.defaultProps && (s = e.type.defaultProps), n))
    o == `key`
      ? (i = n[o])
      : o == `ref`
        ? (a = n[o])
        : (c[o] = n[o] === void 0 && s != null ? s[o] : n[o]);
  return (
    arguments.length > 2 && (c.children = arguments.length > 3 ? Js.call(arguments, 2) : r),
    hc(e.type, c, i || e.key, a || e.ref, null)
  );
}
((Js = lc.slice),
  (H = {
    __e: function (e, n, r, i) {
      for (var a, o, s; (n = n.__);)
        if ((a = n.__c) && !a.__)
          try {
            if (
              ((o = a.constructor) &&
                o.getDerivedStateFromError != null &&
                (a.setState(o.getDerivedStateFromError(e)), (s = a.__d)),
              a.componentDidCatch != null && (a.componentDidCatch(e, i || {}), (s = a.__d)),
              s)
            )
              return (a.__E = a);
          } catch (n) {
            e = n;
          }
      throw e;
    },
  }),
  (Ys = 0),
  (Xs = function (e) {
    return e != null && e.constructor === void 0;
  }),
  (_c.prototype.setState = function (e, n) {
    var r = this.__s != null && this.__s != this.state ? this.__s : (this.__s = fc({}, this.state));
    (typeof e == `function` && (e = e(fc({}, r), this.props)),
      e && fc(r, e),
      e != null && this.__v && (n && this._sb.push(n), xc(this)));
  }),
  (_c.prototype.forceUpdate = function (e) {
    this.__v && ((this.__e = !0), e && this.__h.push(e), xc(this));
  }),
  (_c.prototype.render = gc),
  (Zs = []),
  ($s = typeof Promise == `function` ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout),
  (ec = function (e, n) {
    return e.__v.__b - n.__v.__b;
  }),
  (Sc.__r = 0),
  (tc = Math.random().toString(8)),
  (nc = `__d` + tc),
  (rc = `__a` + tc),
  (ic = /(PointerCapture)$|Capture$/i),
  (ac = 0),
  (oc = kc(!1)),
  (sc = kc(!0)));
function Bc(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var r = 0, i = Array(n); r < n; r++) i[r] = e[r];
  return i;
}
function Vc(e) {
  if (Array.isArray(e)) return e;
}
function Hc(e, n, r) {
  return (
    (n = Yc(n)) in e
      ? Object.defineProperty(e, n, { value: r, enumerable: !0, configurable: !0, writable: !0 })
      : (e[n] = r),
    e
  );
}
function Uc(e, n) {
  var r = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (r != null) {
    var i,
      a,
      o,
      s,
      c = [],
      l = !0,
      u = !1;
    try {
      if (((o = (r = r.call(e)).next), n !== 0))
        for (; !(l = (i = o.call(r)).done) && (c.push(i.value), c.length !== n); l = !0);
    } catch (e) {
      ((u = !0), (a = e));
    } finally {
      try {
        if (!l && r.return != null && ((s = r.return()), Object(s) !== s)) return;
      } finally {
        if (u) throw a;
      }
    }
    return c;
  }
}
function Wc() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Gc(e, n) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    (n &&
      (i = i.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })),
      r.push.apply(r, i));
  }
  return r;
}
function Kc(e) {
  for (var n = 1; n < arguments.length; n++) {
    var r = arguments[n] == null ? {} : arguments[n];
    n % 2
      ? Gc(Object(r), !0).forEach(function (n) {
          Hc(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Gc(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function qc(e, n) {
  return Vc(e) || Uc(e, n) || Zc(e, n) || Wc();
}
function Jc(e, n) {
  if (typeof e != `object` || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var i = r.call(e, n);
    if (typeof i != `object`) return i;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (n === `string` ? String : Number)(e);
}
function Yc(e) {
  var n = Jc(e, `string`);
  return typeof n == `symbol` ? n : n + ``;
}
function Xc(e) {
  '@babel/helpers - typeof';
  return (
    (Xc =
      typeof Symbol == `function` && typeof Symbol.iterator == `symbol`
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == `function` &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? `symbol`
              : typeof e;
          }),
    Xc(e)
  );
}
function Zc(e, n) {
  if (e) {
    if (typeof e == `string`) return Bc(e, n);
    var r = {}.toString.call(e).slice(8, -1);
    return (
      r === `Object` && e.constructor && (r = e.constructor.name),
      r === `Map` || r === `Set`
        ? Array.from(e)
        : r === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? Bc(e, n)
          : void 0
    );
  }
}
var Qc = function (e) {
    if (Xc(e) !== `object`) return e;
    var n = zc(e);
    if (n.props) {
      var r;
      ((n.props = Kc({}, n.props)),
        n != null &&
          (r = n.props) != null &&
          r.children &&
          (n.props.children = Array.isArray(n.props.children)
            ? n.props.children.map(Qc)
            : Qc(n.props.children)));
    }
    return n;
  },
  $c = function (e) {
    return Xs(zc(e));
  },
  el = function (e, n) {
    (delete n.__k, Rc(Qc(e), n));
  };
function tl(e, n) {
  n === void 0 && (n = {});
  var r = n.insertAt;
  if (!(typeof document > `u`)) {
    var i = document.head || document.getElementsByTagName(`head`)[0],
      a = document.createElement(`style`);
    ((a.type = `text/css`),
      r === `top` && i.firstChild ? i.insertBefore(a, i.firstChild) : i.appendChild(a),
      a.styleSheet ? (a.styleSheet.cssText = e) : a.appendChild(document.createTextNode(e)));
  }
}
tl(`.float-tooltip-kap {
  position: absolute;
  width: max-content; /* prevent shrinking near right edge */
  max-width: max(50%, 150px);
  padding: 3px 5px;
  border-radius: 3px;
  font: 12px sans-serif;
  color: #eee;
  background: rgba(0,0,0,0.6);
  pointer-events: none;
}
`);
var nl = zo({
  props: {
    content: { default: !1 },
    offsetX: { triggerUpdate: !1 },
    offsetY: { triggerUpdate: !1 },
  },
  init: function (e, n) {
    var r = (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).style,
      i = r === void 0 ? {} : r,
      a = F(e && Xc(e) === `object` && e.node && typeof e.node == `function` ? e.node() : e);
    (a.style(`position`) === `static` && a.style(`position`, `relative`),
      (n.tooltipEl = a.append(`div`).attr(`class`, `float-tooltip-kap`)),
      Object.entries(i).forEach(function (e) {
        var r = qc(e, 2),
          i = r[0],
          a = r[1];
        return n.tooltipEl.style(i, a);
      }),
      n.tooltipEl.style(`left`, `-10000px`).style(`display`, `none`));
    var o = `tooltip-${Math.round(Math.random() * 0xe8d4a51000)}`;
    ((n.mouseInside = !1),
      a.on(`mousemove.${o}`, function (e) {
        n.mouseInside = !0;
        var r = en(e),
          i = a.node(),
          o = i.offsetWidth,
          s = i.offsetHeight,
          c = [
            n.offsetX === null || n.offsetX === void 0
              ? `-${(r[0] / o) * 100}%`
              : typeof n.offsetX == `number`
                ? `calc(-50% + ${n.offsetX}px)`
                : n.offsetX,
            n.offsetY === null || n.offsetY === void 0
              ? s > 130 && s - r[1] < 100
                ? `calc(-100% - 6px)`
                : `21px`
              : typeof n.offsetY == `number`
                ? n.offsetY < 0
                  ? `calc(-100% - ${Math.abs(n.offsetY)}px)`
                  : `${n.offsetY}px`
                : n.offsetY,
          ];
        (n.tooltipEl
          .style(`left`, r[0] + `px`)
          .style(`top`, r[1] + `px`)
          .style(`transform`, `translate(${c.join(`,`)})`),
          n.content && n.tooltipEl.style(`display`, `inline`));
      }),
      a.on(`mouseover.${o}`, function () {
        ((n.mouseInside = !0), n.content && n.tooltipEl.style(`display`, `inline`));
      }),
      a.on(`mouseout.${o}`, function () {
        ((n.mouseInside = !1), n.tooltipEl.style(`display`, `none`));
      }));
  },
  update: function (e) {
    (e.tooltipEl.style(`display`, e.content && e.mouseInside ? `inline` : `none`),
      e.content
        ? e.content instanceof HTMLElement
          ? (e.tooltipEl.text(``),
            e.tooltipEl.append(function () {
              return e.content;
            }))
          : typeof e.content == `string`
            ? e.tooltipEl.html(e.content)
            : $c(e.content)
              ? (e.tooltipEl.text(``), el(e.content, e.tooltipEl.node()))
              : (e.tooltipEl.style(`display`, `none`),
                console.warn(
                  `Tooltip content is invalid, skipping.`,
                  e.content,
                  e.content.toString()
                ))
        : e.tooltipEl.text(``));
  },
});
function rl(e, n, r) {
  var i,
    a = 1;
  ((e ??= 0), (n ??= 0), (r ??= 0));
  function o() {
    var o,
      s = i.length,
      c,
      l = 0,
      u = 0,
      d = 0;
    for (o = 0; o < s; ++o) ((c = i[o]), (l += c.x || 0), (u += c.y || 0), (d += c.z || 0));
    for (l = (l / s - e) * a, u = (u / s - n) * a, d = (d / s - r) * a, o = 0; o < s; ++o)
      ((c = i[o]), l && (c.x -= l), u && (c.y -= u), d && (c.z -= d));
  }
  return (
    (o.initialize = function (e) {
      i = e;
    }),
    (o.x = function (n) {
      return arguments.length ? ((e = +n), o) : e;
    }),
    (o.y = function (e) {
      return arguments.length ? ((n = +e), o) : n;
    }),
    (o.z = function (e) {
      return arguments.length ? ((r = +e), o) : r;
    }),
    (o.strength = function (e) {
      return arguments.length ? ((a = +e), o) : a;
    }),
    o
  );
}
function il(e) {
  let n = +this._x.call(null, e);
  return al(this.cover(n), n, e);
}
function al(e, n, r) {
  if (isNaN(n)) return e;
  var i,
    a = e._root,
    o = { data: r },
    s = e._x0,
    c = e._x1,
    l,
    u,
    d,
    f,
    p;
  if (!a) return ((e._root = o), e);
  for (; a.length;)
    if (((d = n >= (l = (s + c) / 2)) ? (s = l) : (c = l), (i = a), !(a = a[(f = +d)])))
      return ((i[f] = o), e);
  if (((u = +e._x.call(null, a.data)), n === u))
    return ((o.next = a), i ? (i[f] = o) : (e._root = o), e);
  do
    ((i = i ? (i[f] = [, ,]) : (e._root = [, ,])),
      (d = n >= (l = (s + c) / 2)) ? (s = l) : (c = l));
  while ((f = +d) == (p = +(u >= l)));
  return ((i[p] = a), (i[f] = o), e);
}
function ol(e) {
  Array.isArray(e) || (e = Array.from(e));
  let n = e.length,
    r = new Float64Array(n),
    i = 1 / 0,
    a = -1 / 0;
  for (let o = 0, s; o < n; ++o)
    isNaN((s = +this._x.call(null, e[o]))) || ((r[o] = s), s < i && (i = s), s > a && (a = s));
  if (i > a) return this;
  this.cover(i).cover(a);
  for (let i = 0; i < n; ++i) al(this, r[i], e[i]);
  return this;
}
function sl(e) {
  if (isNaN((e = +e))) return this;
  var n = this._x0,
    r = this._x1;
  if (isNaN(n)) r = (n = Math.floor(e)) + 1;
  else {
    for (var i = r - n || 1, a = this._root, o, s; n > e || e >= r;)
      switch (((s = +(e < n)), (o = [, ,]), (o[s] = a), (a = o), (i *= 2), s)) {
        case 0:
          r = n + i;
          break;
        case 1:
          n = r - i;
          break;
      }
    this._root && this._root.length && (this._root = a);
  }
  return ((this._x0 = n), (this._x1 = r), this);
}
function cl() {
  var e = [];
  return (
    this.visit(function (n) {
      if (!n.length)
        do e.push(n.data);
        while ((n = n.next));
    }),
    e
  );
}
function ll(e) {
  return arguments.length
    ? this.cover(+e[0][0]).cover(+e[1][0])
    : isNaN(this._x0)
      ? void 0
      : [[this._x0], [this._x1]];
}
function ul(e, n, r) {
  ((this.node = e), (this.x0 = n), (this.x1 = r));
}
function dl(e, n) {
  var r,
    i = this._x0,
    a,
    o,
    s = this._x1,
    c = [],
    l = this._root,
    u,
    d;
  for (
    l && c.push(new ul(l, i, s)), n == null ? (n = 1 / 0) : ((i = e - n), (s = e + n));
    (u = c.pop());
  )
    if (!(!(l = u.node) || (a = u.x0) > s || (o = u.x1) < i))
      if (l.length) {
        var f = (a + o) / 2;
        (c.push(new ul(l[1], f, o), new ul(l[0], a, f)),
          (d = +(e >= f)) &&
            ((u = c[c.length - 1]),
            (c[c.length - 1] = c[c.length - 1 - d]),
            (c[c.length - 1 - d] = u)));
      } else {
        var p = Math.abs(e - +this._x.call(null, l.data));
        p < n && ((n = p), (i = e - p), (s = e + p), (r = l.data));
      }
  return r;
}
function fl(e) {
  if (isNaN((l = +this._x.call(null, e)))) return this;
  var n,
    r = this._root,
    i,
    a,
    o,
    s = this._x0,
    c = this._x1,
    l,
    u,
    d,
    f,
    p;
  if (!r) return this;
  if (r.length)
    for (;;) {
      if (((d = l >= (u = (s + c) / 2)) ? (s = u) : (c = u), (n = r), !(r = r[(f = +d)])))
        return this;
      if (!r.length) break;
      n[(f + 1) & 1] && ((i = n), (p = f));
    }
  for (; r.data !== e;) if (((a = r), !(r = r.next))) return this;
  return (
    (o = r.next) && delete r.next,
    a
      ? (o ? (a.next = o) : delete a.next, this)
      : n
        ? (o ? (n[f] = o) : delete n[f],
          (r = n[0] || n[1]) &&
            r === (n[1] || n[0]) &&
            !r.length &&
            (i ? (i[p] = r) : (this._root = r)),
          this)
        : ((this._root = o), this)
  );
}
function pl(e) {
  for (var n = 0, r = e.length; n < r; ++n) this.remove(e[n]);
  return this;
}
function ml() {
  return this._root;
}
function hl() {
  var e = 0;
  return (
    this.visit(function (n) {
      if (!n.length)
        do ++e;
        while ((n = n.next));
    }),
    e
  );
}
function gl(e) {
  var n = [],
    r,
    i = this._root,
    a,
    o,
    s;
  for (i && n.push(new ul(i, this._x0, this._x1)); (r = n.pop());)
    if (!e((i = r.node), (o = r.x0), (s = r.x1)) && i.length) {
      var c = (o + s) / 2;
      ((a = i[1]) && n.push(new ul(a, c, s)), (a = i[0]) && n.push(new ul(a, o, c)));
    }
  return this;
}
function _l(e) {
  var n = [],
    r = [],
    i;
  for (this._root && n.push(new ul(this._root, this._x0, this._x1)); (i = n.pop());) {
    var a = i.node;
    if (a.length) {
      var o,
        s = i.x0,
        c = i.x1,
        l = (s + c) / 2;
      ((o = a[0]) && n.push(new ul(o, s, l)), (o = a[1]) && n.push(new ul(o, l, c)));
    }
    r.push(i);
  }
  for (; (i = r.pop());) e(i.node, i.x0, i.x1);
  return this;
}
function vl(e) {
  return e[0];
}
function yl(e) {
  return arguments.length ? ((this._x = e), this) : this._x;
}
function bl(e, n) {
  var r = new xl(n ?? vl, NaN, NaN);
  return e == null ? r : r.addAll(e);
}
function xl(e, n, r) {
  ((this._x = e), (this._x0 = n), (this._x1 = r), (this._root = void 0));
}
function Sl(e) {
  for (var n = { data: e.data }, r = n; (e = e.next);) r = r.next = { data: e.data };
  return n;
}
var U = (bl.prototype = xl.prototype);
((U.copy = function () {
  var e = new xl(this._x, this._x0, this._x1),
    n = this._root,
    r,
    i;
  if (!n) return e;
  if (!n.length) return ((e._root = Sl(n)), e);
  for (r = [{ source: n, target: (e._root = [, ,]) }]; (n = r.pop());)
    for (var a = 0; a < 2; ++a)
      (i = n.source[a]) &&
        (i.length ? r.push({ source: i, target: (n.target[a] = [, ,]) }) : (n.target[a] = Sl(i)));
  return e;
}),
  (U.add = il),
  (U.addAll = ol),
  (U.cover = sl),
  (U.data = cl),
  (U.extent = ll),
  (U.find = dl),
  (U.remove = fl),
  (U.removeAll = pl),
  (U.root = ml),
  (U.size = hl),
  (U.visit = gl),
  (U.visitAfter = _l),
  (U.x = yl));
function Cl(e) {
  let n = +this._x.call(null, e),
    r = +this._y.call(null, e);
  return wl(this.cover(n, r), n, r, e);
}
function wl(e, n, r, i) {
  if (isNaN(n) || isNaN(r)) return e;
  var a,
    o = e._root,
    s = { data: i },
    c = e._x0,
    l = e._y0,
    u = e._x1,
    d = e._y1,
    f,
    p,
    m,
    h,
    g,
    _,
    v,
    y;
  if (!o) return ((e._root = s), e);
  for (; o.length;)
    if (
      ((g = n >= (f = (c + u) / 2)) ? (c = f) : (u = f),
      (_ = r >= (p = (l + d) / 2)) ? (l = p) : (d = p),
      (a = o),
      !(o = o[(v = (_ << 1) | g)]))
    )
      return ((a[v] = s), e);
  if (((m = +e._x.call(null, o.data)), (h = +e._y.call(null, o.data)), n === m && r === h))
    return ((s.next = o), a ? (a[v] = s) : (e._root = s), e);
  do
    ((a = a ? (a[v] = [, , , ,]) : (e._root = [, , , ,])),
      (g = n >= (f = (c + u) / 2)) ? (c = f) : (u = f),
      (_ = r >= (p = (l + d) / 2)) ? (l = p) : (d = p));
  while ((v = (_ << 1) | g) == (y = ((h >= p) << 1) | (m >= f)));
  return ((a[y] = o), (a[v] = s), e);
}
function Tl(e) {
  var n,
    r,
    i = e.length,
    a,
    o,
    s = Array(i),
    c = Array(i),
    l = 1 / 0,
    u = 1 / 0,
    d = -1 / 0,
    f = -1 / 0;
  for (r = 0; r < i; ++r)
    isNaN((a = +this._x.call(null, (n = e[r])))) ||
      isNaN((o = +this._y.call(null, n))) ||
      ((s[r] = a),
      (c[r] = o),
      a < l && (l = a),
      a > d && (d = a),
      o < u && (u = o),
      o > f && (f = o));
  if (l > d || u > f) return this;
  for (this.cover(l, u).cover(d, f), r = 0; r < i; ++r) wl(this, s[r], c[r], e[r]);
  return this;
}
function El(e, n) {
  if (isNaN((e = +e)) || isNaN((n = +n))) return this;
  var r = this._x0,
    i = this._y0,
    a = this._x1,
    o = this._y1;
  if (isNaN(r)) ((a = (r = Math.floor(e)) + 1), (o = (i = Math.floor(n)) + 1));
  else {
    for (var s = a - r || 1, c = this._root, l, u; r > e || e >= a || i > n || n >= o;)
      switch (((u = ((n < i) << 1) | (e < r)), (l = [, , , ,]), (l[u] = c), (c = l), (s *= 2), u)) {
        case 0:
          ((a = r + s), (o = i + s));
          break;
        case 1:
          ((r = a - s), (o = i + s));
          break;
        case 2:
          ((a = r + s), (i = o - s));
          break;
        case 3:
          ((r = a - s), (i = o - s));
          break;
      }
    this._root && this._root.length && (this._root = c);
  }
  return ((this._x0 = r), (this._y0 = i), (this._x1 = a), (this._y1 = o), this);
}
function Dl() {
  var e = [];
  return (
    this.visit(function (n) {
      if (!n.length)
        do e.push(n.data);
        while ((n = n.next));
    }),
    e
  );
}
function Ol(e) {
  return arguments.length
    ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1])
    : isNaN(this._x0)
      ? void 0
      : [
          [this._x0, this._y0],
          [this._x1, this._y1],
        ];
}
function W(e, n, r, i, a) {
  ((this.node = e), (this.x0 = n), (this.y0 = r), (this.x1 = i), (this.y1 = a));
}
function kl(e, n, r) {
  var i,
    a = this._x0,
    o = this._y0,
    s,
    c,
    l,
    u,
    d = this._x1,
    f = this._y1,
    p = [],
    m = this._root,
    h,
    g;
  for (
    m && p.push(new W(m, a, o, d, f)),
      r == null ? (r = 1 / 0) : ((a = e - r), (o = n - r), (d = e + r), (f = n + r), (r *= r));
    (h = p.pop());
  )
    if (!(!(m = h.node) || (s = h.x0) > d || (c = h.y0) > f || (l = h.x1) < a || (u = h.y1) < o))
      if (m.length) {
        var _ = (s + l) / 2,
          v = (c + u) / 2;
        (p.push(
          new W(m[3], _, v, l, u),
          new W(m[2], s, v, _, u),
          new W(m[1], _, c, l, v),
          new W(m[0], s, c, _, v)
        ),
          (g = ((n >= v) << 1) | (e >= _)) &&
            ((h = p[p.length - 1]),
            (p[p.length - 1] = p[p.length - 1 - g]),
            (p[p.length - 1 - g] = h)));
      } else {
        var y = e - +this._x.call(null, m.data),
          b = n - +this._y.call(null, m.data),
          x = y * y + b * b;
        if (x < r) {
          var S = Math.sqrt((r = x));
          ((a = e - S), (o = n - S), (d = e + S), (f = n + S), (i = m.data));
        }
      }
  return i;
}
function Al(e) {
  if (isNaN((d = +this._x.call(null, e))) || isNaN((f = +this._y.call(null, e)))) return this;
  var n,
    r = this._root,
    i,
    a,
    o,
    s = this._x0,
    c = this._y0,
    l = this._x1,
    u = this._y1,
    d,
    f,
    p,
    m,
    h,
    g,
    _,
    v;
  if (!r) return this;
  if (r.length)
    for (;;) {
      if (
        ((h = d >= (p = (s + l) / 2)) ? (s = p) : (l = p),
        (g = f >= (m = (c + u) / 2)) ? (c = m) : (u = m),
        (n = r),
        !(r = r[(_ = (g << 1) | h)]))
      )
        return this;
      if (!r.length) break;
      (n[(_ + 1) & 3] || n[(_ + 2) & 3] || n[(_ + 3) & 3]) && ((i = n), (v = _));
    }
  for (; r.data !== e;) if (((a = r), !(r = r.next))) return this;
  return (
    (o = r.next) && delete r.next,
    a
      ? (o ? (a.next = o) : delete a.next, this)
      : n
        ? (o ? (n[_] = o) : delete n[_],
          (r = n[0] || n[1] || n[2] || n[3]) &&
            r === (n[3] || n[2] || n[1] || n[0]) &&
            !r.length &&
            (i ? (i[v] = r) : (this._root = r)),
          this)
        : ((this._root = o), this)
  );
}
function jl(e) {
  for (var n = 0, r = e.length; n < r; ++n) this.remove(e[n]);
  return this;
}
function Ml() {
  return this._root;
}
function Nl() {
  var e = 0;
  return (
    this.visit(function (n) {
      if (!n.length)
        do ++e;
        while ((n = n.next));
    }),
    e
  );
}
function Pl(e) {
  var n = [],
    r,
    i = this._root,
    a,
    o,
    s,
    c,
    l;
  for (i && n.push(new W(i, this._x0, this._y0, this._x1, this._y1)); (r = n.pop());)
    if (!e((i = r.node), (o = r.x0), (s = r.y0), (c = r.x1), (l = r.y1)) && i.length) {
      var u = (o + c) / 2,
        d = (s + l) / 2;
      ((a = i[3]) && n.push(new W(a, u, d, c, l)),
        (a = i[2]) && n.push(new W(a, o, d, u, l)),
        (a = i[1]) && n.push(new W(a, u, s, c, d)),
        (a = i[0]) && n.push(new W(a, o, s, u, d)));
    }
  return this;
}
function Fl(e) {
  var n = [],
    r = [],
    i;
  for (
    this._root && n.push(new W(this._root, this._x0, this._y0, this._x1, this._y1));
    (i = n.pop());
  ) {
    var a = i.node;
    if (a.length) {
      var o,
        s = i.x0,
        c = i.y0,
        l = i.x1,
        u = i.y1,
        d = (s + l) / 2,
        f = (c + u) / 2;
      ((o = a[0]) && n.push(new W(o, s, c, d, f)),
        (o = a[1]) && n.push(new W(o, d, c, l, f)),
        (o = a[2]) && n.push(new W(o, s, f, d, u)),
        (o = a[3]) && n.push(new W(o, d, f, l, u)));
    }
    r.push(i);
  }
  for (; (i = r.pop());) e(i.node, i.x0, i.y0, i.x1, i.y1);
  return this;
}
function Il(e) {
  return e[0];
}
function Ll(e) {
  return arguments.length ? ((this._x = e), this) : this._x;
}
function Rl(e) {
  return e[1];
}
function zl(e) {
  return arguments.length ? ((this._y = e), this) : this._y;
}
function Bl(e, n, r) {
  var i = new Vl(n ?? Il, r ?? Rl, NaN, NaN, NaN, NaN);
  return e == null ? i : i.addAll(e);
}
function Vl(e, n, r, i, a, o) {
  ((this._x = e),
    (this._y = n),
    (this._x0 = r),
    (this._y0 = i),
    (this._x1 = a),
    (this._y1 = o),
    (this._root = void 0));
}
function Hl(e) {
  for (var n = { data: e.data }, r = n; (e = e.next);) r = r.next = { data: e.data };
  return n;
}
var G = (Bl.prototype = Vl.prototype);
((G.copy = function () {
  var e = new Vl(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
    n = this._root,
    r,
    i;
  if (!n) return e;
  if (!n.length) return ((e._root = Hl(n)), e);
  for (r = [{ source: n, target: (e._root = [, , , ,]) }]; (n = r.pop());)
    for (var a = 0; a < 4; ++a)
      (i = n.source[a]) &&
        (i.length
          ? r.push({ source: i, target: (n.target[a] = [, , , ,]) })
          : (n.target[a] = Hl(i)));
  return e;
}),
  (G.add = Cl),
  (G.addAll = Tl),
  (G.cover = El),
  (G.data = Dl),
  (G.extent = Ol),
  (G.find = kl),
  (G.remove = Al),
  (G.removeAll = jl),
  (G.root = Ml),
  (G.size = Nl),
  (G.visit = Pl),
  (G.visitAfter = Fl),
  (G.x = Ll),
  (G.y = zl));
function Ul(e) {
  let n = +this._x.call(null, e),
    r = +this._y.call(null, e),
    i = +this._z.call(null, e);
  return Wl(this.cover(n, r, i), n, r, i, e);
}
function Wl(e, n, r, i, a) {
  if (isNaN(n) || isNaN(r) || isNaN(i)) return e;
  var o,
    s = e._root,
    c = { data: a },
    l = e._x0,
    u = e._y0,
    d = e._z0,
    f = e._x1,
    p = e._y1,
    m = e._z1,
    h,
    g,
    _,
    v,
    y,
    b,
    x,
    S,
    C,
    w,
    T;
  if (!s) return ((e._root = c), e);
  for (; s.length;)
    if (
      ((x = n >= (h = (l + f) / 2)) ? (l = h) : (f = h),
      (S = r >= (g = (u + p) / 2)) ? (u = g) : (p = g),
      (C = i >= (_ = (d + m) / 2)) ? (d = _) : (m = _),
      (o = s),
      !(s = s[(w = (C << 2) | (S << 1) | x)]))
    )
      return ((o[w] = c), e);
  if (
    ((v = +e._x.call(null, s.data)),
    (y = +e._y.call(null, s.data)),
    (b = +e._z.call(null, s.data)),
    n === v && r === y && i === b)
  )
    return ((c.next = s), o ? (o[w] = c) : (e._root = c), e);
  do
    ((o = o ? (o[w] = Array(8)) : (e._root = Array(8))),
      (x = n >= (h = (l + f) / 2)) ? (l = h) : (f = h),
      (S = r >= (g = (u + p) / 2)) ? (u = g) : (p = g),
      (C = i >= (_ = (d + m) / 2)) ? (d = _) : (m = _));
  while ((w = (C << 2) | (S << 1) | x) == (T = ((b >= _) << 2) | ((y >= g) << 1) | (v >= h)));
  return ((o[T] = s), (o[w] = c), e);
}
function Gl(e) {
  Array.isArray(e) || (e = Array.from(e));
  let n = e.length,
    r = new Float64Array(n),
    i = new Float64Array(n),
    a = new Float64Array(n),
    o = 1 / 0,
    s = 1 / 0,
    c = 1 / 0,
    l = -1 / 0,
    u = -1 / 0,
    d = -1 / 0;
  for (let f = 0, p, m, h, g; f < n; ++f)
    isNaN((m = +this._x.call(null, (p = e[f])))) ||
      isNaN((h = +this._y.call(null, p))) ||
      isNaN((g = +this._z.call(null, p))) ||
      ((r[f] = m),
      (i[f] = h),
      (a[f] = g),
      m < o && (o = m),
      m > l && (l = m),
      h < s && (s = h),
      h > u && (u = h),
      g < c && (c = g),
      g > d && (d = g));
  if (o > l || s > u || c > d) return this;
  this.cover(o, s, c).cover(l, u, d);
  for (let o = 0; o < n; ++o) Wl(this, r[o], i[o], a[o], e[o]);
  return this;
}
function Kl(e, n, r) {
  if (isNaN((e = +e)) || isNaN((n = +n)) || isNaN((r = +r))) return this;
  var i = this._x0,
    a = this._y0,
    o = this._z0,
    s = this._x1,
    c = this._y1,
    l = this._z1;
  if (isNaN(i))
    ((s = (i = Math.floor(e)) + 1), (c = (a = Math.floor(n)) + 1), (l = (o = Math.floor(r)) + 1));
  else {
    for (
      var u = s - i || 1, d = this._root, f, p;
      i > e || e >= s || a > n || n >= c || o > r || r >= l;
    )
      switch (
        ((p = ((r < o) << 2) | ((n < a) << 1) | (e < i)),
        (f = Array(8)),
        (f[p] = d),
        (d = f),
        (u *= 2),
        p)
      ) {
        case 0:
          ((s = i + u), (c = a + u), (l = o + u));
          break;
        case 1:
          ((i = s - u), (c = a + u), (l = o + u));
          break;
        case 2:
          ((s = i + u), (a = c - u), (l = o + u));
          break;
        case 3:
          ((i = s - u), (a = c - u), (l = o + u));
          break;
        case 4:
          ((s = i + u), (c = a + u), (o = l - u));
          break;
        case 5:
          ((i = s - u), (c = a + u), (o = l - u));
          break;
        case 6:
          ((s = i + u), (a = c - u), (o = l - u));
          break;
        case 7:
          ((i = s - u), (a = c - u), (o = l - u));
          break;
      }
    this._root && this._root.length && (this._root = d);
  }
  return (
    (this._x0 = i),
    (this._y0 = a),
    (this._z0 = o),
    (this._x1 = s),
    (this._y1 = c),
    (this._z1 = l),
    this
  );
}
function ql() {
  var e = [];
  return (
    this.visit(function (n) {
      if (!n.length)
        do e.push(n.data);
        while ((n = n.next));
    }),
    e
  );
}
function Jl(e) {
  return arguments.length
    ? this.cover(+e[0][0], +e[0][1], +e[0][2]).cover(+e[1][0], +e[1][1], +e[1][2])
    : isNaN(this._x0)
      ? void 0
      : [
          [this._x0, this._y0, this._z0],
          [this._x1, this._y1, this._z1],
        ];
}
function K(e, n, r, i, a, o, s) {
  ((this.node = e),
    (this.x0 = n),
    (this.y0 = r),
    (this.z0 = i),
    (this.x1 = a),
    (this.y1 = o),
    (this.z1 = s));
}
function Yl(e, n, r, i) {
  var a,
    o = this._x0,
    s = this._y0,
    c = this._z0,
    l,
    u,
    d,
    f,
    p,
    m,
    h = this._x1,
    g = this._y1,
    _ = this._z1,
    v = [],
    y = this._root,
    b,
    x;
  for (
    y && v.push(new K(y, o, s, c, h, g, _)),
      i == null
        ? (i = 1 / 0)
        : ((o = e - i), (s = n - i), (c = r - i), (h = e + i), (g = n + i), (_ = r + i), (i *= i));
    (b = v.pop());
  )
    if (!(
      !(y = b.node) ||
      (l = b.x0) > h ||
      (u = b.y0) > g ||
      (d = b.z0) > _ ||
      (f = b.x1) < o ||
      (p = b.y1) < s ||
      (m = b.z1) < c
    ))
      if (y.length) {
        var S = (l + f) / 2,
          C = (u + p) / 2,
          w = (d + m) / 2;
        (v.push(
          new K(y[7], S, C, w, f, p, m),
          new K(y[6], l, C, w, S, p, m),
          new K(y[5], S, u, w, f, C, m),
          new K(y[4], l, u, w, S, C, m),
          new K(y[3], S, C, d, f, p, w),
          new K(y[2], l, C, d, S, p, w),
          new K(y[1], S, u, d, f, C, w),
          new K(y[0], l, u, d, S, C, w)
        ),
          (x = ((r >= w) << 2) | ((n >= C) << 1) | (e >= S)) &&
            ((b = v[v.length - 1]),
            (v[v.length - 1] = v[v.length - 1 - x]),
            (v[v.length - 1 - x] = b)));
      } else {
        var T = e - +this._x.call(null, y.data),
          E = n - +this._y.call(null, y.data),
          ee = r - +this._z.call(null, y.data),
          te = T * T + E * E + ee * ee;
        if (te < i) {
          var ne = Math.sqrt((i = te));
          ((o = e - ne),
            (s = n - ne),
            (c = r - ne),
            (h = e + ne),
            (g = n + ne),
            (_ = r + ne),
            (a = y.data));
        }
      }
  return a;
}
var Xl = (e, n, r, i, a, o) => Math.sqrt((e - i) ** 2 + (n - a) ** 2 + (r - o) ** 2);
function Zl(e, n, r, i) {
  let a = [],
    o = e - i,
    s = n - i,
    c = r - i,
    l = e + i,
    u = n + i,
    d = r + i;
  return (
    this.visit((f, p, m, h, g, _, v) => {
      if (!f.length)
        do {
          let o = f.data;
          Xl(e, n, r, this._x(o), this._y(o), this._z(o)) <= i && a.push(o);
        } while ((f = f.next));
      return p > l || m > u || h > d || g < o || _ < s || v < c;
    }),
    a
  );
}
function Ql(e) {
  if (
    isNaN((p = +this._x.call(null, e))) ||
    isNaN((m = +this._y.call(null, e))) ||
    isNaN((h = +this._z.call(null, e)))
  )
    return this;
  var n,
    r = this._root,
    i,
    a,
    o,
    s = this._x0,
    c = this._y0,
    l = this._z0,
    u = this._x1,
    d = this._y1,
    f = this._z1,
    p,
    m,
    h,
    g,
    _,
    v,
    y,
    b,
    x,
    S,
    C;
  if (!r) return this;
  if (r.length)
    for (;;) {
      if (
        ((y = p >= (g = (s + u) / 2)) ? (s = g) : (u = g),
        (b = m >= (_ = (c + d) / 2)) ? (c = _) : (d = _),
        (x = h >= (v = (l + f) / 2)) ? (l = v) : (f = v),
        (n = r),
        !(r = r[(S = (x << 2) | (b << 1) | y)]))
      )
        return this;
      if (!r.length) break;
      (n[(S + 1) & 7] ||
        n[(S + 2) & 7] ||
        n[(S + 3) & 7] ||
        n[(S + 4) & 7] ||
        n[(S + 5) & 7] ||
        n[(S + 6) & 7] ||
        n[(S + 7) & 7]) &&
        ((i = n), (C = S));
    }
  for (; r.data !== e;) if (((a = r), !(r = r.next))) return this;
  return (
    (o = r.next) && delete r.next,
    a
      ? (o ? (a.next = o) : delete a.next, this)
      : n
        ? (o ? (n[S] = o) : delete n[S],
          (r = n[0] || n[1] || n[2] || n[3] || n[4] || n[5] || n[6] || n[7]) &&
            r === (n[7] || n[6] || n[5] || n[4] || n[3] || n[2] || n[1] || n[0]) &&
            !r.length &&
            (i ? (i[C] = r) : (this._root = r)),
          this)
        : ((this._root = o), this)
  );
}
function $l(e) {
  for (var n = 0, r = e.length; n < r; ++n) this.remove(e[n]);
  return this;
}
function eu() {
  return this._root;
}
function tu() {
  var e = 0;
  return (
    this.visit(function (n) {
      if (!n.length)
        do ++e;
        while ((n = n.next));
    }),
    e
  );
}
function nu(e) {
  var n = [],
    r,
    i = this._root,
    a,
    o,
    s,
    c,
    l,
    u,
    d;
  for (
    i && n.push(new K(i, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1));
    (r = n.pop());
  )
    if (
      !e((i = r.node), (o = r.x0), (s = r.y0), (c = r.z0), (l = r.x1), (u = r.y1), (d = r.z1)) &&
      i.length
    ) {
      var f = (o + l) / 2,
        p = (s + u) / 2,
        m = (c + d) / 2;
      ((a = i[7]) && n.push(new K(a, f, p, m, l, u, d)),
        (a = i[6]) && n.push(new K(a, o, p, m, f, u, d)),
        (a = i[5]) && n.push(new K(a, f, s, m, l, p, d)),
        (a = i[4]) && n.push(new K(a, o, s, m, f, p, d)),
        (a = i[3]) && n.push(new K(a, f, p, c, l, u, m)),
        (a = i[2]) && n.push(new K(a, o, p, c, f, u, m)),
        (a = i[1]) && n.push(new K(a, f, s, c, l, p, m)),
        (a = i[0]) && n.push(new K(a, o, s, c, f, p, m)));
    }
  return this;
}
function ru(e) {
  var n = [],
    r = [],
    i;
  for (
    this._root &&
    n.push(new K(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1));
    (i = n.pop());
  ) {
    var a = i.node;
    if (a.length) {
      var o,
        s = i.x0,
        c = i.y0,
        l = i.z0,
        u = i.x1,
        d = i.y1,
        f = i.z1,
        p = (s + u) / 2,
        m = (c + d) / 2,
        h = (l + f) / 2;
      ((o = a[0]) && n.push(new K(o, s, c, l, p, m, h)),
        (o = a[1]) && n.push(new K(o, p, c, l, u, m, h)),
        (o = a[2]) && n.push(new K(o, s, m, l, p, d, h)),
        (o = a[3]) && n.push(new K(o, p, m, l, u, d, h)),
        (o = a[4]) && n.push(new K(o, s, c, h, p, m, f)),
        (o = a[5]) && n.push(new K(o, p, c, h, u, m, f)),
        (o = a[6]) && n.push(new K(o, s, m, h, p, d, f)),
        (o = a[7]) && n.push(new K(o, p, m, h, u, d, f)));
    }
    r.push(i);
  }
  for (; (i = r.pop());) e(i.node, i.x0, i.y0, i.z0, i.x1, i.y1, i.z1);
  return this;
}
function iu(e) {
  return e[0];
}
function au(e) {
  return arguments.length ? ((this._x = e), this) : this._x;
}
function ou(e) {
  return e[1];
}
function su(e) {
  return arguments.length ? ((this._y = e), this) : this._y;
}
function cu(e) {
  return e[2];
}
function lu(e) {
  return arguments.length ? ((this._z = e), this) : this._z;
}
function uu(e, n, r, i) {
  var a = new du(n ?? iu, r ?? ou, i ?? cu, NaN, NaN, NaN, NaN, NaN, NaN);
  return e == null ? a : a.addAll(e);
}
function du(e, n, r, i, a, o, s, c, l) {
  ((this._x = e),
    (this._y = n),
    (this._z = r),
    (this._x0 = i),
    (this._y0 = a),
    (this._z0 = o),
    (this._x1 = s),
    (this._y1 = c),
    (this._z1 = l),
    (this._root = void 0));
}
function fu(e) {
  for (var n = { data: e.data }, r = n; (e = e.next);) r = r.next = { data: e.data };
  return n;
}
var q = (uu.prototype = du.prototype);
((q.copy = function () {
  var e = new du(
      this._x,
      this._y,
      this._z,
      this._x0,
      this._y0,
      this._z0,
      this._x1,
      this._y1,
      this._z1
    ),
    n = this._root,
    r,
    i;
  if (!n) return e;
  if (!n.length) return ((e._root = fu(n)), e);
  for (r = [{ source: n, target: (e._root = Array(8)) }]; (n = r.pop());)
    for (var a = 0; a < 8; ++a)
      (i = n.source[a]) &&
        (i.length
          ? r.push({ source: i, target: (n.target[a] = Array(8)) })
          : (n.target[a] = fu(i)));
  return e;
}),
  (q.add = Ul),
  (q.addAll = Gl),
  (q.cover = Kl),
  (q.data = ql),
  (q.extent = Jl),
  (q.find = Yl),
  (q.findAllWithinRadius = Zl),
  (q.remove = Ql),
  (q.removeAll = $l),
  (q.root = eu),
  (q.size = tu),
  (q.visit = nu),
  (q.visitAfter = ru),
  (q.x = au),
  (q.y = su),
  (q.z = lu));
function pu(e) {
  return function () {
    return e;
  };
}
function mu(e) {
  return (e() - 0.5) * 1e-6;
}
function hu(e) {
  return e.index;
}
function gu(e, n) {
  var r = e.get(n);
  if (!r) throw Error(`node not found: ` + n);
  return r;
}
function _u(e) {
  var n = hu,
    r = p,
    i,
    a = pu(30),
    o,
    s,
    c,
    l,
    u,
    d,
    f = 1;
  e ??= [];
  function p(e) {
    return 1 / Math.min(l[e.source.index], l[e.target.index]);
  }
  function m(n) {
    for (var r = 0, a = e.length; r < f; ++r)
      for (var s = 0, l, p, m, h = 0, g = 0, _ = 0, v, y; s < a; ++s)
        ((l = e[s]),
          (p = l.source),
          (m = l.target),
          (h = m.x + m.vx - p.x - p.vx || mu(d)),
          c > 1 && (g = m.y + m.vy - p.y - p.vy || mu(d)),
          c > 2 && (_ = m.z + m.vz - p.z - p.vz || mu(d)),
          (v = Math.sqrt(h * h + g * g + _ * _)),
          (v = ((v - o[s]) / v) * n * i[s]),
          (h *= v),
          (g *= v),
          (_ *= v),
          (m.vx -= h * (y = u[s])),
          c > 1 && (m.vy -= g * y),
          c > 2 && (m.vz -= _ * y),
          (p.vx += h * (y = 1 - y)),
          c > 1 && (p.vy += g * y),
          c > 2 && (p.vz += _ * y));
  }
  function h() {
    if (s) {
      var r,
        a = s.length,
        c = e.length,
        d = new Map(s.map((e, r) => [n(e, r, s), e])),
        f;
      for (r = 0, l = Array(a); r < c; ++r)
        ((f = e[r]),
          (f.index = r),
          typeof f.source != `object` && (f.source = gu(d, f.source)),
          typeof f.target != `object` && (f.target = gu(d, f.target)),
          (l[f.source.index] = (l[f.source.index] || 0) + 1),
          (l[f.target.index] = (l[f.target.index] || 0) + 1));
      for (r = 0, u = Array(c); r < c; ++r)
        ((f = e[r]), (u[r] = l[f.source.index] / (l[f.source.index] + l[f.target.index])));
      ((i = Array(c)), g(), (o = Array(c)), _());
    }
  }
  function g() {
    if (s) for (var n = 0, a = e.length; n < a; ++n) i[n] = +r(e[n], n, e);
  }
  function _() {
    if (s) for (var n = 0, r = e.length; n < r; ++n) o[n] = +a(e[n], n, e);
  }
  return (
    (m.initialize = function (e, ...n) {
      ((s = e),
        (d = n.find((e) => typeof e == `function`) || Math.random),
        (c = n.find((e) => [1, 2, 3].includes(e)) || 2),
        h());
    }),
    (m.links = function (n) {
      return arguments.length ? ((e = n), h(), m) : e;
    }),
    (m.id = function (e) {
      return arguments.length ? ((n = e), m) : n;
    }),
    (m.iterations = function (e) {
      return arguments.length ? ((f = +e), m) : f;
    }),
    (m.strength = function (e) {
      return arguments.length ? ((r = typeof e == `function` ? e : pu(+e)), g(), m) : r;
    }),
    (m.distance = function (e) {
      return arguments.length ? ((a = typeof e == `function` ? e : pu(+e)), _(), m) : a;
    }),
    m
  );
}
var vu = 1664525,
  yu = 1013904223,
  bu = 4294967296;
function xu() {
  let e = 1;
  return () => (e = (vu * e + yu) % bu) / bu;
}
var Su = 3;
function Cu(e) {
  return e.x;
}
function wu(e) {
  return e.y;
}
function Tu(e) {
  return e.z;
}
var Eu = 10,
  Du = Math.PI * (3 - Math.sqrt(5)),
  Ou = (Math.PI * 20) / (9 + Math.sqrt(221));
function ku(e, n) {
  n ||= 2;
  var r = Math.min(Su, Math.max(1, Math.round(n))),
    i,
    a = 1,
    o = 0.001,
    s = 1 - o ** (1 / 300),
    c = 0,
    l = 0.6,
    u = new Map(),
    d = Gr(m),
    f = nn(`tick`, `end`),
    p = xu();
  e ??= [];
  function m() {
    (h(), f.call(`tick`, i), a < o && (d.stop(), f.call(`end`, i)));
  }
  function h(n) {
    var o,
      d = e.length,
      f;
    n === void 0 && (n = 1);
    for (var p = 0; p < n; ++p)
      for (
        a += (c - a) * s,
          u.forEach(function (e) {
            e(a);
          }),
          o = 0;
        o < d;
        ++o
      )
        ((f = e[o]),
          f.fx == null ? (f.x += f.vx *= l) : ((f.x = f.fx), (f.vx = 0)),
          r > 1 && (f.fy == null ? (f.y += f.vy *= l) : ((f.y = f.fy), (f.vy = 0))),
          r > 2 && (f.fz == null ? (f.z += f.vz *= l) : ((f.z = f.fz), (f.vz = 0))));
    return i;
  }
  function g() {
    for (var n = 0, i = e.length, a; n < i; ++n) {
      if (
        ((a = e[n]),
        (a.index = n),
        a.fx != null && (a.x = a.fx),
        a.fy != null && (a.y = a.fy),
        a.fz != null && (a.z = a.fz),
        isNaN(a.x) || (r > 1 && isNaN(a.y)) || (r > 2 && isNaN(a.z)))
      ) {
        var o = Eu * (r > 2 ? Math.cbrt(0.5 + n) : r > 1 ? Math.sqrt(0.5 + n) : n),
          s = n * Du,
          c = n * Ou;
        r === 1
          ? (a.x = o)
          : r === 2
            ? ((a.x = o * Math.cos(s)), (a.y = o * Math.sin(s)))
            : ((a.x = o * Math.sin(s) * Math.cos(c)),
              (a.y = o * Math.cos(s)),
              (a.z = o * Math.sin(s) * Math.sin(c)));
      }
      (isNaN(a.vx) || (r > 1 && isNaN(a.vy)) || (r > 2 && isNaN(a.vz))) &&
        ((a.vx = 0), r > 1 && (a.vy = 0), r > 2 && (a.vz = 0));
    }
  }
  function _(n) {
    return (n.initialize && n.initialize(e, p, r), n);
  }
  return (
    g(),
    (i = {
      tick: h,
      restart: function () {
        return (d.restart(m), i);
      },
      stop: function () {
        return (d.stop(), i);
      },
      numDimensions: function (e) {
        return arguments.length
          ? ((r = Math.min(Su, Math.max(1, Math.round(e)))), u.forEach(_), i)
          : r;
      },
      nodes: function (n) {
        return arguments.length ? ((e = n), g(), u.forEach(_), i) : e;
      },
      alpha: function (e) {
        return arguments.length ? ((a = +e), i) : a;
      },
      alphaMin: function (e) {
        return arguments.length ? ((o = +e), i) : o;
      },
      alphaDecay: function (e) {
        return arguments.length ? ((s = +e), i) : +s;
      },
      alphaTarget: function (e) {
        return arguments.length ? ((c = +e), i) : c;
      },
      velocityDecay: function (e) {
        return arguments.length ? ((l = 1 - e), i) : 1 - l;
      },
      randomSource: function (e) {
        return arguments.length ? ((p = e), u.forEach(_), i) : p;
      },
      force: function (e, n) {
        return arguments.length > 1 ? (n == null ? u.delete(e) : u.set(e, _(n)), i) : u.get(e);
      },
      find: function () {
        var n = Array.prototype.slice.call(arguments),
          i = n.shift() || 0,
          a = (r > 1 ? n.shift() : null) || 0,
          o = (r > 2 ? n.shift() : null) || 0,
          s = n.shift() || 1 / 0,
          c = 0,
          l = e.length,
          u,
          d,
          f,
          p,
          m,
          h;
        for (s *= s, c = 0; c < l; ++c)
          ((m = e[c]),
            (u = i - m.x),
            (d = a - (m.y || 0)),
            (f = o - (m.z || 0)),
            (p = u * u + d * d + f * f),
            p < s && ((h = m), (s = p)));
        return h;
      },
      on: function (e, n) {
        return arguments.length > 1 ? (f.on(e, n), i) : f.on(e);
      },
    })
  );
}
function Au() {
  var e,
    n,
    r,
    i,
    a,
    o = pu(-30),
    s,
    c = 1,
    l = 1 / 0,
    u = 0.81;
  function d(i) {
    var o,
      s = e.length,
      c = (
        n === 1 ? bl(e, Cu) : n === 2 ? Bl(e, Cu, wu) : n === 3 ? uu(e, Cu, wu, Tu) : null
      ).visitAfter(p);
    for (a = i, o = 0; o < s; ++o) ((r = e[o]), c.visit(m));
  }
  function f() {
    if (e) {
      var n,
        r = e.length,
        i;
      for (s = Array(r), n = 0; n < r; ++n) ((i = e[n]), (s[i.index] = +o(i, n, e)));
    }
  }
  function p(e) {
    var r = 0,
      i,
      a,
      o = 0,
      c,
      l,
      u,
      d,
      f = e.length;
    if (f) {
      for (c = l = u = d = 0; d < f; ++d)
        (i = e[d]) &&
          (a = Math.abs(i.value)) &&
          ((r += i.value),
          (o += a),
          (c += a * (i.x || 0)),
          (l += a * (i.y || 0)),
          (u += a * (i.z || 0)));
      ((r *= Math.sqrt(4 / f)), (e.x = c / o), n > 1 && (e.y = l / o), n > 2 && (e.z = u / o));
    } else {
      ((i = e), (i.x = i.data.x), n > 1 && (i.y = i.data.y), n > 2 && (i.z = i.data.z));
      do r += s[i.data.index];
      while ((i = i.next));
    }
    e.value = r;
  }
  function m(e, o, d, f, p) {
    if (!e.value) return !0;
    var m = [d, f, p][n - 1],
      h = e.x - r.x,
      g = n > 1 ? e.y - r.y : 0,
      _ = n > 2 ? e.z - r.z : 0,
      v = m - o,
      y = h * h + g * g + _ * _;
    if ((v * v) / u < y)
      return (
        y < l &&
          (h === 0 && ((h = mu(i)), (y += h * h)),
          n > 1 && g === 0 && ((g = mu(i)), (y += g * g)),
          n > 2 && _ === 0 && ((_ = mu(i)), (y += _ * _)),
          y < c && (y = Math.sqrt(c * y)),
          (r.vx += (h * e.value * a) / y),
          n > 1 && (r.vy += (g * e.value * a) / y),
          n > 2 && (r.vz += (_ * e.value * a) / y)),
        !0
      );
    if (!(e.length || y >= l)) {
      (e.data !== r || e.next) &&
        (h === 0 && ((h = mu(i)), (y += h * h)),
        n > 1 && g === 0 && ((g = mu(i)), (y += g * g)),
        n > 2 && _ === 0 && ((_ = mu(i)), (y += _ * _)),
        y < c && (y = Math.sqrt(c * y)));
      do
        e.data !== r &&
          ((v = (s[e.data.index] * a) / y),
          (r.vx += h * v),
          n > 1 && (r.vy += g * v),
          n > 2 && (r.vz += _ * v));
      while ((e = e.next));
    }
  }
  return (
    (d.initialize = function (r, ...a) {
      ((e = r),
        (i = a.find((e) => typeof e == `function`) || Math.random),
        (n = a.find((e) => [1, 2, 3].includes(e)) || 2),
        f());
    }),
    (d.strength = function (e) {
      return arguments.length ? ((o = typeof e == `function` ? e : pu(+e)), f(), d) : o;
    }),
    (d.distanceMin = function (e) {
      return arguments.length ? ((c = e * e), d) : Math.sqrt(c);
    }),
    (d.distanceMax = function (e) {
      return arguments.length ? ((l = e * e), d) : Math.sqrt(l);
    }),
    (d.theta = function (e) {
      return arguments.length ? ((u = e * e), d) : Math.sqrt(u);
    }),
    d
  );
}
function ju(e, n, r, i) {
  var a,
    o,
    s = pu(0.1),
    c,
    l;
  (typeof e != `function` && (e = pu(+e)), (n ??= 0), (r ??= 0), (i ??= 0));
  function u(e) {
    for (var s = 0, u = a.length; s < u; ++s) {
      var d = a[s],
        f = d.x - n || 1e-6,
        p = (d.y || 0) - r || 1e-6,
        m = (d.z || 0) - i || 1e-6,
        h = Math.sqrt(f * f + p * p + m * m),
        g = ((l[s] - h) * c[s] * e) / h;
      ((d.vx += f * g), o > 1 && (d.vy += p * g), o > 2 && (d.vz += m * g));
    }
  }
  function d() {
    if (a) {
      var n,
        r = a.length;
      for (c = Array(r), l = Array(r), n = 0; n < r; ++n)
        ((l[n] = +e(a[n], n, a)), (c[n] = isNaN(l[n]) ? 0 : +s(a[n], n, a)));
    }
  }
  return (
    (u.initialize = function (e, ...n) {
      ((a = e), (o = n.find((e) => [1, 2, 3].includes(e)) || 2), d());
    }),
    (u.strength = function (e) {
      return arguments.length ? ((s = typeof e == `function` ? e : pu(+e)), d(), u) : s;
    }),
    (u.radius = function (n) {
      return arguments.length ? ((e = typeof n == `function` ? n : pu(+n)), d(), u) : e;
    }),
    (u.x = function (e) {
      return arguments.length ? ((n = +e), u) : n;
    }),
    (u.y = function (e) {
      return arguments.length ? ((r = +e), u) : r;
    }),
    (u.z = function (e) {
      return arguments.length ? ((i = +e), u) : i;
    }),
    u
  );
}
var { abs: Mu, cos: Nu, sin: Pu, acos: Fu, atan2: Iu, sqrt: Lu, pow: Ru } = Math;
function zu(e) {
  return e < 0 ? -Ru(-e, 1 / 3) : Ru(e, 1 / 3);
}
var Bu = Math.PI,
  Vu = 2 * Bu,
  Hu = Bu / 2,
  Uu = 1e-6,
  Wu = 2 ** 53 - 1 || 9007199254740991,
  Gu = -(2 ** 53 - 1) || -9007199254740991,
  Ku = { x: 0, y: 0, z: 0 },
  J = {
    Tvalues: [
      -0.06405689286260563, 0.06405689286260563, -0.1911188674736163, 0.1911188674736163,
      -0.3150426796961634, 0.3150426796961634, -0.4337935076260451, 0.4337935076260451,
      -0.5454214713888396, 0.5454214713888396, -0.6480936519369755, 0.6480936519369755,
      -0.7401241915785544, 0.7401241915785544, -0.820001985973903, 0.820001985973903,
      -0.8864155270044011, 0.8864155270044011, -0.9382745520027328, 0.9382745520027328,
      -0.9747285559713095, 0.9747285559713095, -0.9951872199970213, 0.9951872199970213,
    ],
    Cvalues: [
      0.12793819534675216, 0.12793819534675216, 0.1258374563468283, 0.1258374563468283,
      0.12167047292780339, 0.12167047292780339, 0.1155056680537256, 0.1155056680537256,
      0.10744427011596563, 0.10744427011596563, 0.09761865210411388, 0.09761865210411388,
      0.08619016153195327, 0.08619016153195327, 0.0733464814110803, 0.0733464814110803,
      0.05929858491543678, 0.05929858491543678, 0.04427743881741981, 0.04427743881741981,
      0.028531388628933663, 0.028531388628933663, 0.0123412297999872, 0.0123412297999872,
    ],
    arcfn: function (e, n) {
      let r = n(e),
        i = r.x * r.x + r.y * r.y;
      return (r.z !== void 0 && (i += r.z * r.z), Lu(i));
    },
    compute: function (e, n, r) {
      if (e === 0) return ((n[0].t = 0), n[0]);
      let i = n.length - 1;
      if (e === 1) return ((n[i].t = 1), n[i]);
      let a = 1 - e,
        o = n;
      if (i === 0) return ((n[0].t = e), n[0]);
      if (i === 1) {
        let n = { x: a * o[0].x + e * o[1].x, y: a * o[0].y + e * o[1].y, t: e };
        return (r && (n.z = a * o[0].z + e * o[1].z), n);
      }
      if (i < 4) {
        let n = a * a,
          s = e * e,
          c,
          l,
          u,
          d = 0;
        i === 2
          ? ((o = [o[0], o[1], o[2], Ku]), (c = n), (l = a * e * 2), (u = s))
          : i === 3 && ((c = n * a), (l = n * e * 3), (u = a * s * 3), (d = e * s));
        let f = {
          x: c * o[0].x + l * o[1].x + u * o[2].x + d * o[3].x,
          y: c * o[0].y + l * o[1].y + u * o[2].y + d * o[3].y,
          t: e,
        };
        return (r && (f.z = c * o[0].z + l * o[1].z + u * o[2].z + d * o[3].z), f);
      }
      let s = JSON.parse(JSON.stringify(n));
      for (; s.length > 1;) {
        for (let n = 0; n < s.length - 1; n++)
          ((s[n] = {
            x: s[n].x + (s[n + 1].x - s[n].x) * e,
            y: s[n].y + (s[n + 1].y - s[n].y) * e,
          }),
            s[n].z !== void 0 && (s[n].z = s[n].z + (s[n + 1].z - s[n].z) * e));
        s.splice(s.length - 1, 1);
      }
      return ((s[0].t = e), s[0]);
    },
    computeWithRatios: function (e, n, r, i) {
      let a = 1 - e,
        o = r,
        s = n,
        c = o[0],
        l = o[1],
        u = o[2],
        d = o[3],
        f;
      if (((c *= a), (l *= e), s.length === 2))
        return (
          (f = c + l),
          {
            x: (c * s[0].x + l * s[1].x) / f,
            y: (c * s[0].y + l * s[1].y) / f,
            z: i ? (c * s[0].z + l * s[1].z) / f : !1,
            t: e,
          }
        );
      if (((c *= a), (l *= 2 * a), (u *= e * e), s.length === 3))
        return (
          (f = c + l + u),
          {
            x: (c * s[0].x + l * s[1].x + u * s[2].x) / f,
            y: (c * s[0].y + l * s[1].y + u * s[2].y) / f,
            z: i ? (c * s[0].z + l * s[1].z + u * s[2].z) / f : !1,
            t: e,
          }
        );
      if (((c *= a), (l *= 1.5 * a), (u *= 3 * a), (d *= e * e * e), s.length === 4))
        return (
          (f = c + l + u + d),
          {
            x: (c * s[0].x + l * s[1].x + u * s[2].x + d * s[3].x) / f,
            y: (c * s[0].y + l * s[1].y + u * s[2].y + d * s[3].y) / f,
            z: i ? (c * s[0].z + l * s[1].z + u * s[2].z + d * s[3].z) / f : !1,
            t: e,
          }
        );
    },
    derive: function (e, n) {
      let r = [];
      for (let i = e, a = i.length, o = a - 1; a > 1; a--, o--) {
        let e = [];
        for (let r = 0, a; r < o; r++)
          ((a = { x: o * (i[r + 1].x - i[r].x), y: o * (i[r + 1].y - i[r].y) }),
            n && (a.z = o * (i[r + 1].z - i[r].z)),
            e.push(a));
        (r.push(e), (i = e));
      }
      return r;
    },
    between: function (e, n, r) {
      return (n <= e && e <= r) || J.approximately(e, n) || J.approximately(e, r);
    },
    approximately: function (e, n, r) {
      return Mu(e - n) <= (r || Uu);
    },
    length: function (e) {
      let n = 0.5,
        r = J.Tvalues.length,
        i = 0;
      for (let a = 0, o; a < r; a++)
        ((o = n * J.Tvalues[a] + n), (i += J.Cvalues[a] * J.arcfn(o, e)));
      return n * i;
    },
    map: function (e, n, r, i, a) {
      let o = r - n;
      return i + (a - i) * ((e - n) / o);
    },
    lerp: function (e, n, r) {
      let i = { x: n.x + e * (r.x - n.x), y: n.y + e * (r.y - n.y) };
      return (n.z !== void 0 && r.z !== void 0 && (i.z = n.z + e * (r.z - n.z)), i);
    },
    pointToString: function (e) {
      let n = e.x + `/` + e.y;
      return (e.z !== void 0 && (n += `/` + e.z), n);
    },
    pointsToString: function (e) {
      return `[` + e.map(J.pointToString).join(`, `) + `]`;
    },
    copy: function (e) {
      return JSON.parse(JSON.stringify(e));
    },
    angle: function (e, n, r) {
      let i = n.x - e.x,
        a = n.y - e.y,
        o = r.x - e.x,
        s = r.y - e.y;
      return Iu(i * s - a * o, i * o + a * s);
    },
    round: function (e, n) {
      let r = `` + e,
        i = r.indexOf(`.`);
      return parseFloat(r.substring(0, i + 1 + n));
    },
    dist: function (e, n) {
      let r = e.x - n.x,
        i = e.y - n.y;
      return Lu(r * r + i * i);
    },
    closest: function (e, n) {
      let r = Ru(2, 63),
        i,
        a;
      return (
        e.forEach(function (e, o) {
          ((a = J.dist(n, e)), a < r && ((r = a), (i = o)));
        }),
        { mdist: r, mpos: i }
      );
    },
    abcratio: function (e, n) {
      if (n !== 2 && n !== 3) return !1;
      if (e === void 0) e = 0.5;
      else if (e === 0 || e === 1) return e;
      let r = Ru(e, n) + Ru(1 - e, n);
      return Mu((r - 1) / r);
    },
    projectionratio: function (e, n) {
      if (n !== 2 && n !== 3) return !1;
      if (e === void 0) e = 0.5;
      else if (e === 0 || e === 1) return e;
      let r = Ru(1 - e, n);
      return r / (Ru(e, n) + r);
    },
    lli8: function (e, n, r, i, a, o, s, c) {
      let l = (e * i - n * r) * (a - s) - (e - r) * (a * c - o * s),
        u = (e * i - n * r) * (o - c) - (n - i) * (a * c - o * s),
        d = (e - r) * (o - c) - (n - i) * (a - s);
      return d == 0 ? !1 : { x: l / d, y: u / d };
    },
    lli4: function (e, n, r, i) {
      let a = e.x,
        o = e.y,
        s = n.x,
        c = n.y,
        l = r.x,
        u = r.y,
        d = i.x,
        f = i.y;
      return J.lli8(a, o, s, c, l, u, d, f);
    },
    lli: function (e, n) {
      return J.lli4(e, e.c, n, n.c);
    },
    makeline: function (e, n) {
      return new nd(e.x, e.y, (e.x + n.x) / 2, (e.y + n.y) / 2, n.x, n.y);
    },
    findbbox: function (e) {
      let n = Wu,
        r = Wu,
        i = Gu,
        a = Gu;
      return (
        e.forEach(function (e) {
          let o = e.bbox();
          (n > o.x.min && (n = o.x.min),
            r > o.y.min && (r = o.y.min),
            i < o.x.max && (i = o.x.max),
            a < o.y.max && (a = o.y.max));
        }),
        {
          x: { min: n, mid: (n + i) / 2, max: i, size: i - n },
          y: { min: r, mid: (r + a) / 2, max: a, size: a - r },
        }
      );
    },
    shapeintersections: function (e, n, r, i, a) {
      if (!J.bboxoverlap(n, i)) return [];
      let o = [],
        s = [e.startcap, e.forward, e.back, e.endcap],
        c = [r.startcap, r.forward, r.back, r.endcap];
      return (
        s.forEach(function (n) {
          n.virtual ||
            c.forEach(function (i) {
              if (i.virtual) return;
              let s = n.intersects(i, a);
              s.length > 0 && ((s.c1 = n), (s.c2 = i), (s.s1 = e), (s.s2 = r), o.push(s));
            });
        }),
        o
      );
    },
    makeshape: function (e, n, r) {
      let i = n.points.length,
        a = e.points.length,
        o = J.makeline(n.points[i - 1], e.points[0]),
        s = J.makeline(e.points[a - 1], n.points[0]),
        c = { startcap: o, forward: e, back: n, endcap: s, bbox: J.findbbox([o, e, n, s]) };
      return (
        (c.intersections = function (e) {
          return J.shapeintersections(c, c.bbox, e, e.bbox, r);
        }),
        c
      );
    },
    getminmax: function (e, n, r) {
      if (!r) return { min: 0, max: 0 };
      let i = Wu,
        a = Gu,
        o,
        s;
      (r.indexOf(0) === -1 && (r = [0].concat(r)), r.indexOf(1) === -1 && r.push(1));
      for (let c = 0, l = r.length; c < l; c++)
        ((o = r[c]), (s = e.get(o)), s[n] < i && (i = s[n]), s[n] > a && (a = s[n]));
      return { min: i, mid: (i + a) / 2, max: a, size: a - i };
    },
    align: function (e, n) {
      let r = n.p1.x,
        i = n.p1.y,
        a = -Iu(n.p2.y - i, n.p2.x - r);
      return e.map(function (e) {
        return {
          x: (e.x - r) * Nu(a) - (e.y - i) * Pu(a),
          y: (e.x - r) * Pu(a) + (e.y - i) * Nu(a),
        };
      });
    },
    roots: function (e, n) {
      n ||= { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
      let r = e.length - 1,
        i = J.align(e, n),
        a = function (e) {
          return 0 <= e && e <= 1;
        };
      if (r === 2) {
        let e = i[0].y,
          n = i[1].y,
          r = i[2].y,
          o = e - 2 * n + r;
        if (o !== 0) {
          let i = -Lu(n * n - e * r),
            s = -e + n;
          return [-(i + s) / o, -(-i + s) / o].filter(a);
        } else if (n !== r && o === 0) return [(2 * n - r) / (2 * n - 2 * r)].filter(a);
        return [];
      }
      let o = i[0].y,
        s = i[1].y,
        c = i[2].y,
        l = i[3].y,
        u = -o + 3 * s - 3 * c + l,
        d = 3 * o - 6 * s + 3 * c,
        f = -3 * o + 3 * s,
        p = o;
      if (J.approximately(u, 0)) {
        if (J.approximately(d, 0)) return J.approximately(f, 0) ? [] : [-p / f].filter(a);
        let e = Lu(f * f - 4 * d * p),
          n = 2 * d;
        return [(e - f) / n, (-f - e) / n].filter(a);
      }
      ((d /= u), (f /= u), (p /= u));
      let m = (3 * f - d * d) / 3,
        h = m / 3,
        g = (2 * d * d * d - 9 * d * f + 27 * p) / 27,
        _ = g / 2,
        v = _ * _ + h * h * h,
        y,
        b,
        x,
        S,
        C;
      if (v < 0) {
        let e = -m / 3,
          n = Lu(e * e * e),
          r = -g / (2 * n),
          i = Fu(r < -1 ? -1 : r > 1 ? 1 : r),
          o = 2 * zu(n);
        return (
          (x = o * Nu(i / 3) - d / 3),
          (S = o * Nu((i + Vu) / 3) - d / 3),
          (C = o * Nu((i + 2 * Vu) / 3) - d / 3),
          [x, S, C].filter(a)
        );
      } else if (v === 0)
        return (
          (y = _ < 0 ? zu(-_) : -zu(_)),
          (x = 2 * y - d / 3),
          (S = -y - d / 3),
          [x, S].filter(a)
        );
      else {
        let e = Lu(v);
        return ((y = zu(-_ + e)), (b = zu(_ + e)), [y - b - d / 3].filter(a));
      }
    },
    droots: function (e) {
      if (e.length === 3) {
        let n = e[0],
          r = e[1],
          i = e[2],
          a = n - 2 * r + i;
        if (a !== 0) {
          let e = -Lu(r * r - n * i),
            o = -n + r;
          return [-(e + o) / a, -(-e + o) / a];
        } else if (r !== i && a === 0) return [(2 * r - i) / (2 * (r - i))];
        return [];
      }
      if (e.length === 2) {
        let n = e[0],
          r = e[1];
        return n === r ? [] : [n / (n - r)];
      }
      return [];
    },
    curvature: function (e, n, r, i, a) {
      let o,
        s,
        c,
        l,
        u = 0,
        d = 0,
        f = J.compute(e, n),
        p = J.compute(e, r),
        m = f.x * f.x + f.y * f.y;
      if (
        (i
          ? ((o = Lu(
              Ru(f.y * p.z - p.y * f.z, 2) +
                Ru(f.z * p.x - p.z * f.x, 2) +
                Ru(f.x * p.y - p.x * f.y, 2)
            )),
            (s = Ru(m + f.z * f.z, 3 / 2)))
          : ((o = f.x * p.y - f.y * p.x), (s = Ru(m, 3 / 2))),
        o === 0 || s === 0)
      )
        return { k: 0, r: 0 };
      if (((u = o / s), (d = s / o), !a)) {
        let a = J.curvature(e - 0.001, n, r, i, !0).k,
          o = J.curvature(e + 0.001, n, r, i, !0).k;
        ((l = (o - u + (u - a)) / 2), (c = (Mu(o - u) + Mu(u - a)) / 2));
      }
      return { k: u, r: d, dk: l, adk: c };
    },
    inflections: function (e) {
      if (e.length < 4) return [];
      let n = J.align(e, { p1: e[0], p2: e.slice(-1)[0] }),
        r = n[2].x * n[1].y,
        i = n[3].x * n[1].y,
        a = n[1].x * n[2].y,
        o = n[3].x * n[2].y,
        s = 18 * (-3 * r + 2 * i + 3 * a - o),
        c = 18 * (3 * r - i - 3 * a),
        l = 18 * (a - r);
      if (J.approximately(s, 0)) {
        if (!J.approximately(c, 0)) {
          let e = -l / c;
          if (0 <= e && e <= 1) return [e];
        }
        return [];
      }
      let u = 2 * s;
      if (J.approximately(u, 0)) return [];
      let d = c * c - 4 * s * l;
      if (d < 0) return [];
      let f = Math.sqrt(d);
      return [(f - c) / u, -(c + f) / u].filter(function (e) {
        return 0 <= e && e <= 1;
      });
    },
    bboxoverlap: function (e, n) {
      let r = [`x`, `y`],
        i = r.length;
      for (let a = 0, o, s, c, l; a < i; a++)
        if (
          ((o = r[a]),
          (s = e[o].mid),
          (c = n[o].mid),
          (l = (e[o].size + n[o].size) / 2),
          Mu(s - c) >= l)
        )
          return !1;
      return !0;
    },
    expandbox: function (e, n) {
      (n.x.min < e.x.min && (e.x.min = n.x.min),
        n.y.min < e.y.min && (e.y.min = n.y.min),
        n.z && n.z.min < e.z.min && (e.z.min = n.z.min),
        n.x.max > e.x.max && (e.x.max = n.x.max),
        n.y.max > e.y.max && (e.y.max = n.y.max),
        n.z && n.z.max > e.z.max && (e.z.max = n.z.max),
        (e.x.mid = (e.x.min + e.x.max) / 2),
        (e.y.mid = (e.y.min + e.y.max) / 2),
        e.z && (e.z.mid = (e.z.min + e.z.max) / 2),
        (e.x.size = e.x.max - e.x.min),
        (e.y.size = e.y.max - e.y.min),
        e.z && (e.z.size = e.z.max - e.z.min));
    },
    pairiteration: function (e, n, r) {
      let i = e.bbox(),
        a = n.bbox(),
        o = 1e5,
        s = r || 0.5;
      if (i.x.size + i.y.size < s && a.x.size + a.y.size < s)
        return [
          (((o * (e._t1 + e._t2)) / 2) | 0) / o + `/` + (((o * (n._t1 + n._t2)) / 2) | 0) / o,
        ];
      let c = e.split(0.5),
        l = n.split(0.5),
        u = [
          { left: c.left, right: l.left },
          { left: c.left, right: l.right },
          { left: c.right, right: l.right },
          { left: c.right, right: l.left },
        ];
      u = u.filter(function (e) {
        return J.bboxoverlap(e.left.bbox(), e.right.bbox());
      });
      let d = [];
      return u.length === 0
        ? d
        : (u.forEach(function (e) {
            d = d.concat(J.pairiteration(e.left, e.right, s));
          }),
          (d = d.filter(function (e, n) {
            return d.indexOf(e) === n;
          })),
          d);
    },
    getccenter: function (e, n, r) {
      let i = n.x - e.x,
        a = n.y - e.y,
        o = r.x - n.x,
        s = r.y - n.y,
        c = i * Nu(Hu) - a * Pu(Hu),
        l = i * Pu(Hu) + a * Nu(Hu),
        u = o * Nu(Hu) - s * Pu(Hu),
        d = o * Pu(Hu) + s * Nu(Hu),
        f = (e.x + n.x) / 2,
        p = (e.y + n.y) / 2,
        m = (n.x + r.x) / 2,
        h = (n.y + r.y) / 2,
        g = f + c,
        _ = p + l,
        v = m + u,
        y = h + d,
        b = J.lli8(f, p, g, _, m, h, v, y),
        x = J.dist(b, e),
        S = Iu(e.y - b.y, e.x - b.x),
        C = Iu(n.y - b.y, n.x - b.x),
        w = Iu(r.y - b.y, r.x - b.x),
        T;
      return (
        S < w
          ? ((S > C || C > w) && (S += Vu), S > w && ((T = w), (w = S), (S = T)))
          : w < C && C < S
            ? ((T = w), (w = S), (S = T))
            : (w += Vu),
        (b.s = S),
        (b.e = w),
        (b.r = x),
        b
      );
    },
    numberSort: function (e, n) {
      return e - n;
    },
  },
  qu = class e {
    constructor(e) {
      ((this.curves = []),
        (this._3d = !1),
        e && ((this.curves = e), (this._3d = this.curves[0]._3d)));
    }
    valueOf() {
      return this.toString();
    }
    toString() {
      return (
        `[` +
        this.curves
          .map(function (e) {
            return J.pointsToString(e.points);
          })
          .join(`, `) +
        `]`
      );
    }
    addCurve(e) {
      (this.curves.push(e), (this._3d = this._3d || e._3d));
    }
    length() {
      return this.curves
        .map(function (e) {
          return e.length();
        })
        .reduce(function (e, n) {
          return e + n;
        });
    }
    curve(e) {
      return this.curves[e];
    }
    bbox() {
      let e = this.curves;
      for (var n = e[0].bbox(), r = 1; r < e.length; r++) J.expandbox(n, e[r].bbox());
      return n;
    }
    offset(n) {
      let r = [];
      return (
        this.curves.forEach(function (e) {
          r.push(...e.offset(n));
        }),
        new e(r)
      );
    }
  },
  { abs: Ju, min: Yu, max: Xu, cos: Zu, sin: Qu, acos: $u, sqrt: ed } = Math,
  td = Math.PI,
  nd = class e {
    constructor(e) {
      let n = e && e.forEach ? e : Array.from(arguments).slice(),
        r = !1;
      if (typeof n[0] == `object`) {
        r = n.length;
        let e = [];
        (n.forEach(function (n) {
          [`x`, `y`, `z`].forEach(function (r) {
            n[r] !== void 0 && e.push(n[r]);
          });
        }),
          (n = e));
      }
      let i = !1,
        a = n.length;
      if (r) {
        if (r > 4) {
          if (arguments.length !== 1)
            throw Error(`Only new Bezier(point[]) is accepted for 4th and higher order curves`);
          i = !0;
        }
      } else if (a !== 6 && a !== 8 && a !== 9 && a !== 12 && arguments.length !== 1)
        throw Error(`Only new Bezier(point[]) is accepted for 4th and higher order curves`);
      let o = (this._3d = (!i && (a === 9 || a === 12)) || (e && e[0] && e[0].z !== void 0)),
        s = (this.points = []);
      for (let e = 0, r = o ? 3 : 2; e < a; e += r) {
        var c = { x: n[e], y: n[e + 1] };
        (o && (c.z = n[e + 2]), s.push(c));
      }
      let l = (this.order = s.length - 1),
        u = (this.dims = [`x`, `y`]);
      (o && u.push(`z`), (this.dimlen = u.length));
      let d = J.align(s, { p1: s[0], p2: s[l] }),
        f = J.dist(s[0], s[l]);
      ((this._linear = d.reduce((e, n) => e + Ju(n.y), 0) < f / 50),
        (this._lut = []),
        (this._t1 = 0),
        (this._t2 = 1),
        this.update());
    }
    static quadraticFromPoints(n, r, i, a) {
      return (
        a === void 0 && (a = 0.5),
        a === 0 ? new e(r, r, i) : a === 1 ? new e(n, r, r) : new e(n, e.getABC(2, n, r, i, a).A, i)
      );
    }
    static cubicFromPoints(n, r, i, a, o) {
      a === void 0 && (a = 0.5);
      let s = e.getABC(3, n, r, i, a);
      o === void 0 && (o = J.dist(r, s.C));
      let c = (o * (1 - a)) / a,
        l = J.dist(n, i),
        u = (i.x - n.x) / l,
        d = (i.y - n.y) / l,
        f = o * u,
        p = o * d,
        m = c * u,
        h = c * d,
        g = { x: r.x - f, y: r.y - p },
        _ = { x: r.x + m, y: r.y + h },
        v = s.A,
        y = { x: v.x + (g.x - v.x) / (1 - a), y: v.y + (g.y - v.y) / (1 - a) },
        b = { x: v.x + (_.x - v.x) / a, y: v.y + (_.y - v.y) / a };
      return new e(
        n,
        { x: n.x + (y.x - n.x) / a, y: n.y + (y.y - n.y) / a },
        { x: i.x + (b.x - i.x) / (1 - a), y: i.y + (b.y - i.y) / (1 - a) },
        i
      );
    }
    static getUtils() {
      return J;
    }
    getUtils() {
      return e.getUtils();
    }
    static get PolyBezier() {
      return qu;
    }
    valueOf() {
      return this.toString();
    }
    toString() {
      return J.pointsToString(this.points);
    }
    toSVG() {
      if (this._3d) return !1;
      let e = this.points,
        n = [`M`, e[0].x, e[0].y, this.order === 2 ? `Q` : `C`];
      for (let r = 1, i = e.length; r < i; r++) (n.push(e[r].x), n.push(e[r].y));
      return n.join(` `);
    }
    setRatios(e) {
      if (e.length !== this.points.length) throw Error(`incorrect number of ratio values`);
      ((this.ratios = e), (this._lut = []));
    }
    verify() {
      let e = this.coordDigest();
      e !== this._print && ((this._print = e), this.update());
    }
    coordDigest() {
      return this.points
        .map(function (e, n) {
          return `` + n + e.x + e.y + (e.z ? e.z : 0);
        })
        .join(``);
    }
    update() {
      ((this._lut = []), (this.dpoints = J.derive(this.points, this._3d)), this.computedirection());
    }
    computedirection() {
      let e = this.points,
        n = J.angle(e[0], e[this.order], e[1]);
      this.clockwise = n > 0;
    }
    length() {
      return J.length(this.derivative.bind(this));
    }
    static getABC(e = 2, n, r, i, a = 0.5) {
      let o = J.projectionratio(a, e),
        s = 1 - o,
        c = { x: o * n.x + s * i.x, y: o * n.y + s * i.y },
        l = J.abcratio(a, e);
      return { A: { x: r.x + (r.x - c.x) / l, y: r.y + (r.y - c.y) / l }, B: r, C: c, S: n, E: i };
    }
    getABC(n, r) {
      r ||= this.get(n);
      let i = this.points[0],
        a = this.points[this.order];
      return e.getABC(this.order, i, r, a, n);
    }
    getLUT(e) {
      if ((this.verify(), (e ||= 100), this._lut.length === e + 1)) return this._lut;
      ((this._lut = []), e++, (this._lut = []));
      for (let n = 0, r, i; n < e; n++)
        ((i = n / (e - 1)), (r = this.compute(i)), (r.t = i), this._lut.push(r));
      return this._lut;
    }
    on(e, n) {
      n ||= 5;
      let r = this.getLUT(),
        i = [];
      for (let a = 0, o, s = 0; a < r.length; a++)
        ((o = r[a]), J.dist(o, e) < n && (i.push(o), (s += a / r.length)));
      return i.length ? (t /= i.length) : !1;
    }
    project(e) {
      let n = this.getLUT(),
        r = n.length - 1,
        i = J.closest(n, e),
        a = i.mpos,
        o = (a - 1) / r,
        s = (a + 1) / r,
        c = 0.1 / r,
        l = i.mdist,
        u = o,
        d = u,
        f;
      l += 1;
      for (let n; u < s + c; u += c)
        ((f = this.compute(u)), (n = J.dist(e, f)), n < l && ((l = n), (d = u)));
      return ((d = d < 0 ? 0 : d > 1 ? 1 : d), (f = this.compute(d)), (f.t = d), (f.d = l), f);
    }
    get(e) {
      return this.compute(e);
    }
    point(e) {
      return this.points[e];
    }
    compute(e) {
      return this.ratios
        ? J.computeWithRatios(e, this.points, this.ratios, this._3d)
        : J.compute(e, this.points, this._3d, this.ratios);
    }
    raise() {
      let n = this.points,
        r = [n[0]],
        i = n.length;
      for (let e = 1, a, o; e < i; e++)
        ((a = n[e]),
          (o = n[e - 1]),
          (r[e] = {
            x: ((i - e) / i) * a.x + (e / i) * o.x,
            y: ((i - e) / i) * a.y + (e / i) * o.y,
          }));
      return ((r[i] = n[i - 1]), new e(r));
    }
    derivative(e) {
      return J.compute(e, this.dpoints[0], this._3d);
    }
    dderivative(e) {
      return J.compute(e, this.dpoints[1], this._3d);
    }
    align() {
      let n = this.points;
      return new e(J.align(n, { p1: n[0], p2: n[n.length - 1] }));
    }
    curvature(e) {
      return J.curvature(e, this.dpoints[0], this.dpoints[1], this._3d);
    }
    inflections() {
      return J.inflections(this.points);
    }
    normal(e) {
      return this._3d ? this.__normal3(e) : this.__normal2(e);
    }
    __normal2(e) {
      let n = this.derivative(e),
        r = ed(n.x * n.x + n.y * n.y);
      return { t: e, x: -n.y / r, y: n.x / r };
    }
    __normal3(e) {
      let n = this.derivative(e),
        r = this.derivative(e + 0.01),
        i = ed(n.x * n.x + n.y * n.y + n.z * n.z),
        a = ed(r.x * r.x + r.y * r.y + r.z * r.z);
      ((n.x /= i), (n.y /= i), (n.z /= i), (r.x /= a), (r.y /= a), (r.z /= a));
      let o = { x: r.y * n.z - r.z * n.y, y: r.z * n.x - r.x * n.z, z: r.x * n.y - r.y * n.x },
        s = ed(o.x * o.x + o.y * o.y + o.z * o.z);
      ((o.x /= s), (o.y /= s), (o.z /= s));
      let c = [
        o.x * o.x,
        o.x * o.y - o.z,
        o.x * o.z + o.y,
        o.x * o.y + o.z,
        o.y * o.y,
        o.y * o.z - o.x,
        o.x * o.z - o.y,
        o.y * o.z + o.x,
        o.z * o.z,
      ];
      return {
        t: e,
        x: c[0] * n.x + c[1] * n.y + c[2] * n.z,
        y: c[3] * n.x + c[4] * n.y + c[5] * n.z,
        z: c[6] * n.x + c[7] * n.y + c[8] * n.z,
      };
    }
    hull(e) {
      let n = this.points,
        r = [],
        i = [],
        a = 0;
      for (
        i[a++] = n[0], i[a++] = n[1], i[a++] = n[2], this.order === 3 && (i[a++] = n[3]);
        n.length > 1;
      ) {
        r = [];
        for (let o = 0, s, c = n.length - 1; o < c; o++)
          ((s = J.lerp(e, n[o], n[o + 1])), (i[a++] = s), r.push(s));
        n = r;
      }
      return i;
    }
    split(n, r) {
      if (n === 0 && r) return this.split(r).left;
      if (r === 1) return this.split(n).right;
      let i = this.hull(n),
        a = {
          left: this.order === 2 ? new e([i[0], i[3], i[5]]) : new e([i[0], i[4], i[7], i[9]]),
          right: this.order === 2 ? new e([i[5], i[4], i[2]]) : new e([i[9], i[8], i[6], i[3]]),
          span: i,
        };
      return (
        (a.left._t1 = J.map(0, 0, 1, this._t1, this._t2)),
        (a.left._t2 = J.map(n, 0, 1, this._t1, this._t2)),
        (a.right._t1 = J.map(n, 0, 1, this._t1, this._t2)),
        (a.right._t2 = J.map(1, 0, 1, this._t1, this._t2)),
        r ? ((r = J.map(r, n, 1, 0, 1)), a.right.split(r).left) : a
      );
    }
    extrema() {
      let e = {},
        n = [];
      return (
        this.dims.forEach(
          function (r) {
            let i = function (e) {
                return e[r];
              },
              a = this.dpoints[0].map(i);
            ((e[r] = J.droots(a)),
              this.order === 3 && ((a = this.dpoints[1].map(i)), (e[r] = e[r].concat(J.droots(a)))),
              (e[r] = e[r].filter(function (e) {
                return e >= 0 && e <= 1;
              })),
              (n = n.concat(e[r].sort(J.numberSort))));
          }.bind(this)
        ),
        (e.values = n.sort(J.numberSort).filter(function (e, r) {
          return n.indexOf(e) === r;
        })),
        e
      );
    }
    bbox() {
      let e = this.extrema(),
        n = {};
      return (
        this.dims.forEach(
          function (r) {
            n[r] = J.getminmax(this, r, e[r]);
          }.bind(this)
        ),
        n
      );
    }
    overlaps(e) {
      let n = this.bbox(),
        r = e.bbox();
      return J.bboxoverlap(n, r);
    }
    offset(n, r) {
      if (r !== void 0) {
        let e = this.get(n),
          i = this.normal(n),
          a = { c: e, n: i, x: e.x + i.x * r, y: e.y + i.y * r };
        return (this._3d && (a.z = e.z + i.z * r), a);
      }
      if (this._linear) {
        let r = this.normal(0);
        return [
          new e(
            this.points.map(function (e) {
              let i = { x: e.x + n * r.x, y: e.y + n * r.y };
              return (e.z && r.z && (i.z = e.z + n * r.z), i);
            })
          ),
        ];
      }
      return this.reduce().map(function (e) {
        return e._linear ? e.offset(n)[0] : e.scale(n);
      });
    }
    simple() {
      if (this.order === 3) {
        let e = J.angle(this.points[0], this.points[3], this.points[1]),
          n = J.angle(this.points[0], this.points[3], this.points[2]);
        if ((e > 0 && n < 0) || (e < 0 && n > 0)) return !1;
      }
      let e = this.normal(0),
        n = this.normal(1),
        r = e.x * n.x + e.y * n.y;
      return (this._3d && (r += e.z * n.z), Ju($u(r)) < td / 3);
    }
    reduce() {
      let e,
        n = 0,
        r = 0,
        i = 0.01,
        a,
        o = [],
        s = [],
        c = this.extrema().values;
      for (
        c.indexOf(0) === -1 && (c = [0].concat(c)),
          c.indexOf(1) === -1 && c.push(1),
          n = c[0],
          e = 1;
        e < c.length;
        e++
      )
        ((r = c[e]), (a = this.split(n, r)), (a._t1 = n), (a._t2 = r), o.push(a), (n = r));
      return (
        o.forEach(function (e) {
          for (n = 0, r = 0; r <= 1;)
            for (r = n + i; r <= 1.01; r += i)
              if (((a = e.split(n, r)), !a.simple())) {
                if (((r -= i), Ju(n - r) < i)) return [];
                ((a = e.split(n, r)),
                  (a._t1 = J.map(n, 0, 1, e._t1, e._t2)),
                  (a._t2 = J.map(r, 0, 1, e._t1, e._t2)),
                  s.push(a),
                  (n = r));
                break;
              }
          n < 1 &&
            ((a = e.split(n, 1)),
            (a._t1 = J.map(n, 0, 1, e._t1, e._t2)),
            (a._t2 = e._t2),
            s.push(a));
        }),
        s
      );
    }
    translate(n, r, i) {
      i = typeof i == `number` ? i : r;
      let a = this.order,
        o = this.points.map((e, n) => (1 - n / a) * r + (n / a) * i);
      return new e(this.points.map((e, r) => ({ x: e.x + n.x * o[r], y: e.y + n.y * o[r] })));
    }
    scale(n) {
      let r = this.order,
        i = !1;
      if ((typeof n == `function` && (i = n), i && r === 2)) return this.raise().scale(i);
      let a = this.clockwise,
        o = this.points;
      if (this._linear) return this.translate(this.normal(0), i ? i(0) : n, i ? i(1) : n);
      let s = i ? i(0) : n,
        c = i ? i(1) : n,
        l = [this.offset(0, 10), this.offset(1, 10)],
        u = [],
        d = J.lli4(l[0], l[0].c, l[1], l[1].c);
      if (!d) throw Error(`cannot scale this curve. Try reducing it first.`);
      return (
        [0, 1].forEach(function (e) {
          let n = (u[e * r] = J.copy(o[e * r]));
          ((n.x += (e ? c : s) * l[e].n.x), (n.y += (e ? c : s) * l[e].n.y));
        }),
        i
          ? ([0, 1].forEach(function (e) {
              if (!(r === 2 && e)) {
                var s = o[e + 1],
                  c = { x: s.x - d.x, y: s.y - d.y },
                  l = i ? i((e + 1) / r) : n;
                i && !a && (l = -l);
                var f = ed(c.x * c.x + c.y * c.y);
                ((c.x /= f), (c.y /= f), (u[e + 1] = { x: s.x + l * c.x, y: s.y + l * c.y }));
              }
            }),
            new e(u))
          : ([0, 1].forEach((e) => {
              if (r === 2 && e) return;
              let n = u[e * r],
                i = this.derivative(e),
                a = { x: n.x + i.x, y: n.y + i.y };
              u[e + 1] = J.lli4(n, a, d, o[e + 1]);
            }),
            new e(u))
      );
    }
    outline(n, r, i, a) {
      if (((r = r === void 0 ? n : r), this._linear)) {
        let o = this.normal(0),
          s = this.points[0],
          c = this.points[this.points.length - 1],
          l,
          u,
          d;
        (i === void 0 && ((i = n), (a = r)),
          (l = { x: s.x + o.x * n, y: s.y + o.y * n }),
          (d = { x: c.x + o.x * i, y: c.y + o.y * i }),
          (u = { x: (l.x + d.x) / 2, y: (l.y + d.y) / 2 }));
        let f = [l, u, d];
        ((l = { x: s.x - o.x * r, y: s.y - o.y * r }),
          (d = { x: c.x - o.x * a, y: c.y - o.y * a }),
          (u = { x: (l.x + d.x) / 2, y: (l.y + d.y) / 2 }));
        let p = [d, u, l],
          m = J.makeline(p[2], f[0]),
          h = J.makeline(f[2], p[0]);
        return new qu([m, new e(f), h, new e(p)]);
      }
      let o = this.reduce(),
        s = o.length,
        c = [],
        l = [],
        u,
        d = 0,
        f = this.length(),
        p = i !== void 0 && a !== void 0;
      function m(e, n, r, i, a) {
        return function (o) {
          let s = i / r,
            c = (i + a) / r,
            l = n - e;
          return J.map(o, 0, 1, e + s * l, e + c * l);
        };
      }
      (o.forEach(function (e) {
        let o = e.length();
        (p
          ? (c.push(e.scale(m(n, i, f, d, o))), l.push(e.scale(m(-r, -a, f, d, o))))
          : (c.push(e.scale(n)), l.push(e.scale(-r))),
          (d += o));
      }),
        (l = l
          .map(function (e) {
            return (
              (u = e.points),
              u[3] ? (e.points = [u[3], u[2], u[1], u[0]]) : (e.points = [u[2], u[1], u[0]]),
              e
            );
          })
          .reverse()));
      let h = c[0].points[0],
        g = c[s - 1].points[c[s - 1].points.length - 1],
        _ = l[s - 1].points[l[s - 1].points.length - 1],
        v = l[0].points[0],
        y = J.makeline(_, h),
        b = J.makeline(g, v);
      return new qu([y].concat(c, [b], l));
    }
    outlineshapes(e, n, r) {
      n ||= e;
      let i = this.outline(e, n).curves,
        a = [];
      for (let e = 1, n = i.length; e < n / 2; e++) {
        let o = J.makeshape(i[e], i[n - e], r);
        ((o.startcap.virtual = e > 1), (o.endcap.virtual = e < n / 2 - 1), a.push(o));
      }
      return a;
    }
    intersects(n, r) {
      return n
        ? n.p1 && n.p2
          ? this.lineIntersects(n)
          : (n instanceof e && (n = n.reduce()), this.curveintersects(this.reduce(), n, r))
        : this.selfintersects(r);
    }
    lineIntersects(e) {
      let n = Yu(e.p1.x, e.p2.x),
        r = Yu(e.p1.y, e.p2.y),
        i = Xu(e.p1.x, e.p2.x),
        a = Xu(e.p1.y, e.p2.y);
      return J.roots(this.points, e).filter((e) => {
        var o = this.get(e);
        return J.between(o.x, n, i) && J.between(o.y, r, a);
      });
    }
    selfintersects(e) {
      let n = this.reduce(),
        r = n.length - 2,
        i = [];
      for (let a = 0, o, s, c; a < r; a++)
        ((s = n.slice(a, a + 1)),
          (c = n.slice(a + 2)),
          (o = this.curveintersects(s, c, e)),
          i.push(...o));
      return i;
    }
    curveintersects(e, n, r) {
      let i = [];
      e.forEach(function (e) {
        n.forEach(function (n) {
          e.overlaps(n) && i.push({ left: e, right: n });
        });
      });
      let a = [];
      return (
        i.forEach(function (e) {
          let n = J.pairiteration(e.left, e.right, r);
          n.length > 0 && (a = a.concat(n));
        }),
        a
      );
    }
    arcs(e) {
      return ((e ||= 0.5), this._iterate(e, []));
    }
    _error(e, n, r, i) {
      let a = (i - r) / 4,
        o = this.get(r + a),
        s = this.get(i - a),
        c = J.dist(e, n),
        l = J.dist(e, o),
        u = J.dist(e, s);
      return Ju(l - c) + Ju(u - c);
    }
    _iterate(e, n) {
      let r = 0,
        i = 1,
        a;
      do {
        ((a = 0), (i = 1));
        let o = this.get(r),
          s,
          c,
          l,
          u,
          d = !1,
          f = !1,
          p,
          m = i,
          h = 1,
          g = 0;
        do
          if (
            ((f = d),
            (u = l),
            (m = (r + i) / 2),
            g++,
            (s = this.get(m)),
            (c = this.get(i)),
            (l = J.getccenter(o, s, c)),
            (l.interval = { start: r, end: i }),
            (d = this._error(l, o, r, i) <= e),
            (p = f && !d),
            p || (h = i),
            d)
          ) {
            if (i >= 1) {
              if (((l.interval.end = h = 1), (u = l), i > 1)) {
                let e = { x: l.x + l.r * Zu(l.e), y: l.y + l.r * Qu(l.e) };
                l.e += J.angle({ x: l.x, y: l.y }, e, this.get(1));
              }
              break;
            }
            i += (i - r) / 2;
          } else i = m;
        while (!p && a++ < 100);
        if (a >= 100) break;
        ((u ||= l), n.push(u), (r = h));
      } while (i < 1);
      return n;
    }
  };
function rd(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var r = 0, i = Array(n); r < n; r++) i[r] = e[r];
  return i;
}
function id(e) {
  if (Array.isArray(e)) return e;
}
function ad(e) {
  if (Array.isArray(e)) return rd(e);
}
function od(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function sd(e, n) {
  var r = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (r != null) {
    var i,
      a,
      o,
      s,
      c = [],
      l = !0,
      u = !1;
    try {
      if (((o = (r = r.call(e)).next), n !== 0))
        for (; !(l = (i = o.call(r)).done) && (c.push(i.value), c.length !== n); l = !0);
    } catch (e) {
      ((u = !0), (a = e));
    } finally {
      try {
        if (!l && r.return != null && ((s = r.return()), Object(s) !== s)) return;
      } finally {
        if (u) throw a;
      }
    }
    return c;
  }
}
function cd() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ld() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ud(e, n) {
  if (e == null) return {};
  var r,
    i,
    a = dd(e, n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      ((r = o[i]), n.includes(r) || ({}.propertyIsEnumerable.call(e, r) && (a[r] = e[r])));
  }
  return a;
}
function dd(e, n) {
  if (e == null) return {};
  var r = {};
  for (var i in e)
    if ({}.hasOwnProperty.call(e, i)) {
      if (n.includes(i)) continue;
      r[i] = e[i];
    }
  return r;
}
function fd(e, n) {
  return id(e) || sd(e, n) || gd(e, n) || cd();
}
function pd(e) {
  return ad(e) || od(e) || gd(e) || ld();
}
function md(e, n) {
  if (typeof e != `object` || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var i = r.call(e, n);
    if (typeof i != `object`) return i;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return String(e);
}
function hd(e) {
  var n = md(e, `string`);
  return typeof n == `symbol` ? n : n + ``;
}
function gd(e, n) {
  if (e) {
    if (typeof e == `string`) return rd(e, n);
    var r = {}.toString.call(e).slice(8, -1);
    return (
      r === `Object` && e.constructor && (r = e.constructor.name),
      r === `Map` || r === `Set`
        ? Array.from(e)
        : r === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? rd(e, n)
          : void 0
    );
  }
}
var _d = function () {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
    r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1,
    a = (n instanceof Array ? (n.length ? n : [void 0]) : [n]).map(function (e) {
      return { keyAccessor: e, isProp: !(e instanceof Function) };
    }),
    o = e.reduce(function (e, n) {
      var i = e,
        o = n;
      return (
        a.forEach(function (e, n) {
          var s = e.keyAccessor,
            c = e.isProp,
            l;
          if (c) {
            var u = o,
              d = u[s],
              f = ud(u, [s].map(hd));
            ((l = d), (o = f));
          } else l = s(o, n);
          n + 1 < a.length
            ? (i.hasOwnProperty(l) || (i[l] = {}), (i = i[l]))
            : r
              ? (i.hasOwnProperty(l) || (i[l] = []), i[l].push(o))
              : (i[l] = o);
        }),
        e
      );
    }, {});
  r instanceof Function &&
    (function e(n) {
      var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      i === a.length
        ? Object.keys(n).forEach(function (e) {
            return (n[e] = r(n[e]));
          })
        : Object.values(n).forEach(function (n) {
            return e(n, i + 1);
          });
    })(o);
  var s = o;
  return (
    i &&
      ((s = []),
      (function e(n) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        r.length === a.length
          ? s.push({ keys: r, vals: n })
          : Object.entries(n).forEach(function (n) {
              var i = fd(n, 2),
                a = i[0],
                o = i[1];
              return e(o, [].concat(pd(r), [a]));
            });
      })(o),
      n instanceof Array && n.length === 0 && s.length === 1 && (s[0].keys = [])),
    s
  );
};
function vd(e, n) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(n).domain(e);
      break;
  }
  return this;
}
function yd(e, n) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      typeof e == `function` ? this.interpolator(e) : this.range(e);
      break;
    default:
      (this.domain(e), typeof n == `function` ? this.interpolator(n) : this.range(n));
      break;
  }
  return this;
}
var bd = Symbol(`implicit`);
function xd() {
  var e = new ja(),
    n = [],
    r = [],
    i = bd;
  function a(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (i !== bd) return i;
      e.set(a, (o = n.push(a) - 1));
    }
    return r[o % r.length];
  }
  return (
    (a.domain = function (r) {
      if (!arguments.length) return n.slice();
      ((n = []), (e = new ja()));
      for (let i of r) e.has(i) || e.set(i, n.push(i) - 1);
      return a;
    }),
    (a.range = function (e) {
      return arguments.length ? ((r = Array.from(e)), a) : r.slice();
    }),
    (a.unknown = function (e) {
      return arguments.length ? ((i = e), a) : i;
    }),
    (a.copy = function () {
      return xd(n, r).unknown(i);
    }),
    vd.apply(a, arguments),
    a
  );
}
function Sd(e) {
  for (var n = (e.length / 6) | 0, r = Array(n), i = 0; i < n;)
    r[i] = `#` + e.slice(i * 6, ++i * 6);
  return r;
}
var Cd = Sd(`a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928`);
function wd(e, n) {
  n === void 0 && (n = {});
  var r = n.insertAt;
  if (!(typeof document > `u`)) {
    var i = document.head || document.getElementsByTagName(`head`)[0],
      a = document.createElement(`style`);
    ((a.type = `text/css`),
      r === `top` && i.firstChild ? i.insertBefore(a, i.firstChild) : i.appendChild(a),
      a.styleSheet ? (a.styleSheet.cssText = e) : a.appendChild(document.createTextNode(e)));
  }
}
wd(`.force-graph-container canvas {
  display: block;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.force-graph-container .clickable {
  cursor: pointer;
}

.force-graph-container .grabbable {
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.force-graph-container .grabbable:active {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}
`);
function Td(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var r = 0, i = Array(n); r < n; r++) i[r] = e[r];
  return i;
}
function Ed(e) {
  if (Array.isArray(e)) return e;
}
function Dd(e) {
  if (Array.isArray(e)) return Td(e);
}
function Od(e, n, r) {
  if (Ad()) return Reflect.construct.apply(null, arguments);
  var i = [null];
  return (i.push.apply(i, n), new (e.bind.apply(e, i))());
}
function kd(e, n, r) {
  return (
    (n = zd(n)) in e
      ? Object.defineProperty(e, n, { value: r, enumerable: !0, configurable: !0, writable: !0 })
      : (e[n] = r),
    e
  );
}
function Ad() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (Ad = function () {
    return !!e;
  })();
}
function jd(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function Md(e, n) {
  var r = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (r != null) {
    var i,
      a,
      o,
      s,
      c = [],
      l = !0,
      u = !1;
    try {
      if (((o = (r = r.call(e)).next), n !== 0))
        for (; !(l = (i = o.call(r)).done) && (c.push(i.value), c.length !== n); l = !0);
    } catch (e) {
      ((u = !0), (a = e));
    } finally {
      try {
        if (!l && r.return != null && ((s = r.return()), Object(s) !== s)) return;
      } finally {
        if (u) throw a;
      }
    }
    return c;
  }
}
function Nd() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Pd() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Fd(e, n) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    (n &&
      (i = i.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })),
      r.push.apply(r, i));
  }
  return r;
}
function Id(e) {
  for (var n = 1; n < arguments.length; n++) {
    var r = arguments[n] == null ? {} : arguments[n];
    n % 2
      ? Fd(Object(r), !0).forEach(function (n) {
          kd(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Fd(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function Ld(e, n) {
  return Ed(e) || Md(e, n) || Vd(e, n) || Nd();
}
function Y(e) {
  return Dd(e) || jd(e) || Vd(e) || Pd();
}
function Rd(e, n) {
  if (typeof e != `object` || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var i = r.call(e, n);
    if (typeof i != `object`) return i;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (n === `string` ? String : Number)(e);
}
function zd(e) {
  var n = Rd(e, `string`);
  return typeof n == `symbol` ? n : n + ``;
}
function Bd(e) {
  '@babel/helpers - typeof';
  return (
    (Bd =
      typeof Symbol == `function` && typeof Symbol.iterator == `symbol`
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == `function` &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? `symbol`
              : typeof e;
          }),
    Bd(e)
  );
}
function Vd(e, n) {
  if (e) {
    if (typeof e == `string`) return Td(e, n);
    var r = {}.toString.call(e).slice(8, -1);
    return (
      r === `Object` && e.constructor && (r = e.constructor.name),
      r === `Map` || r === `Set`
        ? Array.from(e)
        : r === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? Td(e, n)
          : void 0
    );
  }
}
var Hd = xd(Cd);
function Ud(e, n, r) {
  !n ||
    typeof r != `string` ||
    e
      .filter(function (e) {
        return !e[r];
      })
      .forEach(function (e) {
        e[r] = Hd(n(e));
      });
}
function Wd(e, n) {
  var r = e.nodes,
    i = e.links,
    a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    o = a.nodeFilter,
    s =
      o === void 0
        ? function () {
            return !0;
          }
        : o,
    c = a.onLoopError,
    l =
      c === void 0
        ? function (e) {
            throw `Invalid DAG structure! Found cycle in node path: ${e.join(` -> `)}.`;
          }
        : c,
    u = {};
  (r.forEach(function (e) {
    return (u[n(e)] = { data: e, out: [], depth: -1, skip: !s(e) });
  }),
    i.forEach(function (e) {
      var r = e.source,
        i = e.target,
        a = l(r),
        o = l(i);
      if (!u.hasOwnProperty(a)) throw `Missing source node with id: ${a}`;
      if (!u.hasOwnProperty(o)) throw `Missing target node with id: ${o}`;
      var s = u[a],
        c = u[o];
      s.out.push(c);
      function l(e) {
        return Bd(e) === `object` ? n(e) : e;
      }
    }));
  var d = [];
  return (
    f(Object.values(u)),
    Object.assign.apply(
      Object,
      [{}].concat(
        Y(
          Object.entries(u)
            .filter(function (e) {
              return !Ld(e, 2)[1].skip;
            })
            .map(function (e) {
              var n = Ld(e, 2),
                r = n[0],
                i = n[1];
              return kd({}, r, i.depth);
            })
        )
      )
    )
  );
  function f(e) {
    for (
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
        a = function () {
          var a = e[o];
          if (r.indexOf(a) !== -1) {
            var s = [].concat(Y(r.slice(r.indexOf(a))), [a]).map(function (e) {
              return n(e.data);
            });
            return (
              d.some(function (e) {
                return (
                  e.length === s.length &&
                  e.every(function (e, n) {
                    return e === s[n];
                  })
                );
              }) || (d.push(s), l(s)),
              1
            );
          }
          i > a.depth && ((a.depth = i), f(a.out, [].concat(Y(r), [a]), i + +!a.skip));
        },
        o = 0,
        s = e.length;
      o < s;
      o++
    )
      if (a()) continue;
  }
}
var Gd = 2,
  X = function (e, n) {
    return n.onNeedsRedraw && n.onNeedsRedraw();
  },
  Kd = function (e, n) {
    if (!n.isShadow) {
      var r = L(n.linkDirectionalParticles);
      n.graphData.links.forEach(function (e) {
        var n = Math.round(Math.abs(r(e)));
        n
          ? (e.__photons = Y(Array(n)).map(function () {
              return {};
            }))
          : delete e.__photons;
      });
    }
  },
  qd = zo({
    props: {
      graphData: {
        default: { nodes: [], links: [] },
        onChange: function (e, n) {
          ((n.engineRunning = !1), Kd(e, n));
        },
      },
      dagMode: {
        onChange: function (e, n) {
          !e &&
            (n.graphData.nodes || []).forEach(function (e) {
              e.fx = e.fy = void 0;
            });
        },
      },
      dagLevelDistance: {},
      dagNodeFilter: {
        default: function (e) {
          return !0;
        },
      },
      onDagError: { triggerUpdate: !1 },
      nodeRelSize: { default: 4, triggerUpdate: !1, onChange: X },
      nodeId: { default: `id` },
      nodeVal: { default: `val`, triggerUpdate: !1, onChange: X },
      nodeColor: { default: `color`, triggerUpdate: !1, onChange: X },
      nodeAutoColorBy: {},
      nodeCanvasObject: { triggerUpdate: !1, onChange: X },
      nodeCanvasObjectMode: {
        default: function () {
          return `replace`;
        },
        triggerUpdate: !1,
        onChange: X,
      },
      nodeVisibility: { default: !0, triggerUpdate: !1, onChange: X },
      linkSource: { default: `source` },
      linkTarget: { default: `target` },
      linkVisibility: { default: !0, triggerUpdate: !1, onChange: X },
      linkColor: { default: `color`, triggerUpdate: !1, onChange: X },
      linkAutoColorBy: {},
      linkLineDash: { triggerUpdate: !1, onChange: X },
      linkWidth: { default: 1, triggerUpdate: !1, onChange: X },
      linkCurvature: { default: 0, triggerUpdate: !1, onChange: X },
      linkCanvasObject: { triggerUpdate: !1, onChange: X },
      linkCanvasObjectMode: {
        default: function () {
          return `replace`;
        },
        triggerUpdate: !1,
        onChange: X,
      },
      linkDirectionalArrowLength: { default: 0, triggerUpdate: !1, onChange: X },
      linkDirectionalArrowColor: { triggerUpdate: !1, onChange: X },
      linkDirectionalArrowRelPos: { default: 0.5, triggerUpdate: !1, onChange: X },
      linkDirectionalParticles: { default: 0, triggerUpdate: !1, onChange: Kd },
      linkDirectionalParticleSpeed: { default: 0.01, triggerUpdate: !1 },
      linkDirectionalParticleOffset: { default: 0, triggerUpdate: !1 },
      linkDirectionalParticleWidth: { default: 4, triggerUpdate: !1 },
      linkDirectionalParticleColor: { triggerUpdate: !1 },
      linkDirectionalParticleCanvasObject: { triggerUpdate: !1 },
      globalScale: { default: 1, triggerUpdate: !1 },
      d3AlphaMin: { default: 0, triggerUpdate: !1 },
      d3AlphaDecay: {
        default: 0.0228,
        triggerUpdate: !1,
        onChange: function (e, n) {
          n.forceLayout.alphaDecay(e);
        },
      },
      d3AlphaTarget: {
        default: 0,
        triggerUpdate: !1,
        onChange: function (e, n) {
          n.forceLayout.alphaTarget(e);
        },
      },
      d3VelocityDecay: {
        default: 0.4,
        triggerUpdate: !1,
        onChange: function (e, n) {
          n.forceLayout.velocityDecay(e);
        },
      },
      warmupTicks: { default: 0, triggerUpdate: !1 },
      cooldownTicks: { default: 1 / 0, triggerUpdate: !1 },
      cooldownTime: { default: 15e3, triggerUpdate: !1 },
      onUpdate: { default: function () {}, triggerUpdate: !1 },
      onFinishUpdate: { default: function () {}, triggerUpdate: !1 },
      onEngineTick: { default: function () {}, triggerUpdate: !1 },
      onEngineStop: { default: function () {}, triggerUpdate: !1 },
      onNeedsRedraw: { triggerUpdate: !1 },
      isShadow: { default: !1, triggerUpdate: !1 },
    },
    methods: {
      d3Force: function (e, n, r) {
        return r === void 0 ? e.forceLayout.force(n) : (e.forceLayout.force(n, r), this);
      },
      d3ReheatSimulation: function (e) {
        return (e.forceLayout.alpha(1), this.resetCountdown(), this);
      },
      resetCountdown: function (e) {
        return ((e.cntTicks = 0), (e.startTickTime = new Date()), (e.engineRunning = !0), this);
      },
      isEngineRunning: function (e) {
        return !!e.engineRunning;
      },
      tickFrame: function (e) {
        return (!e.isShadow && n(), i(), !e.isShadow && a(), !e.isShadow && o(), r(), this);
        function n() {
          e.engineRunning &&
            (++e.cntTicks > e.cooldownTicks ||
            new Date() - e.startTickTime > e.cooldownTime ||
            (e.d3AlphaMin > 0 && e.forceLayout.alpha() < e.d3AlphaMin)
              ? ((e.engineRunning = !1), e.onEngineStop())
              : (e.forceLayout.tick(), e.onEngineTick()));
        }
        function r() {
          var n = L(e.nodeVisibility),
            r = L(e.nodeVal),
            i = L(e.nodeColor),
            a = L(e.nodeCanvasObjectMode),
            o = e.ctx,
            s = e.isShadow / e.globalScale,
            c = e.graphData.nodes.filter(n);
          (o.save(),
            c.forEach(function (n) {
              var c = a(n);
              if (
                e.nodeCanvasObject &&
                (c === `before` || c === `replace`) &&
                (e.nodeCanvasObject(n, o, e.globalScale), c === `replace`)
              ) {
                o.restore();
                return;
              }
              var l = Math.sqrt(Math.max(0, r(n) || 1)) * e.nodeRelSize + s;
              (o.beginPath(),
                o.arc(n.x, n.y, l, 0, 2 * Math.PI, !1),
                (o.fillStyle = i(n) || `rgba(31, 120, 180, 0.92)`),
                o.fill(),
                e.nodeCanvasObject && c === `after` && e.nodeCanvasObject(n, e.ctx, e.globalScale));
            }),
            o.restore());
        }
        function i() {
          var n = L(e.linkVisibility),
            r = L(e.linkColor),
            i = L(e.linkWidth),
            a = L(e.linkLineDash),
            o = L(e.linkCurvature),
            s = L(e.linkCanvasObjectMode),
            c = e.ctx,
            l = e.isShadow * 2,
            u = e.graphData.links.filter(n);
          u.forEach(_);
          var d = [],
            f = [],
            p = u;
          if (e.linkCanvasObject) {
            var m = [],
              h = [];
            (u.forEach(function (e) {
              return ({ before: d, after: f, replace: m }[s(e)] || h).push(e);
            }),
              (p = [].concat(Y(d), f, h)),
              (d = d.concat(m)));
          }
          (c.save(),
            d.forEach(function (n) {
              return e.linkCanvasObject(n, c, e.globalScale);
            }),
            c.restore());
          var g = _d(p, [r, i, a]);
          (c.save(),
            Object.entries(g).forEach(function (n) {
              var r = Ld(n, 2),
                i = r[0],
                o = r[1],
                s = !i || i === `undefined` ? `rgba(0,0,0,0.15)` : i;
              Object.entries(o).forEach(function (n) {
                var r = Ld(n, 2),
                  i = r[0],
                  o = r[1],
                  u = (i || 1) / e.globalScale + l;
                Object.entries(o).forEach(function (e) {
                  var n = Ld(e, 2);
                  n[0];
                  var r = n[1],
                    i = a(r[0]);
                  (c.beginPath(),
                    r.forEach(function (e) {
                      var n = e.source,
                        r = e.target;
                      if (!(!n || !r || !n.hasOwnProperty(`x`) || !r.hasOwnProperty(`x`))) {
                        c.moveTo(n.x, n.y);
                        var i = e.__controlPoints;
                        i
                          ? c[i.length === 2 ? `quadraticCurveTo` : `bezierCurveTo`].apply(
                              c,
                              Y(i).concat([r.x, r.y])
                            )
                          : c.lineTo(r.x, r.y);
                      }
                    }),
                    (c.strokeStyle = s),
                    (c.lineWidth = u),
                    c.setLineDash(i || []),
                    c.stroke());
                });
              });
            }),
            c.restore(),
            c.save(),
            f.forEach(function (n) {
              return e.linkCanvasObject(n, c, e.globalScale);
            }),
            c.restore());
          function _(e) {
            var n = o(e);
            if (!n) {
              e.__controlPoints = null;
              return;
            }
            var r = e.source,
              i = e.target;
            if (!(!r || !i || !r.hasOwnProperty(`x`) || !i.hasOwnProperty(`x`))) {
              var a = Math.sqrt((i.x - r.x) ** 2 + (i.y - r.y) ** 2);
              if (a > 0) {
                var s = Math.atan2(i.y - r.y, i.x - r.x),
                  c = a * n,
                  l = {
                    x: (r.x + i.x) / 2 + c * Math.cos(s - Math.PI / 2),
                    y: (r.y + i.y) / 2 + c * Math.sin(s - Math.PI / 2),
                  };
                e.__controlPoints = [l.x, l.y];
              } else {
                var u = n * 70;
                e.__controlPoints = [i.x, i.y - u, i.x + u, i.y];
              }
            }
          }
        }
        function a() {
          var n = 1.6,
            r = 0.2,
            i = L(e.linkDirectionalArrowLength),
            a = L(e.linkDirectionalArrowRelPos),
            o = L(e.linkVisibility),
            s = L(e.linkDirectionalArrowColor || e.linkColor),
            c = L(e.nodeVal),
            l = e.ctx;
          (l.save(),
            e.graphData.links.filter(o).forEach(function (o) {
              var u = i(o);
              if (!(!u || u < 0)) {
                var d = o.source,
                  f = o.target;
                if (!(!d || !f || !d.hasOwnProperty(`x`) || !f.hasOwnProperty(`x`))) {
                  var p = Math.sqrt(Math.max(0, c(d) || 1)) * e.nodeRelSize,
                    m = Math.sqrt(Math.max(0, c(f) || 1)) * e.nodeRelSize,
                    h = Math.min(1, Math.max(0, a(o))),
                    g = s(o) || `rgba(0,0,0,0.28)`,
                    _ = u / n / 2,
                    v =
                      o.__controlPoints &&
                      Od(nd, [d.x, d.y].concat(Y(o.__controlPoints), [f.x, f.y])),
                    y = v
                      ? function (e) {
                          return v.get(e);
                        }
                      : function (e) {
                          return { x: d.x + (f.x - d.x) * e || 0, y: d.y + (f.y - d.y) * e || 0 };
                        },
                    b = v ? v.length() : Math.sqrt((f.x - d.x) ** 2 + (f.y - d.y) ** 2),
                    x = p + u + (b - p - m - u) * h,
                    S = y(x / b),
                    C = y((x - u) / b),
                    w = y((x - u * (1 - r)) / b),
                    T = Math.atan2(S.y - C.y, S.x - C.x) - Math.PI / 2;
                  (l.beginPath(),
                    l.moveTo(S.x, S.y),
                    l.lineTo(C.x + _ * Math.cos(T), C.y + _ * Math.sin(T)),
                    l.lineTo(w.x, w.y),
                    l.lineTo(C.x - _ * Math.cos(T), C.y - _ * Math.sin(T)),
                    (l.fillStyle = g),
                    l.fill());
                }
              }
            }),
            l.restore());
        }
        function o() {
          var n = L(e.linkDirectionalParticles),
            r = L(e.linkDirectionalParticleSpeed),
            i = L(e.linkDirectionalParticleOffset),
            a = L(e.linkDirectionalParticleWidth),
            o = L(e.linkVisibility),
            s = L(e.linkDirectionalParticleColor || e.linkColor),
            c = e.ctx;
          (c.save(),
            e.graphData.links.filter(o).forEach(function (o) {
              var l = n(o);
              if (!(!o.hasOwnProperty(`__photons`) || !o.__photons.length)) {
                var u = o.source,
                  d = o.target;
                if (!(!u || !d || !u.hasOwnProperty(`x`) || !d.hasOwnProperty(`x`))) {
                  var f = r(o),
                    p = Math.abs(i(o)),
                    m = o.__photons || [],
                    h = Math.max(0, a(o) / 2) / Math.sqrt(e.globalScale);
                  c.fillStyle = s(o) || `rgba(0,0,0,0.28)`;
                  var g = o.__controlPoints
                      ? Od(nd, [u.x, u.y].concat(Y(o.__controlPoints), [d.x, d.y]))
                      : null,
                    _ = 0,
                    v = !1;
                  (m.forEach(function (n) {
                    var r = !!n.__singleHop;
                    if (
                      (n.hasOwnProperty(`__progressRatio`) ||
                        (n.__progressRatio = r ? +(f < 0) : (_ + p) / l),
                      !r && _++,
                      (n.__progressRatio += f),
                      n.__progressRatio >= 1 || n.__progressRatio < 0)
                    )
                      if (!r)
                        ((n.__progressRatio %= 1), n.__progressRatio < 0 && n.__progressRatio++);
                      else {
                        v = !0;
                        return;
                      }
                    var i = n.__progressRatio,
                      a = g
                        ? g.get(i)
                        : { x: u.x + (d.x - u.x) * i || 0, y: u.y + (d.y - u.y) * i || 0 };
                    e.linkDirectionalParticleCanvasObject
                      ? e.linkDirectionalParticleCanvasObject(a.x, a.y, o, c, e.globalScale)
                      : (c.beginPath(), c.arc(a.x, a.y, h, 0, 2 * Math.PI, !1), c.fill());
                  }),
                    v &&
                      (o.__photons = o.__photons.filter(function (e) {
                        return !e.__singleHop || (e.__progressRatio <= 1 && e.__progressRatio >= 0);
                      })));
                }
              }
            }),
            c.restore());
        }
      },
      emitParticle: function (e, n) {
        return (
          n && (!n.__photons && (n.__photons = []), n.__photons.push({ __singleHop: !0 })),
          this
        );
      },
    },
    stateInit: function () {
      return {
        forceLayout: ku()
          .force(`link`, _u())
          .force(`charge`, Au())
          .force(`center`, rl())
          .force(`dagRadial`, null)
          .stop(),
        engineRunning: !1,
      };
    },
    init: function (e, n) {
      n.ctx = e;
    },
    update: function (e, n) {
      ((e.engineRunning = !1),
        e.onUpdate(),
        e.nodeAutoColorBy !== null && Ud(e.graphData.nodes, L(e.nodeAutoColorBy), e.nodeColor),
        e.linkAutoColorBy !== null && Ud(e.graphData.links, L(e.linkAutoColorBy), e.linkColor),
        e.graphData.links.forEach(function (n) {
          ((n.source = n[e.linkSource]), (n.target = n[e.linkTarget]));
        }),
        e.forceLayout.stop().alpha(1).nodes(e.graphData.nodes));
      var r = e.forceLayout.force(`link`);
      r &&
        r
          .id(function (n) {
            return n[e.nodeId];
          })
          .links(e.graphData.links);
      var i =
          e.dagMode &&
          Wd(
            e.graphData,
            function (n) {
              return n[e.nodeId];
            },
            { nodeFilter: e.dagNodeFilter, onLoopError: e.onDagError || void 0 }
          ),
        a = Math.max.apply(Math, Y(Object.values(i || []))),
        o =
          e.dagLevelDistance ||
          (e.graphData.nodes.length / (a || 1)) *
            Gd *
            ([`radialin`, `radialout`].indexOf(e.dagMode) === -1 ? 1 : 0.7);
      if ([`lr`, `rl`, `td`, `bu`].includes(n.dagMode)) {
        var s = [`lr`, `rl`].includes(n.dagMode) ? `fx` : `fy`;
        e.graphData.nodes.filter(e.dagNodeFilter).forEach(function (e) {
          return delete e[s];
        });
      }
      if ([`lr`, `rl`, `td`, `bu`].includes(e.dagMode)) {
        var c = [`rl`, `bu`].includes(e.dagMode),
          l = function (n) {
            return (i[n[e.nodeId]] - a / 2) * o * (c ? -1 : 1);
          },
          u = [`lr`, `rl`].includes(e.dagMode) ? `fx` : `fy`;
        e.graphData.nodes.filter(e.dagNodeFilter).forEach(function (e) {
          return (e[u] = l(e));
        });
      }
      e.forceLayout.force(
        `dagRadial`,
        [`radialin`, `radialout`].indexOf(e.dagMode) === -1
          ? null
          : ju(function (n) {
              var r = i[n[e.nodeId]] || -1;
              return (e.dagMode === `radialin` ? a - r : r) * o;
            }).strength(function (n) {
              return +!!e.dagNodeFilter(n);
            })
      );
      for (
        var d = 0;
        d < e.warmupTicks && !(e.d3AlphaMin > 0 && e.forceLayout.alpha() < e.d3AlphaMin);
        d++
      )
        e.forceLayout.tick();
      (this.resetCountdown(), e.onFinishUpdate());
    },
  });
function Jd(e, n) {
  var r = e instanceof Array ? e : [e],
    i = new n();
  return (
    i._destructor && i._destructor(),
    {
      linkProp: function (e) {
        return {
          default: i[e](),
          onChange: function (n, i) {
            r.forEach(function (r) {
              return i[r][e](n);
            });
          },
          triggerUpdate: !1,
        };
      },
      linkMethod: function (e) {
        return function (n) {
          var i = [...arguments].slice(1),
            a = [];
          return (
            r.forEach(function (r) {
              var o = n[r],
                s = o[e].apply(o, i);
              s !== o && a.push(s);
            }),
            a.length ? a[0] : this
          );
        };
      },
    }
  );
}
var Yd = 800,
  Xd = 4,
  Zd = 5,
  Qd = Jd(`forceGraph`, qd),
  $d = Jd([`forceGraph`, `shadowGraph`], qd),
  ef = Object.assign.apply(
    Object,
    Y(
      `nodeColor.nodeAutoColorBy.nodeCanvasObject.nodeCanvasObjectMode.linkColor.linkAutoColorBy.linkLineDash.linkWidth.linkCanvasObject.linkCanvasObjectMode.linkDirectionalArrowLength.linkDirectionalArrowColor.linkDirectionalArrowRelPos.linkDirectionalParticles.linkDirectionalParticleSpeed.linkDirectionalParticleOffset.linkDirectionalParticleWidth.linkDirectionalParticleColor.linkDirectionalParticleCanvasObject.dagMode.dagLevelDistance.dagNodeFilter.onDagError.d3AlphaMin.d3AlphaDecay.d3VelocityDecay.warmupTicks.cooldownTicks.cooldownTime.onEngineTick.onEngineStop`
        .split(`.`)
        .map(function (e) {
          return kd({}, e, Qd.linkProp(e));
        })
    ).concat(
      Y(
        [
          `nodeRelSize`,
          `nodeId`,
          `nodeVal`,
          `nodeVisibility`,
          `linkSource`,
          `linkTarget`,
          `linkVisibility`,
          `linkCurvature`,
        ].map(function (e) {
          return kd({}, e, $d.linkProp(e));
        })
      )
    )
  ),
  tf = Object.assign.apply(
    Object,
    Y(
      [`d3Force`, `d3ReheatSimulation`, `emitParticle`].map(function (e) {
        return kd({}, e, Qd.linkMethod(e));
      })
    )
  );
function nf(e) {
  if (e.canvas) {
    var n = e.canvas.width,
      r = e.canvas.height;
    n === 300 && r === 150 && (n = r = 0);
    var i = window.devicePixelRatio;
    ((n /= i),
      (r /= i),
      [e.canvas, e.shadowCanvas].forEach(function (a) {
        ((a.style.width = `${e.width}px`),
          (a.style.height = `${e.height}px`),
          (a.width = e.width * i),
          (a.height = e.height * i),
          !n && !r && a.getContext(`2d`).scale(i, i));
      }));
    var a = xa(e.canvas).k;
    (e.zoom.translateBy(e.zoom.__baseElem, (e.width - n) / 2 / a, (e.height - r) / 2 / a),
      (e.needsRedraw = !0));
  }
}
function rf(e) {
  var n = window.devicePixelRatio;
  e.setTransform(n, 0, 0, n, 0, 0);
}
function af(e, n, r) {
  (e.save(), rf(e), e.clearRect(0, 0, n, r), e.restore());
}
var of = zo({
    props: Id(
      {
        width: {
          default: window.innerWidth,
          onChange: function (e, n) {
            return nf(n);
          },
          triggerUpdate: !1,
        },
        height: {
          default: window.innerHeight,
          onChange: function (e, n) {
            return nf(n);
          },
          triggerUpdate: !1,
        },
        graphData: {
          default: { nodes: [], links: [] },
          onChange: function (e, n) {
            ([e.nodes, e.links].every(function (e) {
              return (e || []).every(function (e) {
                return !e.hasOwnProperty(`__indexColor`);
              });
            }) && n.colorTracker.reset(),
              [
                { type: `Node`, objs: e.nodes },
                { type: `Link`, objs: e.links },
              ].forEach(r),
              n.forceGraph.graphData(e),
              n.shadowGraph.graphData(e));
            function r(e) {
              var r = e.type;
              e.objs
                .filter(function (e) {
                  if (!e.hasOwnProperty(`__indexColor`)) return !0;
                  var r = n.colorTracker.lookup(e.__indexColor);
                  return !r || !r.hasOwnProperty(`d`) || r.d !== e;
                })
                .forEach(function (e) {
                  e.__indexColor = n.colorTracker.register({ type: r, d: e });
                });
            }
          },
          triggerUpdate: !1,
        },
        backgroundColor: {
          onChange: function (e, n) {
            n.canvas && e && (n.canvas.style.background = e);
          },
          triggerUpdate: !1,
        },
        nodeLabel: { default: `name`, triggerUpdate: !1 },
        nodePointerAreaPaint: {
          onChange: function (e, n) {
            (n.shadowGraph.nodeCanvasObject(
              e
                ? function (n, r, i) {
                    return e(n, n.__indexColor, r, i);
                  }
                : null
            ),
              n.flushShadowCanvas && n.flushShadowCanvas());
          },
          triggerUpdate: !1,
        },
        linkPointerAreaPaint: {
          onChange: function (e, n) {
            (n.shadowGraph.linkCanvasObject(
              e
                ? function (n, r, i) {
                    return e(n, n.__indexColor, r, i);
                  }
                : null
            ),
              n.flushShadowCanvas && n.flushShadowCanvas());
          },
          triggerUpdate: !1,
        },
        linkLabel: { default: `name`, triggerUpdate: !1 },
        linkHoverPrecision: { default: 4, triggerUpdate: !1 },
        minZoom: {
          default: 0.01,
          onChange: function (e, n) {
            n.zoom.scaleExtent([e, n.zoom.scaleExtent()[1]]);
          },
          triggerUpdate: !1,
        },
        maxZoom: {
          default: 1e3,
          onChange: function (e, n) {
            n.zoom.scaleExtent([n.zoom.scaleExtent()[0], e]);
          },
          triggerUpdate: !1,
        },
        enableNodeDrag: { default: !0, triggerUpdate: !1 },
        enableZoomInteraction: { default: !0, triggerUpdate: !1 },
        enablePanInteraction: { default: !0, triggerUpdate: !1 },
        enableZoomPanInteraction: { default: !0, triggerUpdate: !1 },
        enablePointerInteraction: {
          default: !0,
          onChange: function (e, n) {
            n.hoverObj = null;
          },
          triggerUpdate: !1,
        },
        autoPauseRedraw: { default: !0, triggerUpdate: !1 },
        onNodeDrag: { default: function () {}, triggerUpdate: !1 },
        onNodeDragEnd: { default: function () {}, triggerUpdate: !1 },
        onNodeClick: { triggerUpdate: !1 },
        onNodeRightClick: { triggerUpdate: !1 },
        onNodeHover: { triggerUpdate: !1 },
        onLinkClick: { triggerUpdate: !1 },
        onLinkRightClick: { triggerUpdate: !1 },
        onLinkHover: { triggerUpdate: !1 },
        onBackgroundClick: { triggerUpdate: !1 },
        onBackgroundRightClick: { triggerUpdate: !1 },
        showPointerCursor: { default: !0, triggerUpdate: !1 },
        onZoom: { triggerUpdate: !1 },
        onZoomEnd: { triggerUpdate: !1 },
        onRenderFramePre: { triggerUpdate: !1 },
        onRenderFramePost: { triggerUpdate: !1 },
      },
      ef
    ),
    aliases: { stopAnimation: `pauseAnimation` },
    methods: Id(
      {
        graph2ScreenCoords: function (e, n, r) {
          var i = xa(e.canvas);
          return { x: n * i.k + i.x, y: r * i.k + i.y };
        },
        screen2GraphCoords: function (e, n, r) {
          var i = xa(e.canvas);
          return { x: (n - i.x) / i.k, y: (r - i.y) / i.k };
        },
        centerAt: function (e, n, r, i) {
          if (!e.canvas) return null;
          if (n !== void 0 || r !== void 0) {
            var a = Object.assign({}, n === void 0 ? {} : { x: n }, r === void 0 ? {} : { y: r });
            return (
              i
                ? e.tweenGroup.add(
                    new Oo(o())
                      .to(a, i)
                      .easing(So.Quadratic.Out)
                      .onUpdate(s)
                      .onComplete(function () {
                        e.tweenGroup.remove(this);
                      })
                      .start()
                  )
                : s(a),
              this
            );
          }
          return o();
          function o() {
            var n = xa(e.canvas);
            return { x: (e.width / 2 - n.x) / n.k, y: (e.height / 2 - n.y) / n.k };
          }
          function s(n) {
            var r = n.x,
              i = n.y;
            (e.zoom.translateTo(
              e.zoom.__baseElem,
              r === void 0 ? o().x : r,
              i === void 0 ? o().y : i
            ),
              (e.needsRedraw = !0));
          }
        },
        zoom: function (e, n, r) {
          if (!e.canvas) return null;
          if (n !== void 0)
            return (
              r
                ? e.tweenGroup.add(
                    new Oo({ k: i() })
                      .to({ k: n }, r)
                      .easing(So.Quadratic.Out)
                      .onUpdate(function (e) {
                        var n = e.k;
                        return a(n);
                      })
                      .onComplete(function () {
                        e.tweenGroup.remove(this);
                      })
                      .start()
                  )
                : a(n),
              this
            );
          return i();
          function i() {
            return xa(e.canvas).k;
          }
          function a(n) {
            (e.zoom.scaleTo(e.zoom.__baseElem, n), (e.needsRedraw = !0));
          }
        },
        zoomToFit: function (e) {
          var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
            r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 10,
            i = [...arguments].slice(3),
            a = this.getGraphBbox.apply(this, i);
          if (a) {
            var o = { x: (a.x[0] + a.x[1]) / 2, y: (a.y[0] + a.y[1]) / 2 },
              s = Math.max(
                1e-12,
                Math.min(
                  0xe8d4a51000,
                  (e.width - r * 2) / (a.x[1] - a.x[0]),
                  (e.height - r * 2) / (a.y[1] - a.y[0])
                )
              );
            (this.centerAt(o.x, o.y, n), this.zoom(s, n));
          }
          return this;
        },
        getGraphBbox: function (e) {
          var n =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : function () {
                    return !0;
                  },
            r = L(e.nodeVal),
            i = function (n) {
              return Math.sqrt(Math.max(0, r(n) || 1)) * e.nodeRelSize;
            },
            a = e.graphData.nodes.filter(n).map(function (e) {
              return { x: e.x, y: e.y, r: i(e) };
            });
          return a.length
            ? {
                x: [
                  La(a, function (e) {
                    return e.x - e.r;
                  }),
                  Ia(a, function (e) {
                    return e.x + e.r;
                  }),
                ],
                y: [
                  La(a, function (e) {
                    return e.y - e.r;
                  }),
                  Ia(a, function (e) {
                    return e.y + e.r;
                  }),
                ],
              }
            : null;
        },
        pauseAnimation: function (e) {
          return (
            (e.animationFrameRequestId &&= (cancelAnimationFrame(e.animationFrameRequestId), null)),
            this
          );
        },
        resumeAnimation: function (e) {
          return (e.animationFrameRequestId || this._animationCycle(), this);
        },
        _destructor: function () {
          (this.pauseAnimation(), this.graphData({ nodes: [], links: [] }));
        },
      },
      tf
    ),
    stateInit: function () {
      return {
        lastSetZoom: 1,
        zoom: Aa(),
        forceGraph: new qd(),
        shadowGraph: new qd()
          .cooldownTicks(0)
          .nodeColor(`__indexColor`)
          .linkColor(`__indexColor`)
          .isShadow(!0),
        colorTracker: new qs(),
        tweenGroup: new wo(),
      };
    },
    init: function (e, n) {
      var r = this;
      e.innerHTML = ``;
      var i = document.createElement(`div`);
      (i.classList.add(`force-graph-container`),
        (i.style.position = `relative`),
        e.appendChild(i),
        (n.canvas = document.createElement(`canvas`)),
        n.backgroundColor && (n.canvas.style.background = n.backgroundColor),
        i.appendChild(n.canvas),
        (n.shadowCanvas = document.createElement(`canvas`)));
      var a = n.canvas.getContext(`2d`),
        o = n.shadowCanvas.getContext(`2d`, { willReadFrequently: !0 }),
        s = { x: -0xe8d4a51000, y: -0xe8d4a51000 },
        c = function () {
          var e = null,
            r = window.devicePixelRatio,
            i = s.x > 0 && s.y > 0 ? o.getImageData(s.x * r, s.y * r, 1, 1) : null;
          return (i && (e = n.colorTracker.lookup(i.data)), e);
        };
      (F(n.canvas).call(
        bn()
          .subject(function () {
            if (!n.enableNodeDrag) return null;
            var e = c();
            return e && e.type === `Node` ? e.d : null;
          })
          .on(`start`, function (e) {
            var r = e.subject;
            ((r.__initialDragPos = { x: r.x, y: r.y, fx: r.fx, fy: r.fy }),
              e.active || ((r.fx = r.x), (r.fy = r.y)),
              n.canvas.classList.add(`grabbable`));
          })
          .on(`drag`, function (e) {
            var r = e.subject,
              i = r.__initialDragPos,
              a = e,
              o = xa(n.canvas).k,
              s = { x: i.x + (a.x - i.x) / o - r.x, y: i.y + (a.y - i.y) / o - r.y };
            ([`x`, `y`].forEach(function (e) {
              return (r[`f${e}`] = r[e] = i[e] + (a[e] - i[e]) / o);
            }),
              !(
                !r.__dragged &&
                Zd >=
                  Math.sqrt(
                    Ra(
                      [`x`, `y`].map(function (n) {
                        return (e[n] - i[n]) ** 2;
                      })
                    )
                  )
              ) &&
                (n.forceGraph.d3AlphaTarget(0.3).resetCountdown(),
                (n.isPointerDragging = !0),
                (r.__dragged = !0),
                n.onNodeDrag(r, s)));
          })
          .on(`end`, function (e) {
            var r = e.subject,
              i = r.__initialDragPos,
              a = { x: r.x - i.x, y: r.y - i.y };
            (i.fx === void 0 && (r.fx = void 0),
              i.fy === void 0 && (r.fy = void 0),
              delete r.__initialDragPos,
              n.forceGraph.d3AlphaTarget() && n.forceGraph.d3AlphaTarget(0).resetCountdown(),
              n.canvas.classList.remove(`grabbable`),
              (n.isPointerDragging = !1),
              r.__dragged && (delete r.__dragged, n.onNodeDragEnd(r, a)));
          })
      ),
        n.zoom((n.zoom.__baseElem = F(n.canvas))),
        n.zoom.__baseElem.on(`dblclick.zoom`, null),
        n.zoom
          .filter(function (e) {
            return (
              !e.button &&
              n.enableZoomPanInteraction &&
              (e.type !== `wheel` || L(n.enableZoomInteraction)(e)) &&
              (e.type === `wheel` || L(n.enablePanInteraction)(e))
            );
          })
          .on(`zoom`, function (e) {
            var i = e.transform;
            ([a, o].forEach(function (e) {
              (rf(e), e.translate(i.x, i.y), e.scale(i.k, i.k));
            }),
              (n.isPointerDragging = !0),
              n.onZoom && n.onZoom(Id(Id({}, i), r.centerAt())),
              (n.needsRedraw = !0));
          })
          .on(`end`, function (e) {
            ((n.isPointerDragging = !1),
              n.onZoomEnd && n.onZoomEnd(Id(Id({}, e.transform), r.centerAt())));
          }),
        nf(n),
        n.forceGraph
          .onNeedsRedraw(function () {
            return (n.needsRedraw = !0);
          })
          .onFinishUpdate(function () {
            xa(n.canvas).k === n.lastSetZoom &&
              n.graphData.nodes.length &&
              (n.zoom.scaleTo(
                n.zoom.__baseElem,
                (n.lastSetZoom = Xd / Math.cbrt(n.graphData.nodes.length))
              ),
              (n.needsRedraw = !0));
          }),
        (n.tooltip = new nl(i)),
        [`pointermove`, `pointerdown`].forEach(function (e) {
          return i.addEventListener(
            e,
            function (r) {
              (e === `pointerdown` && ((n.isPointerPressed = !0), (n.pointerDownEvent = r)),
                !n.isPointerDragging &&
                  r.type === `pointermove` &&
                  n.onBackgroundClick &&
                  (r.pressure > 0 || n.isPointerPressed) &&
                  (r.pointerType === `mouse` ||
                    r.movementX === void 0 ||
                    [r.movementX, r.movementY].some(function (e) {
                      return Math.abs(e) > 1;
                    })) &&
                  (n.isPointerDragging = !0));
              var a = o(i);
              ((s.x = r.pageX - a.left), (s.y = r.pageY - a.top));
              function o(e) {
                var n = e.getBoundingClientRect(),
                  r = window.pageXOffset || document.documentElement.scrollLeft,
                  i = window.pageYOffset || document.documentElement.scrollTop;
                return { top: n.top + i, left: n.left + r };
              }
            },
            { passive: !0 }
          );
        }),
        i.addEventListener(
          `pointerup`,
          function (e) {
            if (n.isPointerPressed) {
              if (((n.isPointerPressed = !1), n.isPointerDragging)) {
                n.isPointerDragging = !1;
                return;
              }
              var r = [e, n.pointerDownEvent];
              requestAnimationFrame(function () {
                if (e.button === 0)
                  if (n.hoverObj) {
                    var i = n[`on${n.hoverObj.type}Click`];
                    i && i.apply(void 0, [n.hoverObj.d].concat(r));
                  } else n.onBackgroundClick && n.onBackgroundClick.apply(n, r);
                if (e.button === 2)
                  if (n.hoverObj) {
                    var a = n[`on${n.hoverObj.type}RightClick`];
                    a && a.apply(void 0, [n.hoverObj.d].concat(r));
                  } else n.onBackgroundRightClick && n.onBackgroundRightClick.apply(n, r);
              });
            }
          },
          { passive: !0 }
        ),
        i.addEventListener(`contextmenu`, function (e) {
          return !n.onBackgroundRightClick && !n.onNodeRightClick && !n.onLinkRightClick
            ? !0
            : (e.preventDefault(), !1);
        }),
        n.forceGraph(a),
        n.shadowGraph(o));
      var l = xo(function () {
        (af(o, n.width, n.height),
          n.shadowGraph.linkWidth(function (e) {
            return L(n.linkWidth)(e) + n.linkHoverPrecision;
          }));
        var e = xa(n.canvas);
        n.shadowGraph.globalScale(e.k).tickFrame();
      }, Yd);
      ((n.flushShadowCanvas = l.flush),
        (this._animationCycle = function e() {
          var r =
            !n.autoPauseRedraw ||
            !!n.needsRedraw ||
            n.forceGraph.isEngineRunning() ||
            n.graphData.links.some(function (e) {
              return e.__photons && e.__photons.length;
            });
          if (((n.needsRedraw = !1), n.enablePointerInteraction)) {
            var i = n.isPointerDragging ? null : c();
            if (i !== n.hoverObj) {
              var o = n.hoverObj,
                s = o ? o.type : null,
                u = i ? i.type : null;
              if (s && s !== u) {
                var d = n[`on${s}Hover`];
                d && d(null, o.d);
              }
              if (u) {
                var f = n[`on${u}Hover`];
                f && f(i.d, s === u ? o.d : null);
              }
              (n.tooltip.content((i && L(n[`${i.type.toLowerCase()}Label`])(i.d)) || null),
                n.canvas.classList[
                  ((i && n[`on${u}Click`]) || (!i && n.onBackgroundClick)) &&
                  L(n.showPointerCursor)(i?.d)
                    ? `add`
                    : `remove`
                ](`clickable`),
                (n.hoverObj = i));
            }
            r && l();
          }
          if (r) {
            af(a, n.width, n.height);
            var p = xa(n.canvas).k;
            (n.onRenderFramePre && n.onRenderFramePre(a, p),
              n.forceGraph.globalScale(p).tickFrame(),
              n.onRenderFramePost && n.onRenderFramePost(a, p));
          }
          (n.tweenGroup.update(), (n.animationFrameRequestId = requestAnimationFrame(e)));
        })());
    },
    update: function (e) {},
  }),
  sf = r((e, n) => {
    n.exports = `SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED`;
  }),
  cf = r((e, n) => {
    var r = sf();
    function i() {}
    function a() {}
    ((a.resetWarningCache = i),
      (n.exports = function () {
        function e(e, n, i, a, o, s) {
          if (s !== r) {
            var c = Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
            );
            throw ((c.name = `Invariant Violation`), c);
          }
        }
        e.isRequired = e;
        function n() {
          return e;
        }
        var o = {
          array: e,
          bigint: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: n,
          element: e,
          elementType: e,
          instanceOf: n,
          node: e,
          objectOf: n,
          oneOf: n,
          oneOfType: n,
          shape: n,
          exact: n,
          checkPropTypes: a,
          resetWarningCache: i,
        };
        return ((o.PropTypes = o), o);
      }));
  }),
  lf = r((e, n) => {
    n.exports = cf()();
  }),
  Z = e(lf(), 1),
  uf = {
    width: Z.default.number,
    height: Z.default.number,
    graphData: Z.default.shape({
      nodes: Z.default.arrayOf(Z.default.object).isRequired,
      links: Z.default.arrayOf(Z.default.object).isRequired,
    }),
    backgroundColor: Z.default.string,
    nodeRelSize: Z.default.number,
    nodeId: Z.default.string,
    nodeLabel: Z.default.oneOfType([Z.default.string, Z.default.func]),
    nodeVal: Z.default.oneOfType([Z.default.number, Z.default.string, Z.default.func]),
    nodeVisibility: Z.default.oneOfType([Z.default.bool, Z.default.string, Z.default.func]),
    nodeColor: Z.default.oneOfType([Z.default.string, Z.default.func]),
    nodeAutoColorBy: Z.default.oneOfType([Z.default.string, Z.default.func]),
    onNodeHover: Z.default.func,
    onNodeClick: Z.default.func,
    linkSource: Z.default.string,
    linkTarget: Z.default.string,
    linkLabel: Z.default.oneOfType([Z.default.string, Z.default.func]),
    linkVisibility: Z.default.oneOfType([Z.default.bool, Z.default.string, Z.default.func]),
    linkColor: Z.default.oneOfType([Z.default.string, Z.default.func]),
    linkAutoColorBy: Z.default.oneOfType([Z.default.string, Z.default.func]),
    linkWidth: Z.default.oneOfType([Z.default.number, Z.default.string, Z.default.func]),
    linkCurvature: Z.default.oneOfType([Z.default.number, Z.default.string, Z.default.func]),
    linkDirectionalArrowLength: Z.default.oneOfType([
      Z.default.number,
      Z.default.string,
      Z.default.func,
    ]),
    linkDirectionalArrowColor: Z.default.oneOfType([Z.default.string, Z.default.func]),
    linkDirectionalArrowRelPos: Z.default.oneOfType([
      Z.default.number,
      Z.default.string,
      Z.default.func,
    ]),
    linkDirectionalParticles: Z.default.oneOfType([
      Z.default.number,
      Z.default.string,
      Z.default.func,
    ]),
    linkDirectionalParticleSpeed: Z.default.oneOfType([
      Z.default.number,
      Z.default.string,
      Z.default.func,
    ]),
    linkDirectionalParticleWidth: Z.default.oneOfType([
      Z.default.number,
      Z.default.string,
      Z.default.func,
    ]),
    linkDirectionalParticleColor: Z.default.oneOfType([Z.default.string, Z.default.func]),
    onLinkHover: Z.default.func,
    onLinkClick: Z.default.func,
    dagMode: Z.default.oneOf([`td`, `bu`, `lr`, `rl`, `zin`, `zout`, `radialin`, `radialout`]),
    dagLevelDistance: Z.default.number,
    dagNodeFilter: Z.default.func,
    onDagError: Z.default.func,
    d3AlphaMin: Z.default.number,
    d3AlphaDecay: Z.default.number,
    d3VelocityDecay: Z.default.number,
    warmupTicks: Z.default.number,
    cooldownTicks: Z.default.number,
    cooldownTime: Z.default.number,
    onEngineTick: Z.default.func,
    onEngineStop: Z.default.func,
    getGraphBbox: Z.default.func,
  },
  df = {
    zoomToFit: Z.default.func,
    onNodeRightClick: Z.default.func,
    onNodeDrag: Z.default.func,
    onNodeDragEnd: Z.default.func,
    onLinkRightClick: Z.default.func,
    linkHoverPrecision: Z.default.number,
    onBackgroundClick: Z.default.func,
    onBackgroundRightClick: Z.default.func,
    enablePointerInteraction: Z.default.bool,
    enableNodeDrag: Z.default.bool,
  },
  ff = {
    showNavInfo: Z.default.bool,
    nodeOpacity: Z.default.number,
    nodeResolution: Z.default.number,
    nodeThreeObject: Z.default.oneOfType([Z.default.object, Z.default.string, Z.default.func]),
    nodeThreeObjectExtend: Z.default.oneOfType([Z.default.bool, Z.default.string, Z.default.func]),
    linkOpacity: Z.default.number,
    linkResolution: Z.default.number,
    linkCurveRotation: Z.default.oneOfType([Z.default.number, Z.default.string, Z.default.func]),
    linkMaterial: Z.default.oneOfType([Z.default.object, Z.default.string, Z.default.func]),
    linkThreeObject: Z.default.oneOfType([Z.default.object, Z.default.string, Z.default.func]),
    linkThreeObjectExtend: Z.default.oneOfType([Z.default.bool, Z.default.string, Z.default.func]),
    linkPositionUpdate: Z.default.func,
    linkDirectionalArrowResolution: Z.default.number,
    linkDirectionalParticleResolution: Z.default.number,
    forceEngine: Z.default.oneOf([`d3`, `ngraph`]),
    ngraphPhysics: Z.default.object,
    numDimensions: Z.default.oneOf([1, 2, 3]),
  },
  pf = Object.assign({}, uf, df, {
    linkLineDash: Z.default.oneOfType([
      Z.default.arrayOf(Z.default.number),
      Z.default.string,
      Z.default.func,
    ]),
    nodeCanvasObjectMode: Z.default.oneOfType([Z.default.string, Z.default.func]),
    nodeCanvasObject: Z.default.func,
    nodePointerAreaPaint: Z.default.func,
    linkCanvasObjectMode: Z.default.oneOfType([Z.default.string, Z.default.func]),
    linkCanvasObject: Z.default.func,
    linkPointerAreaPaint: Z.default.func,
    autoPauseRedraw: Z.default.bool,
    minZoom: Z.default.number,
    maxZoom: Z.default.number,
    enableZoomInteraction: Z.default.oneOfType([Z.default.bool, Z.default.func]),
    enablePanInteraction: Z.default.oneOfType([Z.default.bool, Z.default.func]),
    onZoom: Z.default.func,
    onZoomEnd: Z.default.func,
    onRenderFramePre: Z.default.func,
    onRenderFramePost: Z.default.func,
  });
(Object.assign({}, uf, df, ff, {
  enableNavigationControls: Z.default.bool,
  controlType: Z.default.oneOf([`trackball`, `orbit`, `fly`]),
  rendererConfig: Z.default.object,
  extraRenderers: Z.default.arrayOf(Z.default.shape({ render: Z.default.func.isRequired })),
}),
  Object.assign({}, uf, ff, {
    nodeDesc: Z.default.oneOfType([Z.default.string, Z.default.func]),
    linkDesc: Z.default.oneOfType([Z.default.string, Z.default.func]),
  }),
  Object.assign({}, uf, ff, {
    markerAttrs: Z.default.object,
    yOffset: Z.default.number,
    glScale: Z.default.number,
  }));
var mf = se(of, {
  methodNames: [
    `emitParticle`,
    `d3Force`,
    `d3ReheatSimulation`,
    `stopAnimation`,
    `pauseAnimation`,
    `resumeAnimation`,
    `centerAt`,
    `zoom`,
    `zoomToFit`,
    `getGraphBbox`,
    `screen2GraphCoords`,
    `graph2ScreenCoords`,
  ],
});
((mf.displayName = `ForceGraph2D`), (mf.propTypes = pf));
function hf(e) {
  return function () {
    return e;
  };
}
function gf(e) {
  return (e() - 0.5) * 1e-6;
}
function _f(e) {
  return e.x + e.vx;
}
function vf(e) {
  return e.y + e.vy;
}
function yf(e) {
  var n,
    r,
    i,
    a = 1,
    o = 1;
  typeof e != `function` && (e = hf(e == null ? 1 : +e));
  function s() {
    for (var e, s = n.length, l, u, d, f, p, m, h = 0; h < o; ++h)
      for (l = Bl(n, _f, vf).visitAfter(c), e = 0; e < s; ++e)
        ((u = n[e]), (p = r[u.index]), (m = p * p), (d = u.x + u.vx), (f = u.y + u.vy), l.visit(g));
    function g(e, n, r, o, s) {
      var c = e.data,
        l = e.r,
        h = p + l;
      if (c) {
        if (c.index > u.index) {
          var g = d - c.x - c.vx,
            _ = f - c.y - c.vy,
            v = g * g + _ * _;
          v < h * h &&
            (g === 0 && ((g = gf(i)), (v += g * g)),
            _ === 0 && ((_ = gf(i)), (v += _ * _)),
            (v = ((h - (v = Math.sqrt(v))) / v) * a),
            (u.vx += (g *= v) * (h = (l *= l) / (m + l))),
            (u.vy += (_ *= v) * h),
            (c.vx -= g * (h = 1 - h)),
            (c.vy -= _ * h));
        }
        return;
      }
      return n > d + h || o < d - h || r > f + h || s < f - h;
    }
  }
  function c(e) {
    if (e.data) return (e.r = r[e.data.index]);
    for (var n = (e.r = 0); n < 4; ++n) e[n] && e[n].r > e.r && (e.r = e[n].r);
  }
  function l() {
    if (n) {
      var i,
        a = n.length,
        o;
      for (r = Array(a), i = 0; i < a; ++i) ((o = n[i]), (r[o.index] = +e(o, i, n)));
    }
  }
  return (
    (s.initialize = function (e, r) {
      ((n = e), (i = r), l());
    }),
    (s.iterations = function (e) {
      return arguments.length ? ((o = +e), s) : o;
    }),
    (s.strength = function (e) {
      return arguments.length ? ((a = +e), s) : a;
    }),
    (s.radius = function (n) {
      return arguments.length ? ((e = typeof n == `function` ? n : hf(+n)), l(), s) : e;
    }),
    s
  );
}
var bf = o(`Activity`, [
    [
      `path`,
      {
        d: `M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2`,
        key: `169zse`,
      },
    ],
  ]),
  xf = o(`Brain`, [
    [
      `path`,
      {
        d: `M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z`,
        key: `l5xja`,
      },
    ],
    [
      `path`,
      {
        d: `M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z`,
        key: `ep3f8r`,
      },
    ],
    [`path`, { d: `M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4`, key: `1p4c4q` }],
    [`path`, { d: `M17.599 6.5a3 3 0 0 0 .399-1.375`, key: `tmeiqw` }],
    [`path`, { d: `M6.003 5.125A3 3 0 0 0 6.401 6.5`, key: `105sqy` }],
    [`path`, { d: `M3.477 10.896a4 4 0 0 1 .585-.396`, key: `ql3yin` }],
    [`path`, { d: `M19.938 10.5a4 4 0 0 1 .585.396`, key: `1qfode` }],
    [`path`, { d: `M6 18a4 4 0 0 1-1.967-.516`, key: `2e4loj` }],
    [`path`, { d: `M19.967 17.484A4 4 0 0 1 18 18`, key: `159ez6` }],
  ]),
  Sf = o(`Calendar`, [
    [`path`, { d: `M8 2v4`, key: `1cmpym` }],
    [`path`, { d: `M16 2v4`, key: `4m81vk` }],
    [`rect`, { width: `18`, height: `18`, x: `3`, y: `4`, rx: `2`, key: `1hopcy` }],
    [`path`, { d: `M3 10h18`, key: `8toen8` }],
  ]),
  Cf = o(`ChevronDown`, [[`path`, { d: `m6 9 6 6 6-6`, key: `qrunsl` }]]),
  wf = o(`ChevronRight`, [[`path`, { d: `m9 18 6-6-6-6`, key: `mthhwq` }]]),
  Tf = o(`Compass`, [
    [
      `path`,
      {
        d: `m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z`,
        key: `9ktpf1`,
      },
    ],
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
  ]),
  Ef = o(`Cpu`, [
    [`rect`, { width: `16`, height: `16`, x: `4`, y: `4`, rx: `2`, key: `14l7u7` }],
    [`rect`, { width: `6`, height: `6`, x: `9`, y: `9`, rx: `1`, key: `5aljv4` }],
    [`path`, { d: `M15 2v2`, key: `13l42r` }],
    [`path`, { d: `M15 20v2`, key: `15mkzm` }],
    [`path`, { d: `M2 15h2`, key: `1gxd5l` }],
    [`path`, { d: `M2 9h2`, key: `1bbxkp` }],
    [`path`, { d: `M20 15h2`, key: `19e6y8` }],
    [`path`, { d: `M20 9h2`, key: `19tzq7` }],
    [`path`, { d: `M9 2v2`, key: `165o2o` }],
    [`path`, { d: `M9 20v2`, key: `i2bqo8` }],
  ]),
  Df = o(`DollarSign`, [
    [`line`, { x1: `12`, x2: `12`, y1: `2`, y2: `22`, key: `7eqyqh` }],
    [`path`, { d: `M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6`, key: `1b0p4s` }],
  ]),
  Of = o(`FileText`, [
    [`path`, { d: `M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z`, key: `1rqfz7` }],
    [`path`, { d: `M14 2v4a2 2 0 0 0 2 2h4`, key: `tnqrlb` }],
    [`path`, { d: `M10 9H8`, key: `b1mrlr` }],
    [`path`, { d: `M16 13H8`, key: `t4e002` }],
    [`path`, { d: `M16 17H8`, key: `z1uh3a` }],
  ]),
  kf = o(`Filter`, [
    [`polygon`, { points: `22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3`, key: `1yg77f` }],
  ]),
  Af = o(`Flame`, [
    [
      `path`,
      {
        d: `M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z`,
        key: `96xj49`,
      },
    ],
  ]),
  jf = o(`FolderTree`, [
    [
      `path`,
      {
        d: `M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z`,
        key: `hod4my`,
      },
    ],
    [
      `path`,
      {
        d: `M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z`,
        key: `w4yl2u`,
      },
    ],
    [`path`, { d: `M3 5a2 2 0 0 0 2 2h3`, key: `f2jnh7` }],
    [`path`, { d: `M3 3v13a2 2 0 0 0 2 2h3`, key: `k8epm1` }],
  ]),
  Mf = o(`Folder`, [
    [
      `path`,
      {
        d: `M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z`,
        key: `1kt360`,
      },
    ],
  ]),
  Nf = o(`GitCommitHorizontal`, [
    [`circle`, { cx: `12`, cy: `12`, r: `3`, key: `1v7zrd` }],
    [`line`, { x1: `3`, x2: `9`, y1: `12`, y2: `12`, key: `1dyftd` }],
    [`line`, { x1: `15`, x2: `21`, y1: `12`, y2: `12`, key: `oup4p8` }],
  ]),
  Pf = o(`Info`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M12 16v-4`, key: `1dtifu` }],
    [`path`, { d: `M12 8h.01`, key: `e9boi3` }],
  ]),
  Ff = o(`Layers`, [
    [
      `path`,
      {
        d: `m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z`,
        key: `8b97xw`,
      },
    ],
    [`path`, { d: `m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65`, key: `dd6zsq` }],
    [`path`, { d: `m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65`, key: `ep9fru` }],
  ]),
  If = o(`Maximize2`, [
    [`polyline`, { points: `15 3 21 3 21 9`, key: `mznyad` }],
    [`polyline`, { points: `9 21 3 21 3 15`, key: `1avn1i` }],
    [`line`, { x1: `21`, x2: `14`, y1: `3`, y2: `10`, key: `ota7mn` }],
    [`line`, { x1: `3`, x2: `10`, y1: `21`, y2: `14`, key: `1atl0r` }],
  ]),
  Lf = o(`Minimize2`, [
    [`polyline`, { points: `4 14 10 14 10 20`, key: `11kfnr` }],
    [`polyline`, { points: `20 10 14 10 14 4`, key: `rlmsce` }],
    [`line`, { x1: `14`, x2: `21`, y1: `10`, y2: `3`, key: `o5lafz` }],
    [`line`, { x1: `3`, x2: `10`, y1: `21`, y2: `14`, key: `1atl0r` }],
  ]),
  Rf = o(`Pause`, [
    [`rect`, { x: `14`, y: `4`, width: `4`, height: `16`, rx: `1`, key: `zuxfzm` }],
    [`rect`, { x: `6`, y: `4`, width: `4`, height: `16`, rx: `1`, key: `1okwgv` }],
  ]),
  zf = o(`Play`, [[`polygon`, { points: `6 3 20 12 6 21 6 3`, key: `1oa8hb` }]]),
  Bf = o(`RefreshCw`, [
    [`path`, { d: `M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`, key: `v9h5vc` }],
    [`path`, { d: `M21 3v5h-5`, key: `1q7to0` }],
    [`path`, { d: `M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`, key: `3uifl3` }],
    [`path`, { d: `M8 16H3v5`, key: `1cv678` }],
  ]),
  Vf = o(`Search`, [
    [`circle`, { cx: `11`, cy: `11`, r: `8`, key: `4ej97u` }],
    [`path`, { d: `m21 21-4.3-4.3`, key: `1qie3q` }],
  ]),
  Hf = o(`ShieldCheck`, [
    [
      `path`,
      {
        d: `M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,
        key: `oel41y`,
      },
    ],
    [`path`, { d: `m9 12 2 2 4-4`, key: `dzmm74` }],
  ]),
  Uf = o(`TrendingUp`, [
    [`polyline`, { points: `22 7 13.5 15.5 8.5 10.5 2 17`, key: `126l90` }],
    [`polyline`, { points: `16 7 22 7 22 13`, key: `kwv8wd` }],
  ]),
  Wf = o(`TriangleAlert`, [
    [
      `path`,
      {
        d: `m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,
        key: `wmoenq`,
      },
    ],
    [`path`, { d: `M12 9v4`, key: `juzpu7` }],
    [`path`, { d: `M12 17h.01`, key: `p32p05` }],
  ]),
  Gf = o(`Users`, [
    [`path`, { d: `M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`, key: `1yyitq` }],
    [`circle`, { cx: `9`, cy: `7`, r: `4`, key: `nufk8` }],
    [`path`, { d: `M22 21v-2a4 4 0 0 0-3-3.87`, key: `kshegd` }],
    [`path`, { d: `M16 3.13a4 4 0 0 1 0 7.75`, key: `1da9ce` }],
  ]),
  Kf = o(`ZoomIn`, [
    [`circle`, { cx: `11`, cy: `11`, r: `8`, key: `4ej97u` }],
    [`line`, { x1: `21`, x2: `16.65`, y1: `21`, y2: `16.65`, key: `13gj7c` }],
    [`line`, { x1: `11`, x2: `11`, y1: `8`, y2: `14`, key: `1vmskp` }],
    [`line`, { x1: `8`, x2: `14`, y1: `11`, y2: `11`, key: `durymu` }],
  ]),
  qf = o(`ZoomOut`, [
    [`circle`, { cx: `11`, cy: `11`, r: `8`, key: `4ej97u` }],
    [`line`, { x1: `21`, x2: `16.65`, y1: `21`, y2: `16.65`, key: `13gj7c` }],
    [`line`, { x1: `8`, x2: `14`, y1: `11`, y2: `11`, key: `durymu` }],
  ]),
  Q = i(),
  Jf = {
    green: `52, 211, 153`,
    yellow: `251, 191, 36`,
    orange: `251, 146, 60`,
    red: `248, 113, 113`,
    neutral: `156, 163, 175`,
  },
  Yf = new Set([`loc`, `churn`, `coupling`, `instability`, `equal`]);
function Xf(e) {
  return Yf.has(e);
}
var $ = (e) => {
  if (!e) return ``;
  if (typeof e == `object` && `id` in e) {
    let n = e.id;
    return n === void 0 ? `` : String(n);
  }
  return String(e);
};
function Zf({ graphData: e, selectedSha: n, commits: r = [], onSelectCommit: i }) {
  let [a, o] = (0, l.useState)(null),
    [s, c] = (0, l.useState)(null),
    [u, d] = (0, l.useState)(``),
    [f, p] = (0, l.useState)(!1),
    [m, h] = (0, l.useState)(!1),
    [g, _] = (0, l.useState)(!0),
    [v, y] = (0, l.useState)(!0),
    [b, x] = (0, l.useState)(`filters`),
    [S, C] = (0, l.useState)(new Set()),
    [w, T] = (0, l.useState)(`loc`),
    [E, ee] = (0, l.useState)(!0),
    [te, ne] = (0, l.useState)(!0),
    [re, ie] = (0, l.useState)(`all`),
    [ae, oe] = (0, l.useState)(`all`),
    [se, ce] = (0, l.useState)(!1),
    [le, ue] = (0, l.useState)(!1),
    [de, fe] = (0, l.useState)(!1),
    [pe, me] = (0, l.useState)(!1),
    [he, ge] = (0, l.useState)(1500),
    _e = (0, l.useRef)(null),
    [, ve] = (0, l.useState)(0);
  (0, l.useEffect)(() => {
    let e = new MutationObserver(() => {
      ve((e) => e + 1);
    });
    return (
      e.observe(document.documentElement, { attributes: !0, attributeFilter: [`class`] }),
      () => e.disconnect()
    );
  }, []);
  let ye = (0, l.useRef)(null),
    be = (0, l.useRef)(null),
    D = (0, l.useRef)(void 0),
    [xe, Se] = (0, l.useState)({ width: 800, height: 600 });
  (0, l.useEffect)(() => {
    if (!ye.current) return;
    let e = new ResizeObserver((e) => {
      for (let n of e) {
        let { width: e, height: r } = n.contentRect;
        e > 0 && r > 0 && Se({ width: e, height: r });
      }
    });
    return (e.observe(ye.current), () => e.disconnect());
  }, []);
  let Ce = (0, l.useRef)(null);
  (0, l.useEffect)(() => {
    if (xe.width > 0) {
      let e = Ce.current;
      (e === null ? xe.width < 768 && (y(!1), _(!1)) : e >= 768 && xe.width < 768 && (y(!1), _(!1)),
        (Ce.current = xe.width));
    }
  }, [xe.width]);
  let [we, Te] = (0, l.useState)(new Set()),
    Ee = (0, l.useRef)([]);
  (0, l.useEffect)(() => {
    if (e && e.nodes.length > 0) {
      if (Ee.current.length > 0) {
        let n = new Set(Ee.current),
          r = new Set(e.nodes.map((e) => e.id)),
          i = new Set();
        (r.forEach((e) => {
          n.has(e) || i.add(e);
        }),
          Te(i));
      }
      Ee.current = e.nodes.map((e) => e.id);
    }
  }, [e]);
  let O = (0, l.useMemo)(
      () =>
        e
          ? e.nodes.map((e) => ({
              id: e.id,
              name: e.module || e.file,
              file: e.file,
              module: e.module || `Root`,
              health_color: e.health_color,
              loc: e.loc,
              health: e.health,
              is_entry_point:
                e.is_entry_point ||
                e.file.includes(`main`) ||
                e.file.includes(`index`) ||
                e.file.includes(`App`),
            }))
          : [],
      [e]
    ),
    k = (0, l.useMemo)(
      () =>
        e
          ? e.edges
              .filter((e) => (E && e.type === `import`) || (te && e.type === `co_change`))
              .map((e) => ({ source: e.source, target: e.target, type: e.type, weight: e.weight }))
          : [],
      [e, E, te]
    ),
    De = (e) => {
      let n = e;
      return `${$(n.source)}->${$(n.target)}`;
    },
    A = (0, l.useMemo)(() => {
      if (!k.length || !O.length) return { nodes: new Set(), edges: new Set() };
      let e = k.filter((e) => e.type === `import`),
        n = new Map();
      e.forEach((e) => {
        let r = $(e.source),
          i = $(e.target);
        (n.has(r) || n.set(r, []), n.get(r).push(i));
      });
      let r = new Set(),
        i = new Set(),
        a = new Set(),
        o = new Set(),
        s = (e, c) => {
          (i.add(e), c.push(e));
          let l = n.get(e) || [];
          for (let e of l)
            if (i.has(e)) {
              let n = c.indexOf(e);
              if (n !== -1) {
                let e = c.slice(n);
                e.forEach((e) => a.add(e));
                for (let n = 0; n < e.length; n++) {
                  let r = e[n],
                    i = e[(n + 1) % e.length];
                  o.add(`${r}->${i}`);
                }
              }
            } else r.has(e) || s(e, c);
          (c.pop(), i.delete(e), r.add(e));
        };
      return (
        O.forEach((e) => {
          r.has(e.id) || s(e.id, []);
        }),
        { nodes: a, edges: o }
      );
    }, [O, k]),
    Oe = (0, l.useMemo)(() => {
      let e = new Set();
      return (
        O.forEach((n) => {
          n.module && e.add(n.module);
        }),
        Array.from(e)
      );
    }, [O]),
    ke = (0, l.useMemo)(() => {
      let e = new Map(),
        n = 1,
        r = new Map();
      return (
        O.forEach((e) => {
          let i =
            (e.loc || 10) *
            (e.health_color === `red`
              ? 3
              : e.health_color === `orange`
                ? 2
                : e.health_color === `yellow`
                  ? 1
                  : 0.5);
          (r.set(e.id, i), i > n && (n = i));
        }),
        O.forEach((i) => {
          let a = r.get(i.id) || 0,
            o = Math.min(100, Math.round((a / n) * 100)),
            s = `text-emerald-400 font-normal`,
            c = `low`;
          (o > 75
            ? ((s = `text-rose-400 font-semibold`), (c = `critical`))
            : o > 50
              ? ((s = `text-orange-400 font-semibold`), (c = `high`))
              : o > 25 && ((s = `text-amber-300 font-medium`), (c = `medium`)),
            e.set(i.file, { score: o, colorClass: s, iconType: c }),
            e.set(i.id, { score: o, colorClass: s, iconType: c }));
        }),
        e
      );
    }, [O]),
    Ae = (0, l.useMemo)(() => {
      let e = [];
      O.forEach((n) => {
        let r = n.file.split(`/`).filter(Boolean),
          i = e;
        r.forEach((e, a) => {
          let o = a === r.length - 1,
            s = i.find((n) => n.name === e && n.isFolder === !o);
          (s ||
            ((s = {
              name: e,
              fullPath: o ? n.file : void 0,
              nodeId: o ? n.id : void 0,
              children: [],
              isFolder: !o,
            }),
            i.push(s)),
            (i = s.children));
        });
      });
      let n = (e) => {
        (e.sort((e, n) =>
          e.isFolder && !n.isFolder
            ? -1
            : !e.isFolder && n.isFolder
              ? 1
              : e.name.localeCompare(n.name)
        ),
          e.forEach((e) => {
            e.children.length > 0 && n(e.children);
          }));
      };
      return (n(e), e);
    }, [O]),
    je = (0, l.useCallback)((e) => {
      C((n) => {
        let r = new Set(n);
        return (r.has(e) ? r.delete(e) : r.add(e), r);
      });
    }, []),
    Me = (0, l.useCallback)(
      (e) => {
        let n = O.find((n) => n.id === e);
        n &&
          D.current &&
          (D.current.centerAt(n.x, n.y, 800), D.current.zoom(1.8, 800), c(e), _(!0));
      },
      [O]
    ),
    Ne = (0, l.useCallback)(
      (e, n = ``) =>
        e.map((e) => {
          let r = n ? `${n}/${e.name}` : e.name,
            i = S.has(r);
          if (e.isFolder)
            return (0, Q.jsxs)(
              `div`,
              {
                className: `select-none my-0.5`,
                children: [
                  (0, Q.jsxs)(`button`, {
                    type: `button`,
                    onClick: () => je(r),
                    className: `w-full flex items-center gap-1.5 py-1 px-1.5 rounded-lg hover:bg-white/5 text-slate-300 text-xs font-medium text-left transition-colors`,
                    children: [
                      i
                        ? (0, Q.jsx)(wf, { className: `w-3 h-3 text-slate-500 flex-shrink-0` })
                        : (0, Q.jsx)(Cf, { className: `w-3 h-3 text-slate-400 flex-shrink-0` }),
                      (0, Q.jsx)(Mf, { className: `w-3.5 h-3.5 text-purple-400 flex-shrink-0` }),
                      (0, Q.jsx)(`span`, {
                        className: `truncate font-mono text-[11px]`,
                        children: e.name,
                      }),
                    ],
                  }),
                  !i &&
                    (0, Q.jsx)(`div`, {
                      className: `pl-3.5 border-l border-white/5 ml-2`,
                      children: Ne(e.children, r),
                    }),
                ],
              },
              r
            );
          let a = e.fullPath || e.nodeId ? ke.get(e.fullPath) || ke.get(e.nodeId) : void 0;
          return (0, Q.jsx)(
            `div`,
            {
              className: `my-0.5`,
              children: (0, Q.jsxs)(`button`, {
                type: `button`,
                onClick: () => {
                  e.nodeId && Me(e.nodeId);
                },
                className: `w-full flex items-center justify-between gap-1.5 py-1 px-2 rounded-lg text-left transition-all ${e.nodeId === s ? `bg-purple-500/20 text-white border border-purple-500/40` : `hover:bg-white/5 text-slate-300`}`,
                children: [
                  (0, Q.jsxs)(`div`, {
                    className: `flex items-center gap-1.5 min-w-0`,
                    children: [
                      (0, Q.jsx)(Of, { className: `w-3.5 h-3.5 text-slate-400 flex-shrink-0` }),
                      (0, Q.jsx)(`span`, {
                        className: `truncate font-mono text-[11px] ${a?.colorClass || `text-slate-300`}`,
                        children: e.name,
                      }),
                    ],
                  }),
                  (0, Q.jsxs)(`div`, {
                    className: `flex items-center gap-1 flex-shrink-0 ml-1`,
                    children: [
                      a?.iconType === `critical` &&
                        (0, Q.jsx)(`span`, {
                          title: `Critical Hotspot (${a.score}/100)`,
                          children: (0, Q.jsx)(Wf, {
                            className: `w-3 h-3 text-rose-400 animate-pulse`,
                          }),
                        }),
                      a?.iconType === `high` &&
                        (0, Q.jsx)(`span`, {
                          title: `High Risk Hotspot (${a.score}/100)`,
                          children: (0, Q.jsx)(Af, { className: `w-3 h-3 text-orange-400` }),
                        }),
                      a &&
                        (0, Q.jsx)(`span`, {
                          className: `text-[9px] font-mono font-bold ${a.colorClass}`,
                          children: a.score,
                        }),
                    ],
                  }),
                ],
              }),
            },
            r
          );
        }),
      [S, ke, s, je, Me]
    ),
    j = (0, l.useMemo)(() => {
      let e = new Map(),
        n = new Map();
      (O.forEach((r) => {
        (e.set(r.id, 0), n.set(r.id, 0));
      }),
        k.forEach((r) => {
          let i = $(r.source),
            a = $(r.target);
          r.type === `import` && (n.set(i, (n.get(i) || 0) + 1), e.set(a, (e.get(a) || 0) + 1));
        }));
      let r = new Map();
      return (
        O.forEach((i) => {
          let a = e.get(i.id) || 0,
            o = n.get(i.id) || 0,
            s = a + o,
            c = s === 0 ? 0.5 : o / s;
          r.set(i.id, c);
        }),
        { afferent: e, efferent: n, instability: r }
      );
    }, [O, k]),
    M = (0, l.useMemo)(() => {
      if (!s) return null;
      let e = O.find((e) => e.id === s);
      if (!e) return null;
      let n = [],
        r = [];
      k.forEach((e) => {
        let i = $(e.source),
          a = $(e.target);
        e.type === `import` && (i === s && n.push(a), a === s && r.push(i));
      });
      let i = j.afferent.get(s) || 0,
        a = j.efferent.get(s) || 0,
        o = j.instability.get(s) || 0.5,
        c = A.nodes.has(s);
      return { ...e, ca: i, ce: a, instability: o, isCyclic: c, imports: n, importedBy: r };
    }, [s, O, k, j, A]),
    Pe = (0, l.useMemo)(() => {
      if (O.length === 0) return 1;
      let e = 0;
      return (
        O.forEach((n) => {
          e += j.instability.get(n.id) || 0;
        }),
        Math.max(0, Math.min(1, 1 - e / O.length))
      );
    }, [O, j]),
    Fe = (0, l.useMemo)(() => {
      let e = O.filter((e) => {
          if ((re !== `all` && e.module !== re) || (ae !== `all` && e.health_color !== ae))
            return !1;
          if (u) {
            let n = u.toLowerCase();
            return e.file.toLowerCase().includes(n) || e.module.toLowerCase().includes(n);
          }
          return !0;
        }),
        n = new Set(e.map((e) => e.id));
      return {
        nodes: e,
        links: k.filter((e) => {
          let r = $(e.source),
            i = $(e.target);
          return n.has(r) && n.has(i);
        }),
      };
    }, [O, k, re, ae, u]),
    Ie = (0, l.useCallback)(
      (e) => {
        let n = 5;
        if (w === `loc`) n = Math.sqrt(Math.max(e.loc || 0, 10)) * 0.9 + 2.5;
        else if (w === `churn`) n = Math.sqrt(Math.max(e.churn || 0, 0.05)) * 5.5 + 2.5;
        else if (w === `coupling`) {
          let r = j.afferent.get(e.id) || 0,
            i = j.efferent.get(e.id) || 0;
          n = Math.sqrt(r + i) * 2.2 + 2.5;
        } else n = w === `instability` ? (j.instability.get(e.id) || 0) * 6.5 + 2.5 : 5.5;
        return Math.min(Math.max(n, 4), 16);
      },
      [w, j]
    ),
    Le = (0, l.useRef)(!0);
  ((0, l.useEffect)(() => {
    if (D.current) {
      let e = D.current.d3Force(`charge`);
      e && e.strength(-650);
      let n = D.current.d3Force(`link`);
      n && n.distance(160);
      let r = yf().radius((e) => Ie(e) + 32);
      D.current.d3Force(`collide`, r);
    }
    Le.current = !0;
  }, [O, E, te, re, ae, Ie]),
    (0, l.useEffect)(() => {
      if (((Le.current = !0), D.current)) {
        D.current.d3ReheatSimulation();
        let e = setTimeout(() => {
          D.current && D.current.zoomToFit(400, 80);
        }, 150);
        return () => clearTimeout(e);
      }
    }, [xe.width, xe.height]));
  let Re = (0, l.useCallback)(() => {
    Le.current &&
      D.current &&
      Fe.nodes.length > 0 &&
      (D.current.zoomToFit(500, 70), (Le.current = !1));
  }, [Fe]);
  (0, l.useEffect)(() => {
    if (pe && r.length > 0 && i) {
      let e = r.findIndex((e) => e.sha === n);
      _e.current = setInterval(() => {
        i(r[(e + 1) % r.length]);
      }, he);
    } else _e.current && clearInterval(_e.current);
    return () => {
      _e.current && clearInterval(_e.current);
    };
  }, [pe, r, n, he, i]);
  let ze = (0, l.useCallback)(
      (e) => {
        let n = s || a,
          r = !0;
        n &&
          (r =
            e.id === n ||
            k.some((r) => {
              let i = $(r.source),
                a = $(r.target);
              return (i === n && a === e.id) || (a === n && i === e.id);
            }));
        let i = n ? (r ? 1 : 0.12) : 1;
        if (de) {
          let n = j.instability.get(e.id) || 0.5;
          return `rgba(${Math.round(n * 239)}, ${Math.round((1 - n) * 197)}, 120, ${i})`;
        }
        return `rgba(${Jf[e.health_color] || Jf.neutral}, ${i})`;
      },
      [a, s, k, de, j]
    ),
    Be = (0, l.useCallback)(
      (e, n, r) => {
        if (
          !e ||
          e.x === void 0 ||
          e.y === void 0 ||
          e.x === null ||
          e.y === null ||
          isNaN(e.x) ||
          isNaN(e.y) ||
          !isFinite(e.x) ||
          !isFinite(e.y)
        )
          return;
        let i = Ie(e),
          o = ze(e);
        if (le && e.health_color === `red` && (j.afferent.get(e.id) || 0) > 2) {
          let a = Date.now() / 300,
            o = i + 4 + Math.sin(a) * 2;
          (n.beginPath(),
            n.arc(e.x, e.y, o, 0, 2 * Math.PI),
            (n.fillStyle = `rgba(239, 68, 68, 0.12)`),
            n.fill(),
            (n.strokeStyle = `rgba(239, 68, 68, 0.35)`),
            (n.lineWidth = 1 / r),
            n.stroke());
        }
        if (we.has(e.id)) {
          let a = Date.now() / 200,
            o = i + 5 + Math.sin(a) * 1.5;
          (n.beginPath(),
            n.arc(e.x, e.y, o, 0, 2 * Math.PI),
            (n.fillStyle = `rgba(52, 211, 153, 0.08)`),
            n.fill(),
            (n.strokeStyle = `rgba(52, 211, 153, 0.5)`),
            (n.lineWidth = 1.5 / r),
            n.stroke());
        }
        (se &&
          A.nodes.has(e.id) &&
          (n.beginPath(),
          n.arc(e.x, e.y, i + 2, 0, 2 * Math.PI),
          (n.strokeStyle = `rgba(245, 158, 11, 0.65)`),
          (n.lineWidth = 2 / r),
          n.setLineDash([2.5, 2]),
          n.stroke(),
          n.setLineDash([])),
          n.save(),
          n.beginPath(),
          e.is_entry_point
            ? (n.moveTo(e.x, e.y - i),
              n.lineTo(e.x + i, e.y),
              n.lineTo(e.x, e.y + i),
              n.lineTo(e.x - i, e.y),
              n.closePath())
            : n.arc(e.x, e.y, i, 0, 2 * Math.PI, !1));
        let c = n.createRadialGradient(e.x - i * 0.35, e.y - i * 0.35, i * 0.1, e.x, e.y, i);
        (c.addColorStop(0, `#ffffff`),
          c.addColorStop(0.15, o),
          c.addColorStop(0.85, o.replace(/[\d.]+\)$/, `0.9)`)),
          c.addColorStop(1, o.replace(/[\d.]+\)$/, `0.7)`)),
          (n.fillStyle = c),
          n.fill());
        let l = a === e.id,
          u = s === e.id;
        if (
          (l || u
            ? ((n.shadowColor = u ? `#A78BFA` : `#60A5FA`),
              (n.shadowBlur = 12 / r),
              (n.lineWidth = u ? 2.5 / r : 1.5 / r),
              (n.strokeStyle = u ? `#C084FC` : `#93C5FD`),
              n.stroke())
            : ((n.lineWidth = 0.85 / r), (n.strokeStyle = `rgba(255, 255, 255, 0.22)`), n.stroke()),
          n.restore(),
          r > 0.45)
        ) {
          let a = e.file.split(`/`).pop() || e.name,
            o = Math.max(3.5, i * 0.6);
          ((n.font = `500 ${o}px var(--font-mono, monospace)`),
            (n.textAlign = `center`),
            (n.textBaseline = `middle`));
          let s = n.measureText(a).width,
            c = l || u,
            d = e.x - s / 2 - 6,
            f = e.y + i + 5,
            p = s + 12,
            m = o + 3.5 * 2;
          ((n.fillStyle = `rgba(10, 11, 16, 0.72)`),
            n.beginPath(),
            typeof n.roundRect == `function` ? n.roundRect(d, f, p, m, 6) : n.rect(d, f, p, m),
            n.fill(),
            (n.strokeStyle = c ? `rgba(167, 139, 250, 0.75)` : `rgba(255, 255, 255, 0.08)`),
            (n.lineWidth = 0.65 / r),
            n.stroke(),
            (n.fillStyle = c ? `#FFFFFF` : `#E2E8F0`),
            n.fillText(a, e.x, f + m / 2 + 0.2));
        }
      },
      [Ie, ze, a, s, we, A, se, le, j]
    ),
    Ve = (0, l.useCallback)(
      (e, n) => {
        if (O.length === 0) return;
        let r = new Map();
        O.forEach((e) => {
          let n = e.file.split(`/`),
            i = n.length > 1 ? n[0] : `core`;
          (r.has(i) || r.set(i, []), r.get(i).push(e));
        });
        let i = (e) => {
            let n = e.split(``).reduce((e, n) => e + n.charCodeAt(0), 0),
              r = [267, 190, 142, 35, 12, 335];
            return `hsla(${r[n % r.length]}, 70%, 40%, 0.035)`;
          },
          a = (e) => {
            let n = e.split(``).reduce((e, n) => e + n.charCodeAt(0), 0),
              r = [267, 190, 142, 35, 12, 335];
            return `hsla(${r[n % r.length]}, 75%, 55%, 0.09)`;
          };
        (e.save(),
          r.forEach((r, o) => {
            if (r.length < 2) return;
            let s = 1 / 0,
              c = 1 / 0,
              l = -1 / 0,
              u = -1 / 0;
            if (
              (r.forEach((e) => {
                if (
                  !e ||
                  e.x === void 0 ||
                  e.y === void 0 ||
                  e.x === null ||
                  e.y === null ||
                  isNaN(e.x) ||
                  isNaN(e.y) ||
                  !isFinite(e.x) ||
                  !isFinite(e.y)
                )
                  return;
                let n = Ie(e);
                ((s = Math.min(s, e.x - n)),
                  (c = Math.min(c, e.y - n)),
                  (l = Math.max(l, e.x + n)),
                  (u = Math.max(u, e.y + n)));
              }),
              s === 1 / 0 || !isFinite(s) || isNaN(s))
            )
              return;
            let d = s - 28,
              f = c - 28,
              p = l - s + 56,
              m = u - c + 56;
            (e.beginPath(),
              e.roundRect ? e.roundRect(d, f, p, m, 24) : e.rect(d, f, p, m),
              (e.fillStyle = i(o)),
              e.fill(),
              (e.strokeStyle = a(o)),
              (e.lineWidth = 1 / n),
              e.stroke());
            let h = Math.max(9, 12 / n);
            ((e.font = `bold ${h}px var(--font-sans, system-ui)`),
              (e.fillStyle = `rgba(255, 255, 255, 0.25)`),
              e.fillText(o.toUpperCase(), d + 16, f + h + 10));
          }),
          e.restore());
      },
      [O, Ie]
    ),
    He = () => {
      be.current &&
        (document.fullscreenElement
          ? document.exitFullscreen().then(() => h(!1))
          : be.current.requestFullscreen().then(() => h(!0)));
    };
  (0, l.useEffect)(() => {
    let e = () => {
      h(!!document.fullscreenElement);
    };
    return (
      document.addEventListener(`fullscreenchange`, e),
      () => document.removeEventListener(`fullscreenchange`, e)
    );
  }, []);
  let Ue = (e) => {
      D.current && D.current.zoom(D.current.zoom() * e, 300);
    },
    We = () => {
      D.current && D.current.zoomToFit(500, 70);
    },
    Ge = (0, l.useMemo)(() => {
      if (!u) return [];
      let e = u.toLowerCase();
      return O.filter(
        (n) => n.file.toLowerCase().includes(e) || n.module.toLowerCase().includes(e)
      ).slice(0, 5);
    }, [u, O]),
    N = r.findIndex((e) => e.sha === n),
    Ke = (0, l.useMemo)(() => {
      if (r.length === 0 || N === -1) return 0;
      let e = r[0].health_score;
      return r[N].health_score - e;
    }, [r, N]);
  return e
    ? (0, Q.jsxs)(`div`, {
        ref: be,
        className: `relative w-full overflow-hidden transition-all duration-300 ${m ? `fixed inset-0 z-50 h-screen w-screen rounded-none bg-[#07080d]` : `glass-panel rounded-[32px]`}`,
        children: [
          (0, Q.jsxs)(`div`, {
            className: `flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl relative z-30`,
            children: [
              (0, Q.jsxs)(`div`, {
                children: [
                  (0, Q.jsxs)(`div`, {
                    className: `flex items-center gap-2.5`,
                    children: [
                      (0, Q.jsx)(Ff, { className: `w-5 h-5 text-purple-400` }),
                      (0, Q.jsx)(`h2`, {
                        className: `font-head text-[18px] font-semibold text-white tracking-tight`,
                        children: `Software Knowledge Graph`,
                      }),
                    ],
                  }),
                  (0, Q.jsxs)(`div`, {
                    className: `flex items-center gap-2 mt-1`,
                    children: [
                      (0, Q.jsx)(`span`, {
                        className: `w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse`,
                      }),
                      (0, Q.jsxs)(`p`, {
                        className: `text-slate-400 text-xs font-mono truncate`,
                        children: [`COMMIT: `, n?.slice(0, 8) || `HEAD`],
                      }),
                    ],
                  }),
                ],
              }),
              (0, Q.jsxs)(`div`, {
                className: `flex flex-wrap items-center gap-3 w-full md:w-auto`,
                children: [
                  (0, Q.jsxs)(`div`, {
                    className: `relative w-full md:w-64`,
                    children: [
                      (0, Q.jsxs)(`div`, {
                        className: `relative`,
                        children: [
                          (0, Q.jsx)(`input`, {
                            type: `text`,
                            placeholder: `Search files/imports...`,
                            value: u,
                            onChange: (e) => d(e.target.value),
                            onFocus: () => p(!0),
                            onBlur: () => setTimeout(() => p(!1), 200),
                            className: `w-full pl-9 pr-8 py-2 text-xs bg-white/5 border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors font-mono`,
                          }),
                          (0, Q.jsx)(Vf, {
                            className: `w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5`,
                          }),
                          u &&
                            (0, Q.jsx)(`button`, {
                              onClick: () => d(``),
                              className: `absolute right-3 top-2 text-slate-400 hover:text-white text-xs`,
                              children: `✕`,
                            }),
                        ],
                      }),
                      f &&
                        Ge.length > 0 &&
                        (0, Q.jsx)(`div`, {
                          className: `absolute left-0 right-0 top-full mt-2 glass-panel-bright rounded-[20px] shadow-2xl z-50 py-1.5 max-h-60 overflow-y-auto border border-white/10`,
                          children: Ge.map((e) =>
                            (0, Q.jsxs)(
                              `button`,
                              {
                                onClick: () => Me(e.id),
                                className: `w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white flex items-center justify-between border-b border-white/5 last:border-b-0 font-mono`,
                                children: [
                                  (0, Q.jsx)(`span`, {
                                    className: `truncate pr-2`,
                                    children: e.file.split(`/`).pop(),
                                  }),
                                  (0, Q.jsx)(`span`, {
                                    className: `text-slate-500 text-[10px] truncate max-w-[120px]`,
                                    children: e.module,
                                  }),
                                ],
                              },
                              e.id
                            )
                          ),
                        }),
                    ],
                  }),
                  (0, Q.jsxs)(`div`, {
                    className: `flex items-center gap-2`,
                    children: [
                      (0, Q.jsx)(`button`, {
                        onClick: () => y(!v),
                        title: `Toggle Filters Panel`,
                        className: `p-2 border rounded-full transition-all duration-300 flex items-center justify-center ${v ? `border-purple-500/40 bg-purple-500/15 text-purple-300` : `border-white/10 text-slate-300 bg-white/5 hover:bg-white/12 hover:text-white`}`,
                        children: (0, Q.jsx)(kf, { className: `w-4 h-4` }),
                      }),
                      (0, Q.jsx)(`button`, {
                        onClick: () => _(!g),
                        title: `Toggle Inspect HUD`,
                        className: `p-2 border rounded-full transition-all duration-300 flex items-center justify-center ${g ? `border-purple-500/40 bg-purple-500/15 text-purple-300` : `border-white/10 text-slate-300 bg-white/5 hover:bg-white/12 hover:text-white`}`,
                        children: (0, Q.jsx)(Pf, { className: `w-4 h-4` }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, Q.jsxs)(`div`, {
            className: `min-h-[580px] h-[calc(100%-80px)] relative overflow-hidden`,
            children: [
              v &&
                (0, Q.jsxs)(`div`, {
                  className: `absolute left-4 top-4 bottom-4 w-72 md:w-64 glass-panel rounded-[24px] p-5 flex-shrink-0 z-[45] flex flex-col justify-between overflow-y-auto max-h-[calc(100%-32px)] border border-white/10 shadow-2xl`,
                  children: [
                    (0, Q.jsxs)(`div`, {
                      className: `space-y-4`,
                      children: [
                        (0, Q.jsx)(`div`, {
                          className: `flex items-center justify-between border-b border-white/10 pb-3`,
                          children: (0, Q.jsxs)(`div`, {
                            className: `flex items-center gap-1.5 p-1 bg-white/5 rounded-xl w-full border border-white/5`,
                            children: [
                              (0, Q.jsxs)(`button`, {
                                type: `button`,
                                onClick: () => x(`filters`),
                                className: `flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${b === `filters` ? `bg-purple-600 text-white shadow-md` : `text-slate-400 hover:text-slate-200`}`,
                                children: [
                                  (0, Q.jsx)(kf, { className: `w-3.5 h-3.5` }),
                                  (0, Q.jsx)(`span`, { children: `Filters` }),
                                ],
                              }),
                              (0, Q.jsxs)(`button`, {
                                type: `button`,
                                onClick: () => x(`tree`),
                                className: `flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${b === `tree` ? `bg-purple-600 text-white shadow-md` : `text-slate-400 hover:text-slate-200`}`,
                                children: [
                                  (0, Q.jsx)(jf, { className: `w-3.5 h-3.5` }),
                                  (0, Q.jsx)(`span`, { children: `File Tree` }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        b === `filters`
                          ? (0, Q.jsxs)(`div`, {
                              className: `space-y-5`,
                              children: [
                                (0, Q.jsxs)(`div`, {
                                  className: `space-y-2.5`,
                                  children: [
                                    (0, Q.jsx)(`label`, {
                                      className: `text-xs text-slate-400 font-medium`,
                                      children: `Edges Display`,
                                    }),
                                    (0, Q.jsxs)(`div`, {
                                      className: `grid grid-cols-2 gap-2`,
                                      children: [
                                        (0, Q.jsxs)(`button`, {
                                          onClick: () => ee(!E),
                                          className: `py-1.5 rounded-full text-[11px] border font-medium flex items-center justify-center gap-1.5 transition-all ${E ? `border-blue-500/40 text-blue-300 bg-blue-500/15` : `border-white/10 text-slate-500 bg-white/5 hover:bg-white/8`}`,
                                          children: [
                                            (0, Q.jsx)(`span`, {
                                              className: `w-2 h-2 rounded-full bg-blue-400`,
                                            }),
                                            `Imports`,
                                          ],
                                        }),
                                        (0, Q.jsxs)(`button`, {
                                          onClick: () => ne(!te),
                                          className: `py-1.5 rounded-full text-[11px] border font-medium flex items-center justify-center gap-1.5 transition-all ${te ? `border-orange-500/40 text-orange-300 bg-orange-500/15` : `border-white/10 text-slate-500 bg-white/5 hover:bg-white/8`}`,
                                          children: [
                                            (0, Q.jsx)(`span`, {
                                              className: `w-2 h-2 rounded-full bg-orange-400`,
                                            }),
                                            `Co-change`,
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, Q.jsxs)(`div`, {
                                  className: `space-y-3`,
                                  children: [
                                    (0, Q.jsxs)(`div`, {
                                      className: `space-y-1.5`,
                                      children: [
                                        (0, Q.jsx)(`label`, {
                                          className: `text-xs text-slate-400 font-medium`,
                                          children: `Module Namespace`,
                                        }),
                                        (0, Q.jsxs)(`select`, {
                                          value: re,
                                          onChange: (e) => ie(e.target.value),
                                          className: `w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/45 cursor-pointer font-mono`,
                                          children: [
                                            (0, Q.jsxs)(`option`, {
                                              value: `all`,
                                              children: [`All Modules (`, O.length, `)`],
                                            }),
                                            Oe.map((e) =>
                                              (0, Q.jsx)(
                                                `option`,
                                                {
                                                  value: e,
                                                  className: `bg-[#181a24] text-white`,
                                                  children: e,
                                                },
                                                e
                                              )
                                            ),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, Q.jsxs)(`div`, {
                                      className: `space-y-1.5`,
                                      children: [
                                        (0, Q.jsx)(`label`, {
                                          className: `text-xs text-slate-400 font-medium`,
                                          children: `Complexity Hotspots`,
                                        }),
                                        (0, Q.jsxs)(`select`, {
                                          value: ae,
                                          onChange: (e) => oe(e.target.value),
                                          className: `w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/45 cursor-pointer`,
                                          children: [
                                            (0, Q.jsx)(`option`, {
                                              value: `all`,
                                              children: `All Risks`,
                                            }),
                                            (0, Q.jsx)(`option`, {
                                              value: `green`,
                                              className: `bg-[#181a24] text-emerald-400`,
                                              children: `Low Risk (Green)`,
                                            }),
                                            (0, Q.jsx)(`option`, {
                                              value: `yellow`,
                                              className: `bg-[#181a24] text-amber-300`,
                                              children: `Moderate (Yellow)`,
                                            }),
                                            (0, Q.jsx)(`option`, {
                                              value: `orange`,
                                              className: `bg-[#181a24] text-orange-400`,
                                              children: `High Risk (Orange)`,
                                            }),
                                            (0, Q.jsx)(`option`, {
                                              value: `red`,
                                              className: `bg-[#181a24] text-rose-400`,
                                              children: `Critical (Red)`,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, Q.jsxs)(`div`, {
                                      className: `space-y-1.5`,
                                      children: [
                                        (0, Q.jsx)(`label`, {
                                          className: `text-xs text-slate-400 font-medium`,
                                          children: `Scale Nodes By`,
                                        }),
                                        (0, Q.jsxs)(`select`, {
                                          value: w,
                                          onChange: (e) => {
                                            let n = e.target.value;
                                            Xf(n) && T(n);
                                          },
                                          className: `w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/45 cursor-pointer`,
                                          children: [
                                            (0, Q.jsx)(`option`, {
                                              value: `loc`,
                                              className: `bg-[#181a24]`,
                                              children: `Complexity (LOC)`,
                                            }),
                                            (0, Q.jsx)(`option`, {
                                              value: `churn`,
                                              className: `bg-[#181a24]`,
                                              children: `Commit Churn`,
                                            }),
                                            (0, Q.jsx)(`option`, {
                                              value: `coupling`,
                                              className: `bg-[#181a24]`,
                                              children: `Coupling Degree`,
                                            }),
                                            (0, Q.jsx)(`option`, {
                                              value: `instability`,
                                              className: `bg-[#181a24]`,
                                              children: `Instability Index`,
                                            }),
                                            (0, Q.jsx)(`option`, {
                                              value: `equal`,
                                              className: `bg-[#181a24]`,
                                              children: `Uniform Size`,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, Q.jsxs)(`div`, {
                                  className: `border-t border-white/5 pt-4 space-y-2`,
                                  children: [
                                    (0, Q.jsxs)(`div`, {
                                      className: `flex items-center gap-2 text-slate-400 text-[11px] uppercase tracking-wider font-semibold`,
                                      children: [
                                        (0, Q.jsx)(Tf, {
                                          className: `w-3.5 h-3.5 text-purple-400`,
                                        }),
                                        (0, Q.jsx)(`span`, { children: `Observability Layer` }),
                                      ],
                                    }),
                                    (0, Q.jsxs)(`button`, {
                                      onClick: () => ce(!se),
                                      className: `w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all duration-300 ${se ? `border-amber-500/40 bg-amber-500/15 text-amber-300` : `border-white/5 bg-white/5 text-slate-300 hover:bg-white/10`}`,
                                      children: [
                                        (0, Q.jsxs)(`div`, {
                                          className: `flex items-center gap-2`,
                                          children: [
                                            (0, Q.jsx)(Wf, { className: `w-4 h-4 text-amber-400` }),
                                            (0, Q.jsx)(`span`, {
                                              className: `text-xs font-medium`,
                                              children: `Cyclic Loops`,
                                            }),
                                          ],
                                        }),
                                        se &&
                                          (0, Q.jsx)(`span`, {
                                            className: `text-[10px] bg-amber-500 text-slate-950 font-mono px-2 py-0.5 rounded-full font-bold`,
                                            children: A.nodes.size,
                                          }),
                                      ],
                                    }),
                                    (0, Q.jsx)(`button`, {
                                      onClick: () => ue(!le),
                                      className: `w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all duration-300 ${le ? `border-red-500/40 bg-red-500/15 text-red-300` : `border-white/5 bg-white/5 text-slate-300 hover:bg-white/10`}`,
                                      children: (0, Q.jsxs)(`div`, {
                                        className: `flex items-center gap-2`,
                                        children: [
                                          (0, Q.jsx)(bf, { className: `w-4 h-4 text-red-400` }),
                                          (0, Q.jsx)(`span`, {
                                            className: `text-xs font-medium`,
                                            children: `Highlight Hotspots`,
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, Q.jsx)(`button`, {
                                      onClick: () => fe(!de),
                                      className: `w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all duration-300 ${de ? `border-emerald-500/40 bg-emerald-500/15 text-emerald-300` : `border-white/5 bg-white/5 text-slate-300 hover:bg-white/10`}`,
                                      children: (0, Q.jsxs)(`div`, {
                                        className: `flex items-center gap-2`,
                                        children: [
                                          (0, Q.jsx)(Hf, { className: `w-4 h-4 text-emerald-400` }),
                                          (0, Q.jsx)(`span`, {
                                            className: `text-xs font-medium`,
                                            children: `Stability Mapping`,
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : (0, Q.jsxs)(`div`, {
                              className: `space-y-3`,
                              children: [
                                (0, Q.jsxs)(`div`, {
                                  className: `flex items-center justify-between text-slate-400 text-[11px] uppercase tracking-wider font-semibold`,
                                  children: [
                                    (0, Q.jsxs)(`div`, {
                                      className: `flex items-center gap-1.5`,
                                      children: [
                                        (0, Q.jsx)(jf, {
                                          className: `w-3.5 h-3.5 text-purple-400`,
                                        }),
                                        (0, Q.jsx)(`span`, { children: `Codebase File Tree` }),
                                      ],
                                    }),
                                    ke.size > 0 &&
                                      (0, Q.jsxs)(`span`, {
                                        className: `text-[10px] text-rose-400 font-mono font-bold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20`,
                                        children: [ke.size, ` Hotspots`],
                                      }),
                                  ],
                                }),
                                (0, Q.jsx)(`p`, {
                                  className: `text-[10px] text-slate-500 leading-relaxed`,
                                  children: `Color-coded by hotspot risk score. Warning icons mark high-risk files. Click to focus in graph.`,
                                }),
                                (0, Q.jsx)(`div`, {
                                  className: `space-y-0.5 max-h-[320px] overflow-y-auto pr-1 border border-white/5 rounded-xl p-2 bg-white/[0.01]`,
                                  children: Ne(Ae),
                                }),
                              ],
                            }),
                      ],
                    }),
                    (0, Q.jsxs)(`div`, {
                      className: `border-t border-white/5 pt-4 space-y-2`,
                      children: [
                        (0, Q.jsx)(`div`, {
                          className: `text-slate-500 text-[10px] uppercase tracking-wider font-semibold`,
                          children: b === `tree` ? `Hotspot Legend` : `Hierarchy Legend`,
                        }),
                        b === `tree`
                          ? (0, Q.jsxs)(`div`, {
                              className: `grid grid-cols-2 gap-x-2 gap-y-2 text-[10px] text-slate-400 font-medium`,
                              children: [
                                (0, Q.jsxs)(`div`, {
                                  className: `flex items-center gap-1.5`,
                                  children: [
                                    (0, Q.jsx)(Wf, { className: `w-3 h-3 text-rose-400` }),
                                    (0, Q.jsx)(`span`, {
                                      className: `text-rose-400`,
                                      children: `Critical (>75)`,
                                    }),
                                  ],
                                }),
                                (0, Q.jsxs)(`div`, {
                                  className: `flex items-center gap-1.5`,
                                  children: [
                                    (0, Q.jsx)(Af, { className: `w-3 h-3 text-orange-400` }),
                                    (0, Q.jsx)(`span`, {
                                      className: `text-orange-400`,
                                      children: `High (>50)`,
                                    }),
                                  ],
                                }),
                                (0, Q.jsxs)(`div`, {
                                  className: `flex items-center gap-1.5`,
                                  children: [
                                    (0, Q.jsx)(`span`, {
                                      className: `w-2 h-2 rounded-full bg-amber-400`,
                                    }),
                                    (0, Q.jsx)(`span`, {
                                      className: `text-amber-300`,
                                      children: `Medium (>25)`,
                                    }),
                                  ],
                                }),
                                (0, Q.jsxs)(`div`, {
                                  className: `flex items-center gap-1.5`,
                                  children: [
                                    (0, Q.jsx)(`span`, {
                                      className: `w-2 h-2 rounded-full bg-emerald-400`,
                                    }),
                                    (0, Q.jsx)(`span`, {
                                      className: `text-emerald-400`,
                                      children: `Low (≤25)`,
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : (0, Q.jsxs)(`div`, {
                              className: `grid grid-cols-2 gap-x-2 gap-y-2 text-[10px] text-slate-400 font-medium`,
                              children: [
                                (0, Q.jsxs)(`div`, {
                                  className: `flex items-center gap-2`,
                                  children: [
                                    (0, Q.jsx)(`span`, {
                                      className: `w-2.5 h-2.5 border border-purple-400 bg-purple-400/20 rotate-45 inline-block`,
                                    }),
                                    (0, Q.jsx)(`span`, { children: `Entrypoint` }),
                                  ],
                                }),
                                (0, Q.jsxs)(`div`, {
                                  className: `flex items-center gap-2`,
                                  children: [
                                    (0, Q.jsx)(`span`, {
                                      className: `w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block`,
                                    }),
                                    (0, Q.jsx)(`span`, { children: `File Node` }),
                                  ],
                                }),
                                (0, Q.jsxs)(`div`, {
                                  className: `flex items-center gap-2 col-span-2`,
                                  children: [
                                    (0, Q.jsx)(`span`, {
                                      className: `w-4 h-0.5 border-t border-dashed border-amber-400 inline-block`,
                                    }),
                                    (0, Q.jsx)(`span`, { children: `Import Cycle Link` }),
                                  ],
                                }),
                              ],
                            }),
                      ],
                    }),
                  ],
                }),
              (0, Q.jsxs)(`div`, {
                ref: ye,
                className: `absolute inset-0 bg-[#07080d]/40`,
                children: [
                  (0, Q.jsxs)(`div`, {
                    className: `absolute top-4 right-4 z-[45] flex flex-col gap-2.5 pointer-events-none items-end`,
                    children: [
                      (0, Q.jsxs)(`div`, {
                        className: `glass-panel rounded-full px-5 py-3 shadow-2xl flex items-center gap-4 text-xs font-medium pointer-events-auto border border-white/10`,
                        children: [
                          (0, Q.jsxs)(`div`, {
                            className: `flex flex-col`,
                            children: [
                              (0, Q.jsx)(`span`, {
                                className: `text-slate-400 text-[9px] uppercase tracking-wider font-semibold`,
                                children: `Active Files`,
                              }),
                              (0, Q.jsx)(`span`, {
                                className: `text-white text-sm font-bold font-mono mt-0.5`,
                                children: O.length,
                              }),
                            ],
                          }),
                          (0, Q.jsx)(`div`, { className: `w-px h-6 bg-white/10` }),
                          (0, Q.jsxs)(`div`, {
                            className: `flex flex-col`,
                            children: [
                              (0, Q.jsx)(`span`, {
                                className: `text-slate-400 text-[9px] uppercase tracking-wider font-semibold`,
                                children: `Dependency Cycles`,
                              }),
                              (0, Q.jsx)(`span`, {
                                className: `text-sm font-bold font-mono mt-0.5 ${A.nodes.size > 0 ? `text-amber-400` : `text-emerald-400`}`,
                                children: A.nodes.size,
                              }),
                            ],
                          }),
                          (0, Q.jsx)(`div`, { className: `w-px h-6 bg-white/10` }),
                          (0, Q.jsxs)(`div`, {
                            className: `flex flex-col`,
                            children: [
                              (0, Q.jsx)(`span`, {
                                className: `text-slate-400 text-[9px] uppercase tracking-wider font-semibold`,
                                children: `Stability Score`,
                              }),
                              (0, Q.jsxs)(`span`, {
                                className: `text-emerald-400 text-sm font-bold font-mono mt-0.5`,
                                children: [Math.round(Pe * 100), `%`],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (s || a) &&
                        (0, Q.jsxs)(`div`, {
                          className: `glass-panel rounded-full px-4 py-2 shadow-2xl text-[10px] font-mono text-slate-300 flex items-center gap-2 pointer-events-auto border border-white/10 animate-float-slow`,
                          children: [
                            (0, Q.jsx)(`span`, {
                              className: `w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse`,
                            }),
                            (0, Q.jsx)(`span`, {
                              className: `text-slate-400 font-sans font-semibold`,
                              children: `Focusing:`,
                            }),
                            (0, Q.jsx)(`span`, {
                              className: `truncate max-w-[150px] text-white`,
                              children: (() => {
                                let e = s || a,
                                  n = O.find((n) => n.id === e);
                                return n ? n.file.split(`/`).pop() : e;
                              })(),
                            }),
                          ],
                        }),
                    ],
                  }),
                  (0, Q.jsxs)(`div`, {
                    className: `absolute bottom-4 left-4 z-[45] flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl`,
                    children: [
                      (0, Q.jsx)(`button`, {
                        onClick: () => Ue(1.3),
                        title: `Zoom In`,
                        className: `p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200`,
                        children: (0, Q.jsx)(Kf, { className: `w-3.5 h-3.5` }),
                      }),
                      (0, Q.jsx)(`button`, {
                        onClick: () => Ue(1 / 1.3),
                        title: `Zoom Out`,
                        className: `p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200`,
                        children: (0, Q.jsx)(qf, { className: `w-3.5 h-3.5` }),
                      }),
                      (0, Q.jsx)(`button`, {
                        onClick: We,
                        title: `Reset Viewport fit`,
                        className: `p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200`,
                        children: (0, Q.jsx)(Bf, { className: `w-3.5 h-3.5` }),
                      }),
                      (0, Q.jsx)(`span`, { className: `w-px h-4 bg-white/10` }),
                      (0, Q.jsx)(`button`, {
                        onClick: He,
                        title: m ? `Exit Fullscreen` : `Fullscreen View`,
                        className: `p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200`,
                        children: m
                          ? (0, Q.jsx)(Lf, { className: `w-3.5 h-3.5` })
                          : (0, Q.jsx)(If, { className: `w-3.5 h-3.5` }),
                      }),
                    ],
                  }),
                  (0, Q.jsx)(mf, {
                    ref: D,
                    width: xe.width,
                    height: xe.height,
                    graphData: Fe,
                    backgroundColor: `rgba(10, 11, 16, 0.3)`,
                    nodeRelSize: 1,
                    nodeVal: Ie,
                    nodeColor: ze,
                    nodeCanvasObject: Be,
                    onRenderFramePre: Ve,
                    linkColor: (e) => {
                      let n = De(e);
                      if (se && A.edges.has(n)) return `rgba(245, 158, 11, 0.75)`;
                      let r = e.type === `import`,
                        i = s || a,
                        o = 0.28;
                      if (i) {
                        let n = $(e.source),
                          r = $(e.target);
                        o = n === i || r === i ? 0.85 : 0.03;
                      }
                      return r ? `rgba(96, 165, 250, ${o})` : `rgba(249, 115, 22, ${o})`;
                    },
                    linkWidth: (e) => {
                      let n = De(e);
                      return se && A.edges.has(n) ? 3 : 1.2 + Math.log(e.weight || 1) * 0.6;
                    },
                    linkDirectionalParticles: (e) => {
                      let n = e,
                        r = De(n),
                        i = s || a;
                      if (i) {
                        let e = $(n.source),
                          r = $(n.target);
                        if (e !== i && r !== i) return 0;
                      }
                      return se && A.edges.has(r) ? 6 : n.type === `import` ? 3 : 0;
                    },
                    linkDirectionalParticleSpeed: (e) =>
                      0.005 + Math.min(e.weight || 1, 10) * 0.001,
                    linkDirectionalParticleWidth: (e) => {
                      let n = De(e);
                      return se && A.edges.has(n) ? 3 : 1.8;
                    },
                    linkDirectionalParticleColor: (e) => {
                      let n = De(e);
                      return se && A.edges.has(n) ? `#F59E0B` : `#60A5FA`;
                    },
                    linkDirectionalArrowLength: (e) => {
                      let n = e,
                        r = s || a;
                      if (r) {
                        let e = $(n.source),
                          i = $(n.target);
                        if (e !== r && i !== r) return 0;
                      }
                      return n.type === `import` ? 4.5 : 0;
                    },
                    linkDirectionalArrowRelPos: 1,
                    onNodeHover: (e) => o(e?.id || null),
                    onNodeClick: (e) => {
                      let n = e;
                      s === n.id ? c(null) : (c(n.id), _(!0));
                    },
                    enableZoomInteraction: !0,
                    enablePanInteraction: !0,
                    minZoom: 0.12,
                    maxZoom: 2.4,
                    cooldownTicks: 160,
                    d3AlphaDecay: 0.018,
                    d3VelocityDecay: 0.28,
                    onEngineStop: Re,
                  }),
                ],
              }),
              g &&
                (0, Q.jsx)(`div`, {
                  className: `absolute right-4 top-4 bottom-4 w-80 glass-panel rounded-[24px] flex flex-col flex-shrink-0 z-[45] overflow-y-auto max-h-[calc(100%-32px)] border border-white/10 shadow-2xl`,
                  children: M
                    ? (0, Q.jsxs)(`div`, {
                        className: `p-5 flex-grow flex flex-col justify-between space-y-6`,
                        children: [
                          (0, Q.jsxs)(`div`, {
                            className: `space-y-5`,
                            children: [
                              (0, Q.jsxs)(`div`, {
                                className: `flex items-start justify-between gap-3`,
                                children: [
                                  (0, Q.jsxs)(`div`, {
                                    className: `min-w-0`,
                                    children: [
                                      (0, Q.jsx)(`span`, {
                                        className: `text-slate-500 font-mono text-[9px] uppercase tracking-wider block`,
                                        children: M.module,
                                      }),
                                      (0, Q.jsx)(`h4`, {
                                        className: `font-head text-[16px] font-semibold text-white truncate mt-0.5`,
                                        children: M.file.split(`/`).pop(),
                                      }),
                                      (0, Q.jsx)(`p`, {
                                        className: `text-slate-500 font-mono text-[9px] break-all select-all mt-1 bg-white/5 p-1.5 rounded-lg border border-white/5`,
                                        children: M.file,
                                      }),
                                    ],
                                  }),
                                  (0, Q.jsx)(`button`, {
                                    onClick: () => {
                                      (c(null), _(!1));
                                    },
                                    className: `text-slate-400 hover:text-white p-1 bg-white/5 rounded-full hover:bg-white/10 flex-shrink-0 transition-colors`,
                                    children: `✕`,
                                  }),
                                ],
                              }),
                              M.isCyclic &&
                                (0, Q.jsxs)(`div`, {
                                  className: `bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-[16px] p-3 flex items-start gap-2.5`,
                                  children: [
                                    (0, Q.jsx)(Wf, {
                                      className: `w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5`,
                                    }),
                                    (0, Q.jsxs)(`div`, {
                                      className: `text-[11px] leading-relaxed`,
                                      children: [
                                        (0, Q.jsx)(`span`, {
                                          className: `font-bold block mb-0.5`,
                                          children: `Circular Loop Node`,
                                        }),
                                        `This component forms part of a bidirectional cycle. Modifying it may create cascade side-effects.`,
                                      ],
                                    }),
                                  ],
                                }),
                              (0, Q.jsxs)(`div`, {
                                className: `grid grid-cols-2 gap-3`,
                                children: [
                                  (0, Q.jsxs)(`div`, {
                                    className: `bg-white/5 border border-white/5 rounded-[16px] p-3`,
                                    children: [
                                      (0, Q.jsx)(`div`, {
                                        className: `text-slate-500 text-[9px] uppercase tracking-wider font-semibold`,
                                        children: `Lines of Code`,
                                      }),
                                      (0, Q.jsx)(`div`, {
                                        className: `font-mono text-base font-bold mt-1 text-white`,
                                        children: M.loc,
                                      }),
                                    ],
                                  }),
                                  (0, Q.jsxs)(`div`, {
                                    className: `bg-white/5 border border-white/5 rounded-[16px] p-3`,
                                    children: [
                                      (0, Q.jsx)(`div`, {
                                        className: `text-slate-500 text-[9px] uppercase tracking-wider font-semibold`,
                                        children: `Complexity Score`,
                                      }),
                                      (0, Q.jsx)(`div`, {
                                        className: `font-mono text-base font-bold mt-1 text-white`,
                                        children: M.health.toFixed(1),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, Q.jsxs)(`div`, {
                                className: `bg-white/5 border border-white/5 rounded-[20px] p-4 space-y-3`,
                                children: [
                                  (0, Q.jsxs)(`div`, {
                                    className: `flex items-center justify-between text-xs`,
                                    children: [
                                      (0, Q.jsx)(`span`, {
                                        className: `font-medium text-slate-300`,
                                        children: `Coupling Profile`,
                                      }),
                                      (0, Q.jsxs)(`span`, {
                                        className: `font-mono text-xs font-bold text-purple-400`,
                                        children: [`I = `, M.instability.toFixed(2)],
                                      }),
                                    ],
                                  }),
                                  (0, Q.jsx)(`div`, {
                                    className: `w-full bg-[#07080d] rounded-full h-1.5 relative overflow-hidden border border-white/5`,
                                    children: (0, Q.jsx)(`div`, {
                                      style: { width: `${M.instability * 100}%` },
                                      className: `bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full transition-all duration-500`,
                                    }),
                                  }),
                                  (0, Q.jsxs)(`div`, {
                                    className: `flex items-center justify-between text-[10px] text-slate-500 font-mono`,
                                    children: [
                                      (0, Q.jsxs)(`span`, { children: [`Inbound (Ca): `, M.ca] }),
                                      (0, Q.jsxs)(`span`, { children: [`Outbound (Ce): `, M.ce] }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, Q.jsxs)(`div`, {
                                className: `space-y-4`,
                                children: [
                                  M.imports.length > 0 &&
                                    (0, Q.jsxs)(`div`, {
                                      className: `space-y-1.5`,
                                      children: [
                                        (0, Q.jsxs)(`div`, {
                                          className: `text-slate-500 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1`,
                                          children: [
                                            (0, Q.jsx)(wf, {
                                              className: `w-3.5 h-3.5 text-purple-400 rotate-90`,
                                            }),
                                            (0, Q.jsxs)(`span`, {
                                              children: [
                                                `Outbound Dependencies (`,
                                                M.imports.length,
                                                `)`,
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, Q.jsx)(`div`, {
                                          className: `max-h-24 overflow-y-auto bg-white/[0.02] border border-white/5 rounded-xl divide-y divide-white/5`,
                                          children: M.imports.map((e) =>
                                            (0, Q.jsx)(
                                              `button`,
                                              {
                                                onClick: () => Me(e),
                                                className: `w-full text-left px-3 py-1.5 text-[11px] text-slate-400 hover:text-white hover:bg-white/5 font-mono truncate transition-all`,
                                                children: e.split(`/`).pop(),
                                              },
                                              e
                                            )
                                          ),
                                        }),
                                      ],
                                    }),
                                  M.importedBy.length > 0 &&
                                    (0, Q.jsxs)(`div`, {
                                      className: `space-y-1.5`,
                                      children: [
                                        (0, Q.jsxs)(`div`, {
                                          className: `text-slate-500 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1`,
                                          children: [
                                            (0, Q.jsx)(wf, {
                                              className: `w-3.5 h-3.5 text-purple-400 rotate-90`,
                                            }),
                                            (0, Q.jsxs)(`span`, {
                                              children: [
                                                `Inbound Dependents (`,
                                                M.importedBy.length,
                                                `)`,
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, Q.jsx)(`div`, {
                                          className: `max-h-24 overflow-y-auto bg-white/[0.02] border border-white/5 rounded-xl divide-y divide-white/5`,
                                          children: M.importedBy.map((e) =>
                                            (0, Q.jsx)(
                                              `button`,
                                              {
                                                onClick: () => Me(e),
                                                className: `w-full text-left px-3 py-1.5 text-[11px] text-slate-400 hover:text-white hover:bg-white/5 font-mono truncate transition-all`,
                                                children: e.split(`/`).pop(),
                                              },
                                              e
                                            )
                                          ),
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          }),
                          (0, Q.jsx)(`div`, {
                            className: `text-[10px] text-slate-500 font-mono border-t border-white/5 pt-4`,
                            children: `Select other nodes inside the spatial graph canvas to inspect their metrics.`,
                          }),
                        ],
                      })
                    : (0, Q.jsxs)(`div`, {
                        className: `p-6 flex-1 flex flex-col items-center justify-center text-center text-slate-500 relative`,
                        children: [
                          (0, Q.jsx)(`button`, {
                            onClick: () => _(!1),
                            className: `absolute right-4 top-4 text-slate-400 hover:text-white p-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors`,
                            children: `✕`,
                          }),
                          (0, Q.jsx)(`div`, {
                            className: `w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4`,
                            children: (0, Q.jsx)(Pf, { className: `w-5 h-5 text-slate-400` }),
                          }),
                          (0, Q.jsx)(`h4`, {
                            className: `font-head text-[13px] font-semibold text-white mb-1.5`,
                            children: `Architectural Inspector`,
                          }),
                          (0, Q.jsx)(`p`, {
                            className: `text-[11px] leading-relaxed px-2 text-slate-400`,
                            children: `Click any software node on the map to display inbound afferent coupling, outbound efferent references, cyclic loops, and file sizes.`,
                          }),
                        ],
                      }),
                }),
            ],
          }),
          r.length > 0 &&
            i &&
            (0, Q.jsxs)(`div`, {
              className: `px-6 py-4 border-t border-white/5 bg-white/[0.02] backdrop-blur-xl relative z-30 flex flex-col md:flex-row items-center justify-between gap-4 select-none`,
              children: [
                (0, Q.jsxs)(`div`, {
                  className: `flex items-center gap-3 w-full md:w-auto`,
                  children: [
                    (0, Q.jsx)(`button`, {
                      onClick: () => me(!pe),
                      className: `w-10 h-10 rounded-full flex items-center justify-center transition-all ${pe ? `bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_rgba(147,51,234,0.35)]` : `bg-white/5 hover:bg-white/10 text-white border border-white/10`}`,
                      children: pe
                        ? (0, Q.jsx)(Rf, { className: `w-4 h-4 fill-white` })
                        : (0, Q.jsx)(zf, { className: `w-4 h-4 fill-white translate-x-0.5` }),
                    }),
                    (0, Q.jsxs)(`div`, {
                      className: `flex items-center gap-1.5`,
                      children: [
                        (0, Q.jsx)(`button`, {
                          disabled: N <= 0,
                          onClick: () => i(r[N - 1]),
                          className: `px-3 py-1.5 border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white rounded-full text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all`,
                          children: `◀ Step`,
                        }),
                        (0, Q.jsx)(`button`, {
                          disabled: N >= r.length - 1,
                          onClick: () => i(r[N + 1]),
                          className: `px-3 py-1.5 border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white rounded-full text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all`,
                          children: `Step ▶`,
                        }),
                      ],
                    }),
                    (0, Q.jsxs)(`div`, {
                      className: `flex items-center gap-1.5 pl-2`,
                      children: [
                        (0, Q.jsx)(`span`, {
                          className: `text-[10px] text-slate-500 uppercase tracking-wider font-semibold`,
                          children: `Speed:`,
                        }),
                        (0, Q.jsxs)(`select`, {
                          value: he,
                          onChange: (e) => ge(Number(e.target.value)),
                          className: `px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-slate-300 focus:outline-none cursor-pointer`,
                          children: [
                            (0, Q.jsx)(`option`, {
                              value: 3e3,
                              className: `bg-[#181a24]`,
                              children: `3s (Slow)`,
                            }),
                            (0, Q.jsx)(`option`, {
                              value: 1500,
                              className: `bg-[#181a24]`,
                              children: `1.5s (Norm)`,
                            }),
                            (0, Q.jsx)(`option`, {
                              value: 800,
                              className: `bg-[#181a24]`,
                              children: `0.8s (Fast)`,
                            }),
                            (0, Q.jsx)(`option`, {
                              value: 400,
                              className: `bg-[#181a24]`,
                              children: `0.4s (Hyper)`,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, Q.jsxs)(`div`, {
                  className: `flex-grow w-full md:mx-6 flex items-center gap-4`,
                  children: [
                    (0, Q.jsx)(`span`, {
                      className: `text-[10px] text-slate-500 font-mono whitespace-nowrap`,
                      children: `START`,
                    }),
                    (0, Q.jsxs)(`div`, {
                      className: `flex-grow relative flex items-center`,
                      children: [
                        (0, Q.jsx)(`input`, {
                          type: `range`,
                          min: 0,
                          max: r.length - 1,
                          value: N === -1 ? 0 : N,
                          onChange: (e) => {
                            i(r[Number(e.target.value)]);
                          },
                          className: `w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500 focus:outline-none`,
                        }),
                        (0, Q.jsxs)(`div`, {
                          style: { left: `${(N / (r.length - 1)) * 100}%` },
                          className: `absolute transform -translate-x-1/2 -top-6 text-[9px] font-mono bg-purple-600 text-white px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none border border-purple-400/20`,
                          children: [`COMMIT #`, N + 1],
                        }),
                      ],
                    }),
                    (0, Q.jsx)(`span`, {
                      className: `text-[10px] text-slate-500 font-mono whitespace-nowrap`,
                      children: `END`,
                    }),
                  ],
                }),
                (0, Q.jsxs)(`div`, {
                  className: `flex items-center gap-3 flex-shrink-0 w-full md:w-auto justify-end`,
                  children: [
                    (0, Q.jsxs)(`div`, {
                      className: `bg-white/5 border border-white/5 rounded-full px-3 py-1.5 flex items-center gap-2`,
                      children: [
                        (0, Q.jsx)(Uf, { className: `w-3.5 h-3.5 text-purple-400` }),
                        (0, Q.jsxs)(`div`, {
                          className: `text-[10px] font-mono`,
                          children: [
                            (0, Q.jsx)(`span`, { className: `text-slate-400`, children: `DRIFT:` }),
                            ` `,
                            (0, Q.jsxs)(`span`, {
                              className: `font-bold ${Ke > 0 ? `text-emerald-400` : Ke < 0 ? `text-rose-400` : `text-slate-400`}`,
                              children: [Ke > 0 ? `+` : ``, Ke.toFixed(1)],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Q.jsxs)(`div`, {
                      className: `bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1.5 flex items-center gap-2 text-purple-300 font-mono text-[11px]`,
                      children: [
                        (0, Q.jsx)(Nf, { className: `w-3.5 h-3.5 text-purple-400` }),
                        (0, Q.jsxs)(`span`, { children: [N + 1, ` / `, r.length] }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
        ],
      })
    : (0, Q.jsxs)(`div`, {
        className: `glass-panel rounded-[32px] w-full min-h-[580px] flex items-center justify-center relative overflow-hidden`,
        children: [
          (0, Q.jsx)(`div`, { className: `absolute inset-0 bg-white/[0.02] animate-pulse` }),
          (0, Q.jsxs)(`div`, {
            className: `flex flex-col items-center gap-5 z-10`,
            children: [
              (0, Q.jsxs)(`div`, {
                className: `relative`,
                children: [
                  (0, Q.jsx)(`div`, {
                    className: `absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse`,
                  }),
                  (0, Q.jsx)(`div`, {
                    className: `w-16 h-16 rounded-full bg-white/5 border border-purple-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(167,139,250,0.15)]`,
                    children: (0, Q.jsx)(Ff, {
                      className: `w-8 h-8 text-purple-400/80 animate-pulse`,
                    }),
                  }),
                ],
              }),
              (0, Q.jsxs)(`div`, {
                className: `flex flex-col items-center gap-1.5`,
                children: [
                  (0, Q.jsx)(`h3`, {
                    className: `text-white font-head text-lg tracking-tight`,
                    children: `Constructing Knowledge Graph`,
                  }),
                  (0, Q.jsx)(`p`, {
                    className: `text-slate-400 font-mono text-[11px] animate-pulse`,
                    children: `Rendering dependency structures and mapping connections...`,
                  }),
                ],
              }),
            ],
          }),
        ],
      });
}
var Qf = {
  anthropic: {
    label: `Claude Sonnet`,
    color: `text-orange-400 bg-orange-950 border-orange-800`,
    dot: `bg-orange-400`,
  },
  gemini: {
    label: `Gemini Flash`,
    color: `text-blue-400 bg-blue-950 border-blue-800`,
    dot: `bg-blue-400`,
  },
  cache: {
    label: `Cached`,
    color: `text-zinc-400 bg-zinc-900 border-zinc-700`,
    dot: `bg-zinc-400`,
  },
};
function $f({ repoId: e, commitSha: n }) {
  let [r, i] = (0, l.useState)(`idle`),
    [o, u] = (0, l.useState)(``),
    [d, f] = (0, l.useState)(null),
    [p, m] = (0, l.useState)(null),
    h = (0, l.useRef)(!0);
  return (
    (0, l.useEffect)(
      () => (
        (h.current = !0),
        i(`idle`),
        u(``),
        f(null),
        m(null),
        () => {
          h.current = !1;
        }
      ),
      [n]
    ),
    (0, Q.jsxs)(`div`, {
      className: `glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col justify-between`,
      children: [
        (0, Q.jsx)(`div`, {
          className: `absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-[#a855f7] via-[#6366f1] to-[#38bdf8] z-20`,
        }),
        (0, Q.jsx)(`div`, {
          className: `absolute -top-12 -left-12 w-48 h-48 bg-[#a855f7]/5 rounded-full blur-[80px] pointer-events-none`,
        }),
        (0, Q.jsxs)(`div`, {
          className: `flex items-center justify-between px-6 py-4 border-b border-white/5 relative z-10`,
          children: [
            (0, Q.jsxs)(`div`, {
              className: `flex items-center gap-2`,
              children: [
                (0, Q.jsx)(s, { className: `w-5 h-5 text-purple-400` }),
                (0, Q.jsx)(`span`, {
                  className: `font-head text-[14px] font-semibold text-white uppercase tracking-wider`,
                  children: `AI Narrative Analyst`,
                }),
              ],
            }),
            (0, Q.jsx)(`span`, {
              className: `text-[10px] text-purple-300 font-mono font-bold bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/15`,
              children: `Claude to Gemini`,
            }),
          ],
        }),
        (0, Q.jsxs)(`div`, {
          className: `px-6 py-6 min-h-[140px] relative z-10`,
          children: [
            r === `idle` &&
              (0, Q.jsxs)(`div`, {
                className: `flex flex-col gap-4`,
                children: [
                  (0, Q.jsxs)(`div`, {
                    className: `flex items-start gap-3`,
                    children: [
                      (0, Q.jsx)(xf, { className: `w-9 h-9 text-slate-500 flex-shrink-0` }),
                      (0, Q.jsxs)(`div`, {
                        children: [
                          (0, Q.jsx)(`h4`, {
                            className: `text-white text-sm font-semibold mb-1`,
                            children: `Generate Intelligence Narrative`,
                          }),
                          (0, Q.jsx)(`p`, {
                            className: `text-slate-400 text-xs leading-relaxed max-w-[480px]`,
                            children: `Request an AI-generated natural language report explaining the architectural health fluctuations, code coupling anomalies, and refactor opportunities.`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, Q.jsx)(`div`, {
                    children: (0, Q.jsx)(`button`, {
                      onClick: async () => {
                        if (!(!n || r === `loading` || r === `streaming`)) {
                          (i(`loading`), u(``), m(null));
                          try {
                            await a(e, n, (e) => {
                              if (h.current) {
                                if (e.error) {
                                  (m(e.error), i(`error`));
                                  return;
                                }
                                (e.token && (i(`streaming`), u((n) => `${n}${e.token}`)),
                                  e.done && (f(e), e.explanation && u(e.explanation), i(`done`)));
                              }
                            });
                          } catch (e) {
                            (m(e instanceof Error ? e.message : `Could not generate explanation.`),
                              i(`error`));
                          }
                        }
                      },
                      disabled: !n,
                      className: `liquid-button px-5 py-2.5 rounded-full text-xs font-semibold text-white tracking-wide transition-all shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 disabled:opacity-40 disabled:cursor-not-allowed`,
                      children: `Compile Intelligence Narrative`,
                    }),
                  }),
                ],
              }),
            r === `loading` &&
              (0, Q.jsxs)(`div`, {
                className: `flex flex-col items-center justify-center py-6 gap-3 text-slate-400`,
                children: [
                  (0, Q.jsx)(bf, { className: `w-6 h-6 text-purple-400 animate-spin` }),
                  (0, Q.jsx)(`p`, {
                    className: `text-xs font-medium animate-pulse`,
                    children: `Consulting codebase knowledge models...`,
                  }),
                ],
              }),
            (r === `streaming` || r === `done`) &&
              (0, Q.jsxs)(`div`, {
                className: `text-slate-200 text-xs leading-relaxed font-sans font-normal whitespace-pre-wrap max-h-[320px] overflow-y-auto pr-2`,
                children: [
                  o,
                  r === `streaming` &&
                    (0, Q.jsx)(`span`, {
                      className: `inline-block w-1.5 h-3.5 bg-purple-400 ml-1 rounded-sm animate-pulse`,
                    }),
                ],
              }),
            r === `error` &&
              (0, Q.jsxs)(`div`, {
                className: `flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 rounded-[20px] p-4 text-xs text-rose-300`,
                children: [
                  (0, Q.jsx)(c, { className: `w-5 h-5 flex-shrink-0 text-rose-400` }),
                  (0, Q.jsxs)(`div`, {
                    children: [
                      (0, Q.jsx)(`p`, {
                        className: `font-bold mb-1`,
                        children: `Narrative Generation Failed`,
                      }),
                      (0, Q.jsx)(`p`, {
                        className: `text-slate-400 leading-relaxed mb-2`,
                        children: p || `Could not compile explanation.`,
                      }),
                      (0, Q.jsx)(`button`, {
                        onClick: () => i(`idle`),
                        className: `underline text-purple-300 font-semibold hover:text-white transition-colors`,
                        children: `Try Again`,
                      }),
                    ],
                  }),
                ],
              }),
          ],
        }),
        d &&
          r === `done` &&
          (0, Q.jsxs)(`div`, {
            className: `flex items-center justify-between px-6 py-3.5 border-t border-white/5 bg-white/[0.01] relative z-10 text-[10px] text-slate-500 font-mono`,
            children: [
              (0, Q.jsxs)(`div`, {
                className: `flex items-center gap-3`,
                children: [
                  d.provider && Qf[d.provider]
                    ? (0, Q.jsxs)(`span`, {
                        className: `inline-flex items-center gap-1.5 px-2 py-1 rounded-md border font-mono font-bold text-[9px] ${Qf[d.provider].color}`,
                        children: [
                          (0, Q.jsx)(`span`, {
                            className: `w-1.5 h-1.5 rounded-full ${Qf[d.provider].dot}`,
                          }),
                          Qf[d.provider].label,
                        ],
                      })
                    : (0, Q.jsx)(`span`, {
                        className: `bg-white/5 px-2 py-1 rounded-md border border-white/10 font-mono font-bold text-[9px]`,
                        children: d.model || `model unavailable`,
                      }),
                  (0, Q.jsxs)(`div`, {
                    className: `flex items-center gap-1.5`,
                    children: [
                      (0, Q.jsx)(Df, { className: `w-3.5 h-3.5 text-emerald-400` }),
                      (0, Q.jsxs)(`span`, {
                        children: [`Cost: $`, d.cost_usd ? d.cost_usd.toFixed(5) : `0.00000`],
                      }),
                    ],
                  }),
                ],
              }),
              (0, Q.jsxs)(`div`, {
                className: `flex items-center gap-3`,
                children: [
                  (0, Q.jsxs)(`span`, {
                    children: [`Tokens: `, (d.tokens_total || 0).toLocaleString()],
                  }),
                  d.cached &&
                    (0, Q.jsx)(`span`, {
                      className: `text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-md font-bold text-[9px] border border-emerald-500/10`,
                      children: `CACHED`,
                    }),
                  d.demo_mode &&
                    (0, Q.jsx)(`span`, {
                      className: `text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded-md font-bold text-[9px] border border-blue-500/10`,
                      children: `DEMO MODE`,
                    }),
                ],
              }),
            ],
          }),
      ],
    })
  );
}
function ep(e) {
  return e >= 85
    ? `excellent`
    : e >= 70
      ? `healthy`
      : e >= 55
        ? `moderate`
        : e >= 40
          ? `warning`
          : e >= 25
            ? `critical`
            : `failing`;
}
function tp(e) {
  return e >= 70
    ? `var(--color-healthy)`
    : e >= 40
      ? `var(--color-warning)`
      : `var(--color-critical)`;
}
function np(e) {
  return e.slice(0, 8);
}
function rp(e) {
  var n,
    r,
    i = ``;
  if (typeof e == `string` || typeof e == `number`) i += e;
  else if (typeof e == `object`)
    if (Array.isArray(e)) {
      var a = e.length;
      for (n = 0; n < a; n++) e[n] && (r = rp(e[n])) && (i && (i += ` `), (i += r));
    } else for (r in e) e[r] && (i && (i += ` `), (i += r));
  return i;
}
function ip() {
  for (var e, n, r = 0, i = ``, a = arguments.length; r < a; r++)
    (e = arguments[r]) && (n = rp(e)) && (i && (i += ` `), (i += n));
  return i;
}
function ap(...e) {
  return ip(e);
}
function op(e) {
  return new Date(e).toLocaleDateString(`en-US`, { month: `short`, day: `numeric` });
}
function sp(e) {
  return (
    (e &&
      e
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ``)
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ``)
        .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, ``)
        .replace(/<[a-zA-Z/!][^>]*>/g, ``)
        .replace(/</g, `&lt;`)
        .replace(/>/g, `&gt;`)
        .trim()) ||
    `No commit message`
  );
}
export {
  gr as A,
  lf as C,
  vd as D,
  yd as E,
  ur as M,
  ar as N,
  La as O,
  Vn as P,
  bf as S,
  xd as T,
  Af as _,
  np as a,
  Tf as b,
  $f as c,
  Wf as d,
  Uf as f,
  Nf as g,
  Ff as h,
  ip as i,
  dr as j,
  Ia as k,
  Zf as l,
  Bf as m,
  op as n,
  tp as o,
  Hf as p,
  sp as r,
  ep as s,
  ap as t,
  Gf as u,
  kf as v,
  bd as w,
  Sf as x,
  Ef as y,
};
