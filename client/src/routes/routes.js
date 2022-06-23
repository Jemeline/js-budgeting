import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';
import Home from '../pages/Home';
import Expenses from '../pages/Expenses';
import Income from '../pages/Income';
import VerifyEmail from '../components/Authentication/VerifyEmail';
import Analytics from '../pages/Analytics';

function Routes() {
  return (
    <Switch>
      <Route exact path="/register" render={() => (<Register />)} />
      <Route exact path="/login" render={() => (<Login />)} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/expenses" component={Expenses} />
      <PrivateRoute exact path="/income" component={Income} />
      <PrivateRoute exact path="/analytics" component={Analytics} />
      <PrivateRoute exact path="/verify" component={VerifyEmail} />
    </Switch>
  );
}

export default Routes;
