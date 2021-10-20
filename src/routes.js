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
          <Route exact path="/painel/aluno" component={DashboardAluno} />
          <Route exact path="/painel/administrator" component={DashboardAdministrator} />
          <Route exact path="/painel/administrator/lista-estudantes" component={StudentList} />
          <Route exact path="/painel/administrator/editar/aluno" component={EditStudentInfo} />
          <Route exact path="/painel/lista-professores" component={ProfessorList} />
          <Route exact path="/painel/administrator/criar-processo-seletivo" component={CreateSelectiveProcess} />
          <Route exact path="/painel/aluno/postagem-teses" component={ThesesPost} />
          <Route exact path="/esqueci-senha" component={forgetPass} />
          <Route exact path="/confirmacao" component={Confirmation} />
          <Route exact path="/formulario-disciplina-isolada" component={FormDis} />
          <Route exact path="/formulario-processo-seletivo" component={FormPs} />
          <Route exact path="/painel/administrator/formulario-professores" component={FormProf} />
          <Route exact path="/lista-professores" component={ProfessorList} />
          <Route exact path="/painel/administrator/cadastro-disciplina" component={registerDis} />
          <Route exact path="/documentos-enviados" component={SentDocuments} />
          <Route exact path="/painel/processos-seletivos" component={SelectiveProcesses} />
          <Route exact path="/painel/administrator/defesa-de-teses" component={ThesisDefense} />
          <Route exact path="/painel/administrator/qualificaçao-teses" component={ThesisQualification} />
          <Route exact path="/painel/administrator/divulgaçao-qualificaçao" component={DivulgaçaoQualificaçao} />
          <Route exact path="/painel/administrator/relatorios/declaracao" component={Declaration} />
          <Route exact path="/painel/administrator/divulgaçao-defesa" component={DivulgaçaoTese} />
          <Route exact path="/painel/administrator/relatorios" component={DefenseReports} />
          <Route exact path="/painel/administrator/relatorios/ata-resumida" component={SummaryAta} />
          <Route exact path="/painel/administrator/relatorios/atestado-final" component={FinalCertificate} />
          <Route exact path="/painel/administrator/relatorios/certificado" component={CertificateReport} />
          <Route exact path="/painel/administrator/relatorios/escolha-membro" component={ChoiceMember} />
          <Route exact path="/painel/administrator/relatorios/ata-completa" component={CompleteAta} />
          <Route exact path="/painel/administrator/lista-isoladas" component={IsolatedList} />
          <Route exact path="/painel/administrator/atualizar-disciplina" component={EditDiscipline} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
