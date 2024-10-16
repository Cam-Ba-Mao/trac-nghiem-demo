<?php
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

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $post_type_name = $_POST['post_type_name'];
        $slug = toSlug($post_type_name);

        // Chèn vào bảng custom_post_types
        $sql = "INSERT INTO custom_post_types (post_type_name, slug) VALUES ('$post_type_name', '$slug')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Custom Post Type '$post_type_name' đã được tạo!";
        } else {
            echo "Lỗi: " . $sql . "<br>" . $conn->error;
        }
    }
?>
<!-- START CONTENT-->
<div class="bm-admin-content">
    <div class="bm-box-container__wrap-title">
        <h1>Add New Post</h1>
    </div>
    <div class="bm-admin-message error bm-box-container__wrap-title">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque pariatur, culpa, iusto odit excepturi velit
        temporibus, praesentium assumenda dolore deleniti quibusdam molestiae minima reiciendis id repellendus
        obcaecati soluta voluptatibus impedit.
    </div>
    <div class="bm-admin-message success bm-box-container__wrap-title">Is everything alright?<a href="#">link is here</a></div>
    <div class="bm-admin-message info bm-box-container__wrap-title">info minfo this kind of stuff</div>
    <div class="bm-admin-message warning bm-box-container__wrap-title">warning something has happened</div>
    <div class="clear" style="height: 10px;"></div>
    <div class="bm-box-container post-content">
        <div class="bm-box-container__wrap-title">
            <form class="form" method="POST" action="">
                <ul>
                    <li>
                        <input class="big" type="text" name="post_type_name" placeholder="Tên danh mục">
                    </li>
                    <li>
                        <button type="submit">Thêm danh mục</button>
                    </li>
                </ul>
            </form>
        </div>
        <div class="bm-box-container__wrap">
            <h3>test et</h3>
            <div class="bm-box-container__content">test et bakalm</div>
        </div>
    </div>
    <div class="bm-box-container post-rightbar">
        <div class="bm-box-container__wrap">
            <h3>Publish</h3>
            <div class="bm-box-container__content">
                <a class="btn right" href="#">Preview</a>
                <a class="btn" href="#">Save Draft</a>
                <div class="publish-content">
                    <button type="submit">Publish</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- CLOSE CONTENT-->
<!-- <form method="POST">
    <input type="text" name="post_type_name" placeholder="Tên danh mục">
    <button type="submit">Thêm danh mục</button>
</form> -->

<?php include('footer-admin.php'); ?>
