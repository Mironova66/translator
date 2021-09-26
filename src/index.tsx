import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';

import App from "src/panels/App";

import './index.css';

axios.defaults.baseURL = 'https://translation.googleapis.com/language/translate/v2/';
axios.defaults.responseType = 'json';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
