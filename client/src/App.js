import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes';


function App() {
  document.title = "JS Budgeting";

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