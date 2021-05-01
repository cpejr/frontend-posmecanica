import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

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

function Opcoes({ type, label, id, width, field }) {
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
          width: width,
        },
      }}
      type={type}
      label={label}
      variant="outlined"
      id={id}
      width={width}
      select
    >
      {field.map((option) => (
        <MenuItem
          InputLabelProps={{
            style: {
              color: "white",
            },
          }}
          InputProps={{
            style: {
              color: "white",
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
export default Opcoes;
