import React from 'react';
import { render } from "react-dom";
import './index.css';
import App from './App';

/* const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
); */
/* root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

const root = document.getElementById("root");
render(<App />, root);