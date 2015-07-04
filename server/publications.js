// Make all data available when needed
Meteor.publish('allncIDP', function() {
	return ncIDP.find();
});

// We need a subscription a subset of data
Meteor.publish('ncIDP', function(database) {
  return ncIDP.find( { database : database} );
});