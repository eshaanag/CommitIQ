import { i as e, l as t, o as n, t as r } from './index-4N9WolXG.js';
import { d as i, f as a } from './api-O1fETKMF.js';
import { t as o } from './sparkles-B1Azk1yP.js';
import { t as s } from './circle-alert-COlNh2rT.js';
var c = t(n(), 1),
  l = r();
function u() {
  let t = e(),
    [n, r] = (0, c.useState)(null),
    [u, d] = (0, c.useState)(!1);
  return (0, l.jsx)(`div`, {
    className: `min-h-screen bg-transparent flex items-center justify-center p-6 select-none font-body`,
    children: (0, l.jsxs)(`div`, {
      className: `glass-panel rounded-[32px] p-8 max-w-sm text-center border border-white/10 shadow-2xl relative overflow-hidden`,
      children: [
        (0, l.jsx)(`div`, {
          className: `absolute inset-0 bg-purple-500/5 blur-2xl pointer-events-none -z-10`,
        }),
        (0, l.jsx)(`div`, {
          className: `w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5 relative`,
          children: n
            ? (0, l.jsx)(s, { className: `w-5 h-5 text-rose-400` })
            : u
              ? (0, l.jsx)(`div`, {
                  className: `absolute inset-1 rounded-full border-2 border-t-purple-400 border-r-indigo-400 border-b-transparent border-l-transparent animate-spin`,
                })
              : (0, l.jsx)(o, { className: `w-5 h-5 text-purple-400` }),
        }),
        (0, l.jsx)(`p`, {
          className: `text-sm ${n ? `text-rose-400 font-medium` : `text-slate-300 animate-pulse font-medium`}`,
          children:
            n ||
            (u
              ? `Starting React demo analysis...`
              : `Analyze facebook/react with a smaller demo-sized commit window.`),
        }),
        (0, l.jsx)(`div`, {
          className: `mt-6 space-y-3`,
          children: (0, l.jsxs)(`button`, {
            onClick: n
              ? () => t(`/`)
              : async () => {
                  (d(!0), r(null));
                  try {
                    try {
                      let e = await i(`facebook-react`);
                      if (e && e.status === `ready`) {
                        t(`/dashboard/facebook-react`, { replace: !0 });
                        return;
                      }
                    } catch {}
                    t(
                      `/analyze?repo_id=${(await a(`https://github.com/facebook/react`, 100)).repo_id}&name=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact`,
                      { replace: !0 }
                    );
                  } catch (e) {
                    (r(e instanceof Error ? e.message : `Could not start the demo analysis.`),
                      d(!1));
                  }
                },
            disabled: u,
            className: `mt-6 liquid-button px-5 py-2.5 rounded-full text-xs font-bold text-white tracking-wide shadow-lg w-full flex items-center justify-center gap-2`,
            children: [
              (0, l.jsx)(o, { className: `w-3.5 h-3.5` }),
              n ? `Return to Command Center` : u ? `Starting...` : `Start Demo Analysis`,
            ],
          }),
        }),
      ],
    }),
  });
}
export { u as default };
