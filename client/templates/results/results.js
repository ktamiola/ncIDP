// Invoked when template gets rendered
Template.results.rendered = function () {

    // =========================================================================
    // HIDE
    // =========================================================================

    // Hide the whole body
    $( ".section-body" ).hide();

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

    // =========================================================================
    // ANIMATION
    // =========================================================================

    $( ".section-body" ).fadeIn( "slow", function() {
        // Animation complete.
    });

}

// Helpers
Template.results.helpers ({

});

// Event listener for the template
Template.results.events({

	// =========================================================================
	// RESET FORMS
	// =========================================================================

	'click #downloadButton' : function (event) {

		// prevent the default behavior
		event.preventDefault();

        // Output the consolidated data
        var text = this.data;
        text = text.join('\n');

        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, 'ncIDP-'+SESSION_ID+'.txt');

        // hide the action list
        $('#actionList').fadeOut("slow", function() {
            // show share
            $('#shareAction').fadeIn("slow");      
        });

    },

    'click #sendEmailButton' : function (event) {

        // prevent the default behavior
        event.preventDefault();
        
        var header = '** Predicted data **%0D%0A%0D%0A';
        // Output the consolidated data
        var text = this.data;
        text = text.join('%0D%0A');
        text += '%0D%0A%0D%0A** End of prediction **';

        // Prepare email
        var email = '';
        var subject = '[AUTO] ncIDP Prediction - Session ID: ' + SESSION_ID;
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' +  header + text;

        // hide the action list
        $('#actionList').fadeOut("slow", function() {
            // show share
            $('#shareAction').fadeIn("slow");      
        });

    },

    'click #shareToolButton' : function (event) {

        // prevent the default behavior
        event.preventDefault();
        
        var link = "";
        var text = 'Check out ncIDP random coil chemical shift prediction tool by @alpine_photo #ncIDP #NMR -> ';

        // Initialize twitter share
        window.open('http://twitter.com/share?url=' + link + '&text=' + text + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

        // Fade out animation
        $( ".section-body" ).fadeOut( "slow", function() {
            // Animation complete.
            // Initialize route to the core page
            Router.go('core');
        });

   },

   'click #startNewButton' : function (event) {

        // prevent the default behavior
        event.preventDefault();
        
         // Fade out animation
        $( ".section-body" ).fadeOut( "slow", function() {
            // Animation complete.
            // Initialize route to the core page
            Router.go('core');
        });
        
    },

});