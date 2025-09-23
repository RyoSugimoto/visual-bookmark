import { prisma } from '@/lib/prisma';
import type ITransactionProvider from '@/services/shared/ITransactionProvider';
import type { TransactionCallback } from '@/services/shared/ITransactionProvider';
import PrismaClientManager from './PrismaClientManager';

export default class PrismaTransactionProvider implements ITransactionProvider {
  async begin(callback: TransactionCallback) {
    const clientManager = new PrismaClientManager();

    await prisma.$transaction(async tx => {
      clientManager.setClient(tx);

      await callback();

      clientManager.reset();
    });
  }
}
