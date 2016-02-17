##Instructions for finding a photograph for your map

* Find a photograph of Berlin in [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page) or any other source with [EXIF](https://en.wikipedia.org/wiki/Exchangeable_image_file_format) data and a [Creative Commons](http://creativecommons.org/) license. For example, [The Berlin Chancellary](https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Kanzler21a.jpg/320px-Kanzler21a.jpg) by Madden.

* Copy the URL of the photo and save it somewhere to use in a moment.  In this case, our URL is: ```https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Kanzler21a.jpg/320px-Kanzler21a.jpg```

* Find the latitude and longitude information for the location of your photo.  If it is not listed on the details page or EXIF information for you photo,  then you might want to try googling the location.  Please note, you must have your location information in decimal degrees.  If your point is not in decimal degrees then you will need to convert from something like degrees, minutes, seconds using an online converter.

* Converting into decimal format using an [online converter](http://www.fcc.gov/encyclopedia/degrees-minutes-seconds-tofrom-decimal-degrees). Note that you'll need to remove the character codes for the minutes (```&#x27;```) and seconds (```&quot;```)

* Plug your decimal coodinates into [Google Maps](https://www.google.com/maps/place/52%C2%B030'13.0%22N+13%C2%B019'53.4%22E/@52.5036106,13.3315,15z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0), remembering to separate them with a comma.

* Copy a "feature" from the existing GeoJson. For example,
  
* Edit the GeoJSON to reflect the information about your new point and image. Be sure to include official title and authorial credit in the description of the image. Plug in the URL for you image as shown below, as well as the decimal degrees for your coordinates.  You will also need to make sure that your format matches exactly what is shown below.  The quoations surround the ```<img src />``` tag must be double quotes, while interior quotaion marks must be single quotes.  For example,

 ```json
    {
  "type": "Feature",
  "properties": {
    "title": "Berlin Chancellary",
    "series": "Spring 2015",
    "tour": "1970",
    "marker-size": "medium",
    "marker-color": "#FFFF00",
    "marker-symbol": "rail-metro",
    "images": [
      [
        "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Kanzler21a.jpg/320px-Kanzler21a.jpg' />",
        "This is a picture of the new chancellary."
      ],
      ["<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Kanzler21a.jpg/320px-Kanzler21a.jpg' />",
        "This is the same picture again."]
    ]
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

* After saving everything, you should be ready to post your point to the database using the Postman directions! 

![Imgur](http://i.imgur.com/gLuv6hd.jpg)
