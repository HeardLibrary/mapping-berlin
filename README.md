# Mapping Berlin

The goal of this project is to create a light-weight, mobile ready map of points-of-interest in Berlin using open source technologies.
Okay, well, at least I've finally found the same file as I was looking at while in GitHub for Desktop!  With any luck, this will work. 

## Technologies

The project uses:

- [GeoJSON](http://geojson.org/) to encode GIS data points;
- [Cloudant](https://cloudant.com/) to store the GIS data points;
- [Leaflet.js](http://leafletjs.com/) for the interactive GIS layer;
- [MapBox](https://www.mapbox.com/mapbox.js/) to create the visual popups.
- [Bootstrap](http://getbootstrap.com/) for web design.

All code contributed by the staff members of the Jean and Alexander Heard Library is licensed under the GPLv3. Third-party code is governed by the respective licenses.

## Installation Instructions

This project runs with any web server; it does not require the use of  server-side technologies (like PHP, NodeJS, etc.). The project deploys HTML and Javascript files via HTTP to the client's device. The client then requests a base map using JSONP from Mapbox and requests the points to display (again using JSONP) from Cloudant.

![Project Architecture](http://i.imgur.com/zTF3ZiS.png?1)

The project does not require the installation of any database on the server. Rather, you will need accounts at both Mapbox and Cloudant to get started.

### Prerequisites

Set up an account at [Mapbox](https://www.mapbox.com) and then create a [new project](https://www.mapbox.com). After you have created a base map, copy the map ID. You will need this ID to connect your project to your map. You will also need to set up an account with [Cloudant](https://cloudant.com/). After you sign up for an account, click "Add New Database" to create a database to store your GeoJSON points.

### GeoJSON

[GeoJSON](http://geojson.org/) is the data structure through which this project is laid out.  There are many different ways of formatting GeoJSON, but in order for it to function with MapBox it must match the format show below:

```JSON
{
  "_id": "619fce05d00e5c4797e3fbb4f1f846f5",
  "_rev": "1-8e204833b3cfbfc7903971498c9d913e",
  "type": "Feature",
  "properties": {
    "title": "Checkpoint Bravo",
    "series": "Spring 2016",
    "tour": "1970",
    "marker-size": "medium",
    "marker-color": "#DF013A",
    "marker-symbol": "roadblock",
    "images": [
      {
        "format": "Image",
        "url": "https://upload.wikimedia.org/wikipedia/commons/9/90/Checkpoint_Bravo_Br%C3%BCckenhaus.jpg",
        "description": "Checkpoint Bravo Brückenhaus by Jochen Teufel. Checkpoint Bravo was, although less famous than Checkpoint Charlie, one of the most important and busy checkpoints from East and West Germany."
      },
      {
        "format": "Image",
        "url": "https://upload.wikimedia.org/wikipedia/commons/9/95/Berliner_Mauer_1987_00010033.jpg",
        "description": "Berliner Mauer 1987 by Jochims. After the reunitification process, the checkpoint fell into dispair. Eventually, it was transformed into Europarc Dreilinden, a park. However, the old guard tower still remains standing as a symbol of the checkpoint."
      }
    ]
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      13.1800957,
      52.409029
    ]
  }
}
```

Each point is represented as a feature and a collection of more than one point is called a "Feature Collection".  Latitude and longitudes must be done in decimal degrees.

### Cloudant

IBM [Cloudant](https://cloudant.com/) is a hosted version of [CouchDB](http://couchdb.apache.org/). CouchDB is a document-oriented database that stores data as JSON, uses Javascript for writing Map/Reduce functions, and communicates with applications via HTTP. Cloundant provides a fast and easy way to get started with CouchDB without installing anything on your computer or setting up a server. These characteristics make it easy to store GeoJSON features in the "cloud" and to send those features on demand to users.

#### Set Up

Setting up Cloudant requires entering GeoJSON documents and design documents called "views."

#### Adding Points

It's easy to add individual GeoJSON features to Cloudant. To add a point, for example, click on the gear symbol on the upper right corner of your database menu list.

![Imgur](http://i.imgur.com/97zfC2n.png)

Click "New Doc" and you'll generate a simple JSON document with only a single id/value pair.

![Imgur](http://i.imgur.com/fE1KDlA.png)

Add your GeoJSON data within this document, making sure to preserve the "_id" key/value pair at top. (You will need to add a comma to preserve the JSON syntax.) After you've added the GeoJSON data, click on "Save". Assuming that you've saved your information correctly, you'll have added your first point. Notice that you now have a "_rev" key/attribute too. CouchDB uses the "_id" and "_rev" key/value pairs for versioning so it's important not to alter them (unless you know what you're doing).

#### Writing Map Functions

Setting up design documetns is also straightforward. Click on the gear symbol, then select "New View." You'll be prompted to enter a name for your design document. We recommend "_design/tour" though you can *mutatis mutandis* use any name you'd like. After selecting a name for your design document, select a name for your view–for example, "Tree" to select all the documents about trees. Finally, you'll need to write a map function.

**N.B.** Mapping in this context does not have anything to do with GIS; it refers to a function that is applied to all items in some sort of array.

We've written a simple map function in Cloudant to view the documents about trees.

![Map Function in Cloudant](http://i.imgur.com/qIFmrsP.png)

You don't need to write a reduce function in this case; you should leave that section empty.

### Mapbox

[Mapbox](https://www.mapbox.com) provides an easy way to create custom maps and mapping applications.  Mapbox is free to use, as long as you stay within the 100mb storage limit and under 50,000 map views.  For most projects this should suffice.  For this project we developed a custom mapping application.  To do this, you must create a project, seelct a map, and save the project.  Onced saved, click the "Project" tab, and select the "info" tab.  Here you will find a "Map ID" that consists of your username and a combination of letters and numbers.  This key will be added to the map.js file so that the application knows where to map your GeoJson.  The [Mapbox JavaScript Library] (https://www.mapbox.com/mapbox.js/api/v2.1.9/) can be used to customize your map.  This library is built on top of [Leaflet](http://leafletjs.com/), and open soure JavaScript library.  [Leaflet](http://leafletjs.com/) is an open source JavaScript library built for creating interactive mobile maps.  If you would like to further customize the interface Leaflet offers many [examples](http://leafletjs.com/reference.html).

### Bootstrap

[Bootstrap](http://getbootstrap.com/) is an open source web framework designed for mobile clients. This project uses Bootstrap for its web design. The project relieves on content delivery networks (CDN) for the bootstrap files. You may customize the HTML and the CSS by overriding and adding local files.
