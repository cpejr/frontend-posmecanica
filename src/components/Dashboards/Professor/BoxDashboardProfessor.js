import React from 'react';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';

function BoxDashboardProfesssor({
  students, filteredStudents, page, setPage, index, setIndex,
}) {
  const calculatePages = () => {
    const division = parseInt(students.length / 5, 10);
    return students.length % 5 === 0 ? division : division + 1;
  };
  const nextPage = (e, value) => {
    if (value > page) {
      setIndex(index + 5);
    } else {
      setIndex(index - 5);
    }
    setPage(value);
  };

  return (
    <div style={{ height: '100%' }}>
      <div style={{
        height: '20%', fontSize: 42, fontFamily: 'calibri', display: 'flex', alignItems: 'center', paddingLeft: 90,
      }}
      >
        Matrículas Realizadas:
      </div>
      <div>
        <div style={{
          margin: '0px 50px 0px 50px',
          height: '470px',
          border: '1px solid #C4C4C4',
          borderRadius: '8px',
          boxShadow: '0px 3px 5px 0px #C4C4C4',
          overflow: 'hidden',
        }}
        >
          <div style={{
            height: '20%',
            background: '#C4C4C4',
            borderRadius: '5px 5px 0px 0px',
            fontSize: '35px',
            fontFamily: 'calibri',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '24px',
          }}
          >
            Alunos:
          </div>
          <div style={{
            padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 370,
          }}
          >
            <div>
              {filteredStudents.map((student) => (
                <div style={{
                  display: 'flex', alignItems: 'center',
                }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', fontSize: 22, fontFamily: 'calibri', width: '28%',
                  }}
                  >
                    <IconContext.Provider value={{ size: 60 }}>
                      <BiUserCircle style={{ marginRight: 15 }} />
                    </IconContext.Provider>
                    {student}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', width: '39%', justifyContent: 'space-around',
                  }}
                  >
                    <Button style={{ background: 'green', color: 'white' }} variant="contained">Deferir</Button>
                    <Button style={{ background: 'red', color: 'white' }} variant="contained">Indeferir</Button>
                  </div>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: 'black', width: '33%', display: 'flex', justifyContent: 'center', fontFamily: 'calibri',
                    }}
                  >
                    Ver situação do aluno
                  </a>
                </div>
              ))}
            </div>
            <Pagination onChange={(e, value) => nextPage(e, value)} count={calculatePages()} page={page} size="small" shape="rounded" style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 20 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxDashboardProfesssor;
