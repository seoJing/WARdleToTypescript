import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);

const body = document.body.style;
body.position = 'relative';
body.width = '1440px';
body.height = '1024px';
body.background = '#2BAE66';
