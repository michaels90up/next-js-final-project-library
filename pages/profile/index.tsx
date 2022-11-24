import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const mainStyles = css`
  margin-top: 30px;
`;

const divStyles = css`
  display: flex;
  justify-content: left;
`;

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="" content="" />
      </Head>
      <main css={mainStyles}>
        <h3>Profile</h3>
        <hr />
        <div css={divStyles}>
          <ul>Go to the library</ul>
          <Link href="/books">
            <Image src="/library-books.jpg" width={200} height={200} alt="" />
          </Link>
          <ul>Look for categories</ul>
          <Link href="/categories">
            <Image
              src="/library-categories.jpg"
              width={200}
              height={200}
              alt=""
            />
          </Link>
          <ul>Go to booklists</ul>
          <Link href="/booklists">
            <Image
              src="/library-booklists.jpg"
              width={200}
              height={200}
              alt=""
            />
          </Link>
        </div>
      </main>
    </>
  );
}
