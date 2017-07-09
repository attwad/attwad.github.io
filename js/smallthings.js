// Create a raster item using the image tag with id='im'
var raster = new Raster('im');

// Hide the raster:
raster.visible = false;

// The size of our grid cells:
var gridSize = 3;

// Merge cells together:
var spacing = 1.0;// other interesting values: 1.6;//0.25;

var paths = [];

/*function onFrame(event) {
	// Each frame, change the fill color of the path slightly by
	// adding 1 to its hue:
  for (var i = 0; i < paths.length; i++) {
    paths[i].fillColor.hue += 1;
  }
}*/

raster.on('load', function() {
	// Since the example image we're using is much too large,
	// and therefore has way too many pixels, lets downsize it to
	// 40 pixels wide and 30 pixels high:
	raster.size = new Size(80, 60);

	for (var y = 0; y < raster.height; y++) {
		for(var x = 0; x < raster.width; x++) {
			// Get the color of the pixel:
			var color = raster.getPixel(x, y);

			// Create a circle shaped path:
			var path = new Path.Circle({
				center: new Point(x, y) * gridSize,
				radius: gridSize / 2 / spacing
			});

			// Set the fill color of the path to the color
			// of the pixel:
			path.fillColor = color;

      path.scale(1 - color.gray);
      paths.push(path);
		}
  }

	setInterval(function() {
		// Change the fill color of the path slightly by adding 1 to its hue.
		for (var i = 0; i < paths.length; i++) {
	    paths[i].fillColor.hue += 20;
	  }
	}, 1000);
	for (var i = 0; i < paths.length; i++) {
    paths[i].fillColor.hue += 1;
  }

	project.activeLayer.position = view.center;
});
