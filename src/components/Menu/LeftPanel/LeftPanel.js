import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';

function LeftPanel({ inputProps }) {
  const HeaderPanel = (
    <ListItem style={{ borderBottom: '1px solid black' }}>
      <IconContext.Provider value={{ size: 40 }}>
        <BiUserCircle />
      </IconContext.Provider>
      <ListItemText style={{ marginLeft: 16 }}>
        <div>Adilson Silva</div>
        <div style={{ fontSize: 12 }}>adilson@ufmg.br</div>
      </ListItemText>
    </ListItem>
  );

  return (
    <div style={{ background: '#B6B9D3', width: '20%' }}>
      <List>
        {HeaderPanel}
        {inputProps.map((item) => (
          <ListItem button key={item.text}>
            <IconContext.Provider value={{ size: 30 }}>
              {item.icon}
            </IconContext.Provider>
            <ListItemText style={{ marginLeft: 16 }}>
              {item.text}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default LeftPanel;
