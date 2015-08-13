function relative_time(t) {
    var e = t.split(" ");
    t = e[1] + " " + e[2] + ", " + e[5] + " " + e[3];
    var i = Date.parse(t),
        n = arguments.length > 1 ? arguments[1] : new Date,
        s = parseInt((n.getTime() - i) / 1e3);
    return s += 60 * n.getTimezoneOffset(), 60 > s ? "less than a minute ago" : 120 > s ? "about a minute ago" : 3600 > s ? parseInt(s / 60).toString() + " minutes ago" : 7200 > s ? "about an hour ago" : 86400 > s ? "about " + parseInt(s / 3600).toString() + " hours ago" : 172800 > s ? "1 day ago" : parseInt(s / 86400).toString() + " days ago"
}

function ssc_init() {
    if (document.body) {
        var t = document.body,
            e = document.documentElement,
            i = window.innerHeight,
            n = t.scrollHeight;
        if (ssc_root = document.compatMode.indexOf("CSS") >= 0 ? e : t, ssc_activeElement = t, ssc_initdone = !0, top != self) ssc_frame = !0;
        else if (n > i && (t.offsetHeight <= i || e.offsetHeight <= i) && (ssc_root.style.height = "auto", ssc_root.offsetHeight <= i)) {
            var s = document.createElement("div");
            s.style.clear = "both", t.appendChild(s)
        }
        ssc_fixedback || (t.style.backgroundAttachment = "scroll", e.style.backgroundAttachment = "scroll"), ssc_keyboardsupport && ssc_addEvent("keydown", ssc_keydown)
    }
}

function ssc_scrollArray(t, e, i, n) {
    if (n || (n = 1e3), ssc_directionCheck(e, i), ssc_que.push({
        x: e,
        y: i,
        lastX: 0 > e ? .99 : -.99,
        lastY: 0 > i ? .99 : -.99,
        start: +new Date
    }), !ssc_pending) {
        var s = function() {
            for (var o = +new Date, r = 0, a = 0, l = 0; l < ssc_que.length; l++) {
                var c = ssc_que[l],
                    u = o - c.start,
                    h = u >= ssc_animtime,
                    d = h ? 1 : u / ssc_animtime;
                ssc_pulseAlgorithm && (d = ssc_pulse(d));
                var p = c.x * d - c.lastX >> 0,
                    f = c.y * d - c.lastY >> 0;
                r += p, a += f, c.lastX += p, c.lastY += f, h && (ssc_que.splice(l, 1), l--)
            }
            if (e) {
                var m = t.scrollLeft;
                t.scrollLeft += r, r && t.scrollLeft === m && (e = 0)
            }
            if (i) {
                var g = t.scrollTop;
                t.scrollTop += a, a && t.scrollTop === g && (i = 0)
            }
            e || i || (ssc_que = []), ssc_que.length ? setTimeout(s, n / ssc_framerate + 1) : ssc_pending = !1
        };
        setTimeout(s, 0), ssc_pending = !0
    }
}

function ssc_wheel(t) {
    ssc_initdone || ssc_init();
    var e = t.target,
        i = ssc_overflowingAncestor(e);
    if (!i || t.defaultPrevented || ssc_isNodeName(ssc_activeElement, "embed") || ssc_isNodeName(e, "embed") && /\.pdf/i.test(e.src)) return !0;
    var n = t.wheelDeltaX || 0,
        s = t.wheelDeltaY || 0;
    n || s || (s = t.wheelDelta || 0), Math.abs(n) > 1.2 && (n *= ssc_stepsize / 120), Math.abs(s) > 1.2 && (s *= ssc_stepsize / 120), ssc_scrollArray(i, -n, -s), t.preventDefault()
}

function ssc_keydown(t) {
    var e = t.target,
        i = t.ctrlKey || t.altKey || t.metaKey;
    if (/input|textarea|embed/i.test(e.nodeName) || e.isContentEditable || t.defaultPrevented || i) return !0;
    if (ssc_isNodeName(e, "button") && t.keyCode === ssc_key.spacebar) return !0;
    var n, s = 0,
        o = 0,
        r = ssc_overflowingAncestor(ssc_activeElement),
        a = r.clientHeight;
    switch (r == document.body && (a = window.innerHeight), t.keyCode) {
        case ssc_key.up:
            o = -ssc_arrowscroll;
            break;
        case ssc_key.down:
            o = ssc_arrowscroll;
            break;
        case ssc_key.spacebar:
            n = t.shiftKey ? 1 : -1, o = -n * a * .9;
            break;
        case ssc_key.pageup:
            o = .9 * -a;
            break;
        case ssc_key.pagedown:
            o = .9 * a;
            break;
        case ssc_key.home:
            o = -r.scrollTop;
            break;
        case ssc_key.end:
            var l = r.scrollHeight - r.scrollTop - a;
            o = l > 0 ? l + 10 : 0;
            break;
        case ssc_key.left:
            s = -ssc_arrowscroll;
            break;
        case ssc_key.right:
            s = ssc_arrowscroll;
            break;
        default:
            return !0
    }
    ssc_scrollArray(r, s, o), t.preventDefault()
}

function ssc_mousedown(t) {
    ssc_activeElement = t.target
}

function ssc_setCache(t, e) {
    for (var i = t.length; i--;) ssc_cache[ssc_uniqueID(t[i])] = e;
    return e
}

function ssc_overflowingAncestor(t) {
    var e = [],
        i = ssc_root.scrollHeight;
    do {
        var n = ssc_cache[ssc_uniqueID(t)];
        if (n) return ssc_setCache(e, n);
        if (e.push(t), i === t.scrollHeight) {
            if (!ssc_frame || ssc_root.clientHeight + 10 < i) return ssc_setCache(e, document.body)
        } else if (t.clientHeight + 10 < t.scrollHeight && (overflow = getComputedStyle(t, "").getPropertyValue("overflow"), "scroll" === overflow || "auto" === overflow)) return ssc_setCache(e, t)
    } while (t = t.parentNode)
}

function ssc_addEvent(t, e, i) {
    window.addEventListener(t, e, i || !1)
}

function ssc_removeEvent(t, e, i) {
    window.removeEventListener(t, e, i || !1)
}

function ssc_isNodeName(t, e) {
    return t.nodeName.toLowerCase() === e.toLowerCase()
}

function ssc_directionCheck(t, e) {
    t = t > 0 ? 1 : -1, e = e > 0 ? 1 : -1, (ssc_direction.x !== t || ssc_direction.y !== e) && (ssc_direction.x = t, ssc_direction.y = e, ssc_que = [])
}

function ssc_pulse_(t) {
    var e, i, n;
    return t *= ssc_pulseScale, 1 > t ? e = t - (1 - Math.exp(-t)) : (i = Math.exp(-1), t -= 1, n = 1 - Math.exp(-t), e = i + n * (1 - i)), e * ssc_pulseNormalize
}

function ssc_pulse(t) {
    return t >= 1 ? 1 : 0 >= t ? 0 : (1 == ssc_pulseNormalize && (ssc_pulseNormalize /= ssc_pulse_(1)), ssc_pulse_(t))
}
if (! function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t) {
        var e = t.length,
            i = se.type(t);
        return "function" === i || se.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }

    function n(t, e, i) {
        if (se.isFunction(e)) return se.grep(t, function(t, n) {
            return !!e.call(t, n, t) !== i
        });
        if (e.nodeType) return se.grep(t, function(t) {
            return t === e !== i
        });
        if ("string" == typeof e) {
            if (de.test(e)) return se.filter(e, t, i);
            e = se.filter(e, t)
        }
        return se.grep(t, function(t) {
            return se.inArray(t, e) >= 0 !== i
        })
    }

    function s(t, e) {
        do t = t[e]; while (t && 1 !== t.nodeType);
        return t
    }

    function o(t) {
        var e = we[t] = {};
        return se.each(t.match(be) || [], function(t, i) {
            e[i] = !0
        }), e
    }

    function r() {
        fe.addEventListener ? (fe.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1)) : (fe.detachEvent("onreadystatechange", a), t.detachEvent("onload", a))
    }

    function a() {
        (fe.addEventListener || "load" === event.type || "complete" === fe.readyState) && (r(), se.ready())
    }

    function l(t, e, i) {
        if (void 0 === i && 1 === t.nodeType) {
            var n = "data-" + e.replace(Te, "-$1").toLowerCase();
            if (i = t.getAttribute(n), "string" == typeof i) {
                try {
                    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : Se.test(i) ? se.parseJSON(i) : i
                } catch (s) {}
                se.data(t, e, i)
            } else i = void 0
        }
        return i
    }

    function c(t) {
        var e;
        for (e in t)
            if (("data" !== e || !se.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function u(t, e, i, n) {
        if (se.acceptData(t)) {
            var s, o, r = se.expando,
                a = t.nodeType,
                l = a ? se.cache : t,
                c = a ? t[r] : t[r] && r;
            if (c && l[c] && (n || l[c].data) || void 0 !== i || "string" != typeof e) return c || (c = a ? t[r] = Y.pop() || se.guid++ : r), l[c] || (l[c] = a ? {} : {
                toJSON: se.noop
            }), ("object" == typeof e || "function" == typeof e) && (n ? l[c] = se.extend(l[c], e) : l[c].data = se.extend(l[c].data, e)), o = l[c], n || (o.data || (o.data = {}), o = o.data), void 0 !== i && (o[se.camelCase(e)] = i), "string" == typeof e ? (s = o[e], null == s && (s = o[se.camelCase(e)])) : s = o, s
        }
    }

    function h(t, e, i) {
        if (se.acceptData(t)) {
            var n, s, o = t.nodeType,
                r = o ? se.cache : t,
                a = o ? t[se.expando] : se.expando;
            if (r[a]) {
                if (e && (n = i ? r[a] : r[a].data)) {
                    se.isArray(e) ? e = e.concat(se.map(e, se.camelCase)) : e in n ? e = [e] : (e = se.camelCase(e), e = e in n ? [e] : e.split(" ")), s = e.length;
                    for (; s--;) delete n[e[s]];
                    if (i ? !c(n) : !se.isEmptyObject(n)) return
                }(i || (delete r[a].data, c(r[a]))) && (o ? se.cleanData([t], !0) : ie.deleteExpando || r != r.window ? delete r[a] : r[a] = null)
            }
        }
    }

    function d() {
        return !0
    }

    function p() {
        return !1
    }

    function f() {
        try {
            return fe.activeElement
        } catch (t) {}
    }

    function m(t) {
        var e = Ne.split("|"),
            i = t.createDocumentFragment();
        if (i.createElement)
            for (; e.length;) i.createElement(e.pop());
        return i
    }

    function g(t, e) {
        var i, n, s = 0,
            o = typeof t.getElementsByTagName !== Ce ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== Ce ? t.querySelectorAll(e || "*") : void 0;
        if (!o)
            for (o = [], i = t.childNodes || t; null != (n = i[s]); s++)!e || se.nodeName(n, e) ? o.push(n) : se.merge(o, g(n, e));
        return void 0 === e || e && se.nodeName(t, e) ? se.merge([t], o) : o
    }

    function v(t) {
        Ie.test(t.type) && (t.defaultChecked = t.checked)
    }

    function y(t, e) {
        return se.nodeName(t, "table") && se.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function b(t) {
        return t.type = (null !== se.find.attr(t, "type")) + "/" + t.type, t
    }

    function w(t) {
        var e = Ue.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function x(t, e) {
        for (var i, n = 0; null != (i = t[n]); n++) se._data(i, "globalEval", !e || se._data(e[n], "globalEval"))
    }

    function _(t, e) {
        if (1 === e.nodeType && se.hasData(t)) {
            var i, n, s, o = se._data(t),
                r = se._data(e, o),
                a = o.events;
            if (a) {
                delete r.handle, r.events = {};
                for (i in a)
                    for (n = 0, s = a[i].length; s > n; n++) se.event.add(e, i, a[i][n])
            }
            r.data && (r.data = se.extend({}, r.data))
        }
    }

    function C(t, e) {
        var i, n, s;
        if (1 === e.nodeType) {
            if (i = e.nodeName.toLowerCase(), !ie.noCloneEvent && e[se.expando]) {
                s = se._data(e);
                for (n in s.events) se.removeEvent(e, n, s.handle);
                e.removeAttribute(se.expando)
            }
            "script" === i && e.text !== t.text ? (b(e).text = t.text, w(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), ie.html5Clone && t.innerHTML && !se.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && Ie.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
        }
    }

    function S(e, i) {
        var n, s = se(i.createElement(e)).appendTo(i.body),
            o = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(s[0])) ? n.display : se.css(s[0], "display");
        return s.detach(), o
    }

    function T(t) {
        var e = fe,
            i = Je[t];
        return i || (i = S(t, e), "none" !== i && i || (Ke = (Ke || se("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Ke[0].contentWindow || Ke[0].contentDocument).document, e.write(), e.close(), i = S(t, e), Ke.detach()), Je[t] = i), i
    }

    function k(t, e) {
        return {
            get: function() {
                var i = t();
                return null != i ? i ? void delete this.get : (this.get = e).apply(this, arguments) : void 0
            }
        }
    }

    function E(t, e) {
        if (e in t) return e;
        for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, s = di.length; s--;)
            if (e = di[s] + i, e in t) return e;
        return n
    }

    function L(t, e) {
        for (var i, n, s, o = [], r = 0, a = t.length; a > r; r++) n = t[r], n.style && (o[r] = se._data(n, "olddisplay"), i = n.style.display, e ? (o[r] || "none" !== i || (n.style.display = ""), "" === n.style.display && Le(n) && (o[r] = se._data(n, "olddisplay", T(n.nodeName)))) : (s = Le(n), (i && "none" !== i || !s) && se._data(n, "olddisplay", s ? i : se.css(n, "display"))));
        for (r = 0; a > r; r++) n = t[r], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? o[r] || "" : "none"));
        return t
    }

    function P(t, e, i) {
        var n = li.exec(e);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
    }

    function I(t, e, i, n, s) {
        for (var o = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, r = 0; 4 > o; o += 2) "margin" === i && (r += se.css(t, i + Ee[o], !0, s)), n ? ("content" === i && (r -= se.css(t, "padding" + Ee[o], !0, s)), "margin" !== i && (r -= se.css(t, "border" + Ee[o] + "Width", !0, s))) : (r += se.css(t, "padding" + Ee[o], !0, s), "padding" !== i && (r += se.css(t, "border" + Ee[o] + "Width", !0, s)));
        return r
    }

    function D(t, e, i) {
        var n = !0,
            s = "width" === e ? t.offsetWidth : t.offsetHeight,
            o = ti(t),
            r = ie.boxSizing && "border-box" === se.css(t, "boxSizing", !1, o);
        if (0 >= s || null == s) {
            if (s = ei(t, e, o), (0 > s || null == s) && (s = t.style[e]), ni.test(s)) return s;
            n = r && (ie.boxSizingReliable() || s === t.style[e]), s = parseFloat(s) || 0
        }
        return s + I(t, e, i || (r ? "border" : "content"), n, o) + "px"
    }

    function A(t, e, i, n, s) {
        return new A.prototype.init(t, e, i, n, s)
    }

    function M() {
        return setTimeout(function() {
            pi = void 0
        }), pi = se.now()
    }

    function O(t, e) {
        var i, n = {
                height: t
            },
            s = 0;
        for (e = e ? 1 : 0; 4 > s; s += 2 - e) i = Ee[s], n["margin" + i] = n["padding" + i] = t;
        return e && (n.opacity = n.width = t), n
    }

    function F(t, e, i) {
        for (var n, s = (bi[e] || []).concat(bi["*"]), o = 0, r = s.length; r > o; o++)
            if (n = s[o].call(i, e, t)) return n
    }

    function N(t, e, i) {
        var n, s, o, r, a, l, c, u, h = this,
            d = {},
            p = t.style,
            f = t.nodeType && Le(t),
            m = se._data(t, "fxshow");
        i.queue || (a = se._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
            a.unqueued || l()
        }), a.unqueued++, h.always(function() {
            h.always(function() {
                a.unqueued--, se.queue(t, "fx").length || a.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], c = se.css(t, "display"), u = "none" === c ? se._data(t, "olddisplay") || T(t.nodeName) : c, "inline" === u && "none" === se.css(t, "float") && (ie.inlineBlockNeedsLayout && "inline" !== T(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), i.overflow && (p.overflow = "hidden", ie.shrinkWrapBlocks() || h.always(function() {
            p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
        }));
        for (n in e)
            if (s = e[n], mi.exec(s)) {
                if (delete e[n], o = o || "toggle" === s, s === (f ? "hide" : "show")) {
                    if ("show" !== s || !m || void 0 === m[n]) continue;
                    f = !0
                }
                d[n] = m && m[n] || se.style(t, n)
            } else c = void 0;
        if (se.isEmptyObject(d)) "inline" === ("none" === c ? T(t.nodeName) : c) && (p.display = c);
        else {
            m ? "hidden" in m && (f = m.hidden) : m = se._data(t, "fxshow", {}), o && (m.hidden = !f), f ? se(t).show() : h.done(function() {
                se(t).hide()
            }), h.done(function() {
                var e;
                se._removeData(t, "fxshow");
                for (e in d) se.style(t, e, d[e])
            });
            for (n in d) r = F(f ? m[n] : 0, n, h), n in m || (m[n] = r.start, f && (r.end = r.start, r.start = "width" === n || "height" === n ? 1 : 0))
        }
    }

    function z(t, e) {
        var i, n, s, o, r;
        for (i in t)
            if (n = se.camelCase(i), s = e[n], o = t[i], se.isArray(o) && (s = o[1], o = t[i] = o[0]), i !== n && (t[n] = o, delete t[i]), r = se.cssHooks[n], r && "expand" in r) {
                o = r.expand(o), delete t[n];
                for (i in o) i in t || (t[i] = o[i], e[i] = s)
            } else e[n] = s
    }

    function j(t, e, i) {
        var n, s, o = 0,
            r = yi.length,
            a = se.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (s) return !1;
                for (var e = pi || M(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, o = 1 - n, r = 0, l = c.tweens.length; l > r; r++) c.tweens[r].run(o);
                return a.notifyWith(t, [c, o, i]), 1 > o && l ? i : (a.resolveWith(t, [c]), !1)
            },
            c = a.promise({
                elem: t,
                props: se.extend({}, e),
                opts: se.extend(!0, {
                    specialEasing: {}
                }, i),
                originalProperties: e,
                originalOptions: i,
                startTime: pi || M(),
                duration: i.duration,
                tweens: [],
                createTween: function(e, i) {
                    var n = se.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(n), n
                },
                stop: function(e) {
                    var i = 0,
                        n = e ? c.tweens.length : 0;
                    if (s) return this;
                    for (s = !0; n > i; i++) c.tweens[i].run(1);
                    return e ? a.resolveWith(t, [c, e]) : a.rejectWith(t, [c, e]), this
                }
            }),
            u = c.props;
        for (z(u, c.opts.specialEasing); r > o; o++)
            if (n = yi[o].call(c, t, u, c.opts)) return n;
        return se.map(u, F, c), se.isFunction(c.opts.start) && c.opts.start.call(t, c), se.fx.timer(se.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function R(t) {
        return function(e, i) {
            "string" != typeof e && (i = e, e = "*");
            var n, s = 0,
                o = e.toLowerCase().match(be) || [];
            if (se.isFunction(i))
                for (; n = o[s++];) "+" === n.charAt(0) ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }

    function W(t, e, i, n) {
        function s(a) {
            var l;
            return o[a] = !0, se.each(t[a] || [], function(t, a) {
                var c = a(e, i, n);
                return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (e.dataTypes.unshift(c), s(c), !1)
            }), l
        }
        var o = {},
            r = t === Bi;
        return s(e.dataTypes[0]) || !o["*"] && s("*")
    }

    function $(t, e) {
        var i, n, s = se.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((s[n] ? t : i || (i = {}))[n] = e[n]);
        return i && se.extend(!0, t, i), t
    }

    function H(t, e, i) {
        for (var n, s, o, r, a = t.contents, l = t.dataTypes;
            "*" === l[0];) l.shift(), void 0 === s && (s = t.mimeType || e.getResponseHeader("Content-Type"));
        if (s)
            for (r in a)
                if (a[r] && a[r].test(s)) {
                    l.unshift(r);
                    break
                }
        if (l[0] in i) o = l[0];
        else {
            for (r in i) {
                if (!l[0] || t.converters[r + " " + l[0]]) {
                    o = r;
                    break
                }
                n || (n = r)
            }
            o = o || n
        }
        return o ? (o !== l[0] && l.unshift(o), i[o]) : void 0
    }

    function B(t, e, i, n) {
        var s, o, r, a, l, c = {},
            u = t.dataTypes.slice();
        if (u[1])
            for (r in t.converters) c[r.toLowerCase()] = t.converters[r];
        for (o = u.shift(); o;)
            if (t.responseFields[o] && (i[t.responseFields[o]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = u.shift())
                if ("*" === o) o = l;
                else if ("*" !== l && l !== o) {
            if (r = c[l + " " + o] || c["* " + o], !r)
                for (s in c)
                    if (a = s.split(" "), a[1] === o && (r = c[l + " " + a[0]] || c["* " + a[0]])) {
                        r === !0 ? r = c[s] : c[s] !== !0 && (o = a[0], u.unshift(a[1]));
                        break
                    }
            if (r !== !0)
                if (r && t["throws"]) e = r(e);
                else try {
                    e = r(e)
                } catch (h) {
                    return {
                        state: "parsererror",
                        error: r ? h : "No conversion from " + l + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: e
        }
    }

    function q(t, e, i, n) {
        var s;
        if (se.isArray(e)) se.each(e, function(e, s) {
            i || Ui.test(t) ? n(t, s) : q(t + "[" + ("object" == typeof s ? e : "") + "]", s, i, n)
        });
        else if (i || "object" !== se.type(e)) n(t, e);
        else
            for (s in e) q(t + "[" + s + "]", e[s], i, n)
    }

    function X() {
        try {
            return new t.XMLHttpRequest
        } catch (e) {}
    }

    function V() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }

    function U(t) {
        return se.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }
    var Y = [],
        Q = Y.slice,
        G = Y.concat,
        Z = Y.push,
        K = Y.indexOf,
        J = {},
        te = J.toString,
        ee = J.hasOwnProperty,
        ie = {},
        ne = "1.11.1",
        se = function(t, e) {
            return new se.fn.init(t, e)
        },
        oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        re = /^-ms-/,
        ae = /-([\da-z])/gi,
        le = function(t, e) {
            return e.toUpperCase()
        };
    se.fn = se.prototype = {
        jquery: ne,
        constructor: se,
        selector: "",
        length: 0,
        toArray: function() {
            return Q.call(this)
        },
        get: function(t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : Q.call(this)
        },
        pushStack: function(t) {
            var e = se.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function(t, e) {
            return se.each(this, t, e)
        },
        map: function(t) {
            return this.pushStack(se.map(this, function(e, i) {
                return t.call(e, i, e)
            }))
        },
        slice: function() {
            return this.pushStack(Q.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                i = +t + (0 > t ? e : 0);
            return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Z,
        sort: Y.sort,
        splice: Y.splice
    }, se.extend = se.fn.extend = function() {
        var t, e, i, n, s, o, r = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof r && (c = r, r = arguments[a] || {}, a++), "object" == typeof r || se.isFunction(r) || (r = {}), a === l && (r = this, a--); l > a; a++)
            if (null != (s = arguments[a]))
                for (n in s) t = r[n], i = s[n], r !== i && (c && i && (se.isPlainObject(i) || (e = se.isArray(i))) ? (e ? (e = !1, o = t && se.isArray(t) ? t : []) : o = t && se.isPlainObject(t) ? t : {}, r[n] = se.extend(c, o, i)) : void 0 !== i && (r[n] = i));
        return r
    }, se.extend({
        expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isFunction: function(t) {
            return "function" === se.type(t)
        },
        isArray: Array.isArray || function(t) {
            return "array" === se.type(t)
        },
        isWindow: function(t) {
            return null != t && t == t.window
        },
        isNumeric: function(t) {
            return !se.isArray(t) && t - parseFloat(t) >= 0
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        isPlainObject: function(t) {
            var e;
            if (!t || "object" !== se.type(t) || t.nodeType || se.isWindow(t)) return !1;
            try {
                if (t.constructor && !ee.call(t, "constructor") && !ee.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (i) {
                return !1
            }
            if (ie.ownLast)
                for (e in t) return ee.call(t, e);
            for (e in t);
            return void 0 === e || ee.call(t, e)
        },
        type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? J[te.call(t)] || "object" : typeof t
        },
        globalEval: function(e) {
            e && se.trim(e) && (t.execScript || function(e) {
                t.eval.call(t, e)
            })(e)
        },
        camelCase: function(t) {
            return t.replace(re, "ms-").replace(ae, le)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, e, n) {
            var s, o = 0,
                r = t.length,
                a = i(t);
            if (n) {
                if (a)
                    for (; r > o && (s = e.apply(t[o], n), s !== !1); o++);
                else
                    for (o in t)
                        if (s = e.apply(t[o], n), s === !1) break
            } else if (a)
                for (; r > o && (s = e.call(t[o], o, t[o]), s !== !1); o++);
            else
                for (o in t)
                    if (s = e.call(t[o], o, t[o]), s === !1) break; return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(oe, "")
        },
        makeArray: function(t, e) {
            var n = e || [];
            return null != t && (i(Object(t)) ? se.merge(n, "string" == typeof t ? [t] : t) : Z.call(n, t)), n
        },
        inArray: function(t, e, i) {
            var n;
            if (e) {
                if (K) return K.call(e, t, i);
                for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                    if (i in e && e[i] === t) return i
            }
            return -1
        },
        merge: function(t, e) {
            for (var i = +e.length, n = 0, s = t.length; i > n;) t[s++] = e[n++];
            if (i !== i)
                for (; void 0 !== e[n];) t[s++] = e[n++];
            return t.length = s, t
        },
        grep: function(t, e, i) {
            for (var n, s = [], o = 0, r = t.length, a = !i; r > o; o++) n = !e(t[o], o), n !== a && s.push(t[o]);
            return s
        },
        map: function(t, e, n) {
            var s, o = 0,
                r = t.length,
                a = i(t),
                l = [];
            if (a)
                for (; r > o; o++) s = e(t[o], o, n), null != s && l.push(s);
            else
                for (o in t) s = e(t[o], o, n), null != s && l.push(s);
            return G.apply([], l)
        },
        guid: 1,
        proxy: function(t, e) {
            var i, n, s;
            return "string" == typeof e && (s = t[e], e = t, t = s), se.isFunction(t) ? (i = Q.call(arguments, 2), n = function() {
                return t.apply(e || this, i.concat(Q.call(arguments)))
            }, n.guid = t.guid = t.guid || se.guid++, n) : void 0
        },
        now: function() {
            return +new Date
        },
        support: ie
    }), se.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        J["[object " + e + "]"] = e.toLowerCase()
    });
    var ce = function(t) {
        function e(t, e, i, n) {
            var s, o, r, a, l, c, h, p, f, m;
            if ((e ? e.ownerDocument || e : W) !== A && D(e), e = e || A, i = i || [], !t || "string" != typeof t) return i;
            if (1 !== (a = e.nodeType) && 9 !== a) return [];
            if (O && !n) {
                if (s = ye.exec(t))
                    if (r = s[1]) {
                        if (9 === a) {
                            if (o = e.getElementById(r), !o || !o.parentNode) return i;
                            if (o.id === r) return i.push(o), i
                        } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(r)) && j(e, o) && o.id === r) return i.push(o), i
                    } else {
                        if (s[2]) return J.apply(i, e.getElementsByTagName(t)), i;
                        if ((r = s[3]) && x.getElementsByClassName && e.getElementsByClassName) return J.apply(i, e.getElementsByClassName(r)), i
                    }
                if (x.qsa && (!F || !F.test(t))) {
                    if (p = h = R, f = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                        for (c = T(t), (h = e.getAttribute("id")) ? p = h.replace(we, "\\$&") : e.setAttribute("id", p), p = "[id='" + p + "'] ", l = c.length; l--;) c[l] = p + d(c[l]);
                        f = be.test(t) && u(e.parentNode) || e, m = c.join(",")
                    }
                    if (m) try {
                        return J.apply(i, f.querySelectorAll(m)), i
                    } catch (g) {} finally {
                        h || e.removeAttribute("id")
                    }
                }
            }
            return E(t.replace(le, "$1"), e, i, n)
        }

        function i() {
            function t(i, n) {
                return e.push(i + " ") > _.cacheLength && delete t[e.shift()], t[i + " "] = n
            }
            var e = [];
            return t
        }

        function n(t) {
            return t[R] = !0, t
        }

        function s(t) {
            var e = A.createElement("div");
            try {
                return !!t(e)
            } catch (i) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function o(t, e) {
            for (var i = t.split("|"), n = t.length; n--;) _.attrHandle[i[n]] = e
        }

        function r(t, e) {
            var i = e && t,
                n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Y) - (~t.sourceIndex || Y);
            if (n) return n;
            if (i)
                for (; i = i.nextSibling;)
                    if (i === e) return -1;
            return t ? 1 : -1
        }

        function a(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return "input" === i && e.type === t
            }
        }

        function l(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }

        function c(t) {
            return n(function(e) {
                return e = +e, n(function(i, n) {
                    for (var s, o = t([], i.length, e), r = o.length; r--;) i[s = o[r]] && (i[s] = !(n[s] = i[s]))
                })
            })
        }

        function u(t) {
            return t && typeof t.getElementsByTagName !== U && t
        }

        function h() {}

        function d(t) {
            for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
            return n
        }

        function p(t, e, i) {
            var n = e.dir,
                s = i && "parentNode" === n,
                o = H++;
            return e.first ? function(e, i, o) {
                for (; e = e[n];)
                    if (1 === e.nodeType || s) return t(e, i, o)
            } : function(e, i, r) {
                var a, l, c = [$, o];
                if (r) {
                    for (; e = e[n];)
                        if ((1 === e.nodeType || s) && t(e, i, r)) return !0
                } else
                    for (; e = e[n];)
                        if (1 === e.nodeType || s) {
                            if (l = e[R] || (e[R] = {}), (a = l[n]) && a[0] === $ && a[1] === o) return c[2] = a[2];
                            if (l[n] = c, c[2] = t(e, i, r)) return !0
                        }
            }
        }

        function f(t) {
            return t.length > 1 ? function(e, i, n) {
                for (var s = t.length; s--;)
                    if (!t[s](e, i, n)) return !1;
                return !0
            } : t[0]
        }

        function m(t, i, n) {
            for (var s = 0, o = i.length; o > s; s++) e(t, i[s], n);
            return n
        }

        function g(t, e, i, n, s) {
            for (var o, r = [], a = 0, l = t.length, c = null != e; l > a; a++)(o = t[a]) && (!i || i(o, n, s)) && (r.push(o), c && e.push(a));
            return r
        }

        function v(t, e, i, s, o, r) {
            return s && !s[R] && (s = v(s)), o && !o[R] && (o = v(o, r)), n(function(n, r, a, l) {
                var c, u, h, d = [],
                    p = [],
                    f = r.length,
                    v = n || m(e || "*", a.nodeType ? [a] : a, []),
                    y = !t || !n && e ? v : g(v, d, t, a, l),
                    b = i ? o || (n ? t : f || s) ? [] : r : y;
                if (i && i(y, b, a, l), s)
                    for (c = g(b, p), s(c, [], a, l), u = c.length; u--;)(h = c[u]) && (b[p[u]] = !(y[p[u]] = h));
                if (n) {
                    if (o || t) {
                        if (o) {
                            for (c = [], u = b.length; u--;)(h = b[u]) && c.push(y[u] = h);
                            o(null, b = [], c, l)
                        }
                        for (u = b.length; u--;)(h = b[u]) && (c = o ? ee.call(n, h) : d[u]) > -1 && (n[c] = !(r[c] = h))
                    }
                } else b = g(b === r ? b.splice(f, b.length) : b), o ? o(null, r, b, l) : J.apply(r, b)
            })
        }

        function y(t) {
            for (var e, i, n, s = t.length, o = _.relative[t[0].type], r = o || _.relative[" "], a = o ? 1 : 0, l = p(function(t) {
                return t === e
            }, r, !0), c = p(function(t) {
                return ee.call(e, t) > -1
            }, r, !0), u = [
                function(t, i, n) {
                    return !o && (n || i !== L) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n))
                }
            ]; s > a; a++)
                if (i = _.relative[t[a].type]) u = [p(f(u), i)];
                else {
                    if (i = _.filter[t[a].type].apply(null, t[a].matches), i[R]) {
                        for (n = ++a; s > n && !_.relative[t[n].type]; n++);
                        return v(a > 1 && f(u), a > 1 && d(t.slice(0, a - 1).concat({
                            value: " " === t[a - 2].type ? "*" : ""
                        })).replace(le, "$1"), i, n > a && y(t.slice(a, n)), s > n && y(t = t.slice(n)), s > n && d(t))
                    }
                    u.push(i)
                }
            return f(u)
        }

        function b(t, i) {
            var s = i.length > 0,
                o = t.length > 0,
                r = function(n, r, a, l, c) {
                    var u, h, d, p = 0,
                        f = "0",
                        m = n && [],
                        v = [],
                        y = L,
                        b = n || o && _.find.TAG("*", c),
                        w = $ += null == y ? 1 : Math.random() || .1,
                        x = b.length;
                    for (c && (L = r !== A && r); f !== x && null != (u = b[f]); f++) {
                        if (o && u) {
                            for (h = 0; d = t[h++];)
                                if (d(u, r, a)) {
                                    l.push(u);
                                    break
                                }
                            c && ($ = w)
                        }
                        s && ((u = !d && u) && p--, n && m.push(u))
                    }
                    if (p += f, s && f !== p) {
                        for (h = 0; d = i[h++];) d(m, v, r, a);
                        if (n) {
                            if (p > 0)
                                for (; f--;) m[f] || v[f] || (v[f] = Z.call(l));
                            v = g(v)
                        }
                        J.apply(l, v), c && !n && v.length > 0 && p + i.length > 1 && e.uniqueSort(l)
                    }
                    return c && ($ = w, L = y), m
                };
            return s ? n(r) : r
        }
        var w, x, _, C, S, T, k, E, L, P, I, D, A, M, O, F, N, z, j, R = "sizzle" + -new Date,
            W = t.document,
            $ = 0,
            H = 0,
            B = i(),
            q = i(),
            X = i(),
            V = function(t, e) {
                return t === e && (I = !0), 0
            },
            U = "undefined",
            Y = 1 << 31,
            Q = {}.hasOwnProperty,
            G = [],
            Z = G.pop,
            K = G.push,
            J = G.push,
            te = G.slice,
            ee = G.indexOf || function(t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (this[e] === t) return e;
                return -1
            },
            ie = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            se = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            oe = se.replace("w", "w#"),
            re = "\\[" + ne + "*(" + se + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + oe + "))|)" + ne + "*\\]",
            ae = ":(" + se + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)",
            le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            ce = new RegExp("^" + ne + "*," + ne + "*"),
            ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            he = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            de = new RegExp(ae),
            pe = new RegExp("^" + oe + "$"),
            fe = {
                ID: new RegExp("^#(" + se + ")"),
                CLASS: new RegExp("^\\.(" + se + ")"),
                TAG: new RegExp("^(" + se.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + re),
                PSEUDO: new RegExp("^" + ae),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ie + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            me = /^(?:input|select|textarea|button)$/i,
            ge = /^h\d$/i,
            ve = /^[^{]+\{\s*\[native \w/,
            ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            be = /[+~]/,
            we = /'|\\/g,
            xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            _e = function(t, e, i) {
                var n = "0x" + e - 65536;
                return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            };
        try {
            J.apply(G = te.call(W.childNodes), W.childNodes), G[W.childNodes.length].nodeType
        } catch (Ce) {
            J = {
                apply: G.length ? function(t, e) {
                    K.apply(t, te.call(e))
                } : function(t, e) {
                    for (var i = t.length, n = 0; t[i++] = e[n++];);
                    t.length = i - 1
                }
            }
        }
        x = e.support = {}, S = e.isXML = function(t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }, D = e.setDocument = function(t) {
            var e, i = t ? t.ownerDocument || t : W,
                n = i.defaultView;
            return i !== A && 9 === i.nodeType && i.documentElement ? (A = i, M = i.documentElement, O = !S(i), n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", function() {
                D()
            }, !1) : n.attachEvent && n.attachEvent("onunload", function() {
                D()
            })), x.attributes = s(function(t) {
                return t.className = "i", !t.getAttribute("className")
            }), x.getElementsByTagName = s(function(t) {
                return t.appendChild(i.createComment("")), !t.getElementsByTagName("*").length
            }), x.getElementsByClassName = ve.test(i.getElementsByClassName) && s(function(t) {
                return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
            }), x.getById = s(function(t) {
                return M.appendChild(t).id = R, !i.getElementsByName || !i.getElementsByName(R).length
            }), x.getById ? (_.find.ID = function(t, e) {
                if (typeof e.getElementById !== U && O) {
                    var i = e.getElementById(t);
                    return i && i.parentNode ? [i] : []
                }
            }, _.filter.ID = function(t) {
                var e = t.replace(xe, _e);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete _.find.ID, _.filter.ID = function(t) {
                var e = t.replace(xe, _e);
                return function(t) {
                    var i = typeof t.getAttributeNode !== U && t.getAttributeNode("id");
                    return i && i.value === e
                }
            }), _.find.TAG = x.getElementsByTagName ? function(t, e) {
                return typeof e.getElementsByTagName !== U ? e.getElementsByTagName(t) : void 0
            } : function(t, e) {
                var i, n = [],
                    s = 0,
                    o = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; i = o[s++];) 1 === i.nodeType && n.push(i);
                    return n
                }
                return o
            }, _.find.CLASS = x.getElementsByClassName && function(t, e) {
                return typeof e.getElementsByClassName !== U && O ? e.getElementsByClassName(t) : void 0
            }, N = [], F = [], (x.qsa = ve.test(i.querySelectorAll)) && (s(function(t) {
                t.innerHTML = "<select msallowclip=''><option selected=''></option></select>", t.querySelectorAll("[msallowclip^='']").length && F.push("[*^$]=" + ne + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || F.push("\\[" + ne + "*(?:value|" + ie + ")"), t.querySelectorAll(":checked").length || F.push(":checked")
            }), s(function(t) {
                var e = i.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && F.push("name" + ne + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), F.push(",.*:")
            })), (x.matchesSelector = ve.test(z = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && s(function(t) {
                x.disconnectedMatch = z.call(t, "div"), z.call(t, "[s!='']:x"), N.push("!=", ae)
            }), F = F.length && new RegExp(F.join("|")), N = N.length && new RegExp(N.join("|")), e = ve.test(M.compareDocumentPosition), j = e || ve.test(M.contains) ? function(t, e) {
                var i = 9 === t.nodeType ? t.documentElement : t,
                    n = e && e.parentNode;
                return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
            } : function(t, e) {
                if (e)
                    for (; e = e.parentNode;)
                        if (e === t) return !0;
                return !1
            }, V = e ? function(t, e) {
                if (t === e) return I = !0, 0;
                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !x.sortDetached && e.compareDocumentPosition(t) === n ? t === i || t.ownerDocument === W && j(W, t) ? -1 : e === i || e.ownerDocument === W && j(W, e) ? 1 : P ? ee.call(P, t) - ee.call(P, e) : 0 : 4 & n ? -1 : 1)
            } : function(t, e) {
                if (t === e) return I = !0, 0;
                var n, s = 0,
                    o = t.parentNode,
                    a = e.parentNode,
                    l = [t],
                    c = [e];
                if (!o || !a) return t === i ? -1 : e === i ? 1 : o ? -1 : a ? 1 : P ? ee.call(P, t) - ee.call(P, e) : 0;
                if (o === a) return r(t, e);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (n = e; n = n.parentNode;) c.unshift(n);
                for (; l[s] === c[s];) s++;
                return s ? r(l[s], c[s]) : l[s] === W ? -1 : c[s] === W ? 1 : 0
            }, i) : A
        }, e.matches = function(t, i) {
            return e(t, null, null, i)
        }, e.matchesSelector = function(t, i) {
            if ((t.ownerDocument || t) !== A && D(t), i = i.replace(he, "='$1']"), !(!x.matchesSelector || !O || N && N.test(i) || F && F.test(i))) try {
                var n = z.call(t, i);
                if (n || x.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
            } catch (s) {}
            return e(i, A, null, [t]).length > 0
        }, e.contains = function(t, e) {
            return (t.ownerDocument || t) !== A && D(t), j(t, e)
        }, e.attr = function(t, e) {
            (t.ownerDocument || t) !== A && D(t);
            var i = _.attrHandle[e.toLowerCase()],
                n = i && Q.call(_.attrHandle, e.toLowerCase()) ? i(t, e, !O) : void 0;
            return void 0 !== n ? n : x.attributes || !O ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }, e.error = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function(t) {
            var e, i = [],
                n = 0,
                s = 0;
            if (I = !x.detectDuplicates, P = !x.sortStable && t.slice(0), t.sort(V), I) {
                for (; e = t[s++];) e === t[s] && (n = i.push(s));
                for (; n--;) t.splice(i[n], 1)
            }
            return P = null, t
        }, C = e.getText = function(t) {
            var e, i = "",
                n = 0,
                s = t.nodeType;
            if (s) {
                if (1 === s || 9 === s || 11 === s) {
                    if ("string" == typeof t.textContent) return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling) i += C(t)
                } else if (3 === s || 4 === s) return t.nodeValue
            } else
                for (; e = t[n++];) i += C(e);
            return i
        }, _ = e.selectors = {
            cacheLength: 50,
            createPseudo: n,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(t) {
                    return t[1] = t[1].replace(xe, _e), t[3] = (t[3] || t[4] || t[5] || "").replace(xe, _e), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                },
                CHILD: function(t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                },
                PSEUDO: function(t) {
                    var e, i = !t[6] && t[2];
                    return fe.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && de.test(i) && (e = T(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function(t) {
                    var e = t.replace(xe, _e).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    } : function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(t) {
                    var e = B[t + " "];
                    return e || (e = new RegExp("(^|" + ne + ")" + t + "(" + ne + "|$)")) && B(t, function(t) {
                        return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== U && t.getAttribute("class") || "")
                    })
                },
                ATTR: function(t, i, n) {
                    return function(s) {
                        var o = e.attr(s, t);
                        return null == o ? "!=" === i : i ? (o += "", "=" === i ? o === n : "!=" === i ? o !== n : "^=" === i ? n && 0 === o.indexOf(n) : "*=" === i ? n && o.indexOf(n) > -1 : "$=" === i ? n && o.slice(-n.length) === n : "~=" === i ? (" " + o + " ").indexOf(n) > -1 : "|=" === i ? o === n || o.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(t, e, i, n, s) {
                    var o = "nth" !== t.slice(0, 3),
                        r = "last" !== t.slice(-4),
                        a = "of-type" === e;
                    return 1 === n && 0 === s ? function(t) {
                        return !!t.parentNode
                    } : function(e, i, l) {
                        var c, u, h, d, p, f, m = o !== r ? "nextSibling" : "previousSibling",
                            g = e.parentNode,
                            v = a && e.nodeName.toLowerCase(),
                            y = !l && !a;
                        if (g) {
                            if (o) {
                                for (; m;) {
                                    for (h = e; h = h[m];)
                                        if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                    f = m = "only" === t && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [r ? g.firstChild : g.lastChild], r && y) {
                                for (u = g[R] || (g[R] = {}), c = u[t] || [], p = c[0] === $ && c[1], d = c[0] === $ && c[2], h = p && g.childNodes[p]; h = ++p && h && h[m] || (d = p = 0) || f.pop();)
                                    if (1 === h.nodeType && ++d && h === e) {
                                        u[t] = [$, p, d];
                                        break
                                    }
                            } else if (y && (c = (e[R] || (e[R] = {}))[t]) && c[0] === $) d = c[1];
                            else
                                for (;
                                    (h = ++p && h && h[m] || (d = p = 0) || f.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++d || (y && ((h[R] || (h[R] = {}))[t] = [$, d]), h !== e)););
                            return d -= s, d === n || d % n === 0 && d / n >= 0
                        }
                    }
                },
                PSEUDO: function(t, i) {
                    var s, o = _.pseudos[t] || _.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return o[R] ? o(i) : o.length > 1 ? (s = [t, t, "", i], _.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                        for (var n, s = o(t, i), r = s.length; r--;) n = ee.call(t, s[r]), t[n] = !(e[n] = s[r])
                    }) : function(t) {
                        return o(t, 0, s)
                    }) : o
                }
            },
            pseudos: {
                not: n(function(t) {
                    var e = [],
                        i = [],
                        s = k(t.replace(le, "$1"));
                    return s[R] ? n(function(t, e, i, n) {
                        for (var o, r = s(t, null, n, []), a = t.length; a--;)(o = r[a]) && (t[a] = !(e[a] = o))
                    }) : function(t, n, o) {
                        return e[0] = t, s(e, null, o, i), !i.pop()
                    }
                }),
                has: n(function(t) {
                    return function(i) {
                        return e(t, i).length > 0
                    }
                }),
                contains: n(function(t) {
                    return function(e) {
                        return (e.textContent || e.innerText || C(e)).indexOf(t) > -1
                    }
                }),
                lang: n(function(t) {
                    return pe.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(xe, _e).toLowerCase(),
                        function(e) {
                            var i;
                            do
                                if (i = O ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-");
                            while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                }),
                target: function(e) {
                    var i = t.location && t.location.hash;
                    return i && i.slice(1) === e.id
                },
                root: function(t) {
                    return t === M
                },
                focus: function(t) {
                    return t === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: function(t) {
                    return t.disabled === !1
                },
                disabled: function(t) {
                    return t.disabled === !0
                },
                checked: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function(t) {
                    return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                },
                empty: function(t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6) return !1;
                    return !0
                },
                parent: function(t) {
                    return !_.pseudos.empty(t)
                },
                header: function(t) {
                    return ge.test(t.nodeName)
                },
                input: function(t) {
                    return me.test(t.nodeName)
                },
                button: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },
                text: function(t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(t, e) {
                    return [e - 1]
                }),
                eq: c(function(t, e, i) {
                    return [0 > i ? i + e : i]
                }),
                even: c(function(t, e) {
                    for (var i = 0; e > i; i += 2) t.push(i);
                    return t
                }),
                odd: c(function(t, e) {
                    for (var i = 1; e > i; i += 2) t.push(i);
                    return t
                }),
                lt: c(function(t, e, i) {
                    for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
                    return t
                }),
                gt: c(function(t, e, i) {
                    for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
                    return t
                })
            }
        }, _.pseudos.nth = _.pseudos.eq;
        for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) _.pseudos[w] = a(w);
        for (w in {
            submit: !0,
            reset: !0
        }) _.pseudos[w] = l(w);
        return h.prototype = _.filters = _.pseudos, _.setFilters = new h, T = e.tokenize = function(t, i) {
            var n, s, o, r, a, l, c, u = q[t + " "];
            if (u) return i ? 0 : u.slice(0);
            for (a = t, l = [], c = _.preFilter; a;) {
                (!n || (s = ce.exec(a))) && (s && (a = a.slice(s[0].length) || a), l.push(o = [])), n = !1, (s = ue.exec(a)) && (n = s.shift(), o.push({
                    value: n,
                    type: s[0].replace(le, " ")
                }), a = a.slice(n.length));
                for (r in _.filter)!(s = fe[r].exec(a)) || c[r] && !(s = c[r](s)) || (n = s.shift(), o.push({
                    value: n,
                    type: r,
                    matches: s
                }), a = a.slice(n.length));
                if (!n) break
            }
            return i ? a.length : a ? e.error(t) : q(t, l).slice(0)
        }, k = e.compile = function(t, e) {
            var i, n = [],
                s = [],
                o = X[t + " "];
            if (!o) {
                for (e || (e = T(t)), i = e.length; i--;) o = y(e[i]), o[R] ? n.push(o) : s.push(o);
                o = X(t, b(s, n)), o.selector = t
            }
            return o
        }, E = e.select = function(t, e, i, n) {
            var s, o, r, a, l, c = "function" == typeof t && t,
                h = !n && T(t = c.selector || t);
            if (i = i || [], 1 === h.length) {
                if (o = h[0] = h[0].slice(0), o.length > 2 && "ID" === (r = o[0]).type && x.getById && 9 === e.nodeType && O && _.relative[o[1].type]) {
                    if (e = (_.find.ID(r.matches[0].replace(xe, _e), e) || [])[0], !e) return i;
                    c && (e = e.parentNode), t = t.slice(o.shift().value.length)
                }
                for (s = fe.needsContext.test(t) ? 0 : o.length; s-- && (r = o[s], !_.relative[a = r.type]);)
                    if ((l = _.find[a]) && (n = l(r.matches[0].replace(xe, _e), be.test(o[0].type) && u(e.parentNode) || e))) {
                        if (o.splice(s, 1), t = n.length && d(o), !t) return J.apply(i, n), i;
                        break
                    }
            }
            return (c || k(t, h))(n, e, !O, i, be.test(t) && u(e.parentNode) || e), i
        }, x.sortStable = R.split("").sort(V).join("") === R, x.detectDuplicates = !!I, D(), x.sortDetached = s(function(t) {
            return 1 & t.compareDocumentPosition(A.createElement("div"))
        }), s(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(t, e, i) {
            return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), x.attributes && s(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || o("value", function(t, e, i) {
            return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), s(function(t) {
            return null == t.getAttribute("disabled")
        }) || o(ie, function(t, e, i) {
            var n;
            return i ? void 0 : t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }), e
    }(t);
    se.find = ce, se.expr = ce.selectors, se.expr[":"] = se.expr.pseudos, se.unique = ce.uniqueSort, se.text = ce.getText, se.isXMLDoc = ce.isXML, se.contains = ce.contains;
    var ue = se.expr.match.needsContext,
        he = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        de = /^.[^:#\[\.,]*$/;
    se.filter = function(t, e, i) {
        var n = e[0];
        return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? se.find.matchesSelector(n, t) ? [n] : [] : se.find.matches(t, se.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, se.fn.extend({
        find: function(t) {
            var e, i = [],
                n = this,
                s = n.length;
            if ("string" != typeof t) return this.pushStack(se(t).filter(function() {
                for (e = 0; s > e; e++)
                    if (se.contains(n[e], this)) return !0
            }));
            for (e = 0; s > e; e++) se.find(t, n[e], i);
            return i = this.pushStack(s > 1 ? se.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
        },
        filter: function(t) {
            return this.pushStack(n(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(n(this, t || [], !0))
        },
        is: function(t) {
            return !!n(this, "string" == typeof t && ue.test(t) ? se(t) : t || [], !1).length
        }
    });
    var pe, fe = t.document,
        me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ge = se.fn.init = function(t, e) {
            var i, n;
            if (!t) return this;
            if ("string" == typeof t) {
                if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : me.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || pe).find(t) : this.constructor(e).find(t);
                if (i[1]) {
                    if (e = e instanceof se ? e[0] : e, se.merge(this, se.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : fe, !0)), he.test(i[1]) && se.isPlainObject(e))
                        for (i in e) se.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                    return this
                }
                if (n = fe.getElementById(i[2]), n && n.parentNode) {
                    if (n.id !== i[2]) return pe.find(t);
                    this.length = 1, this[0] = n
                }
                return this.context = fe, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : se.isFunction(t) ? "undefined" != typeof pe.ready ? pe.ready(t) : t(se) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), se.makeArray(t, this))
        };
    ge.prototype = se.fn, pe = se(fe);
    var ve = /^(?:parents|prev(?:Until|All))/,
        ye = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    se.extend({
        dir: function(t, e, i) {
            for (var n = [], s = t[e]; s && 9 !== s.nodeType && (void 0 === i || 1 !== s.nodeType || !se(s).is(i));) 1 === s.nodeType && n.push(s), s = s[e];
            return n
        },
        sibling: function(t, e) {
            for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
            return i
        }
    }), se.fn.extend({
        has: function(t) {
            var e, i = se(t, this),
                n = i.length;
            return this.filter(function() {
                for (e = 0; n > e; e++)
                    if (se.contains(this, i[e])) return !0
            })
        },
        closest: function(t, e) {
            for (var i, n = 0, s = this.length, o = [], r = ue.test(t) || "string" != typeof t ? se(t, e || this.context) : 0; s > n; n++)
                for (i = this[n]; i && i !== e; i = i.parentNode)
                    if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && se.find.matchesSelector(i, t))) {
                        o.push(i);
                        break
                    }
            return this.pushStack(o.length > 1 ? se.unique(o) : o)
        },
        index: function(t) {
            return t ? "string" == typeof t ? se.inArray(this[0], se(t)) : se.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(se.unique(se.merge(this.get(), se(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), se.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return se.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, i) {
            return se.dir(t, "parentNode", i)
        },
        next: function(t) {
            return s(t, "nextSibling")
        },
        prev: function(t) {
            return s(t, "previousSibling")
        },
        nextAll: function(t) {
            return se.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return se.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, i) {
            return se.dir(t, "nextSibling", i)
        },
        prevUntil: function(t, e, i) {
            return se.dir(t, "previousSibling", i)
        },
        siblings: function(t) {
            return se.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return se.sibling(t.firstChild)
        },
        contents: function(t) {
            return se.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : se.merge([], t.childNodes)
        }
    }, function(t, e) {
        se.fn[t] = function(i, n) {
            var s = se.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (s = se.filter(n, s)), this.length > 1 && (ye[t] || (s = se.unique(s)), ve.test(t) && (s = s.reverse())), this.pushStack(s)
        }
    });
    var be = /\S+/g,
        we = {};
    se.Callbacks = function(t) {
        t = "string" == typeof t ? we[t] || o(t) : se.extend({}, t);
        var e, i, n, s, r, a, l = [],
            c = !t.once && [],
            u = function(o) {
                for (i = t.memory && o, n = !0, r = a || 0, a = 0, s = l.length, e = !0; l && s > r; r++)
                    if (l[r].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
                        i = !1;
                        break
                    }
                e = !1, l && (c ? c.length && u(c.shift()) : i ? l = [] : h.disable())
            },
            h = {
                add: function() {
                    if (l) {
                        var n = l.length;
                        ! function o(e) {
                            se.each(e, function(e, i) {
                                var n = se.type(i);
                                "function" === n ? t.unique && h.has(i) || l.push(i) : i && i.length && "string" !== n && o(i)
                            })
                        }(arguments), e ? s = l.length : i && (a = n, u(i))
                    }
                    return this
                },
                remove: function() {
                    return l && se.each(arguments, function(t, i) {
                        for (var n;
                            (n = se.inArray(i, l, n)) > -1;) l.splice(n, 1), e && (s >= n && s--, r >= n && r--)
                    }), this
                },
                has: function(t) {
                    return t ? se.inArray(t, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], s = 0, this
                },
                disable: function() {
                    return l = c = i = void 0, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return c = void 0, i || h.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(t, i) {
                    return !l || n && !c || (i = i || [], i = [t, i.slice ? i.slice() : i], e ? c.push(i) : u(i)), this
                },
                fire: function() {
                    return h.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return h
    }, se.extend({
        Deferred: function(t) {
            var e = [
                    ["resolve", "done", se.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", se.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", se.Callbacks("memory")]
                ],
                i = "pending",
                n = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var t = arguments;
                        return se.Deferred(function(i) {
                            se.each(e, function(e, o) {
                                var r = se.isFunction(t[e]) && t[e];
                                s[o[1]](function() {
                                    var t = r && r.apply(this, arguments);
                                    t && se.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o[0] + "With"](this === n ? i.promise() : this, r ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? se.extend(t, n) : n
                    }
                },
                s = {};
            return n.pipe = n.then, se.each(e, function(t, o) {
                var r = o[2],
                    a = o[3];
                n[o[1]] = r.add, a && r.add(function() {
                    i = a
                }, e[1 ^ t][2].disable, e[2][2].lock), s[o[0]] = function() {
                    return s[o[0] + "With"](this === s ? n : this, arguments), this
                }, s[o[0] + "With"] = r.fireWith
            }), n.promise(s), t && t.call(s, s), s
        },
        when: function(t) {
            var e, i, n, s = 0,
                o = Q.call(arguments),
                r = o.length,
                a = 1 !== r || t && se.isFunction(t.promise) ? r : 0,
                l = 1 === a ? t : se.Deferred(),
                c = function(t, i, n) {
                    return function(s) {
                        i[t] = this, n[t] = arguments.length > 1 ? Q.call(arguments) : s, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
                    }
                };
            if (r > 1)
                for (e = new Array(r), i = new Array(r), n = new Array(r); r > s; s++) o[s] && se.isFunction(o[s].promise) ? o[s].promise().done(c(s, n, o)).fail(l.reject).progress(c(s, i, e)) : --a;
            return a || l.resolveWith(n, o), l.promise()
        }
    });
    var xe;
    se.fn.ready = function(t) {
        return se.ready.promise().done(t), this
    }, se.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(t) {
            t ? se.readyWait++ : se.ready(!0)
        },
        ready: function(t) {
            if (t === !0 ? !--se.readyWait : !se.isReady) {
                if (!fe.body) return setTimeout(se.ready);
                se.isReady = !0, t !== !0 && --se.readyWait > 0 || (xe.resolveWith(fe, [se]), se.fn.triggerHandler && (se(fe).triggerHandler("ready"), se(fe).off("ready")))
            }
        }
    }), se.ready.promise = function(e) {
        if (!xe)
            if (xe = se.Deferred(), "complete" === fe.readyState) setTimeout(se.ready);
            else if (fe.addEventListener) fe.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1);
        else {
            fe.attachEvent("onreadystatechange", a), t.attachEvent("onload", a);
            var i = !1;
            try {
                i = null == t.frameElement && fe.documentElement
            } catch (n) {}
            i && i.doScroll && ! function s() {
                if (!se.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (t) {
                        return setTimeout(s, 50)
                    }
                    r(), se.ready()
                }
            }()
        }
        return xe.promise(e)
    };
    var _e, Ce = "undefined";
    for (_e in se(ie)) break;
    ie.ownLast = "0" !== _e, ie.inlineBlockNeedsLayout = !1, se(function() {
        var t, e, i, n;
        i = fe.getElementsByTagName("body")[0], i && i.style && (e = fe.createElement("div"), n = fe.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== Ce && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ie.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (i.style.zoom = 1)), i.removeChild(n))
    }),
    function() {
        var t = fe.createElement("div");
        if (null == ie.deleteExpando) {
            ie.deleteExpando = !0;
            try {
                delete t.test
            } catch (e) {
                ie.deleteExpando = !1
            }
        }
        t = null
    }(), se.acceptData = function(t) {
        var e = se.noData[(t.nodeName + " ").toLowerCase()],
            i = +t.nodeType || 1;
        return 1 !== i && 9 !== i ? !1 : !e || e !== !0 && t.getAttribute("classid") === e
    };
    var Se = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Te = /([A-Z])/g;
    se.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(t) {
            return t = t.nodeType ? se.cache[t[se.expando]] : t[se.expando], !!t && !c(t)
        },
        data: function(t, e, i) {
            return u(t, e, i)
        },
        removeData: function(t, e) {
            return h(t, e)
        },
        _data: function(t, e, i) {
            return u(t, e, i, !0)
        },
        _removeData: function(t, e) {
            return h(t, e, !0)
        }
    }), se.fn.extend({
        data: function(t, e) {
            var i, n, s, o = this[0],
                r = o && o.attributes;
            if (void 0 === t) {
                if (this.length && (s = se.data(o), 1 === o.nodeType && !se._data(o, "parsedAttrs"))) {
                    for (i = r.length; i--;) r[i] && (n = r[i].name, 0 === n.indexOf("data-") && (n = se.camelCase(n.slice(5)), l(o, n, s[n])));
                    se._data(o, "parsedAttrs", !0)
                }
                return s
            }
            return "object" == typeof t ? this.each(function() {
                se.data(this, t)
            }) : arguments.length > 1 ? this.each(function() {
                se.data(this, t, e)
            }) : o ? l(o, t, se.data(o, t)) : void 0
        },
        removeData: function(t) {
            return this.each(function() {
                se.removeData(this, t)
            })
        }
    }), se.extend({
        queue: function(t, e, i) {
            var n;
            return t ? (e = (e || "fx") + "queue", n = se._data(t, e), i && (!n || se.isArray(i) ? n = se._data(t, e, se.makeArray(i)) : n.push(i)), n || []) : void 0
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var i = se.queue(t, e),
                n = i.length,
                s = i.shift(),
                o = se._queueHooks(t, e),
                r = function() {
                    se.dequeue(t, e)
                };
            "inprogress" === s && (s = i.shift(), n--), s && ("fx" === e && i.unshift("inprogress"), delete o.stop, s.call(t, r, o)), !n && o && o.empty.fire()
        },
        _queueHooks: function(t, e) {
            var i = e + "queueHooks";
            return se._data(t, i) || se._data(t, i, {
                empty: se.Callbacks("once memory").add(function() {
                    se._removeData(t, e + "queue"), se._removeData(t, i)
                })
            })
        }
    }), se.fn.extend({
        queue: function(t, e) {
            var i = 2;
            return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? se.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var i = se.queue(this, t, e);
                se._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && se.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                se.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var i, n = 1,
                s = se.Deferred(),
                o = this,
                r = this.length,
                a = function() {
                    --n || s.resolveWith(o, [o])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; r--;) i = se._data(o[r], t + "queueHooks"), i && i.empty && (n++, i.empty.add(a));
            return a(), s.promise(e)
        }
    });
    var ke = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Ee = ["Top", "Right", "Bottom", "Left"],
        Le = function(t, e) {
            return t = e || t, "none" === se.css(t, "display") || !se.contains(t.ownerDocument, t)
        },
        Pe = se.access = function(t, e, i, n, s, o, r) {
            var a = 0,
                l = t.length,
                c = null == i;
            if ("object" === se.type(i)) {
                s = !0;
                for (a in i) se.access(t, e, a, i[a], !0, o, r)
            } else if (void 0 !== n && (s = !0, se.isFunction(n) || (r = !0), c && (r ? (e.call(t, n), e = null) : (c = e, e = function(t, e, i) {
                return c.call(se(t), i)
            })), e))
                for (; l > a; a++) e(t[a], i, r ? n : n.call(t[a], a, e(t[a], i)));
            return s ? t : c ? e.call(t) : l ? e(t[0], i) : o
        },
        Ie = /^(?:checkbox|radio)$/i;
    ! function() {
        var t = fe.createElement("input"),
            e = fe.createElement("div"),
            i = fe.createDocumentFragment();
        if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ie.leadingWhitespace = 3 === e.firstChild.nodeType, ie.tbody = !e.getElementsByTagName("tbody").length, ie.htmlSerialize = !!e.getElementsByTagName("link").length, ie.html5Clone = "<:nav></:nav>" !== fe.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, i.appendChild(t), ie.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, i.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", ie.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, ie.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function() {
            ie.noCloneEvent = !1
        }), e.cloneNode(!0).click()), null == ie.deleteExpando) {
            ie.deleteExpando = !0;
            try {
                delete e.test
            } catch (n) {
                ie.deleteExpando = !1
            }
        }
    }(),
    function() {
        var e, i, n = fe.createElement("div");
        for (e in {
            submit: !0,
            change: !0,
            focusin: !0
        }) i = "on" + e, (ie[e + "Bubbles"] = i in t) || (n.setAttribute(i, "t"), ie[e + "Bubbles"] = n.attributes[i].expando === !1);
        n = null
    }();
    var De = /^(?:input|select|textarea)$/i,
        Ae = /^key/,
        Me = /^(?:mouse|pointer|contextmenu)|click/,
        Oe = /^(?:focusinfocus|focusoutblur)$/,
        Fe = /^([^.]*)(?:\.(.+)|)$/;
    se.event = {
        global: {},
        add: function(t, e, i, n, s) {
            var o, r, a, l, c, u, h, d, p, f, m, g = se._data(t);
            if (g) {
                for (i.handler && (l = i, i = l.handler, s = l.selector), i.guid || (i.guid = se.guid++), (r = g.events) || (r = g.events = {}), (u = g.handle) || (u = g.handle = function(t) {
                    return typeof se === Ce || t && se.event.triggered === t.type ? void 0 : se.event.dispatch.apply(u.elem, arguments)
                }, u.elem = t), e = (e || "").match(be) || [""], a = e.length; a--;) o = Fe.exec(e[a]) || [], p = m = o[1], f = (o[2] || "").split(".").sort(), p && (c = se.event.special[p] || {}, p = (s ? c.delegateType : c.bindType) || p, c = se.event.special[p] || {}, h = se.extend({
                    type: p,
                    origType: m,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: s,
                    needsContext: s && se.expr.match.needsContext.test(s),
                    namespace: f.join(".")
                }, l), (d = r[p]) || (d = r[p] = [], d.delegateCount = 0, c.setup && c.setup.call(t, n, f, u) !== !1 || (t.addEventListener ? t.addEventListener(p, u, !1) : t.attachEvent && t.attachEvent("on" + p, u))), c.add && (c.add.call(t, h), h.handler.guid || (h.handler.guid = i.guid)), s ? d.splice(d.delegateCount++, 0, h) : d.push(h), se.event.global[p] = !0);
                t = null
            }
        },
        remove: function(t, e, i, n, s) {
            var o, r, a, l, c, u, h, d, p, f, m, g = se.hasData(t) && se._data(t);
            if (g && (u = g.events)) {
                for (e = (e || "").match(be) || [""], c = e.length; c--;)
                    if (a = Fe.exec(e[c]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                        for (h = se.event.special[p] || {}, p = (n ? h.delegateType : h.bindType) || p, d = u[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = d.length; o--;) r = d[o], !s && m !== r.origType || i && i.guid !== r.guid || a && !a.test(r.namespace) || n && n !== r.selector && ("**" !== n || !r.selector) || (d.splice(o, 1), r.selector && d.delegateCount--, h.remove && h.remove.call(t, r));
                        l && !d.length && (h.teardown && h.teardown.call(t, f, g.handle) !== !1 || se.removeEvent(t, p, g.handle), delete u[p])
                    } else
                        for (p in u) se.event.remove(t, p + e[c], i, n, !0);
                se.isEmptyObject(u) && (delete g.handle, se._removeData(t, "events"))
            }
        },
        trigger: function(e, i, n, s) {
            var o, r, a, l, c, u, h, d = [n || fe],
                p = ee.call(e, "type") ? e.type : e,
                f = ee.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = u = n = n || fe, 3 !== n.nodeType && 8 !== n.nodeType && !Oe.test(p + se.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), r = p.indexOf(":") < 0 && "on" + p, e = e[se.expando] ? e : new se.Event(p, "object" == typeof e && e), e.isTrigger = s ? 2 : 3, e.namespace = f.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : se.makeArray(i, [e]), c = se.event.special[p] || {}, s || !c.trigger || c.trigger.apply(n, i) !== !1)) {
                if (!s && !c.noBubble && !se.isWindow(n)) {
                    for (l = c.delegateType || p, Oe.test(l + p) || (a = a.parentNode); a; a = a.parentNode) d.push(a), u = a;
                    u === (n.ownerDocument || fe) && d.push(u.defaultView || u.parentWindow || t)
                }
                for (h = 0;
                    (a = d[h++]) && !e.isPropagationStopped();) e.type = h > 1 ? l : c.bindType || p, o = (se._data(a, "events") || {})[e.type] && se._data(a, "handle"), o && o.apply(a, i), o = r && a[r], o && o.apply && se.acceptData(a) && (e.result = o.apply(a, i), e.result === !1 && e.preventDefault());
                if (e.type = p, !s && !e.isDefaultPrevented() && (!c._default || c._default.apply(d.pop(), i) === !1) && se.acceptData(n) && r && n[p] && !se.isWindow(n)) {
                    u = n[r], u && (n[r] = null), se.event.triggered = p;
                    try {
                        n[p]()
                    } catch (m) {}
                    se.event.triggered = void 0, u && (n[r] = u)
                }
                return e.result
            }
        },
        dispatch: function(t) {
            t = se.event.fix(t);
            var e, i, n, s, o, r = [],
                a = Q.call(arguments),
                l = (se._data(this, "events") || {})[t.type] || [],
                c = se.event.special[t.type] || {};
            if (a[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                for (r = se.event.handlers.call(this, t, l), e = 0;
                    (s = r[e++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = s.elem, o = 0;
                        (n = s.handlers[o++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(n.namespace)) && (t.handleObj = n, t.data = n.data, i = ((se.event.special[n.origType] || {}).handle || n.handler).apply(s.elem, a), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(t, e) {
            var i, n, s, o, r = [],
                a = e.delegateCount,
                l = t.target;
            if (a && l.nodeType && (!t.button || "click" !== t.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                        for (s = [], o = 0; a > o; o++) n = e[o], i = n.selector + " ", void 0 === s[i] && (s[i] = n.needsContext ? se(i, this).index(l) >= 0 : se.find(i, this, null, [l]).length), s[i] && s.push(n);
                        s.length && r.push({
                            elem: l,
                            handlers: s
                        })
                    }
            return a < e.length && r.push({
                elem: this,
                handlers: e.slice(a)
            }), r
        },
        fix: function(t) {
            if (t[se.expando]) return t;
            var e, i, n, s = t.type,
                o = t,
                r = this.fixHooks[s];
            for (r || (this.fixHooks[s] = r = Me.test(s) ? this.mouseHooks : Ae.test(s) ? this.keyHooks : {}), n = r.props ? this.props.concat(r.props) : this.props, t = new se.Event(o), e = n.length; e--;) i = n[e], t[i] = o[i];
            return t.target || (t.target = o.srcElement || fe), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, r.filter ? r.filter(t, o) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, e) {
                var i, n, s, o = e.button,
                    r = e.fromElement;
                return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || fe, s = n.documentElement, i = n.body, t.pageX = e.clientX + (s && s.scrollLeft || i && i.scrollLeft || 0) - (s && s.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (s && s.scrollTop || i && i.scrollTop || 0) - (s && s.clientTop || i && i.clientTop || 0)), !t.relatedTarget && r && (t.relatedTarget = r === t.target ? e.toElement : r), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== f() && this.focus) try {
                        return this.focus(), !1
                    } catch (t) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return se.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(t) {
                    return se.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, i, n) {
            var s = se.extend(new se.Event, i, {
                type: t,
                isSimulated: !0,
                originalEvent: {}
            });
            n ? se.event.trigger(s, null, e) : se.event.dispatch.call(e, s), s.isDefaultPrevented() && i.preventDefault()
        }
    }, se.removeEvent = fe.removeEventListener ? function(t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i, !1)
    } : function(t, e, i) {
        var n = "on" + e;
        t.detachEvent && (typeof t[n] === Ce && (t[n] = null), t.detachEvent(n, i))
    }, se.Event = function(t, e) {
        return this instanceof se.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? d : p) : this.type = t, e && se.extend(this, e), this.timeStamp = t && t.timeStamp || se.now(), void(this[se.expando] = !0)) : new se.Event(t, e)
    }, se.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = d, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = d, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = d, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, se.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        se.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var i, n = this,
                    s = t.relatedTarget,
                    o = t.handleObj;
                return (!s || s !== n && !se.contains(n, s)) && (t.type = o.origType, i = o.handler.apply(this, arguments), t.type = e), i
            }
        }
    }), ie.submitBubbles || (se.event.special.submit = {
        setup: function() {
            return se.nodeName(this, "form") ? !1 : void se.event.add(this, "click._submit keypress._submit", function(t) {
                var e = t.target,
                    i = se.nodeName(e, "input") || se.nodeName(e, "button") ? e.form : void 0;
                i && !se._data(i, "submitBubbles") && (se.event.add(i, "submit._submit", function(t) {
                    t._submit_bubble = !0
                }), se._data(i, "submitBubbles", !0))
            })
        },
        postDispatch: function(t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && se.event.simulate("submit", this.parentNode, t, !0))
        },
        teardown: function() {
            return se.nodeName(this, "form") ? !1 : void se.event.remove(this, "._submit")
        }
    }), ie.changeBubbles || (se.event.special.change = {
        setup: function() {
            return De.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (se.event.add(this, "propertychange._change", function(t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), se.event.add(this, "click._change", function(t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), se.event.simulate("change", this, t, !0)
            })), !1) : void se.event.add(this, "beforeactivate._change", function(t) {
                var e = t.target;
                De.test(e.nodeName) && !se._data(e, "changeBubbles") && (se.event.add(e, "change._change", function(t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || se.event.simulate("change", this.parentNode, t, !0)
                }), se._data(e, "changeBubbles", !0))
            })
        },
        handle: function(t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return se.event.remove(this, "._change"), !De.test(this.nodeName)
        }
    }), ie.focusinBubbles || se.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var i = function(t) {
            se.event.simulate(e, t.target, se.event.fix(t), !0)
        };
        se.event.special[e] = {
            setup: function() {
                var n = this.ownerDocument || this,
                    s = se._data(n, e);
                s || n.addEventListener(t, i, !0), se._data(n, e, (s || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this,
                    s = se._data(n, e) - 1;
                s ? se._data(n, e, s) : (n.removeEventListener(t, i, !0), se._removeData(n, e))
            }
        }
    }), se.fn.extend({
        on: function(t, e, i, n, s) {
            var o, r;
            if ("object" == typeof t) {
                "string" != typeof e && (i = i || e, e = void 0);
                for (o in t) this.on(o, e, i, t[o], s);
                return this
            }
            if (null == i && null == n ? (n = e, i = e = void 0) : null == n && ("string" == typeof e ? (n = i, i = void 0) : (n = i, i = e, e = void 0)), n === !1) n = p;
            else if (!n) return this;
            return 1 === s && (r = n, n = function(t) {
                return se().off(t), r.apply(this, arguments)
            }, n.guid = r.guid || (r.guid = se.guid++)), this.each(function() {
                se.event.add(this, t, n, i, e)
            })
        },
        one: function(t, e, i, n) {
            return this.on(t, e, i, n, 1)
        },
        off: function(t, e, i) {
            var n, s;
            if (t && t.preventDefault && t.handleObj) return n = t.handleObj, se(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" == typeof t) {
                for (s in t) this.off(s, e, t[s]);
                return this
            }
            return (e === !1 || "function" == typeof e) && (i = e, e = void 0), i === !1 && (i = p), this.each(function() {
                se.event.remove(this, t, i, e)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                se.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var i = this[0];
            return i ? se.event.trigger(t, e, i, !0) : void 0
        }
    });
    var Ne = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ze = / jQuery\d+="(?:null|\d+)"/g,
        je = new RegExp("<(?:" + Ne + ")[\\s/>]", "i"),
        Re = /^\s+/,
        We = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        $e = /<([\w:]+)/,
        He = /<tbody/i,
        Be = /<|&#?\w+;/,
        qe = /<(?:script|style|link)/i,
        Xe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ve = /^$|\/(?:java|ecma)script/i,
        Ue = /^true\/(.*)/,
        Ye = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Qe = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ie.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Ge = m(fe),
        Ze = Ge.appendChild(fe.createElement("div"));
    Qe.optgroup = Qe.option, Qe.tbody = Qe.tfoot = Qe.colgroup = Qe.caption = Qe.thead, Qe.th = Qe.td, se.extend({
        clone: function(t, e, i) {
            var n, s, o, r, a, l = se.contains(t.ownerDocument, t);
            if (ie.html5Clone || se.isXMLDoc(t) || !je.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (Ze.innerHTML = t.outerHTML, Ze.removeChild(o = Ze.firstChild)), !(ie.noCloneEvent && ie.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || se.isXMLDoc(t)))
                for (n = g(o), a = g(t), r = 0; null != (s = a[r]); ++r) n[r] && C(s, n[r]);
            if (e)
                if (i)
                    for (a = a || g(t), n = n || g(o), r = 0; null != (s = a[r]); r++) _(s, n[r]);
                else _(t, o);
            return n = g(o, "script"), n.length > 0 && x(n, !l && g(t, "script")), n = a = s = null, o
        },
        buildFragment: function(t, e, i, n) {
            for (var s, o, r, a, l, c, u, h = t.length, d = m(e), p = [], f = 0; h > f; f++)
                if (o = t[f], o || 0 === o)
                    if ("object" === se.type(o)) se.merge(p, o.nodeType ? [o] : o);
                    else if (Be.test(o)) {
                for (a = a || d.appendChild(e.createElement("div")), l = ($e.exec(o) || ["", ""])[1].toLowerCase(), u = Qe[l] || Qe._default, a.innerHTML = u[1] + o.replace(We, "<$1></$2>") + u[2], s = u[0]; s--;) a = a.lastChild;
                if (!ie.leadingWhitespace && Re.test(o) && p.push(e.createTextNode(Re.exec(o)[0])), !ie.tbody)
                    for (o = "table" !== l || He.test(o) ? "<table>" !== u[1] || He.test(o) ? 0 : a : a.firstChild, s = o && o.childNodes.length; s--;) se.nodeName(c = o.childNodes[s], "tbody") && !c.childNodes.length && o.removeChild(c);
                for (se.merge(p, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                a = d.lastChild
            } else p.push(e.createTextNode(o));
            for (a && d.removeChild(a), ie.appendChecked || se.grep(g(p, "input"), v), f = 0; o = p[f++];)
                if ((!n || -1 === se.inArray(o, n)) && (r = se.contains(o.ownerDocument, o), a = g(d.appendChild(o), "script"), r && x(a), i))
                    for (s = 0; o = a[s++];) Ve.test(o.type || "") && i.push(o);
            return a = null, d
        },
        cleanData: function(t, e) {
            for (var i, n, s, o, r = 0, a = se.expando, l = se.cache, c = ie.deleteExpando, u = se.event.special; null != (i = t[r]); r++)
                if ((e || se.acceptData(i)) && (s = i[a], o = s && l[s])) {
                    if (o.events)
                        for (n in o.events) u[n] ? se.event.remove(i, n) : se.removeEvent(i, n, o.handle);
                    l[s] && (delete l[s], c ? delete i[a] : typeof i.removeAttribute !== Ce ? i.removeAttribute(a) : i[a] = null, Y.push(s))
                }
        }
    }), se.fn.extend({
        text: function(t) {
            return Pe(this, function(t) {
                return void 0 === t ? se.text(this) : this.empty().append((this[0] && this[0].ownerDocument || fe).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.appendChild(t)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        remove: function(t, e) {
            for (var i, n = t ? se.filter(t, this) : this, s = 0; null != (i = n[s]); s++) e || 1 !== i.nodeType || se.cleanData(g(i)), i.parentNode && (e && se.contains(i.ownerDocument, i) && x(g(i, "script")), i.parentNode.removeChild(i));
            return this
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && se.cleanData(g(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                t.options && se.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },
        clone: function(t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                return se.clone(this, t, e)
            })
        },
        html: function(t) {
            return Pe(this, function(t) {
                var e = this[0] || {},
                    i = 0,
                    n = this.length;
                if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(ze, "") : void 0;
                if (!("string" != typeof t || qe.test(t) || !ie.htmlSerialize && je.test(t) || !ie.leadingWhitespace && Re.test(t) || Qe[($e.exec(t) || ["", ""])[1].toLowerCase()])) {
                    t = t.replace(We, "<$1></$2>");
                    try {
                        for (; n > i; i++) e = this[i] || {}, 1 === e.nodeType && (se.cleanData(g(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (s) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = arguments[0];
            return this.domManip(arguments, function(e) {
                t = this.parentNode, se.cleanData(g(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        },
        detach: function(t) {
            return this.remove(t, !0)
        },
        domManip: function(t, e) {
            t = G.apply([], t);
            var i, n, s, o, r, a, l = 0,
                c = this.length,
                u = this,
                h = c - 1,
                d = t[0],
                p = se.isFunction(d);
            if (p || c > 1 && "string" == typeof d && !ie.checkClone && Xe.test(d)) return this.each(function(i) {
                var n = u.eq(i);
                p && (t[0] = d.call(this, i, n.html())), n.domManip(t, e)
            });
            if (c && (a = se.buildFragment(t, this[0].ownerDocument, !1, this), i = a.firstChild, 1 === a.childNodes.length && (a = i), i)) {
                for (o = se.map(g(a, "script"), b), s = o.length; c > l; l++) n = a, l !== h && (n = se.clone(n, !0, !0), s && se.merge(o, g(n, "script"))), e.call(this[l], n, l);
                if (s)
                    for (r = o[o.length - 1].ownerDocument, se.map(o, w), l = 0; s > l; l++) n = o[l], Ve.test(n.type || "") && !se._data(n, "globalEval") && se.contains(r, n) && (n.src ? se._evalUrl && se._evalUrl(n.src) : se.globalEval((n.text || n.textContent || n.innerHTML || "").replace(Ye, "")));
                a = i = null
            }
            return this
        }
    }), se.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        se.fn[t] = function(t) {
            for (var i, n = 0, s = [], o = se(t), r = o.length - 1; r >= n; n++) i = n === r ? this : this.clone(!0), se(o[n])[e](i), Z.apply(s, i.get());
            return this.pushStack(s)
        }
    });
    var Ke, Je = {};
    ! function() {
        var t;
        ie.shrinkWrapBlocks = function() {
            if (null != t) return t;
            t = !1;
            var e, i, n;
            return i = fe.getElementsByTagName("body")[0], i && i.style ? (e = fe.createElement("div"), n = fe.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== Ce && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(fe.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), i.removeChild(n), t) : void 0
        }
    }();
    var ti, ei, ii = /^margin/,
        ni = new RegExp("^(" + ke + ")(?!px)[a-z%]+$", "i"),
        si = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (ti = function(t) {
        return t.ownerDocument.defaultView.getComputedStyle(t, null)
    }, ei = function(t, e, i) {
        var n, s, o, r, a = t.style;
        return i = i || ti(t), r = i ? i.getPropertyValue(e) || i[e] : void 0, i && ("" !== r || se.contains(t.ownerDocument, t) || (r = se.style(t, e)), ni.test(r) && ii.test(e) && (n = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = i.width, a.width = n, a.minWidth = s, a.maxWidth = o)), void 0 === r ? r : r + ""
    }) : fe.documentElement.currentStyle && (ti = function(t) {
        return t.currentStyle
    }, ei = function(t, e, i) {
        var n, s, o, r, a = t.style;
        return i = i || ti(t), r = i ? i[e] : void 0, null == r && a && a[e] && (r = a[e]), ni.test(r) && !si.test(e) && (n = a.left, s = t.runtimeStyle, o = s && s.left, o && (s.left = t.currentStyle.left), a.left = "fontSize" === e ? "1em" : r, r = a.pixelLeft + "px", a.left = n, o && (s.left = o)), void 0 === r ? r : r + "" || "auto"
    }), ! function() {
        function e() {
            var e, i, n, s;
            i = fe.getElementsByTagName("body")[0], i && i.style && (e = fe.createElement("div"), n = fe.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = r = !1, l = !0, t.getComputedStyle && (o = "1%" !== (t.getComputedStyle(e, null) || {}).top, r = "4px" === (t.getComputedStyle(e, null) || {
                width: "4px"
            }).width, s = e.appendChild(fe.createElement("div")), s.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", s.style.marginRight = s.style.width = "0", e.style.width = "1px", l = !parseFloat((t.getComputedStyle(s, null) || {}).marginRight)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = e.getElementsByTagName("td"), s[0].style.cssText = "margin:0;border:0;padding:0;display:none", a = 0 === s[0].offsetHeight, a && (s[0].style.display = "", s[1].style.display = "none", a = 0 === s[0].offsetHeight), i.removeChild(n))
        }
        var i, n, s, o, r, a, l;
        i = fe.createElement("div"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", s = i.getElementsByTagName("a")[0], (n = s && s.style) && (n.cssText = "float:left;opacity:.5", ie.opacity = "0.5" === n.opacity, ie.cssFloat = !!n.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === i.style.backgroundClip, ie.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, se.extend(ie, {
            reliableHiddenOffsets: function() {
                return null == a && e(), a
            },
            boxSizingReliable: function() {
                return null == r && e(), r
            },
            pixelPosition: function() {
                return null == o && e(), o
            },
            reliableMarginRight: function() {
                return null == l && e(), l
            }
        }))
    }(), se.swap = function(t, e, i, n) {
        var s, o, r = {};
        for (o in e) r[o] = t.style[o], t.style[o] = e[o];
        s = i.apply(t, n || []);
        for (o in e) t.style[o] = r[o];
        return s
    };
    var oi = /alpha\([^)]*\)/i,
        ri = /opacity\s*=\s*([^)]*)/,
        ai = /^(none|table(?!-c[ea]).+)/,
        li = new RegExp("^(" + ke + ")(.*)$", "i"),
        ci = new RegExp("^([+-])=(" + ke + ")", "i"),
        ui = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        hi = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        di = ["Webkit", "O", "Moz", "ms"];
    se.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var i = ei(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ie.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var s, o, r, a = se.camelCase(e),
                    l = t.style;
                if (e = se.cssProps[a] || (se.cssProps[a] = E(l, a)), r = se.cssHooks[e] || se.cssHooks[a], void 0 === i) return r && "get" in r && void 0 !== (s = r.get(t, !1, n)) ? s : l[e];
                if (o = typeof i, "string" === o && (s = ci.exec(i)) && (i = (s[1] + 1) * s[2] + parseFloat(se.css(t, e)), o = "number"), null != i && i === i && ("number" !== o || se.cssNumber[a] || (i += "px"), ie.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(r && "set" in r && void 0 === (i = r.set(t, i, n))))) try {
                    l[e] = i
                } catch (c) {}
            }
        },
        css: function(t, e, i, n) {
            var s, o, r, a = se.camelCase(e);
            return e = se.cssProps[a] || (se.cssProps[a] = E(t.style, a)), r = se.cssHooks[e] || se.cssHooks[a], r && "get" in r && (o = r.get(t, !0, i)), void 0 === o && (o = ei(t, e, n)), "normal" === o && e in hi && (o = hi[e]), "" === i || i ? (s = parseFloat(o), i === !0 || se.isNumeric(s) ? s || 0 : o) : o
        }
    }), se.each(["height", "width"], function(t, e) {
        se.cssHooks[e] = {
            get: function(t, i, n) {
                return i ? ai.test(se.css(t, "display")) && 0 === t.offsetWidth ? se.swap(t, ui, function() {
                    return D(t, e, n)
                }) : D(t, e, n) : void 0
            },
            set: function(t, i, n) {
                var s = n && ti(t);
                return P(t, i, n ? I(t, e, n, ie.boxSizing && "border-box" === se.css(t, "boxSizing", !1, s), s) : 0)
            }
        }
    }), ie.opacity || (se.cssHooks.opacity = {
        get: function(t, e) {
            return ri.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var i = t.style,
                n = t.currentStyle,
                s = se.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                o = n && n.filter || i.filter || "";
            i.zoom = 1, (e >= 1 || "" === e) && "" === se.trim(o.replace(oi, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = oi.test(o) ? o.replace(oi, s) : o + " " + s)
        }
    }), se.cssHooks.marginRight = k(ie.reliableMarginRight, function(t, e) {
        return e ? se.swap(t, {
            display: "inline-block"
        }, ei, [t, "marginRight"]) : void 0
    }), se.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        se.cssHooks[t + e] = {
            expand: function(i) {
                for (var n = 0, s = {}, o = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) s[t + Ee[n] + e] = o[n] || o[n - 2] || o[0];
                return s
            }
        }, ii.test(t) || (se.cssHooks[t + e].set = P)
    }), se.fn.extend({
        css: function(t, e) {
            return Pe(this, function(t, e, i) {
                var n, s, o = {},
                    r = 0;
                if (se.isArray(e)) {
                    for (n = ti(t), s = e.length; s > r; r++) o[e[r]] = se.css(t, e[r], !1, n);
                    return o
                }
                return void 0 !== i ? se.style(t, e, i) : se.css(t, e)
            }, t, e, arguments.length > 1)
        },
        show: function() {
            return L(this, !0)
        },
        hide: function() {
            return L(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                Le(this) ? se(this).show() : se(this).hide()
            })
        }
    }), se.Tween = A, A.prototype = {
        constructor: A,
        init: function(t, e, i, n, s, o) {
            this.elem = t, this.prop = i, this.easing = s || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = o || (se.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var t = A.propHooks[this.prop];
            return t && t.get ? t.get(this) : A.propHooks._default.get(this)
        },
        run: function(t) {
            var e, i = A.propHooks[this.prop];
            return this.pos = e = this.options.duration ? se.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : A.propHooks._default.set(this), this
        }
    }, A.prototype.init.prototype = A.prototype, A.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = se.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },
            set: function(t) {
                se.fx.step[t.prop] ? se.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[se.cssProps[t.prop]] || se.cssHooks[t.prop]) ? se.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, A.propHooks.scrollTop = A.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, se.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, se.fx = A.prototype.init, se.fx.step = {};
    var pi, fi, mi = /^(?:toggle|show|hide)$/,
        gi = new RegExp("^(?:([+-])=|)(" + ke + ")([a-z%]*)$", "i"),
        vi = /queueHooks$/,
        yi = [N],
        bi = {
            "*": [
                function(t, e) {
                    var i = this.createTween(t, e),
                        n = i.cur(),
                        s = gi.exec(e),
                        o = s && s[3] || (se.cssNumber[t] ? "" : "px"),
                        r = (se.cssNumber[t] || "px" !== o && +n) && gi.exec(se.css(i.elem, t)),
                        a = 1,
                        l = 20;
                    if (r && r[3] !== o) {
                        o = o || r[3], s = s || [], r = +n || 1;
                        do a = a || ".5", r /= a, se.style(i.elem, t, r + o); while (a !== (a = i.cur() / n) && 1 !== a && --l)
                    }
                    return s && (r = i.start = +r || +n || 0, i.unit = o, i.end = s[1] ? r + (s[1] + 1) * s[2] : +s[2]), i
                }
            ]
        };
    se.Animation = se.extend(j, {
        tweener: function(t, e) {
            se.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
            for (var i, n = 0, s = t.length; s > n; n++) i = t[n], bi[i] = bi[i] || [], bi[i].unshift(e)
        },
        prefilter: function(t, e) {
            e ? yi.unshift(t) : yi.push(t)
        }
    }), se.speed = function(t, e, i) {
        var n = t && "object" == typeof t ? se.extend({}, t) : {
            complete: i || !i && e || se.isFunction(t) && t,
            duration: t,
            easing: i && e || e && !se.isFunction(e) && e
        };
        return n.duration = se.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in se.fx.speeds ? se.fx.speeds[n.duration] : se.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
            se.isFunction(n.old) && n.old.call(this), n.queue && se.dequeue(this, n.queue)
        }, n
    }, se.fn.extend({
        fadeTo: function(t, e, i, n) {
            return this.filter(Le).css("opacity", 0).show().end().animate({
                opacity: e
            }, t, i, n)
        },
        animate: function(t, e, i, n) {
            var s = se.isEmptyObject(t),
                o = se.speed(e, i, n),
                r = function() {
                    var e = j(this, se.extend({}, t), o);
                    (s || se._data(this, "finish")) && e.stop(!0)
                };
            return r.finish = r, s || o.queue === !1 ? this.each(r) : this.queue(o.queue, r)
        },
        stop: function(t, e, i) {
            var n = function(t) {
                var e = t.stop;
                delete t.stop, e(i)
            };
            return "string" != typeof t && (i = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                var e = !0,
                    s = null != t && t + "queueHooks",
                    o = se.timers,
                    r = se._data(this);
                if (s) r[s] && r[s].stop && n(r[s]);
                else
                    for (s in r) r[s] && r[s].stop && vi.test(s) && n(r[s]);
                for (s = o.length; s--;) o[s].elem !== this || null != t && o[s].queue !== t || (o[s].anim.stop(i), e = !1, o.splice(s, 1));
                (e || !i) && se.dequeue(this, t)
            })
        },
        finish: function(t) {
            return t !== !1 && (t = t || "fx"), this.each(function() {
                var e, i = se._data(this),
                    n = i[t + "queue"],
                    s = i[t + "queueHooks"],
                    o = se.timers,
                    r = n ? n.length : 0;
                for (i.finish = !0, se.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                for (e = 0; r > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete i.finish
            })
        }
    }), se.each(["toggle", "show", "hide"], function(t, e) {
        var i = se.fn[e];
        se.fn[e] = function(t, n, s) {
            return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(O(e, !0), t, n, s)
        }
    }), se.each({
        slideDown: O("show"),
        slideUp: O("hide"),
        slideToggle: O("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(t, e) {
        se.fn[t] = function(t, i, n) {
            return this.animate(e, t, i, n)
        }
    }), se.timers = [], se.fx.tick = function() {
        var t, e = se.timers,
            i = 0;
        for (pi = se.now(); i < e.length; i++) t = e[i], t() || e[i] !== t || e.splice(i--, 1);
        e.length || se.fx.stop(), pi = void 0
    }, se.fx.timer = function(t) {
        se.timers.push(t), t() ? se.fx.start() : se.timers.pop()
    }, se.fx.interval = 13, se.fx.start = function() {
        fi || (fi = setInterval(se.fx.tick, se.fx.interval))
    }, se.fx.stop = function() {
        clearInterval(fi), fi = null
    }, se.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, se.fn.delay = function(t, e) {
        return t = se.fx ? se.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
            var n = setTimeout(e, t);
            i.stop = function() {
                clearTimeout(n)
            }
        })
    },
    function() {
        var t, e, i, n, s;
        e = fe.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = e.getElementsByTagName("a")[0], i = fe.createElement("select"), s = i.appendChild(fe.createElement("option")), t = e.getElementsByTagName("input")[0], n.style.cssText = "top:1px", ie.getSetAttribute = "t" !== e.className, ie.style = /top/.test(n.getAttribute("style")), ie.hrefNormalized = "/a" === n.getAttribute("href"), ie.checkOn = !!t.value, ie.optSelected = s.selected, ie.enctype = !!fe.createElement("form").enctype, i.disabled = !0, ie.optDisabled = !s.disabled, t = fe.createElement("input"), t.setAttribute("value", ""), ie.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), ie.radioValue = "t" === t.value
    }();
    var wi = /\r/g;
    se.fn.extend({
        val: function(t) {
            var e, i, n, s = this[0];
            return arguments.length ? (n = se.isFunction(t), this.each(function(i) {
                var s;
                1 === this.nodeType && (s = n ? t.call(this, i, se(this).val()) : t, null == s ? s = "" : "number" == typeof s ? s += "" : se.isArray(s) && (s = se.map(s, function(t) {
                    return null == t ? "" : t + ""
                })), e = se.valHooks[this.type] || se.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, s, "value") || (this.value = s))
            })) : s ? (e = se.valHooks[s.type] || se.valHooks[s.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(s, "value")) ? i : (i = s.value, "string" == typeof i ? i.replace(wi, "") : null == i ? "" : i)) : void 0
        }
    }), se.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = se.find.attr(t, "value");
                    return null != e ? e : se.trim(se.text(t))
                }
            },
            select: {
                get: function(t) {
                    for (var e, i, n = t.options, s = t.selectedIndex, o = "select-one" === t.type || 0 > s, r = o ? null : [], a = o ? s + 1 : n.length, l = 0 > s ? a : o ? s : 0; a > l; l++)
                        if (i = n[l], !(!i.selected && l !== s || (ie.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && se.nodeName(i.parentNode, "optgroup"))) {
                            if (e = se(i).val(), o) return e;
                            r.push(e)
                        }
                    return r
                },
                set: function(t, e) {
                    for (var i, n, s = t.options, o = se.makeArray(e), r = s.length; r--;)
                        if (n = s[r], se.inArray(se.valHooks.option.get(n), o) >= 0) try {
                            n.selected = i = !0
                        } catch (a) {
                            n.scrollHeight
                        } else n.selected = !1;
                    return i || (t.selectedIndex = -1), s
                }
            }
        }
    }), se.each(["radio", "checkbox"], function() {
        se.valHooks[this] = {
            set: function(t, e) {
                return se.isArray(e) ? t.checked = se.inArray(se(t).val(), e) >= 0 : void 0
            }
        }, ie.checkOn || (se.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var xi, _i, Ci = se.expr.attrHandle,
        Si = /^(?:checked|selected)$/i,
        Ti = ie.getSetAttribute,
        ki = ie.input;
    se.fn.extend({
        attr: function(t, e) {
            return Pe(this, se.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                se.removeAttr(this, t)
            })
        }
    }), se.extend({
        attr: function(t, e, i) {
            var n, s, o = t.nodeType;
            return t && 3 !== o && 8 !== o && 2 !== o ? typeof t.getAttribute === Ce ? se.prop(t, e, i) : (1 === o && se.isXMLDoc(t) || (e = e.toLowerCase(), n = se.attrHooks[e] || (se.expr.match.bool.test(e) ? _i : xi)), void 0 === i ? n && "get" in n && null !== (s = n.get(t, e)) ? s : (s = se.find.attr(t, e), null == s ? void 0 : s) : null !== i ? n && "set" in n && void 0 !== (s = n.set(t, i, e)) ? s : (t.setAttribute(e, i + ""), i) : void se.removeAttr(t, e)) : void 0
        },
        removeAttr: function(t, e) {
            var i, n, s = 0,
                o = e && e.match(be);
            if (o && 1 === t.nodeType)
                for (; i = o[s++];) n = se.propFix[i] || i, se.expr.match.bool.test(i) ? ki && Ti || !Si.test(i) ? t[n] = !1 : t[se.camelCase("default-" + i)] = t[n] = !1 : se.attr(t, i, ""), t.removeAttribute(Ti ? i : n)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!ie.radioValue && "radio" === e && se.nodeName(t, "input")) {
                        var i = t.value;
                        return t.setAttribute("type", e), i && (t.value = i), e
                    }
                }
            }
        }
    }), _i = {
        set: function(t, e, i) {
            return e === !1 ? se.removeAttr(t, i) : ki && Ti || !Si.test(i) ? t.setAttribute(!Ti && se.propFix[i] || i, i) : t[se.camelCase("default-" + i)] = t[i] = !0, i
        }
    }, se.each(se.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var i = Ci[e] || se.find.attr;
        Ci[e] = ki && Ti || !Si.test(e) ? function(t, e, n) {
            var s, o;
            return n || (o = Ci[e], Ci[e] = s, s = null != i(t, e, n) ? e.toLowerCase() : null, Ci[e] = o), s
        } : function(t, e, i) {
            return i ? void 0 : t[se.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), ki && Ti || (se.attrHooks.value = {
        set: function(t, e, i) {
            return se.nodeName(t, "input") ? void(t.defaultValue = e) : xi && xi.set(t, e, i)
        }
    }), Ti || (xi = {
        set: function(t, e, i) {
            var n = t.getAttributeNode(i);
            return n || t.setAttributeNode(n = t.ownerDocument.createAttribute(i)), n.value = e += "", "value" === i || e === t.getAttribute(i) ? e : void 0
        }
    }, Ci.id = Ci.name = Ci.coords = function(t, e, i) {
        var n;
        return i ? void 0 : (n = t.getAttributeNode(e)) && "" !== n.value ? n.value : null
    }, se.valHooks.button = {
        get: function(t, e) {
            var i = t.getAttributeNode(e);
            return i && i.specified ? i.value : void 0
        },
        set: xi.set
    }, se.attrHooks.contenteditable = {
        set: function(t, e, i) {
            xi.set(t, "" === e ? !1 : e, i)
        }
    }, se.each(["width", "height"], function(t, e) {
        se.attrHooks[e] = {
            set: function(t, i) {
                return "" === i ? (t.setAttribute(e, "auto"), i) : void 0
            }
        }
    })), ie.style || (se.attrHooks.style = {
        get: function(t) {
            return t.style.cssText || void 0
        },
        set: function(t, e) {
            return t.style.cssText = e + ""
        }
    });
    var Ei = /^(?:input|select|textarea|button|object)$/i,
        Li = /^(?:a|area)$/i;
    se.fn.extend({
        prop: function(t, e) {
            return Pe(this, se.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return t = se.propFix[t] || t, this.each(function() {
                try {
                    this[t] = void 0, delete this[t]
                } catch (e) {}
            })
        }
    }), se.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(t, e, i) {
            var n, s, o, r = t.nodeType;
            return t && 3 !== r && 8 !== r && 2 !== r ? (o = 1 !== r || !se.isXMLDoc(t), o && (e = se.propFix[e] || e, s = se.propHooks[e]), void 0 !== i ? s && "set" in s && void 0 !== (n = s.set(t, i, e)) ? n : t[e] = i : s && "get" in s && null !== (n = s.get(t, e)) ? n : t[e]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = se.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : Ei.test(t.nodeName) || Li.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }
    }), ie.hrefNormalized || se.each(["href", "src"], function(t, e) {
        se.propHooks[e] = {
            get: function(t) {
                return t.getAttribute(e, 4)
            }
        }
    }), ie.optSelected || (se.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    }), se.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        se.propFix[this.toLowerCase()] = this
    }), ie.enctype || (se.propFix.enctype = "encoding");
    var Pi = /[\t\r\n\f]/g;
    se.fn.extend({
        addClass: function(t) {
            var e, i, n, s, o, r, a = 0,
                l = this.length,
                c = "string" == typeof t && t;
            if (se.isFunction(t)) return this.each(function(e) {
                se(this).addClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(be) || []; l > a; a++)
                    if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Pi, " ") : " ")) {
                        for (o = 0; s = e[o++];) n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                        r = se.trim(n), i.className !== r && (i.className = r)
                    }
            return this
        },
        removeClass: function(t) {
            var e, i, n, s, o, r, a = 0,
                l = this.length,
                c = 0 === arguments.length || "string" == typeof t && t;
            if (se.isFunction(t)) return this.each(function(e) {
                se(this).removeClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(be) || []; l > a; a++)
                    if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Pi, " ") : "")) {
                        for (o = 0; s = e[o++];)
                            for (; n.indexOf(" " + s + " ") >= 0;) n = n.replace(" " + s + " ", " ");
                        r = t ? se.trim(n) : "", i.className !== r && (i.className = r)
                    }
            return this
        },
        toggleClass: function(t, e) {
            var i = typeof t;
            return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : this.each(se.isFunction(t) ? function(i) {
                se(this).toggleClass(t.call(this, i, this.className, e), e)
            } : function() {
                if ("string" === i)
                    for (var e, n = 0, s = se(this), o = t.match(be) || []; e = o[n++];) s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
                else(i === Ce || "boolean" === i) && (this.className && se._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : se._data(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Pi, " ").indexOf(e) >= 0) return !0;
            return !1
        }
    }), se.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        se.fn[e] = function(t, i) {
            return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
        }
    }), se.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },
        bind: function(t, e, i) {
            return this.on(t, null, e, i)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, i, n) {
            return this.on(e, t, i, n)
        },
        undelegate: function(t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
        }
    });
    var Ii = se.now(),
        Di = /\?/,
        Ai = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    se.parseJSON = function(e) {
        if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
        var i, n = null,
            s = se.trim(e + "");
        return s && !se.trim(s.replace(Ai, function(t, e, s, o) {
            return i && e && (n = 0), 0 === n ? t : (i = s || e, n += !o - !s, "")
        })) ? Function("return " + s)() : se.error("Invalid JSON: " + e)
    }, se.parseXML = function(e) {
        var i, n;
        if (!e || "string" != typeof e) return null;
        try {
            t.DOMParser ? (n = new DOMParser, i = n.parseFromString(e, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e))
        } catch (s) {
            i = void 0
        }
        return i && i.documentElement && !i.getElementsByTagName("parsererror").length || se.error("Invalid XML: " + e), i
    };
    var Mi, Oi, Fi = /#.*$/,
        Ni = /([?&])_=[^&]*/,
        zi = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        ji = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Ri = /^(?:GET|HEAD)$/,
        Wi = /^\/\//,
        $i = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Hi = {},
        Bi = {},
        qi = "*/".concat("*");
    try {
        Oi = location.href
    } catch (Xi) {
        Oi = fe.createElement("a"), Oi.href = "", Oi = Oi.href
    }
    Mi = $i.exec(Oi.toLowerCase()) || [], se.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Oi,
            type: "GET",
            isLocal: ji.test(Mi[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": qi,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": se.parseJSON,
                "text xml": se.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? $($(t, se.ajaxSettings), e) : $(se.ajaxSettings, t)
        },
        ajaxPrefilter: R(Hi),
        ajaxTransport: R(Bi),
        ajax: function(t, e) {
            function i(t, e, i, n) {
                var s, u, v, y, w, _ = e;
                2 !== b && (b = 2, a && clearTimeout(a), c = void 0, r = n || "", x.readyState = t > 0 ? 4 : 0, s = t >= 200 && 300 > t || 304 === t, i && (y = H(h, x, i)), y = B(h, y, x, s), s ? (h.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (se.lastModified[o] = w), w = x.getResponseHeader("etag"), w && (se.etag[o] = w)), 204 === t || "HEAD" === h.type ? _ = "nocontent" : 304 === t ? _ = "notmodified" : (_ = y.state, u = y.data, v = y.error, s = !v)) : (v = _, (t || !_) && (_ = "error", 0 > t && (t = 0))), x.status = t, x.statusText = (e || _) + "", s ? f.resolveWith(d, [u, _, x]) : f.rejectWith(d, [x, _, v]), x.statusCode(g), g = void 0, l && p.trigger(s ? "ajaxSuccess" : "ajaxError", [x, h, s ? u : v]), m.fireWith(d, [x, _]), l && (p.trigger("ajaxComplete", [x, h]), --se.active || se.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var n, s, o, r, a, l, c, u, h = se.ajaxSetup({}, e),
                d = h.context || h,
                p = h.context && (d.nodeType || d.jquery) ? se(d) : se.event,
                f = se.Deferred(),
                m = se.Callbacks("once memory"),
                g = h.statusCode || {},
                v = {},
                y = {},
                b = 0,
                w = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (2 === b) {
                            if (!u)
                                for (u = {}; e = zi.exec(r);) u[e[1].toLowerCase()] = e[2];
                            e = u[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === b ? r : null
                    },
                    setRequestHeader: function(t, e) {
                        var i = t.toLowerCase();
                        return b || (t = y[i] = y[i] || t, v[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return b || (h.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (2 > b)
                                for (e in t) g[e] = [g[e], t[e]];
                            else x.always(t[x.status]);
                        return this
                    },
                    abort: function(t) {
                        var e = t || w;
                        return c && c.abort(e), i(0, e), this
                    }
                };
            if (f.promise(x).complete = m.add, x.success = x.done, x.error = x.fail, h.url = ((t || h.url || Oi) + "").replace(Fi, "").replace(Wi, Mi[1] + "//"), h.type = e.method || e.type || h.method || h.type, h.dataTypes = se.trim(h.dataType || "*").toLowerCase().match(be) || [""], null == h.crossDomain && (n = $i.exec(h.url.toLowerCase()), h.crossDomain = !(!n || n[1] === Mi[1] && n[2] === Mi[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Mi[3] || ("http:" === Mi[1] ? "80" : "443")))), h.data && h.processData && "string" != typeof h.data && (h.data = se.param(h.data, h.traditional)), W(Hi, h, e, x), 2 === b) return x;
            l = h.global, l && 0 === se.active++ && se.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Ri.test(h.type), o = h.url, h.hasContent || (h.data && (o = h.url += (Di.test(o) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (h.url = Ni.test(o) ? o.replace(Ni, "$1_=" + Ii++) : o + (Di.test(o) ? "&" : "?") + "_=" + Ii++)), h.ifModified && (se.lastModified[o] && x.setRequestHeader("If-Modified-Since", se.lastModified[o]), se.etag[o] && x.setRequestHeader("If-None-Match", se.etag[o])), (h.data && h.hasContent && h.contentType !== !1 || e.contentType) && x.setRequestHeader("Content-Type", h.contentType), x.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + qi + "; q=0.01" : "") : h.accepts["*"]);
            for (s in h.headers) x.setRequestHeader(s, h.headers[s]);
            if (h.beforeSend && (h.beforeSend.call(d, x, h) === !1 || 2 === b)) return x.abort();
            w = "abort";
            for (s in {
                success: 1,
                error: 1,
                complete: 1
            }) x[s](h[s]);
            if (c = W(Bi, h, e, x)) {
                x.readyState = 1, l && p.trigger("ajaxSend", [x, h]), h.async && h.timeout > 0 && (a = setTimeout(function() {
                    x.abort("timeout")
                }, h.timeout));
                try {
                    b = 1, c.send(v, i)
                } catch (_) {
                    if (!(2 > b)) throw _;
                    i(-1, _)
                }
            } else i(-1, "No Transport");
            return x
        },
        getJSON: function(t, e, i) {
            return se.get(t, e, i, "json")
        },
        getScript: function(t, e) {
            return se.get(t, void 0, e, "script")
        }
    }), se.each(["get", "post"], function(t, e) {
        se[e] = function(t, i, n, s) {
            return se.isFunction(i) && (s = s || n, n = i, i = void 0), se.ajax({
                url: t,
                type: e,
                dataType: s,
                data: i,
                success: n
            })
        }
    }), se.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        se.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), se._evalUrl = function(t) {
        return se.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, se.fn.extend({
        wrapAll: function(t) {
            if (se.isFunction(t)) return this.each(function(e) {
                se(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = se(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            return this.each(se.isFunction(t) ? function(e) {
                se(this).wrapInner(t.call(this, e))
            } : function() {
                var e = se(this),
                    i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = se.isFunction(t);
            return this.each(function(i) {
                se(this).wrapAll(e ? t.call(this, i) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                se.nodeName(this, "body") || se(this).replaceWith(this.childNodes)
            }).end()
        }
    }), se.expr.filters.hidden = function(t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !ie.reliableHiddenOffsets() && "none" === (t.style && t.style.display || se.css(t, "display"))
    }, se.expr.filters.visible = function(t) {
        return !se.expr.filters.hidden(t)
    };
    var Vi = /%20/g,
        Ui = /\[\]$/,
        Yi = /\r?\n/g,
        Qi = /^(?:submit|button|image|reset|file)$/i,
        Gi = /^(?:input|select|textarea|keygen)/i;
    se.param = function(t, e) {
        var i, n = [],
            s = function(t, e) {
                e = se.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (void 0 === e && (e = se.ajaxSettings && se.ajaxSettings.traditional), se.isArray(t) || t.jquery && !se.isPlainObject(t)) se.each(t, function() {
            s(this.name, this.value)
        });
        else
            for (i in t) q(i, t[i], e, s);
        return n.join("&").replace(Vi, "+")
    }, se.fn.extend({
        serialize: function() {
            return se.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = se.prop(this, "elements");
                return t ? se.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !se(this).is(":disabled") && Gi.test(this.nodeName) && !Qi.test(t) && (this.checked || !Ie.test(t))
            }).map(function(t, e) {
                var i = se(this).val();
                return null == i ? null : se.isArray(i) ? se.map(i, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Yi, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: i.replace(Yi, "\r\n")
                }
            }).get()
        }
    }), se.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || V()
    } : X;
    var Zi = 0,
        Ki = {},
        Ji = se.ajaxSettings.xhr();
    t.ActiveXObject && se(t).on("unload", function() {
        for (var t in Ki) Ki[t](void 0, !0)
    }), ie.cors = !!Ji && "withCredentials" in Ji, Ji = ie.ajax = !!Ji, Ji && se.ajaxTransport(function(t) {
        if (!t.crossDomain || ie.cors) {
            var e;
            return {
                send: function(i, n) {
                    var s, o = t.xhr(),
                        r = ++Zi;
                    if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (s in t.xhrFields) o[s] = t.xhrFields[s];
                    t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (s in i) void 0 !== i[s] && o.setRequestHeader(s, i[s] + "");
                    o.send(t.hasContent && t.data || null), e = function(i, s) {
                        var a, l, c;
                        if (e && (s || 4 === o.readyState))
                            if (delete Ki[r], e = void 0, o.onreadystatechange = se.noop, s) 4 !== o.readyState && o.abort();
                            else {
                                c = {}, a = o.status, "string" == typeof o.responseText && (c.text = o.responseText);
                                try {
                                    l = o.statusText
                                } catch (u) {
                                    l = ""
                                }
                                a || !t.isLocal || t.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
                            }
                        c && n(a, l, c, o.getAllResponseHeaders())
                    }, t.async ? 4 === o.readyState ? setTimeout(e) : o.onreadystatechange = Ki[r] = e : e()
                },
                abort: function() {
                    e && e(void 0, !0)
                }
            }
        }
    }), se.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(t) {
                return se.globalEval(t), t
            }
        }
    }), se.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), se.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, i = fe.head || se("head")[0] || fe.documentElement;
            return {
                send: function(n, s) {
                    e = fe.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, i) {
                        (i || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, i || s(200, "success"))
                    }, i.insertBefore(e, i.firstChild)
                },
                abort: function() {
                    e && e.onload(void 0, !0)
                }
            }
        }
    });
    var tn = [],
        en = /(=)\?(?=&|$)|\?\?/;
    se.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = tn.pop() || se.expando + "_" + Ii++;
            return this[t] = !0, t
        }
    }), se.ajaxPrefilter("json jsonp", function(e, i, n) {
        var s, o, r, a = e.jsonp !== !1 && (en.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && en.test(e.data) && "data");
        return a || "jsonp" === e.dataTypes[0] ? (s = e.jsonpCallback = se.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(en, "$1" + s) : e.jsonp !== !1 && (e.url += (Di.test(e.url) ? "&" : "?") + e.jsonp + "=" + s), e.converters["script json"] = function() {
            return r || se.error(s + " was not called"), r[0]
        }, e.dataTypes[0] = "json", o = t[s], t[s] = function() {
            r = arguments
        }, n.always(function() {
            t[s] = o, e[s] && (e.jsonpCallback = i.jsonpCallback, tn.push(s)), r && se.isFunction(o) && o(r[0]), r = o = void 0
        }), "script") : void 0
    }), se.parseHTML = function(t, e, i) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (i = e, e = !1), e = e || fe;
        var n = he.exec(t),
            s = !i && [];
        return n ? [e.createElement(n[1])] : (n = se.buildFragment([t], e, s), s && s.length && se(s).remove(), se.merge([], n.childNodes))
    };
    var nn = se.fn.load;
    se.fn.load = function(t, e, i) {
        if ("string" != typeof t && nn) return nn.apply(this, arguments);
        var n, s, o, r = this,
            a = t.indexOf(" ");
        return a >= 0 && (n = se.trim(t.slice(a, t.length)), t = t.slice(0, a)), se.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (o = "POST"), r.length > 0 && se.ajax({
            url: t,
            type: o,
            dataType: "html",
            data: e
        }).done(function(t) {
            s = arguments, r.html(n ? se("<div>").append(se.parseHTML(t)).find(n) : t)
        }).complete(i && function(t, e) {
            r.each(i, s || [t.responseText, e, t])
        }), this
    }, se.expr.filters.animated = function(t) {
        return se.grep(se.timers, function(e) {
            return t === e.elem
        }).length
    };
    var sn = t.document.documentElement;
    se.offset = {
        setOffset: function(t, e, i) {
            var n, s, o, r, a, l, c, u = se.css(t, "position"),
                h = se(t),
                d = {};
            "static" === u && (t.style.position = "relative"), a = h.offset(), o = se.css(t, "top"), l = se.css(t, "left"), c = ("absolute" === u || "fixed" === u) && se.inArray("auto", [o, l]) > -1, c ? (n = h.position(), r = n.top, s = n.left) : (r = parseFloat(o) || 0, s = parseFloat(l) || 0), se.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (d.top = e.top - a.top + r), null != e.left && (d.left = e.left - a.left + s), "using" in e ? e.using.call(t, d) : h.css(d)
        }
    }, se.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                se.offset.setOffset(this, t, e)
            });
            var e, i, n = {
                    top: 0,
                    left: 0
                },
                s = this[0],
                o = s && s.ownerDocument;
            return o ? (e = o.documentElement, se.contains(e, s) ? (typeof s.getBoundingClientRect !== Ce && (n = s.getBoundingClientRect()), i = U(o), {
                top: n.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: n.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : n) : void 0
        },
        position: function() {
            if (this[0]) {
                var t, e, i = {
                        top: 0,
                        left: 0
                    },
                    n = this[0];
                return "fixed" === se.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), se.nodeName(t[0], "html") || (i = t.offset()), i.top += se.css(t[0], "borderTopWidth", !0), i.left += se.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - i.top - se.css(n, "marginTop", !0),
                    left: e.left - i.left - se.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || sn; t && !se.nodeName(t, "html") && "static" === se.css(t, "position");) t = t.offsetParent;
                return t || sn
            })
        }
    }), se.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var i = /Y/.test(e);
        se.fn[t] = function(n) {
            return Pe(this, function(t, n, s) {
                var o = U(t);
                return void 0 === s ? o ? e in o ? o[e] : o.document.documentElement[n] : t[n] : void(o ? o.scrollTo(i ? se(o).scrollLeft() : s, i ? s : se(o).scrollTop()) : t[n] = s)
            }, t, n, arguments.length, null)
        }
    }), se.each(["top", "left"], function(t, e) {
        se.cssHooks[e] = k(ie.pixelPosition, function(t, i) {
            return i ? (i = ei(t, e), ni.test(i) ? se(t).position()[e] + "px" : i) : void 0
        })
    }), se.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        se.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(i, n) {
            se.fn[n] = function(n, s) {
                var o = arguments.length && (i || "boolean" != typeof n),
                    r = i || (n === !0 || s === !0 ? "margin" : "border");
                return Pe(this, function(e, i, n) {
                    var s;
                    return se.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement, Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === n ? se.css(e, i, r) : se.style(e, i, n, r)
                }, e, o ? n : void 0, o, null)
            }
        })
    }), se.fn.size = function() {
        return this.length
    }, se.fn.andSelf = se.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return se
    });
    var on = t.jQuery,
        rn = t.$;
    return se.noConflict = function(e) {
        return t.$ === se && (t.$ = rn), e && t.jQuery === se && (t.jQuery = on), se
    }, typeof e === Ce && (t.jQuery = t.$ = se), se
}), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(t, e, i, n, s) {
        return jQuery.easing[jQuery.easing.def](t, e, i, n, s)
    },
    easeInQuad: function(t, e, i, n, s) {
        return n * (e /= s) * e + i
    },
    easeOutQuad: function(t, e, i, n, s) {
        return -n * (e /= s) * (e - 2) + i
    },
    easeInOutQuad: function(t, e, i, n, s) {
        return (e /= s / 2) < 1 ? n / 2 * e * e + i : -n / 2 * (--e * (e - 2) - 1) + i
    },
    easeInCubic: function(t, e, i, n, s) {
        return n * (e /= s) * e * e + i
    },
    easeOutCubic: function(t, e, i, n, s) {
        return n * ((e = e / s - 1) * e * e + 1) + i
    },
    easeInOutCubic: function(t, e, i, n, s) {
        return (e /= s / 2) < 1 ? n / 2 * e * e * e + i : n / 2 * ((e -= 2) * e * e + 2) + i
    },
    easeInQuart: function(t, e, i, n, s) {
        return n * (e /= s) * e * e * e + i
    },
    easeOutQuart: function(t, e, i, n, s) {
        return -n * ((e = e / s - 1) * e * e * e - 1) + i
    },
    easeInOutQuart: function(t, e, i, n, s) {
        return (e /= s / 2) < 1 ? n / 2 * e * e * e * e + i : -n / 2 * ((e -= 2) * e * e * e - 2) + i
    },
    easeInQuint: function(t, e, i, n, s) {
        return n * (e /= s) * e * e * e * e + i
    },
    easeOutQuint: function(t, e, i, n, s) {
        return n * ((e = e / s - 1) * e * e * e * e + 1) + i
    },
    easeInOutQuint: function(t, e, i, n, s) {
        return (e /= s / 2) < 1 ? n / 2 * e * e * e * e * e + i : n / 2 * ((e -= 2) * e * e * e * e + 2) + i
    },
    easeInSine: function(t, e, i, n, s) {
        return -n * Math.cos(e / s * (Math.PI / 2)) + n + i
    },
    easeOutSine: function(t, e, i, n, s) {
        return n * Math.sin(e / s * (Math.PI / 2)) + i
    },
    easeInOutSine: function(t, e, i, n, s) {
        return -n / 2 * (Math.cos(Math.PI * e / s) - 1) + i
    },
    easeInExpo: function(t, e, i, n, s) {
        return 0 == e ? i : n * Math.pow(2, 10 * (e / s - 1)) + i
    },
    easeOutExpo: function(t, e, i, n, s) {
        return e == s ? i + n : n * (-Math.pow(2, -10 * e / s) + 1) + i
    },
    easeInOutExpo: function(t, e, i, n, s) {
        return 0 == e ? i : e == s ? i + n : (e /= s / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + i : n / 2 * (-Math.pow(2, -10 * --e) + 2) + i
    },
    easeInCirc: function(t, e, i, n, s) {
        return -n * (Math.sqrt(1 - (e /= s) * e) - 1) + i
    },
    easeOutCirc: function(t, e, i, n, s) {
        return n * Math.sqrt(1 - (e = e / s - 1) * e) + i
    },
    easeInOutCirc: function(t, e, i, n, s) {
        return (e /= s / 2) < 1 ? -n / 2 * (Math.sqrt(1 - e * e) - 1) + i : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i
    },
    easeInElastic: function(t, e, i, n, s) {
        var o = 1.70158,
            r = 0,
            a = n;
        if (0 == e) return i;
        if (1 == (e /= s)) return i + n;
        if (r || (r = .3 * s), a < Math.abs(n)) {
            a = n;
            var o = r / 4
        } else var o = r / (2 * Math.PI) * Math.asin(n / a);
        return -(a * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * s - o) * Math.PI / r)) + i
    },
    easeOutElastic: function(t, e, i, n, s) {
        var o = 1.70158,
            r = 0,
            a = n;
        if (0 == e) return i;
        if (1 == (e /= s)) return i + n;
        if (r || (r = .3 * s), a < Math.abs(n)) {
            a = n;
            var o = r / 4
        } else var o = r / (2 * Math.PI) * Math.asin(n / a);
        return a * Math.pow(2, -10 * e) * Math.sin(2 * (e * s - o) * Math.PI / r) + n + i
    },
    easeInOutElastic: function(t, e, i, n, s) {
        var o = 1.70158,
            r = 0,
            a = n;
        if (0 == e) return i;
        if (2 == (e /= s / 2)) return i + n;
        if (r || (r = .3 * s * 1.5), a < Math.abs(n)) {
            a = n;
            var o = r / 4
        } else var o = r / (2 * Math.PI) * Math.asin(n / a);
        return 1 > e ? -.5 * a * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * s - o) * Math.PI / r) + i : a * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e * s - o) * Math.PI / r) * .5 + n + i
    },
    easeInBack: function(t, e, i, n, s, o) {
        return void 0 == o && (o = 1.70158), n * (e /= s) * e * ((o + 1) * e - o) + i
    },
    easeOutBack: function(t, e, i, n, s, o) {
        return void 0 == o && (o = 1.70158), n * ((e = e / s - 1) * e * ((o + 1) * e + o) + 1) + i
    },
    easeInOutBack: function(t, e, i, n, s, o) {
        return void 0 == o && (o = 1.70158), (e /= s / 2) < 1 ? n / 2 * e * e * (((o *= 1.525) + 1) * e - o) + i : n / 2 * ((e -= 2) * e * (((o *= 1.525) + 1) * e + o) + 2) + i
    },
    easeInBounce: function(t, e, i, n, s) {
        return n - jQuery.easing.easeOutBounce(t, s - e, 0, n, s) + i
    },
    easeOutBounce: function(t, e, i, n, s) {
        return (e /= s) < 1 / 2.75 ? 7.5625 * n * e * e + i : 2 / 2.75 > e ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : 2.5 / 2.75 > e ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
    },
    easeInOutBounce: function(t, e, i, n, s) {
        return s / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, n, s) + i : .5 * jQuery.easing.easeOutBounce(t, 2 * e - s, 0, n, s) + .5 * n + i
    }
}), function(t) {
    "use strict";
    t.fn.fitVids = function(e) {
        var i = {
                customSelector: null
            },
            n = document.createElement("div"),
            s = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
        return n.className = "fit-vids-style", n.innerHTML = "&shy;<style> .fluid-width-video-wrapper { width: 100%; position: relative; padding: 0; } .fluid-width-video-wrapper iframe, .fluid-width-video-wrapper object, .fluid-width-video-wrapper embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>", s.parentNode.insertBefore(n, s), e && t.extend(i, e), this.each(function() {
            var e = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.youtube-nocookie.com']", "iframe[src*='www.kickstarter.com']", "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var n = t(this).find(e.join(","));
            n.each(function() {
                var e = t(this);
                if (!("embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    var i = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height(),
                        n = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10),
                        s = i / n;
                    if (!e.attr("id")) {
                        var o = "fitvid" + Math.floor(999999 * Math.random());
                        e.attr("id", o)
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * s + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(jQuery), function(t, e) {
    "use strict";
    var i = function() {
        var i = {
                bcClass: "sf-breadcrumb",
                menuClass: "sf-js-enabled",
                anchorClass: "sf-with-ul",
                menuArrowClass: "sf-arrows"
            },
            n = function() {
                var i = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                return i && t(e).load(function() {
                    t("body").children().on("click", t.noop)
                }), i
            }(),
            s = function() {
                var t = document.documentElement.style;
                return "behavior" in t && "fill" in t && /iemobile/i.test(navigator.userAgent)
            }(),
            o = function() {
                return !!e.PointerEvent
            }(),
            r = function(t, e) {
                var n = i.menuClass;
                e.cssArrows && (n += " " + i.menuArrowClass), t.toggleClass(n)
            },
            a = function(e, n) {
                return e.find("li." + n.pathClass).slice(0, n.pathLevels).addClass(n.hoverClass + " " + i.bcClass).filter(function() {
                    return t(this).children(n.popUpSelector).hide().show().length
                }).removeClass(n.pathClass)
            },
            l = function(t) {
                t.children("a").toggleClass(i.anchorClass)
            },
            c = function(t) {
                var e = t.css("ms-touch-action"),
                    i = t.css("touch-action");
                i = i || e, i = "pan-y" === i ? "auto" : "pan-y", t.css({
                    "ms-touch-action": i,
                    "touch-action": i
                })
            },
            u = function(e, i) {
                var r = "li:has(" + i.popUpSelector + ")";
                t.fn.hoverIntent && !i.disableHI ? e.hoverIntent(d, p, r) : e.on("mouseenter.superfish", r, d).on("mouseleave.superfish", r, p);
                var a = "MSPointerDown.superfish";
                o && (a = "pointerdown.superfish"), n || (a += " touchend.superfish"), s && (a += " mousedown.superfish"), e.on("focusin.superfish", "li", d).on("focusout.superfish", "li", p).on(a, "a", i, h)
            },
            h = function(e) {
                var i = t(this),
                    n = i.siblings(e.data.popUpSelector);
                n.length > 0 && n.is(":hidden") && (i.one("click.superfish", !1), "MSPointerDown" === e.type || "pointerdown" === e.type ? i.trigger("focus") : t.proxy(d, i.parent("li"))())
            },
            d = function() {
                var e = t(this),
                    i = g(e);
                clearTimeout(i.sfTimer), e.siblings().superfish("hide").end().superfish("show")
            },
            p = function() {
                var e = t(this),
                    i = g(e);
                n ? t.proxy(f, e, i)() : (clearTimeout(i.sfTimer), i.sfTimer = setTimeout(t.proxy(f, e, i), i.delay))
            },
            f = function(e) {
                e.retainPath = t.inArray(this[0], e.$path) > -1, this.superfish("hide"), this.parents("." + e.hoverClass).length || (e.onIdle.call(m(this)), e.$path.length && t.proxy(d, e.$path)())
            },
            m = function(t) {
                return t.closest("." + i.menuClass)
            },
            g = function(t) {
                return m(t).data("sf-options")
            };
        return {
            hide: function(e) {
                if (this.length) {
                    var i = this,
                        n = g(i);
                    if (!n) return this;
                    var s = n.retainPath === !0 ? n.$path : "",
                        o = i.find("li." + n.hoverClass).add(this).not(s).removeClass(n.hoverClass).children(n.popUpSelector),
                        r = n.speedOut;
                    e && (o.show(), r = 0), n.retainPath = !1, n.onBeforeHide.call(o), o.stop(!0, !0).animate(n.animationOut, r, function() {
                        var e = t(this);
                        n.onHide.call(e)
                    })
                }
                return this
            },
            show: function() {
                var t = g(this);
                if (!t) return this;
                var e = this.addClass(t.hoverClass),
                    i = e.children(t.popUpSelector);
                return t.onBeforeShow.call(i), i.stop(!0, !0).animate(t.animation, t.speed, function() {
                    t.onShow.call(i)
                }), this
            },
            destroy: function() {
                return this.each(function() {
                    var e, n = t(this),
                        s = n.data("sf-options");
                    return s ? (e = n.find(s.popUpSelector).parent("li"), clearTimeout(s.sfTimer), r(n, s), l(e), c(n), n.off(".superfish").off(".hoverIntent"), e.children(s.popUpSelector).attr("style", function(t, e) {
                        return e.replace(/display[^;]+;?/g, "")
                    }), s.$path.removeClass(s.hoverClass + " " + i.bcClass).addClass(s.pathClass), n.find("." + s.hoverClass).removeClass(s.hoverClass), s.onDestroy.call(n), void n.removeData("sf-options")) : !1
                })
            },
            init: function(e) {
                return this.each(function() {
                    var n = t(this);
                    if (n.data("sf-options")) return !1;
                    var s = t.extend({}, t.fn.superfish.defaults, e),
                        o = n.find(s.popUpSelector).parent("li");
                    s.$path = a(n, s), n.data("sf-options", s), r(n, s), l(o), c(n), u(n, s), o.not("." + i.bcClass).superfish("hide", !0), s.onInit.call(this)
                })
            }
        }
    }();
    t.fn.superfish = function(e) {
        return i[e] ? i[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? t.error("Method " + e + " does not exist on jQuery.fn.superfish") : i.init.apply(this, arguments)
    }, t.fn.superfish.defaults = {
        popUpSelector: "ul,.sf-mega",
        hoverClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: !0,
        disableHI: !1,
        onInit: t.noop,
        onBeforeShow: t.noop,
        onShow: t.noop,
        onBeforeHide: t.noop,
        onHide: t.noop,
        onIdle: t.noop,
        onDestroy: t.noop
    }
}(jQuery, window), function(t) {
    t.fn.hoverIntent = function(e, i, n) {
        var s = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };
        s = "object" == typeof e ? t.extend(s, e) : t.isFunction(i) ? t.extend(s, {
            over: e,
            out: i,
            selector: n
        }) : t.extend(s, {
            over: e,
            out: e,
            selector: i
        });
        var o, r, a, l, c = function(t) {
                o = t.pageX, r = t.pageY
            },
            u = function(e, i) {
                return i.hoverIntent_t = clearTimeout(i.hoverIntent_t), Math.abs(a - o) + Math.abs(l - r) < s.sensitivity ? (t(i).off("mousemove.hoverIntent", c), i.hoverIntent_s = 1, s.over.apply(i, [e])) : (a = o, l = r, i.hoverIntent_t = setTimeout(function() {
                    u(e, i)
                }, s.interval), void 0)
            },
            h = function(t, e) {
                return e.hoverIntent_t = clearTimeout(e.hoverIntent_t), e.hoverIntent_s = 0, s.out.apply(e, [t])
            },
            d = function(e) {
                var i = jQuery.extend({}, e),
                    n = this;
                n.hoverIntent_t && (n.hoverIntent_t = clearTimeout(n.hoverIntent_t)), "mouseenter" == e.type ? (a = i.pageX, l = i.pageY, t(n).on("mousemove.hoverIntent", c), 1 != n.hoverIntent_s && (n.hoverIntent_t = setTimeout(function() {
                    u(i, n)
                }, s.interval))) : (t(n).off("mousemove.hoverIntent", c), 1 == n.hoverIntent_s && (n.hoverIntent_t = setTimeout(function() {
                    h(i, n)
                }, s.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": d,
            "mouseleave.hoverIntent": d
        }, s.selector)
    }
}(jQuery), ! function(t, e, i) {
    "object" == typeof module && module && "object" == typeof module.exports ? module.exports = i : (t[e] = i, "function" == typeof define && define.amd && define(e, [], function() {
        return i
    }))
}(this, "jRespond", function(t, e, i) {
    "use strict";
    return function(t) {
        var e = [],
            n = [],
            s = t,
            o = "",
            r = "",
            a = 0,
            l = 100,
            c = 500,
            u = c,
            h = function() {
                var t = 0;
                return t = "number" != typeof window.innerWidth ? 0 !== document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth : window.innerWidth
            },
            d = function(t) {
                if (t.length === i) p(t);
                else
                    for (var e = 0; e < t.length; e++) p(t[e])
            },
            p = function(t) {
                var s = t.breakpoint,
                    a = t.enter || i;
                e.push(t), n.push(!1), g(s) && (a !== i && a.call(null, {
                    entering: o,
                    exiting: r
                }), n[e.length - 1] = !0)
            },
            f = function() {
                for (var t = [], s = [], a = 0; a < e.length; a++) {
                    var l = e[a].breakpoint,
                        c = e[a].enter || i,
                        u = e[a].exit || i;
                    "*" === l ? (c !== i && t.push(c), u !== i && s.push(u)) : g(l) ? (c === i || n[a] || t.push(c), n[a] = !0) : (u !== i && n[a] && s.push(u), n[a] = !1)
                }
                for (var h = {
                    entering: o,
                    exiting: r
                }, d = 0; d < s.length; d++) s[d].call(null, h);
                for (var p = 0; p < t.length; p++) t[p].call(null, h)
            },
            m = function(t) {
                for (var e = !1, i = 0; i < s.length; i++)
                    if (t >= s[i].enter && t <= s[i].exit) {
                        e = !0;
                        break
                    }
                e && o !== s[i].label ? (r = o, o = s[i].label, f()) : e || "" === o || (o = "", f())
            },
            g = function(t) {
                if ("object" == typeof t) {
                    if (t.join().indexOf(o) >= 0) return !0
                } else {
                    if ("*" === t) return !0;
                    if ("string" == typeof t && o === t) return !0
                }
            },
            v = function() {
                var t = h();
                t !== a ? (u = l, m(t)) : u = c, a = t, setTimeout(v, u)
            };
        return v(), {
            addFunc: function(t) {
                d(t)
            },
            getBreakpoint: function() {
                return o
            }
        }
    }
}(this, this.document)), ! function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(t.jQuery)
}(this, function(t) {
    function e(t) {
        if (t in h.style) return t;
        for (var e = ["Moz", "Webkit", "O", "ms"], i = t.charAt(0).toUpperCase() + t.substr(1), n = 0; n < e.length; ++n) {
            var s = e[n] + i;
            if (s in h.style) return s
        }
    }

    function i() {
        return h.style[d.transform] = "", h.style[d.transform] = "rotateY(90deg)", "" !== h.style[d.transform]
    }

    function n(t) {
        return "string" == typeof t && this.parse(t), this
    }

    function s(t, e, i) {
        e === !0 ? t.queue(i) : e ? t.queue(e, i) : t.each(function() {
            i.call(this)
        })
    }

    function o(e) {
        var i = [];
        return t.each(e, function(e) {
            e = t.camelCase(e), e = t.transit.propertyMap[e] || t.cssProps[e] || e, e = l(e), d[e] && (e = l(d[e])), -1 === t.inArray(e, i) && i.push(e)
        }), i
    }

    function r(e, i, n, s) {
        var r = o(e);
        t.cssEase[n] && (n = t.cssEase[n]);
        var a = "" + u(i) + " " + n;
        parseInt(s, 10) > 0 && (a += " " + u(s));
        var l = [];
        return t.each(r, function(t, e) {
            l.push(e + " " + a)
        }), l.join(", ")
    }

    function a(e, i) {
        i || (t.cssNumber[e] = !0), t.transit.propertyMap[e] = d.transform, t.cssHooks[e] = {
            get: function(i) {
                var n = t(i).css("transit:transform");
                return n.get(e)
            },
            set: function(i, n) {
                var s = t(i).css("transit:transform");
                s.setFromString(e, n), t(i).css({
                    "transit:transform": s
                })
            }
        }
    }

    function l(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }

    function c(t, e) {
        return "string" != typeof t || t.match(/^[\-0-9\.]+$/) ? "" + t + e : t
    }

    function u(e) {
        var i = e;
        return "string" != typeof i || i.match(/^[\-0-9\.]+/) || (i = t.fx.speeds[i] || t.fx.speeds._default), c(i, "ms")
    }
    t.transit = {
        version: "0.9.12",
        propertyMap: {
            marginLeft: "margin",
            marginRight: "margin",
            marginBottom: "margin",
            marginTop: "margin",
            paddingLeft: "padding",
            paddingRight: "padding",
            paddingBottom: "padding",
            paddingTop: "padding"
        },
        enabled: !0,
        useTransitionEnd: !1
    };
    var h = document.createElement("div"),
        d = {},
        p = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    d.transition = e("transition"), d.transitionDelay = e("transitionDelay"), d.transform = e("transform"), d.transformOrigin = e("transformOrigin"), d.filter = e("Filter"), d.transform3d = i();
    var f = {
            transition: "transitionend",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            WebkitTransition: "webkitTransitionEnd",
            msTransition: "MSTransitionEnd"
        },
        m = d.transitionEnd = f[d.transition] || null;
    for (var g in d) d.hasOwnProperty(g) && "undefined" == typeof t.support[g] && (t.support[g] = d[g]);
    return h = null, t.cssEase = {
        _default: "ease",
        "in": "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
        snap: "cubic-bezier(0,1,.5,1)",
        easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
        easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
        easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
        easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
        easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
        easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
        easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
        easeOutExpo: "cubic-bezier(.19,1,.22,1)",
        easeInOutExpo: "cubic-bezier(1,0,0,1)",
        easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
        easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
        easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
        easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
        easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
        easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
        easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
        easeOutQuint: "cubic-bezier(.23,1,.32,1)",
        easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
        easeInSine: "cubic-bezier(.47,0,.745,.715)",
        easeOutSine: "cubic-bezier(.39,.575,.565,1)",
        easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
        easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
        easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
        easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
    }, t.cssHooks["transit:transform"] = {
        get: function(e) {
            return t(e).data("transform") || new n
        },
        set: function(e, i) {
            var s = i;
            s instanceof n || (s = new n(s)), e.style[d.transform] = "WebkitTransform" !== d.transform || p ? s.toString() : s.toString(!0), t(e).data("transform", s)
        }
    }, t.cssHooks.transform = {
        set: t.cssHooks["transit:transform"].set
    }, t.cssHooks.filter = {
        get: function(t) {
            return t.style[d.filter]
        },
        set: function(t, e) {
            t.style[d.filter] = e
        }
    }, t.fn.jquery < "1.8" && (t.cssHooks.transformOrigin = {
        get: function(t) {
            return t.style[d.transformOrigin]
        },
        set: function(t, e) {
            t.style[d.transformOrigin] = e
        }
    }, t.cssHooks.transition = {
        get: function(t) {
            return t.style[d.transition]
        },
        set: function(t, e) {
            t.style[d.transition] = e
        }
    }), a("scale"), a("scaleX"), a("scaleY"), a("translate"), a("rotate"), a("rotateX"), a("rotateY"), a("rotate3d"), a("perspective"), a("skewX"), a("skewY"), a("x", !0), a("y", !0), n.prototype = {
        setFromString: function(t, e) {
            var i = "string" == typeof e ? e.split(",") : e.constructor === Array ? e : [e];
            i.unshift(t), n.prototype.set.apply(this, i)
        },
        set: function(t) {
            var e = Array.prototype.slice.apply(arguments, [1]);
            this.setter[t] ? this.setter[t].apply(this, e) : this[t] = e.join(",")
        },
        get: function(t) {
            return this.getter[t] ? this.getter[t].apply(this) : this[t] || 0
        },
        setter: {
            rotate: function(t) {
                this.rotate = c(t, "deg")
            },
            rotateX: function(t) {
                this.rotateX = c(t, "deg")
            },
            rotateY: function(t) {
                this.rotateY = c(t, "deg")
            },
            scale: function(t, e) {
                void 0 === e && (e = t), this.scale = t + "," + e
            },
            skewX: function(t) {
                this.skewX = c(t, "deg")
            },
            skewY: function(t) {
                this.skewY = c(t, "deg")
            },
            perspective: function(t) {
                this.perspective = c(t, "px")
            },
            x: function(t) {
                this.set("translate", t, null)
            },
            y: function(t) {
                this.set("translate", null, t)
            },
            translate: function(t, e) {
                void 0 === this._translateX && (this._translateX = 0), void 0 === this._translateY && (this._translateY = 0), null !== t && void 0 !== t && (this._translateX = c(t, "px")), null !== e && void 0 !== e && (this._translateY = c(e, "px")), this.translate = this._translateX + "," + this._translateY
            }
        },
        getter: {
            x: function() {
                return this._translateX || 0
            },
            y: function() {
                return this._translateY || 0
            },
            scale: function() {
                var t = (this.scale || "1,1").split(",");
                return t[0] && (t[0] = parseFloat(t[0])), t[1] && (t[1] = parseFloat(t[1])), t[0] === t[1] ? t[0] : t
            },
            rotate3d: function() {
                for (var t = (this.rotate3d || "0,0,0,0deg").split(","), e = 0; 3 >= e; ++e) t[e] && (t[e] = parseFloat(t[e]));
                return t[3] && (t[3] = c(t[3], "deg")), t
            }
        },
        parse: function(t) {
            var e = this;
            t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(t, i, n) {
                e.setFromString(i, n)
            })
        },
        toString: function(t) {
            var e = [];
            for (var i in this)
                if (this.hasOwnProperty(i)) {
                    if (!d.transform3d && ("rotateX" === i || "rotateY" === i || "perspective" === i || "transformOrigin" === i)) continue;
                    "_" !== i[0] && e.push(t && "scale" === i ? i + "3d(" + this[i] + ",1)" : t && "translate" === i ? i + "3d(" + this[i] + ",0)" : i + "(" + this[i] + ")")
                }
            return e.join(" ")
        }
    }, t.fn.transition = t.fn.transit = function(e, i, n, o) {
        var a = this,
            l = 0,
            c = !0,
            h = t.extend(!0, {}, e);
        "function" == typeof i && (o = i, i = void 0), "object" == typeof i && (n = i.easing, l = i.delay || 0, c = "undefined" == typeof i.queue ? !0 : i.queue, o = i.complete, i = i.duration), "function" == typeof n && (o = n, n = void 0), "undefined" != typeof h.easing && (n = h.easing, delete h.easing), "undefined" != typeof h.duration && (i = h.duration, delete h.duration), "undefined" != typeof h.complete && (o = h.complete, delete h.complete), "undefined" != typeof h.queue && (c = h.queue, delete h.queue), "undefined" != typeof h.delay && (l = h.delay, delete h.delay), "undefined" == typeof i && (i = t.fx.speeds._default), "undefined" == typeof n && (n = t.cssEase._default), i = u(i);
        var p = r(h, i, n, l),
            f = t.transit.enabled && d.transition,
            g = f ? parseInt(i, 10) + parseInt(l, 10) : 0;
        if (0 === g) {
            var v = function(t) {
                a.css(h), o && o.apply(a), t && t()
            };
            return s(a, c, v), a
        }
        var y = {},
            b = function(e) {
                var i = !1,
                    n = function() {
                        i && a.unbind(m, n), g > 0 && a.each(function() {
                            this.style[d.transition] = y[this] || null
                        }), "function" == typeof o && o.apply(a), "function" == typeof e && e()
                    };
                g > 0 && m && t.transit.useTransitionEnd ? (i = !0, a.bind(m, n)) : window.setTimeout(n, g), a.each(function() {
                    g > 0 && (this.style[d.transition] = p), t(this).css(h)
                })
            },
            w = function(t) {
                this.offsetWidth, b(t)
            };
        return s(a, c, w), this
    }, t.transit.getTransitionValue = r, t
}), -1 === navigator.platform.toUpperCase().indexOf("MAC") && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini|BlackBerry)/) && jQuery(window).width() > 991) {
    var ssc_framerate = 150,
        ssc_animtime = 500,
        ssc_stepsize = 150,
        ssc_pulseAlgorithm = !0,
        ssc_pulseScale = 6,
        ssc_pulseNormalize = 1,
        ssc_keyboardsupport = !0,
        ssc_arrowscroll = 50,
        ssc_frame = !1,
        ssc_direction = {
            x: 0,
            y: 0
        },
        ssc_initdone = !1,
        ssc_fixedback = !0,
        ssc_root = document.documentElement,
        ssc_activeElement, ssc_key = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        ssc_que = [],
        ssc_pending = !1,
        ssc_cache = {};
    setInterval(function() {
        ssc_cache = {}
    }, 1e4);
    var ssc_uniqueID = function() {
            var t = 0;
            return function(e) {
                return e.ssc_uniqueID || (e.ssc_uniqueID = t++)
            }
        }(),
        ischrome = /chrome/.test(navigator.userAgent.toLowerCase());
    ischrome && (ssc_addEvent("mousedown", ssc_mousedown), ssc_addEvent("mousewheel", ssc_wheel), ssc_addEvent("load", ssc_init))
}! function(t) {
    var e = 0;
    t.fn.scrolled = function(i, n) {
        "function" == typeof i && (n = i, i = 300);
        var s = "scrollTimer" + e++;
        this.scroll(function() {
            var e = t(this),
                o = e.data(s);
            o && clearTimeout(o), o = setTimeout(function() {
                e.removeData(s), n.call(e[0])
            }, i), e.data(s, o)
        })
    }
}(jQuery),
function(t) {
    t.fn.jflickrfeed = function(e, i) {
        e = t.extend(!0, {
            flickrbase: "http://api.flickr.com/services/feeds/",
            feedapi: "photos_public.gne",
            limit: 20,
            qstrings: {
                lang: "en-us",
                format: "json",
                jsoncallback: "?"
            },
            cleanDescription: !0,
            useTemplate: !0,
            itemTemplate: "",
            itemCallback: function() {}
        }, e);
        var n = e.flickrbase + e.feedapi + "?",
            s = !0;
        for (var o in e.qstrings) s || (n += "&"), n += o + "=" + e.qstrings[o], s = !1;
        return t(this).each(function() {
            var s = t(this),
                o = this;
            t.getJSON(n, function(n) {
                t.each(n.items, function(t, i) {
                    if (t < e.limit) {
                        if (e.cleanDescription) {
                            var n = /<p>(.*?)<\/p>/g,
                                r = i.description;
                            n.test(r) && (i.description = r.match(n)[2], void 0 != i.description && (i.description = i.description.replace("<p>", "").replace("</p>", "")))
                        }
                        if (i.image_s = i.media.m.replace("_m", "_s"), i.image_t = i.media.m.replace("_m", "_t"), i.image_m = i.media.m.replace("_m", "_m"), i.image = i.media.m.replace("_m", ""), i.image_b = i.media.m.replace("_m", "_b"), delete i.media, e.useTemplate) {
                            var a = e.itemTemplate;
                            for (var l in i) {
                                var c = new RegExp("{{" + l + "}}", "g");
                                a = a.replace(c, i[l])
                            }
                            s.append(a)
                        }
                        e.itemCallback.call(o, i)
                    }
                }), t.isFunction(i) && i.call(o, n)
            })
        })
    }
}(jQuery), "function" != typeof Object.create && (Object.create = function(t) {
    function e() {}
    return e.prototype = t, new e
}),
function(t) {
    var e = {
        init: function(e, i) {
            var n = this;
            n.elem = i, n.$elem = t(i), n.api = "https://api.instagram.com/v1", n.accessData = t.fn.spectragram.accessData, n.options = t.extend({}, t.fn.spectragram.options, e)
        },
        getRecentMedia: function(t) {
            var e = this,
                i = "/users/" + t + "/media/recent/?" + e.accessData.clientID + "&access_token=" + e.accessData.accessToken;
            e.fetch(i).done(function(t) {
                e.display(t)
            })
        },
        getUserFeed: function() {
            var e = this,
                i = "/users/search?q=" + e.options.query + "&count=" + e.options.max + "&client_id=" + e.accessData.clientID;
            e.fetch(i).done(function(i) {
                i.data.length ? e.getRecentMedia(i.data[0].id) : t.error("Spectagram.js - Error: the username " + e.options.query + " does not exist.")
            })
        },
        getPopular: function() {
            var t = this,
                e = "/media/popular?client_id=" + t.accessData.clientID + "&access_token=" + t.accessData.accessToken;
            t.fetch(e).done(function(e) {
                t.display(e)
            })
        },
        getRecentTagged: function() {
            var e = this,
                i = "/tags/" + e.options.query + "/media/recent?client_id=" + e.accessData.clientID + "&access_token=" + e.accessData.accessToken;
            e.fetch(i).done(function(i) {
                i.data.length ? e.display(i) : t.error("Spectagram.js - Error: the tag " + e.options.query + " does not have results.")
            })
        },
        fetch: function(e) {
            var i = this,
                n = i.api + e;
            return t.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: !1,
                url: n
            })
        },
        display: function(e) {
            var i, n = this,
                s = n.options.size,
                o = n.options.max >= e.data.length ? e.data.length : n.options.max;
            if (0 === e.data.length) n.$elem.append(t(n.options.wrapEachWith).append(n.options.notFoundMsg));
            else
                for (var r = 0; o > r; r++) i = "small" == s ? e.data[r].images.thumbnail.url : "medium" == s ? e.data[r].images.low_resolution.url : e.data[r].images.standard_resolution.url, n.$elem.append("<a target='_blank' href='" + e.data[r].link + "'><img src='" + i + "'></img></a>")
        }
    };
    jQuery.fn.spectragram = function(i, n) {
        jQuery.fn.spectragram.accessData.clientID ? this.each(function() {
            var s = Object.create(e);
            return s.init(n, this), s[i] ? s[i](this) : void t.error("Method " + i + " does not exist on jQuery.spectragram")
        }) : t.error("You must define an accessToken and a clientID on jQuery.spectragram")
    }, jQuery.fn.spectragram.options = {
        max: 10,
        query: "coffee",
        size: "medium",
        wrapEachWith: "<li></li>"
    }, jQuery.fn.spectragram.accessData = {
        accessToken: null,
        clientID: null
    }
}(jQuery, window, document),
function(t) {
    "use strict";
    t.fn.jribbble = function() {
        return this.makeRequest = function(e, i, n) {
            var s = function(e) {
                    t.isFunction(i) && i(e)
                },
                o = e.replace("//", "/");
            t.ajax({
                data: n,
                dataType: "jsonp",
                success: s,
                type: "GET",
                url: t.jribbble.baseUrl + o
            })
        }, this
    }, t.jribbble = {}, t.jribbble.baseUrl = "http://api.dribbble.com", t.jribbble.paths = {
        shots: "/shots/",
        rebounds: "/rebounds/",
        following: "/following/",
        players: "/players/",
        followers: "/followers/",
        draftees: "/draftees/",
        comments: "/comments/",
        likes: "/likes/"
    }, t.jribbble.getShotById = function(e, i) {
        var n = t.jribbble.paths.shots + e;
        t.fn.jribbble().makeRequest(n, i)
    }, t.jribbble.getReboundsOfShot = function(e, i, n) {
        var s = t.jribbble.paths.shots + e + t.jribbble.paths.rebounds;
        t.fn.jribbble().makeRequest(s, i, n)
    }, t.jribbble.getShotsByList = function(e, i, n) {
        var s = t.jribbble.paths.shots + e;
        t.fn.jribbble().makeRequest(s, i, n)
    }, t.jribbble.getShotsByPlayerId = function(e, i, n) {
        var s = t.jribbble.paths.players + e + t.jribbble.paths.shots;
        t.fn.jribbble().makeRequest(s, i, n)
    }, t.jribbble.getShotsThatPlayerFollows = function(e, i, n) {
        var s = t.jribbble.paths.players + e + t.jribbble.paths.shots + t.jribbble.paths.following;
        t.fn.jribbble().makeRequest(s, i, n)
    }, t.jribbble.getPlayerById = function(e, i) {
        var n = t.jribbble.paths.players + e;
        t.fn.jribbble().makeRequest(n, i)
    }, t.jribbble.getPlayerFollowers = function(e, i, n) {
        var s = t.jribbble.paths.players + e + t.jribbble.paths.followers;
        t.fn.jribbble().makeRequest(s, i, n)
    }, t.jribbble.getPlayerFollowing = function(e, i, n) {
        var s = t.jribbble.paths.players + e + t.jribbble.paths.following;
        t.fn.jribbble().makeRequest(s, i, n)
    }, t.jribbble.getPlayerDraftees = function(e, i, n) {
        var s = t.jribbble.paths.players + e + t.jribbble.paths.draftees;
        t.fn.jribbble().makeRequest(s, i, n)
    }, t.jribbble.getCommentsOfShot = function(e, i, n) {
        var s = t.jribbble.paths.shots + e + t.jribbble.paths.comments;
        t.fn.jribbble().makeRequest(s, i, n)
    }, t.jribbble.getShotsThatPlayerLikes = function(e, i, n) {
        var s = t.jribbble.paths.players + e + t.jribbble.paths.shots + t.jribbble.paths.likes;
        t.fn.jribbble().makeRequest(s, i, n)
    }
}(jQuery),
function(t) {
    return t.easyPieChart = function(e, i) {
        var n, s, o, r, a, l, c, u, h = this;
        return this.el = e, this.$el = t(e), this.$el.data("easyPieChart", this), this.init = function() {
            var e, n;
            return h.options = t.extend({}, t.easyPieChart.defaultOptions, i), e = parseInt(h.$el.data("percent"), 10), h.percentage = 0, h.canvas = t("<canvas width='" + h.options.size + "' height='" + h.options.size + "'></canvas>").get(0), h.$el.append(h.canvas), "undefined" != typeof G_vmlCanvasManager && null !== G_vmlCanvasManager && G_vmlCanvasManager.initElement(h.canvas), h.ctx = h.canvas.getContext("2d"), window.devicePixelRatio > 1 && (n = window.devicePixelRatio, t(h.canvas).css({
                width: h.options.size,
                height: h.options.size
            }), h.canvas.width *= n, h.canvas.height *= n, h.ctx.scale(n, n)), h.ctx.translate(h.options.size / 2, h.options.size / 2), h.ctx.rotate(h.options.rotate * Math.PI / 180), h.$el.addClass("easyPieChart"), h.$el.css({
                width: h.options.size,
                height: h.options.size,
                lineHeight: "" + h.options.size + "px"
            }), h.update(e), h
        }, this.update = function(t) {
            return t = parseFloat(t) || 0, h.options.animate === !1 ? o(t) : h.options.delay ? (s(h.percentage, 0), setTimeout(function() {
                return s(h.percentage, t)
            }, h.options.delay)) : s(h.percentage, t), h
        }, c = function() {
            var t, e, i;
            for (h.ctx.fillStyle = h.options.scaleColor, h.ctx.lineWidth = 1, i = [], t = e = 0; 24 >= e; t = ++e) i.push(n(t));
            return i
        }, n = function(t) {
            var e;
            e = t % 6 === 0 ? 0 : .017 * h.options.size, h.ctx.save(), h.ctx.rotate(t * Math.PI / 12), h.ctx.fillRect(h.options.size / 2 - e, 0, .05 * -h.options.size + e, 1), h.ctx.restore()
        }, u = function() {
            var t;
            t = h.options.size / 2 - h.options.lineWidth / 2, h.options.scaleColor !== !1 && (t -= .08 * h.options.size), h.ctx.beginPath(), h.ctx.arc(0, 0, t, 0, 2 * Math.PI, !0), h.ctx.closePath(), h.ctx.strokeStyle = h.options.trackColor, h.ctx.lineWidth = h.options.lineWidth, h.ctx.stroke()
        }, l = function() {
            h.options.scaleColor !== !1 && c(), h.options.trackColor !== !1 && u()
        }, o = function(e) {
            var i;
            l(), h.ctx.strokeStyle = t.isFunction(h.options.barColor) ? h.options.barColor(e) : h.options.barColor, h.ctx.lineCap = h.options.lineCap, h.ctx.lineWidth = h.options.lineWidth, i = h.options.size / 2 - h.options.lineWidth / 2, h.options.scaleColor !== !1 && (i -= .08 * h.options.size), h.ctx.save(), h.ctx.rotate(-Math.PI / 2), h.ctx.beginPath(), h.ctx.arc(0, 0, i, 0, 2 * Math.PI * e / 100, !1), h.ctx.stroke(), h.ctx.restore()
        }, a = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                return window.setTimeout(t, 1e3 / 60)
            }
        }(), s = function(t, e) {
            var i, n;
            h.options.onStart.call(h), h.percentage = e, Date.now || (Date.now = function() {
                return +new Date
            }), n = Date.now(), i = function() {
                var s, c;
                return c = Math.min(Date.now() - n, h.options.animate), h.ctx.clearRect(-h.options.size / 2, -h.options.size / 2, h.options.size, h.options.size), l.call(h), s = [r(c, t, e - t, h.options.animate)], h.options.onStep.call(h, s), o.call(h, s), c >= h.options.animate ? h.options.onStop.call(h, s, e) : a(i)
            }, a(i)
        }, r = function(t, e, i, n) {
            var s, o;
            return s = function(t) {
                return Math.pow(t, 2)
            }, o = function(t) {
                return 1 > t ? s(t) : 2 - s(t / 2 * -2 + 2)
            }, t /= n / 2, i / 2 * o(t) + e
        }, this.init()
    }, t.easyPieChart.defaultOptions = {
        barColor: "#ef1e25",
        trackColor: "#f2f2f2",
        scaleColor: "#dfe0e0",
        lineCap: "round",
        rotate: 0,
        size: 110,
        lineWidth: 3,
        animate: !1,
        delay: !1,
        onStart: t.noop,
        onStop: t.noop,
        onStep: t.noop
    }, void(t.fn.easyPieChart = function(e) {
        return t.each(this, function(i, n) {
            var s, o;
            return s = t(n), s.data("easyPieChart") ? void 0 : (o = t.extend({}, e, s.data()), s.data("easyPieChart", new t.easyPieChart(n, o)))
        })
    })
}(jQuery),
function(t) {
    t.fn.appear = function(e, i) {
        var n = t.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, i);
        return this.each(function() {
            var i = t(this);
            if (i.appeared = !1, !e) return void i.trigger("appear", n.data);
            var s = t(window),
                o = function() {
                    if (!i.is(":visible")) return void(i.appeared = !1);
                    var t = s.scrollLeft(),
                        e = s.scrollTop(),
                        o = i.offset(),
                        r = o.left,
                        a = o.top,
                        l = n.accX,
                        c = n.accY,
                        u = i.height(),
                        h = s.height(),
                        d = i.width(),
                        p = s.width();
                    a + u + c >= e && e + h + c >= a && r + d + l >= t && t + p + l >= r ? i.appeared || i.trigger("appear", n.data) : i.appeared = !1
                },
                r = function() {
                    if (i.appeared = !0, n.one) {
                        s.unbind("scroll", o);
                        var r = t.inArray(o, t.fn.appear.checks);
                        r >= 0 && t.fn.appear.checks.splice(r, 1)
                    }
                    e.apply(this, arguments)
                };
            n.one ? i.one("appear", n.data, r) : i.bind("appear", n.data, r), s.scroll(o), t.fn.appear.checks.push(o), o()
        })
    }, t.extend(t.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var e = t.fn.appear.checks.length;
            if (e > 0)
                for (; e--;) t.fn.appear.checks[e]()
        },
        run: function() {
            t.fn.appear.timeout && clearTimeout(t.fn.appear.timeout), t.fn.appear.timeout = setTimeout(t.fn.appear.checkAll, 20)
        }
    }), t.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(e, i) {
        var n = t.fn[i];
        n && (t.fn[i] = function() {
            var e = n.apply(this, arguments);
            return t.fn.appear.run(), e
        })
    })
}(jQuery), ! function(t) {
    "use strict";
    var e = "animsition",
        i = {
            init: function(n) {
                n = t.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingHtml: '<div class="css3-spinner-bounce1"></div><div class="css3-spinner-bounce2"></div><div class="css3-spinner-bounce3"></div>',
                    unSupportCss: ["animation-duration", "-webkit-animation-duration", "-o-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body"
                }, n);
                var s = i.supportCheck.call(this, n);
                if (!s) return "console" in window || (window.console = {}, window.console.log = function(t) {
                    return t
                }), console.log("Animsition does not support this browser."), i.destroy.call(this);
                var o = i.optionCheck.call(this, n);
                return o && i.addOverlay.call(this, n), n.loading && i.addLoading.call(this, n), this.each(function() {
                    var s = this,
                        o = t(this),
                        r = t(window),
                        a = o.data(e);
                    a || (n = t.extend({}, n), o.data(e, {
                        options: n
                    }), r.on("load." + e + " pageshow." + e, function() {
                        i.pageIn.call(s)
                    }), r.on("unload." + e, function() {}), t(n.linkElement).on("click." + e, function(e) {
                        e.preventDefault();
                        var n = t(this);
                        i.pageOut.call(s, n)
                    }))
                })
            },
            addOverlay: function(e) {
                t(e.overlayParentElement).prepend('<div class="' + e.overlayClass + '"></div>')
            },
            addLoading: function(e) {
                t(e.loadingParentElement).append('<div class="' + e.loadingClass + '">' + e.loadingHtml + "</div>")
            },
            removeLoading: function() {
                var i = t(this),
                    n = i.data(e).options,
                    s = t(n.loadingParentElement).children("." + n.loadingClass);
                s.fadeOut().remove()
            },
            supportCheck: function(e) {
                var i = t(this),
                    n = e.unSupportCss,
                    s = n.length,
                    o = !1;
                0 === s && (o = !0);
                for (var r = 0; s > r; r++)
                    if ("string" == typeof i.css(n[r])) {
                        o = !0;
                        break
                    }
                return o
            },
            optionCheck: function(e) {
                var i, n = t(this);
                return i = e.overlay || n.data("animsition-overlay") ? !0 : !1
            },
            animationCheck: function(i, n, s) {
                var o = t(this),
                    r = o.data(e).options,
                    a = typeof i,
                    l = !n && "number" === a,
                    c = n && "string" === a && i.length > 0;
                return l || c ? i = i : n && s ? i = r.inClass : !n && s ? i = r.inDuration : n && !s ? i = r.outClass : n || s || (i = r.outDuration), i
            },
            pageIn: function() {
                var n = this,
                    s = t(this),
                    o = s.data(e).options,
                    r = s.data("animsition-in-duration"),
                    a = s.data("animsition-in"),
                    l = i.animationCheck.call(n, r, !1, !0),
                    c = i.animationCheck.call(n, a, !0, !0),
                    u = i.optionCheck.call(n, o);
                o.loading && i.removeLoading.call(n), u ? i.pageInOverlay.call(n, c, l) : i.pageInBasic.call(n, c, l)
            },
            pageInBasic: function(e, i) {
                var n = t(this);
                n.css({
                    "animation-duration": i / 1e3 + "s"
                }).addClass(e).animateCallback(function() {
                    n.removeClass(e).css({
                        opacity: 1
                    })
                })
            },
            pageInOverlay: function(i, n) {
                var s = t(this),
                    o = s.data(e).options;
                s.css({
                    opacity: 1
                }), t(o.overlayParentElement).children("." + o.overlayClass).css({
                    "animation-duration": n / 1e3 + "s"
                }).addClass(i)
            },
            pageOut: function(n) {
                var s = this,
                    o = t(this),
                    r = o.data(e).options,
                    a = n.data("animsition-out"),
                    l = o.data("animsition-out"),
                    c = n.data("animsition-out-duration"),
                    u = o.data("animsition-out-duration"),
                    h = a ? a : l,
                    d = c ? c : u,
                    p = i.animationCheck.call(s, h, !0, !1),
                    f = i.animationCheck.call(s, d, !1, !1),
                    m = i.optionCheck.call(s, r),
                    g = n.attr("href");
                m ? i.pageOutOverlay.call(s, p, f, g) : i.pageOutBasic.call(s, p, f, g)
            },
            pageOutBasic: function(e, i, n) {
                var s = t(this);
                s.css({
                    "animation-duration": i / 1e3 + "s"
                }).addClass(e).animateCallback(function() {
                    location.href = n
                })
            },
            pageOutOverlay: function(n, s, o) {
                var r = this,
                    a = t(this),
                    l = a.data(e).options,
                    c = a.data("animsition-in"),
                    u = i.animationCheck.call(r, c, !0, !0);
                t(l.overlayParentElement).children("." + l.overlayClass).css({
                    "animation-duration": s / 1e3 + "s"
                }).removeClass(u).addClass(n).animateCallback(function() {
                    a.css({
                        opacity: 0
                    }), location.href = o
                })
            },
            destroy: function() {
                return this.each(function() {
                    var i = t(this);
                    t(window).unbind("." + e), i.css({
                        opacity: 1
                    }).removeData(e)
                })
            }
        };
    t.fn.animateCallback = function(e) {
        var i = "animationend webkitAnimationEnd mozAnimationEnd oAnimationEnd MSAnimationEnd";
        return this.each(function() {
            t(this).bind(i, function() {
                return t(this).unbind(i), e.call(this)
            })
        })
    }, t.fn.animsition = function(n) {
        return i[n] ? i[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void t.error("Method " + n + " does not exist on jQuery." + e) : i.init.apply(this, arguments)
    }
}(jQuery),
function(t, e, i, n) {
    function s(e, i) {
        this.element = e, this.options = t.extend({}, r, i), this._defaults = r, this._name = o, this.init()
    }
    var o = "stellar",
        r = {
            scrollProperty: "scroll",
            positionProperty: "position",
            horizontalScrolling: !0,
            verticalScrolling: !0,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: !1,
            parallaxBackgrounds: !0,
            parallaxElements: !0,
            hideDistantElements: !0,
            hideElement: function(t) {
                t.hide()
            },
            showElement: function(t) {
                t.show()
            }
        },
        a = {
            scroll: {
                getLeft: function(t) {
                    return t.scrollLeft()
                },
                setLeft: function(t, e) {
                    t.scrollLeft(e)
                },
                getTop: function(t) {
                    return t.scrollTop()
                },
                setTop: function(t, e) {
                    t.scrollTop(e)
                }
            },
            position: {
                getLeft: function(t) {
                    return -1 * parseInt(t.css("left"), 10)
                },
                getTop: function(t) {
                    return -1 * parseInt(t.css("top"), 10)
                }
            },
            margin: {
                getLeft: function(t) {
                    return -1 * parseInt(t.css("margin-left"), 10)
                },
                getTop: function(t) {
                    return -1 * parseInt(t.css("margin-top"), 10)
                }
            },
            transform: {
                getLeft: function(t) {
                    var e = getComputedStyle(t[0])[u];
                    return "none" !== e ? -1 * parseInt(e.match(/(-?[0-9]+)/g)[4], 10) : 0
                },
                getTop: function(t) {
                    var e = getComputedStyle(t[0])[u];
                    return "none" !== e ? -1 * parseInt(e.match(/(-?[0-9]+)/g)[5], 10) : 0
                }
            }
        },
        l = {
            position: {
                setLeft: function(t, e) {
                    t.css("left", e)
                },
                setTop: function(t, e) {
                    t.css("top", e)
                }
            },
            transform: {
                setPosition: function(t, e, i, n, s) {
                    t[0].style[u] = "translate3d(" + (e - i) + "px, " + (n - s) + "px, 0)"
                }
            }
        },
        c = function() {
            var e, i = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                n = t("script")[0].style,
                s = "";
            for (e in n)
                if (i.test(e)) {
                    s = e.match(i)[0];
                    break
                }
            return "WebkitOpacity" in n && (s = "Webkit"), "KhtmlOpacity" in n && (s = "Khtml"),
                function(t) {
                    return s + (s.length > 0 ? t.charAt(0).toUpperCase() + t.slice(1) : t)
                }
        }(),
        u = c("transform"),
        h = t("<div />", {
            style: "background:#fff"
        }).css("background-position-x") !== n,
        d = h ? function(t, e, i) {
            t.css({
                "background-position-x": e,
                "background-position-y": i
            })
        } : function(t, e, i) {
            t.css("background-position", e + " " + i)
        },
        p = h ? function(t) {
            return [t.css("background-position-x"), t.css("background-position-y")]
        } : function(t) {
            return t.css("background-position").split(" ")
        },
        f = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(t) {
            setTimeout(t, 1e3 / 60)
        };
    s.prototype = {
        init: function() {
            this.options.name = o + "_" + Math.floor(1e9 * Math.random()), this._defineElements(), this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), this._detectViewport(), this.refresh({
                firstLoad: !0
            }), "scroll" === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop()
        },
        _defineElements: function() {
            this.element === i.body && (this.element = e), this.$scrollElement = t(this.element), this.$element = this.element === e ? t("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== n ? t(this.options.viewportElement) : this.$scrollElement[0] === e || "scroll" === this.options.scrollProperty ? this.$scrollElement : this.$scrollElement.parent()
        },
        _defineGetters: function() {
            var t = this,
                e = a[t.options.scrollProperty];
            this._getScrollLeft = function() {
                return e.getLeft(t.$scrollElement)
            }, this._getScrollTop = function() {
                return e.getTop(t.$scrollElement)
            }
        },
        _defineSetters: function() {
            var e = this,
                i = a[e.options.scrollProperty],
                n = l[e.options.positionProperty],
                s = i.setLeft,
                o = i.setTop;
            this._setScrollLeft = "function" == typeof s ? function(t) {
                s(e.$scrollElement, t)
            } : t.noop, this._setScrollTop = "function" == typeof o ? function(t) {
                o(e.$scrollElement, t)
            } : t.noop, this._setPosition = n.setPosition || function(t, i, s, o, r) {
                e.options.horizontalScrolling && n.setLeft(t, i, s), e.options.verticalScrolling && n.setTop(t, o, r)
            }
        },
        _handleWindowLoadAndResize: function() {
            var i = this,
                n = t(e);
            i.options.responsive && n.bind("load." + this.name, function() {
                i.refresh()
            }), n.bind("resize." + this.name, function() {
                i._detectViewport(), i.options.responsive && i.refresh()
            })
        },
        refresh: function(i) {
            var n = this,
                s = n._getScrollLeft(),
                o = n._getScrollTop();
            (!i || !i.firstLoad) && this._reset(), this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), i && i.firstLoad && /WebKit/.test(navigator.userAgent) && t(e).load(function() {
                var t = n._getScrollLeft(),
                    e = n._getScrollTop();
                n._setScrollLeft(t + 1), n._setScrollTop(e + 1), n._setScrollLeft(t), n._setScrollTop(e)
            }), this._setScrollLeft(s), this._setScrollTop(o)
        },
        _detectViewport: function() {
            var t = this.$viewportElement.offset(),
                e = null !== t && t !== n;
            this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.viewportOffsetTop = e ? t.top : 0, this.viewportOffsetLeft = e ? t.left : 0
        },
        _findParticles: function() {
            {
                var e = this;
                this._getScrollLeft(), this._getScrollTop()
            }
            if (this.particles !== n)
                for (var i = this.particles.length - 1; i >= 0; i--) this.particles[i].$element.data("stellar-elementIsActive", n);
            this.particles = [], this.options.parallaxElements && this.$element.find("[data-stellar-ratio]").each(function() {
                var i, s, o, r, a, l, c, u, h, d = t(this),
                    p = 0,
                    f = 0,
                    m = 0,
                    g = 0;
                if (d.data("stellar-elementIsActive")) {
                    if (d.data("stellar-elementIsActive") !== this) return
                } else d.data("stellar-elementIsActive", this);
                e.options.showElement(d), d.data("stellar-startingLeft") ? (d.css("left", d.data("stellar-startingLeft")), d.css("top", d.data("stellar-startingTop"))) : (d.data("stellar-startingLeft", d.css("left")), d.data("stellar-startingTop", d.css("top"))), o = d.position().left, r = d.position().top, a = "auto" === d.css("margin-left") ? 0 : parseInt(d.css("margin-left"), 10), l = "auto" === d.css("margin-top") ? 0 : parseInt(d.css("margin-top"), 10), u = d.offset().left - a, h = d.offset().top - l, d.parents().each(function() {
                    var e = t(this);
                    return e.data("stellar-offset-parent") === !0 ? (p = m, f = g, c = e, !1) : (m += e.position().left, void(g += e.position().top))
                }), i = d.data("stellar-horizontal-offset") !== n ? d.data("stellar-horizontal-offset") : c !== n && c.data("stellar-horizontal-offset") !== n ? c.data("stellar-horizontal-offset") : e.horizontalOffset, s = d.data("stellar-vertical-offset") !== n ? d.data("stellar-vertical-offset") : c !== n && c.data("stellar-vertical-offset") !== n ? c.data("stellar-vertical-offset") : e.verticalOffset, e.particles.push({
                    $element: d,
                    $offsetParent: c,
                    isFixed: "fixed" === d.css("position"),
                    horizontalOffset: i,
                    verticalOffset: s,
                    startingPositionLeft: o,
                    startingPositionTop: r,
                    startingOffsetLeft: u,
                    startingOffsetTop: h,
                    parentOffsetLeft: p,
                    parentOffsetTop: f,
                    stellarRatio: d.data("stellar-ratio") !== n ? d.data("stellar-ratio") : 1,
                    width: d.outerWidth(!0),
                    height: d.outerHeight(!0),
                    isHidden: !1
                })
            })
        },
        _findBackgrounds: function() {
            var e, i = this,
                s = this._getScrollLeft(),
                o = this._getScrollTop();
            this.backgrounds = [], this.options.parallaxBackgrounds && (e = this.$element.find("[data-stellar-background-ratio]"), this.$element.data("stellar-background-ratio") && (e = e.add(this.$element)), e.each(function() {
                var e, r, a, l, c, u, h, f = t(this),
                    m = p(f),
                    g = 0,
                    v = 0,
                    y = 0,
                    b = 0;
                if (f.data("stellar-backgroundIsActive")) {
                    if (f.data("stellar-backgroundIsActive") !== this) return
                } else f.data("stellar-backgroundIsActive", this);
                f.data("stellar-backgroundStartingLeft") ? d(f, f.data("stellar-backgroundStartingLeft"), f.data("stellar-backgroundStartingTop")) : (f.data("stellar-backgroundStartingLeft", m[0]), f.data("stellar-backgroundStartingTop", m[1])), a = "auto" === f.css("margin-left") ? 0 : parseInt(f.css("margin-left"), 10), l = "auto" === f.css("margin-top") ? 0 : parseInt(f.css("margin-top"), 10), c = f.offset().left - a - s, u = f.offset().top - l - o, f.parents().each(function() {
                    var e = t(this);
                    return e.data("stellar-offset-parent") === !0 ? (g = y, v = b, h = e, !1) : (y += e.position().left, void(b += e.position().top))
                }), e = f.data("stellar-horizontal-offset") !== n ? f.data("stellar-horizontal-offset") : h !== n && h.data("stellar-horizontal-offset") !== n ? h.data("stellar-horizontal-offset") : i.horizontalOffset, r = f.data("stellar-vertical-offset") !== n ? f.data("stellar-vertical-offset") : h !== n && h.data("stellar-vertical-offset") !== n ? h.data("stellar-vertical-offset") : i.verticalOffset, i.backgrounds.push({
                    $element: f,
                    $offsetParent: h,
                    isFixed: "fixed" === f.css("background-attachment"),
                    horizontalOffset: e,
                    verticalOffset: r,
                    startingValueLeft: m[0],
                    startingValueTop: m[1],
                    startingBackgroundPositionLeft: isNaN(parseInt(m[0], 10)) ? 0 : parseInt(m[0], 10),
                    startingBackgroundPositionTop: isNaN(parseInt(m[1], 10)) ? 0 : parseInt(m[1], 10),
                    startingPositionLeft: f.position().left,
                    startingPositionTop: f.position().top,
                    startingOffsetLeft: c,
                    startingOffsetTop: u,
                    parentOffsetLeft: g,
                    parentOffsetTop: v,
                    stellarRatio: f.data("stellar-background-ratio") === n ? 1 : f.data("stellar-background-ratio")
                })
            }))
        },
        _reset: function() {
            var t, e, i, n, s;
            for (s = this.particles.length - 1; s >= 0; s--) t = this.particles[s], e = t.$element.data("stellar-startingLeft"), i = t.$element.data("stellar-startingTop"), this._setPosition(t.$element, e, e, i, i), this.options.showElement(t.$element), t.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
            for (s = this.backgrounds.length - 1; s >= 0; s--) n = this.backgrounds[s], n.$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null), d(n.$element, n.startingValueLeft, n.startingValueTop)
        },
        destroy: function() {
            this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), this._animationLoop = t.noop, t(e).unbind("load." + this.name).unbind("resize." + this.name)
        },
        _setOffsets: function() {
            var i = this,
                n = t(e);
            n.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), "function" == typeof this.options.horizontalOffset ? (this.horizontalOffset = this.options.horizontalOffset(), n.bind("resize.horizontal-" + this.name, function() {
                i.horizontalOffset = i.options.horizontalOffset()
            })) : this.horizontalOffset = this.options.horizontalOffset, "function" == typeof this.options.verticalOffset ? (this.verticalOffset = this.options.verticalOffset(), n.bind("resize.vertical-" + this.name, function() {
                i.verticalOffset = i.options.verticalOffset()
            })) : this.verticalOffset = this.options.verticalOffset
        },
        _repositionElements: function() {
            var t, e, i, n, s, o, r, a, l, c, u = this._getScrollLeft(),
                h = this._getScrollTop(),
                p = !0,
                f = !0;
            if (this.currentScrollLeft !== u || this.currentScrollTop !== h || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
                for (this.currentScrollLeft = u, this.currentScrollTop = h, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, c = this.particles.length - 1; c >= 0; c--) t = this.particles[c], e = t.isFixed ? 1 : 0, this.options.horizontalScrolling ? (o = (u + t.horizontalOffset + this.viewportOffsetLeft + t.startingPositionLeft - t.startingOffsetLeft + t.parentOffsetLeft) * -(t.stellarRatio + e - 1) + t.startingPositionLeft, a = o - t.startingPositionLeft + t.startingOffsetLeft) : (o = t.startingPositionLeft, a = t.startingOffsetLeft), this.options.verticalScrolling ? (r = (h + t.verticalOffset + this.viewportOffsetTop + t.startingPositionTop - t.startingOffsetTop + t.parentOffsetTop) * -(t.stellarRatio + e - 1) + t.startingPositionTop, l = r - t.startingPositionTop + t.startingOffsetTop) : (r = t.startingPositionTop, l = t.startingOffsetTop), this.options.hideDistantElements && (f = !this.options.horizontalScrolling || a + t.width > (t.isFixed ? 0 : u) && a < (t.isFixed ? 0 : u) + this.viewportWidth + this.viewportOffsetLeft, p = !this.options.verticalScrolling || l + t.height > (t.isFixed ? 0 : h) && l < (t.isFixed ? 0 : h) + this.viewportHeight + this.viewportOffsetTop), f && p ? (t.isHidden && (this.options.showElement(t.$element), t.isHidden = !1), this._setPosition(t.$element, o, t.startingPositionLeft, r, t.startingPositionTop)) : t.isHidden || (this.options.hideElement(t.$element), t.isHidden = !0);
                for (c = this.backgrounds.length - 1; c >= 0; c--) i = this.backgrounds[c], e = i.isFixed ? 0 : 1, n = this.options.horizontalScrolling ? (u + i.horizontalOffset - this.viewportOffsetLeft - i.startingOffsetLeft + i.parentOffsetLeft - i.startingBackgroundPositionLeft) * (e - i.stellarRatio) + "px" : i.startingValueLeft, s = this.options.verticalScrolling ? (h + i.verticalOffset - this.viewportOffsetTop - i.startingOffsetTop + i.parentOffsetTop - i.startingBackgroundPositionTop) * (e - i.stellarRatio) + "px" : i.startingValueTop, d(i.$element, n, s)
            }
        },
        _handleScrollEvent: function() {
            var t = this,
                e = !1,
                i = function() {
                    t._repositionElements(), e = !1
                },
                n = function() {
                    e || (f(i), e = !0)
                };
            this.$scrollElement.bind("scroll." + this.name, n), n()
        },
        _startAnimationLoop: function() {
            var t = this;
            this._animationLoop = function() {
                f(t._animationLoop), t._repositionElements()
            }, this._animationLoop()
        }
    }, t.fn[o] = function(e) {
        var i = arguments;
        return e === n || "object" == typeof e ? this.each(function() {
            t.data(this, "plugin_" + o) || t.data(this, "plugin_" + o, new s(this, e))
        }) : "string" == typeof e && "_" !== e[0] && "init" !== e ? this.each(function() {
            var n = t.data(this, "plugin_" + o);
            n instanceof s && "function" == typeof n[e] && n[e].apply(n, Array.prototype.slice.call(i, 1)), "destroy" === e && t.data(this, "plugin_" + o, null)
        }) : void 0
    }, t[o] = function() {
        var i = t(e);
        return i.stellar.apply(i, Array.prototype.slice.call(arguments, 0))
    }, t[o].scrollProperty = a, t[o].positionProperty = l, e.Stellar = s
}(jQuery, this, document),
function() {
    var t = !1;
    window.JQClass = function() {}, JQClass.classes = {}, JQClass.extend = function e(i) {
        function n() {
            !t && this._init && this._init.apply(this, arguments)
        }
        var s = this.prototype;
        t = !0;
        var o = new this;
        t = !1;
        for (var r in i) o[r] = "function" == typeof i[r] && "function" == typeof s[r] ? function(t, e) {
            return function() {
                var i = this._super;
                this._super = function(e) {
                    return s[t].apply(this, e)
                };
                var n = e.apply(this, arguments);
                return this._super = i, n
            }
        }(r, i[r]) : i[r];
        return n.prototype = o, n.prototype.constructor = n, n.extend = e, n
    }
}(),
function($) {
    function camelCase(t) {
        return t.replace(/-([a-z])/g, function(t, e) {
            return e.toUpperCase()
        })
    }
    JQClass.classes.JQPlugin = JQClass.extend({
        name: "plugin",
        defaultOptions: {},
        regionalOptions: {},
        _getters: [],
        _getMarker: function() {
            return "is-" + this.name
        },
        _init: function() {
            $.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {});
            var t = camelCase(this.name);
            $[t] = this, $.fn[t] = function(e) {
                var i = Array.prototype.slice.call(arguments, 1);
                return $[t]._isNotChained(e, i) ? $[t][e].apply($[t], [this[0]].concat(i)) : this.each(function() {
                    if ("string" == typeof e) {
                        if ("_" === e[0] || !$[t][e]) throw "Unknown method: " + e;
                        $[t][e].apply($[t], [this].concat(i))
                    } else $[t]._attach(this, e)
                })
            }
        },
        setDefaults: function(t) {
            $.extend(this.defaultOptions, t || {})
        },
        _isNotChained: function(t, e) {
            return "option" === t && (0 === e.length || 1 === e.length && "string" == typeof e[0]) ? !0 : $.inArray(t, this._getters) > -1
        },
        _attach: function(t, e) {
            if (t = $(t), !t.hasClass(this._getMarker())) {
                t.addClass(this._getMarker()), e = $.extend({}, this.defaultOptions, this._getMetadata(t), e || {});
                var i = $.extend({
                    name: this.name,
                    elem: t,
                    options: e
                }, this._instSettings(t, e));
                t.data(this.name, i), this._postAttach(t, i), this.option(t, e)
            }
        },
        _instSettings: function() {
            return {}
        },
        _postAttach: function() {},
        _getMetadata: function(d) {
            try {
                var f = d.data(this.name.toLowerCase()) || "";
                f = f.replace(/'/g, '"'), f = f.replace(/([a-zA-Z0-9]+):/g, function(t, e, i) {
                    var n = f.substring(0, i).match(/"/g);
                    return n && n.length % 2 !== 0 ? e + ":" : '"' + e + '":'
                }), f = $.parseJSON("{" + f + "}");
                for (var g in f) {
                    var h = f[g];
                    "string" == typeof h && h.match(/^new Date\((.*)\)$/) && (f[g] = eval(h))
                }
                return f
            } catch (e) {
                return {}
            }
        },
        _getInst: function(t) {
            return $(t).data(this.name) || {}
        },
        option: function(t, e, i) {
            t = $(t);
            var n = t.data(this.name);
            if (!e || "string" == typeof e && null == i) {
                var s = (n || {}).options;
                return s && e ? s[e] : s
            }
            if (t.hasClass(this._getMarker())) {
                var s = e || {};
                "string" == typeof e && (s = {}, s[e] = i), this._optionsChanged(t, n, s), $.extend(n.options, s)
            }
        },
        _optionsChanged: function() {},
        destroy: function(t) {
            t = $(t), t.hasClass(this._getMarker()) && (this._preDestroy(t, this._getInst(t)), t.removeData(this.name).removeClass(this._getMarker()))
        },
        _preDestroy: function() {}
    }), $.JQPlugin = {
        createPlugin: function(t, e) {
            "object" == typeof t && (e = t, t = "JQPlugin"), t = camelCase(t);
            var i = camelCase(e.name);
            JQClass.classes[i] = JQClass.classes[t].extend(e), new JQClass.classes[i]
        }
    }
}(jQuery),
function(t) {
    var e = "countdown",
        i = 0,
        n = 1,
        s = 2,
        o = 3,
        r = 4,
        a = 5,
        l = 6;
    t.JQPlugin.createPlugin({
        name: e,
        defaultOptions: {
            until: null,
            since: null,
            timezone: null,
            serverSync: null,
            format: "dHMS",
            layout: "",
            compact: !1,
            padZeroes: !1,
            significant: 0,
            description: "",
            expiryUrl: "",
            expiryText: "",
            alwaysExpire: !1,
            onExpiry: null,
            onTick: null,
            tickInterval: 1
        },
        regionalOptions: {
            "": {
                labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"],
                labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
                compactLabels: ["y", "m", "w", "d"],
                whichLabels: null,
                digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                timeSeparator: ":",
                isRTL: !1
            }
        },
        _getters: ["getTimes"],
        _rtlClass: e + "-rtl",
        _sectionClass: e + "-section",
        _amountClass: e + "-amount",
        _periodClass: e + "-period",
        _rowClass: e + "-row",
        _holdingClass: e + "-holding",
        _showClass: e + "-show",
        _descrClass: e + "-descr",
        _timerElems: [],
        _init: function() {
            function e(t) {
                var a = 1e12 > t ? s ? performance.now() + performance.timing.navigationStart : n() : t || n();
                a - r >= 1e3 && (i._updateElems(), r = a), o(e)
            }
            var i = this;
            this._super(), this._serverSyncs = [];
            var n = "function" == typeof Date.now ? Date.now : function() {
                    return (new Date).getTime()
                },
                s = window.performance && "function" == typeof window.performance.now,
                o = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null,
                r = 0;
            !o || t.noRequestAnimationFrame ? (t.noRequestAnimationFrame = null, setInterval(function() {
                i._updateElems()
            }, 980)) : (r = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || n(), o(e))
        },
        UTCDate: function(t, e, i, n, s, o, r, a) {
            "object" == typeof e && e.constructor == Date && (a = e.getMilliseconds(), r = e.getSeconds(), o = e.getMinutes(), s = e.getHours(), n = e.getDate(), i = e.getMonth(), e = e.getFullYear());
            var l = new Date;
            return l.setUTCFullYear(e), l.setUTCDate(1), l.setUTCMonth(i || 0), l.setUTCDate(n || 1), l.setUTCHours(s || 0), l.setUTCMinutes((o || 0) - (Math.abs(t) < 30 ? 60 * t : t)), l.setUTCSeconds(r || 0), l.setUTCMilliseconds(a || 0), l
        },
        periodsToSeconds: function(t) {
            return 31557600 * t[0] + 2629800 * t[1] + 604800 * t[2] + 86400 * t[3] + 3600 * t[4] + 60 * t[5] + t[6]
        },
        _instSettings: function() {
            return {
                _periods: [0, 0, 0, 0, 0, 0, 0]
            }
        },
        _addElem: function(t) {
            this._hasElem(t) || this._timerElems.push(t)
        },
        _hasElem: function(e) {
            return t.inArray(e, this._timerElems) > -1
        },
        _removeElem: function(e) {
            this._timerElems = t.map(this._timerElems, function(t) {
                return t == e ? null : t
            })
        },
        _updateElems: function() {
            for (var t = this._timerElems.length - 1; t >= 0; t--) this._updateCountdown(this._timerElems[t])
        },
        _optionsChanged: function(e, i, n) {
            n.layout && (n.layout = n.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), this._resetExtraLabels(i.options, n);
            var s = i.options.timezone != n.timezone;
            t.extend(i.options, n), this._adjustSettings(e, i, null != n.until || null != n.since || s);
            var o = new Date;
            (i._since && i._since < o || i._until && i._until > o) && this._addElem(e[0]), this._updateCountdown(e, i)
        },
        _updateCountdown: function(e, i) {
            if (e = e.jquery ? e : t(e), i = i || e.data(this.name)) {
                if (e.html(this._generateHTML(i)).toggleClass(this._rtlClass, i.options.isRTL), t.isFunction(i.options.onTick)) {
                    var n = "lap" != i._hold ? i._periods : this._calculatePeriods(i, i._show, i.options.significant, new Date);
                    (1 == i.options.tickInterval || this.periodsToSeconds(n) % i.options.tickInterval == 0) && i.options.onTick.apply(e[0], [n])
                }
                var s = "pause" != i._hold && (i._since ? i._now.getTime() < i._since.getTime() : i._now.getTime() >= i._until.getTime());
                if (s && !i._expiring) {
                    if (i._expiring = !0, this._hasElem(e[0]) || i.options.alwaysExpire) {
                        if (this._removeElem(e[0]), t.isFunction(i.options.onExpiry) && i.options.onExpiry.apply(e[0], []), i.options.expiryText) {
                            var o = i.options.layout;
                            i.options.layout = i.options.expiryText, this._updateCountdown(e[0], i), i.options.layout = o
                        }
                        i.options.expiryUrl && (window.location = i.options.expiryUrl)
                    }
                    i._expiring = !1
                } else "pause" == i._hold && this._removeElem(e[0])
            }
        },
        _resetExtraLabels: function(t, e) {
            var i = !1;
            for (var n in e)
                if ("whichLabels" != n && n.match(/[Ll]abels/)) {
                    i = !0;
                    break
                }
            if (i)
                for (var n in t) n.match(/[Ll]abels[02-9]|compactLabels1/) && (t[n] = null)
        },
        _adjustSettings: function(e, i, n) {
            for (var s, o = 0, r = null, a = 0; a < this._serverSyncs.length; a++)
                if (this._serverSyncs[a][0] == i.options.serverSync) {
                    r = this._serverSyncs[a][1];
                    break
                }
            if (null != r) o = i.options.serverSync ? r : 0, s = new Date;
            else {
                var l = t.isFunction(i.options.serverSync) ? i.options.serverSync.apply(e[0], []) : null;
                s = new Date, o = l ? s.getTime() - l.getTime() : 0, this._serverSyncs.push([i.options.serverSync, o])
            }
            var c = i.options.timezone;
            c = null == c ? -s.getTimezoneOffset() : c, (n || !n && null == i._until && null == i._since) && (i._since = i.options.since, null != i._since && (i._since = this.UTCDate(c, this._determineTime(i._since, null)), i._since && o && i._since.setMilliseconds(i._since.getMilliseconds() + o)), i._until = this.UTCDate(c, this._determineTime(i.options.until, s)), o && i._until.setMilliseconds(i._until.getMilliseconds() + o)), i._show = this._determineShow(i)
        },
        _preDestroy: function(t) {
            this._removeElem(t[0]), t.empty()
        },
        pause: function(t) {
            this._hold(t, "pause")
        },
        lap: function(t) {
            this._hold(t, "lap")
        },
        resume: function(t) {
            this._hold(t, null)
        },
        toggle: function(e) {
            var i = t.data(e, this.name) || {};
            this[i._hold ? "resume" : "pause"](e)
        },
        toggleLap: function(e) {
            var i = t.data(e, this.name) || {};
            this[i._hold ? "resume" : "lap"](e)
        },
        _hold: function(e, i) {
            var n = t.data(e, this.name);
            if (n) {
                if ("pause" == n._hold && !i) {
                    n._periods = n._savePeriods;
                    var s = n._since ? "-" : "+";
                    n[n._since ? "_since" : "_until"] = this._determineTime(s + n._periods[0] + "y" + s + n._periods[1] + "o" + s + n._periods[2] + "w" + s + n._periods[3] + "d" + s + n._periods[4] + "h" + s + n._periods[5] + "m" + s + n._periods[6] + "s"), this._addElem(e)
                }
                n._hold = i, n._savePeriods = "pause" == i ? n._periods : null, t.data(e, this.name, n), this._updateCountdown(e, n)
            }
        },
        getTimes: function(e) {
            var i = t.data(e, this.name);
            return i ? "pause" == i._hold ? i._savePeriods : i._hold ? this._calculatePeriods(i, i._show, i.options.significant, new Date) : i._periods : null
        },
        _determineTime: function(t, e) {
            var i = this,
                n = function(t) {
                    var e = new Date;
                    return e.setTime(e.getTime() + 1e3 * t), e
                },
                s = function(t) {
                    t = t.toLowerCase();
                    for (var e = new Date, n = e.getFullYear(), s = e.getMonth(), o = e.getDate(), r = e.getHours(), a = e.getMinutes(), l = e.getSeconds(), c = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, u = c.exec(t); u;) {
                        switch (u[2] || "s") {
                            case "s":
                                l += parseInt(u[1], 10);
                                break;
                            case "m":
                                a += parseInt(u[1], 10);
                                break;
                            case "h":
                                r += parseInt(u[1], 10);
                                break;
                            case "d":
                                o += parseInt(u[1], 10);
                                break;
                            case "w":
                                o += 7 * parseInt(u[1], 10);
                                break;
                            case "o":
                                s += parseInt(u[1], 10), o = Math.min(o, i._getDaysInMonth(n, s));
                                break;
                            case "y":
                                n += parseInt(u[1], 10), o = Math.min(o, i._getDaysInMonth(n, s))
                        }
                        u = c.exec(t)
                    }
                    return new Date(n, s, o, r, a, l, 0)
                },
                o = null == t ? e : "string" == typeof t ? s(t) : "number" == typeof t ? n(t) : t;
            return o && o.setMilliseconds(0), o
        },
        _getDaysInMonth: function(t, e) {
            return 32 - new Date(t, e, 32).getDate()
        },
        _normalLabels: function(t) {
            return t
        },
        _generateHTML: function(e) {
            var c = this;
            e._periods = e._hold ? e._periods : this._calculatePeriods(e, e._show, e.options.significant, new Date);
            for (var u = !1, h = 0, d = e.options.significant, p = t.extend({}, e._show), f = i; l >= f; f++) u |= "?" == e._show[f] && e._periods[f] > 0, p[f] = "?" != e._show[f] || u ? e._show[f] : null, h += p[f] ? 1 : 0, d -= e._periods[f] > 0 ? 1 : 0;
            for (var m = [!1, !1, !1, !1, !1, !1, !1], f = l; f >= i; f--) e._show[f] && (e._periods[f] ? m[f] = !0 : (m[f] = d > 0, d--));
            var g = e.options.compact ? e.options.compactLabels : e.options.labels,
                v = e.options.whichLabels || this._normalLabels,
                y = function(t) {
                    var i = e.options["compactLabels" + v(e._periods[t])];
                    return p[t] ? c._translateDigits(e, e._periods[t]) + (i ? i[t] : g[t]) + " " : ""
                },
                b = e.options.padZeroes ? 2 : 1,
                w = function(t) {
                    var i = e.options["labels" + v(e._periods[t])];
                    return !e.options.significant && p[t] || e.options.significant && m[t] ? '<span class="' + c._sectionClass + '"><span class="' + c._amountClass + '">' + c._minDigits(e, e._periods[t], b) + '</span><span class="' + c._periodClass + '">' + (i ? i[t] : g[t]) + "</span></span>" : ""
                };
            return e.options.layout ? this._buildLayout(e, p, e.options.layout, e.options.compact, e.options.significant, m) : (e.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (e._hold ? " " + this._holdingClass : "") + '">' + y(i) + y(n) + y(s) + y(o) + (p[r] ? this._minDigits(e, e._periods[r], 2) : "") + (p[a] ? (p[r] ? e.options.timeSeparator : "") + this._minDigits(e, e._periods[a], 2) : "") + (p[l] ? (p[r] || p[a] ? e.options.timeSeparator : "") + this._minDigits(e, e._periods[l], 2) : "") : '<span class="' + this._rowClass + " " + this._showClass + (e.options.significant || h) + (e._hold ? " " + this._holdingClass : "") + '">' + w(i) + w(n) + w(s) + w(o) + w(r) + w(a) + w(l)) + "</span>" + (e.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + e.options.description + "</span>" : "")
        },
        _buildLayout: function(e, c, u, h, d, p) {
            for (var f = e.options[h ? "compactLabels" : "labels"], m = e.options.whichLabels || this._normalLabels, g = function(t) {
                return (e.options[(h ? "compactLabels" : "labels") + m(e._periods[t])] || f)[t]
            }, v = function(t, i) {
                return e.options.digits[Math.floor(t / i) % 10]
            }, y = {
                desc: e.options.description,
                sep: e.options.timeSeparator,
                yl: g(i),
                yn: this._minDigits(e, e._periods[i], 1),
                ynn: this._minDigits(e, e._periods[i], 2),
                ynnn: this._minDigits(e, e._periods[i], 3),
                y1: v(e._periods[i], 1),
                y10: v(e._periods[i], 10),
                y100: v(e._periods[i], 100),
                y1000: v(e._periods[i], 1e3),
                ol: g(n),
                on: this._minDigits(e, e._periods[n], 1),
                onn: this._minDigits(e, e._periods[n], 2),
                onnn: this._minDigits(e, e._periods[n], 3),
                o1: v(e._periods[n], 1),
                o10: v(e._periods[n], 10),
                o100: v(e._periods[n], 100),
                o1000: v(e._periods[n], 1e3),
                wl: g(s),
                wn: this._minDigits(e, e._periods[s], 1),
                wnn: this._minDigits(e, e._periods[s], 2),
                wnnn: this._minDigits(e, e._periods[s], 3),
                w1: v(e._periods[s], 1),
                w10: v(e._periods[s], 10),
                w100: v(e._periods[s], 100),
                w1000: v(e._periods[s], 1e3),
                dl: g(o),
                dn: this._minDigits(e, e._periods[o], 1),
                dnn: this._minDigits(e, e._periods[o], 2),
                dnnn: this._minDigits(e, e._periods[o], 3),
                d1: v(e._periods[o], 1),
                d10: v(e._periods[o], 10),
                d100: v(e._periods[o], 100),
                d1000: v(e._periods[o], 1e3),
                hl: g(r),
                hn: this._minDigits(e, e._periods[r], 1),
                hnn: this._minDigits(e, e._periods[r], 2),
                hnnn: this._minDigits(e, e._periods[r], 3),
                h1: v(e._periods[r], 1),
                h10: v(e._periods[r], 10),
                h100: v(e._periods[r], 100),
                h1000: v(e._periods[r], 1e3),
                ml: g(a),
                mn: this._minDigits(e, e._periods[a], 1),
                mnn: this._minDigits(e, e._periods[a], 2),
                mnnn: this._minDigits(e, e._periods[a], 3),
                m1: v(e._periods[a], 1),
                m10: v(e._periods[a], 10),
                m100: v(e._periods[a], 100),
                m1000: v(e._periods[a], 1e3),
                sl: g(l),
                sn: this._minDigits(e, e._periods[l], 1),
                snn: this._minDigits(e, e._periods[l], 2),
                snnn: this._minDigits(e, e._periods[l], 3),
                s1: v(e._periods[l], 1),
                s10: v(e._periods[l], 10),
                s100: v(e._periods[l], 100),
                s1000: v(e._periods[l], 1e3)
            }, b = u, w = i; l >= w; w++) {
                var x = "yowdhms".charAt(w),
                    _ = new RegExp("\\{" + x + "<\\}([\\s\\S]*)\\{" + x + ">\\}", "g");
                b = b.replace(_, !d && c[w] || d && p[w] ? "$1" : "")
            }
            return t.each(y, function(t, e) {
                var i = new RegExp("\\{" + t + "\\}", "g");
                b = b.replace(i, e)
            }), b
        },
        _minDigits: function(t, e, i) {
            return e = "" + e, e.length >= i ? this._translateDigits(t, e) : (e = "0000000000" + e, this._translateDigits(t, e.substr(e.length - i)))
        },
        _translateDigits: function(t, e) {
            return ("" + e).replace(/[0-9]/g, function(e) {
                return t.options.digits[e]
            })
        },
        _determineShow: function(t) {
            var e = t.options.format,
                c = [];
            return c[i] = e.match("y") ? "?" : e.match("Y") ? "!" : null, c[n] = e.match("o") ? "?" : e.match("O") ? "!" : null, c[s] = e.match("w") ? "?" : e.match("W") ? "!" : null, c[o] = e.match("d") ? "?" : e.match("D") ? "!" : null, c[r] = e.match("h") ? "?" : e.match("H") ? "!" : null, c[a] = e.match("m") ? "?" : e.match("M") ? "!" : null, c[l] = e.match("s") ? "?" : e.match("S") ? "!" : null, c
        },
        _calculatePeriods: function(t, e, c, u) {
            t._now = u, t._now.setMilliseconds(0);
            var h = new Date(t._now.getTime());
            t._since ? u.getTime() < t._since.getTime() ? t._now = u = h : u = t._since : (h.setTime(t._until.getTime()), u.getTime() > t._until.getTime() && (t._now = u = h));
            var d = [0, 0, 0, 0, 0, 0, 0];
            if (e[i] || e[n]) {
                var p = this._getDaysInMonth(u.getFullYear(), u.getMonth()),
                    f = this._getDaysInMonth(h.getFullYear(), h.getMonth()),
                    m = h.getDate() == u.getDate() || h.getDate() >= Math.min(p, f) && u.getDate() >= Math.min(p, f),
                    g = function(t) {
                        return 60 * (60 * t.getHours() + t.getMinutes()) + t.getSeconds()
                    },
                    v = Math.max(0, 12 * (h.getFullYear() - u.getFullYear()) + h.getMonth() - u.getMonth() + (h.getDate() < u.getDate() && !m || m && g(h) < g(u) ? -1 : 0));
                d[i] = e[i] ? Math.floor(v / 12) : 0, d[n] = e[n] ? v - 12 * d[i] : 0, u = new Date(u.getTime());
                var y = u.getDate() == p,
                    b = this._getDaysInMonth(u.getFullYear() + d[i], u.getMonth() + d[n]);
                u.getDate() > b && u.setDate(b), u.setFullYear(u.getFullYear() + d[i]), u.setMonth(u.getMonth() + d[n]), y && u.setDate(b)
            }
            var w = Math.floor((h.getTime() - u.getTime()) / 1e3),
                x = function(t, i) {
                    d[t] = e[t] ? Math.floor(w / i) : 0, w -= d[t] * i
                };
            if (x(s, 604800), x(o, 86400), x(r, 3600), x(a, 60), x(l, 1), w > 0 && !t._since)
                for (var _ = [1, 12, 4.3482, 7, 24, 60, 60], C = l, S = 1, T = l; T >= i; T--) e[T] && (d[C] >= S && (d[C] = 0, w = 1), w > 0 && (d[T]++, w = 0, C = T, S = 1)), S *= _[T];
            if (c)
                for (var T = i; l >= T; T++) c && d[T] ? c-- : c || (d[T] = 0);
            return d
        }
    })
}(jQuery),
function(t) {
    function e(t, e) {
        return t.toFixed(e.decimals)
    }
    t.fn.countTo = function(e) {
        return e = e || {}, t(this).each(function() {
            function i() {
                u += r, c++, n(u), "function" == typeof s.onUpdate && s.onUpdate.call(a, u), c >= o && (l.removeData("countTo"), clearInterval(h.interval), u = s.to, "function" == typeof s.onComplete && s.onComplete.call(a, u))
            }

            function n(t) {
                var e = s.formatter.call(a, t, s);
                l.text(e)
            }
            var s = t.extend({}, t.fn.countTo.defaults, {
                    from: t(this).data("from"),
                    to: t(this).data("to"),
                    speed: t(this).data("speed"),
                    refreshInterval: t(this).data("refresh-interval"),
                    decimals: t(this).data("decimals")
                }, e),
                o = Math.ceil(s.speed / s.refreshInterval),
                r = (s.to - s.from) / o,
                a = this,
                l = t(this),
                c = 0,
                u = s.from,
                h = l.data("countTo") || {};
            l.data("countTo", h), h.interval && clearInterval(h.interval), h.interval = setInterval(i, s.refreshInterval), n(u)
        })
    }, t.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: e,
        onUpdate: null,
        onComplete: null
    }
}(jQuery), ! function(t, e, i, n) {
    function s(e, i) {
        this.settings = null, this.options = t.extend({}, s.Defaults, i), this.$element = t(e), this.drag = t.extend({}, d), this.state = t.extend({}, p), this.e = t.extend({}, f), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], t.each(s.Plugins, t.proxy(function(t, e) {
            this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(s.Pipe, t.proxy(function(e, i) {
            this._pipe.push({
                filter: i.filter,
                run: t.proxy(i.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }

    function o(t) {
        if (t.touches !== n) return {
            x: t.touches[0].pageX,
            y: t.touches[0].pageY
        };
        if (t.touches === n) {
            if (t.pageX !== n) return {
                x: t.pageX,
                y: t.pageY
            };
            if (t.pageX === n) return {
                x: t.clientX,
                y: t.clientY
            }
        }
    }

    function r(t) {
        var e, n, s = i.createElement("div"),
            o = t;
        for (e in o)
            if (n = o[e], "undefined" != typeof s.style[n]) return s = null, [n, e];
        return [!1]
    }

    function a() {
        return r(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function l() {
        return r(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function c() {
        return r(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function u() {
        return "ontouchstart" in e || !!navigator.msMaxTouchPoints
    }

    function h() {
        return e.navigator.msPointerEnabled
    }
    var d, p, f;
    d = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, p = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    }, f = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, s.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, s.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, s.Plugins = {}, s.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t = this._clones,
                e = this.$stage.children(".cloned");
            (e.length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t, e, i = this._clones,
                n = this._items,
                s = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
            for (t = 0, e = Math.abs(s / 2); e > t; t++) s > 0 ? (this.$stage.children().eq(n.length + i.length - 1).remove(), i.pop(), this.$stage.children().eq(0).remove(), i.pop()) : (i.push(i.length / 2), this.$stage.append(n[i[i.length - 1]].clone().addClass("cloned")), i.push(n.length - 1 - (i.length - 1) / 2), this.$stage.prepend(n[i[i.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t, e, i, n = this.settings.rtl ? 1 : -1,
                s = (this.width() / this.settings.items).toFixed(3),
                o = 0;
            for (this._coordinates = [], e = 0, i = this._clones.length + this._items.length; i > e; e++) t = this._mergers[this.relative(e)], t = this.settings.mergeFit && Math.min(t, this.settings.items) || t, o += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : s * t) * n, this._coordinates.push(o)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var e, i, n = (this.width() / this.settings.items).toFixed(3),
                s = {
                    width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                    "padding-left": this.settings.stagePadding || "",
                    "padding-right": this.settings.stagePadding || ""
                };
            if (this.$stage.css(s), s = {
                width: this.settings.autoWidth ? "auto" : n - this.settings.margin
            }, s[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && t.grep(this._mergers, function(t) {
                return t > 1
            }).length > 0)
                for (e = 0, i = this._coordinates.length; i > e; e++) s.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin, this.$stage.children().eq(e).css(s);
            else this.$stage.children().css(s)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current && this.reset(this.$stage.children().index(t.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var t, e, i, n, s = this.settings.rtl ? 1 : -1,
                o = 2 * this.settings.stagePadding,
                r = this.coordinates(this.current()) + o,
                a = r + this.width() * s,
                l = [];
            for (i = 0, n = this._coordinates.length; n > i; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * s, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && l.push(i);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], s.prototype.initialize = function() {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var e, i, s;
            if (e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, s = this.$element.children(i).width(), e.length && 0 >= s) return this.preloadAutoWidthImages(e), !1
        }
        this.$element.addClass("owl-loading"), this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, s.prototype.setup = function() {
        var e = this.viewport(),
            i = this.options.responsive,
            n = -1,
            s = null;
        i ? (t.each(i, function(t) {
            e >= t && t > n && (n = Number(t))
        }), s = t.extend({}, this.options, i[n]), delete s.responsive, s.responsiveClass && this.$element.attr("class", function(t, e) {
            return e.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + n)) : s = t.extend({}, this.options), (null === this.settings || this._breakpoint !== n) && (this.trigger("change", {
            property: {
                name: "settings",
                value: s
            }
        }), this._breakpoint = n, this.settings = s, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, s.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, s.prototype.prepare = function(e) {
        var i = this.trigger("prepare", {
            content: e
        });
        return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)), this.trigger("prepared", {
            content: i.data
        }), i.data
    }, s.prototype.update = function() {
        for (var e = 0, i = this._pipe.length, n = t.proxy(function(t) {
            return this[t]
        }, this._invalidated), s = {}; i > e;)(this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(s), e++;
        this._invalidated = {}
    }, s.prototype.width = function(t) {
        switch (t = t || s.Width.Default) {
            case s.Width.Inner:
            case s.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, s.prototype.refresh = function() {
        return 0 === this._items.length ? !1 : ((new Date).getTime(), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = e.orientation, this.watchVisibility(), this.trigger("refreshed"), void 0)
    }, s.prototype.eventsCall = function() {
        this.e._onDragStart = t.proxy(function(t) {
            this.onDragStart(t)
        }, this), this.e._onDragMove = t.proxy(function(t) {
            this.onDragMove(t)
        }, this), this.e._onDragEnd = t.proxy(function(t) {
            this.onDragEnd(t)
        }, this), this.e._onResize = t.proxy(function(t) {
            this.onResize(t)
        }, this), this.e._transitionEnd = t.proxy(function(t) {
            this.transitionEnd(t)
        }, this), this.e._preventClick = t.proxy(function(t) {
            this.preventClick(t)
        }, this)
    }, s.prototype.onThrottledResize = function() {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, s.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
    }, s.prototype.eventsRouter = function(t) {
        var e = t.type;
        "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
    }, s.prototype.internalEvents = function() {
        var i = (u(), h());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function(t) {
            this.eventsRouter(t)
        }, this)), this.$stage.on("dragstart", function() {
            return !1
        }), this.$stage.get(0).onselectstart = function() {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function(t) {
            this.eventsRouter(t)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
    }, s.prototype.onDragStart = function(n) {
        var s, r, a, l;
        if (s = n.originalEvent || n || e.event, 3 === s.which || this.state.isTouch) return !1;
        if ("mousedown" === s.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, r = o(s).x, a = o(s).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) l = this.getTransformProperty(), this.drag.offsetX = l, this.animate(l), this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
        this.drag.startX = r - this.drag.offsetX, this.drag.startY = a - this.drag.offsetY, this.drag.start = r - this.drag.startX, this.drag.targetEl = s.target || s.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function(t) {
            this.eventsRouter(t)
        }, this))
    }, s.prototype.onDragMove = function(t) {
        var i, s, r, a, l, c;
        this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event, s = o(i).x, r = o(i).y, this.drag.currentX = s - this.drag.startX, this.drag.currentY = r - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (a = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), l = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), c = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, a + c), l + c)), (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== n ? i.preventDefault() : i.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, s.prototype.onDragEnd = function(e) {
        var n, s, o;
        if (this.state.isTouch) {
            if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), n = this.drag.endTime - this.drag.startTime, s = Math.abs(this.drag.distance), (s > 3 || n > 300) && this.removeClick(this.drag.targetEl), o = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(o), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(o) || this.transitionEnd(), this.drag.distance = 0, t(i).off(".owl.dragEvents")
        }
    }, s.prototype.removeClick = function(i) {
        this.drag.targetEl = i, t(i).on("click.preventClick", this.e._preventClick), e.setTimeout(function() {
            t(i).off("click.preventClick")
        }, 300)
    }, s.prototype.preventClick = function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), t(e.target).off("click.preventClick")
    }, s.prototype.getTransformProperty = function() {
        var t, i;
        return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), t = t.replace(/matrix(3d)?\(|\)/g, "").split(","), i = 16 === t.length, i !== !0 ? t[4] : t[12]
    }, s.prototype.closest = function(e) {
        var i = -1,
            n = 30,
            s = this.width(),
            o = this.coordinates();
        return this.settings.freeDrag || t.each(o, t.proxy(function(t, r) {
            return e > r - n && r + n > e ? i = t : this.op(e, "<", r) && this.op(e, ">", o[t + 1] || r - s) && (i = "left" === this.state.direction ? t + 1 : t), -1 === i
        }, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (i = e = this.maximum())), i
    }, s.prototype.animate = function(e) {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: e + "px"
        }) : this.$stage.animate({
            left: e
        }, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, s.prototype.current = function(t) {
        if (t === n) return this._current;
        if (0 === this._items.length) return n;
        if (t = this.normalize(t), this._current !== t) {
            var e = this.trigger("change", {
                property: {
                    name: "position",
                    value: t
                }
            });
            e.data !== n && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, s.prototype.invalidate = function(t) {
        this._invalidated[t] = !0
    }, s.prototype.reset = function(t) {
        t = this.normalize(t), t !== n && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, s.prototype.normalize = function(e, i) {
        var s = i ? this._items.length : this._items.length + this._clones.length;
        return !t.isNumeric(e) || 1 > s ? n : e = this._clones.length ? (e % s + s) % s : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
    }, s.prototype.relative = function(t) {
        return t = this.normalize(t), t -= this._clones.length / 2, this.normalize(t, !0)
    }, s.prototype.maximum = function(t) {
        var e, i, n, s = 0,
            o = this.settings;
        if (t) return this._items.length - 1;
        if (!o.loop && o.center) e = this._items.length - 1;
        else if (o.loop || o.center)
            if (o.loop || o.center) e = this._items.length + o.items;
            else {
                if (!o.autoWidth && !o.merge) throw "Can not detect maximum absolute position.";
                for (revert = o.rtl ? 1 : -1, i = this.$stage.width() - this.$element.width();
                    (n = this.coordinates(s)) && !(n * revert >= i);) e = ++s
            } else e = this._items.length - o.items;
        return e
    }, s.prototype.minimum = function(t) {
        return t ? 0 : this._clones.length / 2
    }, s.prototype.items = function(t) {
        return t === n ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, s.prototype.mergers = function(t) {
        return t === n ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, s.prototype.clones = function(e) {
        var i = this._clones.length / 2,
            s = i + this._items.length,
            o = function(t) {
                return t % 2 === 0 ? s + t / 2 : i - (t + 1) / 2
            };
        return e === n ? t.map(this._clones, function(t, e) {
            return o(e)
        }) : t.map(this._clones, function(t, i) {
            return t === e ? o(i) : null
        })
    }, s.prototype.speed = function(t) {
        return t !== n && (this._speed = t), this._speed
    }, s.prototype.coordinates = function(e) {
        var i = null;
        return e === n ? t.map(this._coordinates, t.proxy(function(t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (i = this._coordinates[e], i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0, i)
    }, s.prototype.duration = function(t, e, i) {
        return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, s.prototype.to = function(i, n) {
        if (this.settings.loop) {
            var s = i - this.relative(this.current()),
                o = this.current(),
                r = this.current(),
                a = this.current() + s,
                l = 0 > r - a ? !0 : !1,
                c = this._clones.length + this._items.length;
            a < this.settings.items && l === !1 ? (o = r + this._items.length, this.reset(o)) : a >= c - this.settings.items && l === !0 && (o = r - this._items.length, this.reset(o)), e.clearTimeout(this.e._goToLoop), this.e._goToLoop = e.setTimeout(t.proxy(function() {
                this.speed(this.duration(this.current(), o + s, n)), this.current(o + s), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), i, n)), this.current(i), this.update()
    }, s.prototype.next = function(t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, s.prototype.prev = function(t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, s.prototype.transitionEnd = function(t) {
        return t !== n && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
    }, s.prototype.viewport = function() {
        var n;
        if (this.options.responsiveBaseElement !== e) n = t(this.options.responsiveBaseElement).width();
        else if (e.innerWidth) n = e.innerWidth;
        else {
            if (!i.documentElement || !i.documentElement.clientWidth) throw "Can not detect viewport width.";
            n = i.documentElement.clientWidth
        }
        return n
    }, s.prototype.replace = function(e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
            return 1 === this.nodeType
        }).each(t.proxy(function(t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, s.prototype.add = function(t, e) {
        e = e === n ? this._items.length : this.normalize(e, !0), this.trigger("add", {
            content: t,
            position: e
        }), 0 === this._items.length || e === this._items.length ? (this.$stage.append(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: t,
            position: e
        })
    }, s.prototype.remove = function(t) {
        t = this.normalize(t, !0), t !== n && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, s.prototype.addTriggerableEvents = function() {
        var e = t.proxy(function(e, i) {
            return t.proxy(function(t) {
                t.relatedTarget !== this && (this.suppress([i]), e.apply(this, [].slice.call(arguments, 1)), this.release([i]))
            }, this)
        }, this);
        t.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, t.proxy(function(t, i) {
            this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
        }, this))
    }, s.prototype.watchVisibility = function() {
        function i(t) {
            return t.offsetWidth > 0 && t.offsetHeight > 0
        }

        function n() {
            i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), e.clearInterval(this.e._checkVisibile))
        }
        i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), e.clearInterval(this.e._checkVisibile), this.e._checkVisibile = e.setInterval(t.proxy(n, this), 500))
    }, s.prototype.preloadAutoWidthImages = function(e) {
        var i, n, s, o;
        i = 0, n = this, e.each(function(r, a) {
            s = t(a), o = new Image, o.onload = function() {
                i++, s.attr("src", o.src), s.css("opacity", 1), i >= e.length && (n.state.imagesLoaded = !0, n.initialize())
            }, o.src = s.attr("src") || s.attr("data-src") || s.attr("data-src-retina")
        })
    }, s.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && t(e).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var n in this._plugins) this._plugins[n].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), t(i).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, s.prototype.op = function(t, e, i) {
        var n = this.settings.rtl;
        switch (e) {
            case "<":
                return n ? t > i : i > t;
            case ">":
                return n ? i > t : t > i;
            case ">=":
                return n ? i >= t : t >= i;
            case "<=":
                return n ? t >= i : i >= t
        }
    }, s.prototype.on = function(t, e, i, n) {
        t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
    }, s.prototype.off = function(t, e, i, n) {
        t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
    }, s.prototype.trigger = function(e, i, n) {
        var s = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            o = t.camelCase(t.grep(["on", e, n], function(t) {
                return t
            }).join("-").toLowerCase()),
            r = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({
                relatedTarget: this
            }, s, i));
        return this._supress[e] || (t.each(this._plugins, function(t, e) {
            e.onTrigger && e.onTrigger(r)
        }), this.$element.trigger(r), this.settings && "function" == typeof this.settings[o] && this.settings[o].apply(this, r)), r
    }, s.prototype.suppress = function(e) {
        t.each(e, t.proxy(function(t, e) {
            this._supress[e] = !0
        }, this))
    }, s.prototype.release = function(e) {
        t.each(e, t.proxy(function(t, e) {
            delete this._supress[e]
        }, this))
    }, s.prototype.browserSupport = function() {
        if (this.support3d = c(), this.support3d) {
            this.transformVendor = l();
            var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = t[a()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = e.orientation
    }, t.fn.owlCarousel = function(e) {
        return this.each(function() {
            t(this).data("owlCarousel") || t(this).data("owlCarousel", new s(this, e))
        })
    }, t.fn.owlCarousel.Constructor = s
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
    var i = function(e) {
        this._core = e, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": t.proxy(function(e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                    for (var i = this._core.settings, n = i.center && Math.ceil(i.items / 2) || i.items, s = i.center && -1 * n || 0, o = (e.property && e.property.value || this._core.current()) + s, r = this._core.clones().length, a = t.proxy(function(t, e) {
                        this.load(e)
                    }, this); s++ < n;) this.load(r / 2 + this._core.relative(o)), r && t.each(this._core.clones(this._core.relative(o++)), a)
            }, this)
        }, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    i.Defaults = {
        lazyLoad: !1
    }, i.prototype.load = function(i) {
        var n = this._core.$stage.children().eq(i),
            s = n && n.find(".owl-lazy");
        !s || t.inArray(n.get(0), this._loaded) > -1 || (s.each(t.proxy(function(i, n) {
            var s, o = t(n),
                r = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
            this._core.trigger("load", {
                element: o,
                url: r
            }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function() {
                o.css("opacity", 1), this._core.trigger("loaded", {
                    element: o,
                    url: r
                }, "lazy")
            }, this)).attr("src", r) : (s = new Image, s.onload = t.proxy(function() {
                o.css({
                    "background-image": "url(" + r + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: o,
                    url: r
                }, "lazy")
            }, this), s.src = r)
        }, this)), this._loaded.push(n.get(0)))
    }, i.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document),
function(t) {
    var e = function(i) {
        this._core = i, this._handlers = {
            "initialized.owl.carousel": t.proxy(function() {
                this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this),
            "loaded.owl.lazy": t.proxy(function(t) {
                this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        }, this._core.options = t.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function() {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(t, e, i) {
    var n = function(e) {
        this._core = e, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": t.proxy(function(t) {
                this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": t.proxy(function() {
                this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                var i = t(e.content).find(".owl-video");
                i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
            this.play(t)
        }, this))
    };
    n.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, n.prototype.fetch = function(t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube",
            n = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
            s = t.attr("data-width") || this._core.settings.videoWidth,
            o = t.attr("data-height") || this._core.settings.videoHeight,
            r = t.attr("href");
        if (!r) throw new Error("Missing video URL.");
        if (n = r.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), n[3].indexOf("youtu") > -1) i = "youtube";
        else {
            if (!(n[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            i = "vimeo"
        }
        n = n[6], this._videos[r] = {
            type: i,
            id: n,
            width: s,
            height: o
        }, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
    }, n.prototype.thumbnail = function(e, i) {
        var n, s, o, r = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
            a = e.find("img"),
            l = "src",
            c = "",
            u = this._core.settings,
            h = function(t) {
                s = '<div class="owl-video-play-icon"></div>', n = u.lazyLoad ? '<div class="owl-video-tn ' + c + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(n), e.after(s)
            };
        return e.wrap('<div class="owl-video-wrapper"' + r + "></div>"), this._core.settings.lazyLoad && (l = "data-src", c = "owl-lazy"), a.length ? (h(a.attr(l)), a.remove(), !1) : void("youtube" === i.type ? (o = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", h(o)) : "vimeo" === i.type && t.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                o = t[0].thumbnail_large, h(o)
            }
        }))
    }, n.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, n.prototype.play = function(e) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var i, n, s = t(e.target || e.srcElement),
            o = s.closest("." + this._core.settings.itemClass),
            r = this._videos[o.attr("data-video")],
            a = r.width || "100%",
            l = r.height || this._core.$stage.height();
        "youtube" === r.type ? i = '<iframe width="' + a + '" height="' + l + '" src="http://www.youtube.com/embed/' + r.id + "?autoplay=1&v=" + r.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === r.type && (i = '<iframe src="http://player.vimeo.com/video/' + r.id + '?autoplay=1" width="' + a + '" height="' + l + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), o.addClass("owl-video-playing"), this._playing = o, n = t('<div style="height:' + l + "px; width:" + a + 'px" class="owl-video-frame">' + i + "</div>"), s.after(n)
    }, n.prototype.isInFullScreen = function() {
        var n = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return n && t(n).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), n && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== e.orientation ? (this._core.state.orientation = e.orientation, !1) : !0
    }, n.prototype.destroy = function() {
        var t, e;
        this._core.$element.off("click.owl.video");
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, n) {
    var s = function(e) {
        this.core = e, this.core.options = t.extend({}, s.Defaults, this.core.options), this.swapping = !0, this.previous = n, this.next = n, this.handlers = {
            "change.owl.carousel": t.proxy(function(t) {
                "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                this.swapping = "translated" == t.type
            }, this),
            "translate.owl.carousel": t.proxy(function() {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    s.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, s.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var e, i = t.proxy(this.clear, this),
                n = this.core.$stage.children().eq(this.previous),
                s = this.core.$stage.children().eq(this.next),
                o = this.core.settings.animateIn,
                r = this.core.settings.animateOut;
            this.core.current() !== this.previous && (r && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.css({
                left: e + "px"
            }).addClass("animated owl-animated-out").addClass(r).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)), o && s.addClass("animated owl-animated-in").addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
        }
    }, s.prototype.clear = function(e) {
        t(e.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, s.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Animate = s
}(window.Zepto || window.jQuery, window, document),
function(t, e, i) {
    var n = function(e) {
        this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": t.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": t.proxy(function(t, e, i) {
                this.play(e, i)
            }, this),
            "stop.owl.autoplay": t.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": t.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this),
            "mouseleave.owl.autoplay": t.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, n.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval), this.interval = e.setInterval(t.proxy(function() {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
    }, n.prototype.play = function() {
        return i.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }, n.prototype.stop = function() {
        e.clearInterval(this.interval)
    }, n.prototype.pause = function() {
        e.clearInterval(this.interval)
    }, n.prototype.destroy = function() {
        var t, i;
        e.clearInterval(this.interval);
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document),
function(t) {
    "use strict";
    var e = function(i) {
        this._core = i, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": t.proxy(function(e) {
                this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "add.owl.carousel": t.proxy(function(e) {
                this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "remove.owl.carousel prepared.owl.carousel": t.proxy(function(t) {
                this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this),
            "change.owl.carousel": t.proxy(function(t) {
                if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var e = this._core.current(),
                        i = this._core.maximum(),
                        n = this._core.minimum();
                    t.data = t.property.value > i ? e >= i ? n : i : t.property.value < n ? i : t.property.value
                }
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                "position" == t.property.name && this.draw()
            }, this),
            "refreshed.owl.carousel": t.proxy(function() {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
            }, this)
        }, this._core.options = t.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, e.prototype.initialize = function() {
        var e, i, n = this._core.settings;
        n.dotsData || (this._templates = [t("<div>").addClass(n.dotClass).append(t("<span>")).prop("outerHTML")]), n.navContainer && n.dotsContainer || (this._controls.$container = t("<div>").addClass(n.controlsClass).appendTo(this.$element)), this._controls.$indicators = n.dotsContainer ? t(n.dotsContainer) : t("<div>").hide().addClass(n.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", t.proxy(function(e) {
            var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
            e.preventDefault(), this.to(i, n.dotsSpeed)
        }, this)), e = n.navContainer ? t(n.navContainer) : t("<div>").addClass(n.navContainerClass).prependTo(this._controls.$container), this._controls.$next = t("<" + n.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(n.navClass[0]).html(n.navText[0]).hide().prependTo(e).on("click", t.proxy(function() {
            this.prev(n.navSpeed)
        }, this)), this._controls.$next.addClass(n.navClass[1]).html(n.navText[1]).hide().appendTo(e).on("click", t.proxy(function() {
            this.next(n.navSpeed)
        }, this));
        for (i in this._overrides) this._core[i] = t.proxy(this[i], this)
    }, e.prototype.destroy = function() {
        var t, e, i, n;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) this._controls[e].remove();
        for (n in this.overides) this._core[n] = this._overrides[n];
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, e.prototype.update = function() {
        var t, e, i, n = this._core.settings,
            s = this._core.clones().length / 2,
            o = s + this._core.items().length,
            r = n.center || n.autoWidth || n.dotData ? 1 : n.dotsEach || n.items;
        if ("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy)
            for (this._pages = [], t = s, e = 0, i = 0; o > t; t++)(e >= r || 0 === e) && (this._pages.push({
                start: t - s,
                end: t - s + r - 1
            }), e = 0, ++i), e += this._core.mergers(this._core.relative(t))
    }, e.prototype.draw = function() {
        var e, i, n = "",
            s = this._core.settings,
            o = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!s.nav || s.loop || s.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= o), this._controls.$next.toggleClass("disabled", o >= this._core.maximum())), this._controls.$previous.toggle(s.nav), this._controls.$next.toggle(s.nav), s.dots) {
            if (e = this._pages.length - this._controls.$indicators.children().length, s.dotData && 0 !== e) {
                for (i = 0; i < this._controls.$indicators.children().length; i++) n += this._templates[this._core.relative(i)];
                this._controls.$indicators.html(n)
            } else e > 0 ? (n = new Array(e + 1).join(this._templates[0]), this._controls.$indicators.append(n)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(s.dots)
    }, e.prototype.onTrigger = function(e) {
        var i = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
        }
    }, e.prototype.current = function() {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, function(t) {
            return t.start <= e && t.end >= e
        }).pop()
    }, e.prototype.getPosition = function(e) {
        var i, n, s = this._core.settings;
        return "page" == s.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += s.slideBy : i -= s.slideBy), i
    }, e.prototype.next = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }, e.prototype.prev = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }, e.prototype.to = function(e, i, n) {
        var s;
        n ? t.proxy(this._overrides.to, this._core)(e, i) : (s = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % s + s) % s].start, i))
    }, t.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
    "use strict";
    var i = function(n) {
        this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": t.proxy(function() {
                "URLHash" == this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[i] = e.content
            }, this)
        }, this._core.options = t.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function() {
            var t = e.location.hash.substring(1),
                i = this._core.$stage.children(),
                n = this._hashes[t] && i.index(this._hashes[t]) || 0;
            return t ? void this._core.to(n, !1, !0) : !1
        }, this))
    };
    i.Defaults = {
        URLhashListener: !1
    }, i.prototype.destroy = function() {
        var i, n;
        t(e).off("hashchange.owl.navigation");
        for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
        for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document), ! function(t) {
    "use strict";

    function e(e, i) {
        this.element = t(e), this.settings = t.extend({}, n, i), this._defaults = n, this._init()
    }
    var i = "Morphext",
        n = {
            animation: "bounceIn",
            separator: ",",
            speed: 2e3,
            complete: t.noop
        };
    e.prototype = {
        _init: function() {
            var e = this;
            this.phrases = [], t.each(this.element.text().split(this.settings.separator), function(t, i) {
                e.phrases.push(i.trim())
            }), this.index = -1, this.animate(), this.start()
        },
        animate: function() {
            this.index + 1 === this.phrases.length && (this.index = -1), ++this.index, this.element[0].innerHTML = '<span class="animated ' + this.settings.animation + '">' + this.phrases[this.index] + "</span>", t.isFunction(this.settings.complete) && this.settings.complete.call(this)
        },
        start: function() {
            var t = this;
            this._interval = setInterval(function() {
                t.animate()
            }, this.settings.speed)
        },
        stop: function() {
            this._interval = clearInterval(this._interval)
        }
    }, t.fn[i] = function(n) {
        return this.each(function() {
            t.data(this, "plugin_" + i) || t.data(this, "plugin_" + i, new e(this, n))
        })
    }
}(jQuery),
function(t) {
    function e() {}

    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function s(e, i) {
            t.fn[e] = function(s) {
                if ("string" == typeof s) {
                    for (var r = n.call(arguments, 1), a = 0, l = this.length; l > a; a++) {
                        var c = this[a],
                            u = t.data(c, e);
                        if (u)
                            if (t.isFunction(u[s]) && "_" !== s.charAt(0)) {
                                var h = u[s].apply(u, r);
                                if (void 0 !== h) return h
                            } else o("no such method '" + s + "' for " + e + " instance");
                        else o("cannot call methods on " + e + " prior to initialization; attempted to call '" + s + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var n = t.data(this, e);
                    n ? (n.option(s), n._init()) : (n = new i(this, s), t.data(this, e, n))
                })
            }
        }
        if (t) {
            var o = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            };
            return t.bridget = function(t, e) {
                i(e), s(t, e)
            }, t.bridget
        }
    }
    var n = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i("object" == typeof exports ? require("jquery") : t.jQuery)
}(window),
function(t) {
    function e(e) {
        var i = t.event;
        return i.target = i.target || i.srcElement || e, i
    }
    var i = document.documentElement,
        n = function() {};
    i.addEventListener ? n = function(t, e, i) {
        t.addEventListener(e, i, !1)
    } : i.attachEvent && (n = function(t, i, n) {
        t[i + n] = n.handleEvent ? function() {
            var i = e(t);
            n.handleEvent.call(n, i)
        } : function() {
            var i = e(t);
            n.call(t, i)
        }, t.attachEvent("on" + i, t[i + n])
    });
    var s = function() {};
    i.removeEventListener ? s = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    } : i.detachEvent && (s = function(t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (n) {
            t[e + i] = void 0
        }
    });
    var o = {
        bind: n,
        unbind: s
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", o) : "object" == typeof exports ? module.exports = o : t.eventie = o
}(this),
function(t) {
    function e(t) {
        "function" == typeof t && (e.isReady ? t() : r.push(t))
    }

    function i(t) {
        var i = "readystatechange" === t.type && "complete" !== o.readyState;
        e.isReady || i || n()
    }

    function n() {
        e.isReady = !0;
        for (var t = 0, i = r.length; i > t; t++) {
            var n = r[t];
            n()
        }
    }

    function s(s) {
        return "complete" === o.readyState ? n() : (s.bind(o, "DOMContentLoaded", i), s.bind(o, "readystatechange", i), s.bind(t, "load", i)), e
    }
    var o = t.document,
        r = [];
    e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], s) : "object" == typeof exports ? module.exports = s(require("eventie")) : t.docReady = s(t.eventie)
}(window),
function() {
    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function i(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var n = t.prototype,
        s = this,
        o = s.EventEmitter;
    n.getListeners = function(t) {
        var e, i, n = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
        } else e = n[t] || (n[t] = []);
        return e
    }, n.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i
    }, n.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, n.addListener = function(t, i) {
        var n, s = this.getListenersAsObject(t),
            o = "object" == typeof i;
        for (n in s) s.hasOwnProperty(n) && -1 === e(s[n], i) && s[n].push(o ? i : {
            listener: i,
            once: !1
        });
        return this
    }, n.on = i("addListener"), n.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, n.once = i("addOnceListener"), n.defineEvent = function(t) {
        return this.getListeners(t), this
    }, n.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this
    }, n.removeListener = function(t, i) {
        var n, s, o = this.getListenersAsObject(t);
        for (s in o) o.hasOwnProperty(s) && (n = e(o[s], i), -1 !== n && o[s].splice(n, 1));
        return this
    }, n.off = i("removeListener"), n.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, n.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, n.manipulateListeners = function(t, e, i) {
        var n, s, o = t ? this.removeListener : this.addListener,
            r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (n = i.length; n--;) o.call(this, e, i[n]);
        else
            for (n in e) e.hasOwnProperty(n) && (s = e[n]) && ("function" == typeof s ? o.call(this, n, s) : r.call(this, n, s));
        return this
    }, n.removeEvent = function(t) {
        var e, i = typeof t,
            n = this._getEvents();
        if ("string" === i) delete n[t];
        else if (t instanceof RegExp)
            for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else delete this._events;
        return this
    }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
        var i, n, s, o, r = this.getListenersAsObject(t);
        for (s in r)
            if (r.hasOwnProperty(s))
                for (n = r[s].length; n--;) i = r[s][n], i.once === !0 && this.removeListener(t, i.listener), o = i.listener.apply(this, e || []), o === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, n.trigger = i("emitEvent"), n.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, n.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, n._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, n._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return s.EventEmitter = o, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : s.EventEmitter = t
}.call(this),
function(t) {
    function e(t) {
        if (t) {
            if ("string" == typeof n[t]) return t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            for (var e, s = 0, o = i.length; o > s; s++)
                if (e = i[s] + t, "string" == typeof n[e]) return e
        }
    }
    var i = "Webkit Moz ms Ms O".split(" "),
        n = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
        return e
    }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
}(window),
function(t) {
    function e(t) {
        var e = parseFloat(t),
            i = -1 === t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function i() {}

    function n() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0, i = r.length; i > e; e++) {
            var n = r[e];
            t[n] = 0
        }
        return t
    }

    function s(i) {
        function s() {
            if (!d) {
                d = !0;
                var n = t.getComputedStyle;
                if (c = function() {
                    var t = n ? function(t) {
                        return n(t, null)
                    } : function(t) {
                        return t.currentStyle
                    };
                    return function(e) {
                        var i = t(e);
                        return i || o("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i
                    }
                }(), u = i("boxSizing")) {
                    var s = document.createElement("div");
                    s.style.width = "200px", s.style.padding = "1px 2px 3px 4px", s.style.borderStyle = "solid", s.style.borderWidth = "1px 2px 3px 4px", s.style[u] = "border-box";
                    var r = document.body || document.documentElement;
                    r.appendChild(s);
                    var a = c(s);
                    h = 200 === e(a.width), r.removeChild(s)
                }
            }
        }

        function a(t) {
            if (s(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                var i = c(t);
                if ("none" === i.display) return n();
                var o = {};
                o.width = t.offsetWidth, o.height = t.offsetHeight;
                for (var a = o.isBorderBox = !(!u || !i[u] || "border-box" !== i[u]), d = 0, p = r.length; p > d; d++) {
                    var f = r[d],
                        m = i[f];
                    m = l(t, m);
                    var g = parseFloat(m);
                    o[f] = isNaN(g) ? 0 : g
                }
                var v = o.paddingLeft + o.paddingRight,
                    y = o.paddingTop + o.paddingBottom,
                    b = o.marginLeft + o.marginRight,
                    w = o.marginTop + o.marginBottom,
                    x = o.borderLeftWidth + o.borderRightWidth,
                    _ = o.borderTopWidth + o.borderBottomWidth,
                    C = a && h,
                    S = e(i.width);
                S !== !1 && (o.width = S + (C ? 0 : v + x));
                var T = e(i.height);
                return T !== !1 && (o.height = T + (C ? 0 : y + _)), o.innerWidth = o.width - (v + x), o.innerHeight = o.height - (y + _), o.outerWidth = o.width + b, o.outerHeight = o.height + w, o
            }
        }

        function l(e, i) {
            if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
            var n = e.style,
                s = n.left,
                o = e.runtimeStyle,
                r = o && o.left;
            return r && (o.left = e.currentStyle.left), n.left = i, i = n.pixelLeft, n.left = s, r && (o.left = r), i
        }
        var c, u, h, d = !1;
        return a
    }
    var o = "undefined" == typeof console ? i : function(t) {
            console.error(t)
        },
        r = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], s) : "object" == typeof exports ? module.exports = s(require("desandro-get-style-property")) : t.getSize = s(t.getStyleProperty)
}(window),
function(t) {
    function e(t, e) {
        return t[r](e)
    }

    function i(t) {
        if (!t.parentNode) {
            var e = document.createDocumentFragment();
            e.appendChild(t)
        }
    }

    function n(t, e) {
        i(t);
        for (var n = t.parentNode.querySelectorAll(e), s = 0, o = n.length; o > s; s++)
            if (n[s] === t) return !0;
        return !1
    }

    function s(t, n) {
        return i(t), e(t, n)
    }
    var o, r = function() {
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0, n = e.length; n > i; i++) {
            var s = e[i],
                o = s + "MatchesSelector";
            if (t[o]) return o
        }
    }();
    if (r) {
        var a = document.createElement("div"),
            l = e(a, "div");
        o = l ? e : s
    } else o = n;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
        return o
    }) : "object" == typeof exports ? module.exports = o : window.matchesSelector = o
}(Element.prototype),
function(t) {
    function e(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function n(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }

    function s(t, s, o) {
        function a(t, e) {
            t && (this.element = t, this.layout = e, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }
        var l = o("transition"),
            c = o("transform"),
            u = l && c,
            h = !!o("perspective"),
            d = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[l],
            p = ["transform", "transition", "transitionDuration", "transitionProperty"],
            f = function() {
                for (var t = {}, e = 0, i = p.length; i > e; e++) {
                    var n = p[e],
                        s = o(n);
                    s && s !== n && (t[n] = s)
                }
                return t
            }();
        e(a.prototype, t.prototype), a.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, a.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.getSize = function() {
            this.size = s(this.element)
        }, a.prototype.css = function(t) {
            var e = this.element.style;
            for (var i in t) {
                var n = f[i] || i;
                e[n] = t[i]
            }
        }, a.prototype.getPosition = function() {
            var t = r(this.element),
                e = this.layout.options,
                i = e.isOriginLeft,
                n = e.isOriginTop,
                s = parseInt(t[i ? "left" : "right"], 10),
                o = parseInt(t[n ? "top" : "bottom"], 10);
            s = isNaN(s) ? 0 : s, o = isNaN(o) ? 0 : o;
            var a = this.layout.size;
            s -= i ? a.paddingLeft : a.paddingRight, o -= n ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = o
        }, a.prototype.layoutPosition = function() {
            var t = this.layout.size,
                e = this.layout.options,
                i = {};
            e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
        };
        var m = h ? function(t, e) {
            return "translate3d(" + t + "px, " + e + "px, 0)"
        } : function(t, e) {
            return "translate(" + t + "px, " + e + "px)"
        };
        a.prototype._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x,
                n = this.position.y,
                s = parseInt(t, 10),
                o = parseInt(e, 10),
                r = s === this.position.x && o === this.position.y;
            if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
            var a = t - i,
                l = e - n,
                c = {},
                u = this.layout.options;
            a = u.isOriginLeft ? a : -a, l = u.isOriginTop ? l : -l, c.transform = m(a, l), this.transition({
                to: c,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, a.prototype.goTo = function(t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, a.prototype.moveTo = u ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, a.prototype._nonTransition = function(t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
        }, a.prototype._transition = function(t) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                var n = this.element.offsetHeight;
                n = null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var g = c && n(c) + ",opacity";
        a.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: g,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(d, this, !1))
        }, a.prototype.transition = a.prototype[l ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t)
        }, a.prototype.onotransitionend = function(t) {
            this.ontransitionend(t)
        };
        var v = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        a.prototype.ontransitionend = function(t) {
            if (t.target === this.element) {
                var e = this._transn,
                    n = v[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                    var s = e.onEnd[n];
                    s.call(this), delete e.onEnd[n]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, a.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1
        }, a.prototype._removeStyles = function(t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e)
        };
        var y = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return a.prototype.removeTransitionStyles = function() {
            this.css(y)
        }, a.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
        }, a.prototype.remove = function() {
            if (!l || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var t = this;
            this.on("transitionEnd", function() {
                return t.removeElem(), !0
            }), this.hide()
        }, a.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var t = this.layout.options;
            this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0
            })
        }, a.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var t = this.layout.options;
            this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: {
                    opacity: function() {
                        this.isHidden && this.css({
                            display: "none"
                        })
                    }
                }
            })
        }, a.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, a
    }
    var o = t.getComputedStyle,
        r = o ? function(t) {
            return o(t, null)
        } : function(t) {
            return t.currentStyle
        };
    "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], s) : "object" == typeof exports ? module.exports = s(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (t.Outlayer = {}, t.Outlayer.Item = s(t.EventEmitter, t.getSize, t.getStyleProperty))
}(window),
function(t) {
    function e(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function i(t) {
        return "[object Array]" === h.call(t)
    }

    function n(t) {
        var e = [];
        if (i(t)) e = t;
        else if (t && "number" == typeof t.length)
            for (var n = 0, s = t.length; s > n; n++) e.push(t[n]);
        else e.push(t);
        return e
    }

    function s(t, e) {
        var i = p(e, t); - 1 !== i && e.splice(i, 1)
    }

    function o(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }

    function r(i, r, h, p, f, m) {
        function g(t, i) {
            if ("string" == typeof t && (t = a.querySelector(t)), !t || !d(t)) return void(l && l.error("Bad " + this.constructor.namespace + " element: " + t));
            this.element = t, this.options = e({}, this.constructor.defaults), this.option(i);
            var n = ++v;
            this.element.outlayerGUID = n, y[n] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var v = 0,
            y = {};
        return g.namespace = "outlayer", g.Item = m, g.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, e(g.prototype, h.prototype), g.prototype.option = function(t) {
            e(this.options, t)
        }, g.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, g.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, g.prototype._itemize = function(t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], s = 0, o = e.length; o > s; s++) {
                var r = e[s],
                    a = new i(r, this);
                n.push(a)
            }
            return n
        }, g.prototype._filterFindItemElements = function(t) {
            t = n(t);
            for (var e = this.options.itemSelector, i = [], s = 0, o = t.length; o > s; s++) {
                var r = t[s];
                if (d(r))
                    if (e) {
                        f(r, e) && i.push(r);
                        for (var a = r.querySelectorAll(e), l = 0, c = a.length; c > l; l++) i.push(a[l])
                    } else i.push(r)
            }
            return i
        }, g.prototype.getItemElements = function() {
            for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
            return t
        }, g.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function() {
            this.getSize()
        }, g.prototype.getSize = function() {
            this.size = p(this.element)
        }, g.prototype._getMeasurement = function(t, e) {
            var i, n = this.options[t];
            n ? ("string" == typeof n ? i = this.element.querySelector(n) : d(n) && (i = n), this[t] = i ? p(i)[e] : n) : this[t] = 0
        }, g.prototype.layoutItems = function(t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, g.prototype._getItemsForLayout = function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var s = t[i];
                s.isIgnored || e.push(s)
            }
            return e
        }, g.prototype._layoutItems = function(t, e) {
            function i() {
                n.emitEvent("layoutComplete", [n, t])
            }
            var n = this;
            if (!t || !t.length) return void i();
            this._itemsOn(t, "layout", i);
            for (var s = [], o = 0, r = t.length; r > o; o++) {
                var a = t[o],
                    l = this._getItemLayoutPosition(a);
                l.item = a, l.isInstant = e || a.isLayoutInstant, s.push(l)
            }
            this._processLayoutQueue(s)
        }, g.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, g.prototype._processLayoutQueue = function(t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                this._positionItem(n.item, n.x, n.y, n.isInstant)
            }
        }, g.prototype._positionItem = function(t, e, i, n) {
            n ? t.goTo(e, i) : t.moveTo(e, i)
        }, g.prototype._postLayout = function() {
            this.resizeContainer()
        }, g.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, g.prototype._getContainerSize = u, g.prototype._setContainerMeasure = function(t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, g.prototype._itemsOn = function(t, e, i) {
            function n() {
                return s++, s === o && i.call(r), !0
            }
            for (var s = 0, o = t.length, r = this, a = 0, l = t.length; l > a; a++) {
                var c = t[a];
                c.on(e, n)
            }
        }, g.prototype.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, g.prototype.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, g.prototype.stamp = function(t) {
            if (t = this._find(t)) {
                this.stamps = this.stamps.concat(t);
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    this.ignore(n)
                }
            }
        }, g.prototype.unstamp = function(t) {
            if (t = this._find(t))
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    s(n, this.stamps), this.unignore(n)
                }
        }, g.prototype._find = function(t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n(t)) : void 0
        }, g.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var t = 0, e = this.stamps.length; e > t; t++) {
                    var i = this.stamps[t];
                    this._manageStamp(i)
                }
            }
        }, g.prototype._getBoundingRect = function() {
            var t = this.element.getBoundingClientRect(),
                e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, g.prototype._manageStamp = u, g.prototype._getElementOffset = function(t) {
            var e = t.getBoundingClientRect(),
                i = this._boundingRect,
                n = p(t),
                s = {
                    left: e.left - i.left - n.marginLeft,
                    top: e.top - i.top - n.marginTop,
                    right: i.right - e.right - n.marginRight,
                    bottom: i.bottom - e.bottom - n.marginBottom
                };
            return s
        }, g.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, g.prototype.bindResize = function() {
            this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
        }, g.prototype.unbindResize = function() {
            this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1
        }, g.prototype.onresize = function() {
            function t() {
                e.resize(), delete e.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, g.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, g.prototype.needsResizeLayout = function() {
            var t = p(this.element),
                e = this.size && t;
            return e && t.innerWidth !== this.size.innerWidth
        }, g.prototype.addItems = function(t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, g.prototype.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, g.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, g.prototype.reveal = function(t) {
            var e = t && t.length;
            if (e)
                for (var i = 0; e > i; i++) {
                    var n = t[i];
                    n.reveal()
                }
        }, g.prototype.hide = function(t) {
            var e = t && t.length;
            if (e)
                for (var i = 0; e > i; i++) {
                    var n = t[i];
                    n.hide()
                }
        }, g.prototype.getItem = function(t) {
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                if (n.element === t) return n
            }
        }, g.prototype.getItems = function(t) {
            if (t && t.length) {
                for (var e = [], i = 0, n = t.length; n > i; i++) {
                    var s = t[i],
                        o = this.getItem(s);
                    o && e.push(o)
                }
                return e
            }
        }, g.prototype.remove = function(t) {
            t = n(t);
            var e = this.getItems(t);
            if (e && e.length) {
                this._itemsOn(e, "remove", function() {
                    this.emitEvent("removeComplete", [this, e])
                });
                for (var i = 0, o = e.length; o > i; i++) {
                    var r = e[i];
                    r.remove(), s(r, this.items)
                }
            }
        }, g.prototype.destroy = function() {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "";
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                n.destroy()
            }
            this.unbindResize();
            var s = this.element.outlayerGUID;
            delete y[s], delete this.element.outlayerGUID, c && c.removeData(this.element, this.constructor.namespace)
        }, g.data = function(t) {
            var e = t && t.outlayerGUID;
            return e && y[e]
        }, g.create = function(t, i) {
            function n() {
                g.apply(this, arguments)
            }
            return Object.create ? n.prototype = Object.create(g.prototype) : e(n.prototype, g.prototype), n.prototype.constructor = n, n.defaults = e({}, g.defaults), e(n.defaults, i), n.prototype.settings = {}, n.namespace = t, n.data = g.data, n.Item = function() {
                m.apply(this, arguments)
            }, n.Item.prototype = new m, r(function() {
                for (var e = o(t), i = a.querySelectorAll(".js-" + e), s = "data-" + e + "-options", r = 0, u = i.length; u > r; r++) {
                    var h, d = i[r],
                        p = d.getAttribute(s);
                    try {
                        h = p && JSON.parse(p)
                    } catch (f) {
                        l && l.error("Error parsing " + s + " on " + d.nodeName.toLowerCase() + (d.id ? "#" + d.id : "") + ": " + f);
                        continue
                    }
                    var m = new n(d, h);
                    c && c.data(d, t, m)
                }
            }), c && c.bridget && c.bridget(t, n), n
        }, g.Item = m, g
    }
    var a = t.document,
        l = t.console,
        c = t.jQuery,
        u = function() {},
        h = Object.prototype.toString,
        d = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) {
            return t instanceof HTMLElement
        } : function(t) {
            return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
        },
        p = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, n = t.length; n > i; i++)
                if (t[i] === e) return i;
            return -1
        };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], r) : "object" == typeof exports ? module.exports = r(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : t.Outlayer = r(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
}(window),
function(t) {
    function e(t) {
        function e() {
            t.Item.apply(this, arguments)
        }
        e.prototype = new t.Item, e.prototype._create = function() {
            this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
        }, e.prototype.updateSortData = function() {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var t = this.layout.options.getSortData,
                    e = this.layout._sorters;
                for (var i in t) {
                    var n = e[i];
                    this.sortData[i] = n(this.element, this)
                }
            }
        };
        var i = e.prototype.destroy;
        return e.prototype.destroy = function() {
            i.apply(this, arguments), this.css({
                display: ""
            })
        }, e
    }
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window),
function(t) {
    function e(t, e) {
        function i(t) {
            this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
        }
        return function() {
            function t(t) {
                return function() {
                    return e.prototype[t].apply(this.isotope, arguments)
                }
            }
            for (var n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], s = 0, o = n.length; o > s; s++) {
                var r = n[s];
                i.prototype[r] = t(r)
            }
        }(), i.prototype.needsVerticalResizeLayout = function() {
            var e = t(this.isotope.element),
                i = this.isotope.size && e;
            return i && e.innerHeight !== this.isotope.size.innerHeight
        }, i.prototype._getMeasurement = function() {
            this.isotope._getMeasurement.apply(this, arguments)
        }, i.prototype.getColumnWidth = function() {
            this.getSegmentSize("column", "Width")
        }, i.prototype.getRowHeight = function() {
            this.getSegmentSize("row", "Height")
        }, i.prototype.getSegmentSize = function(t, e) {
            var i = t + e,
                n = "outer" + e;
            if (this._getMeasurement(i, n), !this[i]) {
                var s = this.getFirstItemSize();
                this[i] = s && s[n] || this.isotope.size["inner" + e]
            }
        }, i.prototype.getFirstItemSize = function() {
            var e = this.isotope.filteredItems[0];
            return e && e.element && t(e.element)
        }, i.prototype.layout = function() {
            this.isotope.layout.apply(this.isotope, arguments)
        }, i.prototype.getSize = function() {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function(t, e) {
            function n() {
                i.apply(this, arguments)
            }
            return n.prototype = new i, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
        }, i
    }
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window),
function(t) {
    function e(t, e) {
        var n = t.create("masonry");
        return n.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--;) this.colYs.push(0);
            this.maxY = 0
        }, n.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0],
                    i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        }, n.prototype.getContainerWidth = function() {
            var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                i = e(t);
            this.containerWidth = i && i.innerWidth
        }, n.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth,
                n = e && 1 > e ? "round" : "ceil",
                s = Math[n](t.size.outerWidth / this.columnWidth);
            s = Math.min(s, this.cols);
            for (var o = this._getColGroup(s), r = Math.min.apply(Math, o), a = i(o, r), l = {
                x: this.columnWidth * a,
                y: r
            }, c = r + t.size.outerHeight, u = this.cols + 1 - o.length, h = 0; u > h; h++) this.colYs[a + h] = c;
            return l
        }, n.prototype._getColGroup = function(t) {
            if (2 > t) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                var s = this.colYs.slice(n, n + t);
                e[n] = Math.max.apply(Math, s)
            }
            return e
        }, n.prototype._manageStamp = function(t) {
            var i = e(t),
                n = this._getElementOffset(t),
                s = this.options.isOriginLeft ? n.left : n.right,
                o = s + i.outerWidth,
                r = Math.floor(s / this.columnWidth);
            r = Math.max(0, r);
            var a = Math.floor(o / this.columnWidth);
            a -= o % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
            for (var l = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, c = r; a >= c; c++) this.colYs[c] = Math.max(l, this.colYs[c])
        }, n.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {
                height: this.maxY
            };
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        }, n.prototype._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, n.prototype.needsResizeLayout = function() {
            var t = this.containerWidth;
            return this.getContainerWidth(), t !== this.containerWidth
        }, n
    }
    var i = Array.prototype.indexOf ? function(t, e) {
        return t.indexOf(e)
    } : function(t, e) {
        for (var i = 0, n = t.length; n > i; i++) {
            var s = t[i];
            if (s === e) return i
        }
        return -1
    };
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window),
function(t) {
    function e(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function i(t, i) {
        var n = t.create("masonry"),
            s = n.prototype._getElementOffset,
            o = n.prototype.layout,
            r = n.prototype._getMeasurement;
        e(n.prototype, i.prototype), n.prototype._getElementOffset = s, n.prototype.layout = o, n.prototype._getMeasurement = r;
        var a = n.prototype.measureColumns;
        n.prototype.measureColumns = function() {
            this.items = this.isotope.filteredItems, a.call(this)
        };
        var l = n.prototype._manageStamp;
        return n.prototype._manageStamp = function() {
            this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, l.apply(this, arguments)
        }, n
    }
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], i) : "object" == typeof exports ? module.exports = i(require("../layout-mode"), require("masonry-layout")) : i(t.Isotope.LayoutMode, t.Masonry)
}(window),
function(t) {
    function e(t) {
        var e = t.create("fitRows");
        return e.prototype._resetLayout = function() {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth + this.gutter,
                i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
            var n = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.maxY
            }
        }, e
    }
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window),
function(t) {
    function e(t) {
        var e = t.create("vertical", {
            horizontalAlignment: 0
        });
        return e.prototype._resetLayout = function() {
            this.y = 0
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                i = this.y;
            return this.y += t.size.outerHeight, {
                x: e,
                y: i
            }
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.y
            }
        }, e
    }
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window),
function(t) {
    function e(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function i(t) {
        return "[object Array]" === u.call(t)
    }

    function n(t) {
        var e = [];
        if (i(t)) e = t;
        else if (t && "number" == typeof t.length)
            for (var n = 0, s = t.length; s > n; n++) e.push(t[n]);
        else e.push(t);
        return e
    }

    function s(t, e) {
        var i = h(e, t); - 1 !== i && e.splice(i, 1)
    }

    function o(t, i, o, l, u) {
        function h(t, e) {
            return function(i, n) {
                for (var s = 0, o = t.length; o > s; s++) {
                    var r = t[s],
                        a = i.sortData[r],
                        l = n.sortData[r];
                    if (a > l || l > a) {
                        var c = void 0 !== e[r] ? e[r] : e,
                            u = c ? 1 : -1;
                        return (a > l ? 1 : -1) * u
                    }
                }
                return 0
            }
        }
        var d = t.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
        d.Item = l, d.LayoutMode = u, d.prototype._create = function() {
            this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
            for (var e in u.modes) this._initLayoutMode(e)
        }, d.prototype.reloadItems = function() {
            this.itemGUID = 0, t.prototype.reloadItems.call(this)
        }, d.prototype._itemize = function() {
            for (var e = t.prototype._itemize.apply(this, arguments), i = 0, n = e.length; n > i; i++) {
                var s = e[i];
                s.id = this.itemGUID++
            }
            return this._updateItemsSortData(e), e
        }, d.prototype._initLayoutMode = function(t) {
            var i = u.modes[t],
                n = this.options[t] || {};
            this.options[t] = i.options ? e(i.options, n) : n, this.modes[t] = new i(this)
        }, d.prototype.layout = function() {
            return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
        }, d.prototype._layout = function() {
            var t = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
        }, d.prototype.arrange = function(t) {
            this.option(t), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
        }, d.prototype._init = d.prototype.arrange, d.prototype._getIsInstant = function() {
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            return this._isInstant = t, t
        }, d.prototype._filter = function(t) {
            function e() {
                h.reveal(s), h.hide(o)
            }
            var i = this.options.filter;
            i = i || "*";
            for (var n = [], s = [], o = [], r = this._getFilterTest(i), a = 0, l = t.length; l > a; a++) {
                var c = t[a];
                if (!c.isIgnored) {
                    var u = r(c);
                    u && n.push(c), u && c.isHidden ? s.push(c) : u || c.isHidden || o.push(c)
                }
            }
            var h = this;
            return this._isInstant ? this._noTransition(e) : e(), n
        }, d.prototype._getFilterTest = function(t) {
            return r && this.options.isJQueryFiltering ? function(e) {
                return r(e.element).is(t)
            } : "function" == typeof t ? function(e) {
                return t(e.element)
            } : function(e) {
                return o(e.element, t)
            }
        }, d.prototype.updateSortData = function(t) {
            var e;
            t ? (t = n(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
        }, d.prototype._getSorters = function() {
            var t = this.options.getSortData;
            for (var e in t) {
                var i = t[e];
                this._sorters[e] = p(i)
            }
        }, d.prototype._updateItemsSortData = function(t) {
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.updateSortData()
            }
        };
        var p = function() {
            function t(t) {
                if ("string" != typeof t) return t;
                var i = a(t).split(" "),
                    n = i[0],
                    s = n.match(/^\[(.+)\]$/),
                    o = s && s[1],
                    r = e(o, n),
                    l = d.sortDataParsers[i[1]];
                return t = l ? function(t) {
                    return t && l(r(t))
                } : function(t) {
                    return t && r(t)
                }
            }

            function e(t, e) {
                var i;
                return i = t ? function(e) {
                    return e.getAttribute(t)
                } : function(t) {
                    var i = t.querySelector(e);
                    return i && c(i)
                }
            }
            return t
        }();
        d.sortDataParsers = {
            parseInt: function(t) {
                return parseInt(t, 10)
            },
            parseFloat: function(t) {
                return parseFloat(t)
            }
        }, d.prototype._sort = function() {
            var t = this.options.sortBy;
            if (t) {
                var e = [].concat.apply(t, this.sortHistory),
                    i = h(e, this.options.sortAscending);
                this.filteredItems.sort(i), t !== this.sortHistory[0] && this.sortHistory.unshift(t)
            }
        }, d.prototype._mode = function() {
            var t = this.options.layoutMode,
                e = this.modes[t];
            if (!e) throw Error("No layout mode: " + t);
            return e.options = this.options[t], e
        }, d.prototype._resetLayout = function() {
            t.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, d.prototype._getItemLayoutPosition = function(t) {
            return this._mode()._getItemLayoutPosition(t)
        }, d.prototype._manageStamp = function(t) {
            this._mode()._manageStamp(t)
        }, d.prototype._getContainerSize = function() {
            return this._mode()._getContainerSize()
        }, d.prototype.needsResizeLayout = function() {
            return this._mode().needsResizeLayout()
        }, d.prototype.appended = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i = this._filterRevealAdded(e);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, d.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps();
                var n = this._filterRevealAdded(e);
                this.layoutItems(i), this.filteredItems = n.concat(this.filteredItems)
            }
        }, d.prototype._filterRevealAdded = function(t) {
            var e = this._noTransition(function() {
                return this._filter(t)
            });
            return this.layoutItems(e, !0), this.reveal(e), t
        }, d.prototype.insert = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i, n, s = e.length;
                for (i = 0; s > i; i++) n = e[i], this.element.appendChild(n.element);
                var o = this._filter(e);
                for (this._noTransition(function() {
                    this.hide(o)
                }), i = 0; s > i; i++) e[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; s > i; i++) delete e[i].isLayoutInstant;
                this.reveal(o)
            }
        };
        var f = d.prototype.remove;
        return d.prototype.remove = function(t) {
            t = n(t);
            var e = this.getItems(t);
            if (f.call(this, t), e && e.length)
                for (var i = 0, o = e.length; o > i; i++) {
                    var r = e[i];
                    s(r, this.filteredItems)
                }
        }, d.prototype.shuffle = function() {
            for (var t = 0, e = this.items.length; e > t; t++) {
                var i = this.items[t];
                i.sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, d.prototype._noTransition = function(t) {
            var e = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var i = t.call(this);
            return this.options.transitionDuration = e, i
        }, d.prototype.getFilteredItemElements = function() {
            for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element);
            return t
        }, d
    }
    var r = t.jQuery,
        a = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        l = document.documentElement,
        c = l.textContent ? function(t) {
            return t.textContent
        } : function(t) {
            return t.innerText
        },
        u = Object.prototype.toString,
        h = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, n = t.length; n > i; i++)
                if (t[i] === e) return i;
            return -1
        };
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], o) : "object" == typeof exports ? module.exports = o(require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = o(t.Outlayer, t.getSize, t.matchesSelector, t.Isotope.Item, t.Isotope.LayoutMode)
}(window);
var Swiper = function(t, e) {
    "use strict";

    function i(t, e) {
        return document.querySelectorAll ? (e || document).querySelectorAll(t) : jQuery(t, e)
    }

    function n(t) {
        return "[object Array]" === Object.prototype.toString.apply(t) ? !0 : !1
    }

    function s() {
        var t = A - F;
        return e.freeMode && (t = A - F), e.slidesPerView > P.slides.length && !e.centeredSlides && (t = 0), 0 > t && (t = 0), t
    }

    function o() {
        function t(t) {
            var i, n, s = function() {
                "undefined" != typeof P && null !== P && (void 0 !== P.imagesLoaded && P.imagesLoaded++, P.imagesLoaded === P.imagesToLoad.length && (P.reInit(), e.onImagesReady && P.fireCallback(e.onImagesReady, P)))
            };
            t.complete ? s() : (n = t.currentSrc || t.getAttribute("src"), n ? (i = new Image, i.onload = s, i.onerror = s, i.src = n) : s())
        }
        var n = P.h.addEventListener,
            s = "wrapper" === e.eventTarget ? P.wrapper : P.container;
        if (P.browser.ie10 || P.browser.ie11 ? (n(s, P.touchEvents.touchStart, m), n(document, P.touchEvents.touchMove, g), n(document, P.touchEvents.touchEnd, v)) : (P.support.touch && (n(s, "touchstart", m), n(s, "touchmove", g), n(s, "touchend", v)), e.simulateTouch && (n(s, "mousedown", m), n(document, "mousemove", g), n(document, "mouseup", v))), e.autoResize && n(window, "resize", P.resizeFix), r(), P._wheelEvent = !1, e.mousewheelControl) {
            if (void 0 !== document.onmousewheel && (P._wheelEvent = "mousewheel"), !P._wheelEvent) try {
                new WheelEvent("wheel"), P._wheelEvent = "wheel"
            } catch (o) {}
            P._wheelEvent || (P._wheelEvent = "DOMMouseScroll"), P._wheelEvent && n(P.container, P._wheelEvent, c)
        }
        if (e.keyboardControl && n(document, "keydown", l), e.updateOnImagesReady) {
            P.imagesToLoad = i("img", P.container);
            for (var a = 0; a < P.imagesToLoad.length; a++) t(P.imagesToLoad[a])
        }
    }

    function r() {
        var t, n = P.h.addEventListener;
        if (e.preventLinks) {
            var s = i("a", P.container);
            for (t = 0; t < s.length; t++) n(s[t], "click", p)
        }
        if (e.releaseFormElements) {
            var o = i("input, textarea, select", P.container);
            for (t = 0; t < o.length; t++) n(o[t], P.touchEvents.touchStart, f, !0), P.support.touch && e.simulateTouch && n(o[t], "mousedown", f, !0)
        }
        if (e.onSlideClick)
            for (t = 0; t < P.slides.length; t++) n(P.slides[t], "click", u);
        if (e.onSlideTouch)
            for (t = 0; t < P.slides.length; t++) n(P.slides[t], P.touchEvents.touchStart, h)
    }

    function a() {
        var t, n = P.h.removeEventListener;
        if (e.onSlideClick)
            for (t = 0; t < P.slides.length; t++) n(P.slides[t], "click", u);
        if (e.onSlideTouch)
            for (t = 0; t < P.slides.length; t++) n(P.slides[t], P.touchEvents.touchStart, h);
        if (e.releaseFormElements) {
            var s = i("input, textarea, select", P.container);
            for (t = 0; t < s.length; t++) n(s[t], P.touchEvents.touchStart, f, !0), P.support.touch && e.simulateTouch && n(s[t], "mousedown", f, !0)
        }
        if (e.preventLinks) {
            var o = i("a", P.container);
            for (t = 0; t < o.length; t++) n(o[t], "click", p)
        }
    }

    function l(t) {
        var e = t.keyCode || t.charCode;
        if (!(t.shiftKey || t.altKey || t.ctrlKey || t.metaKey)) {
            if (37 === e || 39 === e || 38 === e || 40 === e) {
                for (var i = !1, n = P.h.getOffset(P.container), s = P.h.windowScroll().left, o = P.h.windowScroll().top, r = P.h.windowWidth(), a = P.h.windowHeight(), l = [
                    [n.left, n.top],
                    [n.left + P.width, n.top],
                    [n.left, n.top + P.height],
                    [n.left + P.width, n.top + P.height]
                ], c = 0; c < l.length; c++) {
                    var u = l[c];
                    u[0] >= s && u[0] <= s + r && u[1] >= o && u[1] <= o + a && (i = !0)
                }
                if (!i) return
            }
            R ? ((37 === e || 39 === e) && (t.preventDefault ? t.preventDefault() : t.returnValue = !1), 39 === e && P.swipeNext(), 37 === e && P.swipePrev()) : ((38 === e || 40 === e) && (t.preventDefault ? t.preventDefault() : t.returnValue = !1), 40 === e && P.swipeNext(), 38 === e && P.swipePrev())
        }
    }

    function c(t) {
        var i = P._wheelEvent,
            n = 0;
        if (t.detail) n = -t.detail;
        else if ("mousewheel" === i)
            if (e.mousewheelControlForceToAxis)
                if (R) {
                    if (!(Math.abs(t.wheelDeltaX) > Math.abs(t.wheelDeltaY))) return;
                    n = t.wheelDeltaX
                } else {
                    if (!(Math.abs(t.wheelDeltaY) > Math.abs(t.wheelDeltaX))) return;
                    n = t.wheelDeltaY
                } else n = t.wheelDelta;
        else if ("DOMMouseScroll" === i) n = -t.detail;
        else if ("wheel" === i)
            if (e.mousewheelControlForceToAxis)
                if (R) {
                    if (!(Math.abs(t.deltaX) > Math.abs(t.deltaY))) return;
                    n = -t.deltaX
                } else {
                    if (!(Math.abs(t.deltaY) > Math.abs(t.deltaX))) return;
                    n = -t.deltaY
                } else n = Math.abs(t.deltaX) > Math.abs(t.deltaY) ? -t.deltaX : -t.deltaY; if (e.freeMode) {
            var o = P.getWrapperTranslate() + n;
            if (o > 0 && (o = 0), o < -s() && (o = -s()), P.setWrapperTransition(0), P.setWrapperTranslate(o), P.updateActiveSlide(o), 0 === o || o === -s()) return
        } else(new Date).getTime() - U > 60 && (0 > n ? P.swipeNext() : P.swipePrev()), U = (new Date).getTime();
        return e.autoplay && P.stopAutoplay(!0), t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
    }

    function u(t) {
        P.allowSlideClick && (d(t), P.fireCallback(e.onSlideClick, P, t))
    }

    function h(t) {
        d(t), P.fireCallback(e.onSlideTouch, P, t)
    }

    function d(t) {
        if (t.currentTarget) P.clickedSlide = t.currentTarget;
        else {
            var i = t.srcElement;
            do {
                if (i.className.indexOf(e.slideClass) > -1) break;
                i = i.parentNode
            } while (i);
            P.clickedSlide = i
        }
        P.clickedSlideIndex = P.slides.indexOf(P.clickedSlide), P.clickedSlideLoopIndex = P.clickedSlideIndex - (P.loopedSlides || 0)
    }

    function p(t) {
        return P.allowLinks ? void 0 : (t.preventDefault ? t.preventDefault() : t.returnValue = !1, e.preventLinksPropagation && "stopPropagation" in t && t.stopPropagation(), !1)
    }

    function f(t) {
        return t.stopPropagation ? t.stopPropagation() : t.returnValue = !1, !1
    }

    function m(t) {
        if (e.preventLinks && (P.allowLinks = !0), P.isTouched || e.onlyExternal) return !1;
        var i = t.target || t.srcElement;
        document.activeElement && document.activeElement !== document.body && document.activeElement !== i && document.activeElement.blur();
        var n = "input select textarea".split(" ");
        if (e.noSwiping && i && b(i)) return !1;
        if (J = !1, P.isTouched = !0, K = "touchstart" === t.type, !K && "which" in t && 3 === t.which) return P.isTouched = !1, !1;
        if (!K || 1 === t.targetTouches.length) {
            P.callPlugins("onTouchStartBegin"), !K && !P.isAndroid && n.indexOf(i.tagName.toLowerCase()) < 0 && (t.preventDefault ? t.preventDefault() : t.returnValue = !1);
            var s = K ? t.targetTouches[0].pageX : t.pageX || t.clientX,
                o = K ? t.targetTouches[0].pageY : t.pageY || t.clientY;
            P.touches.startX = P.touches.currentX = s, P.touches.startY = P.touches.currentY = o, P.touches.start = P.touches.current = R ? s : o, P.setWrapperTransition(0), P.positions.start = P.positions.current = P.getWrapperTranslate(), P.setWrapperTranslate(P.positions.start), P.times.start = (new Date).getTime(), O = void 0, e.moveStartThreshold > 0 && (Q = !1), e.onTouchStart && P.fireCallback(e.onTouchStart, P, t), P.callPlugins("onTouchStartEnd")
        }
    }

    function g(t) {
        if (P.isTouched && !e.onlyExternal && (!K || "mousemove" !== t.type)) {
            var i = K ? t.targetTouches[0].pageX : t.pageX || t.clientX,
                n = K ? t.targetTouches[0].pageY : t.pageY || t.clientY;
            if ("undefined" == typeof O && R && (O = !!(O || Math.abs(n - P.touches.startY) > Math.abs(i - P.touches.startX))), "undefined" != typeof O || R || (O = !!(O || Math.abs(n - P.touches.startY) < Math.abs(i - P.touches.startX))), O) return void(P.isTouched = !1);
            if (R) {
                if (!e.swipeToNext && i < P.touches.startX || !e.swipeToPrev && i > P.touches.startX) return
            } else if (!e.swipeToNext && n < P.touches.startY || !e.swipeToPrev && n > P.touches.startY) return;
            if (t.assignedToSwiper) return void(P.isTouched = !1);
            if (t.assignedToSwiper = !0, e.preventLinks && (P.allowLinks = !1), e.onSlideClick && (P.allowSlideClick = !1), e.autoplay && P.stopAutoplay(!0), !K || 1 === t.touches.length) {
                if (P.isMoved || (P.callPlugins("onTouchMoveStart"), e.loop && (P.fixLoop(), P.positions.start = P.getWrapperTranslate()), e.onTouchMoveStart && P.fireCallback(e.onTouchMoveStart, P)), P.isMoved = !0, t.preventDefault ? t.preventDefault() : t.returnValue = !1, P.touches.current = R ? i : n, P.positions.current = (P.touches.current - P.touches.start) * e.touchRatio + P.positions.start, P.positions.current > 0 && e.onResistanceBefore && P.fireCallback(e.onResistanceBefore, P, P.positions.current), P.positions.current < -s() && e.onResistanceAfter && P.fireCallback(e.onResistanceAfter, P, Math.abs(P.positions.current + s())), e.resistance && "100%" !== e.resistance) {
                    var o;
                    if (P.positions.current > 0 && (o = 1 - P.positions.current / F / 2, P.positions.current = .5 > o ? F / 2 : P.positions.current * o), P.positions.current < -s()) {
                        var r = (P.touches.current - P.touches.start) * e.touchRatio + (s() + P.positions.start);
                        o = (F + r) / F;
                        var a = P.positions.current - r * (1 - o) / 2,
                            l = -s() - F / 2;
                        P.positions.current = l > a || 0 >= o ? l : a
                    }
                }
                if (e.resistance && "100%" === e.resistance && (P.positions.current > 0 && (!e.freeMode || e.freeModeFluid) && (P.positions.current = 0), P.positions.current < -s() && (!e.freeMode || e.freeModeFluid) && (P.positions.current = -s())), !e.followFinger) return;
                if (e.moveStartThreshold)
                    if (Math.abs(P.touches.current - P.touches.start) > e.moveStartThreshold || Q) {
                        if (!Q) return Q = !0, void(P.touches.start = P.touches.current);
                        P.setWrapperTranslate(P.positions.current)
                    } else P.positions.current = P.positions.start;
                else P.setWrapperTranslate(P.positions.current);
                return (e.freeMode || e.watchActiveIndex) && P.updateActiveSlide(P.positions.current), e.grabCursor && (P.container.style.cursor = "move", P.container.style.cursor = "grabbing", P.container.style.cursor = "-moz-grabbin", P.container.style.cursor = "-webkit-grabbing"), G || (G = P.touches.current), Z || (Z = (new Date).getTime()), P.velocity = (P.touches.current - G) / ((new Date).getTime() - Z) / 2, Math.abs(P.touches.current - G) < 2 && (P.velocity = 0), G = P.touches.current, Z = (new Date).getTime(), P.callPlugins("onTouchMoveEnd"), e.onTouchMove && P.fireCallback(e.onTouchMove, P, t), !1
            }
        }
    }

    function v(t) {
        if (O && P.swipeReset(), !e.onlyExternal && P.isTouched) {
            P.isTouched = !1, e.grabCursor && (P.container.style.cursor = "move", P.container.style.cursor = "grab", P.container.style.cursor = "-moz-grab", P.container.style.cursor = "-webkit-grab"), P.positions.current || 0 === P.positions.current || (P.positions.current = P.positions.start), e.followFinger && P.setWrapperTranslate(P.positions.current), P.times.end = (new Date).getTime(), P.touches.diff = P.touches.current - P.touches.start, P.touches.abs = Math.abs(P.touches.diff), P.positions.diff = P.positions.current - P.positions.start, P.positions.abs = Math.abs(P.positions.diff);
            var i = P.positions.diff,
                n = P.positions.abs,
                o = P.times.end - P.times.start;
            5 > n && 300 > o && P.allowLinks === !1 && (e.freeMode || 0 === n || P.swipeReset(), e.preventLinks && (P.allowLinks = !0), e.onSlideClick && (P.allowSlideClick = !0)), setTimeout(function() {
                "undefined" != typeof P && null !== P && (e.preventLinks && (P.allowLinks = !0), e.onSlideClick && (P.allowSlideClick = !0))
            }, 100);
            var r = s();
            if (!P.isMoved && e.freeMode) return P.isMoved = !1, e.onTouchEnd && P.fireCallback(e.onTouchEnd, P, t), void P.callPlugins("onTouchEnd");
            if (!P.isMoved || P.positions.current > 0 || P.positions.current < -r) return P.swipeReset(), e.onTouchEnd && P.fireCallback(e.onTouchEnd, P, t), void P.callPlugins("onTouchEnd");
            if (P.isMoved = !1, e.freeMode) {
                if (e.freeModeFluid) {
                    var a, l = 1e3 * e.momentumRatio,
                        c = P.velocity * l,
                        u = P.positions.current + c,
                        h = !1,
                        d = 20 * Math.abs(P.velocity) * e.momentumBounceRatio; - r > u && (e.momentumBounce && P.support.transitions ? (-d > u + r && (u = -r - d), a = -r, h = !0, J = !0) : u = -r), u > 0 && (e.momentumBounce && P.support.transitions ? (u > d && (u = d), a = 0, h = !0, J = !0) : u = 0), 0 !== P.velocity && (l = Math.abs((u - P.positions.current) / P.velocity)), P.setWrapperTranslate(u), P.setWrapperTransition(l), e.momentumBounce && h && P.wrapperTransitionEnd(function() {
                        J && (e.onMomentumBounce && P.fireCallback(e.onMomentumBounce, P), P.callPlugins("onMomentumBounce"), P.setWrapperTranslate(a), P.setWrapperTransition(300))
                    }), P.updateActiveSlide(u)
                }
                return (!e.freeModeFluid || o >= 300) && P.updateActiveSlide(P.positions.current), e.onTouchEnd && P.fireCallback(e.onTouchEnd, P, t), void P.callPlugins("onTouchEnd")
            }
            M = 0 > i ? "toNext" : "toPrev", "toNext" === M && 300 >= o && (30 > n || !e.shortSwipes ? P.swipeReset() : P.swipeNext(!0, !0)), "toPrev" === M && 300 >= o && (30 > n || !e.shortSwipes ? P.swipeReset() : P.swipePrev(!0, !0));
            var p = 0;
            if ("auto" === e.slidesPerView) {
                for (var f, m = Math.abs(P.getWrapperTranslate()), g = 0, v = 0; v < P.slides.length; v++)
                    if (f = R ? P.slides[v].getWidth(!0, e.roundLengths) : P.slides[v].getHeight(!0, e.roundLengths), g += f, g > m) {
                        p = f;
                        break
                    }
                p > F && (p = F)
            } else p = D * e.slidesPerView;
            "toNext" === M && o > 300 && (n >= p * e.longSwipesRatio ? P.swipeNext(!0, !0) : P.swipeReset()), "toPrev" === M && o > 300 && (n >= p * e.longSwipesRatio ? P.swipePrev(!0, !0) : P.swipeReset()), e.onTouchEnd && P.fireCallback(e.onTouchEnd, P, t), P.callPlugins("onTouchEnd")
        }
    }

    function y(t, e) {
        return t && t.getAttribute("class") && t.getAttribute("class").indexOf(e) > -1
    }

    function b(t) {
        var i = !1;
        do y(t, e.noSwipingClass) && (i = !0), t = t.parentElement; while (!i && t.parentElement && !y(t, e.wrapperClass));
        return !i && y(t, e.wrapperClass) && y(t, e.noSwipingClass) && (i = !0), i
    }

    function w(t, e) {
        var i, n = document.createElement("div");
        return n.innerHTML = e, i = n.firstChild, i.className += " " + t, i.outerHTML
    }

    function x(t, i, n) {
        function s() {
            var o = +new Date,
                h = o - r;
            a += l * h / (1e3 / 60), u = "toNext" === c ? a > t : t > a, u ? (P.setWrapperTranslate(Math.ceil(a)), P._DOMAnimating = !0, window.setTimeout(function() {
                s()
            }, 1e3 / 60)) : (e.onSlideChangeEnd && ("to" === i ? n.runCallbacks === !0 && P.fireCallback(e.onSlideChangeEnd, P, c) : P.fireCallback(e.onSlideChangeEnd, P, c)), P.setWrapperTranslate(t), P._DOMAnimating = !1)
        }
        var o = "to" === i && n.speed >= 0 ? n.speed : e.speed,
            r = +new Date;
        if (P.support.transitions || !e.DOMAnimation) P.setWrapperTranslate(t), P.setWrapperTransition(o);
        else {
            var a = P.getWrapperTranslate(),
                l = Math.ceil((t - a) / o * (1e3 / 60)),
                c = a > t ? "toNext" : "toPrev",
                u = "toNext" === c ? a > t : t > a;
            if (P._DOMAnimating) return;
            s()
        }
        P.updateActiveSlide(t), e.onSlideNext && "next" === i && n.runCallbacks === !0 && P.fireCallback(e.onSlideNext, P, t), e.onSlidePrev && "prev" === i && n.runCallbacks === !0 && P.fireCallback(e.onSlidePrev, P, t), e.onSlideReset && "reset" === i && n.runCallbacks === !0 && P.fireCallback(e.onSlideReset, P, t), "next" !== i && "prev" !== i && "to" !== i || n.runCallbacks !== !0 || _(i)
    }

    function _(t) {
        if (P.callPlugins("onSlideChangeStart"), e.onSlideChangeStart)
            if (e.queueStartCallbacks && P.support.transitions) {
                if (P._queueStartCallbacks) return;
                P._queueStartCallbacks = !0, P.fireCallback(e.onSlideChangeStart, P, t), P.wrapperTransitionEnd(function() {
                    P._queueStartCallbacks = !1
                })
            } else P.fireCallback(e.onSlideChangeStart, P, t);
        if (e.onSlideChangeEnd)
            if (P.support.transitions)
                if (e.queueEndCallbacks) {
                    if (P._queueEndCallbacks) return;
                    P._queueEndCallbacks = !0, P.wrapperTransitionEnd(function(i) {
                        P.fireCallback(e.onSlideChangeEnd, i, t)
                    })
                } else P.wrapperTransitionEnd(function(i) {
                    P.fireCallback(e.onSlideChangeEnd, i, t)
                });
        else e.DOMAnimation || setTimeout(function() {
            P.fireCallback(e.onSlideChangeEnd, P, t)
        }, 10)
    }

    function C() {
        var t = P.paginationButtons;
        if (t)
            for (var e = 0; e < t.length; e++) P.h.removeEventListener(t[e], "click", T)
    }

    function S() {
        var t = P.paginationButtons;
        if (t)
            for (var e = 0; e < t.length; e++) P.h.addEventListener(t[e], "click", T)
    }

    function T(t) {
        for (var i, n = t.target || t.srcElement, s = P.paginationButtons, o = 0; o < s.length; o++) n === s[o] && (i = o);
        e.autoplay && P.stopAutoplay(!0), P.swipeTo(i)
    }

    function k() {
        te = setTimeout(function() {
            e.loop ? (P.fixLoop(), P.swipeNext(!0, !0)) : P.swipeNext(!0, !0) || (e.autoplayStopOnLast ? (clearTimeout(te), te = void 0) : P.swipeTo(0)), P.wrapperTransitionEnd(function() {
                "undefined" != typeof te && k()
            })
        }, e.autoplay)
    }

    function E() {
        P.calcSlides(), e.loader.slides.length > 0 && 0 === P.slides.length && P.loadSlides(), e.loop && P.createLoop(), P.init(), o(), e.pagination && P.createPagination(!0), e.loop || e.initialSlide > 0 ? P.swipeTo(e.initialSlide, 0, !1) : P.updateActiveSlide(0), e.autoplay && P.startAutoplay(), P.centerIndex = P.activeIndex, e.onSwiperCreated && P.fireCallback(e.onSwiperCreated, P), P.callPlugins("onSwiperCreated")
    }
    if (!document.body.outerHTML && document.body.__defineGetter__ && HTMLElement) {
        var L = HTMLElement.prototype;
        L.__defineGetter__ && L.__defineGetter__("outerHTML", function() {
            return (new XMLSerializer).serializeToString(this)
        })
    }
    if (window.getComputedStyle || (window.getComputedStyle = function(t) {
        return this.el = t, this.getPropertyValue = function(e) {
            var i = /(\-([a-z]){1})/g;
            return "float" === e && (e = "styleFloat"), i.test(e) && (e = e.replace(i, function() {
                return arguments[2].toUpperCase()
            })), t.currentStyle[e] ? t.currentStyle[e] : null
        }, this
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(t, e) {
        for (var i = e || 0, n = this.length; n > i; i++)
            if (this[i] === t) return i;
        return -1
    }), (document.querySelectorAll || window.jQuery) && "undefined" != typeof t && (t.nodeType || 0 !== i(t).length)) {
        var P = this;
        P.touches = {
            start: 0,
            startX: 0,
            startY: 0,
            current: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
            abs: 0
        }, P.positions = {
            start: 0,
            abs: 0,
            diff: 0,
            current: 0
        }, P.times = {
            start: 0,
            end: 0
        }, P.id = (new Date).getTime(), P.container = t.nodeType ? t : i(t)[0], P.isTouched = !1, P.isMoved = !1, P.activeIndex = 0, P.centerIndex = 0, P.activeLoaderIndex = 0, P.activeLoopIndex = 0, P.previousIndex = null, P.velocity = 0, P.snapGrid = [], P.slidesGrid = [], P.imagesToLoad = [], P.imagesLoaded = 0, P.wrapperLeft = 0, P.wrapperRight = 0, P.wrapperTop = 0, P.wrapperBottom = 0, P.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") >= 0;
        var I, D, A, M, O, F, N = {
            eventTarget: "wrapper",
            mode: "horizontal",
            touchRatio: 1,
            speed: 300,
            freeMode: !1,
            freeModeFluid: !1,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerViewFit: !0,
            simulateTouch: !0,
            followFinger: !0,
            shortSwipes: !0,
            longSwipesRatio: .5,
            moveStartThreshold: !1,
            onlyExternal: !1,
            createPagination: !0,
            pagination: !1,
            paginationElement: "span",
            paginationClickable: !1,
            paginationAsRange: !0,
            resistance: !0,
            scrollContainer: !1,
            preventLinks: !0,
            preventLinksPropagation: !1,
            noSwiping: !1,
            noSwipingClass: "swiper-no-swiping",
            initialSlide: 0,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelControlForceToAxis: !1,
            useCSS3Transforms: !0,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            loop: !1,
            loopAdditionalSlides: 0,
            roundLengths: !1,
            calculateHeight: !1,
            cssWidthAndHeight: !1,
            updateOnImagesReady: !0,
            releaseFormElements: !0,
            watchActiveIndex: !1,
            visibilityFullFit: !1,
            offsetPxBefore: 0,
            offsetPxAfter: 0,
            offsetSlidesBefore: 0,
            offsetSlidesAfter: 0,
            centeredSlides: !1,
            queueStartCallbacks: !1,
            queueEndCallbacks: !1,
            autoResize: !0,
            resizeReInit: !1,
            DOMAnimation: !0,
            loader: {
                slides: [],
                slidesHTMLType: "inner",
                surroundGroups: 1,
                logic: "reload",
                loadAllSlides: !1
            },
            swipeToPrev: !0,
            swipeToNext: !0,
            slideElement: "div",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            wrapperClass: "swiper-wrapper",
            paginationElementClass: "swiper-pagination-switch",
            paginationActiveClass: "swiper-active-switch",
            paginationVisibleClass: "swiper-visible-switch"
        };
        e = e || {};
        for (var z in N)
            if (z in e && "object" == typeof e[z])
                for (var j in N[z]) j in e[z] || (e[z][j] = N[z][j]);
            else z in e || (e[z] = N[z]);
        P.params = e, e.scrollContainer && (e.freeMode = !0, e.freeModeFluid = !0), e.loop && (e.resistance = "100%");
        var R = "horizontal" === e.mode,
            W = ["mousedown", "mousemove", "mouseup"];
        P.browser.ie10 && (W = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), P.browser.ie11 && (W = ["pointerdown", "pointermove", "pointerup"]), P.touchEvents = {
            touchStart: P.support.touch || !e.simulateTouch ? "touchstart" : W[0],
            touchMove: P.support.touch || !e.simulateTouch ? "touchmove" : W[1],
            touchEnd: P.support.touch || !e.simulateTouch ? "touchend" : W[2]
        };
        for (var $ = P.container.childNodes.length - 1; $ >= 0; $--)
            if (P.container.childNodes[$].className)
                for (var H = P.container.childNodes[$].className.split(/\s+/), B = 0; B < H.length; B++) H[B] === e.wrapperClass && (I = P.container.childNodes[$]);
        P.wrapper = I, P._extendSwiperSlide = function(t) {
            return t.append = function() {
                return e.loop ? t.insertAfter(P.slides.length - P.loopedSlides) : (P.wrapper.appendChild(t), P.reInit()), t
            }, t.prepend = function() {
                return e.loop ? (P.wrapper.insertBefore(t, P.slides[P.loopedSlides]), P.removeLoopedSlides(), P.calcSlides(), P.createLoop()) : P.wrapper.insertBefore(t, P.wrapper.firstChild), P.reInit(), t
            }, t.insertAfter = function(i) {
                if ("undefined" == typeof i) return !1;
                var n;
                return e.loop ? (n = P.slides[i + 1 + P.loopedSlides], n ? P.wrapper.insertBefore(t, n) : P.wrapper.appendChild(t), P.removeLoopedSlides(), P.calcSlides(), P.createLoop()) : (n = P.slides[i + 1], P.wrapper.insertBefore(t, n)), P.reInit(), t
            }, t.clone = function() {
                return P._extendSwiperSlide(t.cloneNode(!0))
            }, t.remove = function() {
                P.wrapper.removeChild(t), P.reInit()
            }, t.html = function(e) {
                return "undefined" == typeof e ? t.innerHTML : (t.innerHTML = e, t)
            }, t.index = function() {
                for (var e, i = P.slides.length - 1; i >= 0; i--) t === P.slides[i] && (e = i);
                return e
            }, t.isActive = function() {
                return t.index() === P.activeIndex ? !0 : !1
            }, t.swiperSlideDataStorage || (t.swiperSlideDataStorage = {}), t.getData = function(e) {
                return t.swiperSlideDataStorage[e]
            }, t.setData = function(e, i) {
                return t.swiperSlideDataStorage[e] = i, t
            }, t.data = function(e, i) {
                return "undefined" == typeof i ? t.getAttribute("data-" + e) : (t.setAttribute("data-" + e, i), t)
            }, t.getWidth = function(e, i) {
                return P.h.getWidth(t, e, i)
            }, t.getHeight = function(e, i) {
                return P.h.getHeight(t, e, i)
            }, t.getOffset = function() {
                return P.h.getOffset(t)
            }, t
        }, P.calcSlides = function(t) {
            var i = P.slides ? P.slides.length : !1;
            P.slides = [], P.displaySlides = [];
            for (var n = 0; n < P.wrapper.childNodes.length; n++)
                if (P.wrapper.childNodes[n].className)
                    for (var s = P.wrapper.childNodes[n].className, o = s.split(/\s+/), l = 0; l < o.length; l++) o[l] === e.slideClass && P.slides.push(P.wrapper.childNodes[n]);
            for (n = P.slides.length - 1; n >= 0; n--) P._extendSwiperSlide(P.slides[n]);
            i !== !1 && (i !== P.slides.length || t) && (a(), r(), P.updateActiveSlide(), P.params.pagination && P.createPagination(), P.callPlugins("numberOfSlidesChanged"))
        }, P.createSlide = function(t, i, n) {
            i = i || P.params.slideClass, n = n || e.slideElement;
            var s = document.createElement(n);
            return s.innerHTML = t || "", s.className = i, P._extendSwiperSlide(s)
        }, P.appendSlide = function(t, e, i) {
            return t ? t.nodeType ? P._extendSwiperSlide(t).append() : P.createSlide(t, e, i).append() : void 0
        }, P.prependSlide = function(t, e, i) {
            return t ? t.nodeType ? P._extendSwiperSlide(t).prepend() : P.createSlide(t, e, i).prepend() : void 0
        }, P.insertSlideAfter = function(t, e, i, n) {
            return "undefined" == typeof t ? !1 : e.nodeType ? P._extendSwiperSlide(e).insertAfter(t) : P.createSlide(e, i, n).insertAfter(t)
        }, P.removeSlide = function(t) {
            if (P.slides[t]) {
                if (e.loop) {
                    if (!P.slides[t + P.loopedSlides]) return !1;
                    P.slides[t + P.loopedSlides].remove(), P.removeLoopedSlides(), P.calcSlides(), P.createLoop()
                } else P.slides[t].remove();
                return !0
            }
            return !1
        }, P.removeLastSlide = function() {
            return P.slides.length > 0 ? (e.loop ? (P.slides[P.slides.length - 1 - P.loopedSlides].remove(), P.removeLoopedSlides(), P.calcSlides(), P.createLoop()) : P.slides[P.slides.length - 1].remove(), !0) : !1
        }, P.removeAllSlides = function() {
            for (var t = P.slides.length, e = P.slides.length - 1; e >= 0; e--) P.slides[e].remove(), e === t - 1 && P.setWrapperTranslate(0)
        }, P.getSlide = function(t) {
            return P.slides[t]
        }, P.getLastSlide = function() {
            return P.slides[P.slides.length - 1]
        }, P.getFirstSlide = function() {
            return P.slides[0]
        }, P.activeSlide = function() {
            return P.slides[P.activeIndex]
        }, P.fireCallback = function() {
            var t = arguments[0];
            if ("[object Array]" === Object.prototype.toString.call(t))
                for (var i = 0; i < t.length; i++) "function" == typeof t[i] && t[i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            else "[object String]" === Object.prototype.toString.call(t) ? e["on" + t] && P.fireCallback(e["on" + t], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) : t(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        }, P.addCallback = function(t, e) {
            var i, s = this;
            return s.params["on" + t] ? n(this.params["on" + t]) ? this.params["on" + t].push(e) : "function" == typeof this.params["on" + t] ? (i = this.params["on" + t], this.params["on" + t] = [], this.params["on" + t].push(i), this.params["on" + t].push(e)) : void 0 : (this.params["on" + t] = [], this.params["on" + t].push(e))
        }, P.removeCallbacks = function(t) {
            P.params["on" + t] && (P.params["on" + t] = null)
        };
        var q = [];
        for (var X in P.plugins)
            if (e[X]) {
                var V = P.plugins[X](P, e[X]);
                V && q.push(V)
            }
        P.callPlugins = function(t, e) {
            e || (e = {});
            for (var i = 0; i < q.length; i++) t in q[i] && q[i][t](e)
        }, !P.browser.ie10 && !P.browser.ie11 || e.onlyExternal || P.wrapper.classList.add("swiper-wp8-" + (R ? "horizontal" : "vertical")), e.freeMode && (P.container.className += " swiper-free-mode"), P.initialized = !1, P.init = function(t, i) {
            var n = P.h.getWidth(P.container, !1, e.roundLengths),
                s = P.h.getHeight(P.container, !1, e.roundLengths);
            if (n !== P.width || s !== P.height || t) {
                P.width = n, P.height = s;
                var o, r, a, l, c, u, h;
                F = R ? n : s;
                var d = P.wrapper;
                if (t && P.calcSlides(i), "auto" === e.slidesPerView) {
                    var p = 0,
                        f = 0;
                    e.slidesOffset > 0 && (d.style.paddingLeft = "", d.style.paddingRight = "", d.style.paddingTop = "", d.style.paddingBottom = ""), d.style.width = "", d.style.height = "", e.offsetPxBefore > 0 && (R ? P.wrapperLeft = e.offsetPxBefore : P.wrapperTop = e.offsetPxBefore), e.offsetPxAfter > 0 && (R ? P.wrapperRight = e.offsetPxAfter : P.wrapperBottom = e.offsetPxAfter), e.centeredSlides && (R ? (P.wrapperLeft = (F - this.slides[0].getWidth(!0, e.roundLengths)) / 2, P.wrapperRight = (F - P.slides[P.slides.length - 1].getWidth(!0, e.roundLengths)) / 2) : (P.wrapperTop = (F - P.slides[0].getHeight(!0, e.roundLengths)) / 2, P.wrapperBottom = (F - P.slides[P.slides.length - 1].getHeight(!0, e.roundLengths)) / 2)), R ? (P.wrapperLeft >= 0 && (d.style.paddingLeft = P.wrapperLeft + "px"), P.wrapperRight >= 0 && (d.style.paddingRight = P.wrapperRight + "px")) : (P.wrapperTop >= 0 && (d.style.paddingTop = P.wrapperTop + "px"), P.wrapperBottom >= 0 && (d.style.paddingBottom = P.wrapperBottom + "px")), u = 0;
                    var m = 0;
                    for (P.snapGrid = [], P.slidesGrid = [], a = 0, h = 0; h < P.slides.length; h++) {
                        o = P.slides[h].getWidth(!0, e.roundLengths), r = P.slides[h].getHeight(!0, e.roundLengths), e.calculateHeight && (a = Math.max(a, r));
                        var g = R ? o : r;
                        if (e.centeredSlides) {
                            var v = h === P.slides.length - 1 ? 0 : P.slides[h + 1].getWidth(!0, e.roundLengths),
                                y = h === P.slides.length - 1 ? 0 : P.slides[h + 1].getHeight(!0, e.roundLengths),
                                b = R ? v : y;
                            if (g > F) {
                                if (e.slidesPerViewFit) P.snapGrid.push(u + P.wrapperLeft), P.snapGrid.push(u + g - F + P.wrapperLeft);
                                else
                                    for (var w = 0; w <= Math.floor(g / (F + P.wrapperLeft)); w++) P.snapGrid.push(0 === w ? u + P.wrapperLeft : u + P.wrapperLeft + F * w);
                                P.slidesGrid.push(u + P.wrapperLeft)
                            } else P.snapGrid.push(m), P.slidesGrid.push(m);
                            m += g / 2 + b / 2
                        } else {
                            if (g > F)
                                if (e.slidesPerViewFit) P.snapGrid.push(u), P.snapGrid.push(u + g - F);
                                else if (0 !== F)
                                for (var x = 0; x <= Math.floor(g / F); x++) P.snapGrid.push(u + F * x);
                            else P.snapGrid.push(u);
                            else P.snapGrid.push(u);
                            P.slidesGrid.push(u)
                        }
                        u += g, p += o, f += r
                    }
                    e.calculateHeight && (P.height = a), R ? (A = p + P.wrapperRight + P.wrapperLeft, e.cssWidthAndHeight && "height" !== e.cssWidthAndHeight || (d.style.width = p + "px"), e.cssWidthAndHeight && "width" !== e.cssWidthAndHeight || (d.style.height = P.height + "px")) : (e.cssWidthAndHeight && "height" !== e.cssWidthAndHeight || (d.style.width = P.width + "px"), e.cssWidthAndHeight && "width" !== e.cssWidthAndHeight || (d.style.height = f + "px"), A = f + P.wrapperTop + P.wrapperBottom)
                } else if (e.scrollContainer) d.style.width = "", d.style.height = "", l = P.slides[0].getWidth(!0, e.roundLengths), c = P.slides[0].getHeight(!0, e.roundLengths), A = R ? l : c, d.style.width = l + "px", d.style.height = c + "px", D = R ? l : c;
                else {
                    if (e.calculateHeight) {
                        for (a = 0, c = 0, R || (P.container.style.height = ""), d.style.height = "", h = 0; h < P.slides.length; h++) P.slides[h].style.height = "", a = Math.max(P.slides[h].getHeight(!0), a), R || (c += P.slides[h].getHeight(!0));
                        r = a, P.height = r, R ? c = r : (F = r, P.container.style.height = F + "px")
                    } else r = R ? P.height : P.height / e.slidesPerView, e.roundLengths && (r = Math.ceil(r)), c = R ? P.height : P.slides.length * r;
                    for (o = R ? P.width / e.slidesPerView : P.width, e.roundLengths && (o = Math.ceil(o)), l = R ? P.slides.length * o : P.width, D = R ? o : r, e.offsetSlidesBefore > 0 && (R ? P.wrapperLeft = D * e.offsetSlidesBefore : P.wrapperTop = D * e.offsetSlidesBefore), e.offsetSlidesAfter > 0 && (R ? P.wrapperRight = D * e.offsetSlidesAfter : P.wrapperBottom = D * e.offsetSlidesAfter), e.offsetPxBefore > 0 && (R ? P.wrapperLeft = e.offsetPxBefore : P.wrapperTop = e.offsetPxBefore), e.offsetPxAfter > 0 && (R ? P.wrapperRight = e.offsetPxAfter : P.wrapperBottom = e.offsetPxAfter), e.centeredSlides && (R ? (P.wrapperLeft = (F - D) / 2, P.wrapperRight = (F - D) / 2) : (P.wrapperTop = (F - D) / 2, P.wrapperBottom = (F - D) / 2)), R ? (P.wrapperLeft > 0 && (d.style.paddingLeft = P.wrapperLeft + "px"), P.wrapperRight > 0 && (d.style.paddingRight = P.wrapperRight + "px")) : (P.wrapperTop > 0 && (d.style.paddingTop = P.wrapperTop + "px"), P.wrapperBottom > 0 && (d.style.paddingBottom = P.wrapperBottom + "px")), A = R ? l + P.wrapperRight + P.wrapperLeft : c + P.wrapperTop + P.wrapperBottom, parseFloat(l) > 0 && (!e.cssWidthAndHeight || "height" === e.cssWidthAndHeight) && (d.style.width = l + "px"), parseFloat(c) > 0 && (!e.cssWidthAndHeight || "width" === e.cssWidthAndHeight) && (d.style.height = c + "px"), u = 0, P.snapGrid = [], P.slidesGrid = [], h = 0; h < P.slides.length; h++) P.snapGrid.push(u), P.slidesGrid.push(u), u += D, parseFloat(o) > 0 && (!e.cssWidthAndHeight || "height" === e.cssWidthAndHeight) && (P.slides[h].style.width = o + "px"), parseFloat(r) > 0 && (!e.cssWidthAndHeight || "width" === e.cssWidthAndHeight) && (P.slides[h].style.height = r + "px")
                }
                P.initialized ? (P.callPlugins("onInit"), e.onInit && P.fireCallback(e.onInit, P)) : (P.callPlugins("onFirstInit"), e.onFirstInit && P.fireCallback(e.onFirstInit, P)), P.initialized = !0
            }
        }, P.reInit = function(t) {
            P.init(!0, t)
        }, P.resizeFix = function(t) {
            P.callPlugins("beforeResizeFix"), P.init(e.resizeReInit || t), e.freeMode ? P.getWrapperTranslate() < -s() && (P.setWrapperTransition(0), P.setWrapperTranslate(-s())) : (P.swipeTo(e.loop ? P.activeLoopIndex : P.activeIndex, 0, !1), e.autoplay && (P.support.transitions && "undefined" != typeof te ? "undefined" != typeof te && (clearTimeout(te), te = void 0, P.startAutoplay()) : "undefined" != typeof ee && (clearInterval(ee), ee = void 0, P.startAutoplay()))), P.callPlugins("afterResizeFix")
        }, P.destroy = function(t) {
            var i = P.h.removeEventListener,
                n = "wrapper" === e.eventTarget ? P.wrapper : P.container;
            if (P.browser.ie10 || P.browser.ie11 ? (i(n, P.touchEvents.touchStart, m), i(document, P.touchEvents.touchMove, g), i(document, P.touchEvents.touchEnd, v)) : (P.support.touch && (i(n, "touchstart", m), i(n, "touchmove", g), i(n, "touchend", v)), e.simulateTouch && (i(n, "mousedown", m), i(document, "mousemove", g), i(document, "mouseup", v))), e.autoResize && i(window, "resize", P.resizeFix), a(), e.paginationClickable && C(), e.mousewheelControl && P._wheelEvent && i(P.container, P._wheelEvent, c), e.keyboardControl && i(document, "keydown", l), e.autoplay && P.stopAutoplay(), t) {
                P.wrapper.removeAttribute("style");
                for (var s = 0; s < P.slides.length; s++) P.slides[s].removeAttribute("style")
            }
            P.callPlugins("onDestroy"), window.jQuery && window.jQuery(P.container).data("swiper") && window.jQuery(P.container).removeData("swiper"), window.Zepto && window.Zepto(P.container).data("swiper") && window.Zepto(P.container).removeData("swiper"), P = null
        }, P.disableKeyboardControl = function() {
            e.keyboardControl = !1, P.h.removeEventListener(document, "keydown", l)
        }, P.enableKeyboardControl = function() {
            e.keyboardControl = !0, P.h.addEventListener(document, "keydown", l)
        };
        var U = (new Date).getTime();
        if (P.disableMousewheelControl = function() {
            return P._wheelEvent ? (e.mousewheelControl = !1, P.h.removeEventListener(P.container, P._wheelEvent, c), !0) : !1
        }, P.enableMousewheelControl = function() {
            return P._wheelEvent ? (e.mousewheelControl = !0, P.h.addEventListener(P.container, P._wheelEvent, c), !0) : !1
        }, e.grabCursor) {
            var Y = P.container.style;
            Y.cursor = "move", Y.cursor = "grab", Y.cursor = "-moz-grab", Y.cursor = "-webkit-grab"
        }
        P.allowSlideClick = !0, P.allowLinks = !0;
        var Q, G, Z, K = !1,
            J = !0;
        P.swipeNext = function(t, i) {
            "undefined" == typeof t && (t = !0), !i && e.loop && P.fixLoop(), !i && e.autoplay && P.stopAutoplay(!0), P.callPlugins("onSwipeNext");
            var n = P.getWrapperTranslate().toFixed(2),
                o = n;
            if ("auto" === e.slidesPerView) {
                for (var r = 0; r < P.snapGrid.length; r++)
                    if (-n >= P.snapGrid[r].toFixed(2) && -n < P.snapGrid[r + 1].toFixed(2)) {
                        o = -P.snapGrid[r + 1];
                        break
                    }
            } else {
                var a = D * e.slidesPerGroup;
                o = -(Math.floor(Math.abs(n) / Math.floor(a)) * a + a)
            }
            return o < -s() && (o = -s()), o === n ? !1 : (x(o, "next", {
                runCallbacks: t
            }), !0)
        }, P.swipePrev = function(t, i) {
            "undefined" == typeof t && (t = !0), !i && e.loop && P.fixLoop(), !i && e.autoplay && P.stopAutoplay(!0), P.callPlugins("onSwipePrev");
            var n, s = Math.ceil(P.getWrapperTranslate());
            if ("auto" === e.slidesPerView) {
                n = 0;
                for (var o = 1; o < P.snapGrid.length; o++) {
                    if (-s === P.snapGrid[o]) {
                        n = -P.snapGrid[o - 1];
                        break
                    }
                    if (-s > P.snapGrid[o] && -s < P.snapGrid[o + 1]) {
                        n = -P.snapGrid[o];
                        break
                    }
                }
            } else {
                var r = D * e.slidesPerGroup;
                n = -(Math.ceil(-s / r) - 1) * r
            }
            return n > 0 && (n = 0), n === s ? !1 : (x(n, "prev", {
                runCallbacks: t
            }), !0)
        }, P.swipeReset = function(t) {
            "undefined" == typeof t && (t = !0), P.callPlugins("onSwipeReset");
            var i, n = P.getWrapperTranslate(),
                o = D * e.slidesPerGroup;
            if (-s(), "auto" === e.slidesPerView) {
                i = 0;
                for (var r = 0; r < P.snapGrid.length; r++) {
                    if (-n === P.snapGrid[r]) return;
                    if (-n >= P.snapGrid[r] && -n < P.snapGrid[r + 1]) {
                        i = P.positions.diff > 0 ? -P.snapGrid[r + 1] : -P.snapGrid[r];
                        break
                    }
                } - n >= P.snapGrid[P.snapGrid.length - 1] && (i = -P.snapGrid[P.snapGrid.length - 1]), n <= -s() && (i = -s())
            } else i = 0 > n ? Math.round(n / o) * o : 0, n <= -s() && (i = -s());
            return e.scrollContainer && (i = 0 > n ? n : 0), i < -s() && (i = -s()), e.scrollContainer && F > D && (i = 0), i === n ? !1 : (x(i, "reset", {
                runCallbacks: t
            }), !0)
        }, P.swipeTo = function(t, i, n) {
            t = parseInt(t, 10), P.callPlugins("onSwipeTo", {
                index: t,
                speed: i
            }), e.loop && (t += P.loopedSlides);
            var o = P.getWrapperTranslate();
            if (!(t > P.slides.length - 1 || 0 > t)) {
                var r;
                return r = "auto" === e.slidesPerView ? -P.slidesGrid[t] : -t * D, r < -s() && (r = -s()), r === o ? !1 : ("undefined" == typeof n && (n = !0), x(r, "to", {
                    index: t,
                    speed: i,
                    runCallbacks: n
                }), !0)
            }
        }, P._queueStartCallbacks = !1, P._queueEndCallbacks = !1, P.updateActiveSlide = function(t) {
            if (P.initialized && 0 !== P.slides.length) {
                P.previousIndex = P.activeIndex, "undefined" == typeof t && (t = P.getWrapperTranslate()), t > 0 && (t = 0);
                var i;
                if ("auto" === e.slidesPerView) {
                    if (P.activeIndex = P.slidesGrid.indexOf(-t), P.activeIndex < 0) {
                        for (i = 0; i < P.slidesGrid.length - 1 && !(-t > P.slidesGrid[i] && -t < P.slidesGrid[i + 1]); i++);
                        var n = Math.abs(P.slidesGrid[i] + t),
                            s = Math.abs(P.slidesGrid[i + 1] + t);
                        P.activeIndex = s >= n ? i : i + 1
                    }
                } else P.activeIndex = Math[e.visibilityFullFit ? "ceil" : "round"](-t / D); if (P.activeIndex === P.slides.length && (P.activeIndex = P.slides.length - 1), P.activeIndex < 0 && (P.activeIndex = 0), P.slides[P.activeIndex]) {
                    if (P.calcVisibleSlides(t), P.support.classList) {
                        var o;
                        for (i = 0; i < P.slides.length; i++) o = P.slides[i], o.classList.remove(e.slideActiveClass), P.visibleSlides.indexOf(o) >= 0 ? o.classList.add(e.slideVisibleClass) : o.classList.remove(e.slideVisibleClass);
                        P.slides[P.activeIndex].classList.add(e.slideActiveClass)
                    } else {
                        var r = new RegExp("\\s*" + e.slideActiveClass),
                            a = new RegExp("\\s*" + e.slideVisibleClass);
                        for (i = 0; i < P.slides.length; i++) P.slides[i].className = P.slides[i].className.replace(r, "").replace(a, ""), P.visibleSlides.indexOf(P.slides[i]) >= 0 && (P.slides[i].className += " " + e.slideVisibleClass);
                        P.slides[P.activeIndex].className += " " + e.slideActiveClass
                    } if (e.loop) {
                        var l = P.loopedSlides;
                        P.activeLoopIndex = P.activeIndex - l, P.activeLoopIndex >= P.slides.length - 2 * l && (P.activeLoopIndex = P.slides.length - 2 * l - P.activeLoopIndex), P.activeLoopIndex < 0 && (P.activeLoopIndex = P.slides.length - 2 * l + P.activeLoopIndex), P.activeLoopIndex < 0 && (P.activeLoopIndex = 0)
                    } else P.activeLoopIndex = P.activeIndex;
                    e.pagination && P.updatePagination(t)
                }
            }
        }, P.createPagination = function(t) {
            if (e.paginationClickable && P.paginationButtons && C(), P.paginationContainer = e.pagination.nodeType ? e.pagination : i(e.pagination)[0], e.createPagination) {
                var n = "",
                    s = P.slides.length,
                    o = s;
                e.loop && (o -= 2 * P.loopedSlides);
                for (var r = 0; o > r; r++) n += "<" + e.paginationElement + ' class="' + e.paginationElementClass + '"></' + e.paginationElement + ">";
                P.paginationContainer.innerHTML = n
            }
            P.paginationButtons = i("." + e.paginationElementClass, P.paginationContainer), t || P.updatePagination(), P.callPlugins("onCreatePagination"), e.paginationClickable && S()
        }, P.updatePagination = function(t) {
            if (e.pagination && !(P.slides.length < 1)) {
                var n = i("." + e.paginationActiveClass, P.paginationContainer);
                if (n) {
                    var s = P.paginationButtons;
                    if (0 !== s.length) {
                        for (var o = 0; o < s.length; o++) s[o].className = e.paginationElementClass;
                        var r = e.loop ? P.loopedSlides : 0;
                        if (e.paginationAsRange) {
                            P.visibleSlides || P.calcVisibleSlides(t);
                            var a, l = [];
                            for (a = 0; a < P.visibleSlides.length; a++) {
                                var c = P.slides.indexOf(P.visibleSlides[a]) - r;
                                e.loop && 0 > c && (c = P.slides.length - 2 * P.loopedSlides + c), e.loop && c >= P.slides.length - 2 * P.loopedSlides && (c = P.slides.length - 2 * P.loopedSlides - c, c = Math.abs(c)), l.push(c)
                            }
                            for (a = 0; a < l.length; a++) s[l[a]] && (s[l[a]].className += " " + e.paginationVisibleClass);
                            e.loop ? void 0 !== s[P.activeLoopIndex] && (s[P.activeLoopIndex].className += " " + e.paginationActiveClass) : s[P.activeIndex] && (s[P.activeIndex].className += " " + e.paginationActiveClass)
                        } else e.loop ? s[P.activeLoopIndex] && (s[P.activeLoopIndex].className += " " + e.paginationActiveClass + " " + e.paginationVisibleClass) : s[P.activeIndex] && (s[P.activeIndex].className += " " + e.paginationActiveClass + " " + e.paginationVisibleClass)
                    }
                }
            }
        }, P.calcVisibleSlides = function(t) {
            var i = [],
                n = 0,
                s = 0,
                o = 0;
            R && P.wrapperLeft > 0 && (t += P.wrapperLeft), !R && P.wrapperTop > 0 && (t += P.wrapperTop);
            for (var r = 0; r < P.slides.length; r++) {
                n += s, s = "auto" === e.slidesPerView ? R ? P.h.getWidth(P.slides[r], !0, e.roundLengths) : P.h.getHeight(P.slides[r], !0, e.roundLengths) : D, o = n + s;
                var a = !1;
                e.visibilityFullFit ? (n >= -t && -t + F >= o && (a = !0), -t >= n && o >= -t + F && (a = !0)) : (o > -t && -t + F >= o && (a = !0), n >= -t && -t + F > n && (a = !0), -t > n && o > -t + F && (a = !0)), a && i.push(P.slides[r])
            }
            0 === i.length && (i = [P.slides[P.activeIndex]]), P.visibleSlides = i
        };
        var te, ee;
        P.startAutoplay = function() {
            if (P.support.transitions) {
                if ("undefined" != typeof te) return !1;
                if (!e.autoplay) return;
                P.callPlugins("onAutoplayStart"), e.onAutoplayStart && P.fireCallback(e.onAutoplayStart, P), k()
            } else {
                if ("undefined" != typeof ee) return !1;
                if (!e.autoplay) return;
                P.callPlugins("onAutoplayStart"), e.onAutoplayStart && P.fireCallback(e.onAutoplayStart, P), ee = setInterval(function() {
                    e.loop ? (P.fixLoop(), P.swipeNext(!0, !0)) : P.swipeNext(!0, !0) || (e.autoplayStopOnLast ? (clearInterval(ee), ee = void 0) : P.swipeTo(0))
                }, e.autoplay)
            }
        }, P.stopAutoplay = function(t) {
            if (P.support.transitions) {
                if (!te) return;
                te && clearTimeout(te), te = void 0, t && !e.autoplayDisableOnInteraction && P.wrapperTransitionEnd(function() {
                    k()
                }), P.callPlugins("onAutoplayStop"), e.onAutoplayStop && P.fireCallback(e.onAutoplayStop, P)
            } else ee && clearInterval(ee), ee = void 0, P.callPlugins("onAutoplayStop"), e.onAutoplayStop && P.fireCallback(e.onAutoplayStop, P)
        }, P.loopCreated = !1, P.removeLoopedSlides = function() {
            if (P.loopCreated)
                for (var t = 0; t < P.slides.length; t++) P.slides[t].getData("looped") === !0 && P.wrapper.removeChild(P.slides[t])
        }, P.createLoop = function() {
            if (0 !== P.slides.length) {
                P.loopedSlides = "auto" === e.slidesPerView ? e.loopedSlides || 1 : e.slidesPerView + e.loopAdditionalSlides, P.loopedSlides > P.slides.length && (P.loopedSlides = P.slides.length);
                var t, i = "",
                    n = "",
                    s = "",
                    o = P.slides.length,
                    r = Math.floor(P.loopedSlides / o),
                    a = P.loopedSlides % o;
                for (t = 0; r * o > t; t++) {
                    var l = t;
                    if (t >= o) {
                        var c = Math.floor(t / o);
                        l = t - o * c
                    }
                    s += P.slides[l].outerHTML
                }
                for (t = 0; a > t; t++) n += w(e.slideDuplicateClass, P.slides[t].outerHTML);
                for (t = o - a; o > t; t++) i += w(e.slideDuplicateClass, P.slides[t].outerHTML);
                var u = i + s + I.innerHTML + s + n;
                for (I.innerHTML = u, P.loopCreated = !0, P.calcSlides(), t = 0; t < P.slides.length; t++)(t < P.loopedSlides || t >= P.slides.length - P.loopedSlides) && P.slides[t].setData("looped", !0);
                P.callPlugins("onCreateLoop")
            }
        }, P.fixLoop = function() {
            var t;
            P.activeIndex < P.loopedSlides ? (t = P.slides.length - 3 * P.loopedSlides + P.activeIndex, P.swipeTo(t, 0, !1)) : ("auto" === e.slidesPerView && P.activeIndex >= 2 * P.loopedSlides || P.activeIndex > P.slides.length - 2 * e.slidesPerView) && (t = -P.slides.length + P.activeIndex + P.loopedSlides, P.swipeTo(t, 0, !1))
        }, P.loadSlides = function() {
            var t = "";
            P.activeLoaderIndex = 0;
            for (var i = e.loader.slides, n = e.loader.loadAllSlides ? i.length : e.slidesPerView * (1 + e.loader.surroundGroups), s = 0; n > s; s++) t += "outer" === e.loader.slidesHTMLType ? i[s] : "<" + e.slideElement + ' class="' + e.slideClass + '" data-swiperindex="' + s + '">' + i[s] + "</" + e.slideElement + ">";
            P.wrapper.innerHTML = t, P.calcSlides(!0), e.loader.loadAllSlides || P.wrapperTransitionEnd(P.reloadSlides, !0)
        }, P.reloadSlides = function() {
            var t = e.loader.slides,
                i = parseInt(P.activeSlide().data("swiperindex"), 10);
            if (!(0 > i || i > t.length - 1)) {
                P.activeLoaderIndex = i;
                var n = Math.max(0, i - e.slidesPerView * e.loader.surroundGroups),
                    s = Math.min(i + e.slidesPerView * (1 + e.loader.surroundGroups) - 1, t.length - 1);
                if (i > 0) {
                    var o = -D * (i - n);
                    P.setWrapperTranslate(o), P.setWrapperTransition(0)
                }
                var r;
                if ("reload" === e.loader.logic) {
                    P.wrapper.innerHTML = "";
                    var a = "";
                    for (r = n; s >= r; r++) a += "outer" === e.loader.slidesHTMLType ? t[r] : "<" + e.slideElement + ' class="' + e.slideClass + '" data-swiperindex="' + r + '">' + t[r] + "</" + e.slideElement + ">";
                    P.wrapper.innerHTML = a
                } else {
                    var l = 1e3,
                        c = 0;
                    for (r = 0; r < P.slides.length; r++) {
                        var u = P.slides[r].data("swiperindex");
                        n > u || u > s ? P.wrapper.removeChild(P.slides[r]) : (l = Math.min(u, l), c = Math.max(u, c))
                    }
                    for (r = n; s >= r; r++) {
                        var h;
                        l > r && (h = document.createElement(e.slideElement), h.className = e.slideClass, h.setAttribute("data-swiperindex", r), h.innerHTML = t[r], P.wrapper.insertBefore(h, P.wrapper.firstChild)), r > c && (h = document.createElement(e.slideElement), h.className = e.slideClass, h.setAttribute("data-swiperindex", r), h.innerHTML = t[r], P.wrapper.appendChild(h))
                    }
                }
                P.reInit(!0)
            }
        }, E()
    }
};
if (Swiper.prototype = {
    plugins: {},
    wrapperTransitionEnd: function(t, e) {
        "use strict";

        function i(a) {
            if (a.target === o && (t(s), s.params.queueEndCallbacks && (s._queueEndCallbacks = !1), !e))
                for (n = 0; n < r.length; n++) s.h.removeEventListener(o, r[n], i)
        }
        var n, s = this,
            o = s.wrapper,
            r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
        if (t)
            for (n = 0; n < r.length; n++) s.h.addEventListener(o, r[n], i)
    },
    getWrapperTranslate: function(t) {
        "use strict";
        var e, i, n, s, o = this.wrapper;
        return "undefined" == typeof t && (t = "horizontal" === this.params.mode ? "x" : "y"), this.support.transforms && this.params.useCSS3Transforms ? (n = window.getComputedStyle(o, null), window.WebKitCSSMatrix ? s = new WebKitCSSMatrix("none" === n.webkitTransform ? "" : n.webkitTransform) : (s = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), e = s.toString().split(",")), "x" === t && (i = window.WebKitCSSMatrix ? s.m41 : parseFloat(16 === e.length ? e[12] : e[4])), "y" === t && (i = window.WebKitCSSMatrix ? s.m42 : parseFloat(16 === e.length ? e[13] : e[5]))) : ("x" === t && (i = parseFloat(o.style.left, 10) || 0), "y" === t && (i = parseFloat(o.style.top, 10) || 0)), i || 0
    },
    setWrapperTranslate: function(t, e, i) {
        "use strict";
        var n, s = this.wrapper.style,
            o = {
                x: 0,
                y: 0,
                z: 0
            };
        3 === arguments.length ? (o.x = t, o.y = e, o.z = i) : ("undefined" == typeof e && (e = "horizontal" === this.params.mode ? "x" : "y"), o[e] = t), this.support.transforms && this.params.useCSS3Transforms ? (n = this.support.transforms3d ? "translate3d(" + o.x + "px, " + o.y + "px, " + o.z + "px)" : "translate(" + o.x + "px, " + o.y + "px)", s.webkitTransform = s.MsTransform = s.msTransform = s.MozTransform = s.OTransform = s.transform = n) : (s.left = o.x + "px", s.top = o.y + "px"), this.callPlugins("onSetWrapperTransform", o), this.params.onSetWrapperTransform && this.fireCallback(this.params.onSetWrapperTransform, this, o)
    },
    setWrapperTransition: function(t) {
        "use strict";
        var e = this.wrapper.style;
        e.webkitTransitionDuration = e.MsTransitionDuration = e.msTransitionDuration = e.MozTransitionDuration = e.OTransitionDuration = e.transitionDuration = t / 1e3 + "s", this.callPlugins("onSetWrapperTransition", {
            duration: t
        }), this.params.onSetWrapperTransition && this.fireCallback(this.params.onSetWrapperTransition, this, t)
    },
    h: {
        getWidth: function(t, e, i) {
            "use strict";
            var n = window.getComputedStyle(t, null).getPropertyValue("width"),
                s = parseFloat(n);
            return (isNaN(s) || n.indexOf("%") > 0 || 0 > s) && (s = t.offsetWidth - parseFloat(window.getComputedStyle(t, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(t, null).getPropertyValue("padding-right"))), e && (s += parseFloat(window.getComputedStyle(t, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(t, null).getPropertyValue("padding-right"))), i ? Math.ceil(s) : s
        },
        getHeight: function(t, e, i) {
            "use strict";
            if (e) return t.offsetHeight;
            var n = window.getComputedStyle(t, null).getPropertyValue("height"),
                s = parseFloat(n);
            return (isNaN(s) || n.indexOf("%") > 0 || 0 > s) && (s = t.offsetHeight - parseFloat(window.getComputedStyle(t, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(t, null).getPropertyValue("padding-bottom"))), e && (s += parseFloat(window.getComputedStyle(t, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(t, null).getPropertyValue("padding-bottom"))), i ? Math.ceil(s) : s
        },
        getOffset: function(t) {
            "use strict";
            var e = t.getBoundingClientRect(),
                i = document.body,
                n = t.clientTop || i.clientTop || 0,
                s = t.clientLeft || i.clientLeft || 0,
                o = window.pageYOffset || t.scrollTop,
                r = window.pageXOffset || t.scrollLeft;
            return document.documentElement && !window.pageYOffset && (o = document.documentElement.scrollTop, r = document.documentElement.scrollLeft), {
                top: e.top + o - n,
                left: e.left + r - s
            }
        },
        windowWidth: function() {
            "use strict";
            return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : void 0
        },
        windowHeight: function() {
            "use strict";
            return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : void 0
        },
        windowScroll: function() {
            "use strict";
            return "undefined" != typeof pageYOffset ? {
                left: window.pageXOffset,
                top: window.pageYOffset
            } : document.documentElement ? {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            } : void 0
        },
        addEventListener: function(t, e, i, n) {
            "use strict";
            "undefined" == typeof n && (n = !1), t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
        },
        removeEventListener: function(t, e, i, n) {
            "use strict";
            "undefined" == typeof n && (n = !1), t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
        }
    },
    setTransform: function(t, e) {
        "use strict";
        var i = t.style;
        i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
    },
    setTranslate: function(t, e) {
        "use strict";
        var i = t.style,
            n = {
                x: e.x || 0,
                y: e.y || 0,
                z: e.z || 0
            },
            s = this.support.transforms3d ? "translate3d(" + n.x + "px," + n.y + "px," + n.z + "px)" : "translate(" + n.x + "px," + n.y + "px)";
        i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = s, this.support.transforms || (i.left = n.x + "px", i.top = n.y + "px")
    },
    setTransition: function(t, e) {
        "use strict";
        var i = t.style;
        i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e + "ms"
    },
    support: {
        touch: window.Modernizr && Modernizr.touch === !0 || function() {
            "use strict";
            return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
        }(),
        transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
            "use strict";
            var t = document.createElement("div").style;
            return "webkitPerspective" in t || "MozPerspective" in t || "OPerspective" in t || "MsPerspective" in t || "perspective" in t
        }(),
        transforms: window.Modernizr && Modernizr.csstransforms === !0 || function() {
            "use strict";
            var t = document.createElement("div").style;
            return "transform" in t || "WebkitTransform" in t || "MozTransform" in t || "msTransform" in t || "MsTransform" in t || "OTransform" in t
        }(),
        transitions: window.Modernizr && Modernizr.csstransitions === !0 || function() {
            "use strict";
            var t = document.createElement("div").style;
            return "transition" in t || "WebkitTransition" in t || "MozTransition" in t || "msTransition" in t || "MsTransition" in t || "OTransition" in t
        }(),
        classList: function() {
            "use strict";
            var t = document.createElement("div");
            return "classList" in t
        }()
    },
    browser: {
        ie8: function() {
            "use strict";
            var t = -1;
            if ("Microsoft Internet Explorer" === navigator.appName) {
                var e = navigator.userAgent,
                    i = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
                null !== i.exec(e) && (t = parseFloat(RegExp.$1))
            }
            return -1 !== t && 9 > t
        }(),
        ie10: window.navigator.msPointerEnabled,
        ie11: window.navigator.pointerEnabled
    }
}, (window.jQuery || window.Zepto) && ! function(t) {
    "use strict";
    t.fn.swiper = function(e) {
        var i;
        return this.each(function(n) {
            var s = t(this),
                o = new Swiper(s[0], e);
            n || (i = o), s.data("swiper", o)
        }), i
    }
}(window.jQuery || window.Zepto), "undefined" != typeof module && (module.exports = Swiper), "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return Swiper
}), function(t) {
    function e(t) {
        return "string" == typeof t
    }

    function i(t) {
        var e = x.call(arguments, 1);
        return function() {
            return t.apply(this, e.concat(x.call(arguments)))
        }
    }

    function n(t) {
        return t.replace(v, "$2")
    }

    function s(t) {
        return t.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    }

    function o(i, n, s, o, r) {
        var a, u, d, p, f;
        return o !== l ? (d = s.match(i ? v : /^([^#?]*)\??([^#]*)(#?.*)/), f = d[3] || "", 2 === r && e(o) ? u = o.replace(i ? g : A, "") : (p = h(d[2]), o = e(o) ? h[i ? L : E](o) : o, u = 2 === r ? o : 1 === r ? t.extend({}, o, p) : t.extend({}, p, o), u = c(u), i && (u = u.replace(y, _))), a = d[1] + (i ? w : u || !d[1] ? "?" : "") + u + f) : a = n(s !== l ? s : location.href), a
    }

    function r(t, i, n) {
        return i === l || "boolean" == typeof i ? (n = i, i = C[t ? L : E]()) : i = e(i) ? i.replace(t ? g : A, "") : i, h(i, n)
    }

    function a(i, n, s, o) {
        return e(s) || "object" == typeof s || (o = s, s = n, n = l), this.each(function() {
            var e = t(this),
                r = n || m()[(this.nodeName || "").toLowerCase()] || "",
                a = r && e.attr(r) || "";
            e.attr(r, C[i](a, s, o))
        })
    }
    var l, c, u, h, d, p, f, m, g, v, y, b, w, x = Array.prototype.slice,
        _ = decodeURIComponent,
        C = t.param,
        S = t.bbq = t.bbq || {},
        T = t.event.special,
        k = "hashchange",
        E = "querystring",
        L = "fragment",
        P = "elemUrlAttr",
        I = "href",
        D = "src",
        A = /^.*\?|#.*$/g,
        M = {};
    C[E] = i(o, 0, s), C[L] = u = i(o, 1, n), C.sorted = c = function(e, i) {
        var n = [],
            s = {};
        return t.each(C(e, i).split("&"), function(t, e) {
            var i = e.replace(/(?:%5B|=).*$/, ""),
                o = s[i];
            o || (o = s[i] = [], n.push(i)), o.push(e)
        }), t.map(n.sort(), function(t) {
            return s[t]
        }).join("&")
    }, u.noEscape = function(e) {
        e = e || "";
        var i = t.map(e.split(""), encodeURIComponent);
        y = new RegExp(i.join("|"), "g")
    }, u.noEscape(",/"), u.ajaxCrawlable = function(t) {
        return t !== l && (t ? (g = /^.*(?:#!|#)/, v = /^([^#]*)(?:#!|#)?(.*)$/, w = "#!") : (g = /^.*#/, v = /^([^#]*)#?(.*)$/, w = "#"), b = !!t), b
    }, u.ajaxCrawlable(0), t.deparam = h = function(e, i) {
        var n = {},
            s = {
                "true": !0,
                "false": !1,
                "null": null
            };
        return t.each(e.replace(/\+/g, " ").split("&"), function(e, o) {
            var r, a = o.split("="),
                c = _(a[0]),
                u = n,
                h = 0,
                d = c.split("]["),
                p = d.length - 1;
            if (/\[/.test(d[0]) && /\]$/.test(d[p]) ? (d[p] = d[p].replace(/\]$/, ""), d = d.shift().split("[").concat(d), p = d.length - 1) : p = 0, 2 === a.length)
                if (r = _(a[1]), i && (r = r && !isNaN(r) ? +r : "undefined" === r ? l : s[r] !== l ? s[r] : r), p)
                    for (; p >= h; h++) c = "" === d[h] ? u.length : d[h], u = u[c] = p > h ? u[c] || (d[h + 1] && isNaN(d[h + 1]) ? {} : []) : r;
                else t.isArray(n[c]) ? n[c].push(r) : n[c] = n[c] !== l ? [n[c], r] : r;
            else c && (n[c] = i ? l : "")
        }), n
    }, h[E] = i(r, 0), h[L] = d = i(r, 1), t[P] || (t[P] = function(e) {
        return t.extend(M, e)
    })({
        a: I,
        base: I,
        iframe: D,
        img: D,
        input: D,
        form: "action",
        link: I,
        script: D
    }), m = t[P], t.fn[E] = i(a, E), t.fn[L] = i(a, L), S.pushState = p = function(t, i) {
        e(t) && /^#/.test(t) && i === l && (i = 2);
        var n = t !== l,
            s = u(location.href, n ? t : {}, n ? i : 2);
        location.href = s
    }, S.getState = f = function(t, e) {
        return t === l || "boolean" == typeof t ? d(t) : d(e)[t]
    }, S.removeState = function(e) {
        var i = {};
        e !== l && (i = f(), t.each(t.isArray(e) ? e : arguments, function(t, e) {
            delete i[e]
        })), p(i, 2)
    }, T[k] = t.extend(T[k], {
        add: function(e) {
            function i(t) {
                var e = t[L] = u();
                t.getState = function(t, i) {
                    return t === l || "boolean" == typeof t ? h(e, t) : h(e, i)[t]
                }, n.apply(this, arguments)
            }
            var n;
            return t.isFunction(e) ? (n = e, i) : (n = e.handler, void(e.handler = i))
        }
    })
}(jQuery, this), function(t, e, i) {
    "$:nomunge";

    function n(t) {
        return t = t || location.href, "#" + t.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var s, o = "hashchange",
        r = document,
        a = t.event.special,
        l = r.documentMode,
        c = "on" + o in e && (l === i || l > 7);
    t.fn[o] = function(t) {
        return t ? this.bind(o, t) : this.trigger(o)
    }, t.fn[o].delay = 50, a[o] = t.extend(a[o], {
        setup: function() {
            return c ? !1 : void t(s.start)
        },
        teardown: function() {
            return c ? !1 : void t(s.stop)
        }
    }), s = function() {
        function s() {
            var i = n(),
                r = p(u);
            i !== u ? (d(u = i, r), t(e).trigger(o)) : r !== u && (location.href = location.href.replace(/#.*/, "") + r), a = setTimeout(s, t.fn[o].delay)
        }
        var a, l = {},
            u = n(),
            h = function(t) {
                return t
            },
            d = h,
            p = h;
        return l.start = function() {
            a || s()
        }, l.stop = function() {
            a && clearTimeout(a), a = i
        }, "Microsoft Internet Explorer" === navigator.appName && !c && function() {
            var e, i;
            l.start = function() {
                e || (i = t.fn[o].src, i = i && i + n(), e = t('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    i || d(n()), s()
                }).attr("src", i || "javascript:0").insertAfter("body")[0].contentWindow, r.onpropertychange = function() {
                    try {
                        "title" === event.propertyName && (e.document.title = r.title)
                    } catch (t) {}
                })
            }, l.stop = h, p = function() {
                return n(e.location.href)
            }, d = function(i, n) {
                var s = e.document,
                    a = t.fn[o].domain;
                i !== n && (s.title = r.title, s.open(), a && s.write('<script>document.domain="' + a + '"</script>'), s.close(), e.location.hash = i)
            }
        }(), l
    }()
}(jQuery, this), function(t) {
    t(["jquery"], function(t) {
        return function() {
            function e(t, e, i) {
                return f({
                    type: x.error,
                    iconClass: m().iconClasses.error,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }

            function i(e, i) {
                return e || (e = m()), v = t("#" + e.containerId), v.length ? v : (i && (v = h(e)), v)
            }

            function n(t, e, i) {
                return f({
                    type: x.info,
                    iconClass: m().iconClasses.info,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }

            function s(t) {
                y = t
            }

            function o(t, e, i) {
                return f({
                    type: x.success,
                    iconClass: m().iconClasses.success,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }

            function r(t, e, i) {
                return f({
                    type: x.warning,
                    iconClass: m().iconClasses.warning,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }

            function a(t) {
                var e = m();
                v || i(e), u(t, e) || c(e)
            }

            function l(e) {
                var n = m();
                return v || i(n), e && 0 === t(":focus", e).length ? void g(e) : void(v.children().length && v.remove())
            }

            function c(e) {
                for (var i = v.children(), n = i.length - 1; n >= 0; n--) u(t(i[n]), e)
            }

            function u(e, i) {
                return e && 0 === t(":focus", e).length ? (e[i.hideMethod]({
                    duration: i.hideDuration,
                    easing: i.hideEasing,
                    complete: function() {
                        g(e)
                    }
                }), !0) : !1
            }

            function h(e) {
                return v = t("<div/>").attr("id", e.containerId).addClass(e.positionClass).attr("aria-live", "polite").attr("role", "alert"), v.appendTo(t(e.target)), v
            }

            function d() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-right",
                    timeOut: 5e3,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    target: "body",
                    closeHtml: "<button>&times;</button>",
                    newestOnTop: !0,
                    preventDuplicates: !1
                }
            }

            function p(t) {
                y && y(t)
            }

            function f(e) {
                function n(e) {
                    return !t(":focus", c).length || e ? c[r.hideMethod]({
                        duration: r.hideDuration,
                        easing: r.hideEasing,
                        complete: function() {
                            g(c), r.onHidden && "hidden" !== f.state && r.onHidden(), f.state = "hidden", f.endTime = new Date, p(f)
                        }
                    }) : void 0
                }

                function s() {
                    (r.timeOut > 0 || r.extendedTimeOut > 0) && (l = setTimeout(n, r.extendedTimeOut))
                }

                function o() {
                    clearTimeout(l), c.stop(!0, !0)[r.showMethod]({
                        duration: r.showDuration,
                        easing: r.showEasing
                    })
                }
                var r = m(),
                    a = e.iconClass || r.iconClass;
                if (r.preventDuplicates) {
                    if (e.message === b) return;
                    b = e.message
                }
                "undefined" != typeof e.optionsOverride && (r = t.extend(r, e.optionsOverride), a = e.optionsOverride.iconClass || a), w++, v = i(r, !0);
                var l = null,
                    c = t("<div/>"),
                    u = t("<div/>"),
                    h = t("<div/>"),
                    d = t(r.closeHtml),
                    f = {
                        toastId: w,
                        state: "visible",
                        startTime: new Date,
                        options: r,
                        map: e
                    };
                return e.iconClass && c.addClass(r.toastClass).addClass(a), e.title && (u.append(e.title).addClass(r.titleClass), c.append(u)), e.message && (h.append(e.message).addClass(r.messageClass), c.append(h)), r.closeButton && (d.addClass("toast-close-button").attr("role", "button"), c.prepend(d)), c.hide(), r.newestOnTop ? v.prepend(c) : v.append(c), c[r.showMethod]({
                    duration: r.showDuration,
                    easing: r.showEasing,
                    complete: r.onShown
                }), r.timeOut > 0 && (l = setTimeout(n, r.timeOut)), c.hover(o, s), !r.onclick && r.tapToDismiss && c.click(n), r.closeButton && d && d.click(function(t) {
                    t.stopPropagation ? t.stopPropagation() : void 0 !== t.cancelBubble && t.cancelBubble !== !0 && (t.cancelBubble = !0), n(!0)
                }), r.onclick && c.click(function() {
                    r.onclick(), n()
                }), p(f), r.debug && console && console.log(f), c
            }

            function m() {
                return t.extend({}, d(), _.options)
            }

            function g(t) {
                v || (v = i()), t.is(":visible") || (t.remove(), t = null, 0 === v.children().length && v.remove())
            }
            var v, y, b, w = 0,
                x = {
                    error: "error",
                    info: "info",
                    success: "success",
                    warning: "warning"
                },
                _ = {
                    clear: a,
                    remove: l,
                    error: e,
                    getContainer: i,
                    info: n,
                    options: {},
                    subscribe: s,
                    success: o,
                    version: "2.1.0",
                    warning: r
                };
            return _
        }()
    })
}("function" == typeof define && define.amd ? define : function(t, e) {
    "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : window.toastr = e(window.jQuery)
}), function() {
    "use strict";
    var t = this,
        e = t.Chart,
        i = function(t) {
            return this.canvas = t.canvas, this.ctx = t, this.width = t.canvas.width, this.height = t.canvas.height, this.aspectRatio = this.width / this.height, n.retinaScale(this), this
        };
    i.defaults = {
        global: {
            animation: !0,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            showScale: !0,
            scaleOverride: !1,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: !0,
            scaleLabel: "<%=value%>",
            scaleIntegersOnly: !0,
            scaleBeginAtZero: !1,
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            responsive: !1,
            maintainAspectRatio: !0,
            showTooltips: !0,
            customTooltips: !1,
            tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
            tooltipFillColor: "rgba(0,0,0,0.8)",
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipFontSize: 14,
            tooltipFontStyle: "normal",
            tooltipFontColor: "#fff",
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 14,
            tooltipTitleFontStyle: "bold",
            tooltipTitleFontColor: "#fff",
            tooltipYPadding: 6,
            tooltipXPadding: 6,
            tooltipCaretSize: 8,
            tooltipCornerRadius: 6,
            tooltipXOffset: 10,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            multiTooltipTemplate: "<%= value %>",
            multiTooltipKeyBackground: "#fff",
            onAnimationProgress: function() {},
            onAnimationComplete: function() {}
        }
    }, i.types = {};
    var n = i.helpers = {},
        s = n.each = function(t, e, i) {
            var n = Array.prototype.slice.call(arguments, 3);
            if (t)
                if (t.length === +t.length) {
                    var s;
                    for (s = 0; s < t.length; s++) e.apply(i, [t[s], s].concat(n))
                } else
                    for (var o in t) e.apply(i, [t[o], o].concat(n))
        },
        o = n.clone = function(t) {
            var e = {};
            return s(t, function(i, n) {
                t.hasOwnProperty(n) && (e[n] = i)
            }), e
        },
        r = n.extend = function(t) {
            return s(Array.prototype.slice.call(arguments, 1), function(e) {
                s(e, function(i, n) {
                    e.hasOwnProperty(n) && (t[n] = i)
                })
            }), t
        },
        a = n.merge = function() {
            var t = Array.prototype.slice.call(arguments, 0);
            return t.unshift({}), r.apply(null, t)
        },
        l = n.indexOf = function(t, e) {
            if (Array.prototype.indexOf) return t.indexOf(e);
            for (var i = 0; i < t.length; i++)
                if (t[i] === e) return i;
            return -1
        },
        c = (n.where = function(t, e) {
            var i = [];
            return n.each(t, function(t) {
                e(t) && i.push(t)
            }), i
        }, n.findNextWhere = function(t, e, i) {
            i || (i = -1);
            for (var n = i + 1; n < t.length; n++) {
                var s = t[n];
                if (e(s)) return s
            }
        }, n.findPreviousWhere = function(t, e, i) {
            i || (i = t.length);
            for (var n = i - 1; n >= 0; n--) {
                var s = t[n];
                if (e(s)) return s
            }
        }, n.inherits = function(t) {
            var e = this,
                i = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                    return e.apply(this, arguments)
                },
                n = function() {
                    this.constructor = i
                };
            return n.prototype = e.prototype, i.prototype = new n, i.extend = c, t && r(i.prototype, t), i.__super__ = e.prototype, i
        }),
        u = n.noop = function() {},
        h = n.uid = function() {
            var t = 0;
            return function() {
                return "chart-" + t++
            }
        }(),
        d = n.warn = function(t) {
            window.console && "function" == typeof window.console.warn && console.warn(t)
        },
        p = n.amd = "function" == typeof define && define.amd,
        f = n.isNumber = function(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        },
        m = n.max = function(t) {
            return Math.max.apply(Math, t)
        },
        g = n.min = function(t) {
            return Math.min.apply(Math, t)
        },
        v = (n.cap = function(t, e, i) {
            if (f(e)) {
                if (t > e) return e
            } else if (f(i) && i > t) return i;
            return t
        }, n.getDecimalPlaces = function(t) {
            return t % 1 !== 0 && f(t) ? t.toString().split(".")[1].length : 0
        }),
        y = n.radians = function(t) {
            return t * (Math.PI / 180)
        },
        b = (n.getAngleFromPoint = function(t, e) {
            var i = e.x - t.x,
                n = e.y - t.y,
                s = Math.sqrt(i * i + n * n),
                o = 2 * Math.PI + Math.atan2(n, i);
            return 0 > i && 0 > n && (o += 2 * Math.PI), {
                angle: o,
                distance: s
            }
        }, n.aliasPixel = function(t) {
            return t % 2 === 0 ? 0 : .5
        }),
        w = (n.splineCurve = function(t, e, i, n) {
            var s = Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)),
                o = Math.sqrt(Math.pow(i.x - e.x, 2) + Math.pow(i.y - e.y, 2)),
                r = n * s / (s + o),
                a = n * o / (s + o);
            return {
                inner: {
                    x: e.x - r * (i.x - t.x),
                    y: e.y - r * (i.y - t.y)
                },
                outer: {
                    x: e.x + a * (i.x - t.x),
                    y: e.y + a * (i.y - t.y)
                }
            }
        }, n.calculateOrderOfMagnitude = function(t) {
            return Math.floor(Math.log(t) / Math.LN10)
        }),
        x = (n.calculateScaleRange = function(t, e, i, n, s) {
            var o = 2,
                r = Math.floor(e / (1.5 * i)),
                a = o >= r,
                l = m(t),
                c = g(t);
            l === c && (l += .5, c >= .5 && !n ? c -= .5 : l += .5);
            for (var u = Math.abs(l - c), h = w(u), d = Math.ceil(l / (1 * Math.pow(10, h))) * Math.pow(10, h), p = n ? 0 : Math.floor(c / (1 * Math.pow(10, h))) * Math.pow(10, h), f = d - p, v = Math.pow(10, h), y = Math.round(f / v);
                (y > r || r > 2 * y) && !a;)
                if (y > r) v *= 2, y = Math.round(f / v), y % 1 !== 0 && (a = !0);
                else if (s && h >= 0) {
                if (v / 2 % 1 !== 0) break;
                v /= 2, y = Math.round(f / v)
            } else v /= 2, y = Math.round(f / v);
            return a && (y = o, v = f / y), {
                steps: y,
                stepValue: v,
                min: p,
                max: p + y * v
            }
        }, n.template = function(t, e) {
            function i(t, e) {
                var i = /\W/.test(t) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + t.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : n[t] = n[t];
                return e ? i(e) : i
            }
            if (t instanceof Function) return t(e);
            var n = {};
            return i(t, e)
        }),
        _ = (n.generateLabels = function(t, e, i, n) {
            var o = new Array(e);
            return labelTemplateString && s(o, function(e, s) {
                o[s] = x(t, {
                    value: i + n * (s + 1)
                })
            }), o
        }, n.easingEffects = {
            linear: function(t) {
                return t
            },
            easeInQuad: function(t) {
                return t * t
            },
            easeOutQuad: function(t) {
                return -1 * t * (t - 2)
            },
            easeInOutQuad: function(t) {
                return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            },
            easeInCubic: function(t) {
                return t * t * t
            },
            easeOutCubic: function(t) {
                return 1 * ((t = t / 1 - 1) * t * t + 1)
            },
            easeInOutCubic: function(t) {
                return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            },
            easeInQuart: function(t) {
                return t * t * t * t
            },
            easeOutQuart: function(t) {
                return -1 * ((t = t / 1 - 1) * t * t * t - 1)
            },
            easeInOutQuart: function(t) {
                return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            },
            easeInQuint: function(t) {
                return 1 * (t /= 1) * t * t * t * t
            },
            easeOutQuint: function(t) {
                return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
            },
            easeInOutQuint: function(t) {
                return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            },
            easeInSine: function(t) {
                return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
            },
            easeOutSine: function(t) {
                return 1 * Math.sin(t / 1 * (Math.PI / 2))
            },
            easeInOutSine: function(t) {
                return -.5 * (Math.cos(Math.PI * t / 1) - 1)
            },
            easeInExpo: function(t) {
                return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
            },
            easeOutExpo: function(t) {
                return 1 === t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
            },
            easeInOutExpo: function(t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (-Math.pow(2, -10 * --t) + 2)
            },
            easeInCirc: function(t) {
                return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
            },
            easeOutCirc: function(t) {
                return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
            },
            easeInOutCirc: function(t) {
                return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            },
            easeInElastic: function(t) {
                var e = 1.70158,
                    i = 0,
                    n = 1;
                return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (i || (i = .3), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (1 * t - e) * Math.PI / i)))
            },
            easeOutElastic: function(t) {
                var e = 1.70158,
                    i = 0,
                    n = 1;
                return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (i || (i = .3), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, -10 * t) * Math.sin(2 * (1 * t - e) * Math.PI / i) + 1)
            },
            easeInOutElastic: function(t) {
                var e = 1.70158,
                    i = 0,
                    n = 1;
                return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (i || (i = .3 * 1.5), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), 1 > t ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (1 * t - e) * Math.PI / i) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (1 * t - e) * Math.PI / i) * .5 + 1)
            },
            easeInBack: function(t) {
                var e = 1.70158;
                return 1 * (t /= 1) * t * ((e + 1) * t - e)
            },
            easeOutBack: function(t) {
                var e = 1.70158;
                return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1)
            },
            easeInOutBack: function(t) {
                var e = 1.70158;
                return (t /= .5) < 1 ? .5 * t * t * (((e *= 1.525) + 1) * t - e) : .5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2)
            },
            easeInBounce: function(t) {
                return 1 - _.easeOutBounce(1 - t)
            },
            easeOutBounce: function(t) {
                return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : 2 / 2.75 > t ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
            },
            easeInOutBounce: function(t) {
                return .5 > t ? .5 * _.easeInBounce(2 * t) : .5 * _.easeOutBounce(2 * t - 1) + .5
            }
        }),
        C = n.requestAnimFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                return window.setTimeout(t, 1e3 / 60)
            }
        }(),
        S = (n.cancelAnimFrame = function() {
            return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
                return window.clearTimeout(t, 1e3 / 60)
            }
        }(), n.animationLoop = function(t, e, i, n, s, o) {
            var r = 0,
                a = _[i] || _.linear,
                l = function() {
                    r++;
                    var i = r / e,
                        c = a(i);
                    t.call(o, c, i, r), n.call(o, c, i), e > r ? o.animationFrame = C(l) : s.apply(o)
                };
            C(l)
        }, n.getRelativePosition = function(t) {
            var e, i, n = t.originalEvent || t,
                s = t.currentTarget || t.srcElement,
                o = s.getBoundingClientRect();
            return n.touches ? (e = n.touches[0].clientX - o.left, i = n.touches[0].clientY - o.top) : (e = n.clientX - o.left, i = n.clientY - o.top), {
                x: e,
                y: i
            }
        }, n.addEvent = function(t, e, i) {
            t.addEventListener ? t.addEventListener(e, i) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i
        }),
        T = n.removeEvent = function(t, e, i) {
            t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent ? t.detachEvent("on" + e, i) : t["on" + e] = u
        },
        k = (n.bindEvents = function(t, e, i) {
            t.events || (t.events = {}), s(e, function(e) {
                t.events[e] = function() {
                    i.apply(t, arguments)
                }, S(t.chart.canvas, e, t.events[e])
            })
        }, n.unbindEvents = function(t, e) {
            s(e, function(e, i) {
                T(t.chart.canvas, i, e)
            })
        }),
        E = n.getMaximumWidth = function(t) {
            var e = t.parentNode;
            return e.clientWidth
        },
        L = n.getMaximumHeight = function(t) {
            var e = t.parentNode;
            return e.clientHeight
        },
        P = (n.getMaximumSize = n.getMaximumWidth, n.retinaScale = function(t) {
            var e = t.ctx,
                i = t.canvas.width,
                n = t.canvas.height;
            window.devicePixelRatio && (e.canvas.style.width = i + "px", e.canvas.style.height = n + "px", e.canvas.height = n * window.devicePixelRatio, e.canvas.width = i * window.devicePixelRatio, e.scale(window.devicePixelRatio, window.devicePixelRatio))
        }),
        I = n.clear = function(t) {
            t.ctx.clearRect(0, 0, t.width, t.height)
        },
        D = n.fontString = function(t, e, i) {
            return e + " " + t + "px " + i
        },
        A = n.longestText = function(t, e, i) {
            t.font = e;
            var n = 0;
            return s(i, function(e) {
                var i = t.measureText(e).width;
                n = i > n ? i : n
            }), n
        },
        M = n.drawRoundedRectangle = function(t, e, i, n, s, o) {
            t.beginPath(), t.moveTo(e + o, i), t.lineTo(e + n - o, i), t.quadraticCurveTo(e + n, i, e + n, i + o), t.lineTo(e + n, i + s - o), t.quadraticCurveTo(e + n, i + s, e + n - o, i + s), t.lineTo(e + o, i + s), t.quadraticCurveTo(e, i + s, e, i + s - o), t.lineTo(e, i + o), t.quadraticCurveTo(e, i, e + o, i), t.closePath()
        };
    i.instances = {}, i.Type = function(t, e, n) {
        this.options = e, this.chart = n, this.id = h(), i.instances[this.id] = this, e.responsive && this.resize(), this.initialize.call(this, t)
    }, r(i.Type.prototype, {
        initialize: function() {
            return this
        },
        clear: function() {
            return I(this.chart), this
        },
        stop: function() {
            return n.cancelAnimFrame.call(t, this.animationFrame), this
        },
        resize: function(t) {
            this.stop();
            var e = this.chart.canvas,
                i = E(this.chart.canvas),
                n = this.options.maintainAspectRatio ? i / this.chart.aspectRatio : L(this.chart.canvas);
            return e.width = this.chart.width = i, e.height = this.chart.height = n, P(this.chart), "function" == typeof t && t.apply(this, Array.prototype.slice.call(arguments, 1)), this
        },
        reflow: u,
        render: function(t) {
            return t && this.reflow(), this.options.animation && !t ? n.animationLoop(this.draw, this.options.animationSteps, this.options.animationEasing, this.options.onAnimationProgress, this.options.onAnimationComplete, this) : (this.draw(), this.options.onAnimationComplete.call(this)), this
        },
        generateLegend: function() {
            return x(this.options.legendTemplate, this)
        },
        destroy: function() {
            this.clear(), k(this, this.events);
            var t = this.chart.canvas;
            t.width = this.chart.width, t.height = this.chart.height, t.style.removeProperty ? (t.style.removeProperty("width"), t.style.removeProperty("height")) : (t.style.removeAttribute("width"), t.style.removeAttribute("height")), delete i.instances[this.id]
        },
        showTooltip: function(t, e) {
            "undefined" == typeof this.activeElements && (this.activeElements = []);
            var o = function(t) {
                var e = !1;
                return t.length !== this.activeElements.length ? e = !0 : (s(t, function(t, i) {
                    t !== this.activeElements[i] && (e = !0)
                }, this), e)
            }.call(this, t);
            if (o || e) {
                if (this.activeElements = t, this.draw(), this.options.customTooltips && this.options.customTooltips(!1), t.length > 0)
                    if (this.datasets && this.datasets.length > 1) {
                        for (var r, a, c = this.datasets.length - 1; c >= 0 && (r = this.datasets[c].points || this.datasets[c].bars || this.datasets[c].segments, a = l(r, t[0]), -1 === a); c--);
                        var u = [],
                            h = [],
                            d = function() {
                                var t, e, i, s, o, r = [],
                                    l = [],
                                    c = [];
                                return n.each(this.datasets, function(e) {
                                    t = e.points || e.bars || e.segments, t[a] && t[a].hasValue() && r.push(t[a])
                                }), n.each(r, function(t) {
                                    l.push(t.x), c.push(t.y), u.push(n.template(this.options.multiTooltipTemplate, t)), h.push({
                                        fill: t._saved.fillColor || t.fillColor,
                                        stroke: t._saved.strokeColor || t.strokeColor
                                    })
                                }, this), o = g(c), i = m(c), s = g(l), e = m(l), {
                                    x: s > this.chart.width / 2 ? s : e,
                                    y: (o + i) / 2
                                }
                            }.call(this, a);
                        new i.MultiTooltip({
                            x: d.x,
                            y: d.y,
                            xPadding: this.options.tooltipXPadding,
                            yPadding: this.options.tooltipYPadding,
                            xOffset: this.options.tooltipXOffset,
                            fillColor: this.options.tooltipFillColor,
                            textColor: this.options.tooltipFontColor,
                            fontFamily: this.options.tooltipFontFamily,
                            fontStyle: this.options.tooltipFontStyle,
                            fontSize: this.options.tooltipFontSize,
                            titleTextColor: this.options.tooltipTitleFontColor,
                            titleFontFamily: this.options.tooltipTitleFontFamily,
                            titleFontStyle: this.options.tooltipTitleFontStyle,
                            titleFontSize: this.options.tooltipTitleFontSize,
                            cornerRadius: this.options.tooltipCornerRadius,
                            labels: u,
                            legendColors: h,
                            legendColorBackground: this.options.multiTooltipKeyBackground,
                            title: t[0].label,
                            chart: this.chart,
                            ctx: this.chart.ctx,
                            custom: this.options.customTooltips
                        }).draw()
                    } else s(t, function(t) {
                        var e = t.tooltipPosition();
                        new i.Tooltip({
                            x: Math.round(e.x),
                            y: Math.round(e.y),
                            xPadding: this.options.tooltipXPadding,
                            yPadding: this.options.tooltipYPadding,
                            fillColor: this.options.tooltipFillColor,
                            textColor: this.options.tooltipFontColor,
                            fontFamily: this.options.tooltipFontFamily,
                            fontStyle: this.options.tooltipFontStyle,
                            fontSize: this.options.tooltipFontSize,
                            caretHeight: this.options.tooltipCaretSize,
                            cornerRadius: this.options.tooltipCornerRadius,
                            text: x(this.options.tooltipTemplate, t),
                            chart: this.chart,
                            custom: this.options.customTooltips
                        }).draw()
                    }, this);
                return this
            }
        },
        toBase64Image: function() {
            return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
        }
    }), i.Type.extend = function(t) {
        var e = this,
            n = function() {
                return e.apply(this, arguments)
            };
        if (n.prototype = o(e.prototype), r(n.prototype, t), n.extend = i.Type.extend, t.name || e.prototype.name) {
            var s = t.name || e.prototype.name,
                l = i.defaults[e.prototype.name] ? o(i.defaults[e.prototype.name]) : {};
            i.defaults[s] = r(l, t.defaults), i.types[s] = n, i.prototype[s] = function(t, e) {
                var o = a(i.defaults.global, i.defaults[s], e || {});
                return new n(t, o, this)
            }
        } else d("Name not provided for this chart, so it hasn't been registered");
        return e
    }, i.Element = function(t) {
        r(this, t), this.initialize.apply(this, arguments), this.save()
    }, r(i.Element.prototype, {
        initialize: function() {},
        restore: function(t) {
            return t ? s(t, function(t) {
                this[t] = this._saved[t]
            }, this) : r(this, this._saved), this
        },
        save: function() {
            return this._saved = o(this), delete this._saved._saved, this
        },
        update: function(t) {
            return s(t, function(t, e) {
                this._saved[e] = this[e], this[e] = t
            }, this), this
        },
        transition: function(t, e) {
            return s(t, function(t, i) {
                this[i] = (t - this._saved[i]) * e + this._saved[i]
            }, this), this
        },
        tooltipPosition: function() {
            return {
                x: this.x,
                y: this.y
            }
        },
        hasValue: function() {
            return f(this.value)
        }
    }), i.Element.extend = c, i.Point = i.Element.extend({
        display: !0,
        inRange: function(t, e) {
            var i = this.hitDetectionRadius + this.radius;
            return Math.pow(t - this.x, 2) + Math.pow(e - this.y, 2) < Math.pow(i, 2)
        },
        draw: function() {
            if (this.display) {
                var t = this.ctx;
                t.beginPath(), t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI), t.closePath(), t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.fillStyle = this.fillColor, t.fill(), t.stroke()
            }
        }
    }), i.Arc = i.Element.extend({
        inRange: function(t, e) {
            var i = n.getAngleFromPoint(this, {
                    x: t,
                    y: e
                }),
                s = i.angle >= this.startAngle && i.angle <= this.endAngle,
                o = i.distance >= this.innerRadius && i.distance <= this.outerRadius;
            return s && o
        },
        tooltipPosition: function() {
            var t = this.startAngle + (this.endAngle - this.startAngle) / 2,
                e = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
            return {
                x: this.x + Math.cos(t) * e,
                y: this.y + Math.sin(t) * e
            }
        },
        draw: function() {
            var t = this.ctx;
            t.beginPath(), t.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle), t.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, !0), t.closePath(), t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.fillStyle = this.fillColor, t.fill(), t.lineJoin = "bevel", this.showStroke && t.stroke()
        }
    }), i.Rectangle = i.Element.extend({
        draw: function() {
            var t = this.ctx,
                e = this.width / 2,
                i = this.x - e,
                n = this.x + e,
                s = this.base - (this.base - this.y),
                o = this.strokeWidth / 2;
            this.showStroke && (i += o, n -= o, s += o), t.beginPath(), t.fillStyle = this.fillColor, t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.moveTo(i, this.base), t.lineTo(i, s), t.lineTo(n, s), t.lineTo(n, this.base), t.fill(), this.showStroke && t.stroke()
        },
        height: function() {
            return this.base - this.y
        },
        inRange: function(t, e) {
            return t >= this.x - this.width / 2 && t <= this.x + this.width / 2 && e >= this.y && e <= this.base
        }
    }), i.Tooltip = i.Element.extend({
        draw: function() {
            var t = this.chart.ctx;
            t.font = D(this.fontSize, this.fontStyle, this.fontFamily), this.xAlign = "center", this.yAlign = "above";
            var e = this.caretPadding = 2,
                i = t.measureText(this.text).width + 2 * this.xPadding,
                n = this.fontSize + 2 * this.yPadding,
                s = n + this.caretHeight + e;
            this.x + i / 2 > this.chart.width ? this.xAlign = "left" : this.x - i / 2 < 0 && (this.xAlign = "right"), this.y - s < 0 && (this.yAlign = "below");
            var o = this.x - i / 2,
                r = this.y - s;
            if (t.fillStyle = this.fillColor, this.custom) this.custom(this);
            else {
                switch (this.yAlign) {
                    case "above":
                        t.beginPath(), t.moveTo(this.x, this.y - e), t.lineTo(this.x + this.caretHeight, this.y - (e + this.caretHeight)), t.lineTo(this.x - this.caretHeight, this.y - (e + this.caretHeight)), t.closePath(), t.fill();
                        break;
                    case "below":
                        r = this.y + e + this.caretHeight, t.beginPath(), t.moveTo(this.x, this.y + e), t.lineTo(this.x + this.caretHeight, this.y + e + this.caretHeight), t.lineTo(this.x - this.caretHeight, this.y + e + this.caretHeight), t.closePath(), t.fill()
                }
                switch (this.xAlign) {
                    case "left":
                        o = this.x - i + (this.cornerRadius + this.caretHeight);
                        break;
                    case "right":
                        o = this.x - (this.cornerRadius + this.caretHeight)
                }
                M(t, o, r, i, n, this.cornerRadius), t.fill(), t.fillStyle = this.textColor, t.textAlign = "center", t.textBaseline = "middle", t.fillText(this.text, o + i / 2, r + n / 2)
            }
        }
    }), i.MultiTooltip = i.Element.extend({
        initialize: function() {
            this.font = D(this.fontSize, this.fontStyle, this.fontFamily), this.titleFont = D(this.titleFontSize, this.titleFontStyle, this.titleFontFamily), this.height = this.labels.length * this.fontSize + (this.labels.length - 1) * (this.fontSize / 2) + 2 * this.yPadding + 1.5 * this.titleFontSize, this.ctx.font = this.titleFont;
            var t = this.ctx.measureText(this.title).width,
                e = A(this.ctx, this.font, this.labels) + this.fontSize + 3,
                i = m([e, t]);
            this.width = i + 2 * this.xPadding;
            var n = this.height / 2;
            this.y - n < 0 ? this.y = n : this.y + n > this.chart.height && (this.y = this.chart.height - n), this.x > this.chart.width / 2 ? this.x -= this.xOffset + this.width : this.x += this.xOffset
        },
        getLineHeight: function(t) {
            var e = this.y - this.height / 2 + this.yPadding,
                i = t - 1;
            return 0 === t ? e + this.titleFontSize / 2 : e + (1.5 * this.fontSize * i + this.fontSize / 2) + 1.5 * this.titleFontSize
        },
        draw: function() {
            if (this.custom) this.custom(this);
            else {
                M(this.ctx, this.x, this.y - this.height / 2, this.width, this.height, this.cornerRadius);
                var t = this.ctx;
                t.fillStyle = this.fillColor, t.fill(), t.closePath(), t.textAlign = "left", t.textBaseline = "middle", t.fillStyle = this.titleTextColor, t.font = this.titleFont, t.fillText(this.title, this.x + this.xPadding, this.getLineHeight(0)), t.font = this.font, n.each(this.labels, function(e, i) {
                    t.fillStyle = this.textColor, t.fillText(e, this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(i + 1)), t.fillStyle = this.legendColorBackground, t.fillRect(this.x + this.xPadding, this.getLineHeight(i + 1) - this.fontSize / 2, this.fontSize, this.fontSize), t.fillStyle = this.legendColors[i].fill, t.fillRect(this.x + this.xPadding, this.getLineHeight(i + 1) - this.fontSize / 2, this.fontSize, this.fontSize)
                }, this)
            }
        }
    }), i.Scale = i.Element.extend({
        initialize: function() {
            this.fit()
        },
        buildYLabels: function() {
            this.yLabels = [];
            for (var t = v(this.stepValue), e = 0; e <= this.steps; e++) this.yLabels.push(x(this.templateString, {
                value: (this.min + e * this.stepValue).toFixed(t)
            }));
            this.yLabelWidth = this.display && this.showLabels ? A(this.ctx, this.font, this.yLabels) : 0
        },
        addXLabel: function(t) {
            this.xLabels.push(t), this.valuesCount++, this.fit()
        },
        removeXLabel: function() {
            this.xLabels.shift(), this.valuesCount--, this.fit()
        },
        fit: function() {
            this.startPoint = this.display ? this.fontSize : 0, this.endPoint = this.display ? this.height - 1.5 * this.fontSize - 5 : this.height, this.startPoint += this.padding, this.endPoint -= this.padding;
            var t, e = this.endPoint - this.startPoint;
            for (this.calculateYRange(e), this.buildYLabels(), this.calculateXLabelRotation(); e > this.endPoint - this.startPoint;) e = this.endPoint - this.startPoint, t = this.yLabelWidth, this.calculateYRange(e), this.buildYLabels(), t < this.yLabelWidth && this.calculateXLabelRotation()
        },
        calculateXLabelRotation: function() {
            this.ctx.font = this.font;
            var t, e, i = this.ctx.measureText(this.xLabels[0]).width,
                n = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width;
            if (this.xScalePaddingRight = n / 2 + 3, this.xScalePaddingLeft = i / 2 > this.yLabelWidth + 10 ? i / 2 : this.yLabelWidth + 10, this.xLabelRotation = 0, this.display) {
                var s, o = A(this.ctx, this.font, this.xLabels);
                this.xLabelWidth = o;
                for (var r = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6; this.xLabelWidth > r && 0 === this.xLabelRotation || this.xLabelWidth > r && this.xLabelRotation <= 90 && this.xLabelRotation > 0;) s = Math.cos(y(this.xLabelRotation)), t = s * i, e = s * n, t + this.fontSize / 2 > this.yLabelWidth + 8 && (this.xScalePaddingLeft = t + this.fontSize / 2), this.xScalePaddingRight = this.fontSize / 2, this.xLabelRotation++, this.xLabelWidth = s * o;
                this.xLabelRotation > 0 && (this.endPoint -= Math.sin(y(this.xLabelRotation)) * o + 3)
            } else this.xLabelWidth = 0, this.xScalePaddingRight = this.padding, this.xScalePaddingLeft = this.padding
        },
        calculateYRange: u,
        drawingArea: function() {
            return this.startPoint - this.endPoint
        },
        calculateY: function(t) {
            var e = this.drawingArea() / (this.min - this.max);
            return this.endPoint - e * (t - this.min)
        },
        calculateX: function(t) {
            var e = (this.xLabelRotation > 0, this.width - (this.xScalePaddingLeft + this.xScalePaddingRight)),
                i = e / (this.valuesCount - (this.offsetGridLines ? 0 : 1)),
                n = i * t + this.xScalePaddingLeft;
            return this.offsetGridLines && (n += i / 2), Math.round(n)
        },
        update: function(t) {
            n.extend(this, t), this.fit()
        },
        draw: function() {
            var t = this.ctx,
                e = (this.endPoint - this.startPoint) / this.steps,
                i = Math.round(this.xScalePaddingLeft);
            this.display && (t.fillStyle = this.textColor, t.font = this.font, s(this.yLabels, function(s, o) {
                var r = this.endPoint - e * o,
                    a = Math.round(r),
                    l = this.showHorizontalLines;
                t.textAlign = "right", t.textBaseline = "middle", this.showLabels && t.fillText(s, i - 10, r), 0 !== o || l || (l = !0), l && t.beginPath(), o > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), a += n.aliasPixel(t.lineWidth), l && (t.moveTo(i, a), t.lineTo(this.width, a), t.stroke(), t.closePath()), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(i - 5, a), t.lineTo(i, a), t.stroke(), t.closePath()
            }, this), s(this.xLabels, function(e, i) {
                var n = this.calculateX(i) + b(this.lineWidth),
                    s = this.calculateX(i - (this.offsetGridLines ? .5 : 0)) + b(this.lineWidth),
                    o = this.xLabelRotation > 0,
                    r = this.showVerticalLines;
                0 !== i || r || (r = !0), r && t.beginPath(), i > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), r && (t.moveTo(s, this.endPoint), t.lineTo(s, this.startPoint - 3), t.stroke(), t.closePath()), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(s, this.endPoint), t.lineTo(s, this.endPoint + 5), t.stroke(), t.closePath(), t.save(), t.translate(n, o ? this.endPoint + 12 : this.endPoint + 8), t.rotate(-1 * y(this.xLabelRotation)), t.font = this.font, t.textAlign = o ? "right" : "center", t.textBaseline = o ? "middle" : "top", t.fillText(e, 0, 0), t.restore()
            }, this))
        }
    }), i.RadialScale = i.Element.extend({
        initialize: function() {
            this.size = g([this.height, this.width]), this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2
        },
        calculateCenterOffset: function(t) {
            var e = this.drawingArea / (this.max - this.min);
            return (t - this.min) * e
        },
        update: function() {
            this.lineArc ? this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2 : this.setScaleSize(), this.buildYLabels()
        },
        buildYLabels: function() {
            this.yLabels = [];
            for (var t = v(this.stepValue), e = 0; e <= this.steps; e++) this.yLabels.push(x(this.templateString, {
                value: (this.min + e * this.stepValue).toFixed(t)
            }))
        },
        getCircumference: function() {
            return 2 * Math.PI / this.valuesCount
        },
        setScaleSize: function() {
            var t, e, i, n, s, o, r, a, l, c, u, h, d = g([this.height / 2 - this.pointLabelFontSize - 5, this.width / 2]),
                p = this.width,
                m = 0;
            for (this.ctx.font = D(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), e = 0; e < this.valuesCount; e++) t = this.getPointPosition(e, d), i = this.ctx.measureText(x(this.templateString, {
                value: this.labels[e]
            })).width + 5, 0 === e || e === this.valuesCount / 2 ? (n = i / 2, t.x + n > p && (p = t.x + n, s = e), t.x - n < m && (m = t.x - n, r = e)) : e < this.valuesCount / 2 ? t.x + i > p && (p = t.x + i, s = e) : e > this.valuesCount / 2 && t.x - i < m && (m = t.x - i, r = e);
            l = m, c = Math.ceil(p - this.width), o = this.getIndexAngle(s), a = this.getIndexAngle(r), u = c / Math.sin(o + Math.PI / 2), h = l / Math.sin(a + Math.PI / 2), u = f(u) ? u : 0, h = f(h) ? h : 0, this.drawingArea = d - (h + u) / 2, this.setCenterPoint(h, u)
        },
        setCenterPoint: function(t, e) {
            var i = this.width - e - this.drawingArea,
                n = t + this.drawingArea;
            this.xCenter = (n + i) / 2, this.yCenter = this.height / 2
        },
        getIndexAngle: function(t) {
            var e = 2 * Math.PI / this.valuesCount;
            return t * e - Math.PI / 2
        },
        getPointPosition: function(t, e) {
            var i = this.getIndexAngle(t);
            return {
                x: Math.cos(i) * e + this.xCenter,
                y: Math.sin(i) * e + this.yCenter
            }
        },
        draw: function() {
            if (this.display) {
                var t = this.ctx;
                if (s(this.yLabels, function(e, i) {
                    if (i > 0) {
                        var n, s = i * (this.drawingArea / this.steps),
                            o = this.yCenter - s;
                        if (this.lineWidth > 0)
                            if (t.strokeStyle = this.lineColor, t.lineWidth = this.lineWidth, this.lineArc) t.beginPath(), t.arc(this.xCenter, this.yCenter, s, 0, 2 * Math.PI), t.closePath(), t.stroke();
                            else {
                                t.beginPath();
                                for (var r = 0; r < this.valuesCount; r++) n = this.getPointPosition(r, this.calculateCenterOffset(this.min + i * this.stepValue)), 0 === r ? t.moveTo(n.x, n.y) : t.lineTo(n.x, n.y);
                                t.closePath(), t.stroke()
                            }
                        if (this.showLabels) {
                            if (t.font = D(this.fontSize, this.fontStyle, this.fontFamily), this.showLabelBackdrop) {
                                var a = t.measureText(e).width;
                                t.fillStyle = this.backdropColor, t.fillRect(this.xCenter - a / 2 - this.backdropPaddingX, o - this.fontSize / 2 - this.backdropPaddingY, a + 2 * this.backdropPaddingX, this.fontSize + 2 * this.backdropPaddingY)
                            }
                            t.textAlign = "center", t.textBaseline = "middle", t.fillStyle = this.fontColor, t.fillText(e, this.xCenter, o)
                        }
                    }
                }, this), !this.lineArc) {
                    t.lineWidth = this.angleLineWidth, t.strokeStyle = this.angleLineColor;
                    for (var e = this.valuesCount - 1; e >= 0; e--) {
                        if (this.angleLineWidth > 0) {
                            var i = this.getPointPosition(e, this.calculateCenterOffset(this.max));
                            t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(i.x, i.y), t.stroke(), t.closePath()
                        }
                        var n = this.getPointPosition(e, this.calculateCenterOffset(this.max) + 5);
                        t.font = D(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), t.fillStyle = this.pointLabelFontColor;
                        var o = this.labels.length,
                            r = this.labels.length / 2,
                            a = r / 2,
                            l = a > e || e > o - a,
                            c = e === a || e === o - a;
                        t.textAlign = 0 === e ? "center" : e === r ? "center" : r > e ? "left" : "right", t.textBaseline = c ? "middle" : l ? "bottom" : "top", t.fillText(this.labels[e], n.x, n.y)
                    }
                }
            }
        }
    }), n.addEvent(window, "resize", function() {
        var t;
        return function() {
            clearTimeout(t), t = setTimeout(function() {
                s(i.instances, function(t) {
                    t.options.responsive && t.resize(t.render, !0)
                })
            }, 50)
        }
    }()), p ? define(function() {
        return i
    }) : "object" == typeof module && module.exports && (module.exports = i), t.Chart = i, i.noConflict = function() {
        return t.Chart = e, i
    }
}.call(this), function() {
    "use strict";
    var t = this,
        e = t.Chart,
        i = e.helpers,
        n = {
            scaleBeginAtZero: !0,
            scaleShowGridLines: !0,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            scaleShowHorizontalLines: !0,
            scaleShowVerticalLines: !0,
            barShowStroke: !0,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        };
    e.Type.extend({
        name: "Bar",
        defaults: n,
        initialize: function(t) {
            var n = this.options;
            this.ScaleClass = e.Scale.extend({
                offsetGridLines: !0,
                calculateBarX: function(t, e, i) {
                    var s = this.calculateBaseWidth(),
                        o = this.calculateX(i) - s / 2,
                        r = this.calculateBarWidth(t);
                    return o + r * e + e * n.barDatasetSpacing + r / 2
                },
                calculateBaseWidth: function() {
                    return this.calculateX(1) - this.calculateX(0) - 2 * n.barValueSpacing
                },
                calculateBarWidth: function(t) {
                    var e = this.calculateBaseWidth() - (t - 1) * n.barDatasetSpacing;
                    return e / t
                }
            }), this.datasets = [], this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getBarsAtEvent(t) : [];
                this.eachBars(function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                }), this.showTooltip(e)
            }), this.BarClass = e.Rectangle.extend({
                strokeWidth: this.options.barStrokeWidth,
                showStroke: this.options.barShowStroke,
                ctx: this.chart.ctx
            }), i.each(t.datasets, function(e) {
                var n = {
                    label: e.label || null,
                    fillColor: e.fillColor,
                    strokeColor: e.strokeColor,
                    bars: []
                };
                this.datasets.push(n), i.each(e.data, function(i, s) {
                    n.bars.push(new this.BarClass({
                        value: i,
                        label: t.labels[s],
                        datasetLabel: e.label,
                        strokeColor: e.strokeColor,
                        fillColor: e.fillColor,
                        highlightFill: e.highlightFill || e.fillColor,
                        highlightStroke: e.highlightStroke || e.strokeColor
                    }))
                }, this)
            }, this), this.buildScale(t.labels), this.BarClass.prototype.base = this.scale.endPoint, this.eachBars(function(t, e, n) {
                i.extend(t, {
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    x: this.scale.calculateBarX(this.datasets.length, n, e),
                    y: this.scale.endPoint
                }), t.save()
            }, this), this.render()
        },
        update: function() {
            this.scale.update(), i.each(this.activeElements, function(t) {
                t.restore(["fillColor", "strokeColor"])
            }), this.eachBars(function(t) {
                t.save()
            }), this.render()
        },
        eachBars: function(t) {
            i.each(this.datasets, function(e, n) {
                i.each(e.bars, t, this, n)
            }, this)
        },
        getBarsAtEvent: function(t) {
            for (var e, n = [], s = i.getRelativePosition(t), o = function(t) {
                n.push(t.bars[e])
            }, r = 0; r < this.datasets.length; r++)
                for (e = 0; e < this.datasets[r].bars.length; e++)
                    if (this.datasets[r].bars[e].inRange(s.x, s.y)) return i.each(this.datasets, o), n;
            return n
        },
        buildScale: function(t) {
            var e = this,
                n = function() {
                    var t = [];
                    return e.eachBars(function(e) {
                        t.push(e.value)
                    }), t
                },
                s = {
                    templateString: this.options.scaleLabel,
                    height: this.chart.height,
                    width: this.chart.width,
                    ctx: this.chart.ctx,
                    textColor: this.options.scaleFontColor,
                    fontSize: this.options.scaleFontSize,
                    fontStyle: this.options.scaleFontStyle,
                    fontFamily: this.options.scaleFontFamily,
                    valuesCount: t.length,
                    beginAtZero: this.options.scaleBeginAtZero,
                    integersOnly: this.options.scaleIntegersOnly,
                    calculateYRange: function(t) {
                        var e = i.calculateScaleRange(n(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                        i.extend(this, e)
                    },
                    xLabels: t,
                    font: i.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                    lineWidth: this.options.scaleLineWidth,
                    lineColor: this.options.scaleLineColor,
                    showHorizontalLines: this.options.scaleShowHorizontalLines,
                    showVerticalLines: this.options.scaleShowVerticalLines,
                    gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                    gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                    padding: this.options.showScale ? 0 : this.options.barShowStroke ? this.options.barStrokeWidth : 0,
                    showLabels: this.options.scaleShowLabels,
                    display: this.options.showScale
                };
            this.options.scaleOverride && i.extend(s, {
                calculateYRange: i.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }), this.scale = new this.ScaleClass(s)
        },
        addData: function(t, e) {
            i.each(t, function(t, i) {
                this.datasets[i].bars.push(new this.BarClass({
                    value: t,
                    label: e,
                    x: this.scale.calculateBarX(this.datasets.length, i, this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    base: this.scale.endPoint,
                    strokeColor: this.datasets[i].strokeColor,
                    fillColor: this.datasets[i].fillColor
                }))
            }, this), this.scale.addXLabel(e), this.update()
        },
        removeData: function() {
            this.scale.removeXLabel(), i.each(this.datasets, function(t) {
                t.bars.shift()
            }, this), this.update()
        },
        reflow: function() {
            i.extend(this.BarClass.prototype, {
                y: this.scale.endPoint,
                base: this.scale.endPoint
            });
            var t = i.extend({
                height: this.chart.height,
                width: this.chart.width
            });
            this.scale.update(t)
        },
        draw: function(t) {
            var e = t || 1;
            this.clear(), this.chart.ctx, this.scale.draw(e), i.each(this.datasets, function(t, n) {
                i.each(t.bars, function(t, i) {
                    t.hasValue() && (t.base = this.scale.endPoint, t.transition({
                        x: this.scale.calculateBarX(this.datasets.length, n, i),
                        y: this.scale.calculateY(t.value),
                        width: this.scale.calculateBarWidth(this.datasets.length)
                    }, e).draw())
                }, this)
            }, this)
        }
    })
}.call(this), function() {
    "use strict";
    var t = this,
        e = t.Chart,
        i = e.helpers,
        n = {
            segmentShowStroke: !0,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: !0,
            animateScale: !1,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
        };
    e.Type.extend({
        name: "Doughnut",
        defaults: n,
        initialize: function(t) {
            this.segments = [], this.outerRadius = (i.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, this.SegmentArc = e.Arc.extend({
                ctx: this.chart.ctx,
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t) : [];
                i.each(this.segments, function(t) {
                    t.restore(["fillColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightColor
                }), this.showTooltip(e)
            }), this.calculateTotal(t), i.each(t, function(t, e) {
                this.addData(t, e, !0)
            }, this), this.render()
        },
        getSegmentsAtEvent: function(t) {
            var e = [],
                n = i.getRelativePosition(t);
            return i.each(this.segments, function(t) {
                t.inRange(n.x, n.y) && e.push(t)
            }, this), e
        },
        addData: function(t, e, i) {
            var n = e || this.segments.length;
            this.segments.splice(n, 0, new this.SegmentArc({
                value: t.value,
                outerRadius: this.options.animateScale ? 0 : this.outerRadius,
                innerRadius: this.options.animateScale ? 0 : this.outerRadius / 100 * this.options.percentageInnerCutout,
                fillColor: t.color,
                highlightColor: t.highlight || t.color,
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                startAngle: 1.5 * Math.PI,
                circumference: this.options.animateRotate ? 0 : this.calculateCircumference(t.value),
                label: t.label
            })), i || (this.reflow(), this.update())
        },
        calculateCircumference: function(t) {
            return 2 * Math.PI * (t / this.total)
        },
        calculateTotal: function(t) {
            this.total = 0, i.each(t, function(t) {
                this.total += t.value
            }, this)
        },
        update: function() {
            this.calculateTotal(this.segments), i.each(this.activeElements, function(t) {
                t.restore(["fillColor"])
            }), i.each(this.segments, function(t) {
                t.save()
            }), this.render()
        },
        removeData: function(t) {
            var e = i.isNumber(t) ? t : this.segments.length - 1;
            this.segments.splice(e, 1), this.reflow(), this.update()
        },
        reflow: function() {
            i.extend(this.SegmentArc.prototype, {
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.outerRadius = (i.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, i.each(this.segments, function(t) {
                t.update({
                    outerRadius: this.outerRadius,
                    innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                })
            }, this)
        },
        draw: function(t) {
            var e = t ? t : 1;
            this.clear(), i.each(this.segments, function(t, i) {
                t.transition({
                    circumference: this.calculateCircumference(t.value),
                    outerRadius: this.outerRadius,
                    innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                }, e), t.endAngle = t.startAngle + t.circumference, t.draw(), 0 === i && (t.startAngle = 1.5 * Math.PI), i < this.segments.length - 1 && (this.segments[i + 1].startAngle = t.endAngle)
            }, this)
        }
    }), e.types.Doughnut.extend({
        name: "Pie",
        defaults: i.merge(n, {
            percentageInnerCutout: 0
        })
    })
}.call(this), function() {
    "use strict";
    var t = this,
        e = t.Chart,
        i = e.helpers,
        n = {
            scaleShowGridLines: !0,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            scaleShowHorizontalLines: !0,
            scaleShowVerticalLines: !0,
            bezierCurve: !0,
            bezierCurveTension: .4,
            pointDot: !0,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: !0,
            datasetStrokeWidth: 2,
            datasetFill: !0,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        };
    e.Type.extend({
        name: "Line",
        defaults: n,
        initialize: function(t) {
            this.PointClass = e.Point.extend({
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx,
                inRange: function(t) {
                    return Math.pow(t - this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2)
                }
            }), this.datasets = [], this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getPointsAtEvent(t) : [];
                this.eachPoints(function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                }), this.showTooltip(e)
            }), i.each(t.datasets, function(e) {
                var n = {
                    label: e.label || null,
                    fillColor: e.fillColor,
                    strokeColor: e.strokeColor,
                    pointColor: e.pointColor,
                    pointStrokeColor: e.pointStrokeColor,
                    points: []
                };
                this.datasets.push(n), i.each(e.data, function(i, s) {
                    n.points.push(new this.PointClass({
                        value: i,
                        label: t.labels[s],
                        datasetLabel: e.label,
                        strokeColor: e.pointStrokeColor,
                        fillColor: e.pointColor,
                        highlightFill: e.pointHighlightFill || e.pointColor,
                        highlightStroke: e.pointHighlightStroke || e.pointStrokeColor
                    }))
                }, this), this.buildScale(t.labels), this.eachPoints(function(t, e) {
                    i.extend(t, {
                        x: this.scale.calculateX(e),
                        y: this.scale.endPoint
                    }), t.save()
                }, this)
            }, this), this.render()
        },
        update: function() {
            this.scale.update(), i.each(this.activeElements, function(t) {
                t.restore(["fillColor", "strokeColor"])
            }), this.eachPoints(function(t) {
                t.save()
            }), this.render()
        },
        eachPoints: function(t) {
            i.each(this.datasets, function(e) {
                i.each(e.points, t, this)
            }, this)
        },
        getPointsAtEvent: function(t) {
            var e = [],
                n = i.getRelativePosition(t);
            return i.each(this.datasets, function(t) {
                i.each(t.points, function(t) {
                    t.inRange(n.x, n.y) && e.push(t)
                })
            }, this), e
        },
        buildScale: function(t) {
            var n = this,
                s = function() {
                    var t = [];
                    return n.eachPoints(function(e) {
                        t.push(e.value)
                    }), t
                },
                o = {
                    templateString: this.options.scaleLabel,
                    height: this.chart.height,
                    width: this.chart.width,
                    ctx: this.chart.ctx,
                    textColor: this.options.scaleFontColor,
                    fontSize: this.options.scaleFontSize,
                    fontStyle: this.options.scaleFontStyle,
                    fontFamily: this.options.scaleFontFamily,
                    valuesCount: t.length,
                    beginAtZero: this.options.scaleBeginAtZero,
                    integersOnly: this.options.scaleIntegersOnly,
                    calculateYRange: function(t) {
                        var e = i.calculateScaleRange(s(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                        i.extend(this, e)
                    },
                    xLabels: t,
                    font: i.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                    lineWidth: this.options.scaleLineWidth,
                    lineColor: this.options.scaleLineColor,
                    showHorizontalLines: this.options.scaleShowHorizontalLines,
                    showVerticalLines: this.options.scaleShowVerticalLines,
                    gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                    gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                    padding: this.options.showScale ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
                    showLabels: this.options.scaleShowLabels,
                    display: this.options.showScale
                };
            this.options.scaleOverride && i.extend(o, {
                calculateYRange: i.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }), this.scale = new e.Scale(o)
        },
        addData: function(t, e) {
            i.each(t, function(t, i) {
                this.datasets[i].points.push(new this.PointClass({
                    value: t,
                    label: e,
                    x: this.scale.calculateX(this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    strokeColor: this.datasets[i].pointStrokeColor,
                    fillColor: this.datasets[i].pointColor
                }))
            }, this), this.scale.addXLabel(e), this.update()
        },
        removeData: function() {
            this.scale.removeXLabel(), i.each(this.datasets, function(t) {
                t.points.shift()
            }, this), this.update()
        },
        reflow: function() {
            var t = i.extend({
                height: this.chart.height,
                width: this.chart.width
            });
            this.scale.update(t)
        },
        draw: function(t) {
            var e = t || 1;
            this.clear();
            var n = this.chart.ctx,
                s = function(t) {
                    return null !== t.value
                },
                o = function(t, e, n) {
                    return i.findNextWhere(e, s, n) || t
                },
                r = function(t, e, n) {
                    return i.findPreviousWhere(e, s, n) || t
                };
            this.scale.draw(e), i.each(this.datasets, function(t) {
                var a = i.where(t.points, s);
                i.each(t.points, function(t, i) {
                    t.hasValue() && t.transition({
                        y: this.scale.calculateY(t.value),
                        x: this.scale.calculateX(i)
                    }, e)
                }, this), this.options.bezierCurve && i.each(a, function(t, e) {
                    var n = e > 0 && e < a.length - 1 ? this.options.bezierCurveTension : 0;
                    t.controlPoints = i.splineCurve(r(t, a, e), t, o(t, a, e), n), t.controlPoints.outer.y > this.scale.endPoint ? t.controlPoints.outer.y = this.scale.endPoint : t.controlPoints.outer.y < this.scale.startPoint && (t.controlPoints.outer.y = this.scale.startPoint), t.controlPoints.inner.y > this.scale.endPoint ? t.controlPoints.inner.y = this.scale.endPoint : t.controlPoints.inner.y < this.scale.startPoint && (t.controlPoints.inner.y = this.scale.startPoint)
                }, this), n.lineWidth = this.options.datasetStrokeWidth, n.strokeStyle = t.strokeColor, n.beginPath(), i.each(a, function(t, e) {
                    if (0 === e) n.moveTo(t.x, t.y);
                    else if (this.options.bezierCurve) {
                        var i = r(t, a, e);
                        n.bezierCurveTo(i.controlPoints.outer.x, i.controlPoints.outer.y, t.controlPoints.inner.x, t.controlPoints.inner.y, t.x, t.y)
                    } else n.lineTo(t.x, t.y)
                }, this), n.stroke(), this.options.datasetFill && a.length > 0 && (n.lineTo(a[a.length - 1].x, this.scale.endPoint), n.lineTo(a[0].x, this.scale.endPoint), n.fillStyle = t.fillColor, n.closePath(), n.fill()), i.each(a, function(t) {
                    t.draw()
                })
            }, this)
        }
    })
}.call(this), function() {
    "use strict";
    var t = this,
        e = t.Chart,
        i = e.helpers,
        n = {
            scaleShowLabelBackdrop: !0,
            scaleBackdropColor: "rgba(255,255,255,0.75)",
            scaleBeginAtZero: !0,
            scaleBackdropPaddingY: 2,
            scaleBackdropPaddingX: 2,
            scaleShowLine: !0,
            segmentShowStroke: !0,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: !0,
            animateScale: !1,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
        };
    e.Type.extend({
        name: "PolarArea",
        defaults: n,
        initialize: function(t) {
            this.segments = [], this.SegmentArc = e.Arc.extend({
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                ctx: this.chart.ctx,
                innerRadius: 0,
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.scale = new e.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth : 0,
                lineColor: this.options.scaleLineColor,
                lineArc: !0,
                width: this.chart.width,
                height: this.chart.height,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                valuesCount: t.length
            }), this.updateScaleRange(t), this.scale.update(), i.each(t, function(t, e) {
                this.addData(t, e, !0)
            }, this), this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t) : [];
                i.each(this.segments, function(t) {
                    t.restore(["fillColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightColor
                }), this.showTooltip(e)
            }), this.render()
        },
        getSegmentsAtEvent: function(t) {
            var e = [],
                n = i.getRelativePosition(t);
            return i.each(this.segments, function(t) {
                t.inRange(n.x, n.y) && e.push(t)
            }, this), e
        },
        addData: function(t, e, i) {
            var n = e || this.segments.length;
            this.segments.splice(n, 0, new this.SegmentArc({
                fillColor: t.color,
                highlightColor: t.highlight || t.color,
                label: t.label,
                value: t.value,
                outerRadius: this.options.animateScale ? 0 : this.scale.calculateCenterOffset(t.value),
                circumference: this.options.animateRotate ? 0 : this.scale.getCircumference(),
                startAngle: 1.5 * Math.PI
            })), i || (this.reflow(), this.update())
        },
        removeData: function(t) {
            var e = i.isNumber(t) ? t : this.segments.length - 1;
            this.segments.splice(e, 1), this.reflow(), this.update()
        },
        calculateTotal: function(t) {
            this.total = 0, i.each(t, function(t) {
                this.total += t.value
            }, this), this.scale.valuesCount = this.segments.length
        },
        updateScaleRange: function(t) {
            var e = [];
            i.each(t, function(t) {
                e.push(t.value)
            });
            var n = this.options.scaleOverride ? {
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            } : i.calculateScaleRange(e, i.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            i.extend(this.scale, n, {
                size: i.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            })
        },
        update: function() {
            this.calculateTotal(this.segments), i.each(this.segments, function(t) {
                t.save()
            }), this.render()
        },
        reflow: function() {
            i.extend(this.SegmentArc.prototype, {
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.updateScaleRange(this.segments), this.scale.update(), i.extend(this.scale, {
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            }), i.each(this.segments, function(t) {
                t.update({
                    outerRadius: this.scale.calculateCenterOffset(t.value)
                })
            }, this)
        },
        draw: function(t) {
            var e = t || 1;
            this.clear(), i.each(this.segments, function(t, i) {
                t.transition({
                    circumference: this.scale.getCircumference(),
                    outerRadius: this.scale.calculateCenterOffset(t.value)
                }, e), t.endAngle = t.startAngle + t.circumference, 0 === i && (t.startAngle = 1.5 * Math.PI), i < this.segments.length - 1 && (this.segments[i + 1].startAngle = t.endAngle), t.draw()
            }, this), this.scale.draw()
        }
    })
}.call(this), function() {
    "use strict";
    var t = this,
        e = t.Chart,
        i = e.helpers;
    e.Type.extend({
        name: "Radar",
        defaults: {
            scaleShowLine: !0,
            angleShowLineOut: !0,
            scaleShowLabels: !1,
            scaleBeginAtZero: !0,
            angleLineColor: "rgba(0,0,0,.1)",
            angleLineWidth: 1,
            pointLabelFontFamily: "'Arial'",
            pointLabelFontStyle: "normal",
            pointLabelFontSize: 10,
            pointLabelFontColor: "#666",
            pointDot: !0,
            pointDotRadius: 3,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: !0,
            datasetStrokeWidth: 2,
            datasetFill: !0,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        },
        initialize: function(t) {
            this.PointClass = e.Point.extend({
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx
            }), this.datasets = [], this.buildScale(t), this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getPointsAtEvent(t) : [];
                this.eachPoints(function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                }), this.showTooltip(e)
            }), i.each(t.datasets, function(e) {
                var n = {
                    label: e.label || null,
                    fillColor: e.fillColor,
                    strokeColor: e.strokeColor,
                    pointColor: e.pointColor,
                    pointStrokeColor: e.pointStrokeColor,
                    points: []
                };
                this.datasets.push(n), i.each(e.data, function(i, s) {
                    var o;
                    this.scale.animation || (o = this.scale.getPointPosition(s, this.scale.calculateCenterOffset(i))), n.points.push(new this.PointClass({
                        value: i,
                        label: t.labels[s],
                        datasetLabel: e.label,
                        x: this.options.animation ? this.scale.xCenter : o.x,
                        y: this.options.animation ? this.scale.yCenter : o.y,
                        strokeColor: e.pointStrokeColor,
                        fillColor: e.pointColor,
                        highlightFill: e.pointHighlightFill || e.pointColor,
                        highlightStroke: e.pointHighlightStroke || e.pointStrokeColor
                    }))
                }, this)
            }, this), this.render()
        },
        eachPoints: function(t) {
            i.each(this.datasets, function(e) {
                i.each(e.points, t, this)
            }, this)
        },
        getPointsAtEvent: function(t) {
            var e = i.getRelativePosition(t),
                n = i.getAngleFromPoint({
                    x: this.scale.xCenter,
                    y: this.scale.yCenter
                }, e),
                s = 2 * Math.PI / this.scale.valuesCount,
                o = Math.round((n.angle - 1.5 * Math.PI) / s),
                r = [];
            return (o >= this.scale.valuesCount || 0 > o) && (o = 0), n.distance <= this.scale.drawingArea && i.each(this.datasets, function(t) {
                r.push(t.points[o])
            }), r
        },
        buildScale: function(t) {
            this.scale = new e.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth : 0,
                lineColor: this.options.scaleLineColor,
                angleLineColor: this.options.angleLineColor,
                angleLineWidth: this.options.angleShowLineOut ? this.options.angleLineWidth : 0,
                pointLabelFontColor: this.options.pointLabelFontColor,
                pointLabelFontSize: this.options.pointLabelFontSize,
                pointLabelFontFamily: this.options.pointLabelFontFamily,
                pointLabelFontStyle: this.options.pointLabelFontStyle,
                height: this.chart.height,
                width: this.chart.width,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                labels: t.labels,
                valuesCount: t.datasets[0].data.length
            }), this.scale.setScaleSize(), this.updateScaleRange(t.datasets), this.scale.buildYLabels()
        },
        updateScaleRange: function(t) {
            var e = function() {
                    var e = [];
                    return i.each(t, function(t) {
                        t.data ? e = e.concat(t.data) : i.each(t.points, function(t) {
                            e.push(t.value)
                        })
                    }), e
                }(),
                n = this.options.scaleOverride ? {
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
                } : i.calculateScaleRange(e, i.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            i.extend(this.scale, n)
        },
        addData: function(t, e) {
            this.scale.valuesCount++, i.each(t, function(t, i) {
                var n = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(t));
                this.datasets[i].points.push(new this.PointClass({
                    value: t,
                    label: e,
                    x: n.x,
                    y: n.y,
                    strokeColor: this.datasets[i].pointStrokeColor,
                    fillColor: this.datasets[i].pointColor
                }))
            }, this), this.scale.labels.push(e), this.reflow(), this.update()
        },
        removeData: function() {
            this.scale.valuesCount--, this.scale.labels.shift(), i.each(this.datasets, function(t) {
                t.points.shift()
            }, this), this.reflow(), this.update()
        },
        update: function() {
            this.eachPoints(function(t) {
                t.save()
            }), this.reflow(), this.render()
        },
        reflow: function() {
            i.extend(this.scale, {
                width: this.chart.width,
                height: this.chart.height,
                size: i.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            }), this.updateScaleRange(this.datasets), this.scale.setScaleSize(), this.scale.buildYLabels()
        },
        draw: function(t) {
            var e = t || 1,
                n = this.chart.ctx;
            this.clear(), this.scale.draw(), i.each(this.datasets, function(t) {
                i.each(t.points, function(t, i) {
                    t.hasValue() && t.transition(this.scale.getPointPosition(i, this.scale.calculateCenterOffset(t.value)), e)
                }, this), n.lineWidth = this.options.datasetStrokeWidth, n.strokeStyle = t.strokeColor, n.beginPath(), i.each(t.points, function(t, e) {
                    0 === e ? n.moveTo(t.x, t.y) : n.lineTo(t.x, t.y)
                }, this), n.closePath(), n.stroke(), n.fillStyle = t.fillColor, n.fill(), i.each(t.points, function(t) {
                    t.hasValue() && t.draw()
                })
            }, this)
        }
    })
}.call(this), window.Modernizr = function(t, e, i) {
    function n(t) {
        p.cssText = t
    }

    function s(t, e) {
        return typeof t === e
    }
    var o, r, a, l = "2.6.2",
        c = {},
        u = e.documentElement,
        h = "modernizr",
        d = e.createElement(h),
        p = d.style,
        f = ({}.toString, {}),
        m = [],
        g = m.slice,
        v = {}.hasOwnProperty;
    a = s(v, "undefined") || s(v.call, "undefined") ? function(t, e) {
        return e in t && s(t.constructor.prototype[e], "undefined")
    } : function(t, e) {
        return v.call(t, e)
    }, Function.prototype.bind || (Function.prototype.bind = function(t) {
        var e = this;
        if ("function" != typeof e) throw new TypeError;
        var i = g.call(arguments, 1),
            n = function() {
                if (this instanceof n) {
                    var s = function() {};
                    s.prototype = e.prototype;
                    var o = new s,
                        r = e.apply(o, i.concat(g.call(arguments)));
                    return Object(r) === r ? r : o
                }
                return e.apply(t, i.concat(g.call(arguments)))
            };
        return n
    }), f.canvas = function() {
        var t = e.createElement("canvas");
        return !!t.getContext && !!t.getContext("2d")
    };
    for (var y in f) a(f, y) && (r = y.toLowerCase(), c[r] = f[y](), m.push((c[r] ? "" : "no-") + r));
    return c.addTest = function(t, e) {
            if ("object" == typeof t)
                for (var n in t) a(t, n) && c.addTest(n, t[n]);
            else {
                if (t = t.toLowerCase(), c[t] !== i) return c;
                e = "function" == typeof e ? e() : e, "undefined" != typeof enableClasses && enableClasses && (u.className += " " + (e ? "" : "no-") + t), c[t] = e
            }
            return c
        }, n(""), d = o = null,
        function(t, e) {
            function i(t, e) {
                var i = t.createElement("p"),
                    n = t.getElementsByTagName("head")[0] || t.documentElement;
                return i.innerHTML = "x<style>" + e + "</style>", n.insertBefore(i.lastChild, n.firstChild)
            }

            function n() {
                var t = v.elements;
                return "string" == typeof t ? t.split(" ") : t
            }

            function s(t) {
                var e = g[t[f]];
                return e || (e = {}, m++, t[f] = m, g[m] = e), e
            }

            function o(t, i, n) {
                if (i || (i = e), u) return i.createElement(t);
                n || (n = s(i));
                var o;
                return o = n.cache[t] ? n.cache[t].cloneNode() : p.test(t) ? (n.cache[t] = n.createElem(t)).cloneNode() : n.createElem(t), o.canHaveChildren && !d.test(t) ? n.frag.appendChild(o) : o
            }

            function r(t, i) {
                if (t || (t = e), u) return t.createDocumentFragment();
                i = i || s(t);
                for (var o = i.frag.cloneNode(), r = 0, a = n(), l = a.length; l > r; r++) o.createElement(a[r]);
                return o
            }

            function a(t, e) {
                e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function(i) {
                    return v.shivMethods ? o(i, t, e) : e.createElem(i)
                }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/\w+/g, function(t) {
                    return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
                }) + ");return n}")(v, e.frag)
            }

            function l(t) {
                t || (t = e);
                var n = s(t);
                return v.shivCSS && !c && !n.hasCSS && (n.hasCSS = !!i(t, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), u || a(t, n), t
            }
            var c, u, h = t.html5 || {},
                d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                f = "_html5shiv",
                m = 0,
                g = {};
            ! function() {
                try {
                    var t = e.createElement("a");
                    t.innerHTML = "<xyz></xyz>", c = "hidden" in t, u = 1 == t.childNodes.length || function() {
                        e.createElement("a");
                        var t = e.createDocumentFragment();
                        return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement
                    }()
                } catch (i) {
                    c = !0, u = !0
                }
            }();
            var v = {
                elements: h.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                shivCSS: h.shivCSS !== !1,
                supportsUnknownElements: u,
                shivMethods: h.shivMethods !== !1,
                type: "default",
                shivDocument: l,
                createElement: o,
                createDocumentFragment: r
            };
            t.html5 = v, l(e)
        }(this, e), c._version = l, c
}(this, this.document), function(t, e, i) {
    function n(t) {
        return "[object Function]" == g.call(t)
    }

    function s(t) {
        return "string" == typeof t
    }

    function o() {}

    function r(t) {
        return !t || "loaded" == t || "complete" == t || "uninitialized" == t
    }

    function a() {
        var t = v.shift();
        y = 1, t ? t.t ? f(function() {
            ("c" == t.t ? d.injectCss : d.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
        }, 0) : (t(), a()) : y = 0
    }

    function l(t, i, n, s, o, l, c) {
        function u(e) {
            if (!p && r(h.readyState) && (b.r = p = 1, !y && a(), h.onload = h.onreadystatechange = null, e)) {
                "img" != t && f(function() {
                    x.removeChild(h)
                }, 50);
                for (var n in k[i]) k[i].hasOwnProperty(n) && k[i][n].onload()
            }
        }
        var c = c || d.errorTimeout,
            h = e.createElement(t),
            p = 0,
            g = 0,
            b = {
                t: n,
                s: i,
                e: o,
                a: l,
                x: c
            };
        1 === k[i] && (g = 1, k[i] = []), "object" == t ? h.data = i : (h.src = i, h.type = t), h.width = h.height = "0", h.onerror = h.onload = h.onreadystatechange = function() {
            u.call(this, g)
        }, v.splice(s, 0, b), "img" != t && (g || 2 === k[i] ? (x.insertBefore(h, w ? null : m), f(u, c)) : k[i].push(h))
    }

    function c(t, e, i, n, o) {
        return y = 0, e = e || "j", s(t) ? l("c" == e ? C : _, t, e, this.i++, i, n, o) : (v.splice(this.i++, 0, t), 1 == v.length && a()), this
    }

    function u() {
        var t = d;
        return t.loader = {
            load: c,
            i: 0
        }, t
    }
    var h, d, p = e.documentElement,
        f = t.setTimeout,
        m = e.getElementsByTagName("script")[0],
        g = {}.toString,
        v = [],
        y = 0,
        b = "MozAppearance" in p.style,
        w = b && !!e.createRange().compareNode,
        x = w ? p : m.parentNode,
        p = t.opera && "[object Opera]" == g.call(t.opera),
        p = !!e.attachEvent && !p,
        _ = b ? "object" : p ? "script" : "img",
        C = p ? "script" : _,
        S = Array.isArray || function(t) {
            return "[object Array]" == g.call(t)
        },
        T = [],
        k = {},
        E = {
            timeout: function(t, e) {
                return e.length && (t.timeout = e[0]), t
            }
        };
    d = function(t) {
        function e(t) {
            var e, i, n, t = t.split("!"),
                s = T.length,
                o = t.pop(),
                r = t.length,
                o = {
                    url: o,
                    origUrl: o,
                    prefixes: t
                };
            for (i = 0; r > i; i++) n = t[i].split("="), (e = E[n.shift()]) && (o = e(o, n));
            for (i = 0; s > i; i++) o = T[i](o);
            return o
        }

        function r(t, s, o, r, a) {
            var l = e(t),
                c = l.autoCallback;
            l.url.split(".").pop().split("?").shift(), l.bypass || (s && (s = n(s) ? s : s[t] || s[r] || s[t.split("/").pop().split("?")[0]]), l.instead ? l.instead(t, s, o, r, a) : (k[l.url] ? l.noexec = !0 : k[l.url] = 1, o.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : i, l.noexec, l.attrs, l.timeout), (n(s) || n(c)) && o.load(function() {
                u(), s && s(l.origUrl, a, r), c && c(l.origUrl, a, r), k[l.url] = 2
            })))
        }

        function a(t, e) {
            function i(t, i) {
                if (t) {
                    if (s(t)) i || (h = function() {
                        var t = [].slice.call(arguments);
                        d.apply(this, t), p()
                    }), r(t, h, e, 0, c);
                    else if (Object(t) === t)
                        for (l in a = function() {
                            var e, i = 0;
                            for (e in t) t.hasOwnProperty(e) && i++;
                            return i
                        }(), t) t.hasOwnProperty(l) && (!i && !--a && (n(h) ? h = function() {
                            var t = [].slice.call(arguments);
                            d.apply(this, t), p()
                        } : h[l] = function(t) {
                            return function() {
                                var e = [].slice.call(arguments);
                                t && t.apply(this, e), p()
                            }
                        }(d[l])), r(t[l], h, e, l, c))
                } else !i && p()
            }
            var a, l, c = !!t.test,
                u = t.load || t.both,
                h = t.callback || o,
                d = h,
                p = t.complete || o;
            i(c ? t.yep : t.nope, !!u), u && i(u)
        }
        var l, c, h = this.yepnope.loader;
        if (s(t)) r(t, 0, h, 0);
        else if (S(t))
            for (l = 0; l < t.length; l++) c = t[l], s(c) ? r(c, 0, h, 0) : S(c) ? d(c) : Object(c) === c && a(c, h);
        else Object(t) === t && a(t, h)
    }, d.addPrefix = function(t, e) {
        E[t] = e
    }, d.addFilter = function(t) {
        T.push(t)
    }, d.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", h = function() {
        e.removeEventListener("DOMContentLoaded", h, 0), e.readyState = "complete"
    }, 0)), t.yepnope = u(), t.yepnope.executeStack = a, t.yepnope.injectJs = function(t, i, n, s, l, c) {
        var u, h, p = e.createElement("script"),
            s = s || d.errorTimeout;
        p.src = t;
        for (h in n) p.setAttribute(h, n[h]);
        i = c ? a : i || o, p.onreadystatechange = p.onload = function() {
            !u && r(p.readyState) && (u = 1, i(), p.onload = p.onreadystatechange = null)
        }, f(function() {
            u || (u = 1, i(1))
        }, s), l ? p.onload() : m.parentNode.insertBefore(p, m)
    }, t.yepnope.injectCss = function(t, i, n, s, r, l) {
        var c, s = e.createElement("link"),
            i = l ? a : i || o;
        s.href = t, s.rel = "stylesheet", s.type = "text/css";
        for (c in n) s.setAttribute(c, n[c]);
        r || (m.parentNode.insertBefore(s, m), f(i, 0))
    }
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, ! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("undefined" != typeof jQuery ? jQuery : window.Zepto)
}(function(t) {
    "use strict";

    function e(e) {
        var i = e.data;
        e.isDefaultPrevented() || (e.preventDefault(), t(e.target).ajaxSubmit(i))
    }

    function i(e) {
        var i = e.target,
            n = t(i);
        if (!n.is("[type=submit],[type=image]")) {
            var s = n.closest("[type=submit]");
            if (0 === s.length) return;
            i = s[0]
        }
        var o = this;
        if (o.clk = i, "image" == i.type)
            if (void 0 !== e.offsetX) o.clk_x = e.offsetX, o.clk_y = e.offsetY;
            else if ("function" == typeof t.fn.offset) {
            var r = n.offset();
            o.clk_x = e.pageX - r.left, o.clk_y = e.pageY - r.top
        } else o.clk_x = e.pageX - i.offsetLeft, o.clk_y = e.pageY - i.offsetTop;
        setTimeout(function() {
            o.clk = o.clk_x = o.clk_y = null
        }, 100)
    }

    function n() {
        if (t.fn.ajaxSubmit.debug) {
            var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e)
        }
    }
    var s = {};
    s.fileapi = void 0 !== t("<input type='file'/>").get(0).files, s.formdata = void 0 !== window.FormData;
    var o = !!t.fn.prop;
    t.fn.attr2 = function() {
        if (!o) return this.attr.apply(this, arguments);
        var t = this.prop.apply(this, arguments);
        return t && t.jquery || "string" == typeof t ? t : this.attr.apply(this, arguments)
    }, t.fn.ajaxSubmit = function(e) {
        function i(i) {
            var n, s, o = t.param(i, e.traditional).split("&"),
                r = o.length,
                a = [];
            for (n = 0; r > n; n++) o[n] = o[n].replace(/\+/g, " "), s = o[n].split("="), a.push([decodeURIComponent(s[0]), decodeURIComponent(s[1])]);
            return a
        }

        function r(n) {
            for (var s = new FormData, o = 0; o < n.length; o++) s.append(n[o].name, n[o].value);
            if (e.extraData) {
                var r = i(e.extraData);
                for (o = 0; o < r.length; o++) r[o] && s.append(r[o][0], r[o][1])
            }
            e.data = null;
            var a = t.extend(!0, {}, t.ajaxSettings, e, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: l || "POST"
            });
            e.uploadProgress && (a.xhr = function() {
                var i = t.ajaxSettings.xhr();
                return i.upload && i.upload.addEventListener("progress", function(t) {
                    var i = 0,
                        n = t.loaded || t.position,
                        s = t.total;
                    t.lengthComputable && (i = Math.ceil(n / s * 100)), e.uploadProgress(t, n, s, i)
                }, !1), i
            }), a.data = null;
            var c = a.beforeSend;
            return a.beforeSend = function(t, i) {
                i.data = e.formData ? e.formData : s, c && c.call(this, t, i)
            }, t.ajax(a)
        }

        function a(i) {
            function s(t) {
                var e = null;
                try {
                    t.contentWindow && (e = t.contentWindow.document)
                } catch (i) {
                    n("cannot get iframe.contentWindow document: " + i)
                }
                if (e) return e;
                try {
                    e = t.contentDocument ? t.contentDocument : t.document
                } catch (i) {
                    n("cannot get iframe.contentDocument: " + i), e = t.document
                }
                return e
            }

            function r() {
                function e() {
                    try {
                        var t = s(v).readyState;
                        n("state = " + t), t && "uninitialized" == t.toLowerCase() && setTimeout(e, 50)
                    } catch (i) {
                        n("Server abort: ", i, " (", i.name, ")"), a(k), _ && clearTimeout(_), _ = void 0
                    }
                }
                var i = h.attr2("target"),
                    o = h.attr2("action"),
                    r = "multipart/form-data",
                    c = h.attr("enctype") || h.attr("encoding") || r;
                C.setAttribute("target", f), (!l || /post/i.test(l)) && C.setAttribute("method", "POST"), o != d.url && C.setAttribute("action", d.url), d.skipEncodingOverride || l && !/post/i.test(l) || h.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), d.timeout && (_ = setTimeout(function() {
                    x = !0, a(T)
                }, d.timeout));
                var u = [];
                try {
                    if (d.extraData)
                        for (var p in d.extraData) d.extraData.hasOwnProperty(p) && u.push(t.isPlainObject(d.extraData[p]) && d.extraData[p].hasOwnProperty("name") && d.extraData[p].hasOwnProperty("value") ? t('<input type="hidden" name="' + d.extraData[p].name + '">').val(d.extraData[p].value).appendTo(C)[0] : t('<input type="hidden" name="' + p + '">').val(d.extraData[p]).appendTo(C)[0]);
                    d.iframeTarget || g.appendTo("body"), v.attachEvent ? v.attachEvent("onload", a) : v.addEventListener("load", a, !1), setTimeout(e, 15);
                    try {
                        C.submit()
                    } catch (m) {
                        var y = document.createElement("form").submit;
                        y.apply(C)
                    }
                } finally {
                    C.setAttribute("action", o), C.setAttribute("enctype", c), i ? C.setAttribute("target", i) : h.removeAttr("target"), t(u).remove()
                }
            }

            function a(e) {
                if (!y.aborted && !D) {
                    if (I = s(v), I || (n("cannot access response document"), e = k), e === T && y) return y.abort("timeout"), void S.reject(y, "timeout");
                    if (e == k && y) return y.abort("server abort"), void S.reject(y, "error", "server abort");
                    if (I && I.location.href != d.iframeSrc || x) {
                        v.detachEvent ? v.detachEvent("onload", a) : v.removeEventListener("load", a, !1);
                        var i, o = "success";
                        try {
                            if (x) throw "timeout";
                            var r = "xml" == d.dataType || I.XMLDocument || t.isXMLDoc(I);
                            if (n("isXml=" + r), !r && window.opera && (null === I.body || !I.body.innerHTML) && --A) return n("requeing onLoad callback, DOM not available"), void setTimeout(a, 250);
                            var l = I.body ? I.body : I.documentElement;
                            y.responseText = l ? l.innerHTML : null, y.responseXML = I.XMLDocument ? I.XMLDocument : I, r && (d.dataType = "xml"), y.getResponseHeader = function(t) {
                                var e = {
                                    "content-type": d.dataType
                                };
                                return e[t.toLowerCase()]
                            }, l && (y.status = Number(l.getAttribute("status")) || y.status, y.statusText = l.getAttribute("statusText") || y.statusText);
                            var c = (d.dataType || "").toLowerCase(),
                                u = /(json|script|text)/.test(c);
                            if (u || d.textarea) {
                                var h = I.getElementsByTagName("textarea")[0];
                                if (h) y.responseText = h.value, y.status = Number(h.getAttribute("status")) || y.status, y.statusText = h.getAttribute("statusText") || y.statusText;
                                else if (u) {
                                    var f = I.getElementsByTagName("pre")[0],
                                        m = I.getElementsByTagName("body")[0];
                                    f ? y.responseText = f.textContent ? f.textContent : f.innerText : m && (y.responseText = m.textContent ? m.textContent : m.innerText)
                                }
                            } else "xml" == c && !y.responseXML && y.responseText && (y.responseXML = M(y.responseText));
                            try {
                                P = F(y, c, d)
                            } catch (b) {
                                o = "parsererror", y.error = i = b || o
                            }
                        } catch (b) {
                            n("error caught: ", b), o = "error", y.error = i = b || o
                        }
                        y.aborted && (n("upload aborted"), o = null), y.status && (o = y.status >= 200 && y.status < 300 || 304 === y.status ? "success" : "error"), "success" === o ? (d.success && d.success.call(d.context, P, "success", y), S.resolve(y.responseText, "success", y), p && t.event.trigger("ajaxSuccess", [y, d])) : o && (void 0 === i && (i = y.statusText), d.error && d.error.call(d.context, y, o, i), S.reject(y, "error", i), p && t.event.trigger("ajaxError", [y, d, i])), p && t.event.trigger("ajaxComplete", [y, d]), p && !--t.active && t.event.trigger("ajaxStop"), d.complete && d.complete.call(d.context, y, o), D = !0, d.timeout && clearTimeout(_), setTimeout(function() {
                            d.iframeTarget ? g.attr("src", d.iframeSrc) : g.remove(), y.responseXML = null
                        }, 100)
                    }
                }
            }
            var c, u, d, p, f, g, v, y, b, w, x, _, C = h[0],
                S = t.Deferred();
            if (S.abort = function(t) {
                y.abort(t)
            }, i)
                for (u = 0; u < m.length; u++) c = t(m[u]), o ? c.prop("disabled", !1) : c.removeAttr("disabled");
            if (d = t.extend(!0, {}, t.ajaxSettings, e), d.context = d.context || d, f = "jqFormIO" + (new Date).getTime(), d.iframeTarget ? (g = t(d.iframeTarget), w = g.attr2("name"), w ? f = w : g.attr2("name", f)) : (g = t('<iframe name="' + f + '" src="' + d.iframeSrc + '" />'), g.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            })), v = g[0], y = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(e) {
                    var i = "timeout" === e ? "timeout" : "aborted";
                    n("aborting upload... " + i), this.aborted = 1;
                    try {
                        v.contentWindow.document.execCommand && v.contentWindow.document.execCommand("Stop")
                    } catch (s) {}
                    g.attr("src", d.iframeSrc), y.error = i, d.error && d.error.call(d.context, y, i, e), p && t.event.trigger("ajaxError", [y, d, i]), d.complete && d.complete.call(d.context, y, i)
                }
            }, p = d.global, p && 0 === t.active++ && t.event.trigger("ajaxStart"), p && t.event.trigger("ajaxSend", [y, d]), d.beforeSend && d.beforeSend.call(d.context, y, d) === !1) return d.global && t.active--, S.reject(), S;
            if (y.aborted) return S.reject(), S;
            b = C.clk, b && (w = b.name, w && !b.disabled && (d.extraData = d.extraData || {}, d.extraData[w] = b.value, "image" == b.type && (d.extraData[w + ".x"] = C.clk_x, d.extraData[w + ".y"] = C.clk_y)));
            var T = 1,
                k = 2,
                E = t("meta[name=csrf-token]").attr("content"),
                L = t("meta[name=csrf-param]").attr("content");
            L && E && (d.extraData = d.extraData || {}, d.extraData[L] = E), d.forceSync ? r() : setTimeout(r, 10);
            var P, I, D, A = 50,
                M = t.parseXML || function(t, e) {
                    return window.ActiveXObject ? (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(t)) : e = (new DOMParser).parseFromString(t, "text/xml"), e && e.documentElement && "parsererror" != e.documentElement.nodeName ? e : null
                },
                O = t.parseJSON || function(t) {
                    return window.eval("(" + t + ")")
                },
                F = function(e, i, n) {
                    var s = e.getResponseHeader("content-type") || "",
                        o = "xml" === i || !i && s.indexOf("xml") >= 0,
                        r = o ? e.responseXML : e.responseText;
                    return o && "parsererror" === r.documentElement.nodeName && t.error && t.error("parsererror"), n && n.dataFilter && (r = n.dataFilter(r, i)), "string" == typeof r && ("json" === i || !i && s.indexOf("json") >= 0 ? r = O(r) : ("script" === i || !i && s.indexOf("javascript") >= 0) && t.globalEval(r)), r
                };
            return S
        }
        if (!this.length) return n("ajaxSubmit: skipping submit process - no element selected"), this;
        var l, c, u, h = this;
        "function" == typeof e ? e = {
            success: e
        } : void 0 === e && (e = {}), l = e.type || this.attr2("method"), c = e.url || this.attr2("action"), u = "string" == typeof c ? t.trim(c) : "", u = u || window.location.href || "", u && (u = (u.match(/^([^#]+)/) || [])[1]), e = t.extend(!0, {
            url: u,
            success: t.ajaxSettings.success,
            type: l || t.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, e);
        var d = {};
        if (this.trigger("form-pre-serialize", [this, e, d]), d.veto) return n("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (e.beforeSerialize && e.beforeSerialize(this, e) === !1) return n("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var p = e.traditional;
        void 0 === p && (p = t.ajaxSettings.traditional);
        var f, m = [],
            g = this.formToArray(e.semantic, m);
        if (e.data && (e.extraData = e.data, f = t.param(e.data, p)), e.beforeSubmit && e.beforeSubmit(g, this, e) === !1) return n("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [g, this, e, d]), d.veto) return n("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var v = t.param(g, p);
        f && (v = v ? v + "&" + f : f), "GET" == e.type.toUpperCase() ? (e.url += (e.url.indexOf("?") >= 0 ? "&" : "?") + v, e.data = null) : e.data = v;
        var y = [];
        if (e.resetForm && y.push(function() {
            h.resetForm()
        }), e.clearForm && y.push(function() {
            h.clearForm(e.includeHidden)
        }), !e.dataType && e.target) {
            var b = e.success || function() {};
            y.push(function(i) {
                var n = e.replaceTarget ? "replaceWith" : "html";
                t(e.target)[n](i).each(b, arguments)
            })
        } else e.success && y.push(e.success); if (e.success = function(t, i, n) {
            for (var s = e.context || this, o = 0, r = y.length; r > o; o++) y[o].apply(s, [t, i, n || h, h])
        }, e.error) {
            var w = e.error;
            e.error = function(t, i, n) {
                var s = e.context || this;
                w.apply(s, [t, i, n, h])
            }
        }
        if (e.complete) {
            var x = e.complete;
            e.complete = function(t, i) {
                var n = e.context || this;
                x.apply(n, [t, i, h])
            }
        }
        var _ = t("input[type=file]:enabled", this).filter(function() {
                return "" !== t(this).val()
            }),
            C = _.length > 0,
            S = "multipart/form-data",
            T = h.attr("enctype") == S || h.attr("encoding") == S,
            k = s.fileapi && s.formdata;
        n("fileAPI :" + k);
        var E, L = (C || T) && !k;
        e.iframe !== !1 && (e.iframe || L) ? e.closeKeepAlive ? t.get(e.closeKeepAlive, function() {
            E = a(g)
        }) : E = a(g) : E = (C || T) && k ? r(g) : t.ajax(e), h.removeData("jqxhr").data("jqxhr", E);
        for (var P = 0; P < m.length; P++) m[P] = null;
        return this.trigger("form-submit-notify", [this, e]), this
    }, t.fn.ajaxForm = function(s) {
        if (s = s || {}, s.delegation = s.delegation && t.isFunction(t.fn.on), !s.delegation && 0 === this.length) {
            var o = {
                s: this.selector,
                c: this.context
            };
            return !t.isReady && o.s ? (n("DOM not ready, queuing ajaxForm"), t(function() {
                t(o.s, o.c).ajaxForm(s)
            }), this) : (n("terminating; zero elements found by selector" + (t.isReady ? "" : " (DOM not ready)")), this)
        }
        return s.delegation ? (t(document).off("submit.form-plugin", this.selector, e).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, s, e).on("click.form-plugin", this.selector, s, i), this) : this.ajaxFormUnbind().bind("submit.form-plugin", s, e).bind("click.form-plugin", s, i)
    }, t.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, t.fn.formToArray = function(e, i) {
        var n = [];
        if (0 === this.length) return n;
        var o, r = this[0],
            a = this.attr("id"),
            l = e ? r.getElementsByTagName("*") : r.elements;
        if (l && !/MSIE [678]/.test(navigator.userAgent) && (l = t(l).get()), a && (o = t(':input[form="' + a + '"]').get(), o.length && (l = (l || []).concat(o))), !l || !l.length) return n;
        var c, u, h, d, p, f, m;
        for (c = 0, f = l.length; f > c; c++)
            if (p = l[c], h = p.name, h && !p.disabled)
                if (e && r.clk && "image" == p.type) r.clk == p && (n.push({
                    name: h,
                    value: t(p).val(),
                    type: p.type
                }), n.push({
                    name: h + ".x",
                    value: r.clk_x
                }, {
                    name: h + ".y",
                    value: r.clk_y
                }));
                else if (d = t.fieldValue(p, !0), d && d.constructor == Array)
            for (i && i.push(p), u = 0, m = d.length; m > u; u++) n.push({
                name: h,
                value: d[u]
            });
        else if (s.fileapi && "file" == p.type) {
            i && i.push(p);
            var g = p.files;
            if (g.length)
                for (u = 0; u < g.length; u++) n.push({
                    name: h,
                    value: g[u],
                    type: p.type
                });
            else n.push({
                name: h,
                value: "",
                type: p.type
            })
        } else null !== d && "undefined" != typeof d && (i && i.push(p), n.push({
            name: h,
            value: d,
            type: p.type,
            required: p.required
        })); if (!e && r.clk) {
            var v = t(r.clk),
                y = v[0];
            h = y.name, h && !y.disabled && "image" == y.type && (n.push({
                name: h,
                value: v.val()
            }), n.push({
                name: h + ".x",
                value: r.clk_x
            }, {
                name: h + ".y",
                value: r.clk_y
            }))
        }
        return n
    }, t.fn.formSerialize = function(e) {
        return t.param(this.formToArray(e))
    }, t.fn.fieldSerialize = function(e) {
        var i = [];
        return this.each(function() {
            var n = this.name;
            if (n) {
                var s = t.fieldValue(this, e);
                if (s && s.constructor == Array)
                    for (var o = 0, r = s.length; r > o; o++) i.push({
                        name: n,
                        value: s[o]
                    });
                else null !== s && "undefined" != typeof s && i.push({
                    name: this.name,
                    value: s
                })
            }
        }), t.param(i)
    }, t.fn.fieldValue = function(e) {
        for (var i = [], n = 0, s = this.length; s > n; n++) {
            var o = this[n],
                r = t.fieldValue(o, e);
            null === r || "undefined" == typeof r || r.constructor == Array && !r.length || (r.constructor == Array ? t.merge(i, r) : i.push(r))
        }
        return i
    }, t.fieldValue = function(e, i) {
        var n = e.name,
            s = e.type,
            o = e.tagName.toLowerCase();
        if (void 0 === i && (i = !0), i && (!n || e.disabled || "reset" == s || "button" == s || ("checkbox" == s || "radio" == s) && !e.checked || ("submit" == s || "image" == s) && e.form && e.form.clk != e || "select" == o && -1 == e.selectedIndex)) return null;
        if ("select" == o) {
            var r = e.selectedIndex;
            if (0 > r) return null;
            for (var a = [], l = e.options, c = "select-one" == s, u = c ? r + 1 : l.length, h = c ? r : 0; u > h; h++) {
                var d = l[h];
                if (d.selected) {
                    var p = d.value;
                    if (p || (p = d.attributes && d.attributes.value && !d.attributes.value.specified ? d.text : d.value), c) return p;
                    a.push(p)
                }
            }
            return a
        }
        return t(e).val()
    }, t.fn.clearForm = function(e) {
        return this.each(function() {
            t("input,select,textarea", this).clearFields(e)
        })
    }, t.fn.clearFields = t.fn.clearInputs = function(e) {
        var i = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var n = this.type,
                s = this.tagName.toLowerCase();
            i.test(n) || "textarea" == s ? this.value = "" : "checkbox" == n || "radio" == n ? this.checked = !1 : "select" == s ? this.selectedIndex = -1 : "file" == n ? /MSIE/.test(navigator.userAgent) ? t(this).replaceWith(t(this).clone(!0)) : t(this).val("") : e && (e === !0 && /hidden/.test(n) || "string" == typeof e && t(this).is(e)) && (this.value = "")
        })
    }, t.fn.resetForm = function() {
        return this.each(function() {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, t.fn.enable = function(t) {
        return void 0 === t && (t = !0), this.each(function() {
            this.disabled = !t
        })
    }, t.fn.selected = function(e) {
        return void 0 === e && (e = !0), this.each(function() {
            var i = this.type;
            if ("checkbox" == i || "radio" == i) this.checked = e;
            else if ("option" == this.tagName.toLowerCase()) {
                var n = t(this).parent("select");
                e && n[0] && "select-one" == n[0].type && n.find("option").selected(!1), this.selected = e
            }
        })
    }, t.fn.ajaxSubmit.debug = !1
}), ! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(t) {
    var e, i, n, s, o, r, a = "Close",
        l = "BeforeClose",
        c = "AfterClose",
        u = "BeforeAppend",
        h = "MarkupParse",
        d = "Open",
        p = "Change",
        f = "mfp",
        m = "." + f,
        g = "mfp-ready",
        v = "mfp-removing",
        y = "mfp-prevent-close",
        b = function() {},
        w = !!window.jQuery,
        x = t(window),
        _ = function(t, i) {
            e.ev.on(f + t + m, i)
        },
        C = function(e, i, n, s) {
            var o = document.createElement("div");
            return o.className = "mfp-" + e, n && (o.innerHTML = n), s ? i && i.appendChild(o) : (o = t(o), i && o.appendTo(i)), o
        },
        S = function(i, n) {
            e.ev.triggerHandler(f + i, n), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]))
        },
        T = function(i) {
            return i === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = i), e.currTemplate.closeBtn
        },
        k = function() {
            t.magnificPopup.instance || (e = new b, e.init(), t.magnificPopup.instance = e)
        },
        E = function() {
            var t = document.createElement("p").style,
                e = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== t.transition) return !0;
            for (; e.length;)
                if (e.pop() + "Transition" in t) return !0;
            return !1
        };
    b.prototype = {
        constructor: b,
        init: function() {
            var i = navigator.appVersion;
            e.isIE7 = -1 !== i.indexOf("MSIE 7."), e.isIE8 = -1 !== i.indexOf("MSIE 8."), e.isLowIE = e.isIE7 || e.isIE8, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = E(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = t(document), e.popupsCache = {}
        },
        open: function(i) {
            var s;
            if (i.isObj === !1) {
                e.items = i.items.toArray(), e.index = 0;
                var r, a = i.items;
                for (s = 0; s < a.length; s++)
                    if (r = a[s], r.parsed && (r = r.el[0]), r === i.el[0]) {
                        e.index = s;
                        break
                    }
            } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0; if (e.isOpen) return void e.updateItemHTML();
            e.types = [], o = "", e.ev = i.mainEl && i.mainEl.length ? i.mainEl.eq(0) : n, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = C("bg").on("click" + m, function() {
                e.close()
            }), e.wrap = C("wrap").attr("tabindex", -1).on("click" + m, function(t) {
                e._checkIfClose(t.target) && e.close()
            }), e.container = C("container", e.wrap)), e.contentContainer = C("content"), e.st.preloader && (e.preloader = C("preloader", e.container, e.st.tLoading));
            var l = t.magnificPopup.modules;
            for (s = 0; s < l.length; s++) {
                var c = l[s];
                c = c.charAt(0).toUpperCase() + c.slice(1), e["init" + c].call(e)
            }
            S("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (_(h, function(t, e, i, n) {
                i.close_replaceWith = T(n.type)
            }), o += " mfp-close-btn-in") : e.wrap.append(T())), e.st.alignTop && (o += " mfp-align-top"), e.wrap.css(e.fixedContentPos ? {
                overflow: e.st.overflowY,
                overflowX: "hidden",
                overflowY: e.st.overflowY
            } : {
                top: x.scrollTop(),
                position: "absolute"
            }), (e.st.fixedBgPos === !1 || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                height: n.height(),
                position: "absolute"
            }), e.st.enableEscapeKey && n.on("keyup" + m, function(t) {
                27 === t.keyCode && e.close()
            }), x.on("resize" + m, function() {
                e.updateSize()
            }), e.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && e.wrap.addClass(o);
            var u = e.wH = x.height(),
                p = {};
            if (e.fixedContentPos && e._hasScrollBar(u)) {
                var f = e._getScrollbarSize();
                f && (p.marginRight = f)
            }
            e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : p.overflow = "hidden");
            var v = e.st.mainClass;
            return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), S("BuildControls"), t("html").css(p), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function() {
                e.content ? (e._addClassToMFP(g), e._setFocus()) : e.bgOverlay.addClass(g), n.on("focusin" + m, e._onFocusIn)
            }, 16), e.isOpen = !0, e.updateSize(u), S(d), i
        },
        close: function() {
            e.isOpen && (S(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(v), setTimeout(function() {
                e._close()
            }, e.st.removalDelay)) : e._close())
        },
        _close: function() {
            S(a);
            var i = v + " " + g + " ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
                var s = {
                    marginRight: ""
                };
                e.isIE7 ? t("body, html").css("overflow", "") : s.overflow = "", t("html").css(s)
            }
            n.off("keyup" + m + " focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0 || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, S(c)
        },
        updateSize: function(t) {
            if (e.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth,
                    n = window.innerHeight * i;
                e.wrap.css("height", n), e.wH = n
            } else e.wH = t || x.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), S("Resize")
        },
        updateItemHTML: function() {
            var i = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
            var n = i.type;
            if (S("BeforeChange", [e.currItem ? e.currItem.type : "", n]), e.currItem = i, !e.currTemplate[n]) {
                var o = e.st[n] ? e.st[n].markup : !1;
                S("FirstMarkupParse", o), e.currTemplate[n] = o ? t(o) : !0
            }
            s && s !== i.type && e.container.removeClass("mfp-" + s + "-holder");
            var r = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
            e.appendContent(r, n), i.preloaded = !0, S(p, i), s = i.type, e.container.prepend(e.contentContainer), S("AfterChange")
        },
        appendContent: function(t, i) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && e.currTemplate[i] === !0 ? e.content.find(".mfp-close").length || e.content.append(T()) : e.content = t : e.content = "", S(u), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
        },
        parseEl: function(i) {
            var n, s = e.items[i];
            if (s.tagName ? s = {
                el: t(s)
            } : (n = s.type, s = {
                data: s,
                src: s.src
            }), s.el) {
                for (var o = e.types, r = 0; r < o.length; r++)
                    if (s.el.hasClass("mfp-" + o[r])) {
                        n = o[r];
                        break
                    }
                s.src = s.el.attr("data-mfp-src"), s.src || (s.src = s.el.attr("href"))
            }
            return s.type = n || e.st.type || "inline", s.index = i, s.parsed = !0, e.items[i] = s, S("ElementParse", s), e.items[i]
        },
        addGroup: function(t, i) {
            var n = function(n) {
                n.mfpEl = this, e._openClick(n, t, i)
            };
            i || (i = {});
            var s = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(s).on(s, n)) : (i.isObj = !1, i.delegate ? t.off(s).on(s, i.delegate, n) : (i.items = t, t.off(s).on(s, n)))
        },
        _openClick: function(i, n, s) {
            var o = void 0 !== s.midClick ? s.midClick : t.magnificPopup.defaults.midClick;
            if (o || 2 !== i.which && !i.ctrlKey && !i.metaKey) {
                var r = void 0 !== s.disableOn ? s.disableOn : t.magnificPopup.defaults.disableOn;
                if (r)
                    if (t.isFunction(r)) {
                        if (!r.call(e)) return !0
                    } else if (x.width() < r) return !0;
                i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), s.el = t(i.mfpEl), s.delegate && (s.items = n.find(s.delegate)), e.open(s)
            }
        },
        updateStatus: function(t, n) {
            if (e.preloader) {
                i !== t && e.container.removeClass("mfp-s-" + i), n || "loading" !== t || (n = e.st.tLoading);
                var s = {
                    status: t,
                    text: n
                };
                S("UpdateStatus", s), t = s.status, n = s.text, e.preloader.html(n), e.preloader.find("a").on("click", function(t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), i = t
            }
        },
        _checkIfClose: function(i) {
            if (!t(i).hasClass(y)) {
                var n = e.st.closeOnContentClick,
                    s = e.st.closeOnBgClick;
                if (n && s) return !0;
                if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;
                if (i === e.content[0] || t.contains(e.content[0], i)) {
                    if (n) return !0
                } else if (s && t.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        },
        _hasScrollBar: function(t) {
            return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || x.height())
        },
        _setFocus: function() {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        },
        _onFocusIn: function(i) {
            return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1)
        },
        _parseMarkup: function(e, i, n) {
            var s;
            n.data && (i = t.extend(n.data, i)), S(h, [e, i, n]), t.each(i, function(t, i) {
                if (void 0 === i || i === !1) return !0;
                if (s = t.split("_"), s.length > 1) {
                    var n = e.find(m + "-" + s[0]);
                    if (n.length > 0) {
                        var o = s[1];
                        "replaceWith" === o ? n[0] !== i[0] && n.replaceWith(i) : "img" === o ? n.is("img") ? n.attr("src", i) : n.replaceWith('<img src="' + i + '" class="' + n.attr("class") + '" />') : n.attr(s[1], i)
                    }
                } else e.find(m + "-" + t).html(i)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: b.prototype,
        modules: [],
        open: function(e, i) {
            return k(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = i || 0, this.instance.open(e)
        },
        close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function(e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, t.fn.magnificPopup = function(i) {
        k();
        var n = t(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var s, o = w ? n.data("magnificPopup") : n[0].magnificPopup,
                    r = parseInt(arguments[1], 10) || 0;
                o.items ? s = o.items[r] : (s = n, o.delegate && (s = s.find(o.delegate)), s = s.eq(r)), e._openClick({
                    mfpEl: s
                }, n, o)
            } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
        else i = t.extend(!0, {}, i), w ? n.data("magnificPopup", i) : n[0].magnificPopup = i, e.addGroup(n, i);
        return n
    };
    var L, P, I, D = "inline",
        A = function() {
            I && (P.after(I.addClass(L)).detach(), I = null)
        };
    t.magnificPopup.registerModule(D, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                e.types.push(D), _(a + "." + D, function() {
                    A()
                })
            },
            getInline: function(i, n) {
                if (A(), i.src) {
                    var s = e.st.inline,
                        o = t(i.src);
                    if (o.length) {
                        var r = o[0].parentNode;
                        r && r.tagName && (P || (L = s.hiddenClass, P = C(L), L = "mfp-" + L), I = o.after(P).detach().removeClass(L)), e.updateStatus("ready")
                    } else e.updateStatus("error", s.tNotFound), o = t("<div>");
                    return i.inlineElement = o, o
                }
                return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n
            }
        }
    });
    var M, O = "ajax",
        F = function() {
            M && t(document.body).removeClass(M)
        },
        N = function() {
            F(), e.req && e.req.abort()
        };
    t.magnificPopup.registerModule(O, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                e.types.push(O), M = e.st.ajax.cursor, _(a + "." + O, N), _("BeforeChange." + O, N)
            },
            getAjax: function(i) {
                M && t(document.body).addClass(M), e.updateStatus("loading");
                var n = t.extend({
                    url: i.src,
                    success: function(n, s, o) {
                        var r = {
                            data: n,
                            xhr: o
                        };
                        S("ParseAjax", r), e.appendContent(t(r.data), O), i.finished = !0, F(), e._setFocus(), setTimeout(function() {
                            e.wrap.addClass(g)
                        }, 16), e.updateStatus("ready"), S("AjaxContentAdded")
                    },
                    error: function() {
                        F(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(n), ""
            }
        }
    });
    var z, j = function(i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var n = e.st.image.titleSrc;
        if (n) {
            if (t.isFunction(n)) return n.call(e, i);
            if (i.el) return i.el.attr(n) || ""
        }
        return ""
    };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = e.st.image,
                    n = ".image";
                e.types.push("image"), _(d + n, function() {
                    "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                }), _(a + n, function() {
                    i.cursor && t(document.body).removeClass(i.cursor), x.off("resize" + m)
                }), _("Resize" + n, e.resizeImage), e.isLowIE && _("AfterChange", e.resizeImage)
            },
            resizeImage: function() {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var i = 0;
                    e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0, z && clearInterval(z), t.isCheckingImgSize = !1, S("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            },
            findImageSize: function(t) {
                var i = 0,
                    n = t.img[0],
                    s = function(o) {
                        z && clearInterval(z), z = setInterval(function() {
                            return n.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(z), i++, void(3 === i ? s(10) : 40 === i ? s(50) : 100 === i && s(500)))
                        }, o)
                    };
                s(1)
            },
            getImage: function(i, n) {
                var s = 0,
                    o = function() {
                        i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, S("ImageLoadComplete")) : (s++, 200 > s ? setTimeout(o, 100) : r()))
                    },
                    r = function() {
                        i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                    },
                    a = e.st.image,
                    l = n.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = t(c).on("load.mfploader", o).on("error.mfploader", r), c.src = i.src, l.is("img") && (i.img = i.img.clone()), c = i.img[0], c.naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
                }
                return e._parseMarkup(n, {
                    title: j(i),
                    img_replaceWith: i.img
                }, i), e.resizeImage(), i.hasSize ? (z && clearInterval(z), i.loadError ? (n.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), e.updateStatus("ready")), n) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), e.findImageSize(i)), n)
            }
        }
    });
    var R, W = function() {
        return void 0 === R && (R = void 0 !== document.createElement("p").style.MozTransform), R
    };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(t) {
                return t.is("img") ? t : t.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var t, i = e.st.zoom,
                    n = ".zoom";
                if (i.enabled && e.supportsTransition) {
                    var s, o, r = i.duration,
                        c = function(t) {
                            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                n = "all " + i.duration / 1e3 + "s " + i.easing,
                                s = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                o = "transition";
                            return s["-webkit-" + o] = s["-moz-" + o] = s["-o-" + o] = s[o] = n, e.css(s), e
                        },
                        u = function() {
                            e.content.css("visibility", "visible")
                        };
                    _("BuildControls" + n, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(s), e.content.css("visibility", "hidden"), t = e._getItemToZoom(), !t) return void u();
                            o = c(t), o.css(e._getOffset()), e.wrap.append(o), s = setTimeout(function() {
                                o.css(e._getOffset(!0)), s = setTimeout(function() {
                                    u(), setTimeout(function() {
                                        o.remove(), t = o = null, S("ZoomAnimationEnded")
                                    }, 16)
                                }, r)
                            }, 16)
                        }
                    }), _(l + n, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(s), e.st.removalDelay = r, !t) {
                                if (t = e._getItemToZoom(), !t) return;
                                o = c(t)
                            }
                            o.css(e._getOffset(!0)), e.wrap.append(o), e.content.css("visibility", "hidden"), setTimeout(function() {
                                o.css(e._getOffset())
                            }, 16)
                        }
                    }), _(a + n, function() {
                        e._allowZoom() && (u(), o && o.remove(), t = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === e.currItem.type
            },
            _getItemToZoom: function() {
                return e.currItem.hasSize ? e.currItem.img : !1
            },
            _getOffset: function(i) {
                var n;
                n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
                var s = n.offset(),
                    o = parseInt(n.css("padding-top"), 10),
                    r = parseInt(n.css("padding-bottom"), 10);
                s.top -= t(window).scrollTop() - o;
                var a = {
                    width: n.width(),
                    height: (w ? n.innerHeight() : n[0].offsetHeight) - r - o
                };
                return W() ? a["-moz-transform"] = a.transform = "translate(" + s.left + "px," + s.top + "px)" : (a.left = s.left, a.top = s.top), a
            }
        }
    });
    var $ = "iframe",
        H = "//about:blank",
        B = function(t) {
            if (e.currTemplate[$]) {
                var i = e.currTemplate[$].find("iframe");
                i.length && (t || (i[0].src = H), e.isIE8 && i.css("display", t ? "block" : "none"))
            }
        };
    t.magnificPopup.registerModule($, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                e.types.push($), _("BeforeChange", function(t, e, i) {
                    e !== i && (e === $ ? B() : i === $ && B(!0))
                }), _(a + "." + $, function() {
                    B()
                })
            },
            getIframe: function(i, n) {
                var s = i.src,
                    o = e.st.iframe;
                t.each(o.patterns, function() {
                    return s.indexOf(this.index) > -1 ? (this.id && (s = "string" == typeof this.id ? s.substr(s.lastIndexOf(this.id) + this.id.length, s.length) : this.id.call(this, s)), s = this.src.replace("%id%", s), !1) : void 0
                });
                var r = {};
                return o.srcAction && (r[o.srcAction] = s), e._parseMarkup(n, r, i), e.updateStatus("ready"), n
            }
        }
    });
    var q = function(t) {
            var i = e.items.length;
            return t > i - 1 ? t - i : 0 > t ? i + t : t
        },
        X = function(t, e, i) {
            return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
        };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = e.st.gallery,
                    s = ".mfp-gallery",
                    r = Boolean(t.fn.mfpFastClick);
                return e.direction = !0, i && i.enabled ? (o += " mfp-gallery", _(d + s, function() {
                    i.navigateByImgClick && e.wrap.on("click" + s, ".mfp-img", function() {
                        return e.items.length > 1 ? (e.next(), !1) : void 0
                    }), n.on("keydown" + s, function(t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), _("UpdateStatus" + s, function(t, i) {
                    i.text && (i.text = X(i.text, e.currItem.index, e.items.length))
                }), _(h + s, function(t, n, s, o) {
                    var r = e.items.length;
                    s.counter = r > 1 ? X(i.tCounter, o.index, r) : ""
                }), _("BuildControls" + s, function() {
                    if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                        var n = i.arrowMarkup,
                            s = e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            o = e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(y),
                            a = r ? "mfpFastClick" : "click";
                        s[a](function() {
                            e.prev()
                        }), o[a](function() {
                            e.next()
                        }), e.isIE7 && (C("b", s[0], !1, !0), C("a", s[0], !1, !0), C("b", o[0], !1, !0), C("a", o[0], !1, !0)), e.container.append(s.add(o))
                    }
                }), _(p + s, function() {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), void _(a + s, function() {
                    n.off(s), e.wrap.off("click" + s), e.arrowLeft && r && e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(), e.arrowRight = e.arrowLeft = null
                })) : !1
            },
            next: function() {
                e.direction = !0, e.index = q(e.index + 1), e.updateItemHTML()
            },
            prev: function() {
                e.direction = !1, e.index = q(e.index - 1), e.updateItemHTML()
            },
            goTo: function(t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var t, i = e.st.gallery.preload,
                    n = Math.min(i[0], e.items.length),
                    s = Math.min(i[1], e.items.length);
                for (t = 1; t <= (e.direction ? s : n); t++) e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? n : s); t++) e._preloadItem(e.index - t)
            },
            _preloadItem: function(i) {
                if (i = q(i), !e.items[i].preloaded) {
                    var n = e.items[i];
                    n.parsed || (n = e.parseEl(i)), S("LazyLoad", n), "image" === n.type && (n.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                        n.hasSize = !0
                    }).on("error.mfploader", function() {
                        n.hasSize = !0, n.loadError = !0, S("LazyLoadError", n)
                    }).attr("src", n.src)), n.preloaded = !0
                }
            }
        }
    });
    var V = "retina";
    t.magnificPopup.registerModule(V, {
        options: {
            replaceSrc: function(t) {
                return t.src.replace(/\.\w+$/, function(t) {
                    return "@2x" + t
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var t = e.st.retina,
                        i = t.ratio;
                    i = isNaN(i) ? i() : i, i > 1 && (_("ImageHasSize." + V, function(t, e) {
                        e.img.css({
                            "max-width": e.img[0].naturalWidth / i,
                            width: "100%"
                        })
                    }), _("ElementParse." + V, function(e, n) {
                        n.src = t.replaceSrc(n, i)
                    }))
                }
            }
        }
    }),
    function() {
        var e = 1e3,
            i = "ontouchstart" in window,
            n = function() {
                x.off("touchmove" + o + " touchend" + o)
            },
            s = "mfpFastClick",
            o = "." + s;
        t.fn.mfpFastClick = function(s) {
            return t(this).each(function() {
                var r, a = t(this);
                if (i) {
                    var l, c, u, h, d, p;
                    a.on("touchstart" + o, function(t) {
                        h = !1, p = 1, d = t.originalEvent ? t.originalEvent.touches[0] : t.touches[0], c = d.clientX, u = d.clientY, x.on("touchmove" + o, function(t) {
                            d = t.originalEvent ? t.originalEvent.touches : t.touches, p = d.length, d = d[0], (Math.abs(d.clientX - c) > 10 || Math.abs(d.clientY - u) > 10) && (h = !0, n())
                        }).on("touchend" + o, function(t) {
                            n(), h || p > 1 || (r = !0, t.preventDefault(), clearTimeout(l), l = setTimeout(function() {
                                r = !1
                            }, e), s())
                        })
                    })
                }
                a.on("click" + o, function() {
                    r || s()
                })
            })
        }, t.fn.destroyMfpFastClick = function() {
            t(this).off("touchstart" + o + " click" + o), i && x.off("touchmove" + o + " touchend" + o)
        }
    }(), k()
}), ! function(t) {
    t.flexslider = function(e, i) {
        var n = t(e);
        n.vars = t.extend({}, t.flexslider.defaults, i);
        var s, o = n.vars.namespace,
            r = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            a = ("ontouchstart" in window || r || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
            l = "click touchend MSPointerUp keyup",
            c = "",
            u = "vertical" === n.vars.direction,
            h = n.vars.reverse,
            d = n.vars.itemWidth > 0,
            p = "fade" === n.vars.animation,
            f = "" !== n.vars.asNavFor,
            m = {},
            g = !0;
        t.data(e, "flexslider", n), m = {
            init: function() {
                n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = t(n.vars.selector, n), n.container = t(n.containerSelector, n), n.count = n.slides.length, n.syncExists = t(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = u ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !p && n.vars.useCSS && function() {
                    var t = document.createElement("div"),
                        e = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in e)
                        if (void 0 !== t.style[e[i]]) return n.pfx = e[i].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
                    return !1
                }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = t(n.vars.controlsContainer).length > 0 && t(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = t(n.vars.manualControls).length > 0 && t(n.vars.manualControls)), n.vars.randomize && (n.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && m.controlNav.setup(), n.vars.directionNav && m.directionNav.setup(), n.vars.keyboard && (1 === t(n.containerSelector).length || n.vars.multipleKeyboard) && t(document).bind("keyup", function(t) {
                    var e = t.keyCode;
                    if (!n.animating && (39 === e || 37 === e)) {
                        var i = 39 === e ? n.getTarget("next") : 37 === e ? n.getTarget("prev") : !1;
                        n.flexAnimate(i, n.vars.pauseOnAction)
                    }
                }), n.vars.mousewheel && n.bind("mousewheel", function(t, e) {
                    t.preventDefault();
                    var i = n.getTarget(0 > e ? "next" : "prev");
                    n.flexAnimate(i, n.vars.pauseOnAction)
                }), n.vars.pausePlay && m.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && m.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function() {
                    n.manualPlay || n.manualPause || n.pause()
                }, function() {
                    n.manualPause || n.manualPlay || n.stopped || n.play()
                }), n.vars.pauseInvisible && m.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), f && m.asNav.setup(), a && n.vars.touch && m.touch(), (!p || p && n.vars.smoothHeight) && t(window).bind("resize orientationchange focus", m.resize), n.find("img").attr("draggable", "false"), setTimeout(function() {
                    n.vars.start(n)
                }, 200)
            },
            asNav: {
                setup: function() {
                    n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(o + "active-slide").eq(n.currentItem).addClass(o + "active-slide"), r ? (e._slider = n, n.slides.each(function() {
                        var e = this;
                        e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(t) {
                            t.preventDefault(), t.currentTarget._gesture && t.currentTarget._gesture.addPointer(t.pointerId)
                        }, !1), e.addEventListener("MSGestureTap", function(e) {
                            e.preventDefault();
                            var i = t(this),
                                s = i.index();
                            t(n.vars.asNavFor).data("flexslider").animating || i.hasClass("active") || (n.direction = n.currentItem < s ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : n.slides.on(l, function(e) {
                        e.preventDefault();
                        var i = t(this),
                            s = i.index(),
                            r = i.offset().left - t(n).scrollLeft();
                        0 >= r && i.hasClass(o + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : t(n.vars.asNavFor).data("flexslider").animating || i.hasClass(o + "active-slide") || (n.direction = n.currentItem < s ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    n.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var e, i, s = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
                        r = 1;
                    if (n.controlNavScaffold = t('<ol class="' + o + "control-nav " + o + s + '"></ol>'), n.pagingCount > 1)
                        for (var a = 0; a < n.pagingCount; a++) {
                            if (i = n.slides.eq(a), e = "thumbnails" === n.vars.controlNav ? '<img src="' + i.attr("data-thumb") + '"/>' : "<a>" + r + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
                                var u = i.attr("data-thumbcaption");
                                "" != u && void 0 != u && (e += '<span class="' + o + 'caption">' + u + "</span>")
                            }
                            n.controlNavScaffold.append('<li data-animate="zoomIn" data-delay="' + 200 * a + '">' + e + "</li>"), r++
                        }
                    n.controlsContainer ? t(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), n.controlNavScaffold.delegate("a, img", l, function(e) {
                        if (e.preventDefault(), "" === c || c === e.type) {
                            var i = t(this),
                                s = n.controlNav.index(i);
                            i.hasClass(o + "active") || (n.direction = s > n.currentSlide ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction))
                        }
                        "" === c && (c = e.type), m.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    n.controlNav = n.manualControls, m.controlNav.active(), n.controlNav.bind(l, function(e) {
                        if (e.preventDefault(), "" === c || c === e.type) {
                            var i = t(this),
                                s = n.controlNav.index(i);
                            i.hasClass(o + "active") || (n.direction = s > n.currentSlide ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction))
                        }
                        "" === c && (c = e.type), m.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
                    n.controlNav = t("." + o + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n)
                },
                active: function() {
                    n.controlNav.removeClass(o + "active").eq(n.animatingTo).addClass(o + "active")
                },
                update: function(e, i) {
                    n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append(t("<li><a>" + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(i).closest("li").remove(), m.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(i, e) : m.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var e = t('<ul class="' + o + 'direction-nav"><li><a class="' + o + 'prev" href="#">' + n.vars.prevText + '</a></li><li><a class="' + o + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
                    n.controlsContainer ? (t(n.controlsContainer).append(e), n.directionNav = t("." + o + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = t("." + o + "direction-nav li a", n)), m.directionNav.update(), n.directionNav.bind(l, function(e) {
                        e.preventDefault();
                        var i;
                        ("" === c || c === e.type) && (i = n.getTarget(t(this).hasClass(o + "next") ? "next" : "prev"), n.flexAnimate(i, n.vars.pauseOnAction)), "" === c && (c = e.type), m.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var t = o + "disabled";
                    1 === n.pagingCount ? n.directionNav.addClass(t).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(t).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(t).filter("." + o + "prev").addClass(t).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(t).filter("." + o + "next").addClass(t).attr("tabindex", "-1") : n.directionNav.removeClass(t).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var e = t('<div class="' + o + 'pauseplay"><a></a></div>');
                    n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = t("." + o + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = t("." + o + "pauseplay a", n)), m.pausePlay.update(n.vars.slideshow ? o + "pause" : o + "play"), n.pausePlay.bind(l, function(e) {
                        e.preventDefault(), ("" === c || c === e.type) && (t(this).hasClass(o + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === c && (c = e.type), m.setToClearWatchedEvent()
                    })
                },
                update: function(t) {
                    "play" === t ? n.pausePlay.removeClass(o + "pause").addClass(o + "play").html(n.vars.playText) : n.pausePlay.removeClass(o + "play").addClass(o + "pause").html(n.vars.pauseText)
                }
            },
            touch: function() {
                function t(t) {
                    n.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (n.pause(), g = u ? n.h : n.w, y = Number(new Date), w = t.touches[0].pageX, x = t.touches[0].pageY, m = d && h && n.animatingTo === n.last ? 0 : d && h ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : d && n.currentSlide === n.last ? n.limit : d ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : h ? (n.last - n.currentSlide + n.cloneOffset) * g : (n.currentSlide + n.cloneOffset) * g, c = u ? x : w, f = u ? w : x, e.addEventListener("touchmove", i, !1), e.addEventListener("touchend", s, !1))
                }

                function i(t) {
                    w = t.touches[0].pageX, x = t.touches[0].pageY, v = u ? c - x : c - w, b = u ? Math.abs(v) < Math.abs(w - f) : Math.abs(v) < Math.abs(x - f);
                    var e = 500;
                    (!b || Number(new Date) - y > e) && (t.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (v /= 0 === n.currentSlide && 0 > v || n.currentSlide === n.last && v > 0 ? Math.abs(v) / g + 2 : 1), n.setProps(m + v, "setTouch")))
                }

                function s() {
                    if (e.removeEventListener("touchmove", i, !1), n.animatingTo === n.currentSlide && !b && null !== v) {
                        var t = h ? -v : v,
                            o = n.getTarget(t > 0 ? "next" : "prev");
                        n.canAdvance(o) && (Number(new Date) - y < 550 && Math.abs(t) > 50 || Math.abs(t) > g / 2) ? n.flexAnimate(o, n.vars.pauseOnAction) : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
                    }
                    e.removeEventListener("touchend", s, !1), c = null, f = null, v = null, m = null
                }

                function o(t) {
                    t.stopPropagation(), n.animating ? t.preventDefault() : (n.pause(), e._gesture.addPointer(t.pointerId), _ = 0, g = u ? n.h : n.w, y = Number(new Date), m = d && h && n.animatingTo === n.last ? 0 : d && h ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : d && n.currentSlide === n.last ? n.limit : d ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : h ? (n.last - n.currentSlide + n.cloneOffset) * g : (n.currentSlide + n.cloneOffset) * g)
                }

                function a(t) {
                    t.stopPropagation();
                    var i = t.target._slider;
                    if (i) {
                        var n = -t.translationX,
                            s = -t.translationY;
                        return _ += u ? s : n, v = _, b = u ? Math.abs(_) < Math.abs(-n) : Math.abs(_) < Math.abs(-s), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() {
                            e._gesture.stop()
                        }) : void((!b || Number(new Date) - y > 500) && (t.preventDefault(), !p && i.transitions && (i.vars.animationLoop || (v = _ / (0 === i.currentSlide && 0 > _ || i.currentSlide === i.last && _ > 0 ? Math.abs(_) / g + 2 : 1)), i.setProps(m + v, "setTouch"))))
                    }
                }

                function l(t) {
                    t.stopPropagation();
                    var e = t.target._slider;
                    if (e) {
                        if (e.animatingTo === e.currentSlide && !b && null !== v) {
                            var i = h ? -v : v,
                                n = e.getTarget(i > 0 ? "next" : "prev");
                            e.canAdvance(n) && (Number(new Date) - y < 550 && Math.abs(i) > 50 || Math.abs(i) > g / 2) ? e.flexAnimate(n, e.vars.pauseOnAction) : p || e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
                        }
                        c = null, f = null, v = null, m = null, _ = 0
                    }
                }
                var c, f, m, g, v, y, b = !1,
                    w = 0,
                    x = 0,
                    _ = 0;
                r ? (e.style.msTouchAction = "none", e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", o, !1), e._slider = n, e.addEventListener("MSGestureChange", a, !1), e.addEventListener("MSGestureEnd", l, !1)) : e.addEventListener("touchstart", t, !1)
            },
            resize: function() {
                !n.animating && n.is(":visible") && (d || n.doMath(), p ? m.smoothHeight() : d ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : u ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && m.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")))
            },
            smoothHeight: function(t) {
                if (!u || p) {
                    var e = p ? n : n.viewport;
                    t ? e.animate({
                        height: n.slides.eq(n.animatingTo).height()
                    }, t) : e.height(n.slides.eq(n.animatingTo).height())
                }
            },
            sync: function(e) {
                var i = t(n.vars.sync).data("flexslider"),
                    s = n.animatingTo;
                switch (e) {
                    case "animate":
                        i.flexAnimate(s, n.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        i.playing || i.asNav || i.play();
                        break;
                    case "pause":
                        i.pause()
                }
            },
            uniqueID: function(e) {
                return e.filter("[id]").add(e.find("[id]")).each(function() {
                    var e = t(this);
                    e.attr("id", e.attr("id") + "_clone")
                }), e
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var t = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var e = 0; e < t.length; e++) t[e] + "Hidden" in document && (m.pauseInvisible.visProp = t[e] + "Hidden");
                    if (m.pauseInvisible.visProp) {
                        var i = m.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(i, function() {
                            m.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play()
                        })
                    }
                },
                isHidden: function() {
                    return document[m.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(s), s = setTimeout(function() {
                    c = ""
                }, 3e3)
            }
        }, n.flexAnimate = function(e, i, s, r, l) {
            if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), f && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, l) || s) && n.is(":visible")) {
                if (f && r) {
                    var c = t(n.vars.asNavFor).data("flexslider");
                    if (n.atEnd = 0 === e || e === n.count - 1, c.flexAnimate(e, !0, !1, !0, l), n.direction = n.currentItem < e ? "next" : "prev", c.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e) return n.currentItem = e, n.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), !1;
                    n.currentItem = e, n.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), e = Math.floor(e / n.visible)
                }
                if (n.animating = !0, n.animatingTo = e, i && n.pause(), n.vars.before(n), n.syncExists && !l && m.sync("animate"), n.vars.controlNav && m.controlNav.active(), d || n.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && m.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), p) a ? (n.slides.eq(n.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), n.slides.eq(e).css({
                    opacity: 1,
                    zIndex: 2
                }), n.wrapup(b)) : (n.slides.eq(n.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, n.vars.animationSpeed, n.vars.easing, n.wrapup));
                else {
                    var g, v, y, b = u ? n.slides.filter(":first").height() : n.computedW;
                    d ? (g = n.vars.itemMargin, y = (n.itemW + g) * n.move * n.animatingTo, v = y > n.limit && 1 !== n.visible ? n.limit : y) : v = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? h ? (n.count + n.cloneOffset) * b : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? h ? 0 : (n.count + 1) * b : h ? (n.count - 1 - e + n.cloneOffset) * b : (e + n.cloneOffset) * b, n.setProps(v, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(n.ensureAnimationEnd), n.wrapup(b)
                    }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function() {
                        n.wrapup(b)
                    }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function() {
                        n.wrapup(b)
                    })
                }
                n.vars.smoothHeight && m.smoothHeight(n.vars.animationSpeed)
            }
        }, n.wrapup = function(t) {
            p || d || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(t, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(t, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n)
        }, n.animateSlides = function() {
            !n.animating && g && n.flexAnimate(n.getTarget("next"))
        }, n.pause = function() {
            clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && m.pausePlay.update("play"), n.syncExists && m.sync("pause")
        }, n.play = function() {
            n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && m.pausePlay.update("pause"), n.syncExists && m.sync("play")
        }, n.stop = function() {
            n.pause(), n.stopped = !0
        }, n.canAdvance = function(t, e) {
            var i = f ? n.pagingCount - 1 : n.last;
            return e ? !0 : f && n.currentItem === n.count - 1 && 0 === t && "prev" === n.direction ? !0 : f && 0 === n.currentItem && t === n.pagingCount - 1 && "next" !== n.direction ? !1 : t !== n.currentSlide || f ? n.vars.animationLoop ? !0 : n.atEnd && 0 === n.currentSlide && t === i && "next" !== n.direction ? !1 : n.atEnd && n.currentSlide === i && 0 === t && "next" === n.direction ? !1 : !0 : !1
        }, n.getTarget = function(t) {
            return n.direction = t, "next" === t ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1
        }, n.setProps = function(t, e, i) {
            var s = function() {
                var i = t ? t : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
                    s = function() {
                        if (d) return "setTouch" === e ? t : h && n.animatingTo === n.last ? 0 : h ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : i;
                        switch (e) {
                            case "setTotal":
                                return h ? (n.count - 1 - n.currentSlide + n.cloneOffset) * t : (n.currentSlide + n.cloneOffset) * t;
                            case "setTouch":
                                return h ? t : t;
                            case "jumpEnd":
                                return h ? t : n.count * t;
                            case "jumpStart":
                                return h ? n.count * t : t;
                            default:
                                return t
                        }
                    }();
                return -1 * s + "px"
            }();
            n.transitions && (s = u ? "translate3d(0," + s + ",0)" : "translate3d(" + s + ",0,0)", i = void 0 !== i ? i / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", i), n.container.css("transition-duration", i)), n.args[n.prop] = s, (n.transitions || void 0 === i) && n.container.css(n.args), n.container.css("transform", s)
        }, n.setup = function(e) {
            if (p) n.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === e && (a ? n.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(n.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && m.smoothHeight();
            else {
                var i, s;
                "init" === e && (n.viewport = t('<div class="' + o + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, h && (s = t.makeArray(n.slides).reverse(), n.slides = t(s), n.container.empty().append(n.slides))), n.vars.animationLoop && !d && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(m.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = t(n.vars.selector, n), i = h ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, u && !d ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    n.newSlides.css({
                        display: "block"
                    }), n.doMath(), n.viewport.height(n.h), n.setProps(i * n.h, "init")
                }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(i * n.computedW, "init"), setTimeout(function() {
                    n.doMath(), n.newSlides.css({
                        width: n.computedW,
                        "float": "left",
                        display: "block"
                    }), n.vars.smoothHeight && m.smoothHeight()
                }, "init" === e ? 100 : 0))
            }
            d || n.slides.removeClass(o + "active-slide").eq(n.currentSlide).addClass(o + "active-slide"), n.vars.init(n)
        }, n.doMath = function() {
            var t = n.slides.first(),
                e = n.vars.itemMargin,
                i = n.vars.minItems,
                s = n.vars.maxItems;
            n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = t.height(), n.boxPadding = t.outerWidth() - t.width(), d ? (n.itemT = n.vars.itemWidth + e, n.minW = i ? i * n.itemT : n.w, n.maxW = s ? s * n.itemT - e : n.w, n.itemW = n.minW > n.w ? (n.w - e * (i - 1)) / i : n.maxW < n.w ? (n.w - e * (s - 1)) / s : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + e * (n.count - 1) : (n.itemW + e) * n.count - n.w - e) : (n.itemW = n.w, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding
        }, n.update = function(t, e) {
            n.doMath(), d || (t < n.currentSlide ? n.currentSlide += 1 : t <= n.currentSlide && 0 !== t && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === e && !d || n.pagingCount > n.controlNav.length ? m.controlNav.update("add") : ("remove" === e && !d || n.pagingCount < n.controlNav.length) && (d && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), m.controlNav.update("remove", n.last))), n.vars.directionNav && m.directionNav.update()
        }, n.addSlide = function(e, i) {
            var s = t(e);
            n.count += 1, n.last = n.count - 1, u && h ? void 0 !== i ? n.slides.eq(n.count - i).after(s) : n.container.prepend(s) : void 0 !== i ? n.slides.eq(i).before(s) : n.container.append(s), n.update(i, "add"), n.slides = t(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n)
        }, n.removeSlide = function(e) {
            var i = isNaN(e) ? n.slides.index(t(e)) : e;
            n.count -= 1, n.last = n.count - 1, isNaN(e) ? t(e, n.slides).remove() : u && h ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(i, "remove"), n.slides = t(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n)
        }, m.init()
    }, t(window).blur(function() {
        focused = !1
    }).focus(function() {
        focused = !0
    }), t.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, t.fn.flexslider = function(e) {
        if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function() {
            var i = t(this),
                n = e.selector ? e.selector : ".slides > li",
                s = i.find(n);
            1 === s.length && e.allowOneSlide === !0 || 0 === s.length ? (s.fadeIn(400), e.start && e.start(i)) : void 0 === i.data("flexslider") && new t.flexslider(this, e)
        });
        var i = t(this).data("flexslider");
        switch (e) {
            case "play":
                i.play();
                break;
            case "pause":
                i.pause();
                break;
            case "stop":
                i.stop();
                break;
            case "next":
                i.flexAnimate(i.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                i.flexAnimate(i.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof e && i.flexAnimate(e, !0)
        }
    }
}(jQuery), function(t) {
    t.fn.pajinate = function(e) {
        function i(i) {
            new_page = parseInt(c.data(m)) - 1, 1 == t(i).siblings(".active").prev(".page_link").length ? (r(i, new_page), s(new_page)) : e.wrap_around && s(f - 1)
        }

        function n(i) {
            new_page = parseInt(c.data(m)) + 1, 1 == t(i).siblings(".active").next(".page_link").length ? (o(i, new_page), s(new_page)) : e.wrap_around && s(0)
        }

        function s(t) {
            t = parseInt(t, 10);
            var i = parseInt(c.data(g));
            start_from = t * i, end_on = start_from + i;
            var n = d.hide().slice(start_from, end_on);
            n.fadeIn(700), h.find(e.nav_panel_id).children(".page_link[longdesc=" + t + "]").addClass("active " + b).siblings(".active").removeClass("active " + b), c.data(m, t);
            var s = parseInt(c.data(m) + 1),
                o = u.children().size(),
                r = Math.ceil(o / e.items_per_page);
            h.find(e.nav_info_id).html(e.nav_label_info.replace("{0}", start_from + 1).replace("{1}", start_from + n.length).replace("{2}", d.length).replace("{3}", s).replace("{4}", r)), a(), l(), "undefined" != typeof e.onPageDisplayed && e.onPageDisplayed.call(this, t + 1)
        }

        function o(i, n) {
            var s = n,
                o = t(i).siblings(".active");
            "none" == o.siblings(".page_link[longdesc=" + s + "]").css("display") && p.each(function() {
                t(this).children(".page_link").hide().slice(parseInt(s - e.num_page_links_to_display + 1), s + 1).show()
            })
        }

        function r(i, n) {
            var s = n,
                o = t(i).siblings(".active");
            "none" == o.siblings(".page_link[longdesc=" + s + "]").css("display") && p.each(function() {
                t(this).children(".page_link").hide().slice(s, s + parseInt(e.num_page_links_to_display)).show()
            })
        }

        function a() {}

        function l() {
            p.children(".last").hasClass("active") ? p.children(".next_link").add(".last_link").addClass("no_more " + w) : p.children(".next_link").add(".last_link").removeClass("no_more " + w), p.children(".first").hasClass("active") ? p.children(".previous_link").add(".first_link").addClass("no_more " + w) : p.children(".previous_link").add(".first_link").removeClass("no_more " + w)
        }
        var c, u, h, d, p, f, m = "current_page",
            g = "items_per_page",
            v = {
                item_container_id: ".content",
                items_per_page: 10,
                nav_panel_id: ".page_navigation",
                nav_info_id: ".info_text",
                num_page_links_to_display: 20,
                start_page: 0,
                wrap_around: !1,
                nav_label_first: "First",
                nav_label_prev: "Prev",
                nav_label_next: "Next",
                nav_label_last: "Last",
                nav_order: ["first", "prev", "num", "next", "last"],
                nav_label_info: "Showing {0}-{1} of {2} results",
                show_first_last: !0,
                abort_on_small_lists: !1,
                jquery_ui: !1,
                jquery_ui_active: "ui-state-highlight",
                jquery_ui_default: "ui-state-default",
                jquery_ui_disabled: "ui-state-disabled"
            },
            e = t.extend(v, e),
            y = e.jquery_ui ? e.jquery_ui_default : "",
            b = e.jquery_ui ? e.jquery_ui_active : "",
            w = e.jquery_ui ? e.jquery_ui_disabled : "";
        return this.each(function() {
            if (h = t(this), u = t(this).find(e.item_container_id), d = h.find(e.item_container_id).children(), e.abort_on_small_lists && e.items_per_page >= d.size()) return h;
            c = h, c.data(m, 0), c.data(g, e.items_per_page);
            for (var v = u.children().size(), w = Math.ceil(v / e.items_per_page), x = '<li class="disabled ellipse more"><span>...</span></li>', _ = '<li class="disabled ellipse less"><span>...</span></li>', C = e.show_first_last ? '<li class="first_link ' + y + '"><a href="#">' + e.nav_label_first + "</a></li>" : "", S = e.show_first_last ? '<li class="last_link ' + y + '"><a href="#">' + e.nav_label_last + "</a></li>" : "", T = "", k = 0; k < e.nav_order.length; k++) switch (e.nav_order[k]) {
                case "first":
                    T += C;
                    break;
                case "last":
                    T += S;
                    break;
                case "next":
                    T += '<li class="next_link ' + y + '"><a href="#">' + e.nav_label_next + "</a></li>";
                    break;
                case "prev":
                    T += '<li class="previous_link ' + y + '"><a href="#">' + e.nav_label_prev + "</a></li>";
                    break;
                case "num":
                    T += _;
                    for (var E = 0; w > E;) T += '<li class="page_link ' + y + '" longdesc="' + E + '"><a href="#">' + (E + 1) + "</a></li>", E++;
                    T += x
            }
            p = h.find(e.nav_panel_id), p.html(T).each(function() {
                t(this).find(".page_link:first").addClass("first"), t(this).find(".page_link:last").addClass("last")
            }), p.children(".ellipse").hide(), p.find(".previous_link").next().next().addClass("active " + b), d.hide(), d.slice(0, c.data(g)).show(), f = h.find(e.nav_panel_id + ":first").children(".page_link").size(), e.num_page_links_to_display = Math.min(e.num_page_links_to_display, f), p.children(".page_link").hide(), p.each(function() {
                t(this).children(".page_link").slice(0, e.num_page_links_to_display).show()
            }), h.find(".first_link").click(function(e) {
                e.preventDefault(), r(t(this), 0), s(0)
            }), h.find(".last_link").click(function(e) {
                e.preventDefault();
                var i = f - 1;
                o(t(this), i), s(i)
            }), h.find(".previous_link").click(function(e) {
                e.preventDefault(), i(t(this))
            }), h.find(".next_link").click(function(e) {
                e.preventDefault(), n(t(this))
            }), h.find(".page_link").click(function(e) {
                e.preventDefault(), s(t(this).attr("longdesc"))
            }), s(parseInt(e.start_page)), a(), e.wrap_around || l()
        })
    }
}(jQuery), function(t, e, i) {
    "use strict";
    e.infinitescroll = function(t, i, n) {
        this.element = e(n), this._create(t, i) || (this.failed = !0)
    }, e.infinitescroll.defaults = {
        loading: {
            finished: i,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
            img: "",
            msg: null,
            msgText: "<em>Loading the next set of posts...</em>",
            selector: null,
            speed: "fast",
            start: i
        },
        state: {
            isDuringAjax: !1,
            isInvalidPage: !1,
            isDestroyed: !1,
            isDone: !1,
            isPaused: !1,
            isBeyondMaxPage: !1,
            currPage: 1
        },
        debug: !1,
        behavior: i,
        binder: e(t),
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null,
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: !1,
        pathParse: i,
        dataType: "html",
        appendCallback: !0,
        bufferPx: 40,
        errorCallback: function() {},
        infid: 0,
        pixelsFromNavToBottom: i,
        path: i,
        prefill: !1,
        maxPage: i
    }, e.infinitescroll.prototype = {
        _binding: function(t) {
            var e = this,
                n = e.options;
            return n.v = "2.0b2.120520", n.behavior && this["_binding_" + n.behavior] !== i ? void this["_binding_" + n.behavior].call(this) : "bind" !== t && "unbind" !== t ? (this._debug("Binding value  " + t + " not valid"), !1) : ("unbind" === t ? this.options.binder.unbind("smartscroll.infscr." + e.options.infid) : this.options.binder[t]("smartscroll.infscr." + e.options.infid, function() {
                e.scroll()
            }), void this._debug("Binding", t))
        },
        _create: function(n, s) {
            var o = e.extend(!0, {}, e.infinitescroll.defaults, n);
            this.options = o;
            var r = e(t),
                a = this;
            if (!a._validate(n)) return !1;
            var l = e(o.nextSelector).attr("href");
            if (!l) return this._debug("Navigation selector not found"), !1;
            o.path = o.path || this._determinepath(l), o.contentSelector = o.contentSelector || this.element, o.loading.selector = o.loading.selector || o.contentSelector, o.loading.msg = o.loading.msg || e('<div id="infscr-loading"><img alt="Loading..." src="' + o.loading.img + '" /><div>' + o.loading.msgText + "</div></div>"), (new Image).src = o.loading.img, o.pixelsFromNavToBottom === i && (o.pixelsFromNavToBottom = e(document).height() - e(o.navSelector).offset().top, this._debug("pixelsFromNavToBottom: " + o.pixelsFromNavToBottom));
            var c = this;
            return o.loading.start = o.loading.start || function() {
                e(o.navSelector).hide(), o.loading.msg.appendTo(o.loading.selector).show(o.loading.speed, e.proxy(function() {
                    this.beginAjax(o)
                }, c))
            }, o.loading.finished = o.loading.finished || function() {
                o.state.isBeyondMaxPage || o.loading.msg.fadeOut(o.loading.speed)
            }, o.callback = function(t, n, a) {
                o.behavior && t["_callback_" + o.behavior] !== i && t["_callback_" + o.behavior].call(e(o.contentSelector)[0], n, a), s && s.call(e(o.contentSelector)[0], n, o, a), o.prefill && r.bind("resize.infinite-scroll", t._prefill)
            }, n.debug && (!Function.prototype.bind || "object" != typeof console && "function" != typeof console || "object" != typeof console.log || ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function(t) {
                console[t] = this.call(console[t], console)
            }, Function.prototype.bind)), this._setup(), o.prefill && this._prefill(), !0
        },
        _prefill: function() {
            function i() {
                return n.options.contentSelector.height() <= s.height()
            }
            var n = this,
                s = e(t);
            this._prefill = function() {
                i() && n.scroll(), s.bind("resize.infinite-scroll", function() {
                    i() && (s.unbind("resize.infinite-scroll"), n.scroll())
                })
            }, this._prefill()
        },
        _debug: function() {
            !0 === this.options.debug && ("undefined" != typeof console && "function" == typeof console.log ? console.log(1 === Array.prototype.slice.call(arguments).length && "string" == typeof Array.prototype.slice.call(arguments)[0] ? Array.prototype.slice.call(arguments).toString() : Array.prototype.slice.call(arguments)) : Function.prototype.bind || "undefined" == typeof console || "object" != typeof console.log || Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments)))
        },
        _determinepath: function(t) {
            var e = this.options;
            if (e.behavior && this["_determinepath_" + e.behavior] !== i) return this["_determinepath_" + e.behavior].call(this, t);
            if (e.pathParse) return this._debug("pathParse manual"), e.pathParse(t, this.options.state.currPage + 1);
            if (t.match(/^(.*?)\b2\b(.*?$)/)) t = t.match(/^(.*?)\b2\b(.*?$)/).slice(1);
            else if (t.match(/^(.*?)2(.*?$)/)) {
                if (t.match(/^(.*?page=)2(\/.*|$)/)) return t = t.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                t = t.match(/^(.*?)2(.*?$)/).slice(1)
            } else {
                if (t.match(/^(.*?page=)1(\/.*|$)/)) return t = t.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."), e.state.isInvalidPage = !0
            }
            return this._debug("determinePath", t), t
        },
        _error: function(t) {
            var e = this.options;
            return e.behavior && this["_error_" + e.behavior] !== i ? void this["_error_" + e.behavior].call(this, t) : ("destroy" !== t && "end" !== t && (t = "unknown"), this._debug("Error", t), ("end" === t || e.state.isBeyondMaxPage) && this._showdonemsg(), e.state.isDone = !0, e.state.currPage = 1, e.state.isPaused = !1, e.state.isBeyondMaxPage = !1, void this._binding("unbind"))
        },
        _loadcallback: function(n, s, o) {
            var r, a = this.options,
                l = this.options.callback,
                c = a.state.isDone ? "done" : a.appendCallback ? "append" : "no-append";
            if (a.behavior && this["_loadcallback_" + a.behavior] !== i) return void this["_loadcallback_" + a.behavior].call(this, n, s);
            switch (c) {
                case "done":
                    return this._showdonemsg(), !1;
                case "no-append":
                    "html" === a.dataType && (s = "<div>" + s + "</div>", s = e(s).find(a.itemSelector));
                    break;
                case "append":
                    var u = n.children();
                    if (0 === u.length) return this._error("end");
                    for (r = document.createDocumentFragment(); n[0].firstChild;) r.appendChild(n[0].firstChild);
                    this._debug("contentSelector", e(a.contentSelector)[0]), e(a.contentSelector)[0].appendChild(r), s = u.get()
            }
            if (a.loading.finished.call(e(a.contentSelector)[0], a), a.animate) {
                var h = e(t).scrollTop() + e(a.loading.msg).height() + a.extraScrollPx + "px";
                e("html,body").animate({
                    scrollTop: h
                }, 800, function() {
                    a.state.isDuringAjax = !1
                })
            }
            a.animate || (a.state.isDuringAjax = !1), l(this, s, o), a.prefill && this._prefill()
        },
        _nearbottom: function() {
            var n = this.options,
                s = 0 + e(document).height() - n.binder.scrollTop() - e(t).height();
            return n.behavior && this["_nearbottom_" + n.behavior] !== i ? this["_nearbottom_" + n.behavior].call(this) : (this._debug("math:", s, n.pixelsFromNavToBottom), s - n.bufferPx < n.pixelsFromNavToBottom)
        },
        _pausing: function(t) {
            var e = this.options;
            if (e.behavior && this["_pausing_" + e.behavior] !== i) return void this["_pausing_" + e.behavior].call(this, t);
            switch ("pause" !== t && "resume" !== t && null !== t && this._debug("Invalid argument. Toggling pause value instead"), t = !t || "pause" !== t && "resume" !== t ? "toggle" : t) {
                case "pause":
                    e.state.isPaused = !0;
                    break;
                case "resume":
                    e.state.isPaused = !1;
                    break;
                case "toggle":
                    e.state.isPaused = !e.state.isPaused
            }
            return this._debug("Paused", e.state.isPaused), !1
        },
        _setup: function() {
            var t = this.options;
            return t.behavior && this["_setup_" + t.behavior] !== i ? void this["_setup_" + t.behavior].call(this) : (this._binding("bind"), !1)
        },
        _showdonemsg: function() {
            var t = this.options;
            return t.behavior && this["_showdonemsg_" + t.behavior] !== i ? void this["_showdonemsg_" + t.behavior].call(this) : (t.loading.msg.find("img").hide().parent().find("div").html(t.loading.finishedMsg).animate({
                opacity: 1
            }, 2e3, function() {
                e(this).parent().fadeOut(t.loading.speed)
            }), void t.errorCallback.call(e(t.contentSelector)[0], "done"))
        },
        _validate: function(t) {
            for (var i in t)
                if (i.indexOf && i.indexOf("Selector") > -1 && 0 === e(t[i]).length) return this._debug("Your " + i + " found no elements."), !1;
            return !0
        },
        bind: function() {
            this._binding("bind")
        },
        destroy: function() {
            return this.options.state.isDestroyed = !0, this.options.loading.finished(), this._error("destroy")
        },
        pause: function() {
            this._pausing("pause")
        },
        resume: function() {
            this._pausing("resume")
        },
        beginAjax: function(t) {
            var n, s, o, r, a = this,
                l = t.path;
            if (t.state.currPage++, t.maxPage != i && t.state.currPage > t.maxPage) return t.state.isBeyondMaxPage = !0, void this.destroy();
            switch (n = e(e(t.contentSelector).is("table, tbody") ? "<tbody/>" : "<div/>"), s = "function" == typeof l ? l(t.state.currPage) : l.join(t.state.currPage), a._debug("heading into ajax", s), o = "html" === t.dataType || "json" === t.dataType ? t.dataType : "html+callback", t.appendCallback && "html" === t.dataType && (o += "+callback"), o) {
                case "html+callback":
                    a._debug("Using HTML via .load() method"), n.load(s + " " + t.itemSelector, i, function(t) {
                        a._loadcallback(n, t, s)
                    });
                    break;
                case "html":
                    a._debug("Using " + o.toUpperCase() + " via $.ajax() method"), e.ajax({
                        url: s,
                        dataType: t.dataType,
                        complete: function(t, e) {
                            r = "undefined" != typeof t.isResolved ? t.isResolved() : "success" === e || "notmodified" === e, r ? a._loadcallback(n, t.responseText, s) : a._error("end")
                        }
                    });
                    break;
                case "json":
                    a._debug("Using " + o.toUpperCase() + " via $.ajax() method"), e.ajax({
                        dataType: "json",
                        type: "GET",
                        url: s,
                        success: function(e, o, l) {
                            if (r = "undefined" != typeof l.isResolved ? l.isResolved() : "success" === o || "notmodified" === o, t.appendCallback)
                                if (t.template !== i) {
                                    var c = t.template(e);
                                    n.append(c), r ? a._loadcallback(n, c) : a._error("end")
                                } else a._debug("template must be defined."), a._error("end");
                            else r ? a._loadcallback(n, e, s) : a._error("end")
                        },
                        error: function() {
                            a._debug("JSON ajax request failed."), a._error("end")
                        }
                    })
            }
        },
        retrieve: function(t) {
            t = t || null;
            var n = this,
                s = n.options;
            return s.behavior && this["retrieve_" + s.behavior] !== i ? void this["retrieve_" + s.behavior].call(this, t) : s.state.isDestroyed ? (this._debug("Instance is destroyed"), !1) : (s.state.isDuringAjax = !0, void s.loading.start.call(e(s.contentSelector)[0], s))
        },
        scroll: function() {
            var t = this.options,
                e = t.state;
            return t.behavior && this["scroll_" + t.behavior] !== i ? void this["scroll_" + t.behavior].call(this) : void(e.isDuringAjax || e.isInvalidPage || e.isDone || e.isDestroyed || e.isPaused || this._nearbottom() && this.retrieve())
        },
        toggle: function() {
            this._pausing()
        },
        unbind: function() {
            this._binding("unbind")
        },
        update: function(t) {
            e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
        }
    }, e.fn.infinitescroll = function(t, i) {
        var n = typeof t;
        switch (n) {
            case "string":
                var s = Array.prototype.slice.call(arguments, 1);
                this.each(function() {
                    var i = e.data(this, "infinitescroll");
                    return i && e.isFunction(i[t]) && "_" !== t.charAt(0) ? void i[t].apply(i, s) : !1
                });
                break;
            case "object":
                this.each(function() {
                    var n = e.data(this, "infinitescroll");
                    n ? n.update(t) : (n = new e.infinitescroll(t, i, this), n.failed || e.data(this, "infinitescroll", n))
                })
        }
        return this
    };
    var n, s = e.event;
    s.special.smartscroll = {
        setup: function() {
            e(this).bind("scroll", s.special.smartscroll.handler)
        },
        teardown: function() {
            e(this).unbind("scroll", s.special.smartscroll.handler)
        },
        handler: function(t, i) {
            var s = this,
                o = arguments;
            t.type = "smartscroll", n && clearTimeout(n), n = setTimeout(function() {
                e(s).trigger("smartscroll", o)
            }, "execAsap" === i ? 0 : 100)
        }
    }, e.fn.smartscroll = function(t) {
        return t ? this.bind("smartscroll", t) : this.trigger("smartscroll", ["execAsap"])
    }
}(window, jQuery), function(t, e) {
    function i(e, i) {
        var s, o, r, a = e.nodeName.toLowerCase();
        return "area" === a ? (s = e.parentNode, o = s.name, e.href && o && "map" === s.nodeName.toLowerCase() ? (r = t("img[usemap=#" + o + "]")[0], !!r && n(r)) : !1) : (/input|select|textarea|button|object/.test(a) ? !e.disabled : "a" === a ? e.href || i : i) && n(e)
    }

    function n(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
            return "hidden" === t.css(this, "visibility")
        }).length
    }
    var s = 0,
        o = /^ui-id-\d+$/;
    t.ui = t.ui || {}, t.extend(t.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), t.fn.extend({
        focus: function(e) {
            return function(i, n) {
                return "number" == typeof i ? this.each(function() {
                    var e = this;
                    setTimeout(function() {
                        t(e).focus(), n && n.call(e)
                    }, i)
                }) : e.apply(this, arguments)
            }
        }(t.fn.focus),
        scrollParent: function() {
            var e;
            return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
        },
        zIndex: function(i) {
            if (i !== e) return this.css("zIndex", i);
            if (this.length)
                for (var n, s, o = t(this[0]); o.length && o[0] !== document;) {
                    if (n = o.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(o.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    o = o.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++s)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                o.test(this.id) && t(this).removeAttr("id")
            })
        }
    }), t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
            return function(i) {
                return !!t.data(i, e)
            }
        }) : function(e, i, n) {
            return !!t.data(e, n[3])
        },
        focusable: function(e) {
            return i(e, !isNaN(t.attr(e, "tabindex")))
        },
        tabbable: function(e) {
            var n = t.attr(e, "tabindex"),
                s = isNaN(n);
            return (s || n >= 0) && i(e, !s)
        }
    }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(i, n) {
        function s(e, i, n, s) {
            return t.each(o, function() {
                i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), s && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
            }), i
        }
        var o = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
            r = n.toLowerCase(),
            a = {
                innerWidth: t.fn.innerWidth,
                innerHeight: t.fn.innerHeight,
                outerWidth: t.fn.outerWidth,
                outerHeight: t.fn.outerHeight
            };
        t.fn["inner" + n] = function(i) {
            return i === e ? a["inner" + n].call(this) : this.each(function() {
                t(this).css(r, s(this, i) + "px")
            })
        }, t.fn["outer" + n] = function(e, i) {
            return "number" != typeof e ? a["outer" + n].call(this, e) : this.each(function() {
                t(this).css(r, s(this, e, !0, i) + "px")
            })
        }
    }), t.fn.addBack || (t.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
        return function(i) {
            return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
        }
    }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({
        disableSelection: function() {
            return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
                t.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), t.extend(t.ui, {
        plugin: {
            add: function(e, i, n) {
                var s, o = t.ui[e].prototype;
                for (s in n) o.plugins[s] = o.plugins[s] || [], o.plugins[s].push([i, n[s]])
            },
            call: function(t, e, i) {
                var n, s = t.plugins[e];
                if (s && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)
                    for (n = 0; s.length > n; n++) t.options[s[n][0]] && s[n][1].apply(t.element, i)
            }
        },
        hasScroll: function(e, i) {
            if ("hidden" === t(e).css("overflow")) return !1;
            var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                s = !1;
            return e[n] > 0 ? !0 : (e[n] = 1, s = e[n] > 0, e[n] = 0, s)
        }
    })
}(jQuery), function(t, e) {
    var i = 0,
        n = Array.prototype.slice,
        s = t.cleanData;
    t.cleanData = function(e) {
        for (var i, n = 0; null != (i = e[n]); n++) try {
            t(i).triggerHandler("remove")
        } catch (o) {}
        s(e)
    }, t.widget = function(i, n, s) {
        var o, r, a, l, c = {},
            u = i.split(".")[0];
        i = i.split(".")[1], o = u + "-" + i, s || (s = n, n = t.Widget), t.expr[":"][o.toLowerCase()] = function(e) {
            return !!t.data(e, o)
        }, t[u] = t[u] || {}, r = t[u][i], a = t[u][i] = function(t, i) {
            return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new a(t, i)
        }, t.extend(a, r, {
            version: s.version,
            _proto: t.extend({}, s),
            _childConstructors: []
        }), l = new n, l.options = t.widget.extend({}, l.options), t.each(s, function(i, s) {
            return t.isFunction(s) ? (c[i] = function() {
                var t = function() {
                        return n.prototype[i].apply(this, arguments)
                    },
                    e = function(t) {
                        return n.prototype[i].apply(this, t)
                    };
                return function() {
                    var i, n = this._super,
                        o = this._superApply;
                    return this._super = t, this._superApply = e, i = s.apply(this, arguments), this._super = n, this._superApply = o, i
                }
            }(), e) : (c[i] = s, e)
        }), a.prototype = t.widget.extend(l, {
            widgetEventPrefix: r ? l.widgetEventPrefix : i
        }, c, {
            constructor: a,
            namespace: u,
            widgetName: i,
            widgetFullName: o
        }), r ? (t.each(r._childConstructors, function(e, i) {
            var n = i.prototype;
            t.widget(n.namespace + "." + n.widgetName, a, i._proto)
        }), delete r._childConstructors) : n._childConstructors.push(a), t.widget.bridge(i, a)
    }, t.widget.extend = function(i) {
        for (var s, o, r = n.call(arguments, 1), a = 0, l = r.length; l > a; a++)
            for (s in r[a]) o = r[a][s], r[a].hasOwnProperty(s) && o !== e && (i[s] = t.isPlainObject(o) ? t.isPlainObject(i[s]) ? t.widget.extend({}, i[s], o) : t.widget.extend({}, o) : o);
        return i
    }, t.widget.bridge = function(i, s) {
        var o = s.prototype.widgetFullName || i;
        t.fn[i] = function(r) {
            var a = "string" == typeof r,
                l = n.call(arguments, 1),
                c = this;
            return r = !a && l.length ? t.widget.extend.apply(null, [r].concat(l)) : r, this.each(a ? function() {
                var n, s = t.data(this, o);
                return s ? t.isFunction(s[r]) && "_" !== r.charAt(0) ? (n = s[r].apply(s, l), n !== s && n !== e ? (c = n && n.jquery ? c.pushStack(n.get()) : n, !1) : e) : t.error("no such method '" + r + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + r + "'")
            } : function() {
                var e = t.data(this, o);
                e ? e.option(r || {})._init() : t.data(this, o, new s(r, this))
            }), c
        }
    }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(e, n) {
            n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(t) {
                    t.target === n && this.destroy()
                }
            }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function() {
            return this.element
        },
        option: function(i, n) {
            var s, o, r, a = i;
            if (0 === arguments.length) return t.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (a = {}, s = i.split("."), i = s.shift(), s.length) {
                    for (o = a[i] = t.widget.extend({}, this.options[i]), r = 0; s.length - 1 > r; r++) o[s[r]] = o[s[r]] || {}, o = o[s[r]];
                    if (i = s.pop(), n === e) return o[i] === e ? null : o[i];
                    o[i] = n
                } else {
                    if (n === e) return this.options[i] === e ? null : this.options[i];
                    a[i] = n
                }
            return this._setOptions(a), this
        },
        _setOptions: function(t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this
        },
        _setOption: function(t, e) {
            return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(i, n, s) {
            var o, r = this;
            "boolean" != typeof i && (s = n, n = i, i = !1), s ? (n = o = t(n), this.bindings = this.bindings.add(n)) : (s = n, n = this.element, o = this.widget()), t.each(s, function(s, a) {
                function l() {
                    return i || r.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? r[a] : a).apply(r, arguments) : e
                }
                "string" != typeof a && (l.guid = a.guid = a.guid || l.guid || t.guid++);
                var c = s.match(/^(\w+)\s*(.*)$/),
                    u = c[1] + r.eventNamespace,
                    h = c[2];
                h ? o.delegate(h, u, l) : n.bind(u, l)
            })
        },
        _off: function(t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
        },
        _delay: function(t, e) {
            function i() {
                return ("string" == typeof t ? n[t] : t).apply(n, arguments)
            }
            var n = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function(e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function(e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(e, i, n) {
            var s, o, r = this.options[e];
            if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                for (s in o) s in i || (i[s] = o[s]);
            return this.element.trigger(i, n), !(t.isFunction(r) && r.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
        }
    }, t.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(e, i) {
        t.Widget.prototype["_" + e] = function(n, s, o) {
            "string" == typeof s && (s = {
                effect: s
            });
            var r, a = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
            s = s || {}, "number" == typeof s && (s = {
                duration: s
            }), r = !t.isEmptyObject(s), s.complete = o, s.delay && n.delay(s.delay), r && t.effects && t.effects.effect[a] ? n[e](s) : a !== e && n[a] ? n[a](s.duration, s.easing, o) : n.queue(function(i) {
                t(this)[e](), o && o.call(n[0]), i()
            })
        }
    })
}(jQuery), function(t) {
    var e = !1;
    t(document).mouseup(function() {
        e = !1
    }), t.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function(i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(i) {
            if (!e) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var n = this,
                    s = 1 === i.which,
                    o = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                return s && !o && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    n.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                    return n._mouseMove(t)
                }, this._mouseUpDelegate = function(t) {
                    return n._mouseUp(t)
                }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
            }
        },
        _mouseMove: function(e) {
            return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function(e) {
            return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}(jQuery), function(t, e) {
    function i(t, e, i) {
        return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
    }

    function n(e, i) {
        return parseInt(t.css(e, i), 10) || 0
    }

    function s(e) {
        var i = e[0];
        return 9 === i.nodeType ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : t.isWindow(i) ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: e.scrollTop(),
                left: e.scrollLeft()
            }
        } : i.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: i.pageY,
                left: i.pageX
            }
        } : {
            width: e.outerWidth(),
            height: e.outerHeight(),
            offset: e.offset()
        }
    }
    t.ui = t.ui || {};
    var o, r = Math.max,
        a = Math.abs,
        l = Math.round,
        c = /left|center|right/,
        u = /top|center|bottom/,
        h = /[\+\-]\d+(\.[\d]+)?%?/,
        d = /^\w+/,
        p = /%$/,
        f = t.fn.position;
    t.position = {
        scrollbarWidth: function() {
            if (o !== e) return o;
            var i, n, s = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                r = s.children()[0];
            return t("body").append(s), i = r.offsetWidth, s.css("overflow", "scroll"), n = r.offsetWidth, i === n && (n = s[0].clientWidth), s.remove(), o = i - n
        },
        getScrollInfo: function(e) {
            var i = e.isWindow ? "" : e.element.css("overflow-x"),
                n = e.isWindow ? "" : e.element.css("overflow-y"),
                s = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                o = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
            return {
                width: o ? t.position.scrollbarWidth() : 0,
                height: s ? t.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(e) {
            var i = t(e || window),
                n = t.isWindow(i[0]);
            return {
                element: i,
                isWindow: n,
                offset: i.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: n ? i.width() : i.outerWidth(),
                height: n ? i.height() : i.outerHeight()
            }
        }
    }, t.fn.position = function(e) {
        if (!e || !e.of) return f.apply(this, arguments);
        e = t.extend({}, e);
        var o, p, m, g, v, y, b = t(e.of),
            w = t.position.getWithinInfo(e.within),
            x = t.position.getScrollInfo(w),
            _ = (e.collision || "flip").split(" "),
            C = {};
        return y = s(b), b[0].preventDefault && (e.at = "left top"), p = y.width, m = y.height, g = y.offset, v = t.extend({}, g), t.each(["my", "at"], function() {
            var t, i, n = (e[this] || "").split(" ");
            1 === n.length && (n = c.test(n[0]) ? n.concat(["center"]) : u.test(n[0]) ? ["center"].concat(n) : ["center", "center"]), n[0] = c.test(n[0]) ? n[0] : "center", n[1] = u.test(n[1]) ? n[1] : "center", t = h.exec(n[0]), i = h.exec(n[1]), C[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(n[0])[0], d.exec(n[1])[0]]
        }), 1 === _.length && (_[1] = _[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2), o = i(C.at, p, m), v.left += o[0], v.top += o[1], this.each(function() {
            var s, c, u = t(this),
                h = u.outerWidth(),
                d = u.outerHeight(),
                f = n(this, "marginLeft"),
                y = n(this, "marginTop"),
                S = h + f + n(this, "marginRight") + x.width,
                T = d + y + n(this, "marginBottom") + x.height,
                k = t.extend({}, v),
                E = i(C.my, u.outerWidth(), u.outerHeight());
            "right" === e.my[0] ? k.left -= h : "center" === e.my[0] && (k.left -= h / 2), "bottom" === e.my[1] ? k.top -= d : "center" === e.my[1] && (k.top -= d / 2), k.left += E[0], k.top += E[1], t.support.offsetFractions || (k.left = l(k.left), k.top = l(k.top)), s = {
                marginLeft: f,
                marginTop: y
            }, t.each(["left", "top"], function(i, n) {
                t.ui.position[_[i]] && t.ui.position[_[i]][n](k, {
                    targetWidth: p,
                    targetHeight: m,
                    elemWidth: h,
                    elemHeight: d,
                    collisionPosition: s,
                    collisionWidth: S,
                    collisionHeight: T,
                    offset: [o[0] + E[0], o[1] + E[1]],
                    my: e.my,
                    at: e.at,
                    within: w,
                    elem: u
                })
            }), e.using && (c = function(t) {
                var i = g.left - k.left,
                    n = i + p - h,
                    s = g.top - k.top,
                    o = s + m - d,
                    l = {
                        target: {
                            element: b,
                            left: g.left,
                            top: g.top,
                            width: p,
                            height: m
                        },
                        element: {
                            element: u,
                            left: k.left,
                            top: k.top,
                            width: h,
                            height: d
                        },
                        horizontal: 0 > n ? "left" : i > 0 ? "right" : "center",
                        vertical: 0 > o ? "top" : s > 0 ? "bottom" : "middle"
                    };
                h > p && p > a(i + n) && (l.horizontal = "center"), d > m && m > a(s + o) && (l.vertical = "middle"), l.important = r(a(i), a(n)) > r(a(s), a(o)) ? "horizontal" : "vertical", e.using.call(this, t, l)
            }), u.offset(t.extend(k, {
                using: c
            }))
        })
    }, t.ui.position = {
        fit: {
            left: function(t, e) {
                var i, n = e.within,
                    s = n.isWindow ? n.scrollLeft : n.offset.left,
                    o = n.width,
                    a = t.left - e.collisionPosition.marginLeft,
                    l = s - a,
                    c = a + e.collisionWidth - o - s;
                e.collisionWidth > o ? l > 0 && 0 >= c ? (i = t.left + l + e.collisionWidth - o - s, t.left += l - i) : t.left = c > 0 && 0 >= l ? s : l > c ? s + o - e.collisionWidth : s : l > 0 ? t.left += l : c > 0 ? t.left -= c : t.left = r(t.left - a, t.left)
            },
            top: function(t, e) {
                var i, n = e.within,
                    s = n.isWindow ? n.scrollTop : n.offset.top,
                    o = e.within.height,
                    a = t.top - e.collisionPosition.marginTop,
                    l = s - a,
                    c = a + e.collisionHeight - o - s;
                e.collisionHeight > o ? l > 0 && 0 >= c ? (i = t.top + l + e.collisionHeight - o - s, t.top += l - i) : t.top = c > 0 && 0 >= l ? s : l > c ? s + o - e.collisionHeight : s : l > 0 ? t.top += l : c > 0 ? t.top -= c : t.top = r(t.top - a, t.top)
            }
        },
        flip: {
            left: function(t, e) {
                var i, n, s = e.within,
                    o = s.offset.left + s.scrollLeft,
                    r = s.width,
                    l = s.isWindow ? s.scrollLeft : s.offset.left,
                    c = t.left - e.collisionPosition.marginLeft,
                    u = c - l,
                    h = c + e.collisionWidth - r - l,
                    d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                    p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                    f = -2 * e.offset[0];
                0 > u ? (i = t.left + d + p + f + e.collisionWidth - r - o, (0 > i || a(u) > i) && (t.left += d + p + f)) : h > 0 && (n = t.left - e.collisionPosition.marginLeft + d + p + f - l, (n > 0 || h > a(n)) && (t.left += d + p + f))
            },
            top: function(t, e) {
                var i, n, s = e.within,
                    o = s.offset.top + s.scrollTop,
                    r = s.height,
                    l = s.isWindow ? s.scrollTop : s.offset.top,
                    c = t.top - e.collisionPosition.marginTop,
                    u = c - l,
                    h = c + e.collisionHeight - r - l,
                    d = "top" === e.my[1],
                    p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                    f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                    m = -2 * e.offset[1];
                0 > u ? (n = t.top + p + f + m + e.collisionHeight - r - o, t.top + p + f + m > u && (0 > n || a(u) > n) && (t.top += p + f + m)) : h > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - l, t.top + p + f + m > h && (i > 0 || h > a(i)) && (t.top += p + f + m))
            }
        },
        flipfit: {
            left: function() {
                t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
            }
        }
    },
    function() {
        var e, i, n, s, o, r = document.getElementsByTagName("body")[0],
            a = document.createElement("div");
        e = document.createElement(r ? "div" : "body"), n = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, r && t.extend(n, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (o in n) e.style[o] = n[o];
        e.appendChild(a), i = r || document.documentElement, i.insertBefore(e, i.firstChild), a.style.cssText = "position: absolute; left: 10.7432222px;", s = t(a).offset().left, t.support.offsetFractions = s > 10 && 11 > s, e.innerHTML = "", i.removeChild(e)
    }()
}(jQuery), function(t, e) {
    function i() {
        return ++s
    }

    function n(t) {
        return t.hash.length > 1 && decodeURIComponent(t.href.replace(o, "")) === decodeURIComponent(location.href.replace(o, ""))
    }
    var s = 0,
        o = /#.*$/;
    t.widget("ui.tabs", {
        version: "1.10.3",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function() {
            var e = this,
                i = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(e) {
                t(this).is(".ui-state-disabled") && e.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                t(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                return e.tabs.index(t)
            }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
        },
        _initialActive: function() {
            var i = this.options.active,
                n = this.options.collapsible,
                s = location.hash.substring(1);
            return null === i && (s && this.tabs.each(function(n, o) {
                return t(o).attr("aria-controls") === s ? (i = n, !1) : e
            }), null === i && (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === i || -1 === i) && (i = this.tabs.length ? 0 : !1)), i !== !1 && (i = this.tabs.index(this.tabs.eq(i)), -1 === i && (i = n ? !1 : 0)), !n && i === !1 && this.anchors.length && (i = 0), i
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : t()
            }
        },
        _tabKeydown: function(i) {
            var n = t(this.document[0].activeElement).closest("li"),
                s = this.tabs.index(n),
                o = !0;
            if (!this._handlePageNav(i)) {
                switch (i.keyCode) {
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                        s++;
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.LEFT:
                        o = !1, s--;
                        break;
                    case t.ui.keyCode.END:
                        s = this.anchors.length - 1;
                        break;
                    case t.ui.keyCode.HOME:
                        s = 0;
                        break;
                    case t.ui.keyCode.SPACE:
                        return i.preventDefault(), clearTimeout(this.activating), this._activate(s), e;
                    case t.ui.keyCode.ENTER:
                        return i.preventDefault(), clearTimeout(this.activating), this._activate(s === this.options.active ? !1 : s), e;
                    default:
                        return
                }
                i.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, o), i.ctrlKey || (n.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", s)
                }, this.delay))
            }
        },
        _panelKeydown: function(e) {
            this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
        },
        _handlePageNav: function(i) {
            return i.altKey && i.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : i.altKey && i.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : e
        },
        _findNextTab: function(e, i) {
            function n() {
                return e > s && (e = 0), 0 > e && (e = s), e
            }
            for (var s = this.tabs.length - 1; - 1 !== t.inArray(n(), this.options.disabled);) e = i ? e + 1 : e - 1;
            return e
        },
        _focusNextTab: function(t, e) {
            return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
        },
        _setOption: function(t, i) {
            return "active" === t ? (this._activate(i), e) : "disabled" === t ? (this._setupDisabled(i), e) : (this._super(t, i), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", i), i || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(i), "heightStyle" === t && this._setupHeightStyle(i), e)
        },
        _tabId: function(t) {
            return t.attr("aria-controls") || "ui-tabs-" + i()
        },
        _sanitizeSelector: function(t) {
            return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var e = this.options,
                i = this.tablist.children(":has(a[href])");
            e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
                return i.index(t)
            }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var e = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function() {
                return t("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = t(), this.anchors.each(function(i, s) {
                var o, r, a, l = t(s).uniqueId().attr("id"),
                    c = t(s).closest("li"),
                    u = c.attr("aria-controls");
                n(s) ? (o = s.hash, r = e.element.find(e._sanitizeSelector(o))) : (a = e._tabId(c), o = "#" + a, r = e.element.find(o), r.length || (r = e._createPanel(a), r.insertAfter(e.panels[i - 1] || e.tablist)), r.attr("aria-live", "polite")), r.length && (e.panels = e.panels.add(r)), u && c.data("ui-tabs-aria-controls", u), c.attr({
                    "aria-controls": o.substring(1),
                    "aria-labelledby": l
                }), r.attr("aria-labelledby", l)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function() {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(e) {
            return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(e) {
            t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
            for (var i, n = 0; i = this.tabs[n]; n++) e === !0 || -1 !== t.inArray(n, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = e
        },
        _setupEvents: function(e) {
            var i = {
                click: function(t) {
                    t.preventDefault()
                }
            };
            e && t.each(e.split(" "), function(t, e) {
                i[e] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(e) {
            var i, n = this.element.parent();
            "fill" === e ? (i = n.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                var e = t(this),
                    n = e.css("position");
                "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function() {
                i -= t(this).outerHeight(!0)
            }), this.panels.each(function() {
                t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                i = Math.max(i, t(this).height("").height())
            }).height(i))
        },
        _eventHandler: function(e) {
            var i = this.options,
                n = this.active,
                s = t(e.currentTarget),
                o = s.closest("li"),
                r = o[0] === n[0],
                a = r && i.collapsible,
                l = a ? t() : this._getPanelForTab(o),
                c = n.length ? this._getPanelForTab(n) : t(),
                u = {
                    oldTab: n,
                    oldPanel: c,
                    newTab: a ? t() : o,
                    newPanel: l
                };
            e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || r && !i.collapsible || this._trigger("beforeActivate", e, u) === !1 || (i.active = a ? !1 : this.tabs.index(o), this.active = r ? t() : o, this.xhr && this.xhr.abort(), c.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(o), e), this._toggle(e, u))
        },
        _toggle: function(e, i) {
            function n() {
                o.running = !1, o._trigger("activate", e, i)
            }

            function s() {
                i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), r.length && o.options.show ? o._show(r, o.options.show, n) : (r.show(), n())
            }
            var o = this,
                r = i.newPanel,
                a = i.oldPanel;
            this.running = !0, a.length && this.options.hide ? this._hide(a, this.options.hide, function() {
                i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), s()
            }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), a.hide(), s()), a.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), i.oldTab.attr("aria-selected", "false"), r.length && a.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function() {
                return 0 === t(this).attr("tabIndex")
            }).attr("tabIndex", -1), r.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }), i.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function(e) {
            var i, n = this._findActive(e);
            n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function(e) {
            return e === !1 ? t() : this.tabs.eq(e)
        },
        _getIndex: function(t) {
            return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function() {
                var e = t(this),
                    i = e.data("ui-tabs-aria-controls");
                i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(i) {
            var n = this.options.disabled;
            n !== !1 && (i === e ? n = !1 : (i = this._getIndex(i), n = t.isArray(n) ? t.map(n, function(t) {
                return t !== i ? t : null
            }) : t.map(this.tabs, function(t, e) {
                return e !== i ? e : null
            })), this._setupDisabled(n))
        },
        disable: function(i) {
            var n = this.options.disabled;
            if (n !== !0) {
                if (i === e) n = !0;
                else {
                    if (i = this._getIndex(i), -1 !== t.inArray(i, n)) return;
                    n = t.isArray(n) ? t.merge([i], n).sort() : [i]
                }
                this._setupDisabled(n)
            }
        },
        load: function(e, i) {
            e = this._getIndex(e);
            var s = this,
                o = this.tabs.eq(e),
                r = o.find(".ui-tabs-anchor"),
                a = this._getPanelForTab(o),
                l = {
                    tab: o,
                    panel: a
                };
            n(r[0]) || (this.xhr = t.ajax(this._ajaxSettings(r, i, l)), this.xhr && "canceled" !== this.xhr.statusText && (o.addClass("ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.success(function(t) {
                setTimeout(function() {
                    a.html(t), s._trigger("load", i, l)
                }, 1)
            }).complete(function(t, e) {
                setTimeout(function() {
                    "abort" === e && s.panels.stop(!1, !0), o.removeClass("ui-tabs-loading"), a.removeAttr("aria-busy"), t === s.xhr && delete s.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function(e, i, n) {
            var s = this;
            return {
                url: e.attr("href"),
                beforeSend: function(e, o) {
                    return s._trigger("beforeLoad", i, t.extend({
                        jqXHR: e,
                        ajaxSettings: o
                    }, n))
                }
            }
        },
        _getPanelForTab: function(e) {
            var i = t(e).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    })
}(jQuery), function(t, e) {
    var i = "ui-effects-";
    t.effects = {
        effect: {}
    },
    function(t, e) {
        function i(t, e, i) {
            var n = h[e.type] || {};
            return null == t ? i || !e.def ? null : e.def : (t = n.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : n.mod ? (t + n.mod) % n.mod : 0 > t ? 0 : t > n.max ? n.max : t)
        }

        function n(i) {
            var n = c(),
                s = n._rgba = [];
            return i = i.toLowerCase(), f(l, function(t, o) {
                var r, a = o.re.exec(i),
                    l = a && o.parse(a),
                    c = o.space || "rgba";
                return l ? (r = n[c](l), n[u[c].cache] = r[u[c].cache], s = n._rgba = r._rgba, !1) : e
            }), s.length ? ("0,0,0,0" === s.join() && t.extend(s, o.transparent), n) : o[i]
        }

        function s(t, e, i) {
            return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
        }
        var o, r = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
            a = /^([\-+])=\s*(\d+\.?\d*)/,
            l = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(t) {
                    return [t[1], t[2], t[3], t[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(t) {
                    return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function(t) {
                    return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function(t) {
                    return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function(t) {
                    return [t[1], t[2] / 100, t[3] / 100, t[4]]
                }
            }],
            c = t.Color = function(e, i, n, s) {
                return new t.Color.fn.parse(e, i, n, s)
            },
            u = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            },
            h = {
                "byte": {
                    floor: !0,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: !0
                }
            },
            d = c.support = {},
            p = t("<p>")[0],
            f = t.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(u, function(t, e) {
            e.cache = "_" + t, e.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }), c.fn = t.extend(c.prototype, {
            parse: function(s, r, a, l) {
                if (s === e) return this._rgba = [null, null, null, null], this;
                (s.jquery || s.nodeType) && (s = t(s).css(r), r = e);
                var h = this,
                    d = t.type(s),
                    p = this._rgba = [];
                return r !== e && (s = [s, r, a, l], d = "array"), "string" === d ? this.parse(n(s) || o._default) : "array" === d ? (f(u.rgba.props, function(t, e) {
                    p[e.idx] = i(s[e.idx], e)
                }), this) : "object" === d ? (s instanceof c ? f(u, function(t, e) {
                    s[e.cache] && (h[e.cache] = s[e.cache].slice())
                }) : f(u, function(e, n) {
                    var o = n.cache;
                    f(n.props, function(t, e) {
                        if (!h[o] && n.to) {
                            if ("alpha" === t || null == s[t]) return;
                            h[o] = n.to(h._rgba)
                        }
                        h[o][e.idx] = i(s[t], e, !0)
                    }), h[o] && 0 > t.inArray(null, h[o].slice(0, 3)) && (h[o][3] = 1, n.from && (h._rgba = n.from(h[o])))
                }), this) : e
            },
            is: function(t) {
                var i = c(t),
                    n = !0,
                    s = this;
                return f(u, function(t, o) {
                    var r, a = i[o.cache];
                    return a && (r = s[o.cache] || o.to && o.to(s._rgba) || [], f(o.props, function(t, i) {
                        return null != a[i.idx] ? n = a[i.idx] === r[i.idx] : e
                    })), n
                }), n
            },
            _space: function() {
                var t = [],
                    e = this;
                return f(u, function(i, n) {
                    e[n.cache] && t.push(i)
                }), t.pop()
            },
            transition: function(t, e) {
                var n = c(t),
                    s = n._space(),
                    o = u[s],
                    r = 0 === this.alpha() ? c("transparent") : this,
                    a = r[o.cache] || o.to(r._rgba),
                    l = a.slice();
                return n = n[o.cache], f(o.props, function(t, s) {
                    var o = s.idx,
                        r = a[o],
                        c = n[o],
                        u = h[s.type] || {};
                    null !== c && (null === r ? l[o] = c : (u.mod && (c - r > u.mod / 2 ? r += u.mod : r - c > u.mod / 2 && (r -= u.mod)), l[o] = i((c - r) * e + r, s)))
                }), this[s](l)
            },
            blend: function(e) {
                if (1 === this._rgba[3]) return this;
                var i = this._rgba.slice(),
                    n = i.pop(),
                    s = c(e)._rgba;
                return c(t.map(i, function(t, e) {
                    return (1 - n) * s[e] + n * t
                }))
            },
            toRgbaString: function() {
                var e = "rgba(",
                    i = t.map(this._rgba, function(t, e) {
                        return null == t ? e > 2 ? 1 : 0 : t
                    });
                return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
            },
            toHslaString: function() {
                var e = "hsla(",
                    i = t.map(this.hsla(), function(t, e) {
                        return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                    });
                return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
            },
            toHexString: function(e) {
                var i = this._rgba.slice(),
                    n = i.pop();
                return e && i.push(~~(255 * n)), "#" + t.map(i, function(t) {
                    return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                }).join("")
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }), c.fn.parse.prototype = c.fn, u.hsla.to = function(t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
            var e, i, n = t[0] / 255,
                s = t[1] / 255,
                o = t[2] / 255,
                r = t[3],
                a = Math.max(n, s, o),
                l = Math.min(n, s, o),
                c = a - l,
                u = a + l,
                h = .5 * u;
            return e = l === a ? 0 : n === a ? 60 * (s - o) / c + 360 : s === a ? 60 * (o - n) / c + 120 : 60 * (n - s) / c + 240, i = 0 === c ? 0 : .5 >= h ? c / u : c / (2 - u), [Math.round(e) % 360, i, h, null == r ? 1 : r]
        }, u.hsla.from = function(t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
            var e = t[0] / 360,
                i = t[1],
                n = t[2],
                o = t[3],
                r = .5 >= n ? n * (1 + i) : n + i - n * i,
                a = 2 * n - r;
            return [Math.round(255 * s(a, r, e + 1 / 3)), Math.round(255 * s(a, r, e)), Math.round(255 * s(a, r, e - 1 / 3)), o]
        }, f(u, function(n, s) {
            var o = s.props,
                r = s.cache,
                l = s.to,
                u = s.from;
            c.fn[n] = function(n) {
                if (l && !this[r] && (this[r] = l(this._rgba)), n === e) return this[r].slice();
                var s, a = t.type(n),
                    h = "array" === a || "object" === a ? n : arguments,
                    d = this[r].slice();
                return f(o, function(t, e) {
                    var n = h["object" === a ? t : e.idx];
                    null == n && (n = d[e.idx]), d[e.idx] = i(n, e)
                }), u ? (s = c(u(d)), s[r] = d, s) : c(d)
            }, f(o, function(e, i) {
                c.fn[e] || (c.fn[e] = function(s) {
                    var o, r = t.type(s),
                        l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : n,
                        c = this[l](),
                        u = c[i.idx];
                    return "undefined" === r ? u : ("function" === r && (s = s.call(this, u), r = t.type(s)), null == s && i.empty ? this : ("string" === r && (o = a.exec(s), o && (s = u + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), c[i.idx] = s, this[l](c)))
                })
            })
        }), c.hook = function(e) {
            var i = e.split(" ");
            f(i, function(e, i) {
                t.cssHooks[i] = {
                    set: function(e, s) {
                        var o, r, a = "";
                        if ("transparent" !== s && ("string" !== t.type(s) || (o = n(s)))) {
                            if (s = c(o || s), !d.rgba && 1 !== s._rgba[3]) {
                                for (r = "backgroundColor" === i ? e.parentNode : e;
                                    ("" === a || "transparent" === a) && r && r.style;) try {
                                    a = t.css(r, "backgroundColor"), r = r.parentNode
                                } catch (l) {}
                                s = s.blend(a && "transparent" !== a ? a : "_default")
                            }
                            s = s.toRgbaString()
                        }
                        try {
                            e.style[i] = s
                        } catch (l) {}
                    }
                }, t.fx.step[i] = function(e) {
                    e.colorInit || (e.start = c(e.elem, i), e.end = c(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                }
            })
        }, c.hook(r), t.cssHooks.borderColor = {
            expand: function(t) {
                var e = {};
                return f(["Top", "Right", "Bottom", "Left"], function(i, n) {
                    e["border" + n + "Color"] = t
                }), e
            }
        }, o = t.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(jQuery),
    function() {
        function i(e) {
            var i, n, s = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                o = {};
            if (s && s.length && s[0] && s[s[0]])
                for (n = s.length; n--;) i = s[n], "string" == typeof s[i] && (o[t.camelCase(i)] = s[i]);
            else
                for (i in s) "string" == typeof s[i] && (o[i] = s[i]);
            return o
        }

        function n(e, i) {
            var n, s, r = {};
            for (n in i) s = i[n], e[n] !== s && (o[n] || (t.fx.step[n] || !isNaN(parseFloat(s))) && (r[n] = s));
            return r
        }
        var s = ["add", "remove", "toggle"],
            o = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
            t.fx.step[i] = function(t) {
                ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0)
            }
        }), t.fn.addBack || (t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t.effects.animateClass = function(e, o, r, a) {
            var l = t.speed(o, r, a);
            return this.queue(function() {
                var o, r = t(this),
                    a = r.attr("class") || "",
                    c = l.children ? r.find("*").addBack() : r;
                c = c.map(function() {
                    var e = t(this);
                    return {
                        el: e,
                        start: i(this)
                    }
                }), o = function() {
                    t.each(s, function(t, i) {
                        e[i] && r[i + "Class"](e[i])
                    })
                }, o(), c = c.map(function() {
                    return this.end = i(this.el[0]), this.diff = n(this.start, this.end), this
                }), r.attr("class", a), c = c.map(function() {
                    var e = this,
                        i = t.Deferred(),
                        n = t.extend({}, l, {
                            queue: !1,
                            complete: function() {
                                i.resolve(e)
                            }
                        });
                    return this.el.animate(this.diff, n), i.promise()
                }), t.when.apply(t, c.get()).done(function() {
                    o(), t.each(arguments, function() {
                        var e = this.el;
                        t.each(this.diff, function(t) {
                            e.css(t, "")
                        })
                    }), l.complete.call(r[0])
                })
            })
        }, t.fn.extend({
            addClass: function(e) {
                return function(i, n, s, o) {
                    return n ? t.effects.animateClass.call(this, {
                        add: i
                    }, n, s, o) : e.apply(this, arguments)
                }
            }(t.fn.addClass),
            removeClass: function(e) {
                return function(i, n, s, o) {
                    return arguments.length > 1 ? t.effects.animateClass.call(this, {
                        remove: i
                    }, n, s, o) : e.apply(this, arguments)
                }
            }(t.fn.removeClass),
            toggleClass: function(i) {
                return function(n, s, o, r, a) {
                    return "boolean" == typeof s || s === e ? o ? t.effects.animateClass.call(this, s ? {
                        add: n
                    } : {
                        remove: n
                    }, o, r, a) : i.apply(this, arguments) : t.effects.animateClass.call(this, {
                        toggle: n
                    }, s, o, r)
                }
            }(t.fn.toggleClass),
            switchClass: function(e, i, n, s, o) {
                return t.effects.animateClass.call(this, {
                    add: i,
                    remove: e
                }, n, s, o)
            }
        })
    }(),
    function() {
        function n(e, i, n, s) {
            return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                effect: e
            }, null == i && (i = {}), t.isFunction(i) && (s = i, n = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (s = n, n = i, i = {}), t.isFunction(n) && (s = n, n = null), i && t.extend(e, i), n = n || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof n ? n : n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default, e.complete = s || i.complete, e
        }

        function s(e) {
            return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
        }
        t.extend(t.effects, {
            version: "1.10.3",
            save: function(t, e) {
                for (var n = 0; e.length > n; n++) null !== e[n] && t.data(i + e[n], t[0].style[e[n]])
            },
            restore: function(t, n) {
                var s, o;
                for (o = 0; n.length > o; o++) null !== n[o] && (s = t.data(i + n[o]), s === e && (s = ""), t.css(n[o], s))
            },
            setMode: function(t, e) {
                return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
            },
            getBaseline: function(t, e) {
                var i, n;
                switch (t[0]) {
                    case "top":
                        i = 0;
                        break;
                    case "middle":
                        i = .5;
                        break;
                    case "bottom":
                        i = 1;
                        break;
                    default:
                        i = t[0] / e.height
                }
                switch (t[1]) {
                    case "left":
                        n = 0;
                        break;
                    case "center":
                        n = .5;
                        break;
                    case "right":
                        n = 1;
                        break;
                    default:
                        n = t[1] / e.width
                }
                return {
                    x: n,
                    y: i
                }
            },
            createWrapper: function(e) {
                if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                var i = {
                        width: e.outerWidth(!0),
                        height: e.outerHeight(!0),
                        "float": e.css("float")
                    },
                    n = t("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    s = {
                        width: e.width(),
                        height: e.height()
                    },
                    o = document.activeElement;
                try {
                    o.id
                } catch (r) {
                    o = document.body
                }
                return e.wrap(n), (e[0] === o || t.contains(e[0], o)) && t(o).focus(), n = e.parent(), "static" === e.css("position") ? (n.css({
                    position: "relative"
                }), e.css({
                    position: "relative"
                })) : (t.extend(i, {
                    position: e.css("position"),
                    zIndex: e.css("z-index")
                }), t.each(["top", "left", "bottom", "right"], function(t, n) {
                    i[n] = e.css(n), isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                }), e.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), e.css(s), n.css(i).show()
            },
            removeWrapper: function(e) {
                var i = document.activeElement;
                return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
            },
            setTransition: function(e, i, n, s) {
                return s = s || {}, t.each(i, function(t, i) {
                    var o = e.cssUnit(i);
                    o[0] > 0 && (s[i] = o[0] * n + o[1])
                }), s
            }
        }), t.fn.extend({
            effect: function() {
                function e(e) {
                    function n() {
                        t.isFunction(o) && o.call(s[0]), t.isFunction(e) && e()
                    }
                    var s = t(this),
                        o = i.complete,
                        a = i.mode;
                    (s.is(":hidden") ? "hide" === a : "show" === a) ? (s[a](), n()) : r.call(s[0], i, n)
                }
                var i = n.apply(this, arguments),
                    s = i.mode,
                    o = i.queue,
                    r = t.effects.effect[i.effect];
                return t.fx.off || !r ? s ? this[s](i.duration, i.complete) : this.each(function() {
                    i.complete && i.complete.call(this)
                }) : o === !1 ? this.each(e) : this.queue(o || "fx", e)
            },
            show: function(t) {
                return function(e) {
                    if (s(e)) return t.apply(this, arguments);
                    var i = n.apply(this, arguments);
                    return i.mode = "show", this.effect.call(this, i)
                }
            }(t.fn.show),
            hide: function(t) {
                return function(e) {
                    if (s(e)) return t.apply(this, arguments);
                    var i = n.apply(this, arguments);
                    return i.mode = "hide", this.effect.call(this, i)
                }
            }(t.fn.hide),
            toggle: function(t) {
                return function(e) {
                    if (s(e) || "boolean" == typeof e) return t.apply(this, arguments);
                    var i = n.apply(this, arguments);
                    return i.mode = "toggle", this.effect.call(this, i)
                }
            }(t.fn.toggle),
            cssUnit: function(e) {
                var i = this.css(e),
                    n = [];
                return t.each(["em", "px", "%", "pt"], function(t, e) {
                    i.indexOf(e) > 0 && (n = [parseFloat(i), e])
                }), n
            }
        })
    }(),
    function() {
        var e = {};
        t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
            e[i] = function(e) {
                return Math.pow(e, t + 2)
            }
        }), t.extend(e, {
            Sine: function(t) {
                return 1 - Math.cos(t * Math.PI / 2)
            },
            Circ: function(t) {
                return 1 - Math.sqrt(1 - t * t)
            },
            Elastic: function(t) {
                return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(t) {
                return t * t * (3 * t - 2)
            },
            Bounce: function(t) {
                for (var e, i = 4;
                    ((e = Math.pow(2, --i)) - 1) / 11 > t;);
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            }
        }), t.each(e, function(e, i) {
            t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                return 1 - i(1 - t)
            }, t.easing["easeInOut" + e] = function(t) {
                return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
            }
        })
    }()
}(jQuery), function(t) {
    t.effects.effect.fade = function(e, i) {
        var n = t(this),
            s = t.effects.setMode(n, e.mode || "toggle");
        n.animate({
            opacity: s
        }, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    }
}(jQuery), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                s = i.data("bs.alert");
            s || i.data("bs.alert", s = new n(this)), "string" == typeof e && s[e].call(i)
        })
    }
    var i = '[data-dismiss="alert"]',
        n = function(e) {
            t(e).on("click", i, this.close)
        };
    n.VERSION = "3.3.2", n.TRANSITION_DURATION = 150, n.prototype.close = function(e) {
        function i() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var s = t(this),
            o = s.attr("data-target");
        o || (o = s.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var r = t(o);
        e && e.preventDefault(), r.length || (r = s.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i())
    };
    var s = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = n, t.fn.alert.noConflict = function() {
        return t.fn.alert = s, this
    }, t(document).on("click.bs.alert.data-api", i, n.prototype.close)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.button"),
                o = "object" == typeof e && e;
            s || n.data("bs.button", s = new i(this, o)), "toggle" == e ? s.toggle() : e && s.setState(e)
        })
    }
    var i = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.isLoading = !1
    };
    i.VERSION = "3.3.2", i.DEFAULTS = {
        loadingText: "loading..."
    }, i.prototype.setState = function(e) {
        var i = "disabled",
            n = this.$element,
            s = n.is("input") ? "val" : "html",
            o = n.data();
        e += "Text", null == o.resetText && n.data("resetText", n[s]()), setTimeout(t.proxy(function() {
            n[s](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, n.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, n.removeClass(i).removeAttr(i))
        }, this), 0)
    }, i.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    var n = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
        return t.fn.button = n, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var n = t(i.target);
        n.hasClass("btn") || (n = n.closest(".btn")), e.call(n, "toggle"), i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.carousel"),
                o = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e),
                r = "string" == typeof e ? e : o.slide;
            s || n.data("bs.carousel", s = new i(this, o)), "number" == typeof e ? s.to(e) : r ? s[r]() : o.interval && s.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e),
            n = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (n && !this.options.wrap) return e;
        var s = "prev" == t ? -1 : 1,
            o = (i + s) % this.$items.length;
        return this.$items.eq(o)
    }, i.prototype.to = function(t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function(e, n) {
        var s = this.$element.find(".item.active"),
            o = n || this.getItemForDirection(e, s),
            r = this.interval,
            a = "next" == e ? "left" : "right",
            l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var c = o[0],
            u = t.Event("slide.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
        if (this.$element.trigger(u), !u.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var h = t(this.$indicators.children()[this.getItemIndex(o)]);
                h && h.addClass("active")
            }
            var d = t.Event("slid.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, s.addClass(a), o.addClass(a), s.one("bsTransitionEnd", function() {
                o.removeClass([e, a].join(" ")).addClass("active"), s.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(d)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (s.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(d)), r && this.cycle(), this
        }
    };
    var n = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = n, this
    };
    var s = function(i) {
        var n, s = t(this),
            o = t(s.attr("data-target") || (n = s.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var r = t.extend({}, o.data(), s.data()),
                a = s.attr("data-slide-to");
            a && (r.interval = !1), e.call(o, r), a && o.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", s).on("click.bs.carousel.data-api", "[data-slide-to]", s), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        e && 3 === e.which || (t(s).remove(), t(o).each(function() {
            var n = t(this),
                s = i(n),
                o = {
                    relatedTarget: this
                };
            s.hasClass("open") && (s.trigger(e = t.Event("hide.bs.dropdown", o)), e.isDefaultPrevented() || (n.attr("aria-expanded", "false"), s.removeClass("open").trigger("hidden.bs.dropdown", o)))
        }))
    }

    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var n = i && t(i);
        return n && n.length ? n : e.parent()
    }

    function n(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.dropdown");
            n || i.data("bs.dropdown", n = new r(this)), "string" == typeof e && n[e].call(i)
        })
    }
    var s = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        r = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    r.VERSION = "3.3.2", r.prototype.toggle = function(n) {
        var s = t(this);
        if (!s.is(".disabled, :disabled")) {
            var o = i(s),
                r = o.hasClass("open");
            if (e(), !r) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var a = {
                    relatedTarget: this
                };
                if (o.trigger(n = t.Event("show.bs.dropdown", a)), n.isDefaultPrevented()) return;
                s.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger("shown.bs.dropdown", a)
            }
            return !1
        }
    }, r.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var n = t(this);
            if (e.preventDefault(), e.stopPropagation(), !n.is(".disabled, :disabled")) {
                var s = i(n),
                    r = s.hasClass("open");
                if (!r && 27 != e.which || r && 27 == e.which) return 27 == e.which && s.find(o).trigger("focus"), n.trigger("click");
                var a = " li:not(.divider):visible a",
                    l = s.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                if (l.length) {
                    var c = l.index(e.target);
                    38 == e.which && c > 0 && c--, 40 == e.which && c < l.length - 1 && c++, ~c || (c = 0), l.eq(c).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = n, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, r.prototype.toggle).on("keydown.bs.dropdown.data-api", o, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown)
}(jQuery), + function(t) {
    "use strict";

    function e(e, n) {
        return this.each(function() {
            var s = t(this),
                o = s.data("bs.modal"),
                r = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
            o || s.data("bs.modal", o = new i(this, r)), "string" == typeof e ? o[e](n) : r.show && o.show(n)
        })
    }
    var i = function(e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function(e) {
        var n = this,
            s = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function() {
            var s = t.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(n.$body), n.$element.show().scrollTop(0), n.options.backdrop && n.adjustBackdrop(), n.adjustDialog(), s && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), n.enforceFocus();
            var o = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            s ? n.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                n.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : n.$element.trigger("focus").trigger(o)
        }))
    }, i.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function(e) {
        var n = this,
            s = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && s;
            if (this.$backdrop = t('<div class="modal-backdrop ' + s + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", t.proxy(function(t) {
                t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function() {
                n.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
        } else e && e()
    }, i.prototype.handleUpdate = function() {
        this.options.backdrop && this.adjustBackdrop(), this.adjustDialog()
    }, i.prototype.adjustBackdrop = function() {
        this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight)
    }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, i.prototype.checkScrollbar = function() {
        this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var n = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = n, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var n = t(this),
            s = n.attr("href"),
            o = t(n.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")),
            r = o.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(s) && s
            }, o.data(), n.data());
        n.is("a") && i.preventDefault(), o.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
                n.is(":visible") && n.trigger("focus")
            })
        }), e.call(o, r, this)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.tooltip"),
                o = "object" == typeof e && e;
            (s || "destroy" != e) && (s || n.data("bs.tooltip", s = new i(this, o)), "string" == typeof e && s[e]())
        })
    }
    var i = function(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, i.prototype.init = function(e, i, n) {
        this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var s = this.options.trigger.split(" "), o = s.length; o--;) {
            var r = s[o];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin",
                    l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, n) {
            i[t] != n && (e[t] = n)
        }), e
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var n = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !n) return;
            var s = this,
                o = this.tip(),
                r = this.getUID(this.type);
            this.setContent(), o.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && o.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                c = l.test(a);
            c && (a = a.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var u = this.getPosition(),
                h = o[0].offsetWidth,
                d = o[0].offsetHeight;
            if (c) {
                var p = a,
                    f = this.options.container ? t(this.options.container) : this.$element.parent(),
                    m = this.getPosition(f);
                a = "bottom" == a && u.bottom + d > m.bottom ? "top" : "top" == a && u.top - d < m.top ? "bottom" : "right" == a && u.right + h > m.width ? "left" : "left" == a && u.left - h < m.left ? "right" : a, o.removeClass(p).addClass(a)
            }
            var g = this.getCalculatedOffset(a, u, h, d);
            this.applyPlacement(g, a);
            var v = function() {
                var t = s.hoverState;
                s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == t && s.leave(s)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v()
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var n = this.tip(),
            s = n[0].offsetWidth,
            o = n[0].offsetHeight,
            r = parseInt(n.css("margin-top"), 10),
            a = parseInt(n.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top = e.top + r, e.left = e.left + a, t.offset.setOffset(n[0], t.extend({
            using: function(t) {
                n.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), n.addClass("in");
        var l = n[0].offsetWidth,
            c = n[0].offsetHeight;
        "top" == i && c != o && (e.top = e.top + o - c);
        var u = this.getViewportAdjustedDelta(i, e, l, c);
        u.left ? e.left += u.left : e.top += u.top;
        var h = /top|bottom/.test(i),
            d = h ? 2 * u.left - s + l : 2 * u.top - o + c,
            p = h ? "offsetWidth" : "offsetHeight";
        n.offset(e), this.replaceArrow(d, n[0][p], h)
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function(e) {
        function n() {
            "in" != s.hoverState && o.detach(), s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type), e && e()
        }
        var s = this,
            o = this.tip(),
            r = t.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function() {
        return this.getTitle()
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0],
            n = "BODY" == i.tagName,
            s = i.getBoundingClientRect();
        null == s.width && (s = t.extend({}, s, {
            width: s.right - s.left,
            height: s.bottom - s.top
        }));
        var o = n ? {
                top: 0,
                left: 0
            } : e.offset(),
            r = {
                scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            a = n ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, s, r, a, o)
    }, i.prototype.getCalculatedOffset = function(t, e, i, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - n / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, n) {
        var s = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return s;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - o - r.scroll,
                l = e.top + o - r.scroll + n;
            a < r.top ? s.top = r.top - a : l > r.top + r.height && (s.top = r.top + r.height - l)
        } else {
            var c = e.left - o,
                u = e.left + o + i;
            c < r.left ? s.left = r.left - c : u > r.width && (s.left = r.left + r.width - u)
        }
        return s
    }, i.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function() {
        this.enabled = !0
    }, i.prototype.disable = function() {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = n, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.popover"),
                o = "object" == typeof e && e;
            (s || "destroy" != e) && (s || n.data("bs.popover", s = new i(this, o)), "string" == typeof e && s[e]())
        })
    }
    var i = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.2", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, i.prototype.tip = function() {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var n = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function() {
        return t.fn.popover = n, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.tab");
            s || n.data("bs.tab", s = new i(this)), "string" == typeof e && s[e]()
        })
    }
    var i = function(e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            n = e.data("target");
        if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var s = i.find(".active:last a"),
                o = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                r = t.Event("show.bs.tab", {
                    relatedTarget: s[0]
                });
            if (s.trigger(o), e.trigger(r), !r.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var a = t(n);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function() {
                    s.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: s[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function(e, n, s) {
        function o() {
            r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), s && s()
        }
        var r = n.find("> .active"),
            a = s && t.support.transition && (r.length && r.hasClass("fade") || !!n.find("> .fade").length);
        r.length && a ? r.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), r.removeClass("in")
    };
    var n = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = n, this
    };
    var s = function(i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', s).on("click.bs.tab.data-api", '[data-toggle="pill"]', s)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.affix"),
                o = "object" == typeof e && e;
            s || n.data("bs.affix", s = new i(this, o)), "string" == typeof e && s[e]()
        })
    }
    var i = function(e, n) {
        this.options = t.extend({}, i.DEFAULTS, n), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.2", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function(t, e, i, n) {
        var s = this.$target.scrollTop(),
            o = this.$element.offset(),
            r = this.$target.height();
        if (null != i && "top" == this.affixed) return i > s ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? s + this.unpin <= o.top ? !1 : "bottom" : t - n >= s + r ? !1 : "bottom";
        var a = null == this.affixed,
            l = a ? s : o.top,
            c = a ? r : e;
        return null != i && i >= s ? "top" : null != n && l + c >= t - n ? "bottom" : !1
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                n = this.options.offset,
                s = n.top,
                o = n.bottom,
                r = t("body").height();
            "object" != typeof n && (o = s = n), "function" == typeof s && (s = n.top(this.$element)), "function" == typeof o && (o = n.bottom(this.$element));
            var a = this.getState(r, e, s, o);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""),
                    c = t.Event(l + ".bs.affix");
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({
                top: r - e - o
            })
        }
    };
    var n = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = n, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this),
                n = i.data();
            n.offset = n.offset || {}, null != n.offsetBottom && (n.offset.bottom = n.offsetBottom), null != n.offsetTop && (n.offset.top = n.offsetTop), e.call(i, n)
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var i, n = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(n)
    }

    function i(e) {
        return this.each(function() {
            var i = t(this),
                s = i.data("bs.collapse"),
                o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
            !s && o.toggle && "show" == e && (o.toggle = !1), s || i.data("bs.collapse", s = new n(this, o)), "string" == typeof e && s[e]()
        })
    }
    var n = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.$trigger = t(this.options.trigger).filter('[href="#' + e.id + '"], [data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    n.VERSION = "3.3.2", n.TRANSITION_DURATION = 350, n.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    }, n.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, n.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, s = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(s && s.length && (e = s.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    s && s.length && (i.call(s, "hide"), e || s.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return a.call(this);
                    var l = t.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(n.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }, n.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var s = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : s.call(this)
            }
        }
    }, n.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, n.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, n) {
            var s = t(n);
            this.addAriaAndCollapsedClass(e(s), s)
        }, this)).end()
    }, n.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var s = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = n, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = s, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(n) {
        var s = t(this);
        s.attr("data-target") || n.preventDefault();
        var o = e(s),
            r = o.data("bs.collapse"),
            a = r ? "toggle" : t.extend({}, s.data(), {
                trigger: this
            });
        i.call(o, a)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(i, n) {
        var s = t.proxy(this.process, this);
        this.$body = t("body"), this.$scrollElement = t(t(i).is("body") ? window : i), this.options = t.extend({}, e.DEFAULTS, n), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", s), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.scrollspy"),
                o = "object" == typeof i && i;
            s || n.data("bs.scrollspy", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }
    e.VERSION = "3.3.2", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = "offset",
            i = 0;
        t.isWindow(this.$scrollElement[0]) || (e = "position", i = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var n = this;
        this.$body.find(this.selector).map(function() {
            var n = t(this),
                s = n.data("target") || n.attr("href"),
                o = /^#./.test(s) && t(s);
            return o && o.length && o.is(":visible") && [
                [o[e]().top + i, s]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            n.offsets.push(this[0]), n.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            n = this.options.offset + i - this.$scrollElement.height(),
            s = this.offsets,
            o = this.targets,
            r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= n) return r != (t = o[o.length - 1]) && this.activate(t);
        if (r && e < s[0]) return this.activeTarget = null, this.clear();
        for (t = s.length; t--;) r != o[t] && e >= s[t] && (!s[t + 1] || e <= s[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            n = t(i).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var n = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = n, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in e)
            if (void 0 !== t.style[i]) return {
                end: e[i]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
            n = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0
        });
        var s = function() {
            i || t(n).trigger(t.support.transition.end)
        };
        return setTimeout(s, e), this
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), ! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    t.extend(t.fn, {
        validate: function(e) {
            if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = t.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.submit(function(e) {
                function n() {
                    var n, s;
                    return i.settings.submitHandler ? (i.submitButton && (n = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), s = i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && n.remove(), void 0 !== s ? s : !1) : !0
                }
                return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : n() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            var e, i;
            return t(this[0]).is("form") ? e = this.validate().form() : (e = !0, i = t(this[0].form).validate(), this.each(function() {
                e = i.element(this) && e
            })), e
        },
        removeAttrs: function(e) {
            var i = {},
                n = this;
            return t.each(e.split(/\s/), function(t, e) {
                i[e] = n.attr(e), n.removeAttr(e)
            }), i
        },
        rules: function(e, i) {
            var n, s, o, r, a, l, c = this[0];
            if (e) switch (n = t.data(c.form, "validator").settings, s = n.rules, o = t.validator.staticRules(c), e) {
                case "add":
                    t.extend(o, t.validator.normalizeRule(i)), delete o.messages, s[c.name] = o, i.messages && (n.messages[c.name] = t.extend(n.messages[c.name], i.messages));
                    break;
                case "remove":
                    return i ? (l = {}, t.each(i.split(/\s/), function(e, i) {
                        l[i] = o[i], delete o[i], "required" === i && t(c).removeAttr("aria-required")
                    }), l) : (delete s[c.name], o)
            }
            return r = t.validator.normalizeRules(t.extend({}, t.validator.classRules(c), t.validator.attributeRules(c), t.validator.dataRules(c), t.validator.staticRules(c)), c), r.required && (a = r.required, delete r.required, r = t.extend({
                required: a
            }, r), t(c).attr("aria-required", "true")), r.remote && (a = r.remote, delete r.remote, r = t.extend(r, {
                remote: a
            })), r
        }
    }), t.extend(t.expr[":"], {
        blank: function(e) {
            return !t.trim("" + t(e).val())
        },
        filled: function(e) {
            return !!t.trim("" + t(e).val())
        },
        unchecked: function(e) {
            return !t(e).prop("checked")
        }
    }), t.validator = function(e, i) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
    }, t.validator.format = function(e, i) {
        return 1 === arguments.length ? function() {
            var i = t.makeArray(arguments);
            return i.unshift(e), t.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function(t, i) {
            e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function() {
                return i
            })
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(t) {
                this.lastActive = t, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(t)))
            },
            onfocusout: function(t) {
                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            },
            onkeyup: function(t, e) {
                (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
            },
            onclick: function(t) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            },
            highlight: function(e, i, n) {
                "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(n) : t(e).addClass(i).removeClass(n)
            },
            unhighlight: function(e, i, n) {
                "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(n) : t(e).removeClass(i).addClass(n)
            }
        },
        setDefaults: function(e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: t.validator.format("Please enter no more than {0} characters."),
            minlength: t.validator.format("Please enter at least {0} characters."),
            rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            range: t.validator.format("Please enter a value between {0} and {1}."),
            max: t.validator.format("Please enter a value less than or equal to {0}."),
            min: t.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function e(e) {
                    var i = t.data(this[0].form, "validator"),
                        n = "on" + e.type.replace(/^validate/, ""),
                        s = i.settings;
                    s[n] && !this.is(s.ignore) && s[n].call(i, this[0], e)
                }
                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i, n = this.groups = {};
                t.each(this.settings.groups, function(e, i) {
                    "string" == typeof i && (i = i.split(/\s/)), t.each(i, function(t, i) {
                        n[i] = e
                    })
                }), i = this.settings.rules, t.each(i, function(e, n) {
                    i[e] = t.validator.normalizeRule(n)
                }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", e).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), t(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                return this.valid()
            },
            element: function(e) {
                var i = this.clean(e),
                    n = this.validationTargetFor(i),
                    s = !0;
                return this.lastElement = n, void 0 === n ? delete this.invalid[i.name] : (this.prepareElement(n), this.currentElements = t(n), s = this.check(n) !== !1, s ? delete this.invalid[n.name] : this.invalid[n.name] = !0), t(e).attr("aria-invalid", !s), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), s
            },
            showErrors: function(e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var i in e) this.errorList.push({
                        message: e[i],
                        element: this.findByName(i)[0]
                    });
                    this.successList = t.grep(this.successList, function(t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(t) {
                var e, i = 0;
                for (e in t) i++;
                return i
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(t) {
                t.not(this.containers).text(""), this.addWrapper(t).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {}
            },
            findLastActive: function() {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function(t) {
                    return t.element.name === e.name
                }).length && e
            },
            elements: function() {
                var e = this,
                    i = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            },
            clean: function(e) {
                return t(e)[0]
            },
            errors: function() {
                var e = this.settings.errorClass.split(" ").join(".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(t) {
                this.reset(), this.toHide = this.errorsFor(t)
            },
            elementValue: function(e) {
                var i, n = t(e),
                    s = e.type;
                return "radio" === s || "checkbox" === s ? t("input[name='" + e.name + "']:checked").val() : "number" === s && "undefined" != typeof e.validity ? e.validity.badInput ? !1 : n.val() : (i = n.val(), "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function(e) {
                e = this.validationTargetFor(this.clean(e));
                var i, n, s, o = t(e).rules(),
                    r = t.map(o, function(t, e) {
                        return e
                    }).length,
                    a = !1,
                    l = this.elementValue(e);
                for (n in o) {
                    s = {
                        method: n,
                        parameters: o[n]
                    };
                    try {
                        if (i = t.validator.methods[n].call(this, l, e, s.parameters), "dependency-mismatch" === i && 1 === r) {
                            a = !0;
                            continue
                        }
                        if (a = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                        if (!i) return this.formatAndAdd(e, s), !1
                    } catch (c) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + s.method + "' method.", c), c
                    }
                }
                return a ? void 0 : (this.objectLength(o) && this.successList.push(e), !0)
            },
            customDataMessage: function(e, i) {
                return t(e).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || t(e).data("msg")
            },
            customMessage: function(t, e) {
                var i = this.settings.messages[t];
                return i && (i.constructor === String ? i : i[e])
            },
            findDefined: function() {
                for (var t = 0; t < arguments.length; t++)
                    if (void 0 !== arguments[t]) return arguments[t];
                return void 0
            },
            defaultMessage: function(e, i) {
                return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
            },
            formatAndAdd: function(e, i) {
                var n = this.defaultMessage(e, i.method),
                    s = /\$?\{(\d+)\}/g;
                "function" == typeof n ? n = n.call(this, i.parameters, e) : s.test(n) && (n = t.validator.format(n.replace(s, "{$1}"), i.parameters)), this.errorList.push({
                    message: n,
                    element: e,
                    method: i.method
                }), this.errorMap[e.name] = n, this.submitted[e.name] = n
            },
            addWrapper: function(t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            },
            defaultShowErrors: function() {
                var t, e, i;
                for (t = 0; this.errorList[t]; t++) i = this.errorList[t], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                if (this.settings.unhighlight)
                    for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return t(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(e, i) {
                var n, s, o, r = this.errorsFor(e),
                    a = this.idOrName(e),
                    l = t(e).attr("aria-describedby");
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = t("<" + this.settings.errorElement + ">").attr("id", a + "-error").addClass(this.settings.errorClass).html(i || ""), n = r, this.settings.wrapper && (n = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement(n, t(e)) : n.insertAfter(e), r.is("label") ? r.attr("for", a) : 0 === r.parents("label[for='" + a + "']").length && (o = r.attr("id").replace(/(:|\.|\[|\])/g, "\\$1"), l ? l.match(new RegExp("\\b" + o + "\\b")) || (l += " " + o) : l = o, t(e).attr("aria-describedby", l), s = this.groups[e.name], s && t.each(this.groups, function(e, i) {
                    i === s && t("[name='" + e + "']", this.currentForm).attr("aria-describedby", r.attr("id"))
                }))), !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, e)), this.toShow = this.toShow.add(r)
            },
            errorsFor: function(e) {
                var i = this.idOrName(e),
                    n = t(e).attr("aria-describedby"),
                    s = "label[for='" + i + "'], label[for='" + i + "'] *";
                return n && (s = s + ", #" + n.replace(/\s+/g, ", #")), this.errors().filter(s)
            },
            idOrName: function(t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            },
            validationTargetFor: function(e) {
                return this.checkable(e) && (e = this.findByName(e.name)), t(e).not(this.settings.ignore)[0]
            },
            checkable: function(t) {
                return /radio|checkbox/i.test(t.type)
            },
            findByName: function(e) {
                return t(this.currentForm).find("[name='" + e + "']")
            },
            getLength: function(e, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return t("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return e.length
            },
            depend: function(t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            },
            dependTypes: {
                "boolean": function(t) {
                    return t
                },
                string: function(e, i) {
                    return !!t(e, i.form).length
                },
                "function": function(t, e) {
                    return t(e)
                }
            },
            optional: function(e) {
                var i = this.elementValue(e);
                return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
            },
            startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            },
            stopRequest: function(e, i) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(e, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(e, i) {
            e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
        },
        classRules: function(e) {
            var i = {},
                n = t(e).attr("class");
            return n && t.each(n.split(" "), function() {
                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
            }), i
        },
        attributeRules: function(e) {
            var i, n, s = {},
                o = t(e),
                r = e.getAttribute("type");
            for (i in t.validator.methods) "required" === i ? (n = e.getAttribute(i), "" === n && (n = !0), n = !!n) : n = o.attr(i), /min|max/.test(i) && (null === r || /number|range|text/.test(r)) && (n = Number(n)), n || 0 === n ? s[i] = n : r === i && "range" !== r && (s[i] = !0);
            return s.maxlength && /-1|2147483647|524288/.test(s.maxlength) && delete s.maxlength, s
        },
        dataRules: function(e) {
            var i, n, s = {},
                o = t(e);
            for (i in t.validator.methods) n = o.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), void 0 !== n && (s[i] = n);
            return s
        },
        staticRules: function(e) {
            var i = {},
                n = t.data(e.form, "validator");
            return n.settings.rules && (i = t.validator.normalizeRule(n.settings.rules[e.name]) || {}), i
        },
        normalizeRules: function(e, i) {
            return t.each(e, function(n, s) {
                if (s === !1) return void delete e[n];
                if (s.param || s.depends) {
                    var o = !0;
                    switch (typeof s.depends) {
                        case "string":
                            o = !!t(s.depends, i.form).length;
                            break;
                        case "function":
                            o = s.depends.call(i, i)
                    }
                    o ? e[n] = void 0 !== s.param ? s.param : !0 : delete e[n]
                }
            }), t.each(e, function(n, s) {
                e[n] = t.isFunction(s) ? s(i) : s
            }), t.each(["minlength", "maxlength"], function() {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function() {
                var i;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].replace(/[\[\]]/g, "").split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
            }), t.validator.autoCreateRanges && (null != e.min && null != e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), null != e.minlength && null != e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        },
        normalizeRule: function(e) {
            if ("string" == typeof e) {
                var i = {};
                t.each(e.split(/\s/), function() {
                    i[this] = !0
                }), e = i
            }
            return e
        },
        addMethod: function(e, i, n) {
            t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== n ? n : t.validator.messages[e], i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function(e, i, n) {
                if (!this.depend(n, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var s = t(i).val();
                    return s && s.length > 0
                }
                return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
            },
            email: function(t, e) {
                return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)
            },
            url: function(t, e) {
                return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
            },
            date: function(t, e) {
                return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
            },
            dateISO: function(t, e) {
                return this.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)
            },
            number: function(t, e) {
                return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            },
            digits: function(t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            },
            creditcard: function(t, e) {
                if (this.optional(e)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(t)) return !1;
                var i, n, s = 0,
                    o = 0,
                    r = !1;
                if (t = t.replace(/\D/g, ""), t.length < 13 || t.length > 19) return !1;
                for (i = t.length - 1; i >= 0; i--) n = t.charAt(i), o = parseInt(n, 10), r && (o *= 2) > 9 && (o -= 9), s += o, r = !r;
                return s % 10 === 0
            },
            minlength: function(e, i, n) {
                var s = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || s >= n
            },
            maxlength: function(e, i, n) {
                var s = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || n >= s
            },
            rangelength: function(e, i, n) {
                var s = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || s >= n[0] && s <= n[1]
            },
            min: function(t, e, i) {
                return this.optional(e) || t >= i
            },
            max: function(t, e, i) {
                return this.optional(e) || i >= t
            },
            range: function(t, e, i) {
                return this.optional(e) || t >= i[0] && t <= i[1]
            },
            equalTo: function(e, i, n) {
                var s = t(n);
                return this.settings.onfocusout && s.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    t(i).valid()
                }), e === s.val()
            },
            remote: function(e, i, n) {
                if (this.optional(i)) return "dependency-mismatch";
                var s, o, r = this.previousValue(i);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), r.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = r.message, n = "string" == typeof n && {
                    url: n
                } || n, r.old === e ? r.valid : (r.old = e, s = this, this.startRequest(i), o = {}, o[i.name] = e, t.ajax(t.extend(!0, {
                    url: n,
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: o,
                    context: s.currentForm,
                    success: function(n) {
                        var o, a, l, c = n === !0 || "true" === n;
                        s.settings.messages[i.name].remote = r.originalMessage, c ? (l = s.formSubmitted, s.prepareElement(i), s.formSubmitted = l, s.successList.push(i), delete s.invalid[i.name], s.showErrors()) : (o = {}, a = n || s.defaultMessage(i, "remote"), o[i.name] = r.message = t.isFunction(a) ? a(e) : a, s.invalid[i.name] = !0, s.showErrors(o)), r.valid = c, s.stopRequest(i, c)
                    }
                }, n)), "pending")
            }
        }
    }), t.format = function() {
        throw "$.format has been deprecated. Please use $.validator.format instead."
    };
    var e, i = {};
    t.ajaxPrefilter ? t.ajaxPrefilter(function(t, e, n) {
        var s = t.port;
        "abort" === t.mode && (i[s] && i[s].abort(), i[s] = n)
    }) : (e = t.ajax, t.ajax = function(n) {
        var s = ("mode" in n ? n : t.ajaxSettings).mode,
            o = ("port" in n ? n : t.ajaxSettings).port;
        return "abort" === s ? (i[o] && i[o].abort(), i[o] = e.apply(this, arguments), i[o]) : e.apply(this, arguments)
    }), t.extend(t.fn, {
        validateDelegate: function(e, i, n) {
            return this.bind(i, function(i) {
                var s = t(i.target);
                return s.is(e) ? n.apply(s, arguments) : void 0
            })
        }
    })
});