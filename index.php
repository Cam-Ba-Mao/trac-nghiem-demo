<?php
// index.php

session_start();
include('./config/config.php');

// Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Kiểm tra vai trò của người dùng
$role = $_SESSION['role'];

// Thiết lập tiêu đề cho trang
$title = "Trang chính";

include('header.php');

?>
    <h1>Chào mừng, <?php echo $_SESSION['username']; ?>!</h1>

    <?php if ($role == 'admin'): ?>
        <h2>Trang quản trị viên</h2>
        <ul>
            <li><a href="./admin/manage_students.php">Quản lý học sinh</a></li>
            <li><a href="./admin/manage_questions.php">Quản lý câu hỏi</a></li>
            <li><a href="./admin/manage_exams.php">Quản lý đề thi</a></li>
            <li><a href="./admin/exam_questions.php">Quản lý câu hỏi cho từng đề thi</a></li>
        </ul>
    <?php else: ?>
        <h2>Trang học sinh</h2>
        <ul>
            <li><a href="./student/exams.php">Làm bài thi</a></li>
            <li><a href="./student/list-results.php">Xem kết quả</a></li>
        </ul>
    <?php endif; ?>

    <p><a href="logout.php">Đăng xuất</a></p>

<?php include('footer.php'); ?>
