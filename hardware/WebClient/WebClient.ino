/*
 * HTTP Client GET Request
 * Copyright (c) 2018, circuits4you.com
 * All rights reserved.
 * https://circuits4you.com 
 * Connects to WiFi HotSpot. */
 
#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
 
/* Set these to your desired credentials. */
const char *ssid = "HUAWEI P10 lite";  //ENTER YOUR WIFI SETTINGS
const char *password = "cifer1508";
 
//Web/Server address to read/write from 
const char *host = "192.168.122.1";   //https://circuits4you.com website or IP address of server
 
//=======================================================================
//                    Power on setup
//=======================================================================
 
void setup() {

  pinMode(D1, OUTPUT); 
  pinMode(D2, OUTPUT); 
  delay(1000);
  Serial.begin(115200);
  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
  delay(1000);
  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot
  
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");
 
  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP
}
 
//=======================================================================
//                    Main Program Loop
//=======================================================================
void loop() {
  HTTPClient http;    //Declare object of class HTTPClient
 
  String Link;
 
  //GET Data
  Link = "http://192.168.43.104:3000/checkTables";
  
  http.begin(Link);     //Specify request destination
  
  int httpCode = http.GET();            //Send the request
  String payload = http.getString();    //Get the response payload

  if(payload == "1"){
    digitalWrite(D1, HIGH);
    delay(3000);
    digitalWrite(D1, LOW);
  }

  if(payload == "2"){
    digitalWrite(D2, HIGH);
    delay(3000);
    digitalWrite(D2, LOW);
  }
 
  Serial.println(httpCode);   //Print HTTP return code
  Serial.println(payload);    //Print request response payload
 
  http.end();  //Close connection
  
  delay(8000);  //GET Data at every 5 seconds
}
