import React from 'react';
import ReactDOM from 'react-dom';
import Roteador from './componentes/navegação/roteador';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Roteador />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();