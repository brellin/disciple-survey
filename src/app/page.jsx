'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FloatingLabel,
  Form
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_EMAIL } from '../lib/actions';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState(useSelector(store => store.email));
  const [validated, setValidated] = useState(false);
  const [action, setAction] = useState(1);

  const dispatch = useDispatch();
  const { push } = useRouter();
  const emailElement = useRef();

  const emailIsValid = string => /.+@.+\..+/.test(string);

  function validateAndContinue(e) {
    e.preventDefault();
    if (emailIsValid(email)) {
      push(action ? '/login' : 'survey/question/1');
    }
    setValidated(true);
  }

  useEffect(
    _ => {
      dispatch({ type: UPDATE_EMAIL, payload: email });
    },
    [dispatch, email]
  );

  useEffect(_ => {
    emailElement.current.setCustomValidity(
      emailIsValid(email) ? '' : 'Invalid Email'
    );
  });

  return (
    <Form
      className='d-flex flex-column justify-content-end'
      onSubmit={validateAndContinue}
      validated={validated}
      noValidate
    >
      <Card className='mb-2'>
        <CardHeader>
          <Form.Label>Log In</Form.Label>
        </CardHeader>
        <CardBody>
          <FloatingLabel controlId='email-input' label='Email'>
            <Form.Control
              type='email'
              placeholder='example@email.com'
              ref={emailElement}
              onInput={({ target }) => {
                setEmail(target.value);
                target.setCustomValidity(
                  emailIsValid(email) ? '' : 'Invalid Email'
                );
              }}
              value={email}
            />
            <Form.Control.Feedback type='invalid'>
              Invalid Email
            </Form.Control.Feedback>
          </FloatingLabel>
          <Form.Text muted>
            This will only be used to send you your results.
          </Form.Text>
        </CardBody>
      </Card>

      <div className='d-flex justify-content-end'>
        <Button
          className='me-2'
          variant='success'
          type='submit'
          onClick={_ => setAction(0)}
        >
          Take Survey Only
        </Button>

        <Button variant='success' type='submit' onClick={_ => setAction(1)}>
          Log In
        </Button>
      </div>
    </Form>
  );
}
