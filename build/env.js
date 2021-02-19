"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = envalid_1.cleanEnv(process.env, {
    DB_STRING: envalid_1.str(),
    TELEGRAM_API: envalid_1.str(),
    PORT: envalid_1.str(),
    APP_NAME: envalid_1.str()
});
