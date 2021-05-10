#include <Arduino.h>
#include <PubSubClient.h>
#include <Ethernet.h>
#include <ESP8266WiFi.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>

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



void restTest(){
  DynamicJsonDocument bodyGet(1024);
  String bodyGetData = "", bodyPostData = "", bodyPutData = "", bodyDeleteData = "";
 //bodyGet[String("id_pastillero")] = "192R5T";
  serializeJson(bodyGet, bodyGetData);

  Serial.println("making GET request");
  httpClient.beginRequest();
  httpClient.get("/api/usuarios/");
  httpClient.sendHeader("Content-Type", "application/json");
  httpClient.beginBody();
  httpClient.print(bodyGetData);
  httpClient.endRequest();

  // read the status code and body of the response
  int statusCode = httpClient.responseStatusCode();
  String response = httpClient.responseBody();

  Serial.print("GET Status code: ");
  Serial.println(statusCode);
  Serial.print("GET Response: ");
  Serial.println(response);


}

void setup() {
  Serial.begin(9600);
  Serial.println("connect to WiFi network");
  WiFi.begin(ssid, password);
}

String response;
void loop(){

  /*response = "";
  int statusCode = client.get("/api/usuarios", &response);
  Serial.print("Status code from server: ");
  Serial.println(statusCode);
  Serial.print("Response body from server: ");
  Serial.println(response);
  delay(10000);*/

  //doGet(client, "/api/usuarios");
  //doGet(client, "/api/placas");
  restTest();

}