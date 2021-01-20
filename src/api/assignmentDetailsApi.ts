import { Assignment, SuccessRestReturn } from "../interfaces";
import assignmentDetails from "../../__mocks__/fake-data/assignmentDetails.json";

const delay = 0;

const getAssignmentDetails = (): Promise<SuccessRestReturn<Assignment[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => [assignmentDetails] }));
    }, delay);
  });
};

export default getAssignmentDetails;
