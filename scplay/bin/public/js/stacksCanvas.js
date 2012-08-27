define(function() {
	
	var canvasRender = $("<canvas></canvas>", {
		id : "extrusion"
	}).attr({
		height : $(window).height(),
		width: $(window).width()
	}).appendTo(document.body);

	canvasRender.mousemove(function(event) {
		currentMousePos = {
			x: event.pageX,
			y: event.pageY
		};
	});
	return canvasRender;
	
});