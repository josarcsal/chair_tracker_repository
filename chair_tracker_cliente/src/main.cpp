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
NTPClient timeClient(ntpUDP, "europe.pool.ntp.org", -7200);

//Sensor proximidad
#define TRIGGER_PIN D1
#define ECHO_PIN D2
#define MAX_DISTANCE 200 // Distancia máxima

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

//Alarma y vibrador
#define ALARMA_PIN D5
#define VIBRADOR_PIN D0

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
  //Alarma y vibrador
  pinMode(ALARMA_PIN, OUTPUT);
  pinMode(VIBRADOR_PIN, OUTPUT);
}

int distanciaAnterior = 50;
int levantado = 10;
int marcaTiempo1;
int marcaTiempo2;
int contadorLevantado;
int contadorSentado;
int ciclosTrabajo;
int ciclosDescanso;

void loop()
{
  //Pruebas VIBRADOR
  digitalWrite(VIBRADOR_PIN, HIGH);
  delay(2000);
  digitalWrite(VIBRADOR_PIN, LOW);

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
  int proximaCiclosTrabajo = StringToIntAlarma(proxima, "ciclos_trabajo");
  int proximaCiclosDescanso = StringToIntAlarma(proxima, "ciclos_descanso");

  if (proxima != "No se ha encontrado alarma para el dia de hoy")
  {
    Serial.println("Hola he entrrado");

    Serial.print("marcaTiempo1 ");
    Serial.println(marcaTiempo1);

    Serial.print("proximaT_inicio ");
    Serial.println(proximaT_inicio);

    Serial.print("proximaT_final ");
    Serial.println(proximaT_final);

    if (marcaTiempo1 >= proximaT_inicio && marcaTiempo1 <= proximaT_final)
    {
      Serial.println("Hola he entrrado 2 tus muertos manuel");

      if (distanciaActual < 20 && distanciaAnterior > 80)
      {
        Serial.println("Me sente");
        levantado = 0;
      }

      if (distanciaAnterior < 20 && distanciaActual > 80)
      {
        Serial.println("Me levante");
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

      if (contadorSentado > 30) //(proximaT_trabajo * 60))
      {
        contadorSentado = 0;
        ciclosTrabajo += 1;
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

        /*int ciclosTUpdate = proximaCiclosTrabajo + 1;
        int ciclosDUpdate = proximaCiclosDescanso + 1;

        int HourI = 0;
        int MinuteI = 0;
        int SecondI = 0;
        int HourF = 0;
        int MinuteF = 0;
        int SecondF = 0;

        Serial.print("t_inicioSin ");
        Serial.println(getValue(proxima, '|', 0));

        Serial.print("t_finSin ");
        Serial.println(getValue(proxima, '|', 1));



        DynamicJsonDocument bodyPut(1024);
        String bodyPutData = "";
        bodyPut[String("oid_alarma")] = String(proximaOid);
        bodyPut[String("dias")] = String(getValue(proxima, '|', 2));
        bodyPut[String("t_inicio")] = String("PT23H30M30S");
        bodyPut[String("t_fin")] = String("P23H50M30S");
        bodyPut[String("t_trabajo")] = String(proximaT_trabajo);
        bodyPut[String("t_descanso")] = String(proximaT_descanso);
        bodyPut[String("ciclo_trabajo")] = String(88);
        bodyPut[String("ciclo_descanso")] = String(88);
        bodyPut[String("hash_mac_fk")] = String(hashMac);

        serializeJson(bodyPut, bodyPutData);

        doRequest(httpClient, "PUT", "/api/alarmas/editarAlarma", bodyPutData);*/
      }

      if (contadorLevantado > 10) //(proximaT_descanso * 60)
      {
        contadorLevantado = 0;
        ciclosDescanso += 1;
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

        /*int ciclosTUpdate = proximaCiclosTrabajo + 1;
        int ciclosDUpdate = proximaCiclosDescanso + 1;

        Serial.print("ciclosTUpdate ");
        Serial.println(ciclosTUpdate);

        Serial.print("ciclosDUpdate ");
        Serial.println(ciclosDUpdate);



        Serial.print("t_inicioSin ");
        Serial.println(getValue(proxima, '|', 0));

        Serial.print("t_finSin ");
        Serial.println(getValue(proxima, '|', 1));

        String t_inicioFormateado = timeFromClientToBBDD(getValue(proxima, '|', 0));
        String t_finFormateado = timeFromClientToBBDD(getValue(proxima, '|', 1));

        Serial.print("t_inicioFormateado ");
        Serial.println(t_inicioFormateado);

        Serial.print("t_FinFormateado ");
        Serial.println(t_finFormateado);

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

        doRequest(httpClient, "PUT", "/api/alarmas/editarAlarma", bodyPutData);*/
      }

      Serial.print("contadorSentado ");
      Serial.println(contadorSentado);
      Serial.print("contadorLevantado ");
      Serial.println(contadorLevantado);
    }
    else
    {

      int ciclosTUpdate = ciclosTrabajo + proximaCiclosTrabajo + 1;
      int ciclosDUpdate = ciclosDescanso + proximaCiclosDescanso + 1;

      Serial.print("ciclosTUpdate ");
      Serial.println(ciclosTUpdate);

      Serial.print("ciclosDUpdate ");
      Serial.println(ciclosDUpdate);

      Serial.print("t_inicioSin ");
      Serial.println(getValue(proxima, '|', 0));

      Serial.print("t_finSin ");
      Serial.println(getValue(proxima, '|', 1));

      String t_inicioFormateado = timeFromClientToBBDD(getValue(proxima, '|', 0));
      String t_finFormateado = timeFromClientToBBDD(getValue(proxima, '|', 1));

      Serial.print("t_inicioFormateado ");
      Serial.println(t_inicioFormateado);

      Serial.print("t_FinFormateado ");
      Serial.println(t_finFormateado);

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

      distanciaAnterior = 50;
      levantado = 10;
      contadorLevantado = 0;
      contadorSentado = 0;
      ciclosTrabajo = 0;
      ciclosDescanso = 0;
    }
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
