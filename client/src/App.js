import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes';
import Header from './components/Navigation/Header';

function App() {
  document.title = "JS Budgeting";
  document.body.style = 'background: #152238;';

  return (
    <div className="App">
      <BrowserRouter>
        <div> 
          <Header/>
          <Routes/>
        </div>
      </BrowserRouter>
    </div>
  )}

export default App;