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
    die("Kết nối thất bại: " . mysqli_connect_error());
}

// Thiết lập charset utf8 để hỗ trợ tiếng Việt
mysqli_set_charset($conn, 'utf8');
?>
