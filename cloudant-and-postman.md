##How to Post your Points to the Map

By now, you should have reached a point where you are comfortable with writing and editing GeoJSON.  Before we can add them to the map, we need to make sure that we include information to help make our points searchable.  You will accomplish this by adding a key and value to you GeoJSON that helps us identify them as your new points.  To do this, we will add a key called "series" and a value of "Test"

Your GeoJSON should look similar to the code shown below. 

```json
{
"type": "Feature",
"properties": {
  "title": "Berlin Chancellary",
  "series": "Spring 2015",
  "tour": "Test",
  "marker-size": "medium",
  "marker-color": "#FFFF00",
  "marker-symbol": "rail-metro",
  "geometry": {
  "type": "Point",
  "coordinates": [
    "13.369052",
    "52.520207"
  ]
}
}
```
The next step is to take these points and get them to our map.

In order to make sure that our points make it to the map, we will need to connect to the database that we are using to store the points and upload them one by one.  We are using a cloud database called [Cloudant](https://cloudant.com/).  Cloudant is a hosted version of [CouchDB](http://couchdb.apache.org/), which is a database that used to store your data with JSON and makes them accessible to querying through a web browser.  CouchDB works well with Javascript and web apps, which is why we have chosen it for this project.

First, make sure you are using the Chrome web browser by Google.  If you are not, you can download it [here](https://www.google.com/chrome/browser/desktop/) and go ahead and install it.

Next, add [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).

![Imgur](http://i.imgur.com/ci2WODU.png).
