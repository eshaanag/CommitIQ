import { i as e, l as t, o as n, r, t as i } from './index-4N9WolXG.js';
import { c as a, t as o, u as s } from './api-O1fETKMF.js';
var c = t(n(), 1),
  l = i(),
  u = [
    { key: `cloning`, label: `Cloning repository`, done: `Repository cloned` },
    { key: `computing_bus_factor`, label: `Computing bus factor`, done: `Bus factor computed` },
    { key: `analyzing`, label: `Analyzing commits and graphs`, done: `Commit snapshots analyzed` },
    { key: `ready`, label: `Finalizing dashboard`, done: `Analysis complete` },
  ];
function d(e) {
  let t = u.findIndex((t) => t.key === e);
  return t >= 0 ? t : 0;
}
function f() {
  let [t] = r(),
    n = e(),
    i = t.get(`repo_id`),
    f = t.get(`name`) || `your repository`,
    [p, m] = (0, c.useState)({
      current: 0,
      total: 0,
      current_sha: null,
      stage: null,
      progress_pct: 0,
      status: `queued`,
      error_message: null,
    }),
    [h, g] = (0, c.useState)(null),
    [_, v] = (0, c.useState)(!1);
  (0, c.useEffect)(() => {
    if (!i) {
      n(`/`);
      return;
    }
    let e = a(i);
    return (
      (e.onmessage = (t) => {
        let r = JSON.parse(t.data);
        (m(r),
          r.status === `ready` &&
            (e.close(),
            s(i)
              .then((e) => {
                n(`/dashboard/${e.repo_slug}`, { replace: !0 });
              })
              .catch((e) => {
                g(
                  e instanceof Error
                    ? e.message
                    : `Analysis completed, but repository metadata could not load.`
                );
              })),
          r.status === `error` && (e.close(), g(r.error_message || `Repository ingestion failed.`)),
          r.status === `cancelled` &&
            (e.close(), g(r.error_message || `Repository ingestion was cancelled.`)));
      }),
      (e.onerror = () => {
        (e.close(),
          g(`Lost connection to ingestion progress. Refresh or retry from the landing page.`));
      }),
      () => e.close()
    );
  }, [i, n]);
  let y = p.status === `queued` ? 0 : d(p.status),
    b = !!(i && !h && ![`ready`, `error`, `cancelled`].includes(p.status));
  async function x() {
    if (!(!i || _)) {
      v(!0);
      try {
        let e = await o(i);
        (m(e), g(e.error_message || `Repository ingestion was cancelled.`));
      } catch (e) {
        g(e instanceof Error ? e.message : `Could not cancel repository ingestion.`);
      } finally {
        v(!1);
      }
    }
  }
  return (0, l.jsx)(`div`, {
    className: `min-h-screen flex items-center justify-center p-6 selection:bg-purple-500/30`,
    children: (0, l.jsxs)(`div`, {
      className: `max-w-xl w-full relative`,
      children: [
        (0, l.jsx)(`div`, {
          className: `absolute inset-0 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none -z-10`,
        }),
        (0, l.jsxs)(`div`, {
          className: `glass-panel rounded-[32px] p-8 md:p-10 shadow-2xl relative border border-white/10`,
          children: [
            (0, l.jsxs)(`div`, {
              className: `mb-10 text-center`,
              children: [
                (0, l.jsxs)(`div`, {
                  className: `w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 relative`,
                  children: [
                    (0, l.jsx)(`div`, {
                      className: `absolute inset-1 rounded-full border-2 border-t-purple-400 border-r-indigo-400 border-b-transparent border-l-transparent animate-spin`,
                    }),
                    (0, l.jsx)(`svg`, {
                      className: `w-6 h-6 text-purple-400`,
                      fill: `none`,
                      viewBox: `0 0 24 24`,
                      stroke: `currentColor`,
                      children: (0, l.jsx)(`path`, {
                        strokeLinecap: `round`,
                        strokeLinejoin: `round`,
                        strokeWidth: 1.5,
                        d: `M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z`,
                      }),
                    }),
                  ],
                }),
                (0, l.jsx)(`h1`, {
                  className: `font-head text-[28px] font-semibold text-white tracking-tight mb-2`,
                  children: `Analyzing Repository`,
                }),
                (0, l.jsx)(`div`, {
                  className: `inline-block bg-white/5 border border-white/5 px-4 py-1.5 rounded-full max-w-full`,
                  children: (0, l.jsx)(`p`, {
                    className: `text-slate-300 font-mono text-xs truncate`,
                    children: f,
                  }),
                }),
              ],
            }),
            (0, l.jsx)(`div`, {
              className: `space-y-6`,
              children: u.map((e, t) => {
                let n = y > t || p.status === `ready`,
                  r = y === t && p.status !== `ready` && !h;
                return (0, l.jsxs)(
                  `div`,
                  {
                    className: `flex items-start gap-4 transition-opacity duration-300 ${r ? `opacity-100` : n ? `opacity-80` : `opacity-40`}`,
                    children: [
                      (0, l.jsx)(`div`, {
                        className: `pt-1.5 flex-shrink-0`,
                        children: n
                          ? (0, l.jsx)(`div`, {
                              className: `w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center`,
                              children: (0, l.jsx)(`div`, {
                                className: `w-1.5 h-1.5 rounded-full bg-emerald-400`,
                              }),
                            })
                          : r
                            ? (0, l.jsx)(`div`, {
                                className: `w-4 h-4 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center animate-pulse`,
                                children: (0, l.jsx)(`div`, {
                                  className: `w-1.5 h-1.5 rounded-full bg-purple-400`,
                                }),
                              })
                            : (0, l.jsx)(`div`, {
                                className: `w-4 h-4 rounded-full bg-white/5 border border-white/10`,
                              }),
                      }),
                      (0, l.jsxs)(`div`, {
                        className: `flex-1`,
                        children: [
                          (0, l.jsxs)(`div`, {
                            className: `flex justify-between items-center mb-2`,
                            children: [
                              (0, l.jsx)(`span`, {
                                className: `text-sm font-medium ${r ? `text-white font-semibold` : `text-slate-300`}`,
                                children: n ? e.done : e.label,
                              }),
                              r &&
                                p.current > 0 &&
                                p.total > 0 &&
                                (0, l.jsxs)(`span`, {
                                  className: `text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20`,
                                  children: [p.current, ` / `, p.total],
                                }),
                            ],
                          }),
                          (r || n) &&
                            (0, l.jsx)(`div`, {
                              className: `h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5`,
                              children: (0, l.jsx)(`div`, {
                                className: `h-full rounded-full transition-all duration-300 bg-gradient-to-r ${n ? `from-emerald-500 to-emerald-400` : `from-purple-500 via-indigo-400 to-cyan-400`}`,
                                style: { width: n ? `100%` : `${p.progress_pct}%` },
                              }),
                            }),
                        ],
                      }),
                    ],
                  },
                  e.key
                );
              }),
            }),
            p.current_sha &&
              (0, l.jsxs)(`div`, {
                className: `mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono`,
                children: [
                  (0, l.jsx)(`span`, { children: `ACTIVE SNAPSHOT` }),
                  (0, l.jsx)(`span`, {
                    className: `text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5`,
                    children: p.current_sha,
                  }),
                ],
              }),
            b &&
              (0, l.jsx)(`div`, {
                className: `mt-8 pt-6 border-t border-white/10 text-center`,
                children: (0, l.jsx)(`button`, {
                  type: `button`,
                  onClick: x,
                  disabled: _,
                  className: `px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`,
                  children: _ ? `Cancelling...` : `Cancel analysis`,
                }),
              }),
            h &&
              (0, l.jsxs)(`div`, {
                className: `mt-8 pt-6 border-t border-rose-500/20 text-center`,
                children: [
                  (0, l.jsx)(`p`, {
                    className: `text-rose-400 text-sm mb-4 leading-relaxed`,
                    children: h,
                  }),
                  (0, l.jsx)(`button`, {
                    onClick: () => n(`/`),
                    className: `px-6 py-2 rounded-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-sm font-semibold transition-all duration-300`,
                    children: `Return & Retry`,
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
export { f as default };
