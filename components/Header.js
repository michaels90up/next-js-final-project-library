import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const navStyles = css`
  background-color: #f5b87f;
  padding: 5px;
  display: flex;
  height: 80px;
  width: auto;
  > a + a {
    margin-left: 20px;
  }
  > div {
    display: flex;
    justify-content: start;
    align-items: end;
    gap: 30px;
  }
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          {/*  <Image
        src="/logo.jpeg"
        width="40"
        height="40"
        alt=""
      />*/}
        </div>
        <div>
          <Link href="/">Home</Link>
          <Link href="/books">Books</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/booklists">Booklists</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </nav>
    </header>
  );
}
