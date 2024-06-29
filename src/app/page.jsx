'use client';

import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import questions from './question/[page]/questions';
import { INIT_QUESTIONS, UPDATE_EMAIL } from '../lib/actions';

export default function Home() {
  const [email, setEmail] = useState(useSelector(store => store.email));
  const dispatch = useDispatch();

  useEffect(_ => {
    dispatch({ type: INIT_QUESTIONS, payload: questions });
  }, []);

  useEffect(
    _ => {
      dispatch({ type: UPDATE_EMAIL, payload: email });
    },
    [email]
  );

  return (
    <>
      <Form.Label>Email</Form.Label>
      <Form.Control
        type='email'
        placeholder='example@email.com'
        onInput={({ target }) => setEmail(target.value)}
        value={email}
      />
      <Form.Text className='text-muted'>This will only be used to send you your results.</Form.Text>
    </>
  );
}
