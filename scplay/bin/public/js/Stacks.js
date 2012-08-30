'use strict'
require(["renderer", "cubeUtils", "stacksCanvas"], function(renderer, cubeUtils, stacksCanvas) {

	var canvas = stacksCanvas.get(0).getContext("2d"),
	cube,
	cubes = [],
	createCube,
	createPlayButton,
	renderStacks,
	saveStacks;
	
	SC.initialize({
		client_id: "29a8c4627dba0eae2bdfac4552946526",
		redirect_uri: "http://scplay.sks.jit.su/auth/"
	});
	
	stacksCanvas.click(function(event) {
		var gridPos = cubeUtils.getTileFromMousePos(event.pageX, event.pageY, canvas.getImageData(event.clientX, event.clientY, 1, 1).data);
		var newCube = createCube(gridPos);
		renderer.objectGraph["cubesRender"] = renderStacks;
		$(document).trigger("newStack", [newCube]);
		saveStacks();
	});
	
	saveStacks = function() {
	
		var stacks = [];
		for(var i = 0; i < cubes.length; i++) {
		
			stacks.push(cubes[i].saveCube());
		
		}
		$.post('/savestacks', { data : JSON.stringify(stacks) });
	
	};
	
	cube = function(oX, oY, cubeUtils, baseColour, height, labels) {
		
		var baseVectors = cubeUtils.createSquareVectors(oX, oY),
			baseColor = baseColour || cubeUtils.generateColour(),
			opacity = 0,
			labels = labels || [],
			height = height || 1,
			currentHeight = height || 1,
			addHeight,
			setLabel,
			getXY,
			saveCube,
			playButton = createPlayButton(oX, oY);
			
			addHeight = function(newHeight) {
			
				height = height+newHeight;
				playButton.animate({
					top : (oY-height+10)+"px"
				}, 200, 'linear');
			
			};
			
			getXY = function() {
			
				return {x : oX, y : oY};
			
			};
			
			setLabel = function(newLabel) {
			
				labels.push({label : newLabel, y : oY+22-height});
			
			};
			
			saveCube = function() {
			
				return {
				
					x : oX,
					y : oY,
					height: height,
					baseColour : baseColor,
					labels : labels
				
				};
			
			};
			
		
		return  {
			
			saveCube : saveCube,
			addHeight : addHeight,
			setLabel : setLabel,
			getXY : getXY,
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
		return cubes[cubes.length-1];
					
	};
	
	renderStacks = function(canvas) {
	
		cubes.sort(function(a, b) {
		
			var posA = a.getXY();
			posA = String(posA.y) + String(posA.x);
			var posB = b.getXY();
			posB = String(posB.y) + String(posB.x);
			return posA - posB;
		
		});
		for(var i = 0; i < cubes.length; i++) {
		
			cubes[i].render(canvas);
		
		}
	
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