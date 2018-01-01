// ACTION ITEM: Set the variables for your map in this configuration file

var config = {
  // ACTION ITEM: replace mapbox access token below with your own mapbox access token
  // and set intial map style, center, and zoom.
  accessToken: "pk.eyJ1IjoibWlza290dGUiLCJhIjoiOGp0VEpwUSJ9.sDOYAReEdCQfxFZuGDXBaQ",
  // ACTION ITEM: Replace mapbox id below with the mapbox id that corresponds to your georeferenced map.
  initialStyle: "mapbox://styles/miskotte/cjbo0ss1s5jkr2sqml6c3phei",
  initialCenter: [13.40, 52.52], // Berlin
  initialZoom: 12,
  // ACTION ITEM: Replace cloudant database URL and design with
  // corresponding URL and design for your database.
  cloudantURLBase: "https://5bf7ab22-9d65-400d-8db3-4aa44c4dd32e-bluemix.cloudant.com/map-berlin/",
  cloudantURLDesign: "_design/tour/",
}

var layers = {
  // ACTION ITEM: If you would like to incorporate multiple views into your mapping application, remove the double slashes.
  // ACTION ITEM: Remember to replace your selection with the corresponding map.
  "Berlin 1895": "mapbox://miskotte.bp4hnaep",
  "Berlin 1908": "mapbox://vulibrarygis.Berlin_1908",
  "Berlin 1920": "mapbox://vulibrarygis.Berlin1920",
  "Berlin 1936": "mapbox://vulibrarygis.Berlin_1936",
  "Berlin 1947": "mapbox://vulibrarygis.Berlin_1947",
  "Berlin 1970": "mapbox://vulibrarygis.Berlin_1970"
}
