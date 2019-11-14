	 	/*
 the script mus be loaded after the map div is defined.
 otherwise this will not work (we would need a listener to
 wait for the DOM to be fully loaded).
 Just put the script tag below the map div.
 The source code below is the example from the leaflet start page.
 */

//var map = L.map('map').setView([33.505, -84.09], 13);
var map = L.map( 'map', {
	center: [33.7925,-84.3240],
	minZoom: 9,
	maxZoom: 18,
	zoom: 9
  });

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
   subdomains: ['a','b','c']
  }).addTo( map );



var myURL = jQuery( 'script[src$="main.js"]' ).attr( 'src' ).replace( 'main.js', '' );
//color for the markers 
function getColor(d) {
    return d > 301 ? '#F1A545' :
           d > 251  ? '#8A45F1' :
           d > 201  ? '#FD0909' :
           d > 151   ? '#E860F1' :
           d > 101   ? '#FD9B09' :
           d > 51   ? '#F9F22C' :
           d > 0    ? '#48D027' :
                      '#FFEDA0';
}
// add var "code" for the google sheets 
  var code = '1xqrk4AK9gWJ4nbS5MMQMtLaeNTbylfdEboVlgU2ut7o'
  

  var markerClusters = L.markerClusterGroup();

////////////////marker cluster group 2 //////////////////
Tabletop.init({ 
  key: code,
  callback: function(sheet, tabletop){ 
    
    for (var i in sheet){

      var data = sheet[i];

      var popup = '<h2>'+ data.sensor + '</h2>'+
      '<br/>' + data.time +
      '<br/><b>Tempurature:</b> ' + data.temp +
      '<br/><b>Humidity:</b> ' + data.humid +
      '<br/><b>PM 2.5:</b> ' + data.pm25mg +
      '<br/><b>AQI:</b> ' + data.aqi;
      //possibly change to L.circleMarker and set color
      var m = L.circleMarker( [data.lat, data.lng], {
        radius: 10,
        fillColor: getColor(data.aqi),
        color: getColor(data.aqi),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      })
              .bindPopup( popup );

      markerClusters.addLayer( m );

    }
    map.addLayer( markerClusters );
  },
  simpleSheet: true 
})



/////////end of makrer cluster group 2//////////////////

/////////marker cluster group 1//////////////////
/*
  for ( var i = 0; i < markers.length; ++i )
  {
	var popup = markers[i].name +
				'<br/>' + markers[i].city +
				'<br/><b>IATA/FAA:</b> ' + markers[i].iata_faa +
				'<br/><b>ICAO:</b> ' + markers[i].icao +
				'<br/><b>Altitude:</b> ' + Math.round( markers[i].alt * 0.3048 ) + ' m' +
				'<br/><b>Timezone:</b> ' + markers[i].tz;

	//possibly change to L.circleMarker and set color
	var m = L.circleMarker( [markers[i].lat, markers[i].lng], {
		radius: 10,
		fillColor: "#ff7800",
		color: "#ff7800",
		weight: 1,
		opacity: 1,
    		fillOpacity: 0.8
	})
			.bindPopup( popup );

	markerClusters.addLayer( m );
  }

  map.addLayer( markerClusters );
  */
/////////end of marker cluster group 1//////////////////

//////////////legend stuff /////////////////////////////////////////////////
var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Categories</strong>'],
    categories = ['Good','Moderate','USG','Unhealthy','Very Unhealthy', 'Hazardous'];
    

    for (var i = 0; i < categories.length; i++) {
      var c = [1, 52, 102, 152, 202, 252];
            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(c[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(map);


