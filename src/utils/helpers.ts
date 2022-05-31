/**
 * Logs a message to the console with a date and time stamp.
 * @param {string} message - Message to log.
 */
const log = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

/**
 * Returns a random item from the specified array.
 * @param {any[]} items - Array from which the item should be taken.
 * @return {any} Brief description of the returning value here.
 */
function sample<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Generates a random character.
 * @return {string} Random character from A to Z.
 */
const randomCharacter = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return sample(characters.split(""));
};

/**
 * Generates a range of numbers.
 * @param {number} from - Starting number from which the range should be generated.
 * @param {number} to - Ending number to which the range should be generated.
 * @param {number} step - A number indicating how many numbers should be skipped while generating the array.
 * @return {number[]} An array of numbers generated from the starting to the ending number.
 */
const range = (from: number, to: number, step: number): number[] => {
  return Array.from(Array(Math.floor((to - from) / step) + 1)).map((_v, k) => from + k * step);
};

export { log, sample, randomCharacter, range };
