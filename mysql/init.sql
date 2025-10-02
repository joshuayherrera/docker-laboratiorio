USE crmsenatidb;

-- accounts or business
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL UNIQUE,
    industry VARCHAR(100),
    phone VARCHAR(20),
    website VARCHAR(255),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- people who is associated to a client
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    contact_name VARCHAR(255) NOT NULL,
    contact_lastname VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    position VARCHAR(100),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY  (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- oportunities 
CREATE TABLE IF NOT EXISTS oportunities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    oportunity_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2),
    stage ENUM('Calificación', 'Propuesta', 'Negociación', 'Cerrada Ganada', 'Cerrada Perdida') NOT NULL,
    close_date DATE,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

INSERT INTO clients (business_name, industry, phone, website) VALUES
('Tech Solutions Inc.', 'Tecnología', '555-0101', 'http://techsolutions.com'),
('Global Logistics', 'Transporte', '555-0202', 'http://globallogistics.com');

INSERT INTO contacts (client_id, contact_name, contact_lastname, email, position) VALUES
(1, 'Ana', 'García', 'ana.garcia@techsolutions.com', 'Gerente de Proyectos'),
(2, 'Juan', 'Pérez', 'juan.perez@globallogistics.com', 'Director de Operaciones');

INSERT INTO oportunities (client_id, oportunity_name, amount, stage, close_date) VALUES
(1, 'Renovación de Licencias de Software', 5000.00, 'Propuesta', '2025-11-30'),
(2, 'Contrato de Logística Internacional', 25000.00, 'Negociación', '2025-12-15');
