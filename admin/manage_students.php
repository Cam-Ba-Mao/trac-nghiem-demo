<?php
// manage_students.php

session_start();
include(__DIR__ . '/../config/config.php');

// Kiểm tra vai trò của người dùng
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

// Xử lý thêm học sinh
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['add_student'])) {
    $username = $_POST['username'];
    $password = $_POST['password']; // Bạn cần mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    $role = 'student'; // Vai trò mặc định là student

    $query = "INSERT INTO users (username, password, role) VALUES ('$username', '$password', '$role')";
    if (mysqli_query($conn, $query)) {
        $success_message = "Thêm học sinh thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Xử lý xóa học sinh
if (isset($_GET['delete_id'])) {
    $delete_id = $_GET['delete_id'];

    $query = "DELETE FROM users WHERE id = $delete_id";
    if (mysqli_query($conn, $query)) {
        $success_message = "Xóa học sinh thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Lấy danh sách học sinh từ cơ sở dữ liệu
$query = "SELECT id, username FROM users WHERE role = 'student'";
$result = mysqli_query($conn, $query);
$index = 1;

$title = "Quản lý học sinh";

// include(__DIR__ . '/../header.php');

include('header.php');
?>
    <div class="bm-admin-title">
        <h1>Quản lý học sinh</h1>
    </div>
    <div class="bm-admin-content">
        <!-- Form thêm học sinh -->
        <form method="POST" class="admin-tablelist">
            <h2>Thêm học sinh</h2>
            Tên đăng nhập: <input type="text" class="form-control regular-text" name="username" required><br>
            Mật khẩu: <input type="password" class="form-control regular-text" name="password" required><br>
            <input type="submit" class="button btn-submit" name="add_student" value="Thêm">
        </form>

        <?php if (isset($success_message)) { echo "<p style='color: green;'>$success_message</p>"; } ?>
        <?php if (isset($error_message)) { echo "<p style='color: red;'>$error_message</p>"; } ?>

        <!-- Danh sách học sinh -->
        <h2>Danh sách học sinh</h2>
        <table class="table-list" id="manage">
            <tr>
                <th class="manage-column">ID</th>
                <th class="manage-column">Tên đăng nhập</th>
                <th class="manage-column">Thao tác</th>
            </tr>
            <?php while ($row = mysqli_fetch_assoc($result)) { ?>
                <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['username']; ?></td>
                    <td>
                        <a href="edit_student.php?id=<?php echo $row['id']; ?>">Sửa</a> | 
                        <a href="manage_students.php?delete_id=<?php echo $row['id']; ?>" onclick="return confirm('Bạn có chắc chắn muốn xóa học sinh này?');">Xóa</a>
                    </td>
                </tr>
            <?php $index++; } ?>
        </table>
    </div>

    
<?php include('footer.php');