import { Contact, SuccessRestReturn } from "../interfaces";
import contactDetails from "../../__mocks__/fake-data/contactApi.json";

const delay = 0;

const getContactDetails = (): Promise<SuccessRestReturn<Contact>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => contactDetails }));
    }, delay);
  });
};

export default getContactDetails;
