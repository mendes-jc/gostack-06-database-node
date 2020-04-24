import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface ImportedTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: 'string';
}

class ImportTransactionsService {
  async execute(
    transactions: Array<ImportedTransaction>,
  ): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const createdTransactions: Array<Transaction> = [];

    for (let i = 0; i < transactions.length; i += 1) {
      const createdTransaction = await createTransaction.execute(
        transactions[i],
      );
      createdTransactions.push(createdTransaction);
    }

    return createdTransactions;
  }
}

export default ImportTransactionsService;
