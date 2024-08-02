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
$query = "SELECT q.id, q.question_text, q.correct_option, ua.selected_option
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

// Tính số câu sai
$wrong_answers = $total_questions - $exam_result['score'];

$title = "Kết quả thi";

include(__DIR__ . '/../header.php');
?>
<section class="tdmu-results">
    <h1 class="tdmu-title"> </h1>
    <div class="tdmu-results__wrap">
        <div class="tdmu-results-left">
            <div class="tdmu-take-exam__answer">
                <?php 
                    $key = 1;
                    $result_left = mysqli_query($conn, $query); // Reset result set to use it again
                    while ($question = mysqli_fetch_assoc($result_left)) { 
                        $is_correct = $question['selected_option'] === $question['correct_option'];
                ?>
                    <a href="#quest-<?= $key; ?>" class="menu-link">
                        Câu <?= $key; ?> 
                        <span class="<?= $is_correct ? 'tick-green' : 'tick-red'; ?>" id="tick-<?= $question['id']; ?>">
                            <?= $is_correct ? '✓' : '✗'; ?>
                        </span>
                    </a>
                <?php 
                    $key++;
                    } 
                ?>
            </div>
        </div>
        <div class="tdmu-results-middle">
            <div class="tdmu-results__content">
                <div class="tdmu-results__info">
                    <h2 class="tdmu-results__info--title">Kết quả thi:</h2>
                    <div class="tdmu-results__info--total">Tổng số câu: <?php echo $total_questions; ?></div>
                    <div class="tdmu-results__info--correct">Số câu đúng: <?php echo $exam_result['score']; ?></div>
                    <div class="tdmu-results__info--wrong">Số câu sai: <?php echo $wrong_answers; ?></div>
                    <div class="tdmu-results__info--score">Điểm: <?php echo number_format($total_score, 2); ?></div> <!-- Sử dụng number_format để làm tròn điểm số -->
                    <div class="tdmu-results__info--note">
                        <h3>Chi tiết bài kiểm tra: </h3>
                        <span>Ghi chú:</span>
                        <p><strong>Màu xanh lá</strong> là màu đáp án đúng</p>
                        <p><strong>Màu xanh dương</strong> là đáp án bạn chọn đúng</p>
                        <p><strong>Màu đỏ</strong> là đáp án bạn chọn sai</p>
                    </div>
                </div>
                
                <ul>
                    <?php 
                    $key = 1; 
                    mysqli_data_seek($result, 0); // Reset result set to use it again
                    while($question = mysqli_fetch_assoc($result)) { 
                        $is_correct = $question['selected_option'] === $question['correct_option'];
                    ?>
                        <li id="quest-<?= $key; ?>">
                            <p><strong>Câu <?= $key; ?>: <?php echo $question['question_text']; ?></strong></p>
                            <p style="color: green; font-weight: 600;">Đáp án đúng: <?php echo $question['correct_option']; ?></p>
                            <?php if ($is_correct) { ?>
                                <p style="color: blue; font-weight: 600;">Đáp án bạn chọn: <?php echo $question['selected_option']; ?></p>
                            <?php } else { ?>
                                <p style="color: red; font-weight: 600;">Đáp án bạn chọn: <?php echo $question['selected_option']; ?></p>
                            <?php } ?>
                        </li>
                    <?php 
                    $key++; 
                    } 
                    ?>
                </ul>
            </div>
        </div>
    </div>
</section>

<script>
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 65
                }, 500);
                return false;
            }
        }
    });
</script>

<style>
    .tick-green {
        color: green;
    }
    .tick-red {
        color: red;
    }
</style>

<?php include(__DIR__ . '/../footer.php'); ?>
