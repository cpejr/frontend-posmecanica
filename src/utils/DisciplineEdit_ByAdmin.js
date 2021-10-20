import semester from './semester';

const DisciplineEdit = [
  {
    title: 'Informações da disciplina',
    lines: [
      {
        items: [
          {
            type: 'text',
            id: 'discipline_name',
            label: 'Nome da Disciplina',
            field: null,
            select: false,
            width: '22rem',
          },
          {
            type: 'text',
            id: 'discipline_code',
            label: 'Código',
            field: null,
            select: false,
            width: '22rem',
          },
          {
            type: 'text',
            id: 'discipline_semester',
            label: 'Semestre de oferta',
            field: semester,
            select: true,
            width: '22rem',
          },
        ],
      },
      {
        items: [
          {
            type: 'longtext',
            id: 'discipline_content',
            label: 'Conteúdo',
            field: null,
            select: false,
            width: '40rem',
          },
        ],
      },
    ],
  },
];

export default DisciplineEdit;
