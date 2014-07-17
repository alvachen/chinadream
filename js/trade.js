Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");

//登出
$('#logout').click(function(){
	Parse.User.logOut();
	var currentUser = Parse.User.current();
	window.location="http://twodyssey.com/test/login.html";
});

//验证是否登入
var currentUser = Parse.User.current();

if (currentUser) {

    //Jquery DOM变数设定
    var $stuffnum = $('input#stuffnum');
    var $alert1 = $('#alert1');
    var $alert2 = $('#alert2');
    var $alert3 = $('#alert3');
    var $table = $('table');
    var $buyit = $('#buyit');
    var $sellit = $('#sellit');

	//抓取商品資料
	var Commodity = Parse.Object.extend("Commodity");
	var query = new Parse.Query(Commodity);
	query.startsWith("catagory", "s"); //查詢種類符合的商品
	//把這些商品列出表到網頁上
	query.find({
	  success: function(results) {
	  	$table.append("<tr>"+"<td>名稱</td>"+"<td>買價</td>"+"<td>賣價</td>"+"<td>數量</td>"+"</tr>");
	  	for (var i = 0; i < results.length; i++) { 
	      var commodity = results[i];	
	      var name = commodity.get("name");
	      var bid = commodity.get("buy");
	      var ask = commodity.get("sell");
	      var quant = commodity.get("quantity");
	      $table.append("<tr>"+"<td>" + name + "</td>"+"<td>"+bid+"</td>"+"<td>"+ask+"</td>"+"<td>"+quant+"</td>"+"</tr>");
	      }
	      	//買商品
			$buyit.on('click',function(){
				var thing = $('#choose option:selected').text(); //拿取option選中的值
				var Commodity = Parse.Object.extend("Commodity");
				var commodity = new Commodity();
				var match = new Parse.Query(Commodity);
				match.equalTo("name", thing); //找寻符合选择的商品名字

				//找到后要执行的功能
				match.find({
					  success: function(results) {
					  	 for (var i = 0; i < results.length; i++) { 
						      var object = results[i];
						      var buynum = $stuffnum.val();
						      var buynum2 = parseInt(buynum,10); //buynum是字串,需要将他转换为数字
						      var beforenum = object.get('quantity'); //取出原本商品的数量
						      var buyprice = object.get('sell'); //取出市场卖价
						      var buycost = buyprice*buynum2; //此次交易花費
						      	var queryrole = new Parse.Query(Parse.User);
									queryrole.equalTo("username", currentUser.attributes.username);  
									queryrole.find({
									  success: function(role) {									    								    
								      var usermoney = role[0].attributes.money; //取出玩家的錢						      
								      var usermoney2 = usermoney-buycost; //此次交易后玩家剩的钱
								      var userstamina = role[0].attributes.stamina - 5;//取出玩家的体力
								      var afternum = beforenum - buynum2; // 交易后市場的数量
								      if (buynum2>0 && usermoney2>0){ //需要符合市場上商品夠買和玩家有錢兩條件
								      		if(afternum>0){
								      		  //以下将交易后的数量存回市場资料库
										      object.set('quantity',afternum); 
										      object.save();

											  //以下利用玩家的id找出他的资料并更新
										      var queryman = new Parse.Query(Parse.User);
										        queryman.get(currentUser.id, { 
										          success: function(userAgain) {
										            userAgain.set("money", usermoney2);
										            userAgain.set("stamina", userstamina);
										            //以下暫用很蠢的的方式找出玩家交易的物品並更新
										             if(thing ==="米"){
										             	var playerrice = role[0].attributes.rice;
										             	var playerrice = playerrice+buynum2;	
										      			  userAgain.set("rice",playerrice);
										      			}
										      		  if(thing ==="糖"){
										      		  	var playersugar = role[0].attributes.sugar;
										             	var playersugar = playersugar+buynum2;
										      			  userAgain.set("sugar",playersugar);
										      			}
										            userAgain.save(null, {										              
										              error: function(userAgain, error) {
										              	console.log("发生交易错误");
										              }
										            });
										          }
										        });										      
										        $alert1.append("<span>"+" "+"買進"+buynum+"單位"+thing+"</span>").fadeIn(500); //交易成功提示
										        setTimeout('window.location.reload(true)',2100); //完成交易则自动刷新画面
									  		}else{
									  			$alert3.append("<span>"+"交易商品不足"+"</span>").fadeIn(500);
									  			setTimeout('window.location.reload(true)',2100); 
									  		}
								 		 }else{
								 		 	$alert3.append("<span>"+"你的錢不夠喔"+"</span>").fadeIn(500);
								 		 	setTimeout('window.location.reload(true)',2100); 
								 		 }
								      }
									});
						    }
					  },
					  error: function(object, error) {
					    console.log("The object was not retrieved successfully.");
					  }
				});
			});

			//卖商品
			$sellit.on('click',function(){
				var thing = $('#choose option:selected').text(); //拿取option選中的值
				var Commodity = Parse.Object.extend("Commodity");
				var commodity = new Commodity();
				var match = new Parse.Query(Commodity);
				match.equalTo("name", thing); //找寻符合商品名字的

				//找到后要执行的功能
				match.find({
					  success: function(results) {
					  	 for (var i = 0; i < results.length; i++) { 
						      var object = results[i]; //object是找到的交易商品
						      var sellnum = $stuffnum.val();
						      var sellnum2 = parseInt(sellnum,10); //sellnum是字串,需要将他转换为数字
						      var beforenum = object.get('quantity');
						      var sellprice = object.get('buy'); 
						      var sellearn = sellprice*sellnum2; //此次交易收入
						      var queryrole = new Parse.Query(Parse.User);
									queryrole.equalTo("username", currentUser.attributes.username);  
									queryrole.find({
									  success: function(role) {
									  var usermoney = role[0].attributes.money; //取出玩家的錢
								      var usermoney2 = usermoney + sellearn; //此次交易后玩家剩的钱
								      var userstamina = role[0].attributes.stamina - 5; //取出玩家的体力
								      var afternum = beforenum + sellnum2; // 交易后市場的数量									      
										 if(sellnum2>0){
												//利用玩家的id找出他的资料并更新
												var queryman = new Parse.Query(Parse.User);
												queryman.get(currentUser.id, { 
												    success: function(userAgain) {
												    	//以下暫用很蠢的的方式找出玩家交易的物品並更新其庫存和金錢
												    	if(thing ==="米"){
											             	var playerrice = role[0].attributes.rice;
											             	var playerrice = playerrice-sellnum2;	
											             		if(playerrice>=0){ //玩家擁有的物品必須足夠賣
											             			userAgain.set("rice",playerrice);
											             			userAgain.set("money", usermoney2);
											             			userAgain.set("stamina", userstamina);
											             			object.set('quantity',afternum); //将交易后的数量存回市場资料库
																	object.save();
												      				userAgain.save();
												      				$alert2.append("<span>"+" "+"賣出"+sellnum+"單位"+thing+"</span>").fadeIn(500); //交易成功提示
																	setTimeout('window.location.reload(true)',2100); //完成交易则自动刷新画面 
											             		}else{
											             			$alert3.append("<span>"+"擁有商品不夠賣"+"</span>").fadeIn(500);
								 		 							setTimeout('window.location.reload(true)',2100); 
											             		}											      			  
										      			}
										      		  	if(thing ==="糖"){
											      		  	var playersugar = role[0].attributes.sugar;
											             	var playersugar = playersugar-sellnum2;
												             	if(playersugar>=0){ //玩家擁有的物品必須足夠賣
												             			userAgain.set("sugar",playersugar);
												             			userAgain.set("money", usermoney2);
												             			userAgain.set("stamina", userstamina);
												      					object.set('quantity',afternum); //将交易后的数量存回市場资料库
																		object.save();
																		userAgain.save();
																		$alert2.append("<span>"+" "+"賣出"+sellnum+"單位"+thing+"</span>").fadeIn(500); //交易成功提示
																		setTimeout('window.location.reload(true)',2100); //完成交易则自动刷新画面 
												             		}else{
												             			$alert3.append("<span>"+"擁有商品不夠賣"+"</span>").fadeIn(500);
								 		 								setTimeout('window.location.reload(true)',2100); 
												             		}
										      			}			
												    }
												});   		  		
								 		  }else{
								 		 	$alert3.append("<span>"+"交易數量異常"+"</span>").fadeIn(500);
								 		 	setTimeout('window.location.reload(true)',2100); 
								 		  }								 	 									  
						            }
						          });
					           }
					        },
					  error: function(object, error) {
					    console.log("The object was not retrieved successfully.");
					  }
				});
			});
	  },
	  error: function(object, error) {
	    console.log("The object was not retrieved successfully.");
	  }
	});



} else {
    window.location="http://twodyssey.com/test/login.html";
}