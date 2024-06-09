CREATE DATABASE APP;
USE APP;

CREATE TYPE public.status AS ENUM ('Waiting', 'Preparing', 'Ready');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    npm VARCHAR(50) UNIQUE NOT NULL,
    faculty VARCHAR(100),
    cluster VARCHAR(100)
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
    cluster VARCHAR(100),
    delivery_price NUMERIC(10, 2),
    estimated_delivery_time INT,
    cuisines TEXT[],
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
    status VARCHAR(20) CHECK (status IN ('placed', 'paid', 'inProgress', 'outForDelivery', 'delivered')),
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
VALUES (1, 'Test', 'Engineering', 'Science', 5000.00, 21, ARRAY['Indonesian', 'Western'], 'http://example.com/image.jpg', CURRENT_TIMESTAMP);

