CREATE DATABASE APP;
USE APP;

CREATE TYPE public.status AS ENUM ('Waiting', 'Preparing', 'Ready');

CREATE TABLE User(
userEmail varchar(50) PRIMARY KEY,
Name varchar(50) NOT NULL,
Password varchar(30) NOT NULL
);

CREATE TABLE Seller(
sellerEmail varchar(50) PRIMARY KEY,
canteenId integer FOREIGN KEY,
Password varchar(30) NOT NULL
);

CREATE TABLE Canteen(
canteenId varchar(50) PRIMARY KEY,
canteenName varchar(30) NOT NULL,
canteenDescription text NOT NULL
);

CREATE TABLE menu_List(
menuId varchar(50) PRIMARY KEY,
canteenId varchar(50) FOREIGN KEY,
Password varchar(30) NOT NULL
);

CREATE TABLE Order(
orderId integer PRIMARY KEY,
userEmail varchar(50) FOREIGN KEY,
menuId integer FOREIGN KEY,
pickUp_time date NOT NULL,
orderStatus public.status NOT NULL
);