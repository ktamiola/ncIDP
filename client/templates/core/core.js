// Invoked when template gets rendered
Template.core.rendered = function () {

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

	var AppOffcanvas = function() {
        var o = this;
        $(document).ready(function() {
            o.initialize();
        });
    };

    var p = AppOffcanvas.prototype;
    
    p._timer = null;
    
    p._useBackdrop = null;
    
    p.initialize = function() {
        this._enableEvents();
    };
    
    p._enableEvents = function() {
        var o = this;
        $(window).on('resize', function(e) {
            o._handleScreenSize(e);
        });
        $('.offcanvas').on('refresh', function(e) {
            o.evalScrollbar(e);
        });
        $('[data-toggle="offcanvas"]').on('click', function(e) {
            e.preventDefault();
            o._handleOffcanvasOpen($(e.currentTarget));
        });
        $('[data-dismiss="offcanvas"]').on('click', function(e) {
            o._handleOffcanvasClose();
        });
        $('#base').on('click', '> .backdrop', function(e) {
            o._handleOffcanvasClose();
        });
        $('[data-toggle="offcanvas-left"].active').each(function() {
            o._handleOffcanvasOpen($(this));
        });
        $('[data-toggle="offcanvas-right"].active').each(function() {
            o._handleOffcanvasOpen($(this));
        });
    };
    
    p._handleScreenSize = function(e) {
        this.evalScrollbar(e);
    };
    
    p._handleOffcanvasOpen = function(btn) {
        if (btn.hasClass('active')) {
            this._handleOffcanvasClose();
            return;
        }
        var id = btn.attr('href');
        this._useBackdrop = (btn.data('backdrop') === undefined) ? true : btn.data('backdrop');
        this.openOffcanvas(id);
        this.invalidate();
    };
    
    p._handleOffcanvasClose = function(e) {
        this.closeOffcanvas();
        this.invalidate();
    };
    
    p.openOffcanvas = function(id) {
        this.closeOffcanvas();
        $(id).addClass('active');
        var leftOffcanvas = ($(id).closest('.offcanvas:first').length > 0);
        if (this._useBackdrop)
            $('body').addClass('offcanvas-expanded');
        var width = $(id).width();
        if (width > $(document).width()) {
            width = $(document).width() - 8;
            $(id + '.active').css({
                'width': width
            });
        }
        width = (leftOffcanvas) ? width : '-' + width;
        var translate = 'translate(' + width + 'px, 0)';
        $(id + '.active').css({
            '-webkit-transform': translate,
            '-ms-transform': translate,
            '-o-transform': translate,
            'transform': translate
        });
    };
    
    p.closeOffcanvas = function() {
        $('[data-toggle="offcanvas"]').removeClass('expanded');
        $('.offcanvas-pane').removeClass('active');
        $('.offcanvas-pane').css({
            '-webkit-transform': '',
            '-ms-transform': '',
            '-o-transform': '',
            'transform': ''
        });
    };
    
    p.toggleButtonState = function() {
        var id = $('.offcanvas-pane.active').attr('id');
        $('[data-toggle="offcanvas"]').removeClass('active');
        $('[href="#' + id + '"]').addClass('active');
    };
    
    p.toggleBackdropState = function() {
        if ($('.offcanvas-pane.active').length > 0 && this._useBackdrop) {
            this._addBackdrop();
        } else {
            this._removeBackdrop();
        }
    };
    
    p._addBackdrop = function() {
        if ($('#base > .backdrop').length === 0 && $('#base').data('backdrop') !== 'hidden') {
            $('<div class="backdrop"></div>').hide().appendTo('#base').fadeIn();
        }
    };
    
    p._removeBackdrop = function() {
        $('#base > .backdrop').fadeOut(function() {
            $(this).remove();
        });
    };
    
    p.toggleBodyScrolling = function() {
        clearTimeout(this._timer);
        if ($('.offcanvas-pane.active').length > 0 && this._useBackdrop) {
            var scrollbarWidth = 100; // this.measureScrollbar();
            var bodyPad = parseInt(($('body').css('padding-right') || 0), 10);
            if (scrollbarWidth !== bodyPad) {
                $('body').css('padding-right', bodyPad + scrollbarWidth);
                $('.headerbar').css('padding-right', bodyPad + scrollbarWidth);
            }
        } else {
            this._timer = setTimeout(function() {
                $('body').removeClass('offcanvas-expanded');
                $('body').css('padding-right', '');
                $('.headerbar').removeClass('offcanvas-expanded');
                $('.headerbar').css('padding-right', '');
            }, 330);
        }
    };
    
    p.invalidate = function() {
        this.toggleButtonState();
        this.toggleBackdropState();
        this.toggleBodyScrolling();
        this.evalScrollbar();
    };
    
    p.evalScrollbar = function() {
        if (!$.isFunction($.fn.nanoScroller)) {
            return;
        }
        var menu = $('.offcanvas-pane.active');
        if (menu.length === 0)
            return;
        var menuScroller = $('.offcanvas-pane.active .offcanvas-body');
        var parent = menuScroller.parent();
        if (parent.hasClass('nano-content') === false) {
            menuScroller.wrap('<div class="nano"><div class="nano-content"></div></div>');
        }
        var height = $(window).height() - menu.find('.nano').position().top;
        var scroller = menuScroller.closest('.nano');
        scroller.css({
            height: height
        });
        scroller.nanoScroller({
            preventPageScrolling: true
        });
    };
    
    p.measureScrollbar = function() {
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        $('body').append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        $('body')[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };

    window.help = new AppOffcanvas;

}