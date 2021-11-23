import React, { useEffect, useState } from 'react';
import './createNotification.scss';
import { useToasts } from 'react-toast-notifications';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import * as managerService from '../../services/manager/managerService';
import { useAuth } from '../../providers/auth';
import RightPanel from '../../components/Menu/RightPanel';

function CreateNotification() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [students, setStudents] = useState([]);
  const { addToast } = useToasts();
  const { user } = useAuth();

  const initialState = {
    message_sender_id: '',
    message_sender_type: '',
    message_receiver_id: '',
    message_receiver_type: '',
    message_title: '',
    message_body: '',
    message_type: 'notification',
    message_parent_id: '',
  };

  const [dados, setDados] = useState(initialState);

  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  useEffect(() => {
    managerService.getStudents().then((res) => {
      const formattedResponse = res
        // eslint-disable-next-line camelcase
        .map(({ stud_id, candidate_name }) => ({ value: stud_id, label: candidate_name }))
        // eslint-disable-next-line no-nested-ternary
        .sort((a, b) => (((a.label).toLowerCase() < (b.label).toLowerCase()) ? -1
          : ((a.label).toLowerCase() > (b.label).toLowerCase()) ? 1 : 0));
      setStudents(formattedResponse);
    }).catch((err) => {
      console.error(err);
      addToast('Erro ao buscar alunos!', { appearance: 'error' });
    });
  }, []);

  const handleClick = async (e) => {
    dados.message_sender_id = user.id;
    dados.message_sender_type = user.type;
    dados.message_receiver_type = 'aluno';

    e.preventDefault();
    if (dados.message_body.length > 3) {
      await managerService.createMessage(dados);
      addToast('Mensagem enviada com sucesso!', { appearance: 'success' });
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    }
  };
  const inputProps = [
    {
      text: 'Página principal',
      path: 'administrator',
    },
    {
      text: 'Lista de estudantes',
      path: 'administrator/lista-estudantes',
    },
    {
      text: 'Lista de Disciplinas',
      path: 'administrator/lista-isoladas',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Cadastro de professores',
      path: 'administrator/formulario-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'administrator/cadastro-disciplina',
    },
    {
      text: 'Enviar Notificação',
      path: 'administrator/criar-notificacao',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  return (
    <div className="doubtRoot">
      <div className="screen-SentDoubts">
        <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
        <div className="sendDoubtRoot">
          <div className="notification-Title">
            <h1> Nova notificação:</h1>
          </div>
          <div className="sendDoubtInputWrapper">
            <StyledInput
              type="text"
              id="message_receiver_id"
              label="Aluno"
              width="100%"
              field={students}
              select
              dados={dados}
              setDados={handleChange}
            />
            <div className="sendDoubtInput">
              <StyledInput
                type="text"
                id="message_title"
                label="Título"
                width="100%"
                dados={dados}
                setDados={handleChange}
              />
            </div>
            <div className="sendDoubtInput">
              <StyledInput
                type="text"
                id="message_body"
                label="Mensagem"
                width="100%"
                multiline
                dados={dados}
                setDados={handleChange}
              />
            </div>
          </div>
          <div className="sendDoubtBtn">
            <button type="submit" onClick={handleClick}> Enviar notificação </button>
          </div>
        </div>
        <RightPanel
          inputProps={inputProps}
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
        <Footer />
      </div>
    </div>
  );
}
export default CreateNotification;
