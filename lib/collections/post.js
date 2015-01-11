Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes) {
    //check the id is a string
	check(Meteor.userId(), String);
	
	if(!ValidUrl(postAttributes.url)){
		throw new Meteor.Error("Input Validation","Not a Valid link");
	}
	
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

function ValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}