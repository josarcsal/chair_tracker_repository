#include <Arduino.h>
#include <RestClient.h>

RestClient client = RestClient("arduino-http-lib-test.herokuapp.com");

const char* ssid = "Xiaomi_4A";
const char* password = "oE25yJ9ms54Vd9222Z6B";
const int portHttp = 8083;
const int portMqtt = 1883;
const char* ipServer = "192.168.1.56";
String placaId = "";



//Setup
void setup() {
  Serial.begin(9600);
  Serial.println("connect to WiFi network");
  client.begin("ssid", "password");
  Serial.println("Setup!");
}

String response;
void loop(){
  response = "";
  int statusCode = client.get("http://192.168.1.56/api/usuarios", &response);
  Serial.print("Status code from server: ");
  Serial.println(statusCode);
  Serial.print("Response body from server: ");
  Serial.println(response);
  delay(1000);
}