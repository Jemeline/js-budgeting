import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory,useLocation } from "react-router-dom";
import {logout} from '../../utils/common';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';

export default function Navigation() {
  const history = useHistory();
  const location = useLocation().pathname;

  const getColor = (loc) => {
    console.log(location);
      return location === loc ? '#D90166' : 'transparent';
  };

  return (
    <div style={{height:'60px',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <button onClick={()=>history.push('/')} style={{color:'white',backgroundColor:getColor('/'),borderRadius:'25px', outline:'none',borderColor:'transparent',marginLeft:'2%',marginRight:'2%',paddingLeft:'5px',paddingRight:'5px',fontSize:'12px'}}>Dashboard</button>
        <button onClick={()=>history.push('/expenses')} style={{color:'white',backgroundColor:getColor('/expenses'),borderRadius:'25px', outline:'none',borderColor:'transparent',marginLeft:'2%',marginRight:'2%',paddingLeft:'5px',paddingRight:'5px',fontSize:'12px'}}>Expenses</button>
        <button onClick={()=>history.push('/income')} style={{color:'white',backgroundColor:getColor('/income'),borderRadius:'25px', outline:'none',borderColor:'transparent',marginLeft:'2%',marginRight:'2%',paddingLeft:'5px',paddingRight:'5px',fontSize:'12px'}}>Income</button>
        <button onClick={()=>history.push('/history')} style={{color:'white',backgroundColor:getColor('/history'),borderRadius:'25px', outline:'none',borderColor:'transparent',marginLeft:'2%',marginRight:'2%',paddingLeft:'5px',paddingRight:'5px',fontSize:'12px'}}>History</button>
    </div>
  );
};
