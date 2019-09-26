/*
 * RFID-125
 * (c) 2017, Agis Wichert
 */
#include <SoftwareSerial.h>

#define RED_LED 4
#define BLUE_LED 7
#define GREEN_LED 5

int red_light_pin1 = 13;
int green_light_pin1 = 12;
int blue_light_pin1 = 11;
int red_light_pin2 = 10;
int green_light_pin2 = 9;
int blue_light_pin2 = 8;
int colors[7][3] = {{255, 0, 0},{0, 255, 0},{0, 0, 255},{0, 255, 255},{255, 0, 255},{255, 255, 0},{255, 255, 255}};
int index = 0;

int brightness = 255;

int gBright = 0;
int rBright = 0;
int bBright = 0;

int fadeSpeed = 10;

// RFID  | Nano
// Pin 1 | D2
// Pin 2 | D3
SoftwareSerial Rfid = SoftwareSerial(0,1);

String code = "";
String table1 = "24856484852665453575366513";
String table2 = "24856484852665056675165563";
String table3 = "24856484852665056575070573";
bool stopRead = true;
bool turnOnLeft = false;
bool turnOnRight = false;
String currentTable = "";

void setup() {pinMode(GREEN_LED, OUTPUT);
   pinMode(RED_LED, OUTPUT);
   pinMode(BLUE_LED, OUTPUT);
   pinMode(red_light_pin1, OUTPUT);
   pinMode(green_light_pin1, OUTPUT);
   pinMode(blue_light_pin1, OUTPUT);
   pinMode(red_light_pin2, OUTPUT);
   pinMode(green_light_pin2, OUTPUT);
   pinMode(blue_light_pin2, OUTPUT);

   pinMode(12, INPUT);
   pinMode(13, INPUT);
  
  // Serial Monitor to see results on the computer
  Serial.begin(9600);
  // Communication to the RFID reader
  Rfid.begin(9600);
}

void TurnOnB() {
  digitalWrite(7, HIGH);
//  for (int i = 0; i < 256; i++) {
//       analogWrite(BLUE_LED, bBright);
//       bBright += 1;
//       delay(fadeSpeed);
//   }
}

void TurnOnG() {
  digitalWrite(5, HIGH);
//  for (int i = 0; i < 256; i++) {
//       analogWrite(GREEN_LED, gBright);
//       gBright +=1;
//       delay(fadeSpeed);
//   }
}

void TurnOnR() { 
  digitalWrite(4, HIGH);
//   for (int i = 0; i < 256; i++) {
//       analogWrite(RED_LED, rBright);
//       rBright +=1;
//       delay(fadeSpeed);
//   } 
}

void TurnOffB() {
//   for (int i = 0; i < 256; i++) {
//       analogWrite(BLUE_LED, brightness);
//       
//       brightness -= 1;
//       delay(fadeSpeed);
//   }
   digitalWrite(7, LOW);
}

void TurnOffG() {
//  for (int i = 0; i < 256; i++) {
//       analogWrite(GREEN_LED, brightness);  
//        
//       brightness -= 1;
//       delay(fadeSpeed);
//   }
   digitalWrite(5, LOW);
}

void TurnOffR() {
//  for (int i = 0; i < 256; i++) {
//       analogWrite(RED_LED, brightness);  
//        
//       brightness -= 1;
//       delay(fadeSpeed);
//   }
   digitalWrite(4, LOW);
}

void RGB_color(int red_light_value, int green_light_value, int blue_light_value, int side)
 {
  if(side==1){
    analogWrite(red_light_pin1, red_light_value);
    analogWrite(green_light_pin1, green_light_value);
    analogWrite(blue_light_pin1, blue_light_value);
  } else{
    analogWrite(red_light_pin2, red_light_value);
    analogWrite(green_light_pin2, green_light_value);
    analogWrite(blue_light_pin2, blue_light_value);
  }
  
}

void loop() {
  if(digitalRead(13)==HIGH){
    currentTable = table1;
    stopRead = false;
    turnOnLeft = true;
  }
  if(digitalRead(12)==HIGH){
    currentTable = table2;
    stopRead = false;
    turnOnRight = true;
  }
  if(turnOnLeft){
    TurnOnB();
    TurnOnR();
    while(index<7){
     RGB_color(colors[index][0], colors[index][1], colors[index][2],2);
     index = index + 1;
     delay(100); 
    }
    index=0;
  }
  if(turnOnRight){
    TurnOnG();
    TurnOnR();
    while(index<7){
     RGB_color(colors[index][0], colors[index][1], colors[index][2],2);
     index = index + 1;
     delay(100); 
    }
    index=0;
  }
  // check, if any data is available
  if(!stopRead){
    if(Rfid.available() > 0 ){
      // as long as there is data available...
      while(Rfid.available() > 0 ){
        // read a byte
        int r = Rfid.read();
        code = code + r;
        if(code.length() == 26){
          Serial.print(code);
          Serial.println();
          Serial.print("Done");
          code = "";
          stopRead = true;
          break;  
        }
      }
      // linebreak
      Serial.println();
    }
  }
  if(code == currentTable){
    if(turnOnLeft){
      TurnOffB();
      TurnOffR();
      RGB_color(0, 0, 0, 2);
      turnOnLeft = !turnOnLeft;
      stopRead = false;
      currentTable = "";
    }
    if(turnOnRight){
      TurnOffG();
      TurnOffR();
      RGB_color(0, 0, 0, 1);
      turnOnRight = !turnOnRight;
      stopRead = false;
      currentTable = "";
    }
  }
  
}
