"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGEX_HASHED_PASSWORD = exports.REGEX_PASSWORD = exports.REGEX_USERNAME = void 0;
exports.REGEX_USERNAME = /^[a-zA-Z0-9]{1,20}$/;
exports.REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
exports.REGEX_HASHED_PASSWORD = /\\$31\\$(\\d\\d?)\\$(.{43})/;
