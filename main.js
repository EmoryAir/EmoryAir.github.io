	 	//using open street map for the mapping 
	 	var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	 	    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	 	    osm = L.tileLayer(osmUrl, {
	 	        maxZoom: 18,
	 	        attribution: osmAttrib
	 	    });

	 	// initialize the map on the "map" div with a given center and zoom
	 	var map = L.map('map').setView([33.795, -84.327], 12).addLayer(osm);

	 	// Script for adding marker on map click
	 	function onMapClick(e) {

	 	    var marker = L.marker(e.latlng, {
	 	        draggable: true,
	 	        title: "Resource location",
	 	        alt: "Resource Location",
	 	        riseOnHover: true
	 	    }).addTo(map)
	 	        .bindPopup(e.latlng.toString()).openPopup();

	 	    // Update marker on changing it's position
	 	    marker.on("dragend", function (ev) {

	 	        var chagedPos = ev.target.getLatLng();
	 	        this.bindPopup(chagedPos.toString()).openPopup();

	 	    });
	 	}

	 	map.on('click', onMapClick);
