import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import forgetPass from "./pages/forgetPass/forgetPass";
import Login from "./pages/Login";
import MenuAppBar from "./components/Navbar/index"
import Drawer from "./components/Navbar/DrawerComponent/Drawer"
import Navbar from "./components/Navbar/index";
import {makeStyles} from "@material-ui/core";
import Footer from "./components/Footer/Footer"

const useStyles = makeStyles({
container:{
    display:'flex',
}
})
function Routes(){
    const classes= useStyles();
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}/>
            </Switch>
            <Switch>
                <Route path="/esqueciSenha" component={forgetPass}/>
            </Switch>
            <Switch>
                <Route path="/Nav" component={MenuAppBar}/>
            </Switch>
            <div className={classes.container}>
            <Drawer/>
            <Switch>
                <Route exact from="/" render={props => <Navbar {...props} />}/> 
            </Switch>
            </div>
            <Switch>
                <Route path="/footer" component={Footer}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;