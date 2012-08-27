define(function() {
	
	var canvasRender = $("<canvas></canvas>", {
		id : "extrusion"
	}).attr({
		height : $(window).height(),
		width: $(window).width()
	}).appendTo(document.body);

	return canvasRender;
	
});