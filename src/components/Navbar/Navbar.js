import React from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1D2D57',
    },
  },
});
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    height: 30,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  MenuIcon: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(5),
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton>
              <img src="/images/engrenagem.png" alt="engrenagem" height="50px" width="50px" />
            </IconButton>
            <Typography className="Texto">
              Pós Mecânica UFMG
            </Typography>
            <div className={classes.title.flexGrow} />
          </Toolbar>
        </AppBar>
      </div>

    </ThemeProvider>
  );
}
