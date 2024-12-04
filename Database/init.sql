-- Create database
CREATE DATABASE IF NOT EXISTS speedometer_db;
USE speedometer_db;

-- Create speed_data table
CREATE TABLE IF NOT EXISTS speed_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    speed INT NOT NULL,
    timestamp DATETIME NOT NULL
);