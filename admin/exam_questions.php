<?php
// exam_questions.php

session_start();
include(__DIR__ . '/../config/config.php');

// Kiểm tra vai trò của người dùng
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Lấy danh sách các đề thi
$query = "SELECT id, exam_name FROM exams";
$result_exams = mysqli_query($conn, $query);

// Xử lý khi người dùng chọn đề thi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['select_exam'])) {
    $exam_id = $_POST['exam_id'];

    // Lấy thông tin đề thi từ cơ sở dữ liệu
    $query_exam = "SELECT id, exam_name FROM exams WHERE id = $exam_id";
    $result_exam = mysqli_query($conn, $query_exam);
    $exam = mysqli_fetch_assoc($result_exam);

    // Lấy danh sách câu hỏi cho đề thi đã chọn
    $query_questions = "SELECT q.id, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option
                        FROM questions q
                        INNER JOIN exam_questions eq ON q.id = eq.question_id
                        WHERE eq.exam_id = $exam_id";
    $result_questions = mysqli_query($conn, $query_questions);
}

// Xử lý thêm số lượng câu hỏi vào đề thi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['add_random_questions'])) {
    $exam_id = $_POST['exam_id'];
    $num_questions = intval($_POST['num_questions']);

    // Lấy danh sách các câu hỏi chưa có trong đề thi
    $query_available_questions = "SELECT q.id
                                  FROM questions q
                                  LEFT JOIN exam_questions eq ON q.id = eq.question_id AND eq.exam_id = $exam_id
                                  WHERE eq.question_id IS NULL
                                  ORDER BY RAND()
                                  LIMIT $num_questions";
    $result_available_questions = mysqli_query($conn, $query_available_questions);

    while ($row = mysqli_fetch_assoc($result_available_questions)) {
        $question_id = $row['id'];
        $insert_query = "INSERT INTO exam_questions (exam_id, question_id) VALUES ($exam_id, $question_id)";
        mysqli_query($conn, $insert_query);
    }

    $success_message = "Đã thêm $num_questions câu hỏi vào đề thi thành công.";
}

// Xử lý xóa câu hỏi khỏi đề thi
if (isset($_GET['delete_id'])) {
    $delete_id = $_GET['delete_id'];

    $query_delete = "DELETE FROM exam_questions WHERE id = $delete_id";
    if (mysqli_query($conn, $query_delete)) {
        $success_message = "Xóa câu hỏi khỏi đề thi thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

$title = "Quản lý câu hỏi cho đề thi";

include(__DIR__ . '/../header.php');
?>

    <h1>Quản lý câu hỏi cho đề thi</h1>

    <!-- Form chọn đề thi -->
    <form method="POST">
        Chọn đề thi: 
        <select name="exam_id">
            <?php while ($row = mysqli_fetch_assoc($result_exams)) { ?>
                <option value="<?php echo $row['id']; ?>"><?php echo $row['exam_name']; ?></option>
            <?php } ?>
        </select>
        <input type="submit" name="select_exam" value="Chọn">
    </form>

    <?php if (isset($exam)) { ?>
        <h2>Đề thi: <?php echo $exam['exam_name']; ?></h2>

        <!-- Danh sách câu hỏi của đề thi -->
        <h3>Danh sách câu hỏi của đề thi</h3>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Nội dung câu hỏi</th>
                <th>Thao tác</th>
            </tr>
            <?php while ($row = mysqli_fetch_assoc($result_questions)) { ?>
                <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['question_text']; ?></td>
                    <td>
                        <a href="exam_questions.php?delete_id=<?php echo $row['id']; ?>" onclick="return confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi đề thi?');">Xóa khỏi đề thi</a>
                    </td>
                </tr>
            <?php } ?>
        </table>

        <!-- Form thêm số lượng câu hỏi vào đề thi -->
        <h3>Thêm số lượng câu hỏi vào đề thi</h3>
        <form method="POST">
            <input type="hidden" name="exam_id" value="<?php echo $exam['id']; ?>">
            Số lượng câu hỏi: 
            <input type="number" name="num_questions" min="1" max="100" required>
            <input type="submit" name="add_random_questions" value="Thêm vào đề thi">
        </form>

        <?php if (isset($success_message)) { echo "<p style='color: green;'>$success_message</p>"; } ?>
        <?php if (isset($error_message)) { echo "<p style='color: red;'>$error_message</p>"; } ?>
    <?php } ?>

   <p><a href="<?php echo BASE_URL; ?>/index.php">Trang chủ</a></p>
<?php include(__DIR__ . '/../footer.php');
