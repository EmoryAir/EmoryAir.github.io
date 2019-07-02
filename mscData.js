//get today's date in Month Day, Year format
	function showDate() {
		var date = new Date();
		var day = date.getDate();
		var year = date.getFullYear();
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var month = months[date.getMonth()];

		document.getElementById("date").innerHTML = month + " " + day + ", " + year;
	}

	//display PM10, PM2.5, temperature, relative humidity averages for the current day 
	function averages() {
		
		//fix for google sheets algorithm: get only current day on spreadsheet1
		var date = new Date();
		var day = (date.getDate()).toString();
		var month = (1 + date.getMonth()).toString();
		var year = date.getFullYear();

		if (day.length == 1) day = "0" + day;
		if (month.length == 1) month = "0" + month;
		var dateString = year + "-" + month + "-" + day;
		
		var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		//var spreadsheetID = "1JI6X71ukHWQN9AlNA__5JRt85Z2xnx_X1s_Vn5xfG7g";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json";
		console.log(url);

		//variables for current daily averages
		var pmfinesum = 0;
		//var pm10sum = 0;
		var pmfinetot = 0;
		//var pm10tot = 0;
		var tempsum = 0;
		var temptot = 0;
		var rhsum = 0;
		var rhtot = 0;

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;
			var count = 0; //check if there exists data for current day 

			$(entry).each(function() {
				//fix to google sheets algorithm
				var timestamp = (this.gsx$timestamp.$t).substring(0,10);
				if (timestamp != dateString) return;
				
				count++;
				var pmfine = this.gsx$pmfine.$t;
				//var pm10 = this.gsx$pm10.$t;
				var rhStr = this.gsx$relativehumidity.$t;
				var temperatureStr = this.gsx$temperaturec.$t;
	
				//var pm10num = parseFloat(pm10);
				var pmfinenum = parseFloat(pmfine);
				var rh = parseFloat(rhStr);
				var temperature = parseFloat(temperatureStr);

				//to get avg
				/*
				if (pm10 != '0' && pm10 != '') {
					pm10sum += pm10num;
					pm10tot++;
				}*/
				
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

				//var pm10avg;
				var pmfineavg;
				var tempavg;
				var rhavg;
/*
				if (pm10tot != 0) {
					pm10avg = (pm10sum/pm10tot).toFixed(2) + " \u03BCg/m\u00B3";
				} else {
					pm10avg = "No Data";
				}*/

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


	}

	var object = {
		name: "Time Period",
		elementIds: {
			"raw": "rawChartContainer"
		},
		chart: null,
		data: {
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
	function getRawData(obj, callback) {
		console.log("Get raw data");
		$.ajax({
			method: "GET",
			url: "https://spreadsheets.google.com/feeds/list/1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI/1/public/values?alt=json",
			dataType: "json",
			success: callback,
			error: function() {
				console.log("Error: cannot get raw data");
			}
		})
	}

	//Format Json
	function formatJson(json) {
		var series = [];

	}

	//Options for raw chart
	RawChartOptions = function(obj) {

		return {
			chart: {
				renderTo: obj.elementIds["raw"],
				zoomType: 'x',
				resetZooButton: {theme: {display: 'none', visibility: 'hidden'}},
				events: {
					click: function (event) {

					}
				}
			},
			credits: {
				enabled: false
			},
			title: {
				text: obj.name
			},
			xAxis: {
				labels: {
					rotation: -45
				},
				startOnTick: false,
				endOnTick: false,
				showLastLabel: true
			},
			yAxis: {
				startOnTick: false,
				endOnTick: false,
				showLastLabel: true
			},
			tooltip: {
				shared: true
			},
			series: [{
				name: 'Temperature',
				data: obj.data.temp
			}, {
				name: 'Relative Humidity',
				data: obj.data.rh
			}, {
				name: 'PM2.5',
				data: obj.data.pm25
			}]
		};
	}

	//Create Raw Data Chart
	function createRawChart(obj) {
		console.log("Create raw chart");
		var chart = obj.chart;
		if (chart && chart.destroy) chart.destroy();
		var options = new RawChartOptions(obj);
		return new Highcharts.chart(
			options,
			function(chart) {
				//Put cross hair handler here
			}
		)
	}

	//Initialize chart
	function initChart(obj) {
		console.log("Initialize chart");
		waitSpinner(obj.elementIds["raw"], "Calculating chart for " + obj.name);
		getRawData(obj, function(data) {
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
				console.log(dateString);

				$(entry).each(function() {
					var timestamp = (this.gsx$timestamp.$t).substring(0,10);
					console.log(timestamp);
					if (timestamp != dateString) return;
					var pmfine = this.gsx$pmfine.$t;
					//var pm10 = this.gsx$pm10.$t;
					var time = this.gsx$timestamp.$t;
					var temp = this.gsx$temperaturec.$t;
					var rh = this.gsx$relativehumidity.$t;

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
			obj.data.rh = relhum;
			console.log(obj.data.rh);
			obj.data.temp = temperature;
			obj.data.pm25 = datafine;
			obj.chart = createRawChart(obj);
		})
	}


	




