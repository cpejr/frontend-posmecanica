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
import './ThesisDefense.scss';

function ThesisDefense({ location }) {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const { addToast } = useToasts();
  const [titulo, setTitulo] = useState();
  const [type, setType] = useState();
  const [numero, setNumero] = useState();
  const [hora, setHora] = useState();
  const [local, setLocal] = useState();
  const [data, setData] = useState('');
  const history = useHistory();
  if (location.state == null) {
    window.location = '/login';
  }
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
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Cadastro de professores',
      path: 'administrator/formulario-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'administrator/cadastro-disciplina',
    },
    {
      text: 'Enviar Notificação',
      path: 'administrator/criar-notificacao',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  const defenseProps = [
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
  const defense = {
    defense_stud_name: location.state.candidate_name,
    defense_type: type,
    defense_title: titulo,
    defense_protocol: numero,
    defense_place: local,
    defense_hour: hora,
    defense_date: data,
  };
  const Defense = async () => {
    if (
      defense.defense_title === undefined
      || defense.defense_type === undefined
      || defense.defense_protocol === undefined
      || defense.defense_hour === undefined
      || defense.defense_place === undefined
      || defense.defense_date === undefined
    ) {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    } else {
      await managerService.createDefense(defense, location.state.stud_id);
      addToast('Defesa marcada com sucesso!', { appearance: 'success' });
      history.push({
        pathname: '/painel/administrator/divulgaçao-defesa',
        state: { detail: defenseProps },
      });
    }
  };
  return (
    <div className="defenseContent">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="defenseContainer">
        <h2 className="defenseTitle">Defesa</h2>
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
                    label="Tipo de Defesa"
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
                <div className="form_SP_input">
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
                    id="outlined-number"
                    variant="outlined"
                    type="date"
                    onChange={(e) => {
                      setData(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Número da Defesa"
                    onChange={(e) => {
                      setNumero(e.target.value);
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
            <button type="submit" className="buttonDivulgar" onClick={Defense}>
              GERAR DEFESA
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

export default ThesisDefense;
