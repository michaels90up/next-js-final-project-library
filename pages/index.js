import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import Head from 'next/head';
import Link from 'next/link';

const mainStyles = css`
  justify-items: center;
`;

const registerAndLoginStyles = css`
  display: flex;
  flex-direction: column;

  > div + div {
    margin-top: 20px;
  }
`;

// import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Private Library</title>
        <meta name="description" content="" />
      </Head>
      <main css={mainStyles}>
        <h2>Create your own library</h2>
        <h3>Your books deserve it!</h3>
        <div css={registerAndLoginStyles}>
          <div>
            <p>
              Create your own profile and use all features of the library like{' '}
              <br />
              adding your books and creating individual booklists.
            </p>
            <Button
              variant="outlined"
              href="#outlined-buttons"
              color="secondary"
            >
              <Link href="/register">Register</Link>
            </Button>
          </div>
          <div>
            <p>You have already created your profile? So just log in: </p>
            <Button
              variant="outlined"
              href="#outlined-buttons"
              color="secondary"
            >
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
