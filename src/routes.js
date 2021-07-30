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
import StudentList from './pages/StudentsList';
import StylePDF from './components/StylePDF';

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
          <Route exact path="/painel/professor" component={DashboardProfessor} />
          <Route exact path="/painel/administrator" component={DashboardAdministrator} />
          <Route exact path="/painel/administrator/lista-estudantes" component={StudentList} />
          <Route exact path="/esqueci-senha" component={forgetPass} />
          <Route exact path="/painel/administrator/esqueci-senha" component={forgetPass} />
          <Route exact path="/formulario-disciplina-isolada" component={FormDis} />
          <Route exact path="/formulario-processo-seletivo" component={FormPs} />
          <Route exact path="/formulario-professores" component={FormProf} />
          <Route exact path="/lista-professores" component={ProfessorList} />
          <Route exact path="/cadastro-disciplina" component={registerDis} />
          <Route exact path="/documentos-enviados" component={SentDocuments} />
          <Route exact path="/processos-seletivos" component={SelectiveProcesses} />
          <Route exact path="/pdf" component={StylePDF} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
