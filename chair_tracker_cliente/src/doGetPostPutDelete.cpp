//GET
String doGet(HttpClient httpClient, const char* uri, String bodyData){
  DynamicJsonDocument body(1024), res(1024);
  //doc[String("id_pastillero")] = "192R5T";
  String resData = "";
  //serializeJson(doc, bodyData);
  Serial.println(bodyData);
  Serial.println("making GET request");
  httpClient.beginRequest();
  httpClient.get(uri);
  httpClient.sendHeader("Content-Type", "application/json");
  httpClient.sendHeader("Content-Length", bodyData.length());
  httpClient.sendHeader("X-Custom-Header", "custom-header-value");
  httpClient.beginBody();
  httpClient.print(bodyData);
  httpClient.endRequest();

  // read the status code and body of the response
  int statusCode = httpClient.responseStatusCode();
  String response = httpClient.responseBody();

  Serial.print("GET Status code: ");
  Serial.println(statusCode);
  Serial.print("GET Response: ");
  Serial.println(response);
    res[String("statusCode")] = statusCode;
    res[String("response")] = response;
    serializeJson(res, resData);
    return resData;
}