(function ($) {
    const body = $('body');
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    var lastScroll = 0;

    function handleScrollMenu() {
        $(window).on('scroll', function () {
            calculateScroll();
        });
    }

    function calculateScroll() {
        var currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && !body.hasClass(scrollDown)) {
            // down
            body.removeClass(scrollUp);
            body.addClass(scrollDown);

        } else if (currentScroll < lastScroll && body.hasClass(scrollDown)) {
            // up
            body.removeClass(scrollDown);
            body.addClass(scrollUp);
        }

        lastScroll = currentScroll;

        if (currentScroll <= 0) {
            body.removeClass(scrollUp);
        }
    }

    function handleClickMenuButton() {
        $(document).on('click', '.bm-header__hamburger .btn', function(){
            if(document.body.classList.contains('opened-menu')) {
                $('body').removeClass('opened-menu is-lock');
                $(this).find('span').html(this.dataset.label);
                $(this).parents('.bm-header__head').each(function(){
                    $(this).removeClass('open');
                    $(this).removeAttr('style');
                });
            }
            else {
                $('body').addClass('opened-menu is-lock');
                $(this).find('span').html(this.dataset.close);
                $(this).parents('.bm-header__head').each(function(){
                    $(this).addClass('open');
                    $(this).css({
                        height: $('.bm-header__nav').height() + 150,
                        width: $('.bm-header__nav').outerWidth() + 60,
                    });
                });
            }
        });
    }

    $(function () {
        handleScrollMenu();
        calculateScroll();
        handleClickMenuButton();
    });

})(jQuery);