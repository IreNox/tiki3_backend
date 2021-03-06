"use strict";
const mongoose = require('mongoose');
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
exports.model = mongoose.model('user', userSchema);
//# sourceMappingURL=model.user.js.map