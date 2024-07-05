<?php
session_start();
include(__DIR__ . '/../config/config.php');

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$exam_id = $_GET['exam_id'];
$user_id = $_SESSION['user_id'];
// Lấy kết quả thi mới nhất của người dùng
$query = "SELECT * FROM results WHERE user_id = $user_id AND exam_id = $exam_id ORDER BY submitted_at DESC LIMIT 1";
$result = mysqli_query($conn, $query);
$exam_result = mysqli_fetch_assoc($result);
// Lấy danh sách các câu hỏi và câu trả lời
$query = "SELECT q.question_text, q.correct_option, ua.selected_option
          FROM questions q
          JOIN exam_questions eq ON q.id = eq.question_id
          JOIN user_answers ua ON q.id = ua.question_id
          WHERE eq.exam_id = $exam_id AND ua.result_id = " . $exam_result['id'];
$result = mysqli_query($conn, $query);

// Tính tổng số câu hỏi
$query_total_questions = "SELECT COUNT(*) as total_questions FROM exam_questions WHERE exam_id = $exam_id";
$result_total_questions = mysqli_query($conn, $query_total_questions);
$total_questions_data = mysqli_fetch_assoc($result_total_questions);
$total_questions = $total_questions_data['total_questions'];

// Tính điểm theo thang điểm 10
$score_per_question = 10 / $total_questions;
$total_score = $score_per_question * $exam_result['score'];

$title = "Kết quả thi";

include(__DIR__ . '/../header.php');
?>

    <h1 class="tdmu-title">Kết quả thi</h1>
    <p>Số câu đúng: <?php echo $exam_result['score']; ?> / Tổng số câu: <?php echo $total_questions; ?></p>
    <p>Điểm: <?php echo number_format($total_score, 2); ?></p> <!-- Sử dụng number_format để làm tròn điểm số -->
    <h2>Chi tiết câu hỏi:</h2>
    <ul>
        <?php while($question = mysqli_fetch_assoc($result)) { ?>
            <li>
                <p><?php echo $question['question_text']; ?></p>
                <p>Đáp án đúng: <?php echo $question['correct_option']; ?></p>
                <p>Đáp án bạn chọn: <?php echo $question['selected_option']; ?></p>
            </li>
        <?php } ?>
    </ul>
<?php include(__DIR__ . '/../footer.php');