#include <Arduino.h>
#include <PubSubClient.h>
#include <Ethernet.h>
#include <ESP8266WiFi.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#include <NewPing.h>
#include "request.h"
#include "Hash.h"
#include "alarma.h"

//Sensor proximidad
#define TRIGGER_PIN D1
#define ECHO_PIN D2
#define MAX_DISTANCE 200 // Distancia máxima

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

//Declaracion de variables usadas
//const char* ssid = "Xiaomi_4A";
const char* ssid = "OP8"; 
//const char* ssid = "MiFibra-919C";
//const char* password = "oE25yJ9ms54Vd9222Z6B";
const char* password = "adda2020";
//const char* password = "9We7qZEF";
const char* ipServer = "localhost";
//const char* ipServer = "192.168.1.56";
//const char* ipServer = "192.168.1.44";
const int portHttp = 8084;
const int portMqtt = 1883;
const char* mqttUser = "root";
const char* mqttPassword = "root";

WiFiClient espClient;
IPAddress server(127, 0, 0, 1);
//IPAddress server(192, 168, 1, 56);
//IPAddress server(192, 168, 1, 44);
PubSubClient mqttClient(espClient);
HttpClient httpClient = HttpClient(espClient, ipServer, portHttp);

//Obtiene mac y realiza hash con algoritmo sha1 para mayor seguridad
String macEsp = WiFi.macAddress();
String hashMac = sha1(macEsp);

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (unsigned int i=0; i<length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  if(topic = "placa/llamadas"){
    //ENCENDER ALARMA POR LLAMADA
    Serial.println("Estan llamando");
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (mqttClient.connect("ESP8266Client", mqttUser, mqttPassword)) {
      Serial.println("connected");
      // ... and resubscribe
      mqttClient.subscribe("placa/llamadas");
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

//Gestion alarmas

String listaPuta[1024]; 
DynamicJsonDocument  respuestaAlarmas(1024), respuestaAlarmasDes(1024);


void setup() {
  
  Serial.begin(9600);
  //MQTT
  mqttClient.setServer(server, 1883);
  mqttClient.setCallback(callback);
  delay(100);
  //WIFI
  setup_wifi(ssid, password);
  Serial.print("Hash MAC: ");
  Serial.println(hashMac);


  String alarmasUsuario = obtenerAlarmasUsuario(httpClient, hashMac);

  deserializeJson(respuestaAlarmasDes, alarmasUsuario);

  JsonObject root = respuestaAlarmasDes.as<JsonObject>();
  byte i = 0;
  for ( JsonPair kv : root) {
    Serial.println(kv.key().c_str());
    Serial.println(kv.value().as<char*>());
    i += 1;

}






  //Configuracion vibrador
  //pinMode(pinAlarma, OUTPUT);
}

void loop(){

  //Pruebas API
  //testGet(httpClient);
  //testPost(httpClient, hashMac);
  //testGetParam(httpClient);
  //testPut(httpClient, hashMac);
  //testDelete(httpClient, hashMac);

  //testCompleto(httpClient, hashMac);

  //delay(8000);

  //Pruebas MQTT

  if (!mqttClient.connected()) {
    reconnect();
  }
  
  mqttClient.loop();

  //PRUEBAS SENSOR
  /*delay(500); // Esperar medio segundo entre mediciones
  // Muestra la distancia medida a la consola serial
  Serial.print("Ping: ");
  // Calcular la distancia con base en una constante
  //tiempo = sonar.ping_median();
  //distancia = tiempo * 10 / 292/ 2;
  Serial.print(sonar.ping_cm());
  Serial.println("cm.");*/

}

//------------------------------------------------------------------------------------------------------
//Metodos MQTT
