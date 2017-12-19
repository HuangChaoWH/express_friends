CREATE SCHEMA IF NOT EXISTS sp_db DEFAULT CHARACTER SET UTF8;
USE sp_db;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_relationship;

CREATE TABLE user (
	user_id INT NOT NULL AUTO_INCREMENT,
	email_address VARCHAR(100) NOT NULL UNIQUE,
	PRIMARY KEY (user_id)
);

CREATE TABLE user_relationship (
	user_id INT NOT NULL,
	friend_id INT NOT NULL,
	type INT NOT NULL,
	block INT NOT NULL,
	PRIMARY KEY (user_id, friend_id)
);

