var github = new GitHub();
github.user = "Ellesent";
/*
github.getAllCommits(function(){
	console.log(github.commits.length);
	github.getAllPulls(function(){
		console.log(github.pulls.length);
	});
}); */

github.getAllStats(function(){
	console.log(github.stats);
});
