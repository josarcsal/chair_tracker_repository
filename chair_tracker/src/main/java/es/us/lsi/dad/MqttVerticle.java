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
				
				mqttClient.publishHandler(s -> {
					  System.out.println("There are new message in topic: " + s.topicName());
					  System.out.println("Content(as string) of the message: " + s.payload().toString());
					  System.out.println("QoS: " + s.qosLevel());
					  
					  vertx.eventBus().request("editarAlarma", s.payload().toString());
					  
					})
					  .subscribe("alarmas/update/#", 2);
				
				/*
				 * mqttClient.subscribe("topic_1", MqttQoS.AT_LEAST_ONCE.value(), handler -> {
				 * if (handler.succeeded()) {
				 * System.out.println("Client has been subscribed to topic_1"); } });
				 * 
				 * mqttClient.subscribe("father/topic_2", MqttQoS.AT_LEAST_ONCE.value(), handler
				 * -> { if (handler.succeeded()) {
				 * System.out.println("Client has been subscribed to topic_2"); } });
				 * 
				 * mqttClient.subscribe("nuevo_topic", MqttQoS.AT_LEAST_ONCE.value(), handler ->
				 * { if (handler.succeeded()) {
				 * System.out.println("Client has been subscribed to nuevo_topic"); } });
				 * 
				 * mqttClient.publishHandler(message -> {
				 * System.out.println("Message published on topic: " + message.topicName());
				 * System.out.println(message.payload().toString()); });
				 * 
				 * mqttClient.publish("father/topic_2", Buffer.buffer("hola desde vertx"),
				 * MqttQoS.AT_LEAST_ONCE, false, false, publishHandler -> { if
				 * (publishHandler.succeeded()) {
				 * System.out.println("Message has been published"); } else {
				 * System.out.println("Error while publishing message"); } });
				 */
			} else {
				System.out.println("Se ha producido un error en la conexión al broker");
			}
		});

		llamadaAUsuario();
		actualizacionAlarmas();
	}

	private void llamadaAUsuario() {
		MessageConsumer<String> consumer = vertx.eventBus().consumer("llamadaAUsuario");

		consumer.handler(message -> {
			
			/*mqttClient.publishHandler(messageMqtt -> {
				System.out.println("Message published on topic: " + messageMqtt.topicName());
				System.out.println(messageMqtt.payload().toString());
			});*/
			
			JsonObject json = new JsonObject(message.body());
			mqttClient.publish("placa/llamadas", Buffer.buffer("Llamando a " +json.getString("destinatario_hash_mac_fk")), MqttQoS.AT_LEAST_ONCE, false, false,
					publishHandler -> {
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
			
			/*mqttClient.publishHandler(messageMqtt -> {
				System.out.println("Message published on topic: " + messageMqtt.topicName());
				System.out.println(messageMqtt.payload().toString());
			});*/
			
			mqttClient.publish("alarmas/refresh", Buffer.buffer("Alarmas han sido actualizadas"), MqttQoS.AT_LEAST_ONCE, false, false,
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
