'use client';

import { Col, Form, FormCheck } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import questions from './questions';
import { store } from '../../layout';

export default function page({ params: { page } }) {
  console.log('store', store.getState());
  return <Page {...{ ...questions[page - 1], page }} />;
}

const Page = ({ title, type, selections, page }) => (
  <Col>
    <Form.Label>{title}</Form.Label>
    {selections.map(({ text }) => {
      let Component;
      switch (type) {
        case 'multiple':
          Component = MultipleCheck;
          break;
        case 'requirement':
        case 'radio':
          Component = RadioQuestion;
          break;
        default:
          alert('Something went wrong.');
      }
      return <Component {...{ page, text }} key={text} />;
    })}
  </Col>
);

function RadioQuestion({ text, page }) {
  return (
    <FormCheck>
      <FormCheckInput className='me-2' type='radio' name={page} />
      <FormCheckLabel>{text}</FormCheckLabel>
    </FormCheck>
  );
}

function MultipleCheck({ text, page }) {
  return (
    <FormCheck>
      <FormCheckInput className='me-2' type='checkbox' name={page} />
      <FormCheckLabel>{text}</FormCheckLabel>
    </FormCheck>
  );
}
