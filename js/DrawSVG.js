!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(((e = e || self).window = e.window || {}));
})(this, function (e) {
  'use strict';
  function t() {
    return 'undefined' != typeof window;
  }
  function n() {
    return c || (t() && (c = window.gsap) && c.registerPlugin && c);
  }
  function r(e) {
    return Math.round(1e4 * e) / 1e4;
  }
  function i(e) {
    return parseFloat(e) || 0;
  }
  function s(e, t) {
    var n = i(e);
    return ~e.indexOf('%') ? (n / 100) * t : n;
  }
  function o(e, t) {
    return i(e.getAttribute(t));
  }
  function a(e, t, n, r, s, o) {
    return b(Math.pow((i(n) - i(e)) * s, 2) + Math.pow((i(r) - i(t)) * o, 2));
  }
  function f(e) {
    return console.warn(e);
  }
  function d(e) {
    return 'non-scaling-stroke' === e.getAttribute('vector-effect');
  }
  function h(e) {
    if (!(e = g(e)[0])) return 0;
    var t,
      n,
      i,
      s,
      h,
      l,
      u,
      c = e.tagName.toLowerCase(),
      p = e.style,
      _ = 1,
      y = 1;
    d(e) &&
      ((y = e.getScreenCTM()),
      (_ = b(y.a * y.a + y.b * y.b)),
      (y = b(y.d * y.d + y.c * y.c)));
    try {
      n = e.getBBox();
    } catch (e) {
      f(
        "Some browsers won't measure invisible elements (like display:none or masks inside defs)."
      );
    }
    var m = n || { x: 0, y: 0, width: 0, height: 0 },
      k = m.x,
      P = m.y,
      M = m.width,
      T = m.height;
    if (
      ((n && (M || T)) ||
        !x[c] ||
        ((M = o(e, x[c][0])),
        (T = o(e, x[c][1])),
        'rect' !== c && 'line' !== c && ((M *= 2), (T *= 2)),
        'line' === c &&
          ((k = o(e, 'x1')),
          (P = o(e, 'y1')),
          (M = Math.abs(M - k)),
          (T = Math.abs(T - P)))),
      'path' === c)
    )
      (s = p.strokeDasharray),
        (p.strokeDasharray = 'none'),
        (t = e.getTotalLength() || 0),
        r(_) !== r(y) &&
          !w &&
          (w = 1) &&
          f(
            "Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."
          ),
        (t *= (_ + y) / 2),
        (p.strokeDasharray = s);
    else if ('rect' === c) t = 2 * M * _ + 2 * T * y;
    else if ('line' === c) t = a(k, P, k + M, P + T, _, y);
    else if ('polyline' === c || 'polygon' === c)
      for (
        i = e.getAttribute('points').match(v) || [],
          'polygon' === c && i.push(i[0], i[1]),
          t = 0,
          h = 2;
        h < i.length;
        h += 2
      )
        t += a(i[h - 2], i[h - 1], i[h], i[h + 1], _, y) || 0;
    else
      ('circle' !== c && 'ellipse' !== c) ||
        ((l = (M / 2) * _),
        (u = (T / 2) * y),
        (t = Math.PI * (3 * (l + u) - b((3 * l + u) * (l + 3 * u)))));
    return t || 0;
  }
  function l(e, t) {
    if (!(e = g(e)[0])) return [0, 0];
    t = t || h(e) + 1;
    var n = p.getComputedStyle(e),
      r = n.strokeDasharray || '',
      s = i(n.strokeDashoffset),
      o = r.indexOf(',');
    return (
      o < 0 && (o = r.indexOf(' ')),
      t < (r = o < 0 ? t : i(r.substr(0, o))) && (r = t),
      [-s || 0, r - s || 0]
    );
  }
  function u() {
    t() &&
      ((p = window),
      (y = c = n()),
      (g = c.utils.toArray),
      (_ = -1 !== ((p.navigator || {}).userAgent || '').indexOf('Edge')));
  }
  var c,
    g,
    p,
    _,
    y,
    w,
    v = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    x = {
      rect: ['width', 'height'],
      circle: ['r', 'r'],
      ellipse: ['rx', 'ry'],
      line: ['x2', 'y2'],
    },
    b = Math.sqrt,
    m =
      ((function () {
        String.fromCharCode.apply(null, arguments);
      })(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
      {
        version: '3.10.4',
        name: 'drawSVG',
        register: function (e) {
          (c = e), u();
        },
        init: function (e, t) {
          if (!e.getBBox) return !1;
          y || u();
          var n,
            o,
            a,
            f = h(e);
          return (
            (this._style = e.style),
            (this._target = e),
            t + '' == 'true'
              ? (t = '0 100%')
              : t
              ? -1 === (t + '').indexOf(' ') && (t = '0 ' + t)
              : (t = '0 0'),
            (o = (function (e, t, n) {
              var r,
                i,
                o = e.indexOf(' ');
              return (
                (i =
                  o < 0
                    ? ((r = void 0 !== n ? n + '' : e), e)
                    : ((r = e.substr(0, o)), e.substr(o + 1))),
                (r = s(r, t)),
                (i = s(i, t)) < r ? [i, r] : [r, i]
              );
            })(t, f, (n = l(e, f))[0])),
            (this._length = r(f)),
            (this._dash = r(n[1] - n[0])),
            (this._offset = r(-n[0])),
            (this._dashPT = this.add(
              this,
              '_dash',
              this._dash,
              r(o[1] - o[0])
            )),
            (this._offsetPT = this.add(
              this,
              '_offset',
              this._offset,
              r(-o[0])
            )),
            _ &&
              (a = p.getComputedStyle(e)).strokeLinecap !== a.strokeLinejoin &&
              ((o = i(a.strokeMiterlimit)),
              this.add(e.style, 'strokeMiterlimit', o, o + 0.01)),
            (this._live = d(e) || ~(t + '').indexOf('live')),
            (this._nowrap = ~(t + '').indexOf('nowrap')),
            void this._props.push('drawSVG')
          );
        },
        render: function (e, t) {
          var n,
            r,
            i,
            s,
            o = t._pt,
            a = t._style;
          if (o) {
            for (
              t._live &&
              (n = h(t._target)) !== t._length &&
              ((r = n / t._length),
              (t._length = n),
              t._offsetPT && ((t._offsetPT.s *= r), (t._offsetPT.c *= r)),
              t._dashPT
                ? ((t._dashPT.s *= r), (t._dashPT.c *= r))
                : (t._dash *= r));
              o;

            )
              o.r(e, o.d), (o = o._next);
            (i = t._dash || (e && 1 !== e && 1e-4) || 0),
              (n = t._length - i + 0.1),
              (s = t._offset),
              i &&
                s &&
                i + Math.abs(s % t._length) > t._length - 0.2 &&
                (s += s < 0 ? 0.1 : -0.1) &&
                (n += 0.1),
              (a.strokeDashoffset = i ? s : s + 0.001),
              (a.strokeDasharray =
                n < 0.2
                  ? 'none'
                  : i
                  ? i + ',' + (t._nowrap ? 999999 : n)
                  : '0, 999999');
          }
        },
        getLength: h,
        getPosition: l,
      });
  n() && c.registerPlugin(m),
    (e.DrawSVGPlugin = m),
    (e.default = m),
    'undefined' == typeof window || window !== e
      ? Object.defineProperty(e, '__esModule', { value: !0 })
      : delete e.default;
});
