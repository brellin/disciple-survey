'use client'

import { Col, Form, FormCheck } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import questions from './questions';
import { store } from '../../layout';

export default function page({ params: { page } }) {
  console.log('store', store.getState())
  return <Page {...questions[page - 1]} />;
}

const Page = ({ title, type, selections }) => (
  <Col>
    <Form.Label>{title}</Form.Label>
    {selections.map(({ text }) => {
      let Component;
      switch (type) {
        case 'radio':
          Component = RadioQuestion;
          break;
        default:
          alert('Something went wrong.');
      }
      return <Component text={text} key={text} />;
    })}
  </Col>
);

function RadioQuestion({ text }) {
  return (
    <FormCheck>
      <FormCheckInput className='me-2' />
      <FormCheckLabel>{text}</FormCheckLabel>
    </FormCheck>
  );
}
