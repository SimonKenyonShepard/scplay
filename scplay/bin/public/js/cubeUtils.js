define(function() {

	var extrudePath,
		paintOnCanvas,
		forEachVector,
		forEachVectorPair,
		createSquareVectors,
		getTileFromMousePos;
	
	extrudePath = function(path, extrusion) {
		var paths = [];
		paths.unshift({vectors : path, intensity : 0});
		
		
		forEachVectorPair(path, function(x, y, x1, y1) {
			if(x !== x1) {
				var newWall = {
					vectors : [],
					intensity : 0.4
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

	paintOnCanvas = function(paths, baseColor, canvas) {
	
		var pathCount = paths.length;
		while(pathCount--) {
		
			canvas.beginPath();
			forEachVector(paths[pathCount].vectors, function(x, y) {
				canvas.lineTo(x, y);
			});
			canvas.lineWidth = 1;
			canvas.fillStyle = "rgba("+baseColor[0]
			+","+baseColor[1]
			+","+baseColor[2]
			+","+paths[pathCount].intensity
			+")";
			canvas.stroke();
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
		getTileFromMousePos : getTileFromMousePos
	
	};
	
});