package es.us.lsi.dad;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import io.netty.handler.codec.mqtt.MqttQoS;
import io.netty.handler.ssl.ClientAuth;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.buffer.Buffer;
import io.vertx.mqtt.MqttClient;
import io.vertx.mqtt.MqttClientOptions;
import io.vertx.mysqlclient.MySQLConnectOptions;
import io.vertx.mysqlclient.MySQLPool;
import io.vertx.sqlclient.PoolOptions;

public class MqttVerticle extends AbstractVerticle {

	MqttClient mqttClient;
	MqttClientOptions options;
	
	public void start(Promise<Void> startFuture) {

		options = new MqttClientOptions();
		options.setUsername("root");
		options.setPassword("root");
		options.setClientId("Vertx client");
		
		mqttClient = MqttClient.create(vertx, options);

		mqttClient.connect(1883, "192.168.1.56", res -> {
			 if (res.succeeded()) {
				    System.out.println("Conectado a mqtt server");
				    startFuture.complete();
				   } else {
				    System.out.println("Failed to connect to a server");
				    System.out.println(res.cause());
					startFuture.fail(res.cause());
				   }
			 //mqttClient.disconnect();
		});
		
		mqttClient.publish("temperature",
				  Buffer.buffer("hello"),
				  MqttQoS.AT_LEAST_ONCE,
				  false,
				  false);
		


		
	}
	
}
