// Invoked when template gets rendered
Template.core.rendered = function () {

	// Enable database selection
	// via convinient tabs system
	$('[data-toggle="tabs"] a').click(function(e) {
		// prevent the default behavior -> setting the link URL with hashtag
		e.preventDefault();
		// display the tab of interest
		$(this).tab('show');
		// Retrieve the type of the database
		Session.set('database', 'TamiolaDB');
	});

	// Initialize the help system
	// The left help card
	$('[data-toggle="help"]').click(function(e) {
		// prevent the default behavior -> setting the link URL with hashtag
		e.preventDefault();
		// display the off canvas help
		console.log("Help...");
	});

}