import { l as e, o as t, s as n, t as r } from './index-4N9WolXG.js';
var i = n((e) => {
    var n = t();
    function r(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var i = typeof Object.is == `function` ? Object.is : r,
      a = n.useState,
      o = n.useEffect,
      s = n.useLayoutEffect,
      c = n.useDebugValue;
    function l(e, t) {
      var n = t(),
        r = a({ inst: { value: n, getSnapshot: t } }),
        i = r[0].inst,
        l = r[1];
      return (
        s(
          function () {
            ((i.value = n), (i.getSnapshot = t), u(i) && l({ inst: i }));
          },
          [e, n, t]
        ),
        o(
          function () {
            return (
              u(i) && l({ inst: i }),
              e(function () {
                u(i) && l({ inst: i });
              })
            );
          },
          [e]
        ),
        c(n),
        n
      );
    }
    function u(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !i(e, n);
      } catch {
        return !0;
      }
    }
    function d(e, t) {
      return t();
    }
    var f =
      typeof window > `u` || window.document === void 0 || window.document.createElement === void 0
        ? d
        : l;
    e.useSyncExternalStore = n.useSyncExternalStore === void 0 ? f : n.useSyncExternalStore;
  }),
  a = n((e, t) => {
    t.exports = i();
  })(),
  o = e(t(), 1),
  s = () => {},
  c = Object,
  l = (e) => e === void 0,
  u = (e) => typeof e == `function`,
  d = (e, t) => ({ ...e, ...t }),
  f = (e) => u(e.then),
  p = new WeakMap(),
  m = 0,
  h = (e) => {
    let t = typeof e,
      n = e && e.constructor,
      r = n == Date,
      i,
      a;
    if (c(e) === e && !r && n != RegExp) {
      if (((i = p.get(e)), i)) return i;
      if (((i = ++m + `~`), p.set(e, i), n == Array)) {
        for (i = `@`, a = 0; a < e.length; a++) i += h(e[a]) + `,`;
        p.set(e, i);
      }
      if (n == c) {
        i = `#`;
        let t = c.keys(e).sort();
        for (; !l((a = t.pop()));) l(e[a]) || (i += a + `:` + h(e[a]) + `,`);
        p.set(e, i);
      }
    } else
      i = r
        ? e.toJSON()
        : t == `symbol`
          ? e.toString()
          : t == `string`
            ? JSON.stringify(e)
            : `` + e;
    return i;
  },
  g = new WeakMap(),
  _ = {},
  v = {},
  y = `undefined`,
  b = typeof window != y,
  x = typeof document != y,
  S = () => b && typeof window.requestAnimationFrame != y,
  ee = (e, t) => {
    let n = g.get(e);
    return [
      () => (!l(t) && e.get(t)) || _,
      (r) => {
        if (!l(t)) {
          let i = e.get(t);
          (t in v || (v[t] = i), n[5](t, d(i, r), i || _));
        }
      },
      n[6],
      () => (!l(t) && t in v ? v[t] : (!l(t) && e.get(t)) || _),
    ];
  },
  C = !0,
  w = () => C,
  [T, E] =
    b && window.addEventListener
      ? [window.addEventListener.bind(window), window.removeEventListener.bind(window)]
      : [s, s],
  D = () => {
    let e = x && document.visibilityState;
    return l(e) || e !== `hidden`;
  },
  O = (e) => (
    x && document.addEventListener(`visibilitychange`, e),
    T(`focus`, e),
    () => {
      (x && document.removeEventListener(`visibilitychange`, e), E(`focus`, e));
    }
  ),
  k = (e) => {
    let t = () => {
        ((C = !0), e());
      },
      n = () => {
        C = !1;
      };
    return (
      T(`online`, t),
      T(`offline`, n),
      () => {
        (E(`online`, t), E(`offline`, n));
      }
    );
  },
  A = { isOnline: w, isVisible: D },
  j = { initFocus: O, initReconnect: k },
  te = !o.useId,
  M = !b || `Deno` in window,
  ne = (e) => (S() ? window.requestAnimationFrame(e) : setTimeout(e, 1)),
  N = M ? o.useEffect : o.useLayoutEffect,
  P = typeof navigator < `u` && navigator.connection,
  F = !M && P && ([`slow-2g`, `2g`].includes(P.effectiveType) || P.saveData),
  I = (e) => {
    if (u(e))
      try {
        e = e();
      } catch {
        e = ``;
      }
    let t = e;
    return ((e = typeof e == `string` ? e : (Array.isArray(e) ? e.length : e) ? h(e) : ``), [e, t]);
  },
  re = 0,
  L = () => ++re,
  ie = 0,
  R = 1,
  z = 2,
  B = {
    __proto__: null,
    ERROR_REVALIDATE_EVENT: 3,
    FOCUS_EVENT: ie,
    MUTATE_EVENT: z,
    RECONNECT_EVENT: R,
  };
