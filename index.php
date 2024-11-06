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
            <ul>
                <li><a href="./student/exams.php">Làm bài thi</a></li>
                <li><a href="./student/list-results.php">Xem kết quả</a></li>
            </ul>
        </div>
        <div class="content">
            <h1>Welcome to Student Dashboard</h1>
            <section class="bm-home-page">
                <p class="bm-title">Chào mừng, <?php echo $_SESSION['username']; ?>!</p>
                <p><a href="logout.php" class="logout-btn">Đăng xuất</a></p>
            </section>
        </div>
    </div>
<?php include('footer.php'); ?>
