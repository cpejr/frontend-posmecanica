/*eslint-disable*/
import civilStatus from "./civil_status";
import states from "./states";
import genres from "./genres";
import booleans from './boolean';
import races from "./races";
import { TitleTypes } from "./titleTypes";

const formsInput = [
  {
    title: "Dados Pessoais",
    lines: [
      {
        items: [
          {
            type: "text",
            id: "candidate_name",
            label: "Nome",
            field: null,
            select: false,
          },
          {
            type: "date",
            id: "candidate_birth",
            label: "Data de Nascimento",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_nationality",
            label: "Nacionalidade",
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: "email",
            id: "candidate_email",
            label: "Email",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_phone_number",
            label: "Número do telefone",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_civil_state",
            label: "Estado Civil",
            field: civilStatus,
            select: true,
          },
        ],
      },
      {
        items: [
          {
            type: "text",
            id: "candidate_race",
            label: "Raça",
            field: races,
            select: true,
          },
          {
            type: "text",
            id: "candidate_gender",
            label: "Gênero",
            field: genres,
            select: true,
          },
          {
            type: 'text',
            id: 'candidate_mother_name',
            label: 'Nome da mãe',
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: 'text',
            id: 'candidate_father_name',
            label: 'Nome do pai',
            field: null,
            select: false,
          },
        ],
      },
    ],
  },
  {
    title: "Documentação",
    lines: [
      {
        items: [
          {
            type: "text",
            id: "candidate_cpf",
            label: "CPF",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_identity",
            label: "Identidade",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_expedition",
            label: "Orgão Expedidor",
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: "text",
            id: "candidate_voter_title",
            label: "Título de Eleitor",
            field: null,
            select: false,
          },
          {
            type: "number",
            id: "candidate_zone_title",
            label: "Zona Eleitoral",
            field: null,
            select: false,
          },
          {
            type: "number",
            id: "candidate_section_title",
            label: "Sessão",
            field: null,
            select: false,
          },
        ],
      },
    ],
  },
  {
    title: "Endereço",
    lines: [
      {
        items: [
          {
            type: "text",
            id: "candidate_street",
            label: "Rua",
            field: null,
            select: false,
          },
          {
            type: "number",
            id: "candidate_adress_num",
            label: "Número residencial",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_district",
            label: "Bairro",
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: "text",
            id: "candidate_cep",
            label: "CEP",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_city",
            label: "Cidade",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_state",
            label: "Estado",
            field: states,
            select: true,
          },
        ],
      },
      {
        items: [
          {
            type: "text",
            id: "candidate_country",
            label: "País",
            field: null,
            select: false,
          },
        ],
      },
    ],
  },
  {
    title: "Graduação",
    lines: [
      {
        items: [
          {
            type: "text",
            id: "candidate_university",
            label: "Universidade",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_graduation",
            label: "Graduação",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_grade_obtained",
            label: "Grau obtido",
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: "date",
            id: "candidate_grade_date_begin",
            label: "Data início da graduação",
            field: null,
            select: false,
          },
          {
            type: "date",
            id: "candidate_grade_date_end",
            label: "Data da colação na graduação",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_grade",
            label: "Tipo de processo",
            field: TitleTypes,
            select: true,
          },
        ],
      },
    ],
  },
  {
    title: "Informações Complementares",
    lines: [
      {
        items: [
          {
            type: "text",
            id: "candidate_study_regimen",
            label: "Regime de estudo",
            field: null,
            select: false,
          },
          {
            type: "text",
            id: "candidate_scholarship",
            label: "Deseja candidatar-se a bolsa?",
            field: booleans,
            select: true,
          },
          {
            type: "text",
            id: "candidate_concentration_area",
            label: "Área de concentração",
            field: null,
            select: false,
          },
        ],
      },
      {
        items: [
          {
            type: "text",
            id: "candidate_PcD",
            label: "Possui alguma deficiência física?",
            field: booleans,
            select: true,
          },
        ],
      },
    ],
  },
];
export default formsInput;
