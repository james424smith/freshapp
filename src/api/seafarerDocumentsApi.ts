import {
  SeafarerDocumentsAndCategories,
  SuccessRestReturn,
} from "../interfaces";
import seafarerDocuments from "../../__mocks__/fake-data/seafarerDocuments.json";

const delay = 0;

const getSeafarerDocuments = (): Promise<
  SuccessRestReturn<SeafarerDocumentsAndCategories>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => seafarerDocuments }));
    }, delay);
  });
};

export default getSeafarerDocuments;
