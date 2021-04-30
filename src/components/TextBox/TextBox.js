import React from 'react';
import './TextBox.scss';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    background: 'white',
    borderRadius: 3,
    border: 0,
  },
  textField: {
    width: '40ch',
  },
}));

function TextBox({
  user, setUser, icon,
}) {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    setUser({ ...user, email: value });
  };

  return (
    <div className={classes.root}>
      <div>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <FilledInput
            value={user.email}
            onChange={(e) => handleChange(e)}
            startAdornment={(
              <InputAdornment position="start">
                {icon}
              </InputAdornment>
            )}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default TextBox;
