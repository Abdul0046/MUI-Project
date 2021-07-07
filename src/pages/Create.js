import React, { useState } from "react";
import {
  Typography,
  Button,
  makeStyles,
  TextField,
  ThemeProvider,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { KeyboardArrowRight, Send } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
const theme = createMuiTheme();

const useStyles = makeStyles({
  field: {
    padding: theme.spacing(3),
    marginBottom: 20,
    display: "block",
  },
  details: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  btn: {
    marginTop: 20,
  },
});

export default function Create() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("Reminders");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      setTitleError(true);
    }

    if (details === "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => {
        history.push("/");
      });
      console.log("submited");
    }
  };
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form
        noValidate
        autoComplete="off"
        className={classes.field}
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError(false);
          }}
          variant="outlined"
          label="Title"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => {
            setDetails(e.target.value);
            setDetailsError(false);
          }}
          className={classes.details}
          variant="outlined"
          label="Details"
          fullWidth
          required
          multiline
          rows={8}
          error={detailsError}
        />

        <RadioGroup
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormControlLabel
            value="Reminders"
            control={<Radio />}
            label="Reminders"
            color="secondary"
          />
          <FormControlLabel
            value="Work"
            control={<Radio />}
            label="Work"
            color="secondary"
          />
          <FormControlLabel
            value="Todos"
            control={<Radio />}
            label="Todos"
            color="secondary"
          />
          <FormControlLabel
            value="Money"
            control={<Radio />}
            label="Money"
            color="secondary"
          />
        </RadioGroup>

        <Button
          className={classes.btn}
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </form>

      <br />
    </>
  );
}
