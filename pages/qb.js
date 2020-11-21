import React, { useState } from "react";
import { useImmer } from "use-immer";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";

import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

import Bracket from "../components/bracket/index";

import styles from "../styles/Home.module.css";

const useStyles = makeStyles({
  root: {},
  button: {
    height: "100%",
  },
  infoContainer: {
    marginTop: "20px",
  },
  bContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  },
  pContainer: {
    backgroundColor: "#524491",
    borderRadius: "5px 0 0 5px",
    height: "600px",
  },
  pTitle: {
    color: "#ffffff",
  },
  pName: {
    width: "300px",
    wordBreak: "break-word",
  },
});

export default function QuickBracket() {
  const classes = useStyles();

  const [input, setInput] = useState("");
  const [radioInput, setRadioInput] = useState("random");
  const [participants, setParticipants] = useImmer([]);

  function onChange(value) {
    setInput(value);
  }

  function onRadioChange(value) {
    setRadioInput(value);
  }

  function onKeyPress(e) {
    if (e?.key === "Enter" && input) {
      addParticipant();
    }
  }

  function addParticipant() {
    setParticipants((draft) => {
      draft.push({ name: input });
    });

    setInput("");
  }

  function removeParticipant(index) {
    setParticipants((draft) => {
      draft.splice(index, 1);
    });
  }

  return (
    <Box className={classes.root}>
      <main className={styles.main}>
        <h1 className={styles.title}>Quick Bracket Generator</h1>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={radioInput}
            onChange={(e) => onRadioChange(e.target.value)}
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="random"
              control={<Radio color="primary" />}
              label="Random"
              labelPlacement="end"
            />
            <FormControlLabel
              value="seeded"
              control={<Radio color="primary" />}
              label="Seeded"
            />
          </RadioGroup>
        </FormControl>
        <Box mt={5} display="flex">
          <TextField
            label="Add Participant"
            variant="outlined"
            value={input}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => onKeyPress(e)}
          />
          <IconButton
            disabled={!input}
            className={classes.button}
            color="primary"
            onClick={() => addParticipant()}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Grid container className={classes.infoContainer}>
          <Grid item xs={12} sm={10} className={classes.bContainer}>
            <Box>
              <Bracket participants={participants} type={radioInput} />
            </Box>
          </Grid>
          <Grid item xs={12} sm>
            <Box
              p={4}
              pr={2}
              display="flex"
              flexDirection="column"
              className={classes.pContainer}
            >
              <Typography variant="h5" className={classes.pTitle}>
                Participants
              </Typography>
              <Divider />
              <Box overflow="auto" className={classes.pNameContainer}>
                {participants.map((p, index) => (
                  <Box display="flex" alignItems="center">
                    <Typography variant="" className={classes.pName}>
                      {p.name}
                    </Typography>
                    <IconButton onClick={() => removeParticipant(index)}>
                      <ClearIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </main>
    </Box>
  );
}
