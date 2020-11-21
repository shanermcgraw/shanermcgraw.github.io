import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {},
  score: {
    width: "40px",
  },
  teamContainer: {},
  bTextField: {
    "&:hover": {
      background: "#524491",
      cursor: "pointer",
    },
  },
  svg: {
    position: "absolute",
    overflow: "overlay",
  },
});

function BracketTextField({ ...props }) {
  return <TextField {...props} inputProps={{ style: { padding: 5 } }} />;
}

export default function Match({ nextGamePosition, round, game }) {
  const classes = useStyles();
  const [score1, setScore1] = useState(game.score1);
  const [score2, setScore2] = useState(game.score2);

  const marginRight = round ? (round - 1) * 40 : 0;

  function setWinner(team) {
      game.endGame(team);
  }

  function getY2() {
    if (nextGamePosition === "up") {
      return "0";
    } else if (nextGamePosition === "down") {
      return "100%";
    } else {
      return "50%";
    }
  }

  return (
    <Box ml={marginRight} display="flex" className={classes.root}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" className={classes.teamContainer}>
          <BracketTextField
            disabled
            variant="outlined"
            value={game.team1?.name}
            className={classes.bTextField}
            onClick={() => setWinner(game.team1)}
          />
          <BracketTextField
            variant="outlined"
            type="number"
            value={score1}
            onChange={(e) => {
              setScore1(e.target.value);
              game.setScore1(Number(e.target.value));
            }}
            className={classes.score}
          />
        </Box>
        <Box display="flex" className={classes.teamContainer}>
          <BracketTextField
            disabled
            variant="outlined"
            value={game.team2?.name}
            className={classes.bTextField}
            onClick={() => setWinner(game.team2)}
          />
          <BracketTextField
            variant="outlined"
            type="number"
            value={score2}
            onChange={(e) => {
              setScore2(e.target.value);
              game.setScore2(Number(e.target.value));
            }}
            className={classes.score}
          />
        </Box>
      </Box>
      <Box position="relative">
        <svg height="100%" className={classes.svg}>
          <line x1="0" y1="50%" x2="50%" y2="50%" stroke="black" />
          <line x1="50%" y1="50%" x2="50%" y2={getY2()} stroke="black" />
        </svg>
      </Box>
    </Box>
  );
}
