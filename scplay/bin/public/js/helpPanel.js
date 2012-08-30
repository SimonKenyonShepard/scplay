'use strict'
require(["renderer", "cubeUtils", "stacksCanvas"], function(renderer, cubeUtils, stacksCanvas) {

	var helpPanel = $(".help"); 
	$(document).bind("newStack",  function(event, stack) {
	
		helpPanel.text("Please select tracks from below to add to your new stack");
		SC.get('/tracks', { limit: 100 }, function(SCtracks) {
			var tracksDiv = $("#tracks");
				if(tracksDiv.length === 0) {
				tracksDiv = $("<div/>", {
					id : "tracks"
				}).appendTo("#helpPanel");
			}
			var trackList = "<ul>";
			for(var i =0; i < SCtracks.length; i++) {
				var duration = Math.round((SCtracks[i].duration/1000)/60);
				trackList += "<li>"+SCtracks[i].title+", "+duration+"m</li>";
			}
			trackList += "</ul>";
			tracksDiv.unbind("click");
			tracksDiv.html(trackList).click(function(event) {
				
				var duration = Math.round((SCtracks[$(event.target).index()].duration/1000)/60) || 1;
				stack.addHeight(duration*8);
				stack.setLabel(event.target.innerText);
			});
		});
		
	
	});
	
	return {};
    
});