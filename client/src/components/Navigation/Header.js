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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" style={{flexGrow: 1,textAlign: "left",fontSize:'17px'}}>
          JS Budgeting
        </Typography>
        <IconButton>
          <AccountCircle style={{ color: 'white'}}/>
        </IconButton>
        <Button style={{color: 'white', textAlign: "right", cursor:'pointer',fontSize:'12px'}} onClick={()=>{logout(); history.push('/login')}} hidden={!sessionStorage.getItem('id')}>
          LOGOUT
        </Button>
      </Toolbar>
      </AppBar>
    </div>
  );
};
