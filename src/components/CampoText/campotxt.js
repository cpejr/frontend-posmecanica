import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function TextFieldSizes() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (value) => {
    setShowPassword(value);
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Small"
          variant="outlined"
          size="small"
        />
        <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Small"
          variant="outlined"
          size="small"
        >
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => handleClickShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </IconButton>
          </InputAdornment>
        </TextField>
      </div>
    </form>
  );
}
