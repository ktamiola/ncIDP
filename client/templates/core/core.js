// Invoked when template gets rendered
Template.core.rendered = function () {

	// Deal with the cards
	$('[data-toggle="tabs"] a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

}