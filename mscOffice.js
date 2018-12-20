//create current day graph
function currDayGraphData() {


var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

var dataPoints = [];
var chart = new CanvasJS.Chart("currentDayGraph", {
	title: {
		text: "Current Day Data"
	},
	axisX:{
		title: "time (hour)"
	},
	data: [{
		type: "scatter",
		showInLegend: true,
		name: "series1",
		legendText: "PM10",
		markerColor: "black",
		dataPoints : dataPoints,
	}]
});

$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var pm10 = this.gsx$pm10.$t;
				var time = this.gsx$time.$t;

				//turn time string into a number
				var hour = 0;
				var min = 0;

				if (time.charAt(1) == "0") {
					hour = parseInt(time.charAt(2));
				} else {
					hour = parseInt(time.charAt(1) + time.charAt(2));
				}

				if (time.charAt(4) == "0") {
					min = parseInt(time.charAt(5));
				} else {
					min = parseInt(time.charAt(4) + time.charAt(5));
				}

			
				
				var timeNum = ((hour*60) + min) / 60.0; 

				dataPoints.push({x: timeNum, y: parseFloat(pm10)});
				

			});
			chart.render();

		});


}

//create avg day data
function avgDayData() {

	var date = new Date();
	var year = date.getFullYear();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var month = months[date.getMonth()];




	$('#avgDay').append(
		'<tr><th>Hour</th><th>Average PM10</th></tr>' +
		'<tr><td>00:00</td><td></td></tr>' +
		'<tr><td>01:00</td><td></td></tr>' +
		'<tr><td>02:00</td><td></td></tr>' +
		'<tr><td>03:00</td><td></td></tr>' +
		'<tr><td>04:00</td><td></td></tr>' +
		'<tr><td>05:00</td><td></td></tr>' +
		'<tr><td>06:00</td><td></td></tr>' +
		'<tr><td>07:00</td><td></td></tr>' +
		'<tr><td>08:00</td><td></td></tr>' +
		'<tr><td>09:00</td><td></td></tr>' +
		'<tr><td>10:00</td><td></td></tr>' +
		'<tr><td>11:00</td><td></td></tr>' +
		'<tr><td>12:00</td><td></td></tr>' +
		'<tr><td>13:00</td><td></td></tr>' +
		'<tr><td>14:00</td><td></td></tr>' +
		'<tr><td>15:00</td><td></td></tr>' +
		'<tr><td>16:00</td><td></td></tr>' +
		'<tr><td>17:00</td><td></td></tr>' +
		'<tr><td>18:00</td><td></td></tr>' +
		'<tr><td>19:00</td><td></td></tr>' +
		'<tr><td>20:00</td><td></td></tr>' +
		'<tr><td>21:00</td><td></td></tr>' +
		'<tr><td>22:00</td><td></td></tr>' +
		'<tr><td>23:00</td><td></td></tr>' 
		);

	var r0tot = 0;
	var r1tot = 0;
	var r2tot = 0;
	var r3tot = 0;
	var r4tot = 0;
	var r5tot = 0;
	var r6tot = 0;
	var r7tot = 0;
	var r8tot = 0;
	var r9tot = 0;
	var r10tot = 0;
	var r11tot = 0;
	var r12tot = 0;
	var r13tot = 0;
	var r14tot = 0;
	var r15tot = 0;
	var r16tot = 0;
	var r17tot = 0;
	var r18tot = 0;
	var r19tot = 0;
	var r20tot = 0;
	var r21tot = 0;
	var r22tot = 0;
	var r23tot = 0;

	var r0pm10 = 0;
	var r1pm10 = 0;
	var r2pm10 = 0;
	var r3pm10 = 0;
	var r4pm10 = 0;
	var r5pm10 = 0;
	var r6pm10 = 0;
	var r7pm10 = 0;
	var r8pm10 = 0;
	var r9pm10 = 0;
	var r10pm10 = 0;
	var r11pm10 = 0;
	var r12pm10 = 0;
	var r13pm10 = 0;
	var r14pm10 = 0;
	var r15pm10 = 0;
	var r16pm10 = 0;
	var r17pm10 = 0;
	var r18pm10 = 0;
	var r19pm10 = 0;
	var r20pm10 = 0;
	var r21pm10 = 0;
	var r22pm10 = 0;
	var r23pm10 = 0;
	

	var d = new Date();
	var x = d.getDate(); //get day of the month as a number
	var i;

	for (i = 1; i <= x; i++) {
	
	var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + i + "/public/values?alt=json";


	$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var pm10 = this.gsx$pm10.$t;
				var time = this.gsx$time.$t;

				var pm10num = parseFloat(pm10);
				
		
				if (pm10 !='') {
					if (time.charAt(1) == '0' && time.charAt(2) == '0') {
						r0tot++;
						r0pm10 += pm10num;
						
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '1') {
						r1tot++;
						r1pm10 += pm10num;
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '2') {
						r2tot++;
						r2pm10 += pm10num;
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '3') {
						r3tot++;
						r3pm10 += pm10num;
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '4') {
						r4tot++;
						r4pm10 += pm10num;
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '5') {
						r5tot++;
						r5pm10 += pm10num;
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '6') {
						r6tot++;
						r6pm10 += pm10num;
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '7') {
						r7tot++;
						r7pm10 += pm10num;
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '8') {
						r8tot++;
						r8pm10 += pm10num;
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '9') {
						r9tot++;
						r9pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '0') {
						r10tot++;
						r10pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '1') {
						r11tot++;
						r11pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '2') {
						r12tot++;
						r12pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '3') {
						r13tot++;
						r13pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '4') {
						r14tot++;
						r14pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '5') {
						r15tot++;
						r15pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '6') {
						r16tot++;
						r16pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '7') {
						r17tot++;
						r17pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '8') {
						r18tot++;
						r18pm10 += pm10num;
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '9') {
						r19tot++;
						r19pm10 += pm10num;
					}

					if (time.charAt(1) == '2' && time.charAt(2) == '0') {
						r20tot++;
						r20pm10 += pm10num;
					}

					if (time.charAt(1) == '2' && time.charAt(2) == '1') {
						r21tot++;
						r21pm10 += pm10num;
					}

					if (time.charAt(1) == '2' && time.charAt(2) == '2') {
						r22tot++;
						r22pm10 += pm10num;
					}

					if (time.charAt(1) == '2' && time.charAt(2) == '3') {
						r23tot++;
						r23pm10 += pm10num;
					}

				}

			});

				if (r0tot == 0) {
					document.getElementById("avgDay").rows[1].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[1].cells[1].innerHTML = r0pm10 / r0tot;
				}
				
				if (r1tot == 0) {
					document.getElementById("avgDay").rows[2].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[2].cells[1].innerHTML = r1pm10 / r1tot;
				}

				if (r2tot == 0) {
					document.getElementById("avgDay").rows[3].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[3].cells[1].innerHTML = r2pm10 / r2tot;
				}

				if (r3tot == 0) {
					document.getElementById("avgDay").rows[4].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[4].cells[1].innerHTML = r3pm10 / r3tot;
				}

				if (r4tot == 0) {
					document.getElementById("avgDay").rows[5].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[5].cells[1].innerHTML = r4pm10 / r4tot;
				}
				
				if (r5tot == 0) {
					document.getElementById("avgDay").rows[6].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[6].cells[1].innerHTML = r5pm10 / r5tot;
				}

				if (r6tot == 0) {
					document.getElementById("avgDay").rows[7].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[7].cells[1].innerHTML = r6pm10 / r6tot;
				}

				if (r7tot == 0) {
					document.getElementById("avgDay").rows[8].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[8].cells[1].innerHTML = r7pm10 / r7tot;
				}

				if (r8tot == 0) {
					document.getElementById("avgDay").rows[9].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[9].cells[1].innerHTML = r8pm10 / r8tot;
				}

				if (r9tot == 0) {
					document.getElementById("avgDay").rows[10].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[10].cells[1].innerHTML = r9pm10 / r9tot;
				}

				if (r10tot == 0) {
					document.getElementById("avgDay").rows[11].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[11].cells[1].innerHTML = r10pm10 / r10tot;
				}

				if (r11tot == 0) {
					document.getElementById("avgDay").rows[12].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[12].cells[1].innerHTML = r11pm10 / r11tot;
				}

				if (r12tot == 0) {
					document.getElementById("avgDay").rows[13].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[13].cells[1].innerHTML = r12pm10 / r12tot;
				}

				if (r13tot == 0) {
					document.getElementById("avgDay").rows[14].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[14].cells[1].innerHTML = r13pm10 / r13tot;
				}

				if (r14tot == 0) {
					document.getElementById("avgDay").rows[15].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[15].cells[1].innerHTML = r14pm10 / r14tot;
				}

				if (r15tot == 0) {
					document.getElementById("avgDay").rows[16].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[16].cells[1].innerHTML = r15pm10 / r15tot;
				}

				if (r16tot == 0) {
					document.getElementById("avgDay").rows[17].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[17].cells[1].innerHTML = r16pm10 / r16tot;
				}

				if (r17tot == 0) {
					document.getElementById("avgDay").rows[18].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[18].cells[1].innerHTML = r17pm10 / r17tot;
				}

				if (r18tot == 0) {
					document.getElementById("avgDay").rows[19].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[19].cells[1].innerHTML = r18pm10 / r18tot;
				}

				if (r19tot == 0) {
					document.getElementById("avgDay").rows[20].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[20].cells[1].innerHTML = r19pm10 / r19tot;
				}

				if (r20tot == 0) {
					document.getElementById("avgDay").rows[21].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[21].cells[1].innerHTML = r20pm10 / r20tot;
				}

				if (r21tot == 0) {
					document.getElementById("avgDay").rows[22].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[22].cells[1].innerHTML = r21pm10 / r21tot;
				}


				if (r22tot == 0) {
					document.getElementById("avgDay").rows[23].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[23].cells[1].innerHTML = r22pm10 / r22tot;
				}

				if (r23tot == 0) {
					document.getElementById("avgDay").rows[24].cells[1].innerHTML ="---";
				} else {
					document.getElementById("avgDay").rows[24].cells[1].innerHTML = r24pm10 / r24tot;
				}



	});

	}
	
}

