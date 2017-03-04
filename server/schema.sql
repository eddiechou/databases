DROP DATABASE IF EXISTS `chat`;

CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(10) NULL DEFAULT NULL UNIQUE,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Rooms'
-- 
-- ---

DROP TABLE IF EXISTS `Rooms`;
    
CREATE TABLE `Rooms` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `roomname` VARCHAR(20) NULL DEFAULT NULL UNIQUE,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Messages'
-- 
-- ---

DROP TABLE IF EXISTS `Messages`;
    
CREATE TABLE `Messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `room_id` INTEGER NULL DEFAULT NULL,
  `text` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (room_id) REFERENCES `Rooms` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`user`) VALUES
-- ('','');
-- INSERT INTO `Rooms` (`id`,`roomname`) VALUES
-- ('','');
-- INSERT INTO `Messages` (`id`,`user`,`roomname`,`text`) VALUES
-- ('','','','');