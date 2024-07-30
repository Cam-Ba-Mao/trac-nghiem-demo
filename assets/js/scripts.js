var $ = jQuery.noConflict();

function getRootVars() {
    var root = document.querySelector(":root");
    root.style.setProperty("--vh", window.innerHeight / 100 + "px");
   
    setTimeout(function () {
        root.style.setProperty("--mh", $('.tdmu-header').outerHeight() + "px");
    }, 100)
}

// document.addEventListener('DOMContentLoaded', function() {
//     const menuToggle = document.querySelector('.menu-toggle');
//     const adminMenu = document.querySelector('.admin-menu');

//     menuToggle.addEventListener('click', function() {
//         adminMenu.classList.toggle('open');
//         if (adminMenu.classList.contains('open')) {
//             adminMenu.style.width = '200px';
//         } else {
//             adminMenu.style.width = '60px';
//         }
//     });
// });

// Hàm để chuyển đổi trạng thái menu
const toggleMenu = () => {
    
    window.addEventListener('load', function() {
        // Chọn các phần tử
        const menuToggleButton = document.querySelector('.menu-toggle');
        const adminMenu = document.querySelector('.admin-menu');
        
        // Kiểm tra sự tồn tại của các phần tử trước khi thêm sự kiện
        if (menuToggleButton && adminMenu) {
            // Thêm sự kiện click
            menuToggleButton.addEventListener('click', function() {
                if (adminMenu.classList.contains('collapsed')) {
                    adminMenu.classList.remove('collapsed');
                    adminMenu.classList.add('expanded');
                } else {
                    adminMenu.classList.remove('expanded');
                    adminMenu.classList.add('collapsed');
                }
            });
        } else {
            console.log('Không tìm thấy phần tử menu-toggle hoặc admin-menu.');
        }
    });
};

const showPassword = () => {
    window.addEventListener("load", function () {
        const togglePassword = document.querySelector(".toggle");
        
        if (togglePassword) {
            togglePassword.addEventListener("click", function () {
                const input = this.previousElementSibling;
                const inputType = input.getAttribute("type");
                
                // Toggle input type
                if (inputType === "password") {
                    input.setAttribute("type", "text");
                } else {
                    input.setAttribute("type", "password");
                }
                
                // Toggle icon classes
                this.classList.toggle("fa-eye");
                this.classList.toggle("fa-eye-slash");
            });
        } else {
            console.log('Không tìm thấy phần tử togglePassword.');
        }
        
    });
}


  


(function ($) {

    
    let lastScroll = 0;

   

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

    function handleScrollMenu() {
        $(window).on('scroll', function() {
            calculateScroll();
        });
    }

    function calculateScroll() {
        const body = $('body');
        const scrollUp = "scroll-up";
        const scrollDown = "scroll-down";
        var currentScroll = window.scrollY;

        // console.log(currentScroll);

        if (currentScroll > lastScroll && !body.hasClass(scrollDown)) {
            // down
            // body.removeClass(scrollUp);
            body.addClass(scrollDown);
        } else if ( currentScroll < lastScroll && body.hasClass(scrollDown) ) {
            // up
            // body.removeClass(scrollDown);
            // body.addClass(scrollUp);
        }

        if (currentScroll <= 0) {
            // body.removeClass(scrollUp);
            body.removeClass(scrollDown);
            // return;
        }

        lastScroll = currentScroll;
    }

    $(function () {
        // handleTEST();

        // clearTimeout(myTimeout);
        getRootVars();
        calculateScroll();
        handleScrollMenu();
        // Gọi hàm để khởi tạo hành vi chuyển đổi menu
        toggleMenu();
        showPassword();
       
        $(document).ready(function () {
                      
           
        });
    });

    $(window).on('resize', function () {
        getRootVars();
    });
})(jQuery);