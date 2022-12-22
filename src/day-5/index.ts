import { readFileSync } from "fs";

const file = readFileSync("./src/day-5/input.txt", "utf-8");
const data: string[] = file.split(/\r?\n/);

interface Instruction {
  noOfCrates: number;
  fromStack: number;
  toStack: number;
}

const rearrangementInstructions = data.slice(10);
console.log(rearrangementInstructions);

let crateStacks: string[][] = [];

const addStack = (index: number, crate: string) => {
  if (crateStacks[index] === undefined) {
    crateStacks.push([]);
  }
  if (crate != " ") {
    crateStacks[index] = [...crateStacks[index], crate];
  }
};

const transformCrateData = (crateData: string[]) => {
  crateData.forEach((stack) => {
    addStack(0, stack.slice(1, 2));
    addStack(1, stack.slice(5, 6));
    addStack(2, stack.slice(9, 10));
    addStack(3, stack.slice(13, 14));
    addStack(4, stack.slice(17, 18));
    addStack(5, stack.slice(21, 22));
    addStack(6, stack.slice(25, 26));
    addStack(7, stack.slice(29, 30));
    addStack(8, stack.slice(33, 34));
  });

  console.log(crateStacks);
};

const transformInstructions = (rawInstructions: string[]): Instruction[] => {
  const instructions: Instruction[] = rawInstructions.map((move) => {
    return {
      noOfCrates: parseInt(move.slice(5, 6)),
      fromStack: parseInt(move.slice(12, 13)),
      toStack: parseInt(move.slice(17, 18)),
    };
  });
  return instructions;
};

transformCrateData(data.slice(0, 8));
console.log(transformInstructions(rearrangementInstructions).slice(0, 5));
