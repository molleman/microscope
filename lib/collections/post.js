Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes) {
    //check the id is a string
	check(Meteor.userId(), String);
	
	//check the post is ok , maybe we could check if it is a url?
    check(postAttributes, {
      title: String,
      url: String
    });
	
	//check the link isnt in the db already
	var postWithSameLink = Posts.findOne({url: postAttributes.url});
	    if (postWithSameLink) {
	      return {
	        postExists: true,
	        _id: postWithSameLink._id
	      }
	    }
		
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});