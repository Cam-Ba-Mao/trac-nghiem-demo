<?php
// config.php

$host = 'localhost'; // Địa chỉ máy chủ MySQL
$db = 'trac_nghiem'; // Tên cơ sở dữ liệu
$user = 'root'; // Tên người dùng MySQL
$pass = ''; // Mật khẩu MySQL

// Kết nối tới cơ sở dữ liệu MySQL
$conn = mysqli_connect($host, $user, $pass, $db);

// Kiểm tra kết nối
if (!$conn) {
    // Kết nối không thành công, in ra lỗi và dừng thực hiện
    die("Kết nối thất bại: " . mysqli_connect_error());
}

// Thiết lập charset utf8 để hỗ trợ tiếng Việt
mysqli_set_charset($conn, 'utf8');

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
