Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");
var currentUser = Parse.User.current();

//验证是否登入
if (currentUser) {

		var getname = document.getElementById("username");
		var getstamina = document.getElementById("staminabar");
		var getstaminalabel = document.getElementById("staminalabel");
		var getmoney = document.getElementById("money");
		var $table = $('#allstuff tbody');

		//找出玩家的資料
		var queryrole = new Parse.Query(Parse.User);
		queryrole.equalTo("username", currentUser.attributes.username);  
		queryrole.find({
			success: function(role) {
				getname.innerHTML = role[0].attributes.username; //拿取玩家姓名并展现
				var staminashow = role[0].attributes.stamina; //拿取玩家体力并展现
				getmoney.innerHTML = role[0].attributes.money; //拿取玩家金钱并展现
				var userice = role[0].attributes.rice;
				var usesugar = role[0].attributes.sugar;
				var usesilk = role[0].attributes.silk;

				getstaminalabel.innerHTML = "<h4>體力: "+staminashow+"</h4>"
				getstamina.innerHTML = "<span class='meter' style='width:"+staminashow+"%'"+ "id='staminanum'></span>";
				$table.append("<tr>"+"<td>米</td>"+"<td>"+userice+"</td>"+"<td></td>"+"</tr>");
				$table.append("<tr>"+"<td>糖</td>"+"<td>"+usesugar+"</td>"+"<td></td>"+"</tr>");
				$table.append("<tr>"+"<td>絲綢</td>"+"<td>"+usesilk+"</td>"+"<td></td>"+"</tr>");
			}
		});

	} else {
    window.location="http://twodyssey.com/test/login.html";
}