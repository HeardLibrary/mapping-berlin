# Storing Data in Cloudant

If you have lots of heterogeneous data, then document-oriented databases may be your solution. In this class session, we will show you how to set up [Cloudant](https://www.ibm.com/cloud/cloudant), a hosted version of [CouchDB](http://couchdb.apache.org/), and to query it using the [map/reduce](https://console.bluemix.net/docs/services/Cloudant/api/creating_views.html) paradigm.

### Create an IBM Cloudant Database

* Create an account on the [IBM Cloud](https://www.ibm.com/cloud/cloudant)
* Provision the Cloudant database
* Login to Cloudant
* Create a database titled `Berlin`

### Download the GeoJSON Data

The GeoJSON data for this exercise is available [here](https://gist.github.com/CliffordAnderson/17bfe445f35cbf5161c660ef4e87b151).

### CRUD Operations

* Click on permissions and generate an API key
* Grant writer permissions to your new key
* Create Postman operations to interact with your database

### Bulk Docs

It is also possible to upload multiple JSON documents at once using the `/_bulk_docs` interface. Try uploading the [entire dataset](https://gist.github.com/CliffordAnderson/17bfe445f35cbf5161c660ef4e87b151) at once. Be sure to send an array of GeoJSON objects, not a single FeatureCollection.

The format should look like this (see the [manual](https://wiki.apache.org/couchdb/HTTP_Bulk_Document_API)):

```json
{
     "docs": [
       {"_id": "0", "integer": 0, "string": "0"},
       {"_id": "1", "integer": 1, "string": "1"},
       {"_id": "2", "integer": 2, "string": "2"}
     ]
}
```

### Views

* Where are our cultural institutions located?

```js
function (doc) {
  emit(doc.properties.Institution, doc.properties.Adresse);
}
```

```
http get https://5bf7ab22-9d65-400d-8db3-4aa44c4dd32e-bluemix.cloudant.com/berlin-points-of-interest/_design/views/_view/addresses
```

* Which institutions are the shortest distances from UBahn stations?

```js
function (doc) {
  if (doc.properties.SUBahn && doc.properties.SUEntfernung)
    {emit(doc.properties.SUEntfernung, [doc.properties.Institution, doc.properties.SUBahn]); }
}
```

```
http get https://5bf7ab22-9d65-400d-8db3-4aa44c4dd32e-bluemix.cloudant.com/berlin-points-of-interest/_design/views/_view/distance?inclusive_end=true&start_key=0&end_key=100
```

### Reduce

* How many different kinds of institutions are there?

```js
function (doc) {
  emit(doc.properties.GruppeA, 1);
}
```

We'll use a built-in reduce function to count up the totals: `_sum`.

We can test out this map/reduce function by calling it with the appropriate query string values.

```
http get https://5bf7ab22-9d65-400d-8db3-4aa44c4dd32e-bluemix.cloudant.com/berlin-points-of-interest/_design/views/_view/kinds?reduce=true&group=true
```


### Search

* How can I look up a cultural institution by name?

```js
function(doc) {
    index("default", doc.properties.Institution);
}
```

```
http get https://5bf7ab22-9d65-400d-8db3-4aa44c4dd32e-bluemix.cloudant.com/berlin-points-of-interest/_design/views/_search/Search?q=theatre
```

### Geospatial Indexes

* How can I find locations within a circular area?

```js
function (doc) {
  if (doc.geometry && doc.geometry.coordinates) {
    st_index(doc.geometry);
  }
}
```

http get https://5bf7ab22-9d65-400d-8db3-4aa44c4dd32e-bluemix.cloudant.com/berlin-points-of-interest/_design/geospatial/_geo/GeoIndex?lat=52.50953477032727&lon=13.388900756835938&radius=4707.3407860524685&limit=20&relation=contains
