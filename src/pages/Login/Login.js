import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { FiMail } from 'react-icons/fi';
import * as managerService from '../../services/manager/managerService';
import TextBox from '../../components/TextBox';
import TextBoxPassword from '../../components/TextBoxPassword';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function Login() {
  const initialUser = {
    email: '',
    password: '',
    type: 'administrator',
  };
  const [user, setUser] = useState(initialUser);

  const handleClick = async (e) => {
    e.preventDefault();
    await managerService.login(user);
  };
  const icon = (
    <FiMail />
  );

  return (
    <div className="externalDiv">
      <Navbar />
      <div className="screen">
        <div className="login">
          <h1>Login</h1>
          <div className="text1">
            <TextBox user={user} setUser={setUser} icon={icon} />
          </div>
          <div className="text1">
            <TextBoxPassword user={user} setUser={setUser} />
          </div>
          <div className="botoes">
            <div className="b1">
              <button type="button" onClick={handleClick}>Entrar</button>
            </div>
            <div className="link">
              <Link to="login"> Esqueceu a senha? </Link>
            </div>
            <br />
            <div className="b2">
              <button type="button">Cadastrar-se</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Login;