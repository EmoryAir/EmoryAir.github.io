//get today's date in Month Day, Year format
	function showDate() {
		var date = new Date();
		var day = date.getDate();
		var year = date.getFullYear();
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var month = months[date.getMonth()];

		document.getElementById("dataAnalytics").rows[1].cells[0].innerHTML = month + " " + day + ", " + year;
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

		//var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var spreadsheetID = "1JI6X71ukHWQN9AlNA__5JRt85Z2xnx_X1s_Vn5xfG7g";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

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
				
				//document.getElementById("dataAnalytics").rows[1].cells[1].innerHTML = pm10avg;
				document.getElementById("dataAnalytics").rows[1].cells[1].innerHTML = pmfineavg;
				document.getElementById("dataAnalytics").rows[1].cells[2].innerHTML = tempavg;
				document.getElementById("dataAnalytics").rows[1].cells[3].innerHTML = rhavg;
				
			});
				//output no data if there exists no data for current day
				if (count == 0) {
				document.getElementById("dataAnalytics").rows[1].cells[1].innerHTML = "No Data";
				document.getElementById("dataAnalytics").rows[1].cells[2].innerHTML = "No Data";
				document.getElementById("dataAnalytics").rows[1].cells[3].innerHTML = "No Data";
				//document.getElementById("dataAnalytics").rows[1].cells[4].innerHTML = "No Data";
				}
		});


	}


	//Current Day table, graph, current avg

	function currDayGraph() {
		var data10 = [];
		var datafine = [];
		var relhum = [];
		var temperature = [];
		
		var chart = new CanvasJS.Chart("currDayGraph", {
			
		title: {
			text: "",
		},
		axisX:{
			title: "time (hour)",
			interval: 1,
			intervalType: "hour",
			maximum: 25,
			minimum: 8,
		},
		axisY: 
			{
				title: "\u03BC" + "g/m" + "\u00B3",
				title: "PM (\u03BCg/m\u00B3)",
			},
		axisY2: [
			{
				title: "Relative Humidity (%)",
				lineColor:"red",
				labelFontColor:"red",
				titleFontColor:"red",
			},
			{
				title: "Temperature (Celsius)",
				lineColor:"green",
				labelFontColor:"green",
				titleFontColor:"green",
			}
		],
		toolTip: {
			shared:true,
		},
		legend: {
			cursor:"pointer",
			itemclick: toggleDataSeries,
		},
		
		data: [
			{
			type: "scatter",
			showInLegend: true,
			name: "PM10",
			legendText: "PM10",
			markerColor: "black",
			markerSize: 3,
			dataPoints : data10,
		},
			{
			type: "scatter",
			showInLegend: true,
			name:"PM2.5",
			legendText: "PM2.5",
			markerColor: "blue",
			markerSize: 3,
			dataPoints: datafine,
		},
			{
			type: "scatter",
			axisYindex: 1,
			axisYType: "secondary",
			showInLegend: true,
			name:"Temperature",
			legendText: "Temperature(C)",
			markerColor: "green",
			markerSize: 3,
			dataPoints: temperature,
		},
			{
			type: "scatter",
			axisYindex: 0,
			axisYType: "secondary",
			showInLegend: true,
			name:"Relative Humidity",
			legendText: "Relative Humidity(%)",
			markerColor: "red",
			markerSize: 3,
			dataPoints: relhum,
		}
		]
		});
		
		var date = new Date();
		var day = (date.getDate()).toString();
		var month = (1 + date.getMonth()).toString();
		var year = date.getFullYear();

		if (day.length == 1) day = "0" + day;
		if (month.length == 1) month = "0" + month;
		var dateString = year + "-" + month + "-" + day;

		//var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var spreadsheetID = "1JI6X71ukHWQN9AlNA__5JRt85Z2xnx_X1s_Vn5xfG7g";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var timestamp = (this.gsx$timestamp.$t).substring(0,10);
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

				//if pm10 != 0, plot on graph 
				//if pmfine != 0, plot on graph
				//if temp != 0, plot on graph
				//if relhumi != 0, plot on graph
				//if (pm10 != '0' && pm10 != '') data10.push({x: timeNum, y: parseFloat(pm10)});
				if (pmfine != '0' && pmfine != '') datafine.push({x: timeNum, y: parseFloat(pmfine)});
				if (temp != '0' && temp != '') temperature.push({x: timeNum, y: parseFloat(temp)});
				if (rh != '0' && rh != '') relhum.push({x: timeNum, y: parseFloat(rh)});
				

			});

			chart.render();

		});


	}

	//Current Day table
	function currDay() {

		$('#currDay').append(
				'<tr><th>Timestamp</th>' + 
				'<th>Temperature&deg;C</th>' +
				'<th>Relative Humidity (%)</th>' +
				'<th>PM<sub>2.5</sub> (\u03BCg/m\u00B3)</th>' +
				//'<th>PM<sub>10</sub> (\u03BCg/m\u00B3)</th>' +
				'<th>Time</th>' +
				'</tr>' );

		var date = new Date();
		var day = (date.getDate()).toString();
		var month = (1 + date.getMonth()).toString();
		var year = date.getFullYear();

		if (day.length == 1) day = "0" + day;
		if (month.length == 1) month = "0" + month;
		var dateString = year + "-" + month + "-" + day;
		//load json data from server using get http request
		//parameters: url, callback (function executed when data is loaded)
		//var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var spreadsheetID = "1JI6X71ukHWQN9AlNA__5JRt85Z2xnx_X1s_Vn5xfG7g";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;
			var count = 0;

			$(entry).each(function() {
				var timestamp = (this.gsx$timestamp.$t).substring(0,10);
				if (timestamp != dateString) return;
				count++;
				var timestamp = this.gsx$timestamp.$t;
				var temp = this.gsx$temperaturec.$t;
				var rh = this.gsx$relativehumidity.$t;
				var pmfine = this.gsx$pmfine.$t;
				//var pm10 = this.gsx$pm10.$t;
				var time = this.gsx$time.$t;

				//var pm10num = parseFloat(pm10);
				var pmfinenum = parseFloat(pmfine);

				//display data on table, changing any 0 or null to dash lines
				if (timestamp == '') timestamp = '---';
				if (temp == '') temp = '---';
				if (rh == '') rh = '---';
				if (pmfine == '0' || pmfine == "") pmfine = '---';
				//if (pm10 == '0') pm10 = '---';
				if (time == '') time = '---';
			
				$('#currDay').append(
					'<tr><td>' + timestamp + 
					'</td><td>' + temp + 
					'</td><td>' + rh + 
					'</td><td>' + pmfine + 
					//'</td><td>' + pm10 + 
					'</td><td>' + time + 
					'</td></tr>');
			});
			//if no data exists, append empty row
			if (count == 0) {
				$('#currDay').append('<tr><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>');
			}
	
		});
	}

	//hourly averaged over current 
	function hourly() {

		$('#hourly').append(
				'<tr><th>Hour</th><th>Average Temperature &deg;C</th><th>Average Relative Humidity (%)</th><th>Average PM<sub>2.5</sub> (\u03BCg/m\u00B3)</th></tr>'
				);

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

		//ajax request
		//var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var spreadsheetID = "1JI6X71ukHWQN9AlNA__5JRt85Z2xnx_X1s_Vn5xfG7g";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var timestamp = (this.gsx$timestamp.$t).substring(0,10);
				if (timestamp != dateString) return;
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

				for (let i = 0; i < 24; i++) {
					//variables for averages for each hour, 0-24
					//var pm10avg;
					var pmfineavg;
					var tempavg;
					var rhavg;
					
					//if total array is empty, there is no data 
					//else, get the average for the hour 
					/*
					if (pm10tot[i] == 0) {
						pm10avg = '---';
					} else {
						pm10avg = (pm10arr[i] / pm10tot[i]);
						pm10avg = pm10avg.toFixed(2);
					}*/
					
					if (pmfinetot[i] == 0) {
						pmfineavg = '---';
					} else {
						pmfineavg = (pmfinearr[i] / pmfinetot[i]);
						pmfineavg = pmfineavg.toFixed(3);
					}
					
					if (temptot[i] == 0) {
						tempavg = '---';
					} else {
						tempavg = (temperature[i] / temptot[i]);
						tempavg = tempavg.toFixed(2);
					}
					
					if (rhtot[i] == 0) {
						rhavg = '---';
					} else {
						rhavg = (relhumid[i] / rhtot[i]);
						rhavg = rhavg.toFixed(2);
					}
					
					//append averages to graph
					if (i < 10) {
						$('#hourly').append(
						'<tr><td>' + '0' + i + ':00</td><td>' + tempavg + '</td><td>' + rhavg + '</td><td>' + pmfineavg + '</td></tr>'
						);
					} else {
						$('#hourly').append(
						'<tr><td>' + i + ':00</td><td>' + tempavg + '</td><td>' + rhavg + '</td><td>' + pmfineavg + '</td></tr>'
						);
					}

				}
		});
	}
	
	//graph for hourly averages
	function hourlyGraph() {
		var date = new Date();
		var day = (date.getDate()).toString();
		var year = date.getFullYear();
		var month = (1 + date.getMonth()).toString();
		
		if (month.length == 1) month = "0" + month;
		if (day.length == 1) day = "0" + day;
		var dateString = year + "-" + month + "-" + day;
		
		var data10 = [];
		var datafine = [];
		var datatemp = [];
		var datarh = [];
		var chart = new CanvasJS.Chart("hourlyGraph", {
			
		title: {
			text: "",
		},
		axisX:{
			title: "time (hour)",
			interval: 1,
			intervalType: "hour",
			maximum: 24
		},
			
		axisY:{
			title: "PM (\u03BCg/m\u00B3)",
		},
		axisY2: [
			{
				title: "Relative Humidity (%)",
				lineColor:"red",
				labelFontColor:"red",
				titleFontColor:"red",
			},
			{
				title: "Temperature (Celsius)",
				lineColor:"green",
				labelFontColor:"green",
				titleFontColor:"green",
			}
		],
		toolTip: {
			shared:true,
		},
		
		legend: {
			cursor:"pointer",
			itemclick: toggleDataSeries,
		},
		data: [
		{
			type: "line",
			showInLegend: true,
			name: "PM10",
			legendText: "PM10",
			markerColor: "black",
			lineColor: "black",
			dataPoints : data10,
		},
			{
			type: "line",
			showInLegend: true,
			name:"PM2.5",
			legendText: "PM2.5",
			markerColor: "blue",
			lineColor: "blue",
			dataPoints: datafine,
		},
			{
			type: "line",
			axisYindex: 1,
			axisYType: "secondary",
			showInLegend: true,
			name:"Temperature",
			legendText: "Temperature(C)",
			markerColor: "green",
			lineColor:"green",
			dataPoints: datatemp,
		},
			{
			type: "line",
			axisYindex: 0,
			axisYType: "secondary",
			showInLegend: true,
			name:"Relative Humidity",
			legendText: "Relative Humidity(%)",
			markerColor: "red",
			lineColor: "red",
			dataPoints: datarh,
		}
		]
		});

		// pm, temp, relhumid counts
		//var pm10arr = [];
		var pmfinearr = [];
		var temperature = [];
		var relhumid = [];

		//total datapoints counts
		//var pm10tot = [];
		var pmfinetot = [];
		var temptot = [];
		var rhtot = [];

		//initialize arrays
		for (let i = 0; i < 24; i++) {
			//pm10arr[i] = 0;
			pmfinearr[i] = 0;
			//pm10tot[i] = 0;
			pmfinetot[i] = 0;
			temperature[i] = 0;
			relhumid[i] = 0;
			temptot[i] = 0;
			rhtot[i] = 0;
		}

		//ajax request
		//var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var spreadsheetID = "1JI6X71ukHWQN9AlNA__5JRt85Z2xnx_X1s_Vn5xfG7g";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var timestamp = (this.gsx$timestamp.$t).substring(0,10);
				if (timestamp != dateString) return;
				//if (timestamp != tempTestDate) return;
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
				}
