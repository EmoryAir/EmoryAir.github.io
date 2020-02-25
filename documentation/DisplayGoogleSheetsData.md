# Displaying Data from Google Sheets
This guide will demonstrate how to make an HTTP request to fetch data from Google Sheets and display that data on a webpage.

## Background
Have some working knowledge of HTML, JavaScript, JSON, HTTP GET requests, and AJAX requests.

## System Requirements
* IDE (examples below)
	* [Sublime](https://www.sublimetext.com/3)
	* [Visual Studio Code](https://code.visualstudio.com/download)
	* [Eclipse](https://www.eclipse.org/downloads/)
* Server (example below)
	* [Python3](https://www.python.org/downloads/)
* [Git](https://git-scm.com/downloads) - Only needed if you are committing your code to the repository

## Step One: Make the Google Spreadsheet public
If the spreadsheet is not public, the data is not available on the web, and a request cannot be made to get the data. Click [here](https://support.wix.com/en/article/setting-your-google-spreadsheet-as-public) for instructions on how to make a spreadsheet public.

## Step Two: Identify the Google Spreadsheet ID
The ID is the value between the "/d/" and "/edit" in the url of the spreadsheet </br>
MSC Example: 
* https://docs.google.com/spreadsheets/d/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/edit#gid=2090448674
* Spreadsheet ID is "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI"

## Step Three: Create the AJAX request
Note: Must have jquery included in webpage header to utilize AJAX
* Can include the jquery's CDN in the header
* Can download jquery in a directory in the project and include the link in the header

### Ajax Request Format Example
```javascript
$.ajax({
	type: 'GET',
	url: url,
	dataType: 'json',
	success: callback,
	error: function(e) {
		console.log("ERROR: Cannot get data from google sheets.");
		console.log(e);
	}
});
```
### Breakdown of the Parameters
* **type** = the type of request you are making
	* We are making a ```GET``` request because we are ```reading``` the data
* **url** = the url to the data
* **dataType** = the format of the data that you are fetching
	* We are fetching data that is in ```JSON``` format
* **success** = the function to be executed if the request is successful (data can be read)
	* ```callback``` is the name of the function that will later be defined
* **error** = the function to be executed if the request is unsuccessful (data cannot be read)
	* The ```e``` parameter is the error object, which will show why the error occurred

### The URL
To convert the google sheet to data that is in JSON format, we alter our url. </br>
Our url is ```https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values?alt=json```
* The 1 in the url specifies that we want the first sheet in the workbook


### Constructing the Request
We will create a function to contain our AJAX request. The request will be made when this function is called. 
```javascript
function getData(callback) {
	$.ajax({
		type: 'GET',
		url: 'https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values?alt=json',
		dataType: 'json',
		success: callback,
		error: function(e) {
			console.log("ERROR: Cannot get data from google sheets.");
			console.log(e);
		}
	});
}
```

## Step Four: Making the Request and Displaying the Data
### Create the Function
```javascript
function displayData() {}
```
This function will be used to make the request and also display the data in the table on the template webpage.

### Make the request
```javascript
getData(function(response) {});
```
Calling the function ```getData(callback);``` will make the request. ```function(response)``` is the callback parameter. ```response``` is what we have named the data that we are requesting. In ```function(response)```, we will add code to display the data in the table. The data is only accessible within this function. Therefore, any code that uses this data must be contained in this function.

### What the Data Looks Like
This is a formatted snippet of what the requested data looks like. The data is in JSON format.
```
{
  "version": "1.0",
  "encoding": "UTF-8",
  "feed": {
    "xmlns": "http://www.w3.org/2005/Atom",
    "xmlns$openSearch": "http://a9.com/-/spec/opensearchrss/1.0/",
    "xmlns$gsx": "http://schemas.google.com/spreadsheets/2006/extended",
    "id": {
      "$t": "https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values"
    },
    "updated": {
      "$t": "2020-02-24T23:30:19.514Z"
    },
    "category": [
      {
        "scheme": "http://schemas.google.com/spreadsheets/2006",
        "term": "http://schemas.google.com/spreadsheets/2006#list"
      }
    ],
    "title": {
      "type": "text",
      "$t": "Sheet1"
    },
    "link": [
      {
        "rel": "alternate",
        "type": "application/atom+xml",
        "href": "https://docs.google.com/spreadsheets/u/0/d/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/pubhtml"
      },
      {
        "rel": "http://schemas.google.com/g/2005#feed",
        "type": "application/atom+xml",
        "href": "https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values"
      },
      {
        "rel": "http://schemas.google.com/g/2005#post",
        "type": "application/atom+xml",
        "href": "https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values"
      },
      {
        "rel": "self",
        "type": "application/atom+xml",
        "href": "https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values?alt=json"
      }
    ],
    "author": [
      {
        "name": {
          "$t": "emoryaq"
        },
        "email": {
          "$t": "emoryaq@gmail.com"
        }
      }
    ],
    "openSearch$totalResults": {
      "$t": "1096"
    },
    "openSearch$startIndex": {
      "$t": "1"
    },
    "entry": [
      {
        "id": {
          "$t": "https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values/cokwr"
        },
        "updated": {
          "$t": "2020-02-24T23:30:19.514Z"
        },
        "category": [
          {
            "scheme": "http://schemas.google.com/spreadsheets/2006",
            "term": "http://schemas.google.com/spreadsheets/2006#list"
          }
        ],
        "title": {
          "type": "text",
          "$t": "2020-02-24 00:00:03.489696"
        },
        "content": {
          "type": "text",
          "$t": "temperaturec: 14.39999962, relativehumidity: 65.30000305, pm.5: 1899, pm2.5: 31, time:  00:00, pmfine: 18.68, pm2.5federalstandard: 12, source: Air Emory, month: 02, location: MSC"
        },
        "link": [
          {
            "rel": "self",
            "type": "application/atom+xml",
            "href": "https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values/cokwr"
          }
        ],
        "gsx$timestamp": {
          "$t": "2020-02-24 00:00:03.489696"
        },
        "gsx$temperaturec": {
          "$t": "14.39999962"
        },
        "gsx$relativehumidity": {
          "$t": "65.30000305"
        },
        "gsx$pm.5": {
          "$t": "1899"
        },
        "gsx$pm2.5": {
          "$t": "31"
        },
        "gsx$time": {
          "$t": " 00:00"
        },
        "gsx$pmfine": {
          "$t": "18.68"
        },
        "gsx$pm2.5federalstandard": {
          "$t": "12"
        },
        "gsx$source": {
          "$t": "Air Emory"
        },
        "gsx$month": {
          "$t": "02"
        },
        "gsx$location": {
          "$t": "MSC"
        }
      },
      {
        "id": {
          "$t": "https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values/cpzh4"
        },
        "updated": {
          "$t": "2020-02-24T23:30:19.514Z"
        },
        "category": [
          {
            "scheme": "http://schemas.google.com/spreadsheets/2006",
            "term": "http://schemas.google.com/spreadsheets/2006#list"
          }
        ],
        "title": {
          "type": "text",
          "$t": "2020-02-24 00:01:03.239639"
        },
        "content": {
          "type": "text",
          "$t": "temperaturec: 14.39999962, relativehumidity: 66.30000305, pm.5: 1929, pm2.5: 26, time:  00:01, pmfine: 19.03, pm2.5federalstandard: 12, source: Air Emory, month: 02, location: MSC"
        },
        "link": [
          {
            "rel": "self",
            "type": "application/atom+xml",
            "href": "https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values/cpzh4"
          }
        ],
        "gsx$timestamp": {
          "$t": "2020-02-24 00:01:03.239639"
        },
        "gsx$temperaturec": {
          "$t": "14.39999962"
        },
        "gsx$relativehumidity": {
          "$t": "66.30000305"
        },
        "gsx$pm.5": {
          "$t": "1929"
        },
        "gsx$pm2.5": {
          "$t": "26"
        },
        "gsx$time": {
          "$t": " 00:01"
        },
        "gsx$pmfine": {
          "$t": "19.03"
        },
        "gsx$pm2.5federalstandard": {
          "$t": "12"
        },
        "gsx$source": {
          "$t": "Air Emory"
        },
        "gsx$month": {
          "$t": "02"
        },
        "gsx$location": {
          "$t": "MSC"
        }
      },
```
The data consists of nested JSON objects and arrays. To access the data, we need to access the ```feed object```. In the ```feed object```, we then access the ```entry array```. We are then able to access the ```data objects```, which contain the ```text```. To access the timestamp, for example, we would use ```response.feed.entry.gsx$timestamp.$t```.

### Access the Entry Array
```var data = response.feed.entry;```

### Displaying the Data
To display this data, we are going to create a table.
We will create it as a string in JavaScript, and then write it to the HTML document.  
```var myTable = "<table><tr><th>Timestamp</th><th>Temperature</th><th>Relative Humidity</th><th>PM 2.5</th></tr>"; ```

We will then create variables to hold the data that we read. We do this in order to deal with any null data, which means the Excel cell is empty.</br>
```var timestamp, temperature, relativehumidity, pmfine;```

Now we will iterate through the array, set the variables, and then add them to our variable ```myTable```. Before we are able to access the ```$t``` field, we have to make sure that its parent object is not null. Trying to access a null object's attributes will result in an error. Therefore, we check for a null object. If it is null, set the respective variable to the String ```"---"```, which is what will be displayed in the table if no data was collected for that entry.
```
for (let i = 0; i < data.length; i++) {
            if (data[i].gsx$timestamp == null) {
              timestamp = "---";
            } else {
              timestamp = data[i].gsx$timestamp.$t;
            }
            if (data[i].gsx$temperaturec == null) {
              temperature = "---";
            } else {
              temperature = data[i].gsx$temperaturec.$t;
            }
            if (data[i].gsx$relativehumidity == null) {
              relativehumidity = "---";
            } else {
              relativehumidity = data[i].gsx$relativehumidity.$t;
            }
            if (data[i].gsx$pmfine == null) {
              pmfine = "---";
            } else {
              pmfine = data[i].gsx$pmfine.$t;
            }       
            myTable += "<tr><td>"+timestamp+"</td><td>"+temperature+"</td><td>"+relativehumidity+"</td><td>"+pmfine+"</td></tr>";
          }
```
Write the ```myTable``` variable to the HTML document to display it.
```
document.write(myTable);
```

Finally, call the function that you just wrote beneath your declaration. 
```
displayData();
```

### The Full Code
This will go in the ```<script></script>``` tags of the HTML page.
```javascript
function getData(callback) {
        $.ajax({
          type: 'GET',
          url: 'https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values?alt=json',
          dataType: 'json',
          success: callback,
          error: function(e) {
            console.log("ERROR: Cannot get data from google sheets.");
            console.log(e);
          }
        });
      }   

      function displayData() {
        getData(function(response) {
          var data = response.feed.entry; //contains the array of data entries
          var myTable = "<table><tr><th>Timestamp</th><th>Temperature</th><th>Relative Humidity</th><th>PM 2.5</th></tr>";
          var timestamp, temperature, relativehumidity, pmfine;
          for (let i = 0; i < data.length; i++) {
            if (data[i].gsx$timestamp == null) {
              timestamp = "---";
            } else {
              timestamp = data[i].gsx$timestamp.$t;
            }
            if (data[i].gsx$temperaturec == null) {
              temperature = "---";
            } else {
              temperature = data[i].gsx$temperaturec.$t;
            }
            if (data[i].gsx$relativehumidity == null) {
              relativehumidity = "---";
            } else {
              relativehumidity = data[i].gsx$relativehumidity.$t;
            }
            if (data[i].gsx$pmfine == null) {
              pmfine = "---";
            } else {
              pmfine = data[i].gsx$pmfine.$t;
            }       
            myTable += "<tr><td>"+timestamp+"</td><td>"+temperature+"</td><td>"+relativehumidity+"</td><td>"+pmfine+"</td></tr>";
          }
          document.write(myTable);  
        });

      }

      displayData();
```

## Step Five: Rendering the Webpage
* ```cd``` into the directory containing the webpage
* Start your server
	* For python3, type the command ```python3 -m http.server```
	* For python2, type the command ```python -m SimpleHTTPServer```
* Go to your browser and type ```localhost:8080```

## Template Webpage
```html
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  </head>
  <body>
    <h1>Example Webpage</h1>
    <script>
    //Your code goes here.

    
    </script>

  </body>
</html>
```
