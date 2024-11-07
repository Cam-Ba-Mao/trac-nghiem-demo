<!-- request_password_change.php -->
<?php
session_start();
include('./config/config.php');
include('./config/otp.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];

    // Tìm người dùng theo email
    $query = "SELECT id FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);
    $user = mysqli_fetch_assoc($result);

    if ($user) {
        $otp = generateOTP();
        $_SESSION['otp'] = $otp;
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['otp_time'] = time();

        if (sendOTPEmail($email, $otp)) {
            header("Location: verify_otp.php");
        } else {
            $error = "Gửi OTP thất bại.";
        }
    } else {
        $error = "Không tìm thấy người dùng với email này.";
    }
}

$title = "Yêu Cầu Thay Đổi Mật Khẩu";

include('header.php');
?>
    <section class="bm-request-password-change">
        <div class="container">
            <div class="bm-request-password-change__wrap">
                <h2><?= $title; ?></h2>
                <div class="bm-request-password-change__desc">Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn mã OTP để đặt lại mật khẩu.</div>
                <form method="POST">
                    <div class="bm-form-group">
                        <label class="bm-form-label" for="email-password-change">Email</label>
                        <input class="bm-form-control" type="text" id="email-password-change" name="email" required placeholder=""/>
                    </div>
                    <div class="bm-form-group"> 
                        <button class="bm-btn bm-btn-primary" type="submit">Gửi OTP</button>
                    </div>
                </form>
                <?php if (isset($error)) echo "<p class='invalid-message'>$error</p>"; ?>
            </div>
        </div>
    </section>
<?php include('footer.php'); ?>