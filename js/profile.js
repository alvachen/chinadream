Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");
var currentUser = Parse.User.current();

//验证是否登入
if (currentUser) {

		var getname = document.getElementById("username");
		var getstamina = document.getElementById("staminabar");
		var getstaminalabel = document.getElementById("staminalabel");
		var getmoney = document.getElementById("money");
		var $table = $('#allstuff tbody');
		var $sleep = $('#sleepicon');
		var $thoughts = $('#thoughts');
		var $thoughts2 = $('#thoughts2');
		var $thoughts3 = $('#thoughts3');

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
				var creed = role[0].attributes.creed

				//顯示體力處的地方
				getstaminalabel.innerHTML = "<h4>體力: "+staminashow+"</h4>"
				getstamina.innerHTML = "<span class='meter' style='width:"+staminashow+"%'"+ "id='staminanum'></span>";
				
				//此處為玩家物品庫顯示
				$table.append("<tr>"+"<td>米</td>"+"<td>"+userice+"</td>"+"<td></td>"+"</tr>");
				$table.append("<tr>"+"<td>糖</td>"+"<td>"+usesugar+"</td>"+"<td></td>"+"</tr>");
				$table.append("<tr>"+"<td>絲綢</td>"+"<td>"+usesilk+"</td>"+"<td></td>"+"</tr>");
				$thoughts.append(creed[0]);
				$thoughts2.append(creed[1]);
				$thoughts3.append(creed[2]);

			}
		});
		//點擊回覆體力
		$sleep.on('click',function(){
			//先找玩家
			var queryman = new Parse.Query(Parse.User);
			queryman.get(currentUser.id, { 
				success: function(userAgain) {
					//先讓玩家資料更新,這樣不用做其他行為就可讓玩家最近更新時間有變
					userAgain.set("try",1);
					userAgain.save();
					var sta_time_user = Date.parse(userAgain.updatedAt); //取出玩家最近資料更新時間
					//再找體力資料庫
					var Sta = Parse.Object.extend("Sta");
					var querysta = new Parse.Query(Sta);
					querysta.equalTo("user", currentUser);
					querysta.find({
	  					success: function(results) {
	  					var sta_results = results[0];
	  					var sta_time_compare =Date.parse(sta_results.updatedAt)+600000; //取出體力資料庫裡玩家最近回體過的時間並加上數字條件,每60000代表一分鐘,用來分隔CD時間
		  					if (sta_time_user>sta_time_compare){ //是否可以回覆體力的判斷
		  						var confirm = sta_results.get('confirm')+1
		  						sta_results.set("confirm",confirm);
		  						sta_results.save();
		  						userAgain.set("stamina", 100);
								userAgain.save();
								getstaminalabel.innerHTML = "<h4>體力: "+100+"</h4>";
								getstamina.innerHTML = "<span class='meter' style='width:"+100+"%'"+ "id='staminanum'></span>";
		  					}else{
		  						userAgain.set("try",1);//即使不能回體力,也幫他更新資料庫的時間
								userAgain.save();
								alert("你最近已經回覆過體力,請晚點再回");
		  					}

	  					}
	  				});

				}
			});
		})


	} else {
    window.location="http://twodyssey.com/test/login.html";
}