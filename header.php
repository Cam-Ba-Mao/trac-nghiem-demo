<?php
    include(__DIR__ .'/config/config.php');
?>
<!-- https://fontawesome.com/v6/icons?o=r&m=free -->
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL; ?>/assets/css/styles.css">
</head>
<body class="<?= !empty($class) ?  $class : '' ?>">
    <div class="tdmu-container">
        <!-- START HEADER-->
        <header class="tdmu-header">
            <!-- <h1>Quiz Application</h1> -->
            <div class="tdmu-header__wrap">
                <div class="tdmu-header__brand">
                    <a href="<?php echo BASE_URL; ?>/index.php">
                        <img src="<?php echo BASE_URL; ?>/assets/img/Logo_TDMU_2024_nguyen_ban.svg" alt="">
                    </a>
                </div>
                <div class="tdmu-header__right">
                    <?php if (isset($title) && $title == "Làm bài thi"): ?>
                    <div class="tdmu-header__take-exam-time">
                        <span>Thời gian làm bài:</span>
                        <div class="time-to-do" id="timer">
                            <?php echo $exam['exam_time'] . ":00"; ?>
                        </div>
                    </div>
                    <?php endif; ?>
                    <!-- Other header content -->
                    <?php if (isset($_SESSION['user_id'])): ?>
                    <?php
                        $user_id = $_SESSION['user_id'];
                        $queryAvatar = "SELECT avatar FROM users WHERE id = $user_id";
                        $resultAvatar = mysqli_query($conn, $queryAvatar);
                        $user = mysqli_fetch_assoc($resultAvatar);
                        $avatar = $user['avatar'] ? $user['avatar'] : 'default-avatar.png';     
                    ?>
                    <div class="avatar-container">
                        <img src="<?php echo BASE_URL; ?>/assets/upload/<?php echo $avatar; ?>" alt="Avatar" class="avatar" onclick="toggleDropdown()">
                        <div id="dropdownMenu" class="dropdown-menu">
                            <a href="<?php echo BASE_URL; ?>/request_password_change.php">Đổi mật khẩu</a>
                            <a href="<?php echo BASE_URL; ?>/upload_avatar.php">Đổi avatar</a> <!-- Thêm tùy chọn đổi avatar -->
                            <!-- Other menu items if needed -->
                        </div>
                    </div>    
                    <?php endif; ?>
                </div>
            </div>   
            
        </header>
        <!-- CLOSE HEADER-->
        <main class="tdmu-content">  
        
        