(function ($) {

    const showPassword = () => {
        window.addEventListener("load", function () {
            const togglePassword = document.querySelector(".togglePassword");
            
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
    
    $(function () {      
        
        showPassword();

        $(window).on("resize", function () {

        });
    });
})(jQuery);