'use client';

import { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function Home() {
  const [email, setEmail] = useState('');
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
