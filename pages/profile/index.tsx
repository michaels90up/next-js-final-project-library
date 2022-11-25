import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const mainStyles = css`
  margin-top: 30px;
`;

const divStyles = css`
  display: flex;
  justify-content: space-evenly;
`;

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="" content="" />
      </Head>
      <main>
        <div css={mainStyles}>
          <h3>Profile</h3>
          <div css={divStyles}>
            <div>
              <ul>Visit the library</ul>
              <Link href="/books">
                <Image
                  src="/library-books.jpeg"
                  width={200}
                  height={200}
                  alt=""
                />
              </Link>
            </div>
            <div>
              <ul>See all categories</ul>
              <Link href="/categories">
                <Image
                  src="/library-categories.jpeg"
                  width={200}
                  height={200}
                  alt=""
                />
              </Link>
            </div>
            <div>
              <ul>Create booklists</ul>
              <Link href="/booklists">
                <Image
                  src="/library-booklists.jpeg"
                  width={200}
                  height={200}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
