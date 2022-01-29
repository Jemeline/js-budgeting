import React from 'react';
import Sidebar from '../components/Sidebar';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component , ...path})=>{
    return (
        <Route
            {...path} 
            component={(props)=> {
                if (sessionStorage.getItem('id')) return <Sidebar component={<Component {...props} />}/>
                else return <Redirect to="/login" />
            }}
        />
    )
};

export default PrivateRoute;