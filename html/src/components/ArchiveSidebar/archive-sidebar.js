(function ($) {


    function handleActiveMenu() {
        $(document).ready(function () {
            $(".caret").click(function () {
                // Remove 'active' and 'caret-down' from all elements
                $(".nested").removeClass("active");
                $(".caret").removeClass("current-menu-parent");

                // Add 'active' and 'caret-down' to the clicked element
                $(this).find(".nested").addClass("active");
                $(this).addClass("current-menu-parent");
            });
        });

        if($(".bm-archive-sidebar").find('.caret').hasClass('current-menu-parent') ) {
            $('.bm-archive-sidebar .current-menu-parent').find(".nested").addClass("active");
        }

        if($(".bm-archive-sidebar").find('.caret').hasClass('current_page_item') ) {
            $('.bm-archive-sidebar .current_page_item').find(".nested").addClass("active");
        }
        
    }

    $(function () {
        handleActiveMenu();
    });
})(jQuery);