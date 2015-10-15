var models = require("../models.js");
var sdk = require("../sdk.js");

module.exports = {
    run: function (inputData, sessionData, callback) {
        var obj = { result: "Unknown" };

        if (!inputData.username) {
        	obj.result = "InvalidCall";
        	callback(200, obj);
        }
        else if (!sessionData.user) {
        	obj.result = "NotLoggedin";
        	callback(200, obj);
        }
        else {
        	var regex = new RegExp(inputData.username);
        	models.user.find({ username: regex }, function (err, result) {
        		if (err ||!result) {
        			obj.result = "NotFound";
        		}
        		else {
        			obj.result = "Ok";

        			obj.users = [];
        			for (var index in result) {
        				obj.users.push(sdk.user.exportUser(result[index]));
        			}
        		}

        		callback(200, obj);
        	});
        }	    
	}
};