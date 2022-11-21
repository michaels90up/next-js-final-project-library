import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '../../database/users';

const mainStyles = css`
  margin-top: 30px;
`;

const divStyles = css`
  display: flex;
  justify-content: left;
`;

type Props = {
  user: User;
};

export default function Profile(props: Props) {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="" content="" />
      </Head>
      <main css={mainStyles}>
        <h3>Profile</h3>
        {/*<Link href={`/profile/${props.user.username}`}>Personal Information</Link>*/}
        <hr />
        <div css={divStyles}>
          <ul>Go to the library</ul>
          <Link href="/books">
            <Image src="/logo.jpg" width={200} height={200} alt="" />
          </Link>
          <ul>Look for categories</ul>
          <Link href="/categories">
            <Image src="/logo.jpg" width={200} height={200} alt="" />
          </Link>
          <ul>Go to booklists</ul>
          <Link href="/booklists">
            <Image src="/logo.jpg" width={200} height={200} alt="" />
          </Link>
        </div>
      </main>
    </>
  );
}
