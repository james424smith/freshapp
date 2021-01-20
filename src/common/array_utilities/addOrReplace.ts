import _ from "lodash";

export const addOrReplace = (array: any[], newArray: any[]) => {
  newArray.forEach((newItem) => {
    const index = _.findIndex(array, { id: newItem.id });
    if (index >= 0) {
      array[index] = newItem;
    } else {
      array.push(newItem);
    }
  });
  return array.sort((a, b) => b.ts - a.ts);
};
