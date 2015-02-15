##Instructions for finding a youtube video for your map

* Find a video of Berlin in [youTube](https://www.youtube.com/) or any other source with a [Creative Commons](http://creativecommons.org/) license. For example, [St. Nicholas' Church, Berlin, Germany](https://www.youtube.com/watch?v=uKlPfgi8xHw) by Igor Skoglund.

* Click Share.  CLick Embed.  Copy the embedded url: ```<iframe width="420" height="315" src="https://www.youtube.com/embed/uKlPfgi8xHw" frameborder="0" allowfullscreen></iframe>```

* Edit the link width to 180 and delete the height variable.  You will also want to delete the 's' from 'https:' and add a double quote around your code.  Make sure al of your code matches the following format with slashes as well.  For example : ```"<iframe width=\"180\" src=\"http://www.youtube.com/embed/uKlPfgi8xHw\" frameborder=\"0\" allowfullscreen><\/iframe>"```

* Find the Latitude and Longitude of the video you want to use with [Google Maps](https://www.google.com/maps/place/St+Nicholas'+Church,+10178+Berlin,+Germany/@52.5168424,13.4074785,17z/data=!3m1!4b1!4m2!3m1!1s0x47a84e20c2c2a4a7:0x73bc4247163b5be8).  Make sure you are using decimal degrees.

* Open ```map.geojson``` in the \scripts folder of your local copy of EUS0991.01 in the [Atom](https://atom.io/) editor.

* Copy a "feature" from the existing GeoJson. For example,
    ```json
    {
    "type": "Feature",
    "properties": {
      "title": "Brandenburg Gate",
      "marker-size": "medium",
      "marker-color": "#3366FF",
      "marker-symbol": "star-stroked",
      "images": [
        ['<img src="images/Brandenburger_Tor_abends.jpg" />',
          "The Brandenburg Gate."
        ],
        ['<img src="images/Brandenburger2.jpg" />',
          "The Brandengurb Gate quadriga at night."
        ]
      ]
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        "13.377674",
        "52.516224"
      ]
    }
  }
  ```
* Edit the GeoJSON to reflect the information about your new point and image. Be sure to include official title and authorial credit in the description of the image. For example,

 ```json
    {
        "type": "Feature",
        "properties": {
          "title": "St. Nicholas' Church, Berlin, Germany",
          "marker-size": "medium",
          "marker-color": "#3366FF",
          "marker-symbol": "star-stroked",
          "images": [
            ["<iframe width=\"180\" src=\"http://www.youtube.com/embed/uKlPfgi8xHw\" frameborder=\"0\" allowfullscreen><\/iframe>",
              "St. Nicholas' Church, Berlin, Germany by ."
            ]
          ]
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            "13.4074785",
            "52.5168424"
          ]
        }
        }
```
* Finally, add your new GeoJSON point to the existing GeoJSON feature collection. For example,

    ```JSON
   var geoJson = [{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "title": "Brandenburg Gate",
      "marker-size": "medium",
      "marker-color": "#3366FF",
      "marker-symbol": "star-stroked",
      "images": [
        [
          "<img src=\"images/Brandenburger_Tor_abends.jpg\" />",
          "The Brandenburg Gate."
        ],
        [
          "<img src=\"images/Brandenburger2.jpg\" />",
          "The Brandengurb Gate quadriga at night."
        ]
      ]
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        "13.377674",
        "52.516224"
      ]
    }
    }, {
      "type": "Feature",
      "properties": {
        "title": "Koeningsplatz",
        "marker-size": "medium",
        "marker-color": "#e5c278",
        "marker-symbol": "star-stroked",
        "images": [
          [
            "<iframe width=\"180\"  src=\"http://www.youtube.com/embed/cklBBshc_uQ?rel=0\" frameborder=\"0\" allowfullscreen><\/iframe>",
            "A tour of the Reichstag building."
          ],
          [
            "<img src=\"images/Reichstag_building_Berlin_view_from_west_before_sunset.jpg\" />",
            "The Reichstag building."
          ]
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          "13.376199",
          "52.517539"
        ]
      }
      }, {
        "type": "Feature",
        "properties": {
          "title": "St. Nicholas' Church, Berlin, Germany",
          "marker-size": "medium",
          "marker-color": "#3366FF",
          "marker-symbol": "star-stroked",
          "images": [
            ["<iframe width=\"180\" src=\"http://www.youtube.com/embed/uKlPfgi8xHw\" frameborder=\"0\" allowfullscreen><\/iframe>",
              "St. Nicholas' Church, Berlin, Germany by ."
            ]
          ]
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            "13.4074785",
            "52.5168424"
          ]
        }
        }, {
          "type": "Feature",
          "properties": {
            "title": "KurfÃƒÂ¼rstendamm",
            "marker-size": "medium",
            "marker-color": "#3366FF",
            "marker-symbol": "star-stroked",
            "images": [
              [
                "<img src=\"images/14500796957_8b7486f127_q.jpg\" />",
                "Fan Party by Hans-JÃƒÂ¶rg Aleff."
              ]
            ]
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              "13.327080",
              "52.503101"
            ]
          }
          }]
          }];
```

* After saving everything, you should be finished! To check your work, double-click on "index.html" and your new point should now appear on your map.


![Imgur](http://i.imgur.com/gLuv6hd.jpg)
