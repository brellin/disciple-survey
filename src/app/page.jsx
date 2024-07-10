'use client';

import { useEffect, useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import questions from './question/[page]/questions';
import { INIT_QUESTIONS, UPDATE_EMAIL } from '../lib/actions';
import { ValidationContext } from './layout';

export default function Home() {
  const [email, setEmail] = useState(useSelector(store => store.email));
  const [valid, setValid] = useState(validateEmail(email));
  
  const setInputValid = useContext(ValidationContext);

  const dispatch = useDispatch();

  function validateEmail(string) {
    return /.+@.+\..+/.test(string);
  }

  useEffect(
    _ => {
      dispatch({ type: INIT_QUESTIONS, payload: questions });
    },
    [dispatch]
  );

  useEffect(
    _ => {
      dispatch({ type: UPDATE_EMAIL, payload: email });
    },
    [dispatch, email]
  );

  useEffect(
    _ => {
      setInputValid(valid);
    },
    [setInputValid, valid]
  );

  return (
    <>
      <Form.Label>Email</Form.Label>
      <Form.Control
        type='email'
        placeholder='example@email.com'
        onInput={({ target }) => {
          setEmail(target.value);
          setValid(validateEmail(target.value));
        }}
        value={email}
      />
      <Form.Text muted>This will only be used to send you your results.</Form.Text>
    </>
  );
}
