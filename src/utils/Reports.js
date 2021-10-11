import React from 'react';
import { RiFile3Fill } from 'react-icons/ri';

const reports = [
  {
    text: 'Emissão de Relatórios:',
    docs: [
      {
        text: 'Form',
        types: ['Ata Resumida', 'Ata Completa', 'Escolha de Membro Banca'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
      },
      {
        text: 'Form',
        types: ['Certificado', 'Atestado Final de Conclusão'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
      },
    ],
  },
];
export default reports;
