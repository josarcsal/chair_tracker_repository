INSERT INTO Usuarios     (hash_mac, nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mac1', '49163961H', 'pass1', '2022-03-21 17:53:05', 'User1', 'Lastname1', 'J', NULL);
    
INSERT INTO Usuarios     (hash_mac, nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mac2', '73579543S', 'pass2', '2022-04-24 12:53:05', 'User2', 'Lastname2', 'J', NULL);
    
INSERT INTO Usuarios     (hash_mac, nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mac3', '42685139F' ,'pass3', '2022-05-10 13:28:00', 'User3', 'Lastname3', 'E', '49163961H');
    
INSERT INTO Usuarios     (hash_mac, nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mac4', '65874912B', 'pass4', '2022-04-17 10:05:05', 'User4', 'Lastname4', 'E', '49163961H');
    
INSERT INTO Usuarios     (hash_mac, nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mac5', '51168940J', 'pass5', '2021-04-28 14:57:05', 'User5', 'Lastname5', 'E', '49163961H');
    
INSERT INTO Alarmas     (oid_alarma, dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES (1, 'L', '08:00', '12:00', 30, 10, 0, 0, 'mac1');

INSERT INTO Alarmas     (oid_alarma, dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES (2, 'MJ', '18:30', '20:00', 50, 20, 0, 0, 'mac1');
        
INSERT INTO Alarmas     (oid_alarma, dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES (3, 'LXV', '12:30', '17:45', 25, 5, 0, 0, 'mac1');
    
INSERT INTO Llamadas     (estado, desde, descripcion, remitente_hash_mac_fk, destinatario_hash_mac_fk)
    VALUES ('Pendiente', 'Department 1', 'Message 1', 'mac2', 'mac1');
    
INSERT INTO Llamadas     (estado, desde, descripcion, remitente_hash_mac_fk, destinatario_hash_mac_fk)
    VALUES ('Pendiente', 'Department 2', 'Message 2', 'mac3', 'mac1');
    
INSERT INTO Llamadas     (estado, desde, descripcion, remitente_hash_mac_fk, destinatario_hash_mac_fk)
    VALUES ('Pendiente', 'Department 3', 'Message 3', 'mac1', 'mac4');
    
UPDATE Alarmas SET ciclo_trabajo = 60 WHERE oid_alarma = 1;
UPDATE Alarmas SET ciclo_descanso = 60 WHERE oid_alarma = 1;

UPDATE Alarmas SET ciclo_trabajo = 60 WHERE oid_alarma = 2;
UPDATE Alarmas SET ciclo_descanso = 60 WHERE oid_alarma = 2;
    