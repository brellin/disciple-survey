import { configureStore } from '@reduxjs/toolkit';

const initialState = { email: '', user: {}, questions: [] };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'updateEmail':
      return { ...state, email: action.payload };
    case 'login':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const makeStore = _ => configureStore({ reducer });
