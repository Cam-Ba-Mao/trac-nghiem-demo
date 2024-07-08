<?php
// Xử lý đăng nhập
session_start();
include('./config/config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['your_name'];
    $password = $_POST['your_pass'];

    // Kiểm tra thông tin đăng nhập
    $query = "SELECT id, username, role FROM users WHERE username='$username' AND password='$password'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];
        header("Location: index.php");
    } else {
        $error = "Tên đăng nhập hoặc mật khẩu không đúng.";
    }
}
$title = "Đăng nhập";

include('header.php');
?>
    <!-- <form method="POST">
        Tên đăng nhập: <input type="text" name="username" required><br>
        Mật khẩu: <input type="password" name="password" required><br>
        <input type="submit" value="Đăng nhập">
    </form> -->
    <div class="login-wrap">
        <section class="tdmu-sign-in">
            <div class="tdmu-sign-in__wrap">
                <div class="tdmu-sign-in__content">
                    <div class="tdmu-sign-in__content--image">
                        <figure><img src="<?php echo BASE_URL; ?>/assets/img/signin-image.jpg" alt="sing up image"></figure>
                        <!-- <a href="#" class="signup-image-link">Create an account</a> -->
                    </div>

                    <div class="tdmu-sign-in__content--form">
                        <h2 class="form-title">Đăng nhập</h2>
                        <form method="POST" class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="your_name" id="your_name" placeholder="Tên đăng nhập"/>
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Mật khẩu"/>
                            </div>
                            <!-- <div class="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                            </div> -->
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Đăng nhập"/>
                            </div>
                        </form>
                        <?php if(isset($error)) { echo "<p style='color: red;'>$error</p>"; } ?>
                        <!-- <div class="social-login">
                            <span class="social-label">Or login with</span>
                            <ul class="socials">
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div> -->
                    </div>
                </div>
            </div>
        </section>
    </div>
    
<?php include('footer.php'); ?>
