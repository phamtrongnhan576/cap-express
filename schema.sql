CREATE DATABASE IF NOT EXISTS CapPinterest;
USE CapPinterest;


CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    age INT,
    avatar_url VARCHAR(500),
    deleted_by INT NOT NULL DEFAULT 0,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    description TEXT,
    user_id INT NOT NULL,
    deleted_by INT NOT NULL DEFAULT 0,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    image_id INT NOT NULL,
    content TEXT NOT NULL,
    deleted_by INT NOT NULL DEFAULT 0,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
);


CREATE TABLE saved_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    image_id INT NOT NULL,
    deleted_by INT NOT NULL DEFAULT 0,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_image (user_id, image_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
);


    CREATE INDEX idx_users_email ON users(email);
    CREATE INDEX idx_users_deleted ON users(is_deleted);
    CREATE INDEX idx_images_deleted ON images(is_deleted);
    CREATE INDEX idx_comments_deleted ON comments(is_deleted);
    CREATE INDEX idx_saved_images_deleted ON saved_images(is_deleted);

    CREATE INDEX idx_images_user ON images(user_id, is_deleted);
    CREATE INDEX idx_comments_image ON comments(image_id, is_deleted);
    CREATE INDEX idx_comments_user ON comments(user_id, is_deleted);
    CREATE INDEX idx_images_title ON images(title, is_deleted);
    CREATE INDEX idx_images_created ON images(created_at);
    CREATE INDEX idx_comments_created ON comments(created_at);



INSERT INTO users (email, password, full_name, age, avatar_url) VALUES
('user1@example.com', '$2b$10$hashedpassword1', 'Nguyễn Văn A', 25, '/images/avatar1.jpg'),
('user2@example.com', '$2b$10$hashedpassword2', 'Trần Thị B', 30, '/images/avatar2.jpg'),
('user3@example.com', '$2b$10$hashedpassword3', 'Lê Văn C', 28, '/images/avatar3.jpg'),
('admin@example.com', '$2b$10$hashedpasswordadmin', 'Admin User', 35, '/images/admin_avatar.jpg');

INSERT INTO images (title, url, description, user_id) VALUES
('Sunset Beach', '/uploads/sunset_beach.jpg', 'Beautiful sunset at the beach', 1),
('Mountain View', '/uploads/mountain_view.jpg', 'Amazing mountain landscape', 1),
('City Lights', '/uploads/city_lights.jpg', 'Night view of the city', 2),
('Forest Path', '/uploads/forest_path.jpg', 'Peaceful walk in the forest', 3),
('Ocean Waves', '/uploads/ocean_waves.jpg', 'Powerful ocean waves crashing', 2),
('Cherry Blossoms', '/uploads/cherry_blossoms.jpg', 'Spring cherry blossoms in bloom', 3);

INSERT INTO comments (user_id, image_id, content) VALUES
(2, 1, 'Ảnh rất đẹp! Tôi thích ánh sáng hoàng hôn này.'),
(3, 1, 'Cảnh tượng tuyệt vời, cảm ơn bạn đã chia sẻ!'),
(1, 3, 'Đêm thành phố thật lung linh và ấn tượng.'),
(2, 4, 'Con đường rừng này nhìn rất yên bình và thư giãn.'),
(1, 5, 'Sóng biển mạnh mẽ, chụp được khoảnh khắc rất đẹp!'),
(3, 2, 'Núi non hùng vĩ, góc chụp tuyệt vời!');

INSERT INTO saved_images (user_id, image_id) VALUES
(1, 3), (1, 4), (2, 1), (2, 2), (3, 1), (3, 5);

