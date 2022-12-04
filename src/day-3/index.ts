import { readFileSync } from 'fs';

const file = readFileSync('./src/day-3/input.txt', 'utf-8');

const rucksacks: string[] = file.split(/\r?\n/);

const findIncorrectItem = (rucksack: string): string => {
  const [compartment1, compartment2] = [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ];
  const item = [...compartment1].find((letter) =>
    compartment2.includes(letter)
  );
  if (item) {
    return item[0];
  }
  return '';
};

const alphabet = [
  'none',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const solution = () => {
  const items: string[] = rucksacks.map((rucksack, i, array) =>
    findIncorrectItem(rucksack)
  );
  return items
    .map((item) => alphabet.indexOf(item))
    .reduce((acc, curr) => acc + curr, 0);
};

const groupBadges = () => {
  let groups: string[][] = [];
  while (rucksacks.length) {
    const newGroup: string[] = rucksacks.splice(0, 3);
    groups.push(newGroup);
  }
  const uniqueItems: string[] = groups.map((group) => {
    const item: string | undefined = [...group[0]]
      .filter((item) => group[1].includes(item))
      .find((item) => group[2].includes(item));

    if (!item) {
      return 'nopw!';
    }
    return item;
  });

  return;
  uniqueItems
    .map((item) => alphabet.indexOf(item))
    .reduce((acc, curr) => acc + curr, 0);
};
console.log(solution());
console.log(groupBadges());
