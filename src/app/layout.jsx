'use client';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Provider, useDispatch } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { INIT_QUESTIONS } from '../lib/actions';
import axios from '../utils/axios';

import { makeStore } from '../lib/store';
import './page.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faRotateLeft);

export const store = makeStore();

export default ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(
    _ => {
      setTheme(
        globalThis.matchMedia && globalThis.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      );
    },
    [globalThis]
  );

  return (
    <Provider store={store}>
      <html lang='en' data-bs-theme={theme}>
        <body>
          <GlobalLayout>{children}</GlobalLayout>
        </body>
      </html>
    </Provider>
  );
};

function GlobalLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(
    _ => {
      (async _ => {
        try {
          const { data } = await axios.get('questions');
          dispatch({ type: INIT_QUESTIONS, payload: data });
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [dispatch]
  );

  return (
    <Container>
      <h1>Disciple App</h1>

      {children}
    </Container>
  );
}
