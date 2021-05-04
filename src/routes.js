import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import FormDis from "./pages/FormDis";
import FormPs from "./pages/FormPs";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/formulario-disciplina-isolada" component={FormDis} />
        <Route path="/formulario-processo-seletivo" component={FormPs} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
