import { SuccessRestReturn, PrivacyPolicy } from "../interfaces";
import privacyPolicyDocument from "../../__mocks__/fake-data/privacyPolicy.json";

const delay = 0;

const getPrivacyPolicy = (): Promise<SuccessRestReturn<PrivacyPolicy>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => privacyPolicyDocument }));
    }, delay);
  });
};

export default getPrivacyPolicy;
