INSERT INTO Usuarios     (hash_mac, nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mac123', '49163961H', 'hola', NULL, 'Manuel', 'Garcia', 'J', NULL);
    
INSERT INTO Usuarios     (hash_mac, nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mac456', '39133961L', 'contrasena', '2021-04-24 12:53:05', 'Jose Antonio', 'Garcia', 'J', NULL);
    
INSERT INTO Usuarios     (hash_mac, nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mac789', '89183961L' ,'contrasenajose', '2021-04-24 12:53:00', 'Jose', 'Arciniega', 'E', '39133961L');
    
/*INSERT INTO Placas     (hash_mac_fk, estado)
    VALUES ('mac123', 'OFF');*/
    
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '20:12:30', '21:15', 30, 10, 0, 0, 'mac123');

INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '18:30', '19:00', 50, 20, 0, 0, 'mac123');
        
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '19:30', '22:22:05', 50, 20, 0, 0, 'mac789');
    
INSERT INTO Llamadas     (estado, desde, descripcion, remitente_hash_mac_fk, destinatario_hash_mac_fk)
    VALUES ('Pendiente', 'Despacho de Martagon', 'implementa registros', 'mac123', 'mac789');
    
INSERT INTO Llamadas     (estado, desde, descripcion, remitente_hash_mac_fk, destinatario_hash_mac_fk)
    VALUES ('Pendiente', 'Despacho de Jose', 'realiza pruebas','mac789', 'mac123');
    
/*INSERT INTO Registros     (tipo, fecha, trabajo, descanso, oid_llamada_fk, oid_alarma_fk, hash_mac_fk)
    VALUES ('A', '2021-04-24 12:53:00', 50, 20, NULL, 1, 'mac123');*/
    
UPDATE Alarmas SET ciclo_trabajo = 2 WHERE oid_alarma = 2;
UPDATE Alarmas SET ciclo_descanso = 8 WHERE oid_alarma = 2;

/*Pruebas de triggers (levantan excepciones)*/
/*INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '18:30', '22:00', 50, 20, 0, 0, 'mac123');
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '18:30', '22:00', 50, 20, 0, 0, 'mac123');
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '18:30', '22:00', 50, 20, 0, 0, 'mac123');
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '18:30', '22:00', 50, 20, 0, 0, 'mac123');
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '18:00', '22:00', 50, 20, 0, 0, 'mac123');
    
//ALARMAS SOLAPADAS
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '18:30', '19:00', 50, 20, 0, 0, 'mac123');
    
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '18:45', '19:30', 50, 20, 0, 0, 'mac123');
    
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '14:45', '18:45', 50, 20, 0, 0, 'mac123');
    
INSERT INTO Alarmas     (dias, t_inicio, t_fin, t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk)
    VALUES ('L', '18:45','14:45', 50, 20, 0, 0, 'mac123');

INSERT INTO Usuarios     (hash_mac, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('09183961L', 'contrasenaprueba1', '2021-04-24 12:53:00', 'prueba', 'trigger', 'E', 'mac456');
    
INSERT INTO Usuarios     (hash_mac, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('12383961D', 'contrasenaprueba2', '2021-04-24 12:53:00', 'Antonio', 'Velez', 'E', NULL);
    
INSERT INTO Usuarios     (hash_mac, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('12383961D', 'contrasenaprueba3', '2021-04-24 12:53:00', 'Antonio', 'Velez', 'E', '12383961D');
    
INSERT INTO Usuarios     (hash_mac, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mal', 'hola', NULL, 'Jose', 'Garcia', 'J', NULL);

INSERT INTO Usuarios     (hash_mac, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('12345678H', 'hola', NULL, 'Jose', 'Garcia', 'J', NULL);*/