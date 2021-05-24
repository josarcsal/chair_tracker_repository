String formateaHoras(String str);
String obtenerListaHoras(HttpClient httpClient, String hashMac);
String obtenerProximaAlarma(HttpClient httpClient, NTPClient timeClient, String hashMac);
int obtenerAviso(String alarmaActual, int levantado, int marcaDeTiempo1, NTPClient timeClient);
String getValue(String data, char separator, int index);
int StringToIntAlarma(String alarma, String valor);
String timeFromClientToBBDD(String hora);
void sonarAlarma(uint8_t ALARMA_PIN);
void sonarVibrador(uint8_t VIBRADOR_PIN);
