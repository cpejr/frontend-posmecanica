import React from 'react';
import { RiFileInfoLine, RiFile3Fill } from 'react-icons/ri';

const infosIso = [
  {
    text: 'Informações do candidato:',
    docs: [
      {
        text: ['Form'],
        types: ['Formulário'],
        icons: [<RiFileInfoLine size="2em" />],
      },
    ],
  },
  {
    text: 'Documentos do candidato:',
    docs: [
      {
        text: 'Docs',
        types: ['Identidade', 'CPF', 'Diploma de Graduação'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
      },
      {
        text: 'Docs',
        types: ['Proficiência', 'Comprovante de Endereço'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
      },
    ],
  },
];
export default infosIso;
