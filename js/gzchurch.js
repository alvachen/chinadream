Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");
var currentUser = Parse.User.current();

//验证是否登入
if (currentUser) {

	//DOM設定
	$learnpolitics = $('#learnpolitics');
    $learneconomy = $('#learneconomy');
    $comment1 = $('#comment1');
	//------變數定義區--------
	var test_sta = function(userAgain){//取出玩家體力值
		return userAgain.get("stamina");
	}
	var consume_sta = function(userAgain,x){ //扣除玩家行動消耗的體力
		var after_sta = test_sta(userAgain) - x;
		userAgain.set("stamina",after_sta);
		userAgain.save();
	}
	var queryman = new Parse.Query(Parse.User);
	var feedback = document.getElementById("feedback");
	var npc1 = document.getElementById("npc1");
	//------變數定義區end--------

	//點擊學習政治
	$learnpolitics.on('click',function(){
		queryman.get(currentUser.id, { 
			success: function(userAgain) {

				if (test_sta(userAgain) >= 15){//檢測玩家體力是否足夠
					var learnpoint = Math.floor(3*Math.random()); //學習點亂數獲得
					consume_sta(userAgain,15); //扣除體力
					var origin_creed = userAgain.get("creed");
					after_creed = new Array();
					for(x in origin_creed) {
						after_creed [after_creed.length]=origin_creed[x]+learnpoint;
					}
					userAgain.set("creed",after_creed );
					userAgain.save();
						if(learnpoint===0){
							feedback.innerHTML="<h3>頭腦昏昏,無法吸收近任何新知.....</h3>"+"<div class='alert alert-danger' role='alert' id='backalert'>消耗體力 15 點,政治思想皆成長"+learnpoint+"</div>";
						}else{
							feedback.innerHTML = "<blockquote><p>極權政治制度鼓吹的是一種被動和冷漠的文化。這種政權所要塑造的是馴服聽話的公民，相反，民主社會的公民文化是由個人及群體自由選擇的活動所決定的，為他們自己的生活承擔責任。</p></blockquote>"+"<div class='alert alert-danger' role='alert' id='backalert'>消耗體力 15 點,政治思想皆成長"+learnpoint+"</div>";
						}


				}else{
					alert("你的體力不夠");
				}
			}
		});

	});
	//點擊學習經濟
	$learneconomy.on('click',function(){
		queryman.get(currentUser.id, { 
			success: function(userAgain) {

				if (test_sta(userAgain) >= 15){//檢測玩家體力是否足夠
					consume_sta(userAgain,15); //扣除體力
					var learnpoint = Math.floor(3*Math.random()); //學習點亂數獲得
					var after_economy = userAgain.get("economy")+learnpoint;
					userAgain.set("economy",after_economy );
					userAgain.save();
						if(learnpoint===0){
							feedback.innerHTML = "<h3>頭腦昏昏,無法吸收近任何新知.....</h3>"+"<div class='alert alert-danger' role='alert' id='backalert'>消耗體力 15 點,商業知識成長"+learnpoint+"</div>";
						}else{
							feedback.innerHTML = "<blockquote><p>自由市場表面看似混亂而毫無拘束，實際上卻是由一隻被稱為「看不見的手」所指引，這會引導市場生產出正確的產品數量和種類。</p><footer>Adam Smith</footer></blockquote>"+"<div class='alert alert-danger' role='alert' id='backalert'>消耗體力 15 點,商業知識成長"+learnpoint+"</div>";
						}
				}else{
					alert("你的體力不夠");
				}
			}
		});

	});

	//點擊交談陳少白
	$comment1.on('click',function(){
		queryman.get(currentUser.id, { 
			success: function(userAgain) {

				if (test_sta(userAgain) >= 5){//檢測玩家體力是否足夠
					consume_sta(userAgain,5); //扣除體力
					var friendpoint = Math.floor(4*Math.random()); //學習點亂數獲得
					var before_friend = userAgain.get("npc");
					    before_friend[0] = before_friend[0]+ friendpoint;
					userAgain.set("npc",before_friend );
					userAgain.save();
					npc1.innerHTML = "兄台你好,主讓我倆在此相遇!"
				}else{
					alert("你的體力不夠");
				}
			}
		});

	});





	} else {
    window.location="http://twodyssey.com/test/login.html";
}