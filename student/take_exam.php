<?php
session_start();
include(__DIR__ . '/../config/config.php');

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$exam_id = $_GET['exam_id'];
$query = "SELECT q.* FROM questions q 
        JOIN exam_questions eq ON q.id = eq.question_id 
        WHERE eq.exam_id = $exam_id";
$result = mysqli_query($conn, $query);

$query2 = "SELECT id, exam_name, exam_time FROM exams WHERE id = $exam_id";
$result2 = mysqli_query($conn, $query2);
$exam = mysqli_fetch_assoc($result2);

$min = $exam['exam_time'];
$sec = 0;

$title = "Làm bài thi";

include(__DIR__ . '/../header.php');
?>

    <div class="time-to-do" id="timer">
        <?php echo $exam['exam_time'] . ":00"; ?>
    </div>
    <form id="examForm">
        <?php 
            $key = 1;
        while ($question = mysqli_fetch_assoc($result)) { ?>
            <div>
                <p><?php echo "Câu " . $key . '. ' . $question['question_text']; ?></p>
                <input type="radio" name="question_<?php echo $question['id']; ?>" value="A"> <?php echo $question['option_a']; ?><br>
                <input type="radio" name="question_<?php echo $question['id']; ?>" value="B"> <?php echo $question['option_b']; ?><br>
                <input type="radio" name="question_<?php echo $question['id']; ?>" value="C"> <?php echo $question['option_c']; ?><br>
                <input type="radio" name="question_<?php echo $question['id']; ?>" value="D"> <?php echo $question['option_d']; ?><br>
            </div>
        <?php 
        $key++;
        } ?>
        <input type="submit" value="Nộp bài">
    </form>

    <script>
        var min = <?= $min ?>;
        var sec = <?= $sec ?>;
        countdown();

        $("#examForm").submit(function(event) {
            event.preventDefault();
            var formData = $(this).serialize();
            var exam_id = <?php echo $exam_id; ?>;
            formData += '&exam_id=' + exam_id;
            $.post("submit_exam.php", formData, function(data) {
                alert(data);
                window.location.href = "results.php?exam_id=<?php echo $exam_id; ?>";
            });
        });

        function countdown() {
            var cdID = setInterval(function() {
                if (sec == 0) {
                    min--;
                    sec = 60;
                }
                sec--;
                var min_text = min < 10 ? '0' + min : min;
                var sec_text = sec < 10 ? '0' + sec : sec;
                $('#timer').text(min_text + ':' + sec_text);

                if (min < 0) {
                    clearInterval(cdID);
                    $('#timer').text('00:00');
                    $('#timer').css('color', 'red');
                    console.log('Hết giờ, hệ thống sẽ tự động nộp bài!');
                    $("#examForm").submit();
                }
            }, 1000);
        }
    </script>
<?php include(__DIR__ . '/../footer.php');
