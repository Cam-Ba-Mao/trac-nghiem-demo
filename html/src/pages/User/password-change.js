(function ($) {


    function handleInputEmail() {
        BMplaceholderTypewriter('#email-password-change', {
            delay: 50,
            pause: 1000,
            text: ["Nhập Email của bạn ..", "Mã OTP sẽ được gửi về Email .."]
        });
        BMplaceholderTypewriter('#otp', {
            delay: 50,
            pause: 1000,
            text: ["Nhập OTP của bạn .."]
        });
    }
  
    
    $(function () {      
        handleInputEmail();

        $(window).on("resize", function () {

        });
    });
})(jQuery);