import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component , ...path})=>{
    return (
        <Route {...path}  component={(props)=> {
            if (sessionStorage.getItem('id')){
                return(
                    <div>
                        <Component {...props} />
                </div>)}
            else {
                return <Redirect to="/login" />
        }}}
        />
    )
};

export default PrivateRoute;