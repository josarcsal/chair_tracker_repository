package es.us.lsi.dad;

import io.vertx.core.Vertx;

public class Main {

	public static void main(String[] args) {
		Vertx vertx = Vertx.vertx();
		// Inicia el v�rtice encargado de recibir las peticiones HTTP (HTTP Server)
		vertx.deployVerticle(new HttpServerVerticle());
	}

}
