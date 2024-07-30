<?php
// config.php

$host = 'localhost'; // Địa chỉ máy chủ MySQL
$db = 'trac_nghiem'; // Tên cơ sở dữ liệu
$user = 'root'; // Tên người dùng MySQL
$pass = ''; // Mật khẩu MySQL

// Kết nối tới cơ sở dữ liệu MySQL
$conn = mysqli_connect($host, $user, $pass, $db);

// Kiểm tra kết nối
if (!$conn) {
    // Kết nối không thành công, in ra lỗi và dừng thực hiện
    die("Kết nối thất bại: " . mysqli_connect_error());
}

// Thiết lập charset utf8 để hỗ trợ tiếng Việt
mysqli_set_charset($conn, 'utf8');

// Định nghĩa base URL
if (!defined('BASE_URL')) {
    define('BASE_URL', '/trac-nghiem-demo');
}

/**
 * Hàm debug
 */
if (!function_exists('dd')) {
    function dd($a, $b = false, $c = true) {
        $display = $b ? 'style="display:none"' : '';
        echo '<div class="dd-debug" ' . $display . '>';
        if (is_array($a) || is_object($a)) {
            echo '<pre>';
            print_r($a);
            echo '</pre>';
        } else {
            var_dump($a);
        }
        echo '</div>';
        if ($c) {
            die();
        }
    }
}
?>
