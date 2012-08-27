require(["renderer", "cubeUtils", "stacksCanvas"], function(renderer, cubeUtils, stacksCanvas) {

	currentMousePos = {};
	var canvas = stacksCanvas.get(0).getContext("2d");
	$(stacksCanvas).bind("mousewheel", function(event, delta) {
		
		renderer.zoom(delta/120, event.clientX, event.clientY);
					
	});
	var backgroundGrid = function(canvas) {
	
		var grid = new Image(),
			pattern;
		grid.src = '/images/gridBG2.png';
		grid.onload = function(){
		
			pattern = canvas.createPattern(grid,'repeat');
		
		};
		  
		return function(canvas, width, height) {
		
			if(grid) {
			
				canvas.fillStyle = pattern;
				canvas.fillRect(0, 0, width, height); 
				
			}
		
		};
	
	};
	
	var gridSquareHighLight = function(canvas) {
				
		var x = currentMousePos.x || 0,
		y = currentMousePos.y || 0;

		var gridPos = cubeUtils.getTileFromMousePos(x, y, canvas.getImageData(x, y, 1, 1).data);
		
		var squareVectors = cubeUtils.createSquareVectors(gridPos.X, gridPos.Y);
		canvas.moveTo(squareVectors[0], squareVectors[1]);
		canvas.lineTo(squareVectors[2], squareVectors[3]);
		canvas.lineTo(squareVectors[4], squareVectors[5]);
		canvas.lineTo(squareVectors[6], squareVectors[7]);
		canvas.lineTo(squareVectors[8], squareVectors[9]);
		canvas.strokeStyle = "#00f";
		canvas.stroke();
	
	};
	
	renderer.objectGraph.backgroundGrid = backgroundGrid(canvas);
	renderer.objectGraph.highLight = gridSquareHighLight;
	renderer.start();
    
});