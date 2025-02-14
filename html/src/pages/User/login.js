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
                // console.log('Không tìm thấy phần tử togglePassword.');
            }
            
        });
    }

    const facebookLogin = (id, config) => {
        window.fbAsyncInit = () => {
            FB.init(config);
            FB.AppEvents.logPageView();
        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        document.addEventListener('click', (e) => {
            const element = document.getElementById(id);
            if (element.contains(e.target)) {
                e.preventDefault();
                FB.login(() => {
                    FB.getLoginStatus((response) => {
                        if ('connected' === response.status) {
                            FB.api('/me', {
                                fields: 'id,first_name,last_name,email,gender,picture'
                            }, (profile) => {
                                handleLogin({
                                    id: profile.id,
                                    login: profile.email,
                                    email: profile.email,
                                    last_name: profile.last_name,
                                    first_name: profile.first_name,
                                    avatar: profile.picture.data.url,
                                });
                                FB.logout(response);
                            });
                        }
                    });
                }, {
                    scope: 'email'
                });
            }
        });
    };

    const googleLoginCallback = (response) => {
        $('#bm-google-btn').addClass('is-loading');
        var profile = decodeJwtResponse(response.credential);
        // console.log(profile);
        
        var provide_id = profile.jti || '';
        var first_name = profile.family_name || '';
        var last_name = profile.given_name || '';
        var name = profile.name || '';
        var email = profile.email || '';
        var picture = profile.picture || '';

        if (provide_id === "" || email === "") {
            alert('Không thể lấy được thông tin người dùng.');
            return false;
        }

        // Gửi dữ liệu lên server để xác thực và đăng nhập
        jQuery.ajax({
            url: 'login-google.php',
            type: 'POST',
            data: {
                "type": "google",
                "id": provide_id,
                "first_name": first_name,
                "last_name": last_name,
                "display_name": name,
                "email": email,
                "picture": picture
            },
            success: function(response) {
                var res = JSON.parse(response);
                if (res.success) {
                    if (res.role == "admin") {
                        window.location.href = "bm-admin";
                    } else {
                        window.location.href = "trang-chu";
                    }
                } else {
                    // alert(res.message);
                    toast({
                        type: "error",
                        position: "top-right",
                        title: res.message,
                    });
                    return false;
                }
            },
            error: function() {
                alert('Đã xảy ra lỗi trong quá trình đăng nhập bằng Google.');
            }
        });
    };

    // if (window.google && window.google.accounts) {
    //     window.google.accounts.id.initialize({
    //         client_id: '539559261576-2qhoqucptfova61pk3tomuclh74e9abp.apps.googleusercontent.com',
    //         ux_mode: "popup",
    //         callback: googleLoginCallback
    //     });
    // }

    function decodeJwtResponse(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    }
    
    // Hàm khởi tạo Google Login
    function initializeGoogleLogin() {
        // Đảm bảo rằng SDK đã sẵn sàng trước khi xử lý
        if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
                client_id: '539559261576-2qhoqucptfova61pk3tomuclh74e9abp.apps.googleusercontent.com',
                ux_mode: "popup",
                callback: googleLoginCallback
            });
    
            const createFakeGoogleWrapper = () => {
                const googleLoginWrapper = document.createElement("div");
                googleLoginWrapper.style.display = "none";
                googleLoginWrapper.classList.add("custom-google-button");
                document.body.appendChild(googleLoginWrapper);
                window.google.accounts.id.renderButton(googleLoginWrapper, {
                    theme: 'outline',
                    size: 'large',
                });
                const googleLoginWrapperButton = googleLoginWrapper.querySelector("div[role=button]");
                return {
                    click: () => {
                        googleLoginWrapperButton.click();
                    },
                };
            };
    
            const googleButton = document.getElementById('bm-google-btn');
            if (googleButton) {
                const googleButtonWrapper = createFakeGoogleWrapper();
                googleButton.addEventListener('click', function (e) {
                    googleButtonWrapper.click();
                });
            }
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Kiểm tra xem Google SDK đã sẵn sàng hay chưa
        if (window.google && window.google.accounts && window.google.accounts.id) {
            initializeGoogleLogin();
        } else {
            // Nếu chưa sẵn sàng, lắng nghe sự kiện để khởi tạo sau
            window.addEventListener('googleSdkLoaded', function () {
                initializeGoogleLogin();
            });
        }

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://accounts.google.com/gsi/client";
            js.onload = function() {
                console.log("Google SDK đã tải xong");
                // Gọi hàm khởi tạo Google login sau khi SDK đã tải xong
                initializeGoogleLogin();
            };
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
    });
    
    
    $(function () {      
        showPassword();
        // facebookLogin('fbLogin', {
        //     xfbml: true,
        //     cookie: true,
        //     appId: "1073491914479527",
        //     version: "v21.0"
        // });


        $(window).on("resize", function () {

        });
    });
})(jQuery);