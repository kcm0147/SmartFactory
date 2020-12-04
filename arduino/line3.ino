
//line3 temperature and humidity and flame detect
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN            2   
#define DHTTYPE           DHT11     // DHT 11 

int flame = 3;      // 불꽃감지 센서 핀 번호 3
int state = 0;      // 불꽃감지 센서의 상태 값 저장 변수

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

  //불꽃 감지 센서
    state = digitalRead(flame);   // 불꽃 감지 센서값 입력받음
  
  if (state == 0){              // 불꽃감지 센서의 값이 0일때(불꽃이 감지 되었을 때)
    Serial.println("ON");       // 시리얼 통신에 센서값 출력해 주기.
    delay(100);                
  }
  else {                        // 불꽃감지 센서의 값이 1일때 (불꽃이 감지 되지 않았을 때)    
    Serial.println("OFF");      // 시리얼 통신에 센서값 출력해 주기.
  }
  delay(100);

}
