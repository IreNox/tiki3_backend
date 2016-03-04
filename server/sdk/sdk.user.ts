﻿import modelUser = require('../models/model.user');
import typesRest = require('../types/types.rest');

var validFields = [
    '_id',
    'username'
];

class SdkUser {
    findUser(user_id: string, callback) {
        modelUser.model.findById(user_id).populate('friends').exec(callback);
    }

    saveUser(user: modelUser.User, sessionData: any, callback: typesRest.RestResultTypeCallback) {
        if (user._id != sessionData.user._id) {
            callback(typesRest.RestResultType.InvalidCall);
        }
        else {
            user.save(function (err) {
                if (err) {
                    callback(typesRest.RestResultType.DatabaseError);
                }
                else {
                    sessionData.user = user;
                    callback(typesRest.RestResultType.Ok);
                }
            });
        }
    }

    exportUser(user: modelUser.User) {
        var result: any = { friends: [] };

        for (var index in validFields) {
            var key = validFields[index];
            result[key] = user[key];
        }

        for (var index in user.friends) {
            result.friends.push(this.exportUser(user.friends[index]));
        }

        return result;
    }
}
export = SdkUser;