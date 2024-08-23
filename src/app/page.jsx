'use client';

import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_EMAIL } from '../lib/actions';

export default function Home() {
  const [email, setEmail] = useState(useSelector(store => store.email));

  const dispatch = useDispatch();

  function validateEmail(string) {
    return /.+@.+\..+/.test(string);
  }

  useEffect(
    _ => {
      dispatch({ type: UPDATE_EMAIL, payload: email });
    },
    [dispatch, email]
  );

  return (
    <>
      <Form.Label>Email</Form.Label>
      <Form.Control
        type='email'
        placeholder='example@email.com'
        onInput={({ target }) => {
          setEmail(target.value);
        }}
        value={email}
      />
      <Form.Text muted>This will only be used to send you your results.</Form.Text>
    </>
  );
}
