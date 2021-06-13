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
import registerDis from './pages/registerDis';
import SentDocuments from './pages/SentDocuments';
import SelectiveProcesses from './pages/SelectiveProcesses';
import SelectiveProcessDisIsolated from './pages/SelectiveProcessDisIsolated/SelectiveProcessDisIsolated';
import AdmEdit from './pages/AdmEdit/AdmEdit';

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
          <Route path="/cadastro-disciplina" component={registerDis} />
          <Route path="/documentos-enviados" component={SentDocuments} />
          <Route path="/SelectiveProcesses" component={SelectiveProcesses} />
          <Route path="/processo-disciplina-isolada" component={SelectiveProcessDisIsolated} />
          <Route path="/pagina de edição" component={AdmEdit} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
