##Directions
1.  Go to [Mapbox](https://www.mapbox.com/) and create a free account.
2.  Download and install [TileMill](https://www.mapbox.com/tilemill/).
3.  Open TileMill
4.  Click "Settings" and authorize your new Mapbox account within TileMill.
5.  Click Projects and create a new project.
6.  Give your project a name and accept the default settings.
7.  Click your new project to open it.
8.  Once in your new project, you will go to the right hand side of the window and disable autopilot.  Normally autopilot would be good to use for beginners, but in this case we need to disable it so that we can create our custom map settings.
9.  Go to the bottom left of the map and select the layer symbol.  Click "Add layer".
10. Click "File" and "Browse".  Browse for the location where you have saved your historic map and click "Done".
11. Change the SRS dropdown to WGS 1984.  This is how we set the projection of the datasource, or in this case, our historic map.  
12. Click "Save & Stlye".  This step is critical.  If you do not set the strly then your map will not display.
13. In the right sidebar delete everything under autopilor.mss EXCEPT for the information pertaining to your map.  (For example-- do not delete where it says #1936 {raster-opacity:1;} 
14. 
