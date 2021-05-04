import React, { useEffect, useState } from 'react';
import './ProfessorList.scss';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
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
  const [searchAreas, setSearchArea] = useState([]);

  useEffect(async () => {
    const getSearchArea = await managerService.getSearchArea();
    setSearchArea(getSearchArea);
  }, []);

  const classes = useStyles();
  //   const firstAccordion = searchAreas[0];
  //   function firstPosition() {
  //     if (firstAccordion) {
  //       return true;
  //     }
  //   }

  return (
    <div className="professor-list-container">
      <h1>Professores</h1>
      <div className="professor-list-content">
        <div className={classes.root}>
          { searchAreas.map((searchArea) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<FaChevronCircleDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{searchArea.search_area_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="professor-list-item">
                  { searchArea.professors.map((professor) => (
                    <Accordion>
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
