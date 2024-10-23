(function ($) {

    $('.bm-box-container__wrap >h3').append('<button type="button" class="toggle"><i class="fa-solid fa-caret-up"></i></button>');

    $(document).on('click', 'button.toggle', function (e) {
        var id = $(this).closest('.bm-box-container__wrap').attr('id');
        $(this).parent().next().toggle();
        if ($('.fa-solid', this).hasClass('fa-caret-up')) {
            $('.fa-solid', this).removeClass('fa-caret-up').addClass('fa-caret-down');
            if (id != 'undefined') {
                localStorage.setItem('.bm-box-container__wrap-title' + id, true);
            }
        } else {
            $('.fa-solid', this).removeClass('fa-caret-down').addClass('fa-caret-up');
            if (id != 'undefined') {
                delete localStorage['.bm-box-container__wrap-title' + id];
            }
        }
        e.preventDefault();
    });
    function checkToggle() {
        $.each(localStorage, function (key, val) {
            if (!key.indexOf('.bm-box-container__wrap-title')) {
                $('#' + (key.replace('.bm-box-container__wrap-title', '')) + ' .toggle').trigger('click');
            }
        });
    }

    checkToggle();

    $('.bm-admin-sidebar >ul >li:not(.line)').hover(function () {
        if (!$('.sub-menu:visible', this).length) {
            $('.dropdown-menu', this).show();
            $(this).addClass('hover');
        }
    }, function () {
        $('.dropdown-menu', this).hide();
        $(this).removeClass('hover');
    });

    $('[dropdown] >li').hover(function () {
        $('ul', this).show();
        $(this).addClass('active');
        console.log('aaaaaaaaaa');
    }, function () {
        $('ul', this).hide();
        $(this).removeClass('active');
    });

    $('.bm-admin-sidebar >ul >li').each(function () {
        if ($('.sub-menu', this).length) {
            var html = $('.sub-menu', this).html();
            $(this).append('<ul dropdown class="dropdown-menu">' + html + '</ul>');
        }
    });

    $('.bm-collapse-admin-menu').on('click', function (e) {
        $('.bm-admin-sidebar').toggleClass('fix');
        if ($('.fa-solid', this).hasClass('fa-arrow-circle-left')) {
            $('.bm-admin-sidebar >ul >li.active .sub-menu').hide();
            $('.fa-solid', this).removeClass('fa-arrow-circle-left').addClass('fa-arrow-circle-right');
            localStorage.setItem('sidebar', true);
        } else {
            $('.fa-solid', this).removeClass('fa-arrow-circle-right').addClass('fa-arrow-circle-left');
            $('.bm-admin-sidebar >ul >li.active .sub-menu').show();
            delete localStorage['sidebar'];
        }
        e.preventDefault();
    });
    function sidebarCheck() {
        if (localStorage.getItem('sidebar')) {
            $('.bm-admin-sidebar .bm-collapse-admin-menu').trigger('click');
        }
    }

    sidebarCheck();
    


    $(function () {      
        // handleRichEditors({
        //     'mytextarea-1': {
        //         height: 500,
        //         toolbar: 'undo redo | bold italic | link image',
        //         plugins: 'link image'
        //     },
            
        // });
        
        
        $(window).on("resize", function () {

        });
    });
})(jQuery);