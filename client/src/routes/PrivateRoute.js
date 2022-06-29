import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../components/Header';

function PrivateRoute({ component: Component, path }) {
  const sessionId = Cookies.get('jsb-session-id');
  if (sessionId) {
    const privateComponent = (
      <>
        <Header />
        <Component />
      </>
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
