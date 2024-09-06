var $ = jQuery.noConflict();
// Global functions
var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

function openPopupOverlay(speed = 300) {
    if ($('.bm-popup-overlay').length) return;
    $('body').append('<div class="bm-popup-overlay"></div>');
    $('body').addClass('is-lock').css('paddingRight', scrollbarWidth);
    $('.bm-popup-overlay').fadeIn(speed);
}

function closePopupOverlay(speed = 300) {
    $('.bm-popup-overlay').fadeOut(speed);
    setTimeout(function () {
        $('.bm-popup-overlay').remove();
    }, speed);
    $('body').removeClass('is-lock').css('padding-right', '');
}

function getRootVars() {
    var root = document.querySelector(":root");
    root.style.setProperty("--vh", window.innerHeight / 100 + "px");
    root.style.setProperty("--mh", $('header.bm-header').outerHeight() + "px");
    root.style.setProperty("--gi", ($('#isa-gifts').length > 0 ? $('#isa-gifts').outerHeight() : 0) + "px");
}

window.addEventListener('load', () => {   

    const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
            wrapper: window,
            content: document.documentElement,
            lerp: 0.1,
            duration: 1.8,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            normalizeWheel: true,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        },
    });

    const homeClass = $('.page-template-home').length;

    // if (homeClass > 0) {
    //     setTimeout(function(){
    //         window.scrollTo(0, 0);
            
    //     }, 10);
    // }

});


