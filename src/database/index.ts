import { model, connect, Document } from 'mongoose'
import { schema } from './models/message'

import env from '../env'

connect(env.DB_STRING)

interface IMessage extends Document {
  message: string
  reply: Array<string>
}

export const message = model<IMessage>('Reply', schema)
