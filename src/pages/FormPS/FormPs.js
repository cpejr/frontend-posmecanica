import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./FormPs.scss";
import axios from "axios";
import TextBox from "../../components/TextBox";

// tem q colocar certinho os campos do candidato
const initialValue = {
  nome: "",
  senha: "",
  rg: "",
  email: "",
  cpf: "",
  estado: "",
  nacionalidade: "",
  cidade: "",
  universidade: "",
  rua: "",
  graduacao: "",
  grade: "",
  zona: "",
  estadocivil: "",
};

function FormsPs() {
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(e) {
    e.preventDefault();
    // falta pegar o id do processo seletivo
    /*axios.create('http://localhost:3333/candidates', values).then((response) => {
      history.push('/login');
    });
    */
  }
  // acredito q tenha q colocar os nomes dos ids igual os do back
  const formulario = (
    <form onSubmit={onSubmit}>
      <h1> Inscrições</h1>
      <div className="linha">
        <div className="entradaEsquerda">
          <TextBox label="Nome" />
        </div>
        <div className="entradaDireita">
          <TextBox label="Senha" />
        </div>
      </div>
      <div className="linha">
        <div className="entradaEsquerda">
          <TextBox label="RG" />
        </div>
        <div className="entradaDireita">
          <TextBox label="Email" />
        </div>
      </div>
      <div className="linha">
        <div className="entradaEsquerda">
          <TextBox label="CPF" />
        </div>
        <div className="entradaDireita">
          <TextBox label="Estado" />
        </div>
      </div>
      <div className="linha">
        <div className="entradaEsquerda">
          <TextBox label="Nacionalidade" />
        </div>
        <div className="entradaDireita">
          <TextBox label="Cidade" />
        </div>
      </div>
      <div className="linha">
        <div className="entradaEsquerda">
          <TextBox label="Universidade" />
        </div>
        <div className="entradaDireita">
          <TextBox label="Rua" />
        </div>
      </div>
      <div className="linha">
        <div className="entradaEsquerda">
          <TextBox label="Graduação" />
        </div>
        <div className="entradaDireita">
          <TextBox label="Grade" />
        </div>
      </div>
      <div className="linha">
        <div className="entradaEsquerda">
          <TextBox label="Zona Eleitoral" />
        </div>
        <div className="entradaDireita">
          <TextBox label="Estado Civil" />
        </div>
      </div>
    </form>
  );
  return <div className="Tela">{formulario}</div>;
}
export default FormsPs;
