CREATE DATABASE cademeupet;
#DROP DATABASE cademeupet;
use cademeupet;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, -- Senha criptografada
    telefone VARCHAR(15) NOT NULL, -- Telefone é obrigatório
    token_recuperacao VARCHAR(255), -- Para a funcionalidade "Esqueci minha senha"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Usuarios (nome, email, senha, telefone, token_recuperacao, created_at)
VALUES
('João Silva', 'joao.silva@example.com', 'senha123', '11987654321', NULL, NOW()),
('Maria Oliveira', 'maria.oliveira@example.com', 'senha456', '11912345678', NULL, NOW()),
('Carlos Souza', 'carlos.souza@example.com', 'senha789', '11955554444', NULL, NOW());

CREATE TABLE Animais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('cachorro', 'gato', 'papagaio', 'outro') NOT NULL,
    foto LONGBLOB, -- Foto armazenada diretamente no banco (em formato binário)
    descricao TEXT NOT NULL, -- Descrição é obrigatória
    status ENUM('perdido', 'encontrado', 'adotado', 'em_processo_adocao') NOT NULL,
    ultima_localizacao VARCHAR(255) NOT NULL, -- Última localização é obrigatória
    nome_dono VARCHAR(100) NOT NULL, -- Nome do dono é obrigatório
    contato_dono VARCHAR(255) NOT NULL, -- Contato do dono é obrigatório
    usuario_id INT NOT NULL, -- Usuário que cadastrou o animal é obrigatório
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

INSERT INTO Animais (nome, tipo, foto, descricao, status, ultima_localizacao, nome_dono, contato_dono, usuario_id, created_at)
VALUES
('Rex', 'cachorro', LOAD_FILE('/caminho/para/foto_rex.jpg'), 'Cachorro da raça Labrador, cor preta.', 'perdido', 'Rua das Flores, 123', 'Ana Costa', '11999998888', 1, NOW()),
('Mimi', 'gato', LOAD_FILE('/caminho/para/foto_mimi.jpg'), 'Gato siamês, muito dócil.', 'encontrado', 'Avenida Paulista, 1000', 'Joaozinho', '69990707070', 2, NOW()),
('Loro', 'papagaio', LOAD_FILE('/caminho/para/foto_loro.jpg'), 'Papagaio verde, fala algumas palavras.', 'em_processo_adocao', 'Praça da Sé, 50', 'Pedro Alves', '11988887777', 3, NOW());

CREATE TABLE Avistamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT NOT NULL, -- Animal avistado é obrigatório
    foto LONGBLOB, -- Foto do avistamento armazenada diretamente no banco (em formato binário)
    localizacao VARCHAR(255) NOT NULL, -- Localização é obrigatória
    observacoes TEXT, -- Observações são opcionais
    data_avistamento DATETIME NOT NULL, -- Data e hora do avistamento são obrigatórias
    usuario_id INT NOT NULL, -- Usuário que registrou o avistamento é obrigatório
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES Animais(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

INSERT INTO Avistamentos (animal_id, foto, localizacao, observacoes, data_avistamento, usuario_id, created_at)
VALUES
(1, LOAD_FILE('/caminho/para/foto_avistamento_rex.jpg'), 'Parque Ibirapuera', 'Vi o Rex próximo ao lago.', NOW(), 2, NOW()),
(2, LOAD_FILE('/caminho/para/foto_avistamento_mimi.jpg'), 'Rua Augusta', 'Mimi estava em cima de um muro.', NOW(), 3, NOW()),
(3, LOAD_FILE('/caminho/para/foto_avistamento_loro.jpg'), 'Praça da República', 'Loro estava voando baixo.', NOW(), 1, NOW());