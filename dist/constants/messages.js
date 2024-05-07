"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGE = exports.DATABASE_MESSAGE = exports.USERS_MESSAGE = exports.REQUEST_MESSAGE = void 0;
exports.REQUEST_MESSAGE = {
    INVALID_ATTRIBUTE: 'Invalid attribute',
};
exports.USERS_MESSAGE = {
    LOGIN_SUCCESS: 'Login successfully',
    INVALID_USERNAME_OR_PASSWORD: 'Invalid username or password',
    REGISTER_SUCCESS: 'Register successfully',
    ACCOUNT_EXISTS: 'Account already exists',
    PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH: 'Password and Confirm Password are not match',
    USERNAME_RULE: 'Username must from 1 to 20 character and do not contain special character',
    PASSWORD_RULE: 'Password must from 8 to 20 character and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character',
    USER_NOT_FOUND: 'User not found',
    WRONG_USERNAME_OR_PASSWORD: 'Wrong username or password',
};
exports.DATABASE_MESSAGE = {
    CONNECT_SUCCESS: 'Pinged your deployment. You successfully connected to MongoDB!',
    CONNECT_FAILED: 'Failed to connect to the database',
};
exports.ERROR_MESSAGE = {
    INTERNAL_SERVER_ERROR: 'Internal server error',
};
