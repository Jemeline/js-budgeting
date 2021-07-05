import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes';
import Header from './components/Navigation/Header';


function App() {
  document.title = "JS Budgeting";

  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <div> 
          <Routes/>
        </div>
      </BrowserRouter>
    </div>
  )}

export default App;