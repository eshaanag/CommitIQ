import { i as e, t } from './index-4N9WolXG.js';
import { t as n } from './sparkles-B1Azk1yP.js';
import { t as r } from './circle-help-B93POH5e.js';
var i = t();
function a() {
  let t = e();
  return (0, i.jsx)(`div`, {
    className: `min-h-screen bg-transparent flex items-center justify-center p-6 select-none font-body`,
    children: (0, i.jsxs)(`div`, {
      className: `glass-panel rounded-[32px] p-8 md:p-10 max-w-md text-center border border-white/10 shadow-2xl relative overflow-hidden`,
      children: [
        (0, i.jsx)(`div`, {
          className: `absolute inset-0 bg-purple-500/5 blur-3xl pointer-events-none -z-10`,
        }),
        (0, i.jsx)(`div`, {
          className: `w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 relative`,
          children: (0, i.jsx)(r, { className: `w-6 h-6 text-purple-400` }),
        }),
        (0, i.jsx)(`h1`, {
          className: `font-head text-[56px] font-extralight text-white tracking-tight Outfit leading-none`,
          children: `404`,
        }),
        (0, i.jsx)(`h2`, {
          className: `font-head text-[18px] font-semibold text-white tracking-tight mt-3 mb-2`,
          children: `Workspace Lost in Space`,
        }),
        (0, i.jsx)(`p`, {
          className: `text-slate-400 text-xs leading-relaxed mb-8`,
          children: `The requested coordinate snapshot index was not compiled or does not exist in the active computing grid.`,
        }),
        (0, i.jsxs)(`button`, {
          onClick: () => t(`/`),
          className: `liquid-button px-6 py-3 rounded-full text-xs font-bold text-white tracking-wide shadow-lg w-full flex items-center justify-center gap-2`,
          children: [(0, i.jsx)(n, { className: `w-4 h-4` }), `Navigate to Command Center`],
        }),
      ],
    }),
  });
}
export { a as default };
