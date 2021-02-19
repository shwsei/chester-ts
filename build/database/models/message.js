"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    message: {
        unique: true,
        required: true,
        type: String
    },
    reply: {
        type: Array,
        trim: true
    }
});
