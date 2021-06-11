import React, { useState } from 'react';
import BoxAdm from '../Inscritos/InscritosPS';
import BoxProf from '../Inscritos/InscritosIsoPS';
import StyledInput from '../StyledInput';
import TitleType from '../../Utils/titleTypes';
import './BoxDashboard.scss';

const titleType = TitleType;

function BoxDashboard({
  title, subtitle, list, type, isoCandidates, setIsoCandidates,
}) {
  const initialState = {
    type: '',
  };
  const [dados, setDados] = useState(initialState);

  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
    console.log(list);
  };
  return (
    <div className="BdMenu">
      <div className="BdTitle">
        {title}
      </div>
      <div>
        <div className="BdBox">
          <div className="BdBoxTitle">
            {subtitle}
            <div>
              <StyledInput
                type="text"
                id="type"
                label="Título"
                width="16rem"
                field={titleType}
                select
                dados={dados}
                setDados={handleChange}
              />
            </div>
          </div>
          <div className="BdDivGrid">
            {list.map((listItem) => {
              if (type === 'adm') {
                if (dados.type === listItem.selective_process.process_type) {
                  return <BoxAdm candidate={listItem} key={listItem.candidate_id} />;
                }
                if (dados.type === '') {
                  return <BoxAdm candidate={listItem} key={listItem.candidate_id} />;
                }
                return <div />;
              }
              return (
                <BoxProf
                  candidate={listItem}
                  isoCandidates={isoCandidates}
                  setIsoCandidates={setIsoCandidates}
                  key={listItem.candidate_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxDashboard;
