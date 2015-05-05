// Invoked when template gets rendered
Template.core.rendered = function () {

	// Enable the cards
	$('[data-toggle="tabs"] a').click(function(e) {
		// prevent the default behavior -> setting the link URL with hashtag
		e.preventDefault();
		// display the tab of interest
		$(this).tab('show');
	});

}