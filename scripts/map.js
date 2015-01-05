// code adapted from https://www.mapbox.com/mapbox.js/example/v1.0.0/markers-with-image-slideshow/

var map = L.mapbox.map('map', 'vulibrarygis.hj4f8a4e', {
            minZoom: 12,
            maxZoom: 19,
            maxBounds: [[36.12,-86.75], [36.17,-86.85]]});
			


// Add custom popup html to each marker
map.markerLayer.on('layeradd', function(e) {
    var marker = e.layer;
    var feature = marker.feature;
    var images = feature.properties.images
    var slideshowContent = '';

    for(var i = 0; i < images.length; i++) {
        var img = images[i];

        slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
        '<img src="' + img[0] + '" />' +
        '<div class="caption">' + img[1] + '</div>' +
        '</div>';
    }

    // Create custom popup content
    var popupContent =  '<div id="' + feature.properties.id + '" class="popup">' +
    '<h2>' + feature.properties.title + '</h2>' +
    '<div class="slideshow">' +
    slideshowContent +
    '</div>' +
    '<div class="cycle">' +
    '<a href="#" class="prev">&laquo; Previous</a>' +
    '<a href="#" class="next">Next &raquo;</a>' +
    '</div>'
    '</div>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        maxWidth: 200,
		autoPan: true,
        keepInView: true
    });
});

// Add features to the map
map.markerLayer.setGeoJSON(geoJson);

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

map.setView([36.145733, -86.800675], 16);
