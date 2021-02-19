import {message as Model} from '../database/index'
import {Composer, Context} from 'telegraf'
import {bot} from '../bot'

const createAndAddReply = async (ctx: any, type: string) => {
  const newMsg = new Model(),
    userMsg = type == 'sticker' ? ctx.message.reply_to_message.sticker.file_unique_id : ctx.message.reply_to_message.text,
    reply = ctx.message.sticker ? ctx.message.sticker.file_id : ctx.message.text

  try {
    newMsg.message = userMsg
    newMsg.reply = reply
    await newMsg.save()
  } catch (err) {
    console.log(err)
  }

}

const addReply = async (ctx: any) => {
  let userMsg, type;

  if (ctx.message.reply_to_message.sticker) {
    userMsg = ctx.message.reply_to_message.sticker.file_unique_id
    type = 'sticker'
  } else {
    userMsg = ctx.message.reply_to_message.text
    type = 'text'
  }

  if (await Model.exists({message: userMsg})) {
    let replys
    const savedMsg = await Model.findOne({message: userMsg})

    if (!savedMsg) return // Este if nunca vai ser usado, é apenas uma forma de fazer o TSC ignorá-lo na hora de transpilar

    replys = savedMsg.reply
    ctx.message.sticker ? replys.push(ctx.message.sticker.file_id) : replys.push(ctx.message.text)

    try {
      await Model.findOneAndUpdate({message: userMsg}, {reply: replys})

    } catch (err) {
      console.log(err.message)
    }
  }

  else createAndAddReply(ctx, type)

}

const answerUser = async (ctx: any, execute: Context) => {
  const userMsg = ctx.message.sticker ? ctx.message.sticker.file_unique_id : ctx.message.text

  const opt = {
    reply_to_message_id: ctx.message.message_id
  }

  if (await Model.findOne({message: userMsg})) {
    const msg = await Model.findOne({message: userMsg})
    const random = msg?.reply[Math.floor(Math.random() * msg.reply.length)]

    try {
      await execute.replyWithSticker(random, opt)
    } catch (err) {
      execute.reply(random, opt)
    }
  }

}

const userIdVerify = (msg: any): number => msg.from ? msg.from.id : 0

const main = Composer.on(['text', 'sticker'], async ctx => {

  const replyToMsg = ctx.message.reply_to_message ? ctx.message.reply_to_message : false,
    id = bot.botInfo?.id,
    idUser = userIdVerify(replyToMsg)

  if (replyToMsg && idUser != id) addReply(ctx)
  if (!replyToMsg || idUser == id) answerUser(ctx, ctx)

})

export const initHandler = (): void => {
  bot.use(main)
}
