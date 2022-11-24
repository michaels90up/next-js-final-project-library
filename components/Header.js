import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  background-color: #f5b87f;
  padding: 5px;
  display: flex;
  justify-content: start;
  height: 80px;
  width: auto;

  > div {
    display: flex;
    align-items: end;
    gap: 20px;
    font-size: 20px;

    a {
      :hover {
        color: white;
      }
    }
  }
`;

const logoutStyles = css`
  margin-left: 670px;
  gap: 30px;
`;

function Anchor({ children, ...restProps }) {
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          <Image
            style={{ textDecoration: 'none' }}
            src="/logo.jpg"
            width={120}
            height={70}
            alt="library logo"
          />
          <Link href="/">Home</Link>
          <Link href="/books">Books</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/booklists">Booklists</Link>
          <div css={logoutStyles}>
            {/* {props.user && props.user.username} */}
            <Link href="/profile">Profile</Link>
          </div>

          {props.user ? (
            <Anchor
              css={css`
                margin-left: 0px;
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
