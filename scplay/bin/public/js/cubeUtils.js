'use strict'
define(function() {

	var extrudePath,
		paintOnCanvas,
		forEachVector,
		forEachVectorPair,
		shadeColor,
		createSquareVectors,
		getTileFromMousePos,
		generateColour;
	
	extrudePath = function(path, extrusion) {
		var paths = [];
		paths.unshift({vectors : path, intensity : 0});
		
		var baseIntensity = 0.9
		forEachVectorPair(path, function(x, y, x1, y1) {
			if(x !== x1) {
				baseIntensity = baseIntensity - 0.2;
				var newWall = {
					vectors : [],
					intensity : baseIntensity
				};
				newWall.vectors.push(x, y, x1, y1, x1, y1-extrusion, x, y-extrusion);
				paths.unshift(newWall);
			}
		});
		var vectorCeiling = {
			vectors : [],
			intensity : 0.9
		};
		forEachVector(path, function(x, y) {
			vectorCeiling.vectors.push(x, y-extrusion);
		});
		paths.unshift(vectorCeiling);
		return paths;
	};

	paintOnCanvas = function(paths, baseColor, canvas, opacity) {
	
		var pathCount = paths.length;
		opacity = opacity || 1;
		while(pathCount--) {
		
			var newShade = shadeColor(baseColor, (pathCount*20));
			canvas.beginPath();
			forEachVector(paths[pathCount].vectors, function(x, y) {
				canvas.lineTo(x, y);
			});
			canvas.lineWidth = 1;
			canvas.fillStyle = "rgba("+newShade.R
			+","+newShade.G
			+","+newShade.B
			+","+opacity
			+")";
			canvas.fill();
		
		};
	
	};

	forEachVector = function(vectorArray, action) {
	
		for(var i = 0; i < vectorArray.length; i = i+2) {
			action(vectorArray[i], vectorArray[i+1]);
		}
	
	};

	forEachVectorPair = function(vectorArray, action) {
	
		for(var i = 0; i < vectorArray.length; i = i+2) {
			if((i+2) === vectorArray.length) {
				action(vectorArray[i], vectorArray[i+1], vectorArray[0], vectorArray[1]);
			} else {
				action(vectorArray[i], vectorArray[i+1], vectorArray[i+2], vectorArray[i+3]);
			}
		}
	
	};
	
	shadeColor = function(color, shade) {
		//var colorInt = parseInt(color.substring(1),16);
		var newShade = {};
		newShade.R = color[0];
		newShade.G = color[1];
		newShade.B = color[2];
	
		newShade.R = newShade.R + Math.floor((shade/255)*newShade.R);
		newShade.G = newShade.G + Math.floor((shade/255)*newShade.G);
		newShade.B = newShade.B + Math.floor((shade/255)*newShade.B);
	
		return newShade;
	};
	
	generateColour = function() {

		var colours = [194, 92, 49,
						78, 106, 130,
						222, 168, 99, 
						217, 121, 4,
						168, 77, 129,
						225, 202, 83,
						255, 232, 122,
						70, 127, 113,
						229, 39, 56,
						166, 20, 20], 
		randVal = Math.floor(Math.random() * (9 - 1 + 1) + 1)*3;
		return [colours[randVal],colours[randVal+1],colours[randVal+2]];
	
	};
	
	createSquareVectors = function(oX, oY) {
	
		var tileWidth = 76;
		var tileHeight = 38;
		return [
			(tileWidth / 2)+oX,
			oY,
			oX,
			(tileHeight / 2)+oY,
			(tileWidth / 2)+oX,
			tileHeight+oY,
			tileWidth+oX,
			(tileHeight / 2)+oY,
			(tileWidth / 2)+oX,
			oY];
	
	};
	
	getTileFromMousePos = function(x, y, placeOnTile) {
				
		var gridPos = {};
		gridPos.X = Math.floor(x/76);
		gridPos.Y = Math.floor(y/38);
		var t1 = placeOnTile[0]+"-"+placeOnTile[1]+"-"+placeOnTile[2];
		var TOPLEFT = "254-255-255",
			TOPRIGHT = "255-254-255",
			BOTTOMLEFT = "255-255-254",
			BOTTOMRIGHT = "254-255-254";
		if(t1 === TOPLEFT) {
			gridPos.X = gridPos.X-.5;
			gridPos.Y = gridPos.Y-.5;
		} else if (t1 === TOPRIGHT) {
			gridPos.X = gridPos.X+.5;
			gridPos.Y = gridPos.Y-.5;
		} else if (t1 === BOTTOMLEFT) {
			gridPos.X = gridPos.X-0.5;
			gridPos.Y = gridPos.Y+0.5;
		} else if (t1 === BOTTOMRIGHT) {
			gridPos.X = gridPos.X+.5;
			gridPos.Y = gridPos.Y+.5;
		}
		gridPos.X = gridPos.X*76;
		gridPos.Y = gridPos.Y*38;
		return gridPos;
	
	};
	
	return {
	
		extrudePath : extrudePath,
		paintOnCanvas : paintOnCanvas,
		createSquareVectors : createSquareVectors,
		getTileFromMousePos : getTileFromMousePos,
		generateColour : generateColour
	
	};
	
});