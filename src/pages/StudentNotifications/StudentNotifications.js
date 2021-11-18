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
import CircularProgress from '@material-ui/core/CircularProgress';
import { useToasts } from 'react-toast-notifications';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Navbar';
import * as managerService from '../../services/manager/managerService';
import { useAuth } from '../../providers/auth';
import RightPanel from '../../components/Menu/RightPanel';

import './studentNotifications.scss';

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

function StudentNotification() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState({});
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const { user } = useAuth();
  const classes = useStyles();
  const { addToast } = useToasts();

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
      text: 'Notas',
      path: '/',
    },
    {
      text: 'Teses',
      path: '/',
    },
    {
      text: 'Documentos',
      path: '/painel/aluno/documentos',
    },
    {
      text: 'Editar Informações',
      path: '/',
    },
    {
      text: 'Dúvidas',
      path: '/',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
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
      managerService.updateMessage(id, { message_status: 'answered' }).catch((error) => {
        console.error(error);
      });
    }
  }, [open]);

  useEffect(() => {
    if (user.id) {
      managerService.getNotificationByUserId(user.id, 'student').then((res) => {
        setMessages(res);
      }).catch((error) => {
        console.error(error);
        addToast('Erro ao buscar dúvidas', { appearance: 'error' });
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div className="doubtRoot">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      {loading ? (
        <div style={{
          height: '72%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <CircularProgress />
        </div>
      )
        : (
          <div className="studentDoubt">
            <div className="doubtTitle">
              <h1>Notificações:</h1>
            </div>
            <List className={classes.root}>
              {messages.map((m) => (
                <button type="button" className="messageRow" onClick={handleClickOpen('paper', m)}>
                  <Divider component="li" />
                  <ListItem alignItems="center" key={m.message_id}>
                    {m.message_status === 'new'
                      ? (<span className="dot" />)
                      : (<span className="read-dot" />)}
                    <ListItemText
                      primary={m.message_title}
                      secondary={m.message_body}
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
                    <h6>Mensagem Enviada:</h6>
                    {msg.message_body}
                    {msg.parent_message && (<h6>Resposta recebida:</h6>)}
                    {msg.parent_message?.message_body}
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Fechar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      <RightPanel
        inputProps={inputProps}
        expandRightPanel={expandRightPanel}
        setExpandRightPanel={setExpandRightPanel}
      />
      <Footer />
    </div>
  );
}

export default StudentNotification;
