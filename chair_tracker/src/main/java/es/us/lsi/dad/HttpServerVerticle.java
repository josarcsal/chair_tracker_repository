package es.us.lsi.dad;

import java.util.List;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.MultiMap;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;

public class HttpServerVerticle extends AbstractVerticle {

	private HttpServer httpServer = null;

	@Override
	public void start(Promise<Void> startFuture) {
		// Inicializacion
		// Verticle base de datos
		vertx.deployVerticle(new BBDDVerticle());
		// Verticle MQTT Client
		vertx.deployVerticle(new MqttVerticle());

		// Router peticiones REST
		Router router = Router.router(vertx);

		// USUARIO
		router.route("/api/usuarios/*").handler(BodyHandler.create());
		router.get("/api/usuarios").handler(this::obtenerUsuarios);
		router.get("/api/usuarios/contactos").handler(this::obtenerContactos);
		router.get("/api/usuarios/existeUsuario").handler(this::existeUsuario);
		router.post("/api/usuarios/anadirUsuario").handler(this::anadirUsuario);
		router.put("/api/usuarios/editarUsuario").handler(this::editarUsuario);
		router.delete("/api/usuarios/borrarUsuario").handler(this::borrarUsuario);

		// ALARMA
		router.route("/api/alarmas/*").handler(BodyHandler.create());
		router.get("/api/alarmas").handler(this::obtenerAlarmas);
		router.get("/api/alarmas/hash_mac").handler(this::obtenerAlarmasUsuario);
		router.post("/api/alarmas/anadirAlarma").handler(this::anadirAlarma);
		router.put("/api/alarmas/editarAlarma").handler(this::editarAlarma);
		router.delete("/api/alarmas/borrarAlarma").handler(this::borrarAlarma);

		// LLAMADA
		router.route("/api/llamadas/*").handler(BodyHandler.create());
		router.get("/api/llamadas").handler(this::obtenerLlamadas);
		router.get("/api/llamadas/enviadas/hash_mac").handler(this::obtenerLlamadasEnviadasUsuario);
		router.get("/api/llamadas/recibidas/hash_mac").handler(this::obtenerLlamadasRecibidasUsuario);
		router.post("/api/llamadas/anadirLlamada").handler(this::anadirLlamada);
		router.put("/api/llamadas/editarLlamada").handler(this::editarLlamada);

		// REGISTRO
		router.route("/api/registros/*").handler(BodyHandler.create());
		router.get("/api/registros").handler(this::obtenerRegistros);
		router.get("/api/registros/llamadas").handler(this::obtenerRegistrosLlamadas);
		router.get("/api/registros/alarmas").handler(this::obtenerRegistrosAlarmas);
		router.get("/api/registros/alarmas/hash_mac").handler(this::obtenerRegistrosAlarmasUsuario);
		router.get("/api/registros/alarmas/hash_macAnyo").handler(this::obtenerRegistrosAlarmasUsuarioAnyo);	
		router.get("/api/registros/llamadas/enviadas/hash_mac").handler(this::obtenerRegistrosLlamadasEnviadas);
		router.get("/api/registros/llamadas/recibidas/hash_mac").handler(this::obtenerRegistrosLlamadasRecibidas);

		// Server HTTP
		httpServer = vertx.createHttpServer();
		httpServer.requestHandler(router::handle).listen(8084, res -> {
			System.out.println("Conectado servidor http");
			if (res.succeeded()) {
				startFuture.complete();
			} else {
				startFuture.fail(res.cause());
			}
		});
	}

	/*
	 * *********************************************
	 * 
	 * 
	 * USUARIOS
	 * 
	 * 
	 **********************************************/

