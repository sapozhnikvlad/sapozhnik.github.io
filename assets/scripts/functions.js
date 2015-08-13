var $ = jQuery.noConflict();
$.fn.inlineStyle = function(e) {
    return this.prop("style")[$.camelCase(e)]
}, $.fn.doOnce = function(e) {
    return this.length && e.apply(this), this
},
function() {
    for (var e = 0, t = ["ms", "moz", "webkit", "o"], a = 0; a < t.length && !window.requestAnimationFrame; ++a) window.requestAnimationFrame = window[t[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[a] + "CancelAnimationFrame"] || window[t[a] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
        var a = (new Date).getTime(),
            i = Math.max(0, 16 - (a - e)),
            s = window.setTimeout(function() {
                t(a + i)
            }, i);
        return e = a + i, s
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
        clearTimeout(e)
    })
}();
var SEMICOLON = SEMICOLON || {};
! function(e) {
    "use strict";
    SEMICOLON.initialize = {
        init: function() {
            SEMICOLON.initialize.responsiveClasses(),
            SEMICOLON.initialize.imagePreload(".portfolio-item:not(:has(.fslider)) img"),
            SEMICOLON.initialize.stickyElements(),
            SEMICOLON.initialize.goToTop(),
            SEMICOLON.initialize.verticalMiddle(),
            SEMICOLON.initialize.lightbox(),
            SEMICOLON.initialize.imageFade(),
            SEMICOLON.initialize.dataStyles(),
            SEMICOLON.initialize.dataResponsiveHeights()
        },
        responsiveClasses: function() {
            var e = jRespond([{
                label: "smallest",
                enter: 0,
                exit: 479
            }, {
                label: "handheld",
                enter: 480,
                exit: 767
            }, {
                label: "tablet",
                enter: 768,
                exit: 991
            }, {
                label: "laptop",
                enter: 992,
                exit: 1199
            }, {
                label: "desktop",
                enter: 1200,
                exit: 1e4
            }]);
            e.addFunc([{
                breakpoint: "desktop",
                enter: function() {
                    a.addClass("device-lg")
                },
                exit: function() {
                    a.removeClass("device-lg")
                }
            }, {
                breakpoint: "laptop",
                enter: function() {
                    a.addClass("device-md")
                },
                exit: function() {
                    a.removeClass("device-md")
                }
            }, {
                breakpoint: "tablet",
                enter: function() {
                    a.addClass("device-sm")
                },
                exit: function() {
                    a.removeClass("device-sm")
                }
            }, {
                breakpoint: "handheld",
                enter: function() {
                    a.addClass("device-xs")
                },
                exit: function() {
                    a.removeClass("device-xs")
                }
            }, {
                breakpoint: "smallest",
                enter: function() {
                    a.addClass("device-xxs")
                },
                exit: function() {
                    a.removeClass("device-xxs")
                }
            }])
        },
        imagePreload: function(t, a) {
            var i = {
                delay: 250,
                transition: 400,
                easing: "linear"
            };
            e.extend(i, a), e(t).each(function() {
                var t = e(this);
                t.css({
                    visibility: "hidden",
                    opacity: 0,
                    display: "block"
                }), t.wrap('<span class="preloader" />'), t.one("load", function() {
                    e(this).delay(i.delay).css({
                        visibility: "visible"
                    }).animate({
                        opacity: 1
                    }, i.transition, i.easing, function() {
                        e(this).unwrap('<span class="preloader" />')
                    })
                }).each(function() {
                    this.complete && e(this).trigger("load")
                })
            })
        },
        verticalMiddle: function() {
            k.length > 0 && k.each(function() {
                var t = e(this),
                    i = t.outerHeight(),
                    n = s.outerHeight();
                t.parents("#slider").length > 0 && !t.hasClass("ignore-header") && s.hasClass("transparent-header") && (a.hasClass("device-lg") || a.hasClass("device-md")) && (i -= 70, S.next("#header").length > 0 && (i += n)), (a.hasClass("device-xs") || a.hasClass("device-xxs")) && t.parents(".full-screen").length && !t.parents(".force-full-screen").length ? t.css({
                    position: "relative",
                    top: "0",
                    width: "auto",
                    marginTop: "0",
                    padding: "60px 0"
                }).addClass("clearfix") : t.css({
                    position: "absolute",
                    top: "50%",
                    width: "100%",
                    marginTop: -(i / 2) + "px"
                })
            })
        },
        stickyElements: function() {
            if (T.length > 0) {
                var e = T.outerHeight();
                T.css({
                    marginTop: -(e / 2) + "px"
                })
            }
            if (P.length > 0) {
                var t = P.outerHeight();
                P.css({
                    marginTop: -(t / 2) + "px"
                })
            }
        },
        goToTop: function() {
            F.click(function() {
                return e("body,html").stop(!0).animate({
                    scrollTop: 0
                }, 400), !1
            })
        },
        goToTopScroll: function() {
            (a.hasClass("device-lg") || a.hasClass("device-md") || a.hasClass("device-sm")) && (t.scrollTop() > 450 ? F.fadeIn() : F.fadeOut())
        },
        maxHeight: function() {
            H.length > 0 && H.each(function() {
                var t = e(this);
                t.has(".common-height") && SEMICOLON.initialize.commonHeight(t.find(".common-height")), SEMICOLON.initialize.commonHeight(t)
            })
        },
        commonHeight: function(t) {
            var a = 0;
            t.children("[class^=col-]").each(function() {
                var t = e(this).children("div");
                t.hasClass("max-height") ? a = t.outerHeight() : t.outerHeight() > a && (a = t.outerHeight())
            }), t.children("[class^=col-]").each(function() {
                e(this).height(a)
            })
        },
        lightbox: function() {
            var t = e('[data-lightbox="image"]'),
                i = e('[data-lightbox="gallery"]'),
                s = e('[data-lightbox="iframe"]'),
                n = e('[data-lightbox="ajax"]'),
                o = e('[data-lightbox="ajax-gallery"]');
            t.length > 0 && t.magnificPopup({
                type: "image",
                closeOnContentClick: !0,
                closeBtnInside: !1,
                fixedContentPos: !0,
                mainClass: "mfp-no-margins mfp-fade",
                image: {
                    verticalFit: !0
                }
            }), i.length > 0 && i.each(function() {
                var t = e(this);
                t.find('a[data-lightbox="gallery-item"]').parent(".clone").hasClass("clone") && t.find('a[data-lightbox="gallery-item"]').parent(".clone").find('a[data-lightbox="gallery-item"]').attr("data-lightbox", ""), t.magnificPopup({
                    delegate: 'a[data-lightbox="gallery-item"]',
                    type: "image",
                    closeOnContentClick: !0,
                    closeBtnInside: !1,
                    fixedContentPos: !0,
                    mainClass: "mfp-no-margins mfp-fade",
                    image: {
                        verticalFit: !0
                    },
                    gallery: {
                        enabled: !0,
                        navigateByImgClick: !0,
                        preload: [0, 1]
                    }
                })
            }), s.length > 0 && s.magnificPopup({
                disableOn: 600,
                type: "iframe",
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !1
            }), n.length > 0 && n.magnificPopup({
                type: "ajax",
                closeBtnInside: !1,
                callbacks: {
                    ajaxContentAdded: function() {
                        SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs()
                    },
                    open: function() {
                        a.addClass("ohidden")
                    },
                    close: function() {
                        a.removeClass("ohidden")
                    }
                }
            }), o.length > 0 && o.magnificPopup({
                delegate: 'a[data-lightbox="ajax-gallery-item"]',
                type: "ajax",
                closeBtnInside: !1,
                gallery: {
                    enabled: !0,
                    preload: 0,
                    navigateByImgClick: !1
                },
                callbacks: {
                    ajaxContentAdded: function() {
                        SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs()
                    },
                    open: function() {
                        a.addClass("ohidden")
                    },
                    close: function() {
                        a.removeClass("ohidden")
                    }
                }
            })
        },
        imageFade: function() {
            e(".image_fade").hover(function() {
                e(this).filter(":not(:animated)").animate({
                    opacity: .8
                }, 400)
            }, function() {
                e(this).animate({
                    opacity: 1
                }, 400)
            })
        },
        blogTimelineEntries: function() {
            e(".post-timeline.grid-2").find(".entry").each(function() {
                var t = e(this).inlineStyle("left");
                "0px" == t ? e(this).removeClass("alt") : e(this).addClass("alt"), e(this).find(".entry-timeline").fadeIn()
            })
        },
        pageTransition: function() {
            if (!a.hasClass("no-transition")) {
                var e = a.attr("data-animation-in"),
                    t = a.attr("data-animation-out"),
                    s = a.attr("data-speed-in"),
                    n = a.attr("data-speed-out"),
                    o = a.attr("data-loader"),
                    r = '<div class="css3-spinner-bounce1"></div><div class="css3-spinner-bounce2"></div><div class="css3-spinner-bounce3"></div>';
                e || (e = "fadeIn"), t || (t = "fadeOut"), s || (s = 1500), n || (n = 800), "2" == o ? r = '<div class="css3-spinner-flipper"></div>' : "3" == o ? r = '<div class="css3-spinner-double-bounce1"></div><div class="css3-spinner-double-bounce2"></div>' : "4" == o ? r = '<div class="css3-spinner-rect1"></div><div class="css3-spinner-rect2"></div><div class="css3-spinner-rect3"></div><div class="css3-spinner-rect4"></div><div class="css3-spinner-rect5"></div>' : "5" == o ? r = '<div class="css3-spinner-cube1"></div><div class="css3-spinner-cube2"></div>' : "6" == o && (r = '<div class="css3-spinner-scaler"></div>'), i.animsition({
                    inClass: e,
                    outClass: t,
                    inDuration: Number(s),
                    outDuration: Number(n),
                    linkElement: '#primary-menu ul li a:not([target="_blank"]):not([href^=#])',
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "css3-spinner",
                    loadingHtml: r,
                    unSupportCss: ["animation-duration", "-webkit-animation-duration", "-o-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body"
                })
            }
        },
        topScrollOffset: function() {
            var e = 0;
            return !a.hasClass("device-lg") && !a.hasClass("device-md") || SEMICOLON.isMobile.any() ? e = 40 : (e = s.hasClass("sticky-header") ? m.hasClass("dots-menu") ? 100 : 144 : m.hasClass("dots-menu") ? 140 : 184, m.length || (e = s.hasClass("sticky-header") ? 100 : 140)), e
        },
        defineColumns: function(e) {
            var t = 4;
            if (e.hasClass("portfolio-full")) t = e.hasClass("portfolio-3") ? 3 : e.hasClass("portfolio-5") ? 5 : e.hasClass("portfolio-6") ? 6 : 4, !a.hasClass("device-sm") || 4 != t && 5 != t && 6 != t ? !a.hasClass("device-xs") || 3 != t && 4 != t && 5 != t && 6 != t ? a.hasClass("device-xxs") && (t = 1) : t = 2 : t = 3;
            else if (e.hasClass("masonry-thumbs")) {
                var i = e.attr("data-lg-col"),
                    s = e.attr("data-md-col"),
                    n = e.attr("data-sm-col"),
                    o = e.attr("data-xs-col"),
                    r = e.attr("data-xxs-col");
                t = e.hasClass("col-2") ? 2 : e.hasClass("col-3") ? 3 : e.hasClass("col-5") ? 5 : e.hasClass("col-6") ? 6 : 4, a.hasClass("device-lg") ? i && (t = Number(i)) : a.hasClass("device-md") ? s && (t = Number(s)) : a.hasClass("device-sm") ? n && (t = Number(n)) : a.hasClass("device-xs") ? o && (t = Number(o)) : a.hasClass("device-xxs") && r && (t = Number(r))
            }
            return t
        },
        setFullColumnWidth: function(i) {
            if (i.hasClass("portfolio-full")) {
                var s = SEMICOLON.initialize.defineColumns(i),
                    n = i.width();
                n == Math.floor(n / s) * s && (n -= 1);
                var o = Math.floor(n / s);
                if (a.hasClass("device-xxs")) var r = 1;
                else var r = 0;
                i.find(".portfolio-item").each(function() {
                    if (0 == r && e(this).hasClass("wide")) var t = 2 * o;
                    else var t = o;
                    e(this).css({
                        width: t + "px"
                    })
                })
            } else if (i.hasClass("masonry-thumbs")) {
                var s = SEMICOLON.initialize.defineColumns(i),
                    n = i.innerWidth(),
                    l = t.width();
                n == l && (n = 1.004 * l, i.css({
                    width: n + "px"
                }));
                var o = n / s;
                o = Math.floor(o), o * s >= n && i.css({
                    "margin-right": "-1px"
                }), i.children("a").css({
                    width: o + "px"
                });
                var d = i.find("a:eq(0)").outerWidth();
                i.isotope({
                    masonry: {
                        columnWidth: d
                    }
                });
                var c = i.attr("data-big");
                if (c) {
                    c = c.split(",");
                    var h = "",
                        u = "";
                    for (u = 0; u < c.length; u++) h = Number(c[u]) - 1, i.find("a:eq(" + h + ")").css({
                        width: 2 * d + "px"
                    }); {
                        setTimeout(function() {
                            i.isotope("layout")
                        }, 1e3)
                    }
                }
            }
        },
        aspectResizer: function() {
            var t = e(".aspect-resizer");
            t.length > 0 && t.each(function() {
                {
                    var t = e(this);
                    t.inlineStyle("width"), t.inlineStyle("height"), t.parent().innerWidth()
                }
            })
        },
        dataStyles: function() {
            var t = e("[data-style-xxs]"),
                i = e("[data-style-xs]"),
                s = e("[data-style-sm]"),
                n = e("[data-style-md]"),
                o = e("[data-style-lg]");
            t.length > 0 && t.each(function() {
                var t = e(this),
                    i = t.attr("data-style-xxs");
                a.hasClass("device-xxs") && "" != i && t.attr("style", i)
            }), i.length > 0 && i.each(function() {
                var t = e(this),
                    i = t.attr("data-style-xs");
                a.hasClass("device-xs") && "" != i && t.attr("style", i)
            }), s.length > 0 && s.each(function() {
                var t = e(this),
                    i = t.attr("data-style-sm");
                a.hasClass("device-sm") && "" != i && t.attr("style", i)
            }), n.length > 0 && n.each(function() {
                var t = e(this),
                    i = t.attr("data-style-md");
                a.hasClass("device-md") && "" != i && t.attr("style", i)
            }), o.length > 0 && o.each(function() {
                var t = e(this),
                    i = t.attr("data-style-lg");
                a.hasClass("device-lg") && "" != i && t.attr("style", i)
            })
        },
        dataResponsiveHeights: function() {
            var t = e("[data-height-xxs]"),
                i = e("[data-height-xs]"),
                s = e("[data-height-sm]"),
                n = e("[data-height-md]"),
                o = e("[data-height-lg]");
            t.length > 0 && t.each(function() {
                var t = e(this),
                    i = t.attr("data-height-xxs");
                a.hasClass("device-xxs") && "" != i && t.css("height", i)
            }), i.length > 0 && i.each(function() {
                var t = e(this),
                    i = t.attr("data-height-xs");
                a.hasClass("device-xs") && "" != i && t.css("height", i)
            }), s.length > 0 && s.each(function() {
                var t = e(this),
                    i = t.attr("data-height-sm");
                a.hasClass("device-sm") && "" != i && t.css("height", i)
            }), n.length > 0 && n.each(function() {
                var t = e(this),
                    i = t.attr("data-height-md");
                a.hasClass("device-md") && "" != i && t.css("height", i)
            }), o.length > 0 && o.each(function() {
                var t = e(this),
                    i = t.attr("data-height-lg");
                a.hasClass("device-lg") && "" != i && t.css("height", i)
            })
        },
        stickFooterOnSmall: function() {
            var e = t.height(),
                a = i.height();
            o.length > 0 && i.has("#footer") && e > a && o.css({
                "margin-top": e - a
            })
        }
    }, SEMICOLON.header = {
        init: function() {
            SEMICOLON.header.superfish(),
            SEMICOLON.header.menufunctions(),
            SEMICOLON.header.fullWidthMenu(),
            SEMICOLON.header.overlayMenu(),
            SEMICOLON.header.stickyMenu(),
            SEMICOLON.header.sideHeader(),
            SEMICOLON.header.onePageScroll(),
            SEMICOLON.header.onepageScroller()
        },
        superfish: function() {
            e().superfish && ((a.hasClass("device-lg") || a.hasClass("device-md")) && (e("#primary-menu ul ul, #primary-menu ul .mega-menu-content").css("display", "block"), SEMICOLON.header.menuInvert()), e("body:not(.side-header) #primary-menu > ul, body:not(.side-header) #primary-menu > div > ul,.top-links > ul").superfish({
                popUpSelector: "ul,.mega-menu-content,.top-link-section",
                delay: 250,
                speed: 350,
                animation: {
                    opacity: "show"
                },
                animationOut: {
                    opacity: "hide"
                },
                cssArrows: !1
            }), e("body.side-header #primary-menu > ul").superfish({
                popUpSelector: "ul",
                delay: 250,
                speed: 350,
                animation: {
                    opacity: "show",
                    height: "show"
                },
                animationOut: {
                    opacity: "hide",
                    height: "hide"
                },
                cssArrows: !1
            }))
        },
        menuInvert: function() {
            e("#primary-menu .mega-menu-content, #primary-menu ul ul").each(function(a, i) {
                var s = e(i),
                    n = t.width(),
                    o = s.offset(),
                    r = s.width(),
                    l = o.left;
                0 > n - (r + l) && s.addClass("menu-pos-invert")
            })
        },
        menufunctions: function() {
            e("#primary-menu ul li:has(ul)").addClass("sub-menu"), e(".top-links ul li:has(ul) > a").append(' <i class="icon-angle-down"></i>'), e(".top-links > ul").addClass("clearfix"), (a.hasClass("device-lg") || a.hasClass("device-md")) && (e("#primary-menu.sub-title > ul > li,#primary-menu.sub-title > div > ul > li").hover(function() {
                e(this).prev().css({
                    backgroundImage: "none"
                })
            }, function() {
                e(this).prev().css({
                    backgroundImage: 'url("http://canvashtml-cdn.semicolonweb.com/images/icons/menu-divider.png")'
                })
            }), e("#primary-menu.sub-title").children("ul").children(".current").prev().css({
                backgroundImage: "none"
            }), e("#primary-menu.sub-title").children("div").children("ul").children(".current").prev().css({
                backgroundImage: "none"
            })), SEMICOLON.isMobile.Android() && e("#primary-menu ul li.sub-menu").children("a").on("touchstart", function(t) {
                e(this).parent("li.sub-menu").hasClass("sfHover") || t.preventDefault()
            }), SEMICOLON.isMobile.Windows() && (e("#primary-menu > ul, #primary-menu > div > ul,.top-links > ul").superfish("destroy").addClass("windows-mobile-menu"), e("#primary-menu ul li:has(ul)").append('<a href="#" class="wn-submenu-trigger"><i class="icon-angle-down"></i></a>'), e("#primary-menu ul li.sub-menu").children("a.wn-submenu-trigger").click(function() {
                return e(this).parent().toggleClass("open"), e(this).parent().find("> ul, > .mega-menu-content").stop(!0, !0).toggle(), !1
            }))
        },
        fullWidthMenu: function() {
            a.hasClass("stretched") ? (s.find(".container-fullwidth").length > 0 && e(".mega-menu .mega-menu-content").css({
                width: i.width() - 120
            }), s.hasClass("full-header") && e(".mega-menu .mega-menu-content").css({
                width: i.width() - 60
            })) : (s.find(".container-fullwidth").length > 0 && e(".mega-menu .mega-menu-content").css({
                width: i.width() - 120
            }), s.hasClass("full-header") && e(".mega-menu .mega-menu-content").css({
                width: i.width() - 80
            }))
        },
        overlayMenu: function() {
            if (a.hasClass("overlay-menu")) {
                var i = e("#primary-menu").children("ul").children("li"),
                    s = i.outerHeight(),
                    n = i.length * s,
                    o = (t.height() - n) / 2;
                e("#primary-menu").children("ul").children("li:first-child").css({
                    "margin-top": o + "px"
                })
            }
        },
        stickyMenu: function(i) {
            t.scrollTop() > i ? a.hasClass("device-lg") || a.hasClass("device-md") ? (e("body:not(.side-header) #header:not(.no-sticky)").addClass("sticky-header"), e("#page-menu:not(.dots-menu,.no-sticky)").addClass("sticky-page-menu"), n.hasClass("force-not-dark") || n.removeClass("not-dark"), SEMICOLON.header.stickyMenuClass()) : a.hasClass("device-xs") || a.hasClass("device-xxs") || a.hasClass("device-sm") ? a.hasClass("sticky-responsive-menu") && (e("#header:not(.no-sticky)").addClass("responsive-sticky-header"), SEMICOLON.header.stickyMenuClass()) : SEMICOLON.header.removeStickyness() : SEMICOLON.header.removeStickyness()
        },
        removeStickyness: function() {
            s.hasClass("sticky-header") && (e("body:not(.side-header) #header:not(.no-sticky)").removeClass("sticky-header"), e("#page-menu:not(.dots-menu,.no-sticky)").removeClass("sticky-page-menu"), s.removeClass().addClass(r), n.removeClass().addClass(l), n.hasClass("force-not-dark") || n.removeClass("not-dark")), s.hasClass("responsive-sticky-header") && e("body.sticky-responsive-menu #header").removeClass("responsive-sticky-header"), (a.hasClass("device-xs") || a.hasClass("device-xxs") || a.hasClass("device-sm")) && (s.removeClass().addClass(r), n.removeClass().addClass(l), n.hasClass("force-not-dark") || n.removeClass("not-dark"))
        },
        sideHeader: function() {
            e("#header-trigger").click(function() {
                return e("body.open-header").toggleClass("side-header-open"), !1
            })
        },
        onePageScroll: function() {
            if (C.length > 0) {
                var t = C.attr("data-speed"),
                    a = C.attr("data-offset"),
                    i = C.attr("data-easing");
                t || (t = 1e3), i || (i = "easeOutQuad"), C.find("a[data-href]").click(function() {
                    var s = e(this),
                        n = s.attr("data-href"),
                        o = s.attr("data-speed"),
                        r = s.attr("data-offset"),
                        l = s.attr("data-easing");
                    if (e(n).length > 0) {
                        if (a) var d = a;
                        else var d = SEMICOLON.initialize.topScrollOffset();
                        o || (o = t), r || (r = d), l || (l = i), C.hasClass("no-offset") && (r = 0), v = Number(r), C.find("li").removeClass("current"), C.find('a[data-href="' + n + '"]').parent("li").addClass("current"), e("#primary-menu > ul, #primary-menu > .container > ul").toggleClass("show", function() {
                            e("html,body").stop(!0).animate({
                                scrollTop: e(n).offset().top - Number(r)
                            }, Number(o), l)
                        }, !1), v = Number(r)
                    }
                    return !1
                })
            }
        },
        onepageScroller: function() {
            C.find("li").removeClass("current"), C.find('a[data-href="#' + SEMICOLON.header.onePageCurrentSection() + '"]').parent("li").addClass("current")
        },
        onePageCurrentSection: function() {
            var a = "home";
            return _.each(function() {
                var i = e(this).offset().top,
                    s = t.scrollTop(),
                    n = 100 + v;
                s + n >= i && s < i + e(this).height() && e(this).attr("id") != a && (a = e(this).attr("id"))
            }), a
        },
        stickyMenuClass: function() {
            if (d) var e = d.split(/ +/);
            else var e = "";
            var t = e.length;
            if (t > 0) {
                var a = 0;
                for (a = 0; t > a; a++) "not-dark" == e[a] ? (s.removeClass("dark"), n.addClass("not-dark")) : "dark" == e[a] ? (n.removeClass("not-dark force-not-dark"), s.hasClass(e[a]) || s.addClass(e[a])) : s.hasClass(e[a]) || s.addClass(e[a])
            }
        }
    }, SEMICOLON.widget = {
        init: function() {
            SEMICOLON.widget.animations(),
            SEMICOLON.widget.toggles(),
            SEMICOLON.widget.accordions(),
            SEMICOLON.widget.navTree(),
            SEMICOLON.widget.linkScroll(),
            SEMICOLON.widget.extras()
        },
        parallax: function() {
            SEMICOLON.isMobile.any() ? (D.addClass("mobile-parallax"), B.addClass("mobile-parallax")) : e.stellar({
                horizontalScrolling: !1,
                verticalOffset: 150,
                responsive: !0
            })
        },
        animations: function() {
            var t = e("[data-animate]");
            t.length > 0 && (a.hasClass("device-lg") || a.hasClass("device-md") || a.hasClass("device-sm")) && t.each(function() {
                var t = e(this),
                    a = t.attr("data-delay"),
                    i = 0;
                if (i = a ? Number(a) + 500 : 500, !t.hasClass("animated")) {
                    t.addClass("not-animated");
                    var s = t.attr("data-animate");
                    t.appear(function() {
                        setTimeout(function() {
                            t.removeClass("not-animated").addClass(s + " animated")
                        }, i)
                    }, {
                        accX: 0,
                        accY: -120
                    }, "easeInCubic")
                }
            })
        },
        toggles: function() {
            var t = e(".toggle");
            t.length > 0 && t.each(function() {
                var t = e(this),
                    a = t.attr("data-state");
                "open" != a ? t.find(".togglec").hide() : t.find(".togglet").addClass("toggleta"), t.find(".togglet").click(function() {
                    return e(this).toggleClass("toggleta").next(".togglec").slideToggle(300), !0
                })
            })
        },
        accordions: function() {
            var t = e(".accordion");
            t.length > 0 && t.each(function() {
                var t = e(this),
                    a = t.attr("data-state"),
                    i = t.attr("data-active");
                i ? i -= 1 : i = 0, t.find(".acc_content").hide(), "closed" != a && t.find(".acctitle:eq(" + Number(i) + ")").addClass("acctitlec").next().show(), t.find(".acctitle").click(function() {
                    return e(this).next().is(":hidden") && (t.find(".acctitle").removeClass("acctitlec").next().slideUp("normal"), e(this).toggleClass("acctitlec").next().slideDown("normal")), !1
                })
            })
        },
        navTree: function() {
            var t = e(".nav-tree");
            t.length > 0 && t.each(function() {
                var t = e(this),
                    a = t.attr("data-speed"),
                    i = t.attr("data-easing");
                a || (a = 250), i || (i = "swing"), t.find("ul li:has(ul)").addClass("sub-menu"), t.find("ul li:has(ul) > a").append(' <i class="icon-angle-down"></i>'), t.find("ul li:has(ul) > a").click(function(s) {
                    var n = e(this);
                    t.find("ul li").not(n.parents()).removeClass("active"), n.parent().children("ul").slideToggle(Number(a), i, function() {
                        e(this).find("ul").hide(), e(this).find("li.active").removeClass("active")
                    }), t.find("ul li > ul").not(n.parent().children("ul")).not(n.parents("ul")).slideUp(Number(a), i), n.parent("li:has(ul)").toggleClass("active"), s.preventDefault()
                })
            })
        },
        linkScroll: function() {
            e("a[data-scrollto]").click(function() {
                var t = e(this),
                    a = t.attr("data-scrollto"),
                    i = t.attr("data-speed"),
                    s = t.attr("data-offset"),
                    n = t.attr("data-easing");
                return i || (i = 750), s || (s = SEMICOLON.initialize.topScrollOffset()), n || (n = "easeOutQuad"), e("html,body").stop(!0).animate({
                    scrollTop: e(a).offset().top - Number(s)
                }, Number(i), n), !1
            })
        },
        extras: function() {
            e('[data-toggle="tooltip"]').tooltip({
                container: "body"
            }), e("#primary-menu-trigger,#overlay-menu-close").click(function() {
                return e("#primary-menu > ul, #primary-menu > div > ul").toggleClass("show"), !1
            }), e("#page-submenu-trigger").click(function() {
                return a.toggleClass("top-search-open", !1), m.toggleClass("pagemenu-active"), !1
            }), m.find("nav").click(function() {
                a.toggleClass("top-search-open", !1), L.toggleClass("top-cart-open", !1)
            }), SEMICOLON.isMobile.any() && a.addClass("device-touch")
        }
    }, SEMICOLON.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function() {
            return SEMICOLON.isMobile.Android() || SEMICOLON.isMobile.BlackBerry() || SEMICOLON.isMobile.iOS() || SEMICOLON.isMobile.Opera() || SEMICOLON.isMobile.Windows()
        }
    }, SEMICOLON.documentOnResize = {
        init: function() {
            setTimeout(function() {
                SEMICOLON.header.fullWidthMenu(),
                SEMICOLON.header.overlayMenu(),
                SEMICOLON.initialize.verticalMiddle(), 
                SEMICOLON.initialize.maxHeight(),
                SEMICOLON.initialize.dataStyles(),
                SEMICOLON.initialize.dataResponsiveHeights()
            }, 500)
        }
    }, SEMICOLON.documentOnReady = {
        init: function() {
            SEMICOLON.initialize.init(),
            SEMICOLON.header.init(),
            SEMICOLON.widget.init(),
            SEMICOLON.documentOnReady.windowscroll()
        },
        windowscroll: function() {
            var a = (s.offset().top, n.offset().top),
                i = s.attr("data-sticky-offset");
            if ("undefined" != typeof i)
                if ("full" == i) {
                    a = t.height();
                    var o = s.attr("data-sticky-offset-negative");
                    "undefined" != typeof o && (a = a - o - 1)
                } else a = Number(i);
            t.on("scroll", function() {
                SEMICOLON.initialize.goToTopScroll(),
                e("body.open-header.close-header-on-scroll").removeClass("side-header-open"),
                SEMICOLON.header.stickyMenu(a)
            }),window.addEventListener("scroll", function() {}, !1), C.length > 0 && t.scrolled(function() {
                SEMICOLON.header.onepageScroller()
            })
        }
    }, SEMICOLON.documentOnLoad = {
        init: function() {
            SEMICOLON.initialize.maxHeight(),
            SEMICOLON.initialize.verticalMiddle(),
            SEMICOLON.initialize.stickFooterOnSmall(),
            SEMICOLON.widget.parallax()
        }
    };
    var t = e(window),
        a = e("body"),
        i = e("#wrapper"),
        s = e("#header"),
        n = e("#header-wrap"),
        o = e("#footer"),
        r = s.attr("class"),
        l = n.attr("class"),
        d = s.attr("data-sticky-class"),
        c = e("#logo").find(".standard-logo"),
        h = (c.find("img").outerWidth(), e("#logo").find(".retina-logo")),
        u = c.find("img").attr("src"),
        f = h.find("img").attr("src"),
        p = c.attr("data-dark-logo"),
        g = h.attr("data-dark-logo"),
        m = e("#page-menu"),
        C = e(".one-page-menu"),
        v = 0,
        y = e(".slider-parallax"),
        b = e("#page-title"),
        w = "",
        E = e("#top-search"),
        L = e("#top-cart"),
        k = e(".vertical-middle"),
        z = e("#top-social").find("li"),
        T = e(".si-sticky"),
        P = e(".dots-menu"),
        F = e("#gotoTop"),
        j = e(".full-screen"),
        H = e(".common-height"),
        A = e(".testimonials-grid"),
        _ = e(".page-section"),
        W = e(".owl-carousel"),
        D = e(".parallax"),
        B = e(".page-title-parallax"),
        R = e(".yt-bg-player"),
        q = e(".text-rotater");
    e(document).ready(SEMICOLON.documentOnReady.init), t.load(SEMICOLON.documentOnLoad.init), t.on("resize", SEMICOLON.documentOnResize.init)
}(jQuery);