async function ae(...e) {
  let [t, n, r, i] = e,
    a = d(
      { populateCache: !0, throwOnError: !0 },
      typeof i == `boolean` ? { revalidate: i } : i || {}
    ),
    o = a.populateCache,
    s = a.rollbackOnError,
    c = a.optimisticData,
    p = (e) => (typeof s == `function` ? s(e) : s !== !1),
    m = a.throwOnError;
  if (u(n)) {
    let e = n,
      r = [],
      i = t.keys();
    for (let n of i) !/^\$(inf|sub)\$/.test(n) && e(t.get(n)._k) && r.push(n);
    return Promise.all(r.map(h));
  }
  return h(n);
  async function h(n) {
    let [i] = I(n);
    if (!i) return;
    let [s, d] = ee(t, i),
      [h, _, v, y] = g.get(t),
      b = () => {
        let e = h[i];
        return (u(a.revalidate) ? a.revalidate(s().data, n) : a.revalidate !== !1) &&
          (delete v[i], delete y[i], e && e[0])
          ? e[0](z).then(() => s().data)
          : s().data;
      };
    if (e.length < 3) return b();
    let x = r,
      S,
      C = L();
    _[i] = [C, 0];
    let w = !l(c),
      T = s(),
      E = T.data,
      D = T._c,
      O = l(D) ? E : D;
    if ((w && ((c = u(c) ? c(O, E) : c), d({ data: c, _c: O })), u(x)))
      try {
        x = x(O);
      } catch (e) {
        S = e;
      }
    if (x && f(x))
      if (
        ((x = await x.catch((e) => {
          S = e;
        })),
        C !== _[i][0])
      ) {
        if (S) throw S;
        return x;
      } else S && w && p(S) && ((o = !0), d({ data: O, _c: void 0 }));
    if (
      (o &&
        (S ||
          (u(o)
            ? d({ data: o(x, O), error: void 0, _c: void 0 })
            : d({ data: x, error: void 0, _c: void 0 }))),
      (_[i][1] = L()),
      Promise.resolve(b()).then(() => {
        d({ _c: void 0 });
      }),
      S)
    ) {
      if (m) throw S;
      return;
    }
    return x;
  }
}
var V = (e, t) => {
    for (let n in e) e[n][0] && e[n][0](t);
  },
  H = (e, t) => {
    if (!g.has(e)) {
      let n = d(j, t),
        r = {},
        i = ae.bind(void 0, e),
        a = s,
        o = {},
        c = (e, t) => {
          let n = o[e] || [];
          return ((o[e] = n), n.push(t), () => n.splice(n.indexOf(t), 1));
        },
        l = (t, n, r) => {
          e.set(t, n);
          let i = o[t];
          if (i) for (let e of i) e(n, r);
        },
        u = () => {
          if (!g.has(e) && (g.set(e, [r, {}, {}, {}, i, l, c]), !M)) {
            let t = n.initFocus(setTimeout.bind(void 0, V.bind(void 0, r, ie))),
              i = n.initReconnect(setTimeout.bind(void 0, V.bind(void 0, r, R)));
            a = () => {
              (t && t(), i && i(), g.delete(e));
            };
          }
        };
      return (u(), [e, i, u, a]);
    }
    return [e, g.get(e)[4]];
  },
  U = (e, t, n, r, i) => {
    let a = n.errorRetryCount,
      o = i.retryCount,
      s = ~~((Math.random() + 0.5) * (1 << (o < 8 ? o : 8))) * n.errorRetryInterval;
    (!l(a) && o > a) || setTimeout(r, s, i);
  },
  W = (e, t) => h(e) == h(t),
  [G, K] = H(new Map()),
  q = d(
    {
      onLoadingSlow: s,
      onSuccess: s,
      onError: s,
      onErrorRetry: U,
      onDiscarded: s,
      revalidateOnFocus: !0,
      revalidateOnReconnect: !0,
      revalidateIfStale: !0,
      shouldRetryOnError: !0,
      errorRetryInterval: F ? 1e4 : 5e3,
      focusThrottleInterval: 5 * 1e3,
      dedupingInterval: 2 * 1e3,
      loadingTimeout: F ? 5e3 : 3e3,
      compare: W,
      isPaused: () => !1,
      cache: G,
      mutate: K,
      fallback: {},
    },
    A
  ),
  J = (e, t) => {
    let n = d(e, t);
    if (t) {
      let { use: r, fallback: i } = e,
        { use: a, fallback: o } = t;
      (r && a && (n.use = r.concat(a)), i && o && (n.fallback = d(i, o)));
    }
    return n;
  },
  Y = (0, o.createContext)({}),
  X = (e) => {
    let { value: t } = e,
      n = (0, o.useContext)(Y),
      r = u(t),
      i = (0, o.useMemo)(() => (r ? t(n) : t), [r, n, t]),
      a = (0, o.useMemo)(() => (r ? i : J(n, i)), [r, n, i]),
      s = i && i.provider,
      c = (0, o.useRef)(void 0);
    s && !c.current && (c.current = H(s(a.cache || G), i));
    let l = c.current;
    return (
      l && ((a.cache = l[0]), (a.mutate = l[1])),
      N(() => {
        if (l) return (l[2] && l[2](), l[3]);
      }, []),
      (0, o.createElement)(Y.Provider, d(e, { value: a }))
    );
  },
  Z = b && window.__SWR_DEVTOOLS_USE__,
  oe = Z ? window.__SWR_DEVTOOLS_USE__ : [],
  se = () => {
    Z && (window.__SWR_DEVTOOLS_REACT__ = o.default);
  },
  ce = (e) =>
    u(e[1]) ? [e[0], e[1], e[2] || {}] : [e[0], null, (e[1] === null ? e[2] : e[1]) || {}],
  Q = () => d(q, (0, o.useContext)(Y)),
  le = oe.concat(
    (e) => (t, n, r) =>
      e(
        t,
        n &&
          ((...e) => {
            let [r] = I(t),
              [, , , i] = g.get(G);
            if (r.startsWith(`$inf$`)) return n(...e);
            let a = i[r];
            return l(a) ? n(...e) : (delete i[r], a);
          }),
        r
      )
  ),
  ue = (e) =>
    function (...t) {
      let n = Q(),
        [r, i, a] = ce(t),
        o = J(n, a),
        s = e,
        { use: c } = o,
        l = (c || []).concat(le);
      for (let e = l.length; e--;) s = l[e](s);
      return s(r, i || o.fetcher || null, o);
    },
  de = (e, t, n) => {
    let r = t[e] || (t[e] = []);
    return (
      r.push(n),
      () => {
        let e = r.indexOf(n);
        e >= 0 && ((r[e] = r[r.length - 1]), r.pop());
      }
    );
  };
