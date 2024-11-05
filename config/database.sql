CREATE DATABASE trac_nghiem;
USE trac_nghiem;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    google_id VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') NOT NULL
    display_name VARCHAR(250) NOT NULL,
    last_login timestamp NULL DEFAULT NULL
);

INSERT INTO users (id, username, password, email, google_id, avatar, role, display_name, last_login) VALUES
(1, 'maocam', 'Magano123', 'cambamao98@gmail.com', '', '', 'admin', 'Cầm Bá Mão', '2024-11-05 08:42:48'),
(2, 'phuongbui', 'phuong@101220', 'phuongbui@gmail.com', '', '', 'student','Bùi Thị Phương','');

CREATE TABLE visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    views INT DEFAULT 1,
    browser VARCHAR(255),
    operating_system VARCHAR(255),
    version VARCHAR(50),
    ip_address VARCHAR(50),
    last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option ENUM('A', 'B', 'C', 'D', 'Chưa chọn') NOT NULL
);

CREATE TABLE exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_name VARCHAR(255) NOT NULL,
    exam_time int(11) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_id INT NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    score INT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (exam_id) REFERENCES exams(id)
);

CREATE TABLE user_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    result_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option ENUM('A', 'B', 'C', 'D') NOT NULL,
    FOREIGN KEY (result_id) REFERENCES results(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Bảng lưu thông tin Post type
CREATE TABLE custom_post_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_type_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO custom_post_types (post_type_name, slug) VALUES
('Blog', 'blog'),
('Portfolio', 'portfolio'),
('Testimonial', 'testimonial');

-- Bảng lưu thông tin Post
CREATE TABLE custom_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    post_type_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_type_id) REFERENCES custom_post_types(id)
);

INSERT INTO custom_posts (title, content, post_type_id) VALUES
('Bài viết đầu tiên', 'Nội dung bài viết đầu tiên.', 1), -- post_type_id = 1 tương ứng với 'Blog'
('Bài viết thứ hai', 'Nội dung bài viết thứ hai.', 1),
('Dự án đầu tiên', 'Nội dung dự án đầu tiên.', 2), -- post_type_id = 2 tương ứng với 'Portfolio'
('Lời chứng thực từ khách hàng', 'Khách hàng nói rằng sản phẩm rất tuyệt.', 3); -- post_type_id = 3 tương ứng với 'Testimonial'


-- Bảng lưu thông tin taxonomy (phân loại)
CREATE TABLE taxonomies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    taxonomy_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO taxonomies (taxonomy_name, slug) VALUES
('Danh mục', 'category'),
('Thẻ', 'tag');


-- Bảng lưu các terms (category, tag, v.v.)
CREATE TABLE terms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    term_name VARCHAR(255) NOT NULL,
    taxonomy_id INT NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (taxonomy_id) REFERENCES taxonomies(id)
);

INSERT INTO terms (term_name, taxonomy_id, slug) VALUES
('Tin tức', 1, 'tin-tuc'), -- taxonomy_id = 1 tương ứng với 'Danh mục'
('Cập nhật', 1, 'cap-nhat'),
('Thú vị', 2, 'thu-vi'), -- taxonomy_id = 2 tương ứng với 'Thẻ'
('Hữu ích', 2, 'huu-ich');


-- Bảng liên kết bài viết với các terms (term_relationships)
CREATE TABLE term_relationships (
    post_id INT NOT NULL,
    term_id INT NOT NULL,
    PRIMARY KEY (post_id, term_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (term_id) REFERENCES terms(id)
);

INSERT INTO term_relationships (post_id, term_id) VALUES
(1, 1), -- Bài viết đầu tiên thuộc 'Tin tức'
(1, 2), -- Bài viết đầu tiên thuộc 'Cập nhật'
(2, 1), -- Bài viết thứ hai thuộc 'Tin tức'
(3, 1), -- Dự án đầu tiên thuộc 'Tin tức'
(4, 2), -- Lời chứng thực từ khách hàng thuộc 'Thẻ thú vị'
(4, 1); -- Lời chứng thực từ khách hàng thuộc 'Thẻ hữu ích'

