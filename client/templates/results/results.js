// Invoked when template gets rendered
Template.results.rendered = function () {

	// =========================================================================
	// INK REACTION EFFECT
	// =========================================================================
	
    $('.ink-reaction').on('click', function(e) {
        var bound = $(this).get(0).getBoundingClientRect();
        var x = e.clientX - bound.left;
        var y = e.clientY - bound.top;
        var color = getBackground($(this));
        var inverse = (getLuma(color) > 183) ? ' inverse' : '';
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

    getBackground = function(item) {
        var color = item.css("background-color");
        var alpha = parseFloat(color.split(',')[3], 10);
        if (isNaN(alpha) || alpha > 0.8) {
            return color;
        }
        if (item.is("body")) {
            return false;
        } else {
            return this.getBackground(item.parent());
        }
    };
    
    getLuma = function(color) {
        var rgba = color.substring(4, color.length - 1).split(',');
        var r = rgba[0];
        var g = rgba[1];
        var b = rgba[2];
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma;
    };

}

// Event listener for the template
Template.results.events({

	// =========================================================================
	// RESET FORMS
	// =========================================================================

	'click #resetButton' : function (event) {

		// prevent the default behavior
		event.preventDefault();
		
		// set the default database
        // in that particular case the Tamiola 2010 database
        Session.set('database', 'TamiolaDB');

		// display the tab of interest
		$('#defaultDB').tab('show');

		// Clean sequence text input
		$('#sequence').val("");
		
		// Clean the offset values
		$("#HA_spinner").val("0.00");
		$("#HN_spinner").val("0.00");
		$("#13CA_spinner").val("0.00");
		$("#13CB_spinner").val("0.00");
		$("#13C_spinner").val("0.00");
		$("#15N_spinner").val("0.00");

	},


});