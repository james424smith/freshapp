import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_ASSIGNMENT_DETAILS } from "../constants";
import {
  getAssignmentDetailsSuccess,
  getAssignmentDetailsFailed,
} from "../actions";
import { Assignment, FailedRestReturn } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getAssignmentDetailsRequest = async (): Promise<
  Assignment[] | FailedRestReturn
> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "assignment",
  }).then((assignment) => assignment.json());

export function* getAssignmentDetailsFn() {
  try {
    const assignmentDetails: Assignment[] = yield call(
      getAssignmentDetailsRequest
    );
    yield put(getAssignmentDetailsSuccess(assignmentDetails));
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getAssignmentDetailsFailed(error));
  }
}

export function* watchGetAssignmentDetails() {
  yield takeEvery(GET_ASSIGNMENT_DETAILS, getAssignmentDetailsFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetAssignmentDetails)]);
}
