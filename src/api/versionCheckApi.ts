import { VersionCheck, SuccessRestReturn } from "../interfaces";
import versionData from "../../__mocks__/fake-data/versionCheck.json";

const delay = 0;

const getVersionCheckDetails = (): Promise<SuccessRestReturn<VersionCheck>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => versionData }));
    }, delay);
  });
};

export default getVersionCheckDetails;
