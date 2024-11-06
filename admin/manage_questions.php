<?php
// manage_questions.php

session_start();
include(__DIR__ . '/../config/config.php');

// Kiểm tra vai trò của người dùng
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

require __DIR__ . '/../lib/SpreadSheet/vendor/autoload.php'; // Đảm bảo đường dẫn đúng tới file autoload.php của PhpSpreadsheet

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Xử lý thêm câu hỏi
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['add_question'])) {
    $question_text = $_POST['question_text'];
    $option_a = $_POST['option_a'];
    $option_b = $_POST['option_b'];
    $option_c = $_POST['option_c'];
    $option_d = $_POST['option_d'];
    $correct_option = $_POST['correct_option'];

    $query = "INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option)
              VALUES ('$question_text', '$option_a', '$option_b', '$option_c', '$option_d', '$correct_option')";
    if (mysqli_query($conn, $query)) {
        $success_message = "Thêm câu hỏi thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Xử lý xóa câu hỏi
if (isset($_GET['delete_id'])) {
    $delete_id = $_GET['delete_id'];

    $query = "DELETE FROM questions WHERE id = $delete_id";
    if (mysqli_query($conn, $query)) {
        $success_message = "Xóa câu hỏi thành công.";
    } else {
        $error_message = "Lỗi: " . mysqli_error($conn);
    }
}

// Xử lý nhập câu hỏi từ file Excel
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['import_questions'])) {
    $file = $_FILES['questions_file']['tmp_name'];

    $spreadsheet = IOFactory::load($file);
    $sheetData = $spreadsheet->getActiveSheet()->toArray();

    foreach ($sheetData as $row) {
        $question_text = $row[0];
        $option_a = $row[1];
        $option_b = $row[2];
        $option_c = $row[3];
        $option_d = $row[4];
        $correct_option = $row[5];

        // $query = "INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option)
        //           VALUES ('$question_text', '$option_a', '$option_b', '$option_c', '$option_d', '$correct_option')";
        // mysqli_query($conn, $query);

        $query = "INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option)
          VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, 'ssssss', $question_text, $option_a, $option_b, $option_c, $option_d, $correct_option);

        if (mysqli_stmt_execute($stmt)) {
            $success_message = "Thêm câu hỏi thành công.";
        } else {
            $error_message = "Lỗi: " . mysqli_error($conn);
        }

        mysqli_stmt_close($stmt);
    }
    $success_message = "Nhập câu hỏi thành công.";
}

// Xử lý xuất câu hỏi ra file Excel
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['export_questions'])) {
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    $sheet->setCellValue('A1', 'Nội dung câu hỏi');
    $sheet->setCellValue('B1', 'Lựa chọn A');
    $sheet->setCellValue('C1', 'Lựa chọn B');
    $sheet->setCellValue('D1', 'Lựa chọn C');
    $sheet->setCellValue('E1', 'Lựa chọn D');
    $sheet->setCellValue('F1', 'Đáp án đúng');

    $query = "SELECT question_text, option_a, option_b, option_c, option_d, correct_option FROM questions";
    $result = mysqli_query($conn, $query);
    $rowNumber = 2; // Bắt đầu từ hàng thứ 2 để không ghi đè lên tiêu đề

    while ($row = mysqli_fetch_assoc($result)) {
        $sheet->setCellValue('A' . $rowNumber, $row['question_text']);
        $sheet->setCellValue('B' . $rowNumber, $row['option_a']);
        $sheet->setCellValue('C' . $rowNumber, $row['option_b']);
        $sheet->setCellValue('D' . $rowNumber, $row['option_c']);
        $sheet->setCellValue('E' . $rowNumber, $row['option_d']);
        $sheet->setCellValue('F' . $rowNumber, $row['correct_option']);
        $rowNumber++;
    }

    $writer = new Xlsx($spreadsheet);
    $fileName = 'questions.xlsx';
    $filePath = __DIR__ . '/' . $fileName;
    $writer->save($filePath);

    header('Content-Description: File Transfer');
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filePath));
    flush(); // Flush system output buffer
    readfile($filePath);
    exit();
}

// Lấy danh sách câu hỏi từ cơ sở dữ liệu
$query = "SELECT id, question_text, correct_option FROM questions";
$result = mysqli_query($conn, $query);

$title = "Quản lý câu hỏi";

include('header.php');
?>
    <div class="bm-admin-title">
        <h1>Quản lý câu hỏi</h1>
    </div>
    <div class="bm-admin-content">

        <!-- Form thêm câu hỏi -->
        <form method="POST" class="admin-tablelist">
            <h2>Thêm câu hỏi</h2>
            Nội dung câu hỏi: <input type="text" class="form-control" name="question_text" required><br>
            Lựa chọn A: <input type="text" class="form-control" name="option_a" required><br>
            Lựa chọn B: <input type="text" class="form-control" name="option_b" required><br>
            Lựa chọn C: <input type="text" class="form-control" name="option_c" required><br>
            Lựa chọn D: <input type="text" class="form-control" name="option_d" required><br>
            Đáp án đúng: 
            <select class="form-control" name="correct_option">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select><br>
            <input type="submit" class="button btn-submit" name="add_question" value="Thêm">
        </form>

        <?php if (isset($success_message)) { echo "<p style='color: green;'>$success_message</p>"; } ?>
        <?php if (isset($error_message)) { echo "<p style='color: red;'>$error_message</p>"; } ?>

        <!-- Form tải lên file Excel -->
        <h2>Nhập câu hỏi từ file Excel</h2>
        <form method="POST" enctype="multipart/form-data">
            Chọn file Excel: <input type="file" class="form-control regular-text" name="questions_file" required><br>
            <input type="submit" class="button btn-submit" name="import_questions" value="Nhập">
        </form>

        <!-- Nút xuất câu hỏi ra file Excel -->
        <h2>Xuất câu hỏi ra file Excel</h2>
        <form method="POST">
            <input type="submit" class="button btn-submit" name="export_questions" value="Xuất">
        </form>

        <!-- Danh sách câu hỏi -->
        <h2>Danh sách câu hỏi</h2>
        <table border="1" class="table-list">
            <tr>
                <th class="manage-column">ID</th>
                <th class="manage-column">Nội dung câu hỏi</th>
                <th class="manage-column">Đáp án đúng</th>
                <th class="manage-column">Thao tác</th>
            </tr>
            <?php while ($row = mysqli_fetch_assoc($result)) { ?>
                <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['question_text']; ?></td>
                    <td><?php echo $row['correct_option']; ?></td>
                    <td>
                        <a href="edit_question.php?id=<?php echo $row['id']; ?>">Sửa</a> | 
                        <a href="manage_questions.php?delete_id=<?php echo $row['id']; ?>" onclick="return confirm('Bạn có chắc chắn muốn xóa câu hỏi này?');">Xóa</a>
                    </td>
                </tr>
            <?php } ?>
        </table>
    </div>
<?php include('footer.php');