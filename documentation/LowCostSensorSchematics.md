# Low Cost Sensor Documentation

### Why Do We Care About Air Quality?
Exposure to pollution can affect everyone's health. When you breathe in air, pollution aloft in the air can enter your lungs and blood stream. This can cause averse health effect or worsen pre-exisintg medical conditions such as asthma. This is why we measure air quality, to know the day-to-day risk of being outside. There are several ways we measure air quality, all of which use technology. Government air quality monitors are decidedly the most accurate and trusted ways to measure air quality. All reported measures of air quality (on say your phone's weather app, or your prefered weather website) come from government monitors, and sensors. One downfall of government monitors is that they are few and far between. Additionally, other air quality sensors, like the one you will build using this document, are useful for staying safe and informing ourselves on the local level. We can use less accurate, but more accessible sensors to inform our daily decisions. For more information visit our info page: https://www.airemory.com/info.html


### Background
In March 2021, a few of the Air Emory team led an event alongside the Atlanta Science Festival. The event was a small "air quality scavenger hunt" and it required participants to use a handheld air quality sensor and take readings at different, secret, locations around old fourth ward park. The event was designed to give those without much experience in air quality testing and general knowledge in air quality a look into our world. To further this outreach, we decided it would be fun to give people the chance to make their own at home air quality sensors, exactly like the ones we used at the event.

Below is documentation of the components used and their arrangment for the sensors we used during the 2021 Atlanta Science Festival. A small computer, called an Arduino, was used to process data collected by the laser particle sensor. This data was then displayed on a small LCD display. 

The measurements taken and shown were as follows:

### Measurements
* EPA Air Quality Index (On a scale from Good-Harmful)
```
Moderate
``` 
* PM<sub>2.5</sub> Concentration
```
17
```
What does this mean? Well if you go onto your phone's weather app and look around for a bit you will most definitely see an Air Quality reading. So, to boil it down, what you are esentially doing with this sensor is taking just the reading for PM<sub>2.5</sub>, and the display will show you what that concentration of PM<sub>2.5</sub> equivaltes to on the Air Quality Index. This scale, as shown above, ranges from good to harmful. A level of "good" means that there are no health risks for people caused by the air quality. The next level is "moderate" so the only health risks present are those for people already at risk of respiratory issues. Following this is "unhealthy for sensitive groups." This is to warn, namely, the elderly and children of the risks of exsessive outdoor exposure. The next three are just in increasing levels of severity and all imply health effects for the general population. Those levels are, in order, as follows: "unhealthy, very unhealthy, and hazardous." For further reading: https://www.airnow.gov/aqi/aqi-basics/ 

Here is a list of of EPA AQI levels and their equivalent PM<sub>2.5</sub> concentration levels:

* Example: AQI Category
```
Index Values, PM Concentration
```
* Good 
```
0-50, 0.0-12.0
```
* Moderate
```
51-100, 12.1-35.4
```
* Unhealthy for Sensitive Groups
```
101-150, 35.5-55.4
```
* Unhealthy
```
151-200, 55.5-150.4
```
* Very Unhealthy
```
201-300, 150.5-250.4
```
* Hazardous
```
>301, >250.5
```

### Materials

To build the low-cost sensor used at the Atlanta Science Festival the following materials will be needed:

