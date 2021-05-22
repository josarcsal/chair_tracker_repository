String formateaHoras(String str);
String obtenerListaHoras(HttpClient httpClient, String hashMac);
String obtenerProximaAlarma(HttpClient httpClient, NTPClient timeClient, String hashMac);
int obtenerAviso(String alarmaActual, int levantado, int marcaDeTiempo1, NTPClient timeClient);
