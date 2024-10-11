(function ($) {

    function initSliderFeaturedEvents() {
        if( $('.isa-featured-events__list').length < 1 ) return;

        const swiper = new Swiper('.isa-featured-events__list', {
            speed: 400,
            slidesPerView: 1.1,
            spaceBetween: 16,
            loop: true,
            allowSlideNext: true,
            pagination: {
                el: ".isa-featured-events__pagination--bulet",
                clickable: true,
            },
            navigation: {
                nextEl: '.isa-featured-events__arrow--next',
                prevEl: '.isa-featured-events__arrow--prev',
            },
           
            breakpoints: {
                1400: {
                    slidesPerView: 2.7,
                    
                },
                1024: {
                    slidesPerView: 2.1,
                    
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 1.7,
                    
                },
               
                576: {
                    slidesPerView: 1.4,
                    spaceBetween: 24,
                },
                
            }
        });
    }

    function handleHoverFeaturedEvents() {

        // $(".isa-why-us__item").each(function () {    
        //     let headHeight = $(this).find('.isa-why-us__item--head').outerHeight();
        //     let bodyHeight = $(this).find('.isa-why-us__item--body').outerHeight();
        //     console.log(headHeight)
        //     let itemHeight = headHeight + bodyHeight
        //     $(this).attr('style', '--itemHeight:' + itemHeight + 'px; --headHeight:' + headHeight + 'px'); 
        // });
        
        $('.isa-featured-events__item').on({
            mouseenter: function () {
                $(this).find('.isa-ticket').addClass('is-hover');
            },
            mouseleave: function () {
                $(this).find('.isa-ticket').removeClass('is-hover');
            }
        });
    }


    function handlePostMore() {
        var showChar = 50;
        var ellipsestext = "...";

        $(".isa-ticket__inner--left").find('h3').each(function () {
            var content = $(this).html();

            if (content.length > showChar) {
                var c = content.substr(0, showChar);
                var h = content.substr(showChar, content.length - showChar);

                var html = c + '<span class="moreellipses">' + ellipsestext + '</span>' ;

                $(this).html(html);
            }
        });
    }

    $(function () {
        
        initSliderFeaturedEvents(); 
        handleHoverFeaturedEvents();
     
        $(window).on("resize", function () {
           
           
        });

        $(document).ready(function() {
            // handlePostMore();
        });

    });
})(jQuery);