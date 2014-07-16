Parse.initialize("vpelTYEJUqafKTVdrl0l2ujl248VmxGiePYYViUG", "H2tIkCOmWKSg4qyBRYIIIazphRqETaX2wI9QpsHo");


$('#logout').click(function(){
	Parse.User.logOut();
	var currentUser = Parse.User.current();
	window.location="http://twodyssey.com/test/login.html";
});

var currentUser = Parse.User.current();
//验证是否登入
if (currentUser) {
    // do stuff with the user

    //DOM变数设定
    var $stuffnum = $('input#stuffnum');

	//抓取商品資料
	var Commodity = Parse.Object.extend("Commodity");
	var query = new Parse.Query(Commodity);
	query.startsWith("catagory", "s"); //查詢種類符合的商品

	query.find({
	  success: function(results) {
	  	$('table').append("<tr>"+"<td>名稱</td>"+"<td>買價</td>"+"<td>賣價</td>"+"<td>數量</td>"+"</tr>");
	  	for (var i = 0; i < results.length; i++) { 
	      var commodity = results[i];	
	      var name = commodity.get("name");
	      var buy = commodity.get("buy");
	      var sell = commodity.get("sell");
	      var quant = commodity.get("quantity");
	      $('table').append("<tr>"+"<td>" + name + "</td>"+"<td>"+buy+"</td>"+"<td>"+sell+"</td>"+"<td>"+quant+"</td>"+"</tr>");
	      }
	      	//買商品
			$('#buyit').on('click',function(){
				var thing = $('#choose option:selected').text(); //拿取option選中的值
				var Commodity = Parse.Object.extend("Commodity");
				var commodity = new Commodity();
				var match = new Parse.Query(Commodity);
				match.equalTo("name", thing); //找寻符合商品名字的

				//找到后要执行的功能
				match.find({
					  success: function(results) {
					  	 for (var i = 0; i < results.length; i++) { 
						      var object = results[i];
						      var buynum = $stuffnum.val();
						      var buynum2 = parseInt(buynum,10); //buynum是字串,需要将他转换为数字
						      var beforenum = object.get('quantity');
						      var afternum = beforenum - buynum2;
						      if (buynum2>0){
						      		if(afternum>0){
								      object.set('quantity',afternum);
								      object.save();
								      alert(currentUser.attributes.money);
							  		}else{
							  			alert("商品数量不够");
							  		}
						 		 }else{
						 		 	alert("交易数量不对");
						 		 }
						    }
					  },
					  error: function(object, error) {
					    console.log("The object was not retrieved successfully.");
					  }
				});
			});

			//卖商品
			$('#sellit').on('click',function(){
				var thing = $('#choose option:selected').text(); //拿取option選中的值
				var Commodity = Parse.Object.extend("Commodity");
				var commodity = new Commodity();
				var match = new Parse.Query(Commodity);
				match.equalTo("name", thing); //找寻符合商品名字的

				//找到后要执行的功能
				match.find({
					  success: function(results) {
					  	 for (var i = 0; i < results.length; i++) { 
						      var object = results[i];
						      var sellnum = $stuffnum.val();
						      var sellnum2 = parseInt(sellnum,10); //buynum是字串,需要将他转换为数字
						      var beforenum = object.get('quantity');
						      var afternum = beforenum + sellnum2;
						      if (sellnum2>0){
								      object.set('quantity',afternum);
								      object.save();				  		
						 		 }else{
						 		 	alert("交易数量不对");
						 		 }
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