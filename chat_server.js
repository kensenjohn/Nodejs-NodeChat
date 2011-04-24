/*
* This is the heart of the Chat Server. We are using TCP server as a basis, to receive calls.
* Clients are generally Telnet or NetCat which where is appropriate.
* Chat Server listens to inputs on port 8282.
*/
var net = require( "net" );
var userDetails = require( "./user_detail.js" );
var serverActionListener = require( "./server_action_listener" );

var allUsers = [];
var commandlist;
var actionlist;

function listenerObject()
{
	this.action;
	this.methodname;
	this.arrparameter = [];

};

function serverCallBack( socket )
{
	
	socket.on("connect", function() {
		socket.write( "Hello Stranger : \n\r You Logged in at " + new Date() + "\n\r");
		socket.write( "Enter the Username you would like to use : " );

		var listener = new listenerObject();
		listener.action = "userdetail";
		listener.methodname = "onConnect";
		listener.arrparameter[0] = socket;

		var varUserDetail = serverActionListener.listenerAction( actionlist, commandlist , listener );	
		allUsers.push( varUserDetail );
		listUserDetails();
	}  );

	socket.on( "data" , function( data ) {

		 var listener = new listenerObject();

 		listener.arrparameter[0] = data;
                listener.arrparameter[1] = socket;
                listener.arrparameter[2] = allUsers;

		if( getStatus( socket ) == "command" )
		{
			console.log ( "commandcenter server entered ");
                	listener.action = "commandcenter";
                	listener.methodname = "onData";
		}
		else
		{
		        listener.action = "userdetail";
                	listener.methodname = "onData";
		}

		var varUserDetail = serverActionListener.listenerAction( actionlist, commandlist , listener );
		
		writeToSocket ( varUserDetail , allUsers );
		
		listUserDetails();
	} );

	socket.on ( "end" , function () {
		
		var listener = new listenerObject();

                listener.arrparameter[0] = socket;
                listener.arrparameter[1] = allUsers;

                listener.action = "userdetail";
                listener.methodname = "onClose";
 		
		var varUserName = serverActionListener.listenerAction( actionlist, commandlist , listener );

		writeTextToSocket ( "\n" + varUserName + " has left the chat room.\n", allUsers); 

		listUserDetails();
	});
}

function getStatus( socket )
{
	console.log( "getStatus entered " );
	for( var i = 0; i < allUsers.length; i++ )
	{
		var userDets = allUsers[i];
		console.log("getStatus username : " + userDets.username );
		if( userDets.userSocket == socket )
		{
			console.log(" selected username : " + userDets.username  + " -- " + userDets.status + "" ) ;
			return userDets.status;
			break;
		}
	}
}

function writeToSocket( varUserDetail, allUsers)
{
	console.log( "char_server : varUserDetail -> " + varUserDetail );
	if(varUserDetail.dataText == "\n")
	{
		return;
	}
	if( varUserDetail.messageFor == "self")
	{
		varUserDetail.userSocket.write ( varUserDetail.dataText );
	}
	else if ( varUserDetail.messageFor == "all")
        {
		for( var i = 0; i < allUsers.length; i++ )
		{
			var userDets = allUsers[i];
			
			var varUserName =  varUserDetail.username + "";
	                userDets.userSocket.write ( varUserName + " : " + varUserDetail.dataText);

		}
        }

}

function writeTextToSocket( textMssg , allUsers )
{
	for( var i = 0; i < allUsers.length; i++ )
        {
		var userDets = allUsers[i];

		userDets.userSocket.write ( textMssg );
		if( userDets.status == "command" )
		{
			userDets.userSocket.write ( ">" );
		}
	}
}

function listUserDetails()
{
	for( var i =0; i< allUsers.length; i++)
	{
		console.log("\n" +  allUsers[i].username + " - " + allUsers[i].status);
	}
}

function startServer( servercommands , serveractionlist )
{
	if( servercommands != undefined )
	{
		console.log ( "Start Chat Server ... " );
		var netServer = net.createServer( serverCallBack );
		netServer.listen( 8282 );

		commandlist = servercommands;
		actionlist = serveractionlist;

		console.log ( "Listening to Port 8282 " );
	}
	else
	{
		console.log( "\nIllegal Server Access\n");
	}

}


exports.start = startServer;
