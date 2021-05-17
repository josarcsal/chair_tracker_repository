#include <Arduino.h>
#include <ArduinoJson.h>
#include <ArduinoHttpClient.h>

void doRequest(HttpClient httpClient, String tipo, const char* uri, String bodyData);

//TESTS
void testGet(HttpClient httpClient);
void testGetParam(HttpClient httpClient);
void testPost(HttpClient httpClient, String mac);
void testPut(HttpClient httpClient, String mac);
void testDelete(HttpClient httpClient, String mac);
void testCompleto(HttpClient httpClient, String mac);
