/* eslint-disable */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import './StyledInput.scss';

const CssTextField = withStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#1d2d57',
      },
      '&:hover fieldset': {
        borderColor: '#c7d1dc',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1d2d57',
      },
      valueStyle: 'color: red',
    },
  },
}))(TextField);

function StyledInput({
  setDados, type, label, id, width, field, select, height, shrink, defaultValue, rows, multiline, error, text,

}) {

  const [validation, setValidation] = useState(false);
  const [change, setChange] = useState(false);
  const [CPF, setCPF] = useState('');
  const [phone, setPhone] = useState('');
  const [CEP, setCEP] = useState('');
  const [semester, setSemester] = useState('');
  const [loading, setLoading] = useState(true);

  // 000.000.000-00
  const maskCPF = (value) => (
    value.toString()
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  );

  // (99) 99999-9999
  const maskPhone = (value) => (
    value.toString()
      .replace(/\D/g, '')
      .replace(/^(\d\d)(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  );

  // 00000-000
  const maskCEP = (value) => (
    value.toString()
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  );

  // 2021/1
  const maskSemester = (value) => (
    value.toString()
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d{1,2})/, '$1/$2')
      .replace(/(\/\d{1})\d+?$/, '$1')
  );

  const handleChange = (e, entrada) => {
    if (type === 'number' && e.target.value < 0) {
      setValidadion(true);
    } else {
      setValidation(false);
    }
    setChange(true);
    const { value } = e.target;
    setDados(value, entrada);
    setCPF(maskCPF(e.target.value));
    setPhone(maskPhone(e.target.value));
    setCEP(maskCEP(e.target.value));
    setSemester(maskSemester(e.target.value));
  };

  setTimeout(() => {
    if (loading === true) {
      setLoading(false);
    }
  }, 12000);

  return (
    <CssTextField
      InputLabelProps={{
        style: {
          color: 'black',
          background: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
        shrink,
      }}
      InputProps={{
        style: {
          color: '#1d2d57',
          height,
          width,
          marginBottom: '1.5vh',
          marginTop: '1.5vh',
          alignItems: 'flex-start',
          background: 'white',
        },
      }}
      multiline={multiline}
      rows={rows}
      error={(error && !change && text !== 'noRequired') || (validation)}
      type={type}
      min="0"
      label={label}
      variant="filled"
      id={id}
      width={width}
      select={select}
      helperText={(error && !change && text !== 'noRequired') ? "Preencha esse campo." : ""}
      defaultValue={defaultValue}
      onChange={(e) => handleChange(e, id)}
      value={label === 'CPF' ? CPF : label === 'Número do telefone' ? phone : label === 'CEP' ? CEP : label === 'Semestre' ? semester : undefined}

    >
      {select === true && field.length === 0 && loading === true && (
        <div className="loadingStyledInput">
          <CircularProgress size={24} color="inherit" />
        </div>
      )}
      {field
        && field.map((option) => (
          <MenuItem
            InputLabelProps={{
              style: {
                color: 'white',
              },
            }}
            InputProps={{
              style: {
                color: 'white',
              },
            }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))
      }
    </CssTextField >
  );
}
export default StyledInput;