se();
var fe =
    o.default.use ||
    ((e) => {
      if (e.status === `pending`) throw e;
      if (e.status === `fulfilled`) return e.value;
      throw e.status === `rejected`
        ? e.reason
        : ((e.status = `pending`),
          e.then(
            (t) => {
              ((e.status = `fulfilled`), (e.value = t));
            },
            (t) => {
              ((e.status = `rejected`), (e.reason = t));
            }
          ),
          e);
    }),
  pe = { dedupe: !0 },
  me = (e, t, n) => {
    let {
        cache: r,
        compare: i,
        suspense: s,
        fallbackData: c,
        revalidateOnMount: f,
        revalidateIfStale: p,
        refreshInterval: m,
        refreshWhenHidden: h,
        refreshWhenOffline: _,
        keepPreviousData: v,
      } = n,
      [y, b, x, S] = g.get(r),
      [C, w] = I(e),
      T = (0, o.useRef)(!1),
      E = (0, o.useRef)(!1),
      D = (0, o.useRef)(C),
      O = (0, o.useRef)(t),
      k = (0, o.useRef)(n),
      A = () => k.current,
      j = () => A().isVisible() && A().isOnline(),
      [P, F, re, ie] = ee(r, C),
      R = (0, o.useRef)({}).current,
      z = l(c) ? n.fallback[C] : c,
      V = (e, t) => {
        for (let n in R) {
          let r = n;
          if (r === `data`) {
            if (!i(e[r], t[r]) && (!l(e[r]) || !i(X, t[r]))) return !1;
          } else if (t[r] !== e[r]) return !1;
        }
        return !0;
      },
      H = (0, o.useMemo)(() => {
        let e = !C || !t ? !1 : l(f) ? (A().isPaused() || s ? !1 : l(p) ? !0 : p) : f,
          n = (t) => {
            let n = d(t);
            return (delete n._k, e ? { isValidating: !0, isLoading: !0, ...n } : n);
          },
          r = P(),
          i = ie(),
          a = n(r),
          o = r === i ? a : n(i),
          c = a;
        return [
          () => {
            let e = n(P());
            return V(e, c)
              ? ((c.data = e.data),
                (c.isLoading = e.isLoading),
                (c.isValidating = e.isValidating),
                (c.error = e.error),
                c)
              : ((c = e), e);
          },
          () => o,
        ];
      }, [r, C]),
      U = (0, a.useSyncExternalStore)(
        (0, o.useCallback)(
          (e) =>
            re(C, (t, n) => {
              V(n, t) || e();
            }),
          [r, C]
        ),
        H[0],
        H[1]
      ),
      W = !T.current,
      G = y[C] && y[C].length > 0,
      K = U.data,
      q = l(K) ? z : K,
      J = U.error,
      Y = (0, o.useRef)(q),
      X = v ? (l(K) ? Y.current : K) : q,
      Z = G && !l(J) ? !1 : W && !l(f) ? f : A().isPaused() ? !1 : s ? (l(q) ? !1 : p) : l(q) || p,
      oe = !!(C && t && W && Z),
      se = l(U.isValidating) ? oe : U.isValidating,
      ce = l(U.isLoading) ? oe : U.isLoading,
      Q = (0, o.useCallback)(
        async (e) => {
          let t = O.current;
          if (!C || !t || E.current || A().isPaused()) return !1;
          let r,
            a,
            o = !0,
            s = e || {},
            c = !x[C] || !s.dedupe,
            d = () => (te ? !E.current && C === D.current && T.current : C === D.current),
            f = { isValidating: !1, isLoading: !1 },
            p = () => {
              F(f);
            },
            m = () => {
              let e = x[C];
              e && e[1] === a && delete x[C];
            },
            h = { isValidating: !0 };
          l(P().data) && (h.isLoading = !0);
          try {
            if (
              (c &&
                (F(h),
                n.loadingTimeout &&
                  l(P().data) &&
                  setTimeout(() => {
                    o && d() && A().onLoadingSlow(C, n);
                  }, n.loadingTimeout),
                (x[C] = [t(w), L()])),
              ([r, a] = x[C]),
              (r = await r),
              c && setTimeout(m, n.dedupingInterval),
              !x[C] || x[C][1] !== a)
            )
              return (c && d() && A().onDiscarded(C), !1);
            f.error = void 0;
            let e = b[C];
            if (!l(e) && (a <= e[0] || a <= e[1] || e[1] === 0))
              return (p(), c && d() && A().onDiscarded(C), !1);
            let s = P().data;
            ((f.data = i(s, r) ? s : r), c && d() && A().onSuccess(r, C, n));
          } catch (e) {
            m();
            let t = A(),
              { shouldRetryOnError: n } = t;
            t.isPaused() ||
              ((f.error = e),
              c &&
                d() &&
                (t.onError(e, C, t),
                (n === !0 || (u(n) && n(e))) &&
                  (!A().revalidateOnFocus || !A().revalidateOnReconnect || j()) &&
                  t.onErrorRetry(
                    e,
                    C,
                    t,
                    (e) => {
                      let t = y[C];
                      t && t[0] && t[0](B.ERROR_REVALIDATE_EVENT, e);
                    },
                    { retryCount: (s.retryCount || 0) + 1, dedupe: !0 }
                  )));
          }
          return ((o = !1), p(), !0);
        },
        [C, r]
      ),
      le = (0, o.useCallback)((...e) => ae(r, D.current, ...e), []);
    if (
      (N(() => {
        ((O.current = t), (k.current = n), l(K) || (Y.current = K));
      }),
      N(() => {
        if (!C) return;
        let e = Q.bind(void 0, pe),
          t = 0,
          n = de(C, y, (n, r = {}) => {
            if (n == B.FOCUS_EVENT) {
              let n = Date.now();
              A().revalidateOnFocus && n > t && j() && ((t = n + A().focusThrottleInterval), e());
            } else if (n == B.RECONNECT_EVENT) A().revalidateOnReconnect && j() && e();
            else if (n == B.MUTATE_EVENT) return Q();
            else if (n == B.ERROR_REVALIDATE_EVENT) return Q(r);
          });
        return (
          (E.current = !1),
          (D.current = C),
          (T.current = !0),
          F({ _k: w }),
          Z && (l(q) || M ? e() : ne(e)),
          () => {
            ((E.current = !0), n());
          }
        );
      }, [C]),
      N(() => {
        let e;
        function t() {
          let t = u(m) ? m(P().data) : m;
          t && e !== -1 && (e = setTimeout(n, t));
        }
        function n() {
          !P().error && (h || A().isVisible()) && (_ || A().isOnline()) ? Q(pe).then(t) : t();
        }
        return (
          t(),
          () => {
            e &&= (clearTimeout(e), -1);
          }
        );
      }, [m, h, _, C]),
      (0, o.useDebugValue)(X),
      s && l(q) && C)
    ) {
      if (!te && M) throw Error(`Fallback data is required when using suspense in SSR.`);
      ((O.current = t), (k.current = n), (E.current = !1));
      let e = S[C];
      if ((l(e) || fe(le(e)), l(J))) {
        let e = Q(pe);
        (l(X) || ((e.status = `fulfilled`), (e.value = !0)), fe(e));
      } else throw J;
    }
    return {
      mutate: le,
      get data() {
        return ((R.data = !0), X);
      },
      get error() {
        return ((R.error = !0), J);
      },
      get isValidating() {
        return ((R.isValidating = !0), se);
      },
      get isLoading() {
        return ((R.isLoading = !0), ce);
      },
    };
  };
