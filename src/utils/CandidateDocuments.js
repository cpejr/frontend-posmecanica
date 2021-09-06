import React from 'react';
import { RiFileInfoLine, RiFile3Fill } from 'react-icons/ri';

const infos = [
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
        types: ['Identidade', 'CPF', 'Diploma de Graduação', 'Plano de Doutorado'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
      },
      {
        text: 'Docs',
        types: ['GRU', 'proficiency', 'Comprovante de Endereço', 'Comprovante de Mestrado'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
      },
    ],
  },
];
export default infos;
