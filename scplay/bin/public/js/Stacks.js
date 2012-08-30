'use strict'
require(["renderer", "cubeUtils", "stacksCanvas"], function(renderer, cubeUtils, stacksCanvas) {

	var canvas = stacksCanvas.get(0).getContext("2d"),
	cube,
	cubes = [],
	createCube,
	createPlayButton;
	
	SC.initialize({
		client_id: "29a8c4627dba0eae2bdfac4552946526",
		redirect_uri: "http://scplay.sks.jit.su/auth/"
	});
	
	stacksCanvas.click(function(event) {
		var gridPos = cubeUtils.getTileFromMousePos(event.pageX, event.pageY, canvas.getImageData(event.clientX, event.clientY, 1, 1).data);
		var newCube = createCube(gridPos);
		$(document).trigger("newStack", [newCube]);
	});
	
	cube = function(oX, oY, cubeUtils) {
		
		var baseVectors = cubeUtils.createSquareVectors(oX, oY),
			baseColor = [108,132,173],
			opacity = 0,
			labels = [],
			height = 1,
			currentHeight = 1,
			addHeight,
			setLabel,
			playButton = createPlayButton(oX, oY);
			
			addHeight = function(newHeight) {
			
				height = height+newHeight;
				playButton.animate({
					top : (oY-height+10)+"px"
				});
			
			};
			
			setLabel = function(newLabel) {
			
				labels.push({label : newLabel, y : oY+22-height});
			
			};
			
		
		return  {
		
			addHeight : addHeight,
			setLabel : setLabel,
			render : function(canvas) {
				if(opacity < 1) {
					opacity = opacity+0.25;
				}
				if(currentHeight < height) {
					var nextHeight = currentHeight+((height - currentHeight)/3);
					if(nextHeight > height) {
						currentHeight = height;
					} else {
						currentHeight = nextHeight;
						//currentHeight = currentHeight + 3;
					}
				}
				cubeUtils.paintOnCanvas(cubeUtils.extrudePath(baseVectors, currentHeight), baseColor, canvas, opacity);
				for(var i = 0; i < labels.length; i++) {
					canvas.font = "bold 10px Helvetica";
					canvas.fillText("-"+labels[i].label, oX + 80, labels[i].y);
				}
				
			}
		};
	
	};
	
	createCube = function(gridPos) {
				
		cubes.push(new cube(gridPos.X, gridPos.Y, cubeUtils));
		renderer.objectGraph["square"+cubes.length] = cubes[cubes.length-1].render;
		return cubes[cubes.length-1];
					
	};
	
	createPlayButton = function(X, Y) {
		return $("<div class='play'>&#9658;</div>")
			.attr("title", "click here to play this stack.")
			.css({
				position : "absolute",
				top : (Y+10)+"px",
				left : (X+35)+"px"
			})
			.appendTo("body");
	};
    
});