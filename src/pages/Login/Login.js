import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.scss";
import TextBox from "../../components/TextBox";
import TextBoxPassword from "../../components/TextBoxPassword";
import axios from "axios";
import { FiMail } from "react-icons/fi";

const initialValue = {
  email: '',
  password: '',
  type: 'administrator',
};

function Login() {
  const [values, setValues] = useState(initialValue);
  const history = useHistory();
  console.log(values);
  function onChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(e) {
    e.preventDefault();
    /*axios.post('http://localhost:3333/login', values).then((response) => {
      history.push('/');
    });
    */
    history.push("/");
  }
  const icon = (
    <FiMail />
  );

  return (
    <div className="screen">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <div className="text1">
            <TextBox onChange={onChange} icon={icon}/> {/* ta faltando jogar esse onChange pra dentro do component */}
          </div>
          <div className="text1">
            <TextBoxPassword onChange={onChange}/>
          </div>
          <div className="botoes">
            <div className="b1">
              <button type="submit">Entrar</button>
            </div>
            <div className="link">
              <Link to="login"> Esqueceu a senha? </Link>
            </div>
            <br />
            <div className="b2">
              <button type="cadastro">Cadastrar-se</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