*/
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
				
				var hrStr = time.substring(11,13);
				var hour = parseInt(hrStr, 10);
				
				//pm10arr[hour] += pm10num;
				pmfinearr[hour] += pmfinenum;
				temperature[hour] += tempnum;
				relhumid[hour] += rhnum;

				//if (pm10 != '0' && pm10 != "") pm10tot[hour]++;
				if (pmfine != '0' && pmfine != "") pmfinetot[hour]++;
				if (temp != '0' && temp != "") temptot[hour]++;
				if (rh != '0' && rh != "") rhtot[hour]++;
			});


				for (var i = 0; i < 24; i++) {

					//var pm10avg;
					var pmfineavg;
					var tempavg;
					var rhavg;
/*
					if (pm10tot[i] != 0) {
						pm10avg = (pm10arr[i] / pm10tot[i]);
						data10.push({x: i, y: pm10avg});	
					} 
*/
					if (pmfinetot[i] != 0) {
						pmfineavg = (pmfinearr[i] / pmfinetot[i]);
						datafine.push({x:i, y:pmfineavg});
					} 
					if (temptot[i] != 0) {
						tempavg = (temperature[i] / temptot[i]);
						datatemp.push({x:i, y:tempavg});
					} 
					if (rhtot[i] != 0) {
						rhavg = (relhumid[i] / rhtot[i]);
						datarh.push({x:i, y:rhavg});
					} 
				}
				chart.render();
		});
	}

	//hourly averages over current month table
	function avgDay() {
		$('#avgDay').append(
				'<tr><th>Hour</th><th>Average Temperature &deg;C</th><th>Average Relative Humidity (%)</th><th>Average PM<sub>2.5</sub> (\u03BCg/m\u00B3)</th></tr>'
				);

		var date = new Date();
		var day = (date.getDate()).toString();
		var year = date.getFullYear();
		var month = (1 + date.getMonth()).toString();
		
		if (month.length == 1) month = "0" + month;
		if (day.length == 1) day = "0" + day;
		var dateString = month;

		// pm, temp, relhumid counts
		//var pm10arr = [];
		var pmfinearr = [];
		var temperature = [];
		var relhumid = [];

		//total datapoints counts
		//var pm10tot = [];
		var pmfinetot = [];
		var temptot = [];
		var rhtot = [];

		//initialize arrays
		for (let i = 0; i < 24; i++) {
			//pm10arr[i] = 0;
			pmfinearr[i] = 0;
			//pm10tot[i] = 0;
			pmfinetot[i] = 0;
			temperature[i] = 0;
			relhumid[i] = 0;
			temptot[i] = 0;
			rhtot[i] = 0;
		}

		//ajax request
		//var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var spreadsheetID = "1JI6X71ukHWQN9AlNA__5JRt85Z2xnx_X1s_Vn5xfG7g";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var timestamp = (this.gsx$timestamp.$t).substring(5,7);
				if (timestamp != dateString) return;
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


				for (var i = 0; i < 24; i++) {

					//var pm10avg;
					var pmfineavg;
					var tempavg;
					var rhavg;
/*
					if (pm10tot[i] == 0) {
						pm10avg = '---';
					} else {
						pm10avg = (pm10arr[i] / pm10tot[i]);
						pm10avg = pm10avg.toFixed(2);
					}*/
					if (pmfinetot[i] == 0) {
						pmfineavg = '---';
					} else {
						pmfineavg = (pmfinearr[i] / pmfinetot[i]);
						pmfineavg = pmfineavg.toFixed(2);
					}
					if (temptot[i] == 0) {
						tempavg = '---';
					} else {
						tempavg = (temperature[i] / temptot[i]);
						tempavg = tempavg.toFixed(2);
					}
					if (rhtot[i] == 0) {
						rhavg = '---';
					} else {
						rhavg = (relhumid[i] / rhtot[i]);
						rhavg = rhavg.toFixed(2);
					}

						
					if (i < 10) {
						$('#avgDay').append(
						'<tr><td>' + '0' + i + ':00</td><td>' + tempavg + '</td><td>' + rhavg + '</td><td>' + pmfineavg + '</td></tr>'
						);
					} else {
						$('#avgDay').append(
						'<tr><td>' + i + ':00</td><td>' + tempavg + '</td><td>' + rhavg + '</td><td>' + pmfineavg + '</td></tr>'
						);
					}

				}
			


		});

	}

	//hourly averages over current month graph 
	function avgDayGraph() {

		var date = new Date();
		var day = (date.getDate()).toString();
		var year = date.getFullYear();
		var month = (1 + date.getMonth()).toString();
		
		if (month.length == 1) month = "0" + month;
		if (day.length == 1) day = "0" + day;
		var dateString = month;
		
		var data10 = [];
		var datafine = [];
		var datatemp = [];
		var datarh = [];
		var chart = new CanvasJS.Chart("avgDayGraph", {
			
		title: {
			text: "",
		},
		axisX:{
			title: "time (hour)",
			interval: 1,
			intervalType: "hour",
			maximum: 24
		},
			
		axisY:{
			title: "PM (\u03BCg/m\u00B3)",
		},
		axisY2: [
			{
				title: "Relative Humidity (%)",
				lineColor:"red",
				labelFontColor:"red",
				titleFontColor:"red",
			},
			{
				title: "Temperature (Celsius)",
				lineColor:"green",
				labelFontColor:"green",
				titleFontColor:"green",
			}
		],
		toolTip: {
			shared:true,
		},
		
		legend: {
			cursor:"pointer",
			itemclick: toggleDataSeries,
		},
		data: [
		{
			type: "line",
			showInLegend: true,
			name: "PM10",
			legendText: "PM10",
			markerColor: "black",
			lineColor: "black",
			dataPoints : data10,
		},
			{
			type: "line",
			showInLegend: true,
			name:"PM2.5",
			legendText: "PM2.5",
			markerColor: "blue",
			lineColor: "blue",
			dataPoints: datafine,
		},
			{
			type: "line",
			axisYindex: 1,
			axisYType: "secondary",
			showInLegend: true,
			name:"Temperature",
			legendText: "Temperature(C)",
			markerColor: "green",
			lineColor:"green",
			dataPoints: datatemp,
		},
			{
			type: "line",
			axisYindex: 0,
			axisYType: "secondary",
			showInLegend: true,
			name:"Relative Humidity",
			legendText: "Relative Humidity(%)",
			markerColor: "red",
			lineColor: "red",
			dataPoints: datarh,
		}
		]
		});

		// pm, temp, relhumid counts
		//var pm10arr = [];
		var pmfinearr = [];
		var temperature = [];
		var relhumid = [];

		//total datapoints counts
		//var pm10tot = [];
		var pmfinetot = [];
		var temptot = [];
		var rhtot = [];

		//initialize arrays
		for (let i = 0; i < 24; i++) {
			//pm10arr[i] = 0;
			pmfinearr[i] = 0;
			//pm10tot[i] = 0;
			pmfinetot[i] = 0;
			temperature[i] = 0;
			relhumid[i] = 0;
			temptot[i] = 0;
			rhtot[i] = 0;
		}

		//ajax request
		//var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var spreadsheetID = "1JI6X71ukHWQN9AlNA__5JRt85Z2xnx_X1s_Vn5xfG7g";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var timestamp = (this.gsx$timestamp.$t).substring(5,7);
			
				if (timestamp != dateString) return;
				
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
				}
