var actualFunction = function(data){

}

function json_callback(data){
	actualFunction(data);
}


function jsonp(url, callback){
actualFunction = callback;
var script = document.createElement('script');
script.src = url;
document.getElementsByTagName('head')[0].appendChild(script);
}


