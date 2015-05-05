// Define global variables
DATA = {};
QUEUE = {};
GRID = [];
LPI = [];
LPI_RES = 0.0;
MAX_LPI = 0.0;

// normalization factor
normP = 35682460; // the population of Tokyo Japan (the most luminous)
normh = 40;		  // the elevation of Tokyo
normF = 11300000 * normP * Math.pow(Math.E, (-normh/4000.0)) + 60;
normPR = 0.0007395949461; // meter per person
deg2m = 1.0/111000.0;

// FUNCTION DECLARATIONS


// Convert to Radians prototype
Number.prototype.toRad = function() {
	return this * Math.PI / 180.0;
}

// Compute the Haversine distance between two points
distance = function (lat1, lon1, lat2, lon2) {

	var R = 6.371e6; // the radius of earth in [m]
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lon2-lon1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return R * c; 
}

// Compute the cityRadius
cityR = function(P) {
	return 100.0 + P/26200.0;
}

// Compute the light pollution index - illumintaion
illumination = function(R, P, h) {

	// The radius independent factor
	var A = 11300000 * P * Math.pow(Math.E, (-h/4000.0));

	// The value of LPI
	var LPI = 0.0;

	// The radius-dependant part
	// we need to compute the population-dependant cut-off 
	var cutoffR = cityR(P);

	// Make the decision
	if (R >= cutoffR) {
		// we are outside the city
		LPI = A * Math.pow(R, -2.5);
	} else {
		// We are within the city
		// Do the anti-singularity protection
		if (R < 1) {
			LPI = 2.5 * A;
		} else {
			LPI = 2.5 * A / R;
		}
	}

	return LPI / 60.0; // Returns the relative illumination at the location with respect to standard background illumination of 60 nL
}

// Compute the data grid
illuminationData = function(data) {

	// Convert our MongoDB Collection into an array 
	// and do the computation of light polution index 
	// with respect to our defined point
	// compute the overall illumination at our position
	var inputData = data.fetch();
	var result = {};

	// Container for GeoJSON data
	GeoJSON = {};
	GeoJSON.sources = [];
	GeoJSON.interactions = [];

	// Find our quequed point
	result.loc =  _.findWhere(inputData, {geonamesID : QUEUE.geonamesID});

	// Initialize the light pollution index at our location
	result.lpi = 0.0;

	// Extract the info about the number of LPI sources
	result.sources = data.count();

	// Start the iterative computation
	result.data = inputData.map(function(obj){
					
		var tmp = {};
		tmp = obj;	

		var R = distance(result.loc.lat, result.loc.lon, obj.lat, obj.lon); // Compute the distance
		
		tmp.R = R;
		tmp.LPI = illumination(R, obj.population, obj.elevation); // Compute the illumination
		result.lpi = result.lpi + tmp.LPI;

		// Create GeoJSON data
		GeoJSON.sources.push({"type": "Point", 
			"coordinates": [obj.lat, obj.lon] 
		});
		GeoJSON.interactions.push({"type": "LineString", 
			"coordinates": [[obj.lat, obj.lon], [result.loc.lat, result.loc.lon]]
		});

		return tmp;

	});

	// Convert GeoJSON to Object type from Array
	GeoJSON.sources = GeoJSON.sources.reduce(function(o, v, i) {
	  o[i] = v;
	  return o;
	}, {});

	GeoJSON.interactions = GeoJSON.interactions.reduce(function(o, v, i) {
	  o[i] = v;
	  return o;
	}, {});
		
	return {data : result, GeoJSON : GeoJSON};
}

// Compute the light pollution index sampling gird 
samplingGrid = function (lat, lon, r, N) {

	// Compute the increment
	var increment = 4 * r/N;

	// store the resolution of the grid expressed in meters
	LPI_RES =  increment * 1000;

	// Compute the bounds
	var lat_low =  lat - 2 * r;
    var lat_high = lat + 2 * r;
    var lon_low =  lon - 2 * r;
    var lon_high = lon + 2 * r;

    // Initialize empty container
    var data = [];
    var i, j = 0;

    // Start the loop
  	for (i=0; i <= N; i++) {
  		for (j=0; j <= N; j++) {

  			// create temporal array
  			var obj = [];
	    		obj[0]= lat_low + i * increment;
	    		obj[1] = lon_low + j * increment;
	    		obj[2] = 0.0;
    		data.push(obj);

  		}
  	}
    		
	return data; 
}

// Compute recursively the contour data
computeLpiGrid = function (data, grid) {

	// Unpack the data
	var inputData = data.fetch();

	// temporal storage for normalization
	var tmpNorm = [];

	// initialize the computation loop
	var contourGrid = grid.map(function(obj) {
		
		// initialize temporal grid point
		var tmp = [];
			tmp[0] = Number(obj[0]);
			tmp[1] = Number(obj[1]);
			tmp[2] = 0.0;

		// Loop over all light emitting sites
		for (var i=0; i<inputData.length; i++) {

			var R = distance(obj[0], obj[1], inputData[i].lat, inputData[i].lon);
			tmp[2] = tmp[2] + illumination(R, inputData[i].population, inputData[i].elevation);

		}

		// Store the values for later
		tmpNorm.push(tmp[2]);

		return tmp;

	});


	// we need to loop over the data once again in order to perform full normalization
	var contourGrid = contourGrid.map(function(obj) {

		var tmp = [];
			// tmp[0] = obj[0];
			// tmp[1] = obj[1];
			// // tmp[2] = obj[2];
			// tmp[2] = 100000 * (obj[2]-min);
			tmp = [obj[0], obj[1], obj[2]]
			return tmp;
	});

	return contourGrid;

}