	private void obtenerUsuarios(RoutingContext routingContext) {
		// Peticion al bus de eventos para comunicarnos con el verticle BBDD, devolvemos
		// respuesta en consecuencia
		vertx.eventBus().request("obtenerUsuarios", "obtenerUsuarios", reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}
	
	private void obtenerContactos(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		HttpServerRequest request = routingContext.request();
		MultiMap params = request.params();
		List<String> hashMac = params.getAll("hash_mac");
		boolean isHashMacEmpty = hashMac.isEmpty();
		JsonObject jsonRes = new JsonObject();
		
		if (json != null && isHashMacEmpty) {
			jsonRes = json;
		} else {
			jsonRes.put("hash_mac", hashMac.get(0));
		}

		vertx.eventBus().request("obtenerContactos", jsonRes.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}
	
	
	private void existeUsuario(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		HttpServerRequest request = routingContext.request();
		MultiMap params = request.params();
		List<String> nif = params.getAll("nif");
		boolean isNifEmpty = nif.isEmpty();
		List<String> contrasena = params.getAll("contrasena");
		boolean isContrasenaEmpty = contrasena.isEmpty();
		JsonObject jsonRes = new JsonObject();
		
		if (json != null && isNifEmpty && isContrasenaEmpty) {
			jsonRes = json;
		} else {
			jsonRes.put("nif", nif.get(0));
			jsonRes.put("contrasena", contrasena.get(0));
		}

		vertx.eventBus().request("existeUsuario", jsonRes.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void borrarUsuario(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		vertx.eventBus().request("borrarUsuario", json.getString("hash_mac"), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void anadirUsuario(RoutingContext routingContext) {
		// A�adimos un usuario con los datos del body de la peticion
		vertx.eventBus().request("anadirUsuario", routingContext.getBodyAsString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void editarUsuario(RoutingContext routingContext) {
		// json de los datos a modificar del usuario
		JsonObject json = routingContext.getBodyAsJson();
		json.put("hash_mac", json.getString("hash_mac"));
		System.out.println(json.toString());
		// A�adir el hash_mac que identifica al usuario para su modificacion
		vertx.eventBus().request("editarUsuario", json.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	/*
	 * *********************************************
	 * 
	 * 
	 * ALARMAS
	 * 
	 * 
	 **********************************************/

	private void obtenerAlarmas(RoutingContext routingContext) {
		vertx.eventBus().request("obtenerAlarmas", "obtenerAlarmas", reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void obtenerAlarmasUsuario(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		HttpServerRequest request = routingContext.request();
		MultiMap params = request.params();
		List<String> param = params.getAll("hash_mac_fk");
		boolean isParamEmpty = param.isEmpty();
		JsonObject jsonRes = new JsonObject();
		
		if (json != null && isParamEmpty) {
			jsonRes = json;
			jsonRes.put("hash_mac_fk", jsonRes.getString("hash_mac_fk"));

		} else {
			jsonRes.put("hash_mac_fk", param.get(0));
		}
		
		vertx.eventBus().request("obtenerAlarmasUsuario", jsonRes.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void borrarAlarma(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		vertx.eventBus().request("borrarAlarma", json.getString("oid_alarma"), reply -> {
			if (reply.succeeded()) {
				vertx.eventBus().request("actualizacionAlarmas", routingContext.getBodyAsString());

				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void anadirAlarma(RoutingContext routingContext) {
		vertx.eventBus().request("anadirAlarma", routingContext.getBodyAsString(), reply -> {
			if (reply.succeeded()) {
				vertx.eventBus().request("actualizacionAlarmas", routingContext.getBodyAsString());

				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void editarAlarma(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		json.put("oid_alarma", json.getString("oid_alarma"));
		vertx.eventBus().request("editarAlarma", json.toString(), reply -> {
			if (reply.succeeded()) {
				vertx.eventBus().request("actualizacionAlarmas", routingContext.getBodyAsString());

				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	/*
	 * *********************************************
	 * 
	 * 
	 * LLAMADAS
	 * 
	 * 
	 **********************************************/

	private void obtenerLlamadas(RoutingContext routingContext) {
		vertx.eventBus().request("obtenerLlamadas", "obtenerLlamadas", reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void obtenerLlamadasRecibidasUsuario(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		HttpServerRequest request = routingContext.request();
		MultiMap params = request.params();
		List<String> param = params.getAll("destinatario_hash_mac_fk");
		boolean isParamEmpty = param.isEmpty();
		JsonObject jsonRes = new JsonObject();
		
		if (json != null && isParamEmpty) {
			jsonRes = json;
			jsonRes.put("destinatario_hash_mac_fk", jsonRes.getString("destinatario_hash_mac_fk"));

		} else {
			jsonRes.put("destinatario_hash_mac_fk", param.get(0));
		}
		
		vertx.eventBus().request("obtenerLlamadasRecibidasUsuario", jsonRes.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void obtenerLlamadasEnviadasUsuario(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		HttpServerRequest request = routingContext.request();
		MultiMap params = request.params();
		List<String> param = params.getAll("remitente_hash_mac_fk");
		boolean isParamEmpty = param.isEmpty();
		JsonObject jsonRes = new JsonObject();
		
		if (json != null && isParamEmpty) {
			jsonRes = json;
			jsonRes.put("remitente_hash_mac_fk", jsonRes.getString("remitente_hash_mac_fk"));

		} else {
			jsonRes.put("remitente_hash_mac_fk", param.get(0));
		}
		
		vertx.eventBus().request("obtenerLlamadasEnviadasUsuario", jsonRes.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void anadirLlamada(RoutingContext routingContext) {
		vertx.eventBus().request("anadirLlamada", routingContext.getBodyAsString(), reply -> {
			if (reply.succeeded()) {

				vertx.eventBus().request("llamadaAUsuario", routingContext.getBodyAsString());

				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void editarLlamada(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		json.put("oid_llamada", json.getString("oid_llamada"));
		vertx.eventBus().request("editarLlamada", json.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	/*
	 * *********************************************
	 * 
	 * 
	 * REGISTROS
	 * 
	 * 
	 **********************************************/

	private void obtenerRegistros(RoutingContext routingContext) {
		vertx.eventBus().request("obtenerRegistros", "obtenerRegistrosCompleto", reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void obtenerRegistrosLlamadas(RoutingContext routingContext) {
		vertx.eventBus().request("obtenerRegistrosLlamadas", "obtenerRegistrosLlamadas", reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void obtenerRegistrosAlarmas(RoutingContext routingContext) {
		vertx.eventBus().request("obtenerRegistrosAlarmas", "obtenerRegistrosAlarmas", reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void obtenerRegistrosAlarmasUsuario(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		HttpServerRequest request = routingContext.request();
		MultiMap params = request.params();
		List<String> param = params.getAll("hash_mac_fk");
		boolean isParamEmpty = param.isEmpty();
		JsonObject jsonRes = new JsonObject();
		
		if (json != null && isParamEmpty) {
			jsonRes = json;
			jsonRes.put("hash_mac_fk", jsonRes.getString("hash_mac_fk"));

		} else {
			jsonRes.put("hash_mac_fk", param.get(0));
		}
		
		vertx.eventBus().request("obtenerRegistrosAlarmasUsuario", jsonRes.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}
	
	private void obtenerRegistrosAlarmasUsuarioAnyo(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		HttpServerRequest request = routingContext.request();
		MultiMap params = request.params();
		List<String> hashMac = params.getAll("hash_mac_fk");
		boolean isHashMacEmpty = hashMac.isEmpty();
		List<String> anyo = params.getAll("anyo");
		boolean isAnyoEmpty = anyo.isEmpty();
		JsonObject jsonRes = new JsonObject();
		
		if (json != null && isHashMacEmpty && isAnyoEmpty) {
			jsonRes = json;
		} else {
			jsonRes.put("hash_mac_fk", hashMac.get(0));
			jsonRes.put("anyo", anyo.get(0));
		}

		vertx.eventBus().request("obtenerRegistrosAlarmasUsuarioAnyo", jsonRes.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void obtenerRegistrosLlamadasEnviadas(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		HttpServerRequest request = routingContext.request();
		MultiMap params = request.params();
		List<String> param = params.getAll("remitente_hash_mac_fk");
		boolean isParamEmpty = param.isEmpty();
		JsonObject jsonRes = new JsonObject();
		
		if (json != null && isParamEmpty) {
			jsonRes = json;
			jsonRes.put("remitente_hash_mac_fk", jsonRes.getString("remitente_hash_mac_fk"));

		} else {
			jsonRes.put("remitente_hash_mac_fk", param.get(0));
		}
		
		vertx.eventBus().request("obtenerRegistrosLlamadasEnviadas", jsonRes.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	private void obtenerRegistrosLlamadasRecibidas(RoutingContext routingContext) {
		JsonObject json = routingContext.getBodyAsJson();
		HttpServerRequest request = routingContext.request();
		MultiMap params = request.params();
		List<String> param = params.getAll("destinatario_hash_mac_fk");
		boolean isParamEmpty = param.isEmpty();
		JsonObject jsonRes = new JsonObject();
		
		if (json != null && isParamEmpty) {
			jsonRes = json;
			jsonRes.put("destinatario_hash_mac_fk", jsonRes.getString("destinatario_hash_mac_fk"));

		} else {
			jsonRes.put("destinatario_hash_mac_fk", param.get(0));
		}
		
		vertx.eventBus().request("obtenerRegistrosLlamadasRecibidas", jsonRes.toString(), reply -> {
			if (reply.succeeded()) {
				System.out.println(reply.result().body());
				routingContext.response().setStatusCode(200).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			} else {
				routingContext.response().setStatusCode(500).putHeader("content-type", "application/json")
						.end(String.valueOf(reply.result().body()));
			}
		});
	}

	@Override
	public void stop(Promise<Void> startFuture) {
		httpServer.close();
	}

}
