import { model, connect, Document } from 'mongoose'
import { schema } from './models/message'

connect(String(process.env.DB_STRING), { 
	useNewUrlParser: true, useUnifiedTopology: true, 
	useCreateIndex: true, useFindAndModify: false
})

interface IMessage extends Document {
  message: string;
  reply: Array<string>;
}

export const message = model<IMessage>('Reply', schema)
