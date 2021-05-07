import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import { useAuth } from '../../../providers/auth';
import './RightPanel.scss';

function RightPanel({ inputProps, expandRightPanel }) {
  const { user } = useAuth();

  const HeaderPanel = (
    <ListItem className="userPanelHeader">
      <IconContext.Provider value={{ size: 40 }}>
        <BiUserCircle />
      </IconContext.Provider>
      <ListItemText className={clsx('userPanelInfos', { hide: !expandRightPanel })}>
        <div className="userPanelText">{user.name}</div>
        <div className={clsx('userPanelText', 'mail')}>{user.email}</div>
      </ListItemText>
    </ListItem>
  );

  return (
    <div className={clsx('divNavbar', { retract: !expandRightPanel })}>
      <List>
        {HeaderPanel}
        {inputProps.map((item) => (
          <ListItem button key={item.text}>
            <IconContext.Provider value={{ size: 30 }}>
              {item.icon}
            </IconContext.Provider>
            <ListItemText className={clsx('userPanelInfos', { hide: !expandRightPanel })}>
              {item.text}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default RightPanel;
