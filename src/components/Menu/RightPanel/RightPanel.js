import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import Drawer from '@material-ui/core/Drawer';
import { useAuth } from '../../../providers/auth';
import './RightPanel.scss';

function RightPanel({ inputProps, expandRightPanel, setExpandRightPanel }) {
  const { user, logout } = useAuth();

  const HeaderPanel = (
    <ListItem className="userPanelHeader">
      <IconContext.Provider value={{ size: 40 }}>
        <BiUserCircle />
      </IconContext.Provider>
      <ListItemText>
        <div className="userPanelText">{user.name}</div>
        <div className={clsx('userPanelText', 'mail')}>{user.email}</div>
      </ListItemText>
    </ListItem>
  );

  return (
    <Drawer anchor="right" open={expandRightPanel} onClose={() => setExpandRightPanel(false)}>
      <List>
        {HeaderPanel}
        {inputProps.map((item) => (
          <Link to={{ pathname: `/painel/${item.path}` }}>
            <ListItem button key={item.text}>
              <IconContext.Provider value={{ size: 30 }}>
                {item.icon}
              </IconContext.Provider>
              <ListItemText>
                {item.text}
              </ListItemText>
            </ListItem>
          </Link>
        ))}
        <Link to={{ pathname: '/login' }}>
          <ListItem button>
            <ListItemText onClick={logout}>
              Logout
            </ListItemText>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}

export default RightPanel;
