import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './StyledInputWithIcon.scss';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';

const CssTextField = withStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // bordar normal
      },
      '&:hover fieldset': {
        borderColor: '#AAA', // borda quando passa o mouse
      },
      '&.Mui-focused fieldset': {
        borderColor: '#AAA', // borda quando digita
      },
      valueStyle: 'color: red',
    },
  },
}))(TextField);

function StyledInput({
  setDados, type, label, id, width, select, height,
}) {
  const [showPassword, setShowPassword] = useState();
  useEffect(async () => {
    if (type === 'password') {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }, []);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
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
    <div>
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
            height,
            width,
            marginBottom: '4.5vh',
            background: 'white',
          },
          endAdornment: (
            <div>
              { type === 'password'
                ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      { showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ) : <div />}
            </div>
          ),
        }}
        error={error}
        type={showPassword ? 'text' : 'password'}
        min="0"
        label={label}
        variant="outlined"
        id={id}
        width={width}
        select={select}
        onChange={(e) => handleChange(e, id)}
      />

    </div>

  );
}
export default StyledInput;
