import React from 'react';
import { IconContext } from 'react-icons/lib';
import { BiBookBookmark } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

function Isolateds({ isolated }) {
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: '/painel/administrator/atualizar-disciplina',
      state: isolated,
    });
  };

  return (
    <>
      <div className="linhaInscrito">
        <div className="nomeInscrito">
          <IconContext.Provider value={{ size: 50 }}>
            <BiBookBookmark className="isoPsIcon" />
          </IconContext.Provider>
          <p>{isolated.discipline_name}</p>
        </div>
        <div className="divButtonInfoIsolatedCandidate">
          <button type="button" className="buttonInfoIsolatedCandidate" onClick={() => handleClick()}>
            <p>Editar Disciplina</p>
            <p>Editar</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Isolateds;
