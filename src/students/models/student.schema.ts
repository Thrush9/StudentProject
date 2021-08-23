/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  rollId: {
    type: Number,
    unique: true,
    required: true
  }
})