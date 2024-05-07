"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = exports.loginValidator = void 0;
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const users_controllers_1 = require("../controllers/users.controllers");
const regex_1 = require("../utils/regex");
const loginValidator = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(httpStatus_1.default.BAD_REQUEST).send({
            message: messages_1.REQUEST_MESSAGE.INVALID_ATTRIBUTE,
        });
    }
    next();
};
exports.loginValidator = loginValidator;
const registerValidator = (req, res, next) => {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
        return res.status(httpStatus_1.default.BAD_REQUEST).send({
            message: messages_1.REQUEST_MESSAGE.INVALID_ATTRIBUTE,
        });
    }
    if (!(0, users_controllers_1.isMatchPasswordAndConfirmPassword)(password, confirmPassword)) {
        return res.status(httpStatus_1.default.BAD_REQUEST).send({
            message: messages_1.USERS_MESSAGE.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH,
        });
    }
    // validate register account
    if (!regex_1.REGEX_USERNAME.test(username)) {
        return res.status(httpStatus_1.default.BAD_REQUEST).send({
            message: messages_1.USERS_MESSAGE.USERNAME_RULE,
        });
    }
    if (!regex_1.REGEX_PASSWORD.test(password)) {
        return res.status(httpStatus_1.default.BAD_REQUEST).send({
            message: messages_1.USERS_MESSAGE.PASSWORD_RULE,
        });
    }
    // if success
    next();
};
exports.registerValidator = registerValidator;
