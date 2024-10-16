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
);

INSERT INTO users (id, username, password, email, google_id, avatar, role) VALUES
(1, 'maocam', 'Magano123', 'cambamao98@gmail.com', '', '', 'admin'),
(2, 'phuongbui', 'phuong@101220', 'phuongbui@gmail.com', '', '', 'student');


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

CREATE TABLE custom_post_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_type_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE custom_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    post_type_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_type_id) REFERENCES custom_post_types(id)
);

-- Bảng lưu thông tin taxonomy (phân loại)
CREATE TABLE taxonomies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    taxonomy_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);

-- Bảng lưu các terms (category, tag, v.v.)
CREATE TABLE terms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    term_name VARCHAR(255) NOT NULL,
    taxonomy_id INT NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (taxonomy_id) REFERENCES taxonomies(id)
);

-- Bảng liên kết bài viết với các terms (term_relationships)
CREATE TABLE term_relationships (
    post_id INT NOT NULL,
    term_id INT NOT NULL,
    PRIMARY KEY (post_id, term_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (term_id) REFERENCES terms(id)
);
