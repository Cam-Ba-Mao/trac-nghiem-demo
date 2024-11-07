<?php
    include(__DIR__ . '/config/config.php');
    // error_reporting(0);
    // ini_set('display_errors', 0);

    class install
    {
        private $connect = '';
        private $connect_info = array();

        function step_0()
        {
            $php_version_check = true;
            $ext_xml_check = true;
            $ext_xmlwriter_check = true;
            $ext_mbstring_check = true;
            $ext_zip_check = true;
            $mod_rewrite_check = true;

            echo '<div class="bm-install-box">';
            echo '<div class="bm-install-box__title">Kiểm Tra Hệ Thống</div>';
            echo '<div class="bm-install-box__content">';
            echo '<strong>Trước khi cài đặt, yêu cầu máy chủ cần đáp ứng các điều kiện để tiếp tục cài đặt.<br /><span style="color:red">Nếu bạn đang sử dụng hệ điều hành Linux hoặc Mac, vui lòng cấp đầy đủ quyền cho thư mục cài đặt truớc khi thực hiện để không xảy ra lỗi trong quá trình cài đặt và sử dụng.</strong><br />';

            if (version_compare(PHP_VERSION, '7.0.0', '>=')) {
                $php_version = '<span class="pass">ĐẠT</span>';
            } else {
                $php_version = '<span class="failed">KHÔNG ĐẠT</span>';
                $php_version_check = false;
            }
            if (in_array('mod_rewrite', apache_get_modules())) {
                $mod_rewrite = '<span class="pass">ĐẠT</span>';
            } else {
                $mod_rewrite = '<span class="failed">KHÔNG ĐẠT</span>';
                $mod_rewrite_check = false;
            }
            if (extension_loaded('xml')) {
                $ext_xml = '<span class="pass">ĐẠT</span>';
            } else {
                $ext_xml = '<span class="failed">KHÔNG ĐẠT</span>';
                $ext_xml_check = false;
            }
            if (extension_loaded('xmlwriter')) {
                $ext_xmlwriter = '<span class="pass">ĐẠT</span>';
            } else {
                $ext_xmlwriter = '<span class="failed">KHÔNG ĐẠT</span>';
                $ext_xmlwriter_check = false;
            }
            if (extension_loaded('mbstring')) {
                $ext_mbstring = '<span class="pass">ĐẠT</span>';
            } else {
                $ext_mbstring = '<span class="failed">KHÔNG ĐẠT</span>';
                $ext_mbstring_check = false;
            }
            if (extension_loaded('zip')) {
                $ext_zip = '<span class="pass">ĐẠT</span>';
            } else {
                $ext_zip = '<span class="failed">KHÔNG ĐẠT</span>';
                $ext_zip_check = false;
            }
            $ext_gd = extension_loaded('gd') ? '<span class="pass">ĐẠT</span>' : '<span class="failed">KHÔNG ĐẠT</span>';
            $ext_dom = extension_loaded('dom') ? '<span class="pass">ĐẠT</span>' : '<span class="failed">KHÔNG ĐẠT</span>';

            echo 'PHP 7.0.0: '.$php_version.'<br />';
            echo 'PHP mod_rewrite: '.$mod_rewrite.'<br />';
            echo 'PHP extension XML: '.$ext_xml.'<br />';
            echo 'PHP extension xmlwriter: '.$ext_xmlwriter.'<br />';
            echo 'PHP extension mbstring: '.$ext_mbstring.'<br />';
            echo 'PHP extension ZipArchive: '.$ext_zip.'<br />';
            echo 'PHP extension GD (tùy chọn): '.$ext_gd.'<br />';
            echo 'PHP extension dom (tùy chọn): '.$ext_dom.'<br />';

            if ($ext_zip_check && $ext_mbstring_check && $ext_xmlwriter_check && $ext_xml_check && $php_version_check && $mod_rewrite_check) {
                echo '</div>';
                echo '</div>';
                $this->step_1();
            } else {
                echo '<span class="failed">Máy chủ không đạt đủ yêu cầu, liên hệ nhà cung cấp để biết thêm chi tiết.</span>';
                echo '</div>';
                echo '</div>';
            }
        }

        function step_1()
        {
            echo '<div class="bm-install-box">';
            echo '<div class="bm-install-box__title">Tiến Hành Cài Đặt</div>';
            echo '<div class="bm-install-box__content">';

            if (isset($_POST['step_1'])) {
                $host = $this->connect_info['host'] = $_POST['host'];
                $user = $this->connect_info['user'] = $_POST['user'];
                $password = $this->connect_info['password'] = $_POST['password'];
                $database_name = $this->connect_info['dbname'] = $_POST['database_name'];

                $this->connect = new mysqli($host, $user, $password, $database_name);
                if ($this->connect->connect_error) {
                    echo '<span class="failed">Kết nối cơ sở dữ liệu lỗi, vui lòng kiểm tra lại.</span>';
                } else {
                    $this->import_database();
                    if (is_writable('config/connect.php')) {
                        $this->save_config();
                        $this->step_2();
                    } else {
                        $this->step_error();
                    }
                }
            } else {
                echo '<strong>Nhập các thông số kết nối cơ sở dữ liệu (Hãy chắc chắn bạn đã tạo sẵn 1 database).</strong><br />';

                echo '<form method="POST">';
                echo '<div class="input-field">
                <label for="host">Database Host</label>
                <input id="host" type="text" name="host" value="localhost" required>
                </div>';
                echo '<div class="input-field">
                <label for="user">Người dùng</label>
                <input id="user" type="text" name="user" required>
                </div>';
                echo '<div class="input-field">
                <label for="password">Mật Khẩu</label>
                <input id="password" type="text" name="password">
                </div>';
                echo '<div class="input-field">
                <label for="database_name">Tên Database</label>
                <input id="database_name" type="text" name="database_name" required>
                </div>';
                echo '<div class="input-field">
                <button type="submit" name="step_1" class="btn-submit">TIẾP TỤC</button>
                </form>
                </div>';
                echo '<div class="input-field">
                <a href="install.php?step=0" class="btn-submit">QUAY LẠI</a>
                </div>';
            }
            echo '</div></div>';
        }

        function step_2()
        {
            echo "<span class='pass'>Cài đặt Hệ Thống Trắc Nghiệm Online thành công.</span><br />";
            echo "File install.php sẽ bị xóa sau quá trình cài đặt để đảm bảo vấn đề bảo mật.<br />";
            echo "Tài khoản mặc định: <b>admin</b><br />";
            echo "Mật khẩu: <b>123456</b> <br />";
            echo "Vui lòng đăng nhập và đổi mật khẩu ngay sau khi đăng nhập. <br />";
            echo 'Mọi thông tin chi tiết, hỗ trợ, góp ý, báo lỗi,<br />';
            echo"vui lòng liên hệ <span class='pass'>cambamao98@gmail.com</span>
            <br><br>";
            echo '<a href="index.php" class="btn-submit">KẾT THÚC</a>';
        }

        function step_error()
        {
            echo "<span class='failed'>Cài đặt Hệ Thống Trắc Nghiệm Online không thành thành công.</span><br />";
            echo "Vui lòng cấp quyền ghi file cho hệ thống và thực hiện lại.<br />";
            echo "Hoặc truy cập vào thư mục cài đặt, sửa trực tiếp file config/connect.php và điền theo mẫu:<br /><br />";
            echo "'host' => '".$this->connect_info['host']."', <br />";
            echo "'user' => '".$this->connect_info['user']."', <br />";
            echo "'password' => '".$this->connect_info['password']."', <br />";
            echo "'dbname' => '".$this->connect_info['dbname']."', <br />";
            echo "'INSTALL_MODE' => false <br /><br />";
            echo "Tài khoản mặc định: <b>admin</b><br />";
            echo "Mật khẩu: <b>123456</b> <br />";
            echo "Vui lòng đăng nhập và đổi mật khẩu ngay sau khi đăng nhập. <br />";
            echo "Sửa URL trang web trong config/config.php <br />";
            echo 'Mọi thông tin chi tiết, hỗ trợ, góp ý, báo lỗi,<br />';
            echo"vui lòng liên hệ <span class='pass'>cambamao98@gmail.com</span>
            <br /><br />";
            echo '<a href="index.php" class="btn-submit">KẾT THÚC</a>';
        }

        function import_database()
        {
            //database file
            $filename = 'config/trac_nghiem_demo.sql';
            // Temporary variable, used to store current query
            $templine = '';
            // Read in entire file
            $lines = file($filename);
            // Loop through each line
            foreach ($lines as $line)
            {
                // Skip it if it's a comment
                if (substr($line, 0, 2) == '--' || $line == '') {
                    continue;
                }

                // Add this line to the current segment
                $templine .= $line;
                // If it has a semicolon at the end, it's the end of the query
                if (substr(trim($line), -1, 1) == ';') {
                    // Perform the query
                    $this->connect->query($templine);
                    // Reset temp variable to empty
                    $templine = '';
                }
            }
            echo "<br /><span class='pass'>Tạo cơ sở dữ liệu xong.</span><hr />";
        }
        function save_config()
        {
            //write config.php file
            $writer="<?php
            return (object) array('host' => '".$this->connect_info['host']."','user' => '".$this->connect_info['user']."','password' => '".$this->connect_info['password']."','dbname' => '".$this->connect_info['dbname']."','INSTALL_MODE' => false);
            ";
                    $write=fopen('config/connect.php' , 'w');
                    fwrite($write,$writer);
                    fclose($write);
                    chmod('config/connect.php', 0666);
                    chmod('install.php', 0666);
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">
        <title>Trang Cài đặt</title>
        <!-- Favicon-->
        <link rel="icon" href="<?php echo BASE_URL; ?>/html/dist/images/favicon.png">
        <!-- Bootstrap-->
        <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/css/bootstrap.min.css">
        <!-- Template syle-->
        <link rel="stylesheet" href="<?php echo BASE_URL; ?>/html/dist/admin/css/admin.min.css">
        <!-- Jquery-->
        <script src="<?php echo BASE_URL; ?>/html/dist/js/jquery.min.js"></script>
    </head>
    <body class="page-template-install">
        <!-- START CONTENT-->
        <section class="bm-install"> 
            <div class="bm-install__head"> 
                <div class="bm-install__head--title">Cài Đặt Hệ Thống Trắc Nghiệm Online</div>
            </div>
            <div class="container"> 
                <div class="bm-install-box">
                    <div class="bm-install-box__title">Thông Tin</div>
                    <div class="bm-install-box__content"> 
                        <h2>Hệ Thống Trắc Nghiệm Online</h2>
                        <p>Phiên bản: <b>3.4.3</b> (20/11/2024)</p>
                        <p>Bản quyền tác giả: Cầm Bá Mão</p>
                        <p>Email: <a href="mailto:cambamao98@gmail.com">cambamao98@gmail.com </a></p>
                    </div>
                </div>
                <?php
                    $install = new install();
                    $install->step_0();
                ?>
            </div>
        </section>
        <!-- CLOSE CONTENT-->
        <!-- Bootstrap-->
        <script src="<?php echo BASE_URL; ?>/html/dist/js/popper.min.js"></script>
        <script src="<?php echo BASE_URL; ?>/html/dist/js/bootstrap.min.js"></script>
        <!-- Template script-->
        <script src=".<?php echo BASE_URL; ?>/html/dist/admin/js/admin.min.js"></script>
        <!-- Common script-->
    </body>
</html>