<?php
    include(__DIR__ .'/config/config.php');
?>
<!-- https://fontawesome.com/v6/icons?o=r&m=free -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Title</title>
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
                margin-top: 32px !important;
            }
            
            @media screen and (max-width: 782px) {
                .admin-bar-html {
                    margin-top: 46px !important;
                }
            }
            
            #wpadminbar {
                direction: ltr;
                color: #ccc;
                font-size: 13px;
                font-weight: 400;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                height: 32px;
                line-height: 32px;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                min-width: 600px;
                z-index: 99999;
                background: #23282d;
                padding: 0 15px;
            }
            
            @media screen and (max-width: 782px) {
                html #wpadminbar {
                    height: 46px;
                    line-height: 46px;
                    min-width: 240px;
                }
            }
            
            @media screen and (max-width: 600px) {
                #wpadminbar {
                    position: absolute;
                }
            }
            
        </style>
        <script src="<?php echo BASE_URL; ?>/html/dist/js/jquery.min.js"></script>
    </head>
    <body class="<?= !empty($class) ?  $class : '' ?>">
        <div class="bm-container">
            <!-- START HEADER-->
            <header class="bm-header">
                <div class="bm-header__wrap"> 
                    <div class="container">
                        <div class="bm-header__mobile">
                            <a class="brand-logo d-lg-none" href="<?php echo BASE_URL; ?>/index.php">
                                <img class="is-color" src="<?php echo BASE_URL; ?>/html/dist/images/Logo_TDMU_2024_nguyen_ban.svg" alt="">
                                <img class="is-white" src="<?php echo BASE_URL; ?>/html/dist/images/Logo_TDMU_2024_nguyen_ban_Trang.svg" alt="">
                            </a>
                            <div class="group-cta is-mobile">
                                <div class="bm-header__language">
                                    <div class="dropdown">
                                        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><img class="lazy" data-src="<?php echo BASE_URL; ?>/html/dist/images/language-vi.png" alt=""></button>
                                        <ul class="dropdown-menu">
                                            <li class="lang-item-vi"><a href="#">VI</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="bm-header-toggler">
                                    <div class="bm-header-toggler__icon"><span></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="bm-header__desktop">
                            <div class="container">
                                <div class="bm-header__desktop--wrap">
                                    <a class="brand-logo d-none d-lg-block" href="<?php echo BASE_URL; ?>/index.php">
                                        <img class="is-color" src="<?php echo BASE_URL; ?>/html/dist/images/Logo_TDMU_2024_nguyen_ban.svg" alt="">
                                        <img class="is-white" src="<?php echo BASE_URL; ?>/html/dist/images/Logo_TDMU_2024_nguyen_ban_Trang.svg" alt="">
                                    </a>
                                    <div class="nav-menu">
                                        <ul> 
                                            <li> <a href="#gioi-thieu">Giới thiệu</a></li>
                                            <li> <a href="#news">Tin tức</a></li>
                                            <li> <a href="#tuyen-sinh">Tuyển sinh</a></li>
                                            <li> <a href="#dao-tao">Đào tạo</a></li>
                                            <li> <a href="#gallery">Tuyển dụng</a></li>
                                        </ul>
                                    </div>
                                    <?php if (isset($title) && $title == "Làm bài thi"): ?>
                                    <div class="bm-header__take-exam-time">
                                        <span>Thời gian làm bài:</span>
                                        <div class="time-to-do" id="timer">
                                            <?php echo $exam['exam_time'] . ":00"; ?>
                                        </div>
                                    </div>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <!-- CLOSE HEADER-->
            <!-- START CONTENT-->
            <main class="bm-content">