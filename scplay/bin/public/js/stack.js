'use strict'
define(function() {

	return function(oX, oY, cubeUtils, baseColour, height, labels, current) {
		
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
			current = current === false ? false : true,
			setCurrent,
			playButton = function(x, y, height) {
				return $("<div class='play'>&#9658;</div>")
					.attr("title", "click here to play this stack.")
					.css({
						position : "absolute",
						top : (y+10-height)+"px",
						left : (x+35)+"px"
					})
					.mouseenter(function() {
						current = true;
					})
					.mouseleave(function() {
						current = false;
					})
					.appendTo("body");
			}(oX, oY, height);
			
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
			
			setCurrent = function(state) {
			
				current = state;
			
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
			
			setCurrent : setCurrent,
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
					}
				}
				cubeUtils.paintOnCanvas(cubeUtils.extrudePath(baseVectors, currentHeight), baseColor, canvas, opacity);
				if(current) {
					for(var i = 0; i < labels.length; i++) {
						canvas.font = "bold 10px Helvetica";
						canvas.fillText("-"+labels[i].label, oX + 80, labels[i].y);
					}
				}
				
			}
		};
	
	};
});