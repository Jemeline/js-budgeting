import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUserActions } from '../contexts/UserContext';

export default function Navigation() {
  const history = useHistory();
  const location = useLocation().pathname;
  const [, logout] = useUserActions();

  const getColor = (loc) => (location === loc ? '#D90166' : 'transparent');

  return (
    <div style={{
      height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <button
        onClick={() => history.push('/')}
        style={{
          color: 'white', backgroundColor: getColor('/'), borderRadius: '25px', outline: 'none', borderColor: 'transparent', marginLeft: '2%', marginRight: '2%', paddingLeft: '5px', paddingRight: '5px', fontSize: '12px',
        }}
      >
        Dashboard
      </button>
      <button
        onClick={() => history.push('/expenses')}
        style={{
          color: 'white', backgroundColor: getColor('/expenses'), borderRadius: '25px', outline: 'none', borderColor: 'transparent', marginLeft: '2%', marginRight: '2%', paddingLeft: '5px', paddingRight: '5px', fontSize: '12px',
        }}
      >
        Expenses
      </button>
      <button
        onClick={() => history.push('/income')}
        style={{
          color: 'white', backgroundColor: getColor('/income'), borderRadius: '25px', outline: 'none', borderColor: 'transparent', marginLeft: '2%', marginRight: '2%', paddingLeft: '5px', paddingRight: '5px', fontSize: '12px',
        }}
      >
        Income
      </button>
      <button
        onClick={() => history.push('/analytics')}
        style={{
          color: 'white', backgroundColor: getColor('/analytics'), borderRadius: '25px', outline: 'none', borderColor: 'transparent', marginLeft: '2%', marginRight: '2%', paddingLeft: '5px', paddingRight: '5px', fontSize: '12px',
        }}
      >
        Analytics
      </button>
      <button
        onClick={() => { logout(); history.push('/login'); }}
        style={{
          color: 'white', backgroundColor: 'transparent', borderRadius: '25px', outline: 'none', borderColor: 'transparent', marginLeft: '2%', marginRight: '2%', paddingLeft: '5px', paddingRight: '5px', fontSize: '12px',
        }}
      >
        Logout
      </button>
    </div>
  );
}
