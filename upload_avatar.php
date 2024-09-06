<?php
session_start();
include('./config/config.php');

// Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
if (!isset($_SESSION['user_id'])) {
    header("Location: dang-nhap");
    exit();
}

$user_id = $_SESSION['user_id'];
$default_avatar = 'default-avatar.png'; // Avatar mặc định

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['update_avatar']) && isset($_FILES['avatar'])) {
        $avatar = $_FILES['avatar']['name'];
        $target_dir = __DIR__ . '/assets/upload/';
        $target_file = $target_dir . basename($avatar);

        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        if (move_uploaded_file($_FILES['avatar']['tmp_name'], $target_file)) {
            $query = "UPDATE users SET avatar = '$avatar' WHERE id = $user_id";
            if (mysqli_query($conn, $query)) {
                echo "Avatar đã được cập nhật thành công.";
            } else {
                echo "Có lỗi xảy ra khi cập nhật avatar: " . mysqli_error($conn);
            }
        } else {
            echo "Có lỗi xảy ra khi tải lên avatar. Lỗi: " . $_FILES['avatar']['error'];
        }
    } elseif (isset($_POST['delete_avatar'])) {
        $query = "UPDATE users SET avatar = '$default_avatar' WHERE id = $user_id";
        if (mysqli_query($conn, $query)) {
            echo "Avatar đã được xóa và quay lại avatar mặc định.";
        } else {
            echo "Có lỗi xảy ra khi xóa avatar: " . mysqli_error($conn);
        }
    }
}

// Thiết lập tiêu đề cho trang
$title = "Đổi avatar";

include('header.php');
?>
    <div class="bm-upload_avatar">
        <form action="upload_avatar.php" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="avatar">Chọn avatar mới:</label>
                <input type="file" name="avatar" id="avatar">
            </div>
            <div class="form-group form-button">
                <button type="submit" name="update_avatar">Cập nhật avatar</button>
                <button type="submit" name="delete_avatar">Xóa avatar</button>
            </div>
        </form>
    </div>
  
<?php include('footer.php'); ?>
