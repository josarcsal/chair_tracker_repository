#include <Arduino.h>
#include <ArduinoJson.h>
#include <ArduinoHttpClient.h>

//GET
void doRequest(HttpClient httpClient, String tipo, const char* uri, String bodyData){
  //conversion uri
  String uriString = uri;

  Serial.println("--------------Realizando " + tipo + " " + uriString + "------------------------");
  
  Serial.println("cuerpo de la peticion");
  Serial.println(bodyData);

  //comienzo de request
  httpClient.beginRequest();

  //Realiza la peticion segun el tipo indicado por parametro
  if(tipo == "GET"){
    httpClient.get(uri);
  }

  if(tipo == "POST"){
    httpClient.post(uri);
  }

  if(tipo == "PUT"){
    httpClient.put(uri);
  }

  if(tipo == "DELETE"){
    httpClient.del(uri);
  }

  //indicar tipo json
  httpClient.sendHeader("Content-Type", "application/json");
  httpClient.sendHeader("Content-Length", bodyData.length());
  httpClient.sendHeader("X-Custom-Header", "custom-header-value");
  httpClient.beginBody();
  httpClient.print(bodyData);
  httpClient.endRequest();

  //estado y cuerpo de la respuesta
  int statusCode = httpClient.responseStatusCode();
  String response = httpClient.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);
  Serial.println("-----------------------------------------------------------------------------");
  Serial.println();
}

//TESTS

void testGet(HttpClient httpClient){
    //Prueba de GET basico
  DynamicJsonDocument bodyGetNull(1024);
  String bodyGetNullData = "";
  serializeJson(bodyGetNull, bodyGetNullData);
  doRequest(httpClient, "GET", "/api/usuarios/", bodyGetNullData);
}

void testGetParam(HttpClient httpClient){
  //Prueba de GET con parametro en body
  DynamicJsonDocument bodyGet(1024);
  String bodyGetData = "";
  bodyGet[String("remitente_hash_mac_fk")] = String("mac123");
  serializeJson(bodyGet, bodyGetData);
  doRequest(httpClient, "GET", "/api/registros/llamadas/enviadas/hash_mac", bodyGetData);
}

void testPost(HttpClient httpClient, String mac){
    //Prueba de POST con parametro en body
  DynamicJsonDocument bodyPost(1024);
  String bodyPostData = "";
  bodyPost[String("hash_mac")] = String(mac);
  bodyPost[String("nif")] = String("10163961P");
  bodyPost[String("contrasena")] = String("post");
  bodyPost[String("nombre")] = String("prueba desde cliente");
  bodyPost[String("rol")] = String("J");
  serializeJson(bodyPost, bodyPostData);
  doRequest(httpClient, "POST", "/api/usuarios/anadirUsuario", bodyPostData);
}

void testPut(HttpClient httpClient, String mac){
    //Prueba de PUT con parametro en body
  DynamicJsonDocument bodyPut(1024);
  String bodyPutData = "";
  bodyPut[String("hash_mac")] = String(mac);
  bodyPut[String("contrasena")] = String("mod desde cliente");
  bodyPut[String("last_login")] = String("2021-05-15T19:19:28");
  bodyPut[String("nombre")] = String("prueba desde esp");
  bodyPut[String("apellidos")] = String("null");
  bodyPut[String("rol")] = String("J");
  bodyPut[String("nif_jefe")] = String("null");
  serializeJson(bodyPut, bodyPutData);
  doRequest(httpClient, "PUT", "/api/usuarios/editarUsuario", bodyPutData);
}

void testDelete(HttpClient httpClient, String mac){
  //Prueba DELETE con parametro en body
  DynamicJsonDocument bodyDelete(1024);
  String bodyDeleteData = "";
  bodyDelete[String("hash_mac")] = String(mac);
  serializeJson(bodyDelete, bodyDeleteData);
  doRequest(httpClient, "DELETE", "/api/usuarios/borrarUsuario", bodyDeleteData);
  
}

void testCompleto(HttpClient httpClient, String mac){
  testGet(httpClient);
  testGetParam(httpClient);
  testPost(httpClient, mac);
  testPut(httpClient, mac);
  testDelete(httpClient, mac);
}
