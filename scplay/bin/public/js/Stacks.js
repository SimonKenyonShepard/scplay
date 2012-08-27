require(["renderer", "cubeUtils", "stacksCanvas"], function(renderer, cubeUtils, stacksCanvas) {

	var canvas = stacksCanvas.get(0).getContext("2d"),
	cube,
	cubes = [],
	createCube,
	createSearchInput,
	createAddTrack;
	
	SC.initialize({
		client_id: "29a8c4627dba0eae2bdfac4552946526",
		redirect_uri: "http://scplay.sks.jit.su/auth/"
	});
	
	stacksCanvas.click(function(event) {
		var gridPos = cubeUtils.getTileFromMousePos(event.pageX, event.pageY, canvas.getImageData(event.pageX, event.pageY, 1, 1).data);
		createCube(gridPos);
		createSearchInput(gridPos);	
	});
	
	cube = function(oX, oY, cubeUtils) {
		
		var baseVectors = cubeUtils.createSquareVectors(oX, oY),
			baseColor = [108,132,173],
			height = 20;
		
		return function(canvas) {
			cubeUtils.paintOnCanvas(cubeUtils.extrudePath(baseVectors, height), baseColor, canvas);
			
		};
	
	};
	
	createCube = function(gridPos) {
				
		cubes.push(new cube(gridPos.X, gridPos.Y, cubeUtils));
		renderer.objectGraph["square"+cubes.length] = cubes[cubes.length-1];
					
	};
	
	createSearchInput = function(gridPos) {
				
		$("<input />", {
			type : "text",
			placeholder : "search for track",
			css : {
				position: "absolute",
				top: (gridPos.Y-3)+"px",
				left: (gridPos.X+85)+"px"
			}
		}).appendTo("body")
		.focus()
		.keypress(function(event) {
			var searchPhrase = $(this).val();
			var inputField = $(this);
			SC.get('/tracks', { q: searchPhrase }, function(tracks) {
					var autoComplete = $("#autoComplete");
					if(autoComplete.length === 0) {
						autoComplete = $("<div/>",
							{ id: "autoComplete",
							   css : {
									position : "absolute",
									top : inputField.offset().top+inputField.height(),
									left :  inputField.offset().left
							   
							   }
							}).appendTo("body");
					}
					var trackList = "<ul>";
					for(var i =0; i < tracks.length; i++) {
						trackList += "<li>"+tracks[i].title+"</li>";
					}
					trackList += "</ul>";
					autoComplete.html(trackList).click(function(event) {
						inputField.val(event.target.innerText)
						.css({
							backgroundColor: "transparent",
							boxShadow : "none",
							border : "none",
							fontSize: "12px",
							color: "#666"
						});
						autoComplete.remove();
						createAddTrack(gridPos);
					});
			});
			
		});
		
	
	};
	
	createAddTrack = function(gridPos) {
	
		$("<div/>", {
		
			"class" : "addIcon",
			css : {
				position: "absolute",
				top: (gridPos.Y-25)+"px",
				left: (gridPos.X+25)+"px"
			},
			title : "add track to playlist"
			
		}).text("+").appendTo("body").click(function() {
			$(this).remove();
			var newGridPos = { X : gridPos.X, Y : gridPos.Y-20};
			createCube(newGridPos);
			createSearchInput(newGridPos);
		});
	
	};
    
});