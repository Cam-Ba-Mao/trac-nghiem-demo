<?php
    // index-admin.php

    session_start();
    
    include(dirname(__DIR__) . '/config/config.php');

    $username_error = '';
    $password_error = '';
    $error = '';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['log'];
        $password = $_POST['pwd'];

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

    // Thiết lập tiêu đề cho trang
    $title = "Trang Login";

    include('header-login.php');
?>
<!-- START CONTENT-->
<div class="login" id="login">
    <h1 class="logo"><a href="#" title="Trắc nghiệm demo"><img alt="Trắc nghiệm demo" src="<?php echo BASE_URL; ?>/html/dist/images/favicon.png"></a></h1>
    <form action="#" method="post" accept-charset="utf-8">
        <div class="form-field field-log" id="field-log">
            <label for="log">Tên người dùng hoặc Địa chỉ Email</label>
            <div class="form-input">
                <input class="form-control" id="log" type="text" name="log" value="<?php echo htmlspecialchars($saved_username); ?>" tabindex="1" autofocus="1" autocomplete="off">
            </div>
        </div>
        <div class="form-field field-pwd" id="field-pwd">
            <label for="pwd">Mật khẩu</label>
            <div class="form-input">
                <input class="form-control" id="pwd" type="password" name="pwd" value="<?php echo htmlspecialchars($saved_password); ?>" tabindex="2">
                <button class="button" type="button" tabindex="3"><i class="fa fa-eye"></i></button>
            </div>
        </div>
        <div class="form-field field-pwd" id="field-sec">
            <label for="sec">Mật khẩu bảo vệ</label>
            <div class="form-input">
                <input class="form-control" id="sec" type="password" name="sec" value="" tabindex="4">
                <button class="button" type="button" tabindex="5"><i class="fa fa-eye"></i></button>
            </div>
        </div>
        <div class="form-field field-btn" id="field-btn">
            <p class="forgetmenot">
                <label>
                    <input type="checkbox" name="rememberme" value="1" tabindex="6"><span>Tự động đăng nhập</span>
                </label>
            </p>
            <div class="form-input">
                <input class="btn btn-submit" type="submit" name="form-submitted" value="Đăng nhập" tabindex="7">
            </div>
        </div>
    </form>
</div>
<!-- CLOSE CONTENT-->
<?php include('footer-login.php'); ?>