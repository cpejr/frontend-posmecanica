import React from 'react';
import Menu from '../../components/Menu';

function DashboardProfesssor() {
  const RightPanelContent = (
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
          height: '450px',
          border: '1px solid #C4C4C4',
          borderRadius: '8px',
          boxShadow: '0px 3px 5px 0px #C4C4C4',
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
          <div>sdfdsfsdfsdfsdfsd</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%' }}>
      <Menu RightPanelContent={RightPanelContent} />
    </div>
  );
}

export default DashboardProfesssor;
