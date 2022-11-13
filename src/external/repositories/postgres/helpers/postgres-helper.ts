import { Client } from 'pg';

export const PostgresHelper = {
  client: {} as Client,
  async connect(uri: string) {
    this.client = new Client({ connectionString: uri });
    await this.client.connect();
  },
  async disconnect() {
    await this.client.end();
  }
};