import React from "react";
import "./FormPs.scss";
import StyledInput from "../../components/StyledInput";
import Estados from "./Utils/Estados.js";
import Estado_civil from "./Utils/Estado_civil";
import Generos from "./Utils/Generos.js";
import Racas from "./Utils/Racas";
import Booleanos from "./Utils/Booleanos";

const _estados = Estados;
const _estados_civil = Estado_civil;
const _generos = Generos;
const _racas = Racas;
const _booleanos = Booleanos;

function FormPs() {
  return (
    <div className="Tela-ps">
      <h1> Inscrição:</h1>
      <form className="form_dis_ps">
        <div className="form-dis-col-ps">
          <StyledInput type="text" id="name" label="Nome" width="16rem" />
          <StyledInput
            type="text"
            id="orgao"
            label="Orgão Expeditor"
            width="16rem"
          />
          <StyledInput
            type="date"
            id="birth"
            label="Data de Nascimento"
            width="16rem"
          />
          <StyledInput
            type="texte"
            id="voter_title"
            label="Título de Eleitor"
            width="16rem"
          />

          <StyledInput type="text" id="street" label="Rua" width="16rem" />
          <StyledInput
            type="text"
            id="district"
            label="Estado"
            width="16rem"
            field={_estados}
            select={true}
          />
          <StyledInput type="email" id="email" label="Email" width="16rem" />
          <StyledInput type="text" id="grade" label="Graduação" width="16rem" />
          <StyledInput
            type="text"
            id="pGu"
            label="Pós graduado(a)?"
            width="16rem"
            field={_booleanos}
            select={true}
          />
        </div>

        <div className="form-dis-col-ps">
          <StyledInput type="text" id="cpf" label="CPF" width="16rem" />

          <StyledInput
            type="text"
            id="nationality"
            label="Nacionalidade"
            width="16rem"
          />
          <StyledInput
            type="text"
            id="race"
            label="Raça"
            width="16rem"
            field={_racas}
            select={true}
          />
          <StyledInput
            type="number"
            id="zona_title"
            label="Zona Eleitoral"
            width="16rem"
          />
          <StyledInput
            type="number"
            id="adress_num"
            label="Número residencial"
            width="16rem"
          />
          <StyledInput type="text" id="country" label="País" width="16rem" />
          <StyledInput
            type="text"
            id="phone_number"
            label="Número do telefone"
            width="16rem"
          />

          <StyledInput
            type="date"
            id="grade_db"
            label="Data início da graduação"
            width="16rem"
          />
          <StyledInput
            type=""
            id="actv_serv"
            label="Servidor ativo da UFMG?"
            width="16rem"
            field={_booleanos}
            select={true}
          />
        </div>

        <div className="form-dis-col-ps">
          <StyledInput
            type="text"
            id="identity"
            label="Identidade"
            width="16rem"
          />
          <StyledInput
            type="text"
            id="civil_state"
            label="Estado Civil"
            width="16rem"
            field={_estados_civil}
            select={true}
          />

          <StyledInput
            type="text"
            id="gender"
            label="Gênero"
            width="16rem"
            field={_generos}
            select={true}
          />
          <StyledInput
            type="number"
            id="section_title"
            label="Sessão"
            width="16rem"
          />
          <StyledInput type="text" id="city" label="Cidade" width="16rem" />
          <StyledInput type="text" id="cep" label="CEP" width="16rem" />
          <StyledInput
            type="text"
            id="university"
            label="Universidade"
            width="16rem"
          />
          <StyledInput
            type="date"
            id="grade_de"
            label="Data final da graduação"
            width="16rem"
          />

          <StyledInput
            type="text"
            id="ufmgRs"
            label="Servidor aposentado da UFMG?"
            width="16rem"
            field={_booleanos}
            select={true}
          />
        </div>
      </form>
      <div className="divButton-ps">
        <button type="submit"> Cadastre-se</button>
      </div>
    </div>
  );
}
export default FormPs;
