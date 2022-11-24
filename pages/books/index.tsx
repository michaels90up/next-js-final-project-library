import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Book, getAllBooksWithLimit } from '../../database/books';
import { getValidSessionByToken } from '../../database/sessions';
import { createTokenFromSecret } from '../../utils/csrf';

const divStyles = css`
  display: flex;
  gap: 2.5px;
`;

const fragmentStyles = css`
  display: flex;
  margin: 10px;
`;

const titleStyles = css`
  display: flex;
  margin: 0px;
`;

type Props =
  | {
      errors: { message: string }[];
      csrfToken: undefined;
      books: undefined;
    }
  | { csrfToken: string; books: Book[] };

export default function BooksAdmin(props: Props) {
  const [books, setBooks] = useState(props.books || []);
  const [titleInput, setTitleInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [yearInput, setYearInput] = useState<number>();
  const [categoryInput, setCategoryInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');

  const [titleOnEditInput, setTitleOnEditInput] = useState('');
  const [authorOnEditInput, setAuthorOnEditInput] = useState('');
  const [yearOnEditInput, setYearOnEditInput] = useState<number>();
  const [categoryOnEditInput, setCategoryOnEditInput] = useState('');
  const [languageOnEditInput, setLanguageOnEditInput] = useState('');
  const [onEditId, setOnEditId] = useState<number | undefined>();

  if ('errors' in props) {
    return (
      <div>
        {props.errors.map((error) => {
          return <div key={error.message}>{error.message}</div>;
        })}
      </div>
    );
  }

  async function getBooksFromApi() {
    const response = await fetch('/api/books');
    const booksFromApi = await response.json();

    setBooks(booksFromApi);
  }

  async function createBookFromApi() {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: titleInput,
        author: authorInput,
        year: yearInput,
        category: categoryInput,
        language: languageInput,
        csrfToken: props.csrfToken,
      }),
    });
    const bookFromApi = (await response.json()) as Book;

    // TODO handle the error when animal from api is undefined
    // you can check if animalFromApi contains an error and display the error in the front end

    const newState = [...books, bookFromApi];

    setBooks(newState);
  }

  async function deleteBookFromApiById(id: number) {
    const response = await fetch(`/api/books/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ csrfToken: props.csrfToken }),
    });
    const deletedBook = (await response.json()) as Book;

    const filteredBooks = books.filter((book) => {
      return book.id !== deletedBook.id;
    });

    setBooks(filteredBooks);
  }

  async function updateBookFromApiById(id: number) {
    const response = await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: titleOnEditInput,
        author: authorOnEditInput,
        year: yearOnEditInput,
        category: categoryOnEditInput,
        language: languageOnEditInput,
        csrfToken: props.csrfToken,
      }),
    });
    const updatedBookFromApi = (await response.json()) as Book;

    // TODO handle the error when book from api is undefined
    // you can check if bookFromApi contains an error and display the error in the front end

    const newState = books.map((book) => {
      if (book.id === updatedBookFromApi.id) {
        return updatedBookFromApi;
      } else {
        return book;
      }
    });

    setBooks(newState);
  }

  return (
    <>
      <Head>
        <title>Books</title>
        <meta name="description" content="" />
      </Head>

      <h2>Your Library</h2>
      <div css={divStyles}>
        <label>
          Title
          <br />
          <input
            value={titleInput}
            onChange={(event) => {
              setTitleInput(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          Author
          <br />
          <input
            value={authorInput}
            onChange={(event) => {
              setAuthorInput(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          Year
          <br />
          <input
            type="number"
            value={!yearInput && yearInput !== 0 ? '' : yearInput}
            min={0}
            onChange={(event) => {
              /* if (!event.currentTarget) return;*/
              setYearInput(Number(event.currentTarget.value));
            }}
          />
        </label>
        <label>
          Category
          <br />
          <select
            value={categoryInput}
            onChange={(event) => {
              setCategoryInput(event.currentTarget.value);
            }}
          >
            <option value="">--No category chosen--</option>
            <option value="History">History</option>
            <option value="Politics">Politics</option>
            <option value="Law">Law</option>
            <option value="Religion">Religion</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Graphic Novel/Comics">Graphic Novel/Comics</option>
            <option value="Music">Music</option>
            <option value="Fiction">Fiction</option>
          </select>
        </label>
        <label>
          Language
          <br />
          <input
            value={languageInput}
            onChange={(event) => {
              setLanguageInput(event.currentTarget.value);
            }}
          />
        </label>
      </div>
      <br />
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={async () => {
          await createBookFromApi();
          setTitleInput('');
          setAuthorInput('');
          setYearInput(undefined);
          setCategoryInput('');
          setLanguageInput('');
        }}
      >
        Add Book
      </Button>
      <br />
      <br />

      {books.map((book) => {
        const isBookOnEdit = onEditId === book.id;

        return (
          <Fragment key={book.id}>
            <div css={fragmentStyles}>
              <Link css={titleStyles} href={`/books/${book.id}`}>
                <input
                  value={isBookOnEdit ? titleOnEditInput : book.title}
                  disabled={!isBookOnEdit}
                  onChange={(event) => {
                    setTitleOnEditInput(event.currentTarget.value);
                  }}
                />
              </Link>

              <input
                value={isBookOnEdit ? authorOnEditInput : book.author}
                disabled={!isBookOnEdit}
                onChange={(event) => {
                  setAuthorOnEditInput(event.currentTarget.value);
                }}
              />

              <input
                value={isBookOnEdit ? yearOnEditInput : book.year || ''}
                disabled={!isBookOnEdit}
                onChange={(event) => {
                  setYearOnEditInput(Number(event.currentTarget.value));
                }}
              />

              <input
                value={isBookOnEdit ? categoryOnEditInput : book.category || ''}
                disabled={!isBookOnEdit}
                onChange={(event) => {
                  setCategoryOnEditInput(event.currentTarget.value);
                }}
              />

              <input
                value={isBookOnEdit ? languageOnEditInput : book.language || ''}
                disabled={!isBookOnEdit}
                onChange={(event) => {
                  setLanguageOnEditInput(event.currentTarget.value);
                }}
              />

              {!isBookOnEdit ? (
                <Button
                  variant="outlined"
                  href="#outlined-buttons"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    setOnEditId(book.id);
                    setTitleOnEditInput(book.title);
                    setAuthorOnEditInput(book.author);
                    setYearOnEditInput(Number(book.year));
                    setCategoryOnEditInput(book.category || '');
                    setLanguageOnEditInput(book.language || '');
                  }}
                >
                  edit
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  href="#outlined-buttons"
                  color="secondary"
                  size="small"
                  onClick={async () => {
                    setOnEditId(undefined);
                    await updateBookFromApiById(book.id);
                  }}
                >
                  save
                </Button>
              )}
              <Button
                variant="outlined"
                href="#outlined-buttons"
                color="error"
                size="small"
                onClick={() => deleteBookFromApiById(book.id)}
              >
                X
              </Button>
              <br />
            </div>
          </Fragment>
        );
      })}
      <br />
      {books.length < 11 && (
        <Button
          variant="outlined"
          href="#outlined-buttons"
          color="secondary"
          size="small"
          onClick={() => getBooksFromApi()}
        >
          Show more than 10
        </Button>
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  // console.log(token);

  const session = token && (await getValidSessionByToken(token));

  // console.log(session);

  if (!session) {
    context.res.statusCode = 401;
    return { props: { errors: [{ message: 'User not authorized' }] } };
  }

  const csrfToken = await createTokenFromSecret(session.csrfSecret);

  const initialBooksList = await getAllBooksWithLimit(10);

  return {
    props: {
      csrfToken,
      books: initialBooksList,
    },
  };
}
