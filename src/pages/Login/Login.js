import React from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import TextBox from "../../components/TextBox";
import TextBoxPassword from "../../components/TextBoxPassword";

function Login() {
  return (
    <div className="screen">
      <div className="login">
        <h1>Login</h1>
        <div className="text1">
          <TextBox />
        </div>
        <div className="text1">
          <TextBoxPassword />
        </div>
        <div className="botoes">
          <div className="b1">
            <button type="entrar">Entrar</button>
          </div>
          <div className="link">
            <Link to="login"> Esqueceu a senha? </Link>
          </div>
          <br />
          <div className="b2">
            <button type="cadastro">Cadastrar-se</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
