var testConsole = {};
(function($, testConsole){
	
	var idIncrement = 0,
	consoleHeightWhenClosed = 0;
	
	testConsole.init = function(){
		
		var halfScreen = $(window).height()/2;
		$('<div id="testConsole"><div id="steps"></div></div>').appendTo(document.body);
		$("#testConsole").click(function(){
		
			var testConsole = $(this);
			var steps =  $("#steps");
			if (!testConsole.hasClass("expanded")) {
				var stepsHeight = steps.height();
				var heightTo = (stepsHeight > halfScreen) ? halfScreen : stepsHeight;
				testConsole.stop().animate({
					height: heightTo
				}).addClass("expanded");
			}
			else {
				testConsole.stop().animate({
					height: "10%"
				}).removeClass("expanded");
			}
			
			
		});
		
	};
	
    testConsole.addMessageToConsole = function(message){
		idIncrement = idIncrement + 1;
    	var id = "testConsoleMessage_"+idIncrement;
        $("<div id='" + id + "'>" + message + "</div>").appendTo("#steps");
		return id;
    };
	
	testConsole.reportError = function(elementID) {
		$("#"+elementID).css({fontSize: "20px", color: "#F20519"});
		testConsole.addMessageToConsole("Step failed, testRunner halted");
	};
	
	testConsole.reportSuccess = function(elementID) {
		$("#"+elementID).css({color: "#04BF55"});
	};
    
}(jQuery, testConsole));


jQuery(function() {
	
	testConsole.init();
	
});

