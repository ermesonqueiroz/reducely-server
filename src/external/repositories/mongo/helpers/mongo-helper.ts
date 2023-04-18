import mongoose, { Mongoose } from 'mongoose';

export const MongoHelper = {
  client: {} as Mongoose,
  async connect(uri: string) {
    this.client = await mongoose.connect(uri, { dbName: 'reducely' });
  },
  async disconnect() {
    await this.client.disconnect();
  }
};
