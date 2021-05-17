USE proyectodad;

DROP TRIGGER Rellena_Registros_Llamadas_INSERT;
DROP TRIGGER Rellena_Registros_Alarmas_INSERT;
DROP TRIGGER Rellena_Registros_Alarmas_UPDATE;
DROP TRIGGER control_rol;
DROP TRIGGER control_nif;

DELIMITER //
CREATE TRIGGER Rellena_Registros_Llamadas_INSERT AFTER INSERT 
	ON proyectodad.llamadas FOR EACH ROW
    BEGIN
    INSERT INTO proyectodad.registros (tipo, fecha, trabajo, descanso, oid_llamada_fk, oid_alarma_fk, hash_mac_fk, remitente_hash_mac_fk, destinatario_hash_mac_fk) 
		VALUES ('L', NOW(), NULL, NULL, NEW.oid_llamada, NULL, NULL, NEW.remitente_hash_mac_fk, NEW.destinatario_hash_mac_fk);
END//

DELIMITER //
CREATE TRIGGER Rellena_Registros_Alarmas_INSERT AFTER INSERT
	ON proyectodad.alarmas FOR EACH ROW
    BEGIN
    INSERT INTO proyectodad.registros (tipo, fecha, trabajo, descanso, oid_llamada_fk, oid_alarma_fk, hash_mac_fk, remitente_hash_mac_fk, destinatario_hash_mac_fk) 
		VALUES ('A', NOW(), NEW.ciclo * NEW.t_trabajo, NEW.ciclo * NEW.t_descanso, NULL, NEW.oid_alarma, NEW.hash_mac_fk, NULL, NULL);
END//

DELIMITER //
CREATE TRIGGER Rellena_Registros_Alarmas_UPDATE AFTER UPDATE
	ON proyectodad.alarmas FOR EACH ROW
    BEGIN
    UPDATE proyectodad.registros SET fecha = NOW(), trabajo = NEW.ciclo * NEW.t_trabajo, descanso = NEW.ciclo * NEW.t_descanso WHERE oid_alarma_fk = OLD.oid_alarma;
END//

DELIMITER //
CREATE TRIGGER control_rol BEFORE INSERT
	ON proyectodad.usuarios FOR EACH ROW
    BEGIN
    IF(NEW.rol = 'E' AND NEW.nif_jefe IS NULL) 
		THEN
		signal sqlstate '45000' set message_text = 'Un empleado debe tener un jefe';  
	ELSE
		IF(NEW.rol = 'E' AND NOT(SELECT EXISTS (SELECT nif FROM proyectodad.usuarios WHERE rol = 'J' AND nif = NEW.nif_jefe AND nif IS NOT NULL))) 
			THEN
				signal sqlstate '46000' set message_text = 'El nif_jefe debe ser valido'; 
		END IF;  
	END IF;
END//

DELIMITER //
CREATE TRIGGER control_nif BEFORE INSERT
	ON proyectodad.usuarios FOR EACH ROW
    BEGIN
    IF (NEW.nif NOT REGEXP '([0-9]{8}[A-z]{1})') 
		THEN
		signal sqlstate '47000' set message_text = 'El nif debe estar formado por 8 numeros y una letra';  
	END IF;
END//

SHOW TRIGGERS;




