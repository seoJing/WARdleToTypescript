import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { checkArrSlice } from './store/checkArrSlice';
import { answerArrSlice } from './store/answerArrSlice';
import { rightAnswerSlice } from './store/rightAnswerSlice';
import { scoreSlice } from './store/scoreSlice';

const store = configureStore({
  reducer: {
    check: checkArrSlice.reducer,
    answer: answerArrSlice.reducer,
    score: scoreSlice.reducer,
    right: rightAnswerSlice.reducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

const body = document.body.style;
body.position = 'relative';
body.width = '1440px';
body.height = '1024px';
body.background = '#2BAE66';
