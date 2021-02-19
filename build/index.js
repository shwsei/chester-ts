"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./handlers/main");
const bot_1 = require("./bot");
const env_1 = __importDefault(require("./env"));
(async () => {
    var _a;
    main_1.initHandler();
    bot_1.bot.catch(err => console.log('Ocorreu um erro!', err));
    await bot_1.bot.launch({
        webhook: {
            domain: `${env_1.default.APP_NAME}.herokuapp.com`,
            port: Number(env_1.default.PORT)
        }
    });
    console.log(`@${(_a = bot_1.bot.botInfo) === null || _a === void 0 ? void 0 : _a.username} está sendo executado!`);
})();
