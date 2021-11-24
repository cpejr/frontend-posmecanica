import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import MenuItem from '@material-ui/core/MenuItem';
import typeDefense from '../../utils/typeDefense';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import RightPanel from '../../components/Menu/RightPanel';
import * as managerService from '../../services/manager/managerService';
import '../ThesisDefense/ThesisDefense.scss';

function ThesisQualification({ location }) {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const { addToast } = useToasts();
  const [titulo, setTitulo] = useState();
  const [type, setType] = useState();
  const [hora, setHora] = useState();
  const [local, setLocal] = useState();
  const [data, setData] = useState('');
  if (location.state == null) {
    window.location = '/login';
  }
  const history = useHistory();
  function formatedDate(date) {
    let newData = '';
    newData = date.split('-');
    return `${newData[2]}/${newData[1]}/${newData[0]}`;
  }
  const inputProps = [
    {
      text: 'Página principal',
      path: 'administrator',
    },
    {
      text: 'Lista de estudantes',
      path: 'administrator/lista-estudantes',
    },
    {
      text: 'Lista de Disciplinas',
      path: 'administrator/lista-isoladas',
    },
    {
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
    },
    {
      text: 'Cadastro de professores',
      path: 'administrator/formulario-professores',
    },
    {
      text: 'Cadastro de disciplina',
      path: 'administrator/cadastro-disciplina',
    },
    {
      text: 'Enviar Notificação',
      path: 'administrator/criar-notificacao',
    },
    {
      text: 'Visualizar Teses',
      path: 'administrator/teses',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  const qualiProps = [
    {
      name: location.state.candidate_name,
      title: titulo,
      tipo: type,
      hour: hora,
      location: local,
      date: formatedDate(data),
      advisor: location.state.stud_prof_advisor,
      bench: location.state.stud_bank,
    },
  ];
  const qualification = {
    quali_stud_name: location.state.candidate_name,
    quali_type: type,
    quali_title: titulo,
    quali_place: local,
    quali_hour: hora,
    quali_date: data,
  };
  const Qualificaçao = async () => {
    if (
      qualification.quali_title === undefined
      || qualification.quali_type === undefined
      || qualification.quali_hour === undefined
      || qualification.quali_place === undefined
      || qualification.quali_date === undefined
    ) {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    } else {
      await managerService.createQualification(qualification, location.state.stud_id);
      addToast('Qualificação marcada com sucesso!', { appearance: 'success' });
      history.push({
        pathname: '/painel/administrator/divulgaçao-qualificaçao',
        state: { detail: qualiProps },
      });
    }
  };
  return (
    <div className="defenseContent">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="defenseContainer">
        <h2 className="defenseTitle">Qualificação</h2>
        <div className="subTitleLine" />
        <div className="defenseBlock">
          <div className="defenseGrid">
            <div className="leftDefenseGrid">
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    label="Aluno"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          {location.state.candidate_name}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Orientador"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          {location.state.stud_prof_advisor}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <TextField
                    id="outlined-select-currency"
                    variant="outlined"
                    label="Tipo de Qualificação"
                    select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {typeDefense.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP1_input">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Título"
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="rightDefenseGrid">
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Horário"
                    onChange={(e) => setHora(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Local"
                    onChange={(e) => setLocal(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="date"
                    onChange={(e) => {
                      setData(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="input-SPcontent">
            <div className="form_SP1_input">
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                label="Banca Examinadora"
                multiline
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      {location.state.stud_bank}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className="divButton">
            <button type="submit" className="buttonDivulgar" onClick={Qualificaçao}>
              GERAR QUALIFICAÇÃO
            </button>
          </div>
        </div>
        <RightPanel
          inputProps={inputProps}
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ThesisQualification;
