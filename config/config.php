<?php
// Định nghĩa base URL
if (!defined('BASE_URL')) {
    define('BASE_URL', '/trac-nghiem-demo');
}

if (!defined('SMTP_USERNAME')) {
    define('SMTP_USERNAME', 'cambamao98@gmail.com');
}

if (!defined('SMTP_PASSWORD')) {
    define('SMTP_PASSWORD', 'jfrp rljh hwhb vkyr');
}
// Bật ghi log lỗi vào file
ini_set('log_errors', 1);
ini_set('error_log', BASE_URL . 'php-error.log'); // Chỉ định đường dẫn log lỗi
// Tắt hiển thị lỗi trong trình duyệt
// ini_set('display_errors', 0);
date_default_timezone_set("Asia/Ho_Chi_Minh");
$connect = include 'connect.php';

if (!$connect) {
    die('Không thể bao gồm file connect.php');
}

if (!function_exists('getDatabaseConnection')) {
    /**
     * Kết nối tới cơ sở dữ liệu
     * @return mysqli|null
     */
    function getDatabaseConnection() {
        global $connect;  // Sử dụng biến toàn cục $connect

        $connection = mysqli_connect($connect->host, $connect->user, $connect->password, $connect->dbname);

        if (!$connection) {
            die("Kết nối thất bại: " . mysqli_connect_error());

            
            if ($connect->INSTALL_MODE) {
                header("Refresh:0; url=install.php");
            } 
        }

        return $connection;
    }
}


$conn = getDatabaseConnection();

// if (!function_exists('getDatabaseConnection')) {
//     /**
//      * Kết nối tới cơ sở dữ liệu
//      * @return PDO|null
//      */
//     function getDatabaseConnection() {
//         global $connect;  // Sử dụng biến toàn cục $connect

//         try {
//             // Kết nối với cơ sở dữ liệu bằng PDO
//             $dsn = "mysql:host={$connect->host};dbname={$connect->dbname};charset=utf8";
//             $options = [
//                 PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Bật chế độ báo lỗi
//                 PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Lấy kết quả dưới dạng mảng liên kết
//                 PDO::ATTR_EMULATE_PREPARES => false, // Không giả lập câu lệnh chuẩn bị
//             ];
            
//             $connection = new PDO($dsn, $connect->user, $connect->password, $options);
//             return $connection;
//         } catch (PDOException $e) {
//             die("Kết nối thất bại: " . $e->getMessage());
//         }
//     }
// }


// mysqli_set_charset($conn, 'utf8');