//create hourly data
function createHour() {

	$('#hour').append(
		'<tr><th>Hour</th>' +
		'<th>Average PM10</th></tr>' 
		);


	var arrayZero = [];
	var arrayOne = [];
	var arrayTwo = [];
	var arrayThree = [];
	var arrayFour = [];
	var arrayFive = [];
	var arraySix = [];
	var arraySeven = [];
	var arrayEight = [];
	var arrayNine = [];
	var arrayTen = [];
	var arrayEleven = [];
	var arrayTwelve = [];
	var arrayThirteen = [];
	var arrayFourteen = [];
	var arrayFifteen = [];
	var arraySixteen = [];
	var arraySeventeen = [];
	var arrayEighteen = [];
	var arrayNineteen = [];
	var arrayTwenty = [];
	var arrayTwentyOne = [];
	var arrayTwentyTwo = [];
	var arrayTwentyThree = [];


	var spreadsheetID = "16cy4ClKYEN_w5_c6KiR2zSjRsUD9ijxQD9DGffNRXtI";
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";	

	$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var pm10 = this.gsx$pm10.$t;
				var time = this.gsx$time.$t;

				var pm10num = parseFloat(pm10);

				
				if (pm10 !='') {
					if (time.charAt(1) == '0' && time.charAt(2) == '0') {
						arrayZero.push(pm10num);
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '1') {
						arrayOne.push(pm10num);
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '2') {
						arrayTwo.push(pm10num);
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '3') {
						arrayThree.push(pm10num);
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '4') {
						arrayFour.push(pm10num);
					}
					if (time.charAt(1) == '0' && time.charAt(2) == '5') {
						arrayFive.push(pm10num);
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '6') {
						arraySix.push(pm10num);
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '7') {
						arraySeven.push(pm10num);
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '8') {
						arrayEight.push(pm10num);
					}

					if (time.charAt(1) == '0' && time.charAt(2) == '9') {
						arrayNine.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '0') {
						arrayTen.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '1') {
						arrayEleven.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '2') {
						arrayTwelve.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '3') {
						arrayThirteen.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '4') {
						arrayFourteen.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '5') {
						arrayFifteen.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '6') {
						arraySixteen.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '7') {
						arraySeventeen.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '8') {
						arrayEighteen.push(pm10num);
					}

					if (time.charAt(1) == '1' && time.charAt(2) == '9') {
						arrayNineteen.push(pm10num);
					}

					if (time.charAt(1) == '2' && time.charAt(2) == '0') {
						arrayTwenty.push(pm10num);
					}

					if (time.charAt(1) == '2' && time.charAt(2) == '1') {
						arrayTwentyOne.push(pm10num);
					}

					if (time.charAt(1) == '2' && time.charAt(2) == '2') {
						arrayTwentyTwo.push(pm10num);
					}

					if (time.charAt(1) == '2' && time.charAt(2) == '3') {
						arrayTwentyThree.push(pm10num);
					}
				}
			});

	if (arrayZero.length == 0) {
		$('#hour').append(
		'<tr><td>00:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayZero.length; i++) {
			sum += arrayZero[i];
		}
		var avg = sum / arrayZero.length;



		$('#hour').append(
		'<tr><td>00:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayOne.length == 0) {
		$('#hour').append(
		'<tr><td>01:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayOne.length; i++) {
			sum += arrayOne[i];
		}
		var avg = sum / arrayOne.length;

		$('#hour').append(
		'<tr><td>01:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayTwo.length == 0) {
		$('#hour').append(
		'<tr><td>02:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayTwo.length; i++) {
			sum += arrayTwo[i];
		}
		var avg = sum / arrayTwo.length;



		$('#hour').append(
		'<tr><td>02:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayThree.length == 0) {
		$('#hour').append(
		'<tr><td>03:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayThree.length; i++) {
			sum += arrayThree[i];
		}
		var avg = sum / arrayThree.length;



		$('#hour').append(
		'<tr><td>03:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayFour.length == 0){
		$('#hour').append(
		'<tr><td>04:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayFour.length; i++) {
			sum += arrayFour[i];
		}
		var avg = sum / arrayFour.length;



		$('#hour').append(
		'<tr><td>04:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayFive.length == 0) {
		$('#hour').append(
		'<tr><td>05:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayFive.length; i++) {
			sum += arrayFive[i];
		}
		var avg = sum / arrayFive.length;



		$('#hour').append(
		'<tr><td>05:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arraySix.length == 0) {
		$('#hour').append(
		'<tr><td>06:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arraySix.length; i++) {
			sum += arraySix[i];
		}
		var avg = sum / arraySix.length;



		$('#hour').append(
		'<tr><td>06:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arraySeven.length == 0) {
		$('#hour').append(
		'<tr><td>07:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arraySeven.length; i++) {
			sum += arraySeven[i];
		}
		var avg = sum / arraySeven.length;



		$('#hour').append(
		'<tr><td>07:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayEight.length == 0) {
		$('#hour').append(
		'<tr><td>08:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayEight.length; i++) {
			sum += arrayEight[i];
		}
		var avg = sum / arrayEight.length;



		$('#hour').append(
		'<tr><td>08:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayNine.length == 0) {
		$('#hour').append(
		'<tr><td>09:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayNine.length; i++) {
			sum += arrayNine[i];
		}
		var avg = sum / arrayNine.length;

		$('#hour').append(
		'<tr><td>09:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayTen.length == 0) {
		$('#hour').append(
		'<tr><td>10:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayTen.length; i++) {
			sum += arrayTen[i];
		}
		var avg = sum / arrayTen.length;



		$('#hour').append(
		'<tr><td>10:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayEleven.length == 0) {
		$('#hour').append(
		'<tr><td>11:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayEleven.length; i++) {
			sum += arrayEleven[i];
		}
		var avg = sum / arrayEleven.length;



		$('#hour').append(
		'<tr><td>11:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}


	if (arrayTwelve.length == 0) {
		$('#hour').append(
		'<tr><td>12:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayTwelve.length; i++) {
			sum += arrayTwelve[i];
		}
		var avg = sum / arrayTwelve.length;



		$('#hour').append(
		'<tr><td>12:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayThirteen.length == 0) {
		$('#hour').append(
		'<tr><td>13:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayThirteen.length; i++) {
			sum += arrayThirteen[i];
		}
		var avg = sum / arrayThirteen.length;



		$('#hour').append(
		'<tr><td>13:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayFourteen.length == 0) {
		$('#hour').append(
		'<tr><td>14:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayFourteen.length; i++) {
			sum += arrayFourteen[i];
		}
		var avg = sum / arrayFourteen.length;

		$('#hour').append(
		'<tr><td>14:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayFifteen.length == 0) {
		$('#hour').append(
		'<tr><td>15:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayFifteen.length; i++) {
			sum += arrayFifteen[i];
		}
		var avg = sum / arrayFifteen.length;


		$('#hour').append(
		'<tr><td>15:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arraySixteen.length == 0) {
		$('#hour').append(
		'<tr><td>16:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arraySixteen.length; i++) {
			sum += arraySixteen[i];
		}
		var avg = sum / arraySixteen.length;

		$('#hour').append(
		'<tr><td>16:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arraySeventeen.length == 0) {
		$('#hour').append(
		'<tr><td>17:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arraySeventeen.length; i++) {
			sum += arraySeventeen[i];
		}
		var avg = sum / arraySeventeen.length;

		$('#hour').append(
		'<tr><td>17:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayEighteen.length == 0) {
		$('#hour').append(
		'<tr><td>18:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayEighteen.length; i++) {
			sum += arrayEighteen[i];
		}
		var avg = sum / arrayEighteen.length;

		$('#hour').append(
		'<tr><td>18:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayNineteen.length == 0) {
		$('#hour').append(
		'<tr><td>19:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayNineteen.length; i++) {
			sum += arrayNineteen[i];
		}
		var avg = sum / arrayNineteen.length;

		$('#hour').append(
		'<tr><td>19:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayTwenty.length == 0) {
		$('#hour').append(
		'<tr><td>20:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayTwenty.length; i++) {
			sum += arrayTwenty[i];
		}
		var avg = sum / arrayTwenty.length;



		$('#hour').append(
		'<tr><td>20:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayTwentyOne.length == 0) {
		$('#hour').append(
		'<tr><td>21:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayTwentyOne.length; i++) {
			sum += arrayTwentyOne[i];
		}
		var avg = sum / arrayTwentyOne.length;

		$('#hour').append(
		'<tr><td>21:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayTwentyTwo.length == 0) {
		$('#hour').append(
		'<tr><td>22:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayTwentyTwo.length; i++) {
			sum += arrayTwentyTwo[i];
		}
		var avg = sum / arrayTwentyTwo.length;

		$('#hour').append(
		'<tr><td>22:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}

	if (arrayTwentyThree.length == 0) {
		$('#hour').append(
		'<tr><td>23:00</td>' +
		'<td>---</td></tr>' 
		);
	} 
	else {
		var sum = 0;
		for (var i = 0; i < arrayTwentyThree.length; i++) {
			sum += arrayTwentyThree[i];
		}
		var avg = sum / arrayTwentyThree.length;

		$('#hour').append(
		'<tr><td>23:00</td>' +
		'<td>' + avg + '</td></tr>'
		);
	}


	});


}

//create current day data
function createDay() {



			
				$('#display').append(
				'<tr><th>Timestamp</th>' + 
				'<th>Temperature (Celsius)</th>' +
				'<th>Relative Humidity</th>' +
			//	'<th>PM2.5</th>' +
				'<th>PM10</th>' +
				'<th>Time</th>' +
			//	'<th>PM2.5 microg/m^3</th>' +
				'</tr>' );

				

	var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

	//load json data from server using get http request
	//parameters: url, callback (function executed when data is loaded)
		$.getJSON(url, function(data) {

			var entry = data.feed.entry;

			$(entry).each(function() {
				var timestamp = this.gsx$timestamp.$t;
				var temp = this.gsx$temperaturec.$t;
				var rh = this.gsx$relativehumidity.$t;
				//var pm25 = this.gsx$pm25.$t;
				var pm10 = this.gsx$pm10.$t;
				var time = this.gsx$time.$t;
				//var pm25mug = this.gsx$pm25mug.$t;

				if (timestamp == '') {
					timestamp = '---';
				}

				if (temp == '') {
					temp = '---';
				}


				if (rh == '') {
					rh = '---';
				}

/*				if (pm25 == '') {
					pm25 = '---';
				}
*/
				if (pm10 == '') {
					pm10 = '---';
				}

				if (time == '') {
					time = '---';
				}

/*				if (pm25mug == '') {
					pm25mug = '---';
			}

*/
			
				$('#display').append(
					'<tr><td>' + timestamp + 
					'</td><td>' + temp + 
					'</td><td>' + rh + 
//					'</td><td>' + pm25 + 
					'</td><td>' + pm10 + 
					'</td><td>' + time + 
					'</td></tr>');

//					'</td><td>' + pm25mug +  '</td></tr>');
			});
		});
}


//create seven day data
function createSeven() {


	$('#seven').append(
		'<tr><th>Date</th>' +
		'<th>Average PM10</th></tr>' 
		);
	

	var d = new Date();

	var i;
	for (i = 2; i <= 8 ;i++)
	{

		var pm10num;
		


		var spreadsheetID = "1IpmZM0CTu4Ju2vR9nNPbUOFKtJNHCO69ydEH9vAtxWI";
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + i + "/public/values?alt=json";

			$.ajax( {
				async: false,
				url: url,
				success: function(data) {

				var entry = data.feed.entry;
				var total = 0;
				var pm10total = 0;
				var avg = 0;

				$(entry).each(function() {
				
					var pm10 = this.gsx$pm10.$t;

						pm10num = parseFloat(pm10);
						pm10total += pm10num;
						total++;
				});


				
				d.setDate(d.getDate()-1);
				var datestring = d.toDateString();
				avg = pm10total / total;
				
				$('#seven').append(
				'<tr><td>' + datestring +'</td><td>' + avg + '</td></tr>' 
				);

				}
			});				
			
	}
	
			
}


function hideDay() {
	var x = document.getElementById('display');
	x.style.display="none";
}

function showDay() {
	var x = document.getElementById('display');
	x.style.display="block";
}

function hideHour() {
	var x = document.getElementById('hour');
	x.style.display="none";
}

function showHour() {
	var x = document.getElementById('hour');
	x.style.display="block";
}

function show7() {
	var x = document.getElementById('seven');
	x.style.display="block";
}

function hide7() {
	var x = document.getElementById('seven');
	x.style.display="none";
}

function showAvgDay() {
	var x = document.getElementById('avgDay');
	x.style.display="block";
}

function hideAvgDay() {
	var x = document.getElementById('avgDay');
	x.style.display="none";
}

//show different data tables based on chosen tab
$(document).ready(function() {
	$("#btnDay").click(function() {
		$("#hour").hide();
		$("#avgDay").hide();
		$("#seven").hide();
		$("#display").show();
	});

	$("#btnAvgDay").click(function() {
		$("#hour").hide();
		$("#avgDay").show();
		$("#seven").hide();
		$("#display").hide();
		$("#currentDayGraph").hide();
	});

	$("#btnDay").click(function() {
		$("#hour").hide();
		$("#avgDay").hide();
		$("#seven").hide();
		$("#display").show();
		$("#currentDayGraph").show();
	});

	$("#btnSeven").click(function() {
		$("#hour").hide();
		$("#avgDay").hide();
		$("#seven").show();
		$("#display").hide();
		$("#currentDayGraph").hide();
	});

	$("#btnHour").click(function() {
		$("#hour").show();
		$("#avgDay").hide();
		$("#seven").hide();
		$("#display").hide();
		$("#currentDayGraph").hide();
	});



});

