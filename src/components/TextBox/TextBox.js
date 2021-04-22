import React from "react";
import "./TextBox.scss";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import { MdLocalPostOffice } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

function TextBox() {
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
          <FilledInput
            value={values.login}
            onChange={handleChange("login")}
            startAdornment={
              <InputAdornment position="start">
                <MdLocalPostOffice />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </div>
  );
}

export default TextBox;
