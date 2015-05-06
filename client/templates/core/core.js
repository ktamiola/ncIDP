// Invoked when template gets rendered
Template.core.rendered = function () {

	// Ink reaction
	$('.ink-reaction').on('click', function(e) {
		var bound = $(this).get(0).getBoundingClientRect();
		var x = e.clientX - bound.left;
		var y = e.clientY - bound.top;
		var color = o.getBackground($(this));
		var inverse = (o.getLuma(color) > 183) ? ' inverse' : '';
		var ink = $('<div class="ink' + inverse + '"></div>');
		var btnOffset = $(this).offset();
		var xPos = e.pageX - btnOffset.left;
		var yPos = e.pageY - btnOffset.top;
		ink.css({
			top: yPos,
			left: xPos
		}).appendTo($(this));
		window.setTimeout(function() {
			ink.remove();
		}, 1500);
	});

	// =========================================================================
	// CHEMICAL SHIFT DATABASE SELECTION VIA TABS
	// =========================================================================

	$('[data-toggle="tabs"] a').click(function(e) {
		// prevent the default behavior -> setting the link URL with hashtag
		e.preventDefault();
		// display the tab of interest
		$(this).tab('show');
		// Retrieve the type of the database
		Session.set('database', 'TamiolaDB');
	});

	// =========================================================================
	// EXTRA FEATURES ACCORDION SLIDING PANEL
	// =========================================================================

	$('.panel-group .card .in').each(function() {
		var card = $(this).parent();
		card.addClass('expanded');
	});

	$('.panel-group').on('hide.bs.collapse', function(e) {
		var content = $(e.target);
		var card = content.parent();
		card.removeClass('expanded');
	});

	$('.panel-group').on('show.bs.collapse', function(e) {
		var content = $(e.target);
		var card = content.parent();
		var group = card.closest('.panel-group');
		group.find('.card.expanded').removeClass('expanded');
		card.addClass('expanded');
	});

	// =========================================================================
	// CHEMICAL SHIFT OFFSET SPINNERS
	// =========================================================================

	$("#HA_spinner").spinner({step: 0.01, numberFormat: "n", max: 2});
	$("#HN_spinner").spinner({step: 0.01, numberFormat: "n", max: 2});
	$("#13CA_spinner").spinner({step: 0.01, numberFormat: "n", max: 5});
	$("#13CB_spinner").spinner({step: 0.01, numberFormat: "n", max: 5});
	$("#13C_spinner").spinner({step: 0.01, numberFormat: "n", max: 5});
	$("#15N_spinner").spinner({step: 0.01, numberFormat: "n", max: 10});

	// =========================================================================
	// HELP SYSTEM
	// =========================================================================

	// Assign button functionalities
	// Help button for the chemical shift databases
	// $('[data-toggle="help"]').click(function(e) {
	// 	// prevent the default behavior -> setting the link URL with hashtag
	// 	e.preventDefault();
	// 	// display the off canvas help
	// 	console.log("Help...");
	// });

	// Help button for the extra offset correction options
	// $('[data-toggle="help2"]').click(function(e) {
	// 	// prevent the default behavior -> setting the link URL with hashtag
	// 	e.preventDefault();
	// 	// display the off canvas help
	// 	console.log("Help2...");
	// });

}