'use client';

import axios from 'axios';
import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FloatingLabel,
  Form
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_TOKEN } from '../../lib/actions';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const email = useSelector(store => store.email);

  const dispatch = useDispatch();
  const { push } = useRouter();

  async function loginAndContinue(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('login', {
        email,
        password
      });
      dispatch({ type: UPDATE_TOKEN, payload: data.token });
      push('/dashboard');
    } catch (err) {
      alert('Incorrect email or password.');
      console.error(err);
    }
  }

  return (
    <Form onSubmit={loginAndContinue}>
      <Card className='mb-2'>
        <CardHeader>
          <Form.Label>Log In</Form.Label>
        </CardHeader>
        <CardBody>
          <FloatingLabel controlId='email-input' label='Email' className='mb-2'>
            <Form.Control type='email' value={email} disabled />
          </FloatingLabel>

          <FloatingLabel controlId='password-input' label='Password'>
            <Form.Control
              type='password'
              onInput={({ target }) => setPassword(target.value)}
              value={password}
            />
          </FloatingLabel>
        </CardBody>
      </Card>

      <div className='d-flex justify-content-between'>
        <Button variant='danger' onClick={_ => push('/')}>
          Back
        </Button>

        <Button variant='success' type='submit'>
          Log In
        </Button>
      </div>
    </Form>
  );
}
