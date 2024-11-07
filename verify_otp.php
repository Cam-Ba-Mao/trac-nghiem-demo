<?php
// verify_otp.php
session_start();
require_once './config/config.php'; 

// Kiểm tra nếu OTP không tồn tại
if (!isset($_SESSION['otp'])) {
    header("Location: request_password_change.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $otp = $_POST['otp'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];

    if ($otp == $_SESSION['otp'] && (time() - $_SESSION['otp_time']) < 300) {
        if ($new_password == $confirm_password) {
            $user_id = $_SESSION['user_id'];
            $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

            $query = "UPDATE users SET password = '$hashed_password' WHERE id = $user_id";
            if (mysqli_query($conn, $query)) {
                unset($_SESSION['otp']);
                unset($_SESSION['otp_time']);
                unset($_SESSION['user_id']);
                header("Location: login.php");
                exit();
            } else {
                $error = "Cập nhật mật khẩu thất bại: " . mysqli_error($conn);
                error_log('Database update failed: ' . mysqli_error($conn));
            }
        } else {
            $error = "Mật khẩu không khớp.";
        }
    } else {
        $error = "OTP không hợp lệ hoặc đã hết hạn.";
    }
}

$title = "Xác Thực OTP";
include('header.php');
?>
    <section class="bm-verify-otp">
        <div class="container">
            <div class="bm-verify-otp__wrap">
                <h2><?= $title; ?></h2>
                <?php if (isset($error)) { echo "<p>$error</p>"; } ?>
                <form action="verify_otp.php" method="POST">
                    <div class="bm-form-group">
                        <label class="bm-form-label" for="otp">Mã OTP:</label>
                        <input class="bm-form-control" type="text" id="otp" name="otp" placeholder="" required/>
                    </div>
                    <div class="bm-form-group">
                        <label class="bm-form-label" for="new_password">Mật khẩu mới:</label>
                        <input class="bm-form-control" type="text" id="new_password" name="new_password" placeholder="" required/>
                    </div>
                    <div class="bm-form-group">
                        <label class="bm-form-label" for="confirm_password">Xác nhận mật khẩu:</label>
                        <input class="bm-form-control" type="text" id="confirm_password" name="confirm_password" placeholder="" required/>
                    </div>
                    <div class="bm-form-group"> 
                        <button class="bm-btn bm-btn-primary" type="submit">Xác thực</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
 
<?php include('footer.php'); ?>