<?php
// index.php

session_start();
include('./config/config.php');

// Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
if (!isset($_SESSION['user_id'])) {
    header("Location: dang-nhap");
    exit();
}

// Kiểm tra vai trò của người dùng
$role = $_SESSION['role'];

// Thiết lập tiêu đề cho trang
$title = "Trang chính";

include('header.php');

?>
    <div class="wrapper">
        <div class="admin-menu expanded">
            <div class="menu-toggle">☰</div>
            <?php if ($role == 'admin'): ?>
                <ul>
                    <li><a href="./admin/manage_students.php"><span>Quản lý học sinh</span></a></li>
                    <li><a href="./admin/manage_questions.php"><span>Quản lý câu hỏi</span></a></li>
                    <li><a href="./admin/manage_exams.php"><span>Quản lý đề thi</span></a></li>
                    <li><a href="./admin/exam_questions.php"><span>Quản lý câu hỏi cho từng đề thi</span></a></li>
                </ul>
            <?php else: ?>
                <ul>
                    <li><a href="./student/exams.php">Làm bài thi</a></li>
                    <li><a href="./student/list-results.php">Xem kết quả</a></li>
                </ul>
            <?php endif; ?>
        </div>
        <div class="content">
            <?php if ($role == 'admin'): ?>
                <h1>Welcome to Admin Dashboard</h1>
            <?php else: ?>
                <h1>Welcome to Student Dashboard</h1>
            <?php endif; ?>
            <section class="tdmu-home-page">
                <p class="tdmu-title">Chào mừng, <?php echo $_SESSION['username']; ?>!</p>
                <p><a href="logout.php" class="logout-btn">Đăng xuất</a></p>
            </section>
        </div>
    </div>
<?php include('footer.php'); ?>
