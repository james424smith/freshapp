import { FlightData, SuccessRestReturn } from "../interfaces";
import flightData from "../../__mocks__/fake-data/flightDetailsApi.json";

const delay = 0;

const getFlightDetails = (): Promise<SuccessRestReturn<FlightData>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => flightData }));
    }, delay);
  });
};

export default getFlightDetails;
