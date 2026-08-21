import { l as e, o as t } from './index-4N9WolXG.js';
var n = e(t()),
  r = (e) => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
  i = (...e) => e.filter((e, t, n) => !!e && n.indexOf(e) === t).join(` `),
  a = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  o = (0, n.forwardRef)(
    (
      {
        color: e = `currentColor`,
        size: t = 24,
        strokeWidth: r = 2,
        absoluteStrokeWidth: o,
        className: s = ``,
        children: c,
        iconNode: l,
        ...u
      },
      d
    ) =>
      (0, n.createElement)(
        `svg`,
        {
          ref: d,
          ...a,
          width: t,
          height: t,
          stroke: e,
          strokeWidth: o ? (Number(r) * 24) / Number(t) : r,
          className: i(`lucide`, s),
          ...u,
        },
        [...l.map(([e, t]) => (0, n.createElement)(e, t)), ...(Array.isArray(c) ? c : [c])]
      )
  ),
  s = (e, t) => {
    let a = (0, n.forwardRef)(({ className: a, ...s }, c) =>
      (0, n.createElement)(o, { ref: c, iconNode: t, className: i(`lucide-${r(e)}`, a), ...s })
    );
    return ((a.displayName = `${e}`), a);
  },
  c = s(`Sparkles`, [
    [
      `path`,
      {
        d: `M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z`,
        key: `4pj2yx`,
      },
    ],
    [`path`, { d: `M20 3v4`, key: `1olli1` }],
    [`path`, { d: `M22 5h-4`, key: `1gvqau` }],
    [`path`, { d: `M4 17v2`, key: `vumght` }],
    [`path`, { d: `M5 18H3`, key: `zchphs` }],
  ]);
export { s as n, c as t };
