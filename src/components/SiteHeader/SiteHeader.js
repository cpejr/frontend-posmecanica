import React from 'react';
import './SiteHeader.scss';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BiMenu } from 'react-icons/bi';

// Arrumando nossos BO
function SiteHeader() {
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menus = ['Processo Seletivo', 'Áreas de concentração', 'Administração', 'Área do aluno', 'Normas e Resoluções', 'Documentos Gerais', 'Notícias'];
  const links = ['processo-seletivo', 'acesso-rapido', 'administracao', 'disciplinas', 'campo-de-resolucoes', 'documentos-gerais', 'pagina-de-noticias'];

  const mappedList = menus.map((text, index) => {
    const menuLink = links[index];
    return (
      <ListItem button key={text}>
        <a href={`https://ppgmec.eng.ufmg.br/${menuLink}`}>
          <ListItemText primary={text} href="https://ppgmec.eng.ufmg.br/" />
        </a>
      </ListItem>
    );
  });

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {mappedList}
      </List>
    </div>
  );

  return (
    <div className="site-header-container">
      <div className="site-header-menu">
        {['top'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}><BiMenu className="site-header-menu-icon" /></Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <div className="site-header-logo">
        <img alt="ufmg-logo" src="/images/logo-ufmg-branca.png" />
      </div>
    </div>
  );
}

export default SiteHeader;
