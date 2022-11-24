import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const registerAndLoginStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
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
          <h2>Welcome to Bookwarts!</h2>
          <Image src="/logo.jpeg" width={180} height={120} alt="library logo" />
          <h3>Give your books a digital home!</h3>
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
                Create your own profile and use all features of the library like
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
