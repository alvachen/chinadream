Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");
var currentUser = Parse.User.current();

//验证是否登入
if (currentUser) {
	//DOM設定
	$learnpolitics = $('#learnpolitics');


	//點擊學習政治
	$learnpolitics.on('click',function(){
		//------變數定義區--------
		var test_sta = function(userAgain){//取出玩家體力值
			var getsta = userAgain.get("stamina");
			return getsta;
		}
		var consume_sta = function(userAgain){ //扣除玩家行動消耗的體力
			var after_sta = test_sta(userAgain) - 10;
			userAgain.set("stamina",after_sta);
			userAgain.save();
		}
		var queryman = new Parse.Query(Parse.User);
		var feedback = document.getElementById("feedback");
		var learnpoint = Math.floor(3*Math.random()); 
		//------變數定義區end--------

		queryman.get(currentUser.id, { 
			success: function(userAgain) {

				if (test_sta(userAgain) >= 10){//檢測玩家體力是否足夠
					consume_sta(userAgain); //扣除體力
					var origin_creed = userAgain.get("creed");
					after_creed = new Array();
					for(x in origin_creed) {
						after_creed [after_creed .length]=origin_creed[x]+learnpoint;
					}
					userAgain.set("creed",after_creed );
					userAgain.save();
					feedback.innerHTML = "<h2>你學習了!</h2>"
				}else{
					alert("你的體力不夠");
				}
			}
		});

	});




	} else {
    window.location="http://twodyssey.com/test/login.html";
}