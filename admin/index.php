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

    include('header.php');
?>
<div class="bm-admin-title"> 
    <h1>Bảng tin</h1>
</div>
<div class="bm-admin-content">
    <div class="box-welcome" id="box-welcome">Chào mừng &nbsp;<b><font color="red" size="+1">Bá Mão</font></b>&nbsp; Lần đăng nhập gần đây vào lúc :<font color="red">11:23, 02/11/2024</font></div>
    <div class="box-count" id="box-count">
        <div class="small-box bg-red">
            <div class="inner">
                <h3>1</h3>
                <p>Đơn hàng</p>
            </div>
            <div class="icon"><i class="fa fa-shopping-cart"></i></div><a class="small-box-footer" href="?mod=order"><span>Xem chi tiết&nbsp;</span><i class="fa fa-arrow-circle-right"></i></a>
        </div>
        <div class="small-box bg-yellow">
            <div class="inner">
                <h3>0</h3>
                <p>Bình luận</p>
            </div>
            <div class="icon"><i class="fa fa-commenting"></i></div><a class="small-box-footer" href="?mod=comment"><span>Xem chi tiết&nbsp;</span><i class="fa fa-arrow-circle-right"></i></a>
        </div>
        <div class="small-box bg-aqua">
            <div class="inner">
                <h3>1,577</h3>
                <p>Sản phẩm</p>
            </div>
            <div class="icon"><i class="fa fa-product-hunt"></i></div><a class="small-box-footer" href="?mod=product"><span>Xem chi tiết&nbsp;</span><i class="fa fa-arrow-circle-right"></i></a>
        </div>
        <div class="small-box bg-green">
            <div class="inner">
                <h3>4</h3>
                <p>Bài viết</p>
            </div>
            <div class="icon"><i class="fa fa-book"></i></div><a class="small-box-footer" href="?mod=news"><span>Xem chi tiết&nbsp;</span><i class="fa fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <div class="box-chart metabox" id="box-chart">
        <div class="handlediv down"></div>
        <h3>Thống kê truy cập</h3>
        <div class="inside">
            <div class="box">
                <div class="overlay" style="display: none;"><i class="fa fa-refresh fa-spin"></i></div>
                <div class="chart">
                    <div class="chartjs-size-monitor">
                        <div class="chartjs-size-monitor-expand">
                            <div></div>
                        </div>
                        <div class="chartjs-size-monitor-shrink">
                            <div></div>
                        </div>
                    </div>
                    <canvas class="chartjs-render-monitor" id="areaChartHits" style="height: 500px; display: block;" width="1512" height="625"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div class="box-visitors metabox" id="box-visitors">
        <div class="handlediv down"></div>
        <h3>Khách truy cập nhiều</h3>
        <div class="inside no-padding">
            <table class="table-list">
                <thead>
                    <tr>
                        <th class="manage-column">Thứ tự</th>
                        <th class="manage-column">Lượt</th>
                        <th class="manage-column">Trình duyệt</th>
                        <th class="manage-column">Hệ điều hành</th>
                        <th class="manage-column">Phiên bản</th>
                        <th class="manage-column column-action">Địa chỉ IP</th>
                    </tr>
                </thead>
                <tbody id="box_top_visitors">
                    <tr class="row-1 row-item">
                        <td class="manage-column">1</td>
                        <td class="manage-column">471</td>
                        <td class="manage-column">Chrome</td>
                        <td class="manage-column">Mac OS X</td>
                        <td class="manage-column">130.0.0.0</td>
                        <td class="manage-column ip-address column-action">171.243.49.163</td>
                    </tr>
                    <tr class="row-2 row-item">
                        <td class="manage-column">2</td>
                        <td class="manage-column">253</td>
                        <td class="manage-column">Mozilla</td>
                        <td class="manage-column">Unknown Platform</td>
                        <td class="manage-column">5.0</td>
                        <td class="manage-column ip-address column-action">158.220.123.113</td>
                    </tr>
                    <tr class="row-3 row-item">
                        <td class="manage-column">3</td>
                        <td class="manage-column">46</td>
                        <td class="manage-column">Safari</td>
                        <td class="manage-column">iOS</td>
                        <td class="manage-column">604.1</td>
                        <td class="manage-column ip-address column-action">172.224.240.108</td>
                    </tr>
                    <tr class="row-4 row-item">
                        <td class="manage-column">4</td>
                        <td class="manage-column">42</td>
                        <td class="manage-column">Mozilla</td>
                        <td class="manage-column">Unknown Platform</td>
                        <td class="manage-column">5.0</td>
                        <td class="manage-column ip-address column-action">135.181.74.243</td>
                    </tr>
                    <tr class="row-5 row-item">
                        <td class="manage-column">5</td>
                        <td class="manage-column">29</td>
                        <td class="manage-column">Chrome</td>
                        <td class="manage-column">Mac OS X</td>
                        <td class="manage-column">130.0.0.0</td>
                        <td class="manage-column ip-address column-action">103.89.86.190</td>
                    </tr>
                    <tr class="row-6 row-item">
                        <td class="manage-column">6</td>
                        <td class="manage-column">19</td>
                        <td class="manage-column">Chrome</td>
                        <td class="manage-column">Windows 10</td>
                        <td class="manage-column">89.0.4389.114</td>
                        <td class="manage-column ip-address column-action">87.120.116.68</td>
                    </tr>
                    <tr class="row-7 row-item">
                        <td class="manage-column">7</td>
                        <td class="manage-column">16</td>
                        <td class="manage-column">Chrome</td>
                        <td class="manage-column">Mac OS X</td>
                        <td class="manage-column">119.0.0.0</td>
                        <td class="manage-column ip-address column-action">171.243.49.163</td>
                    </tr>
                    <tr class="row-8 row-item">
                        <td class="manage-column">8</td>
                        <td class="manage-column">15</td>
                        <td class="manage-column">Chrome</td>
                        <td class="manage-column">Windows 10</td>
                        <td class="manage-column">95.0.4638.69</td>
                        <td class="manage-column ip-address column-action">174.138.30.203</td>
                    </tr>
                    <tr class="row-9 row-item">
                        <td class="manage-column">9</td>
                        <td class="manage-column">10</td>
                        <td class="manage-column">Chrome</td>
                        <td class="manage-column">Windows 10</td>
                        <td class="manage-column">74.0.3729.169</td>
                        <td class="manage-column ip-address column-action">52.187.192.174</td>
                    </tr>
                    <tr class="row-10 row-item">
                        <td class="manage-column">10</td>
                        <td class="manage-column">9</td>
                        <td class="manage-column"></td>
                        <td class="manage-column">Unknown Platform</td>
                        <td class="manage-column"></td>
                        <td class="manage-column ip-address column-action">40.77.167.5</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="box-adminlogs metabox" id="box-adminlogs">
        <div class="handlediv down"></div>
        <h3>Hoạt động gần đây</h3>
        <div class="inside no-padding">
            <table class="table-list no-margin">
                <thead>
                    <tr>
                        <th class="manage-column">Tên đăng nhập</th>
                        <th class="manage-column">Thời gian</th>
                        <th class="manage-column">Địa chỉ IP</th>
                        <th class="manage-column">Trang</th>
                        <th class="manage-column">Tác vụ</th>
                        <th class="manage-column column-action">Name / ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">14:20, 02/11/2024</td>
                        <td class="manage-column">1.53.56.140</td>
                        <td class="manage-column">Oauth</td>
                        <td class="manage-column">login</td>
                        <td class="manage-column column-action last">672</td>
                    </tr>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">11:23, 02/11/2024</td>
                        <td class="manage-column">103.89.86.190</td>
                        <td class="manage-column">Oauth</td>
                        <td class="manage-column">login</td>
                        <td class="manage-column column-action last">672</td>
                    </tr>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">11:21, 02/11/2024</td>
                        <td class="manage-column">103.89.86.190</td>
                        <td class="manage-column">Oauth</td>
                        <td class="manage-column">logout</td>
                        <td class="manage-column column-action last">672</td>
                    </tr>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">17:01, 01/11/2024</td>
                        <td class="manage-column">103.89.86.190</td>
                        <td class="manage-column">news</td>
                        <td class="manage-column">edit</td>
                        <td class="manage-column column-action last">5</td>
                    </tr>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">17:01, 01/11/2024</td>
                        <td class="manage-column">103.89.86.190</td>
                        <td class="manage-column">news</td>
                        <td class="manage-column">add</td>
                        <td class="manage-column column-action last">5</td>
                    </tr>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">19:58, 28/10/2024</td>
                        <td class="manage-column">1.53.56.113</td>
                        <td class="manage-column">users</td>
                        <td class="manage-column">update</td>
                        <td class="manage-column column-action last">1</td>
                    </tr>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">19:58, 28/10/2024</td>
                        <td class="manage-column">1.53.56.113</td>
                        <td class="manage-column">users</td>
                        <td class="manage-column">update</td>
                        <td class="manage-column column-action last">1</td>
                    </tr>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">19:56, 28/10/2024</td>
                        <td class="manage-column">1.53.56.113</td>
                        <td class="manage-column">users</td>
                        <td class="manage-column">update</td>
                        <td class="manage-column column-action last">672</td>
                    </tr>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">19:56, 28/10/2024</td>
                        <td class="manage-column">1.53.56.113</td>
                        <td class="manage-column">Oauth</td>
                        <td class="manage-column">login</td>
                        <td class="manage-column column-action last">672</td>
                    </tr>
                    <tr class="row_item">
                        <td class="manage-column text-bold">cambamao98</td>
                        <td class="manage-column">13:51, 28/10/2024</td>
                        <td class="manage-column">103.89.86.190</td>
                        <td class="manage-column">Oauth</td>
                        <td class="manage-column">login</td>
                        <td class="manage-column column-action last">672</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="box-system metabox" id="box-system">
        <div class="handlediv down"></div>
        <h3>Thông tin hệ thống</h3>
        <div class="inside"><strong><i class="fa fa-book margin-r-5"></i>Domain</strong>
            <p class="text-muted">dienmaytonghop.com</p>
            <hr style="margin-top:10px; margin-bottom:10px"><strong><i class="fa fa-book margin-r-5"></i>PHP</strong>
            <p class="text-muted">7.4.33</p>
            <hr style="margin-top:10px; margin-bottom:10px"><strong><i class="fa fa-book margin-r-5"></i>MySQL</strong>
            <p class="text-muted">5.5.5-10.4.34-MariaDB</p>
            <hr style="margin-top:10px; margin-bottom:10px"><strong><i class="fa fa-book margin-r-5"></i>Server Software</strong>
            <p class="text-muted">LiteSpeed</p>
            <hr style="margin-top:10px; margin-bottom:10px"><strong><i class="fa fa-book margin-r-5"></i>Client IP</strong>
            <p class="text-muted">1.53.56.140</p>
            <hr style="margin-top:10px; margin-bottom:10px"><strong><i class="fa fa-book margin-r-5"></i>Clien Browser</strong>
            <p class="text-muted no-margin">Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36</p>
        </div>
    </div>
</div>
<?php include('footer.php'); ?>
