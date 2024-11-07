<?php
// index.php

session_start();
include('./config/config.php');

$is_IM = include 'config/connect.php';

if ($is_IM->INSTALL_MODE) {
    header("Refresh:0; url=install.php");
} 

// Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
if (!isset($_SESSION['user_id'])) {
    header("Location: dang-nhap");
    exit();
}

// Kiểm tra vai trò của người dùng
$role = $_SESSION['role'];

// Thiết lập tiêu đề cho trang
$title = "Trang chính";
$class = "page-template-home";

include('header.php');

// Thực hiện truy vấn SELECT lấy tất cả các bản ghi từ bảng exams
$result = executeQuery($conn, 'SELECT', 'exams');

?>
    <section class="bm-home"> 
        <div class="container"> 
            <div class="bm-home__welcome"> 
                <h1>Chào mừng, <?php echo $_SESSION['username']; ?>!</h1>
            </div>
            <div class="bm-home__menu"> 
                <ul> 
                    <li> <a href="./student/exams.php">Làm bài thi</a></li>
                </ul>
            </div>
            <div class="bm-home__exam">
                <h2>Danh sách kết quả đề thi</h2>
                <?php if(!empty($result)): ?>
                <ul> 
                    <?php foreach( $result as $exam ): ?>
                    <li><a href="results.php?exam_id=<?php echo $exam['id']; ?>"><?php echo $exam['exam_name']; ?></a></li>
                    <?php endforeach; ?>
                </ul>
                <?php else: ?>
                    <p>Hiện chưa có kết quả bài thi nào</p>
                <?php endif; ?>
            </div>
        </div>
    </section>
<?php include('footer.php'); ?>
