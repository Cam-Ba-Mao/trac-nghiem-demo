<?php
// Xử lý đăng nhập
session_start();
include('./config/config.php');

$username_error = '';
$password_error = '';
$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['your_name'];
    $password = $_POST['your_pass'];

    // Kiểm tra nếu không nhập tên đăng nhập hoặc mật khẩu
    if (empty($username)) {
        $username_error = "Tên đăng nhập không được để trống.";
    }
    if (empty($password)) {
        $password_error = "Mật khẩu không được để trống.";
    }

    if (empty($username_error) && empty($password_error)) {
        // Kiểm tra thông tin đăng nhập
        $query = "SELECT id, username, password, role FROM users WHERE username='$username'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) == 1) {
            $user = mysqli_fetch_assoc($result);

            // Kiểm tra mật khẩu (cho phép plain text hoặc hashed)
            if ($user['password'] === $password) {
                // Mật khẩu là dạng plain text, chuyển đổi thành dạng băm
                $hashed_password = password_hash($password, PASSWORD_BCRYPT);

                // Cập nhật mật khẩu trong cơ sở dữ liệu
                $update_query = "UPDATE users SET password='$hashed_password' WHERE id=" . $user['id'];
                mysqli_query($conn, $update_query);

                // Cập nhật thông tin phiên làm việc
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
                exit();
            } elseif (password_verify($password, $user['password'])) {
                // Nếu mật khẩu đã được mã hóa
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

                // Kiểm tra quyền (role)
                if ($user['role'] == 'student') {
                    header("Location: trang-chu"); // Chuyển hướng tới trang chủ cho sinh viên
                } elseif ($user['role'] == 'admin') {
                    header("Location: bm-admin"); // Chuyển hướng tới trang quản trị cho admin
                }
                exit();
            } else {
                $error = "Sai mật khẩu.";
            }
        } else {
            $error = "Tên đăng nhập không tồn tại.";
        }
    }
}

$title = "Đăng nhập";

// Xử lý việc điền sẵn thông tin đăng nhập nếu có cookie
$saved_username = isset($_COOKIE['username']) ? $_COOKIE['username'] : '';
$saved_password = isset($_COOKIE['password']) ? $_COOKIE['password'] : '';

