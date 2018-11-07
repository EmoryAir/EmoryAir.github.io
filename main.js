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
	zoom: 9
  });

  L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
   subdomains: ['a','b','c']
  }).addTo( map );

  var myURL = jQuery( 'script[src$="main.js"]' ).attr( 'src' ).replace( 'main.js', '' );

  var myIcon = L.icon({
	iconUrl: myURL + 'pin48.png',
	iconRetinaUrl: myURL + 'pin48.png',
	iconSize: [29, 24],
	iconAnchor: [9, 21],
	popupAnchor: [0, -14]
  });

  var markerClusters = L.markerClusterGroup();

  for ( var i = 0; i < markers.length; ++i )
  {
	var popup = markers[i].name +
				'<br/>' + markers[i].city +
				'<br/><b>IATA/FAA:</b> ' + markers[i].iata_faa +
				'<br/><b>ICAO:</b> ' + markers[i].icao +
				'<br/><b>Altitude:</b> ' + Math.round( markers[i].alt * 0.3048 ) + ' m' +
				'<br/><b>Timezone:</b> ' + markers[i].tz;

	var m = L.marker( [markers[i].lat, markers[i].lng], {icon: myIcon} )
					.bindPopup( popup );

	markerClusters.addLayer( m );
  }

  map.addLayer( markerClusters );
