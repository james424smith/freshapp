export const reduceToSumNumbersCounter = (
  arraySource: Array<{ [fieldName: string]: number }>,
  fieldName: string
) => {
  return arraySource.reduce((acc, curr) => (acc + curr[fieldName] ? 1 : 0), 0);
};
