DROP DATABASE IF EXISTS react_chess_test;
CREATE DATABASE react_chess_test;

\c react_chess_test;


-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT
);

-- GAMES TABLE
-- TODO create games table


