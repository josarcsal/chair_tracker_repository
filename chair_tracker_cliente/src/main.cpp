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

//Alarma y vibrador
#define ALARMA_PIN D5
#define VIBRADOR_PIN D0

//Funciones mqtt
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
int alarmaActiva = 0;
int distanciaAnterior = 50;
int levantado = 10;
int marcaTiempo1;
int marcaTiempo2;
int contadorLevantado;
int contadorSentado;
int ciclosTrabajo;
int ciclosDescanso;

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

  //Alarma y vibrador
  pinMode(ALARMA_PIN, OUTPUT);
  pinMode(VIBRADOR_PIN, OUTPUT);
}

void loop()
{
  timeClient.update();
  marcaTiempo1 = timeClient.getHours() * 3600 + timeClient.getMinutes() * 60 + timeClient.getSeconds();

  //MQTT
  if (!mqttClient.connected())
  {
    reconnect();
  }

  mqttClient.loop();

  delay(3000);

  //SENSOR
  int distanciaActual = sonar.ping_cm();

  //ALARMA
  int proximaT_inicio = StringToIntAlarma(proxima, "t_inicio");
  int proximaT_final = StringToIntAlarma(proxima, "t_final");
  int proximaT_trabajo = StringToIntAlarma(proxima, "t_trabajo");
  int proximaT_descanso = StringToIntAlarma(proxima, "t_descanso");
  int proximaOid = StringToIntAlarma(proxima, "oid_alarma");
  int proximaCiclosTrabajo = StringToIntAlarma(proxima, "ciclos_trabajo");
  int proximaCiclosDescanso = StringToIntAlarma(proxima, "ciclos_descanso");

  if (marcaTiempo1 >= proximaT_inicio && marcaTiempo1 <= proximaT_final)
  {
    alarmaActiva = 1;
    if (distanciaActual < 20 && distanciaAnterior > 80)
    {
      Serial.println("Me siento");
      levantado = 0;
    }

    if (distanciaAnterior < 20 && distanciaActual > 80)
    {
      Serial.println("Me levanto");
      levantado = 1;
    }

    distanciaAnterior = distanciaActual;

    marcaTiempo2 = timeClient.getHours() * 3600 + timeClient.getMinutes() * 60 + timeClient.getSeconds();

    if (levantado == 0)
    {
      contadorSentado += marcaTiempo2 - marcaTiempo1;
    }

    if (levantado == 1)
    {
      contadorLevantado += marcaTiempo2 - marcaTiempo1;
    }

    if (contadorSentado > (proximaT_trabajo * 60))
    {
      contadorSentado = 0;
      ciclosTrabajo += 1;
      Serial.println("Alarma sonando es tiempo de descansar");
      sonarAlarma(ALARMA_PIN);
    }

    if (contadorLevantado > (proximaT_descanso * 60))
    {
      contadorLevantado = 0;
      ciclosDescanso += 1;
      Serial.println("Alarma sonando es tiempo de trabajar");
      sonarAlarma(ALARMA_PIN);
    }
  }
  else
  {
    if (proxima != "No se ha encontrado alarma para el dia de hoy" && marcaTiempo1 > proximaT_final)
    {
      int ciclosTUpdate = proximaCiclosTrabajo + ciclosTrabajo;
      int ciclosDUpdate = proximaCiclosDescanso + ciclosDescanso;

      String t_inicioFormateado = timeFromClientToBBDD(getValue(proxima, '|', 0));
      String t_finFormateado = timeFromClientToBBDD(getValue(proxima, '|', 1));

      DynamicJsonDocument bodyPut(1024);
      String bodyPutData = "";
      bodyPut[String("oid_alarma")] = String(proximaOid);
      bodyPut[String("dias")] = String(getValue(proxima, '|', 2));
      bodyPut[String("t_inicio")] = String(t_inicioFormateado);
      bodyPut[String("t_fin")] = String(t_finFormateado);
      bodyPut[String("t_trabajo")] = String(proximaT_trabajo);
      bodyPut[String("t_descanso")] = String(proximaT_descanso);
      bodyPut[String("ciclo_trabajo")] = String(ciclosTUpdate);
      bodyPut[String("ciclo_descanso")] = String(ciclosDUpdate);
      bodyPut[String("hash_mac_fk")] = String(hashMac);

      serializeJson(bodyPut, bodyPutData);

      doRequest(httpClient, "PUT", "/api/alarmas/editarAlarma", bodyPutData);

      proxima = obtenerProximaAlarma(httpClient, timeClient, hashMac);
      Serial.println("Actualizada alarma siguiente");
      Serial.print("Nuevo inicio ");
      Serial.println(StringToIntAlarma(proxima, "t_inicio"));
      Serial.print("Nuevo final ");
      Serial.println(StringToIntAlarma(proxima, "t_final"));
    }

    distanciaAnterior = 50;
    levantado = 10;
    contadorLevantado = 0;
    contadorSentado = 0;
    ciclosTrabajo = 0;
    ciclosDescanso = 0;
    alarmaActiva = 0;
  }
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

  String topicCmp1 = hashMac + "/llamadas";
  String topicCmp2 = hashMac + "/alarmas/refresh";

  int topicLlamada = strcmp(topic, topicCmp1.c_str());
  int topicAlarma = strcmp(topic, topicCmp2.c_str());

  if (topicLlamada == 0)
  {
    //ENCENDER ALARMA POR LLAMADA
    Serial.println("Estan llamando");
    sonarVibrador(VIBRADOR_PIN);
  }

  if ((topicAlarma == 0) && (alarmaActiva == 0))
  {
    proxima = obtenerProximaAlarma(httpClient, timeClient, hashMac);
    Serial.print("Se han actualizado las alarmas y la proxima es ");
    Serial.println(proxima);
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
      String topic1 = hashMac + "/#";
      mqttClient.subscribe(topic1.c_str());
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
