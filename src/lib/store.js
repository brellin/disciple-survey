import { getCookie, setCookie } from 'cookies-next';
import { configureStore } from '@reduxjs/toolkit';
import { INIT_QUESTIONS, LOGIN, SELECT_ANSWER, UPDATE_EMAIL } from './actions';

const initialState = {
  email: getCookie('email') || '',
  user: {},
  questions: getCookie('questions') ? JSON.parse(getCookie('questions')) : []
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_EMAIL:
      setCookie('email', payload);
      return { ...state, email: payload };
    case LOGIN:
      return { ...state, ...payload };
    case INIT_QUESTIONS:
      return {
        ...state,
        questions: payload.map(q => ({
          ...q,
          selection: undefined
        }))
      };
    case SELECT_ANSWER:
      const questions = state.questions.map((q, i) =>
        i === payload.questionId ? { ...q, selection: payload.selected } : q
      );
      setCookie('questions', questions);
      return {
        ...state,
        questions
      };
    default:
      return state;
  }
}

export const makeStore = _ => configureStore({ reducer });
