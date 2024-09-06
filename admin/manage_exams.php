<?php
// manage_exams.php

session_start();
include(__DIR__ . '/../config/config.php');

// Kiểm tra vai trò của người dùng
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

// Xử lý thêm đề thi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['add_exam'])) {
    $exam_name = $_POST['exam_name'];
    $exam_time = $_POST['exam_time'];

    $query = "INSERT INTO exams (exam_name, exam_time) VALUES ('$exam_name','$exam_time')";
    if (mysqli_query($conn, $query)) {
        $success_message = "Thêm đề thi thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Xử lý xóa đề thi
if (isset($_GET['delete_id'])) {
    $delete_id = $_GET['delete_id'];

    $query = "DELETE FROM exams WHERE id = $delete_id";
    if (mysqli_query($conn, $query)) {
        $success_message = "Xóa đề thi thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Lấy danh sách đề thi từ cơ sở dữ liệu
$query = "SELECT id, exam_name, exam_time FROM exams";
$result = mysqli_query($conn, $query);

$title = "Quản lý đề thi";

include(__DIR__ . '/../header.php');
?>

    <h1 class="bm-title">Quản lý đề thi</h1>

    <!-- Form thêm đề thi -->
    <form method="POST">
        <h2>Thêm đề thi</h2>
        Tên đề thi: <input type="text" name="exam_name" required><br>
        Thời gian làm bài: <input type="number" name="exam_time" required><br>
        <input type="submit" name="add_exam" value="Thêm">
    </form>

    <?php if (isset($success_message)) { echo "<p style='color: green;'>$success_message</p>"; } ?>
    <?php if (isset($error_message)) { echo "<p style='color: red;'>$error_message</p>"; } ?>

    <!-- Danh sách đề thi -->
    <h2>Danh sách đề thi</h2>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Tên đề thi</th>
            <th>Thời gian làm bài</th>
            <th>Thao tác</th>
        </tr>
        <?php while ($row = mysqli_fetch_assoc($result)) { ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo $row['exam_name']; ?></td>
                <td><?php echo $row['exam_time']; ?></td>
                <td>
                    <a href="edit_exam.php?id=<?php echo $row['id']; ?>">Sửa</a> | 
                    <a href="manage_exams.php?delete_id=<?php echo $row['id']; ?>" onclick="return confirm('Bạn có chắc chắn muốn xóa đề thi này?');">Xóa</a>
                </td>
            </tr>
        <?php } ?>
    </table>

   <p><a href="<?php echo BASE_URL; ?>/index.php">Trang chủ</a></p>
    <script>
        $("#examForm").submit(function(event) {
            event.preventDefault();
            var formData = $(this).serialize();
            var exam_id = <?php echo $exam_id; ?>; // Lấy giá trị exam_id từ PHP vào JavaScript
            formData += '&exam_id=' + exam_id; // Thêm exam_id vào formData
            $.post("submit_exam.php", formData, function(data) {
                alert(data);
                // console.log(data);
                window.location.href = "./student/results.php?exam_id=<?php echo $exam_id; ?>";
            });
        });
    </script>
<?php include(__DIR__ . '/../footer.php');
