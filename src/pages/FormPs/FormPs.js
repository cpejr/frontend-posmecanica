import React from "react";
import "./FormPs.scss";

import StyledInput from "../../components/StyledInput";

function FormPs() {
  return (
    <div className="Tela">
      <form>
        <h1> Inscrição:</h1>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="name" label="Nome" />
          </div>
          <div className="entradaDireita">
            <StyledInput type="password" id="senha" label="Senha" />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="rg" label="RG" />
          </div>
          <div className="entradaDireita">
            <StyledInput type="text" id="email" label="Email" />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="cpf" label="CPF" />
          </div>
          <div className="entradaDireita">
            <StyledInput type="text" id="estado" label="Estado" />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="nacionalidade" label="Nacionalidade" />
          </div>
          <div className="entradaDireita">
            <StyledInput type="text" id="cidade" label="Cidade" />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="universidade" label="Universidade" />
          </div>
          <div className="entradaDireita">
            <StyledInput type="text" id="rua" label="Rua" />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="graduacao" label="Graduação" />
          </div>
          <div className="entradaDireita">
            <StyledInput type="text" id="grade" label="Grade" />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="zona" label="Zona Eleitoral" />
          </div>
          <div className="entradaDireita">
            <StyledInput type="text" id="estado_civil" label="Estado Civil" />
          </div>
        </div>
        <div className="divButton">
          <button type="submit"> Cadastre-se</button>
        </div>
      </form>
    </div>
  );
}
export default FormPs;
