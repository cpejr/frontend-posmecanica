import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { MdChevronRight } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useToasts } from 'react-toast-notifications';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Navbar';
import { useAdminDoubtContext } from '../../providers/adminDoubt';
import { useAuth } from '../../providers/auth';
import RightPanel from '../../components/Menu/RightPanel';
import StyledInput from '../../components/StyledInput';
import * as managerService from '../../services/manager/managerService';

import './doubt.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '0 2rem',
  },
  inline: {
    display: 'inline',
  },
}));

function SentDoubts() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [msg, setMsg] = useState({});
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const { addToast } = useToasts();
  const { user } = useAuth();

  const classes = useStyles();
  const { doubts } = useAdminDoubtContext();

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

  const handleClickOpen = (scrollType, message) => () => {
    setOpen(true);
    setMsg(message);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setMsg({});
  };

  const inputProps = [
    {
      text: 'Página principal',
      path: 'administrator',
    },
    {
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
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
      text: 'Divulgar Defesa de Tese',
      path: 'administrator/defesa-de-teses',
    },
    {
      text: 'Redefinição de senha',
      path: '../esqueci-senha',
    },
  ];

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }

      const id = msg.message_id;
      managerService.updateMessage(id, { message_status: 'answered' }).catch((err) => {
        console.error(err);
      });
    }
  }, [open]);

  const handleClick = async (e) => {
    dados.message_sender_id = user.id;
    dados.message_sender_type = user.type;
    dados.message_receiver_type = user.type === 'aluno' ? 'administrator' : 'aluno';
    dados.message_receiver_id = msg.message_sender_id;
    dados.message_parent_id = msg.message_id;
    dados.message_title = `Resposta: ${msg.message_title}`;

    const id = msg.message_id;

    e.preventDefault();
    if (dados.message_body.length > 3) {
      await managerService.createMessage(dados);
      await managerService.updateMessage(id, { message_status: 'answered' });
      addToast('Mensagem enviada com sucesso!', { appearance: 'success' });
      handleClose();
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    }
  };

  return (
    <div className="doubtRoot">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="screen-SentDoubts">
        <div className="studentDoubt">
          <div className="doubtTitle">
            <h1>Dúvidas Recebidas:</h1>
          </div>
          <List className={classes.root}>
            {doubts?.map((d) => (
              <button type="button" className="messageRow" onClick={handleClickOpen('paper', d)}>
                <Divider component="li" />
                <ListItem alignItems="center" key={d.message_id}>
                  <ListItemText
                    primary={d.message_title}
                    secondary={d.message_body}
                  />
                  <MdChevronRight size={30} />
                </ListItem>
              </button>
            ))}
            <Divider component="li" />
          </List>
          <Dialog
            open={open}
            fullWidth
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">{msg.message_title}</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <div>
                  <h6>Mensagem Recebida:</h6>
                  {msg.message_body}
                  {msg.parent_message && (<h6>Resposta recebida:</h6>)}
                </div>
              </DialogContentText>
              <div className="sendDoubtInputWrapper">
                <div className="sendDoubtInput">
                  <StyledInput
                    type="text"
                    id="message_body"
                    label="Resposta"
                    width="100%"
                    multiline
                    dados={dados}
                    setDados={handleChange}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Fechar
              </Button>
              <Button onClick={handleClick} color="primary">
                Enviar
              </Button>
            </DialogActions>
          </Dialog>
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

export default SentDoubts;
