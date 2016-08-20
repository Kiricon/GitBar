
function GitHub(){
	this.data = {};
	this.commits = [];
	this.pulls = [];
	this.user = "";
	this.repos = [];
	this.stats = 0;
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
GitHub.prototype.getPulls= function(repo, callback){
	var self = this;
	var user = this.user;
	jsonp("https://api.github.com/repos/"+user+"/"+repo+"/pulls?per_page=1000000&callback=json_callback", function(response){
		console.log(response.data);
		response.data.forEach(function(value){
			console.log(value);
			self.pulls.push(value.pull);
		});
		return callback();
	});
	
}

GitHub.prototype.getStats= function(repo, callback){
	var self = this;
	var user = this.user;
	jsonp("https://api.github.com/repos/"+user+"/"+repo+"/stats/commit_activity?per_page=1000000&callback=json_callback", function(response){
		//console.log(response);
		response.data.forEach(function(value){
			self.stats += value.total;
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

GitHub.prototype.getAllCommits = function(callback) {
	var self = this;
	this.getRepos(function(){
		var count = self.repos.length;
		self.repos.forEach(function(value){
			self.getCommits(value, function(){
				count--;
				if(count == 0){
					callback();
				}
			});
		});
	});
};

GitHub.prototype.getAllPulls = function(callback) {
	var self = this;
	this.getRepos(function(){
		var count = self.repos.length;
		self.repos.forEach(function(value){
			self.getPulls(value, function(){
				count--;
				if(count == 0){
					callback();
				}
			});
		});
	});
};

GitHub.prototype.getAllStats = function(callback) {
	var self = this;
	this.getRepos(function(){
		var count = self.repos.length;
		self.repos.forEach(function(value){
			self.getStats(value, function(){
				count--;
				if(count == 0){
					callback();
				}
			});
		});
	});
};





