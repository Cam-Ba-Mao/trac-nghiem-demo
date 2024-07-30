<?php
    include(__DIR__ .'/config/config.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="<?php echo BASE_URL; ?>/assets/img/Icon.png">
    <title><?php echo isset($title) ? $title : "Website thi trắc nghiệm"; ?></title>
    <script src="<?php echo BASE_URL; ?>/assets/js/jquery-3.7.1.min.js"></script>
    <script src="<?php echo BASE_URL; ?>/assets/js/bootstrap.min.js"></script>
    <script src="<?php echo BASE_URL; ?>/assets/js/scripts.js"></script>
    <!-- <link rel="stylesheet" href="<?php echo BASE_URL; ?>/assets/css/cssreset.css" /> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==" crossorigin="anonymous"/>
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/assets/fonts/material-icon/css/material-design-iconic-font.min.css"/>
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL; ?>/assets/css/styles.css">
</head>
<body class="<?= !empty($class) ?  $class : '' ?>">
    <header class="tdmu-header">
        <!-- <h1>Quiz Application</h1> -->
        <div class="tdmu-header__wrap">
            <div class="tdmu-header__brand">
                <a href="<?php echo BASE_URL; ?>/index.php">
                    <img src="<?php echo BASE_URL; ?>/assets/img/Logo_TDMU_2024_nguyen_ban.svg" alt="">
                </a>
            </div>
            <?php if (isset($title) && $title == "Làm bài thi"): ?>
            <div class="tdmu-header__take-exam-time">
                <span>Thời gian làm bài:</span>
                <div class="time-to-do" id="timer">
                    <?php echo $exam['exam_time'] . ":00"; ?>
                </div>
            </div>
            <?php endif; ?>
        </div>        
    </header>
    <main class="tdmu-content">
