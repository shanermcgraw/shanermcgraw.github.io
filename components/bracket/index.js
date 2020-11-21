import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import shuffleArray from "../../utils/shuffleArray";

import Match from "./match";

class Tourney {
  constructor(entries) {
    this.entries = entries;
    this.root = null;
    this.games = [];
  }

  addGames(game, round) {
    game.lastGameTop = new Game(game, round, "down");
    game.lastGameBottom = new Game(game, round, "up");
    if (round > 1) {
      this.addGames(game.lastGameTop, round - 1);
      this.addGames(game.lastGameBottom, round - 1);
    } else {
      this.games.push(game.lastGameTop);
      this.games.push(game.lastGameBottom);
    }
  }

  assignGames() {
    let count = 0;
    for (let i = 0; i < this.games.length; i++) {
      this.games[i].setTeam1(this.entries[count++]);
      this.games[i].setTeam2(this.entries[count++]);
    }
  }

  createGames() {
    const numPlayers = this.entries.length;
    this.rounds = Math.ceil(Math.log(numPlayers) / Math.log(2));
    const nonPlayInGamePlayers = Math.pow(2, this.rounds) - numPlayers;

    this.root = new Game(null, this.rounds, "none");

    // Bracket is of size 2^n, no byes needed
    if (nonPlayInGamePlayers === 0) {
      this.addGames(this.root, this.rounds - 1);
    }
    // Bracket has at least one bye
    else {
      const playInGames = (numPlayers - nonPlayInGamePlayers) / 2;
    }

    this.assignGames();
  }
}

class Game {
  constructor(nextGame, round, position) {
    this.nextGame = nextGame;
    this.lastGameTop = null;
    this.lastGameBottom = null;

    this.nextPosition = position;

    this.score1 = 0;
    this.score2 = 0;
    this.finished = false;
    this.round = round;
    this.winner = null;
    this.team1 = null;
    this.team2 = null;
  }

  setTeam1(team) {
    this.team1 = team;
  }

  setTeam2(team) {
    this.team2 = team;
  }

  setScore1(score) {
    this.score1 = score;
  }

  setScore2(score) {
    this.score2 = score;
  }

  endGame(winner) {
    this.finished = true;
    this.winner = winner;
    this.nextGame?.getTeams();
  }

  getTeams() {
    if (!this.team1) {
      this.team1 = this.lastGameTop.winner;
    }
    if (!this.team2) {
      this.team2 = this.lastGameBottom.winner;
    }
  }
}

export default function Bracket({ participants, type }) {
  const [clicked, setClicked] = useState(false);
  const [match, setMatch] = useState();

  function generateTourney(game) {
    return (
      <Box display="flex" flexDirection="column">
        {game.lastGameTop && generateTourney(game.lastGameTop)}
        <Match
          round={game.round}
          nextGamePosition={game.nextPosition}
          game={game}
        />
        {game.lastGameBottom && generateTourney(game.lastGameBottom)}
      </Box>
    );
  }

  function createTourney() {
    const copy = participants.slice(0);
    if (type === "random") {
      shuffleArray(copy);
    }

    const tourney = new Tourney(copy);
    tourney.createGames();
    setMatch(generateTourney(tourney.root))
    setClicked(true);
  }

  return (
      <Box>
       <Button onClick={() => createTourney()}>Generate</Button>
        {clicked && match}
      </Box>
  )
}
