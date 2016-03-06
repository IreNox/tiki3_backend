var sdk = require('../sdk');
var modelUser = require('../models/model.user');
var typesRest = require('../types/types.rest');
var GetUsersPage = (function () {
    function GetUsersPage() {
    }
    GetUsersPage.prototype.run = function (inputData, sessionData, callback) {
        if (!sessionData.user) {
            callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.user_ids) {
            modelUser.model.find({ '_id': { $in: inputData.user_ids } }).exec(function (err, result) {
                callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.Ok, result.map(function (value) { return sdk.user.exportUser(value); })));
            });
        }
        else {
            callback(new typesRest.RestGetUsersResult(typesRest.RestResultType.InvalidCall));
        }
    };
    return GetUsersPage;
})();
module.exports = GetUsersPage;
//# sourceMappingURL=page.getusers.js.map