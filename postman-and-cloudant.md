## Let's Map!

By now, you should have reached a point where you are comfortable with writing and editing GeoJSON.  Before we can add them to the map, we need to make sure that we include information to help make our points searchable.  You will do this by adding key/value pairs to you GeoJSON that helps us identify them as your new points. Please add these following key/values to the object that is the value of your "properties" keys, e.g.:

```json
    "title": "Neuköllner Oper",
    "series": "Spring 2018",
    "tour": "1908",
    "marker-symbol": "theatre"
```

If you would like to look at changes symbols, you can also do that by using this [site](https://www.mapbox.com/maki/) Note that not every maki icon is available in every map style.

Your GeoJSON should look like the code shown below.

```json
{
    "type": "Feature",
    "properties": {
        "title": "Neuköllner Oper",
        "series": "Spring 2018",
        "tour": "1908",
        "marker-symbol": "theatre",
        "Adresse": "Karl-Marx-Straße 131-133,12043 Berlin",
        "Haltestelle": "U Karl-Marx-Str.",
        "HaltestelleLat": "52,476,427",
        "HaltestelleLon": "13,439,808",
        "Entfernung": 127,
        "SUBahn": "U Karl-Marx-Str.",
        "SUEntfernung": 127,
        "Betreiber": "",
        "GruppeA": "Bühnen und Theater",
        "GruppeB": "Konzeptgeförderte Theater und Theater-/Tanzgruppen "
    },
    "geometry": {
        "type": "Point",
        "coordinates": [
            13.4394722,
            52.4775556
        ]
    }
}
```

The next step is to take these points and get them to our map. We are going to be using a web service style termed "Representational State Transfer" or [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), for short.

To make sure that our points make it to the map, we will need to connect to the database that we are using to store the points and upload them one by one. We are using a cloud database called [Cloudant](https://www.ibm.com/cloud/cloudant).  Cloudant is a hosted version of [CouchDB](http://couchdb.apache.org/), which is a database that used to store your data with JSON and makes them accessible to querying through a web browser.  CouchDB works well with Javascript and web apps, which is why we have chosen it for this project.

To make sure our points get posted to the map, we are going to use [Postman](https://www.getpostman.com/) to send an HTTP request to POST to Cloudant.  In other words, Postman will take our GeoJSON points and send them to the Cloudant database following the REST style.

Once you have installed Postman, please launch the application and sign up for a free account. Change the dropdown to Post (as shown in the image below) and type in this URL: `https://5bf7ab22-9d65-400d-8db3-4aa44c4dd32e-bluemix.cloudant.com/map-berlin/`

![Imgur](http://i.imgur.com/0ece0Ha.jpg)

Click the "Authorization" tab and change the drop-down from "No-auth" to "Basic Auth". Enter the username and password that your instructor provides.

Next, click the "Body" Tab and select the radio button labelled "raw," then change the dropdown to JSON. Paste your GeoJSON document into the box.

Once you have entered your document (if you have an error, it will show a red "X" next to the line), click "Send". You will get confirmation of your Post in the window below.

```JSON
{
    "ok": true,
    "id": "4e934312145501751e97a65d4f34e2ae",
    "rev": "1-ac22685d569566ac7aaa7c42ef5e10a6"
}
```

Now if we go to our [map](https://www.mapping.berlin/) and search for "Neuköllner Oper", you should see your new point.

![Neuköllner Oper](https://i.imgur.com/i9S1920.png)
