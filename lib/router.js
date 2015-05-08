//
// ROUTER CONFIG
//

Router.configure({
  layoutTemplate: 'layout', 
  notFoundTemplate: '404',
  loadingTemplate: 'loading',
});

//
// ROUTING
//

// Home Route
Router.route('/', {name:'core'});

// Results Route
Router.route('/results', {name:'results'});