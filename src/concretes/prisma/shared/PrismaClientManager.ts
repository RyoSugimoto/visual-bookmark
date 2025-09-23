import { prisma } from '@/lib/prisma';
import type { PrismaClientType as Client } from './PrismaClientType';

export default class PrismaClientManager {
  static DEFAULT_CLIENT: Client = prisma;
  private client = PrismaClientManager.DEFAULT_CLIENT;

  setClient(client: Client) {
    this.client = client;
  }

  getClient() {
    return this.client;
  }

  reset() {
    this.client = PrismaClientManager.DEFAULT_CLIENT;
  }
}
