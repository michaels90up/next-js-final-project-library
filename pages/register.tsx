import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { RegisterResponseBody } from './api/register';

const registerInputStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 100px;
  font-size: 18px;
  gap: 15px;
  background-color: white;
  height: 250px;
  width: 400px;
  border: solid;
  border-color: white;
  box-shadow: 2px 1px 2px 2px grey;
`;

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return console.log(registerResponseBody.errors);
    }

    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/profile/${username}`);
  }

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register new users" />
      </Head>
      <div css={registerInputStyles}>
        <h2>Register</h2>
        {errors.map((error) => {
          return (
            <p
              css={css`
                background-color: red;
                color: white;
                padding: 5px;
              `}
              key={error.message}
            >
              ERROR: {error.message}
            </p>
          );
        })}
        <div>
          <label>
            Username
            <input
              value={username}
              onChange={(event) => {
                setUsername(event.currentTarget.value.toLowerCase());
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Password{' '}
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>
        </div>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={async () => {
            await registerHandler();
          }}
        >
          Register
        </Button>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
