import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

import HandleNewCategory from './HandleNewCategory';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  category: string;
  value: number;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    category,
    value,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw new AppError('Invalid balance', 400);
    }

    const handleNewCategory = new HandleNewCategory();

    const categoryId = await handleNewCategory.execute(category);

    const transaction = transactionsRepository.create({
      type,
      value,
      title,
      category_id: categoryId,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
