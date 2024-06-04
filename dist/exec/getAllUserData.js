"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_services_1 = __importDefault(require("../services/database.services"));
async function getAllData() {
    try {
        const data = await database_services_1.default.getAllAccounts();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}
getAllData().catch((e) => console.log(e));
