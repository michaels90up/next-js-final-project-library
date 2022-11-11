import { css } from '@emotion/react';
import Head from 'next/head';

const mainStyles = css`
  margin-top: 30px;
`;

const addBookStyles = css`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 400px;
`;

export default function Books() {
  return (
    <>
      <Head>
        <title>Books</title>
        <meta name="" content="" />
      </Head>
      <main css={mainStyles}>
        {/*<h3>Add your books to the library</h3>*/}
        <form>
          <fieldset css={addBookStyles}>
            <legend>Add your book to the library</legend>
            <label>Title: </label>
            <input />
            <label>Author: </label>
            <input />
            <label>Year: </label>
            <input />
            <label>Language: </label>
            <input />
            <label for="category-select">Choose a category:</label>
            <select name="categories" id="">
              <option value="">No option chosen</option>
              <option value="novel">Novel</option>
              <option value="history">History</option>
              <option value="arts">Arts</option>
              <option value="religion">Religion</option>
            </select>
            <br />
            {/*button styling missing */}
            <button>Add + </button>
            {/*upload possibility for book cover! */}
          </fieldset>
        </form>
        {/*<form>
          <fieldset>
            <legend>Search for books</legend>
          </fieldset>
  </form>*/}
      </main>
    </>
  );
}
