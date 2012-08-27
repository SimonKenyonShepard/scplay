'use strict'
define(["stacksCanvas"], function(stacksCanvas) {
	
	var objectGraph = {},
		renderInterval = 100,
		canvasHeight = $(window).height(),
		canvasWidth = $(window).width(),
		canvas = stacksCanvas.get(0).getContext("2d"),
		renderLoop,
		renderInterval,
		start,
		stop,
		zoom,
		scale = 1,
		originX = 0,
		originY = 0;
	
	renderLoop = function() {
	
		canvas.clearRect(0, 0, canvasWidth/scale, canvasHeight/scale);
		for(var renderObject in objectGraph) {
			
			canvas.beginPath();
			objectGraph[renderObject](canvas, canvasWidth/scale, canvasHeight/scale);
		}
	
	};
	
	start = function() {
		
		renderInterval = setInterval(renderLoop, renderInterval);
	
	};
	
	stop = function() {
	
		canvas.clearRect(0, 0, canvasWidth, canvasHeight);
		clearInterval(renderInterval);
	
	};
	
	zoom = function(zoomLevel, x, y) {
		
		console.log("set zoom", scale);
		var zoom = 1 + zoomLevel/1.5;
		/*
		canvas.translate(
			originX,
			originY
		);
		*/
		canvas.scale(zoom,zoom);
		/*
		canvas.translate(
			-( x / scale + originX - x / ( scale * zoom ) ),
			-( y / scale + originY - y / ( scale * zoom ) )
		);
		*/
		originX = ( x / scale + originX - x / ( scale * zoom ) );
		originY = ( y / scale + originY - y / ( scale * zoom ) );
		scale *= zoom;
		
	};
	
	return {
	
		objectGraph : objectGraph,
		start : start,
		stop: stop,
		zoom : zoom
	
	};
	
});