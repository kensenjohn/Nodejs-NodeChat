var commands = require("./commands");
function onData( arrParameter )
{
	 var data = arrParameter[0];
        //data = data.substring(0, data.length-1);
        var socket = arrParameter[1];
        allUsers = arrParameter[2];
	return parseCommandString( data , socket , allUsers );
}

function parseCommandString ( data, socket, allUsers )
{
	var command = data + "";
	command = command.substring( 0 , command.length - 2 );
	
	if( command == "about" )
	{
		var varUserDetail = getUser( socket, allUsers );
		return processAboutCommand( varUserDetail );
	}
	else if( command == "list_user")
	{
		var varUserDetail = getUser( socket, allUsers );
		return processListUsersCommand( varUserDetail , allUsers );
	}
	else if( command == "quit" )
	{
		var varUserDetail = getUser( socket, allUsers );
                return processQuitCommand( varUserDetail );

	}
	else
	{
		 var varUserDetail = getUser( socket, allUsers );
                return processUnknownCommand( varUserDetail );
	}
}

function processAboutCommand( varUserDetail )
{
        varUserDetail.messageFor = "self";
        varUserDetail.dataText = commands.about() + ">";
	varUserDetail.status = "command";
	return varUserDetail;
}

function processListUsersCommand ( varUserDetail, allUsers )
{
	varUserDetail.messageFor = "self";
	varUserDetail.dataText = commands.listUsers( allUsers ) + ">";
	varUserDetail.status = "command";
	return varUserDetail;
}

function processQuitCommand( varUserDetail )
{
        varUserDetail.messageFor = "all";
        varUserDetail.dataText = "\n";
        varUserDetail.status = "data";
        return varUserDetail;

}

function processUnknownCommand( varUserDetail )
{
	  varUserDetail.messageFor = "self";
        varUserDetail.dataText = "unknown comman\n>";
        varUserDetail.status = "command";
        return varUserDetail;

}


function getUser( socket, allUsers )
{
	for( var i = 0; i < allUsers.length; i++ )
        {
		var varUserDetail = allUsers[i];
                if( varUserDetail.userSocket == socket )
                {
			return varUserDetail;
			break; 
		}
	}
}

exports.onData = onData;
