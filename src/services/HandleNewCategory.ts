import { getRepository } from 'typeorm';
import Category from '../models/Category';

export default class HandleNewCategory {
  public async execute(title: string): Promise<string> {
    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne({
      title,
    });

    if (category) {
      return category.id;
    }

    const newCategory = categoriesRepository.create({
      title,
    });

    await categoriesRepository.save(newCategory);

    return newCategory.id;
  }
}
