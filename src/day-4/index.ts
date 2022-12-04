import { readFileSync } from 'fs';

const file = readFileSync('./src/day-4/input.txt', 'utf-8');

const data: string[] = file.split(/\r?\n/);

interface Range {
  start: number;
  finsh: number;
}

const rangeFullyContained = (range1: Range, range2: Range): boolean => {
  return range1.start <= range2.start && range1.finsh >= range2.finsh;
};

const rangeOverlaps = (range1: Range, range2: Range): boolean => {
  return (
    (range1.start >= range2.start && range1.start <= range2.finsh) ||
    (range1.finsh >= range2.start && range1.finsh <= range2.finsh)
  );
};

const transformElfData = (elfPairData: string): Range[] => {
  const [elf1Range, elf2Range] = elfPairData.split(',');
  const [start1, finish1] = elf1Range.split('-');
  const [start2, finish2] = elf2Range.split('-');

  return [
    { start: parseInt(start1), finsh: parseInt(finish1) },
    { start: parseInt(start2), finsh: parseInt(finish2) },
  ];
};

const calculateContainedRanges = (): number => {
  const pairs: Range[][] = data.map((rawPair) => transformElfData(rawPair));
  const count: number = pairs.filter(
    ([elf1, elf2]) =>
      rangeFullyContained(elf1, elf2) || rangeFullyContained(elf2, elf1)
  ).length;
  return count;
};

const calculateOverlappingRanges = (): number => {
  const pairs: Range[][] = data.map((rawPair) => transformElfData(rawPair));
  const count: number = pairs.filter(
    ([elf1, elf2]) => rangeOverlaps(elf1, elf2) || rangeOverlaps(elf2, elf1)
  ).length;
  return count;
};

console.log(calculateContainedRanges());
console.log(calculateOverlappingRanges());
