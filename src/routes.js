import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Login from './pages/Login';
import forgetPass from './pages/forgetPass/forgetPass';
import DashboardProfessor from './pages/DashboardProfessor';
import DashboardAdministrator from './pages/DashboardAdministrator';
import CreateSelectiveProcess from './pages/CreateSelectiveProcess';
import DashboardAluno from './pages/DashboardAluno';
import FormDis from './pages/FormDis';
import FormPs from './pages/FormPs';
import FormProf from './pages/FormProf';
import ProfessorList from './pages/ProfessorList';
import registerDis from './pages/registerDis';
import SentDocuments from './pages/SentDocuments';
import SelectiveProcesses from './pages/SelectiveProcesses';
import StudentList from './pages/StudentsList';
import EditStudentInfo from './pages/EditStudentInfo';
import Confirmation from './pages/forgetPass/Confirmation';
import ThesesPost from './pages/ThesesPost';
import ThesisDefense from './pages/ThesisDefense';
import DivulgaçaoTese from './pages/DivulgaçaoTese';
import ThesisQualification from './pages/ThesisQualification/ThesisQualification';
import DivulgaçaoQualificaçao from './pages/DivulgaçaoQualificaçao';
import DefenseReports from './pages/DefenseReports';
import SummaryAta from './pages/IssuingsReports/SummaryAta';
import ChoiceMember from './pages/IssuingsReports/ChoiceMember';
import FinalCertificate from './pages/IssuingsReports/FinalCertificate';
import CertificateReport from './pages/IssuingsReports/CertificateReport';
import Declaration from './pages/IssuingsReports/Declaration';
import CompleteAta from './pages/IssuingsReports/CompleteAta';
import PrivateRoute from './components/PrivateRoute';

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
          <PrivateRoute exact path="/painel/professor" component={DashboardProfessor} type="professor" />
          <Route exact path="/painel/aluno" component={DashboardAluno} type="student" />
          <PrivateRoute exact path="/painel/administrator" component={DashboardAdministrator} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/lista-estudantes" component={StudentList} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/editar/aluno" component={EditStudentInfo} type="administrator" />
          <PrivateRoute exact path="/painel/lista-professores" component={ProfessorList} type="both" />
          <PrivateRoute exact path="/painel/administrator/criar-processo-seletivo" component={CreateSelectiveProcess} type="administrator" />
          <Route exact path="/painel/aluno/postagem-teses" component={ThesesPost} type="student" />
          <Route exact path="/esqueci-senha" component={forgetPass} />
          <Route exact path="/confirmacao" component={Confirmation} />
          <Route exact path="/formulario-disciplina-isolada" component={FormDis} />
          <Route exact path="/formulario-processo-seletivo" component={FormPs} />
          <PrivateRoute exact path="/painel/administrator/formulario-professores" component={FormProf} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/cadastro-disciplina" component={registerDis} type="administrator" />
          <PrivateRoute exact path="/documentos-enviados" component={SentDocuments} type="administrator" />
          <Route exact path="/painel/processos-seletivos" component={SelectiveProcesses} type="both" />
          <PrivateRoute exact path="/painel/administrator/defesa-de-teses" component={ThesisDefense} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/qualificaçao-teses" component={ThesisQualification} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/divulgaçao-qualificaçao" component={DivulgaçaoQualificaçao} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/relatorios/declaracao" component={Declaration} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/divulgaçao-defesa" component={DivulgaçaoTese} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/relatorios" component={DefenseReports} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/relatorios/ata-resumida" component={SummaryAta} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/relatorios/atestado-final" component={FinalCertificate} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/relatorios/certificado" component={CertificateReport} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/relatorios/escolha-membro" component={ChoiceMember} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/relatorios/ata-completa" component={CompleteAta} type="administrator" />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
