import { message as model } from '../database/index'
import { Composer, Context } from 'grammy'
import { setTimeout } from 'timers/promises'

const composer = new Composer()
const createAndAddReply = async (ctx: Context) => { 
  const { reply_to_message } = ctx?.message!
  const message = reply_to_message?.sticker?.file_unique_id ?? reply_to_message?.text?.toLowerCase()
  const reply = ctx.message?.sticker?.file_id ?? ctx.message?.text

  if(!message || !reply) return 

  const currentMessage = new model({ message, reply})

  await currentMessage.save()
}

const addReply = async (ctx: Context) => {
  const { message } = ctx
  const currentMessage = message?.reply_to_message?.sticker?.file_unique_id 
    ?? message?.reply_to_message?.text?.toLowerCase()

  const exists = await model.exists({ message: currentMessage })
  
  if(exists)
    return await model.findOneAndUpdate({ message: currentMessage }, {
      $push: {
        reply: message?.sticker?.file_id ?? message?.text
      }
    })
    
  createAndAddReply(ctx)
}

const answer = async (ctx: Context) => {
  const message = ctx.message?.sticker?.file_unique_id ?? ctx.message?.text?.toLowerCase()
  const replies = await model.findOne({ message })

  if(!replies) return
  
  const options = { reply_to_message_id: ctx.message?.message_id }
  const answerMessage = replies.reply[Math.floor(Math.random() * replies.reply.length)]
  const timer = 50 * answerMessage?.length || 6000 
  
  await ctx.api.sendChatAction(ctx.chat?.id!, "typing")
    .catch(() => console.log("Tô sem ADMIR, ajdua eu ae"))

  setTimeout(timer).then(async () => {
    try {
      await ctx.replyWithSticker(answerMessage, options)  
    } catch {
      ctx.reply(answerMessage, options)
        .catch(() => console.log("Mensagem não respondida"))
    }
  }) 
}

composer.on(['message:text', 'message:sticker'], async ctx => {
  const isReplied = ctx.message?.reply_to_message ?? false 
  const { id } = await ctx.api.getMe()
  const userId =  ctx.from?.id

  if(isReplied && userId !== id) addReply(ctx)
  if(!isReplied || userId === id) answer(ctx)

})

export default composer
