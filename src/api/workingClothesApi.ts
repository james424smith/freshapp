import { WorkingClothes, SuccessRestReturn } from "../interfaces";
import workingClothesDetails from "../../__mocks__/fake-data/workingClothes.json";

const delay = 0;

const getWorkingClothesDetails = (): Promise<
  SuccessRestReturn<WorkingClothes>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => workingClothesDetails }));
    }, delay);
  });
};

export default getWorkingClothesDetails;
