// Sequence and database storage
SEQUENCE = '';
DATABASE = 'Tamiola2010';

// Hydrophobic to charged ratio
HC_RATIO = 0.0;

// Chemical shift offsets
H_OFFSET = 0.0;
HA_OFFSET = 0.0;
N_OFFSET = 0.0;
CA_OFFSET = 0.0;
CB_OFFSET = 0.0;
C_OFFSET = 0.0;

// Return the ratio hydrophobic to charged residues
HC_ratio = function (sequence) {

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