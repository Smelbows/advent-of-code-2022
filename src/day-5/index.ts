import { readFileSync } from "fs";

const file = readFileSync("./src/day-5/input.txt", "utf-8");
const data: string[] = file.split(/\r?\n/);

interface Instruction {
    noOfCrates: number;
    fromStack: number;
    toStack: number;
}

const rearrangementInstructions: string[] = data.slice(10);

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
};

const transformInstructions = (rawInstructions: string[]): Instruction[] => {
    return rawInstructions.map((move) => {
        const instruction: string[] | null = move.match(/\d+/g);
        if (!instruction) {
            throw "what!";
        }

        return {
            noOfCrates: parseInt(instruction[0]),
            fromStack: parseInt(instruction[1]),
            toStack: parseInt(instruction[2]),
        };
    });
};

const moveCrates = (instruction: Instruction): void => {
    for (let i = 0; i < instruction.noOfCrates; i++) {
        const crate = crateStacks[instruction.fromStack - 1].shift();
        if (crate) {
            crateStacks[instruction.toStack - 1].unshift(crate);
        }
    }
};

const findTopCrates = (): string => {
    return crateStacks.map((crateStack) => crateStack[0]).join("");
};

transformCrateData(data.slice(0, 8));
const instructions = transformInstructions(rearrangementInstructions);
instructions.forEach(moveCrates);
console.log(findTopCrates());
