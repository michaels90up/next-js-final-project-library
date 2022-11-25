import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getUserByUsername, User } from '../../database/users';

const profileStyles = css`
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
      <h2>Personal Profile</h2>
      <h4>Username: {props.user.username}</h4>
      <div css={profileStyles}>
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
