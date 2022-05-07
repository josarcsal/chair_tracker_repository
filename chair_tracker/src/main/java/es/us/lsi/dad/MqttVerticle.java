package es.us.lsi.dad;

import io.netty.handler.codec.mqtt.MqttQoS;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.eventbus.MessageConsumer;
import io.vertx.core.json.JsonObject;
import io.vertx.mqtt.MqttClient;
import io.vertx.mqtt.MqttClientOptions;

public class MqttVerticle extends AbstractVerticle {

	MqttClient mqttClient;
	MqttClientOptions options;

	public void start(Promise<Void> startFuture) {

		mqttClient = MqttClient.create(getVertx(), new MqttClientOptions().setAutoKeepAlive(true).setClientId("mqtt")
				.setUsername("root").setPassword("root"));
		mqttClient.connect(1883, "localhost", connection -> {
			if (connection.succeeded()) {
				System.out.println("Conectado cliente mqtt");

			} else {
				System.out.println("Se ha producido un error en la conexión al broker");
			}
		});

		actualizacionAlarmas();
		llamadaAUsuario();
		actualizacionRegistros();
	}

	private void llamadaAUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("llamadaAUsuario");

		consumer.handler(message -> {

			JsonObject json = new JsonObject(message.body());
			mqttClient.publish(json.getString("destinatario_hash_mac_fk") + "/llamadas/recibidas",
					Buffer.buffer("Llamada desde " + json.getString("remitente_hash_mac_fk")), MqttQoS.AT_LEAST_ONCE,
					false, false, publishHandler -> {
						if (publishHandler.succeeded()) {
							System.out.println("Message has been published");
						} else {
							System.out.println("Error while publishing message");
						}

					});
			
			mqttClient.publish(json.getString("remitente_hash_mac_fk") + "/llamadas/enviadas",
					Buffer.buffer("Llamada a " + json.getString("destinatario_hash_mac_fk")), MqttQoS.AT_LEAST_ONCE,
					false, false, publishHandler -> {
						if (publishHandler.succeeded()) {
							System.out.println("Message has been published");
						} else {
							System.out.println("Error while publishing message");
						}

					});
		});
	}

	private void actualizacionAlarmas() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("actualizacionAlarmas");

		consumer.handler(message -> {

			JsonObject json = new JsonObject(message.body());

			if (json.getString("hash_mac_fk") != "") {
				mqttClient.publish(json.getString("hash_mac_fk") + "/alarmas/refresh",
						Buffer.buffer("Alarmas han sido actualizadas"), MqttQoS.AT_LEAST_ONCE, false, false,
						publishHandler -> {
							if (publishHandler.succeeded()) {
								System.out.println("Message has been published");
							} else {
								System.out.println("Error while publishing message");
							}

						});
			}
		});
	}
	
	private void actualizacionRegistros() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("actualizacionRegistros");

		consumer.handler(message -> {

			JsonObject json = new JsonObject(message.body());

				mqttClient.publish(json.getString("hash_mac_fk") + "/registros/refresh",
						Buffer.buffer("Alarmas han sido actualizadas"), MqttQoS.AT_LEAST_ONCE, false, false,
						publishHandler -> {
							if (publishHandler.succeeded()) {
								System.out.println("Message has been published");
							} else {
								System.out.println("Error while publishing message");
							}

						});
			
		});
	}
}
