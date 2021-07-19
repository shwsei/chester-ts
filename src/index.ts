import express from 'express'
import { webhookCallback  } from 'grammy'
import { bot } from './bot'
import composer from './handlers/main'
import env from './env'

const server = express()
const PORT = env.PORT || 8080

bot.use(composer)
server.use(express.json())
server.use(webhookCallback(bot, "express"))

bot.catch(err => console.error(err))
server.listen(PORT, () => console.log("Servidor web criado, bot online"))

