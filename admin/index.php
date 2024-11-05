<?php
    // index-admin.php

    session_start();
    include(dirname(__DIR__) . '/config/config.php');

    // Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!isset($_SESSION['user_id'])) {
        header("Location: bm-login");
        exit();
    }

    // Kiểm tra vai trò của người dùng
    $role = $_SESSION['role'];
    if($role !== 'admin') {
        header("Location: bm-admin");
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
    
    <div class="box-welcome" id="box-welcome">
        <?php
            // Lấy thông tin người dùng từ cơ sở dữ liệu
            $username = $_SESSION['username'];
            $display_name = $_SESSION['display_name'];
            $query = "SELECT last_login FROM users WHERE username = '$username'";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_assoc($result);
            $last_login = $row['last_login'];

            // Chuyển đổi thời gian đăng nhập gần đây thành định dạng dễ đọc
            $last_login_formatted = $last_login ? date('H:i, d/m/Y', strtotime($last_login)) : 'Chưa có';

        ?>
        Chào mừng &nbsp;<b><font color="red" size="+1"><?= $display_name; ?></font></b>&nbsp; Lần đăng nhập gần đây vào lúc :<font color="red"><?= $last_login_formatted; ?></font>
    </div>
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
    <?php
        // Lấy thông tin trình duyệt và hệ điều hành
        $userAgent = $_SERVER['HTTP_USER_AGENT'];
        $version = '';  // Biến để lưu version
        $browser = getBrowser($userAgent, $version);
        $platform = getOperatingSystem($userAgent);
        $ip_address = ($_SERVER['REMOTE_ADDR'] === '::1') ? '127.0.0.1' : $_SERVER['REMOTE_ADDR'];

        // Kiểm tra nếu khách truy cập đã có trong bảng (dựa vào IP)
        $sql = "SELECT * FROM visitors WHERE ip_address = '$ip_address'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            // Cập nhật số lượt truy cập nếu đã tồn tại
            $sql = "UPDATE visitors SET views = views + 1, browser = '$browser', last_visit = NOW() WHERE ip_address = '$ip_address'";
        } else {
            // Thêm khách truy cập mới
            $sql = "INSERT INTO visitors (browser, operating_system, version, ip_address) 
                    VALUES ('$browser', '$platform', '$version', '$ip_address')";
        }
        mysqli_query($conn, $sql);
    ?>

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
                    <?php
                        $sql = "SELECT * FROM visitors ORDER BY views DESC LIMIT 10";
                        $result = mysqli_query($conn, $sql);
                        $index = 1;
                    ?>
                    <?php
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo "<tr class='row-{$index} row-item'>";
                                echo "<td class='manage-column'>{$index}</td>";
                                echo "<td class='manage-column'>{$row['views']}</td>";
                                echo "<td class='manage-column'>{$row['browser']}</td>";
                                echo "<td class='manage-column'>{$row['operating_system']}</td>";
                                echo "<td class='manage-column'>{$row['version']}</td>";
                                echo "<td class='manage-column ip-address column-action'>{$row['ip_address']}</td>";
                            echo "</tr>";
                            $index++;
                        }
                        
                    ?>
                    
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
        <div class="inside">
            <strong><i class="fa fa-book margin-r-5"></i>Domain</strong>
            <p class="text-muted"><?php echo $_SERVER['SERVER_NAME']; ?></p>
            <hr style="margin-top:10px; margin-bottom:10px">
            <strong><i class="fa fa-book margin-r-5"></i>PHP</strong>
            <p class="text-muted"><?php echo phpversion(); ?></p>
            <hr style="margin-top:10px; margin-bottom:10px"><strong><i class="fa fa-book margin-r-5"></i>MySQL</strong>
            <p class="text-muted"><?php 
                if ($conn) {
                    echo mysqli_get_server_info($conn);
                    mysqli_close($conn); // Đóng kết nối sau khi lấy thông tin
                } 
                ?>
            </p>
            <hr style="margin-top:10px; margin-bottom:10px"><strong><i class="fa fa-book margin-r-5"></i>Server Software</strong>
            <p class="text-muted"><?php echo $_SERVER['SERVER_SOFTWARE']; ?></p>
            <hr style="margin-top:10px; margin-bottom:10px"><strong><i class="fa fa-book margin-r-5"></i>Client IP</strong>
            <p class="text-muted">
                <?php
                    $client_ip = ($_SERVER['REMOTE_ADDR'] === '::1') ? '127.0.0.1' : $_SERVER['REMOTE_ADDR'];
                    echo $client_ip;
                ?>
            </p>
            <hr style="margin-top:10px; margin-bottom:10px"><strong><i class="fa fa-book margin-r-5"></i>Clien Browser</strong>
            <p class="text-muted no-margin"><?php echo $_SERVER['HTTP_USER_AGENT']; ?></p>
        </div>
    </div>
</div>
<?php include('footer.php'); ?>
