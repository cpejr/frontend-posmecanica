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
import IsolatedList from './pages/IsolatedList';
import EditDiscipline from './pages/EditDiscipline';
import ProcessSelectiveResult from './pages/IssuingsReports/ProcessSelectiveResult';
import SentDoubts from './pages/StudentSentDoubts';
import SendDoubts from './pages/StudentSendDoubts';
import AdministratorDoubts from './pages/AdminDoubts';
import ThesisList from './pages/ThesisList';
import CreateNotification from './pages/CreateNotification';
import StudentNotifications from './pages/StudentNotifications';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound/NotFound';
import ThesisListAdm from './pages/ThesisListAdm';
import StudentDocsContent from './pages/SentDocuments/StudentDocsContent';

const useStyles = makeStyles({
  container: {
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
          <PrivateRoute exact path="/painel/aluno" component={DashboardAluno} type="aluno" />
          <PrivateRoute exact path="/painel/aluno/documentos" component={StudentDocsContent} type="aluno" />
          <PrivateRoute exact path="/painel/aluno/duvidas/lista" component={SentDoubts} type="aluno" />
          <PrivateRoute exact path="/painel/aluno/duvidas/envio" component={SendDoubts} type="aluno" />
          <PrivateRoute exact path="/painel/aluno/notificacoes" component={StudentNotifications} type="aluno" />
          <PrivateRoute exact path="/painel/administrator" component={DashboardAdministrator} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/duvidas" component={AdministratorDoubts} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/lista-estudantes" component={StudentList} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/criar-notificacao" component={CreateNotification} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/editar/aluno" component={EditStudentInfo} type="administrator" />
          <PrivateRoute exact path="/painel/lista-professores" component={ProfessorList} type="both" />
          <PrivateRoute exact path="/painel/administrator/criar-processo-seletivo" component={CreateSelectiveProcess} type="administrator" />
          <PrivateRoute exact path="/painel/aluno/postagem-teses" component={ThesesPost} type="aluno" />
          <PrivateRoute exact path="/painel/aluno/teses" component={ThesisList} type="aluno" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/consoleposmec" component={Login} />
          <Route exact path="/painel/esqueci-senha" component={forgetPass} />
          <Route exact path="/esqueci-senha" component={forgetPass} />
          <Route exact path="/confirmacao" component={Confirmation} />
          <Route exact path="/formulario-disciplina-isolada" component={FormDis} />
          <Route exact path="/formulario-processo-seletivo" component={FormPs} />
          <PrivateRoute exact path="/painel/administrator/formulario-professores" component={FormProf} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/cadastro-disciplina" component={registerDis} type="administrator" />
          <PrivateRoute exact path="/documentos-enviados" component={SentDocuments} type="administrator" />
          <PrivateRoute exact path="/painel/processos-seletivos" component={SelectiveProcesses} type="both" />
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
          <PrivateRoute exact path="/painel/administrator/lista-isoladas" component={IsolatedList} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/atualizar-disciplina" component={EditDiscipline} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/processos-seletivos/resultados" component={ProcessSelectiveResult} type="administrator" />
          <PrivateRoute exact path="/painel/administrator/teses" component={ThesisListAdm} type="administrator" />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
