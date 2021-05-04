import React from 'react';
import Drawer from './DrawerComponent/Drawer';

export default function Navbar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1D2D57', color: 'white', fontSize: '14pt',
    }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '23%', padding: '15px',
      }}
      >
        <img src="/images/engrenagem.png" alt="engrenagem" style={{ height: '60px', width: '60px' }} />
        <div>Pós Mecânica UFMG</div>
      </div>
      <Drawer />
    </div>
  );
}
