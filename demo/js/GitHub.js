
function GitHub(){
	this.data = {};
	this.commits = {};
	this.user = "";
	this.repos = [];
}

GitHub.prototype.getCommits= function(repo, callback){
	var self = this;
	jsonp("https://api.github.com/repos/"+this.user+"/"+repo+"/commits?per_page=1000000&callback=json_callback", function(response){
		response.data.forEach(function(value)}{
			this.commits.push(value.commit);
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
		this.repos.forEach(function(value){

		});
	});
};