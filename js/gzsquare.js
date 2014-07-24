Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");
var currentUser = Parse.User.current();

//验证是否登入
if (currentUser) {

	//DOM設定
	var queryman = new Parse.Query(Parse.User);
	var $drop1 = $('#drop1 li a');
	var $news = $('#news');

	//------變數定義區--------
	var test_sta = function(userAgain){//取出玩家體力值
		return userAgain.get("stamina");
	}
	var consume_sta = function(userAgain,x){ //扣除玩家行動消耗的體力
		var after_sta = test_sta(userAgain) - x;
		userAgain.set("stamina",after_sta);
		userAgain.save();
	}

	var City = Parse.Object.extend("City");
	var match = new Parse.Query(City);
	//點擊宣傳思想
	$drop1.on('click',function(){
		var which_thought = $(this).attr("id");//根據按的id判斷是宣傳什麼思想
		queryman.get(currentUser.id, { //找尋玩家資料庫 
			success: function(userAgain) {
				var origin_creed = userAgain.get("creed");
				if(test_sta(userAgain)>=20){//判断体力
					consume_sta(userAgain,20);

						match.equalTo("name", "廣州"); //找寻符合的城市
						match.find({
							success: function(results) {
								if (which_thought==="promote_c"){//宣傳共產思想
									var cityresult=results[0];
									var before_c=cityresult.get("commuism");
									cityresult.set("commuism",before_c+origin_creed[0]/10);
									$news.html("<p>廣州市民共產社會思想略增"+origin_creed[0]/10+"點</p>");
									cityresult.save();
								}else if(which_thought==="promote_d"){//宣傳民主思想
									var cityresult=results[0];
									var before_c=cityresult.get("democracy");
									cityresult.set("democracy",before_c+origin_creed[1]/10);
									$news.html("<p>廣州市民民主共和思想略增"+origin_creed[1]/10+"點</p>");
									cityresult.save();
								}else{//宣傳立憲思想
									var cityresult=results[0];
									var before_c=cityresult.get("monarchy");
									cityresult.set("monarchy",before_c+origin_creed[2]/10);
									$news.html("<p>廣州市民君主立憲思想略增"+origin_creed[2]/10+"點</p>");
									cityresult.save();
								}
							}
						});

				}else{
					alert("體力不夠");
				}
			
			}
		});

	});













		} else {
    window.location="http://twodyssey.com/test/login.html";
}