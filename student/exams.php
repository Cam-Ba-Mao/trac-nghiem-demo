<?php
session_start();
include(__DIR__ . '/../config/config.php');

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
$conn = getDatabaseConnection();
// Lấy danh sách các đề thi
$query = "SELECT * FROM exams";
$result = mysqli_query($conn, $query);
$exams = [];
while ($exam = mysqli_fetch_assoc($result)) {
    $exams[] = $exam;
}

$title = "Danh sách đề thi";
$class = "page-template-list-exams";
include(__DIR__ . '/../header.php');
?>
    <section class="bm-list-exams">
        <div class="container"> 
            <h1 class="bm-title">Danh sách đề thi</h1>
            <ul>
                <?php foreach ($exams as $exam) { ?>
                    <li>
                        <a href="take_exam.php?exam_id=<?php echo $exam['id']; ?>&exam_name=<?php echo $exam['exam_name']; ?>"><?php echo $exam['exam_name']; ?></a>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </section>
    
<?php include(__DIR__ . '/../footer.php');

