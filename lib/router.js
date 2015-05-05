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
Router.route('/', {name:'kernel'});