'use client';

import axios from '../../utils/axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Login() {
  const [password, setPassword] = useState('');
  const email = useSelector(store => store.email);

  return (
    <>
      <Form.Label>Email</Form.Label>
      <Form.Control value={email} disabled />
      <Form.Label>Password</Form.Label>
      <Form.Control
        type='password'
        onInput={({ target }) => setPassword(target.value)}
        value={password}
      />
      <Button
        className='btn-success'
        onClick={async _ => {
          const { data } = await axios.post('login', {
            email,
            password
          });
          console.log(data);
        }}
      >
        Submit
      </Button>
    </>
  );
}
