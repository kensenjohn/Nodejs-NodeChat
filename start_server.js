/*
* this is where the code flow starts executing.
*/

var commands = require("./commands");
var chatServer = require("./chat_server");
var userdetail = require("./user_detail");

var commandlist = [];
commandlist["about"] = commands.about;

var actionList = [];
actionList["userdetail"] = userdetail;

chatServer.start( commandlist , actionList );
