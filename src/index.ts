import { bot } from './bot'
import composer from './handlers/main'
import express from 'express'
import { webhookCallback } from 'grammy'

import env from './env'

const server = express()
const PORT = env.PORT
const domain = env.APP_NAME

bot.use(composer)
bot.catch((err) => console.error(err))

server.use(express.json())
server.use('/chester', webhookCallback(bot, 'express'))
server.listen(
  PORT,
  async () =>
    await bot.api.setWebhook(`https://${domain}.herokuapp.com/chester`)
)
