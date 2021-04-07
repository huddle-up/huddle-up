import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import reportWebVitals from './reportWebVitals';

import './i18n';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading...">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
