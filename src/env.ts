import { cleanEnv, str, url } from 'envalid'
import { config } from 'dotenv'

import path from 'path'

const nodeEnv = process.env.NODE_ENV && process.env.NODE_ENV.trim()
const environment = `.env.${nodeEnv}`

config({
  path: path.resolve(process.cwd(), environment)
})

export default cleanEnv(process.env, {
  DB_STRING: url(),
  NODE_ENV: str({ choices: ['development', 'production'] }),
  TELEGRAM_API: str()
})
