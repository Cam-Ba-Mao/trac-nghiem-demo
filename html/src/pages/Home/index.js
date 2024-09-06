(function ($) {

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
    
    $(function () {     
        
        toggleMenu();
     
        $(window).on("resize", function () {

        });
    });
})(jQuery);