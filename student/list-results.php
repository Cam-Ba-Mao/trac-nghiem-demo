<?php
session_start();
include('config.php');

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
    <title>Danh sách đề thi</title>
</head>
<body>
    <h1>Danh sách đề thi</h1>
    <ul>
        <?php while($exam = mysqli_fetch_assoc($result)) { ?>
            <li>
                <a href="results.php?exam_id=<?php echo $exam['id']; ?>"><?php echo $exam['exam_name']; ?></a>
            </li>
        <?php } ?>
    </ul>
</body>
</html>
