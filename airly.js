	//Get today's date in Month Day, Year format	//Get today's date in Month Day, Year format
	function showDate() {
		//est offset is -5
		var date = moment().utcOffset('-0500').format();
		var day = date.substring(8,10);
		var month = date.substring(5,7);
		var year = date.substring(0,4);
		document.getElementById("date").innerHTML = year + "-" + month + "-" + day;
	}

	//Get max date for form input
	function maxDate() {
		var date = moment().utcOffset('-0500').format();
		var day = date.substring(8,10);
		var month = date.substring(5,7);
		var year = date.substring(0,4);
		return year + "-" + month + "-" + day;
	}

	//Set max date and value for form input
	function setDateInput() {
		document.getElementById("start").value = maxDate();
        document.getElementById("start").max = maxDate();
	}

	/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
	function openNav() {
		document.getElementById("mySidebar").style.width = "250px";
		document.getElementsByTagName("body")[0].style.marginLeft = "250px";
		setTimeout(function() {
			object.chart.rawChart.reflow();
			object.chart.hourlyChart.reflow();
		}, 500);
	}
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
	function closeNav() {
		document.getElementById("mySidebar").style.width = "0";
		document.getElementsByTagName("body")[0].style.marginLeft = "0";
		setTimeout(function() {
			object.chart.rawChart.reflow();
			object.chart.hourlyChart.reflow();
		}, 500);
	
	}

	//Function to generate the Ajax url 
	//Use spreadsheet if year and month are in current month/year, otherwise get csv file
	function generateUrl(newDate) {
		var year = newDate.substring(0,4);
		var month = newDate.substring(5,7);
		var day = newDate.substring(8,10);
		if (month.charAt(0) == '0') month = month.charAt(1);
		//if (day.charAt(0) == '0') day = day.charAt(1);
		day = parseInt(day);
		var url = "";
		var date = new Date();
		
		if (year == date.getFullYear() && month == date.getMonth() + 1) {
			var sheet = date.getDate() - day + 1;
			url = "https://sheets.googleapis.com/v4/spreadsheets/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/values/" + sheet +  "?alt=json&key=AIzaSyApYp7Gpkqffme7oOHgBqCOhRDSQoaZKCM";
		} else {
			url = "airly-data/" + newDate.substring(0,7) + "/" + newDate + ".csv";
		}
		return url;
	}

	//Function to change date
	function dateChange(obj, newDate) {
		document.getElementById("date").innerHTML = newDate;
		averages(generateUrl(newDate), newDate);
		initChart(obj, generateUrl(newDate), newDate);
	}

	//display PM10, PM2.5, temperature, relative humidity averages for the current day 
	function averages(url, thisDate) {
		console.log("URL: " + url);
		//fix for google sheets algorithm: get only current day on spreadsheet1
		var date = new Date();
		var day = (date.getDate()).toString();
		var month = (1 + date.getMonth()).toString();
		var year = date.getFullYear();

		if (day.length == 1) day = "0" + day;
		if (month.length == 1) month = "0" + month;
		var dateString = year + "-" + month + "-" + day;

		//variables for current daily averages
		var pmfinesum = 0;
		var pmfinetot = 0;
		var tempsum = 0;
		var temptot = 0;
		var rhsum = 0;
		var rhtot = 0;

		//If date is in google spreadsheet, use this method to get data
		if (url.substring(0,20) == 'https://sheets.googl') {


			$.getJSON(url, function(data) {
				var entry = data.feed.entry;
				var count = 0; //check if there exists data for current day 

				$(entry).each(function() {
					//fix to google sheets algorithm
					var timestamp = this.$timestamp.substring(0,10);
					if (thisDate == dateString) {
						if (timestamp != dateString) return;
					}

					
					count++;
					var pmfine = this.$pmfine;
					var rhStr = this.relativehumidity;
					var temperatureStr = this.gsx$temperaturec.$t;
		
					var pmfinenum = parseFloat(pmfine);
					var rh = parseFloat(rhStr);
					var temperature = parseFloat(temperatureStr);

					
					if (pmfine != '0' && pmfine != '') {
						pmfinesum += pmfinenum;
						pmfinetot++;
					}
					
					if (rhStr != '0' && rhStr != '') {
						rhsum += rh;
						rhtot++;
					}

					if (temperatureStr != '0' && temperatureStr != '') {
						tempsum += temperature;
						temptot++;
					}

					var pmfineavg;
					var tempavg;
					var rhavg;


					if (pmfinetot != 0) {
						pmfineavg = (pmfinesum/pmfinetot).toFixed(2) + " \u03BCg/m\u00B3";
					} else {
						pmfineavg = "No Data";

					}
					
					if (temptot != 0) {
						tempavg = (tempsum/temptot).toFixed(2) + " &deg;C";
					} else {
						tempavg = "No Data";
					}

					if (rhtot != 0) {
						rhavg = (rhsum/rhtot).toFixed(2) + "%";
					} else {
						rhavg = "No Data";
					}
					
					document.getElementById("pm25").innerHTML = pmfineavg;
					document.getElementById("temperature").innerHTML = tempavg;
					document.getElementById("relhumid").innerHTML = rhavg;


				});
					//output no data if there exists no data for current day
					if (count == 0) {
					document.getElementById("pm25").innerHTML = "No Data";
					document.getElementById("temperature").innerHTML = "No Data";
					document.getElementById("relhumid").innerHTML = "No Data";
					}
			});
			//else, get and read the csv file
		} else {
			getCsv(url, function(data) {
				var allTextLines = data.split(/\r\n|\n/);
				var headers = allTextLines[0].split(',');
				var lines = [];
				for (let i = 1; i < allTextLines.length; i++) {
					var txt = allTextLines[i].split(',');
					if (txt.length == headers.length) {
						lines.push(txt);
					}
				}
				for (let j = 0; j < lines.length; j++) {
					if (lines[j][6]!= '0' && lines[j][6] != '') {
						pmfinesum += Number(lines[j][6]);
						pmfinetot++;
					}
					if (lines[j][1] != '0' && lines[j][1] != '') {
						tempsum += Number(lines[j][1]);
						temptot++;
					}
					if (lines[j][2] != '0' && lines[j][2] != '') {
						rhsum += Number(lines[j][2]);
						rhtot++;
					}
				}
				pmfineavg = (pmfinesum / pmfinetot).toFixed(2) + " \u03BCg/m\u00B3";
				tempavg = (tempsum / temptot).toFixed(2) + " &deg;C";
				rhavg = (rhsum / rhtot).toFixed(2) + "%";
		
				document.getElementById("pm25").innerHTML = pmfineavg;
				document.getElementById("temperature").innerHTML = tempavg;
				document.getElementById("relhumid").innerHTML = rhavg;
			});
		}
	}

	var object = {
		name: "Date",
		elementIds: {
			"raw": "rawChartContainer",
			"hourly": "hourlyChartContainer"
		},
		chart: {
			rawChart: null,
			hourlyChart: null
		},
		rawdata: {
			json: null,
			formattedData: null,
			rh: null,
			temp: null,
			pm25: null,
			standard: null,
			clickedTimes: []
		},
		hourlydata: {
			json: null,
			formattedData: null,
			rh: null,
			temp: null,
			pm25: null,
			standard: null,
			clickedTimes: []
		}
		
	};

	//Wait spinner while chart loading
	function waitSpinner(divId, text) {
		html = [
			'<div style="position:relative;text-align:center;">',
			'<img src="images/waitspinner.gif"/>',
			(text || ''),
			'</div>'
		];
		$("#"+divId).html(html.join(''));
	}

	//Get raw data
	function getRawData(obj, url, callback) {
		console.log("Get raw data");
		$.ajax({
			method: "GET",
			url: url,
			dataType: "json",
			success: callback,
			error: function() {
				console.log("Error: cannot get raw data");
			}
		})
	}

	//Options for raw chart
	RawChartOptions = function(obj) {

		return {
			chart: {
				renderTo: obj.elementIds["raw"],
				zoomType: 'x',
				resetZoomButton: {theme: {display: 'none', visibility: 'hidden'}},
				events: {
					click: function (event) {

					}
				}
			},
			credits: {
				enabled: false
			},
			title: {
				text: "Current Day Data"
			},
			plotOptions: {
				series: {
					marker: {
						enabled: false
					}
				}
			},
			xAxis: {
				title: {
					text: 'Hour'
				},
				labels: {
					rotation: -45
				},
				startOnTick: false,
				endOnTick: false,
				showLastLabel: true
			},
			yAxis: [{

				labels: {
					format: '{value}\u03BCg/m\u00B3',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: 'Particulate Matter',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
			}, {
				labels: {
					format: '{value}°C',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				title: {
					text: 'Temperature',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				opposite: true
			}, {
				labels: {
					format: '{value}%',
					style: {
						color: Highcharts.getOptions().colors[2]
					}
				},
				title: {
					text: 'Relative Humidity',
					style: {
						color: Highcharts.getOptions().colors[2]
					}
				},
				opposite: true
			}],
			tooltip: {
				shared: true
			},
			series: [{
				name: 'Temperature',
				color: Highcharts.getOptions().colors[0],
				data: obj.rawdata.temp,
				yAxis: 1,
				tooltip: {
					valueSuffix: '°C'
				}
			}, {
				name: 'Relative Humidity',
				data: obj.rawdata.rh,
				yAxis: 2,
				color: Highcharts.getOptions().colors[2],
				tooltip: {
					valueSuffix: '%'
				}
			}, {
				name: 'PM<sub>2.5</sub>',
				data: obj.rawdata.pm25,
				color: Highcharts.getOptions().colors[1],
				tooltip: {
					valueSuffix: '\u03BCg/m\u00B3'
				}
			}]
		};
	}

	HourlyChartOptions = function(obj) {
		return {
			chart: {
				renderTo: obj.elementIds["hourly"],
				zoomType: 'x',
				resetZoomButton: {theme: {display: 'none', visibility: 'hidden'}},
				events: {
					click: function (event) {

					}
				}
			},
			credits: {
				enabled: false
			},
			title: {
				text: "Hourly Averages"
			},
			plotOptions: {
				series: {
					marker: {
						enabled: false
					}
				}
			},
			xAxis: {
				title: {
					text: 'Hour'
				},
				labels: {
					rotation: -45
				},
				startOnTick: false,
				endOnTick: false,
				showLastLabel: true
			},
			yAxis: [{
				labels: {
					format: '{value}\u03BCg/m\u00B3',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: 'Particulate Matter',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
			}, {
				labels: {
					format: '{value}°C',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				title: {
					text: 'Temperature',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				opposite: true
			}, {
				labels: {
					format: '{value}%',
					style: {
						color: Highcharts.getOptions().colors[2]
					}
				},
				title: {
					text: 'Relative Humidity',
					style: {
						color: Highcharts.getOptions().colors[2]
					}
				},
				opposite: true
			}],
			tooltip: {
				shared: true
			},
			series: [{
				name: 'Temperature',
				data: obj.hourlydata.temp,
				color: Highcharts.getOptions().colors[0],
				yAxis: 1,
				tooltip: {
					valueSuffix: '°C'
				}
			}, {
				name: 'Relative Humidity',
				data: obj.hourlydata.rh,
				color: Highcharts.getOptions().colors[2],
				yAxis: 2,
				tooltip: {
					valueSuffix: '%'
				}
			}, {
				name: 'PM<sub>2.5</sub>',
				data: obj.hourlydata.pm25,
				color: Highcharts.getOptions().colors[1],
				tooltip: {
					valueSuffix: '\u03BCg/m\u00B3'
				}
			}]
		};
	}

	//Create Raw Data Chart
	function createRawChart(obj) {
		console.log("Create raw chart");
		var chart = obj.chart.rawChart;
		if (chart && chart.destroy) chart.destroy();
		var options = new RawChartOptions(obj);
		return new Highcharts.chart(
			options,
			function(chart) {
				//Put cross hair handler here
			}
		)
	}

	//Create Hourly Data Chart
	function createHourlyChart(obj) {
		console.log("Create hourly chart");
		var chart = obj.chart.hourlyChart;
		if (chart && chart.destroy) chart.destroy();
		var options = new HourlyChartOptions(obj);
		return new Highcharts.chart(
			options,
			function(chart) {
				//Put cross hair handler here
			}
		)
	}


	//Initialize chart
	function initChart(obj, url, thisDate) {
		console.log("Initialize chart");
		if (url.substring(0,20) == 'https://spreadsheets') {
			getRawData(obj, url, function(data) {
				var datafine = [];
				var relhum = [];
				var temperature = [];
				
				var date = new Date();
				var day = (date.getDate()).toString();
				var month = (1 + date.getMonth()).toString();
				var year = date.getFullYear();

				if (day.length == 1) day = "0" + day;
				if (month.length == 1) month = "0" + month;
				var dateString = year + "-" + month + "-" + day;

					var entry = data.feed.entry;

					$(entry).each(function() {
						var timestamp = (this.gsx$timestamp.$t).substring(0,10);
						if (thisDate == dateString) {
							if (timestamp != dateString) return;
						}
						var pmfine = parseFloat(this.gsx$pmfine.$t);
						//var pm10 = this.gsx$pm10.$t;
						var time = this.gsx$timestamp.$t;
						var temp = parseFloat(this.gsx$temperaturec.$t);
						var rh = parseFloat(this.gsx$relativehumidity.$t);

						pmfine = pmfine.toFixed(2);
						temp = temp.toFixed(2);
						rh = rh.toFixed(2);

						//turn time string into a number
						var hour;
						var min;

						if (time.charAt(11) == '0') {
							hour = parseInt(time.charAt(12));
						} else {
							hour = parseInt(time.charAt(11) + time.charAt(12));
						}
						if (time.charAt(14) == '0') {
							min = parseInt(time.charAt(15));
						} else {
							min = parseInt(time.charAt(14) + time.charAt(15));
						}
						var timeNum = (((hour*60) + min) / 60.0).toFixed(2); 

						if (pmfine != '0' && pmfine != '') datafine.push([parseFloat(timeNum), parseFloat(pmfine)]);
						if (temp != '0' && temp != '') temperature.push([parseFloat(timeNum), parseFloat(temp)]);
						if (rh != '0' && rh != '') relhum.push([parseFloat(timeNum), parseFloat(rh)]);
					});
				obj.rawdata.rh = relhum;
				obj.rawdata.temp = temperature;
				obj.rawdata.pm25 = datafine;
				obj.chart.rawChart = createRawChart(obj);
			})

			getRawData(obj, url, function(data) {
				var date = new Date();
				var day = (date.getDate()).toString();
				var year = date.getFullYear();
				var month = (1 + date.getMonth()).toString();
				
				if (month.length == 1) month = "0" + month;
				if (day.length == 1) day = "0" + day;
				var dateString = year + "-" + month + "-" + day;

				// pm, rh, temp counts
				//var pm10arr = [];
				var pmfinearr = [];
				var relhumid = [];
				var temperature = [];

				//total datapoints counts
				//var pm10tot = [];
				var pmfinetot = [];
				var temptot = [];
				var rhtot = [];

				//initialize arrays with 0
				for (let i = 0; i < 24; i++) {
					//pm10arr[i] = 0;
					pmfinearr[i] = 0;
					//pm10tot[i] = 0;
					pmfinetot[i] = 0;
					temperature[i] = 0;
					temptot[i] = 0;
					relhumid[i] = 0;
					rhtot[i] = 0;
				}

				var entry = data.feed.entry;

				$(entry).each(function() {
					var timestamp = (this.gsx$timestamp.$t).substring(0,10);
					if (thisDate == dateString) {
						if (timestamp != dateString) return;
					}
					//var pm10 = this.gsx$pm10.$t;
					var pmfine = this.gsx$pmfine.$t;
					var temp = this.gsx$temperaturec.$t;
					var rh = this.gsx$relativehumidity.$t;
					var time = this.gsx$timestamp.$t;
					
					//var pm10num;
					var pmfinenum;
					var tempnum;
					var rhnum;
					/*
					if (pm10 == "") {
						pm10num = 0;
					} else {
						pm10num = parseFloat(pm10);
					}*/
					
					if (pmfine == "") {
						pmfinenum = 0;
					} else {
						pmfinenum = parseFloat(pmfine);
					}
					
					if (temp == "") {
						tempnum = 0;
					} else {
						tempnum = parseFloat(temp);
					}
					
					if (rh == "") {
						rhnum = 0;
					} else {
						rhnum = parseFloat(rh);
					}
					
					//get hour from timestamp
					var hour;
					if (time.charAt(11) == '0') {
						hour = parseInt(time.charAt(12));
					} else {
						hour = parseInt(time.charAt(11) + time.charAt(12));
					}
		
					//pm10arr[hour] += pm10num;
					pmfinearr[hour] += pmfinenum;
					temperature[hour] += tempnum;
					relhumid[hour] += rhnum;

					//if (pm10 != '0' && pm10 != "") pm10tot[hour]++;
					if (pmfine != '0' && pmfine != "") pmfinetot[hour]++;
					if (temp != '0' && temp != "") temptot[hour]++;
					if (rh != '0' && rh != "") rhtot[hour]++;
				});


				var pmfineavg = [];
				var tempavg = [];
				var rhavg = [];

				for (let i = 0; i < 24; i++) {
					//variables for averages for each hour, 0-24
					//var pm10avg;
					var temppmfine;
					var temptemp;
					var temprh;
					
					//if total array is empty, there is no data 
					//else, get the average for the hour 
					if (pmfinetot[i] != 0) {
						temppmfine = (pmfinearr[i] / pmfinetot[i]);
						temppmfine = temppmfine.toFixed(2);
						pmfineavg.push([parseFloat(i), parseFloat(temppmfine)]);
					} 
					if (temptot[i] != 0) {
						temptemp = (temperature[i] / temptot[i]);
						temptemp = temptemp.toFixed(2);
						tempavg.push([parseFloat(i), parseFloat(temptemp)]);
					} 
					if (rhtot[i] != 0) {
						temprh = (relhumid[i] / rhtot[i]);
						temprh = temprh.toFixed(2);
						rhavg.push([parseFloat(i), parseFloat(temprh)]);
					} 
				}
				obj.hourlydata.rh = rhavg;
				obj.hourlydata.temp = tempavg;
				obj.hourlydata.pm25 = pmfineavg;
				obj.chart.hourlyChart = createHourlyChart(obj);

			})
		} else {
			//handle for csv here
			getCsv(url, function(data) {
				var allTextLines = data.split(/\r\n|\n/);
				var headers = allTextLines[0].split(',');
				var lines = [];
				for (let i = 1; i < allTextLines.length; i++) {
					var txt = allTextLines[i].split(',');
					if (txt.length == headers.length) {
						lines.push(txt);
					}
				}

				var datafine = [];
				var relhum = [];
				var temperature = [];

				for (let j = 0; j < lines.length; j++) {
					var time = lines[j][0];
					var pmfine = parseFloat(lines[j][6]).toFixed(2);
					var temp = parseFloat(lines[j][1]).toFixed(2);
					var rh = parseFloat(lines[j][2]).toFixed(2);

					//turn timestring into an hour
					var hour;
					var min;

					if (time.charAt(11) == '0') {
						hour = parseInt(time.charAt(12));
					} else {
						hour = parseInt(time.charAt(11) + time.charAt(12));
					}
					if (time.charAt(14) == '0') {
						min = parseInt(time.charAt(15));
					} else {
						min = parseInt(time.charAt(14) + time.charAt(15));
					}
					var timeNum = (((hour*60) + min) / 60.0).toFixed(2); 
					if (pmfine != '0' && pmfine != '') datafine.push([parseFloat(timeNum), parseFloat(pmfine)]);
					if (temp != '0' && temp != '') temperature.push([parseFloat(timeNum), parseFloat(temp)]);
					if (rh != '0' && rh != '') relhum.push([parseFloat(timeNum), parseFloat(rh)]);
				}
				obj.rawdata.rh = relhum;
				obj.rawdata.temp = temperature;
				obj.rawdata.pm25 = datafine;
				obj.chart.rawChart = createRawChart(obj);					
			})

			getCsv(url, function(data) {
				var allTextLines = data.split(/\r\n|\n/);
				var headers = allTextLines[0].split(',');
				var lines = [];
				for (let i = 1; i < allTextLines.length; i++) {
					var txt = allTextLines[i].split(',');
					if (txt.length == headers.length) {
						lines.push(txt);
					}
				}
				// pm, rh, temp counts
				//var pm10arr = [];
				var pmfinearr = [];
				var relhumid = [];
				var temperature = [];

				//total datapoints counts
				//var pm10tot = [];
				var pmfinetot = [];
				var temptot = [];
				var rhtot = [];

				//initialize arrays with 0
				for (let i = 0; i < 24; i++) {
					pmfinearr[i] = 0;
					pmfinetot[i] = 0;
					temperature[i] = 0;
					temptot[i] = 0;
					relhumid[i] = 0;
					rhtot[i] = 0;
				}
				
				for (let j = 0; j < lines.length; j++) {
					var hour = parseInt((lines[j][0]).substring(11,13));
					if (lines[j][6] != '0' && lines[j][6] != '') {
						pmfinearr[hour] += (parseFloat(lines[j][6]));
						pmfinetot[hour]++;
					}
					if (lines[j][1] != '0' && lines[j][1] != '') {
						temperature[hour] += (parseFloat(lines[j][1]));
						temptot[hour]++;
					}
					if (lines[j][2] != '0' && lines[j][2] != '') {
						relhumid[hour] += (parseFloat(lines[j][2]));
						rhtot[hour]++;
					}
				}

				//arrays for the averages
				var pmfineavg = [];
				var tempavg = [];
				var relhumidavg = [];

				//iterate through sum arrays and get avgs for each hour
				for (let k = 0; k < 24; k++) {
					var pm;
					var t;
					var rh;

					if (pmfinetot[k] != 0) {
						pm = (pmfinearr[k] / pmfinetot[k]).toFixed(2);
						pmfineavg.push([parseInt(k), parseFloat(pm)]);
					}
					if (temptot[k] != 0) {
						t = (temperature[k] / temptot[k]).toFixed(2);
						tempavg.push([parseInt(k), parseFloat(t)]);
					}
					if (rhtot[k] != 0) {
						rh = (relhumid[k] / rhtot[k]).toFixed(2);
						relhumidavg.push([parseInt(k), parseFloat(rh)]);
					}
				}
				obj.hourlydata.rh = relhumidavg;
				obj.hourlydata.temp = tempavg;
				obj.hourlydata.pm25 = pmfineavg;
				obj.chart.hourlyChart = createHourlyChart(obj);
			})
		}
	}

	//Get csv data
	function getCsv(url, callback) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'text',
			success: callback,
			error: function() {
				console.log("ERROR: Cannot get csv file.");
				document.getElementById("pm25").innerHTML = "No Data";
				document.getElementById("temperature").innerHTML = "No Data";
				document.getElementById("relhumid").innerHTML = "No Data";
				object.rawdata.rh = null;
				object.rawdata.temp = null;
				object.rawdata.pm25 = null;
				object.chart.rawChart = createRawChart(object);	
				object.hourlydata.rh = null;
				object.hourlydata.temp = null;
				object.hourlydata.pm25 = null;
				object.chart.hourlyChart = createHourlyChart(object);	
			}
		});
	}

	


	
