#include <Arduino.h>
#include <PubSubClient.h>
#include <Ethernet.h>
#include <ESP8266WiFi.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#include "request.h"

const char* ssid = "Xiaomi_4A";
const char* password = "oE25yJ9ms54Vd9222Z6B";
const char* ipServer = "192.168.1.56";
const int portHttp = 8084;
const int portMqtt = 1883;
String placaId = "";

WiFiClient espWifiClient;
IPAddress server(192, 168, 1, 56);
PubSubClient mqttClient(espWifiClient);
HttpClient httpClient = HttpClient(espWifiClient, server, portHttp);

void setup() {
  Serial.begin(9600);
  Serial.println("connect to WiFi network");
  WiFi.begin(ssid, password);
}

void loop(){
  testGet(httpClient);
  testGetParam(httpClient);
  testPost(httpClient);
  testPut(httpClient);
  testDelete(httpClient);
  delay(8000);
}