import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

function PrivateRoute({ component: Component, ...path }) {
  return (
    <Route
      {...path}
      component={(props) => {
        if (sessionStorage.getItem('id')) {
          return (
            <div>
              <Header />
              <Component {...props} />
            </div>
          );
        }

        return <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRoute;
