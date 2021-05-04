import React, { useState } from 'react';
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  IconButton,
  makeStyles,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import './Drawer.scss';

const useStyles = makeStyles({
  drawer: {
    width: '160px',
  },

});

const DrawerComponent = () => {
  const classes = useStyles();
  const [openDrawer, setopenDrawer] = useState(false);

  return (
    <>

      <Drawer
        elevation="10"
        anchor="right"
        onClose={() => setopenDrawer(false)}
        open={openDrawer}
        className={classes.drawer}
      >
        <List>
          <ListItem divider button>

            <ListItemIcon>
              <ListItemText>Courses</ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button>

            <ListItemIcon>
              <ListItemText>Courses hsdgjsd</ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button>

            <ListItemIcon>
              <ListItemText>Courses</ListItemText>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      <IconButton className="btnIcon" onClick={() => setopenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};
export default DrawerComponent;
