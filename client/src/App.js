import React from 'react';
import './scss/App.scss';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';

function App() {
  document.title = "JS Budgeting";
  document.body.style = 'background: #000102';

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes/>
        </div>
      </BrowserRouter>
    </div>
  )}

export default App;