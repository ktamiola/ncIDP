// Helpers
Template.results_panel.helpers ({

	database : function () {
		var database = DATABASE;
		database = database.substring(0, database.length-4);
		return database;
	},

	length : function () {
		return SEQUENCE.length;
	},

	hc : function () {
		if (HC_RATIO > 0.0) {
			return HC_RATIO.toFixed(2);
		} else {
			return 'Unknown';
		}
	},

	HA : function () {
		return HA_OFFSET.toFixed(2);
	},

	H : function () {
		return H_OFFSET.toFixed(2);
	},

	N : function () {
		return N_OFFSET.toFixed(2);
	},

	CB : function () {
		return CB_OFFSET.toFixed(2);
	},

	CA : function () {
		return CA_OFFSET.toFixed(2);
	},

	C : function () {
		return C_OFFSET.toFixed(2);
	}


});