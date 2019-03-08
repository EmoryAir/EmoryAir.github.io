//get today's date in Month Day, Year format
	function showDate() {
		var date = new Date();
		var day = date.getDate();
		var year = date.getFullYear();
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var month = months[date.getMonth()];

		document.getElementById('date').innerHTML = month + " " + day + ", " + year;
	}

	//display PM10 and PM2.5 averages for the current day 
	function averages() {

		var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		//variables for current daily averages
		var pmfinesum = 0;
		var pm10sum = 0;
		var pmfinetot = 0;
		var pm10tot = 0;

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var pmfine = this.gsx$pmfine.$t;
				var pm10 = this.gsx$pm10.$t;

				var pm10num = parseFloat(pm10);
				var pmfinenum = parseFloat(pmfine);

				//to get avg
				if (pm10 != '0' && pm10 != '') {
					pm10sum += pm10num;
					pm10tot++;
				}
				
				if (pmfine != '0' && pmfine != '') {
					pmfinesum += pmfinenum;
					pmfinetot++;
				}

				var pm10avg;
				var pmfineavg;

				if (pm10tot != 0) {
					pm10avg = (pm10sum/pm10tot).toFixed(3);
				} else {
					pm10avg = "No Data";
				}

				if (pmfinetot != 0) {
					pmfineavg = (pmfinesum/pmfinetot).toFixed(3);
				} else {
					pmfineavg = "No Data";

				}
				document.getElementById("pm10avg").innerHTML = pm10avg;
				document.getElementById("pmfineavg").innerHTML = pmfineavg;
			});
		});


	}


	//Current Day table, graph, current avg

	function currDayGraph() {
		var data10 = [];
		var datafine = [];
		var relhum = [];
		var temperature = [];
		var ymax = 0;
		var chart = new CanvasJS.Chart("currDayGraph", {
			/*
		title: {
			text: 
		},*/
		axisX:{
			title: "time (hour)",
			interval: 1,
			intervalType: "hour",
			maximum: 24
		},
		axisY: 
			{
				title: "\u03BC" + "g/m" + "\u00B3",
			},
		
		data: [
			{
			type: "scatter",
			showInLegend: true,
			name: "PM10",
			legendText: "PM10",
			markerColor: "black",
			markerSize: 4,
			dataPoints : data10,
		},
			{
			type: "scatter",
			showInLegend: true,
			name:"PM2.5",
			legendText: "PM2.5",
			markerColor: "blue",
			markerSize: 4,
			dataPoints: datafine,
		}
		]
		});

		var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var pmfine = this.gsx$pmfine.$t;
				var pm10 = this.gsx$pm10.$t;
				var time = this.gsx$time.$t;
				var temp = this.gsx$temperaturec.$t;
				var rh = this.gsx$relativehumidity.$t;

				var pm10num = parseFloat(pm10);
				var pmfinenum = parseFloat(pmfine);

				//turn time string into a number
				var hour;
				var min;

				if (time.charAt(1) == '0') {
					hour = parseInt(time.charAt(2));
				} else {
					hour = parseInt(time.charAt(1) + time.charAt(2));
				}
				if (time.charAt(4) == '0') {
					min = parseInt(time.charAt(5));
				} else {
					min = parseInt(time.charAt(4) + time.charAt(5));
				}
				var timeNum = ((hour*60) + min) / 60.0; 

				//if pm10 != 0, plot on graph 
				//if pmfine != 0, plot on graph
				//if temp != 0, plot on graph
				//if relhumi != 0, plot on graph
				if (pm10 != '0' && pm10 != '') data10.push({x: timeNum, y: parseFloat(pm10)});
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
				'<th>Temperature (Celsius)</th>' +
				'<th>Relative Humidity</th>' +
				'<th>PM2.5</th>' +
				'<th>PM10</th>' +
				'<th>Time</th>' +
				'</tr>' );

		//load json data from server using get http request
		//parameters: url, callback (function executed when data is loaded)
		var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var timestamp = this.gsx$timestamp.$t;
				var temp = this.gsx$temperaturec.$t;
				var rh = this.gsx$relativehumidity.$t;
				var pmfine = this.gsx$pmfine.$t;
				var pm10 = this.gsx$pm10.$t;
				var time = this.gsx$time.$t;

				var pm10num = parseFloat(pm10);
				var pmfinenum = parseFloat(pmfine);

				//display data on table, changing any 0 or null to dash lines
				if (timestamp == '') timestamp = '---';
				if (temp == '') temp = '---';
				if (rh == '') rh = '---';
				if (pmfine == '0') pmfine = '---';
				if (pm10 == '0') pm10 = '---';
				if (time == '') time = '---';
			
				$('#currDay').append(
					'<tr><td>' + timestamp + 
					'</td><td>' + temp + 
					'</td><td>' + rh + 
					'</td><td>' + pmfine + 
					'</td><td>' + pm10 + 
					'</td><td>' + time + 
					'</td></tr>');
			});
	
		});
	}

	//hourly averaged over current day graph
	function hourly() {

		$('#hourly').append(
				'<tr><th>Hour</th><th>Average PM10</th><th>Average PM2.5</th></tr>'
				);

		var date = new Date();
		var day = date.getDate();
		var year = date.getFullYear();
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var month = months[date.getMonth()];

		var data10 = [];
		var datafine = [];
		var chart = new CanvasJS.Chart("hourlyGraph", {
			/*
		title: {
			text: 
		},*/
		axisX:{
			title: "time (hour)",
			interval: 1,
			intervalType: "hour",
			maximum: 24
		},
		axisY:{
			title: "\u03BC" + "g/m" + "\u00B3",
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
		]
		});

		// pm counts
		var pm10arr = [];
		var pmfinearr = [];

		//total datapoints counts
		var pm10tot = [];
		var pmfinetot = [];

		//initialize arrays
		for (var i = 0; i < 24; i++) {
			pm10arr[i] = 0;
			pmfinearr[i] = 0;
			pm10tot[i] = 0;
			pmfinetot[i] = 0;
		}

		//ajax request
		var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var pm10 = this.gsx$pm10.$t;
				var pmfine = this.gsx$pmfine.$t;
				var time = this.gsx$time.$t;

				var pm10num = parseFloat(pm10);
				var pmfinenum = parseFloat(pmfine);

				var hrStr = time.charAt(1) + time.charAt(2);
				var hour = parseInt(hrStr, 10);
				
				
				
				pm10arr[hour] += pm10num;
				pmfinearr[hour] += pmfinenum;

				if (pm10 != '0') {
					pm10tot[hour]++;
				}
		
				if (pmfine != '0') {
					pmfinetot[hour]++;
				}
		
				
			});

			

		
				for (var i = 0; i < 24; i++) {

					var pm10avg;
					var pmfineavg;

					if (pm10tot[i] == 0) {
						pm10avg = '---';
					} else {
						pm10avg = (pm10arr[i] / pm10tot[i]);
						data10.push({x: i, y: pm10avg});
						//pm10avg = pm10avg.toFixed(3);
					}
					if (pmfinetot[i] == 0) {
						pmfineavg = '---';
					} else {
						pmfineavg = (pmfinearr[i] / pmfinetot[i]);
						datafine.push({x:i, y:pmfineavg});
						//pmfineavg = pmfineavg.toFixed(3);
					}

					if (i < 10) {
						$('#hourly').append(
						'<tr><td>0' + i + ':00</td><td>' + pm10avg + '</td><td>' + pmfineavg + '</td></tr>'
						);
					} else {
						$('#hourly').append(
						'<tr><td>' + i + ':00</td><td>' + pm10avg + '</td><td>' + pmfineavg + '</td></tr>'
						);
					}

				}
				chart.render();


		});
	}

	function avgDayGraph() {

		var data10 = [];
		var datafine = [];
		var chart = new CanvasJS.Chart("avgDayGraph", {
			/*
		title: {
			text: 
		},*/
		axisX:{
			title: "time (hour)",
			interval: 1,
			intervalType: "hour",
			maximum: 24
		},
		axisY:{
			title: "\u03BC" + "g/m" + "\u00B3",
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
		]
		});

		// pm counts
		var pm10arr = [];
		var pmfinearr = [];

		//total datapoints counts
		var pm10tot = [];
		var pmfinetot = [];

		//initialize arrays
		for (var i = 0; i < 24; i++) {
			pm10arr[i] = 0;
			pmfinearr[i] = 0;
			pm10tot[i] = 0;
			pmfinetot[i] = 0;
		}

		var d = new Date();
		var date = d.getDate();
		
		var i;
		for (i = 1; i <= d; i++) {

		//ajax request
		var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

		$.ajax( {
			async:false,
			url:url,
			success:function(data) {
				var entry = data.feed.entry;
				$(entry).each(function() {
				var pm10 = this.gsx$pm10.$t;
				var pmfine = this.gsx$pmfine.$t;
				var time = this.gsx$time.$t;

				var pm10num = parseFloat(pm10);
				var pmfinenum = parseFloat(pmfine);

				var hrStr = time.charAt(1) + time.charAt(2);
				var hour = parseInt(hrStr, 10);
				

				if (pm10 != '0' && pm10 != '') {
					pm10arr[hour] += pm10num;
					pm10tot[hour]++;
				}
		
				if (pmfine != '0' && pmfine != '') {
					pmfinearr[hour] += pmfinenum;
					pmfinetot[hour]++;
				}
		
				
			});

			
				for (var i = 0; i < 24; i++) {

					var pm10avg;
					var pmfineavg;

					if (pm10tot[i] != 0) {
						pm10avg = (pm10arr[i] / pm10tot[i]);
						data10.push({x: i, y: pm10avg});
						//pm10avg = pm10avg.toFixed(3);
					}
					if (pmfinetot[i] != 0) {
						pmfineavg = (pmfinearr[i] / pmfinetot[i]);
						datafine.push({x:i, y:pmfineavg});
						//pmfineavg = pmfineavg.toFixed(3);
					}


				}
				
				chart.render();	
			}


			
		});

	
		}

	
		
		
	}
