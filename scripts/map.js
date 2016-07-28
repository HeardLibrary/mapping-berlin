// code adapted from https://www.mapbox.com/mapbox.js/example/v1.0.0/markers-with-image-slideshow/

L.mapbox.accessToken =
	'pk.eyJ1IjoidnVsaWJyYXJ5Z2lzIiwiYSI6ImFaN2JkSlUifQ.Dl2sTO1mGKK7MCd1ViGPnQ';

// If you do not have a Mapbox key, refer to the readme.md
var map = L.mapbox.map('map', "vulibrarygis.of23e6p0").setView([52.51, 13.38],
	12);
var layer = L.mapbox.featureLayer().addTo(map)

// Add custom popup html to each marker
layer.on('layeradd', function(e) {
	var marker = e.layer;
	var feature = marker.feature;
	var images = feature.properties.images;
	var slideshowContent = '';

	if (typeof images !== "undefined") {
		for (var i = 0; i < images.length; i++) {
			var img = images[i];
			slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') +
				'">' +
				formatMedia(img) +
				'<div class="caption">' + img.description + '</div>' +
				'</div>';
		}
	}

	// Adds corresponding HTML element to format the media formats appropriately.
	// The list of acceptable formats may be expanded as necessary.
	function formatMedia(img) {
		if (img.format === "YouTube") {
			return "<iframe width='175' src='" + img.url +
				"' frameborder='0' allowfullscreen=''></iframe>";
		}
		if (img.format === "Image") {
			return "<img src='" + img.url + "'/>";
		}
	}

	// Create custom popup content
	var popupContent = '<div id="' + feature.properties.id + '" class="popup">' +
		'<h2>' + feature.properties.title + '</h2>' +
		'<div class="slideshow">' +
		slideshowContent +
		'</div>' +
		'<div class="cycle">' +
		'<a href="#" class="prev">&laquo; Previous</a>' +
		'<a href="#" class="next">Next &raquo;</a>' +
		'</div>';
	'</div>';

	// http://leafletjs.com/reference.html#popup
	marker.bindPopup(popupContent, {
		closeButton: false,
		maxWidth: 200,
		autoPan: true,
		keepInView: true
	});
});

// This example uses jQuery to make selecting items in the slideshow easier.
// Download it from http://jquery.com
$('#map').on('click', '.popup .cycle a', function() {
	var $slideshow = $('.slideshow'),
		$newSlide;

	if ($(this).hasClass('prev')) {
		$newSlide = $slideshow.find('.active').prev();
		if ($newSlide.index() < 0) {
			$newSlide = $('.image').last();
		}
	} else {
		$newSlide = $slideshow.find('.active').next();
		if ($newSlide.index() < 0) {
			$newSlide = $('.image').first();
		}
	}

	$slideshow.find('.active').removeClass('active').hide();
	$newSlide.addClass('active').show();
	return false;
});

// Get the points from Cloudant using JSONP
// http://stackoverflow.com/questions/14220321/how-to-return-the-response-from-an-ajax-call
$(function() {

	// list views from Cloudant that we want to offer as layers
	var cloudantViews = [];
	$.getJSON('https://vulibrarygis.cloudant.com/map-berlin/_design/tour/',
		function(result) {
			var viewsList = result.views;
			for (var v in viewsList) {
				cloudantViews.push(v);
			}

			// put each view into the dropdown menu
			$.each(cloudantViews, function(i, viewname) {
				$('#layers-dropdown').append('<option value="' + viewname + '">' +
					viewname + '</option>');
			});
		});

	// when the user selects from the dropdown, change the layer
	$('#layers-dropdown').change(function() {
		var selection_label = $('#layers-dropdown option:selected').text();
		var selection_value = $('#layers-dropdown').val();
		if (selection_value !== 'default') {
			var thisCloudantView = selection_value;
			getLayer(processLayer, thisCloudantView);
		}
		$("#searchText").val(""); // empty the searchbox when choosing a layer
	});
});

$("#search").submit(function(event) {
	event.preventDefault();
	var searchText = $("#searchText").val();
	$('#layers-dropdown').val("default"); // reset the dropdown to default value
	searchPoints(getPoints, searchText);
});

function getLayer(callback, cloudantView) {
	var cloudantURLbase =
		"https://vulibrarygis.cloudant.com/map-berlin/_design/tour/_view/";
	var cloudantURLcallback = "?callback=?";
	var thisCloudantURL = cloudantURLbase + cloudantView + cloudantURLcallback;
	$.getJSON(thisCloudantURL, function(result) {
		var points = result.rows;
		var geoJSON = [];
		for (var i in points) {
			geoJSON["locations"] = geoJSON.push(points[i].value);
		}
		callback(geoJSON);
	});
}

// See http://stackoverflow.com/questions/19916894/wait-for-multiple-getjson-calls-to-finish
function searchPoints(callback, cloudantSearch) {
	var cloudantURLbase =
		"https://vulibrarygis.cloudant.com/map-berlin/_design/tour/_search/ids?q=";
	var cloudantURLcallback = "&callback=?";
	var thisCloudantURL = cloudantURLbase + cloudantSearch + cloudantURLcallback;
	$.getJSON(thisCloudantURL, function(result) {
		var ids = [];
		var rows = result.rows;
		if (rows.length > 0) {
		callback(rows);
		} else {
			showAlert('alert-noresults');
		}
	});
}

function getPoints(cloudantIDs) {
	var geoJSON = [];
	if (typeof cloudantIDs !== "undefined") {
		for (var i in cloudantIDs) {
			geoJSON.push(getPoint(cloudantIDs[i].id));
		}
	}

	function getPoint(id) {
		var cloudantURLbase = "https://vulibrarygis.cloudant.com/map-berlin/";
		var url = cloudantURLbase + id;
		return $.getJSON(url); // this returns a "promise"
	}

	$.when.apply($, geoJSON).done(function() {
		// This callback will be called with multiple arguments,
		// one for each AJAX call
		// Each argument is an array with the following structure: [data, statusText, jqXHR]
		var geoJSON = [];
		// If a single object comes back, it will be as an object not an array of objects.
		if (Array.isArray(arguments[0])) {
			for (var i in arguments) {
				geoJSON.push(arguments[i][0]);
			}
			processLayer(geoJSON);
		} else if (typeof arguments[0] !== 'undefined') {
			geoJSON.push(arguments[0]);
			processLayer(geoJSON);
		}
	});
}

function processLayer(result) {
	// Add features to the map
	var selection_label = $('#layers-dropdown option:selected').text();
	if (selection_label == "1908") {
		new_id = 'vulibrarygis.l74iic1a'
	} else if (selection_label == "1920") {
		new_id = 'vulibrarygis.l366jopj'
	} else if (selection_label == "1936") {
		new_id = 'vulibrarygis.l369lc2l'
	} else if (selection_label == "1947") {
		new_id = 'vulibrarygis.l36anlai'
	} else if (selection_label == "1970") {
		new_id = 'vulibrarygis.l36db1a5'
	} else {
		new_id = 'vulibrarygis.of23e6p0'
	};
	var new_layer = L.mapbox.tileLayer(new_id);
	new_layer.addTo(map);
	layer.setGeoJSON(result);
}

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