include('header.php');
?>
<script src="https://accounts.google.com/gsi/client" async defer></script>
<section class="bm-sign-in">
    <div class="container">
        <div class="bm-sign-in__wrap">
            <div class="bm-sign-in__content">
                <div class="bm-sign-in__content--image">
                    <img src="<?php echo BASE_URL; ?>/html/dist/images/signin-image.jpg" alt="sign up image">
                    <a class="forgot-password" href="<?php echo BASE_URL; ?>/request_password_change.php">Quên mật khẩu</a>
                </div>
                <div class="bm-sign-in__content--form">
                    <h2 class="form-title">Đăng nhập</h2>
                    <form method="POST">
                        <div class="bm-form-group <?= !empty($username_error) ? 'bm-form-group--error' : ''; ?>">
                            <label class="bm-form-label" for="your_name">
                                <i class="fa-solid fa-user"></i>Tên đăng nhập
                            </label>
                            <input class="bm-form-control" type="text" name="your_name" id="your_name" placeholder="Nhập tên đăng nhập của bạn" value="<?php echo htmlspecialchars($saved_username); ?>">
                            <?php if(!empty($username_error)) : ?>
                                <span class="invalid-message"><?= $username_error; ?></span>
                            <?php endif; ?>
                        </div>
                        <div class="bm-form-group input-password <?= !empty($password_error) ? 'bm-form-group--error' : ''; ?>">
                            <label class="bm-form-label" for="your_pass">
                                <i class="fa-solid fa-lock"></i>Mật khẩu
                            </label>
                            <div class="input-password__wrap">
                                <input class="bm-form-control" type="password" name="your_pass" id="your_pass" placeholder="Nhập Mật khẩu" value="<?php echo htmlspecialchars($saved_password); ?>">
                                <i class="fa fa-eye togglePassword"></i>
                            </div>
                            <?php if(!empty($password_error)) : ?>
                                <span class="invalid-message"><?= $password_error; ?></span>
                            <?php endif; ?>
                        </div>
                        <div class="bm-form-group remember-me">
                            <span class="bm-custom-control">
                                <input type="checkbox" id="remember-me" <?php echo isset($_COOKIE['username']) ? 'checked' : ''; ?>/>
                                <label for="remember-me">Nhớ tài khoản</label>
                            </span>
                        </div>
                        <div class="bm-form-group submit-button">
                            <button class="form-submit" type="submit" name="signin" id="signin" value="Đăng nhập">Đăng nhập</button>
                        </div>
                    </form>
                    <?php if (!empty($error)) : ?>
                        <span class="invalid-message"><?= $error; ?></span>
                    <?php endif; ?>
                    <div class="social-login">
                        <span class="social-login__label"> <span>Hoặc đăng nhập bằng</span></span>
                        <div class="social-login__wrap">
                            <button id="bm-google-btn" onclick="handleGoogleLogin()">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.6261 11.2139C20.6261 10.4225 20.5605 9.84497 20.4187 9.24609H11.1975V12.818H16.6102C16.5011 13.7057 15.9118 15.0425 14.6022 15.9408L14.5839 16.0603L17.4995 18.2738L17.7015 18.2936C19.5566 16.6145 20.6261 14.1441 20.6261 11.2139Z" fill="#205CD4"></path>
                                    <path d="M11.1969 20.625C13.8486 20.625 16.0748 19.7694 17.7008 18.2936L14.6016 15.9408C13.7723 16.5076 12.6592 16.9033 11.1969 16.9033C8.5997 16.9033 6.39536 15.2243 5.60957 12.9036L5.4944 12.9131L2.46274 15.2125L2.4231 15.3205C4.03815 18.4647 7.35561 20.625 11.1969 20.625Z" fill="#34A853"></path>
                                    <path d="M5.61006 12.9036C5.40272 12.3047 5.28273 11.663 5.28273 11C5.28273 10.3369 5.40272 9.69524 5.59915 9.09636L5.59366 8.96881L2.524 6.63257L2.42357 6.67938C1.75792 7.98412 1.37598 9.44929 1.37598 11C1.37598 12.5507 1.75792 14.0158 2.42357 15.3205L5.61006 12.9036Z" fill="#FBBC05"></path>
                                    <path d="M11.1969 5.09664C13.0412 5.09664 14.2852 5.87733 14.9945 6.52974L17.7664 3.8775C16.064 2.32681 13.8487 1.375 11.1969 1.375C7.35564 1.375 4.03816 3.53526 2.4231 6.6794L5.59868 9.09638C6.39538 6.77569 8.59974 5.09664 11.1969 5.09664Z" fill="#EB4335"></path>
                                </svg>
                                Google
                            </button>
                            <button id="bm-facebook-btn">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.9999 21.5416C16.8219 21.5416 21.5416 16.8219 21.5416 10.9999C21.5416 5.17792 16.8219 0.458252 10.9999 0.458252C5.17792 0.458252 0.458252 5.17792 0.458252 10.9999C0.458252 16.8219 5.17792 21.5416 10.9999 21.5416Z" fill="#205CD4"></path>
                                    <path d="M15.1034 14.0469L15.5709 10.9999H12.6472V9.02268C12.6472 8.18897 13.0556 7.37634 14.365 7.37634H15.6942V4.78218C14.9138 4.65588 14.1252 4.58695 13.3347 4.57593C10.9266 4.57593 9.35269 6.03526 9.35269 8.67755V10.9999H6.67603V14.0469H9.35269V21.4133C10.4442 21.5844 11.5557 21.5844 12.6472 21.4133V14.0469H15.1034Z" fill="white"></path>
                                </svg>
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php include('footer.php'); ?>
