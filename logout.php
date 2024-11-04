<?php
// logout.php

session_start();
$role = $_SESSION['role'];

if($role == 'admin') {
    session_destroy();
    header("Location: bm-login");
    exit();
} else {
    session_destroy();
    header("Location: dang-nhap");
    exit();
}

?>
