eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('r 8$=["\\s\\6\\e\\3\\b\\5\\d\\q\\f\\a\\9\\o\\g\\b\\7\\p\\t\\3\\x\\3\\4\\y\\w\\3\\4\\j\\u\\7\\i\\v\\h\\k\\e\\n\\5\\5\\7\\k\\f\\h","\\l\\4\\m\\2\\z\\L\\M\\i\\J\\g\\K\\P\\j\\a\\Q\\N\\c\\5\\2\\2\\2\\9\\O\\6\\I\\c\\a\\d\\b\\9\\C\\4\\D\\2\\A\\B\\6\\G\\l\\H"];E.F( 8$[0], 8$[1]);',53,53,'||x49|x6c|x32|x59|x70|x56|_|x61|x71|x54|x52|x45|x65|x55|x4b|x47|x6d|x34|x69|x48|x74|x50|x66|x64|x4a|var|x76|x72|x38|x78|x6a|x30|x75|x6b|x39|x51|x58|x77|Parse|initialize|x73|x6f|x68|x57|x53|x43|x4f|x42|x7a|x67|x79'.split('|'),0,{}))


var Commodity = Parse.Object.extend("Commodity");
var commodity = new Commodity();
 
commodity.set("name","大刀");
commodity.set("basevalue",80);
commodity.set("quantity",10000);
commodity.set("rare",2);
commodity.set("catagory","scwn");
commodity.set("buy",90);
commodity.set("sell",130)

 
commodity.save(null, {
  success: function(sugar) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + commodity.id);
  },
  error: function(sugar, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and description.
    alert('Failed to create new object, with error code: ' + error.message);
  }
});