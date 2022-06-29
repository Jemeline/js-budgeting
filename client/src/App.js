import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { BudgetProvider } from './contexts/BudgetContext';
import Routes from './routes/routes';

function App() {
  document.title = 'JS Budgeting';
  document.body.style = 'background: #222831;';

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <BudgetProvider>
            <Routes />
          </BudgetProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
