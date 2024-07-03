<?php
// manage_questions.php

session_start();
include(__DIR__ . '/../config/config.php');

// Kiểm tra vai trò của người dùng
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

// Xử lý thêm câu hỏi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['add_question'])) {
    $question_text = $_POST['question_text'];
    $option_a = $_POST['option_a'];
    $option_b = $_POST['option_b'];
    $option_c = $_POST['option_c'];
    $option_d = $_POST['option_d'];
    $correct_option = $_POST['correct_option'];

    $query = "INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option)
              VALUES ('$question_text', '$option_a', '$option_b', '$option_c', '$option_d', '$correct_option')";
    if (mysqli_query($conn, $query)) {
        $success_message = "Thêm câu hỏi thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Xử lý xóa câu hỏi
if (isset($_GET['delete_id'])) {
    $delete_id = $_GET['delete_id'];

    $query = "DELETE FROM questions WHERE id = $delete_id";
    if (mysqli_query($conn, $query)) {
        $success_message = "Xóa câu hỏi thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Lấy danh sách câu hỏi từ cơ sở dữ liệu
$query = "SELECT id, question_text, correct_option FROM questions";
$result = mysqli_query($conn, $query);

$title = "Quản lý câu hỏi";

include(__DIR__ . '/../header.php');
?>

    <h1>Quản lý câu hỏi</h1>

    <!-- Form thêm câu hỏi -->
    <form method="POST">
        <h2>Thêm câu hỏi</h2>
        Nội dung câu hỏi: <input type="text" name="question_text" required><br>
        Lựa chọn A: <input type="text" name="option_a" required><br>
        Lựa chọn B: <input type="text" name="option_b" required><br>
        Lựa chọn C: <input type="text" name="option_c" required><br>
        Lựa chọn D: <input type="text" name="option_d" required><br>
        Đáp án đúng: 
        <select name="correct_option">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
        </select><br>
        <input type="submit" name="add_question" value="Thêm">
    </form>

    <?php if (isset($success_message)) { echo "<p style='color: green;'>$success_message</p>"; } ?>
    <?php if (isset($error_message)) { echo "<p style='color: red;'>$error_message</p>"; } ?>

    <!-- Danh sách câu hỏi -->
    <h2>Danh sách câu hỏi</h2>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Nội dung câu hỏi</th>
            <th>Đáp án đúng</th>
            <th>Thao tác</th>
        </tr>
        <?php while ($row = mysqli_fetch_assoc($result)) { ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo $row['question_text']; ?></td>
                <td><?php echo $row['correct_option']; ?></td>
                <td>
                    <a href="edit_question.php?id=<?php echo $row['id']; ?>">Sửa</a> | 
                    <a href="manage_questions.php?delete_id=<?php echo $row['id']; ?>" onclick="return confirm('Bạn có chắc chắn muốn xóa câu hỏi này?');">Xóa</a>
                </td>
            </tr>
        <?php } ?>
    </table>

   <p><a href="<?php echo BASE_URL; ?>/index.php">Trang chủ</a></p>
<?php include(__DIR__ . '/../footer.php');