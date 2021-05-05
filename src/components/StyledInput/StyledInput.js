import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import './StyledInput.scss';

const CssTextField = withStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#1d2d57', // bordar normal
      },
      '&:hover fieldset': {
        borderColor: '#c7d1dc', // borda quando passa o mouse
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1d2d57', // borda quando digita
      },
      valueStyle: 'color: red',
    },
  },
}))(TextField);

function StyledInput({
  dados, setDados, type, label, id, width, field, select,
}) {
  const [error, setError] = useState(false);

  const handleChange = (e, entrada) => {
    if (type === 'number' && e.target.value < 0) {
      setError(true);
    } else {
      setError(false);
    }
    const { value } = e.target;
    setDados({ ...dados, [entrada]: value });
    console.log(dados);
  };

  return (
    <CssTextField
      InputLabelProps={{
        style: {
          color: 'black',
          background: 'white',
        },
      }}
      InputProps={{
        style: {
          color: '#1d2d57',
          width,
          marginBottom: '1rem',
        },
      }}
      error={error}
      type={type}
      min="0"
      label={label}
      variant="outlined"
      id={id}
      width={width}
      select={select}
      onChange={(e) => handleChange(e, id)}
    >
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
        ))}
    </CssTextField>
  );
}
export default StyledInput;
