import { sql } from './connect';

export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  category: string | null;
  language: string;
};

export async function createBook(
  title: string,
  author: string,
  year: number,
  category: string | null,
  language: string,
) {
  const [book] = await sql<Book[]>`
    INSERT INTO books
      (title, author, year, category, language)
    VALUES
      (${title}, ${author}, ${year}, ${category}, ${language})
    RETURNING *
  `;
  return book;
}
