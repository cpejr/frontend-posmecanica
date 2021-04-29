import React, { useState } from 'react';
import './TextBoxPassword.scss';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { BiLockAlt } from 'react-icons/bi';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    background: 'white',
    borderRadius: 3,
  },
  textField: {
    width: '40ch',
  },
}));

function TextBoxPassword({ user, setUser }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setUser({ ...user, password: value });
  };

  const handleClickShowPassword = (value) => {
    setShowPassword(value);
  };

  return (
    <div className={classes.root}>
      <div>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <FilledInput
            type={showPassword ? 'text' : 'password'}
            value={user.password}
            onChange={handleChange}
            startAdornment={(
              <InputAdornment position="start">
                <BiLockAlt />
              </InputAdornment>
            )}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default TextBoxPassword;
