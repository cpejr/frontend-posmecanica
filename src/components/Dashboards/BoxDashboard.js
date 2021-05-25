import React from 'react';
import BoxAdm from '../Inscritos/InscritosPS';
import BoxProf from '../Inscritos/InscritosIsoPS';
import './BoxDashboard.scss';

function BoxDashboard({
  title, subtitle, list, type, isoCandidates, setIsoCandidates,
}) {
  return (
    <div className="BdMenu">
      <div className="BdTitle">
        {title}
      </div>
      <div>
        <div className="BdBox">
          <div className="BdBoxTitle">
            {subtitle}
          </div>
          <div className="BdDivGrid">
            {list.map((listItem) => {
              if (type === 'adm') {
                return <BoxAdm candidate={listItem} key={listItem.candidate_id} />;
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
