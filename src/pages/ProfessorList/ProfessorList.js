/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  InputBase,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaChevronCircleDown } from "react-icons/fa";
import Footer from '../../components/Footer';
import Header from "../../components/Navbar";
import RightPanel from '../../components/Menu/RightPanel';
import orderElements from "../../utils/order.js";
import * as managerService from "../../services/manager/managerService";
import { useAuth } from '../../providers/auth';

import "./ProfessorList.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function ProfessorList() {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchAreaOrder = "prof_name";
  const [inputText, setInputText] = useState("");

  useEffect(async () => {
    if (professors) {
      setLoading(true);
      const getProfessors = await managerService.getAllProfessors();
      const filteredProfessors = getProfessors.filter((searchName) =>
        searchName.prof_name
          .toLowerCase()
          .includes(inputText.toLowerCase())
      );
      setProfessors(filteredProfessors);
    }
    setLoading(false)
  }, [inputText]);

  const classes = useStyles();
  const { user } = useAuth();
  const [expandRightPanel, setExpandRightPanel] = useState(false);
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
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
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
  const inputPropsProfessor = [
    {
      text: 'Página principal',
      path: 'professor',
    },
    {
      text: 'Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  return (
    <div className="box-containerProfList">
      <div className="grid-containerProfList">
        <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
        <div className="professor-list-container">
          <h1>Professores</h1>
          <div className="professor-list-container-border-bottom">
            <> </>
          </div>
          <div className="professor-list-texts">
            <p className="professor-list-first-text">
              Abaixo, apresentaremos os professores relacionados às respectivas
              áreas de pesquisa que estes fazem parte.
            </p>
          </div>
          <div className="header-content_ProfList">
            <h2 className="header-content-title_ProfList">Buscar por nomes</h2>
            <div className="header-content-searchInput">
              <InputBase
                autoFocus
                type="string"
                placeholder="Pesquisar"
                onChange={(event) => {
                  setInputText(event.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <h4 className="header-content-searchby">
              Resultados de:
              {"\t"}
              {inputText}
            </h4>
          </div>
          <div className="professor-list-content">
            {loading === true && (
              <div className="BdDivGridLoader">
                <CircularProgress size={32} color="inherit" className="LoaderProfCandidates" />
              </div>
            )}
            <div className={classes.root}>
              {orderElements(professors, searchAreaOrder)?.map((item) => (
                <Accordion key={item.search_area_id}>
                  <AccordionSummary
                    expandIcon={<FaChevronCircleDown color="#1f487c" size={17} />}
                  >
                    <div className="accordionHeadeBox">
                      <Typography>
                        <div className="accordingMainTitle">
                          {item.prof_name}
                        </div>
                      </Typography>
                      <div className="accordionBorderBottom" />
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="professor-list-item">
                      <AccordionDetails className="professor-list-desc">
                        <div className="professor-list-desc-item">
                          <p>Email: </p>
                          <span>{item.prof_email}</span>
                        </div>
                        <div className="professor-list-desc-item">
                          <p>Grau acadêmico: </p>
                          <span>{item.prof_type}</span>
                        </div>
                        <div className="professor-list-desc-item">
                          <p>Universidade: </p>
                          <span>{item.prof_university}</span>
                        </div>
                        <div className="professor-list-desc-itemDisciplinas">
                          <p>Disciplinas ministradas: </p>
                          <div className="professor-list-desc-itemDisciplinasInside">
                            {item.disciplines && (item.disciplines.length === 0 ? <span> - </span> : (item.disciplines?.map((disciplinas) => {
                              if (disciplinas.discipline_name === item.disciplines[item.disciplines.length - 1].discipline_name) {
                                return <span className="spanDisciplinasProfList">{disciplinas.discipline_name}</span>
                              } else {
                                return <span className="spanDisciplinasProfList">{disciplinas.discipline_name},</span>
                              }
                            })))}
                          </div>
                        </div>
                        <div className="professor-list-desc-item">
                          <p>País de origem: </p>
                          <span>{item.prof_country}</span>
                        </div>
                        <div className="professor-list-desc-item">
                          <p>Descrição: </p>
                          <span>{item.prof_description}</span>
                        </div>
                        <div className="professor-list-desc-item">
                          <p>Currículo Lattes: </p>
                          <a
                            href={item.prof_curriculum}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {"\t"}
                            Ver Currículo
                          </a>
                        </div>
                      </AccordionDetails>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
        {user.type === 'administrator'
          && (
            <RightPanel
              inputProps={inputProps}
              expandRightPanel={expandRightPanel}
              setExpandRightPanel={setExpandRightPanel}
            />
          )}
        {user.type === 'professor'
          && (
            <RightPanel
              inputProps={inputPropsProfessor}
              expandRightPanel={expandRightPanel}
              setExpandRightPanel={setExpandRightPanel}
            />
          )}
      </div>
      <Footer />
    </div>
  );
}

export default ProfessorList;
