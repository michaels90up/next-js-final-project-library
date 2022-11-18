// import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { Book, getAllBooks } from '../../database/books';

type Props = {
  books: Book[];
};

export default function Books(props: Props) {
  return (
    <>
      <Head>
        <title>Your Library</title>
        <meta name="description" content="List page of all books" />
      </Head>

      <h1>Books</h1>

      {props.books.map((book) => {
        return (
          <div
            data-test-id={`book-title-${book.title}`}
            key={`book-${book.id}`}
          >
            <h2>
              <Link href={`/books/${book.id}`}>{book.title}</Link>
            </h2>

            <div>Author: {book.author}</div>
            <div>Year: {book.year}</div>
            <div>Category: {book.category}</div>
            <div>Language: {book.language}</div>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const books = await getAllBooks();
  return {
    props: {
      books: books,
    },
  };
}
