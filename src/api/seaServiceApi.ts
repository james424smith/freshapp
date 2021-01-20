import { SeaService, SuccessRestReturn } from "../interfaces";
import seaServiceDetails from "../../__mocks__/fake-data/seaServices.json";

const delay = 0;

const getSeaServiceDetails = (): Promise<SuccessRestReturn<SeaService>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => seaServiceDetails }));
    }, delay);
  });
};

export default getSeaServiceDetails;
