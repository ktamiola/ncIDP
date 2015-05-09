// Sequence and database storage
SEQUENCE = [];
DATABASE = '';

// Hydrophobic to charged ratio
HC_RATIO = 0.0;

// Chemical shift offsets
H_OFFSET = 0.0;
HA_OFFSET = 0.0;
N_OFFSET = 0.0;
CA_OFFSET = 0.0;
CB_OFFSET = 0.0;
C_OFFSET = 0.0;

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