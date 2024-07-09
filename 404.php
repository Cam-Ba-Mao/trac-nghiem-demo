<?php
http_response_code(404);

include('header.php');
?>
    <section class="tdmu-404">
        <div class="container"> 
            <div class="row">
                <div class="col-md-6">
                    <h1>404</h1>
                    <div class="tdmu-sub-title">Trang không tồn tại</div>
                    <div class="tdmu-404__desc">Chúng tôi xin lỗi, không thể tìm thấy trang bạn yêu cầu.</div>
                    <div class="tdmu-404__cta">
                        <a class="tdmu-btn tdmu-btn-primary" href="<?php echo BASE_URL; ?>/index.php">Trang chủ</a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="tdmu-404__image">
                        <img src="<?php echo BASE_URL; ?>/assets/img/404.svg" alt="404">
                    </div>
                </div>
            </div>
        </div>
    </section>
    
<?php include('footer.php'); ?>
