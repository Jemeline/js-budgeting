import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { BudgetProvider } from '../contexts/BudgetContext';
import Header from '../components/Header';

function PrivateRoute({ component: Component, path }) {
  if (sessionStorage.getItem('id')) {
    const privateComponent = (
      <BudgetProvider>
        <Header />
        <Component />
      </BudgetProvider>
    );
    return (
      <Route exact path={path} render={() => privateComponent} />
    );
  }

  return (
    <Route exact path={path} render={() => <Redirect to="/login" />} />
  );
}

export default PrivateRoute;
