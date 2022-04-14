USE proyectodad;

DROP TRIGGER Rellena_Registros_Llamadas_INSERT;
DROP TRIGGER Rellena_Registros_Alarmas_INSERT;
DROP TRIGGER Rellena_Registros_Alarmas_UPDATE;
DROP TRIGGER control_rol;
DROP TRIGGER control_nif;
DROP TRIGGER alarmas_por_usuario;

DROP TRIGGER alarmas_inicio_fin_solapado_INSERT;

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
		VALUES ('A', NOW(), NEW.ciclo_trabajo * NEW.t_trabajo, NEW.ciclo_descanso * NEW.t_descanso, NULL, NEW.oid_alarma, NEW.hash_mac_fk, NULL, NULL);
END//

DELIMITER //
CREATE TRIGGER Rellena_Registros_Alarmas_UPDATE BEFORE UPDATE
	ON proyectodad.alarmas FOR EACH ROW
    BEGIN
		DECLARE fecha DATETIME; DECLARE ciclo_trabajo_old SMALLINT; DECLARE ciclo_descanso_old SMALLINT;
		SELECT fecha INTO fecha FROM proyectodad.registros WHERE oid_alarma_fk = NEW.oid_alarma;
		SELECT ciclo_trabajo INTO ciclo_trabajo_old FROM proyectodad.alarmas WHERE oid_alarma = NEW.oid_alarma;
		SELECT ciclo_descanso INTO ciclo_descanso_old FROM proyectodad.alarmas WHERE oid_alarma = NEW.oid_alarma;
        IF(Month(NOW()) > Month(fecha)) 
		THEN
        INSERT INTO proyectodad.registros (tipo, fecha, trabajo, descanso, oid_llamada_fk, oid_alarma_fk, hash_mac_fk, remitente_hash_mac_fk, destinatario_hash_mac_fk) 
		VALUES ('A', NOW(),  (NEW.ciclo_trabajo - ciclo_trabajo_old) * NEW.t_trabajo, (NEW.ciclo_descanso - ciclo_descanso_old) * NEW.t_descanso, NULL, NEW.oid_alarma, NEW.hash_mac_fk, NULL, NULL);
	ELSE
		UPDATE proyectodad.registros SET fecha = NOW(), trabajo = NEW.ciclo_trabajo * NEW.t_trabajo, descanso = NEW.ciclo_descanso * NEW.t_descanso WHERE oid_alarma_fk = OLD.oid_alarma ORDER BY fecha LIMIT 1;
	END IF;
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

DELIMITER //
CREATE TRIGGER alarmas_por_usuario BEFORE INSERT
	ON proyectodad.alarmas FOR EACH ROW
    BEGIN
        DECLARE n_alarmas SMALLINT;
		SELECT COUNT(*) INTO n_alarmas FROM proyectodad.alarmas WHERE hash_mac_fk = NEW.hash_mac_fk;
    IF (n_alarmas = 5) 
		THEN
		signal sqlstate '48000' set message_text = 'Un usuario solo puede tener un maximo de cinco alarmas programadas';  
	END IF;
END//

CREATE TRIGGER alarmas_inicio_fin_solapado_INSERT BEFORE INSERT
	ON proyectodad.alarmas FOR EACH ROW
    BEGIN
    DECLARE bandera1 SMALLINT;
	DECLARE bandera2 SMALLINT;
    DECLARE bandera3 SMALLINT;
            
	SELECT COUNT(*) INTO bandera1 FROM proyectodad.alarmas WHERE  NEW.t_inicio >= t_inicio AND NEW.t_inicio <= t_fin AND hash_mac_fk = NEW.hash_mac_fk;
	SELECT COUNT(*) INTO bandera2 FROM proyectodad.alarmas WHERE  NEW.t_fin >= t_inicio AND NEW.t_fin <= t_fin AND hash_mac_fk = NEW.hash_mac_fk;
	SELECT COUNT(*) INTO bandera3 FROM proyectodad.alarmas WHERE NEW.t_fin <= NEW.t_inicio;

    IF (bandera1 OR bandera2 OR bandera3) 
		THEN
		signal sqlstate '50000' set message_text = 'Error al establecer horario, las alarmas no pueden ser solapadas y el tiempo de fin tiene que ser superior al de inicio';  
	END IF;
END//

SHOW TRIGGERS;




