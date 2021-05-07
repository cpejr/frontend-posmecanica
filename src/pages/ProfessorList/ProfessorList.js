import React, { useEffect, useState } from 'react';
import {
  InputBase,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaChevronCircleDown } from 'react-icons/fa';

import orderElements from '../../utils/order';
import * as managerService from '../../services/manager/managerService';

import './ProfessorList.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function ProfessorList() {
  const [searchAreas, setSearchAreas] = useState([]);
  const searchAreaOrder = 'search_area_name';
  const profOrder = 'prof_name';
  const [inputText, setInputText] = useState(); // quando apaga o input tá crashando a página

  useEffect(async () => {
    const getSearchArea = await managerService
      .getSearchArea('search_area_name', inputText);
    setSearchAreas(getSearchArea);
  }, [inputText]);

  useEffect(async () => {
    var allProfessorsGot = [];
    await searchAreas.forEach((searchArea) => {
      searchArea.professors.forEach((professor) => {
        allProfessorsGot.push(professor);
      });
    });
  }, []);
  const classes = useStyles();

  return (
    <div className="professor-list-container">
      console.log(allProfessorsGot);
      <h1>Professores</h1>
      <div className="professor-list-texts">
        <p className="professor-list-first-text">
          Abaixo, apresentaremos os professores relacionados às respectivas
          áreas de pesquisa que estes fazem parte.
        </p>
        <p className="professor-list-second-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Harum magnam repudiandae veniam voluptatibus explicabo, enim eveniet,
          eius deserunt doloremque, provident cumque sed quidem! Mollitia
          quos ut dolorem, fugit dolore perspiciatis.
        </p>
      </div>
      <div className="header-content">
        <h2 className="header-content-title">
          Buscar por área de pesquisa
        </h2>
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
          {'\t'}
          {inputText}
        </h4>
      </div>
      <div className="professor-list-content">
        <div className={classes.root}>
          {orderElements(searchAreas, searchAreaOrder)
            .map((searchArea) => (
              <Accordion
                key={searchArea.search_area_id}
              >
                <AccordionSummary
                  className="accordionHeadeBox"
                  expandIcon={<FaChevronCircleDown color="#1f487c" />}
                >
                  <Typography className="accordionHeader">
                    {searchArea.search_area_name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="professor-list-item">
                    {orderElements(searchArea.professors, profOrder)
                      .map((professor) => (
                        <Accordion key={professor.prof_id}>
                          <AccordionSummary
                            expandIcon={<FaChevronCircleDown color="#1f487c" />}
                          >
                            <Typography className={classes.heading}>
                              {professor.prof_name}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails className="professor-list-desc">
                            <p>{professor.prof_email}</p>
                            <p>{professor.prof_type}</p>
                            <div>
                              <p>Universidade</p>
                              <p>{professor.prof_university}</p>
                            </div>
                            <p>{professor.prof_birth}</p>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfessorList;
