/*
 Connect the LCD as follows:
  LCD RS pin to Arduino pin 7
  LCD Enable pin to Arduino pin 8
  LCD D4 pin to Arduino pin 9
  LCD D5 pin to Arduino pin 10
  LCD D6 pin to Arduino pin 11
  LCD D7 pin to Arduino pin 12
  LCD R/W pin to ground
  LCD VSS pin to ground
  LCD VCC pin to 5V
  10K pot, ends to +5 and ground, wiper to LCD pin 3 (V0)

 PM sensor connections:
  +5v and ground;
  PM signal pin to Arduino pin 4
*/

// include ladyada LCD library
#include <LiquidCrystal.h>

// initialize the LCD
LiquidCrystal lcd(7, 8, 9, 10, 11, 12);

int PM=4; //Arduino pin connected to the PM sensor signal pin

unsigned long sampletime = 5000; //sample duration [ms]

//Define additional Variables
unsigned long duration;
unsigned long starttime;
unsigned long lowpulseoccupancy = 0;
float ratio = 0;
float mconc = 0;

void setup() {

  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("PM conc:");

  //debug monitor
  Serial.begin(9600);
  Serial.println("Initializing sensor ...");

  //set the start time of the first PM measurement
  starttime = millis(); 

}

void loop() {

  //get data from the sensor
  duration = pulseIn(PM, LOW);

  //accumulate the time when the sensor pin is LOW
  lowpulseoccupancy += duration; 

  //keep measuring until the sample time duration is exceeded
  if ((millis()-starttime) > sampletime){

    //convert to mass concentration [μg/m3]
    ratio = lowpulseoccupancy/(sampletime*10.0);  // Integer percentage 0=>100
    mconc = num2massconc( ratio2numconc(ratio) );

    //debug dump to screen
    Serial.println(mconc);

    // output mass concentration to LCD
    lcd.setCursor(12,0);
    lcd.print(mconc);

    lcd.setCursor(0,1);
    if (mconc <= 12.5){ // "Good" air quality 
      lcd.print("****  Good  ****");
    }
    else if(mconc > 12.5 && mconc <= 35.5){ //"moderate"
      lcd.print("*** Moderate ***");
    }
    else if(mconc > 35.5 && mconc <= 150.5){ //"Unhealthy"
      lcd.print("*   Unhealthy  *");
    }
    else if(mconc > 150.5 && mconc <= 250.0){ //"Very unhealthy"
      lcd.print(" Very unhealthy ");
    }        
    else{//"hazardous concentration"
      lcd.print("    HAZARDOUS   ");
    }

    //initialize the time variables for the next sample 
    lowpulseoccupancy = 0;
    starttime=millis();
  
  }

}

float ratio2numconc (float ratio)
// converts occupancy ratio to number conc in #/0.01cf
{
  return 1.1 * pow (ratio, 3) - 
         3.8 * pow (ratio, 2) + 
         520 * ratio + 0.62;
}

float num2massconc (float numconc)
/* converts PM number concentration in #/0.01cf 
         to PM mass   concentration in μg/m3 */
{
  double pi = 3.14159;
  double density = 1.65 * pow (10, 12);
  double r25 = 0.44 * pow (10, -6);
  double vol25 = (4/3) * pi * pow (r25, 3);
  double mass25 = density * vol25;
  double K = 3531.5;

  return numconc * K * mass25;
}


