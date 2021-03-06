package es.us.lsi.dad;

import com.google.gson.Gson;

import es.us.lsi.dad.impl.AlarmaImpl;
import es.us.lsi.dad.impl.LlamadaImpl;
import es.us.lsi.dad.impl.RegistroImpl;
import es.us.lsi.dad.impl.UsuarioImpl;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.eventbus.MessageConsumer;
import io.vertx.core.json.JsonObject;
import io.vertx.mysqlclient.MySQLConnectOptions;
import io.vertx.mysqlclient.MySQLPool;
import io.vertx.sqlclient.PoolOptions;
import io.vertx.sqlclient.Query;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;

public class BBDDVerticle extends AbstractVerticle {

	MySQLPool mySqlClient;
	Gson gson;

	@Override
	public void start(Promise<Void> startFuture) {
		MySQLConnectOptions connectOptions = new MySQLConnectOptions().setPort(3306).setHost("localhost")
				.setDatabase("chairtrackerdb").setUser("root").setPassword("root");

		PoolOptions poolOptions = new PoolOptions().setMaxSize(5);

		mySqlClient = MySQLPool.pool(vertx, connectOptions, poolOptions);

		// USUARIOS
		obtenerUsuarios();
		obtenerContactos();
		existeUsuario();
		borrarUsuario();
		anadirUsuario();
		editarUsuario();

		// ALARMAS
		obtenerAlarmas();
		obtenerAlarmasUsuario();
		obtenerAlarmasUsuarioDia();
		borrarAlarma();
		anadirAlarma();
		editarAlarma();

		// LLAMADAS
		obtenerLlamadas();
		obtenerLlamadasRecibidasUsuario();
		obtenerLlamadasEnviadasUsuario();
		anadirLlamada();
		editarLlamada();

		// REGISTROS
		obtenerRegistros();
		obtenerRegistrosLlamadas();
		obtenerRegistrosAlarmasUsuarioAnyo();
		obtenerRegistrosAlarmas();
		obtenerRegistrosAlarmasUsuario();
		obtenerRegistrosLlamadasEnviadas();
		obtenerRegistrosLlamadasRecibidas();

		startFuture.complete();
	}

	/*
	 * *********************************************
	 * 
	 * 
	 * USUARIOS
	 * 
	 * 
	 *********************************************/

	// Obtiene todos los usuarios de la BBDD
	private void obtenerUsuarios() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerUsuarios");

		consumer.handler(message -> {
			Query<RowSet<Row>> query = mySqlClient.query("SELECT * FROM chairtrackerdb.usuarios;");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						UsuarioImpl usuario = new UsuarioImpl();
						usuario.setHash_mac(v.getString("hash_mac"));
						usuario.setNif(v.getString("nif"));
						usuario.setContrasena(v.getString("contrasena"));
						usuario.setLast_login(
								UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("last_login"))));
						usuario.setNombre(v.getString("nombre"));
						usuario.setApellidos(v.getString("apellidos"));
						usuario.setRol(v.getString("rol"));
						usuario.setNif_jefe(v.getString("nif_jefe"));
						System.out.println(json);
						json.put(v.getString("hash_mac"), v.toJson());
					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene todos los contactos de un usuario de la BBDD
	private void obtenerContactos() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerContactos");

