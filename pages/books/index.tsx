import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment, useState } from 'react';
import { Book, getAllBooksWithLimit } from '../../database/books';
import { getValidSessionByToken } from '../../database/sessions';
import { createTokenFromSecret } from '../../utils/csrf';

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
        <title>Placeholder</title>
        <meta name="description" content="" />
      </Head>

      <h1>Your Library</h1>

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
          value={yearInput}
          onChange={(event) => {
            setYearInput(Number(event.currentTarget.value));
          }}
        />
      </label>
      {/*Change Category to select input with predefined options */}
      <label>
        Category
        <br />
        <input
          value={categoryInput}
          onChange={(event) => {
            setCategoryInput(event.currentTarget.value);
          }}
        />
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
      <button
        onClick={async () => {
          await createBookFromApi();
        }}
      >
        Add Book
      </button>

      <hr />

      {books.map((book) => {
        const isBookOnEdit = onEditId === book.id;

        return (
          <Fragment key={book.id}>
            <input
              value={isBookOnEdit ? titleOnEditInput : book.title}
              disabled={!isBookOnEdit}
              onChange={(event) => {
                setTitleOnEditInput(event.currentTarget.value);
              }}
            />
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

            <button onClick={() => deleteBookFromApiById(book.id)}>X</button>
            {!isBookOnEdit ? (
              <button
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
              </button>
            ) : (
              <button
                onClick={async () => {
                  setOnEditId(undefined);
                  await updateBookFromApiById(book.id);
                }}
              >
                save
              </button>
            )}
            <br />
          </Fragment>
        );
      })}
      {books.length < 11 && (
        <button onClick={() => getBooksFromApi()}>Show more than 10</button>
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the username from the URL
  const token = context.req.cookies.sessionToken;

  console.log(token);

  const session = token && (await getValidSessionByToken(token));

  console.log(session);

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
