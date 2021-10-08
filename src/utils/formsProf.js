import states from './states';
import booleans from './boolean';
import genres from './genres';
import Types from './types';
import Titles from './titles';

const formsInput = [
  {
    title: 'Dados Pessoais',
    lines: [
      {
        items: [
          {
            type: 'text',
            id: 'prof_name',
            label: 'Nome',
            field: null,
            select: false,
          },
          {
            type: 'date',
            id: 'prof_birth',
            label: 'Data de Nascimento',
            field: null,
            select: false,
          },
          {
            type: 'text',
            id: 'prof_cpf',
            label: 'CPF/Passaporte',
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: 'email',
            id: 'prof_email',
            label: 'Email',
            field: null,
            select: false,
          },
          {
            type: 'text',
            id: 'prof_gender',
            label: 'Gênero',
            field: genres,
            select: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Endereço',
    lines: [
      {
        items: [
          {
            type: 'text',
            id: 'prof_city',
            label: 'Cidade',
            field: null,
            select: false,
          },
          {
            type: 'text',
            id: 'prof_state',
            label: 'Estado',
            field: states,
            select: true,
          },
          {
            type: 'text',
            id: 'prof_country',
            label: 'País',
            field: null,
            select: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Acadêmico',
    lines: [
      {
        items: [
          {
            type: 'text',
            id: 'prof_university',
            label: 'Universidade',
            field: null,
            select: false,
          },
          {
            type: 'text',
            id: 'prof_curriculum',
            label: 'Curriculum Lattes',
            field: null,
            select: false,
          },
          {
            type: '',
            id: 'prof_active',
            label: 'Professor ativo no programa?',
            field: booleans,
            select: true,
          },
        ],
      },
      {
        items: [
          {
            type: 'text',
            id: 'prof_type',
            label: 'Tipo de professor?',
            field: Types,
            select: true,
          },
          {
            type: 'text',
            id: 'prof_credential',
            label: 'Possui credencial?',
            field: booleans,
            select: true,
          },
          {
            type: 'text',
            id: 'prof_course',
            label: 'Curso',
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: 'text',
            id: 'prof_title',
            label: 'Qual seu título?',
            field: Titles,
            select: true,
          },
          {
            type: 'number',
            id: 'prof_title_year',
            label: 'Ano do título',
            field: null,
            select: false,
          },
          {
            type: 'text',
            id: 'prof_treatment',
            label: 'Como gostaria de ser chamado?',
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: 'text',
            id: 'prof_workplace',
            label: 'Local de trabalho',
            field: null,
            select: false,
          },
        ],
      },
    ],
  },
];
export default formsInput;
