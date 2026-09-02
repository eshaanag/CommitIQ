import { i as e, l as t, o as n, t as r } from './index-4N9WolXG.js';
import { f as i, p as a } from './api-O1fETKMF.js';
import { n as o, t as s } from './ThemeToggle-DHlVmop0.js';
var c = t(n(), 1),
  l = r(),
  u = [`facebook/react`, `vercel/next.js`, `expressjs/express`, `vuejs/vue`];
function d(e) {
  let t = e.trim();
  for (; t.endsWith(`/`) || t.endsWith(`.git`);)
    t.endsWith(`/`) ? (t = t.slice(0, -1)) : t.endsWith(`.git`) && (t = t.slice(0, -4));
  (t.startsWith(`https://`) ? (t = t.slice(8)) : t.startsWith(`http://`) && (t = t.slice(7)),
    t.startsWith(`www.`) && (t = t.slice(4)),
    t.startsWith(`github.com/`) && (t = t.slice(11)));
  let n = t.split(`/`);
  if (n.length < 2 || !n[0] || !n[1]) return null;
  let r = n[0].toLowerCase(),
    i = n[1].toLowerCase(),
    a = /^[\w.-]+$/;
  return !a.test(r) || !a.test(i) ? null : { owner: r, repo: i };
}
function f() {
  let [t, n] = (0, c.useState)(``),
    [r, f] = (0, c.useState)(`idle`),
    [p, m] = (0, c.useState)(!1),
    [h, g] = (0, c.useState)(null),
    [_, v] = (0, c.useState)(0),
    [y, b] = (0, c.useState)(`500`),
    [x, S] = (0, c.useState)(``),
    C = e(),
    w = o(`recent-repos`, () => a()).data || [];
  (0, c.useEffect)(() => {
    let e = setInterval(() => v((e) => (e + 1) % u.length), 2800);
    return () => clearInterval(e);
  }, []);
  let T = (e) => {
      if (!e.trim()) {
        f(`idle`);
        return;
      }
      f(d(e) ? `valid` : `invalid`);
    },
    E = (e) => {
      (g(null), n(e.target.value), T(e.target.value));
    },
    D = async () => {
      if (p) return;
      let e = d(t);
      if (!e) {
        (f(`invalid`),
          g(
            t.trim()
              ? `Please enter a complete GitHub repository URL or owner/repo path (e.g. Myparadox-creator/CommitIQ---).`
              : `Please enter a GitHub repository URL to analyze.`
          ));
        return;
      }
      (m(!0), g(null));
      try {
        let t = `https://github.com/${e.owner}/${e.repo}`,
          n = y ? parseInt(y, 10) : 500;
        C(
          `/analyze?repo_id=${(await i(t, isNaN(n) ? 500 : n)).repo_id}&name=${encodeURIComponent(t)}`
        );
      } catch (e) {
        (g(e instanceof Error ? e.message : `Could not start repository ingestion.`), m(!1));
      }
    },
    O = {
      idle: `border-white/10 focus-within:border-purple-500/50 focus-within:shadow-[0_0_20px_rgba(167,139,250,0.15)]`,
      valid: `border-emerald-500/40 focus-within:border-emerald-500/70 focus-within:shadow-[0_0_20px_rgba(52,211,153,0.2)]`,
      invalid: `border-rose-500/40 focus-within:border-rose-500/70 focus-within:shadow-[0_0_20px_rgba(244,63,94,0.2)]`,
    }[r];
  return (0, l.jsxs)(`div`, {
    className: `min-h-screen flex flex-col justify-between selection:bg-purple-500/30`,
    children: [
      (0, l.jsx)(`header`, {
        className: `w-full max-w-5xl mx-auto px-4 pt-6`,
        children: (0, l.jsxs)(`div`, {
          className: `glass-panel rounded-full px-6 py-4 flex items-center justify-between`,
          children: [
            (0, l.jsxs)(`div`, {
              className: `flex items-center gap-3`,
              children: [
                (0, l.jsxs)(`div`, {
                  className: `relative w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 shadow-md`,
                  children: [
                    (0, l.jsx)(`div`, {
                      className: `absolute inset-0.5 rounded-full bg-[#0a0b10]/20 backdrop-blur-sm`,
                    }),
                    (0, l.jsx)(`div`, {
                      className: `absolute inset-1 rounded-full bg-gradient-to-tr from-purple-400 to-cyan-400 opacity-80 blur-[2px]`,
                    }),
                  ],
                }),
                (0, l.jsxs)(`span`, {
                  className: `font-head text-[20px] font-semibold tracking-tight text-white glow-text-brand`,
                  children: [
                    `Commit`,
                    (0, l.jsx)(`span`, { className: `text-purple-400`, children: `IQ` }),
                  ],
                }),
              ],
            }),
            (0, l.jsxs)(`div`, {
              className: `flex items-center gap-6`,
              children: [
                (0, l.jsx)(`button`, {
                  onClick: () => C(`/demo`),
                  className: `text-slate-300 hover:text-white text-sm font-medium tracking-wide transition-colors`,
                  children: `Interactive Demo`,
                }),
                (0, l.jsx)(`a`, {
                  href: `https://github.com/Myparadox-creator/CommitIQ---`,
                  target: `_blank`,
                  rel: `noreferrer`,
                  className: `text-slate-300 hover:text-white text-sm font-medium tracking-wide transition-colors`,
                  children: `GitHub`,
                }),
                (0, l.jsx)(`div`, { className: `w-[1px] h-4 bg-white/10` }),
                (0, l.jsx)(s, {}),
              ],
            }),
          ],
        }),
      }),
      (0, l.jsx)(`main`, {
        className: `flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-20`,
        children: (0, l.jsxs)(`div`, {
          className: `max-w-3xl w-full text-center relative`,
          children: [
            (0, l.jsx)(`div`, {
              className: `absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-600/10 blur-[90px] rounded-full pointer-events-none`,
            }),
            (0, l.jsxs)(`h1`, {
              className: `font-head text-[44px] md:text-[62px] leading-tight text-white mb-4 tracking-tight font-light select-none`,
              children: [
                `Every commit has a `,
                (0, l.jsx)(`span`, {
                  className: `font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-300`,
                  children: `story.`,
                }),
              ],
            }),
            (0, l.jsx)(`p`, {
              className: `font-head text-[20px] md:text-[24px] text-slate-300 mb-10 font-light tracking-wide max-w-xl mx-auto select-none`,
              children: `Decipher architecture, complexity shifts, and knowledge dynamics directly from your codebase history.`,
            }),
            (0, l.jsxs)(`div`, {
              className: `max-w-xl mx-auto mb-6`,
              children: [
                (0, l.jsxs)(`div`, {
                  className: `glass-panel rounded-full p-1.5 flex items-center transition-all duration-300 ${O}`,
                  children: [
                    (0, l.jsx)(`div`, {
                      className: `pl-4 text-purple-400/70 select-none`,
                      children: (0, l.jsx)(`svg`, {
                        className: `w-5 h-5`,
                        fill: `none`,
                        viewBox: `0 0 24 24`,
                        stroke: `currentColor`,
                        children: (0, l.jsx)(`path`, {
                          strokeLinecap: `round`,
                          strokeLinejoin: `round`,
                          strokeWidth: 1.5,
                          d: `M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z`,
                        }),
                      }),
                    }),
                    (0, l.jsx)(`input`, {
                      autoFocus: !0,
                      type: `text`,
                      value: t,
                      onChange: E,
                      onKeyDown: (e) => e.key === `Enter` && D(),
                      placeholder: `Search or enter e.g. ${u[_]}`,
                      className: `flex-1 bg-transparent text-white font-mono text-sm px-3 py-2 outline-none w-full placeholder-slate-500`,
                    }),
                    (0, l.jsx)(`div`, { className: `w-[1px] h-6 bg-white/10 mx-2` }),
                    (0, l.jsxs)(`div`, {
                      className: `flex items-center gap-1.5 text-[10px] text-slate-400 font-mono pr-2 select-none`,
                      children: [
                        (0, l.jsx)(`span`, { children: `LIMIT:` }),
                        (0, l.jsx)(`input`, {
                          type: `number`,
                          value: y,
                          onChange: (e) => b(e.target.value),
                          onKeyDown: (e) => e.key === `Enter` && D(),
                          placeholder: `500`,
                          min: `1`,
                          max: `500`,
                          className: `w-12 bg-transparent text-white font-mono text-xs outline-none focus:text-purple-300 transition-colors`,
                        }),
                      ],
                    }),
                    (0, l.jsx)(`button`, {
                      onClick: D,
                      disabled: p,
                      className: `px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-300 disabled:opacity-40 disabled:hover:bg-white/10 disabled:cursor-not-allowed flex items-center gap-2 border border-white/5 active:scale-95`,
                      children: p
                        ? (0, l.jsxs)(l.Fragment, {
                            children: [
                              (0, l.jsxs)(`svg`, {
                                className: `animate-spin h-4 w-4 text-white`,
                                fill: `none`,
                                viewBox: `0 0 24 24`,
                                children: [
                                  (0, l.jsx)(`circle`, {
                                    className: `opacity-25`,
                                    cx: `12`,
                                    cy: `12`,
                                    r: `10`,
                                    stroke: `currentColor`,
                                    strokeWidth: `3`,
                                  }),
                                  (0, l.jsx)(`path`, {
                                    className: `opacity-75`,
                                    fill: `currentColor`,
                                    d: `M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z`,
                                  }),
                                ],
                              }),
                              (0, l.jsx)(`span`, { children: `Parsing...` }),
                            ],
                          })
                        : (0, l.jsx)(`span`, { children: `Analyze` }),
                    }),
                  ],
                }),
                (0, l.jsx)(`div`, {
                  className: `mt-3`,
                  children: (0, l.jsx)(`input`, {
                    type: `text`,
                    value: x,
                    onChange: (e) => S(e.target.value),
                    onKeyDown: (e) => e.key === `Enter` && D(),
                    placeholder: `Branch (optional)`,
                    className: `w-full glass-panel rounded-xl px-4 py-3 bg-transparent text-white font-mono text-sm outline-none placeholder-slate-500 border border-white/10 focus:border-purple-500/50`,
                  }),
                }),
              ],
            }),
            r === `invalid` &&
              (0, l.jsxs)(`div`, {
                className: `flex items-center gap-2 justify-center text-rose-400 text-sm mb-4 animate-fade-in`,
                children: [
                  (0, l.jsx)(`span`, {
                    className: `w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse`,
                  }),
                  (0, l.jsx)(`span`, { children: `Please enter a valid owner/repository format.` }),
                ],
              }),
            h &&
              (0, l.jsxs)(`div`, {
                className: `glass-panel-bright rounded-xl border border-rose-500/20 px-4 py-2.5 max-w-xl mx-auto mb-6 text-rose-300 text-sm flex items-center justify-center gap-3`,
                children: [
                  (0, l.jsx)(`span`, { className: `w-2 h-2 rounded-full bg-rose-500` }),
                  (0, l.jsx)(`span`, {
                    children: h.includes(`500 commits`)
                      ? `Demo version is limited to codebases within 500 commits.`
                      : h,
                  }),
                ],
              }),
            (0, l.jsx)(`div`, {
              className: `flex justify-center gap-3`,
              children: (0, l.jsx)(`button`, {
                onClick: () => C(`/demo`),
                className: `text-purple-400 hover:text-purple-300 font-medium text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(167,139,250,0.15)] rounded-full px-4 py-1.5 border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10`,
                children: `Or load facebook/react demo instantly →`,
              }),
            }),
            w.length > 0 &&
              (0, l.jsxs)(`div`, {
                className: `mt-12 text-left max-w-4xl mx-auto`,
                'aria-label': `Analyzed repositories list`,
                children: [
                  (0, l.jsxs)(`h2`, {
                    className: `font-head text-lg font-semibold text-white mb-4 tracking-tight flex items-center justify-between`,
                    children: [
                      (0, l.jsx)(`span`, { children: `Analyzed Repositories` }),
                      (0, l.jsxs)(`span`, {
                        className: `text-xs font-mono text-slate-400 font-normal`,
                        children: [w.length, ` Total`],
                      }),
                    ],
                  }),
                  (0, l.jsx)(`div`, {
                    className: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`,
                    children: w.map((e) =>
                      (0, l.jsxs)(
                        `div`,
                        {
                          onClick: () => C(`/dashboard/${e.repo_slug}`),
                          className: `glass-panel rounded-[20px] p-4 border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all cursor-pointer flex flex-col justify-between group`,
                          children: [
                            (0, l.jsxs)(`div`, {
                              children: [
                                (0, l.jsx)(`div`, {
                                  className: `font-mono text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate`,
                                  children: e.repo_slug,
                                }),
                                e.github_description &&
                                  (0, l.jsx)(`p`, {
                                    className: `text-slate-400 text-xs mt-1 line-clamp-2`,
                                    children: e.github_description,
                                  }),
                              ],
                            }),
                            (0, l.jsxs)(`div`, {
                              className: `mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400`,
                              children: [
                                (0, l.jsxs)(`span`, { children: [e.analyzed_commits, ` commits`] }),
                                (0, l.jsxs)(`span`, {
                                  className: `flex items-center gap-1 text-purple-300 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/15`,
                                  children: [
                                    (0, l.jsx)(`svg`, {
                                      className: `w-3 h-3`,
                                      fill: `none`,
                                      viewBox: `0 0 24 24`,
                                      stroke: `currentColor`,
                                      children: (0, l.jsx)(`path`, {
                                        strokeLinecap: `round`,
                                        strokeLinejoin: `round`,
                                        strokeWidth: 2,
                                        d: `M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z`,
                                      }),
                                    }),
                                    e.active_contributors_count ?? 0,
                                    ` active contributors`,
                                  ],
                                }),
                              ],
                            }),
                          ],
                        },
                        e.id
                      )
                    ),
                  }),
                ],
              }),
            (0, l.jsx)(`div`, {
              className: `mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto`,
              'aria-label': `Static product capabilities`,
              children: [
                {
                  title: `Health Timeline`,
                  desc: `Replay commit activity visually and scrub through complexity, churn, and code risk dynamics over time.`,
                  icon: `M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z`,
                  glow: `group-hover:border-indigo-500/30 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.06)]`,
                },
                {
                  title: `Knowledge Graph`,
                  desc: `Fly through 3D dependency streams to identify hidden import coupling and import risk structural flaws.`,
                  icon: `M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7`,
                  glow: `group-hover:border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(167,139,250,0.06)]`,
                },
                {
                  title: `Bus Factor Index`,
                  desc: `Audit critical files single-person dependencies to mitigate key-person risks before refactoring.`,
                  icon: `M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z`,
                  glow: `group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.06)]`,
                },
              ].map((e) =>
                (0, l.jsxs)(
                  `div`,
                  {
                    className: `group glass-panel rounded-[24px] p-6 transition-all duration-500 ${e.glow} cursor-default`,
                    children: [
                      (0, l.jsx)(`div`, {
                        className: `w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-purple-500/10 group-hover:border-purple-500/30`,
                        children: (0, l.jsx)(`svg`, {
                          className: `w-5 h-5 text-slate-300 group-hover:text-purple-400 transition-colors`,
                          fill: `none`,
                          viewBox: `0 0 24 24`,
                          stroke: `currentColor`,
                          children: (0, l.jsx)(`path`, {
                            strokeLinecap: `round`,
                            strokeLinejoin: `round`,
                            strokeWidth: 1.5,
                            d: e.icon,
                          }),
                        }),
                      }),
                      (0, l.jsx)(`h2`, {
                        className: `font-head text-lg font-medium text-white mb-2`,
                        children: e.title,
                      }),
                      (0, l.jsx)(`p`, {
                        className: `text-slate-400 text-sm leading-relaxed`,
                        children: e.desc,
                      }),
                    ],
                  },
                  e.title
                )
              ),
            }),
          ],
        }),
      }),
      (0, l.jsx)(`footer`, {
        className: `py-8 text-center text-xs text-slate-500 select-none`,
        children: (0, l.jsx)(`p`, {
          children: `CommitIQ Spatial Intel — Designed for Vision Pro & High Performance Computing`,
        }),
      }),
    ],
  });
}
export { f as default };
