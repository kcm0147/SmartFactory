
//line2 temperature and humidity
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN            2   
#define DHTTYPE           DHT11     // DHT 11 

DHT_Unified dht(DHTPIN, DHTTYPE);



uint32_t delayMS;



void setup() {

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

}