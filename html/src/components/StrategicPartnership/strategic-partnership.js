(function ($) {
    
    let sliderInstances = {};

    function initStrategicPartnershipSlider(elementTop, tabId) {
        if ($('.isa-strategic-partnership__list').length < 1) return;

        // console.log(sliderInstances);
    
        if (sliderInstances[tabId]) {
            // Slider đã được khởi tạo, không khởi tạo lại
            return;
        }
    
        const sliderUniversity = new Swiper(elementTop, {
            slidesPerView: 1.4,
            spaceBetween: 16,
            loop: true,
            lazy: true,
            speed: 500,
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
            },
            on: {
                init: function() {
                    $('.isa-strategic-partnership__list .lazy').Lazy({
                        afterLoad: function (el) {
                            $(el).addClass('loaded');
                            // handleIE();
                        }
                    });
                    handleMatchHeight();
                },
                afterInit: function () {
                    $('.isa-strategic-partnership__list .lazy').Lazy({
                        afterLoad: function (el) {
                            $(el).addClass('loaded');
                            // handleIE();
                            
                        }
                    });
                    handleMatchHeight();
                },
                slideChangeTransitionEnd: function() {
                    $('.isa-strategic-partnership__list .lazy').Lazy({
                        afterLoad: function (el) {
                            $(el).addClass('loaded');
                            // handleIE();
                            
                        }
                    });
                    handleMatchHeight();
                },
                resize: function() {
                    $('.isa-strategic-partnership__list .lazy').Lazy({
                        afterLoad: function (el) {
                            $(el).addClass('loaded');
                            // handleIE();
                            
                        }
                    });
                    handleMatchHeight();
                }
            },
            navigation: {
                nextEl: '.isa-strategic-partnership__arrow .isa-swiper-next',
                prevEl: '.isa-strategic-partnership__arrow .isa-swiper-prev',
            },
            breakpoints: {

                480: {
                    spaceBetween: 16,
                    slidesPerView: 2,
                },
                992: {
                    spaceBetween: 24,
                    slidesPerView: 3,
                },
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },
        });

        // $(elementTop).mouseenter(function() {
        //     sliderUniversity.autoplay.pause();
        //     console.log('slider pause');
        // });
        
        // $(elementTop).mouseleave(function() {
        //     sliderUniversity.autoplay.resume();
        //     console.log('slider resume again');
        // });
    
        sliderInstances[tabId] = sliderUniversity;
    }
    
    function handleStrategicPartnershipTab() {
        $('.isa-strategic-partnership__mobile li').click(function () {
            var position = $(this).position();
            var scroll = $('.isa-strategic-partnership__mobile').scrollLeft();
            $('.isa-strategic-partnership__mobile').animate({
                'scrollLeft': scroll + position.left - 30
            }, 200);
        });
    
        if ($('#StrategicTabContent .tab-pane.active').length > 0) {
            let elementTop = '#StrategicTabContent .tab-pane.active .isa-strategic-partnership__list';
            let tabId = $('#StrategicTabContent .tab-pane.active').attr('id');
            initStrategicPartnershipSlider(elementTop, tabId);
        }
    
        $('.isa-strategic-partnership__nav button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            let elementTop = '#StrategicTabContent .tab-pane.active .isa-strategic-partnership__list';
            let tabId = $('#StrategicTabContent .tab-pane.active').attr('id');
            initStrategicPartnershipSlider(elementTop, tabId);
            
        });
    }

    function handleMatchHeight() {
        if( $('.isa-strategic-partnership__item--logo').length > 0) {
            $('.isa-strategic-partnership__item--logo').matchHeight();
        } 
    }
    
    $(function () {

        handleStrategicPartnershipTab();
        initStrategicPartnershipSlider();  
     
        $(window).on("resize", function () {

        });
    });
})(jQuery);