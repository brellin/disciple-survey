'use client';

import { Col, Form, FormCheck } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ANSWER } from '../../../../lib/actions';
import { useEffect, useRef } from 'react';

export default function RenderPage({ params: { question } }) {
  const questions = useSelector(state => state.questions);
  if (questions.length) return <Page {...{ ...questions[question - 1], question }} />;
  else return null;
}

const Page = ({ title, type, selections, question }) => (
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
      const questions = useSelector(store => store.questions);
      const checked = questions[question - 1] && questions[question - 1].selection === id;
      return (
        <Component {...{ question, text, id, questionId: question - 1, checked }} key={text} />
      );
    })}
  </Col>
);

function RadioQuestion({ text, question, questionId, id, checked }) {
  const dispatch = useDispatch();
  const ref = useRef();
  useEffect(
    _ => {
      if (checked) {
        ref.current.checked = checked;
      }
    },
    [ref]
  );

  return (
    <FormCheck>
      <FormCheckInput
        className='me-2'
        type='radio'
        name={question}
        defaultChecked={checked}
        ref={ref}
        onInput={({ target }) =>
          target.checked && dispatch({ type: SELECT_ANSWER, payload: { questionId, selected: id } })
        }
      />
      <FormCheckLabel>{text}</FormCheckLabel>
    </FormCheck>
  );
}

function MultipleCheck({ text, question, questionId, id }) {
  return (
    <FormCheck>
      <FormCheckInput className='me-2' type='checkbox' name={question} />
      <FormCheckLabel>{text}</FormCheckLabel>
    </FormCheck>
  );
}
