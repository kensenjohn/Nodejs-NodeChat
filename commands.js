/*
* This is a supporting file for the command center.
* This is where the different operations are defined.
* 
*/


function about()
{
	var txt = "Nodejs Chat Server 1.0\nAuthor: Kensen John\n";
	return txt;
}
function listUsers( allUsers )
{
	var userNames = "";
	for(var i = 0; i<allUsers.length; i++)
	{
		userNames = "> " + allUsers[i].username + "\n";
	}
	
	return userNames;
}

exports.about = about;
exports.listUsers = listUsers;
