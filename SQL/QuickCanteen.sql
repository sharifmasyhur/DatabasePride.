CREATE DATABASE APP;
USE APP;

CREATE TYPE public.OrderStatus AS ENUM ('placed', 'paid', 'inProgress', 'outForDelivery', 'delivered');

CREATE TYPE public.Cluster AS ENUM ('Saintek', 'Soshum');

CREATE TYPE public.cuisines AS ENUM ('Indonesian', 'BBQ', 'Breakfast', 'Burgers', 'Cafe', 'Batagor', 'Desserts', 'Siomay', 'Bakmi', 'Healthy', 'Curry', 'Chicken Katsu', 'Ice Cream', 'Soto', 'Noodles', 'Organic', 'Pasta', 'Pizza', 'Salads', 'Seafood', 'Beef', 'Sushi', 'Beverages', 'Drinks', 'Kebab');
--membuat tabel user
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    npm VARCHAR(50) UNIQUE NOT NULL,
    faculty VARCHAR(100),
    cluster public.Cluster
);
--membuat tabel item kelengkapan menu
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

--membuat tabel daftar kantin
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

--membuat tabel keterangan tiap order
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    canteen_id INT REFERENCES canteens(id),
    user_id INT REFERENCES users(id),
    total_amount NUMERIC(10, 2),
    status VARCHAR(20) public.OrderStatus NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--membuat tabel keterangan delivery
CREATE TABLE delivery_details (
    order_id INT REFERENCES orders(id) PRIMARY KEY,
    name VARCHAR(255),
    npm VARCHAR(50),
    faculty VARCHAR(100),
    email VARCHAR(255)
);
--data dummy
INSERT INTO users (email, name, npm, faculty, cluster)
VALUES ('shareefmasyhur@gmail.com', 'sharif', '2206063014', 'Engineering', 'Science');

INSERT INTO users (email, name, npm, faculty, cluster)
VALUES ('myzbackup1@gmail.com', 'sharif', '2206063014', 'Engineering', 'Science');

INSERT INTO menu_items (name, price)
VALUES ('test', 10000);

INSERT INTO canteens (user_id, canteen_name, faculty, cluster, delivery_price, estimated_delivery_time, cuisines, image_url, last_updated)
VALUES (1, 'Test', 'Engineering', 'Science', 5000.00, 21, ARRAY['Indonesian', 'Western'], 'http://res.cloudinary.com/dxkg4akpi/image/upload/v1717866068/qamoxomsq…', CURRENT_TIMESTAMP);

-- Menambahkan data kantin baru
INSERT INTO public.canteens (id, canteen_name, city, country, delivery_price, estimated_delivery_time, cuisines, image_url, user_id, last_updated, cluster, faculty)
VALUES ('66648f0f28372cb526e32438', 'test2', 'test3', 'testtest', 500000.00, 15, ARRAY['American'], 'http://res.cloudinary.com/dxkg4akpi/image/upload/v1717866068/qamoxomsq2rth7nanj4v.jpg', '66632b8ea9273598946d60ae', to_timestamp(1717868999.462), 'Science', 'Engineering');


