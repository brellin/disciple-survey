'use client';

import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const [email, setEmail] = useState(useSelector(store => store.email));
  const dispatch = useDispatch();
  useEffect(
    _ => {
      dispatch({ type: 'updateEmail', payload: email });
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
