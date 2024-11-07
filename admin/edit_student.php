<?php
// edit_student.php

session_start();
include(__DIR__ . '/../config/config.php');

// Kiểm tra vai trò của người dùng
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

// Xử lý chỉnh sửa học sinh
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['edit_student'])) {
    $id = $_POST['id'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "UPDATE users SET username = '$username'";
    if (!empty($password)) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $query .= ", password = '$hashed_password'";
    }
    $query .= " WHERE id = $id";

    if (mysqli_query($conn, $query)) {
        $success_message = "Chỉnh sửa học sinh thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Lấy thông tin học sinh cần sửa từ cơ sở dữ liệu
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $query = "SELECT id, username FROM users WHERE id = $id";
    $result = mysqli_query($conn, $query);
    $student = mysqli_fetch_assoc($result);
}

$title = "Sửa học sinh";

include('header.php');
?>
    <div class="bm-admin-title">
        <h1>Sửa học sinh</h1>
    </div>
    <div class="bm-admin-content">
        <?php if (isset($success_message)) { echo "<p style='color: green;'>$success_message</p>"; } ?>
        <?php if (isset($error_message)) { echo "<p style='color: red;'>$error_message</p>"; } ?>

        <form method="POST">
            <input type="hidden" name="id" value="<?php echo $student['id']; ?>">
            Tên đăng nhập: <input type="text" class="form-control regular-text" name="username" value="<?php echo $student['username']; ?>" required><br>
            Mật khẩu mới: <input type="password" class="form-control regular-text" name="password" placeholder="Để trống nếu không muốn thay đổi"><br>
            <input type="submit" class="button btn-submit" name="edit_student" value="Lưu">
        </form>

        <p><a href="manage_students.php">Quay lại</a></p>
    </div>
<?php include('footer.php'); ?>
