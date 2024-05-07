"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongodb_1 = require("mongodb");
const User_schema_1 = require("../models/schemas/User.schema");
(0, dotenv_1.config)({ path: __dirname + '/../../.env' });
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@snake-game.t2nmru9.mongodb.net/?retryWrites=true&w=majority&appName=Snake-Game`;
const dbCollection = process.env.DB_COLLECTION;
class DatabaseServices {
    constructor() {
        this.client = new mongodb_1.MongoClient(uri);
        this.db = this.client.db(process.env.DB_NAME);
    }
    async connect() {
        try {
            await this.db.command({ ping: 1 });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createAccount(username, password) {
        try {
            const account = await this.db.collection(dbCollection).insertOne({ username, password });
            return account;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAccount(username) {
        try {
            const accountDocument = (await this.db
                .collection(dbCollection)
                .findOne({ username }));
            if (accountDocument) {
                const account = new User_schema_1.User(accountDocument);
                return account;
            }
            return null;
        }
        catch (error) {
            console.log(error);
        }
    }
    async findUserByUsername(username) {
        try {
            const accountDocument = (await this.db
                .collection(dbCollection)
                .findOne({ username }));
            if (accountDocument) {
                return new User_schema_1.User(accountDocument);
            }
        }
        catch (error) {
            console.log(error);
        }
        return null;
    }
    async login(account) {
        try {
            const { username, password } = account;
            const accountDocument = (await this.db
                .collection(dbCollection)
                .findOne({ username, password }));
            if (accountDocument) {
                return true;
            }
        }
        catch (error) {
            console.log(error);
        }
        return false;
    }
    async register(account) {
        try {
            const { username, password, salt } = account;
            // Check if the account already exists
            const existingAccount = await this.db.collection(dbCollection).findOne({ username });
            if (existingAccount) {
                throw new Error('Account already exists');
            }
            // If the account does not exist, insert it into the database
            const insertResult = await this.db
                .collection(dbCollection)
                .insertOne({ username, password, salt });
            // Retrieve the inserted document using the insertedId
            const accountDocument = await this.db
                .collection(dbCollection)
                .findOne({ _id: insertResult.insertedId });
            if (accountDocument) {
                return new User_schema_1.User(accountDocument);
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getAllAccounts() {
        try {
            return this.db.collection(dbCollection).find().toArray();
        }
        catch (error) {
            console.log(error);
        }
    }
}
const databaseServices = new DatabaseServices();
exports.default = databaseServices;
