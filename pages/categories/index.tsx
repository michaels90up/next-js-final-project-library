import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const titleStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const divStylesFirstRow = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const divStylesSecondRow = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px;
  margin-bottom: 100px;
`;

export default function Categories() {
  return (
    <>
      <Head>
        <title>Categories</title>
        <meta name="" content="" />
      </Head>
      <main>
        <div>
          <h2 css={titleStyles}>All Categories</h2>
          <div css={divStylesFirstRow}>
            <div>
              <ul>History</ul>
              <Link href="/">
                <Image src="/history.jpeg" width={180} height={180} alt="" />
              </Link>
            </div>
            <div>
              <ul>Politics</ul>
              <Link href="/">
                <Image src="/politics.jpeg" width={180} height={180} alt="" />
              </Link>
            </div>
            <div>
              <ul>Economy</ul>
              <Link href="/">
                <Image src="/economy.jpeg" width={180} height={180} alt="" />
              </Link>
            </div>
            <div>
              <ul>Law</ul>
              <Link href="/">
                <Image src="/law.jpeg" width={180} height={180} alt="" />
              </Link>
            </div>
            <div>
              <ul>Religion</ul>
              <Link href="/">
                <Image src="/religion.jpeg" width={180} height={180} alt="" />
              </Link>
            </div>
          </div>
          <div css={divStylesSecondRow}>
            <div>
              <ul>Philosophy</ul>
              <Link href="/">
                <Image src="/philosophy.jpeg" width={180} height={180} alt="" />
              </Link>
            </div>
            <div>
              <ul>Comics</ul>
              <Link href="/">
                <Image
                  src="/graphic-novel-comics.jpeg"
                  width={180}
                  height={180}
                  alt=""
                />
              </Link>
            </div>
            <div>
              <ul>Music</ul>
              <Link href="/">
                <Image src="/music.jpeg" width={180} height={180} alt="" />
              </Link>
            </div>
            <div>
              <ul>Fiction</ul>
              <Link href="/">
                <Image src="/fiction.jpeg" width={180} height={180} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
