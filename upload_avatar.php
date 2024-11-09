<?php
session_start();
include('./config/config.php');

// Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
if (!isset($_SESSION['user_id'])) {
    header("Location: dang-nhap");
    exit();
}

// $user_id = $_SESSION['user_id'];
// $default_avatar = 'default-avatar.png'; // Avatar mặc định

// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     if (isset($_POST['update_avatar']) && isset($_FILES['avatar'])) {
//         $avatar = $_FILES['avatar']['name'];
//         $target_dir = __DIR__ . '/assets/upload/';
//         $target_file = $target_dir . basename($avatar);

//         if (!is_dir($target_dir)) {
//             mkdir($target_dir, 0777, true);
//         }

//         if (move_uploaded_file($_FILES['avatar']['tmp_name'], $target_file)) {
//             $query = "UPDATE users SET avatar = '$avatar' WHERE id = $user_id";
//             if (mysqli_query($conn, $query)) {
//                 echo "Avatar đã được cập nhật thành công.";
//             } else {
//                 echo "Có lỗi xảy ra khi cập nhật avatar: " . mysqli_error($conn);
//             }
//         } else {
//             echo "Có lỗi xảy ra khi tải lên avatar. Lỗi: " . $_FILES['avatar']['error'];
//         }
//     } elseif (isset($_POST['delete_avatar'])) {
//         $query = "UPDATE users SET avatar = '$default_avatar' WHERE id = $user_id";
//         if (mysqli_query($conn, $query)) {
//             echo "Avatar đã được xóa và quay lại avatar mặc định.";
//         } else {
//             echo "Có lỗi xảy ra khi xóa avatar: " . mysqli_error($conn);
//         }
//     }
// }

$user_id = $_SESSION['user_id'];
$default_avatar = 'default-avatar.png'; // Avatar mặc định
$target_dir = __DIR__ . '/assets/upload/';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Kiểm tra nếu đây là yêu cầu upload của Dropzone
    if (isset($_FILES['file'])) { // Dropzone sử dụng 'file' làm tên input mặc định
        $avatar = $_FILES['file']['name'];
        $target_file = $target_dir . basename($avatar);

        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
            $query = "UPDATE users SET avatar = '$avatar' WHERE id = $user_id";
            if (mysqli_query($conn, $query)) {
                echo json_encode(["status" => "success", "message" => "Avatar đã được cập nhật thành công."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Có lỗi xảy ra khi cập nhật avatar: " . mysqli_error($conn)]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Có lỗi xảy ra khi tải lên avatar."]);
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
    <!-- <div class="bm-upload_avatar">
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
    </div> -->
    <section class="bm-upload-avatar">
        <div class="container">
            <div class="bm-upload-avatar__wrap">
                <div class="bm-upload-avatar__head">
                    <h2 class="bm-upload-avatar__title">Cập nhập Avatar</h2>
                </div>
                <div class="bm-upload-avatar__gallery">
                    <form class="dropzone dash-gallery" id="upload-avatar-user" action="upload_avatar.php" method="post" enctype="multipart/form-data">
                        <div class="dz-message">
                            <img src="<?php echo BASE_URL; ?>/html/dist/images/uploading-icon.svg" alt="">
                            <h2>Kéo thả ảnh vào đây</h2>
                            <p>Hoặc chọn ảnh từ máy tính của bạn</p>
                            <div class="dash-gallery__cta">
                                <a class="bm-btn bm-btn-primary" href="#">
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1667 1.875C12.5119 1.875 12.7917 2.15482 12.7917 2.5V5.83333C12.7917 5.88859 12.8137 5.94158 12.8528 5.98065C12.8918 6.01972 12.9448 6.04167 13.0001 6.04167H16.3334C16.6786 6.04167 16.9584 6.32149 16.9584 6.66667C16.9584 7.01184 16.6786 7.29167 16.3334 7.29167H13.0001C12.6133 7.29167 12.2424 7.13802 11.9689 6.86453C11.6954 6.59104 11.5417 6.22011 11.5417 5.83333V2.5C11.5417 2.15482 11.8216 1.875 12.1667 1.875Z" fill="white"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33341 3.125C6.05715 3.125 5.7922 3.23475 5.59685 3.4301C5.40149 3.62545 5.29175 3.8904 5.29175 4.16667V15.8333C5.29175 16.1096 5.40149 16.3746 5.59685 16.5699C5.7922 16.7653 6.05715 16.875 6.33341 16.875H14.6667C14.943 16.875 15.208 16.7653 15.4033 16.5699C15.5987 16.3746 15.7084 16.1096 15.7084 15.8333V6.92555L11.9079 3.125H6.33341ZM4.71296 2.54621C5.14273 2.11644 5.72563 1.875 6.33341 1.875H12.1667C12.3325 1.875 12.4915 1.94085 12.6087 2.05806L16.7754 6.22472C16.8926 6.34193 16.9584 6.50091 16.9584 6.66667V15.8333C16.9584 16.4411 16.717 17.024 16.2872 17.4538C15.8574 17.8836 15.2745 18.125 14.6667 18.125H6.33341C5.72563 18.125 5.14273 17.8836 4.71296 17.4538C4.28319 17.024 4.04175 16.4411 4.04175 15.8333V4.16667C4.04175 3.55888 4.28319 2.97598 4.71296 2.54621Z" fill="white"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5001 14.7917C10.1549 14.7917 9.87508 14.5118 9.87508 14.1667L9.87508 9.16667C9.87508 8.82149 10.1549 8.54167 10.5001 8.54167C10.8453 8.54167 11.1251 8.82149 11.1251 9.16667L11.1251 14.1667C11.1251 14.5118 10.8453 14.7917 10.5001 14.7917Z" fill="white"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.442 12.1086C13.1979 12.3527 12.8022 12.3527 12.5581 12.1086L10.5001 10.0506L8.44202 12.1086C8.19795 12.3527 7.80222 12.3527 7.55814 12.1086C7.31406 11.8645 7.31406 11.4688 7.55814 11.2247L10.0581 8.72472C10.3022 8.48065 10.6979 8.48065 10.942 8.72472L13.442 11.2247C13.6861 11.4688 13.6861 11.8645 13.442 12.1086Z" fill="white"/>
                                    </svg>
                                    Thêm mới 
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  
<?php include('footer.php'); ?>
