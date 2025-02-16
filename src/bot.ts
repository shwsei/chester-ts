import { Bot } from 'grammy'
import env from './env'

export const bot = new Bot(String(env.TELEGRAM_API))