// Main functions
(function ($) {
    $.rt_noti = function (html, time = 2500) {
        if ($('.bm-noti').length) return;
        $('body').append('<div class="bm-noti">' + html + '</div>');
        setTimeout(function () {
            $('.bm-noti').addClass('opening');
        }, 10);
        setTimeout(function () {
            $('.bm-noti').removeClass('opening');
        }, time);
        setTimeout(function () {
            $('.bm-noti').remove();
        }, time + 400);
    };

    function handleWordpressAdminMode() {
        if ($('#wpadminbar').length && $('.js-bm-navbar').length && $(window).width() <= 600) {
            $(window).on('scroll', function () {
                var top = $(window).scrollTop(),
                    offsetTop = 46 - top > 0 ? 46 - top : 0;
                $('.js-bm-navbar').css('margin-top', offsetTop);
            });
        }
    }

    function initLazyLoad() {
        $('.lazy').Lazy({
            afterLoad: function (el) {
                $(el).addClass('loaded');
                // handleIE();
            }
        });
    }

    function initSelect2() {
        if( $('.ginput_container select').length > 0 ) {
            $('.ginput_container select').select2({
                width: "100%",
                minimumResultsForSearch: -1
            });
        }

        if( $('.bm-form-group select').length > 0 ) {
            $('.bm-form-group select').select2({
                width: "100%",
                minimumResultsForSearch: -1
            });
        }

        if( $('select.bm-is-select2').length > 0 ) {
            $('select.bm-is-select2').select2({
                width: "100%",
                minimumResultsForSearch: -1
            });
        }

        if( $('select.bm-is-select2-filter').length > 0 ) {
            $('select.bm-is-select2-filter').select2({
                width: "100%",
                minimumResultsForSearch: -1,
                theme: "filter"
            });
        }
        

        // if( $('.pennacademy-course-ordering select').length > 0 ) {
        //     $('.pennacademy-course-ordering select').select2({
        //         width: "resolve",
        //         minimumResultsForSearch: -1
        //     });
        // }

        /* if( $('.wpforms-field select').length > 0 ) {
            $('.wpforms-field select').select2({
                width: "100%",
                minimumResultsForSearch: -1
            });
        } */
       
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

        $(document).on('click', '.bm-popup-overlay', function (e) {
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
            $('.bm-img-drop').each(function () {
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
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });

        $('body .bm-header a[href*=\\#]:not([href=\\#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {

                    $('.bm-navbar-toggler').removeClass('is-active');
                    $('.bm-navbar-collapse').removeClass('is-show');
                    $('body').removeClass('is-lock');

                    $('html, body').animate({
                        scrollTop: target.offset().top - $('header .bm-navbar').outerHeight()
                    }, 1000);
                    return false;
                }
            }
        });
    }


    function initFormFloatLabel() {
        // Check input autofill
        $(window).bind('load', function () {
            $.each($('.bm-form-group input:-webkit-autofill'), function () {
                var label = $(this).prev()
                label.addClass('freeze');
            });

            $.each($('.gfield input:-webkit-autofill'), function () {
                var label = $(this).closest('.gfield').find('.gfield_label')
                label.addClass('freeze');
            });

            $.each($('.wpforms-field input:-webkit-autofill'), function () {
                var label = $(this).closest('.gfield').find('.gfield_label')
                label.addClass('freeze');
            });
        });

        // Check select
        $('.ginput_container_select select').closest('.gfield').addClass('has-select');
        $('.bm-form-group select').closest('.bm-form-group').addClass('has-select');

        // Check input
        var formFields = $('.gfield, .bm-form-group, .wpforms-field, .comment-form p');
        formFields.each(function () {
            var field = $(this),
                input = field.find('input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]), textarea'),
                label = field.find('label');

            if (input.attr('type') != 'file') {
                input.focus(function () {                    
                    label.addClass('freeze');
                });
            }

            input.focusout(function () {
                checkInput();
            });

            if (input.val() && input.val().length) {
                label.addClass('freeze');
            }

            function checkInput() {
                var valueLength = input.val().length;

                if (valueLength > 0) {
                    label.addClass('freeze');
                } else {
                    label.removeClass('freeze');
                }
            }

            input.change(function () {
                checkInput();
            });
        });
    }

    function handleLightGallery() {
        // Gallery
        $(document).on('click', '.bm-light-gallery', function(e) {
            e.preventDefault();
            let $dynamicGallery = document.querySelector(".bm-light-gallery");
            let sources = $(this).attr('data-sources');
            sources = JSON.parse(sources);

            let dynamicGallery = window.lightGallery($dynamicGallery, {
                dynamic: true,
                plugins: [lgVideo, lgThumbnail],
                // plugins: [lgVideo, lgAutoplay, lgZoom],
                dynamicEl: sources,
                download: false,
                counter: false,
                slideShowAutoplay: (sources.length > 1 ? true : false),
                autoplayControls: false,
                autoplayVideoOnSlide: true,
                showCloseIcon: true,
                mobileSettings:	{ 
                    controls: true, 
                    showCloseIcon: true
                }
            });

            dynamicGallery.openGallery(0);
        });

        // Item
        $(document).on('click', '.bm-light-gallery-item', function(e) {
            e.preventDefault();
            
            let index = 0;
            let i = 0;
            let $dynamicGallery = document.querySelector(".bm-light-gallery-item");
            let sources = [];
            let element = $(this).closest('.bm-light-gallery-list');
            let urlTemp = $(this).find('img').attr('src');
            
            if(element.find('img').length > 0) {
                element.find('img').each(function(e) {

                    if($(this).attr('src') == urlTemp) {
                        index = i;
                    }

                    let source = {
                        "src" : $(this).attr('src'),
                        "thumb" : $(this).attr('src'),
                        "subHtml" : $(this).attr('alt')
                    }

                    sources.push(source);
                    i++;
                });
            }
            
            //sources = JSON.parse(sources);

            let dynamicGallery = window.lightGallery($dynamicGallery, {
                dynamic: true,
                // plugins: [lgZoom, lgVideo, lgThumbnail],
                plugins: [lgVideo, lgAutoplay],
                dynamicEl: sources,
                download: false,
                counter: false,
                slideShowAutoplay: (sources.length > 1 ? true : false),
                autoplayControls: false,
                autoplayVideoOnSlide: true,
                showCloseIcon: true,
                mobileSettings:	{ 
                    controls: true, 
                    showCloseIcon: true
                }
            });

            dynamicGallery.openGallery(index);
        });
        
    }
    
    
    $(function () {
        getRootVars();
        initLazyLoad();
        initSelect2();
        initPopup();
        handleWordpressAdminMode();
        initFormFloatLabel();
        initAnchorScroll();
        handleLightGallery();

    });

    $(window).on('resize', function() {
        getRootVars();
    });
})(jQuery);