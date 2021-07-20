# Low Cost Sensor Documentation

## Background
Below is documentation of the components used and their arrangment for the sensors we used during the 2021 Atlanta Science Festival. A small computer called an [Arduino](https://store.arduino.cc/usa/mkr2uno-adapter) was used to process data collected by the laser particle sensor. This data was then displayed on a small LED display. The measurements taken and displayed were as follows:

### Measurements
* EPA Air Quality Standard (On a scale from Good-Harmful)
```
Moderate
``` 
* PM 2.5 Concentration
```
17
```
### Set-up
Set-up for the sensor is as follows: 
Make sure you have all necessary components, laser particle sensor, Arduino (link can be found above), breadboard, LCD display, wire packet. The following image can be used as a guide for sensor assembly (but a step-by-step guide can be found below if you do not want to try the asembly on your own). The wire column indicates the necessary wire color, the second column indicates what you are connecting and where on the breadboard one must initially insert the wire. The third column indicates what you are connecting to and where the other end of the wire should be inserted. 

![Low Cost Schema](https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Low_Cost_Schema.png)

Following is a step-by-step guide to setting up your low-cost sensor. Follow along with the instucrutions to come, and you will have a sensor set-up exactly like those we use in the lab! One thing to note is that these steps do not have to be done in order. Your sensor will still operate regardless of the order you connected your wires and hardware!


### Step-by-Step
-Start by connecting the LCD display. Plug the LCD display into D32 and line up the rest of the metal barbs with the neighboring slots on the breadboard. The Arduino, sensor, and battery will not plug snugly into the breadboard as the LCD display does, we used rubber bands to keep these components in place. Next we will connect the Arduino

-The Arduino connects to two distinct components, the laser particle sensor and the breadboard itself...we will start by connecting to the breadboard. Moving from right to left along the Arduino, connect a blue wire to Arduino GND and plug the other end into slot 10 minus (for the purpose of the rest of the document I will use "-" and "+" to in place of positive and negative terminals on the breadboard). 

-Next connect a white wire into Arduino slot 12 and connect the other end to 15a. 

-Next, connect another white wire to Arduino 11 with the other end connecting to 16a. 

-A yellow wire follows in Arduino 10, ending in 17a

-a red wire follows this plugging into Arduino 9 and breadboard 18a. 

-Next is another red wire plugging into Arduino 8, this wire connects to breadboard slot 23a. 

-The last wire on this side of the Arduino to connect the Arduino to the breadboard is an orange wire in Arduino 7 that ends in breadboard 25a. 

-The last wire connects on the opposite side of the Arduino in the 5v slot and ends in the 39+ spot of the breadboard. Next we will connect the Arduino to the laser particle sensor.

-This next component only consists of one wire: a yellow wire in Arduino 4 connecting to the second left most node on the laser particle sensor (a picture of the orientation of laser particle wires is found just below). Next we will connect the laser particle sensor to the breadboard and finally we will do a bit of breadboard-breadboard connecting and you will be well on your way to testing the air quality wherever you want.

![Laser Sensor Close Up](https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/IMG-1246.jpg)

-There are two wires to connect the laser particle sensor: 

-A red wire that plugs in directly to the right of the above yellow wire ending in breadboard 59+ 

-A black wire connects to the laser particle sensor two nodes to the right of the red wire ending in breadboard 61-. As said above, we will now move to the breadboard-breadboard connections!

-In this section there are 7 connections needed to be made. Let's start with a red wire, plug this wire into breadboard 37- and 37c. 

-Connect a yellow wire to 35+ and 35c. 

-Next, connect a bluw wire to 36g and 26b. 

-Another blue wire connects 27c and 27+. Two more wire connections! 

-Take a final blue wire and link 14b with 13+. 

-Finally, use a black wire to connect 13a with 12-. 

-The last connection needed in this section is the small black dial labeled with a white "10k" marking. It has two prongs on one side and one on the other. Connect the two prong side to 35d and 37d with the single prong fitting nicely into 36f. 

-The last last last part is to connect the battery. A small device consisting of two wires will be used to do this. Clip one end to the two terminals on the 9v battery, then plug the other end (looks like an auxillary input) into the black socket on the Arduino. Your LCD display should light up and show the surrounding particulate matter conecentration!!! Below are some images of a complete make-up of one of our low-cost sensors so you can see what it should look like when complete!

![Laser Sensor Close Up](https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/IMG-1103.jpg)
![Laser Sensor Close Up](https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/IMG-1104.jpg)
![Laser Sensor Close Up](https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/IMG-1105.jpg)




