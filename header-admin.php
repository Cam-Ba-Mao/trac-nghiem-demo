<?php
    include(__DIR__ .'/config/config.php');
?>
<!DOCTYPE html>
<html class="admin-panel" lang="en">
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
            <!-- START HEADER-->
            <div class="bm-admin-navbar">
                <ul dropdown>
                    <li><a href="#"><i class="fa-solid fa-home"></i><span class="title">ANOTHER WEBSITE</span></a></li>
                    <li><a href="#"><i class="fa-solid fa-comment"></i>1</a></li>
                    <li><a href="#"><i class="fa-solid fa-plus"></i><span class="title">New</span></a>
                        <ul>
                            <li><a href="./bm-new-post.html">New Post</a></li>
                            <li><a href="#">New Page</a></li>
                            <li><a href="#">New Category</a></li>
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
                        $avatar = $user['avatar'] ? $user['avatar'] :  BASE_URL . '/html/dist/images/default-avatar.png';     
                    ?>
                    <li> 
                        <a class="my-account__nav" href="#">
                            <span class="title">Xin chào, <?php echo $_SESSION['username']; ?> </span>
                            <img src="<?php echo BASE_URL; ?>/assets/upload/<?php echo $avatar; ?>" alt="avatar">
                        </a>
                        <ul class="my-account__dropdown">
                            <li class="info-user">
                                <a href="./bm-new-post.html"> 
                                    <img src="<?php echo BASE_URL; ?>/assets/upload/<?php echo $avatar; ?>" alt="avatar">
                                    <span class="title"><?php echo $_SESSION['username']; ?> </span>
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
            <div class="bm-admin-sidebar">
                <ul>
                    <li><a href="#"><i class="fa-solid fa-tachometer"></i><span class="title">Dashboard</span></a></li>
                    <li class="active"><a href="./bm-posts.html"><i class="fa-solid fa-thumb-tack"></i><span class="title">Posts</span></a>
                        <ul class="sub-menu">
                            <li class="active"><a href="./bm-posts.html">All Posts</a></li>
                            <li><a href="./bm-new-post.html">Add New</a></li>
                            <li><a href="#">Categories</a></li>
                            <li><a href="#">Tags</a></li>
                        </ul>
                    </li>
                    <li><a href="#"><i class="fa-solid fa-file-image"></i><span class="title">Media<span class="pending-count">45</span></span></a></li>
                    <li><a href="#"><i class="fa-solid fa-file"></i><span class="title">Pages</span></a></li>
                    <li>
                        <a href="./admin/manage_students.php">
                            <i class="fa-solid fa-file"></i>
                            <span class="title">Quản lý học sinh</span>
                        </a>
                    </li>
                    <li>
                        <a href="./admin/manage_questions.php">
                            <i class="fa-solid fa-file"></i>
                            <span class="title">Quản lý câu hỏi</span>
                        </a>
                    </li>
                    <li>
                        <a href="./admin/manage_exams.php">
                            <i class="fa-solid fa-file"></i>
                            <span class="title">Quản lý đề thi</span>
                        </a>
                    </li>
                    <li>
                        <a href="./admin/exam_questions.php">
                            <i class="fa-solid fa-file"></i>
                            <span class="title">Quản lý câu hỏi cho từng đề thi</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-solid fa-comment"></i>
                            <span class="title">Comments</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-solid fa-plug"></i>
                            <span class="title">Plugins</span>
                        </a>
                        <ul class="sub-menu">
                            <li><a href="#">Installed Plugins</a></li>
                            <li><a href="#">Add New</a></li>
                            <li><a href="#">Editor</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-solid fa-wrench"></i>
                            <span class="title">Tools</span>
                        </a>
                    </li>
                    <li>
                        <a href="./bm-settings.html">
                            <i class="fa-solid fa-cog"></i>
                            <span class="title">Settings</span>
                        </a>
                    </li>
                    <li class="line">
                        <span></span>
                    </li>
                    <a class="bm-collapse-admin-menu" href="#">
                        <i class="fa-solid fa-arrow-circle-left"></i>
                        <span class="title">Collapse menu</span>
                    </a>
                </ul>
            </div>
            <!-- CLOSE HEADER-->
            <!-- START CONTENT-->