if (!function_exists('executeQuery')) {
    // Hàm chuẩn bị và thực thi các truy vấn SQL (SELECT, INSERT, UPDATE, DELETE)
    function executeQuery($conn, $queryType, $table, $data = [], $conditions = "") {
        // Kiểm tra kiểu truy vấn
        if ($queryType == 'SELECT') {
            // Tạo câu lệnh SELECT
            $query = "SELECT * FROM $table $conditions";
            $stmt = mysqli_prepare($conn, $query);

            // Kiểm tra nếu có lỗi khi chuẩn bị câu lệnh
            if ($stmt === false) {
                die("ERROR: Could not prepare query. " . mysqli_error($conn));
            }

            // Gắn tham số nếu có
            if (!empty($data)) {
                $types = str_repeat("s", count($data)); // Giả sử tất cả tham số là chuỗi (string)
                mysqli_stmt_bind_param($stmt, $types, ...$data);
            }

            // Thi hành câu lệnh
            mysqli_stmt_execute($stmt);

            // Lấy kết quả
            $result = mysqli_stmt_get_result($stmt);

            // Đóng câu lệnh
            mysqli_stmt_close($stmt);

            return mysqli_fetch_all($result, MYSQLI_ASSOC); // Trả về kết quả dưới dạng mảng

        } elseif ($queryType == 'INSERT') {
            // Tạo câu lệnh INSERT
            $columns = implode(", ", array_keys($data));
            $placeholders = implode(", ", array_fill(0, count($data), "?"));
            $query = "INSERT INTO $table ($columns) VALUES ($placeholders)";

            $stmt = mysqli_prepare($conn, $query);

            // Kiểm tra nếu có lỗi khi chuẩn bị câu lệnh
            if ($stmt === false) {
                die("ERROR: Could not prepare query. " . mysqli_error($conn));
            }

            // Gắn giá trị cho các tham số
            $types = str_repeat("s", count($data)); // Giả sử tất cả các tham số là chuỗi (string)
            mysqli_stmt_bind_param($stmt, $types, ...array_values($data));

            // Thi hành câu lệnh
            mysqli_stmt_execute($stmt);

            // Đóng câu lệnh
            mysqli_stmt_close($stmt);

            return mysqli_insert_id($conn); // Trả về ID vừa insert

        } elseif ($queryType == 'UPDATE') {
            // Tạo câu lệnh UPDATE
            $setClause = "";
            foreach ($data as $column => $value) {
                $setClause .= "$column = ?, ";
            }
            $setClause = rtrim($setClause, ", ");
            $query = "UPDATE $table SET $setClause $conditions";

            $stmt = mysqli_prepare($conn, $query);

            // Kiểm tra nếu có lỗi khi chuẩn bị câu lệnh
            if ($stmt === false) {
                die("ERROR: Could not prepare query. " . mysqli_error($conn));
            }

            // Gắn giá trị cho các tham số
            $types = str_repeat("s", count($data)); // Giả sử tất cả các tham số là chuỗi (string)
            mysqli_stmt_bind_param($stmt, $types, ...array_values($data));

            // Thi hành câu lệnh
            mysqli_stmt_execute($stmt);

            // Đóng câu lệnh
            mysqli_stmt_close($stmt);

            return mysqli_affected_rows($conn); // Trả về số hàng bị ảnh hưởng

        } elseif ($queryType == 'DELETE') {
            // Tạo câu lệnh DELETE
            $query = "DELETE FROM $table $conditions";

            $stmt = mysqli_prepare($conn, $query);

            // Kiểm tra nếu có lỗi khi chuẩn bị câu lệnh
            if ($stmt === false) {
                die("ERROR: Could not prepare query. " . mysqli_error($conn));
            }

            // Thi hành câu lệnh
            mysqli_stmt_execute($stmt);

            // Đóng câu lệnh
            mysqli_stmt_close($stmt);

            return mysqli_affected_rows($conn); // Trả về số hàng bị ảnh hưởng
        }

        return false; // Nếu kiểu truy vấn không hợp lệ
    }
}


/**
 * Hàm debug
 */
if (!function_exists('dd')) {
    function dd($a, $b = false, $c = true) {
        $display = $b ? 'style="display:none"' : '';
        echo '<div class="dd-debug" ' . $display . '>';
        if (is_array($a) || is_object($a)) {
            echo '<pre>';
            print_r($a);
            echo '</pre>';
        } else {
            var_dump($a);
        }
        echo '</div>';
        if ($c) {
            die();
        }
    }
}
if (!function_exists('getBrowser')) {
    function getBrowser($userAgent, &$version) {
        $version = 'Unknown';

        if (preg_match('/Chrome\/([0-9.]+)/', $userAgent, $matches)) {
            $version = $matches[1];
            return 'Chrome';
        }
        if (preg_match('/Firefox\/([0-9.]+)/', $userAgent, $matches)) {
            $version = $matches[1];
            return 'Firefox';
        }
        if (preg_match('/Safari\/([0-9.]+)/', $userAgent, $matches) && !preg_match('/Chrome/', $userAgent)) {
            $version = $matches[1];
            return 'Safari';
        }
        if (preg_match('/MSIE ([0-9.]+)/', $userAgent, $matches) || preg_match('/Trident\/.*rv:([0-9.]+)/', $userAgent, $matches)) {
            $version = $matches[1];
            return 'Internet Explorer';
        }
        if (preg_match('/OPR\/([0-9.]+)/', $userAgent, $matches) || preg_match('/Opera\/([0-9.]+)/', $userAgent, $matches)) {
            $version = $matches[1];
            return 'Opera';
        }

        return 'Unknown Browser';
    }
}

if (!function_exists('getOperatingSystem')) {
    function getOperatingSystem($userAgent) {
        if (strpos($userAgent, 'Windows NT 10.0') !== false) return 'Windows 10 / Windows 11';
        if (strpos($userAgent, 'Windows NT 6.3') !== false) return 'Windows 8.1';
        if (strpos($userAgent, 'Windows NT 6.2') !== false) return 'Windows 8';
        if (strpos($userAgent, 'Windows NT 6.1') !== false) return 'Windows 7';
        if (strpos($userAgent, 'Mac OS X') !== false) return 'Mac OS X';
        if (strpos($userAgent, 'Android') !== false) return 'Android';
        if (strpos($userAgent, 'Linux') !== false) return 'Linux';
        if (strpos($userAgent, 'iPhone') !== false || strpos($userAgent, 'iPad') !== false) return 'iOS';
        return 'Unknown OS';
    }
}

