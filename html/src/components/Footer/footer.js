(function ($) {
    function handleScrollToTop() {
        $(document).on('click', '.bm-scroll-to-top', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
        });
    }

    function handleDisplayScrollToTop() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();

        if(scrollPosition >= (scrollHeight - 100)) {
            $('.bm-scroll-to-top').addClass('is-active');
        } else {
            $('.bm-scroll-to-top').removeClass('is-active');
        }
    }

    $(function () {
        handleScrollToTop();

        handleDisplayScrollToTop();
        $(window).scroll(function(){
            handleDisplayScrollToTop();
        });
    });
    
})(jQuery);