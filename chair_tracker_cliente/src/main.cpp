#include <Arduino.h>
#include <PubSubClient.h>
#include <Ethernet.h>
#include <ESP8266WiFi.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#include <NewPing.h>
#include <ListLib.h>
#include <NTPClient.h>
#include "WiFiUdp.h"
#include <TimeLib.h>

#include "request.h"
#include "Hash.h"
#include "alarma.h"

//Obtener hora
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "europe.pool.ntp.org", 7200);

//Sensor proximidad
#define TRIGGER_PIN D1
#define ECHO_PIN D2
#define MAX_DISTANCE 200 // Distancia máxima

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

//Alarma
#define ALARMA_PIN D5

//MQTT
void callback(char *topic, byte *payload, unsigned int length);
void reconnect();

//Declaracion de variables usadas
const char *ssid = "Xiaomi_4A";
//const char *ssid = "MiFibra-919C";
const char *password = "oE25yJ9ms54Vd9222Z6B";
//const char *password = "9We7qZEF";
const char *ipServer = "192.168.1.56";
//const char *ipServer = "192.168.1.44";
const int portHttp = 8084;
const int portMqtt = 1883;
const char *mqttUser = "root";
const char *mqttPassword = "root";

WiFiClient espClient;
IPAddress server(192, 168, 1, 56);
//IPAddress server(192, 168, 1, 44);
PubSubClient mqttClient(espClient);
HttpClient httpClient = HttpClient(espClient, ipServer, portHttp);

//Obtiene mac y realiza hash con algoritmo sha1 para mayor seguridad
String macEsp = WiFi.macAddress();
String hashMac = sha1(macEsp);

//Gestion alarmas
String proxima;

void setup()
{
  Serial.begin(9600);
  //MQTT
  mqttClient.setServer(server, 1883);
  mqttClient.setCallback(callback);
  delay(100);
  //WIFI
  setup_wifi(ssid, password);
  Serial.print("Hash MAC: ");
  Serial.println(hashMac);
  //TIEMPO
  timeClient.begin();
  String lista = obtenerListaHoras(httpClient, hashMac);
  Serial.println(lista);
  proxima = obtenerProximaAlarma(httpClient, timeClient, hashMac);
  Serial.print("La proxima alarma es ");
  Serial.println(proxima);
  //Alarma
  pinMode(ALARMA_PIN, OUTPUT);
}

int distanciaAnterior = 50;
int levantado = 10;
int marcaTiempo1;
int marcaTiempo2;
int contadorLevantado;
int contadorSentado;

void loop()
{
  timeClient.update();
  marcaTiempo1 = timeClient.getHours() * 3600 + timeClient.getMinutes() * 60 + timeClient.getSeconds();
  
  delay(3000);

  //PRUEBAS SENSOR
  // Muestra la distancia medida a la consola serial
  //Serial.print("Ping: ");
  int distanciaActual = sonar.ping_cm();
  //Serial.println(distanciaActual);

  //ALARMA
  int proximaT_finalBefore = StringToIntAlarma(proxima, "t_final");

    if (proximaT_finalBefore < marcaTiempo1)
  {
    proxima = obtenerProximaAlarma(httpClient, timeClient, hashMac);
    Serial.println("Actualizada alarma siguiente");
    Serial.print("Nuevo inicio");
    Serial.println(StringToIntAlarma(proxima, "t_inicio"));
    Serial.print("Nuevo final");
    Serial.println(StringToIntAlarma(proxima, "t_final"));
  }

  int proximaT_inicio = StringToIntAlarma(proxima, "t_inicio");
  int proximaT_final = StringToIntAlarma(proxima, "t_final");
  int proximaT_trabajo = StringToIntAlarma(proxima, "t_trabajo");
  int proximaT_descanso = StringToIntAlarma(proxima, "t_descanso");
  int proximaOid = StringToIntAlarma(proxima, "oid_alarma");
  int proximaCiclos = StringToIntAlarma(proxima, "ciclos");

if(marcaTiempo1 >= proximaT_inicio && marcaTiempo1 <= proximaT_final){
  if(distanciaActual < 20 && distanciaAnterior > 80){
    Serial.println("Me sente");
    levantado = 0;
  }

  if(distanciaAnterior < 20 && distanciaActual > 80){
    Serial.println("Me levante");
    levantado = 1;
  }

  distanciaAnterior = distanciaActual;

  marcaTiempo2 = timeClient.getHours() * 3600 + timeClient.getMinutes() * 60 + timeClient.getSeconds();

  if(levantado == 0){
    contadorSentado += marcaTiempo2 - marcaTiempo1;     
  }

    if(levantado == 1){
    contadorLevantado += marcaTiempo2 - marcaTiempo1; 
  }

  if(contadorSentado > 30){
  contadorSentado = 0;
  Serial.println("Sonando a descansar maricon");
  digitalWrite(ALARMA_PIN, HIGH);
  delay(500);
  digitalWrite(ALARMA_PIN, LOW);
  delay(500);
  digitalWrite(ALARMA_PIN, HIGH);
  delay(500);
  digitalWrite(ALARMA_PIN, LOW);
  delay(500);
  digitalWrite(ALARMA_PIN, HIGH);
  delay(500);
  digitalWrite(ALARMA_PIN, LOW);

}

if(contadorLevantado > 10){
  contadorLevantado = 0;
  Serial.println("Sonando a trabajar maricon");
  digitalWrite(ALARMA_PIN, HIGH);
  delay(500);
  digitalWrite(ALARMA_PIN, LOW);
  delay(500);
  digitalWrite(ALARMA_PIN, HIGH);
  delay(500);
  digitalWrite(ALARMA_PIN, LOW);
  delay(500);
  digitalWrite(ALARMA_PIN, HIGH);
  delay(500);
  digitalWrite(ALARMA_PIN, LOW);

}

Serial.print("contadorSentado ");
Serial.println(contadorSentado);
Serial.print("contadorLevantado ");
Serial.println(contadorLevantado);
} else {
  distanciaAnterior = 50;
  levantado = 10;
  marcaTiempo1 = 0;
  marcaTiempo2 = 0;
  contadorLevantado = 0;
  contadorSentado = 0;
}


  //Pruebas MQTT

  if (!mqttClient.connected())
  {
    reconnect();
  }

  mqttClient.loop();


  
}













//------------------------------------------------------------------------------------------------------
//Metodos MQTT
void callback(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (unsigned int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  if (topic = "placa/llamadas")
  {
    //ENCENDER ALARMA POR LLAMADA
    Serial.println("Estan llamando");
  }
}

void reconnect()
{
  // Loop until we're reconnected
  while (!mqttClient.connected())
  {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (mqttClient.connect("ESP8266Client", mqttUser, mqttPassword))
    {
      Serial.println("connected");
      // ... and resubscribe
      mqttClient.subscribe("placa/llamadas");
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
//Metodos alarma
