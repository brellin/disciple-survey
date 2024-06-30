'use client';

import { Button, Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import './page.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from './question/[page]/questions';
import { Provider, useDispatch } from 'react-redux';
import { makeStore } from '../lib/store';
import { useEffect } from 'react';

library.add(faRotateLeft);

export const store = makeStore();

if (globalThis.addEventListener)
  globalThis.addEventListener('load', _ => {
    document.body.dataset.bsTheme =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  });

export default ({ children }) => (
  <Provider store={store}>
    <html lang='en'>
      <body>
        <RootLayout {...{ children }} />
      </body>
    </html>
  </Provider>
);

function RootLayout({ children }) {
  const { push } = useRouter();
  const { page } = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(
    _ => {
      dispatch({ type: 'initquestions', payload: questions });
    },
    [dispatch]
  );

  return (
    <Container>
      <h1>Disciple Survey</h1>

      <Form>{children}</Form>

      <span className='w-100 d-flex justify-content-around fixed-bottom py-2'>
        <Button
          className='btn-danger'
          disabled={!page}
          onClick={_ => push(page > 1 ? `/question/${parseInt(page) - 1}` : '/')}
        >
          <FontAwesomeIcon icon='rotate-left' />
          Back
        </Button>
        <Button
          disabled={page && parseInt(page) === questions.length}
          onClick={_ => push(`/question/${pathname === '/' ? 1 : parseInt(page) + 1}`)}
        >
          Next
        </Button>
      </span>
    </Container>
  );
}
