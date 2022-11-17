// import { css } from '@emotion/react';
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

export default function SingleBook(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Book not found</title>
          <meta name="description" content="Book not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/books">animals page</Link>
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
      <h2>{props.book.title}</h2>
      {/* <Image
        src={`/${props.animal.id}-${props.animal.firstName.toLowerCase()}.jpeg`}
        alt=""
        width="400"
        height="400"
  />*/}
      <div>Author: {props.book.author}</div>
      <div>Year: {props.book.year}</div>
      <div>Category: {props.book.category}</div>
      <div>Language: {props.book.language}</div>
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
