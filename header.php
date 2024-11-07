<?php
    include(__DIR__ .'/config/config.php');
    $role = '';

    if(!empty($_SESSION['role']) ){
        $role = $_SESSION['role'];
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#fdc226">
    <meta name="format-detection" content="telephone=no">
    <meta property="og:url" content="https://trac-nghiem.io.vn/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Website thi trắc nghiệm">
    <link href="https://trac-nghiem.io.vn/" rel="canonical">
    <link href="https://trac-nghiem.io.vn/" rel="alternate" media="handheld">
    <meta name="robots" content="index,follow">
    <title>Website thi trắc nghiệm</title>
    <!-- Favicon-->
    <link rel="icon" href="<?php echo BASE_URL; ?>/html/dist/images/favicon.png">
    <!-- Bootstrap-->
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/css/bootstrap.min.css">
    <!-- Plugins style-->
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/css/bundle.min.css">
    <!-- Template syle-->
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/css/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <!-- Admin bar demo ( Not include )-->
    <style>
        .admin-bar-html {
            margin-top: 40px !important;
        }

        @media screen and (max-width: 782px) {
            .admin-bar-html {
                margin-top: 46px !important;
            }
        }

        <?php if ($role=='admin'): ?>
            html {
                margin-top: 40px !important;
            }

            ul {
                padding: 0;
                margin: 0;
                list-style: none;
            }

            .bm-adminbar {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                top: 0;
                left: 0;
                width: 100%;
                height: 40px;
                z-index: 999;
                color: #eeeeee;
                position: fixed;
                font-size: 14px;
                font-weight: 400;
                background: #1d2327;
                line-height: 1.42857143;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                height: 40px;
            }

            .bm-adminbar .fa-solid {
                font-size: 16px;
            }

            @media screen and (max-width: 767px) {
                .bm-adminbar .fa-solid {
                    font-size: 20px;
                }

                .bm-adminbar .title {
                    display: none;
                }
            }

            .bm-adminbar__left,
            .bm-adminbar__right {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
            }

            .bm-adminbar__left>ul>li,
            .bm-adminbar__right>ul>li {
                float: left;
                position: relative;
            }

            .bm-adminbar__left>ul>li:hover,
            .bm-adminbar__right>ul>li:hover {
                background: #32373c;
            }

            .bm-adminbar__left>ul>li>a,
            .bm-adminbar__right>ul>li>a {
                color: #eeeeee;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-transition: all 0.3s ease;
                transition: all 0.3s ease;
                gap: 10px;
                padding: 0 10px;
                min-height: 40px;
            }

            @media screen and (max-width: 767px) {

                .bm-adminbar__left>ul>li>a,
                .bm-adminbar__right>ul>li>a {
                    min-height: 40px;
                }
            }

            .bm-adminbar__left>ul>li>a img,
            .bm-adminbar__right>ul>li>a img {
                display: block;
                overflow: hidden;
                -o-object-fit: cover;
                object-fit: cover;
                border-radius: 50%;
                width: 22px !important;
                height: 22px !important;
            }

            .bm-adminbar__left>ul>li>a:hover,
            .bm-adminbar__right>ul>li>a:hover {
                color: #72aee6;
                background: #32373c;
            }

            .bm-adminbar__left>ul>li>ul,
            .bm-adminbar__right>ul>li>ul {
                border: 0;
                margin: 0;
                padding: 6px 0;
                color: #eeeeee;
                border-radius: 0;
                -webkit-box-shadow: none;
                box-shadow: none;
                background: #32373c;
                position: absolute;
                top: 100%;
                left: 0;
                z-index: 1000;
                display: none;
                float: left;
                min-width: 160px;
                width: 100%;
                font-size: 14px;
                text-align: left;
                list-style: none;
            }

            .bm-adminbar__left>ul>li>ul a,
            .bm-adminbar__right>ul>li>ul a {
                padding: 5px 10px;
                font-weight: 400;
                line-height: 1.42857143;
                color: #ffffff;
                white-space: nowrap;
                gap: 8px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
            }

            .bm-adminbar__left>ul>li>ul a:hover,
            .bm-adminbar__right>ul>li>ul a:hover {
                color: #72aee6;
                background: none;
            }

        <?php endif; ?>
    </style>
   
    <script src="<?php echo BASE_URL; ?>/html/dist/js/jquery.min.js"></script>
</head>

<body class="<?= !empty($class) ?  $class : '' ?>">
    <div class="bm-container">

        <?php if ($role == 'admin'): ?>
        <div class="bm-adminbar">
            <div class="bm-adminbar__left">
                <ul dropdown>
                    <li> 
                        <a class="bm-collapse-menu-mobile d-md-none" href="javascript:void(0)">
                            <i class="fa-solid fa-bars"></i>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo BASE_URL; ?>/bm-admin"> 
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
                            // Chuẩn bị dữ liệu và điều kiện
                            $data = [$user_id]; // Truyền user_id vào mảng data để làm tham số cho câu lệnh WHERE
                            $conditions = "WHERE id = ?"; // Điều kiện WHERE với tham số

                            // Thực thi câu lệnh SELECT và truyền vào user_id
                            $result = executeQuery($conn, 'SELECT', 'users', $data, $conditions);
                            if (!empty($result)) {
                                $user = $result[0]; // Giả sử có ít nhất 1 kết quả trả về
                                $avatar = $user['avatar'] ? BASE_URL . '/assets/upload/' . $user['avatar'] :  BASE_URL . '/html/dist/images/default-avatar.png';  
                            }
                        ?>
                        <li>
                            <a href="#">Chào, <?php echo $_SESSION['display_name']; ?> 
                            <img src="<?php echo $avatar; ?>" alt="<?php echo $_SESSION['display_name']; ?>"></a>
                            <ul class="dropdown-menu">
                                <li><a href="#"><i class="fa fa-user"></i>Sửa hồ sơ</a></li>
                                <li><a href="<?php echo BASE_URL; ?>/logout.php"><i class="fa fa-sign-out"></i>Đăng xuất</a></li>
                            </ul>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
        <script>
            // Lấy tất cả các phần tử li bên trong các phần tử có thuộc tính "dropdown"
            document.querySelectorAll('[dropdown] > li').forEach(function (item) {
                item.addEventListener('mouseenter', function () {
                    // Hiển thị ul bên trong phần tử hiện tại khi hover
                    const dropdownMenu = item.querySelector('ul');
                    if (dropdownMenu) dropdownMenu.style.display = 'block';
                    item.classList.add('active');
                    console.log('aaaaaaaaaa');
                });

                item.addEventListener('mouseleave', function () {
                    // Ẩn ul khi chuột rời khỏi phần tử
                    const dropdownMenu = item.querySelector('ul');
                    if (dropdownMenu) dropdownMenu.style.display = 'none';
                    item.classList.remove('active');
                });
            });

        </script>
        <?php endif; ?>
        <!-- START HEADER-->
        <header class="bm-header">
            <div class="container">
                <div class="bm-header__wrap">
                    <div class="bm-header__brand">
                        <a href="#">
                            <img class="is-color" src="<?php echo BASE_URL; ?>/html/dist/images/Logo_TDMU_2024_nguyen_ban.svg" alt="">
                            <img class="is-white" src="<?php echo BASE_URL; ?>/html/dist/images/Logo_TDMU_2024_nguyen_ban_Trang.svg" alt="">
                        </a>
                    </div>
                    <div class="bm-header__right">
                        <?php if (isset($title) && $title == "Làm bài thi"): ?>
                        <div class="bm-header__take-exam-time">
                            <span>Thời gian làm bài:</span>
                            <div class="time-to-do" id="timer">
                                <?php echo $exam['exam_time'] . ":00"; ?>
                            </div>
                        </div>
                        <?php endif; ?>
                        <?php if (isset($_SESSION['user_id'])): ?>
                        <?php
                            $user_id = $_SESSION['user_id'];
                            $queryAvatar = "SELECT avatar FROM users WHERE id = $user_id";
                            $resultAvatar = mysqli_query($conn, $queryAvatar);
                            $user = mysqli_fetch_assoc($resultAvatar);
                            $avatar = $user['avatar'] ? $user['avatar'] : 'default-avatar.png';     
                        ?>
                        <div class="avatar-container">
                            <div class="avatar-container__image">
                                <img src="<?php echo BASE_URL; ?>/assets/upload/<?php echo $avatar; ?>" alt="Avatar" class="avatar">
                            </div>
                            <div id="dropdownMenu" class="dropdown-menu">
                                <a href="<?php echo BASE_URL; ?>/request_password_change.php">Đổi mật khẩu</a>
                                <a href="<?php echo BASE_URL; ?>/upload_avatar.php">Đổi avatar</a>
                                <a href="<?php echo BASE_URL; ?>/logout.php">Đăng xuất</a>
                                <!-- Other menu items if needed -->
                            </div>
                        </div>    
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </header>
        <!-- CLOSE HEADER-->
        <!-- START CONTENT-->
        <main class="bm-content">