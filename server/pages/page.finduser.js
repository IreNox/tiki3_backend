var sdk = require("../sdk");
var modelUser = require("../models/model.user");
var FindUserPage = (function () {
    function FindUserPage() {
    }
    FindUserPage.prototype.run = function (inputData, sessionData, callback) {
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
            modelUser.model.find({ username: regex }, function (err, result) {
                if (err || !result) {
                    obj.result = "NotFound";
                }
                else {
                    obj.result = "Ok";
                    obj.users = [];
                    for (var index in result) {
                        var user = result[index];
                        if (user._id == sessionData.user._id) {
                            continue;
                        }
                        obj.users.push(sdk.user.exportUser(user));
                    }
                }
                callback(200, obj);
            });
        }
    };
    return FindUserPage;
})();
module.exports = FindUserPage;
//# sourceMappingURL=page.finduser.js.map