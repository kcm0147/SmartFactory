
//line3 temperature and humidity and flame detect
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN            2   
#define DHTTYPE           DHT11     // DHT 11 

int flame = A0;      // 불꽃감지 센서 핀 번호 A0

DHT_Unified dht(DHTPIN, DHTTYPE);

uint32_t delayMS;

void setup() {
  pinMode(flame, INPUT);   // 불꽃 감지 센서를 입력으로 설정

  Serial.begin(9600); 
  dht.begin();

  sensor_t sensor;

  dht.temperature().getSensor(&sensor);


  // Print humidity sensor details.

  dht.humidity().getSensor(&sensor);
  delayMS = sensor.min_delay / 1000;

}



void loop() {

  // Delay between measurements.

  delay(delayMS);

 
  sensors_event_t event;  

  dht.temperature().getEvent(&event);

  if (isnan(event.temperature)) { // 숫자가 아니면   
    //Serial.println("Error reading temperature!");
  }

  else {

    //Serial.print("Temperature: ");
    Serial.print("TandHSensor,");
    Serial.print(event.temperature);
    Serial.print(",");
    //Serial.println(" *C");

  }

  // Get humidity event and print its value.

  dht.humidity().getEvent(&event);

  if (isnan(event.relative_humidity)) {

   // Serial.println("Error reading humidity!");

  }

  else {

    //Serial.print("Humidity: ");
    Serial.print(event.relative_humidity);
    Serial.println(",");
    //Serial.println("%");

  }

  int val = analogRead(flame);
  Serial.print("FlameSensor,");
  //Serial.println(val);
  if(val < 1000){
    Serial.println("1");
  }
  else{ 
    Serial.println("0");
  }
  delay(100); 
}