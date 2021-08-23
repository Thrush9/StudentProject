/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  limit: {
    type: Number
  },
  students: {
    type: [Schema.Types.ObjectId],
  }
})