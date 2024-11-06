<?php
    include(dirname(__DIR__) . '/config/config.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">
        <title>Trang quản trị</title>
        <!-- Favicon-->
        <link rel="icon" href="<?php echo BASE_URL; ?>/html/dist/images/favicon.png">
        <!-- Bootstrap-->
        <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/css/bootstrap.min.css">
        <!-- Plugins style-->
        <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/admin/css/bundle.min.css">
        <!-- Template syle-->
        <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/admin/css/admin.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
        <!-- Jquery-->
        <script src="<?php echo BASE_URL; ?>/html/dist/js/jquery.min.js"></script>
    </head>
    <body class="<?= !empty($class) ?  $class : '' ?>">
        <!-- START HEADER-->
        <div class="bm-adminbar">
            <div class="bm-adminbar__left">
                <ul dropdown>
                    <li> 
                        <a class="bm-collapse-menu-mobile d-md-none" href="javascript:void(0)">
                            <i class="fa-solid fa-bars"></i>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo BASE_URL; ?>/trang-chu"> 
                            <i class="fa-solid fa-home"></i>
                            <span class="title">Trắc nghiệm demo</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Bảng tin</a></li>
                            <li><a href="#">Giao diện</a></li>
                            <li><a href="#">Menus</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"> 
                            <i class="fa-solid fa-plus"></i>
                            <span class="title">Tạo Mới</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Trang</a></li>
                            <li><a href="#">Bài viết</a></li>
                            <li><a href="#">Sản phẩm</a></li>
                            <li><a href="#">Bảng giá</a></li>
                        </ul>
                    </li>
                    <li>
                        <a class="bm-adminbar-edit" href="#"> 
                            <i class="fa-solid fa-pen"> </i>
                            <span class="title">Sửa trang</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="bm-adminbar__right">
                <ul dropdown>
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <?php
                            $user_id = $_SESSION['user_id'];
                            $queryAvatar = "SELECT avatar FROM users WHERE id = $user_id";
                            $resultAvatar = mysqli_query($conn, $queryAvatar);
                            $user = mysqli_fetch_assoc($resultAvatar);
                            $avatar = $user['avatar'] ? BASE_URL . '/assets/upload/' . $user['avatar'] :  BASE_URL . '/html/dist/images/default-avatar.png';     
                        ?>
                        <li>
                            <a href="#">Chào, <?php echo $_SESSION['display_name']; ?> <img src="<?php echo $avatar; ?>" alt="<?php echo $_SESSION['display_name']; ?>"></a>
                            <ul class="dropdown-menu">
                                <li><a href="#"><i class="fa fa-user"></i>Sửa hồ sơ</a></li>
                                <li><a href="./logout.php"><i class="fa fa-sign-out"></i>Đăng xuất</a></li>
                            </ul>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
        <!-- CLOSE HEADER-->
        <!-- START SIDEBAR-->
        <?php
            // Lấy URL hiện tại
            $current_page = basename($_SERVER['PHP_SELF']);
            // dd($current_page);
        ?>
        <div class="bm-admin-sidebar">
            <ul>
                <li class="<?= $current_page == 'index.php' ? 'active' : '' ?>">
                    <a href="<?php echo BASE_URL; ?>/bm-admin">
                        <i class="fa-solid fa-tachometer"></i>
                        <span class="title">Trang quản trị</span>
                    </a>
                </li>
                <li>
                    <a href="./bm-posts.html">
                        <i class="fa-solid fa-thumb-tack"></i>
                        <span class="title">Bài viết</span>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <a href="./bm-posts.html">Tất cả bài viết</a>
                        </li>
                        <li>
                            <a href="./bm-new-post.html">Thêm bài viết</a>
                        </li>
                        <li>
                            <a href="./bm-category.html">Danh mục</a>
                        </li>
                        <li>
                            <a href="./bm-tag.html">Thẻ</a>
                        </li>
                    </ul>
                </li>
                <li class="<?= $current_page == 'manage_students.php' ? 'active' : '' ?>">
                    <a href="<?php echo BASE_URL; ?>/admin/manage_students.php">
                        <i class="fa-solid fa-file-image"></i>
                        <span class="title">Quản lý học sinh</span>
                    </a>                    
                </li>
                <li class="<?= $current_page == 'manage_questions.php' ? 'active' : '' ?>">
                    <a href="<?php echo BASE_URL; ?>/admin/manage_questions.php">
                        <i class="fa-solid fa-file-image"></i>
                        <span class="title">Quản lý câu hỏi</span>
                    </a>                    
                </li>
                <li class="<?= $current_page == 'manage_exams.php' ? 'active' : '' ?>">
                    <a href="<?php echo BASE_URL; ?>/admin/manage_exams.php">
                        <i class="fa-solid fa-file-image"></i>
                        <span class="title">Quản lý đề thi</span>
                    </a>                    
                </li>
                <li class="<?= $current_page == 'exam_questions.php' ? 'active' : '' ?>">
                    <a href="<?php echo BASE_URL; ?>/admin/exam_questions.php">
                        <i class="fa-solid fa-file-image"></i>
                        <span class="title">Quản lý câu hỏi cho từng đề thi</span>
                    </a>                    
                </li>
                <li>
                    <a href="#">
                        <i class="fa-solid fa-file-image"></i>
                        <span class="title">Media<span class="pending-count">45</span></span>
                    </a>
                </li>
                <li>
                    <a href="./bm-pages.html">
                        <i class="fa-solid fa-file"></i>
                        <span class="title">Trang</span>
                    </a>
                    <ul class="sub-menu">
                        <li class="active">
                            <a href="./bm-pages.html">Tất cả các Trang</a>
                        </li>
                        <li>
                            <a href="./bm-new-page.html">Thêm trang mới</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i class="fa-solid fa-comment"></i>
                        <span class="title">Bình luận</span>
                    </a>
                </li>
                <li>
                    <a href="./bm-theme.html">
                        <i class="fa-solid fa-paintbrush"></i>
                        <span class="title">Giao diện</span>
                    </a>
                    <ul class="sub-menu">
                        <li class="active">
                            <a href="./bm-theme.html">Giao diện</a>
                        </li>
                        <li>
                            <a href="./bm-menu.html">Menu</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i class="fa-solid fa-plug"></i>
                        <span class="title">Plugin</span>
                    </a>
                    <ul class="sub-menu">
                        <li><a href="#">Plugin đã cài đặt</a></li>
                        <li><a href="#">Cài Plugin</a></li>
                        <li><a href="#">Sửa tệp tin Plugin</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i class="fa-solid fa-wrench"></i>
                        <span class="title">Công cụ</span>
                    </a>
                </li>
                <li>
                    <a href="./bm-seo.html">
                        <i class="fa-brands fa-superpowers"></i>
                        <span class="title">SEO</span>
                    </a>
                    <ul class="sub-menu">
                        <li><a href="./bm-seo.html">Hiển thị khi tìm kiếm</a></li>
                        <li><a href="./bm-sitemap.html">XML Sitemaps</a></li>
                        <li><a href="./bm-redirects.html">Redirects</a></li>
                    </ul>
                </li>
                <li>
                    <a href="./bm-user.html">
                        <i class="fa-solid fa-user"></i>
                        <span class="title">Thành viên</span>
                    </a>
                    <ul class="sub-menu">
                        <li><a href="./bm-user.html">Tất cả người dùng</a></li>
                        <li><a href="./bm-add-user.html">Thêm mới</a></li>
                        <li><a href="./bm-edit-user.html">Hồ sơ</a></li>
                    </ul>
                </li>
                <li>
                    <a href="./bm-settings.html">
                        <i class="fa-solid fa-cog"></i>
                        <span class="title">Cài đặt</span>
                    </a>
                </li>
                <li class="line"><span></span></li>
                <a class="bm-collapse-admin-menu" href="#">
                    <i class="fa-solid fa-arrow-circle-left"></i>
                    <span class="title">Thu gọn menu</span>
                </a>
            </ul>
        </div>
        <!-- CLOSE SIDEBAR-->
        <!-- START CONTENT-->
        <main class="bm-admin-wrap">