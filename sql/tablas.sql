CREATE SCHEMA proyectodad;
USE proyectodad;

DROP TABLE Registros;
DROP TABLE Llamadas;
DROP TABLE Alarmas;
DROP TABLE Placas;
DROP TABLE Usuarios;

CREATE TABLE Usuarios(
    nif         VARCHAR(9) PRIMARY KEY,
    contrasena  VARCHAR(64) NOT NULL,
    last_login   DATETIME,
    nombre      VARCHAR(20),
    apellidos   VARCHAR(64),
    rol			VARCHAR(20) CHECK(rol IN ('J', 'E')) NOT NULL,
    nif_jefe         VARCHAR(9)
);

CREATE TABLE Placas(
	oid_placa SMALLINT PRIMARY KEY AUTO_INCREMENT,
	nombre	VARCHAR(20),
    nif_fk VARCHAR(9),
    estado		VARCHAR(20) CHECK(estado IN ('OFF', 'ON')),
	FOREIGN KEY (nif_fk) REFERENCES Usuarios (nif) ON DELETE CASCADE
);


CREATE TABLE Alarmas(
	oid_alarma	SMALLINT PRIMARY KEY AUTO_INCREMENT,
    dias		VARCHAR(9),
    estado 		VARCHAR(10) CHECK(estado IN ('Pendiente', 'Activa', 'Contestada')) NOT NULL,
    t_inicio	TIME,
    t_fin		TIME,
    t_trabajo	SMALLINT,
    t_descanso	SMALLINT,
    ciclo		SMALLINT,
    nif_fk VARCHAR(9),
    FOREIGN KEY (nif_fk) REFERENCES Usuarios (nif) ON DELETE CASCADE
);

CREATE TABLE Llamadas(
	oid_llamada	SMALLINT PRIMARY KEY AUTO_INCREMENT,
    estado 		VARCHAR(10) CHECK(estado IN ('Pendiente', 'Contestada')) NOT NULL,
    desde		VARCHAR(20),
    descripcion	VARCHAR(64),
    remitente_nif_fk VARCHAR(9),
    destinatario_nif_fk VARCHAR(9),
    FOREIGN KEY (remitente_nif_fk) REFERENCES Usuarios (nif) ON DELETE CASCADE,
    FOREIGN KEY (destinatario_nif_fk) REFERENCES Usuarios (nif) ON DELETE CASCADE
);

CREATE TABLE Registros(
	oid_reg		SMALLINT PRIMARY KEY AUTO_INCREMENT,
    tipo		VARCHAR(8) CHECK(tipo IN ('A', 'L')) NOT NULL,
    fecha		DATETIME,
    trabajo		SMALLINT,
    descanso 	SMALLINT,
    oid_llamada_fk	SMALLINT NULL,
    oid_alarma_fk	SMALLINT NULL,
	nif_fk VARCHAR(9) NULL,
	remitente_nif_fk VARCHAR(9) NULL,
    destinatario_nif_fk VARCHAR(9) NULL,
    FOREIGN KEY (nif_fk) REFERENCES Usuarios (nif) ON DELETE CASCADE,
    FOREIGN KEY (remitente_nif_fk) REFERENCES Usuarios (nif) ON DELETE CASCADE,
    FOREIGN KEY (destinatario_nif_fk) REFERENCES Usuarios (nif) ON DELETE CASCADE,
    FOREIGN KEY (oid_alarma_fk) REFERENCES Alarmas (oid_alarma) ON DELETE CASCADE,
    FOREIGN KEY (oid_llamada_fk) REFERENCES Llamadas (oid_llamada) ON DELETE CASCADE
);