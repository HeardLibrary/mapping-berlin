# Getting Started with JSON and GeoJSON

## Learning Outcomes

* Gain facility with the Atom Editor and learn how to use its [package manager](https://flight-manual.atom.io/using-atom/sections/atom-packages/), APM, to install [packages](https://atom.io/packages);
* Identify the components of the JSON data standard and apply them practically; 
* Enocde and validate geospatial information with GeoJSON.

## Installing [Atom](https://atom.io/)

* Atom [Shortcuts](https://github.com/nwinkler/atom-keyboard-shortcuts)
* Installing [atom-linter](https://github.com/steelbrain/atom-linter), a [linter](https://en.wikipedia.org/wiki/Lint_(software)) for Atom.
* Installing [linter-jsonlinter](https://github.com/AtomLinter/linter-jsonlint), a linter for JSON
* Installing [atom-jsonpp](https://github.com/swenson/atom-jsonpp), Atom editor JSON pretty printer.

## Understanding [JSON](http://www.json.org/)

JSON (or JavaScript Object Notation) originally emerged as a competitor to XML among web developers, who wanted a simpler alternative to XML for transmitting data on the Internet. Doug Crockford's original specification of [JSON](https://www.json.org/) has now become an ECMA (from "European Computer Manufacturers Association") [standard](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).

JSON can be very simple. The following are valid JSON documents.

```json
"hello"
```

```json
[1, 2, 3]
```

```json
{
  "hello" : "world"
}
```

But, because JSON objects and arrays can be nested, JSON can also grow [complex](https://github.com/UniversalViewer/examples/blob/master/manifests.json).

### Exercise

* Mark up this [list of Berlin U-Bahn stations](https://en.wikipedia.org/wiki/List_of_Berlin_U-Bahn_stations) as JSON

## Exploring [GeoJSON](http://geojson.org/)

GeoJSON is a JSON-based format for describing geospatial data. The original [GeoJSON](http://geojson.org/) specification has become an official Internet Engineering Task Force (IETF) [standard](https://tools.ietf.org/html/rfc7946). If you find concepts like "linear rings" challenging to understand, see Tom MacWright's blog post, [More than you ever wanted to know about GeoJSON](https://macwright.org/2015/03/23/geojson-second-bite).

A canonical example of GeoJSON is the example for Dinagat Island.

```json
{
  "type": "Feature",
  "properties": {
    "name": "Dinagat Islands"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      125.6,
      10.1
    ]
  }
}
```

Since GeoJSON allows us to add arbitrary key-value pairs to our properties, we are adding data that associates metadata with our objects on the map.

```json
{
  "type": "Feature",
  "properties": {
    "title": "Friedrichstraße",
    "series": "Spring 2015",
    "tour": "1970",
    "marker-size": "medium",
    "marker-color": "#FFFF00",
    "marker-symbol": "rail-metro"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      13.386978,
      52.520289
    ]
  }
}
```

### GeoJSON tools

* Using a [GeoJSON linter](http://geojsonlint.com/)
* [geojson.io](http://geojson.io/) is a great tool for converting data to GeoJSON, displaying it on a map, editing it, and sharing it with others.
* You can also display GeoJSON data with a Github [Gist](https://gist.github.com/CliffordAnderson/8c9e338f274b109594ca)

### Exercises

* Create and validate a GeoJSON point for a site of interest in Berlin
* Convert this Excel sheet of [Sites of Cultural Institutions in Berlin](https://www.europeandataportal.eu/data/en/dataset/standorte-institutionell-geforderter-kultureinrichtungen/resource/c9048ce9-024f-471d-ba18-fb37bf778e17) into GeoJSON and display the points on a map.
