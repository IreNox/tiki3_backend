﻿import * as mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
    name: String,
    login_token: String,
    username: { type: String, unique: true },
    password: String,
    password_salt: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
	items: [{ type: String }],
	gems: Number
});

export interface User extends mongoose.Document {
    name: string;
    login_token: string;
    username: string;
    password: string;
    password_salt: string;
    friends: mongoose.Types.ObjectId[];
	items: string[];
    gems: number;
}

export var model = mongoose.model<User>('user', userSchema);
