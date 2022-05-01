CREATE SCHEMA proyectodad;
USE proyectodad;

DROP TABLE Registros;
DROP TABLE Llamadas;
DROP TABLE Alarmas;
DROP TABLE Usuarios;

CREATE TABLE Usuarios(
	hash_mac VARCHAR(10) PRIMARY KEY,
    nif         VARCHAR(9) NOT NULL,
    contrasena  VARCHAR(64) NOT NULL,
    last_login   DATETIME,
    nombre      VARCHAR(20),
    apellidos   VARCHAR(64),
    rol			VARCHAR(20) CHECK(rol IN ('J', 'E')) NOT NULL,
    nif_jefe         VARCHAR(9)
);

CREATE TABLE Alarmas(
	oid_alarma	SMALLINT PRIMARY KEY AUTO_INCREMENT,
    dias		VARCHAR(9),
    t_inicio	TIME,
    t_fin		TIME,
    t_trabajo	SMALLINT,
    t_descanso	SMALLINT,
    ciclo_trabajo		SMALLINT,
    ciclo_descanso SMALLINT,
    hash_mac_fk VARCHAR(10),
    FOREIGN KEY (hash_mac_fk) REFERENCES Usuarios (hash_mac) ON DELETE CASCADE
);

CREATE TABLE Llamadas(
	oid_llamada	SMALLINT PRIMARY KEY AUTO_INCREMENT,
    estado 		VARCHAR(10) CHECK(estado IN ('Pendiente', 'Contestada')) NOT NULL,
    desde		VARCHAR(20),
    descripcion	VARCHAR(64),
    remitente_hash_mac_fk VARCHAR(10),
    destinatario_hash_mac_fk VARCHAR(10),
    FOREIGN KEY (remitente_hash_mac_fk) REFERENCES Usuarios (hash_mac) ON DELETE CASCADE,
    FOREIGN KEY (destinatario_hash_mac_fk) REFERENCES Usuarios (hash_mac) ON DELETE CASCADE
);

CREATE TABLE Registros(
	oid_reg		SMALLINT PRIMARY KEY AUTO_INCREMENT,
    tipo		VARCHAR(8) CHECK(tipo IN ('A', 'L')) NOT NULL,
    fecha		DATETIME,
    trabajo		SMALLINT,
    descanso 	SMALLINT,
    oid_llamada_fk	SMALLINT NULL,
    oid_alarma_fk	SMALLINT NULL,
	hash_mac_fk VARCHAR(10) NULL,
	remitente_hash_mac_fk VARCHAR(10) NULL,
	remitente_nombre VARCHAR(64),
    destinatario_hash_mac_fk VARCHAR(10) NULL,
	destinatario_nombre VARCHAR(64),
    FOREIGN KEY (hash_mac_fk) REFERENCES Usuarios (hash_mac) ON DELETE CASCADE,
    FOREIGN KEY (remitente_hash_mac_fk) REFERENCES Usuarios (hash_mac) ON DELETE CASCADE,
    FOREIGN KEY (destinatario_hash_mac_fk) REFERENCES Usuarios (hash_mac) ON DELETE CASCADE,
    FOREIGN KEY (oid_alarma_fk) REFERENCES Alarmas (oid_alarma) ON DELETE CASCADE,
    FOREIGN KEY (oid_llamada_fk) REFERENCES Llamadas (oid_llamada) ON DELETE CASCADE
);