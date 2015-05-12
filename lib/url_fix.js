// Experimental
var ROOT_URL = Meteor.absoluteUrl();
console.log(ROOT_URL);

//
UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('MM/DD/YYYY, hh:mm');
});