(function ($) {

    const body = $('body');
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    var lastScroll = 0;

    function initLazyLoad() {
        $('.lazy').Lazy({
            afterLoad: function (el) {
                $(el).addClass('loaded');
                // handleIE();
            }
        });
    }

    function initPopup() {
        $('[data-popup-target]').on('click', function (e) {
            e.preventDefault();
            var popupTarget = $(this).data('popup-target'),
                popupContent = $('[data-popup-content="' + popupTarget + '"]');
            if (popupContent.length == 0) return;
            popupContent.addClass('is-active');
            openPopupOverlay();
        });

        $('[data-popup-close]').on('click', function (e) {
            e.preventDefault();
            $(this).closest('[data-popup-content]').removeClass('is-active');
            closePopupOverlay();
        });

        $(document).on('click', '.rt-popup-overlay', function (e) {
            $('[data-popup-content]').removeClass('is-active');
            closePopupOverlay();
        });
    }

    function initAnchorScroll() {
        $('a.js-anchor-scroll[href*=\\#]:not([href=\\#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        // scrollTop: target.offset().top - $('.iedg-header .iedg-navbar').outerHeight()
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;

                }
            }
        });

        $(document).on('click', 'body .isa-header a[href*=\\#]:not([href=\\#]), footer .isa-footer__item--nav a[href*=\\#]:not([href=\\#])', function () {

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {
                    $('.isa-header__hamburger').removeClass('is-active');
                    $('.isa-header__nav').removeClass('is-active');
                    $('.isa-header').removeClass('is-active');
                    $('.mobile-menu-wrapper').removeClass('is-active');
                    $('body').removeClass('is-menu-active');

                    $('html, body').animate({
                        scrollTop: target.offset().top - ($('#wpadminbar').length > 0 ? $('#wpadminbar').outerHeight() : 0)
                    }, 1000);
                    return false;
                }
            }
        });

        $(document).on('click', '.mobile-menu-wrapper a[href*=\\#]:not([href=\\#])', function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {
                    $('.isa-header__hamburger').removeClass('is-active');
                    $('.isa-header__nav').removeClass('is-active');
                    $('.isa-header').removeClass('is-active');
                    $('.mobile-menu-wrapper').removeClass('is-active');
                    $('body').removeClass('is-menu-active');

                    $('html, body').animate({
                        scrollTop: target.offset().top - ($('#wpadminbar').length > 0 ? $('#wpadminbar').outerHeight() : 0)
                    }, 1000);
                    return false;
                }
            }
        });
    }

    function handleTEST() {
        alert('Hello bạn đến với thế giới lập trình website của IMTA!!');
        
    }

    function getRootVars() {
        var root = document.querySelector(":root");
        root.style.setProperty("--vh", window.innerHeight / 100 + "px");
        root.style.setProperty("--mh", $('.tdmu-header').outerHeight() + "px");
    }

    function handleScrollMenu() {
        $(window).on('scroll', function() {
            calculateScroll();
        });
    }

    function calculateScroll() {
        var currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            body.removeClass(scrollUp);
            return;
        }

        if (currentScroll > lastScroll && !body.hasClass(scrollDown)) {
            // down
            // body.removeClass(scrollUp);
            body.addClass(scrollDown);
        }
        // } else if ( currentScroll < lastScroll && body.hasClass(scrollDown) ) {
        //     // up
        //     body.removeClass(scrollDown);
        //     body.addClass(scrollUp);
        // }

        lastScroll = currentScroll;
    }

    $(function () {
        // handleTEST();
        getRootVars();
        handleScrollMenu();
        calculateScroll();
    });

    $(window).on('resize', function () {
        getRootVars();
    });
})(jQuery);