if (!function_exists('removeWhitespace')) {
    function removeWhitespace($string) {
        // Xóa khoảng trắng thừa
        return preg_replace('/\s+/', '', trim($string));
    }
}

if (!function_exists('convertToNoSign')) {
    function convertToNoSign($string) {
        $unwanted_array = [
            'á'=>'a', 'à'=>'a', 'ạ'=>'a', 'ả'=>'a', 'ã'=>'a', 'â'=>'a', 'ấ'=>'a', 'ầ'=>'a', 'ậ'=>'a', 'ẩ'=>'a', 'ẫ'=>'a', 'ă'=>'a', 'ắ'=>'a', 'ằ'=>'a', 'ặ'=>'a', 'ẳ'=>'a', 'ẵ'=>'a',
            'é'=>'e', 'è'=>'e', 'ẹ'=>'e', 'ẻ'=>'e', 'ẽ'=>'e', 'ê'=>'e', 'ế'=>'e', 'ề'=>'e', 'ệ'=>'e', 'ể'=>'e', 'ễ'=>'e',
            'í'=>'i', 'ì'=>'i', 'ị'=>'i', 'ỉ'=>'i', 'ĩ'=>'i',
            'ó'=>'o', 'ò'=>'o', 'ọ'=>'o', 'ỏ'=>'o', 'õ'=>'o', 'ô'=>'o', 'ố'=>'o', 'ồ'=>'o', 'ộ'=>'o', 'ổ'=>'o', 'ỗ'=>'o', 'ơ'=>'o', 'ớ'=>'o', 'ờ'=>'o', 'ợ'=>'o', 'ở'=>'o', 'ỡ'=>'o',
            'ú'=>'u', 'ù'=>'u', 'ụ'=>'u', 'ủ'=>'u', 'ũ'=>'u', 'ư'=>'u', 'ứ'=>'u', 'ừ'=>'u', 'ự'=>'u', 'ử'=>'u', 'ữ'=>'u',
            'ý'=>'y', 'ỳ'=>'y', 'ỵ'=>'y', 'ỷ'=>'y', 'ỹ'=>'y',
            'đ'=>'d',
            'Á'=>'A', 'À'=>'A', 'Ạ'=>'A', 'Ả'=>'A', 'Ã'=>'A', 'Â'=>'A', 'Ấ'=>'A', 'Ầ'=>'A', 'Ậ'=>'A', 'Ẩ'=>'A', 'Ẫ'=>'A', 'Ă'=>'A', 'Ắ'=>'A', 'Ằ'=>'A', 'Ặ'=>'A', 'Ẳ'=>'A', 'Ẵ'=>'A',
            'É'=>'E', 'È'=>'E', 'Ẹ'=>'E', 'Ẻ'=>'E', 'Ẽ'=>'E', 'Ê'=>'E', 'Ế'=>'E', 'Ề'=>'E', 'Ệ'=>'E', 'Ể'=>'E', 'Ễ'=>'E',
            'Í'=>'I', 'Ì'=>'I', 'Ị'=>'I', 'Ỉ'=>'I', 'Ĩ'=>'I',
            'Ó'=>'O', 'Ò'=>'O', 'Ọ'=>'O', 'Ỏ'=>'O', 'Õ'=>'O', 'Ô'=>'O', 'Ố'=>'O', 'Ồ'=>'O', 'Ộ'=>'O', 'Ổ'=>'O', 'Ỗ'=>'O', 'Ơ'=>'O', 'Ớ'=>'O', 'Ờ'=>'O', 'Ợ'=>'O', 'Ở'=>'O', 'Ỡ'=>'O',
            'Ú'=>'U', 'Ù'=>'U', 'Ụ'=>'U', 'Ủ'=>'U', 'Ũ'=>'U', 'Ư'=>'U', 'Ứ'=>'U', 'Ừ'=>'U', 'Ự'=>'U', 'Ử'=>'U', 'Ữ'=>'U',
            'Ý'=>'Y', 'Ỳ'=>'Y', 'Ỵ'=>'Y', 'Ỷ'=>'Y', 'Ỹ'=>'Y',
            'Đ'=>'D'
        ];
        return strtr($string, $unwanted_array);
    }
}

