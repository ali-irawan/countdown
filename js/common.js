var isIE = false;
var requests = new Array();

function getAjax(){
    if (requests.length < 1) {
	if (window.XMLHttpRequest && !(window.ActiveXObject)) {
	    try {
		return new XMLHttpRequest();
	    } catch (e) {}
	}
	isIE = true;
	try {
	    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
	} catch(e) {}
	try {
	    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
	} catch(e) {}
	try {
	    return new ActiveXObject("Msxml2.XMLHTTP");
	} catch(e) {}
	try {
	    return new ActiveXObject("Microsoft.XMLHTTP");
	} catch(e) {}
	return undefined;
    } else {
	return requests.pop();
    }	
}


function sendRequest(callback, url, id){
	var request = getAjax();
	if (request != undefined) {
		if (isIE) {
			request.open("GET", url, true);
			if (callback != null) {
				if (id != null) {
					request.onreadystatechange = function() { callback(request, id);};
				} else {
					request.onreadystatechange = function() { callback(request);};
				}
			} else {
				request.onreadystatechange = function() {};
			}
		} else {
			if (callback != null) {
				if (id != null) {
					request.onload = function() { callback(request, id);};
				} else {
					request.onload = function() { callback(request);};
				}
			} else {
				request.onload = function() {};
			}
			request.open("GET", url, true);
		}
		request.send(null);
	}
}
