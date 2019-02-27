# Sensor Documentation 

## Background 
Our sensors are premade, but we used a small computer called a [Raspberry Pi](https://www.raspberrypi.org/help/what-%20is-a-raspberry-pi/) to store Python code that takes the sensor outputs (PM 2.5, 10 from the Dylos sensor and temp/humidity from the DHT22 sensor) and organizes them onto a CSV file thats stored within the computer, and also sends out the data to a google sheet as well.

### Measurements
This means, that for every minute that the sensor collects data, that data is sent to the Raspberry Pi and the code in the Pi then records:
* Date and Time of the recording
```
2018-10-27 17:14:40.504631
```
* PM2.5 
```
23
```
* PM10
```
2
```
* Temp
```
32.2
```
* Humidity 
```
26.1
```
### Collecting The Measurements To Raspberry Pi
There are 2 functions in the code that collects measurements from the sensors: one to collect data from the Dylos PM sensor, and one to collect data from the DHT temp/humidity sensor 
#### DHT Sensor (dhtdata() function in the code)
* The code first reads the humidity and tempurature data in that instance and records it into a humidity variable and temperature variable: Line 1-3
* Then, if the sensor recorded a value for the humidity and the tempurature, it print it onto the computer screen: Line 6-7
* In the end, the function returns the tempurature value and the humidity value for that instance: Line 10
```
def dhtdata():
    try:
1)        sensor=22
2)        pin=4
3)        humidity,temperature = Adafruit_DHT.read(sensor, pin)
4)    except:
5)        print('sensor or pin error, try checking GPIOpin#')
6)    if humidity !=None and temperature !=None:
7)        print('Temp={0:0.1f}* Humidity={1:0.1f}%'. format(temperature, humidity))
8)    else:
9)        print('Failed to obtain reading')
10)    return temperature, humidity
```
### Data Recording Platforms
The measurements described above are sent to the Raspberry Pi once per minute. The Pi then sends the measurements to:
* a CSV file stored in the Pi 
* a google sheet through the internet
#### CSV File (cssv() function in the code)
In order to add the new measurements to the premade CSV file in the computer, we need:
* To open up the "data.csv" file in the Pi and create a new row in the sheet to add our new measurement data: Line 1
* Write the data down on the new row: Line 2-3
```
def cssv():
    try:
1)        with open('data.csv', 'a', newline='') as csv_file:
2)            writer= csv.writer(csv_file, delimiter=',')
3)            writer.writerow(alldata)
4)        print("wrote to csv")
    except:
        print("Failed to log to CSV")
```

#### Google Sheets (gdoc() function in code)
In order to send data to the Google Sheets, we need:
* [Key Credentials](https://cloud.google.com/video-intelligence/docs/common/auth#set_up_an_api_key) from [Google Cloud](https://cloud.google.com/video-intelligence/docs/common/auth) to use their API(their tools that can help send data to the sheets): Lines 1-4
* A google sheet name created with the account that has the Key Credentials (Emory Air Gmail account): Line 5        
* Internet connection (the Raspberry Pi needs to be connected to the internet: we use EmoryGuest)
* A function in the code that sends the measurements to a row in the sheets:  Line 6
```
def gdoc():
        try:
        1.        scope = ['https://spreadsheets.google.com/feeds',
        2.                'https://www.googleapis.com/auth/drive']
        3.        creds = ServiceAccountCredentials.from_json_keyfile_name('airpollutioncredentials.json', scope)
        4.        client = gspread.authorize(creds)
        5.        sheet= client.open("Data Log").sheet1
        6.        sheet.append_row(alldata)
        7.        print("Wrote to gdoc")
            except:
                print("Failed to log to gdoc")
```