* [Arduino](https://store.arduino.cc/usa/mkr2uno-adapter)
* [Wire kit](https://www.amazon.com/IZOKEE-Solderless-Breadboard-Arduino-Project/dp/B08151TQHG/ref=sr_1_6?dchild=1&keywords=Arduino+Wire&qid=1628894843&sr=8-6)
* [Bread Board](https://www.amazon.com/BB830-Solderless-Plug-BreadBoard-tie-Points/dp/B0040Z4QN8/ref=sr_1_36?crid=34JWIJF4NJRY&dchild=1&keywords=breadboard&qid=1628895071&sprefix=Breadb%2Caps%2C194&sr=8-36)
* [Laser Particle Sensor](https://www.amazon.com/DSM501A-Detection-Allergic-Particles-Condition/dp/B07KNSVT7R)
* [LCD Display](https://www.adafruit.com/product/1447)
* A single D battery
* Rubber Bands
* USB cable
* Laptop or monitor

Some things to note: You do not have to use these links. These are just a few trusted links found by the lab. If you are looking for a different LCD display make sure you find one with a soldered header. We will not provide explaination for how to solder your electronics (if this is something you want to do, however, by all means power to you).

### Set-up
Set-up for the sensor is as follows: 
Make sure you have all necessary components (links for purchase can be found above), laser particle sensor, Arduino, breadboard, LCD display, wire packet, battery. The following image can be used as a guide for sensor assembly (but a step-by-step guide can be found below if you do not want to try the asembly on your own). The wire column indicates the wire color we used (although colors are arbitrary so do not fret over this), the second column indicates what you are connecting and where on the breadboard one must initially insert the wire. The third column indicates what you are connecting to and where the other end of the wire should be inserted. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Low_Cost_Schema.png" width="250" height ="200">

Following is a step-by-step guide to setting up your low-cost sensor. Follow along with the instucrutions to come, and you will have a sensor set-up exactly like those we use in the lab! One thing to note is that these steps do not have to be done in order. Your sensor will still operate regardless of the order you connected your wires and hardware! Additionally, most all pictures below show single wire connections. This is done to make following along easier, DO NOT disconnect the wires after connecting them. Your finished product should look like the sensor found in the photos at the end of the document!


### Step-by-Step
-We will start by coding the LCD display to show the metrics we would like to see. To do this, connect your Arduino to a laptop or monitor via USB. Create a new workspace within the Arduino. Copy and paste the code from: https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/documentation/PM_sensor_LCD.ino onto your workspace. Congrats! You just coded in Arduino's native language!

-Next, start by connecting the LCD display. Plug the LCD display into D28 and line up the rest of the metal barbs with the neighboring slots on the breadboard. The Arduino, sensor, and battery will not plug snugly into the breadboard as the LCD display does, we used rubber bands to keep these components in place. Next we will connect the Arduino

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%201.jpg" width="300" height ="250">

-The Arduino connects to two distinct components, the laser particle sensor and the breadboard itself...we will start by connecting to the breadboard. Moving from right to left along the Arduino, connect a blue wire to Arduino GND and plug the other end into slot 10 minus (for the purpose of the rest of the document I will use "-" and "+" to in place of positive and negative terminals on the breadboard). 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/step%202.jpg" width="300" height ="250">

-Next connect a white wire into Arduino slot 12 and connect the other end to 15a. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%203.1.jpg" width="300" height ="250"> <img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%203.2.jpg" width="300" height ="250">

-Next, connect another white wire to Arduino 11 with the other end connecting to 16a. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%204.1.jpg" width="300" height ="250"> <img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%204.2.jpg" width="300" height ="250">

-A yellow wire follows in Arduino 10, ending in 17a

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%205.jpg" width="300" height ="250"> <img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%205.2.jpg" width="300" height ="250">

-A red wire follows this plugging into Arduino 9 and breadboard 18a. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%206.jpg" width="300" height ="250"> <img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%206.2.jpg" width="300" height ="250">

-Next is another red wire plugging into Arduino 8, this wire connects to breadboard slot 23a. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%206.3.jpg" width="300" height ="250"> <img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%206.4.jpg" width="300" height ="250">

-The last wire on this side of the Arduino to connect the Arduino to the breadboard is an orange wire in Arduino 7 that ends in breadboard 25a. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%207.1.jpg" width="300" height ="250"> <img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%207.2.jpg" width="300" height ="250">

-The last wire connects on the opposite side of the Arduino in the 5v slot and ends in the 39+ spot of the breadboard. Next we will connect the Arduino to the laser particle sensor.

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%208.1.jpg" width="300" height ="250"> <img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%208.2.jpg" width="300" height ="250">


-This next component only consists of one wire: a yellow wire in Arduino 4 connecting to the second left most node on the laser particle sensor. Next we will connect the laser particle sensor to the breadboard and finally we will do a bit of breadboard-breadboard connecting and you will be well on your way to testing the air quality wherever you want.

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Sensor%20Connection%201.jpg" width="350" height ="250">

-There are two wires to connect the laser particle sensor: 

-A red wire that plugs in directly to the right of the above yellow wire ending in breadboard 59+ 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Sensor%20Connection%202.0.jpg" width="300" height ="250"> <img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Sensor%20Connection%202.1.jpg" width="350" height ="250">

-A black wire connects to the laser particle sensor two nodes to the right of the red wire ending in breadboard 61-. As said above, we will now move to the breadboard-breadboard connections!

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Sensor%20Connection%203.0.jpg" width="300" height ="250"> <img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Sensor%20Connection%203.1.jpg" width="300" height ="250">

-In this section there are 7 connections needed to be made. Let's start with a red wire, plug this wire into breadboard 37- and 37c. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%209.jpg" width="300" height ="250">

-Connect a yellow wire to 35+ and 35c. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%209.1.jpg" width="300" height ="250">

-Next, connect a blue wire to 36g and 26b. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%2010.jpg" width="300" height ="250">

-Another blue wire connects 27c and 27+. Two more wire connections! 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%2011.jpg" width="300" height ="250">

-Take a final blue wire and link 14b with 13+. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%2012.jpg" width="300" height ="250">

-Finally, use a black wire to connect 13a with 12-. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%2013.jpg" width="300" height ="250">

-The last connection needed in this section is the small black dial labeled with a white "10k" marking. It has two prongs on one side and one on the other. Connect the two prong side to 35d and 37d with the single prong fitting nicely into 36f. 

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/Step%2014.jpg" width="300" height ="250">

-The last last last part to connect is the battery. A small device consisting of two wires will be used to do this. Clip one end to the two terminals on the 9v battery, then plug the other end (looks like an auxillary input) into the black socket on the Arduino. Your LCD display should light up and show the surrounding particulate matter conecentration!!! Below are some images of a complete make-up of one of our low-cost sensors so you can see what it should look like when complete!

<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/IMG-1103.jpg" width="300" height ="200">
<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/IMG-1104.jpg" width="250" height ="350">
<img src="https://github.com/EmoryAir/EmoryAir.github.io/blob/Low_cost_schema/images/IMG-1105.jpg" width="250" height ="350">

### Sources
https://www.epa.gov/sites/default/files/2016-04/documents/2012_aqi_factsheet.pdf
