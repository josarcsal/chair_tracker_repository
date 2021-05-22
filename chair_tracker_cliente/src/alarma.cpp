#include <Arduino.h>
#include <ArduinoJson.h>
#include <ListLib.h>
#include "request.h"
#include <NTPClient.h>

char daysOfTheWeek[7][12] = {"D", "L", "M", "X", "J", "V", "S"};

String formateaHoras(String str)
{
  char horaFormateada[10];
  int Year = 0;
  int Month = 0;
  int Day = 0;
  int Hour = 0;
  int Minute = 0;
  int Second = 0;
  sscanf(str.c_str(), "PT%dH%dM%dS", &Hour, &Minute, &Second);
  sprintf(horaFormateada, "%d:%d:%d", Hour, Minute, Second);
  return horaFormateada;
}

String obtenerListaHoras(HttpClient httpClient, String hashMac)
{

  DynamicJsonDocument respuestaAlarmasDes(1024);

  String alarmasUsuario = obtenerAlarmasUsuario(httpClient, hashMac);

  deserializeJson(respuestaAlarmasDes, alarmasUsuario);

  JsonObject root = respuestaAlarmasDes.as<JsonObject>();

  String res = "";

  for (JsonPair kv : root)
  {
    String dias = root.getMember(kv.key()).getMember("dias");
    String aux = formateaHoras(root.getMember(kv.key()).getMember("t_inicio")) + "|" + formateaHoras(root.getMember(kv.key()).getMember("t_fin")) + "|" + dias;
    //Serial.print("aux con clave ");
    //Serial.println(kv.key().c_str());
    //Serial.print(" con valor ");
    //Serial.println(aux);

    res = res + "," + aux;
  }
  res = res.substring(1, res.length());
  //res = res + " hola que pasa estoy mirando el numero maximo de caracteres";
  return res;
}

String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length() - 1;

  for (int i = 0; i <= maxIndex && found <= index; i++)
  {
    if (data.charAt(i) == separator || i == maxIndex)
    {
      found++;
      strIndex[0] = strIndex[1] + 1;
      strIndex[1] = (i == maxIndex) ? i + 1 : i;
    }
  }

  return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

String obtenerProximaAlarma(HttpClient httpClient, NTPClient timeClient, String hashMac)
{
  timeClient.update();
  String listaHoras = obtenerListaHoras(httpClient, hashMac);
  int maxIndex = listaHoras.length() - 1;
  String res = "No se ha encontrado alarma para el dia de hoy";
  int tiempoActualS = timeClient.getHours() * 3600 + timeClient.getMinutes() * 60 + timeClient.getSeconds();
  int mejorDiferencia = -86400; //Diferencia maxima
  //int exiteSiguiente = 0;

  char *diaActual = daysOfTheWeek[timeClient.getDay()];
  //Serial.print("diaActual en   ");
  //Serial.println(diaActual);

  //Serial.print("tiempoActual en  s ");
  //Serial.println(tiempoActualS);

  char *diaCheck;

  for (int j = 0; j <= (maxIndex / 5); j++)
  {
    String horaAux = getValue(listaHoras, ',', j);
    if (horaAux != "")
    {
      String tiempoInicioAlarmaAux = getValue(horaAux, '|', 0);
      String diaAlarmaAux = getValue(horaAux, '|', 2);
      String tiempoInicioAlarmaAuxHString = getValue(tiempoInicioAlarmaAux, ':', 0);
      String tiempoInicioAlarmaAuxMString = getValue(tiempoInicioAlarmaAux, ':', 1);
      String tiempoInicioAlarmaAuxSString = getValue(tiempoInicioAlarmaAux, ':', 2);

      int tiempoInicioAlarmaAuxInt = tiempoInicioAlarmaAuxHString.toInt() * 3600 + tiempoInicioAlarmaAuxMString.toInt() * 60 + tiempoInicioAlarmaAuxSString.toInt();
      int ActualMenosAlarma = tiempoActualS - tiempoInicioAlarmaAuxInt;

      diaCheck = strstr(diaAlarmaAux.c_str(), diaActual); //Comprueba que el dia se encuentre en los dias programados de la alarma
                                                          //Si la cadena de dias contiene el char del dia de hoy, debemos comprobar si hay alarma para hoy

      if (diaCheck)
      {
        if (ActualMenosAlarma < 0)
        { //significa que exite una hora siguiente y nos quedamos con la mas cercana(menor diferencia), tienen prioridad a las anteriores en el ciclo
          //exiteSiguiente = 1;
          if (ActualMenosAlarma > mejorDiferencia)
          {
            mejorDiferencia = ActualMenosAlarma;
            res = horaAux;
          }
        }
        /*if(ActualMenosAlarma > 0){ //significa que no hay hora siguiente sino solo anterior, entonces, la mas cercana sera la de mayor diferencia
                    if(exiteSiguiente = 0){
                        if(ActualMenosAlarma > mejorDiferencia){
                            Serial.println("Entra ActualMenosAlarma > mejorDiferencia");
                            mejorDiferencia = ActualMenosAlarma;
                            res = horaAux;
                        }
                    }   
                }*/
      }
    }
  }
  return res;
}