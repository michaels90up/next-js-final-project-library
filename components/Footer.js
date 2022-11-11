import { css } from '@emotion/react';

const footerStyles = css`
  background-color: #f5b87f;
  margin: 20px 10px;
  padding: 5px;
  display: flex;
  justify-content: start;
  > a + a {
    margin-left: 13px;
  }
`;

export default function Footer() {
  return <footer css={footerStyles}>Library 2023</footer>;
}
