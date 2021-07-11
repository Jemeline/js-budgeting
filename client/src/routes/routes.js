import React from 'react';
import {Switch,Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';
import Home from '../components/Home';
import Expenses from '../components/Expenses'
import Income from '../components/Income'
import VerifyEmail from '../components/Authentication/VerifyEmail';

const Routes = () => (
    <Switch>
        <Route exact path="/register" render={() => (<Register/>)}/>
        <Route exact path="/login" render={() => (<Login/>)}/>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute exact path="/expenses" component={Expenses}/>
        <PrivateRoute exact path="/income" component={Income}/>
        <PrivateRoute exact path="/history" component={Home}/>
        <PrivateRoute exact path="/verify" component={VerifyEmail}/>
    </Switch>
)

export default Routes;