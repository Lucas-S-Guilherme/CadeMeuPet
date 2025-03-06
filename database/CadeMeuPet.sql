CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Animais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('cachorro', 'gato', 'papagaio', 'outro') NOT NULL,
    foto VARCHAR(255),
    descricao TEXT,
    status ENUM('perdido', 'encontrado', 'adotado') NOT NULL,
    ultima_localizacao VARCHAR(255),
    usuario_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

CREATE TABLE Avistamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT,
    localizacao VARCHAR(255) NOT NULL,
    observacoes TEXT,
    usuario_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES Animais(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);