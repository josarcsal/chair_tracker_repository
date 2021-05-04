package es.us.lsi.dad;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpServer;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;

public class HttpServerVerticle extends AbstractVerticle {

	private HttpServer httpServer = null;

	@Override
	public void start(Promise<Void> startFuture) {
		//Inicializacion
			//Verticle base de datos
		vertx.deployVerticle(new BBDDVerticle());

			//Router peticiones REST 
		Router router = Router.router(vertx);

		// USUARIO
		router.route("/api/usuarios/*").handler(BodyHandler.create());
		router.get("/api/usuarios").handler(this::obtenerUsuarios);
		router.post("/api/usuarios/anadirUsuario").handler(this::anadirUsuario);
		router.put("/api/usuarios/editarUsuario/:nif").handler(this::editarUsuario);
		router.delete("/api/usuarios/:nif").handler(this::borrarUsuario);

		// PLACA
		router.route("/api/placas/*").handler(BodyHandler.create());
		router.get("/api/placas").handler(this::obtenerPlacas);
		router.get("/api/placas/:nif_fk").handler(this::obtenerPlacasUsuario);
		router.post("/api/placas/anadirPlaca").handler(this::anadirPlaca);
		router.put("/api/placas/editarPlaca/:id_placa").handler(this::editarPlaca);
		router.delete("/api/placas/:id_placa").handler(this::borrarPlaca);

		// ALARMA
		router.route("/api/alarmas/*").handler(BodyHandler.create());
		router.get("/api/alarmas").handler(this::obtenerAlarmas);
		router.get("/api/alarmas/:nif_fk").handler(this::obtenerAlarmasUsuario);
		router.post("/api/alarmas/anadirAlarma").handler(this::anadirAlarma);
		router.put("/api/alarmas/editarAlarma/:oid_alarma").handler(this::editarAlarma);
		router.delete("/api/alarmas/:oid_alarma").handler(this::borrarAlarma);

		// LLAMADA
		router.route("/api/llamadas/*").handler(BodyHandler.create());
		router.get("/api/llamadas").handler(this::obtenerLlamadas);
		router.get("/api/llamadas/enviadas/:remitente_nif_fk").handler(this::obtenerLlamadasEnviadasUsuario);
		router.get("/api/llamadas/recibidas/:destinatario_nif_fk").handler(this::obtenerLlamadasRecibidasUsuario);
		router.post("/api/llamadas/anadirLlamada").handler(this::anadirLlamada);
		router.put("/api/llamadas/editarLlamada/:oid_llamada").handler(this::editarLlamada);
		
		//REGISTRO
		router.route("/api/registros/*").handler(BodyHandler.create());
		router.get("/api/registros/").handler(this::obtenerRegistros);
		router.get("/api/registros/llamadas").handler(this::obtenerRegistrosLlamadas);
		router.get("/api/registros/alarmas").handler(this::obtenerRegistrosAlarmas);
		router.get("/api/registros/alarmas/:nif_fk").handler(this::obtenerRegistrosAlarmasUsuario);
		router.get("/api/registros/llamadas/enviadas/:remitente_nif_fk").handler(this::obtenerRegistrosLlamadasEnviadas);
		router.get("/api/registros/llamadas/recibidas/:destinatario_nif_fk").handler(this::obtenerRegistrosLlamadasRecibidas);
		
			//Server HTTP
		httpServer = vertx.createHttpServer();
		httpServer.requestHandler(router::handle).listen(8084, res -> {
			System.out.println("Conectado");
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
		//Peticion al bus de eventos para comunicarnos con el verticle BBDD, devolvemos respuesta en consecuencia
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

	private void borrarUsuario(RoutingContext routingContext) {
		String nif = routingContext.request().getParam("nif");
		vertx.eventBus().request("borrarUsuario", nif, reply -> {
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
		//Añadimos un usuario con los datos del body de la peticion
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
		String nif = routingContext.request().getParam("nif");
		//json de los datos a modificar del usuario
		JsonObject json = routingContext.getBodyAsJson();
		//Añadir el nif que identifica al usuario para su modificacion
		json.put("nif", nif);
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
	 * PLACAS
	 * 
	 * 
	 **********************************************/

	private void obtenerPlacas(RoutingContext routingContext) {
		vertx.eventBus().request("obtenerPlacas", "obtenerPlacas", reply -> {
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
	
	private void obtenerPlacasUsuario(RoutingContext routingContext) {
		String nif_fk = routingContext.request().getParam("nif_fk");
		JsonObject json = routingContext.getBodyAsJson();
		json.put("nif_fk", nif_fk);
		vertx.eventBus().request("obtenerPlacasUsuario", json.toString(), reply -> {
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

	private void borrarPlaca(RoutingContext routingContext) {
		String oid_placa = routingContext.request().getParam("oid_placa");
		vertx.eventBus().request("borrarPlaca", oid_placa, reply -> {
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

	private void anadirPlaca(RoutingContext routingContext) {
		vertx.eventBus().request("anadirPlaca", routingContext.getBodyAsString(), reply -> {
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

	private void editarPlaca(RoutingContext routingContext) {
		String oid_placa = routingContext.request().getParam("id_placa");
		System.out.println(oid_placa);
		JsonObject json = routingContext.getBodyAsJson();
		json.put("oid_placa", oid_placa);
		vertx.eventBus().request("editarPlaca", json.toString(), reply -> {
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
		String nif_fk = routingContext.request().getParam("nif_fk");
		JsonObject json = routingContext.getBodyAsJson();
		json.put("nif_fk", nif_fk);
		vertx.eventBus().request("obtenerAlarmasUsuario", json.toString(), reply -> {
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
		String oid_alarma = routingContext.request().getParam("oid_alarma");
		vertx.eventBus().request("borrarAlarma", oid_alarma, reply -> {
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

	private void anadirAlarma(RoutingContext routingContext) {
		vertx.eventBus().request("anadirAlarma", routingContext.getBodyAsString(), reply -> {
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

	private void editarAlarma(RoutingContext routingContext) {
		String oid_alarma = routingContext.request().getParam("oid_alarma");
		System.out.println(oid_alarma);
		JsonObject json = routingContext.getBodyAsJson();
		json.put("oid_alarma", oid_alarma);
		vertx.eventBus().request("editarAlarma", json.toString(), reply -> {
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
		String destinatario_nif_fk = routingContext.request().getParam("destinatario_nif_fk");
		JsonObject json = routingContext.getBodyAsJson();
		json.put("destinatario_nif_fk", destinatario_nif_fk);
		vertx.eventBus().request("obtenerLlamadasRecibidasUsuario", json.toString(), reply -> {
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
		String remitente_nif_fk = routingContext.request().getParam("remitente_nif_fk");
		JsonObject json = routingContext.getBodyAsJson();
		json.put("remitente_nif_fk", remitente_nif_fk);
		vertx.eventBus().request("obtenerLlamadasEnviadasUsuario", json.toString(), reply -> {
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
		String oid_llamada = routingContext.request().getParam("oid_llamada");
		JsonObject json = routingContext.getBodyAsJson();
		json.put("oid_llamada", oid_llamada);
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
		String nif_fk = routingContext.request().getParam("nif_fk");
		JsonObject json = routingContext.getBodyAsJson();
		json.put("nif_fk", nif_fk);
		vertx.eventBus().request("obtenerRegistrosAlarmasUsuario", json.toString(), reply -> {
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
		String remitente_nif_fk = routingContext.request().getParam("remitente_nif_fk");
		JsonObject json = routingContext.getBodyAsJson();
		json.put("remitente_nif_fk", remitente_nif_fk);
		vertx.eventBus().request("obtenerRegistrosLlamadasEnviadas", json.toString(), reply -> {
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
		String destinatario_nif_fk = routingContext.request().getParam("destinatario_nif_fk");
		JsonObject json = routingContext.getBodyAsJson();
		json.put("destinatario_nif_fk", destinatario_nif_fk);
		vertx.eventBus().request("obtenerRegistrosLlamadasRecibidas", json.toString(), reply -> {
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
