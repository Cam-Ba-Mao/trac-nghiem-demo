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
        <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/css/bundle.min.css">
        <!-- Template syle-->
        <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/admin/css/admin.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
        <!-- Jquery-->
        <script src="<?php echo BASE_URL; ?>/html/dist/js/jquery.min.js"></script>
    </head>
    <body class="<?= !empty($class) ?  $class : '' ?>">
        <!-- START HEADER-->
        <div class="bm-admin-navbar">
            <ul dropdown>
                <li> <a class="bm-collapse-menu-mobile d-md-none" href="javascript:void(0)"><i class="fa-solid fa-bars"></i></a></li>
                <li><a href="./bm-index.html"><i class="fa-solid fa-home"></i><span class="title name-web">ANOTHER WEBSITE</span></a></li>
                <li><a href="#"><i class="fa-solid fa-comment"></i>1</a></li>
                <li><a href="./bm-new-posts.html"><i class="fa-solid fa-plus"></i><span class="title">Tạo mới</span></a>
                    <ul>
                        <li><a href="./bm-new-post.html">Bài viết</a></li>
                        <li><a href="#">Trang</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="my-account" dropdown>
                <?php if (isset($_SESSION['user_id'])): ?>
                    <?php
                        $user_id = $_SESSION['user_id'];
                        $queryAvatar = "SELECT avatar FROM users WHERE id = $user_id";
                        $resultAvatar = mysqli_query($conn, $queryAvatar);
                        $user = mysqli_fetch_assoc($resultAvatar);
                        $avatar = $user['avatar'] ? BASE_URL . '/assets/upload/' . $user['avatar'] :  BASE_URL . '/html/dist/images/default-avatar.png';     
                    ?>
                    <li> 
                        <a class="my-account__nav" href="#">
                            <span class="title">Xin chào, <?php echo $_SESSION['display_name']; ?> </span>
                            <img src="<?php echo $avatar; ?>" alt="avatar">
                        </a>
                        <ul class="my-account__dropdown">
                            <li class="info-user">
                                <a href="#"> 
                                    <img src="<?php echo $avatar; ?>" alt="avatar">
                                    <span class="title"><?php echo $_SESSION['display_name']; ?> </span>
                                    <span class="edit-profile">Edit Profile </span>
                                </a>
                            </li>
                            <li class="logout">
                                <a href="logout.php">Đăng xuất</a>
                            </li>
                        </ul>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
        <!-- CLOSE HEADER-->
        <!-- START SIDEBAR-->
        <div class="bm-admin-sidebar">
            <ul>
                <li><a href="./bm-index.html"><i class="fa-solid fa-tachometer"></i><span class="title">Trang quản trị</span></a></li>
                <li class="active"><a href="./bm-posts.html"><i class="fa-solid fa-thumb-tack"></i><span class="title">Bài viết</span></a>
                    <ul class="sub-menu">
                        <li class="active"><a href="./bm-posts.html">Tất cả bài viết</a></li>
                        <li><a href="./bm-new-post.html">Thêm bài viết</a></li>
                        <li><a href="./bm-category.html">Danh mục</a></li>
                        <li><a href="./bm-tag.html">Thẻ</a></li>
                    </ul>
                </li>
                <li><a href="#"><i class="fa-solid fa-file-image"></i><span class="title">Media<span class="pending-count">45</span></span></a></li>
                <li><a href="./bm-pages.html"><i class="fa-solid fa-file"></i><span class="title">Trang</span></a>
                    <ul class="sub-menu">
                        <li class="active"><a href="./bm-pages.html">Tất cả các Trang</a></li>
                        <li><a href="./bm-new-page.html">Thêm trang mới</a></li>
                    </ul>
                </li>
                <li><a href="#"><i class="fa-solid fa-comment"></i><span class="title">Bình luận</span></a></li>
                <li><a href="./bm-theme.html"><i class="fa-solid fa-paintbrush"></i><span class="title">Giao diện</span></a>
                    <ul class="sub-menu">
                        <li class="active"><a href="./bm-theme.html">Giao diện</a></li>
                        <li><a href="./bm-menu.html">Menu   </a></li>
                    </ul>
                </li>
                <li><a href="#"><i class="fa-solid fa-plug"></i><span class="title">Plugin</span></a>
                    <ul class="sub-menu">
                        <li><a href="#">Plugin đã cài đặt</a></li>
                        <li><a href="#">Cài Plugin</a></li>
                        <li><a href="#">Sửa tệp tin Plugin</a></li>
                    </ul>
                </li>
                <li><a href="#"><i class="fa-solid fa-wrench"></i><span class="title">Công cụ</span></a></li>
                <li><a href="./bm-seo.html"><i class="fa-brands fa-superpowers"></i><span class="title">SEO</span></a>
                    <ul class="sub-menu">
                        <li><a href="./bm-seo.html">Hiển thị khi tìm kiếm</a></li>
                        <li><a href="./bm-sitemap.html">XML Sitemaps</a></li>
                        <li><a href="./bm-redirects.html">Redirects</a></li>
                    </ul>
                </li>
                <li><a href="./bm-user.html"><i class="fa-solid fa-user"></i><span class="title">Thành viên</span></a>
                    <ul class="sub-menu">
                        <li><a href="./bm-user.html">Tất cả người dùng</a></li>
                        <li><a href="./bm-add-user.html">Thêm mới</a></li>
                        <li><a href="./bm-edit-user.html">Hồ sơ</a></li>
                    </ul>
                </li>
                <li><a href="./bm-settings.html"><i class="fa-solid fa-cog"></i><span class="title">Cài đặt</span></a></li>
                <li class="line"><span></span></li><a class="bm-collapse-admin-menu" href="#"><i class="fa-solid fa-arrow-circle-left"></i><span class="title">Thu gọn menu</span></a>
            </ul>
        </div>
        <!-- CLOSE SIDEBAR-->
        <!-- START CONTENT-->
        <main class="bm-admin-wrap">