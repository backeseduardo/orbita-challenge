import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import PageNotFound from '../pages/_errors/PageNotFound';

import Login from '../pages/Login';
import Register from '../pages/Register';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/" component={PageNotFound} />
    </Switch>
  );
}
