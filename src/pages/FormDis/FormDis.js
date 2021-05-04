import React from 'react';
import './FormDis.scss';
import StyledInput from '../../components/StyledInput';
import Estados from './Utils/Estados';
import EstadoCivil from './Utils/Estado_civil';
import Generos from './Utils/Generos';
import Racas from './Utils/Racas';
import Booleanos from './Utils/Booleanos';

const estados = Estados;
const estadosCivil = EstadoCivil;
const generos = Generos;
const racas = Racas;
const booleanos = Booleanos;
function FormDis() {
  return (
    <div className="Tela">
      <h1> Inscrição:</h1>
      <form className="form_dis_iso">
        <div className="form-dis-col">
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
            field={estados}
            select
          />
          <StyledInput type="email" id="email" label="Email" width="16rem" />
          <StyledInput type="text" id="grade" label="Graduação" width="16rem" />
          <StyledInput
            type="text"
            id="pGu"
            label="Pós graduado(a)?"
            width="16rem"
            field={booleanos}
            select
          />
        </div>

        <div className="form-dis-col">
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
            field={racas}
            select
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
            field={booleanos}
            select
          />
        </div>

        <div className="form-dis-col">
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
            field={estadosCivil}
            select
          />

          <StyledInput
            type="text"
            id="gender"
            label="Gênero"
            width="16rem"
            field={generos}
            select
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
            field={booleanos}
            select
          />
        </div>
      </form>
      <div className="divButton">
        <button type="submit"> Cadastre-se</button>
      </div>
    </div>
  );
}
export default FormDis;
