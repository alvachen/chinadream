Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");

$('form').submit(function(evt){

	evt.preventDefault();
	var user = new Parse.User();
	var $name = $('input#id').val();
	var $pwd = $('input#pwd').val();
	var $email = $('input#email').val();
	user.set("username", $name );
	user.set("password", $pwd);
	user.set("email", $email);
	user.set("stamina", 100);
	user.set("money", 200);
	user.set("birth", 1);
	user.set("rice", 0);
	user.set("sugar", 0);
	user.set("silk", 0);
	user.set("creed", [10,10,10]);
	user.signUp(null, {
	  success: function(user) {
	    	var Sta = Parse.Object.extend("Sta");
			var sta = new Sta();
			sta.set("user",user);
			sta.set("confirm",0);
			sta.save();	
	    alert("注册成功");
	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});

});
