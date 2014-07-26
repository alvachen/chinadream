Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");
var currentUser = Parse.User.current();

//验证是否登入
if (currentUser) {

	//DOM設定
	var queryman = new Parse.Query(Parse.User);
	var $drop1 = $('#drop1 li a');
	var $news = $('#news');

	//------變數定義區--------
	var get_data = function(userAgain,column){//取出玩家體力值
		return userAgain.get(column);
	}
	var change_userdata = function(userAgain,x,origin,column){ //扣除玩家行動消耗的體力
		var after_data = origin + x;
		userAgain.set(column,after_data);
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
				if(get_data(userAgain,"stamina")>=20){//判断体力
					change_userdata(userAgain,-20,get_data(userAgain,"stamina"),"stamina");//扣除體力20
					change_userdata(userAgain,Math.random()*4+1,get_data(userAgain,"impact_p"),"impact_p");//增加政治影響力

						match.equalTo("name", "廣州"); //找寻符合的城市
						match.find({
							success: function(results) {
								if (which_thought==="promote_c"){//宣傳共產思想
									var cityresult=results[0];
									var before_c=cityresult.get("commuism");
									var promote_point = origin_creed[0]/10 + Math.round(Math.random()*10-5);
									cityresult.set("commuism",before_c+promote_point);
									$news.html("<div data-alert class='alert-box info radius'>廣州市民共產社會思想略增"+promote_point+"點</div>");
									cityresult.save();
								}else if(which_thought==="promote_d"){//宣傳民主思想
									var cityresult=results[0];
									var before_c=cityresult.get("democracy");
									var promote_point = origin_creed[1]/10 + Math.round(Math.random()*5-2);
									cityresult.set("democracy",before_c+promote_point);
									$news.html("<div data-alert class='alert-box info radius'>廣州市民民主共和思想略增"+promote_point+"點</div>");
									cityresult.save();
								}else{//宣傳立憲思想
									var cityresult=results[0];
									var before_c=cityresult.get("monarchy");
									var promote_point = origin_creed[2]/10 + Math.round(Math.random()*8-3);
									cityresult.set("monarchy",before_c+promote_point);
									$news.html("<div data-alert class='alert-box info radius'>廣州市民君主立憲思想略增"+promote_point+"點</div>");
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