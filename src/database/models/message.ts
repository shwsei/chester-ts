import {Schema} from 'mongoose'

export const schema = new Schema({
  message: {
    unique: true,
    required: true,
    type: String
  },
  reply: {
    type: Array,
    trim: true
  }
})
