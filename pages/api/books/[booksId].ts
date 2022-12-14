import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteBookById,
  getBookById,
  updateBookById,
} from '../../../database/books';
import { getValidSessionByToken } from '../../../database/sessions';
import { validateTokenWithSecret } from '../../../utils/csrf';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  const bookId = Number(request.query.booksId);
  // console.log(request.query);
  if (!bookId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  if (request.method === 'GET') {
    const book = await getBookById(bookId);

    if (!book) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    return response.status(200).json(book);
  }

  // console.log(request.body);
  const csrfToken = request.body?.csrfToken;
  // console.log(csrfToken);

  if (!validateTokenWithSecret(session.csrfSecret, csrfToken)) {
    return response.status(401).json({ message: 'csrf_token is not valid' });
  }

  if (request.method === 'PUT') {
    const title = request.body?.title;
    const author = request.body?.author;
    const year = request.body?.year;
    const category = request.body?.category;
    const language = request.body?.language;

    if (!(title && author)) {
      return response
        .status(400)
        .json({ message: 'property title or author missing' });
    }

    // TODO: add type checking to the api

    const newBook = await updateBookById(
      bookId,
      title,
      author,
      year,
      category,
      language,
    );

    if (!newBook) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    // response with the new created book
    return response.status(200).json(newBook);
  }

  if (request.method === 'DELETE') {
    const deletedBook = await deleteBookById(bookId);

    if (!deletedBook) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    return response.status(200).json(deletedBook);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
