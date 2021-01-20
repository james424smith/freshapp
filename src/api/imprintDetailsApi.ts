import { Imprint, SuccessRestReturn } from "../interfaces";
import imprintDetails from "../../__mocks__/fake-data/imprintDetails.json";

const delay = 0;

const getImprintDetails = (): Promise<SuccessRestReturn<Imprint>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => imprintDetails }));
    }, delay);
  });
};

export default getImprintDetails;
