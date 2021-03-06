var map = L.map('map').setView([40.71,-73.93], 11);

var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

map.addLayer(CartoDBTiles);

var CartoDBDarkTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

/*
L.geoJson(neighborhoods).addTo(map);
L.geoJson(CoolRoofs).addTo(map);
*/
// Neighborhoods Chloropleth
var populationStyle = function (feature){
	var value = feature.properties.Pop;
	var fillColor = null;
	if(value >= 0 && value <= 11000){
		fillColor = "#edf8fb";
	}
	if(value > 11000 && value <= 27000){
		fillColor = "#b3cde3";
	}
	if(value > 27000 && value <= 52500){
		fillColor = "#8c96c6";
	}
	if(value > 52500 && value <= 91500){
		fillColor = "#8856a7";
	}
	if(value > 91500){
		fillColor = "#810f7c";
	}

	var style = {
		weight: 0,
		fillOpacity: 0.5,
		fillColor: fillColor
	}

	return style;
}

var neighborhoodsGeoJSON = L.geoJson(neighborhoods, {
	style: populationStyle
}).addTo(map);

// Cool Roofs Markers
var CoolRoofsPointToLayer = function (feature, latlng){
		var value = feature.properties.TotalSF;
		var setRadius = null; 
		//null is used so that if none of the following is true, it will register null
		if(value >= 1000 && value <= 5500){
			setRadius = 100;
			// color = "blue";
		}
		if(value > 5500 && value <= 12000){
			setRadius = 200;
		}
		if(value > 12000 && value <= 21250){
			setRadius = 300;
		}
		if(value > 21250 && value <= 40000){
			setRadius = 400;
		}
		if(value > 40000){
			setRadius = 500;
		}

	var CoolRoofsMarker = L.circle(latlng, setRadius, {
		stroke: true,
		color: '#ffffff',
		weight: 1,
		opacity: 1,
		fillColor: '#000000',
		fillOpacity: .5,

	})

	return CoolRoofsMarker;
}

var CoolRoofsClick = function (feature, layer) {
	layer.bindPopup("<strong>Size:</strong> " + feature.properties.TotalSF + " SF");
}

var CoolRoofsGeoJSON = L.geoJson(CoolRoofs, {
	pointToLayer: CoolRoofsPointToLayer,
	onEachFeature: CoolRoofsClick
}).addTo(map);

var baseMaps = {
    "CartoDB Light": CartoDBTiles,
    "CartoDB Dark": CartoDBDarkTiles,
};

var overlayMaps = {
    "Cool Roofs": CoolRoofsGeoJSON,
    "Population": neighborhoodsGeoJSON
};

// add control
L.control.layers(baseMaps, overlayMaps).addTo(map);