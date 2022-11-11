import { css, Global } from '@emotion/react';

function MyApp() {
  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          body {
          }
        `}
      />
    </>
  );
}

export default MyApp;
