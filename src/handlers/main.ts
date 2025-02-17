import { Composer, Context } from 'grammy'
import { scheduler } from 'timers/promises'

import { message as model } from '../database/'

const composer = new Composer()

const createAndAddReply = async (ctx: Context) => {
  const { reply_to_message } = ctx?.message!

  const message =
    reply_to_message?.sticker?.file_unique_id ??
    reply_to_message?.text?.toLowerCase()

  const reply = ctx.message?.sticker?.file_id ?? ctx.message?.text

  if (!message || !reply) return

  const currentMessage = new model({ message, reply })

  return currentMessage.save()
}

const addReply = async (ctx: Context) => {
  const { message } = ctx

  const currentMessage =
    message?.reply_to_message?.sticker?.file_unique_id ??
    message?.reply_to_message?.text?.toLowerCase()

  const exists = await model.exists({ message: currentMessage })

  if (exists)
    return model.findOneAndUpdate(
      { message: currentMessage },
      {
        $push: {
          reply: message?.sticker?.file_id ?? message?.text
        }
      }
    )

  return createAndAddReply(ctx)
}

const answer = async (ctx: Context) => {
  const message =
    ctx.message?.sticker?.file_unique_id ?? ctx.message?.text?.toLowerCase()
  const replies = await model.findOne({ message })

  if (!replies) return

  const options = { reply_to_message_id: ctx.message?.message_id }
  const answerMessage =
    replies.reply[Math.floor(Math.random() * replies.reply.length)]

  const timer = 50 * answerMessage?.length || 6000

  await ctx.api
    .sendChatAction(ctx.chat?.id!, 'typing')
    .catch(() => console.log('error on send chat action.'))

  await scheduler.wait(timer)

  try {
    await ctx.replyWithSticker(answerMessage, options)
  } catch {
    ctx
      .reply(answerMessage, options)
      .catch(() => console.log('unable to reply message.'))
  }
}

composer.on(['message:text', 'message:sticker'], async (ctx) => {
  const isReplied = ctx.message?.reply_to_message ?? false
  const userId = ctx.from?.id

  const { id } = await ctx.api.getMe()

  if (isReplied && userId !== id) await addReply(ctx)
  if (!isReplied || userId === id) await answer(ctx)
})

export default composer
