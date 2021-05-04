import React, { useEffect, useState } from 'react';
import {
  InputBase,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import './ProfessorList.scss';
import { makeStyles } from '@material-ui/core/styles';
import { FaChevronCircleDown } from 'react-icons/fa';
import * as managerService from '../../services/manager/managerService';

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
  const [inputText, setInputText] = useState(); // quando apaga o input tá crashando a página
  // const [searchAreaListToShow, setSearchAreaListToShow] = useState(searchAreas);

  // const filterby = 'search_area_name';

  // const findNameProfessor = () => {
  //   searchAreas.map((searchArea) => {
  //     searchArea.professors.map((professor) => {
  //       return Object.keys(professor.prof_name).first()
  //     });
  //   });
  // };

  // console.log(Object.keys(searchAreas));

  // const nameProfessor = searchAreas.first().professors.first().prof_name;

  useEffect(async () => {
    const getSearchArea = await managerService
      .getSearchArea('search_area_name', inputText);
    setSearchAreas(getSearchArea);
    // console.log(searchAreas);
  }, [inputText]);

  const classes = useStyles();
  //   const firstAccordion = searchAreas[0];
  //   function firstPosition() {
  //     if (firstAccordion) {
  //       return true;
  //     }
  //   }

  // function findSearchArea(searchArea) {
  //   if (searchArea.length > 0) {
  //     const searchAreaListToDisplay = [];
  //     const filteredSerchAreas = new RegExp(searchArea.toLowerCase(), 'g');

  //     searchAreas.forEach((searchAreaItem) => {
  //       const probableMatched = searchAreaItem[filterby].toLowerCase().match(filteredSerchAreas);
  //       if (probableMatched) {
  //         searchAreaListToDisplay.push(searchAreaItem);
  //       }
  //     });
  //     setSearchAreaListToShow(searchAreaListToDisplay);
  //   } else {
  //     setSearchAreaListToShow(searchAreas);
  //   }
  // }

  return (
    <div className="professor-list-container">
      <h1>Professores</h1>
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
              // findSearchArea(event.target.value);
              setInputText(event.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <h4>
          Resultados por:
          {inputText}
        </h4>
      </div>
      <div className="professor-list-content">
        <div className={classes.root}>
          {searchAreas.map((searchArea) => (
            <Accordion key={searchArea.search_area_id}>
              <AccordionSummary
                expandIcon={<FaChevronCircleDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{searchArea.search_area_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="professor-list-item">
                  {searchArea.professors.map((professor) => (
                    <Accordion key={professor.prof_id}>
                      <AccordionSummary
                        expandIcon={<FaChevronCircleDown />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>{professor.prof_name}</Typography>
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
