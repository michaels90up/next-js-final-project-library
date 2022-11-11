import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  background-color: #f5b87f;
  position: absolute;
  margin: 20px 10px;
  padding: 15px;
  display: flex;
  > a + a {
    margin-left: 13px;
  }
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
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
