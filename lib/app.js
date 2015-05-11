// Globals
APP_NAME = 'ncIDP Tool';
APP_VERSION = '1.0.0';
APP_URL = ''; //window.location.href;
APP_REFERENCE = 'Sequence-specific random coil chemical shifts of intrinsically disordered proteins. Tamiola K, Acar B, and Mulder FAA. JACS 2010 Dec 29. 132(51).';

// correct then 
APP_URL_PREFIX = 'ncidp/';

// Session ID
SESSION_ID = Math.random().toString(36).substring(7);
SESSION_DATE = new Date();

// Sequence and database storage
SEQUENCE = '';
DATABASE = 'Tamiola2010';
PREDICTION = '';

// Hydrophobic to charged ratio
HC_RATIO = 0.0;

// Chemical shift offsets
H_OFFSET  = 0.0;
HA_OFFSET = 0.0;
N_OFFSET  = 0.0;
CA_OFFSET = 0.0;
CB_OFFSET = 0.0;
C_OFFSET  = 0.0;