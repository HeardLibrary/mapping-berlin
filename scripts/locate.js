//Adapted from https://www.mapbox.com/mapbox.js/example/v1.0.0/geolocation/

// insert arrow icon into the map under the zoom controls
$('#map .leaflet-control-container div').first().append('<div id="geolocate" class="leaflet-control-locate leaflet-bar leaflet-control"><a class="leaflet-bar-part leaflet-bar-part-single" href="#" title="Show me where I am"></a></div>');
var geolocate = document.getElementById('geolocate');

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
if (!navigator.geolocation) {
    showAlert('alert-browser');
} else {
    geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate({maxZoom: 19, enableHighAccuracy: true});
        $('#geolocate').addClass("requesting"); // add spinning icon while locating the device
    };
}

// Once we've got a position, add a tooltip to indicate the user's position
map.on('locationfound', function(e) {
  $('#geolocate').removeClass('requesting'); // remove spinning icon; we will either locate the device or not below

    // Bounds of Vanderbilt campus ([36.150, -86.795], [36.137, -86.816])
    // If the location is detected as out of bounds, show warning and re-center on the map center
	if (e.latlng.lat < 36.137 || e.latlng.lat > 36.150 || e.latlng.lng > -86.796 || e.latlng.lng < -86.816)
  {
		showAlert('alert-vucampus');
    map.setView([36.145733, -86.800675], 16);
  } else
  {
    map.setView(e.latlng);
    var loc =
  	{
      type: "Feature",
      geometry: {
          type: "Point",
          coordinates: [e.latlng.lng, e.latlng.lat]
      },
      properties: {
          'marker-color': '#F00',
          'marker-symbol': 'heart'
      }
    };
    geoJson["locations"] = geoJson.push(loc);
    map.featureLayer.setGeoJSON(geoJson);
    $('#geolocate').addClass('active'); // change the arrow to blue when the device is found
  }
});

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {

    showAlert('alert-browser');
    $('#geolocate').removeClass('requesting'); // remove spinning icon when the device is not located
});

// Show and hide the alert box
function showAlert(alert_id){
  $("#"+alert_id).css({"display": "block"}).addClass("in");
  window.setTimeout(function () {
     hideAlert(alert_id);
  }, 4000);
}

function hideAlert(alert_id){
  $("#"+alert_id).removeClass("in").css({"display": "none"});
}
