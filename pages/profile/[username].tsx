import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getUserByUsername, User } from '../../database/users';

const divStyles = css`
  display: flex;
  justify-content: space-evenly;
`;

type Props = {
  user?: User;
};

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
        Better luck next time
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Personal Profile</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <h1>Personal Profile</h1>
      <h2>Username: {props.user.username}</h2>
      <div css={divStyles}>
        <div>
          <ul>Go to the library</ul>
          <Link href="/books">
            <Image src="/library-books.jpeg" width={200} height={200} alt="" />
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
          <ul>Go to booklists</ul>
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
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the username from the URL
  const username = context.query.username as string;

  const user = await getUserByUsername(username.toLowerCase());

  if (!user) {
    context.res.statusCode = 404;
    return { props: {} };
  }

  return {
    props: { user },
  };
}
