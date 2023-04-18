import { Schema, model } from 'mongoose';

export const LinkSchema = new Schema({
  code: Schema.Types.String,
  target: Schema.Types.String,
  createdAt: Schema.Types.Date,
  accessCount: Schema.Types.Number
}, {
  collection: 'links'
});

export const Link = model('Link', LinkSchema);