if (!function_exists('removeWhitespaceAndConvertToNoSign')) {
    function removeWhitespaceAndConvertToNoSign($string) {
        $string = removeWhitespace($string);  // Xóa khoảng trắng
        return convertToNoSign($string);      // Chuyển thành không dấu
    }
}

if (!function_exists('toSlug')) {
    function toSlug($str) {
        // Mảng chuyển đổi ký tự có dấu thành không dấu
        $unwanted_array = array(
            'á'=>'a','à'=>'a','ả'=>'a','ã'=>'a','ạ'=>'a',
            'ă'=>'a','ắ'=>'a','ằ'=>'a','ẳ'=>'a','ẵ'=>'a','ặ'=>'a',
            'â'=>'a','ấ'=>'a','ầ'=>'a','ẩ'=>'a','ẫ'=>'a','ậ'=>'a',
            'é'=>'e','è'=>'e','ẻ'=>'e','ẽ'=>'e','ẹ'=>'e',
            'ê'=>'e','ế'=>'e','ề'=>'e','ể'=>'e','ễ'=>'e','ệ'=>'e',
            'í'=>'i','ì'=>'i','ỉ'=>'i','ĩ'=>'i','ị'=>'i',
            'ó'=>'o','ò'=>'o','ỏ'=>'o','õ'=>'o','ọ'=>'o',
            'ô'=>'o','ố'=>'o','ồ'=>'o','ổ'=>'o','ỗ'=>'o','ộ'=>'o',
            'ơ'=>'o','ớ'=>'o','ờ'=>'o','ở'=>'o','ỡ'=>'o','ợ'=>'o',
            'ú'=>'u','ù'=>'u','ủ'=>'u','ũ'=>'u','ụ'=>'u',
            'ư'=>'u','ứ'=>'u','ừ'=>'u','ử'=>'u','ữ'=>'u','ự'=>'u',
            'ý'=>'y','ỳ'=>'y','ỷ'=>'y','ỹ'=>'y','ỵ'=>'y',
            'đ'=>'d',
            'Á'=>'A','À'=>'A','Ả'=>'A','Ã'=>'A','Ạ'=>'A',
            'Ă'=>'A','Ắ'=>'A','Ằ'=>'A','Ẳ'=>'A','Ẵ'=>'A','Ặ'=>'A',
            'Â'=>'A','Ấ'=>'A','Ầ'=>'A','Ẩ'=>'A','Ẫ'=>'A','Ậ'=>'A',
            'É'=>'E','È'=>'E','Ẻ'=>'E','Ẽ'=>'E','Ẹ'=>'E',
            'Ê'=>'E','Ế'=>'E','Ề'=>'E','Ể'=>'E','Ễ'=>'E','Ệ'=>'E',
            'Í'=>'I','Ì'=>'I','Ỉ'=>'I','Ĩ'=>'I','Ị'=>'I',
            'Ó'=>'O','Ò'=>'O','Ỏ'=>'O','Õ'=>'O','Ọ'=>'O',
            'Ô'=>'O','Ố'=>'O','Ồ'=>'O','Ổ'=>'O','Ỗ'=>'O','Ộ'=>'O',
            'Ơ'=>'O','Ớ'=>'O','Ờ'=>'O','Ở'=>'O','Ỡ'=>'O','Ợ'=>'O',
            'Ú'=>'U','Ù'=>'U','Ủ'=>'U','Ũ'=>'U','Ụ'=>'U',
            'Ư'=>'U','Ứ'=>'U','Ừ'=>'U','Ử'=>'U','Ữ'=>'U','Ự'=>'U',
            'Ý'=>'Y','Ỳ'=>'Y','Ỷ'=>'Y','Ỹ'=>'Y','Ỵ'=>'Y',
            'Đ'=>'D'
        );

        // Loại bỏ dấu tiếng Việt
        $str = strtr($str, $unwanted_array);

        // Chuyển thành chữ thường và thay khoảng trắng bằng dấu gạch ngang
        $slug = strtolower(str_replace(' ', '-', $str));

        // Loại bỏ các ký tự đặc biệt không mong muốn
        $slug = preg_replace('/[^a-z0-9\-]/', '', $slug);

        // Loại bỏ các dấu gạch ngang liên tiếp (nếu có)
        $slug = preg_replace('/-+/', '-', $slug);

        // Trả về slug cuối cùng
        return trim($slug, '-');
    }
}

