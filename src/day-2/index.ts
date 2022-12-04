import { readFileSync } from 'fs';

const file = readFileSync('./src/day-2/input.txt', 'utf-8');

const data: string[] = file.split(/\r?\n/);

const strategy: [string, string][] = data.map((round) => [
  round.charAt(0),
  round.charAt(round.length - 1),
]);

const allMoves: Record<string, string> = {};
allMoves['A'] = 'rock';
allMoves['B'] = 'paper';
allMoves['C'] = 'scissors';
allMoves['X'] = 'rock';
allMoves['Y'] = 'paper';
allMoves['Z'] = 'scissors';

const moveScore: Record<string, number> = {};
moveScore['rock'] = 1;
moveScore['paper'] = 2;
moveScore['scissors'] = 3;

const winScore = {
  win: 6,
  draw: 3,
  lose: 0,
};

const wins = (move: string) => {
  if (move === 'rock') {
    return 'scissors';
  } else if (move === 'paper') {
    return 'rock';
  } else return 'paper';
};

const loses = (move: string) => {
  if (move === 'rock') {
    return 'paper';
  } else if (move === 'paper') {
    return 'scissors';
  } else return 'rock';
};

const draw = (move1: string, move2: string) => {
  return move1 === move2;
};

const win = (move1: string, move2: string) => {
  return wins(move1) === move2;
};

const getScore = (elfMove: string, myMove: string): number => {
  let score = 0;
  score += moveScore[myMove];
  if (draw(myMove, elfMove)) {
    score += winScore.draw;
  } else if (win(myMove, elfMove)) {
    score += winScore.win;
  } else {
    score += winScore.lose;
  }
  return score;
};

const roundScores: number[] = strategy.map((round) => {
  const myMove = allMoves[round[1]];
  const elfMove = allMoves[round[0]];
  return getScore(elfMove, myMove);
});

const newStrat: Record<string, string> = {};
newStrat['X'] = 'lose';
newStrat['Y'] = 'draw';
newStrat['Z'] = 'win';

const newStrategy: number[] = strategy.map((round) => {
  const elfMove = allMoves[round[0]];
  let myMove: string;
  if (newStrat[round[1]] === 'lose') {
    myMove = wins(elfMove);
  } else if (newStrat[round[1]] === 'win') {
    myMove = loses(elfMove);
  } else {
    myMove = elfMove;
  }

  return getScore(elfMove, myMove);
});

const total: number = roundScores.reduce((acc, curr) => acc + curr, 0);
console.log(total);

const newStratTotal: number = newStrategy.reduce((acc, curr) => acc + curr, 0);
console.log(newStratTotal);
