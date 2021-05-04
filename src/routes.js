/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Login from './pages/Login';
import forgetPass from './pages/forgetPass/forgetPass';
import DashboardProfessor from './pages/DashboardProfessor';
import Navbar from './components/Navbar/index';
import FormDis from './pages/FormDis';
import FormPs from './pages/FormPs';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
});

function Routes() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.container}>
        <Switch>
          <Route exact from="/" render={(props) => <Navbar {...props} />} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard/professor" component={DashboardProfessor} />
          <Route path="/esqueciSenha" component={forgetPass} />
          <Route path="/formulario-disciplina-isolada" component={FormDis} />
          <Route path="/formulario-processo-seletivo" component={FormPs} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
