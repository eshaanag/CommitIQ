import {
  a as e,
  c as t,
  i as n,
  l as r,
  n as i,
  o as a,
  s as o,
  t as s,
} from './index-4N9WolXG.js';
import { c, d as l, i as u, l as d, m as f, n as p, o as m, s as h } from './api-O1fETKMF.js';
import { n as g, t as _ } from './ThemeToggle-DHlVmop0.js';
import {
  A as v,
  C as y,
  D as b,
  E as x,
  M as S,
  N as C,
  O as w,
  P as T,
  S as E,
  T as D,
  _ as O,
  a as k,
  b as A,
  c as j,
  d as M,
  f as N,
  g as P,
  h as ee,
  i as F,
  j as te,
  k as ne,
  l as re,
  m as ie,
  n as ae,
  o as I,
  p as oe,
  r as se,
  s as ce,
  t as le,
  u as ue,
  v as de,
  w as fe,
  x as pe,
  y as me,
} from './utils-DWSjchQ-.js';
import { n as he } from './sparkles-B1Azk1yP.js';
import { t as L } from './circle-alert-COlNh2rT.js';
import { t as ge } from './circle-help-B93POH5e.js';
function _e(e, t) {
  t ||= [];
  var n = e ? Math.min(t.length, e.length) : 0,
    r = t.slice(),
    i;
  return function (a) {
    for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
    return r;
  };
}
function ve(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function ye(e, t) {
  var n = t ? t.length : 0,
    r = e ? Math.min(n, e.length) : 0,
    i = Array(r),
    a = Array(n),
    o;
  for (o = 0; o < r; ++o) i[o] = Se(e[o], t[o]);
  for (; o < n; ++o) a[o] = t[o];
  return function (e) {
    for (o = 0; o < r; ++o) a[o] = i[o](e);
    return a;
  };
}
function be(e, t) {
  var n = new Date();
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return (n.setTime(e * (1 - r) + t * r), n);
    }
  );
}
function xe(e, t) {
  var n = {},
    r = {},
    i;
  for (i in ((typeof e != `object` || !e) && (e = {}), (typeof t != `object` || !t) && (t = {}), t))
    i in e ? (n[i] = Se(e[i], t[i])) : (r[i] = t[i]);
  return function (e) {
    for (i in n) r[i] = n[i](e);
    return r;
  };
}
function Se(e, t) {
  var n = typeof t,
    r;
  return t == null || n === `boolean`
    ? C(t)
    : (n === `number`
        ? te
        : n === `string`
          ? (r = T(t))
            ? ((t = r), S)
            : v
          : t instanceof T
            ? S
            : t instanceof Date
              ? be
              : ve(t)
                ? _e
                : Array.isArray(t)
                  ? ye
                  : (typeof t.valueOf != `function` && typeof t.toString != `function`) || isNaN(t)
                    ? xe
                    : te)(e, t);
}
function Ce(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return Math.round(e * (1 - n) + t * n);
    }
  );
}
function we(e, t) {
  t === void 0 && ((t = e), (e = Se));
  for (var n = 0, r = t.length - 1, i = t[0], a = Array(r < 0 ? 0 : r); n < r;)
    a[n] = e(i, (i = t[++n]));
  return function (e) {
    var t = Math.max(0, Math.min(r - 1, Math.floor((e *= r))));
    return a[t](e - t);
  };
}
function Te(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ee(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function De(e) {
  let t, n, r;
  e.length === 2
    ? ((t = e === Te || e === Ee ? e : Oe), (n = e), (r = e))
    : ((t = Te), (n = (t, n) => Te(e(t), n)), (r = (t, n) => e(t) - n));
  function i(e, r, i = 0, a = e.length) {
    if (i < a) {
      if (t(r, r) !== 0) return a;
      do {
        let t = (i + a) >>> 1;
        n(e[t], r) < 0 ? (i = t + 1) : (a = t);
      } while (i < a);
    }
    return i;
  }
  function a(e, r, i = 0, a = e.length) {
    if (i < a) {
      if (t(r, r) !== 0) return a;
      do {
        let t = (i + a) >>> 1;
        n(e[t], r) <= 0 ? (i = t + 1) : (a = t);
      } while (i < a);
    }
    return i;
  }
  function o(e, t, n = 0, a = e.length) {
    let o = i(e, t, n, a - 1);
    return o > n && r(e[o - 1], t) > -r(e[o], t) ? o - 1 : o;
  }
  return { left: i, center: o, right: a };
}
function Oe() {
  return 0;
}
function ke(e) {
  return e === null ? NaN : +e;
}
function* Ae(e, t) {
  if (t === void 0) for (let t of e) t != null && (t = +t) >= t && (yield t);
  else {
    let n = -1;
    for (let r of e) (r = t(r, ++n, e)) != null && (r = +r) >= r && (yield r);
  }
}
var je = De(Te),
  Me = je.right;
(je.left, De(ke).center);
function Ne(e = Te) {
  if (e === Te) return Pe;
  if (typeof e != `function`) throw TypeError(`compare is not a function`);
  return (t, n) => {
    let r = e(t, n);
    return r || r === 0 ? r : (e(n, n) === 0) - (e(t, t) === 0);
  };
}
function Pe(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : +(e > t));
}
var Fe = Math.sqrt(50),
  Ie = Math.sqrt(10),
  Le = Math.sqrt(2);
function Re(e, t, n) {
  let r = (t - e) / Math.max(0, n),
    i = Math.floor(Math.log10(r)),
    a = r / 10 ** i,
    o = a >= Fe ? 10 : a >= Ie ? 5 : a >= Le ? 2 : 1,
    s,
    c,
    l;
  return (
    i < 0
      ? ((l = 10 ** -i / o),
        (s = Math.round(e * l)),
        (c = Math.round(t * l)),
        s / l < e && ++s,
        c / l > t && --c,
        (l = -l))
      : ((l = 10 ** i * o),
        (s = Math.round(e / l)),
        (c = Math.round(t / l)),
        s * l < e && ++s,
        c * l > t && --c),
    c < s && 0.5 <= n && n < 2 ? Re(e, t, n * 2) : [s, c, l]
  );
}
function ze(e, t, n) {
  if (((t = +t), (e = +e), (n = +n), !(n > 0))) return [];
  if (e === t) return [e];
  let r = t < e,
    [i, a, o] = r ? Re(t, e, n) : Re(e, t, n);
  if (!(a >= i)) return [];
  let s = a - i + 1,
    c = Array(s);
  if (r)
    if (o < 0) for (let e = 0; e < s; ++e) c[e] = (a - e) / -o;
    else for (let e = 0; e < s; ++e) c[e] = (a - e) * o;
  else if (o < 0) for (let e = 0; e < s; ++e) c[e] = (i + e) / -o;
  else for (let e = 0; e < s; ++e) c[e] = (i + e) * o;
  return c;
}
function Be(e, t, n) {
  return ((t = +t), (e = +e), (n = +n), Re(e, t, n)[2]);
}
function Ve(e, t, n) {
  ((t = +t), (e = +e), (n = +n));
  let r = t < e,
    i = r ? Be(t, e, n) : Be(e, t, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function He(e, t, n = 0, r = 1 / 0, i) {
  if (
    ((t = Math.floor(t)),
    (n = Math.floor(Math.max(0, n))),
    (r = Math.floor(Math.min(e.length - 1, r))),
    !(n <= t && t <= r))
  )
    return e;
  for (i = i === void 0 ? Pe : Ne(i); r > n;) {
    if (r - n > 600) {
      let a = r - n + 1,
        o = t - n + 1,
        s = Math.log(a),
        c = 0.5 * Math.exp((2 * s) / 3),
        l = 0.5 * Math.sqrt((s * c * (a - c)) / a) * (o - a / 2 < 0 ? -1 : 1),
        u = Math.max(n, Math.floor(t - (o * c) / a + l)),
        d = Math.min(r, Math.floor(t + ((a - o) * c) / a + l));
      He(e, t, u, d, i);
    }
    let a = e[t],
      o = n,
      s = r;
    for (Ue(e, n, t), i(e[r], a) > 0 && Ue(e, n, r); o < s;) {
      for (Ue(e, o, s), ++o, --s; i(e[o], a) < 0;) ++o;
      for (; i(e[s], a) > 0;) --s;
    }
    (i(e[n], a) === 0 ? Ue(e, n, s) : (++s, Ue(e, s, r)),
      s <= t && (n = s + 1),
      t <= s && (r = s - 1));
  }
  return e;
}
function Ue(e, t, n) {
  let r = e[t];
  ((e[t] = e[n]), (e[n] = r));
}
function We(e, t, n) {
  if (((e = Float64Array.from(Ae(e, n))), !(!(r = e.length) || isNaN((t = +t))))) {
    if (t <= 0 || r < 2) return w(e);
    if (t >= 1) return ne(e);
    var r,
      i = (r - 1) * t,
      a = Math.floor(i),
      o = ne(He(e, a).subarray(0, a + 1));
    return o + (w(e.subarray(a + 1)) - o) * (i - a);
  }
}
function Ge(e, t, n = ke) {
  if (!(!(r = e.length) || isNaN((t = +t)))) {
    if (t <= 0 || r < 2) return +n(e[0], 0, e);
    if (t >= 1) return +n(e[r - 1], r - 1, e);
    var r,
      i = (r - 1) * t,
      a = Math.floor(i),
      o = +n(e[a], a, e);
    return o + (+n(e[a + 1], a + 1, e) - o) * (i - a);
  }
}
function Ke(e, t, n) {
  ((e = +e), (t = +t), (n = (i = arguments.length) < 2 ? ((t = e), (e = 0), 1) : i < 3 ? 1 : +n));
  for (var r = -1, i = Math.max(0, Math.ceil((t - e) / n)) | 0, a = Array(i); ++r < i;)
    a[r] = e + r * n;
  return a;
}
function qe() {
  var e = D().unknown(void 0),
    t = e.domain,
    n = e.range,
    r = 0,
    i = 1,
    a,
    o,
    s = !1,
    c = 0,
    l = 0,
    u = 0.5;
  delete e.unknown;
  function d() {
    var e = t().length,
      d = i < r,
      f = d ? i : r,
      p = d ? r : i;
    ((a = (p - f) / Math.max(1, e - c + l * 2)),
      s && (a = Math.floor(a)),
      (f += (p - f - a * (e - c)) * u),
      (o = a * (1 - c)),
      s && ((f = Math.round(f)), (o = Math.round(o))));
    var m = Ke(e).map(function (e) {
      return f + a * e;
    });
    return n(d ? m.reverse() : m);
  }
  return (
    (e.domain = function (e) {
      return arguments.length ? (t(e), d()) : t();
    }),
    (e.range = function (e) {
      return arguments.length ? (([r, i] = e), (r = +r), (i = +i), d()) : [r, i];
    }),
    (e.rangeRound = function (e) {
      return (([r, i] = e), (r = +r), (i = +i), (s = !0), d());
    }),
    (e.bandwidth = function () {
      return o;
    }),
    (e.step = function () {
      return a;
    }),
    (e.round = function (e) {
      return arguments.length ? ((s = !!e), d()) : s;
    }),
    (e.padding = function (e) {
      return arguments.length ? ((c = Math.min(1, (l = +e))), d()) : c;
    }),
    (e.paddingInner = function (e) {
      return arguments.length ? ((c = Math.min(1, e)), d()) : c;
    }),
    (e.paddingOuter = function (e) {
      return arguments.length ? ((l = +e), d()) : l;
    }),
    (e.align = function (e) {
      return arguments.length ? ((u = Math.max(0, Math.min(1, e))), d()) : u;
    }),
    (e.copy = function () {
      return qe(t(), [r, i]).round(s).paddingInner(c).paddingOuter(l).align(u);
    }),
    b.apply(d(), arguments)
  );
}
function Je(e) {
  var t = e.copy;
  return (
    (e.padding = e.paddingOuter),
    delete e.paddingInner,
    delete e.paddingOuter,
    (e.copy = function () {
      return Je(t());
    }),
    e
  );
}
function Ye() {
  return Je(qe.apply(null, arguments).paddingInner(1));
}
function Xe(e) {
  return function () {
    return e;
  };
}
function Ze(e) {
  return +e;
}
var Qe = [0, 1];
function $e(e) {
  return e;
}
function et(e, t) {
  return (t -= e = +e)
    ? function (n) {
        return (n - e) / t;
      }
    : Xe(isNaN(t) ? NaN : 0.5);
}
function tt(e, t) {
  var n;
  return (
    e > t && ((n = e), (e = t), (t = n)),
    function (n) {
      return Math.max(e, Math.min(t, n));
    }
  );
}
function nt(e, t, n) {
  var r = e[0],
    i = e[1],
    a = t[0],
    o = t[1];
  return (
    i < r ? ((r = et(i, r)), (a = n(o, a))) : ((r = et(r, i)), (a = n(a, o))),
    function (e) {
      return a(r(e));
    }
  );
}
function rt(e, t, n) {
  var r = Math.min(e.length, t.length) - 1,
    i = Array(r),
    a = Array(r),
    o = -1;
  for (e[r] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse())); ++o < r;)
    ((i[o] = et(e[o], e[o + 1])), (a[o] = n(t[o], t[o + 1])));
  return function (t) {
    var n = Me(e, t, 1, r) - 1;
    return a[n](i[n](t));
  };
}
function it(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function at() {
  var e = Qe,
    t = Qe,
    n = Se,
    r,
    i,
    a,
    o = $e,
    s,
    c,
    l;
  function u() {
    var n = Math.min(e.length, t.length);
    return (o !== $e && (o = tt(e[0], e[n - 1])), (s = n > 2 ? rt : nt), (c = l = null), d);
  }
  function d(i) {
    return i == null || isNaN((i = +i)) ? a : (c ||= s(e.map(r), t, n))(r(o(i)));
  }
  return (
    (d.invert = function (n) {
      return o(i((l ||= s(t, e.map(r), te))(n)));
    }),
    (d.domain = function (t) {
      return arguments.length ? ((e = Array.from(t, Ze)), u()) : e.slice();
    }),
    (d.range = function (e) {
      return arguments.length ? ((t = Array.from(e)), u()) : t.slice();
    }),
    (d.rangeRound = function (e) {
      return ((t = Array.from(e)), (n = Ce), u());
    }),
    (d.clamp = function (e) {
      return arguments.length ? ((o = e ? !0 : $e), u()) : o !== $e;
    }),
    (d.interpolate = function (e) {
      return arguments.length ? ((n = e), u()) : n;
    }),
    (d.unknown = function (e) {
      return arguments.length ? ((a = e), d) : a;
    }),
    function (e, t) {
      return ((r = e), (i = t), u());
    }
  );
}
function ot() {
  return at()($e, $e);
}
function st(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString(`en`).replace(/,/g, ``)
    : e.toString(10);
}
function ct(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf(`e`),
    r = e.slice(0, n);
  return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function lt(e) {
  return ((e = ct(Math.abs(e))), e ? e[1] : NaN);
}
function ut(e, t) {
  return function (n, r) {
    for (
      var i = n.length, a = [], o = 0, s = e[0], c = 0;
      i > 0 &&
      s > 0 &&
      (c + s + 1 > r && (s = Math.max(1, r - c)),
      a.push(n.substring((i -= s), i + s)),
      !((c += s + 1) > r));
    )
      s = e[(o = (o + 1) % e.length)];
    return a.reverse().join(t);
  };
}
function dt(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (t) {
      return e[+t];
    });
  };
}
var ft = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function pt(e) {
  if (!(t = ft.exec(e))) throw Error(`invalid format: ` + e);
  var t;
  return new mt({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  });
}
pt.prototype = mt.prototype;
function mt(e) {
  ((this.fill = e.fill === void 0 ? ` ` : e.fill + ``),
    (this.align = e.align === void 0 ? `>` : e.align + ``),
    (this.sign = e.sign === void 0 ? `-` : e.sign + ``),
    (this.symbol = e.symbol === void 0 ? `` : e.symbol + ``),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? `` : e.type + ``));
}
mt.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? `0` : ``) +
    (this.width === void 0 ? `` : Math.max(1, this.width | 0)) +
    (this.comma ? `,` : ``) +
    (this.precision === void 0 ? `` : `.` + Math.max(0, this.precision | 0)) +
    (this.trim ? `~` : ``) +
    this.type
  );
};
function ht(e) {
  out: for (var t = e.length, n = 1, r = -1, i; n < t; ++n)
    switch (e[n]) {
      case `.`:
        r = i = n;
        break;
      case `0`:
        (r === 0 && (r = n), (i = n));
        break;
      default:
        if (!+e[n]) break out;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
var gt;
function _t(e, t) {
  var n = ct(e, t);
  if (!n) return ((gt = void 0), e.toPrecision(t));
  var r = n[0],
    i = n[1],
    a = i - (gt = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    o = r.length;
  return a === o
    ? r
    : a > o
      ? r + Array(a - o + 1).join(`0`)
      : a > 0
        ? r.slice(0, a) + `.` + r.slice(a)
        : `0.` + Array(1 - a).join(`0`) + ct(e, Math.max(0, t + a - 1))[0];
}
function vt(e, t) {
  var n = ct(e, t);
  if (!n) return e + ``;
  var r = n[0],
    i = n[1];
  return i < 0
    ? `0.` + Array(-i).join(`0`) + r
    : r.length > i + 1
      ? r.slice(0, i + 1) + `.` + r.slice(i + 1)
      : r + Array(i - r.length + 2).join(`0`);
}
var yt = {
  '%': (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + ``,
  d: st,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => vt(e * 100, t),
  r: vt,
  s: _t,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16),
};
function bt(e) {
  return e;
}
var xt = Array.prototype.map,
  St = [`y`, `z`, `a`, `f`, `p`, `n`, `µ`, `m`, ``, `k`, `M`, `G`, `T`, `P`, `E`, `Z`, `Y`];
function Ct(e) {
  var t =
      e.grouping === void 0 || e.thousands === void 0
        ? bt
        : ut(xt.call(e.grouping, Number), e.thousands + ``),
    n = e.currency === void 0 ? `` : e.currency[0] + ``,
    r = e.currency === void 0 ? `` : e.currency[1] + ``,
    i = e.decimal === void 0 ? `.` : e.decimal + ``,
    a = e.numerals === void 0 ? bt : dt(xt.call(e.numerals, String)),
    o = e.percent === void 0 ? `%` : e.percent + ``,
    s = e.minus === void 0 ? `−` : e.minus + ``,
    c = e.nan === void 0 ? `NaN` : e.nan + ``;
  function l(e, l) {
    e = pt(e);
    var u = e.fill,
      d = e.align,
      f = e.sign,
      p = e.symbol,
      m = e.zero,
      h = e.width,
      g = e.comma,
      _ = e.precision,
      v = e.trim,
      y = e.type;
    (y === `n` ? ((g = !0), (y = `g`)) : yt[y] || (_ === void 0 && (_ = 12), (v = !0), (y = `g`)),
      (m || (u === `0` && d === `=`)) && ((m = !0), (u = `0`), (d = `=`)));
    var b =
        (l && l.prefix !== void 0 ? l.prefix : ``) +
        (p === `$` ? n : p === `#` && /[boxX]/.test(y) ? `0` + y.toLowerCase() : ``),
      x = (p === `$` ? r : /[%p]/.test(y) ? o : ``) + (l && l.suffix !== void 0 ? l.suffix : ``),
      S = yt[y],
      C = /[defgprs%]/.test(y);
    _ =
      _ === void 0
        ? 6
        : /[gprs]/.test(y)
          ? Math.max(1, Math.min(21, _))
          : Math.max(0, Math.min(20, _));
    function w(e) {
      var n = b,
        r = x,
        o,
        l,
        p;
      if (y === `c`) ((r = S(e) + r), (e = ``));
      else {
        e = +e;
        var w = e < 0 || 1 / e < 0;
        if (
          ((e = isNaN(e) ? c : S(Math.abs(e), _)),
          v && (e = ht(e)),
          w && +e == 0 && f !== `+` && (w = !1),
          (n = (w ? (f === `(` ? f : s) : f === `-` || f === `(` ? `` : f) + n),
          (r =
            (y === `s` && !isNaN(e) && gt !== void 0 ? St[8 + gt / 3] : ``) +
            r +
            (w && f === `(` ? `)` : ``)),
          C)
        ) {
          for (o = -1, l = e.length; ++o < l;)
            if (((p = e.charCodeAt(o)), 48 > p || p > 57)) {
              ((r = (p === 46 ? i + e.slice(o + 1) : e.slice(o)) + r), (e = e.slice(0, o)));
              break;
            }
        }
      }
      g && !m && (e = t(e, 1 / 0));
      var T = n.length + e.length + r.length,
        E = T < h ? Array(h - T + 1).join(u) : ``;
      switch ((g && m && ((e = t(E + e, E.length ? h - r.length : 1 / 0)), (E = ``)), d)) {
        case `<`:
          e = n + e + r + E;
          break;
        case `=`:
          e = n + E + e + r;
          break;
        case `^`:
          e = E.slice(0, (T = E.length >> 1)) + n + e + r + E.slice(T);
          break;
        default:
          e = E + n + e + r;
          break;
      }
      return a(e);
    }
    return (
      (w.toString = function () {
        return e + ``;
      }),
      w
    );
  }
  function u(e, t) {
    var n = Math.max(-8, Math.min(8, Math.floor(lt(t) / 3))) * 3,
      r = 10 ** -n,
      i = l(((e = pt(e)), (e.type = `f`), e), { suffix: St[8 + n / 3] });
    return function (e) {
      return i(r * e);
    };
  }
  return { format: l, formatPrefix: u };
}
var wt, Tt, Et;
Dt({ thousands: `,`, grouping: [3], currency: [`$`, ``] });
function Dt(e) {
  return ((wt = Ct(e)), (Tt = wt.format), (Et = wt.formatPrefix), wt);
}
function Ot(e) {
  return Math.max(0, -lt(Math.abs(e)));
}
function kt(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(lt(t) / 3))) * 3 - lt(Math.abs(e)));
}
function At(e, t) {
  return ((e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, lt(t) - lt(e)) + 1);
}
function jt(e, t, n, r) {
  var i = Ve(e, t, n),
    a;
  switch (((r = pt(r ?? `,f`)), r.type)) {
    case `s`:
      var o = Math.max(Math.abs(e), Math.abs(t));
      return (r.precision == null && !isNaN((a = kt(i, o))) && (r.precision = a), Et(r, o));
    case ``:
    case `e`:
    case `g`:
    case `p`:
    case `r`:
      r.precision == null &&
        !isNaN((a = At(i, Math.max(Math.abs(e), Math.abs(t))))) &&
        (r.precision = a - (r.type === `e`));
      break;
    case `f`:
    case `%`:
      r.precision == null && !isNaN((a = Ot(i))) && (r.precision = a - (r.type === `%`) * 2);
      break;
  }
  return Tt(r);
}
function Mt(e) {
  var t = e.domain;
  return (
    (e.ticks = function (e) {
      var n = t();
      return ze(n[0], n[n.length - 1], e ?? 10);
    }),
    (e.tickFormat = function (e, n) {
      var r = t();
      return jt(r[0], r[r.length - 1], e ?? 10, n);
    }),
    (e.nice = function (n) {
      n ??= 10;
      var r = t(),
        i = 0,
        a = r.length - 1,
        o = r[i],
        s = r[a],
        c,
        l,
        u = 10;
      for (s < o && ((l = o), (o = s), (s = l), (l = i), (i = a), (a = l)); u-- > 0;) {
        if (((l = Be(o, s, n)), l === c)) return ((r[i] = o), (r[a] = s), t(r));
        if (l > 0) ((o = Math.floor(o / l) * l), (s = Math.ceil(s / l) * l));
        else if (l < 0) ((o = Math.ceil(o * l) / l), (s = Math.floor(s * l) / l));
        else break;
        c = l;
      }
      return e;
    }),
    e
  );
}
function Nt() {
  var e = ot();
  return (
    (e.copy = function () {
      return it(e, Nt());
    }),
    b.apply(e, arguments),
    Mt(e)
  );
}
function Pt(e) {
  var t;
  function n(e) {
    return e == null || isNaN((e = +e)) ? t : e;
  }
  return (
    (n.invert = n),
    (n.domain = n.range =
      function (t) {
        return arguments.length ? ((e = Array.from(t, Ze)), n) : e.slice();
      }),
    (n.unknown = function (e) {
      return arguments.length ? ((t = e), n) : t;
    }),
    (n.copy = function () {
      return Pt(e).unknown(t);
    }),
    (e = arguments.length ? Array.from(e, Ze) : [0, 1]),
    Mt(n)
  );
}
function Ft(e, t) {
  e = e.slice();
  var n = 0,
    r = e.length - 1,
    i = e[n],
    a = e[r],
    o;
  return (
    a < i && ((o = n), (n = r), (r = o), (o = i), (i = a), (a = o)),
    (e[n] = t.floor(i)),
    (e[r] = t.ceil(a)),
    e
  );
}
function It(e) {
  return Math.log(e);
}
function Lt(e) {
  return Math.exp(e);
}
function Rt(e) {
  return -Math.log(-e);
}
function zt(e) {
  return -Math.exp(-e);
}
function Bt(e) {
  return isFinite(e) ? +(`1e` + e) : e < 0 ? 0 : e;
}
function Vt(e) {
  return e === 10 ? Bt : e === Math.E ? Math.exp : (t) => e ** +t;
}
function Ht(e) {
  return e === Math.E
    ? Math.log
    : (e === 10 && Math.log10) ||
        (e === 2 && Math.log2) ||
        ((e = Math.log(e)), (t) => Math.log(t) / e);
}
function Ut(e) {
  return (t, n) => -e(-t, n);
}
function Wt(e) {
  let t = e(It, Lt),
    n = t.domain,
    r = 10,
    i,
    a;
  function o() {
    return (
      (i = Ht(r)),
      (a = Vt(r)),
      n()[0] < 0 ? ((i = Ut(i)), (a = Ut(a)), e(Rt, zt)) : e(It, Lt),
      t
    );
  }
  return (
    (t.base = function (e) {
      return arguments.length ? ((r = +e), o()) : r;
    }),
    (t.domain = function (e) {
      return arguments.length ? (n(e), o()) : n();
    }),
    (t.ticks = (e) => {
      let t = n(),
        o = t[0],
        s = t[t.length - 1],
        c = s < o;
      c && ([o, s] = [s, o]);
      let l = i(o),
        u = i(s),
        d,
        f,
        p = e == null ? 10 : +e,
        m = [];
      if (!(r % 1) && u - l < p) {
        if (((l = Math.floor(l)), (u = Math.ceil(u)), o > 0)) {
          for (; l <= u; ++l)
            for (d = 1; d < r; ++d)
              if (((f = l < 0 ? d / a(-l) : d * a(l)), !(f < o))) {
                if (f > s) break;
                m.push(f);
              }
        } else
          for (; l <= u; ++l)
            for (d = r - 1; d >= 1; --d)
              if (((f = l > 0 ? d / a(-l) : d * a(l)), !(f < o))) {
                if (f > s) break;
                m.push(f);
              }
        m.length * 2 < p && (m = ze(o, s, p));
      } else m = ze(l, u, Math.min(u - l, p)).map(a);
      return c ? m.reverse() : m;
    }),
    (t.tickFormat = (e, n) => {
      if (
        ((e ??= 10),
        (n ??= r === 10 ? `s` : `,`),
        typeof n != `function` &&
          (!(r % 1) && (n = pt(n)).precision == null && (n.trim = !0), (n = Tt(n))),
        e === 1 / 0)
      )
        return n;
      let o = Math.max(1, (r * e) / t.ticks().length);
      return (e) => {
        let t = e / a(Math.round(i(e)));
        return (t * r < r - 0.5 && (t *= r), t <= o ? n(e) : ``);
      };
    }),
    (t.nice = () =>
      n(Ft(n(), { floor: (e) => a(Math.floor(i(e))), ceil: (e) => a(Math.ceil(i(e))) }))),
    t
  );
}
function Gt() {
  let e = Wt(at()).domain([1, 10]);
  return ((e.copy = () => it(e, Gt()).base(e.base())), b.apply(e, arguments), e);
}
function Kt(e) {
  return function (t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function qt(e) {
  return function (t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function Jt(e) {
  var t = 1,
    n = e(Kt(t), qt(t));
  return (
    (n.constant = function (n) {
      return arguments.length ? e(Kt((t = +n)), qt(t)) : t;
    }),
    Mt(n)
  );
}
function Yt() {
  var e = Jt(at());
  return (
    (e.copy = function () {
      return it(e, Yt()).constant(e.constant());
    }),
    b.apply(e, arguments)
  );
}
function Xt(e) {
  return function (t) {
    return t < 0 ? -((-t) ** +e) : t ** +e;
  };
}
function Zt(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function Qt(e) {
  return e < 0 ? -e * e : e * e;
}
function $t(e) {
  var t = e($e, $e),
    n = 1;
  function r() {
    return n === 1 ? e($e, $e) : n === 0.5 ? e(Zt, Qt) : e(Xt(n), Xt(1 / n));
  }
  return (
    (t.exponent = function (e) {
      return arguments.length ? ((n = +e), r()) : n;
    }),
    Mt(t)
  );
}
function en() {
  var e = $t(at());
  return (
    (e.copy = function () {
      return it(e, en()).exponent(e.exponent());
    }),
    b.apply(e, arguments),
    e
  );
}
function tn() {
  return en.apply(null, arguments).exponent(0.5);
}
function nn(e) {
  return Math.sign(e) * e * e;
}
function rn(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function an() {
  var e = ot(),
    t = [0, 1],
    n = !1,
    r;
  function i(t) {
    var i = rn(e(t));
    return isNaN(i) ? r : n ? Math.round(i) : i;
  }
  return (
    (i.invert = function (t) {
      return e.invert(nn(t));
    }),
    (i.domain = function (t) {
      return arguments.length ? (e.domain(t), i) : e.domain();
    }),
    (i.range = function (n) {
      return arguments.length ? (e.range((t = Array.from(n, Ze)).map(nn)), i) : t.slice();
    }),
    (i.rangeRound = function (e) {
      return i.range(e).round(!0);
    }),
    (i.round = function (e) {
      return arguments.length ? ((n = !!e), i) : n;
    }),
    (i.clamp = function (t) {
      return arguments.length ? (e.clamp(t), i) : e.clamp();
    }),
    (i.unknown = function (e) {
      return arguments.length ? ((r = e), i) : r;
    }),
    (i.copy = function () {
      return an(e.domain(), t).round(n).clamp(e.clamp()).unknown(r);
    }),
    b.apply(i, arguments),
    Mt(i)
  );
}
function on() {
  var e = [],
    t = [],
    n = [],
    r;
  function i() {
    var r = 0,
      i = Math.max(1, t.length);
    for (n = Array(i - 1); ++r < i;) n[r - 1] = Ge(e, r / i);
    return a;
  }
  function a(e) {
    return e == null || isNaN((e = +e)) ? r : t[Me(n, e)];
  }
  return (
    (a.invertExtent = function (r) {
      var i = t.indexOf(r);
      return i < 0 ? [NaN, NaN] : [i > 0 ? n[i - 1] : e[0], i < n.length ? n[i] : e[e.length - 1]];
    }),
    (a.domain = function (t) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let n of t) n != null && !isNaN((n = +n)) && e.push(n);
      return (e.sort(Te), i());
    }),
    (a.range = function (e) {
      return arguments.length ? ((t = Array.from(e)), i()) : t.slice();
    }),
    (a.unknown = function (e) {
      return arguments.length ? ((r = e), a) : r;
    }),
    (a.quantiles = function () {
      return n.slice();
    }),
    (a.copy = function () {
      return on().domain(e).range(t).unknown(r);
    }),
    b.apply(a, arguments)
  );
}
function sn() {
  var e = 0,
    t = 1,
    n = 1,
    r = [0.5],
    i = [0, 1],
    a;
  function o(e) {
    return e != null && e <= e ? i[Me(r, e, 0, n)] : a;
  }
  function s() {
    var i = -1;
    for (r = Array(n); ++i < n;) r[i] = ((i + 1) * t - (i - n) * e) / (n + 1);
    return o;
  }
  return (
    (o.domain = function (n) {
      return arguments.length ? (([e, t] = n), (e = +e), (t = +t), s()) : [e, t];
    }),
    (o.range = function (e) {
      return arguments.length ? ((n = (i = Array.from(e)).length - 1), s()) : i.slice();
    }),
    (o.invertExtent = function (a) {
      var o = i.indexOf(a);
      return o < 0 ? [NaN, NaN] : o < 1 ? [e, r[0]] : o >= n ? [r[n - 1], t] : [r[o - 1], r[o]];
    }),
    (o.unknown = function (e) {
      return (arguments.length && (a = e), o);
    }),
    (o.thresholds = function () {
      return r.slice();
    }),
    (o.copy = function () {
      return sn().domain([e, t]).range(i).unknown(a);
    }),
    b.apply(Mt(o), arguments)
  );
}
function cn() {
  var e = [0.5],
    t = [0, 1],
    n,
    r = 1;
  function i(i) {
    return i != null && i <= i ? t[Me(e, i, 0, r)] : n;
  }
  return (
    (i.domain = function (n) {
      return arguments.length
        ? ((e = Array.from(n)), (r = Math.min(e.length, t.length - 1)), i)
        : e.slice();
    }),
    (i.range = function (n) {
      return arguments.length
        ? ((t = Array.from(n)), (r = Math.min(e.length, t.length - 1)), i)
        : t.slice();
    }),
    (i.invertExtent = function (n) {
      var r = t.indexOf(n);
      return [e[r - 1], e[r]];
    }),
    (i.unknown = function (e) {
      return arguments.length ? ((n = e), i) : n;
    }),
    (i.copy = function () {
      return cn().domain(e).range(t).unknown(n);
    }),
    b.apply(i, arguments)
  );
}
var ln = new Date(),
  un = new Date();
function dn(e, t, n, r) {
  function i(t) {
    return (e((t = arguments.length === 0 ? new Date() : new Date(+t))), t);
  }
  return (
    (i.floor = (t) => (e((t = new Date(+t))), t)),
    (i.ceil = (n) => (e((n = new Date(n - 1))), t(n, 1), e(n), n)),
    (i.round = (e) => {
      let t = i(e),
        n = i.ceil(e);
      return e - t < n - e ? t : n;
    }),
    (i.offset = (e, n) => (t((e = new Date(+e)), n == null ? 1 : Math.floor(n)), e)),
    (i.range = (n, r, a) => {
      let o = [];
      if (((n = i.ceil(n)), (a = a == null ? 1 : Math.floor(a)), !(n < r) || !(a > 0))) return o;
      let s;
      do (o.push((s = new Date(+n))), t(n, a), e(n));
      while (s < n && n < r);
      return o;
    }),
    (i.filter = (n) =>
      dn(
        (t) => {
          if (t >= t) for (; e(t), !n(t);) t.setTime(t - 1);
        },
        (e, r) => {
          if (e >= e)
            if (r < 0) for (; ++r <= 0;) for (; t(e, -1), !n(e););
            else for (; --r >= 0;) for (; t(e, 1), !n(e););
        }
      )),
    n &&
      ((i.count = (t, r) => (ln.setTime(+t), un.setTime(+r), e(ln), e(un), Math.floor(n(ln, un)))),
      (i.every = (e) => (
        (e = Math.floor(e)),
        !isFinite(e) || !(e > 0)
          ? null
          : e > 1
            ? i.filter(r ? (t) => r(t) % e === 0 : (t) => i.count(0, t) % e === 0)
            : i
      ))),
    i
  );
}
var fn = dn(
  () => {},
  (e, t) => {
    e.setTime(+e + t);
  },
  (e, t) => t - e
);
((fn.every = (e) => (
  (e = Math.floor(e)),
  !isFinite(e) || !(e > 0)
    ? null
    : e > 1
      ? dn(
          (t) => {
            t.setTime(Math.floor(t / e) * e);
          },
          (t, n) => {
            t.setTime(+t + n * e);
          },
          (t, n) => (n - t) / e
        )
      : fn
)),
  fn.range);
var pn = 1e3,
  mn = pn * 60,
  hn = mn * 60,
  gn = hn * 24,
  _n = gn * 7,
  vn = gn * 30,
  yn = gn * 365,
  bn = dn(
    (e) => {
      e.setTime(e - e.getMilliseconds());
    },
    (e, t) => {
      e.setTime(+e + t * pn);
    },
    (e, t) => (t - e) / pn,
    (e) => e.getUTCSeconds()
  );
bn.range;
var xn = dn(
  (e) => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * pn);
  },
  (e, t) => {
    e.setTime(+e + t * mn);
  },
  (e, t) => (t - e) / mn,
  (e) => e.getMinutes()
);
xn.range;
var Sn = dn(
  (e) => {
    e.setUTCSeconds(0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * mn);
  },
  (e, t) => (t - e) / mn,
  (e) => e.getUTCMinutes()
);
Sn.range;
var Cn = dn(
  (e) => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * pn - e.getMinutes() * mn);
  },
  (e, t) => {
    e.setTime(+e + t * hn);
  },
  (e, t) => (t - e) / hn,
  (e) => e.getHours()
);
Cn.range;
var wn = dn(
  (e) => {
    e.setUTCMinutes(0, 0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * hn);
  },
  (e, t) => (t - e) / hn,
  (e) => e.getUTCHours()
);
wn.range;
var Tn = dn(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * mn) / gn,
  (e) => e.getDate() - 1
);
Tn.range;
var En = dn(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / gn,
  (e) => e.getUTCDate() - 1
);
En.range;
var Dn = dn(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / gn,
  (e) => Math.floor(e / gn)
);
Dn.range;
function On(e) {
  return dn(
    (t) => {
      (t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)), t.setHours(0, 0, 0, 0));
    },
    (e, t) => {
      e.setDate(e.getDate() + t * 7);
    },
    (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * mn) / _n
  );
}
var kn = On(0),
  An = On(1),
  jn = On(2),
  Mn = On(3),
  Nn = On(4),
  Pn = On(5),
  Fn = On(6);
(kn.range, An.range, jn.range, Mn.range, Nn.range, Pn.range, Fn.range);
function In(e) {
  return dn(
    (t) => {
      (t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)), t.setUTCHours(0, 0, 0, 0));
    },
    (e, t) => {
      e.setUTCDate(e.getUTCDate() + t * 7);
    },
    (e, t) => (t - e) / _n
  );
}
var Ln = In(0),
  Rn = In(1),
  zn = In(2),
  Bn = In(3),
  Vn = In(4),
  Hn = In(5),
  Un = In(6);
(Ln.range, Rn.range, zn.range, Bn.range, Vn.range, Hn.range, Un.range);
var Wn = dn(
  (e) => {
    (e.setDate(1), e.setHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setMonth(e.getMonth() + t);
  },
  (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12,
  (e) => e.getMonth()
);
Wn.range;
var Gn = dn(
  (e) => {
    (e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setUTCMonth(e.getUTCMonth() + t);
  },
  (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12,
  (e) => e.getUTCMonth()
);
Gn.range;
var Kn = dn(
  (e) => {
    (e.setMonth(0, 1), e.setHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setFullYear(e.getFullYear() + t);
  },
  (e, t) => t.getFullYear() - e.getFullYear(),
  (e) => e.getFullYear()
);
((Kn.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : dn(
        (t) => {
          (t.setFullYear(Math.floor(t.getFullYear() / e) * e),
            t.setMonth(0, 1),
            t.setHours(0, 0, 0, 0));
        },
        (t, n) => {
          t.setFullYear(t.getFullYear() + n * e);
        }
      )),
  Kn.range);
var qn = dn(
  (e) => {
    (e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t);
  },
  (e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
  (e) => e.getUTCFullYear()
);
((qn.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : dn(
        (t) => {
          (t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e),
            t.setUTCMonth(0, 1),
            t.setUTCHours(0, 0, 0, 0));
        },
        (t, n) => {
          t.setUTCFullYear(t.getUTCFullYear() + n * e);
        }
      )),
  qn.range);
function Jn(e, t, n, r, i, a) {
  let o = [
    [bn, 1, pn],
    [bn, 5, 5 * pn],
    [bn, 15, 15 * pn],
    [bn, 30, 30 * pn],
    [a, 1, mn],
    [a, 5, 5 * mn],
    [a, 15, 15 * mn],
    [a, 30, 30 * mn],
    [i, 1, hn],
    [i, 3, 3 * hn],
    [i, 6, 6 * hn],
    [i, 12, 12 * hn],
    [r, 1, gn],
    [r, 2, 2 * gn],
    [n, 1, _n],
    [t, 1, vn],
    [t, 3, 3 * vn],
    [e, 1, yn],
  ];
  function s(e, t, n) {
    let r = t < e;
    r && ([e, t] = [t, e]);
    let i = n && typeof n.range == `function` ? n : c(e, t, n),
      a = i ? i.range(e, +t + 1) : [];
    return r ? a.reverse() : a;
  }
  function c(t, n, r) {
    let i = Math.abs(n - t) / r,
      a = De(([, , e]) => e).right(o, i);
    if (a === o.length) return e.every(Ve(t / yn, n / yn, r));
    if (a === 0) return fn.every(Math.max(Ve(t, n, r), 1));
    let [s, c] = o[i / o[a - 1][2] < o[a][2] / i ? a - 1 : a];
    return s.every(c);
  }
  return [s, c];
}
var [Yn, Xn] = Jn(qn, Gn, Ln, Dn, wn, Sn),
  [Zn, Qn] = Jn(Kn, Wn, kn, Tn, Cn, xn);
function $n(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return (t.setFullYear(e.y), t);
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function er(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return (t.setUTCFullYear(e.y), t);
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function tr(e, t, n) {
  return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function nr(e) {
  var t = e.dateTime,
    n = e.date,
    r = e.time,
    i = e.periods,
    a = e.days,
    o = e.shortDays,
    s = e.months,
    c = e.shortMonths,
    l = cr(i),
    u = lr(i),
    d = cr(a),
    f = lr(a),
    p = cr(o),
    m = lr(o),
    h = cr(s),
    g = lr(s),
    _ = cr(c),
    v = lr(c),
    y = {
      a: N,
      A: P,
      b: ee,
      B: F,
      c: null,
      d: Ar,
      e: Ar,
      f: Fr,
      g: Kr,
      G: Jr,
      H: jr,
      I: Mr,
      j: Nr,
      L: Pr,
      m: Ir,
      M: Lr,
      p: te,
      q: ne,
      Q: _i,
      s: vi,
      S: Rr,
      u: zr,
      U: Br,
      V: Hr,
      w: Ur,
      W: Wr,
      x: null,
      X: null,
      y: Gr,
      Y: qr,
      Z: Yr,
      '%': gi,
    },
    b = {
      a: re,
      A: ie,
      b: ae,
      B: I,
      c: null,
      d: Xr,
      e: Xr,
      f: ti,
      g: fi,
      G: mi,
      H: Zr,
      I: Qr,
      j: $r,
      L: ei,
      m: ni,
      M: ri,
      p: oe,
      q: se,
      Q: _i,
      s: vi,
      S: ii,
      u: ai,
      U: oi,
      V: ci,
      w: li,
      W: ui,
      x: null,
      X: null,
      y: di,
      Y: pi,
      Z: hi,
      '%': gi,
    },
    x = {
      a: E,
      A: D,
      b: O,
      B: k,
      c: A,
      d: br,
      e: br,
      f: Er,
      g: gr,
      G: hr,
      H: Sr,
      I: Sr,
      j: xr,
      L: Tr,
      m: yr,
      M: Cr,
      p: T,
      q: vr,
      Q: Or,
      s: kr,
      S: wr,
      u: dr,
      U: fr,
      V: pr,
      w: ur,
      W: mr,
      x: j,
      X: M,
      y: gr,
      Y: hr,
      Z: _r,
      '%': Dr,
    };
  ((y.x = S(n, y)),
    (y.X = S(r, y)),
    (y.c = S(t, y)),
    (b.x = S(n, b)),
    (b.X = S(r, b)),
    (b.c = S(t, b)));
  function S(e, t) {
    return function (n) {
      var r = [],
        i = -1,
        a = 0,
        o = e.length,
        s,
        c,
        l;
      for (n instanceof Date || (n = new Date(+n)); ++i < o;)
        e.charCodeAt(i) === 37 &&
          (r.push(e.slice(a, i)),
          (c = rr[(s = e.charAt(++i))]) == null ? (c = s === `e` ? ` ` : `0`) : (s = e.charAt(++i)),
          (l = t[s]) && (s = l(n, c)),
          r.push(s),
          (a = i + 1));
      return (r.push(e.slice(a, i)), r.join(``));
    };
  }
  function C(e, t) {
    return function (n) {
      var r = tr(1900, void 0, 1),
        i = w(r, e, (n += ``), 0),
        a,
        o;
      if (i != n.length) return null;
      if (`Q` in r) return new Date(r.Q);
      if (`s` in r) return new Date(r.s * 1e3 + (`L` in r ? r.L : 0));
      if (
        (t && !(`Z` in r) && (r.Z = 0),
        `p` in r && (r.H = (r.H % 12) + r.p * 12),
        r.m === void 0 && (r.m = `q` in r ? r.q : 0),
        `V` in r)
      ) {
        if (r.V < 1 || r.V > 53) return null;
        (`w` in r || (r.w = 1),
          `Z` in r
            ? ((a = er(tr(r.y, 0, 1))),
              (o = a.getUTCDay()),
              (a = o > 4 || o === 0 ? Rn.ceil(a) : Rn(a)),
              (a = En.offset(a, (r.V - 1) * 7)),
              (r.y = a.getUTCFullYear()),
              (r.m = a.getUTCMonth()),
              (r.d = a.getUTCDate() + ((r.w + 6) % 7)))
            : ((a = $n(tr(r.y, 0, 1))),
              (o = a.getDay()),
              (a = o > 4 || o === 0 ? An.ceil(a) : An(a)),
              (a = Tn.offset(a, (r.V - 1) * 7)),
              (r.y = a.getFullYear()),
              (r.m = a.getMonth()),
              (r.d = a.getDate() + ((r.w + 6) % 7))));
      } else
        (`W` in r || `U` in r) &&
          (`w` in r || (r.w = `u` in r ? r.u % 7 : +(`W` in r)),
          (o = `Z` in r ? er(tr(r.y, 0, 1)).getUTCDay() : $n(tr(r.y, 0, 1)).getDay()),
          (r.m = 0),
          (r.d =
            `W` in r ? ((r.w + 6) % 7) + r.W * 7 - ((o + 5) % 7) : r.w + r.U * 7 - ((o + 6) % 7)));
      return `Z` in r ? ((r.H += (r.Z / 100) | 0), (r.M += r.Z % 100), er(r)) : $n(r);
    };
  }
  function w(e, t, n, r) {
    for (var i = 0, a = t.length, o = n.length, s, c; i < a;) {
      if (r >= o) return -1;
      if (((s = t.charCodeAt(i++)), s === 37)) {
        if (((s = t.charAt(i++)), (c = x[s in rr ? t.charAt(i++) : s]), !c || (r = c(e, n, r)) < 0))
          return -1;
      } else if (s != n.charCodeAt(r++)) return -1;
    }
    return r;
  }
  function T(e, t, n) {
    var r = l.exec(t.slice(n));
    return r ? ((e.p = u.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function E(e, t, n) {
    var r = p.exec(t.slice(n));
    return r ? ((e.w = m.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function D(e, t, n) {
    var r = d.exec(t.slice(n));
    return r ? ((e.w = f.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function O(e, t, n) {
    var r = _.exec(t.slice(n));
    return r ? ((e.m = v.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function k(e, t, n) {
    var r = h.exec(t.slice(n));
    return r ? ((e.m = g.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function A(e, n, r) {
    return w(e, t, n, r);
  }
  function j(e, t, r) {
    return w(e, n, t, r);
  }
  function M(e, t, n) {
    return w(e, r, t, n);
  }
  function N(e) {
    return o[e.getDay()];
  }
  function P(e) {
    return a[e.getDay()];
  }
  function ee(e) {
    return c[e.getMonth()];
  }
  function F(e) {
    return s[e.getMonth()];
  }
  function te(e) {
    return i[+(e.getHours() >= 12)];
  }
  function ne(e) {
    return 1 + ~~(e.getMonth() / 3);
  }
  function re(e) {
    return o[e.getUTCDay()];
  }
  function ie(e) {
    return a[e.getUTCDay()];
  }
  function ae(e) {
    return c[e.getUTCMonth()];
  }
  function I(e) {
    return s[e.getUTCMonth()];
  }
  function oe(e) {
    return i[+(e.getUTCHours() >= 12)];
  }
  function se(e) {
    return 1 + ~~(e.getUTCMonth() / 3);
  }
  return {
    format: function (e) {
      var t = S((e += ``), y);
      return (
        (t.toString = function () {
          return e;
        }),
        t
      );
    },
    parse: function (e) {
      var t = C((e += ``), !1);
      return (
        (t.toString = function () {
          return e;
        }),
        t
      );
    },
    utcFormat: function (e) {
      var t = S((e += ``), b);
      return (
        (t.toString = function () {
          return e;
        }),
        t
      );
    },
    utcParse: function (e) {
      var t = C((e += ``), !0);
      return (
        (t.toString = function () {
          return e;
        }),
        t
      );
    },
  };
}
var rr = { '-': ``, _: ` `, 0: `0` },
  ir = /^\s*\d+/,
  ar = /^%/,
  or = /[\\^$*+?|[\]().{}]/g;
function R(e, t, n) {
  var r = e < 0 ? `-` : ``,
    i = (r ? -e : e) + ``,
    a = i.length;
  return r + (a < n ? Array(n - a + 1).join(t) + i : i);
}
function sr(e) {
  return e.replace(or, `\\$&`);
}
function cr(e) {
  return RegExp(`^(?:` + e.map(sr).join(`|`) + `)`, `i`);
}
function lr(e) {
  return new Map(e.map((e, t) => [e.toLowerCase(), t]));
}
function ur(e, t, n) {
  var r = ir.exec(t.slice(n, n + 1));
  return r ? ((e.w = +r[0]), n + r[0].length) : -1;
}
function dr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 1));
  return r ? ((e.u = +r[0]), n + r[0].length) : -1;
}
function fr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 2));
  return r ? ((e.U = +r[0]), n + r[0].length) : -1;
}
function pr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 2));
  return r ? ((e.V = +r[0]), n + r[0].length) : -1;
}
function mr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 2));
  return r ? ((e.W = +r[0]), n + r[0].length) : -1;
}
function hr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 4));
  return r ? ((e.y = +r[0]), n + r[0].length) : -1;
}
function gr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 2));
  return r ? ((e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), n + r[0].length) : -1;
}
function _r(e, t, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return r ? ((e.Z = r[1] ? 0 : -(r[2] + (r[3] || `00`))), n + r[0].length) : -1;
}
function vr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 1));
  return r ? ((e.q = r[0] * 3 - 3), n + r[0].length) : -1;
}
function yr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 2));
  return r ? ((e.m = r[0] - 1), n + r[0].length) : -1;
}
function br(e, t, n) {
  var r = ir.exec(t.slice(n, n + 2));
  return r ? ((e.d = +r[0]), n + r[0].length) : -1;
}
function xr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 3));
  return r ? ((e.m = 0), (e.d = +r[0]), n + r[0].length) : -1;
}
function Sr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 2));
  return r ? ((e.H = +r[0]), n + r[0].length) : -1;
}
function Cr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 2));
  return r ? ((e.M = +r[0]), n + r[0].length) : -1;
}
function wr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 2));
  return r ? ((e.S = +r[0]), n + r[0].length) : -1;
}
function Tr(e, t, n) {
  var r = ir.exec(t.slice(n, n + 3));
  return r ? ((e.L = +r[0]), n + r[0].length) : -1;
}
function Er(e, t, n) {
  var r = ir.exec(t.slice(n, n + 6));
  return r ? ((e.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
}
function Dr(e, t, n) {
  var r = ar.exec(t.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function Or(e, t, n) {
  var r = ir.exec(t.slice(n));
  return r ? ((e.Q = +r[0]), n + r[0].length) : -1;
}
function kr(e, t, n) {
  var r = ir.exec(t.slice(n));
  return r ? ((e.s = +r[0]), n + r[0].length) : -1;
}
function Ar(e, t) {
  return R(e.getDate(), t, 2);
}
function jr(e, t) {
  return R(e.getHours(), t, 2);
}
function Mr(e, t) {
  return R(e.getHours() % 12 || 12, t, 2);
}
function Nr(e, t) {
  return R(1 + Tn.count(Kn(e), e), t, 3);
}
function Pr(e, t) {
  return R(e.getMilliseconds(), t, 3);
}
function Fr(e, t) {
  return Pr(e, t) + `000`;
}
function Ir(e, t) {
  return R(e.getMonth() + 1, t, 2);
}
function Lr(e, t) {
  return R(e.getMinutes(), t, 2);
}
function Rr(e, t) {
  return R(e.getSeconds(), t, 2);
}
function zr(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function Br(e, t) {
  return R(kn.count(Kn(e) - 1, e), t, 2);
}
function Vr(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Nn(e) : Nn.ceil(e);
}
function Hr(e, t) {
  return ((e = Vr(e)), R(Nn.count(Kn(e), e) + (Kn(e).getDay() === 4), t, 2));
}
function Ur(e) {
  return e.getDay();
}
function Wr(e, t) {
  return R(An.count(Kn(e) - 1, e), t, 2);
}
function Gr(e, t) {
  return R(e.getFullYear() % 100, t, 2);
}
function Kr(e, t) {
  return ((e = Vr(e)), R(e.getFullYear() % 100, t, 2));
}
function qr(e, t) {
  return R(e.getFullYear() % 1e4, t, 4);
}
function Jr(e, t) {
  var n = e.getDay();
  return ((e = n >= 4 || n === 0 ? Nn(e) : Nn.ceil(e)), R(e.getFullYear() % 1e4, t, 4));
}
function Yr(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? `-` : ((t *= -1), `+`)) + R((t / 60) | 0, `0`, 2) + R(t % 60, `0`, 2);
}
function Xr(e, t) {
  return R(e.getUTCDate(), t, 2);
}
function Zr(e, t) {
  return R(e.getUTCHours(), t, 2);
}
function Qr(e, t) {
  return R(e.getUTCHours() % 12 || 12, t, 2);
}
function $r(e, t) {
  return R(1 + En.count(qn(e), e), t, 3);
}
function ei(e, t) {
  return R(e.getUTCMilliseconds(), t, 3);
}
function ti(e, t) {
  return ei(e, t) + `000`;
}
function ni(e, t) {
  return R(e.getUTCMonth() + 1, t, 2);
}
function ri(e, t) {
  return R(e.getUTCMinutes(), t, 2);
}
function ii(e, t) {
  return R(e.getUTCSeconds(), t, 2);
}
function ai(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function oi(e, t) {
  return R(Ln.count(qn(e) - 1, e), t, 2);
}
function si(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Vn(e) : Vn.ceil(e);
}
function ci(e, t) {
  return ((e = si(e)), R(Vn.count(qn(e), e) + (qn(e).getUTCDay() === 4), t, 2));
}
function li(e) {
  return e.getUTCDay();
}
function ui(e, t) {
  return R(Rn.count(qn(e) - 1, e), t, 2);
}
function di(e, t) {
  return R(e.getUTCFullYear() % 100, t, 2);
}
function fi(e, t) {
  return ((e = si(e)), R(e.getUTCFullYear() % 100, t, 2));
}
function pi(e, t) {
  return R(e.getUTCFullYear() % 1e4, t, 4);
}
function mi(e, t) {
  var n = e.getUTCDay();
  return ((e = n >= 4 || n === 0 ? Vn(e) : Vn.ceil(e)), R(e.getUTCFullYear() % 1e4, t, 4));
}
function hi() {
  return `+0000`;
}
function gi() {
  return `%`;
}
function _i(e) {
  return +e;
}
function vi(e) {
  return Math.floor(e / 1e3);
}
var yi, bi, xi;
Si({
  dateTime: `%x, %X`,
  date: `%-m/%-d/%Y`,
  time: `%-I:%M:%S %p`,
  periods: [`AM`, `PM`],
  days: [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`],
  shortDays: [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`],
  months: [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ],
  shortMonths: [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`],
});
function Si(e) {
  return ((yi = nr(e)), (bi = yi.format), yi.parse, (xi = yi.utcFormat), yi.utcParse, yi);
}
function Ci(e) {
  return new Date(e);
}
function wi(e) {
  return e instanceof Date ? +e : +new Date(+e);
}
function Ti(e, t, n, r, i, a, o, s, c, l) {
  var u = ot(),
    d = u.invert,
    f = u.domain,
    p = l(`.%L`),
    m = l(`:%S`),
    h = l(`%I:%M`),
    g = l(`%I %p`),
    _ = l(`%a %d`),
    v = l(`%b %d`),
    y = l(`%B`),
    b = l(`%Y`);
  function x(e) {
    return (
      c(e) < e
        ? p
        : s(e) < e
          ? m
          : o(e) < e
            ? h
            : a(e) < e
              ? g
              : r(e) < e
                ? i(e) < e
                  ? _
                  : v
                : n(e) < e
                  ? y
                  : b
    )(e);
  }
  return (
    (u.invert = function (e) {
      return new Date(d(e));
    }),
    (u.domain = function (e) {
      return arguments.length ? f(Array.from(e, wi)) : f().map(Ci);
    }),
    (u.ticks = function (t) {
      var n = f();
      return e(n[0], n[n.length - 1], t ?? 10);
    }),
    (u.tickFormat = function (e, t) {
      return t == null ? x : l(t);
    }),
    (u.nice = function (e) {
      var n = f();
      return (
        (!e || typeof e.range != `function`) && (e = t(n[0], n[n.length - 1], e ?? 10)),
        e ? f(Ft(n, e)) : u
      );
    }),
    (u.copy = function () {
      return it(u, Ti(e, t, n, r, i, a, o, s, c, l));
    }),
    u
  );
}
function Ei() {
  return b.apply(
    Ti(Zn, Qn, Kn, Wn, kn, Tn, Cn, xn, bn, bi).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]),
    arguments
  );
}
function Di() {
  return b.apply(
    Ti(Yn, Xn, qn, Gn, Ln, En, wn, Sn, bn, xi).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]),
    arguments
  );
}
function Oi() {
  var e = 0,
    t = 1,
    n,
    r,
    i,
    a,
    o = $e,
    s = !1,
    c;
  function l(e) {
    return e == null || isNaN((e = +e))
      ? c
      : o(i === 0 ? 0.5 : ((e = (a(e) - n) * i), s ? Math.max(0, Math.min(1, e)) : e));
  }
  ((l.domain = function (o) {
    return arguments.length
      ? (([e, t] = o), (n = a((e = +e))), (r = a((t = +t))), (i = n === r ? 0 : 1 / (r - n)), l)
      : [e, t];
  }),
    (l.clamp = function (e) {
      return arguments.length ? ((s = !!e), l) : s;
    }),
    (l.interpolator = function (e) {
      return arguments.length ? ((o = e), l) : o;
    }));
  function u(e) {
    return function (t) {
      var n, r;
      return arguments.length ? (([n, r] = t), (o = e(n, r)), l) : [o(0), o(1)];
    };
  }
  return (
    (l.range = u(Se)),
    (l.rangeRound = u(Ce)),
    (l.unknown = function (e) {
      return arguments.length ? ((c = e), l) : c;
    }),
    function (o) {
      return ((a = o), (n = o(e)), (r = o(t)), (i = n === r ? 0 : 1 / (r - n)), l);
    }
  );
}
function ki(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function Ai() {
  var e = Mt(Oi()($e));
  return (
    (e.copy = function () {
      return ki(e, Ai());
    }),
    x.apply(e, arguments)
  );
}
function ji() {
  var e = Wt(Oi()).domain([1, 10]);
  return (
    (e.copy = function () {
      return ki(e, ji()).base(e.base());
    }),
    x.apply(e, arguments)
  );
}
function Mi() {
  var e = Jt(Oi());
  return (
    (e.copy = function () {
      return ki(e, Mi()).constant(e.constant());
    }),
    x.apply(e, arguments)
  );
}
function Ni() {
  var e = $t(Oi());
  return (
    (e.copy = function () {
      return ki(e, Ni()).exponent(e.exponent());
    }),
    x.apply(e, arguments)
  );
}
function Pi() {
  return Ni.apply(null, arguments).exponent(0.5);
}
function Fi() {
  var e = [],
    t = $e;
  function n(n) {
    if (n != null && !isNaN((n = +n))) return t((Me(e, n, 1) - 1) / (e.length - 1));
  }
  return (
    (n.domain = function (t) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let n of t) n != null && !isNaN((n = +n)) && e.push(n);
      return (e.sort(Te), n);
    }),
    (n.interpolator = function (e) {
      return arguments.length ? ((t = e), n) : t;
    }),
    (n.range = function () {
      return e.map((n, r) => t(r / (e.length - 1)));
    }),
    (n.quantiles = function (t) {
      return Array.from({ length: t + 1 }, (n, r) => We(e, r / t));
    }),
    (n.copy = function () {
      return Fi(t).domain(e);
    }),
    x.apply(n, arguments)
  );
}
function Ii() {
  var e = 0,
    t = 0.5,
    n = 1,
    r = 1,
    i,
    a,
    o,
    s,
    c,
    l = $e,
    u,
    d = !1,
    f;
  function p(e) {
    return isNaN((e = +e))
      ? f
      : ((e = 0.5 + ((e = +u(e)) - a) * (r * e < r * a ? s : c)),
        l(d ? Math.max(0, Math.min(1, e)) : e));
  }
  ((p.domain = function (l) {
    return arguments.length
      ? (([e, t, n] = l),
        (i = u((e = +e))),
        (a = u((t = +t))),
        (o = u((n = +n))),
        (s = i === a ? 0 : 0.5 / (a - i)),
        (c = a === o ? 0 : 0.5 / (o - a)),
        (r = a < i ? -1 : 1),
        p)
      : [e, t, n];
  }),
    (p.clamp = function (e) {
      return arguments.length ? ((d = !!e), p) : d;
    }),
    (p.interpolator = function (e) {
      return arguments.length ? ((l = e), p) : l;
    }));
  function m(e) {
    return function (t) {
      var n, r, i;
      return arguments.length ? (([n, r, i] = t), (l = we(e, [n, r, i])), p) : [l(0), l(0.5), l(1)];
    };
  }
  return (
    (p.range = m(Se)),
    (p.rangeRound = m(Ce)),
    (p.unknown = function (e) {
      return arguments.length ? ((f = e), p) : f;
    }),
    function (l) {
      return (
        (u = l),
        (i = l(e)),
        (a = l(t)),
        (o = l(n)),
        (s = i === a ? 0 : 0.5 / (a - i)),
        (c = a === o ? 0 : 0.5 / (o - a)),
        (r = a < i ? -1 : 1),
        p
      );
    }
  );
}
function Li() {
  var e = Mt(Ii()($e));
  return (
    (e.copy = function () {
      return ki(e, Li());
    }),
    x.apply(e, arguments)
  );
}
function Ri() {
  var e = Wt(Ii()).domain([0.1, 1, 10]);
  return (
    (e.copy = function () {
      return ki(e, Ri()).base(e.base());
    }),
    x.apply(e, arguments)
  );
}
function zi() {
  var e = Jt(Ii());
  return (
    (e.copy = function () {
      return ki(e, zi()).constant(e.constant());
    }),
    x.apply(e, arguments)
  );
}
function Bi() {
  var e = $t(Ii());
  return (
    (e.copy = function () {
      return ki(e, Bi()).exponent(e.exponent());
    }),
    x.apply(e, arguments)
  );
}
function Vi() {
  return Bi.apply(null, arguments).exponent(0.5);
}
var Hi = he(`ArrowUp`, [
    [`path`, { d: `m5 12 7-7 7 7`, key: `hav0vg` }],
    [`path`, { d: `M12 19V5`, key: `x0mq9r` }],
  ]),
  Ui = he(`BarChart2`, [
    [`line`, { x1: `18`, x2: `18`, y1: `20`, y2: `10`, key: `1xfpm4` }],
    [`line`, { x1: `12`, x2: `12`, y1: `20`, y2: `4`, key: `be30l9` }],
    [`line`, { x1: `6`, x2: `6`, y1: `20`, y2: `14`, key: `1r4le6` }],
  ]),
  Wi = he(`Clock`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`polyline`, { points: `12 6 12 12 16 14`, key: `68esgv` }],
  ]),
  Gi = he(`ExternalLink`, [
    [`path`, { d: `M15 3h6v6`, key: `1q9fwt` }],
    [`path`, { d: `M10 14 21 3`, key: `gplh6r` }],
    [`path`, { d: `M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`, key: `a6xqqp` }],
  ]),
  Ki = he(`GitBranch`, [
    [`line`, { x1: `6`, x2: `6`, y1: `3`, y2: `15`, key: `17qcm7` }],
    [`circle`, { cx: `18`, cy: `6`, r: `3`, key: `1h7g24` }],
    [`circle`, { cx: `6`, cy: `18`, r: `3`, key: `fqmcym` }],
    [`path`, { d: `M18 9a9 9 0 0 1-9 9`, key: `n2h4wq` }],
  ]),
  qi = he(`Landmark`, [
    [`line`, { x1: `3`, x2: `21`, y1: `22`, y2: `22`, key: `j8o0r` }],
    [`line`, { x1: `6`, x2: `6`, y1: `18`, y2: `11`, key: `10tf0k` }],
    [`line`, { x1: `10`, x2: `10`, y1: `18`, y2: `11`, key: `54lgf6` }],
    [`line`, { x1: `14`, x2: `14`, y1: `18`, y2: `11`, key: `380y` }],
    [`line`, { x1: `18`, x2: `18`, y1: `18`, y2: `11`, key: `1kevvc` }],
    [`polygon`, { points: `12 2 20 7 4 7`, key: `jkujk7` }],
  ]),
  Ji = he(`RotateCcw`, [
    [`path`, { d: `M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`, key: `1357e3` }],
    [`path`, { d: `M3 3v5h5`, key: `1xhq8a` }],
  ]),
  z = r(a()),
  B = s(),
  Yi = {
    critical: `239, 68, 68`,
    high: `245, 158, 11`,
    medium: `96, 165, 250`,
    low: `52, 211, 153`,
  },
  Xi = { critical: 0, high: 1, medium: 2, low: 3 };
function Zi({ modules: e }) {
  let t = [...e].sort((e, t) => Xi[e.risk_level] - Xi[t.risk_level]).slice(0, 20);
  return (0, B.jsxs)(`div`, {
    className: `glass-panel rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col`,
    children: [
      (0, B.jsx)(`div`, {
        className: `absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none`,
      }),
      (0, B.jsx)(`div`, {
        className: `px-6 py-5 border-b border-white/5 relative z-10 flex items-center justify-between gap-3`,
        children: (0, B.jsxs)(`div`, {
          children: [
            (0, B.jsxs)(`div`, {
              className: `flex items-center gap-2`,
              children: [
                (0, B.jsx)(ue, { className: `w-5 h-5 text-purple-400` }),
                (0, B.jsx)(`h2`, {
                  className: `font-head text-[18px] font-semibold text-white tracking-tight`,
                  children: `Bus Factor Index`,
                }),
              ],
            }),
            (0, B.jsx)(`p`, {
              className: `text-slate-400 text-xs mt-1`,
              children: `Contributor concentration distribution per system module`,
            }),
          ],
        }),
      }),
      (0, B.jsx)(`div`, {
        className: `overflow-y-auto relative z-10 flex-grow`,
        style: { height: 420 },
        children:
          t.length === 0
            ? (0, B.jsxs)(`div`, {
                className: `flex flex-col items-center justify-center h-48 text-slate-500 gap-2`,
                children: [
                  (0, B.jsx)(ge, { className: `w-8 h-8 text-slate-600 animate-pulse` }),
                  (0, B.jsx)(`span`, {
                    className: `text-sm font-medium`,
                    children: `No contributor metrics compiled yet`,
                  }),
                ],
              })
            : (0, B.jsx)(`div`, {
                className: `w-full`,
                children: (0, B.jsxs)(`table`, {
                  className: `w-full text-left text-xs min-w-[320px]`,
                  children: [
                    (0, B.jsx)(`thead`, {
                      children: (0, B.jsxs)(`tr`, {
                        className: `border-b border-white/5 text-slate-400 font-semibold uppercase tracking-wider bg-white/[0.01]`,
                        children: [
                          (0, B.jsx)(`th`, {
                            className: `px-5 py-3.5 font-head font-medium text-[10px] text-slate-400`,
                            children: `Module Path`,
                          }),
                          (0, B.jsx)(`th`, {
                            className: `px-5 py-3.5 font-head font-medium text-[10px] text-slate-400 text-center`,
                            children: `Risk Tier`,
                          }),
                          (0, B.jsx)(`th`, {
                            className: `px-5 py-3.5 font-head font-medium text-[10px] text-slate-400 text-center`,
                            children: `Contributors`,
                          }),
                          (0, B.jsx)(`th`, {
                            className: `px-5 py-3.5 font-head font-medium text-[10px] text-slate-400`,
                            children: `Principal Owner`,
                          }),
                        ],
                      }),
                    }),
                    (0, B.jsx)(`tbody`, {
                      className: `divide-y divide-white/5`,
                      children: t.map((e) => {
                        let t = Yi[e.risk_level] || `156, 163, 175`,
                          n = e.risk_level === `critical` || e.risk_level === `high`;
                        return (0, B.jsxs)(
                          `tr`,
                          {
                            className: `hover:bg-white/[0.03] transition-colors group relative`,
                            style: n ? { borderLeft: `2px solid rgb(${t})` } : void 0,
                            children: [
                              (0, B.jsx)(`td`, {
                                className: `px-5 py-3.5 font-mono text-[11px] text-slate-300 max-w-[150px]`,
                                children: (0, B.jsx)(`span`, {
                                  className: `block truncate`,
                                  dir: `rtl`,
                                  title: e.module_path,
                                  children: e.module_path,
                                }),
                              }),
                              (0, B.jsx)(`td`, {
                                className: `px-5 py-3.5 text-center`,
                                children: (0, B.jsxs)(`span`, {
                                  className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border`,
                                  style: {
                                    color: `rgb(${t})`,
                                    backgroundColor: `rgba(${t}, 0.1)`,
                                    borderColor: `rgba(${t}, 0.2)`,
                                  },
                                  children: [
                                    n
                                      ? (0, B.jsx)(M, { className: `w-3 h-3` })
                                      : (0, B.jsx)(oe, { className: `w-3 h-3` }),
                                    e.risk_level,
                                  ],
                                }),
                              }),
                              (0, B.jsx)(`td`, {
                                className: `px-5 py-3.5 text-center font-mono text-xs font-bold text-white`,
                                children: (0, B.jsx)(`span`, {
                                  className: `inline-block px-2 py-0.5 rounded-md bg-white/5 border border-white/5`,
                                  style: { color: `rgb(${t})` },
                                  children: e.contributor_count,
                                }),
                              }),
                              (0, B.jsx)(`td`, {
                                className: `px-5 py-3.5 text-slate-400 truncate max-w-[130px] font-medium group-hover:text-slate-200 transition-colors`,
                                children: e.top_contributor || `Unassigned`,
                              }),
                            ],
                          },
                          e.module_path
                        );
                      }),
                    }),
                  ],
                }),
              }),
      }),
    ],
  });
}
function Qi({ commits: e, repoSlug: t, selectedSha: n, onSelect: r }) {
  let a = [...e].reverse().slice(0, 30);
  return a.length === 0
    ? (0, B.jsxs)(`div`, {
        className: `px-6 py-6 text-slate-500 text-xs font-medium flex flex-col items-center justify-center gap-2`,
        children: [
          (0, B.jsx)(P, { className: `w-6 h-6 text-slate-600 animate-pulse` }),
          (0, B.jsx)(`span`, { children: `No analyzed commits found` }),
        ],
      })
    : (0, B.jsxs)(`div`, {
        className: `flex flex-col h-full space-y-3 relative`,
        children: [
          (0, B.jsxs)(`div`, {
            className: `px-5 flex items-center gap-2`,
            children: [
              (0, B.jsx)(P, { className: `w-4 h-4 text-purple-400` }),
              (0, B.jsx)(`h3`, {
                className: `font-head text-[11px] font-semibold text-slate-400 uppercase tracking-wider`,
                children: `Snapshots Analyzed`,
              }),
            ],
          }),
          (0, B.jsx)(`div`, {
            className: `overflow-y-auto flex-1 max-h-[400px] pr-1 space-y-1.5 scrollbar-thin`,
            children: a.map((e) => {
              let a = n === e.sha,
                o = I(e.health_score);
              return (0, B.jsxs)(
                `div`,
                {
                  className: `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 group relative ${a ? `bg-white/[0.06] border-purple-500/35 shadow-lg shadow-purple-500/5` : `bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10`}`,
                  children: [
                    a &&
                      (0, B.jsx)(`span`, {
                        className: `absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.7)]`,
                      }),
                    (0, B.jsxs)(`button`, {
                      onClick: () => r(e),
                      className: `flex-1 min-w-0 flex items-center gap-3 text-left focus:outline-none`,
                      children: [
                        (0, B.jsx)(`span`, {
                          className: `font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border ${a ? `text-purple-300 bg-purple-500/10 border-purple-500/15` : `text-slate-400 bg-white/5 border-white/5 group-hover:text-slate-300`}`,
                          children: k(e.sha),
                        }),
                        (0, B.jsx)(`span`, {
                          className: `flex-1 text-slate-300 text-xs truncate font-medium group-hover:text-white transition-colors pr-1`,
                          children: se(e.message),
                        }),
                        (0, B.jsx)(`span`, {
                          className: `font-mono text-xs font-extrabold flex-shrink-0 px-2 py-0.5 rounded-md`,
                          style: { color: o, backgroundColor: `${o}12` },
                          children: e.health_score.toFixed(0),
                        }),
                      ],
                    }),
                    (0, B.jsx)(i, {
                      to: `/dashboard/${t}/commit/${e.sha}`,
                      className: `text-purple-400 hover:text-white flex-shrink-0 p-1 bg-white/5 hover:bg-purple-500/15 rounded-lg border border-white/5 hover:border-purple-500/15 transition-all`,
                      title: `Open Focus Snapshot Details`,
                      children: (0, B.jsx)(Gi, { className: `w-3 h-3` }),
                    }),
                  ],
                },
                e.sha
              );
            }),
          }),
        ],
      });
}
function $i({ usage: e, loading: t, error: n }) {
  if (t)
    return (0, B.jsxs)(`div`, {
      className: `flex items-center justify-center p-4 gap-2 text-slate-400 text-xs font-medium`,
      children: [
        (0, B.jsx)(ie, { className: `w-4.5 h-4.5 text-purple-400 animate-spin` }),
        (0, B.jsx)(`span`, { children: `Loading resource metrics...` }),
      ],
    });
  if (n)
    return (0, B.jsxs)(`div`, {
      className: `flex items-center gap-2 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-[20px] text-xs`,
      children: [
        (0, B.jsx)(L, { className: `w-4 h-4 text-rose-400 flex-shrink-0` }),
        (0, B.jsx)(`span`, { children: `Resource metrics offline` }),
      ],
    });
  if (!e)
    return (0, B.jsx)(`div`, {
      className: `text-slate-500 text-xs py-2`,
      children: `No active resource tracking established.`,
    });
  let r = e.max_calls > 0 ? (e.total_calls / e.max_calls) * 100 : 0,
    i = r >= 80;
  return (0, B.jsxs)(`div`, {
    className: `space-y-3 relative`,
    children: [
      (0, B.jsxs)(`div`, {
        className: `flex items-center justify-between`,
        children: [
          (0, B.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              (0, B.jsx)(qi, { className: `w-4 h-4 text-purple-400` }),
              (0, B.jsx)(`span`, {
                className: `font-head text-[11px] font-semibold text-slate-400 uppercase tracking-wider`,
                children: `API Allocation`,
              }),
            ],
          }),
          (0, B.jsxs)(`span`, {
            className: `font-mono text-xs font-bold px-2 py-0.5 rounded-md ${i ? `text-rose-400 bg-rose-500/10 border border-rose-500/10` : `text-slate-300 bg-white/5 border border-white/5`}`,
            children: [e.total_calls, ` / `, e.max_calls],
          }),
        ],
      }),
      (0, B.jsx)(`div`, {
        className: `h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5 p-0.5`,
        children: (0, B.jsx)(`div`, {
          className: `h-full rounded-full transition-all duration-700 ${i ? `bg-gradient-to-r from-rose-500 to-orange-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]` : `bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]`}`,
          style: { width: `${Math.min(r, 100)}%` },
        }),
      }),
      (0, B.jsxs)(`div`, {
        className: `flex justify-between items-center text-[10px] text-slate-500 font-mono`,
        children: [
          (0, B.jsxs)(`span`, { children: [`Spent: $`, e.total_cost_usd.toFixed(4)] }),
          (0, B.jsxs)(`span`, {
            className: `font-semibold text-slate-400`,
            children: [e.budget_remaining, ` calls left`],
          }),
        ],
      }),
      (0, B.jsxs)(`div`, {
        className: `mt-3 space-y-1.5 text-small`,
        children: [
          (0, B.jsxs)(`div`, {
            className: `flex justify-between`,
            children: [
              (0, B.jsx)(`span`, { className: `text-muted`, children: `Claude calls` }),
              (0, B.jsx)(`span`, {
                className: `text-orange-400 font-mono`,
                children: e.anthropic_calls,
              }),
            ],
          }),
          (0, B.jsxs)(`div`, {
            className: `flex justify-between`,
            children: [
              (0, B.jsx)(`span`, { className: `text-muted`, children: `Gemini fallback` }),
              (0, B.jsx)(`span`, {
                className: `text-blue-400 font-mono`,
                children: e.gemini_calls,
              }),
            ],
          }),
          (0, B.jsxs)(`div`, {
            className: `flex justify-between`,
            children: [
              (0, B.jsx)(`span`, { className: `text-muted`, children: `Cache hits` }),
              (0, B.jsx)(`span`, {
                className: `text-emerald-400 font-mono`,
                children: e.cache_hits,
              }),
            ],
          }),
        ],
      }),
      (0, B.jsxs)(`div`, {
        className: `border-t border-border mt-3 pt-3 text-small`,
        children: [
          (0, B.jsxs)(`div`, {
            className: `flex justify-between`,
            children: [
              (0, B.jsx)(`span`, { className: `text-muted`, children: `Cache saved` }),
              (0, B.jsxs)(`span`, {
                className: `text-emerald-400 font-mono`,
                children: [`$`, e.cache_savings_usd.toFixed(4)],
              }),
            ],
          }),
          (0, B.jsxs)(`div`, {
            className: `flex items-center gap-1.5 mt-2`,
            children: [
              (0, B.jsx)(`span`, { className: `w-1.5 h-1.5 rounded-full bg-cyan-400` }),
              (0, B.jsx)(`span`, { className: `text-cyan-400`, children: `GraphCodeBERT` }),
              (0, B.jsx)(`span`, { className: `text-muted`, children: `offline - $0.00` }),
            ],
          }),
        ],
      }),
    ],
  });
}
var ea = o((e, t) => {
    t.exports = Array.isArray;
  }),
  ta = o((e, t) => {
    t.exports = typeof global == `object` && global && global.Object === Object && global;
  }),
  na = o((e, t) => {
    var n = ta(),
      r = typeof self == `object` && self && self.Object === Object && self;
    t.exports = n || r || Function(`return this`)();
  }),
  ra = o((e, t) => {
    t.exports = na().Symbol;
  }),
  ia = o((e, t) => {
    var n = ra(),
      r = Object.prototype,
      i = r.hasOwnProperty,
      a = r.toString,
      o = n ? n.toStringTag : void 0;
    function s(e) {
      var t = i.call(e, o),
        n = e[o];
      try {
        e[o] = void 0;
        var r = !0;
      } catch {}
      var s = a.call(e);
      return (r && (t ? (e[o] = n) : delete e[o]), s);
    }
    t.exports = s;
  }),
  aa = o((e, t) => {
    var n = Object.prototype.toString;
    function r(e) {
      return n.call(e);
    }
    t.exports = r;
  }),
  oa = o((e, t) => {
    var n = ra(),
      r = ia(),
      i = aa(),
      a = `[object Null]`,
      o = `[object Undefined]`,
      s = n ? n.toStringTag : void 0;
    function c(e) {
      return e == null ? (e === void 0 ? o : a) : s && s in Object(e) ? r(e) : i(e);
    }
    t.exports = c;
  }),
  sa = o((e, t) => {
    function n(e) {
      return typeof e == `object` && !!e;
    }
    t.exports = n;
  }),
  ca = o((e, t) => {
    var n = oa(),
      r = sa(),
      i = `[object Symbol]`;
    function a(e) {
      return typeof e == `symbol` || (r(e) && n(e) == i);
    }
    t.exports = a;
  }),
  la = o((e, t) => {
    var n = ea(),
      r = ca(),
      i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      a = /^\w*$/;
    function o(e, t) {
      if (n(e)) return !1;
      var o = typeof e;
      return o == `number` || o == `symbol` || o == `boolean` || e == null || r(e)
        ? !0
        : a.test(e) || !i.test(e) || (t != null && e in Object(t));
    }
    t.exports = o;
  }),
  ua = o((e, t) => {
    function n(e) {
      var t = typeof e;
      return e != null && (t == `object` || t == `function`);
    }
    t.exports = n;
  }),
  da = o((e, t) => {
    var n = oa(),
      r = ua(),
      i = `[object AsyncFunction]`,
      a = `[object Function]`,
      o = `[object GeneratorFunction]`,
      s = `[object Proxy]`;
    function c(e) {
      if (!r(e)) return !1;
      var t = n(e);
      return t == a || t == o || t == i || t == s;
    }
    t.exports = c;
  }),
  fa = o((e, t) => {
    t.exports = na()[`__core-js_shared__`];
  }),
  pa = o((e, t) => {
    var n = fa(),
      r = (function () {
        var e = /[^.]+$/.exec((n && n.keys && n.keys.IE_PROTO) || ``);
        return e ? `Symbol(src)_1.` + e : ``;
      })();
    function i(e) {
      return !!r && r in e;
    }
    t.exports = i;
  }),
  ma = o((e, t) => {
    var n = Function.prototype.toString;
    function r(e) {
      if (e != null) {
        try {
          return n.call(e);
        } catch {}
        try {
          return e + ``;
        } catch {}
      }
      return ``;
    }
    t.exports = r;
  }),
  ha = o((e, t) => {
    var n = da(),
      r = pa(),
      i = ua(),
      a = ma(),
      o = /[\\^$.*+?()[\]{}|]/g,
      s = /^\[object .+?Constructor\]$/,
      c = Function.prototype,
      l = Object.prototype,
      u = c.toString,
      d = l.hasOwnProperty,
      f = RegExp(
        `^` +
          u
            .call(d)
            .replace(o, `\\$&`)
            .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, `$1.*?`) +
          `$`
      );
    function p(e) {
      return !i(e) || r(e) ? !1 : (n(e) ? f : s).test(a(e));
    }
    t.exports = p;
  }),
  ga = o((e, t) => {
    function n(e, t) {
      return e?.[t];
    }
    t.exports = n;
  }),
  _a = o((e, t) => {
    var n = ha(),
      r = ga();
    function i(e, t) {
      var i = r(e, t);
      return n(i) ? i : void 0;
    }
    t.exports = i;
  }),
  va = o((e, t) => {
    t.exports = _a()(Object, `create`);
  }),
  ya = o((e, t) => {
    var n = va();
    function r() {
      ((this.__data__ = n ? n(null) : {}), (this.size = 0));
    }
    t.exports = r;
  }),
  ba = o((e, t) => {
    function n(e) {
      var t = this.has(e) && delete this.__data__[e];
      return ((this.size -= +!!t), t);
    }
    t.exports = n;
  }),
  xa = o((e, t) => {
    var n = va(),
      r = `__lodash_hash_undefined__`,
      i = Object.prototype.hasOwnProperty;
    function a(e) {
      var t = this.__data__;
      if (n) {
        var a = t[e];
        return a === r ? void 0 : a;
      }
      return i.call(t, e) ? t[e] : void 0;
    }
    t.exports = a;
  }),
  Sa = o((e, t) => {
    var n = va(),
      r = Object.prototype.hasOwnProperty;
    function i(e) {
      var t = this.__data__;
      return n ? t[e] !== void 0 : r.call(t, e);
    }
    t.exports = i;
  }),
  Ca = o((e, t) => {
    var n = va(),
      r = `__lodash_hash_undefined__`;
    function i(e, t) {
      var i = this.__data__;
      return ((this.size += +!this.has(e)), (i[e] = n && t === void 0 ? r : t), this);
    }
    t.exports = i;
  }),
  wa = o((e, t) => {
    var n = ya(),
      r = ba(),
      i = xa(),
      a = Sa(),
      o = Ca();
    function s(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n;) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    ((s.prototype.clear = n),
      (s.prototype.delete = r),
      (s.prototype.get = i),
      (s.prototype.has = a),
      (s.prototype.set = o),
      (t.exports = s));
  }),
  Ta = o((e, t) => {
    function n() {
      ((this.__data__ = []), (this.size = 0));
    }
    t.exports = n;
  }),
  Ea = o((e, t) => {
    function n(e, t) {
      return e === t || (e !== e && t !== t);
    }
    t.exports = n;
  }),
  Da = o((e, t) => {
    var n = Ea();
    function r(e, t) {
      for (var r = e.length; r--;) if (n(e[r][0], t)) return r;
      return -1;
    }
    t.exports = r;
  }),
  Oa = o((e, t) => {
    var n = Da(),
      r = Array.prototype.splice;
    function i(e) {
      var t = this.__data__,
        i = n(t, e);
      return i < 0 ? !1 : (i == t.length - 1 ? t.pop() : r.call(t, i, 1), --this.size, !0);
    }
    t.exports = i;
  }),
  ka = o((e, t) => {
    var n = Da();
    function r(e) {
      var t = this.__data__,
        r = n(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    t.exports = r;
  }),
  Aa = o((e, t) => {
    var n = Da();
    function r(e) {
      return n(this.__data__, e) > -1;
    }
    t.exports = r;
  }),
  ja = o((e, t) => {
    var n = Da();
    function r(e, t) {
      var r = this.__data__,
        i = n(r, e);
      return (i < 0 ? (++this.size, r.push([e, t])) : (r[i][1] = t), this);
    }
    t.exports = r;
  }),
  Ma = o((e, t) => {
    var n = Ta(),
      r = Oa(),
      i = ka(),
      a = Aa(),
      o = ja();
    function s(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n;) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    ((s.prototype.clear = n),
      (s.prototype.delete = r),
      (s.prototype.get = i),
      (s.prototype.has = a),
      (s.prototype.set = o),
      (t.exports = s));
  }),
  Na = o((e, t) => {
    t.exports = _a()(na(), `Map`);
  }),
  Pa = o((e, t) => {
    var n = wa(),
      r = Ma(),
      i = Na();
    function a() {
      ((this.size = 0), (this.__data__ = { hash: new n(), map: new (i || r)(), string: new n() }));
    }
    t.exports = a;
  }),
  Fa = o((e, t) => {
    function n(e) {
      var t = typeof e;
      return t == `string` || t == `number` || t == `symbol` || t == `boolean`
        ? e !== `__proto__`
        : e === null;
    }
    t.exports = n;
  }),
  Ia = o((e, t) => {
    var n = Fa();
    function r(e, t) {
      var r = e.__data__;
      return n(t) ? r[typeof t == `string` ? `string` : `hash`] : r.map;
    }
    t.exports = r;
  }),
  La = o((e, t) => {
    var n = Ia();
    function r(e) {
      var t = n(this, e).delete(e);
      return ((this.size -= +!!t), t);
    }
    t.exports = r;
  }),
  Ra = o((e, t) => {
    var n = Ia();
    function r(e) {
      return n(this, e).get(e);
    }
    t.exports = r;
  }),
  za = o((e, t) => {
    var n = Ia();
    function r(e) {
      return n(this, e).has(e);
    }
    t.exports = r;
  }),
  Ba = o((e, t) => {
    var n = Ia();
    function r(e, t) {
      var r = n(this, e),
        i = r.size;
      return (r.set(e, t), (this.size += r.size == i ? 0 : 1), this);
    }
    t.exports = r;
  }),
  Va = o((e, t) => {
    var n = Pa(),
      r = La(),
      i = Ra(),
      a = za(),
      o = Ba();
    function s(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n;) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    ((s.prototype.clear = n),
      (s.prototype.delete = r),
      (s.prototype.get = i),
      (s.prototype.has = a),
      (s.prototype.set = o),
      (t.exports = s));
  }),
  Ha = o((e, t) => {
    var n = Va(),
      r = `Expected a function`;
    function i(e, t) {
      if (typeof e != `function` || (t != null && typeof t != `function`)) throw TypeError(r);
      var a = function () {
        var n = arguments,
          r = t ? t.apply(this, n) : n[0],
          i = a.cache;
        if (i.has(r)) return i.get(r);
        var o = e.apply(this, n);
        return ((a.cache = i.set(r, o) || i), o);
      };
      return ((a.cache = new (i.Cache || n)()), a);
    }
    ((i.Cache = n), (t.exports = i));
  }),
  Ua = o((e, t) => {
    var n = Ha(),
      r = 500;
    function i(e) {
      var t = n(e, function (e) {
          return (i.size === r && i.clear(), e);
        }),
        i = t.cache;
      return t;
    }
    t.exports = i;
  }),
  Wa = o((e, t) => {
    var n = Ua(),
      r =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      i = /\\(\\)?/g;
    t.exports = n(function (e) {
      var t = [];
      return (
        e.charCodeAt(0) === 46 && t.push(``),
        e.replace(r, function (e, n, r, a) {
          t.push(r ? a.replace(i, `$1`) : n || e);
        }),
        t
      );
    });
  }),
  Ga = o((e, t) => {
    function n(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r;) i[n] = t(e[n], n, e);
      return i;
    }
    t.exports = n;
  }),
  Ka = o((e, t) => {
    var n = ra(),
      r = Ga(),
      i = ea(),
      a = ca(),
      o = 1 / 0,
      s = n ? n.prototype : void 0,
      c = s ? s.toString : void 0;
    function l(e) {
      if (typeof e == `string`) return e;
      if (i(e)) return r(e, l) + ``;
      if (a(e)) return c ? c.call(e) : ``;
      var t = e + ``;
      return t == `0` && 1 / e == -o ? `-0` : t;
    }
    t.exports = l;
  }),
  qa = o((e, t) => {
    var n = Ka();
    function r(e) {
      return e == null ? `` : n(e);
    }
    t.exports = r;
  }),
  Ja = o((e, t) => {
    var n = ea(),
      r = la(),
      i = Wa(),
      a = qa();
    function o(e, t) {
      return n(e) ? e : r(e, t) ? [e] : i(a(e));
    }
    t.exports = o;
  }),
  Ya = o((e, t) => {
    var n = ca(),
      r = 1 / 0;
    function i(e) {
      if (typeof e == `string` || n(e)) return e;
      var t = e + ``;
      return t == `0` && 1 / e == -r ? `-0` : t;
    }
    t.exports = i;
  }),
  Xa = o((e, t) => {
    var n = Ja(),
      r = Ya();
    function i(e, t) {
      t = n(t, e);
      for (var i = 0, a = t.length; e != null && i < a;) e = e[r(t[i++])];
      return i && i == a ? e : void 0;
    }
    t.exports = i;
  }),
  Za = o((e, t) => {
    var n = Xa();
    function r(e, t, r) {
      var i = e == null ? void 0 : n(e, t);
      return i === void 0 ? r : i;
    }
    t.exports = r;
  }),
  Qa = o((e, t) => {
    function n(e) {
      return e == null;
    }
    t.exports = n;
  }),
  $a = o((e, t) => {
    var n = oa(),
      r = ea(),
      i = sa(),
      a = `[object String]`;
    function o(e) {
      return typeof e == `string` || (!r(e) && i(e) && n(e) == a);
    }
    t.exports = o;
  }),
  eo = o((e) => {
    var t = typeof Symbol == `function` && Symbol.for,
      n = t ? Symbol.for(`react.element`) : 60103,
      r = t ? Symbol.for(`react.portal`) : 60106,
      i = t ? Symbol.for(`react.fragment`) : 60107,
      a = t ? Symbol.for(`react.strict_mode`) : 60108,
      o = t ? Symbol.for(`react.profiler`) : 60114,
      s = t ? Symbol.for(`react.provider`) : 60109,
      c = t ? Symbol.for(`react.context`) : 60110,
      l = t ? Symbol.for(`react.async_mode`) : 60111,
      u = t ? Symbol.for(`react.concurrent_mode`) : 60111,
      d = t ? Symbol.for(`react.forward_ref`) : 60112,
      f = t ? Symbol.for(`react.suspense`) : 60113,
      p = t ? Symbol.for(`react.memo`) : 60115,
      m = t ? Symbol.for(`react.lazy`) : 60116;
    function h(e) {
      if (typeof e == `object` && e) {
        var t = e.$$typeof;
        switch (t) {
          case n:
            switch (((e = e.type), e)) {
              case l:
              case u:
              case i:
              case o:
              case a:
              case f:
                return e;
              default:
                switch (((e &&= e.$$typeof), e)) {
                  case c:
                  case d:
                  case m:
                  case p:
                  case s:
                    return e;
                  default:
                    return t;
                }
            }
          case r:
            return t;
        }
      }
    }
    ((e.isElement = function (e) {
      return typeof e == `object` && !!e && e.$$typeof === n;
    }),
      (e.isFragment = function (e) {
        return h(e) === i;
      }));
  }),
  to = o((e, t) => {
    t.exports = eo();
  }),
  no = o((e, t) => {
    var n = oa(),
      r = sa(),
      i = `[object Number]`;
    function a(e) {
      return typeof e == `number` || (r(e) && n(e) == i);
    }
    t.exports = a;
  }),
  ro = o((e, t) => {
    var n = no();
    function r(e) {
      return n(e) && e != +e;
    }
    t.exports = r;
  }),
  io = r($a()),
  ao = r(ro()),
  oo = r(Za()),
  so = r(no()),
  co = function (e) {
    return e === 0 ? 0 : e > 0 ? 1 : -1;
  },
  lo = function (e) {
    return (0, io.default)(e) && e.indexOf(`%`) === e.length - 1;
  },
  V = function (e) {
    return (0, so.default)(e) && !(0, ao.default)(e);
  },
  uo = function (e) {
    return V(e) || (0, io.default)(e);
  },
  fo = 0,
  po = function (e) {
    var t = ++fo;
    return `${e || ``}${t}`;
  },
  mo = function (e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!V(e) && !(0, io.default)(e)) return n;
    var i;
    if (lo(e)) {
      var a = e.indexOf(`%`);
      i = (t * parseFloat(e.slice(0, a))) / 100;
    } else i = +e;
    return ((0, ao.default)(i) && (i = n), r && i > t && (i = t), i);
  },
  ho = function (e) {
    if (!e) return null;
    var t = Object.keys(e);
    return t && t.length ? e[t[0]] : null;
  },
  go = function (e) {
    if (!Array.isArray(e)) return !1;
    for (var t = e.length, n = {}, r = 0; r < t; r++)
      if (!n[e[r]]) n[e[r]] = !0;
      else return !0;
    return !1;
  },
  _o = function (e, t) {
    return V(e) && V(t)
      ? function (n) {
          return e + n * (t - e);
        }
      : function () {
          return t;
        };
  };
function vo(e, t, n) {
  return !e || !e.length
    ? null
    : e.find(function (e) {
        return e && (typeof t == `function` ? t(e) : (0, oo.default)(e, t)) === n;
      });
}
var yo = function (e) {
  if (!e || !e.length) return null;
  for (
    var t = e.length, n = 0, r = 0, i = 0, a = 0, o = 1 / 0, s = -1 / 0, c = 0, l = 0, u = 0;
    u < t;
    u++
  )
    ((c = e[u].cx || 0),
      (l = e[u].cy || 0),
      (n += c),
      (r += l),
      (i += c * l),
      (a += c * c),
      (o = Math.min(o, c)),
      (s = Math.max(s, c)));
  var d = t * a === n * n ? 0 : (t * i - n * r) / (t * a - n * n);
  return { xmin: o, xmax: s, a: d, b: (r - d * n) / t };
};
function bo(e, t) {
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n) && (!{}.hasOwnProperty.call(t, n) || e[n] !== t[n])) return !1;
  for (var r in t) if ({}.hasOwnProperty.call(t, r) && !{}.hasOwnProperty.call(e, r)) return !1;
  return !0;
}
var xo = r(ua());
function So(e) {
  '@babel/helpers - typeof';
  return (
    (So =
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
    So(e)
  );
}
var Co = [`viewBox`, `children`],
  wo =
    `aria-activedescendant.aria-atomic.aria-autocomplete.aria-busy.aria-checked.aria-colcount.aria-colindex.aria-colspan.aria-controls.aria-current.aria-describedby.aria-details.aria-disabled.aria-errormessage.aria-expanded.aria-flowto.aria-haspopup.aria-hidden.aria-invalid.aria-keyshortcuts.aria-label.aria-labelledby.aria-level.aria-live.aria-modal.aria-multiline.aria-multiselectable.aria-orientation.aria-owns.aria-placeholder.aria-posinset.aria-pressed.aria-readonly.aria-relevant.aria-required.aria-roledescription.aria-rowcount.aria-rowindex.aria-rowspan.aria-selected.aria-setsize.aria-sort.aria-valuemax.aria-valuemin.aria-valuenow.aria-valuetext.className.color.height.id.lang.max.media.method.min.name.style.target.width.role.tabIndex.accentHeight.accumulate.additive.alignmentBaseline.allowReorder.alphabetic.amplitude.arabicForm.ascent.attributeName.attributeType.autoReverse.azimuth.baseFrequency.baselineShift.baseProfile.bbox.begin.bias.by.calcMode.capHeight.clip.clipPath.clipPathUnits.clipRule.colorInterpolation.colorInterpolationFilters.colorProfile.colorRendering.contentScriptType.contentStyleType.cursor.cx.cy.d.decelerate.descent.diffuseConstant.direction.display.divisor.dominantBaseline.dur.dx.dy.edgeMode.elevation.enableBackground.end.exponent.externalResourcesRequired.fill.fillOpacity.fillRule.filter.filterRes.filterUnits.floodColor.floodOpacity.focusable.fontFamily.fontSize.fontSizeAdjust.fontStretch.fontStyle.fontVariant.fontWeight.format.from.fx.fy.g1.g2.glyphName.glyphOrientationHorizontal.glyphOrientationVertical.glyphRef.gradientTransform.gradientUnits.hanging.horizAdvX.horizOriginX.href.ideographic.imageRendering.in2.in.intercept.k1.k2.k3.k4.k.kernelMatrix.kernelUnitLength.kerning.keyPoints.keySplines.keyTimes.lengthAdjust.letterSpacing.lightingColor.limitingConeAngle.local.markerEnd.markerHeight.markerMid.markerStart.markerUnits.markerWidth.mask.maskContentUnits.maskUnits.mathematical.mode.numOctaves.offset.opacity.operator.order.orient.orientation.origin.overflow.overlinePosition.overlineThickness.paintOrder.panose1.pathLength.patternContentUnits.patternTransform.patternUnits.pointerEvents.pointsAtX.pointsAtY.pointsAtZ.preserveAlpha.preserveAspectRatio.primitiveUnits.r.radius.refX.refY.renderingIntent.repeatCount.repeatDur.requiredExtensions.requiredFeatures.restart.result.rotate.rx.ry.seed.shapeRendering.slope.spacing.specularConstant.specularExponent.speed.spreadMethod.startOffset.stdDeviation.stemh.stemv.stitchTiles.stopColor.stopOpacity.strikethroughPosition.strikethroughThickness.string.stroke.strokeDasharray.strokeDashoffset.strokeLinecap.strokeLinejoin.strokeMiterlimit.strokeOpacity.strokeWidth.surfaceScale.systemLanguage.tableValues.targetX.targetY.textAnchor.textDecoration.textLength.textRendering.to.transform.u1.u2.underlinePosition.underlineThickness.unicode.unicodeBidi.unicodeRange.unitsPerEm.vAlphabetic.values.vectorEffect.version.vertAdvY.vertOriginX.vertOriginY.vHanging.vIdeographic.viewTarget.visibility.vMathematical.widths.wordSpacing.writingMode.x1.x2.x.xChannelSelector.xHeight.xlinkActuate.xlinkArcrole.xlinkHref.xlinkRole.xlinkShow.xlinkTitle.xlinkType.xmlBase.xmlLang.xmlns.xmlnsXlink.xmlSpace.y1.y2.y.yChannelSelector.z.zoomAndPan.ref.key.angle`.split(
      `.`
    ),
  To = [`points`, `pathLength`],
  Eo = { svg: Co, polygon: To, polyline: To },
  Do =
    `dangerouslySetInnerHTML.onCopy.onCopyCapture.onCut.onCutCapture.onPaste.onPasteCapture.onCompositionEnd.onCompositionEndCapture.onCompositionStart.onCompositionStartCapture.onCompositionUpdate.onCompositionUpdateCapture.onFocus.onFocusCapture.onBlur.onBlurCapture.onChange.onChangeCapture.onBeforeInput.onBeforeInputCapture.onInput.onInputCapture.onReset.onResetCapture.onSubmit.onSubmitCapture.onInvalid.onInvalidCapture.onLoad.onLoadCapture.onError.onErrorCapture.onKeyDown.onKeyDownCapture.onKeyPress.onKeyPressCapture.onKeyUp.onKeyUpCapture.onAbort.onAbortCapture.onCanPlay.onCanPlayCapture.onCanPlayThrough.onCanPlayThroughCapture.onDurationChange.onDurationChangeCapture.onEmptied.onEmptiedCapture.onEncrypted.onEncryptedCapture.onEnded.onEndedCapture.onLoadedData.onLoadedDataCapture.onLoadedMetadata.onLoadedMetadataCapture.onLoadStart.onLoadStartCapture.onPause.onPauseCapture.onPlay.onPlayCapture.onPlaying.onPlayingCapture.onProgress.onProgressCapture.onRateChange.onRateChangeCapture.onSeeked.onSeekedCapture.onSeeking.onSeekingCapture.onStalled.onStalledCapture.onSuspend.onSuspendCapture.onTimeUpdate.onTimeUpdateCapture.onVolumeChange.onVolumeChangeCapture.onWaiting.onWaitingCapture.onAuxClick.onAuxClickCapture.onClick.onClickCapture.onContextMenu.onContextMenuCapture.onDoubleClick.onDoubleClickCapture.onDrag.onDragCapture.onDragEnd.onDragEndCapture.onDragEnter.onDragEnterCapture.onDragExit.onDragExitCapture.onDragLeave.onDragLeaveCapture.onDragOver.onDragOverCapture.onDragStart.onDragStartCapture.onDrop.onDropCapture.onMouseDown.onMouseDownCapture.onMouseEnter.onMouseLeave.onMouseMove.onMouseMoveCapture.onMouseOut.onMouseOutCapture.onMouseOver.onMouseOverCapture.onMouseUp.onMouseUpCapture.onSelect.onSelectCapture.onTouchCancel.onTouchCancelCapture.onTouchEnd.onTouchEndCapture.onTouchMove.onTouchMoveCapture.onTouchStart.onTouchStartCapture.onPointerDown.onPointerDownCapture.onPointerMove.onPointerMoveCapture.onPointerUp.onPointerUpCapture.onPointerCancel.onPointerCancelCapture.onPointerEnter.onPointerEnterCapture.onPointerLeave.onPointerLeaveCapture.onPointerOver.onPointerOverCapture.onPointerOut.onPointerOutCapture.onGotPointerCapture.onGotPointerCaptureCapture.onLostPointerCapture.onLostPointerCaptureCapture.onScroll.onScrollCapture.onWheel.onWheelCapture.onAnimationStart.onAnimationStartCapture.onAnimationEnd.onAnimationEndCapture.onAnimationIteration.onAnimationIterationCapture.onTransitionEnd.onTransitionEndCapture`.split(
      `.`
    ),
  Oo = function (e, t) {
    if (!e || typeof e == `function` || typeof e == `boolean`) return null;
    var n = e;
    if (((0, z.isValidElement)(e) && (n = e.props), !(0, xo.default)(n))) return null;
    var r = {};
    return (
      Object.keys(n).forEach(function (e) {
        Do.includes(e) &&
          (r[e] =
            t ||
            function (t) {
              return n[e](n, t);
            });
      }),
      r
    );
  },
  ko = function (e, t, n) {
    return function (r) {
      return (e(t, n, r), null);
    };
  },
  Ao = function (e, t, n) {
    if (!(0, xo.default)(e) || So(e) !== `object`) return null;
    var r = null;
    return (
      Object.keys(e).forEach(function (i) {
        var a = e[i];
        Do.includes(i) && typeof a == `function` && ((r ||= {}), (r[i] = ko(a, t, n)));
      }),
      r
    );
  },
  H = r(Qa()),
  U = r(da()),
  jo = to(),
  Mo = [`children`],
  No = [`children`];
function Po(e, t) {
  if (e == null) return {};
  var n = Fo(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function Fo(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function Io(e) {
  '@babel/helpers - typeof';
  return (
    (Io =
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
    Io(e)
  );
}
var Lo = {
    click: `onClick`,
    mousedown: `onMouseDown`,
    mouseup: `onMouseUp`,
    mouseover: `onMouseOver`,
    mousemove: `onMouseMove`,
    mouseout: `onMouseOut`,
    mouseenter: `onMouseEnter`,
    mouseleave: `onMouseLeave`,
    touchcancel: `onTouchCancel`,
    touchend: `onTouchEnd`,
    touchmove: `onTouchMove`,
    touchstart: `onTouchStart`,
  },
  Ro = function (e) {
    return typeof e == `string` ? e : e ? e.displayName || e.name || `Component` : ``;
  },
  zo = null,
  Bo = null,
  Vo = function e(t) {
    if (t === zo && Array.isArray(Bo)) return Bo;
    var n = [];
    return (
      z.Children.forEach(t, function (t) {
        (0, H.default)(t) ||
          ((0, jo.isFragment)(t) ? (n = n.concat(e(t.props.children))) : n.push(t));
      }),
      (Bo = n),
      (zo = t),
      n
    );
  };
function Ho(e, t) {
  var n = [],
    r = [];
  return (
    (r = Array.isArray(t)
      ? t.map(function (e) {
          return Ro(e);
        })
      : [Ro(t)]),
    Vo(e).forEach(function (e) {
      var t = (0, oo.default)(e, `type.displayName`) || (0, oo.default)(e, `type.name`);
      r.indexOf(t) !== -1 && n.push(e);
    }),
    n
  );
}
function Uo(e, t) {
  var n = Ho(e, t);
  return n && n[0];
}
var Wo = function (e) {
    if (!e || !e.props) return !1;
    var t = e.props,
      n = t.width,
      r = t.height;
    return !(!V(n) || n <= 0 || !V(r) || r <= 0);
  },
  Go =
    `a.altGlyph.altGlyphDef.altGlyphItem.animate.animateColor.animateMotion.animateTransform.circle.clipPath.color-profile.cursor.defs.desc.ellipse.feBlend.feColormatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.font.font-face.font-face-format.font-face-name.font-face-url.foreignObject.g.glyph.glyphRef.hkern.image.line.lineGradient.marker.mask.metadata.missing-glyph.mpath.path.pattern.polygon.polyline.radialGradient.rect.script.set.stop.style.svg.switch.symbol.text.textPath.title.tref.tspan.use.view.vkern`.split(
      `.`
    ),
  Ko = function (e) {
    return e && e.type && (0, io.default)(e.type) && Go.indexOf(e.type) >= 0;
  },
  qo = function (e) {
    return e && Io(e) === `object` && `cx` in e && `cy` in e && `r` in e;
  },
  Jo = function (e, t, n, r) {
    var i = Eo?.[r] ?? [];
    return (
      (!(0, U.default)(e) && ((r && i.includes(t)) || wo.includes(t))) || (n && Do.includes(t))
    );
  },
  Yo = function (e) {
    var t = [];
    return (
      Vo(e).forEach(function (e) {
        Ko(e) && t.push(e);
      }),
      t
    );
  },
  W = function (e, t, n) {
    if (!e || typeof e == `function` || typeof e == `boolean`) return null;
    var r = e;
    if (((0, z.isValidElement)(e) && (r = e.props), !(0, xo.default)(r))) return null;
    var i = {};
    return (
      Object.keys(r).forEach(function (e) {
        Jo(r?.[e], e, t, n) && (i[e] = r[e]);
      }),
      i
    );
  },
  Xo = function e(t, n) {
    if (t === n) return !0;
    var r = z.Children.count(t);
    if (r !== z.Children.count(n)) return !1;
    if (r === 0) return !0;
    if (r === 1) return Zo(Array.isArray(t) ? t[0] : t, Array.isArray(n) ? n[0] : n);
    for (var i = 0; i < r; i++) {
      var a = t[i],
        o = n[i];
      if (Array.isArray(a) || Array.isArray(o)) {
        if (!e(a, o)) return !1;
      } else if (!Zo(a, o)) return !1;
    }
    return !0;
  },
  Zo = function (e, t) {
    if ((0, H.default)(e) && (0, H.default)(t)) return !0;
    if (!(0, H.default)(e) && !(0, H.default)(t)) {
      var n = e.props || {},
        r = n.children,
        i = Po(n, Mo),
        a = t.props || {},
        o = a.children,
        s = Po(a, No);
      return r && o ? bo(i, s) && Xo(r, o) : !r && !o ? bo(i, s) : !1;
    }
    return !1;
  },
  Qo = function (e, t) {
    var n = [],
      r = {};
    return (
      Vo(e).forEach(function (e, i) {
        if (Ko(e)) n.push(e);
        else if (e) {
          var a = Ro(e.type),
            o = t[a] || {},
            s = o.handler,
            c = o.once;
          if (s && (!c || !r[a])) {
            var l = s(e, a, i);
            (n.push(l), (r[a] = !0));
          }
        }
      }),
      n
    );
  },
  $o = function (e) {
    var t = e && e.type;
    return t && Lo[t] ? Lo[t] : null;
  },
  es = function (e, t) {
    return Vo(t).indexOf(e);
  },
  ts = [`children`, `width`, `height`, `viewBox`, `className`, `style`, `title`, `desc`];
function ns() {
  return (
    (ns = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ns.apply(this, arguments)
  );
}
function rs(e, t) {
  if (e == null) return {};
  var n = is(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function is(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function as(e) {
  var t = e.children,
    n = e.width,
    r = e.height,
    i = e.viewBox,
    a = e.className,
    o = e.style,
    s = e.title,
    c = e.desc,
    l = rs(e, ts),
    u = i || { width: n, height: r, x: 0, y: 0 },
    d = F(`recharts-surface`, a);
  return z.createElement(
    `svg`,
    ns({}, W(l, !0, `svg`), {
      className: d,
      width: n,
      height: r,
      style: o,
      viewBox: `${u.x} ${u.y} ${u.width} ${u.height}`,
    }),
    z.createElement(`title`, null, s),
    z.createElement(`desc`, null, c),
    t
  );
}
var os = [`children`, `className`];
function ss() {
  return (
    (ss = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ss.apply(this, arguments)
  );
}
function cs(e, t) {
  if (e == null) return {};
  var n = ls(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function ls(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
var G = z.forwardRef(function (e, t) {
    var n = e.children,
      r = e.className,
      i = cs(e, os),
      a = F(`recharts-layer`, r);
    return z.createElement(`g`, ss({ className: a }, W(i, !0), { ref: t }), n);
  }),
  us = !1,
  ds = function (e, t) {
    var n = [...arguments].slice(2);
    if (
      us &&
      typeof console < `u` &&
      console.warn &&
      (t === void 0 && console.warn(`LogUtils requires an error message argument`), !e)
    )
      if (t === void 0)
        console.warn(
          `Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.`
        );
      else {
        var r = 0;
        console.warn(
          t.replace(/%s/g, function () {
            return n[r++];
          })
        );
      }
  },
  fs = o((e, t) => {
    function n(e, t, n) {
      var r = -1,
        i = e.length;
      (t < 0 && (t = -t > i ? 0 : i + t),
        (n = n > i ? i : n),
        n < 0 && (n += i),
        (i = t > n ? 0 : (n - t) >>> 0),
        (t >>>= 0));
      for (var a = Array(i); ++r < i;) a[r] = e[r + t];
      return a;
    }
    t.exports = n;
  }),
  ps = o((e, t) => {
    var n = fs();
    function r(e, t, r) {
      var i = e.length;
      return ((r = r === void 0 ? i : r), !t && r >= i ? e : n(e, t, r));
    }
    t.exports = r;
  }),
  ms = o((e, t) => {
    var n = RegExp(
      `[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]`
    );
    function r(e) {
      return n.test(e);
    }
    t.exports = r;
  }),
  hs = o((e, t) => {
    function n(e) {
      return e.split(``);
    }
    t.exports = n;
  }),
  gs = o((e, t) => {
    var n = `\\ud800-\\udfff`,
      r = `\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,
      i = `\\ufe0e\\ufe0f`,
      a = `[` + n + `]`,
      o = `[` + r + `]`,
      s = `\\ud83c[\\udffb-\\udfff]`,
      c = `(?:` + o + `|` + s + `)`,
      l = `[^` + n + `]`,
      u = `(?:\\ud83c[\\udde6-\\uddff]){2}`,
      d = `[\\ud800-\\udbff][\\udc00-\\udfff]`,
      f = `\\u200d`,
      p = c + `?`,
      m = `[` + i + `]?`,
      h = `(?:` + f + `(?:` + [l, u, d].join(`|`) + `)` + m + p + `)*`,
      g = m + p + h,
      _ = `(?:` + [l + o + `?`, o, u, d, a].join(`|`) + `)`,
      v = RegExp(s + `(?=` + s + `)|` + _ + g, `g`);
    function y(e) {
      return e.match(v) || [];
    }
    t.exports = y;
  }),
  _s = o((e, t) => {
    var n = hs(),
      r = ms(),
      i = gs();
    function a(e) {
      return r(e) ? i(e) : n(e);
    }
    t.exports = a;
  }),
  vs = o((e, t) => {
    var n = ps(),
      r = ms(),
      i = _s(),
      a = qa();
    function o(e) {
      return function (t) {
        t = a(t);
        var o = r(t) ? i(t) : void 0,
          s = o ? o[0] : t.charAt(0),
          c = o ? n(o, 1).join(``) : t.slice(1);
        return s[e]() + c;
      };
    }
    t.exports = o;
  }),
  ys = o((e, t) => {
    t.exports = vs()(`toUpperCase`);
  });
function K(e) {
  return function () {
    return e;
  };
}
var bs = Math.cos,
  xs = Math.sin,
  Ss = Math.sqrt,
  Cs = Math.PI;
Cs / 2;
var ws = 2 * Cs,
  Ts = Math.PI,
  Es = 2 * Ts,
  Ds = 1e-6,
  Os = Es - Ds;
function ks(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function As(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw Error(`invalid digits: ${e}`);
  if (t > 15) return ks;
  let n = 10 ** t;
  return function (e) {
    this._ += e[0];
    for (let t = 1, r = e.length; t < r; ++t) this._ += Math.round(arguments[t] * n) / n + e[t];
  };
}
var js = class {
  constructor(e) {
    ((this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ``),
      (this._append = e == null ? ks : As(e)));
  }
  moveTo(e, t) {
    this._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +t)}`;
  }
  closePath() {
    this._x1 !== null && ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(e, t) {
    this._append`L${(this._x1 = +e)},${(this._y1 = +t)}`;
  }
  quadraticCurveTo(e, t, n, r) {
    this._append`Q${+e},${+t},${(this._x1 = +n)},${(this._y1 = +r)}`;
  }
  bezierCurveTo(e, t, n, r, i, a) {
    this._append`C${+e},${+t},${+n},${+r},${(this._x1 = +i)},${(this._y1 = +a)}`;
  }
  arcTo(e, t, n, r, i) {
    if (((e = +e), (t = +t), (n = +n), (r = +r), (i = +i), i < 0))
      throw Error(`negative radius: ${i}`);
    let a = this._x1,
      o = this._y1,
      s = n - e,
      c = r - t,
      l = a - e,
      u = o - t,
      d = l * l + u * u;
    if (this._x1 === null) this._append`M${(this._x1 = e)},${(this._y1 = t)}`;
    else if (d > Ds)
      if (!(Math.abs(u * s - c * l) > Ds) || !i) this._append`L${(this._x1 = e)},${(this._y1 = t)}`;
      else {
        let f = n - a,
          p = r - o,
          m = s * s + c * c,
          h = f * f + p * p,
          g = Math.sqrt(m),
          _ = Math.sqrt(d),
          v = i * Math.tan((Ts - Math.acos((m + d - h) / (2 * g * _))) / 2),
          y = v / _,
          b = v / g;
        (Math.abs(y - 1) > Ds && this._append`L${e + y * l},${t + y * u}`,
          this
            ._append`A${i},${i},0,0,${+(u * f > l * p)},${(this._x1 = e + b * s)},${(this._y1 = t + b * c)}`);
      }
  }
  arc(e, t, n, r, i, a) {
    if (((e = +e), (t = +t), (n = +n), (a = !!a), n < 0)) throw Error(`negative radius: ${n}`);
    let o = n * Math.cos(r),
      s = n * Math.sin(r),
      c = e + o,
      l = t + s,
      u = 1 ^ a,
      d = a ? r - i : i - r;
    (this._x1 === null
      ? this._append`M${c},${l}`
      : (Math.abs(this._x1 - c) > Ds || Math.abs(this._y1 - l) > Ds) && this._append`L${c},${l}`,
      n &&
        (d < 0 && (d = (d % Es) + Es),
        d > Os
          ? this
              ._append`A${n},${n},0,1,${u},${e - o},${t - s}A${n},${n},0,1,${u},${(this._x1 = c)},${(this._y1 = l)}`
          : d > Ds &&
            this
              ._append`A${n},${n},0,${+(d >= Ts)},${u},${(this._x1 = e + n * Math.cos(i))},${(this._y1 = t + n * Math.sin(i))}`));
  }
  rect(e, t, n, r) {
    this
      ._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +t)}h${(n = +n)}v${+r}h${-n}Z`;
  }
  toString() {
    return this._;
  }
};
function Ms() {
  return new js();
}
Ms.prototype = js.prototype;
function Ns(e) {
  let t = 3;
  return (
    (e.digits = function (n) {
      if (!arguments.length) return t;
      if (n == null) t = null;
      else {
        let e = Math.floor(n);
        if (!(e >= 0)) throw RangeError(`invalid digits: ${n}`);
        t = e;
      }
      return e;
    }),
    () => new js(t)
  );
}
Array.prototype.slice;
function Ps(e) {
  return typeof e == `object` && `length` in e ? e : Array.from(e);
}
function Fs(e) {
  this._context = e;
}
Fs.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    ((this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ((this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t));
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break;
    }
  },
};
function Is(e) {
  return new Fs(e);
}
function Ls(e) {
  return e[0];
}
function Rs(e) {
  return e[1];
}
function zs(e, t) {
  var n = K(!0),
    r = null,
    i = Is,
    a = null,
    o = Ns(s);
  ((e = typeof e == `function` ? e : e === void 0 ? Ls : K(e)),
    (t = typeof t == `function` ? t : t === void 0 ? Rs : K(t)));
  function s(s) {
    var c,
      l = (s = Ps(s)).length,
      u,
      d = !1,
      f;
    for (r ?? (a = i((f = o()))), c = 0; c <= l; ++c)
      (!(c < l && n((u = s[c]), c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()),
        d && a.point(+e(u, c, s), +t(u, c, s)));
    if (f) return ((a = null), f + `` || null);
  }
  return (
    (s.x = function (t) {
      return arguments.length ? ((e = typeof t == `function` ? t : K(+t)), s) : e;
    }),
    (s.y = function (e) {
      return arguments.length ? ((t = typeof e == `function` ? e : K(+e)), s) : t;
    }),
    (s.defined = function (e) {
      return arguments.length ? ((n = typeof e == `function` ? e : K(!!e)), s) : n;
    }),
    (s.curve = function (e) {
      return arguments.length ? ((i = e), r != null && (a = i(r)), s) : i;
    }),
    (s.context = function (e) {
      return arguments.length ? (e == null ? (r = a = null) : (a = i((r = e))), s) : r;
    }),
    s
  );
}
function Bs(e, t, n) {
  var r = null,
    i = K(!0),
    a = null,
    o = Is,
    s = null,
    c = Ns(l);
  ((e = typeof e == `function` ? e : e === void 0 ? Ls : K(+e)),
    (t = typeof t == `function` ? t : K(t === void 0 ? 0 : +t)),
    (n = typeof n == `function` ? n : n === void 0 ? Rs : K(+n)));
  function l(l) {
    var u,
      d,
      f,
      p = (l = Ps(l)).length,
      m,
      h = !1,
      g,
      _ = Array(p),
      v = Array(p);
    for (a ?? (s = o((g = c()))), u = 0; u <= p; ++u) {
      if (!(u < p && i((m = l[u]), u, l)) === h)
        if ((h = !h)) ((d = u), s.areaStart(), s.lineStart());
        else {
          for (s.lineEnd(), s.lineStart(), f = u - 1; f >= d; --f) s.point(_[f], v[f]);
          (s.lineEnd(), s.areaEnd());
        }
      h &&
        ((_[u] = +e(m, u, l)),
        (v[u] = +t(m, u, l)),
        s.point(r ? +r(m, u, l) : _[u], n ? +n(m, u, l) : v[u]));
    }
    if (g) return ((s = null), g + `` || null);
  }
  function u() {
    return zs().defined(i).curve(o).context(a);
  }
  return (
    (l.x = function (t) {
      return arguments.length ? ((e = typeof t == `function` ? t : K(+t)), (r = null), l) : e;
    }),
    (l.x0 = function (t) {
      return arguments.length ? ((e = typeof t == `function` ? t : K(+t)), l) : e;
    }),
    (l.x1 = function (e) {
      return arguments.length
        ? ((r = e == null ? null : typeof e == `function` ? e : K(+e)), l)
        : r;
    }),
    (l.y = function (e) {
      return arguments.length ? ((t = typeof e == `function` ? e : K(+e)), (n = null), l) : t;
    }),
    (l.y0 = function (e) {
      return arguments.length ? ((t = typeof e == `function` ? e : K(+e)), l) : t;
    }),
    (l.y1 = function (e) {
      return arguments.length
        ? ((n = e == null ? null : typeof e == `function` ? e : K(+e)), l)
        : n;
    }),
    (l.lineX0 = l.lineY0 =
      function () {
        return u().x(e).y(t);
      }),
    (l.lineY1 = function () {
      return u().x(e).y(n);
    }),
    (l.lineX1 = function () {
      return u().x(r).y(t);
    }),
    (l.defined = function (e) {
      return arguments.length ? ((i = typeof e == `function` ? e : K(!!e)), l) : i;
    }),
    (l.curve = function (e) {
      return arguments.length ? ((o = e), a != null && (s = o(a)), l) : o;
    }),
    (l.context = function (e) {
      return arguments.length ? (e == null ? (a = s = null) : (s = o((a = e))), l) : a;
    }),
    l
  );
}
var Vs = class {
  constructor(e, t) {
    ((this._context = e), (this._x = t));
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    ((this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      (this._line = 1 - this._line));
  }
  point(e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ((this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t));
        break;
      case 1:
        this._point = 2;
      default:
        this._x
          ? this._context.bezierCurveTo(
              (this._x0 = (this._x0 + e) / 2),
              this._y0,
              this._x0,
              t,
              e,
              t
            )
          : this._context.bezierCurveTo(
              this._x0,
              (this._y0 = (this._y0 + t) / 2),
              e,
              this._y0,
              e,
              t
            );
        break;
    }
    ((this._x0 = e), (this._y0 = t));
  }
};
function Hs(e) {
  return new Vs(e, !0);
}
function Us(e) {
  return new Vs(e, !1);
}
var Ws = {
    draw(e, t) {
      let n = Ss(t / Cs);
      (e.moveTo(n, 0), e.arc(0, 0, n, 0, ws));
    },
  },
  Gs = {
    draw(e, t) {
      let n = Ss(t / 5) / 2;
      (e.moveTo(-3 * n, -n),
        e.lineTo(-n, -n),
        e.lineTo(-n, -3 * n),
        e.lineTo(n, -3 * n),
        e.lineTo(n, -n),
        e.lineTo(3 * n, -n),
        e.lineTo(3 * n, n),
        e.lineTo(n, n),
        e.lineTo(n, 3 * n),
        e.lineTo(-n, 3 * n),
        e.lineTo(-n, n),
        e.lineTo(-3 * n, n),
        e.closePath());
    },
  },
  Ks = Ss(1 / 3),
  qs = Ks * 2,
  Js = {
    draw(e, t) {
      let n = Ss(t / qs),
        r = n * Ks;
      (e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath());
    },
  },
  Ys = {
    draw(e, t) {
      let n = Ss(t),
        r = -n / 2;
      e.rect(r, r, n, n);
    },
  },
  Xs = 0.8908130915292852,
  Zs = xs(Cs / 10) / xs((7 * Cs) / 10),
  Qs = xs(ws / 10) * Zs,
  $s = -bs(ws / 10) * Zs,
  ec = {
    draw(e, t) {
      let n = Ss(t * Xs),
        r = Qs * n,
        i = $s * n;
      (e.moveTo(0, -n), e.lineTo(r, i));
      for (let t = 1; t < 5; ++t) {
        let a = (ws * t) / 5,
          o = bs(a),
          s = xs(a);
        (e.lineTo(s * n, -o * n), e.lineTo(o * r - s * i, s * r + o * i));
      }
      e.closePath();
    },
  },
  tc = Ss(3),
  nc = {
    draw(e, t) {
      let n = -Ss(t / (tc * 3));
      (e.moveTo(0, n * 2), e.lineTo(-tc * n, -n), e.lineTo(tc * n, -n), e.closePath());
    },
  },
  rc = -0.5,
  ic = Ss(3) / 2,
  ac = 1 / Ss(12),
  oc = (ac / 2 + 1) * 3,
  sc = {
    draw(e, t) {
      let n = Ss(t / oc),
        r = n / 2,
        i = n * ac,
        a = r,
        o = n * ac + n,
        s = -a,
        c = o;
      (e.moveTo(r, i),
        e.lineTo(a, o),
        e.lineTo(s, c),
        e.lineTo(rc * r - ic * i, ic * r + rc * i),
        e.lineTo(rc * a - ic * o, ic * a + rc * o),
        e.lineTo(rc * s - ic * c, ic * s + rc * c),
        e.lineTo(rc * r + ic * i, rc * i - ic * r),
        e.lineTo(rc * a + ic * o, rc * o - ic * a),
        e.lineTo(rc * s + ic * c, rc * c - ic * s),
        e.closePath());
    },
  };
function cc(e, t) {
  let n = null,
    r = Ns(i);
  ((e = typeof e == `function` ? e : K(e || Ws)),
    (t = typeof t == `function` ? t : K(t === void 0 ? 64 : +t)));
  function i() {
    let i;
    if (((n ||= i = r()), e.apply(this, arguments).draw(n, +t.apply(this, arguments)), i))
      return ((n = null), i + `` || null);
  }
  return (
    (i.type = function (t) {
      return arguments.length ? ((e = typeof t == `function` ? t : K(t)), i) : e;
    }),
    (i.size = function (e) {
      return arguments.length ? ((t = typeof e == `function` ? e : K(+e)), i) : t;
    }),
    (i.context = function (e) {
      return arguments.length ? ((n = e ?? null), i) : n;
    }),
    i
  );
}
function lc() {}
function uc(e, t, n) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + n) / 6
  );
}
function dc(e) {
  this._context = e;
}
dc.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0));
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        uc(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    ((this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ((this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t));
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        ((this._point = 3),
          this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6));
      default:
        uc(this, e, t);
        break;
    }
    ((this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t));
  },
};
function fc(e) {
  return new dc(e);
}
function pc(e) {
  this._context = e;
}
pc.prototype = {
  areaStart: lc,
  areaEnd: lc,
  lineStart: function () {
    ((this._x0 =
      this._x1 =
      this._x2 =
      this._x3 =
      this._x4 =
      this._y0 =
      this._y1 =
      this._y2 =
      this._y3 =
      this._y4 =
        NaN),
      (this._point = 0));
  },
  lineEnd: function () {
    switch (this._point) {
      case 1:
        (this._context.moveTo(this._x2, this._y2), this._context.closePath());
        break;
      case 2:
        (this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3),
          this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3),
          this._context.closePath());
        break;
      case 3:
        (this.point(this._x2, this._y2),
          this.point(this._x3, this._y3),
          this.point(this._x4, this._y4));
        break;
    }
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ((this._point = 1), (this._x2 = e), (this._y2 = t));
        break;
      case 1:
        ((this._point = 2), (this._x3 = e), (this._y3 = t));
        break;
      case 2:
        ((this._point = 3),
          (this._x4 = e),
          (this._y4 = t),
          this._context.moveTo(
            (this._x0 + 4 * this._x1 + e) / 6,
            (this._y0 + 4 * this._y1 + t) / 6
          ));
        break;
      default:
        uc(this, e, t);
        break;
    }
    ((this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t));
  },
};
function mc(e) {
  return new pc(e);
}
function hc(e) {
  this._context = e;
}
hc.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0));
  },
  lineEnd: function () {
    ((this._line || (this._line !== 0 && this._point === 3)) && this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var n = (this._x0 + 4 * this._x1 + e) / 6,
          r = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
        break;
      case 3:
        this._point = 4;
      default:
        uc(this, e, t);
        break;
    }
    ((this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t));
  },
};
function gc(e) {
  return new hc(e);
}
function _c(e) {
  this._context = e;
}
_c.prototype = {
  areaStart: lc,
  areaEnd: lc,
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    this._point && this._context.closePath();
  },
  point: function (e, t) {
    ((e = +e),
      (t = +t),
      this._point ? this._context.lineTo(e, t) : ((this._point = 1), this._context.moveTo(e, t)));
  },
};
function vc(e) {
  return new _c(e);
}
function yc(e) {
  return e < 0 ? -1 : 1;
}
function bc(e, t, n) {
  var r = e._x1 - e._x0,
    i = t - e._x1,
    a = (e._y1 - e._y0) / (r || (i < 0 && -0)),
    o = (n - e._y1) / (i || (r < 0 && -0)),
    s = (a * i + o * r) / (r + i);
  return (yc(a) + yc(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(s)) || 0;
}
function xc(e, t) {
  var n = e._x1 - e._x0;
  return n ? ((3 * (e._y1 - e._y0)) / n - t) / 2 : t;
}
function Sc(e, t, n) {
  var r = e._x0,
    i = e._y0,
    a = e._x1,
    o = e._y1,
    s = (a - r) / 3;
  e._context.bezierCurveTo(r + s, i + s * t, a - s, o - s * n, a, o);
}
function Cc(e) {
  this._context = e;
}
Cc.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN), (this._point = 0));
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Sc(this, this._t0, xc(this, this._t0));
        break;
    }
    ((this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      (this._line = 1 - this._line));
  },
  point: function (e, t) {
    var n = NaN;
    if (((e = +e), (t = +t), !(e === this._x1 && t === this._y1))) {
      switch (this._point) {
        case 0:
          ((this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t));
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          ((this._point = 3), Sc(this, xc(this, (n = bc(this, e, t))), n));
          break;
        default:
          Sc(this, this._t0, (n = bc(this, e, t)));
          break;
      }
      ((this._x0 = this._x1),
        (this._x1 = e),
        (this._y0 = this._y1),
        (this._y1 = t),
        (this._t0 = n));
    }
  },
};
function wc(e) {
  this._context = new Tc(e);
}
(wc.prototype = Object.create(Cc.prototype)).point = function (e, t) {
  Cc.prototype.point.call(this, t, e);
};
function Tc(e) {
  this._context = e;
}
Tc.prototype = {
  moveTo: function (e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function () {
    this._context.closePath();
  },
  lineTo: function (e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function (e, t, n, r, i, a) {
    this._context.bezierCurveTo(t, e, r, n, a, i);
  },
};
function Ec(e) {
  return new Cc(e);
}
function Dc(e) {
  return new wc(e);
}
function Oc(e) {
  this._context = e;
}
Oc.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x = []), (this._y = []));
  },
  lineEnd: function () {
    var e = this._x,
      t = this._y,
      n = e.length;
    if (n)
      if (
        (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2)
      )
        this._context.lineTo(e[1], t[1]);
      else
        for (var r = kc(e), i = kc(t), a = 0, o = 1; o < n; ++a, ++o)
          this._context.bezierCurveTo(r[0][a], i[0][a], r[1][a], i[1][a], e[o], t[o]);
    ((this._line || (this._line !== 0 && n === 1)) && this._context.closePath(),
      (this._line = 1 - this._line),
      (this._x = this._y = null));
  },
  point: function (e, t) {
    (this._x.push(+e), this._y.push(+t));
  },
};
function kc(e) {
  var t,
    n = e.length - 1,
    r,
    i = Array(n),
    a = Array(n),
    o = Array(n);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t)
    ((i[t] = 1), (a[t] = 4), (o[t] = 4 * e[t] + 2 * e[t + 1]));
  for (i[n - 1] = 2, a[n - 1] = 7, o[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t)
    ((r = i[t] / a[t - 1]), (a[t] -= r), (o[t] -= r * o[t - 1]));
  for (i[n - 1] = o[n - 1] / a[n - 1], t = n - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[n - 1] = (e[n] + i[n - 1]) / 2, t = 0; t < n - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function Ac(e) {
  return new Oc(e);
}
function jc(e, t) {
  ((this._context = e), (this._t = t));
}
jc.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    ((this._x = this._y = NaN), (this._point = 0));
  },
  lineEnd: function () {
    (0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y),
      (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      this._line >= 0 && ((this._t = 1 - this._t), (this._line = 1 - this._line)));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ((this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t));
        break;
      case 1:
        this._point = 2;
      default:
        if (this._t <= 0) (this._context.lineTo(this._x, t), this._context.lineTo(e, t));
        else {
          var n = this._x * (1 - this._t) + e * this._t;
          (this._context.lineTo(n, this._y), this._context.lineTo(n, t));
        }
        break;
    }
    ((this._x = e), (this._y = t));
  },
};
function Mc(e) {
  return new jc(e, 0.5);
}
function Nc(e) {
  return new jc(e, 0);
}
function Pc(e) {
  return new jc(e, 1);
}
function Fc(e, t) {
  if ((o = e.length) > 1)
    for (var n = 1, r, i, a = e[t[0]], o, s = a.length; n < o; ++n)
      for (i = a, a = e[t[n]], r = 0; r < s; ++r)
        a[r][1] += a[r][0] = isNaN(i[r][1]) ? i[r][0] : i[r][1];
}
function Ic(e) {
  for (var t = e.length, n = Array(t); --t >= 0;) n[t] = t;
  return n;
}
function Lc(e, t) {
  return e[t];
}
function Rc(e) {
  let t = [];
  return ((t.key = e), t);
}
function zc() {
  var e = K([]),
    t = Ic,
    n = Fc,
    r = Lc;
  function i(i) {
    var a = Array.from(e.apply(this, arguments), Rc),
      o,
      s = a.length,
      c = -1,
      l;
    for (let e of i) for (o = 0, ++c; o < s; ++o) (a[o][c] = [0, +r(e, a[o].key, c, i)]).data = e;
    for (o = 0, l = Ps(t(a)); o < s; ++o) a[l[o]].index = o;
    return (n(a, l), a);
  }
  return (
    (i.keys = function (t) {
      return arguments.length ? ((e = typeof t == `function` ? t : K(Array.from(t))), i) : e;
    }),
    (i.value = function (e) {
      return arguments.length ? ((r = typeof e == `function` ? e : K(+e)), i) : r;
    }),
    (i.order = function (e) {
      return arguments.length
        ? ((t = e == null ? Ic : typeof e == `function` ? e : K(Array.from(e))), i)
        : t;
    }),
    (i.offset = function (e) {
      return arguments.length ? ((n = e ?? Fc), i) : n;
    }),
    i
  );
}
function Bc(e, t) {
  if ((r = e.length) > 0) {
    for (var n, r, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = n = 0; n < r; ++n) o += e[n][i][1] || 0;
      if (o) for (n = 0; n < r; ++n) e[n][i][1] /= o;
    }
    Fc(e, t);
  }
}
function Vc(e, t) {
  if ((i = e.length) > 0) {
    for (var n = 0, r = e[t[0]], i, a = r.length; n < a; ++n) {
      for (var o = 0, s = 0; o < i; ++o) s += e[o][n][1] || 0;
      r[n][1] += r[n][0] = -s / 2;
    }
    Fc(e, t);
  }
}
function Hc(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var n = 0, r = 1, i, a, o; r < a; ++r) {
      for (var s = 0, c = 0, l = 0; s < o; ++s) {
        for (
          var u = e[t[s]], d = u[r][1] || 0, f = (d - (u[r - 1][1] || 0)) / 2, p = 0;
          p < s;
          ++p
        ) {
          var m = e[t[p]],
            h = m[r][1] || 0,
            g = m[r - 1][1] || 0;
          f += h - g;
        }
        ((c += d), (l += f * d));
      }
      ((i[r - 1][1] += i[r - 1][0] = n), c && (n -= l / c));
    }
    ((i[r - 1][1] += i[r - 1][0] = n), Fc(e, t));
  }
}
var Uc = r(ys());
function Wc(e) {
  '@babel/helpers - typeof';
  return (
    (Wc =
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
    Wc(e)
  );
}
var Gc = [`type`, `size`, `sizeType`];
function Kc() {
  return (
    (Kc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Kc.apply(this, arguments)
  );
}
function qc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Jc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? qc(Object(n), !0).forEach(function (t) {
          Yc(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : qc(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Yc(e, t, n) {
  return (
    (t = Xc(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Xc(e) {
  var t = Zc(e, `string`);
  return Wc(t) == `symbol` ? t : String(t);
}
function Zc(e, t) {
  if (Wc(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Wc(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function Qc(e, t) {
  if (e == null) return {};
  var n = $c(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function $c(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
var el = {
    symbolCircle: Ws,
    symbolCross: Gs,
    symbolDiamond: Js,
    symbolSquare: Ys,
    symbolStar: ec,
    symbolTriangle: nc,
    symbolWye: sc,
  },
  tl = Math.PI / 180,
  nl = function (e) {
    return el[`symbol${(0, Uc.default)(e)}`] || Ws;
  },
  rl = function (e, t, n) {
    if (t === `area`) return e;
    switch (n) {
      case `cross`:
        return (5 * e * e) / 9;
      case `diamond`:
        return (0.5 * e * e) / Math.sqrt(3);
      case `square`:
        return e * e;
      case `star`:
        var r = 18 * tl;
        return 1.25 * e * e * (Math.tan(r) - Math.tan(r * 2) * Math.tan(r) ** 2);
      case `triangle`:
        return (Math.sqrt(3) * e * e) / 4;
      case `wye`:
        return ((21 - 10 * Math.sqrt(3)) * e * e) / 8;
      default:
        return (Math.PI * e * e) / 4;
    }
  },
  il = function (e, t) {
    el[`symbol${(0, Uc.default)(e)}`] = t;
  },
  al = function (e) {
    var t = e.type,
      n = t === void 0 ? `circle` : t,
      r = e.size,
      i = r === void 0 ? 64 : r,
      a = e.sizeType,
      o = a === void 0 ? `area` : a,
      s = Jc(Jc({}, Qc(e, Gc)), {}, { type: n, size: i, sizeType: o }),
      c = function () {
        var e = nl(n);
        return cc()
          .type(e)
          .size(rl(i, o, n))();
      },
      l = s.className,
      u = s.cx,
      d = s.cy,
      f = W(s, !0);
    return u === +u && d === +d && i === +i
      ? z.createElement(
          `path`,
          Kc({}, f, {
            className: F(`recharts-symbols`, l),
            transform: `translate(${u}, ${d})`,
            d: c(),
          })
        )
      : null;
  };
al.registerSymbol = il;
function ol(e) {
  '@babel/helpers - typeof';
  return (
    (ol =
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
    ol(e)
  );
}
function sl() {
  return (
    (sl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    sl.apply(this, arguments)
  );
}
function cl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function ll(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? cl(Object(n), !0).forEach(function (t) {
          bl(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : cl(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function ul(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function dl(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, xl(r.key), r));
  }
}
function fl(e, t, n) {
  return (
    t && dl(e.prototype, t),
    n && dl(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function pl(e, t, n) {
  return (
    (t = _l(t)),
    ml(e, gl() ? Reflect.construct(t, n || [], _l(e).constructor) : t.apply(e, n))
  );
}
function ml(e, t) {
  if (t && (ol(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return hl(e);
}
function hl(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function gl() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (gl = function () {
    return !!e;
  })();
}
function _l(e) {
  return (
    (_l = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    _l(e)
  );
}
function vl(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && yl(e, t));
}
function yl(e, t) {
  return (
    (yl = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    yl(e, t)
  );
}
function bl(e, t, n) {
  return (
    (t = xl(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function xl(e) {
  var t = Sl(e, `string`);
  return ol(t) == `symbol` ? t : String(t);
}
function Sl(e, t) {
  if (ol(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (ol(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Cl = 32,
  wl = (function (e) {
    vl(t, e);
    function t() {
      return (ul(this, t), pl(this, t, arguments));
    }
    return (
      fl(t, [
        {
          key: `renderIcon`,
          value: function (e) {
            var t = this.props.inactiveColor,
              n = Cl / 2,
              r = Cl / 6,
              i = Cl / 3,
              a = e.inactive ? t : e.color;
            if (e.type === `plainline`)
              return z.createElement(`line`, {
                strokeWidth: 4,
                fill: `none`,
                stroke: a,
                strokeDasharray: e.payload.strokeDasharray,
                x1: 0,
                y1: n,
                x2: Cl,
                y2: n,
                className: `recharts-legend-icon`,
              });
            if (e.type === `line`)
              return z.createElement(`path`, {
                strokeWidth: 4,
                fill: `none`,
                stroke: a,
                d: `M0,${n}h${i}
            A${r},${r},0,1,1,${2 * i},${n}
            H${Cl}M${2 * i},${n}
            A${r},${r},0,1,1,${i},${n}`,
                className: `recharts-legend-icon`,
              });
            if (e.type === `rect`)
              return z.createElement(`path`, {
                stroke: `none`,
                fill: a,
                d: `M0,${Cl / 8}h${Cl}v${(Cl * 3) / 4}h${-Cl}z`,
                className: `recharts-legend-icon`,
              });
            if (z.isValidElement(e.legendIcon)) {
              var o = ll({}, e);
              return (delete o.legendIcon, z.cloneElement(e.legendIcon, o));
            }
            return z.createElement(al, {
              fill: a,
              cx: n,
              cy: n,
              size: Cl,
              sizeType: `diameter`,
              type: e.type,
            });
          },
        },
        {
          key: `renderItems`,
          value: function () {
            var e = this,
              t = this.props,
              n = t.payload,
              r = t.iconSize,
              i = t.layout,
              a = t.formatter,
              o = t.inactiveColor,
              s = { x: 0, y: 0, width: Cl, height: Cl },
              c = { display: i === `horizontal` ? `inline-block` : `block`, marginRight: 10 },
              l = { display: `inline-block`, verticalAlign: `middle`, marginRight: 4 };
            return n.map(function (t, n) {
              var i = t.formatter || a,
                u = F(
                  bl(
                    bl({ 'recharts-legend-item': !0 }, `legend-item-${n}`, !0),
                    `inactive`,
                    t.inactive
                  )
                );
              if (t.type === `none`) return null;
              var d = (0, U.default)(t.value) ? null : t.value;
              ds(
                !(0, U.default)(t.value),
                `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
              );
              var f = t.inactive ? o : t.color;
              return z.createElement(
                `li`,
                sl({ className: u, style: c, key: `legend-item-${n}` }, Ao(e.props, t, n)),
                z.createElement(as, { width: r, height: r, viewBox: s, style: l }, e.renderIcon(t)),
                z.createElement(
                  `span`,
                  { className: `recharts-legend-item-text`, style: { color: f } },
                  i ? i(d, t, n) : d
                )
              );
            });
          },
        },
        {
          key: `render`,
          value: function () {
            var e = this.props,
              t = e.payload,
              n = e.layout,
              r = e.align;
            if (!t || !t.length) return null;
            var i = { padding: 0, margin: 0, textAlign: n === `horizontal` ? r : `left` };
            return z.createElement(
              `ul`,
              { className: `recharts-default-legend`, style: i },
              this.renderItems()
            );
          },
        },
      ]),
      t
    );
  })(z.PureComponent);
(bl(wl, `displayName`, `Legend`),
  bl(wl, `defaultProps`, {
    iconSize: 14,
    layout: `horizontal`,
    align: `center`,
    verticalAlign: `middle`,
    inactiveColor: `#ccc`,
  }));
var Tl = o((e, t) => {
    var n = Ma();
    function r() {
      ((this.__data__ = new n()), (this.size = 0));
    }
    t.exports = r;
  }),
  El = o((e, t) => {
    function n(e) {
      var t = this.__data__,
        n = t.delete(e);
      return ((this.size = t.size), n);
    }
    t.exports = n;
  }),
  Dl = o((e, t) => {
    function n(e) {
      return this.__data__.get(e);
    }
    t.exports = n;
  }),
  Ol = o((e, t) => {
    function n(e) {
      return this.__data__.has(e);
    }
    t.exports = n;
  }),
  kl = o((e, t) => {
    var n = Ma(),
      r = Na(),
      i = Va(),
      a = 200;
    function o(e, t) {
      var o = this.__data__;
      if (o instanceof n) {
        var s = o.__data__;
        if (!r || s.length < a - 1) return (s.push([e, t]), (this.size = ++o.size), this);
        o = this.__data__ = new i(s);
      }
      return (o.set(e, t), (this.size = o.size), this);
    }
    t.exports = o;
  }),
  Al = o((e, t) => {
    var n = Ma(),
      r = Tl(),
      i = El(),
      a = Dl(),
      o = Ol(),
      s = kl();
    function c(e) {
      var t = (this.__data__ = new n(e));
      this.size = t.size;
    }
    ((c.prototype.clear = r),
      (c.prototype.delete = i),
      (c.prototype.get = a),
      (c.prototype.has = o),
      (c.prototype.set = s),
      (t.exports = c));
  }),
  jl = o((e, t) => {
    var n = `__lodash_hash_undefined__`;
    function r(e) {
      return (this.__data__.set(e, n), this);
    }
    t.exports = r;
  }),
  Ml = o((e, t) => {
    function n(e) {
      return this.__data__.has(e);
    }
    t.exports = n;
  }),
  Nl = o((e, t) => {
    var n = Va(),
      r = jl(),
      i = Ml();
    function a(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new n(); ++t < r;) this.add(e[t]);
    }
    ((a.prototype.add = a.prototype.push = r), (a.prototype.has = i), (t.exports = a));
  }),
  Pl = o((e, t) => {
    function n(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length; ++n < r;) if (t(e[n], n, e)) return !0;
      return !1;
    }
    t.exports = n;
  }),
  Fl = o((e, t) => {
    function n(e, t) {
      return e.has(t);
    }
    t.exports = n;
  }),
  Il = o((e, t) => {
    var n = Nl(),
      r = Pl(),
      i = Fl(),
      a = 1,
      o = 2;
    function s(e, t, s, c, l, u) {
      var d = s & a,
        f = e.length,
        p = t.length;
      if (f != p && !(d && p > f)) return !1;
      var m = u.get(e),
        h = u.get(t);
      if (m && h) return m == t && h == e;
      var g = -1,
        _ = !0,
        v = s & o ? new n() : void 0;
      for (u.set(e, t), u.set(t, e); ++g < f;) {
        var y = e[g],
          b = t[g];
        if (c) var x = d ? c(b, y, g, t, e, u) : c(y, b, g, e, t, u);
        if (x !== void 0) {
          if (x) continue;
          _ = !1;
          break;
        }
        if (v) {
          if (
            !r(t, function (e, t) {
              if (!i(v, t) && (y === e || l(y, e, s, c, u))) return v.push(t);
            })
          ) {
            _ = !1;
            break;
          }
        } else if (!(y === b || l(y, b, s, c, u))) {
          _ = !1;
          break;
        }
      }
      return (u.delete(e), u.delete(t), _);
    }
    t.exports = s;
  }),
  Ll = o((e, t) => {
    t.exports = na().Uint8Array;
  }),
  Rl = o((e, t) => {
    function n(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (e, r) {
          n[++t] = [r, e];
        }),
        n
      );
    }
    t.exports = n;
  }),
  zl = o((e, t) => {
    function n(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (e) {
          n[++t] = e;
        }),
        n
      );
    }
    t.exports = n;
  }),
  Bl = o((e, t) => {
    var n = ra(),
      r = Ll(),
      i = Ea(),
      a = Il(),
      o = Rl(),
      s = zl(),
      c = 1,
      l = 2,
      u = `[object Boolean]`,
      d = `[object Date]`,
      f = `[object Error]`,
      p = `[object Map]`,
      m = `[object Number]`,
      h = `[object RegExp]`,
      g = `[object Set]`,
      _ = `[object String]`,
      v = `[object Symbol]`,
      y = `[object ArrayBuffer]`,
      b = `[object DataView]`,
      x = n ? n.prototype : void 0,
      S = x ? x.valueOf : void 0;
    function C(e, t, n, x, C, w, T) {
      switch (n) {
        case b:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
          ((e = e.buffer), (t = t.buffer));
        case y:
          return !(e.byteLength != t.byteLength || !w(new r(e), new r(t)));
        case u:
        case d:
        case m:
          return i(+e, +t);
        case f:
          return e.name == t.name && e.message == t.message;
        case h:
        case _:
          return e == t + ``;
        case p:
          var E = o;
        case g:
          var D = x & c;
          if (((E ||= s), e.size != t.size && !D)) return !1;
          var O = T.get(e);
          if (O) return O == t;
          ((x |= l), T.set(e, t));
          var k = a(E(e), E(t), x, C, w, T);
          return (T.delete(e), k);
        case v:
          if (S) return S.call(e) == S.call(t);
      }
      return !1;
    }
    t.exports = C;
  }),
  Vl = o((e, t) => {
    function n(e, t) {
      for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
      return e;
    }
    t.exports = n;
  }),
  Hl = o((e, t) => {
    var n = Vl(),
      r = ea();
    function i(e, t, i) {
      var a = t(e);
      return r(e) ? a : n(a, i(e));
    }
    t.exports = i;
  }),
  Ul = o((e, t) => {
    function n(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r;) {
        var o = e[n];
        t(o, n, e) && (a[i++] = o);
      }
      return a;
    }
    t.exports = n;
  }),
  Wl = o((e, t) => {
    function n() {
      return [];
    }
    t.exports = n;
  }),
  Gl = o((e, t) => {
    var n = Ul(),
      r = Wl(),
      i = Object.prototype.propertyIsEnumerable,
      a = Object.getOwnPropertySymbols;
    t.exports = a
      ? function (e) {
          return e == null
            ? []
            : ((e = Object(e)),
              n(a(e), function (t) {
                return i.call(e, t);
              }));
        }
      : r;
  }),
  Kl = o((e, t) => {
    function n(e, t) {
      for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
      return r;
    }
    t.exports = n;
  }),
  ql = o((e, t) => {
    var n = oa(),
      r = sa(),
      i = `[object Arguments]`;
    function a(e) {
      return r(e) && n(e) == i;
    }
    t.exports = a;
  }),
  Jl = o((e, t) => {
    var n = ql(),
      r = sa(),
      i = Object.prototype,
      a = i.hasOwnProperty,
      o = i.propertyIsEnumerable;
    t.exports = n(
      (function () {
        return arguments;
      })()
    )
      ? n
      : function (e) {
          return r(e) && a.call(e, `callee`) && !o.call(e, `callee`);
        };
  }),
  Yl = o((e, t) => {
    function n() {
      return !1;
    }
    t.exports = n;
  }),
  Xl = o((e, t) => {
    var n = na(),
      r = Yl(),
      i = typeof e == `object` && e && !e.nodeType && e,
      a = i && typeof t == `object` && t && !t.nodeType && t,
      o = a && a.exports === i ? n.Buffer : void 0;
    t.exports = (o ? o.isBuffer : void 0) || r;
  }),
  Zl = o((e, t) => {
    var n = 9007199254740991,
      r = /^(?:0|[1-9]\d*)$/;
    function i(e, t) {
      var i = typeof e;
      return (
        (t ??= n),
        !!t && (i == `number` || (i != `symbol` && r.test(e))) && e > -1 && e % 1 == 0 && e < t
      );
    }
    t.exports = i;
  }),
  Ql = o((e, t) => {
    var n = 9007199254740991;
    function r(e) {
      return typeof e == `number` && e > -1 && e % 1 == 0 && e <= n;
    }
    t.exports = r;
  }),
  $l = o((e, t) => {
    var n = oa(),
      r = Ql(),
      i = sa(),
      a = `[object Arguments]`,
      o = `[object Array]`,
      s = `[object Boolean]`,
      c = `[object Date]`,
      l = `[object Error]`,
      u = `[object Function]`,
      d = `[object Map]`,
      f = `[object Number]`,
      p = `[object Object]`,
      m = `[object RegExp]`,
      h = `[object Set]`,
      g = `[object String]`,
      _ = `[object WeakMap]`,
      v = `[object ArrayBuffer]`,
      y = `[object DataView]`,
      b = `[object Float32Array]`,
      x = `[object Float64Array]`,
      S = `[object Int8Array]`,
      C = `[object Int16Array]`,
      w = `[object Int32Array]`,
      T = `[object Uint8Array]`,
      E = `[object Uint8ClampedArray]`,
      D = `[object Uint16Array]`,
      O = `[object Uint32Array]`,
      k = {};
    ((k[b] = k[x] = k[S] = k[C] = k[w] = k[T] = k[E] = k[D] = k[O] = !0),
      (k[a] =
        k[o] =
        k[v] =
        k[s] =
        k[y] =
        k[c] =
        k[l] =
        k[u] =
        k[d] =
        k[f] =
        k[p] =
        k[m] =
        k[h] =
        k[g] =
        k[_] =
          !1));
    function A(e) {
      return i(e) && r(e.length) && !!k[n(e)];
    }
    t.exports = A;
  }),
  eu = o((e, t) => {
    function n(e) {
      return function (t) {
        return e(t);
      };
    }
    t.exports = n;
  }),
  tu = o((e, t) => {
    var n = ta(),
      r = typeof e == `object` && e && !e.nodeType && e,
      i = r && typeof t == `object` && t && !t.nodeType && t,
      a = i && i.exports === r && n.process;
    t.exports = (function () {
      try {
        return (i && i.require && i.require(`util`).types) || (a && a.binding && a.binding(`util`));
      } catch {}
    })();
  }),
  nu = o((e, t) => {
    var n = $l(),
      r = eu(),
      i = tu(),
      a = i && i.isTypedArray;
    t.exports = a ? r(a) : n;
  }),
  ru = o((e, t) => {
    var n = Kl(),
      r = Jl(),
      i = ea(),
      a = Xl(),
      o = Zl(),
      s = nu(),
      c = Object.prototype.hasOwnProperty;
    function l(e, t) {
      var l = i(e),
        u = !l && r(e),
        d = !l && !u && a(e),
        f = !l && !u && !d && s(e),
        p = l || u || d || f,
        m = p ? n(e.length, String) : [],
        h = m.length;
      for (var g in e)
        (t || c.call(e, g)) &&
          !(
            p &&
            (g == `length` ||
              (d && (g == `offset` || g == `parent`)) ||
              (f && (g == `buffer` || g == `byteLength` || g == `byteOffset`)) ||
              o(g, h))
          ) &&
          m.push(g);
      return m;
    }
    t.exports = l;
  }),
  iu = o((e, t) => {
    var n = Object.prototype;
    function r(e) {
      var t = e && e.constructor;
      return e === ((typeof t == `function` && t.prototype) || n);
    }
    t.exports = r;
  }),
  au = o((e, t) => {
    function n(e, t) {
      return function (n) {
        return e(t(n));
      };
    }
    t.exports = n;
  }),
  ou = o((e, t) => {
    t.exports = au()(Object.keys, Object);
  }),
  su = o((e, t) => {
    var n = iu(),
      r = ou(),
      i = Object.prototype.hasOwnProperty;
    function a(e) {
      if (!n(e)) return r(e);
      var t = [];
      for (var a in Object(e)) i.call(e, a) && a != `constructor` && t.push(a);
      return t;
    }
    t.exports = a;
  }),
  cu = o((e, t) => {
    var n = da(),
      r = Ql();
    function i(e) {
      return e != null && r(e.length) && !n(e);
    }
    t.exports = i;
  }),
  lu = o((e, t) => {
    var n = ru(),
      r = su(),
      i = cu();
    function a(e) {
      return i(e) ? n(e) : r(e);
    }
    t.exports = a;
  }),
  uu = o((e, t) => {
    var n = Hl(),
      r = Gl(),
      i = lu();
    function a(e) {
      return n(e, i, r);
    }
    t.exports = a;
  }),
  du = o((e, t) => {
    var n = uu(),
      r = 1,
      i = Object.prototype.hasOwnProperty;
    function a(e, t, a, o, s, c) {
      var l = a & r,
        u = n(e),
        d = u.length;
      if (d != n(t).length && !l) return !1;
      for (var f = d; f--;) {
        var p = u[f];
        if (!(l ? p in t : i.call(t, p))) return !1;
      }
      var m = c.get(e),
        h = c.get(t);
      if (m && h) return m == t && h == e;
      var g = !0;
      (c.set(e, t), c.set(t, e));
      for (var _ = l; ++f < d;) {
        p = u[f];
        var v = e[p],
          y = t[p];
        if (o) var b = l ? o(y, v, p, t, e, c) : o(v, y, p, e, t, c);
        if (!(b === void 0 ? v === y || s(v, y, a, o, c) : b)) {
          g = !1;
          break;
        }
        _ ||= p == `constructor`;
      }
      if (g && !_) {
        var x = e.constructor,
          S = t.constructor;
        x != S &&
          `constructor` in e &&
          `constructor` in t &&
          !(typeof x == `function` && x instanceof x && typeof S == `function` && S instanceof S) &&
          (g = !1);
      }
      return (c.delete(e), c.delete(t), g);
    }
    t.exports = a;
  }),
  fu = o((e, t) => {
    t.exports = _a()(na(), `DataView`);
  }),
  pu = o((e, t) => {
    t.exports = _a()(na(), `Promise`);
  }),
  mu = o((e, t) => {
    t.exports = _a()(na(), `Set`);
  }),
  hu = o((e, t) => {
    t.exports = _a()(na(), `WeakMap`);
  }),
  gu = o((e, t) => {
    var n = fu(),
      r = Na(),
      i = pu(),
      a = mu(),
      o = hu(),
      s = oa(),
      c = ma(),
      l = `[object Map]`,
      u = `[object Object]`,
      d = `[object Promise]`,
      f = `[object Set]`,
      p = `[object WeakMap]`,
      m = `[object DataView]`,
      h = c(n),
      g = c(r),
      _ = c(i),
      v = c(a),
      y = c(o),
      b = s;
    (((n && b(new n(new ArrayBuffer(1))) != m) ||
      (r && b(new r()) != l) ||
      (i && b(i.resolve()) != d) ||
      (a && b(new a()) != f) ||
      (o && b(new o()) != p)) &&
      (b = function (e) {
        var t = s(e),
          n = t == u ? e.constructor : void 0,
          r = n ? c(n) : ``;
        if (r)
          switch (r) {
            case h:
              return m;
            case g:
              return l;
            case _:
              return d;
            case v:
              return f;
            case y:
              return p;
          }
        return t;
      }),
      (t.exports = b));
  }),
  _u = o((e, t) => {
    var n = Al(),
      r = Il(),
      i = Bl(),
      a = du(),
      o = gu(),
      s = ea(),
      c = Xl(),
      l = nu(),
      u = 1,
      d = `[object Arguments]`,
      f = `[object Array]`,
      p = `[object Object]`,
      m = Object.prototype.hasOwnProperty;
    function h(e, t, h, g, _, v) {
      var y = s(e),
        b = s(t),
        x = y ? f : o(e),
        S = b ? f : o(t);
      ((x = x == d ? p : x), (S = S == d ? p : S));
      var C = x == p,
        w = S == p,
        T = x == S;
      if (T && c(e)) {
        if (!c(t)) return !1;
        ((y = !0), (C = !1));
      }
      if (T && !C)
        return ((v ||= new n()), y || l(e) ? r(e, t, h, g, _, v) : i(e, t, x, h, g, _, v));
      if (!(h & u)) {
        var E = C && m.call(e, `__wrapped__`),
          D = w && m.call(t, `__wrapped__`);
        if (E || D) {
          var O = E ? e.value() : e,
            k = D ? t.value() : t;
          return ((v ||= new n()), _(O, k, h, g, v));
        }
      }
      return T ? ((v ||= new n()), a(e, t, h, g, _, v)) : !1;
    }
    t.exports = h;
  }),
  vu = o((e, t) => {
    var n = _u(),
      r = sa();
    function i(e, t, a, o, s) {
      return e === t
        ? !0
        : e == null || t == null || (!r(e) && !r(t))
          ? e !== e && t !== t
          : n(e, t, a, o, i, s);
    }
    t.exports = i;
  }),
  yu = o((e, t) => {
    var n = Al(),
      r = vu(),
      i = 1,
      a = 2;
    function o(e, t, o, s) {
      var c = o.length,
        l = c,
        u = !s;
      if (e == null) return !l;
      for (e = Object(e); c--;) {
        var d = o[c];
        if (u && d[2] ? d[1] !== e[d[0]] : !(d[0] in e)) return !1;
      }
      for (; ++c < l;) {
        d = o[c];
        var f = d[0],
          p = e[f],
          m = d[1];
        if (u && d[2]) {
          if (p === void 0 && !(f in e)) return !1;
        } else {
          var h = new n();
          if (s) var g = s(p, m, f, e, t, h);
          if (!(g === void 0 ? r(m, p, i | a, s, h) : g)) return !1;
        }
      }
      return !0;
    }
    t.exports = o;
  }),
  bu = o((e, t) => {
    var n = ua();
    function r(e) {
      return e === e && !n(e);
    }
    t.exports = r;
  }),
  xu = o((e, t) => {
    var n = bu(),
      r = lu();
    function i(e) {
      for (var t = r(e), i = t.length; i--;) {
        var a = t[i],
          o = e[a];
        t[i] = [a, o, n(o)];
      }
      return t;
    }
    t.exports = i;
  }),
  Su = o((e, t) => {
    function n(e, t) {
      return function (n) {
        return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
      };
    }
    t.exports = n;
  }),
  Cu = o((e, t) => {
    var n = yu(),
      r = xu(),
      i = Su();
    function a(e) {
      var t = r(e);
      return t.length == 1 && t[0][2]
        ? i(t[0][0], t[0][1])
        : function (r) {
            return r === e || n(r, e, t);
          };
    }
    t.exports = a;
  }),
  wu = o((e, t) => {
    function n(e, t) {
      return e != null && t in Object(e);
    }
    t.exports = n;
  }),
  Tu = o((e, t) => {
    var n = Ja(),
      r = Jl(),
      i = ea(),
      a = Zl(),
      o = Ql(),
      s = Ya();
    function c(e, t, c) {
      t = n(t, e);
      for (var l = -1, u = t.length, d = !1; ++l < u;) {
        var f = s(t[l]);
        if (!(d = e != null && c(e, f))) break;
        e = e[f];
      }
      return d || ++l != u
        ? d
        : ((u = e == null ? 0 : e.length), !!u && o(u) && a(f, u) && (i(e) || r(e)));
    }
    t.exports = c;
  }),
  Eu = o((e, t) => {
    var n = wu(),
      r = Tu();
    function i(e, t) {
      return e != null && r(e, t, n);
    }
    t.exports = i;
  }),
  Du = o((e, t) => {
    var n = vu(),
      r = Za(),
      i = Eu(),
      a = la(),
      o = bu(),
      s = Su(),
      c = Ya(),
      l = 1,
      u = 2;
    function d(e, t) {
      return a(e) && o(t)
        ? s(c(e), t)
        : function (a) {
            var o = r(a, e);
            return o === void 0 && o === t ? i(a, e) : n(t, o, l | u);
          };
    }
    t.exports = d;
  }),
  Ou = o((e, t) => {
    function n(e) {
      return e;
    }
    t.exports = n;
  }),
  ku = o((e, t) => {
    function n(e) {
      return function (t) {
        return t?.[e];
      };
    }
    t.exports = n;
  }),
  Au = o((e, t) => {
    var n = Xa();
    function r(e) {
      return function (t) {
        return n(t, e);
      };
    }
    t.exports = r;
  }),
  ju = o((e, t) => {
    var n = ku(),
      r = Au(),
      i = la(),
      a = Ya();
    function o(e) {
      return i(e) ? n(a(e)) : r(e);
    }
    t.exports = o;
  }),
  Mu = o((e, t) => {
    var n = Cu(),
      r = Du(),
      i = Ou(),
      a = ea(),
      o = ju();
    function s(e) {
      return typeof e == `function`
        ? e
        : e == null
          ? i
          : typeof e == `object`
            ? a(e)
              ? r(e[0], e[1])
              : n(e)
            : o(e);
    }
    t.exports = s;
  }),
  Nu = o((e, t) => {
    function n(e, t, n, r) {
      for (var i = e.length, a = n + (r ? 1 : -1); r ? a-- : ++a < i;) if (t(e[a], a, e)) return a;
      return -1;
    }
    t.exports = n;
  }),
  Pu = o((e, t) => {
    function n(e) {
      return e !== e;
    }
    t.exports = n;
  }),
  Fu = o((e, t) => {
    function n(e, t, n) {
      for (var r = n - 1, i = e.length; ++r < i;) if (e[r] === t) return r;
      return -1;
    }
    t.exports = n;
  }),
  Iu = o((e, t) => {
    var n = Nu(),
      r = Pu(),
      i = Fu();
    function a(e, t, a) {
      return t === t ? i(e, t, a) : n(e, r, a);
    }
    t.exports = a;
  }),
  Lu = o((e, t) => {
    var n = Iu();
    function r(e, t) {
      return !!(e != null && e.length) && n(e, t, 0) > -1;
    }
    t.exports = r;
  }),
  Ru = o((e, t) => {
    function n(e, t, n) {
      for (var r = -1, i = e == null ? 0 : e.length; ++r < i;) if (n(t, e[r])) return !0;
      return !1;
    }
    t.exports = n;
  }),
  zu = o((e, t) => {
    function n() {}
    t.exports = n;
  }),
  Bu = o((e, t) => {
    var n = mu(),
      r = zu(),
      i = zl();
    t.exports =
      n && 1 / i(new n([, -0]))[1] == 1 / 0
        ? function (e) {
            return new n(e);
          }
        : r;
  }),
  Vu = o((e, t) => {
    var n = Nl(),
      r = Lu(),
      i = Ru(),
      a = Fl(),
      o = Bu(),
      s = zl(),
      c = 200;
    function l(e, t, l) {
      var u = -1,
        d = r,
        f = e.length,
        p = !0,
        m = [],
        h = m;
      if (l) ((p = !1), (d = i));
      else if (f >= c) {
        var g = t ? null : o(e);
        if (g) return s(g);
        ((p = !1), (d = a), (h = new n()));
      } else h = t ? [] : m;
      outer: for (; ++u < f;) {
        var _ = e[u],
          v = t ? t(_) : _;
        if (((_ = l || _ !== 0 ? _ : 0), p && v === v)) {
          for (var y = h.length; y--;) if (h[y] === v) continue outer;
          (t && h.push(v), m.push(_));
        } else d(h, v, l) || (h !== m && h.push(v), m.push(_));
      }
      return m;
    }
    t.exports = l;
  }),
  Hu = r(
    o((e, t) => {
      var n = Mu(),
        r = Vu();
      function i(e, t) {
        return e && e.length ? r(e, n(t, 2)) : [];
      }
      t.exports = i;
    })()
  );
function Uu(e, t, n) {
  return t === !0 ? (0, Hu.default)(e, n) : (0, U.default)(t) ? (0, Hu.default)(e, t) : e;
}
function Wu(e) {
  '@babel/helpers - typeof';
  return (
    (Wu =
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
    Wu(e)
  );
}
var Gu = [`ref`];
function Ku(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function qu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Ku(Object(n), !0).forEach(function (t) {
          id(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ku(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Ju(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function Yu(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, ad(r.key), r));
  }
}
function Xu(e, t, n) {
  return (
    t && Yu(e.prototype, t),
    n && Yu(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function Zu(e, t, n) {
  return (
    (t = ed(t)),
    Qu(e, $u() ? Reflect.construct(t, n || [], ed(e).constructor) : t.apply(e, n))
  );
}
function Qu(e, t) {
  if (t && (Wu(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return td(e);
}
function $u() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return ($u = function () {
    return !!e;
  })();
}
function ed(e) {
  return (
    (ed = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    ed(e)
  );
}
function td(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function nd(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && rd(e, t));
}
function rd(e, t) {
  return (
    (rd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    rd(e, t)
  );
}
function id(e, t, n) {
  return (
    (t = ad(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function ad(e) {
  var t = od(e, `string`);
  return Wu(t) == `symbol` ? t : String(t);
}
function od(e, t) {
  if (Wu(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Wu(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function sd(e, t) {
  if (e == null) return {};
  var n = cd(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function cd(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function ld(e) {
  return e.value;
}
function ud(e, t) {
  if (z.isValidElement(e)) return z.cloneElement(e, t);
  if (typeof e == `function`) return z.createElement(e, t);
  t.ref;
  var n = sd(t, Gu);
  return z.createElement(wl, n);
}
var dd = 1,
  fd = (function (e) {
    nd(t, e);
    function t() {
      var e;
      Ju(this, t);
      var n = [...arguments];
      return (
        (e = Zu(this, t, [].concat(n))),
        id(td(e), `lastBoundingBox`, { width: -1, height: -1 }),
        e
      );
    }
    return (
      Xu(
        t,
        [
          {
            key: `componentDidMount`,
            value: function () {
              this.updateBBox();
            },
          },
          {
            key: `componentDidUpdate`,
            value: function () {
              this.updateBBox();
            },
          },
          {
            key: `getBBox`,
            value: function () {
              if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
                var e = this.wrapperNode.getBoundingClientRect();
                return (
                  (e.height = this.wrapperNode.offsetHeight),
                  (e.width = this.wrapperNode.offsetWidth),
                  e
                );
              }
              return null;
            },
          },
          {
            key: `updateBBox`,
            value: function () {
              var e = this.props.onBBoxUpdate,
                t = this.getBBox();
              t
                ? (Math.abs(t.width - this.lastBoundingBox.width) > dd ||
                    Math.abs(t.height - this.lastBoundingBox.height) > dd) &&
                  ((this.lastBoundingBox.width = t.width),
                  (this.lastBoundingBox.height = t.height),
                  e && e(t))
                : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) &&
                  ((this.lastBoundingBox.width = -1),
                  (this.lastBoundingBox.height = -1),
                  e && e(null));
            },
          },
          {
            key: `getBBoxSnapshot`,
            value: function () {
              return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0
                ? qu({}, this.lastBoundingBox)
                : { width: 0, height: 0 };
            },
          },
          {
            key: `getDefaultPosition`,
            value: function (e) {
              var t = this.props,
                n = t.layout,
                r = t.align,
                i = t.verticalAlign,
                a = t.margin,
                o = t.chartWidth,
                s = t.chartHeight,
                c,
                l;
              if (
                !e ||
                ((e.left === void 0 || e.left === null) && (e.right === void 0 || e.right === null))
              )
                if (r === `center` && n === `vertical`) {
                  var u = this.getBBoxSnapshot();
                  c = { left: ((o || 0) - u.width) / 2 };
                } else
                  c = r === `right` ? { right: (a && a.right) || 0 } : { left: (a && a.left) || 0 };
              if (
                !e ||
                ((e.top === void 0 || e.top === null) && (e.bottom === void 0 || e.bottom === null))
              )
                if (i === `middle`) {
                  var d = this.getBBoxSnapshot();
                  l = { top: ((s || 0) - d.height) / 2 };
                } else
                  l =
                    i === `bottom` ? { bottom: (a && a.bottom) || 0 } : { top: (a && a.top) || 0 };
              return qu(qu({}, c), l);
            },
          },
          {
            key: `render`,
            value: function () {
              var e = this,
                t = this.props,
                n = t.content,
                r = t.width,
                i = t.height,
                a = t.wrapperStyle,
                o = t.payloadUniqBy,
                s = t.payload,
                c = qu(
                  qu(
                    { position: `absolute`, width: r || `auto`, height: i || `auto` },
                    this.getDefaultPosition(a)
                  ),
                  a
                );
              return z.createElement(
                `div`,
                {
                  className: `recharts-legend-wrapper`,
                  style: c,
                  ref: function (t) {
                    e.wrapperNode = t;
                  },
                },
                ud(n, qu(qu({}, this.props), {}, { payload: Uu(s, o, ld) }))
              );
            },
          },
        ],
        [
          {
            key: `getWithHeight`,
            value: function (e, t) {
              var n = e.props.layout;
              return n === `vertical` && V(e.props.height)
                ? { height: e.props.height }
                : n === `horizontal`
                  ? { width: e.props.width || t }
                  : null;
            },
          },
        ]
      ),
      t
    );
  })(z.PureComponent);
(id(fd, `displayName`, `Legend`),
  id(fd, `defaultProps`, {
    iconSize: 14,
    layout: `horizontal`,
    align: `center`,
    verticalAlign: `bottom`,
  }));
var pd = o((e, t) => {
    var n = ra(),
      r = Jl(),
      i = ea(),
      a = n ? n.isConcatSpreadable : void 0;
    function o(e) {
      return i(e) || r(e) || !!(a && e && e[a]);
    }
    t.exports = o;
  }),
  md = o((e, t) => {
    var n = Vl(),
      r = pd();
    function i(e, t, a, o, s) {
      var c = -1,
        l = e.length;
      for (a ||= r, s ||= []; ++c < l;) {
        var u = e[c];
        t > 0 && a(u) ? (t > 1 ? i(u, t - 1, a, o, s) : n(s, u)) : o || (s[s.length] = u);
      }
      return s;
    }
    t.exports = i;
  }),
  hd = o((e, t) => {
    function n(e) {
      return function (t, n, r) {
        for (var i = -1, a = Object(t), o = r(t), s = o.length; s--;) {
          var c = o[e ? s : ++i];
          if (n(a[c], c, a) === !1) break;
        }
        return t;
      };
    }
    t.exports = n;
  }),
  gd = o((e, t) => {
    t.exports = hd()();
  }),
  _d = o((e, t) => {
    var n = gd(),
      r = lu();
    function i(e, t) {
      return e && n(e, t, r);
    }
    t.exports = i;
  }),
  vd = o((e, t) => {
    var n = cu();
    function r(e, t) {
      return function (r, i) {
        if (r == null) return r;
        if (!n(r)) return e(r, i);
        for (
          var a = r.length, o = t ? a : -1, s = Object(r);
          (t ? o-- : ++o < a) && i(s[o], o, s) !== !1;
        );
        return r;
      };
    }
    t.exports = r;
  }),
  yd = o((e, t) => {
    var n = _d();
    t.exports = vd()(n);
  }),
  bd = o((e, t) => {
    var n = yd(),
      r = cu();
    function i(e, t) {
      var i = -1,
        a = r(e) ? Array(e.length) : [];
      return (
        n(e, function (e, n, r) {
          a[++i] = t(e, n, r);
        }),
        a
      );
    }
    t.exports = i;
  }),
  xd = o((e, t) => {
    function n(e, t) {
      var n = e.length;
      for (e.sort(t); n--;) e[n] = e[n].value;
      return e;
    }
    t.exports = n;
  }),
  Sd = o((e, t) => {
    var n = ca();
    function r(e, t) {
      if (e !== t) {
        var r = e !== void 0,
          i = e === null,
          a = e === e,
          o = n(e),
          s = t !== void 0,
          c = t === null,
          l = t === t,
          u = n(t);
        if (
          (!c && !u && !o && e > t) ||
          (o && s && l && !c && !u) ||
          (i && s && l) ||
          (!r && l) ||
          !a
        )
          return 1;
        if (
          (!i && !o && !u && e < t) ||
          (u && r && a && !i && !o) ||
          (c && r && a) ||
          (!s && a) ||
          !l
        )
          return -1;
      }
      return 0;
    }
    t.exports = r;
  }),
  Cd = o((e, t) => {
    var n = Sd();
    function r(e, t, r) {
      for (var i = -1, a = e.criteria, o = t.criteria, s = a.length, c = r.length; ++i < s;) {
        var l = n(a[i], o[i]);
        if (l) return i >= c ? l : l * (r[i] == `desc` ? -1 : 1);
      }
      return e.index - t.index;
    }
    t.exports = r;
  }),
  wd = o((e, t) => {
    var n = Ga(),
      r = Xa(),
      i = Mu(),
      a = bd(),
      o = xd(),
      s = eu(),
      c = Cd(),
      l = Ou(),
      u = ea();
    function d(e, t, d) {
      t = t.length
        ? n(t, function (e) {
            return u(e)
              ? function (t) {
                  return r(t, e.length === 1 ? e[0] : e);
                }
              : e;
          })
        : [l];
      var f = -1;
      return (
        (t = n(t, s(i))),
        o(
          a(e, function (e, r, i) {
            return {
              criteria: n(t, function (t) {
                return t(e);
              }),
              index: ++f,
              value: e,
            };
          }),
          function (e, t) {
            return c(e, t, d);
          }
        )
      );
    }
    t.exports = d;
  }),
  Td = o((e, t) => {
    function n(e, t, n) {
      switch (n.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, n[0]);
        case 2:
          return e.call(t, n[0], n[1]);
        case 3:
          return e.call(t, n[0], n[1], n[2]);
      }
      return e.apply(t, n);
    }
    t.exports = n;
  }),
  Ed = o((e, t) => {
    var n = Td(),
      r = Math.max;
    function i(e, t, i) {
      return (
        (t = r(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (var a = arguments, o = -1, s = r(a.length - t, 0), c = Array(s); ++o < s;)
            c[o] = a[t + o];
          o = -1;
          for (var l = Array(t + 1); ++o < t;) l[o] = a[o];
          return ((l[t] = i(c)), n(e, this, l));
        }
      );
    }
    t.exports = i;
  }),
  Dd = o((e, t) => {
    function n(e) {
      return function () {
        return e;
      };
    }
    t.exports = n;
  }),
  Od = o((e, t) => {
    var n = _a();
    t.exports = (function () {
      try {
        var e = n(Object, `defineProperty`);
        return (e({}, ``, {}), e);
      } catch {}
    })();
  }),
  kd = o((e, t) => {
    var n = Dd(),
      r = Od(),
      i = Ou();
    t.exports = r
      ? function (e, t) {
          return r(e, `toString`, { configurable: !0, enumerable: !1, value: n(t), writable: !0 });
        }
      : i;
  }),
  Ad = o((e, t) => {
    var n = 800,
      r = 16,
      i = Date.now;
    function a(e) {
      var t = 0,
        a = 0;
      return function () {
        var o = i(),
          s = r - (o - a);
        if (((a = o), s > 0)) {
          if (++t >= n) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    t.exports = a;
  }),
  jd = o((e, t) => {
    var n = kd();
    t.exports = Ad()(n);
  }),
  Md = o((e, t) => {
    var n = Ou(),
      r = Ed(),
      i = jd();
    function a(e, t) {
      return i(r(e, t, n), e + ``);
    }
    t.exports = a;
  }),
  Nd = o((e, t) => {
    var n = Ea(),
      r = cu(),
      i = Zl(),
      a = ua();
    function o(e, t, o) {
      if (!a(o)) return !1;
      var s = typeof t;
      return (s == `number` ? r(o) && i(t, o.length) : s == `string` && t in o) ? n(o[t], e) : !1;
    }
    t.exports = o;
  }),
  Pd = r(
    o((e, t) => {
      var n = md(),
        r = wd(),
        i = Md(),
        a = Nd();
      t.exports = i(function (e, t) {
        if (e == null) return [];
        var i = t.length;
        return (
          i > 1 && a(e, t[0], t[1]) ? (t = []) : i > 2 && a(t[0], t[1], t[2]) && (t = [t[0]]),
          r(e, n(t, 1), [])
        );
      });
    })()
  );
function Fd(e) {
  '@babel/helpers - typeof';
  return (
    (Fd =
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
    Fd(e)
  );
}
function Id() {
  return (
    (Id = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Id.apply(this, arguments)
  );
}
function Ld(e, t) {
  return Hd(e) || Vd(e, t) || zd(e, t) || Rd();
}
function Rd() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zd(e, t) {
  if (e) {
    if (typeof e == `string`) return Bd(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Bd(e, t);
  }
}
function Bd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Vd(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function Hd(e) {
  if (Array.isArray(e)) return e;
}
function Ud(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Wd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Ud(Object(n), !0).forEach(function (t) {
          Gd(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ud(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Gd(e, t, n) {
  return (
    (t = Kd(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Kd(e) {
  var t = qd(e, `string`);
  return Fd(t) == `symbol` ? t : String(t);
}
function qd(e, t) {
  if (Fd(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Fd(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function Jd(e) {
  return Array.isArray(e) && uo(e[0]) && uo(e[1]) ? e.join(` ~ `) : e;
}
var Yd = function (e) {
  var t = e.separator,
    n = t === void 0 ? ` : ` : t,
    r = e.contentStyle,
    i = r === void 0 ? {} : r,
    a = e.itemStyle,
    o = a === void 0 ? {} : a,
    s = e.labelStyle,
    c = s === void 0 ? {} : s,
    l = e.payload,
    u = e.formatter,
    d = e.itemSorter,
    f = e.wrapperClassName,
    p = e.labelClassName,
    m = e.label,
    h = e.labelFormatter,
    g = e.accessibilityLayer,
    _ = g === void 0 ? !1 : g,
    v = function () {
      if (l && l.length) {
        var e = { padding: 0, margin: 0 },
          t = (d ? (0, Pd.default)(l, d) : l).map(function (e, t) {
            if (e.type === `none`) return null;
            var r = Wd(
                { display: `block`, paddingTop: 4, paddingBottom: 4, color: e.color || `#000` },
                o
              ),
              i = e.formatter || u || Jd,
              a = e.value,
              s = e.name,
              c = a,
              d = s;
            if (i && c != null && d != null) {
              var f = i(a, s, e, t, l);
              if (Array.isArray(f)) {
                var p = Ld(f, 2);
                ((c = p[0]), (d = p[1]));
              } else c = f;
            }
            return z.createElement(
              `li`,
              { className: `recharts-tooltip-item`, key: `tooltip-item-${t}`, style: r },
              uo(d)
                ? z.createElement(`span`, { className: `recharts-tooltip-item-name` }, d)
                : null,
              uo(d)
                ? z.createElement(`span`, { className: `recharts-tooltip-item-separator` }, n)
                : null,
              z.createElement(`span`, { className: `recharts-tooltip-item-value` }, c),
              z.createElement(`span`, { className: `recharts-tooltip-item-unit` }, e.unit || ``)
            );
          });
        return z.createElement(`ul`, { className: `recharts-tooltip-item-list`, style: e }, t);
      }
      return null;
    },
    y = Wd(
      {
        margin: 0,
        padding: 10,
        backgroundColor: `#fff`,
        border: `1px solid #ccc`,
        whiteSpace: `nowrap`,
      },
      i
    ),
    b = Wd({ margin: 0 }, c),
    x = !(0, H.default)(m),
    S = x ? m : ``,
    C = F(`recharts-default-tooltip`, f),
    w = F(`recharts-tooltip-label`, p);
  x && h && l != null && (S = h(m, l));
  var T = _ ? { role: `status`, 'aria-live': `assertive` } : {};
  return z.createElement(
    `div`,
    Id({ className: C, style: y }, T),
    z.createElement(`p`, { className: w, style: b }, z.isValidElement(S) ? S : `${S}`),
    v()
  );
};
function Xd(e) {
  '@babel/helpers - typeof';
  return (
    (Xd =
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
    Xd(e)
  );
}
function Zd(e, t, n) {
  return (
    (t = Qd(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Qd(e) {
  var t = $d(e, `string`);
  return Xd(t) == `symbol` ? t : String(t);
}
function $d(e, t) {
  if (Xd(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Xd(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var ef = `recharts-tooltip-wrapper`,
  tf = { visibility: `hidden` };
function nf(e) {
  var t = e.coordinate,
    n = e.translateX,
    r = e.translateY;
  return F(
    ef,
    Zd(
      Zd(
        Zd(
          Zd({}, `${ef}-right`, V(n) && t && V(t.x) && n >= t.x),
          `${ef}-left`,
          V(n) && t && V(t.x) && n < t.x
        ),
        `${ef}-bottom`,
        V(r) && t && V(t.y) && r >= t.y
      ),
      `${ef}-top`,
      V(r) && t && V(t.y) && r < t.y
    )
  );
}
function rf(e) {
  var t = e.allowEscapeViewBox,
    n = e.coordinate,
    r = e.key,
    i = e.offsetTopLeft,
    a = e.position,
    o = e.reverseDirection,
    s = e.tooltipDimension,
    c = e.viewBox,
    l = e.viewBoxDimension;
  if (a && V(a[r])) return a[r];
  var u = n[r] - s - i,
    d = n[r] + i;
  return t[r]
    ? o[r]
      ? u
      : d
    : o[r]
      ? u < c[r]
        ? Math.max(d, c[r])
        : Math.max(u, c[r])
      : d + s > c[r] + l
        ? Math.max(u, c[r])
        : Math.max(d, c[r]);
}
function af(e) {
  var t = e.translateX,
    n = e.translateY;
  return {
    transform: e.useTranslate3d ? `translate3d(${t}px, ${n}px, 0)` : `translate(${t}px, ${n}px)`,
  };
}
function of(e) {
  var t = e.allowEscapeViewBox,
    n = e.coordinate,
    r = e.offsetTopLeft,
    i = e.position,
    a = e.reverseDirection,
    o = e.tooltipBox,
    s = e.useTranslate3d,
    c = e.viewBox,
    l,
    u,
    d;
  return (
    o.height > 0 && o.width > 0 && n
      ? ((u = rf({
          allowEscapeViewBox: t,
          coordinate: n,
          key: `x`,
          offsetTopLeft: r,
          position: i,
          reverseDirection: a,
          tooltipDimension: o.width,
          viewBox: c,
          viewBoxDimension: c.width,
        })),
        (d = rf({
          allowEscapeViewBox: t,
          coordinate: n,
          key: `y`,
          offsetTopLeft: r,
          position: i,
          reverseDirection: a,
          tooltipDimension: o.height,
          viewBox: c,
          viewBoxDimension: c.height,
        })),
        (l = af({ translateX: u, translateY: d, useTranslate3d: s })))
      : (l = tf),
    { cssProperties: l, cssClasses: nf({ translateX: u, translateY: d, coordinate: n }) }
  );
}
function sf(e) {
  '@babel/helpers - typeof';
  return (
    (sf =
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
    sf(e)
  );
}
function cf(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function lf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? cf(Object(n), !0).forEach(function (t) {
          bf(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : cf(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function uf(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function df(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, xf(r.key), r));
  }
}
function ff(e, t, n) {
  return (
    t && df(e.prototype, t),
    n && df(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function pf(e, t, n) {
  return (
    (t = gf(t)),
    mf(e, hf() ? Reflect.construct(t, n || [], gf(e).constructor) : t.apply(e, n))
  );
}
function mf(e, t) {
  if (t && (sf(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return _f(e);
}
function hf() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (hf = function () {
    return !!e;
  })();
}
function gf(e) {
  return (
    (gf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    gf(e)
  );
}
function _f(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function vf(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && yf(e, t));
}
function yf(e, t) {
  return (
    (yf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    yf(e, t)
  );
}
function bf(e, t, n) {
  return (
    (t = xf(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function xf(e) {
  var t = Sf(e, `string`);
  return sf(t) == `symbol` ? t : String(t);
}
function Sf(e, t) {
  if (sf(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (sf(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Cf = 1,
  wf = (function (e) {
    vf(t, e);
    function t() {
      var e;
      uf(this, t);
      var n = [...arguments];
      return (
        (e = pf(this, t, [].concat(n))),
        bf(_f(e), `state`, {
          dismissed: !1,
          dismissedAtCoordinate: { x: 0, y: 0 },
          lastBoundingBox: { width: -1, height: -1 },
        }),
        bf(_f(e), `handleKeyDown`, function (t) {
          t.key === `Escape` &&
            e.setState({
              dismissed: !0,
              dismissedAtCoordinate: {
                x: e.props.coordinate?.x ?? 0,
                y: e.props.coordinate?.y ?? 0,
              },
            });
        }),
        e
      );
    }
    return (
      ff(t, [
        {
          key: `updateBBox`,
          value: function () {
            if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
              var e = this.wrapperNode.getBoundingClientRect();
              (Math.abs(e.width - this.state.lastBoundingBox.width) > Cf ||
                Math.abs(e.height - this.state.lastBoundingBox.height) > Cf) &&
                this.setState({ lastBoundingBox: { width: e.width, height: e.height } });
            } else
              (this.state.lastBoundingBox.width !== -1 ||
                this.state.lastBoundingBox.height !== -1) &&
                this.setState({ lastBoundingBox: { width: -1, height: -1 } });
          },
        },
        {
          key: `componentDidMount`,
          value: function () {
            (document.addEventListener(`keydown`, this.handleKeyDown), this.updateBBox());
          },
        },
        {
          key: `componentWillUnmount`,
          value: function () {
            document.removeEventListener(`keydown`, this.handleKeyDown);
          },
        },
        {
          key: `componentDidUpdate`,
          value: function () {
            (this.props.active && this.updateBBox(),
              this.state.dismissed &&
                (this.props.coordinate?.x !== this.state.dismissedAtCoordinate.x ||
                  this.props.coordinate?.y !== this.state.dismissedAtCoordinate.y) &&
                (this.state.dismissed = !1));
          },
        },
        {
          key: `render`,
          value: function () {
            var e = this,
              t = this.props,
              n = t.active,
              r = t.allowEscapeViewBox,
              i = t.animationDuration,
              a = t.animationEasing,
              o = t.children,
              s = t.coordinate,
              c = t.hasPayload,
              l = t.isAnimationActive,
              u = t.offset,
              d = t.position,
              f = t.reverseDirection,
              p = t.useTranslate3d,
              m = t.viewBox,
              h = t.wrapperStyle,
              g = of({
                allowEscapeViewBox: r,
                coordinate: s,
                offsetTopLeft: u,
                position: d,
                reverseDirection: f,
                tooltipBox: this.state.lastBoundingBox,
                useTranslate3d: p,
                viewBox: m,
              }),
              _ = g.cssClasses,
              v = g.cssProperties,
              y = lf(
                lf({ transition: l && n ? `transform ${i}ms ${a}` : void 0 }, v),
                {},
                {
                  pointerEvents: `none`,
                  visibility: !this.state.dismissed && n && c ? `visible` : `hidden`,
                  position: `absolute`,
                  top: 0,
                  left: 0,
                },
                h
              );
            return z.createElement(
              `div`,
              {
                tabIndex: -1,
                className: _,
                style: y,
                ref: function (t) {
                  e.wrapperNode = t;
                },
              },
              o
            );
          },
        },
      ]),
      t
    );
  })(z.PureComponent),
  Tf = {
    isSsr: (function () {
      return !(
        typeof window < `u` &&
        window.document &&
        window.document.createElement &&
        window.setTimeout
      );
    })(),
    get: function (e) {
      return Tf[e];
    },
    set: function (e, t) {
      if (typeof e == `string`) Tf[e] = t;
      else {
        var n = Object.keys(e);
        n &&
          n.length &&
          n.forEach(function (t) {
            Tf[t] = e[t];
          });
      }
    },
  };
function Ef(e) {
  '@babel/helpers - typeof';
  return (
    (Ef =
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
    Ef(e)
  );
}
function Df(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Of(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Df(Object(n), !0).forEach(function (t) {
          zf(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Df(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function kf(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function Af(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, Bf(r.key), r));
  }
}
function jf(e, t, n) {
  return (
    t && Af(e.prototype, t),
    n && Af(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function Mf(e, t, n) {
  return (
    (t = If(t)),
    Nf(e, Ff() ? Reflect.construct(t, n || [], If(e).constructor) : t.apply(e, n))
  );
}
function Nf(e, t) {
  if (t && (Ef(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return Pf(e);
}
function Pf(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function Ff() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (Ff = function () {
    return !!e;
  })();
}
function If(e) {
  return (
    (If = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    If(e)
  );
}
function Lf(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Rf(e, t));
}
function Rf(e, t) {
  return (
    (Rf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    Rf(e, t)
  );
}
function zf(e, t, n) {
  return (
    (t = Bf(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Bf(e) {
  var t = Vf(e, `string`);
  return Ef(t) == `symbol` ? t : String(t);
}
function Vf(e, t) {
  if (Ef(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Ef(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function Hf(e) {
  return e.dataKey;
}
function Uf(e, t) {
  return z.isValidElement(e)
    ? z.cloneElement(e, t)
    : typeof e == `function`
      ? z.createElement(e, t)
      : z.createElement(Yd, t);
}
var Wf = (function (e) {
  Lf(t, e);
  function t() {
    return (kf(this, t), Mf(this, t, arguments));
  }
  return (
    jf(t, [
      {
        key: `render`,
        value: function () {
          var e = this,
            t = this.props,
            n = t.active,
            r = t.allowEscapeViewBox,
            i = t.animationDuration,
            a = t.animationEasing,
            o = t.content,
            s = t.coordinate,
            c = t.filterNull,
            l = t.isAnimationActive,
            u = t.offset,
            d = t.payload,
            f = t.payloadUniqBy,
            p = t.position,
            m = t.reverseDirection,
            h = t.useTranslate3d,
            g = t.viewBox,
            _ = t.wrapperStyle,
            v = d ?? [];
          c &&
            v.length &&
            (v = Uu(
              d.filter(function (t) {
                return t.value != null && (t.hide !== !0 || e.props.includeHidden);
              }),
              f,
              Hf
            ));
          var y = v.length > 0;
          return z.createElement(
            wf,
            {
              allowEscapeViewBox: r,
              animationDuration: i,
              animationEasing: a,
              isAnimationActive: l,
              active: n,
              coordinate: s,
              hasPayload: y,
              offset: u,
              position: p,
              reverseDirection: m,
              useTranslate3d: h,
              viewBox: g,
              wrapperStyle: _,
            },
            Uf(o, Of(Of({}, this.props), {}, { payload: v }))
          );
        },
      },
    ]),
    t
  );
})(z.PureComponent);
(zf(Wf, `displayName`, `Tooltip`),
  zf(Wf, `defaultProps`, {
    accessibilityLayer: !1,
    allowEscapeViewBox: { x: !1, y: !1 },
    animationDuration: 400,
    animationEasing: `ease`,
    contentStyle: {},
    coordinate: { x: 0, y: 0 },
    cursor: !0,
    cursorStyle: {},
    filterNull: !0,
    isAnimationActive: !Tf.isSsr,
    itemStyle: {},
    labelStyle: {},
    offset: 10,
    reverseDirection: { x: !1, y: !1 },
    separator: ` : `,
    trigger: `hover`,
    useTranslate3d: !1,
    viewBox: { x: 0, y: 0, height: 0, width: 0 },
    wrapperStyle: {},
  }));
var Gf = o((e, t) => {
    var n = na();
    t.exports = function () {
      return n.Date.now();
    };
  }),
  Kf = o((e, t) => {
    var n = /\s/;
    function r(e) {
      for (var t = e.length; t-- && n.test(e.charAt(t)););
      return t;
    }
    t.exports = r;
  }),
  qf = o((e, t) => {
    var n = Kf(),
      r = /^\s+/;
    function i(e) {
      return e && e.slice(0, n(e) + 1).replace(r, ``);
    }
    t.exports = i;
  }),
  Jf = o((e, t) => {
    var n = qf(),
      r = ua(),
      i = ca(),
      a = NaN,
      o = /^[-+]0x[0-9a-f]+$/i,
      s = /^0b[01]+$/i,
      c = /^0o[0-7]+$/i,
      l = parseInt;
    function u(e) {
      if (typeof e == `number`) return e;
      if (i(e)) return a;
      if (r(e)) {
        var t = typeof e.valueOf == `function` ? e.valueOf() : e;
        e = r(t) ? t + `` : t;
      }
      if (typeof e != `string`) return e === 0 ? e : +e;
      e = n(e);
      var u = s.test(e);
      return u || c.test(e) ? l(e.slice(2), u ? 2 : 8) : o.test(e) ? a : +e;
    }
    t.exports = u;
  }),
  Yf = o((e, t) => {
    var n = ua(),
      r = Gf(),
      i = Jf(),
      a = `Expected a function`,
      o = Math.max,
      s = Math.min;
    function c(e, t, c) {
      var l,
        u,
        d,
        f,
        p,
        m,
        h = 0,
        g = !1,
        _ = !1,
        v = !0;
      if (typeof e != `function`) throw TypeError(a);
      ((t = i(t) || 0),
        n(c) &&
          ((g = !!c.leading),
          (_ = `maxWait` in c),
          (d = _ ? o(i(c.maxWait) || 0, t) : d),
          (v = `trailing` in c ? !!c.trailing : v)));
      function y(t) {
        var n = l,
          r = u;
        return ((l = u = void 0), (h = t), (f = e.apply(r, n)), f);
      }
      function b(e) {
        return ((h = e), (p = setTimeout(C, t)), g ? y(e) : f);
      }
      function x(e) {
        var n = e - m,
          r = e - h,
          i = t - n;
        return _ ? s(i, d - r) : i;
      }
      function S(e) {
        var n = e - m,
          r = e - h;
        return m === void 0 || n >= t || n < 0 || (_ && r >= d);
      }
      function C() {
        var e = r();
        if (S(e)) return w(e);
        p = setTimeout(C, x(e));
      }
      function w(e) {
        return ((p = void 0), v && l ? y(e) : ((l = u = void 0), f));
      }
      function T() {
        (p !== void 0 && clearTimeout(p), (h = 0), (l = m = u = p = void 0));
      }
      function E() {
        return p === void 0 ? f : w(r());
      }
      function D() {
        var e = r(),
          n = S(e);
        if (((l = arguments), (u = this), (m = e), n)) {
          if (p === void 0) return b(m);
          if (_) return (clearTimeout(p), (p = setTimeout(C, t)), y(m));
        }
        return (p === void 0 && (p = setTimeout(C, t)), f);
      }
      return ((D.cancel = T), (D.flush = E), D);
    }
    t.exports = c;
  }),
  Xf = r(
    o((e, t) => {
      var n = Yf(),
        r = ua(),
        i = `Expected a function`;
      function a(e, t, a) {
        var o = !0,
          s = !0;
        if (typeof e != `function`) throw TypeError(i);
        return (
          r(a) &&
            ((o = `leading` in a ? !!a.leading : o), (s = `trailing` in a ? !!a.trailing : s)),
          n(e, t, { leading: o, maxWait: t, trailing: s })
        );
      }
      t.exports = a;
    })()
  );
function Zf(e) {
  '@babel/helpers - typeof';
  return (
    (Zf =
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
    Zf(e)
  );
}
function Qf(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function $f(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Qf(Object(n), !0).forEach(function (t) {
          ep(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Qf(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function ep(e, t, n) {
  return (
    (t = tp(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function tp(e) {
  var t = np(e, `string`);
  return Zf(t) == `symbol` ? t : String(t);
}
function np(e, t) {
  if (Zf(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Zf(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function rp(e, t) {
  return cp(e) || sp(e, t) || ap(e, t) || ip();
}
function ip() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ap(e, t) {
  if (e) {
    if (typeof e == `string`) return op(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return op(e, t);
  }
}
function op(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function sp(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function cp(e) {
  if (Array.isArray(e)) return e;
}
var lp = (0, z.forwardRef)(function (e, t) {
    var n = e.aspect,
      r = e.initialDimension,
      i = r === void 0 ? { width: -1, height: -1 } : r,
      a = e.width,
      o = a === void 0 ? `100%` : a,
      s = e.height,
      c = s === void 0 ? `100%` : s,
      l = e.minWidth,
      u = l === void 0 ? 0 : l,
      d = e.minHeight,
      f = e.maxHeight,
      p = e.children,
      m = e.debounce,
      h = m === void 0 ? 0 : m,
      g = e.id,
      _ = e.className,
      v = e.onResize,
      y = e.style,
      b = y === void 0 ? {} : y,
      x = (0, z.useRef)(null),
      S = (0, z.useRef)();
    ((S.current = v),
      (0, z.useImperativeHandle)(t, function () {
        return Object.defineProperty(x.current, 'current', {
          get: function () {
            return (
              console.warn(
                `The usage of ref.current.current is deprecated and will no longer be supported.`
              ),
              x.current
            );
          },
          configurable: !0,
        });
      }));
    var C = rp((0, z.useState)({ containerWidth: i.width, containerHeight: i.height }), 2),
      w = C[0],
      T = C[1],
      E = (0, z.useCallback)(function (e, t) {
        T(function (n) {
          var r = Math.round(e),
            i = Math.round(t);
          return n.containerWidth === r && n.containerHeight === i
            ? n
            : { containerWidth: r, containerHeight: i };
        });
      }, []);
    (0, z.useEffect)(
      function () {
        var e = function (e) {
          var t,
            n = e[0].contentRect,
            r = n.width,
            i = n.height;
          (E(r, i), (t = S.current) == null || t.call(S, r, i));
        };
        h > 0 && (e = (0, Xf.default)(e, h, { trailing: !0, leading: !1 }));
        var t = new ResizeObserver(e),
          n = x.current.getBoundingClientRect(),
          r = n.width,
          i = n.height;
        return (
          E(r, i),
          t.observe(x.current),
          function () {
            t.disconnect();
          }
        );
      },
      [E, h]
    );
    var D = (0, z.useMemo)(
      function () {
        var e = w.containerWidth,
          t = w.containerHeight;
        if (e < 0 || t < 0) return null;
        (ds(
          lo(o) || lo(c),
          `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`,
          o,
          c
        ),
          ds(!n || n > 0, `The aspect(%s) must be greater than zero.`, n));
        var r = lo(o) ? e : o,
          i = lo(c) ? t : c;
        (n && n > 0 && (r ? (i = r / n) : i && (r = i * n), f && i > f && (i = f)),
          ds(
            r > 0 || i > 0,
            `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
            r,
            i,
            o,
            c,
            u,
            d,
            n
          ));
        var a = !Array.isArray(p) && (0, jo.isElement)(p) && Ro(p.type).endsWith(`Chart`);
        return z.Children.map(p, function (e) {
          return (0, jo.isElement)(e)
            ? (0, z.cloneElement)(
                e,
                $f(
                  { width: r, height: i },
                  a
                    ? {
                        style: $f(
                          { height: `100%`, width: `100%`, maxHeight: i, maxWidth: r },
                          e.props.style
                        ),
                      }
                    : {}
                )
              )
            : e;
        });
      },
      [n, p, c, f, d, u, w, o]
    );
    return z.createElement(
      `div`,
      {
        id: g ? `${g}` : void 0,
        className: F(`recharts-responsive-container`, _),
        style: $f($f({}, b), {}, { width: o, height: c, minWidth: u, minHeight: d, maxHeight: f }),
        ref: x,
      },
      D
    );
  }),
  up = function (e) {
    return null;
  };
up.displayName = `Cell`;
function dp(e) {
  '@babel/helpers - typeof';
  return (
    (dp =
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
    dp(e)
  );
}
function fp(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function pp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? fp(Object(n), !0).forEach(function (t) {
          mp(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : fp(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function mp(e, t, n) {
  return (
    (t = hp(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function hp(e) {
  var t = gp(e, `string`);
  return dp(t) == `symbol` ? t : String(t);
}
function gp(e, t) {
  if (dp(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (dp(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var _p = { widthCache: {}, cacheCount: 0 },
  vp = 2e3,
  yp = {
    position: `absolute`,
    top: `-20000px`,
    left: 0,
    padding: 0,
    margin: 0,
    border: `none`,
    whiteSpace: `pre`,
  },
  bp = `recharts_measurement_span`;
function xp(e) {
  var t = pp({}, e);
  return (
    Object.keys(t).forEach(function (e) {
      t[e] || delete t[e];
    }),
    t
  );
}
var Sp = function (e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (e == null || Tf.isSsr) return { width: 0, height: 0 };
    var n = xp(t),
      r = JSON.stringify({ text: e, copyStyle: n });
    if (_p.widthCache[r]) return _p.widthCache[r];
    try {
      var i = document.getElementById(bp);
      i ||
        ((i = document.createElement(`span`)),
        i.setAttribute(`id`, bp),
        i.setAttribute(`aria-hidden`, `true`),
        document.body.appendChild(i));
      var a = pp(pp({}, yp), n);
      (Object.assign(i.style, a), (i.textContent = `${e}`));
      var o = i.getBoundingClientRect(),
        s = { width: o.width, height: o.height };
      return (
        (_p.widthCache[r] = s),
        ++_p.cacheCount > vp && ((_p.cacheCount = 0), (_p.widthCache = {})),
        s
      );
    } catch {
      return { width: 0, height: 0 };
    }
  },
  Cp = function (e) {
    return {
      top: e.top + window.scrollY - document.documentElement.clientTop,
      left: e.left + window.scrollX - document.documentElement.clientLeft,
    };
  };
function wp(e) {
  '@babel/helpers - typeof';
  return (
    (wp =
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
    wp(e)
  );
}
function Tp(e, t) {
  return Ap(e) || kp(e, t) || Dp(e, t) || Ep();
}
function Ep() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Dp(e, t) {
  if (e) {
    if (typeof e == `string`) return Op(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Op(e, t);
  }
}
function Op(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function kp(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function Ap(e) {
  if (Array.isArray(e)) return e;
}
function jp(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function Mp(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, Pp(r.key), r));
  }
}
function Np(e, t, n) {
  return (
    t && Mp(e.prototype, t),
    n && Mp(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function Pp(e) {
  var t = Fp(e, `string`);
  return wp(t) == `symbol` ? t : String(t);
}
function Fp(e, t) {
  if (wp(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (wp(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Ip = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  Lp = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  Rp = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  zp = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  Bp = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1,
  },
  Vp = Object.keys(Bp),
  Hp = `NaN`;
function Up(e, t) {
  return e * Bp[t];
}
var Wp = (function () {
  function e(t, n) {
    (jp(this, e),
      (this.num = t),
      (this.unit = n),
      (this.num = t),
      (this.unit = n),
      Number.isNaN(t) && (this.unit = ``),
      n !== `` && !Rp.test(n) && ((this.num = NaN), (this.unit = ``)),
      Vp.includes(n) && ((this.num = Up(t, n)), (this.unit = `px`)));
  }
  return (
    Np(
      e,
      [
        {
          key: `add`,
          value: function (t) {
            return this.unit === t.unit ? new e(this.num + t.num, this.unit) : new e(NaN, ``);
          },
        },
        {
          key: `subtract`,
          value: function (t) {
            return this.unit === t.unit ? new e(this.num - t.num, this.unit) : new e(NaN, ``);
          },
        },
        {
          key: `multiply`,
          value: function (t) {
            return this.unit !== `` && t.unit !== `` && this.unit !== t.unit
              ? new e(NaN, ``)
              : new e(this.num * t.num, this.unit || t.unit);
          },
        },
        {
          key: `divide`,
          value: function (t) {
            return this.unit !== `` && t.unit !== `` && this.unit !== t.unit
              ? new e(NaN, ``)
              : new e(this.num / t.num, this.unit || t.unit);
          },
        },
        {
          key: `toString`,
          value: function () {
            return `${this.num}${this.unit}`;
          },
        },
        {
          key: `isNaN`,
          value: function () {
            return Number.isNaN(this.num);
          },
        },
      ],
      [
        {
          key: `parse`,
          value: function (t) {
            var n = Tp(zp.exec(t) ?? [], 3),
              r = n[1],
              i = n[2];
            return new e(parseFloat(r), i ?? ``);
          },
        },
      ]
    ),
    e
  );
})();
function Gp(e) {
  if (e.includes(Hp)) return Hp;
  for (var t = e; t.includes(`*`) || t.includes(`/`);) {
    var n = Tp(Ip.exec(t) ?? [], 4),
      r = n[1],
      i = n[2],
      a = n[3],
      o = Wp.parse(r ?? ``),
      s = Wp.parse(a ?? ``),
      c = i === `*` ? o.multiply(s) : o.divide(s);
    if (c.isNaN()) return Hp;
    t = t.replace(Ip, c.toString());
  }
  for (; t.includes(`+`) || /.-\d+(?:\.\d+)?/.test(t);) {
    var l = Tp(Lp.exec(t) ?? [], 4),
      u = l[1],
      d = l[2],
      f = l[3],
      p = Wp.parse(u ?? ``),
      m = Wp.parse(f ?? ``),
      h = d === `+` ? p.add(m) : p.subtract(m);
    if (h.isNaN()) return Hp;
    t = t.replace(Lp, h.toString());
  }
  return t;
}
var Kp = /\(([^()]*)\)/;
function qp(e) {
  for (var t = e; t.includes(`(`);) {
    var n = Tp(Kp.exec(t), 2)[1];
    t = t.replace(Kp, Gp(n));
  }
  return t;
}
function Jp(e) {
  var t = e.replace(/\s+/g, ``);
  return ((t = qp(t)), (t = Gp(t)), t);
}
function Yp(e) {
  try {
    return Jp(e);
  } catch {
    return Hp;
  }
}
function Xp(e) {
  var t = Yp(e.slice(5, -1));
  return t === Hp ? `` : t;
}
var Zp = [
    `x`,
    `y`,
    `lineHeight`,
    `capHeight`,
    `scaleToFit`,
    `textAnchor`,
    `verticalAnchor`,
    `fill`,
  ],
  Qp = [`dx`, `dy`, `angle`, `className`, `breakAll`];
function $p() {
  return (
    ($p = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    $p.apply(this, arguments)
  );
}
function em(e, t) {
  if (e == null) return {};
  var n = tm(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function tm(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function nm(e, t) {
  return sm(e) || om(e, t) || im(e, t) || rm();
}
function rm() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function im(e, t) {
  if (e) {
    if (typeof e == `string`) return am(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return am(e, t);
  }
}
function am(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function om(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function sm(e) {
  if (Array.isArray(e)) return e;
}
var cm = /[ \f\n\r\t\v\u2028\u2029]+/,
  lm = function (e) {
    var t = e.children,
      n = e.breakAll,
      r = e.style;
    try {
      var i = [];
      return (
        (0, H.default)(t) || (i = n ? t.toString().split(``) : t.toString().split(cm)),
        {
          wordsWithComputedWidth: i.map(function (e) {
            return { word: e, width: Sp(e, r).width };
          }),
          spaceWidth: n ? 0 : Sp(`\xA0`, r).width,
        }
      );
    } catch {
      return null;
    }
  },
  um = function (e, t, n, r, i) {
    var a = e.maxLines,
      o = e.children,
      s = e.style,
      c = e.breakAll,
      l = V(a),
      u = o,
      d = function () {
        return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).reduce(
          function (e, t) {
            var a = t.word,
              o = t.width,
              s = e[e.length - 1];
            if (s && (r == null || i || s.width + o + n < Number(r)))
              (s.words.push(a), (s.width += o + n));
            else {
              var c = { words: [a], width: o };
              e.push(c);
            }
            return e;
          },
          []
        );
      },
      f = d(t),
      p = function (e) {
        return e.reduce(function (e, t) {
          return e.width > t.width ? e : t;
        });
      };
    if (!l) return f;
    for (
      var m = `…`,
        h = function (e) {
          var t = lm({ breakAll: c, style: s, children: u.slice(0, e) + m }).wordsWithComputedWidth,
            n = d(t);
          return [n.length > a || p(n).width > Number(r), n];
        },
        g = 0,
        _ = u.length - 1,
        v = 0,
        y;
      g <= _ && v <= u.length - 1;
    ) {
      var b = Math.floor((g + _) / 2),
        x = nm(h(b - 1), 2),
        S = x[0],
        C = x[1],
        w = nm(h(b), 1)[0];
      if ((!S && !w && (g = b + 1), S && w && (_ = b - 1), !S && w)) {
        y = C;
        break;
      }
      v++;
    }
    return y || f;
  },
  dm = function (e) {
    return [{ words: (0, H.default)(e) ? [] : e.toString().split(cm) }];
  },
  fm = function (e) {
    var t = e.width,
      n = e.scaleToFit,
      r = e.children,
      i = e.style,
      a = e.breakAll,
      o = e.maxLines;
    if ((t || n) && !Tf.isSsr) {
      var s,
        c,
        l = lm({ breakAll: a, children: r, style: i });
      if (l) {
        var u = l.wordsWithComputedWidth,
          d = l.spaceWidth;
        ((s = u), (c = d));
      } else return dm(r);
      return um({ breakAll: a, children: r, maxLines: o, style: i }, s, c, t, n);
    }
    return dm(r);
  },
  pm = `#808080`,
  mm = function (e) {
    var t = e.x,
      n = t === void 0 ? 0 : t,
      r = e.y,
      i = r === void 0 ? 0 : r,
      a = e.lineHeight,
      o = a === void 0 ? `1em` : a,
      s = e.capHeight,
      c = s === void 0 ? `0.71em` : s,
      l = e.scaleToFit,
      u = l === void 0 ? !1 : l,
      d = e.textAnchor,
      f = d === void 0 ? `start` : d,
      p = e.verticalAnchor,
      m = p === void 0 ? `end` : p,
      h = e.fill,
      g = h === void 0 ? pm : h,
      _ = em(e, Zp),
      v = (0, z.useMemo)(
        function () {
          return fm({
            breakAll: _.breakAll,
            children: _.children,
            maxLines: _.maxLines,
            scaleToFit: u,
            style: _.style,
            width: _.width,
          });
        },
        [_.breakAll, _.children, _.maxLines, u, _.style, _.width]
      ),
      y = _.dx,
      b = _.dy,
      x = _.angle,
      S = _.className,
      C = _.breakAll,
      w = em(_, Qp);
    if (!uo(n) || !uo(i)) return null;
    var T = n + (V(y) ? y : 0),
      E = i + (V(b) ? b : 0),
      D;
    switch (m) {
      case `start`:
        D = Xp(`calc(${c})`);
        break;
      case `middle`:
        D = Xp(`calc(${(v.length - 1) / 2} * -${o} + (${c} / 2))`);
        break;
      default:
        D = Xp(`calc(${v.length - 1} * -${o})`);
        break;
    }
    var O = [];
    if (u) {
      var k = v[0].width,
        A = _.width;
      O.push(`scale(${(V(A) ? A / k : 1) / k})`);
    }
    return (
      x && O.push(`rotate(${x}, ${T}, ${E})`),
      O.length && (w.transform = O.join(` `)),
      z.createElement(
        `text`,
        $p({}, W(w, !0), {
          x: T,
          y: E,
          className: F(`recharts-text`, S),
          textAnchor: f,
          fill: g.includes(`url`) ? pm : g,
        }),
        v.map(function (e, t) {
          var n = e.words.join(C ? `` : ` `);
          return z.createElement(`tspan`, { x: T, dy: t === 0 ? D : o, key: n }, n);
        })
      )
    );
  },
  hm = t({
    scaleBand: () => qe,
    scaleDiverging: () => Li,
    scaleDivergingLog: () => Ri,
    scaleDivergingPow: () => Bi,
    scaleDivergingSqrt: () => Vi,
    scaleDivergingSymlog: () => zi,
    scaleIdentity: () => Pt,
    scaleImplicit: () => fe,
    scaleLinear: () => Nt,
    scaleLog: () => Gt,
    scaleOrdinal: () => D,
    scalePoint: () => Ye,
    scalePow: () => en,
    scaleQuantile: () => on,
    scaleQuantize: () => sn,
    scaleRadial: () => an,
    scaleSequential: () => Ai,
    scaleSequentialLog: () => ji,
    scaleSequentialPow: () => Ni,
    scaleSequentialQuantile: () => Fi,
    scaleSequentialSqrt: () => Pi,
    scaleSequentialSymlog: () => Mi,
    scaleSqrt: () => tn,
    scaleSymlog: () => Yt,
    scaleThreshold: () => cn,
    scaleTime: () => Ei,
    scaleUtc: () => Di,
    tickFormat: () => jt,
  }),
  gm = o((e, t) => {
    var n = ca();
    function r(e, t, r) {
      for (var i = -1, a = e.length; ++i < a;) {
        var o = e[i],
          s = t(o);
        if (s != null && (c === void 0 ? s === s && !n(s) : r(s, c)))
          var c = s,
            l = o;
      }
      return l;
    }
    t.exports = r;
  }),
  _m = o((e, t) => {
    function n(e, t) {
      return e > t;
    }
    t.exports = n;
  }),
  vm = o((e, t) => {
    var n = gm(),
      r = _m(),
      i = Ou();
    function a(e) {
      return e && e.length ? n(e, i, r) : void 0;
    }
    t.exports = a;
  }),
  ym = o((e, t) => {
    function n(e, t) {
      return e < t;
    }
    t.exports = n;
  }),
  bm = o((e, t) => {
    var n = gm(),
      r = ym(),
      i = Ou();
    function a(e) {
      return e && e.length ? n(e, i, r) : void 0;
    }
    t.exports = a;
  }),
  xm = o((e, t) => {
    var n = Ga(),
      r = Mu(),
      i = bd(),
      a = ea();
    function o(e, t) {
      return (a(e) ? n : i)(e, r(t, 3));
    }
    t.exports = o;
  }),
  Sm = o((e, t) => {
    var n = md(),
      r = xm();
    function i(e, t) {
      return n(r(e, t), 1);
    }
    t.exports = i;
  }),
  Cm = o((e, t) => {
    var n = vu();
    function r(e, t) {
      return n(e, t);
    }
    t.exports = r;
  }),
  wm = o((e, t) => {
    (function (e) {
      var n = 1e9,
        r = {
          precision: 20,
          rounding: 4,
          toExpNeg: -7,
          toExpPos: 21,
          LN10: `2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286`,
        },
        i = !0,
        a = `[DecimalError] `,
        o = a + `Invalid argument: `,
        s = a + `Exponent out of range: `,
        c = Math.floor,
        l = Math.pow,
        u = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        d,
        f = 1e7,
        p = 7,
        m = 9007199254740991,
        h = c(m / p),
        g = {};
      ((g.absoluteValue = g.abs =
        function () {
          var e = new this.constructor(this);
          return ((e.s &&= 1), e);
        }),
        (g.comparedTo = g.cmp =
          function (e) {
            var t,
              n,
              r,
              i,
              a = this;
            if (((e = new a.constructor(e)), a.s !== e.s)) return a.s || -e.s;
            if (a.e !== e.e) return (a.e > e.e) ^ (a.s < 0) ? 1 : -1;
            for (r = a.d.length, i = e.d.length, t = 0, n = r < i ? r : i; t < n; ++t)
              if (a.d[t] !== e.d[t]) return (a.d[t] > e.d[t]) ^ (a.s < 0) ? 1 : -1;
            return r === i ? 0 : (r > i) ^ (a.s < 0) ? 1 : -1;
          }),
        (g.decimalPlaces = g.dp =
          function () {
            var e = this,
              t = e.d.length - 1,
              n = (t - e.e) * p;
            if (((t = e.d[t]), t)) for (; t % 10 == 0; t /= 10) n--;
            return n < 0 ? 0 : n;
          }),
        (g.dividedBy = g.div =
          function (e) {
            return b(this, new this.constructor(e));
          }),
        (g.dividedToIntegerBy = g.idiv =
          function (e) {
            var t = this,
              n = t.constructor;
            return D(b(t, new n(e), 0, 1), n.precision);
          }),
        (g.equals = g.eq =
          function (e) {
            return !this.cmp(e);
          }),
        (g.exponent = function () {
          return S(this);
        }),
        (g.greaterThan = g.gt =
          function (e) {
            return this.cmp(e) > 0;
          }),
        (g.greaterThanOrEqualTo = g.gte =
          function (e) {
            return this.cmp(e) >= 0;
          }),
        (g.isInteger = g.isint =
          function () {
            return this.e > this.d.length - 2;
          }),
        (g.isNegative = g.isneg =
          function () {
            return this.s < 0;
          }),
        (g.isPositive = g.ispos =
          function () {
            return this.s > 0;
          }),
        (g.isZero = function () {
          return this.s === 0;
        }),
        (g.lessThan = g.lt =
          function (e) {
            return this.cmp(e) < 0;
          }),
        (g.lessThanOrEqualTo = g.lte =
          function (e) {
            return this.cmp(e) < 1;
          }),
        (g.logarithm = g.log =
          function (e) {
            var t,
              n = this,
              r = n.constructor,
              o = r.precision,
              s = o + 5;
            if (e === void 0) e = new r(10);
            else if (((e = new r(e)), e.s < 1 || e.eq(d))) throw Error(a + `NaN`);
            if (n.s < 1) throw Error(a + (n.s ? `NaN` : `-Infinity`));
            return n.eq(d) ? new r(0) : ((i = !1), (t = b(T(n, s), T(e, s), s)), (i = !0), D(t, o));
          }),
        (g.minus = g.sub =
          function (e) {
            var t = this;
            return ((e = new t.constructor(e)), t.s == e.s ? O(t, e) : _(t, ((e.s = -e.s), e)));
          }),
        (g.modulo = g.mod =
          function (e) {
            var t,
              n = this,
              r = n.constructor,
              o = r.precision;
            if (((e = new r(e)), !e.s)) throw Error(a + `NaN`);
            return n.s
              ? ((i = !1), (t = b(n, e, 0, 1).times(e)), (i = !0), n.minus(t))
              : D(new r(n), o);
          }),
        (g.naturalExponential = g.exp =
          function () {
            return x(this);
          }),
        (g.naturalLogarithm = g.ln =
          function () {
            return T(this);
          }),
        (g.negated = g.neg =
          function () {
            var e = new this.constructor(this);
            return ((e.s = -e.s || 0), e);
          }),
        (g.plus = g.add =
          function (e) {
            var t = this;
            return ((e = new t.constructor(e)), t.s == e.s ? _(t, e) : O(t, ((e.s = -e.s), e)));
          }),
        (g.precision = g.sd =
          function (e) {
            var t,
              n,
              r,
              i = this;
            if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(o + e);
            if (((t = S(i) + 1), (r = i.d.length - 1), (n = r * p + 1), (r = i.d[r]), r)) {
              for (; r % 10 == 0; r /= 10) n--;
              for (r = i.d[0]; r >= 10; r /= 10) n++;
            }
            return e && t > n ? t : n;
          }),
        (g.squareRoot = g.sqrt =
          function () {
            var e,
              t,
              n,
              r,
              o,
              s,
              l,
              u = this,
              d = u.constructor;
            if (u.s < 1) {
              if (!u.s) return new d(0);
              throw Error(a + `NaN`);
            }
            for (
              e = S(u),
                i = !1,
                o = Math.sqrt(+u),
                o == 0 || o == 1 / 0
                  ? ((t = y(u.d)),
                    (t.length + e) % 2 == 0 && (t += `0`),
                    (o = Math.sqrt(t)),
                    (e = c((e + 1) / 2) - (e < 0 || e % 2)),
                    o == 1 / 0
                      ? (t = `5e` + e)
                      : ((t = o.toExponential()), (t = t.slice(0, t.indexOf(`e`) + 1) + e)),
                    (r = new d(t)))
                  : (r = new d(o.toString())),
                n = d.precision,
                o = l = n + 3;
              ;
            )
              if (
                ((s = r),
                (r = s.plus(b(u, s, l + 2)).times(0.5)),
                y(s.d).slice(0, l) === (t = y(r.d)).slice(0, l))
              ) {
                if (((t = t.slice(l - 3, l + 1)), o == l && t == `4999`)) {
                  if ((D(s, n + 1, 0), s.times(s).eq(u))) {
                    r = s;
                    break;
                  }
                } else if (t != `9999`) break;
                l += 4;
              }
            return ((i = !0), D(r, n));
          }),
        (g.times = g.mul =
          function (e) {
            var t,
              n,
              r,
              a,
              o,
              s,
              c,
              l,
              u,
              d = this,
              p = d.constructor,
              m = d.d,
              h = (e = new p(e)).d;
            if (!d.s || !e.s) return new p(0);
            for (
              e.s *= d.s,
                n = d.e + e.e,
                l = m.length,
                u = h.length,
                l < u && ((o = m), (m = h), (h = o), (s = l), (l = u), (u = s)),
                o = [],
                s = l + u,
                r = s;
              r--;
            )
              o.push(0);
            for (r = u; --r >= 0;) {
              for (t = 0, a = l + r; a > r;)
                ((c = o[a] + h[r] * m[a - r - 1] + t), (o[a--] = (c % f) | 0), (t = (c / f) | 0));
              o[a] = ((o[a] + t) % f) | 0;
            }
            for (; !o[--s];) o.pop();
            return (t ? ++n : o.shift(), (e.d = o), (e.e = n), i ? D(e, p.precision) : e);
          }),
        (g.toDecimalPlaces = g.todp =
          function (e, t) {
            var r = this,
              i = r.constructor;
            return (
              (r = new i(r)),
              e === void 0
                ? r
                : (v(e, 0, n), t === void 0 ? (t = i.rounding) : v(t, 0, 8), D(r, e + S(r) + 1, t))
            );
          }),
        (g.toExponential = function (e, t) {
          var r,
            i = this,
            a = i.constructor;
          return (
            e === void 0
              ? (r = k(i, !0))
              : (v(e, 0, n),
                t === void 0 ? (t = a.rounding) : v(t, 0, 8),
                (i = D(new a(i), e + 1, t)),
                (r = k(i, !0, e + 1))),
            r
          );
        }),
        (g.toFixed = function (e, t) {
          var r,
            i,
            a = this,
            o = a.constructor;
          return e === void 0
            ? k(a)
            : (v(e, 0, n),
              t === void 0 ? (t = o.rounding) : v(t, 0, 8),
              (i = D(new o(a), e + S(a) + 1, t)),
              (r = k(i.abs(), !1, e + S(i) + 1)),
              a.isneg() && !a.isZero() ? `-` + r : r);
        }),
        (g.toInteger = g.toint =
          function () {
            var e = this,
              t = e.constructor;
            return D(new t(e), S(e) + 1, t.rounding);
          }),
        (g.toNumber = function () {
          return +this;
        }),
        (g.toPower = g.pow =
          function (e) {
            var t,
              n,
              r,
              o,
              s,
              l,
              u = this,
              f = u.constructor,
              h = 12,
              g = +(e = new f(e));
            if (!e.s) return new f(d);
            if (((u = new f(u)), !u.s)) {
              if (e.s < 1) throw Error(a + `Infinity`);
              return u;
            }
            if (u.eq(d)) return u;
            if (((r = f.precision), e.eq(d))) return D(u, r);
            if (((t = e.e), (n = e.d.length - 1), (l = t >= n), (s = u.s), !l)) {
              if (s < 0) throw Error(a + `NaN`);
            } else if ((n = g < 0 ? -g : g) <= m) {
              for (
                o = new f(d), t = Math.ceil(r / p + 4), i = !1;
                n % 2 && ((o = o.times(u)), A(o.d, t)), (n = c(n / 2)), n !== 0;
              )
                ((u = u.times(u)), A(u.d, t));
              return ((i = !0), e.s < 0 ? new f(d).div(o) : D(o, r));
            }
            return (
              (s = s < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1),
              (u.s = 1),
              (i = !1),
              (o = e.times(T(u, r + h))),
              (i = !0),
              (o = x(o)),
              (o.s = s),
              o
            );
          }),
        (g.toPrecision = function (e, t) {
          var r,
            i,
            a = this,
            o = a.constructor;
          return (
            e === void 0
              ? ((r = S(a)), (i = k(a, r <= o.toExpNeg || r >= o.toExpPos)))
              : (v(e, 1, n),
                t === void 0 ? (t = o.rounding) : v(t, 0, 8),
                (a = D(new o(a), e, t)),
                (r = S(a)),
                (i = k(a, e <= r || r <= o.toExpNeg, e))),
            i
          );
        }),
        (g.toSignificantDigits = g.tosd =
          function (e, t) {
            var r = this,
              i = r.constructor;
            return (
              e === void 0
                ? ((e = i.precision), (t = i.rounding))
                : (v(e, 1, n), t === void 0 ? (t = i.rounding) : v(t, 0, 8)),
              D(new i(r), e, t)
            );
          }),
        (g.toString =
          g.valueOf =
          g.val =
          g.toJSON =
            function () {
              var e = this,
                t = S(e),
                n = e.constructor;
              return k(e, t <= n.toExpNeg || t >= n.toExpPos);
            }));
      function _(e, t) {
        var n,
          r,
          a,
          o,
          s,
          c,
          l,
          u,
          d = e.constructor,
          m = d.precision;
        if (!e.s || !t.s) return (t.s || (t = new d(e)), i ? D(t, m) : t);
        if (((l = e.d), (u = t.d), (s = e.e), (a = t.e), (l = l.slice()), (o = s - a), o)) {
          for (
            o < 0 ? ((r = l), (o = -o), (c = u.length)) : ((r = u), (a = s), (c = l.length)),
              s = Math.ceil(m / p),
              c = s > c ? s + 1 : c + 1,
              o > c && ((o = c), (r.length = 1)),
              r.reverse();
            o--;
          )
            r.push(0);
          r.reverse();
        }
        for (
          c = l.length, o = u.length, c - o < 0 && ((o = c), (r = u), (u = l), (l = r)), n = 0;
          o;
        )
          ((n = ((l[--o] = l[o] + u[o] + n) / f) | 0), (l[o] %= f));
        for (n && (l.unshift(n), ++a), c = l.length; l[--c] == 0;) l.pop();
        return ((t.d = l), (t.e = a), i ? D(t, m) : t);
      }
      function v(e, t, n) {
        if (e !== ~~e || e < t || e > n) throw Error(o + e);
      }
      function y(e) {
        var t,
          n,
          r,
          i = e.length - 1,
          a = ``,
          o = e[0];
        if (i > 0) {
          for (a += o, t = 1; t < i; t++)
            ((r = e[t] + ``), (n = p - r.length), n && (a += w(n)), (a += r));
          ((o = e[t]), (r = o + ``), (n = p - r.length), n && (a += w(n)));
        } else if (o === 0) return `0`;
        for (; o % 10 == 0;) o /= 10;
        return a + o;
      }
      var b = (function () {
        function e(e, t) {
          var n,
            r = 0,
            i = e.length;
          for (e = e.slice(); i--;) ((n = e[i] * t + r), (e[i] = (n % f) | 0), (r = (n / f) | 0));
          return (r && e.unshift(r), e);
        }
        function t(e, t, n, r) {
          var i, a;
          if (n != r) a = n > r ? 1 : -1;
          else
            for (i = a = 0; i < n; i++)
              if (e[i] != t[i]) {
                a = e[i] > t[i] ? 1 : -1;
                break;
              }
          return a;
        }
        function n(e, t, n) {
          for (var r = 0; n--;) ((e[n] -= r), (r = +(e[n] < t[n])), (e[n] = r * f + e[n] - t[n]));
          for (; !e[0] && e.length > 1;) e.shift();
        }
        return function (r, i, o, s) {
          var c,
            l,
            u,
            d,
            m,
            h,
            g,
            _,
            v,
            y,
            b,
            x,
            C,
            w,
            T,
            E,
            O,
            k,
            A = r.constructor,
            j = r.s == i.s ? 1 : -1,
            M = r.d,
            N = i.d;
          if (!r.s) return new A(r);
          if (!i.s) throw Error(a + `Division by zero`);
          for (
            l = r.e - i.e, O = N.length, T = M.length, g = new A(j), _ = g.d = [], u = 0;
            N[u] == (M[u] || 0);
          )
            ++u;
          if (
            (N[u] > (M[u] || 0) && --l,
            (x = o == null ? (o = A.precision) : s ? o + (S(r) - S(i)) + 1 : o),
            x < 0)
          )
            return new A(0);
          if (((x = (x / p + 2) | 0), (u = 0), O == 1))
            for (d = 0, N = N[0], x++; (u < T || d) && x--; u++)
              ((C = d * f + (M[u] || 0)), (_[u] = (C / N) | 0), (d = (C % N) | 0));
          else {
            for (
              d = (f / (N[0] + 1)) | 0,
                d > 1 && ((N = e(N, d)), (M = e(M, d)), (O = N.length), (T = M.length)),
                w = O,
                v = M.slice(0, O),
                y = v.length;
              y < O;
            )
              v[y++] = 0;
            ((k = N.slice()), k.unshift(0), (E = N[0]), N[1] >= f / 2 && ++E);
            do
              ((d = 0),
                (c = t(N, v, O, y)),
                c < 0
                  ? ((b = v[0]),
                    O != y && (b = b * f + (v[1] || 0)),
                    (d = (b / E) | 0),
                    d > 1
                      ? (d >= f && (d = f - 1),
                        (m = e(N, d)),
                        (h = m.length),
                        (y = v.length),
                        (c = t(m, v, h, y)),
                        c == 1 && (d--, n(m, O < h ? k : N, h)))
                      : (d == 0 && (c = d = 1), (m = N.slice())),
                    (h = m.length),
                    h < y && m.unshift(0),
                    n(v, m, y),
                    c == -1 &&
                      ((y = v.length), (c = t(N, v, O, y)), c < 1 && (d++, n(v, O < y ? k : N, y))),
                    (y = v.length))
                  : c === 0 && (d++, (v = [0])),
                (_[u++] = d),
                c && v[0] ? (v[y++] = M[w] || 0) : ((v = [M[w]]), (y = 1)));
            while ((w++ < T || v[0] !== void 0) && x--);
          }
          return (_[0] || _.shift(), (g.e = l), D(g, s ? o + S(g) + 1 : o));
        };
      })();
      function x(e, t) {
        var n,
          r,
          a,
          o,
          c,
          u,
          f = 0,
          p = 0,
          m = e.constructor,
          h = m.precision;
        if (S(e) > 16) throw Error(s + S(e));
        if (!e.s) return new m(d);
        for (t == null ? ((i = !1), (u = h)) : (u = t), c = new m(0.03125); e.abs().gte(0.1);)
          ((e = e.times(c)), (p += 5));
        for (
          r = ((Math.log(l(2, p)) / Math.LN10) * 2 + 5) | 0,
            u += r,
            n = a = o = new m(d),
            m.precision = u;
          ;
        ) {
          if (
            ((a = D(a.times(e), u)),
            (n = n.times(++f)),
            (c = o.plus(b(a, n, u))),
            y(c.d).slice(0, u) === y(o.d).slice(0, u))
          ) {
            for (; p--;) o = D(o.times(o), u);
            return ((m.precision = h), t == null ? ((i = !0), D(o, h)) : o);
          }
          o = c;
        }
      }
      function S(e) {
        for (var t = e.e * p, n = e.d[0]; n >= 10; n /= 10) t++;
        return t;
      }
      function C(e, t, n) {
        if (t > e.LN10.sd())
          throw ((i = !0), n && (e.precision = n), Error(a + `LN10 precision limit exceeded`));
        return D(new e(e.LN10), t);
      }
      function w(e) {
        for (var t = ``; e--;) t += `0`;
        return t;
      }
      function T(e, t) {
        var n,
          r,
          o,
          s,
          c,
          l,
          u,
          f,
          p,
          m = 1,
          h = 10,
          g = e,
          _ = g.d,
          v = g.constructor,
          x = v.precision;
        if (g.s < 1) throw Error(a + (g.s ? `NaN` : `-Infinity`));
        if (g.eq(d)) return new v(0);
        if ((t == null ? ((i = !1), (f = x)) : (f = t), g.eq(10))) return (t ?? (i = !0), C(v, f));
        if (
          ((f += h),
          (v.precision = f),
          (n = y(_)),
          (r = n.charAt(0)),
          (s = S(g)),
          Math.abs(s) < 0x5543df729c000)
        ) {
          for (; (r < 7 && r != 1) || (r == 1 && n.charAt(1) > 3);)
            ((g = g.times(e)), (n = y(g.d)), (r = n.charAt(0)), m++);
          ((s = S(g)), r > 1 ? ((g = new v(`0.` + n)), s++) : (g = new v(r + `.` + n.slice(1))));
        } else
          return (
            (u = C(v, f + 2, x).times(s + ``)),
            (g = T(new v(r + `.` + n.slice(1)), f - h).plus(u)),
            (v.precision = x),
            t == null ? ((i = !0), D(g, x)) : g
          );
        for (l = c = g = b(g.minus(d), g.plus(d), f), p = D(g.times(g), f), o = 3; ;) {
          if (
            ((c = D(c.times(p), f)),
            (u = l.plus(b(c, new v(o), f))),
            y(u.d).slice(0, f) === y(l.d).slice(0, f))
          )
            return (
              (l = l.times(2)),
              s !== 0 && (l = l.plus(C(v, f + 2, x).times(s + ``))),
              (l = b(l, new v(m), f)),
              (v.precision = x),
              t == null ? ((i = !0), D(l, x)) : l
            );
          ((l = u), (o += 2));
        }
      }
      function E(e, t) {
        var n, r, a;
        for (
          (n = t.indexOf(`.`)) > -1 && (t = t.replace(`.`, ``)),
            (r = t.search(/e/i)) > 0
              ? (n < 0 && (n = r), (n += +t.slice(r + 1)), (t = t.substring(0, r)))
              : n < 0 && (n = t.length),
            r = 0;
          t.charCodeAt(r) === 48;
        )
          ++r;
        for (a = t.length; t.charCodeAt(a - 1) === 48;) --a;
        if (((t = t.slice(r, a)), t)) {
          if (
            ((a -= r),
            (n = n - r - 1),
            (e.e = c(n / p)),
            (e.d = []),
            (r = (n + 1) % p),
            n < 0 && (r += p),
            r < a)
          ) {
            for (r && e.d.push(+t.slice(0, r)), a -= p; r < a;) e.d.push(+t.slice(r, (r += p)));
            ((t = t.slice(r)), (r = p - t.length));
          } else r -= a;
          for (; r--;) t += `0`;
          if ((e.d.push(+t), i && (e.e > h || e.e < -h))) throw Error(s + n);
        } else ((e.s = 0), (e.e = 0), (e.d = [0]));
        return e;
      }
      function D(e, t, n) {
        var r,
          a,
          o,
          u,
          d,
          m,
          g,
          _,
          v = e.d;
        for (u = 1, o = v[0]; o >= 10; o /= 10) u++;
        if (((r = t - u), r < 0)) ((r += p), (a = t), (g = v[(_ = 0)]));
        else {
          if (((_ = Math.ceil((r + 1) / p)), (o = v.length), _ >= o)) return e;
          for (g = o = v[_], u = 1; o >= 10; o /= 10) u++;
          ((r %= p), (a = r - p + u));
        }
        if (
          (n !== void 0 &&
            ((o = l(10, u - a - 1)),
            (d = ((g / o) % 10) | 0),
            (m = t < 0 || v[_ + 1] !== void 0 || g % o),
            (m =
              n < 4
                ? (d || m) && (n == 0 || n == (e.s < 0 ? 3 : 2))
                : d > 5 ||
                  (d == 5 &&
                    (n == 4 ||
                      m ||
                      (n == 6 && ((r > 0 ? (a > 0 ? g / l(10, u - a) : 0) : v[_ - 1]) % 10) & 1) ||
                      n == (e.s < 0 ? 8 : 7))))),
          t < 1 || !v[0])
        )
          return (
            m
              ? ((o = S(e)),
                (v.length = 1),
                (t = t - o - 1),
                (v[0] = l(10, (p - (t % p)) % p)),
                (e.e = c(-t / p) || 0))
              : ((v.length = 1), (v[0] = e.e = e.s = 0)),
            e
          );
        if (
          (r == 0
            ? ((v.length = _), (o = 1), _--)
            : ((v.length = _ + 1),
              (o = l(10, p - r)),
              (v[_] = a > 0 ? (((g / l(10, u - a)) % l(10, a)) | 0) * o : 0)),
          m)
        )
          for (;;)
            if (_ == 0) {
              (v[0] += o) == f && ((v[0] = 1), ++e.e);
              break;
            } else {
              if (((v[_] += o), v[_] != f)) break;
              ((v[_--] = 0), (o = 1));
            }
        for (r = v.length; v[--r] === 0;) v.pop();
        if (i && (e.e > h || e.e < -h)) throw Error(s + S(e));
        return e;
      }
      function O(e, t) {
        var n,
          r,
          a,
          o,
          s,
          c,
          l,
          u,
          d,
          m,
          h = e.constructor,
          g = h.precision;
        if (!e.s || !t.s) return (t.s ? (t.s = -t.s) : (t = new h(e)), i ? D(t, g) : t);
        if (((l = e.d), (m = t.d), (r = t.e), (u = e.e), (l = l.slice()), (s = u - r), s)) {
          for (
            d = s < 0,
              d ? ((n = l), (s = -s), (c = m.length)) : ((n = m), (r = u), (c = l.length)),
              a = Math.max(Math.ceil(g / p), c) + 2,
              s > a && ((s = a), (n.length = 1)),
              n.reverse(),
              a = s;
            a--;
          )
            n.push(0);
          n.reverse();
        } else {
          for (a = l.length, c = m.length, d = a < c, d && (c = a), a = 0; a < c; a++)
            if (l[a] != m[a]) {
              d = l[a] < m[a];
              break;
            }
          s = 0;
        }
        for (
          d && ((n = l), (l = m), (m = n), (t.s = -t.s)), c = l.length, a = m.length - c;
          a > 0;
          --a
        )
          l[c++] = 0;
        for (a = m.length; a > s;) {
          if (l[--a] < m[a]) {
            for (o = a; o && l[--o] === 0;) l[o] = f - 1;
            (--l[o], (l[a] += f));
          }
          l[a] -= m[a];
        }
        for (; l[--c] === 0;) l.pop();
        for (; l[0] === 0; l.shift()) --r;
        return l[0] ? ((t.d = l), (t.e = r), i ? D(t, g) : t) : new h(0);
      }
      function k(e, t, n) {
        var r,
          i = S(e),
          a = y(e.d),
          o = a.length;
        return (
          t
            ? (n && (r = n - o) > 0
                ? (a = a.charAt(0) + `.` + a.slice(1) + w(r))
                : o > 1 && (a = a.charAt(0) + `.` + a.slice(1)),
              (a = a + (i < 0 ? `e` : `e+`) + i))
            : i < 0
              ? ((a = `0.` + w(-i - 1) + a), n && (r = n - o) > 0 && (a += w(r)))
              : i >= o
                ? ((a += w(i + 1 - o)), n && (r = n - i - 1) > 0 && (a = a + `.` + w(r)))
                : ((r = i + 1) < o && (a = a.slice(0, r) + `.` + a.slice(r)),
                  n && (r = n - o) > 0 && (i + 1 === o && (a += `.`), (a += w(r)))),
          e.s < 0 ? `-` + a : a
        );
      }
      function A(e, t) {
        if (e.length > t) return ((e.length = t), !0);
      }
      function j(e) {
        var t, n, r;
        function i(e) {
          var t = this;
          if (!(t instanceof i)) return new i(e);
          if (((t.constructor = i), e instanceof i)) {
            ((t.s = e.s), (t.e = e.e), (t.d = (e = e.d) ? e.slice() : e));
            return;
          }
          if (typeof e == `number`) {
            if (e * 0 != 0) throw Error(o + e);
            if (e > 0) t.s = 1;
            else if (e < 0) ((e = -e), (t.s = -1));
            else {
              ((t.s = 0), (t.e = 0), (t.d = [0]));
              return;
            }
            if (e === ~~e && e < 1e7) {
              ((t.e = 0), (t.d = [e]));
              return;
            }
            return E(t, e.toString());
          } else if (typeof e != `string`) throw Error(o + e);
          if ((e.charCodeAt(0) === 45 ? ((e = e.slice(1)), (t.s = -1)) : (t.s = 1), u.test(e)))
            E(t, e);
          else throw Error(o + e);
        }
        if (
          ((i.prototype = g),
          (i.ROUND_UP = 0),
          (i.ROUND_DOWN = 1),
          (i.ROUND_CEIL = 2),
          (i.ROUND_FLOOR = 3),
          (i.ROUND_HALF_UP = 4),
          (i.ROUND_HALF_DOWN = 5),
          (i.ROUND_HALF_EVEN = 6),
          (i.ROUND_HALF_CEIL = 7),
          (i.ROUND_HALF_FLOOR = 8),
          (i.clone = j),
          (i.config = i.set = M),
          e === void 0 && (e = {}),
          e)
        )
          for (r = [`precision`, `rounding`, `toExpNeg`, `toExpPos`, `LN10`], t = 0; t < r.length;)
            e.hasOwnProperty((n = r[t++])) || (e[n] = this[n]);
        return (i.config(e), i);
      }
      function M(e) {
        if (!e || typeof e != `object`) throw Error(a + `Object expected`);
        var t,
          r,
          i,
          s = [`precision`, 1, n, `rounding`, 0, 8, `toExpNeg`, -1 / 0, 0, `toExpPos`, 0, 1 / 0];
        for (t = 0; t < s.length; t += 3)
          if ((i = e[(r = s[t])]) !== void 0)
            if (c(i) === i && i >= s[t + 1] && i <= s[t + 2]) this[r] = i;
            else throw Error(o + r + `: ` + i);
        if ((i = e[(r = `LN10`)]) !== void 0)
          if (i == Math.LN10) this[r] = new this(i);
          else throw Error(o + r + `: ` + i);
        return this;
      }
      ((r = j(r)),
        (r.default = r.Decimal = r),
        (d = new r(1)),
        typeof define == `function` && define.amd
          ? define(function () {
              return r;
            })
          : t !== void 0 && t.exports
            ? (t.exports = r)
            : ((e ||=
                typeof self < `u` && self && self.self == self ? self : Function(`return this`)()),
              (e.Decimal = r)));
    })(e);
  });
function Tm(e) {
  return km(e) || Om(e) || Dm(e) || Em();
}
function Em() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Dm(e, t) {
  if (e) {
    if (typeof e == `string`) return Am(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Am(e, t);
  }
}
function Om(e) {
  if (typeof Symbol < `u` && Symbol.iterator in Object(e)) return Array.from(e);
}
function km(e) {
  if (Array.isArray(e)) return Am(e);
}
function Am(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var jm = function (e) {
    return e;
  },
  Mm = { '@@functional/placeholder': !0 },
  Nm = function (e) {
    return e === Mm;
  },
  Pm = function (e) {
    return function t() {
      return arguments.length === 0 ||
        (arguments.length === 1 && Nm(arguments.length <= 0 ? void 0 : arguments[0]))
        ? t
        : e.apply(void 0, arguments);
    };
  },
  Fm = function e(t, n) {
    return t === 1
      ? n
      : Pm(function () {
          var r = [...arguments],
            i = r.filter(function (e) {
              return e !== Mm;
            }).length;
          return i >= t
            ? n.apply(void 0, r)
            : e(
                t - i,
                Pm(function () {
                  var e = [...arguments],
                    t = r.map(function (t) {
                      return Nm(t) ? e.shift() : t;
                    });
                  return n.apply(void 0, Tm(t).concat(e));
                })
              );
        });
  },
  Im = function (e) {
    return Fm(e.length, e);
  },
  Lm = function (e, t) {
    for (var n = [], r = e; r < t; ++r) n[r - e] = r;
    return n;
  },
  Rm = Im(function (e, t) {
    return Array.isArray(t)
      ? t.map(e)
      : Object.keys(t)
          .map(function (e) {
            return t[e];
          })
          .map(e);
  }),
  zm = function () {
    var e = [...arguments];
    if (!e.length) return jm;
    var t = e.reverse(),
      n = t[0],
      r = t.slice(1);
    return function () {
      return r.reduce(
        function (e, t) {
          return t(e);
        },
        n.apply(void 0, arguments)
      );
    };
  },
  Bm = function (e) {
    return Array.isArray(e) ? e.reverse() : e.split(``).reverse.join(``);
  },
  Vm = function (e) {
    var t = null,
      n = null;
    return function () {
      var r = [...arguments];
      return t &&
        r.every(function (e, n) {
          return e === t[n];
        })
        ? n
        : ((t = r), (n = e.apply(void 0, r)), n);
    };
  },
  q = r(wm());
function Hm(e) {
  return e === 0 ? 1 : Math.floor(new q.default(e).abs().log(10).toNumber()) + 1;
}
function Um(e, t, n) {
  for (var r = new q.default(e), i = 0, a = []; r.lt(t) && i < 1e5;)
    (a.push(r.toNumber()), (r = r.add(n)), i++);
  return a;
}
var Wm = {
  rangeStep: Um,
  getDigitCount: Hm,
  interpolateNumber: Im(function (e, t, n) {
    var r = +e;
    return r + n * (+t - r);
  }),
  uninterpolateNumber: Im(function (e, t, n) {
    var r = t - +e;
    return ((r ||= 1 / 0), (n - e) / r);
  }),
  uninterpolateTruncation: Im(function (e, t, n) {
    var r = t - +e;
    return ((r ||= 1 / 0), Math.max(0, Math.min(1, (n - e) / r)));
  }),
};
function Gm(e) {
  return Jm(e) || qm(e) || Zm(e) || Km();
}
function Km() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qm(e) {
  if (typeof Symbol < `u` && Symbol.iterator in Object(e)) return Array.from(e);
}
function Jm(e) {
  if (Array.isArray(e)) return Qm(e);
}
function Ym(e, t) {
  return eh(e) || $m(e, t) || Zm(e, t) || Xm();
}
function Xm() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Zm(e, t) {
  if (e) {
    if (typeof e == `string`) return Qm(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Qm(e, t);
  }
}
function Qm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function $m(e, t) {
  if (!(typeof Symbol > `u` || !(Symbol.iterator in Object(e)))) {
    var n = [],
      r = !0,
      i = !1,
      a = void 0;
    try {
      for (
        var o = e[Symbol.iterator](), s;
        !(r = (s = o.next()).done) && (n.push(s.value), !(t && n.length === t));
        r = !0
      );
    } catch (e) {
      ((i = !0), (a = e));
    } finally {
      try {
        !r && o.return != null && o.return();
      } finally {
        if (i) throw a;
      }
    }
    return n;
  }
}
function eh(e) {
  if (Array.isArray(e)) return e;
}
function th(e) {
  var t = Ym(e, 2),
    n = t[0],
    r = t[1],
    i = n,
    a = r;
  return (n > r && ((i = r), (a = n)), [i, a]);
}
function nh(e, t, n) {
  if (e.lte(0)) return new q.default(0);
  var r = Wm.getDigitCount(e.toNumber()),
    i = new q.default(10).pow(r),
    a = e.div(i),
    o = r === 1 ? 0.1 : 0.05,
    s = new q.default(Math.ceil(a.div(o).toNumber())).add(n).mul(o).mul(i);
  return t ? s : new q.default(Math.ceil(s));
}
function rh(e, t, n) {
  var r = 1,
    i = new q.default(e);
  if (!i.isint() && n) {
    var a = Math.abs(e);
    a < 1
      ? ((r = new q.default(10).pow(Wm.getDigitCount(e) - 1)),
        (i = new q.default(Math.floor(i.div(r).toNumber())).mul(r)))
      : a > 1 && (i = new q.default(Math.floor(e)));
  } else
    e === 0
      ? (i = new q.default(Math.floor((t - 1) / 2)))
      : n || (i = new q.default(Math.floor(e)));
  var o = Math.floor((t - 1) / 2);
  return zm(
    Rm(function (e) {
      return i.add(new q.default(e - o).mul(r)).toNumber();
    }),
    Lm
  )(0, t);
}
function ih(e, t, n, r) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (n - 1)))
    return { step: new q.default(0), tickMin: new q.default(0), tickMax: new q.default(0) };
  var a = nh(new q.default(t).sub(e).div(n - 1), r, i),
    o;
  e <= 0 && t >= 0
    ? (o = new q.default(0))
    : ((o = new q.default(e).add(t).div(2)), (o = o.sub(new q.default(o).mod(a))));
  var s = Math.ceil(o.sub(e).div(a).toNumber()),
    c = Math.ceil(new q.default(t).sub(o).div(a).toNumber()),
    l = s + c + 1;
  return l > n
    ? ih(e, t, n, r, i + 1)
    : (l < n && ((c = t > 0 ? c + (n - l) : c), (s = t > 0 ? s : s + (n - l))),
      {
        step: a,
        tickMin: o.sub(new q.default(s).mul(a)),
        tickMax: o.add(new q.default(c).mul(a)),
      });
}
function ah(e) {
  var t = Ym(e, 2),
    n = t[0],
    r = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    o = Math.max(i, 2),
    s = Ym(th([n, r]), 2),
    c = s[0],
    l = s[1];
  if (c === -1 / 0 || l === 1 / 0) {
    var u =
      l === 1 / 0
        ? [c].concat(
            Gm(
              Lm(0, i - 1).map(function () {
                return 1 / 0;
              })
            )
          )
        : [].concat(
            Gm(
              Lm(0, i - 1).map(function () {
                return -1 / 0;
              })
            ),
            [l]
          );
    return n > r ? Bm(u) : u;
  }
  if (c === l) return rh(c, i, a);
  var d = ih(c, l, o, a),
    f = d.step,
    p = d.tickMin,
    m = d.tickMax,
    h = Wm.rangeStep(p, m.add(new q.default(0.1).mul(f)), f);
  return n > r ? Bm(h) : h;
}
function oh(e, t) {
  var n = Ym(e, 2),
    r = n[0],
    i = n[1],
    a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    o = Ym(th([r, i]), 2),
    s = o[0],
    c = o[1];
  if (s === -1 / 0 || c === 1 / 0) return [r, i];
  if (s === c) return [s];
  var l = Math.max(t, 2),
    u = nh(new q.default(c).sub(s).div(l - 1), a, 0),
    d = [].concat(
      Gm(Wm.rangeStep(new q.default(s), new q.default(c).sub(new q.default(0.99).mul(u)), u)),
      [c]
    );
  return r > i ? Bm(d) : d;
}
var sh = Vm(ah),
  ch = Vm(oh),
  lh = !0,
  uh = `Invariant failed`;
function dh(e, t) {
  if (!e) {
    if (lh) throw Error(uh);
    var n = typeof t == `function` ? t() : t,
      r = n ? `${uh}: ${n}` : uh;
    throw Error(r);
  }
}
var fh = [`offset`, `layout`, `width`, `dataKey`, `data`, `dataPointFormatter`, `xAxis`, `yAxis`];
function ph() {
  return (
    (ph = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ph.apply(this, arguments)
  );
}
function mh(e, t) {
  return yh(e) || vh(e, t) || gh(e, t) || hh();
}
function hh() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gh(e, t) {
  if (e) {
    if (typeof e == `string`) return _h(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _h(e, t);
  }
}
function _h(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function vh(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function yh(e) {
  if (Array.isArray(e)) return e;
}
function bh(e, t) {
  if (e == null) return {};
  var n = xh(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function xh(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function Sh(e) {
  var t = e.offset,
    n = e.layout,
    r = e.width,
    i = e.dataKey,
    a = e.data,
    o = e.dataPointFormatter,
    s = e.xAxis,
    c = e.yAxis,
    l = W(bh(e, fh), !1);
  e.direction === `x` && s.type !== `number` && dh(!1);
  var u = a.map(function (e) {
    var a = o(e, i),
      u = a.x,
      d = a.y,
      f = a.value,
      p = a.errorVal;
    if (!p) return null;
    var m = [],
      h,
      g;
    if (Array.isArray(p)) {
      var _ = mh(p, 2);
      ((h = _[0]), (g = _[1]));
    } else h = g = p;
    if (n === `vertical`) {
      var v = s.scale,
        y = d + t,
        b = y + r,
        x = y - r,
        S = v(f - h),
        C = v(f + g);
      (m.push({ x1: C, y1: b, x2: C, y2: x }),
        m.push({ x1: S, y1: y, x2: C, y2: y }),
        m.push({ x1: S, y1: b, x2: S, y2: x }));
    } else if (n === `horizontal`) {
      var w = c.scale,
        T = u + t,
        E = T - r,
        D = T + r,
        O = w(f - h),
        k = w(f + g);
      (m.push({ x1: E, y1: k, x2: D, y2: k }),
        m.push({ x1: T, y1: O, x2: T, y2: k }),
        m.push({ x1: E, y1: O, x2: D, y2: O }));
    }
    return z.createElement(
      G,
      ph(
        {
          className: `recharts-errorBar`,
          key: `bar-${m.map(function (e) {
            return `${e.x1}-${e.x2}-${e.y1}-${e.y2}`;
          })}`,
        },
        l
      ),
      m.map(function (e) {
        return z.createElement(`line`, ph({}, e, { key: `line-${e.x1}-${e.x2}-${e.y1}-${e.y2}` }));
      })
    );
  });
  return z.createElement(G, { className: `recharts-errorBars` }, u);
}
((Sh.defaultProps = {
  stroke: `black`,
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: `horizontal`,
}),
  (Sh.displayName = `ErrorBar`));
function Ch(e) {
  '@babel/helpers - typeof';
  return (
    (Ch =
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
    Ch(e)
  );
}
function wh(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Th(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? wh(Object(n), !0).forEach(function (t) {
          Eh(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : wh(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Eh(e, t, n) {
  return (
    (t = Dh(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Dh(e) {
  var t = Oh(e, `string`);
  return Ch(t) == `symbol` ? t : String(t);
}
function Oh(e, t) {
  if (Ch(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Ch(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var kh = function (e) {
    var t = e.children,
      n = e.formattedGraphicalItems,
      r = e.legendWidth,
      i = e.legendContent,
      a = Uo(t, fd);
    if (!a) return null;
    var o =
      a.props && a.props.payload
        ? a.props && a.props.payload
        : i === `children`
          ? (n || []).reduce(function (e, t) {
              var n = t.item,
                r = t.props,
                i = r.sectors || r.data || [];
              return e.concat(
                i.map(function (e) {
                  return {
                    type: a.props.iconType || n.props.legendType,
                    value: e.name,
                    color: e.fill,
                    payload: e,
                  };
                })
              );
            }, [])
          : (n || []).map(function (e) {
              var t = e.item,
                n = t.props,
                r = n.dataKey,
                i = n.name,
                o = n.legendType;
              return {
                inactive: n.hide,
                dataKey: r,
                type: a.props.iconType || o || `square`,
                color: Jh(t),
                value: i || r,
                payload: t.props,
              };
            });
    return Th(Th(Th({}, a.props), fd.getWithHeight(a, r)), {}, { payload: o, item: a });
  },
  Ah = r(vm()),
  jh = r(bm()),
  Mh = r(Sm()),
  Nh = r(Cm());
function Ph(e) {
  '@babel/helpers - typeof';
  return (
    (Ph =
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
    Ph(e)
  );
}
function Fh(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Ih(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Fh(Object(n), !0).forEach(function (t) {
          Lh(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Fh(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Lh(e, t, n) {
  return (
    (t = Rh(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Rh(e) {
  var t = zh(e, `string`);
  return Ph(t) == `symbol` ? t : String(t);
}
function zh(e, t) {
  if (Ph(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Ph(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function Bh(e) {
  return Wh(e) || Uh(e) || Hh(e) || Vh();
}
function Vh() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Hh(e, t) {
  if (e) {
    if (typeof e == `string`) return Gh(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Gh(e, t);
  }
}
function Uh(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function Wh(e) {
  if (Array.isArray(e)) return Gh(e);
}
function Gh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function J(e, t, n) {
  return (0, H.default)(e) || (0, H.default)(t)
    ? n
    : uo(t)
      ? (0, oo.default)(e, t, n)
      : (0, U.default)(t)
        ? t(e)
        : n;
}
function Kh(e, t, n, r) {
  var i = (0, Mh.default)(e, function (e) {
    return J(e, t);
  });
  if (n === `number`) {
    var a = i.filter(function (e) {
      return V(e) || parseFloat(e);
    });
    return a.length ? [(0, jh.default)(a), (0, Ah.default)(a)] : [1 / 0, -1 / 0];
  }
  return (
    r
      ? i.filter(function (e) {
          return !(0, H.default)(e);
        })
      : i
  ).map(function (e) {
    return uo(e) || e instanceof Date ? e : ``;
  });
}
var qh = function (e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
      n = arguments.length > 2 ? arguments[2] : void 0,
      r = arguments.length > 3 ? arguments[3] : void 0,
      i = -1,
      a = t?.length ?? 0;
    if (a <= 1) return 0;
    if (
      r &&
      r.axisType === `angleAxis` &&
      Math.abs(Math.abs(r.range[1] - r.range[0]) - 360) <= 1e-6
    )
      for (var o = r.range, s = 0; s < a; s++) {
        var c = s > 0 ? n[s - 1].coordinate : n[a - 1].coordinate,
          l = n[s].coordinate,
          u = s >= a - 1 ? n[0].coordinate : n[s + 1].coordinate,
          d = void 0;
        if (co(l - c) !== co(u - l)) {
          var f = [];
          if (co(u - l) === co(o[1] - o[0])) {
            d = u;
            var p = l + o[1] - o[0];
            ((f[0] = Math.min(p, (p + c) / 2)), (f[1] = Math.max(p, (p + c) / 2)));
          } else {
            d = c;
            var m = u + o[1] - o[0];
            ((f[0] = Math.min(l, (m + l) / 2)), (f[1] = Math.max(l, (m + l) / 2)));
          }
          var h = [Math.min(l, (d + l) / 2), Math.max(l, (d + l) / 2)];
          if ((e > h[0] && e <= h[1]) || (e >= f[0] && e <= f[1])) {
            i = n[s].index;
            break;
          }
        } else {
          var g = Math.min(c, u),
            _ = Math.max(c, u);
          if (e > (g + l) / 2 && e <= (_ + l) / 2) {
            i = n[s].index;
            break;
          }
        }
      }
    else
      for (var v = 0; v < a; v++)
        if (
          (v === 0 && e <= (t[v].coordinate + t[v + 1].coordinate) / 2) ||
          (v > 0 &&
            v < a - 1 &&
            e > (t[v].coordinate + t[v - 1].coordinate) / 2 &&
            e <= (t[v].coordinate + t[v + 1].coordinate) / 2) ||
          (v === a - 1 && e > (t[v].coordinate + t[v - 1].coordinate) / 2)
        ) {
          i = t[v].index;
          break;
        }
    return i;
  },
  Jh = function (e) {
    var t = e.type.displayName,
      n = e.props,
      r = n.stroke,
      i = n.fill,
      a;
    switch (t) {
      case `Line`:
        a = r;
        break;
      case `Area`:
      case `Radar`:
        a = r && r !== `none` ? r : i;
        break;
      default:
        a = i;
        break;
    }
    return a;
  },
  Yh = function (e) {
    var t = e.barSize,
      n = e.totalSize,
      r = e.stackGroups,
      i = r === void 0 ? {} : r;
    if (!i) return {};
    for (var a = {}, o = Object.keys(i), s = 0, c = o.length; s < c; s++)
      for (var l = i[o[s]].stackGroups, u = Object.keys(l), d = 0, f = u.length; d < f; d++) {
        var p = l[u[d]],
          m = p.items,
          h = p.cateAxisId,
          g = m.filter(function (e) {
            return Ro(e.type).indexOf(`Bar`) >= 0;
          });
        if (g && g.length) {
          var _ = g[0].props.barSize,
            v = g[0].props[h];
          a[v] || (a[v] = []);
          var y = (0, H.default)(_) ? t : _;
          a[v].push({
            item: g[0],
            stackList: g.slice(1),
            barSize: (0, H.default)(y) ? void 0 : mo(y, n, 0),
          });
        }
      }
    return a;
  },
  Xh = function (e) {
    var t = e.barGap,
      n = e.barCategoryGap,
      r = e.bandSize,
      i = e.sizeList,
      a = i === void 0 ? [] : i,
      o = e.maxBarSize,
      s = a.length;
    if (s < 1) return null;
    var c = mo(t, r, 0, !0),
      l,
      u = [];
    if (a[0].barSize === +a[0].barSize) {
      var d = !1,
        f = r / s,
        p = a.reduce(function (e, t) {
          return e + t.barSize || 0;
        }, 0);
      ((p += (s - 1) * c),
        p >= r && ((p -= (s - 1) * c), (c = 0)),
        p >= r && f > 0 && ((d = !0), (f *= 0.9), (p = s * f)));
      var m = { offset: (((r - p) / 2) >> 0) - c, size: 0 };
      l = a.reduce(function (e, t) {
        var n = {
            item: t.item,
            position: { offset: m.offset + m.size + c, size: d ? f : t.barSize },
          },
          r = [].concat(Bh(e), [n]);
        return (
          (m = r[r.length - 1].position),
          t.stackList &&
            t.stackList.length &&
            t.stackList.forEach(function (e) {
              r.push({ item: e, position: m });
            }),
          r
        );
      }, u);
    } else {
      var h = mo(n, r, 0, !0);
      r - 2 * h - (s - 1) * c <= 0 && (c = 0);
      var g = (r - 2 * h - (s - 1) * c) / s;
      g > 1 && (g >>= 0);
      var _ = o === +o ? Math.min(g, o) : g;
      l = a.reduce(function (e, t, n) {
        var r = [].concat(Bh(e), [
          { item: t.item, position: { offset: h + (g + c) * n + (g - _) / 2, size: _ } },
        ]);
        return (
          t.stackList &&
            t.stackList.length &&
            t.stackList.forEach(function (e) {
              r.push({ item: e, position: r[r.length - 1].position });
            }),
          r
        );
      }, u);
    }
    return l;
  },
  Zh = function (e, t, n, r) {
    var i = n.children,
      a = n.width,
      o = n.margin,
      s = kh({ children: i, legendWidth: a - (o.left || 0) - (o.right || 0) });
    if (s) {
      var c = r || {},
        l = c.width,
        u = c.height,
        d = s.align,
        f = s.verticalAlign,
        p = s.layout;
      if ((p === `vertical` || (p === `horizontal` && f === `middle`)) && d !== `center` && V(e[d]))
        return Ih(Ih({}, e), {}, Lh({}, d, e[d] + (l || 0)));
      if ((p === `horizontal` || (p === `vertical` && d === `center`)) && f !== `middle` && V(e[f]))
        return Ih(Ih({}, e), {}, Lh({}, f, e[f] + (u || 0)));
    }
    return e;
  },
  Qh = function (e, t, n) {
    return (0, H.default)(t)
      ? !0
      : e === `horizontal`
        ? t === `yAxis`
        : e === `vertical` || n === `x`
          ? t === `xAxis`
          : n === `y`
            ? t === `yAxis`
            : !0;
  },
  $h = function (e, t, n, r, i) {
    var a = t.props.children,
      o = Ho(a, Sh).filter(function (e) {
        return Qh(r, i, e.props.direction);
      });
    if (o && o.length) {
      var s = o.map(function (e) {
        return e.props.dataKey;
      });
      return e.reduce(
        function (e, t) {
          var r = J(t, n);
          if ((0, H.default)(r)) return e;
          var i = Array.isArray(r) ? [(0, jh.default)(r), (0, Ah.default)(r)] : [r, r],
            a = s.reduce(
              function (e, n) {
                var r = J(t, n, 0),
                  a = i[0] - Math.abs(Array.isArray(r) ? r[0] : r),
                  o = i[1] + Math.abs(Array.isArray(r) ? r[1] : r);
                return [Math.min(a, e[0]), Math.max(o, e[1])];
              },
              [1 / 0, -1 / 0]
            );
          return [Math.min(a[0], e[0]), Math.max(a[1], e[1])];
        },
        [1 / 0, -1 / 0]
      );
    }
    return null;
  },
  eg = function (e, t, n, r, i) {
    var a = t
      .map(function (t) {
        return $h(e, t, n, i, r);
      })
      .filter(function (e) {
        return !(0, H.default)(e);
      });
    return a && a.length
      ? a.reduce(
          function (e, t) {
            return [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
          },
          [1 / 0, -1 / 0]
        )
      : null;
  },
  tg = function (e, t, n, r, i) {
    var a = t.map(function (t) {
      var a = t.props.dataKey;
      return (n === `number` && a && $h(e, t, a, r)) || Kh(e, a, n, i);
    });
    if (n === `number`)
      return a.reduce(
        function (e, t) {
          return [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
        },
        [1 / 0, -1 / 0]
      );
    var o = {};
    return a.reduce(function (e, t) {
      for (var n = 0, r = t.length; n < r; n++) o[t[n]] || ((o[t[n]] = !0), e.push(t[n]));
      return e;
    }, []);
  },
  ng = function (e, t) {
    return (
      (e === `horizontal` && t === `xAxis`) ||
      (e === `vertical` && t === `yAxis`) ||
      (e === `centric` && t === `angleAxis`) ||
      (e === `radial` && t === `radiusAxis`)
    );
  },
  rg = function (e, t, n, r) {
    if (r)
      return e.map(function (e) {
        return e.coordinate;
      });
    var i,
      a,
      o = e.map(function (e) {
        return (e.coordinate === t && (i = !0), e.coordinate === n && (a = !0), e.coordinate);
      });
    return (i || o.push(t), a || o.push(n), o);
  },
  ig = function (e, t, n) {
    if (!e) return null;
    var r = e.scale,
      i = e.duplicateDomain,
      a = e.type,
      o = e.range,
      s = e.realScaleType === `scaleBand` ? r.bandwidth() / 2 : 2,
      c = (t || n) && a === `category` && r.bandwidth ? r.bandwidth() / s : 0;
    return (
      (c = e.axisType === `angleAxis` && o?.length >= 2 ? co(o[0] - o[1]) * 2 * c : c),
      t && (e.ticks || e.niceTicks)
        ? (e.ticks || e.niceTicks)
            .map(function (e) {
              return { coordinate: r(i ? i.indexOf(e) : e) + c, value: e, offset: c };
            })
            .filter(function (e) {
              return !(0, ao.default)(e.coordinate);
            })
        : e.isCategorical && e.categoricalDomain
          ? e.categoricalDomain.map(function (e, t) {
              return { coordinate: r(e) + c, value: e, index: t, offset: c };
            })
          : r.ticks && !n
            ? r.ticks(e.tickCount).map(function (e) {
                return { coordinate: r(e) + c, value: e, offset: c };
              })
            : r.domain().map(function (e, t) {
                return { coordinate: r(e) + c, value: i ? i[e] : e, index: t, offset: c };
              })
    );
  },
  ag = new WeakMap(),
  og = function (e, t) {
    if (typeof t != `function`) return e;
    ag.has(e) || ag.set(e, new WeakMap());
    var n = ag.get(e);
    if (n.has(t)) return n.get(t);
    var r = function () {
      (e.apply(void 0, arguments), t.apply(void 0, arguments));
    };
    return (n.set(t, r), r);
  },
  sg = function (e, t, n) {
    var r = e.scale,
      i = e.type,
      a = e.layout,
      o = e.axisType;
    if (r === `auto`)
      return a === `radial` && o === `radiusAxis`
        ? { scale: qe(), realScaleType: `band` }
        : a === `radial` && o === `angleAxis`
          ? { scale: Nt(), realScaleType: `linear` }
          : i === `category` &&
              t &&
              (t.indexOf(`LineChart`) >= 0 ||
                t.indexOf(`AreaChart`) >= 0 ||
                (t.indexOf(`ComposedChart`) >= 0 && !n))
            ? { scale: Ye(), realScaleType: `point` }
            : i === `category`
              ? { scale: qe(), realScaleType: `band` }
              : { scale: Nt(), realScaleType: `linear` };
    if ((0, io.default)(r)) {
      var s = `scale${(0, Uc.default)(r)}`;
      return { scale: (hm[s] || Ye)(), realScaleType: hm[s] ? s : `point` };
    }
    return (0, U.default)(r) ? { scale: r } : { scale: Ye(), realScaleType: `point` };
  },
  cg = 1e-4,
  lg = function (e) {
    var t = e.domain();
    if (!(!t || t.length <= 2)) {
      var n = t.length,
        r = e.range(),
        i = Math.min(r[0], r[1]) - cg,
        a = Math.max(r[0], r[1]) + cg,
        o = e(t[0]),
        s = e(t[n - 1]);
      (o < i || o > a || s < i || s > a) && e.domain([t[0], t[n - 1]]);
    }
  },
  ug = function (e, t) {
    if (!e) return null;
    for (var n = 0, r = e.length; n < r; n++) if (e[n].item === t) return e[n].position;
    return null;
  },
  dg = function (e, t) {
    if (!t || t.length !== 2 || !V(t[0]) || !V(t[1])) return e;
    var n = Math.min(t[0], t[1]),
      r = Math.max(t[0], t[1]),
      i = [e[0], e[1]];
    return (
      (!V(e[0]) || e[0] < n) && (i[0] = n),
      (!V(e[1]) || e[1] > r) && (i[1] = r),
      i[0] > r && (i[0] = r),
      i[1] < n && (i[1] = n),
      i
    );
  },
  fg = {
    sign: function (e) {
      var t = e.length;
      if (!(t <= 0))
        for (var n = 0, r = e[0].length; n < r; ++n)
          for (var i = 0, a = 0, o = 0; o < t; ++o) {
            var s = (0, ao.default)(e[o][n][1]) ? e[o][n][0] : e[o][n][1];
            s >= 0
              ? ((e[o][n][0] = i), (e[o][n][1] = i + s), (i = e[o][n][1]))
              : ((e[o][n][0] = a), (e[o][n][1] = a + s), (a = e[o][n][1]));
          }
    },
    expand: Bc,
    none: Fc,
    silhouette: Vc,
    wiggle: Hc,
    positive: function (e) {
      var t = e.length;
      if (!(t <= 0))
        for (var n = 0, r = e[0].length; n < r; ++n)
          for (var i = 0, a = 0; a < t; ++a) {
            var o = (0, ao.default)(e[a][n][1]) ? e[a][n][0] : e[a][n][1];
            o >= 0
              ? ((e[a][n][0] = i), (e[a][n][1] = i + o), (i = e[a][n][1]))
              : ((e[a][n][0] = 0), (e[a][n][1] = 0));
          }
    },
  },
  pg = function (e, t, n) {
    var r = t.map(function (e) {
        return e.props.dataKey;
      }),
      i = fg[n];
    return zc()
      .keys(r)
      .value(function (e, t) {
        return +J(e, t, 0);
      })
      .order(Ic)
      .offset(i)(e);
  },
  mg = function (e, t, n, r, i, a) {
    if (!e) return null;
    var o = (a ? t.reverse() : t).reduce(function (e, t) {
      var i = t.props,
        a = i.stackId;
      if (i.hide) return e;
      var o = t.props[n],
        s = e[o] || { hasStack: !1, stackGroups: {} };
      if (uo(a)) {
        var c = s.stackGroups[a] || { numericAxisId: n, cateAxisId: r, items: [] };
        (c.items.push(t), (s.hasStack = !0), (s.stackGroups[a] = c));
      } else s.stackGroups[po(`_stackId_`)] = { numericAxisId: n, cateAxisId: r, items: [t] };
      return Ih(Ih({}, e), {}, Lh({}, o, s));
    }, {});
    return Object.keys(o).reduce(function (t, a) {
      var s = o[a];
      return (
        s.hasStack &&
          (s.stackGroups = Object.keys(s.stackGroups).reduce(function (t, a) {
            var o = s.stackGroups[a];
            return Ih(
              Ih({}, t),
              {},
              Lh({}, a, {
                numericAxisId: n,
                cateAxisId: r,
                items: o.items,
                stackedData: pg(e, o.items, i),
              })
            );
          }, {})),
        Ih(Ih({}, t), {}, Lh({}, a, s))
      );
    }, {});
  },
  hg = function (e, t) {
    var n = t.realScaleType,
      r = t.type,
      i = t.tickCount,
      a = t.originalDomain,
      o = t.allowDecimals,
      s = n || t.scale;
    if (s !== `auto` && s !== `linear`) return null;
    if (i && r === `number` && a && (a[0] === `auto` || a[1] === `auto`)) {
      var c = e.domain();
      if (!c.length) return null;
      var l = sh(c, i, o);
      return (e.domain([(0, jh.default)(l), (0, Ah.default)(l)]), { niceTicks: l });
    }
    return i && r === `number` ? { niceTicks: ch(e.domain(), i, o) } : null;
  };
function gg(e) {
  var t = e.axis,
    n = e.ticks,
    r = e.bandSize,
    i = e.entry,
    a = e.index,
    o = e.dataKey;
  if (t.type === `category`) {
    if (!t.allowDuplicatedCategory && t.dataKey && !(0, H.default)(i[t.dataKey])) {
      var s = vo(n, `value`, i[t.dataKey]);
      if (s) return s.coordinate + r / 2;
    }
    return n[a] ? n[a].coordinate + r / 2 : null;
  }
  var c = J(i, (0, H.default)(o) ? t.dataKey : o);
  return (0, H.default)(c) ? null : t.scale(c);
}
var _g = function (e) {
    var t = e.axis,
      n = e.ticks,
      r = e.offset,
      i = e.bandSize,
      a = e.entry,
      o = e.index;
    if (t.type === `category`) return n[o] ? n[o].coordinate + r : null;
    var s = J(a, t.dataKey, t.domain[o]);
    return (0, H.default)(s) ? null : t.scale(s) - i / 2 + r;
  },
  vg = function (e) {
    var t = e.numericAxis,
      n = t.scale.domain();
    if (t.type === `number`) {
      var r = Math.min(n[0], n[1]),
        i = Math.max(n[0], n[1]);
      return r <= 0 && i >= 0 ? 0 : i < 0 ? i : r;
    }
    return n[0];
  },
  yg = function (e, t) {
    var n = e.props.stackId;
    if (uo(n)) {
      var r = t[n];
      if (r) {
        var i = r.items.indexOf(e);
        return i >= 0 ? r.stackedData[i] : null;
      }
    }
    return null;
  },
  bg = function (e) {
    return e.reduce(
      function (e, t) {
        return [
          (0, jh.default)(t.concat([e[0]]).filter(V)),
          (0, Ah.default)(t.concat([e[1]]).filter(V)),
        ];
      },
      [1 / 0, -1 / 0]
    );
  },
  xg = function (e, t, n) {
    return Object.keys(e)
      .reduce(
        function (r, i) {
          var a = e[i].stackedData.reduce(
            function (e, r) {
              var i = bg(r.slice(t, n + 1));
              return [Math.min(e[0], i[0]), Math.max(e[1], i[1])];
            },
            [1 / 0, -1 / 0]
          );
          return [Math.min(a[0], r[0]), Math.max(a[1], r[1])];
        },
        [1 / 0, -1 / 0]
      )
      .map(function (e) {
        return e === 1 / 0 || e === -1 / 0 ? 0 : e;
      });
  },
  Sg = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  Cg = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  wg = function (e, t, n) {
    if ((0, U.default)(e)) return e(t, n);
    if (!Array.isArray(e)) return t;
    var r = [];
    if (V(e[0])) r[0] = n ? e[0] : Math.min(e[0], t[0]);
    else if (Sg.test(e[0])) {
      var i = +Sg.exec(e[0])[1];
      r[0] = t[0] - i;
    } else (0, U.default)(e[0]) ? (r[0] = e[0](t[0])) : (r[0] = t[0]);
    if (V(e[1])) r[1] = n ? e[1] : Math.max(e[1], t[1]);
    else if (Cg.test(e[1])) {
      var a = +Cg.exec(e[1])[1];
      r[1] = t[1] + a;
    } else (0, U.default)(e[1]) ? (r[1] = e[1](t[1])) : (r[1] = t[1]);
    return r;
  },
  Tg = function (e, t, n) {
    if (e && e.scale && e.scale.bandwidth) {
      var r = e.scale.bandwidth();
      if (!n || r > 0) return r;
    }
    if (e && t && t.length >= 2) {
      for (
        var i = (0, Pd.default)(t, function (e) {
            return e.coordinate;
          }),
          a = 1 / 0,
          o = 1,
          s = i.length;
        o < s;
        o++
      ) {
        var c = i[o],
          l = i[o - 1];
        a = Math.min((c.coordinate || 0) - (l.coordinate || 0), a);
      }
      return a === 1 / 0 ? 0 : a;
    }
    return n ? void 0 : 0;
  },
  Eg = function (e, t, n) {
    return !e || !e.length || (0, Nh.default)(e, (0, oo.default)(n, `type.defaultProps.domain`))
      ? t
      : e;
  },
  Dg = function (e, t) {
    var n = e.props,
      r = n.dataKey,
      i = n.name,
      a = n.unit,
      o = n.formatter,
      s = n.tooltipType,
      c = n.chartType,
      l = n.hide;
    return Ih(
      Ih({}, W(e, !1)),
      {},
      {
        dataKey: r,
        unit: a,
        formatter: o,
        name: i || r,
        color: Jh(e),
        value: J(t, r),
        type: s,
        payload: t,
        chartType: c,
        hide: l,
      }
    );
  };
function Og(e) {
  '@babel/helpers - typeof';
  return (
    (Og =
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
    Og(e)
  );
}
function kg(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Ag(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? kg(Object(n), !0).forEach(function (t) {
          jg(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : kg(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function jg(e, t, n) {
  return (
    (t = Mg(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Mg(e) {
  var t = Ng(e, `string`);
  return Og(t) == `symbol` ? t : String(t);
}
function Ng(e, t) {
  if (Og(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Og(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Pg = Math.PI / 180,
  Fg = function (e) {
    return (e * 180) / Math.PI;
  },
  Ig = function (e, t, n, r) {
    return { x: e + Math.cos(-Pg * r) * n, y: t + Math.sin(-Pg * r) * n };
  },
  Lg = function (e, t) {
    var n = e.x,
      r = e.y,
      i = t.x,
      a = t.y;
    return Math.sqrt((n - i) ** 2 + (r - a) ** 2);
  },
  Rg = function (e, t) {
    var n = e.x,
      r = e.y,
      i = t.cx,
      a = t.cy,
      o = Lg({ x: n, y: r }, { x: i, y: a });
    if (o <= 0) return { radius: o };
    var s = (n - i) / o,
      c = Math.acos(s);
    return (r > a && (c = 2 * Math.PI - c), { radius: o, angle: Fg(c), angleInRadian: c });
  },
  zg = function (e) {
    var t = e.startAngle,
      n = e.endAngle,
      r = Math.floor(t / 360),
      i = Math.floor(n / 360),
      a = Math.min(r, i);
    return { startAngle: t - a * 360, endAngle: n - a * 360 };
  },
  Bg = function (e, t) {
    var n = t.startAngle,
      r = t.endAngle,
      i = Math.floor(n / 360),
      a = Math.floor(r / 360);
    return e + Math.min(i, a) * 360;
  },
  Vg = function (e, t) {
    var n = e.x,
      r = e.y,
      i = Rg({ x: n, y: r }, t),
      a = i.radius,
      o = i.angle,
      s = t.innerRadius,
      c = t.outerRadius;
    if (a < s || a > c) return !1;
    if (a === 0) return !0;
    var l = zg(t),
      u = l.startAngle,
      d = l.endAngle,
      f = o,
      p;
    if (u <= d) {
      for (; f > d;) f -= 360;
      for (; f < u;) f += 360;
      p = f >= u && f <= d;
    } else {
      for (; f > u;) f -= 360;
      for (; f < d;) f += 360;
      p = f >= d && f <= u;
    }
    return p ? Ag(Ag({}, t), {}, { radius: a, angle: Bg(f, t) }) : null;
  };
function Hg(e) {
  '@babel/helpers - typeof';
  return (
    (Hg =
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
    Hg(e)
  );
}
var Ug = [`offset`];
function Wg(e) {
  return Jg(e) || qg(e) || Kg(e) || Gg();
}
function Gg() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Kg(e, t) {
  if (e) {
    if (typeof e == `string`) return Yg(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Yg(e, t);
  }
}
function qg(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function Jg(e) {
  if (Array.isArray(e)) return Yg(e);
}
function Yg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Xg(e, t) {
  if (e == null) return {};
  var n = Zg(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function Zg(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function Qg(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function $g(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Qg(Object(n), !0).forEach(function (t) {
          e_(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Qg(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function e_(e, t, n) {
  return (
    (t = t_(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function t_(e) {
  var t = n_(e, `string`);
  return Hg(t) == `symbol` ? t : String(t);
}
function n_(e, t) {
  if (Hg(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Hg(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function r_() {
  return (
    (r_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    r_.apply(this, arguments)
  );
}
var i_ = function (e) {
    var t = e.value,
      n = e.formatter,
      r = (0, H.default)(e.children) ? t : e.children;
    return (0, U.default)(n) ? n(r) : r;
  },
  a_ = function (e, t) {
    return co(t - e) * Math.min(Math.abs(t - e), 360);
  },
  o_ = function (e, t, n) {
    var r = e.position,
      i = e.viewBox,
      a = e.offset,
      o = e.className,
      s = i,
      c = s.cx,
      l = s.cy,
      u = s.innerRadius,
      d = s.outerRadius,
      f = s.startAngle,
      p = s.endAngle,
      m = s.clockWise,
      h = (u + d) / 2,
      g = a_(f, p),
      _ = g >= 0 ? 1 : -1,
      v,
      y;
    (r === `insideStart`
      ? ((v = f + _ * a), (y = m))
      : r === `insideEnd`
        ? ((v = p - _ * a), (y = !m))
        : r === `end` && ((v = p + _ * a), (y = m)),
      (y = g <= 0 ? y : !y));
    var b = Ig(c, l, h, v),
      x = Ig(c, l, h, v + (y ? 1 : -1) * 359),
      S = `M${b.x},${b.y}
    A${h},${h},0,1,${+!y},
    ${x.x},${x.y}`,
      C = (0, H.default)(e.id) ? po(`recharts-radial-line-`) : e.id;
    return z.createElement(
      `text`,
      r_({}, n, { dominantBaseline: `central`, className: F(`recharts-radial-bar-label`, o) }),
      z.createElement(`defs`, null, z.createElement(`path`, { id: C, d: S })),
      z.createElement(`textPath`, { xlinkHref: `#${C}` }, t)
    );
  },
  s_ = function (e) {
    var t = e.viewBox,
      n = e.offset,
      r = e.position,
      i = t,
      a = i.cx,
      o = i.cy,
      s = i.innerRadius,
      c = i.outerRadius,
      l = (i.startAngle + i.endAngle) / 2;
    if (r === `outside`) {
      var u = Ig(a, o, c + n, l),
        d = u.x;
      return { x: d, y: u.y, textAnchor: d >= a ? `start` : `end`, verticalAnchor: `middle` };
    }
    if (r === `center`) return { x: a, y: o, textAnchor: `middle`, verticalAnchor: `middle` };
    if (r === `centerTop`) return { x: a, y: o, textAnchor: `middle`, verticalAnchor: `start` };
    if (r === `centerBottom`) return { x: a, y: o, textAnchor: `middle`, verticalAnchor: `end` };
    var f = Ig(a, o, (s + c) / 2, l);
    return { x: f.x, y: f.y, textAnchor: `middle`, verticalAnchor: `middle` };
  },
  c_ = function (e) {
    var t = e.viewBox,
      n = e.parentViewBox,
      r = e.offset,
      i = e.position,
      a = t,
      o = a.x,
      s = a.y,
      c = a.width,
      l = a.height,
      u = l >= 0 ? 1 : -1,
      d = u * r,
      f = u > 0 ? `end` : `start`,
      p = u > 0 ? `start` : `end`,
      m = c >= 0 ? 1 : -1,
      h = m * r,
      g = m > 0 ? `end` : `start`,
      _ = m > 0 ? `start` : `end`;
    if (i === `top`)
      return $g(
        $g({}, { x: o + c / 2, y: s - u * r, textAnchor: `middle`, verticalAnchor: f }),
        n ? { height: Math.max(s - n.y, 0), width: c } : {}
      );
    if (i === `bottom`)
      return $g(
        $g({}, { x: o + c / 2, y: s + l + d, textAnchor: `middle`, verticalAnchor: p }),
        n ? { height: Math.max(n.y + n.height - (s + l), 0), width: c } : {}
      );
    if (i === `left`) {
      var v = { x: o - h, y: s + l / 2, textAnchor: g, verticalAnchor: `middle` };
      return $g($g({}, v), n ? { width: Math.max(v.x - n.x, 0), height: l } : {});
    }
    if (i === `right`) {
      var y = { x: o + c + h, y: s + l / 2, textAnchor: _, verticalAnchor: `middle` };
      return $g($g({}, y), n ? { width: Math.max(n.x + n.width - y.x, 0), height: l } : {});
    }
    var b = n ? { width: c, height: l } : {};
    return i === `insideLeft`
      ? $g({ x: o + h, y: s + l / 2, textAnchor: _, verticalAnchor: `middle` }, b)
      : i === `insideRight`
        ? $g({ x: o + c - h, y: s + l / 2, textAnchor: g, verticalAnchor: `middle` }, b)
        : i === `insideTop`
          ? $g({ x: o + c / 2, y: s + d, textAnchor: `middle`, verticalAnchor: p }, b)
          : i === `insideBottom`
            ? $g({ x: o + c / 2, y: s + l - d, textAnchor: `middle`, verticalAnchor: f }, b)
            : i === `insideTopLeft`
              ? $g({ x: o + h, y: s + d, textAnchor: _, verticalAnchor: p }, b)
              : i === `insideTopRight`
                ? $g({ x: o + c - h, y: s + d, textAnchor: g, verticalAnchor: p }, b)
                : i === `insideBottomLeft`
                  ? $g({ x: o + h, y: s + l - d, textAnchor: _, verticalAnchor: f }, b)
                  : i === `insideBottomRight`
                    ? $g({ x: o + c - h, y: s + l - d, textAnchor: g, verticalAnchor: f }, b)
                    : (0, xo.default)(i) && (V(i.x) || lo(i.x)) && (V(i.y) || lo(i.y))
                      ? $g(
                          {
                            x: o + mo(i.x, c),
                            y: s + mo(i.y, l),
                            textAnchor: `end`,
                            verticalAnchor: `end`,
                          },
                          b
                        )
                      : $g(
                          {
                            x: o + c / 2,
                            y: s + l / 2,
                            textAnchor: `middle`,
                            verticalAnchor: `middle`,
                          },
                          b
                        );
  },
  l_ = function (e) {
    return `cx` in e && V(e.cx);
  };
function u_(e) {
  var t = e.offset,
    n = t === void 0 ? 5 : t,
    r = Xg(e, Ug),
    i = $g({ offset: n }, r),
    a = i.viewBox,
    o = i.position,
    s = i.value,
    c = i.children,
    l = i.content,
    u = i.className,
    d = u === void 0 ? `` : u,
    f = i.textBreakAll;
  if (
    !a ||
    ((0, H.default)(s) && (0, H.default)(c) && !(0, z.isValidElement)(l) && !(0, U.default)(l))
  )
    return null;
  if ((0, z.isValidElement)(l)) return (0, z.cloneElement)(l, i);
  var p;
  if ((0, U.default)(l)) {
    if (((p = (0, z.createElement)(l, i)), (0, z.isValidElement)(p))) return p;
  } else p = i_(i);
  var m = l_(a),
    h = W(i, !0);
  if (m && (o === `insideStart` || o === `insideEnd` || o === `end`)) return o_(i, p, h);
  var g = m ? s_(i) : c_(i);
  return z.createElement(mm, r_({ className: F(`recharts-label`, d) }, h, g, { breakAll: f }), p);
}
u_.displayName = `Label`;
var d_ = function (e) {
    var t = e.cx,
      n = e.cy,
      r = e.angle,
      i = e.startAngle,
      a = e.endAngle,
      o = e.r,
      s = e.radius,
      c = e.innerRadius,
      l = e.outerRadius,
      u = e.x,
      d = e.y,
      f = e.top,
      p = e.left,
      m = e.width,
      h = e.height,
      g = e.clockWise,
      _ = e.labelViewBox;
    if (_) return _;
    if (V(m) && V(h)) {
      if (V(u) && V(d)) return { x: u, y: d, width: m, height: h };
      if (V(f) && V(p)) return { x: f, y: p, width: m, height: h };
    }
    return V(u) && V(d)
      ? { x: u, y: d, width: 0, height: 0 }
      : V(t) && V(n)
        ? {
            cx: t,
            cy: n,
            startAngle: i || r || 0,
            endAngle: a || r || 0,
            innerRadius: c || 0,
            outerRadius: l || s || o || 0,
            clockWise: g,
          }
        : e.viewBox
          ? e.viewBox
          : {};
  },
  f_ = function (e, t) {
    return e
      ? e === !0
        ? z.createElement(u_, { key: `label-implicit`, viewBox: t })
        : uo(e)
          ? z.createElement(u_, { key: `label-implicit`, viewBox: t, value: e })
          : (0, z.isValidElement)(e)
            ? e.type === u_
              ? (0, z.cloneElement)(e, { key: `label-implicit`, viewBox: t })
              : z.createElement(u_, { key: `label-implicit`, content: e, viewBox: t })
            : (0, U.default)(e)
              ? z.createElement(u_, { key: `label-implicit`, content: e, viewBox: t })
              : (0, xo.default)(e)
                ? z.createElement(u_, r_({ viewBox: t }, e, { key: `label-implicit` }))
                : null
      : null;
  };
((u_.parseViewBox = d_),
  (u_.renderCallByParent = function (e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!e || (!e.children && n && !e.label)) return null;
    var r = e.children,
      i = d_(e),
      a = Ho(r, u_).map(function (e, n) {
        return (0, z.cloneElement)(e, { viewBox: t || i, key: `label-${n}` });
      });
    return n ? [f_(e.label, t || i)].concat(Wg(a)) : a;
  }));
var p_ = o((e, t) => {
    function n(e) {
      var t = e == null ? 0 : e.length;
      return t ? e[t - 1] : void 0;
    }
    t.exports = n;
  }),
  m_ = r(p_());
function h_(e) {
  '@babel/helpers - typeof';
  return (
    (h_ =
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
    h_(e)
  );
}
var g_ = [`valueAccessor`],
  __ = [`data`, `dataKey`, `clockWise`, `id`, `textBreakAll`];
function v_(e) {
  return S_(e) || x_(e) || b_(e) || y_();
}
function y_() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function b_(e, t) {
  if (e) {
    if (typeof e == `string`) return C_(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return C_(e, t);
  }
}
function x_(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function S_(e) {
  if (Array.isArray(e)) return C_(e);
}
function C_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function w_() {
  return (
    (w_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    w_.apply(this, arguments)
  );
}
function T_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function E_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? T_(Object(n), !0).forEach(function (t) {
          D_(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : T_(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function D_(e, t, n) {
  return (
    (t = O_(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function O_(e) {
  var t = k_(e, `string`);
  return h_(t) == `symbol` ? t : String(t);
}
function k_(e, t) {
  if (h_(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (h_(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function A_(e, t) {
  if (e == null) return {};
  var n = j_(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function j_(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
var M_ = function (e) {
  return Array.isArray(e.value) ? (0, m_.default)(e.value) : e.value;
};
function N_(e) {
  var t = e.valueAccessor,
    n = t === void 0 ? M_ : t,
    r = A_(e, g_),
    i = r.data,
    a = r.dataKey,
    o = r.clockWise,
    s = r.id,
    c = r.textBreakAll,
    l = A_(r, __);
  return !i || !i.length
    ? null
    : z.createElement(
        G,
        { className: `recharts-label-list` },
        i.map(function (e, t) {
          var r = (0, H.default)(a) ? n(e, t) : J(e && e.payload, a),
            i = (0, H.default)(s) ? {} : { id: `${s}-${t}` };
          return z.createElement(
            u_,
            w_({}, W(e, !0), l, i, {
              parentViewBox: e.parentViewBox,
              value: r,
              textBreakAll: c,
              viewBox: u_.parseViewBox((0, H.default)(o) ? e : E_(E_({}, e), {}, { clockWise: o })),
              key: `label-${t}`,
              index: t,
            })
          );
        })
      );
}
N_.displayName = `LabelList`;
function P_(e, t) {
  return e
    ? e === !0
      ? z.createElement(N_, { key: `labelList-implicit`, data: t })
      : z.isValidElement(e) || (0, U.default)(e)
        ? z.createElement(N_, { key: `labelList-implicit`, data: t, content: e })
        : (0, xo.default)(e)
          ? z.createElement(N_, w_({ data: t }, e, { key: `labelList-implicit` }))
          : null
    : null;
}
function F_(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || (!e.children && n && !e.label)) return null;
  var r = e.children,
    i = Ho(r, N_).map(function (e, n) {
      return (0, z.cloneElement)(e, { data: t, key: `labelList-${n}` });
    });
  return n ? [P_(e.label, t)].concat(v_(i)) : i;
}
N_.renderCallByParent = F_;
function I_(e) {
  '@babel/helpers - typeof';
  return (
    (I_ =
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
    I_(e)
  );
}
function L_() {
  return (
    (L_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    L_.apply(this, arguments)
  );
}
function R_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function z_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? R_(Object(n), !0).forEach(function (t) {
          B_(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : R_(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function B_(e, t, n) {
  return (
    (t = V_(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function V_(e) {
  var t = H_(e, `string`);
  return I_(t) == `symbol` ? t : String(t);
}
function H_(e, t) {
  if (I_(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (I_(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var U_ = function (e, t) {
    return co(t - e) * Math.min(Math.abs(t - e), 359.999);
  },
  W_ = function (e) {
    var t = e.cx,
      n = e.cy,
      r = e.radius,
      i = e.angle,
      a = e.sign,
      o = e.isExternal,
      s = e.cornerRadius,
      c = e.cornerIsExternal,
      l = s * (o ? 1 : -1) + r,
      u = Math.asin(s / l) / Pg,
      d = c ? i : i + a * u,
      f = Ig(t, n, l, d),
      p = Ig(t, n, r, d),
      m = c ? i - a * u : i;
    return {
      center: f,
      circleTangency: p,
      lineTangency: Ig(t, n, l * Math.cos(u * Pg), m),
      theta: u,
    };
  },
  G_ = function (e) {
    var t = e.cx,
      n = e.cy,
      r = e.innerRadius,
      i = e.outerRadius,
      a = e.startAngle,
      o = e.endAngle,
      s = U_(a, o),
      c = a + s,
      l = Ig(t, n, i, a),
      u = Ig(t, n, i, c),
      d = `M ${l.x},${l.y}
    A ${i},${i},0,
    ${+(Math.abs(s) > 180)},${+(a > c)},
    ${u.x},${u.y}
  `;
    if (r > 0) {
      var f = Ig(t, n, r, a),
        p = Ig(t, n, r, c);
      d += `L ${p.x},${p.y}
            A ${r},${r},0,
            ${+(Math.abs(s) > 180)},${+(a <= c)},
            ${f.x},${f.y} Z`;
    } else d += `L ${t},${n} Z`;
    return d;
  },
  K_ = function (e) {
    var t = e.cx,
      n = e.cy,
      r = e.innerRadius,
      i = e.outerRadius,
      a = e.cornerRadius,
      o = e.forceCornerRadius,
      s = e.cornerIsExternal,
      c = e.startAngle,
      l = e.endAngle,
      u = co(l - c),
      d = W_({ cx: t, cy: n, radius: i, angle: c, sign: u, cornerRadius: a, cornerIsExternal: s }),
      f = d.circleTangency,
      p = d.lineTangency,
      m = d.theta,
      h = W_({ cx: t, cy: n, radius: i, angle: l, sign: -u, cornerRadius: a, cornerIsExternal: s }),
      g = h.circleTangency,
      _ = h.lineTangency,
      v = h.theta,
      y = s ? Math.abs(c - l) : Math.abs(c - l) - m - v;
    if (y < 0)
      return o
        ? `M ${p.x},${p.y}
        a${a},${a},0,0,1,${a * 2},0
        a${a},${a},0,0,1,${-a * 2},0
      `
        : G_({ cx: t, cy: n, innerRadius: r, outerRadius: i, startAngle: c, endAngle: l });
    var b = `M ${p.x},${p.y}
    A${a},${a},0,0,${+(u < 0)},${f.x},${f.y}
    A${i},${i},0,${+(y > 180)},${+(u < 0)},${g.x},${g.y}
    A${a},${a},0,0,${+(u < 0)},${_.x},${_.y}
  `;
    if (r > 0) {
      var x = W_({
          cx: t,
          cy: n,
          radius: r,
          angle: c,
          sign: u,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s,
        }),
        S = x.circleTangency,
        C = x.lineTangency,
        w = x.theta,
        T = W_({
          cx: t,
          cy: n,
          radius: r,
          angle: l,
          sign: -u,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s,
        }),
        E = T.circleTangency,
        D = T.lineTangency,
        O = T.theta,
        k = s ? Math.abs(c - l) : Math.abs(c - l) - w - O;
      if (k < 0 && a === 0) return `${b}L${t},${n}Z`;
      b += `L${D.x},${D.y}
      A${a},${a},0,0,${+(u < 0)},${E.x},${E.y}
      A${r},${r},0,${+(k > 180)},${+(u > 0)},${S.x},${S.y}
      A${a},${a},0,0,${+(u < 0)},${C.x},${C.y}Z`;
    } else b += `L${t},${n}Z`;
    return b;
  },
  q_ = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: !1,
    cornerIsExternal: !1,
  },
  J_ = function (e) {
    var t = z_(z_({}, q_), e),
      n = t.cx,
      r = t.cy,
      i = t.innerRadius,
      a = t.outerRadius,
      o = t.cornerRadius,
      s = t.forceCornerRadius,
      c = t.cornerIsExternal,
      l = t.startAngle,
      u = t.endAngle,
      d = t.className;
    if (a < i || l === u) return null;
    var f = F(`recharts-sector`, d),
      p = a - i,
      m = mo(o, p, 0, !0),
      h =
        m > 0 && Math.abs(l - u) < 360
          ? K_({
              cx: n,
              cy: r,
              innerRadius: i,
              outerRadius: a,
              cornerRadius: Math.min(m, p / 2),
              forceCornerRadius: s,
              cornerIsExternal: c,
              startAngle: l,
              endAngle: u,
            })
          : G_({ cx: n, cy: r, innerRadius: i, outerRadius: a, startAngle: l, endAngle: u });
    return z.createElement(`path`, L_({}, W(t, !0), { className: f, d: h, role: `img` }));
  };
function Y_(e) {
  '@babel/helpers - typeof';
  return (
    (Y_ =
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
    Y_(e)
  );
}
function X_() {
  return (
    (X_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    X_.apply(this, arguments)
  );
}
function Z_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Q_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Z_(Object(n), !0).forEach(function (t) {
          $_(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Z_(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function $_(e, t, n) {
  return (
    (t = ev(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function ev(e) {
  var t = tv(e, `string`);
  return Y_(t) == `symbol` ? t : String(t);
}
function tv(e, t) {
  if (Y_(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Y_(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var nv = {
    curveBasisClosed: mc,
    curveBasisOpen: gc,
    curveBasis: fc,
    curveBumpX: Hs,
    curveBumpY: Us,
    curveLinearClosed: vc,
    curveLinear: Is,
    curveMonotoneX: Ec,
    curveMonotoneY: Dc,
    curveNatural: Ac,
    curveStep: Mc,
    curveStepAfter: Pc,
    curveStepBefore: Nc,
  },
  rv = function (e) {
    return e.x === +e.x && e.y === +e.y;
  },
  iv = function (e) {
    return e.x;
  },
  av = function (e) {
    return e.y;
  },
  ov = function (e, t) {
    if ((0, U.default)(e)) return e;
    var n = `curve${(0, Uc.default)(e)}`;
    return (n === `curveMonotone` || n === `curveBump`) && t
      ? nv[`${n}${t === `vertical` ? `Y` : `X`}`]
      : nv[n] || Is;
  },
  sv = function (e) {
    var t = e.type,
      n = t === void 0 ? `linear` : t,
      r = e.points,
      i = r === void 0 ? [] : r,
      a = e.baseLine,
      o = e.layout,
      s = e.connectNulls,
      c = s === void 0 ? !1 : s,
      l = ov(n, o),
      u = c
        ? i.filter(function (e) {
            return rv(e);
          })
        : i,
      d;
    if (Array.isArray(a)) {
      var f = c
          ? a.filter(function (e) {
              return rv(e);
            })
          : a,
        p = u.map(function (e, t) {
          return Q_(Q_({}, e), {}, { base: f[t] });
        });
      return (
        (d =
          o === `vertical`
            ? Bs()
                .y(av)
                .x1(iv)
                .x0(function (e) {
                  return e.base.x;
                })
            : Bs()
                .x(iv)
                .y1(av)
                .y0(function (e) {
                  return e.base.y;
                })),
        d.defined(rv).curve(l),
        d(p)
      );
    }
    return (
      (d =
        o === `vertical` && V(a)
          ? Bs().y(av).x1(iv).x0(a)
          : V(a)
            ? Bs().x(iv).y1(av).y0(a)
            : zs().x(iv).y(av)),
      d.defined(rv).curve(l),
      d(u)
    );
  },
  cv = function (e) {
    var t = e.className,
      n = e.points,
      r = e.path,
      i = e.pathRef;
    if ((!n || !n.length) && !r) return null;
    var a = n && n.length ? sv(e) : r;
    return z.createElement(
      `path`,
      X_({}, W(e, !1), Oo(e), { className: F(`recharts-curve`, t), d: a, ref: i })
    );
  },
  { getOwnPropertyNames: lv, getOwnPropertySymbols: uv } = Object,
  { hasOwnProperty: dv } = Object.prototype;
function fv(e, t) {
  return function (n, r, i) {
    return e(n, r, i) && t(n, r, i);
  };
}
function pv(e) {
  return function (t, n, r) {
    if (!t || !n || typeof t != `object` || typeof n != `object`) return e(t, n, r);
    let { cache: i } = r,
      a = i.get(t),
      o = i.get(n);
    if (a && o) return a === n && o === t;
    (i.set(t, n), i.set(n, t));
    let s = e(t, n, r);
    return (i.delete(t), i.delete(n), s);
  };
}
function mv(e) {
  return e?.[Symbol.toStringTag];
}
function hv(e) {
  return lv(e).concat(uv(e));
}
var gv = Object.hasOwn || ((e, t) => dv.call(e, t));
function _v(e, t) {
  return e === t || (!e && !t && e !== e && t !== t);
}
var vv = `__v`,
  yv = `__o`,
  bv = `_owner`,
  { getOwnPropertyDescriptor: xv, keys: Sv } = Object;
function Cv(e, t) {
  return e.byteLength === t.byteLength && Iv(new Uint8Array(e), new Uint8Array(t));
}
function wv(e, t, n) {
  let r = e.length;
  if (t.length !== r) return !1;
  for (; r-- > 0;) if (!n.equals(e[r], t[r], r, r, e, t, n)) return !1;
  return !0;
}
function Tv(e, t) {
  return (
    e.byteLength === t.byteLength &&
    Iv(
      new Uint8Array(e.buffer, e.byteOffset, e.byteLength),
      new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
    )
  );
}
function Ev(e, t) {
  return _v(e.getTime(), t.getTime());
}
function Dv(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function Ov(e, t) {
  return e === t;
}
function kv(e, t, n) {
  let r = e.size;
  if (r !== t.size) return !1;
  if (!r) return !0;
  let i = Array(r),
    a = e.entries(),
    o,
    s,
    c = 0;
  for (; (o = a.next()) && !o.done;) {
    let r = t.entries(),
      a = !1,
      l = 0;
    for (; (s = r.next()) && !s.done;) {
      if (i[l]) {
        l++;
        continue;
      }
      let r = o.value,
        u = s.value;
      if (n.equals(r[0], u[0], c, l, e, t, n) && n.equals(r[1], u[1], r[0], u[0], e, t, n)) {
        a = i[l] = !0;
        break;
      }
      l++;
    }
    if (!a) return !1;
    c++;
  }
  return !0;
}
var Av = _v;
function jv(e, t, n) {
  let r = Sv(e),
    i = r.length;
  if (Sv(t).length !== i) return !1;
  for (; i-- > 0;) if (!Rv(e, t, n, r[i])) return !1;
  return !0;
}
function Mv(e, t, n) {
  let r = hv(e),
    i = r.length;
  if (hv(t).length !== i) return !1;
  let a, o, s;
  for (; i-- > 0;)
    if (
      ((a = r[i]),
      !Rv(e, t, n, a) ||
        ((o = xv(e, a)),
        (s = xv(t, a)),
        (o || s) &&
          (!o ||
            !s ||
            o.configurable !== s.configurable ||
            o.enumerable !== s.enumerable ||
            o.writable !== s.writable)))
    )
      return !1;
  return !0;
}
function Nv(e, t) {
  return _v(e.valueOf(), t.valueOf());
}
function Pv(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function Fv(e, t, n) {
  let r = e.size;
  if (r !== t.size) return !1;
  if (!r) return !0;
  let i = Array(r),
    a = e.values(),
    o,
    s;
  for (; (o = a.next()) && !o.done;) {
    let r = t.values(),
      a = !1,
      c = 0;
    for (; (s = r.next()) && !s.done;) {
      if (!i[c] && n.equals(o.value, s.value, o.value, s.value, e, t, n)) {
        a = i[c] = !0;
        break;
      }
      c++;
    }
    if (!a) return !1;
  }
  return !0;
}
function Iv(e, t) {
  let n = e.byteLength;
  if (t.byteLength !== n || e.byteOffset !== t.byteOffset) return !1;
  for (; n-- > 0;) if (e[n] !== t[n]) return !1;
  return !0;
}
function Lv(e, t) {
  return (
    e.hostname === t.hostname &&
    e.pathname === t.pathname &&
    e.protocol === t.protocol &&
    e.port === t.port &&
    e.hash === t.hash &&
    e.username === t.username &&
    e.password === t.password
  );
}
function Rv(e, t, n, r) {
  return (r === bv || r === yv || r === vv) && (e.$$typeof || t.$$typeof)
    ? !0
    : gv(t, r) && n.equals(e[r], t[r], r, r, e, t, n);
}
var zv = `[object ArrayBuffer]`,
  Bv = `[object Arguments]`,
  Vv = `[object Boolean]`,
  Hv = `[object DataView]`,
  Uv = `[object Date]`,
  Wv = `[object Error]`,
  Gv = `[object Map]`,
  Kv = `[object Number]`,
  qv = `[object Object]`,
  Jv = `[object RegExp]`,
  Yv = `[object Set]`,
  Xv = `[object String]`,
  Zv = {
    '[object Int8Array]': !0,
    '[object Uint8Array]': !0,
    '[object Uint8ClampedArray]': !0,
    '[object Int16Array]': !0,
    '[object Uint16Array]': !0,
    '[object Int32Array]': !0,
    '[object Uint32Array]': !0,
    '[object Float16Array]': !0,
    '[object Float32Array]': !0,
    '[object Float64Array]': !0,
    '[object BigInt64Array]': !0,
    '[object BigUint64Array]': !0,
  },
  Qv = `[object URL]`,
  $v = Object.prototype.toString;
function ey({
  areArrayBuffersEqual: e,
  areArraysEqual: t,
  areDataViewsEqual: n,
  areDatesEqual: r,
  areErrorsEqual: i,
  areFunctionsEqual: a,
  areMapsEqual: o,
  areNumbersEqual: s,
  areObjectsEqual: c,
  arePrimitiveWrappersEqual: l,
  areRegExpsEqual: u,
  areSetsEqual: d,
  areTypedArraysEqual: f,
  areUrlsEqual: p,
  unknownTagComparators: m,
}) {
  return function (h, g, _) {
    if (h === g) return !0;
    if (h == null || g == null) return !1;
    let v = typeof h;
    if (v !== typeof g) return !1;
    if (v !== `object`) return v === `number` ? s(h, g, _) : v === `function` ? a(h, g, _) : !1;
    let y = h.constructor;
    if (y !== g.constructor) return !1;
    if (y === Object) return c(h, g, _);
    if (Array.isArray(h)) return t(h, g, _);
    if (y === Date) return r(h, g, _);
    if (y === RegExp) return u(h, g, _);
    if (y === Map) return o(h, g, _);
    if (y === Set) return d(h, g, _);
    let b = $v.call(h);
    if (b === Uv) return r(h, g, _);
    if (b === Jv) return u(h, g, _);
    if (b === Gv) return o(h, g, _);
    if (b === Yv) return d(h, g, _);
    if (b === qv) return typeof h.then != `function` && typeof g.then != `function` && c(h, g, _);
    if (b === Qv) return p(h, g, _);
    if (b === Wv) return i(h, g, _);
    if (b === Bv) return c(h, g, _);
    if (Zv[b]) return f(h, g, _);
    if (b === zv) return e(h, g, _);
    if (b === Hv) return n(h, g, _);
    if (b === Vv || b === Kv || b === Xv) return l(h, g, _);
    if (m) {
      let e = m[b];
      if (!e) {
        let t = mv(h);
        t && (e = m[t]);
      }
      if (e) return e(h, g, _);
    }
    return !1;
  };
}
function ty({ circular: e, createCustomConfig: t, strict: n }) {
  let r = {
    areArrayBuffersEqual: Cv,
    areArraysEqual: n ? Mv : wv,
    areDataViewsEqual: Tv,
    areDatesEqual: Ev,
    areErrorsEqual: Dv,
    areFunctionsEqual: Ov,
    areMapsEqual: n ? fv(kv, Mv) : kv,
    areNumbersEqual: Av,
    areObjectsEqual: n ? Mv : jv,
    arePrimitiveWrappersEqual: Nv,
    areRegExpsEqual: Pv,
    areSetsEqual: n ? fv(Fv, Mv) : Fv,
    areTypedArraysEqual: n ? fv(Iv, Mv) : Iv,
    areUrlsEqual: Lv,
    unknownTagComparators: void 0,
  };
  if ((t && (r = Object.assign({}, r, t(r))), e)) {
    let e = pv(r.areArraysEqual),
      t = pv(r.areMapsEqual),
      n = pv(r.areObjectsEqual),
      i = pv(r.areSetsEqual);
    r = Object.assign({}, r, {
      areArraysEqual: e,
      areMapsEqual: t,
      areObjectsEqual: n,
      areSetsEqual: i,
    });
  }
  return r;
}
function ny(e) {
  return function (t, n, r, i, a, o, s) {
    return e(t, n, s);
  };
}
function ry({ circular: e, comparator: t, createState: n, equals: r, strict: i }) {
  if (n)
    return function (a, o) {
      let { cache: s = e ? new WeakMap() : void 0, meta: c } = n();
      return t(a, o, { cache: s, equals: r, meta: c, strict: i });
    };
  if (e)
    return function (e, n) {
      return t(e, n, { cache: new WeakMap(), equals: r, meta: void 0, strict: i });
    };
  let a = { cache: void 0, equals: r, meta: void 0, strict: i };
  return function (e, n) {
    return t(e, n, a);
  };
}
var iy = ay();
(ay({ strict: !0 }),
  ay({ circular: !0 }),
  ay({ circular: !0, strict: !0 }),
  ay({ createInternalComparator: () => _v }),
  ay({ strict: !0, createInternalComparator: () => _v }),
  ay({ circular: !0, createInternalComparator: () => _v }),
  ay({ circular: !0, createInternalComparator: () => _v, strict: !0 }));
function ay(e = {}) {
  let { circular: t = !1, createInternalComparator: n, createState: r, strict: i = !1 } = e,
    a = ey(ty(e));
  return ry({ circular: t, comparator: a, createState: r, equals: n ? n(a) : ny(a), strict: i });
}
function oy(e) {
  typeof requestAnimationFrame < `u` && requestAnimationFrame(e);
}
function sy(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    n = -1;
  requestAnimationFrame(function r(i) {
    (n < 0 && (n = i), i - n > t ? (e(i), (n = -1)) : oy(r));
  });
}
function cy(e) {
  '@babel/helpers - typeof';
  return (
    (cy =
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
    cy(e)
  );
}
function ly(e) {
  return my(e) || py(e) || dy(e) || uy();
}
function uy() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function dy(e, t) {
  if (e) {
    if (typeof e == `string`) return fy(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return fy(e, t);
  }
}
function fy(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function py(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function my(e) {
  if (Array.isArray(e)) return e;
}
function hy() {
  var e = {},
    t = function () {
      return null;
    },
    n = !1,
    r = function r(i) {
      if (!n) {
        if (Array.isArray(i)) {
          if (!i.length) return;
          var a = ly(i),
            o = a[0],
            s = a.slice(1);
          if (typeof o == `number`) {
            sy(r.bind(null, s), o);
            return;
          }
          (r(o), sy(r.bind(null, s)));
          return;
        }
        (cy(i) === `object` && ((e = i), t(e)), typeof i == `function` && i());
      }
    };
  return {
    stop: function () {
      n = !0;
    },
    start: function (e) {
      ((n = !1), r(e));
    },
    subscribe: function (e) {
      return (
        (t = e),
        function () {
          t = function () {
            return null;
          };
        }
      );
    },
  };
}
function gy(e) {
  '@babel/helpers - typeof';
  return (
    (gy =
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
    gy(e)
  );
}
function _y(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function vy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? _y(Object(n), !0).forEach(function (t) {
          yy(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : _y(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function yy(e, t, n) {
  return (
    (t = by(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function by(e) {
  var t = xy(e, `string`);
  return gy(t) === `symbol` ? t : String(t);
}
function xy(e, t) {
  if (gy(e) !== `object` || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (gy(r) !== `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Sy = function (e, t) {
    return [Object.keys(e), Object.keys(t)].reduce(function (e, t) {
      return e.filter(function (e) {
        return t.includes(e);
      });
    });
  },
  Cy = function (e) {
    return e;
  },
  wy = function (e) {
    return e.replace(/([A-Z])/g, function (e) {
      return `-${e.toLowerCase()}`;
    });
  },
  Ty = function (e, t) {
    return Object.keys(t).reduce(function (n, r) {
      return vy(vy({}, n), {}, yy({}, r, e(r, t[r])));
    }, {});
  },
  Ey = function (e, t, n) {
    return e
      .map(function (e) {
        return `${wy(e)} ${t}ms ${n}`;
      })
      .join(`,`);
  },
  Dy = !1,
  Oy = function (e, t, n, r, i, a, o, s) {
    if (
      Dy &&
      typeof console < `u` &&
      console.warn &&
      (t === void 0 && console.warn(`LogUtils requires an error message argument`), !e)
    )
      if (t === void 0)
        console.warn(
          `Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.`
        );
      else {
        var c = [n, r, i, a, o, s],
          l = 0;
        console.warn(
          t.replace(/%s/g, function () {
            return c[l++];
          })
        );
      }
  };
function ky(e, t) {
  return My(e) || jy(e, t) || Fy(e, t) || Ay();
}
function Ay() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function jy(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function My(e) {
  if (Array.isArray(e)) return e;
}
function Ny(e) {
  return Ly(e) || Iy(e) || Fy(e) || Py();
}
function Py() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Fy(e, t) {
  if (e) {
    if (typeof e == `string`) return Ry(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ry(e, t);
  }
}
function Iy(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function Ly(e) {
  if (Array.isArray(e)) return Ry(e);
}
function Ry(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var zy = 1e-4,
  By = function (e, t) {
    return [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1];
  },
  Vy = function (e, t) {
    return e
      .map(function (e, n) {
        return e * t ** +n;
      })
      .reduce(function (e, t) {
        return e + t;
      });
  },
  Hy = function (e, t) {
    return function (n) {
      return Vy(By(e, t), n);
    };
  },
  Uy = function (e, t) {
    return function (n) {
      var r = By(e, t);
      return Vy(
        [].concat(
          Ny(
            r
              .map(function (e, t) {
                return e * t;
              })
              .slice(1)
          ),
          [0]
        ),
        n
      );
    };
  },
  Wy = function () {
    var e = [...arguments],
      t = e[0],
      n = e[1],
      r = e[2],
      i = e[3];
    if (e.length === 1)
      switch (e[0]) {
        case `linear`:
          ((t = 0), (n = 0), (r = 1), (i = 1));
          break;
        case `ease`:
          ((t = 0.25), (n = 0.1), (r = 0.25), (i = 1));
          break;
        case `ease-in`:
          ((t = 0.42), (n = 0), (r = 1), (i = 1));
          break;
        case `ease-out`:
          ((t = 0.42), (n = 0), (r = 0.58), (i = 1));
          break;
        case `ease-in-out`:
          ((t = 0), (n = 0), (r = 0.58), (i = 1));
          break;
        default:
          var a = e[0].split(`(`);
          if (a[0] === `cubic-bezier` && a[1].split(`)`)[0].split(`,`).length === 4) {
            var o = ky(
              a[1]
                .split(`)`)[0]
                .split(`,`)
                .map(function (e) {
                  return parseFloat(e);
                }),
              4
            );
            ((t = o[0]), (n = o[1]), (r = o[2]), (i = o[3]));
          } else
            Oy(
              !1,
              `[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s`,
              e
            );
      }
    Oy(
      [t, r, n, i].every(function (e) {
        return typeof e == `number` && e >= 0 && e <= 1;
      }),
      `[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s`,
      e
    );
    var s = Hy(t, r),
      c = Hy(n, i),
      l = Uy(t, r),
      u = function (e) {
        return e > 1 ? 1 : e < 0 ? 0 : e;
      },
      d = function (e) {
        for (var t = e > 1 ? 1 : e, n = t, r = 0; r < 8; ++r) {
          var i = s(n) - t,
            a = l(n);
          if (Math.abs(i - t) < zy || a < zy) return c(n);
          n = u(n - i / a);
        }
        return c(n);
      };
    return ((d.isStepper = !1), d);
  },
  Gy = function () {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = e.stiff,
      n = t === void 0 ? 100 : t,
      r = e.damping,
      i = r === void 0 ? 8 : r,
      a = e.dt,
      o = a === void 0 ? 17 : a,
      s = function (e, t, r) {
        var a = r + ((-(e - t) * n - r * i) * o) / 1e3,
          s = (r * o) / 1e3 + e;
        return Math.abs(s - t) < zy && Math.abs(a) < zy ? [t, 0] : [s, a];
      };
    return ((s.isStepper = !0), (s.dt = o), s);
  },
  Ky = function () {
    var e = [...arguments],
      t = e[0];
    if (typeof t == `string`)
      switch (t) {
        case `ease`:
        case `ease-in-out`:
        case `ease-out`:
        case `ease-in`:
        case `linear`:
          return Wy(t);
        case `spring`:
          return Gy();
        default:
          if (t.split(`(`)[0] === `cubic-bezier`) return Wy(t);
          Oy(
            !1,
            `[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s`,
            e
          );
      }
    return typeof t == `function`
      ? t
      : (Oy(
          !1,
          `[configEasing]: first argument type should be function or string, instead received %s`,
          e
        ),
        null);
  };
function qy(e) {
  '@babel/helpers - typeof';
  return (
    (qy =
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
    qy(e)
  );
}
function Jy(e) {
  return Zy(e) || Xy(e) || ab(e) || Yy();
}
function Yy() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xy(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function Zy(e) {
  if (Array.isArray(e)) return ob(e);
}
function Qy(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function $y(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Qy(Object(n), !0).forEach(function (t) {
          eb(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Qy(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function eb(e, t, n) {
  return (
    (t = tb(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function tb(e) {
  var t = nb(e, `string`);
  return qy(t) === `symbol` ? t : String(t);
}
function nb(e, t) {
  if (qy(e) !== `object` || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (qy(r) !== `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function rb(e, t) {
  return cb(e) || sb(e, t) || ab(e, t) || ib();
}
function ib() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ab(e, t) {
  if (e) {
    if (typeof e == `string`) return ob(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ob(e, t);
  }
}
function ob(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function sb(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function cb(e) {
  if (Array.isArray(e)) return e;
}
var lb = function (e, t, n) {
    return e + (t - e) * n;
  },
  ub = function (e) {
    return e.from !== e.to;
  },
  db = function e(t, n, r) {
    var i = Ty(function (e, n) {
      if (ub(n)) {
        var r = rb(t(n.from, n.to, n.velocity), 2),
          i = r[0],
          a = r[1];
        return $y($y({}, n), {}, { from: i, velocity: a });
      }
      return n;
    }, n);
    return r < 1
      ? Ty(function (e, t) {
          return ub(t)
            ? $y(
                $y({}, t),
                {},
                { velocity: lb(t.velocity, i[e].velocity, r), from: lb(t.from, i[e].from, r) }
              )
            : t;
        }, n)
      : e(t, i, r - 1);
  },
  fb = function (e, t, n, r, i) {
    var a = Sy(e, t),
      o = a.reduce(function (n, r) {
        return $y($y({}, n), {}, eb({}, r, [e[r], t[r]]));
      }, {}),
      s = a.reduce(function (n, r) {
        return $y($y({}, n), {}, eb({}, r, { from: e[r], velocity: 0, to: t[r] }));
      }, {}),
      c = -1,
      l,
      u,
      d = function () {
        return null;
      },
      f = function () {
        return Ty(function (e, t) {
          return t.from;
        }, s);
      },
      p = function () {
        return !Object.values(s).filter(ub).length;
      };
    return (
      (d = n.isStepper
        ? function (r) {
            l ||= r;
            var a = (r - l) / n.dt;
            ((s = db(n, s, a)),
              i($y($y($y({}, e), t), f(s))),
              (l = r),
              p() || (c = requestAnimationFrame(d)));
          }
        : function (a) {
            u ||= a;
            var s = (a - u) / r,
              l = Ty(function (e, t) {
                return lb.apply(void 0, Jy(t).concat([n(s)]));
              }, o);
            if ((i($y($y($y({}, e), t), l)), s < 1)) c = requestAnimationFrame(d);
            else {
              var f = Ty(function (e, t) {
                return lb.apply(void 0, Jy(t).concat([n(1)]));
              }, o);
              i($y($y($y({}, e), t), f));
            }
          }),
      function () {
        return (
          requestAnimationFrame(d),
          function () {
            cancelAnimationFrame(c);
          }
        );
      }
    );
  },
  Y = r(y());
function pb(e) {
  '@babel/helpers - typeof';
  return (
    (pb =
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
    pb(e)
  );
}
var mb = [
  `children`,
  `begin`,
  `duration`,
  `attributeName`,
  `easing`,
  `isActive`,
  `steps`,
  `from`,
  `to`,
  `canBegin`,
  `onAnimationEnd`,
  `shouldReAnimate`,
  `onAnimationReStart`,
];
function hb(e, t) {
  if (e == null) return {};
  var n = gb(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function gb(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function _b(e) {
  return xb(e) || bb(e) || yb(e) || vb();
}
function vb() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function yb(e, t) {
  if (e) {
    if (typeof e == `string`) return Sb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Sb(e, t);
  }
}
function bb(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function xb(e) {
  if (Array.isArray(e)) return Sb(e);
}
function Sb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Cb(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function wb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Cb(Object(n), !0).forEach(function (t) {
          Tb(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Cb(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Tb(e, t, n) {
  return (
    (t = kb(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Eb(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function Db(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, kb(r.key), r));
  }
}
function Ob(e, t, n) {
  return (
    t && Db(e.prototype, t),
    n && Db(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function kb(e) {
  var t = Ab(e, `string`);
  return pb(t) === `symbol` ? t : String(t);
}
function Ab(e, t) {
  if (pb(e) !== `object` || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (pb(r) !== `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function jb(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Mb(e, t));
}
function Mb(e, t) {
  return (
    (Mb = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    Mb(e, t)
  );
}
function Nb(e) {
  var t = Ib();
  return function () {
    var n = Lb(e),
      r;
    if (t) {
      var i = Lb(this).constructor;
      r = Reflect.construct(n, arguments, i);
    } else r = n.apply(this, arguments);
    return Pb(this, r);
  };
}
function Pb(e, t) {
  if (t && (pb(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return Fb(e);
}
function Fb(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function Ib() {
  if (typeof Reflect > `u` || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == `function`) return !0;
  try {
    return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
  } catch {
    return !1;
  }
}
function Lb(e) {
  return (
    (Lb = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    Lb(e)
  );
}
var Rb = (function (e) {
  jb(n, e);
  var t = Nb(n);
  function n(e, r) {
    var i;
    (Eb(this, n), (i = t.call(this, e, r)));
    var a = i.props,
      o = a.isActive,
      s = a.attributeName,
      c = a.from,
      l = a.to,
      u = a.steps,
      d = a.children,
      f = a.duration;
    if (
      ((i.handleStyleChange = i.handleStyleChange.bind(Fb(i))),
      (i.changeStyle = i.changeStyle.bind(Fb(i))),
      !o || f <= 0)
    )
      return ((i.state = { style: {} }), typeof d == `function` && (i.state = { style: l }), Pb(i));
    if (u && u.length) i.state = { style: u[0].style };
    else if (c) {
      if (typeof d == `function`) return ((i.state = { style: c }), Pb(i));
      i.state = { style: s ? Tb({}, s, c) : c };
    } else i.state = { style: {} };
    return i;
  }
  return (
    Ob(n, [
      {
        key: `componentDidMount`,
        value: function () {
          var e = this.props,
            t = e.isActive,
            n = e.canBegin;
          ((this.mounted = !0), !(!t || !n) && this.runAnimation(this.props));
        },
      },
      {
        key: `componentDidUpdate`,
        value: function (e) {
          var t = this.props,
            n = t.isActive,
            r = t.canBegin,
            i = t.attributeName,
            a = t.shouldReAnimate,
            o = t.to,
            s = t.from,
            c = this.state.style;
          if (r) {
            if (!n) {
              var l = { style: i ? Tb({}, i, o) : o };
              this.state && c && ((i && c[i] !== o) || (!i && c !== o)) && this.setState(l);
              return;
            }
            if (!(iy(e.to, o) && e.canBegin && e.isActive)) {
              var u = !e.canBegin || !e.isActive;
              (this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation());
              var d = u || a ? s : e.to;
              if (this.state && c) {
                var f = { style: i ? Tb({}, i, d) : d };
                ((i && c[i] !== d) || (!i && c !== d)) && this.setState(f);
              }
              this.runAnimation(wb(wb({}, this.props), {}, { from: d, begin: 0 }));
            }
          }
        },
      },
      {
        key: `componentWillUnmount`,
        value: function () {
          this.mounted = !1;
          var e = this.props.onAnimationEnd;
          (this.unSubscribe && this.unSubscribe(),
            (this.manager &&= (this.manager.stop(), null)),
            this.stopJSAnimation && this.stopJSAnimation(),
            e && e());
        },
      },
      {
        key: `handleStyleChange`,
        value: function (e) {
          this.changeStyle(e);
        },
      },
      {
        key: `changeStyle`,
        value: function (e) {
          this.mounted && this.setState({ style: e });
        },
      },
      {
        key: `runJSAnimation`,
        value: function (e) {
          var t = this,
            n = e.from,
            r = e.to,
            i = e.duration,
            a = e.easing,
            o = e.begin,
            s = e.onAnimationEnd,
            c = e.onAnimationStart,
            l = fb(n, r, Ky(a), i, this.changeStyle);
          this.manager.start([
            c,
            o,
            function () {
              t.stopJSAnimation = l();
            },
            i,
            s,
          ]);
        },
      },
      {
        key: `runStepAnimation`,
        value: function (e) {
          var t = this,
            n = e.steps,
            r = e.begin,
            i = e.onAnimationStart,
            a = n[0],
            o = a.style,
            s = a.duration,
            c = s === void 0 ? 0 : s;
          return this.manager.start(
            [i].concat(
              _b(
                n.reduce(
                  function (e, r, i) {
                    if (i === 0) return e;
                    var a = r.duration,
                      o = r.easing,
                      s = o === void 0 ? `ease` : o,
                      c = r.style,
                      l = r.properties,
                      u = r.onAnimationEnd,
                      d = i > 0 ? n[i - 1] : r,
                      f = l || Object.keys(c);
                    if (typeof s == `function` || s === `spring`)
                      return [].concat(_b(e), [
                        t.runJSAnimation.bind(t, { from: d.style, to: c, duration: a, easing: s }),
                        a,
                      ]);
                    var p = Ey(f, a, s),
                      m = wb(wb(wb({}, d.style), c), {}, { transition: p });
                    return [].concat(_b(e), [m, a, u]).filter(Cy);
                  },
                  [o, Math.max(c, r)]
                )
              ),
              [e.onAnimationEnd]
            )
          );
        },
      },
      {
        key: `runAnimation`,
        value: function (e) {
          this.manager ||= hy();
          var t = e.begin,
            n = e.duration,
            r = e.attributeName,
            i = e.to,
            a = e.easing,
            o = e.onAnimationStart,
            s = e.onAnimationEnd,
            c = e.steps,
            l = e.children,
            u = this.manager;
          if (
            ((this.unSubscribe = u.subscribe(this.handleStyleChange)),
            typeof a == `function` || typeof l == `function` || a === `spring`)
          ) {
            this.runJSAnimation(e);
            return;
          }
          if (c.length > 1) {
            this.runStepAnimation(e);
            return;
          }
          var d = r ? Tb({}, r, i) : i,
            f = Ey(Object.keys(d), n, a);
          u.start([o, t, wb(wb({}, d), {}, { transition: f }), n, s]);
        },
      },
      {
        key: `render`,
        value: function () {
          var e = this.props,
            t = e.children;
          e.begin;
          var n = e.duration;
          (e.attributeName, e.easing);
          var r = e.isActive;
          (e.steps,
            e.from,
            e.to,
            e.canBegin,
            e.onAnimationEnd,
            e.shouldReAnimate,
            e.onAnimationReStart);
          var i = hb(e, mb),
            a = z.Children.count(t),
            o = this.state.style;
          if (typeof t == `function`) return t(o);
          if (!r || a === 0 || n <= 0) return t;
          var s = function (e) {
            var t = e.props,
              n = t.style,
              r = n === void 0 ? {} : n,
              a = t.className;
            return (0, z.cloneElement)(
              e,
              wb(wb({}, i), {}, { style: wb(wb({}, r), o), className: a })
            );
          };
          return a === 1
            ? s(z.Children.only(t))
            : z.createElement(
                `div`,
                null,
                z.Children.map(t, function (e) {
                  return s(e);
                })
              );
        },
      },
    ]),
    n
  );
})(z.PureComponent);
((Rb.displayName = `Animate`),
  (Rb.defaultProps = {
    begin: 0,
    duration: 1e3,
    from: ``,
    to: ``,
    attributeName: ``,
    easing: `ease`,
    isActive: !0,
    canBegin: !0,
    steps: [],
    onAnimationEnd: function () {},
    onAnimationStart: function () {},
  }),
  (Rb.propTypes = {
    from: Y.default.oneOfType([Y.default.object, Y.default.string]),
    to: Y.default.oneOfType([Y.default.object, Y.default.string]),
    attributeName: Y.default.string,
    duration: Y.default.number,
    begin: Y.default.number,
    easing: Y.default.oneOfType([Y.default.string, Y.default.func]),
    steps: Y.default.arrayOf(
      Y.default.shape({
        duration: Y.default.number.isRequired,
        style: Y.default.object.isRequired,
        easing: Y.default.oneOfType([
          Y.default.oneOf([`ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`]),
          Y.default.func,
        ]),
        properties: Y.default.arrayOf(`string`),
        onAnimationEnd: Y.default.func,
      })
    ),
    children: Y.default.oneOfType([Y.default.node, Y.default.func]),
    isActive: Y.default.bool,
    canBegin: Y.default.bool,
    onAnimationEnd: Y.default.func,
    shouldReAnimate: Y.default.bool,
    onAnimationStart: Y.default.func,
    onAnimationReStart: Y.default.func,
  }));
var zb = Rb;
function Bb(e) {
  '@babel/helpers - typeof';
  return (
    (Bb =
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
    Bb(e)
  );
}
function Vb() {
  return (
    (Vb = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Vb.apply(this, arguments)
  );
}
function Hb(e, t) {
  return qb(e) || Kb(e, t) || Wb(e, t) || Ub();
}
function Ub() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Wb(e, t) {
  if (e) {
    if (typeof e == `string`) return Gb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Gb(e, t);
  }
}
function Gb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Kb(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function qb(e) {
  if (Array.isArray(e)) return e;
}
function Jb(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Yb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Jb(Object(n), !0).forEach(function (t) {
          Xb(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Jb(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Xb(e, t, n) {
  return (
    (t = Zb(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Zb(e) {
  var t = Qb(e, `string`);
  return Bb(t) == `symbol` ? t : String(t);
}
function Qb(e, t) {
  if (Bb(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Bb(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var $b = function (e, t, n, r, i) {
    var a = Math.min(Math.abs(n) / 2, Math.abs(r) / 2),
      o = r >= 0 ? 1 : -1,
      s = n >= 0 ? 1 : -1,
      c = +((r >= 0 && n >= 0) || (r < 0 && n < 0)),
      l;
    if (a > 0 && i instanceof Array) {
      for (var u = [0, 0, 0, 0], d = 0, f = 4; d < f; d++) u[d] = i[d] > a ? a : i[d];
      ((l = `M${e},${t + o * u[0]}`),
        u[0] > 0 && (l += `A ${u[0]},${u[0]},0,0,${c},${e + s * u[0]},${t}`),
        (l += `L ${e + n - s * u[1]},${t}`),
        u[1] > 0 &&
          (l += `A ${u[1]},${u[1]},0,0,${c},
        ${e + n},${t + o * u[1]}`),
        (l += `L ${e + n},${t + r - o * u[2]}`),
        u[2] > 0 &&
          (l += `A ${u[2]},${u[2]},0,0,${c},
        ${e + n - s * u[2]},${t + r}`),
        (l += `L ${e + s * u[3]},${t + r}`),
        u[3] > 0 &&
          (l += `A ${u[3]},${u[3]},0,0,${c},
        ${e},${t + r - o * u[3]}`),
        (l += `Z`));
    } else if (a > 0 && i === +i && i > 0) {
      var p = Math.min(a, i);
      l = `M ${e},${t + o * p}
            A ${p},${p},0,0,${c},${e + s * p},${t}
            L ${e + n - s * p},${t}
            A ${p},${p},0,0,${c},${e + n},${t + o * p}
            L ${e + n},${t + r - o * p}
            A ${p},${p},0,0,${c},${e + n - s * p},${t + r}
            L ${e + s * p},${t + r}
            A ${p},${p},0,0,${c},${e},${t + r - o * p} Z`;
    } else l = `M ${e},${t} h ${n} v ${r} h ${-n} Z`;
    return l;
  },
  ex = function (e, t) {
    if (!e || !t) return !1;
    var n = e.x,
      r = e.y,
      i = t.x,
      a = t.y,
      o = t.width,
      s = t.height;
    if (Math.abs(o) > 0 && Math.abs(s) > 0) {
      var c = Math.min(i, i + o),
        l = Math.max(i, i + o),
        u = Math.min(a, a + s),
        d = Math.max(a, a + s);
      return n >= c && n <= l && r >= u && r <= d;
    }
    return !1;
  },
  tx = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: !1,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: `ease`,
  },
  nx = function (e) {
    var t = Yb(Yb({}, tx), e),
      n = (0, z.useRef)(),
      r = Hb((0, z.useState)(-1), 2),
      i = r[0],
      a = r[1];
    (0, z.useEffect)(function () {
      if (n.current && n.current.getTotalLength)
        try {
          var e = n.current.getTotalLength();
          e && a(e);
        } catch {}
    }, []);
    var o = t.x,
      s = t.y,
      c = t.width,
      l = t.height,
      u = t.radius,
      d = t.className,
      f = t.animationEasing,
      p = t.animationDuration,
      m = t.animationBegin,
      h = t.isAnimationActive,
      g = t.isUpdateAnimationActive;
    if (o !== +o || s !== +s || c !== +c || l !== +l || c === 0 || l === 0) return null;
    var _ = F(`recharts-rectangle`, d);
    return g
      ? z.createElement(
          zb,
          {
            canBegin: i > 0,
            from: { width: c, height: l, x: o, y: s },
            to: { width: c, height: l, x: o, y: s },
            duration: p,
            animationEasing: f,
            isActive: g,
          },
          function (e) {
            var r = e.width,
              a = e.height,
              o = e.x,
              s = e.y;
            return z.createElement(
              zb,
              {
                canBegin: i > 0,
                from: `0px ${i === -1 ? 1 : i}px`,
                to: `${i}px 0px`,
                attributeName: `strokeDasharray`,
                begin: m,
                duration: p,
                isActive: h,
                easing: f,
              },
              z.createElement(
                `path`,
                Vb({}, W(t, !0), { className: _, d: $b(o, s, r, a, u), ref: n })
              )
            );
          }
        )
      : z.createElement(`path`, Vb({}, W(t, !0), { className: _, d: $b(o, s, c, l, u) }));
  },
  rx = [`points`, `className`, `baseLinePoints`, `connectNulls`];
function ix() {
  return (
    (ix = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ix.apply(this, arguments)
  );
}
function ax(e, t) {
  if (e == null) return {};
  var n = ox(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function ox(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function sx(e) {
  return dx(e) || ux(e) || lx(e) || cx();
}
function cx() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lx(e, t) {
  if (e) {
    if (typeof e == `string`) return fx(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return fx(e, t);
  }
}
function ux(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function dx(e) {
  if (Array.isArray(e)) return fx(e);
}
function fx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var px = function (e) {
    return e && e.x === +e.x && e.y === +e.y;
  },
  mx = function () {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      t = [[]];
    return (
      e.forEach(function (e) {
        px(e) ? t[t.length - 1].push(e) : t[t.length - 1].length > 0 && t.push([]);
      }),
      px(e[0]) && t[t.length - 1].push(e[0]),
      t[t.length - 1].length <= 0 && (t = t.slice(0, -1)),
      t
    );
  },
  hx = function (e, t) {
    var n = mx(e);
    t &&
      (n = [
        n.reduce(function (e, t) {
          return [].concat(sx(e), sx(t));
        }, []),
      ]);
    var r = n
      .map(function (e) {
        return e.reduce(function (e, t, n) {
          return `${e}${n === 0 ? `M` : `L`}${t.x},${t.y}`;
        }, ``);
      })
      .join(``);
    return n.length === 1 ? `${r}Z` : r;
  },
  gx = function (e, t, n) {
    var r = hx(e, n);
    return `${r.slice(-1) === `Z` ? r.slice(0, -1) : r}L${hx(t.reverse(), n).slice(1)}`;
  },
  _x = function (e) {
    var t = e.points,
      n = e.className,
      r = e.baseLinePoints,
      i = e.connectNulls,
      a = ax(e, rx);
    if (!t || !t.length) return null;
    var o = F(`recharts-polygon`, n);
    if (r && r.length) {
      var s = a.stroke && a.stroke !== `none`,
        c = gx(t, r, i);
      return z.createElement(
        `g`,
        { className: o },
        z.createElement(
          `path`,
          ix({}, W(a, !0), { fill: c.slice(-1) === `Z` ? a.fill : `none`, stroke: `none`, d: c })
        ),
        s ? z.createElement(`path`, ix({}, W(a, !0), { fill: `none`, d: hx(t, i) })) : null,
        s ? z.createElement(`path`, ix({}, W(a, !0), { fill: `none`, d: hx(r, i) })) : null
      );
    }
    var l = hx(t, i);
    return z.createElement(
      `path`,
      ix({}, W(a, !0), { fill: l.slice(-1) === `Z` ? a.fill : `none`, className: o, d: l })
    );
  };
function vx() {
  return (
    (vx = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    vx.apply(this, arguments)
  );
}
var yx = function (e) {
  var t = e.cx,
    n = e.cy,
    r = e.r,
    i = e.className,
    a = F(`recharts-dot`, i);
  return t === +t && n === +n && r === +r
    ? z.createElement(`circle`, vx({}, W(e, !1), Oo(e), { className: a, cx: t, cy: n, r }))
    : null;
};
function bx(e) {
  '@babel/helpers - typeof';
  return (
    (bx =
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
    bx(e)
  );
}
var xx = [`x`, `y`, `top`, `left`, `width`, `height`, `className`];
function Sx() {
  return (
    (Sx = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Sx.apply(this, arguments)
  );
}
function Cx(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function wx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Cx(Object(n), !0).forEach(function (t) {
          Tx(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Cx(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Tx(e, t, n) {
  return (
    (t = Ex(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Ex(e) {
  var t = Dx(e, `string`);
  return bx(t) == `symbol` ? t : String(t);
}
function Dx(e, t) {
  if (bx(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (bx(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function Ox(e, t) {
  if (e == null) return {};
  var n = kx(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function kx(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
var Ax = function (e, t, n, r, i, a) {
    return `M${e},${i}v${r}M${a},${t}h${n}`;
  },
  jx = function (e) {
    var t = e.x,
      n = t === void 0 ? 0 : t,
      r = e.y,
      i = r === void 0 ? 0 : r,
      a = e.top,
      o = a === void 0 ? 0 : a,
      s = e.left,
      c = s === void 0 ? 0 : s,
      l = e.width,
      u = l === void 0 ? 0 : l,
      d = e.height,
      f = d === void 0 ? 0 : d,
      p = e.className,
      m = Ox(e, xx),
      h = wx({ x: n, y: i, top: o, left: c, width: u, height: f }, m);
    return !V(n) || !V(i) || !V(u) || !V(f) || !V(o) || !V(c)
      ? null
      : z.createElement(
          `path`,
          Sx({}, W(h, !0), { className: F(`recharts-cross`, p), d: Ax(n, i, u, f, o, c) })
        );
  },
  Mx = o((e, t) => {
    t.exports = au()(Object.getPrototypeOf, Object);
  }),
  Nx = o((e, t) => {
    var n = oa(),
      r = Mx(),
      i = sa(),
      a = `[object Object]`,
      o = Function.prototype,
      s = Object.prototype,
      c = o.toString,
      l = s.hasOwnProperty,
      u = c.call(Object);
    function d(e) {
      if (!i(e) || n(e) != a) return !1;
      var t = r(e);
      if (t === null) return !0;
      var o = l.call(t, `constructor`) && t.constructor;
      return typeof o == `function` && o instanceof o && c.call(o) == u;
    }
    t.exports = d;
  }),
  Px = o((e, t) => {
    var n = oa(),
      r = sa(),
      i = `[object Boolean]`;
    function a(e) {
      return e === !0 || e === !1 || (r(e) && n(e) == i);
    }
    t.exports = a;
  });
function Fx(e) {
  '@babel/helpers - typeof';
  return (
    (Fx =
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
    Fx(e)
  );
}
function Ix() {
  return (
    (Ix = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ix.apply(this, arguments)
  );
}
function Lx(e, t) {
  return Hx(e) || Vx(e, t) || zx(e, t) || Rx();
}
function Rx() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zx(e, t) {
  if (e) {
    if (typeof e == `string`) return Bx(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Bx(e, t);
  }
}
function Bx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Vx(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function Hx(e) {
  if (Array.isArray(e)) return e;
}
function Ux(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Wx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Ux(Object(n), !0).forEach(function (t) {
          Gx(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ux(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Gx(e, t, n) {
  return (
    (t = Kx(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Kx(e) {
  var t = qx(e, `string`);
  return Fx(t) == `symbol` ? t : String(t);
}
function qx(e, t) {
  if (Fx(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Fx(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Jx = function (e, t, n, r, i) {
    var a = n - r,
      o = `M ${e},${t}`;
    return (
      (o += `L ${e + n},${t}`),
      (o += `L ${e + n - a / 2},${t + i}`),
      (o += `L ${e + n - a / 2 - r},${t + i}`),
      (o += `L ${e},${t} Z`),
      o
    );
  },
  Yx = {
    x: 0,
    y: 0,
    upperWidth: 0,
    lowerWidth: 0,
    height: 0,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: `ease`,
  },
  Xx = function (e) {
    var t = Wx(Wx({}, Yx), e),
      n = (0, z.useRef)(),
      r = Lx((0, z.useState)(-1), 2),
      i = r[0],
      a = r[1];
    (0, z.useEffect)(function () {
      if (n.current && n.current.getTotalLength)
        try {
          var e = n.current.getTotalLength();
          e && a(e);
        } catch {}
    }, []);
    var o = t.x,
      s = t.y,
      c = t.upperWidth,
      l = t.lowerWidth,
      u = t.height,
      d = t.className,
      f = t.animationEasing,
      p = t.animationDuration,
      m = t.animationBegin,
      h = t.isUpdateAnimationActive;
    if (o !== +o || s !== +s || c !== +c || l !== +l || u !== +u || (c === 0 && l === 0) || u === 0)
      return null;
    var g = F(`recharts-trapezoid`, d);
    return h
      ? z.createElement(
          zb,
          {
            canBegin: i > 0,
            from: { upperWidth: 0, lowerWidth: 0, height: u, x: o, y: s },
            to: { upperWidth: c, lowerWidth: l, height: u, x: o, y: s },
            duration: p,
            animationEasing: f,
            isActive: h,
          },
          function (e) {
            var r = e.upperWidth,
              a = e.lowerWidth,
              o = e.height,
              s = e.x,
              c = e.y;
            return z.createElement(
              zb,
              {
                canBegin: i > 0,
                from: `0px ${i === -1 ? 1 : i}px`,
                to: `${i}px 0px`,
                attributeName: `strokeDasharray`,
                begin: m,
                duration: p,
                easing: f,
              },
              z.createElement(
                `path`,
                Ix({}, W(t, !0), { className: g, d: Jx(s, c, r, a, o), ref: n })
              )
            );
          }
        )
      : z.createElement(
          `g`,
          null,
          z.createElement(`path`, Ix({}, W(t, !0), { className: g, d: Jx(o, s, c, l, u) }))
        );
  },
  Zx = r(Nx()),
  Qx = r(Px()),
  $x = [`option`, `shapeType`, `propTransformer`, `activeClassName`, `isActive`];
function eS(e) {
  '@babel/helpers - typeof';
  return (
    (eS =
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
    eS(e)
  );
}
function tS(e, t) {
  if (e == null) return {};
  var n = nS(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function nS(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function rS(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function iS(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? rS(Object(n), !0).forEach(function (t) {
          aS(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : rS(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function aS(e, t, n) {
  return (
    (t = oS(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function oS(e) {
  var t = sS(e, `string`);
  return eS(t) == `symbol` ? t : String(t);
}
function sS(e, t) {
  if (eS(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (eS(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function cS(e, t) {
  return iS(iS({}, t), e);
}
function lS(e, t) {
  return e === `symbols`;
}
function uS(e) {
  var t = e.shapeType,
    n = e.elementProps;
  switch (t) {
    case `rectangle`:
      return z.createElement(nx, n);
    case `trapezoid`:
      return z.createElement(Xx, n);
    case `sector`:
      return z.createElement(J_, n);
    case `symbols`:
      if (lS(t, n)) return z.createElement(al, n);
      break;
    default:
      return null;
  }
}
function dS(e) {
  return (0, z.isValidElement)(e) ? e.props : e;
}
function fS(e) {
  var t = e.option,
    n = e.shapeType,
    r = e.propTransformer,
    i = r === void 0 ? cS : r,
    a = e.activeClassName,
    o = a === void 0 ? `recharts-active-shape` : a,
    s = e.isActive,
    c = tS(e, $x),
    l;
  if ((0, z.isValidElement)(t)) l = (0, z.cloneElement)(t, iS(iS({}, c), dS(t)));
  else if ((0, U.default)(t)) l = t(c);
  else if ((0, Zx.default)(t) && !(0, Qx.default)(t)) {
    var u = i(t, c);
    l = z.createElement(uS, { shapeType: n, elementProps: u });
  } else {
    var d = c;
    l = z.createElement(uS, { shapeType: n, elementProps: d });
  }
  return s ? z.createElement(G, { className: o }, l) : l;
}
function pS(e, t) {
  return t != null && `trapezoids` in e.props;
}
function mS(e, t) {
  return t != null && `sectors` in e.props;
}
function hS(e, t) {
  return t != null && `points` in e.props;
}
function gS(e, t) {
  var n,
    r,
    i = e.x === (t == null || (n = t.labelViewBox) == null ? void 0 : n.x) || e.x === t.x,
    a = e.y === (t == null || (r = t.labelViewBox) == null ? void 0 : r.y) || e.y === t.y;
  return i && a;
}
function _S(e, t) {
  var n = e.endAngle === t.endAngle,
    r = e.startAngle === t.startAngle;
  return n && r;
}
function vS(e, t) {
  var n = e.x === t.x,
    r = e.y === t.y,
    i = e.z === t.z;
  return n && r && i;
}
function yS(e, t) {
  var n;
  return (pS(e, t) ? (n = gS) : mS(e, t) ? (n = _S) : hS(e, t) && (n = vS), n);
}
function bS(e, t) {
  var n;
  return (
    pS(e, t) ? (n = `trapezoids`) : mS(e, t) ? (n = `sectors`) : hS(e, t) && (n = `points`),
    n
  );
}
function xS(e, t) {
  if (pS(e, t)) {
    var n;
    return (n = t.tooltipPayload) == null || (n = n[0]) == null || (n = n.payload) == null
      ? void 0
      : n.payload;
  }
  if (mS(e, t)) {
    var r;
    return (r = t.tooltipPayload) == null || (r = r[0]) == null || (r = r.payload) == null
      ? void 0
      : r.payload;
  }
  return hS(e, t) ? t.payload : {};
}
function SS(e) {
  var t = e.activeTooltipItem,
    n = e.graphicalItem,
    r = e.itemData,
    i = bS(n, t),
    a = xS(n, t),
    o = r.filter(function (e, r) {
      var o = (0, Nh.default)(a, e),
        s = n.props[i].filter(function (e) {
          return yS(n, t)(e, t);
        }),
        c = r === n.props[i].indexOf(s[s.length - 1]);
      return o && c;
    });
  return r.indexOf(o[o.length - 1]);
}
var CS = o((e, t) => {
    var n = Math.ceil,
      r = Math.max;
    function i(e, t, i, a) {
      for (var o = -1, s = r(n((t - e) / (i || 1)), 0), c = Array(s); s--;)
        ((c[a ? s : ++o] = e), (e += i));
      return c;
    }
    t.exports = i;
  }),
  wS = o((e, t) => {
    var n = Jf(),
      r = 1 / 0,
      i = 17976931348623157e292;
    function a(e) {
      return e
        ? ((e = n(e)), e === r || e === -r ? (e < 0 ? -1 : 1) * i : e === e ? e : 0)
        : e === 0
          ? e
          : 0;
    }
    t.exports = a;
  }),
  TS = o((e, t) => {
    var n = CS(),
      r = Nd(),
      i = wS();
    function a(e) {
      return function (t, a, o) {
        return (
          o && typeof o != `number` && r(t, a, o) && (a = o = void 0),
          (t = i(t)),
          a === void 0 ? ((a = t), (t = 0)) : (a = i(a)),
          (o = o === void 0 ? (t < a ? 1 : -1) : i(o)),
          n(t, a, o, e)
        );
      };
    }
    t.exports = a;
  }),
  ES = o((e, t) => {
    t.exports = TS()();
  });
function DS(e) {
  '@babel/helpers - typeof';
  return (
    (DS =
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
    DS(e)
  );
}
function OS(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function kS(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? OS(Object(n), !0).forEach(function (t) {
          AS(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : OS(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function AS(e, t, n) {
  return (
    (t = jS(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function jS(e) {
  var t = MS(e, `string`);
  return DS(t) == `symbol` ? t : String(t);
}
function MS(e, t) {
  if (DS(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (DS(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var NS = [`Webkit`, `Moz`, `O`, `ms`],
  PS = function (e, t) {
    if (!e) return null;
    var n = e.replace(/(\w)/, function (e) {
        return e.toUpperCase();
      }),
      r = NS.reduce(function (e, r) {
        return kS(kS({}, e), {}, AS({}, r + n, t));
      }, {});
    return ((r[e] = t), r);
  },
  FS = r(ES());
function IS(e) {
  '@babel/helpers - typeof';
  return (
    (IS =
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
    IS(e)
  );
}
function LS() {
  return (
    (LS = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    LS.apply(this, arguments)
  );
}
function RS(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function zS(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? RS(Object(n), !0).forEach(function (t) {
          XS(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : RS(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function BS(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function VS(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, ZS(r.key), r));
  }
}
function HS(e, t, n) {
  return (
    t && VS(e.prototype, t),
    n && VS(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function US(e, t, n) {
  return (
    (t = KS(t)),
    WS(e, GS() ? Reflect.construct(t, n || [], KS(e).constructor) : t.apply(e, n))
  );
}
function WS(e, t) {
  if (t && (IS(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return qS(e);
}
function GS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (GS = function () {
    return !!e;
  })();
}
function KS(e) {
  return (
    (KS = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    KS(e)
  );
}
function qS(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function JS(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && YS(e, t));
}
function YS(e, t) {
  return (
    (YS = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    YS(e, t)
  );
}
function XS(e, t, n) {
  return (
    (t = ZS(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function ZS(e) {
  var t = QS(e, `string`);
  return IS(t) == `symbol` ? t : String(t);
}
function QS(e, t) {
  if (IS(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (IS(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var $S = function (e) {
    var t = e.data,
      n = e.startIndex,
      r = e.endIndex,
      i = e.x,
      a = e.width,
      o = e.travellerWidth;
    if (!t || !t.length) return {};
    var s = t.length,
      c = Ye()
        .domain((0, FS.default)(0, s))
        .range([i, i + a - o]),
      l = c.domain().map(function (e) {
        return c(e);
      });
    return {
      isTextActive: !1,
      isSlideMoving: !1,
      isTravellerMoving: !1,
      isTravellerFocused: !1,
      startX: c(n),
      endX: c(r),
      scale: c,
      scaleValues: l,
    };
  },
  eC = function (e) {
    return e.changedTouches && !!e.changedTouches.length;
  },
  tC = (function (e) {
    JS(t, e);
    function t(e) {
      var n;
      return (
        BS(this, t),
        (n = US(this, t, [e])),
        XS(qS(n), `handleDrag`, function (e) {
          (n.leaveTimer && (clearTimeout(n.leaveTimer), (n.leaveTimer = null)),
            n.state.isTravellerMoving
              ? n.handleTravellerMove(e)
              : n.state.isSlideMoving && n.handleSlideDrag(e));
        }),
        XS(qS(n), `handleTouchMove`, function (e) {
          e.changedTouches != null &&
            e.changedTouches.length > 0 &&
            n.handleDrag(e.changedTouches[0]);
        }),
        XS(qS(n), `handleDragEnd`, function () {
          (n.setState({ isTravellerMoving: !1, isSlideMoving: !1 }, function () {
            var e = n.props,
              t = e.endIndex,
              r = e.onDragEnd,
              i = e.startIndex;
            r?.({ endIndex: t, startIndex: i });
          }),
            n.detachDragEndListener());
        }),
        XS(qS(n), `handleLeaveWrapper`, function () {
          (n.state.isTravellerMoving || n.state.isSlideMoving) &&
            (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut));
        }),
        XS(qS(n), `handleEnterSlideOrTraveller`, function () {
          n.setState({ isTextActive: !0 });
        }),
        XS(qS(n), `handleLeaveSlideOrTraveller`, function () {
          n.setState({ isTextActive: !1 });
        }),
        XS(qS(n), `handleSlideDragStart`, function (e) {
          var t = eC(e) ? e.changedTouches[0] : e;
          (n.setState({ isTravellerMoving: !1, isSlideMoving: !0, slideMoveStartX: t.pageX }),
            n.attachDragEndListener());
        }),
        (n.travellerDragStartHandlers = {
          startX: n.handleTravellerDragStart.bind(qS(n), `startX`),
          endX: n.handleTravellerDragStart.bind(qS(n), `endX`),
        }),
        (n.state = {}),
        n
      );
    }
    return (
      HS(
        t,
        [
          {
            key: `componentWillUnmount`,
            value: function () {
              ((this.leaveTimer &&= (clearTimeout(this.leaveTimer), null)),
                this.detachDragEndListener());
            },
          },
          {
            key: `getIndex`,
            value: function (e) {
              var n = e.startX,
                r = e.endX,
                i = this.state.scaleValues,
                a = this.props,
                o = a.gap,
                s = a.data.length - 1,
                c = Math.min(n, r),
                l = Math.max(n, r),
                u = t.getIndexInRange(i, c),
                d = t.getIndexInRange(i, l);
              return { startIndex: u - (u % o), endIndex: d === s ? s : d - (d % o) };
            },
          },
          {
            key: `getTextOfTick`,
            value: function (e) {
              var t = this.props,
                n = t.data,
                r = t.tickFormatter,
                i = t.dataKey,
                a = J(n[e], i, e);
              return (0, U.default)(r) ? r(a, e) : a;
            },
          },
          {
            key: `attachDragEndListener`,
            value: function () {
              (window.addEventListener(`mouseup`, this.handleDragEnd, !0),
                window.addEventListener(`touchend`, this.handleDragEnd, !0),
                window.addEventListener(`mousemove`, this.handleDrag, !0));
            },
          },
          {
            key: `detachDragEndListener`,
            value: function () {
              (window.removeEventListener(`mouseup`, this.handleDragEnd, !0),
                window.removeEventListener(`touchend`, this.handleDragEnd, !0),
                window.removeEventListener(`mousemove`, this.handleDrag, !0));
            },
          },
          {
            key: `handleSlideDrag`,
            value: function (e) {
              var t = this.state,
                n = t.slideMoveStartX,
                r = t.startX,
                i = t.endX,
                a = this.props,
                o = a.x,
                s = a.width,
                c = a.travellerWidth,
                l = a.startIndex,
                u = a.endIndex,
                d = a.onChange,
                f = e.pageX - n;
              f > 0
                ? (f = Math.min(f, o + s - c - i, o + s - c - r))
                : f < 0 && (f = Math.max(f, o - r, o - i));
              var p = this.getIndex({ startX: r + f, endX: i + f });
              ((p.startIndex !== l || p.endIndex !== u) && d && d(p),
                this.setState({ startX: r + f, endX: i + f, slideMoveStartX: e.pageX }));
            },
          },
          {
            key: `handleTravellerDragStart`,
            value: function (e, t) {
              var n = eC(t) ? t.changedTouches[0] : t;
              (this.setState({
                isSlideMoving: !1,
                isTravellerMoving: !0,
                movingTravellerId: e,
                brushMoveStartX: n.pageX,
              }),
                this.attachDragEndListener());
            },
          },
          {
            key: `handleTravellerMove`,
            value: function (e) {
              var t = this.state,
                n = t.brushMoveStartX,
                r = t.movingTravellerId,
                i = t.endX,
                a = t.startX,
                o = this.state[r],
                s = this.props,
                c = s.x,
                l = s.width,
                u = s.travellerWidth,
                d = s.onChange,
                f = s.gap,
                p = s.data,
                m = { startX: this.state.startX, endX: this.state.endX },
                h = e.pageX - n;
              (h > 0 ? (h = Math.min(h, c + l - u - o)) : h < 0 && (h = Math.max(h, c - o)),
                (m[r] = o + h));
              var g = this.getIndex(m),
                _ = g.startIndex,
                v = g.endIndex,
                y = function () {
                  var e = p.length - 1;
                  return (
                    (r === `startX` && (i > a ? _ % f === 0 : v % f === 0)) ||
                    (i < a && v === e) ||
                    (r === `endX` && (i > a ? v % f === 0 : _ % f === 0)) ||
                    (i > a && v === e)
                  );
                };
              this.setState(XS(XS({}, r, o + h), `brushMoveStartX`, e.pageX), function () {
                d && y() && d(g);
              });
            },
          },
          {
            key: `handleTravellerMoveKeyboard`,
            value: function (e, t) {
              var n = this,
                r = this.state,
                i = r.scaleValues,
                a = r.startX,
                o = r.endX,
                s = this.state[t],
                c = i.indexOf(s);
              if (c !== -1) {
                var l = c + e;
                if (!(l === -1 || l >= i.length)) {
                  var u = i[l];
                  (t === `startX` && u >= o) ||
                    (t === `endX` && u <= a) ||
                    this.setState(XS({}, t, u), function () {
                      n.props.onChange(n.getIndex({ startX: n.state.startX, endX: n.state.endX }));
                    });
                }
              }
            },
          },
          {
            key: `renderBackground`,
            value: function () {
              var e = this.props,
                t = e.x,
                n = e.y,
                r = e.width,
                i = e.height,
                a = e.fill,
                o = e.stroke;
              return z.createElement(`rect`, {
                stroke: o,
                fill: a,
                x: t,
                y: n,
                width: r,
                height: i,
              });
            },
          },
          {
            key: `renderPanorama`,
            value: function () {
              var e = this.props,
                t = e.x,
                n = e.y,
                r = e.width,
                i = e.height,
                a = e.data,
                o = e.children,
                s = e.padding,
                c = z.Children.only(o);
              return c
                ? z.cloneElement(c, {
                    x: t,
                    y: n,
                    width: r,
                    height: i,
                    margin: s,
                    compact: !0,
                    data: a,
                  })
                : null;
            },
          },
          {
            key: `renderTravellerLayer`,
            value: function (e, n) {
              var r = this,
                i = this.props,
                a = i.y,
                o = i.travellerWidth,
                s = i.height,
                c = i.traveller,
                l = i.ariaLabel,
                u = i.data,
                d = i.startIndex,
                f = i.endIndex,
                p = Math.max(e, this.props.x),
                m = zS(zS({}, W(this.props, !1)), {}, { x: p, y: a, width: o, height: s }),
                h = l || `Min value: ${u[d]?.name}, Max value: ${u[f]?.name}`;
              return z.createElement(
                G,
                {
                  tabIndex: 0,
                  role: `slider`,
                  'aria-label': h,
                  'aria-valuenow': e,
                  className: `recharts-brush-traveller`,
                  onMouseEnter: this.handleEnterSlideOrTraveller,
                  onMouseLeave: this.handleLeaveSlideOrTraveller,
                  onMouseDown: this.travellerDragStartHandlers[n],
                  onTouchStart: this.travellerDragStartHandlers[n],
                  onKeyDown: function (e) {
                    [`ArrowLeft`, `ArrowRight`].includes(e.key) &&
                      (e.preventDefault(),
                      e.stopPropagation(),
                      r.handleTravellerMoveKeyboard(e.key === `ArrowRight` ? 1 : -1, n));
                  },
                  onFocus: function () {
                    r.setState({ isTravellerFocused: !0 });
                  },
                  onBlur: function () {
                    r.setState({ isTravellerFocused: !1 });
                  },
                  style: { cursor: `col-resize` },
                },
                t.renderTraveller(c, m)
              );
            },
          },
          {
            key: `renderSlide`,
            value: function (e, t) {
              var n = this.props,
                r = n.y,
                i = n.height,
                a = n.stroke,
                o = n.travellerWidth,
                s = Math.min(e, t) + o,
                c = Math.max(Math.abs(t - e) - o, 0);
              return z.createElement(`rect`, {
                className: `recharts-brush-slide`,
                onMouseEnter: this.handleEnterSlideOrTraveller,
                onMouseLeave: this.handleLeaveSlideOrTraveller,
                onMouseDown: this.handleSlideDragStart,
                onTouchStart: this.handleSlideDragStart,
                style: { cursor: `move` },
                stroke: `none`,
                fill: a,
                fillOpacity: 0.2,
                x: s,
                y: r,
                width: c,
                height: i,
              });
            },
          },
          {
            key: `renderText`,
            value: function () {
              var e = this.props,
                t = e.startIndex,
                n = e.endIndex,
                r = e.y,
                i = e.height,
                a = e.travellerWidth,
                o = e.stroke,
                s = this.state,
                c = s.startX,
                l = s.endX,
                u = 5,
                d = { pointerEvents: `none`, fill: o };
              return z.createElement(
                G,
                { className: `recharts-brush-texts` },
                z.createElement(
                  mm,
                  LS(
                    {
                      textAnchor: `end`,
                      verticalAnchor: `middle`,
                      x: Math.min(c, l) - u,
                      y: r + i / 2,
                    },
                    d
                  ),
                  this.getTextOfTick(t)
                ),
                z.createElement(
                  mm,
                  LS(
                    {
                      textAnchor: `start`,
                      verticalAnchor: `middle`,
                      x: Math.max(c, l) + a + u,
                      y: r + i / 2,
                    },
                    d
                  ),
                  this.getTextOfTick(n)
                )
              );
            },
          },
          {
            key: `render`,
            value: function () {
              var e = this.props,
                t = e.data,
                n = e.className,
                r = e.children,
                i = e.x,
                a = e.y,
                o = e.width,
                s = e.height,
                c = e.alwaysShowText,
                l = this.state,
                u = l.startX,
                d = l.endX,
                f = l.isTextActive,
                p = l.isSlideMoving,
                m = l.isTravellerMoving,
                h = l.isTravellerFocused;
              if (!t || !t.length || !V(i) || !V(a) || !V(o) || !V(s) || o <= 0 || s <= 0)
                return null;
              var g = F(`recharts-brush`, n),
                _ = z.Children.count(r) === 1,
                v = PS(`userSelect`, `none`);
              return z.createElement(
                G,
                {
                  className: g,
                  onMouseLeave: this.handleLeaveWrapper,
                  onTouchMove: this.handleTouchMove,
                  style: v,
                },
                this.renderBackground(),
                _ && this.renderPanorama(),
                this.renderSlide(u, d),
                this.renderTravellerLayer(u, `startX`),
                this.renderTravellerLayer(d, `endX`),
                (f || p || m || h || c) && this.renderText()
              );
            },
          },
        ],
        [
          {
            key: `renderDefaultTraveller`,
            value: function (e) {
              var t = e.x,
                n = e.y,
                r = e.width,
                i = e.height,
                a = e.stroke,
                o = Math.floor(n + i / 2) - 1;
              return z.createElement(
                z.Fragment,
                null,
                z.createElement(`rect`, {
                  x: t,
                  y: n,
                  width: r,
                  height: i,
                  fill: a,
                  stroke: `none`,
                }),
                z.createElement(`line`, {
                  x1: t + 1,
                  y1: o,
                  x2: t + r - 1,
                  y2: o,
                  fill: `none`,
                  stroke: `#fff`,
                }),
                z.createElement(`line`, {
                  x1: t + 1,
                  y1: o + 2,
                  x2: t + r - 1,
                  y2: o + 2,
                  fill: `none`,
                  stroke: `#fff`,
                })
              );
            },
          },
          {
            key: `renderTraveller`,
            value: function (e, n) {
              return z.isValidElement(e)
                ? z.cloneElement(e, n)
                : (0, U.default)(e)
                  ? e(n)
                  : t.renderDefaultTraveller(n);
            },
          },
          {
            key: `getDerivedStateFromProps`,
            value: function (e, t) {
              var n = e.data,
                r = e.width,
                i = e.x,
                a = e.travellerWidth,
                o = e.updateId,
                s = e.startIndex,
                c = e.endIndex;
              if (n !== t.prevData || o !== t.prevUpdateId)
                return zS(
                  { prevData: n, prevTravellerWidth: a, prevUpdateId: o, prevX: i, prevWidth: r },
                  n && n.length
                    ? $S({ data: n, width: r, x: i, travellerWidth: a, startIndex: s, endIndex: c })
                    : { scale: null, scaleValues: null }
                );
              if (t.scale && (r !== t.prevWidth || i !== t.prevX || a !== t.prevTravellerWidth)) {
                t.scale.range([i, i + r - a]);
                var l = t.scale.domain().map(function (e) {
                  return t.scale(e);
                });
                return {
                  prevData: n,
                  prevTravellerWidth: a,
                  prevUpdateId: o,
                  prevX: i,
                  prevWidth: r,
                  startX: t.scale(e.startIndex),
                  endX: t.scale(e.endIndex),
                  scaleValues: l,
                };
              }
              return null;
            },
          },
          {
            key: `getIndexInRange`,
            value: function (e, t) {
              for (var n = e.length, r = 0, i = n - 1; i - r > 1;) {
                var a = Math.floor((r + i) / 2);
                e[a] > t ? (i = a) : (r = a);
              }
              return t >= e[i] ? i : r;
            },
          },
        ]
      ),
      t
    );
  })(z.PureComponent);
(XS(tC, `displayName`, `Brush`),
  XS(tC, `defaultProps`, {
    height: 40,
    travellerWidth: 5,
    gap: 1,
    fill: `#fff`,
    stroke: `#666`,
    padding: { top: 1, right: 1, bottom: 1, left: 1 },
    leaveTimeOut: 1e3,
    alwaysShowText: !1,
  }));
var nC = o((e, t) => {
    var n = yd();
    function r(e, t) {
      var r;
      return (
        n(e, function (e, n, i) {
          return ((r = t(e, n, i)), !r);
        }),
        !!r
      );
    }
    t.exports = r;
  }),
  rC = o((e, t) => {
    var n = Pl(),
      r = Mu(),
      i = nC(),
      a = ea(),
      o = Nd();
    function s(e, t, s) {
      var c = a(e) ? n : i;
      return (s && o(e, t, s) && (t = void 0), c(e, r(t, 3)));
    }
    t.exports = s;
  }),
  iC = function (e, t) {
    var n = e.alwaysShow,
      r = e.ifOverflow;
    return (n && (r = `extendDomain`), r === t);
  },
  aC = o((e, t) => {
    var n = Od();
    function r(e, t, r) {
      t == `__proto__` && n
        ? n(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    t.exports = r;
  }),
  oC = o((e, t) => {
    var n = aC(),
      r = _d(),
      i = Mu();
    function a(e, t) {
      var a = {};
      return (
        (t = i(t, 3)),
        r(e, function (e, r, i) {
          n(a, r, t(e, r, i));
        }),
        a
      );
    }
    t.exports = a;
  }),
  sC = o((e, t) => {
    function n(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length; ++n < r;) if (!t(e[n], n, e)) return !1;
      return !0;
    }
    t.exports = n;
  }),
  cC = o((e, t) => {
    var n = yd();
    function r(e, t) {
      var r = !0;
      return (
        n(e, function (e, n, i) {
          return ((r = !!t(e, n, i)), r);
        }),
        r
      );
    }
    t.exports = r;
  }),
  lC = o((e, t) => {
    var n = sC(),
      r = cC(),
      i = Mu(),
      a = ea(),
      o = Nd();
    function s(e, t, s) {
      var c = a(e) ? n : r;
      return (s && o(e, t, s) && (t = void 0), c(e, i(t, 3)));
    }
    t.exports = s;
  }),
  uC = [`x`, `y`];
function dC(e) {
  '@babel/helpers - typeof';
  return (
    (dC =
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
    dC(e)
  );
}
function fC() {
  return (
    (fC = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    fC.apply(this, arguments)
  );
}
function pC(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function mC(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? pC(Object(n), !0).forEach(function (t) {
          hC(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : pC(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function hC(e, t, n) {
  return (
    (t = gC(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function gC(e) {
  var t = _C(e, `string`);
  return dC(t) == `symbol` ? t : String(t);
}
function _C(e, t) {
  if (dC(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (dC(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function vC(e, t) {
  if (e == null) return {};
  var n = yC(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function yC(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function bC(e, t) {
  var n = e.x,
    r = e.y,
    i = vC(e, uC),
    a = `${n}`,
    o = parseInt(a, 10),
    s = `${r}`,
    c = parseInt(s, 10),
    l = `${t.height || i.height}`,
    u = parseInt(l, 10),
    d = `${t.width || i.width}`,
    f = parseInt(d, 10);
  return mC(
    mC(mC(mC(mC({}, t), i), o ? { x: o } : {}), c ? { y: c } : {}),
    {},
    { height: u, width: f, name: t.name, radius: t.radius }
  );
}
function xC(e) {
  return z.createElement(
    fS,
    fC({ shapeType: `rectangle`, propTransformer: bC, activeClassName: `recharts-active-bar` }, e)
  );
}
var SC = function (e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return function (n, r) {
      if (typeof e == `number`) return e;
      var i = typeof n == `number`;
      return i ? e(n, r) : (!i && dh(!1), t);
    };
  },
  CC = [`value`, `background`],
  wC;
function TC(e) {
  '@babel/helpers - typeof';
  return (
    (TC =
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
    TC(e)
  );
}
function EC(e, t) {
  if (e == null) return {};
  var n = DC(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function DC(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function OC() {
  return (
    (OC = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    OC.apply(this, arguments)
  );
}
function kC(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function AC(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? kC(Object(n), !0).forEach(function (t) {
          VC(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : kC(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function jC(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function MC(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, HC(r.key), r));
  }
}
function NC(e, t, n) {
  return (
    t && MC(e.prototype, t),
    n && MC(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function PC(e, t, n) {
  return (
    (t = LC(t)),
    FC(e, IC() ? Reflect.construct(t, n || [], LC(e).constructor) : t.apply(e, n))
  );
}
function FC(e, t) {
  if (t && (TC(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return RC(e);
}
function IC() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (IC = function () {
    return !!e;
  })();
}
function LC(e) {
  return (
    (LC = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    LC(e)
  );
}
function RC(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function zC(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && BC(e, t));
}
function BC(e, t) {
  return (
    (BC = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    BC(e, t)
  );
}
function VC(e, t, n) {
  return (
    (t = HC(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function HC(e) {
  var t = UC(e, `string`);
  return TC(t) == `symbol` ? t : String(t);
}
function UC(e, t) {
  if (TC(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (TC(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var WC = (function (e) {
  zC(t, e);
  function t() {
    var e;
    jC(this, t);
    var n = [...arguments];
    return (
      (e = PC(this, t, [].concat(n))),
      VC(RC(e), `state`, { isAnimationFinished: !1 }),
      VC(RC(e), `id`, po(`recharts-bar-`)),
      VC(RC(e), `handleAnimationEnd`, function () {
        var t = e.props.onAnimationEnd;
        (e.setState({ isAnimationFinished: !0 }), t && t());
      }),
      VC(RC(e), `handleAnimationStart`, function () {
        var t = e.props.onAnimationStart;
        (e.setState({ isAnimationFinished: !1 }), t && t());
      }),
      e
    );
  }
  return (
    NC(
      t,
      [
        {
          key: `renderRectanglesStatically`,
          value: function (e) {
            var t = this,
              n = this.props,
              r = n.shape,
              i = n.dataKey,
              a = n.activeIndex,
              o = n.activeBar,
              s = W(this.props, !1);
            return (
              e &&
              e.map(function (e, n) {
                var c = n === a,
                  l = c ? o : r,
                  u = AC(
                    AC(AC({}, s), e),
                    {},
                    {
                      isActive: c,
                      option: l,
                      index: n,
                      dataKey: i,
                      onAnimationStart: t.handleAnimationStart,
                      onAnimationEnd: t.handleAnimationEnd,
                    }
                  );
                return z.createElement(
                  G,
                  OC({ className: `recharts-bar-rectangle` }, Ao(t.props, e, n), {
                    key: `rectangle-${e?.x}-${e?.y}-${e?.value}`,
                  }),
                  z.createElement(xC, u)
                );
              })
            );
          },
        },
        {
          key: `renderRectanglesWithAnimation`,
          value: function () {
            var e = this,
              t = this.props,
              n = t.data,
              r = t.layout,
              i = t.isAnimationActive,
              a = t.animationBegin,
              o = t.animationDuration,
              s = t.animationEasing,
              c = t.animationId,
              l = this.state.prevData;
            return z.createElement(
              zb,
              {
                begin: a,
                duration: o,
                isActive: i,
                easing: s,
                from: { t: 0 },
                to: { t: 1 },
                key: `bar-${c}`,
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (t) {
                var i = t.t,
                  a = n.map(function (e, t) {
                    var n = l && l[t];
                    if (n) {
                      var a = _o(n.x, e.x),
                        o = _o(n.y, e.y),
                        s = _o(n.width, e.width),
                        c = _o(n.height, e.height);
                      return AC(AC({}, e), {}, { x: a(i), y: o(i), width: s(i), height: c(i) });
                    }
                    if (r === `horizontal`) {
                      var u = _o(0, e.height)(i);
                      return AC(AC({}, e), {}, { y: e.y + e.height - u, height: u });
                    }
                    var d = _o(0, e.width)(i);
                    return AC(AC({}, e), {}, { width: d });
                  });
                return z.createElement(G, null, e.renderRectanglesStatically(a));
              }
            );
          },
        },
        {
          key: `renderRectangles`,
          value: function () {
            var e = this.props,
              t = e.data,
              n = e.isAnimationActive,
              r = this.state.prevData;
            return n && t && t.length && (!r || !(0, Nh.default)(r, t))
              ? this.renderRectanglesWithAnimation()
              : this.renderRectanglesStatically(t);
          },
        },
        {
          key: `renderBackground`,
          value: function () {
            var e = this,
              t = this.props,
              n = t.data,
              r = t.dataKey,
              i = t.activeIndex,
              a = W(this.props.background, !1);
            return n.map(function (t, n) {
              t.value;
              var o = t.background,
                s = EC(t, CC);
              if (!o) return null;
              var c = AC(
                AC(AC(AC(AC({}, s), {}, { fill: `#eee` }, o), a), Ao(e.props, t, n)),
                {},
                {
                  onAnimationStart: e.handleAnimationStart,
                  onAnimationEnd: e.handleAnimationEnd,
                  dataKey: r,
                  index: n,
                  key: `background-bar-${n}`,
                  className: `recharts-bar-background-rectangle`,
                }
              );
              return z.createElement(xC, OC({ option: e.props.background, isActive: n === i }, c));
            });
          },
        },
        {
          key: `renderErrorBar`,
          value: function (e, t) {
            if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
            var n = this.props,
              r = n.data,
              i = n.xAxis,
              a = n.yAxis,
              o = n.layout,
              s = n.children,
              c = Ho(s, Sh);
            if (!c) return null;
            var l = o === `vertical` ? r[0].height / 2 : r[0].width / 2,
              u = function (e, t) {
                var n = Array.isArray(e.value) ? e.value[1] : e.value;
                return { x: e.x, y: e.y, value: n, errorVal: J(e, t) };
              },
              d = { clipPath: e ? `url(#clipPath-${t})` : null };
            return z.createElement(
              G,
              d,
              c.map(function (e) {
                return z.cloneElement(e, {
                  key: `error-bar-${t}-${e.props.dataKey}`,
                  data: r,
                  xAxis: i,
                  yAxis: a,
                  layout: o,
                  offset: l,
                  dataPointFormatter: u,
                });
              })
            );
          },
        },
        {
          key: `render`,
          value: function () {
            var e = this.props,
              t = e.hide,
              n = e.data,
              r = e.className,
              i = e.xAxis,
              a = e.yAxis,
              o = e.left,
              s = e.top,
              c = e.width,
              l = e.height,
              u = e.isAnimationActive,
              d = e.background,
              f = e.id;
            if (t || !n || !n.length) return null;
            var p = this.state.isAnimationFinished,
              m = F(`recharts-bar`, r),
              h = i && i.allowDataOverflow,
              g = a && a.allowDataOverflow,
              _ = h || g,
              v = (0, H.default)(f) ? this.id : f;
            return z.createElement(
              G,
              { className: m },
              h || g
                ? z.createElement(
                    `defs`,
                    null,
                    z.createElement(
                      `clipPath`,
                      { id: `clipPath-${v}` },
                      z.createElement(`rect`, {
                        x: h ? o : o - c / 2,
                        y: g ? s : s - l / 2,
                        width: h ? c : c * 2,
                        height: g ? l : l * 2,
                      })
                    )
                  )
                : null,
              z.createElement(
                G,
                {
                  className: `recharts-bar-rectangles`,
                  clipPath: _ ? `url(#clipPath-${v})` : null,
                },
                d ? this.renderBackground() : null,
                this.renderRectangles()
              ),
              this.renderErrorBar(_, v),
              (!u || p) && N_.renderCallByParent(this.props, n)
            );
          },
        },
      ],
      [
        {
          key: `getDerivedStateFromProps`,
          value: function (e, t) {
            return e.animationId === t.prevAnimationId
              ? e.data === t.curData
                ? null
                : { curData: e.data }
              : { prevAnimationId: e.animationId, curData: e.data, prevData: t.curData };
          },
        },
      ]
    ),
    t
  );
})(z.PureComponent);
((wC = WC),
  VC(WC, `displayName`, `Bar`),
  VC(WC, `defaultProps`, {
    xAxisId: 0,
    yAxisId: 0,
    legendType: `rect`,
    minPointSize: 0,
    hide: !1,
    data: [],
    layout: `vertical`,
    activeBar: !1,
    isAnimationActive: !Tf.isSsr,
    animationBegin: 0,
    animationDuration: 400,
    animationEasing: `ease`,
  }),
  VC(WC, `getComposedData`, function (e) {
    var t = e.props,
      n = e.item,
      r = e.barPosition,
      i = e.bandSize,
      a = e.xAxis,
      o = e.yAxis,
      s = e.xAxisTicks,
      c = e.yAxisTicks,
      l = e.stackedData,
      u = e.dataStartIndex,
      d = e.displayedData,
      f = e.offset,
      p = ug(r, n);
    if (!p) return null;
    var m = t.layout,
      h = n.props,
      g = h.dataKey,
      _ = h.children,
      v = h.minPointSize,
      y = m === `horizontal` ? o : a,
      b = l ? y.scale.domain() : null,
      x = vg({ numericAxis: y }),
      S = Ho(_, up);
    return AC(
      {
        data: d.map(function (e, t) {
          var r, d, f, h, _, y;
          l ? (r = dg(l[u + t], b)) : ((r = J(e, g)), Array.isArray(r) || (r = [x, r]));
          var C = SC(v, wC.defaultProps.minPointSize)(r[1], t);
          if (m === `horizontal`) {
            var w = [o.scale(r[0]), o.scale(r[1])],
              T = w[0],
              E = w[1];
            ((d = _g({ axis: a, ticks: s, bandSize: i, offset: p.offset, entry: e, index: t })),
              (f = E ?? T ?? void 0),
              (h = p.size));
            var D = T - E;
            if (
              ((_ = Number.isNaN(D) ? 0 : D),
              (y = { x: d, y: o.y, width: h, height: o.height }),
              Math.abs(C) > 0 && Math.abs(_) < Math.abs(C))
            ) {
              var O = co(_ || C) * (Math.abs(C) - Math.abs(_));
              ((f -= O), (_ += O));
            }
          } else {
            var k = [a.scale(r[0]), a.scale(r[1])],
              A = k[0],
              j = k[1];
            if (
              ((d = A),
              (f = _g({ axis: o, ticks: c, bandSize: i, offset: p.offset, entry: e, index: t })),
              (h = j - A),
              (_ = p.size),
              (y = { x: a.x, y: f, width: a.width, height: _ }),
              Math.abs(C) > 0 && Math.abs(h) < Math.abs(C))
            ) {
              var M = co(h || C) * (Math.abs(C) - Math.abs(h));
              h += M;
            }
          }
          return AC(
            AC(
              AC({}, e),
              {},
              { x: d, y: f, width: h, height: _, value: l ? r : r[1], payload: e, background: y },
              S && S[t] && S[t].props
            ),
            {},
            { tooltipPayload: [Dg(n, e)], tooltipPosition: { x: d + h / 2, y: f + _ / 2 } }
          );
        }),
        layout: m,
      },
      f
    );
  }));
var GC = r(oC()),
  KC = r(lC());
function qC(e) {
  '@babel/helpers - typeof';
  return (
    (qC =
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
    qC(e)
  );
}
function JC(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function YC(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, ew(r.key), r));
  }
}
function XC(e, t, n) {
  return (
    t && YC(e.prototype, t),
    n && YC(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function ZC(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function QC(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? ZC(Object(n), !0).forEach(function (t) {
          $C(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : ZC(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function $C(e, t, n) {
  return (
    (t = ew(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function ew(e) {
  var t = tw(e, `string`);
  return qC(t) == `symbol` ? t : String(t);
}
function tw(e, t) {
  if (qC(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (qC(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var nw = function (e, t, n, r, i) {
    var a = e.width,
      o = e.height,
      s = e.layout,
      c = e.children,
      l = Object.keys(t),
      u = {
        left: n.left,
        leftMirror: n.left,
        right: a - n.right,
        rightMirror: a - n.right,
        top: n.top,
        topMirror: n.top,
        bottom: o - n.bottom,
        bottomMirror: o - n.bottom,
      },
      d = !!Uo(c, WC);
    return l.reduce(function (a, o) {
      var c = t[o],
        l = c.orientation,
        f = c.domain,
        p = c.padding,
        m = p === void 0 ? {} : p,
        h = c.mirror,
        g = c.reversed,
        _ = `${l}${h ? `Mirror` : ``}`,
        v,
        y,
        b,
        x,
        S;
      if (c.type === `number` && (c.padding === `gap` || c.padding === `no-gap`)) {
        var C = f[1] - f[0],
          w = 1 / 0,
          T = c.categoricalDomain.sort();
        if (
          (T.forEach(function (e, t) {
            t > 0 && (w = Math.min((e || 0) - (T[t - 1] || 0), w));
          }),
          Number.isFinite(w))
        ) {
          var E = w / C,
            D = c.layout === `vertical` ? n.height : n.width;
          if ((c.padding === `gap` && (v = (E * D) / 2), c.padding === `no-gap`)) {
            var O = mo(e.barCategoryGap, E * D),
              k = (E * D) / 2;
            v = k - O - ((k - O) / D) * O;
          }
        }
      }
      ((y =
        r === `xAxis`
          ? [n.left + (m.left || 0) + (v || 0), n.left + n.width - (m.right || 0) - (v || 0)]
          : r === `yAxis`
            ? s === `horizontal`
              ? [n.top + n.height - (m.bottom || 0), n.top + (m.top || 0)]
              : [n.top + (m.top || 0) + (v || 0), n.top + n.height - (m.bottom || 0) - (v || 0)]
            : c.range),
        g && (y = [y[1], y[0]]));
      var A = sg(c, i, d),
        j = A.scale,
        M = A.realScaleType;
      (j.domain(f).range(y), lg(j));
      var N = hg(j, QC(QC({}, c), {}, { realScaleType: M }));
      r === `xAxis`
        ? ((S = (l === `top` && !h) || (l === `bottom` && h)),
          (b = n.left),
          (x = u[_] - S * c.height))
        : r === `yAxis` &&
          ((S = (l === `left` && !h) || (l === `right` && h)),
          (b = u[_] - S * c.width),
          (x = n.top));
      var P = QC(
        QC(QC({}, c), N),
        {},
        {
          realScaleType: M,
          x: b,
          y: x,
          scale: j,
          width: r === `xAxis` ? n.width : c.width,
          height: r === `yAxis` ? n.height : c.height,
        }
      );
      return (
        (P.bandSize = Tg(P, N)),
        !c.hide && r === `xAxis`
          ? (u[_] += (S ? -1 : 1) * P.height)
          : c.hide || (u[_] += (S ? -1 : 1) * P.width),
        QC(QC({}, a), {}, $C({}, o, P))
      );
    }, {});
  },
  rw = function (e, t) {
    var n = e.x,
      r = e.y,
      i = t.x,
      a = t.y;
    return {
      x: Math.min(n, i),
      y: Math.min(r, a),
      width: Math.abs(i - n),
      height: Math.abs(a - r),
    };
  },
  iw = function (e) {
    var t = e.x1,
      n = e.y1,
      r = e.x2,
      i = e.y2;
    return rw({ x: t, y: n }, { x: r, y: i });
  },
  aw = (function () {
    function e(t) {
      (JC(this, e), (this.scale = t));
    }
    return (
      XC(
        e,
        [
          {
            key: `domain`,
            get: function () {
              return this.scale.domain;
            },
          },
          {
            key: `range`,
            get: function () {
              return this.scale.range;
            },
          },
          {
            key: `rangeMin`,
            get: function () {
              return this.range()[0];
            },
          },
          {
            key: `rangeMax`,
            get: function () {
              return this.range()[1];
            },
          },
          {
            key: `bandwidth`,
            get: function () {
              return this.scale.bandwidth;
            },
          },
          {
            key: `apply`,
            value: function (e) {
              var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
                n = t.bandAware,
                r = t.position;
              if (e !== void 0) {
                if (r)
                  switch (r) {
                    case `start`:
                      return this.scale(e);
                    case `middle`:
                      var i = this.bandwidth ? this.bandwidth() / 2 : 0;
                      return this.scale(e) + i;
                    case `end`:
                      var a = this.bandwidth ? this.bandwidth() : 0;
                      return this.scale(e) + a;
                    default:
                      return this.scale(e);
                  }
                if (n) {
                  var o = this.bandwidth ? this.bandwidth() / 2 : 0;
                  return this.scale(e) + o;
                }
                return this.scale(e);
              }
            },
          },
          {
            key: `isInRange`,
            value: function (e) {
              var t = this.range(),
                n = t[0],
                r = t[t.length - 1];
              return n <= r ? e >= n && e <= r : e >= r && e <= n;
            },
          },
        ],
        [
          {
            key: `create`,
            value: function (t) {
              return new e(t);
            },
          },
        ]
      ),
      e
    );
  })();
$C(aw, `EPS`, 1e-4);
var ow = function (e) {
  var t = Object.keys(e).reduce(function (t, n) {
    return QC(QC({}, t), {}, $C({}, n, aw.create(e[n])));
  }, {});
  return QC(
    QC({}, t),
    {},
    {
      apply: function (e) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          r = n.bandAware,
          i = n.position;
        return (0, GC.default)(e, function (e, n) {
          return t[n].apply(e, { bandAware: r, position: i });
        });
      },
      isInRange: function (e) {
        return (0, KC.default)(e, function (e, n) {
          return t[n].isInRange(e);
        });
      },
    }
  );
};
function sw(e) {
  return ((e % 180) + 180) % 180;
}
var cw = function (e) {
    var t = e.width,
      n = e.height,
      r = (sw(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0) * Math.PI) / 180,
      i = Math.atan(n / t),
      a = r > i && r < Math.PI - i ? n / Math.sin(r) : t / Math.cos(r);
    return Math.abs(a);
  },
  lw = o((e, t) => {
    var n = Mu(),
      r = cu(),
      i = lu();
    function a(e) {
      return function (t, a, o) {
        var s = Object(t);
        if (!r(t)) {
          var c = n(a, 3);
          ((t = i(t)),
            (a = function (e) {
              return c(s[e], e, s);
            }));
        }
        var l = e(t, a, o);
        return l > -1 ? s[c ? t[l] : l] : void 0;
      };
    }
    t.exports = a;
  }),
  uw = o((e, t) => {
    var n = wS();
    function r(e) {
      var t = n(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    t.exports = r;
  }),
  dw = o((e, t) => {
    var n = Nu(),
      r = Mu(),
      i = uw(),
      a = Math.max;
    function o(e, t, o) {
      var s = e == null ? 0 : e.length;
      if (!s) return -1;
      var c = o == null ? 0 : i(o);
      return (c < 0 && (c = a(s + c, 0)), n(e, r(t, 3), c));
    }
    t.exports = o;
  }),
  fw = o((e, t) => {
    t.exports = lw()(dw());
  }),
  pw = (0, r(Ha()).default)(
    function (e) {
      return { x: e.left, y: e.top, width: e.width, height: e.height };
    },
    function (e) {
      return [`l`, e.left, `t`, e.top, `w`, e.width, `h`, e.height].join(``);
    }
  ),
  mw = r(fw()),
  hw = (0, z.createContext)(void 0),
  gw = (0, z.createContext)(void 0),
  _w = (0, z.createContext)(void 0),
  vw = (0, z.createContext)({}),
  yw = (0, z.createContext)(void 0),
  bw = (0, z.createContext)(0),
  xw = (0, z.createContext)(0),
  Sw = function (e) {
    var t = e.state,
      n = t.xAxisMap,
      r = t.yAxisMap,
      i = t.offset,
      a = e.clipPathId,
      o = e.children,
      s = e.width,
      c = e.height,
      l = pw(i);
    return z.createElement(
      hw.Provider,
      { value: n },
      z.createElement(
        gw.Provider,
        { value: r },
        z.createElement(
          vw.Provider,
          { value: i },
          z.createElement(
            _w.Provider,
            { value: l },
            z.createElement(
              yw.Provider,
              { value: a },
              z.createElement(
                bw.Provider,
                { value: c },
                z.createElement(xw.Provider, { value: s }, o)
              )
            )
          )
        )
      )
    );
  },
  Cw = function () {
    return (0, z.useContext)(yw);
  },
  ww = function (e) {
    var t = (0, z.useContext)(hw);
    t ?? dh(!1);
    var n = t[e];
    return (n ?? dh(!1), n);
  },
  Tw = function () {
    return ho((0, z.useContext)(hw));
  },
  Ew = function () {
    var e = (0, z.useContext)(gw);
    return (
      (0, mw.default)(e, function (e) {
        return (0, KC.default)(e.domain, Number.isFinite);
      }) || ho(e)
    );
  },
  Dw = function (e) {
    var t = (0, z.useContext)(gw);
    t ?? dh(!1);
    var n = t[e];
    return (n ?? dh(!1), n);
  },
  Ow = function () {
    return (0, z.useContext)(_w);
  },
  kw = function () {
    return (0, z.useContext)(vw);
  },
  Aw = function () {
    return (0, z.useContext)(xw);
  },
  jw = function () {
    return (0, z.useContext)(bw);
  },
  Mw = r(rC());
function Nw(e) {
  '@babel/helpers - typeof';
  return (
    (Nw =
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
    Nw(e)
  );
}
function Pw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Fw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Pw(Object(n), !0).forEach(function (t) {
          Iw(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Pw(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Iw(e, t, n) {
  return (
    (t = Lw(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Lw(e) {
  var t = Rw(e, `string`);
  return Nw(t) == `symbol` ? t : String(t);
}
function Rw(e, t) {
  if (Nw(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Nw(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function zw(e, t) {
  return Ww(e) || Uw(e, t) || Vw(e, t) || Bw();
}
function Bw() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Vw(e, t) {
  if (e) {
    if (typeof e == `string`) return Hw(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Hw(e, t);
  }
}
function Hw(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Uw(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function Ww(e) {
  if (Array.isArray(e)) return e;
}
function Gw() {
  return (
    (Gw = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Gw.apply(this, arguments)
  );
}
var Kw = function (e, t) {
    return z.isValidElement(e)
      ? z.cloneElement(e, t)
      : (0, U.default)(e)
        ? e(t)
        : z.createElement(`line`, Gw({}, t, { className: `recharts-reference-line-line` }));
  },
  qw = function (e, t, n, r, i, a, o, s, c) {
    var l = i.x,
      u = i.y,
      d = i.width,
      f = i.height;
    if (n) {
      var p = c.y,
        m = e.y.apply(p, { position: a });
      if (iC(c, `discard`) && !e.y.isInRange(m)) return null;
      var h = [
        { x: l + d, y: m },
        { x: l, y: m },
      ];
      return s === `left` ? h.reverse() : h;
    }
    if (t) {
      var g = c.x,
        _ = e.x.apply(g, { position: a });
      if (iC(c, `discard`) && !e.x.isInRange(_)) return null;
      var v = [
        { x: _, y: u + f },
        { x: _, y: u },
      ];
      return o === `top` ? v.reverse() : v;
    }
    if (r) {
      var y = c.segment.map(function (t) {
        return e.apply(t, { position: a });
      });
      return iC(c, `discard`) &&
        (0, Mw.default)(y, function (t) {
          return !e.isInRange(t);
        })
        ? null
        : y;
    }
    return null;
  };
function Jw(e) {
  var t = e.x,
    n = e.y,
    r = e.segment,
    i = e.xAxisId,
    a = e.yAxisId,
    o = e.shape,
    s = e.className,
    c = e.alwaysShow,
    l = Cw(),
    u = ww(i),
    d = Dw(a),
    f = Ow();
  if (!l || !f) return null;
  ds(
    c === void 0,
    `The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.`
  );
  var p = qw(
    ow({ x: u.scale, y: d.scale }),
    uo(t),
    uo(n),
    r && r.length === 2,
    f,
    e.position,
    u.orientation,
    d.orientation,
    e
  );
  if (!p) return null;
  var m = zw(p, 2),
    h = m[0],
    g = h.x,
    _ = h.y,
    v = m[1],
    y = v.x,
    b = v.y,
    x = Fw(
      Fw({ clipPath: iC(e, `hidden`) ? `url(#${l})` : void 0 }, W(e, !0)),
      {},
      { x1: g, y1: _, x2: y, y2: b }
    );
  return z.createElement(
    G,
    { className: F(`recharts-reference-line`, s) },
    Kw(o, x),
    u_.renderCallByParent(e, iw({ x1: g, y1: _, x2: y, y2: b }))
  );
}
((Jw.displayName = `ReferenceLine`),
  (Jw.defaultProps = {
    isFront: !1,
    ifOverflow: `discard`,
    xAxisId: 0,
    yAxisId: 0,
    fill: `none`,
    stroke: `#ccc`,
    fillOpacity: 1,
    strokeWidth: 1,
    position: `middle`,
  }));
function Yw(e) {
  '@babel/helpers - typeof';
  return (
    (Yw =
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
    Yw(e)
  );
}
function Xw() {
  return (
    (Xw = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Xw.apply(this, arguments)
  );
}
function Zw(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Qw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Zw(Object(n), !0).forEach(function (t) {
          $w(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Zw(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function $w(e, t, n) {
  return (
    (t = eT(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function eT(e) {
  var t = tT(e, `string`);
  return Yw(t) == `symbol` ? t : String(t);
}
function tT(e, t) {
  if (Yw(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Yw(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var nT = function (e) {
  var t = e.x,
    n = e.y,
    r = e.xAxis,
    i = e.yAxis,
    a = ow({ x: r.scale, y: i.scale }),
    o = a.apply({ x: t, y: n }, { bandAware: !0 });
  return iC(e, `discard`) && !a.isInRange(o) ? null : o;
};
function rT(e) {
  var t = e.x,
    n = e.y,
    r = e.r,
    i = e.alwaysShow,
    a = e.clipPathId,
    o = uo(t),
    s = uo(n);
  if (
    (ds(
      i === void 0,
      `The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.`
    ),
    !o || !s)
  )
    return null;
  var c = nT(e);
  if (!c) return null;
  var l = c.x,
    u = c.y,
    d = e.shape,
    f = e.className,
    p = Qw(
      Qw({ clipPath: iC(e, `hidden`) ? `url(#${a})` : void 0 }, W(e, !0)),
      {},
      { cx: l, cy: u }
    );
  return z.createElement(
    G,
    { className: F(`recharts-reference-dot`, f) },
    rT.renderDot(d, p),
    u_.renderCallByParent(e, { x: l - r, y: u - r, width: 2 * r, height: 2 * r })
  );
}
((rT.displayName = `ReferenceDot`),
  (rT.defaultProps = {
    isFront: !1,
    ifOverflow: `discard`,
    xAxisId: 0,
    yAxisId: 0,
    r: 10,
    fill: `#fff`,
    stroke: `#ccc`,
    fillOpacity: 1,
    strokeWidth: 1,
  }),
  (rT.renderDot = function (e, t) {
    return z.isValidElement(e)
      ? z.cloneElement(e, t)
      : (0, U.default)(e)
        ? e(t)
        : z.createElement(
            yx,
            Xw({}, t, { cx: t.cx, cy: t.cy, className: `recharts-reference-dot-dot` })
          );
  }));
function iT(e) {
  '@babel/helpers - typeof';
  return (
    (iT =
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
    iT(e)
  );
}
function aT() {
  return (
    (aT = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    aT.apply(this, arguments)
  );
}
function oT(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function sT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? oT(Object(n), !0).forEach(function (t) {
          cT(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : oT(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function cT(e, t, n) {
  return (
    (t = lT(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function lT(e) {
  var t = uT(e, `string`);
  return iT(t) == `symbol` ? t : String(t);
}
function uT(e, t) {
  if (iT(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (iT(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var dT = function (e, t, n, r, i) {
  var a = i.x1,
    o = i.x2,
    s = i.y1,
    c = i.y2,
    l = i.xAxis,
    u = i.yAxis;
  if (!l || !u) return null;
  var d = ow({ x: l.scale, y: u.scale }),
    f = {
      x: e ? d.x.apply(a, { position: `start` }) : d.x.rangeMin,
      y: n ? d.y.apply(s, { position: `start` }) : d.y.rangeMin,
    },
    p = {
      x: t ? d.x.apply(o, { position: `end` }) : d.x.rangeMax,
      y: r ? d.y.apply(c, { position: `end` }) : d.y.rangeMax,
    };
  return iC(i, `discard`) && (!d.isInRange(f) || !d.isInRange(p)) ? null : rw(f, p);
};
function fT(e) {
  var t = e.x1,
    n = e.x2,
    r = e.y1,
    i = e.y2,
    a = e.className,
    o = e.alwaysShow,
    s = e.clipPathId;
  ds(
    o === void 0,
    `The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.`
  );
  var c = uo(t),
    l = uo(n),
    u = uo(r),
    d = uo(i),
    f = e.shape;
  if (!c && !l && !u && !d && !f) return null;
  var p = dT(c, l, u, d, e);
  if (!p && !f) return null;
  var m = iC(e, `hidden`) ? `url(#${s})` : void 0;
  return z.createElement(
    G,
    { className: F(`recharts-reference-area`, a) },
    fT.renderRect(f, sT(sT({ clipPath: m }, W(e, !0)), p)),
    u_.renderCallByParent(e, p)
  );
}
((fT.displayName = `ReferenceArea`),
  (fT.defaultProps = {
    isFront: !1,
    ifOverflow: `discard`,
    xAxisId: 0,
    yAxisId: 0,
    r: 10,
    fill: `#ccc`,
    fillOpacity: 0.5,
    stroke: `none`,
    strokeWidth: 1,
  }),
  (fT.renderRect = function (e, t) {
    return z.isValidElement(e)
      ? z.cloneElement(e, t)
      : (0, U.default)(e)
        ? e(t)
        : z.createElement(nx, aT({}, t, { className: `recharts-reference-area-rect` }));
  }));
function pT(e, t, n) {
  if (t < 1) return [];
  if (t === 1 && n === void 0) return e;
  for (var r = [], i = 0; i < e.length; i += t)
    if (n === void 0 || n(e[i]) === !0) r.push(e[i]);
    else return;
  return r;
}
function mT(e, t, n) {
  return cw({ width: e.width + t.width, height: e.height + t.height }, n);
}
function hT(e, t, n) {
  var r = n === `width`,
    i = e.x,
    a = e.y,
    o = e.width,
    s = e.height;
  return t === 1
    ? { start: r ? i : a, end: r ? i + o : a + s }
    : { start: r ? i + o : a + s, end: r ? i : a };
}
function gT(e, t, n, r, i) {
  if (e * t < e * r || e * t > e * i) return !1;
  var a = n();
  return e * (t - (e * a) / 2 - r) >= 0 && e * (t + (e * a) / 2 - i) <= 0;
}
function _T(e, t) {
  return pT(e, t + 1);
}
function vT(e, t, n, r, i) {
  for (
    var a = (r || []).slice(),
      o = t.start,
      s = t.end,
      c = 0,
      l = 1,
      u = o,
      d = function () {
        var t = r?.[c];
        if (t === void 0) return { v: pT(r, l) };
        var a = c,
          d,
          f = function () {
            return (d === void 0 && (d = n(t, a)), d);
          },
          p = t.coordinate,
          m = c === 0 || gT(e, p, f, u, s);
        (m || ((c = 0), (u = o), (l += 1)), m && ((u = p + e * (f() / 2 + i)), (c += l)));
      },
      f;
    l <= a.length;
  )
    if (((f = d()), f)) return f.v;
  return [];
}
function yT(e) {
  '@babel/helpers - typeof';
  return (
    (yT =
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
    yT(e)
  );
}
function bT(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function xT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? bT(Object(n), !0).forEach(function (t) {
          ST(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : bT(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function ST(e, t, n) {
  return (
    (t = CT(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function CT(e) {
  var t = wT(e, `string`);
  return yT(t) == `symbol` ? t : String(t);
}
function wT(e, t) {
  if (yT(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (yT(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function TT(e, t, n, r, i) {
  for (
    var a = (r || []).slice(),
      o = a.length,
      s = t.start,
      c = t.end,
      l = function (t) {
        var r = a[t],
          l,
          u = function () {
            return (l === void 0 && (l = n(r, t)), l);
          };
        if (t === o - 1) {
          var d = e * (r.coordinate + (e * u()) / 2 - c);
          a[t] = r = xT(xT({}, r), {}, { tickCoord: d > 0 ? r.coordinate - d * e : r.coordinate });
        } else a[t] = r = xT(xT({}, r), {}, { tickCoord: r.coordinate });
        gT(e, r.tickCoord, u, s, c) &&
          ((c = r.tickCoord - e * (u() / 2 + i)), (a[t] = xT(xT({}, r), {}, { isShow: !0 })));
      },
      u = o - 1;
    u >= 0;
    u--
  )
    l(u);
  return a;
}
function ET(e, t, n, r, i, a) {
  var o = (r || []).slice(),
    s = o.length,
    c = t.start,
    l = t.end;
  if (a) {
    var u = r[s - 1],
      d = n(u, s - 1),
      f = e * (u.coordinate + (e * d) / 2 - l);
    ((o[s - 1] = u = xT(xT({}, u), {}, { tickCoord: f > 0 ? u.coordinate - f * e : u.coordinate })),
      gT(
        e,
        u.tickCoord,
        function () {
          return d;
        },
        c,
        l
      ) && ((l = u.tickCoord - e * (d / 2 + i)), (o[s - 1] = xT(xT({}, u), {}, { isShow: !0 }))));
  }
  for (
    var p = a ? s - 1 : s,
      m = function (t) {
        var r = o[t],
          a,
          s = function () {
            return (a === void 0 && (a = n(r, t)), a);
          };
        if (t === 0) {
          var u = e * (r.coordinate - (e * s()) / 2 - c);
          o[t] = r = xT(xT({}, r), {}, { tickCoord: u < 0 ? r.coordinate - u * e : r.coordinate });
        } else o[t] = r = xT(xT({}, r), {}, { tickCoord: r.coordinate });
        gT(e, r.tickCoord, s, c, l) &&
          ((c = r.tickCoord + e * (s() / 2 + i)), (o[t] = xT(xT({}, r), {}, { isShow: !0 })));
      },
      h = 0;
    h < p;
    h++
  )
    m(h);
  return o;
}
function DT(e, t, n) {
  var r = e.tick,
    i = e.ticks,
    a = e.viewBox,
    o = e.minTickGap,
    s = e.orientation,
    c = e.interval,
    l = e.tickFormatter,
    u = e.unit,
    d = e.angle;
  if (!i || !i.length || !r) return [];
  if (V(c) || Tf.isSsr) return _T(i, typeof c == `number` && V(c) ? c : 0);
  var f = [],
    p = s === `top` || s === `bottom` ? `width` : `height`,
    m = u && p === `width` ? Sp(u, { fontSize: t, letterSpacing: n }) : { width: 0, height: 0 },
    h = function (e, r) {
      var i = (0, U.default)(l) ? l(e.value, r) : e.value;
      return p === `width`
        ? mT(Sp(i, { fontSize: t, letterSpacing: n }), m, d)
        : Sp(i, { fontSize: t, letterSpacing: n })[p];
    },
    g = i.length >= 2 ? co(i[1].coordinate - i[0].coordinate) : 1,
    _ = hT(a, g, p);
  return c === `equidistantPreserveStart`
    ? vT(g, _, h, i, o)
    : ((f =
        c === `preserveStart` || c === `preserveStartEnd`
          ? ET(g, _, h, i, o, c === `preserveStartEnd`)
          : TT(g, _, h, i, o)),
      f.filter(function (e) {
        return e.isShow;
      }));
}
var OT = [`viewBox`],
  kT = [`viewBox`],
  AT = [`ticks`];
function jT(e) {
  '@babel/helpers - typeof';
  return (
    (jT =
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
    jT(e)
  );
}
function MT() {
  return (
    (MT = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    MT.apply(this, arguments)
  );
}
function NT(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function PT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? NT(Object(n), !0).forEach(function (t) {
          qT(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : NT(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function FT(e, t) {
  if (e == null) return {};
  var n = IT(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function IT(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function LT(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function RT(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, JT(r.key), r));
  }
}
function zT(e, t, n) {
  return (
    t && RT(e.prototype, t),
    n && RT(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function BT(e, t, n) {
  return (
    (t = WT(t)),
    VT(e, UT() ? Reflect.construct(t, n || [], WT(e).constructor) : t.apply(e, n))
  );
}
function VT(e, t) {
  if (t && (jT(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return HT(e);
}
function HT(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function UT() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (UT = function () {
    return !!e;
  })();
}
function WT(e) {
  return (
    (WT = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    WT(e)
  );
}
function GT(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && KT(e, t));
}
function KT(e, t) {
  return (
    (KT = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    KT(e, t)
  );
}
function qT(e, t, n) {
  return (
    (t = JT(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function JT(e) {
  var t = YT(e, `string`);
  return jT(t) == `symbol` ? t : String(t);
}
function YT(e, t) {
  if (jT(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (jT(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var XT = (function (e) {
  GT(t, e);
  function t(e) {
    var n;
    return (
      LT(this, t),
      (n = BT(this, t, [e])),
      (n.state = { fontSize: ``, letterSpacing: `` }),
      n
    );
  }
  return (
    zT(
      t,
      [
        {
          key: `shouldComponentUpdate`,
          value: function (e, t) {
            var n = e.viewBox,
              r = FT(e, OT),
              i = this.props,
              a = i.viewBox,
              o = FT(i, kT);
            return !bo(n, a) || !bo(r, o) || !bo(t, this.state);
          },
        },
        {
          key: `componentDidMount`,
          value: function () {
            var e = this.layerReference;
            if (e) {
              var t = e.getElementsByClassName(`recharts-cartesian-axis-tick-value`)[0];
              t &&
                this.setState({
                  fontSize: window.getComputedStyle(t).fontSize,
                  letterSpacing: window.getComputedStyle(t).letterSpacing,
                });
            }
          },
        },
        {
          key: `getTickLineCoord`,
          value: function (e) {
            var t = this.props,
              n = t.x,
              r = t.y,
              i = t.width,
              a = t.height,
              o = t.orientation,
              s = t.tickSize,
              c = t.mirror,
              l = t.tickMargin,
              u,
              d,
              f,
              p,
              m,
              h,
              g = c ? -1 : 1,
              _ = e.tickSize || s,
              v = V(e.tickCoord) ? e.tickCoord : e.coordinate;
            switch (o) {
              case `top`:
                ((u = d = e.coordinate),
                  (p = r + +!c * a),
                  (f = p - g * _),
                  (h = f - g * l),
                  (m = v));
                break;
              case `left`:
                ((f = p = e.coordinate),
                  (d = n + +!c * i),
                  (u = d - g * _),
                  (m = u - g * l),
                  (h = v));
                break;
              case `right`:
                ((f = p = e.coordinate),
                  (d = n + +c * i),
                  (u = d + g * _),
                  (m = u + g * l),
                  (h = v));
                break;
              default:
                ((u = d = e.coordinate),
                  (p = r + +c * a),
                  (f = p + g * _),
                  (h = f + g * l),
                  (m = v));
                break;
            }
            return { line: { x1: u, y1: f, x2: d, y2: p }, tick: { x: m, y: h } };
          },
        },
        {
          key: `getTickTextAnchor`,
          value: function () {
            var e = this.props,
              t = e.orientation,
              n = e.mirror,
              r;
            switch (t) {
              case `left`:
                r = n ? `start` : `end`;
                break;
              case `right`:
                r = n ? `end` : `start`;
                break;
              default:
                r = `middle`;
                break;
            }
            return r;
          },
        },
        {
          key: `getTickVerticalAnchor`,
          value: function () {
            var e = this.props,
              t = e.orientation,
              n = e.mirror,
              r = `end`;
            switch (t) {
              case `left`:
              case `right`:
                r = `middle`;
                break;
              case `top`:
                r = n ? `start` : `end`;
                break;
              default:
                r = n ? `end` : `start`;
                break;
            }
            return r;
          },
        },
        {
          key: `renderAxisLine`,
          value: function () {
            var e = this.props,
              t = e.x,
              n = e.y,
              r = e.width,
              i = e.height,
              a = e.orientation,
              o = e.mirror,
              s = e.axisLine,
              c = PT(PT(PT({}, W(this.props, !1)), W(s, !1)), {}, { fill: `none` });
            if (a === `top` || a === `bottom`) {
              var l = +((a === `top` && !o) || (a === `bottom` && o));
              c = PT(PT({}, c), {}, { x1: t, y1: n + l * i, x2: t + r, y2: n + l * i });
            } else {
              var u = +((a === `left` && !o) || (a === `right` && o));
              c = PT(PT({}, c), {}, { x1: t + u * r, y1: n, x2: t + u * r, y2: n + i });
            }
            return z.createElement(
              `line`,
              MT({}, c, {
                className: F(`recharts-cartesian-axis-line`, (0, oo.default)(s, `className`)),
              })
            );
          },
        },
        {
          key: `renderTicks`,
          value: function (e, n, r) {
            var i = this,
              a = this.props,
              o = a.tickLine,
              s = a.stroke,
              c = a.tick,
              l = a.tickFormatter,
              u = a.unit,
              d = DT(PT(PT({}, this.props), {}, { ticks: e }), n, r),
              f = this.getTickTextAnchor(),
              p = this.getTickVerticalAnchor(),
              m = W(this.props, !1),
              h = W(c, !1),
              g = PT(PT({}, m), {}, { fill: `none` }, W(o, !1)),
              _ = d.map(function (e, n) {
                var r = i.getTickLineCoord(e),
                  a = r.line,
                  _ = r.tick,
                  v = PT(
                    PT(
                      PT(
                        PT({ textAnchor: f, verticalAnchor: p }, m),
                        {},
                        { stroke: `none`, fill: s },
                        h
                      ),
                      _
                    ),
                    {},
                    { index: n, payload: e, visibleTicksCount: d.length, tickFormatter: l }
                  );
                return z.createElement(
                  G,
                  MT(
                    {
                      className: `recharts-cartesian-axis-tick`,
                      key: `tick-${e.value}-${e.coordinate}-${e.tickCoord}`,
                    },
                    Ao(i.props, e, n)
                  ),
                  o &&
                    z.createElement(
                      `line`,
                      MT({}, g, a, {
                        className: F(
                          `recharts-cartesian-axis-tick-line`,
                          (0, oo.default)(o, `className`)
                        ),
                      })
                    ),
                  c &&
                    t.renderTickItem(
                      c,
                      v,
                      `${(0, U.default)(l) ? l(e.value, n) : e.value}${u || ``}`
                    )
                );
              });
            return z.createElement(`g`, { className: `recharts-cartesian-axis-ticks` }, _);
          },
        },
        {
          key: `render`,
          value: function () {
            var e = this,
              t = this.props,
              n = t.axisLine,
              r = t.width,
              i = t.height,
              a = t.ticksGenerator,
              o = t.className;
            if (t.hide) return null;
            var s = this.props,
              c = s.ticks,
              l = FT(s, AT),
              u = c;
            return (
              (0, U.default)(a) && (u = c && c.length > 0 ? a(this.props) : a(l)),
              r <= 0 || i <= 0 || !u || !u.length
                ? null
                : z.createElement(
                    G,
                    {
                      className: F(`recharts-cartesian-axis`, o),
                      ref: function (t) {
                        e.layerReference = t;
                      },
                    },
                    n && this.renderAxisLine(),
                    this.renderTicks(u, this.state.fontSize, this.state.letterSpacing),
                    u_.renderCallByParent(this.props)
                  )
            );
          },
        },
      ],
      [
        {
          key: `renderTickItem`,
          value: function (e, t, n) {
            return z.isValidElement(e)
              ? z.cloneElement(e, t)
              : (0, U.default)(e)
                ? e(t)
                : z.createElement(
                    mm,
                    MT({}, t, { className: `recharts-cartesian-axis-tick-value` }),
                    n
                  );
          },
        },
      ]
    ),
    t
  );
})(z.Component);
(qT(XT, `displayName`, `CartesianAxis`),
  qT(XT, `defaultProps`, {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    viewBox: { x: 0, y: 0, width: 0, height: 0 },
    orientation: `bottom`,
    ticks: [],
    stroke: `#666`,
    tickLine: !0,
    axisLine: !0,
    tick: !0,
    mirror: !1,
    minTickGap: 5,
    tickSize: 6,
    tickMargin: 2,
    interval: `preserveEnd`,
  }));
var ZT = [`x1`, `y1`, `x2`, `y2`, `key`],
  QT = [`offset`];
function $T(e) {
  '@babel/helpers - typeof';
  return (
    ($T =
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
    $T(e)
  );
}
function eE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function tE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? eE(Object(n), !0).forEach(function (t) {
          nE(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : eE(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function nE(e, t, n) {
  return (
    (t = rE(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function rE(e) {
  var t = iE(e, `string`);
  return $T(t) == `symbol` ? t : String(t);
}
function iE(e, t) {
  if ($T(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if ($T(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function aE() {
  return (
    (aE = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    aE.apply(this, arguments)
  );
}
function oE(e, t) {
  if (e == null) return {};
  var n = sE(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function sE(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
var cE = function (e) {
  var t = e.fill;
  if (!t || t === `none`) return null;
  var n = e.fillOpacity,
    r = e.x,
    i = e.y,
    a = e.width,
    o = e.height;
  return z.createElement(`rect`, {
    x: r,
    y: i,
    width: a,
    height: o,
    stroke: `none`,
    fill: t,
    fillOpacity: n,
    className: `recharts-cartesian-grid-bg`,
  });
};
function lE(e, t) {
  var n;
  if (z.isValidElement(e)) n = z.cloneElement(e, t);
  else if ((0, U.default)(e)) n = e(t);
  else {
    var r = t.x1,
      i = t.y1,
      a = t.x2,
      o = t.y2,
      s = t.key,
      c = W(oE(t, ZT), !1);
    c.offset;
    var l = oE(c, QT);
    n = z.createElement(`line`, aE({}, l, { x1: r, y1: i, x2: a, y2: o, fill: `none`, key: s }));
  }
  return n;
}
function uE(e) {
  var t = e.x,
    n = e.width,
    r = e.horizontal,
    i = r === void 0 ? !0 : r,
    a = e.horizontalPoints;
  if (!i || !a || !a.length) return null;
  var o = a.map(function (r, a) {
    return lE(i, tE(tE({}, e), {}, { x1: t, y1: r, x2: t + n, y2: r, key: `line-${a}`, index: a }));
  });
  return z.createElement(`g`, { className: `recharts-cartesian-grid-horizontal` }, o);
}
function dE(e) {
  var t = e.y,
    n = e.height,
    r = e.vertical,
    i = r === void 0 ? !0 : r,
    a = e.verticalPoints;
  if (!i || !a || !a.length) return null;
  var o = a.map(function (r, a) {
    return lE(i, tE(tE({}, e), {}, { x1: r, y1: t, x2: r, y2: t + n, key: `line-${a}`, index: a }));
  });
  return z.createElement(`g`, { className: `recharts-cartesian-grid-vertical` }, o);
}
function fE(e) {
  var t = e.horizontalFill,
    n = e.fillOpacity,
    r = e.x,
    i = e.y,
    a = e.width,
    o = e.height,
    s = e.horizontalPoints,
    c = e.horizontal;
  if (!(c === void 0 || c) || !t || !t.length) return null;
  var l = s
    .map(function (e) {
      return Math.round(e + i - i);
    })
    .sort(function (e, t) {
      return e - t;
    });
  i !== l[0] && l.unshift(0);
  var u = l.map(function (e, s) {
    var c = l[s + 1] ? l[s + 1] - e : i + o - e;
    if (c <= 0) return null;
    var u = s % t.length;
    return z.createElement(`rect`, {
      key: `react-${s}`,
      y: e,
      x: r,
      height: c,
      width: a,
      stroke: `none`,
      fill: t[u],
      fillOpacity: n,
      className: `recharts-cartesian-grid-bg`,
    });
  });
  return z.createElement(`g`, { className: `recharts-cartesian-gridstripes-horizontal` }, u);
}
function pE(e) {
  var t = e.vertical,
    n = t === void 0 ? !0 : t,
    r = e.verticalFill,
    i = e.fillOpacity,
    a = e.x,
    o = e.y,
    s = e.width,
    c = e.height,
    l = e.verticalPoints;
  if (!n || !r || !r.length) return null;
  var u = l
    .map(function (e) {
      return Math.round(e + a - a);
    })
    .sort(function (e, t) {
      return e - t;
    });
  a !== u[0] && u.unshift(0);
  var d = u.map(function (e, t) {
    var n = u[t + 1] ? u[t + 1] - e : a + s - e;
    if (n <= 0) return null;
    var l = t % r.length;
    return z.createElement(`rect`, {
      key: `react-${t}`,
      x: e,
      y: o,
      width: n,
      height: c,
      stroke: `none`,
      fill: r[l],
      fillOpacity: i,
      className: `recharts-cartesian-grid-bg`,
    });
  });
  return z.createElement(`g`, { className: `recharts-cartesian-gridstripes-vertical` }, d);
}
var mE = function (e, t) {
    var n = e.xAxis,
      r = e.width,
      i = e.height,
      a = e.offset;
    return rg(
      DT(
        tE(
          tE(tE({}, XT.defaultProps), n),
          {},
          { ticks: ig(n, !0), viewBox: { x: 0, y: 0, width: r, height: i } }
        )
      ),
      a.left,
      a.left + a.width,
      t
    );
  },
  hE = function (e, t) {
    var n = e.yAxis,
      r = e.width,
      i = e.height,
      a = e.offset;
    return rg(
      DT(
        tE(
          tE(tE({}, XT.defaultProps), n),
          {},
          { ticks: ig(n, !0), viewBox: { x: 0, y: 0, width: r, height: i } }
        )
      ),
      a.top,
      a.top + a.height,
      t
    );
  },
  gE = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: `#ccc`,
    fill: `none`,
    verticalFill: [],
    horizontalFill: [],
  };
function _E(e) {
  var t = Aw(),
    n = jw(),
    r = kw(),
    i = tE(
      tE({}, e),
      {},
      {
        stroke: e.stroke ?? gE.stroke,
        fill: e.fill ?? gE.fill,
        horizontal: e.horizontal ?? gE.horizontal,
        horizontalFill: e.horizontalFill ?? gE.horizontalFill,
        vertical: e.vertical ?? gE.vertical,
        verticalFill: e.verticalFill ?? gE.verticalFill,
        x: V(e.x) ? e.x : r.left,
        y: V(e.y) ? e.y : r.top,
        width: V(e.width) ? e.width : r.width,
        height: V(e.height) ? e.height : r.height,
      }
    ),
    a = i.x,
    o = i.y,
    s = i.width,
    c = i.height,
    l = i.syncWithTicks,
    u = i.horizontalValues,
    d = i.verticalValues,
    f = Tw(),
    p = Ew();
  if (!V(s) || s <= 0 || !V(c) || c <= 0 || !V(a) || a !== +a || !V(o) || o !== +o) return null;
  var m = i.verticalCoordinatesGenerator || mE,
    h = i.horizontalCoordinatesGenerator || hE,
    g = i.horizontalPoints,
    _ = i.verticalPoints;
  if ((!g || !g.length) && (0, U.default)(h)) {
    var v = u && u.length,
      y = h(
        {
          yAxis: p ? tE(tE({}, p), {}, { ticks: v ? u : p.ticks }) : void 0,
          width: t,
          height: n,
          offset: r,
        },
        v ? !0 : l
      );
    (ds(
      Array.isArray(y),
      `horizontalCoordinatesGenerator should return Array but instead it returned [${$T(y)}]`
    ),
      Array.isArray(y) && (g = y));
  }
  if ((!_ || !_.length) && (0, U.default)(m)) {
    var b = d && d.length,
      x = m(
        {
          xAxis: f ? tE(tE({}, f), {}, { ticks: b ? d : f.ticks }) : void 0,
          width: t,
          height: n,
          offset: r,
        },
        b ? !0 : l
      );
    (ds(
      Array.isArray(x),
      `verticalCoordinatesGenerator should return Array but instead it returned [${$T(x)}]`
    ),
      Array.isArray(x) && (_ = x));
  }
  return z.createElement(
    `g`,
    { className: `recharts-cartesian-grid` },
    z.createElement(cE, {
      fill: i.fill,
      fillOpacity: i.fillOpacity,
      x: i.x,
      y: i.y,
      width: i.width,
      height: i.height,
    }),
    z.createElement(uE, aE({}, i, { offset: r, horizontalPoints: g, xAxis: f, yAxis: p })),
    z.createElement(dE, aE({}, i, { offset: r, verticalPoints: _, xAxis: f, yAxis: p })),
    z.createElement(fE, aE({}, i, { horizontalPoints: g })),
    z.createElement(pE, aE({}, i, { verticalPoints: _ }))
  );
}
_E.displayName = `CartesianGrid`;
var vE = [`type`, `layout`, `connectNulls`, `ref`];
function yE(e) {
  '@babel/helpers - typeof';
  return (
    (yE =
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
    yE(e)
  );
}
function bE(e, t) {
  if (e == null) return {};
  var n = xE(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function xE(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function SE() {
  return (
    (SE = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    SE.apply(this, arguments)
  );
}
function CE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function wE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? CE(Object(n), !0).forEach(function (t) {
          VE(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : CE(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function TE(e) {
  return kE(e) || OE(e) || DE(e) || EE();
}
function EE() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function DE(e, t) {
  if (e) {
    if (typeof e == `string`) return AE(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return AE(e, t);
  }
}
function OE(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function kE(e) {
  if (Array.isArray(e)) return AE(e);
}
function AE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function jE(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function ME(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, HE(r.key), r));
  }
}
function NE(e, t, n) {
  return (
    t && ME(e.prototype, t),
    n && ME(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function PE(e, t, n) {
  return (
    (t = LE(t)),
    FE(e, IE() ? Reflect.construct(t, n || [], LE(e).constructor) : t.apply(e, n))
  );
}
function FE(e, t) {
  if (t && (yE(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return RE(e);
}
function IE() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (IE = function () {
    return !!e;
  })();
}
function LE(e) {
  return (
    (LE = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    LE(e)
  );
}
function RE(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function zE(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && BE(e, t));
}
function BE(e, t) {
  return (
    (BE = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    BE(e, t)
  );
}
function VE(e, t, n) {
  return (
    (t = HE(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function HE(e) {
  var t = UE(e, `string`);
  return yE(t) == `symbol` ? t : String(t);
}
function UE(e, t) {
  if (yE(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (yE(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var WE = (function (e) {
  zE(t, e);
  function t() {
    var e;
    jE(this, t);
    var n = [...arguments];
    return (
      (e = PE(this, t, [].concat(n))),
      VE(RE(e), `state`, { isAnimationFinished: !0, totalLength: 0 }),
      VE(RE(e), `generateSimpleStrokeDasharray`, function (e, t) {
        return `${t}px ${e - t}px`;
      }),
      VE(RE(e), `getStrokeDasharray`, function (n, r, i) {
        var a = i.reduce(function (e, t) {
          return e + t;
        });
        if (!a) return e.generateSimpleStrokeDasharray(r, n);
        for (
          var o = Math.floor(n / a), s = n % a, c = r - n, l = [], u = 0, d = 0;
          u < i.length;
          d += i[u], ++u
        )
          if (d + i[u] > s) {
            l = [].concat(TE(i.slice(0, u)), [s - d]);
            break;
          }
        var f = l.length % 2 == 0 ? [0, c] : [c];
        return []
          .concat(TE(t.repeat(i, o)), TE(l), f)
          .map(function (e) {
            return `${e}px`;
          })
          .join(`, `);
      }),
      VE(RE(e), `id`, po(`recharts-line-`)),
      VE(RE(e), `pathRef`, function (t) {
        e.mainCurve = t;
      }),
      VE(RE(e), `handleAnimationEnd`, function () {
        (e.setState({ isAnimationFinished: !0 }),
          e.props.onAnimationEnd && e.props.onAnimationEnd());
      }),
      VE(RE(e), `handleAnimationStart`, function () {
        (e.setState({ isAnimationFinished: !1 }),
          e.props.onAnimationStart && e.props.onAnimationStart());
      }),
      e
    );
  }
  return (
    NE(
      t,
      [
        {
          key: `componentDidMount`,
          value: function () {
            if (this.props.isAnimationActive) {
              var e = this.getTotalLength();
              this.setState({ totalLength: e });
            }
          },
        },
        {
          key: `componentDidUpdate`,
          value: function () {
            if (this.props.isAnimationActive) {
              var e = this.getTotalLength();
              e !== this.state.totalLength && this.setState({ totalLength: e });
            }
          },
        },
        {
          key: `getTotalLength`,
          value: function () {
            var e = this.mainCurve;
            try {
              return (e && e.getTotalLength && e.getTotalLength()) || 0;
            } catch {
              return 0;
            }
          },
        },
        {
          key: `renderErrorBar`,
          value: function (e, t) {
            if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
            var n = this.props,
              r = n.points,
              i = n.xAxis,
              a = n.yAxis,
              o = n.layout,
              s = n.children,
              c = Ho(s, Sh);
            if (!c) return null;
            var l = function (e, t) {
                return { x: e.x, y: e.y, value: e.value, errorVal: J(e.payload, t) };
              },
              u = { clipPath: e ? `url(#clipPath-${t})` : null };
            return z.createElement(
              G,
              u,
              c.map(function (e) {
                return z.cloneElement(e, {
                  key: `bar-${e.props.dataKey}`,
                  data: r,
                  xAxis: i,
                  yAxis: a,
                  layout: o,
                  dataPointFormatter: l,
                });
              })
            );
          },
        },
        {
          key: `renderDots`,
          value: function (e, n, r) {
            if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
            var i = this.props,
              a = i.dot,
              o = i.points,
              s = i.dataKey,
              c = W(this.props, !1),
              l = W(a, !0),
              u = o.map(function (e, n) {
                var r = wE(
                  wE(wE({ key: `dot-${n}`, r: 3 }, c), l),
                  {},
                  { value: e.value, dataKey: s, cx: e.x, cy: e.y, index: n, payload: e.payload }
                );
                return t.renderDotItem(a, r);
              }),
              d = { clipPath: e ? `url(#clipPath-${n ? `` : `dots-`}${r})` : null };
            return z.createElement(G, SE({ className: `recharts-line-dots`, key: `dots` }, d), u);
          },
        },
        {
          key: `renderCurveStatically`,
          value: function (e, t, n, r) {
            var i = this.props,
              a = i.type,
              o = i.layout,
              s = i.connectNulls;
            i.ref;
            var c = wE(
              wE(
                wE({}, W(bE(i, vE), !0)),
                {},
                {
                  fill: `none`,
                  className: `recharts-line-curve`,
                  clipPath: t ? `url(#clipPath-${n})` : null,
                  points: e,
                },
                r
              ),
              {},
              { type: a, layout: o, connectNulls: s }
            );
            return z.createElement(cv, SE({}, c, { pathRef: this.pathRef }));
          },
        },
        {
          key: `renderCurveWithAnimation`,
          value: function (e, t) {
            var n = this,
              r = this.props,
              i = r.points,
              a = r.strokeDasharray,
              o = r.isAnimationActive,
              s = r.animationBegin,
              c = r.animationDuration,
              l = r.animationEasing,
              u = r.animationId,
              d = r.animateNewValues,
              f = r.width,
              p = r.height,
              m = this.state,
              h = m.prevPoints,
              g = m.totalLength;
            return z.createElement(
              zb,
              {
                begin: s,
                duration: c,
                isActive: o,
                easing: l,
                from: { t: 0 },
                to: { t: 1 },
                key: `line-${u}`,
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (r) {
                var o = r.t;
                if (h) {
                  var s = h.length / i.length,
                    c = i.map(function (e, t) {
                      var n = Math.floor(t * s);
                      if (h[n]) {
                        var r = h[n],
                          i = _o(r.x, e.x),
                          a = _o(r.y, e.y);
                        return wE(wE({}, e), {}, { x: i(o), y: a(o) });
                      }
                      if (d) {
                        var c = _o(f * 2, e.x),
                          l = _o(p / 2, e.y);
                        return wE(wE({}, e), {}, { x: c(o), y: l(o) });
                      }
                      return wE(wE({}, e), {}, { x: e.x, y: e.y });
                    });
                  return n.renderCurveStatically(c, e, t);
                }
                var l = _o(0, g)(o),
                  u;
                if (a) {
                  var m = `${a}`.split(/[,\s]+/gim).map(function (e) {
                    return parseFloat(e);
                  });
                  u = n.getStrokeDasharray(l, g, m);
                } else u = n.generateSimpleStrokeDasharray(g, l);
                return n.renderCurveStatically(i, e, t, { strokeDasharray: u });
              }
            );
          },
        },
        {
          key: `renderCurve`,
          value: function (e, t) {
            var n = this.props,
              r = n.points,
              i = n.isAnimationActive,
              a = this.state,
              o = a.prevPoints,
              s = a.totalLength;
            return i && r && r.length && ((!o && s > 0) || !(0, Nh.default)(o, r))
              ? this.renderCurveWithAnimation(e, t)
              : this.renderCurveStatically(r, e, t);
          },
        },
        {
          key: `render`,
          value: function () {
            var e = this.props,
              t = e.hide,
              n = e.dot,
              r = e.points,
              i = e.className,
              a = e.xAxis,
              o = e.yAxis,
              s = e.top,
              c = e.left,
              l = e.width,
              u = e.height,
              d = e.isAnimationActive,
              f = e.id;
            if (t || !r || !r.length) return null;
            var p = this.state.isAnimationFinished,
              m = r.length === 1,
              h = F(`recharts-line`, i),
              g = a && a.allowDataOverflow,
              _ = o && o.allowDataOverflow,
              v = g || _,
              y = (0, H.default)(f) ? this.id : f,
              b = W(n, !1) ?? { r: 3, strokeWidth: 2 },
              x = b.r,
              S = x === void 0 ? 3 : x,
              C = b.strokeWidth,
              w = C === void 0 ? 2 : C,
              T = (qo(n) ? n : {}).clipDot,
              E = T === void 0 ? !0 : T,
              D = S * 2 + w;
            return z.createElement(
              G,
              { className: h },
              g || _
                ? z.createElement(
                    `defs`,
                    null,
                    z.createElement(
                      `clipPath`,
                      { id: `clipPath-${y}` },
                      z.createElement(`rect`, {
                        x: g ? c : c - l / 2,
                        y: _ ? s : s - u / 2,
                        width: g ? l : l * 2,
                        height: _ ? u : u * 2,
                      })
                    ),
                    !E &&
                      z.createElement(
                        `clipPath`,
                        { id: `clipPath-dots-${y}` },
                        z.createElement(`rect`, {
                          x: c - D / 2,
                          y: s - D / 2,
                          width: l + D,
                          height: u + D,
                        })
                      )
                  )
                : null,
              !m && this.renderCurve(v, y),
              this.renderErrorBar(v, y),
              (m || n) && this.renderDots(v, E, y),
              (!d || p) && N_.renderCallByParent(this.props, r)
            );
          },
        },
      ],
      [
        {
          key: `getDerivedStateFromProps`,
          value: function (e, t) {
            return e.animationId === t.prevAnimationId
              ? e.points === t.curPoints
                ? null
                : { curPoints: e.points }
              : { prevAnimationId: e.animationId, curPoints: e.points, prevPoints: t.curPoints };
          },
        },
        {
          key: `repeat`,
          value: function (e, t) {
            for (var n = e.length % 2 == 0 ? e : [].concat(TE(e), [0]), r = [], i = 0; i < t; ++i)
              r = [].concat(TE(r), TE(n));
            return r;
          },
        },
        {
          key: `renderDotItem`,
          value: function (e, t) {
            var n;
            if (z.isValidElement(e)) n = z.cloneElement(e, t);
            else if ((0, U.default)(e)) n = e(t);
            else {
              var r = F(`recharts-line-dot`, typeof e == `boolean` ? `` : e.className);
              n = z.createElement(yx, SE({}, t, { className: r }));
            }
            return n;
          },
        },
      ]
    ),
    t
  );
})(z.PureComponent);
(VE(WE, `displayName`, `Line`),
  VE(WE, `defaultProps`, {
    xAxisId: 0,
    yAxisId: 0,
    connectNulls: !1,
    activeDot: !0,
    dot: !0,
    legendType: `line`,
    stroke: `#3182bd`,
    strokeWidth: 1,
    fill: `#fff`,
    points: [],
    isAnimationActive: !Tf.isSsr,
    animateNewValues: !0,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: `ease`,
    hide: !1,
    label: !1,
  }),
  VE(WE, `getComposedData`, function (e) {
    var t = e.props,
      n = e.xAxis,
      r = e.yAxis,
      i = e.xAxisTicks,
      a = e.yAxisTicks,
      o = e.dataKey,
      s = e.bandSize,
      c = e.displayedData,
      l = e.offset,
      u = t.layout;
    return wE(
      {
        points: c.map(function (e, t) {
          var c = J(e, o);
          return u === `horizontal`
            ? {
                x: gg({ axis: n, ticks: i, bandSize: s, entry: e, index: t }),
                y: (0, H.default)(c) ? null : r.scale(c),
                value: c,
                payload: e,
              }
            : {
                x: (0, H.default)(c) ? null : n.scale(c),
                y: gg({ axis: r, ticks: a, bandSize: s, entry: e, index: t }),
                value: c,
                payload: e,
              };
        }),
        layout: u,
      },
      l
    );
  }));
var GE = [`layout`, `type`, `stroke`, `connectNulls`, `isRange`, `ref`],
  KE;
function qE(e) {
  '@babel/helpers - typeof';
  return (
    (qE =
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
    qE(e)
  );
}
function JE(e, t) {
  if (e == null) return {};
  var n = YE(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function YE(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function XE() {
  return (
    (XE = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    XE.apply(this, arguments)
  );
}
function ZE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function QE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? ZE(Object(n), !0).forEach(function (t) {
          lD(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : ZE(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function $E(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function eD(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, uD(r.key), r));
  }
}
function tD(e, t, n) {
  return (
    t && eD(e.prototype, t),
    n && eD(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function nD(e, t, n) {
  return (
    (t = aD(t)),
    rD(e, iD() ? Reflect.construct(t, n || [], aD(e).constructor) : t.apply(e, n))
  );
}
function rD(e, t) {
  if (t && (qE(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return oD(e);
}
function iD() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (iD = function () {
    return !!e;
  })();
}
function aD(e) {
  return (
    (aD = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    aD(e)
  );
}
function oD(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function sD(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && cD(e, t));
}
function cD(e, t) {
  return (
    (cD = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    cD(e, t)
  );
}
function lD(e, t, n) {
  return (
    (t = uD(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function uD(e) {
  var t = dD(e, `string`);
  return qE(t) == `symbol` ? t : String(t);
}
function dD(e, t) {
  if (qE(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (qE(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var fD = (function (e) {
  sD(t, e);
  function t() {
    var e;
    $E(this, t);
    var n = [...arguments];
    return (
      (e = nD(this, t, [].concat(n))),
      lD(oD(e), `state`, { isAnimationFinished: !0 }),
      lD(oD(e), `id`, po(`recharts-area-`)),
      lD(oD(e), `handleAnimationEnd`, function () {
        var t = e.props.onAnimationEnd;
        (e.setState({ isAnimationFinished: !0 }), (0, U.default)(t) && t());
      }),
      lD(oD(e), `handleAnimationStart`, function () {
        var t = e.props.onAnimationStart;
        (e.setState({ isAnimationFinished: !1 }), (0, U.default)(t) && t());
      }),
      e
    );
  }
  return (
    tD(
      t,
      [
        {
          key: `renderDots`,
          value: function (e, n, r) {
            var i = this.props.isAnimationActive,
              a = this.state.isAnimationFinished;
            if (i && !a) return null;
            var o = this.props,
              s = o.dot,
              c = o.points,
              l = o.dataKey,
              u = W(this.props, !1),
              d = W(s, !0),
              f = c.map(function (e, n) {
                var r = QE(
                  QE(QE({ key: `dot-${n}`, r: 3 }, u), d),
                  {},
                  {
                    index: n,
                    cx: e.x,
                    cy: e.y,
                    dataKey: l,
                    value: e.value,
                    payload: e.payload,
                    points: c,
                  }
                );
                return t.renderDotItem(s, r);
              }),
              p = { clipPath: e ? `url(#clipPath-${n ? `` : `dots-`}${r})` : null };
            return z.createElement(G, XE({ className: `recharts-area-dots` }, p), f);
          },
        },
        {
          key: `renderHorizontalRect`,
          value: function (e) {
            var t = this.props,
              n = t.baseLine,
              r = t.points,
              i = t.strokeWidth,
              a = r[0].x,
              o = r[r.length - 1].x,
              s = e * Math.abs(a - o),
              c = (0, Ah.default)(
                r.map(function (e) {
                  return e.y || 0;
                })
              );
            return (
              V(n) && typeof n == `number`
                ? (c = Math.max(n, c))
                : n &&
                  Array.isArray(n) &&
                  n.length &&
                  (c = Math.max(
                    (0, Ah.default)(
                      n.map(function (e) {
                        return e.y || 0;
                      })
                    ),
                    c
                  )),
              V(c)
                ? z.createElement(`rect`, {
                    x: a < o ? a : a - s,
                    y: 0,
                    width: s,
                    height: Math.floor(c + (i ? parseInt(`${i}`, 10) : 1)),
                  })
                : null
            );
          },
        },
        {
          key: `renderVerticalRect`,
          value: function (e) {
            var t = this.props,
              n = t.baseLine,
              r = t.points,
              i = t.strokeWidth,
              a = r[0].y,
              o = r[r.length - 1].y,
              s = e * Math.abs(a - o),
              c = (0, Ah.default)(
                r.map(function (e) {
                  return e.x || 0;
                })
              );
            return (
              V(n) && typeof n == `number`
                ? (c = Math.max(n, c))
                : n &&
                  Array.isArray(n) &&
                  n.length &&
                  (c = Math.max(
                    (0, Ah.default)(
                      n.map(function (e) {
                        return e.x || 0;
                      })
                    ),
                    c
                  )),
              V(c)
                ? z.createElement(`rect`, {
                    x: 0,
                    y: a < o ? a : a - s,
                    width: c + (i ? parseInt(`${i}`, 10) : 1),
                    height: Math.floor(s),
                  })
                : null
            );
          },
        },
        {
          key: `renderClipRect`,
          value: function (e) {
            return this.props.layout === `vertical`
              ? this.renderVerticalRect(e)
              : this.renderHorizontalRect(e);
          },
        },
        {
          key: `renderAreaStatically`,
          value: function (e, t, n, r) {
            var i = this.props,
              a = i.layout,
              o = i.type,
              s = i.stroke,
              c = i.connectNulls,
              l = i.isRange;
            i.ref;
            var u = JE(i, GE);
            return z.createElement(
              G,
              { clipPath: n ? `url(#clipPath-${r})` : null },
              z.createElement(
                cv,
                XE({}, W(u, !0), {
                  points: e,
                  connectNulls: c,
                  type: o,
                  baseLine: t,
                  layout: a,
                  stroke: `none`,
                  className: `recharts-area-area`,
                })
              ),
              s !== `none` &&
                z.createElement(
                  cv,
                  XE({}, W(this.props, !1), {
                    className: `recharts-area-curve`,
                    layout: a,
                    type: o,
                    connectNulls: c,
                    fill: `none`,
                    points: e,
                  })
                ),
              s !== `none` &&
                l &&
                z.createElement(
                  cv,
                  XE({}, W(this.props, !1), {
                    className: `recharts-area-curve`,
                    layout: a,
                    type: o,
                    connectNulls: c,
                    fill: `none`,
                    points: t,
                  })
                )
            );
          },
        },
        {
          key: `renderAreaWithAnimation`,
          value: function (e, t) {
            var n = this,
              r = this.props,
              i = r.points,
              a = r.baseLine,
              o = r.isAnimationActive,
              s = r.animationBegin,
              c = r.animationDuration,
              l = r.animationEasing,
              u = r.animationId,
              d = this.state,
              f = d.prevPoints,
              p = d.prevBaseLine;
            return z.createElement(
              zb,
              {
                begin: s,
                duration: c,
                isActive: o,
                easing: l,
                from: { t: 0 },
                to: { t: 1 },
                key: `area-${u}`,
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (r) {
                var o = r.t;
                if (f) {
                  var s = f.length / i.length,
                    c = i.map(function (e, t) {
                      var n = Math.floor(t * s);
                      if (f[n]) {
                        var r = f[n],
                          i = _o(r.x, e.x),
                          a = _o(r.y, e.y);
                        return QE(QE({}, e), {}, { x: i(o), y: a(o) });
                      }
                      return e;
                    }),
                    l =
                      V(a) && typeof a == `number`
                        ? _o(p, a)(o)
                        : (0, H.default)(a) || (0, ao.default)(a)
                          ? _o(p, 0)(o)
                          : a.map(function (e, t) {
                              var n = Math.floor(t * s);
                              if (p[n]) {
                                var r = p[n],
                                  i = _o(r.x, e.x),
                                  a = _o(r.y, e.y);
                                return QE(QE({}, e), {}, { x: i(o), y: a(o) });
                              }
                              return e;
                            });
                  return n.renderAreaStatically(c, l, e, t);
                }
                return z.createElement(
                  G,
                  null,
                  z.createElement(
                    `defs`,
                    null,
                    z.createElement(
                      `clipPath`,
                      { id: `animationClipPath-${t}` },
                      n.renderClipRect(o)
                    )
                  ),
                  z.createElement(
                    G,
                    { clipPath: `url(#animationClipPath-${t})` },
                    n.renderAreaStatically(i, a, e, t)
                  )
                );
              }
            );
          },
        },
        {
          key: `renderArea`,
          value: function (e, t) {
            var n = this.props,
              r = n.points,
              i = n.baseLine,
              a = n.isAnimationActive,
              o = this.state,
              s = o.prevPoints,
              c = o.prevBaseLine,
              l = o.totalLength;
            return a &&
              r &&
              r.length &&
              ((!s && l > 0) || !(0, Nh.default)(s, r) || !(0, Nh.default)(c, i))
              ? this.renderAreaWithAnimation(e, t)
              : this.renderAreaStatically(r, i, e, t);
          },
        },
        {
          key: `render`,
          value: function () {
            var e = this.props,
              t = e.hide,
              n = e.dot,
              r = e.points,
              i = e.className,
              a = e.top,
              o = e.left,
              s = e.xAxis,
              c = e.yAxis,
              l = e.width,
              u = e.height,
              d = e.isAnimationActive,
              f = e.id;
            if (t || !r || !r.length) return null;
            var p = this.state.isAnimationFinished,
              m = r.length === 1,
              h = F(`recharts-area`, i),
              g = s && s.allowDataOverflow,
              _ = c && c.allowDataOverflow,
              v = g || _,
              y = (0, H.default)(f) ? this.id : f,
              b = W(n, !1) ?? { r: 3, strokeWidth: 2 },
              x = b.r,
              S = x === void 0 ? 3 : x,
              C = b.strokeWidth,
              w = C === void 0 ? 2 : C,
              T = (qo(n) ? n : {}).clipDot,
              E = T === void 0 ? !0 : T,
              D = S * 2 + w;
            return z.createElement(
              G,
              { className: h },
              g || _
                ? z.createElement(
                    `defs`,
                    null,
                    z.createElement(
                      `clipPath`,
                      { id: `clipPath-${y}` },
                      z.createElement(`rect`, {
                        x: g ? o : o - l / 2,
                        y: _ ? a : a - u / 2,
                        width: g ? l : l * 2,
                        height: _ ? u : u * 2,
                      })
                    ),
                    !E &&
                      z.createElement(
                        `clipPath`,
                        { id: `clipPath-dots-${y}` },
                        z.createElement(`rect`, {
                          x: o - D / 2,
                          y: a - D / 2,
                          width: l + D,
                          height: u + D,
                        })
                      )
                  )
                : null,
              m ? null : this.renderArea(v, y),
              (n || m) && this.renderDots(v, E, y),
              (!d || p) && N_.renderCallByParent(this.props, r)
            );
          },
        },
      ],
      [
        {
          key: `getDerivedStateFromProps`,
          value: function (e, t) {
            return e.animationId === t.prevAnimationId
              ? e.points !== t.curPoints || e.baseLine !== t.curBaseLine
                ? { curPoints: e.points, curBaseLine: e.baseLine }
                : null
              : {
                  prevAnimationId: e.animationId,
                  curPoints: e.points,
                  curBaseLine: e.baseLine,
                  prevPoints: t.curPoints,
                  prevBaseLine: t.curBaseLine,
                };
          },
        },
      ]
    ),
    t
  );
})(z.PureComponent);
((KE = fD),
  lD(fD, `displayName`, `Area`),
  lD(fD, `defaultProps`, {
    stroke: `#3182bd`,
    fill: `#3182bd`,
    fillOpacity: 0.6,
    xAxisId: 0,
    yAxisId: 0,
    legendType: `line`,
    connectNulls: !1,
    points: [],
    dot: !1,
    activeDot: !0,
    hide: !1,
    isAnimationActive: !Tf.isSsr,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: `ease`,
  }),
  lD(fD, `getBaseValue`, function (e, t, n, r) {
    var i = e.layout,
      a = e.baseValue,
      o = t.props.baseValue ?? a;
    if (V(o) && typeof o == `number`) return o;
    var s = i === `horizontal` ? r : n,
      c = s.scale.domain();
    if (s.type === `number`) {
      var l = Math.max(c[0], c[1]),
        u = Math.min(c[0], c[1]);
      return o === `dataMin` ? u : o === `dataMax` || l < 0 ? l : Math.max(Math.min(c[0], c[1]), 0);
    }
    return o === `dataMin` ? c[0] : o === `dataMax` ? c[1] : c[0];
  }),
  lD(fD, `getComposedData`, function (e) {
    var t = e.props,
      n = e.item,
      r = e.xAxis,
      i = e.yAxis,
      a = e.xAxisTicks,
      o = e.yAxisTicks,
      s = e.bandSize,
      c = e.dataKey,
      l = e.stackedData,
      u = e.dataStartIndex,
      d = e.displayedData,
      f = e.offset,
      p = t.layout,
      m = l && l.length,
      h = KE.getBaseValue(t, n, r, i),
      g = p === `horizontal`,
      _ = !1,
      v = d.map(function (e, t) {
        var n;
        m ? (n = l[u + t]) : ((n = J(e, c)), Array.isArray(n) ? (_ = !0) : (n = [h, n]));
        var d = n[1] == null || (m && J(e, c) == null);
        return g
          ? {
              x: gg({ axis: r, ticks: a, bandSize: s, entry: e, index: t }),
              y: d ? null : i.scale(n[1]),
              value: n,
              payload: e,
            }
          : {
              x: d ? null : r.scale(n[1]),
              y: gg({ axis: i, ticks: o, bandSize: s, entry: e, index: t }),
              value: n,
              payload: e,
            };
      });
    return QE(
      {
        points: v,
        baseLine:
          m || _
            ? v.map(function (e) {
                var t = Array.isArray(e.value) ? e.value[0] : null;
                return g
                  ? { x: e.x, y: t != null && e.y != null ? i.scale(t) : null }
                  : { x: t == null ? null : r.scale(t), y: e.y };
              })
            : g
              ? i.scale(h)
              : r.scale(h),
        layout: p,
        isRange: _,
      },
      f
    );
  }),
  lD(fD, `renderDotItem`, function (e, t) {
    var n;
    if (z.isValidElement(e)) n = z.cloneElement(e, t);
    else if ((0, U.default)(e)) n = e(t);
    else {
      var r = F(`recharts-area-dot`, typeof e == `boolean` ? `` : e.className);
      n = z.createElement(yx, XE({}, t, { className: r }));
    }
    return n;
  }));
var pD = function () {
  return null;
};
((pD.displayName = `ZAxis`),
  (pD.defaultProps = { zAxisId: 0, range: [64, 64], scale: `auto`, type: `number` }));
var mD = [`option`, `isActive`];
function hD() {
  return (
    (hD = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    hD.apply(this, arguments)
  );
}
function gD(e, t) {
  if (e == null) return {};
  var n = _D(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function _D(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function vD(e) {
  var t = e.option,
    n = e.isActive,
    r = gD(e, mD);
  return typeof t == `string`
    ? z.createElement(
        fS,
        hD(
          { option: z.createElement(al, hD({ type: t }, r)), isActive: n, shapeType: `symbols` },
          r
        )
      )
    : z.createElement(fS, hD({ option: t, isActive: n, shapeType: `symbols` }, r));
}
function yD(e) {
  '@babel/helpers - typeof';
  return (
    (yD =
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
    yD(e)
  );
}
function bD() {
  return (
    (bD = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    bD.apply(this, arguments)
  );
}
function xD(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function SD(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? xD(Object(n), !0).forEach(function (t) {
          ND(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : xD(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function CD(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function wD(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, PD(r.key), r));
  }
}
function TD(e, t, n) {
  return (
    t && wD(e.prototype, t),
    n && wD(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function ED(e, t, n) {
  return (
    (t = kD(t)),
    DD(e, OD() ? Reflect.construct(t, n || [], kD(e).constructor) : t.apply(e, n))
  );
}
function DD(e, t) {
  if (t && (yD(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return AD(e);
}
function OD() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (OD = function () {
    return !!e;
  })();
}
function kD(e) {
  return (
    (kD = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    kD(e)
  );
}
function AD(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function jD(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && MD(e, t));
}
function MD(e, t) {
  return (
    (MD = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    MD(e, t)
  );
}
function ND(e, t, n) {
  return (
    (t = PD(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function PD(e) {
  var t = FD(e, `string`);
  return yD(t) == `symbol` ? t : String(t);
}
function FD(e, t) {
  if (yD(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (yD(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var ID = (function (e) {
  jD(t, e);
  function t() {
    var e;
    CD(this, t);
    var n = [...arguments];
    return (
      (e = ED(this, t, [].concat(n))),
      ND(AD(e), `state`, { isAnimationFinished: !1 }),
      ND(AD(e), `handleAnimationEnd`, function () {
        e.setState({ isAnimationFinished: !0 });
      }),
      ND(AD(e), `handleAnimationStart`, function () {
        e.setState({ isAnimationFinished: !1 });
      }),
      ND(AD(e), `id`, po(`recharts-scatter-`)),
      e
    );
  }
  return (
    TD(
      t,
      [
        {
          key: `renderSymbolsStatically`,
          value: function (e) {
            var t = this,
              n = this.props,
              r = n.shape,
              i = n.activeShape,
              a = n.activeIndex,
              o = W(this.props, !1);
            return e.map(function (e, n) {
              var s = a === n,
                c = s ? i : r,
                l = SD(SD({ key: `symbol-${n}` }, o), e);
              return z.createElement(
                G,
                bD({ className: `recharts-scatter-symbol` }, Ao(t.props, e, n), {
                  key: `symbol-${e?.cx}-${e?.cy}-${e?.size}-${n}`,
                  role: `img`,
                }),
                z.createElement(vD, bD({ option: c, isActive: s }, l))
              );
            });
          },
        },
        {
          key: `renderSymbolsWithAnimation`,
          value: function () {
            var e = this,
              t = this.props,
              n = t.points,
              r = t.isAnimationActive,
              i = t.animationBegin,
              a = t.animationDuration,
              o = t.animationEasing,
              s = t.animationId,
              c = this.state.prevPoints;
            return z.createElement(
              zb,
              {
                begin: i,
                duration: a,
                isActive: r,
                easing: o,
                from: { t: 0 },
                to: { t: 1 },
                key: `pie-${s}`,
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (t) {
                var r = t.t,
                  i = n.map(function (e, t) {
                    var n = c && c[t];
                    if (n) {
                      var i = _o(n.cx, e.cx),
                        a = _o(n.cy, e.cy),
                        o = _o(n.size, e.size);
                      return SD(SD({}, e), {}, { cx: i(r), cy: a(r), size: o(r) });
                    }
                    var s = _o(0, e.size);
                    return SD(SD({}, e), {}, { size: s(r) });
                  });
                return z.createElement(G, null, e.renderSymbolsStatically(i));
              }
            );
          },
        },
        {
          key: `renderSymbols`,
          value: function () {
            var e = this.props,
              t = e.points,
              n = e.isAnimationActive,
              r = this.state.prevPoints;
            return n && t && t.length && (!r || !(0, Nh.default)(r, t))
              ? this.renderSymbolsWithAnimation()
              : this.renderSymbolsStatically(t);
          },
        },
        {
          key: `renderErrorBar`,
          value: function () {
            if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
            var e = this.props,
              t = e.points,
              n = e.xAxis,
              r = e.yAxis,
              i = e.children,
              a = Ho(i, Sh);
            return a
              ? a.map(function (e, i) {
                  var a = e.props,
                    o = a.direction,
                    s = a.dataKey;
                  return z.cloneElement(e, {
                    key: `${o}-${s}-${t[i]}`,
                    data: t,
                    xAxis: n,
                    yAxis: r,
                    layout: o === `x` ? `vertical` : `horizontal`,
                    dataPointFormatter: function (e, t) {
                      return {
                        x: e.cx,
                        y: e.cy,
                        value: o === `x` ? +e.node.x : +e.node.y,
                        errorVal: J(e, t),
                      };
                    },
                  });
                })
              : null;
          },
        },
        {
          key: `renderLine`,
          value: function () {
            var e = this.props,
              t = e.points,
              n = e.line,
              r = e.lineType,
              i = e.lineJointType,
              a = W(this.props, !1),
              o = W(n, !1),
              s,
              c;
            if (r === `joint`)
              s = t.map(function (e) {
                return { x: e.cx, y: e.cy };
              });
            else if (r === `fitting`) {
              var l = yo(t),
                u = l.xmin,
                d = l.xmax,
                f = l.a,
                p = l.b,
                m = function (e) {
                  return f * e + p;
                };
              s = [
                { x: u, y: m(u) },
                { x: d, y: m(d) },
              ];
            }
            var h = SD(
              SD(SD({}, a), {}, { fill: `none`, stroke: a && a.fill }, o),
              {},
              { points: s }
            );
            return (
              (c = z.isValidElement(n)
                ? z.cloneElement(n, h)
                : (0, U.default)(n)
                  ? n(h)
                  : z.createElement(cv, bD({}, h, { type: i }))),
              z.createElement(
                G,
                { className: `recharts-scatter-line`, key: `recharts-scatter-line` },
                c
              )
            );
          },
        },
        {
          key: `render`,
          value: function () {
            var e = this.props,
              t = e.hide,
              n = e.points,
              r = e.line,
              i = e.className,
              a = e.xAxis,
              o = e.yAxis,
              s = e.left,
              c = e.top,
              l = e.width,
              u = e.height,
              d = e.id,
              f = e.isAnimationActive;
            if (t || !n || !n.length) return null;
            var p = this.state.isAnimationFinished,
              m = F(`recharts-scatter`, i),
              h = a && a.allowDataOverflow,
              g = o && o.allowDataOverflow,
              _ = h || g,
              v = (0, H.default)(d) ? this.id : d;
            return z.createElement(
              G,
              { className: m, clipPath: _ ? `url(#clipPath-${v})` : null },
              h || g
                ? z.createElement(
                    `defs`,
                    null,
                    z.createElement(
                      `clipPath`,
                      { id: `clipPath-${v}` },
                      z.createElement(`rect`, {
                        x: h ? s : s - l / 2,
                        y: g ? c : c - u / 2,
                        width: h ? l : l * 2,
                        height: g ? u : u * 2,
                      })
                    )
                  )
                : null,
              r && this.renderLine(),
              this.renderErrorBar(),
              z.createElement(G, { key: `recharts-scatter-symbols` }, this.renderSymbols()),
              (!f || p) && N_.renderCallByParent(this.props, n)
            );
          },
        },
      ],
      [
        {
          key: `getDerivedStateFromProps`,
          value: function (e, t) {
            return e.animationId === t.prevAnimationId
              ? e.points === t.curPoints
                ? null
                : { curPoints: e.points }
              : { prevAnimationId: e.animationId, curPoints: e.points, prevPoints: t.curPoints };
          },
        },
      ]
    ),
    t
  );
})(z.PureComponent);
(ND(ID, `displayName`, `Scatter`),
  ND(ID, `defaultProps`, {
    xAxisId: 0,
    yAxisId: 0,
    zAxisId: 0,
    legendType: `circle`,
    lineType: `joint`,
    lineJointType: `linear`,
    data: [],
    shape: `circle`,
    hide: !1,
    isAnimationActive: !Tf.isSsr,
    animationBegin: 0,
    animationDuration: 400,
    animationEasing: `linear`,
  }),
  ND(ID, `getComposedData`, function (e) {
    var t = e.xAxis,
      n = e.yAxis,
      r = e.zAxis,
      i = e.item,
      a = e.displayedData,
      o = e.xAxisTicks,
      s = e.yAxisTicks,
      c = e.offset,
      l = i.props.tooltipType,
      u = Ho(i.props.children, up),
      d = (0, H.default)(t.dataKey) ? i.props.dataKey : t.dataKey,
      f = (0, H.default)(n.dataKey) ? i.props.dataKey : n.dataKey,
      p = r && r.dataKey,
      m = r ? r.range : pD.defaultProps.range,
      h = m && m[0],
      g = t.scale.bandwidth ? t.scale.bandwidth() : 0,
      _ = n.scale.bandwidth ? n.scale.bandwidth() : 0;
    return SD(
      {
        points: a.map(function (e, a) {
          var c = J(e, d),
            m = J(e, f),
            v = (!(0, H.default)(p) && J(e, p)) || `-`,
            y = [
              {
                name: (0, H.default)(t.dataKey) ? i.props.name : t.name || t.dataKey,
                unit: t.unit || ``,
                value: c,
                payload: e,
                dataKey: d,
                type: l,
              },
              {
                name: (0, H.default)(n.dataKey) ? i.props.name : n.name || n.dataKey,
                unit: n.unit || ``,
                value: m,
                payload: e,
                dataKey: f,
                type: l,
              },
            ];
          v !== `-` &&
            y.push({
              name: r.name || r.dataKey,
              unit: r.unit || ``,
              value: v,
              payload: e,
              dataKey: p,
              type: l,
            });
          var b = gg({ axis: t, ticks: o, bandSize: g, entry: e, index: a, dataKey: d }),
            x = gg({ axis: n, ticks: s, bandSize: _, entry: e, index: a, dataKey: f }),
            S = v === `-` ? h : r.scale(v),
            C = Math.sqrt(Math.max(S, 0) / Math.PI);
          return SD(
            SD({}, e),
            {},
            {
              cx: b,
              cy: x,
              x: b - C,
              y: x - C,
              xAxis: t,
              yAxis: n,
              zAxis: r,
              width: 2 * C,
              height: 2 * C,
              size: S,
              node: { x: c, y: m, z: v },
              tooltipPayload: y,
              tooltipPosition: { x: b, y: x },
              payload: e,
            },
            u && u[a] && u[a].props
          );
        }),
      },
      c
    );
  }));
function LD() {
  return (
    (LD = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    LD.apply(this, arguments)
  );
}
var RD = function (e) {
  var t = e.xAxisId,
    n = Aw(),
    r = jw(),
    i = ww(t);
  return i == null
    ? null
    : z.createElement(
        XT,
        LD({}, i, {
          className: F(`recharts-${i.axisType} ${i.axisType}`, i.className),
          viewBox: { x: 0, y: 0, width: n, height: r },
          ticksGenerator: function (e) {
            return ig(e, !0);
          },
        })
      );
};
((RD.displayName = `XAxis`),
  (RD.defaultProps = {
    allowDecimals: !0,
    hide: !1,
    orientation: `bottom`,
    width: 0,
    height: 30,
    mirror: !1,
    xAxisId: 0,
    tickCount: 5,
    type: `category`,
    padding: { left: 0, right: 0 },
    allowDataOverflow: !1,
    scale: `auto`,
    reversed: !1,
    allowDuplicatedCategory: !0,
  }));
function zD() {
  return (
    (zD = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    zD.apply(this, arguments)
  );
}
var BD = function (e) {
  var t = e.yAxisId,
    n = Aw(),
    r = jw(),
    i = Dw(t);
  return i == null
    ? null
    : z.createElement(
        XT,
        zD({}, i, {
          className: F(`recharts-${i.axisType} ${i.axisType}`, i.className),
          viewBox: { x: 0, y: 0, width: n, height: r },
          ticksGenerator: function (e) {
            return ig(e, !0);
          },
        })
      );
};
((BD.displayName = `YAxis`),
  (BD.defaultProps = {
    allowDuplicatedCategory: !0,
    allowDecimals: !0,
    hide: !1,
    orientation: `left`,
    width: 60,
    height: 0,
    mirror: !1,
    yAxisId: 0,
    tickCount: 5,
    type: `number`,
    padding: { top: 0, bottom: 0 },
    allowDataOverflow: !1,
    scale: `auto`,
    reversed: !1,
  }));
function VD(e) {
  return GD(e) || WD(e) || UD(e) || HD();
}
function HD() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function UD(e, t) {
  if (e) {
    if (typeof e == `string`) return KD(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return KD(e, t);
  }
}
function WD(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function GD(e) {
  if (Array.isArray(e)) return KD(e);
}
function KD(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var qD = function (e, t, n, r, i) {
    var a = Ho(e, Jw),
      o = Ho(e, rT),
      s = [].concat(VD(a), VD(o)),
      c = Ho(e, fT),
      l = `${r}Id`,
      u = r[0],
      d = t;
    if (
      (s.length &&
        (d = s.reduce(function (e, t) {
          if (t.props[l] === n && iC(t.props, `extendDomain`) && V(t.props[u])) {
            var r = t.props[u];
            return [Math.min(e[0], r), Math.max(e[1], r)];
          }
          return e;
        }, d)),
      c.length)
    ) {
      var f = `${u}1`,
        p = `${u}2`;
      d = c.reduce(function (e, t) {
        if (t.props[l] === n && iC(t.props, `extendDomain`) && V(t.props[f]) && V(t.props[p])) {
          var r = t.props[f],
            i = t.props[p];
          return [Math.min(e[0], r, i), Math.max(e[1], r, i)];
        }
        return e;
      }, d);
    }
    return (
      i &&
        i.length &&
        (d = i.reduce(function (e, t) {
          return V(t) ? [Math.min(e[0], t), Math.max(e[1], t)] : e;
        }, d)),
      d
    );
  },
  JD = new (r(
    o((e, t) => {
      var n = Object.prototype.hasOwnProperty,
        r = `~`;
      function i() {}
      Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (r = !1));
      function a(e, t, n) {
        ((this.fn = e), (this.context = t), (this.once = n || !1));
      }
      function o(e, t, n, i, o) {
        if (typeof n != `function`) throw TypeError(`The listener must be a function`);
        var s = new a(n, i || e, o),
          c = r ? r + t : t;
        return (
          e._events[c]
            ? e._events[c].fn
              ? (e._events[c] = [e._events[c], s])
              : e._events[c].push(s)
            : ((e._events[c] = s), e._eventsCount++),
          e
        );
      }
      function s(e, t) {
        --e._eventsCount === 0 ? (e._events = new i()) : delete e._events[t];
      }
      function c() {
        ((this._events = new i()), (this._eventsCount = 0));
      }
      ((c.prototype.eventNames = function () {
        var e = [],
          t,
          i;
        if (this._eventsCount === 0) return e;
        for (i in (t = this._events)) n.call(t, i) && e.push(r ? i.slice(1) : i);
        return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
      }),
        (c.prototype.listeners = function (e) {
          var t = r ? r + e : e,
            n = this._events[t];
          if (!n) return [];
          if (n.fn) return [n.fn];
          for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
          return o;
        }),
        (c.prototype.listenerCount = function (e) {
          var t = r ? r + e : e,
            n = this._events[t];
          return n ? (n.fn ? 1 : n.length) : 0;
        }),
        (c.prototype.emit = function (e, t, n, i, a, o) {
          var s = r ? r + e : e;
          if (!this._events[s]) return !1;
          var c = this._events[s],
            l = arguments.length,
            u,
            d;
          if (c.fn) {
            switch ((c.once && this.removeListener(e, c.fn, void 0, !0), l)) {
              case 1:
                return (c.fn.call(c.context), !0);
              case 2:
                return (c.fn.call(c.context, t), !0);
              case 3:
                return (c.fn.call(c.context, t, n), !0);
              case 4:
                return (c.fn.call(c.context, t, n, i), !0);
              case 5:
                return (c.fn.call(c.context, t, n, i, a), !0);
              case 6:
                return (c.fn.call(c.context, t, n, i, a, o), !0);
            }
            for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
            c.fn.apply(c.context, u);
          } else {
            var f = c.length,
              p;
            for (d = 0; d < f; d++)
              switch ((c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l)) {
                case 1:
                  c[d].fn.call(c[d].context);
                  break;
                case 2:
                  c[d].fn.call(c[d].context, t);
                  break;
                case 3:
                  c[d].fn.call(c[d].context, t, n);
                  break;
                case 4:
                  c[d].fn.call(c[d].context, t, n, i);
                  break;
                default:
                  if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
                  c[d].fn.apply(c[d].context, u);
              }
          }
          return !0;
        }),
        (c.prototype.on = function (e, t, n) {
          return o(this, e, t, n, !1);
        }),
        (c.prototype.once = function (e, t, n) {
          return o(this, e, t, n, !0);
        }),
        (c.prototype.removeListener = function (e, t, n, i) {
          var a = r ? r + e : e;
          if (!this._events[a]) return this;
          if (!t) return (s(this, a), this);
          var o = this._events[a];
          if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
          else {
            for (var c = 0, l = [], u = o.length; c < u; c++)
              (o[c].fn !== t || (i && !o[c].once) || (n && o[c].context !== n)) && l.push(o[c]);
            l.length ? (this._events[a] = l.length === 1 ? l[0] : l) : s(this, a);
          }
          return this;
        }),
        (c.prototype.removeAllListeners = function (e) {
          var t;
          return (
            e
              ? ((t = r ? r + e : e), this._events[t] && s(this, t))
              : ((this._events = new i()), (this._eventsCount = 0)),
            this
          );
        }),
        (c.prototype.off = c.prototype.removeListener),
        (c.prototype.addListener = c.prototype.on),
        (c.prefixed = r),
        (c.EventEmitter = c),
        t !== void 0 && (t.exports = c));
    })()
  ).default)(),
  YD = `recharts.syncMouseEvents`;
function XD(e) {
  '@babel/helpers - typeof';
  return (
    (XD =
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
    XD(e)
  );
}
function ZD(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function QD(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, tO(r.key), r));
  }
}
function $D(e, t, n) {
  return (
    t && QD(e.prototype, t),
    n && QD(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function eO(e, t, n) {
  return (
    (t = tO(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function tO(e) {
  var t = nO(e, `string`);
  return XD(t) == `symbol` ? t : String(t);
}
function nO(e, t) {
  if (XD(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (XD(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var rO = (function () {
  function e() {
    (ZD(this, e),
      eO(this, `activeIndex`, 0),
      eO(this, `coordinateList`, []),
      eO(this, `layout`, `horizontal`));
  }
  return (
    $D(e, [
      {
        key: `setDetails`,
        value: function (e) {
          var t = e.coordinateList,
            n = t === void 0 ? null : t,
            r = e.container,
            i = r === void 0 ? null : r,
            a = e.layout,
            o = a === void 0 ? null : a,
            s = e.offset,
            c = s === void 0 ? null : s,
            l = e.mouseHandlerCallback,
            u = l === void 0 ? null : l;
          ((this.coordinateList = n ?? this.coordinateList ?? []),
            (this.container = i ?? this.container),
            (this.layout = o ?? this.layout),
            (this.offset = c ?? this.offset),
            (this.mouseHandlerCallback = u ?? this.mouseHandlerCallback),
            (this.activeIndex = Math.min(
              Math.max(this.activeIndex, 0),
              this.coordinateList.length - 1
            )));
        },
      },
      {
        key: `focus`,
        value: function () {
          this.spoofMouse();
        },
      },
      {
        key: `keyboardEvent`,
        value: function (e) {
          if (this.coordinateList.length !== 0)
            switch (e.key) {
              case `ArrowRight`:
                if (this.layout !== `horizontal`) return;
                ((this.activeIndex = Math.min(
                  this.activeIndex + 1,
                  this.coordinateList.length - 1
                )),
                  this.spoofMouse());
                break;
              case `ArrowLeft`:
                if (this.layout !== `horizontal`) return;
                ((this.activeIndex = Math.max(this.activeIndex - 1, 0)), this.spoofMouse());
                break;
              default:
                break;
            }
        },
      },
      {
        key: `setIndex`,
        value: function (e) {
          this.activeIndex = e;
        },
      },
      {
        key: `spoofMouse`,
        value: function () {
          if (this.layout === `horizontal` && this.coordinateList.length !== 0) {
            var e = this.container.getBoundingClientRect(),
              t = e.x,
              n = e.y,
              r = e.height,
              i = this.coordinateList[this.activeIndex].coordinate,
              a = window?.scrollX || 0,
              o = window?.scrollY || 0,
              s = t + i + a,
              c = n + this.offset.top + r / 2 + o;
            this.mouseHandlerCallback({ pageX: s, pageY: c });
          }
        },
      },
    ]),
    e
  );
})();
function iO(e, t, n) {
  if (n === `number` && t === !0 && Array.isArray(e)) {
    var r = e?.[0],
      i = e?.[1];
    if (r && i && V(r) && V(i)) return !0;
  }
  return !1;
}
function aO(e, t, n, r) {
  var i = r / 2;
  return {
    stroke: `none`,
    fill: `#ccc`,
    x: e === `horizontal` ? t.x - i : n.left + 0.5,
    y: e === `horizontal` ? n.top + 0.5 : t.y - i,
    width: e === `horizontal` ? r : n.width - 1,
    height: e === `horizontal` ? n.height - 1 : r,
  };
}
function oO(e) {
  var t = e.cx,
    n = e.cy,
    r = e.radius,
    i = e.startAngle,
    a = e.endAngle;
  return {
    points: [Ig(t, n, r, i), Ig(t, n, r, a)],
    cx: t,
    cy: n,
    radius: r,
    startAngle: i,
    endAngle: a,
  };
}
function sO(e, t, n) {
  var r, i, a, o;
  if (e === `horizontal`) ((r = t.x), (a = r), (i = n.top), (o = n.top + n.height));
  else if (e === `vertical`) ((i = t.y), (o = i), (r = n.left), (a = n.left + n.width));
  else if (t.cx != null && t.cy != null)
    if (e === `centric`) {
      var s = t.cx,
        c = t.cy,
        l = t.innerRadius,
        u = t.outerRadius,
        d = t.angle,
        f = Ig(s, c, l, d),
        p = Ig(s, c, u, d);
      ((r = f.x), (i = f.y), (a = p.x), (o = p.y));
    } else return oO(t);
  return [
    { x: r, y: i },
    { x: a, y: o },
  ];
}
function cO(e) {
  '@babel/helpers - typeof';
  return (
    (cO =
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
    cO(e)
  );
}
function lO(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function uO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? lO(Object(n), !0).forEach(function (t) {
          dO(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : lO(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function dO(e, t, n) {
  return (
    (t = fO(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function fO(e) {
  var t = pO(e, `string`);
  return cO(t) == `symbol` ? t : String(t);
}
function pO(e, t) {
  if (cO(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (cO(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function mO(e) {
  var t = e.element,
    n = e.tooltipEventType,
    r = e.isActive,
    i = e.activeCoordinate,
    a = e.activePayload,
    o = e.offset,
    s = e.activeTooltipIndex,
    c = e.tooltipAxisBandSize,
    l = e.layout,
    u = e.chartName;
  if (!t || !t.props.cursor || !r || !i || (u !== `ScatterChart` && n !== `axis`)) return null;
  var d,
    f = cv;
  if (u === `ScatterChart`) ((d = i), (f = jx));
  else if (u === `BarChart`) ((d = aO(l, i, o, c)), (f = nx));
  else if (l === `radial`) {
    var p = oO(i),
      m = p.cx,
      h = p.cy,
      g = p.radius;
    ((d = {
      cx: m,
      cy: h,
      startAngle: p.startAngle,
      endAngle: p.endAngle,
      innerRadius: g,
      outerRadius: g,
    }),
      (f = J_));
  } else ((d = { points: sO(l, i, o) }), (f = cv));
  var _ = uO(
    uO(uO(uO({ stroke: `#ccc`, pointerEvents: `none` }, o), d), W(t.props.cursor, !1)),
    {},
    {
      payload: a,
      payloadIndex: s,
      className: F(`recharts-tooltip-cursor`, t.props.cursor.className),
    }
  );
  return (0, z.isValidElement)(t.props.cursor)
    ? (0, z.cloneElement)(t.props.cursor, _)
    : (0, z.createElement)(f, _);
}
var hO = [`item`],
  gO = [`children`, `className`, `width`, `height`, `style`, `compact`, `title`, `desc`];
function _O(e) {
  '@babel/helpers - typeof';
  return (
    (_O =
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
    _O(e)
  );
}
function vO() {
  return (
    (vO = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    vO.apply(this, arguments)
  );
}
function yO(e, t) {
  return SO(e) || xO(e, t) || IO(e, t) || bO();
}
function bO() {
  throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xO(e, t) {
  var n = e == null ? null : (typeof Symbol < `u` && e[Symbol.iterator]) || e[`@@iterator`];
  if (n != null) {
    var r,
      i,
      a,
      o,
      s = [],
      c = !0,
      l = !1;
    try {
      if (((a = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
    } catch (e) {
      ((l = !0), (i = e));
    } finally {
      try {
        if (!c && n.return != null && ((o = n.return()), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function SO(e) {
  if (Array.isArray(e)) return e;
}
function CO(e, t) {
  if (e == null) return {};
  var n = wO(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function wO(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function TO(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function EO(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, VO(r.key), r));
  }
}
function DO(e, t, n) {
  return (
    t && EO(e.prototype, t),
    n && EO(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function OO(e, t, n) {
  return (
    (t = jO(t)),
    kO(e, AO() ? Reflect.construct(t, n || [], jO(e).constructor) : t.apply(e, n))
  );
}
function kO(e, t) {
  if (t && (_O(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return X(e);
}
function AO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (AO = function () {
    return !!e;
  })();
}
function jO(e) {
  return (
    (jO = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    jO(e)
  );
}
function X(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function MO(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && NO(e, t));
}
function NO(e, t) {
  return (
    (NO = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    NO(e, t)
  );
}
function PO(e) {
  return RO(e) || LO(e) || IO(e) || FO();
}
function FO() {
  throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function IO(e, t) {
  if (e) {
    if (typeof e == `string`) return zO(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === `Object` && e.constructor && (n = e.constructor.name), n === `Map` || n === `Set`))
      return Array.from(e);
    if (n === `Arguments` || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return zO(e, t);
  }
}
function LO(e) {
  if ((typeof Symbol < `u` && e[Symbol.iterator] != null) || e[`@@iterator`] != null)
    return Array.from(e);
}
function RO(e) {
  if (Array.isArray(e)) return zO(e);
}
function zO(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function BO(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Z(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? BO(Object(n), !0).forEach(function (t) {
          Q(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : BO(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Q(e, t, n) {
  return (
    (t = VO(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function VO(e) {
  var t = HO(e, `string`);
  return _O(t) == `symbol` ? t : String(t);
}
function HO(e, t) {
  if (_O(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (_O(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var UO = { xAxis: [`bottom`, `top`], yAxis: [`left`, `right`] },
  WO = { width: `100%`, height: `100%` },
  GO = { x: 0, y: 0 };
function KO(e) {
  return e;
}
var qO = function (e, t) {
    return t === `horizontal` ? e.x : t === `vertical` ? e.y : t === `centric` ? e.angle : e.radius;
  },
  JO = function (e, t, n, r) {
    var i = t.find(function (e) {
      return e && e.index === n;
    });
    if (i) {
      if (e === `horizontal`) return { x: i.coordinate, y: r.y };
      if (e === `vertical`) return { x: r.x, y: i.coordinate };
      if (e === `centric`) {
        var a = i.coordinate,
          o = r.radius;
        return Z(Z(Z({}, r), Ig(r.cx, r.cy, o, a)), {}, { angle: a, radius: o });
      }
      var s = i.coordinate,
        c = r.angle;
      return Z(Z(Z({}, r), Ig(r.cx, r.cy, s, c)), {}, { angle: c, radius: s });
    }
    return GO;
  },
  YO = function (e, t) {
    var n = t.graphicalItems,
      r = t.dataStartIndex,
      i = t.dataEndIndex,
      a = (n ?? []).reduce(function (e, t) {
        var n = t.props.data;
        return n && n.length ? [].concat(PO(e), PO(n)) : e;
      }, []);
    return a.length > 0 ? a : e && e.length && V(r) && V(i) ? e.slice(r, i + 1) : [];
  };
function XO(e) {
  return e === `number` ? [0, `auto`] : void 0;
}
var ZO = function (e, t, n, r) {
    var i = e.graphicalItems,
      a = e.tooltipAxis,
      o = YO(t, e);
    return n < 0 || !i || !i.length || n >= o.length
      ? null
      : i.reduce(function (i, s) {
          var c = s.props.data ?? t;
          c &&
            e.dataStartIndex + e.dataEndIndex !== 0 &&
            (c = c.slice(e.dataStartIndex, e.dataEndIndex + 1));
          var l =
            a.dataKey && !a.allowDuplicatedCategory
              ? vo(c === void 0 ? o : c, a.dataKey, r)
              : (c && c[n]) || o[n];
          return l ? [].concat(PO(i), [Dg(s, l)]) : i;
        }, []);
  },
  QO = function (e, t, n, r) {
    var i = r || { x: e.chartX, y: e.chartY },
      a = qO(i, n),
      o = e.orderedTooltipTicks,
      s = e.tooltipAxis,
      c = e.tooltipTicks,
      l = qh(a, o, c, s);
    if (l >= 0 && c) {
      var u = c[l] && c[l].value;
      return {
        activeTooltipIndex: l,
        activeLabel: u,
        activePayload: ZO(e, t, l, u),
        activeCoordinate: JO(n, o, l, i),
      };
    }
    return null;
  },
  $O = function (e, t) {
    var n = t.axes,
      r = t.graphicalItems,
      i = t.axisType,
      a = t.axisIdKey,
      o = t.stackGroups,
      s = t.dataStartIndex,
      c = t.dataEndIndex,
      l = e.layout,
      u = e.children,
      d = e.stackOffset,
      f = ng(l, i);
    return n.reduce(function (t, n) {
      var p = n.props,
        m = p.type,
        h = p.dataKey,
        g = p.allowDataOverflow,
        _ = p.allowDuplicatedCategory,
        v = p.scale,
        y = p.ticks,
        b = p.includeHidden,
        x = n.props[a];
      if (t[x]) return t;
      var S = YO(e.data, {
          graphicalItems: r.filter(function (e) {
            return e.props[a] === x;
          }),
          dataStartIndex: s,
          dataEndIndex: c,
        }),
        C = S.length,
        w,
        T,
        E;
      iO(n.props.domain, g, m) &&
        ((w = wg(n.props.domain, null, g)),
        f && (m === `number` || v !== `auto`) && (E = Kh(S, h, `category`)));
      var D = XO(m);
      if (!w || w.length === 0) {
        var O = n.props.domain ?? D;
        if (h) {
          if (((w = Kh(S, h, m)), m === `category` && f)) {
            var k = go(w);
            _ && k
              ? ((T = w), (w = (0, FS.default)(0, C)))
              : _ ||
                (w = Eg(O, w, n).reduce(function (e, t) {
                  return e.indexOf(t) >= 0 ? e : [].concat(PO(e), [t]);
                }, []));
          } else if (m === `category`)
            w = _
              ? w.filter(function (e) {
                  return e !== `` && !(0, H.default)(e);
                })
              : Eg(O, w, n).reduce(function (e, t) {
                  return e.indexOf(t) >= 0 || t === `` || (0, H.default)(t)
                    ? e
                    : [].concat(PO(e), [t]);
                }, []);
          else if (m === `number`) {
            var A = eg(
              S,
              r.filter(function (e) {
                return e.props[a] === x && (b || !e.props.hide);
              }),
              h,
              i,
              l
            );
            A && (w = A);
          }
          f && (m === `number` || v !== `auto`) && (E = Kh(S, h, `category`));
        } else
          w = f
            ? (0, FS.default)(0, C)
            : o && o[x] && o[x].hasStack && m === `number`
              ? d === `expand`
                ? [0, 1]
                : xg(o[x].stackGroups, s, c)
              : tg(
                  S,
                  r.filter(function (e) {
                    return e.props[a] === x && (b || !e.props.hide);
                  }),
                  m,
                  l,
                  !0
                );
        if (m === `number`) ((w = qD(u, w, x, i, y)), O && (w = wg(O, w, g)));
        else if (m === `category` && O) {
          var j = O;
          w.every(function (e) {
            return j.indexOf(e) >= 0;
          }) && (w = j);
        }
      }
      return Z(
        Z({}, t),
        {},
        Q(
          {},
          x,
          Z(
            Z({}, n.props),
            {},
            {
              axisType: i,
              domain: w,
              categoricalDomain: E,
              duplicateDomain: T,
              originalDomain: n.props.domain ?? D,
              isCategorical: f,
              layout: l,
            }
          )
        )
      );
    }, {});
  },
  ek = function (e, t) {
    var n = t.graphicalItems,
      r = t.Axis,
      i = t.axisType,
      a = t.axisIdKey,
      o = t.stackGroups,
      s = t.dataStartIndex,
      c = t.dataEndIndex,
      l = e.layout,
      u = e.children,
      d = YO(e.data, { graphicalItems: n, dataStartIndex: s, dataEndIndex: c }),
      f = d.length,
      p = ng(l, i),
      m = -1;
    return n.reduce(function (e, t) {
      var h = t.props[a],
        g = XO(`number`);
      if (!e[h]) {
        m++;
        var _;
        return (
          p
            ? (_ = (0, FS.default)(0, f))
            : o && o[h] && o[h].hasStack
              ? ((_ = xg(o[h].stackGroups, s, c)), (_ = qD(u, _, h, i)))
              : ((_ = wg(
                  g,
                  tg(
                    d,
                    n.filter(function (e) {
                      return e.props[a] === h && !e.props.hide;
                    }),
                    `number`,
                    l
                  ),
                  r.defaultProps.allowDataOverflow
                )),
                (_ = qD(u, _, h, i))),
          Z(
            Z({}, e),
            {},
            Q(
              {},
              h,
              Z(
                Z({ axisType: i }, r.defaultProps),
                {},
                {
                  hide: !0,
                  orientation: (0, oo.default)(UO, `${i}.${m % 2}`, null),
                  domain: _,
                  originalDomain: g,
                  isCategorical: p,
                  layout: l,
                }
              )
            )
          )
        );
      }
      return e;
    }, {});
  },
  tk = function (e, t) {
    var n = t.axisType,
      r = n === void 0 ? `xAxis` : n,
      i = t.AxisComp,
      a = t.graphicalItems,
      o = t.stackGroups,
      s = t.dataStartIndex,
      c = t.dataEndIndex,
      l = e.children,
      u = `${r}Id`,
      d = Ho(l, i),
      f = {};
    return (
      d && d.length
        ? (f = $O(e, {
            axes: d,
            graphicalItems: a,
            axisType: r,
            axisIdKey: u,
            stackGroups: o,
            dataStartIndex: s,
            dataEndIndex: c,
          }))
        : a &&
          a.length &&
          (f = ek(e, {
            Axis: i,
            graphicalItems: a,
            axisType: r,
            axisIdKey: u,
            stackGroups: o,
            dataStartIndex: s,
            dataEndIndex: c,
          })),
      f
    );
  },
  nk = function (e) {
    var t = ho(e),
      n = ig(t, !1, !0);
    return {
      tooltipTicks: n,
      orderedTooltipTicks: (0, Pd.default)(n, function (e) {
        return e.coordinate;
      }),
      tooltipAxis: t,
      tooltipAxisBandSize: Tg(t, n),
    };
  },
  rk = function (e) {
    var t = e.children,
      n = e.defaultShowTooltip,
      r = Uo(t, tC),
      i = 0,
      a = 0;
    return (
      e.data && e.data.length !== 0 && (a = e.data.length - 1),
      r &&
        r.props &&
        (r.props.startIndex >= 0 && (i = r.props.startIndex),
        r.props.endIndex >= 0 && (a = r.props.endIndex)),
      {
        chartX: 0,
        chartY: 0,
        dataStartIndex: i,
        dataEndIndex: a,
        activeTooltipIndex: -1,
        isTooltipActive: !!n,
      }
    );
  },
  ik = function (e) {
    return !e || !e.length
      ? !1
      : e.some(function (e) {
          var t = Ro(e && e.type);
          return t && t.indexOf(`Bar`) >= 0;
        });
  },
  ak = function (e) {
    return e === `horizontal`
      ? { numericAxisName: `yAxis`, cateAxisName: `xAxis` }
      : e === `vertical`
        ? { numericAxisName: `xAxis`, cateAxisName: `yAxis` }
        : e === `centric`
          ? { numericAxisName: `radiusAxis`, cateAxisName: `angleAxis` }
          : { numericAxisName: `angleAxis`, cateAxisName: `radiusAxis` };
  },
  ok = function (e, t) {
    var n = e.props,
      r = e.graphicalItems,
      i = e.xAxisMap,
      a = i === void 0 ? {} : i,
      o = e.yAxisMap,
      s = o === void 0 ? {} : o,
      c = n.width,
      l = n.height,
      u = n.children,
      d = n.margin || {},
      f = Uo(u, tC),
      p = Uo(u, fd),
      m = Object.keys(s).reduce(
        function (e, t) {
          var n = s[t],
            r = n.orientation;
          return !n.mirror && !n.hide ? Z(Z({}, e), {}, Q({}, r, e[r] + n.width)) : e;
        },
        { left: d.left || 0, right: d.right || 0 }
      ),
      h = Z(
        Z(
          {},
          Object.keys(a).reduce(
            function (e, t) {
              var n = a[t],
                r = n.orientation;
              return !n.mirror && !n.hide
                ? Z(Z({}, e), {}, Q({}, r, (0, oo.default)(e, `${r}`) + n.height))
                : e;
            },
            { top: d.top || 0, bottom: d.bottom || 0 }
          )
        ),
        m
      ),
      g = h.bottom;
    (f && (h.bottom += f.props.height || tC.defaultProps.height), p && t && (h = Zh(h, r, n, t)));
    var _ = c - h.left - h.right,
      v = l - h.top - h.bottom;
    return Z(Z({ brushBottom: g }, h), {}, { width: Math.max(_, 0), height: Math.max(v, 0) });
  },
  sk = function (e, t) {
    if (t === `xAxis`) return e[t].width;
    if (t === `yAxis`) return e[t].height;
  },
  ck = function (e) {
    var t,
      n = e.chartName,
      r = e.GraphicalChild,
      i = e.defaultTooltipEventType,
      a = i === void 0 ? `axis` : i,
      o = e.validateTooltipEventTypes,
      s = o === void 0 ? [`axis`] : o,
      c = e.axisComponents,
      l = e.legendContent,
      u = e.formatAxisMap,
      d = e.defaultProps,
      f = function (e, t) {
        var n = t.graphicalItems,
          r = t.stackGroups,
          i = t.offset,
          a = t.updateId,
          o = t.dataStartIndex,
          s = t.dataEndIndex,
          l = e.barSize,
          u = e.layout,
          d = e.barGap,
          f = e.barCategoryGap,
          p = e.maxBarSize,
          m = ak(u),
          h = m.numericAxisName,
          g = m.cateAxisName,
          _ = ik(n),
          v = [];
        return (
          n.forEach(function (n, m) {
            var y = YO(e.data, { graphicalItems: [n], dataStartIndex: o, dataEndIndex: s }),
              b = n.props,
              x = b.dataKey,
              S = b.maxBarSize,
              C = n.props[`${h}Id`],
              w = n.props[`${g}Id`],
              T = c.reduce(function (e, r) {
                var i = t[`${r.axisType}Map`],
                  a = n.props[`${r.axisType}Id`];
                !((i && i[a]) || r.axisType === `zAxis`) && dh(!1);
                var o = i[a];
                return Z(Z({}, e), {}, Q(Q({}, r.axisType, o), `${r.axisType}Ticks`, ig(o)));
              }, {}),
              E = T[g],
              D = T[`${g}Ticks`],
              O = r && r[C] && r[C].hasStack && yg(n, r[C].stackGroups),
              k = Ro(n.type).indexOf(`Bar`) >= 0,
              A = Tg(E, D),
              j = [],
              M = _ && Yh({ barSize: l, stackGroups: r, totalSize: sk(T, g) });
            if (k) {
              var N = (0, H.default)(S) ? p : S,
                P = Tg(E, D, !0) ?? N ?? 0;
              ((j = Xh({
                barGap: d,
                barCategoryGap: f,
                bandSize: P === A ? A : P,
                sizeList: M[w],
                maxBarSize: N,
              })),
                P !== A &&
                  (j = j.map(function (e) {
                    return Z(
                      Z({}, e),
                      {},
                      { position: Z(Z({}, e.position), {}, { offset: e.position.offset - P / 2 }) }
                    );
                  })));
            }
            var ee = n && n.type && n.type.getComposedData;
            ee &&
              v.push({
                props: Z(
                  Z(
                    {},
                    ee(
                      Z(
                        Z({}, T),
                        {},
                        {
                          displayedData: y,
                          props: e,
                          dataKey: x,
                          item: n,
                          bandSize: A,
                          barPosition: j,
                          offset: i,
                          stackedData: O,
                          layout: u,
                          dataStartIndex: o,
                          dataEndIndex: s,
                        }
                      )
                    )
                  ),
                  {},
                  Q(Q(Q({ key: n.key || `item-${m}` }, h, T[h]), g, T[g]), `animationId`, a)
                ),
                childIndex: es(n, e.children),
                item: n,
              });
          }),
          v
        );
      },
      p = function (e, t) {
        var i = e.props,
          a = e.dataStartIndex,
          o = e.dataEndIndex,
          s = e.updateId;
        if (!Wo({ props: i })) return null;
        var l = i.children,
          d = i.layout,
          p = i.stackOffset,
          m = i.data,
          h = i.reverseStackOrder,
          g = ak(d),
          _ = g.numericAxisName,
          v = g.cateAxisName,
          y = Ho(l, r),
          b = mg(m, y, `${_}Id`, `${v}Id`, p, h),
          x = c.reduce(function (e, t) {
            var n = `${t.axisType}Map`;
            return Z(
              Z({}, e),
              {},
              Q(
                {},
                n,
                tk(
                  i,
                  Z(
                    Z({}, t),
                    {},
                    {
                      graphicalItems: y,
                      stackGroups: t.axisType === _ && b,
                      dataStartIndex: a,
                      dataEndIndex: o,
                    }
                  )
                )
              )
            );
          }, {}),
          S = ok(Z(Z({}, x), {}, { props: i, graphicalItems: y }), t?.legendBBox);
        Object.keys(x).forEach(function (e) {
          x[e] = u(i, x[e], S, e.replace(`Map`, ``), n);
        });
        var C = x[`${v}Map`],
          w = nk(C);
        return Z(
          Z(
            {
              formattedGraphicalItems: f(
                i,
                Z(
                  Z({}, x),
                  {},
                  {
                    dataStartIndex: a,
                    dataEndIndex: o,
                    updateId: s,
                    graphicalItems: y,
                    stackGroups: b,
                    offset: S,
                  }
                )
              ),
              graphicalItems: y,
              offset: S,
              stackGroups: b,
            },
            w
          ),
          x
        );
      };
    return (
      (t = (function (e) {
        MO(t, e);
        function t(e) {
          var r;
          return (
            TO(this, t),
            (r = OO(this, t, [e])),
            Q(X(r), `eventEmitterSymbol`, Symbol(`rechartsEventEmitter`)),
            Q(X(r), `accessibilityManager`, new rO()),
            Q(X(r), `handleLegendBBoxUpdate`, function (e) {
              if (e) {
                var t = r.state,
                  n = t.dataStartIndex,
                  i = t.dataEndIndex,
                  a = t.updateId;
                r.setState(
                  Z(
                    { legendBBox: e },
                    p(
                      { props: r.props, dataStartIndex: n, dataEndIndex: i, updateId: a },
                      Z(Z({}, r.state), {}, { legendBBox: e })
                    )
                  )
                );
              }
            }),
            Q(X(r), `handleReceiveSyncEvent`, function (e, t, n) {
              if (r.props.syncId === e) {
                if (n === r.eventEmitterSymbol && typeof r.props.syncMethod != `function`) return;
                r.applySyncEvent(t);
              }
            }),
            Q(X(r), `handleBrushChange`, function (e) {
              var t = e.startIndex,
                n = e.endIndex;
              if (t !== r.state.dataStartIndex || n !== r.state.dataEndIndex) {
                var i = r.state.updateId;
                (r.setState(function () {
                  return Z(
                    { dataStartIndex: t, dataEndIndex: n },
                    p({ props: r.props, dataStartIndex: t, dataEndIndex: n, updateId: i }, r.state)
                  );
                }),
                  r.triggerSyncEvent({ dataStartIndex: t, dataEndIndex: n }));
              }
            }),
            Q(X(r), `handleMouseEnter`, function (e) {
              var t = r.getMouseInfo(e);
              if (t) {
                var n = Z(Z({}, t), {}, { isTooltipActive: !0 });
                (r.setState(n), r.triggerSyncEvent(n));
                var i = r.props.onMouseEnter;
                (0, U.default)(i) && i(n, e);
              }
            }),
            Q(X(r), `triggeredAfterMouseMove`, function (e) {
              var t = r.getMouseInfo(e),
                n = t ? Z(Z({}, t), {}, { isTooltipActive: !0 }) : { isTooltipActive: !1 };
              (r.setState(n), r.triggerSyncEvent(n));
              var i = r.props.onMouseMove;
              (0, U.default)(i) && i(n, e);
            }),
            Q(X(r), `handleItemMouseEnter`, function (e) {
              r.setState(function () {
                return {
                  isTooltipActive: !0,
                  activeItem: e,
                  activePayload: e.tooltipPayload,
                  activeCoordinate: e.tooltipPosition || { x: e.cx, y: e.cy },
                };
              });
            }),
            Q(X(r), `handleItemMouseLeave`, function () {
              r.setState(function () {
                return { isTooltipActive: !1 };
              });
            }),
            Q(X(r), `handleMouseMove`, function (e) {
              (e.persist(), r.throttleTriggeredAfterMouseMove(e));
            }),
            Q(X(r), `handleMouseLeave`, function (e) {
              r.throttleTriggeredAfterMouseMove.cancel();
              var t = { isTooltipActive: !1 };
              (r.setState(t), r.triggerSyncEvent(t));
              var n = r.props.onMouseLeave;
              (0, U.default)(n) && n(t, e);
            }),
            Q(X(r), `handleOuterEvent`, function (e) {
              var t = $o(e),
                n = (0, oo.default)(r.props, `${t}`);
              t &&
                (0, U.default)(n) &&
                n(
                  (/.*touch.*/i.test(t)
                    ? r.getMouseInfo(e.changedTouches[0])
                    : r.getMouseInfo(e)) ?? {},
                  e
                );
            }),
            Q(X(r), `handleClick`, function (e) {
              var t = r.getMouseInfo(e);
              if (t) {
                var n = Z(Z({}, t), {}, { isTooltipActive: !0 });
                (r.setState(n), r.triggerSyncEvent(n));
                var i = r.props.onClick;
                (0, U.default)(i) && i(n, e);
              }
            }),
            Q(X(r), `handleMouseDown`, function (e) {
              var t = r.props.onMouseDown;
              (0, U.default)(t) && t(r.getMouseInfo(e), e);
            }),
            Q(X(r), `handleMouseUp`, function (e) {
              var t = r.props.onMouseUp;
              (0, U.default)(t) && t(r.getMouseInfo(e), e);
            }),
            Q(X(r), `handleTouchMove`, function (e) {
              e.changedTouches != null &&
                e.changedTouches.length > 0 &&
                r.throttleTriggeredAfterMouseMove(e.changedTouches[0]);
            }),
            Q(X(r), `handleTouchStart`, function (e) {
              e.changedTouches != null &&
                e.changedTouches.length > 0 &&
                r.handleMouseDown(e.changedTouches[0]);
            }),
            Q(X(r), `handleTouchEnd`, function (e) {
              e.changedTouches != null &&
                e.changedTouches.length > 0 &&
                r.handleMouseUp(e.changedTouches[0]);
            }),
            Q(X(r), `triggerSyncEvent`, function (e) {
              r.props.syncId !== void 0 && JD.emit(YD, r.props.syncId, e, r.eventEmitterSymbol);
            }),
            Q(X(r), `applySyncEvent`, function (e) {
              var t = r.props,
                n = t.layout,
                i = t.syncMethod,
                a = r.state.updateId,
                o = e.dataStartIndex,
                s = e.dataEndIndex;
              if (e.dataStartIndex !== void 0 || e.dataEndIndex !== void 0)
                r.setState(
                  Z(
                    { dataStartIndex: o, dataEndIndex: s },
                    p({ props: r.props, dataStartIndex: o, dataEndIndex: s, updateId: a }, r.state)
                  )
                );
              else if (e.activeTooltipIndex !== void 0) {
                var c = e.chartX,
                  l = e.chartY,
                  u = e.activeTooltipIndex,
                  d = r.state,
                  f = d.offset,
                  m = d.tooltipTicks;
                if (!f) return;
                if (typeof i == `function`) u = i(m, e);
                else if (i === `value`) {
                  u = -1;
                  for (var h = 0; h < m.length; h++)
                    if (m[h].value === e.activeLabel) {
                      u = h;
                      break;
                    }
                }
                var g = Z(Z({}, f), {}, { x: f.left, y: f.top }),
                  _ = Math.min(c, g.x + g.width),
                  v = Math.min(l, g.y + g.height),
                  y = m[u] && m[u].value,
                  b = ZO(r.state, r.props.data, u),
                  x = m[u]
                    ? {
                        x: n === `horizontal` ? m[u].coordinate : _,
                        y: n === `horizontal` ? v : m[u].coordinate,
                      }
                    : GO;
                r.setState(
                  Z(
                    Z({}, e),
                    {},
                    { activeLabel: y, activeCoordinate: x, activePayload: b, activeTooltipIndex: u }
                  )
                );
              } else r.setState(e);
            }),
            Q(X(r), `renderCursor`, function (e) {
              var t = r.state,
                i = t.isTooltipActive,
                a = t.activeCoordinate,
                o = t.activePayload,
                s = t.offset,
                c = t.activeTooltipIndex,
                l = t.tooltipAxisBandSize,
                u = r.getTooltipEventType(),
                d = e.props.active ?? i,
                f = r.props.layout,
                p = e.key || `_recharts-cursor`;
              return z.createElement(mO, {
                key: p,
                activeCoordinate: a,
                activePayload: o,
                activeTooltipIndex: c,
                chartName: n,
                element: e,
                isActive: d,
                layout: f,
                offset: s,
                tooltipAxisBandSize: l,
                tooltipEventType: u,
              });
            }),
            Q(X(r), `renderPolarAxis`, function (e, t, n) {
              var i = (0, oo.default)(e, `type.axisType`),
                a = (0, oo.default)(r.state, `${i}Map`),
                o = a && a[e.props[`${i}Id`]];
              return (0, z.cloneElement)(
                e,
                Z(
                  Z({}, o),
                  {},
                  { className: F(i, o.className), key: e.key || `${t}-${n}`, ticks: ig(o, !0) }
                )
              );
            }),
            Q(X(r), `renderPolarGrid`, function (e) {
              var t = e.props,
                n = t.radialLines,
                i = t.polarAngles,
                a = t.polarRadius,
                o = r.state,
                s = o.radiusAxisMap,
                c = o.angleAxisMap,
                l = ho(s),
                u = ho(c),
                d = u.cx,
                f = u.cy,
                p = u.innerRadius,
                m = u.outerRadius;
              return (0, z.cloneElement)(e, {
                polarAngles: Array.isArray(i)
                  ? i
                  : ig(u, !0).map(function (e) {
                      return e.coordinate;
                    }),
                polarRadius: Array.isArray(a)
                  ? a
                  : ig(l, !0).map(function (e) {
                      return e.coordinate;
                    }),
                cx: d,
                cy: f,
                innerRadius: p,
                outerRadius: m,
                key: e.key || `polar-grid`,
                radialLines: n,
              });
            }),
            Q(X(r), `renderLegend`, function () {
              var e = r.state.formattedGraphicalItems,
                t = r.props,
                n = t.children,
                i = t.width,
                a = t.height,
                o = r.props.margin || {},
                s = kh({
                  children: n,
                  formattedGraphicalItems: e,
                  legendWidth: i - (o.left || 0) - (o.right || 0),
                  legendContent: l,
                });
              if (!s) return null;
              var c = s.item;
              return (0, z.cloneElement)(
                c,
                Z(
                  Z({}, CO(s, hO)),
                  {},
                  {
                    chartWidth: i,
                    chartHeight: a,
                    margin: o,
                    onBBoxUpdate: r.handleLegendBBoxUpdate,
                  }
                )
              );
            }),
            Q(X(r), `renderTooltip`, function () {
              var e = r.props,
                t = e.children,
                n = e.accessibilityLayer,
                i = Uo(t, Wf);
              if (!i) return null;
              var a = r.state,
                o = a.isTooltipActive,
                s = a.activeCoordinate,
                c = a.activePayload,
                l = a.activeLabel,
                u = a.offset,
                d = i.props.active ?? o;
              return (0, z.cloneElement)(i, {
                viewBox: Z(Z({}, u), {}, { x: u.left, y: u.top }),
                active: d,
                label: l,
                payload: d ? c : [],
                coordinate: s,
                accessibilityLayer: n,
              });
            }),
            Q(X(r), `renderBrush`, function (e) {
              var t = r.props,
                n = t.margin,
                i = t.data,
                a = r.state,
                o = a.offset,
                s = a.dataStartIndex,
                c = a.dataEndIndex,
                l = a.updateId;
              return (0, z.cloneElement)(e, {
                key: e.key || `_recharts-brush`,
                onChange: og(r.handleBrushChange, e.props.onChange),
                data: i,
                x: V(e.props.x) ? e.props.x : o.left,
                y: V(e.props.y) ? e.props.y : o.top + o.height + o.brushBottom - (n.bottom || 0),
                width: V(e.props.width) ? e.props.width : o.width,
                startIndex: s,
                endIndex: c,
                updateId: `brush-${l}`,
              });
            }),
            Q(X(r), `renderReferenceElement`, function (e, t, n) {
              if (!e) return null;
              var i = X(r).clipPathId,
                a = r.state,
                o = a.xAxisMap,
                s = a.yAxisMap,
                c = a.offset,
                l = e.props,
                u = l.xAxisId,
                d = l.yAxisId;
              return (0, z.cloneElement)(e, {
                key: e.key || `${t}-${n}`,
                xAxis: o[u],
                yAxis: s[d],
                viewBox: { x: c.left, y: c.top, width: c.width, height: c.height },
                clipPathId: i,
              });
            }),
            Q(X(r), `renderActivePoints`, function (e) {
              var n = e.item,
                r = e.activePoint,
                i = e.basePoint,
                a = e.childIndex,
                o = e.isRange,
                s = [],
                c = n.props.key,
                l = n.item.props,
                u = l.activeDot,
                d = l.dataKey,
                f = Z(
                  Z(
                    {
                      index: a,
                      dataKey: d,
                      cx: r.x,
                      cy: r.y,
                      r: 4,
                      fill: Jh(n.item),
                      strokeWidth: 2,
                      stroke: `#fff`,
                      payload: r.payload,
                      value: r.value,
                      key: `${c}-activePoint-${a}`,
                    },
                    W(u, !1)
                  ),
                  Oo(u)
                );
              return (
                s.push(t.renderActiveDot(u, f)),
                i
                  ? s.push(
                      t.renderActiveDot(
                        u,
                        Z(Z({}, f), {}, { cx: i.x, cy: i.y, key: `${c}-basePoint-${a}` })
                      )
                    )
                  : o && s.push(null),
                s
              );
            }),
            Q(X(r), `renderGraphicChild`, function (e, t, n) {
              var i = r.filterFormatItem(e, t, n);
              if (!i) return null;
              var a = r.getTooltipEventType(),
                o = r.state,
                s = o.isTooltipActive,
                c = o.tooltipAxis,
                l = o.activeTooltipIndex,
                u = o.activeLabel,
                d = r.props.children,
                f = Uo(d, Wf),
                p = i.props,
                m = p.points,
                h = p.isRange,
                g = p.baseLine,
                _ = i.item.props,
                v = _.activeDot,
                y = _.hide,
                b = _.activeBar,
                x = _.activeShape,
                S = !!(!y && s && f && (v || b || x)),
                C = {};
              a !== `axis` && f && f.props.trigger === `click`
                ? (C = { onClick: og(r.handleItemMouseEnter, e.props.onClick) })
                : a !== `axis` &&
                  (C = {
                    onMouseLeave: og(r.handleItemMouseLeave, e.props.onMouseLeave),
                    onMouseEnter: og(r.handleItemMouseEnter, e.props.onMouseEnter),
                  });
              var w = (0, z.cloneElement)(e, Z(Z({}, i.props), C));
              function T(e) {
                return typeof c.dataKey == `function` ? c.dataKey(e.payload) : null;
              }
              if (S)
                if (l >= 0) {
                  var E, D;
                  if (c.dataKey && !c.allowDuplicatedCategory) {
                    var O = typeof c.dataKey == `function` ? T : `payload.${c.dataKey.toString()}`;
                    ((E = vo(m, O, u)), (D = h && g && vo(g, O, u)));
                  } else ((E = m?.[l]), (D = h && g && g[l]));
                  if (x || b) {
                    var k = e.props.activeIndex === void 0 ? l : e.props.activeIndex;
                    return [
                      (0, z.cloneElement)(e, Z(Z(Z({}, i.props), C), {}, { activeIndex: k })),
                      null,
                      null,
                    ];
                  }
                  if (!(0, H.default)(E))
                    return [w].concat(
                      PO(
                        r.renderActivePoints({
                          item: i,
                          activePoint: E,
                          basePoint: D,
                          childIndex: l,
                          isRange: h,
                        })
                      )
                    );
                } else {
                  var A = (r.getItemByXY(r.state.activeCoordinate) ?? { graphicalItem: w })
                      .graphicalItem,
                    j = A.item,
                    M = j === void 0 ? e : j,
                    N = A.childIndex;
                  return [
                    (0, z.cloneElement)(M, Z(Z(Z({}, i.props), C), {}, { activeIndex: N })),
                    null,
                    null,
                  ];
                }
              return h ? [w, null, null] : [w, null];
            }),
            Q(X(r), `renderCustomized`, function (e, t, n) {
              return (0, z.cloneElement)(
                e,
                Z(Z({ key: `recharts-customized-${n}` }, r.props), r.state)
              );
            }),
            Q(X(r), `renderMap`, {
              CartesianGrid: { handler: KO, once: !0 },
              ReferenceArea: { handler: r.renderReferenceElement },
              ReferenceLine: { handler: KO },
              ReferenceDot: { handler: r.renderReferenceElement },
              XAxis: { handler: KO },
              YAxis: { handler: KO },
              Brush: { handler: r.renderBrush, once: !0 },
              Bar: { handler: r.renderGraphicChild },
              Line: { handler: r.renderGraphicChild },
              Area: { handler: r.renderGraphicChild },
              Radar: { handler: r.renderGraphicChild },
              RadialBar: { handler: r.renderGraphicChild },
              Scatter: { handler: r.renderGraphicChild },
              Pie: { handler: r.renderGraphicChild },
              Funnel: { handler: r.renderGraphicChild },
              Tooltip: { handler: r.renderCursor, once: !0 },
              PolarGrid: { handler: r.renderPolarGrid, once: !0 },
              PolarAngleAxis: { handler: r.renderPolarAxis },
              PolarRadiusAxis: { handler: r.renderPolarAxis },
              Customized: { handler: r.renderCustomized },
            }),
            (r.clipPathId = `${e.id ?? po(`recharts`)}-clip`),
            (r.throttleTriggeredAfterMouseMove = (0, Xf.default)(
              r.triggeredAfterMouseMove,
              e.throttleDelay ?? 1e3 / 60
            )),
            (r.state = {}),
            r
          );
        }
        return (
          DO(t, [
            {
              key: `componentDidMount`,
              value: function () {
                (this.addListener(),
                  this.accessibilityManager.setDetails({
                    container: this.container,
                    offset: { left: this.props.margin.left ?? 0, top: this.props.margin.top ?? 0 },
                    coordinateList: this.state.tooltipTicks,
                    mouseHandlerCallback: this.triggeredAfterMouseMove,
                    layout: this.props.layout,
                  }),
                  this.displayDefaultTooltip());
              },
            },
            {
              key: `displayDefaultTooltip`,
              value: function () {
                var e = this.props,
                  t = e.children,
                  n = e.data,
                  r = e.height,
                  i = e.layout,
                  a = Uo(t, Wf);
                if (a) {
                  var o = a.props.defaultIndex;
                  if (!(typeof o != `number` || o < 0 || o > this.state.tooltipTicks.length)) {
                    var s = this.state.tooltipTicks[o] && this.state.tooltipTicks[o].value,
                      c = ZO(this.state, n, o, s),
                      l = this.state.tooltipTicks[o].coordinate,
                      u = (this.state.offset.top + r) / 2,
                      d = i === `horizontal` ? { x: l, y: u } : { y: l, x: u },
                      f = this.state.formattedGraphicalItems.find(function (e) {
                        return e.item.type.name === `Scatter`;
                      });
                    f &&
                      ((d = Z(Z({}, d), f.props.points[o].tooltipPosition)),
                      (c = f.props.points[o].tooltipPayload));
                    var p = {
                      activeTooltipIndex: o,
                      isTooltipActive: !0,
                      activeLabel: s,
                      activePayload: c,
                      activeCoordinate: d,
                    };
                    (this.setState(p), this.renderCursor(a), this.accessibilityManager.setIndex(o));
                  }
                }
              },
            },
            {
              key: `getSnapshotBeforeUpdate`,
              value: function (e, t) {
                return this.props.accessibilityLayer
                  ? (this.state.tooltipTicks !== t.tooltipTicks &&
                      this.accessibilityManager.setDetails({
                        coordinateList: this.state.tooltipTicks,
                      }),
                    this.props.layout !== e.layout &&
                      this.accessibilityManager.setDetails({ layout: this.props.layout }),
                    this.props.margin !== e.margin &&
                      this.accessibilityManager.setDetails({
                        offset: {
                          left: this.props.margin.left ?? 0,
                          top: this.props.margin.top ?? 0,
                        },
                      }),
                    null)
                  : null;
              },
            },
            {
              key: `componentDidUpdate`,
              value: function (e) {
                Xo([Uo(e.children, Wf)], [Uo(this.props.children, Wf)]) ||
                  this.displayDefaultTooltip();
              },
            },
            {
              key: `componentWillUnmount`,
              value: function () {
                (this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel());
              },
            },
            {
              key: `getTooltipEventType`,
              value: function () {
                var e = Uo(this.props.children, Wf);
                if (e && typeof e.props.shared == `boolean`) {
                  var t = e.props.shared ? `axis` : `item`;
                  return s.indexOf(t) >= 0 ? t : a;
                }
                return a;
              },
            },
            {
              key: `getMouseInfo`,
              value: function (e) {
                if (!this.container) return null;
                var t = this.container,
                  n = t.getBoundingClientRect(),
                  r = Cp(n),
                  i = { chartX: Math.round(e.pageX - r.left), chartY: Math.round(e.pageY - r.top) },
                  a = n.width / t.offsetWidth || 1,
                  o = this.inRange(i.chartX, i.chartY, a);
                if (!o) return null;
                var s = this.state,
                  c = s.xAxisMap,
                  l = s.yAxisMap;
                if (this.getTooltipEventType() !== `axis` && c && l) {
                  var u = ho(c).scale,
                    d = ho(l).scale,
                    f = u && u.invert ? u.invert(i.chartX) : null,
                    p = d && d.invert ? d.invert(i.chartY) : null;
                  return Z(Z({}, i), {}, { xValue: f, yValue: p });
                }
                var m = QO(this.state, this.props.data, this.props.layout, o);
                return m ? Z(Z({}, i), m) : null;
              },
            },
            {
              key: `inRange`,
              value: function (e, t) {
                var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
                  r = this.props.layout,
                  i = e / n,
                  a = t / n;
                if (r === `horizontal` || r === `vertical`) {
                  var o = this.state.offset;
                  return i >= o.left && i <= o.left + o.width && a >= o.top && a <= o.top + o.height
                    ? { x: i, y: a }
                    : null;
                }
                var s = this.state,
                  c = s.angleAxisMap,
                  l = s.radiusAxisMap;
                if (c && l) {
                  var u = ho(c);
                  return Vg({ x: i, y: a }, u);
                }
                return null;
              },
            },
            {
              key: `parseEventsOfWrapper`,
              value: function () {
                var e = this.props.children,
                  t = this.getTooltipEventType(),
                  n = Uo(e, Wf),
                  r = {};
                return (
                  n &&
                    t === `axis` &&
                    (r =
                      n.props.trigger === `click`
                        ? { onClick: this.handleClick }
                        : {
                            onMouseEnter: this.handleMouseEnter,
                            onMouseMove: this.handleMouseMove,
                            onMouseLeave: this.handleMouseLeave,
                            onTouchMove: this.handleTouchMove,
                            onTouchStart: this.handleTouchStart,
                            onTouchEnd: this.handleTouchEnd,
                          }),
                  Z(Z({}, Oo(this.props, this.handleOuterEvent)), r)
                );
              },
            },
            {
              key: `addListener`,
              value: function () {
                JD.on(YD, this.handleReceiveSyncEvent);
              },
            },
            {
              key: `removeListener`,
              value: function () {
                JD.removeListener(YD, this.handleReceiveSyncEvent);
              },
            },
            {
              key: `filterFormatItem`,
              value: function (e, t, n) {
                for (var r = this.state.formattedGraphicalItems, i = 0, a = r.length; i < a; i++) {
                  var o = r[i];
                  if (
                    o.item === e ||
                    o.props.key === e.key ||
                    (t === Ro(o.item.type) && n === o.childIndex)
                  )
                    return o;
                }
                return null;
              },
            },
            {
              key: `renderClipPath`,
              value: function () {
                var e = this.clipPathId,
                  t = this.state.offset,
                  n = t.left,
                  r = t.top,
                  i = t.height,
                  a = t.width;
                return z.createElement(
                  `defs`,
                  null,
                  z.createElement(
                    `clipPath`,
                    { id: e },
                    z.createElement(`rect`, { x: n, y: r, height: i, width: a })
                  )
                );
              },
            },
            {
              key: `getXScales`,
              value: function () {
                var e = this.state.xAxisMap;
                return e
                  ? Object.entries(e).reduce(function (e, t) {
                      var n = yO(t, 2),
                        r = n[0],
                        i = n[1];
                      return Z(Z({}, e), {}, Q({}, r, i.scale));
                    }, {})
                  : null;
              },
            },
            {
              key: `getYScales`,
              value: function () {
                var e = this.state.yAxisMap;
                return e
                  ? Object.entries(e).reduce(function (e, t) {
                      var n = yO(t, 2),
                        r = n[0],
                        i = n[1];
                      return Z(Z({}, e), {}, Q({}, r, i.scale));
                    }, {})
                  : null;
              },
            },
            {
              key: `getXScaleByAxisId`,
              value: function (e) {
                var t;
                return (t = this.state.xAxisMap) == null || (t = t[e]) == null ? void 0 : t.scale;
              },
            },
            {
              key: `getYScaleByAxisId`,
              value: function (e) {
                var t;
                return (t = this.state.yAxisMap) == null || (t = t[e]) == null ? void 0 : t.scale;
              },
            },
            {
              key: `getItemByXY`,
              value: function (e) {
                var t = this.state,
                  n = t.formattedGraphicalItems,
                  r = t.activeItem;
                if (n && n.length)
                  for (var i = 0, a = n.length; i < a; i++) {
                    var o = n[i],
                      s = o.props,
                      c = o.item,
                      l = Ro(c.type);
                    if (l === `Bar`) {
                      var u = (s.data || []).find(function (t) {
                        return ex(e, t);
                      });
                      if (u) return { graphicalItem: o, payload: u };
                    } else if (l === `RadialBar`) {
                      var d = (s.data || []).find(function (t) {
                        return Vg(e, t);
                      });
                      if (d) return { graphicalItem: o, payload: d };
                    } else if (pS(o, r) || mS(o, r) || hS(o, r)) {
                      var f = SS({
                          graphicalItem: o,
                          activeTooltipItem: r,
                          itemData: c.props.data,
                        }),
                        p = c.props.activeIndex === void 0 ? f : c.props.activeIndex;
                      return {
                        graphicalItem: Z(Z({}, o), {}, { childIndex: p }),
                        payload: hS(o, r) ? c.props.data[f] : o.props.data[f],
                      };
                    }
                  }
                return null;
              },
            },
            {
              key: `render`,
              value: function () {
                var e = this;
                if (!Wo(this)) return null;
                var t = this.props,
                  n = t.children,
                  r = t.className,
                  i = t.width,
                  a = t.height,
                  o = t.style,
                  s = t.compact,
                  c = t.title,
                  l = t.desc,
                  u = W(CO(t, gO), !1);
                if (s)
                  return z.createElement(
                    Sw,
                    {
                      state: this.state,
                      width: this.props.width,
                      height: this.props.height,
                      clipPathId: this.clipPathId,
                    },
                    z.createElement(
                      as,
                      vO({}, u, { width: i, height: a, title: c, desc: l }),
                      this.renderClipPath(),
                      Qo(n, this.renderMap)
                    )
                  );
                this.props.accessibilityLayer &&
                  ((u.tabIndex = this.props.tabIndex ?? 0),
                  (u.role = this.props.role ?? `application`),
                  (u.onKeyDown = function (t) {
                    e.accessibilityManager.keyboardEvent(t);
                  }),
                  (u.onFocus = function () {
                    e.accessibilityManager.focus();
                  }));
                var d = this.parseEventsOfWrapper();
                return z.createElement(
                  Sw,
                  {
                    state: this.state,
                    width: this.props.width,
                    height: this.props.height,
                    clipPathId: this.clipPathId,
                  },
                  z.createElement(
                    `div`,
                    vO(
                      {
                        className: F(`recharts-wrapper`, r),
                        style: Z(
                          { position: `relative`, cursor: `default`, width: i, height: a },
                          o
                        ),
                      },
                      d,
                      {
                        ref: function (t) {
                          e.container = t;
                        },
                      }
                    ),
                    z.createElement(
                      as,
                      vO({}, u, { width: i, height: a, title: c, desc: l, style: WO }),
                      this.renderClipPath(),
                      Qo(n, this.renderMap)
                    ),
                    this.renderLegend(),
                    this.renderTooltip()
                  )
                );
              },
            },
          ]),
          t
        );
      })(z.Component)),
      Q(t, `displayName`, n),
      Q(
        t,
        `defaultProps`,
        Z(
          {
            layout: `horizontal`,
            stackOffset: `none`,
            barCategoryGap: `10%`,
            barGap: 4,
            margin: { top: 5, right: 5, bottom: 5, left: 5 },
            reverseStackOrder: !1,
            syncMethod: `index`,
          },
          d
        )
      ),
      Q(t, `getDerivedStateFromProps`, function (e, t) {
        var n = e.dataKey,
          r = e.data,
          i = e.children,
          a = e.width,
          o = e.height,
          s = e.layout,
          c = e.stackOffset,
          l = e.margin,
          u = t.dataStartIndex,
          d = t.dataEndIndex;
        if (t.updateId === void 0) {
          var f = rk(e);
          return Z(
            Z(Z({}, f), {}, { updateId: 0 }, p(Z(Z({ props: e }, f), {}, { updateId: 0 }), t)),
            {},
            {
              prevDataKey: n,
              prevData: r,
              prevWidth: a,
              prevHeight: o,
              prevLayout: s,
              prevStackOffset: c,
              prevMargin: l,
              prevChildren: i,
            }
          );
        }
        if (
          n !== t.prevDataKey ||
          r !== t.prevData ||
          a !== t.prevWidth ||
          o !== t.prevHeight ||
          s !== t.prevLayout ||
          c !== t.prevStackOffset ||
          !bo(l, t.prevMargin)
        ) {
          var m = rk(e),
            h = { chartX: t.chartX, chartY: t.chartY, isTooltipActive: t.isTooltipActive },
            g = Z(Z({}, QO(t, r, s)), {}, { updateId: t.updateId + 1 }),
            _ = Z(Z(Z({}, m), h), g);
          return Z(
            Z(Z({}, _), p(Z({ props: e }, _), t)),
            {},
            {
              prevDataKey: n,
              prevData: r,
              prevWidth: a,
              prevHeight: o,
              prevLayout: s,
              prevStackOffset: c,
              prevMargin: l,
              prevChildren: i,
            }
          );
        }
        if (!Xo(i, t.prevChildren)) {
          var v = Uo(i, tC),
            y = v ? (v.props?.startIndex ?? u) : u,
            b = v ? (v.props?.endIndex ?? d) : d,
            x = y !== u || b !== d,
            S = !(0, H.default)(r) && !x ? t.updateId : t.updateId + 1;
          return Z(
            Z(
              { updateId: S },
              p(Z(Z({ props: e }, t), {}, { updateId: S, dataStartIndex: y, dataEndIndex: b }), t)
            ),
            {},
            { prevChildren: i, dataStartIndex: y, dataEndIndex: b }
          );
        }
        return null;
      }),
      Q(t, `renderActiveDot`, function (e, t) {
        var n = (0, z.isValidElement)(e)
          ? (0, z.cloneElement)(e, t)
          : (0, U.default)(e)
            ? e(t)
            : z.createElement(yx, t);
        return z.createElement(G, { className: `recharts-active-dot`, key: t.key }, n);
      }),
      t
    );
  },
  lk = o((e, t) => {
    function n(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1;);
      return e;
    }
    t.exports = n;
  }),
  uk = o((e, t) => {
    var n = aC(),
      r = Ea(),
      i = Object.prototype.hasOwnProperty;
    function a(e, t, a) {
      var o = e[t];
      (!(i.call(e, t) && r(o, a)) || (a === void 0 && !(t in e))) && n(e, t, a);
    }
    t.exports = a;
  }),
  dk = o((e, t) => {
    var n = uk(),
      r = aC();
    function i(e, t, i, a) {
      var o = !i;
      i ||= {};
      for (var s = -1, c = t.length; ++s < c;) {
        var l = t[s],
          u = a ? a(i[l], e[l], l, i, e) : void 0;
        (u === void 0 && (u = e[l]), o ? r(i, l, u) : n(i, l, u));
      }
      return i;
    }
    t.exports = i;
  }),
  fk = o((e, t) => {
    var n = dk(),
      r = lu();
    function i(e, t) {
      return e && n(t, r(t), e);
    }
    t.exports = i;
  }),
  pk = o((e, t) => {
    function n(e) {
      var t = [];
      if (e != null) for (var n in Object(e)) t.push(n);
      return t;
    }
    t.exports = n;
  }),
  mk = o((e, t) => {
    var n = ua(),
      r = iu(),
      i = pk(),
      a = Object.prototype.hasOwnProperty;
    function o(e) {
      if (!n(e)) return i(e);
      var t = r(e),
        o = [];
      for (var s in e) (s == `constructor` && (t || !a.call(e, s))) || o.push(s);
      return o;
    }
    t.exports = o;
  }),
  hk = o((e, t) => {
    var n = ru(),
      r = mk(),
      i = cu();
    function a(e) {
      return i(e) ? n(e, !0) : r(e);
    }
    t.exports = a;
  }),
  gk = o((e, t) => {
    var n = dk(),
      r = hk();
    function i(e, t) {
      return e && n(t, r(t), e);
    }
    t.exports = i;
  }),
  _k = o((e, t) => {
    var n = na(),
      r = typeof e == `object` && e && !e.nodeType && e,
      i = r && typeof t == `object` && t && !t.nodeType && t,
      a = i && i.exports === r ? n.Buffer : void 0,
      o = a ? a.allocUnsafe : void 0;
    function s(e, t) {
      if (t) return e.slice();
      var n = e.length,
        r = o ? o(n) : new e.constructor(n);
      return (e.copy(r), r);
    }
    t.exports = s;
  }),
  vk = o((e, t) => {
    function n(e, t) {
      var n = -1,
        r = e.length;
      for (t ||= Array(r); ++n < r;) t[n] = e[n];
      return t;
    }
    t.exports = n;
  }),
  yk = o((e, t) => {
    var n = dk(),
      r = Gl();
    function i(e, t) {
      return n(e, r(e), t);
    }
    t.exports = i;
  }),
  bk = o((e, t) => {
    var n = Vl(),
      r = Mx(),
      i = Gl(),
      a = Wl();
    t.exports = Object.getOwnPropertySymbols
      ? function (e) {
          for (var t = []; e;) (n(t, i(e)), (e = r(e)));
          return t;
        }
      : a;
  }),
  xk = o((e, t) => {
    var n = dk(),
      r = bk();
    function i(e, t) {
      return n(e, r(e), t);
    }
    t.exports = i;
  }),
  Sk = o((e, t) => {
    var n = Hl(),
      r = bk(),
      i = hk();
    function a(e) {
      return n(e, i, r);
    }
    t.exports = a;
  }),
  Ck = o((e, t) => {
    var n = Object.prototype.hasOwnProperty;
    function r(e) {
      var t = e.length,
        r = new e.constructor(t);
      return (
        t &&
          typeof e[0] == `string` &&
          n.call(e, `index`) &&
          ((r.index = e.index), (r.input = e.input)),
        r
      );
    }
    t.exports = r;
  }),
  wk = o((e, t) => {
    var n = Ll();
    function r(e) {
      var t = new e.constructor(e.byteLength);
      return (new n(t).set(new n(e)), t);
    }
    t.exports = r;
  }),
  Tk = o((e, t) => {
    var n = wk();
    function r(e, t) {
      var r = t ? n(e.buffer) : e.buffer;
      return new e.constructor(r, e.byteOffset, e.byteLength);
    }
    t.exports = r;
  }),
  Ek = o((e, t) => {
    var n = /\w*$/;
    function r(e) {
      var t = new e.constructor(e.source, n.exec(e));
      return ((t.lastIndex = e.lastIndex), t);
    }
    t.exports = r;
  }),
  Dk = o((e, t) => {
    var n = ra(),
      r = n ? n.prototype : void 0,
      i = r ? r.valueOf : void 0;
    function a(e) {
      return i ? Object(i.call(e)) : {};
    }
    t.exports = a;
  }),
  Ok = o((e, t) => {
    var n = wk();
    function r(e, t) {
      var r = t ? n(e.buffer) : e.buffer;
      return new e.constructor(r, e.byteOffset, e.length);
    }
    t.exports = r;
  }),
  kk = o((e, t) => {
    var n = wk(),
      r = Tk(),
      i = Ek(),
      a = Dk(),
      o = Ok(),
      s = `[object Boolean]`,
      c = `[object Date]`,
      l = `[object Map]`,
      u = `[object Number]`,
      d = `[object RegExp]`,
      f = `[object Set]`,
      p = `[object String]`,
      m = `[object Symbol]`,
      h = `[object ArrayBuffer]`,
      g = `[object DataView]`,
      _ = `[object Float32Array]`,
      v = `[object Float64Array]`,
      y = `[object Int8Array]`,
      b = `[object Int16Array]`,
      x = `[object Int32Array]`,
      S = `[object Uint8Array]`,
      C = `[object Uint8ClampedArray]`,
      w = `[object Uint16Array]`,
      T = `[object Uint32Array]`;
    function E(e, t, E) {
      var D = e.constructor;
      switch (t) {
        case h:
          return n(e);
        case s:
        case c:
          return new D(+e);
        case g:
          return r(e, E);
        case _:
        case v:
        case y:
        case b:
        case x:
        case S:
        case C:
        case w:
        case T:
          return o(e, E);
        case l:
          return new D();
        case u:
        case p:
          return new D(e);
        case d:
          return i(e);
        case f:
          return new D();
        case m:
          return a(e);
      }
    }
    t.exports = E;
  }),
  Ak = o((e, t) => {
    var n = ua(),
      r = Object.create;
    t.exports = (function () {
      function e() {}
      return function (t) {
        if (!n(t)) return {};
        if (r) return r(t);
        e.prototype = t;
        var i = new e();
        return ((e.prototype = void 0), i);
      };
    })();
  }),
  jk = o((e, t) => {
    var n = Ak(),
      r = Mx(),
      i = iu();
    function a(e) {
      return typeof e.constructor == `function` && !i(e) ? n(r(e)) : {};
    }
    t.exports = a;
  }),
  Mk = o((e, t) => {
    var n = gu(),
      r = sa(),
      i = `[object Map]`;
    function a(e) {
      return r(e) && n(e) == i;
    }
    t.exports = a;
  }),
  Nk = o((e, t) => {
    var n = Mk(),
      r = eu(),
      i = tu(),
      a = i && i.isMap;
    t.exports = a ? r(a) : n;
  }),
  Pk = o((e, t) => {
    var n = gu(),
      r = sa(),
      i = `[object Set]`;
    function a(e) {
      return r(e) && n(e) == i;
    }
    t.exports = a;
  }),
  Fk = o((e, t) => {
    var n = Pk(),
      r = eu(),
      i = tu(),
      a = i && i.isSet;
    t.exports = a ? r(a) : n;
  }),
  Ik = o((e, t) => {
    var n = Al(),
      r = lk(),
      i = uk(),
      a = fk(),
      o = gk(),
      s = _k(),
      c = vk(),
      l = yk(),
      u = xk(),
      d = uu(),
      f = Sk(),
      p = gu(),
      m = Ck(),
      h = kk(),
      g = jk(),
      _ = ea(),
      v = Xl(),
      y = Nk(),
      b = ua(),
      x = Fk(),
      S = lu(),
      C = hk(),
      w = 1,
      T = 2,
      E = 4,
      D = `[object Arguments]`,
      O = `[object Array]`,
      k = `[object Boolean]`,
      A = `[object Date]`,
      j = `[object Error]`,
      M = `[object Function]`,
      N = `[object GeneratorFunction]`,
      P = `[object Map]`,
      ee = `[object Number]`,
      F = `[object Object]`,
      te = `[object RegExp]`,
      ne = `[object Set]`,
      re = `[object String]`,
      ie = `[object Symbol]`,
      ae = `[object WeakMap]`,
      I = `[object ArrayBuffer]`,
      oe = `[object DataView]`,
      se = `[object Float32Array]`,
      ce = `[object Float64Array]`,
      le = `[object Int8Array]`,
      ue = `[object Int16Array]`,
      de = `[object Int32Array]`,
      fe = `[object Uint8Array]`,
      pe = `[object Uint8ClampedArray]`,
      me = `[object Uint16Array]`,
      he = `[object Uint32Array]`,
      L = {};
    ((L[D] =
      L[O] =
      L[I] =
      L[oe] =
      L[k] =
      L[A] =
      L[se] =
      L[ce] =
      L[le] =
      L[ue] =
      L[de] =
      L[P] =
      L[ee] =
      L[F] =
      L[te] =
      L[ne] =
      L[re] =
      L[ie] =
      L[fe] =
      L[pe] =
      L[me] =
      L[he] =
        !0),
      (L[j] = L[M] = L[ae] = !1));
    function ge(e, t, O, k, A, j) {
      var P,
        ee = t & w,
        te = t & T,
        ne = t & E;
      if ((O && (P = A ? O(e, k, A, j) : O(e)), P !== void 0)) return P;
      if (!b(e)) return e;
      var re = _(e);
      if (re) {
        if (((P = m(e)), !ee)) return c(e, P);
      } else {
        var ie = p(e),
          ae = ie == M || ie == N;
        if (v(e)) return s(e, ee);
        if (ie == F || ie == D || (ae && !A)) {
          if (((P = te || ae ? {} : g(e)), !ee)) return te ? u(e, o(P, e)) : l(e, a(P, e));
        } else {
          if (!L[ie]) return A ? e : {};
          P = h(e, ie, ee);
        }
      }
      j ||= new n();
      var I = j.get(e);
      if (I) return I;
      (j.set(e, P),
        x(e)
          ? e.forEach(function (n) {
              P.add(ge(n, t, O, n, e, j));
            })
          : y(e) &&
            e.forEach(function (n, r) {
              P.set(r, ge(n, t, O, r, e, j));
            }));
      var oe = re ? void 0 : (ne ? (te ? f : d) : te ? C : S)(e);
      return (
        r(oe || e, function (n, r) {
          (oe && ((r = n), (n = e[r])), i(P, r, ge(n, t, O, r, e, j)));
        }),
        P
      );
    }
    t.exports = ge;
  }),
  Lk = o((e, t) => {
    var n = Xa(),
      r = fs();
    function i(e, t) {
      return t.length < 2 ? e : n(e, r(t, 0, -1));
    }
    t.exports = i;
  }),
  Rk = o((e, t) => {
    var n = Ja(),
      r = p_(),
      i = Lk(),
      a = Ya(),
      o = Object.prototype.hasOwnProperty;
    function s(e, t) {
      t = n(t, e);
      var s = -1,
        c = t.length;
      if (!c) return !0;
      for (; ++s < c;) {
        var l = a(t[s]);
        if (
          (l === `__proto__` && !o.call(e, `__proto__`)) ||
          ((l === `constructor` || l === `prototype`) && s < c - 1)
        )
          return !1;
      }
      var u = i(e, t);
      return u == null || delete u[a(r(t))];
    }
    t.exports = s;
  }),
  zk = o((e, t) => {
    var n = Nx();
    function r(e) {
      return n(e) ? void 0 : e;
    }
    t.exports = r;
  }),
  Bk = o((e, t) => {
    var n = md();
    function r(e) {
      return e != null && e.length ? n(e, 1) : [];
    }
    t.exports = r;
  }),
  Vk = o((e, t) => {
    var n = Bk(),
      r = Ed(),
      i = jd();
    function a(e) {
      return i(r(e, void 0, n), e + ``);
    }
    t.exports = a;
  }),
  Hk = o((e, t) => {
    var n = Ga(),
      r = Ik(),
      i = Rk(),
      a = Ja(),
      o = dk(),
      s = zk(),
      c = Vk(),
      l = Sk(),
      u = 1,
      d = 2,
      f = 4;
    t.exports = c(function (e, t) {
      var c = {};
      if (e == null) return c;
      var p = !1;
      ((t = n(t, function (t) {
        return ((t = a(t, e)), (p ||= t.length > 1), t);
      })),
        o(e, l(e), c),
        p && (c = r(c, u | d | f, s)));
      for (var m = t.length; m--;) i(c, t[m]);
      return c;
    });
  }),
  Uk = [
    `#1890FF`,
    `#66B5FF`,
    `#41D9C7`,
    `#2FC25B`,
    `#6EDB8F`,
    `#9AE65C`,
    `#FACC14`,
    `#E6965C`,
    `#57AD71`,
    `#223273`,
    `#738AE6`,
    `#7564CC`,
    `#8543E0`,
    `#A877ED`,
    `#5C8EE6`,
    `#13C2C2`,
    `#70E0E0`,
    `#5CA3E6`,
    `#3436C7`,
    `#8082FF`,
    `#DD81E6`,
    `#F04864`,
    `#FA7D92`,
    `#D598D9`,
  ],
  Wk = r(Hk()),
  Gk = [`width`, `height`, `className`, `style`, `children`, `type`];
function Kk(e) {
  '@babel/helpers - typeof';
  return (
    (Kk =
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
    Kk(e)
  );
}
function qk() {
  return (
    (qk = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    qk.apply(this, arguments)
  );
}
function Jk(e, t) {
  if (e == null) return {};
  var n = Yk(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function Yk(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function Xk(e, t) {
  if (!(e instanceof t)) throw TypeError(`Cannot call a class as a function`);
}
function Zk(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, cA(r.key), r));
  }
}
function Qk(e, t, n) {
  return (
    t && Zk(e.prototype, t),
    n && Zk(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function $k(e, t, n) {
  return (
    (t = nA(t)),
    eA(e, tA() ? Reflect.construct(t, n || [], nA(e).constructor) : t.apply(e, n))
  );
}
function eA(e, t) {
  if (t && (Kk(t) === `object` || typeof t == `function`)) return t;
  if (t !== void 0) throw TypeError(`Derived constructors may only return object or undefined`);
  return rA(e);
}
function tA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (tA = function () {
    return !!e;
  })();
}
function nA(e) {
  return (
    (nA = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    nA(e)
  );
}
function rA(e) {
  if (e === void 0)
    throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
  return e;
}
function iA(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Super expression must either be null or a function`);
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && aA(e, t));
}
function aA(e, t) {
  return (
    (aA = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    aA(e, t)
  );
}
function oA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function $(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? oA(Object(n), !0).forEach(function (t) {
          sA(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : oA(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function sA(e, t, n) {
  return (
    (t = cA(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function cA(e) {
  var t = lA(e, `string`);
  return Kk(t) == `symbol` ? t : String(t);
}
function lA(e, t) {
  if (Kk(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (Kk(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var uA = `value`,
  dA = function e(t) {
    var n = t.depth,
      r = t.node,
      i = t.index,
      a = t.valueKey,
      o = r.children,
      s = n + 1,
      c =
        o && o.length
          ? o.map(function (t, n) {
              return e({ depth: s, node: t, index: n, valueKey: a });
            })
          : null,
      l =
        o && o.length
          ? c.reduce(function (e, t) {
              return e + t[uA];
            }, 0)
          : (0, ao.default)(r[a]) || r[a] <= 0
            ? 0
            : r[a];
    return $($({}, r), {}, sA(sA(sA({ children: c }, uA, l), `depth`, n), `index`, i));
  },
  fA = function (e) {
    return { x: e.x, y: e.y, width: e.width, height: e.height };
  },
  pA = function (e, t) {
    var n = t < 0 ? 0 : t;
    return e.map(function (e) {
      var t = e[uA] * n;
      return $($({}, e), {}, { area: (0, ao.default)(t) || t <= 0 ? 0 : t });
    });
  },
  mA = function (e, t, n) {
    var r = t * t,
      i = e.area * e.area,
      a = e.reduce(
        function (e, t) {
          return { min: Math.min(e.min, t.area), max: Math.max(e.max, t.area) };
        },
        { min: 1 / 0, max: 0 }
      ),
      o = a.min,
      s = a.max;
    return i ? Math.max((r * s * n) / i, i / (r * o * n)) : 1 / 0;
  },
  hA = function (e, t, n, r) {
    var i = t ? Math.round(e.area / t) : 0;
    (r || i > n.height) && (i = n.height);
    for (var a = n.x, o, s = 0, c = e.length; s < c; s++)
      ((o = e[s]),
        (o.x = a),
        (o.y = n.y),
        (o.height = i),
        (o.width = Math.min(i ? Math.round(o.area / i) : 0, n.x + n.width - a)),
        (a += o.width));
    return ((o.width += n.x + n.width - a), $($({}, n), {}, { y: n.y + i, height: n.height - i }));
  },
  gA = function (e, t, n, r) {
    var i = t ? Math.round(e.area / t) : 0;
    (r || i > n.width) && (i = n.width);
    for (var a = n.y, o, s = 0, c = e.length; s < c; s++)
      ((o = e[s]),
        (o.x = n.x),
        (o.y = a),
        (o.width = i),
        (o.height = Math.min(i ? Math.round(o.area / i) : 0, n.y + n.height - a)),
        (a += o.height));
    return (
      o && (o.height += n.y + n.height - a),
      $($({}, n), {}, { x: n.x + i, width: n.width - i })
    );
  },
  _A = function (e, t, n, r) {
    return t === n.width ? hA(e, t, n, r) : gA(e, t, n, r);
  },
  vA = function e(t, n) {
    var r = t.children;
    if (r && r.length) {
      var i = fA(t),
        a = [],
        o = 1 / 0,
        s,
        c,
        l = Math.min(i.width, i.height),
        u = pA(r, (i.width * i.height) / t[uA]),
        d = u.slice();
      for (a.area = 0; d.length > 0;)
        (a.push((s = d[0])),
          (a.area += s.area),
          (c = mA(a, l, n)),
          c <= o
            ? (d.shift(), (o = c))
            : ((a.area -= a.pop().area),
              (i = _A(a, l, i, !1)),
              (l = Math.min(i.width, i.height)),
              (a.length = a.area = 0),
              (o = 1 / 0)));
      return (
        (a.length &&= ((i = _A(a, l, i, !0)), (a.area = 0))),
        $(
          $({}, t),
          {},
          {
            children: u.map(function (t) {
              return e(t, n);
            }),
          }
        )
      );
    }
    return t;
  },
  yA = {
    isTooltipActive: !1,
    isAnimationFinished: !1,
    activeNode: null,
    formatRoot: null,
    currentRoot: null,
    nestIndex: [],
  },
  bA = (function (e) {
    iA(t, e);
    function t() {
      var e;
      Xk(this, t);
      var n = [...arguments];
      return (
        (e = $k(this, t, [].concat(n))),
        sA(rA(e), `state`, $({}, yA)),
        sA(rA(e), `handleAnimationEnd`, function () {
          var t = e.props.onAnimationEnd;
          (e.setState({ isAnimationFinished: !0 }), (0, U.default)(t) && t());
        }),
        sA(rA(e), `handleAnimationStart`, function () {
          var t = e.props.onAnimationStart;
          (e.setState({ isAnimationFinished: !1 }), (0, U.default)(t) && t());
        }),
        e
      );
    }
    return (
      Qk(
        t,
        [
          {
            key: `handleMouseEnter`,
            value: function (e, t) {
              t.persist();
              var n = this.props,
                r = n.onMouseEnter,
                i = n.children;
              Uo(i, Wf)
                ? this.setState({ isTooltipActive: !0, activeNode: e }, function () {
                    r && r(e, t);
                  })
                : r && r(e, t);
            },
          },
          {
            key: `handleMouseLeave`,
            value: function (e, t) {
              t.persist();
              var n = this.props,
                r = n.onMouseLeave,
                i = n.children;
              Uo(i, Wf)
                ? this.setState({ isTooltipActive: !1, activeNode: null }, function () {
                    r && r(e, t);
                  })
                : r && r(e, t);
            },
          },
          {
            key: `handleClick`,
            value: function (e) {
              var t = this.props,
                n = t.onClick;
              if (t.type === `nest` && e.children) {
                var r = this.props,
                  i = r.width,
                  a = r.height,
                  o = r.dataKey,
                  s = r.aspectRatio,
                  c = dA({
                    depth: 0,
                    node: $($({}, e), {}, { x: 0, y: 0, width: i, height: a }),
                    index: 0,
                    valueKey: o,
                  }),
                  l = vA(c, s),
                  u = this.state.nestIndex;
                (u.push(e), this.setState({ formatRoot: l, currentRoot: c, nestIndex: u }));
              }
              n && n(e);
            },
          },
          {
            key: `handleNestIndex`,
            value: function (e, t) {
              var n = this.state.nestIndex,
                r = this.props,
                i = r.width,
                a = r.height,
                o = r.dataKey,
                s = r.aspectRatio,
                c = vA(
                  dA({
                    depth: 0,
                    node: $($({}, e), {}, { x: 0, y: 0, width: i, height: a }),
                    index: 0,
                    valueKey: o,
                  }),
                  s
                );
              ((n = n.slice(0, t + 1)),
                this.setState({ formatRoot: c, currentRoot: e, nestIndex: n }));
            },
          },
          {
            key: `renderItem`,
            value: function (e, t, n) {
              var r = this,
                i = this.props,
                a = i.isAnimationActive,
                o = i.animationBegin,
                s = i.animationDuration,
                c = i.animationEasing,
                l = i.isUpdateAnimationActive,
                u = i.type,
                d = i.animationId,
                f = i.colorPanel,
                p = this.state.isAnimationFinished,
                m = t.width,
                h = t.height,
                g = t.x,
                _ = t.y,
                v = t.depth,
                y = parseInt(`${(Math.random() * 2 - 1) * m}`, 10),
                b = {};
              return (
                (n || u === `nest`) &&
                  (b = {
                    onMouseEnter: this.handleMouseEnter.bind(this, t),
                    onMouseLeave: this.handleMouseLeave.bind(this, t),
                    onClick: this.handleClick.bind(this, t),
                  }),
                a
                  ? z.createElement(
                      zb,
                      {
                        begin: o,
                        duration: s,
                        isActive: a,
                        easing: c,
                        key: `treemap-${d}`,
                        from: { x: g, y: _, width: m, height: h },
                        to: { x: g, y: _, width: m, height: h },
                        onAnimationStart: this.handleAnimationStart,
                        onAnimationEnd: this.handleAnimationEnd,
                      },
                      function (n) {
                        var i = n.x,
                          d = n.y,
                          m = n.width,
                          h = n.height;
                        return z.createElement(
                          zb,
                          {
                            from: `translate(${y}px, ${y}px)`,
                            to: `translate(0, 0)`,
                            attributeName: `transform`,
                            begin: o,
                            easing: c,
                            isActive: a,
                            duration: s,
                          },
                          z.createElement(
                            G,
                            b,
                            (function () {
                              return v > 2 && !p
                                ? null
                                : r.constructor.renderContentItem(
                                    e,
                                    $(
                                      $({}, t),
                                      {},
                                      {
                                        isAnimationActive: a,
                                        isUpdateAnimationActive: !l,
                                        width: m,
                                        height: h,
                                        x: i,
                                        y: d,
                                      }
                                    ),
                                    u,
                                    f
                                  );
                            })()
                          )
                        );
                      }
                    )
                  : z.createElement(
                      G,
                      b,
                      this.constructor.renderContentItem(
                        e,
                        $(
                          $({}, t),
                          {},
                          {
                            isAnimationActive: !1,
                            isUpdateAnimationActive: !1,
                            width: m,
                            height: h,
                            x: g,
                            y: _,
                          }
                        ),
                        u,
                        f
                      )
                    )
              );
            },
          },
          {
            key: `renderNode`,
            value: function (e, t) {
              var n = this,
                r = this.props,
                i = r.content,
                a = r.type,
                o = $($($({}, W(this.props, !1)), t), {}, { root: e }),
                s = !t.children || !t.children.length;
              return !(this.state.currentRoot.children || []).filter(function (e) {
                return e.depth === t.depth && e.name === t.name;
              }).length &&
                e.depth &&
                a === `nest`
                ? null
                : z.createElement(
                    G,
                    {
                      key: `recharts-treemap-node-${o.x}-${o.y}-${o.name}`,
                      className: `recharts-treemap-depth-${t.depth}`,
                    },
                    this.renderItem(i, o, s),
                    t.children && t.children.length
                      ? t.children.map(function (e) {
                          return n.renderNode(t, e);
                        })
                      : null
                  );
            },
          },
          {
            key: `renderAllNodes`,
            value: function () {
              var e = this.state.formatRoot;
              return e ? this.renderNode(e, e) : null;
            },
          },
          {
            key: `renderTooltip`,
            value: function () {
              var e = this.props,
                t = e.children,
                n = e.nameKey,
                r = Uo(t, Wf);
              if (!r) return null;
              var i = this.props,
                a = i.width,
                o = i.height,
                s = this.state,
                c = s.isTooltipActive,
                l = s.activeNode,
                u = { x: 0, y: 0, width: a, height: o },
                d = l ? { x: l.x + l.width / 2, y: l.y + l.height / 2 } : null,
                f = c && l ? [{ payload: l, name: J(l, n, ``), value: J(l, uA) }] : [];
              return z.cloneElement(r, {
                viewBox: u,
                active: c,
                coordinate: d,
                label: ``,
                payload: f,
              });
            },
          },
          {
            key: `renderNestIndex`,
            value: function () {
              var e = this,
                t = this.props,
                n = t.nameKey,
                r = t.nestIndexContent,
                i = this.state.nestIndex;
              return z.createElement(
                `div`,
                {
                  className: `recharts-treemap-nest-index-wrapper`,
                  style: { marginTop: `8px`, textAlign: `center` },
                },
                i.map(function (t, i) {
                  var a = (0, oo.default)(t, n, `root`),
                    o = null;
                  return (
                    z.isValidElement(r) && (o = z.cloneElement(r, t, i)),
                    (o = (0, U.default)(r) ? r(t, i) : a),
                    z.createElement(
                      `div`,
                      {
                        onClick: e.handleNestIndex.bind(e, t, i),
                        key: `nest-index-${po()}`,
                        className: `recharts-treemap-nest-index-box`,
                        style: {
                          cursor: `pointer`,
                          display: `inline-block`,
                          padding: `0 7px`,
                          background: `#000`,
                          color: `#fff`,
                          marginRight: `3px`,
                        },
                      },
                      o
                    )
                  );
                })
              );
            },
          },
          {
            key: `render`,
            value: function () {
              if (!Wo(this)) return null;
              var e = this.props,
                t = e.width,
                n = e.height,
                r = e.className,
                i = e.style,
                a = e.children,
                o = e.type,
                s = W(Jk(e, Gk), !1);
              return z.createElement(
                `div`,
                {
                  className: F(`recharts-wrapper`, r),
                  style: $(
                    $({}, i),
                    {},
                    { position: `relative`, cursor: `default`, width: t, height: n }
                  ),
                  role: `region`,
                },
                z.createElement(
                  as,
                  qk({}, s, { width: t, height: o === `nest` ? n - 30 : n }),
                  this.renderAllNodes(),
                  Yo(a)
                ),
                this.renderTooltip(),
                o === `nest` && this.renderNestIndex()
              );
            },
          },
        ],
        [
          {
            key: `getDerivedStateFromProps`,
            value: function (e, t) {
              if (
                e.data !== t.prevData ||
                e.type !== t.prevType ||
                e.width !== t.prevWidth ||
                e.height !== t.prevHeight ||
                e.dataKey !== t.prevDataKey ||
                e.aspectRatio !== t.prevAspectRatio
              ) {
                var n = dA({
                    depth: 0,
                    node: { children: e.data, x: 0, y: 0, width: e.width, height: e.height },
                    index: 0,
                    valueKey: e.dataKey,
                  }),
                  r = vA(n, e.aspectRatio);
                return $(
                  $({}, t),
                  {},
                  {
                    formatRoot: r,
                    currentRoot: n,
                    nestIndex: [n],
                    prevAspectRatio: e.aspectRatio,
                    prevData: e.data,
                    prevWidth: e.width,
                    prevHeight: e.height,
                    prevDataKey: e.dataKey,
                    prevType: e.type,
                  }
                );
              }
              return null;
            },
          },
          {
            key: `renderContentItem`,
            value: function (e, t, n, r) {
              if (z.isValidElement(e)) return z.cloneElement(e, t);
              if ((0, U.default)(e)) return e(t);
              var i = t.x,
                a = t.y,
                o = t.width,
                s = t.height,
                c = t.index,
                l = null;
              o > 10 &&
                s > 10 &&
                t.children &&
                n === `nest` &&
                (l = z.createElement(_x, {
                  points: [
                    { x: i + 2, y: a + s / 2 },
                    { x: i + 6, y: a + s / 2 + 3 },
                    { x: i + 2, y: a + s / 2 + 6 },
                  ],
                }));
              var u = null,
                d = Sp(t.name);
              o > 20 &&
                s > 20 &&
                d.width < o &&
                d.height < s &&
                (u = z.createElement(`text`, { x: i + 8, y: a + s / 2 + 7, fontSize: 14 }, t.name));
              var f = r || Uk;
              return z.createElement(
                `g`,
                null,
                z.createElement(
                  nx,
                  qk(
                    { fill: t.depth < 2 ? f[c % f.length] : `rgba(255,255,255,0)`, stroke: `#fff` },
                    (0, Wk.default)(t, `children`),
                    { role: `img` }
                  )
                ),
                l,
                u
              );
            },
          },
        ]
      ),
      t
    );
  })(z.PureComponent);
(sA(bA, `displayName`, `Treemap`),
  sA(bA, `defaultProps`, {
    aspectRatio: 0.5 * (1 + Math.sqrt(5)),
    dataKey: `value`,
    type: `flat`,
    isAnimationActive: !Tf.isSsr,
    isUpdateAnimationActive: !Tf.isSsr,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: `linear`,
  }));
var xA = ck({
  chartName: `ComposedChart`,
  GraphicalChild: [WE, fD, WC, ID],
  axisComponents: [
    { axisType: `xAxis`, AxisComp: RD },
    { axisType: `yAxis`, AxisComp: BD },
    { axisType: `zAxis`, AxisComp: pD },
  ],
  formatAxisMap: nw,
});
function SA({ active: e, payload: t }) {
  if (!e || !t?.length) return null;
  let n = t[0]?.payload;
  if (!n) return null;
  let r = I(n.health_score);
  return (0, B.jsxs)(`div`, {
    className: `glass-tooltip rounded-[24px] p-4 shadow-2xl min-w-[240px] border border-white/15 backdrop-blur-2xl transition-all duration-200`,
    children: [
      (0, B.jsxs)(`div`, {
        className: `flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/5`,
        children: [
          (0, B.jsx)(`span`, {
            className: `font-mono text-[10px] text-purple-300 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/15`,
            children: k(n.sha),
          }),
          (0, B.jsx)(`span`, {
            className: `text-[10px] text-slate-400 font-medium`,
            children: ae(n.committed_at),
          }),
        ],
      }),
      (0, B.jsx)(`div`, {
        className: `text-white text-xs font-medium mb-3 line-clamp-2 max-w-[220px] font-sans`,
        children: se(n.message),
      }),
      (0, B.jsxs)(`div`, {
        className: `space-y-2 pt-1`,
        children: [
          (0, B.jsxs)(`div`, {
            className: `flex items-center justify-between text-xs bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5`,
            children: [
              (0, B.jsxs)(`span`, {
                className: `text-slate-400 flex items-center gap-1.5`,
                children: [
                  (0, B.jsx)(`span`, {
                    className: `w-1.5 h-1.5 rounded-full`,
                    style: { backgroundColor: r },
                  }),
                  `Health Index`,
                ],
              }),
              (0, B.jsx)(`span`, {
                className: `font-mono font-bold`,
                style: { color: r },
                children: n.health_score.toFixed(1),
              }),
            ],
          }),
          (0, B.jsxs)(`div`, {
            className: `flex items-center justify-between text-xs bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5`,
            children: [
              (0, B.jsxs)(`span`, {
                className: `text-slate-400 flex items-center gap-1.5`,
                children: [
                  (0, B.jsx)(me, { className: `w-3.5 h-3.5 text-rose-400` }),
                  `Avg Complexity`,
                ],
              }),
              (0, B.jsx)(`span`, {
                className: `font-mono font-bold text-rose-300`,
                children: n.avg_complexity.toFixed(1),
              }),
            ],
          }),
          (0, B.jsxs)(`div`, {
            className: `flex items-center justify-between text-xs bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5`,
            children: [
              (0, B.jsxs)(`span`, {
                className: `text-slate-400 flex items-center gap-1.5`,
                children: [(0, B.jsx)(O, { className: `w-3.5 h-3.5 text-sky-400` }), `Churn Rate`],
              }),
              (0, B.jsxs)(`span`, {
                className: `font-mono font-bold text-sky-300`,
                children: [(n.churn_rate * 100).toFixed(1), `%`],
              }),
            ],
          }),
          (0, B.jsxs)(`div`, {
            className: `flex items-center justify-between text-xs bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5`,
            children: [
              (0, B.jsxs)(`span`, {
                className: `text-slate-400 flex items-center gap-1.5`,
                children: [
                  (0, B.jsx)(N, { className: `w-3.5 h-3.5 text-cyan-400` }),
                  `Semantic Drift`,
                ],
              }),
              (0, B.jsx)(`span`, {
                className: `font-mono font-bold text-cyan-300`,
                children: (n.subscores?.semantic_drift ?? n.semantic_health_score ?? 100).toFixed(
                  1
                ),
              }),
            ],
          }),
          n.semantic_drift_method === `graphcodebert` &&
            (0, B.jsxs)(`div`, {
              className: `inline-flex items-center gap-1.5 text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-2 py-0.5 font-mono mt-1 w-fit`,
              children: [
                (0, B.jsx)(`span`, {
                  className: `w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse`,
                }),
                `GraphCodeBERT`,
              ],
            }),
        ],
      }),
    ],
  });
}
function CA({ commits: e, repoSlug: t, selectedSha: r, onSelectCommit: i }) {
  let a = n(),
    [o, s] = (0, z.useState)({
      complexity_drift: !1,
      churn_risk: !1,
      bus_factor_risk: !1,
      dependency_health: !1,
      semantic_drift: !1,
    });
  if (e.length === 0)
    return (0, B.jsxs)(`div`, {
      className: `glass-panel rounded-[28px] p-6 shadow-2xl h-48 flex flex-col items-center justify-center text-slate-400 border border-white/10`,
      children: [
        (0, B.jsx)(P, { className: `w-8 h-8 text-slate-500 mb-2 animate-pulse` }),
        (0, B.jsx)(`span`, {
          className: `text-sm font-medium`,
          children: `No health timeline data compiled yet`,
        }),
      ],
    });
  let c = (e) => {
      let n = e?.activePayload?.[0]?.payload;
      n && (i(n), t && a(`/dashboard/${t}/commit/${n.sha}`));
    },
    l = (e) => {
      s((t) => ({ ...t, [e]: !t[e] }));
    };
  return (0, B.jsxs)(`div`, {
    className: `glass-panel rounded-[28px] p-6 shadow-2xl relative border border-white/10`,
    children: [
      (0, B.jsxs)(`div`, {
        className: `absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none`,
        children: [
          (0, B.jsx)(`div`, {
            className: `absolute -top-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]`,
          }),
          (0, B.jsx)(`div`, {
            className: `absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]`,
          }),
        ],
      }),
      (0, B.jsxs)(`div`, {
        className: `flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6 relative z-10`,
        children: [
          (0, B.jsxs)(`div`, {
            children: [
              (0, B.jsxs)(`div`, {
                className: `flex items-center gap-2`,
                children: [
                  (0, B.jsx)(N, { className: `w-5 h-5 text-purple-400` }),
                  (0, B.jsx)(`h2`, {
                    className: `font-head text-[18px] font-semibold text-white tracking-tight`,
                    children: `Codebase Health Timeline`,
                  }),
                ],
              }),
              (0, B.jsx)(`p`, {
                className: `text-slate-400 text-xs mt-1`,
                children: `Interactive timeline tracker highlighting drift over recent commits`,
              }),
            ],
          }),
          (0, B.jsxs)(`div`, {
            className: `flex flex-wrap items-center gap-2 text-xs`,
            children: [
              (0, B.jsxs)(`span`, {
                className: `flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium`,
                children: [
                  (0, B.jsx)(`span`, {
                    className: `w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse`,
                  }),
                  `Health Index`,
                ],
              }),
              [
                {
                  key: `complexity_drift`,
                  label: `Complexity`,
                  color: `text-amber-300`,
                  dotBg: `bg-amber-400`,
                  activeBg: `bg-amber-500/15 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]`,
                },
                {
                  key: `churn_risk`,
                  label: `Churn`,
                  color: `text-rose-300`,
                  dotBg: `bg-rose-400`,
                  activeBg: `bg-rose-500/15 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]`,
                },
                {
                  key: `bus_factor_risk`,
                  label: `Bus Factor`,
                  color: `text-fuchsia-300`,
                  dotBg: `bg-fuchsia-400`,
                  activeBg: `bg-fuchsia-500/15 border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.15)]`,
                },
                {
                  key: `dependency_health`,
                  label: `Dependencies`,
                  color: `text-emerald-300`,
                  dotBg: `bg-emerald-400`,
                  activeBg: `bg-emerald-500/15 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]`,
                },
                {
                  key: `semantic_drift`,
                  label: `Semantic`,
                  color: `text-cyan-300`,
                  dotBg: `bg-cyan-400`,
                  activeBg: `bg-cyan-500/15 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]`,
                },
              ].map((e) => {
                let t = o[e.key];
                return (0, B.jsxs)(
                  `button`,
                  {
                    onClick: () => l(e.key),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 border text-xs font-semibold cursor-pointer ${t ? `${e.activeBg} ${e.color}` : `bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300`}`,
                    children: [
                      (0, B.jsx)(`span`, {
                        className: `w-1.5 h-1.5 rounded-full ${e.dotBg} ${t ? `animate-pulse` : `opacity-60`}`,
                      }),
                      e.label,
                    ],
                  },
                  e.key
                );
              }),
            ],
          }),
        ],
      }),
      (0, B.jsx)(`div`, {
        className: `w-full relative z-10`,
        style: { height: 280 },
        children: (0, B.jsx)(lp, {
          width: `100%`,
          height: `100%`,
          children: (0, B.jsxs)(xA, {
            data: e,
            onClick: c,
            style: { cursor: `pointer` },
            children: [
              (0, B.jsx)(`defs`, {
                children: (0, B.jsxs)(`linearGradient`, {
                  id: `healthGrad`,
                  x1: `0`,
                  y1: `0`,
                  x2: `0`,
                  y2: `1`,
                  children: [
                    (0, B.jsx)(`stop`, { offset: `0%`, stopColor: `#a855f7`, stopOpacity: 0.22 }),
                    (0, B.jsx)(`stop`, { offset: `100%`, stopColor: `#3b82f6`, stopOpacity: 0 }),
                  ],
                }),
              }),
              (0, B.jsx)(_E, {
                strokeDasharray: `3 3`,
                stroke: `var(--glass-border)`,
                vertical: !1,
              }),
              (0, B.jsx)(RD, {
                dataKey: `committed_at`,
                tickFormatter: (e) => ae(e),
                tick: { fill: `var(--color-muted)`, fontSize: 10, fontFamily: `var(--font-body)` },
                axisLine: !1,
                tickLine: !1,
                minTickGap: 40,
              }),
              (0, B.jsx)(BD, {
                domain: [0, 100],
                tick: { fill: `var(--color-muted)`, fontSize: 10, fontFamily: `var(--font-mono)` },
                axisLine: !1,
                tickLine: !1,
                width: 28,
              }),
              (0, B.jsx)(Wf, {
                content: (0, B.jsx)(SA, {}),
                cursor: { stroke: `var(--glass-border)`, strokeWidth: 1.5 },
                wrapperStyle: { zIndex: 999999, pointerEvents: `none` },
                useTranslate3d: !0,
                allowEscapeViewBox: { x: !0, y: !0 },
              }),
              (0, B.jsx)(fD, {
                type: `monotone`,
                dataKey: `health_score`,
                stroke: `rgba(167, 139, 250, 0.85)`,
                strokeWidth: 2.5,
                fill: `url(#healthGrad)`,
                dot: (e) => {
                  let t = e.payload?.health_score || 0,
                    n = e.payload?.sha === r,
                    i = I(t),
                    a = n ? 7 : 3.5;
                  return (0, B.jsxs)(
                    `g`,
                    {
                      children: [
                        n &&
                          (0, B.jsx)(`circle`, {
                            cx: e.cx || 0,
                            cy: e.cy || 0,
                            r: 12,
                            fill: i,
                            opacity: 0.16,
                            className: `animate-ping`,
                          }),
                        (0, B.jsx)(`circle`, {
                          cx: e.cx || 0,
                          cy: e.cy || 0,
                          r: a,
                          fill: n ? `#ffffff` : `rgba(10, 11, 16, 0.85)`,
                          stroke: i,
                          strokeWidth: n ? 4 : 2,
                        }),
                      ],
                    },
                    e.index
                  );
                },
              }),
              (0, B.jsx)(WE, {
                type: `monotone`,
                dataKey: `subscores.complexity_drift`,
                stroke: `#fb1`,
                strokeWidth: 1.5,
                strokeDasharray: `4 3`,
                dot: !1,
                hide: !o.complexity_drift,
                name: `Complexity Drift`,
              }),
              (0, B.jsx)(WE, {
                type: `monotone`,
                dataKey: `subscores.churn_risk`,
                stroke: `#ef4444`,
                strokeWidth: 1.5,
                strokeDasharray: `3 3`,
                dot: !1,
                hide: !o.churn_risk,
                name: `Churn Risk`,
              }),
              (0, B.jsx)(WE, {
                type: `monotone`,
                dataKey: `subscores.bus_factor_risk`,
                stroke: `#d946ef`,
                strokeWidth: 1.5,
                strokeDasharray: `4 2`,
                dot: !1,
                hide: !o.bus_factor_risk,
                name: `Bus Factor`,
              }),
              (0, B.jsx)(WE, {
                type: `monotone`,
                dataKey: `subscores.dependency_health`,
                stroke: `#10b981`,
                strokeWidth: 1.5,
                strokeDasharray: `5 3`,
                dot: !1,
                hide: !o.dependency_health,
                name: `Dependency Health`,
              }),
              (0, B.jsx)(WE, {
                type: `monotone`,
                dataKey: `subscores.semantic_drift`,
                stroke: `#06b6d4`,
                strokeWidth: 1.5,
                strokeDasharray: `3 4`,
                dot: !1,
                hide: !o.semantic_drift,
                name: `Semantic Drift`,
              }),
              (0, B.jsx)(tC, {
                dataKey: `committed_at`,
                tickFormatter: (e) => ae(e),
                height: 26,
                stroke: `var(--glass-border)`,
                fill: `var(--glass-bg)`,
                travellerWidth: 7,
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
var wA = { critical: `#dc2626`, high: `#f97316`, medium: `#eab308`, low: `#22c55e` };
function TA(e) {
  return e > 75 ? `critical` : e > 50 ? `high` : e > 25 ? `medium` : `low`;
}
function EA(e) {
  let { x: t = 0, y: n = 0, width: r = 0, height: i = 0, name: a = ``, riskScore: o = 0 } = e,
    s = TA(o),
    c = Math.max(3, Math.floor(r / 7)),
    l = a.length > c ? `${a.slice(0, c)}...` : a;
  return (0, B.jsxs)(`g`, {
    children: [
      (0, B.jsx)(`rect`, {
        x: t,
        y: n,
        width: r,
        height: i,
        fill: wA[s],
        fillOpacity: 0.86,
        stroke: `var(--color-surface)`,
        strokeWidth: 1,
        rx: 2,
      }),
      r > 44 &&
        i > 22 &&
        (0, B.jsx)(`text`, {
          x: t + r / 2,
          y: n + i / 2,
          textAnchor: `middle`,
          fill: `white`,
          fontSize: Math.min(r / 8, 11),
          fontFamily: `monospace`,
          children: l,
        }),
    ],
  });
}
function DA({ repoId: e, sha: t }) {
  let [n, r] = (0, z.useState)(0),
    i = g([`hotspots`, e, t, 50, n], () => h(e, t || void 0, 50, n)),
    a = i.data?.hotspots || [],
    o = i.data?.total ?? a.length,
    s = Math.floor(n / 50) + 1,
    c = Math.ceil(o / 50) || 1,
    l = () => {
      r((e) => Math.max(0, e - 50));
    },
    u = () => {
      n + 50 < o && r((e) => e + 50);
    },
    d = a.map((e) => ({
      name: e.file.split(`/`).pop() || e.file,
      fullPath: e.file,
      size: e.complexity * e.churn_count + 1,
      riskScore: e.risk_score,
      complexity: e.complexity,
      churnCount: e.churn_count,
      loc: e.loc,
    }));
  return (0, B.jsxs)(`section`, {
    className: `glass-panel rounded-[28px] shadow-2xl relative border border-white/10 p-5 flex flex-col gap-4`,
    children: [
      (0, B.jsx)(`div`, {
        className: `absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none`,
        children: (0, B.jsx)(`div`, {
          className: `absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px]`,
        }),
      }),
      (0, B.jsxs)(`div`, {
        className: `flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10`,
        children: [
          (0, B.jsxs)(`div`, {
            children: [
              (0, B.jsxs)(`h2`, {
                className: `font-head text-[18px] font-semibold text-white tracking-tight flex items-center gap-2`,
                children: [
                  `Complexity Churn Hotspots`,
                  o > 0 &&
                    (0, B.jsxs)(`span`, {
                      className: `text-[11px] font-mono font-normal px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300`,
                      children: [`Total: `, o],
                    }),
                ],
              }),
              (0, B.jsx)(`p`, {
                className: `text-slate-400 text-xs mt-1`,
                children: `Area represents file complexity scaled by recent churn volume`,
              }),
            ],
          }),
          (0, B.jsxs)(`div`, {
            className: `flex gap-3 text-[10px] font-bold tracking-wider uppercase font-mono`,
            children: [
              (0, B.jsxs)(`span`, {
                className: `flex items-center gap-1.5`,
                children: [
                  (0, B.jsx)(`span`, {
                    className: `w-2.5 h-2.5 rounded-full bg-red-600 border border-red-500/30`,
                  }),
                  ` Critical`,
                ],
              }),
              (0, B.jsxs)(`span`, {
                className: `flex items-center gap-1.5`,
                children: [
                  (0, B.jsx)(`span`, {
                    className: `w-2.5 h-2.5 rounded-full bg-orange-500 border border-orange-400/30`,
                  }),
                  ` High`,
                ],
              }),
              (0, B.jsxs)(`span`, {
                className: `flex items-center gap-1.5`,
                children: [
                  (0, B.jsx)(`span`, {
                    className: `w-2.5 h-2.5 rounded-full bg-yellow-500 border border-yellow-400/30`,
                  }),
                  ` Medium`,
                ],
              }),
            ],
          }),
        ],
      }),
      (0, B.jsx)(`div`, {
        className: `relative z-10`,
        style: { minHeight: 280 },
        children: i.isLoading
          ? (0, B.jsx)(`div`, {
              className: `h-[280px] flex items-center justify-center text-slate-400 font-mono text-xs animate-pulse`,
              children: `Loading hotspots...`,
            })
          : a.length === 0
            ? (0, B.jsx)(`div`, {
                className: `h-[280px] flex items-center justify-center text-slate-500 font-mono text-xs`,
                children: `No high-complexity churn hotspots found for this commit.`,
              })
            : (0, B.jsx)(lp, {
                width: `100%`,
                height: 280,
                children: (0, B.jsx)(bA, {
                  data: d,
                  dataKey: `size`,
                  aspectRatio: 4 / 3,
                  content: (0, B.jsx)(EA, {}),
                  children: (0, B.jsx)(Wf, {
                    allowEscapeViewBox: { x: !0, y: !0 },
                    content: ({ payload: e }) => {
                      if (!e?.[0]) return null;
                      let t = e[0].payload;
                      return (0, B.jsxs)(`div`, {
                        className: `glass-panel-bright rounded-[20px] p-4 text-xs shadow-2xl border border-white/10 font-sans backdrop-blur-xl`,
                        children: [
                          (0, B.jsx)(`p`, {
                            className: `font-mono text-white mb-2 max-w-[260px] truncate pb-1.5 border-b border-white/5`,
                            children: t.fullPath,
                          }),
                          (0, B.jsxs)(`div`, {
                            className: `space-y-1 font-mono text-[11px]`,
                            children: [
                              (0, B.jsxs)(`p`, {
                                className: `text-slate-400`,
                                children: [
                                  `Complexity: `,
                                  (0, B.jsx)(`span`, {
                                    className: `text-white font-bold`,
                                    children: t.complexity ?? 0,
                                  }),
                                ],
                              }),
                              (0, B.jsxs)(`p`, {
                                className: `text-slate-400`,
                                children: [
                                  `Churn count: `,
                                  (0, B.jsx)(`span`, {
                                    className: `text-white font-bold`,
                                    children: t.churnCount ?? 0,
                                  }),
                                ],
                              }),
                              (0, B.jsxs)(`p`, {
                                className: `text-slate-400`,
                                children: [
                                  `LOC: `,
                                  (0, B.jsx)(`span`, {
                                    className: `text-white font-bold`,
                                    children: t.loc ?? `—`,
                                  }),
                                ],
                              }),
                              (0, B.jsxs)(`p`, {
                                className: `text-slate-400`,
                                children: [
                                  `Risk score: `,
                                  (0, B.jsxs)(`span`, {
                                    className: `text-red-400 font-bold`,
                                    children: [t.riskScore ?? 0, `/100`],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      });
                    },
                  }),
                }),
              }),
      }),
      o > 50 &&
        (0, B.jsxs)(`div`, {
          className: `mt-4 pt-3 border-t border-white/5 flex items-center justify-between relative z-10 text-xs font-mono text-slate-400`,
          children: [
            (0, B.jsxs)(`span`, {
              children: [
                `Page `,
                s,
                ` of `,
                c,
                ` (`,
                n + 1,
                `-`,
                Math.min(n + 50, o),
                ` of `,
                o,
                `)`,
              ],
            }),
            (0, B.jsxs)(`div`, {
              className: `flex gap-2`,
              children: [
                (0, B.jsx)(`button`, {
                  onClick: l,
                  disabled: n === 0,
                  'aria-label': `Previous page`,
                  className: `px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition`,
                  children: `Previous`,
                }),
                (0, B.jsx)(`button`, {
                  onClick: u,
                  disabled: n + 50 >= o,
                  'aria-label': `Next page`,
                  className: `px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition`,
                  children: `Next`,
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
var OA = [
  { id: `all`, label: `All Time` },
  { id: `7d`, label: `Last 7 Days` },
  { id: `30d`, label: `Last 30 Days` },
  { id: `1y`, label: `Last Year` },
  { id: `custom`, label: `Custom Range` },
];
function kA({
  selectedPreset: e,
  onSelectPreset: t,
  customStartDate: n,
  customEndDate: r,
  onCustomDateChange: i,
  onReset: a,
}) {
  return (0, B.jsxs)(`div`, {
    className: `flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02] border border-white/5 p-2.5 rounded-[20px] backdrop-blur-xl`,
    children: [
      (0, B.jsxs)(`div`, {
        className: `flex items-center gap-2 px-2 text-slate-400`,
        children: [
          (0, B.jsx)(de, { className: `w-4 h-4 text-purple-400 flex-shrink-0` }),
          (0, B.jsx)(`span`, {
            className: `font-head text-[11px] font-semibold uppercase tracking-wider text-slate-300`,
            children: `Time Range`,
          }),
        ],
      }),
      (0, B.jsxs)(`div`, {
        className: `flex flex-wrap items-center gap-1.5 flex-1 justify-start sm:justify-end`,
        children: [
          OA.map((n) =>
            (0, B.jsxs)(
              `button`,
              {
                onClick: () => t(n.id),
                className: `px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 cursor-pointer ${e === n.id ? `bg-purple-500/20 text-purple-200 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]` : `bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200 hover:border-white/10`}`,
                children: [
                  n.id === `custom`
                    ? (0, B.jsx)(pe, { className: `w-3.5 h-3.5 text-purple-400` })
                    : (0, B.jsx)(Wi, { className: `w-3.5 h-3.5 opacity-60` }),
                  n.label,
                ],
              },
              n.id
            )
          ),
          (0, B.jsx)(`button`, {
            type: `button`,
            onClick: a,
            'aria-label': `Reset time range`,
            title: `Reset time range`,
            className: `p-2 rounded-full text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-slate-200 hover:border-white/10 transition-all cursor-pointer`,
            children: (0, B.jsx)(Ji, { className: `w-3.5 h-3.5` }),
          }),
        ],
      }),
      e === `custom` &&
        (0, B.jsxs)(`div`, {
          className: `flex flex-wrap items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5`,
          children: [
            (0, B.jsxs)(`div`, {
              className: `flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1`,
              children: [
                (0, B.jsx)(`span`, {
                  className: `text-[10px] font-mono font-bold text-slate-400 uppercase`,
                  children: `From:`,
                }),
                (0, B.jsx)(`input`, {
                  type: `date`,
                  value: n,
                  onChange: (e) => i(e.target.value, r),
                  className: `bg-transparent text-xs text-white font-mono focus:outline-none cursor-pointer border-none p-0`,
                  'aria-label': `Start Date`,
                }),
              ],
            }),
            (0, B.jsxs)(`div`, {
              className: `flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1`,
              children: [
                (0, B.jsx)(`span`, {
                  className: `text-[10px] font-mono font-bold text-slate-400 uppercase`,
                  children: `To:`,
                }),
                (0, B.jsx)(`input`, {
                  type: `date`,
                  value: r,
                  onChange: (e) => i(n, e.target.value),
                  className: `bg-transparent text-xs text-white font-mono focus:outline-none cursor-pointer border-none p-0`,
                  'aria-label': `End Date`,
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
function AA({ score: e, delta: t, size: n = `md` }) {
  let r = ce(e),
    i = I(e);
  return (0, B.jsxs)(`span`, {
    className: le(
      `inline-flex items-center font-mono bg-white/5 border border-white/10 shadow-lg select-none`,
      {
        sm: `text-[10px] gap-1 px-2.5 py-0.5 rounded-full`,
        md: `text-[11px] gap-1.5 px-3 py-1 rounded-full`,
        lg: `text-xs gap-2 px-4 py-1.5 rounded-full`,
      }[n]
    ),
    children: [
      (0, B.jsx)(`span`, {
        className: le(
          `rounded-full flex-shrink-0`,
          {
            excellent: ``,
            healthy: ``,
            moderate: `animate-pulse`,
            warning: `animate-pulse`,
            critical: `animate-pulse`,
            failing: `animate-pulse`,
          }[r],
          n === `sm` ? `w-1.5 h-1.5` : n === `md` ? `w-2 h-2` : `w-2.5 h-2.5`
        ),
        style: { backgroundColor: i, boxShadow: `0 0 8px ${i}` },
      }),
      (0, B.jsx)(`span`, {
        style: { color: i },
        className: `font-extrabold`,
        children: e.toFixed(0),
      }),
      t != null &&
        (0, B.jsx)(`span`, {
          className: le(`text-[9px] font-bold ml-1`, t >= 0 ? `text-emerald-400` : `text-rose-400`),
          children: t >= 0 ? `+${t.toFixed(1)}` : t.toFixed(1),
        }),
    ],
  });
}
function jA({ containerRef: e, threshold: t = 200, ariaLabel: n = `Scroll back to top` }) {
  let [r, i] = (0, z.useState)(!1);
  return (
    (0, z.useEffect)(() => {
      let n = () => {
        let n = e?.current?.scrollTop ?? 0,
          r = window.scrollY || document.documentElement.scrollTop || 0;
        i(Math.max(n, r) > t);
      };
      n();
      let r = e?.current;
      return (
        r && r.addEventListener(`scroll`, n, { passive: !0 }),
        window.addEventListener(`scroll`, n, { passive: !0 }),
        () => {
          (r && r.removeEventListener(`scroll`, n), window.removeEventListener(`scroll`, n));
        }
      );
    }, [e, t]),
    (0, B.jsx)(`button`, {
      type: `button`,
      onClick: () => {
        (e?.current && e.current.scrollTo({ top: 0, behavior: `smooth` }),
          window.scrollTo({ top: 0, behavior: `smooth` }));
      },
      'aria-label': n,
      title: n,
      'data-testid': `scroll-to-top`,
      className: `fixed bottom-6 right-6 z-50 p-3 rounded-full transition-all duration-300 transform backdrop-blur-md shadow-2xl border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${r ? `opacity-100 scale-100 pointer-events-auto bg-purple-950/80 hover:bg-purple-900/90 border-purple-500/30 text-purple-200 hover:text-white shadow-purple-950/50 hover:scale-110 active:scale-95` : `opacity-0 scale-75 pointer-events-none bg-purple-950/0 border-transparent text-transparent`}`,
      children: (0, B.jsx)(Hi, { className: `w-5 h-5 stroke-[2.5]` }),
    })
  );
}
function MA() {
  let { repoSlug: t = `` } = e(),
    r = n(),
    i = (0, z.useRef)(null),
    [a, o] = (0, z.useState)(null),
    [s, h] = (0, z.useState)(!1),
    [v, y] = (0, z.useState)(`all`),
    [b, x] = (0, z.useState)(``),
    [S, C] = (0, z.useState)(``),
    { startDate: w, endDate: T } = (0, z.useMemo)(() => {
      if (v === `all`) return { startDate: void 0, endDate: void 0 };
      if (v === `custom`)
        return {
          startDate: b ? new Date(b).toISOString() : void 0,
          endDate: S ? new Date(`${S}T23:59:59.999Z`).toISOString() : void 0,
        };
      let e = new Date(),
        t;
      if (v === `7d`) t = new Date(e.getTime() - 10080 * 60 * 1e3);
      else if (v === `30d`) t = new Date(e.getTime() - 720 * 60 * 60 * 1e3);
      else if (v === `1y`) t = new Date(e.getTime() - 365 * 24 * 60 * 60 * 1e3);
      else return { startDate: void 0, endDate: void 0 };
      return { startDate: t.toISOString(), endDate: e.toISOString() };
    }, [v, b, S]),
    [D, O] = (0, z.useState)(!1),
    [k, N] = (0, z.useState)(null),
    [P, F] = (0, z.useState)(null),
    te = () => {
      (y(`all`), x(``), C(``));
    },
    ne = g(t ? [`repo`, t] : null, () => l(t)),
    ae = ne.data,
    I = ae?.id,
    oe = g(I ? [`timeline`, I, w, T] : null, () => m(I, w, T)),
    ce = (0, z.useMemo)(() => oe.data || [], [oe.data]),
    le = g(I ? [`bus-factor`, I] : null, () => p(I)),
    ue = g(I && a ? [`graph`, I, a.sha] : null, () => u(I, a?.sha)),
    de = g(I ? [`llm-usage`, I] : null, () => d(I)),
    fe = async () => {
      if (!(!I || D)) {
        (O(!0), N(`Initiating rescan...`), F(null));
        try {
          await f(I);
          let e = c(I);
          ((e.onmessage = (t) => {
            try {
              let n = JSON.parse(t.data);
              (n.stage && N(n.stage),
                (n.status === `ready` || n.status === `error` || n.status === `cancelled`) &&
                  (e.close(),
                  O(!1),
                  N(null),
                  n.status === `error`
                    ? F(n.error_message || `Rescan failed.`)
                    : (ne.mutate(), oe.mutate(), le.mutate(), ue.mutate(), de.mutate())));
            } catch {}
          }),
            (e.onerror = () => {
              (e.close(), O(!1), N(null));
            }));
        } catch (e) {
          (O(!1), N(null), F(e instanceof Error ? e.message : `Rescan request failed.`));
        }
      }
    },
    pe = a ? Math.min(Math.max(a.churn_rate * 100, 0), 100) : 0,
    me = a?.risk_reasons?.slice(0, 4) || [],
    he = a?.persistent_hotspots?.slice(0, 3) || [];
  if (
    ((0, z.useEffect)(() => {
      if (!ce.length) {
        o(null);
        return;
      }
      let e = (a ? ce.find((e) => e.sha === a.sha) : null) || ce[ce.length - 1];
      a !== e && o(e);
    }, [ce, a]),
    ne.isLoading)
  )
    return (0, B.jsxs)(`div`, {
      className: `min-h-screen bg-[#07080d] flex flex-col items-center justify-center gap-4 text-slate-300`,
      children: [
        (0, B.jsx)(E, { className: `w-8 h-8 text-purple-400 animate-spin` }),
        (0, B.jsx)(`span`, {
          className: `text-sm font-medium animate-pulse`,
          children: `Initializing spatial dashboard workspace...`,
        }),
      ],
    });
  if (ne.error || !ae)
    return (0, B.jsx)(`div`, {
      className: `min-h-screen bg-[#07080d] flex items-center justify-center p-6`,
      children: (0, B.jsxs)(`div`, {
        className: `glass-panel rounded-[28px] p-8 max-w-md text-center border border-white/10 shadow-2xl space-y-4`,
        children: [
          (0, B.jsx)(`div`, {
            className: `w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto`,
            children: (0, B.jsx)(`span`, { className: `text-rose-400 text-lg`, children: `✕` }),
          }),
          (0, B.jsx)(`h3`, {
            className: `font-head text-[18px] font-semibold text-white`,
            children: `Repository Not Loaded`,
          }),
          (0, B.jsx)(`p`, {
            className: `text-slate-400 text-xs leading-relaxed`,
            children: `The requested repository slug could not be verified or loaded into the active environment workspace.`,
          }),
          (0, B.jsx)(`button`, {
            onClick: () => r(`/`),
            className: `liquid-button px-5 py-2.5 rounded-full text-xs font-semibold text-white tracking-wide shadow-lg w-full`,
            children: `Return to Home`,
          }),
        ],
      }),
    });
  let L = ce.length ? ce[ce.length - 1].health_score : 0;
  return (0, B.jsxs)(`div`, {
    className: `min-h-screen bg-transparent flex flex-col relative z-10 font-body`,
    children: [
      (0, B.jsx)(`div`, {
        className: `w-full fixed top-0 left-0 right-0 z-50 select-none pointer-events-none px-4 sm:px-6 pt-4`,
        children: (0, B.jsxs)(`nav`, {
          className: `glass-panel rounded-full h-16 px-6 flex items-center justify-between shadow-2xl pointer-events-auto`,
          children: [
            (0, B.jsxs)(`div`, {
              className: `flex items-center gap-4 min-w-0`,
              children: [
                (0, B.jsx)(`button`, {
                  onClick: () => h(!0),
                  className: `md:hidden p-2 -ml-1 text-slate-300 hover:text-white bg-white/5 rounded-full border border-white/5 flex-shrink-0`,
                  'aria-label': `Open sidebar`,
                  children: (0, B.jsx)(`svg`, {
                    className: `w-4.5 h-4.5`,
                    fill: `none`,
                    stroke: `currentColor`,
                    viewBox: `0 0 24 24`,
                    children: (0, B.jsx)(`path`, {
                      strokeLinecap: `round`,
                      strokeLinejoin: `round`,
                      strokeWidth: 2,
                      d: `M4 6h16M4 12h16M4 18h16`,
                    }),
                  }),
                }),
                (0, B.jsxs)(`button`, {
                  onClick: () => r(`/`),
                  className: `font-head text-[18px] font-bold text-white tracking-tight hover:opacity-80 transition-opacity hidden sm:flex items-center gap-2`,
                  children: [(0, B.jsx)(ee, { className: `w-5 h-5 text-purple-400` }), `CommitIQ`],
                }),
                (0, B.jsx)(`span`, { className: `text-white/10 hidden sm:block`, children: `/` }),
                (0, B.jsxs)(`div`, {
                  className: `flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full max-w-[150px] sm:max-w-[240px]`,
                  children: [
                    (0, B.jsx)(Ki, { className: `w-3.5 h-3.5 text-purple-300 flex-shrink-0` }),
                    (0, B.jsx)(`span`, {
                      className: `font-mono text-xs text-slate-200 font-semibold truncate select-all`,
                      children: ae.name,
                    }),
                  ],
                }),
                (0, B.jsx)(AA, { score: L, size: `md` }),
              ],
            }),
            (0, B.jsxs)(`div`, {
              className: `flex items-center gap-3`,
              children: [
                (0, B.jsx)(_, {}),
                (0, B.jsxs)(`button`, {
                  onClick: fe,
                  disabled: D,
                  className: `text-xs font-semibold text-purple-200 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 transition-all flex items-center gap-1.5 disabled:opacity-50`,
                  title: `Check for new remote commits and update metrics without wiping historical data`,
                  children: [
                    (0, B.jsx)(ie, {
                      className: `w-3.5 h-3.5 ${D ? `animate-spin text-purple-400` : ``}`,
                    }),
                    (0, B.jsx)(`span`, { children: D ? k || `Updating...` : `Update Analysis` }),
                  ],
                }),
                (0, B.jsx)(`button`, {
                  onClick: () => r(`/`),
                  className: `text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all`,
                  children: `New Repository`,
                }),
              ],
            }),
          ],
        }),
      }),
      (0, B.jsxs)(`div`, {
        className: `flex flex-1 overflow-hidden relative pt-[88px]`,
        children: [
          s &&
            (0, B.jsx)(`div`, {
              onClick: () => h(!1),
              className: `fixed inset-0 bg-black/65 z-35 md:hidden transition-opacity duration-300 backdrop-blur-sm`,
            }),
          (0, B.jsxs)(`aside`, {
            className: `w-80 flex-shrink-0 flex flex-col overflow-hidden bg-[#0a0b10]/40 backdrop-blur-2xl transition-transform duration-300 ease-in-out z-40 border-r border-white/5
          fixed md:static inset-y-0 left-0 pt-[88px] md:pt-0
          ${s ? `translate-x-0` : `-translate-x-full md:translate-x-0`}
        `,
            children: [
              (0, B.jsxs)(`div`, {
                className: `p-5 border-b border-white/5 flex items-center justify-between`,
                children: [
                  (0, B.jsxs)(`div`, {
                    className: `min-w-0 flex-1`,
                    children: [
                      (0, B.jsx)(`div`, {
                        className: `font-mono text-xs font-bold text-white truncate`,
                        children: ae.name,
                      }),
                      (0, B.jsxs)(`div`, {
                        className: `text-slate-400 text-[10px] mt-1 font-semibold uppercase tracking-wider`,
                        children: [
                          ae.analyzed_commits,
                          ` commits compiled • `,
                          ae.active_contributors_count ?? 0,
                          ` active contributors`,
                        ],
                      }),
                    ],
                  }),
                  (0, B.jsx)(`button`, {
                    onClick: () => h(!1),
                    className: `md:hidden p-1.5 -mr-1.5 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors`,
                    'aria-label': `Close sidebar`,
                    children: (0, B.jsx)(`svg`, {
                      className: `w-4 h-4`,
                      fill: `none`,
                      stroke: `currentColor`,
                      viewBox: `0 0 24 24`,
                      children: (0, B.jsx)(`path`, {
                        strokeLinecap: `round`,
                        strokeLinejoin: `round`,
                        strokeWidth: 2,
                        d: `M6 18L18 6M6 6l12 12`,
                      }),
                    }),
                  }),
                ],
              }),
              (0, B.jsx)(`div`, {
                className: `p-5 border-b border-white/5 bg-white/[0.01]`,
                children: (0, B.jsx)($i, {
                  usage: de.data,
                  loading: de.isLoading,
                  error: de.error?.message,
                }),
              }),
              (0, B.jsx)(`div`, {
                className: `flex-grow overflow-hidden pt-5`,
                children: (0, B.jsx)(Qi, {
                  commits: ce,
                  repoSlug: ae.repo_slug,
                  selectedSha: a?.sha || null,
                  onSelect: (e) => {
                    (o(e), h(!1));
                  },
                }),
              }),
            ],
          }),
          (0, B.jsxs)(`main`, {
            ref: i,
            className: `flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 relative z-10`,
            children: [
              P &&
                (0, B.jsxs)(`div`, {
                  className: `glass-panel rounded-[20px] p-4 text-rose-300 border border-rose-500/30 bg-rose-500/10 flex items-center justify-between text-xs font-medium`,
                  children: [
                    (0, B.jsxs)(`span`, {
                      children: [`Failed to update repository analysis: `, P],
                    }),
                    (0, B.jsx)(`button`, {
                      onClick: () => F(null),
                      className: `text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5`,
                      children: `Dismiss`,
                    }),
                  ],
                }),
              (0, B.jsx)(kA, {
                selectedPreset: v,
                onSelectPreset: y,
                customStartDate: b,
                customEndDate: S,
                onCustomDateChange: (e, t) => {
                  (x(e), C(t));
                },
                onReset: te,
              }),
              oe.isLoading
                ? (0, B.jsxs)(`div`, {
                    className: `glass-panel rounded-[28px] p-6 h-64 flex items-center justify-center text-slate-400 border border-white/10`,
                    children: [
                      (0, B.jsx)(E, { className: `w-6 h-6 text-purple-400 animate-spin mr-2` }),
                      (0, B.jsx)(`span`, {
                        className: `text-xs font-medium animate-pulse`,
                        children: `Loading health timeline...`,
                      }),
                    ],
                  })
                : oe.error
                  ? (0, B.jsx)(`div`, {
                      className: `glass-panel rounded-[28px] p-6 text-rose-300 border border-rose-500/20 bg-rose-500/10`,
                      children: `Could not load architectural health timeline datasets.`,
                    })
                  : ce.length === 0
                    ? (0, B.jsx)(`div`, {
                        className: `glass-panel rounded-[28px] p-6 text-slate-500`,
                        children: `No analyzed commits are currently compiled for this repository workspace.`,
                      })
                    : (0, B.jsx)(CA, {
                        commits: ce,
                        repoSlug: ae.repo_slug,
                        selectedSha: a?.sha,
                        onSelectCommit: o,
                      }),
              a &&
                (0, B.jsxs)(`div`, {
                  className: `glass-panel rounded-[28px] p-6 shadow-2xl relative border border-white/10 overflow-hidden`,
                  children: [
                    (0, B.jsx)(`div`, {
                      className: `absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none`,
                    }),
                    (0, B.jsxs)(`div`, {
                      className: `flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 mb-5 gap-4`,
                      children: [
                        (0, B.jsxs)(`div`, {
                          className: `min-w-0`,
                          children: [
                            (0, B.jsx)(`span`, {
                              className: `font-mono text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/15`,
                              children: a.sha.slice(0, 12),
                            }),
                            (0, B.jsx)(`h3`, {
                              className: `font-head text-[18px] font-semibold text-white tracking-tight truncate mt-2`,
                              children: se(a.message),
                            }),
                          ],
                        }),
                        (0, B.jsx)(`button`, {
                          onClick: () => r(`/dashboard/${ae.repo_slug}/commit/${a.sha}`),
                          className: `text-xs font-bold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/15 rounded-full px-4.5 py-2 transition-all flex-shrink-0`,
                          children: `Inspect Snapshot Details`,
                        }),
                      ],
                    }),
                    (0, B.jsx)(`div`, {
                      className: `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4`,
                      children: [
                        {
                          label: `Codebase Complexity`,
                          value: a.avg_complexity === 0 ? `-` : a.avg_complexity.toFixed(1),
                          unit: a.avg_complexity === 0 ? `no code changed` : `Avg cyclomatic score`,
                          icon: (0, B.jsx)(Ui, { className: `w-4.5 h-4.5 text-rose-400` }),
                        },
                        {
                          label: `Commit Churn`,
                          value: `${pe.toFixed(0)}%`,
                          unit: `${a.num_files_changed} modified components`,
                          icon: (0, B.jsx)(E, { className: `w-4.5 h-4.5 text-sky-400` }),
                        },
                        {
                          label: `Minimum Bus Factor`,
                          value: String(a.bus_factor_min),
                          unit: `Crucial owners limit`,
                          icon: (0, B.jsx)(A, { className: `w-4.5 h-4.5 text-emerald-400` }),
                        },
                        {
                          label: `Semantic Drift`,
                          value: `${(a.subscores?.semantic_drift ?? a.semantic_health_score ?? 100).toFixed(0)}`,
                          unit: `${a.avg_semantic_drift?.toFixed(2) ?? `0.00`} avg drift`,
                          badge:
                            a.semantic_drift_method === `graphcodebert` ? `GraphCodeBERT` : void 0,
                          icon: (0, B.jsx)(ee, { className: `w-4.5 h-4.5 text-purple-400` }),
                        },
                      ].map((e) =>
                        (0, B.jsxs)(
                          `div`,
                          {
                            className: `bg-white/5 border border-white/5 hover:border-white/10 rounded-[20px] p-5 transition-all shadow-inner`,
                            children: [
                              (0, B.jsxs)(`div`, {
                                className: `flex items-center justify-between mb-2`,
                                children: [
                                  (0, B.jsxs)(`div`, {
                                    className: `flex items-center gap-2`,
                                    children: [
                                      (0, B.jsx)(`span`, {
                                        className: `font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider`,
                                        children: e.label,
                                      }),
                                      e.badge &&
                                        (0, B.jsxs)(`span`, {
                                          className: `inline-flex items-center gap-1 text-[8px] px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono uppercase`,
                                          children: [
                                            (0, B.jsx)(`span`, {
                                              className: `w-1 h-1 rounded-full bg-purple-400`,
                                            }),
                                            e.badge,
                                          ],
                                        }),
                                    ],
                                  }),
                                  e.icon,
                                ],
                              }),
                              (0, B.jsx)(`div`, {
                                className: `font-head text-[36px] font-extralight text-white tracking-tight Outfit`,
                                children: e.value,
                              }),
                              (0, B.jsx)(`div`, {
                                className: `text-slate-500 text-[11px] font-medium mt-1`,
                                children: e.unit,
                              }),
                            ],
                          },
                          e.label
                        )
                      ),
                    }),
                    (me.length > 0 || he.length > 0) &&
                      (0, B.jsxs)(`div`, {
                        className: `mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4`,
                        children: [
                          me.length > 0 &&
                            (0, B.jsxs)(`div`, {
                              className: `border border-white/5 bg-white/[0.03] rounded-[20px] p-4`,
                              children: [
                                (0, B.jsx)(`div`, {
                                  className: `font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-3`,
                                  children: `Top Risk Reasons`,
                                }),
                                (0, B.jsx)(`div`, {
                                  className: `space-y-2`,
                                  children: me.map((e) =>
                                    (0, B.jsxs)(
                                      `div`,
                                      {
                                        className: `flex items-start justify-between gap-3 text-xs`,
                                        children: [
                                          (0, B.jsxs)(`div`, {
                                            className: `min-w-0`,
                                            children: [
                                              (0, B.jsx)(`div`, {
                                                className: `text-slate-100 font-semibold`,
                                                children: e.label,
                                              }),
                                              (0, B.jsx)(`div`, {
                                                className: `text-slate-500 leading-relaxed mt-0.5`,
                                                children: e.detail,
                                              }),
                                            ],
                                          }),
                                          (0, B.jsx)(`span`, {
                                            className: `flex-shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase border ${e.severity === `critical` ? `bg-rose-500/10 text-rose-300 border-rose-500/20` : e.severity === `high` ? `bg-orange-500/10 text-orange-300 border-orange-500/20` : `bg-amber-500/10 text-amber-300 border-amber-500/20`}`,
                                            children: e.severity,
                                          }),
                                        ],
                                      },
                                      `${e.code}-${e.label}`
                                    )
                                  ),
                                }),
                              ],
                            }),
                          he.length > 0 &&
                            (0, B.jsxs)(`div`, {
                              className: `border border-white/5 bg-white/[0.03] rounded-[20px] p-4`,
                              children: [
                                (0, B.jsxs)(`div`, {
                                  className: `flex items-center justify-between gap-3 mb-3`,
                                  children: [
                                    (0, B.jsx)(`div`, {
                                      className: `font-head text-[10px] text-slate-400 font-semibold uppercase tracking-wider`,
                                      children: `Persistent Hotspots`,
                                    }),
                                    (0, B.jsxs)(`span`, {
                                      className: `font-mono text-[10px] text-purple-300`,
                                      children: [
                                        (a.hotspot_persistence_score || 0).toFixed(0),
                                        `/100`,
                                      ],
                                    }),
                                  ],
                                }),
                                (0, B.jsx)(`div`, {
                                  className: `space-y-2`,
                                  children: he.map((e) =>
                                    (0, B.jsxs)(
                                      `div`,
                                      {
                                        className: `flex items-center justify-between gap-3 text-xs`,
                                        children: [
                                          (0, B.jsx)(`span`, {
                                            className: `font-mono text-slate-200 truncate min-w-0`,
                                            children: e.path,
                                          }),
                                          (0, B.jsxs)(`span`, {
                                            className: `flex-shrink-0 text-slate-500`,
                                            children: [
                                              e.recent_commit_count,
                                              ` commits / cx `,
                                              e.complexity.toFixed(1),
                                            ],
                                          }),
                                        ],
                                      },
                                      e.path
                                    )
                                  ),
                                }),
                              ],
                            }),
                        ],
                      }),
                    (0, B.jsx)(`div`, {
                      className: `mt-4`,
                      children: (0, B.jsx)(j, { repoId: I, commitSha: a.sha }),
                    }),
                  ],
                }),
              (0, B.jsx)(`div`, {
                className: `w-full`,
                children: ue.error
                  ? (0, B.jsx)(`div`, {
                      className: `glass-panel rounded-[28px] p-6 text-rose-300 border border-rose-500/20 bg-rose-500/10`,
                      children: `Could not construct software import dependency landscape.`,
                    })
                  : (0, B.jsx)(re, {
                      graphData: ue.data,
                      selectedSha: a?.sha || null,
                      commits: ce,
                      onSelectCommit: o,
                    }),
              }),
              (0, B.jsxs)(`div`, {
                className: `grid grid-cols-1 lg:grid-cols-2 gap-6 items-start`,
                children: [
                  le.error
                    ? (0, B.jsx)(`div`, {
                        className: `glass-panel rounded-[28px] p-6 text-rose-300 border border-rose-500/20 bg-rose-500/10`,
                        children: `Could not retrieve module ownership datasets.`,
                      })
                    : (0, B.jsxs)(`div`, {
                        children: [
                          (0, B.jsx)(Zi, { modules: le.data?.modules || [] }),
                          (a?.bus_factor_min === 1 ||
                            (le.data?.modules &&
                              le.data.modules.some((e) => e.contributor_count === 1))) &&
                            (0, B.jsxs)(`div`, {
                              'data-testid': `bus-factor-warning`,
                              className: `mt-4 p-4 rounded-[20px] bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3 text-xs shadow-lg backdrop-blur-xl`,
                              children: [
                                (0, B.jsx)(M, {
                                  className: `w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5`,
                                }),
                                (0, B.jsxs)(`div`, {
                                  children: [
                                    (0, B.jsx)(`span`, {
                                      className: `font-head font-semibold text-amber-300 block text-xs mb-0.5 uppercase tracking-wider`,
                                      children: `Single Point of Failure Warning`,
                                    }),
                                    (0, B.jsxs)(`p`, {
                                      className: `text-slate-300 leading-relaxed text-[11px]`,
                                      children: [
                                        `The computed minimum bus factor for this repository is `,
                                        (0, B.jsx)(`strong`, { children: `1` }),
                                        `. Key modules depend entirely on a single principal contributor, leaving the repository vulnerable to a single-point-of-failure if that contributor becomes unavailable.`,
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                  I && (0, B.jsx)(DA, { repoId: I, sha: a?.sha || null, startDate: w, endDate: T }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, B.jsx)(jA, { containerRef: i }),
    ],
  });
}
export { MA as default };
