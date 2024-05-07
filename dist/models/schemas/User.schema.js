"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongodb_1 = require("mongodb");
class User {
    constructor(user) {
        const date = new Date();
        this._id = user._id ?? new mongodb_1.ObjectId();
        this.username = user.username;
        this.password = user.password;
        this.score = user.score;
        this.created = user.created ?? date;
        this.salt = user.salt;
    }
    get account() {
        return {
            username: this.username,
            password: this.password,
        };
    }
}
exports.User = User;
