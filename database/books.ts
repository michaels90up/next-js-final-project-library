import { sql } from './connect';

export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  category: string | null;
  language: string;
  cover_URL: string;
};

export async function createBook(
  title: string,
  author: string,
  year: number,
  category: string | null,
  language: string,
  cover_URL: string,
) {
  const [book] = await sql<Book[]>`
    INSERT INTO books
      (title, author, year, category, language, cover_URL)
    VALUES
      (${title}, ${author}, ${year}, ${category}, ${language}, ${cover_URL})
    RETURNING *
  `;
  return book;
}
