#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN            2   
#define DHTTYPE           DHT11     // DHT 11 

DHT_Unified dht(DHTPIN, DHTTYPE);

uint32_t delayMS;

const int FSR_PIN = A0; // Pin connected to FSR/resistor divider
const float VCC = 4.98; // Measured voltage of Ardunio 5V line
const float R_DIV = 3230.0; // Measured resistance of 3.3k resistor

void setup() 
{
  Serial.begin(9600);
  pinMode(FSR_PIN, INPUT);

  dht.begin();

  sensor_t sensor;

  dht.temperature().getSensor(&sensor);
  dht.humidity().getSensor(&sensor);
  delayMS = sensor.min_delay / 1000;
}

void loop() 
{
  int fsrADC = analogRead(FSR_PIN);
  if (fsrADC != 0) // If the analog reading is non-zero
  {
    float fsrV = fsrADC * VCC / 1023.0;
    float fsrR = R_DIV * (VCC / fsrV - 1.0);
    //Serial.println("Resistance: " + String(fsrR) + " ohms");

    float force;
    float fsrG = 1.0 / fsrR; // Calculate conductance

    if (fsrR <= 600) 
      force = (fsrG - 0.00075) / 0.00000032639;
    else
      force =  fsrG / 0.000000642857;

    if(force<100){
      Serial.print("ForceSensor,");
      Serial.print(String(force));
      Serial.println(",");
      delay(500);
    }
  }

  else
  {      
    Serial.println("ForceSensor,0.0,");
    delay(500);
  }


/////온습도
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
