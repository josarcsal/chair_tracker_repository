#include <Arduino.h>
#include <PubSubClient.h>

void setup_wifi(String ssid, String password);
void callback(char* topic, byte* payload, unsigned int length);
void reconnect(PubSubClient client);