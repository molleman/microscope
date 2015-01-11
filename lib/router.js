Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts');},
});

Router.route('/', {name: 'postsList'});

Router.route('/post/:_id', {
	name: 'postPage',
	data: function() {return Posts.findOne(this.params._id)} 
});

Router.route('submit', {name: 'postSubmit'})
//This tells Iron Router to show the “not found” page not just for invalid routes but also for the postPage route, whenever the data function returns a “falsy” (i.e. null, false, undefined, or empty) object.
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