if (!function_exists('register_post_type')) {
    function register_post_type($conn, $post_type_name) {

        $slug = toSlug($post_type_name);

        // Kiểm tra xem slug đã tồn tại chưa
        $check_sql = "SELECT COUNT(*) AS count FROM categories WHERE slug = '$slug'";
        $result = $conn->query($check_sql);
        $row = $result->fetch_assoc();

        if ($row['count'] > 0) {
            // Slug đã tồn tại
            echo "Custom Post Type với slug '$slug' đã tồn tại.";
        } else {
            // Thêm vào bảng categories
            $sql = "INSERT INTO categories (category_name, slug) VALUES ('$post_type_name', '$slug')";
            
            if ($conn->query($sql) === TRUE) {
                echo "Custom Post Type '$post_type_name' đã được tạo!";
            } else {
                echo "Lỗi: " . $conn->error;
            }
        }

        $conn->close();
    }
}
// Sử dụng để đăng ký CPT mới
// register_post_type($conn, 'Sản phẩm');

if (!function_exists('register_taxonomy')) {
    function register_taxonomy($conn, $taxonomy_name) {

        // Tạo slug cho taxonomy
        $slug = toSlug($taxonomy_name);

        // Thêm vào bảng taxonomies
        $sql = "INSERT INTO taxonomies (taxonomy_name, slug) VALUES ('$taxonomy_name', '$slug')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Taxonomy '$taxonomy_name' đã được tạo!";
        } else {
            echo "Lỗi: " . $conn->error;
        }

        $conn->close();
    }
}

// Sử dụng để đăng ký taxonomy mới
// register_taxonomy($conn, 'Danh mục sản phẩm');
if (!function_exists('add_custom_post')) {
    function add_custom_post($title, $content, $post_type_id) {
        
        // Thêm bài viết mới vào bảng posts
        $sql = "INSERT INTO posts (title, content, category_id) VALUES ('$title', '$content', $post_type_id)";
        
        if ($conn->query($sql) === TRUE) {
            echo "Bài viết '$title' đã được thêm!";
        } else {
            echo "Lỗi: " . $conn->error;
        }

        $conn->close();
    }
}

// Sử dụng để thêm bài viết mới vào CPT 'Sản phẩm'
// add_custom_post('Sản phẩm A', 'Mô tả sản phẩm A', 1);

if (!function_exists('add_post_term_relationship')) {
    function add_post_term_relationship($conn, $post_id, $term_id) {
       
        // Thêm liên kết giữa bài viết và term
        $sql = "INSERT INTO term_relationships (post_id, term_id) VALUES ($post_id, $term_id)";
        
        if ($conn->query($sql) === TRUE) {
            echo "Bài viết đã được liên kết với term!";
        } else {
            echo "Lỗi: " . $conn->error;
        }

        $conn->close();
    }
}

// Sử dụng để liên kết bài viết ID 1 với term ID 2
// add_post_term_relationship($conn, 1, 2);

if (!function_exists('get_custom_posts')) {
    function get_custom_posts($post_type_slug, $taxonomy_slug = null) {
        // Kết nối CSDL
        $conn = new mysqli('localhost', 'username', 'password', 'blog');

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Lấy post_type_id theo slug
        $sql = "SELECT id FROM custom_post_types WHERE slug = '$post_type_slug'";
        $result = $conn->query($sql);
        $post_type_id = $result->fetch_assoc()['id'];

        // Lấy bài viết theo post_type_id
        $sql = "SELECT * FROM custom_posts WHERE post_type_id = $post_type_id";

        // Nếu có taxonomy, lấy post liên kết với taxonomy
        if ($taxonomy_slug) {
            $sql .= " AND id IN (
                SELECT post_id FROM term_relationships 
                JOIN terms ON term_relationships.term_id = terms.id 
                WHERE terms.slug = '$taxonomy_slug'
            )";
        }

        $posts = $conn->query($sql);

        if ($posts->num_rows > 0) {
            while($post = $posts->fetch_assoc()) {
                echo "<h2>" . $post['title'] . "</h2>";
                echo "<p>" . $post['content'] . "</p>";
                echo "<hr>";
            }
        } else {
            echo "Không có bài viết nào!";
        }

        $conn->close();
    }
}

// Hiển thị bài viết thuộc CPT 'san-pham' và taxonomy 'danh-muc-san-pham'
// get_custom_posts('san-pham', 'danh-muc-san-pham');

?>
