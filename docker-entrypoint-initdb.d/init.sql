-- Cria o banco de dados 'users'
CREATE DATABASE users;

-- Conecta ao banco de dados 'users'
\c users;

-- Cria a tabela 'users'
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insere alguns registros na tabela 'users'
INSERT INTO users (name, email, password) VALUES 
('Alexandre Tonin', 'alexandre@example.com', '123'),
('Andrei Albrecht', 'andrei@example.com', '456'),
('Gabriela Zanetti', 'gabriela@example.com', '789');
