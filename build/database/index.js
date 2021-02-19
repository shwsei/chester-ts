"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const mongoose_1 = require("mongoose");
const message_1 = require("./models/message");
const env_1 = __importDefault(require("../env"));
mongoose_1.connect(env_1.default.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
exports.message = mongoose_1.model('Reply', message_1.schema);
