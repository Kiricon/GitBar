
function GitHub(){
	this.data = {};
	this.commits = [];
	this.user = "";
	this.repos = [];
}

GitHub.prototype.getCommits= function(repo, callback){
	var self = this;
	var user = this.user;
	jsonp("https://api.github.com/repos/"+user+"/"+repo+"/commits?per_page=1000000&callback=json_callback", function(response){
		
		response.data.forEach(function(value){
			//console.log(self);
			self.commits.push(value.commit);
		});
		return callback();
	});
	
}

GitHub.prototype.getRepos = function(callback){
	var self = this;
	jsonp("https://api.github.com/users/"+this.user+"/repos?callback=json_callback", function(response){
		var list = [];
		response.data.forEach(function(value){
			list.push(value.name);
		});
		self.repos = list;
		return callback();
	});
}

GitHub.prototype.getAllCommits = function() {
	var self = this;
	this.getRepos(function(){
		var count = self.repos.length;
		self.repos.forEach(function(value){
			self.getCommits(value, function(){
				count--;
				if(count == 0){
					alert('done');
					console.log(self.commits);
				}
			});
		});
	});
};