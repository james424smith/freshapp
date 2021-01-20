import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getAssignmentDetailsFailed,
  getAssignmentDetailsSuccess,
} from "../../actions";
import * as functions from "../assignmentDetailsSagas";
import getAssignmentDetails from "../../../api/assignmentDetailsApi";
import * as apiRequest from "../../../common/request";

describe("Test Assignment Sagas", () => {
  it("should dispatch action GET_ASSIGNMENT_DETAILS", () => {
    const generator = functions.watchGetAssignmentDetails();
    expect(generator.next().value).toEqual(
      takeEvery("GET_ASSIGNMENT_DETAILS", functions.getAssignmentDetailsFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getAssignmentDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getAssignmentDetails());

    const res = await functions.getAssignmentDetailsRequest();

    expect(res).toEqual((await getAssignmentDetails()).json());

    spy.mockRestore();
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetAssignmentDetails)])
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Assignment API", async () => {
    const assignmentData = await getAssignmentDetails();

    const generator = functions.getAssignmentDetailsFn();
    // calls the private function to get the Assignment details
    expect(generator.next()).toBeTruthy();

    expect(generator.next(assignmentData.json()).value).toEqual(
      put(getAssignmentDetailsSuccess(assignmentData.json()))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Assignment API and fail", async () => {
    const generator = functions.getAssignmentDetailsFn();
    // calls the private function to get the Assignment details
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getAssignmentDetailsFailed({ error: "Some error" }))
    );
  });
});
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  },
};
