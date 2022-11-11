import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const navStyles = css`
  background-color: #f5b87f;
  margin: 20px 10px;
  padding: 5px;
  display: flex;
  height: 90px;
  width: auto;
  justify-content: start;
  > a + a {
    margin-left: 13px;
  }
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          <Image></Image>
        </div>
        <div>
          <Link href="/books">Books</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/booklists">Booklists</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </nav>
    </header>
  );
}
