#include <Arduino.h>
#include <PubSubClient.h>
#include <Ethernet.h>
#include <ESP8266WiFi.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#include "request.h"
#include "Hash.h"
//#include "mqtt.h"

//Cabecera funciones MQTT, se encuentran al final del main
void callback(char* topic, byte* payload, unsigned int length);
void reconnect();

//Declaracion de variables usadas
const char* ssid = "Xiaomi_4A";
const char* password = "oE25yJ9ms54Vd9222Z6B";
const char* ipServer = "192.168.1.56";
const int portHttp = 8084;
const int portMqtt = 1883;
const char* mqttUser = "root";
const char* mqttPassword = "root";

WiFiClient espClient;
IPAddress server(192, 168, 1, 56);
PubSubClient mqttClient(espClient);
HttpClient httpClient = HttpClient(espClient, server, portHttp);

//Obtiene mac y realiza hash con algoritmo sha1 para mayor seguridad
String macEsp = WiFi.macAddress();
String hashMac = sha1(macEsp);

void setup() {
  
  Serial.begin(9600);
  setup_wifi(ssid, password);
  mqttClient.setServer(server, 1883);
  mqttClient.setCallback(callback);
  delay(100);
}

void loop(){

  //testGet(httpClient);
  //testGetParam(httpClient);
  //testPost(httpClient, hashMac);
  //testPut(httpClient, hashMac);
  //testDelete(httpClient, hashMac);

  //testCompleto(httpClient, hashMac);

  //delay(8000);

  /*Serial.println(macEsp);
  Serial.println(hashMac);
  delay(8000);*/

  if (!mqttClient.connected()) {
    reconnect();
  }
  
  mqttClient.loop();

  mqttClient.publish("loop","loop");

}

//------------------------------------------------------------------------------------------------------
//Metodos MQTT
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (unsigned int i=0; i<length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (mqttClient.connect("ESP8266Client", mqttUser, mqttPassword)) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      mqttClient.publish("outTopic","hello world");
      // ... and resubscribe
      mqttClient.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}