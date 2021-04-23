import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DashboardProfesssor from './pages/DashboardProfesssor';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard/professor" component={DashboardProfesssor} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
