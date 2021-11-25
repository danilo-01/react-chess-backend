DROP DATABASE IF EXISTS react_chess_test;
CREATE DATABASE react_chess_test;

\c react_chess_test;


-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT,
    is_admin BOOLEAN NOT NULL
);

-- GAMES TABLE
-- TODO create games table


