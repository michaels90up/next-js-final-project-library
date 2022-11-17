import { NextApiRequest, NextApiResponse } from 'next';
import { createBook, getAllBooks } from '../../../database/books';
import { getValidSessionByToken } from '../../../database/sessions';
import { validateTokenWithSecret } from '../../../utils/csrf';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('session is passed', request.cookies.sessionToken);

  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'GET') {
    const books = await getAllBooks();

    return response.status(200).json(books);
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const title = request.body?.title;
    const author = request.body?.author;
    const year = request.body?.year;
    const category = request.body?.category;
    const language = request.body?.language;
    const csrfToken = request.body?.csrfToken;

    if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
      return response.status(401).json({ message: 'csrf_token is not valid' });
    }

    if (!(title && author)) {
      return response
        .status(400)
        .json({ message: 'property title or author missing' });
    }

    // add type checking

    const newBook = await createBook(title, author, year, category, language);

    return response.status(200).json(newBook);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
