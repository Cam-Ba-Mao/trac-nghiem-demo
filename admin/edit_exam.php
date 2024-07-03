<?php
// edit_exam.php

session_start();
include(__DIR__ . '/../config/config.php');

// Kiểm tra vai trò của người dùng
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

// Xử lý chỉnh sửa đề thi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['edit_exam'])) {
    $id = $_POST['id'];
    $exam_name = $_POST['exam_name'];
    $exam_time = $_POST['exam_time'];

    $query = "UPDATE exams SET exam_name = '$exam_name', exam_time = '$exam_time' WHERE id = $id";
    if (mysqli_query($conn, $query)) {
        $success_message = "Chỉnh sửa đề thi thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Lấy thông tin đề thi cần sửa từ cơ sở dữ liệu
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $query = "SELECT id, exam_name,exam_time FROM exams WHERE id = $id";
    $result = mysqli_query($conn, $query);
    $exam = mysqli_fetch_assoc($result);
}

$title = "Sửa đề thi";

include(__DIR__ . '/../header.php');

?>
    <h1>Sửa đề thi</h1>

    <?php if (isset($success_message)) { echo "<p style='color: green;'>$success_message</p>"; } ?>
    <?php if (isset($error_message)) { echo "<p style='color: red;'>$error_message</p>"; } ?>

    <form method="POST">
        <input type="hidden" name="id" value="<?php echo $exam['id']; ?>">
        Tên đề thi: <input type="text" name="exam_name" value="<?php echo $exam['exam_name']; ?>" required><br>
        Thời gian làm bài: <input type="number" name="exam_time" value="<?php echo $exam['exam_time']; ?>" required><br>
        <input type="submit" name="edit_exam" value="Lưu">
    </form>

    <p><a href="manage_exams.php">Quay lại</a></p>
<?php include(__DIR__ . '/../footer.php');
