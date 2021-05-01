import React from "react";
import "./FormDis.scss";
import DatasImput from "../../components/DatasImput/DatasImput";
import StyledInput from "../../components/StyledInput";
import Opcoes from "../../components/Opcoes";
import Estados from "./Estados.js";
import Estado_civil from "./Estado_civil";
import Generos from "./Generos.js";
import Racas from "./Racas";

const _estados = Estados;
const _estados_civil = Estado_civil;
const _generos = Generos;
const _racas = Racas;
function FormDis() {
  return (
    <div className="Tela">
      <form>
        <h1> Inscrição:</h1>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="name" label="Nome" width="310px" />
          </div>
          <div className="entradaMeio">
            <StyledInput type="text" id="cpf" label="CPF" width="310px" />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="text"
              id="birth"
              label="Data de Nascimento"
              width="310px"
            />
          </div>
          <div className="entradaDireita">
            <Opcoes
              type="text"
              id="gender"
              label="Gênero"
              width="310px"
              field={_generos}
            />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <Opcoes
              type="text"
              id="race"
              label="Raça"
              width="310px"
              field={_racas}
            />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="text"
              id="nationality"
              label="Nacionalidade"
              width="310px"
            />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="text"
              id="identity"
              label="Identidade"
              width="310px"
            />
          </div>
          <div className="entradaDireita">
            <StyledInput
              type="text"
              id="orgao"
              label="Orgão Expeditor"
              width="310px"
            />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <Opcoes
              type="text"
              id="civil_state"
              label="Estado Civil"
              width="310px"
              field={_estados_civil}
            />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="text"
              id="voter_title"
              label="Título de Eleitor"
              width="310px"
            />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="text"
              id="zona_title"
              label="Zona"
              width="310px"
            />
          </div>
          <div className="entradaDireita">
            <StyledInput
              type="text"
              id="section_title"
              label="Sessão"
              width="310px"
            />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="street" label="Rua" width="310px" />
          </div>
          <div className="entradaMeio">
            <StyledInput type="text" id="cpf" label="CPF" width="310px" />
          </div>
          <div className="entradaMeio">
            <StyledInput type="text" id="city" label="Cidade" width="310px" />
          </div>
          <div className="entradaDireita">
            <Opcoes
              type="text"
              id="district"
              label="Estado"
              width="310px"
              field={_estados}
            ></Opcoes>
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput type="text" id="country" label="País" width="310px" />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="text"
              id="adress_num"
              label="Número residêncial"
              width="310px"
            />
          </div>
          <div className="entradaMeio">
            <StyledInput type="text" id="cep" label="CEP" width="310px" />
          </div>
          <div className="entradaDireita">
            <StyledInput type="email" id="email" label="Email" width="310px" />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput
              type="text"
              id="phone_number"
              label="Número do telefone"
              width="310px"
            />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="text"
              id="university"
              label="Universidade"
              width="310px"
            />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="text"
              id="grade"
              label="Graduação"
              width="310px"
            />
          </div>
          <div className="entradaDireita">
            <StyledInput
              type="text"
              id="grade_db"
              label="Data início da graduação"
              width="310px"
            />
          </div>
        </div>
        <div className="linha">
          <div className="entradaEsquerda">
            <StyledInput
              type="date"
              id="grade_de"
              label="Data final da graduação"
              width="310px"
            />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="boolean"
              id="actv_serv"
              label="Servidor ativo da UFMG?"
              width="310px"
            />
          </div>
          <div className="entradaMeio">
            <StyledInput
              type="text"
              id="pGu"
              label="Pós graduado(a)?"
              width="310px"
            />
          </div>
          <div className="entradaDireita">
            <StyledInput
              type="text"
              id="ufmgRs"
              label="Servidor aposentado da UFMG?"
              width="310px"
            />
          </div>
          <div className="entradaDireita">
            <DatasImput
              type="text"
              id="ufmgRs"
              label="Servidor aposentado da UFMG?"
              width="310px"
            />
          </div>
        </div>
        <div className="linha"></div>
        <div className="divButton">
          <button type="submit"> Cadastre-se</button>
        </div>
      </form>
    </div>
  );
}
export default FormDis;
