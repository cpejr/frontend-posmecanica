import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import forgetPass from './pages/forgetPass/forgetPass';
import Login from './pages/Login';
// import MenuAppBar from "./components/Navbar/index"
// import Drawer from "./components/Navbar/DrawerComponent/Drawer"
import Navbar from './components/Navbar/index';
// import {makeStyles} from "@material-ui/core";
import Footer from './components/Footer/Footer';

import DashboardProfessor from './pages/DashboardProfessor';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard/professor" component={DashboardProfessor} />
        <Route path="/esquecisenha" component={forgetPass} />
        <Route path="/nav" component={Navbar} />
        <Route path="/footer" component={Footer} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
