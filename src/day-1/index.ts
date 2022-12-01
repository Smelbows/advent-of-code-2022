import { readFileSync } from 'fs';

const file = readFileSync('./src/day-1/input.txt', 'utf-8');

const array1: string[] = file.split(/\r?\n/);

let elves: Record<number, number> = {
  1: 0,
};

let currentElf: number = 1;
for (let i = 0; i < array1.length; i++) {
  if (array1[i] === '') {
    currentElf++;
    elves[currentElf] = 0;
  } else {
    elves[currentElf] += parseInt(array1[i]);
  }
}

const most = Math.max(...Object.values(elves));

const topThree = Object.values(elves)
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, curr) => acc + curr, 0);

console.log(elves);
console.log(most);
console.log(topThree);
