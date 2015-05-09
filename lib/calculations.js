makeTextFile = function (text) {
	
	var data = new Blob([text], {type: 'text/plain'});

    return window.URL.createObjectURL(data);
};

// Return the ratio hydrophobic to charged residues
ratio = function (sequence) {

	// initialize defaults
	var rH = 0.0;
	var rC = 0.0;
	var hydrophobic = 'GAVLIPFMW';
	var charged = 'RKHDE';

	// start the lookup
	for (var i=0; i<sequence.length; i++) {
		
		// loop over hydrophobic
		for (var h=0; h<hydrophobic.length; h++)
			if (sequence[i]==hydrophobic[h])
				rH++;

		// loop over charged
		for (var c=0; c<charged.length; c++)
			if (sequence[i]==charged[c])
				rC++;
		}

		if (rH > 0.0)
			return rC/rH;
		else
			return 0.0
	}

// return unique entries in an array
onlyUnique = function (value, index, self) { 
	return self.indexOf(value) === index;
}

// Compute the chemical shifts and return nicely formatted output
calculateShifts = function (sequence) {

	// First of all get the data from the database
	var library = ncIDP.find({database:DATABASE}).fetch();

	// Now get the list of the supported nuclei
	var nuclei = [];
	for (var i=0; i<library.length; i++)
		nuclei.push(library[i].nucleus);

	nuclei = nuclei.filter(onlyUnique);

	// Initialize the answer string
	var prediction = [];

	// initialize header
	var header = '# Random-coil chemical shift prediction';
	prediction.push(header);

	header = '# ncIDP Tool ' + APP_VERSION;
	prediction.push(header);

	header = '# URL: ' + APP_URL;
	prediction.push(header);

	header = '# Author: Kamil Tamiola';
	prediction.push(header);

	header = '# Cite: ' + APP_REFERENCE;
	prediction.push(header);

	header = '# Chemical Shift Database : ' + DATABASE;
	prediction.push(header);

	header = '# Session ID : ' + SESSION_ID;
	prediction.push(header);

	header = '# Session Date : ' + SESSION_DATE;
	prediction.push(header);

	header = '# resID  resName';

	// generate header
	for (var n=0; n<nuclei.length; n++) {
		header += '  ' + nuclei[n]
	}

	// push the header
	prediction.push(header);

	// Start the main loop
	for (var i=0; i<sequence.length; i++) {

		// Residue number
		var line = i+1;

		// Residue symbol
		line += '  ' + sequence[i];

		// Start the nucleus loop
		for (var n=0; n<nuclei.length; n++) {
			
			// Initialzie empty chemical shift
			var cs = 0.0;

			// Start the library loop
			for (var l=0; l<library.length; l++) {

				if ( sequence[i-1] == library[l].residue && nuclei[n] == library[l].nucleus ) {

					cs += Number(library[l].previous);

				}

				if ( sequence[i] == library[l].residue && nuclei[n] == library[l].nucleus ) {

					cs += Number(library[l].current);

				}

				if ( sequence[i+1] == library[l].residue && nuclei[n] == library[l].nucleus ) {

					cs += Number(library[l].next);

				}

			}

			// Exception -> Glycine no CB
			if (sequence[i]=='G' && nuclei[n] == 'CB') {
				cs = 0.0;				
			}

			// Exception -> Proline no HN
			if (sequence[i]=='P' && nuclei[n] == 'HN') {
				cs = 0.0;
			}

			line += '  ' + cs.toFixed(3);

		}

		// push the line
		prediction.push(line);
	}

	return {data: prediction};
}