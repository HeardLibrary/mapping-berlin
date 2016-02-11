##Instructions for Adding a YouTube Video to Your Map

* Find a video of Berlin in [youTube](https://www.youtube.com/) or any other source with a [Creative Commons](http://creativecommons.org/) license. For example, [St. Nicholas' Church, Berlin, Germany](https://www.youtube.com/watch?v=uKlPfgi8xHw) by Igor Skoglund.

* Click Share.  Click Embed.  Copy the embedded url: ```<iframe width="420" height="315" src="https://www.youtube.com/embed/uKlPfgi8xHw" frameborder="0" allowfullscreen></iframe>```

* Remove everything but the URL: ```http://www.youtube.com/embed/uKlPfgi8xHw```

* Find the Latitude and Longitude of the video you want to use with [Google Maps](https://www.google.com/maps/place/St+Nicholas'+Church,+10178+Berlin,+Germany/@52.5168424,13.4074785,17z/data=!3m1!4b1!4m2!3m1!1s0x47a84e20c2c2a4a7:0x73bc4247163b5be8).  Make sure you are using decimal degrees.

* Copy a "feature" from the existing GeoJSON. For example,
    ```json
    {
    "type": "Feature",
    "properties": {
      "title": "Berlin Chancellary",
      "series": "Spring 2016",
      "tour": "Test",
      "marker-size": "medium",
      "marker-color": "#ffffff",
      "marker-symbol": "rail-metro",
      "images": [
        [
          {
           "format" : "Image",
           "url" : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Kanzler21a.jpg/320px-Kanzler21a.jpg",
           "description" :  "This is a picture of the new chancellory." }
        ]
      ]
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        13.469052,
        52.520207
      ]
    }
    }
  ```
* Edit the GeoJSON to reflect the information about your new point and image. Be sure to include official title and authorial credit in the description of the image. For example,

 ```json
 {
 "type": "Feature",
 "properties": {
   "title": "Berlin Chancellary",
   "series": "Spring 2016",
   "tour": "Test",
   "marker-size": "medium",
   "marker-color": "#ffffff",
   "marker-symbol": "rail-metro",
   "images": [
     [
       {
        "format" : "Image",
        "url" : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Kanzler21a.jpg/320px-Kanzler21a.jpg",
        "description" :  "This is a picture of the new chancellory." }
     ],
     [
       {
        "format" : "YouTube",  
        "url" : "https://www.youtube.com/embed/Tz0HPI1bKsQ",
        "description" :  "This is a video of Berlin and stuff in it." }
     ]
   ]
 },
 "geometry": {
   "type": "Point",
   "coordinates": [
     13.469052,
     52.520207
   ]
 }
}
```

* After saving everything, you should be ready to add your point to the map database using the Postman directions!


![Imgur](http://i.imgur.com/gLuv6hd.jpg)
