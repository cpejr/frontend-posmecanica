import React from 'react';
import { BiBeer } from 'react-icons/bi';
// import BoxDashboardProfessor from '../../components/Dashboards/Professor';
import IconButton from '@material-ui/core/IconButton';
import { BsBook } from 'react-icons/bs';
import { GrDocumentUser } from 'react-icons/gr';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import Menu from '../../components/Menu';
import './DashboardAluno.scss';
import Navbar from '../../components/Navbar/Navbar';
import DrawerComponent from '../../components/Navbar/DrawerComponent/Drawer';

function DashboardAluno() {
  const inputProps = [
    {
      icon: <BiBeer />,
      text: 'Inbox',
    },
    {
      icon: <BiBeer />,
      text: 'Starred',
    },
    {
      icon: <BiBeer />,
      text: 'Send email',
    },
    {
      icon: <BiBeer />,
      text: 'Drafts',
    },
  ];

  const RightPanelContent = (

    <div className="icons">
      <h1 className="texto">Aluno</h1>
      <div className="container">
        <div>
          <IconButton>
            <BsBook className="icone" />
          </IconButton>
          <p className="texto2">
            Tese
          </p>
        </div>
        <div>
          <IconButton>
            <GrDocumentUser className="icon2" />
          </IconButton>
          <p className="texto3">
            Meus Documentos
          </p>
        </div>
        <div>
          <div className="foraicon">
            <IconButton>
              <IoIosNotificationsOutline className="icon3" />
            </IconButton>
          </div>
          <p className="texto4">
            Notificações
          </p>
        </div>
        <div>
          <div className="foraicon">
            <IconButton>
              <AiOutlineEdit className="icon4" />
            </IconButton>
          </div>
          <p className="texto5">
            Editar Informações
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Navbar />
      <DrawerComponent />
      <div />
      <div style={{ height: '100%' }}>
        <Menu RightPanelContent={RightPanelContent} inputProps={inputProps} />
      </div>
    </div>
  );
}
export default DashboardAluno;
