<?php
session_start();
include(__DIR__ . '/../config/config.php');

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy exam_id từ formData
    $exam_id = $_POST['exam_id'];
    // Lấy user_id từ session (hoặc từ form nếu có cách xác định user_id khác)
    $user_id = $_SESSION['user_id']; // Ví dụ sử dụng session
    $score = 0;

    // Lấy danh sách tất cả các câu hỏi trong bài thi
    $query = "SELECT q.id, q.correct_option FROM questions q 
              JOIN exam_questions eq ON q.id = eq.question_id 
              WHERE eq.exam_id = $exam_id";
    $result = mysqli_query($conn, $query);
    $questions = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $questions[$row['id']] = $row['correct_option'];
    }

  

    // Lưu kết quả vào cơ sở dữ liệu
    $query = "INSERT INTO results (user_id, exam_id, score, submitted_at) VALUES ($user_id, $exam_id, $score, NOW())";
    mysqli_query($conn, $query);

    // Lấy id của kết quả vừa được thêm vào
    $result_id = mysqli_insert_id($conn);

    // Kiểm tra nếu không thể lấy được id, xử lý theo yêu cầu của bạn
    if (!$result_id) {
        echo "Lỗi khi lấy id của kết quả vừa thêm vào.";
        exit();
    }

    // Lặp qua tất cả các câu hỏi để tính điểm và lưu câu trả lời
    foreach ($questions as $question_id => $correct_option) {
        // Kiểm tra xem câu hỏi có trong $_POST không
        $key = 'question_' . $question_id;
        $selected_option = isset($_POST[$key]) ? $_POST[$key] : "Chưa chọn";
        
        // Tính điểm
        if ($correct_option == $selected_option) {
            $score++;
        }

        // Lưu câu trả lời vào bảng user_answers
        $query_insert = "INSERT INTO user_answers (result_id, question_id, selected_option) 
                         VALUES ($result_id, $question_id, '$selected_option')";
        if (!mysqli_query($conn, $query_insert)) {
            echo "Lỗi khi lưu câu trả lời cho câu hỏi có ID $question_id: " . mysqli_error($conn);
        }
    }

    // Cập nhật điểm số vào bảng results
    $update_query = "UPDATE results SET score = $score WHERE id = $result_id";
    mysqli_query($conn, $update_query);

    // Thông báo hoặc chuyển hướng sau khi lưu thành công (tuỳ theo yêu cầu của bạn)
    echo "Bạn đã nộp bài thành công. Điểm của bạn là: $score \n";
    echo "Đã lưu câu trả lời của bạn.";
}
