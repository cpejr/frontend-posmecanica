import React from 'react';
import { RiFileInfoLine, RiFile3Fill } from 'react-icons/ri';

const infos = [
  {
    text: 'Informações do candidato:',
    docs: [
      {
        types: ['Formulário'],
        icons: [<RiFileInfoLine size="2em" />],
      },
    ],
  },
  {
    text: 'Documentos do candidato:',
    docs: [
      {
        types: ['Registro Geral (RG)', 'Cadastro de Pessoa Física (CPF)'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
      },
      {
        types: ['Comprovante de Residência', 'Diploma de Graduação'],
        icons: [<RiFile3Fill size="2em" />, <RiFile3Fill size="2em" />],
      },
    ],
  },
];
export default infos;
