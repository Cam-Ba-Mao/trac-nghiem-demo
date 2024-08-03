<?php

// otp.php
require_once './config/config.php'; // Đảm bảo dùng require_once

// Load PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Đảm bảo rằng bạn đã đưa các file cần thiết vào đúng thư mục
require 'lib/PHPMailer/src/Exception.php';
require 'lib/PHPMailer/src/PHPMailer.php';
require 'lib/PHPMailer/src/SMTP.php';

function generateOTP($length = 6) {
    $otp = '';
    for ($i = 0; $i < $length; $i++) {
        $otp .= mt_rand(0, 9);
    }
    return $otp;
}

function sendOTPEmail($email, $otp) {
    $mail = new PHPMailer(true);

    try {
        // Cấu hình máy chủ SMTP
        $mail->isSMTP();                                           
        $mail->Host       = 'smtp.gmail.com';                    
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = SMTP_USERNAME;              
        $mail->Password   = SMTP_PASSWORD;                 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;          
        $mail->Port       = 587;                                   

        // Người nhận
        $mail->setFrom('cambamao98@gmail.com', 'Thi Trắc Nghiệm');
        $mail->addAddress($email);     

        // Nội dung
        $mail->isHTML(true);         
        $mail->CharSet = 'UTF-8'; // Đảm bảo mã hóa là UTF-8                          
        $mail->Subject = 'Mã OTP của bạn để thay đổi mật khẩu';
        $mail->Body    = 'Mã OTP của bạn là: ' . $otp;

        $mail->send();
        return true;
    } catch (Exception $e) {
        // Ghi log lỗi hoặc hiển thị thông báo lỗi cho người dùng
        error_log('Gửi email thất bại: ' . $mail->ErrorInfo);
        return false;
    }
}

