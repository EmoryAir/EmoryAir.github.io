#Sensor Documentation 

##Background 
Our sensors are premade, but we used a small computer called a [Raspberry Pi](https://www.raspberrypi.org/help/what-%20is-a-raspberry-pi/) to store Python code that takes the sensor outputs (PM 2.5, 10 from the Dylos sensor and temp/humidity from the DHT22 sensor) and organizes them onto a CSV file thats stored within the computer, and also sends out the data to a google sheet as well.

###Measurements
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
###Data Recording Platforms
The measurements described above are sent to the Raspberry Pi once per minute. The Pi then sends the measurements to:
* a CSV file stored in the Pi 
* a google sheet through the internet

####Google Sheets
In order to send data to the Google Sheets, we need:
* [Key Credentials](https://cloud.google.com/video-intelligence/docs/common/auth#set_up_an_api_key) from [Google Cloud](https://cloud.google.com/video-intelligence/docs/common/auth) to use their API(their tools that can help send data to the sheets).
* Internet connection (the Raspberry Pi needs to be connected to the internet: we use EmoryGuest)
* A gdoc() function in the code that parses (breaks down) the data from the sensors and sends the data using the above two components
```
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
```

