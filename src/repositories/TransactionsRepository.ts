import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const balance = transactions.reduce(
      (currentBalance: Balance, transaction) => {
        const { total, income, outcome } = currentBalance;
        const { type, value } = transaction;
        if (type === 'income') {
          return {
            outcome,
            income: income + value,
            total: total + value,
          };
        }
        return {
          income,
          outcome: outcome + value,
          total: total - value,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }
}

export default TransactionsRepository;
