<?php
// edit_question.php

session_start();
include(__DIR__ . '/../config/config.php');;

// Kiểm tra vai trò của người dùng
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

// Xử lý chỉnh sửa câu hỏi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['edit_question'])) {
    $id = $_POST['id'];
    $question_text = $_POST['question_text'];
    $option_a = $_POST['option_a'];
    $option_b = $_POST['option_b'];
    $option_c = $_POST['option_c'];
    $option_d = $_POST['option_d'];
    $correct_option = $_POST['correct_option'];

    $query = "UPDATE questions SET 
              question_text = '$question_text', 
              option_a = '$option_a', 
              option_b = '$option_b', 
              option_c = '$option_c', 
              option_d = '$option_d', 
              correct_option = '$correct_option' 
              WHERE id = $id";
    if (mysqli_query($conn, $query)) {
        $success_message = "Chỉnh sửa câu hỏi thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Lấy thông tin câu hỏi cần sửa từ cơ sở dữ liệu
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $query = "SELECT id, question_text, option_a, option_b, option_c, option_d, correct_option FROM questions WHERE id = $id";
    $result = mysqli_query($conn, $query);
    $question = mysqli_fetch_assoc($result);
}
$title = "Sửa câu hỏi";

include(__DIR__ . '/../header.php');
?>
    <h1 class="bm-title">Sửa câu hỏi</h1>

    <?php if (isset($success_message)) { echo "<p style='color: green;'>$success_message</p>"; } ?>
    <?php if (isset($error_message)) { echo "<p style='color: red;'>$error_message</p>"; } ?>

    <form method="POST">
        <input type="hidden" name="id" value="<?php echo $question['id']; ?>">
        Nội dung câu hỏi: <input type="text" name="question_text" value="<?php echo $question['question_text']; ?>" required><br>
        Lựa chọn A: <input type="text" name="option_a" value="<?php echo $question['option_a']; ?>" required><br>
        Lựa chọn B: <input type="text" name="option_b" value="<?php echo $question['option_b']; ?>" required><br>
        Lựa chọn C: <input type="text" name="option_c" value="<?php echo $question['option_c']; ?>" required><br>
        Lựa chọn D: <input type="text" name="option_d" value="<?php echo $question['option_d']; ?>" required><br>
        Đáp án đúng: 
        <select name="correct_option">
            <option value="A" <?php if ($question['correct_option'] == 'A') echo 'selected'; ?>>A</option>
            <option value="B" <?php if ($question['correct_option'] == 'B') echo 'selected'; ?>>B</option>
            <option value="C" <?php if ($question['correct_option'] == 'C') echo 'selected'; ?>>C</option>
            <option value="D" <?php if ($question['correct_option'] == 'D') echo 'selected'; ?>>D</option>
        </select><br>
        <input type="submit" name="edit_question" value="Lưu">
    </form>

    <p><a href="manage_questions.php">Quay lại</a></p>
<?php include(__DIR__ . '/../footer.php');
