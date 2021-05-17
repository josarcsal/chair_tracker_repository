package es.us.lsi.dad;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import io.netty.handler.codec.mqtt.MqttQoS;
import io.netty.handler.ssl.ClientAuth;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.buffer.Buffer;
import io.vertx.mqtt.MqttClient;

public class MqttVerticle extends AbstractVerticle {

	MqttClient client = MqttClient.create(vertx);

	public void start(Promise<Void> startFuture) {


		client.connect(1883, "192.168.1.56", s -> {
			client.disconnect();
		});
		
		client.publishHandler(s -> {
			  System.out.println("There are new message in topic: " + s.topicName());
			  System.out.println("Content(as string) of the message: " + s.payload().toString());
			  System.out.println("QoS: " + s.qosLevel());
			})
			  .subscribe("$SYS/broker/publish/bytes/", 2);
		
		client.publish("bytes",
				  Buffer.buffer("Desde vertx"),
				  MqttQoS.AT_LEAST_ONCE,
				  false,
				  false);
		
		client.publish("temperature",
				  Buffer.buffer("Desde vertx"),
				  MqttQoS.AT_LEAST_ONCE,
				  false,
				  false);


	}
	
}
