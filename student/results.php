<?php
session_start();
include(__DIR__ . '/../config/config.php');

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$exam_id = $_GET['exam_id'];
$user_id = $_SESSION['user_id'];

$query = "SELECT * FROM results WHERE user_id = $user_id AND exam_id = $exam_id ORDER BY submitted_at DESC LIMIT 1";
$result = mysqli_query($conn, $query);
$exam_result = mysqli_fetch_assoc($result);

$query = "SELECT q.question_text, q.correct_option, ua.selected_option
          FROM questions q
          JOIN exam_questions eq ON q.id = eq.question_id
          JOIN user_answers ua ON q.id = ua.question_id
          WHERE eq.exam_id = $exam_id AND ua.result_id = " . $exam_result['id'];
$result = mysqli_query($conn, $query);

$title = "Kết quả thi";

include(__DIR__ . '/../header.php');
?>

    <h1>Kết quả thi</h1>
    <p>Điểm của bạn là: <?php echo $exam_result['score']; ?></p>
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