<?php
session_start();
include(__DIR__ . '/../config/config.php');

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$exam_id = $_GET['exam_id'];
$exam_name = $_GET['exam_name'];
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
$class = "is-transparent";

include(__DIR__ . '/../header.php');
?>
    
    <div class="bm-take-exam">
        <h1 class="bm-title">Làm bài thi <?= $exam_name; ?></h1>
        <div class="bm-take-exam__wrap">
            <div class="bm-take-left">
                <div class="bm-take-exam__answer">
                    <?php 
                        $key = 1;
                        $result = mysqli_query($conn, $query); // Reset result set to use it again
                        while ($question = mysqli_fetch_assoc($result)) { ?>
                            <a href="#quest-<?= $key; ?>" class="menu-link">Câu <?= $key; ?> <span class="tick" id="tick-<?= $question['id']; ?>"></span></a>
                    <?php 
                        $key++;
                        } 
                    ?>
                </div>
            </div>
            <div class="bm-take-middle">
                <div class="bm-take-exam__content">
                    <form id="examForm">
                        <?php 
                            $key = 1;
                            $result = mysqli_query($conn, $query); // Reset result set to use it again
                            while ($question = mysqli_fetch_assoc($result)) { ?>
                            <div id="quest-<?= $key; ?>">
                                <p><?php echo "Câu " . $key . '. ' . $question['question_text']; ?></p>
                                <input type="radio" name="question_<?php echo $question['id']; ?>" value="A"> <span><?php echo $question['option_a']; ?></span> <br>
                                <input type="radio" name="question_<?php echo $question['id']; ?>" value="B"> <span><?php echo $question['option_b']; ?></span><br>
                                <input type="radio" name="question_<?php echo $question['id']; ?>" value="C"> <span><?php echo $question['option_c']; ?></span><br>
                                <input type="radio" name="question_<?php echo $question['id']; ?>" value="D"> <span><?php echo $question['option_d']; ?></span><br>
                            </div>
                        <?php 
                            $key++;
                            } ?>
                        <input type="submit" value="Nộp bài">
                    </form>
                </div>
            </div>
            <div class="bm-take-right">
                <div class="student-info">
                    <h3>Thông tin sinh viên: </h3>
                    <span><strong>Họ tên:</strong> &nbsp;<?php echo $_SESSION['username']; ?>!</span>
                </div>
            </div>
        </div>
    </div>
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

        $('a[href*="#"]:not([href="#"])').click(function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
                    if($('body.scroll-down').length >= 0)
                    {
                        $('html, body').animate({
                            scrollTop: target.offset().top - $('.bm-header').outerHeight() - 65
                        }, 500);
                    } else {
                        $('html, body').animate({
                            scrollTop: target.offset().top - 65
                        }, 500);
                    }
					return false;
				}
			}
		});
       
        $('input[type=radio]').on("change", function () {
            var question_id = $(this).attr("name").split('_')[1];
            $('#tick-' + question_id).text("✓");
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
                if (min < 10) {
                    $('#timer').css('color', 'red');
                }

                if (min < 0) {
                    clearInterval(cdID);
                    $('#timer').text('00:00');
                    console.log('Hết giờ, hệ thống sẽ tự động nộp bài!');
                    $("#examForm").submit();
                }
            }, 1000);
        }
    </script>
<?php include(__DIR__ . '/../footer.php');
