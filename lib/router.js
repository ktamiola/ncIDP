//
// ROUTER CONFIG
//

Router.configure({
  layoutTemplate: 'layout', 
  notFoundTemplate: '404',
});

//
// ROUTING
//

// Home Route
Router.route('/', {name:'core'});

// Results route
Router.route('/results', {

  name: 'results',
  waitOn: function () {

    return Meteor.subscribe('ncIDP', DATABASE);

  },

  data: function () {


    // =========================================================================
    // DO THE CALCULATIONS
    // =========================================================================

    HC_RATIO = ratio(SEQUENCE);
        
    return calculateShifts(SEQUENCE);

  }

});