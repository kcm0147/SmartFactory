int SensorPin = A0; //analog pin 0
 
void setup(){
  Serial.begin(9600); // 9600 port open
}
 
void loop(){
  int SensorReading = analogRead(SensorPin); 
 
  int mfsr_r18 = map(SensorReading, 0, 1024, 0, 255); // 0~1024 convert to 0~255
  Serial.println(mfsr_r18);
 
  delay(100); 
}
