(function ($) {

    function enableAllTooltips()
    {
        let tooltipelements = 
            document.querySelectorAll("[data-bs-toggle='tooltip']");
        tooltipelements.forEach((el) => {
            new bootstrap.Tooltip(el);
        });
    }
      
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

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
        $('body').toggleClass('sidebar-collapse');
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

    $('.bm-collapse-menu-mobile').on('click', function (e) {
        $('body').toggleClass('sidebar-collapse');
        $('.bm-admin-sidebar').toggleClass('fix');
        if ($('.bm-admin-sidebar').hasClass('fix')) {
            $('.bm-admin-sidebar >ul >li.active .sub-menu').hide();
            localStorage.setItem('sidebar', true);
        } else {
            $('.bm-admin-sidebar >ul >li.active .sub-menu').show();
            delete localStorage['sidebar'];
        }
        e.preventDefault();
    });
   

    function sidebarCheck() {
        if (localStorage.getItem('sidebar')) {
            $('body').addClass('sidebar-collapse');
            $('.bm-admin-sidebar').addClass('fix');
            $('.bm-admin-sidebar >ul >li.active .sub-menu').hide();
            $('.bm-collapse-admin-menu .fa-solid').removeClass('fa-arrow-circle-left').addClass('fa-arrow-circle-right');
        }
    }
    

    sidebarCheck();
    enableAllTooltips();


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