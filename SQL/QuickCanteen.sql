CREATE DATABASE APP;
USE APP;

CREATE TYPE public.OrderStatus AS ENUM ('placed', 'paid', 'inProgress', 'outForDelivery', 'delivered');

CREATE TYPE public.Cluster AS ENUM ('Saintek', 'Soshum');

CREATE TYPE public.cuisines AS ENUM ('Indonesian', 'BBQ', 'Breakfast', 'Burgers', 'Cafe', 'Batagor', 'Desserts', 'Siomay', 'Bakmi', 'Healthy', 'Curry', 'Chicken Katsu', 'Ice Cream', 'Soto', 'Noodles', 'Organic', 'Pasta', 'Pizza', 'Salads', 'Seafood', 'Beef', 'Sushi', 'Beverages', 'Drinks', 'Kebab');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    npm VARCHAR(50) UNIQUE NOT NULL,
    faculty VARCHAR(100),
    cluster public.Cluster
);

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);


CREATE TABLE canteens (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    canteen_name VARCHAR(255) NOT NULL,
    faculty VARCHAR(100),
    cluster public.cuisines,
    delivery_price NUMERIC(10, 2),
    estimated_delivery_time INT,
    cuisines public.cuisines[],
    image_url TEXT,
    last_updated TIMESTAMP
);


CREATE TABLE menu_List(
menuId varchar(50) PRIMARY KEY,
canteenId varchar(50) FOREIGN KEY,
Password varchar(30) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    canteen_id INT REFERENCES canteens(id),
    user_id INT REFERENCES users(id),
    total_amount NUMERIC(10, 2),
    status VARCHAR(20) public.OrderStatus NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    order_id INT REFERENCES orders(id),
    menu_item_id INT REFERENCES menu_items(id),
    name VARCHAR(255),
    quantity INT,
    PRIMARY KEY (order_id, menu_item_id)
);

CREATE TABLE delivery_details (
    order_id INT REFERENCES orders(id) PRIMARY KEY,
    name VARCHAR(255),
    npm VARCHAR(50),
    faculty VARCHAR(100),
    email VARCHAR(255)
);

INSERT INTO users (email, name, npm, faculty, cluster)
VALUES ('shareefmasyhur@gmail.com', 'sharif', '2206063014', 'Engineering', 'Science');

INSERT INTO users (email, name, npm, faculty, cluster)
VALUES ('myzbackup1@gmail.com', 'sharif', '2206063014', 'Engineering', 'Science');

INSERT INTO menu_items (name, price)
VALUES ('test', 10000);

INSERT INTO canteens (user_id, canteen_name, faculty, cluster, delivery_price, estimated_delivery_time, cuisines, image_url, last_updated)
VALUES (1, 'Test', 'Engineering', 'Science', 5000.00, 21, ARRAY['Indonesian', 'Western'], 'http://res.cloudinary.com/dxkg4akpi/image/upload/v1717866068/qamoxomsq…', CURRENT_TIMESTAMP);

-- Menghapus menu item dari kantin
DELETE FROM canteen_menu_items
WHERE canteen_id = 2 AND menu_item_id = 3;

DROP TABLE IF EXISTS orders CASCADE;

-- Menampilkan semua pengguna
SELECT * FROM users;

-- Menampilkan semua item menu untuk kantin tertentu
SELECT mi.*
FROM menu_items mi
JOIN canteen_menu_items cmi ON mi.id = cmi.menu_item_id
WHERE cmi.canteen_id = 2;

-- Menampilkan semua pesanan dengan status 'placed'
SELECT * FROM orders
WHERE status = 'placed';

-- Menampilkan detail pesanan bersama dengan informasi kantin dan pengguna
SELECT o.id AS order_id, u.name AS user_name, c.canteen_name, o.total_amount, o.status, o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN canteens c ON o.canteen_id = c.id;

-- Menampilkan semua menu item yang tersedia di setiap kantin
SELECT c.canteen_name, mi.name AS menu_item_name, mi.price
FROM canteens c
JOIN canteen_menu_items cmi ON c.id = cmi.canteen_id
JOIN menu_items mi ON cmi.menu_item_id = mi.id;

-- Menambahkan data kantin baru
INSERT INTO public.canteens (id, canteen_name, city, country, delivery_price, estimated_delivery_time, cuisines, image_url, user_id, last_updated, cluster, faculty)
VALUES ('66648f0f28372cb526e32438', 'test2', 'test3', 'testtest', 500000.00, 15, ARRAY['American'], 'http://res.cloudinary.com/dxkg4akpi/image/upload/v1717866068/qamoxomsq2rth7nanj4v.jpg', '66632b8ea9273598946d60ae', to_timestamp(1717868999.462), 'Science', 'Engineering');


