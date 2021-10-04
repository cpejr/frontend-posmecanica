/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  InputBase,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { BiBeer } from 'react-icons/bi';
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
  const [searchAreas, setSearchAreas] = useState([]);
  const searchAreaOrder = "search_area_name";
  const profOrder = "prof_name";
  const [inputText, setInputText] = useState("");

  useEffect(async () => {
    const getSearchArea = await managerService.getAllSearchAreas();
    const filteredSearchAreas = getSearchArea.filter((searchArea) =>
      searchArea.search_area_name
        .toLowerCase()
        .includes(inputText.toLowerCase())
    );
    setSearchAreas(filteredSearchAreas);
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
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
    },
    {
      text: 'Divulgar Defesa de Tese',
      path: 'administrator/defesa-de-teses',
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
      text: 'Redefinição de senha',
      path: '../esqueci-senha',
    },
  ];
  const inputPropsProfessor = [
    {
      icon: <BiBeer style={{ marginRight: '10px' }} />,
      text: 'Página principal',
      path: 'professor',
    },
    {
      icon: <BiBeer style={{ marginRight: '10px' }} />,
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      icon: <BiBeer style={{ marginRight: '10px' }} />,
      text: 'Redefinição de senha',
      path: '../esqueci-senha',
    },
  ];
  return (
    <div className="box-container">
      <div className="grid-container">
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
            <p className="professor-list-second-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              magnam repudiandae veniam voluptatibus explicabo, enim eveniet, eius
              deserunt doloremque, provident cumque sed quidem! Mollitia quos ut
              dolorem, fugit dolore perspiciatis.
            </p>
          </div>
          <div className="header-content">
            <h2 className="header-content-title">Buscar por área de pesquisa</h2>
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
            <div className={classes.root}>
              {orderElements(searchAreas, searchAreaOrder).map((searchArea) => (
                <Accordion key={searchArea.search_area_id}>
                  <AccordionSummary
                    expandIcon={<FaChevronCircleDown color="#1f487c" size={17} />}
                  >
                    <div className="accordionHeadeBox">
                      <Typography>
                        <div className="accordingMainTitle">
                          {searchArea.search_area_name}
                        </div>
                      </Typography>
                      <div className="accordionBorderBottom">
                        <></>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="professor-list-item">
                      {orderElements(searchArea.professors, profOrder).map(
                        (professor) => (
                          <Accordion key={professor.prof_id}>
                            <AccordionSummary
                              expandIcon={
                                <FaChevronCircleDown color="#1f487c" size={17} />
                              }
                            >
                              <Typography className={classes.heading}>
                                <div className="accordingSecondaryTitle">
                                  {professor.prof_name}
                                </div>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="professor-list-desc">
                              <div className="professor-list-desc-item">
                                <p>Email: </p>
                                <span>{professor.prof_email}</span>
                              </div>
                              <div className="professor-list-desc-item">
                                <p>Grau acadêmico: </p>
                                <span>{professor.prof_type}</span>
                              </div>
                              <div className="professor-list-desc-item">
                                <p>Universidade: </p>
                                <span>{professor.prof_university}</span>
                              </div>
                              <div className="professor-list-desc-item">
                                <p>País de origem: </p>
                                <span>{professor.prof_country}</span>
                              </div>
                              <div className="professor-list-desc-item">
                                <p>Descrição: </p>
                                <span>{professor.prof_description}</span>
                              </div>
                              <div className="professor-list-desc-item">
                                <p>Currículo Lattes: </p>
                                <a
                                  href={professor.prof_curriculum}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Ver Currículo
                                </a>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        )
                      )}
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
