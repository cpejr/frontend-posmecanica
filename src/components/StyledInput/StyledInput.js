import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
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
  setDados, type, label, id, width, field, select, height, shrink, multiline = false,

}) {
  const [error, setError] = useState(false);

  const handleChange = (e, entrada) => {
    if (type === 'number' && e.target.value < 0) {
      setError(true);
    } else {
      setError(false);
    }
    const { value } = e.target;
    setDados(value, entrada);
  };

  return (
    <CssTextField
      InputLabelProps={{
        style: {
          color: 'black',
          background: 'white',
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
      error={error}
      type={type}
      min="0"
      label={label}
      variant="filled"
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
