import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import RightPanel from '../../components/Menu/RightPanel';
import './ThesisDefense.scss';

function ThesisDefense() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const { addToast } = useToasts();
  const [nome, setNome] = useState();
  const [titulo, setTitulo] = useState();
  const [orientador, setOrientador] = useState();
  const [hora, setHora] = useState();
  const [local, setLocal] = useState();
  const [data, setData] = useState();
  const [banca, setBanca] = useState();
  const history = useHistory();
  function formatedDate(date) {
    const newData = new Date(date);
    const day = (newData.getDate() + 1).toString();
    console.log(day);
    const responseDay = day.length === 1 ? `0${day}` : day;
    const month = (newData.getMonth() + 1).toString();
    // +1 pois no getMonth Janeiro começa com zero.
    const responseMonth = month.length === 1 ? `0${month}` : month;
    const year = newData.getFullYear();
    return `${responseDay}/${responseMonth}/${year}`;
  }
  const inputProps = [
    {
      text: 'Página principal',
      path: '',
    },
    {
      text: 'Lista de estudantes',
      path: 'lista-estudantes',
    },
    {
      text: 'Criar processo seletivo',
      path: 'criar-processo-seletivo',
    },
    {
      text: 'Cadastro de professores',
      path: 'formulario-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'cadastro-disciplina',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];

  const defenseProps = [
    {
      name: nome,
      title: titulo,
      advisor: orientador,
      hour: hora,
      location: local,
      date: data,
      bench: banca,
    },
  ];

  function Divulgaçao() {
    console.log(formatedDate(data));
    if (
      defenseProps[0].name === undefined
      || defenseProps[0].title === undefined
      || defenseProps[0].advisor === undefined
      || defenseProps[0].hour === undefined
      || defenseProps[0].location === undefined
      || defenseProps[0].date === undefined
      || defenseProps[0].bench === undefined
    ) {
      addToast('Preencha todos os campos', { appearance: 'error' });
    } else {
      history.push({
        pathname: '/painel/administrator/divulgaçao-tese',
        state: { detail: defenseProps },
      });
    }
  }
  return (
    <div className="defenseContent">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="defenseContainer">
        <h2 className="defenseTitle">Divulgação de Defesa de Tese</h2>
        <div className="subTitle-line" />
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
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Título da Tese"
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Orientador"
                    onChange={(e) => setOrientador(e.target.value)}
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
                    onChange={(e) => setData(e.target.value)}
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
                rows={4}
                onChange={(e) => setBanca(e.target.value)}
              />
            </div>
          </div>
          <div className="divButton">
            <button type="submit" className="buttonDivulgar" onClick={Divulgaçao}>
              GERAR DIVULGAÇÃO
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
