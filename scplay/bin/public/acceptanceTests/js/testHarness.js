var testHarness = {};
(function(testHarness, testConsole){
    var executeScenarios, testRunner, addMessageToConsole, testSandbox, stepRunnerInterval, waitForInterval; 
    var stepsQueue = [];
    var scenarioID = 0;
	var useMockData = true;
    
    var status = "running";
    
    testHarness.waitForElement = function(locator, timeout){
    
    	timeout = timeout || 10;
        status = "waiting";
        var end = new Date().getTime() + timeout*1000;
		waitForInterval = setInterval(function() {
	        if ($(locator, testSandbox.document).length >= 1) {
	            status = "running";
				clearInterval(waitForInterval);
	        } else if(new Date().getTime() > end) {
	        	clearInterval(waitForInterval);
	        	var consoleID = testConsole.addMessageToConsole("failed to find Element : "+ locator);
	        	testConsole.reportError(consoleID);
				shutDownTestRunner();
	        }
			
		}, 100);
        
    };
	
	testHarness.loadPage = function(url){
        status = "waiting";
    	testSandbox.location.href = url;
		$("#testEnvironment").bind("load", function() {
			status = "running";
		});
        
    };

    testHarness.injectJS = function(mockInstructions){
       if(useMockData){
			testSandbox.eval("("+mockInstructions+"());");
	   }
    };
    
    testHarness.executeScenarios = function(scenarios){
		$(document).trigger("jqBehave.start");
		testSandbox = $("#testEnvironment").get(0).contentWindow;
        for (var scenario in scenarios) {
            var currentScenario = scenarios[scenario];
			testConsole.addMessageToConsole("<strong>"+scenario.replace(/([A-Z])/g, " $1")+"</strong>");
            var stepsID = 0;
            for (var step in currentScenario) {
                stepsQueue.push({
					action: currentScenario[step],
					stepName: step
				});
                stepsID++;
                
            }
            scenarioID++;
            
        }
		stepRunnerInterval = setInterval(stepRunner, 100);
    };
    
    stepRunner = function() {
        if (status == "running") {
			var nextTest = stepsQueue.shift();
            if(nextTest) {
				$(document).trigger("jqBehave.step");
	            var result = nextTest.action.call(testHarness, testSandbox);
				var consoleID = testConsole.addMessageToConsole(nextTest.stepName);
				if(result === false && result !== null) {
					testConsole.reportError(consoleID);
					shutDownTestRunner();
				} else {
					testConsole.reportSuccess(consoleID);
				}
				
			} else {
				
				shutDownTestRunner();
				testConsole.addMessageToConsole("Scenarios complete");
				
			}
            
        }
        
    };
	
	shutDownTestRunner = function() {
		
		$(document).trigger("jqBehave.stop");
		clearInterval(stepRunnerInterval);
		
	};
    
}(testHarness, testConsole));
