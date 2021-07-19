import { Bot } from 'grammy'
import env from './env'

export const bot = new Bot(env.TELEGRAM_API)
