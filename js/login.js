Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");


$('button#login').click(function(){

	var username = $('#username').val();
	var pwd = $('#password').val();

	 Parse.User.logIn(username,pwd, {
	  success: function(user) {
	  	var currentUser = Parse.User.current();
	    window.location="http://twodyssey.com/test/store.html";
	  },
	  error: function(user, error) {
	    alert("登入失败");
	  }
	});
});