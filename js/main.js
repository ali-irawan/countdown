var items = [];
var refreshTime = 800;
String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
function format(time){
   // convert miliseconds to seconds
   var days = Math.floor(time / 86400);
   time = time % 86400;	
   var hour = Math.floor(time / 3600);
   time = time % 3600;	
   var minute = Math.floor(time / 60);
   time = time % 60;	
   	
   return days + " D " + hour.toString().lpad("0",2) + ":" + minute.toString().lpad("0",2) + ":" + time.toString().lpad("0",2);		
}
function startApp(){
	// Load all data first
	sendRequest(function(request){
		if(request.readyState == 4){
		   if (request.status == 200) {
			items = JSON.parse(request.responseText);
			var view = document.getElementById('view');
			
			view.innerHTML = '';
			var html = '';
			for(i in items){
				html += '<div id="item'+i+'">';	
				html += '<p>' + items[i].name + '</p>';
				html += '<p>Expired in</p>';
				html += '<p id="format'+i+'">'+format(items[i].expired)+'</p>';
				html += '</div>';
			}
			view.innerHTML += html;
			setInterval(updateTimer,refreshTime);
		   }
		}
	},"server.php");
}
function updateTimer(){
      for(id in items){
	      sendRequest(function(request){
			if(request.readyState == 4){
			   if (request.status == 200) {
				var json = JSON.parse(request.responseText);
				document.getElementById('format'+json.id).innerHTML = format(json.expired);
			   }
	    		}
	      },"server.php?id=" + id);
      }		

}
