import {cleanEnv, str} from 'envalid'
import dotenv from 'dotenv'

dotenv.config()

export default cleanEnv(process.env, {
  DB_STRING: str(),
  TELEGRAM_API: str(),
  PORT: str(),
  APP_NAME: str()
})
