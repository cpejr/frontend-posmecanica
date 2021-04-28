import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DashboardProfessor from './pages/DashboardProfessor';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard/professor" component={DashboardProfessor} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
