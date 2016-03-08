﻿import * as mongoose from 'mongoose';
import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesRest from '../../shared/types/types.rest';

var validFields = [
    'username',
    'points'
];

export default class SdkUser {
    findUser(user_id: string, callback) {
        modelUser.model.findById(user_id).exec(callback);
    }

    saveUser(user: modelUser.User, sessionData: any, callback: typesRest.RestResultTypeCallback) {
        if (user.id != sessionData.user.id) {
            callback(typesRest.RestResultType.InvalidCall);
        }
        else {
            user.save(function (err) {
                if (err) {
                    callback(typesRest.RestResultType.DatabaseError);
                }
                else {
                    sessionData.user = sdk.user.exportUser(user);
                    callback(typesRest.RestResultType.Ok);
                }
            });
        }
    }

    exportUser(user: modelUser.User): typesRest.RestUser {
        var result: typesRest.RestUser = new typesRest.RestUser();

		validFields.forEach(function (key: string) {
			result[key] = user[key];
		});

		result.id = user.id;
		result.friends = user.friends.map(value => value.toHexString());

        return result;
    }
	
	getIdFromDatabase(value: mongoose.Document): typesRest.RestUserId {
		return new typesRest.RestUserId(value.id);
	}
}