c.defineProperty(X, `defaultValue`, { value: q });
var he = ue(me),
  $ = r();
function ge() {
  try {
    let e = window.localStorage?.getItem(`theme`);
    return e === `light` || e === `dark` ? e : null;
  } catch {
    return null;
  }
}
function _e(e) {
  try {
    window.localStorage?.setItem(`theme`, e);
  } catch {}
}
function ve() {
  let [e, t] = (0, o.useState)(() => ge() || `dark`);
  return (
    (0, o.useEffect)(() => {
      let t = document.documentElement;
      (e === `dark` ? t.classList.add(`dark`) : t.classList.remove(`dark`), _e(e));
    }, [e]),
    (0, $.jsxs)(`button`, {
      onClick: () => {
        t((e) => (e === `light` ? `dark` : `light`));
      },
      className: `relative flex items-center justify-between w-12 h-6 rounded-full p-0.5 cursor-pointer bg-elevated border border-border/80 hover:border-brand/40 transition-all duration-300 select-none shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 group`,
      'aria-label': `Switch to ${e === `light` ? `dark` : `light`} mode`,
      children: [
        (0, $.jsx)(`div`, {
          className: `w-5 h-5 rounded-full shadow-md flex items-center justify-center transform theme-knob-transition z-10
          ${e === `dark` ? `translate-x-[22px] bg-brand hover:bg-brand-hover text-primary` : `translate-x-0 bg-yellow-500 text-white`}
        `,
          children:
            e === `dark`
              ? (0, $.jsx)(`svg`, {
                  className: `w-3.5 h-3.5 animate-pulse-slow`,
                  fill: `currentColor`,
                  viewBox: `0 0 20 20`,
                  children: (0, $.jsx)(`path`, {
                    d: `M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z`,
                  }),
                })
              : (0, $.jsxs)(`svg`, {
                  className: `w-3.5 h-3.5`,
                  fill: `none`,
                  stroke: `currentColor`,
                  viewBox: `0 0 24 24`,
                  strokeWidth: `2.5`,
                  children: [
                    (0, $.jsx)(`circle`, { cx: `12`, cy: `12`, r: `5`, fill: `currentColor` }),
                    (0, $.jsx)(`path`, {
                      strokeLinecap: `round`,
                      strokeLinejoin: `round`,
                      d: `M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42`,
                    }),
                  ],
                }),
        }),
        (0, $.jsx)(`span`, {
          className: `absolute left-1 transition-opacity duration-300 flex items-center justify-center w-5 h-5 ${e === `light` ? `opacity-0` : `opacity-40 group-hover:opacity-60`}`,
          children: (0, $.jsxs)(`svg`, {
            className: `w-3.5 h-3.5 text-secondary`,
            fill: `none`,
            stroke: `currentColor`,
            viewBox: `0 0 24 24`,
            strokeWidth: `2`,
            children: [
              (0, $.jsx)(`circle`, { cx: `12`, cy: `12`, r: `5` }),
              (0, $.jsx)(`path`, {
                strokeLinecap: `round`,
                strokeLinejoin: `round`,
                d: `M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42`,
              }),
            ],
          }),
        }),
        (0, $.jsx)(`span`, {
          className: `absolute right-1 transition-opacity duration-300 flex items-center justify-center w-5 h-5 ${e === `dark` ? `opacity-0` : `opacity-40 group-hover:opacity-60`}`,
          children: (0, $.jsx)(`svg`, {
            className: `w-3.5 h-3.5 text-secondary`,
            fill: `currentColor`,
            viewBox: `0 0 20 20`,
            children: (0, $.jsx)(`path`, {
              d: `M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z`,
            }),
          }),
        }),
      ],
    })
  );
}
export { he as n, ve as t };
