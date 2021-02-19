"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const telegraf_1 = require("telegraf");
const env_1 = __importDefault(require("./env"));
exports.bot = new telegraf_1.Telegraf(env_1.default.TELEGRAM_API);
