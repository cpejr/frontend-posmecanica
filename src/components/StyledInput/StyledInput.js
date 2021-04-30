import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#1d2d57", //bordar normal
      },
      "&:hover fieldset": {
        borderColor: "#c7d1dc", // borda quando passa o mouse
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1d2d57", // borda quando digita
      },
    },
  },
})(TextField);

function StyledInput({ type, label, id }) {
  return (
    <CssTextField
      InputLabelProps={{
        style: {
          color: "black",
          background: "white",
        },
      }}
      InputProps={{
        style: {
          color: "#1d2d57",
        },
      }}
      type={type}
      label={label}
      variant="outlined"
      id={id}
    />
  );
}
export default StyledInput;