		consumer.handler(message -> {
			JsonObject jsonHash = new JsonObject(message.body());
			JsonObject jsonRes = new JsonObject();
			String hash_mac = jsonHash.getString("hash_mac");
			if (!(hash_mac.equals(""))) {
				Query<RowSet<Row>> queryCount = mySqlClient
						.query("SELECT rol, nif FROM chairtrackerdb.usuarios WHERE hash_mac = '" + hash_mac + "';");

				queryCount.execute(res -> {
					if (res.succeeded()) {

						Row rowCount = res.result().iterator().next();

						if (rowCount.getString("rol").equals("J")) {

							Query<RowSet<Row>> queryJefe = mySqlClient
									.query("SELECT * FROM chairtrackerdb.Usuarios WHERE nif_jefe = '"
											+ rowCount.getString("nif") + "' OR rol = 'J';");

							queryJefe.execute(resQueryJefe -> {
								JsonObject jsonJefe = new JsonObject();

								if (resQueryJefe.succeeded()) {
									resQueryJefe.result().forEach(v -> {
										UsuarioImpl usuario = new UsuarioImpl();
										usuario.setHash_mac(v.getString("hash_mac"));
										usuario.setNif(v.getString("nif"));
										usuario.setContrasena(v.getString("contrasena"));
										usuario.setLast_login(UsuarioImpl
												.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("last_login"))));
										usuario.setNombre(v.getString("nombre"));
										usuario.setApellidos(v.getString("apellidos"));
										usuario.setRol(v.getString("rol"));
										usuario.setNif_jefe(v.getString("nif_jefe"));
										System.out.println(jsonJefe);
										jsonJefe.put(v.getString("hash_mac"), v.toJson());
									});
								} else {
									jsonJefe.put(String.valueOf("ERROR"), res.cause());
								}
								message.reply(jsonJefe);
							});
						} else {
							Query<RowSet<Row>> queryEmpleado = mySqlClient.query(
									"SELECT * FROM chairtrackerdb.Usuarios WHERE nif_jefe = '" + rowCount.getString("nif")
											+ "' OR nif = '" + rowCount.getString("nif") + "';");

							queryEmpleado.execute(resQueryEmpleado -> {
								JsonObject jsonEmpleado = new JsonObject();

								if (resQueryEmpleado.succeeded()) {
									resQueryEmpleado.result().forEach(v -> {
										UsuarioImpl usuario = new UsuarioImpl();
										usuario.setHash_mac(v.getString("hash_mac"));
										usuario.setNif(v.getString("nif"));
										usuario.setContrasena(v.getString("contrasena"));
										usuario.setLast_login(UsuarioImpl
												.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("last_login"))));
										usuario.setNombre(v.getString("nombre"));
										usuario.setApellidos(v.getString("apellidos"));
										usuario.setRol(v.getString("rol"));
										usuario.setNif_jefe(v.getString("nif_jefe"));
										System.out.println(jsonEmpleado);
										jsonEmpleado.put(v.getString("hash_mac"), v.toJson());
									});
								} else {
									jsonEmpleado.put(String.valueOf("ERROR"), res.cause());
								}
								message.reply(jsonEmpleado);
							});
						}
					} else {
						message.reply("ERROR AL OBTENER CONTACTOS" + res.cause());
					}
				});
			} else {
				message.reply(jsonRes);
			}
		});
	}

	// Borra un usuario de la BBDD dado su hash_mac
	private void existeUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("existeUsuario");

		consumer.handler(message -> {

			JsonObject jsonExisteUsuario = new JsonObject(message.body());
			String nif = jsonExisteUsuario.getString("nif");
			String contrasena = jsonExisteUsuario.getString("contrasena");

			System.out.println(nif);
			System.out.println(contrasena);

			Query<RowSet<Row>> queryCount = mySqlClient
					.query("SELECT COUNT(*), hash_mac, nombre, nif_jefe FROM chairtrackerdb.usuarios WHERE nif = '" + nif
							+ "' AND contrasena = '" + contrasena + "';");

			queryCount.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					Row rowCount = res.result().iterator().next();

					if (rowCount.getInteger("COUNT(*)") > 0) {
						res.result().forEach(v -> {
							json.put("existe", v.getInteger("COUNT(*)"));
							json.put("hash_mac", v.getString("hash_mac"));
							json.put("nombre", v.getString("nombre"));
							json.put("nif_jefe", v.getString("nif_jefe"));
						});
					} else {
						json.put(String.valueOf("existe"), 0);
					}
				} else {
					message.reply("ERROR AL VERIFICAR AL USUARIO " + res.cause());
				}
				message.reply(json);
			});
		});
	}

	// Borra un usuario de la BBDD dado su hash_mac
	private void borrarUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("borrarUsuario");

		consumer.handler(message -> {
			String hash_mac = message.body();

			Query<RowSet<Row>> queryCount = mySqlClient
					.query("SELECT COUNT(*) AS cuenta FROM chairtrackerdb.usuarios WHERE hash_mac = '" + hash_mac + "';");

			queryCount.execute(res -> {
				if (res.succeeded()) {

					Row rowCount = res.result().iterator().next();

					if (rowCount.getInteger("cuenta") > 0) {

						Query<RowSet<Row>> query = mySqlClient
								.query("DELETE FROM chairtrackerdb.Usuarios WHERE hash_mac = '" + hash_mac + "';");

						query.execute(resQuery -> {
							if (resQuery.succeeded()) {
								message.reply("Borrado del usuario " + hash_mac);
							} else {
								message.reply("ERROR AL BORRAR EL USUARIO");
							}
						});
					} else {
						message.reply("ERROR AL ELIMINAR EL USUARIO: NO EXISTE UN USUARIO CON ESE hash_mac");
					}
				} else {
					message.reply("ERROR AL ELIMINAR EL USUARIO " + res.cause());
				}
			});
		});
	}

	// Anade un usuario a la BBDD
	private void anadirUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("anadirUsuario");

		consumer.handler(message -> {
			JsonObject jsonNewUsuario = new JsonObject(message.body());
			UsuarioImpl newUser = new UsuarioImpl();

			newUser.setHash_mac(jsonNewUsuario.getString("hash_mac"));
			newUser.setNif(jsonNewUsuario.getString("nif"));
			newUser.setContrasena(jsonNewUsuario.getString("contrasena"));
			newUser.setLast_login(
					UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(jsonNewUsuario.getValue("last_login"))));
			newUser.setNombre(jsonNewUsuario.getString("nombre"));
			newUser.setApellidos(jsonNewUsuario.getString("apellidos"));
			newUser.setRol(jsonNewUsuario.getString("rol"));
			newUser.setNif_jefe(jsonNewUsuario.getString("nif_jefe"));

			Query<RowSet<Row>> query = mySqlClient.query(
					"INSERT INTO chairtrackerdb.Usuarios(hash_mac, nif, contrasena, last_login, nombre, apellidos, rol, nif_jefe) "
							+ "VALUES ('" + newUser.getHash_mac() + "','" + newUser.getNif() + "','"
							+ newUser.getContrasena() + "','" + newUser.getLast_login() + "','" + newUser.getNombre()
							+ "','" + newUser.getApellidos() + "','" + newUser.getRol() + "','" + newUser.getNif_jefe()
							+ "');");

			query.execute(res -> {
				if (res.succeeded()) {
					message.reply(
							"A?adido el usuario " + newUser.getNombre() + " con hash_mac: " + newUser.getHash_mac());
				} else {
					message.reply("ERROR AL A?ADIR EL USUARIO " + res.cause());
				}
				;
			});
		});
	}

	// Edita los datos de un usuario dado su hash_mac
	private void editarUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("editarUsuario");

		consumer.handler(message -> {
			JsonObject jsonEditUsuario = new JsonObject(message.body());
			String hash_mac = jsonEditUsuario.getString("hash_mac");
			UsuarioImpl editUser = new UsuarioImpl();

			editUser.setHash_mac(jsonEditUsuario.getString("hash_mac"));
			editUser.setNif(jsonEditUsuario.getString("nif"));
			editUser.setContrasena(jsonEditUsuario.getString("contrasena"));
			editUser.setLast_login(
					UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(jsonEditUsuario.getValue("last_login"))));
			editUser.setNombre(jsonEditUsuario.getString("nombre"));
			editUser.setApellidos(jsonEditUsuario.getString("apellidos"));
			editUser.setRol(jsonEditUsuario.getString("rol"));
			editUser.setNif_jefe(jsonEditUsuario.getString("nif_jefe"));

			Query<RowSet<Row>> queryCount = mySqlClient
					.query("SELECT COUNT(*) AS cuenta FROM chairtrackerdb.Usuarios WHERE hash_mac = '" + hash_mac + "';");

			queryCount.execute(res -> {
				if (res.succeeded()) {

					Row rowCount = res.result().iterator().next();

					if (rowCount.getInteger("cuenta") > 0) {

						Query<RowSet<Row>> query = mySqlClient.query("UPDATE chairtrackerdb.Usuarios SET hash_mac = '"
								+ editUser.getHash_mac() + "', nif = '" + editUser.getNif() + "', contrasena = '"
								+ editUser.getContrasena() + "', last_login = '" + editUser.getLast_login()
								+ "', nombre = '" + editUser.getNombre() + "', apellidos = '" + editUser.getApellidos()
								+ "', rol = '" + editUser.getRol() + "', nif_jefe = '" + editUser.getNif_jefe()
								+ "' WHERE hash_mac = '" + hash_mac + "';");

						query.execute(resQuery -> {
							if (resQuery.succeeded()) {
								message.reply("Editado el usuario " + editUser.getNombre() + " con hash_mac: "
										+ editUser.getHash_mac());
							} else {
								message.reply("ERROR AL EDITAR EL USUARIO" + resQuery.cause());
							}
						});
					} else {
						message.reply("ERROR AL EDITAR EL USUARIO: NO EXISTE UN USUARIO CON ESE hash_mac");
					}
				} else {
					message.reply("ERROR AL EDITAR EL USUARIO " + res.cause());
				}
			});
		});
	}

	/*
	 * *********************************************
	 * 
	 * 
	 * ALARMAS
	 * 
	 * 
	 *********************************************/

	// Obtiene todas las alarmas de la BBDD
	private void obtenerAlarmas() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerAlarmas");

		consumer.handler(message -> {
			Query<RowSet<Row>> query = mySqlClient.query("SELECT * FROM chairtrackerdb.alarmas;");

			query.execute(res -> {
				JsonObject json = new JsonObject();

				if (res.succeeded()) {

					res.result().forEach(v -> {
						AlarmaImpl alarma = new AlarmaImpl();
						alarma.setOid_alarma(v.getShort("oid_alarma"));
						alarma.setDias(v.getString("dias"));
						alarma.setT_inicio(AlarmaImpl.ParseaLocalTimeFromJson(String.valueOf(v.getValue("t_inicio"))));
						alarma.setT_fin(AlarmaImpl.ParseaLocalTimeFromJson(String.valueOf(v.getValue("t_fin"))));
						alarma.setT_trabajo(v.getShort("t_trabajo"));
						alarma.setT_descanso(v.getShort("t_descanso"));
						alarma.setCiclo_trabajo(v.getShort("ciclo_trabajo"));
						alarma.setCiclo_descanso(v.getShort("ciclo_descanso"));
						alarma.setHash_mac_fk(v.getString("hash_mac_fk"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_alarma")), v.toJson());
					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene las alarmas asociadas a un usuario dado su hash_mac
	private void obtenerAlarmasUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerAlarmasUsuario");

		consumer.handler(message -> {
			JsonObject jsonEditLlamada = new JsonObject(message.body());
			String hash_mac_fk = jsonEditLlamada.getString("hash_mac_fk");

			Query<RowSet<Row>> query = mySqlClient
					.query("SELECT * FROM chairtrackerdb.alarmas WHERE hash_mac_fk = '" + hash_mac_fk + "';");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						AlarmaImpl alarma = new AlarmaImpl();
						alarma.setOid_alarma(v.getShort("oid_alarma"));
						alarma.setDias(v.getString("dias"));
						alarma.setT_inicio(AlarmaImpl.ParseaLocalTimeFromJson(String.valueOf(v.getValue("t_inicio"))));
						alarma.setT_fin(AlarmaImpl.ParseaLocalTimeFromJson(String.valueOf(v.getValue("t_fin"))));
						alarma.setT_trabajo(v.getShort("t_trabajo"));
						alarma.setT_descanso(v.getShort("t_descanso"));
						alarma.setCiclo_trabajo(v.getShort("ciclo_trabajo"));
						alarma.setCiclo_descanso(v.getShort("ciclo_descanso"));
						alarma.setHash_mac_fk(v.getString("hash_mac_fk"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_alarma")), v.toJson());
					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene las alarmas asociadas a un usuario en un dia dado junto con su
	// hash_mac
	private void obtenerAlarmasUsuarioDia() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerAlarmasUsuarioDia");

		consumer.handler(message -> {
			JsonObject jsonEditLlamada = new JsonObject(message.body());
			String hash_mac_fk = jsonEditLlamada.getString("hash_mac_fk");
			String dias = jsonEditLlamada.getString("dias");

			Query<RowSet<Row>> query = mySqlClient.query("SELECT * FROM chairtrackerdb.alarmas WHERE hash_mac_fk = '"
					+ hash_mac_fk + "' AND dias LIKE '%" + dias + "%';");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						AlarmaImpl alarma = new AlarmaImpl();
						alarma.setOid_alarma(v.getShort("oid_alarma"));
						alarma.setDias(v.getString("dias"));
						alarma.setT_inicio(AlarmaImpl.ParseaLocalTimeFromJson(String.valueOf(v.getValue("t_inicio"))));
						alarma.setT_fin(AlarmaImpl.ParseaLocalTimeFromJson(String.valueOf(v.getValue("t_fin"))));
						alarma.setT_trabajo(v.getShort("t_trabajo"));
						alarma.setT_descanso(v.getShort("t_descanso"));
						alarma.setCiclo_trabajo(v.getShort("ciclo_trabajo"));
						alarma.setCiclo_descanso(v.getShort("ciclo_descanso"));
						alarma.setHash_mac_fk(v.getString("hash_mac_fk"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_alarma")), v.toJson());
					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Borra la alarma segun oid_alarma
	private void borrarAlarma() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("borrarAlarma");

		consumer.handler(message -> {
			String oid_alarma = message.body();

			Query<RowSet<Row>> queryCount = mySqlClient.query(
					"SELECT COUNT(*) AS cuenta FROM chairtrackerdb.alarmas WHERE oid_alarma = '" + oid_alarma + "';");

			queryCount.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					Row rowCount = res.result().iterator().next();

					if (rowCount.getInteger("cuenta") > 0) {

						Query<RowSet<Row>> queryUser = mySqlClient
								.query("SELECT * FROM chairtrackerdb.alarmas WHERE oid_alarma = '" + oid_alarma + "';");

						queryUser.execute(resQueryUser -> {
							if (resQueryUser.succeeded()) {

								resQueryUser.result().forEach(v -> {
									AlarmaImpl alarma = new AlarmaImpl();
									alarma.setOid_alarma(v.getShort("oid_alarma"));
									alarma.setDias(v.getString("dias"));
									alarma.setT_inicio(
											AlarmaImpl.ParseaLocalTimeFromJson(String.valueOf(v.getValue("t_inicio"))));
									alarma.setT_fin(
											AlarmaImpl.ParseaLocalTimeFromJson(String.valueOf(v.getValue("t_fin"))));
									alarma.setT_trabajo(v.getShort("t_trabajo"));
									alarma.setT_descanso(v.getShort("t_descanso"));
									alarma.setCiclo_trabajo(v.getShort("ciclo_trabajo"));
									alarma.setCiclo_descanso(v.getShort("ciclo_descanso"));
									alarma.setHash_mac_fk(v.getString("hash_mac_fk"));
									System.out.println(json);
									json.put(String.valueOf(v.getValue("oid_alarma")), v.toJson());
								});
							} else {
								message.reply("ERROR AL OBTENER EL USUARIO PARA BORRAR LA ALARMA");
							}
						});

						Query<RowSet<Row>> query = mySqlClient
								.query("DELETE FROM chairtrackerdb.alarmas WHERE oid_alarma = '" + oid_alarma + "';");

						query.execute(resQuery -> {
							if (resQuery.succeeded()) {
								message.reply(json);
							} else {
								message.reply("ERROR AL BORRAR LA ALARMA");
							}
						});
					} else {
						message.reply("ERROR AL ELIMINAR LA ALARMA: NO EXISTE UNA ALARMA CON ESE OID");
					}
				} else {
					message.reply("ERROR AL ELIMINAR LA ALARMA " + res.cause());
				}
			});
		});
	}

	// Anade alarma a la BBDD
	private void anadirAlarma() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("anadirAlarma");

		consumer.handler(message -> {
			JsonObject jsonNewAlarma = new JsonObject(message.body());
			if (jsonNewAlarma.getString("hash_mac_fk") != "") {
				AlarmaImpl newAlarma = new AlarmaImpl();
				// newAlarma.setOid_alarma(Short.valueOf(jsonNewAlarma.getString("oid_alarma")));
				newAlarma.setDias(jsonNewAlarma.getString("dias"));
				newAlarma.setT_inicio(AlarmaImpl.ParseaLocalTimeFromJson(jsonNewAlarma.getString("t_inicio")));
				newAlarma.setT_fin(AlarmaImpl.ParseaLocalTimeFromJson(jsonNewAlarma.getString("t_fin")));
				newAlarma.setT_trabajo(Short.valueOf(jsonNewAlarma.getString("t_trabajo")));
				newAlarma.setT_descanso(Short.valueOf(jsonNewAlarma.getString("t_descanso")));
				newAlarma.setCiclo_trabajo(Short.valueOf(jsonNewAlarma.getString("ciclo_trabajo")));
				newAlarma.setCiclo_descanso(Short.valueOf(jsonNewAlarma.getString("ciclo_descanso")));
				newAlarma.setHash_mac_fk(jsonNewAlarma.getString("hash_mac_fk"));

				Query<RowSet<Row>> query = mySqlClient.query("INSERT INTO chairtrackerdb.alarmas(dias, t_inicio, t_fin,"
						+ "t_trabajo, t_descanso, ciclo_trabajo, ciclo_descanso, hash_mac_fk) " + "VALUES ('"
						+ newAlarma.getDias() + "','" + newAlarma.getT_inicio() + "','" + newAlarma.getT_fin() + "','"
						+ newAlarma.getT_trabajo() + "','" + newAlarma.getT_descanso() + "','"
						+ newAlarma.getCiclo_trabajo() + "','" + newAlarma.getCiclo_descanso() + "','"
						+ newAlarma.getHash_mac_fk() + "');");

				query.execute(res -> {
					if (res.succeeded()) {
						message.reply(jsonNewAlarma);
					} else {
						message.reply("ERROR AL A?ADIR LA ALARMA " + res.cause());
					}
					;
				});
			}
			if (jsonNewAlarma.getString("hash_mac_fk") == "")
				message.reply(jsonNewAlarma);
		});
	}

	// Edita una alarma dado su oid
	private void editarAlarma() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("editarAlarma");

		consumer.handler(message -> {
			JsonObject jsonEditAlarma = new JsonObject(message.body());
			String oid_alarma = jsonEditAlarma.getString("oid_alarma");
			AlarmaImpl editAlarma = new AlarmaImpl();

			editAlarma.setOid_alarma(Short.valueOf(jsonEditAlarma.getString("oid_alarma")));
			editAlarma.setDias(jsonEditAlarma.getString("dias"));
			editAlarma.setT_inicio(AlarmaImpl.ParseaLocalTimeFromJson(jsonEditAlarma.getString("t_inicio")));
			editAlarma.setT_fin(AlarmaImpl.ParseaLocalTimeFromJson(jsonEditAlarma.getString("t_fin")));
			editAlarma.setT_trabajo(Short.valueOf(jsonEditAlarma.getString("t_trabajo")));
			editAlarma.setT_descanso(Short.valueOf(jsonEditAlarma.getString("t_descanso")));
			editAlarma.setCiclo_trabajo(Short.valueOf(jsonEditAlarma.getString("ciclo_trabajo")));
			editAlarma.setCiclo_descanso(Short.valueOf(jsonEditAlarma.getString("ciclo_descanso")));
			editAlarma.setHash_mac_fk(jsonEditAlarma.getString("hash_mac_fk"));

			Query<RowSet<Row>> queryCount = mySqlClient.query(
					"SELECT COUNT(*) AS cuenta FROM chairtrackerdb.alarmas WHERE oid_alarma = '" + oid_alarma + "';");

			queryCount.execute(res -> {
				if (res.succeeded()) {

					Row rowCount = res.result().iterator().next();

					if (rowCount.getInteger("cuenta") > 0) {

						Query<RowSet<Row>> query = mySqlClient.query("UPDATE chairtrackerdb.alarmas SET "
								+ "oid_alarma = '" + editAlarma.getOid_alarma() + "', dias = '" + editAlarma.getDias()
								+ "', t_inicio = '" + editAlarma.getT_inicio() + "', t_fin = '" + editAlarma.getT_fin()
								+ "', t_trabajo = '" + editAlarma.getT_trabajo() + "', t_descanso = '"
								+ editAlarma.getT_descanso() + "', ciclo_trabajo = '" + editAlarma.getCiclo_trabajo()
								+ "', ciclo_descanso = '" + editAlarma.getCiclo_descanso() + "', hash_mac_fk = '"
								+ editAlarma.getHash_mac_fk() + "' WHERE oid_alarma = '" + oid_alarma + "';");

						query.execute(resQuery -> {
							if (resQuery.succeeded()) {
								message.reply(jsonEditAlarma);
							} else {
								message.reply("ERROR AL EDITAR LA ALARMA " + resQuery.cause());
							}
						});
					} else {
						message.reply("ERROR AL EDITAR LA ALARMA: NO EXISTE UNA ALARMA CON ESE OID");
					}
				} else {
					message.reply("ERROR AL EDITAR LA PLACA " + res.cause());
				}
			});
		});
	}

	/*
	 * *********************************************
	 * 
	 * 
	 * LLAMADAS
	 * 
	 * 
	 *********************************************/

	// Obtiene todas las llamdas de la BBDD
	private void obtenerLlamadas() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerLlamadas");

		consumer.handler(message -> {
			Query<RowSet<Row>> query = mySqlClient.query("SELECT * FROM chairtrackerdb.llamadas;");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						LlamadaImpl llamada = new LlamadaImpl();
						llamada.setOid_llamada(v.getShort("oid_llamada"));
						llamada.setEstado((String) v.getValue("estado"));
						llamada.setDesde((String) v.getValue("desde"));
						llamada.setDescripcion((String) v.getValue("descripcion"));
						llamada.setRemitente_hash_mac_fk((String) v.getValue("remitente_hash_mac_fk"));
						llamada.setDestinatario_hash_mac_fk((String) v.getValue("destinatario_hash_mac_fk"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_llamada")), v.toJson());
					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene las llamadas recibidas por un usuario dado su hash_mac
	private void obtenerLlamadasRecibidasUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerLlamadasRecibidasUsuario");

		consumer.handler(message -> {
			JsonObject jsonEditLlamada = new JsonObject(message.body());
			String destinatario_hash_mac_fk = jsonEditLlamada.getString("destinatario_hash_mac_fk");

			Query<RowSet<Row>> query = mySqlClient
					.query("SELECT * FROM chairtrackerdb.llamadas WHERE destinatario_hash_mac_fk = '"
							+ destinatario_hash_mac_fk + "' ORDER BY oid_llamada DESC;");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						LlamadaImpl llamada = new LlamadaImpl();
						llamada.setOid_llamada(v.getShort("oid_llamada"));
						llamada.setEstado((String) v.getValue("estado"));
						llamada.setDesde((String) v.getValue("desde"));
						llamada.setDescripcion((String) v.getValue("descripcion"));
						llamada.setRemitente_hash_mac_fk((String) v.getValue("remitente_hash_mac_fk"));
						llamada.setDestinatario_hash_mac_fk((String) v.getValue("destinatario_hash_mac_fk"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_llamada")), v.toJson());
					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene las llamadas enviadas por un usuario dado su hash_mac
	private void obtenerLlamadasEnviadasUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerLlamadasEnviadasUsuario");

		consumer.handler(message -> {
			JsonObject jsonEditLlamada = new JsonObject(message.body());
			String remitente_hash_mac_fk = jsonEditLlamada.getString("remitente_hash_mac_fk");

			Query<RowSet<Row>> query = mySqlClient
					.query("SELECT * FROM chairtrackerdb.llamadas WHERE remitente_hash_mac_fk = '" + remitente_hash_mac_fk
							+ "' ORDER BY oid_llamada DESC;");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						LlamadaImpl llamada = new LlamadaImpl();
						llamada.setOid_llamada(v.getShort("oid_llamada"));
						llamada.setEstado((String) v.getValue("estado"));
						llamada.setDesde((String) v.getValue("desde"));
						llamada.setDescripcion((String) v.getValue("descripcion"));
						llamada.setRemitente_hash_mac_fk((String) v.getValue("remitente_hash_mac_fk"));
						llamada.setDestinatario_hash_mac_fk((String) v.getValue("destinatario_hash_mac_fk"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_llamada")), v.toJson());
					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Anade una llamada a la BBDD
	private void anadirLlamada() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("anadirLlamada");

		consumer.handler(message -> {
			JsonObject jsonNewLlamada = new JsonObject(message.body());
			LlamadaImpl newLlamada = new LlamadaImpl();

			newLlamada.setEstado(jsonNewLlamada.getString("estado"));
			newLlamada.setDesde(jsonNewLlamada.getString("desde"));
			newLlamada.setDescripcion(jsonNewLlamada.getString("descripcion"));
			newLlamada.setRemitente_hash_mac_fk(jsonNewLlamada.getString("remitente_hash_mac_fk"));
			newLlamada.setDestinatario_hash_mac_fk(jsonNewLlamada.getString("destinatario_hash_mac_fk"));

			Query<RowSet<Row>> query = mySqlClient.query(
					"INSERT INTO chairtrackerdb.llamadas(estado, desde, descripcion, remitente_hash_mac_fk, destinatario_hash_mac_fk) "
							+ "VALUES ('" + newLlamada.getEstado() + "','" + newLlamada.getDesde() + "','"
							+ newLlamada.getDescripcion() + "','" + newLlamada.getRemitente_hash_mac_fk() + "','"
							+ newLlamada.getDestinatario_hash_mac_fk() + "');");

			query.execute(res -> {
				if (res.succeeded()) {
					message.reply(jsonNewLlamada);
				} else {
					message.reply("ERROR AL A?ADIR LA LLAMADA " + res.cause());
				}
				;
			});
		});
	}

	// edita una llamada dado su oid
	private void editarLlamada() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("editarLlamada");

		consumer.handler(message -> {
			JsonObject jsonEditLlamada = new JsonObject(message.body());
			String oid_llamada = jsonEditLlamada.getString("oid_llamada");
			LlamadaImpl editLlamada = new LlamadaImpl();

			editLlamada.setOid_llamada(Short.valueOf(jsonEditLlamada.getString("oid_llamada")));
			editLlamada.setEstado(jsonEditLlamada.getString("estado"));
			editLlamada.setDesde(jsonEditLlamada.getString("desde"));
			editLlamada.setDescripcion(jsonEditLlamada.getString("descripcion"));
			editLlamada.setRemitente_hash_mac_fk(jsonEditLlamada.getString("remitente_hash_mac_fk"));
			editLlamada.setDestinatario_hash_mac_fk(jsonEditLlamada.getString("destinatario_hash_mac_fk"));

			Query<RowSet<Row>> queryCount = mySqlClient.query(
					"SELECT COUNT(*) AS cuenta FROM chairtrackerdb.llamadas WHERE oid_llamada = '" + oid_llamada + "';");

			queryCount.execute(res -> {
				if (res.succeeded()) {

					Row rowCount = res.result().iterator().next();

					if (rowCount.getInteger("cuenta") > 0) {

						Query<RowSet<Row>> query = mySqlClient.query(
								"UPDATE chairtrackerdb.llamadas SET " + "oid_llamada = '" + editLlamada.getOid_llamada()
										+ "', estado = '" + editLlamada.getEstado() + "', desde = '"
										+ editLlamada.getDesde() + "', descripcion = '" + editLlamada.getDescripcion()
										+ "', remitente_hash_mac_fk = '" + editLlamada.getRemitente_hash_mac_fk()
										+ "', destinatario_hash_mac_fk = '" + editLlamada.getDestinatario_hash_mac_fk()
										+ "' WHERE oid_llamada = '" + oid_llamada + "';");

						query.execute(resQuery -> {
							if (resQuery.succeeded()) {
								message.reply("Editada la llamada con ID: " + editLlamada.getOid_llamada());

							} else {
								message.reply("ERROR AL EDITAR LA LLAMADA " + resQuery.cause());
							}
						});
					} else {
						message.reply("ERROR AL EDITAR LA LLAMADA: NO EXISTE UNA LLAMADA CON ESE OID");
					}
				} else {
					message.reply("ERROR AL EDITAR LA LLAMADA " + res.cause());
				}
			});
		});
	}

	/*
	 * *********************************************
	 * 
	 * 
	 * REGISTROS
	 * 
	 * 
	 *********************************************/

	// Obtiene todos los registros, tanto llamadas como alarmas, de la BBDD
	private void obtenerRegistros() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerRegistros");

		consumer.handler(message -> {
			Query<RowSet<Row>> query = mySqlClient.query("SELECT * FROM chairtrackerdb.registros;");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						RegistroImpl registro = new RegistroImpl();
						registro.setOid_reg(v.getShort("oid_reg"));
						registro.setTipo(v.getString("tipo"));
						registro.setFecha(UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("fecha"))));
						registro.setTrabajo(v.getShort("trabajo"));
						registro.setDescanso(v.getShort("descanso"));
						registro.setOid_llamada_fk(v.getShort("oid_llamada_fk"));
						registro.setOid_alarma_fk(v.getShort("oid_alarma_fk"));
						registro.sethash_mac_fk(v.getString("hash_mac_fk"));
						registro.setRemitente_hash_mac_fk(v.getString("remitente_hash_mac_fk"));
						registro.setRemitente_nombre(v.getString("remitente_nombre"));
						registro.setDestinatario_hash_mac_fk(v.getString("destinatario_hash_mac_fk"));
						registro.setDestinatario_nombre(v.getString("destinatario_nombre"));
						registro.setDesde(v.getString("desde"));
						registro.setDescripcion(v.getString("descripcion"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_reg")), v.toJson());

					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene todos los registros de tipo llamada de la BBDD
	private void obtenerRegistrosLlamadas() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerRegistrosLlamadas");

		consumer.handler(message -> {

			Query<RowSet<Row>> query = mySqlClient.query("SELECT * FROM chairtrackerdb.registros WHERE tipo = 'L';");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						RegistroImpl registro = new RegistroImpl();
						registro.setOid_reg(v.getShort("oid_reg"));
						registro.setTipo(v.getString("tipo"));
						registro.setFecha(UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("fecha"))));
						registro.setTrabajo(v.getShort("trabajo"));
						registro.setDescanso(v.getShort("descanso"));
						registro.setOid_llamada_fk(v.getShort("oid_llamada_fk"));
						registro.setOid_alarma_fk(v.getShort("oid_alarma_fk"));
						registro.sethash_mac_fk(v.getString("hash_mac_fk"));
						registro.setRemitente_hash_mac_fk(v.getString("remitente_hash_mac_fk"));
						registro.setRemitente_nombre(v.getString("remitente_nombre"));
						registro.setDestinatario_hash_mac_fk(v.getString("destinatario_hash_mac_fk"));
						registro.setDestinatario_nombre(v.getString("destinatario_nombre"));
						registro.setDesde(v.getString("desde"));
						registro.setDescripcion(v.getString("descripcion"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_reg")), v.toJson());

					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene todos los registros de tipo llamada de la BBDD
	private void obtenerRegistrosAlarmas() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerRegistrosAlarmas");

		consumer.handler(message -> {

			Query<RowSet<Row>> query = mySqlClient.query("SELECT * FROM chairtrackerdb.registros WHERE tipo = 'A';");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						RegistroImpl registro = new RegistroImpl();
						registro.setOid_reg(v.getShort("oid_reg"));
						registro.setTipo(v.getString("tipo"));
						registro.setFecha(UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("fecha"))));
						registro.setTrabajo(v.getShort("trabajo"));
						registro.setDescanso(v.getShort("descanso"));
						registro.setOid_llamada_fk(v.getShort("oid_llamada_fk"));
						registro.setOid_alarma_fk(v.getShort("oid_alarma_fk"));
						registro.sethash_mac_fk(v.getString("hash_mac_fk"));
						registro.setRemitente_hash_mac_fk(v.getString("remitente_hash_mac_fk"));
						registro.setRemitente_nombre(v.getString("remitente_nombre"));
						registro.setDestinatario_hash_mac_fk(v.getString("destinatario_hash_mac_fk"));
						registro.setDestinatario_nombre(v.getString("destinatario_nombre"));
						registro.setDesde(v.getString("desde"));
						registro.setDescripcion(v.getString("descripcion"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_reg")), v.toJson());

					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene el registro de las alarmas asociadas a un usuario dado su hash_mac
	private void obtenerRegistrosAlarmasUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerRegistrosAlarmasUsuario");

		consumer.handler(message -> {
			JsonObject jsonEditLlamada = new JsonObject(message.body());
			String hash_mac_fk = jsonEditLlamada.getString("hash_mac_fk");

			Query<RowSet<Row>> query = mySqlClient
					.query("SELECT * FROM chairtrackerdb.registros WHERE hash_mac_fk =" + " '" + hash_mac_fk + "';");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						RegistroImpl registro = new RegistroImpl();
						registro.setOid_reg(v.getShort("oid_reg"));
						registro.setTipo(v.getString("tipo"));
						registro.setFecha(UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("fecha"))));
						registro.setTrabajo(v.getShort("trabajo"));
						registro.setDescanso(v.getShort("descanso"));
						registro.setOid_llamada_fk(v.getShort("oid_llamada_fk"));
						registro.setOid_alarma_fk(v.getShort("oid_alarma_fk"));
						registro.sethash_mac_fk(v.getString("hash_mac_fk"));
						registro.setRemitente_hash_mac_fk(v.getString("remitente_hash_mac_fk"));
						registro.setRemitente_nombre(v.getString("remitente_nombre"));
						registro.setDestinatario_hash_mac_fk(v.getString("destinatario_hash_mac_fk"));
						registro.setDestinatario_nombre(v.getString("destinatario_nombre"));
						registro.setDesde(v.getString("desde"));
						registro.setDescripcion(v.getString("descripcion"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_reg")), v.toJson());

					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene el registro de las alarmas de un mes y anyo asociadas a un usuario
	// dado su hash_mac
	private void obtenerRegistrosAlarmasUsuarioAnyo() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerRegistrosAlarmasUsuarioAnyo");

		consumer.handler(message -> {
			JsonObject jsonEditLlamada = new JsonObject(message.body());
			String hash_mac_fk = jsonEditLlamada.getString("hash_mac_fk");
			String anyo = jsonEditLlamada.getString("anyo");

			Query<RowSet<Row>> query = mySqlClient.query("SELECT * FROM chairtrackerdb.registros WHERE hash_mac_fk = '"
					+ hash_mac_fk + "' AND YEAR(fecha) = " + anyo + ";");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						RegistroImpl registro = new RegistroImpl();
						registro.setOid_reg(v.getShort("oid_reg"));
						registro.setTipo(v.getString("tipo"));
						registro.setFecha(UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("fecha"))));
						registro.setTrabajo(v.getShort("trabajo"));
						registro.setDescanso(v.getShort("descanso"));
						registro.setOid_llamada_fk(v.getShort("oid_llamada_fk"));
						registro.setOid_alarma_fk(v.getShort("oid_alarma_fk"));
						registro.sethash_mac_fk(v.getString("hash_mac_fk"));
						registro.setRemitente_hash_mac_fk(v.getString("remitente_hash_mac_fk"));
						registro.setRemitente_nombre(v.getString("remitente_nombre"));
						registro.setDestinatario_hash_mac_fk(v.getString("destinatario_hash_mac_fk"));
						registro.setDestinatario_nombre(v.getString("destinatario_nombre"));
						registro.setDesde(v.getString("desde"));
						registro.setDescripcion(v.getString("descripcion"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_reg")), v.toJson());

					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene el registro de llamadas enviadas por un usuario dado su hash_mac
	private void obtenerRegistrosLlamadasEnviadas() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerRegistrosLlamadasEnviadas");

		consumer.handler(message -> {
			JsonObject jsonEditLlamada = new JsonObject(message.body());
			String remitente_hash_mac_fk = jsonEditLlamada.getString("remitente_hash_mac_fk");

			Query<RowSet<Row>> query = mySqlClient
					.query("SELECT * FROM chairtrackerdb.registros WHERE remitente_hash_mac_fk =" + " '"
							+ remitente_hash_mac_fk + "' ORDER BY oid_llamada_fk DESC;");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						RegistroImpl registro = new RegistroImpl();
						registro.setOid_reg(v.getShort("oid_reg"));
						registro.setTipo(v.getString("tipo"));
						registro.setFecha(UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("fecha"))));
						registro.setTrabajo(v.getShort("trabajo"));
						registro.setDescanso(v.getShort("descanso"));
						registro.setOid_llamada_fk(v.getShort("oid_llamada_fk"));
						registro.setOid_alarma_fk(v.getShort("oid_alarma_fk"));
						registro.sethash_mac_fk(v.getString("hash_mac_fk"));
						registro.setRemitente_hash_mac_fk(v.getString("remitente_hash_mac_fk"));
						registro.setRemitente_nombre(v.getString("remitente_nombre"));
						registro.setDestinatario_hash_mac_fk(v.getString("destinatario_hash_mac_fk"));
						registro.setDestinatario_nombre(v.getString("destinatario_nombre"));
						registro.setDesde(v.getString("desde"));
						registro.setDescripcion(v.getString("descripcion"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_reg")), v.toJson());

					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}

	// Obtiene el registro de llamadas recibidas por un usuario dado su hash_mac
	private void obtenerRegistrosLlamadasRecibidas() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("obtenerRegistrosLlamadasRecibidas");

		consumer.handler(message -> {
			JsonObject jsonEditLlamada = new JsonObject(message.body());
			String destinatario_hash_mac_fk = jsonEditLlamada.getString("destinatario_hash_mac_fk");

			Query<RowSet<Row>> query = mySqlClient
					.query("SELECT * FROM chairtrackerdb.registros WHERE destinatario_hash_mac_fk =" + " '"
							+ destinatario_hash_mac_fk + "' ORDER BY oid_llamada_fk DESC;");

			query.execute(res -> {
				JsonObject json = new JsonObject();
				if (res.succeeded()) {

					res.result().forEach(v -> {
						RegistroImpl registro = new RegistroImpl();
						registro.setOid_reg(v.getShort("oid_reg"));
						registro.setTipo(v.getString("tipo"));
						registro.setFecha(UsuarioImpl.ParseaLocalDateTimeFromJson(String.valueOf(v.getValue("fecha"))));
						registro.setTrabajo(v.getShort("trabajo"));
						registro.setDescanso(v.getShort("descanso"));
						registro.setOid_llamada_fk(v.getShort("oid_llamada_fk"));
						registro.setOid_alarma_fk(v.getShort("oid_alarma_fk"));
						registro.sethash_mac_fk(v.getString("hash_mac_fk"));
						registro.setRemitente_hash_mac_fk(v.getString("remitente_hash_mac_fk"));
						registro.setRemitente_nombre(v.getString("remitente_nombre"));
						registro.setDestinatario_hash_mac_fk(v.getString("destinatario_hash_mac_fk"));
						registro.setDestinatario_nombre(v.getString("destinatario_nombre"));
						registro.setDesde(v.getString("desde"));
						registro.setDescripcion(v.getString("descripcion"));
						System.out.println(json);
						json.put(String.valueOf(v.getValue("oid_reg")), v.toJson());

					});
				} else {
					json.put(String.valueOf("ERROR"), res.cause());
				}
				;
				message.reply(json);
			});
		});
	}
}