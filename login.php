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

        // Nếu người dùng chọn "Nhớ tài khoản"
        if (isset($_POST['remember-me']) && $_POST['remember-me'] == 'on') {
            // Thiết lập cookie để nhớ tài khoản
            setcookie('username', $username, time() + (86400 * 30), "/"); // Cookie có thời gian sống 30 ngày
            setcookie('password', $password, time() + (86400 * 30), "/"); // Cookie có thời gian sống 30 ngày
        } else {
            // Xóa cookie nếu không chọn "Nhớ tài khoản"
            setcookie('username', '', time() - 3600, "/");
            setcookie('password', '', time() - 3600, "/");
        }

        header("Location: trang-chu");
    } else {
        $error = "Tên đăng nhập hoặc mật khẩu không đúng.";
    }
}

$title = "Đăng nhập";

// Xử lý việc điền sẵn thông tin đăng nhập nếu có cookie
$saved_username = isset($_COOKIE['username']) ? $_COOKIE['username'] : '';
$saved_password = isset($_COOKIE['password']) ? $_COOKIE['password'] : '';

include('header.php');
?>

    <div class="login-wrap">
        <section class="tdmu-sign-in">
            <div class="tdmu-sign-in__wrap">
                <div class="tdmu-sign-in__content">
                    <div class="tdmu-sign-in__content--image">
                        <img src="<?php echo BASE_URL; ?>/assets/img/signin-image.jpg" alt="sign up image">
                    </div>
                    <div class="tdmu-sign-in__content--form">
                        <h2 class="form-title">Đăng nhập</h2>
                        <form method="POST" class="register-form">
                            <div class="form-group">
                                <label for="your_name"><i class="fa-solid fa-user"></i>Tên đăng nhập</label>
                                <input type="text" name="your_name" id="your_name" placeholder="Nhập tên đăng nhập của bạn" value="<?php echo htmlspecialchars($saved_username); ?>"/>
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="fa-solid fa-lock"></i>Mật khẩu</label>
                                <div class="form-group__wrap">
                                    <input type="password" name="your_pass" id="your_pass" placeholder="Nhập Mật khẩu" value="<?php echo htmlspecialchars($saved_password); ?>"/>
                                    <i class="fa fa-eye togglePassword"></i>
                                </div>
                            </div>
                            <div class="form-group remember-me">
                                <input type="checkbox" name="remember-me" id="remember-me" <?php echo isset($_COOKIE['username']) ? 'checked' : ''; ?> />
                                <label for="remember-me">Nhớ tài khoản</label>
                            </div>
                            <div class="form-group form-button">
                                <button type="submit" name="signin" id="signin" class="form-submit" value="Đăng nhập">Đăng nhập</button>
                            </div>
                        </form>
                        <?php if(isset($error)) : ?>
                            <div class="invalid-message"><?= $error; ?></div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </section>
    </div>

<?php include('footer.php'); ?>
