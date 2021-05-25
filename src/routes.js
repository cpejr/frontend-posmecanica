import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Login from './pages/Login';
import forgetPass from './pages/forgetPass/forgetPass';
import DashboardProfessor from './pages/DashboardProfessor';
import DashboardAdministrator from './pages/DashboardAdministrator';
import FormDis from './pages/FormDis';
import FormPs from './pages/FormPs';
import ProfessorList from './pages/ProfessorList';
import SentDocuments from './pages/SentDocuments';

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
          <Route exact path="/" component={Login} />
          <Route path="/dashboard/professor" component={DashboardProfessor} />
          <Route path="/dashboard/administrator" component={DashboardAdministrator} />
          <Route path="/esqueciSenha" component={forgetPass} />
          <Route path="/formulario-disciplina-isolada" component={FormDis} />
          <Route path="/formulario-processo-seletivo" component={FormPs} />
          <Route path="/professor-list" component={ProfessorList} />
          <Route path="/documentos-enviados" component={SentDocuments} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
