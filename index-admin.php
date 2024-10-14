<?php
// index-admin.php

session_start();
include('./config/config.php');

// Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
if (!isset($_SESSION['user_id'])) {
    header("Location: dang-nhap");
    exit();
}

// Kiểm tra vai trò của người dùng
$role = $_SESSION['role'];
if($role !== 'admin') {
    header("Location: trang-chu");
    exit();
}

// Thiết lập tiêu đề cho trang
$title = "Trang Admin";

include('header-admin.php');

?>
    <!-- START CONTENT-->
    <div class="bm-admin-content">
        <div class="bm-box-container">
            <div class="bm-box-container__wrap" id="div-0">
                <h3>Title was here!</h3>
                <div class="bm-box-container__content">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure aperiam blanditiis voluptatum molestias mollitia a nobis vel? Omnis, ex sit corporis similique magni saepe eveniet at nostrum! Consectetur, placeat aspernatur!</p>
                </div>
            </div>
        </div>
        <div class="bm-box-container container-25">
            <div class="bm-box-container__wrap" id="div-1">
                <h3>Quick Draft</h3>
                <div class="bm-box-container__content">
                    <form class="form" action="">
                        <ul>
                            <li>
                                <input id="input" type="text" placeholder="Title">
                            </li>
                            <li>
                                <textarea name="" id="" cols="30" rows="5" placeholder="Whats on your mind?"></textarea>
                            </li>
                            <li>
                                <button type="submit">Submit</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
        <div class="bm-box-container container-50">
            <div class="bm-box-container__wrap" id="div-2">
                <h3>Activity</h3>
                <div class="bm-box-container__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, officia consequatur? Est nisi assumenda atque accusantium omnis. Quae necessitatibus architecto explicabo quasi deleniti accusamus pariatur quos esse alias, sunt nesciunt!</div>
            </div>
        </div>
        <div class="bm-box-container container-25">
            <div class="bm-box-container__wrap" id="div-3">
                <h3>Quick Draft</h3>
                <div class="bm-box-container__content">
                    <form class="form" action="">
                        <ul>
                            <li>
                                <label class="title" for="title">Title</label>
                                <input id="title" type="text">
                            </li>
                            <li>
                                <label class="title" for="bm-admin-message">Whats on your mind?</label>
                                <textarea id="bm-admin-message" name="" cols="30" rows="5"></textarea>
                            </li>
                            <li>
                                <button type="submit">Submit</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- CLOSE CONTENT-->
    
<?php include('footer-admin.php'); ?>
