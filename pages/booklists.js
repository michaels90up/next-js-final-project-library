import { css } from '@emotion/react';
import Head from 'next/head';

const mainStyles = css`
  margin-top: 30px;
`;

export default function Booklists() {
  return (
    <>
      <Head>
        <title>Booklists</title>
        <meta name="" content="" />
      </Head>
      <main css={mainStyles}>
        <h3>Your Booklists:</h3>
        <p>Create a new booklist</p>
      </main>
    </>
  );
}
