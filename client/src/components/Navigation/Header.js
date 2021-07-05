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

export default function Navigation() {
  const history = useHistory();

  return (
    <div>
      <Button> Dashboard</Button>
    </div>
  );
};
