"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHandler = void 0;
const index_1 = require("../database/index");
const telegraf_1 = require("telegraf");
const bot_1 = require("../bot");
const createAndAddReply = async (ctx, type) => {
    const newMsg = new index_1.message(), userMsg = type == 'sticker' ? ctx.message.reply_to_message.sticker.file_unique_id : ctx.message.reply_to_message.text, reply = ctx.message.sticker ? ctx.message.sticker.file_id : ctx.message.text;
    try {
        newMsg.message = userMsg;
        newMsg.reply = reply;
        await newMsg.save();
    }
    catch (err) {
        console.log(err);
    }
};
const addReply = async (ctx) => {
    let userMsg, type;
    if (ctx.message.reply_to_message.sticker) {
        userMsg = ctx.message.reply_to_message.sticker.file_unique_id;
        type = 'sticker';
    }
    else {
        userMsg = ctx.message.reply_to_message.text;
        type = 'text';
    }
    if (await index_1.message.exists({ message: userMsg })) {
        let replys;
        const savedMsg = await index_1.message.findOne({ message: userMsg });
        if (!savedMsg)
            return; // Este if nunca vai ser usado, é apenas uma forma de fazer o TSC ignorá-lo na hora de transpilar
        replys = savedMsg.reply;
        ctx.message.sticker ? replys.push(ctx.message.sticker.file_id) : replys.push(ctx.message.text);
        try {
            await index_1.message.findOneAndUpdate({ message: userMsg }, { reply: replys });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    else
        createAndAddReply(ctx, type);
};
const answerUser = async (ctx, execute) => {
    const userMsg = ctx.message.sticker ? ctx.message.sticker.file_unique_id : ctx.message.text;
    const opt = {
        reply_to_message_id: ctx.message.message_id
    };
    if (await index_1.message.findOne({ message: userMsg })) {
        const msg = await index_1.message.findOne({ message: userMsg });
        const random = msg === null || msg === void 0 ? void 0 : msg.reply[Math.floor(Math.random() * msg.reply.length)];
        try {
            await execute.replyWithSticker(random, opt);
        }
        catch (err) {
            execute.reply(random, opt);
        }
    }
};
const userIdVerify = (msg) => msg.from ? msg.from.id : 0;
const main = telegraf_1.Composer.on(['text', 'sticker'], async (ctx) => {
    var _a;
    const replyToMsg = ctx.message.reply_to_message ? ctx.message.reply_to_message : false, id = (_a = bot_1.bot.botInfo) === null || _a === void 0 ? void 0 : _a.id, idUser = userIdVerify(replyToMsg);
    if (replyToMsg && idUser != id)
        addReply(ctx);
    if (!replyToMsg || idUser == id)
        answerUser(ctx, ctx);
});
const initHandler = () => {
    bot_1.bot.use(main);
};
exports.initHandler = initHandler;
