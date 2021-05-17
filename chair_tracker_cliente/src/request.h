#include <Arduino.h>
#include <ArduinoJson.h>
#include <ArduinoHttpClient.h>

void doRequest(HttpClient httpClient, String tipo, const char* uri, String bodyData);

//TESTS
void testGet(HttpClient httpClient);
void testGetParam(HttpClient httpClient);
void testPost(HttpClient httpClient);
void testPut(HttpClient httpClient);
void testDelete(HttpClient httpClient);
void testCompleto(HttpClient httpClient);
