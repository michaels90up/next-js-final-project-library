import { sql } from './connect';

export type Book = {
  id: number;
  title: string;
  author: string;
  year: number | null;
  category: string | null;
  language: string | null;
};

export async function getAllBooks() {
  const books = await sql<Book[]>`
    SELECT * FROM books
  `;
  return books;
}
export async function getAllBooksWithLimit(limit: number) {
  const books = await sql<Book[]>`
    SELECT
      *
    FROM
      books
    LIMIT ${limit}
  `;
  return books;
}

export async function getBookById(id: number | undefined) {
  if (!id) return undefined;
  const [book] = await sql<Book[]>`
    SELECT
      *
    FROM
      books
    WHERE
      id = ${id}
  `;
  return book;
}

export async function getBookByIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [book] = await sql<Book[]>`
    SELECT
      books.*
    FROM
      books
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
      books.id = ${id}
  `;
  return book;
}

export async function createBook(
  title: string,
  author: string,
  year: number | null,
  category: string | null,
  language: string | null,
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
export async function updateBookById(
  id: number,
  title: string,
  author: string,
  year: number | null,
  category: string | null,
  language: string | null,
) {
  const [book] = await sql<Book[]>`
    UPDATE
      books
    SET
      title = ${title},
      author = ${author},
      year = ${year},
      category = ${category},
      language = ${language}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return book;
}

export async function deleteBookById(id: number) {
  const [book] = await sql<Book[]>`
    DELETE FROM
      books
    WHERE
      id = ${id}
    RETURNING *
  `;
  return book;
}
