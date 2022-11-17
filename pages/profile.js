import { css } from '@emotion/react';
import Head from 'next/head';

const mainStyles = css`
  margin-top: 30px;
`;

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="" content="" />
      </Head>
      <main>
        <h3>Profile</h3>
        <hr />
        <ul>Go to the library</ul>
        {/*Image with Link*/}
        <ul>Look for categories</ul>
        {/*Image with Link*/}
        <ul>Go to booklists</ul>
        {/*Image with Link*/}
      </main>
    </>
  );
}
