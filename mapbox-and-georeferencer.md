# Mapbox and Georefencer

Our goals today are to learn how to use [Mapbox Studio](https://www.mapbox.com/studio/) to create datasets, tilesets, and styles. We'll also practice georeferencing a map with [Georefencer](https://www.georeferencer.com/).

## Mapbox Studio

* Create an account on [Mapbox](https://www.mapbox.com/signup/) and sign into [studio](https://www.mapbox.com/studio/).
* Download the [GeoJSON for the Berlin Wall](https://gist.github.com/CliffordAnderson/1a3e7f12e8f2e7a04a5ace47076a8b6a) and save as a file on your computer.
* Click on [Datasets](https://www.mapbox.com/studio/datasets/) and then "New Dataset." Upload your Berlin Wall data set and name it appropriately.
* After you've created a data set for the Berlin Wall, create a [tileset](https://www.mapbox.com/studio/tilesets/)
* Finally, create a [Style](https://www.mapbox.com/studio/styles) and add your layer to the map.

## Georefencer

* Select a public domain map to georeference. If you do not have a map selected, try selecting from among the [Old Maps of Berlin](https://commons.wikimedia.org/wiki/Category:Old_maps_of_Berlin) on Wikimedia Commons. Be sure to save the map in its original (highest) resolution.
* Create an account on [Georefencer](https://www.georeferencer.com) and sign in.
* Click on [Compare and Overlay](https://www.georeferencer.com/compare) and upload your map.
* Use the georeferencing tool to select control points on the base map as well as your historical map.
* When the tool tells you that you have sufficient points, click on "This Map" and "Export to GeoTIFF." The process of conversation takes time; you'll be alerted by email and on the website when it's finished.
* After downloading the file, upload your GeoTiff as a Tileset to Mapbox and add it as a layer to your Style.
