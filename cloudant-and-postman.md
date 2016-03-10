##Let's Map!

By now, you should have reached a point where you are comfortable with writing and editing GeoJSON.  Before we can add them to the map, we need to make sure that we include information to help make our points searchable.  You will accomplish this by adding a key and value to you GeoJSON that helps us identify them as your new points.  To do this, will add a key called "series" and a value of "Spring 2016".  You will also add a key called "tour" and a value of "Test".  Eventually, the value for "tour" will be replaced by your map year, but do not worry about this for now.  

If you would like to look at changes symbols, you can also do that by using this [site](https://www.mapbox.com/maki/)

Your GeoJSON should look similar to the code shown below. 

```json
{
  "type": "Feature",
  "properties": {
    "title": "Berlin Chancellary",
    "series": "Spring 2016",
    "tour": "Test",
    "marker-size": "medium",
    "marker-color": "#FFFF00",
    "marker-symbol": "theatre"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      13.369052,
      52.520207
    ]
  }
}
```
The next step is to take these points and get them to our map.

In order to make sure that our points make it to the map, we will need to connect to the database that we are using to store the points and upload them one by one.  We are using a cloud database called [Cloudant](https://cloudant.com/).  Cloudant is a hosted version of [CouchDB](http://couchdb.apache.org/), which is a database that used to store your data with JSON and makes them accessible to querying through a web browser.  CouchDB works well with Javascript and web apps, which is why we have chosen it for this project.

To make sure our points are posted to the map, we are going to use [Postman](https://www.getpostman.com/) to send an HTTP request to POST to Cloudant.  In other words, Postman man will take our GeoJSON points and post them to the Cloudant database for us.

In order to do this, we first need to make sure you are using the Chrome web browser by Google.  If you are not, you can download it [here](https://www.google.com/chrome/browser/desktop/) and go ahead and install it.

Next, add [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).

![Imgur](http://i.imgur.com/ci2WODU.png)

Once you have added Postman to Chrome, go ahead and launch the program.  Change the drop-down to Post (as shown in the image below) and type out this URL: vulibrarygis.cloudant.com/mapping-berlin/_bulk_docs

Click the "Authoirzation" tab and change the drop-down from "No-auth" to "Basic Auth".  Type in the login information found [here](https://gist.github.com/CliffordAnderson/b816459034a0590d5d68/revisions)

![Imgur](http://i.imgur.com/0ece0Ha.jpg)

Next, click the "Body" Tab and select the radio button that says "raw".  And change the drop down to JSON.  Next Paste your GeoJSON code into the box.  Then add ```{"docs": [ ``` to the beginning of you GeoJSON and ```]}``` to the end.  The final version of your code should look something similar to this: 
```
{
  "docs": [
    {
      "type": "Feature",
      "properties": {
        "title": "Berlin Chancellary",
        "series": "Spring 2016",
        "tour": "Test",
        "marker-size": "medium",
        "marker-color": "#FFFF00",
        "marker-symbol": "theatre"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          13.369052,
          52.520207
        ]
      }
    }
  ]
}
```
Once you have correctly entered your code (if you have an error, it will show a red "X" next to the line),  Click SEND.  You will get confirmation of your Post in the window below.

![Imgur](http://i.imgur.com/hL1mzMG.jpg)

Now if we go to our [map](http://heardlibrary.github.io/mapping-berlin/) and change the dropdown to "Test", you should see your new point.

![Imgur](http://i.imgur.com/NuHl9LK.jpg)





