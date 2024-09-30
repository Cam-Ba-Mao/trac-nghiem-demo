<?php
http_response_code(404);

include('header.php');
?>
    <section class="bm-404">
        <div class="container"> 
            <div class="bm-404__inner">
                <div class="bm-404__image">
                    <img class="lazy" data-src="<?php echo BASE_URL; ?>/html/dist/images/404/404.svg" alt="404">
                </div>
                <h1 class="bm-title bm-title__small">Trang không tồn tại</h1>
                <div class="bm-404__desc">Chúng tôi xin lỗi, không thể tìm thấy trang bạn yêu cầu.</div>
                <div class="bm-404__cta">
                    <a class="bm-btn bm-btn-primary" href="<?php echo BASE_URL; ?>/index.php">Trang chủ</a>
                </div>
            </div>
        </div>
    </section>
    
<?php include('footer.php'); ?>
