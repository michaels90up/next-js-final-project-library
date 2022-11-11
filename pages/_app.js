import { css, Global } from '@emotion/react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
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
            font-family: 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif;
            margin: 0;
          }
        `}
      />

      <Header />

      <Component {...pageProps} />

      <Footer />
    </>
  );
}

export default MyApp;
