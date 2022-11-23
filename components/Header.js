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
    margin-left: 40px;
  }
  > div {
    display: flex;
    justify-content: start;
    align-items: end;
    gap: 30px;
  }
`;

function Anchor({ children, ...restProps }) {
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          <Image src="/logo.jpg" width={120} height={70} alt="library logo" />
          <Link href="/">Home</Link>
          <Link href="/books">Books</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/booklists">Booklists</Link>
          <Link href="/profile">Profile</Link>
          {/* {props.user && props.user.username} */}
          {props.user ? (
            <Anchor
              css={css`
                margin-left: 10px;
              `}
              href="/logout"
            >
              Logout
            </Anchor>
          ) : (
            <div />
          )}

          {/* <Link href="/logout">Logout</Link> */}
        </div>
      </nav>
    </header>
  );
}
