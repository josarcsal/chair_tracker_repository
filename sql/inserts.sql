INSERT INTO Usuarios     (nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('49163961H', 'hola', NULL, 'Manuel', 'Garcia', 'J', NULL);
    
INSERT INTO Usuarios     (nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('39133961L', 'contrasena', '2021-04-24 12:53:05', 'Jose Antonio', 'Garcia', 'J', NULL);
    
INSERT INTO Usuarios     (nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('89183961L', 'contrasenajose', '2021-04-24 12:53:00', 'Jose', 'Arciniega', 'E', '39133961L');
    
INSERT INTO Placas     (nif_fk, estado)
    VALUES ('49163961H', 'OFF');
    
INSERT INTO Alarmas     (dias, estado, t_inicio, t_fin, t_trabajo, t_descanso, ciclo, nif_fk)
    VALUES ('L', 'Pendiente', '20:12:30', '21:15', 30, 10, 0, '49163961H');

INSERT INTO Alarmas     (dias, estado, t_inicio, t_fin, t_trabajo, t_descanso, ciclo, nif_fk)
    VALUES ('L', 'Pendiente', '18:30', '22:00', 50, 20, 0, '49163961H');
        
INSERT INTO Alarmas     (dias, estado, t_inicio, t_fin, t_trabajo, t_descanso, ciclo, nif_fk)
    VALUES ('L', 'Pendiente', '19:30', '22:22:05', 50, 20, 0, '89183961L');
    
INSERT INTO Llamadas     (estado, desde, descripcion, remitente_nif_fk, destinatario_nif_fk)
    VALUES ('Pendiente', 'Despacho de Martagon', 'implementa registros', '49163961H', '89183961L');
    
INSERT INTO Llamadas     (estado, desde, descripcion, remitente_nif_fk, destinatario_nif_fk)
    VALUES ('Pendiente', 'Despacho de Jose', 'realiza pruebas','89183961L', '49163961H');
    
/*INSERT INTO Registros     (tipo, fecha, trabajo, descanso, oid_llamada_fk, oid_alarma_fk, nif_fk)
    VALUES ('A', '2021-04-24 12:53:00', 50, 20, NULL, 1, '49163961H');*/
    
UPDATE Alarmas SET ciclo = 2 WHERE oid_alarma = 2;

/*INSERT INTO Usuarios     (nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('09183961L', 'contrasenaprueba1', '2021-04-24 12:53:00', 'prueba', 'trigger', 'E', '39133961L');
    
INSERT INTO Usuarios     (nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('12383961D', 'contrasenaprueba2', '2021-04-24 12:53:00', 'Antonio', 'Velez', 'E', NULL);
    
INSERT INTO Usuarios     (nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('12383961D', 'contrasenaprueba3', '2021-04-24 12:53:00', 'Antonio', 'Velez', 'E', '12383961D');
    
INSERT INTO Usuarios     (nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('mal', 'hola', NULL, 'Jose', 'Garcia', 'J', NULL);

INSERT INTO Usuarios     (nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe)
    VALUES ('12345678H', 'hola', NULL, 'Jose', 'Garcia', 'J', NULL);*/