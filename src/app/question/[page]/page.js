'use client';

import { Col, Form, FormCheck } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import questions from './questions';
import { store } from '../../layout';
import { useDispatch } from 'react-redux';
import { SELECT_ANSWER } from '../../../lib/actions';
import { useState } from 'react';

export default function page({ params: { page } }) {
  console.log('store', store.getState());
  return <Page {...{ ...questions[page - 1], page }} />;
}

const Page = ({ title, type, selections, page }) => (
  <Col>
    <Form.Label>{title}</Form.Label>
    {selections.map(({ text }, id) => {
      let Component;
      switch (type) {
        case 'multiple':
          Component = MultipleCheck;
          break;
        case 'radio':
          Component = RadioQuestion;
          break;
        default:
          console.error('Something went wrong.');
      }
      const state = store.getState();
      const checked = state.questions[page - 1] && state.questions[page - 1].selection === id;
      return <Component {...{ page, text, id, questionId: page - 1, checked }} key={text} />;
    })}
  </Col>
);

function RadioQuestion({ text, page, questionId, id, checked }) {
  const dispatch = useDispatch();

  return (
    <FormCheck>
      <FormCheckInput
        className='me-2'
        type='radio'
        name={page}
        defaultChecked={checked}
        onInput={({ target }) =>
          target.checked && dispatch({ type: SELECT_ANSWER, payload: { questionId, selected: id } })
        }
      />
      <FormCheckLabel>{text}</FormCheckLabel>
    </FormCheck>
  );
}

function MultipleCheck({ text, page, questionId, id }) {
  return (
    <FormCheck>
      <FormCheckInput className='me-2' type='checkbox' name={page} />
      <FormCheckLabel>{text}</FormCheckLabel>
    </FormCheck>
  );
}
