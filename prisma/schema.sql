-- Database initialization script for MANI TENT HOUSE

CREATE DATABASE IF NOT EXISTS mani_tent_house CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mani_tent_house;

CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  mobile VARCHAR(32) NOT NULL,
  email VARCHAR(191) NULL,
  event_date DATE NULL,
  event_location VARCHAR(255) NOT NULL,
  services JSON NOT NULL,
  guest_count VARCHAR(64) NULL,
  message TEXT NULL,
  consent TINYINT(1) NOT NULL DEFAULT 1,
  language VARCHAR(10) NOT NULL DEFAULT 'en',
  status VARCHAR(32) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_created (created_at),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(32) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
