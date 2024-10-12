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

if (!defined('SMTP_USERNAME')) {
    define('SMTP_USERNAME', 'cambamao98@gmail.com');
}

if (!defined('SMTP_PASSWORD')) {
    define('SMTP_PASSWORD', 'jfrp rljh hwhb vkyr');
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

if (!function_exists('removeWhitespace')) {
    function removeWhitespace($string) {
        // Xóa khoảng trắng thừa
        return preg_replace('/\s+/', '', trim($string));
    }
}

if (!function_exists('convertToNoSign')) {
    function convertToNoSign($string) {
        $unwanted_array = [
            'á'=>'a', 'à'=>'a', 'ạ'=>'a', 'ả'=>'a', 'ã'=>'a', 'â'=>'a', 'ấ'=>'a', 'ầ'=>'a', 'ậ'=>'a', 'ẩ'=>'a', 'ẫ'=>'a', 'ă'=>'a', 'ắ'=>'a', 'ằ'=>'a', 'ặ'=>'a', 'ẳ'=>'a', 'ẵ'=>'a',
            'é'=>'e', 'è'=>'e', 'ẹ'=>'e', 'ẻ'=>'e', 'ẽ'=>'e', 'ê'=>'e', 'ế'=>'e', 'ề'=>'e', 'ệ'=>'e', 'ể'=>'e', 'ễ'=>'e',
            'í'=>'i', 'ì'=>'i', 'ị'=>'i', 'ỉ'=>'i', 'ĩ'=>'i',
            'ó'=>'o', 'ò'=>'o', 'ọ'=>'o', 'ỏ'=>'o', 'õ'=>'o', 'ô'=>'o', 'ố'=>'o', 'ồ'=>'o', 'ộ'=>'o', 'ổ'=>'o', 'ỗ'=>'o', 'ơ'=>'o', 'ớ'=>'o', 'ờ'=>'o', 'ợ'=>'o', 'ở'=>'o', 'ỡ'=>'o',
            'ú'=>'u', 'ù'=>'u', 'ụ'=>'u', 'ủ'=>'u', 'ũ'=>'u', 'ư'=>'u', 'ứ'=>'u', 'ừ'=>'u', 'ự'=>'u', 'ử'=>'u', 'ữ'=>'u',
            'ý'=>'y', 'ỳ'=>'y', 'ỵ'=>'y', 'ỷ'=>'y', 'ỹ'=>'y',
            'đ'=>'d',
            'Á'=>'A', 'À'=>'A', 'Ạ'=>'A', 'Ả'=>'A', 'Ã'=>'A', 'Â'=>'A', 'Ấ'=>'A', 'Ầ'=>'A', 'Ậ'=>'A', 'Ẩ'=>'A', 'Ẫ'=>'A', 'Ă'=>'A', 'Ắ'=>'A', 'Ằ'=>'A', 'Ặ'=>'A', 'Ẳ'=>'A', 'Ẵ'=>'A',
            'É'=>'E', 'È'=>'E', 'Ẹ'=>'E', 'Ẻ'=>'E', 'Ẽ'=>'E', 'Ê'=>'E', 'Ế'=>'E', 'Ề'=>'E', 'Ệ'=>'E', 'Ể'=>'E', 'Ễ'=>'E',
            'Í'=>'I', 'Ì'=>'I', 'Ị'=>'I', 'Ỉ'=>'I', 'Ĩ'=>'I',
            'Ó'=>'O', 'Ò'=>'O', 'Ọ'=>'O', 'Ỏ'=>'O', 'Õ'=>'O', 'Ô'=>'O', 'Ố'=>'O', 'Ồ'=>'O', 'Ộ'=>'O', 'Ổ'=>'O', 'Ỗ'=>'O', 'Ơ'=>'O', 'Ớ'=>'O', 'Ờ'=>'O', 'Ợ'=>'O', 'Ở'=>'O', 'Ỡ'=>'O',
            'Ú'=>'U', 'Ù'=>'U', 'Ụ'=>'U', 'Ủ'=>'U', 'Ũ'=>'U', 'Ư'=>'U', 'Ứ'=>'U', 'Ừ'=>'U', 'Ự'=>'U', 'Ử'=>'U', 'Ữ'=>'U',
            'Ý'=>'Y', 'Ỳ'=>'Y', 'Ỵ'=>'Y', 'Ỷ'=>'Y', 'Ỹ'=>'Y',
            'Đ'=>'D'
        ];
        return strtr($string, $unwanted_array);
    }
}

if (!function_exists('removeWhitespaceAndConvertToNoSign')) {
    function removeWhitespaceAndConvertToNoSign($string) {
        $string = removeWhitespace($string);  // Xóa khoảng trắng
        return convertToNoSign($string);      // Chuyển thành không dấu
    }
}


?>
