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
    <div class="tdmu-request-password-change">
        <h2><?= $title; ?></h2>
        <form method="POST">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group form-button">
                <button type="submit">Gửi OTP</button>
            </div>
        </form>
        <?php if (isset($error)) echo "<p>$error</p>"; ?>
    </div>
<?php include('footer.php'); ?>