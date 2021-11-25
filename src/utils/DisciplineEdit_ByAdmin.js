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
            className: 'formsEdit-input',
          },
          {
            type: 'text',
            id: 'discipline_code',
            label: 'Código',
            field: null,
            select: false,
            className: 'formsEdit-input',
          },
          {
            type: 'text',
            id: 'discipline_semester',
            label: 'Status',
            field: semester,
            select: true,
            className: 'formsEdit-input',
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
            multiline: true,
            rows: 3,
            className: 'formsEdit-inputBank',
          },
        ],
      },
    ],
  },
];

export default DisciplineEdit;
