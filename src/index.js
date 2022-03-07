import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { GenreProvider } from './Context/GenreContext'
import { ModalProvider} from './Context/ModalContext'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GenreProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </GenreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
