describe("when cubeUtils", function() {

  
	describe("extrudePath is called with a path and an extrusion", function() {

		it("returns an array with the extruded paths", function() {
    		
    		var path = [456, 361, 418, 380, 456, 399, 494, 380, 456, 361];
    		var extrusion = 20;
    		var result = defined.extrudePath(path, extrusion);
    		expect(result[0].vectors).toEqual([456, 341, 418, 360, 456, 379, 494, 360, 456, 341]);
    		expect(result[0].intensity).toBe(0.9);
    		expect(result[5].vectors).toEqual([456, 361, 418, 380, 456, 399, 494, 380, 456, 361]);
    		expect(result[5].intensity).toBe(0);
    		
		});
	});
	
	describe("createSquareVectors is called with x and y", function() {

		it("returns the correct set of square vectors", function() {
    	
    		var result = defined.createSquareVectors(100, 150);
    		expect(result).toEqual([138, 150, 100, 169, 138, 188, 176, 169, 138, 150]);
    		
    		
		});
	});
	
	describe("getTileFromMousePos is called with x and y and the tilePos", function() {

		it("returns the correct gridPos", function() {
    	
    		var result = defined.getTileFromMousePos(100, 150, "noMatch");
    		expect(result).toEqual({X : 76, Y : 114});
    		
    		
		});
		
		it("returns the correct gridPos altered for the click placement to the top left", function() {
    	
    		var result = defined.getTileFromMousePos(100, 150, [254,255,255]);
    		expect(result).toEqual({X : 38, Y : 95});
    		
    		
		});
		
		it("returns the correct gridPos altered for the click placement to the top right", function() {
    	
    		var result = defined.getTileFromMousePos(100, 150, [255,254,255]);
    		expect(result).toEqual({X : 114, Y : 95});
    		
    		
		});
		
		it("returns the correct gridPos altered for the click placement to the bottom left", function() {
    	
    		var result = defined.getTileFromMousePos(100, 150, [255,255,254]);
    		expect(result).toEqual({X : 38, Y : 133});
    		
    		
		});
		it("returns the correct gridPos altered for the click placement to the bottom right", function() {
    	
    		var result = defined.getTileFromMousePos(100, 150, [254,255,254]);
    		expect(result).toEqual({X : 114, Y : 133});
    		
    		
		});
	});

});