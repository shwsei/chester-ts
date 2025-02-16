import { bot } from './bot'
import composer from './handlers/main'
import express from 'express'
import { webhookCallback } from 'grammy'

const server = express()
const PORT = Number(process.env.PORT) || 8080
const domain = String(process.env.APP_NAME)

bot.use(composer)
bot.catch((err) => console.error(err))

server.use(express.json())
server.use('/chester', webhookCallback(bot, 'express'))
server.listen(
  PORT,
  async () =>
    await bot.api.setWebhook(`https://${domain}.herokuapp.com/chester`)
)
