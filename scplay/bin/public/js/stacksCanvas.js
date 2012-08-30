'use strict'
define(function() {
	var canvasRender = $("#extrusion");
	canvasRender.get(0).width = $(window).width();
	canvasRender.get(0).height = $(window).height();
	return canvasRender;
	
});