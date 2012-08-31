'use strict'
require(["renderer", "cubeUtils", "stacksCanvas", "stack"], function(renderer, cubeUtils, stacksCanvas, stack) {

	var canvas = stacksCanvas.get(0).getContext("2d"),
	cubes = [],
	createCube,
	createPlayButton,
	renderStacks,
	saveStacks,
	initilize;
	
	initilize = function() {
	
		renderer.objectGraph["cubesRender"] = renderStacks;
		SC.initialize({
			client_id: "29a8c4627dba0eae2bdfac4552946526",
			redirect_uri: "http://scplay.sks.jit.su/auth/"
		});
		
		$.getJSON('/getStacks', function(data) {
			
			for(var i = 0; i < data.length; i++) {
				cubes.push(new stack(data[i].x,
									data[i].y,
									cubeUtils,
									data[i].baseColour,
									data[i].height,
									data[i].labels,
									false)
						);
			};
		});
		$(document).bind("saveStacks", function() {
			var stacks = [];
			for(var i = 0; i < cubes.length; i++) {
			
				stacks.push(cubes[i].saveCube());
			
			}
			$.post('/savestacks', { data : JSON.stringify(stacks) });
		
		});
	
	};
	
	stacksCanvas.click(function(event) {
		var gridPos = cubeUtils.getTileFromMousePos(event.pageX, event.pageY, canvas.getImageData(event.clientX, event.clientY, 1, 1).data);
		for(var i = 0; i < cubes.length; i++) {
		
			cubes[i].setCurrent(false);
		
		}
		var newCube = createCube(gridPos);
		$(document).trigger("newStack", [newCube]);
		$(document).trigger("saveStacks");
	});
	
	createCube = function(gridPos) {
				
		cubes.push(new stack(gridPos.X, gridPos.Y, cubeUtils));
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
	
	setTimeout(function() {
		initilize();
    }, 100);
});