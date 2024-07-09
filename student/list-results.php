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
?>

<!DOCTYPE html>
<html>
<head>
    <title class="tdmu-title">Danh sách kết quả đề thi</title>
</head>
<body>
    <section class="tdmu-list-results">
        <h1 class="tdmu-title">Danh sách kết quả đề thi</h1>
        <ul>
            <?php while($exam = mysqli_fetch_assoc($result)) { ?>
                <li>
                    <a href="results.php?exam_id=<?php echo $exam['id']; ?>"><?php echo $exam['exam_name']; ?></a>
                </li>
            <?php } ?>
        </ul>
    </section>
    
</body>
</html>
