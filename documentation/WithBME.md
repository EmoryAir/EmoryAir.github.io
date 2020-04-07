## Commands needed on the terminal first

```
pip3 install RPI.GPIO
```
```
pip3 install adafruit-blinka
```
```
sudo reboot
```
```
sudo pip3 install adafruit-circuitpython-bme680
```


## The Sensor Code
The lines with an ```[ADD]``` next to it are the lines you need to add
The lines with ```[NOTE]``` are things to note about the code
``` python
#!/usr/bin/env
#Modules
import Adafruit_DHT
import datetime
import serial
import csv
import gspread
import time
import json
[ADD] import board
[ADD] import busio
[ADD] import adafruit_bme680
from oauth2client.service_account import ServiceAccountCredentials

#initialize the I2C connection with the sensor
[ADD] i2c = busio.I2C(board.SCL, board.SDA)


#Global Variables:
starttime=time.time()
temperature=-9999
humidity=-9999
PM25=-9999
pm10=-9999

#Define Variables
#[NOTE] although its not dht anymore, we can just keep the function name as in to avoid complications 
def dhtdata():
    try:
        [ADD] sensor = adafruit_bme680.Adafruit_BME680_I2C(i2c)
        [CHANGE] humidity,temperature = sensor.humidity, sensor.temperature
    except:
        print('sensor or pin error, try checking GPIOpin#')
    if humidity !=None and temperature !=None:
        print('Temp={0:0.1f}* Humidity={1:0.1f}%'. format(temperature, humidity))
    else:
        print('Failed to obtain reading')
    return temperature, humidity

def dylosdata():
    serialport=serial.Serial('//dev/ttyUSB0',
                             baudrate=9600,
                             parity=serial.PARITY_NONE,
                             bytesize=serial.EIGHTBITS,
                             timeout=None,
                             writeTimeout=1,)
    y=serialport.readline().strip()
    PM25,PM10=[int(_) for _ in y.decode('ascii').strip().split(',')]
    try:
        print(PM25,PM10)
    except:
        print("not working1")
    return PM25,PM10
def cssv():
    try:
        with open('data.csv', 'a', newline='') as csv_file:
            writer= csv.writer(csv_file, delimiter=',')
            writer.writerow(alldata)
        print("wrote to csv")
    except:
        print("Failed to log to CSV")
def gdoc():
    try:
        scope = ['https://spreadsheets.google.com/feeds',
                 'https://www.googleapis.com/auth/drive']
        creds = ServiceAccountCredentials.from_json_keyfile_name('airpollutioncredentials.json', scope)
        client = gspread.authorize(creds)
        sheet= client.open("Data Log").sheet1
        sheet.append_row(alldata)
        print("Wrote to gdoc")
    except:
        print("Failed to log to gdoc")
#Log to CSV:
while True:
    temperature, humidity= dhtdata()
    PM25,PM10=dylosdata()
#Line below: writes timestamp all in one cell
    timestamp=str(datetime.datetime.now())
#Alternatively, we can have the year, month, day, hour, minute, second writen in separate columns. For that, uncomment below
    #year=datetime.datetime.now().year
    #month=datetime.datetime.now().month
    #day=datetime.datetime.now().day
    #hour=datetime.datetime.now().hour
    #minute=datetime.datetime.now().minute
    #change all data to include each unit of time
    alldata=[timestamp,temperature, humidity, PM25, PM10]
    cssv()
    gdoc()
    time.sleep(60.0-((time.time()-starttime)%60))
```
