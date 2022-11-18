import { sql } from './connect';

export type Category = {
  id: number;
  name: string;
};

export async function getAllCategories() {
  const categories = await sql<Category[]>`
    SELECT * FROM categories
  `;
  return categories;
}
