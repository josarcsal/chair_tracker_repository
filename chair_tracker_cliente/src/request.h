#include <Arduino.h>
#include <ArduinoJson.h>
#include <ArduinoHttpClient.h>
#include <ESP8266WiFi.h>

void setup_wifi(String ssid, String password);
String doRequest(HttpClient httpClient, String tipo, const char* uri, String bodyData);

String obtenerAlarmasUsuario(HttpClient httpClient, String hash_mac);

//TESTS
/*void testGet(HttpClient httpClient);
void testGetParam(HttpClient httpClient);
void testPost(HttpClient httpClient, String mac);
void testPut(HttpClient httpClient, String mac);
void testDelete(HttpClient httpClient, String mac);
void testCompleto(HttpClient httpClient, String mac);*/
