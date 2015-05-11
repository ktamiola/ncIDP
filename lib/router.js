//
// ROUTER CONFIG
//

Router.configure({
  layoutTemplate: 'layout', 
  notFoundTemplate: '404',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('ncIDP', DATABASE); }
});

//
// ROUTING
//

// Home Route
Router.route('/'+APP_URL_PREFIX, {name:'core'});

// Results route
Router.route('/'+APP_URL_PREFIX+'results', {

  name: 'results',
  
  waitOn: function () {

  	// =========================================================================
    // WAIT FOR THE DATABASE
    // =========================================================================

    return Meteor.subscribe('ncIDP', DATABASE);

  },

  data: function () {


    // =========================================================================
    // DO THE CALCULATIONS
    // =========================================================================

    HC_RATIO = ratio(SEQUENCE);
    PREDICTION = calculateShifts(SEQUENCE);
        
    return PREDICTION;

  }

});