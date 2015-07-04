// Retrieve ncIDP Chemical Shift databases
// We are not using 'var' initializer as I want this to be available
// across the whole app
ncIDP = new Mongo.Collection("ncIDP");