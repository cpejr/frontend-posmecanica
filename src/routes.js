import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import FormPs from "./pages/FormPs";
import FormDis from "./pages/FormDis";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/formulario-processo-seletivo" component={FormPs} />
        <Route path="/formulario-disciplina-isolada" component={FormDis} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
