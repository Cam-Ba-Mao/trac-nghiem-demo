(function ($) {

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

    function handleIE() {
        var userAgent, ieReg, ie;
        userAgent = window.navigator.userAgent;
        ieReg = /msie|Trident.*rv[ :]*11\./gi;
        ie = ieReg.test(userAgent);

        if (ie) {
            $('.rt-img-drop').each(function () {
                var $container = $(this),
                    imgLazy = $(this).find('img').attr('src'),
                    picLazy = $(this).find('source').attr('srcset'),
                    imgUrl = picLazy ? picLazy : imgLazy;
                if (imgUrl) {
                    $container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('custom-object-fit');
                }
            });
        }
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


    $(function () {
        // handleTEST();

    });

    $(window).on('resize', function () {
        // getRootVars();
    });
})(jQuery);