*/
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
				
				var hrStr = time.substring(11,13);
				var hour = parseInt(hrStr, 10);
				
				//pm10arr[hour] += pm10num;
				pmfinearr[hour] += pmfinenum;
				temperature[hour] += tempnum;
				relhumid[hour] += rhnum;

				//if (pm10 != '0' && pm10 != "") pm10tot[hour]++;
				if (pmfine != '0' && pmfine != "") pmfinetot[hour]++;
				if (temp != '0' && temp != "") temptot[hour]++;
				if (rh != '0' && rh != "") rhtot[hour]++;
			});


				for (var i = 0; i < 24; i++) {

					var pm10avg;
					var pmfineavg;
					var tempavg;
					var rhavg;

					/*if (pm10tot[i] != 0) {
						pm10avg = (pm10arr[i] / pm10tot[i]);
						data10.push({x: i, y: pm10avg});	
					} */

					if (pmfinetot[i] != 0) {
						pmfineavg = (pmfinearr[i] / pmfinetot[i]);
						datafine.push({x:i, y:pmfineavg});
					} 
					if (temptot[i] != 0) {
						tempavg = (temperature[i] / temptot[i]);
						datatemp.push({x:i, y:tempavg});
					} 
					if (rhtot[i] != 0) {
						rhavg = (relhumid[i] / rhtot[i]);
						datarh.push({x:i, y:rhavg});
					
						
						
						
					} 

				}
				chart.render();


		});

	
	}

