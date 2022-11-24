import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import Head from 'next/head';
import Link from 'next/link';

const registerAndLoginStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Private Library</title>
        <meta name="description" content="" />
      </Head>
      <main>
        <div css={registerAndLoginStyles}>
          <h1>Create your own library</h1>
          <h3>Your books deserve it!</h3>
          <div>
            <div>
              <p>You have already created your profile? So just log in: </p>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: '#82AE50',
                  borderColor: '#82AE50',
                }}
              >
                <Link href="/login">Log In</Link>
              </Button>
            </div>
            <br />
            <div>
              <p>
                Create your own profile and use all features of the library like{' '}
                <br />
                adding your books and creating individual booklists.
              </p>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: '#BEA6A1',
                  borderColor: '#BEA6A1',
                }}
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
