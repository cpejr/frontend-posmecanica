import React from "react";
import "./TextBox.scss";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    background: 'white',
    borderRadius: 3,
    border: 0,
  },
  textField: {
    width: "40ch",
  },
}));

function TextBox({ icon,label }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    login: "",
    weight: "",
    weightRange: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div className={classes.root}>
      <div>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <label htmlFor={label}>{label} </label>
          <FilledInput
            value={values.login}
            onChange={handleChange("login")}
            startAdornment={
              <InputAdornment position="start">
                {icon}
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </div>
  );
}

export default TextBox;
