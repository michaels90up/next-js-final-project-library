import { css } from '@emotion/react';
import Head from 'next/head';

const mainStyles = css`
  margin-top: 30px;
`;

export default function Categories() {
  return (
    <>
      <Head>
        <title>Categories</title>
        <meta name="" content="" />
      </Head>
      <main css={mainStyles}>
        <h3>All Categories:</h3>
      </main>
    </>
  );
}
