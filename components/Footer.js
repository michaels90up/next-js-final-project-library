import { css } from '@emotion/react';

const footerStyles = css`
  background-color: #f5b87f;
  padding: 5px;
  height: 45px;
  width: auto;
  position: fixed;
  bottom: 0;
  margin-left: 1150px;
`;

export default function Footer() {
  return <footer css={footerStyles}>Library 2023</footer>;
}
