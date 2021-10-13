import React from 'react';
import { RiFile3Fill } from 'react-icons/ri';

const reports = [
  {
    text: 'Emissão de Relatórios:',
    docs: [
      {
        text: 'Report',
        types: ['Ata Resumida', 'Ata Completa', 'Escolha de Membro Banca'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
        path: ['ata-resumida', 'ata-completa', 'escolha-membro'],
      },
      {
        text: 'Report',
        types: ['Certificado', 'Atestado Final de Conclusão'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
        path: ['certificado', 'atestado-final'],
      },
    ],
  },
];
export default reports;
