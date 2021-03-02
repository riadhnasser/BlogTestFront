/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import { NavBar } from '../NavBar';
import { LoginPage } from '../LoginPage';
import { makeStyles } from '@material-ui/core/styles';
import { RegisterPage } from '../RegisterPage';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}));
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { PostPage } from './PostsPage';

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/posts" component={PostPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      <ToastContainer />
    </div>
  );
}
