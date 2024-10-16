<?php
session_start();
include('./config/config.php');
header("Cross-Origin-Opener-Policy: same-origin-allow-popups");
// Nhận dữ liệu từ AJAX
$type = $_POST['type'];

if ($type == 'google') {
    $provide_id = $_POST['id'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $display_name = $_POST['display_name'];
    $email = $_POST['email'];
    $picture = $_POST['picture'];

    // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
    $query = "SELECT id, username, role FROM users WHERE google_id='$provide_id' OR email='$email'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        // Người dùng đã tồn tại
        $user = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];

        // Đáp ứng thành công
        echo json_encode(['success' => true , 'role' => $user['role']]);
    } else {
        // Người dùng chưa tồn tại, thêm mới vào cơ sở dữ liệu
        $insert_query = "INSERT INTO users (username, email, google_id, role) VALUES ('$display_name', '$email', '$provide_id', 'student')";
        if (mysqli_query($conn, $insert_query)) {
            $user_id = mysqli_insert_id($conn);
            $_SESSION['user_id'] = $user_id;
            $_SESSION['username'] = removeWhitespaceAndConvertToNoSign($display_name);
            $_SESSION['role'] = 'student';

            // Đáp ứng thành công
            echo json_encode(['success' => true]);
        } else {
            // Lỗi khi thêm người dùng
            echo json_encode(['success' => false, 'message' => 'Không thể tạo tài khoản mới.']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Loại đăng nhập không hợp lệ.']);
}
?>
