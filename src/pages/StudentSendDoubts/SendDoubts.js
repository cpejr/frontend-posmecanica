import React, { useState } from 'react';
import './sendDoubts.scss';
import { useToasts } from 'react-toast-notifications';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import * as managerService from '../../services/manager/managerService';
import { useAuth } from '../../providers/auth';

function SendDoubts() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const { addToast } = useToasts();
  const { user } = useAuth();

  const initialState = {
    message_sender_id: '',
    message_sender_type: '',
    message_receiver_id: '',
    message_receiver_type: '',
    message_title: '',
    message_body: '',
    message_type: 'message',
    message_parent_id: '',
  };

  const [dados, setDados] = useState(initialState);

  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  const handleClick = async (e) => {
    dados.message_sender_id = user.id;
    dados.message_sender_type = user.type;
    dados.message_receiver_type = user.type === 'aluno' ? 'administrator' : 'aluno';

    e.preventDefault();
    if (dados.message_body.length > 3) {
      await managerService.createMessage(dados);
      addToast('Mensagem enviada com sucesso!', { appearance: 'success' });
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    }
  };
  return (
    <div className="screen-ps">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <h1> Nova dúvida:</h1>
      <div className="sendDoubtRoot">
        <div className="sendDoubtInputWrapper">
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
              label="Dúvida"
              width="100%"
              multiline
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="sendDoubtBtn">
          <button type="submit" onClick={handleClick}> Enviar dúvida </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default SendDoubts;
