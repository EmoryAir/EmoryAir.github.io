# Connection The Sensor To a Google Sheets 

## Step 1: Create the Google Sheet 
* Go to [Google Cloud](cloud.google.com) and use the email: **emoryaq@gmail.com** and enter the password 
* Once you're signed in, go to google drive
* At the google drive, go to Air Emory > Air Emory Website > [Sensor Sheets](https://drive.google.com/drive/u/2/folders/1AorpXWDZ1x3_l8bFXLCRiZf3ocJSbJ4X) and create a new google sheets page
* change the sharing preferences to ```can edit ```

## Step 2: Link the sheet to the sensor
* Log into the Raspberry Pi and open up the current code 
* under the ``` def gdoc(): ``` function, there is a line that says ```sheet= client.open("Data Log").sheet1```
* change what ever is written in the quotes, in this case, it would be "Data Log" and replace it with the name that you made on your google sheet. 
* save the code and then reboot the raspberry pi to see the changes 

