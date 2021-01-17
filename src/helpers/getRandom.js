/* eslint-disable no-restricted-properties */
const getRandomNumbers = (length) => Math.floor(
  Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
);

export default getRandomNumbers;
