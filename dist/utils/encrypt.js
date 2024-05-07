"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = exports.generateSalt = void 0;
const crypto_1 = require("crypto");
function generateSalt() {
    return (0, crypto_1.randomBytes)(16).toString('hex');
}
exports.generateSalt = generateSalt;
function generateHash(password, salt) {
    return (0, crypto_1.pbkdf2Sync)(password, salt, 1, 32, 'sha512').toString('hex');
}
exports.generateHash = generateHash;
