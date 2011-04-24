/*
* This js file acts as a listener to user input.
* All Files and their methods are pre loaded onto arrays
* Based on the request, the call is redirected to appropriate methods.
* They also return responses as required.
*/

// These are set of files to which the call has to go to.
var userDetail = require("./user_detail");
var commandCenter = require("./command_center");

// These are the associated methods which will handle the call.
var userDetailHandler = [];
userDetailHandler["onConnect"] = userDetail.onConnect;
userDetailHandler["onData"] = userDetail.onData;
userDetailHandler["onClose"] = userDetail.onClose;

var commandCenterHandler = [];
commandCenterHandler["onData"] = commandCenter.onData;


function listenAction( actionList , commandList ,  listenerObject )
{
	var actionFile = listenerObject.action ;
	var methodNm = listenerObject.methodname;
	var arrParameter = listenerObject.arrparameter;
	var varUserDetail = choseAction( actionFile, methodNm, arrParameter );
	return varUserDetail;
}

function choseAction(actionFile, methodNm, arrParameter)
{
	if(actionFile == "userdetail")
	{	
		var varUserDetail = userDetailHandler[methodNm](arrParameter);
		return varUserDetail;
	}
	else if( actionFile = "commandcenter" )
	{
		var varUserDetail = commandCenterHandler[methodNm](arrParameter);
		return varUserDetail;
	}
}

exports.listenerAction = listenAction;


