// import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

// import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Private Library</title>
        <meta name="description" content="" />
      </Head>
      <main>
        <h2>Create your own library</h2>
        <h3>Your books deserve it!</h3>
        <div>
          <p>
            Create your own profile and use all features of the library like
            adding your books and creating individual booklists.
          </p>
          <button>
            <Link href="/register">Register</Link>
          </button>
          <p>You have already created your profile? So just log in: </p>
          <button>
            <Link href="/login">Log In</Link>
          </button>
        </div>
      </main>
    </>
  );
}
