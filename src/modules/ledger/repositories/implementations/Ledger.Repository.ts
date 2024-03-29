import { prisma } from '@/shared/infra/prisma';
import { LedgerDto } from '../../dtos/LedgerDto';
import { ILedgerRepository } from '../ILedger.Repository';

class LedgerRepository implements ILedgerRepository {
  async create({
    type,
    title,
    amount,
    userId,
    category,
  }: LedgerDto): Promise<LedgerDto> {
    const ledger = await prisma.ledger.create({
      data: {
        type,
        title,
        amount,
        userId,
        category,
      },
    });
    return ledger;
  }

  async getAll(id: string, page: number, limit: number): Promise<LedgerDto[]> {
    const ledgers = prisma.ledger.findMany({
      skip: (page - 1) * 10,
      take: limit,
      where: { userId: id },
    });
    return ledgers;
  }
}

export { LedgerRepository };
