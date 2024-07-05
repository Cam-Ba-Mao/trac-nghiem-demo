<?php
session_start();
include(__DIR__ . '/../config/config.php');

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Lấy danh sách các đề thi
$query = "SELECT * FROM exams";
$result = mysqli_query($conn, $query);

$title = "Danh sách đề thi";

include(__DIR__ . '/../header.php');
?>

    <h1 class="tdmu-title">Danh sách đề thi</h1>
    <ul>
        <?php while($exam = mysqli_fetch_assoc($result)) { ?>
            <li>
                <a href="take_exam.php?exam_id=<?php echo $exam['id']; ?>&exam_name=<?php echo $exam['exam_name']; ?>"><?php echo $exam['exam_name']; ?></a>
            </li>
        <?php } ?>
    </ul>
<?php include(__DIR__ . '/../footer.php');

