import _ from "lodash";

export const splitArrayItems = (array: any[], splitAt: number) => {
  const splitItems = _.chunk(array, splitAt);
  const latestItems = splitItems[0] ?? [];
  const otherItems = splitItems[1] ?? [];

  return { latestItems, otherItems };
};
