
function GitHub(){
	this.data = {};
	this.commits = {};
}

GitHub.prototype.getEvents = function(callback){
	var self = this;
	jsonp("https://api.github.com/users/kiricon/events?callback=json_callback", function(response){
		self.data = response.data;
		return callback();
	});
	
}

GitHub.prototype.getCommits = function() {
	var self = this;
	this.getEvents(function(){
		var list = [];
		self.data.forEach(function(value, index){
			if(value.type == "PushEvent"){
				value.payload.commits.forEach(function(commit){
					list.push(commit);
				
				});
			}
		});
		self.commits = list;
	});
};