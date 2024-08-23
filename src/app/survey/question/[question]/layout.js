'use client';

import { useState, useEffect, createContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../../../utils/axios';

export const ValidationContext = createContext(null);

import 'bootstrap/dist/css/bootstrap.min.css';
import { INIT_QUESTIONS } from '../../../../lib/actions';

export default function SurveyLayout({ children }) {
  const questions = useSelector(state => state.questions);
  const [inputValid, setInputValid] = useState(false);

  const { push } = useRouter();
  const { question } = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(
    _ => {
      (async _ => {
        try {
          const { data } = await axios.get('questions');
          dispatch({ type: INIT_QUESTIONS, payload: data });
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [dispatch]
  );
  
  return (
    <>
      <ValidationContext.Provider value={setInputValid}>
        <Form>{children}</Form>
      </ValidationContext.Provider>

      <span className='w-100 d-flex justify-content-around fixed-bottom py-2'>
        <Button
          className='btn-danger'
          disabled={pathname === '/'}
          onClick={_ => push(question > 1 ? `/question/${parseInt(question) - 1}` : '/')}
        >
          <FontAwesomeIcon icon='rotate-left' />
          Back
        </Button>
        <Button
          disabled={!inputValid || (question && parseInt(question) === questions.length)}
          onClick={_ => {
            setInputValid(false);
            push(
              pathname === '/'
                ? '/login'
                : `/question/${pathname === '/login' ? 1 : parseInt(question) + 1}`
            );
          }}
        >
          Next
        </Button>
      </span>
    </>
  );
}
