"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importStar(require("express"));
const users_routers_1 = __importDefault(require("./routes/users.routers"));
const database_services_1 = __importDefault(require("./services/database.services"));
const messages_1 = require("./constants/messages");
(0, dotenv_1.config)({ path: __dirname + '/../.env' });
const app = (0, express_1.default)();
const port = process.env.PORT ?? 4000;
// use middleware to parse json
const jsonParseMiddleware = (0, express_1.json)();
app.use(jsonParseMiddleware);
// Enable CORS for all routes
app.use((0, cors_1.default)());
database_services_1.default
    .connect()
    .then(() => {
    console.log(messages_1.DATABASE_MESSAGE.CONNECT_SUCCESS);
})
    .catch((error) => {
    console.error(messages_1.DATABASE_MESSAGE.CONNECT_FAILED);
    console.error(error);
});
app.get('/', (req, res) => {
    res.send('This is the home page');
});
app.use('/users', users_routers_1.default);
// this is for logging
app.all('*', (req, res, next) => {
    console.log('Time', Date.now());
    console.log(req);
    next();
});
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
});
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
