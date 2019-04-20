CREATE DATABASE great_bay_db;
USE great_bay_db;

CREATE TABLE listings (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    init_price DECIMAL(10,2) NOT NULL,
    current_price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id)
);