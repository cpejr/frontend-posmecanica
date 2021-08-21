import booleans from './boolean';
import Studtypes from './stud_type';

const StudEdit = [
  {
    title: 'Informações do aluno',
    lines: [
      {
        items: [
          {
            type: 'text',
            id: 'stud_registration',
            label: 'Registro',
            field: null,
            select: false,
          },
          {
            type: 'text',
            id: 'stud_type',
            label: 'Tipo do estudante',
            field: Studtypes,
            select: true,
          },
          {
            type: 'text',
            id: 'stud_scholarship',
            label: 'Bolsista',
            field: booleans,
            select: true,
          },
        ],
      },
      {
        items: [
          {
            type: 'text',
            id: 'stud_prof_advisor',
            label: 'Professor Orientador',
            field: null,
            select: false,
          },
          {
            type: 'text',
            id: 'stud_prof_coAdvisor',
            label: 'Professor Co-Orientador',
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: 'text',
            id: 'stud_workplane',
            label: 'Plano de estudo?',
            field: booleans,
            select: true,
          },
          {
            type: 'date',
            id: 'stud_workplane_date',
            label: 'Data de termino',
            field: null,
            select: false,
          },
        ],
      },
    ],
  },
];

export default StudEdit;
