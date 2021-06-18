import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Login from './pages/Login';
import forgetPass from './pages/forgetPass/forgetPass';
import DashboardProfessor from './pages/DashboardProfessor';
import DashboardAdministrator from './pages/DashboardAdministrator';
import FormDis from './pages/FormDis';
import FormPs from './pages/FormPs';
import FormProf from './pages/FormProf';
import ProfessorList from './pages/ProfessorList';
import registerDis from './pages/registerDis';
import SentDocuments from './pages/SentDocuments';
import SelectiveProcesses from './pages/SelectiveProcesses';
import PDF from './components/PDF/PDF';

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
          <Route exact path="/dashboard/professor" component={DashboardProfessor} />
          <Route exact path="/dashboard/administrator" component={DashboardAdministrator} />
          <Route exact path="/esqueciSenha" component={forgetPass} />
          <Route exact path="/formulario-disciplina-isolada" component={FormDis} />
          <Route exact path="/formulario-processo-seletivo" component={FormPs} />
          <Route exact path="/formulario-professores" component={FormProf} />
          <Route exact path="/professor-list" component={ProfessorList} />
          <Route exact path="/cadastro-disciplina" component={registerDis} />
          <Route exact path="/documentos-enviados" component={SentDocuments} />
          <Route exact path="/SelectiveProcesses" component={SelectiveProcesses} />
          <Route exact path="/pdf" component={PDF} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
