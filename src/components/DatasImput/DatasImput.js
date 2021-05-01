import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const CssKeyboardDatePincker = withStyles({
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
})(KeyboardDatePicker);

function DatasImput({ label, id, width }) {
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      InputProps={{
        style: {
          color: "#1d2d57",
          width: width,
          borderColor: "fc0fc0",
        },
      }}
    >
      <CssKeyboardDatePincker
        InputLabelProps={{
          style: {
            color: "black",
            background: "white",
          },
        }}
        margin="normal"
        id="date-picker-dialog"
        label="Date picker dialog"
        format="dd/MM/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
export default DatasImput;
