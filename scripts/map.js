// code adapted from https://www.mapbox.com/mapbox.js/example/v1.0.0/markers-with-image-slideshow/

L.mapbox.accessToken =
	'PUT YOUR PUBLIC TOKEN HERE';

// If you do not have a Mapbox key, refer to the readme.md
var map = L.mapbox.map('map', 'PUT YOUR MAP ID HERE', {
	minZoom: 12,
	maxZoom: 19,
	maxBounds: [
		[36.12, -86.75],
		[36.17, -86.85]
	]
});

// Add custom popup html to each marker
map.featureLayer.on('layeradd', function(e) {
	var marker = e.layer;
	var feature = marker.feature;
	var images = feature.properties.images;
	var slideshowContent = '';

	for (var i = 0; i < images.length; i++) {
		var img = images[i];

		slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') +
			'">' +
			img[0] +
			'<div class="caption">' + img[1] + '</div>' +
			'</div>';
	}

	// Create custom popup content
	var popupContent = '<div id="' + feature.properties.id +
		'" class="popup">' +
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

map.setView([36.145733, -86.800675], 19);

// Get the points from Cloudant using JSONP
// http://stackoverflow.com/questions/14220321/how-to-return-the-response-from-an-ajax-call
$(function() {

	// list views from Cloudant that we want to offer as layers
	// Use the REST URL from Cloudant, e.g. https://vulibrarygis.cloudant.com/campustour/_design/tour
	var cloudantViews = [];
	$.getJSON('PUT YOUR CLOUDANT URL HERE',
		function(result) {
			var viewsList = result.views;
			for (var v in viewsList) {
				cloudantViews.push(v);
			}

			// put each view into the dropdown menu
			$.each(cloudantViews, function(i, viewname) {
				$('#layers-dropdown').append('<option value="' + viewname +
					'">' +
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
	});
});


function getLayer(callback, cloudantView) {
	// use the REST URL from Cloudant, e.g.
	// https://vulibrarygis.cloudant.com/campustour/_design/tour/_view/

	var cloudantURLbase =
		"PUT YOUR CLOUDANT URL HERE";
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

function processLayer(result) {
	// Add features to the map
	map.featureLayer.setGeoJSON(result);
}
