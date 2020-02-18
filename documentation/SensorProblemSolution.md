# Sensor Code Problems and Solutions

## Problem 1: Could not get the Sensor code to autoboot
* [Autobooting](https://www.instructables.com/id/Raspberry-PI-auto-boot/) is when the computer ( in this case, the Raspberry Pi) automatically starts running a programming script when it turns on. 
* Usually, once you turn on a computing device, you have to then go an additional step to run the code you want to run on the computer. Automooting takes this additional step away. 
* When I first tried to configure an autoboot onto the Raspberry Pi, I noticed that none of the methods that I tried implementing were working. I tried around 7 different methods described in [this website](https://www.instructables.com/id/Raspberry-PI-auto-boot/)

## Solution 1: Default Python Language In Linux
* Our computer (the Raspberry Pi) can compile (run) python script, but it was automatically set to compile the Python language instead of the Python3 language. Our code is written in the Python3 language so this was a problem
* There are minimal differences between the laguages, but it was enough to trip up the computer from processing the code we tried to write for the autoboot.
* The solution to this problem was the reconfigure the computer to make Python3 the default language instead of Python. This was accomplished with the following code in the Raspberry Pi terminal below (these are [LINUX](https://computer.howstuffworks.com/question246.htm) commands for the most part):

* In `/home/pi/EmoryAQ `
1. Copy  `CurrentcodeSep14.py` to `CurrentcodeOct30.py`
2. Make sure the shebang line in `CurrentcodeOct30.py` looks like this: 
```#!/usr/bin/env python```
3. Make the script executable: 
```chmod a+x CurrentcodeOct30.py```
4. Try to execute the script: 
```./CurrentcodeOct30.py.```
...If no errors, go to the next step. If it complains about missing modules, see at the bottom how to make python3 default

5. In `/home/pi/EmoryAQ` create a file `EmoryAQSensor.service` containing the following lines:
```
[Service]
WorkingDirectory=/home/pi/EmoryAQ
ExecStart=/home/pi/EmoryAQ/CurrentcodeOct30.py
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=EmoryAQ
User=root
Group=root
[Unit]
After=default.target
[Install]
WantedBy=default.target
```
6. Copy the file in `/etc/systemd/system/` and make sure root has the correct permissions
```sudo cp -p EmoryAQSensor.service /etc/systemd/system/```
```sudo chmod u+rw /etc/systemd/system/EmoryAQSensor.service```

7. Enable the service and start it manually:
```sudo systemctl enable EmoryAQSensor```
```sudo systemctl start EmoryAQSensor```

... If no error messages, stop the service reboot:
```sudo systemctl stop EmoryAQSensor```
```END```


## Check to see if the data is being written 

* in CSV, use ```vi data.csv```
* on google, go to ```vi CurrentcodeOct30.py``` and check which google doc its being written to 


## Python environment - make Python3 default
```Check the version: python --version```
```update-alternatives --list python```
```sudo update-alternatives --install /usr/bin/python/ python /usr/bin/python2.7 1```
```sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.5 2```
```update-alternatives --list python```

```change: sudo update-alternatives --config python```


## Add Python modules
```which pip:  pip show pip; pip3 show pip```
```which version: pip -V```
```check what's installed: pip list```

## Install gspread module:
```sudo pip install spread```

## Install google python APIs
```sudo pip install google-api-python-client oauth2client```
```sudo pip3 install --upgrade google-api-python-client oauth2client```

## To check the EmoryAQSensor service status without the shortcuts use: 
```systemctl status EmoryAQSensor.service```

```systemctl |grep EmoryAQSensor```

```journalctl |grep EmoryAQ```

## Aliases (shortcuts) added to check the status of the sensor code
 All Aliases are available on ```.bash_aliases```

* ```so [filename]``` = source of the file
* ```ltr``` = 'ls -ltr', it list the permissions and more information about files in that directory 
* ```+``` = 'pushd', used to bookmark directories so that you can easily navigate to them 
* ```h``` = 'history', shows you the history of the commands that you have entered into the terminal 
* ```off``` = 'sudo shutdown -h now', shuts down the raspberry pi
* ```status``` = 'systemctl status EmoryAQSensor.service', gives you the status of the code running on EmoryAQ
* ```jnl``` =  'journalctl |grep EmoryAQ', journal logs 

## Change WIFI Configurations 
1) type in the terminal ```sudo raspi-config```
2) then go to ```Network Options``` then ```Wi-Fi``` and then add the ssid and password 
3) then reboot with ```sudo reboot```
Note: If you're working with the Emory Guest Wifi, connect with nothing inputed in the password. Instead, go to the internet on the Raspberry Pi and enter your information to use the Emory Guest Wifi network 

## Problem 2: Data Not Recording To Google Docs
* The CSV was recording the sensor data in the computer but the data was not sending to our online Google Spreadsheet.

## Solution:
* Make sure that the service ID from the Google Cloud Key ID matches the one in the code.
* In addition, naming is very important, make sure the name of the google doc matches the one that you mention in the code under the gdoc() function. You can assess the google cloud account through the gmail account. 
* Make sure that the function is not only declared, but also called. The call must have been accidentally erased somehow. 