var globupdated = 0;
//demo graph
function demoGraph() {

	var data10 = [];
	var datafine = [];
	var temperature = [];
	var relhumid = [];
	var chart = new CanvasJS.Chart("demoGraph", {
	title: {
			text: "",
		},
		axisX:{
			title: "time (hour)",
			intervalType: "hour",
	
		},
		axisY: 
			{
				title: "PM (\u03BCg/m\u00B3)",
				//maximum: 100
			},
		axisY2: [
			{
				title: "Relative Humidity (%)",
				lineColor:"red",
				labelFontColor:"red",
				titleFontColor:"red",
			},
			{
				title: "Temperature (Celsius)",
				lineColor:"green",
				labelFontColor:"green",
				titleFontColor:"green",
			}
		],
		toolTip: {
			shared:true,
		},
		legend: {
			cursor:"pointer",
			itemclick: toggleDataSeries,
		},
		data: [
			{
			type: "scatter",
			showInLegend: true,
			name: "PM10",
			legendText: "PM10",
			markerColor: "black",
			dataPoints : data10,
		},
			{
			type: "scatter",
			showInLegend: true,
			name:"PM2.5",
			legendText: "PM2.5",
			markerColor: "blue",
			dataPoints: datafine,

		},
			{
			type: "scatter",
			axisYindex: 1,
			axisYType: "secondary",
			showInLegend: true,
			name:"Temperature",
			legendText: "Temperature(C)",
			markerColor: "green",
			dataPoints: temperature,
		},
			{
			type: "scatter",
			axisYindex: 0,
			axisYType: "secondary",
			showInLegend: true,
			name:"Relative Humidity",
			legendText: "Relative Humidity(%)",
			markerColor: "red",
			dataPoints: relhumid,
		}

		]
});


 

var updateInterval = 1000;
var dataLength = 50; // number of dataPoints visible at any point
 

 
var updateChart = function () {

	var url = "https://spreadsheets.google.com/feeds/list/1JI6X71ukHWQN9AlNA__5JRt85Z2xnx_X1s_Vn5xfG7g/od6/public/values?alt=json";

	$.getJSON(url, function(data) {
			console.log("start ajax request");
			var entry = data.feed.entry;
			var numEntries = data.feed.openSearch$totalResults.$t;
			var updated = data.feed.updated.$t;

			if (updated == globupdated || numEntries == 0) { //no updates 
				console.log("no update");
				return;
			} else { //there is an update
				globupdated  = updated;
				console.log("globupdated: " + globupdated);
				var count  = 0;
				$(entry).each(function() {
					count++;
					
					var time = this.gsx$timestamp.$t;
					var temp = this.gsx$temperaturec.$t;
					var rh = this.gsx$relativehumidity.$t;
					//var pm10 = this.gsx$pm10.$t;
					var pm25 = this.gsx$pmfine.$t;

					if (count == numEntries) {
						 //get last entry
						console.log("There was an update, get last entry");

						//turn time string into a number
						var hour;
						var min;
						
						if (time.charAt(11) == '0') {
							hour = parseInt(time.charAt(12));
						} else {
							hour = parseInt(time.charAt(11) + time.charAt(12));
						}
						//console.log("hour: " + hour);
						if (time.charAt(14) == '0') {
							min = parseInt(time.charAt(15));
						} else {
							min = parseInt(time.charAt(14) + time.charAt(15));
						}
						//console.log("min: " + min);
						//var timeNum = (((hour*60) + min) / 60.0); 
						var timeNum = (((hour*60) + min) / 60.0);
						console.log("TimeNum: " + timeNum);
						//console.log("PM10: " + pm10);

						//if (pm10 != '0' && pm10 != '') data10.push({x: timeNum, y: parseFloat(pm10)});
						if (pm25 != '0' && pm25 != '') datafine.push({x: timeNum, y: parseFloat(pm25)});
						if (temp != '0' && temp != '') temperature.push({x: timeNum, y: parseFloat(temp)});
						if (rh != '0' && rh != '') relhumid.push({x: timeNum, y: parseFloat(rh)});

						//check for nulls 
						if (time == "") {
							time = "No Data";
						}

						if (temp == "") {
							temp = "No Data";
						} else {
							temp = parseFloat(temp).toFixed(2) + "&deg;C";
						}

						if (rh == "") {
							rh = "No Data";
						} else {
							rh = parseFloat(rh).toFixed(2) + "%";
						}
/*
						if (pm10 == 0) {
							pm10 = "No Data";
						} else {
							pm10 = parseFloat(pm10).toFixed(2) + " \u03BCg/m\u00B3";
						}
						*/
						if (pm25 == 0) {
							pm25 = "No Data";
						} else {
							pm25 = parseFloat(pm25).toFixed(2) + " \u03BCg/m\u00B3";
						}


						document.getElementById("lastEntry").rows[2].cells[0].innerHTML = time;
						document.getElementById("lastEntry").rows[2].cells[1].innerHTML = temp;
						document.getElementById("lastEntry").rows[2].cells[2].innerHTML = rh;
						//document.getElementById("lastEntry").rows[2].cells[3].innerHTML = pm10;
						document.getElementById("lastEntry").rows[2].cells[3].innerHTML = pm25;
					

						console.log("push datapoints");


					if (relhumid.length > dataLength) relhumid.shift();
					//if (data10.length > dataLength) data10.shift();
					if (temperature.length > dataLength) temperature.shift();
					if (relhumid.length > dataLength) relhumid.shift();
					}
		 
					
						});
				
					}
			chart.render();
			
	});
 
 
	
};
 
updateChart(dataLength);
setInterval(function(){updateChart()}, updateInterval);
 
}

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}	

