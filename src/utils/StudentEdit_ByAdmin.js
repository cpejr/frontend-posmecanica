import booleans from './boolean';

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
            width: '22rem',
          },
          {
            type: 'text',
            id: 'stud_scholarship',
            label: 'Bolsista',
            field: booleans,
            select: true,
            width: '22rem',
          },
          {
            type: 'text',
            id: 'stud_workplane',
            label: 'Plano de estudo?',
            field: booleans,
            select: true,
            width: '22rem',
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
            width: '22rem',
          },
          {
            type: 'text',
            id: 'stud_prof_coAdvisor',
            label: 'Professor Co-Orientador',
            field: null,
            select: false,
            width: '22rem',
          },
          {
            type: 'date',
            id: 'stud_workplane_date',
            label: 'Data de termino',
            field: null,
            select: false,
            width: '22rem',
          },
        ],
      },
      {
        items: [
          {
            type: 'longtext',
            id: 'stud_bank',
            label: 'Banca',
            field: null,
            select: false,
            width: '40rem',
          },
        ],
      },
    ],
  },
];

export default StudEdit;
