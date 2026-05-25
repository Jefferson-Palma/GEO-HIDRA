-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE geoHidra;
create user 'sensor'@'%' identified by 'SPTECh#2024';
USE geoHidra;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(45),
cnpj CHAR(14),
dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE obra(
idObra INT PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(45),
cep CHAR(8),
numero VARCHAR(8),
estado VARCHAR(20),
cidade VARCHAR(20),
fkEmpresa INT,
CONSTRAINT chFkEmp 
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE funcionario(
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
nomeFuncionario VARCHAR(45),
cpf CHAR(11),
senha VARCHAR(45),
tipoDeAcesso VARCHAR (45),
CONSTRAINT conTipoAcesso 
CHECK(tipoDeAcesso IN('adm', 'comum')),
email VARCHAR(45),
fkEmpresa INT,
CONSTRAINT chFkEmp1
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
modelo VARCHAR(45),
dtInstalacao DATE,
area VARCHAR(45),
status VARCHAR(45),
CONSTRAINT chStatus
CHECK(status IN('Ativo','Inativo','Em manuntenção','Cancelado')),
fkObra INT,
CONSTRAINT chFkObra
FOREIGN KEY (fkObra) REFERENCES obra (idObra)
);

CREATE TABLE registroSensor(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dtRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
umidade DECIMAL(5,2),
fkSensor INT,
CONSTRAINT chFkSensor
FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);
select*from funcionario;

INSERT INTO empresa (nomeEmpresa,cnpj,dtCadastro) VALUES
('Construtora Aldair','23412340122312','2026-03-30 14:00:00'),
('Construtora Mané','22109812340192','2026-03-22 13:24:40');

INSERT INTO obra (rua,cep,numero,estado,cidade,fkEmpresa) VALUES
('Rua 1','09872348','22B','São Paulo','Taboão da Serra',1),
('Rua 2','09123456','205','Minas Gerais','Uberlândia',2);

INSERT INTO funcionario (nomeFuncionario,cpf,senha,tipoDeAcesso,email,fkEmpresa)VALUES
('Lucas','98309812323','123456Lucas','adm','lucas@lucas.com',1),
('Carlos','87654325611','123456Carlos','comum','carlos@carlos.com',1),
('Maria','09827891233','123456Maria','comum','maria@maria.com',1),
('José','09876523422','123456Jose','comum','jose@jose.com',1);

INSERT INTO sensor (modelo,dtInstalacao,area,status,fkObra) VALUES
('Sensor de Umidade de Solo Capacitivo','2026-03-30','LESTE','Ativo', 1),
('Sensor de Umidade de Solo Capacitivo','2026-03-30','OESTE','Ativo', 1),
('Sensor de Umidade de Solo Capacitivo','2026-04-01','OESTE','Ativo', 2),
('Sensor de Umidade de Solo Capacitivo','2026-04-01','SUL','Ativo',2);

INSERT INTO sensor (modelo,dtInstalacao,area,status,fkObra) VALUES
('Sensor de Umidade de Solo Capacitivo','2026-03-30','NORTE','Ativo', 1),
('Sensor de Umidade de Solo Capacitivo','2026-03-30','SUL','Ativo', 1);

INSERT INTO registroSensor(umidade,fkSensor)VALUES
(24,1),
(20,5),
(33,2),
(10,6);

SELECT e.nomeEmpresa,o.rua,o.cep,o.numero,o.estado,o.cidade,
s.modelo,s.dtInstalacao,s.area,s.status,r.dtRegistro,
r.umidade
FROM empresa e
JOIN obra o ON o.fkEmpresa = e.idEmpresa
JOIN sensor s ON s.fkObra = o.idObra
JOIN registroSensor r ON r.fkSensor = s.idSensor;

SELECT nomeEmpresa,rua,cep,numero,estado,cidade,
modelo,dtInstalacao,area,status,dtRegistro,
umidade
FROM empresa 
JOIN obra  ON fkEmpresa = idEmpresa
JOIN sensor  ON fkObra = idObra
JOIN registroSensor  ON fkSensor = idSensor
WHERE umidade <= 28;

SELECT e.nomeEmpresa,o.rua,o.cep,o.numero,o.estado,o.cidade,
s.modelo,s.dtInstalacao,s.area,s.status,r.dtRegistro,
r.umidade
FROM empresa e
JOIN obra o ON o.fkEmpresa = e.idEmpresa
JOIN sensor s ON s.fkObra = o.idObra
JOIN registroSensor r ON r.fkSensor = s.idSensor
WHERE umidade > 28; 

SELECT dtRegistro, area, status, umidade,
CASE
WHEN umidade < 30 AND umidade > 20 THEN 'Normal'
WHEN umidade >= 30 THEN 'Alto'
ELSE 'Baixo'
END AS 'Status de Alerta'
FROM registroSensor
JOIN sensor
ON fkSensor = idSensor
WHERE dtRegistro BETWEEN 
'2026-04-17 11:29:30' AND '2026-04-17 11:30:00';

SELECT area, umidade FROM registroSensor join sensor on idSensor = fkSensor  
where dtRegistro = (SELECT MAX(dtRegistro) from registroSensor) AND fkObra = 1  order by area; 

INSERT INTO registroSensor(dtRegistro,umidade,fkSensor)VALUES
('2026-05-23 09:52:00',100,1);

SELECT * FROM funcionario;

SELECT * FROM registroSensor;

SELECT * FROM sensor;
CREATE VIEW kpis_alertas AS
SELECT DATE_FORMAT(dtRegistro, '%d/%m/%Y-%h:%m') as dtFormatada,idObra, area, idEmpresa,umidade,
CASE 
WHEN umidade <=0 THEN 'INATIVO' 
WHEN umidade<= 20 AND umidade> 0 THEN 'BAIXO'
WHEN umidade <=30 AND umidade> 0 THEN 'IDEAL'
ELSE 'ALTO'
END AS alerta FROM registroSensor
JOIN sensor ON idSensor=fkSensor
JOIN obra ON idObra=fkObra
JOIN empresa ON idEmpresa=fkEmpresa
LIMIT 4;

SELECT * FROM kpis_alertas
WHERE area='LESTE' AND idEmpresa=1 AND idObra=1;

SELECT * FROM kpis_alertas
WHERE area='OESTE';

SELECT * FROM kpis_alertas
WHERE area='SUL';

SELECT * FROM kpis_alertas
WHERE area='NORTE';

TRUNCATE registroSensor;
