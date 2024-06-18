import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

const initialState = { email: '' };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'updateEmail':
      return { ...state, email: action.payload };
    default:
      return state;
  }
}

export const updateEmail = value => createAction('updateEmail', value);

export const makeStore = _ =>
  configureStore({
    reducer
  });
