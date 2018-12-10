import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import LoginPage from './routes/Login';
import RegisterFormPage from './routes/Register'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path='/register' exact component={RegisterFormPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
