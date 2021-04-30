import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import forgetPass from "./pages/forgetPass/forgetPass";
import Drawer from "./components/Navbar/DrawerComponent/Drawer"
import DashboardProfessor from './pages/DashboardProfessor';
import Navbar from "./components/Navbar/index";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        display: 'flex',
    }
})

function Routes() {
    const classes = useStyles();
    return (
        <BrowserRouter>
            <div className={classes.container}>
                <Drawer />
                <Switch>
                    <Route exact from="/" render={props => <Navbar {...props} />} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard/professor" component={DashboardProfessor} />
                    <Route path="/esqueciSenha" component={forgetPass} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
export default Routes;