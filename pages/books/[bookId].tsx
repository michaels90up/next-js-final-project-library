import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { Book, getBookById } from '../../database/books';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

type Props =
  | {
      book: Book;
    }
  | {
      error: string;
    };

const singleBookStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 100px;
  font-size: 18px;
  gap: 15px;
  background-color: white;
  height: 250px;
  width: 400px;
  border: solid;
  border-color: white;
  box-shadow: 2px 1px 2px 2px grey;
`;

export default function SingleBook(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Book not found</title>
          <meta name="description" content="Book not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/books">books page</Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.book.title}</title>
        <meta
          name="description"
          content={`${props.book.title} from ${props.book.author}`}
        />
      </Head>
      <div css={singleBookStyles}>
        <h2>Title: {props.book.title}</h2>
        <div>
          <div>Author: {props.book.author}</div>
          <div>Year: {props.book.year}</div>
          <div>Category: {props.book.category}</div>
          <div>Language: {props.book.language}</div>
        </div>
        {/* <button onClick={() => deleteBookFromApiById(book.id)}>X</button>*/}
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // Retrieve the animal ID from the URL
  const bookId = parseIntFromContextQuery(context.query.bookId);

  if (typeof bookId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Book not found',
      },
    };
  }

  const foundBook = await getBookById(bookId);

  if (typeof foundBook === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Book not found',
      },
    };
  }

  return {
    props: {
      book: foundBook,
    },
  };
}
