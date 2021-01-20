import { SeafarerDetails, SuccessRestReturn } from "../interfaces";
import seafarerDetailsApi from "../../__mocks__/fake-data/seafarerDetails.json";

const delay = 0;

const getAllSeafarerDetails = (): Promise<
  SuccessRestReturn<SeafarerDetails>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => seafarerDetailsApi }));
    }, delay);
  });
};

export default getAllSeafarerDetails;
